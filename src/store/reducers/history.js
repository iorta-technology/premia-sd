import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    history:[],
    fetchHistoryLoading:false,
    fetchHistoryError:''
    
}
const fetchHistoryStart = (state, action) => {
    return updateObject(state, { fetchHistoryLoading: true })
}

const fetchHistorySuccess = (state, action) => {
    return updateObject(state, { fetchHistoryLoading: false, history: action.history})
}
const fetchHistoryFail = (state, action) => {
    return updateObject(state, { fetchHistoryLoading: false, fetchHistoryError: action.error });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      
        //state
        case actionTypes.FETCH_HISTORY_START: return fetchHistoryStart(state, action)
        case actionTypes.FETCH_HISTORY_SUCCESS: return fetchHistorySuccess(state, action)
        case actionTypes.FETCH_HISTORY_FAIL: return fetchHistoryFail(state, action)

        default: return state
    }
}

export default reducer;