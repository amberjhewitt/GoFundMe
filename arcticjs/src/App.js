import React from 'react'
import * as bs from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HeaderContainer from './header-container'
import LeftContainer from './left-container'
import FooterContainer from './footer-container'
import Prediction from './prediction'
import Description from './description'
import Home from './home'
import './App.scss'


function App(props) {
    return (
        <Router>
            <bs.Container fluid className="p-0 min-vh-100 d-flex flex-column">
                <bs.Row noGutters className="flex-grow-0 flex-shrink-0 border-bottom shadow-sm">
                    <bs.Col className="px-3 py-2">
                        <HeaderContainer />
                    </bs.Col>
                </bs.Row>
                <bs.Row noGutters className="flex-grow-1">
                    <bs.Col md="2" className="px-3 py-4 border-right">
                        <LeftContainer />
                    </bs.Col>
                    <bs.Col md="8">
                        <Switch>
                            <Route path="/predict">
                                <Prediction />
                            </Route>
                            <Route path="/campaign">
                                <Description />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </bs.Col>
                </bs.Row>
                <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
                    <bs.Col className="px-3 py-2">
                        <FooterContainer />
                    </bs.Col>
                </bs.Row>
            </bs.Container>
        </Router>
    )
}
export default App
