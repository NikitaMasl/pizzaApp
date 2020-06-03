import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Breadcrumb extends Component {
    render() {
        return (
            <div className='breadcrumb'>
                <ul>
                    <li><NavLink to='/superPizza/'>Main</NavLink></li>
                    <li>-</li>
                    <li>Cart</li>
                </ul>       
            </div>
        )
    }
}
