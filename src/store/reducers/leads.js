import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    allLeads:[],
    count:[],
    allLeads_Loading : false,
    fetch_allLeads_Loading : false,
    selected_allLeads : null,
    fetch_allLeads_Error : "",

}

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
        
        case actionTypes.FETCH_ALL_LEADS_START: return fetchAllLeadsStart(state, action)
        case actionTypes.FETCH_ALL_LEADS_SUCCESS: return fetchAllLeadsSuccess(state, action)
        case actionTypes.FETCH_ALL_LEADS_FAIL: return fetchAllLeadsFail(state, action)

        default: return state
    }
}

export default reducer;