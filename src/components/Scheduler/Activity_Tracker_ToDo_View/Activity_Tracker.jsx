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

import { Card, Col, Row, Button } from "antd";
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
import { CloseOutlined , EditOutlined , VideoCameraOutlined } from '@ant-design/icons';


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



	let { id } = stoageGetter('user');
	

	const breakpoint = 620;

	const [listData, setListData] = useState([]);
	const [click, setClick] = useState(true);

	// appoitment tool tip states

	const [appointmentMeta, setAppointmentMeta] = useState({ target: null, data: {} });

	const { currentViewName } = state;
	useEffect(() => {
		setAppointmentTootip(true);
	}, [appointmentTootip])

	// invoking the function for retrieving our data
	useEffect(() => {
		getScheduler();
		// console.log(refresh, "this is refresh part");
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
		setIsModalVisible(true);
		setEditData(e);
		setAppointmentTootip(!appointmentTootip)
		
	};

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
				<div style={{ display: "flex", marginLeft: "4px" }} onClick={() => setAppointmentTootip(true)}>
					<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.75 1H5.75L7.25 4.75L5.375 5.875C6.17822 7.50365 7.49635 8.82178 9.125 9.625L10.25 7.75L14 9.25V12.25C14 12.6478 13.842 13.0294 13.5607 13.3107C13.2794 13.592 12.8978 13.75 12.5 13.75C9.57445 13.5722 6.81512 12.3299 4.74262 10.2574C2.67013 8.18489 1.42779 5.42555 1.25 2.5C1.25 2.10218 1.40804 1.72064 1.68934 1.43934C1.97064 1.15804 2.35218 1 2.75 1Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
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
		return (
			<AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
				<div className="content-head">
					<div className="content-head-svg">
						{/* <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.5 8.84979L16.2942 6.95312C16.4212 6.88965 16.5623 6.85969 16.7042 6.86608C16.846 6.87247 16.9839 6.915 17.1047 6.98963C17.2255 7.06426 17.3252 7.16852 17.3944 7.29252C17.4636 7.41651 17.4999 7.55613 17.5 7.69812V13.3348C17.4999 13.4768 17.4636 13.6164 17.3944 13.7404C17.3252 13.8644 17.2255 13.9687 17.1047 14.0433C16.9839 14.1179 16.846 14.1604 16.7042 14.1668C16.5623 14.1732 16.4212 14.1433 16.2942 14.0798L12.5 12.1831V8.84979Z" stroke="#CEA0E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M2.5 7.18229C2.5 6.74026 2.67559 6.31634 2.98816 6.00378C3.30072 5.69122 3.72464 5.51563 4.16667 5.51562H10.8333C11.2754 5.51563 11.6993 5.69122 12.0118 6.00378C12.3244 6.31634 12.5 6.74026 12.5 7.18229V13.849C12.5 14.291 12.3244 14.7149 12.0118 15.0275C11.6993 15.34 11.2754 15.5156 10.8333 15.5156H4.16667C3.72464 15.5156 3.30072 15.34 2.98816 15.0275C2.67559 14.7149 2.5 14.291 2.5 13.849V7.18229Z" stroke="#CEA0E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg> */}
						<VideoCameraOutlined style={{fontSize:18,fontWeight:500,color:'#cea0e1' }} />
					</div>
					<div style={{ color: "#CEA0E1", marginLeft: "8px" }}>
						New Propsition Meeting
					</div>
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
		let curr_month=currentDate.getMonth();
		if(curr_month.toString().length==1){
			curr_month+=1;
			let num='0'+curr_month.toString();
			curr_month=num;
		}
		setMonth(curr_month);
	}
	const getScheduler = async () => {
		if (month == '') return;
		const result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${month}/${year}&category=all`, {
			secure: true,
		});
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
							//api={api}
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