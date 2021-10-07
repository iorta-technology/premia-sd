import { combineReducers } from 'redux';
import leadsReducer from './leads';
import addressReducer from './address'
import loginReducer from './auth';
import homeReducer from './home';
import activitiesReducer from './home';
import kpiDashboardReducer from './kpiDashboard'
import renewalReducer from './renewals'
const rootReducer = combineReducers({
    leads:leadsReducer,
    address:addressReducer,
    login:loginReducer,
    home: homeReducer,
    activities: activitiesReducer,
    kpiDashboard: kpiDashboardReducer,
    renewals: renewalReducer
});

export default rootReducer;