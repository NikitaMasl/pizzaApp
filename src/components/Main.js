import React, { Component } from 'react';
import {
    BrowserRouter as Router, 
    Route
  } from 'react-router-dom';

import Headermenu from './Headermenu';
import Productslist from './Productslist';
import Sidebar from './Sidebar';
import Cart from './Cart';

export default class Main extends Component {
    render() {
        console.log('!!!')
        return (
            <>
                <Router>
                    <Headermenu />
                    <Sidebar />
                    <main>
                        <Route exact path='/superPizza/'><Productslist type='pizza'/></Route>
                        <Route path='/superPizza/set'><Productslist type='set'/></Route>
                        <Route path='/superPizza/drink'><Productslist type='drink'/></Route>
                        <Route path='/superPizza/cart' component={Cart} />
                    </main>
                </Router>
            </>
        )
    }
}
