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
  AutoComplete,
  message,
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
// const tabMenu = [
//   {
//     id: 1,
//     value: "Opportunity Details",
//   },
//   {
//     id: 2,
//     value: "Company Intelligence",
//   },
//   {
//     id: 3,
//     value: "History",
//   },
// ];

const RiskDetails = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const _StoreData = useSelector((state) => state?.newLead?.formData);
  console.log('formData------------------->',_StoreData);
  const _UpdateFormBody = useSelector((state) => state?.newLead?.leadUpdateFormdata);
  const user_id = useSelector((state) => state?.login?.user?.id);
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
  const [riskType, setRiskType] = useState("");
  const [panNo, setPanNo] = useState("");
  const [LOBForOpportunity, setLOBForOpportunity] = useState('');
  const [productForOpportunity, setProductForOpportunity] = useState("");
  const [editRiskId, setEditRiskId] = useState("");
  const [tenderDriver, setTenderDriver] = useState(false);
  const [riskDataArr, setRiskDataArr] = useState([]);
  const [showRiskDetailsPopup, setShowRiskDetailsPopup] = useState(false);
  const [prodForOpportunityArr, setProdForOpportunityArr] = useState([]);

  useEffect(() => {
    let _dataArr = [];
    if (Object.keys(props.riskDataSet).length > 0) {
      setRiskType('update')

      let _InceptnDateFormat = !props.riskDataSet.inception_date ? "" :  moment(props.riskDataSet.inception_date,"MM/DD/YYYY");

      setShowRiskDetailsPopup(true);
      setNoOfEntities(!props.riskDataSet.wallet_share ? "-" : props.riskDataSet.wallet_share);
      // setProductNameData("");
      // setTotalPremData(!props.riskDataSet.total_premium ? "0" : props.riskDataSet.total_premium);
      // setTagicPresence(!props.riskDataSet.tagic_presence_percentage ? "0": props.riskDataSet.tagic_presence_percentage);
      // setTagicPremium(!props.riskDataSet.total_premium ? "0" : props.riskDataSet.total_premium);
      // setLeadrFollowerData(!props.riskDataSet.leader ? "" : props.riskDataSet.leader);
      // setLeadInsurerData(!props.riskDataSet.lead_insurer ? undefined : props.riskDataSet.lead_insurer);
      // setLeaderShareData(!props.riskDataSet.leader_share ? "0" : props.riskDataSet.leader_share);
      // setInceptionDateData(_InceptnDateFormat);
      // setEditIndex("");
      // setPanNo(!props.riskDataSet.Pan_no ? "" : props.riskDataSet.Pan_no);
      setLOBForOpportunity(!props.riskDataSet.lob_for_opportunity ? "" : props.riskDataSet.lob_for_opportunity);
      // setProductForOpportunity(!props.riskDataSet.product_for_opportunity ? "" : props.riskDataSet.product_for_opportunity);
      // setTenderDriver(!props.riskDataSet.tender_driven ? "" : props.riskDataSet.tender_driven === 'No' ? false : true);
      
      setEditRiskId(props.riskDataSet._id)

      form.setFieldsValue({
        nameOfentity: !props.riskDataSet.wallet_share ? "-" : props.riskDataSet.wallet_share,
        // totPrem: !props.riskDataSet.total_premium ? "0" : props.riskDataSet.total_premium,
        // tagicPresence: !props.riskDataSet.tagic_presence_percentage ? "0": props.riskDataSet.tagic_presence_percentage,
        // tagicPremium: !props.riskDataSet.total_premium ? "0" : props.riskDataSet.total_premium,
        // leadrFollowr: !props.riskDataSet.leader ? "" : props.riskDataSet.leader,
        // leadeInsurer: !props.riskDataSet.lead_insurer ? undefined : props.riskDataSet.lead_insurer,
        // leaderShare: !props.riskDataSet.leader_share ? "0" : props.riskDataSet.leader_share,
        // incepDate: _InceptnDateFormat,
        // pan_No:!props.riskDataSet.Pan_no ? "" : props.riskDataSet.Pan_no,
        lob_for_opportunity:!props.riskDataSet.lob_for_opportunity ? "" : props.riskDataSet.lob_for_opportunity,
        // product_for_opportunity:!props.riskDataSet.product_for_opportunity ? "" : props.riskDataSet.product_for_opportunity,
      });
      
    }else{
      addNewRiskDetails()
      setRiskType('create')
    }
    
  }, [props.riskDataSet]);

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
        tendrDriver: !tenderDriver ? "" : tenderDriver,
      };

      // console.warn('(((((RISK Details ))))) -------->>>>',riskDataArr)
      // console.warn('(((((RISK Details_____data ))))) -------->>>>',_data)

      setRiskDataArr([...riskDataArr, _data]);
    }

    setShowRiskDetailsPopup(false);
  };

  const updateRiskDetails = async (event) => {
    let _riskDetailsData = [];
    let form_data = {
      wallet_share: !noOfEntities ? null : noOfEntities,
      lob_for_opportunity: !LOBForOpportunity ? null : LOBForOpportunity,
    };
    
    // _riskDetailsData.push(_data);

    let formBody = {
      ...form_data,
    };
    
    // console.warn("formBody ------>>>>>", formBody);
    if(riskType === 'create'){
      let result = await axiosRequest.post(`user/addwalletdetails?userId=${user_id}&broker_id=${_StoreData.broker_id}`,formBody,{ secure: true });
      dispatch(actions.fetchLeadDetails_broker(_StoreData._id));
      message.success("Wallet Details Created Successfully");
    }else{
      let result = await axiosRequest.put(`user/updatewalletdetails?userId=${user_id}&broker_id=${_StoreData.broker_id}&walletId=${editRiskId}`,formBody,{ secure: true });
      dispatch(actions.fetchLeadDetails_broker(_StoreData._id));
      message.success("Wallet Details Updated Successfully");
    }
    props.setShowRiskModal(false);
  };

  const deleteRisk = (event, ind) => {
    let _riskArr = riskDataArr.filter((el) => el.riskType !== event.riskType);
    setRiskDataArr([..._riskArr]);
  };

  const editRisk = (event, ind) => {
    console.log("(((((RISK Details EDIT ))))) -------->>>>", event);
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
  };

  const addNewRiskDetails = () => {
    setShowRiskDetailsPopup(true);
    setNoOfEntities("");
    setProductNameData("");
    setTotalPremData("");
    setTagicPresence("");
    setTagicPremium("");
    setLeadrFollowerData(undefined);
    setLeadInsurerData('');
    setLeaderShareData("");
    setInceptionDateData("");
    setEditIndex("");
    setPanNo("");
    setLOBForOpportunity("");
    setProductForOpportunity("");
    setTenderDriver(false);

    form.setFieldsValue({
      nameOfentity: "",
      productName: "",
      totPrem: "",
      tagicPresence: "",
      tagicPremium: "",
      leadrFollowr: undefined,
      leadeInsurer: ' ', 
      leaderShare: "",
      incepDate: "",
      pan_No:'',
      lob_for_opportunity:'' || undefined,
      product_for_opportunity:'' || undefined,
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
      <Modal
        title={riskType=='create'?"Add Wallet Details":'Edit Wallet Details'}
        centered={true}
        visible={props.showRiskModal}
        width={width < breakpoint ? 370 : 700}
        className="modalStyle"
        onCancel={() => props.setShowRiskModal(false)}
        footer={null}
      >
        <Col className="mb-2" xs={24} sm={24} md={16} lg={15} xl={24} span={23}>
          <Form form={form}>
            <Row gutter={16} className="mb-2 statsLead kdmStyle">
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="lob_for_opportunity"
                  label="LOB"
                  rules={[
                    {
                      required: false,
                      message: "Select LOB",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Select
                    placeholder="Select"
                    options={lobOpportunityItems}
                    value={LOBForOpportunity}
                    onChange={(val) => changeLobOpprtunity(val)}
                    style={{width:'100%'}}
                  ></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="nameOfentity"
                  label="Wallet Share"
                  style={{ marginBottom: "1rem" }}
                >
                  <Input
                    placeholder="Enter Wallet Share"
                    value={noOfEntities}
                    onChange={(item) => setNoOfEntities(item.target.value)}
                  />
                </Form.Item>
              </Col>
              
              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                    onChange={(item) => onChangeLeaderFollowerData(item)}
                  ></Select>
                </Form.Item>
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="leadeInsurer"
                  label="Lead Insurer"
                  style={{ marginBottom: "1rem" }}
                >
                  <AutoComplete
                    placeholder="Select Lead Insurer"
                    options={leadInsurerItems}
                    value={leadInsurerData}
                    onChange={(val, data) => setLeadInsurerData(val)}
                    onFocus={(val) =>{ form.setFieldsValue({leadeInsurer:''}) } }
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  ></AutoComplete>
                </Form.Item>
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}

              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
              </Col> */}
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
              onClick={() => props.setShowRiskModal(false)}
              size="large"
            >
              Cancel
            </Button>
            <Button
              className="submitBtn"
              onClick={() => updateRiskDetails()}
              size="large"
            >
              Submit
            </Button>
          </div>
    
        </Col>
      </Modal>
    </>
  );
};

export default RiskDetails;
