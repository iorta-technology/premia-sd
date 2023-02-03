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
  AutoComplete,
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
const lobOpportunityItems = [
  { label: "Affinity Benefits", value: "Affinity Benefits" },
  { label: "AIGC", value: "AIGC" },
  { label: "Aviation", value: "Aviation" },
  { label: "BTA", value: "BTA" },
  { label: "Casualty", value: "Casualty" },
  { label: "Extended Warantee", value: "Extended Warantee" },
  { label: "Financial Lines", value: "Financial Lines" },
  { label: "GMC", value: "GMC" },
  { label: "GPA", value: "GPA" },
  { label: "Retail Health", value: "Retail Health" },
  { label: "IPA", value: "IPA" },
  { label: "LTA", value: "LTA" },
  { label: "Marine", value: "Marine" },
  { label: "Motor", value: "Motor" },
  { label: "P&E&C", value: "P&E&C" },
  { label: "PCG", value: "PCG" },
  { label: "PEP", value: "PEP" },
  { label: "Plus", value: "Plus" },
  { label: "Rural", value: "Rural" },
  { label: "Rural- Weather", value: "Rural- Weather" },
  { label: "Trade Credit", value: "Trade Credit" },
  // { label: "AIGC",value: "AIGC" },
];

const affinityBenefitsItems = [
  {
    label: "Group Sickness Accidental Hospital Cash",
    value: "GroupSicknessAccidentalHospitalCash",
  },
  {
    label: "Group Mediprime Insurance Policy",
    value: "GroupMediprimeInsurancePolicy",
  },
];

const aigcItems = [
  { label: "AIG Combined Package Policy", value: "AIGCombinedPackagePolicy" },
  { label: "Workmens Compensation", value: "WorkmensCompensation" },
  {
    label: "Business Guard Laghu Udyam Suraksha",
    value: "BusinessGuardLaghuUdyamSuraksha",
  },
  {
    label: "Business Guard Sookshma Udyam Suraksha",
    value: "BusinessGuardSookshmaUdyamSuraksha",
  },
];

const aviationItems = [
  {
    label: "Airport Owners and Operators Liability Insurance",
    value: "Airport Owners and Operators Liability Insurance",
  },
  { label: "Aviation Hull All Risk", value: "Aviation Hull All Risk" },
];

const btaItems = [
  { label: "Business Travel Guard", value: "Business Travel Guard" },
  { label: "Group Business Travel", value: "Group Business Travel" },
  {
    label: "Group Business Travel Accident",
    value: "GroupBusinessTravelAccident",
  },
];
const casualtyItems = [
  { label: "Clinical Trials Insurance", value: "Clinical Trials Insurance" },
  {
    label: "Commerical General Liability",
    value: "CommericalGeneralLiability",
  },
  {
    label: "Comprehensive Product Liability",
    value: "ComprehensiveProductLiability",
  },
  { label: "Pollution Legal Liability", value: "Pollution Legal Liability" },
  { label: "Public Liability Act", value: "Public Liability Act" },
];

