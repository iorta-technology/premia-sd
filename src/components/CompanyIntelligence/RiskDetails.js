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
  AutoComplete
} from "antd";
import {
  affinityBenefitsItems,
  aigcItems,
  aviationItems,
  btaItems,
  casualtyItems,
  extend_warrantyItems,
  finance_linesItems,
  gmcItems,
  gpaItems,
  retail_healthItems,
  ipaItems,
  ltaItems,
  marineItems,
  motorItems,
  p_e_cItems,
  pcgItems,
  pepItems,
  plusItems,
  ruralItems,
  rural_weatherItems,
  trade_creditItems,
  lobOpportunityItems,
} from "../StatusLead/dataSet";
import "../StatusLead/StatusLead.css";
import * as actions from "../../store/actions/index";
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
import moment from "moment";

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

const RiskDetails = (props) => {
  // const storeLeadId = useSelector((state) => state.newLead.leadId)
  // const storeUserId = useSelector((state) => state.newLead.userId)
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const _StoreData = useSelector((state) => state?.newLead?.formData);
  const _UpdateFormBody = useSelector((state) => state?.newLead?.leadUpdateFormdata);
  const user_id = useSelector((state) => state.login.user.id);
  console.log("(((((((((_StoreData____RISKKKK)))))))))---->>>>", _StoreData);
  // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)

  const [noOfEntities, setNoOfEntities] = useState("");
  const [productNameData, setProductNameData] = useState("");
  const [totalPremData, setTotalPremData] = useState("");
  const [tagicPresence, setTagicPresence] = useState("");
  const [tagicPremium, setTagicPremium] = useState("");
  const [leadrFollowerData, setLeadrFollowerData] = useState("");
  const [leadInsurerData, setLeadInsurerData] = useState("");
  const [leaderShareData, setLeaderShareData] = useState("");
  const [inceptionDateData, setInceptionDateData] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [panNo, setPanNo] = useState("");
  const [LOBForOpportunity, setLOBForOpportunity] = useState('');
  const [productForOpportunity, setProductForOpportunity] = useState("");
  const [tenderDriver, setTenderDriver] = useState(false);
  
  const [riskDataArr, setRiskDataArr] = useState([]);

  const [showRiskDetailsPopup, setShowRiskDetailsPopup] = useState(false);
  const [prodForOpportunityArr, setProdForOpportunityArr] = useState([]);

  useEffect(() => {
    let _dataArr = [];
    if (_StoreData?.company_id?.risk_details.length > 0) {
      _StoreData?.company_id?.risk_details.map((el) => {
        console.log('(((((((((el)))))))))---->>>>',el)
        let _data = {
          riskName: !el.product_name ? "-" : el.product_name,
          riskType: !el.total_entities ? "-" : el.total_entities,
          totalPrem: !el.tagic_premium ? "0" : el.tagic_premium,
          tagicPresence: !el.tagic_presence_percentage
            ? "0"
            : el.tagic_presence_percentage,
          leadInsurer: !el.lead_insurer ? "-" : el.lead_insurer,
          leaderShare: !el.leader_share ? "0" : el.leader_share,

          tagicPremium: !el.tagic_premium ? "" : el.tagic_premium,
          leaderFollower: !el.leader ? "" : el.leader,
          inceptionDate: !el.inception_date ? "" : el.inception_date,
          panNo: !el.Pan_no ? "" : el.Pan_no,
        };
        _dataArr.push(_data);

        // setRiskDataArr([...riskDataArr,_data])
      });
      console.log("_dataArr========>>>>", _dataArr);
      setRiskDataArr(_dataArr);
    }
  }, []);

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

  const leadrOrFollowrItems = [
    { label: "Leader", value: "Leader" },
    { label: "Follower", value: "Follower" },
  ];

  const leadInsurerItems = [
    { label: "ICICI Lombard", value: "ICICI Lombard" },
    {
      label: "Future Generali Insurance Company",
      value: "Future Generali Insurance Company",
    },
    { label: "Liberty General Insurance", value: "Liberty General Insurance" },
    { label: "TATA AIG", value: "TATA AIG" },
    {
      label: "Cholamandalam MS General Insurance",
      value: "Cholamandalam MS General Insurance",
    },
    { label: "Bajaj Allianz GI", value: "Bajaj Allianz GI" },
    { label: "SBI General Insurance", value: "SBI General Insurance" },
    {
      label: "Reliance General Insurance",
      value: "Reliance General Insurance",
    },
    { label: "IFFCO TOKYO", value: "IFFCO TOKYO" },
    {
      label: "Oriental Insurance Company Ltd",
      value: "Oriental Insurance Company Ltd",
    },
    {
      label: "Universal Sompo General Insurance",
      value: "Universal Sompo General Insurance",
    },
    { label: "New India Assurance", value: "New India Assurance" },
    { label: "HDFC ERGO", value: "HDFC ERGO" },
    { label: "MAGMA HGICL", value: "MAGMA HGICL" },
    { label: "Kotak General Insurance", value: "Kotak General Insurance" },
    {
      label: "Royal Sundaram General Insurance",
      value: "Royal Sundaram General Insurance",
    },
    {
      label: "National Insurance Company",
      value: "National Insurance Company",
    },
    {
      label: "Go Digit General Insurance Limited",
      value: "Go Digit General Insurance Limited",
    },
    { label: "Edelweiss GIC Ltd", value: "Edelweiss GIC Ltd" },
    { label: "United India Insurance", value: "United India Insurance" },
    {
      label: "Raheja QBE General Insurance Company Limited",
      value: "Raheja QBE General Insurance Company Limited",
    },
    { label: "Shriram General Insurance", value: "Shriram General Insurance" },
  ];
  leadInsurerItems.sort((a, b) => {
    const a_first = a.label.split(" ")[0];
    const b_first = b.label.split(" ")[0];
    const result = a_first.localeCompare(b_first);
    return result !== 0 ? result : a.name.localeCompare(b.name);
  });
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

  const onChangeLeaderFollowerData = (event) => {
    // console.warn('(((((LEADER FOLLOWER ))))) -------->>>>',event)
    setLeadrFollowerData(event);
  };

  const changeLobOpprtunity = (event) => {
    // console.warn('LOB OPPORTUNITY --------->>>:', event);
    setLOBForOpportunity(event)
    setProductForOpportunity('')
    // const [LOBForOpportunity, setLOBForOpportunity] = useState("");
    // const [productForOpportunity, setProductForOpportunity] = useState("");
    form.setFieldsValue({
      lob_for_opportunity:event,
      product_for_opportunity: "",
    });

    event === "Affinity Benefits"
      ? setProdForOpportunityArr(affinityBenefitsItems)
      : event === "AIGC"
      ? setProdForOpportunityArr(aigcItems)
      : event === "Aviation"
      ? setProdForOpportunityArr(aviationItems)
      : event === "BTA"
      ? setProdForOpportunityArr(btaItems)
      : event === "Casualty"
      ? setProdForOpportunityArr(casualtyItems)
      : event === "Extended Warantee"
      ? setProdForOpportunityArr(extend_warrantyItems)
      : event === "Financial Lines"
      ? setProdForOpportunityArr(finance_linesItems)
      : event === "GMC"
      ? setProdForOpportunityArr(gmcItems)
      : event === "GPA"
      ? setProdForOpportunityArr(gpaItems)
      : event === "Retail Health"
      ? setProdForOpportunityArr(retail_healthItems)
      : event === "IPA"
      ? setProdForOpportunityArr(ipaItems)
      : event === "LTA"
      ? setProdForOpportunityArr(ltaItems)
      : event === "Marine"
      ? setProdForOpportunityArr(marineItems)
      : event === "Motor"
      ? setProdForOpportunityArr(motorItems)
      : event === "P&E&C"
      ? setProdForOpportunityArr(p_e_cItems)
      : event === "PCG"
      ? setProdForOpportunityArr(pcgItems)
      : event === "PEP"
      ? setProdForOpportunityArr(pepItems)
      : event === "Plus"
      ? setProdForOpportunityArr(plusItems)
      : event === "Rural"
      ? setProdForOpportunityArr(ruralItems)
      : event === "Rural- Weather"
      ? setProdForOpportunityArr(rural_weatherItems)
      : event === "Trade Credit"
      ? setProdForOpportunityArr(trade_creditItems)
      : setProdForOpportunityArr(affinityBenefitsItems);
    // setProdForOpportunityArr()
  };

  const changeProductOpprtunity = (event) => {
    setProductForOpportunity(event)
    form.setFieldsValue({ product_for_opportunity: event });
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
      riskDataArr[editIndex].panNo = panNo;
      riskDataArr[editIndex].lobOpportunity = LOBForOpportunity;
      riskDataArr[editIndex].prodOpportunity = productForOpportunity;
      riskDataArr[editIndex].tendrDriver = tenderDriver;
      // setPanNo(event.Pan_no);
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
        panNo: !panNo ? "" : panNo,
        lobOpportunity: !LOBForOpportunity ? "" : LOBForOpportunity,
        prodOpportunity: !productForOpportunity ? "" : productForOpportunity,
        // tendrDriver: !tenderDriver ? "" : tenderDriver,
      };

      setRiskDataArr([...riskDataArr, _data]);
    }

    setShowRiskDetailsPopup(false);
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
        Pan_no: el.panNo,
        tender_driven: el.tendrDriver === true ? "Yes" : "No",
        lob_for_opportunity: el.lobOpportunity,
        product_for_opportunity: el.prodOpportunity,
      };
      _riskDetailsData.push(_data);
    });
    // console.warn('_riskDetailsData ------>>>>>',_riskDetailsData)

    // let formBody = {
    //     ...props.updateFormData,
    //     risk_details: _riskDetailsData,
    // }
    let _appntDate = ''
    let _appntTime = ''
    let _apptDateFormat = ''

    if (_StoreData.appointmentDate) {
      _appntDate = moment(_StoreData.appointmentDate).format("MM/DD/YYYY");
      _appntTime = moment(_StoreData.appointmentDate).format("LT");
    }

    let formBody = {
      company_details: {
        company_name: _StoreData?.company_id?.company_name,
        parent_company: _StoreData?.company_id?.parent_company,
        industry_name: _StoreData?.company_id?.industry_name,
        tata_aig_empaneled:
          _StoreData?.company_id?.tata_aig_empaneled === true ? "Yes" : "No",
        client_location: _StoreData?.company_id?.client_location,
        zone:_StoreData?.company_id?.zone
      },
      leadStatus: _StoreData?.leadStatus,
      leadDisposition: _StoreData?.leadDisposition,
      leadsubDisposition: _StoreData?.leadsubDisposition,
      opportunity_name: _StoreData?.opportunity_name,
      // tender_driven: _StoreData?.tender_driven === true ? "Yes" : "No",
      // LOB_opportunity: _StoreData?.lob_for_opportunity,
      // product_for_opportunity: _StoreData?.product_for_opportunity,
      // remarks: _StoreData?.remarks,
      teamMembers: "[]",
      lead_Owner_Id: user_id,
      lead_Creator_Id: user_id,
      user_id: user_id,
      company_id: _StoreData?.company_id?._id,
      // start_date: _UpdateFormBody?.start_date,
      // start_time:_UpdateFormBody?.start_time,
      start_date: _appntDate,
      start_time: _appntTime,
      client_expectations: _StoreData?.client_expectations,
      red_flags: _StoreData?.red_flags,
      our_ask: _StoreData?.our_ask,
      channel_name: _StoreData?.channel_name,
      producer: _StoreData?.producer,
      VAS_executed: !_StoreData?.VAS_executed
        ? "Yes"
        : _StoreData?.VAS_executed,
        VAS_input: _StoreData?.VAS_input,
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
    // console.warn("(((((RISK Details EDIT ind ))))) -------->>>>", ind);
    setEditIndex(ind);

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
    setPanNo(event.panNo);
    // const [panNo, setPanNo] = useState("");

    form.setFieldsValue({
      nameOfentity: event.riskType,
      productName: event.riskName,
      totPrem: event.totalPrem,
      tagicPresence: event.tagicPresence,
      tagicPremium: event.tagicPremium,
      leadrFollowr: event.leaderFollower,
      leadeInsurer: event.leadInsurer,
      leaderShare: event.leaderShare,
      pan_No: event.panNo,
      incepDate: moment(event.inceptionDate, "MM/DD/YYYY"),
    });
    // const [editIndex, setEditIndex] = useState('');
  };

  const addNewRiskDetails = () => {
    setShowRiskDetailsPopup(true);
    setNoOfEntities("");
    setProductNameData("");
    setTotalPremData("");
    setTagicPresence("");
    setTagicPremium("");
    setLeadrFollowerData(undefined);
    setLeadInsurerData(undefined);
    setLeaderShareData("");
    setInceptionDateData("");
    setEditIndex("");
    setPanNo("");

    form.setFieldsValue({
      nameOfentity: "",
      productName: "",
      totPrem: "",
      tagicPresence: "",
      tagicPremium: "",
      leadrFollowr: undefined,
      leadeInsurer: undefined,
      leaderShare: "",
      incepDate: "",
      pan_No:'',
    });
  };

  const changeTagicPres = (event) =>{
    setTagicPresence(event.target.value) 
    


    if(!event.target.value){
      setTagicPremium(totalPremData)
      form.setFieldsValue({tagicPremium: totalPremData});
    }else {
      let _tagicPrem = (totalPremData * event.target.value) / 100
      setTagicPremium(_tagicPrem)

      form.setFieldsValue({tagicPremium: _tagicPrem,});
    }
  }

  const changeTotalPrem = (event) =>{
    setTotalPremData(event.target.value)

    if(!tagicPresence){
      setTagicPremium(event.target.value)
      form.setFieldsValue({tagicPremium: event.target.value});
    }else {
      let _tagicPrem = (event.target.value * tagicPresence) / 100
      setTagicPremium(_tagicPrem)

      form.setFieldsValue({
        tagicPremium: _tagicPrem,
      });
    }
  }
  
  const changeTagicPremium = (event) =>{
    setTagicPremium(event.target.value)
  }

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
          style={{ paddingTop: 15,paddingLeft:20,paddingRight:20 }}
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

          <div className="risk-add" onClick={() => addNewRiskDetails()}>
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
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            onClick={() => updateRiskDetails()}
            style={{
              borderRadius: 5,
              backgroundColor: "#3b371e",
              color: "#fff",
            }}
          >
            Save and Update
          </Button>
        </div>
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
          <Form form={form}>
            <Row gutter={16} className="mb-2 statsLead kdmStyle">
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="nameOfentity"
                  label="Name of enitity"
                  style={{ marginBottom: "1rem" }}
                  rules={[
                   
                    {
                      message: "Only Alphabets are Allowed",
                      pattern: new RegExp(/^[a-zA-Z ]+$/),
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Name of enitity"
                    value={noOfEntities}
                    onChange={(item) => setNoOfEntities(item.target.value)}
                  />
                </Form.Item>
              </Col>

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="productName"
                  label="Product Name"
                  style={{ marginBottom: "1rem" }}
                  rules={[
                    {
                      message: "Only Alphabets are Allowed",
                      pattern: new RegExp(/^[a-zA-Z ]+$/),
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Product Name"
                    value={productNameData}
                    onChange={(item) => setProductNameData(item.target.value)}
                  />
                </Form.Item>
              </Col> */}
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="lob_for_opportunity"
                  label="LOB for Opportunity"
                  rules={[
                    {
                      required: false,
                      message: "Select LOB Opportunity",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Select
                    placeholder="Select"
                    options={lobOpportunityItems}
                    value={LOBForOpportunity}
                    onChange={(val) => changeLobOpprtunity(val)}
                  ></Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="product_for_opportunity"
                  label="Product for Opportunity"
                  rules={[
                    {
                      required: false,
                      message: "Select product Opportunity",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Select
                    placeholder="Select"
                    options={prodForOpportunityArr}
                    value={productForOpportunity}
                    onChange={(val) => changeProductOpprtunity(val)}
                  ></Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  label="Tender Driver"
                  style={{ marginBottom: "1rem" }}
                >
                  <Radio.Group
                    name="radiogroup"
                    value={tenderDriver}
                    onChange={(val) => setTenderDriver(val.target.value) }
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="totPrem"
                  label="Total Premium"
                  style={{ marginBottom: "1rem" }}
                  rules={[
                    {
                      message: "Only Numbers are Allowed",
                      pattern: new RegExp(/^[0-9]+$/),
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Total Premium"
                    value={totalPremData}
                    onChange={(item) =>  changeTotalPrem(item) }
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
                  rules={[
                    {
                      message: "Only Numbers are Allowed",
                      pattern: new RegExp(/^[0-9.]+$/),
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter TAGIC Presence %"
                    value={tagicPresence}
                    onChange={(item) => changeTagicPres(item) }
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
                  rules={[
                    {
                      message: "Only Numbers are Allowed",
                      pattern: new RegExp(/^[0-9]+$/),
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter TAGIC Premium"
                    disabled={true}
                    value={tagicPremium}
                    onChange={(item) => changeTagicPremium(item)}
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
                    options={leadrOrFollowrItems}
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
                  {/* <Select
                    bordered={true}
                    placeholder="Select Lead Insurer"
                    options={leadInsurerItems}
                    value={leadInsurerData}
                    // defaultValue={citiesOptions}
                    onChange={(item) => setLeadInsurerData(item)}
                  ></Select> */}

                  <AutoComplete
                    placeholder="Select Lead Insurer"
                    options={leadInsurerItems}
                    value={leadInsurerData}
                    onChange={(val, data) => setLeadInsurerData(val, data)}
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  ></AutoComplete>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="leaderShare"
                  label="Leader Share %"
                  style={{ marginBottom: "1rem" }}
                  rules={[
                    {
                      message: "Only Numbers are Allowed",
                      pattern: new RegExp(/^[0-9]+$/),
                    },
                  ]}
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
                    format="MM/DD/YYYY"
                    style={{ display: "flex", flex: 1 }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="pan_No"
                  label="PAN No"
                  style={{ marginBottom: "1rem" }}
                  rules={[
                    {
                      message: "Enter a valid Pan No",
                      pattern: new RegExp(/(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})$)/),
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter PAN No"
                    value={panNo}
                    onChange={(item) => setPanNo(item.target.value)}
                  />
                  
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
