import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    home_obj: null,
    activities:[],
    home_Loading : false,
    fetch_Home_Loading : false,
    home_Error : "",
    activities_Loading : false,
    fetch_Activities_Loading : false,
    activities_Error : "",

}

const fetchHomeStart = (state, action) => {
    return updateObject(state, { fetch_Home_Loading: true })
}

const fetchHomeSuccess = (state, action) => {
    console.log("actions of home",action)
    return updateObject(state, { fetch_Home_Loading: false, home_obj: action.home, count:action.count})
}
const fetchHomeFail = (state, action) => {
    return updateObject(state, { fetch_Home_Loading: false, home_Error: action.error });
}


const fetchActivitiesStart = (state, action) => {
    return updateObject(state, { fetch_Activities_Loading: true })
}

const fetchActivitiesSuccess = (state, action) => {
    console.log("actions of activities",action)
    return updateObject(state, { fetch_Activities_Loading: false, activities_obj: action.activities})
}
const fetchActivitiesFail = (state, action) => {
    return updateObject(state, { fetch_Activities_Loading: false, activities_Error: action.error });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.HOME_START: return fetchHomeStart(state, action)
        case actionTypes.HOME_SUCCESS: return fetchHomeSuccess(state, action)
        case actionTypes.LOGIN_FAIL: return fetchHomeFail(state, action)

        case actionTypes.ACTIVITIES_START: return fetchActivitiesStart(state, action)
        case actionTypes.ACTIVITIES_SUCCESS: return fetchActivitiesSuccess(state, action)
        case actionTypes.ACTIVITIES_FAIL: return fetchActivitiesFail(state, action)

        default: return state
    }
}

export default reducer;