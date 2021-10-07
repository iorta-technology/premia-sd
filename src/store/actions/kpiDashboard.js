import * as actionTypes from './actionTypes';
import axios from '../../axios-banca';


export const kpiDashboardStart = () => {
    return {
        type: actionTypes.KPI_DASHBOARD_START
    }
}

export const kpiDashboardSuccess = (payload) => {
    return {
        type: actionTypes.KPI_DASHBOARD_SUCCESS,
        kpi_data:payload
    }
} 


export const kpiDashboardFail = (error) => {
    return {
        type: actionTypes.KPI_DASHBOARD_FAIL,
        error: error
    }
}

export const kpiDashboard = () => {
    return dispatch => {
        dispatch(kpiDashboardStart())
        return axios.get(`fetch_employee_kpi?emp_code=60e5d6056b18e8309da3fa49&category=GPW&channel=5f912e05037b6c581e7678f1`)
        .then(res=>{
            console.log("kpidashb data",res)
            return dispatch(kpiDashboardSuccess(res.data.errMsg))
        }).catch(error=>{
            console.log(error)
        })
    }
}