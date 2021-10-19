import React,{useEffect} from 'react';
import { Card, Col, Row,Avatar } from 'antd';
import { Button } from 'antd';
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons';
import './RenewalDetails.css';
const RenewalDetails = () => {
    let fullName = 'shiva kumar'
    let avatar = fullName.match(/\b(\w)/g)
    const showContent = ()=>{

        console.log("content hide and show")
    }
    return (
        <>
            <div className="header">
            <Row >
                <Col><h1>Shiva kumar</h1></Col>
            </Row>
            <div style={{padding: '0 3%',paddingBottom:'30px',marginLeft: '-5px'}}>
                    <Row className="tabs">
                        <Col span={4}><Button className="primaryBtn" icon={< FileTextOutlined style={{color:'#00ACC1'}}  />}>Update Renewal Status</Button></Col>
                        <Col span={4}><Button className="secondaryBtn" icon={<PlusOutlined style={{color:'#00ACC1'}} />}>Add as Cross Sell Lead</Button></Col>
                    </Row>
                </div>
            </div>
            <div className="site-card-wrapper" style={{padding:'10px'}}>
                <Row gutter={16}>
                <Col span={8}>
                    <Card className="main-cards">
                    <p>Personal Details</p>
                    <div className="avatar-and-status">
                        <Avatar size={{xl: 50}}>{avatar}</Avatar>
                        <span>shiva kumar</span>
                        <br/>
                        <span>Proposer ID (PROHLR1221)</span>
                    </div>
                    <p>Telephone No : -</p>
                    <hr/>
                    <p>Mobile No. : 8989898989</p>
                    <hr/>
                    <p>Email ID : -</p>
                    <hr/>
                    <p>Date of Birth : invalid date</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="main-cards">
                    <p>Policy Details</p>
                    <p>BRM_Code  : AB0005</p>
                    <p>Partners / Distributor Name : Bank of Maharashtra</p>
                    <p>Policy Servicing Branch : Apna Bank73</p>
                    <p>Zone : ZONE1</p>
                    <p>Proposer_ID : PROHLR1221</p>
                    <p>Policy No : PROHLR1221</p>
                    <p>Product Category : IPMI</p>
                    <p>Policy Type : Individual</p>
                    <p>Policy Status : Lapsed</p>
                    <p>Claim Flag : NO</p>
                    <p>Current Sum Assured : 100000</p>
                    <p>Cumulative Bonus : -</p>
                    <p>Renewal Time : 1</p>
                    <p>Payment Link : <a href="https://google.com" /></p>
                    <p>Last Yr - Net Premium : 5708</p>
                    <p>Policy Start Date : 21-02-2020</p>
                    <p>Policy End Date : 22-03-2021</p>
                    <p>Renewal Start Date : 22-03-2021</p>
                    <p>Grace End Date : 31-07-2021</p>
                    <p>Recurring payment flag :  No</p>
                    <p>Premium for 1 Year : 6160</p>
                    <p>Premium for 2 Years : 11575</p>
                    <p>Premium for 3 Year : 17167</p>
                    <p>Upsell flag : 0</p>
                    <p>Premium for level 1 Upsell : -</p>
                    <p>Premium for level 2 Upsell : -</p>
                    <p>Next best offer : Super Top Up</p>
                    <a onClick={showContent}>show less</a>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="main-cards">
                    <p>Recommended Products</p>
                    <p>Recommended Product 1 : Super Top Up</p>
                    <p>Recommended Product 2 : -</p>
                    </Card>
                    <Card className="main-cards" style={{marginTop:'15px'}}>
                    <p>Address Details</p>
                    <p>Address Line 1 : MORAJ COMPLEX RIVER SIDE PARK</p>
                    <p>Address Line 2 : 0</p>
                    <p>City : MAHARASHTRA</p>
                    <p>Pincode : 410206</p>
                    </Card>
                </Col>
                </Row>
            </div>
     
        </>
    )
}

export default RenewalDetails;