const extend_warrantyItems = [
  { label: "Extended Warranty", value: "Extended Warranty" },
];
const finance_linesItems = [
  { label: "Crime Manager", value: "CrimeManager" },
  {
    label: "Crisis Coverage Insurance Policy",
    value: "CrisisCoverageInsurancePolicy",
  },
  { label: "Cyber Risk Protector", value: "Cyber Risk Protector" },
  {
    label: "Director And Officer Liability",
    value: "DirectorAndOfficerLiability",
  },
  { label: "Fidelity Guard Policy", value: "Fidelity Guard Policy" },
  { label: "Financial Institution", value: "FinancialInstitution" },
  {
    label: "Highlight Named Peril D&O Insurance",
    value: "Highlight Named Peril D&O Insurance",
  },
  {
    label: "Management Liability Insurance Policy",
    value: "ManagementLiabilityInsurancePolicy",
  },
  { label: "Professional Indemnity", value: "Professional Indemnity" },
  {
    label: "Represntations And Warranties",
    value: "Represntations And Warranties",
  },
];
const gmcItems = [
  { label: "Group Medicare Policy", value: "GroupMedicarePolicy" },
  { label: "Group MediPrime", value: "GroupMediPrime" },
  {
    label: "Group Mediprime Insurance Policy",
    value: "GroupMediprimeInsurancePolicy",
  },
];
const gpaItems = [
  {
    label: "Domestic Travel Guard Policy",
    value: "Domestic Travel Guard Policy",
  },
  { label: "GPA and Business Travel", value: "GPA and Business Travel" },
  {
    label: "Group Janta Personal Accident",
    value: "GroupJantaPersonalAccident",
  },
  { label: "Group Personal Accident", value: "GroupPersnalAccident" },
];
const retail_healthItems = [
  { label: "Critical Illness", value: "Critical Illness" },
  { label: "MediCare", value: "MediCare" },
  { label: "Wellsurance Executive", value: "Wellsurance Executive" },
];
const ipaItems = [
  { label: "Accident Guard Plus", value: "AccidentGuardPlus" },
  { label: "Income Guard", value: "IncomeGuard" },
  { label: "Secured Future Plan", value: "Secured Future Plan" },
];
const ltaItems = [
  { label: "Asia Travel Guard Policy", value: "Asia Travel Guard Policy" },
  { label: "Domestic Travel Guard", value: "Domestic Travel Guard" },
  { label: "Group Travel Secure", value: "Group Travel Secure" },
  { label: "Travel Care", value: "Travel Care" },
];
const marineItems = [
  {
    label: "Inland Marine Cargo RT Major",
    value: "Inland Marine Cargo RT Major",
  },
  { label: "Marine Liabilities Policy", value: "MarineLiabilitiesPolicy" },
  { label: "Marine Specific Policy", value: "MarineSpecificPolicy" },
  { label: "Open Policy Marine Cargo", value: "OpenPolicyMarineCargo" },
];
const motorItems = [
  {
    label: "Auto Secure - Private Car Package Policy",
    value: "Auto Secure - Private Car Package Policy",
  },
  { label: "Commercial Vehicle", value: "Commercial Vehicle" },
  { label: "Private Car Insurance", value: "Private Car Insurance" },
];
const p_e_cItems = [
  { label: "All Risk Insurance", value: "All Risk Insurance" },
  { label: "All Risk Portable Insurance", value: "AllRiskPortableInsurance" },
  { label: "Baggage Insurance", value: "Baggage Insurance" },
  { label: "Boiler & Pressure Vessel", value: "Boiler & Pressure Vessel" },
  { label: "Burglary Insurance", value: "Burglary Insurance" },
  {
    label: "Business Guard - Commercial Policy",
    value: "Business Guard - Commercial Policy",
  },
  { label: "CAR/EAR", value: "CAR/EAR" },
  { label: "Chemical RT PD/BI", value: "Chemical RT PD/BI" },
  {
    label: "Consequential Loss Insurance",
    value: "ConsequentialLossInsurance",
  },
  {
    label: "Contractors Plant & Machinery",
    value: "Contractors Plant & Machinery",
  },
  {
    label: "Electronic Equipment Insurance",
    value: "Electronic Equipment Insurance",
  },
  { label: "Fidelity Guarantee Ins", value: "FidelityGuaranteeIns" },
  { label: "IAR Property Major", value: "IAR Property Major" },
  {
    label: "Industrial All Risk Insurance",
    value: "Industrial All Risk Insurance",
  },
  {
    label: "Industrial All Risk Insurance",
    value: "IndustrialAllRiskInsurance",
  },
  {
    label: "Machinery Breakdown Insurance",
    value: "Machinery Breakdown Insurance",
  },
  { label: "Machinery Loss Of Profit Ins", value: "MachineryLossOfProfitIns" },
  { label: "Mega Risk", value: "Mega Risk" },
  { label: "Money Insurance", value: "Money Insurance" },
  { label: "Multinational Program", value: "MultinationalProgram" },
  { label: "Oil & Petro RT PD/BI", value: "Oil & Petro RT PD/BI" },
  { label: "Plate Glass Ins", value: "PlateGlassIns" },
  { label: "Project Insurance", value: "ProjectInsurance" },
  {
    label: "Standard Fire and Special Perils",
    value: "Standard Fire and Special Perils",
  },
  { label: "Title Insurance", value: "Title Insurance" },
  { label: "Utilities RT PD/BI", value: "Utilities RT PD/BI" },
];
const pcgItems = [
  { label: "PCG Home", value: "PCGHome" },
  {
    label: "Private Client Group Home Secure Policy",
    value: "Private Client Group Home Secure Policy",
  },
];
const pepItems = [
  {
    label: "Personal Protection Product",
    value: "Personal Protection Product",
  },
  {
    label: "Personal Extended Protection",
    value: "PersonalExtendedProtection",
  },
];
const plusItems = [{ label: "Personal All Risk", value: "PersonalAllRisk" }];
const ruralItems = [
  { label: "Rural Package Policy", value: "RuralPackagePolicy" },
];
const rural_weatherItems = [
  {
    label: "Modified National Agriculture Insurance Scheme",
    value: "Modified National Agriculture Insurance Scheme",
  },
  { label: "PMFBY", value: "PMFBY" },
];
const trade_creditItems = [
  { label: "Political Risk Insurance", value: "Political Risk Insurance" },
  { label: "Trade Credit Insurance", value: "Trade Credit Insurance" },
];

