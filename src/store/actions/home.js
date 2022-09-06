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


export const home = (agent_id,userID) => {
    //    console.log("agent id in",agent_id)
    return async dispatch => {
        dispatch(homeStart())
        // https://pocbancanode.iorta.in/secure/user/getleads_team_count/AG9l7ynu?filter=today&agent_user_id=60e5d6056b18e8309da3fa49
        let _resp = await axiosRequest.get(`user/getleads_team_count/${agent_id}?filter=today&agent_user_id=${userID}`, { secure: true })
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

export const activities = (id,agentID) => {
    return async dispatch => {
        dispatch(activitiesStart())
        // https://pocbancanode.iorta.in/secure/user/getAppointment/60e5d6056b18e8309da3fa49?teamdata=1&now_filter=1&agentCode=AG9l7ynu
        // https://abinsurancenode.salesdrive.app/sdx-api/secure/user/getAppointment/62fcdbfc5fb1dc8913ab59f1?teamdata=1&now_filter=1&agentCode=AGvqq42v
        let _resp = await axiosRequest.get(`user/getAppointment/${id}?teamdata=1&now_filter=1&agentCode=${agentID}`, { secure: true })
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