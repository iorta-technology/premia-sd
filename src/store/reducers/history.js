import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';
import {dataFormatting} from '../../helpers'
import _ from 'lodash'
const initialState = {
    history:[],
    fetchHistoryLoading:false,
    fetchHistoryError:''
    
}
const fetchHistoryStart = (state, action) => {
    return updateObject(state, { fetchHistoryLoading: true })
}

const fetchHistorySuccess = (state, action) => {
    const historyDetailsArr = action.history
   const newArr =  historyDetailsArr.map((historydetail)=>{
        if('AppointmetData' in historydetail){
            if(historydetail.leadleadDisposition ==='callback'){
              let  desc = 'Callback date ' + new Date(parseInt(historydetail.AppointmetData.start_date)).toLocaleDateString() + '  Callback time ' + (historydetail.AppointmetData.start_time)
              if (historydetail.allocated === false) {
                 dataFormatting(historydetail, 'Updated - ' + (historydetail.leadDisposition), desc + ' ' + (historydetail.Details2) + ' ' + (historydetail.Details3));
            } else {
                dataFormatting(historydetail, 'Lead Allocated', desc + ' ' + (historydetail.Details2) + ' ' + (historydetail.Details3));
            }
            }
        }else{
            
            if(historydetail.Status==='newleadentery'){
                let desc = historydetail.Details1 + ' '+ historydetail.Details2.split('|')[0]
                return  historydetail.allocated ? dataFormatting(historydetail, 'Lead Allocated', desc) : dataFormatting(historydetail, 'New Lead Created', desc)
            }
            else if (historydetail.AppointmentStatus !== "") {
    
                let desc = doSentenceCase(historydetail.Details1) + '  ' + this.respDetails(historydetail.Details2);
                historydetail.allocated == false ? historyList[1].data.push(dataFormatting(historydetail, 'Updated - ' + util.get_R_Text(historydetail.AppointmentStatus), desc)) : historyList[1].data.push(dataFormatting(historydetail, 'Lead Allocated', desc))
    
            } else if (historydetail.Status === 'Proposalstarted') {
    
    
                /**
                 * When proposal is generated then that code is executed
                 */
               let  desc = (historydetail.Status === 'Proposalstarted' ? 'Proposal Started' : historydetail.Status) + ' | ' + idFilter(historydetail.proposal_Id.productId, 'P');
                historyList[2].data.push(dataFormatting(historydetail, 'New BI Created', desc));
    
            }
        }

    })
    console.log(newArr)
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