import * as actionTypes from './actionTypes';
import axios from '../../axios-common';



export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const loginSuccess = (payload) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        login_agent_data:payload
    }
} 


export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

export const login = (email,password) => {
       
    return dispatch => {
        dispatch(loginStart())
        return axios.post(`user_login_v2`,{email,password})
        .then(res=>{
            return dispatch(loginSuccess(res.data.errMsg))
        }).catch(error=>{
            console.log(error)
        })
    }
}