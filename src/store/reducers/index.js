import { combineReducers } from 'redux';
import leadsReducer from './leads';
import loginReducer from './auth'
const rootReducer = combineReducers({
    leads:leadsReducer,
    login:loginReducer
});

export default rootReducer;