const leadStatusItems = [
  { label: "New Lead", value: "newleadentery" },
  { label: "Contacted", value: "contact" },
  { label: "No Contact", value: "no_contact" },
];

const contactItems = [
  { label: "Appointment", value: "appointment" },
  { label: "Callback", value: "callback" },
  { label: "Converted", value: "leadconverted" },
  { label: "Not Interested", value: "notinterested" },
  { label: "Not Eligible", value: "noteligible" },
  { label: "Interested", value: "interested" },
];

const no_contactItems = [
  { label: "Wrong/Invalid Number", value: "invalid" },
  { label: "Not Reachable", value: "notreachable" },
];

const appointmentTimeOptions = [
  { label: "8:00 AM", value: "28800000" },
  { label: "8:30 AM", value: "30600000" },
  { label: "9:00 AM", value: "32400000" },
  {
    label: "9:30 AM",
    value: "34200000",
  },
  {
    label: "10:00 AM",
    value: "36000000",
  },
  {
    label: "10:30 AM",
    value: "37800000",
  },
  {
    label: "11:00 AM",
    value: "39600000",
  },
  {
    label: "11:30 AM",
    value: "41400000",
  },
  {
    label: "12:00 PM",
    value: "43200000",
  },
  {
    label: "12:30 PM",
    value: "45000000",
  },
  {
    label: "1:00 PM",
    value: "46800000",
  },
  {
    label: "1:30 PM",
    value: "48600000",
  },
  {
    value: "50400000",
    label: "2:00 PM",
  },
  {
    label: "2:30 PM",
    value: "52200000",
  },
  {
    label: "3:00 PM",
    value: "54000000",
  },
  {
    label: "3:30 PM",
    value: "55800000",
  },
  {
    label: "4:00 PM",
    value: "57600000",
  },
  {
    label: "4:30 PM",
    value: "59400000",
  },
  {
    label: "5:00 PM",
    value: "61200000",
  },
  {
    label: "5:30 PM",
    value: "63000000",
  },
  {
    label: "6:00 PM",
    value: "64800000",
  },
  {
    label: "6:30 PM",
    value: "66600000",
  },
  {
    label: "7:00 PM",
    value: "68400000",
  },
  {
    label: "7:30 PM",
    value: "70200000",
  },
  {
    label: "8:00 PM",
    value: "72000000",
  },
  {
    label: "8:30 PM",
    value: "73800000",
  },
  {
    label: "9:00 PM",
    value: "75600000",
  },
  {
    label: "9:30 PM",
    value: "77400000",
  },
];

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
  {
    id: 3,
    value: "History",
  },
];
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isNumberValid = (value) => value.trim() !== "" && value.length === 10;

