import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  agentData: {},
  maturityData: {},
  planTerminationData: {},
  cashLoanData: {},
  claimData: {}
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
    planTerminationData: action.planTerminationData,
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
