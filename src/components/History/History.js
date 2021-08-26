import React from 'react'
import { Row, Col } from 'antd';
import '../History/History.css'

const History = () => {
    return (
        <div className="form-container">
            <Row gutter={['', 24]}>
                <Col className="contact-details " xs={22} sm={24} md={14} lg={14} xl={14} >
                    <div className="proposal">
                        <div className="bg-norecord">
                        </div>
                        <p className="norecord-title">No Records Found</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default History
