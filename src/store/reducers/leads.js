import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    // leads properties
    allLeads:[],
    allLeads_Loading : false,
    fetch_allLeads_Loading : false,
    selected_allLeads : null,
    fetch_allLeads_Error : "",

    // states 
    states:[],
    fetch_States_Loading:false,
    fetch_States_Error:"",

    //cities props
    cities:[],
    fetch_Cities_Loading:false,
    fetch_Cities_Error:""
}
// lead reducer
const fetchAllLeadsStart = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: true })
}

const fetchAllLeadsSuccess = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: false, allLeads: action.allLeads, count:action.count, selected_all_leads: action.selected_allLeads })
}
const fetchAllLeadsFail = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: false, fetch_allLeads_Error: action.error });
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        // lead
        case actionTypes.FETCH_ALL_LEADS_START: return fetchAllLeadsStart(state, action)
        case actionTypes.FETCH_ALL_LEADS_SUCCESS: return fetchAllLeadsSuccess(state, action)
        case actionTypes.FETCH_ALL_LEADS_FAIL: return fetchAllLeadsFail(state, action)
        default: return state
    }
}

export default reducer;