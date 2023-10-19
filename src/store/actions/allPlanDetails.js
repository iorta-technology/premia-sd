import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import { Redirect, Route } from "react-router";
import { useHistory } from "react-router";
import axiosRequest from "../../axios-request/request.methods";
import apiConfig from "../../config/api.config";




export const getAgentDetails = (payload) => {
  // console.log("login success ========", payload);
  return {
    type: actionTypes.GET_AGENT_DETAILS,
    agentData: payload,
  };
};

export const getMaturityDetails = (payload) => {
  // console.log("login success ========", payload);
  return {
    type: actionTypes.GET_MATURITY_DETAILS,
    maturityData: payload,
  };
};

export const getPlanTermination = (payload) => {
  // console.log("login success ========", payload);
  return {
    type: actionTypes.GET_PLAN_TERMINATION,
    planTerminationData: payload,
  };
};

export const getClaimsDetails = (payload) => {
  // console.log("login success ========", payload);
  return {
    type: actionTypes.GET_CLAIM,
    claimData: payload,
  };
};

export const getCashLoan = (payload) => {
  // console.log("login success ========", payload);
  return {
    type: actionTypes.GET_CASH_LOAN,
    cashLoanData: payload,
  };
};
