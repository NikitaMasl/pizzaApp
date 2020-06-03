import React, { Component } from 'react';
import { sortData } from '../store/constants';

import Product from './Product';

export default class Productslist extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
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
                    data:sortData(data, this.props.type)
                }))
                .catch(err => console.log(err))
    }

    render() {
        return (
            <>
            <div className="productlist-title">
                <h2 className='title-productlist'>{this.props.type}</h2>
            </div>
            <section className="productlist-container">
                {this.state.data.map(product => (
                        <Product 
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
            </section>
            </>
        )
    }
}
