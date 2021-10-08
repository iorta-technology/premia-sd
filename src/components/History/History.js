import React from 'react'
import { Row, Col,Steps,Divider } from 'antd';

import './History.css'
import '../StatusLead/StatusLead.css'
import Tabs from '../Tab/Tab'
import HistoryTabs from './HistoryTabs'
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
    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={historyRoute}
                activeKey="5"

            />
            <div className="form-container">
                <Row gutter={['', 24]}>
                    <Col xs={24} sm={22} md={4} offset={2}>
                        <HistoryTabs  />
                    </Col>
                    {/* <Col className="form-body m0a" xs={22} sm={24} md={16} lg={16} xl={16} >
                        <div className="proposal">
                            <div className="bg-norecord">
                            </div>
                            <p className="norecord-title">No Records Found</p>
                        </div>
                    </Col> */}
                    <Col xs={22} sm={22} md={16} offset={4} className="form-body m0a his-container">
                        <h2 className="his-title m0a">Lead Data</h2>
                        <Steps progressDot current={1} direction="vertical"   className="p40" >
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                        </Steps>
                        <h2 className="his-title m0a">Lead Data</h2>
                        <Steps progressDot current={1} direction="vertical"  className="p40">
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                        </Steps>
                        <h2 className="his-title m0a">Lead Data</h2>
                        <Steps progressDot current={1} direction="vertical"  className="p40">
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                        </Steps>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default History
