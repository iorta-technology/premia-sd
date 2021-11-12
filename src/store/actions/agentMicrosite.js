import * as actionTypes from './actionTypes';
import axios from '../../axios-common';

// Fetch leads data
export const fetchAgentDetailsStart = () => {
    return {
        type: actionTypes.FETCH_AGENT_DETAILS_START
    }
}

export const fetchAgentDetailsSuccess = (agentDetails) => {
    return {
        type: actionTypes.FETCH_AGENT_DETAILS_SUCCESS,
        agentDetails: agentDetails,
    }
} 


export const fetchAgentDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_AGENT_DETAILS_FAIL,
        error: error
    }
}

export const fetchAgentDetails = (agentId) => {
    return dispatch => {
        dispatch(fetchAgentDetailsStart())
        return axios.get(`user/get-microsite-settings/${agentId}`)
            .then(res => {
                // console.log(res.data.data)
                const response = res.data
                return dispatch(fetchAgentDetailsSuccess(response.data))
                // if(response.status===200){
                // }
            })
            .catch(error => {
                console.log(error)
                return dispatch(fetchAgentDetailsFail(error))
            })
    }
}