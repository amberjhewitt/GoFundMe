import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'


function CampaignCard(props) {
    return (
        <bs.Card className="mx-2 my-4">
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
            <bs.Card.Img
                variant="top"
                alt={props.campaign.title}
                src={props.campaign.campaign_image_url}
                className="p-2"
            />
            <bs.Card.Header className="border-top text-center">
                <bs.Card.Title className="mb-2">{props.campaign.title}</bs.Card.Title>
                <bs.Card.Text>{`Amount Raised: $${props.campaign.current_amount}`}</bs.Card.Text>
                <bs.Card.Title>{`Goal: $${props.campaign.goal}`}</bs.Card.Title>
            </bs.Card.Header>
        </bs.Card>
    )
}
export default CampaignCard
