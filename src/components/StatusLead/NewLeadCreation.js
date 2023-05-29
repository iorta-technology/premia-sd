import React, { useState, useEffect, createRef, useRef } from "react";
import "./StatusLead.css";
import {
  no_contactItems,
  contactItems,
  industryDataArr,
  timeList,
  cityZoneList,
} from "./dataSet";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  Modal,
  Spin,
  Radio,
  AutoComplete,
  message,
  Image,
  Progress
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Tabs from "../Tab/Tab";
import _ from "lodash";
import { checkAgent, doSentenceCase } from "../../helpers";
import moment from "moment";
import axiosRequest from "../../axios-request/request.methods";
import TodoTab from "../Activitity Tracker/RightSide-Todo/TodoCreate-Tab/Todo-Tab";
import { Link, useHistory } from "react-router-dom";
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
  const [showRiskDetailsPopup, setShowRiskDetailsPopup] = useState(true);
  const history = useHistory();
  const childRef = useRef(null);

  const addCollaborators = () => {
    if (teamMemberData && teamMemberData != "") {
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
    }
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
    parentCompanyName: null,
    industry: "",
    empaneled: false,
    clientLocation: "",
    clientZone:"",
    // LOBForOpportunity: "",
    // productForOpportunity: "",
    // opportunityName: "",
    // tenderDriver: false,
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

  useEffect(() => {
    let _clientLoc = cityZoneList.map(el =>{
      let _data = { label:el.City,value:el.City }
      return _data
    })
    setClienLocArr(_clientLoc)
    // const [clienLocArr, setClienLocArr] = useState([]);
    // console.warn('((((((((((( _clientLoc )))))))))))', _clientLoc)
  }, []);

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
  const [leadScore, setLeadScore] = useState("");
  const [apptDateString, setApptDateString] = useState("");
  const [todoCountBgColor, setTodoCountBgColor] = useState("");
  const [eventCountBgColor, setEventCountBgColor] = useState("#00acc114");
  const [showEventTodoList, setShowEventTodoList] = useState(false);
  const [activities_data, setActivities_data] = useState([]);
  const [updateLeadID, setUpdateLeadID] = useState("");
  const [clienLocArr, setClienLocArr] = useState([]);

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
    // console.log("COUTNTTTTT DATA---->>>", _result);
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
      if (leadData.leadDisposition === "appointment" && leadData.leadStatus === "contact") {
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
      // setOpportunityNameSummary(leadData?.opportunity_name);
      setCompanySummary(leadData?.company_id?.company_name);
      setLeadIdSummary(leadData?.lead_Id);
      setLeadScore(leadData?.weightage);
      setCurrentStatusSummary(leadData?.leadStage);
      setIncorpDateSummary(
        new Date(leadData?.created_date).toLocaleDateString("in")
      );
      setCurrentStatsDateSummary(
        new Date(leadData?.created_date).toLocaleDateString("in")
      );

      setCompany_id(leadData?.company_id?._id);
      setreamrkDataArr(leadData?.remarks);

      // changeLobOpprtunity(leadData?.lob_for_opportunity);
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

      clientLocationChange(leadData?.company_id?.client_location)

      setFormItem((res) => ({
        ...res,
        companyName: leadData?.company_id?.company_name,
        parentCompanyName: leadData?.parent_company?._id,
        industry: leadData?.company_id?.industry_name,
        empaneled:
          leadData?.company_id?.tata_aig_empaneled === "Yes" ? true : false,
        clientLocation: leadData?.company_id?.client_location,
        // LOBForOpportunity: leadData?.lob_for_opportunity,
        // productForOpportunity: leadData?.product_for_opportunity,
        // opportunityName: leadData?.opportunity_name,
        // tenderDriver: leadData?.tender_driven === "Yes" ? true : false,
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
        parent_company: leadData?.parent_company?.company_name,
        industry: leadData?.company_id?.industry_name,
        client_location: leadData?.company_id?.client_location,
        // lob_for_opportunity: leadData?.lob_for_opportunity,
        product_for_opportunity: leadData?.product_for_opportunity,
        // opportunity_name: leadData?.opportunity_name,

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
    console.warn('COMP___RESPPP --------->>>:', result);
    setFormItem((res) => ({
      ...res,
      companyName: event,
      // clientLocation: result.companies[0].client_location,
      empaneled:
        result.companies[0].tata_aig_empaneled === "Yes" ? true : false,
      industry: result.companies[0].industry_name,
      parentCompanyName: !result.companies[0].parent_company ? null : result.companies[0].parent_company._id,
    }));

    form.setFieldsValue({
      company_name: event,
      parent_company: !result.companies[0].parent_company ? undefined : result.companies[0].parent_company.company_name,
      industry: result.companies[0].industry_name,
      // client_location: result.companies[0].client_location,
    });
  };

  const onCompanyChange = (event, data) => {
    // console.warn("onCompanyChange----event----->>>:", event);
    setCompany_id("");
    setFormItem((res) => ({
      ...res,
      companyName: event,
      parentCompanyName: null,
      industry: "",
      clientLocation: "",
      empaneled: false,
    }));
    form.setFieldsValue({
      company_name: event,
      parent_company: null,
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
      setShowAppointmentFields(false)
      // setShowLeadSubDisposition(false)
    } else if (event === "contact") {
      setDispoArr(contactItems);
      setShowLeadDisposition(true);
      setShowAppointmentFields(false)
    } else if (event === "no_contact") {
      setDispoArr(no_contactItems);
      setShowLeadDisposition(true);
      setShowAppointmentFields(false)
    }

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
    setFormItem((res) => ({
      ...res,
      appointmentDate: date,
    }));
    setApptDateString(dateString);
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
    setFormItem((res) => ({ ...res, parentCompanyName: data._id }));
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
      zone:formItem.clientZone,
    },
    leadStatus: formItem.status,
    leadDisposition: formItem.disposition,
    leadsubDisposition: formItem.subDisposition,
    // opportunity_name: formItem.opportunityName,
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
  

  const submitHandler = () => {
    if (formItem.companyName === "") {
      return message.warning("Company Name is required");
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
        zone:formItem.clientZone,
      },
      leadStatus: formItem.status,
      leadDisposition: formItem.disposition,
      leadsubDisposition: formItem.subDisposition,
      // opportunity_name: formItem.opportunityName,
      
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

    // console.warn("(((((((isNewLead a___BBB))))))):", addLeadFormData);
    if (isNewLead) {
      dispatch(actions.fetchLeadUpdateBody(addLeadFormData));
      dispatch(actions.createLead(addLeadFormData)).then((res) => {
        console.log("CREATE_LEAD_SUCCESS:", res);
        if (res?.type === "CREATE_LEAD_SUCCESS") {
          console.log("success:", res?.formData);
          // setErrorMessage(successMsg)
          // if (res?.formData.length === 0) return
           
          if (res?.formData.length > 0 || Object.keys(res?.formData).length > 0) {
            console.warn('(((((((IFFFF))))))):',res?.formData);
            setIsNewLead(false);

            // setOpportunityNameSummary(res?.formData?.opportunity_name);
            // setCompanySummary(res?.formData?.lob_for_opportunity);
            setCurrentStatusSummary(res?.formData?.leadStage);
            setLeadIdSummary(res?.formData?.lead_Id);
            setLeadScore(res?.formData?.weightage);
            // const [leadScore, setLeadScore] = useState("");
            getEventTodoCountAPI(res?.formData?._id);
            getAppointmentList(res?.formData?._id);
            setCompany_id(res?.formData?.company_id?._id);

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
          }
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
          getAppointmentList(res.formData._id);
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
      // opportunityName: "",
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
    setLeadScore("");
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
      // opportunity_name: "",
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

  const clientLocationChange = (event) =>{
    // console.log('clientLocationChange------->>>',event)
    setFormItem((res) => ({ ...res, clientLocation: event }));
    form.setFieldsValue({ client_location: event })

    let _zoneData = cityZoneList.filter(el => el.City.toLowerCase() === event.toLowerCase() )
    console.log('_zone ------->>>',_zoneData)
    if(_zoneData.length > 0){
      setFormItem((res) => ({ ...res, clientZone: _zoneData[0].Zone }));
      form.setFieldsValue({ client_zone: _zoneData[0].Zone })
    }else{
      setFormItem((res) => ({ ...res, clientZone: '' }));
      form.setFieldsValue({ client_zone: '' })
    }
    
  };

  if (leadDataLoading && _.isEmpty(storeFormData)) {
    return <Spin />;
  }

  let _chipData = [...new Set(formItem.collaborators)];
  
  return (
    <>
          <Modal
        title="Add New Lead"
        centered={true}
        visible={showRiskDetailsPopup}
        width={700}
        className="modalStyle"
        onCancel={() => history.push("/home")}
        
        footer={null}
      >
        <Form form={form} onFinish={submitHandler}>
          <Row justify={width > breakpoint ? "center" : ""} gutter={[0, 24]}>
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 16, order: 2 }}
              lg={{ span: 15, order: 1 }}
              xl={{ span: 24, order: 1 }}
              span={23}
              style={{ height: "max-content" }}
            >
              {/* <Col
                className="form-body p50 mb-3"
                // span={23}
                offset={width > breakpoint ? 2 : 0}
              > */}
                {/* <p className="form-title">Company Details</p> */}
                <Row gutter={16} className="mb-2 statsLead">
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name txt_color "
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
                      className="form-item-name txt_color"
                      name="parent_company"
                      label="Parent Company Name"
                      
                      style={{ marginBottom: "1rem" }}
                    >
                      

                      <Select
                        disabled={disableParentComp}
                        placeholder="Select"
                        options={companyArray}
                        value={formItem.parentCompanyName}
                        onChange={(val,data) => onParentCompanyChange(val,data)}
                      ></Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name txt_color"
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
                      className="form-item-name txt_color"
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
                      className="form-item-name txt_color"
                      name="client_location"
                      label="Client Location"
                      style={{ marginBottom: "1rem" }}
                    >
                      <AutoComplete
                        placeholder="Select"
                        options={clienLocArr}
                        value={formItem.clientLocation}
                        onChange={(val, data) => clientLocationChange(val, data)}
                        // onSelect={(val, data) => onSelectIndustry(val, data)}
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
                      className="form-item-name txt_color"
                      name="client_zone"
                      label="Zone"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        placeholder="Enter zone"
                        value={formItem.clientZone}
                        disabled={true}
                        onChange={(val) =>
                          setFormItem((res) => ({
                            ...res,
                            clientZone: val.target.value,
                          }))
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item>
                  <Button
                    type="primary"
                    className="cancel_btn"
                    onClick={() => history.push("/home")}
                    
                    size="large"
                  >
                    <p className="cancel_txt">Cancel</p>
                  </Button>
                </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item>
                  <Button
                    type="primary"
                    className="submit_btn"
                    htmlType="submit"
                    size="large"
                  >
                    Submit
                  </Button>
                </Form.Item>
                  </Col>
                </Row>
              {/* </Col> */}

            </Col>

          </Row>
        </Form>
      {/* </div> */}
            </Modal>
      <TodoTab
        button={"Create"}
        companyID={company_id}
        company_Name={formItem.companyName}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
});

export default NewLead;
