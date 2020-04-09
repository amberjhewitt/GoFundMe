import React from 'react'
import * as bs from 'react-bootstrap'
// import AppContext from './context'
import { Link } from "react-router-dom"
// import CAMPAIGNS from './sample_campaigns'
import CAMPAIGNS from './full-campaigns'
import CATEGORIES from './categories'


function LeftContainer(props) {

    const categories = {}
    let total = 0
    for (let p of Object.values(CAMPAIGNS)) {
        console.log(p.category_id)
        if (p.category_id in categories) {
            categories[p.category_id] += 1
            total += 1
        }
        else {
            categories[p.category_id] = 1
            total += 1
        }
    }

    console.log("sdfsdfsdfsd", categories)

    // render the categories
    return (
        <bs.Nav className="flex-column">
            <Link
                to={`/`}
                className="nav-link"
            >
                   All Campaigns ({total})
            </Link>

            {/* QUALITY CATEGORIES LISTED HERE */}
            <bs.Nav.Item>
                {Object.entries(categories).map(([cat,count]) => (
                    <Link
                        to={`/category/${cat}`}
                        key={cat}
                        className="nav-link"
                    >
                        {Object.values(CATEGORIES)[cat]} ({count})
                    </Link>
                ))}
            </bs.Nav.Item>
        </bs.Nav>

    )
}
export default LeftContainer

// if categories haven't been retrieved yet, just show a loading message
    //if (!campaigns.categories) {
    //    return <div>Loading...</div>
    //}

    // count the number of products in each category
    //const counts = {}
    //let totalCount = 0
    //for (const camp of Object.values(CAMPAIGNS)) {
    //    counts[camp.category_id] = (counts[camp.category_id] || 0) + 1
    //    totalCount += 1
    //}

{/*{Object.values(CAMPAIGNS).map((cat) => (

                    <Link
                        to={`/category/${cat.category_id}`}
                        key={cat.category_id}
                        className="nav-link"
                    >
                        {CATEGORIES[cat.category_id]} ({counts[cat.category_id]})
                    </Link>
                ))}*/}

//Get the Categories//
    //const categories = {}
    //for (const p of Object.values(CATEGORIES)){
    //    if (p in categories) {
    //    categories[p] = categories[p] + 1
    //    }else{
    //    categories[p] = 1
    //    }
    //}