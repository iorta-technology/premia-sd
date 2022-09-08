import React, { Fragment, useEffect ,useState } from 'react';
import './HomePage.css';
import { Image, Button, Row, Col } from 'antd';
// import { Bar } from '@ant-design/charts';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Moment from "moment";
import _ from "lodash";
import { Link, useHistory } from 'react-router-dom';
import FloatButton from '../FloatButton/FloatButton';
import { Column } from '@ant-design/charts';
import axiosRequest from '../../axios-request/request.methods';
import {stoageGetter} from '../../helpers'

// import image ----- 
import business_img from '../../assets/DashboardIconNew/Group3366.png'
import activity_img from '../../assets/DashboardIconNew/Group3371.png'
import opportunities_img from '../../assets/DashboardIconNew/Group3367.png'
import todo_img from '../../assets/DashboardIconNew/Group3375.png'
import sales_guide_img from '../../assets/DashboardIconNew/Group3369.png'
import event_img from '../../assets/DashboardIconNew/Group127.png'
import application_img from '../../assets/DashboardIconNew/Group3373.png'
import action_data_img from '../../assets/Actionnodata.png'
import mapped_img from '../../assets/DashboardIconNew/Group3381.png'
import reward_img from '../../assets/DashboardIconNew/Group3379.png'
import contest_img from '../../assets/DashboardIconNew/Group3151.png'
import club_img from '../../assets/DashboardIconNew/Group3157.png'
import birthday_img from '../../assets/DashboardIconNew/Group3376.png'
import left_arrow from '../../assets/Subtraction10.png'
import right_arrow from '../../assets/Subtraction12.png'

// import { PowerBIEmbed } from 'powerbi-client-react';
// import { models } from "powerbi-client";


