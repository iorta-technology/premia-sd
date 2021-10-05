import * as actionTypes from './actionTypes';
import axios from '../../axios-common';


// Fetch leads data
export const fetchAllLeadsStart = () => {
    return {
        type: actionTypes.FETCH_ALL_LEADS_START
    }
}

export const fetchAllLeadsSuccess = (allLeads,count) => {
    return {
        type: actionTypes.FETCH_ALL_LEADS_SUCCESS,
        allLeads: allLeads,
        count:count
    }
} 


export const fetchAllLeadsFail = (error) => {
    return {
        type: actionTypes.FETCH_ALL_LEADS_FAIL,
        error: error
    }
}

export const fetchAllLeads = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchAllLeadsStart())
        return axios.get(`user/v2/getLead/5df782ab2b5ffa6c72ae1a25?leadfilter=all&skip=${skipVal}`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                return dispatch(fetchAllLeadsSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchAllLeadsFail(error.response.data.errors))
            })
    }
}

// Fetch Designation

export const fetchDesignationStart = () => {
    return {
        type: actionTypes.FETCH_DESIGNATION_START
    }
}

export const fetchDesignationSuccess = (designations) => {
    return {
        type: actionTypes.FETCH_DESIGNATION_SUCCESS,
        designations: designations,
    }
} 


export const fetchDesignationFail = (error) => {
    return {
        type: actionTypes.FETCH_DESIGNATION_FAIL,
        error: error
    }
}

export const fetchDesignation = (channelCode) => {
        
    return dispatch => {
        dispatch(fetchDesignationStart())
        return axios.get(`admin/getDesignationMaster?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70`)
            .then(res => {
                
                if(res.data.errCode === -1){
                    return dispatch(fetchDesignationSuccess(res.data.errMsg[0]))
                } 
            })
            .catch(error => {
                return dispatch(fetchDesignationFail(error.response.data.errors))
            })
    }
}

