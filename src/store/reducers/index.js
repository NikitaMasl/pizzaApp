import { combineReducers } from 'redux';
import { order } from './order';
import{ currency } from './currency'
const rootReducer = combineReducers({ order, currency });

export default rootReducer;