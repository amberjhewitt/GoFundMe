import React from 'react'
import * as bs from 'react-bootstrap'
import AppContext from './context'
import { Link } from "react-router-dom"


function LeftContainer(props) {
    const context = React.useContext(AppContext)

    // if categories haven't been retrieved yet, just show a loading message
    if (!context.categories) {
        return <div>Loading...</div>
    }

    // count the number of products in each category
    const counts = {}
    let totalCount = 0
    for (const product of Object.values(context.products)) {
        counts[product.category.id] = (counts[product.category.id] || 0) + 1
        totalCount += 1
    }
    // console.log(counts)

    // render the categories
    return (
        <bs.Nav className="flex-column">
            <Link
                to={`/`}
                className="nav-link"
            >
                    All Products ({totalCount})
            </Link>
            <bs.Nav.Item>
                {Object.values(context.categories).map((cat) => (
                    <Link
                        to={`/category/${cat.id}`}
                        key={cat.id}
                        className="nav-link"
                    >
                        {cat.title} ({counts[cat.id]})
                    </Link>
                ))}
            </bs.Nav.Item>
        </bs.Nav>
    )
}
export default LeftContainer
