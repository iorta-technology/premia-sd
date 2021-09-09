import { combineReducers } from 'redux';
import leadsReducer from './leads';
import addressReducer from './address'
import loginReducer from './auth';
import homeReducer from './home';
import activitiesReducer from './home'
const rootReducer = combineReducers({
    leads:leadsReducer,
    address:addressReducer,
    login:loginReducer,
    home: homeReducer,
    activities: activitiesReducer
});

export default rootReducer;