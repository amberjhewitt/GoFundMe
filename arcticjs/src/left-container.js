import React from 'react'
import * as bs from 'react-bootstrap'
// import AppContext from './context'
import { Link } from "react-router-dom"
// import CAMPAIGNS from './sample_campaigns'
import CAMPAIGNS from './full-campaigns'
import CATEGORIES from './categories'


function LeftContainer(props) {

    const categories = {}
    const current_amount = Object.values(CAMPAIGNS).current_amount
    

    let total = 0
    let highQuality = []
    let medQuality = []
    let lowQuality = []
    let noQuality = []


    for (let p of Object.values(CAMPAIGNS)) {

        
        const raised = p.current_amount  
        const daysActive = p.days_active   
        const success = Math.round((parseInt(raised)/parseInt(daysActive)))

        
// not int
        if (success >100) {
            // add to HighQuality Array
            highQuality.push(p)
        } else if (success > 50) {
            // add to MedQuality array
            medQuality.push(p)
        } else if (success === 0) {
            lowQuality.push(p)
        } else {
            noQuality.push(p)
        }

        // console.log(p)

        //const success = Math.round((parseInt(raised) / parseInt(daysActive)))

        // Iterate through campaigns and assign quality level
        // add success attribute to each campaign

        // Iterate through campaigns and count categories
        if (p.category_id in categories) {
            categories[p.category_id] += 1
            total += 1
        }
        else {
            categories[p.category_id] = 1
            total += 1
        }
    }

    let qualities = [highQuality, medQuality, lowQuality, noQuality]

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
                <hr />

                {/* QUALITY CATEGORIES LISTED HERE */}
                <bs.Nav.Item>
                    <bs.DropdownButton id="dropdown-basic-button" title="Filter By Categories">
                    {Object.entries(categories).map(([cat,count]) => (
                        <Link
                            to={`/category/${cat}`}
                            key={cat}
                            className="nav-link"
                        >
                            {CATEGORIES[cat]} ({count})
                        </Link>
                        ))}
                        
                    </bs.DropdownButton>
                </bs.Nav.Item>                    
                    <hr />
                <bs.Nav.Item>
                    <bs.DropdownButton id="dropdown-basic-button" title="Filter By Qualities">
                            <Link
                                to={`/quality/high`}
                                key={highQuality.id}
                                >High Quality ({highQuality.length})
                            </Link>
                            <br />
                            <Link
                                to={`/quality/med`}
                                key={medQuality.id}
                                >Medium Quality ({medQuality.length})
                            </Link>
                            <br />
                            <Link
                                to={`/quality/low`}
                                key={lowQuality.id}
                                >Low Quality ({lowQuality.length})
                            </Link>
                            <br />
                            <Link
                                to={`/quality/none`}
                                key={noQuality.id}
                                >No Quality ({noQuality.length})
                            </Link>
                    </bs.DropdownButton>

                </bs.Nav.Item>
            </bs.Nav>
        </div>
        <div>
            
 
        </div>

        </>
    )
}
export default LeftContainer;