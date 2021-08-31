import React, { useState } from 'react'
import './StatusLead.css'
import { Row, Col, Form, Typography, Button, Input, Select, Cascader, DatePicker, Space, Modal } from 'antd';
import Tabs from '../../components/Tab/Tab'
import {useHistory} from 'react-router-dom';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const options = [
  {
    value: 'newleadentry',
    label: 'New Lead Entry',
  },
  {
    value: 'nocontact',
    label: 'No Contact',
    children: [
      {
        value: 'notreachable',
        label: 'Not Reachable',
        children: [
          {
            value: 'notreachable',
            label: 'Not Reachable',
          },
        ],
      },
      {
        value: 'ringingbusy',
        label: 'Ringing Busy',
        children: [
          {
            value: 'ringingbusy',
            label: 'Ringing Busy',
          },
        ],
      },
      {
        value: 'wrongnumber',
        label: 'Wrong Number',
        children: [
          {
            value: 'wrongnumber',
            label: 'Wrong Number',
          },
        ],
      },
      {
        value: 'invalidnumber',
        label: 'Invalid Number',
        children: [
          {
            value: 'invalidnumber',
            label: 'Invalid Number',
          },
        ],
      },
      {
        value: 'switchedoff',
        label: 'Switched Off',
        children: [
          {
            value: 'switchedoff',
            label: 'Switched Off',
          },
        ],
      },
    ],
  },
  {
    value: 'contact',
    label: 'Contact',
    children: [
      {
        value: 'appointment',
        label: 'Appointment',
        isSelected: true,
        children: [
          {
            value: 'clienthasgivenappointment',
            label: 'Client has given appointment',
          },
        ],
      },
      {
        value: 'callback',
        label: 'Callback',
        isSelected: false,
        children: [
          {
            value: 'customeraskedtocallbacklater',
            label: 'Customer asked to callback later',
          }
        ],
      },
      {
        value: 'followup',
        label: 'Follow-up',
        isSelected: false,
        children: [
          {
            value: 'metinfollowupforclosure',
            label: 'Met-in follow-up for closure',
          },
          {
            value: 'notmetrescheduleappointment',
            label: 'Not Met - Reschedule appointment',
          }
        ],
      },
      {
        value: 'shorthangup',
        label: 'Short hang up',
        children: [
          {
            value: 'shorthangup',
            label: 'Short hang up',
          },
        ],
      },
      {
        value: 'notinterested',
        label: 'Not interested',
        children: [
          {
            value: 'clientdeniedgivingappointment',
            label: 'Client denied giving appointment',
          },
          {
            value: 'metnotinterested',
            label: 'Met - not interested',
          },
        ],
      },
      {
        value: 'nonservicelocation',
        label: 'Non service location',
        children: [
          {
            value: 'nonservicelocation',
            label: 'Non service location',
          },
        ],
      },
      {
        value: 'noteligible',
        label: 'Not Eligible',
        children: [
          {
            value: 'noteligible',
            label: 'Not Eligible',
          },
        ],
      },
      {
        value: 'notavailable',
        label: 'Not Available',
        children: [
          {
            value: 'notreachable',
            label: 'Not Reachable',
          },
          {
            value: 'noanswer',
            label: 'No Answer',
          },
          {
            value: 'alwayswitchedoff',
            label: 'Alway Switched off',
          },
        ],
      },
      {
        value: 'converted',
        label: 'Converted',
        children: [
          {
            value: 'closedwithsuccess',
            label: 'Closed with success',
          },
        ],
      },
    ],
  },
];

