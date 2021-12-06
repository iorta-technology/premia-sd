import * as actionTypes from './actionTypes';
import axios from '../../axios-common';




export const createLeadStart = () => {
    return {
        type: actionTypes.CREATE_LEAD_START
    }
}

export const createLeadSuccess = (formData,succMsg) => {
    return {
        type: actionTypes.CREATE_LEAD_SUCCESS,
        formData: formData,
        succMsg:succMsg
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
                    const response = res.data.errMsg
                    const succMsg = 'Lead Created Successfully'
                    console.log('creat action',response)
                    return dispatch(createLeadSuccess(...response,succMsg))

                }else{
                    throw res
                }
            })
            .catch(error => {
                console.log(error)
                const errorMessage = error.data.errMsg
                return dispatch(createLeadFail(errorMessage))
            })
    }
}

export const editLeadStart = () => {
    return {
        type: actionTypes.EDIT_LEAD_START
    }
}

export const editLeadSuccess = (formData) => {
    return {
        type: actionTypes.EDIT_LEAD_SUCCESS,
        formData: formData,
    }
} 


export const editLeadFail = (error) => {
    return {
        type: actionTypes.EDIT_LEAD_FAIL,
        error: error
    }
}

export const editLead = (formData,id) => {
        
    return dispatch => {
        dispatch(editLeadStart())
        return axios.put(`user/updateLead/${id}`,formData)
            .then(res => {
                if(res.data.errCode===-1){
                    let formData = res.data.errMsg[0]
                    let appointmentData = res.data.errMsg[1]

                    return dispatch(editLeadSuccess(formData,appointmentData))
                }else{
                    throw res
                }
            })
            .catch(error => {
                const errorMessage = error.data.errMsg

                return dispatch(editLeadFail(errorMessage))
            })
    }
}

export const fetchLeadDetailsStart = () => {
    return {
        type: actionTypes.FETCH_LEAD_DETAILS_START
    }
}

export const fetchLeadDetailsSuccess = (leadDetails,appointmentDetails,id) => {
    return {
        type: actionTypes.FETCH_LEAD_DETAILS_SUCCESS,
        leadDetails: leadDetails,
        appointmentDetails: appointmentDetails,
        fetchLeadId:id,

    }
} 


export const fetchLeadDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_LEAD_DETAILS_FAIL,
        error: error
    }
}

export const fetchLeadDetails = (id) => {
        
    return dispatch => {
        dispatch(fetchLeadDetailsStart())
        return axios.get(`user/getlead_details/${id}`)
            .then(res => {
                    console.log(res.data.errMsg)
                    let formData = res.data.errMsg[0]
                    let appointmentData = res.data.errMsg[1]
                    if(res.data.errCode===-1){
                        return dispatch(fetchLeadDetailsSuccess(formData,appointmentData,id))
                    }else{
                        throw formData
                    }
            })
            .catch(error => {
                console.log(error)
                return dispatch(fetchLeadDetailsFail(error))
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
        console.log(formData)
    return dispatch => {
        dispatch(storeForm(formData))
    }
}



