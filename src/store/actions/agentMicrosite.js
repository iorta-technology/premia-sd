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
       
    return dispatch => {
        dispatch(fetchAgentDetailsStart())
        return axios.get(`profile?name=${name}&agent_id=${agentId}`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                const response = res.data.errMsg
                const errorCode = res.data.errCode
                if(errorCode===-1){

                    return dispatch(fetchAgentDetailsSuccess(response[0],response[1][0].count))
                }else{
                    throw response
                }
            })
            .catch(error => {
                return dispatch(fetchAgentDetailsFail(error))
            })
    }
}