const setTimeOptions = [
  { value: '08am', label: '08:00 AM' }, { value: '08:30am', label: '08:30 AM' },
  { value: '09am', label: '09:00 AM' }, { value: '09:30am', label: '09:30 AM' },
  { value: '10am', label: '10:00 AM' }, { value: '10:30am', label: '10:30 AM' },
  { value: '11am', label: '11:00 AM' }, { value: '11:30am', label: '11:30 AM' },
  { value: '12pm', label: '12:00 PM' }, { value: '12:30pm', label: '12:30 PM' },
  { value: 'pm', label: '01:00 PM' }, { value: 'pm', label: '01:30 PM' },
  { value: 'pm', label: '02:00 PM' }, { value: 'pm', label: '02:30 PM' },
  { value: 'pm', label: '03:00 PM' }, { value: 'pm', label: '03:30 PM' },
  { value: 'pm', label: '04:00 PM' }, { value: 'pm', label: '04:30 PM' },
  { value: 'pm', label: '05:00 PM' }, { value: 'pm', label: '05:30 PM' },
  { value: 'pm', label: '06:00 PM' }, { value: 'pm', label: '06:30 PM' },
  { value: 'pm', label: '07:00 PM' }, { value: 'pm', label: '07:30 PM' },
  { value: 'pm', label: '08:00 PM' }, { value: 'pm', label: '08:30 PM' },
  { value: 'pm', label: '09:00 PM' }, { value: 'pm', label: '09:30 PM' },
]

const setReminderOptions = [
  { value: 'none', label: 'None' }, { value: '5minbefore', label: '5 minutes before' },
  { value: '10minbefore', label: '10 minutes before' }, { value: '15minbefore', label: '15 minutes before' },
  { value: '30minbefore', label: '30 minutes before' }, { value: '1hoursbefore', label: '1 hours before' },
  { value: '2hoursbefore', label: '2 hours before' }, { value: '1daybefore', label: '1 day before' },
  { value: '2daysbefore', label: '2 days before' }, { value: '1weekbefore', label: '1 week before' },
]

