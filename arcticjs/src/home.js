import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import CampaignCard from './campaign-card'
//import CAMPAIGNS from './sample_campaigns'
import CAMPAIGNS from './full-campaigns'
import qualities from './left-container'
import './test'

const NUM_COLUMNS = 1

function Home(props) {
    let campaignsArr = Object.values(CAMPAIGNS)

    // get an array of products, then filter to the current category
    const match = useRouteMatch("/category/:cid/")
    const matchQuality = useRouteMatch("/quality/:qid/")
    // const cid = match ? parseInt(match.params.cid) : 0

    
    if (match) {
        campaignsArr = campaignsArr.filter(campaign => {
            
            let success = Math.round(campaign.current_amount/campaign.days_active)
            return campaign.category_id === match.params.cid
        })
    }
    
    if (matchQuality && matchQuality.params.qid === "high") {
        
        campaignsArr = campaignsArr.filter(campaign => {
            
            let success = Math.round(campaign.current_amount/campaign.days_active)
            return  success >= 100
        })
    }
    
    else if (matchQuality && matchQuality.params.qid === "med") {


        campaignsArr = campaignsArr.filter(campaign => {
            
            let success = Math.round(campaign.current_amount/campaign.days_active)
            return   success >= 50 && success < 100
        })
    }
    
    else if (matchQuality && matchQuality.params.qid === "low") {
        campaignsArr = campaignsArr.filter(campaign => {
            
            let success = Math.round(campaign.current_amount/campaign.days_active)
            return  success > 0 && success < 50
        })
    }
    
    else if (matchQuality && matchQuality.params.qid === "none") {
        campaignsArr = campaignsArr.filter(campaign => {
            return  Math.round(campaign.current_amount/campaign.days_active) === 0
        })
    }


    // slice the products into an array of arrays (e.g. a list of rows of 4 products each)
    const rows = []
    for (let i = 0; i < campaignsArr.length; i += NUM_COLUMNS) {
        rows.push(campaignsArr.slice(i, i + NUM_COLUMNS))
    }

    // render
    return (
        <>
            <bs.Container fluid>
                <bs.Row>
                    <bs.Col>
                        <h1 className="mt-3">Campaigns</h1>
                    </bs.Col>
                </bs.Row>

                {rows.map((row, row_idx) => (
                    <bs.Row key={row_idx}>
                        {row.map(campaign => (
                            <bs.Col key={campaign.id}>
                                <CampaignCard campaign={campaign} />
                            </bs.Col>
                        ))}
                    </bs.Row>
                ))}
            </bs.Container>
        </>
    )
}
export default Home
