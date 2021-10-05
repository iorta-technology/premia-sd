import { combineReducers } from 'redux';
import leadsReducer from './leads';
import createLeadReducer from './newLead'
import addressReducer from './address'
import loginReducer from './auth';
import homeReducer from './home';
import activitiesReducer from './home'
// import pendencyReducer from './penc'
const rootReducer = combineReducers({
    leads:leadsReducer,
    newLead:createLeadReducer,
    address:addressReducer,
    login:loginReducer,
    home: homeReducer,
    activities: activitiesReducer,
    // pendencies:pendencyReducer
});

export default rootReducer;