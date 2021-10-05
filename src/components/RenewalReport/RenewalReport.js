import React, { useState, useEffect } from 'react';
import './RenewalReport.css';
import { Row, Col, Typography, Divider, Card, Descriptions, Button, Carousel } from 'antd';
import { Select } from 'antd';
import axios from 'axios';
// import { Table } from 'antd';
const contentStyle = {
    height: '230px',
    width: '100%',
    background: 'rgb(206, 160, 225)',
};
const { Option } = Select;
const { Title } = Typography;
// const columns = [
//     {
//         title: 'Application No.',
//         dataIndex: 'name',
//     },
//     {
//         title: 'Policy Number',
//         dataIndex: 'age',
//     },
//     {
//         title: 'Branch Code',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Premium Amount',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Customer Name',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Mobile Number',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Email-Id',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Login Date',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Sum Insured',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Partner / Agent Name',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Type ',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Remarks',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Requirement Description',
//         dataIndex: 'address',
//     },
//     {
//         title: 'Date of File Update',
//         dataIndex: 'address',
//     },
// ];

const RenewalReport = () => {
    
    // const [fetchPendencyArr, setFetchPendencyArr] = useState([]);
    // useEffect(() => {
    //     axios.get("https://nodemanipalcigna.iorta.in/secure/sd/admin/fetchPendencyReport?BRMCode=AB0005")
    //         .then((res) => {
    //             console.log(res)
    //             setFetchPendencyArr(res.data.errMsg[0]);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])
    // console.log(fetchPendencyArr);

    // {"errCode":-1,"errMsg":[{"_id":"610a50ec85eac609e29061e3","biometric_login":false,"biometric_set_time":null,"primary_email":"Divya.jyothi@iorta.in","secondary_email":"usk@grr.la","secondary_mobile_no":"8748748578","first_name":"divya","last_name":"akula","agent_id":"AB0005","email":null,"password":"270448880d19a21eb4f03d3f33d88ef7f177ae54","salt":"4fbf37r2w4","dob":"08/26/1971","user_ratings":null,"mobile_no":"9987574946","emoployee_id":null,"country":null,"state":"Maharashtra","city":"Mumbai Subueban ","gender":"male","date_of_licence":null,"address":"govandi","address_line_2":null,"pancard_no":null,"pincode":400043,"enc_email":"9db93cf0feebb9975a7f73a66ee2a26e5abb6b9e963944ac9a2760add5a5f3994568036faa1c374479923b518ffaf1dc62ae12959cc61eda9e39a630de58e8ea4ae32799ad","linkUsed":true,"branch":null,"reporting_manager":{"_id":"610a50ec85eac609e29061e3","biometric_login":false,"biometric_set_time":null,"primary_email":"Divya.jyothi@iorta.in","secondary_email":"usk@grr.la","secondary_mobile_no":"8748748578","first_name":"divya","last_name":"akula","agent_id":"AB0005","email":null,"password":"270448880d19a21eb4f03d3f33d88ef7f177ae54","salt":"4fbf37r2w4","dob":"08/26/1971","user_ratings":null,"mobile_no":"9987574946","emoployee_id":null,"country":null,"state":"Maharashtra","city":"Mumbai Subueban ","gender":"male","date_of_licence":null,"address":"govandi","address_line_2":null,"pancard_no":null,"pincode":400043,"enc_email":"9db93cf0feebb9975a7f73a66ee2a26e5abb6b9e963944ac9a2760add5a5f3994568036faa1c374479923b518ffaf1dc62ae12959cc61eda9e39a630de58e8ea4ae32799ad","linkUsed":true,"branch":null,"reporting_manager":"610a50ec85eac609e29061e3","reporting_manager_hirarchy":"5e57cb06f292a551004d2fda","noOf_logins":116,"last_updated":null,"last_login":"2021-09-30T05:29:36.410Z","created_date":1627899262530,"updated_date":null,"active":1,"agentCode":null,"employeeCode":"5110352","joiningDate":"1539694717788","resetPasswordTime":null,"tempPassword":false,"branchCode":"BR001","channelCode":"5e57cb06f292a551004d2fd8","roleCode":"AG6337","hierarchy_id":"5e57cb06f292a551004d2fda","accessOpt":"5e57cb06f292a551004d2fd9","designation":"5e57cb06f292a551004d2fdf","profile_pic":null,"documentMasterId":null,"IFSC_Code":null,"bankName":null,"branchName":null,"bankCity":null,"bankState":null,"accountNo":null,"bankBranchName":null,"accountHolderName":null,"channel_default_user":false},"reporting_manager_hirarchy":"5e57cb06f292a551004d2fda","noOf_logins":116,"last_updated":null,"last_login":"2021-09-30T05:29:36.410Z","created_date":1627899262530,"updated_date":null,"active":1,"agentCode":null,"employeeCode":"5110352","joiningDate":"1539694717788","resetPasswordTime":null,"tempPassword":false,"branchCode":"BR001","channelCode":{"_id":"5e57cb06f292a551004d2fd8","active":1,"channelName":"test","created_by":"5d80e7f584dfaa4a37a6b722","channelCode":"CH1","updated_by":"5d80e7f584dfaa4a37a6b722","created_date":1582811910114},"roleCode":"AG6337","hierarchy_id":{"_id":"5e57cb06f292a551004d2fda","active":1,"hierarchyName":"Agent","levelCode":1,"created_by":"5d80e7f584dfaa4a37a6b722","created_date":1582811910226,"channelCode":"5e57cb06f292a551004d2fd8"},"accessOpt":"5e57cb06f292a551004d2fd9","designation":{"_id":"5e57cb06f292a551004d2fdf","active":1,"roleId":"AG6337","designatioName":"Agent","channelCode":"5e57cb06f292a551004d2fd8","hierarchyId":"5e57cb06f292a551004d2fda","created_date":1582811910228},"profile_pic":null,"documentMasterId":null,"IFSC_Code":null,"bankName":null,"branchName":null,"bankCity":null,"bankState":null,"accountNo":null,"bankBranchName":null,"accountHolderName":null,"channel_default_user":false},{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTBhNTBlYzg1ZWFjNjA5ZTI5MDYxZTMiLCJpYXQiOjE2MzI5Nzk4ODAsImV4cCI6MTYzMjk4MzQ4MH0.nVvzOMuKsTuAai_Aus2ieXsGBUISlY317u5eS19dg2I"},{"sData":"a8b06c95a1e69cbe0a367c9765a3ae5d56e769bff97062bde2177a88fde580a6083c573afc1a3e1079cc72578bfca3da38ad41cacf951bdac8"}],"dbDate":"Thu Sep 30 2021 05:31:20 GMT+0000 (Coordinated Universal Time)"}
    return (

        <Row type="flex" gutter={['', 24]}>
            {/* <div>
                {fetchPendencyArr.map((arr) => {
                    return <h4 key={arr.id}>{arr.policyNumber}</h4>;
                })}
            </div> */}
            <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                <Row type="flex" gutter={['', 24]}>
                    <Col className="card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                        <div className="Card">
                            <div className="pendency-main">
                                <Card style={contentStyle} >
                                    <h3 className="pendency-head3">BRM Code AB0005</h3>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12} md={4}>
                                            <div >
                                                <h4 className="pendency-head4">Filter by BusinessType</h4>
                                                <Select defaultValue="Select" style={{ width: 150, color: '#fff', fontSize: '20px' }} bordered={false}>
                                                    <Option value="Select">Select</Option>
                                                    <Option value="January">January</Option>
                                                    <Option value="February">February</Option>
                                                    <Option value="March">March</Option>
                                                    <Option value="April">April</Option>
                                                    <Option value="May">May</Option>
                                                    <Option value="June">June</Option>
                                                    <Option value="July">July</Option>
                                                    <Option value="August">August</Option>
                                                    <Option value="September">September</Option>
                                                    <Option value="October">October</Option>
                                                    <Option value="November">November</Option>
                                                    <Option value="December">December</Option>

                                                </Select>
                                            </div><hr />
                                            {/* <div> */}
                                                <h2>*Figures Displayed are in Lakhs</h2>
                                            {/* </div> */}
                                        </Col>
                                        {/* <Col xs={24} sm={12} md={4}>
                                            <div >
                                                <h4 className="pendency-head4">Filter by Remark</h4>
                                                <Select defaultValue="Select" style={{ width: 150, color: '#fff', fontSize: '20px' }} bordered={false}>
                                                    <Option value="Select">Select</Option>
                                                    <Option value="Customer Consent">Customer Consent</Option>
                                                    <Option value="UW Approval Require">UW Approval Require</Option>
                                                    <Option value="Add info Pending">Add info Pending</Option>
                                                    <Option value="Deficit Pending">Deficit Pending</Option>
                                                </Select>
                                            </div><hr />
                                        </Col>
                                        <Col xs={24} sm={12} md={4}>
                                            <div >
                                                <Button className="pendency-btn" shape="round">Reset Filter</Button>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </Card>
                            </div>
                            {/* <div >
                                <Table columns={columns} size="middle" scroll={{ x: '150vw' }} />
                            </div> */}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RenewalReport;