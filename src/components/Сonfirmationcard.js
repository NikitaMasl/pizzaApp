import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuantity } from '../store/constants';

class Сonfirmationcard extends Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            name: "",
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
        const { quantity, name, Euro, Dollars, currency } = this.state;
        return (
            <tr>
                <td>
                    <p style={{textAlign: 'left'}}>{name}</p>
                </td>
                <td>
                    {quantity}
                </td>
                <td> 
                    {
                        currency === 'dollars'
                        ?
                        <p>{(Dollars*quantity).toFixed(2)} <i className="fas fa-dollar-sign"></i></p>
                        :
                        <p>{(Euro*quantity).toFixed(2)} <i className="fas fa-euro-sign"></i></p>
                    }
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

export default connect(mapStateProps)(Сonfirmationcard);
