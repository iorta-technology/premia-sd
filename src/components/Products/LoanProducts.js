import React from 'react'
import './LoanProducts.css'
import { Row, Col,Button } from 'antd'

const LoanProducts = () => {
    return(
        <>
            <div className="header">
                <Row >
                    <Col><h1>Products</h1></Col>
                </Row>
                <div style={{padding: '0 3%',paddingBottom:'30px',marginLeft: '-15px'}}>
                        <Row className="tabs">
                            <Col span={4}><Button  className="primaryBtn">Loan Products</Button></Col>
                            <Col span={4}><Button  className="secondaryBtn">General Insurance</Button></Col>
                            <Col span={4}><Button  className="secondaryBtn">Group Health</Button></Col>
                        </Row>
                </div>
            </div>
        </>
    )

}

export default LoanProducts