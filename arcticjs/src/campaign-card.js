/* 
    LOGIC NOTE - HARDCODED VALUE: 
        In linking urls, description takes the field1 id and sends it to
        RouteMatch, which takes the nth product in the import list (if the
        field1 id is 289, it takes the 289th id which is 578). So in order
        to get the target item, subtract the floor, or the very first 
        campaign id, from the parameter you send before you send it.
        IOW, direct all related complaints to Hayley.
*/

import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'


function CampaignCard(props) {

    let shortDescription = props.campaign.description.substring(0, 500)

    //Progress Bar//
    const raised = props.campaign.current_amount
    const goal = props.campaign.goal
    const daysActive = props.campaign.days_active
    const loader = Math.round((parseInt(raised) / parseInt(goal)) * 100)
    const success = Math.round((parseInt(raised)/parseInt(daysActive)))
    let quality = ""
    let qualityAlt = ""
    let imageurl = ''
    
    if (success > 100) {
        quality = "High"
        qualityAlt = 'high'
        imageurl = '/media/high.png'
    }
    else if(success > 50) {
        quality = "Medium"
        qualityAlt = 'medium'
        imageurl = '/media/medium.png'
    }
    else if(success === 0){
        quality = "To be determined"
        qualityAlt = 'none'
        imageurl = '/media/none.png'
    }
    else{
        quality = "Low"
        qualityAlt = 'low'
        imageurl = '/media/low.png'
    }
    
    //END//

    return (

        <bs.Card className="mx-2 my-4">            
            <bs.Card.Header className="border-top text-center bg-brand"><h2 className="pt-2 text-center">{props.campaign.title}</h2></bs.Card.Header>
            <Link
                to={`/campaign/${props.campaign.field1 - 289}`}
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
                <div className="">
                    <bs.ProgressBar style={{ width: '100%' }} variant={'success'} animated now={loader} label={`${loader}%`} />
                </div>
                <div className="float-rt">
                    <bs.Card.Text>{`Amount Raised: $${Number(props.campaign.current_amount).toLocaleString()}`}</bs.Card.Text>
                    <bs.Card.Title className="brand">{`Goal: $${Number(props.campaign.goal).toLocaleString()}`}</bs.Card.Title>
                </div>
                <br></br>
                <div className='float-lft'>
                    
                    <bs.Card.Img
                        alt='quality image'
                        src={imageurl}
                        className="qualityImage"
                    />
                    <bs.Card.Text className={`${qualityAlt}Quality`}>{`Campaign Quality: ${quality}`}</bs.Card.Text>
                </div>
            </bs.Card.Header>
        </bs.Card>
    )
}
export default CampaignCard


