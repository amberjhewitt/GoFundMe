import React from 'react'
import axios from 'axios'
import { produce } from 'immer'
import AppContext from './context'
import App from './App'

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.actions = {
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            clearCart: this.clearCart,
            getCartTotal: this.getCartTotal,
        }
        this.state = {
            categories: {},
            products: {},
            cart: {
                477227: 10,
                620151: 2
            },
            cartCount: 12,
        }

    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        // load the categories
        const cat_resp = await axios.get('http://localhost:8000/api/category')
        const categories = {}
        for (const cat of cat_resp.data) {
            categories[cat.id] = cat
        }

        // load the products
        const prod_resp = await axios.get('http://localhost:8000/api/product')
        const products = {}
        for (const prod of prod_resp.data) {
            products[prod.id] = prod
        }

        // set in state
        this.setState({
            categories: categories,
            products: products,
        })
    }

    /** Adds the given item pid to the shopping cart */
    addToCart = pid => {
        this.setState(produce(this.state, draft => {
            // set this item in the cart
            draft.cart[pid] = (draft.cart[pid] || 0) + 1

            // count the items in the cart
            let count = 0
            for (const qty of Object.values(draft.cart)) {
                count += qty
            }
            draft.cartCount = count
        }))
    }

    /** Removes the given item pid from the shopping cart */
    removeFromCart = pid => {
        this.setState(produce(this.state, draft => {
            delete draft.cart[pid]

            // count the items in the cart
            let count = 0
            for (const qty of Object.values(draft.cart)) {
                count += qty
            }
            draft.cartCount = count
        }))
    }

    /** Clears the cart */
    clearCart = () => {
        this.setState(produce(this.state, draft => {
            draft.cart = {}
            draft.cartCount = 0
        }))
    }

    /** Returns the total price in the cart */
    getCartTotal = () => {
        let total = 0.0
        for (const [pid, qty] of Object.entries(this.state.cart)) {
            const product = this.state.products[pid]
            if (product) {
                total += (qty * product.price)
            }
        }
        return total
    }

}
