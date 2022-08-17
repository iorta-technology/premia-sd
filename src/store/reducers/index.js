import { combineReducers } from 'redux';
import leadsReducer from './leads';
import createLeadReducer from './newLead'
import addressReducer from './address'
import loginReducer from './auth';
import homeReducer from './home';
import activitiesReducer from './home';
import kpiDashboardReducer from './kpiDashboard'
import renewalReducer from './renewals'
import productReducer from './product'
import agentReducer from './agentMicroSite'
import advisorReducer from './advisor'
import applicationReducer from './applicationreducer'
import BICardReducer from './BICardReducer';
// import activitiesReducer from './home'
import historyReducer from './history'
// import pendencyReducer from './penc'
const rootReducer = combineReducers({
    leads:leadsReducer,
    newLead:createLeadReducer,
    address:addressReducer,
    login:loginReducer,
    home: homeReducer,
    activities: activitiesReducer,
    kpiDashboard: kpiDashboardReducer,
    renewals: renewalReducer,
    history:historyReducer,
    product:productReducer,
    agent:agentReducer,
    advisor:advisorReducer,
    applicationReducer,
    BICardReducer,
    // pendencies:pendencyReducer
});

export default rootReducer;