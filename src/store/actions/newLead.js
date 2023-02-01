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
    // if (result.length > 0) {
      return dispatch(createLeadSuccess(result));
    // }
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
   
    let result = await axiosRequest.put(`user/updateLead/${id}`, formData, {
      secure: true,
    });
    console.warn("update LEADDDD_______", result);
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

export const fetchLeadDetailsSuccess = (
  leadDetails,
  appointmentDetails,
  id
) => {
  return {
    type: actionTypes.FETCH_LEAD_DETAILS_SUCCESS,
    leadDetails: leadDetails,
    appointmentDetails: appointmentDetails,
    fetchLeadId: id,
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
    // return axios.get(`user/getlead_details/${id}`)
    //     .then(res => {
    //             console.log(res.data.errMsg)
    //             let formData = res.data.errMsg[0]
    //             let appointmentData = res.data.errMsg[1]
    //             if(res.data.errCode===-1){
    //                 return dispatch(fetchLeadDetailsSuccess(formData,appointmentData,id))
    //             }else{
    //                 throw formData
    //             }
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         return dispatch(fetchLeadDetailsFail(error))
    //     })

    let result = await axiosRequest.get(`user/getlead_details/${id}`, {
      secure: true,
    });
    // console.warn('__++++++++++++++ getlead_details',result)
    let leadArr = [];
    result[0].leadStatus !== "" && leadArr.push(result[0].leadStatus);
    result[0].leadDisposition !== "" && leadArr.push(result[0].leadDisposition);
    result[0].leadsubDisposition !== "" &&
      leadArr.push(result[0].leadsubDisposition);

    result[0]["leadStatusArr"] = leadArr;

    // result.forEach(el =>{ el.leadStatusArr = leadArr })
    console.warn("__++++++++++++++ getlead_details", result);
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
