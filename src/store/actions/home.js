import * as actionTypes from './actionTypes';
import axios from '../../axios-common';
import axiosRequest from '../../axios-request/request.methods';


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

export const userTreeData = (payload) => {
    return {
        type: actionTypes.USER_TREE,
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
    //    console.log("agent id in",agent_id)
    return async dispatch => {
        dispatch(homeStart())
        let _resp = await axiosRequest.get(`user/getleads_team_count/${agent_id}`, { secure: true })
        console.log("GETTTT LEADD TEAM COUNTT",_resp)
        return dispatch(homeSuccess(_resp))
        // return axios.get(`user/getleads_team_count/${agent_id}`)
        // .then(res=>{
        //     // console.log("home data",res)
        //     return dispatch(homeSuccess(res.data.errMsg))
        // }).catch(error=>{
        //     console.log(error)
        // })
    }
}

export const getUserTreeAPI = (userId) => {
    //    console.log("agent id in",agent_id)
    return async dispatch => {
        // dispatch(homeStart())
        let _resp = await axiosRequest.get(`user/v2/user_tree?userId=${userId}`, { secure: true })
        console.log("home data",_resp)
        return dispatch(userTreeData(_resp))
        // return axiosRequest.get(`user/v2/user_tree?userId=${agent_id}`)
        // .then(res=>{
        //     console.log("home data",res)
        //     return dispatch(userTreeData(res.data.errMsg))
        // }).catch(error=>{
        //     console.log(error)
        // })
    }
}

export const activities = (id) => {
    return async dispatch => {
        dispatch(activitiesStart())
        let _resp = await axiosRequest.get(`user/getAppointment/${id}?set_reminder_prority=high,none,low,medium&now_filter=1`, { secure: true })
        console.log("GETTTT APPPPPPOINTMENTTT",_resp)
        return dispatch(activitiesSuccess(_resp))
        // return axios.get(`user/getAppointment/${id}?set_reminder_prority=high,none,low,medium&now_filter=1`)
        // .then(res=>{
        //     console.log("activities data",res)
        //     return dispatch(activitiesSuccess(res.data.errMsg))
        // }).catch(error=>{
        //     console.log(error)
        // })
    }
}