import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import axiosRequest from "../../../axios-request/request.methods";
import moment from "moment";
import header from "../header";
import "./Activity_Tracker.css";
import axios from 'axios';

import { Card, Col, Row, Button, message } from "antd";
import Todo from "../RightSide-Todo/Todo";
import { stoageGetter } from '../../../helpers'
import EventCreateComponent from "../CalendarEvent.js"
import Activity_Header from "./Activity_tracker_header/Header";
import {
	Scheduler,
	WeekView,
	Toolbar,
	DayView,
	DateNavigator,
	Appointments,
	AllDayPanel,
	AppointmentTooltip,
	ExternalViewSwitcher,
	MonthView
} from "@devexpress/dx-react-scheduler-material-ui";
import { useSelector } from "react-redux";
import { delay } from "lodash";
import { createBreakpoints, height, width } from "@mui/system";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CloseOutlined , EditOutlined , VideoCameraOutlined,PhoneOutlined,DeleteOutlined } from '@ant-design/icons';


const Datescheduler = () => {
	// declearing a usestate for storing our data
	const [data, setData] = useState();
	const user_id = useSelector((state) => state.login.user.id);
	const format = "YYYY-MM-DD";
	let date = new Date();
	let today = moment(date).format(format);
	const [currentDate, setcurrentDate] = useState(today);
	const [windowWidth, setWidth] = useState(window.innerWidth);
	const [PastDataContainer, setPastDataContainer] = useState();
	const [DataContainer, setDataContainer] = useState();
	const [appointmentTootip, setAppointmentTootip] = useState(true);
	const _date = new Date();
	let currentMonth = _date.getMonth();
	let currentyear = _date.getFullYear();
	const [year, setyear] = useState(currentyear);
	const [state, setState] = useState({ currentViewName: 'Week' });
	const [pastEventLenght, setPastEventLength] = useState();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [create_event, setCreate_event] = useState(false);
	const [editData, setEditData] = useState({});
	const [month, setMonth] = useState('');
	const [refresh, setRefresh] = useState(true);
	const [deleteApp, setDeleteAppointment] = useState(false);



	let { id } = stoageGetter('user');
	

	const breakpoint = 620;

	const [listData, setListData] = useState([]);
	const [click, setClick] = useState(true);
	const loggedInUserToken = useSelector((state) => state?.login?.token);


	// appoitment tool tip states

	const [appointmentMeta, setAppointmentMeta] = useState({ target: null, data: {} });

	const { currentViewName } = state;
	useEffect(() => {
		// console.log("🚀 ~ BEFOREEE ~ useEffect ~ appointmentTootip:", appointmentTootip)
		setAppointmentTootip(true);
		// console.log("🚀 ~ AFTERRR ~ useEffect ~ appointmentTootip:", appointmentTootip)
	}, [appointmentTootip])

	// useEffect(() => {
	// 	// console.log("🚀 ~ file: >>>>>>>>>> ~ .................isModalVisible:", isModalVisible)
	// 	let result = axiosRequest.get(`user/emails?value=Dev`,{ secure: true });
	// 	console.log("🚀 ~ file: Activity_Tracker.jsx:88 ~ useEffect ~ result:", result)
	//   },[])
		

	// invoking the function for retrieving our data
	useEffect(() => {
		getScheduler();
	}, [month, refresh]);

	useEffect(() => {
		const date = new Date();
		let currentMonth = date.getMonth();
		if (currentMonth.toString().length == 1) {
			currentMonth += 1;
			let num = '0' + currentMonth.toString();
			currentMonth = num;
		}
		setMonth(currentMonth);
	}, [])

	
	const showModal = (e) => {
		setAppointmentTootip(!appointmentTootip)
		setIsModalVisible(true);
		setEditData(e);
	};

	useEffect(() => {
	  getScheduler();
	}, [deleteApp])
	
	const deleteAppointment=async (e)=>{
		// console.log(e,"delete");
		setAppointmentTootip(!appointmentTootip);
		const headers = { 'Authorization': `Bearer ${loggedInUserToken}` };
		const result = await axios.delete(`https://b2bnodedev.salesdrive.app/b2b/secure/user/deleteAppointments?eventId=${e._id}`, { headers }).then((res)=>{
			message.success(res.data.errMsg);
		})
		setDeleteAppointment(deleteApp=>!deleteApp);
	}
	//getting the data when we click appointements  
	const onAppointmentMetaChange = ({ data, target }) => {
		setAppointmentMeta({ data, target })
	};




	//customizing the appearence of appointements
	const Appointment = ({
		children, style, ...restProps
	}) => {
		return (
			<Appointments.Appointment
				{...restProps}
				style={{
					...style,
					backgroundColor: '#00ACC1',
					borderRadius: '8px',
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div style={{ display: "flex",alignItems:'center' }} onClick={() => setAppointmentTootip(true)}>
					<PhoneOutlined style={{fontSize:16,fontWeight:500,color:'#fff' }} />
					<div style={{ color: "white", marginLeft: "3px" }}>{restProps.data.title}</div>
				</div>
			</Appointments.Appointment>
		)
	};
	//declearing the headers
	const Header = (({children, appointmentData, ...restProps}) => (
		<AppointmentTooltip.Header
			{...restProps}
		>
			<div className="header">
				<div style={{ width: "50px" }}>
					<text style={{textTransform:'capitalize',fontWeight:'600',color:appointmentData?.item?.statusType === 'close' ? '#e46a2c' : '#18a4c5'}}>
						{
							// appointmentData?.item?.statusType
							appointmentData?.item?.teamMember_clone.includes(user_id) ?
							appointmentData?.item?.statusType === "close" ? "Close" : "Invited" :
							appointmentData?.item?.statusType === "open" ? "Open" : "Close"
						}
					</text>
				</div>
				<div style={{height:15,width:1,backgroundColor:'grey'}}></div>
				<div style={{ display:'flex',width: "50px", cursor: "pointer",justifyContent:'center' }} onClick={() => deleteAppointment(appointmentData.item) }>
					<DeleteOutlined style={{fontSize:18,fontWeight:500 }} />
				</div>
				<div style={{height:15,width:1,backgroundColor:'grey'}}></div>
				<div style={{ display:'flex',width: "50px", cursor: "pointer",justifyContent:'center' }} onClick={() => showModal(appointmentData.item) }>
					<EditOutlined style={{fontSize:18,fontWeight:500 }} />
				</div>
				<div style={{height:15,width:1,backgroundColor:'grey'}}></div>
				<div style={{ display:'flex',width: "50px", cursor: "pointer",justifyContent:'center' }} onClick={() => { setAppointmentTootip(!appointmentTootip) }}>
					<CloseOutlined style={{fontSize:18,fontWeight:500 }} />
				</div>
			</div>
		</AppointmentTooltip.Header>
	));

	//declearing the content
	const Content = (({children, appointmentData, ...restProps}) => {
		console.log(appointmentData,"this is the appointment data");
		return (
			
			<AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
				{console.log('restProps-------->>>>>>',restProps)}
				<div className="content-head">
				<a href={appointmentData.item.meeting_URL} target="_blank" >
					<div className="content-head-svg">
						<VideoCameraOutlined style={{fontSize:18,fontWeight:500,color:'#cea0e1' }} />
					</div>
					</a>
					<a href={appointmentData.item.meeting_URL} target="_blank" >
					<div style={{ color: "#CEA0E1", marginLeft: "8px" }} >
						New Propsition Meeting
					</div>
					</a>
				</div>
				<div className="content-dt-time">
					<div className="content-dt-time-left"><div>Date</div><div>{appointmentData.date}</div></div>
					<div className="content-dt-time-right"><div>Time</div><div >{moment(appointmentData.startDate, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A') + " to " + moment(appointmentData.endDate, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}</div></div>
				</div>
				<div className="content-dt-time">
					<div className="content-dt-time-left"><div>Location</div><div>{appointmentData.location}</div></div>
					<div className="content-dt-time-right"><div>Mode</div><div>{appointmentData.Mode}</div></div>
				</div>
				<div className="content-dt-time">
					<div className="content-dt-time-left"><div>Client</div><div>{appointmentData.client}</div></div>
					{/* <div className="content-dt-time-right"><div>Location</div><div>{appointmentData.Location}</div></div> */}
					<div className="content-dt-time-right">
						<div>Agenda</div>
						<div>{appointmentData.Agenda}</div>
					</div>
				</div>
				<div className="content-dt-time">
					{/* <div className="agenda-content">
						<div>Agenda</div>
						<div>{appointmentData.Agenda}</div>
					</div> */}

					{/* <div className="content-dt-time-left">
						<div>Agenda</div>
						<div>{appointmentData.Agenda}</div>
					</div> */}
					{/* <div className="content-dt-time-right">
						<div>Status</div>
						<div>{appointmentData.Location}</div>
					</div> */}
				</div>
				<div className="minutes">
					<div className="minutes-content">
						<div>Minutes of Meeting</div>
						<div>{appointmentData.Minutes}</div>
					</div>
				</div>
			</AppointmentTooltip.Content>
		)
	});


	
	
	const currentDateChange=(currentDate)=>{
		// console.log(currentDate.getMonth(),"this is the current date change");
		let curr_month=currentDate.getMonth()+1;
		console.log(curr_month,"this si the current month");
		if(curr_month.toString().length==1){
			// curr_month+=1;
			let num='0'+curr_month.toString();
			curr_month=num;
		}
		setMonth(curr_month);
	}
	const getScheduler = async () => {
		if (month == '') return;
		const result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${month}/${year}&category=all`, {
			secure: true,
		})
		// //storing the data in res after iterating through the result
		const res = result.map((item) => {
			// formating the data
			const start_year = moment(item.start_date).format('YYYY');
			const start_day = moment(item.start_date).format('DD');
			const start_mon = moment(item.start_date).format('MM') - 1;
			const end_year = moment(item.end_date).format('YYYY');
			const end_day = moment(item.end_date).format('DD');
			const end_mon = moment(item.end_date).format('MM') - 1;
			const start_hour = moment.duration(item.start_time).hours();
			const start_min = moment.duration(item.start_time).minutes();
			const end_hour = moment.duration(item.end_time).hours();
			const end_min = moment.duration(item.end_time).minutes();
			const date = moment(item.start_date).format('DD/MM/YYYY');
			const ret = {
				title: item.title,
				startDate: new Date(start_year, start_mon, start_day, start_hour, start_min),
				endDate: new Date(end_year, end_mon, end_day, end_hour, end_min),
				id: item._id,
				location: item.location,
				Mode: item.mode,
				Location: "Andheri Office",
				Agenda: item.tata_appointment_type,
				Minutes: item.event_description,
				client: "tata AIG",
				date: date,
				time: start_hour + ":" + start_min + " to " + end_hour + ":" + end_min,
				item:item
			}
			return ret;
		})
		setData(res);
	}
	const currentViewNameChange = (e) => {
		setState({ currentViewName: e.target.value })
	}
	const ExternalViewSwitcher = ({currentViewName,onChange,}) => (
		<div className="parent">
			<div className="event-heading">Events Calender </div>
			<div className="buttons">
				<RadioGroup
					aria-label="Views"
					style={{ flexDirection: 'row',color:"black" }}
					name="views"
					value={currentViewName}
					onChange={onChange}
				>
					<FormControlLabel onClick={() => {console.log(today); setcurrentDate(today)}} value="Day" control={<Radio />} label="Today" />
					<FormControlLabel value="Week" control={<Radio />} label="Week" />
					<FormControlLabel value="Month" control={<Radio />} label="Month" />
				</RadioGroup>
			</div>
		</div>
	);

	

	const callback = () => {
		setCreate_event(true);
	}
	const callback1 = () => {
		console.log('get scheduler called');
		getScheduler();
	}

	return (
		<div>
			<Activity_Header callback={callback} />
			<div className="main-div">
				<div className="left-div">
					<ExternalViewSwitcher
						currentViewName={currentViewName}
						onChange={currentViewNameChange}
					/>
					<div className="scheduler">
						<Paper style={{boxShadow:"none"}}>
							<Scheduler data={data} >
								<ViewState
									defaultCurrentDate={moment(currentDate).format('YYYY-MM-DD')}
									currentViewName={currentViewName}
									onCurrentDateChange={currentDateChange}
								/>
								<DayView startDayHour={8} endDayHour={22}/>
								<WeekView startDayHour={8} endDayHour={22}/>
								
								<MonthView />
								
								<Toolbar />

								<DateNavigator />
								<Appointments
									appointmentComponent={Appointment}
								/>
								{appointmentTootip == true ?
									<AppointmentTooltip
										// visible={appointmentTootip}
										appointmentMeta={appointmentMeta}
										onAppointmentMetaChange={onAppointmentMetaChange}
										headerComponent={Header}
										contentComponent={Content}
									/> : ""
								}
								<AllDayPanel />
							</Scheduler>
						</Paper>
					</div>
					{isModalVisible == true ? (
						<EventCreateComponent
							click={"UPDATE EVENT"}
							Data={editData}
							api={()=>{}}
							isModalVisible={isModalVisible}
							setIsModalVisible={setIsModalVisible}
							callback1={callback1}
						/>
					) : (
						""
					)}
					{create_event == true ? (
						<EventCreateComponent
							click={"CREATE AN EVENT"}
							// Data={editData}
							// api={api}
							isModalVisible={create_event}
							setIsModalVisible={setCreate_event}
							callback1={callback1}
						/>
					) : (
						""
					)}

				</div>
				{/* <div className="right-div"> */}
				{windowWidth > breakpoint && (
					<Col xl={7} md={8} className="ActivityCalender-container-TodoCard" style={{ marginLeft: "24px",marginRight:"62px"}}>
						<Card style={{borderRadius:"4px",boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)"}}>
							<Todo />
						</Card>
					</Col>
				)}
				{/* </div> */}
			</div>
		</div>
	)
}

export default Datescheduler;