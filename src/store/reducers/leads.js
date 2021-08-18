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

// states reducer
const fetchStatesStart = (state, action) => {
    return updateObject(state, { fetch_States_Loading: true })
}

const fetchStatesSuccess = (state, action) => {
    return updateObject(state, { fetch_States_Loading: false, states: action.states})
}
const fetchStatesFail = (state, action) => {
    return updateObject(state, { fetch_States_Loading: false, fetch_States_Error: action.error });
}

//cities reducer
const fetchCitiesStart = (state, action) => {
    return updateObject(state, { fetch_Cities_Loading: true })
}

const fetchCitiesSuccess = (state, action) => {
    return updateObject(state, { fetch_Cities_Loading: false, cities: action.cities})
}
const fetchCitiesFail = (state, action) => {
    return updateObject(state, { fetch_Cities_Loading: false, fetch_Cities_Error: action.error });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // lead
        case actionTypes.FETCH_ALL_LEADS_START: return fetchAllLeadsStart(state, action)
        case actionTypes.FETCH_ALL_LEADS_SUCCESS: return fetchAllLeadsSuccess(state, action)
        case actionTypes.FETCH_ALL_LEADS_FAIL: return fetchAllLeadsFail(state, action)

        //state
        case actionTypes.FETCH_STATES_START: return fetchStatesStart(state, action)
        case actionTypes.FETCH_STATES_SUCCESS: return fetchStatesSuccess(state, action)
        case actionTypes.FETCH_STATES_FAIL: return fetchStatesFail(state, action)

        case actionTypes.FETCH_CITIES_START: return fetchCitiesStart(state, action)
        case actionTypes.FETCH_CITIES_SUCCESS: return fetchCitiesSuccess(state, action)
        case actionTypes.FETCH_CITIES_FAIL: return fetchCitiesFail(state, action)

        default: return state
    }
}

export default reducer;