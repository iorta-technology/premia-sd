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

export const fetchAgentDetails = (name,agentId) => {
       let noAgent = 'No agent exist'
    return dispatch => {
        dispatch(fetchAgentDetailsStart())
        return axios.get(`user/get-microsite-settings/${agentId}`)
            .then(res => {
                // console.log(res.data)
                const response = res.data
                if(response.status===200){
                    return dispatch(fetchAgentDetailsSuccess(response.data[0]))

                }else{
                    throw noAgent
                }
            })
            .catch(error => {
                // console.log(error)
                return dispatch(fetchAgentDetailsFail(error))
            })
    }
}