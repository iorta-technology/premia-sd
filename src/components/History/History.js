import React from 'react'
import { Row, Col } from 'antd';
import './History.css'
import Tabs from '../Tab/Tab'

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
                    <Col className="form-body m0a" xs={22} sm={24} md={16} lg={16} xl={16} >
                        <div className="proposal">
                            <div className="bg-norecord">
                            </div>
                            <p className="norecord-title">No Records Found</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default History
