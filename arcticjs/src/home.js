import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import CampaignCard from './campaign-card'
import CAMPAIGNS from './sample_campaigns'

const NUM_COLUMNS = 1

function Home(props) {
    let campaignsArr = Object.values(CAMPAIGNS)

    

    // get an array of products, then filter to the current category
    const match = useRouteMatch("/category/:cid")
    const cid = match ? parseInt(match.params.cid) : 0
    if (cid) {
        campaignsArr = campaignsArr.filter(campaign => {
            return campaign.category.id === cid
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
                            <bs.Col md="3" key={campaign.id}>
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