const HomePage = () => {
  const login_user_data = stoageGetter('user')
  // const agent_id = useSelector((state) => state.login.agent_id)
  const agent_id = login_user_data.agentId
  // const logged_in_user = useSelector((state) => state.login.user_name)
  const logged_in_user = login_user_data.firstName + ' ' + login_user_data.lastName
  // console.warn('((((((((logged_in_user_DATA))))))))',login_user_data)
  // const id = useSelector((state) => state.login.id)
  const id = login_user_data.id
  // const userId = useSelector((state) => state.login?.user?.id)
  const userId = login_user_data.id
  // const channelCode = useSelector((state) => state.login?.user?.channelCode)
  const channelCode = login_user_data.channelCode
  const dispatch = useDispatch();
  const history = useHistory()
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (id) dispatch(actions.activities(id,agent_id))
    if (id) dispatch(actions.todoGetData(id))
    dispatch(actions.getUserTreeAPI(userId))
    // console.log('ROUTEEE___HISTORYYY',history)
    // userId && dispatch(actions.fetchUserDetails(userId))
    // channelCode && dispatch(actions.fetchHierarchy(userId, channelCode))
    if (agent_id) dispatch(actions.home(agent_id,userId))

    // https://pocbancanode.iorta.in/secure/user/fetch_business_card_data?csmId=60e5d6056b18e8309da3fa49&channel=5f912e05037b6c581e7678f1

  }, [dispatch, id, agent_id]);

  const home_data = useSelector((state) =>
    state.home.home_obj
  )

  const activities_data = useSelector((state) => state.activities.activities_obj)
  

  const onLogout = () => {
    dispatch(actions.logout())
    history.push('/login')
  }
  // console.log("Home-Data", home_data)
  console.log("activities-data", activities_data)

  const data = [
    {
      name: 'For Today',
      month: 'Sun.',
      value: 7,
    },
    {
      name: 'For Today',
      month: 'Mon.',
      value: 3,
    },
    {
      name: 'For Today',
      month: 'Tue.',
      value: 4,
    },
    {
      name: 'For Today',
      month: 'Wed.',
      value: 2,
    },
    {
      name: 'For Today',
      month: 'Thr',
      value: 15,
    },
    {
      name: 'For Today',
      month: 'Fri.',
      value: 10,
    },
    {
      name: 'For Today',
      month: 'Sat.',
      value: 11,
    },
    {
      name: 'Open',
      month: 'Sun.',
      value: 6,
    },
    {
      name: 'Open',
      month: 'Mon.',
      value: 1,
    },
    {
      name: 'Open',
      month: 'Tue.',
      value: 5,
    },
    {
      name: 'Open',
      month: 'Wed.',
      value: 7,
    },
    {
      name: 'Open',
      month: 'Thr',
      value: 16,
    },
    {
      name: 'Open',
      month: 'Fri.',
      value: 18,
    },
    {
      name: 'Open',
      month: 'Sat.',
      value: 15,
    }
  ];
  const breakpoint = 620;
  const config = {
    data: data,
    width: width > breakpoint ? 356 : 333,
    height: 165,
    autoFit: false,
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        // { type: 'interval-adjust-position' },
        // { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },

      ],
    },
    color: ['#ADD8E6', '#fff']
  };

  return <Fragment  >
    {/* <Button type="primary" onClick={onLogout}>Logout</Button> */}
    <FloatButton />
    {/* <h3 className='ml10' style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px',}}>Hi, {logged_in_user}</h3> */}
    
    <Col className="cardHolder">
    {/* home-ml10 */}
      <p className='' style={{ textTransform: 'capitalize', fontWeight: 'bold',fontSize: '16px',marginBottom:'8px'}}>Hi, {logged_in_user}</p>


      <Row  gutter={[18, { xs: 18, sm: 10, md: 10, lg: 18 }]} justify="center" >

        <Col>
          <div className="dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>

            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src={activity_img} alt="Activities" />
              </div>
              <div className="activities-text">
                <p style={{ fontSize: '15px', color: '#fff' }}>Activities</p>
                {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '420%', margin: '-6px' }} ></div>
              </div>
            </div>

            {activities_data && !_.isEmpty(activities_data) && activities_data !== 'No appointment ' ?
              (
                <div className="activity-block">
                  {
                    activities_data.map((item) => {
                      return (
                        <div className="action-cards-content-activity" key={item._id}>
                          <div >
                            <p style={{ width: "100%", marginBottom: "5px", fontWeight: "bold" }}>{Moment(item.start_date).format("D MMM YYYY")} </p>
                            <div className='appointment_data'>
                              <p>{Moment(item.start_time_MS).format("h:mm a")}</p>
                              <p style={{fontWeight: 'bold'}}>{item.event_name}</p>
                              <p>{Moment(item.end_time_MS).format("h:mm a")}</p>
                            </div>
                            <div id="truncateLongTexts">
                               <p>{item.event_description}</p>
                          </div>

                            

                            {/* <table>
                              <tr>
                                <td style={{ width: '85px' }}>
                                  <Button type="primary" size='small' style={{ backgroundColor: item.reminder_prority_color, color: "#fff", borderRadius: '2px' }}>
                                    {item.set_reminder_prority}
                                  </Button>
                                </td>
                                <td>{item.event_description}</td>
                                <td>{item.leadId?.primaryMobile}</td>
                              </tr>
                            </table> */}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
              : <div className="events-body" >
                <Image className="stars" preview={false} src={event_img} alt="Events" />
                <p style={{ color: '#CEA0E1', fontSize: '20px', width: "fit-content", margin: "auto" }}>No Events Exist</p>
                <Link to="/calendar">
                  <div style={{ color: '#fff', padding: "5px 20px", backgroundColor: '#CEA0E1', width: '40%', width: "fit-content", margin: "auto", cursor: 'pointer' }} >Create an Event</div>
                </Link>
              </div>}
          </div>
        </Col>


        <Col>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#86ACEC' }}>
            <Link to="/leadMaster/all_leads">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={opportunities_img} alt="Opportunities" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Opportunities</p>
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '280%', margin: '-6px' }} ></div>
                </div>
              </div>
            </Link>
            <div style={{ marginTop: "30px" }}>
              <Column {...config} />
            </div>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: "10px" }}>
              <div style={{ padding: "0 30px", borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
                <p>For Today</p>
                <span style={{ color: "#fff", fontSize: "50px", }}>{home_data?.today ? home_data.today : '00'}</span>
              </div>
              <div style={{ padding: "0 30px", textAlign: "center", color: "#fff" }}>
                <p>Open</p>
                <span style={{ color: "#fff", fontSize: "50px" }}>{home_data?.open_lead ? home_data.open_lead : '00'}</span>
              </div>
            </div>
          </div>
        </Col>

        <Col style={{ display: 'none' }}>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
            <div className="card-content">
              <Link to={"/applications"}>
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={application_img} alt="Opportunities" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Applications</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '280%', margin: '-6px' }} ></div>
                </div>
              </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: "center", marginTop: "40px", marginRight: "36px" }}>
              <div style={{ padding: "0px 60px 20px 20px", borderRight: "1px solid #fff ", textAlign: "center", color: "#fff" }}>
                <p>Login</p>
                <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
              </div>
              <div style={{ padding: "0px 0px 20px 45px", textAlign: "center", color: "#fff" }}>
                <p>CFR</p>
                <span style={{ color: "#fff", fontSize: "50px" }}>{home_data?.cfr_count_team ? home_data.cfr_count_team : '23'}</span>
              </div>
            </div>

            <hr style={{ border: "none", borderBottom: "2px solid #fff", opacity: '0.5', width: "240px", margin: "10px 0px 0px 60px" }} />
            {/* <hr style={{ border: "none", borderBottom: "1px solid #fff", width: "200px"}} /> */}

            <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}>
              <div style={{ padding: "2px 60px 20px 0px", borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
                <p>Draft</p>
                <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
              </div>
              <div style={{ padding: "0px 0px 20px 40px", textAlign: "center", color: "#fff" }}>
                <p>Recruitment</p>
                <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
            <Link to="/kpi-dashboard">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={business_img} alt="Business" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Business</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '420%', margin: '-6px' }} ></div>
                </div>
              </div>
            </Link>
            <div style={{ marginTop: "50px"}}>
              <div style={{backgroundColor:'#fff', marginBottom:'10px', borderRadius:'3px', color: '#3C3D3D', fontSize: '11px'}}>
                <p style={{
                  fontWeight:'750', padding:'5px 10px',
                  borderBottom:'1px solid #c1c8cc',
                  marginBottom:0,
                }}>Retention</p>
                <div style={{ display: "flex", color: "#fff", lineHeight: '5px', color:'black'}}>
                  <div style={{ width: "120px", padding:'8px 10px'}}>
                    <p>Target</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                  <div style={{ width: "120px", padding:'8px 10px', borderRight:'1px solid #c2c8cc',borderLeft:'1px solid #c2c8cc'}}>
                    <p>Achievement</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                  <div style={{ width: "120px", padding:'8px 10px'}}>
                    <p>%Achievement</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                </div>
              </div>
              
              <div style={{backgroundColor:'#fff', marginBottom:'10px', borderRadius:'3px', color: '#3C3D3D', fontSize: '11px'}}>
                <p style={{
                  fontWeight:'750', padding:'5px 10px',
                  borderBottom:'1px solid #c1c8cc',
                  marginBottom:0,
                }}>GWP</p>
                <div style={{ display: "flex", color: "#fff", lineHeight: '5px', color:'black'}}>
                  <div style={{ width: "120px", padding:'8px 10px'}}>
                    <p>Target</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                  <div style={{ width: "120px", padding:'8px 10px', borderRight:'1px solid #c2c8cc',borderLeft:'1px solid #c2c8cc'}}>
                    <p>Achievement</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                  <div style={{ width: "120px", padding:'8px 10px'}}>
                    <p>%Achievement</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                </div>
              </div>

              <div style={{backgroundColor:'#fff', marginBottom:'10px', borderRadius:'3px', color: '#3C3D3D', fontSize: '11px'}}>
                <p style={{
                  fontWeight:'750', padding:'5px 10px',
                  borderBottom:'1px solid #c1c8cc',
                  marginBottom:0,
                }}>Activation</p>
                <div style={{ display: "flex", color: "#fff", lineHeight: '5px', color:'black'}}>
                  <div style={{ width: "120px", padding:'8px 10px'}}>
                    <p>Target</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                  <div style={{ width: "120px", padding:'8px 10px', borderRight:'1px solid #c2c8cc',borderLeft:'1px solid #c2c8cc'}}>
                    <p>Achievement</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                  <div style={{ width: "120px", padding:'8px 10px'}}>
                    <p>%Achievement</p>
                    <p style={{fontSize:'14px',fontWeight:'700', color:'#3c3d3d', marginBottom:5}}>0</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Col>

        <Col style={{ display: 'none' }} >
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1', overflow: "hidden" }}>
            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src={todo_img} alt="Actions" />
              </div>
              <div className="activities-text">
                <p style={{ fontSize: '15px', color: '#fff' }}>Actions</p>
                {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '480%', margin: '-6px' }} /> */}
                <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '480%', margin: '-6px' }} ></div>
              </div>
              <div className="action-cards-content">
                <div style={{ width: "100%", padding: "10px" }}>
                  <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
                  <h1 style={{ marginTop: '-10px' }} ><b style={{ color: '#00ACC1' }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400", fontFamily: 'robotoregular' }}>Unallocated leads in the list</span></h1>
                </div>
                <div style={{ width: "100%", padding: "10px" }}>
                  <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
                  <h1 style={{ marginTop: '-10px' }} ><b style={{ color: '#00ACC1', }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400", fontFamily: 'robotoregular' }}>Unallocated leads in the list</span></h1>
                </div>
                <div style={{ width: "100%", padding: "10px" }}>
                  <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
                  <h1 style={{ marginTop: '-10px' }} ><b style={{ color: '#00ACC1' }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400", fontFamily: 'robotoregular' }}>Unallocated leads in the list</span></h1>
                </div>
                <div style={{ width: "100%", padding: "10px" }}>
                  <p style={{ width: "100%", margin: "0" }}>New Leads <span style={{ float: "right", color: '#00ACC1', cursor: "pointer", textDecoration: 'underline' }}>Dismiss</span></p>
                  <h1 style={{ marginTop: '-10px' }} ><b style={{ color: '#00ACC1' }}>10</b> <span style={{ fontSize: "12px", fontWeight: "400", fontFamily: 'robotoregular' }}>Unallocated leads in the list</span></h1>
                </div>
              </div>
            </div>
          </div>
        </Col>


        <Col>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
            <Link to='/calendar'>
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={todo_img} alt="ToDo" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>To Do</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '590%', margin: '-6px' }} ></div>
                </div>
              </div>

                {/* {<p>H</p> ?
                (
                  //<h1>Hi</h1>
                ) :  */}
                <div style={{ height: "75%" }} className="events-body">
                  <Image className='stars1' src={action_data_img} preview={false} ></Image>
                  <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content", }}>No Active Task</p>
                </div>

                {/* } */}

              
            </Link>
          </div>
        </Col>



        <Col style={{ display: 'none' }}>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
            <Link to="/renewalMaster/allRenewals">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={mapped_img} alt="Customers" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Renewals</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '350%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '380%', margin: '-6px' }} ></div>
                </div>
              </div>
            </Link>
            <div className='rewardscorner-text'>
              <div style={{ display: 'flex', justifyContent: "center", marginTop: '1rem' }}>
                <div style={{ padding: "0 50px", borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
                  <p>Renewals</p>
                  <h1 style={{ color: "#fff", fontSize: "50px" }}>{home_data?.Renewal_count_team ? home_data.Renewal_count_team : '00'}</h1>
                  <p><b>New</b></p>
                </div>
                <div style={{ padding: "0 50px", textAlign: "center", color: "#fff" }}>
                  <p>Customers</p>
                  <h1 style={{ color: "#fff", fontSize: "50px" }}>{home_data?.customer_count_team ? home_data.customer_count_team : '00'}</h1>
                  <p><b>New</b></p>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col style={{ display: 'none' }}>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
            <div className="card-content">
              <Link to="/rewardscorner/contests/allcontest">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={reward_img} alt="Rewards Corner" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Rewards Corner</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '240%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '240%', margin: '-6px' }} ></div>
                </div>
              </Link>
              <div className='rewardscorner-text'>
                <div style={{ display: 'flex', justifyContent: "center", marginTop: '1rem' }}>
                  <Link to="/rewardscorner/contests/allcontest">
                    <div style={{ padding: "0 50px", cursor: 'pointer', borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
                      <Image preview={false} width={90} height={90} src={contest_img} alt="contests" hspace="20" />
                      <p>Contests</p>
                    </div>
                  </Link>
                  <Link to="/clubsmaster">
                    <div style={{ padding: "0 50px", cursor: 'pointer', textAlign: "center", color: "#fff" }}>
                      <Image preview={false} width={90} height={90} src={club_img} alt="clubs" />
                      <p>Clubs</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col style={{ display: 'none' }}>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#86ACEC' }}>
            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src={sales_guide_img} alt="Sales Guide" />
              </div>
              <Link to='/servicecorner/all'>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Service Corner</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '300%', margin: '-6px' }} ></div>
                </div>
              </Link>
              <div className="salesGuideCont">
                < div >
                  <p >WIP</p>
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
        </Col>

        <Col>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
            <div className="card-content">
              <Link to='/products'>
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={sales_guide_img} alt="Sales Guide" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Sales Guide</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '300%', margin: '-6px' }} ></div>
                </div>
              </Link>
              <div className="sales-guide-content">
                <div className="b1-content">
                  <div onClick={() => history.push('/masterpresales/customerdetails/salespitch')}>
                    <p className="sales-content" style={{ height: 35, width: 100,fontSize:14 }}>Sales Pitch</p>
                  </div>
                  <p className="sales-content" style={{ height: 35, width: 130,fontSize:14 }}>Resource Center</p>
                </div>
                <div className="b1-content">
                  <div onClick={() => history.push('/products')}><p className="sales-content" style={{ height: 35, width: 100 }}>Product</p></div>
                  <p className="sales-content" style={{ height: 35, width: 130,fontSize:14 }}>Need Analysis</p>
                </div>
                <div className="b1-content">
                  <div onClick={() => history.push('/advisorpitch')}>
                    <p className="sales-content" style={{ height: 35, width: 200,fontSize:14 }}>Advisor OnBoarding</p>
                  </div>
                </div>
                <div className="b1-content">
                  <div onClick={() => history.push('/advisorpitch')}>
                    <p className="sales-content" style={{ height: 35, width: 200,fontSize:14 }}>Recruitment Presentation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col style={{ display: 'none' }}>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
            <div className="card-content">
              <Link to="/birthday">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={birthday_img} alt="Birthday" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Birthday</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '420%', margin: '-6px' }} ></div>
                </div>
              </Link>
              <div className="birthday-slides">
                <Image preview={false} width={32} height={32} src={left_arrow} alt="left arrow" />
                <Image preview={false} width={32} height={32} src={right_arrow} alt="right arrow" />
              </div>
            </div>
          </div>
        </Col>

        {/* <Col>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
            <Link to="/mappedbranches">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Mapped Branches</p>
                  <hr style={{ backgroundColor: '#fff', height: '1px', width: '200%', margin: '-6px' }} />
                </div>
              </div>
            </Link>
            <div className="events-body">
              <Image className="stars" preview={false} src="https://pocbanca.iorta.in/assets/Actionnodata.png" alt="Events" />
              <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content", paddingTop: "50%" }}>No Branches Found</p>
              <p style={{ color: '#CEA0E1', fontSize: '20px', width: "fit-content", margin: "auto" }}>No Events Exist</p>
            </div>
          </div>
        </Col> */}

        <Col style={{ display: 'none' }}>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
            <Link to="/mappedbranches">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={mapped_img} alt="Customers" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Mapped Branches</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '200%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '200%', margin: '-6px' }} ></div>
                </div>
              </div>
            </Link>
            <div className="events-body" >
              <Image className="stars" preview={false} src={action_data_img} alt="Events" />
              <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content" }}>No Branches Found</p>
            </div>
          </div>
        </Col>

        <Col style={{ display: 'none' }} >
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
            <Link to="/existingpartner">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={mapped_img} alt="Customers" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Existing Partner</p>
                  {/* <hr style={{ backgroundColor: '#fff', height: '1px', width: '200%', margin: '-6px' }} /> */}
                  <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '240%', margin: '-6px' }} ></div>
                </div>
              </div>
            </Link>
            <div style={{ height: "75%" }} className="events-body">
              <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content", paddingTop: "50%" }}>No Branches Found</p>
            </div>
          </div>
        </Col>

        {/* <Col>
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
        </Col> */}


        {/* <Col className="dummy-home-card"></Col> */}




        <Col style={{ display: 'none' }}>
          <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
            <div className="card-content">
              <Link to="/renewalreport">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src={reward_img} alt="dashboards" />
                </div>
                <div className="activities-text">
                  <p style={{ fontSize: '15px', color: '#fff' }}>Dashboards</p>
                  <hr style={{ backgroundColor: '#ececec', height: '1px', opacity: '0.5', width: '300%', margin: '-6px' }} />
                </div>
              </Link>
              <div className='rewardscorner-text'>
                <div style={{ display: 'flex', justifyContent: "center", marginTop: '1rem' }}>
                  <Link to="/renewalreport">
                    <div style={{ padding: "0 50px", cursor: 'pointer', borderRight: "1px solid #fff", textAlign: "center", color: "#fff" }}>
                      <Image preview={false} width={90} height={90} src={contest_img} alt="contests" hspace="20" />
                      <p>Renewal Report</p>
                    </div>
                  </Link>
                  <Link to="/salespendency">
                    <div style={{ padding: "0 50px", cursor: 'pointer', textAlign: "center", color: "#fff" }}>
                      <Image preview={false} width={90} height={90} src={club_img} alt="clubs" />
                      <p>Sales Pendency</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col className="dummy-home-card"></Col>
        <Col className="dummy-home-card"></Col>
      </ Row>
    </Col>
  </Fragment>
}
export default HomePage;