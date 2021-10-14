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
import {dataFormatting} from '../../helpers'
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
    const historyDetailsArr = useSelector((state)=>state.history.history)

    const [leadId, setleadId] = useState(storeLeadId)
    const [userId, setuserId] = useState(storeUserId)
    const dispatch = useDispatch()

    let timelineElement = (
        <>
            <h2 className="his-title m0a">Lead Data</h2>
            <Timeline className="p20">
                <Timeline.Item color="red">
                    <p className="ml10 timeline-title">New Lead Created</p>
                    <Row className="timeline-desc">
                        <Col xs={22} sm={22} md={12} className="ml10 ">
                            <p>Azim shaikh  7452163985 </p>
                        </Col>
                        <Col xs={22} sm={22} md={11} className="time-content">
                            <p>Ashraf</p>
                            <p>7/10/2021, 3:01:14 pm</p>
                        </Col>
                    </Row>
                </Timeline.Item>
                <Timeline.Item color="red">
                    <p className="ml10 ">New Lead Created</p>
                    <Row className="timeline-desc">
                        <Col xs={22} sm={22} md={12} className="ml10">
                            <p>Azim shaikh  7452163985 </p>
                        </Col>
                        <Col xs={22} sm={22} md={11} className="time-content">
                            <p>Ashraf</p>
                            <p>7/10/2021, 3:01:14 pm</p>
                        </Col>
                    </Row>
                </Timeline.Item>
            </Timeline>
        </>
    )


    if(!_.isEmpty(historyDetailsArr)){
        for(let historydetail of historyDetailsArr ){
            if('AppointmetData' in historydetail){
            }else{
                if(historydetail.status==='newleadentery'){
                    let desc = historydetail.Details1 + ' '+ historydetail.Details2.split('|')[0]
                    historydetail.allocated ? console.log(dataFormatting(historydetail, 'Lead Allocated', desc)) : dataFormatting(historydetail, 'New Lead Created', desc)
                }
            }
        }
    }
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
                                <h2 className="his-title m0a">Lead Data</h2>
                                <Timeline className="p20">
                                    <Timeline.Item color="red">
                                        <p className="ml10 timeline-title">New Lead Created</p>
                                        <Row className="timeline-desc">
                                            <Col xs={22} sm={22} md={12} className="ml10 ">
                                                <p>Azim shaikh  7452163985 </p>
                                            </Col>
                                            <Col xs={22} sm={22} md={11} className="time-content">
                                                <p>Ashraf</p>
                                                <p>7/10/2021, 3:01:14 pm</p>
                                            </Col>
                                        </Row>
                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p className="ml10 ">New Lead Created</p>
                                        <Row className="timeline-desc">
                                            <Col xs={22} sm={22} md={12} className="ml10">
                                                <p>Azim shaikh  7452163985 </p>
                                            </Col>
                                            <Col xs={22} sm={22} md={11} className="time-content">
                                                <p>Ashraf</p>
                                                <p>7/10/2021, 3:01:14 pm</p>
                                            </Col>
                                        </Row>
                                    </Timeline.Item>
                                </Timeline>
                                {timelineElement}
                            </Col>
                        </Row>
                    }
            </div>
        </>
    )
}

export default History

