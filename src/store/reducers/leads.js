import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    // leads properties
    allLeads:[],
    allLeads_Loading : false,
    fetch_allLeads_Loading : false,
    selected_allLeads : null,
    fetch_allLeads_Error : "",

    // lead form meta data
    fetchDesignationLoading:false,
    designations:[],
    fetchDesignationError:'',

}
// lead reducer
const fetchAllLeadsStart = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: true })
}

const fetchAllLeadsSuccess = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: false, allLeads: action.allLeads, count:action.count, selected_all_leads: action.selected_allLeads })
}
const fetchAllLeadsFail = (state, action) => {
    return updateObject(state, { 
        fetch_allLeads_Loading: false, 
        fetch_allLeads_Error: action.error,
        allLeads:[]
    });
}

const fetchDesignationStart = (state, action) => {
    return updateObject(state, { fetchDesignationLoading: true })
}

const fetchDesignationSuccess = (state, action) => {
    return updateObject(state, { fetchDesignationLoading: false, designations: action.designations })
}
const fetchDesignationFail = (state, action) => {
    return updateObject(state, { fetchDesignationLoading: false, fetchDesignationError: action.error });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // lead
        case actionTypes.FETCH_ALL_LEADS_START: return fetchAllLeadsStart(state, action)
        case actionTypes.FETCH_ALL_LEADS_SUCCESS: return fetchAllLeadsSuccess(state, action)
        case actionTypes.FETCH_ALL_LEADS_FAIL: return fetchAllLeadsFail(state, action)

        case actionTypes.FETCH_DESIGNATION_START: return fetchDesignationStart(state, action)
        case actionTypes.FETCH_DESIGNATION_SUCCESS: return fetchDesignationSuccess(state, action)
        case actionTypes.FETCH_DESIGNATION_FAIL: return fetchDesignationFail(state, action)
        default: return state
    }
}

export default reducer;