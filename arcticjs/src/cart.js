import React from 'react'
import * as bs from 'react-bootstrap'
import { formatNumber } from './util'
import { Link } from "react-router-dom"
import AppContext from './context'


function Cart(props) {
    return (
        <bs.Container fluid>
            <bs.Row>
                <bs.Col>
                    <h1 className="mt-3">
                        Shopping Cart
                    </h1>
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <bs.Col>
                    <CartTable />
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <bs.Col className="text-center">
                    <Link to="/checkout" className="btn btn-success" role="button">
                        Checkout
                    </Link>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    )
}
export default Cart



/** The table of items in the cart */
function CartTable(props) {
    const context = React.useContext(AppContext)

    // create the table data (doing before render because easier here)
    const data = []
    let total = 0
    for (const [pid, qty] of Object.entries(context.cart)) {
        const product = context.products[pid]
        if (product) {  // might be undefined if products not loaded from API yet
            total += (qty * product.price)
            data.push({
                'product': product,
                'qty': qty,
                'extended': qty * product.price,
            })
        }
    }

    return (
        <bs.Table borderless className="mt-4">
            <tbody>
                <tr className="border-bottom">
                    <th className="text-center">Product</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Extended</th>
                    <th></th>
                </tr>
                {data.map(row => (
                    <tr key={row.product.id}>
                        <td>
                            <img
                                alt={row.product.name}
                                src={`/media/products/${row.product.filename}-1.png`}
                                className="border rounded mr-3"
                                style={{
                                    height: "60px",
                                    width: "60px",
                                }}
                            />
                            {row.product.name}
                        </td>
                        <td className="text-right">{row.qty}</td>
                        <td className="text-right">{formatNumber(row.product.price)}</td>
                        <td className="text-right">{formatNumber(row.extended)}</td>
                        <td className="text-center">
                            <bs.Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={e => {
                                    context.removeFromCart(row.product.id)
                                }}
                            >
                                Remove
                            </bs.Button>
                        </td>
                    </tr>
                ))}
                <tr className="border-top">
                    <th className="text-center">Total</th>
                    <th></th>
                    <th></th>
                    <th className="text-right">{formatNumber(total)}</th>
                    <th></th>
                </tr>
            </tbody>
        </bs.Table>
    )
}
