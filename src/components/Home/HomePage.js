import React, { Fragment, useEffect } from 'react';
import './HomePage.css';
import { Image, Button } from 'antd';
// import { Bar } from '@ant-design/charts';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Moment from "moment";
import _ from "lodash";
import Container from './Container'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
const HomePage = () => {
  const agent_id = useSelector((state) => state.login.agent_id)
  const logged_in_user = useSelector((state) => state.login.user_name)
  const id = useSelector((state) => state.login.id)
  console.log("agent_id,id", agent_id, id)
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(actions.activities(id))
    }

    if (agent_id) {
      dispatch(actions.home(agent_id))
    }

  }, [dispatch, id, agent_id]);
  const home_data = useSelector((state) =>
    state.home.home_obj
  )
  const activities_data = useSelector((state) => state.activities.activities_obj)
  console.log("Home-Data", home_data)
  console.log("activities-data", activities_data)
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]
  return <Fragment >
    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Hi {logged_in_user}</h3>
    <div className="cardHolder">
      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3371.png" alt="Activities" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Activities</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} />
          </div>
        </div>
        {activities_data && !_.isEmpty(activities_data) && activities_data !== "No appointment "?
          _.map((item)=>{
            return(
          <div className="action-cards-content" key={item._id}>
            <div style={{ width: 320 }}>
              <p style={{ width: "100%", margin: "0", fontWeight: "bold" }}>{Moment(item.start_date).format("D MMM YYYY")} </p>
              <p style={{ width: "100%", margin: "0" }}>{Moment(item.start_time_MS).format("h:mm a")} <span style={{ width: "100%", margin: "40px", fontWeight: "bold" }}>{item.event_name}</span> <span style={{ float: "right" }}>{Moment(item.end_time_MS).format("h:mm a")}</span></p>
              <p><b style={{ color: '#00ACC1' }}><Button type="primary" size='small' style={{ backgroundColor: item.reminder_prority_color, color: "#fff", borderRadius: '2px' }}>{item.set_reminder_prority}</Button></b> <span style={{ fontSize: "12px", fontWeight: "400" }}>{item.event_description}</span><span style={{ float: "right" }}>{item.leadId?.primaryMobile}</span></p>
            </div>
          </div>)
          }):<div className="events-body" >
          <Image className="stars" preview={false} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group127.png" alt="Events" />
          <p style={{ color: '#CEA0E1', fontSize: '20px',width:"fit-content",margin:"auto" }}>No Events Exist</p>
          <div style={{ color: '#fff', padding:"5px 20px", backgroundColor: '#CEA0E1', width: '40%',width:"fit-content",margin:"auto", cursor: 'pointer' }} >Create an Event</div>
        </div>}
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#86ACEC' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3367.png" alt="Opportunities" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Opportunities</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '280%', margin: '-6px' }} />
          </div>
        </div>
        {/* <div style={{ marginTop: "40px" ,backgroundColor:"red" }}>
        <Container>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </Container>
        </div> */}
        <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}>
          <div style={{ padding: "0 20px", borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
            <p>For Today</p>
            <h1 style={{ color: "#fff", fontSize: "35px" }}>{home_data?.today?home_data.today: '00'}</h1>
          </div>
          <div style={{ padding: "0 20px", textAlign: "center", color: "#fff" }}>
            <p>Open</p>
            <h1 style={{ color: "#fff", fontSize: "35px" }}>{home_data?.open_lead?home_data.open_lead:'00'}</h1>
          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3373.png" alt="Opportunities" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Applications</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: "center", marginTop: "40px",marginRight:"36px" }}>
          <div style={{ padding: "0 20px", borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
            <p>Login</p>
            <h1 style={{ color: "#fff", fontSize: "35px" }}>00</h1>
          </div>
          <div style={{ padding: "0 20px", textAlign: "center", color: "#fff" }}>
            <p>CFR</p>
            <h1 style={{ color: "#fff", fontSize: "35px" }}>{home_data?.cfr_count_team?home_data.cfr_count_team: '00'}</h1>
          </div>
        </div>
        <hr style={{ border: "none", borderBottom: "1px solid #fff", width: "200px" }} />
        <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}>
          <div style={{ padding: "0 20px", borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
            <p>Draft</p>
            <h1 style={{ color: "#fff", fontSize: "35px" }}>00</h1>
          </div>
          <div style={{ padding: "0 20px", textAlign: "center", color: "#fff" }}>
            <p>Recruitment</p>
            <h1 style={{ color: "#fff", fontSize: "35px" }}>00</h1>
          </div>
        </div>

      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3366.png" alt="Business" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Business</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} />
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <div style={{ float: "right" }}>
            <select style={{ backgroundColor: "transparent", border: "none", borderBottom: "1px solid #fff", outline: "none", boxShadow: "none", color: "#fff", appearance: 'none' }}>
              <option style={{ color: "#000" }} value="data1">Month to Date</option>
              <option style={{ color: "#000" }} value="data1">Weak to Date</option>
              <option style={{ color: "#000" }} value="data1">Year to Date</option>
              <option style={{ color: "#000" }} value="data1">Goal Sheet to Date</option>
            </select>
          </div>
          <p style={{ color: "#fff" }}>Logins</p>
          <div style={{ display: "flex", color: "#fff" }}>
            <div style={{ width: "120px" }}>
              <p>12400</p>
              <p>Target</p>
            </div>
            <div style={{ width: "120px" }}>
              <p>12400</p>
              <p>Achieved</p>
            </div>
            <div style={{ width: "120px" }}>
              <p>12400</p>
              <p>Shortfall</p>
            </div>
          </div>
          <p style={{ color: "#fff" }}>Issuance</p>
          <div style={{ display: "flex", color: "#fff" }}>
            <div style={{ width: "120px" }}>
              <p>12400</p>
              <p>Target</p>
            </div>
            <div style={{ width: "120px" }}>
              <p>12400</p>
              <p>Achieved</p>
            </div>
            <div style={{ width: "120px" }}>
              <p>12400</p>
              <p>Shortfall</p>
            </div>
          </div>

        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1', overflow: "hidden" }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="Actions" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Actions</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '480%', margin: '-6px' }} />
          </div>
          <div className="action-cards-content">
            <div style={{ width: 300 }}>
              <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
              <h1><b style={{ color: '#00ACC1' }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400" }}>Unallocated leads in the list</span></h1>
            </div>
            <div style={{ width: 300 }}>
              <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
              <h1><b style={{ color: '#00ACC1' }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400" }}>Unallocated leads in the list</span></h1>
            </div>
            <div style={{ width: 300 }}>
              <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
              <h1><b style={{ color: '#00ACC1' }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400" }}>Unallocated leads in the list</span></h1>
            </div>
            <div style={{ width: 300 }}>
              <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
              <h1><b style={{ color: '#00ACC1' }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400" }}>Unallocated leads in the list</span></h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="ToDo" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>To Do</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} />
          </div>

        </div>
        <div style={{ height: "75%" }} className="events-body">
          <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content", paddingTop: "50%" }}>No Active Task</p>

        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Customers</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '350%', margin: '-6px' }} />
          </div>
        </div>
        <div className='rewardscorner-text'>

          <div style={{ display: 'flex', justifyContent: "center" }}>
            <div style={{ padding: "0 20px", borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
              <p>Renewals</p>
              <h1 style={{ color: "#fff", fontSize: "40px" }}>{home_data?.Renewal_count_team?home_data.Renewal_count_team: '00'}</h1>
              <p><b>New</b></p>
            </div>
            <div style={{ padding: "0 20px", textAlign: "center", color: "#fff" }}>
              <p>Customers</p>
              <h1 style={{ color: "#fff", fontSize: "40px" }}>{home_data?.customer_count_team?home_data.customer_count_team: '00'}</h1>
              <p><b>New</b></p>

            </div>
          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3379.png" alt="Rewards Corner" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Rewards Corner</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '240%', margin: '-6px' }} />
          </div>
          <div className='rewardscorner-text'>
            <div style={{ display: 'flex', justifyContent: "center" }}>
              <div style={{ padding: "0 20px", cursor:'pointer', borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
                <Image preview={false} width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3151.png" alt="contests" hspace="20" />
                <p>Contests</p>
              </div>
              <div style={{ padding: "0 20px", cursor:'pointer', textAlign: "center", color: "#fff" }}>
                <Image preview={false} width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3157.png" alt="clubs" />
                <p>Clubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#86ACEC' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3369.png" alt="Sales Guide" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Service Corner</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} />
          </div>
          <div className="salesGuideCont">
            < div >
              <p>WIP</p>
              <h1>00</h1>
            </ div>
            < div>
              <p>Closed</p>
              <h1>00</h1>
            </ div>
            < div  >
              <p>Claim</p>
              <h1>00</h1>
            </ div>
          </div>
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <p className="sales-content" style={{ height: 35, width: "fit-content", padding: "5px 15px", display: "inline-block" }}>Downloads</p>
            <p className="sales-content" style={{ height: 35, width: "fit-content", padding: "5px 15px", display: "inline-block", marginLeft: "10px" }}>FAQ's</p>

          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3369.png" alt="Sales Guide" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Sales Guide</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} />
          </div>
          <div className="sales-guide-content">
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 100 }}>sales pitch</p>
              <p className="sales-content" style={{ height: 35, width: 130 }}>Resource Center</p>
            </div>
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 100 }}>Product</p>
              <p className="sales-content" style={{ height: 35, width: 130 }}>Need Analysis</p>
            </div>
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 200 }}>Advisor OnBoarding</p>
            </div>
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 200 }}>Recruitment Presentation</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3376.png" alt="Birthday" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px', color: '#fff' }}>Birthday</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} />
          </div>

          <div className="birthday-slides">
            <Image preview={false} width={32} height={32} src="https://sdrestdemo.iorta.in/assets/Subtraction10.png" alt="left arrow" />
            <Image preview={false} width={32} height={32} src="https://sdrestdemo.iorta.in/assets/Subtraction9.png" alt="right arrow" />
          </div>
        </div>
      </div>
    </ div>
  </Fragment>
}
export default HomePage;