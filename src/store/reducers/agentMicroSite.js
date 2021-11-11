import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    
    // states 
    first_name:'',
    last_name:'',
    testimonials:[],
    achievements:{},
    fetchAgentDetailsLoading:false,
    fetchAgentDetailsError:"",

}
// states reducer
const fetchAgentDetailsStart = (state, action) => {
    return updateObject(state, { fetchAgentDetailsLoading: true })
}

const fetchAgentDetailsSuccess = (state, action) => {
    const { first_name, last_name,micrositeId:{achievements,Testimonials} } = action.agentDetails
    // console.log(achievements,Testimonials)
    // const {}

    return updateObject(state, { 
        fetchAgentDetailsLoading: false, 
        agentDetails: action.agentDetails,
        first_name:first_name,
        last_name:last_name,
        achievements:achievements,
        testimonials:Testimonials
    })
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