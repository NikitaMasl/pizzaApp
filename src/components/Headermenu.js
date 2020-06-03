import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { changeCurrency } from '../store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Headermenu extends Component {
    constructor(props){
        super(props);
        this.state={
            corrency: this.props.currency,
            orderLength: this.props.order.length
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState !== nextProps) {          
            return {
                orderLength: nextProps.order.length,
                corrency: nextProps.currency
            }
        }
        return null
    }
    render() {
        return (
        <header>
            <nav>           
                <div className='currency-switcher'>
                    <button className={
                        this.state.corrency === 'dollars'
                        ?
                        "dollars btn btn-outline-warning active"
                        :
                        "dollars btn btn-outline-warning"
                        } onClick={() => {
                        this.props.changeCurrency('dollars')
                    }}>
                        <i className="fas fa-dollar-sign"></i>
                    </button>
                    <button className={
                        this.state.corrency === 'euro'
                        ?
                        "dollars btn btn-outline-warning active"
                        :
                        "dollars btn btn-outline-warning"
                        }  onClick={() => {
                        this.props.changeCurrency('euro')
                    }}>
                        <i className="fas fa-euro-sign"></i>
                    </button>
                </div>
                <div className="menu-wrapper">
                    <div className="login-container">
                        <i className="fas fa-user"></i>
                        <h5>Log in</h5>
                    </div>
                    <NavLink to='/superPizza/cart'>
                        <div className="cart-container">
                            <i className="fas fa-shopping-cart"></i>
                            <div className='order-counter'>
                                {this.state.orderLength}
                            </div>
                        </div>
                    </NavLink>
                </div>         
            </nav>
            </header>
        )
    }
}
const mapStateProps = (state) => {
    return {
        order: state.order,
        currency: state.currency
    };
};
const mapActionToProps = (dispatch) => {
    return {
        changeCurrency: bindActionCreators(changeCurrency, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Headermenu);
