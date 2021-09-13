import * as actionTypes from './actionTypes';
import axios from '../../axios-common';


// Fetch leads data
export const fetchStateStart = () => {
    return {
        type: actionTypes.FETCH_STATES_START
    }
}

export const fetchStateSuccess = (states) => {
    return {
        type: actionTypes.FETCH_STATES_SUCCESS,
        states: states,
    }
} 


export const fetchStateFail = (error) => {
    return {
        type: actionTypes.FETCH_STATES_FAIL,
        error: error
    }
}

export const fetchAllState = (leads,pageNo) => {
        
    return dispatch => {
        dispatch(fetchStateStart())
        return axios.get(`admin/getState_city?userId=5b3b4cc28fa96d39870443e3&getstate=allstate`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                if(res.data.errCode===-1){

                    return dispatch(fetchStateSuccess(res.data.errMsg))
                }
            })
            .catch(error => {
                return dispatch(fetchStateFail(error.response.data.errors))
            })
    }
}

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

export const fetchAllCities = (stateCode) => {
        
    return dispatch => {
        dispatch(fetchCitiesStart())
        return axios.get(`admin/getState_city?userId=5b3b4cc28fa96d39870443e3&stateCode=${stateCode}`)
            .then(res => {
                // console.log(res.data.errMsg[1][0].count)
                if(res.data.errCode===-1){

                    return dispatch(fetchCitiesSuccess(res.data.errMsg))
                }
            })
            .catch(error => {
                return dispatch(fetchCitiesFail(error.response.data.errors))
            })
    }
}