import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Steps, Timeline } from 'antd';
import './History.css'
import '../StatusLead/StatusLead.css'
import '../LeadDetails/LeadDetailsTab.css'
import Tabs from '../Tab/Tab'
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
    {
        id: 2,
        value: "Lead Details"
    },
    {
        id: 3,
        value: "Proposal Details"
    },
    {
        id: 4,
        value: "Documents Upload"
    },
    {
        id: 5,
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

    let leadElement = (
        // {
            // proposalArrObject !== null &&
            <>
                <h2 className="his-title m0a">Lead Data</h2>
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
                <h2 className="his-title m0a">Appointment Data</h2>
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

let proposalElement = (
    <>
        <h2 className="his-title m0a">Proposal Data</h2>
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
        <Tabs
            tabMenu={tabMenu}
            header="New Lead"
            detailsRouteTab={historyRoute}
            activeKey="5"

        />
        <div className="form-container">
            {!leadId ?
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

