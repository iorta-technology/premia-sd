import React, { useEffect, useState } from "react";
import moment from 'moment';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import './CalendarEvent.css';
import { TimePicker, Button, Modal, Card, Input, DatePicker, Alert ,Tag} from 'antd';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PresetStatusColorTypes } from "antd/lib/_util/colors";
import { NavItem } from "react-bootstrap";
import Icon from '@ant-design/icons';

import axios from 'axios';
const { Search } = Input;



let addEvent = [];
export default function CalendarEvent() {
  const format = 'h:mm';
  // useEffect(()=>{
  //  alert(moment("2021-08-10 " ))
  //  alert(moment(value,format))
  // })
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

  const [durationStartDate, setDurationStartDate] = useState("");
  const [durationEndDate, setDurationEndDate] = useState("");
  const [durationStartTime, setDurationStartTime] = useState("");
  const [durationEndTime, setDurationEndTime] = useState("");
  const [durationStartDateCheck, setDurationStartDateCheck] = useState(true)
  const [durationEndDateCheck, setDurationEndDateCheck] = useState(true)
  const [durationStartTimeCheck, setDurationStartTimeCheck] = useState(true);
  const [durationEndTimeCheck, setDurationEndTimeCheck] = useState(true);

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
useEffect(()=>{
  axios.get("https://jsonplaceholder.typicode.com/users")
  .then((res)=>{
    console.log(res.data)
    setCustomerArr(res.data)
    setCustomerHelperArr(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[])
const CustomerClickedTag=(value)=>{
  setCustomerOnClickVal(value)
  setCustomerTagVisible(true)
}
const CustomerTagCloseFunc=()=>{
  setCustomerTagVisible(false)
}




const searchCustomer = (e) => {
setCustomerOnClickCheck(true)
  // setCustomerArr(customerArr.sort( (a, b) => a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true})))  
  if(searchCustomerText!==""){ setCustomerArr(customerArr.filter((i)=> (Object.values(i)
      .join(" ").toLowerCase().includes(searchCustomerText.toLowerCase()))))}
  }

const searchCustomerTextFunc=(e)=>{
  setSearchCustomerText(e.target.value)
  setCustomerOnClickCheck(false)
  if(searchCustomerText==""){
  setCustomerArr(customerHelperArr)
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
  }
  const ProspectEmailAddressFunc = (e) => {
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
  }

  const StartDateFunc = (value, dateString) => {
    setDurationStartDate(moment(value))
    setDurationStartDateCheck(true)
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', value);


    if (durationEndDate == "") {

      setDurationEndDate(value)
      setDurationEndDateCheck(true)

    }
    setDurationDateAlert(false)
  }
  const EndDateFunc = (value) => {
    setDurationEndDate(moment(value))
    setDurationEndDateCheck(true)

    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', value);
    if (durationStartDate == "") {

      setDurationStartDate(value)
      setDurationStartDateCheck(true)

    }
    setDurationDateAlert(false)
  }
  const StartTimeFunc = (time) => {
    setDurationStartTime(moment(time))


    console.log('Selected Time: ', time);
    console.log('Formatted Selected Time: ', time);
    if (durationEndTime == "") {
      // alert("This works")
      setDurationEndTime(moment(time).add(1, 'hours'))

    }
    setDurationTimeAlert(false)
  }
  const EndTimeFunc = (time) => {
    setDurationEndTime(moment(time))


    console.log('Selected Time: ', time);
    console.log('Formatted Selected Time: ', time);
    if (durationStartTime == "") {

      setDurationStartTime(moment(time).subtract(1, 'hours'))

    }
    setDurationTimeAlert(false)
  }
  const BookAppointmentFunc = () => {
    if (durationStartDate == "" && durationButton.select_time == true) {
      setDurationStartDate(false)
      setDurationDateAlert(true)
      return false
    }
    if (durationStartDate == "" && durationButton.all_day == true) {
      setDurationStartDate(false)
      setDurationDateAlert(true)
      return false
    }
    if (durationEndDate == "" && durationButton.select_time == true) {
      setDurationEndDate(false)
      setDurationDateAlert(true)
      return false
    }
    if (durationStartTime == "" && durationButton.select_time == true) {
      setDurationStartTime(false)
      setDurationTimeAlert(true)
      return false
    }
    if (durationEndTime == "" && durationButton.select_time == true) {
      setDurationEndTime(false)
      setDurationTimeAlert(true)
      return false
    }
  }
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
    console.log(date, dateString);
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
  const showModal = (e) => {
    setIsModalVisible(true);
    setEventText(e.event.title)

  };
  const OnChangeEventText = (e) => {
    setEventText(e.target.value)
  }
  const OnDateClick = (e) => {
    setDateClick(e.target.value)
    alert(e.target.value)
    setIsModalVisible(true)
  }
  const handleOk = (e) => {
    alert("This is ok " + clickedDate)
    setIsModalVisible(false);

    alert(MultiSelectDate)
    alert("This is endva;l" + endVal.format("H:mm:ss"))
    if (MultiSelectDate == true) {
      setAddEvents([...addEvents, {

        id: Math.random().toString(36).slice(-6), title: eventText,
        //  start:moment("2017-08-13T12:34:00Z").format(),
        //  end:moment("2017-08-13T13:34:00Z").format()
        start: moment(startDuration).format('YYYY-MM-DD') + moment(value).format("T" + "H:mm:ss" + "z"),
        end: moment(endDuration).format('YYYY-MM-DD') + moment(endVal).format("T" + "H:mm:ss" + "z"),
        // start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
        // end:moment(endDuration).format('YYYY-MM-DD ') + moment(endVal).format("H:mm:ss"),
        // allDay:moment(endVal).format("H:mm:ss")>"23:59:59"?true:false

      }])
    }
    else {
      setAddEvents([...addEvents, {

        id: Math.random().toString(36).slice(-6), title: eventText,
        //  date:moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T"+"H:mm:ss"+"Z"),
        start: moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T" + "H:mm:ss" + "z"),
        end: moment(clickedDate).format('YYYY-MM-DD') + moment(endVal).format("T" + "H:mm:ss" + "z"),
        allDay: false
      }])

    }


    alert(addEvents)

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
    alert("This is the end str" + e.endStr)
    setEndDuration(e.endStr)
    setIsModalVisible(true)
    setMultiSelectDate(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [addEvents, setAddEvents] = useState([{
    title: eventText, start: "2021-08-11T12:00:00",
    end: "2021-08-11T15:00:00Z"
  },
  {
    id: Math.random().toString(36).slice(-6),
    title: 'my event',
    description: "This is the description of the event",
    start: "2021-08-11T12:00:00",
    end: "2021-08-12T15:00:00"
  }
    , {
    id: Math.random().toString(36).slice(-6),
    title: 'test',
    description: "This is the description of the event",
    start: "2021-08-11T11:00:00",
    end: "2021-08-12T15:00:00"
  }
  ])
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
  const DateClick = (e) => {
    alert(e.dateStr)
    alert("this is the start" + e.startStr)
    alert("this si the end" + e.endStr)
    setClickedDate(e.dateStr)
    setIsModalVisible(true)
    setMultiSelectDate(false)
    alert(value)
    // setAddEvents([...addEvents,{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
    // setAddEvents([addEvents,{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
  }
  const datecl = () => {
    console.log('it works')
  }
  return (
    <div className="CalendarEvent-main-class">

      <Modal
        className="Calendar-event-modal-header-style"
        title={durationTimeAlert == true ?
          <Alert message="Start Time is Mandatory" type="warning"
            closable

          />
          :
          durationDateAlert == true ?
            <Alert message="Start Date is Mandatory" type="warning"
              closable
              onClose={() => {
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
                onClick={checkTeamMemberFunc}
                className={advisorCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >Advisor</button>
              <button
                onClick={checkProspectFunc}
                className={prospectCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >Prospect</button>


              <button
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
                  className={advisorCollection.appointment_advisor == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  onClick={AdvisorAppointmentFunc}

                >Appointment</button>
                <button
                  className={advisorCollection.phone_call_advisor == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  onClick={AdvisorPhoneCallFunc}
                >Phone Call</button>

                <button
                  onClick={AdvisorTrainingFunc}
                  className={advisorCollection.training == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >Training</button>

              </div>
              : prospectCheck == true ?
                <div
                  className={prospectCheck == true ? "CalendarEvent-Modal-Card-button-flex" : "CalendarEvent-Modal-Card-button-flex"}
                >
                  <button
                    className={prospectCollection.appointment_prospect == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    onClick={ProspectAppointmentFunc}

                  >Appointment</button>
                  <button
                    className={prospectCollection.phone_call == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    onClick={ProspectPhoneCallFunc}
                  >Phone Call</button>

                  <button
                    onClick={ProspectTrainingFunc}
                    className={prospectCollection.training_prospect == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  >Training</button>

                </div>
                : customerCheck == true ?
                  <div
                    className={customerCheck == true ? "CalendarEvent-Modal-Card-button-flex" : "CalendarEvent-Modal-Card-button-flex"}
                  >
                    <button
                      className={customerCollection.appointment_customer == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                      onClick={CustomerAppointmentFunc}

                    >Appointment</button>
                    <button
                      className={customerCollection.phone_call_customer == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                      onClick={CustomerPhoneCallFunc}
                    >Phone Call</button>

                    <button
                      onClick={CustomerPolicyRenewalFunc}
                      className={customerCollection.policy_renewal == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
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
                    onClick={AppointmentAdvisorBusinessPlanningFunc}
                    className={advisorCollection.businessPlanning_review == true ? "CalendarEvent-Modal-businessPlanning-onclick-button-style" : "CalendarEvent-Modal-businessPlanning-static-button-style "}
                  >Business Planning & Review</button>
                  <button
                    onClick={AppointmentAdvisorInactiveAgentFunc}
                    className={advisorCollection.inactive_agent_reactivation == true ? "CalendarEvent-Modal-businessPlanning-onclick-button-style" : "CalendarEvent-Modal-businessPlanning-static-button-style "}
                  >Inactive Agent re-activation</button>
                </div>

                <div
                  className="CalendarEvent-Modal-appointmenttype-button-flex"
                >
                  <button
                    onClick={AppointmentAdvisorUnitMeetingFunc}
                    className={advisorCollection.unit_meeting == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  >Unit Meeting</button>
                  <button
                    onClick={AppointmentAdvisorJoint_Cust_MeetingFunc}
                    className={advisorCollection.joint_customer_visit == true ? "CalendarEvent-Modal-joint-customer-onclick-button-style" : "CalendarEvent-Modal-joint-customer-static-button-style"}
                  >Joint Customer Meeting</button>
                  <button
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
                            onClick={AppointmentProspectMeetingFunc}
                            className={prospectCollection.first_meeting == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                          >First Meeting</button>
                          <button
                            onClick={AppointmentProspectFollowUpFunc}
                            className={prospectCollection.follow_up == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                          >Follow Up</button>
                          <button
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
                    className="CalendarEvent-Modal-appointmenttype-button-flex"
                  >
                    <Search placeholder="Search By Name" onSearch={() => { }}
                      enterButton
                      className="CalendarEvent-Modal-textinput-style"
                    />




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
                      className="CalendarEvent-Modal-appointmenttype-button-flex"
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
                        <div
                        className="CalendarEvent-Modal-search-record-style"
                        >
                        {customerArr.map((cust)=>{
                          return(
                            <div>
                            <div
                            className="CalendarEvent-Modal-click-record-style"
                            onClick={()=>CustomerClickedTag(cust.username)}
                            >
                              <h4>{cust.username}</h4>
                              </div>
                              <div
                              className="CalendarEvent-Modal-Card-vertical-line"
                              ></div>
                              </div>
                          )
                        })}
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
                      className={prospectEmailAddressCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                    >Email Address *</h4>
                    <input
                      value={prospectEmailAddressText}
                      onChange={ProspectEmailAddressFunc}
                      className={prospectEmailAddressCheck == false ? "CalendarEvent-Modal-empty-textbox-style" : "CalendarEvent-Modal-textbox-style"}
                      type="text"
                      required
                    />
                    {prospectEmailAddressCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}

                  </div>
                  <div
                    className="CalendarEvent-Modal-prospect-meeting-textbox-flex"
                  >
                    <h4
                      className={prospectMobileNoCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                    >Primary Phone No *</h4>
                    <input
                      value={prospectMobileNoText}
                      onChange={ProspectMobileNoFunc}
                      className={prospectMobileNoCheck == false ? "CalendarEvent-Modal-empty-textbox-style" : "CalendarEvent-Modal-textbox-style"}
                      type="text"
                      required
                    />
                    {prospectMobileNoCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}

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
                </div>
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
                      className="CalendarEvent-Modal-Card-header-type"
                    >Start Date *</h4>
                    <DatePicker onChange={StartDateFunc}
                      value={durationStartDate}
                      className="CalendarEvent-Modal-picker-style"
                    />
                  </div>
                  <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    <h4
                      className="CalendarEvent-Modal-Card-header-type"
                    >Start Time *</h4>
                    <TimePicker onChange={StartTimeFunc}
                      value={durationStartTime}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                      className="CalendarEvent-Modal-picker-style"
                    />
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
                        className="CalendarEvent-Modal-Card-header-type"
                      >End Date *</h4>
                      <DatePicker onChange={EndDateFunc}
                        value={durationEndDate}
                        className="CalendarEvent-Modal-picker-style"
                      />
                    </div>
                    <div
                      className="CalendarEvent-Modal-date-column-flex"
                    >
                      <h4
                        className="CalendarEvent-Modal-Card-header-type"
                      >End Time *</h4>
                      <TimePicker onChange={EndTimeFunc}
                        value={durationEndTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                        className="CalendarEvent-Modal-picker-style"
                      />
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
          >Book Appointment</button>
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
        eventClick={showModal}
        // eventClick={
        //   function(arg){
        //     alert(arg.event.title)
        //     alert(arg.event.start)
        //   }
        // }


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