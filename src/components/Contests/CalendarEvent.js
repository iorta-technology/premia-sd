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
  const[teamMemberCheck,setTeamMemberCheck]=useState(true)
  const[prospectCheck,setProspectCheck]=useState(false)
  const[customerCheck,setCustomerCheck]=useState(false)
 
const[teamMemberCollection,setTeamMemberCollection]=useState({
  meeting:true,
  training:false,
  businessPlanning_review:true,
  unit_meeting:false,
  joint_customer_visit:false

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
appointment:true,
phone_call:false,
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
  setTeamMemberCheck(true)
  setProspectCheck(false)
  setCustomerCheck(false)
}
const checkProspectFunc=()=>{
  setTeamMemberCheck(false)
  setProspectCheck(true)
  setCustomerCheck(false)
}

const checkCustomerFunc=()=>{
  setTeamMemberCheck(false)
  setProspectCheck(false)
  setCustomerCheck(true)
}

const TeamMemberMeetingFunc=()=>{

setTeamMemberCollection({
  meeting:true,
  training:false
})

}
const TeamMemberTrainingFunc=()=>{
  setTeamMemberCollection({
    meeting:false,
    training:true
  })

}

const TeamMemberBusinessPlanning_ReviewFunc=()=>{
  setTeamMemberCollection({
   businessPlanning_review:true,
   unit_meeting:false,
   joint_customer_visit:false
  })
 
}
const TeamMemberUnitMeetingFunc=()=>{
  setTeamMemberCollection({
   businessPlanning_review:false,
   unit_meeting:true,
   joint_customer_visit:false
  })
 
}
const TeamMemberJointCustomerVisitFunc=()=>{
  setTeamMemberCollection({
   businessPlanning_review:false,
   unit_meeting:false,
   joint_customer_visit:true
  })
 
}
const ProspectCollectionAppointmentFunc=()=>{

  setProspectAppointment(true)
  setProspectPhoneCall(false)
  setProspectTraining(false)
alert(prospectAppointment)  
  }
const ProspectPhoneCallFunc=()=>{
  setProspectAppointment(false)
  setProspectPhoneCall(true)
  setProspectTraining(false)
  
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
    appointment:true,
    phone_call:false,
    policy_renewal:false
  })
}
const CustomerPhoneCallCollectionFunc=()=>{
  setCustomerCollection({
    appointment:false,
    phone_call:true,
    policy_renewal:false
  })
}
const CustomerPolicyRenewalCollectionFunc=()=>{
  setCustomerCollection({
    appointment:false,
    phone_call:false,
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
className={teamMemberCheck==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>Team Member</button>
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
<div
className={teamMemberCheck==true?"CalendarEvent-teammember-event-type-button-flex":prospectCheck==true?"CalendarEvent-Modal-Card-button-flex":"CalendarEvent-Modal-Card-button-flex"}
>
<button
className={teamMemberCollection.meeting==true||prospectAppointment==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={ProspectCollectionAppointmentFunc}

>{teamMemberCheck==true?"Meeting":"Appointment"}</button>
<button
className={prospectPhoneCall==true||teamMemberCollection.training==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
onClick={ProspectPhoneCallFunc}
>{teamMemberCheck==true?"Training":"Phone Call"}</button>
{prospectCheck==true || customerCheck==true?
  <button
onClick={checkCustomerFunc}
className={prospectCheck==true||customerCheck==true?"CalendarEvent-Modal-Card-eventwith-onclick-button-style":"CalendarEvent-Modal-Card-eventwith-static-button-style"}
>{prospectCheck==true?"Training":customerCheck==true?"Policy Renewals":null}</button>
:null}
</div>
<div
className="CalendarEvent-Modal-Card-vertical-line"
>

</div>
<h4
className="CalendarEvent-Modal-Card-header-type"
>Event With</h4>
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