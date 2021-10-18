import React, { useState, useEffect } from 'react';
import './RenewalReport.css';
import { Row, Col, Typography, Divider, Card, Descriptions, Button, Carousel } from 'antd';
import { Select, Table } from 'antd';
import axios from 'axios';
// import { Table } from 'antd';
const contentStyle = {
    height: '230px',
    width: '100%',
    background: 'rgb(206, 160, 225)',
};
const { option } = Select;
const { Title } = Typography;
const columns = [
    {
        title: '',
        dataIndex: '',
    },
    {
        title: 'Due',
        dataIndex: 'Due',
    },
    {
        title: 'Collection',
        dataIndex: 'Collection',
    },
    {
        title: 'Enforced',
        dataIndex: 'Enforced',
    },
    {
        title: 'Collection %',
        dataIndex: 'CollectionPer',
    },
    {
        title: 'Enforced %',
        dataIndex: 'EnforcedPer',
    },
    {
        title: 'Date of Update',
        dataIndex: 'DateofUpdate',
    }
];

const RenewalReport = () => {
    const [selectMonthOption, setSelectMonthOption] = useState("");
    const [fetchRenewalArr, setFetchRenewalArr] = useState([]);
    const [loading, setloading] = useState(true);

    const filterMonthFunc = (e) => {
        setSelectMonthOption(e.target.value)
    }
//    useEffect(() => {
//         getData();

//     }, [selectMonthOption]);
    useEffect(() => {
        axios.get(`https://nodemanipalcigna.iorta.in/secure/sd/admin/fetchRenewalReport/615d9024439d4731f410e65d?skip=0&month=${selectMonthOption}&BRMCode=82290`)
            .then((res) => {
                console.log(res)
                setFetchRenewalArr(
                    res.data ? res.data.errMsg[0]
                        .map(row => ({
                            Due: row.ThirteenthMonthDue,
                            Collection: row.ThirteenthMonthEnforced,
                            Enforced: row.ThirteenthMonthPaid,
                            CollectionPer: row.ThirteenthMonthEnforcedPercentage,
                            EnforcedPer: row.ThirteenthMonthPaidPercentage,
                            DateofUpdate: row.updatedDate,
                        }))
                        : null
                );
            })
            .catch((err) => {
                console.log(err)
            })
    }, [selectMonthOption])
    // const getData = async () => {
    //     await axios.get(`https://nodemanipalcigna.iorta.in/secure/sd/admin/fetchRenewalReport/615d9024439d4731f410e65d?skip=0&month=${selectMonthOption}&BRMCode=82290`)
    //         .then((res) => {
    //             setloading(false);
    //             console.log(res)
    //             setFetchRenewalArr(
    //                 res.data ? res.data.errMsg[0]
    //                     .map(row => ({
    //                         Due: row.ThirteenthMonthDue,
    //                         Collection: row.ThirteenthMonthEnforced,
    //                         Enforced: row.ThirteenthMonthPaid,
    //                         CollectionPer: row.ThirteenthMonthEnforcedPercentage,
    //                         EnforcedPer: row.ThirteenthMonthPaidPercentage,
    //                         DateofUpdate: row.updatedDate,
    //                     }))
    //                     : null
    //             );
    //         }
    //         );
    // };
    // console.log(fetchRenewalArr);
    function refreshPage() {
        window.location.reload(false);
    }
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
                                        <Col xs={24} sm={12} md={8}>
                                            <div >
                                                <h4 className="pendency-head4">Filter by BusinessType</h4>
                                                <select value={selectMonthOption} style={{ width: 150, color: '#000', fontSize: '20px' }} bordered={false} onChange={filterMonthFunc}>
                                                    <option value="">Select</option>
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                    <option value="June">June</option>
                                                    <option value="July">July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </select>
                                                {/* <Select defaultValue="Select" style={{ width: 150, color: '#fff', fontSize: '20px' }} bordered={false}>
                                                    <option value="Select">Select</option>
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                    <option value="June">June</option>
                                                    <option value="July">July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>

                                                </Select> */}
                                            </div><hr />
                                            {/* <div> */}
                                            <h2>*Figures Displayed are in Lakhs</h2>
                                            {/* </div> */}
                                        </Col>
                                        {/* <Col xs={24} sm={12} md={4}>
                                            <div >
                                                <h4 className="pendency-head4">Filter by Remark</h4>
                                                <Select defaultValue="Select" style={{ width: 150, color: '#fff', fontSize: '20px' }} bordered={false}>
                                                    <option value="Select">Select</option>
                                                    <option value="Customer Consent">Customer Consent</option>
                                                    <option value="UW Approval Require">UW Approval Require</option>
                                                    <option value="Add info Pending">Add info Pending</option>
                                                    <option value="Deficit Pending">Deficit Pending</option>
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
                            <div>
                                {loading ? (
                                    "Loading"
                                ) : (
                                    <Table
                                        columns={columns}
                                        dataSource={fetchRenewalArr}
                                        pagination={{ pageSize: 50 }}
                                        scroll={{ x: '150vw' }}
                                    />
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RenewalReport;