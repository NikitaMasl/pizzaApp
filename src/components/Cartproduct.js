import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeProduct, removeOneProduct, addProduct } from '../store/action';
import { bindActionCreators } from 'redux';
import { getQuantity } from '../store/constants';

class Cartproduct extends Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            type: "",
            name: "",
            img: "",
            description: "",
            Euro: '',
            Dollars: '',
            order: this.props.order,
            quantity: 0,
            currency: this.props.currency
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState !== nextProps) {          
            return {
                id : nextProps.id,
                type : nextProps.type,
                name : nextProps.name,
                img : nextProps.img,
                description : nextProps.description,
                Euro : nextProps.Euro,
                Dollars : nextProps.Dollars,
                order: nextProps.order,
                quantity: getQuantity(nextProps.order, nextProps.id),
                currency: nextProps.currency
            }
        }
        return null;
    }

    render() {
        const { id, quantity, name, img, Euro, Dollars, currency } = this.state;
        return (
            <tr>
                <td>
                    <img src={'./img/'+img+'.jpeg'} className="card-img" alt="..." style={{width: '80px', height: '80px'}} />
                </td>
                <td style={{textAlign:'left'}}>
                    <p>{name}</p>
                </td>
                <td align="center">
                    <div className="counter-container">
                        <button className="btn-minus btn btn-outline-warning" onClick={ () =>{
                            this.props.removeOneProduct(id)
                            }}>
                            <i className="fas fa-minus"></i>
                        </button>
                        <div className='number-container'>
                            <h4>{quantity}</h4>
                        </div>
                        <button className="btn-plus btn btn-outline-warning" onClick={ () =>{
                            this.props.addProduct(id)
                            }}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </td>
                <td>
                    {
                        currency === 'dollars'
                        ?
                        <p>{Dollars.toFixed(2)} <i className="fas fa-dollar-sign"></i></p>
                        :
                        <p>{Euro.toFixed(2)} <i className="fas fa-euro-sign"></i></p>
                    }
                </td>
                <td style={{width: '100px'}}> 
                    {
                        currency === 'dollars'
                        ?
                        <p>{(Dollars*quantity).toFixed(2)} <i className="fas fa-dollar-sign"></i></p>
                        :
                        <p>{Euro.toFixed(2)*quantity} <i className="fas fa-euro-sign"></i></p>
                    }
                </td>
                <td>
                    <div className="remove-btn" onClick={() => {
                        this.props.removeProduct(id);
                    }}>
                        <i className="far fa-times-circle"></i>
                    </div>
                </td>
            </tr>
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
        removeProduct: bindActionCreators(removeProduct, dispatch),
        removeOneProduct: bindActionCreators(removeOneProduct, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Cartproduct);
