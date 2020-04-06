import React from 'react'
import * as bs from 'react-bootstrap'
import axios from 'axios'
import { Formik, Form, Field} from 'formik'
import { useHistory } from 'react-router-dom'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { formatNumber } from './util'
import AppContext from './context'


const stripePromise = loadStripe("pk_test_9SkJNz6Or89UeCAJ7OINrFud");


function Checkout(props) {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutController />
        </Elements>
    )
}
export default Checkout


const CheckoutController = props => {
    const context = React.useContext(AppContext)
    const history = useHistory()
    const stripe = useStripe()
    const elements = useElements()
    const total = context.getCartTotal()
    const [stripeError, setStripeError] = React.useState(null)

    return (
        <Formik
            initialValues={{
                name: 'Conrad Fox',
                address1: '1234',
                address2: '5678',
                city: 'Provo',
                state: 'UT',
                zipcode: '84602',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                console.log('validating', values)
                return {}
            }}
            onSubmit={async (values, actions) => {
                console.log('submit', values)
                setStripeError(null)

                // create the sale
                const items = []
                for (const [pid, qty] of Object.entries(context.cart)) {
                    const product = context.products[pid]
                    if (product) {
                        items.push({
                            pid: pid,
                            qty: qty,
                            price: product.price,
                        })
                    }
                }
                const resp = await axios.post('http://localhost:8000/api/sale/', {
                    name: values.name,
                    address1: values.address1,
                    address2: values.address2,
                    city: values.city,
                    state: values.state,
                    zipcode: values.zipcode,
                    total: total,
                    items: items,
                })
                console.log(resp.data)

                // submit the details to stripe
                const stripeResp = await stripe.confirmCardPayment(resp.data.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: values.name,
                        },
                    }
                })
                console.log(stripeResp)
                actions.setSubmitting(false)
                if (stripeResp.error) {
                    setStripeError(stripeResp.error.message)
                    return
                }

                // clear the cart and forward on
                context.clearCart()
                history.push('/receipt')
            }}
        >{form => (
            <>
                {stripeError &&
                    <div className="mb-3 text-center text-danger">{stripeError}</div>
                }
                <PaymentForm form={form} total={total} />
            </>
        )}</Formik>
    )
}


/**
 * The form layout/html.
 */
const PaymentForm = props => (
    <Form>
        <bs.Container fluid>
            <bs.Row>
                <bs.Col>
                    <h1 className="mt-3">Checkout</h1>
                </bs.Col>
            </bs.Row>
            <bs.Row className="my-3">
                <bs.Col md="6">
                    <bs.Card>
                        <bs.Card.Header>
                            <bs.Card.Title>Shipping</bs.Card.Title>
                        </bs.Card.Header>
                        <bs.Card.Body>
                            <Input title="Name:" name="name" type="text" />
                            <Input title="Address1:" name="address1" type="text" />
                            <Input title="Address2:" name="address2" type="text" />
                            <Input title="City:" name="city" type="text" />
                            <Input title="State:" name="state" type="text" />
                            <Input title="Zip:" name="zipcode" type="text" />
                        </bs.Card.Body>
                    </bs.Card>
                </bs.Col>
                <bs.Col md="6">
                    <bs.Card>
                        <bs.Card.Header>
                            <bs.Card.Title>Payment</bs.Card.Title>
                        </bs.Card.Header>
                        <bs.Card.Body>
                            <CardElement />
                        </bs.Card.Body>
                    </bs.Card>

                    <div className="mt-4">
                        Your card will be charged <b>{formatNumber(props.total)}</b>.
                    </div>

                    <div className="text-center mt-4">
                        <bs.Button
                            variant="success"
                            type="submit"
                            className="d-inline-flex align-items-center"
                            disabled={props.form.isSubmitting}
                        >
                            {props.form.isSubmitting &&
                                <bs.Spinner className="mr-2" size="sm" animation="border" />
                            }
                            Purchase
                        </bs.Button>
                    </div>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    </Form>
)


/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type="text"  // ...rProps.field may override this default
                disabled={rProps.form.isSubmitting}
                placeholder={props.placeholder}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)
