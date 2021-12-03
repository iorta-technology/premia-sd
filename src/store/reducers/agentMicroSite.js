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
    profileImage:'',
    socialLinks:{},
    products:[],
}
// states reducer
const fetchAgentDetailsStart = (state, action) => {
    return updateObject(state, { fetchAgentDetailsLoading: true })
}

const fetchAgentDetailsSuccess = (state, action) => {
    const { 
        first_name, 
        last_name,
        microsite_settings:{achievements:{badges}} ,
        microsite_settings:{testimonials}, 
        microsite_settings:{profileImage}, 
        microsite_settings:{connectWithMe}, 
        products,
    } = action.agentDetails
    // console.log(achievements,Testimonials)
    // const {}

    return updateObject(state, { 
        fetchAgentDetailsLoading: false, 
        agentDetails: action.agentDetails,
        first_name:first_name,
        last_name:last_name,
        achievements:badges,
        testimonials:testimonials,
        profileImage:profileImage,
        socialLinks:connectWithMe,
        products:products,
    })
}
const fetchAgentDetailsFail = (state, action) => {
    return updateObject(state, { 
        fetchAgentDetailsLoading: false, 
        fetchAgentDetailsError: action.error 
    });
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