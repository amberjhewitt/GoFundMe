import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import ProductCard from './product-card'
import AppContext from './context'

const NUM_COLUMNS = 4


function Home(props) {
    const context = React.useContext(AppContext)

    // get an array of products, then filter to the current category
    let products_arr = Object.values(context.products)
    const match = useRouteMatch("/category/:cid")
    const cid = match ? parseInt(match.params.cid) : 0
    if (cid) {
        products_arr = products_arr.filter(product => {
            return product.category.id === cid
        })
    }

    // slice the products into an array of arrays (e.g. a list of rows of 4 products each)
    const rows = []
    for (let i = 0; i < products_arr.length; i += NUM_COLUMNS) {
        rows.push(products_arr.slice(i, i + NUM_COLUMNS))
    }

    // render
    return (
        <bs.Container fluid>
            <bs.Row>
                <bs.Col>
                    <h1 className="mt-3">
                        {context.categories[cid] ? context.categories[cid].title : 'All Products' }
                    </h1>
                </bs.Col>
            </bs.Row>

            {rows.map((row, row_idx) => (
                <bs.Row key={row_idx}>
                    {row.map(product => (
                        <bs.Col md="3" key={product.id}>
                            <ProductCard product={product} />
                        </bs.Col>
                    ))}
                </bs.Row>
            ))}
        </bs.Container>
    )
}
export default Home
