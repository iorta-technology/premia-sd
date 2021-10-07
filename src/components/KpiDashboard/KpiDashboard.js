import React,{useEffect} from 'react';
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
    dispatch(actions.kpiDashboard())
  },[dispatch])

  const kpi_data = useSelector((state) => state.kpiDashboard.kpi_data)
  const employee_data = kpi_data
  console.log("kpi-data",kpi_data)
  console.log("employee data",employee_data)
  let avatar = employee_data[0]?.data.first_name.match(/\b(\w)/g) + employee_data[0]?.data.last_name.match(/\b(\w)/g)
  let updatedDate = Moment(employee_data[1]?.data.uploadedDate).format("MM/DD/yyyy")
  let month =  Moment(employee_data[1]?.data.uploadedDate).format("MMM")
  let dataSource = []
  let dataSource1 = []
  dataSource = [... employee_data[3]?.data]
  dataSource1 = [... employee_data[2]?.data]

   
    const { Option } = Select;
    function onChange(value) {
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
        key: 'Period',
      },
      {
        title: 'Final Score',
        dataIndex: 'Final_Score',
        key: 'Final_Score',
      },
      {
        title: '% Change over last month',
        dataIndex: 'change_in_percent',
        key: '% Change over last month',
      },
    ];
    const columns1 = [
      {
        title: 'Period',
        dataIndex: 'month',
        key: 'Period',
      },
      {
        title: 'GPW(in ₹ Lac) Budget',
        dataIndex: 'sgpw_budget',
        key: 'gpw_budget',
      },
      {
        title: 'GPW(in ₹ Lac) Actual',
        dataIndex: 'sgpw_actual',
        key: 'gpw_actual',
      },
      {
        title: '% Achievement',
        dataIndex: 'sgpw_achievement',
        key: 'gpw_achievement',
      },
    ]
    const data = [
        { year: 'Aug', value: 50 },
        { year: 'Jul', value: 10 },
        { year: 'Jun', value: 50 },
        { year: 'May', value: 5 },
        { year: 'Apr', value: 40 },
        { year: 'Mar', value: 49 }
      ];
      const config = {
        data,
        xField: 'year',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
        },
        color: '#00ACC1'
      };
      const data1 = [
        {
          name: 'London',
          month: 'Jan.',
          value: 18.9,
        },
        {
          name: 'London',
          month: 'Feb.',
          value: 28.8,
        },
        {
          name: 'London',
          month: 'Mar.',
          value: 39.3,
        },
        {
          name: 'London',
          month: 'Apr.',
          value: 81.4,
        },
        {
          name: 'London',
          month: 'May',
          value: 47,
        },
        {
          name: 'London',
          month: 'Jun.',
          value: 20.3,
        },
        {
          name: 'London',
          month: 'Jul.',
          value: 24,
        },
        {
          name: 'London',
          month: 'Aug.',
          value: 35.6,
        },
        {
          name: 'Berlin',
          month: 'Jan.',
          value: 12.4,
        },
        {
          name: 'Berlin',
          month: 'Feb.',
          value: 23.2,
        },
        {
          name: 'Berlin',
          month: 'Mar.',
          value: 34.5,
        },
        {
          name: 'Berlin',
          month: 'Apr.',
          value: 99.7,
        },
        {
          name: 'Berlin',
          month: 'May',
          value: 52.6,
        },
        {
          name: 'Berlin',
          month: 'Jun.',
          value: 35.5,
        },
        {
          name: 'Berlin',
          month: 'Jul.',
          value: 37.4,
        },
        {
          name: 'Berlin',
          month: 'Aug.',
          value: 42.4,
        },
      ];
      const config1 = {
        data: data1,
        isGroup: true,
        xField: 'month',
        yField: 'value',
        seriesField: 'name',
        label: {
          position: 'middle',
          layout: [
            { type: 'interval-adjust-position' },
            { type: 'interval-hide-overlap' },
            { type: 'adjust-color' },
          ],
        },
        color: ['rgb(228, 106, 37)','#00ACC1']
      };
    return(
        <>
      <Row className="header">
        <Col><h1>KPI DASHBOARD</h1></Col>
      </Row>
      {/* 12 */}
      <div style={{padding: '0 3%',paddingBottom:'30px'}}>
      <Row className="tabs">
        <Col span={2}><Button className="primaryBtn" icon={<UserOutlined />}>Self</Button></Col>
        <Col span={2}><Button className="secondaryBtn" icon={<TeamOutlined />}>Team</Button></Col>
      </Row>
      <hr style={{marginBottom:'20px'}} />
      <Row  gutter={[10, 10]}>
        {/* 24 */}
        <Col span={2} className="card">
          <Row>
            <Col span={24}>
              <div className="profile">
                <h3 style={{color: '#fff',textTransform:'uppercase',fontWeight:'normal'}}>{avatar}</h3>
              </div>
            </Col>
            <Col className="userDetails" span={24}>
              <h5>{employee_data[0]?.data.first_name} {employee_data[0]?.data.last_name}</h5>
              <p style={{marginTop:'0px'}}>ID : <span>{employee_data[0]?.data.employeeCode}</span></p>
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
                    <p className='updatetitle' style={{margin:"0"}}>update as on {updatedDate}</p>
                    <p className='updatecount' style={{margin:"0"}}>{employee_data[1]?.data.GPW.gpw_actual}</p>
                    <p className='updatetotal' style={{margin:"0"}}>Total GWP in ₹ Lac</p>
                    </Col>
                    <Col span={8} offset={4}>
                    <p className="sidehead" style={{margin:"0"}}>MTD {month} {employee_data[1]?.data.year}</p>
                    <p className="updatestatus" style={{margin:"0"}}>Actual</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="detailsCard">
                  <Row>
                    <Col span={12}>
                    <p className='updatetitle' style={{margin:"0"}}>update as on {updatedDate}</p>
                    <p className='updatecount' style={{margin:"0"}}>{employee_data[1]?.data.parcentIssuance}</p>
                    <p className='updatetotal' style={{margin:"0"}}>% Issuance</p>
                    </Col>
                    <Col span={8} offset={4}>
                    <p className="sidehead" style={{margin:"0"}}>MTD {month} {employee_data[1]?.data.year}</p>
                    <p className="updatestatus" style={{margin:"0"}}>Actual</p>
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
                    <p className='updatetitle' style={{margin:"0"}}>update as on {updatedDate}</p>
                    <p className='updatecount' style={{margin:"0"}}>% {employee_data[1]?.data['Branch Activation'].branch_activation_actual}</p>
                    <p className='updatetotal' style={{margin:"0"}}>Active Branches</p>
                    </Col>
                    <Col span={8} offset={4}>
                    <p className="sidehead" style={{margin:"0"}}>MTD {month} {employee_data[1]?.data.year}</p>
                    <p className="updatestatus" style={{margin:"0"}}>Actual</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="detailsCard">
                  <Row>
                    <Col span={19}>
                    <p className='updatetitle' style={{margin:"0"}}>update as on {updatedDate}</p>
                    <p className='updatecount' style={{margin:"0"}}>% {employee_data[1]?.data.parcentPendancy}</p>
                    <p className='updatetotal' style={{margin:"0"}}>Pendancy(GWP Pendancy vs. GWP Ach)</p>
                    </Col>
                    <Col span={5}>
                    <p className="sidehead" style={{margin:"0",marginRight: '-10px'}}>MTD {month} {employee_data[1]?.data.year}</p>
                    <p className="updatestatus" style={{margin:"0"}}>Actual</p>
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
                    <p className='updatetitle' style={{margin:"0"}}>update as on {updatedDate}</p>
                    <p className='updatecount' style={{margin:"0"}}>{employee_data[1]?.data['GWP Retention'].gwp_retention_actual}</p>
                    <p className='updatetotal' style={{margin:"0"}}>Total GWP Retention in ₹</p>
                    </Col>
                    <Col span={8} offset={4}>
                    <p className="sidehead" style={{margin:"0"}}>MTD {month} {employee_data[1]?.data.year}</p>
                    <p className="updatestatus" style={{margin:"0"}}>Actual</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="detailsCard">
                  <Row>
                    <Col span={12}>
                    <p className='updatetitle' style={{margin:"0"}}>update as on {updatedDate}</p>
                    <p className='updatecount' style={{margin:"0"}}>{employee_data[1]?.data.parcentUnallocated}</p>
                    <p className='updatetotal' style={{margin:"0"}}>GWP Unallocated in ₹</p>
                    </Col>
                    <Col span={8} offset={4}>
                    <p className="sidehead" style={{margin:"0"}}>MTD {month} {employee_data[1]?.data.year}</p>
                    <p className="updatestatus" style={{margin:"0"}}>Actual</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-around" style={{marginTop:"10px"}}  gutter={16}>
        <Col span={7} className="graph">
          <div style={{padding:"15px"}}>
          <h4>FINAL KPI SCORE %</h4>
          <hr/>
            </div>
            <div style={{padding:'10px'}}>
            <Column {...config} />
            </div>
            {/* graph */}
            <Table pagination={false} columns={columns} dataSource={dataSource1} />
        </Col>
        <Col span={8} style={{marginLeft:"10px"}} className="graph">
        <div style={{padding:"15px"}}>
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
    <Option value="GPW" active>GPW</Option>
    <Option value="Branch Activation">Branch Activation</Option>
    <Option value="NOP Retention">NOP Retention</Option>
    <Option value="NOP Retention">GWP Retention</Option>
    <Option value="Dummy">Dummy</Option>
  </Select>
        </div>
        {/* graph */}
        <div style={{padding:'10px'}}>
        <Column {...config1} />
        </div>
        <Table pagination={false} columns={columns}  />
        </Col>
        <Col span={8} style={{marginLeft:"10px"}} className="graph">
        <div style={{padding:"15px"}}>
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

        <Table className="rms" pagination={false} columns={columns} dataSource={dataSource} />

        </Col>
      </Row>
      </div>
    </>
    )
}

export default KpiDashboard;