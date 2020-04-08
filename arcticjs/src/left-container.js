import React from 'react'
import * as bs from 'react-bootstrap'
// import AppContext from './context'
import { Link } from "react-router-dom"
// import CAMPAIGNS from './sample_campaigns'
import CAMPAIGNS from './full-campaigns'
import CATEGORIES from './categories'


function LeftContainer(props) {


    //Get the Categories//
    const categories = {}
    for (const p of Object.values(CATEGORIES)){
        if (p in categories) {
        categories[p] = categories[p] + 1
        }else{
        categories[p] = 1
        }
    }

    
let catName = Object.values(CATEGORIES)
console.lo

    console.log("sdfsdfsdfsd", categories)

    // if categories haven't been retrieved yet, just show a loading message
    //if (!campaigns.categories) {
    //    return <div>Loading...</div>
    //}

    // count the number of products in each category
    const counts = {}
    let totalCount = 0
    for (const camp of Object.values(CAMPAIGNS)) {
        counts[camp.category_id] = (counts[camp.category_id] || 0) + 1
        totalCount += 1
    }

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
            <bs.Nav.Item>
                {Object.values(CAMPAIGNS).map((cat) => (
                    <Link
                        to={`/filter/${cat.category_id}`}
                        key={cat.id}
                        className="nav-link"
                    >
                        {CATEGORIES[cat.category_id]} ({counts[cat.category_id]})
                    </Link>
                ))}
            </bs.Nav.Item>
        </bs.Nav>

    )
}
export default LeftContainer
