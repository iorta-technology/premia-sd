import * as actionTypes from './actionTypes';
import axios from '../../axios-manipal';


// Fetch all renewals data
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
                console.log('fetch renewals',res.data.errMsg[0],res.data.errMsg[1][0].count)
                return dispatch(fetchAllRenewalsSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchAllRenewalsFail(error.response.data.errors))
            })
    }
}

// Fetch paid renewals data
export const fetchPaidRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_PAID_RENEWALS_START
    }
}

export const fetchPaidRenewalsSuccess = (paidRenewals,count) => {
    return {
        type: actionTypes.FETCH_PAID_RENEWALS_SUCCESS,
        paidRenewals: paidRenewals,
        count:count
    }
} 


export const fetchPaidRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_PAID_RENEWALS_FAIL,
        error: error
    }
}

export const fetchPaidRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchPaidRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=Paid&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                console.log('fetch paid renewals',res.data.errMsg[0],res.data.errMsg[1][0].count)
                return dispatch(fetchPaidRenewalsSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchPaidRenewalsFail(error.response.data.errors))
            })
    }
}


// Fetch unpaid renewals data
export const fetchUnPaidRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_UNPAID_RENEWALS_START
    }
}

export const fetchUnPaidRenewalsSuccess = (unPaidRenewals,count) => {
    return {
        type: actionTypes.FETCH_UNPAID_RENEWALS_SUCCESS,
        unPaidRenewals: unPaidRenewals,
        count:count
    }
} 


export const fetchUnPaidRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_UNPAID_RENEWALS_FAIL,
        error: error
    }
}

export const fetchUnPaidRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchUnPaidRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=Unpaid&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                console.log('fetch unpaid renewals',res.data.errMsg[0],res.data.errMsg[1][0].count)
                return dispatch(fetchUnPaidRenewalsSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchUnPaidRenewalsFail(error.response.data.errors))
            })
    }
}

// Fetch lapsed renewals data
export const fetchLapsedRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_LAPSED_RENEWALS_START
    }
}

export const fetchLapsedRenewalsSuccess = (lapsedRenewals,count) => {
    return {
        type: actionTypes.FETCH_LAPSED_RENEWALS_SUCCESS,
        lapsedRenewals: lapsedRenewals,
        count:count
    }
} 


export const fetchLapsedRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_LAPSED_RENEWALS_FAIL,
        error: error
    }
}

export const fetchLapsedRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchLapsedRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=Lapsed&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                console.log('fetch lapsed renewals',res.data.errMsg[0],res.data.errMsg[1][0].count)
                return dispatch(fetchLapsedRenewalsSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchLapsedRenewalsFail(error.response.data.errors))
            })
    }
}