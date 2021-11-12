import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Moment from "moment";
import './KpiDashboard.css';
import { Row, Col } from 'antd'
import { Button } from 'antd';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Table, Tag, Space } from 'antd';
import { Select } from 'antd';
import { Column } from '@ant-design/charts';

const KpiDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.kpiDashboard(finalKpiDataDropdown))
  }, [dispatch])

  const [finalKpiDataDropdown, setFinalKpiDataDropdown] = useState(['GPW']);

  const kpi_data = useSelector((state) => state.kpiDashboard.kpi_data)
  const employee_data = kpi_data
  let avatar = employee_data[0]?.data.first_name.match(/\b(\w)/g) + employee_data[0]?.data.last_name.match(/\b(\w)/g)
  let updatedDate = Moment(employee_data[1]?.data.uploadedDate).format("MM/DD/yyyy")
  let month = Moment(employee_data[1]?.data.uploadedDate).format("MMM")
  const [finalKpiData, setFinalKpiData] = useState([]);
  const [finalKpiConfig, setFinalKpiConfig] = useState(null);

  const [finalBudgetData, setFinalBudgetData] = useState([]);
  const [finalBudgetConfig, setFinalBudgetConfig] = useState(null);


  useEffect(() => {
    setTimeout(() => {
      const kpiDataObj = employee_data ? employee_data.filter((item => item.id == "final_score_last_two_month")) : [];
      let kpiData = kpiDataObj[0]?.data ? [...kpiDataObj[0]?.data] : []
      kpiData = kpiData.map((item) => ({
        ...item,
        finalScore: parseInt(item.Final_Score || 0)
      }))
      setFinalKpiConfig({
        data: kpiData,
        xField: 'month',
        yField: 'finalScore',
        point: {
          size: 5,
          shape: 'diamond',
        },
        color: '#00ACC1'
      })
      setFinalKpiData(kpiData);



      const kpiBudget = employee_data ? employee_data.filter((item => item.id == "GPW_last_two_month")) : [];
      let data = kpiBudget[0]?.data ? [...kpiBudget[0]?.data] : [];

      data = data.map((item => ({
        ...item,
        ...item.GPW
      })))
      console.log(data)
      const budgetConfigDat=[];
      data.forEach((item=>{
        budgetConfigDat.push({
          name:'gpw_budget',
          val:parseInt(item.gpw_budget),
          month:item.month
        })
        budgetConfigDat.push({
          name:'gpw_actual',
          val:parseInt(item.gpw_actual),
          month:item.month
        })
       
      }))
      console.log(budgetConfigDat)
      setFinalBudgetConfig({
        data: budgetConfigDat,
        isGroup: true,
        xField: 'month',
        yField: 'val',
        seriesField: 'name',
        
        color: ['rgb(228, 106, 37)','#00ACC1']
      })
      setFinalBudgetData(data);

    })
  }, [employee_data])


  const { Option } = Select;
  function onChange(value) {
    setFinalKpiDataDropdown(value)
    dispatch(actions.kpiDashboard(finalKpiDataDropdown))
    console.log(`selected ${value}`);

  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  const columns = [
    {
      title: 'Period',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Final Score',
      dataIndex: 'Final_Score',
      key: 'Final_Score',
    },
    {
      title: '% Change over last month',
      dataIndex: 'change_in_percent',
      key: 'change_in_percent',
    },
  ];
  const columns1 = [
    {
      title: 'Period',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'GPW(in ₹ Lac) Budget',
      dataIndex: 'gpw_budget',
      key: 'gpw_budget',
    },
    {
      title: 'GPW(in ₹ Lac) Actual',
      dataIndex: 'gpw_actual',
      key: 'gpw_actual',
    },
    {
      title: '% Achievement',
      dataIndex: 'gpw_achievement',
      key: 'gpw_achievement',
    },
  ]
  const columns2 = [
    {
      title: 'CSM Name',
      dataIndex: 'csmName',
      key: 'csmName',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Final KPI Score %',
      dataIndex: 'value',
      key: 'value',
    },
  ]

  const data2 = [
    { csmName: 'Calvin Robert', city: 'Mumbai', value: 56 },
  ];
  return (
    <>
      <Row className="header">
        <Col><h1>KPI DASHBOARD</h1></Col>
      </Row>
      {/* 12 */}
      <div style={{ padding: '0 3%', paddingBottom: '30px' }}>
        <Row className="tabs">
          <Col span={2}><Button className="primaryBtn" icon={<UserOutlined />}>Self</Button></Col>
          <Col span={2}><Button className="secondaryBtn" icon={<TeamOutlined />}>Team</Button></Col>
        </Row>
        <hr style={{ marginBottom: '20px' }} />
        <Row gutter={[10, 10]}>
          {/* 24 */}
          <Col span={2} className="card">
            <Row>
              <Col span={24}>
                <div className="profile">
                  <h3 style={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'normal' }}>{avatar}</h3>
                </div>
              </Col>
              <Col className="userDetails" span={24}>
                <h5>{employee_data[0]?.data.first_name} {employee_data[0]?.data.last_name}</h5>
                <p style={{ marginTop: '0px' }}>ID : <span>{employee_data[0]?.data.employeeCode}</span></p>
              </Col>
            </Row>
          </Col>
          <Col span={22}>
            <Row className="detailsCards" gutter={[10, 13]}>
              <Col span={8}>
                <Row gutter={[10, 13]}>
                  <Col span={24} className="detailsCard">
                    <Row>
                      <Col span={12}>
                        <p className='updatetitle' style={{ margin: "0" }}>update as on {updatedDate}</p>
                        <p className='updatecount' style={{ margin: "0" }}>{employee_data[1]?.data?.GPW?.gpw_actual}</p>
                        <p className='updatetotal' style={{ margin: "0" }}>Total GWP in ₹ Lac</p>
                      </Col>
                      <Col span={8} offset={4}>
                        <p className="sidehead" style={{ margin: "0" }}>MTD {month} {employee_data[1]?.data.year}</p>
                        <p className="updatestatus" style={{ margin: "0" }}>Actual</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} className="detailsCard">
                    <Row>
                      <Col span={12}>
                        <p className='updatetitle' style={{ margin: "0" }}>update as on {updatedDate}</p>
                        <p className='updatecount' style={{ margin: "0" }}>{employee_data[1]?.data.parcentIssuance}</p>
                        <p className='updatetotal' style={{ margin: "0" }}>% Issuance</p>
                      </Col>
                      <Col span={8} offset={4}>
                        <p className="sidehead" style={{ margin: "0" }}>MTD {month} {employee_data[1]?.data.year}</p>
                        <p className="updatestatus" style={{ margin: "0" }}>Actual</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={8} >
                <Row className="detailsCards" gutter={[10, 13]}>
                  <Col span={24} className="detailsCard">
                    <Row>
                      <Col span={12}>
                        <p className='updatetitle' style={{ margin: "0" }}>update as on {updatedDate}</p>
                        <p className='updatecount' style={{ margin: "0" }}>% {employee_data[1]?.data['Branch Activation'].branch_activation_actual}</p>
                        <p className='updatetotal' style={{ margin: "0" }}>Active Branches</p>
                      </Col>
                      <Col span={8} offset={4}>
                        <p className="sidehead" style={{ margin: "0" }}>MTD {month} {employee_data[1]?.data.year}</p>
                        <p className="updatestatus" style={{ margin: "0" }}>Actual</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} className="detailsCard">
                    <Row>
                      <Col span={19}>
                        <p className='updatetitle' style={{ margin: "0" }}>update as on {updatedDate}</p>
                        <p className='updatecount' style={{ margin: "0" }}>% {employee_data[1]?.data.parcentPendancy}</p>
                        <p className='updatetotal' style={{ margin: "0" }}>Pendancy(GWP Pendancy vs. GWP Ach)</p>
                      </Col>
                      <Col span={5}>
                        <p className="sidehead" style={{ margin: "0", marginRight: '-10px' }}>MTD {month} {employee_data[1]?.data.year}</p>
                        <p className="updatestatus" style={{ margin: "0" }}>Actual</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={8} >
                <Row className="detailsCards" gutter={[10, 13]}>
                  <Col span={24} className="detailsCard">
                    <Row>
                      <Col span={12}>
                        <p className='updatetitle' style={{ margin: "0" }}>update as on {updatedDate}</p>
                        <p className='updatecount' style={{ margin: "0" }}>{employee_data[1]?.data['GWP Retention'].gwp_retention_actual}</p>
                        <p className='updatetotal' style={{ margin: "0" }}>Total GWP Retention in ₹</p>
                      </Col>
                      <Col span={8} offset={4}>
                        <p className="sidehead" style={{ margin: "0" }}>MTD {month} {employee_data[1]?.data.year}</p>
                        <p className="updatestatus" style={{ margin: "0" }}>Actual</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} className="detailsCard">
                    <Row>
                      <Col span={12}>
                        <p className='updatetitle' style={{ margin: "0" }}>update as on {updatedDate}</p>
                        <p className='updatecount' style={{ margin: "0" }}>{employee_data[1]?.data.parcentUnallocated}</p>
                        <p className='updatetotal' style={{ margin: "0" }}>GWP Unallocated in ₹</p>
                      </Col>
                      <Col span={8} offset={4}>
                        <p className="sidehead" style={{ margin: "0" }}>MTD {month} {employee_data[1]?.data.year}</p>
                        <p className="updatestatus" style={{ margin: "0" }}>Actual</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="space-around" style={{ marginTop: "10px" }} gutter={16}>
          <Col span={7} className="graph">
            <div style={{ padding: "15px" }}>
              <h4>FINAL KPI SCORE %</h4>
              <hr />
            </div>
            <div style={{ padding: '10px' }}>
              {finalKpiConfig&&(<Column {...finalKpiConfig} />)}
              
            </div>
            {/* graph */}
            <Table pagination={false} columns={columns} dataSource={finalKpiData} />
          </Col>
          <Col span={8} style={{ marginLeft: "10px" }} className="graph">
            <div style={{ padding: "15px" }}>
              <h4>KPI (BUDGET VS ACHIEVEMENT)</h4>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="GPW" active={true}>GPW</Option>
                <Option value="Branch Activation">Branch Activation</Option>
                <Option value="NOP Retention">NOP Retention</Option>
                <Option value="GWP Retention">GWP Retention</Option>
                <Option value="Dummy">Dummy</Option>
              </Select>
            </div>
            {/* graph */}
            <div style={{ padding: '10px' }}>
              {finalBudgetConfig&&(<Column {...finalBudgetConfig} />)}
            </div>
            <Table pagination={false} columns={columns1} dataSource={finalBudgetData} />
          </Col>
          <Col span={8} style={{ marginLeft: "10px" }} className="graph">
            <div style={{ padding: "15px" }}>
              <Row justify="space-between">
                <Col> <h4>LIST OF RMs</h4></Col>
                <Col>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Top 10">Top 10</Option>
                    <Option value="Bottom 10">Bottom 10</Option>
                  </Select>
                </Col>
              </Row>

            </div>

            <Table className="rms" pagination={false} columns={columns2} dataSource={data2} />

          </Col>
        </Row>
      </div>
    </>
  )
}

export default KpiDashboard;