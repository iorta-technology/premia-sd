import React, { Fragment, useEffect } from 'react';
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

// import { PowerBIEmbed } from 'powerbi-client-react';
// import { models } from "powerbi-client";




const HomePage = () => {
  const agent_id = useSelector((state) => state.login.agent_id)
  const logged_in_user = useSelector((state) => state.login.user_name)
  const id = useSelector((state) => state.login.id)
  // console.log("agent_id,id", agent_id, id)
  const userId = useSelector((state) => state.login?.user?.id)
  const channelCode = useSelector((state) => state.login?.user?.channelCode)
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {

    if (id) {
      dispatch(actions.activities(id))
    }
    userId && dispatch(actions.fetchUserDetails(userId))
    channelCode && dispatch(actions.fetchHierarchy(userId, channelCode))
    if (agent_id) {
      dispatch(actions.home(agent_id))
    }
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
  const config = {
    data: data,
    width: 356,
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
    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold', marginLeft: '4rem', fontSize: '16px' }}>Hi, {logged_in_user}</h3>
    <Row gutter={[18, { xs: 8, sm: 10, md: 10, lg: 18 }]} justify="center" className="cardHolder ">
      <Col>
        <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
          <div className="card-content">
            <div className="activity-icon">
              <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3371.png" alt="Activities" />
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
                          <p style={{ width: "100%", margin: "0", fontWeight: "bold" }}>{Moment(item.start_date).format("D MMM YYYY")} </p>
                          <table>
                            <tr>
                              <td>{Moment(item.start_time_MS).format("h:mm a")}</td>
                              <td>{item.event_name}</td>
                              <td>{Moment(item.end_time_MS).format("h:mm a")}</td>
                            </tr>
                            <tr>
                              <td style={{ width: '85px' }}>
                                <Button type="primary" size='small' style={{ backgroundColor: item.reminder_prority_color, color: "#fff", borderRadius: '2px' }}>
                                  {item.set_reminder_prority}
                                </Button>
                              </td>
                              <td>{item.event_description}</td>
                              <td>{item.leadId?.primaryMobile}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
            : <div className="events-body" >
              <Image className="stars" preview={false} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group127.png" alt="Events" />
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3367.png" alt="Opportunities" />
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3373.png" alt="Opportunities" />
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

      <Col style={{ display: 'none' }}>
        <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
          <Link to="/kpi-dashboard">
            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3366.png" alt="Business" />
              </div>
              <div className="activities-text">
                <p style={{ fontSize: '15px', color: '#fff' }}>Business</p>
                {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '420%', margin: '-6px' }} ></div>
              </div>
            </div>
          </Link>
          <div style={{ marginTop: "50px" }}>
            <div style={{ float: "right" }}>
              <select style={{ backgroundColor: "transparent", border: "none", borderBottom: "1px solid #fff", outline: "none", boxShadow: "none", color: "#fff", appearance: 'none' }}>
                <option style={{ color: "#000" }} value="data1">Month to Date</option>
                <option style={{ color: "#000" }} value="data1">Weak to Date</option>
                <option style={{ color: "#000" }} value="data1">Year to Date</option>
                <option style={{ color: "#000" }} value="data1">Goal Sheet to Date</option>
              </select>
            </div>
            <p style={{ color: "#fff", }}>Logins</p>
            <div style={{ display: "flex", color: "#fff", lineHeight: '5px', marginTop: '2rem' }}>
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
            <p style={{ color: "#fff", marginTop: '1rem' }}>Issuance</p>
            <div style={{ display: "flex", color: "#fff", lineHeight: '5px', marginTop: '2rem' }}>
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
      </Col>

      <Col style={{ display: 'none' }} >
        <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1', overflow: "hidden" }}>
          <div className="card-content">
            <div className="activity-icon">
              <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="Actions" />
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="ToDo" />
              </div>
              <div className="activities-text">
                <p style={{ fontSize: '15px', color: '#fff' }}>To Do</p>
                {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} /> */}
                <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '590%', margin: '-6px' }} ></div>
              </div>
            </div>
            <div style={{ height: "75%" }} className="events-body">
              <Image className='stars1' src='https://sdrestdemo.iorta.in/assets/Actionnodata.png' preview={false} ></Image>
              <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content", }}>No Active Task</p>
            </div>
          </Link>
        </div>
      </Col>

      <Col style={{ display: 'none' }}>
        <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
          <Link to="/renewalMaster/allRenewals">
            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3379.png" alt="Rewards Corner" />
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
                    <Image preview={false} width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3151.png" alt="contests" hspace="20" />
                    <p>Contests</p>
                  </div>
                </Link>
                <Link to="/clubsmaster">
                  <div style={{ padding: "0 50px", cursor: 'pointer', textAlign: "center", color: "#fff" }}>
                    <Image preview={false} width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3157.png" alt="clubs" />
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
              <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3369.png" alt="Sales Guide" />
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3369.png" alt="Sales Guide" />
              </div>
              <div className="activities-text">
                <p style={{ fontSize: '15px', color: '#fff' }}>Sales Guide</p>
                {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '300%', margin: '-6px' }} ></div>
              </div>
            </Link>
            <div className="sales-guide-content">
              <div className="b1-content">
                <Link to="/masterpresales/customerdetails/salespitch">
                  <p className="sales-content" style={{ height: 35, width: 100 }}>sales pitch</p>
                </Link>
                <p className="sales-content" style={{ height: 35, width: 130 }}>Resource Center</p>
              </div>
              <div className="b1-content">
                <Link to="/products"><p className="sales-content" style={{ height: 35, width: 100 }}>Product</p></Link>
                <p className="sales-content" style={{ height: 35, width: 130 }}>Need Analysis</p>
              </div>
              <div className="b1-content">
                <Link to="/advisorpitch">
                  <p className="sales-content" style={{ height: 35, width: 200 }}>Advisor OnBoarding</p>
                </Link>
              </div>
              <div className="b1-content">
                <Link to="/advisorpitch">
                  <p className="sales-content" style={{ height: 35, width: 200 }}>Recruitment Presentation</p>
                </Link>
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3376.png" alt="Birthday" />
              </div>
              <div className="activities-text">
                <p style={{ fontSize: '15px', color: '#fff' }}>Birthday</p>
                {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '420%', margin: '-6px' }} ></div>
              </div>
            </Link>
            <div className="birthday-slides">
              <Image preview={false} width={32} height={32} src="https://sdrestdemo.iorta.in/assets/Subtraction10.png" alt="left arrow" />
              <Image preview={false} width={32} height={32} src="https://sdrestdemo.iorta.in/assets/Subtraction9.png" alt="right arrow" />
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
              </div>
              <div className="activities-text">
                <p style={{ fontSize: '15px', color: '#fff' }}>Mapped Branches</p>
                {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '200%', margin: '-6px' }} /> */}
                <div style={{ backgroundColor: '#FFFFFF', height: '2px', opacity: 0.5, width: '200%', margin: '-6px' }} ></div>
              </div>
            </div>
          </Link>
          <div className="events-body" >
            <Image className="stars" preview={false} src="https://pocbanca.iorta.in/assets/Actionnodata.png" alt="Events" />
            <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content" }}>No Branches Found</p>
          </div>
        </div>
      </Col>

      <Col style={{ display: 'none' }} >
        <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
          <Link to="/existingpartner">
            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
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
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3379.png" alt="dashboards" />
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
                    <Image preview={false} width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3151.png" alt="contests" hspace="20" />
                    <p>Renewal Report</p>
                  </div>
                </Link>
                <Link to="/salespendency">
                  <div style={{ padding: "0 50px", cursor: 'pointer', textAlign: "center", color: "#fff" }}>
                    <Image preview={false} width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3157.png" alt="clubs" />
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
  </Fragment>
}
export default HomePage;