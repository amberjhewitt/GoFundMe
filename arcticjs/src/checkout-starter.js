import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


// const stripePromise = loadStripe(...)


function Checkout(props) {
    // we'll add Stripe's Elements component here later
    return (
        <CheckoutController />
    )
}
export default Checkout


const CheckoutController = props => {
    const total = 50.00 // context.getCartTotal()

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
                const errors = {}
                console.log('validating', values)
                return errors
            }}
            onSubmit={async (values, actions) => {
                console.log('submit', values)
                await new Promise(resolve => {
                    setTimeout(() => {  // wait 2 seconds, then set the form as "not submitting"
                        resolve()
                    }, 2000)
                })
                console.log('after the 2 seconds')
            }}
        >{form => (
            <PaymentForm form={form} total={total} />
        )}</Formik>
    )
}


/**
 * The form layout/html
 */
const PaymentForm = props => (
    <Form>
        <Input title="Name:" name="name" type="text" />
        <div>More inputs here</div>
        <div>Submit button somewhere here</div>
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
                type={props.type}
                placeholder={props.placeholder}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)
