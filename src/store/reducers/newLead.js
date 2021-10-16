import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    createLeadLoading:false,
    createLeadError:'',
    leadId:'',
    userId:'',
    formData:[
    //     {
    //     leadStatus: '',
    //     start_date: '',
    //     start_time: '',
    //     leadsubDisposition: '',
    //     leadDisposition: '',
    //     leadSource: '',
    //     remarksfromUser: '',
    //     remarksfromSource: '',
    //     teamMembers: [],

    //     appointment_status: '',
    //     appointmentdisPosition: '',
    //     appointmentsubdisPosition: '',


    //     lead_Owner_Id: '',
    //     lead_Creator_Id: '',
    //     user_id: '',
    //     LeadType: '',
    //     Product: '',
    //     Insurance_Company: '',

    //     line1: '',
    //     line2: '',
    //     line3: '',
    //     country: '',
    //     state: '',
    //     city: '',
    //     pincode: '',
    //     primaryMobile: '',
    //     secondaryMobile: '',
    //     landlineNo: '',
    //     email: '',
    //     socialSecurityAdharNo: '',
    //     mailingAddressStatus: '',
    //     mailingAddressSecond: '',

    //     firstName: '',
    //     lastName: '',
    //     dob: '',
    //     gender: '',
    //     maritalStatus: '',
    //     childStatus: '',
    //     ChildInfo: '',

    //     education: '',
    //     incomeGroup: '',
    //     annuaLincome: '',
    //     professionType: '',
        
    //     productCategory: '',
    //     productType: '',
    //     solution: '',
    //     expectedPremium: '',
    //     expectedclosureDate: '',

    //     HaveLifeInsurance: '',
    //     SumAssured: '',
    //     Insurance: '',
    //     Insurancedetails: [],
    //     riskComensmentDate: '',
    //     HaveLifeInsurance_details: [],
    // }
],
    // lead form data
    
}



const createLeadStart = (state, action) => {
    return updateObject(state, { createLeadLoading: true })
}

const createLeadSuccess = (state, action) => {
    return updateObject(state, { 
            createLeadLoading: false, 
            formData: action.formData,
            leadId:action.formData[0]._id,
            userId:action.formData[0].userId
         })
}
const createLeadFail = (state, action) => {
    return updateObject(state, { createLeadLoading: false, createLeadError: action.error });
}

const fetchLeadDetailsStart = (state, action) => {
    return updateObject(state, { createLeadLoading: true })
}

const fetchLeadDetailsSuccess = (state, action) => {
    console.log(action.leadDetails)
    return updateObject(state, { 
            createLeadLoading: false, 
            formData: action.leadDetails,
            leadId:action.leadDetails[0].leadId._id,
            userId:action.leadDetails[0].userId._id
         })
}
const fetchLeadDetailsFail = (state, action) => {
    return updateObject(state, { createLeadLoading: false, createLeadError: action.error });
}


const storeForm = (state, action) => {
    return updateObject(state, { createLeadLoading: false, formData: action.formData })
}   

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // lead
        case actionTypes.CREATE_LEAD_START: return createLeadStart(state, action)
        case actionTypes.CREATE_LEAD_SUCCESS: return createLeadSuccess(state, action)
        case actionTypes.CREATE_LEAD_FAIL: return createLeadFail(state, action)

        case actionTypes.FETCH_LEAD_DETAILS_START: return fetchLeadDetailsStart(state, action)
        case actionTypes.FETCH_LEAD_DETAILS_SUCCESS: return fetchLeadDetailsSuccess(state, action)
        case actionTypes.FETCH_LEAD_DETAILS_FAIL: return fetchLeadDetailsFail(state, action)

        case actionTypes.STORE_FORM_SUCCESS: return storeForm(state, action)

        default: return state
    }
}

export default reducer;