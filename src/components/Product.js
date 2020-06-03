import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/action';
import { bindActionCreators } from 'redux';

class Product extends Component {
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
            currency: this.props.currency,
            isInCard: this.props.order.indexOf(this.props.id)
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
                currency: nextProps.currency,
                isInCard: nextProps.order.indexOf(nextProps.id)
            }
        }
        return null;
    }
    render() {
        const { id, name, img, description, Euro, Dollars, currency, isInCard } = this.state;
        return (
            <div className="card" style={{width: '18rem'}}>
                <img src={'./img/'+img+'.jpeg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text" style={{minHeight:'100px'}}>{description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {
                    currency === 'dollars'
                    ?
                    <li className="list-group-item">It costs {Dollars.toFixed(2)} <i className="fas fa-dollar-sign"></i></li>
                    :
                    <li className="list-group-item">It costs {Euro.toFixed(2)} <i className="fas fa-euro-sign"></i></li>
                    }
                </ul>
                <div className="card-body">
                    <button type="button" className={
                    isInCard !== -1
                    ?
                    "btn btn-outline-warning background-black"
                    :
                    "btn btn-outline-warning"
                    } 
                    onClick={(e) => {
                        this.props.addProduct(id);
                    }}
                    disabled={
                        isInCard !== -1
                        ?
                        true
                        :
                        false
                    }
                    >
                    {
                       isInCard !== -1
                    ?
                        <p>In a cart</p>
                    :
                        <p>Add to Cart</p>
                    }
                    </button>
                </div>
            </div>
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
        addProduct: bindActionCreators(addProduct, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Product);