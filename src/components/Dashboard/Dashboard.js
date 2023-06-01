import React, { useState, useEffect } from 'react'
import './Dashboard.css';
import { Row, Col, Form, Select, Button, DatePicker, Divider } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { CloudUploadOutlined } from '@ant-design/icons';

import axios from 'axios';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
function onChange(date, dateString) {
    console.log(date, dateString);
}

const Dashboard = () => {
    const info = {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'red',
                'blue',
                'yellow'
            ]
        }],
        labels: [
            "Red",
            "Yellow",
            "Blue"
        ],

    };
    let doughnutData = [];
    const [campaign, setCampaign] = useState([]);
    const [affilate, setAffilate] = useState([]);
    const [source, setSource] = useState([]);
    const [status, setStatus] = useState([]);
    const [achievement, setAchievement] = useState([]);
    const [percentage, setPercentage] = useState([]);
    const [chart, setData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'red',
                'blue',
                'yellow'
            ]
        }],
        labels: [
            "Red",
            "Yellow",
            "Blue"
        ],
    });
    const [lead, setLead] = useState({
        datasets: [{
            data: [10, 20, 30, 40],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'pink'
            ]
        }],
        labels: [
            "Red",
            "Yellow",
            "Blue",
            "pink"
        ],
    });
    const [contacted, setContacted] = useState({
        datasets: [{
            data: [10, 20, 30, 40],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'pink'
            ]
        }],
        labels: [
            "Red",
            "Yellow",
            "Blue",
            "pink"
        ],
    });
    const [metlead, setMetLead] = useState({
        datasets: [{
            data: [10, 20, 30, 40],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'pink'
            ]
        }],
        labels: [
            "Red",
            "Yellow",
            "Blue",
            "pink"
        ],
    });

    useEffect(() => {
        axios.get('https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard/dropdown-data/5dea47485523a955bbf953a3?fromDate=12/01/2019&toDate=12/31/2019')
            .then((output) => {
                console.log("output", output)
                console.log(output.data.errMsg[0].campaignName);
                let responseData = output.data.errMsg[0].campaignName
                setCampaign(
                    responseData
                );
                console.log("user data", campaign)
            })

            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        axios.get('https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard/dropdown-data/5dea47485523a955bbf953a3?fromDate=12/01/2019&toDate=12/31/2019')
            .then((output) => {
                console.log(output.data.errMsg[0].affiliateName);
                let responseData = output.data.errMsg[0].affiliateName
                setAffilate(
                    responseData
                );
                console.log("user data", affilate)
            })

            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        axios.get('https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard/dropdown-data/5dea47485523a955bbf953a3?fromDate=12/01/2019&toDate=12/31/2019')
            .then((output) => {
                console.log(output.data.errMsg[0].leadSourceName);
                let responseData = output.data.errMsg[0].leadSourceName
                setSource(
                    responseData
                );
                console.log("user data", source)
            })

            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        axios.get('https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard/dropdown-data/5dea47485523a955bbf953a3?fromDate=12/01/2019&toDate=12/31/2019')
            .then((output) => {
                console.log(output.data.errMsg[0].leadDisposition);
                let responseData = output.data.errMsg[0].leadDisposition
                setStatus(
                    responseData
                );
                console.log("user data", status)
            })

            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        axios.get('https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard/dropdown-data/5dea47485523a955bbf953a3?fromDate=12/01/2019&toDate=12/31/2019')
            .then((output) => {
                console.log(output.data.errMsg[0].achievementCount);
                let responseData = output.data.errMsg[0].achievementCount
                setAchievement(
                    responseData
                );
                console.log("user data", achievement)
            })

            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        axios.get('https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard/dropdown-data/5dea47485523a955bbf953a3?fromDate=12/01/2019&toDate=12/31/2019')
            .then((output) => {
                console.log(output.data.errMsg[0].campaignName);
                let responseData = output.data.errMsg[0].campaignName
                setCampaign(
                    responseData
                );
                console.log("user data", campaign)
            })

            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        const getData = () => {
            axios.get("https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard-ratio/5df77e6a2b5ffa6c72ae1a0e?fromDate=01/01/2021&toDate=01/01/2022")
                .then((res) => {
                    //     const response = data.json();
                    //     return response;
                    // }).then((response) => {
                    console.log("data", res);

                    let leadData = res.data.errMsg[0].leadData
                    const keyNamesArr = Object.keys(leadData);
                    console.log("keynamesOfobj", keyNamesArr)
                    const keyValuesArr = Object.values(leadData);
                    console.log("valuenamesOfobj", keyValuesArr)
                    let collectData = keyNamesArr + " " + keyValuesArr;
                    console.log(keyNamesArr, keyValuesArr);
                    let oneLead = [];
                    let twoLead = [];
                    for (var j of collectData) {
                        oneLead.push(j.keyNamesArr);
                        twoLead.push(j.keyValuesArr);
                    }
                    console.log(oneLead, twoLead);
                    setLead(
                        {
                            datasets: [{
                                data: keyValuesArr,
                                backgroundColor: [
                                    'navy',
                                    'blue',
                                    'gold',
                                    'pink',
                                    'green'
                                ]
                            }],
                            labels: keyNamesArr,
                        }
                    )

                }).catch(e => {
                    console.log("error occured", e);
                })
        }
        getData();
    }, [])

    useEffect(() => {
        const fetchData = () => {
            axios.get("https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard-ratio/5df77e6a2b5ffa6c72ae1a0e?fromDate=01/01/2021&toDate=01/01/2022")
                .then((res) => {
                    //     const response = data.json();
                    //     return response;
                    // }).then((response) => {
                    console.log("data", res);

                    let contactedLeadData = res.data.errMsg[0].contactedLeadData
                    console.log(contactedLeadData);
                    const keyNameArr = Object.keys(contactedLeadData);
                    console.log("keynamesOfobj", keyNameArr)
                    const keyValueArr = Object.values(contactedLeadData);
                    console.log("valuenamesOfobj", keyValueArr)
                    let collectList = keyNameArr + " " + keyValueArr;
                    console.log(keyNameArr, keyValueArr);


                    let threeLead = [];
                    let fourLead = [];

                    for (var k of collectList) {
                        threeLead.push(k.keyNameArr);
                        fourLead.push(k.keyValueArr);
                    }
                    console.log(threeLead, fourLead);
                    setContacted(
                        {
                            datasets: [{
                                data: keyValueArr,
                                backgroundColor: [
                                    'brown',
                                    'gold',
                                    'pink',
                                    'green'
                                ]
                            }],
                            labels: keyNameArr,
                        }
                    )
                }).catch(e => {
                    console.log("error occured", e);
                })
        }
        fetchData();
    }, [])
    useEffect(() => {
        const listData = () => {
            axios.get("https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard-ratio/5df77e6a2b5ffa6c72ae1a0e?fromDate=01/01/2021&toDate=01/01/2022")
                .then((res) => {
                    //     const response = data.json();
                    //     return response;
                    // }).then((response) => {
                    console.log("data", res);

                    let metLeadData = res.data.errMsg[0].metLeadData
                    console.log(metLeadData);
                    const keyNameArray = Object.keys(metLeadData);
                    console.log("keynamesOfobj", keyNameArray)
                    const keyValueArray = Object.values(metLeadData);
                    console.log("valuenamesOfobj", keyValueArray)
                    let dataList = keyNameArray + " " + keyValueArray;
                    console.log(keyNameArray, keyValueArray);


                    let fiveLead = [];
                    let sixLead = [];

                    for (var k of dataList) {
                        fiveLead.push(k.keyNameArray);
                        sixLead.push(k.keyValueArray);
                    }
                    console.log(fiveLead, sixLead);
                    setMetLead(
                        {
                            datasets: [{
                                data: keyValueArray,
                                backgroundColor: [
                                    'brown',
                                    'gold',
                                    'pink',
                                    'brown',
                                    'green',
                                    'blue'
                                ]
                            }],
                            labels: keyNameArray,
                        }
                    )
                }).catch(e => {
                    console.log("error occured", e);
                })
        }
        listData();
    }, [])

    return (
        <Row type="flex" gutter={[20, 14]}>
            <Col xs={{ order: 1 }} sm={22} md={22} lg={{ order: 1 }} xl={{ order: 1 }} span={24}>
                <Row type="flex" gutter={[8, 8]}>
                    <Col className="dashboard-main" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                        <Form layout='horizontal' className='contact-detail-form'>
                            <Col xs={12} sm={8} md={6} lg={4}><div >
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="City"
                                    label="From"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select date',
                                        },
                                    ]}
                                >
                                    <DatePicker onChange={onChange} style={{ width: '15vw' }} placeholder="dd/mm/yyyy" />
                                </Form.Item>
                            </div></Col>
                            <Col xs={12} sm={8} md={6} lg={4}><div >
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="City"
                                    label="To"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select date',
                                        },
                                    ]}
                                >
                                    <DatePicker onChange={onChange} style={{ width: '15vw' }} placeholder="dd/mm/yyyy" />
                                </Form.Item>
                            </div></Col>
                            <Col xs={12} sm={8} md={6} lg={4}><div >
                                {/* <div className='div1'> */}
                                <Button className='export-btn'>
                                    <CloudUploadOutlined
                                        rotate="0"
                                        style={{
                                            fontSize: "16px",
                                            paddingTop: "2px"

                                        }}
                                    />Export To Excel</Button>
                                {/* </div> */}
                            </div></Col>
                        </Form>
                    </Col>
                </Row>
            </Col>
            <Col xs={{ order: 2 }} sm={22} md={22} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                <Row type="flex" gutter={['', 10]}>
                    <Col className="dashboard-mains" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>

                        <Form layout="horizontal" className="contact-detail-form">
                            <Col>
                                <h4 className='dashboard-head4'>LEAD</h4>
                                <div style={{ width: '80%', height: '80%' }}>
                                    <Doughnut data={lead}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    labels: {
                                                        color: "black",
                                                        font: {
                                                            size: 11
                                                        },
                                                        padding: 25,
                                                        usePointStyle: true,
                                                    },

                                                    position: "right"

                                                },

                                            },

                                        }}


                                    />
                                </div>
                            </Col>
                            <div className="vl"></div>
                            <Col>
                                <h4 className='dashboard-head4'>CONTACTED</h4>
                                <div style={{ width: '80%', height: '80%' }}>
                                    <Doughnut data={contacted}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    labels: {
                                                        color: "black",
                                                        font: {
                                                            size: 11
                                                        },

                                                        padding: 25,
                                                        usePointStyle: true,
                                                    },

                                                    position: "right"

                                                },

                                            },

                                        }}


                                    />
                                </div>
                            </Col>
                            <div className="vl"></div>
                            <Col>
                                <h4 className='dashboard-head4'>MET</h4>
                                <div style={{ width: '80%', height: '80%' }}>
                                    <Doughnut data={metlead}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    labels: {
                                                        color: "black",
                                                        font: {
                                                            size: 11
                                                        },

                                                        padding: 25,
                                                        usePointStyle: true,
                                                    },

                                                    position: "right"

                                                },

                                            },

                                        }}


                                    />
                                </div>
                            </Col>
                        </Form>

                    </Col>
                </Row>
            </Col>
            <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={24}>
                <Row gutter={['', 10]}>
                    <Col className="table-main" xs={22} sm={22} md={22} lg={22} xl={22} span={22}>
                        <table>
                            <tr>
                                <th className='dashboard-title'>Campaign</th>
                                <th className='dashboard-title'>Affilate</th>
                                <th className='dashboard-title'>Source</th>
                                <th className='dashboard-title'>Status</th>
                                <th className='dashboard-title'>Achievement</th>
                                <th className='dashboard-title'>Percentage</th>
                            </tr>
                            <tr>
                                <td >
                                    <div >
                                        <Select placeholder="-- Select --" style={{ width: "12vw" }}>
                                            {
                                                campaign.map(campaignlist =>
                                                    <option >{campaignlist}</option>
                                                )
                                            }
                                        </Select>
                                    </div>
                                </td>
                                <td>
                                    <Select placeholder="-- Select --" style={{ width: "12vw" }}>
                                        {
                                            affilate.map(affilatelist =>
                                                <option >{affilatelist}</option>
                                            )
                                        }
                                    </Select>
                                </td>
                                <td>
                                    <Select placeholder="-- Select --" style={{ width: "12vw" }}>
                                        {
                                            source.map(sourcelist =>
                                                <option >{sourcelist}</option>
                                            )

                                        }
                                    </Select>
                                </td>
                                <td>
                                    <Select placeholder="-- Select --" style={{ width: "12vw" }}>
                                        {
                                            status.map(statuslist =>
                                                <option >{statuslist}</option>
                                            )

                                        }
                                    </Select>
                                </td>
                                <td>
                                    <Select placeholder="-- Select --" style={{ width: "12vw" }}>

                                        {
                                            achievement.map(achievementlist =>
                                                <option >{achievementlist}</option>
                                            )

                                        }
                                    </Select>
                                </td>
                                <td>
                                    <Select placeholder="-- Select --" style={{ width: "12vw" }}>
                                        {
                                            campaign.map(campaignlist =>
                                                <option >{campaignlist}</option>
                                            )

                                        }
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </table>

                    </Col>
                </Row>
            </Col>
            {/* <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={24}>
                <Row type="flex" gutter={[8, 8]}>
                    <Col className="dashboard-main" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                        <Form layout='horizontal' className='contact-detail-form'>
                            <Col xs={12} sm={8} md={6} lg={4}><div >
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="City"
                                    label="To"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select date',
                                        },
                                    ]}
                                >
                                    <DatePicker onChange={onChange} style={{ width: '15vw' }} placeholder="dd/mm/yyyy" />
                                </Form.Item>
                            </div></Col>
                            <Col xs={12} sm={8} md={6} lg={4}><div >
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="City"
                                    label="To"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select date',
                                        },
                                    ]}
                                >
                                    <DatePicker onChange={onChange} style={{ width: '15vw' }} placeholder="dd/mm/yyyy" />
                                </Form.Item>
                            </div></Col>
                            <Col xs={12} sm={8} md={6} lg={4}><div >
                                <div className='div1'>
                                    <Button className='export-btn'>Export To Excel</Button>
                                </div>
                            </div></Col>
                        </Form>
                    </Col>
                </Row>
            </Col> */}
        </Row >

    )

}


export default Dashboard;
