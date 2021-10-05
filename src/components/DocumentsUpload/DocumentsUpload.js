import React from 'react'
import { Row, Col, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import '../ProposalDetails/ProposalDetails.css'
import Tabs from '../Tab/Tab'

let docUploadRoute = "/leadmasterpage/leadmasterdoc/leaddoc"
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
const DocumentsUpload = () => {
    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={docUploadRoute}
                activeKey="4"

            />
            <div className="form-container">
                <Row gutter={['', 24]}>
                    <Col className="form-body m0a" xs={22} sm={24} md={16} lg={16} xl={16} >
                        <div className="proposal">
                            <p className="proposal-title">Proposal Not Created Yet</p>
                            <div className="bg-proposal">
                            </div>
                            <Button type="primary" className="product-btn" size="large" icon={<PlusCircleOutlined size="large" />}>Go To Product</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DocumentsUpload
