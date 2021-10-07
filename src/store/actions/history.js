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

export const fetchHistory = (userId,) => {
    return dispatch => {
        dispatch(fetchHistoryStart())
        return axios.get(`user/leadhistory/615ebe626cc6974f3da34e70?user_id=${userId}`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                return dispatch(fetchHistorySuccess(res.data.errMsg[0]))
            })
            .catch(error => {
                return dispatch(fetchHistoryFail(error.response.data.errors))
            })
    }
}