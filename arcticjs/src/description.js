// Will look like product-detail.js
import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import CAMPAIGNS from './sample_campaigns'


function Description(props) {

    let campaigns = Object.values(CAMPAIGNS)

    const match = useRouteMatch("/campaign/:pid")

    let campaign = campaigns[parseInt(match.params.pid)]

    return (
        <div className="m-4">
            <div>
                <h1>{campaign.title}</h1>
            </div>
            <div
                className="float-right border rounded m-2 p-2"
                style={{
                    width: '300px',
                    height: '300px',
                }}
            >
                <img
                    alt={campaign.title}
                    src={campaign.campaign_image_url}
                    className="w-100"
                />
            </div>
            <div className="float-left">            
                <h4>{campaign.description}</h4>
            </div>
        </div>
    )
}
export default Description