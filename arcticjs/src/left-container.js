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
        <>
        <div className="page-wrap">
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
                            {CATEGORIES[cat]} ({count})
                        </Link>
                    ))}
                </bs.Nav.Item>
            </bs.Nav>
        </div>
        <div>
            
             <Link
                 to={`/quality/${quality}`}
                 key={cat}
                 className="nav-link"
            >
               {quality}
            </Link>
        </div>
        </>
    )
}
export default LeftContainer;