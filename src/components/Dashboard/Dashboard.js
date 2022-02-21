// import React, { useState, useEffect } from 'react'
import React, { Component } from 'react';
import './Dashboard.css';
import { Row, Col, Form, Tooltip, Button, DatePicker } from 'antd';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Progress } from 'antd';
import axios from 'axios';
import Chart from 'react-apexcharts';

// ChartJS.register(
//     PointElement,
//     CategoryScale,
//     LinearScale,
//     LineElement
// )

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
export class Dashboard extends Component {
    render() {

        return (
            <div>

            </div>

        )

    } 
    constructor(props) {

        super(props);

        this.state = {
            Data: {}
        };

    }

    componentDidMount() {
        this.getChartData();
    }
    getChartData() {
        // axios.get("http://www.json-generator.com/api/json/get/coXIyroYAy?indent=2")
        axios.get("http://www.json-generator.com/api/json/get/coXIyroYAy?indent=2")
            .then(res => {

                // console.log(res);

                const coin = res.data;

                let labels = coin.chartData.labels;

                let data = coin.chartData.datasets.data;

                // coin.forEach(element => {

                //     labels.push(element.labels);

                //     data.push(element.data);

                // });
                // console.log(coin)
                this.setState({
                    chartData: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Population",
                                data: data,
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.6)",
                                    "rgba(54, 162, 235, 0.6)",
                                    "rgba(255, 99, 132, 0.6)"
                                ],
                            }
                        ]
                    }

                });

            });

    }
    // const Dashboard = () => {
    // const [chart, setChart] = useState([]);
    //     useEffect(() => {
    //         axios.get("https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard-ratio/5df77e6a2b5ffa6c72ae1a0e?fromDate=01/01/2021&toDate=01/01/2022")
    //             .then((res) => {
    //                console.log(res.data.errMsg[0], 'response here')
    //                 setChart(
    //                     res.data.errMsg[0]
    //                 );
    //             }).catch(error => {
    //                 console.log(error);
    //             })
    //     }, []);
    //     console.log("chart", chart);
    //     var data = {
    //         labels: chart?.data?.errMsg[0]?.leadData.map(x => x.contactedLeads),
    //         datasets: [{
    //             label: `${chart?.data?.errMsg[0]?.leadData.length} Leads Available`,
    //             data: chart?.data?.errMsg[0]?.leadData.map(x => x.openLeads),
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     }

    //     var options = {
    //         maintainAspectRatio: false,

    //         legend: {
    //             labels: {
    //                 fontSize: 25
    //             }
    //         }
    //     }

    render() {
        // progressChartArr.map((item) => {
        return (
            <Row>
                <div>
                    {Object.keys(this.state.chartData).length &&
                        <Doughnut 
                            chartData={this.state.chartData}
                            options={{maintainAspectRatio: false}}
                        />
                    }
                </div>
                {/* <Line
                options={options}
                data={data}
                height={200}
            /> */}
                {/* <Col xs={{ order: 1 }} sm={22} md={22} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 10]}>
                        <Col className="dashboard-main" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col>
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
                                        <DatePicker onChange={onChange} style={{ width: '25vw' }} placeholder="dd/mm/yyyy" />
                                    </Form.Item>
                                </Col>
                                <Col>
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
                                        <DatePicker onChange={onChange} style={{ width: '25vw' }} placeholder="dd/mm/yyyy" />
                                    </Form.Item>
                                </Col>
                                <div >
                                    <Button className='export-btn'>Export To Excel</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 2 }} sm={22} md={22} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                    <Row gutter={['', 10]}>
                        <Col className="dashboard-main" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <h4 className='dashboard-head4'>LEAD</h4>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col>
                                    <Tooltip >
                                        <Progress percent={60} success={{ percent: 20 }} danger={{ percent: 10 }} type="circle" />
                                    </Tooltip>
                                </Col>
                                <Col>
                                    <Tooltip >
                                        <Progress percent={60} success={{ percent: 20 }} danger={{ percent: 10 }} type="circle" />
                                    </Tooltip>
                                </Col>
                                <Col>
                                    <Tooltip >
                                        <Progress percent={60} success={{ percent: 20 }} percent={20} type="circle" />
                                    </Tooltip>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                </Col> */}
            </Row>

        )
        // })
    }
}

export default Dashboard;