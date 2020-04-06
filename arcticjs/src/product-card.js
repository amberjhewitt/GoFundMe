import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'


function ProductCard(props) {
    return (
        <bs.Card className="mx-2 my-4">
            <Link
                to={`/product/${props.product.id}`}
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
                alt={props.product.name}
                src={`/media/products/${props.product.filename}-1.png`}
                className="p-2"
            />
            <bs.Card.Header className="border-top text-center">
                <bs.Card.Title className="mb-2">{props.product.name}</bs.Card.Title>
                <bs.Card.Text>${props.product.price}</bs.Card.Text>
            </bs.Card.Header>
        </bs.Card>
    )
}
export default ProductCard
