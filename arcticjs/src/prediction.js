import React from 'react'
import * as bs from 'react-bootstrap'
import axios from 'axios'
import { Formik, Form, Field} from 'formik'
// import { formatNumber } from './util'
import AppContext from './context'



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
                goal: '1000',
                title: 'Daniel needs a home',
                description: 'Daniel has been homeless for a little over 3 years. He hasnt had many opportunities to find work after escaping the drug cartel.',
                city: "Palm Springs",
                state: "CA",
                zip: '84606',
                category: 'Dreams',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                console.log('validating', values)
                return {}
            }}
            onSubmit={async (values, actions) => {
                console.log('submit', values)


                //Django Request

                let userInput = {
                    "auto_fb_post_mode": "False",                            
                    "category_id": 9,
                    "goal": values.goal,
                    "title": values.title,
                    "description": values.description,
                    "location_city": values.city,
                    "location_state": values.state,
                    "location_zip": values.zip,
                    "is_charity": "True",
                    "DonationPerDay": 10000,
                }

                const resp = await axios.post('http://localhost:8000/api/prediction/', userInput)

                let output = JSON.parse(resp.data)
                console.log("++++++++++++++", output)

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
                                        <label>
                                            Category: <br />
                                            <select name="category_id">
                                                <option value="15">-</option>
                                                <option value="2">Accidents & Emergencies</option>
                                                <option value="3">Animals & Pets</option>
                                                <option value="4">Babies, Kids & Family</option>
                                                <option value="5">Business & Entrepreneurs</option>
                                                <option value="6">Celebrations & Events</option>
                                                <option value="7">Community & Neighbors</option>
                                                <option value="19">Competitions & Pageants</option>
                                                <option value="8">Creative Arts, Music & Film</option>
                                                <option value="20">Dreams, Hopes & Wishes</option>
                                                <option value="17">Education & Learning</option>
                                                <option value="9">Funerals & Memorials</option>
                                                <option value="11">Medical, Illness & Healing</option>
                                                <option value="12">Missions, Faith & Church</option>
                                                <option value="13">Non-Profits & Charities</option>
                                                <option value="16">Sports, Teams & Clubs</option>
                                                <option value="10">Travel & Adventure</option>
                                                <option value="18">Volunteer & Service</option>
                                                <option value="14">Weddings & Honeymoons</option>
                                            </select>
                                        </label>    <br />
                                       <Input title="City:" name="city" type="text" />
                                       <Input title="State:" name="state" type="text" />
                                       <Input title="Zip:" name="zip" type="text" />
                                        <label for="charity">Is this for a charity? </label> <input id="charity" name="is_charity" type="checkbox" />
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
