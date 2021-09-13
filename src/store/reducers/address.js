import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    
    // states 
    states:{},
    fetch_States_Loading:false,
    fetch_States_Error:"",

    //cities props
    cities:{},
    fetch_Cities_Loading:false,
    fetch_Cities_Error:""
}
// states reducer
const fetchStateStart = (state, action) => {
    return updateObject(state, { fetch_States_Loading: true })
}

const fetchStateSuccess = (state, action) => {
    return updateObject(state, { fetch_States_Loading: false, states: action.states})
}
const fetchStateFail = (state, action) => {
    return updateObject(state, { fetch_States_Loading: false, fetch_States_Error: action.error });
}

//cities reducer
const fetchCitiesStart = (state, action) => {
    return updateObject(state, { fetch_Cities_Loading: true })
}

const fetchCitiesSuccess = (state, action) => {
    return updateObject(state, { fetch_Cities_Loading: false, cities: action.cities[0].cities})
}
const fetchCitiesFail = (state, action) => {
    return updateObject(state, { fetch_Cities_Loading: false, fetch_Cities_Error: action.error });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      
        //state
        case actionTypes.FETCH_STATES_START: return fetchStateStart(state, action)
        case actionTypes.FETCH_STATES_SUCCESS: return fetchStateSuccess(state, action)
        case actionTypes.FETCH_STATES_FAIL: return fetchStateFail(state, action)

        case actionTypes.FETCH_CITIES_START: return fetchCitiesStart(state, action)
        case actionTypes.FETCH_CITIES_SUCCESS: return fetchCitiesSuccess(state, action)
        case actionTypes.FETCH_CITIES_FAIL: return fetchCitiesFail(state, action)

        default: return state
    }
}

export default reducer;