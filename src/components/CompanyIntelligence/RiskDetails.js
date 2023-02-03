import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Radio,
  Tabs,
  Form,
  Input,
  Select,
  Button,
  Divider,
  Typography,
  Modal,
  DatePicker,
  Tooltip,
} from "antd";
import "../StatusLead/StatusLead.css";
import * as actions from "../../store/actions/history";
import _ from "lodash";
import { dataFormatting } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";
import {
  PlusOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  HomeFilled,
  EditOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const tabMenu = [
  {
    id: 1,
    value: "Opportunity Details",
  },
  {
    id: 2,
    value: "Company Intelligence",
  },
  {
    id: 3,
    value: "History",
  },
];

const RiskDetails = () => {
  // const storeLeadId = useSelector((state) => state.newLead.leadId)
  // const storeUserId = useSelector((state) => state.newLead.userId)
  // const dispatch = useDispatch()
  const [noOfEntities, setNoOfEntities] = useState("");
  const [productNameData, setProductNameData] = useState("");
  const [totalPremData, setTotalPremData] = useState("");
  const [tagicPresence, setTagicPresence] = useState("");
  const [tagicPremium, setTagicPremium] = useState("");
  const [leadrFollowerData, setLeadrFollowerData] = useState("");
  const [leadInsurerData, setLeadInsurerData] = useState("");
  const [leaderShareData, setLeaderShareData] = useState("");
  const [inceptionDateData, setInceptionDateData] = useState("");
  const [riskDataArr, setRiskDataArr] = useState([]);

  const [showRiskDetailsPopup, setShowRiskDetailsPopup] = useState(false);

  let { innerWidth: width, innerHeight: height } = window;
  const { TabPane } = Tabs;
  const [tabPosition, setTabPosition] = useState(
    width <= "374"
      ? "top"
      : width <= "424"
      ? "top"
      : width <= "767"
      ? "top"
      : width <= "1023"
      ? "top"
      : "left"
  );

  const breakpoint = 620;
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const kdmRoleArr = [{ label: "TBI", value: "TBI" }];

  // let riskDataArr = [
  //     {
  //         riskName:'JSW Steels',
  //         riskType:'Risk 1',
  //         totalPrem:'100',
  //         tagicPresence:'0',
  //         leadInsurer:'ICICI',
  //         leaderShare:'40%',
  //     },
  // ]

  // useEffect(() => {

  // }, []);
  const onChangeLeaderFollowerData = (event) => {
    // console.warn('(((((LEADER FOLLOWER ))))) -------->>>>',event)
    setLeadrFollowerData(event);
  };

  const onChangeIncepDate = (date, dateString) => {
    // console.warn('setInceptionDateData-------->>>>',date)
    // console.warn('(((((dateString))))) -------->>>>',dateString)
    setInceptionDateData(dateString);
  };

  const submitRiskDetails = (event) => {
    // console.warn('(((((RISK editIndex Befff ))))) -------->>>>',editIndex)

    // setShowRiskDetailsPopup(false)
    // console.warn('(((((RISK Details ))))) -------->>>>',riskDataArr)

    if (editIndex !== "") {
      riskDataArr[editIndex].riskType = noOfEntities;
      riskDataArr[editIndex].riskName = productNameData;
      riskDataArr[editIndex].totalPrem = totalPremData;
      riskDataArr[editIndex].tagicPresence = tagicPresence;
      riskDataArr[editIndex].leadInsurer = leadInsurerData;
      riskDataArr[editIndex].leaderShare = leaderShareData;
      riskDataArr[editIndex].tagicPremium = tagicPremium;
      riskDataArr[editIndex].leaderFollower = leadrFollowerData;
      riskDataArr[editIndex].inceptionDate = inceptionDateData;
    } else {
      let _data = {
        riskName: !productNameData ? "-" : productNameData,
        riskType: !noOfEntities ? "-" : noOfEntities,
        totalPrem: !totalPremData ? "0" : totalPremData,
        tagicPresence: !tagicPresence ? "0" : tagicPresence,
        leadInsurer: !leadInsurerData ? "-" : leadInsurerData,
        leaderShare: !leaderShareData ? "0" : leaderShareData,

        tagicPremium: !tagicPremium ? "" : tagicPremium,
        leaderFollower: !leadrFollowerData ? "" : leadrFollowerData,
        inceptionDate: !inceptionDateData ? "" : inceptionDateData,
      };

      setRiskDataArr([...riskDataArr, _data]);
    }

    setRiskDataArr([...riskDataArr, _data]);
    setShowRiskDetailsPopup(false);
    // console.warn('(((((RISK Details ))))) -------->>>>',riskDataArr)
  };

  const updateRiskDetails = (event) => {
    let _riskDetailsData = [];
    riskDataArr.map((el) => {
      // console.warn('(((((el Details ))))) -------->>>>',el)
      let _data = {
        total_entities: el.riskType,
        product_name: el.riskName,
        total_premium: el.totalPrem,
        tagic_presence_percentage: el.tagicPresence,
        tagic_premium: el.tagicPremium,
        leader: el.leaderFollower,
        lead_insurer: el.leadInsurer,
        leader_share: el.leaderShare,
        inception_date: el.inceptionDate,
      };
      _riskDetailsData.push(_data);
    });
    // console.warn('_riskDetailsData ------>>>>>',_riskDetailsData)

    // let formBody = {
    //     ...props.updateFormData,
    //     risk_details: _riskDetailsData,
    // }

    let formBody = {
      company_details: {
        company_name: _StoreData?.company_id?.company_name,
        parent_company: _StoreData?.company_id?.parent_company,
        industry_name: _StoreData?.company_id?.industry_name,
        tata_aig_empaneled:
          _StoreData?.company_id?.tata_aig_empaneled === true ? "Yes" : "No",
        client_location: _StoreData?.company_id?.client_location,
      },
      leadStatus: _StoreData?.leadStatus,
      leadDisposition: _StoreData?.leadDisposition,
      leadsubDisposition: _StoreData?.leadsubDisposition,
      opportunity_name: _StoreData?.opportunity_name,
      tender_driven: _StoreData?.tender_driven === true ? "Yes" : "No",
      LOB_opportunity: _StoreData?.lob_for_opportunity,
      product_for_opportunity: _StoreData?.product_for_opportunity,
      remarks: _StoreData?.remarks,
      teamMembers: "[]",
      lead_Owner_Id: user_id,
      lead_Creator_Id: user_id,
      user_id: user_id,
      company_id: _StoreData?.company_id?._id,
      start_date: _StoreData?.start_date,
      start_time: _StoreData?.start_time,
      client_expectations: _StoreData?.client_expectations,
      red_flags: _StoreData?.red_flags,
      our_ask: _StoreData?.our_ask,
      channel_name: _StoreData?.channel_name,
      producer: _StoreData?.producer,
      VAS_executed: !_StoreData?.VAS_executed
        ? "Yes"
        : _StoreData?.VAS_executed,
      kdm_details: _StoreData?.company_id?.kdm_details,
      risk_details: _riskDetailsData,
    };
    console.warn("formBody ------>>>>>", formBody);
    dispatch(actions.fetchLeadUpdateBody(formBody));
    dispatch(actions.editLead(formBody, props.leadDetails));
  };

  const deleteRisk = (event, ind) => {
    let _riskArr = riskDataArr.filter((el) => el.riskType !== event.riskType);
    setRiskDataArr([..._riskArr]);
  };

  const editRisk = (event, ind) => {
    console.warn("(((((RISK Details EDIT ))))) -------->>>>", event);

    setShowRiskDetailsPopup(true);

    setNoOfEntities(event.riskType);
    setProductNameData(event.riskName);
    setTotalPremData(event.totalPrem);
    setTagicPresence(event.tagicPresence);
    setTagicPremium(event.tagicPremium);
    setLeadrFollowerData(event.leaderFollower);
    setLeadInsurerData(event.leadInsurer);
    setLeaderShareData(event.leaderShare);
    setInceptionDateData(moment(event.inceptionDate, "MM/DD/YYYY"));

    form.setFieldsValue({
      nameOfentity: event.riskType,
      productName: event.riskName,
      totPrem: event.totalPrem,
      tagicPresence: event.tagicPresence,
      tagicPremium: event.tagicPremium,
      leadrFollowr: event.leaderFollower,
      leadeInsurer: event.leadInsurer,
      leaderShare: event.leaderShare,
      incepDate: moment(event.inceptionDate, "MM/DD/YYYY"),
    });
    // const [editIndex, setEditIndex] = useState('');
  };

  return (
    <>
      <Col
        className="form-body ci-p20 mb-2"
        xs={24}
        sm={24}
        md={16}
        lg={15}
        xl={21}
        span={23}
      >
        <p className="form-title">Risk Details</p>
        <Row
          gutter={16}
          className="mb-2 statsLead kdmStyle"
          style={{ padding: 15 }}
          justify="space-between"
        >
          {riskDataArr.length > 0 &&
            riskDataArr.map((el, index) => (
              <div className="risk-card-det">
                <Row
                  style={{ padding: 20, alignItems: "center" }}
                  justify="space-between"
                >
                  <Row style={{ alignItems: "center" }}>
                    <div className="risk-profile" style={{}}>
                      <HomeFilled style={{ fontSize: 25, color: "#00acc1" }} />
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      <p
                        className="risk-profile-name"
                        style={{ marginBottom: 0 }}
                      >
                        {el.riskName}
                      </p>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "darkslategrey" }}
                      >
                        {el.riskType}
                      </p>
                    </div>
                  </Row>
                  <div>
                    <DeleteOutlined
                      style={{ fontSize: 25, color: "indianred" }}
                      onClick={() => deleteRisk(el, index)}
                    />
                  </div>
                </Row>
                <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                <div style={{ padding: 15 }}>
                  <Row style={{ alignItems: "center" }} justify="space-between">
                    <div style={{ flex: 1 }}>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "darkslategrey" }}
                      >
                        Total Premium
                      </p>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "grey" }}
                      >
                        {el.totalPrem}
                      </p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "darkslategrey" }}
                      >
                        Tagic Presence %
                      </p>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "grey" }}
                      >
                        {el.tagicPresence}
                      </p>
                    </div>
                  </Row>
                  <Row
                    style={{ alignItems: "center", marginTop: 20 }}
                    justify="space-between"
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "darkslategrey" }}
                      >
                        Lead Insurer
                      </p>
                      <Tooltip placement="top" title={el.leadInsurer}>
                        <p
                          className="form-title"
                          style={{
                            marginBottom: 0,
                            color: "grey",
                            width: 170,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {el.leadInsurer}
                        </p>
                      </Tooltip>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "darkslategrey" }}
                      >
                        Leader Share %
                      </p>
                      <p
                        className="form-title"
                        style={{ marginBottom: 0, color: "grey" }}
                      >
                        {el.leaderShare}
                      </p>
                    </div>
                  </Row>
                </div>
                <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                <Row
                  onClick={() => editRisk(el, index)}
                  style={{
                    alignItems: "center",
                    padding: 10,
                    cursor: "pointer",
                  }}
                  justify="center"
                >
                  <EditOutlined
                    style={{ fontSize: 16, color: "darkslategrey" }}
                  />
                  <Text style={{ marginLeft: 5, color: "darkslategrey" }}>
                    Edit
                  </Text>
                </Row>
              </div>
            ))}

          <div
            className="risk-add"
            onClick={() => setShowRiskDetailsPopup(true)}
          >
            <PlusCircleOutlined style={{ fontSize: 40 }} />
            <p
              className="form-title"
              style={{ color: "black", marginBottom: 0, marginTop: 10 }}
            >
              ADD RISK DETAILS
            </p>
          </div>
        </Row>
        {/* <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
                </div> */}
      </Col>

      <Modal
        title="Risk Details"
        centered={true}
        visible={showRiskDetailsPopup}
        width={700}
        className="modalStyle"
        onCancel={() => setShowRiskDetailsPopup(false)}
        footer={null}
      >
        <Col className="mb-2" xs={24} sm={24} md={16} lg={15} xl={24} span={23}>
          <Row gutter={16} className="mb-2 statsLead kdmStyle">
            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="entities"
                label="Name of enitity"
                style={{ marginBottom: "1rem" }}
              >
                <Input
                  placeholder="Enter Name of enitity"
                  value={noOfEntities}
                  onChange={(item) => setNoOfEntities(item.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="productName"
                label="Product Name"
                style={{ marginBottom: "1rem" }}
              >
                <Input
                  placeholder="Enter Product Name"
                  value={productNameData}
                  onChange={(item) => setProductNameData(item.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="totPrem"
                label="Total Premium"
                style={{ marginBottom: "1rem" }}
              >
                <Input
                  placeholder="Enter Total Premium"
                  value={totalPremData}
                  onChange={(item) => setTotalPremData(item.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="tagicPresence"
                label="TAGIC Presence %"
                style={{ marginBottom: "1rem" }}
              >
                <Input
                  placeholder="Enter TAGIC Presence %"
                  value={tagicPresence}
                  onChange={(item) => setTagicPresence(item.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="tagicPremium"
                label="TAGIC Premium"
                style={{ marginBottom: "1rem" }}
              >
                <Input
                  placeholder="Enter TAGIC Premium"
                  value={tagicPremium}
                  onChange={(item) => setTagicPremium(item.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="leadrFollowr"
                label="Leader/Follower"
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  bordered={true}
                  placeholder="Select Leader/Follower"
                  options={kdmRoleArr}
                  value={leadrFollowerData}
                  // defaultValue={citiesOptions}
                  onChange={(item) => onChangeLeaderFollowerData(item)}
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="leadeInsurer"
                label="Lead Insurer"
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  bordered={true}
                  placeholder="Select Lead Insurer"
                  options={kdmRoleArr}
                  value={leadInsurerData}
                  // defaultValue={citiesOptions}
                  onChange={(item) => setLeadInsurerData(item)}
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="leaderShare"
                label="Leader Share %"
                style={{ marginBottom: "1rem" }}
              >
                <Input
                  placeholder="Enter Leader Share %"
                  value={leaderShareData}
                  onChange={(item) => setLeaderShareData(item.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name label-color"
                name="incepDate"
                label="Inception Date"
                style={{ marginBottom: "1rem" }}
              >
                <DatePicker
                  onChange={onChangeIncepDate}
                  value={inceptionDateData}
                  format="DD-MM-YYYY"
                  style={{ display: "flex", flex: 1 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Button
              className="cancelBtn"
              onClick={() => setShowRiskDetailsPopup(false)}
              size="large"
            >
              Cancel
            </Button>
            <Button
              className="submitBtn"
              onClick={() => submitRiskDetails()}
              size="large"
            >
              Submit
            </Button>
          </div>
          {/* <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                            <Button style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
                        </div> */}
        </Col>
      </Modal>
    </>
  );
};

export default RiskDetails;
