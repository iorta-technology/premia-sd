import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    // renewal properties
    allRenewals:[],
    allRenewals_Loading : false,
    fetch_allRenewals_Loading : false,
    selected_allRenewals : null,
    fetch_allRenewals_Error : "",
}
// lead reducer
const fetchAllRenewalsStart = (state, action) => {
    return updateObject(state, { fetch_allRenewals_Loading: true })
}

const fetchAllRenewalsSuccess = (state, action) => {
    return updateObject(state, { fetch_allRenewals_Loading: false, allRenewals: action.allRenewals, count:action.count, selected_allRenewals: action.selected_allRenewals })
}
const fetchAllRenewalsFail = (state, action) => {
    return updateObject(state, { fetch_allRenewals_Loading: false, fetch_allRenewals_Error: action.error });
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        // lead
        case actionTypes.FETCH_ALL_RENEWALS_START: return fetchAllRenewalsStart(state, action)
        case actionTypes.FETCH_ALL_RENEWALS_SUCCESS: return fetchAllRenewalsSuccess(state, action)
        case actionTypes.FETCH_ALL_RENEWALS_FAIL: return fetchAllRenewalsFail(state, action)
        default: return state
    }
}

export default reducer;