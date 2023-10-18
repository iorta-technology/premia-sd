import { combineReducers } from "redux";
import leadsReducer from "./leads";
import createLeadReducer from "./newLead";
import addressReducer from "./address";
import loginReducer from "./auth";
import getAllPlanDetails from "./allPlanDetails";
import getAgentDetails from "./allPlanDetails";
import getMaturityDetails from "./allPlanDetails";
import getPlanTermination from "./allPlanDetails";
import homeReducer from "./home";
import activitiesReducer from "./home";
import kpiDashboardReducer from "./kpiDashboard";
import renewalReducer from "./renewals";
import productReducer from "./product";
import agentReducer from "./agentMicroSite";
import advisorReducer from "./advisor";
import applicationReducer from "./applicationreducer";
// import BICardReducer from './BICardReducer';
// import activitiesReducer from './home'
import historyReducer from "./history";

import configureStore from "../CreateStore";

// import pendencyReducer from './penc'
export default () => {
  const rootReducer = combineReducers({
    leads: leadsReducer,
    newLead: createLeadReducer,
    address: addressReducer,
    login: loginReducer,
    home: homeReducer,
    activities: activitiesReducer,
    kpiDashboard: kpiDashboardReducer,
    renewals: renewalReducer,
    history: historyReducer,
    product: productReducer,
    agent: agentReducer,
    advisor: advisorReducer,
    applicationReducer,
    planDetails: getAllPlanDetails,
    agentDetails: getAgentDetails,
    maturityDetails: getMaturityDetails,
    planTermination: getPlanTermination,
    // BICardReducer,
    // pendencies:pendencyReducer
  });

  return configureStore(rootReducer);
};

// export default rootReducer;
