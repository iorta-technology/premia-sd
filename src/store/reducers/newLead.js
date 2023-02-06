import { isEmpty } from "lodash";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { stoageGetter } from "../../helpers";
import _ from "lodash";

const logindata = stoageGetter("user");
let id = "";
if (logindata) {
  id = logindata.id;
}
// console.log(id)
const initialState = {
  createLeadLoading: false,
  createLeadError: "",
  editLeadLoading: false,
  editLeadError: "",
  leadDataloading: false,
  successMsg: "",
  leadId: "",
  user_Id: id,
  fetchLeadId: "",
  address: {
    line1: "",
    line2: "",
    line3: "",
  },
  mailingAddressSecond: {
    mailingaddress: {
      line1: "",
      line2: "",
      line3: "",
    },
  },
  HaveLifeInsurance_details: [],
  Insurancedetails: [],
  childParsedData: [],
  payloadFormData: {},
  appointmentData: {
    start_date: "",
    start_time: "",
  },
  formData: {
    // company_details: {
    //   company_name: '',
    //   parent_company: '',
    //   industry_name: '',
    //   tata_aig_empaneled:'',
    //   client_location: '',
    // },
    // leadStatus: '',
    // leadDisposition: '',
    // leadsubDisposition: '',
    // opportunity_name: '',
    // tender_driven: '',
    // LOB_opportunity: '',
    // product_for_opportunity: '',
    // remarks: '',
    // teamMembers : "[]",
    // lead_Owner_Id: '',
    // lead_Creator_Id: '',
    // user_id: '',
    // company_id: '',
    // start_date: '',
    // start_time:'',
    // client_expectations: "",
    // red_flags: "",
    // our_ask: "",
    // channel_name: "",
    // producer: "",
    // VAS_executed: "Yes",
    // kdm_details: [],
    // risk_details: []

  },
  errorMessage: "",
  leadUpdateFormdata:{},
};

const createLeadStart = (state, action) => {
  return updateObject(state, {
    createLeadLoading: true,
    leadDataloading: false,
  });
};

const createLeadSuccess = (state, action) => {
  const payload = { ...state.formData, ...action.formData };
  console.log(payload);
  return updateObject(state, {
    leadDataloading: true,
    createLeadLoading: false,
    formData: payload,
    payloadFormData: payload,
    leadId: action.formData._id,
    // userId:action.formData.userId,
    successMsg: action.succMsg,
  });
};
const createLeadFail = (state, action) => {
  return updateObject(state, {
    createLeadLoading: false,
    createLeadError: action.error,
    leadDataloading: false,
    errorMessage: action.error,
  });
};

const editLeadStart = (state, action) => {
  return updateObject(state, {
    editLeadLoading: true,
  });
};

const editLeadSuccess = (state, action) => {
  const payload = { ...state.formData, ...action.formData };
  // console.log('editLeadSuccess----------->>>>',action.formData)

  return updateObject(state, {
    editLeadLoading: false,
    createLeadLoading: false,
    formData: payload,
    leadId: action.formData._id,
    // appointmentData: action.appointmentDetails,

    // userId:action.formData[0].userId
  });
};
const editLeadFail = (state, action) => {
  return updateObject(state, {
    editLeadError: action.error,
    leadDataloading: false,
    errorMessage: action.error,
  });
};

const fetchLeadDetailsStart = (state, action) => {
  return updateObject(state, {
    createLeadLoading: true,
    leadDataloading: true,
  });
};

const fetchLeadUpdateBody = (state, action) => {
  console.log('fetchLeadUpdateBody ----------->>>>',action)
  return updateObject(state, {
    leadUpdateFormdata: action.leadUpdateFormdata 
  });
};

const fetchLeadDetailsSuccess = (state, action) => {
  // const addSecond = {
  //   ...state.mailingAddressSecond,
  //   ...action.mailingAddressSecond,
  // };
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
  // const fetchLeadId = action.fetchLeadId;
  console.log('(((ACTIONS)))------->>>',action)
  console.log('(((STATEEE)))------->>>',state)
  // const { Insurancedetails } = action.leadDetails;
  // const { HaveLifeInsurance_details } = action.leadDetails;
  // if(!isEmpty(Insurancedetails)&& !isEmpty(HaveLifeInsurance_details)){

  //     var  healthInsObject = JSON.parse(Insurancedetails)

  //     var  lifeInsObject = JSON.parse(HaveLifeInsurance_details)
  // }
  const payload = {
    // ...state.formData,
    ...action.leadDetails,
    // ...state.appointmentData,
    // ...action.appointmentDetails,
  };
  return updateObject(state, {
    leadDataloading: false,
    createLeadLoading: false,
    formData: payload,
    payloadFormData: payload,
    // mailingAddress:address1,
    // mailingAddressSecond:address2,
    leadId: action?.leadDetails?._id,
    userId: action?.leadDetails?.userId?._id,
    // Insurancedetails:healthInsObject,
    // HaveLifeInsurance_details:lifeInsObject,
    // address: action.leadDetails.address[0],
    // mailingAddressSecond: addSecond,
    // fetchLeadId: fetchLeadId,
    // appointmentData: action.appointmentDetails,
  });
};
const fetchLeadDetailsFail = (state, action) => {
  return updateObject(state, {
    createLeadLoading: false,
    createLeadError: action.error,
    leadDataloading: false,
  });
};

const storeForm = (state, action) => {
  // let childParsedData = action.formData.ChildInfo
  //     if(!_.isEmpty(childParsedData)){

  //         childParsedData = JSON.parse(childParsedData)
  //     }
  // console.log(childParsedData)
  const payload = { ...state.formData, ...action.formData };

  return updateObject(state, {
    createLeadLoading: false,
    formData: payload,
    // childParsedData:childParsedData,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // lead
    case actionTypes.CREATE_LEAD_START:
      return createLeadStart(state, action);
    case actionTypes.CREATE_LEAD_SUCCESS:
      return createLeadSuccess(state, action);
    case actionTypes.CREATE_LEAD_FAIL:
      return createLeadFail(state, action);

    case actionTypes.EDIT_LEAD_START:
      return editLeadStart(state, action);
    case actionTypes.EDIT_LEAD_SUCCESS:
      return editLeadSuccess(state, action);
    case actionTypes.EDIT_LEAD_FAIL:
      return editLeadFail(state, action);

    case actionTypes.FETCH_LEAD_DETAILS_START:
      return fetchLeadDetailsStart(state, action);
    case actionTypes.FETCH_LEAD_DETAILS_SUCCESS:
      return fetchLeadDetailsSuccess(state, action);

    case actionTypes.FETCH_LEAD_UPDATE_BODY:
      return fetchLeadUpdateBody(state, action);

    case actionTypes.FETCH_LEAD_DETAILS_FAIL:
      return fetchLeadDetailsFail(state, action);

    case actionTypes.STORE_FORM_SUCCESS:
      return storeForm(state, action);

    default:
      return state;
  }
};

export default reducer;
