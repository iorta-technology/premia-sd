import * as actionTypes from './actionTypes';
import axios from '../../axios-common';





export const createLeadStart = () => {
    return {
        type: actionTypes.CREATE_LEAD_START
    }
}

export const createLeadSuccess = (formData) => {
    return {
        type: actionTypes.CREATE_LEAD_SUCCESS,
        formData: formData,
    }
} 


export const createLeadFail = (error) => {
    return {
        type: actionTypes.CREATE_LEAD_FAIL,
        error: error
    }
}

export const createLead = (formData) => {
        
    return dispatch => {
        dispatch(createLeadStart())
        return axios.post(`user/addlead`,formData)
            .then(res => {
                if(res.data.errCode===-1){

                    return dispatch(createLeadSuccess(res.data.errMsg))
                }
            })
            .catch(error => {
                return dispatch(createLeadFail(error.response.data.errors))
            })
    }
}

export const storeForm = (formData) => {
    return {
        type: actionTypes.STORE_FORM_SUCCESS,
        formData: formData,
    }
}
export const storeLead = (formData) => {
        
    return dispatch => {
        dispatch(storeForm(formData))
    }
}