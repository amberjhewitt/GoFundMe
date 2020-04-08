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
            >All Campaigns ({totalCount})
            </Link>
            {/* QUALITY CATEGORIES LISTED HERE */}
            {/* ***************************************************************************
             *  So these are the search filters by category_id. They're currently hardcoded bc
             *  Hayley couldn't figure out how to dynamically get them in lol.
             *  NOTE: THE LINKS DO NOT WORK WHEN HARDCODED
            */}
            <bs.Nav.Item>
                <Link>Other ({counts[0] + counts[15]})</Link><br />
                <Link>Accidents & Emergencies ({counts[2]})</Link><br />
                <Link>Animals & Pets ({counts[3]})</Link><br />
                <Link>Babies, Kids & Family ({counts[4]})</Link><br />
                <Link>Business & Entrepreneurs ({counts[5]})</Link><br />
                <Link>Celebrations & Events ({counts[6]})</Link><br />
                <Link>Community & Neighbors ({counts[7]})</Link><br />
                <Link>Creative Arts, Music & Film ({counts[8]})</Link><br />
                <Link>Funerals & Memorials ({counts[9]})</Link><br />
                <Link>Travel & Adventure ({counts[10]})</Link><br />
                <Link>Medical, Illness & Healing ({counts[11]})</Link><br />
                <Link>Missions, Faith & Church ({counts[12]})</Link><br />

                {/* No data in our samples for category_ids 13 & 14
                <Link>Non-Profits & Charities ({counts[13]})</Link><br />
                <Link>Weddings & Honeymoons ({counts[14]})</Link><br /> */}

                <Link>Sports, Teams & Clubs ({counts[16]})</Link><br />
                <Link>Education & Learning ({counts[17]})</Link><br />
                <Link>Volunteer & Service ({counts[18]})</Link><br />
                <Link>Competitions & Pageants ({counts[19]})</Link><br />
                <Link>Dreams, Hopes & Wishes ({counts[20]})</Link><br />

                {/* This dynamically outputs the categories, 
                 *  but prints the category link every time, making the list super long.
                {Object.values(CAMPAIGNS).map((cat) => (
                    <Link
                        to={`/filter/${cat.category_id}`}
                        key={cat.id}
                        className="nav-link"
                    >
                        {CATEGORIES[cat.category_id]} ({counts[cat.category_id]})
                    </Link>
                ))}
                */}
            </bs.Nav.Item>
        </bs.Nav>
    )
}
export default LeftContainer
