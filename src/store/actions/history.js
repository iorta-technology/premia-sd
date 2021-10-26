import * as actionTypes from './actionTypes';
import axios from '../../axios-common';


// Fetch leads data
export const fetchHistoryStart = () => {
    return {
        type: actionTypes.FETCH_HISTORY_START
    }
}

export const fetchHistorySuccess = (history) => {
    return {
        type: actionTypes.FETCH_HISTORY_SUCCESS,
        history: history,
    }
} 


export const fetchHistoryFail = (error) => {
    return {
        type: actionTypes.FETCH_HISTORY_FAIL,
        error: error
    }
}

export const fetchHistory = (leadId,userId) => {
    return dispatch => {
        dispatch(fetchHistoryStart())
        return axios.get(`user/leadhistory/${leadId}?user_id=${userId}`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                if(res.data.errCode===-1){
                   const  response = res.data.errMsg
                    return dispatch(fetchHistorySuccess(response))
                }else{
                    throw res
                }
            })
            .catch(error => {
                console.log(error)
                return dispatch(fetchHistoryFail(error))
            })
    }
}