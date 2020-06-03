import { ADD_PRODUCT } from '../constants';
import { REMOVE_PRODUCT } from '../constants';
import { REMOVE_ONE_PRODUCT } from '../constants';
import { DELETE_ORDER } from '../constants';

import { load } from 'redux-localstorage-simple';

let ORDER = load({ namespace:'order' });
if(!ORDER || !ORDER.order || !ORDER.order.length){
    ORDER = {
        order: [],
    }
}

export const order = (state = ORDER.order, { id, type }) => {
    switch (type){
        case ADD_PRODUCT:
            return [...state, id];
        case REMOVE_PRODUCT:
            return [...state].filter(product => product !== id);
        case REMOVE_ONE_PRODUCT:
            let num = 0;
            return  [...state].filter(product => {
                if( num === 0){
                    if(product === id){
                        num = 1;
                        return false;
                    }else{
                        return true
                    }
                }else{
                    return true;
                }
            });
        case DELETE_ORDER:
            return [];
        default:
            return state;
    }
}