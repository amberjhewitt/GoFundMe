import React from 'react'
import * as bs from 'react-bootstrap'
import axios from 'axios'
import { Formik, Form, Field} from 'formik'



function Checkout(props) {
    return (
            <CheckoutController />
    )
}
export default Checkout

const CheckoutController = props => {

    return (
        <Formik
            initialValues={{
                goal: '',
                title: '',
                description: '',
                city: "",
                state: "",
                zip: '',
                category: '',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                return {}
            }}
            onSubmit={async (values, actions) => {


                //Django Request

                if(values.is_charity != true) {
                    values.is_charity = false
                }

                let userInput = {       
                    "goal": values.goal,
                    "title": values.title,
                    "description": values.description,
                    "location_city": values.city,
                    "location_state": values.state,
                    "location_zip": values.zip,
                    "is_charity": values.is_charity,
                    "DonationPerDay": 125.00,
                }

                //Send request to server (view.py)
                const resp = await axios.post('http://localhost:8000/api/prediction/', userInput)

                let output = JSON.parse(resp.data)

                let result = parseFloat(output.Results.output1.value.Values[0], 2)

                let goalCompletion = parseInt(parseInt(userInput.goal)/result)

                document.getElementById('result').innerHTML = "Predicted amount of Donations per Day: <strong>$" + result + "</strong>"
                document.getElementById('goalEstimate').innerHTML = "Anticipated completion time: <strong>" + goalCompletion + " days</strong>"

                let quality = ""
                let qualityAlt = ""
                let imageurl = ''
                let qualityText = ''
                
                if (result >= 100) {
                    quality = "High"
                    qualityAlt = 'high'
                    document.getElementById('qualityText').innerHTML = "Campaign Quality: Way to go! You're campaign is high quality. You're going to have a lot of success!"
                    document.getElementById('qualityImg').innerHTML = "<img alt='quality image' src='/media/high.png' className='qualityImage'/>"
                }
                else if(result >= 50) {
                    quality = "Medium"
                    qualityAlt = 'medium'
                    document.getElementById('qualityText').innerHTML = "Campaign Quality: Nice work! You're campaing could still use some work. Keep making improvements!"
                    document.getElementById('qualityImg').innerHTML = "<img alt='quality image' src='/media/medium.png' className='qualityImage'/>"
                }
                else if(result > 0){
                    quality = "To be determined"
                    qualityAlt = 'none'
                    document.getElementById('qualityText').innerHTML = "Campaign Quality: Hmmm... something must not be right. Please review your inputs."
                    document.getElementById('qualityImg').innerHTML = "<img alt='quality image' src='/media/low.png' className='qualityImage'/>"
                }
                else{
                    quality = "Low"
                    qualityAlt = 'low'
                    document.getElementById('qualityText').innerHTML = "Campaign Quality: Your campaign quality is low. Try making more improvements to your description for better results!"
                    document.getElementById('qualityImg').innerHTML = "<img alt='quality image' src='/media/none.png' className='qualityImage'/>"
                }

                

            }}
            >{form => (
                <>
                    <PredictionForm form={form}/>
                </>
                    )}</Formik>
                
                {/* Pop Up Suggestions */}
            <div className="proTips">
                <h3>Want to improve your chances of a successful campaign?</h3>
                <p>
                    These suggestions come directly from our prediction model!
                    <ul>
                        <li>Make sure your title is specific to the cause. For example, if COVID-19 factors into your situation, include that key word!</li>
                        <li>Description: Explain your cause in detail.</li>
                        <li>Choose the category that best describes your fundraiser.</li>
                        <li>Don't forget to post to Facebook!</li>
                    </ul>
                </p>
            </div>
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
                                       <Input title="City:" name="city" type="text" />
                                       <Input title="State:" name="state" type="text" />
                                       <Input title="Zip:" name="zip" type="text" />
                                        <label for="charity">Is this a charity?</label><Input id="charity" name="is_charity" type="checkbox" />
                                    </bs.Card.Body>
                                  
                                </bs.Card>
                                <br />
                                <bs.Button variant="success" type="submit">
                                    Estimate
                                </bs.Button>
                                <br />
                                <br />
                                <div className='float-lft'>
                                    <h3 id="result"></h3>
                                    <h3 id="goalEstimate"></h3>
                                    <p id="qualityImg"></p>
                                    <bs.Col className={`${props.qualityAlt}Quality`}>
                                        <span id="qualityText"></span>
                                    </bs.Col>
                                    <bs.Col className={`${props.qualityAlt}Quality`}>
                                        {props.qualityText}
                                    </bs.Col>
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
                            type={props.type}  // ...rProps.field may override this default
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
