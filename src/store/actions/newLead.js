import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import axiosRequest from "../../axios-request/request.methods";

export const createLeadStart = () => {
  return {
    type: actionTypes.CREATE_LEAD_START,
  };
};

export const createLeadSuccess = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_LEAD_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};

export const createLeadFail = (error) => {
  return {
    type: actionTypes.CREATE_LEAD_FAIL,
    error: error,
  };
};

export const createLead = (formData) => {
  return async (dispatch) => {
    dispatch(createLeadStart());
    let result = await axiosRequest.post("user/addlead", formData, {
      secure: true,
    });
    console.log("create LEADDDD_______", result);
    if (result.length > 0 || Object.keys(result).length > 0) {
      return dispatch(createLeadSuccess(result));
    }
  };
};

export const editLeadStart = () => {
  return {
    type: actionTypes.EDIT_LEAD_START,
  };
};

export const editLeadSuccess = (formData) => {
  return {
    type: actionTypes.EDIT_LEAD_SUCCESS,
    formData: formData,
  };
};

export const editLeadFail = (error) => {
  return {
    type: actionTypes.EDIT_LEAD_FAIL,
    error: error,
  };
};

export const editLead = (formData, id) => {
  
  return async (dispatch) => {
    dispatch(editLeadStart());
    // let result = await axiosRequest.put(`user/updateLead/${id}`, formData, {
    let result = await axiosRequest.put(`user/company/update-opportunity`, formData, {
      secure: true,
    });
    // console.warn("update LEADDDD_______", result);
      dispatch(fetchLeadDetails(id))
    // if (result.length > 0) {
      return dispatch(editLeadSuccess(result));
      
    // }
  };
};
export const editLead_broker = (formData, id) => {
  return async (dispatch) => {
    dispatch(editLeadStart());
    let result = await axiosRequest.put(`user/updateopportunityDetails`, formData, {
      secure: true,
    });
    // console.warn("update LEADDDD_______", result);
      dispatch(fetchLeadDetails_broker(id))
      return dispatch(editLeadSuccess(result));
  };
};

export const editCollaborators = (formData, id) => {
  return async (dispatch) => {
    dispatch(editLeadStart());
    // let result = await axiosRequest.put(`user/updateLead/${id}`, formData, {
    let result = await axiosRequest.post(`user/addCollaborator?brokerId=${id}`, formData, {
      secure: true,
    });
    // console.warn("update LEADDDD_______", result);
      dispatch(fetchLeadDetails_broker(id))
    // if (result.length > 0) {
      return dispatch(editLeadSuccess(result));
      
    // }
  };
};


export const fetchLeadDetailsStart = () => {
  return {
    type: actionTypes.FETCH_LEAD_DETAILS_START,
  };
};

export const fetchLeadDetailsSuccess = (leadDetails,  id) => {
  // console.log('(((leadDetails)))------->>>',leadDetails)
  // console.log('(((id)))------->>>',id)
  return {
    type: actionTypes.FETCH_LEAD_DETAILS_SUCCESS,
    leadDetails: leadDetails,
    // appointmentDetails: appointmentDetails,
    // fetchLeadId: id,
  };
};

export const fetchLeadUpdateBody = (body) => {
  return {
    type: actionTypes.FETCH_LEAD_UPDATE_BODY,
    leadUpdateFormdata: body,
  };
};

export const fetchLeadDetailsFail = (error) => {
  return {
    type: actionTypes.FETCH_LEAD_DETAILS_FAIL,
    error: error,
  };
};

export const fetchLeadDetails = (id) => {
  return async (dispatch) => {
    dispatch(fetchLeadDetailsStart());
    let result = await axiosRequest.get(`user/getlead_details/${id}`, {secure: true });
    console.log('__++++++++++++++ getlead_details',result);
    // console.warn("__++++++++++++++ getlead_details", result);
    if (result.length > 0) {
      return dispatch(fetchLeadDetailsSuccess(result[0]));
    }
  };
};
export const fetchLeadDetails_broker = (id) => {
  return async (dispatch) => {
    dispatch(fetchLeadDetailsStart());
    let result = await axiosRequest.get(`user/getbrokerDetails?brokerId=${id}`, {secure: true });
    console.log('__++++++++++++++ getlead_details_broker',result);
    if (result.length > 0) {
      return dispatch(fetchLeadDetailsSuccess(result[0]));
    }
  };
};


export const storeForm = (formData) => {
  return {
    type: actionTypes.STORE_FORM_SUCCESS,
    formData: formData,
  };
};
export const storeLead = (formData) => {
  console.log(formData);
  return (dispatch) => {
    dispatch(storeForm(formData));
  };
};
