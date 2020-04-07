import React from 'react'
import * as bs from 'react-bootstrap'
import axios from 'axios'
import { Formik, Form, Field} from 'formik'
import { useHistory } from 'react-router-dom'
// import { formatNumber } from './util'
import AppContext from './context'


function Checkout(props) {
    return (
            <CheckoutController />
    )
}
export default Checkout

const CheckoutController = props => {
    const context = React.useContext(AppContext)
    const history = useHistory()


    const total = context.getCartTotal()

    return (
        <Formik
            initialValues={{
                goal: '1000',
                title: 'Daniel needs a home',
                description: 'Daniel has been homeless for a little over 3 years. He hasnt had many opportunities to find work after escaping the drug cartel.',
                city: "Palm Springs",
                state: "CA",
                zip: '84606',
                category: 'Dreams',
                hasBeneficiary: true, 
                publiclyVisible: true, 
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                console.log('validating', values)
                return {}
            }}
            onSubmit={async (values, actions) => {
                console.log('submit', values)

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
                const resp = await axios.post(
                    'https://ussouthcentral.services.azureml.net/workspaces/2abd23f891284eb98f5356e46b5cb743/services/02cf6ca7ede74883bdb1a84ddf9e1669/execute?api-version=2.0&details=true',
                    {
                        data: {
                            goal: values.goal,
                            title: values.title,
                            description: values.description,
                            city: values.city,
                            state: values.state,
                            zip: values.zip,
                            category: values.category,
                        },
                        headers: {
                            "Content-Type": ["application/json", "application/json"],
                            "Authorization": "Bearer m/Ounu8QlSAwqRXZRX6myxY+MEhHads9J7O558M7kxvqNfCa6raSY8Wt7PD5l2mOeV5gRCoG2RJ4oy60WoprhQ=="
                        },
                    },
                )
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
                console.log(resp.data)

            }}
            >{form => (
                <>
                    <PredictionForm form={form} total={total} />
                </>
                    )}</Formik>
                )
            }


            /**
             * The form layout/html.
             */
            const PredictionForm = props => (
                <Form>
                    <bs.Container fluid>
                        <bs.Row>
                            <bs.Col>
                                <h1 className="mt-3">Fund Predictor</h1>
                            </bs.Col>
                        </bs.Row>
                        <bs.Row className="my-3">
                            <bs.Col md="12">
                                <bs.Card>
                                    <bs.Card.Header>
                                        <bs.Card.Title>Fund Predictor</bs.Card.Title>
                                    </bs.Card.Header>
                                    <bs.Card.Body>
                                        <Input title="Campaign Title:" name="title" type="text" />
                                        <Input title="Description" name="description" type="text" />
                                        <Input title="Goal" name="goal" type="number" />
                                        <Input title="Do you have a beneficiary?" name="hasBeneficiary" type="bool" /> 
                                        <Input title="Do you want your post to be publicly visible?" name="public" type="bool" /> 
                                        <Input title="Category" name="category" type="text" /> 
                                        {/* change category to a dropdown/select list
                                        map this from the categories.js file */}
                                        <Input title="City:" name="city" type="text" />
                                        <Input title="State:" name="state" type="text" />
                                        <Input title="Zip:" name="zip" type="text" />
                                    </bs.Card.Body>
                                  
                                </bs.Card>
                                <bs.Button variant="success" type="submit">
                                    Estimate
                                </bs.Button>
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
