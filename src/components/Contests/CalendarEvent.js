import React,{useEffect, useState} from "react";
import moment from 'moment';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import './CalendarEvent.css';
import {TimePicker,Button,Modal,Card} from 'antd';



let addEvent=[];
export default function CalendarEvent() {
  const format = 'h:mm';
  // useEffect(()=>{
  //  alert(moment("2021-08-10 " ))
  //  alert(moment(value,format))
  // })
  const[advisorCheck,setAdvisorCheck]=useState(true)
  const[prospectCheck,setProspectCheck]=useState(false)
  const[customerCheck,setCustomerCheck]=useState(false)
 
const[advisorCollection,setAdvisorCollection]=useState({
  appointment_advisor:true,
  phone_call_advisor:false,
  training:false,
  businessPlanning_review:true,
  unit_meeting:false,
  joint_customer_visit:false,
  servicing:false,
  inactive_agent_reactivation:false

})

const[prospectCollection,setProspectCollection]=useState({
  appointment_prospect:true,
  phone_call:false,
  training_prospect:false,
  first_meeting:true,
  follow_up:false,
  document_collection:false
})
const[customerCollection,setCustomerCollection]=useState({
appointment_customer:true,
phone_call_customer:false,
policy_renewal:false
})

const[prospectAppointment,setProspectAppointment]=useState(true)
const[prospectPhoneCall,setProspectPhoneCall]=useState(false)
const[prospectTraining,setProspectTraining]=useState(false)
  const[startDuration,setStartDuration]=useState();
  const[endDuration,setEndDuration]=useState();
  const[MultiSelectDate,setMultiSelectDate]=useState(false)
  const[clickedDate,setClickedDate]=useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const[eventText,setEventText]=useState("");
  const [value, setValue] = useState(moment('10:00',format));
  const[endVal,setEndVal]=useState(moment('10:00',format));

const checkTeamMemberFunc=()=>{
  setAdvisorCheck(true)
  setProspectCheck(false)
  setCustomerCheck(false)
}
const checkProspectFunc=()=>{
  setAdvisorCheck(false)
  setProspectCheck(true)
  setCustomerCheck(false)
}

const checkCustomerFunc=()=>{
  setAdvisorCheck(false)
  setProspectCheck(false)
  setCustomerCheck(true)
}
const AdvisorTrainingFunc=()=>{
  setAdvisorCollection({
    appointment_advisor:false,
    phone_call_advisor:false,
    training:true,
  })
}
const AdvisorPhoneCallFunc=()=>{
  setAdvisorCollection({
    appointment_advisor:false,
    phone_call_advisor:true,
    training:false,
  })
}
const AdvisorAppointmentFunc=()=>{
  setAdvisorCollection({
    appointment_advisor:true,
    phone_call_advisor:false,
    training:false,
  })

}
const CustomerAppointmentFunc=()=>{
  setCustomerCollection({
    appointment_customer:true,
    phone_call_customer:false,
    policy_renewal:false
  })
}
const CustomerPhoneCallFunc=()=>{
  setCustomerCollection({
    appointment_customer:false,
    phone_call_customer:true,
    policy_renewal:false
  })
}
const CustomerPolicyRenewalFunc=()=>{
  setCustomerCollection({
    appointment_customer:false,
    phone_call_customer:false,
    policy_renewal:true
  })
}


const TeamMemberMeetingFunc=()=>{

setAdvisorCollection({
  appointment_advisor:true,
  phone_call_advisor:false,
  training:false,
})
if(prospectCheck==true){
  setProspectCollection({
    appointment_prospect:true,
    phone_call:false,
    training_prospect:false
  })
}

}
const TeamMemberTrainingFunc=()=>{
  setAdvisorCollection({
    appointment_advisor:false,
  phone_call_advisor:false,
  training:true,
  })
  if(prospectCheck==true){
    setProspectCollection({
      appointment_prospect:false,
      phone_call:true,
      training_prospect:false
    })
  }
}

const TeamMemberBusinessPlanning_ReviewFunc=()=>{
  setAdvisorCollection({
   businessPlanning_review:true,
   unit_meeting:false,
   joint_customer_visit:false
  })
 
}
const TeamMemberUnitMeetingFunc=()=>{
  setAdvisorCollection({
   businessPlanning_review:false,
   unit_meeting:true,
   joint_customer_visit:false
  })
 
}
const TeamMemberJointCustomerVisitFunc=()=>{
  setAdvisorCollection({
   businessPlanning_review:false,
   unit_meeting:false,
   joint_customer_visit:true
  })
 
}
const ProspectAppointmentFunc=()=>{

setProspectCollection({
  appointment_prospect:true,
  phone_call:false,
  training_prospect:false
})

  
  }
const ProspectPhoneCallFunc=()=>{

  setProspectCollection({
    appointment_prospect:false,
    phone_call:true,
    training_prospect:false
  })

  
}
const ProspectTrainingFunc=()=>{

  setProspectCollection({
    appointment_prospect:false,
    phone_call:false,
    training_prospect:true,
  })

  
}
const ProspectFirstMeetingFunc=()=>{
  setProspectCollection({
    first_meeting:true,
    follow_up:false,
    document_collection:false
  })
}
const ProspectFollowUpFunc=()=>{
  setProspectCollection({
    first_meeting:false,
    follow_up:true,
    document_collection:false
  })
}
const ProspectDocumentCollectionFunc=()=>{
  setProspectCollection({
    first_meeting:false,
    follow_up:false,
    document_collection:true
  })
}

const CustomerAppointmentCollectionFunc=()=>{
  setCustomerCollection({
    appointment_customer:true,
    phone_call_customer:false,
    policy_renewal:false
  })
}
const CustomerPhoneCallCollectionFunc=()=>{
  setCustomerCollection({
    appointment_customer:false,
    phone_call_customer:true,
    policy_renewal:false
  })
}
const CustomerPolicyRenewalCollectionFunc=()=>{
  setCustomerCollection({
    appointment_customer:false,
    phone_call_customer:false,
    policy_renewal:true
  })
}
const[dateClick,setDateClick]=useState();
  const showModal = (e) => {
    setIsModalVisible(true);
    setEventText(e.event.title)

  };
  const OnChangeEventText=(e)=>{
setEventText(e.target.value)
  }
const OnDateClick=(e)=>{
  setDateClick(e.target.value)
  alert(e.target.value)
  setIsModalVisible(true)
}
  const handleOk = (e) => {
    alert("This is ok "+clickedDate)
    setIsModalVisible(false);
  
    alert(MultiSelectDate)
    alert("This is endva;l"+endVal.format("H:mm:ss"))
 if(MultiSelectDate==true){
  setAddEvents([...addEvents,{
     
    id: Math.random().toString(36).slice(-6), title:eventText,
  //  start:moment("2017-08-13T12:34:00Z").format(),
  //  end:moment("2017-08-13T13:34:00Z").format()
  start:moment(startDuration).format('YYYY-MM-DD') + moment(value).format("T"+"H:mm:ss"+"z"),
  end:moment(endDuration).format('YYYY-MM-DD') + moment(endVal).format("T"+"H:mm:ss"+"z"),
    // start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
    // end:moment(endDuration).format('YYYY-MM-DD ') + moment(endVal).format("H:mm:ss"),
    // allDay:moment(endVal).format("H:mm:ss")>"23:59:59"?true:false
  
  }])
 }
 else{
  setAddEvents([...addEvents,{
     
          id: Math.random().toString(36).slice(-6), title:eventText,
        //  date:moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T"+"H:mm:ss"+"Z"),
            start:moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T"+"H:mm:ss"+"z"),
            end:moment(clickedDate).format('YYYY-MM-DD') + moment(endVal).format("T"+"H:mm:ss"+"z"),
            allDay:false
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


  const MultiSelect=(e)=>{
    setStartDuration(e.startStr)
    alert("This is the end str"+e.endStr)
    setEndDuration(e.endStr)
    setIsModalVisible(true)
    setMultiSelectDate(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  const [addEvents,setAddEvents]=useState([{ title: eventText,start: "2021-08-11T12:00:00",
  end:"2021-08-11T15:00:00Z" },
  {id: Math.random().toString(36).slice(-6),
    title: 'my event',
    description:"This is the description of the event",
    start: "2021-08-11T12:00:00",
    end:"2021-08-12T15:00:00"}
,{id: Math.random().toString(36).slice(-6),
  title: 'test',
  description:"This is the description of the event",
  start: "2021-08-11T11:00:00",
  end:"2021-08-12T15:00:00"}
])
  let events = [{ title: eventText, date:new Date("2021-08-11 10:00:00") },
  { title: "TEst", date:new Date("2021-08-11 10:00:00") }

];

addEvent=[{ title: "Meeting", date:new Date("2021-08-11 10:00:00") },
{ title: "TEst", date:new Date("2021-08-11 10:00:00") }]
const OnEndTimeChange=(e)=>{
  setEndVal(e)
}
const OnTimeChange=(val)=>{
setValue(val)
}
const DateClick=(e)=>{
  alert(e.dateStr)
  alert("this is the start"+e.startStr)
  alert("this si the end"+e.endStr)
  setClickedDate(e.dateStr)
  setIsModalVisible(true)
  setMultiSelectDate(false)
  alert(value)
  // setAddEvents([...addEvents,{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
  // setAddEvents([addEvents,{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
}
  const datecl=()=>{
  console.log('it works')
}
  return (
    <div className="App">
    
      <Modal title="Create Event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
width="600px"
bodyStyle={{
  height:"60vh",
// display:"flex",
// flexDirection:"column"
overflow:"scroll"

}}
      >

<div
className="CalendarEvent-Modal-Card-style"
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
className={advisorCheck==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>Advisor</button>
<button
onClick={checkProspectFunc}
className={prospectCheck==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>Prospect</button>


<button
onClick={checkCustomerFunc}
className={customerCheck==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>Customer</button>
</div>
<div
className="CalendarEvent-Modal-Card-vertical-line"
>

</div>
<h4
className="CalendarEvent-Modal-Card-header-type"
>Event Type</h4>
{advisorCheck==true?
  <div
className={advisorCheck==true?"CalendarEvent-Modal-Card-button-flex":"CalendarEvent-Modal-Card-button-flex"}
>
<button
className={advisorCollection.appointment_advisor==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={AdvisorAppointmentFunc}

>Appointment</button>
<button
className={advisorCollection.phone_call_advisor==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={AdvisorPhoneCallFunc}
>Phone Call</button>

  <button
onClick={AdvisorTrainingFunc}
className={advisorCollection.training==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>Training</button>

</div>
:prospectCheck==true? 
<div
className={prospectCheck==true?"CalendarEvent-Modal-Card-button-flex":"CalendarEvent-Modal-Card-button-flex"}
>
<button
className={prospectCollection.appointment_prospect==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={ProspectAppointmentFunc}

>Appointment</button>
<button
className={prospectCollection.phone_call==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={ProspectPhoneCallFunc}
>Phone Call</button>

  <button
onClick={ProspectTrainingFunc}
className={prospectCollection.training_prospect==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>Training</button>

</div>
:customerCheck==true? 
<div
className={customerCheck==true?"CalendarEvent-Modal-Card-button-flex":"CalendarEvent-Modal-Card-button-flex"}
>
<button
className={customerCollection.appointment_customer==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={CustomerAppointmentFunc}

>Appointment</button>
<button
className={customerCollection.phone_call_customer==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={CustomerPhoneCallFunc}
>Phone Call</button>

  <button
onClick={CustomerPolicyRenewalFunc}
className={customerCollection.policy_renewal==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>Policy Renewals</button>

</div>
:null}
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
<h4
className="CalendarEvent-Modal-Card-header-type"
>Event With</h4>{prospectCollection.appointment_prospect==true?
  <div
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


</div>

:null}
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


</div> */}








</div>

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
      timeZone= 'UTC'
droppable= "true"
         headerToolbar={{
      left:"prev,next,today",
      center:"title",
          right:"dayGridMonth,dayGridWeek,dayGridDay"
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
        plugins={[dayGridPlugin,interactionPlugin]}
        events={addEvents}
      />
    </div>
  );
}