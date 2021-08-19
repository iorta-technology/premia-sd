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

// Fetch States
export const fetchStatesStart = () => {
    return {
        type: actionTypes.FETCH_STATES_START
    }
}

export const fetchStatesSuccess = (states) => {
    return {
        type: actionTypes.FETCH_STATES_SUCCESS,
        states: states,
    }
} 


export const fetchStatesFail = (error) => {
    return {
        type: actionTypes.FETCH_STATES_FAIL,
        error: error
    }
}

export const fetchStates = () => {
        
    return dispatch => {
        dispatch(fetchStatesStart())
        return axios.get(`admin/getState_city?userId=5b3b4cc28fa96d39870443e3&getstate=allstate`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                return dispatch(fetchStatesSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchStatesFail(error.response.data.errors))
            })
    }
}

// Fetch cities
export const fetchCitiesStart = () => {
    return {
        type: actionTypes.FETCH_CITIES_START
    }
}

export const fetchCitiesSuccess = (cities) => {
    return {
        type: actionTypes.FETCH_CITIES_SUCCESS,
        cities: cities,
    }
} 


export const fetchCitiesFail = (error) => {
    return {
        type: actionTypes.FETCH_CITIES_FAIL,
        error: error
    }
}

export const fetchCities = () => {
        
    return dispatch => {
        dispatch(fetchCitiesStart())
        return axios.get(`admin/getState_city?userId=5b3b4cc28fa96d39870443e3&getstate=allstate`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                return dispatch(fetchCitiesSuccess(res.data.errMsg[0],res.data.errMsg[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchCitiesFail(error.response.data.errors))
            })
    }
}