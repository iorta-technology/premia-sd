import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    
    // states 
    agentDetails:{},
    fetchAgentDetailsLoading:false,
    fetchAgentDetailsError:"",

}
// states reducer
const fetchAgentDetailsStart = (state, action) => {
    return updateObject(state, { fetchAgentDetailsLoading: true })
}

const fetchAgentDetailsSuccess = (state, action) => {
    return updateObject(state, { fetchAgentDetailsLoading: false, agentDetails: action.agentDetails})
}
const fetchAgentDetailsFail = (state, action) => {
    return updateObject(state, { fetchAgentDetailsLoading: false, fetchAgentDetailsError: action.error });
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
      
        //state
        case actionTypes.FETCH_AGENT_DETAILS_START: return fetchAgentDetailsStart(state, action)
        case actionTypes.FETCH_AGENT_DETAILS_SUCCESS: return fetchAgentDetailsSuccess(state, action)
        case actionTypes.FETCH_AGENT_DETAILS_FAIL: return fetchAgentDetailsFail(state, action)

        default: return state
    }
}

export default reducer;