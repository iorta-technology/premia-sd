import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Steps, Timeline, Divider, Image, Tabs  } from 'antd';
import './History.css'
import '../StatusLead/StatusLead.css'
// import '../LeadDetails/LeadDetailsTab.css'
import MTabs from '../../components/Tab/Tab'
import HistoryTabs from './HistoryTabs'
import * as actions from '../../store/actions/index';
import _ from "lodash";
import { dataFormatting } from '../../helpers'
const { Step } = Steps;


let historyRoute = "/leadmasterpage/leadhistorymaster/leadhistory"
const tabMenu = [
    {
        id: 1,
        value: "Status",
    },
    // {
    //     id: 2,
    //     value: "Lead Details"
    // },
    // {
    //     id: 3,
    //     value: "Proposal Details"
    // },
    // {
    //     id: 4,
    //     value: "Documents Upload"
    // },
    {
        id: 2,
        value: "History"
    },

]

const History = () => {

    const storeLeadId = useSelector((state) => state.newLead.leadId)
    const storeUserId = useSelector((state) => state.newLead.userId)
    const leadArrObject = useSelector((state) => state.history.leadData)
    const appointmentArrObject = useSelector((state) => state.history.appointmentData)
    const proposalArrObject = useSelector((state) => state.history.proposalData)

    const [leadId, setleadId] = useState(storeLeadId)
    const [userId, setuserId] = useState(storeUserId)
    const dispatch = useDispatch()

    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    let leadElement = (
        // {
            // proposalArrObject !== null &&
            <>
                <h2 className="his-title m0a" style={{padding:'10px 0px 10px 0px'}} >Lead Data</h2>
                <Timeline className="p20">
                    {leadArrObject.map((leadData) =>
                        <Timeline.Item color="red">
                            <p className="ml10 timeline-title">{leadData.title}</p>
                            <Row className="timeline-desc">
                                <Col xs={22} sm={22} md={12} className="ml10 ">
                                    <p>{leadData.desc}</p>
                                </Col>
                                <Col xs={22} sm={22} md={11} className="time-content">
                                    <p>{leadData.owner}</p>
                                    <p>{leadData.date}</p>
                                </Col>
                            </Row>
                        </Timeline.Item>
                    )}
                </Timeline>
            </>
        // }
    )

    let appointmentElement = (
        // {
            // proposalArrObject !== null &&
            <>
                <h2 className="his-title m0a" style={{padding:'10px 0px 10px 0px'}}>Appointment Data</h2>
                <Timeline className="p20">
                    {appointmentArrObject.map((leadData) =>
                        <Timeline.Item color="red">
                            <p className="ml10 timeline-title">{leadData.title}</p>
                            <Row className="timeline-desc">
                                <Col xs={22} sm={22} md={12} className="ml10 ">
                                    <p>{leadData.desc}</p>
                                </Col>
                                <Col xs={22} sm={22} md={11} className="time-content">
                                    <p>{leadData.owner}</p>
                                    <p>{leadData.date}</p>
                                </Col>
                            </Row>
                        </Timeline.Item>
                    )}
                </Timeline>
            </>
        // }
    )

let proposalElement = (
    <>
        <h2 className="his-title m0a" style={{padding:'10px 0px 10px 0px'}}>Proposal Data</h2>
        <Timeline className="p20">
            {proposalArrObject.map((leadData) =>
                <Timeline.Item color="red">
                    <p className="ml10 timeline-title">{leadData.title}</p>
                    <Row className="timeline-desc">
                        <Col xs={22} sm={22} md={12} className="ml10 ">
                            <p>{leadData.desc}</p>
                        </Col>
                        <Col xs={22} sm={22} md={11} className="time-content">
                            <p>{leadData.owner}</p>
                            <p>{leadData.date}</p>
                        </Col>
                    </Row>
                </Timeline.Item>
            )}
        </Timeline>
    </>
)



useEffect(() => {
    dispatch(actions.fetchHistory(leadId, userId))
}, [dispatch]);


return (
    <>
        <MTabs
            tabBarGutter={0}
            tabMenu={tabMenu}
            header="New Lead"
            detailsRouteTab={historyRoute}
            activeKey="2"

        />
        <div className="form-container">
            {leadId ?
                <Row gutter={['', 20]} justify="center">
                    <Col className="form-body m0a" xs={22} sm={24} md={16} lg={16} xl={16} >
                        <div className="proposal">
                            <div className="bg-norecord">
                            </div>
                            <p className="norecord-title">No Records Found</p>
                        </div>
                    </Col>
                </Row>
                :
                <Row>

                {/* <div className="Advisorpitch-row-flex">
                    <Tabs tabPosition={tabPosition}  style={{ fontSize: '12px'}}
                     className='AdvisorPitch-Container'>
                       
                        <TabPane tab="Lead" key="1"  className='AdvisorPitch'>
                            <div className="Advisorpitch-details-card-style ">
                                <div className="Advisorpitch-details-card-content-align">
                                    <h1 className="about-heading">Lead</h1><Divider />
                                    <p className="about-paragraph">Edelweiss Tokio Life Insurance Company offers comprehensive protection plans Edelweiss Tokio Life Insurance Company offers comprehensive protection plans to help you in the hour of need through options of both critical illnesses and life cover. The company helps you to chalk out your goals and create a secure and bright future for yourself and your loved ones. Edelweiss Tokio Life is a private sector insurance provider established in 2011. The company is a joint venture between Edelweiss Group of India, and Tokio Marine Holdings of Japan. It is among the fastest growing private players in the life insurance sector in India. Edelweiss Tokio Life provides a host of life insurance products aimed at providing high returns, guaranteed interest payments, child education needs, retirement benefits etc. for customers across a wide spectrum.</p>

                                </div>
                            </div>
                        </TabPane>

                        <TabPane tab="Appointment" key="2"  className='AdvisorPitch'>
                            <div className="Advisorpitch-details-card-style ">
                                <div className="Advisorpitch-details-card-content-align">
                                    <h1 className="about-heading">Appointment</h1><Divider />
                                    <p className="about-paragraph">Edelweiss Tokio Life Insurance Company offers comprehensive protection plans Edelweiss Tokio Life Insurance Company offers comprehensive protection plans to help you in the hour of need through options of both critical illnesses and life cover. The company helps you to chalk out your goals and create a secure and bright future for yourself and your loved ones. Edelweiss Tokio Life is a private sector insurance provider established in 2011. The company is a joint venture between Edelweiss Group of India, and Tokio Marine Holdings of Japan. It is among the fastest growing private players in the life insurance sector in India. Edelweiss Tokio Life provides a host of life insurance products aimed at providing high returns, guaranteed interest payments, child education needs, retirement benefits etc. for customers across a wide spectrum.</p>

                                </div>
                            </div>
                        </TabPane>

                        <TabPane tab="Proposal" key="3"  className='AdvisorPitch'>
                            <div className="Advisorpitch-details-card-style ">
                                <div className="Advisorpitch-details-card-content-align">
                                    <h1 className="about-heading">Proposal</h1><Divider />
                                    <p className="about-paragraph">Edelweiss Tokio Life Insurance Company offers comprehensive protection plans Edelweiss Tokio Life Insurance Company offers comprehensive protection plans to help you in the hour of need through options of both critical illnesses and life cover. The company helps you to chalk out your goals and create a secure and bright future for yourself and your loved ones. Edelweiss Tokio Life is a private sector insurance provider established in 2011. The company is a joint venture between Edelweiss Group of India, and Tokio Marine Holdings of Japan. It is among the fastest growing private players in the life insurance sector in India. Edelweiss Tokio Life provides a host of life insurance products aimed at providing high returns, guaranteed interest payments, child education needs, retirement benefits etc. for customers across a wide spectrum.</p>
                                </div>
                            </div>
                        </TabPane>

                        <TabPane tab="Issuance" key="4"  className='AdvisorPitch'>
                            <div className="Advisorpitch-details-card-style ">
                                <div className="Advisorpitch-details-card-content-align">
                                    <h1 className="about-heading">Issuance</h1><Divider />
                                    <p className="about-paragraph">Edelweiss Tokio Life Insurance Company offers comprehensive protection plans Edelweiss Tokio Life Insurance Company offers comprehensive protection plans to help you in the hour of need through options of both critical illnesses and life cover. The company helps you to chalk out your goals and create a secure and bright future for yourself and your loved ones. Edelweiss Tokio Life is a private sector insurance provider established in 2011. The company is a joint venture between Edelweiss Group of India, and Tokio Marine Holdings of Japan. It is among the fastest growing private players in the life insurance sector in India. Edelweiss Tokio Life provides a host of life insurance products aimed at providing high returns, guaranteed interest payments, child education needs, retirement benefits etc. for customers across a wide spectrum.</p>

                                </div>
                            </div>
                        </TabPane>

                    </Tabs>
                </div> */}
                    <HistoryTabs />

                    <Col xs={22} sm={22} md={17} className="form-body his-container m0a">
                        {leadElement}
                        {appointmentElement}
                        {proposalElement}
                    </Col>
                </Row>
            }
        </div>
    </>
)
}

export default History

