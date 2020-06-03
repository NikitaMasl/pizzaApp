import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <aside>
                <div className="logo-img-aside">
                    <img src='./img/Logo.png' alt="logo"/>
                </div>
                <div className="tel-aside">
                    <h4><a href="tel:+71234567890">(123) 456-78-90</a></h4>
                    <p>
                        Work time: 24 hours a day
                    </p>
                </div>
                <nav className="nav-sidebar nav justify-content-center">
                  <ul>
                      <li>
                        <NavLink to='/superPizza/' className="links-siderbar">
                          <i className="fas fa-pizza-slice"></i>
                          <h4>Pizza</h4>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/superPizza/set' className="links-siderbar">
                          <i className="fas fa-utensils"></i>
                          <h4>Set</h4>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/superPizza/drink' className="links-siderbar">
                          <i className="fas fa-glass-martini-alt"></i>
                          <h4>Drinks</h4>
                        </NavLink>
                      </li>
                  </ul>
                </nav>
            </aside>
        )
    }
}
