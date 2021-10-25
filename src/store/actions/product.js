import * as actionTypes from './actionTypes';
import axios from '../../axios-common';

export const fetchProductStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_START
    }
}

export const fetchProductSuccess = (product) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        productCategory: product,
    }
} 


export const fetchProductFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error: error
    }
}

export const fetchProduct = (channelCode) => {
        
    return dispatch => {
        dispatch(fetchProductStart())
        return axios.get(`admin/getprodCategory?filter=23&channel=${channelCode}`)
            .then(res => {
                let response = res.data.errMsg
                console.log(response)
                    if(res.data.errCode===-1){
                        return dispatch(fetchProductSuccess(response))
                    }else{
                        throw response
                    }
            })
            .catch(error => {
                console.log(error)
                return dispatch(fetchProductFail(error))
            })
    }
}

export const fetchPlanNameStart = () => {
    return {
        type: actionTypes.FETCH_PLAN_NAME_START
    }
}

export const fetchPlanNameSuccess = (product) => {
    return {
        type: actionTypes.FETCH_PLAN_NAME_SUCCESS,
        planName: product,
    }
} 


export const fetchPlanNameFail = (error) => {
    return {
        type: actionTypes.FETCH_PLAN_NAME_FAIL,
        error: error
    }
}

export const fetchPlanName = (productId) => {
        
    return dispatch => {
        dispatch(fetchPlanNameStart())
        return axios.get(`user/getproduct/?productType=${productId}&roleCode=SM1`)
            .then(res => {
                    console.log(res.data.errMsg)
                    let response = res.data.errMsg
                    if(res.data.errCode===-1){
                        return dispatch(fetchPlanNameSuccess(...response))
                    }else{
                        throw response
                    }
            })
            .catch(error => {
                console.log(error)
                return dispatch(fetchPlanNameFail(error))
            })
    }
}