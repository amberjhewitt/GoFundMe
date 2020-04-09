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
    const raised = props.campaign
    const daysActive = props.campaign.days_active   
    const success = Math.round((parseInt(raised)/parseInt(daysActive)))

    let total = 0
    let highQuality = []
    let medQuality = []
    let lowQuality = []
    let noQuality = []


    for (let p of Object.values(CAMPAIGNS)) {
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

        console.log(p)

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

    console.log("highQuality", highQuality)
    console.log("medQuality", medQuality)
    console.log("lowQuality", lowQuality)
    let qualities = [highQuality, medQuality, lowQuality, noQuality]
    console.log(qualities)

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
                <bs.Nav.Item>
                    {/* show quality name and length of array */}
                    {/* {qualities.forEach((level, index) => (
                        <Link
                            to={`/quality/${level}`}
                            key={level}
                            className="nav-link"
                        >
                            Hello{level} ({level.length})
                        </Link>
                    ))} */}

{/* const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
); */}

<Link
    to={`/quality/highQuality`}
    key={highQuality.id}
>High Quality ({highQuality.length})</Link>
<Link
    to={`/quality/${medQuality}`}
    key={medQuality.id}
>Medium Quality ({medQuality.length})</Link>
<Link
    to={`/quality/${lowQuality}`}
    key={lowQuality.id}
>Low Quality ({lowQuality.length})</Link>
<Link
    to={`/quality/${noQuality}`}
    key={noQuality.id}
>Low Quality ({noQuality.length})</Link>

                </bs.Nav.Item>
            </bs.Nav>
        </div>
        <div>
            
 
        </div>

        </>
    )
}
export default LeftContainer;