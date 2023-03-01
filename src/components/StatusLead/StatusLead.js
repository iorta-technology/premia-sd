import React, { useState, useEffect, createRef, useRef } from "react";
import "./StatusLead.css";
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
  no_contactItems,
  lobOpportunityItems,
  leadStatusItems,
  appointmentTimeOptions,
  contactItems,
  industryDataArr,
  timeList,
} from "./dataSet";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  DatePicker,
  Space,
  Modal,
  Spin,
  Radio,
  AutoComplete,
  message,
  Image,
} from "antd";
import {
  ArrowRightOutlined,
  FileTextOutlined,
  EditOutlined,
  PhoneOutlined,
  SaveOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
  CalendarOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Tabs from "../../components/Tab/Tab";
import _ from "lodash";
import { checkAgent, doSentenceCase } from "../../helpers";
import moment from "moment";
import axiosRequest from "../../axios-request/request.methods";
import TodoTab from "../Activitity Tracker/RightSide-Todo/TodoCreate-Tab/Todo-Tab";
import TodoCards from "../Activitity Tracker/RightSide-Todo/Todo-Event-Cards/TodoCards";
import noDataIcon from "../../assets/078e54aa9d@2x.png";
// const minimumDate = moment().format("YYYY-MM-DD");
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

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
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isNumberValid = (value) => value.trim() !== "" && value.length === 10;

const NewLead = React.memo((props) => {
  // const [collaborators, setCollaborators] = useState("");
  const [teamMemberData, setTeamMemberData] = useState("");
  const [remark, setRemark] = useState("");
  const [reamrkDataArr, setreamrkDataArr] = useState([]);
  const [teamDataArr, setTeamDataArr] = useState([]);
  const id = useSelector((state) => state.login.user.id);
  const login_user = useSelector((state) => state.login.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const _StoreData = useSelector((state) => state?.newLead?.leadUpdateFormdata);
  // console.warn('((((((((((( login_user )))))))))))', login_user)

  const childRef = useRef(null);

  const addCollaborators = () => {
    setFormItem((res) => ({
      ...res,
      collaborators: [...formItem.collaborators, teamMemberData],
    }));
    form.setFieldsValue({
      collaborators: "",
    });
    setTeamMemberData("");
    let _checkDuplicate = null;
    teamDataArr.map((el) => {
      _checkDuplicate = teamMemberData.includes(el.first_name) ? true : false;
    });
    hierarAgentList.map((item) => {
      if (_checkDuplicate) {
      } else {
        if (item.value === teamMemberData) {
          let apiBody = {
            first_name: item.firstname,
            last_name: item.lastname,
            Id: item._Id,
          };
          // _dataArr.push(apiBody)
          setTeamDataArr([...teamDataArr, apiBody]);
        }
      }
    });
    //  setTeamDataArr(_dataArr)
  };

  const addRemarks = async () => {
    let result = "";
    if (remark && remark != "") {
      result = await axiosRequest.post(
        `user/add-opporunity-remark/${props.location.state.leadID}`,
        { new_remark: remark },
        { secure: true }
      );

      if (result) {
        setRemark("");
        form.setFieldsValue({
          remarks: "",
        });

        setreamrkDataArr([...reamrkDataArr, result]);
        return console.log("result", reamrkDataArr);
      }

      let _remark = [
        {
          description: remark,
          dateTime: new Date().toLocaleString("en-US"),
        },
      ];
      setRemark("");

      setFormItem((res) => ({
        ...res,
        remarks: _remark,
        // remarks: [...formItem.remarks, remark],
      }));

      form.setFieldsValue({
        remarks: "",
      });

      let remID = Math.floor(1000 + Math.random() * 9000);
      let _data = {
        description: remark,
        date: new Date().toLocaleDateString().valueOf(),
        remark_id: remID.toString(),
        // userId: new ObjectId("63dce7c80ae6868961079fe8"),
        // isLeadOwner: true,
      };

      setreamrkDataArr([...reamrkDataArr, _data]);
    }
  };

  const [formItem, setFormItem] = useState({
    companyName: "",
    parentCompanyName: "",
    industry: "",
    empaneled: false,
    clientLocation: "",
    LOBForOpportunity: "",
    productForOpportunity: "",
    opportunityName: "",
    tenderDriver: false,
    status: "newleadentery",
    disposition: "",
    subDisposition: "",
    appointmentDate: "",
    appointmentTime: "",
    collaborators: [],
    remarks: [],
  });

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    // console.warn('LEAD__ID__FROM___ROUTE___',props.location.state)
    // console.warn('LEAD__ID__FROM___ROUTE__.leadID_',props.location.state.leadID)
    dispatch(actions.headerName("New Lead"));
    if (props.location.state !== undefined) {
      let _leadID = !props.location.state.leadID
        ? props?.location?.state?._leadData?._id
        : props.location.state.leadID;
      getLeadDetails(_leadID);
      getAppointmentList(_leadID);
      setUpdateLeadID(_leadID);
      getEventTodoCountAPI(_leadID);
      setIsNewLead(false);

      if (props.location.state.hasOwnProperty("_leadData")) {
        loadValuesToFields(storeFormData);
      }
    } else {
      setIsNewLead(true);
      setActivities_data([]);
      // setMobileDisable(false);
      form.setFieldsValue({
        lead_status: "newleadentery",
      });
    }
  }, [dispatch]);

  let storeFormData = useSelector((state) => state?.newLead?.formData);
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  // console.warn('((((((((((( _StoreData__STATUSLEAD )))))))))))', storeFormData)

  let leadDataLoading = useSelector((state) => state.newLead.leadDataloading);
  let storeLeadId = useSelector((state) => state?.newLead?.formData?._id);
  const successMsg = useSelector((state) => state.newLead.successMsg);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [appointmentStatus, setAppointmentStatus] = useState();
  const [appointmentDisposition, setAppointmentDisposition] = useState();
  const [appointmentSubDisposition, setAppointmentSubDisposition] = useState();
  const [reminder, setReminder] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isNewLead, setIsNewLead] = useState(false);
  const [showLeadStatus, setshowLeadStatusVisiblity] = React.useState(false);
  const [leadIdData, setLeadIdData] = useState("");
  const [hierarAgentList, setHierarAgentList] = useState([]);
  const [companyArray, setCompanyArray] = useState([]);
  const [parentCompArray, setparentCompArray] = useState([]);
  const [industryArray, setIndustryArray] = useState([]);
  const [company_id, setCompany_id] = useState("");
  const [prodForOpportunityArr, setProdForOpportunityArr] = useState([]);
  const [dispoArr, setDispoArr] = useState([]);
  const [subdispoArr, setSubDispoArr] = useState([]);
  const [showLeadDisposition, setShowLeadDisposition] = useState(false);
  const [showLeadSubDisposition, setShowLeadSubDisposition] = useState(false);
  const [showAppointmentFields, setShowAppointmentFields] = useState(false);

  const [opportunityNameSummary, setOpportunityNameSummary] = useState("-");
  const [companySummary, setCompanySummary] = useState("-");
  const [leadIdSummary, setLeadIdSummary] = useState("-");
  const [currentStatusSummary, setCurrentStatusSummary] = useState("-");
  const [incorpDateSummary, setIncorpDateSummary] = useState("-");
  const [currentStatsDateSummary, setCurrentStatsDateSummary] = useState("-");
  const [eventCountSummary, setEventCountSummary] = useState("00");
  const [todoCreatdSummary, setTodoCreatdSummary] = useState("00");
  const [todoComplteSummary, setTodoComplteSummary] = useState("00");
  const [apptDateString, setApptDateString] = useState("");
  const [todoCountBgColor, setTodoCountBgColor] = useState("");
  const [eventCountBgColor, setEventCountBgColor] = useState("#00acc114");
  const [showEventTodoList, setShowEventTodoList] = useState(false);
  const [activities_data, setActivities_data] = useState([]);
  const [updateLeadID, setUpdateLeadID] = useState("");

  const [disableParentComp, setDisableParentComp] = useState(false);
  let _teamMember = [];

  useEffect(() => {
    getHierarData();
    getCompanyDetails();
  }, []);

  const _reportManager = useSelector((state) => state?.login?.reportingManager);

  const getHierarData = () => {
    try {
      // let _teamMember = [];
      if (checkAgent() === false) {
        userTreeData.reporting_users.map((el) => {
          let sortarray = {
            FullName: el.full_name,
            ShortId: el.employeeCode,
            firstname: el.first_name,
            lastname: el.last_name,
            employecode: el.employeeCode,
            designation: el.hierarchyName,
            _Id: el._id,
            value:
              doSentenceCase(el.full_name) + " " + "(" + el.hierarchyName + ")",
          };
          _teamMember.push(sortarray);
          sortarray = {};
        });
        let _finalData = [..._teamMember, _reportManager];
        setHierarAgentList(_finalData);
      } else {
        if (login_user.hasOwnProperty("reportingManager")) {
          // login_user.reportingManager
          let _reporting = login_user.reportingManager;

          let sortarray = {
            FullName: _reporting.full_name,
            ShortId: _reporting.employeeCode,
            firstname: _reporting.first_name,
            lastname: _reporting.last_name,
            employecode: _reporting.employeeCode,
            designation: _reporting.hierarchyName,
            _Id: _reporting._id,
            value:
              doSentenceCase(_reporting.full_name) +
              " " +
              "(" +
              _reporting.hierarchyName +
              ")",
          };
          _teamMember.push(sortarray);
          // sortarray = {};
          setHierarAgentList(_teamMember);
        }
      }
    } catch (err) {}
  };

  const getCompanyDetails = async (lead_id) => {
    let result = await axiosRequest.get(`admin/company/companies`, {
      secure: true,
    });
    // console.warn('__++++++COMPANY++++++++ RESPPPP',result)
    // if (result.length > 0) {
    let _compArr = [];
    let _parentCompArr = [];
    // let _industryArr = [];
    result.companies.map((el) => {
      let _data = { value: el.company_name, _id: el._id };
      _compArr.push(_data);
    });
    setCompanyArray(_compArr);

    result.parent_company.map((el) => {
      let _data = { label: el, value: el };
      _parentCompArr.push(_data);
    });
    setparentCompArray(_parentCompArr);

    // result.industries.map((el) => {
    //   let _data = { label: el, value: el };
    //   _industryArr.push(_data);
    // });
    setIndustryArray(industryDataArr);
    // }
  };

  const getAppointmentList = async (lead_id) => {
    // setUpdateLeadID(lead_id)
    let _result = await axiosRequest.get(
      `user/fetch_appointments/${id}?teamdata=0&category=all&lead_id=${lead_id}`,
      { secure: true }
    );
    // console.log('APPOINTMENT DATA---->>>',_result)
    setActivities_data(_result);
  };
  const getEventTodoCountAPI = async (lead_id) => {
    // setUpdateLeadID(lead_id)
    let _result = await axiosRequest.get(
      `user/get-event-todo-count/${lead_id}`,
      { secure: true }
    );
    console.log("COUTNTTTTT DATA---->>>", _result);
    // setActivities_data(_result)
    // if (_result.length > 0) {
    let _eventCreated =
      _result?.totalEventCount.toString().length === 1
        ? "0" + _result?.totalEventCount
        : _result?.totalEventCount;
    let _todoCompleted =
      _result?.totalTaskdone.toString().length === 1
        ? "0" + _result?.totalTaskdone
        : _result?.totalTaskdone;
    let _todoCreated =
      _result?.totalTodoCount.toString().length === 1
        ? "0" + _result?.totalTodoCount
        : _result?.totalTodoCount;

    setEventCountSummary(_eventCreated);
    setTodoCreatdSummary(_todoCreated);
    setTodoComplteSummary(_todoCompleted);
    // }
  };
  const getLeadDetails = async (lead_id) => {
    try {
      let result = await axiosRequest.get(`user/getlead_details/${lead_id}`, {
        secure: true,
      });
      if (result.length > 0) {
        dispatch(actions.fetchLeadDetailsSuccess(result[0]));
        if (result.length > 1) {
          let combined = {
            ...result[0],
            // appointmentDetails: {
            //   ...result[1],
            // },
          };
          loadValuesToFields(combined);
        } else {
          loadValuesToFields({ ...result[0], appointmentDetails: null });
        }
      }
    } catch (err) {}
  };

  const loadValuesToFields = (leadData) => {
    try {
      console.warn("__++++++++++++++ leadData +++++++++++>>", leadData);
      // setLeadStoreData(leadData)
      // console.warn('__++++++++++++++ _teamMember +++++++++++>>',_teamMember)
      // console.warn('__++++++++++++++ hierarAgentList +++++++++++>>',hierarAgentList)
      let _appntDate = "";
      let _appntTime = "";
      let _apptDateFormat = "";
      let _collabotrs = [];
      let _teamData = JSON.parse(leadData.teamMembers);
      setTeamDataArr(_teamData);

      // let leadArr = [];
      changeLeadStatus(leadData.leadStatus);
      if (
        leadData.leadDisposition === "appointment" &&
        leadData.leadStatus === "contact"
      ) {
        // setshowLeadStatusVisiblity(true)
        setAppointmentStatus(
          leadData.appointment_status === ""
            ? "newappointment"
            : leadData.appointment_status
        );
        setAppointmentDisposition("newApptmnt");
        setAppointmentSubDisposition("Untouched / Not updated Appointment");
        // setLeadDisposition(leadData.leadDisposition);

        // setLeadStatus(leadData.leadStatus);
        // setLeadStatusData(leadArr);
        // only when, the date and time is exist in the object
        if (leadData.appointmentDate) {
          _appntDate = moment(leadData.appointmentDate).format("MM/DD/YYYY");
          _appntTime = moment(leadData.appointmentDate).format("LT");
          setApptDateString(_appntDate);

          _apptDateFormat = moment(
            moment(leadData.appointmentDate).format("MM/DD/YYYY"),
            "MM/DD/YYYY"
          );
        }

        setShowLeadSubDisposition(true);
        setShowLeadDisposition(true);
        setShowAppointmentFields(true);
      } else {
        if (
          leadData.leadDisposition === "callback" &&
          leadData.leadStatus === "contact"
        ) {
          // if (leadData.appointmentDetails) {
          _appntDate = moment(leadData.appointmentDate).format("MM/DD/YYYY");
          _appntTime = moment(leadData.appointmentDate).format("LT");
          setApptDateString(_appntDate);

          _apptDateFormat = moment(
            moment(leadData.appointmentDate).format("MM/DD/YYYY"),
            "MM/DD/YYYY"
          );
          // }

          setShowLeadSubDisposition(true);
          setShowLeadDisposition(true);
          setShowAppointmentFields(true);
        }

        // setShowLeadDisposition(false)
        // setShowAppointmentFields(false)
        // setShowLeadSubDisposition(true)

        // setshowLeadStatusVisiblity(false);
      }

      setDisableParentComp(true);
      setOpportunityNameSummary(leadData?.opportunity_name);
      setCompanySummary(leadData?.company_id?.company_name);
      setLeadIdSummary(leadData?.lead_Id);
      setCurrentStatusSummary(leadData?.leadStage);
      setIncorpDateSummary(
        new Date(leadData?.created_date).toLocaleDateString("in")
      );
      setCurrentStatsDateSummary(
        new Date(leadData?.created_date).toLocaleDateString("in")
      );

      setCompany_id(leadData?.company_id?._id);
      setreamrkDataArr(leadData?.remarks);

      changeLobOpprtunity(leadData?.lob_for_opportunity);
      setRemark("");

      let _remArr = [];
      leadData?.remarks.map((el) => {
        let _remark = {
          description: el.description,
          dateTime: el.date,
        };
        _remArr.push(_remark);
      });

      _teamMember.map((item) => {
        _teamData.map((el) => {
          if (el.Id === item._Id) _collabotrs.push(item.value);
        });
      });

      setFormItem((res) => ({
        ...res,
        companyName: leadData?.company_id?.company_name,
        parentCompanyName: leadData?.company_id?.parent_company,
        industry: leadData?.company_id?.industry_name,
        empaneled:
          leadData?.company_id?.tata_aig_empaneled === "Yes" ? true : false,
        clientLocation: leadData?.company_id?.client_location,
        LOBForOpportunity: leadData?.lob_for_opportunity,
        productForOpportunity: leadData?.product_for_opportunity,
        opportunityName: leadData?.opportunity_name,
        tenderDriver: leadData?.tender_driven === "Yes" ? true : false,
        status: leadData?.leadStatus,
        disposition: leadData.hasOwnProperty("leadDisposition")
          ? leadData.leadDisposition
          : "",
        subDisposition: leadData.hasOwnProperty("leadsubDisposition")
          ? leadData.leadsubDisposition
          : "",
        appointmentDate: _apptDateFormat,
        appointmentTime: _appntTime,
        collaborators: _collabotrs,
        remarks: _remArr,
      }));

      form.setFieldsValue({
        company_name: leadData?.company_id?.company_name,
        parent_company: leadData?.company_id?.parent_company,
        industry: leadData?.company_id?.industry_name,
        client_location: leadData?.company_id?.client_location,
        lob_for_opportunity: leadData?.lob_for_opportunity,
        product_for_opportunity: leadData?.product_for_opportunity,
        opportunity_name: leadData?.opportunity_name,

        lead_status: leadData?.leadStatus,
        lead_disposition: leadData.hasOwnProperty("leadDisposition")
          ? leadData.leadDisposition
          : "",
        sub_disposition: leadData.hasOwnProperty("leadsubDisposition")
          ? leadData.leadsubDisposition
          : "",
        appointment_date: _apptDateFormat,
        appointment_time: _appntTime,
        collaborators: "",
        // remarks: _remArr,
      });
    } catch (err) {
      console.log("__++++++++++++++ err +++++++++++>>", err);
    }
  };

  const onSelectCompany = async (event, data) => {
    // console.warn("onSelectCompany ----->>>:", event, data);
    setCompany_id(data._id);
    setDisableParentComp(true);
    let result = await axiosRequest.get(
      `admin/company/companies?company_id=${data._id}`,
      { secure: true }
    );
    // console.warn('COMP___RESPPP --------->>>:', result);
    setFormItem((res) => ({
      ...res,
      companyName: event,
      clientLocation: result.companies[0].client_location,
      empaneled:
        result.companies[0].tata_aig_empaneled === "Yes" ? true : false,
      industry: result.companies[0].industry_name,
      parentCompanyName: result.companies[0].parent_company,
    }));

    form.setFieldsValue({
      company_name: event,
      parent_company: result.companies[0].parent_company,
      industry: result.companies[0].industry_name,
      client_location: result.companies[0].client_location,
    });
  };

  const onCompanyChange = (event, data) => {
    // console.warn("onCompanyChange----event----->>>:", event);
    setCompany_id("");
    setFormItem((res) => ({
      ...res,
      companyName: event,
      parentCompanyName: "",
      industry: "",
      clientLocation: "",
      empaneled: false,
    }));
    form.setFieldsValue({
      company_name: event,
      parent_company: "",
      industry: "",
      client_location: "",
    });

    setDisableParentComp(false);

    // let _data = companyArray.filter(el => el.label === event)
  };

  const changeProductOpprtunity = (event) => {
    setFormItem((res) => ({
      ...res,
      productForOpportunity: event,
    }));
  };

  const changeLobOpprtunity = (event) => {
    // console.warn('LOB OPPORTUNITY --------->>>:', event);
    setFormItem((res) => ({
      ...res,
      LOBForOpportunity: event,
      productForOpportunity: "",
    }));
    form.setFieldsValue({
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

  const changeLeadStatus = (event) => {
    setFormItem((res) => ({
      ...res,
      status: event,
    }));
    form.setFieldsValue({
      lead_disposition: "",
    });
    setShowLeadSubDisposition(false);

    if (event === "newleadentery") {
      setDispoArr([]);
      setShowLeadDisposition(false);
      // setShowLeadSubDisposition(false)
    } else if (event === "contact") {
      setDispoArr(contactItems);
      setShowLeadDisposition(true);
    } else if (event === "no_contact") {
      setDispoArr(no_contactItems);
      setShowLeadDisposition(true);
    }

    // const [dispoArr, setDispoArr] = useState([]);
  };

  const changeDispoStatus = (event) => {
    setFormItem((res) => ({
      ...res,
      disposition: event,
    }));

    setShowLeadSubDisposition(true);

    if (event === "leadconverted") {
      setSubDispoArr([
        { label: "Application Started", value: "Application Started" },
        { label: "Application Submitted", value: "Application Submitted" },
      ]);
      setShowAppointmentFields(false);
      setFormItem((res) => ({ ...res, subDisposition: "Application Started" }));
      form.setFieldsValue({ sub_disposition: "Application Started" });
    } else if (event === "notinterested") {
      setSubDispoArr([
        { label: "Lost to Competition", value: "Lost to Competition" },
        { label: "High Price", value: "High Price" },
      ]);
      setShowAppointmentFields(false);

      setFormItem((res) => ({ ...res, subDisposition: "Lost to Competition" }));
      form.setFieldsValue({ sub_disposition: "Lost to Competition" });
    } else if (event === "noteligible") {
      setSubDispoArr([
        { label: "Risk not feasible", value: "Risk not feasible" },
      ]);
      setShowAppointmentFields(false);

      setFormItem((res) => ({ ...res, subDisposition: "Risk not feasible" }));
      form.setFieldsValue({ sub_disposition: "Risk not feasible" });
    } else if (event === "interested") {
      setSubDispoArr([
        { label: "Proposal in progress", value: "Proposal in progress" },
        { label: "Proposal Submitted", value: "Proposal Submitted" },
      ]);
      setShowAppointmentFields(false);

      setFormItem((res) => ({
        ...res,
        subDisposition: "Proposal in progress",
      }));
      form.setFieldsValue({ sub_disposition: "Proposal in progress" });
    } else if (event === "callback") {
      setSubDispoArr([
        { label: "Ask to call back later", value: "Ask to call back later" },
        {
          label: "Decision maker unavailable",
          value: "Decision maker unavailable",
        },
      ]);
      setShowAppointmentFields(true);

      setFormItem((res) => ({
        ...res,
        subDisposition: "Ask to call back later",
      }));
      form.setFieldsValue({ sub_disposition: "Ask to call back later" });
    } else if (event === "appointment") {
      setSubDispoArr([
        {
          label: "Client has given appointment",
          value: "Client has given appointment",
        },
      ]);
      setShowAppointmentFields(true);

      setFormItem((res) => ({
        ...res,
        subDisposition: "Client has given appointment",
      }));
      form.setFieldsValue({ sub_disposition: "Client has given appointment" });
    } else if (event === "invalid") {
      setSubDispoArr([
        { label: "Wrong/Invalid Number", value: "Wrong/Invalid Number" },
      ]);
      setShowAppointmentFields(false);

      setFormItem((res) => ({
        ...res,
        subDisposition: "Wrong/Invalid Number",
      }));
      form.setFieldsValue({ sub_disposition: "Wrong/Invalid Number" });
    } else if (event === "notreachable") {
      setSubDispoArr([{ label: "Not Reachable", value: "Not Reachable" }]);
      setShowAppointmentFields(false);

      setFormItem((res) => ({ ...res, subDisposition: "Not Reachable" }));
      form.setFieldsValue({ sub_disposition: "Not Reachable" });
    }

    // setShowLeadSubDisposition(true)
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const failedHandler = (error) => {
    alert(error);
    console.log(error);
  };

  const onChangeAppointData = (date, dateString) => {
    // console.warn('APOOOOO__DATE___',date)
    // console.warn('APOOOOO__DATE',dateString)
    setFormItem((res) => ({
      ...res,
      appointmentDate: date,
    }));
    setApptDateString(dateString);
    // const [apptDateString, setApptDateString] = useState("");
  };

  const onIndustryChange = (event, data) => {
    setFormItem((res) => ({ ...res, industry: event }));
    form.setFieldsValue({ industry: event });
  };

  const onSelectIndustry = (event, data) => {
    setFormItem((res) => ({ ...res, industry: event }));
    form.setFieldsValue({ industry: event });
  };

  const onParentCompanyChange = (event, data) => {
    setFormItem((res) => ({ ...res, parentCompanyName: event }));
    form.setFieldsValue({ parent_company: event });
  };

  const onSelectParentCompany = (event, data) => {
    setFormItem((res) => ({ ...res, parentCompanyName: event }));
    form.setFieldsValue({ parent_company: event });
  };

  // console.warn("(((((((storeFormData a___BBB))))))):", storeFormData);
  let updateLeadFormData = {
    company_details: {
      company_name: formItem.companyName,
      parent_company: formItem.parentCompanyName,
      industry_name: formItem.industry,
      tata_aig_empaneled: formItem.empaneled === true ? "Yes" : "No",
      client_location: formItem.clientLocation,
    },
    leadStatus: formItem.status,
    leadDisposition: formItem.disposition,
    leadsubDisposition: formItem.subDisposition,
    opportunity_name: formItem.opportunityName,
    tender_driven: formItem.tenderDriver === true ? "Yes" : "No",
    LOB_opportunity: formItem.LOBForOpportunity,
    product_for_opportunity: formItem.productForOpportunity,
    // remarks: formItem.remarks,
    // remarks: reamrkDataArr,
    teamMembers: JSON.stringify(teamDataArr),
    lead_Owner_Id: id,
    lead_Creator_Id: id,
    user_id: id,
    company_id: company_id,
    start_date: apptDateString,
    start_time: formItem.appointmentTime,
    VAS_input: !storeFormData?.VAS_input ? "" : storeFormData?.VAS_input,
    client_expectations: !storeFormData?.client_expectations
      ? ""
      : storeFormData?.client_expectations,
    red_flags: !storeFormData?.red_flags ? "" : storeFormData?.red_flags,
    our_ask: !storeFormData?.our_ask ? "" : storeFormData?.our_ask,
    channel_name: !storeFormData?.channel_name
      ? ""
      : storeFormData?.channel_name,
    producer: !storeFormData?.producer ? "" : storeFormData?.producer,
    VAS_executed: !storeFormData?.VAS_executed
      ? "Yes"
      : storeFormData?.VAS_executed,
    kdm_details: !storeFormData?.company_id?.kdm_details
      ? []
      : storeFormData?.company_id?.kdm_details,
    risk_details: !storeFormData?.company_id?.risk_details
      ? []
      : storeFormData?.company_id?.risk_details,
  };
  // console.warn("(((((((updateLeadFormData a___BBB))))))):", updateLeadFormData);

  const submitHandler = () => {
    // message.destroy()
    // return
    if (formItem.opportunityName === "") {
      return message.warning("Opportunity Name is required");
    }
    if (formItem.LOBForOpportunity === "") {
      return message.warning("LOB for Opportunity is required");
    }
    if (formItem.productForOpportunity === "") {
      return message.warning("Product for Opportunity is required");
    }

    if (formItem.companyName === "") {
      return message.warning("Company Name is required");
    }
    if (formItem.parentCompanyName === "") {
      return message.warning("Parent Company Name is required");
    }
    if (formItem.industry === "") {
      return message.warning("Industry is required");
    }

    let addLeadFormData = {
      company_details: {
        company_name: formItem.companyName,
        parent_company: formItem.parentCompanyName,
        industry_name: formItem.industry,
        tata_aig_empaneled: formItem.empaneled === true ? "Yes" : "No",
        client_location: formItem.clientLocation,
      },
      leadStatus: formItem.status,
      leadDisposition: formItem.disposition,
      leadsubDisposition: formItem.subDisposition,
      opportunity_name: formItem.opportunityName,
      tender_driven: formItem.tenderDriver === true ? "Yes" : "No",
      LOB_opportunity: formItem.LOBForOpportunity,
      product_for_opportunity: formItem.productForOpportunity,
      // remarks: formItem.remarks,
      // remarks: reamrkDataArr,
      // teamMembers : "[{\"first_name\":\"Prithvi\",\"last_name\":\"Raj\",\"Id\":\"63ad6488d19ed8185f3b0d00\"}]",
      teamMembers: JSON.stringify(teamDataArr),
      lead_Owner_Id: id,
      lead_Creator_Id: id,
      user_id: id,
      company_id: company_id,
      start_date: apptDateString,
      start_time: formItem.appointmentTime,
      client_expectations: "",
      red_flags: "",
      our_ask: "",
      channel_name: "",
      producer: "",
      VAS_executed: "Yes",
      VAS_input: "",
      kdm_details: [],
      risk_details: [],
    };

    console.warn("(((((((isNewLead a___BBB))))))):", addLeadFormData);
    if (isNewLead) {
      dispatch(actions.fetchLeadUpdateBody(addLeadFormData));
      dispatch(actions.createLead(addLeadFormData)).then((res) => {
        console.log("CREATE_LEAD_SUCCESS:", res);
        if (res.type === "CREATE_LEAD_SUCCESS") {
          console.log("success:", res.formData);
          // setErrorMessage(successMsg)
          // if(res.formData.length > 0){
          setIsNewLead(false);

          setOpportunityNameSummary(res?.formData?.opportunity_name);
          setCompanySummary(res?.formData?.lob_for_opportunity);
          setCurrentStatusSummary(res?.formData?.leadStage);
          setLeadIdSummary(res?.formData?.lead_Id);
          getEventTodoCountAPI(res?.formData?._id);

          setIncorpDateSummary(
            new Date(res?.formData?.created_date).toLocaleDateString("in")
          );
          setCurrentStatsDateSummary(
            new Date(res?.formData?.created_date).toLocaleDateString("in")
          );
          // setEventCountSummary(res?.formData)
          // setTodoCreatdSummary(res?.formData)
          // setTodoComplteSummary(res?.formData)
          setLeadIdData(res?.formData?._id);
          // dispatch(actions.fetchLeadDetailsSuccess({}))
          // }
        }
        // console.warn('(((((((leadIdData___BBB))))))):', leadIdData);
      });
    } else {
      dispatch(actions.fetchLeadUpdateBody(updateLeadFormData));

      let _lead_id = storeLeadId !== undefined ? storeLeadId : leadIdData;
      // console.log('_lead_id=-------->>>>',_lead_id)
      dispatch(actions.editLead(updateLeadFormData, _lead_id)).then((res) => {
        if (res.type === "EDIT_LEAD_SUCCESS") {
          console.log("success___UPDATE:", res);
          getEventTodoCountAPI(res.formData._id);
          setErrorMessage(successMsg);
          setIsNewLead(false);
        } else if (res.type === "EDIT_LEAD_FAIL") {
          failedHandler(res.error);
        }
      });
      // history.push('leaddetails/personallead')
    }
  };

  const resetDataFields = () => {
    // console.log('RESET FUNCTIONNNN ___----->>> ')
    setFormItem((res) => ({
      ...res,
      // companyName: "",
      // parentCompanyName: "",
      // industry: "",
      // empaneled: false,
      // clientLocation: "",
      // LOBForOpportunity: "",
      // productForOpportunity: "",
      opportunityName: "",
      // tenderDriver: false,
      status: "newleadentery",
      disposition: "",
      subDisposition: "",
      appointmentDate: "",
      appointmentTime: "",
      collaborators: [],
      // remarks: [],
    }));
    setIsNewLead(true);
    setOpportunityNameSummary("-");
    setCompanySummary("-");
    setCurrentStatusSummary("-");
    setLeadIdSummary("");
    setIncorpDateSummary("-");
    setCurrentStatsDateSummary("-");
    setEventCountSummary("00");
    setTodoCreatdSummary("00");
    setTodoComplteSummary("00");

    setShowLeadSubDisposition(false);
    setShowLeadDisposition(false);
    setShowAppointmentFields(false);

    form.setFieldsValue({
      // company_name: '',
      // parent_company: '',
      // industry: '',
      // client_location: '',
      // lob_for_opportunity: '',
      // product_for_opportunity: '',
      opportunity_name: "",
      lead_status: "newleadentery",
      lead_disposition: "",
      sub_disposition: "",
      appointment_date: "",
      appointment_time: "",
      collaborators: [],
      // remarks: [],
    });
  };
  // console.log('TODO POPUPPPP _____DATAA_________',childRef);

  const openTodoPopup = () => {
    // console.log("TODO POPUPPPP ______________");
    setIsModalVisible(true);
  };

  const getTodo = () => {
    childRef.current.getTodoData(0);
    // getEventTodoCountAPI(res.formData._id);
  };

  const onSelectTeam = (value) => {
    // console.log('ON SELECTION ______________', value);
  };

  const onChangeTeam = (text, data) => {
    // console.log(text, 'text------>')
    // console.log(data, 'data------>')
    setTeamMemberData(text);
  };

  const showEventAndTodo = (event) => {
    console.log("event------>", event);
    if (event === "todo") {
      setTodoCountBgColor("#cea0e11f");
      setEventCountBgColor("");
      setShowEventTodoList(true);
    } else {
      setTodoCountBgColor("");
      setEventCountBgColor("#00acc114");
      setShowEventTodoList(false);
    }
  };

  const removeCollaborators = (data, index) => {
    setFormItem((res) => ({
      ...res,
      collaborators: res.collaborators.filter((item, ind) => index !== ind),
    }));

    let _dataArr = teamDataArr.filter(
      (item) => item.first_name !== data.split(" ")[0]
    );
    //  console.log('ON _dataArr ______________', _dataArr);
    setTeamDataArr(_dataArr);
  };

  const filterCollaborators = (inputValue, option) => {
    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  const add3Dots = (string, limit) => {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  };
  const dateFun = (time) => {
    let finalTimeobj = timeList.filter((item) => {
      return item.value == time;
    });
    let finalTime = finalTimeobj[0]?.dispValue;
    return finalTime;
  };

  if (leadDataLoading && _.isEmpty(storeFormData)) {
    return <Spin />;
  }

  let _chipData = [...new Set(formItem.collaborators)];
  // console.warn('((((((((((( NOT NEW__updateLeadID )))))))))))',updateLeadID)
  return (
    <>
      <Tabs
        tabMenu={tabMenu}
        // header={opportunityNameSummary === "-" ? "New Lead" : "Update Lead"}
        header={storeFormData && storeFormData._id ? "Update Lead" : "New Lead"}
        activeKey="1"
        resetDataFields={resetDataFields}
        openTodoPopup={openTodoPopup}
        routeLeadData={
          props.location.state !== undefined
            ? props.location.state.hasOwnProperty("_leadData")
              ? props.location.state._leadData._id
              : props.location.state.leadID
            : leadIdData
        }
        updateFormData={updateLeadFormData}
      />

      <div className="form-container">
        <Form form={form} onFinish={submitHandler}>
          <Row justify={width > breakpoint ? "" : "center"} gutter={[0, 24]}>
            <Col
              className={`form-body p40 mb-2 ${width > 991 ? "p40" : "p50"}`}
              style={{ padding: 20, height: "max-content" }}
              xs={{ span: 24, order: 1 }}
              sm={{ span: 16, order: 1 }}
              md={{ span: 16, order: 1 }}
              lg={{ span: 7, order: 2 }}
              xl={{ span: 7, order: 2 }}
              span={23}
            >
              <Row>
                <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                  {storeFormData && storeFormData._id ? (
                    <div className="d-flex justify-content-between">
                      <p className="form-title">Summary</p>
                      <p className="text-dark">Score - 75</p>
                    </div>
                  ) : (
                    <p className="form-title">Summary</p>
                  )}

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Opportunity Name</p>
                      <p className="summary_data">{opportunityNameSummary}</p>
                      <p className="summary_sub_data">
                        Incorporation Date: {incorpDateSummary}
                      </p>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} span={24}>
                      <p className="summary_heading">Company</p>
                      <p className="summary_data">{companySummary}</p>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12} span={24}>
                      <p className="summary_heading">Lead Id</p>
                      <p
                        className="summary_data"
                        style={{ textTransform: "uppercase" }}
                      >
                        {leadIdSummary}
                      </p>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Current Status</p>
                      <p className="summary_data">{currentStatusSummary}</p>
                      <i
                        className="summary_sub_data"
                        style={{ fontStyle: "italic" }}
                      >
                        - As on {currentStatsDateSummary}
                      </i>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Engagement</p>
                      <Row className="d-flex justify-content-start align-items-center">
                        <Col span={8}>
                          <div
                            onClick={() => showEventAndTodo("events")}
                            style={{ backgroundColor: eventCountBgColor }}
                            className="event_box"
                          >
                            <h2 className="d-flex align-items-center mb-1">
                              <CalendarOutlined style={{ marginRight: 5 }} />{" "}
                              Events
                            </h2>
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="count">{eventCountSummary}</div>
                              <div className="label">Events Created</div>
                            </div>
                          </div>
                        </Col>
                        <Col span={15} style={{ marginLeft: 5 }}>
                          <div
                            onClick={() => showEventAndTodo("todo")}
                            style={{ backgroundColor: todoCountBgColor }}
                            className="todo_box"
                          >
                            <h2 className="d-flex align-items-center mb-1">
                              <FileDoneOutlined style={{ marginRight: 5 }} /> To
                              Do
                            </h2>
                            <div className="d-flex">
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="count">{todoCreatdSummary}</div>
                                <div className="label">Todo Created</div>
                              </div>
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="count">
                                  {todoComplteSummary}
                                </div>
                                <div className="label">Todo Completed</div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {!isNewLead && (
                    <>
                      {!showEventTodoList ? (
                        <>
                          <div
                            style={{ height: 1, backgroundColor: "#e6e9eb" }}
                          ></div>
                          <p style={{ fontSize: 16, marginTop: 10 }}>Events</p>

                          {activities_data &&
                          !_.isEmpty(activities_data) &&
                          activities_data !== "No appointment " ? (
                            <div className="lead-activity-block">
                              {activities_data?.map((item) => {
                                return (
                                  <div
                                    className="lead-action-cards-content-activity"
                                    key={item._id}
                                  >
                                    <div>
                                      <p className="appoinment_date">
                                        {moment(item.start_date).format(
                                          "D MMM YYYY"
                                        )}{" "}
                                      </p>
                                      <div className="lead-appointment_data">
                                        <p style={{ marginBottom: 5 }}>
                                          {dateFun(item.start_time)}
                                        </p>
                                        <p
                                          style={{
                                            fontWeight: "bold",
                                            marginBottom: 5,
                                          }}
                                        >
                                          {item.event_name}
                                        </p>
                                        <p style={{ marginBottom: 5 }}>
                                          {dateFun(item.end_time)}
                                        </p>
                                      </div>
                                      <div id="truncateLongTextsLead">
                                        <p style={{ marginBottom: 0 }}>
                                          {add3Dots(item.event_description, 50)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 50,
                              }}
                            >
                              <img
                                src={noDataIcon}
                                style={{ height: 150, width: 100 }}
                              />
                              <div style={{ marginTop: 10 }}>
                                <text
                                  style={{ textAlign: "center", fontSize: 14 }}
                                >
                                  {" "}
                                  No records found{" "}
                                </text>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div
                            style={{ height: 1, backgroundColor: "#e6e9eb" }}
                          ></div>
                          <p style={{ fontSize: 16, marginTop: 10 }}>To Do</p>
                          <div className="TodoCards">
                            <TodoCards leadID={updateLeadID} ref={childRef} />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Col>
            <Col
              // className="form-body p50 mb-2"
              xs={{ span: 24, order: 2 }}
              sm={{ span: 16, order: 2 }}
              md={{ span: 16, order: 2 }}
              lg={{ span: 16, order: 1 }}
              xl={{ span: 16, order: 1 }}
              span={23}
              // offset={width > breakpoint ? 2 : 0}
              style={{ height: "max-content" }}
            >
              <Col
                className="form-body p50 mb-3"
                // xs={{ span: 24, order: 2 }}
                // sm={{ span: 16, order: 2 }}
                // md={{ span: 16, order: 2 }}
                // lg={{ span: 14, order: 1 }}
                // xl={{ span: 14, order: 1 }}
                span={23}
                offset={width > breakpoint ? 2 : 0}
                // style={{height:'max-content'}}
              >
                <p className="form-title">Company Details</p>
                <Row gutter={16} className="mb-2 statsLead">
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="company_name"
                      label="Company Name"
                      rules={[
                        {
                          required: false,
                          message: "Select your Company",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <AutoComplete
                        placeholder="Select"
                        options={companyArray}
                        value={formItem.companyName}
                        onChange={(val, data) => onCompanyChange(val, data)}
                        onSelect={(val, data) => onSelectCompany(val, data)}
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
                      name="parent_company"
                      label="Parent Company Name"
                      // rules={[
                      //   {
                      //     required: false,
                      //     message: "Select your Parent Company",
                      //   },
                      // ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <AutoComplete
                        disabled={disableParentComp}
                        placeholder="Select"
                        options={parentCompArray}
                        value={formItem.parentCompanyName}
                        onChange={(val, data) =>
                          onParentCompanyChange(val, data)
                        }
                        onSelect={(val, data) =>
                          onSelectParentCompany(val, data)
                        }
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
                      name="industry"
                      label="Industry"
                      rules={[
                        {
                          required: false,
                          message: "Select Industry",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <AutoComplete
                        disabled={disableParentComp}
                        placeholder="Select"
                        options={industryArray}
                        value={formItem.industry}
                        onChange={(val, data) => onIndustryChange(val, data)}
                        onSelect={(val, data) => onSelectIndustry(val, data)}
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
                      label="TATA AIG is empaneled?"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Radio.Group
                        name="radiogroup"
                        onChange={(e) =>
                          setFormItem((res) => ({
                            ...res,
                            empaneled: e.target.value,
                          }))
                        }
                        value={formItem.empaneled}
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
                      name="client_location"
                      label="Client Location"
                      rules={[
                        {
                          required: false,
                          message: "Select your Location",
                        },
                        {
                          message: "Only Alphabets are Allowed",
                          pattern: new RegExp(/^[a-zA-Z ]+$/),
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        placeholder="Enter Location"
                        value={formItem.clientLocation}
                        onChange={(val) =>
                          setFormItem((res) => ({
                            ...res,
                            clientLocation: val.target.value,
                          }))
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col
                className="form-body  p50 mb-3"
                xs={{ order: 3 }}
                // sm={16}
                // md={16}
                // lg={14}
                // xl={14}
                span={23}
                offset={width > breakpoint ? 2 : 0}
              >
                <p className="form-title">Opportunity Details</p>
                <Row gutter={16} className="mb-2 statsLead">
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
                        value={formItem.LOBForOpportunity}
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
                        value={formItem.productForOpportunity}
                        onChange={(val) => changeProductOpprtunity(val)}
                      ></Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="opportunity_name"
                      label="Opportunity Name"
                      rules={[
                        {
                          required: false,
                          message: "Opportunity Name is required",
                        },
                        {
                          message: "Only Alphabets are Allowed",
                          pattern: new RegExp(/^[a-zA-Z ]+$/),
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="phone-no"
                        placeholder="Full Name"
                        value={formItem.opportunityName}
                        onChange={(val) =>
                          setFormItem((res) => ({
                            ...res,
                            opportunityName: val.target.value,
                          }))
                        }
                      />
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
                        value={formItem.tenderDriver}
                        onChange={(val) =>
                          setFormItem((res) => ({
                            ...res,
                            tenderDriver: val.target.value,
                          }))
                        }
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col
                className="form-body  p50 mb-3"
                xs={{ order: 3 }}
                // sm={16}
                // md={16}
                // lg={14}
                // xl={14}
                span={23}
                offset={width > breakpoint ? 2 : 0}
              >
                <p className="form-title">Opportunities Status</p>
                <Row gutter={16} className="mb-2 statsLead">
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="lead_status"
                      label="Status"
                      rules={[
                        {
                          required: false,
                          message: "Select",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        placeholder="Select"
                        options={leadStatusItems}
                        value={formItem.status}
                        onChange={(val) => changeLeadStatus(val)}
                      ></Select>
                    </Form.Item>
                  </Col>

                  {showLeadDisposition && (
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="lead_disposition"
                        label="Disposition"
                        rules={[
                          {
                            required: false,
                            message: "Select",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Select
                          placeholder="Select"
                          options={dispoArr}
                          value={formItem.disposition}
                          onChange={(val) => changeDispoStatus(val)}
                        ></Select>
                      </Form.Item>
                    </Col>
                  )}

                  {showLeadSubDisposition && (
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="sub_disposition"
                        label="Sub Disposition"
                        rules={[
                          {
                            required: false,
                            message: "Select",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Select
                          placeholder="Select"
                          options={subdispoArr}
                          value={formItem.subDisposition}
                          onChange={(val) =>
                            setFormItem((res) => ({
                              ...res,
                              subDisposition: val,
                            }))
                          }
                        ></Select>
                      </Form.Item>
                    </Col>
                  )}
                </Row>
                {showAppointmentFields && (
                  <Row gutter={16} className="mb-2 statsLead">
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointment_date"
                        label="Appointment Date"
                        rules={[
                          {
                            required: false,
                            message: "Select",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          onChange={onChangeAppointData}
                          value={formItem.appointmentDate}
                          format="MM/DD/YYYY"
                          style={{ display: "flex", flex: 1 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointment_time"
                        label="Appointment Time"
                        rules={[
                          {
                            required: false,
                            message: "Select",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Select
                          placeholder="Select"
                          options={appointmentTimeOptions}
                          value={formItem.appointmentTime}
                          onChange={(val) =>
                            setFormItem((res) => ({
                              ...res,
                              appointmentTime: val,
                            }))
                          }
                        ></Select>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Col>

              <Col
                className="form-body p50 mb-3"
                xs={{ order: 3 }}
                // sm={16}
                // md={16}
                // lg={14}
                // xl={14}
                span={24}
                offset={width > breakpoint ? 2 : 0}
              >
                <p className="form-title">Collaborator</p>
                <Row gutter={16} className="mb-2 statsLead">
                  <Col span={12} className="d-flex align-items-center">
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color w-100"
                      name="collaborators"
                      label="Add Collaborators"
                      rules={[
                        {
                          required: false,
                          message: "",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <AutoComplete
                        value={teamMemberData}
                        searchValue={teamMemberData}
                        style={{ width: "100%" }}
                        options={hierarAgentList}
                        onChange={(text, data) => onChangeTeam(text, data)}
                        onSelect={onSelectTeam}
                        notFoundContent="No Result Found"
                        placeholder="Enter Collaborator"
                        filterOption={(inputValue, option) =>
                          filterCollaborators(inputValue, option)
                        }
                      >
                        {/* <Search placeholder="Search by Name" /> */}
                      </AutoComplete>
                    </Form.Item>
                    <Button
                      style={{
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "16px",
                        marginLeft: 10,
                        backgroundColor: "#00ACC1",
                        color: "#fff",
                      }}
                      icon={<PlusOutlined />}
                      onClick={addCollaborators}
                    >
                      ADD
                    </Button>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex flex-wrap justify-content-start mb-2">
                      {/* {console.log('formItem.collaborators--->>>',_chipData)} */}
                      {_chipData &&
                        _chipData.map((res, index) => (
                          <div
                            key={index}
                            className="add_collaborators_items shadow-sm"
                          >
                            {res + " "}
                            <CloseOutlined
                              onClick={() => removeCollaborators(res, index)}
                              style={{ marginLeft: 10, fontWeight: "bolder" }}
                            />
                          </div>
                        ))}
                    </div>
                  </Col>

                  {storeFormData && storeFormData._id && (
                    <Col span={18} className="d-flex align-items-center">
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color w-100"
                        name="remarks"
                        label="Remarks"
                        rules={[
                          {
                            required: false,
                            message: "",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Input
                          type="text"
                          className="phone-no"
                          placeholder="Enter"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                        />
                      </Form.Item>
                      <Button
                        type="primary"
                        style={{
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          marginTop: "16px",
                          marginLeft: 10,
                          backgroundColor: "#00ACC1",
                        }}
                        icon={<PlusOutlined />}
                        onClick={addRemarks}
                      >
                        ADD
                      </Button>
                    </Col>
                  )}

                  <Col
                    className="post mt-3 w-100"
                    id="chat_section"
                    style={{
                      fontSize: "smaller",
                      height:
                        reamrkDataArr && reamrkDataArr.length > 0
                          ? "311px"
                          : "",
                      overflowY: "auto",
                    }}
                  >
                    {reamrkDataArr
                      .slice(0)
                      .reverse()
                      .map((res, index) => (
                        <div
                          key={res.date}
                          className={
                            "mb-3 remarks_bg " +
                            (login_user.id === res.userId._id
                              ? "left"
                              : "right")
                          }
                        >
                          <div className="d-flex justify-content-between w-100">
                            {/* <div className="">{login_user.full_name}</div> */}
                            <div className="me-3">{res.userId.full_name}</div>
                            <div className="me-3">
                              {moment(res.date).format("DD/MM/YYYY hh:mm:ss a")}
                            </div>
                          </div>
                          <div>{res.description}</div>
                        </div>
                      ))}
                  </Col>
                </Row>
              </Col>

              <Col
                className="form-body p30 mb-3"
                xs={{ order: 5, span: 23 }}
                // sm={16}
                // md={16}
                // lg={14}
                // xl={14}
                span={23}
                offset={width > breakpoint ? 2 : 0}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {/* <Row  > */}
                <Form.Item>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "rgb(59, 55, 30)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 5,
                      padding: 20,
                    }}
                    htmlType="submit"
                  >
                    Save and Update
                  </Button>
                </Form.Item>

                {/* </Row> */}
              </Col>
            </Col>
          </Row>
        </Form>
      </div>
      <TodoTab
        getTodoData={getTodo}
        button={"Create"}
        leadID={updateLeadID}
        companyID={company_id}
        company_Name={formItem.companyName}
        opportunity_Name={formItem.opportunityName}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
});

export default NewLead;
