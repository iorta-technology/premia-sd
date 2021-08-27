import React from 'react'
import { Row, Col,Button } from 'antd';
import {PlusCircleOutlined } from '@ant-design/icons'
import '../ProposalDetails/ProposalDetails.css'

const DocumentsUpload = () => {
    return (
        <div className="form-container">
            <Row gutter={['', 24]}>
                <Col className="contact-details " xs={22} sm={24} md={22} lg={22} xl={22} >
                    <div className="proposal">
                        <p className="proposal-title">Proposal Not Created Yet</p>
                        <div className="bg-proposal">
                        </div>
                        <Button type="primary" className="product-btn" size="large" icon={<PlusCircleOutlined size="large"/>}>Go To Product</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DocumentsUpload
