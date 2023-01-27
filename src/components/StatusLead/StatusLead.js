import React, { useState, useEffect, createRef } from "react";
import useInput from "../hooks/use-input";
import "./StatusLead.css";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  Cascader,
  DatePicker,
  Space,
  Modal,
  Table,
  TimePicker,
  Spin,
  Radio,
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
import FloatButton from "../FloatButton/FloatButton";
import { msToDateString } from "../../helpers";
import _ from "lodash";
import { checkAgent, milToDateString } from "../../helpers";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import axiosRequest from "../../axios-request/request.methods";

const minimumDate = moment().format("YYYY-MM-DD");
const { Option } = Select;
const optionsData = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "disabled",
    label: "Disabled",
  },
];
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
  // {
  //   id: 3,
  //   value: "Proposal Details"
  // },
  // {
  //   id: 4,
  //   value: "Documents Upload"
  // },
  {
    id: 3,
    value: "History",
  },
];
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isNumberValid = (value) => value.trim() !== "" && value.length === 10;

const NewLead = React.memo((props) => {
  const [collaborators, setCollaborators] = useState("sadiqu");
  const [remark, setRemark] = useState("sadiqu");

  const addCollaborators = () => {
    setFormItem((res) => ({
      ...res,
      collaborators: [...formItem.collaborators, collaborators],
    }));
    setCollaborators("");
  };

  const addRemarks = () => {
    setFormItem((res) => ({
      ...res,
      remarks: [...formItem.remarks, remark],
    }));
    setRemark("");
  };

  const submitHandler = () => {
    console.log("formItem", formItem);
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
    status: "",
    disposition: "",
    subDisposition: "",
    appointmentDate: "",
    appointmentTime: "",
    collaborators: [],
    remarks: [],
  });

  // let formRef = createRef();
  const dispatch = useDispatch();
  // const history = useHistory()
  const [form] = Form.useForm();
  useEffect(() => {
    // dispatch(actions.fetchTeamMember())
    // console.warn('LEAD__ID__FROM___ROUTE___',props.location.state)
    dispatch(actions.headerName("New Lead"));
    if (props.location.state !== undefined) {
      let _leadID = props.location.state.leadID;
      // setshowLeadStatusVisiblity(true)
      getLeadDetails(_leadID);
      setMobileDisable(true);
      setIsNewLead(false);
    } else {
      setIsNewLead(true);
      setMobileDisable(false);
      form.setFieldsValue({
        leadType: "NewBusiness",
        leadStatus: ["newleadentery"],
      });
      // ['newleadentery','','']
      // storeFormData.lead_Id !== '' ? setIsNewLead(false) : setIsNewLead(true)
    }

    // dispatch(actions.fetchLeadDetails(_leadID));
    dispatch(actions.fetchAllState());
  }, [dispatch]);

  const id = useSelector((state) => state.login.user.id);
  const channelCode = useSelector((state) => state.login.user.channelCode);
  const states = useSelector((state) => state.address.states);
  const minValue = useSelector((state) => state.login.minValue);
  const levelCode = useSelector((state) => state.login);

  // store form data
  let storeFormData = useSelector((state) => state?.newLead?.formData);
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  // console.warn('((((((((((( levelCode )))))))))))', levelCode)
  delete storeFormData["appointmentId"];
  delete storeFormData["appointmentDate"];

  let leadDataLoading = useSelector((state) => state.newLead.leadDataloading);
  // let payloadFormData = useSelector((state) => state.newLead.payloadFormData)
  let storeLeadId = useSelector((state) => state.newLead.leadId);
  const successMsg = useSelector((state) => state.newLead.successMsg);
  // const errorMsg = useSelector((state) => state.newLead.errorMessage)
  // const { lastupdatedOn } = storeFormData

  // lead summary
  // const leadIdValue = useSelector((state) => state.newLead.formData.lead_Id)
  const createdDateValue = useSelector(
    (state) => state.newLead.formData.created_date
  );
  const [leadIDSummary, setleadIDSummary] = useState("");
  const [firstNameSummary, setFirstNameSummary] = useState("");
  const [lastNameSummary, setLastNameSummary] = useState("");
  const [mobileNoSummary, setMobileNoSummary] = useState("");
  const [stateSummary, setStateSummary] = useState("");
  const [citySummary, setCitySummary] = useState("");
  const [mobileDisable, setMobileDisable] = useState(false);

  const [leadAge, setLeadAge] = useState("");
  const [leadGender, setLeadGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [leadOccupation, setLeadOccupation] = useState("");
  const [leadVehiclesOwned, setLeadVehiclesOwned] = useState("");
  const [leadSourceOfactivity, setLeadSourceOfactivity] = useState("");

  // responsive styling hook
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [firstName, setFirstName] = useState("");
  // console.warn('((((((((((( storefirstNameValue )))))))))))',storefirstNameValue)
  // console.warn('((((((((((( firstName )))))))))))',firstName)
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [primaryNo, setPrimaryNo] = useState("");
  const [mobileNoValid, setmobileNoValid] = useState("");
  const [leadStatus, setLeadStatus] = useState("newleadentery");
  const [leadDisposition, setLeadDisposition] = useState("");
  const [leadSubDisposition, setLeadSubDisposition] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState();
  const [appointmentDisposition, setAppointmentDisposition] = useState();
  const [appointmentSubDisposition, setAppointmentSubDisposition] = useState();
  const [reminder, setReminder] = useState();
  const [appointmentDate, setAppointmentDate] = useState("");
  // moment(start_date)
  const [appointmentDatePost, setAppointmentDatePost] = useState();
  const [appointmentTime, setAppointmentTime] = useState("");
  // parseInt(start_time)
  const [remarkFromSource, setRemarkFromSource] = useState("");
  const [remarkFromUser, setRemarkFromUser] = useState("");
  // const [leadType, setLeadType] = useState(storeLeadTypeValue !== '' ? storeLeadTypeValue : 'select')
  const [leadType, setLeadType] = useState("NewBusiness");
  // const [product, setProduct] = useState(storeProductValue !== '' ? storeProductValue : 'select')
  const [product, setProduct] = useState("");
  // const [insuranceCompany, setInsuranceComapany] = useState(storeInsuranceCompanyValue !== '' ? storeInsuranceCompanyValue : 'select')
  const [insuranceCompany, setInsuranceComapany] = useState("");
  // const [stateProvince, setStateProvince] = useState(storeStateValue !== '' ? storeStateValue : 'Select')
  const [stateProvince, setStateProvince] = useState("");
  // const [cityProvince, setCityProvince] = useState(storeCityValue !== '' ? storeCityValue : 'Select')
  const [cityProvince, setCityProvince] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isNewLead, setIsNewLead] = useState(false);
  const [leadStatusData, setLeadStatusData] = useState(["newleadentery"]);
  const [hierarAgentList, setHierarAgentList] = useState([]);
  const [desigDataOwner, setDesigDataOwner] = useState("");
  const [teamDataOwner, setTeamDataOwner] = useState("");
  const [desigData, setDesigData] = useState("");
  const [teamMemberList, setTeamMemberList] = useState([]);
  const [teamData, setTeamData] = useState("");
  const [showLeadStatus, setshowLeadStatusVisiblity] = React.useState(false);
  const [addTeamMemb, setAddTeamMemb] = useState([]);
  const [addTeamMemAPIStruct, setAddTeamMemAPIStruct] = useState([]);
  const [teamTableData, setTeamTableData] = useState([]);
  const [leadIdData, setLeadIdData] = useState("");
  const [teamDesig, setTeamDesig] = useState(null);
  const [totalDaysCount, setDaysCount] = React.useState("");
  const [allocatedToUser, setAllocatedToUser] = React.useState("");
  // console.warn('((((((((((( stateProvince )))))))))))',stateProvince)

  // const forceUpdate: () => void = React.useState().firstName.bind(null,{});

  const [hierarAgentListOwner, setHierarAgentListOwner] = useState([]);
  const [teamMemberListOwner, setTeamMemberListOwner] = useState([]);
  const [ownerArray, setOwnerArray] = useState([]);
  const [leadOwner, setLeadOwner] = useState("");

  useEffect(() => {
    // if(userTreeData.length > 0){
    userTreeData.reporting_hierarchies.forEach((el) => {
      el.label = el.dispValue;
    });
    userTreeData.reporting_users.forEach((el) => {
      el.label = el.full_name;
      el.value = el._id;
    });
    setHierarAgentList(userTreeData.reporting_hierarchies);
    setHierarAgentListOwner(userTreeData.reporting_hierarchies);
    // }
    // console.log('((((((((((((storeFormData))))))))))))',storeFormData)
    // console.log('((((((((((((lead_Id))))))))))))',storeFormData.lead_Id)
    // storeFormData.lead_Id !== '' ? setIsNewLead(false) : setIsNewLead(true)
    primaryNo.length === 10 ? setmobileNoValid(true) : setmobileNoValid(false);
  }, []);

  const getLeadDetails = async (lead_id) => {
    try {
      let result = await axiosRequest.get(`user/getlead_details/${lead_id}`, {
        secure: true,
      });
      // console.warn('__++++++++++++++ RESPPPP',result)
      let leadArr = [];
      result[0].leadStatus !== "" && leadArr.push(result[0].leadStatus);
      result[0].leadDisposition !== "" &&
        leadArr.push(result[0].leadDisposition);
      result[0].leadsubDisposition !== "" &&
        leadArr.push(result[0].leadsubDisposition);

      result[0]["leadStatusArr"] = leadArr;

      // result.forEach(el =>{ el.leadStatusArr = leadArr })
      // console.warn("__++++++++++++++ getlead_details +++++++++++>>>", result);
      if (result.length > 0) {
        dispatch(actions.fetchLeadDetailsSuccess(result[0]));
        if (result.length > 1) {
          let combined = {
            ...result[0],
            appointmentDetails: {
              ...result[1],
            },
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
      // console.warn('__++++++++++++++ leadData +++++++++++>>',JSON.parse(leadData.teamMembers))
      let _appntDate = "";
      let _appntTime = "";
      let leadArr = [];
      if (
        leadData.leadDisposition === "appointment" &&
        leadData.leadStatus === "contact"
      ) {
        setshowLeadStatusVisiblity(true);
        leadArr.push(
          leadData.appointment_status === ""
            ? "newappointment"
            : leadData.appointment_status
        );
        leadArr.push("newApptmnt");
        leadArr.push("Untouched / Not updated Appointment");

        setAppointmentStatus(
          leadData.appointment_status === ""
            ? "newappointment"
            : leadData.appointment_status
        );
        setAppointmentDisposition("newApptmnt");
        setAppointmentSubDisposition("Untouched / Not updated Appointment");
        setLeadDisposition(leadData.leadDisposition);

        setLeadStatus(leadData.leadStatus);
        setLeadStatusData(leadArr);
        // only when, the date and time is exist in the object
        if (leadData.appointmentDetails) {
          // let readableDateFormat = moment(leadData.appointmentDetails.start_date).format("DD/MM/YYYY")
          // setDate(readableDateFormat);
          let newDate = moment(
            leadData.appointmentDetails.start_date
          ).valueOf();
          _appntDate = moment(leadData.appointmentDetails.start_date);
          _appntTime = leadData.appointmentDetails.start_time.toString();
          setAppointmentDate(moment(leadData.appointmentDetails.start_date));
          setAppointmentDatePost(newDate);
          setAppointmentTime(_appntTime);
        }
      } else {
        if (
          leadData.leadDisposition === "callback" &&
          leadData.leadStatus === "contact"
        ) {
          if (leadData.appointmentDetails) {
            _appntDate = moment(leadData.appointmentDetails.start_date);
            _appntTime = leadData.appointmentDetails.start_time.toString();
            setAppointmentDate(moment(leadData.appointmentDetails.start_date));
            setAppointmentTime(_appntTime);
          }
        }
        setshowLeadStatusVisiblity(false);
        setLeadStatus(leadData.leadStatus);
        setLeadDisposition(
          leadData.hasOwnProperty("leadDisposition")
            ? leadData.leadDisposition
            : ""
        );
        setLeadSubDisposition(
          leadData.hasOwnProperty("leadsubDisposition")
            ? leadData.leadsubDisposition
            : ""
        );
        setLeadStatusData(leadData.leadStatusArr);
      }
      // const [totalDaysCount, setDaysCount] = React.useState('');
      let oneDay = 24 * 60 * 60 * 1000;
      let diffDays =
        Math.round(Math.abs((leadData.created_date - Date.now()) / oneDay)) +
        " days ago";
      setDaysCount(diffDays);

      // console.warn('__++++++++++++++ userTreeData +++++++++++>>',userTreeData)

      // setAddTeamMemb(_teamData)
      let _data = {};
      // checkAgent() === false
      if (leadData.hasOwnProperty("teamMembers")) {
        let _teamData = JSON.parse(leadData?.teamMembers);
        setAddTeamMemAPIStruct(_teamData);
        if (checkAgent() === false) {
          let _arryy = _teamData.map((el) => {
            userTreeData.reporting_users.filter((event) => {
              if (event._id === el.Id) {
                _data = {
                  designation: event.hierarchyName,
                  teamName: event.full_name,
                  teamMem_id: event._id,
                };
              }
            });
            return _data;
          });
          // console.warn('__++++++++++++++ _arryy +++++++++++>>',Object.keys(_arryy[0]).length)
          let _finalData =
            _arryy.length > 0
              ? Object.keys(_arryy[0]).length > 0
                ? _arryy
                : []
              : [];
          setAddTeamMemb(_finalData);
          setTeamTableData(_finalData);
        }
      }

      setleadIDSummary(leadData?.lead_Id);
      setFirstNameSummary(leadData?.firstName);
      setLastNameSummary(leadData?.lastName);
      setMobileNoSummary(leadData?.primaryMobile);
      setStateSummary(leadData?.state);
      setCitySummary(leadData?.city);
      setAllocatedToUser(leadData?.userId?.first_name);

      setFirstName(leadData?.firstName);
      setLastName(leadData?.lastName);
      setEmail(leadData?.email);
      setPrimaryNo(leadData?.primaryMobile);
      setStateProvince(leadData?.state);
      setCityProvince(leadData?.city);
      setLeadType(leadData?.leadType);
      setProduct(leadData?.Product);
      setInsuranceComapany(leadData?.Insurance_Company);

      setRemarkFromSource(leadData?.remarksfromSource);
      setRemarkFromUser(leadData?.remarksfromUser);

      setLeadAge(leadData?.age);
      setLeadGender(leadData?.gender);
      setMaritalStatus(leadData?.maritalStatus);
      setLeadOccupation(leadData?.professionType);
      setLeadVehiclesOwned(leadData?.vehiclesOwned);
      setLeadSourceOfactivity(leadData?.sourceOfActivity);

      form.setFieldsValue({
        firstname: leadData.firstName,
        lastname: leadData.lastName,
        email: leadData.email,
        phone: leadData.primaryMobile,
        state: leadData.state,
        city: leadData.city,
        leadType: leadData.leadType,
        product: leadData.Product,
        insuranceCompany: leadData.Insurance_Company,
        remarksfromsource: leadData.remarksfromSource,
        remarksfromuser: leadData.remarksfromUser,
        leadStatus: leadData.leadStatusArr,
        appointmentStatus: leadArr,
        appointmentDate: _appntDate,
        appointmentTime: _appntTime,
        age: leadData?.age,
        gender: leadData?.gender,
        maritalStatus: leadData?.maritalStatus,
        occupation: leadData?.professionType,
        vehiclesOwned: leadData?.vehiclesOwned,
        sourceOfactivity: leadData?.sourceOfActivity,
      });
    } catch (err) {
      console.log("__++++++++++++++ err +++++++++++>>", err);
    }
  };

  // add team Member modal state control
  const [visibleTeamMemberModal, setVisibleTeamMemberModal] = useState(false);

  // change owner Member modal state control
  const [visibleChangeOwnerModel, setVisibleChangeOwnerModel] = useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');

  let stateOptions =
    states && !_.isEmpty(states)
      ? states.map((state) => {
          const label = state?.region_data?.name;
          const value = state?.region_data?.name;
          const newState = { ...state, label, value };
          // state.push(label)
          return newState;
        })
      : null;
  // stateOptions.unshift(_selectObj)
  // console.warn('stateOptions---------->>',stateOptions)

  const cities = useSelector((state) => state.address.cities);
  let citiesOptions =
    cities && !_.isEmpty(cities)
      ? cities.map((city) => {
          const label = city.name;
          const value = city.name;
          const newCities = { ...city, label, value };
          return newCities;
        })
      : null;
  // citiesOptions.unshift(_selectObj)

  const getDisabledMinutes = (selectedHour) => {
    var minutes = [];
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };
  const designations = useSelector((state) => state.leads.designations);
  const designationsOptions =
    designations && !_.isEmpty(designations)
      ? designations.map((designation) => {
          const label = designation.designatioName;
          const value = designation.designatioName;
          const newCities = { ...designation, label, value };
          return newCities;
        })
      : null;

  const onFinish = (errorMessage) => {
    alert(errorMessage);
    // console.log('Success:', errorMessage);
  };

  const onFinishFailedFucn = (errorMsg) => {
    alert(errorMsg);
    // console.log('Failed:', errorMsg);
  };

  const stateSelectHandler = (value, key) => {
    // console.log('------stateSelectHandler----value--???',value)
    // console.log('------stateSelectHandler----key--???',key)
    setCityProvince("");
    value !== "Select" &&
      dispatch(actions.fetchAllCities(key.region_data.adminCode1));
  };
  const stateChangetHandler = (event, data) => {
    // console.log('stateChangetHandler__________:', event);
    // setStateProvince(event.target.value)
    setStateProvince(event);

    if (cityProvince !== "") {
      setCityProvince("");
      form.setFieldsValue({ city: "" });
    }
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const checkValidity = (data) => {
    if (data === "" || data === undefined || data === null) {
      return "";
    } else {
      return data;
    }
  };
  const formData = {
    user_id: !teamDataOwner ? id : teamDataOwner,
    leadStatus: leadStatus,
    leadDisposition: leadDisposition,
    leadsubDisposition: leadSubDisposition,
    appointmentdisPosition: checkValidity(appointmentDisposition),
    remarksfromUser: remarkFromUser,
    remarksfromSource: remarkFromSource,
    teamMembers: JSON.stringify(addTeamMemAPIStruct),
    leadSource: null,
    appointment_status: checkValidity(appointmentStatus),
    appointmentsubdisPosition: checkValidity(appointmentSubDisposition),
    lead_Owner_Id: !teamDataOwner ? id : teamDataOwner,
    lead_Creator_Id: id,
    LeadType: leadType,
    Product: product,
    Insurance_Company: insuranceCompany,
    line1: "",
    line2: "",
    line3: "",
    country: "India",
    state: !stateProvince ? "" : stateProvince,
    city: !cityProvince ? "" : cityProvince,
    pincode: null,
    primaryMobile: primaryNo,
    secondaryMobile: null,
    landlineNo: null,
    email: email,
    socialSecurityAdharNo: "",
    mailingAddressStatus: "Yes",
    mailingAddressSecond:
      '{"mailingaddress":{"line1":"","line2":"","line3":""},"state":"Arunachal Pradesh","city":"Margherita","country":"India","pincode":""}',
    firstName: firstName,
    lastName: lastName,
    dob: "",

    professionType: leadOccupation,
    maritalStatus: maritalStatus,
    age: leadAge,
    gender: leadGender,
    sourceOfActivity: leadSourceOfactivity,
    vehiclesOwned: leadVehiclesOwned,

    childStatus: "",
    ChildInfo: "[]",
    education: "",
    incomeGroup: "",
    annuaLincome: null,
    productCategory: "",
    productType: "",
    solution: "",
    expectedPremium: null,
    expectedclosureDate: "",
    HaveLifeInsurance: {
      ExistInsur: "No",
      ExistHealthInsur: "No",
    },
    Insurancedetails: "[]",
    HaveLifeInsurance_details: "[]",
    start_date: appointmentDatePost,
    start_time: parseInt(appointmentTime),
  };

  let createFormData = {
    // ...storeFormData,
    leadStatus: leadStatus,
    start_date: appointmentDatePost,
    start_time: parseInt(appointmentTime),
    remarksfromUser: remarkFromUser,
    remarksfromSource: remarkFromSource,
    leadsubDisposition: leadSubDisposition,
    leadDisposition: leadDisposition,
    teamMembers: JSON.stringify(addTeamMemAPIStruct),
    leadSource: "",

    appointment_status: checkValidity(appointmentStatus),
    appointmentdisPosition: checkValidity(appointmentDisposition),
    appointmentsubdisPosition: checkValidity(appointmentSubDisposition),

    lead_Owner_Id: !teamDataOwner ? id : teamDataOwner,
    lead_Creator_Id: id,
    user_id: !teamDataOwner ? id : teamDataOwner,
    LeadType: leadType,
    Product: product,
    Insurance_Company: insuranceCompany,

    state: !stateProvince ? "" : stateProvince,
    city: !cityProvince ? "" : cityProvince,
    primaryMobile: primaryNo,
    email: email,

    firstName: firstName,
    lastName: lastName,

    professionType: leadOccupation,
    maritalStatus: maritalStatus,
    age: leadAge,
    gender: leadGender,
    sourceOfActivity: leadSourceOfactivity,
    vehiclesOwned: leadVehiclesOwned,
  };

  const failedHandler = (error) => {
    alert(error);
    console.log(error);
  };

  if (leadDataLoading && _.isEmpty(storeFormData)) {
    return <Spin />;
  }

  return (
    <>
      <Tabs tabMenu={tabMenu} header="New Lead" activeKey="1" />

      <div className="form-container">
        <Form form={form} onFinish={submitHandler}>
          <Row justify={width > breakpoint ? "" : "center"} gutter={[0, 24]}>
            <Col
              className="form-body p50 mb-2"
              xs={24}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Compnay Details</p>
              <Row gutter={16} className="mb-2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="company name"
                    label="Company Name"
                    rules={[
                      {
                        required: false,
                        message: "Select your Company",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      placeholder="Select"
                      options={optionsData}
                      value={formItem.companyName}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          companyName: val,
                        }))
                      }
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="parent company Name"
                    label="Parent Company Name"
                    rules={[
                      {
                        required: false,
                        message: "Select your Parent Company",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      placeholder="Select"
                      options={optionsData}
                      value={formItem.parentCompanyName}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          parentCompanyName: val,
                        }))
                      }
                    ></Select>
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
                        message: "Select your Company",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      placeholder="Select"
                      options={optionsData}
                      value={formItem.industry}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          industry: val,
                        }))
                      }
                    ></Select>
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
                    name="client location"
                    label="Client Location"
                    rules={[
                      {
                        required: false,
                        message: "Select your Company",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      placeholder="Select"
                      options={optionsData}
                      value={formItem.clientLocation}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          clientLocation: val,
                        }))
                      }
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              className="form-body p40"
              style={{ padding: 20 }}
              xs={{ order: width > breakpoint ? 2 : 1 }}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              span={23}
            >
              <Row>
                <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                  <p className="form-title">Summary</p>

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Opportunity Name</p>
                      <p className="summary_data">
                        Fire Insurance 380 HDFC Branchs
                      </p>
                      <p className="summary_sub_data">
                        Incorporation Date:21/12/2022
                      </p>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Opportunity Name</p>
                      <p className="summary_data">HDFC Bank Mumbai</p>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Opportunity Name</p>
                      <p className="summary_data">
                        Fire Insurance 380 HDFC Branchs
                      </p>
                      <i
                        className="summary_sub_data"
                        style={{ fontStyle: "italic" }}
                      >
                        - As on 02/02/2023
                      </i>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Opportunity Name</p>
                      <Row className="d-flex justify-content-start align-items-center">
                        <Col span={8}>
                          <div className="event_box">
                            <h2 className="d-flex align-items-center mb-1">
                              <CalendarOutlined style={{ marginRight: 5 }} />{" "}
                              Events
                            </h2>
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="count">04</div>
                              <div className="label">Events Created</div>
                            </div>
                          </div>
                        </Col>
                        <Col span={16}>
                          <div className="todo_box">
                            <h2 className="d-flex align-items-center mb-1">
                              <FileDoneOutlined style={{ marginRight: 5 }} /> To
                              Do
                            </h2>
                            <div className="d-flex">
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="count">04</div>
                                <div className="label">Todo Created</div>
                              </div>
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="count">40</div>
                                <div className="label">Todo Completed</div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              className="form-body  p50"
              xs={{ order: 3 }}
              sm={16}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Opportunity Details</p>
              <Row gutter={16} className="mb-2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="LOB for oppotunity"
                    label="LOB for oppotunity"
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
                      options={optionsData}
                      value={formItem.LOBForOpportunity}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          LOBForOpportunity: val,
                        }))
                      }
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="product for oppotunity"
                    label="Product for oppotunity"
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
                      options={optionsData}
                      value={formItem.productForOpportunity}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          productForOpportunity: val,
                        }))
                      }
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="opportunity name"
                    label="Opportunity Name"
                    rules={[
                      {
                        required: false,
                        message: "Age is required",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="phone-no"
                      size="large"
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
              className="form-body  p50"
              xs={{ order: 3 }}
              sm={16}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Opportunity Status</p>
              <Row gutter={16} className="mb-2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="status"
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
                      options={optionsData}
                      value={formItem.status}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          status: val,
                        }))
                      }
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="disposition"
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
                      options={optionsData}
                      value={formItem.disposition}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          disposition: val,
                        }))
                      }
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="sub disposition"
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
                      options={optionsData}
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
              </Row>
              <Row gutter={16} className="mb-2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="appointment date"
                    label="Appointment Date"
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
                      options={optionsData}
                      value={formItem.appointmentDate}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          appointmentDate: val,
                        }))
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="appointment time"
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
                      options={optionsData}
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
            </Col>

            <Col
              className="form-body p50"
              xs={{ order: 3 }}
              sm={16}
              md={16}
              lg={15}
              xl={15}
              span={24}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Opportunities Status</p>
              <Row gutter={16} className="mb-2 statsLead">
                <Col span={18} className="d-flex align-items-center">
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
                    <Input
                      value={collaborators}
                      type="text"
                      className="phone-no"
                      size="large"
                      placeholder="Enter"
                      onChange={(e) => setCollaborators(e.target.value)}
                    />
                  </Form.Item>
                  <Button
                    style={{
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      height: "40px",
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
                    {formItem.collaborators.map((res, index) => (
                      <div
                        key={index}
                        className="add_collaborators_items shadow-sm"
                      >
                        {res + " "}
                        <CloseOutlined
                          onClick={() =>
                            setFormItem((res) => ({
                              ...res,
                              collaborators: res.collaborators.splice(index, 1),
                            }))
                          }
                          style={{ marginLeft: 10, fontWeight: "bolder" }}
                        />
                      </div>
                    ))}
                  </div>
                </Col>

                <Col span={24} className="d-flex align-items-center">
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
                      size="large"
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
                      height: "40px",
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

                <Col
                  className="post mt-3 w-100"
                  style={{ fontSize: "smaller" }}
                >
                  {formItem.remarks.map((res, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-start w-100 mb-3 p-2 remarks_bg"
                    >
                      <div className="me-3">15:03 03/01/2023</div>
                      <div>
                        <div>{res}</div>
                        <div>
                          <i>by Amey Jaini</i>
                        </div>
                      </div>
                    </div>
                  ))}
                </Col>
              </Row>
            </Col>

            <Col
              className="form-body p30 mb-5"
              xs={{ order: 5 }}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              {/* <Row  > */}
              <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 16 : 2}>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "rgb(59, 55, 30)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    htmlType="submit"
                    icon={<FileTextOutlined />}
                  >
                    Submit & Update
                  </Button>
                </Form.Item>
              </Col>

              {/* </Row> */}
            </Col>
          </Row>
        </Form>
        {/* <FloatButton /> */}
      </div>
    </>
  );
});

export default NewLead;
