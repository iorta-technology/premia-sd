import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    login_agent_data:null,
    login_error:null
}

const loginStart = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: true })
}

const loginSuccess = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: false, login_agent_data: action.login_agent_data })
}
const loginFail = (state, action) => {
    return updateObject(state, { fetch_allLeads_Loading: false, login_error: action.error });
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        
        case actionTypes.LOGIN_START: return loginStart(state, action)
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action)
        case actionTypes.LOGIN_FAIL: return loginFail(state, action)

        default: return state
    }
}

export default reducer;