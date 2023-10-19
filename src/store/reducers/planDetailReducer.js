import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  planData: {},
};

const getPlanDetails = (state, action) => {
    console.log('hujyvuvyiyvi',action?.planData);
  return updateObject(state, {
    planData: action?.planData,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAN_DETAILS_SUCCESS:
      return getPlanDetails(state, action);
    default:
      return state;
  }
};

export default reducer;
