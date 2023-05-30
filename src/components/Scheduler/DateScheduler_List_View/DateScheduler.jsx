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
import "./DateScheduler.css";
import { BiToggleRight, BiToggleLeft } from 'react-icons/bi';
import { AiOutlineStar, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import { Card, Col, Row, Button } from "antd";
// import Todo from "../Activitity Tracker/RightSide-Todo/Todo";

import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AllDayPanel,
  AppointmentTooltip
} from "@devexpress/dx-react-scheduler-material-ui";
import { delay } from "lodash";
import { height, width } from "@mui/system";

export function Comp() {
  return (
    <div >
      abhishek
    </div>
  )
}
export function NeComp() {
  return (
    <div>
      t
    </div>
  )
}

const Datescheduler = () => {
  // declearing a usestate for storing our data
  const [data, setData] = useState();
  const format = "YYYY-MM-DD";
  let date = new Date();
  let today = moment(date).format(format);
  const [currentDate, setcurrentDate] = useState(today);
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [listData, setListData] = useState([]);
  const [click, setClick] = useState(true);

  // invoking the function for retrieving our data
  useEffect(() => {
    getScheduler();
    // setcurrentDate(new Date());
  }, [])

  useEffect(() => {
    console.log(listData);
  }, [listData]);

  function handleClick(e) {
    setClick(click => !click);
    console.log(click)
    if (click) {
      document.getElementById('left-div-size').style.width = "75%";
      document.getElementById('left-div-size').style.transition = "1s ease-in-out";
      document.getElementById('right-div-size').style.display = "block";
      document.getElementById('onclick').style.background="#303030";
      document.getElementById('onclick').style.color="white";
    } else {
      document.getElementById('left-div-size').style.width = "85%";
      document.getElementById('left-div-size').style.transition = "1s ease-in-out";
      document.getElementById('right-div-size').style.display = "none";
      document.getElementById('onclick').style.background="white";
      document.getElementById('onclick').style.color="black";
    }
  }


  const getScheduler = async () => {
    const result = await axiosRequest.get("user/fetch_appointments/63dce7c80ae6868961079fe6?teamdata=0&filter=05/2023&category=all", {
      secure: true,
    });
    setListData(result);

    // console.log(result)
    //storing the data in res after iterating through the result
    const res = result.map((item) => {
      // formating the data
      const start_year = moment(item.start_date).format('YYYY');
      const start_day = moment(item.start_date).format('DD');
      const start_mon = moment(item.start_date).format('MM');
      const end_year = moment(item.end_date).format('YYYY');
      const end_day = moment(item.end_date).format('DD');
      const end_mon = moment(item.end_date).format('MM');
      const start_hour = moment.duration(item.start_time).hours();
      const start_min = moment.duration(item.start_time).minutes();
      const end_hour = moment.duration(item.end_time).hours();
      const end_min = moment.duration(item.end_time).minutes();
      return {
        title: item.title,
        startDate: new Date(start_year, start_mon, start_day, start_hour, start_min),
        endDate: new Date(end_year, end_mon, end_day, end_hour, end_min),
        id: item._id,
        location: item.location
      }
    })
    setData(res);

    // console.log(res);
  }
  return (
    <div className="main-div">

      <div className="left-div" id="left-div-size">
        
        <Paper >
          <Scheduler data={data} >
            <ViewState defaultCurrentDate={currentDate} />
            {/* declearing the day start hour and day end hour */}
            <WeekView startDayHour={7} endDayHour={15} />
            <Toolbar />
            <DateNavigator />
            <Appointments />
            <AppointmentTooltip
              showCloseButton
            />

            <AllDayPanel />

          </Scheduler>
        </Paper>

      </div>
      <div className="right-div">
        
      </div>

      <div className="right-div" id="right-div-size">
        <div className="main-box">

          <div className="main-box-heading">Event List View</div>
          <div className="main-box-cards" style={{ margin: "10px" }}>
            {
              listData.map((item) => {
                const start_year = moment(item.start_date).format('YYYY');
                const start_day = moment(item.start_date).format('DD');
                const start_mon = moment(item.start_date).format('MM');
                const start_hour = moment.duration(item.start_time).hours();
                const start_min = moment.duration(item.start_time).minutes();
                const end_hour = moment.duration(item.end_time).hours();
                const end_min = moment.duration(item.end_time).minutes();
                return (
                  <div className="box-card" style={{ marginBottom: "10px" }}>
                    <div className="box-card-head">
                      <div className="left">
                        <div className="icon">
                          <IoMdCall size={20} />
                        </div>
                        <div className="name" >
                          {item.stakeholder_name}
                        </div>
                      </div>
                      <div className="right">
                        <AiOutlineStar size={20} className="avatars" />
                        <AiFillEye size={20} className="avatars" />
                        <BsPencil size={20} className="avatars" /></div>
                    </div>

                    <div className="detail">
                      <div className="leftside">
                        <div className="first-part-p"><span>Date</span><br />{start_day + "/" + start_mon + "/" + start_year}</div>
                        <div className="first-part-p"><span>Location</span><br />{item.location}</div>
                      </div>
                      <div className="rightside">
                        <div className="first-part-p"><span>Time</span><br />{start_hour + ":" + start_min + " to " + end_hour + ":" + end_min}</div>
                        <div className="second-part-p">
                          <div className="title"> Mode </div>
                          <div className="content"> {item.mode} </div>
                        </div>
                      </div>
                    </div>
                    <div className="purpose">
                      <div>Agenda</div>
                      <div>{item.event_description}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div className="right-div-btn" >
        <button className="right-div-button" id="onclick" onClick={handleClick}>
          {click ? <BiToggleLeft size={30} /> :<BiToggleRight size={30} /> }
          <div className="text">List View</div>
        </button>
      </div>

    </div>
  )
}

export default Datescheduler;