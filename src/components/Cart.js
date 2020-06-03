import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct, deleteOrder } from '../store/action';
import { bindActionCreators } from 'redux';
import Portal from '../portal/Portal';

import { getCartProduct, countEuro, countDollars} from '../store/constants';

import Breadcrumb from './Breadcrumb';
import Cartproduct from './Cartproduct';
import Сonfirmationcard from './Сonfirmationcard';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            idArray: this.props.order,
            data: [],
            billInEuro: 0,
            billInDollars: 0,
            currency: this.props.currency,
            isConformationOpen: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState !== nextProps){
            return {
                idArray : nextProps.order,
                data: getCartProduct(nextProps.order, prevState.data),
                billInEuro: countEuro(prevState.data, nextProps.order),
                billInDollars: countDollars(prevState.data, nextProps.order),
                currency: nextProps.currency
            }
            
        }
        return null
    }

    componentDidMount(){
        fetch("http://allbestballs.ru/superPizza/data/data.json", {                
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
                .then(res => res.json())
                .then(data => this.setState({
                    data:data["products"]
                }))
                .catch(err => console.log(err))
    }

    render() {
        const { billInDollars, billInEuro, currency, isConformationOpen } = this.state;
        return (
            <>
                {                     
                this.state.idArray.length === 0
                ?
                <section className="cart-section">
                    <Breadcrumb />
                    <h1>Your cart is empty, choose something!</h1> 
                </section>
                :
                <>   
                    <section className="cart-section">
                        <Breadcrumb />
                            <div className="cart-products-list">
                                <h3>Your order:</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th><h5 style={{textAlign: 'left'}}>Name</h5></th>
                                            <th><h5>Quantity</h5></th>
                                            <th><h5>Price per one</h5></th>
                                            <th><h5>Total</h5></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data.map(product => (
                                            <Cartproduct 
                                                key={product.id}
                                                id={product.id}
                                                type={product.type}
                                                name={product.name}
                                                img={product.img}
                                                description={product.description}
                                                Euro={product.Euro}
                                                Dollars={product.Dollars}
                                            />
                                        ))
                                        }
                                        <tr className='final-bill'>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr className='final-bill'>
                                            <td><h4 style={{textAlign: 'left'}}>Delivery</h4></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Free</td>
                                            <td></td>
                                        </tr>
                                        <tr className='total-tr'>
                                            <td><h4 style={{textAlign: 'left'}}>Total</h4></td>
                                            <td></td>
                                            <td><h4>{this.props.order.length}</h4></td>
                                            <td></td>
                                            <td> 
                                            {
                                                currency === 'dollars'
                                                ?
                                                <p>{billInDollars.toFixed(2)} <i className="fas fa-dollar-sign"></i></p>
                                                :
                                                <p>{billInEuro.toFixed(2)} <i className="fas fa-euro-sign"></i></p>
                                            }
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    </section>
                    <section className="final-price-section">
                        <div>
                            <button className="btn btn-outline-warning" onClick={() => {
                                this.setState({
                                    isConformationOpen: true
                                })
                                document.body.style.overflow = 'hidden';
                            }}>
                                    Confirm Order
                            </button>
                        </div>
                    </section>
                </>
                }
                 {
                        isConformationOpen
                        ?(
                            <div>
                                <Portal>
                                    <div className="overlay">
                                        <div className="card" id="portal-card">
                                            <div className="card-body">
                                                <div className="check-order">
                                                    <h5 className="card-title">Your order</h5>
                                                    {
                                                    this.state.data !== []
                                                    ?
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th style={{textAlign: 'left'}}>Name</th>
                                                                <th>Quantity</th>
                                                                <th>Cost</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.data.map(product => (
                                                                <Сonfirmationcard 
                                                                    key={product.id}
                                                                    id={product.id}
                                                                    type={product.type}
                                                                    name={product.name}
                                                                    Euro={product.Euro}
                                                                    Dollars={product.Dollars}
                                                                />
                                                            ))
                                                        }   
                                                            <tr style={{borderTop:'2px solid black'}}>
                                                                <td><h4 style={{textAlign: 'left'}}>Total Amount:</h4></td>
                                                                <td>{this.props.order.length}</td>
                                                                <td>
                                                                    {
                                                                        currency === 'dollars'
                                                                        ?
                                                                        <p>{billInDollars.toFixed(2)} <i className="fas fa-dollar-sign"></i></p>
                                                                        :
                                                                        <p>{billInEuro.toFixed(2)} <i className="fas fa-euro-sign"></i></p>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    :null
                                                    }
                                                    <div>
                                                        <button className="btn btn-outline-warning" onClick={() => {
                                                            document.getElementsByClassName('check-order')[0].style.display = 'none';
                                                            document.getElementsByClassName('success-text')[0].style.display = 'block';
                                                            this.props.deleteOrder();
                                                        }}>
                                                            Confirm Order
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="close-portal" onClick={() => {
                                                this.setState({
                                                    isConformationOpen: false
                                                })
                                                document.body.style.overflow = 'visible';
                                                }}>
                                                    <i className="far fa-times-circle"></i>
                                                </div>
                                                <div className="success-text">
                                                    <p><i className="fas fa-check-circle"></i> Order placed successfully</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Portal>
                            </div>
                        ):null
                    }
            </>
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
        addProduct: bindActionCreators(addProduct, dispatch),
        deleteOrder: bindActionCreators(deleteOrder, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Cart);
