import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import apiConfig from "../../config/api.config";
const { baseURL, auth, secure, NODE_ENV } = apiConfig;

export const getPlanDetails = (polNo, sysId, token) => async (dispatch) => {
  dispatch({ type: actionTypes?.GET_PLAN_DETAILS_REQUEST });

  try {
    const apiUrl = `${baseURL}auth/getPlanDetail`;
    const payload = {
      polNo,
      sysId,
      Token: token,
    };

    const response = await axios.post(apiUrl, payload);    
    dispatch({
      type: actionTypes.GET_PLAN_DETAILS_SUCCESS,
      planData: response?.data?.errMsg?.responseBody,
    });
  } catch (error) {
   
    dispatch({
      type: actionTypes.GET_PLAN_DETAILS_FAILURE,
      error: error.message,
    });
  }
};



