import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  planData: {},
  agentData: {},
  maturityData: {},
  planTerminatioData: {},
  cashLoanData: {},
  claimData: {}
};

const getAllPlanDetails = (state, action) => {
  return updateObject(state, {
    planData: action.planData,
  });
};
const getAgentDetails = (state, action) => {
  return updateObject(state, {
    agentData: action.agentData,
  });
};

const getMaturityDetails = (state, action) => {
  return updateObject(state, {
    maturityData: action.maturityData,
  });
};
const getPlanTermination = (state, action) => {
  return updateObject(state, {
    planTerminatioData: action.planTerminatioData,
  });
};
const getClaimsDetails = (state, action) => {
  return updateObject(state, {
    claimData: action.claimData,
  });
};
const getCashLoan = (state, action) => {
  return updateObject(state, {
    cashLoanData: action.cashLoanData,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PLAN_DETAILS:
      return getAllPlanDetails(state, action);
    case actionTypes.GET_AGENT_DETAILS:
      return getAgentDetails(state, action);
    case actionTypes.GET_MATURITY_DETAILS:
      return getMaturityDetails(state, action);
    case actionTypes.GET_PLAN_TERMINATION:
      return getPlanTermination(state, action);
      case actionTypes.GET_CASH_LOAN:
        return getCashLoan(state, action);
        case actionTypes.GET_CLAIM:
        return getClaimsDetails(state, action);
    default:
      return state;
  }
};

export default reducer;
