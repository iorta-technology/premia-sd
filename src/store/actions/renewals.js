import * as actionTypes from './actionTypes';
import axios from '../../axios-manipal';


// Fetch leads data
export const fetchAllRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_ALL_RENEWALS_START
    }
}

export const fetchAllRenewalsSuccess = (allRenewals,count) => {
    return {
        type: actionTypes.FETCH_ALL_RENEWALS_SUCCESS,
        allRenewals: allRenewals,
        count:count
    }
} 


export const fetchAllRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_ALL_RENEWALS_FAIL,
        error: error
    }
}

export const fetchAllRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchAllRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=all&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                console.log('fetch renewals',res.data.errMsg[0])
                return dispatch(fetchAllRenewalsSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchAllRenewalsFail(error.response.data.errors))
            })
    }
}