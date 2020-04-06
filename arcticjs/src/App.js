import React from 'react'
import * as bs from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HeaderContainer from './header-container'
import LeftContainer from './left-container'
import RightContainer from './right-container'
import FooterContainer from './footer-container'
import ProductDetail from './product-detail'
import Home from './home'
import Cart from './cart'
import Checkout from './checkout'
import CheckoutStarter from './checkout-starter'
import Receipt from './receipt'
import About from './about'
import Help from './help'
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
                            <Route path="/product">
                                <ProductDetail />
                            </Route>
                            <Route path="/cart">
                                <Cart />
                            </Route>
                            <Route path="/checkout-starter">
                                <CheckoutStarter />
                            </Route>
                            <Route path="/checkout">
                                <Checkout />
                            </Route>
                            <Route path="/receipt">
                                <Receipt />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/help">
                                <Help />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </bs.Col>
                    <bs.Col md="2" className="px-3 py-4 border-left">
                        <RightContainer />
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
