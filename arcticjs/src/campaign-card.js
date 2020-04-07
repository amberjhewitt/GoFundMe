import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'


function CampaignCard(props) {

    let shortDescription = props.campaign.description.substring(0,500)


    return (
        <bs.Card className="mx-2 my-4">            
            <bs.Card.Header className="border-top text-center bg-brand"><h2 className="pt-2 text-center">{props.campaign.title}</h2></bs.Card.Header>
            <Link
                to={`/campaign/${props.campaign.id}`}
                className="btn btn-sm btn-dark position-absolute px-2 py-1 rounded shadow"
                style={{
                    right: "5px",
                    top: "5px",
                    opacity: "90%",
                }}
            >
                Details
            </Link>

            <div className="container">
                <bs.Card.Img
                    variant="top"
                    alt={props.campaign.title}
                    src={props.campaign.campaign_image_url}
                    className="p-2 maxWidth container_image"
                />   
                <div className="container_text p-2">
                    <h3>Description</h3>
                    <h5>{shortDescription}...</h5>
                </div>
            </div>             
            
            <bs.Card.Header className="border-top text-center">
                <div className="float-rt">
                    <bs.Card.Text>{`Amount Raised: $${props.campaign.current_amount}`}</bs.Card.Text>
                    <bs.Card.Title className="brand">{`Goal: $${props.campaign.goal}`}</bs.Card.Title>
                </div>                
            </bs.Card.Header>
        </bs.Card>
    )
}
export default CampaignCard