const NewLead = React.memo((props) => {
  const [collaborators, setCollaborators] = useState("");
  const [remark, setRemark] = useState("");

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

  // let formRef = createRef();
  const dispatch = useDispatch();
  // const history = useHistory()
  const [form] = Form.useForm();
  // const [mobileDisable, setMobileDisable] = useState(false);
  useEffect(() => {
    // dispatch(actions.fetchTeamMember())
    // console.warn('LEAD__ID__FROM___ROUTE___',props.location.state)
    dispatch(actions.headerName("New Lead"));
    if (props.location.state !== undefined) {
      let _leadID = props.location.state.leadID;
      // setshowLeadStatusVisiblity(true)
      getLeadDetails(_leadID);
      // setMobileDisable(true);
      setIsNewLead(false);
    } else {
      setIsNewLead(true);
      // setMobileDisable(false);
      form.setFieldsValue({
        lead_status: "newleadentery",
      });
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
  const [leadType, setLeadType] = useState("NewBusiness");
  const [product, setProduct] = useState("");
  const [insuranceCompany, setInsuranceComapany] = useState("");
  const [stateProvince, setStateProvince] = useState("");
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

  const [companyArray, setCompanyArray] = useState([]);
  const [parentCompArray, setparentCompArray] = useState([]);
  const [industryArray, setIndustryArray] = useState([]);
  const [company_id, setCompany_id] = useState([]);
  const [prodForOpportunityArr, setProdForOpportunityArr] = useState([]);
  const [dispoArr, setDispoArr] = useState([]);
  const [subdispoArr, setSubDispoArr] = useState([]);
  const [showLeadDisposition, setShowLeadDisposition] = useState(false);
  const [showLeadSubDisposition, setShowLeadSubDisposition] = useState(false);
  const [showAppointmentFields, setShowAppointmentFields] = useState(false);

  const [opportunityNameSummary, setOpportunityNameSummary] = useState("-");
  const [companySummary, setCompanySummary] = useState("-");
  const [currentStatusSummary, setCurrentStatusSummary] = useState("-");
  const [incorpDateSummary, setIncorpDateSummary] = useState("-");
  const [currentStatsDateSummary, setCurrentStatsDateSummary] = useState("-");
  const [eventCountSummary, setEventCountSummary] = useState("00");
  const [todoCreatdSummary, setTodoCreatdSummary] = useState("00");
  const [todoComplteSummary, setTodoComplteSummary] = useState("00");

  const [disableParentComp, setDisableParentComp] = useState(false);

  useEffect(() => {
    // if(userTreeData.length > 0){
    // userTreeData.reporting_hierarchies.forEach((el) => {
    //   el.label = el.dispValue;
    // });
    // userTreeData.reporting_users.forEach((el) => {
    //   el.label = el.full_name;
    //   el.value = el._id;
    // });
    // setHierarAgentList(userTreeData.reporting_hierarchies);

    getCompanyDetails();

    // console.log('((((((((((((storeFormData))))))))))))',storeFormData)
    // console.log('((((((((((((lead_Id))))))))))))',storeFormData.lead_Id)
    // storeFormData.lead_Id !== '' ? setIsNewLead(false) : setIsNewLead(true)
    // primaryNo.length === 10 ? setmobileNoValid(true) : setmobileNoValid(false);
  }, []);

  const getCompanyDetails = async (lead_id) => {
    let result = await axiosRequest.get(`admin/company/companies`, {
      secure: true,
    });
    // console.warn('__++++++COMPANY++++++++ RESPPPP',result)
    // if (result.length > 0) {
    let _compArr = [];
    let _parentCompArr = [];
    let _industryArr = [];
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

    result.industries.map((el) => {
      let _data = { label: el, value: el };
      _industryArr.push(_data);
    });
    setIndustryArray(_industryArr);
    // }
  };

  const getLeadDetails = async (lead_id) => {
    try {
      let result = await axiosRequest.get(`user/getlead_details/${lead_id}`, {
        secure: true,
      });
      // console.warn('__++++++++++++++ RESPPPP',result)
      // let leadArr = [];
      // result[0].leadStatus !== "" && leadArr.push(result[0].leadStatus);
      // result[0].leadDisposition !== "" &&
      //   leadArr.push(result[0].leadDisposition);
      // result[0].leadsubDisposition !== "" &&
      //   leadArr.push(result[0].leadsubDisposition);

      // result[0]["leadStatusArr"] = leadArr;

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
      // let leadArr = [];
      if (
        leadData.leadDisposition === "appointment" &&
        leadData.leadStatus === "contact"
      ) {
        setshowLeadStatusVisiblity(true);
        // leadArr.push(
        //   leadData.appointment_status === ""
        //     ? "newappointment"
        //     : leadData.appointment_status
        // );
        // leadArr.push("newApptmnt");
        // leadArr.push("Untouched / Not updated Appointment");

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
      }

      // setleadIDSummary(leadData?.lead_Id);
      // setFirstNameSummary(leadData?.firstName);
      // setLastNameSummary(leadData?.lastName);
      // setMobileNoSummary(leadData?.primaryMobile);
      // setStateSummary(leadData?.state);
      // setCitySummary(leadData?.city);
      // setAllocatedToUser(leadData?.userId?.first_name);

      // setFirstName(leadData?.firstName);
      // setLastName(leadData?.lastName);
      // setEmail(leadData?.email);
      // setPrimaryNo(leadData?.primaryMobile);
      // setStateProvince(leadData?.state);
      // setCityProvince(leadData?.city);
      // setLeadType(leadData?.leadType);
      // setProduct(leadData?.Product);
      // setInsuranceComapany(leadData?.Insurance_Company);

      // setRemarkFromSource(leadData?.remarksfromSource);
      // setRemarkFromUser(leadData?.remarksfromUser);

      // setLeadAge(leadData?.age);
      // setLeadGender(leadData?.gender);
      // setMaritalStatus(leadData?.maritalStatus);
      // setLeadOccupation(leadData?.professionType);
      // setLeadVehiclesOwned(leadData?.vehiclesOwned);
      // setLeadSourceOfactivity(leadData?.sourceOfActivity);

      setFormItem((res) => ({
        ...res,
        companyName: leadData?.company_details?.company_name,
        parentCompanyName: leadData?.company_details?.parent_company,
        industry: leadData?.company_details?.industry_name,
        empaneled: leadData?.company_details?.tata_aig_empaneled,
        clientLocation: leadData?.company_details?.client_location,
        LOBForOpportunity: leadData?.LOB_opportunity,
        productForOpportunity: leadData?.product_for_opportunity,
        opportunityName: leadData?.opportunity_name,
        tenderDriver: leadData?.tender_driven,
        status: leadData?.leadStatus,
        disposition: leadData.hasOwnProperty("leadDisposition")
          ? leadData.leadDisposition
          : "",
        subDisposition: leadData.hasOwnProperty("leadsubDisposition")
          ? leadData.leadsubDisposition
          : "",
        appointmentDate: _appntDate,
        appointmentTime: _appntTime,
        collaborators: leadData?.teamMembers,
        remarks: leadData?.remarks,
      }));

      form.setFieldsValue({
        company_name: leadData?.company_details?.company_name,
        parent_company: leadData?.company_details?.parent_company,
        industry: leadData?.company_details?.industry_name,
        client_location: leadData?.company_details?.client_location,
        lob_for_opportunity: leadData?.LOB_opportunity,
        product_for_opportunity: leadData?.product_for_opportunity,
        opportunity_name: leadData?.opportunity_name,

        lead_status: leadData?.leadStatus,
        lead_disposition: leadData.hasOwnProperty("leadDisposition")
          ? leadData.leadDisposition
          : "",
        sub_disposition: leadData.hasOwnProperty("leadsubDisposition")
          ? leadData.leadsubDisposition
          : "",
        appointment_date: _appntDate,
        appointment_time: _appntTime,
        collaborators: leadData?.teamMembers,
        remarks: leadData?.remarks,
      });
    } catch (err) {
      console.log("__++++++++++++++ err +++++++++++>>", err);
    }
  };

  const onSelectCompany = async (event, data) => {
    console.warn("onSelectCompany ----->>>:", event, data);
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
    console.warn("onCompanyChange----event----->>>:", event);
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

    // console.warn('result__ADD COMPANY ----->>>:', result);
    // console.warn('companyArray----->>>:', companyArray);
    // console.warn('onCompanyChange----event----->>>:', event);
    // console.warn('onCompanyChange--------->>>:', data);
    // let _data = companyArray.filter(el => el.label === event)
    // console.warn('_data --------->>>:', _data);
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

  const checkValidity = (data) => {
    if (data === "" || data === undefined || data === null) {
      return "";
    } else {
      return data;
    }
  };

  const failedHandler = (error) => {
    alert(error);
    console.log(error);
  };

  const onChangeAppointData = (date, dateString) => {
    setFormItem((res) => ({
      ...res,
      appointmentDate: dateString,
    }));
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

  const submitHandler = () => {
    console.log("formItem", formItem);
    // return
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
      remarks: formItem.remarks,
      // teamMembers : "[{\"first_name\":\"Prithvi\",\"last_name\":\"Raj\",\"Id\":\"63ad6488d19ed8185f3b0d00\"}]",
      teamMembers: "[]",
      lead_Owner_Id: id,
      lead_Creator_Id: id,
      user_id: id,
      company_id: company_id,
      start_date: formItem.appointmentDate,
      start_time: formItem.appointmentTime,
    };

    //   {   REMARKSSS
    //     description: "xyz",
    //     date: 1674637658517,
    //     remark_id: "16746372"
    // }

    console.warn("(((((((isNewLead a___BBB))))))):", addLeadFormData);
    // return
    if (isNewLead) {
      dispatch(actions.createLead(addLeadFormData)).then((res) => {
        console.log("CREATE_LEAD_SUCCESS:", res);
        if (res.type === "CREATE_LEAD_SUCCESS") {
          console.log("success:", res.formData);
          // setErrorMessage(successMsg)
          setIsNewLead(false);

          setOpportunityNameSummary(res.formData.opportunity_name);
          setCompanySummary(res.formData.lob_for_opportunity);
          setCurrentStatusSummary(res.formData.leadStage);
          setIncorpDateSummary(
            new Date(res.formData.created_date).toLocaleDateString("in")
          );
          setCurrentStatsDateSummary(
            new Date(res.formData.created_date).toLocaleDateString("in")
          );
          // setEventCountSummary(res.formData)
          // setTodoCreatdSummary(res.formData)
          // setTodoComplteSummary(res.formData)
        }
        // console.warn('(((((((leadIdData___BBB))))))):', leadIdData);
      });
    } else {
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
        remarks: formItem.remarks,
        teamMembers: "[]",
        lead_Owner_Id: id,
        lead_Creator_Id: id,
        user_id: id,
        company_id: company_id,
        start_date: formItem.appointmentDate,
        start_time: formItem.appointmentTime,
        client_expectations: "",
        red_flags: "",
        our_ask: "",
        channel_name: "",
        producer: "",
        VAS_executed: "Yes",
        kdm_details: [
          {
            decision_maker_name: "",
            role: "ROLE",
            designation: "zzz",
            primaryContact: "",
            alternateContact: "",
            emailAddress: "",
            date_of_birth: "",
            city: "Mumbai",
            state: "Maharashtra",
            branch: "Andheri",
          },
        ],
        risk_details: [
          {
            total_entities: "",
            product_name: "",
            total_premium: "0",
            tagic_presence_percentage: "",
            tagic_premium: "",
            leader: "",
            lead_insurer: "",
            leader_share: "",
            inception_date: "",
          },
        ],
      };

      let _lead_id = storeLeadId !== undefined ? storeLeadId : leadIdData;
      dispatch(actions.editLead(updateLeadFormData, _lead_id)).then((res) => {
        if (res.type === "EDIT_LEAD_SUCCESS") {
          console.log("success:", res);
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
    }));

    form.setFieldsValue({
      company_name: "",
      parent_company: "",
      industry: "",
      client_location: "",
      lob_for_opportunity: "",
      product_for_opportunity: "",
      opportunity_name: "",
      lead_status: "",
      lead_disposition: "",
      sub_disposition: "",
      appointment_date: "",
      appointment_time: "",
      collaborators: [],
      remarks: [],
    });
  };

  if (leadDataLoading && _.isEmpty(storeFormData)) {
    return <Spin />;
  }

  return (
    <>
      <Tabs
        tabMenu={tabMenu}
        header="New Lead"
        activeKey="1"
        resetDataFields={resetDataFields}
      />

      <div className="form-container">
        <Form form={form} onFinish={submitHandler}>
          <Row justify={width > breakpoint ? "" : "center"} gutter={[0, 24]}>
            <Col
              className="form-body p50 mb-2"
              xs={{ span: 24, order: 2 }}
              sm={{ span: 16, order: 2 }}
              md={{ span: 16, order: 2 }}
              lg={{ span: 15, order: 1 }}
              xl={{ span: 15, order: 1 }}
              span={23}
              offset={width > breakpoint ? 2 : 0}
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
                      onChange={(val, data) => onParentCompanyChange(val, data)}
                      onSelect={(val, data) => onSelectParentCompany(val, data)}
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
              className={`form-body p40 mb-2 ${width > 991 ? "p40" : "p50"}`}
              style={{ padding: 20 }}
              xs={{ span: 24, order: 1 }}
              sm={{ span: 16, order: 1 }}
              md={{ span: 16, order: 1 }}
              lg={{ span: 6, order: 1 }}
              xl={{ span: 6, order: 1 }}
              span={23}
            >
              <Row>
                <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                  <p className="form-title">Summary</p>

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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="summary_heading">Company</p>
                      <p className="summary_data">{companySummary}</p>
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
                          <div className="event_box">
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
                        <Col span={16}>
                          <div className="todo_box">
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
                        message: "Age is required",
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
              className="form-body  p50"
              xs={{ order: 3 }}
              sm={16}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Collaborator</p>
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
                        format="DD-MM-YYYY"
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
              className="form-body p50"
              xs={{ order: 3 }}
              sm={16}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Opportunities Status</p>
              <Row gutter={16} className="mb-2 statsLead">
                <Col
                  className="d-flex align-items-center"
                  xs={24}
                  sm={12}
                  md={24}
                  lg={12}
                  xl={12}
                >
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
              xs={{ order: 5, span: 23 }}
              sm={16}
              md={16}
              lg={15}
              xl={15}
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
          </Row>
        </Form>
        {/* <FloatButton /> */}
      </div>
    </>
  );
});

export default NewLead;
