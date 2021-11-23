import { isEmpty } from 'lodash';
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';
import {stoageGetter} from '../../helpers'

const logindata = stoageGetter('user')
let id = ''
if(logindata){
id = logindata.id

}
// console.log(id)
const initialState = {
    createLeadLoading:false,
    createLeadError:'',
    editLeadLoading:false,
    editLeadError:'',
    leadDataloading:false,
    successMsg:'',
    leadId:'',
    user_Id:id,
    fetchLeadId:'',
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
    childParsedData:[],
    payloadFormData:{},
    appointmentData:{},
     formData :{
        // statusLeadData: {
            leadStatus: '',
            leadDisposition: '',
            leadsubDisposition: '',
            appointment_status: '',
            appointmentdisPosition: '',
            appointmentsubdisPosition: '',
            lead_Owner_Id: '',
            user_id: id,
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
            ChildInfo: [],
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
                user_Id:id,

            },
            //professional data
            education:'',
            professionType:'',
            incomeGroup:'',

        // }
    },


}




const createLeadStart = (state, action) => {
    return updateObject(state, { 
        createLeadLoading: true,
        leadDataloading:false 
    })
}

const createLeadSuccess = (state, action) => {
    const payload = {...state.formData,...action.formData}
    console.log(payload)
    return updateObject(state, { 
            leadDataloading:true,
            createLeadLoading: false, 
            formData: payload,
            payloadFormData: payload,
            leadId:action.formData._id,
            // userId:action.formData.userId,
            successMsg:action.succMsg,
         })
}
const createLeadFail = (state, action) => {
    return updateObject(state, { 
        createLeadLoading: false, 
        createLeadError: action.error,
        leadDataloading:false 
    });
}

const editLeadStart = (state, action) => {
    return updateObject(state, { 
        editLeadLoading:true
    })
}

const editLeadSuccess = (state, action) => {
    const payload = {...state.formData,...action.formData}

    return updateObject(state, { 
            editLeadLoading:false,
            createLeadLoading: false, 
            formData: payload,
            leadId:action.formData[0]._id,
            appointmentData:action.appointmentDetails

            // userId:action.formData[0].userId
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
    const fetchLeadId = action.fetchLeadId
    const  {Insurancedetails} = action.leadDetails
    const  {HaveLifeInsurance_details} = action.leadDetails
        if(!isEmpty(Insurancedetails)&& !isEmpty(HaveLifeInsurance_details)){

            var  healthInsObject = JSON.parse(Insurancedetails)
    
            var  lifeInsObject = JSON.parse(HaveLifeInsurance_details)
        }
        const payload = {...state.formData,...action.leadDetails}
    return updateObject(state, { 
        leadDataloading:false,
        createLeadLoading: false, 
        formData: payload,
        payloadFormData: payload,
        // mailingAddress:address1,
        // mailingAddressSecond:address2,
        leadId:action.leadDetails._id,
        userId:action.leadDetails.userId._id,
        Insurancedetails:healthInsObject,
        HaveLifeInsurance_details:lifeInsObject,
        address:action.leadDetails.address[0],
        mailingAddressSecond:addSecond,
        fetchLeadId:fetchLeadId,
        appointmentData:action.appointmentDetails

    })
}
const fetchLeadDetailsFail = (state, action) => {
    return updateObject(state, { 
        createLeadLoading: false, 
        createLeadError: action.error,
        leadDataloading:false  
    });
}


const storeForm = (state, action) => {
    //     if(!isEmpty(ChildInfo)){

    
    //         var childParsedData = JSON.parse(action.formData.ChildInfo)
    //     }
    // console.log(childParsedData)
    const payload = {...state.formData,...action.formData}
    
    return updateObject(state, { 
        createLeadLoading: false, 
        formData: payload,
        // childParsedData:childParsedData,
    })
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