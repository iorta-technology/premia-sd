import React, { useState, useEffect } from 'react';
import './SalesPendency.css';
import { Row, Col, Typography, Divider, Card, Descriptions, Button, Carousel } from 'antd';
import { Select } from 'antd';
import axios from 'axios';
import { Table } from 'antd';
const contentStyle = {
    height: '230px',
    width: '100%',
    background: 'rgb(206, 160, 225)',
};
const { Option } = Select;
const { Title } = Typography;
const columns = [
    {
        title: 'Application No.',
        dataIndex: 'ApplicationNo',
    },
    {
        title: 'Policy Number',
        dataIndex: 'PolicyNumber',
    },
    {
        title: 'Branch Code',
        dataIndex: 'BranchCode',
    },
    {
        title: 'Premium Amount',
        dataIndex: 'PremiumAmount',
    },
    {
        title: 'Customer Name',
        dataIndex: 'CustomerName',
    },
    {
        title: 'Mobile Number',
        dataIndex: 'MobileNumber',
    },
    {
        title: 'E-Mail-Id',
        dataIndex: 'Emailid',
    },
    {
        title: 'Login Date',
        dataIndex: 'LoginDate',
    },
    {
        title: 'Sum Insured',
        dataIndex: 'SumInsured',
    },
    {
        title: 'Partner / Agent Name',
        dataIndex: 'PartnerAgentName',
    },
    {
        title: 'Type ',
        dataIndex: 'Type',
    },
    {
        title: 'Remarks',
        dataIndex: 'Remarks',
    },
    {
        title: 'Requirement Description',
        dataIndex: 'RequirementDescription',
    },
    {
        title: 'Date of File Update',
        dataIndex: 'DateofFileUpdate',
    },
];

const SalesPendency = () => {
    const [selectBusinessOption, setSelectBusinessOption] = useState("");
    const [fetchPendencyArr, setFetchPendencyArr] = useState([]);
    const [loading, setloading] = useState(true);
    const filterBusinessFunc = (e) => {
        setSelectBusinessOption(e.target.value)
        axios.get(`https://nodemanipalcigna.iorta.in/secure/sd/admin/fetchPendencyReport?BRMCode=AB0005&bussiness_type=${e.target.value}`)
            .then((res) => {
                setloading(false);
                console.log(res)
                setSelectBusinessOption(
                    res.data.errMsg[0].filter((fileArr) => {
                        // if (selectBusinessOption == "") {
                        //     return fileArr
                        // }
                        if (selectBusinessOption != "") {
                            return fileArr.Type
                                .toLowerCase()
                                .includes(selectBusinessOption.toLowerCase());

                        } else {
                            return fileArr;
                        }
                    })
                        .map(row => ({
                            ApplicationNo: row.applicationNo,
                            PolicyNumber: row.policyNumber,
                            BranchCode: row.branchCode,
                            PremiumAmount: row.PremiumAmount,
                            CustomerName: row.customerName,
                            MobileNumber: row.mobileNumber,
                            Emailid: row.emailAddress,
                            LoginDate: row.loginDate,
                            SumInsured: row.sumInsured,
                            PartnerAgentName: row.partner_slash_agent_name,
                            Type: row.bussinessType,
                            Remarks: row.remarks,
                            RequirementDescription: row.requirementDescription,
                            DateofFileUpdate: row.updatedDate
                            // id: row.id
                        }))

                );
            })
        // console.log(e.target.value)

    }

    // const businessTypeFun = (setSelectBusinessOption) => {

    // }
    useEffect(() => {
        getData();

    }, []);
    // console.log(fetchPendencyArr);
    const getData = async () => {
        await axios.get("https://nodemanipalcigna.iorta.in/secure/sd/admin/fetchPendencyReport?BRMCode=AB0005")
            .then((res) => {
                setloading(false);
                console.log(res)
                setFetchPendencyArr(
                    res.data.errMsg[0].filter((fileArr) => {
                        // if (selectBusinessOption == "") {
                        //     return fileArr
                        // }
                        if (selectBusinessOption != "") {
                            return fileArr.Type
                                .toLowerCase()
                                .includes(selectBusinessOption.toLowerCase());

                        } else {
                            return fileArr;
                        }
                    })
                        .map(row => ({
                            ApplicationNo: row.applicationNo,
                            PolicyNumber: row.policyNumber,
                            BranchCode: row.branchCode,
                            PremiumAmount: row.PremiumAmount,
                            CustomerName: row.customerName,
                            MobileNumber: row.mobileNumber,
                            Emailid: row.emailAddress,
                            LoginDate: row.loginDate,
                            SumInsured: row.sumInsured,
                            PartnerAgentName: row.partner_slash_agent_name,
                            Type: row.bussinessType,
                            Remarks: row.remarks,
                            RequirementDescription: row.requirementDescription,
                            DateofFileUpdate: row.updatedDate
                            // id: row.id
                        }))

                );
            }
            );
    };
    console.log(fetchPendencyArr);
    // fetchPendencyArr.filter((fileArr) => {

    //     if (selectRemarkOption != "All Remarks") {
    //         return fileArr.remarks
    //             .toLowerCase()
    //             .includes(selectRemarkOption.toLowerCase());
    //     } else {
    //         return fileArr;
    //     }
    // }).map((mapArr) => {

    // })
    function refreshPage() {
        window.location.reload(false);
      }
    return (

        <Row type="flex" gutter={['', 24]}>
            {/* <div>
                {loading ? (
                    "Loading"
                ) : (
                    <Table
                        columns={columns}
                        dataSource={fetchPendencyArr}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                )}
            </div> */}
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
                                    <h3 className="pendency-head3">BRM Code AB0005</h3><br />
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12} md={4}>
                                            <div >
                                                <h4 className="pendency-head4">Filter by BusinessType</h4>
                                                <select value={selectBusinessOption} style={{ width: 150, color: '#000', fontSize: '20px' }} bordered={false} onChange={filterBusinessFunc}>
                                                    <option value="">Select</option>
                                                    <option value="New Business">New Business</option>
                                                    <option value="Renewal">Renewal</option>
                                                    {/* <option value="audi">Audi</option> */}
                                                </select>
                                                {/* <Select defaultValue="Select" style={{ width: 150, color: '#fff', fontSize: '20px' }} bordered={false} onChange={FilterRemarkFunc}>
                                                    <Option value="Select">Select</Option>
                                                    <Option value="New Business">New Business</Option>
                                                    <Option value="Renewal">Renewal</Option>
                                                </Select> */}
                                            </div><hr />
                                        </Col>
                                        <Col xs={24} sm={12} md={4}>
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
                                                <Button className="pendency-btn" shape="round" onClick={refreshPage}>Reset Filter</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div>
                                {loading ? (
                                    "Loading"
                                ) : (
                                    <Table
                                        columns={columns}
                                        dataSource={fetchPendencyArr}
                                        pagination={{ pageSize: 50 }}
                                        scroll={{ x: '150vw' }}
                                    />
                                )}
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

export default SalesPendency;