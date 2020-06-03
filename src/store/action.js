import { ADD_PRODUCT } from './constants';
import { REMOVE_PRODUCT } from './constants';
import { REMOVE_ONE_PRODUCT } from './constants';
import { DELETE_ORDER } from './constants'

import { CHANGE_CURRENCY } from './constants';

export const addProduct = (id) => {
    return {
        type: ADD_PRODUCT,
        id
    }
}

export const removeProduct = (id) => {
    return {
        type: REMOVE_PRODUCT,
        id
    }
}

export const removeOneProduct = (id) => {
    return {
        type: REMOVE_ONE_PRODUCT,
        id
    }
}

export const deleteOrder = () => {
    return{
        type: DELETE_ORDER
    }
}

export const changeCurrency = (cur) => {
    return {
        type: CHANGE_CURRENCY,
        cur
    }
}




