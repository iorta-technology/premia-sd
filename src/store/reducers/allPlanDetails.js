import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  planData: {},
};

const getAllPlanDetails = (state, action) => {
  return updateObject(state, {
    planData: action.planData,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PLAN_DETAILS:
      return getAllPlanDetails(state, action);
    default:
      return state;
  }
};

export default reducer;
