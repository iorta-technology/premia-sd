import * as actionTypes from './actionTypes';
import axios from '../../axios-common';


export const homeStart = () => {
    return {
        type: actionTypes.HOME_START
    }
}

export const homeSuccess = (payload) => {
    return {
        type: actionTypes.HOME_SUCCESS,
        home:payload
    }
} 


export const homeFail = (error) => {
    return {
        type: actionTypes.HOME_FAIL,
        error: error
    }
}

export const activitiesStart = () => {
    return {
        type: actionTypes.ACTIVITIES_START
    }
}

export const activitiesSuccess = (info) => {
    return {
        type: actionTypes.ACTIVITIES_SUCCESS,
        activities:info
    }
} 


export const activitiesFail = (error) => {
    return {
        type: actionTypes.ACTIVITIES_FAIL,
        error: error
    }
}


export const home = (agent_id) => {
       console.log("agent id in",agent_id)
    return dispatch => {
        dispatch(homeStart())
        return axios.get(`getleads_team_count/${agent_id}`)
        .then(res=>{
            console.log("home data",res)
            return dispatch(homeSuccess(res.data.errMsg))
        }).catch(error=>{
            console.log(error)
        })
    }
}

export const activities = (id) => {
    return dispatch => {
        dispatch(activitiesStart())
        return axios.get(`getAppointment/${id}?set_reminder_prority=high,none,low,medium&now_filter=1`)
        .then(res=>{
            console.log("activities data",res)
            return dispatch(activitiesSuccess(res.data.errMsg))
        }).catch(error=>{
            console.log(error)
        })
    }
}