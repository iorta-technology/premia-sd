import React, { useEffect, useState } from "react";
import moment from 'moment';
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import './CalendarEvent.css';
import { TimePicker, Button, Modal, Card, Input, DatePicker, Alert ,Tag} from 'antd';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PresetStatusColorTypes } from "antd/lib/_util/colors";
import { NavItem } from "react-bootstrap";
import Icon from '@ant-design/icons';


import axios from 'axios';
import { times } from "lodash";
import Form from "antd/lib/form/Form";
const { Search } = Input;

let dateFormat = 'YYYY/MM/DD';

let addEvent = [];
export default function CalendarEvent() {
  
  let{innerWidth:width,innerHeight:height}=window;
  const format = 'h:mm';
  let month=moment().format('MM/YYYY');
  console.log(month)    
  

  const [advisorCheck, setAdvisorCheck] = useState(true)
  const [prospectCheck, setProspectCheck] = useState(false)
  const [customerCheck, setCustomerCheck] = useState(false)
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
  const [status_type, setStatusType] = useState({
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

  const [prospectAppointment, setProspectAppointment] = useState(true)
  const [prospectPhoneCall, setProspectPhoneCall] = useState(false)
  const [prospectTraining, setProspectTraining] = useState(false)
  const [startDuration, setStartDuration] = useState();
  const [endDuration, setEndDuration] = useState();
  const [MultiSelectDate, setMultiSelectDate] = useState(false)
  const [clickedDate, setClickedDate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    setDurationButton({
      select_time: true,
      all_day: false
    })
  }
  const DurationAllDayFunc = () => {
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

const[startTimeSelect,setStartTimeSelect]=useState("")
const[endTimeSelect,setEndTimeSelect]=useState("");
  const [durationDateAlert, setDurationDateAlert] = useState(false)
  const [durationTimeAlert, setDurationTimeAlert] = useState(false)
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
const[customerArr,setCustomerArr]=useState([]);
const[customerHelperArr,setCustomerHelperArr]=useState([]);
const[customerTagVisible,setCustomerTagVisible]=useState(false);
const[customerOnClickVal,setCustomerOnClickVal]=useState()
const[searchCustomerText,setSearchCustomerText]=useState("");
const[customerOnClickCheck,setCustomerOnClickCheck]=useState(false)

const[prospectArr,setProspectArr]=useState([]);
const[prospectHelperArr,setProspectHelperArr]=useState([]);
const[prospectTagVisible,setProspectTagVisible]=useState(false);
const[prospectOnClickVal,setProspectOnClickVal]=useState()
const[searchProspectText,setSearchProspectText]=useState("");
const[prospectOnClickCheck,setProspectOnClickCheck]=useState(false)
const[bookEventCheck,setBookEventCheck]=useState(true)
const[updateEventCheck,setUpdateCheckEvent]=useState(false)
const[updateEventId,setUpdateEventId]=useState()


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
  const[fetchEventObject,setFetchEventObject]=useState()

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
  axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/fetch_appointments/60a61763de95b87f62856c13?teamdata=0&filter=${month}&category=upcoming `)
  .then((res)=>{
    console.log(res.data.errMsg)
    setFetchEventCheck(true)
    setFetchUpcomingArr(res.data.errMsg)

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
          start:parseInt(item.start_date)+parseInt(item.start_time),
          end:parseInt(item.end_date)+parseInt(item.end_time),
        }
      ])
})
console.log(fetchEventObject)
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


  axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/fetch_appointments/60a61763de95b87f62856c13?teamdata=0&filter=${month}&category=past `)
  .then((res)=>{
    console.log(res.data.errMsg)
    setFetchEventCheck(true)
    res.data.errMsg.map((item)=>{
      setAddEvents(addEvents=>[...addEvents,{
              id:item._id,
              start:parseInt(item.start_date)+parseInt(item.start_time),
              end:parseInt(item.end_date)+parseInt(item.end_time),
            }])
    })
    // setFetchUpcomingArr(res.data.errMsg)
  })
  .catch((err)=>{
    console.log(err.msg)
  })
},[])

console.log(helperUpcomingArr)



const CustomerClickedTag=(value)=>{
  setCustomerOnClickVal(value)
  setCustomerTagVisible(true)
  setCustomerOnClickVal(false)
}
const CustomerTagCloseFunc=()=>{
  setCustomerTagVisible(false)
}

const searchCustomer = (e) => {
setCustomerOnClickCheck(true)
axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/partners?csmId=60c2fdb39c78a32644d0cf63&search=${searchCustomerText}`)
  // axios.get("https://jsonplaceholder.typicode.com/users")
  .then((res)=>{
    console.log(res.data.errMsg)
   
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
const searchCustomerTextFunc=(e)=>{
  setSearchCustomerText(e.target.value)
  setCustomerOnClickCheck(false)
  if(searchCustomerText==""){
  setCustomerArr(customerHelperArr)
  }
}




const ProspectClickedTag=(value)=>{
  setProspectOnClickVal(value)
  setProspectTagVisible(true)
  setProspectOnClickCheck(false)
}
const ProspectTagCloseFunc=()=>{
  setProspectTagVisible(false)
}
const searchProspect = (e) => {
setProspectOnClickCheck(true)
axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/prospects?csmId=60c2fdb39c78a32644d0cf63&search=${searchProspectText}`)
  // axios.get("https://jsonplaceholder.typicode.com/users")
  .then((res)=>{
    console.log(res.data.errMsg)
   
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
 setCustomerNameCheck(true)
  if (customerMobileNoText == "") {
    setCustomerMobileNoCheck(false)
    // alert("this works")
  }
  
}
const CustomerMobileNoFunc = (e) => {
  setCustomerMobileNoText(e.target.value)
   setCustomerMobileNoCheck(true)
    if (customerNameText == "") {
      setCustomerNameCheck(false)
      // alert("this works")
    }
    
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

  const StartDateFunc = (date, dateString) => {
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

  const StartTimeChangeFunc=(e)=>{
    setStartTimeSelect(e.target.value)
    setDurationStartTimeCheck(true)
    console.log("This is the start Time"+e.target.value)
    let parseTime=parseInt(e.target.value)
    setDurationStartTimeOperation(parseTime)
let timeDiff=e.target.value
if(endTimeSelect==""){
  setEndTimeSelect((+timeDiff)+(+"3600000"))
console.log("THis is endTIme"+(+timeDiff)+(+"1800000"))
  let parseTimeCondition=parseInt()
  setDurationEndTimeCheck(true)
  let parseTime=parseInt((+timeDiff)+(+"3600000"))
  setDurationEndTimeOperation(parseTime)
}
if(((e.target.value)>=endTimeSelect)&&endTimeSelect!=""){
  setDurationStartTimeDiffCheck(false)
  console.log("TIme should be less than end time")
      }
// alert((+timeDiff)+(+"3600000")) 
    console.log(e.target.value)
  }
  const EndTimeChangeFunc=(e)=>{
    setEndTimeSelect(e.target.value)
    setDurationEndTimeCheck(true)
    let parseTime=parseInt(e.target.value)
    setDurationStartTimeOperation(parseTime)
    console.log(e.target.value)
    let timeDiff=e.target.value
    if(((e.target.value)==startTimeSelect)&&startTimeSelect!=""){
      setDurationEndTimeSameCheck(false)
console.log("TIme should not be same as start time")
    }
    else{
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
alert(d)
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
      alert(timeString.split(""))
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
alert(abc.getTime())
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
          alert(moment(time).subtract(1, 'hours').format("HH:mm:ss z"))
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
  const BookAppointmentFunc = () => {
    if(updateEventCheck==true){
     
    axios.put(`https://sdtatadevlmsv2.iorta.in/auth/user/updateAppointment_v2`,{
      Appointment_id:updateEventId, 
    userId:"60a61763de95b87f62856c13",
        partnerId:"",
        appointment_type:"customer",
        event_type:"appointment",
        start_date:durationStartDateOperation,
        start_time:durationStartTimeOperation,
        end_date:durationEndDateOperation,
        end_time:durationEndTimeOperation,
        leadId:""
      })
      .then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
    
    
    
    axios.post("https://sdtatadevlmsv2.iorta.in/auth/user/bookAppointment_v2",{

      userId:"60a61763de95b87f62856c13",
        partnerId:"",
        appointment_type:"customer",
        event_type:"appointment",
        start_date:durationStartDateOperation,
        start_time:durationStartTimeOperation,
        end_date:durationEndDateOperation,
        end_time:durationEndTimeOperation
      })
      .then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
      
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
setAddEvents([...addEvents, {

  title: 'test 7',
  description: "This is the description of the event",
  // start:1630627200000+32400000,
  // end:1630627200000+36000000
  // start:1631491200000+32400000,
  // end:1631491200000+36000000
  start: durationStartDateOperation+durationStartTimeOperation,
  end: durationEndDateOperation+durationEndTimeOperation
  // start: durationStartDateOperation+durationStartTimeOperation,
  // end:durationEndDateOperation+durationEndTimeOperation,
  // start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
  // end:moment(endDuration).format('YYYY-MM-DD ') + moment(endVal).format("H:mm:ss"),
  // allDay:moment(endVal).format("H:mm:ss")>"23:59:59"?true:false

}])


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
setIsModalVisible(false)
if (durationStartTime == "" && durationButton.select_time == true) {
      setDurationStartTimeCheck(false)
      setDurationTimeAlert(true)
 alert("This workd")

      return false
    }
 if (durationEndTime == "" && durationButton.select_time == true) {
      setDurationEndTimeCheck(false)
      setDurationTimeAlert(true)
    

      return false
    }
    
    console.log(addEvents)

    console.log("Start Date:"+durationStartDateOperation,"End Date"+durationEndDateOperation,"Start Time"+durationStartTimeOperation,"End Time"+durationEndTimeOperation)
}}
  const StatusTypeOpenFunc = () => {
    setStatusType({
      openStatus: true,
      closeStatus: false
    })
  }
  const StatusTypeCloseFunc = () => {
    setStatusType({
      openStatus: false,
      closeStatus: true
    })
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
  }

  const onChangeDate = (date, dateString) => {
    // console.log(date, dateString);
    setDurationStartDate(moment(date).format("YYYY-MM-DD"))
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
  const showModal = (e,date) => {
    setDurationStartDate(moment(e.event.start))
    setDurationEndDate(moment(e.event.end))
alert(moment(e.event.start).format())
// alert("This is date "+moment(e.event.end))
let start_ms_date=new Date(moment(e.event.start)).setUTCHours(0, 0, 0, 0)
let end_ms_date=new Date(moment(e.event.end)).setUTCHours(0, 0, 0, 0)
// alert("Start Date"+start_ms_date)
// alert("End Date"+end_ms_date)




    setDurationStartDateOperation(start_ms_date)
    setDurationEndDateOperation(end_ms_date)
    setBookEventCheck(false)
setUpdateEventId(e.event.id)
    setUpdateCheckEvent(true)
    setIsModalVisible(true);
    setEventText(JSON.stringify(e.event.title))
    alert(e.event.id)

    fetchUpcomingArr.map((item)=>{

if(item._id==e.event.id){
  // console.log(item)
  // setDurationStartDate(item.start_date)
  // setUpdateStartTime(JSON.stringify(item.start_time))
  // setUpdateEndTime(JSON.stringify(item.end_time))
  // setDurationEndDate(item.end_date)

      alert("This works"+item._id)}//       return(
// item.id==e.event.id?{
// setHelperUpcomingArr(item)
// }:null
//       )
    })
    console.log("This works"+e.event.start)

  };
  const OnChangeEventText = (e) => {
    setEventText(e.target.value)
  }
  const OnDateClick = (e) => {
    setDateClick(e.target.value)
    // alert(e.target.value)
    setIsModalVisible(true)
  }
  const handleOk = (e) => {
    // alert("This is ok " + clickedDate)
    setIsModalVisible(false);

    alert(MultiSelectDate)
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
    setStartDuration(e.startStr)
    // alert("This is the end str" + e.endStr)
    setEndDuration(e.endStr)
    setIsModalVisible(true)
    setMultiSelectDate(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
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
console.log(start_date_assign)
console.log(end_date_assign)
console.log(helperUpcomingArr? helperUpcomingArr.start_date:null)
console.log(fetchUpcomingArr)
  
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
console.log("Add evebnt"+addEvents)
  const MultiSelectDateFunc=(e)=>{
setUpdateCheckEvent(false)
setBookEventCheck(true)
  setDurationStartDate(moment(e.start))
  setDurationEndDate(moment(e.end).subtract(1, "days"))
  let new_start_date = Date.parse(e.start)
  let start_date = new Date(new_start_date).setUTCHours(0, 0, 0, 0)

  
  setDurationStartDateOperation(start_date)
alert(start_date)

  let moment_end_date=moment(e.end).subtract(1, "days")
   let new_end_date = Date.parse(moment_end_date)
  let end_date = new Date(new_end_date).setUTCHours(0, 0, 0, 0)
  setDurationEndDateOperation(end_date)
  alert(end_date)
    // setDurationStartDate(moment(e.start).format("YYYY-MM-DD"))
    // setDurationStartDateOperation(moment(e.start).format("YYYY-MM-DD"))
    // alert("This is duration Start Date"+durationStartDate)
    // // alert(e.start,dateFormat)
    // setDurationEndDate(moment(e.end).subtract(1, "days").format("YYYY-MM-DD"))
    // setDurationEndDateOperation(moment(e.end).subtract(1, "days").format("YYYY-MM-DD"))
    // alert("This is duration End Date"+durationEndDate)
    setIsModalVisible(true)
  }
  const DateClick = (e) => {
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
      
  alert(ms_date)
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
    setIsModalVisible(true)
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
          durationTimeAlert == true ?
          <Alert message="Start Time is Mandatory" type="warning"
            closable

          />
          :
          durationDateAlert == true ?
            <Alert message="Start Date is Mandatory" type="warning"
              closable
              onClose={() => {
                setUpdateCheckEvent(false)
                setDurationDateAlert(false)
              }}
            />
            : <div>Create Event</div>} visible={isModalVisible} onOk={handleOk}
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

        <div
          // className={prospectCollection.first_meeting == true && prospectCheck == true ? "CalendarEvent-Modal-Card-height" : "CalendarEvent-Modal-Card-style"}
       
       className="CalendarEvent-Modal-Card-style-1"
       >
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
              >Advisor</button>
              <button
                 disabled={updateEventCheck==true?true:false}
                onClick={checkProspectFunc}
                className={prospectCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >Prospect</button>


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
                className={advisorCheck == true ? "CalendarEvent-Modal-Card-button-flex" : "CalendarEvent-Modal-Card-button-flex"}
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
                >Phone Call</button>

                <button
                   disabled={updateEventCheck==true?true:false}
                  onClick={AdvisorTrainingFunc}
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
                  >Phone Call</button>

                  <button
                     disabled={updateEventCheck==true?true:false}
                    onClick={ProspectTrainingFunc}
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
                    >Phone Call</button>

                    <button
                       disabled={updateEventCheck==true?true:false}
                      onClick={CustomerPolicyRenewalFunc}
                      className={customerCollection.policy_renewal == true ? "CalendarEvent-Modal-documentcollection-onclick-button-style" : "CalendarEvent-Modal-Card-documentcollection-static-button-style"}
                    >Policy Renewals</button>

                  </div>
                  : null}
            {/* <div
className={advisorCheck==true||prospectCheck==true?"CalendarEvent-Modal-Card-button-flex":"CalendarEvent-Modal-Card-button-flex"}
>
<button
className={prospectCollection.appointment_prospect==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":advisorCollection.appointment_advisor==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":customerCollection.appointment_customer==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={ProspectCollectionAppointmentFunc}

>Appointment</button>
<button
className={prospectCollection.phone_call==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":advisorCollection.phone_call_advisor==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={ProspectPhoneCallFunc}
>Phone Call</button>

  <button
onClick={ProspectTrainingFunc}
className={prospectCollection.training_prospect==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":advisorCollection.training==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>{advisorCheck==true||prospectCheck==true?"Training":customerCheck==true?"Policy Renewals":null}</button>

</div> */}
            <div
              className="CalendarEvent-Modal-Card-vertical-line"
            >

            </div>
            {advisorCollection.appointment_advisor == true && advisorCheck == true ?
              <div>
                <h4
                  className="CalendarEvent-Modal-Card-header-type"
                >Appointment Type</h4>
                <div
                  className="CalendarEvent-Modal-appointmenttype-businessPlanning-button-flex"
                >
                  <button
                     disabled={updateEventCheck==true?true:false}
                    onClick={AppointmentAdvisorBusinessPlanningFunc}
                    className={advisorCollection.businessPlanning_review == true ? "CalendarEvent-Modal-businessPlanning-onclick-button-style" : "CalendarEvent-Modal-businessPlanning-static-button-style "}
                  >Business Planning & Review</button>
                  <button
                     disabled={updateEventCheck==true?true:false}
                    onClick={AppointmentAdvisorInactiveAgentFunc}
                    className={advisorCollection.inactive_agent_reactivation == true ? "CalendarEvent-Modal-businessPlanning-onclick-button-style" : "CalendarEvent-Modal-businessPlanning-static-button-style "}
                  >Inactive Agent re-activation</button>
                </div>

                <div
                  className="CalendarEvent-Modal-appointmenttype-button-flex"
                >
                  <button
                     disabled={updateEventCheck==true?true:false}
                    onClick={AppointmentAdvisorUnitMeetingFunc}
                    className={advisorCollection.unit_meeting == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  >Unit Meeting</button>
                  <button
                     disabled={updateEventCheck==true?true:false}
                    onClick={AppointmentAdvisorJoint_Cust_MeetingFunc}
                    className={advisorCollection.joint_customer_visit == true ? "CalendarEvent-Modal-joint-customer-onclick-button-style" : "CalendarEvent-Modal-joint-customer-static-button-style"}
                  >Joint Customer Meeting</button>
                  <button
                     disabled={updateEventCheck==true?true:false}
                    onClick={AppointmentAdvisorServicingFunc}
                    className={advisorCollection.servicing == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  >Servicing</button>


                </div>
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
                      onClick={() => { }}
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
                        onClick={() => { }}
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
                          onClick={() => { }}
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
                          className="CalendarEvent-Modal-appointmenttype-button-flex"
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



            {advisorCheck == true ?
              <div>
                <div
                  className="CalendarEvent-Modal-Card-vertical-line"
                >

                </div>
                <h4
                  className="CalendarEvent-Modal-Card-header-type"
                >Search Advisor</h4>


                <div
                  className="CalendarEvent-Modal-appointmenttype-button-flex"
                >
                  <Search placeholder="Search By Name" onSearch={() => { }}
                    enterButton
                    className="CalendarEvent-Modal-textinput-style"
                  />




                </div>
              </div>
              : prospectCollection.phone_call == true || prospectCollection.training_prospect == true || prospectCollection.follow_up == true || prospectCollection.document_collection == true ?
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
          onClick={()=>ProspectClickedTag(prospect.fullName)}
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
          closable
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
                    {/* <div
                      className="CalendarEvent-Modal-Card-vertical-line"
                    >

                    </div> */}
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
          onClick={()=>CustomerClickedTag(cust.partnerName)}
          >
             <div
            className="CalendarEvent-Modal-Card-searchbox-vertical-line"
            ></div>
            <h4>{cust.partnerName}</h4>
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

                  </div> : null}
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
                        className="CalendarEvent-Modal-appointmenttype-button-flex"
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
                      className={customerMobileNoCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                    >Mobile Number *</h4>
                      <input
                      value={customerMobileNoText}
                      onChange={CustomerMobileNoFunc}
                      className={customerMobileNoCheck == false ? "CalendarEvent-Modal-empty-customer-textbox-style" : "CalendarEvent-Modal-customer-textbox-style"}
                      type="text"
                      placeholder="Enter the Mobile Number"
                      required
                    />
                     {customerMobileNoCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}
                  </div>
              
                </div>
                <div
              className="CalendarEvent-Modal-Card-add-manual-flex"
            >
              <button
                 disabled={updateEventCheck==true?true:false}
                onClick={()=>{}}
                className={ "CalendarEvent-Modal-Card-eventwith-onclick-button-style" }
              >Submit</button>
              </div>
</div>
  
  :null}
            <div
              className="CalendarEvent-Modal-Card-vertical-line"
            >
            </div>
            <h4
              className="CalendarEvent-Modal-Card-header-type"
            >Duration</h4>
            <div
              className="CalendarEvent-Modal-Card-time-duration-flex"
            >
              <button
              
                onClick={DurationSelectTimeFunc}
                className={durationButton.select_time == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >Select Time</button><button
                onClick={DurationAllDayFunc}
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
                    <h4
              className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      // className="CalendarEvent-Modal-Card-header-type"
                    >Start Date *</h4>
       
                    <DatePicker onChange={StartDateFunc}
                    defaultValue={'2015/01/01'}
                       value={durationStartDate}
                     
                      format="YYYY-MM-DD"
                      className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-empty-picker-style" : "CalendarEvent-Modal-picker-style"}
                      // className="CalendarEvent-Modal-picker-style"
                    />
                   
                   {durationStartDateDiffCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Date should not be after the End date</h4> : null}
            
                  </div>
                  <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    <h4
                     className={durationStartTimeDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      // className="CalendarEvent-Modal-Card-header-type"
                    >Start Time *</h4>
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
                  //  <option value="30600000">9am</option>
                 )
               })}
                   
                    </select>
                    {durationStartTimeDiffCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Time should be less than end time</h4> : null}
                    {/* <TimePicker onChange={StartTimeFunc}
                      value={durationStartTime}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                      className="CalendarEvent-Modal-picker-style"
                    /> */}
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
                      <DatePicker onChange={EndDateFunc}
                        defaultValue={'2015/01/01'}
                        value={durationEndDate}
                        format="YYYY-MM-DD"
                        className="CalendarEvent-Modal-picker-style"
                      />
                       {durationEndDateDiffCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Date should not be past from the Start date</h4> : null}
                    </div>
                    <div
                      className="CalendarEvent-Modal-date-column-flex"
                    >
                      <h4
                       className={durationEndTimeDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                        // className="CalendarEvent-Modal-Card-header-type"
                      >End Time *</h4>
      <select
                   value={endTimeSelect}
                   onChange={EndTimeChangeFunc}
                   
                   className={durationEndTimeDiffCheck == false ? "CalendarEvent-Modal-empty-TimePicker-style" : "CalendarEvent-Modal-TimePicker-style"}
                   > 
                                        <option value="" >Select</option>
               {timeList.map((time)=>{
                 return(
                   <option value={time.value}>{time.dispValue}</option>
                 )
               })}
                   
                    </select>
                    {durationEndTimeDiffCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Time should not the past from the Start Time</h4> :durationEndTimeSameCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Time should not be the Same from the Start Time</h4>: null}
                  
                      {/* <TimePicker onChange={EndTimeFunc}
                        value={durationEndTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                        className="CalendarEvent-Modal-picker-style"
                      /> */}
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
                                        <DatePicker onChange={onChangeDate}
                      className="CalendarEvent-Modal-picker-style"
                      value={durationStartDate}
                    />
   
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
            <Search placeholder="Search By Name" onSearch={() => { }}
              enterButton
              className="CalendarEvent-Modal-textinput-style"
            />
            <div
              className="CalendarEvent-Modal-Card-vertical-line"
            >
              <h4
                className="CalendarEvent-Modal-Card-header-type"
              >Status</h4>

              <div
                className="CalendarEvent-Modal-Card-status-flex"
              >
                <button
                  onClick={StatusTypeOpenFunc}
                  className={status_type.openStatus == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >Open</button>
                <button
                  onClick={StatusTypeCloseFunc}
                  className={status_type.closeStatus == true ? "CalendarEvent-Modal-Card-status-onclick-button-style" : "CalendarEvent-Modal-Card-status-static-button-style"}
                >Close</button>
              </div>
              {
                status_type.closeStatus == true ?
                  <div
                    className="CalendarEvent-Modal-Card-close-textbox-flex"
                  >
                    <input
                      className="CalendarEvent-Modal-Card-close-textbox-style"
                      type="text"
                      placeholder="Enter the reason"
                      required
                    />
                  </div>
                  : null
              }
            </div>

          </div>

        </div>
        <div
          className="CalendarEvent-Modal-book-appointment-flex"
        >
          <button
            onClick={() => { }}
            className={"CalendarEvent-Modal-book-appointment-button-style"}
            onClick={BookAppointmentFunc}
          >{bookEventCheck==true? "Book Appointment":"Update Appointment"}</button>
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

      <FullCalendar
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
      />
 
    </div>
  );
}