import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    createLeadLoading:false,
    createLeadError:'',
    editLeadLoading:false,
    editLeadError:'',
    leadDataloading:false,
    successMsg:'',
    leadId:'',
    userId:'',
    address:{
        line1:'',
        line2:'',
        line3:'',
    },
    mailingAddressSecond:{
        mailingaddress: {
            line1: '',
            line2: '',
            line3: '',
        },
    },
    HaveLifeInsurance_details:[],
    Insurancedetails:[],
    formData:{},
     payloadFormData :{
        // statusLeadData: {
            leadStatus: '',
            leadDisposition: '',
            leadsubDisposition: '',
            appointment_status: '',
            appointmentdisPosition: '',
            appointmentsubdisPosition: '',
            lead_Owner_Id: '',
            user_id: '',
            lead_Creator_Id: '',
            start_date: '',
            start_time:  '',
            remarksfromSource: '',
            remarksfromUser: '',
            teamMembers: '',
            productId: '',
            proposalId: '',
            leadSource: '',
            LeadType:'',
            Product:'',
            Insurance_Company:'',
        // },
        // personalLeadData: {
            firstName:'',
            lastName:'',
            dob: '',
            gender: '',
            maritalStatus: '',
            childStatus: '',
            ChildInfo: '',
        // },
        // contactLeadData: {
            primaryMobile:'', 
            state: '',
            city: '',
            email: '',
            address: {
                line1: '',
                line2: '',
                line3: '',
            },
            country: '',
            pincode: '',
            secondaryMobile: '',
            landlineNo: '',
            socialSecurityAdharNo: '',
            mailingAddressStatus: '',
            mailingAddressSecond: {
                mailingaddress: {
                    line1: '',
                    line2: '',
                    line3: '',
                },
                state: '',
                city:'', 
                country: '',
                pincode: '',
            }
        // }
    }
}




const createLeadStart = (state, action) => {
    return updateObject(state, { createLeadLoading: true,leadDataloading:false })
}

const createLeadSuccess = (state, action) => {
    
    return updateObject(state, { 
            leadDataloading:true,
            createLeadLoading: false, 
            formData: action.formData,
            leadId:action.formData._id,
            userId:action.formData.userId,
            successMsg:action.succMsg,
         })
}
const createLeadFail = (state, action) => {
    return updateObject(state, { createLeadLoading: false, createLeadError: action.error,leadDataloading:false });
}

const editLeadStart = (state, action) => {
    return updateObject(state, { 
        editLeadLoading:true
    })
}

const editLeadSuccess = (state, action) => {
    return updateObject(state, { 
            editLeadLoading:false,
            createLeadLoading: false, 
            formData: action.formData,
            leadId:action.formData[0]._id,
            userId:action.formData[0].userId
         })
}
const editLeadFail = (state, action) => {
    return updateObject(state, { 
        editLeadError: action.error,
        leadDataloading:false 
    });
}

const fetchLeadDetailsStart = (state, action) => {
    return updateObject(state, { createLeadLoading: true,leadDataloading:true })
}

const fetchLeadDetailsSuccess = (state, action) => {
    const addSecond = {...state.mailingAddressSecond,...action.mailingAddressSecond}
    // const Insurancedetails = [...state.Insurancedetails,...action.Insurancedetails]
    // const Insurancedetails = action.leadDetails.Insurancedetails

    // let address1 
    // let address2
    // console.log(mailingAddressStatus)
    // if(action.leadDetails.mailingAddressStatus==='Yes'){
    //      address1 = action.leadDetails.mailingAddressSecond
    //     //  addObj1 = JSON.parse(address1)
    //      address2 = address1
            
   
    //     }else{
    //          address1 = action.leadDetails.mailingAddress
    //         //  addObj1 = JSON.parse(address1)
    //          address2 = action.leadDetails.mailingAddressSecond
    //         //  addObj2 = JSON.parse(address2)
    // }
    // const {mailingaddress:{line1}={line1:'hello'}} = action.leadDetails.mailingAddress
        const  {Insurancedetails} = action.leadDetails
        const  healthInsObject = JSON.parse(Insurancedetails)

        const  {HaveLifeInsurance_details} = action.leadDetails
        const  lifeInsObject = JSON.parse(HaveLifeInsurance_details)
    return updateObject(state, { 
        leadDataloading:false,
        createLeadLoading: false, 
        formData: action.leadDetails,
        payloadFormData: action.leadDetails,
        // mailingAddress:address1,
        // mailingAddressSecond:address2,
        leadId:action.leadDetails._id,
        userId:action.leadDetails.userId._id,
        Insurancedetails:healthInsObject,
        HaveLifeInsurance_details:lifeInsObject,
        address:action.leadDetails.address[0],
        mailingAddressSecond:addSecond,
    })
}
const fetchLeadDetailsFail = (state, action) => {
    return updateObject(state, { createLeadLoading: false, createLeadError: action.error,leadDataloading:false  });
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

        case actionTypes.EDIT_LEAD_START: return editLeadStart(state, action)
        case actionTypes.EDIT_LEAD_SUCCESS: return editLeadSuccess(state, action)
        case actionTypes.EDIT_LEAD_FAIL: return editLeadFail(state, action)

        case actionTypes.FETCH_LEAD_DETAILS_START: return fetchLeadDetailsStart(state, action)
        case actionTypes.FETCH_LEAD_DETAILS_SUCCESS: return fetchLeadDetailsSuccess(state, action)
        case actionTypes.FETCH_LEAD_DETAILS_FAIL: return fetchLeadDetailsFail(state, action)

        case actionTypes.STORE_FORM_SUCCESS: return storeForm(state, action)

        default: return state
    }
}

export default reducer;