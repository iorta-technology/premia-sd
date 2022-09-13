import React, { useEffect, useState } from "react";
import moment from 'moment';
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import './CalendarEvent.css';
import { TimePicker, Button, Modal, Card, Input, DatePicker, Alert ,Tag, Space, message, AutoComplete } from 'antd';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PresetStatusColorTypes } from "antd/lib/_util/colors";
import { NavItem } from "react-bootstrap";
import Icon from '@ant-design/icons';
import axiosRequest from '../../axios-request/request.methods'
import {stoageGetter} from '../../helpers'
import axios from 'axios';
import { times } from "lodash";
import Form from "antd/lib/form/Form";
import Item from "antd/lib/list/Item";
import { useDispatch, useSelector } from 'react-redux';
const { Search } = Input;

let dateFormat = 'YYYY/MM/DD';

let addEvent = [];
export default function CalendarEvent(props) {
  
  let{innerWidth:width,innerHeight:height}=window;
  const format = 'h:mm';
  let month=moment().format('MM/YYYY');
  // console.log(month)    
  
  const [Appointmentid, setAppointmentid] = useState('')
  const [advisorCheck, setAdvisorCheck] = useState(true)
  const [prospectCheck, setProspectCheck] = useState(false)
  const [customerCheck, setCustomerCheck] = useState(false)
  const [appointmenttypes, setAppointmentType] = useState('Business Planning & review')
  const [clientvisit, setclientVisit] = useState('')
  const [duration, setDuration] = useState('')
  const [durationButton, setDurationButton] = useState({
    select_time: true,
    all_day: false
  })
  const [advisorCollection, setAdvisorCollection] = useState({
    appointment_advisor: true,
    phone_call_advisor: false,
    training: false,
    businessPlanning_review: true,
    unit_meeting: false,
    joint_customer_visit: false,
    servicing: false,
    inactive_agent_reactivation: false

  })
  const [statusType, setStatusType] = useState({
    openStatus: true,
    closeStatus: false
  })
  const [prospectCollection, setProspectCollection] = useState({
    appointment_prospect: true,
    phone_call: false,
    training_prospect: false,
    first_meeting: true,
    follow_up: false,
    document_collection: false
  })
  const [customerCollection, setCustomerCollection] = useState({
    appointment_customer: true,
    phone_call_customer: false,
    policy_renewal: false
  })
  const [teamMemberData ,setTeamMemberData]=useState('')
  const [hierarAgentList ,setHierarAgentList]=useState([])
  const [teamMemberChip ,setTeamMemberChip]=useState([])
  const [ownerCollectn ,setOwnerCollectn]=useState([])
  const _dataStore = useSelector((state) => state?.home?.user_tree)

  useEffect(() => {
    try{
      console.log(props, 'props-----calendar----1st use effect?')
    console.log('USER HIERARCHYY ___DATA__',_dataStore)
    // let _teamMember = _dataStore.reporting_users.filter(event => designationid == event.hierarchy_id)
    let _teamMember = []
    _dataStore.reporting_users.map(el => {
          let sortarray = {
              FullName: el.full_name,
              ShortId: el.hierarchy_details.hierarchyName,
              firstname: el.first_name,
              lastname: el.last_name,
              employecode: el.employeeCode,
              designation: el.hierarchy_details.hierarchyName,
              _Id: el._id,
              value:toCapitalize(el.full_name) + ' ' + '('+el.hierarchy_details.hierarchyName+')'
          }
          _teamMember.push(sortarray)
          sortarray = {};

      })
      setHierarAgentList(_teamMember)

   
    // if(Object.keys(props.editData).length !== 0 || props.editData !== undefined){
    //   // console.log('I AM HEREEEE',props);
    //   let _teamMember = props.editData.searchdata.map(el =>{ return el.value })
    //   setTeamMemberChip(_teamMember)
    //   setOwnerCollectn(props.editData.searchdata)

    // }
  }catch(err){}
    
  },[props]);

  useEffect(() => {
    // props.getdata(false)
    console.log(props, 'props-----calendar----?')
    
  },[props]);

  let toCapitalize = (strText) =>{
    try {
        if (strText !== '' && strText !== null && typeof(strText) !== undefined) {
            var _str = strText.toLowerCase();
            var collection = _str.split(" ");
            var modifyStrigs = [];
            _str = '';
            for (var i = 0; i < collection.length; i++) {
                modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                _str = _str + modifyStrigs[i] + ' ';
            }
            return _str;
        } else {
            return "";
        }
    } catch (err) {

    }
};

  useEffect(()=>{
    console.log('user id calendar event----PROPSSS----->',props)
    // let userid =stoageGetter('user')
    console.log(props.click)
    if(props.click == 'data'||"UPDATE EVENT"){
      // console.log(props.Data.teamMember);
      props.setIsModalVisible(true);
    }
    if(props.click=='UPDATE EVENT'){
      setUpdateCheckEvent(true)
    }//1661472000000
    if(props.Data){
      if(props.Data.appointment_type == 'existingpartner'){
        setAdvisorCheck(true)
        setCustomerCheck(false)
        if(props.Data.event_type == 'appointment'){
          setAdvisorCollection({
            appointment_advisor: true,
            phone_call_advisor: false,
            training: false,
          })
          setAppointmentType(props.Data.tata_appointment_type)
          if(props.Data.tata_appointment_type == 'Business Planning & review' ){
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: true,
              inactive_agent_reactivation: false,
              unit_meeting: false,
              joint_customer_visit: false,
              servicing: false
            })
          }else if (props.Data.tata_appointment_type == 'Inactive agent reactivation'){
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: false,
              inactive_agent_reactivation: true,
              unit_meeting: false,
              joint_customer_visit: false,
              servicing: false
            })
          }else if (props.Data.tata_appointment_type == 'Joint customer Meeting'){
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: false,
              inactive_agent_reactivation: false,
              unit_meeting: false,
              joint_customer_visit: true,
              servicing: false
            })
          }else if (props.Data.tata_appointment_type == 'Unit Meeting'){
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: false,
              inactive_agent_reactivation: false,
              unit_meeting: true,
              joint_customer_visit: false,
              servicing: false
            })
          }else if (props.Data.tata_appointment_type == 'Servicing'){
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: false,
              inactive_agent_reactivation: false,
              unit_meeting: false,
              joint_customer_visit: false,
              servicing: true
            })
          }
          
        }else if(props.Data.event_type == 'phonecall'){
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: true,
            training: false,
          })
          setclientVisit('Relationship call')
        }else{
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: false,
            training: true,
          })
        }
      }else{
        setCustomerCheck(true)
        setAdvisorCheck(false)
        if(props.Data.event_type == 'appointment'){
          setCustomerCollection({
            appointment_customer: true,
            phone_call_customer: false,
            policy_renewal: false
          })
          setclientVisit('Client Meeting')
        }else if(props.Data.event_type == 'phonecall'){
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: true,
            policy_renewal: false
          })
          setclientVisit('Relationship call')
        }else if(props.Data.event_type == 'policyrenewals'){
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: false,
            policy_renewal: true
          })
        }
      }

      if(props.Data.durationType == 'customedatetime'){
        setDurationButton({
          select_time: true,
          all_day: false
        })
      }else{
        setDurationButton({
          select_time: false,
          all_day: true
        })
      }
      if(props.Data.statusType == 'open'){
        setEventStatus("open")
        setStatusType({
          openStatus: true,
          closeStatus: false
        })
      }else{
        setEventStatus("close")
        setStatusType({
          openStatus: false,
          closeStatus: true
        })
      }
      if(props.Data.manuallycustomerAdded == true){
      setCustomerNameText(props.Data.manuallyrenewalCustomer[0].Name)
      setCustomerNameCheck(true)
      setCustomerMobileNoCheck(true)
      setCustomerMobileNoText(props.Data.manuallyrenewalCustomer[0].MobileNumber)
      setManualCustomerCheck(true)
      setAddCustTagVisible(true)
      }
      setAppointmentid(props.Data._id)
      setStatusReasonText(props.Data.statusreason)
      setDurationStartTimeOperation(props.Data.start_time)
      setDurationEndTimeOperation(props.Data.end_time)
      setDurationEndDateOperation(props.Data.end_date)
      setDurationEndDate(moment(props.Data.end_date))
      setDurationStartDateOperation(props.Data.start_date);
      setDurationStartDate(moment(props.Data.start_date))
      setStartTimeSelect(props.Data.start_time)
      setEndTimeSelect(props.Data.end_time)
      setEventDurationType(props.Data.durationType)
      setModeSelect(props.Data.mode)
      setStatusReasonText(props.Data.statusreason)
      setTeamMemberChip(props.Data.teamMember)
      setCustomerNameText()
      console.log(moment(1661472000000).format("YYYY-MM-DD"));
    }
  },[])

  const [startDuration, setStartDuration] = useState();
  const [endDuration, setEndDuration] = useState();
  const [MultiSelectDate, setMultiSelectDate] = useState(false)
  const [clickedDate, setClickedDate] = useState();
  // const [isModalVisible, props.] = useState(false);
  const [eventText, setEventText] = useState("");
  const [value, setValue] = useState(moment('10:00', format));
  const [endVal, setEndVal] = useState(moment('10:00', format));
  const [addEvents, setAddEvents] = useState([
    

    //     // {
    //     //   id:helperUpcomingArr? helperUpcomingArr._id:null,
    //     //   start:1631750400000+helperUpcomingArr? helperUpcomingArr.start_time:null,
    //     //   end:1631750400000+37800000,
    //     // },
    
    //   { 
    
    //     // id:item._id,
    //     title:"mysasd",
    //     start:1631750400000+48600000,
    //     end:1631750400000+52200000,
    //   }
    // ,
    //     // { 
    //     //     id:helperUpcomingArr? helperUpcomingArr._id:null,
    //     //     title:helperUpcomingArr?  helperUpcomingArr.appointment_type:null,
    //     //     start:start_date_assign+helperUpcomingArr?helperUpcomingArr.start_time:null,
    //     //     end:end_date_assign+helperUpcomingArr?helperUpcomingArr.end_time:null,
    //     //   }
    //     {
    //     title: eventText, start: "2021-08-11T12:00:00",
    //     end: "2021-08-11T15:00:00Z"
    //   },
    //   {
    //     id: Math.random().toString(36).slice(-6),
    //     title: 'my event',
    //     description: "This is the description of the event",
    //     start: "2021-08-21T12:00:00",
    //     end: "2021-08-21T15:00:00"
    //   },
    //   {
    //     id: Math.random().toString(36).slice(-6),
    //     title: 'my event',
    //     description: "This is the description of the event",
    //     start: "2021-08-11T12:00:00",
    //     end: "2021-08-12T15:00:00"
    //   }
    //     ,{
    //       id: Math.random().toString(36).slice(-6),
    //       title: 'Timestamp',
    //       description: "This is the description of the event",
    //       start: 1630800000000+50400000,
    //       end: 1630800000000+52200000
    //     }
    //       ,  {
    //     id: Math.random().toString(36).slice(-6),
    //     title: 'test',
    //     description: "This is the description of the event",
    //     start: "2021-09-11T11:00:00",
    //     end: "2021-09-12T15:00:00"
    //   }
       ])
 const[testArr,setTestArr]=useState([
  {
    "errCode": -1,
    "errMsg": [{
        "_id": "6135e9a3f503954f7e6bba45",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1630485000000,
        "end_time_MS": 1630488600000,
        "start_time": 50400000,
        "start_date": 1630434600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 54000000,
        "end_date": 1630434600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1630923171207
    }, {
        "_id": "613f05df086b7846d1313b86",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1630486800000,
        "end_time_MS": 1630490400000,
        "start_time": 32400000,
        "start_date": 1630454400000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 36000000,
        "end_date": 1630454400000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631520223602
    }, {
        "_id": "6138577dfbdd0b06661eda6a",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1630488600000,
        "end_time_MS": 1630492200000,
        "start_time": 34200000,
        "start_date": 1630454400000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 37800000,
        "end_date": 1630454400000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631082365286
    }, {
        "_id": "613ee604086b7846d1313b78",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1630569600000,
        "end_time_MS": 1630573200000,
        "start_time": 28800000,
        "start_date": 1630540800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 32400000,
        "end_date": 1630540800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631512068207
    }, {
        "_id": "614099c1086b7846d1313c2d",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1630571400000,
        "end_time_MS": 1630575000000,
        "start_time": 30600000,
        "start_date": 1630540800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 34200000,
        "end_date": 1630540800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631623617742
    }, {
        "_id": "613065f667f24402962717db",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "manuallyrenewalCustomer": [{
            "Name": "abx",
            "MobileNumber": "2232323131"
        }],
        "clientVisit": "clientmeeting",
        "teamMember": [],
        "manuallycustomerAdded": "true",
        "statusType": "open",
        "tata_appointment_type": "",
        "durationType": "customedatetime",
        "appointment_type": "customer",
        "start_time_MS": 1630659600000,
        "end_time_MS": 1630663200000,
        "start_time": 32400000,
        "start_date": 1630627200000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 36000000,
        "end_date": 1630627200000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "event_description": "Suraj Shukla will have a client meeting with Abx",
        "created_date": 1630561782490
    }, {
        "_id": "6130af1e67f2440296271804",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "manuallyrenewalCustomer": [{
            "Name": "j",
            "MobileNumber": "4654654"
        }],
        "clientVisit": "clientmeeting",
        "teamMember": [],
        "manuallycustomerAdded": "true",
        "statusType": "open",
        "tata_appointment_type": "",
        "durationType": "customedatetime",
        "appointment_type": "customer",
        "start_time_MS": 1630832400000,
        "end_time_MS": 1630834200000,
        "start_time": 32400000,
        "start_date": 1630800000000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 34200000,
        "end_date": 1630800000000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "event_description": "Suraj Shukla will have a client meeting with J",
        "created_date": 1630580510153
    }, {
        "_id": "61407fff086b7846d1313bf9",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631010600000,
        "end_time_MS": 1631014200000,
        "start_time": 37800000,
        "start_date": 1630972800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 41400000,
        "end_date": 1630972800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631617023630
    }, {
        "_id": "61408033086b7846d1313bfb",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631012400000,
        "end_time_MS": 1631016000000,
        "start_time": 39600000,
        "start_date": 1630972800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 43200000,
        "end_date": 1630972800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631617075128
    }, {
        "_id": "61408072086b7846d1313bfd",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631021400000,
        "end_time_MS": 1631025000000,
        "start_time": 48600000,
        "start_date": 1630972800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 52200000,
        "end_date": 1630972800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631617138166
    }, {
        "_id": "6140832a086b7846d1313c06",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631025000000,
        "end_time_MS": 1631028600000,
        "start_time": 52200000,
        "start_date": 1630972800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 55800000,
        "end_date": 1630972800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631617834223
    }, {
        "_id": "61409982086b7846d1313c2a",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631028600000,
        "end_time_MS": 1631032200000,
        "start_time": 55800000,
        "start_date": 1630972800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 59400000,
        "end_date": 1630972800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631623554216
    }, {
        "_id": "61409afb086b7846d1313c2f",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631091600000,
        "end_time_MS": 1631095200000,
        "start_time": 32400000,
        "start_date": 1631059200000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 36000000,
        "end_date": 1631059200000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631623931523
    }, {
        "_id": "61408c40086b7846d1313c22",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631093400000,
        "end_time_MS": 1631183400000,
        "start_time": 34200000,
        "start_date": 1631059200000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 37800000,
        "end_date": 1631145600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631620160632
    }, {
        "_id": "613859eefbdd0b06661eda6e",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631095200000,
        "end_time_MS": 1631100600000,
        "start_time": 36000000,
        "start_date": 1631059200000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 41400000,
        "end_date": 1631059200000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631082990184
    }, {
        "_id": "61370ec65866867bc1e205c1",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631097000000,
        "end_time_MS": 1631100600000,
        "start_time": 37800000,
        "start_date": 1631059200000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 41400000,
        "end_date": 1631059200000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1630998214352
    }, {
        "_id": "6131fc54cb41646464003cda",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631156400000,
        "end_time_MS": 1631178000000,
        "start_time": 30600000,
        "start_date": 1631125800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 52200000,
        "end_date": 1631125800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1630665812097
    }, {
        "_id": "613ee61c086b7846d1313b7a",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631174400000,
        "end_time_MS": 1631178000000,
        "start_time": 28800000,
        "start_date": 1631145600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 32400000,
        "end_date": 1631145600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631512092156
    }, {
        "_id": "6135e9aaf503954f7e6bba47",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631176200000,
        "end_time_MS": 1631179800000,
        "start_time": 50400000,
        "start_date": 1631125800000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 54000000,
        "end_date": 1631125800000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1630923178631
    }, {
        "_id": "6131e2af67f2440296271832",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "manuallyrenewalCustomer": [{
            "Name": "a",
            "MobileNumber": "212"
        }],
        "clientVisit": "clientmeeting",
        "teamMember": [],
        "manuallycustomerAdded": "true",
        "statusType": "open",
        "tata_appointment_type": "",
        "durationType": "customedatetime",
        "appointment_type": "customer",
        "start_time_MS": 1631178000000,
        "end_time_MS": 1631181600000,
        "start_time": 32400000,
        "start_date": 1631145600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 36000000,
        "end_date": 1631145600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "event_description": "Suraj Shukla will have a client meeting with A",
        "created_date": 1630659247668
    }, {
        "_id": "6138578efbdd0b06661eda6c",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631181600000,
        "end_time_MS": 1631273400000,
        "start_time": 36000000,
        "start_date": 1631145600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 41400000,
        "end_date": 1631232000000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631082382859
    }, {
        "_id": "6140308b086b7846d1313ba5",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631185200000,
        "end_time_MS": 1631188800000,
        "start_time": 39600000,
        "start_date": 1631145600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 43200000,
        "end_date": 1631145600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631596683014
    }, {
        "_id": "61406275086b7846d1313bd5",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631187000000,
        "end_time_MS": 1631190600000,
        "start_time": 41400000,
        "start_date": 1631145600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 45000000,
        "end_date": 1631145600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631609461748
    }, {
        "_id": "6140814f086b7846d1313bff",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631194200000,
        "end_time_MS": 1631197800000,
        "start_time": 48600000,
        "start_date": 1631145600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 52200000,
        "end_date": 1631145600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631617359478
    }, {
        "_id": "61408309086b7846d1313c04",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631197800000,
        "end_time_MS": 1633879800000,
        "start_time": 52200000,
        "start_date": 1631145600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 55800000,
        "end_date": 1633824000000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631617801632
    }, {
        "_id": "61418bcd086b7846d1313c36",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631266200000,
        "end_time_MS": 1631269800000,
        "start_time": 34200000,
        "start_date": 1631232000000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 37800000,
        "end_date": 1631232000000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631685581530
    }, {
        "_id": "6131df5667f2440296271824",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "manuallyrenewalCustomer": [{
            "Name": "a",
            "MobileNumber": "1111"
        }],
        "clientVisit": "clientmeeting",
        "teamMember": [],
        "manuallycustomerAdded": "true",
        "statusType": "open",
        "tata_appointment_type": "",
        "durationType": "customedatetime",
        "appointment_type": "customer",
        "start_time_MS": 1631525400000,
        "end_time_MS": 1631529000000,
        "start_time": 34200000,
        "start_date": 1631491200000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 37800000,
        "end_date": 1631491200000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "event_description": "Suraj Shukla will have a client meeting with A",
        "created_date": 1630658390537
    }, {
        "_id": "614055b7086b7846d1313bc5",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631613600000,
        "end_time_MS": 1631617200000,
        "start_time": 36000000,
        "start_date": 1631577600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 39600000,
        "end_date": 1631577600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631606199505
    }, {
        "_id": "6140827e086b7846d1313c02",
        "showComment": false,
        "leadId": null,
        "partnerId": null,
        "customerId": null,
        "teamMember_clone": [],
        "statusReason": "",
        "isLeadFailed": false,
        "appointment_type": "customer",
        "start_time_MS": 1631626200000,
        "end_time_MS": 1631629800000,
        "start_time": 48600000,
        "start_date": 1631577600000,
        "userId": "60a61763de95b87f62856c13",
        "end_time": 52200000,
        "end_date": 1631577600000,
        "event_type": "appointment",
        "event_name": "Appointment",
        "created_date": 1631617662522
    }],
    "dbDate": "Wed Sep 15 2021 13:24:29 GMT+0000 (Coordinated Universal Time)"
  }
    ])

  const checkTeamMemberFunc = () => {
    setAdvisorCheck(true)
    setProspectCheck(false)
    setCustomerCheck(false)
  }
  const checkProspectFunc = () => {
    setAdvisorCheck(false)
    setProspectCheck(true)
    setCustomerCheck(false)
  }

  const checkCustomerFunc = () => {
    setAdvisorCheck(false)
    setProspectCheck(false)
    setCustomerCheck(true)
  }
  const DurationSelectTimeFunc = () => {
    setEventDurationType("customedatetime")
    setStartTimeSelect("")
    setEndTimeSelect("")
    setDurationStartTimeOperation()
    setDurationEndTimeOperation()
    setDurationButton({
      select_time: true,
      all_day: false
    })
  }
  const DurationAllDayFunc = () => {
    setEventDurationType("allday")
    setDurationStartTimeOperation(32400000)
    setDurationEndTimeOperation(61200000)
    setDurationButton({
      select_time: false,
      all_day: true
    })
  }
  let regEmail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let regMobile=/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  // let regMobile=/^[6-9]\d{9}/;
  const [durationStartDate, setDurationStartDate] = useState("");
  const [durationEndDate, setDurationEndDate] = useState("");
  const [durationStartTime, setDurationStartTime] = useState("");
  const [durationEndTime, setDurationEndTime] = useState("");
  const [durationStartBDateCheck, setDurationStartDateCheck] = useState(true)
  const [durationEndDateCheck, setDurationEndDateCheck] = useState(true)
  const [durationStartTimeCheck, setDurationStartTimeCheck] = useState(true);
  const [durationEndTimeCheck, setDurationEndTimeCheck] = useState(true);
  const[durationStartDateOperation,setDurationStartDateOperation]=useState();
  const[durationEndDateOperation,setDurationEndDateOperation]=useState();
  const[durationStartTimeOperation,setDurationStartTimeOperation]=useState();
  const[durationEndTimeOperation,setDurationEndTimeOperation]=useState();
  const[durationStartDateHelper,setDurationStartDateHelper]=useState();
  const[durationStartTimeDiffCheck,setDurationStartTimeDiffCheck]=useState(true);
  const[durationEndTimeDiffCheck,setDurationEndTimeDiffCheck]=useState(true);
  const[durationEndTimeSameCheck,setDurationEndTimeSameCheck]=useState(true);
  const[durationStartDateDiffCheck,setDurationStartDateDiffCheck]=useState(true);
  const[durationEndDateDiffCheck,setDurationEndDateDiffCheck]=useState(true);
  const[fetchUpcomingArr,setFetchUpcomingArr]=useState([]);
  const[helperUpcomingArr,setHelperUpcomingArr]=useState();
  const[updateStartTime,setUpdateStartTime]=useState()
  const[updateEndTime,setUpdateEndTime]=useState()

  
  const[fetchStartDate,setFetchStartDate]=useState();
  const[fetchEndDate,setFetchEndDate]=useState();
  const[fetchStartTime,setFetchStartTime]=useState();
  const[fetchEndTime,setFetchEndTime]=useState();
  const[fetchedEventId,setFetchedEventId]=useState();
  const[fetchEventCheck,setFetchEventCheck]=useState(false)
  const[timeList,setTimeList]=useState( [{
    dispValue: "8:00 AM",
    value: "28800000"
  }, {
    dispValue: "8:30 AM",
    value: "30600000"
  }, {
    dispValue: "9:00 AM",
    value: "32400000"
  }, {
    dispValue: "9:30 AM",
    value: "34200000"
  }, {
    dispValue: "10:00 AM",
    value: "36000000"
  }, {
    dispValue: "10:30 AM",
    value: "37800000"
  }, {
    dispValue: "11:00 AM",
    value: "39600000"
  }, {
    dispValue: "11:30 AM",
    value: "41400000"
  }, {
    dispValue: "12:00 PM",
    value: "43200000"
  }, {
    dispValue: "12:30 PM",
    value: "45000000"
  }, {
    dispValue: "1:00 PM",
    value: "46800000"
  }, {
    dispValue: "1:30 PM",
    value: "48600000"
  }, {
    dispValue: "2:00 PM",
    value: "50400000"
  }, {
    dispValue: "2:30 PM",
    value: "52200000"
  }, {
    dispValue: "3:00 PM",
    value: "54000000"
  }, {
    dispValue: "3:30 PM",
    value: "55800000"
  }, {
    dispValue: "4:00 PM",
    value: "57600000"
  }, {
    dispValue: "4:30 PM",
    value: "59400000"
  }, {
    dispValue: "5:00 PM",
    value: "61200000"
  }, {
    dispValue: "5:30 PM",
    value: "63000000"
  }, {
    dispValue: "6:00 PM",
    value: "64800000"
  }, {
    dispValue: "6:30 PM",
    value: "66600000"
  }, {
    dispValue: "7:00 PM",
    value: "68400000"
  }, {
    dispValue: "7:30 PM",
    value: "70200000"
  }, {
    dispValue: "8:00 PM",
    value: "72000000"
  }, {
    dispValue: "8:30 PM",
    value: "73800000"
  }, {
    dispValue: "9:00 PM",
    value: "75600000"
  }, {
    dispValue: "9:30 PM",
    value: "77400000"
  }])

  const[modeList,setModeList]=useState( [
    {
    dispValue: "Face to face visit",
    value: "Face to face visit"
  }, {
    dispValue: "Telephonic",
    value: "Telephonic"
  }, {
    dispValue: "Branch visit",
    value: "Branch visit"
  }, {
    dispValue: "Lead visit",
    value: "Lead visit"
  }, {
    dispValue: "Joint call",
    value: "Joint call"
  },])
  const[modeSelect,setModeSelect]=useState("")
  const[startTimeSelect,setStartTimeSelect]=useState("")
  const[endTimeSelect,setEndTimeSelect]=useState("");
  const [durationDateAlert, setDurationDateAlert] = useState(false)
  const [durationTimeAlert, setDurationTimeAlert] = useState(false)
  const [durationendTimeAlert, setDurationEndTimeAlert] = useState(false)
  const [durationenddateAlert, setDurationEndDateAlert] = useState(false)
  const [durationModeAlert, setDurationModeAlert] = useState(false)
  const [cardHeight, setCardHeight] = useState(true);
  const [prospectFirstNameText, setProspectFirstNameText] = useState("");
  const [prospectLastNameText, setProspectLastNameText] = useState("");
  const [prospectEmailAddressText, setProspectEmailAddressText] = useState("");
  const [prospectMobileNoText, setProspectMobileNoText] = useState("");
  const [prospectFirstNameCheck, setProspectFirstNameCheck] = useState(true);
  const [prospectLastNameCheck, setProspectLastNameCheck] = useState(true);
  const [prospectEmailAddressCheck, setProspectEmailAddressCheck] = useState(true);
  const [prospectMobileNoCheck, setProspectMobileNoCheck] = useState(true);
  const[prospectEmailRegCheck,setProspectEmailRegCheck]=useState(true)
  const[prospectMobileRegCheck,setProspectMobileRegCheck]=useState(true)
  const[addManuallyButtonCheck,setAddManuallyButtonCheck]=useState(false);
  const[customerNameText,setCustomerNameText]=useState("");
  const[customerMobileNoText,setCustomerMobileNoText]=useState("");
  const[customerNameCheck,setCustomerNameCheck]=useState(true);
  const[customerMobileNoCheck,setCustomerMobileNoCheck]=useState(true)
  const[customermblvalid, setCustomerMblValid] = useState(true)
  const[customerArr,setCustomerArr]=useState([]);
  const[customerHelperArr,setCustomerHelperArr]=useState([]);
  const[customerTagVisible,setCustomerTagVisible]=useState(false);
  const[customerOnClickVal,setCustomerOnClickVal]=useState()
  const[searchCustomerArr,setSearchCustomerArr]=useState([])
  const[searchCustomerObject,setSearchCustomerObject]=useState()
  const[searchCustomerText,setSearchCustomerText]=useState("");
  const[customerOnClickCheck,setCustomerOnClickCheck]=useState(false)
  const[searchAdvisorText,setSearchAdvisorText]=useState("");
  const[advisorOnClickCheck,setAdvisorOnClickCheck]=useState(false)
  const[advisorArr,setAdvisorArr]=useState([]);
  const[advisorHelperArr,setAdvisorHelperArr]=useState([]);
  const[advisorTagVisible,setAdvisorTagVisible]=useState(false);
  const[advisorOnClickVal,setAdvisorOnClickVal]=useState()
  const[searchAdvisorArr,setSearchAdvisorArr]=useState([])
  const[searchAdvisorObject,setSearchAdvisorObject]=useState()
  const[searchProspectArr,setSearchProspectArr]=useState([])
  const[searchProspectObject,setSearchProspectObject]=useState()
  const[prospectArr,setProspectArr]=useState([]);
  const[prospectHelperArr,setProspectHelperArr]=useState([]);
  const[prospectTagVisible,setProspectTagVisible]=useState(false);
  const[prospectOnClickVal,setProspectOnClickVal]=useState()
  const[searchProspectText,setSearchProspectText]=useState("");
  const[prospectOnClickCheck,setProspectOnClickCheck]=useState(false)
  const[bookEventCheck,setBookEventCheck]=useState(true)
  const[updateEventCheck,setUpdateCheckEvent]=useState(false)
  const[updateEventId,setUpdateEventId]=useState()
  const[eventLoadCheck,setEventLoadCheck]=useState(false)
  const[eventBookCheck,setEventBookCheck]=useState("")
  const[updateEventType,setUpdateEventType]=useState("")
  const[appointmentTypeFetched,setAppointmentTypeFetched]=useState();
  const[eventTypeFetched,setEventTypeFetched]=useState();
  const[eventStatus,setEventStatus]=useState("")
  const[statusReasonText,setStatusReasonText]=useState("")
  const[manualCustomerCheck,setManualCustomerCheck]=useState(false)
  const[addCustTagVisible,setAddCustTagVisible]=useState(true)
  const[eventDurationType,setEventDurationType]=useState("customedatetime")
  const[searchTeamArr,setSearchTeamArr]=useState([])
  const[searchTeamObject,setSearchTeamObject]=useState()
  const[teamArr,setTeamArr]=useState([]);
  const[teamHelperArr,setTeamHelperArr]=useState([]);
  const[teamTagVisible,setTeamTagVisible]=useState(false);
  const[teamOnClickVal,setTeamOnClickVal]=useState()
  const[searchTeamText,setSearchTeamText]=useState("");
  const[teamOnClickCheck,setTeamOnClickCheck]=useState(false)

  // axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/fetch_appointments/60c2fdb39c78a32644d0cf63?teamdata=0&filter=${month}&category=past
  // `,{
  //   // params:{
  //   //   teamdata:"0",
  //   //   filter: "09/2021",
  //   //   category:"upcoming"
  //   // }
  // })
  // .then((res)=>{
  //   console.log(res)
  // })
  // .catch((err)=>{
  //   console.log(err)
  // },[])

  // axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/fetch_appointments/60c2fdb39c78a32644d0cf63?teamdata=0&filter=${month}&category=upcoming
  // `,{
  //   // params:{
  //   //   teamdata:"0",
  //   //   filter: "09/2021",
  //   //   category:"upcoming"
  //   // }
  // })
  // .then((res)=>{
  //   console.log(res.data)
  //  setFetchEventCheck(true)
  //   setFetchUpcomingArr(res.data)
  // })
  // .catch((err)=>{
  //   console.log(err)
  // },[])
  const[fetchEventArray,setFetchEventArray]=useState([])
  const[fetchEventObject,setFetchEventObject]=useState()
  const[editStartTime,setEditStartTime]=useState("");
  const[editStartDisp,setEditStartDisp]=useState("");
  const[editEndDisp,setEditEndDisp]=useState("");
  const[editEndTime,setEditEndTime]=useState("");

  // useEffect(()=>{
  //   testArr[0].errMsg.map((item)=>{
  //     setAddEvents(addEvents=>[...addEvents,{
  //       id:item._id,
  //       start:parseInt(item.start_date)+parseInt(item.start_time),
  //       end:parseInt(item.end_date)+parseInt(item.end_time),
  //     }])
  //      })
  // },[testArr])

  useEffect(()=>{

    axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/fetch_appointments/616e908c43ed727bbac8d2d4?teamdata=0&filter=${month}&category=upcoming `)
    .then((res)=>{
      console.log(res.data.errMsg)
      setFetchEventCheck(true)
      setFetchUpcomingArr(res.data.errMsg)
  res.data.errMsg.map((item)=>{
    setFetchEventArray(fetchEvents=>[...fetchEvents,{
      // id:item._id,
      // start_date:parseInt(item.start_date),
      // start_time:parseInt(item.start_time),
      // end_date:parseInt(item.end_date),
      // end_time:parseInt(item.end_time),
      // durationType: item.durationType,
      // manuallyrenewalCustomer:[{
      //   Name:item.manuallyrenewalCustomer.Name,
      //   MobileNumber:item.manuallyrenewalCustomer.MobileNumber
      // }]

      advisorName: item.advisorName,
      appointment_type: item.appointment_type,
      clientVisit: item.clientVisit,
      
      customerId: item.customerId,
      durationType: item.durationType,
      start_date:parseInt(item.start_date),
      start_time:parseInt(item.start_time),
      end_date:parseInt(item.end_date),
      end_time:parseInt(item.end_time),
      
      event_name: item.event_name,
      event_repeat_on_every: item.event_repeat_on_every,
      event_repeat_till_date: item.event_repeat_till_date,
      event_type: item.event_type,
      isLeadFailed: item.isLeadFailed,
      leadId: item.leadId!==null||undefined? {_id: item.leadId._id, lead_Id: item.leadId.lead_id, firstName: item.leadId.firstName, lastName: item.leadId.lastName}:"",
      manuallycustomerAdded: item.manuallycustomerAdded,
      // manuallyrenewalCustomer: item.manuallyrenewalCustomer,
      manuallyrenewalCustomer:item.manuallyrenewalCustomer!==0?item.manuallycustomerAdded:[],
      partnerId: item.partnerId,
      partnerId: item.partnerId!==null||undefined? {_id: item.partnerId._id, partnerId: item.partnerId.partnerId, partnerName: item.partnerId.partnerName, contactNo: item.partnerId.partnerName}:"",
      
      reminder_prority_color: item.reminder_prority_color,
      set_reminder: item.set_reminder,
      showComment: item.showComment,
      
      statusReason: item.statusReason,
      statusType: item.statusType,
      tata_appointment_type: item.tata_appointment_type,
      teamMember: [],
      teamMember_clone: [],
      userId: item.userId,
      id: item._id,

    }])
  })
  //     testArr[0].errMsg.map((item)=>{
  // setAddEvents(addEvents=>[...addEvents,
  // {
  //   id:item._id,
  //   start:item.start_date+item.start_time,
  //   end:item.end_date+item.end_time,
  // }
  // ])
  //     })

  res.data.errMsg.map((item)=>{
    setAddEvents(addEvents=>[
        ...addEvents,{
            id:item._id,
            title:item.leadId!==null||undefined?item.event_type+" with "+item.leadId.firstName:
            item.partnerId!==null||undefined?item.event_type+" with "+item.partnerId.partnerName:
            item.manuallyrenewalCustomer!==null||undefined?item.event_type+" with "+item.manuallyrenewalCustomer[0].Name:"",
            start:parseInt(item.start_date)+parseInt(item.start_time),
            end:parseInt(item.end_date)+parseInt(item.end_time),
            
          }])
  })

  res.data.errMsg.map((item)=>{
  if(item.leadId._id==item.leadId._id){
    console.log(item.leadId.firstName)
  }
  })
      // res.data.errMsg.map((item)=>{
      //   setAddEvents([...addEvents,{
      // id:item._id,
      //     start:item.start_date+item.start_time,
      // end:item.end_date+item.end_time,
      //   }])
      // })
  
  //  res.data.errMsg.map((item)=>{
  //       return(
  //         setAddEvents([...addEvents, {

  //           id: item._id,
  //           title: 'test 7',
  //           description: "This is the description of the event",
      
  //           start: item.start_date+item.start_time,
  //           end: item.end_date+item.end_time
          
          
  //         }])   

  //       )
  //     })
  console.log(res.data.errMsg)

  // res.data.errMsg.map((item)=>{
  //   return(
  //     setAddEvents([...addEvents, {

    
  //      id:item._id,
  //   start:item.start_date+item.start_time,
  //   end:item.end_date+item.end_time

  //       // start: item.start_date+item.start_time,
  //       // end: item.end_date+item.end_time
      
      
  //     }])   

  //   )
    
  // })
  // res.data.errMsg.map((item)=>{
  //   return(
  //   console.log(item)
  //     // setAddEvents([...addEvents, 
  
  //   //   {
    
  //   //   // {res.data.errMsg.map(()=>{})}
  //   //        id:item._id,
  //   //     start:item.start_date+item.start_time,
  //   //     end:item.end_date+item.end_time
      
  //   //         // start: item.start_date+item.start_time,
  //   //         // end: item.end_date+item.end_time
          
          
  //   //       }])) 
  //   )

  // })




    })
    .catch((err)=>{
      console.log(err.msg)
    })


    axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/fetch_appointments/616e908c43ed727bbac8d2d4?teamdata=0&filter=${month}&category=past `)
    .then((res)=>{
      console.log(res.data.errMsg)
      setFetchUpcomingArr(res.data.errMsg)
      setFetchEventCheck(true)
      res.data.errMsg.map((item)=>{
        setFetchEventArray(fetchEvents=>[...fetchEvents,{
          advisorName: item.advisorName,
  appointment_type: item.appointment_type,
  clientVisit: item.clientVisit,

  customerId: item.customerId,
  durationType: item.durationType,
  start_date:parseInt(item.start_date),
  start_time:parseInt(item.start_time),
  end_date:parseInt(item.end_date),
  end_time:parseInt(item.end_time),

  event_name: item.event_name,
  event_repeat_on_every: item.event_repeat_on_every,
  event_repeat_till_date: item.event_repeat_till_date,
  event_type: item.event_type,
  isLeadFailed: item.isLeadFailed,
  leadId: item.leadId!==null||undefined? {_id: item.leadId._id, lead_Id: item.leadId.lead_id, firstName: item.leadId.firstName, lastName: item.leadId.lastName}:"",
  manuallycustomerAdded: item.manuallycustomerAdded,
  manuallyrenewalCustomer: item.manuallyrenewalCustomer,
  manuallyrenewalCustomer:item.manuallyrenewalCustomer!==0?item.manuallycustomerAdded:[],
  partnerId: item.partnerId,
  partnerId: item.partnerId!==null||undefined?{_id: item.partnerId._id, partnerId: item.partnerId.partnerId, partnerName: item.partnerId.partnerName, contactNo: item.partnerId.partnerName}:"",

  reminder_prority_color: item.reminder_prority_color,
  set_reminder: item.set_reminder,
  showComment: item.showComment,

  statusReason: item.statusReason,
  statusType: item.statusType,
  tata_appointment_type: item.tata_appointment_type,
  teamMember: [],
  teamMember_clone: [],
  userId: item.userId,
  id: item._id,
          // id:item._id,
          // start_date:parseInt(item.start_date),
          // start_time:parseInt(item.start_time),
          // end_date:parseInt(item.end_date),
          // end_time:parseInt(item.end_time)
        }])
      })
      res.data.errMsg.map((item)=>{
        setAddEvents(addEvents=>[...addEvents,{
                id:item._id,
                title:item.leadId!==null||undefined?item.event_type+" with "+item.leadId.firstName:
                item.partnerId!==null||undefined?item.event_type+" with "+item.partnerId.partnerName:
                item.manuallyrenewalCustomer!==null||undefined?item.event_type+" with "+item.manuallyrenewalCustomer[0].Name:"",
      
      
                start:parseInt(item.start_date)+parseInt(item.start_time),
                end:parseInt(item.end_date)+parseInt(item.end_time),
              }])
      })
    
      // setFetchUpcomingArr(res.data.errMsg)
    })
    .catch((err)=>{
      console.log(err.msg)
    })
  },[eventLoadCheck])

  // console.log(helperUpcomingArr)


  const AdvisorClickedTag=(id,value)=>{
    setAdvisorOnClickVal(value)
    alert(value)

    searchAdvisorArr.map((item)=>{
     if(item._id==id){
       setSearchAdvisorObject(item)
     }
    })
  
  setAdvisorTagVisible(true)
  setAdvisorOnClickCheck(false)
  }
  const AdvisorTagCloseFunc=()=>{
    setAdvisorTagVisible(false)
  }
  const searchAdvisorTextFunc=(e)=>{
  setSearchAdvisorText(e.target.value)
  setAdvisorOnClickCheck(false)
    if(searchAdvisorText==""){
    setAdvisorArr(advisorHelperArr)
    }
  }

  const searchAdvisorFunc=()=>{
    setAdvisorOnClickCheck(true)
    axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/partners?csmId=616e908c43ed727bbac8d2d4&search=${searchAdvisorText}`)
    // axios.get("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      console.log(res.data.errMsg)
    setSearchAdvisorArr(res.data.errMsg)
      if((searchAdvisorText!=="")){ setAdvisorArr(res.data.errMsg.filter((i)=> (Object.values(i)
        .join(" ").toLowerCase().includes(searchAdvisorText.toLowerCase()))))}
        else{
          setAdvisorArr(res.data.errMsg)
        }
    
      setAdvisorHelperArr(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const onChangeTeam = (text,data) => {
    console.log(text,'text------>')
    console.log(data, 'data------>')
    setTeamMemberData(text)
    // console.log('onSelect___text', text);
    // console.log('onSelect___data', data);
    setOwnerCollectn([...ownerCollectn,data])
  };

  const onSelectTeam = (value) => {
    console.log('ON SELECTION ______________', value);
    setTeamMemberData('')
    let _data = [...new Set([...teamMemberChip,value])]
    setTeamMemberChip(_data)
  }

  const removeTeamMember = (data,ind) => {
    console.log('removeTeamMember', data);
    console.log('ownerCollectn=====>>', ownerCollectn);
    let _arrayOwner = ownerCollectn.filter((item,index) => item.value !== data)
    setOwnerCollectn(_arrayOwner)
    let _array = teamMemberChip.filter((item,index) => index !== ind)
    setTeamMemberChip(_array)
  }

  const searchCustomer = (e) => {
  setCustomerOnClickCheck(true)
  axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/customers?csmId=616e908c43ed727bbac8d2d4&search=${searchCustomerText}`)
    // axios.get("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      console.log(res.data.errMsg)
    setSearchCustomerArr(res.data.errMsg)
      if((searchCustomerText!=="")){ setCustomerArr(res.data.errMsg.filter((i)=> (Object.values(i)
        .join(" ").toLowerCase().includes(searchCustomerText.toLowerCase()))))}
        else{
          setCustomerArr(res.data.errMsg)
        }
      // setCustomerArr(res.data.errMsg.filter((i)=> (Object.values(i)
      // .join(" ").toLowerCase().includes(searchCustomerText.toLowerCase()))))
      setCustomerHelperArr(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    // setCustomerArr(customerArr.sort( (a, b) => a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true})))  

    }


  const CustomerClickedTag=(id,value)=>{
    setCustomerOnClickVal(value)
    searchCustomerArr.map((item)=>{
      if(item._id==id){
        setSearchCustomerObject(item)
      }
    })
    setCustomerTagVisible(true)
    setCustomerOnClickVal(false)
  }
  const CustomerTagCloseFunc=()=>{
    setCustomerTagVisible(false)
  }
  const searchCustomerTextFunc=(e)=>{
    setSearchCustomerText(e.target.value)
    setCustomerOnClickCheck(false)
    if(searchCustomerText==""){
    setCustomerArr(customerHelperArr)
    }
  }

  const AddCustomerTag=(value)=>{

  }
  const AddCustomerCloseFunc=()=>{

  }

  const ProspectClickedTag=(id,value)=>{
    setProspectOnClickVal(value)

  searchProspectArr.map((item)=>{
      if(item._id==id){
        setSearchProspectObject(item)
      }
    })
    setProspectTagVisible(true)
    setProspectOnClickCheck(false)
  }
  const ProspectTagCloseFunc=()=>{
    setProspectTagVisible(false)
  }
  const searchProspect = (e) => {
  setProspectOnClickCheck(true)
  axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/prospects?csmId=616e908c43ed727bbac8d2d4&search=${searchProspectText}`)
    // axios.get("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      console.log(res.data.errMsg)
    setSearchProspectArr(res.data.errMsg)
      if((searchProspectText!=="")){ setProspectArr(res.data.errMsg.filter((i)=> (Object.values(i)
        .join(" ").toLowerCase().includes(searchProspectText.toLowerCase()))))}
        else{
          setProspectArr(res.data.errMsg)
        }
      // setCustomerArr(res.data.errMsg.filter((i)=> (Object.values(i)
      // .join(" ").toLowerCase().includes(searchCustomerText.toLowerCase()))))
      setProspectHelperArr(res.data)
    })
    .catch((err)=>{
      console.log(err)
    },[prospectArr])
    // setCustomerArr(customerArr.sort( (a, b) => a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true})))  

    }


    

  const searchProspectTextFunc=(e)=>{
    setSearchProspectText(e.target.value)
    setProspectOnClickCheck(false)
    if(searchProspectText==""){
    setProspectArr(prospectHelperArr)
    }
  }





  const AddManuallyFunc=()=>{
    setAddManuallyButtonCheck(true)
  }

  const CustomerNameFunc = (e) => {

  setCustomerNameText(e.target.value)
  
    if(e.target.value.length > 0){
      setCustomerNameCheck(true)
    }else{
      setCustomerNameCheck(false)
    }
    // if (customerMobileNoText.length < 10) {
    //   setCustomerMobileNoCheck(false)
    //   // alert("this works")
    // }
    
  }
  const CustomerMobileNoFunc = (e) => {
    
    // setCustomerMobileNoCheck(true)
      // if (customerNameText == "" ) {
      //   setCustomerNameCheck(false)
      //   // alert("this works")
      // }

      if(e.target.value.length > 0){
        setCustomerMobileNoCheck(true)
      }
      if(e.target.value.length < 11){
        setCustomerMblValid(false)
        setCustomerMobileNoText(e.target.value)
      }

      if(e.target.value > 0 && e.target.value.length < 10){
        setCustomerMblValid(false)
       
      }else{
        setCustomerMblValid(true)
      }
      
    }
    const ManualCustomerSubmitFunc=(e)=>{
      if(customerMobileNoText=="" && customerNameText==""){
        setCustomerMobileNoCheck(false)
        setCustomerNameCheck(false)
      }else if (customerMobileNoText==""){
        setCustomerMobileNoCheck(false)
      }else if (customerNameText=="") {
        setCustomerNameCheck(false)
      }
      else{
  setManualCustomerCheck(true)
  setCustomerMobileNoCheck(true)
  setCustomerNameCheck(true)
  
  // setCustomerMobileNoText("")
  // setCustomerNameText("")
      }
      
    }
    const AddCustomerTagVisibleFunc=()=>{
      setAddCustTagVisible(false)
      setManualCustomerCheck(false)
      setCustomerNameText("")
      setCustomerMobileNoText("")
    }
    
    const ProspectFirstNameFunc = (e) => {
      setProspectFirstNameText(e.target.value)
      setProspectFirstNameCheck(true)
      if (prospectLastNameText == "") {
        setProspectLastNameCheck(false)
        // alert("this works")
      }
      if (prospectEmailAddressText == "") {
        setProspectEmailAddressCheck(false)
      }
      if (prospectMobileNoText == "") {
        setProspectMobileNoCheck(false)
      }
      if(regEmail.test(prospectEmailAddressText) == false) {
        setProspectEmailRegCheck(false)
      }
    
      if(regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false)
      }
    
    }

    const ProspectLastNameFunc = (e) => {
      setProspectLastNameText(e.target.value)
      setProspectLastNameCheck(true)
      if (prospectFirstNameText == "") {
        setProspectFirstNameCheck(false)
      }
      if (prospectEmailAddressText == "") {
        setProspectEmailAddressCheck(false)
      }
      if (prospectMobileNoText == "") {
        setProspectMobileNoCheck(false)
      }
      
      if(regEmail.test(prospectEmailAddressText) == false) {
        setProspectEmailRegCheck(false)
      }
    
      if(regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false)
      }
    

    }
    const ProspectEmailAddressFunc = (e) => {

      // if (reg.test(e.target.value) == false) 
      // {
      //     alert('Invalid Email Address');
      //     // return false;
      // }
      setProspectEmailAddressText(e.target.value)
      setProspectEmailAddressCheck(true)
      if (prospectFirstNameText == "") {
        setProspectFirstNameCheck(false)
      }
      if (prospectLastNameText == "") {
        setProspectLastNameText(false)
      }
      if (prospectMobileNoText == "") {
        setProspectMobileNoCheck(false)
      }
      if(regEmail.test(e.target.value) == true) {
        setProspectEmailRegCheck(true)
      }
      if(regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false)
      }

    }
    const ProspectMobileNoFunc = (e) => {
      setProspectMobileNoText(e.target.value)
      setProspectMobileNoCheck(true)
      if (prospectFirstNameText == "") {
        setProspectFirstNameCheck(false)
      }
      if (prospectLastNameText == "") {
        setProspectLastNameText(false)
      }
      if (prospectEmailAddressText == "") {
        setProspectEmailAddressCheck(false)
      }
      if(regMobile.test(e.target.value) == true) {
        setProspectMobileRegCheck(true)
      }
      if(regEmail.test(prospectEmailAddressText) == false) {
        setProspectEmailRegCheck(false)
      }
    
    }
  const searchTeamTextFunc=(e)=>{
    axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/getTeam?agentCode=616e908c43ed727bbac8d2d4`)
    
    .then((res)=>{
      console.log(res.data.errMsg)
    setSearchTeamArr(res.data.errMsg)
      if(((searchTeamText!=="")&&(searchTeamText.length>=3))){ setTeamArr(res.data.errMsg.filter((i)=> (Object.values(i)
        .join(" ").toLowerCase().includes(searchTeamText.toLowerCase()))))}
        else{
          setTeamArr(res.data.errMsg)
        }

      setTeamHelperArr(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

    setSearchTeamText(e.target.value)
  }
  const TeamTagCloseFunc=()=>{
    setTeamTagVisible(false)
  }
    const StartDateFunc = (date, dateString) => {
      console.log(date)
      console.log(dateString)
      setDurationStartDate(moment(date))
      setDurationEndDate(moment(date))
  let ms_date = new Date(date).setUTCHours(0, 0, 0, 0)

  console.log(ms_date)

      setDurationStartDateOperation(ms_date)
      setDurationEndDateOperation(ms_date)
      console.log("This is Start Date"+ms_date)
      if(durationEndDateOperation<ms_date){
        setDurationStartDateDiffCheck(false)
        console.log("Start Date should we after end date")
        return false
      }
      // setDurationStartDateOperation(dateString,"YYYY-MM-DD")
      // setDurationStartDateCheck(true)
      // alert(moment(date).format("X"))
      // console.log('Selected Time: ', date);
      // console.log('Formatted Selected Time: ', date);
      // console.log(timeList.dispValue)
      // // alert("This is st"+date,"YYYY-MM-DD")
      // if (durationEndDate == "") {

      //   setDurationEndDate(date)
      //   setDurationEndDateOperation(dateString,"YYYY-MM-DD")
      //   setDurationEndDateCheck(true)

      // }
      setDurationDateAlert(false)
    }
    const allDayStartDate = (date, dateString) => {
      console.log(date)
      console.log(dateString)
      setDurationStartDate(moment(date))
  let ms_date = new Date(date).setUTCHours(0, 0, 0, 0)

  console.log(ms_date)

      setDurationStartDateOperation(ms_date)
      console.log("This is Start Date"+ms_date)
      if(durationEndDateOperation<ms_date){
        setDurationStartDateDiffCheck(false)
        console.log("Start Date should we after end date")
        return false
      }
      setDurationDateAlert(false)
    }

    const EndDateFunc = (e,date,dateString) => {
  setDurationEndDate(moment(date))
      let ms_date = new Date(date).setUTCHours(0, 0, 0, 0)

      console.log(ms_date)
      if(durationStartDateOperation>ms_date){
        setDurationEndDateDiffCheck(false)
        console.log("End Date should be after start date")
        return false
      }
          setDurationEndDateOperation(ms_date)
  console.log("This is end Date"+ms_date)


  //     setDurationEndDate(moment(date).format("YYYY-MM-DD"))
  // console.log(moment(date).format("x"))
  //     setDurationEndDateCheck(true)
  //     setDurationEndDateOperation(dateString,"YYYY-MM-DD")
  // // alert(moment(durationEndDate,"YYYY-MM-DD"))
  //     console.log('Selected Time: ', date);
  //     console.log('Formatted Selected Time: ', date);
  //     if (durationStartDate == "") {

  //       setDurationStartDate(moment(date).format("X"))
  //       setDurationStartDateOperation(dateString,"YYYY-MM-DD")
  //       setDurationStartDateCheck(true)

  //     }

      setDurationDateAlert(false)
    }

    const ModeChangeFunc=(e)=>{
      setModeSelect(e.target.value)
    }

    const StartTimeChangeFunc=(e)=>{


      setStartTimeSelect(e.target.value)

      setDurationStartTimeCheck(true)
          console.log("This is the start Time"+e.target.value)
          let parseTime=parseInt(e.target.value)
          setDurationStartTimeOperation(parseTime)
      let timeDiff=e.target.value
      setDurationEndTimeCheck(true)
      setEndTimeSelect((+timeDiff)+(+"3600000"))
      console.log("THis is endTIme"+(+timeDiff)+(+"1800000"))
  if(endTimeSelect==""){
    setEndTimeSelect((+timeDiff)+(+"3600000"))
  console.log("THis is endTIme"+(+timeDiff)+(+"1800000"))
    let parseTimeCondition=parseInt()
    setDurationEndTimeCheck(true)
    let parseTime=parseInt((+timeDiff)+(+"3600000"))
    setDurationEndTimeOperation(parseTime)
  }

  // if(((e.target.value)>=endTimeSelect)&&endTimeSelect!=""){
  //     setDurationStartTimeDiffCheck(false)
  //     console.log("TIme should be less than end time")
  //         }
        
  else{
    setDurationStartTimeDiffCheck(true)
  }

  //     setStartTimeSelect(e.target.value)
  //     setDurationStartTimeCheck(true)
  //     console.log("This is the start Time"+e.target.value)
  //     let parseTime=parseInt(e.target.value)
  //     setDurationStartTimeOperation(parseTime)
  // let timeDiff=e.target.value
  // if(endTimeSelect==""){
  //   setEndTimeSelect((+timeDiff)+(+"3600000"))
  // console.log("THis is endTIme"+(+timeDiff)+(+"1800000"))
  //   let parseTimeCondition=parseInt()
  //   setDurationEndTimeCheck(true)
  //   let parseTime=parseInt((+timeDiff)+(+"3600000"))
  //   setDurationEndTimeOperation(parseTime)
  // }
  // if(((e.target.value)>=endTimeSelect)&&endTimeSelect!=""){
  //   setDurationStartTimeDiffCheck(false)
  //   console.log("TIme should be less than end time")
  //       }
  //       else if(((e.target.value)>=endTimeSelect)){
  //         setDurationStartTimeDiffCheck(false)
  //       }
  //       else{
  //         setDurationStartTimeDiffCheck(true)
  //       }
  // // alert((+timeDiff)+(+"3600000")) 
  //     console.log(e.target.value)
    }
    const EndTimeChangeFunc=(e)=>{
      setEndTimeSelect(e.target.value)
      setDurationEndTimeCheck(true)
      let parseTime=parseInt(e.target.value)
      setDurationEndTimeOperation(parseTime)
      console.log(e.target.value)
      let timeDiff=e.target.value
      if(((e.target.value)==startTimeSelect)&&startTimeSelect!=""){
        setDurationEndTimeSameCheck(false)
  console.log("TIme should not be same as start time")
      }
      else if(((e.target.value)<startTimeSelect)){
  setDurationStartTimeDiffCheck(false)
      }
      else{
        setDurationStartTimeDiffCheck(true)
        setDurationEndTimeSameCheck(true)
      }
      if(((e.target.value)<startTimeSelect)&&startTimeSelect!=""){
        setDurationEndTimeDiffCheck(false)
  console.log("TIme should be more than start time")
      }
      else{
        setDurationEndTimeDiffCheck(true)
      }
      if(startTimeSelect==""){
        setStartTimeSelect((+timeDiff)-(+"36000000"))
        let parseTime=parseInt((+timeDiff)-(+"36000000"))
        
        setDurationStartTimeOperation(parseTime)
        setDurationStartTimeCheck(true)

      }
      
    }
    const StartTimeFunc = (time,timeString) => {
      setDurationStartTime(time)
  setDurationStartTimeOperation(timeString)
  let d=new Date()
  // alert(d)
  // console.log(d.getMonth())

      console.log('Selected Time: ', time);
      console.log('Formatted Selected Time: ', time);
      if(time>durationEndTime){
        setDurationEndTime(moment(time).add(1, 'hours'))
        // setDurationEndTimeOperation(timeString,"HH:mm:ss")

        // setDurationEndTimeOperation(moment(time).add(1, 'hours').format("H:m:ss z"))
      }
      if (durationEndTime == "") {
        setDurationEndTime(moment(time).add(1, 'hours'))
        // setDurationEndTimeOperation(moment(timeString).format("HH:mm:ss.SSSZZ"))
        // alert(timeString.split(""))
        setDurationEndTimeOperation(moment(time).add(1, 'hours').format("HH:mm:ss z"))
      }
      setDurationTimeAlert(false)
    }



    const EndTimeFunc = (time,timeString) => {
    let abc=new Date(time)
    let hours=("0"+abc.getHours()).slice(-2)
    let minutes=("0"+abc.getMinutes()).slice(-2)
    let seconds=("0"+abc.getSeconds()).slice(-2)
    // alert(hours+":"+minutes+":"+seconds)
    let compTime=hours+minutes+seconds;
  // alert(abc.getTime())
  setDurationEndTime(time)

      setDurationEndTimeOperation((moment(time).format("HH:mm:ss")))
          console.log('Selected Time: ', time);
          console.log('Formatted Selected Time: ', time);

          if(time<durationStartTime){
            setDurationStartTime(moment(time).subtract(1, 'hours'))
    
            setDurationStartTimeOperation(moment(timeString).format("HH:mm:ss z"))
          }
          if (durationStartTime == "") {
            setDurationStartTime(moment(time).subtract(1, 'hours'))
          setDurationEndTimeCheck(true)
            setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("HH:mm:ss z"))

            // setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("H:m:ss z"))
            // alert(moment(time).subtract(1, 'hours').format("HH:mm:ss z"))
          }
          setDurationStartTimeCheck(true)
          setDurationTimeAlert(false)
    
    
    
    
    
    
    
    
    
      // setDurationEndTime(moment(time))

      // setDurationEndTimeOperation(timeString,"H:mm:ss")
      //     console.log('Selected Time: ', time);
      //     console.log('Formatted Selected Time: ', time);
      //     if(time<durationStartTime){
      //       setDurationStartTime(moment(time).subtract(1, 'hours'))
      //       setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("T H:mm:ss z"))
      //     }
      // //  if(durationEndTime<time){
      // //   setDurationStartTime(moment(time).subtract(1, 'hours'))
      // //   setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("T H:mm:ss z"))
      // // }
      //     if (durationStartTime == "") {
      //       setDurationStartTime(moment(time).subtract(1, 'hours'))
      //       setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("T H:mm:ss z"))
      //       alert("Start Time "+moment(time).subtract(1, 'hours').format("H:mm:ss z"))
      //     }
      //     setDurationTimeAlert(false)
    }
    const BookAppointmentFunc = async (e) => {
     

      console.log(eventLoadCheck)

      let formdata={
        userId:"616e908c43ed727bbac8d2d4",
        appointment_type:customerCheck?"customer": prospectCheck?"existingapplication":"existingpartner",
        event_type:customerCollection.phone_call_customer||prospectCollection.phone_call||advisorCollection.phone_call_advisor?"phonecall"
          :customerCollection.appointment_customer||advisorCollection.appointment_advisor?"appointment"
          :customerCollection.policy_renewal?"policyrenewals":prospectCollection.training_prospect||advisorCollection.training?"training"
          :null,
        tata_appointment_type:"businesspalnrevie",
      // partnerId:  advisorCheck?{
        
      //     contactNo: searchAdvisorObject.contactNo,
      //     partnerId: searchAdvisorObject.partnerId,
      //     partnerName: searchAdvisorObject.partnerName,
      //     _id: searchAdvisorObject._id,

      // }:"",
        durationType:"customedatetime",
        start_date:durationStartDateOperation,
          start_time:durationStartTimeOperation,
          end_date:durationEndDateOperation,
          end_time:durationEndTimeOperation,
        teamMember:[
          
        ],
        statusType:"open",
        statusreason:statusReasonText,
        manuallycustomerAdded:addManuallyButtonCheck?true:false,
        manuallyrenewalCustomer:addManuallyButtonCheck? [
          {
            Name:customerNameText,
            MobileNumber:customerMobileNoText,
          }
        ]:[],
        clientVisit:"",
        customerId:"",
        teamMember_clone:[
          
        ],
        remarkText : '',
        mode : modeSelect,
        }

        console.log(formdata, 'form data ------->')


      if(updateEventCheck==true){
        
        console.log('Update event--->')
        if(modeSelect == ''){
          message.warning('Mode is Mandatory');
        }else if (durationStartDateOperation == undefined){
          message.warning('Start Date is Mandatory');
        }else if (durationStartTimeOperation == undefined || ''){
          message.warning('Start Time is Mandatory');
        }else if (durationEndDateOperation == undefined || ''){
          message.warning('End Date is Mandatory');
        }else if (durationEndTimeOperation == undefined || ''){
          message.warning('End Time is Mandatory');
        }else{
          setDurationModeAlert(false)
          setDurationDateAlert(false)
          setDurationTimeAlert(false)
          setDurationEndDateAlert(false)
          setDurationEndTimeAlert(false)
          console.log(clientvisit, customerCollection.phone_call_customer, 'cline visit----->')
        let result = await axiosRequest.put('user/updateAppointment', {
          userId: stoageGetter('user').id,
          //userId : '60069a18579be233d2decf04',
          appointment_type:customerCheck?"customer": prospectCheck?"existingapplication":"existingpartner",
          event_type:customerCollection.phone_call_customer||prospectCollection.phone_call||advisorCollection.phone_call_advisor?"phonecall"
            :customerCollection.appointment_customer||advisorCollection.appointment_advisor?"appointment"
            :customerCollection.policy_renewal?"policyrenewals":prospectCollection.training_prospect||advisorCollection.training?"training"
            :null,
          tata_appointment_type: customerCollection.appointment_customer||advisorCollection.appointment_advisor? appointmenttypes
          :"",
          clientVisit : customerCollection.phone_call_customer == true||prospectCollection.phone_call == true ||advisorCollection.phone_call_advisor == true? clientvisit : '',
        // partnerId:  advisorCheck?{
          
        //     contactNo: searchAdvisorObject.contactNo,
        //     partnerId: searchAdvisorObject.partnerId,
        //     partnerName: searchAdvisorObject.partnerName,
        //     _id: searchAdvisorObject._id,
  
        // }:"",
        Appointment_id : Appointmentid,
        leadId: "",
          durationType: eventDurationType,
          start_date:durationStartDateOperation,
            start_time:durationStartTimeOperation,
            end_date:durationEndDateOperation,
            end_time:durationEndTimeOperation,
          teamMember:ownerCollectn,
          statusType:statusType.openStatus==true?"open":"close",
          statusreason:statusReasonText,
          manuallycustomerAdded:addManuallyButtonCheck?true:false,
          manuallyrenewalCustomer:addManuallyButtonCheck? [
            {
              Name:customerNameText,
              MobileNumber:customerMobileNoText,
            }
          ]:[],
          customerId:"",
          teamMember_clone:[
            
          ],
          remarkText : '',
          mode : modeSelect,
          }, { secure: true });

          props.setIsModalVisible(false)
          console.log(result, 'book update appointment result-------->')

          if(result.length !== 0){
            props.api()
            props.getdata(true)
            props.setIsModalVisible(false)
          }


  //     axios.put(`https://sdtatadevlmsv2.iorta.in/auth/user/updateAppointment_v2`,{
      
      
      
  //       // showComment: false,
  //       //       leadId: "",
  //       //       partnerId: "",
  //       //       customerId: "",
  //       //       teamMember_clone: [],
  //       //       statusReason: "sdsd",
  //       //       isLeadFailed: false,
  //       //       Appointment_id: "6156fe9a4735ef7f94293d8c",
  //       //       manuallyrenewalCustomer: [
  //       //           {
  //       //               Name: "sa",
  //       //               MobileNumber: "2"
  //       //           }
  //       //       ],
  //       //       clientVisit: "clientmeeting",
  //       //       teamMember: [],
  //       //       manuallycustomerAdded: "true",
  //       //       statusType: "close",
  //       //       tata_appointment_type: "",
  //       //       durationType: "customedatetime",
  //       //       appointment_type: "customer",
  //       //       start_time_MS: 1633170600000,
  //       //       end_time_MS: 1633174200000,
  //       //       start_time: 37800000,
  //       //       start_date: 1633132800000,
  //       //       userId: "61519f9a8ce8772eab9838cb",
  //       //       end_time: 41400000,
  //       //       end_date: 1633132800000,
  //       //       event_type: "appointment",
  //       //       event_name: "Appointment",
  //       //       event_description: "Singh Dhara will have a client meeting with Sa",
  //       //       // created_date: 1633091226621
      
      
      
      
      
  //     showComment: "false",
  //       leadId: "",
  //       partnerId: "",
  //       customerId: "",
  //       teamMember_clone: [],
  //       statusReason: statusReasonText,
  //       isLeadFailed: false,
  //       Appointment_id: updateEventId, 
  //       manuallyrenewalCustomer: [],
  //       clientVisit: "clientmeeting",
  //       teamMember: [],
  //       manuallycustomerAdded:addManuallyButtonCheck,
  //       statusType: statusType.openStatus==true?"open":"close",
  //       tata_appointment_type: "",
  //       durationType: eventDurationType,
  //       appointment_type: "",
  //       // start_time_MS: 1632315600000,
  //       // end_time_MS: 1632319200000,
  //       start_time: durationStartTimeOperation,
  //       start_date: durationStartDateOperation,
  //       userId: "616e908c43ed727bbac8d2d4",
  //       end_time: durationEndTimeOperation,
  //       end_date: durationEndDateOperation,
  //       event_type: updateEventType,
  //       event_name: "",
  //       event_description: "",
  //       // created_date: 1631962470877,
  //       advisorName: "",
  //       event_repeat_on_every: "",
  //       event_repeat_till_date: "",
  //       reminder_prority_color: "",
  //       set_reminder: "",

        
      
      
      
    
  //     // updated_date: 1631962990266
  
 
 
 
 
 
 
  //     //   _id:"6135e9a3f503954f7e6bba45s", 
  //     // userId:"60a61763de95b87f62856c13",
  //     //     partnerId:"",
  //     //     appointment_type:"customer",
  //     //     event_type:"appointment",
  //     //     start_date:durationStartDateOperation,
  //     //     start_time:durationStartTimeOperation,
  //     //     end_date:durationEndDateOperation,
  //     //     end_time:durationEndTimeOperation,
  //     //     leadId:""
  //       })
  //       .then((res)=>{
  // setEventLoadCheck(true)  
  // setAddEvents([])
  // setFetchEventArray([])
  //         console.log(res.data.errMsg)
  //       }).catch((err)=>{
  //         console.log(err)
  //       })
  
  //       setIsModalVisible(false)
      }
      props.setIsModalVisible(false)
      if (startTimeSelect == "" && durationButton.select_time == true) {
            setDurationStartTimeCheck(false)
            setDurationTimeAlert(true)
      //  alert("This workd")
    
            return false
          }
      if (endTimeSelect == "" && durationButton.select_time == true) {
            setDurationEndTimeCheck(false)
            setDurationTimeAlert(true)
          
    
            return false
          }
          
          console.log(addEvents)
    
          console.log("Start Date:"+durationStartDateOperation,"End Date"+durationEndDateOperation,"Start Time"+durationStartTimeOperation,"End Time"+durationEndTimeOperation)
        
    }
      else{
      
        console.log('book appointment ---->')
        console.log(durationStartDateOperation,'start date value ')
        console.log(durationStartTimeOperation,'start time value ')
        console.log(durationEndDateOperation,'end date value ')
        console.log(durationEndTimeOperation,'end time value ')

        if(modeSelect == ''){
          message.warning('Mode is Mandatory');
        }else if (durationStartDateOperation == undefined){
          message.warning('Start Date is Mandatory');
        }else if (durationStartTimeOperation == undefined || ''){
          message.warning('Start Time is Mandatory');
        }else if (durationEndDateOperation == undefined || ''){
          message.warning('End Date is Mandatory');
        }else if (durationEndTimeOperation == undefined || ''){
          message.warning('End Time is Mandatory');
        }else{
          setDurationModeAlert(false)
          setDurationDateAlert(false)
          setDurationTimeAlert(false)
          setDurationEndDateAlert(false)
          setDurationEndTimeAlert(false)
          console.log(clientvisit, customerCollection.phone_call_customer, 'cline visit----->')
        let result = await axiosRequest.post('user/bookAppointment', {
           userId: stoageGetter('user').id,
         // userId : '60069a18579be233d2decf04',
          appointment_type:customerCheck?"customer": prospectCheck?"existingapplication":"existingpartner",
          event_type:customerCollection.phone_call_customer||prospectCollection.phone_call||advisorCollection.phone_call_advisor?"phonecall"
            :customerCollection.appointment_customer||advisorCollection.appointment_advisor?"appointment"
            :customerCollection.policy_renewal?"policyrenewals":prospectCollection.training_prospect||advisorCollection.training?"training"
            :null,
          tata_appointment_type: customerCollection.appointment_customer||advisorCollection.appointment_advisor? appointmenttypes
          :"",
          clientVisit : customerCollection.phone_call_customer == true||prospectCollection.phone_call == true ||advisorCollection.phone_call_advisor == true? clientvisit : '',
        // partnerId:  advisorCheck?{
          
        //     contactNo: searchAdvisorObject.contactNo,
        //     partnerId: searchAdvisorObject.partnerId,
        //     partnerName: searchAdvisorObject.partnerName,
        //     _id: searchAdvisorObject._id,
  
        // }:"",
          durationType: eventDurationType,
          start_date:durationStartDateOperation,
            start_time:durationStartTimeOperation,
            end_date:durationEndDateOperation,
            end_time:durationEndTimeOperation,
          teamMember:ownerCollectn,
          statusType:statusType.openStatus==true?"open":"close",
          statusreason:statusReasonText,
          manuallycustomerAdded:addManuallyButtonCheck?true:false,
          manuallyrenewalCustomer:addManuallyButtonCheck? [
            {
              Name:customerNameText,
              MobileNumber:customerMobileNoText,
            }
          ]:[],
          customerId:"",
          teamMember_clone:[
            
          ],
          remarkText : '',
          mode : modeSelect,
          }, { secure: true });

          console.log(result, 'book appointment result-------->')

          if(result.length !== 0){
            props.api()
            props.getdata(true)
            props.setIsModalVisible(false)
          }
      
      
    // axios.post("https://sdtatadevlmsv2.iorta.in/auth/user/bookAppointment_v2",{
    //     userId:"616e908c43ed727bbac8d2d4",
    //     appointment_type:customerCheck?"customer": prospectCheck?"existingapplication":"existingpartner",
    //     event_type:customerCollection.phone_call_customer||prospectCollection.phone_call||advisorCollection.phone_call_advisor?"phonecall"
    //       :customerCollection.appointment_customer||advisorCollection.appointment_advisor?"appointment"
    //       :customerCollection.policy_renewal?"policyrenewals":prospectCollection.training_prospect||advisorCollection.training?"training"
    //       :null,
    //     tata_appointment_type:"businesspalnrevie",
    //   partnerId:  advisorCheck?{
        
    //       contactNo: searchAdvisorObject.contactNo,
    //       partnerId: searchAdvisorObject.partnerId,
    //       partnerName: searchAdvisorObject.partnerName,
    //       _id: searchAdvisorObject._id,

    //   }:"",
    //     partnerId:advisorCheck?searchAdvisorObject._id:"",
    //     leadId: prospectCheck? searchProspectObject._id:"", 
    //     durationType:"customedatetime",
    //     start_date:durationStartDateOperation,
    //       start_time:durationStartTimeOperation,
    //       end_date:durationEndDateOperation,
    //       end_time:durationEndTimeOperation,
    //     teamMember:[
          
    //     ],
    //     statusType:"open",
    //     statusreason:statusReasonText,
    //     manuallycustomerAdded:addManuallyButtonCheck?true:false,
    //     manuallyrenewalCustomer:addManuallyButtonCheck? [
    //       {
    //         Name:customerNameText,
    //         MobileNumber:customerMobileNoText,
    //       }
    //     ]:[],
    //     clientVisit:"",
    //     customerId:"",
    //     teamMember_clone:[
          
    //     ],
    //     remarkText : '',
    //     mode : modeSelect,
    
    //     // userId:"616e908c43ed727bbac8d2d4",
    //     //   partnerId:"",
    //     //   appointment_type:customerCheck?"customer": prospectCheck?"existingapplication":"existingpartner",
    //     //   durationType: eventDurationType,
    //     //    partnerId:advisorCheck?searchAdvisorObject._id:"",
    //     //   leadId: prospectCheck? searchProspectObject._id:"", 
      
    //     //   manuallyrenewalCustomer: [
    //     //     {
    //     //         Name: customerNameText,
    //     //         MobileNumber: customerMobileNoText
    //     //     }
    //     // ],
    //     //   event_type:customerCollection.phone_call_customer||prospectCollection.phone_call||advisorCollection.phone_call_advisor?"phonecall"
    //     //   :customerCollection.appointment_customer||advisorCollection.appointment_advisor?"appointment"
    //     //   :customerCollection.policy_renewal?"policyrenewals":prospectCollection.training_prospect||advisorCollection.training?"training"
    //     //   :null,
    //     //   statusType:eventStatus,
    //     //   start_date:durationStartDateOperation,
    //     //   start_time:durationStartTimeOperation,
    //     //   end_date:durationEndDateOperation,
    //     //   end_time:durationEndTimeOperation,
    //     //   event_name:"appointment",
    //     //   event_description:"Test",
    //       // customerCollection.phone_call_customer||prospectCollection.phone_call||advisorCollection.phone_call_advisor?"phonecall"
    //       // :customerCollection.appointment_customer||advisorCollection.appointment_advisor?"appointment"
    //       // :customerCollection.policy_renewal?"policyrenewals":prospectCollection.training_prospect||advisorCollection.training?"training"
    //       // :+" with "+advisorCheck?advisorOnClickVal:prospectCheck?prospectOnClickVal:"",
    //     })
    //     .then((res)=>{
    //       console.log(res)
    //       setAddEvents([])
    //       setFetchEventArray([])
    //       setEventLoadCheck(true)
    //     }).catch((err)=>{
    //       console.log(err)
    //     })
        
      // alert(durationEndTime)
  // axios.post("https://sdtatadevlmsv2.iorta.in/auth/user/bookAppointment_v2",{

  // userId:"60a61763de95b87f62856c13",
  //   partnerId:"",
  // // appointment_type:customerCheck==true?"customer":null,
  //   appointment_type:"advisor",
  // event_type:"appointment",
  //   // event_type:advisorCollection.appointment_advisor==true||customerCollection.appointment_customer==true||
  //   // prospectCollection.appointment_prospect==true?"appointment":advisorCollection.training==true||
  //   // prospectCollection.training_prospect==true
  //   // ?"training":advisorCollection.phone_call_advisor==true||customerCollection.phone_call_customer==true||
  //   // prospectCollection.phone_call==true
  //   // ?"phone call":customerCollection.policy_renewal==true?"policy renewal":null,
  //   start_date:durationStartDateOperation,
  //   start_time:durationStartTimeOperation,
  //   end_date:durationEndDateOperation,
  //   end_time:durationEndTimeOperation
  // })
  // .then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log(err)
  // })

  // setDurationEndDate( moment(durationEndDate).format("YYYY-MM-DD"))
  // setAddEvents([...addEvents, {

  //   title: 'test 7',
  //   description: "This is the description of the event",
  //   // start:1630627200000+32400000,
  //   // end:1630627200000+36000000
  //   // start:1631491200000+32400000,
  //   // end:1631491200000+36000000
  //   start: durationStartDateOperation+durationStartTimeOperation,
  //   end: durationEndDateOperation+durationEndTimeOperation
  //   // start: durationStartDateOperation+durationStartTimeOperation,
  //   // end:durationEndDateOperation+durationEndTimeOperation,
  //   // start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
  //   // end:moment(endDuration).format('YYYY-MM-DD ') + moment(endVal).format("H:mm:ss"),
  //   // allDay:moment(endVal).format("H:mm:ss")>"23:59:59"?true:false

  // }])


  //     if (durationStartDate == "" && durationButton.select_time == true) {
  //       setDurationStartDateCheck(false)
  //       setDurationDateAlert(true)
      
  //       return false
  //     }
  //  if (durationStartDate == "" && durationButton.all_day == true) {
  //       setDurationStartDateCheck(false)
  //       setDurationDateAlert(true)
    
  //       return false
  //     }
  //  if (durationEndDate == "" && durationButton.select_time == true) {
  //       setDurationEndDateCheck(false)
  //       setDurationDateAlert(true)

  //       return false
  //     }
  props.setIsModalVisible(false)
  if (startTimeSelect == "" && durationButton.select_time == true) {
        setDurationStartTimeCheck(false)
        setDurationTimeAlert(true)
  //  alert("This workd")

        return false
      }
  if (endTimeSelect == "" && durationButton.select_time == true) {
        setDurationEndTimeCheck(false)
        setDurationTimeAlert(true)
      

        return false
      }
      
      console.log(addEvents)

      console.log("Start Date:"+durationStartDateOperation,"End Date"+durationEndDateOperation,"Start Time"+durationStartTimeOperation,"End Time"+durationEndTimeOperation)
    }
    }}


    const StatusTypeOpenFunc = () => {
      setEventStatus("open")
      setStatusType({
        openStatus: true,
        closeStatus: false
      })
    }
    const StatusTypeCloseFunc = () => {
      setEventStatus("close")
      setStatusType({
        openStatus: false,
        closeStatus: true
      })
    }
    const StatusTypeReasonFunc=(e)=>{
  console.log(e.target.value) 
  setStatusReasonText(e.target.value)
  }
    const AdvisorTrainingFunc = () => {
      setAdvisorCollection({
        appointment_advisor: false,
        phone_call_advisor: false,
        training: true,
      })


    }
    const AdvisorPhoneCallFunc = () => {
      setAdvisorCollection({

        appointment_advisor: false,
        phone_call_advisor: true,
        training: false,
      })
      setclientVisit('Relationship call')
    }
    const AdvisorAppointmentFunc = () => {
      setAdvisorCollection({
        appointment_advisor: true,
        phone_call_advisor: false,
        training: false,
      })

    }
    const CustomerAppointmentFunc = () => {
      setCustomerCollection({
        appointment_customer: true,
        phone_call_customer: false,
        policy_renewal: false
      })
    }
    const CustomerPhoneCallFunc = () => {
      setCustomerCollection({
        appointment_customer: false,
        phone_call_customer: true,
        policy_renewal: false
      })
      setclientVisit('Relationship call')
    }
    const CustomerPolicyRenewalFunc = () => {
      setCustomerCollection({
        appointment_customer: false,
        phone_call_customer: false,
        policy_renewal: true
      })
    }

    const AppointmentProspectMeetingFunc = () => {

      setProspectCollection({
        appointment_prospect: true,
        first_meeting: true,
        follow_up: false,
        document_collection: false
      })
    }

    const AppointmentProspectFollowUpFunc = () => {
      setProspectCollection({
        appointment_prospect: true,
        first_meeting: false,
        follow_up: true,
        document_collection: false
      })
    }

    const AppointmentProspectDocCollectionFunc = () => {
      setProspectCollection({
        appointment_prospect: true,
        first_meeting: false,
        follow_up: false,
        document_collection: true
      })
    }
    // const AppointmentAdvisorUnitMeetingFunc=()=>{}
    const AppointmentAdvisorUnitMeetingFunc = () => {
      setAdvisorCollection({
        appointment_advisor: true,
        businessPlanning_review: false,
        inactive_agent_reactivation: false,
        unit_meeting: true,
        joint_customer_visit: false,
        servicing: false
      })
      setAppointmentType('Unit Meeting')
    }
    const AppointmentAdvisorServicingFunc = () => {
      setAdvisorCollection({
        appointment_advisor: true,
        businessPlanning_review: false,
        inactive_agent_reactivation: false,
        unit_meeting: false,
        joint_customer_visit: false,
        servicing: true
      })
      setAppointmentType('Servicing')
    }
    const AppointmentAdvisorJoint_Cust_MeetingFunc = () => {
      setAdvisorCollection({
        appointment_advisor: true,
        businessPlanning_review: false,
        inactive_agent_reactivation: false,
        unit_meeting: false,
        joint_customer_visit: true,
        servicing: false
      })
      setAppointmentType('Joint customer Meeting')
    }
    const AppointmentAdvisorBusinessPlanningFunc = () => {
      setAdvisorCollection({
        appointment_advisor: true,
        businessPlanning_review: true,
        inactive_agent_reactivation: false,
        unit_meeting: false,
        joint_customer_visit: false,
        servicing: false
      })
      setAppointmentType('Business Planning & review')
    }

    const AppointmentAdvisorInactiveAgentFunc = () => {
      setAdvisorCollection({
        appointment_advisor: true,
        businessPlanning_review: false,
        inactive_agent_reactivation: true,
        unit_meeting: false,
        joint_customer_visit: false,
        servicing: false
      })
      setAppointmentType('Inactive agent reactivation')
    }

    const onChangeDate = (date, dateString) => {
      console.log(date, dateString);
      setDurationStartDate(moment(date).format("YYYY-MM-DD"))
      setDurationEndDate(moment(date).format("YYYY-MM-DD"))
      
    console.log( moment(date).format("YYYY-MM-DD"))
    }

    const onChangeTime = (time, timeString) => {
      console.log(time, timeString);
    }


    const TeamMemberMeetingFunc = () => {

      setAdvisorCollection({
        appointment_advisor: true,
        phone_call_advisor: false,
        training: false,
      })
      if (prospectCheck == true) {
        setProspectCollection({
          appointment_prospect: true,
          phone_call: false,
          training_prospect: false
        })
      }

    }
    const TeamMemberTrainingFunc = () => {
      setAdvisorCollection({
        appointment_advisor: false,
        phone_call_advisor: false,
        training: true,
      })
      if (prospectCheck == true) {
        setProspectCollection({
          appointment_prospect: false,
          phone_call: true,
          training_prospect: false
        })
      }
    }

    const TeamMemberBusinessPlanning_ReviewFunc = () => {
      setAdvisorCollection({
        businessPlanning_review: true,
        unit_meeting: false,
        joint_customer_visit: false
      })

    }
    const TeamMemberUnitMeetingFunc = () => {
      setAdvisorCollection({
        businessPlanning_review: false,
        unit_meeting: true,
        joint_customer_visit: false
      })

    }
    const TeamMemberJointCustomerVisitFunc = () => {
      setAdvisorCollection({
        businessPlanning_review: false,
        unit_meeting: false,
        joint_customer_visit: true
      })

    }
    const ProspectAppointmentFunc = () => {

      setProspectCollection({
        appointment_prospect: true,
        phone_call: false,
        training_prospect: false
      })


    }
    const ProspectPhoneCallFunc = () => {

      setProspectCollection({
        appointment_prospect: false,
        phone_call: true,
        training_prospect: false
      })
      setclientVisit('Relationship call')

    }
    const ProspectTrainingFunc = () => {

      setProspectCollection({
        appointment_prospect: false,
        phone_call: false,
        training_prospect: true,
      })


    }
    const ProspectFirstMeetingFunc = () => {
      setProspectCollection({
        first_meeting: true,
        follow_up: false,
        document_collection: false
      })
    }
    const ProspectFollowUpFunc = () => {
      setProspectCollection({
        first_meeting: false,
        follow_up: true,
        document_collection: false
      })
    }
    const ProspectDocumentCollectionFunc = () => {
      setProspectCollection({
        first_meeting: false,
        follow_up: false,
        document_collection: true
      })
    }

    const CustomerAppointmentCollectionFunc = () => {
      setCustomerCollection({
        appointment_customer: true,
        phone_call_customer: false,
        policy_renewal: false
      })
    }
    const CustomerPhoneCallCollectionFunc = () => {
      setCustomerCollection({
        appointment_customer: false,
        phone_call_customer: true,
        policy_renewal: false
      })
    }
    const CustomerPolicyRenewalCollectionFunc = () => {
      setCustomerCollection({
        appointment_customer: false,
        phone_call_customer: false,
        policy_renewal: true
      })
    }
    const [dateClick, setDateClick] = useState();
    const [ActivityPageEvent,setActivityPageEvent]=useState(false)
    
    const showModal = (e,date) => {
      console.log('model opens')
      setUpdateCheckEvent(true)
      setDurationStartDate(moment(e.event.start))
      setDurationEndDate(moment(e.event.end))
    // alert(moment(e.event.start).format())
    // alert("This is date "+moment(e.event.end))
    let start_ms_date=new Date(moment(e.event.start)).setUTCHours(0, 0, 0, 0)
    let end_ms_date=new Date(moment(e.event.end)).setUTCHours(0, 0, 0, 0)
    // alert("Start Date"+start_ms_date)
    // alert("End Date"+end_ms_date)
            console.log(fetchEventArray)           
                  
    const greaterThanTen = fetchEventArray.find(element => element.id==e.event.id);
    setFetchEventObject(fetchEventArray.find(element => element.id==e.event.id))
    fetchEventArray.map((item)=>{
      if(item.id==e.event.id){
        setUpdateEventType(item.event_type)
      if(item.statusType=="open") {
        setStatusType({
          openStatus: true,
          closeStatus: false
      })
    }
    else{
      setStatusType({
        openStatus: false,
        closeStatus: true
      })
    }
  console.log(item)
  setAppointmentTypeFetched(item.appointment_type)
  setEventTypeFetched(item.event_type)

  if(item.appointment_type=="customer"){
    setCustomerCheck(true)
    setAdvisorCheck(false)
    setCustomerTagVisible(true)
    setCustomerOnClickVal(item.manuallyrenewalCustomer[0].Name)
    setProspectCheck(false)
    setAddManuallyButtonCheck(true)
  }
  else if(item.appointment_type=="existingapplication"){
    setCustomerCheck(false)
    setAdvisorCheck(false)
    setProspectCheck(true)
    setProspectOnClickVal(item.leadId.firstName)
  
    setProspectTagVisible(true)
  }
  else{
    setCustomerCheck(false)
    setAdvisorCheck(true)
    setProspectCheck(false)
    setAdvisorOnClickVal(item.partnerId.partnerName)
    console.log(item.partnerId)
    setAdvisorTagVisible(true)
  }
  if(item.appointment_type=="existingpartner"){
    setProspectCollection({
      appointment_prospect: false,
      phone_call: false,
      training_prospect: false
    })
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: false,
      policy_renewal: false
    })

    if(item.event_type=="appointment"){

    
    
      setAdvisorCollection({
        appointment_advisor: true,
        phone_call_advisor: false,
        training: false,
      })
    
  }

  else if(item.event_type=="training"){


    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: false,
      training: true,
    })

  }
  else{


    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: true,
      training: false,
    })

  }
  }



  if(item.appointment_type=="existingapplication"){
    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: false,
      training: false,
    })
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: false,
      policy_renewal: false
    })

    if(item.event_type=="phonecall"){
      setProspectCollection({
        appointment_prospect: false,
        phone_call: true,
        training_prospect: false
      })
    }
    if(item.event_type=="training"){
      setProspectCollection({
        appointment_prospect: false,
        phone_call: false,
        training_prospect: true
      })
    }
    if(item.event_type=="appointment"){
      setProspectCollection({
        appointment_prospect: true,
        phone_call: false,
        training_prospect: false
      })
    }
  }
    if(item.appointment_type=="customer"){
      setAdvisorCollection({
        appointment_advisor: false,
        phone_call_advisor: false,
        training: false,
      })
      setProspectCollection({
        appointment_prospect: false,
        phone_call: false,
        training_prospect: false
      })
      if(item.event_type=="appointment"){

          setCustomerCollection({
            appointment_customer: true,
            phone_call_customer: false,
            policy_renewal: false
          })

      }
    else if(item.event_type=="phonecall"){
        setCustomerCollection({
          appointment_customer: false,
          phone_call_customer: true,
          policy_renewal: false
        })
      }
      else{
      setCustomerCollection({
        appointment_customer: false,
        phone_call_customer: false,
        policy_renewal: true
      })
    

    }
  }

  setDurationStartTimeOperation(parseInt(item.start_time))
  setDurationEndTimeOperation(parseInt(item.end_time))
  setEventDurationType(item.durationType)
      timeList.map((time)=>{
        if(time.value==item.start_time){
          setStartTimeSelect(time.value)
        
          
        }
      if(time.value==item.end_time){
        setEndTimeSelect(time.value)

      }
      })
    }
  
  })

  console.log(greaterThanTen)//11
  let start_ms_time=new Date(moment(e.event.start)).setDate(0, 0, 0)
  // alert("This is the start time"+start_ms_time)

      setDurationStartDateOperation(start_ms_date)
      setDurationEndDateOperation(end_ms_date)
      setBookEventCheck(false)
      setUpdateEventId(e.event.id)
      setUpdateCheckEvent(true)
      props.setIsModalVisible(true);
      setEventText(JSON.stringify(e.event.title))
      // alert(e.event.id)

      fetchUpcomingArr.map((item)=>{

  if(item._id==e.event.id){
    // console.log(item)
    // setDurationStartDate(item.start_date)
    // setUpdateStartTime(JSON.stringify(item.start_time))
    // setUpdateEndTime(JSON.stringify(item.end_time))
    // setDurationEndDate(item.end_date)

        // alert("This works"+item._id)
      
      }
      
      //       return(
  // item.id==e.event.id?{
  // setHelperUpcomingArr(item)
  // }:null
  //       )
      })
      console.log("This works"+e.event.start)

    };
    
    // eventClickBtn(showModal);
    // {
    //   isModalComponent ? setActivityPageEvent(true):setActivityPageEvent(false);
    // }
    // {ActivityPageEvent ? showModal() :""
    
    // }
    // isModalComponent(showModal())
    const OnChangeEventText = (e) => {
      setEventText(e.target.value)
    }
    const OnDateClick = (e) => {
      setDateClick(e.target.value)
      // alert(e.target.value)
      props.setIsModalVisible(true)
    }
    const handleOk = (e) => {
      // alert("This is ok " + clickedDate)
      props.setIsModalVisible(false);

      // alert(MultiSelectDate)
      // alert("This is endva;l" + endVal.format("H:mm:ss"))
      // if (MultiSelectDate == true) {
      //   setAddEvents([...addEvents, {

      //     id: Math.random().toString(36).slice(-6), title: eventText,
      //     //  start:moment("2017-08-13T12:34:00Z").format(),
      //     //  end:moment("2017-08-13T13:34:00Z").format()
      //     start: moment(startDuration).format('YYYY-MM-DD') + moment(value).format("T" + "H:mm:ss" + "z"),
      //     end: moment(endDuration).format('YYYY-MM-DD') + moment(endVal).format("T" + "H:mm:ss" + "z"),
      //     // start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
      //     // end:moment(endDuration).format('YYYY-MM-DD ') + moment(endVal).format("H:mm:ss"),
      //     // allDay:moment(endVal).format("H:mm:ss")>"23:59:59"?true:false

      //   }])
      // }
      // else {
      //   setAddEvents([...addEvents, {

      //     id: Math.random().toString(36).slice(-6), title: eventText,
      //     //  date:moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T"+"H:mm:ss"+"Z"),
      //     start: moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T" + "H:mm:ss" + "z"),
      //     end: moment(clickedDate).format('YYYY-MM-DD') + moment(endVal).format("T" + "H:mm:ss" + "z"),
      //     allDay: false
      //   }])

      // }


      // alert(addEvents)

      //   setAddEvents([...addEvents,{

      //       id: Math.random().toString(36).slice(-6), title:eventText,
      //  start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
      //       end:moment(endDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
      //      date:moment(clickedDate).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")
      //     }])
      // setAddEvents([addEvents,{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
      // console.log(e.dateStr)
      // alert(moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("HH:MM"))
    };


    const MultiSelect = (e) => {
      setAddManuallyButtonCheck(false)
      setProspectTagVisible(false)
  setAdvisorTagVisible(false)
  setCustomerTagVisible(false)
  setSearchAdvisorText("")
  setSearchProspectText("")
  setSearchCustomerText("")
  setSearchTeamText("")
  setTeamTagVisible(false)
  setAdvisorCheck(true)
  setProspectCheck(false)
  setCustomerCheck(false)
  setAdvisorCollection({
    appointment_advisor: true,
    phone_call_advisor: false,
    training: false,
    businessPlanning_review:true,
  })
  setProspectCollection({
    appointment_prospect: true,
    first_meeting: true,
    follow_up: false,
    document_collection: false
  })
  setCustomerCollection({
    appointment_customer: true,
    phone_call_customer: false,
    policy_renewal: false
  })
      setStartDuration(e.startStr)
      // alert("This is the end str" + e.endStr)
      setEndDuration(e.endStr)
      props.setIsModalVisible(true)
      setMultiSelectDate(true)
    }

    const handleCancel = () => {
      props.setIsModalVisible(false);
      setDurationStartDateHelper()
    };


  // let EventFetch=fetchEventCheck==true? fetchUpcomingArr.map((item)=>{
  //   return(
  //     setHelperUpcomingArr(item)
  //   )
  // }):null
  // let startDateParse=helperUpcomingArr? JSON.parse(helperUpcomingArr.start_date):null;
  // let startTimeParse=helperUpcomingArr?JSON.parse(helperUpcomingArr.start_time):null;
  // let endDateParse=helperUpcomingArr?JSON.parse(helperUpcomingArr.end_date):null;
  // let endTimeParse=helperUpcomingArr? JSON.parse(helperUpcomingArr.end_time):null
  // let idParse=helperUpcomingArr? JSON.parse(helperUpcomingArr._id):null;
  let start_date_var=helperUpcomingArr? helperUpcomingArr.start_date:null
  let start_date_assign = new Date(start_date_var).setUTCHours(0, 0, 0, 0)
  let end_date_var=helperUpcomingArr? helperUpcomingArr.end_date:null
  let end_date_assign = new Date(end_date_var).setUTCHours(0, 0, 0, 0)
  // console.log(start_date_assign)
  // console.log(end_date_assign)
  // console.log(helperUpcomingArr? helperUpcomingArr.start_date:null)
  // console.log(fetchUpcomingArr)
    
    let events = [{ title: eventText, date: new Date("2021-08-11 10:00:00") },
    { title: "TEst", date: new Date("2021-08-11 10:00:00") }

    ];

    addEvent = [{ title: "Meeting", date: new Date("2021-08-11 10:00:00") },
    { title: "TEst", date: new Date("2021-08-11 10:00:00") }]
    const OnEndTimeChange = (e) => {
      setEndVal(e)
    }
    const OnTimeChange = (val) => {
      setValue(val)
    }
  // console.log("Add evebnt"+addEvents)
    const MultiSelectDateFunc=(e)=>{
      setAddManuallyButtonCheck(false)
      setStartTimeSelect("")
      setEndTimeSelect("")
  setUpdateCheckEvent(false)
  setProspectTagVisible(false)
  setAdvisorTagVisible(false)
  setCustomerTagVisible(false)
  setCustomerNameText("")
  setCustomerMobileNoText("")
  setSearchAdvisorText("")
  setSearchProspectText("")
  setSearchCustomerText("")
  setSearchTeamText("")
  setTeamTagVisible(false)
  setAdvisorCheck(true)
  setProspectCheck(false)
  setCustomerCheck(false)
  setAdvisorCollection({
    appointment_advisor: true,
    phone_call_advisor: false,
    training: false,
    businessPlanning_review:true,
  })
  setProspectCollection({
    appointment_prospect: true,
    first_meeting: true,
    follow_up: false,
    document_collection: false
  })
  setCustomerCollection({
    appointment_customer: true,
    phone_call_customer: false,
    policy_renewal: false
  })
  if(updateEventCheck)
  setBookEventCheck(true)
    setDurationStartDate(moment(e.start))
    setDurationEndDate(moment(e.end).subtract(1, "days"))
    let new_start_date = Date.parse(e.start)
    let start_date = new Date(new_start_date).setUTCHours(0, 0, 0, 0)

    
    setDurationStartDateOperation(start_date)
  // alert(start_date)

    let moment_end_date=moment(e.end).subtract(1, "days")
    let new_end_date = Date.parse(moment_end_date)
    let end_date = new Date(new_end_date).setUTCHours(0, 0, 0, 0)
    setDurationEndDateOperation(end_date)
    // alert(end_date)
      // setDurationStartDate(moment(e.start).format("YYYY-MM-DD"))
      // setDurationStartDateOperation(moment(e.start).format("YYYY-MM-DD"))
      // alert("This is duration Start Date"+durationStartDate)
      // // alert(e.start,dateFormat)
      // setDurationEndDate(moment(e.end).subtract(1, "days").format("YYYY-MM-DD"))
      // setDurationEndDateOperation(moment(e.end).subtract(1, "days").format("YYYY-MM-DD"))
      // alert("This is duration End Date"+durationEndDate)
      props.setIsModalVisible(true)
    }
    const DateClick = (e) => {
      setAddManuallyButtonCheck(false)
    setStartTimeSelect("")
    setEndTimeSelect("")
      // alert(e.dateStr)
      // setDurationStartDate(e.dateStr)
      // setDurationEndDate(e.dateStr)
      // alert("this is the start" + e.startStr)
      // alert("this si the end" + e.endStr)
      // setDurationStartDate(e.date)
      // setDurationEndDate(e.date)
      // let new_date =Date.parse(e.date)
      setBookEventCheck(true)
      setUpdateCheckEvent(false)
      let ms_date = new Date(e.date).setUTCHours(0, 0, 0, 0)
        
    // alert(ms_date)
  // console.log(new_date)
      
  // let ms_date = new Date(e.date).setHours(0, 0, 0, 0)
  // if (typeof e.date === 'string' || e.date instanceof String)
  // {
  //   alert("It is a string")
  // }

  // // it's a string
  // else{
  //   alert("It is not")
  // }
  // it's something else
  // console.log(test_date)
      setDurationStartDate( moment(e.date))
      setDurationEndDate( moment(e.date))

      setDurationStartDateHelper(e.dateStr)
      setDurationStartDateOperation(ms_date)

      setDurationEndDateOperation( ms_date)
      setClickedDate(e.dateStr)
      props.setIsModalVisible(true)
      setMultiSelectDate(false)
      // alert(value)
      // setAddEvents([...addEvents{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
      // setAddEvents([addEvents,{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
    }
    const datecl = () => {
      console.log('it works')
    }
    return (
      <div className="CalendarEvent-main-class">

      <Modal
          className="Calendar-event-modal-header-style"
          title={
            updateEventCheck==true?"Update Event":
           
               <div style={{fontWeight:"bold",fontSize:'16px', }}>{props.click =="UPDATE EVENT"?"UPDATE EVENT":"CREATE EVENT"}</div>
            } visible={props.isModalVisible} onOk={handleOk}
          closable={durationDateAlert == true || durationTimeAlert == true ? false : true}
          onCancel={handleCancel}
          footer={null}
          width="600px"
          bodyStyle={{
            height: "60vh",
            // display:"flex",
            // flexDirection:"column"
            overflowY: "scroll"
  
          }}
        >

          {/* <div
            // className={prospectCollection.first_meeting == true && prospectCheck == true ? "CalendarEvent-Modal-Card-height" : "CalendarEvent-Modal-Card-style"}
        className="CalendarEvent-Modal-Card-style"
        > */}
            <div
              className="CalendarEvent-Modal-Card-content"
            >
              <h4
                className="CalendarEvent-Modal-Card-header-type"
              >Event With</h4>
              <div
                className="CalendarEvent-Modal-Card-button-flex"
              >

                <button
                disabled={updateEventCheck==true?true:false}
                  onClick={checkTeamMemberFunc}
                  className={advisorCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >Producer</button>
                {/* <button
                  disabled={updateEventCheck==true?true:false}
                  onClick={checkProspectFunc}
                  className={prospectCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >Prospect</button> */}

              
                <button
                  disabled={updateEventCheck==true?true:false}
                // updateEventCheck==true?disabled:null
                  onClick={checkCustomerFunc}
                  className={customerCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >Customer</button>
               
              </div>
              <div
                className="CalendarEvent-Modal-Card-vertical-line"
              >

              </div>
              <h4
                className="CalendarEvent-Modal-Card-header-type"
              >Event Type</h4>
              {advisorCheck == true ?
                <div
                  className={advisorCheck == true ? "CalendarEvent-Modal-Card-button-flex-1" : "CalendarEvent-Modal-Card-button-flex"}
                >
                  <button
                    disabled={updateEventCheck==true?true:false}
                    className={advisorCollection.appointment_advisor == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    onClick={AdvisorAppointmentFunc}

                  >Appointment</button>
                  <button
                    disabled={updateEventCheck==true?true:false}
                    className={advisorCollection.phone_call_advisor == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    onClick={AdvisorPhoneCallFunc}
                    style={{marginLeft : 10}}
                  >Phone Call</button>

                  <button
                    disabled={updateEventCheck==true?true:false}
                    onClick={AdvisorTrainingFunc}
                    style={{marginLeft : 10}}
                    className={advisorCollection.training == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  >Training</button>

                </div>
                : prospectCheck == true ?
                  <div
                    className={prospectCheck == true ? "CalendarEvent-Modal-Card-button-flex" : "CalendarEvent-Modal-Card-button-flex"}
                  >
                    <button
                      disabled={updateEventCheck==true?true:false}
                      className={prospectCollection.appointment_prospect == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                      onClick={ProspectAppointmentFunc}

                    >Appointment</button>
                    <button
                      disabled={updateEventCheck==true?true:false}
                      className={prospectCollection.phone_call == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                      onClick={ProspectPhoneCallFunc}
                      style={{marginLeft : 10}}
                    >Phone Call</button>

                    <button
                      disabled={updateEventCheck==true?true:false}
                      onClick={ProspectTrainingFunc}
                      style={{marginLeft : 10}}
                      className={prospectCollection.training_prospect == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    >Training</button>

                  </div>
                  : customerCheck == true ?
                    <div
                      className={customerCheck == true ? "CalendarEvent-Modal-Card-customer-event-button-flex" : "CalendarEvent-Modal-Card-customer-event-button-flex"}
                    >
                      <button
                        disabled={updateEventCheck==true?true:false}
                        className={customerCollection.appointment_customer == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                        onClick={CustomerAppointmentFunc}

                      >Appointment</button>
                      <button
                        disabled={updateEventCheck==true?true:false}
                        className={customerCollection.phone_call_customer == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                        onClick={CustomerPhoneCallFunc}
                        style={{marginLeft : 10}}
                      >Phone Call</button>

                      <button
                        disabled={updateEventCheck==true?true:false}
                        onClick={CustomerPolicyRenewalFunc}
                        style={{marginLeft : 10}}
                        className={customerCollection.policy_renewal == true ? "CalendarEvent-Modal-documentcollection-onclick-button-style" : "CalendarEvent-Modal-Card-documentcollection-static-button-style"}
                      >Policy Renewals</button>

                    </div>
                    : null}
  
              <div
                className="CalendarEvent-Modal-Card-vertical-line"
              >

              </div>
              {
                customerCollection.appointment_customer == true && customerCheck == true?
                <div>
                <h4
                  className="CalendarEvent-Modal-Card-header-type"
                >Client Visit</h4>


                <div
                  className="CalendarEvent-Modal-appointmenttype-button-flex"
                >
                  <button
                    onClick={() => { setclientVisit('Client Meeting')}}
                    className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                  >Client Meeting </button>



                </div>
              </div> : null
              }
              {advisorCollection.appointment_advisor == true && advisorCheck == true ?
                <div>
                  <h4
                    className="CalendarEvent-Modal-Card-header-type"
                  >Appointment Type</h4>
                  <div className="CalendarEvent-Modal-appointmenttype-businessPlanning-button-flex">
                    <button
                      disabled={updateEventCheck==true?true:false}
                      onClick={AppointmentAdvisorBusinessPlanningFunc}
                      className={advisorCollection.businessPlanning_review == true ? "CalendarEvent-Modal-businessPlanning-onclick-button-style cal-mr10-mb10" : "CalendarEvent-Modal-businessPlanning-static-button-style cal-mr10-mb10"}
                    >Business Planning & Review</button>
                  
                    <button
                      disabled={updateEventCheck==true?true:false}
                      onClick={AppointmentAdvisorInactiveAgentFunc}
                     
                      className={advisorCollection.inactive_agent_reactivation == true ? "CalendarEvent-Modal-businessPlanning-onclick-button-style cal-mr10-mb10" : "CalendarEvent-Modal-businessPlanning-static-button-style cal-mr10-mb10"}
                    >Inactive Agent re-activation</button>
                  
                    {/* <div className="unittime-mbl"> */}
                     <button
                     
                      disabled={updateEventCheck==true?true:false}
                      onClick={AppointmentAdvisorUnitMeetingFunc}
                      className={advisorCollection.unit_meeting == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style cal-mr10-mb10" : "CalendarEvent-Modal-Card-eventwith-static-button-style cal-mr10-mb10"}
                    >Unit Meeting</button>
                    {/* </div> */}
                    <button
                      disabled={updateEventCheck==true?true:false}
                      onClick={AppointmentAdvisorJoint_Cust_MeetingFunc}
                      className={advisorCollection.joint_customer_visit == true ? "CalendarEvent-Modal-joint-customer-onclick-button-style cal-mr10-mb10" : "CalendarEvent-Modal-joint-customer-static-button-style cal-mr10-mb10"}
                    >Joint Customer Meeting</button>
                    <button
                      disabled={updateEventCheck==true?true:false}
                      onClick={AppointmentAdvisorServicingFunc}
                      className={advisorCollection.servicing == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style cal-mr10-mb10" : "CalendarEvent-Modal-Card-eventwith-static-button-style cal-mr10-mb10"}
                    >Servicing</button>
               
                  </div>

                  {/* <div
                    className="CalendarEvent-Modal-appointmenttype-button-flex CalendarEvent-Modal-Unit"
                  >
                   
                    


                  </div> */}
                 
                </div>


                : advisorCollection.phone_call_advisor == true && advisorCheck == true ?
                  <div>
                    <h4
                      className="CalendarEvent-Modal-Card-header-type"
                    >Client Visit</h4>


                    <div
                      className="CalendarEvent-Modal-appointmenttype-button-flex"
                    >
                      <button
                        onClick={() => { setclientVisit('Relationship call')}}
                        className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                      >Relationship Call </button>



                    </div>
                  </div>
                  : prospectCollection.phone_call == true && prospectCheck == true ?
                    <div>
                      <h4
                        className="CalendarEvent-Modal-Card-header-type"
                      >Client Visit</h4>


                      <div
                        className="CalendarEvent-Modal-appointmenttype-button-flex"
                      >
                        <button
                          disabled={updateEventCheck==true?true:false}
                          onClick={() => {setclientVisit('Relationship call') }}
                          className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                        >Relationship Call </button>



                      </div>
                    </div>
                    : customerCollection.phone_call_customer == true && customerCheck == true ?
                      <div>
                        <h4
                          className="CalendarEvent-Modal-Card-header-type"
                        >Client Visit</h4>


                        <div
                          className="CalendarEvent-Modal-appointmenttype-button-flex"
                        >
                          <button
                            disabled={updateEventCheck==true?true:false}
                            onClick={() => {setclientVisit('Relationship call')}}
                            className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                          >Relationship Call </button>



                        </div>
                      </div>

                      : prospectCollection.appointment_prospect == true && prospectCheck == true ?
                        <div>
                          <h4
                            className="CalendarEvent-Modal-Card-header-type"
                          >Appointment Type</h4>
                          <div
                            className="CalendarEvent-Modal-appointmenttype-button-flex CalenderEvent-AppFirst-Meeting"
                          >

                            <button
                              disabled={updateEventCheck==true?true:false}
                              onClick={AppointmentProspectMeetingFunc}
                              className={prospectCollection.first_meeting == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                            >First Meeting</button>
                            <button
                              disabled={updateEventCheck==true?true:false}
                              onClick={AppointmentProspectFollowUpFunc}
                              className={prospectCollection.follow_up == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                            >Follow Up</button>
                            <button
                              disabled={updateEventCheck==true?true:false}
                              onClick={AppointmentProspectDocCollectionFunc}
                              className={prospectCollection.document_collection == true ? "CalendarEvent-Modal-documentcollection-onclick-button-style" : "CalendarEvent-Modal-Card-documentcollection-static-button-style"}
                            >Document Collection</button>

                          </div>
                        </div>

                        : null}

  {/* {advisorCheck==true ?
                  <div>
                  
                    <hr style={{
                      width: '100%',
                      backgroundColor: '#d9dbd1',
                      // height: '0.1vw',
                      marginTop: '20px',
                      marginBottom:'20px',
                      opacity: '.2'
                    }}/>
                    <h4
                      className="CalendarEvent-Modal-Card-header-type"
                    >Search Advisor</h4>
                      <div
                        className="CalendarEvent-Modal-Search-flex"
                      >
                        <div
                          className="CalendarEvent-Modal-search-style"
                        >
                          <Search placeholder="Search By Name" onSearch={searchAdvisorFunc}
                          disabled={updateEventCheck?true:false}
                        type="text"
                        value={searchAdvisorText}
                        onChange={searchAdvisorTextFunc}
                            enterButton
                            className="CalendarEvent-Modal-textinput-style"
                          />
                  {advisorOnClickCheck==true?
        <div>
      {advisorArr!==null&&Array.isArray(advisorArr)?
        <div
        className="CalendarEvent-Modal-search-record-style"
        >
        {advisorArr.map((advisor)=>{
          return(
            <div>
            <div
            className="CalendarEvent-Modal-click-record-style"
            onClick={()=>AdvisorClickedTag(advisor._id,advisor.partnerName)}
            >
              <div
              className="CalendarEvent-Modal-Card-searchbox-vertical-line"
              ></div>
              <h4>{advisor.partnerName}</h4>
              </div>
            
              </div>
          )
        })}
        </div>
      :null}
                        
                          </div>
              :null}
                        </div>
                        
                        <Tag
  closable={updateEventCheck?false: true}
            visible={advisorTagVisible}
            onClose={AdvisorTagCloseFunc}
            className="CalendarEvent-Modal-Search-tag-style"
          >
          {advisorOnClickVal}
          </Tag>


                      </div>

                    </div>

            
                : (prospectCollection.phone_call == true || prospectCollection.training_prospect == true || prospectCollection.follow_up == true || prospectCollection.document_collection == true)&&prospectCheck==true ?
                  <div>
                    <div
                      className="CalendarEvent-Modal-Card-vertical-line"
                    >

                    </div>
                    <h4
                      className="CalendarEvent-Modal-Card-header-type"
                    >Search Prospect</h4>

  <div
                        className="CalendarEvent-Modal-Search-flex"
                      >
                        <div
                          className="CalendarEvent-Modal-search-style"
                        >
                          <Search placeholder="Search By Name" onSearch={searchProspect}
                          disabled={updateEventCheck?true:false}
                        type="text"
                        value={searchProspectText}
                        onChange={searchProspectTextFunc}
                            enterButton
                            className="CalendarEvent-Modal-textinput-style"
                          />
                  {prospectOnClickCheck==true?
        <div>
      {prospectArr!==null&&Array.isArray(prospectArr)?
        <div
        className="CalendarEvent-Modal-search-record-style"
        >
        {prospectArr.map((prospect)=>{
          return(
            <div>
            <div
            className="CalendarEvent-Modal-click-record-style"
            onClick={()=>ProspectClickedTag(prospect._id,prospect.firstName)}
            >
              <div
              className="CalendarEvent-Modal-Card-searchbox-vertical-line"
              ></div>
              <h4>{prospect.fullName}</h4>
              </div>
            
              </div>
          )
        })}
        </div>
      :null}
                        
                          </div>
              :null}
                        </div>
                        
                        <Tag
            closable={updateEventCheck?false: true}
            visible={prospectTagVisible}
            onClose={ProspectTagCloseFunc}
            className="CalendarEvent-Modal-Search-tag-style"
          >
          {prospectOnClickVal}
          </Tag>


                      </div>

                    </div>
                  : customerCheck == true ?
                    <div>
                      
                      <h4
                        className="CalendarEvent-Modal-Card-header-type"
                      >Search Customer</h4>


                      <div
                        className="CalendarEvent-Modal-Search-flex"
                      >
                        <div
                          className="CalendarEvent-Modal-search-style"
                        >
                          <Search placeholder="Search By Name" onSearch={searchCustomer}
                          disabled={updateEventCheck?true:false}
                        type="text"
                        value={searchCustomerText}
                        onChange={searchCustomerTextFunc}
                            enterButton
                            className="CalendarEvent-Modal-textinput-style"
                          />
                  {customerOnClickCheck==true?
        <div>
      {customerArr!==null&&Array.isArray(customerArr)?
        <div
        className="CalendarEvent-Modal-search-record-style"
        >
        {customerArr.map((cust)=>{
          return(
            <div>
            <div
            className="CalendarEvent-Modal-click-record-style"
            onClick={()=>CustomerClickedTag(cust._id,cust.custName)}
            >
              <div
              className="CalendarEvent-Modal-Card-searchbox-vertical-line"
              ></div>
              <h4>{cust.custName}</h4>
              </div>
            
              </div>
          )
        })}
        </div>
      :null}
                        
                          </div>
              :null}
                        </div>
                        
                        <Tag
            closable
            visible={customerTagVisible}
            onClose={CustomerTagCloseFunc}
            className="CalendarEvent-Modal-Search-tag-style"
          >
          {customerOnClickVal}
          </Tag>


                      </div>

                    </div> : null} */}
              {/* 
              {customerCheck == true ?
                <div>
                  <div
                    className="CalendarEvent-Modal-Card-vertical-line"
                  >
                  </div>
                  <h4>ljskjdkj</h4>
                </div>
                : null} */}
              {
                prospectCollection.first_meeting == true && prospectCheck == true ?
                  <div>
                    <div
                      className="CalendarEvent-Modal-prospect-meeting-textbox-flex"
                    >
                      <h4
                        className={prospectFirstNameCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Prospect First Name *</h4>
                      <input
                        value={prospectFirstNameText}
                        onChange={ProspectFirstNameFunc}
                        className={prospectFirstNameCheck == false ? "CalendarEvent-Modal-empty-textbox-style" : "CalendarEvent-Modal-textbox-style"}
                        type="text"
                        required
                      />
                      {prospectFirstNameCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}

                    </div>
                    <div
                      className="CalendarEvent-Modal-prospect-meeting-textbox-flex"
                    >
                      <h4
                        className={prospectLastNameCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Prospect Last Name *</h4>
                      <input
                        value={prospectLastNameText}
                        onChange={ProspectLastNameFunc}
                        className={prospectLastNameCheck == false ? "CalendarEvent-Modal-empty-textbox-style" : "CalendarEvent-Modal-textbox-style"}
                        type="text"
                        required
                      />
                      {prospectLastNameCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}

                    </div>
                    <div
                      className="CalendarEvent-Modal-prospect-meeting-textbox-flex"
                    >
                      <h4
                        className={prospectEmailRegCheck==false||prospectEmailAddressCheck == false 
                          ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Email Address *</h4>
                      <input
                        value={prospectEmailAddressText}
                        onChange={ProspectEmailAddressFunc}
                        className={prospectEmailRegCheck==false||prospectEmailAddressCheck == false ? "CalendarEvent-Modal-empty-textbox-style" : "CalendarEvent-Modal-textbox-style"}
                        type="text"
                        required
                      />
                      {prospectEmailAddressCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> :prospectEmailRegCheck==false?<h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">Enter a valid Email</h4>: null}

                    </div>
                    <div
                      className="CalendarEvent-Modal-prospect-meeting-textbox-flex"
                    >
                      <h4
                        className={prospectMobileRegCheck == false||prospectMobileNoCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Primary Phone No *</h4>
                      <input
                        value={prospectMobileNoText}
                        onChange={ProspectMobileNoFunc}
                        className={prospectMobileRegCheck == false||prospectMobileNoCheck == false ? "CalendarEvent-Modal-empty-textbox-style" : "CalendarEvent-Modal-textbox-style"}
                        type="text"
                        required
                      />
                      {prospectMobileNoCheck == false ?
                      <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> 
                      :prospectMobileRegCheck == false?
                      <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">Enter a valid Mobile No</h4> 
                      : null}

                    </div>
                  </div>
                  : null
              }
              {/* <div
  className="CalendarEvent-Modal-appointmenttype-button-flex"
  >
  <button
  className="CalendarEvent-Modal-Card-eventwith-onclick-button-style"
  >First Meeting</button>
  <button
  className="CalendarEvent-Modal-Card-eventwith-static-button-style"
  >Follow Up</button>
  <button
  className="CalendarEvent-Modal-Card-documentcollection-static-button-style"
  >Document Collection</button>


  </div> */}{customerCheck == true ?
                <div>
                  <div
                    className="CalendarEvent-Modal-Card-vertical-line"
                  >
                  </div>

                  <div
                          className="add-manually"
                        >
                  <Button
                    disabled={updateEventCheck==true?true:false}
                      className="CalendarEvent-Modal-Card-Addmanual-button-style"
                      onClick={AddManuallyFunc}
                  type="primary" icon={<PlusCircleOutlined />}>
        Add Manually


      </Button>
      </div>
                  {/* <div
                    className="CalendarEvent-Modal-Card-add-manually-button"
                  >
                    <div
                      className="CalendarEvent-Modal-Card-add-manually-flex"
                  onClick={AddManuallyFunc}
                  >
                      <PlusCircleOutlined
                        className="CalendarEvent-Modal-Card-add-manually-icon-style"
                        style={{ fontSize: '12px', color: 'white', alignSelf: "center" }}
                      />
                      <h4
                        className="CalendarEvent-Modal-Card-add-button-text"
                      >Add Manually</h4>
                    </div> 
                  </div>*/}
                </div>
                : null}
  {customerCheck == true&&addManuallyButtonCheck==true?
  <div>
  <div
                    className="CalendarEvent-Modal-datePicker-button-flex"
                  >
                    <div
                      className="CalendarEvent-Modal-date-column-flex"
                    >
                      <h4
                        className={customerNameCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Name *</h4>
                      <input
                        disabled={manualCustomerCheck==true?true:false}
                        value={customerNameText}
                        onChange={CustomerNameFunc}
                        className={customerNameCheck == false ? "CalendarEvent-Modal-empty-customer-textbox-style" : "CalendarEvent-Modal-customer-textbox-style"}
                        type="text"
                        placeholder="Enter the Name"
                        required
                      />
                      {customerNameCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}
                    </div>
                  
                    <div
                      className="CalendarEvent-Modal-date-column-flex"
                    >
                      <h4
                        className={customerMobileNoCheck  == false || customermblvalid == false  ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Mobile Number *</h4>
                        <input
                        disabled={manualCustomerCheck==true?true:false}
                        // pattern="[1-9]{1}[0-9]{9}"
                        value={customerMobileNoText}
                        onChange={CustomerMobileNoFunc}
                        className={customerMobileNoCheck == false || customermblvalid == false ? "CalendarEvent-Modal-empty-customer-textbox-style" : "CalendarEvent-Modal-customer-textbox-style"}
                        type="number"
                        placeholder="Enter the Mobile Number"
                        required
                      />
                      {customerMobileNoCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}
                      {customermblvalid == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">Enter valid mobile no.</h4> : null}
                    </div>
                
                  </div>
                  <div
                className="CalendarEvent-Modal-Card-add-manual-flex"
              >
               {manualCustomerCheck == false ? <button
                  disabled={updateEventCheck==true?true:false}
                  onClick={ManualCustomerSubmitFunc}
                  className={ "CalendarEvent-Modal-Card-eventwith-onclick-button-style" }
                >Submit</button> : <Tag
                    
                closable={updateEventCheck?false: true}
  visible={addCustTagVisible}
  onClose={AddCustomerTagVisibleFunc}
        
        className="CalendarEvent-Modal-Search-tag-style"
      >
      {customerNameText}
      </Tag>}
                {console.log(manualCustomerCheck,'customer check--->')}
                    {/* {manualCustomerCheck?  :null} */}
            
                </div>
            
  </div>
    
    :null}
            {/* <div
              className="CalendarEvent-Modal-Card-vertical-line"
            >
            </div> */}
            <hr style={{
                      width: '100%',
                      backgroundColor: '#d9dbd1',
                      // height: '0.1vw',
                      marginTop: '20px',
                      marginBottom:'20px',
                      opacity: '.2'
                    }}/>
          
             <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    <h4
                     className="CalendarEvent-Modal-Card-header-type"
                    >Modes *</h4>
                      <div className="Input-date">
                   <select
                   value={modeSelect}
                   onChange={ModeChangeFunc}
                   className="CalendarEvent-Modal-TimePicker-style"
                                  // className="CalendarEvent-Modal-TimePicker-style"
                   > 
              
                     <option value="" >Select</option>
    
               {modeList.map((time)=>{
                 return(
             
                   <option value={time.value}>{time.dispValue}</option>
                  //  <option value={editStartTime} selected>{editStartDisp}</option>
                 )
               })}
                   
                    </select>
                    {/* {durationStartTimeDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Time should be less than end time</p> : null} */}
                    {/* <TimePicker onChange={StartTimeFunc}
                      value={durationStartTime}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                      className="CalendarEvent-Modal-picker-style"
                    /> */}
                    </div>
                  </div>



            <hr style={{
                      width: '100%',
                      backgroundColor: '#d9dbd1',
                      // height: '0.1vw',
                      marginTop: '20px',
                      marginBottom:'20px',
                      opacity: '.2'
                    }}/>
            <h4
              className="CalendarEvent-Modal-Card-header-type"
            >Duration</h4>
            <div
              className="CalendarEvent-Modal-Card-time-duration-flex"
            >
              <button
              
                onClick={DurationSelectTimeFunc}
                value={eventDurationType}
                className={durationButton.select_time == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >Select Time</button><button
                onClick={DurationAllDayFunc}
                value={eventDurationType}
                className={durationButton.all_day == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >All Day</button>

            </div>

            {durationButton.select_time == true ?
              <div>
                <div
                  className="CalendarEvent-Modal-datePicker-button-flex"
                >
                  <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    {console.log(durationStartDate, 'start date--- in code--->')}
                    <h4
              className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      // className="CalendarEvent-Modal-Card-header-type"
                    >Start Date *</h4>
                    <div className="Input-date">
                    <DatePicker onChange={StartDateFunc}
                        allowClear={false}
                       defaultValue={durationStartDate}
                     value={durationStartDate}
                      format="YYYY-MM-DD"
                      className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-empty-picker-style" : "CalendarEvent-Modal-picker-style"}
                      // className="CalendarEvent-Modal-picker-style"
                    />
                  
                   {durationStartDateDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Date should not be after the End date</p> : null}
                   </div>
                  </div>
                  <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    <h4
                     className={durationStartTimeDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      // className="CalendarEvent-Modal-Card-header-type"
                    >Start Time *</h4>
                      <div className="Input-date">
                   <select
                   value={startTimeSelect}
                   onChange={StartTimeChangeFunc}
                   className={durationStartTimeDiffCheck == false ? "CalendarEvent-Modal-empty-TimePicker-style" : "CalendarEvent-Modal-TimePicker-style"}
                                  // className="CalendarEvent-Modal-TimePicker-style"
                   > 
              
                     <option value="" >Select</option>
    
               {timeList.map((time)=>{
                 return(
             
                   <option value={time.value}>{time.dispValue}</option>
                  //  <option value={editStartTime} selected>{editStartDisp}</option>
                 )
               })}
                   
                    </select>
                    {durationStartTimeDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Time should be less than end time</p> : null}
                    {/* <TimePicker onChange={StartTimeFunc}
                      value={durationStartTime}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                      className="CalendarEvent-Modal-picker-style"
                    /> */}
                    </div>
                  </div>

                </div>
                <div
                  className="CalendarEvent-Modal-duration-style"
                >
                  <div
                    className="CalendarEvent-Modal-datePicker-button-flex"
                  >
                    <div
                      className="CalendarEvent-Modal-date-column-flex"
                    >
                      <h4
                       className={durationEndDateDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                        // className="CalendarEvent-Modal-Card-header-type"
                      >End Date *</h4>
                      {console.log(durationEndDate,'end date------>')}
                        <div className="Input-date">
                      <DatePicker onChange={EndDateFunc}
                    allowClear={false}
                        // defaultValue={durationEndDate}
                        format="YYYY-MM-DD"
                        value={durationEndDate}
                        className="CalendarEvent-Modal-picker-style"
                      />
                       {/* {durationEndDateDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Date should not be past from the Start date</p> : null} */}
                   </div>
                    </div>
                    <div
                      className="CalendarEvent-Modal-date-column-flex"
                    >
                      <h4
                       className={durationEndTimeDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                        // className="CalendarEvent-Modal-Card-header-type"
                      >End Time *</h4>
                        <div className="Input-date">
      <select
                    value={endTimeSelect}
                   onChange={EndTimeChangeFunc}
                   
                   className={durationEndTimeDiffCheck == false ? "CalendarEvent-Modal-empty-TimePicker-style" : "CalendarEvent-Modal-TimePicker-style"}
                   > 
                                        <option value="" >Select</option>
                                        {/* {updateEventCheck==true?<option value={editEndTime} selected={true}>{editEndDisp}</option>:null }  */}
               {timeList.map((time)=>{
                 return(
                   <option value={time.value}>{time.dispValue}</option>
                 )
               })}
                   
                    </select>
                    {durationEndTimeDiffCheck == false ?
    
                     <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End time should not be past start time</p>
               
                     :durationEndTimeSameCheck == false ? 
      
                     <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Time should not be Same from the Start Time</p>
                   
                     : null}
                  
                      {/* <TimePicker onChange={EndTimeFunc}
                        value={durationEndTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                        className="CalendarEvent-Modal-picker-style"
                      /> */}
                      </div>
                    </div>

                  </div>

                </div>
              </div> :
              <div>
                <div
                  className="CalendarEvent-Modal-datePicker-button-flex"
                >
                  <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    <h4
                      className="CalendarEvent-Modal-Card-header-type"
                    >Start Date *</h4>
                    <div className="Input-date"> 
                    <DatePicker onChange={allDayStartDate}
                        allowClear={false}
                       defaultValue={durationStartDate}
                       value={durationStartDate}
                      format="YYYY-MM-DD"
                      className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-empty-picker-style" : "CalendarEvent-Modal-picker-style"}
                      // className="CalendarEvent-Modal-picker-style"
                    />
                    </div>
                  </div>

                </div>
              </div>
            }

            <div
              className="CalendarEvent-Modal-Card-vertical-line"
            >
            </div>
            <h4
              className="CalendarEvent-Modal-Card-header-type"
            >Add Team Member</h4>
            <div className='Todo-Create-Search'>
                        {/* <input type='text' placeholder='Search by Name'/> */}
                        {/* <SearchOutlined /> */}
                        {/* <Input addonAfter={<SearchOutlined />} placeholder="Search by Name" /> */}
                        {/* <Search placeholder="Search by Name" onSearch={onSearch}  /> */}
                        <AutoComplete
                          disabled={updateEventCheck==true?true:false}
                          value={teamMemberData}
                          style={{width: '100%'}}
                          options={hierarAgentList}
                          onChange={(text,data)=> onChangeTeam(text,data) }
                          onSelect={onSelectTeam}
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }>
                            <Search  placeholder="Search by Name" />
                          </AutoComplete>
                    </div>
                    {console.log(teamMemberChip,'team member chip----->')}
                    { teamMemberChip?.length !== 0 &&
                        <div style={{display:'flex',flexFlow:'wrap',alignItems:'center'}}>
                          {
                            teamMemberChip?.map((item,index) =>{
                              console.log(item,'item---->')
                              return(
                                <div style={{marginRight:10,marginTop:10,}}>
                                  <Button size="small" type="primary" style={{ backgroundColor: '#00ACC1', border: 'none',display:'flex',alignItems:'center' }} shape="round" >{item.value} <CloseOutlined onClick={() => removeTeamMember(item,index)} /></Button>
                                </div>
                              )
                          })
                          }
                        </div>
                      }
            {/* <div className="CalendarEvent-Modal-Search-flex">
            <Search placeholder="Search By Name" 
            disabled={updateEventCheck?true:false}
           value={searchTeamText}
           onChange={searchTeamTextFunc}
              enterButton
              className="CalendarEvent-Modal-textinput-style"
            />
             {searchTeamText!==""&&searchTeamText.length>=3?
       <div>
     {teamArr!==null&&Array.isArray(teamArr)?
      <div
      className="CalendarEvent-Modal-search-record-style"
      >
      {teamArr.map((team)=>{
        return(
          <div>
          <div
          className="CalendarEvent-Modal-click-record-style"
          onClick={()=>{}}
          >
             <div
            className="CalendarEvent-Modal-Card-searchbox-vertical-line"
            ></div>
            <h4>{team.name}</h4>
            </div>
           
            </div>
        )
      })}
      </div>
     :null}
                      
                        </div>
            :null}
            </div>
                       <Tag
          closable={updateEventCheck?false: true}
          visible={teamTagVisible}
          onClose={TeamTagCloseFunc}
          className="CalendarEvent-Modal-Search-tag-style"
        >
        {teamOnClickVal}
        </Tag> */}
        {console.log(ownerCollectn, 'owner--->')}
            <div
              className="CalendarEvent-Modal-Card-vertical-line"
            >
              </div>
              <h4
                className="CalendarEvent-Modal-Card-header-type"
              >Status</h4>

              <div
                className="CalendarEvent-Modal-Card-status-flex"
              >
                <button
                value={eventStatus}
                  onClick={StatusTypeOpenFunc}
                  className={statusType.openStatus == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >Open</button>
                <button
                 value={eventStatus}
                  onClick={StatusTypeCloseFunc}
                  className={statusType.closeStatus == true ? "CalendarEvent-Modal-Card-status-onclick-button-style" : "CalendarEvent-Modal-Card-status-static-button-style"}
                >Close</button>
              </div>
              {
                statusType.closeStatus == true ?
                  <div
                    className="CalendarEvent-Modal-Card-close-textbox-flex"
                  >
                    <input
                    value={statusReasonText}
                    onChange={StatusTypeReasonFunc}
                      className="CalendarEvent-Modal-Card-close-textbox-style"
                      type="text"
                      placeholder="Enter the reason"
                      style={{padding : 10}}
                    />
                  </div>
                  : null
              }
        

          </div>

        {/* </div> */}
        <div
          className="CalendarEvent-Modal-book-appointment-flex"
        >
          <button
            // onClick={() => { }}
            className={"CalendarEvent-Modal-book-appointment-button-style"}
            onClick={BookAppointmentFunc}
          >{updateEventCheck==true? "Update Appointment":"Book Appointment"}</button>
        </div>
        {/* <Card>
  <h4>jasjkhdsaj</h4>
</Card> */}
        {/* <input type="text" value={eventText} onChange={OnChangeEventText}/>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <TimePicker 
       value={moment(value, format)}
       onChange={OnTimeChange}
      defaultValue={moment('12:00', format)} format={format} />
      <TimePicker 
       value={moment(endVal, format)}
       onChange={OnEndTimeChange}
      defaultValue={moment('12:00', format)} format={format} /> */}
      </Modal>

      {/* <FullCalendar
        height={width<="767"?"100vh":null}
        //  defaultAllDay="false"
        //  selectOverlap={ function(event) {
        // //  alert("Doesnt work"+event.rendering)
        //   // return event.rendering === 'background';
        // }}
        select={MultiSelect}
        // eventOverlap="false"
        // eventOverlap={function(stillEvent, movingEvent) {
        //   return stillEvent.allDay && movingEvent.allDay;
        // }}

        editable="true"
        timeZone='UTC'
        droppable="true"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay"
        }}
        // eventClick={ function(info) {
        //   alert('Event: ' + info.event.start);
        //   alert('Event: ' + info.event.end);
        //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        //   alert('View: ' + info.view.type);
      
        //   // change the border color just for fun
        //   info.el.style.borderColor = 'red';
        // }}
        eventClick={showModal}

        // eventClick={
        //   function(arg){
        //     alert(arg.event.title)
        //     alert(arg.event.start)
        //   }
        // }
        select={ 
          MultiSelectDateFunc
        //   function(info) {
        //   alert('selected ' + info.startStr + ' to ' + info.endStr);
        // }
      }
    
      forceEventDuration="true"
        dateClick={DateClick}
        selectable="true"
        // selectMirror="true"

        // function(arg) {
        // $("#myModal").modal("show");
        // $(".modal-body").html("");
        // $(".modal-body").html("<h3>"+arg.dateStr+"</h3>");

        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        events={addEvents}
      /> */}
 
    </div>
  );
}