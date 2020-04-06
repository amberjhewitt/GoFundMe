import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import AppContext from './context'


function ProductDetail(props) {
    const context = React.useContext(AppContext)
    const history = useHistory()

    const [ currentImage, setCurrentImage ] = React.useState("1")
    const match = useRouteMatch("/product/:pid")
    const product = context.products[match.params.pid]
    if (!product) {
        return <h2 className="m-4 text-center">Product not found</h2>
    }

    return (
        <div className="m-4">
            <div
                className="float-right border rounded m-2 p-2"
                style={{
                    width: '300px',
                    height: '300px',
                }}
            >
                <img
                    alt={product.name}
                    src={`/media/products/${product.filename}-${currentImage}.png`}
                    className="w-100"
                />
                <div>
                    {["1", "2", "3", "4"].map(img_idx => (
                        <img
                            key={product.id + img_idx}
                            alt={product.name}
                            src={`/media/products/${product.filename}-${img_idx}.png`}
                            className="border rounded mt-3 mx-1"
                            style={{
                                height: "30px",
                                width: "30px",
                            }}
                            onMouseEnter={e => {
                                setCurrentImage(img_idx)
                            }}
                        />
                    ))}
                </div>
            </div>

            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
            <p>{product.description}</p>

            <p className="mt-5">
                <bs.Button
                    variant="warning"
                    onClick={e => {
                        context.addToCart(product.id)
                        history.push('/cart')
                    }}
                >
                    Add to Cart
                </bs.Button>
            </p>
        </div>
    )
}
export default ProductDetail
