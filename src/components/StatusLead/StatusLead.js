import React, { useState, useEffect } from 'react'
import useInput from '../hooks/use-input';
import './StatusLead.css'
import { Row, Col, Form, Button, Input, Select, Cascader, DatePicker, Space, Modal, Table, TimePicker, Spin } from 'antd';
import { ArrowRightOutlined, FileTextOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Tabs from '../../components/Tab/Tab'
import FloatButton from '../FloatButton/FloatButton'

import _ from "lodash";
import { checkAgent, milToDateString } from '../../helpers'
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const appointmentTimeOptions = [
  {label: "8:00 AM", value: "28800000"}, {label: "8:30 AM",value: "30600000"},
  {
  label: "9:00 AM",
  value: "32400000"
}, {
  label: "9:30 AM",
  value: "34200000"
}, {
  label: "10:00 AM",
  value: "36000000"
}, {
  label: "10:30 AM",
  value: "37800000"
}, {
  label: "11:00 AM",
  value: "39600000"
}, {
  label: "11:30 AM",
  value: "41400000"
}, {
  label: "12:00 PM",
  value: "43200000"
}, {
  label: "12:30 PM",
  value: "45000000"
}, {
  label: "1:00 PM",
  value: "46800000"
}, {
  label: "1:30 PM",
  value: "48600000"
}, {
  value: '50400000',
  label: '2:00 PM'
}, {
  label: "2:30 PM",
  value: "52200000"
}, {
  label: "3:00 PM",
  value: "54000000"
}, {
  label: "3:30 PM",
  value: "55800000"
}, {
  label: "4:00 PM",
  value: "57600000"
}, {
  label: "4:30 PM",
  value: "59400000"
}, {
  label: "5:00 PM",
  value: "61200000"
}, {
  label: "5:30 PM",
  value: "63000000"
}, {
  label: "6:00 PM",
  value: "64800000"
}, {
  label: "6:30 PM",
  value: "66600000"
}, {
  label: "7:00 PM",
  value: "68400000"
}, {
  label: "7:30 PM",
  value: "70200000"
}, {
  label: "8:00 PM",
  value: "72000000"
}, {
  label: "8:30 PM",
  value: "73800000"
}, {
  label: "9:00 PM",
  value: "75600000"
}, {
  label: "9:30 PM",
  value: "77400000"
}]
const setReminderOptions = [
   { value: '5 minutes before', label: '5 minutes before' },{ value: '10 minutes before', label: '10 minutes before' },
   { value: '15 minutes before', label: '15 minutes before' },{ value: '30 minutes before', label: '30 minutes before' },
   { value: '1 hours before', label: '1 hours before' },{ value: '2 hours before', label: '2 hours before' },
    { value: '1 day before', label: '1 day before' },{ value: '2 days before', label: '2 days before' }, 
    { value: '1 week before', label: '1 week before' },
]
const leadTypeOptions =[
  {
      label:'New Business',
      value:'NewBusiness'
  },
  {
      label:'Renewal',
      value:'Renewal'
  },
  {
      label:'Cross Sell',
      value:'CrossSell'
  }
]
const insuranceCompanyOptions = [
  {
      label:'TATA AIG General Insurance Company',
      value:'TATAAIGGeneralInsuranceCompany'
  },

  {
      label:'ICICI Lombard Genral Insurance Company',
      value:'ICICILombardGenralInsuranceCompany'
  },

  {
      label:'ICICI Prudential Life Insurance Company',
      value:'ICICIPrudentialLifeInsuranceCompany'
  },
  {
      label:'Manipal Cigna Health Insurance Company',
      value:'ManipalCignaHealthInsuranceCompany'
  },
  {
      label:'Exide Life Insurance Company Limited',
      value:'ExideLifeInsuranceCompanyLimited'
  }
]
const leadProductOptions = [
  {
      label:'Health',
      value:'Health'
  },
  {
      label:'Motor',
      value:'Motor'
  },
  {
      label:'Travel',
      value:'Travel'
  },
  {
      label:'Personal Accident',
      value:'Personal Accident'
  },
  {
      label:'Term',
      value:'Term'
  },
  {
      label:'ULIP',
      value:'ULIP'
  }
]
const columns = [
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
  },
  {
    title: "Team Member''s",
    dataIndex: "teammember''s",
    key: "teammember''s",
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];
const tabMenu = [
  {
    id: 1,
    value: "Status",
  },
  {
    id: 2,
    value: "Lead Details"
  },
  {
    id: 3,
    value: "Proposal Details"
  },
  {
    id: 4,
    value: "Documents Upload"
  },
  {
    id: 5,
    value: "History"
  },

]
const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');
const isNumberValid = (value) => value.trim() !== '' && value.length === 10


const NewLead = React.memo(() => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(actions.fetchAllState())
  }, [dispatch]);
  const id = useSelector((state) => state.login.user.id)
  const channelCode = useSelector((state) => state.login.user.channelCode)
  const states = useSelector((state) => state.address.states)
  const minValue = useSelector((state) => state.login.minValue)
  const levelCode = useSelector((state) => state.login.levelCode)

  // store form data 
  let storeFormData = useSelector((state) => state.newLead.formData)
  let leadDataLoading = useSelector((state) => state.newLead.leadDataloading)
  let payloadFormData = useSelector((state) => state.newLead.payloadFormData)
  const storeLeadId = useSelector((state) => state.newLead.leadId)
  const leadDataloading = useSelector((state) => state.newLead.leadDataloading)
  const storefirstNameValue = useSelector((state) => state.newLead.formData.firstName)
  const storelastNameValue = useSelector((state) => state.newLead.formData.lastName)
  const storeEmailValue = useSelector((state) => state.newLead.formData.email)
  const storePrimaryMobileValue = useSelector((state) => state.newLead.formData.primaryMobile)
  const storeStateValue = useSelector((state) => state.newLead.formData.state)
  const storeCityValue = useSelector((state) => state.newLead.formData.city)
  const storeLeadTypeValue = useSelector((state) => state.newLead.formData.LeadType)
  const storeProductValue = useSelector((state) => state.newLead.formData.Product)
  const storeInsuranceCompanyValue = useSelector((state) => state.newLead.formData.Insurance_Company)
  const storeLeadStatusValue = useSelector((state) => state.newLead.formData.leadStatus)
  const storeLeadDispositionValue = useSelector((state) => state.newLead.formData.leadDisposition)
  const storeLeadSubDispositionValue = useSelector((state) => state.newLead.formData.leadDisposition)
  const {start_date,start_time} = useSelector((state)=>state.newLead.appointmentData)
  // const storeReminderValue = useSelector((state)=>state.newLead.formData.reminder)
  // console.log(new Date(start_date).toLocaleDateString('in'))
  console.log(parseInt(start_date))
  const storeRemarkFromSourceValue = useSelector((state) => state.newLead.formData.remarksfromSource)
  const storeRemarkFromUserValue = useSelector((state) => state.newLead.formData.remarksfromUser)
  const fetchLeadId = useSelector((state) => state.newLead.fetcLeadId)
  const errorMsg = useSelector((state) => state.newLead.createLeadError)
  const successMsg = useSelector((state) => state.newLead.successMsg)
  const { lastupdatedOn } = storeFormData
  // let MobRegex='^([-]?[1-9][0-9]*|0)$';
  // const [mobileNoCheck,setMobileNoCheck]=useState(storePrimaryMobileValue?true:false)

  // lead summary
  const leadIdValue = useSelector((state) => state.newLead.formData.lead_Id)
  const createdDateValue = useSelector((state) => state.newLead.formData.created_date)
  
  
  const leadArr = [storeLeadStatusValue, storeLeadDispositionValue, storeLeadSubDispositionValue]
  // responsive styling hook
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;


  const [firstName, setFirstName] = useState(storefirstNameValue)
  const [lastName, setLastName] = useState(storelastNameValue)
  const [email, setEmail] = useState(storeEmailValue)
  const [primaryNo, setPrimaryNo] = useState(storePrimaryMobileValue)
  const [leadStatus, setLeadStatus] = useState(storeLeadStatusValue)
  const [leadDisposition, setLeadDisposition] = useState(storeLeadDispositionValue)
  const [leadSubDisposition, setLeadSubDisposition] = useState(storeLeadSubDispositionValue)
  const [reminder, setReminder] = useState()
  const [appointmentDate, setAppointmentDate] = useState(moment(start_date))
  const [appointmentDatePost, setAppointmentDatePost] = useState()
  const [appointmentTime, setAppointmentTime] = useState(parseInt(start_time))

  const [remarkFromSource, setRemarkFromSource] = useState(storeRemarkFromSourceValue)
  const [remarkFromUser, setRemarkFromUser] = useState(storeRemarkFromUserValue)
  const [leadType, setLeadType] = useState(storeLeadTypeValue)
  const [product, setProduct] = useState(storeProductValue)
  const [insuranceCompany, setInsuranceComapany] = useState(storeInsuranceCompanyValue)
  const [stateProvince, setStateProvince] = useState(storeStateValue)
  const [cityProvince, setCityProvince] = useState(storeCityValue)
  const [errorMessage, setErrorMessage] = useState(successMsg)
  const [isNewLead, setIsNewLead] = useState(true)


  useEffect(() => {
    // console.log('payload',payloadFormData)
    // console.log('nonpayload',storeFormData)
    // dispatch(actions.fetchLeadDetails(fetchLeadId))

    console.log('mobile',leadArr)
    if (storeLeadId !== '') {
      setIsNewLead(false)
    }
    // form.resetFields({
    //   "firstname":firstName,
    //   "lastname":lastName,
    //   "email":email,
    //   "phone":primaryNo,
    //   "state":stateProvince,
    //   "city":cityProvince,
    //   "leadType":leadType,
    //   "product":product,
    //   "insuranceCompany":insuranceCompany,
    //   "appointmentDate":appointmentDate,
    //   "remarksfromsource":remarkFromSource,
    //   "remarksfromuser":remarkFromUser,
    // })
    form.setFieldsValue({
      "firstname": firstName,
      "lastname": lastName,
      "email": email,
      "phone": primaryNo,
      "state": stateProvince,
      "city": cityProvince,
      "leadType": leadType,
      "product": product,
      "insuranceCompany": insuranceCompany,
      "appointmentDate": appointmentDate,
      "remarksfromsource": remarkFromSource,
      "remarksfromuser": remarkFromUser,
      // "leadStatus":leadSubDisposition
    })
  }, [
    firstName,
    lastName,
    email,
    primaryNo,
    stateProvince,
    cityProvince,
    leadType,
    product,
    insuranceCompany,
    appointmentDate,
    remarkFromSource,
    remarkFromUser,
    storeLeadId,
    form,
    storeRemarkFromSourceValue,
    storefirstNameValue,
    storelastNameValue,
    storeEmailValue,
    storePrimaryMobileValue,
    stateProvince,
    leadArr,
    leadDataloading,
    storeCityValue,
    storeStateValue
  ])
  // add team Member modal state control
  const [visibleTeamMemberModal, setVisibleTeamMemberModal] = useState(false);

  // change owner Member modal state control
  const [visibleChangeOwnerModel, setVisibleChangeOwnerModel] = useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');


  const leadOptions = [
    {
      value: 'newleadentery',
      label: 'New Lead Entry',
      // disabled: !isNewLead
    },
    {
      value: 'nocontact',
      label: 'No Contact',
      children: [
        {
          value: 'notreachable',
          label: 'Not Reachable',
          // children: [
          //   {
          //     value: 'Not reachable',
          //     label: 'Not reachable',
          //   },
          // ],
        },
        {
          value: 'ringingbusy',
          label: 'Ringing Busy',
          // children: [
          //   {
          //     value: 'Ringing Busy',
          //     label: 'Ringing Busy',
          //   },
          // ],
        },
        {
          value: 'wrongnumber',
          label: 'Wrong Number',
          // children: [
          //   {
          //     value: 'Wrong Number',
          //     label: 'Wrong Number',
          //   },
          // ],
        },
        {
          value: 'invalid',
          label: 'Invalid Number',
          // children: [
          //   {
          //     value: 'Invalid Number',
          //     label: 'Invalid Number',
          //   },
          // ],
        },
        {
          value: 'switchoff',
          label: 'Switched Off',
          // children: [
          //   {
          //     value: 'Switched Off',
          //     label: 'Switched Off',
          //   },
          // ],
        },
      ],
    },
    {
      value: 'contact',
      label: 'Contact',
      children: [
        {
          value: 'appointment',
          label: 'Appointment',
          isSelected: true,
          // children: [
          //   {
          //     value: 'New Appointment',
          //     label: 'New Appointment',
          //   },
          // ],
        },
        {
          value: 'callback',
          label: 'Callback',
          isSelected: false,
          // children: [
          //   {
          //     value: 'Customer asked for callback',
          //     label: 'Customer asked for callback',
          //   }
          // ],
        },
        // {
        //   value: 'followup',
        //   label: 'Follow-up',
        //   isSelected: false,
        //   children: [
        //     {
        //       value: 'Met-in follow-up for closure',
        //       label: 'Met-in follow-up for closure',
        //     },
        //     {
        //       value: 'Not Met - Reschedule appointment',
        //       label: 'Not Met - Reschedule appointment',
        //     }
        //   ],
        // },
        {
          value: 'shorthangup',
          label: 'Short hang up',
          // children: [
          //   {
          //     value: 'shorthangup',
          //     label: 'Short hang up',
          //   },
          // ],
        },
        {
          value: 'notinterested',
          label: 'Not interested',
          // children: [
          //   {
          //     value: 'Client denied giving appointment',
          //     label: 'Client denied giving appointment',
          //   },
          //   {
          //     value: 'Met - not interested',
          //     label: 'Met - not interested',
          //   },
          // ],
        },
        {
          value: 'nonserviceloc',
          label: 'Non service location',
          // children: [
          //   {
          //     value: 'Non service location',
          //     label: 'Non service location',
          //   },
          // ],
        },
        {
          value: 'noteligible',
          label: 'Not Eligible',
          // children: [
          //   {
          //     value: 'Not Eligible',
          //     label: 'Not Eligible',
          //   },
          // ],
        },
        // {
        //   value: 'notavailable',
        //   label: 'Not Available',
        //   children: [
        //     {
        //       value: 'Not Reachable',
        //       label: 'Not Reachable',
        //     },
        //     {
        //       value: 'No Answer',
        //       label: 'No Answer',
        //     },
        //     {
        //       value: 'Alway Switched off',
        //       label: 'Alway Switched off',
        //     },
        //   ],
        // },
        // {
        //   value: 'converted',
        //   label: 'Converted',
        //   children: [
        //     {
        //       value: 'Closed with success',
        //       label: 'Closed with success',
        //     },
        //   ],
        // },
      ],
    },
  ];

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const onChangeLastName = (e) => {
    setLastName(e.target.value)
  }
  const primaryNoHandler = (event) => {

    setPrimaryNo(event.target.value)
  }
  const emailAddressHandler = (event) => {
    setEmail(event.target.value)
  }

  let stateOptions = (states && !_.isEmpty(states)) ?
    states.map(state => {
      const label = state.region_data.name
      const value = state.region_data.name
      const newState = { ...state, label, value }
      // state.push(label)
      return newState
    }) : null
  // console.log(stateOptions)

  const cities = useSelector((state) => state.address.cities)
  let citiesOptions = (cities && !_.isEmpty(cities)) ?
    cities.map(city => {

      const label = city.name
      const value = city.name
      const newCities = { ...city, label, value }
      return newCities
    }) : null

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('second');
  }

  const getDisabledHours = () => {
    var hours = [];
    for (var i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  }

  const getDisabledMinutes = (selectedHour) => {
    var minutes = [];
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  }
  const designations = useSelector((state) => state.leads.designations)
  const designationsOptions = (designations && !_.isEmpty(designations)) ?
    designations.map(designation => {
      const label = designation.designatioName
      const value = designation.designatioName
      const newCities = { ...designation, label, value }
      return newCities
    }) : null

  const handleAddMember = () => {
    // setModalText('Updating changes ');
    visibleTeamMemberModal && dispatch(actions.fetchDesignation(channelCode))

  };
  const showChangeOwnerModal = () => {
    setVisibleChangeOwnerModel(true);
  };



  const handleChangeOwner = () => {
    // setModalText('Updating changes ');
    setChangeOwnerLoading(true);
    setTimeout(() => {
      setVisibleChangeOwnerModel(false);
      setChangeOwnerLoading(false);
    }, 2000);
  };

  const Append = (value) => {
    setLeadStatus(value[0])
    setLeadDisposition(value[1])
    setLeadSubDisposition(value[2])
  }

  const appointmentDateHandler = (date, dateString) => {

    // setAppointmentDate(Date.parse(dateString))
    let newDate= moment(date).valueOf()
    let ms_date = new Date(newDate).setUTCHours(0, 0, 0, 0)
    // console.log('old',ms_date)
    // console.log('new moment',newDate)
    setAppointmentDate(date)
    setAppointmentDatePost(newDate)
    
  }
  console.log(appointmentDatePost)
    // const newDate = moment.unix(appointmentDate/1000).format("DD MM YYYY ")
    // console.log(appointmentDate)

  const updateDateHandler = (date, dateString) => {
    // setAppointmentDate(Date.parse(dateString))
    setAppointmentDate(moment(1635070237883))
  }

  const startTimeHandler = (value) => {
    
    // const hourInMilisec = (new Date(time).getHours() + 24) % 12 || 12
    // const minInMilisec = new Date(time).getMinutes()
    // const res = (+parseInt(hourInMilisec) * (60000 * 60)) + (+parseInt(minInMilisec) * 60000)
    // console.log(res)
    // console.log(hourInMilisec)
    setAppointmentTime(value)
  }
  const remarkFromSourceHandler = (event) => {
    setRemarkFromSource(event.target.value)
  }

  const remarkFromUserHandler = (event) => {
    setRemarkFromUser(event.target.value)
  }

  const onFinish = (errorMessage) => {
    alert(errorMessage)
    // console.log('Success:', errorMessage);
  };

  const onFinishFailed = (errorMsg) => {
    alert(errorMsg)
    // console.log('Failed:', errorMsg);
  };

  const stateSelectHandler = (value, key) => {
    dispatch(actions.fetchAllCities(key.region_data.adminCode1))

  }
  const stateChangetHandler = value => {
    setStateProvince(value)
  }

  const cityChangeHandler = value => {
    setCityProvince(value)

  }
  const leadTypeHandler = value => {
    setLeadType(value)
  }
  const productHandler = value => {
    setProduct(value)
  }
  const insuranceCompanyHandler = value => {
    setInsuranceComapany(value)
  }




  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);




  // const getDesignation= ()=>{

  // }

  const toggleTeamMember = () => {
    setVisibleTeamMemberModal(!visibleTeamMemberModal);
    !visibleTeamMemberModal && dispatch(actions.fetchDesignation(channelCode))

  };

  // validations 
  const validateMessages = {
    // required: `${label} is required!`,
    types: {
      email: `Email id must include @`,
    },
    // number: {
    //   phone: 'Not a valid no'
    //   range: 'Number must be 10 digits',
    // },
  };
  const formData = {
    ...storeFormData,
    leadStatus: leadStatus,
    start_date: appointmentDatePost,
    start_time: appointmentTime,
    remarksfromUser: remarkFromUser,
    remarksfromSource: remarkFromSource,
    leadsubDisposition: leadSubDisposition,
    leadDisposition: leadDisposition,
    // teamMembers: '',
    // leadSource: '',

    // appointment_status: '',
    // appointmentdisPosition: '',
    // appointmentsubdisPosition: '',


    lead_Owner_Id: id,
    lead_Creator_Id: id,
    user_id: id,
    LeadType: leadType,
    Product: product,
    Insurance_Company: insuranceCompany,

    state: stateProvince,
    city: cityProvince,
    primaryMobile: primaryNo,
    email: email,

    firstName: firstName,
    lastName: lastName,
  };
  let formIsValid = false;

  // if (firstNameIsValid && lastNameIsValid && primaryMobileIsValid) {
  //   formIsValid = true;
  // }

  const submitHandler = event => {
    // event.preventDefault();

    if(isNewLead){
      console.log(formData)
      dispatch(actions.createLead(formData))
      // if (!formIsValid) {
      //   return;
      // }else{
      // }
      setErrorMessage(successMsg)
      // console.log(errorMessage)
      // alert('New Lead Created Successfully')
  
      setIsNewLead(false)
    }else{

      dispatch(actions.editLead(formData, storeLeadId))
      alert(' Lead Updated Successfully')
      history.push('leaddetails/personallead')

      
      
    }
    // setErrorMessage( res.data.errMsg)



    // resetFirstName();
    // resetLastName();
    // resetEmail();
  };
  // const proceedHandler = event => {
  //   event.preventDefault();

  //   if (!formIsValid) {
  //     return;
  //   } else {
  //     dispatch(actions.storeLead(formData))
  //     history.push('leaddetails/personallead')
  //   }

  //   setErrorMessage('Form submitted successfully')
  //   setIsNewLead(false)
  //   // setErrorMessage( res.data.errMsg)



  //   // resetFirstName();
  //   // resetLastName();
  //   // resetEmail();
  // };

  // const updateLeadHandler = event => {
  //   event.preventDefault();

  //   dispatch(actions.editLead(formData, storeLeadId))
  //   // if (!formIsValid) {
  //   //   return;
  //   // }else{
  //   // }

  //   setErrorMessage('Form updated successfully')
  //   setIsNewLead(false)
  // }


  // useEffect(() => {
  //   if(designationsOptions===undefined){
  //     return
  //   }else{
  //     const getDesignation= designationsOptions

  //   }

  // }, [designationsOptions])


  if (leadDataLoading && _.isEmpty(storeFormData)) { return <Spin /> }

  return (
    <>
      <Tabs
        tabMenu={tabMenu}
        header="New Lead"
        activeKey="1"
      />



      <div className="form-container">
        <Form
          layout="horizontal"
          className="contact-detail-form"
          validateMessages={validateMessages}
          scrollToFirstError
          form={form}
          help={errorMessage}
          onFinish={submitHandler}
          initialValues={{
            "firstname": firstName,
            "lastname": lastName,
            "email": email,

            "phone": primaryNo,
            "state": stateProvince,
            "city": cityProvince,
            "leadType": leadType,
            "product": product,
            "insuranceCompany": insuranceCompany,
            "appointmentDate": appointmentDate,
            "appointmentTime":appointmentTime,
            "remarksfromsource": remarkFromSource,
            "remarksfromuser": remarkFromUser,
            "reminder": reminder,
            "leadStatus":leadArr,
          }}
          onFinishFailed={onFinishFailed}
        >
          <Row justify={width > breakpoint ? "":"center"} gutter={[0, 24]}  >
            <Col className="form-body  p40 mb-2" xs={24,{ order: width > breakpoint ? 1 : 2 }}  sm={24} md={16} lg={15} xl={15} span={23} offset={width > breakpoint ? 2:0}>
              <p className="form-title">Contact Details</p>
              <Row gutter={16} className="mb-2">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name='firstname'
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: 'First Name is required'
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Input
                      className="first-name input-box "
                      size="large"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={onChangeFirstName} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name='lastname'
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: 'Last Name is required'
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Input
                      className="last-name input-box"
                      size="large"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={onChangeLastName} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name='email'
                    label="Email"
                    rules={[
                      {
                        type: 'email',
                        message: 'Please provide valid email address'
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Input
                      className="email input-box"
                      size="large"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={emailAddressHandler} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name='phone'
                    label="Primary Mobile"
                    rules={[
                      {
                        required: true,
                        message: 'Mobile No is required'
                      },
                      // !mobileNoCheck || {
                      //   // type:'phone',
                      //   min: 10,
                      //   max: 10,
                      //   pattern: '^([-]?[1-9][0-9]*|0)$',
                      //   message: 'Enter a valid Mobile No'
                      // }
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Input
                      className="phone-no input-box"
                      size="large"
                      placeholder="Enter Primary Mobile"
                      value={primaryNo}
                      onChange={primaryNoHandler} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="state"
                    label="State"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: 'Select your State!',
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Select
                      size="large"
                      placeholder="Select Your State"
                      options={stateOptions}
                      onSelect={stateSelectHandler}
                      value={stateProvince}
                      onChange={stateChangetHandler}>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="city"
                    label="City"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: 'Please select your city!',
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Select
                      size="large"
                      placeholder="Select a city"
                      options={citiesOptions}
                      value={cityProvince}
                      onChange={cityChangeHandler}>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="leadType"
                    label="Lead Type"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: 'Select Lead Type',
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Select 
                      options={leadTypeOptions} 
                      value={leadType} 
                      size="large" 
                      placeholder="Select Lead Type" 
                      onChange={leadTypeHandler}>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="product"
                    label="Product"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: 'Select Product',
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Select 
                      value={product} 
                      size="large" 
                      options={leadProductOptions}
                      placeholder="Select Product" 
                      onChange={productHandler}>
                      
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="insuranceCompany"
                    label="Insurance Company"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: 'Insurance Company',
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Select 
                      value={insuranceCompany} 
                      size="large" 
                      placeholder="Select Insurance" 
                      onChange={insuranceCompanyHandler}
                      options={insuranceCompanyOptions}>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className="form-body  p40" style={{ marginLeft: width > breakpoint ? "20px" : '0' }} xs={{ order: width > breakpoint ? 2 : 1 }} sm={6} md={6} lg={6} xl={6} span={23} >
              <Row>
                <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                  <p className="form-title">Summary</p>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">Lead ID</p>
                      <p className="lead-detail">{leadIdValue}</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">Source</p>
                      <p className="lead-detail">-</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">Name</p>
                      <p className="lead-detail">{storefirstNameValue} {storelastNameValue}</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">Mobile Number</p>
                      <p className="lead-detail">{storePrimaryMobileValue}</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">State</p>
                      <p className="lead-detail">{storeStateValue}</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">City</p>
                      <p className="lead-detail">{storeCityValue}</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">Allocated To</p>
                      <p className="lead-detail">Himanshu</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                      <p className="lead-summ-label">Created on</p>
                      <p className="lead-detail">{new Date(createdDateValue).toLocaleDateString('in')}</p>
                      <p className="lead-date">2 days ago</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col className="form-body  p40" xs={{ order: 3 }} sm={16} md={16} lg={15} xl={15} span={23} offset={width > breakpoint ? 2:0}>
              <p className="form-title">Status</p>
              <Row gutter={16} className="mb-2">
                <Col xs={24} sm={12} md={24} lg={12} xl={12} >
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="leadStatus"
                    label="Lead Status"
                    style={{ marginBottom: '1rem' }}
                    size="large"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Lead Status',
                      },
                    ]}
                  >
                    <Cascader
                      options={leadOptions}
                      placeholder="New Contact"
                      size="large"
                      popupClassName="popup-size"
                      onChange={Append}
                      style={{ height: '3rem' }}
                      value={leadArr}
                    />
                  </Form.Item>
                </Col>
                {leadDisposition === "appointment" || leadDisposition === "callback" ?
                  <>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentDate"
                        label="Appointment Date"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'This field is required',
                          },
                        ]}
                        style={{ marginBottom: '1rem' }}

                      >
                        <DatePicker
                          // disabledDate={disabledDate}
                          onChange={appointmentDateHandler}
                          value={appointmentDate}
                          size="large"
                          format="YYYY-MM-DD"
                          style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentTime"
                        label="Select Start Time"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Select Start Time',
                          },
                        ]}
                        style={{ marginBottom: '1rem' }}

                      >
                        {/* <TimePicker
                          disabledHours={getDisabledHours}
                          disabledMinutes={getDisabledMinutes}
                          use12Hours
                          minuteStep={30}
                          format="h:mm"
                          size="large"
                          style={{ width: "100%" }}
                          onChange={startTimeHandler} /> */}
                          <Select
                            onChange={startTimeHandler} 
                            value={appointmentTime} 
                            size="large"
                            options={appointmentTimeOptions}
                            placeholder="Start Time">
                         </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="reminder"
                        label="Set Reminder"
                        hasFeedback
                        rules={[
                          {
                            required: false,
                            message: 'Set Reminder',
                          },
                        ]}
                        style={{ marginBottom: '1rem' }}

                      >
                        <Select
                          // onChange={reminderHandler} 
                          value={reminder} size="large"
                          options={setReminderOptions}
                          placeholder="Set Reminder">
                        </Select>
                      </Form.Item>
                    </Col>
                  </>
                  : null}
                <Col xs={24} sm={12} md={24} lg={12} xl={12} >
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name='remarksfromsource'
                    label="Remark From Source "
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}

                  >
                    <Input
                      className="email input-box"
                      size="large"
                      placeholder="Enter Some Remark"
                      value={remarkFromSource}
                      onChange={remarkFromSourceHandler} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12} className="mb-2">
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name='remarksfromuser'
                    label="Remark From User "
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    style={{ marginBottom: '1rem' }}
                  >
                    <Input
                      className="email input-box"
                      size="large"
                      placeholder="Enter Some Remark"
                      value={remarkFromUser}
                      onChange={remarkFromUserHandler} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="lead-manager" style={(leadDisposition === "appointment" || leadDisposition === "callback") && { display: 'none' }}>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="lead-manager">
                  <p className="botton-label">Select the team members you want to involve for this lead</p>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className="lead-manager" offset={width > breakpoint ? 6 : 0}>
                  <Button 
                    shape="round" 
                    size="large" 
                    block 
                    onClick={toggleTeamMember}
                    type="primary"
                    style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }}
                    >Add Team Member</Button>
                </Col>
                <>
                  <Modal
                    title="Add Team Member"
                    centered={true}
                    visible={visibleTeamMemberModal}
                    onCancel={toggleTeamMember}
                    footer={[
                      <Button key="cancel" onClick={toggleTeamMember}>
                        Cancel
                      </Button>,
                      <Button key="save" type="primary" >
                        Save
                      </Button>,
                    ]}
                  // onCancel={handleCancel}
                  >
                    <Row gutter={10}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="Select Designation"
                          label="Select Designation"
                          hasFeedback
                          rules={[
                            {
                              required: false,
                              message: 'Set Designation',
                            },
                          ]}
                        >
                          <Select size="large" options={designationsOptions} placeholder="Set Designation"></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="Select Team Member"
                          label="Select Team Member"
                          hasFeedback
                          rules={[
                            {
                              required: false,
                              message: 'Set Reminder',
                            },
                          ]}
                        >
                          <Select size="large" options={setReminderOptions} placeholder="Set Team Member"></Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Modal>
                </>

                {checkAgent(levelCode, minValue) && <>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} className="lead-manager">
                    <p className="botton-label">Currently this lead is allocated to Self</p>
                  </Col>
                  <Col xs={24} sm={24} md={5} lg={5} xl={5} className="lead-manager" offset={width > breakpoint ? 7 : 0}>
                    <Button shape="round" size="large" block onClick={showChangeOwnerModal}>Change Owner</Button>
                  </Col>
                  <Modal
                    title="Allocate to"
                    centered={true}
                    visible={visibleChangeOwnerModel}
                    onOk={handleChangeOwner}
                    confirmLoading={changeOwnerLoading}
                  // onCancel={handleCancel}
                  >
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="designation"
                        label="Select Designation"
                        hasFeedback
                        rules={[
                          {
                            required: false,
                            message: 'Set Designation',
                          },
                        ]}
                      >
                        <Select size="large" options={setReminderOptions} placeholder="Set Designation"></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="teamMember"
                        label="Select Team Member"
                        hasFeedback
                        rules={[
                          {
                            required: false,
                            message: 'Set Reminder',
                          },
                        ]}
                      >
                        <Select size="large" options={setReminderOptions} placeholder="Set Team Member"></Select>
                      </Form.Item>
                    </Col>
                  </Modal>
                </>}
                <Table columns={columns} />
              </Row>

              {/* </Form> */}
            </Col>
            <Col className='form-body  p20' style={{ marginBottom: "20px" }} xs={{ order: 5 }} sm={24} md={16} lg={15} xl={15} span={23} offset={width > breakpoint ? 2:0}>
              <Row>
                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 16 : 2} >
                  {isNewLead ?
                    <Form.Item>
                      <Button
                        type="primary"
                        style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }}
                        // shape="round"
                        size="large"
                        icon={<FileTextOutlined />}
                        htmlType="submit"
                        // disabled={!formIsValid}
                        // onClick={submitHandler}
                      >Submit</Button>
                    </Form.Item> :
                    <Form.Item>
                      <Button
                        type="primary"
                        // shape="round"
                        size="large"
                        style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }}
                        icon={<EditOutlined />}
                        htmlType="submit"
                        // disabled={!formIsValid}
                        // onClick={updateLeadHandler}
                      >Update</Button>
                    </Form.Item>
                  }
                </Col>
                <Col xs={11} sm={12} md={4}>
                  {/* <Link to="leaddetails/personallead"> */}
                  <Form.Item>
                    <Button
                      type="primary"
                      // shape="round"
                      size="large"
                      htmlType="submit"
                      style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }}
                      icon={<ArrowRightOutlined />}
                      // onClick={proceedHandler}
                    >Proceed</Button>
                  </Form.Item>
                  {/* </Link> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <FloatButton />
      </div>

    </>
  )
})

export default NewLead