const setStateOptions = [

  { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Dadra and Nagar Haveli", label: "Dadra and Nagar Haveli" },
  { value: "Daman and Diu", label: "Daman and Diu" },
  { value: "Delhi", label: "Delhi" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghala", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Puducherry", label: "Puducherry" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" }

]

const NewLead = React.memo(() => {

  const [leadSelect, setLeadSelect] = useState()

  // add team Member modal state control
  const [visibleTeamMemberModal, setVisibleTeamMemberModal] = useState(false);
  const [teamMemberLoading, setTeamMemberLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');

  // change owner Member modal state control
  const [visibleChangeOwnerMOdel, setVisibleChangeOwnerMOdel] = useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');


  const showTeamMemeberModal = () => {
    setVisibleTeamMemberModal(true);
  };

  const showChangeOwnerModal = () => {
    setVisibleChangeOwnerMOdel(true);
  };

  const handleAddMember = () => {
    // setModalText('Updating changes ');
    setTeamMemberLoading(true);
    setTimeout(() => {
      setVisibleTeamMemberModal(false);
      setTeamMemberLoading(false);
    }, 2000);
  };

  const handleChangeOwner = () => {
    // setModalText('Updating changes ');
    setChangeOwnerLoading(true);
    setTimeout(() => {
      setVisibleChangeOwnerMOdel(false);
      setChangeOwnerLoading(false);
    }, 2000);
  };

  const Append = (value) => {
    setLeadSelect(value[1])
  }
  let history=useHistory()
  const tabChangedHandler = ()=>{  
    console.log(this)
    history.push("/leadmasterpage/statuslead")
  }

  const tabMenu = [
    {
        id:1,
        value:"Status",
        // tabchangedHandler:()=>console.log('this')
        // history.push("/leadmasterpage/statuslead")
    },
    {
        id:2,
        value:"Lead Details"
    },
    {
        id:3,
        value:"Proposal Details"
    },
    {
        id:4,
        value:"Documents Upload"
    },
    {
      id:5,
      value:"History"
  },
    
]

 
  return (
    <>
      <Tabs tabMenu={tabMenu} header="New Lead" tabChangedHandler={tabChangedHandler}/>
      <div className="form-container">
        <Row gutter={[40, 24]} justify="center">
          <Col xs={{ order: 2 }} sm={14} md={14} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
            <Row gutter={['', 24]}>
              <Col className="contact-details" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                <p className="form-title">Contact Details</p>
                <Form layout="horizontal" className="contact-detail-form">
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name={['user', 'name']}
                      label="First Name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input className="first-name border-bottom" placeholder="Enter First Name" />
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name={['user', 'name']}
                      label="Surname"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input className="last-name border-bottom" placeholder="Enter Surname" />
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name={['email', 'address']}
                      label="Email Address"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input className="email border-bottom" placeholder="Enter Email Address" />
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name={['user', 'name']}
                      label="Primary Mobile"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input className="phone-no border-bottom" placeholder="Enter Primary Mobile" />
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="State"
                      label="State"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: 'Select your State!',
                        },
                      ]}
                    >
                      <Select options={setStateOptions} placeholder="Select Your State"></Select>
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="City"
                      label="City"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: 'Please select your city!',
                        },
                      ]}
                    >
                      <Select placeholder="Select a city">
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="Lead Type"
                      label="Lead Type"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: 'Select Lead Type',
                        },
                      ]}
                    >
                      <Select placeholder="New Bussiness">
                        <Option value="newbussiness">New Bussiness</Option>
                        <Option value="renewal">Renewal</Option>
                        <Option value="crosssell">Cross Sell</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="Product"
                      label="Product"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: 'Select Product',
                        },
                      ]}
                    >
                      <Select placeholder="Select Product">
                        <Option value="health">Health</Option>
                        <Option value="motor">Motor</Option>
                        <Option value="travel">Travel</Option>
                        <Option value="personalaccident">Personal Accident</Option>
                        <Option value="term">Term</Option>
                        <Option value="ulip">ULIP</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="Insurance Company"
                      label="Insurance Company"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: 'Insurance Company',
                        },
                      ]}
                    >
                      <Select placeholder="Insurance">
                        <Option value="tataaiggeneralinsurancecompany">Tata AIG General Insurance Company</Option>
                        <Option value="icicilombardgeneralinsurancecompany">ICICI Lombard General Insurance Company</Option>
                        <Option value="iciciprudentiallifeinsurancecompany">ICICI Prudential Life Insurance Company</Option>
                        <Option value="manipalcignahealthinsurancecompany">Manipal Cigna Health Insurance Company</Option>
                        <Option value="exidelifeinsurancecompanylimited">Exide Life Insurance Company Limited</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Form>
              </Col>
              <Col className="status" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                <p className="form-title">Status</p>
                <Form >
                  <Row gutter={16} className="mb-2">
                    <Col xs={24} sm={12} md={24} lg={12} xl={12} >
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="Lead Status"
                        label="Lead Status"
                      >
                        <Cascader
                          options={options}
                          placeholder="New Contact"
                          size="medium"
                          popupClassName="popup-size"
                          onChange={Append}
                        />
                      </Form.Item>
                    </Col>
                    {leadSelect === "appointment" || leadSelect === "callback" ?
                      <>
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Appointment Date"
                            label="Appointment Date"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: 'Appointment Date',
                              },
                            ]}
                          >
                            <Space direction="vertical" size={24}>
                              <DatePicker />
                            </Space>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Select Start Time"
                            label="Select Start Time"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: 'Select Start Time',
                              },
                            ]}
                          >
                            <Select options={setTimeOptions} placeholder="Start Time"></Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Set Reminder"
                            label="Set Reminder"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: 'Set Reminder',
                              },
                            ]}
                          >
                            <Select options={setReminderOptions} placeholder="Set Reminder"></Select>
                          </Form.Item>
                        </Col>
                      </>
                      : null}
                    <Col xs={24} sm={12} md={24} lg={12} xl={12} >
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name={['user', 'name']}
                        label="Remark From Source "
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Input className="email border-bottom" placeholder="Enter Some Remark" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12} className="mb-2">
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name={['user', 'name']}
                        label="Remark From User "
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Input className="email border-bottom" placeholder="Enter Some Remark" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="lead-manager">
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="lead-manager">
                      <p className="botton-label">Select the team members you want to involve for this lead</p>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className="lead-manager" style={{ marginLeft: "auto" }}>
                      <Button shape="round" size="large" block onClick={showTeamMemeberModal}>Add Team Member</Button>
                    </Col>
                    <>
                      <Modal
                        title="Add Team Member"
                        centered={true}
                        visible={visibleTeamMemberModal}
                        onOk={handleAddMember}
                        confirmLoading={teamMemberLoading}
                      // onCancel={handleCancel}
                      >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Select Designation"
                            label="Select Designation"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: 'Set Designation',
                              },
                            ]}
                          >
                            <Select options={setReminderOptions} placeholder="Set Designation"></Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Select Team Member"
                            label="Select Team Member"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: 'Set Reminder',
                              },
                            ]}
                          >
                            <Select options={setReminderOptions} placeholder="Set Team Member"></Select>
                          </Form.Item>
                        </Col>
                      </Modal>
                    </>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="lead-manager">
                      <p className="botton-label">Currently this lead is allocated to Self</p>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className="lead-manager" style={{ marginLeft: "auto" }}>
                      <Button shape="round" size="large" block onClick={showChangeOwnerModal}>Change Owner</Button>
                    </Col>
                    <>
                      <Modal
                        title="Allocate to"
                        centered={true}
                        visible={visibleChangeOwnerMOdel}
                        onOk={handleChangeOwner}
                        confirmLoading={changeOwnerLoading}
                      // onCancel={handleCancel}
                      >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Select Designation"
                            label="Select Designation"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: 'Set Designation',
                              },
                            ]}
                          >
                            <Select options={setReminderOptions} placeholder="Set Designation"></Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Select Team Member"
                            label="Select Team Member"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: 'Set Reminder',
                              },
                            ]}
                          >
                            <Select options={setReminderOptions} placeholder="Set Team Member"></Select>
                          </Form.Item>
                        </Col>
                      </Modal>
                    </>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xs={{ order: 1 }} sm={6} md={6} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
            <Row>
              <Col className="summary" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                <p className="form-title">Summary</p>
                <p>Fresh Lead</p>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">Lead ID</p>
                    <p className="lead-detail">L24105EC7</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">Source</p>
                    <p className="lead-detail">-</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">Name</p>
                    <p className="lead-detail">Azim Shaikh</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">Mobile Number</p>
                    <p className="lead-detail">9787659980</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">State</p>
                    <p className="lead-detail">Maharashtra</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">City</p>
                    <p className="lead-detail">Mumbai</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">Allocated To</p>
                    <p className="lead-detail">Himanshu</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12} >
                    <p className="lead-summ-label">Created on</p>
                    <p className="lead-detail">21/08/2021</p>
                    <p className="lead-date">2 days ago</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={{ order: 3 }} sm={20} md={20} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
            {window.innerWidth > 620 ?
              <Row>
                <Col className="btn-container" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                  <Button shape="round" size="large">Proceed</Button>
                  <Button shape="round" size="large">Submit</Button>
                </Col>
              </Row>
              :
              <Row gutter={['', { xs: 16 }]}>

                <Col xs={20} className="btn-center">
                  <Button className="cta-btn btn-color" shape="round" size="large" block>Proceed</Button>
                  <Button className="cta-btn btn-color" shape="round" size="large" block>Submit</Button>
                </Col>
                {/* <Col className="btn-container" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                        </Col>
                        <Col className="btn-container" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                        </Col> */}
              </Row>

            }
          </Col>
        </Row>
      </div>
    </>
  )
})

export default NewLead
