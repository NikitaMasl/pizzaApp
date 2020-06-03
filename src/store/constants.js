export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_ONE_PRODUCT = 'REMOVE_ONE_PRODUCT';
export const DELETE_ORDER = 'DELETE_ORDER';

export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';

export function sortData(data, type){
    return data['products'].filter(product => {
        return product.type === type;
    })
}

export function getCartProduct(id, data){
    return data.filter(el => {
        for(let i = 0; i<id.length; i++){
            if(el.id === id[i]){
                return el;
            }
        }
        return null
    })
}

export function countEuro(data, order){
    let finalBill = 0;
    data.forEach(el => {
        let num = order.reduce((sum, id) => {
            if(el.id === id){
                return sum + 1;
            }else{
                return sum;
            }
        }, 0)
        finalBill += el.Euro*num
    });
    return finalBill;
}

export function countDollars(data, order){
    let finalBill = 0;
    data.forEach(el => {
        let num = order.reduce((sum, id) => {
            if(el.id === id){
                return sum + 1;
            }else{
                return sum;
            }
        }, 0)
        finalBill += el.Dollars*num
    });
    return finalBill;
}

export function getQuantity (array, id){
    let quantity = array.reduce((sum, cur) => {
            if(cur === id){
                return sum + 1;
            }else{
                return sum;
            }
        }, 0)
    return quantity;
}