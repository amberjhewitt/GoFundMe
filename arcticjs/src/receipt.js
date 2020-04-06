import React from 'react'
import * as bs from 'react-bootstrap'


function Receipt(props) {
    return (
        <bs.Container fluid>
            <bs.Row>
                <bs.Col>
                    <h1 className="mt-3">
                        Thanks
                    </h1>

                    Thank you for your order!
                </bs.Col>
            </bs.Row>
        </bs.Container>
    )
}
export default Receipt
