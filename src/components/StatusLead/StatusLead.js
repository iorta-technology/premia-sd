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
} from "antd";
import {
  ArrowRightOutlined,
  FileTextOutlined,
  EditOutlined,
  PhoneOutlined,
  SaveOutlined,
  DeleteOutlined,
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
    value: "Company Intelligence"
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
  const appointmentOptions = [
    {
      value: "newappointment",
      label: "New Appointment",
      children: [
        {
          value: "newApptmnt",
          label: "New Appointment",
          children: [
            {
              value: "Untouched / Not updated Appointment",
              label: "Untouched / Not updated Appointment",
            },
          ],
        },
      ],
    },
    {
      value: "followup",
      label: "Follow Up",
      children: [
        {
          value: "metcustomer",
          label: "Met Customer, in follow up for closure",
          children: [
            {
              value: "Met Customer, in follow up for closure",
              label: "Met Customer, in follow up for closure",
            },
          ],
        },
        {
          value: "notmet",
          label: "Not Met - Reschedule Appt",
          children: [
            {
              value: "Customer agreed to meet at another time",
              label: "Customer agreed to meet at another time",
            },
            {
              value: "Not Met - Reschedule Appt as phone keeps on ringing",
              label: "Not Met - Reschedule Appt as phone keeps on ringing",
            },
          ],
        },
      ],
    },
    {
      value: "notintrested",
      label: "Not Interested",
      children: [
        {
          value: "apptDenies",
          label: "Client denies giving appointment",
          children: [
            {
              value: "Client denies giving appointment",
              label: "Client denies giving appointment",
            },
          ],
        },
        {
          value: "metFollowupNotIntrested",
          label: "Met, followed up, then not interested",
          children: [
            {
              value: "Met, followed up, then not interested",
              label: "Met, followed up, then not interested",
            },
            {
              value: "Bought policy from competition",
              label: "Bought policy from competition",
            },
            {
              value: "Wants to check options and buy online",
              label: "Wants to check options and buy online",
            },
            {
              value: "Lack of funds",
              label: "Lack of funds",
            },
            {
              value: "Interested in other investment tools",
              label: "Interested in other investment tools",
            },
          ],
        },
      ],
    },
    {
      value: "notavailable",
      label: "Not Available",
      children: [
        {
          value: "phoneNtAvailble",
          label: "Phone not available always",
          children: [
            {
              value: "Not reachable / no answer / switched off always",
              label: "Not reachable / no answer / switched off always",
            },
          ],
        },
      ],
    },
    {
      value: "wrngnumber",
      label: "Wrong Number",
      children: [
        {
          value: "Wrong_Number",
          label: "Wrong Number",
          children: [
            {
              value: "Wrong Number",
              label: "Wrong Number",
            },
          ],
        },
      ],
    },
    {
      value: "convertd",
      label: "Converted",
      children: [
        {
          value: "leadconverted",
          label: "Convinced for a new policy",
          children: [
            {
              value: "Successfully closed appt, Convinced for a new policy",
              label: "Successfully closed appt, Convinced for a new policy",
            },
          ],
        },
      ],
    },
    {
      value: "renewalcollected",
      label: "Renewal Collected",
      children: [
        {
          value: "ConvinceRenPay",
          label: "Convinced for renewal payment",
          children: [
            {
              value: "Successfully closed appt, Convinced for renewal payment",
              label: "Successfully closed appt, Convinced for renewal payment",
            },
          ],
        },
      ],
    },
  ];
  const setReminderOptions = [
    { value: "5 minutes before", label: "5 minutes before" },
    { value: "10 minutes before", label: "10 minutes before" },
    { value: "15 minutes before", label: "15 minutes before" },
    { value: "30 minutes before", label: "30 minutes before" },
    { value: "1 hours before", label: "1 hours before" },
    { value: "2 hours before", label: "2 hours before" },
    { value: "1 day before", label: "1 day before" },
    { value: "2 days before", label: "2 days before" },
    { value: "1 week before", label: "1 week before" },
  ];
  const leadTypeOptions = [
    // {
    //   label: 'Select',
    //   value: 'select'
    // },
    {
      label: "New Business",
      value: "NewBusiness",
    },
    {
      label: "Renewal",
      value: "Renewal",
    },
    {
      label: "Cross Sell",
      value: "CrossSell",
    },
  ];

  const occupationOptions = [
    // { label: 'Select',value: 'select'},
    { label: "Businessman",value: "Businessman"},
    { label: "Govt job",value: "Govt job"},
    { label: "Private job",value: "Private job"},
    { label: "Professional (Doctor etc)",value: "Professional (Doctor etc)"},
    { label: "Others",value: "Others"},
    
  ];
  const vehicleOwnedOptions = [
    // { label: 'Select',value: 'select'},
    { label: "4 wheeler",value: "4 wheeler"},
    { label: "2 wheeler",value: "2 wheeler"},
    { label: "No",value: "No"},
    
  ];
  const sourceOfActivityOptions = [
    // { label: 'Select',value: 'select'},
    { label: 'Petrol Pump',value: 'Petrol Pump'},
    { label: 'Door to door',value: 'Door to door'},
    { label: 'Mall',value: 'Mall'},
    { label: 'School/Park/Temple',value: 'School/Park/Temple'},
    { label: 'Others',value: 'Others'},
    
  ];
  const insuranceCompanyOptions = [
    // {
    //   label: 'Select',
    //   value: 'select'
    // },
    {
      label: "TATA AIG General Insurance Company",
      value: "TATA AIG General Insurance Company",
    },

    {
      label: "ICICI Lombard Genral Insurance Company",
      value: "ICICI Lombard Genral Insurance Company",
    },

    {
      label: "ICICI Prudential Life Insurance Company",
      value: "ICICI Prudential Life Insurance Company",
    },
    {
      label: "Manipal Cigna Health Insurance Company",
      value: "Manipal Cigna Health Insurance Company",
    },
    {
      label: "Exide Life Insurance Company Limited",
      value: "Exide Life Insurance Company Limited",
    },
  ];
  const leadProductOptions = [
    // {
    //   label: 'Select',
    //   value: 'select'
    // },
    {
      label: "Health",
      value: "Health",
    },
    {
      label: "Motor",
      value: "Motor",
    },
    {
      label: "Travel",
      value: "Travel",
    },
    {
      label: "Personal Accident",
      value: "Personal Accident",
    },
    {
      label: "Term",
      value: "Term",
    },
    {
      label: "ULIP",
      value: "ULIP",
    },
  ];
  const appointmentTimeOptions = [
    { label: "8:00 AM", value: "28800000" },
    { label: "8:30 AM", value: "30600000" },
    {
      label: "9:00 AM",
      value: "32400000",
    },
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

  const teamTableHeader = [
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Team Member's",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <DeleteOutlined onClick={() => deleteTableRow(record)} />
      ),
    },
  ];

  // let formRef = createRef();
  const dispatch = useDispatch();
  // const history = useHistory()
  const [form] = Form.useForm();
  useEffect(() => {
    // dispatch(actions.fetchTeamMember())
    // console.warn('LEAD__ID__FROM___ROUTE___',props.location.state)
    dispatch(actions.headerName('New Lead'));
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
  const [product, setProduct] = useState('')
  // const [insuranceCompany, setInsuranceComapany] = useState(storeInsuranceCompanyValue !== '' ? storeInsuranceCompanyValue : 'select')
  const [insuranceCompany, setInsuranceComapany] = useState('')
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
  const [addTeamMemb ,setAddTeamMemb]=useState([])
  const [addTeamMemAPIStruct ,setAddTeamMemAPIStruct]=useState([])
  const [teamTableData ,setTeamTableData]=useState([])
  const [leadIdData ,setLeadIdData]=useState('')
  const [teamDesig ,setTeamDesig]=useState(null)
  const [totalDaysCount, setDaysCount] = React.useState('');
  const [allocatedToUser, setAllocatedToUser] = React.useState('');
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
        age:leadData?.age,
        gender:leadData?.gender,
        maritalStatus:leadData?.maritalStatus,
        occupation:leadData?.professionType,
        vehiclesOwned:leadData?.vehiclesOwned,
        sourceOfactivity:leadData?.sourceOfActivity,
  
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

  const handleCancel = () => {
    setDesigDataOwner("");
    setTeamDataOwner("");
    form.setFieldsValue({
      "Select Owner Designation": "",
      "Select Owner Team Member": "",
    });
    setOwnerArray([]);
    setLeadOwner("");

    setVisibleChangeOwnerModel(false);
  };

  const leadOptions = [
    {
      value: "newleadentery",
      label: "New Lead Entry",
      // disabled: !isNewLead
    },
    {
      value: "nocontact",
      label: "No Contact",
      children: [
        {
          value: "notreachable",
          label: "Not Reachable",
          children: [
            {
              value: "Not reachable",
              label: "Not reachable",
            },
          ],
        },
        {
          value: "ringingbusy",
          label: "Ringing Busy",
          children: [
            {
              value: "Ringing Busy",
              label: "Ringing Busy",
            },
          ],
        },
        {
          value: "wrongnumber",
          label: "Wrong Number",
          children: [
            {
              value: "Wrong number",
              label: "Wrong number",
            },
          ],
        },
        {
          value: "invalid",
          label: "Invalid Number",
          children: [
            {
              value: "Invalid Number",
              label: "Invalid Number",
            },
          ],
        },
        {
          value: "switchoff",
          label: "Switched off",
          children: [
            {
              value: "Switched off",
              label: "Switched off",
            },
          ],
        },
      ],
    },
    {
      value: "contact",
      label: "Contact",
      children: [
        {
          value: "appointment",
          label: "Appointment",
          isSelected: true,
          children: [
            {
              value: "Client has given appointment",
              label: "Client has given appointment",
            },
          ],
        },
        {
          value: "callback",
          label: "Callback",
          isSelected: false,
          children: [
            {
              value: "Asked to call back later",
              label: "Asked to call back later",
            },
            {
              value: "Decision maker unavailable",
              label: "Decision maker unavailable",
            },
            {
              value: "ECS is active asked to call on due date",
              label: "ECS is active asked to call on due date",
            },
          ],
        },
        // {
        //   value: 'followup',
        //   label: 'Follow-up',
        //   isSelected: false,
        //   children: [
        //     {
        //       value: 'Met-in follow-up for closure',
        //       label: 'Met-in follow-up for closure',
        //     },
        //     {
        //       value: 'Not Met - Reschedule appointment',
        //       label: 'Not Met - Reschedule appointment',
        //     }
        //   ],
        // },
        {
          value: "shorthangup",
          label: "Short hang up",
          children: [
            {
              value: "Short hang up",
              label: "Short hang up",
            },
          ],
        },
        {
          value: "notinterested",
          label: "Not interested",
          children: [
            {
              value: "Not interested to Meet",
              label: "Not interested to Meet",
            },
            {
              value: "Did not Enquire",
              label: "Did not Enquire",
            },
            {
              value: "Too Expensive",
              label: "Too Expensive",
            },
            {
              value: "Not interested to continue Existing Policy",
              label: "Not interested to continue Existing Policy",
            },
          ],
        },
        {
          value: "nonserviceloc",
          label: "Non Servicable location",
          children: [
            {
              value: "Non Servicable location",
              label: "Non Servicable location",
            },
          ],
        },
        {
          value: "noteligible",
          label: "Not Eligible",
          children: [
            {
              value: "NE - Income",
              label: "NE - Income",
            },
            {
              value: "NE - Age",
              label: "NE - Age",
            },
          ],
        },
        // {
        //   value: 'notavailable',
        //   label: 'Not Available',
        //   children: [
        //     {
        //       value: 'Not Reachable',
        //       label: 'Not Reachable',
        //     },
        //     {
        //       value: 'No Answer',
        //       label: 'No Answer',
        //     },
        //     {
        //       value: 'Alway Switched off',
        //       label: 'Alway Switched off',
        //     },
        //   ],
        // },
        // {
        //   value: 'converted',
        //   label: 'Converted',
        //   children: [
        //     {
        //       value: 'Closed with success',
        //       label: 'Closed with success',
        //     },
        //   ],
        // },
      ],
    },
  ];

  const onChangeFirstName = (e) => {
    // console.warn('FIRSTNAME',e)
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const primaryNoHandler = (event) => {
    setPrimaryNo(event.target.value);
  };
  const emailAddressHandler = (event) => {
    setEmail(event.target.value);
  };

  const leadAgeHandler = (event) => {
    setLeadAge(event.target.value);
  };
  const genderHandler = (event) => {
    setLeadGender(event.target.value);
  };
  const maritalStatusHandler = (event) => {
    setMaritalStatus(event.target.value);
  };

  const occupationHandler = (event) => {
    setLeadOccupation(event);
  };
  const vehicleOwnedHandler = (event) => {
    setLeadVehiclesOwned(event);
  };
  const sourceOfActivityHandler = (event) => {
    setLeadSourceOfactivity(event);
  };

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

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf("second");
  };

  const getDisabledHours = () => {
    var hours = [];
    for (var i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

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

  const handleAddMember = () => {
    // setModalText('Updating changes ');
    visibleTeamMemberModal && dispatch(actions.fetchTeamMember(channelCode));
  };
  const showChangeOwnerModal = () => {
    setDesigDataOwner("");
    setTeamDataOwner("");
    form.setFieldsValue({
      "Select Owner Designation": "",
      "Select Owner Team Member": "",
    });
    setVisibleChangeOwnerModel(true);
  };

  const handleChangeOwner = () => {
    // setModalText('Updating changes ');
    setChangeOwnerLoading(true);
    setTimeout(() => {
      setVisibleChangeOwnerModel(false);
      setChangeOwnerLoading(false);
    }, 2000);
  };

  const leadHandler = (value) => {
    // console.log('LEADSSS___STATUSSS', value)
    setLeadStatus(value[0]);
    setLeadDisposition(value[1]);
    setLeadSubDisposition(value[2]);
  };
  const appointmentStatusHandler = (value) => {
    setAppointmentStatus(value[0]);
    setAppointmentDisposition(value[1]);
    setAppointmentSubDisposition(value[2]);
  };

  const appointmentDateHandler = (date, dateString) => {
    // setAppointmentDate(Date.parse(dateString))
    let newDate = moment(date).valueOf();
    // let ms_date = new Date(newDate).setUTCHours(0, 0, 0, 0)
    // console.log('old',ms_date)
    console.log("new moment", newDate);
    setAppointmentDate(date);
    setAppointmentDatePost(newDate);
  };
  // console.log(appointmentDatePost)
  // const newDate = moment.unix(appointmentDate/1000).format("DD MM YYYY ")
  // console.log(appointmentDate)

  const updateDateHandler = (date, dateString) => {
    // setAppointmentDate(Date.parse(dateString))
    setAppointmentDate(moment(1635070237883));
  };

  const startTimeHandler = (value) => {
    // const hourInMilisec = (new Date(time).getHours() + 24) % 12 || 12
    // const minInMilisec = new Date(time).getMinutes()
    // const res = (+parseInt(hourInMilisec) * (60000 * 60)) + (+parseInt(minInMilisec) * 60000)
    // console.log(res)
    // console.log(hourInMilisec)
    console.log(typeof value);
    setAppointmentTime(value);
  };
  const remarkFromSourceHandler = (event) => {
    setRemarkFromSource(event.target.value);
  };

  const remarkFromUserHandler = (event) => {
    setRemarkFromUser(event.target.value);
  };

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

    if(cityProvince !== ''){
      setCityProvince("");
      form.setFieldsValue({ city: "" });
    }
    
  };

  const cityChangeHandler = (event) => {
    // setCityProvince(event.target.value)
    setCityProvince(event);
  };
  const leadTypeHandler = (event) => {
    // setLeadType(event.target.value)
    // console.log('leadTypeHandler __________:', event);
    setLeadType(event);
  };
  const productHandler = (event) => {
    // setProduct(event.target.value)
    setProduct(event);
  };
  const insuranceCompanyHandler = (event) => {
    // setInsuranceComapany(event.target.value)
    setInsuranceComapany(event);
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const toggleTeamMember = () => {
    setDesigData("");
    setTeamData("");
    form.setFieldsValue({
      "Select Designation": "",
      "Select Team Member": "",
    });
    setVisibleTeamMemberModal(!visibleTeamMemberModal);
    !visibleTeamMemberModal && dispatch(actions.fetchDesignation(channelCode));
  };
  const saveTeamMemberData = () => {
    // console.warn('addTeamMemb ====(((((IIIIIIIII(((((===>>>>>>>>>>', addTeamMemb)
    let _dataArr = addTeamMemb.map((el) => {
      let _data = {
        designation: el.designation,
        teamName: el.teamName,
        teamMem_id: el.teamMem_id,
      };
      return _data;
    });

    setTeamTableData(_dataArr);
    setVisibleTeamMemberModal(false);
  };

  const deleteTableRow = (el) => {
    // console.warn('el ====((((((((((===>>>>>>>>>>', el)
    // console.warn('addTeamMemb ====(((((IIIIIIIII(((((===>>>>>>>>>>', addTeamMemb)
    const newData = teamTableData.filter(
      (item) => item.teamMem_id !== el.teamMem_id
    );
    setTeamTableData(newData);
    setAddTeamMemb(newData);
    // console.warn('newData ====((((((((((===>>>>>>>>>>', newData)
    let _data = {};
    let _arryy = newData.map((el) => {
      userTreeData.reporting_users.filter((event) => {
        if (event._id === el.teamMem_id) {
          _data = {
            first_name: event.first_name,
            last_name: event.last_name,
            Id: event._id,
          };
        }
      });
      return _data;
    });
    setAddTeamMemAPIStruct(_arryy);
  };

  // validations
  const validateMessages = {
    // required: `${label} is required!`,
    types: {
      email: `Email id must include @`,
    },
    // number: {
    //   phone: 'Not a valid no'
    //   range: 'Number must be 10 digits',
    // },
  };
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

  let formIsValid = false;

  const failedHandler = (error) => {
    alert(error);
    console.log(error);
  };
  const submitHandler = (event) => {
    console.warn("(((((((isNewLead a___BBB))))))):", isNewLead);
    if (isNewLead) {
      dispatch(actions.createLead(createFormData)).then((res) => {
        // console.log('CREATE_LEAD_SUCCESS:', res);
        if (res.type === "CREATE_LEAD_SUCCESS") {
          console.log("success:", res.formData[0]);
          // setErrorMessage(successMsg)
          setIsNewLead(false);
          setleadIDSummary(res.formData[0]?.lead_Id);
          setFirstNameSummary(res.formData[0]?.firstName);
          setLastNameSummary(res.formData[0]?.lastName);
          setMobileNoSummary(res.formData[0]?.primaryMobile);
          setStateSummary(res.formData[0]?.state);
          setCitySummary(res.formData[0]?.city);
          setAllocatedToUser(res.formData[0]?.userId?.first_name);

          setLeadIdData(res.formData[0]._id);
        }
        // else if (res.type === 'CREATE_LEAD_FAIL') {
        //   console.log('failed:', res);

        //   failedHandler(res.error)
        //   console.log(res)
        // }
        // console.warn('(((((((leadIdData___BBB))))))):', leadIdData);
      });
    } else {
      let _lead_id = storeLeadId !== undefined ? storeLeadId : leadIdData;
      dispatch(actions.editLead(formData, _lead_id)).then((res) => {
        if (res.type === "EDIT_LEAD_SUCCESS") {
          console.log("success:", res);
          setErrorMessage(successMsg);
          setIsNewLead(false);
        } else if (res.type === "EDIT_LEAD_FAIL") {
          console.log("failed:", res);

          failedHandler(res.error);
        }
      });
      // history.push('leaddetails/personallead')
    }
    // setErrorMessage( res.data.errMsg)
  };

  const handleDesignationData = (event, data) => {
    // console.warn('addTeamMemb(((((--------------(((((===>>>>>>>>>>', addTeamMemb)
    // console.warn('data(((((--------------(((((===>>>>>>>>>>', data)
    setDesigData(event);
    setTeamData("");
    form.setFieldsValue({
      "Select Team Member": "",
    });
    // const [teamDesig ,setTeamDesig]=useState(null)
    let _team = { ["designation"]: data.label };
    setTeamDesig(_team);

    let _teamData = userTreeData.reporting_users.filter(
      (el) => el.designation === event
    );
    setTeamMemberList(_teamData);
  };
  const handleDesignationDataOwner = (event, data) => {
    // console.warn('event(((((--------------(((((===>>>>>>>>>>', event)
    // console.warn('data(((((--------------(((((===>>>>>>>>>>', data)
    setDesigDataOwner(event);
    setTeamDataOwner("");
    form.setFieldsValue({
      "Select Owner Team Member": "",
    });

    let _teamData = userTreeData.reporting_users.filter(
      (el) => el.designation === event
    );
    setTeamMemberListOwner(_teamData);
  };
  
  const handleTeamListData = (event, data) => {
    setTeamData(event);
    // console.warn('BEFORE====((((((((((===>>>>>>>>>>', data)

    let apiBody = {
      first_name: data.first_name,
      last_name: data.last_name,
      Id: data._id,
    };

    let _team = {
      ...teamDesig,
      ["teamName"]: data.label,
      ["teamMem_id"]: data.value,
    };
    // Data Structure for Table Data
    setAddTeamMemb([...addTeamMemb, _team]);
    // Data Structure for API Request Body
    setAddTeamMemAPIStruct([...addTeamMemAPIStruct, apiBody]);
    // console.warn('addTeamMemAPIStruct((((((((((===>>>>>>>>>>', addTeamMemAPIStruct)
    // console.warn('AFTERRR====((((((((((===>>>>>>>>>>', addTeamMemb)
  };

  const handleTeamListDataOwner = (event, data) => {
    setTeamDataOwner(event);
    setOwnerArray(data);
    // console.warn('BEFORE====((((((((((===>>>>>>>>>>', data)
  };
  const saveOwnerData = () => {
    // console.warn('ownerArray ====((((((((((===>>>>>>>>>>', ownerArray)
    setVisibleChangeOwnerModel(false);
    setLeadOwner(ownerArray?.first_name);
  };

  // const proceedHandler = event => {
  //   event.preventDefault();

  //   if (!formIsValid) {
  //     return;
  //   } else {
  //     dispatch(actions.storeLead(formData))
  //     history.push('leaddetails/personallead')
  //   }

  //   setErrorMessage('Form submitted successfully')
  //   setIsNewLead(false)
  //   // setErrorMessage( res.data.errMsg)

  //   // resetFirstName();
  //   // resetLastName();
  //   // resetEmail();
  // };

  // const updateLeadHandler = event => {
  //   event.preventDefault();

  //   dispatch(actions.editLead(formData, storeLeadId))
  //   // if (!formIsValid) {
  //   //   return;
  //   // }else{
  //   // }

  //   setErrorMessage('Form updated successfully')
  //   setIsNewLead(false)
  // }

  // useEffect(() => {
  //   if(designationsOptions===undefined){
  //     return
  //   }else{
  //     const getDesignation= designationsOptions

  //   }

  // }, [designationsOptions])

  if (leadDataLoading && _.isEmpty(storeFormData)) {
    return <Spin />;
  }

  return (
    <>
      <Tabs tabMenu={tabMenu} header="New Lead" activeKey="1" />

      <div className="form-container">
        <Form
          form={form}
          onFinish={submitHandler}
        >
          <Row justify={width > breakpoint ? "" : "center"} gutter={[0, 24]}>
            <Col
              className="form-body  p50 mb-2"
              xs={24}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Company Details</p>
              <Row gutter={16} className="mb-2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="firstname"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-Z ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      // className="first-name input-box "
                      size="large"
                      placeholder="Enter First Name"
                      value={firstName}
                      // defaultValue={firstName}
                      onChange={(item) => onChangeFirstName(item)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="lastname"
                    label="Last Name"
                    rules={[
                      // {
                      //   required: true,
                      //   message: "Last Name is required",
                      // },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-Z ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="last-name input-box"
                      size="large"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(item) => onChangeLastName(item)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        message: "Please provide valid email address",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="email input-box"
                      size="large"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(item) => emailAddressHandler(item)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="phone"
                    label="Primary Mobile"
                    rules={[
                      {
                        required: true,
                        message: "Mobile No is required",
                      },
                      {
                        message: "Number must be 10 digits",
                        pattern: new RegExp("^[6-9][0-9]{9}$"),
                      },

                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="phone-no input-box"
                      disabled={mobileDisable}
                      size="large"
                      placeholder="Enter Primary Mobile"
                      maxLength="10"
                      value={primaryNo}
                      onChange={(item) => primaryNoHandler(item)}
                    />
                  </Form.Item>
                </Col>
                {/* <p>{stateProvince}</p> */}
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="state"
                    label="State"
                    rules={[
                      {
                        required: false,
                        message: "Select your State!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      size="large"
                      placeholder="Select Your State"
                      options={stateOptions}
                      onSelect={stateSelectHandler}
                      value={stateProvince}
                      // defaultValue={stateProvince}
                      onChange={(item) => stateChangetHandler(item)}
                      // onChange={stateChangetHandler}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: false,
                        message: "Please select your city!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      size="large"
                      placeholder="Select a city"
                      options={citiesOptions}
                      value={cityProvince}
                      // defaultValue={citiesOptions}
                      onChange={(item) => cityChangeHandler(item)}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="leadType"
                    label="Lead Type"
                    rules={[
                      {
                        required: true,
                        message: "Select Lead Type",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      options={leadTypeOptions}
                      value={leadType}
                      // defaultValue={leadType}
                      size="large"
                      placeholder="Select Lead Type"
                      onChange={(item) => leadTypeHandler(item)}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="product"
                    label="Product"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Select Product",
                    //   },
                    // ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      value={product}
                      // defaultValue={product}
                      size="large"
                      options={leadProductOptions}
                      placeholder="Select Product"
                      onChange={(item) => productHandler(item)}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="insuranceCompany"
                    label="Insurance Company"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Insurance Company",
                    //   },
                    // ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      value={insuranceCompany}
                      // defaultValue={insuranceCompany}
                      size="large"
                      placeholder="Select Insurance"
                      onChange={(item) => insuranceCompanyHandler(item)}
                      options={insuranceCompanyOptions}
                    ></Select>
                  </Form.Item>
                </Col>
                
                {/* New Fields added on 9 Dec Below ↓ */}
                
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="age"
                    label="Age"
                    rules={[
                      {
                        required: true,
                        message: "Age is required",
                      },
                      {
                        message: "Only Numbers are allowed",
                        pattern: new RegExp("^[0-9]*$"),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="phone-no input-box"
                      size="large"
                      placeholder="Enter Age"
                      maxLength="10"
                      value={leadAge}
                      onChange={(item) => leadAgeHandler(item)}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="gender"
                    label="Sex/Gender"
                    rules={[
                      {
                        required: true,
                        message: "Sex/Gender is required",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-Z ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      placeholder="Enter Sex/Gender"
                      maxLength="10"
                      value={leadGender}
                      onChange={(item) => genderHandler(item)}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="maritalStatus"
                    label="Marital Status"
                    rules={[
                      {
                        required: true,
                        message: "Marital Status is required",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-Z ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      placeholder="Enter Marital Status"
                      maxLength="10"
                      value={maritalStatus}
                      onChange={(item) => maritalStatusHandler(item)}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="occupation"
                    label="Occupation"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Occupation",
                    //   },
                    // ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      value={leadOccupation}
                      // defaultValue={insuranceCompany}
                      size="large"
                      placeholder="Select Occupation"
                      onChange={(item) => occupationHandler(item)}
                      options={occupationOptions}
                    ></Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="vehiclesOwned"
                    label="Vehicles owned"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Vehicles owned",
                    //   },
                    // ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      value={leadVehiclesOwned}
                      // defaultValue={insuranceCompany}
                      size="large"
                      placeholder="Select Vehicles owned"
                      onChange={(item) => vehicleOwnedHandler(item)}
                      options={vehicleOwnedOptions}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="sourceOfactivity"
                    label="Source of activity"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Source of activity",
                    //   },
                    // ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      value={leadSourceOfactivity}
                      // defaultValue={insuranceCompany}
                      size="large"
                      placeholder="Select Source of activity"
                      onChange={(item) => sourceOfActivityHandler(item)}
                      options={sourceOfActivityOptions}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              className="form-body  p40"
              style={{ marginLeft: width > breakpoint ? "20px" : "0" }}
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
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">Lead ID</p>
                      <p className="lead-detail">
                        {leadIDSummary} <br />{" "}
                      </p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">Source</p>
                      <p className="lead-detail">-</p>
                    </Col>
                  </Row>
                  <div
                    style={{
                      backgroundColor: "gray",
                      height: "1px",
                      width: "auto",
                      opacity: "0.3",
                      margin: "5px 0px 5px 0px",
                    }}
                  ></div>

                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">Name</p>
                      <p className="lead-detail">
                        {firstNameSummary} {lastNameSummary} <br />
                      </p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label"> Mobile Number </p>
                      <p className="lead-detail">
                        <a href={`tel:${mobileNoSummary}`}></a>{" "}
                        {mobileNoSummary}
                      </p>
                    </Col>
                  </Row>
                  <div
                    style={{
                      backgroundColor: "gray",
                      height: "1px",
                      width: "auto",
                      opacity: "0.3",
                      margin: "5px 0px 5px 0px",
                    }}
                  ></div>

                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">State</p>
                      <p className="lead-detail">
                        {stateSummary} <br />{" "}
                      </p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">City</p>
                      <p className="lead-detail">{citySummary}</p>
                    </Col>
                  </Row>
                  <div
                    style={{
                      backgroundColor: "gray",
                      height: "1px",
                      width: "auto",
                      opacity: "0.3",
                      margin: "5px 0px 5px 0px",
                    }}
                  ></div>

                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">Allocated To</p>
                      <p className="lead-detail">{allocatedToUser}</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">Created on</p>
                      <p className="lead-detail">
                        {new Date(createdDateValue).toLocaleDateString("in")}
                      </p>
                      <p className="lead-date">{totalDaysCount}</p>
                    </Col>
                  </Row>
                  <div
                    style={{
                      backgroundColor: "gray",
                      height: "1px",
                      width: "auto",
                      opacity: "0.3",
                      margin: "5px 0px 5px 0px",
                    }}
                  ></div>
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
              <p className="form-title">Status</p>
              <Row gutter={16} className="mb-2">
                {showLeadStatus === true ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="appointmentStatus"
                      label="Appointment Status"
                      style={{ marginBottom: "1rem" }}
                      size="large"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Appointment Status",
                        },
                      ]}
                    >
                      <Cascader
                        bordered={false}
                        className="select-box"
                        options={appointmentOptions}
                        placeholder="New Contact"
                        size="large"
                        dropdownClassName="popup-size"
                        onChange={(item) => appointmentStatusHandler(item)}
                        style={{ height: "2.45rem" }}
                        value={leadStatusData}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="leadStatus"
                      label="Lead Status"
                      style={{ marginBottom: "1rem" }}
                      size="large"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Lead Status",
                        },
                      ]}
                    >
                      <Cascader
                        bordered={false}
                        className="select-box"
                        options={leadOptions}
                        placeholder="New Contact"
                        size="large"
                        dropdownClassName="popup-size"
                        onChange={(event) => leadHandler(event)}
                        style={{ height: "2.45rem" }}
                        value={leadStatusData}
                      />
                    </Form.Item>
                  </Col>
                )}
                {leadDisposition === "appointment" ||
                leadDisposition === "callback" ? (
                  <>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentDate"
                        label="Appointment Date"
                        rules={[
                          {
                            type: "object",
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          className="input-box"
                          // disabledDate={disabledDate}
                          onChange={(item) => appointmentDateHandler(item)}
                          value={appointmentDate}
                          size="large"
                          format="YYYY/MM/DD"
                          disabledDate={(d) => !d || d.isBefore(minimumDate)}
                          style={{
                            width: "100%",
                            boxShadow: "none",
                            border: "none",
                            borderBottom: "1px rgb(153, 153, 153) solid",
                          }}
                          // style={{ width: "100%",border:'none',borderBottom:'1px solid gray' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentTime"
                        label="Select Start Time"
                        rules={[
                          {
                            required: true,
                            message: "Select Start Time",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        {/* <TimePicker
                          disabledHours={getDisabledHours}
                          disabledMinutes={getDisabledMinutes}
                          use12Hours
                          minuteStep={30}
                          format="h:mm"
                          size="large"
                          style={{ width: "100%" }}
                          onChange={startTimeHandler} /> */}
                        <Select
                          bordered={false}
                          className="select-box"
                          value={appointmentTime}
                          onChange={(item) => startTimeHandler(item)}
                          size="large"
                          // style={{ width: "100%", boxShadow: 'none', border: 'none', outline: 'none', borderBottom: '1px rgb(153, 153, 153) solid', }}
                          options={appointmentTimeOptions}
                          placeholder="Start Time"
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      {/* <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="reminder"
                        label="Set Reminder"
                        rules={[
                          {
                            required: false,
                            message: 'Set Reminder',
                          },
                        ]}
                        style={{ marginBottom: '1rem' }}
                      >
                        <Select
                          bordered={false}
                          className='select-box'
                          // onChange={(item)=> reminderHandler(item)} 
                          value={reminder} size="large"
                          options={setReminderOptions}
                          placeholder="Set Reminder">
                        </Select>
                      </Form.Item> */}
                    </Col>
                  </>
                ) : null}
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="remarksfromsource"
                    label="Remark From Source "
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="email input-box"
                      size="large"
                      placeholder="Enter Some Remark"
                      value={remarkFromSource}
                      onChange={(item) => remarkFromSourceHandler(item)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12} className="mb-2">
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="remarksfromuser"
                    label="Remark From User "
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="email input-box"
                      size="large"
                      placeholder="Enter Some Remark"
                      value={remarkFromUser}
                      onChange={(item) => remarkFromUserHandler(item)}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  className="lead-manager"
                  style={
                    (leadDisposition === "appointment" ||
                      leadDisposition === "callback") && { display: "none" }
                  }
                ></Col>

                {/* {checkAgent() === false && ( */}
                  <>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                      className="lead-manager"
                    >
                      <p className="botton-label">
                        Currently this lead is allocated to{" "}
                        {!leadOwner ? "Self" : leadOwner}
                      </p>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={5}
                      lg={5}
                      xl={5}
                      className="lead-manager"
                      offset={width > breakpoint ? 7 : 0}
                    >
                      <Button
                        shape="round"
                        size="large"
                        style={{
                          backgroundColor: "rgb(59, 55, 30)",
                          color: "#ffff",
                        }}
                        block
                        onClick={showChangeOwnerModal}
                      >
                        Change Owner
                      </Button>
                    </Col>
                    <Modal
                      title="Allocate to"
                      centered={true}
                      visible={visibleChangeOwnerModel}
                      onCancel={handleCancel}
                      footer={[
                        <Button key="cancel" onClick={handleCancel}>
                          Cancel
                        </Button>,
                        <Button
                          key="save"
                          type="primary"
                          onClick={saveOwnerData}
                          style={{ backgroundColor: "rgb(59, 55, 30)" }}
                        >
                          Save
                        </Button>,
                      ]}
                    >
                      <Row gutter={10}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Select Owner Designation"
                            label="Select Owner Designation"
                            rules={[
                              {
                                required: false,
                                message: "Set Designation",
                              },
                            ]}
                          >
                            <Select
                              size="large"
                              value={desigDataOwner}
                              options={hierarAgentListOwner}
                              onChange={(event, data) =>
                                handleDesignationDataOwner(event, data)
                              }
                              placeholder="Set Designation"
                            ></Select>
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="Select Owner Team Member"
                            label="Select Owner Team Member"
                            rules={[
                              {
                                required: false,
                                message: "Set Reminder",
                              },
                            ]}
                          >
                            <Select
                              size="large"
                              value={teamDataOwner}
                              options={teamMemberListOwner}
                              onChange={(event, data) =>
                                handleTeamListDataOwner(event, data)
                              }
                              placeholder="Set Team Member"
                            ></Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Modal>
                  </>
                {/* )} */}

                {/* {checkAgent() === false && ( */}
                  <>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                      className="lead-manager"
                    >
                      <p className="botton-label">
                        Select the team members you want to involve for this
                        lead
                      </p>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={6}
                      lg={6}
                      xl={6}
                      className="lead-manager"
                      offset={width > breakpoint ? 6 : 0}
                    >
                      <Button
                        shape="round"
                        size="large"
                        block
                        onClick={toggleTeamMember}
                        type="primary"
                        style={{
                          backgroundColor: "rgb(59, 55, 30)",
                          border: "none",
                        }}
                      >
                        Add Team Member
                      </Button>
                    </Col>
                    <>
                      <Modal
                        title="Add Team Member"
                        centered={true}
                        visible={visibleTeamMemberModal}
                        onCancel={toggleTeamMember}
                        footer={[
                          <Button key="cancel" onClick={toggleTeamMember}>
                            Cancel
                          </Button>,
                          <Button
                            key="save"
                            type="primary"
                            onClick={saveTeamMemberData}
                            style={{ backgroundColor: "rgb(59, 55, 30)" }}
                          >
                            Save
                          </Button>,
                        ]}
                        // onCancel={handleCancel}
                      >
                        <Row gutter={10}>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              className="form-item-name label-color"
                              name="Select Designation"
                              label="Select Designation"
                              rules={[
                                {
                                  required: false,
                                  message: "Set Designation",
                                },
                              ]}
                            >
                              <Select
                                size="large"
                                value={desigData}
                                options={hierarAgentList}
                                onChange={(event, data) =>
                                  handleDesignationData(event, data)
                                }
                                placeholder="Set Designation"
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              className="form-item-name label-color"
                              name="Select Team Member"
                              label="Select Team Member"
                              rules={[
                                {
                                  required: false,
                                  message: "Set Reminder",
                                },
                              ]}
                            >
                              <Select
                                size="large"
                                value={teamData}
                                options={teamMemberList}
                                onChange={(event, data) =>
                                  handleTeamListData(event, data)
                                }
                                placeholder="Set Team Member"
                              ></Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Modal>
                    </>
                  </>
                {/* )} */}
                  {/* checkAgent() === false &&  */}
                {teamTableData.length > 0 && (
                  <Col xs={12} sm={12} md={12}>
                    <Table
                      pagination={false}
                      bordered
                      dataSource={teamTableData}
                      columns={teamTableHeader}
                      size="small"
                    />
                  </Col>
                )}
              </Row>

              {/* </Form> */}
            </Col>
            <Col
              className="form-body  p30"
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
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
                {isNewLead ? (
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "rgb(59, 55, 30)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                      // shape="round"
                      // size="large"
                      icon={<FileTextOutlined />}
                      htmlType="submit"
                      // disabled={!formIsValid}
                      // onClick={submitHandler}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                ) : (
                  <Form.Item>
                    <Button
                      type="primary"
                      // shape="round"
                      // size="large"
                      style={{
                        backgroundColor: "rgb(59, 55, 30)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                      icon={<SaveOutlined />}
                      htmlType="submit"
                      // disabled={!formIsValid}
                      // onClick={updateLeadHandler}
                    >
                      Update
                    </Button>
                  </Form.Item>
                )}
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
