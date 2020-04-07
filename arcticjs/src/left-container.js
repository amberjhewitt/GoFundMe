import React from 'react'
import * as bs from 'react-bootstrap'
// import AppContext from './context'
import { Link } from "react-router-dom"
import CAMPAIGNS from './sample_campaigns'


function LeftContainer(props) {
    // const context = React.useContext(AppContext)
    let campaigns = Object.values(CAMPAIGNS)

    // if categories haven't been retrieved yet, just show a loading message
    //if (!campaigns.categories) {
    //    return <div>Loading...</div>
    //}

    // count the number of products in each category
    const counts = {}
    let totalCount = 0
    for (const camp of Object.values(CAMPAIGNS)) {
        counts[camp.id] = (counts[camp.id] || 0) + 1
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
                    All Campaigns ({totalCount})
            </Link>

            {/* QUALITY CATEGORIES LISTED HERE */}
            {/*<bs.Nav.Item>
                {Object.values(CAMPAIGNS).map((cat) => (
                    <Link
                        to={`/category/${cat.id}`}
                        key={cat.id}
                        className="nav-link"
                    >
                        {cat.title} ({counts[cat.id]})
                    </Link>
                ))}
            </bs.Nav.Item>*/}
        </bs.Nav>
    )
}
export default LeftContainer
