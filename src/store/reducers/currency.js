import { CHANGE_CURRENCY } from '../constants';

let CURRENCY = {
    currency: 'dollars',
}

export const currency = (state = CURRENCY.currency, { cur, type }) => {
    switch (type){
        case CHANGE_CURRENCY:
            return cur;
        default:
            return state;
    }
}