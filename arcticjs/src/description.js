// Will look like product-detail.js
import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, Link } from 'react-router-dom'
import CAMPAIGNS from './sample_campaigns'


function Description(props) {

    let campaigns = Object.values(CAMPAIGNS)

    const match = useRouteMatch("/campaign/:pid")

    let campaign = campaigns[parseInt(match.params.pid)]

    //Find the # of days active
    const date1 = new Date(campaign.collected_date);
    const date2 = new Date(campaign.launch_date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffDays);
    //END


    return (
        <>
            <Link
                to={`/`}
                className="btn btn-sm btn-dark position-absolute px-3 py-1 rounded shadow"
                style={{
                    left: "5px",
                    top: "5px",
                    opacity: "90%",
                }}
            >
                Back
            </Link>

            <div className="mx-4 my-5">
                <div>
                    <h1>{campaign.title}</h1>
                </div>
                <div className="float-right rounded m-2 p-2" style={{ width: '300px', height: '300px', }}>

                    <h4>{campaign.location_city}</h4>
                    <p>{`Created ${diffDays} days ago`}</p>

                    <img
                        alt={campaign.title}
                        src={campaign.campaign_image_url}
                        className=""
                    />
                    <div>
                        <br />
                        <bs.Card.Text>{`Amount Raised: $${campaign.current_amount}`}</bs.Card.Text>
                        <bs.Card.Title className="brand">{`Goal: $${campaign.goal}`}</bs.Card.Title>
                    </div>
                </div>

                
                <div style={{width: '60%'}}>            
                    <h4>{campaign.description}</h4>
                </div>

            </div>
        </>
    )
}
export default Description