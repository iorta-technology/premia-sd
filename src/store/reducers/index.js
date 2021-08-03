import { combineReducers } from 'redux';
import leadsReducer from './leads';

const rootReducer = combineReducers({
    leads:leadsReducer
});

export default rootReducer;