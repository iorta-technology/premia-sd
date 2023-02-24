import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarEvent.css";
import {
  TimePicker,
  Button,
  Modal,
  Card,
  Input,
  DatePicker,
  Alert,
  Tag,
  Space,
  message,
  AutoComplete,
  Col,
} from "antd";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { PresetStatusColorTypes } from "antd/lib/_util/colors";
import { NavItem } from "react-bootstrap";
import Icon from "@ant-design/icons";
import axiosRequest from "../../axios-request/request.methods";
import { stoageGetter,checkAgent } from "../../helpers";
import axios from "axios";
import _ from "lodash";
import Form from "antd/lib/form/Form";
import Item from "antd/lib/list/Item";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
const { Search, TextArea } = Input;

let dateFormat = "YYYY/MM/DD";

let addEvent = [];
export default function CalendarEvent(props) {
  const dispatch = useDispatch();

  let { innerWidth: width, innerHeight: height } = window;
  const format = "h:mm";
  let month = moment().format("MM/YYYY");
  // console.log(month)
  const elementRefs = useRef({});
  const [Appointmentid, setAppointmentid] = useState("");
  const [advisorCheck, setAdvisorCheck] = useState(true);
  const [prospectCheck, setProspectCheck] = useState(false);
  const [customerCheck, setCustomerCheck] = useState(false);
  const [appointmenttypes, setAppointmentType] = useState(
    "New Proposition Meeting"
  );
  const [clientvisit, setclientVisit] = useState("");
  const [duration, setDuration] = useState("");
  const [stakeholdrName, setStakeholdrName] = useState("");
  const [timelineDateData, setTimelineDateData] = useState("");
  const [timelineDatestring, setTimelineDateString] = useState("");
  const [eventAgenda, setEventAgenda] = useState("");
  const [minutesofmeet, setMinutesofMeet] = useState("");
  const [eventid, setEventId] = useState("");

  const [durationButton, setDurationButton] = useState({
    select_time: true,
    all_day: false,
  });
  const [advisorCollection, setAdvisorCollection] = useState({
    appointment_advisor: true,
    phone_call_advisor: false,
    training: false,
    businessPlanning_review: true,
    unit_meeting: false,
    joint_customer_visit: false,
    servicing: false,
    inactive_agent_reactivation: false,
  });
  const [statusType, setStatusType] = useState({
    openStatus: true,
    closeStatus: false,
  });
  const [prospectCollection, setProspectCollection] = useState({
    appointment_prospect: true,
    phone_call: false,
    training_prospect: false,
    first_meeting: true,
    follow_up: false,
    document_collection: false,
  });
  const [customerCollection, setCustomerCollection] = useState({
    appointment_customer: true,
    phone_call_customer: false,
    policy_renewal: false,
  });
  const [teamMemberData, setTeamMemberData] = useState("");
  const [oppData, setOppData] = useState("");
  const [oppdisable, setOppDisable] = useState(false);
  const [startd, setStartD] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [hierarAgentList, setHierarAgentList] = useState([]);
  const [oppList, setOppList] = useState([]);
  const [customersearchList, setCustomerSearchList] = useState([]);
  const [teamMemberChip, setTeamMemberChip] = useState([]);
  const [ownerCollectn, setOwnerCollectn] = useState([]);
  const [customersearchchip, setCustomerSearchChip] = useState([]);
  const [customerlistcollectn, setCustomerListCollectn] = useState([]);
  const [oppChip, setOppChip] = useState([]);
  const [oppCollectn, setOppCollectn] = useState([]);
  const [oppsearchchip, setOppSearchChip] = useState([]);
  const [opplistcollectn, setOppListCollectn] = useState([]);
  const [checkEventWith, setCheckEventWith] = useState("New Prospect");
  const _dataStore = useSelector((state) => state?.home?.user_tree);

  const _reportManager = useSelector((state) => state?.login?.reportingManager);
  const login_user = useSelector((state) => state.login.user);

  useEffect(() => {
    try {
      // let _teamMember = _dataStore.reporting_users.filter(event => designationid == event.hierarchy_id)
      let _teamMember = [];
      _dataStore.reporting_users.map((el) => {
        let sortarray = {
          FullName: el.full_name,
          ShortId: el.employeeCode,
          firstname: el.first_name,
          lastname: el.last_name,
          employecode: el.employeeCode,
          designation: el.hierarchyName,
          _Id: el._id,
          value:
            toCapitalize(el.full_name) + " " + "(" + el.hierarchyName + ")",
        };
        _teamMember.push(sortarray);
        sortarray = {};
      });
      setHierarAgentList(_teamMember);
    } catch (err) { }
  }, []);

  useEffect(() => {
    // console.log("USER HIERARCHYY ___DATA__", _dataStore);
    let _teamMember = [];
    if (Object.keys(_dataStore).length !== 0) {
      // let _teamMember = [];
      if (checkAgent() === false) {
        _dataStore.reporting_users.map((el) => {
          let sortarray = {
            FullName: el.full_name,
            ShortId: el.employeeCode,
            firstname: el.first_name,
            lastname: el.last_name,
            employecode: el.employeeCode,
            designation: el.hierarchyName,
            _Id: el._id,
            value:
              toCapitalize(el.full_name) + " " + "(" + el.hierarchyName + ")",
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
              toCapitalize(_reporting.full_name) +
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
    }
  }, []);

  useEffect(() => {
    try {
      customerSearch();
    } catch (err) { }
  }, []);

  const customerSearch = async () => {
    let id = stoageGetter("user").id;
    let result = await axiosRequest.get(
      `user/v2/getLead/${id}?leadfilter=open&skip=0&limit=no`,
      { secure: true }
    );
    console.warn('+++++++++ GET LEAD DATA ++++++++', result)
    if (result.length > 0) {
      // console.log(result[0], 'final lead result');
      let customersearch = [];
      result[0].map((el) => {
        let sortarray = {
          _Id: el._id,
          value:
            toCapitalize(el.opportunity_name)
          // el.lastName +
          // " ( " +
          // el.lead_Id +
          // " )",
        };

        customersearch.push(sortarray);
        console.log(customersearch, 'customer search array-->>;;;;;');
        sortarray = {};
      });
      setOppList(customersearch);
      if(props.Data){
      if(props.Data.leadId != null){
        // console.log(customersearch);
        let opp = customersearch?.filter(item=>{
          console.log(item._Id, props.Data.leadId._id,'full lidt');
         return item._Id == props.Data.leadId._id
        })
        console.log(opp,'final opp list');
        setOppChip(opp)
        setOppCollectn(opp)
      }
    }
    } else {
      console.log(result, "final lead result");
    }

  };

  let toCapitalize = (strText) => {
    try {
      if (strText !== "" && strText !== null && typeof strText !== undefined) {
        var _str = strText.toLowerCase();
        var collection = _str.split(" ");
        var modifyStrigs = [];
        _str = "";
        for (var i = 0; i < collection.length; i++) {
          modifyStrigs[i] =
            collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
          _str = _str + modifyStrigs[i] + " ";
        }
        return _str;
      } else {
        return "";
      }
    } catch (err) { }
  };

  useEffect(() => {
    if (props.click == "data" || props.click == "UPDATE EVENT") {
      // console.log(moment(props.Data.timeline),'full update data--->');
      props.setIsModalVisible(true);
    }
    if (props.click == "UPDATE EVENT") {
      setUpdateCheckEvent(true);
    } //1661472000000
    if (props.Data) {
      customerSearch()
      let durationfinal = durationList.filter(item=>{
       return item.value == props.Data.durationType
      })
      console.log(durationfinal,'duration type------>');
      if(durationfinal.length != 0){
      setDurationSelect(durationfinal[0].value)
      }
     
      // console.warn(props.Data,moment(props.Data.start_date), moment(props.Data.timeline),'yes update');
      setEventId(props.Data._id);
      setStatusReasonText(props.Data.statusReason);
      if (props.Data.appointment_type == "existingapplication") {
        setCheckEventWith("New Prospect");
        setAdvisorCheck(true);
        setCustomerCheck(false);
        if (props.Data.event_type == "appointment") {
          setAdvisorCollection({
            appointment_advisor: true,
            phone_call_advisor: false,
            training: false,
          });
          setAppointmentType(props.Data.tata_appointment_type);
          if (props.Data.tata_appointment_type == "New Proposition Meeting") {
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: true,
              inactive_agent_reactivation: false,
              unit_meeting: false,
              joint_customer_visit: false,
              servicing: false,
            });
          }
          // else if (props.Data.tata_appointment_type == 'Inactive agent reactivation'){
          //   setAdvisorCollection({
          //     appointment_advisor: true,
          //     businessPlanning_review: false,
          //     inactive_agent_reactivation: true,
          //     unit_meeting: false,
          //     joint_customer_visit: false,
          //     servicing: false
          //   })
          // }
          else if (
            props.Data.tata_appointment_type == "Joint Customer Meeting"
          ) {
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: false,
              inactive_agent_reactivation: false,
              unit_meeting: false,
              joint_customer_visit: true,
              servicing: false,
            });
          }
          // else if (props.Data.tata_appointment_type == 'Unit Meeting'){
          //   setAdvisorCollection({
          //     appointment_advisor: true,
          //     businessPlanning_review: false,
          //     inactive_agent_reactivation: false,
          //     unit_meeting: true,
          //     joint_customer_visit: false,
          //     servicing: false
          //   })
          // }
          else if (props.Data.tata_appointment_type == "Servicing") {
            setAdvisorCollection({
              appointment_advisor: true,
              businessPlanning_review: false,
              inactive_agent_reactivation: false,
              unit_meeting: false,
              joint_customer_visit: false,
              servicing: true,
            });
          }
        } else if (props.Data.event_type == "phonecall") {
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: true,
            training: false,
          });
          setclientVisit("Relationship call");
        } else {
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: false,
            training: true,
          });
        }
      } else {
        setCheckEventWith("Existing Lead");
        setCustomerCheck(true);
        setAdvisorCheck(false);
        if (props.Data.event_type == "appointment") {
          setCustomerCollection({
            appointment_customer: true,
            phone_call_customer: false,
            policy_renewal: false,
          });
          setclientVisit("Client Meeting");
        } else if (props.Data.event_type == "phonecall") {
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: true,
            policy_renewal: false,
          });
          setclientVisit("Relationship call");
        } else if (props.Data.event_type == "policyrenewals") {
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: false,
            policy_renewal: true,
          });
        }
      }

      if (props.Data.durationType == "customedatetime") {
        setDurationButton({
          select_time: true,
          all_day: false,
        });
      } else {
        setDurationButton({
          select_time: false,
          all_day: true,
        });
      }
      if (props.Data.statusType == "open") {
        setEventStatus("open");
        setStatusType({
          openStatus: true,
          closeStatus: false,
        });
      } else {
        setEventStatus("close");
        setStatusType({
          openStatus: false,
          closeStatus: true,
        });
      }
      // if(props.Data.manuallycustomerAdded == true || 'true'){
      if (
        props.Data.manuallycustomerAdded == true ||
        props.Data.manuallycustomerAdded == "true"
      ) {
        // console.log(props.Data.manuallyrenewalCustomer[0].Name, 'name======>');
        setCustomerNameText(props.Data.manuallyrenewalCustomer[0].Name);
        setCustomerNameCheck(true);
        setCustLastNameCheck(true);
        setCustomerMobileNoCheck(true);
        setCustomerMobileNoText(
          props.Data.manuallyrenewalCustomer[0].MobileNumber
        );
        setManualCustomerCheck(true);
        setAddCustTagVisible(true);
        setCustomerCheck(true);
        setAddManuallyButtonCheck(true);
      }
      if (props.Data.teamMember?.length > 0) {
        // let teammemData = props.Data.teamMember.map(item=>{
        //   console.log(item, 'kkk')
        //   return item
        // })
        setOwnerCollectn(props.Data.teamMember);
        setTeamMemberChip(props.Data.teamMember);
      }
      if (props.Data.leadId != null) {
        // console.log(customersearchList,'update lead list');
        setCustomerListCollectn(props.Data.leadId);
        setCustomerSearchChip(props.Data.leadId);
      }
      setStakeholdrName(props.Data.stakeholder_name);
      setCustomerNameText(props.Data.location);
      setTimelineDateData(props.Data.timeline);
      setTimelineDateString(moment(props.Data.timeline));
      setEventAgenda(props.Data.title);
      setMinutesofMeet(props.Data.meeting_content);
      setAppointmentid(props.Data._id);
      // setStatusReasonText(props.Data.statusreason)
      setDurationStartTimeOperation(props.Data.start_time);
      setDurationEndTimeOperation(props.Data.end_time);
      setDurationEndDateOperation(props.Data.end_date);
      setDurationEndDate(moment(props.Data.end_date));
      setDurationStartDateOperation(props.Data.start_date);
      setDurationStartDate(moment(props.Data.start_date));
      setStartTimeSelect(props.Data.start_time);
      setEndTimeSelect(props.Data.end_time);
      setEventDurationType(props.Data.durationType);
      setModeSelect(props.Data.mode);
      // setStatusReasonText(props.Data.statusreason)
      // console.log(moment(1661472000000).format("YYYY-MM-DD"));
    }
  }, []);

  const [startDuration, setStartDuration] = useState();
  const [endDuration, setEndDuration] = useState();
  const [MultiSelectDate, setMultiSelectDate] = useState(false);
  const [clickedDate, setClickedDate] = useState();
  // const [isModalVisible, props.] = useState(false);
  const [eventText, setEventText] = useState("");
  const [value, setValue] = useState(moment("10:00", format));
  const [endVal, setEndVal] = useState(moment("10:00", format));
  const [addEvents, setAddEvents] = useState([
    //     // {
    //     //   id:helperUpcomingArr? helperUpcomingArr._id:null,
    //     //   start:1631750400000+helperUpcomingArr? helperUpcomingArr.start_time:null,
    //     //   end:1631750400000+37800000,
    //     // },
    //   {
    //     // id:item._id,
    //     title:"mysasd",
    //     start:1631750400000+48600000,
    //     end:1631750400000+52200000,
    //   }
    // ,
    //     // {
    //     //     id:helperUpcomingArr? helperUpcomingArr._id:null,
    //     //     title:helperUpcomingArr?  helperUpcomingArr.appointment_type:null,
    //     //     start:start_date_assign+helperUpcomingArr?helperUpcomingArr.start_time:null,
    //     //     end:end_date_assign+helperUpcomingArr?helperUpcomingArr.end_time:null,
    //     //   }
    //     {
    //     title: eventText, start: "2021-08-11T12:00:00",
    //     end: "2021-08-11T15:00:00Z"
    //   },
    //   {
    //     id: Math.random().toString(36).slice(-6),
    //     title: 'my event',
    //     description: "This is the description of the event",
    //     start: "2021-08-21T12:00:00",
    //     end: "2021-08-21T15:00:00"
    //   },
    //   {
    //     id: Math.random().toString(36).slice(-6),
    //     title: 'my event',
    //     description: "This is the description of the event",
    //     start: "2021-08-11T12:00:00",
    //     end: "2021-08-12T15:00:00"
    //   }
    //     ,{
    //       id: Math.random().toString(36).slice(-6),
    //       title: 'Timestamp',
    //       description: "This is the description of the event",
    //       start: 1630800000000+50400000,
    //       end: 1630800000000+52200000
    //     }
    //       ,  {
    //     id: Math.random().toString(36).slice(-6),
    //     title: 'test',
    //     description: "This is the description of the event",
    //     start: "2021-09-11T11:00:00",
    //     end: "2021-09-12T15:00:00"
    //   }
  ]);

  const checkTeamMemberFunc = () => {
    setCheckEventWith("New Prospect");
    setAdvisorCheck(true);
    setProspectCheck(false);
    setCustomerCheck(false);
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
    });
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: true,
      inactive_agent_reactivation: false,
      unit_meeting: false,
      joint_customer_visit: false,
      servicing: false,
    });
    setAppointmentType("New Proposition Meeting");
    setModeSelect("");
    setEventDurationType("customedatetime");
    setStartTimeSelect("");
    setEndTimeSelect("");
    setDurationStartDate("");
    setDurationEndDate("");
    setDurationStartTimeOperation();
    setDurationEndTimeOperation();
    setDurationButton({
      select_time: true,
      all_day: false,
    });
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
    });
    setTeamMemberData("");
    setOwnerCollectn([]);
    setTeamMemberChip([]);
  };
  const checkProspectFunc = () => {
    setAdvisorCheck(false);
    setProspectCheck(true);
    setCustomerCheck(false);
  };

  const checkCustomerFunc = () => {
    setCheckEventWith("Existing Lead");
    setAdvisorCheck(false);
    setProspectCheck(false);
    setCustomerCheck(true);
    setModeSelect("");
    setEventDurationType("customedatetime");
    setStartTimeSelect("");
    setEndTimeSelect("");
    setDurationStartDate("");
    setDurationEndDate("");
    setDurationStartTimeOperation();
    setDurationEndTimeOperation();
    setDurationButton({
      select_time: true,
      all_day: false,
    });
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
    });
    setTeamMemberData("");
    setOwnerCollectn([]);
    setTeamMemberChip([]);
  };
  const DurationSelectTimeFunc = () => {
    setEventDurationType("customedatetime");
    setStartTimeSelect("");
    setEndTimeSelect("");
    setDurationStartDate("");
    setDurationEndDate("");
    setDurationStartDateOperation("");
    setDurationEndDateOperation("");
    setDurationStartTimeOperation();
    setDurationEndTimeOperation();
    setDurationButton({
      select_time: true,
      all_day: false,
    });
  };
  const DurationAllDayFunc = () => {
    setEventDurationType("allday");
    setDurationStartDate("");
    setDurationEndDate("");
    setDurationStartTimeOperation(32400000);
    setDurationEndTimeOperation(61200000);
    setDurationButton({
      select_time: false,
      all_day: true,
    });
  };
  let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let regMobile = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  // let regMobile=/^[6-9]\d{9}/;
  const [durationStartDate, setDurationStartDate] = useState("");
  const [durationEndDate, setDurationEndDate] = useState("");
  const [durationStartTime, setDurationStartTime] = useState("");
  const [durationEndTime, setDurationEndTime] = useState("");
  const [durationStartBDateCheck, setDurationStartDateCheck] = useState(true);
  const [durationEndDateCheck, setDurationEndDateCheck] = useState(true);
  const [durationStartTimeCheck, setDurationStartTimeCheck] = useState(true);
  const [durationEndTimeCheck, setDurationEndTimeCheck] = useState(true);
  const [durationStartDateOperation, setDurationStartDateOperation] =
    useState();
  const [durationEndDateOperation, setDurationEndDateOperation] = useState("");
  const [durationStartTimeOperation, setDurationStartTimeOperation] =
    useState();
  const [durationEndTimeOperation, setDurationEndTimeOperation] = useState();
  const [durationStartDateHelper, setDurationStartDateHelper] = useState();
  const [durationStartTimeDiffCheck, setDurationStartTimeDiffCheck] =
    useState(true);
  const [durationEndTimeDiffCheck, setDurationEndTimeDiffCheck] =
    useState(true);
  const [durationEndTimeSameCheck, setDurationEndTimeSameCheck] =
    useState(true);
  const [durationStartDateDiffCheck, setDurationStartDateDiffCheck] =
    useState(true);
  const [durationEndDateDiffCheck, setDurationEndDateDiffCheck] =
    useState(true);
  const [fetchUpcomingArr, setFetchUpcomingArr] = useState([]);
  const [helperUpcomingArr, setHelperUpcomingArr] = useState();
  const [updateStartTime, setUpdateStartTime] = useState();
  const [updateEndTime, setUpdateEndTime] = useState();
  const [teammemdisable, setTeamemDisable] = useState(false);

  const [fetchStartDate, setFetchStartDate] = useState();
  const [fetchEndDate, setFetchEndDate] = useState();
  const [fetchStartTime, setFetchStartTime] = useState();
  const [fetchEndTime, setFetchEndTime] = useState();
  const [fetchedEventId, setFetchedEventId] = useState();
  const [fetchEventCheck, setFetchEventCheck] = useState(false);
  const [timeList, setTimeList] = useState([
    {
      dispValue: "8:00 AM",
      value: "28800000",
    },
    {
      dispValue: "8:30 AM",
      value: "30600000",
    },
    {
      dispValue: "9:00 AM",
      value: "32400000",
    },
    {
      dispValue: "9:30 AM",
      value: "34200000",
    },
    {
      dispValue: "10:00 AM",
      value: "36000000",
    },
    {
      dispValue: "10:30 AM",
      value: "37800000",
    },
    {
      dispValue: "11:00 AM",
      value: "39600000",
    },
    {
      dispValue: "11:30 AM",
      value: "41400000",
    },
    {
      dispValue: "12:00 PM",
      value: "43200000",
    },
    {
      dispValue: "12:30 PM",
      value: "45000000",
    },
    {
      dispValue: "1:00 PM",
      value: "46800000",
    },
    {
      dispValue: "1:30 PM",
      value: "48600000",
    },
    {
      dispValue: "2:00 PM",
      value: "50400000",
    },
    {
      dispValue: "2:30 PM",
      value: "52200000",
    },
    {
      dispValue: "3:00 PM",
      value: "54000000",
    },
    {
      dispValue: "3:30 PM",
      value: "55800000",
    },
    {
      dispValue: "4:00 PM",
      value: "57600000",
    },
    {
      dispValue: "4:30 PM",
      value: "59400000",
    },
    {
      dispValue: "5:00 PM",
      value: "61200000",
    },
    {
      dispValue: "5:30 PM",
      value: "63000000",
    },
    {
      dispValue: "6:00 PM",
      value: "64800000",
    },
    {
      dispValue: "6:30 PM",
      value: "66600000",
    },
    {
      dispValue: "7:00 PM",
      value: "68400000",
    },
    {
      dispValue: "7:30 PM",
      value: "70200000",
    },
    {
      dispValue: "8:00 PM",
      value: "72000000",
    },
    {
      dispValue: "8:30 PM",
      value: "73800000",
    },
    {
      dispValue: "9:00 PM",
      value: "75600000",
    },
    {
      dispValue: "9:30 PM",
      value: "77400000",
    },
  ]);

  const [modeList, setModeList] = useState([
    {
      dispValue: "Face to face visit",
      value: "Face to face visit",
    },
    {
      dispValue: "Telephonic",
      value: "Telephonic",
    },
    {
      dispValue: "Branch visit",
      value: "Branch visit",
    },
    {
      dispValue: "Lead visit",
      value: "Lead visit",
    },
    {
      dispValue: "Joint call",
      value: "Joint call",
    },
  ]);
  const [durationList, setDurationList] = useState([
    {
      dispValue: "30 min",
      value: "30 min",
    },
    {
      dispValue: "1 hr",
      value: "1 hr",
    },
    {
      dispValue: "2 hr",
      value: "2 hr",
    },
    {
      dispValue: "3 hr",
      value: "3 hr",
    },
    {
      dispValue: "4 hr",
      value: "4 hr",
    },
    {
      dispValue: "5 hr",
      value: "5 hr",
    },
    {
      dispValue: "6 hr",
      value: "6 hr",
    },
  ]);
  const [modeSelect, setModeSelect] = useState("");
  const [startdatevalue, setStartDateValue] = useState("");
  const [durationSelect, setDurationSelect] = useState("");
  const [startTimeSelect, setStartTimeSelect] = useState("");
  const [endTimeSelect, setEndTimeSelect] = useState("");
  const [durationDateAlert, setDurationDateAlert] = useState(false);
  const [durationTimeAlert, setDurationTimeAlert] = useState(false);
  const [durationendTimeAlert, setDurationEndTimeAlert] = useState(false);
  const [durationenddateAlert, setDurationEndDateAlert] = useState(false);
  const [durationModeAlert, setDurationModeAlert] = useState(false);
  const [cardHeight, setCardHeight] = useState(true);
  const [prospectFirstNameText, setProspectFirstNameText] = useState("");
  const [prospectLastNameText, setProspectLastNameText] = useState("");
  const [prospectEmailAddressText, setProspectEmailAddressText] = useState("");
  const [prospectMobileNoText, setProspectMobileNoText] = useState("");
  const [prospectFirstNameCheck, setProspectFirstNameCheck] = useState(true);
  const [prospectLastNameCheck, setProspectLastNameCheck] = useState(true);
  const [prospectEmailAddressCheck, setProspectEmailAddressCheck] =
    useState(true);
  const [prospectMobileNoCheck, setProspectMobileNoCheck] = useState(true);
  const [prospectEmailRegCheck, setProspectEmailRegCheck] = useState(true);
  const [prospectMobileRegCheck, setProspectMobileRegCheck] = useState(true);
  const [addManuallyButtonCheck, setAddManuallyButtonCheck] = useState(false);
  const [customerNameText, setCustomerNameText] = useState("");
  const [customerLastNameText, setCustomerLastNameText] = useState("");
  const [customerMobileNoText, setCustomerMobileNoText] = useState("");
  const [customerNameCheck, setCustomerNameCheck] = useState(true);
  const [custLastNameCheck, setCustLastNameCheck] = useState(true);
  const [customerMobileNoCheck, setCustomerMobileNoCheck] = useState(true);
  const [customermblvalid, setCustomerMblValid] = useState(true);
  const [custLastNamevalid, setCustLastNamevalid] = useState(false);
  const [custFirstNamevalid, setCustFirstNamevalid] = useState(false);

  const [customerArr, setCustomerArr] = useState([]);
  const [customerHelperArr, setCustomerHelperArr] = useState([]);
  const [customerTagVisible, setCustomerTagVisible] = useState(false);
  const [customerOnClickVal, setCustomerOnClickVal] = useState();
  const [searchCustomerArr, setSearchCustomerArr] = useState([]);
  const [searchCustomerObject, setSearchCustomerObject] = useState();
  const [searchCustomerText, setSearchCustomerText] = useState("");
  const [customerOnClickCheck, setCustomerOnClickCheck] = useState(false);
  const [searchAdvisorText, setSearchAdvisorText] = useState("");
  const [advisorOnClickCheck, setAdvisorOnClickCheck] = useState(false);
  const [advisorArr, setAdvisorArr] = useState([]);
  const [advisorHelperArr, setAdvisorHelperArr] = useState([]);
  const [advisorTagVisible, setAdvisorTagVisible] = useState(false);
  const [advisorOnClickVal, setAdvisorOnClickVal] = useState();
  const [searchAdvisorArr, setSearchAdvisorArr] = useState([]);
  const [searchAdvisorObject, setSearchAdvisorObject] = useState();
  const [searchProspectArr, setSearchProspectArr] = useState([]);
  const [searchProspectObject, setSearchProspectObject] = useState();
  const [prospectArr, setProspectArr] = useState([]);
  const [prospectHelperArr, setProspectHelperArr] = useState([]);
  const [prospectTagVisible, setProspectTagVisible] = useState(false);
  const [prospectOnClickVal, setProspectOnClickVal] = useState();
  const [searchProspectText, setSearchProspectText] = useState("");
  const [prospectOnClickCheck, setProspectOnClickCheck] = useState(false);
  const [bookEventCheck, setBookEventCheck] = useState(true);
  const [updateEventCheck, setUpdateCheckEvent] = useState(false);
  const [updateEventId, setUpdateEventId] = useState();
  const [eventLoadCheck, setEventLoadCheck] = useState(false);
  const [eventBookCheck, setEventBookCheck] = useState("");
  const [updateEventType, setUpdateEventType] = useState("");
  const [appointmentTypeFetched, setAppointmentTypeFetched] = useState();
  const [eventTypeFetched, setEventTypeFetched] = useState();
  const [eventStatus, setEventStatus] = useState("");
  const [statusReasonText, setStatusReasonText] = useState("");
  const [manualCustomerCheck, setManualCustomerCheck] = useState(false);
  const [addCustTagVisible, setAddCustTagVisible] = useState(true);
  const [eventDurationType, setEventDurationType] = useState("customedatetime");
  const [searchTeamArr, setSearchTeamArr] = useState([]);
  const [searchTeamObject, setSearchTeamObject] = useState();
  const [teamArr, setTeamArr] = useState([]);
  const [teamHelperArr, setTeamHelperArr] = useState([]);
  const [teamTagVisible, setTeamTagVisible] = useState(false);
  const [teamOnClickVal, setTeamOnClickVal] = useState();
  const [searchTeamText, setSearchTeamText] = useState("");
  const [teamOnClickCheck, setTeamOnClickCheck] = useState(false);
  const minimumDate = moment().format("YYYY-MM-DD");

  const [fetchEventArray, setFetchEventArray] = useState([]);
  const [fetchEventObject, setFetchEventObject] = useState();
  const [editStartTime, setEditStartTime] = useState("");
  const [editStartDisp, setEditStartDisp] = useState("");
  const [editEndDisp, setEditEndDisp] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

  // console.log(helperUpcomingArr)

  const AdvisorClickedTag = (id, value) => {
    setAdvisorOnClickVal(value);
    alert(value);

    searchAdvisorArr.map((item) => {
      if (item._id == id) {
        setSearchAdvisorObject(item);
      }
    });

    setAdvisorTagVisible(true);
    setAdvisorOnClickCheck(false);
  };
  const AdvisorTagCloseFunc = () => {
    setAdvisorTagVisible(false);
  };
  const searchAdvisorTextFunc = (e) => {
    setSearchAdvisorText(e.target.value);
    setAdvisorOnClickCheck(false);
    if (searchAdvisorText == "") {
      setAdvisorArr(advisorHelperArr);
    }
  };

  const onChangeTeam = (text, data) => {
    console.log(text, "text------>");
    console.log(data, "data------>");
    setTeamMemberData(text);
    // console.log('onSelect___text', text);
    // console.log('onSelect___data', data);
    // setOwnerCollectn([...ownerCollectn,data])
  };

  const onSelectTeam = (value) => {
    // console.log('ON SELECTION ______________', value);
    // console.log('ONowner colle ______________', hierarAgentList);
    let valuesplit = value.split(" ");
    console.log(valuesplit[0]);
    let _data = [...new Set([...teamMemberChip, value])];
    let filteredValue = hierarAgentList.filter((item) => {
      return item.value == value;
    });
    // console.log(filteredValue, 'value splitted--->');
    let all = [...ownerCollectn, filteredValue[0]];
    console.log(all, "after adding ");
    setOwnerCollectn([...ownerCollectn, ...filteredValue]);
    setTeamMemberData("");
    setTeamMemberChip(_data);
  };

  const removeTeamMember = (data, ind) => {
    // console.log('removeTeamMember', data);
    // console.log('ownerCollectn=====>>', ownerCollectn);
    let _arrayOwner = ownerCollectn.filter(
      (item, index) => item.value !== data
    );
    console.log(_arrayOwner, "after removing");
    setOwnerCollectn(_arrayOwner);
    let _array = teamMemberChip.filter((item, index) => index !== ind);
    setTeamMemberChip(_array);
  };

  const onChangeOpp = (text, data) => {
    console.log(text, "text------>");
    console.log(data, "data------>");
    setOppData(text);
    // console.log('onSelect___text', text);
    // console.log('onSelect___data', data);
    // setOwnerCollectn([...ownerCollectn,data])
  };

  const onSelectOpp = (value, data) => {
    console.log('ON SELECTION ______________', data);
    console.log('ONowner colle ______________', oppList);
    let valuesplit = value.split(" ");
    console.log(valuesplit[0]);
    let _data = [...new Set([...oppChip, value])];
    let filteredValue = oppList.filter((item) => {
      return item._Id == data._Id;
    });
    // console.log(filteredValue, 'value splitted--->');
    let all = [...oppCollectn, filteredValue[0]];
    console.log(all, "after adding ");
    setOppCollectn([...oppCollectn, ...filteredValue]);
    setOppData("");
    setOppChip(_data);
    setOppDisable(true)
  };

  const removeOpp = (data, ind) => {
    // console.log('removeTeamMember', data);
    // console.log('ownerCollectn=====>>', ownerCollectn);
    let _arrayOwner = oppCollectn.filter(
      (item, index) => item.value !== data
    );
    console.log(_arrayOwner, "after removing");
    setOppCollectn(_arrayOwner);
    let _array = oppChip.filter((item, index) => index !== ind);
    setOppChip(_array);
    setOppDisable(false)
  };


  const CustomerClickedTag = (id, value) => {
    setCustomerOnClickVal(value);
    searchCustomerArr.map((item) => {
      if (item._id == id) {
        setSearchCustomerObject(item);
      }
    });
    setCustomerTagVisible(true);
    setCustomerOnClickVal(false);
  };
  const CustomerTagCloseFunc = () => {
    setCustomerTagVisible(false);
  };
  const searchCustomerTextFunc = (e) => {
    setSearchCustomerText(e.target.value);
    setCustomerOnClickCheck(false);
    if (searchCustomerText == "") {
      setCustomerArr(customerHelperArr);
    }
  };

  const AddCustomerTag = (value) => { };
  const AddCustomerCloseFunc = () => { };

  const ProspectClickedTag = (id, value) => {
    setProspectOnClickVal(value);

    searchProspectArr.map((item) => {
      if (item._id == id) {
        setSearchProspectObject(item);
      }
    });
    setProspectTagVisible(true);
    setProspectOnClickCheck(false);
  };
  const ProspectTagCloseFunc = () => {
    setProspectTagVisible(false);
  };

  const searchProspectTextFunc = (e) => {
    setSearchProspectText(e.target.value);
    setProspectOnClickCheck(false);
    if (searchProspectText == "") {
      setProspectArr(prospectHelperArr);
    }
  };

  const AddManuallyFunc = () => {
    setAddManuallyButtonCheck(true);
  };

  const onChangeTimelineDate = (date, dateString) => {
    setTimelineDateData(date._d);
    setTimelineDateString(date);
    console.log(date._d, "date----->");
    console.log(dateString, "date string------->");
  };
  // const[customerLastNameText,setCustomerLastNameText]=useState("");
  const CustomerNameFunc = (e) => {
    setCustomerNameText(e.target.value);
    e.target.value.length > 0
      ? setCustomerNameCheck(true)
      : setCustomerNameCheck(false);
  };
  const CustLastNameFunc = (event) => {
    setCustomerLastNameText(event.target.value);
    event.target.value.length > 0
      ? setCustLastNameCheck(true)
      : setCustLastNameCheck(false);
  };

  const prospectFirstNameValid = (event) => {
    let letters = /^[A-Za-z]+$/;
    event.target.value.match(letters)
      ? setCustFirstNamevalid(false)
      : setCustFirstNamevalid(true);
    if (event.target.value === "") setCustFirstNamevalid(false);
  };

  const prospectLastNameValid = (event) => {
    let letters = /^[A-Za-z]+$/;
    event.target.value.match(letters)
      ? setCustLastNamevalid(false)
      : setCustLastNamevalid(true);
    if (event.target.value === "") setCustLastNamevalid(false);
  };

  const onChangeAgenda = (e) => {
    setEventAgenda(e.target.value);
  };

  const onChangeMom = (e) => {
    setMinutesofMeet(e.target.value);
  };

  const CustomerMobileNoFunc = (e) => {
    // setCustomerMobileNoCheck(true)
    // if (customerNameText == "" ) {
    //   setCustomerNameCheck(false)
    //   // alert("this works")
    // }

    if (e.target.value.length > 0) {
      setCustomerMobileNoCheck(true);
    }
    if (e.target.value.length < 11) {
      setCustomerMblValid(false);
      setCustomerMobileNoText(e.target.value);
    }

    if (e.target.value > 0 && e.target.value.length < 10) {
      setCustomerMblValid(false);
    } else {
      setCustomerMblValid(true);
    }
  };
  const ManualCustomerSubmitFunc = (e) => {
    if (
      customerMobileNoText == "" &&
      customerNameText == "" &&
      customerLastNameText == ""
    ) {
      setCustomerMobileNoCheck(false);
      setCustomerNameCheck(false);
      setCustLastNameCheck(false);
    } else if (customerMobileNoText == "") {
      setCustomerMobileNoCheck(false);
    } else if (customerNameText == "") {
      setCustomerNameCheck(false);
    } else if (customerLastNameText == "") {
      setCustLastNameCheck(false);
    } else {
      setManualCustomerCheck(true);
      setCustomerMobileNoCheck(true);
      setCustomerNameCheck(true);
      setCustLastNameCheck(true);
    }
  };
  const AddCustomerTagVisibleFunc = () => {
    setAddCustTagVisible(false);
    setManualCustomerCheck(false);
    setCustomerNameText("");
    setCustomerLastNameText("");
    setCustomerMobileNoText("");
  };

  const ProspectFirstNameFunc = (e) => {
    setProspectFirstNameText(e.target.value);
    setProspectFirstNameCheck(true);
    if (prospectLastNameText == "") {
      setProspectLastNameCheck(false);
      // alert("this works")
    }
    if (prospectEmailAddressText == "") {
      setProspectEmailAddressCheck(false);
    }
    if (prospectMobileNoText == "") {
      setProspectMobileNoCheck(false);
    }
    if (regEmail.test(prospectEmailAddressText) == false) {
      setProspectEmailRegCheck(false);
    }

    if (regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false);
    }
  };

  const ProspectLastNameFunc = (e) => {
    setProspectLastNameText(e.target.value);
    setProspectLastNameCheck(true);
    if (prospectFirstNameText == "") {
      setProspectFirstNameCheck(false);
    }
    if (prospectEmailAddressText == "") {
      setProspectEmailAddressCheck(false);
    }
    if (prospectMobileNoText == "") {
      setProspectMobileNoCheck(false);
    }

    if (regEmail.test(prospectEmailAddressText) == false) {
      setProspectEmailRegCheck(false);
    }

    if (regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false);
    }
  };
  const ProspectEmailAddressFunc = (e) => {
    // if (reg.test(e.target.value) == false)
    // {
    //     alert('Invalid Email Address');
    //     // return false;
    // }
    setProspectEmailAddressText(e.target.value);
    setProspectEmailAddressCheck(true);
    if (prospectFirstNameText == "") {
      setProspectFirstNameCheck(false);
    }
    if (prospectLastNameText == "") {
      setProspectLastNameText(false);
    }
    if (prospectMobileNoText == "") {
      setProspectMobileNoCheck(false);
    }
    if (regEmail.test(e.target.value) == true) {
      setProspectEmailRegCheck(true);
    }
    if (regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false);
    }
  };
  const ProspectMobileNoFunc = (e) => {
    setProspectMobileNoText(e.target.value);
    setProspectMobileNoCheck(true);
    if (prospectFirstNameText == "") {
      setProspectFirstNameCheck(false);
    }
    if (prospectLastNameText == "") {
      setProspectLastNameText(false);
    }
    if (prospectEmailAddressText == "") {
      setProspectEmailAddressCheck(false);
    }
    if (regMobile.test(e.target.value) == true) {
      setProspectMobileRegCheck(true);
    }
    if (regEmail.test(prospectEmailAddressText) == false) {
      setProspectEmailRegCheck(false);
    }
  };

  const TeamTagCloseFunc = () => {
    setTeamTagVisible(false);
  };
  const StartDateFunc = (date, dateString) => {
    console.log(
      moment(new Date()).format("YYYY-MM-DD") ==
      moment(date).format("YYYY-MM-DD")
    );
    console.log(moment(date).format("YYYY-MM-DD"));
    setDurationStartDate(moment(date));
    setDurationEndDate(moment(date));
    setDurationEndDateDiffCheck(true);
    let ms_date = new Date(date).setUTCHours(0, 0, 0, 0);

    console.log(ms_date, "ms date---->--->");

    setDurationStartDateOperation(ms_date);
    setDurationEndDateOperation(ms_date);
    console.log("This is Start Date" + ms_date);
    // if(durationEndDateOperation<ms_date){
    //   setDurationStartDateDiffCheck(false)
    //   console.log("Start Date should we after end date")
    //   return false
    // }
    // setDurationStartDateOperation(dateString,"YYYY-MM-DD")
    // setDurationStartDateCheck(true)
    // alert(moment(date).format("X"))
    // console.log('Selected Time: ', date);
    // console.log('Formatted Selected Time: ', date);
    // console.log(timeList.dispValue)
    // // alert("This is st"+date,"YYYY-MM-DD")
    // if (durationEndDate == "") {

    //   setDurationEndDate(date)
    //   setDurationEndDateOperation(dateString,"YYYY-MM-DD")
    //   setDurationEndDateCheck(true)

    // }
    setDurationDateAlert(false);
  };
  const allDayStartDate = (date, dateString) => {
    // console.log(date)
    // console.log(dateString)
    setDurationStartDate(moment(date));
    let ms_date = new Date(date).setUTCHours(0, 0, 0, 0);

    setDurationStartDateOperation(ms_date);
    // console.log("This is Start Date"+ms_date)
    // if(durationEndDateOperation<ms_date){
    //   setDurationStartDateDiffCheck(false)
    //   console.log("Start Date should we after end date")
    //   return false
    // }
    setDurationDateAlert(false);
  };

  const EndDateFunc = (e, date, dateString) => {
    setDurationEndDate(moment(date));
    let ms_date = new Date(date).setUTCHours(0, 0, 0, 0);
    // console.log()
    // console.log(ms_date, durationStartDateOperation)
    if (ms_date < durationStartDateOperation) {
      setDurationEndDateDiffCheck(false);
      // console.log("End Date should be after start date")
      return false;
    } else {
      setDurationEndDateDiffCheck(true);
    }
    setDurationEndDateOperation(ms_date);

    if (
      endTimeSelect < startTimeSelect &&
      startTimeSelect != "" &&
      ms_date <= durationStartDateOperation
    ) {
      setDurationEndTimeDiffCheck(false);
      // console.log("TIme should be more than start time")
    } else {
      setDurationEndTimeDiffCheck(true);
    }

    if (
      endTimeSelect < startTimeSelect &&
      ms_date <= durationStartDateOperation
    ) {
      setDurationStartTimeDiffCheck(false);
    } else {
      setDurationStartTimeDiffCheck(true);
    }

    // console.log("This is end Date"+ms_date)

    //     setDurationEndDate(moment(date).format("YYYY-MM-DD"))
    // console.log(moment(date).format("x"))
    //     setDurationEndDateCheck(true)
    //     setDurationEndDateOperation(dateString,"YYYY-MM-DD")
    // // alert(moment(durationEndDate,"YYYY-MM-DD"))
    //     console.log('Selected Time: ', date);
    //     console.log('Formatted Selected Time: ', date);
    //     if (durationStartDate == "") {

    //       setDurationStartDate(moment(date).format("X"))
    //       setDurationStartDateOperation(dateString,"YYYY-MM-DD")
    //       setDurationStartDateCheck(true)

    //     }

    setDurationDateAlert(false);
  };

  const ModeChangeFunc = (e) => {
    setModeSelect(e.target.value);
  };
  const DurationChangeFunc = (e) => {
    setDurationSelect(e.target.value);
    if (e.target.value == "30 min") {
      let parseTime = durationStartTimeOperation;
      let timeDiff = startTimeSelect;
      setDurationEndTimeCheck(true);
      setEndTimeSelect(+timeDiff + +"1800000");
      setEndTimeSelect(+timeDiff + +"1800000");

      let parseTimeCondition = parseInt();
      setDurationEndTimeCheck(true);
      let endparseTime = parseInt(+timeDiff + +"1800000");
      setDurationEndTimeOperation(endparseTime);
    } else if (e.target.value == "1 hr") {
      let parseTime = durationStartTimeOperation;
      let timeDiff = startTimeSelect;
      setDurationEndTimeCheck(true);
      setEndTimeSelect(+timeDiff + +"3600000");
      setEndTimeSelect(+timeDiff + +"3600000");

      let parseTimeCondition = parseInt();
      setDurationEndTimeCheck(true);
      let endparseTime = parseInt(+timeDiff + +"3600000");
      setDurationEndTimeOperation(endparseTime);
    } else if (e.target.value == "2 hr") {
      let parseTime = durationStartTimeOperation;
      let timeDiff = startTimeSelect;
      setDurationEndTimeCheck(true);
      setEndTimeSelect(+timeDiff + +"7200000");
      setEndTimeSelect(+timeDiff + +"7200000");

      let parseTimeCondition = parseInt();
      setDurationEndTimeCheck(true);
      let endparseTime = parseInt(+timeDiff + +"7200000");
      setDurationEndTimeOperation(endparseTime);
    } else if (e.target.value == "3 hr") {
      let parseTime = durationStartTimeOperation;
      let timeDiff = startTimeSelect;
      setDurationEndTimeCheck(true);
      setEndTimeSelect(+timeDiff + +"10800000");
      setEndTimeSelect(+timeDiff + +"10800000");

      let parseTimeCondition = parseInt();
      setDurationEndTimeCheck(true);
      let endparseTime = parseInt(+timeDiff + +"10800000");
      setDurationEndTimeOperation(endparseTime);
    } else if (e.target.value == "4 hr") {
      let parseTime = durationStartTimeOperation;
      let timeDiff = startTimeSelect;
      setDurationEndTimeCheck(true);
      setEndTimeSelect(+timeDiff + +"14400000");
      setEndTimeSelect(+timeDiff + +"14400000");

      let parseTimeCondition = parseInt();
      setDurationEndTimeCheck(true);
      let endparseTime = parseInt(+timeDiff + +"14400000");
      setDurationEndTimeOperation(endparseTime);
    } else if (e.target.value == "5 hr") {
      let parseTime = durationStartTimeOperation;
      let timeDiff = startTimeSelect;
      setDurationEndTimeCheck(true);
      setEndTimeSelect(+timeDiff + +"18000000");
      setEndTimeSelect(+timeDiff + +"18000000");

      let parseTimeCondition = parseInt();
      setDurationEndTimeCheck(true);
      let endparseTime = parseInt(+timeDiff + +"18000000");
      setDurationEndTimeOperation(endparseTime);
    } else if (e.target.value == "6 hr") {
      let parseTime = durationStartTimeOperation;
      let timeDiff = startTimeSelect;
      setDurationEndTimeCheck(true);
      setEndTimeSelect(+timeDiff + +"216000000");
      setEndTimeSelect(+timeDiff + +"216000000");

      let parseTimeCondition = parseInt();
      setDurationEndTimeCheck(true);
      let endparseTime = parseInt(+timeDiff + +"216000000");
      setDurationEndTimeOperation(endparseTime);
    }
  };

  const StartTimeChangeFunc = (e) => {
    // var currentTime = (new Date().getHours() + ':' + ("0" + (new Date().getMinutes())).slice(-2))
    //             console.log('current time--->', currentTime)
    //             var currentDay = (new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2))
    //             console.log('current day---->', typeof(durationStartDateOperation + parseInt(e.target.value)))
    //             var date = new Date((durationStartDateOperation + parseInt(e.target.value) ));
    // Hours part from the timestamp
    // var finalDate = date.toUTCString()
    // var hours = finalDate.getHours().getHours();
    // // Minutes part from the timestamp
    // var minutes = "0" + finalDate.getHours().getMinutes();
    // // Seconds part from the timestamp
    // var seconds = "0" + finalDate.getHours().getSeconds();

    // // Will display time in 10:30:23 format
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log(e.target.value, 'start time--select-->');
    setStartTimeSelect(e.target.value);

    setDurationStartTimeCheck(true);
    // console.log("This is the start Time"+e.target.value)
    if (e.target.value == "") {
      setDurationStartTimeOperation("");
      setDurationEndTimeOperation("");
      setEndTimeSelect(e.target.value);
    } else {
      if (e.target.value == "77400000") {
        let parseTime = parseInt(e.target.value);
        setDurationStartTimeOperation(parseTime);
        let timeDiff = e.target.value;
        setDurationEndTimeCheck(true);
        setEndTimeSelect(+timeDiff);
        let parseTimeCondition = parseInt();
        setDurationEndTimeCheck(true);
        let endparseTime = parseInt(+timeDiff);
        setDurationEndTimeOperation(endparseTime);
      } else if (e.target.value == "75600000") {
        let parseTime = parseInt(e.target.value);
        setDurationStartTimeOperation(parseTime);
        let timeDiff = e.target.value;
        setDurationEndTimeCheck(true);
        setEndTimeSelect(+timeDiff + +"1800000");
        let parseTimeCondition = parseInt();
        setDurationEndTimeCheck(true);
        let endparseTime = parseInt(+timeDiff + +"1800000");
        setDurationEndTimeOperation(endparseTime);
      } else {
        let parseTime = parseInt(e.target.value);
        setDurationStartTimeOperation(parseTime);
        let timeDiff = e.target.value;
        setDurationEndTimeCheck(true);
        setEndTimeSelect(+timeDiff + +"3600000");

        setEndTimeSelect(+timeDiff + +"3600000");

        let parseTimeCondition = parseInt();
        setDurationEndTimeCheck(true);
        let endparseTime = parseInt(+timeDiff + +"3600000");
        setDurationEndTimeOperation(endparseTime);
      }
    }
  };
  const EndTimeChangeFunc = (e) => {
    // console.log(e.target.value, 'start time--select-->');
    setEndTimeSelect(e.target.value);
    let timeDiff = e.target.value;
    if (e.target.value == "") {
      setDurationEndTimeDiffCheck(false);
      setDurationEndTimeOperation("");
    } else {
      setDurationEndTimeDiffCheck(true);
      setDurationEndTimeCheck(true);
      let parseTime = parseInt(e.target.value);
      setDurationEndTimeOperation(parseTime);
      console.log(parseTime);

      if (e.target.value == startTimeSelect && startTimeSelect != "") {
        setDurationEndTimeSameCheck(false);
        // console.log("TIme should not be same as start time")
      } else if (
        e.target.value < startTimeSelect &&
        durationEndDateOperation <= durationStartDateOperation
      ) {
        setDurationStartTimeDiffCheck(false);
      } else {
        setDurationStartTimeDiffCheck(true);
        setDurationEndTimeSameCheck(true);
      }
      if (
        e.target.value < startTimeSelect &&
        startTimeSelect != "" &&
        durationEndDateOperation <= durationStartDateOperation
      ) {
        setDurationEndTimeDiffCheck(false);
        // console.log("TIme should be more than start time")
      } else {
        setDurationEndTimeDiffCheck(true);
      }
    }
    if (startTimeSelect == "") {
      setStartTimeSelect(+timeDiff - +"36000000");
      let parseTime = parseInt(+timeDiff - +"36000000");

      setDurationStartTimeOperation(parseTime);
      setDurationStartTimeCheck(true);
    }
  };
  const StartTimeFunc = (time, timeString) => {
    setDurationStartTime(time);
    setDurationStartTimeOperation(timeString);
    let d = new Date();
    // alert(d)
    // console.log(d.getMonth())

    console.log("Selected Time: ", time);
    console.log("Formatted Selected Time: ", time);
    if (time > durationEndTime) {
      setDurationEndTime(moment(time).add(1, "hours"));
      // setDurationEndTimeOperation(timeString,"HH:mm:ss")

      // setDurationEndTimeOperation(moment(time).add(1, 'hours').format("H:m:ss z"))
    }
    if (durationEndTime == "") {
      setDurationEndTime(moment(time).add(1, "hours"));
      // setDurationEndTimeOperation(moment(timeString).format("HH:mm:ss.SSSZZ"))
      // alert(timeString.split(""))
      setDurationEndTimeOperation(
        moment(time).add(1, "hours").format("HH:mm:ss z")
      );
    }
    setDurationTimeAlert(false);
  };

  const EndTimeFunc = (time, timeString) => {
    let abc = new Date(time);
    let hours = ("0" + abc.getHours()).slice(-2);
    let minutes = ("0" + abc.getMinutes()).slice(-2);
    let seconds = ("0" + abc.getSeconds()).slice(-2);
    // alert(hours+":"+minutes+":"+seconds)
    let compTime = hours + minutes + seconds;
    // alert(abc.getTime())
    setDurationEndTime(time);

    setDurationEndTimeOperation(moment(time).format("HH:mm:ss"));
    // console.log('Selected Time: ', time);
    // console.log('Formatted Selected Time: ', time);

    if (time < durationStartTime) {
      setDurationStartTime(moment(time).subtract(1, "hours"));

      setDurationStartTimeOperation(moment(timeString).format("HH:mm:ss z"));
    }
    if (durationStartTime == "") {
      setDurationStartTime(moment(time).subtract(1, "hours"));
      setDurationEndTimeCheck(true);
      setDurationStartTimeOperation(
        moment(time).subtract(1, "hours").format("HH:mm:ss z")
      );

      // setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("H:m:ss z"))
      // alert(moment(time).subtract(1, 'hours').format("HH:mm:ss z"))
    }
    setDurationStartTimeCheck(true);
    setDurationTimeAlert(false);
  };

  const onChangeCustomerSearch = (text, data) => {
    setCustomerData(text);
  };

  const onSelectCustomer = (value) => {
    let valuesplit = value.split(" ");
    // console.log(valuesplit[0]);
    let filteredValue = customersearchList.filter((item) => {
      return item.value == value;
    });
    // console.log(filteredValue, 'value splitted--->');
    setCustomerListCollectn([...customerlistcollectn, ...filteredValue]);
    setCustomerData("");
    let _data = [...new Set([...customersearchchip, value])];
    setCustomerSearchChip(_data);
    setTeamemDisable(true);
  };

  const removeCustomer = (data, ind) => {
    // console.log('ownerCollectn=====>>', ownerCollectn);
    let _arrayOwner = customerlistcollectn.filter(
      (item, index) => item.value !== data
    );
    setCustomerListCollectn(_arrayOwner);
    let _array = customersearchchip.filter((item, index) => index !== ind);
    setCustomerSearchChip(_array);
    setTeamemDisable(false);
  };

  const bookAppointmentAPI = () => {
    // prospectCheck === true ? BookAppointmentFunc() :  bookAppointWithLead()
    BookAppointmentFunc();
    // console.log(oppCollectn,'opp collection--->');
  };

  const bookAppointWithLead = async () => {
    console.log("book app with lead");
    let teammemberclone = [];
    if (ownerCollectn.length > 0) {
      ownerCollectn.map((x) => {
        teammemberclone.push(x._Id);
      });
    }

    let _ownerCollectn = _.uniqBy(ownerCollectn, "ShortId");
    teammemberclone = [...new Set(teammemberclone)];
    // let formData = {
    //   user_id: stoageGetter('user').id,
    //   leadStatus: "contact",
    //   appointmentdisPosition: "",
    //   start_date: durationStartDateOperation,
    //   start_time: durationStartTimeOperation,
    //   remarksfromUser: "",
    //   remarksfromSource: "",
    //   // teamMembers:"[]",
    //   leadsubDisposition: "",
    //   leadDisposition: "appointment",
    //   //    leadSource:"5d403fd697631237d8c7705e",
    //   partnerID: "",
    //   failedReason: "",
    //   appointment_status: "",
    //   appointmentsubdisPosition: "",
    //   lead_Owner_Id: stoageGetter('user').id,
    //   lead_Creator_Id: stoageGetter('user').id,
    //   line1: "",
    //   line2: "",
    //   line3: "",
    //   country: "India",
    //   state: "",
    //   city: "",
    //   primaryMobile: customerMobileNoText,
    //   secondaryMobile: "",
    //   landlineNo: "",
    //   email: "",
    //   socialSecurityAdharNo: "",
    //   mailingAddressStatus: "Yes",
    //   mailingAddressSecond: "{\"mailingaddress\":{\"line1\":\"\",\"line2\":\"\",\"line3\":\"\"},\"state\":\"\",\"city\":\"\",\"country\":\"India\",\"pincode\":\"\"}",
    //   firstName: customerNameText,
    //   lastName: customerLastNameText,
    //   dob: "",

    //   professionType: '',
    //   maritalStatus: '',
    //   age: '',
    //   gender: '',
    //   sourceOfActivity: '',
    //   vehiclesOwned: '',

    //   childStatus: "",
    //   ChildInfo: "[]",
    //   education: "",
    //   incomeGroup: "",
    //   annuaLincome: "",
    //   productCategory: "",
    //   productType: "",
    //   solution: "",
    //   expectedPremium: "",
    //   expectedclosureDate: "",
    //   HaveLifeInsurance: {
    //     ExistInsur: "No",
    //     ExistHealthInsur: "No"
    //   },
    //   SumAssured: "",
    //   Insurance: "",
    //   Insurancedetails: "[]",
    //   riskComensmentDate: "",
    //   HaveLifeInsurance_details: "[]",
    //   tata_appointment_type: customerCollection.appointment_customer || advisorCollection.appointment_advisor ? appointmenttypes : "",
    //   durationType: eventDurationType,
    //   statusType: statusType.openStatus == true ? "open" : "close",
    //   statusreason: statusReasonText,
    //   mode: modeSelect,
    //   clientVisit: customerCollection.phone_call_customer == true || prospectCollection.phone_call == true || advisorCollection.phone_call_advisor == true ? clientvisit : '',
    //   teamMember: _ownerCollectn,
    //   teamMember_clone: teammemberclone,
    //   appointment_type: customerCheck ? "customer" : prospectCheck ? "existingapplication" : "existingapplication",
    //   event_type: customerCollection.phone_call_customer || prospectCollection.phone_call || advisorCollection.phone_call_advisor ? "phonecall"
    //     : customerCollection.appointment_customer || advisorCollection.appointment_advisor ? "appointment"
    //       : customerCollection.policy_renewal ? "policyrenewals" : prospectCollection.training_prospect || advisorCollection.training ? "training"
    //         : null,
    // }

    let formData = {
      userId: stoageGetter("user").id,
      appointment_type: "",
      event_type:
        customerCollection.phone_call_customer ||
          prospectCollection.phone_call ||
          advisorCollection.phone_call_advisor
          ? "phonecall"
          : customerCollection.appointment_customer ||
            advisorCollection.appointment_advisor
            ? "appointment"
            : customerCollection.policy_renewal
              ? "policyrenewals"
              : prospectCollection.training_prospect || advisorCollection.training
                ? "training"
                : null,
      tata_appointment_type:
        customerCollection.appointment_customer ||
          advisorCollection.appointment_advisor
          ? appointmenttypes
          : "",
      clientVisit:
        customerCollection.phone_call_customer == true ||
          prospectCollection.phone_call == true ||
          advisorCollection.phone_call_advisor == true
          ? clientvisit
          : "",
      // Appointment_id : Appointmentid,
      // leadId: "",
      durationType: eventDurationType,
      start_date: durationStartDateOperation,
      start_time: durationStartTimeOperation,
      end_date: durationEndDateOperation,
      end_time: durationEndTimeOperation,
      teamMember: _ownerCollectn,
      statusType: statusType.openStatus == true ? "open" : "close",
      statusreason: statusReasonText,
      manuallycustomerAdded: addManuallyButtonCheck ? true : false,
      manuallyrenewalCustomer: addManuallyButtonCheck
        ? [
          {
            Name: customerNameText,
            MobileNumber: customerMobileNoText,
          },
        ]
        : [],
      customerId: "",
      teamMember_clone: teammemberclone,
      remarkText: "",
      // leadId : leadlist[0],
      mode: modeSelect,
      stakeHolder_name: stakeholdrName,
      location: customerNameText,
      timeline_date: timelineDateData,
      agenda: eventAgenda,
      meeting_content: minutesofmeet,
    };

    if (modeSelect == "") {
      message.warning("Mode is Mandatory");
      return;
    }
    if (durationStartDateOperation == undefined) {
      message.warning("Start Date is Mandatory");
      return;
    }
    if (
      durationStartTimeOperation == undefined ||
      durationStartTimeOperation == ""
    ) {
      message.warning("Start Time is Mandatory");
      return;
    }
    if (
      durationEndTimeOperation == undefined ||
      durationEndTimeOperation == ""
    ) {
      message.warning("End Time is Mandatory");
      return;
    }

    // if(customerNameText == ''){
    //   message.warning('Prospect Firstname is Mandatory');
    //   return
    // }
    // if(customerLastNameText == ''){
    //   message.warning('Prospect Lastname is Mandatory');
    //   return
    // }
    // if(customerMobileNoText == ''){
    //   message.warning('Mobile Number is Mandatory');
    //   return
    // }

    setDurationModeAlert(false);
    setDurationDateAlert(false);
    setDurationTimeAlert(false);
    setDurationEndDateAlert(false);
    setDurationEndTimeAlert(false);

    dispatch(actions.createLead(formData)).then((res) => {
      // console.warn('ADD___LEADD_______',res)
      if (res.type === "CREATE_LEAD_SUCCESS") {
        if (props.api != undefined) props.api();
        if (props.getdata) props.getdata(true);
        props.setIsModalVisible(false);
      }
    });
  };

  const BookAppointmentFunc = async (e) => {
    console.log("book app without lead");

    if (updateEventCheck == true) {
      console.log("Update event--->");
      let teammemberclone = [];
      if (ownerCollectn.length > 0) {
        ownerCollectn.map((x) => {
          teammemberclone.push(x._Id);
        });
      }
      var date = new Date(
        durationStartDateOperation + parseInt(startTimeSelect)
      );
      console.log(date.getUTCHours());
      console.log(date.toUTCString().toString().slice(17, 22));
      var currentTime =
        new Date().getHours() + ":" + ("0" + new Date().getMinutes()).slice(-2);
      console.log("current time--->", currentTime);
      let leadlist = [];
      if (customerlistcollectn.length > 0) {
        customerlistcollectn.map((x) => {
          leadlist.push(x._Id);
        });
      }
      console.log(leadlist, "list of lead;;;;;;");
      if (modeSelect == "") {
        message.warning("Mode is Mandatory");
      }
      // else if (customerlistcollectn.length == 0) {
      //   message.warning('Search Prospect is Mandatory');
      // }
      else if (durationStartDateOperation == undefined) {
        message.warning("Start Date is Mandatory");
      } else if (stakeholdrName == undefined || stakeholdrName == "") {
        message.warning("Stakeholder Name is Mandatory");
      } else if (customerNameText == undefined || customerNameText == "") {
        message.warning("Location is Mandatory");
      } else if (timelineDateData == undefined || timelineDateData == "") {
        message.warning("Timeline is Mandatory");
      } else if (eventAgenda == undefined || eventAgenda == "") {
        message.warning("Agenda is Mandatory");
      } else if (
        durationStartTimeOperation == undefined ||
        durationStartTimeOperation == ""
      ) {
        message.warning("Start Time is Mandatory");
      } else if (
        durationEndTimeOperation == undefined ||
        durationEndTimeOperation == "" ||
        durationEndTimeDiffCheck == false
      ) {
        message.warning("End Time is Mandatory");
      } else if (
        durationEndDateOperation == undefined ||
        durationEndDateOperation == ""
      ) {
        message.warning("End Date is Mandatory");
      } else if (
        moment(new Date()).format("YYYY-MM-DD") ==
        moment(durationStartDate).format("YYYY-MM-DD") &&
        currentTime >= date.toUTCString().toString().slice(17, 22)
      ) {
        message.warning(
          "Start time should be less than or equal to current time"
        );
      } else {
        setDurationModeAlert(false);
        setDurationDateAlert(false);
        setDurationTimeAlert(false);
        setDurationEndDateAlert(false);
        setDurationEndTimeAlert(false);

        let _ownerCollectn = _.uniqBy(ownerCollectn, "ShortId");
        teammemberclone = [...new Set(teammemberclone)];
        // console.log(clientvisit, customerCollection.phone_call_customer, 'cline visit----->')
        let result = await axiosRequest.put(
          "user/updateAppointment",
          {
            userId: stoageGetter("user").id,
            // appointment_type: customerCheck ? "customer" : prospectCheck ? "existingapplication" : "existingapplication",
            // event_type: customerCollection.phone_call_customer || prospectCollection.phone_call || advisorCollection.phone_call_advisor ? "phonecall"
            //   : customerCollection.appointment_customer || advisorCollection.appointment_advisor ? "appointment"
            //     : customerCollection.policy_renewal ? "policyrenewals" : prospectCollection.training_prospect || advisorCollection.training ? "training"
            //       : null,
            // tata_appointment_type: customerCollection.appointment_customer || advisorCollection.appointment_advisor ? appointmenttypes
            //   : "",
            // clientVisit: customerCollection.phone_call_customer == true || prospectCollection.phone_call == true || advisorCollection.phone_call_advisor == true ? clientvisit : '',
            // Appointment_id : Appointmentid,
            // leadId: "",
            durationType: durationSelect,
            start_date: durationStartDateOperation,
            start_time: durationStartTimeOperation,
            end_date: durationEndDateOperation,
            end_time: durationEndTimeOperation,
            // teamMember: _ownerCollectn,
            statusType: statusType.openStatus == true ? "open" : "close",
            // statusreason: statusReasonText,
            // manuallycustomerAdded: addManuallyButtonCheck ? true : false,
            // manuallyrenewalCustomer: addManuallyButtonCheck ? [
            //   {
            //     Name: customerNameText,
            //     MobileNumber: customerMobileNoText,
            //   }
            // ] : [],
            // customerId: "",
            // teamMember_clone: teammemberclone,
            statusreason: statusReasonText,
            // leadId : leadlist[0],
            // mode: modeSelect,
            // stakeHolder_name: stakeholdrName,
            // location: customerNameText,
            timeline_date: timelineDateData,
            // agenda: eventAgenda,
            meeting_content: minutesofmeet,
            eventId: eventid,
          },
          { secure: true }
        );

        props.setIsModalVisible(false);
        // console.log(result, 'book update appointment result-------->')

        if (result.length !== 0) {
          if (props.api != undefined) {
            props.api();
          }
          if (props.getdata != undefined) {
            props.getdata(true);
          }
          props.setIsModalVisible(false);
        }
      }
      // props.setIsModalVisible(false)
      if (startTimeSelect == "" && durationButton.select_time == true) {
        setDurationStartTimeCheck(false);
        setDurationTimeAlert(true);
        //  alert("This workd")

        return false;
      }
      if (endTimeSelect == "" && durationButton.select_time == true) {
        setDurationEndTimeCheck(false);
        setDurationTimeAlert(true);

        return false;
      }
    } else {
      let teammemberclone = [];
      if (ownerCollectn.length > 0) {
        ownerCollectn.map((x) => {
          teammemberclone.push(x._Id);
        });
      }
      var date = new Date(
        durationStartDateOperation + parseInt(startTimeSelect)
      );
      console.log(date.getUTCHours());
      console.log(date.toUTCString().toString().slice(17, 22));
      var currentTime =
        new Date().getHours() + ":" + ("0" + new Date().getMinutes()).slice(-2);
      console.log("current time--->", currentTime);
      let leadlist = [];
      if (customerlistcollectn.length > 0) {
        customerlistcollectn.map((x) => {
          leadlist.push(x._Id);
        });
      }
      console.log(leadlist, "list of lead;;;;;;");
      if (modeSelect == "") {
        message.warning("Mode is Mandatory");
      }
      // else if (customerlistcollectn.length == 0) {
      //   message.warning('Search Prospect is Mandatory');
      // }
      else if (durationStartDateOperation == undefined) {
        message.warning("Start Date is Mandatory");
      } else if (stakeholdrName == undefined || stakeholdrName == "") {
        message.warning("Stakeholder Name is Mandatory");
      } else if (customerNameText == undefined || customerNameText == "") {
        message.warning("Location is Mandatory");
      } else if (timelineDateData == undefined || timelineDateData == "") {
        message.warning("Timeline is Mandatory");
      } else if (eventAgenda == undefined || eventAgenda == "") {
        message.warning("Agenda is Mandatory");
      } else if (
        durationStartTimeOperation == undefined ||
        durationStartTimeOperation == ""
      ) {
        message.warning("Start Time is Mandatory");
      } else if (
        durationEndTimeOperation == undefined ||
        durationEndTimeOperation == "" ||
        durationEndTimeDiffCheck == false
      ) {
        message.warning("End Time is Mandatory");
      } else if (
        moment(new Date()).format("YYYY-MM-DD") ==
        moment(durationStartDate).format("YYYY-MM-DD") &&
        currentTime >= date.toUTCString().toString().slice(17, 22)
      ) {
        message.warning(
          "Start time should be less than or equal to current time"
        );
      } else {
        if (eventDurationType == "customedatetime") {
          if (
            durationEndDateOperation == undefined ||
            durationEndDateOperation == ""
          ) {
            message.warning("End Date is Mandatory");
          } else {
            setDurationModeAlert(false);
            setDurationDateAlert(false);
            setDurationTimeAlert(false);
            setDurationEndDateAlert(false);
            setDurationEndTimeAlert(false);
            // console.log(clientvisit, customerCollection.phone_call_customer, 'cline visit----->')
            let _ownerCollectn = _.uniqBy(ownerCollectn, "ShortId");
            teammemberclone = [...new Set(teammemberclone)];
            let result = await axiosRequest.post(
              "user/bookAppointment",
              {
                userId: stoageGetter("user").id,
                appointment_type: customerCheck
                  ? "customer"
                  : prospectCheck
                    ? "existingapplication"
                    : "existingapplication",
                event_type:
                  customerCollection.phone_call_customer ||
                    prospectCollection.phone_call ||
                    advisorCollection.phone_call_advisor
                    ? "phonecall"
                    : customerCollection.appointment_customer ||
                      advisorCollection.appointment_advisor
                      ? "appointment"
                      : customerCollection.policy_renewal
                        ? "policyrenewals"
                        : prospectCollection.training_prospect ||
                          advisorCollection.training
                          ? "training"
                          : null,
                tata_appointment_type:
                  customerCollection.appointment_customer ||
                    advisorCollection.appointment_advisor
                    ? appointmenttypes
                    : "",
                clientVisit:
                  customerCollection.phone_call_customer == true ||
                    prospectCollection.phone_call == true ||
                    advisorCollection.phone_call_advisor == true
                    ? clientvisit
                    : "",
                // Appointment_id : Appointmentid,
                // leadId: "",
                durationType: durationSelect,
                start_date: durationStartDateOperation,
                start_time: durationStartTimeOperation,
                end_date: durationEndDateOperation,
                end_time: durationEndTimeOperation,
                teamMember: _ownerCollectn,
                statusType: statusType.openStatus == true ? "open" : "close",
                statusreason: statusReasonText,
                manuallycustomerAdded: addManuallyButtonCheck ? true : false,
                manuallyrenewalCustomer: addManuallyButtonCheck
                  ? [
                    {
                      Name: customerNameText,
                      MobileNumber: customerMobileNoText,
                    },
                  ]
                  : [],
                customerId: "",
                teamMember_clone: teammemberclone,
                remarkText: "",
                leadId: oppChip.length!= 0 ? oppCollectn[0]._Id : null,
                mode: modeSelect,
                stakeHolder_name: stakeholdrName,
                location: customerNameText,
                timeline_date: timelineDateData,
                agenda: eventAgenda,
                meeting_content: minutesofmeet,
              },
              { secure: true }
            );

            if (result.length !== 0) {
              if (props.api != undefined) {
                props.api();
              }
              if (props.getdata) {
                props.getdata(true);
              }
              props.setIsModalVisible(false);
            }
          }
        } else {
          setDurationModeAlert(false);
          setDurationDateAlert(false);
          setDurationTimeAlert(false);
          setDurationEndDateAlert(false);
          setDurationEndTimeAlert(false);
          let _ownerCollectn = _.uniqBy(ownerCollectn, "ShortId");
          teammemberclone = [...new Set(teammemberclone)];

          let result = await axiosRequest.post(
            "user/bookAppointment",
            {
              userId: stoageGetter("user").id,
              appointment_type: customerCheck
                ? "customer"
                : prospectCheck
                  ? "existingapplication"
                  : "existingapplication",
              event_type:
                customerCollection.phone_call_customer ||
                  prospectCollection.phone_call ||
                  advisorCollection.phone_call_advisor
                  ? "phonecall"
                  : customerCollection.appointment_customer ||
                    advisorCollection.appointment_advisor
                    ? "appointment"
                    : customerCollection.policy_renewal
                      ? "policyrenewals"
                      : prospectCollection.training_prospect ||
                        advisorCollection.training
                        ? "training"
                        : null,
              tata_appointment_type:
                customerCollection.appointment_customer ||
                  advisorCollection.appointment_advisor
                  ? appointmenttypes
                  : "",
              clientVisit:
                customerCollection.phone_call_customer == true ||
                  prospectCollection.phone_call == true ||
                  advisorCollection.phone_call_advisor == true
                  ? clientvisit
                  : "",
              durationType: eventDurationType,
              start_date: durationStartDateOperation,
              start_time: durationStartTimeOperation,
              end_date: durationEndDateOperation,
              end_time: durationEndTimeOperation,
              teamMember: _ownerCollectn,
              statusType: statusType.openStatus == true ? "open" : "close",
              statusreason: statusReasonText,
              manuallycustomerAdded: addManuallyButtonCheck ? true : false,
              manuallyrenewalCustomer: addManuallyButtonCheck
                ? [
                  {
                    Name: customerNameText,
                    MobileNumber: customerMobileNoText,
                  },
                ]
                : [],
              customerId: "",
              leadId: oppCollectn[0]._Id,
              teamMember_clone: teammemberclone,
              remarkText: "",
              mode: modeSelect,
            },
            { secure: true }
          );

          if (result.length !== 0) {
            if (props.api != undefined) {
              props.api();
            }
            if (props.getdata) {
              props.getdata(true);
            }
            props.setIsModalVisible(false);
          }
        }
        if (startTimeSelect == "" && durationButton.select_time == true) {
          setDurationStartTimeCheck(false);
          setDurationTimeAlert(true);
          return false;
        }
        if (endTimeSelect == "" && durationButton.select_time == true) {
          setDurationEndTimeCheck(false);
          setDurationTimeAlert(true);
          return false;
        }
      }
    }
  };

  const StatusTypeOpenFunc = () => {
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
    });
  };
  const StatusTypeCloseFunc = () => {
    setEventStatus("close");
    setStatusType({
      openStatus: false,
      closeStatus: true,
    });
  };
  const StatusTypeReasonFunc = (e) => {
    console.log(e.target.value);
    setStatusReasonText(e.target.value);
  };
  const AdvisorTrainingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: false,
      training: true,
    });
  };
  const AdvisorPhoneCallFunc = () => {
    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: true,
      training: false,
    });
    setclientVisit("Relationship call");
  };
  const AdvisorAppointmentFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
    });
  };
  const CustomerAppointmentFunc = () => {
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
  };
  const CustomerPhoneCallFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: true,
      policy_renewal: false,
    });
    setclientVisit("Relationship call");
  };
  const CustomerPolicyRenewalFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: false,
      policy_renewal: true,
    });
  };

  const AppointmentProspectMeetingFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
  };

  const AppointmentProspectFollowUpFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: false,
      follow_up: true,
      document_collection: false,
    });
  };

  const AppointmentProspectDocCollectionFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: false,
      follow_up: false,
      document_collection: true,
    });
  };
  // const AppointmentAdvisorUnitMeetingFunc=()=>{}
  // const AppointmentAdvisorUnitMeetingFunc = () => {
  //   setAdvisorCollection({
  //     appointment_advisor: true,
  //     businessPlanning_review: false,
  //     inactive_agent_reactivation: false,
  //     unit_meeting: true,
  //     joint_customer_visit: false,
  //     servicing: false
  //   })
  //   setAppointmentType('Unit Meeting')
  // }
  const AppointmentAdvisorServicingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: false,
      inactive_agent_reactivation: false,
      unit_meeting: false,
      joint_customer_visit: false,
      servicing: true,
    });
    setAppointmentType("Servicing");
  };
  const AppointmentAdvisorJoint_Cust_MeetingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: false,
      inactive_agent_reactivation: false,
      unit_meeting: false,
      joint_customer_visit: true,
      servicing: false,
    });
    setAppointmentType("Joint Customer Meeting");
  };
  const AppointmentAdvisorBusinessPlanningFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: true,
      inactive_agent_reactivation: false,
      unit_meeting: false,
      joint_customer_visit: false,
      servicing: false,
    });
    setAppointmentType("New Proposition Meeting");
  };

  // const AppointmentAdvisorInactiveAgentFunc = () => {
  //   setAdvisorCollection({
  //     appointment_advisor: true,
  //     businessPlanning_review: false,
  //     inactive_agent_reactivation: true,
  //     unit_meeting: false,
  //     joint_customer_visit: false,
  //     servicing: false
  //   })
  //   setAppointmentType('Inactive agent reactivation')
  // }

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setDurationStartDate(moment(date).format("YYYY-MM-DD"));
    setDurationEndDate(moment(date).format("YYYY-MM-DD"));

    console.log(moment(date).format("YYYY-MM-DD"));
  };

  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
  };

  const TeamMemberMeetingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
    });
    if (prospectCheck == true) {
      setProspectCollection({
        appointment_prospect: true,
        phone_call: false,
        training_prospect: false,
      });
    }
  };
  const TeamMemberTrainingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: false,
      training: true,
    });
    if (prospectCheck == true) {
      setProspectCollection({
        appointment_prospect: false,
        phone_call: true,
        training_prospect: false,
      });
    }
  };

  const TeamMemberBusinessPlanning_ReviewFunc = () => {
    setAdvisorCollection({
      businessPlanning_review: true,
      unit_meeting: false,
      joint_customer_visit: false,
    });
  };
  const TeamMemberUnitMeetingFunc = () => {
    setAdvisorCollection({
      businessPlanning_review: false,
      unit_meeting: true,
      joint_customer_visit: false,
    });
  };
  const TeamMemberJointCustomerVisitFunc = () => {
    setAdvisorCollection({
      businessPlanning_review: false,
      unit_meeting: false,
      joint_customer_visit: true,
    });
  };
  const ProspectAppointmentFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      phone_call: false,
      training_prospect: false,
    });
  };
  const ProspectPhoneCallFunc = () => {
    setProspectCollection({
      appointment_prospect: false,
      phone_call: true,
      training_prospect: false,
    });
    setclientVisit("Relationship call");
  };
  const ProspectTrainingFunc = () => {
    setProspectCollection({
      appointment_prospect: false,
      phone_call: false,
      training_prospect: true,
    });
  };
  const ProspectFirstMeetingFunc = () => {
    setProspectCollection({
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
  };
  const ProspectFollowUpFunc = () => {
    setProspectCollection({
      first_meeting: false,
      follow_up: true,
      document_collection: false,
    });
  };
  const ProspectDocumentCollectionFunc = () => {
    setProspectCollection({
      first_meeting: false,
      follow_up: false,
      document_collection: true,
    });
  };

  const CustomerAppointmentCollectionFunc = () => {
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
  };
  const CustomerPhoneCallCollectionFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: true,
      policy_renewal: false,
    });
  };
  const CustomerPolicyRenewalCollectionFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: false,
      policy_renewal: true,
    });
  };
  const [dateClick, setDateClick] = useState();
  const [ActivityPageEvent, setActivityPageEvent] = useState(false);

  const showModal = (e, date) => {
    console.log("model opens");
    setUpdateCheckEvent(true);
    setDurationStartDate(moment(e.event.start));
    setDurationEndDate(moment(e.event.end));
    // alert(moment(e.event.start).format())
    // alert("This is date "+moment(e.event.end))
    let start_ms_date = new Date(moment(e.event.start)).setUTCHours(0, 0, 0, 0);
    let end_ms_date = new Date(moment(e.event.end)).setUTCHours(0, 0, 0, 0);
    // alert("Start Date"+start_ms_date)
    // alert("End Date"+end_ms_date)
    console.log(fetchEventArray);

    const greaterThanTen = fetchEventArray.find(
      (element) => element.id == e.event.id
    );
    setFetchEventObject(
      fetchEventArray.find((element) => element.id == e.event.id)
    );
    fetchEventArray.map((item) => {
      if (item.id == e.event.id) {
        setUpdateEventType(item.event_type);
        if (item.statusType == "open") {
          setStatusType({
            openStatus: true,
            closeStatus: false,
          });
        } else {
          setStatusType({
            openStatus: false,
            closeStatus: true,
          });
        }
        console.log(item);
        setAppointmentTypeFetched(item.appointment_type);
        setEventTypeFetched(item.event_type);

        if (item.appointment_type == "customer") {
          setCustomerCheck(true);
          setAdvisorCheck(false);
          setCustomerTagVisible(true);
          setCustomerOnClickVal(item.manuallyrenewalCustomer[0].Name);
          setProspectCheck(false);
          setAddManuallyButtonCheck(true);
        } else if (item.appointment_type == "existingapplication") {
          setCustomerCheck(false);
          setAdvisorCheck(false);
          setProspectCheck(true);
          setProspectOnClickVal(item.leadId.firstName);

          setProspectTagVisible(true);
        } else {
          setCustomerCheck(false);
          setAdvisorCheck(true);
          setProspectCheck(false);
          setAdvisorOnClickVal(item.partnerId.partnerName);
          console.log(item.partnerId);
          setAdvisorTagVisible(true);
        }
        if (item.appointment_type == "existingapplication") {
          setProspectCollection({
            appointment_prospect: false,
            phone_call: false,
            training_prospect: false,
          });
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: false,
            policy_renewal: false,
          });

          if (item.event_type == "appointment") {
            setAdvisorCollection({
              appointment_advisor: true,
              phone_call_advisor: false,
              training: false,
            });
          } else if (item.event_type == "training") {
            setAdvisorCollection({
              appointment_advisor: false,
              phone_call_advisor: false,
              training: true,
            });
          } else {
            setAdvisorCollection({
              appointment_advisor: false,
              phone_call_advisor: true,
              training: false,
            });
          }
        }

        if (item.appointment_type == "existingapplication") {
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: false,
            training: false,
          });
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: false,
            policy_renewal: false,
          });

          if (item.event_type == "phonecall") {
            setProspectCollection({
              appointment_prospect: false,
              phone_call: true,
              training_prospect: false,
            });
          }
          if (item.event_type == "training") {
            setProspectCollection({
              appointment_prospect: false,
              phone_call: false,
              training_prospect: true,
            });
          }
          if (item.event_type == "appointment") {
            setProspectCollection({
              appointment_prospect: true,
              phone_call: false,
              training_prospect: false,
            });
          }
        }
        if (item.appointment_type == "customer") {
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: false,
            training: false,
          });
          setProspectCollection({
            appointment_prospect: false,
            phone_call: false,
            training_prospect: false,
          });
          if (item.event_type == "appointment") {
            setCustomerCollection({
              appointment_customer: true,
              phone_call_customer: false,
              policy_renewal: false,
            });
          } else if (item.event_type == "phonecall") {
            setCustomerCollection({
              appointment_customer: false,
              phone_call_customer: true,
              policy_renewal: false,
            });
          } else {
            setCustomerCollection({
              appointment_customer: false,
              phone_call_customer: false,
              policy_renewal: true,
            });
          }
        }

        setDurationStartTimeOperation(parseInt(item.start_time));
        setDurationEndTimeOperation(parseInt(item.end_time));
        setEventDurationType(item.durationType);
        timeList.map((time) => {
          if (time.value == item.start_time) {
            setStartTimeSelect(time.value);
          }
          if (time.value == item.end_time) {
            setEndTimeSelect(time.value);
          }
        });
      }
    });

    console.log(greaterThanTen); //11
    let start_ms_time = new Date(moment(e.event.start)).setDate(0, 0, 0);
    // alert("This is the start time"+start_ms_time)

    setDurationStartDateOperation(start_ms_date);
    setDurationEndDateOperation(end_ms_date);
    setBookEventCheck(false);
    setUpdateEventId(e.event.id);
    setUpdateCheckEvent(true);
    props.setIsModalVisible(true);
    setEventText(JSON.stringify(e.event.title));
    // alert(e.event.id)

    fetchUpcomingArr.map((item) => {
      if (item._id == e.event.id) {
        // console.log(item)
        // setDurationStartDate(item.start_date)
        // setUpdateStartTime(JSON.stringify(item.start_time))
        // setUpdateEndTime(JSON.stringify(item.end_time))
        // setDurationEndDate(item.end_date)
        // alert("This works"+item._id)
      }

      //       return(
      // item.id==e.event.id?{
      // setHelperUpcomingArr(item)
      // }:null
      //       )
    });
    console.log("This works" + e.event.start);
  };

  // eventClickBtn(showModal);
  // {
  //   isModalComponent ? setActivityPageEvent(true):setActivityPageEvent(false);
  // }
  // {ActivityPageEvent ? showModal() :""

  // }
  // isModalComponent(showModal())
  const OnChangeEventText = (e) => {
    setEventText(e.target.value);
  };
  const OnDateClick = (e) => {
    setDateClick(e.target.value);
    // alert(e.target.value)
    props.setIsModalVisible(true);
  };
  const handleOk = (e) => {
    // alert("This is ok " + clickedDate)
    props.setIsModalVisible(false);

    // alert(MultiSelectDate)
    // alert("This is endva;l" + endVal.format("H:mm:ss"))
    // if (MultiSelectDate == true) {
    //   setAddEvents([...addEvents, {

    //     id: Math.random().toString(36).slice(-6), title: eventText,
    //     //  start:moment("2017-08-13T12:34:00Z").format(),
    //     //  end:moment("2017-08-13T13:34:00Z").format()
    //     start: moment(startDuration).format('YYYY-MM-DD') + moment(value).format("T" + "H:mm:ss" + "z"),
    //     end: moment(endDuration).format('YYYY-MM-DD') + moment(endVal).format("T" + "H:mm:ss" + "z"),
    //     // start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
    //     // end:moment(endDuration).format('YYYY-MM-DD ') + moment(endVal).format("H:mm:ss"),
    //     // allDay:moment(endVal).format("H:mm:ss")>"23:59:59"?true:false

    //   }])
    // }
    // else {
    //   setAddEvents([...addEvents, {

    //     id: Math.random().toString(36).slice(-6), title: eventText,
    //     //  date:moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T"+"H:mm:ss"+"Z"),
    //     start: moment(clickedDate).format('YYYY-MM-DD') + moment(value).format("T" + "H:mm:ss" + "z"),
    //     end: moment(clickedDate).format('YYYY-MM-DD') + moment(endVal).format("T" + "H:mm:ss" + "z"),
    //     allDay: false
    //   }])

    // }

    // alert(addEvents)

    //   setAddEvents([...addEvents,{

    //       id: Math.random().toString(36).slice(-6), title:eventText,
    //  start:moment(startDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
    //       end:moment(endDuration).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss"),
    //      date:moment(clickedDate).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")
    //     }])
    // setAddEvents([addEvents,{title:eventText,date:moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("H:mm:ss")}])
    // console.log(e.dateStr)
    // alert(moment(e.dateStr).format('YYYY-MM-DD ') + moment(value).format("HH:MM"))
  };

  const MultiSelect = (e) => {
    setAddManuallyButtonCheck(false);
    setProspectTagVisible(false);
    setAdvisorTagVisible(false);
    setCustomerTagVisible(false);
    setSearchAdvisorText("");
    setSearchProspectText("");
    setSearchCustomerText("");
    setSearchTeamText("");
    setTeamTagVisible(false);
    setAdvisorCheck(true);
    setProspectCheck(false);
    setCustomerCheck(false);
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
      businessPlanning_review: true,
    });
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
    setStartDuration(e.startStr);
    // alert("This is the end str" + e.endStr)
    setEndDuration(e.endStr);
    props.setIsModalVisible(true);
    setMultiSelectDate(true);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    setDurationStartDateHelper();
  };

  // let EventFetch=fetchEventCheck==true? fetchUpcomingArr.map((item)=>{
  //   return(
  //     setHelperUpcomingArr(item)
  //   )
  // }):null
  // let startDateParse=helperUpcomingArr? JSON.parse(helperUpcomingArr.start_date):null;
  // let startTimeParse=helperUpcomingArr?JSON.parse(helperUpcomingArr.start_time):null;
  // let endDateParse=helperUpcomingArr?JSON.parse(helperUpcomingArr.end_date):null;
  // let endTimeParse=helperUpcomingArr? JSON.parse(helperUpcomingArr.end_time):null
  // let idParse=helperUpcomingArr? JSON.parse(helperUpcomingArr._id):null;
  let start_date_var = helperUpcomingArr ? helperUpcomingArr.start_date : null;
  let start_date_assign = new Date(start_date_var).setUTCHours(0, 0, 0, 0);
  let end_date_var = helperUpcomingArr ? helperUpcomingArr.end_date : null;
  let end_date_assign = new Date(end_date_var).setUTCHours(0, 0, 0, 0);
  // console.log(start_date_assign)
  // console.log(end_date_assign)
  // console.log(helperUpcomingArr? helperUpcomingArr.start_date:null)
  // console.log(fetchUpcomingArr)

  let events = [
    { title: eventText, date: new Date("2021-08-11 10:00:00") },
    { title: "TEst", date: new Date("2021-08-11 10:00:00") },
  ];

  addEvent = [
    { title: "Meeting", date: new Date("2021-08-11 10:00:00") },
    { title: "TEst", date: new Date("2021-08-11 10:00:00") },
  ];
  const OnEndTimeChange = (e) => {
    setEndVal(e);
  };
  const OnTimeChange = (val) => {
    setValue(val);
  };
  // console.log("Add evebnt"+addEvents)
  const MultiSelectDateFunc = (e) => {
    setAddManuallyButtonCheck(false);
    setStartTimeSelect("");
    setEndTimeSelect("");
    setUpdateCheckEvent(false);
    setProspectTagVisible(false);
    setAdvisorTagVisible(false);
    setCustomerTagVisible(false);
    setCustomerNameText("");
    setCustomerMobileNoText("");
    setSearchAdvisorText("");
    setSearchProspectText("");
    setSearchCustomerText("");
    setSearchTeamText("");
    setTeamTagVisible(false);
    setAdvisorCheck(true);
    setProspectCheck(false);
    setCustomerCheck(false);
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
      businessPlanning_review: true,
    });
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
    if (updateEventCheck) setBookEventCheck(true);
    setDurationStartDate(moment(e.start));
    setDurationEndDate(moment(e.end).subtract(1, "days"));
    let new_start_date = Date.parse(e.start);
    let start_date = new Date(new_start_date).setUTCHours(0, 0, 0, 0);

    setDurationStartDateOperation(start_date);
    // alert(start_date)

    let moment_end_date = moment(e.end).subtract(1, "days");
    let new_end_date = Date.parse(moment_end_date);
    let end_date = new Date(new_end_date).setUTCHours(0, 0, 0, 0);
    setDurationEndDateOperation(end_date);
    // alert(end_date)
    // setDurationStartDate(moment(e.start).format("YYYY-MM-DD"))
    // setDurationStartDateOperation(moment(e.start).format("YYYY-MM-DD"))
    // alert("This is duration Start Date"+durationStartDate)
    // // alert(e.start,dateFormat)
    // setDurationEndDate(moment(e.end).subtract(1, "days").format("YYYY-MM-DD"))
    // setDurationEndDateOperation(moment(e.end).subtract(1, "days").format("YYYY-MM-DD"))
    // alert("This is duration End Date"+durationEndDate)
    props.setIsModalVisible(true);
  };
  const DateClick = (e) => {
    setAddManuallyButtonCheck(false);
    setStartTimeSelect("");
    setEndTimeSelect("");
    // setDurationStartDate(e.dateStr)
    // setDurationEndDate(e.dateStr)
    // alert("this is the start" + e.startStr)
    // alert("this si the end" + e.endStr)
    // setDurationStartDate(e.date)
    // setDurationEndDate(e.date)
    // let new_date =Date.parse(e.date)
    setBookEventCheck(true);
    setUpdateCheckEvent(false);
    let ms_date = new Date(e.date).setUTCHours(0, 0, 0, 0);

    setDurationStartDate(moment(e.date));
    setDurationEndDate(moment(e.date));

    setDurationStartDateHelper(e.dateStr);
    setDurationStartDateOperation(ms_date);

    setDurationEndDateOperation(ms_date);
    setClickedDate(e.dateStr);
    props.setIsModalVisible(true);
    setMultiSelectDate(false);
  };
  const datecl = () => {
    console.log("it works");
  };
  return (
    <div className="CalendarEvent-main-class">
      <Modal
        className="Calendar-event-modal-header-style"
        title={
          updateEventCheck == true ? (
            "Update Event"
          ) : (
            <div style={{ fontWeight: "500", fontSize: "16px", color: "#fff" }}>
              {props.click == "UPDATE EVENT"
                ? "Update An Event"
                : "Create An Event"}
            </div>
          )
        }
        visible={props.isModalVisible}
        onOk={handleOk}
        closable={
          durationDateAlert == true || durationTimeAlert == true ? false : true
        }
        onCancel={handleCancel}
        footer={null}
        width="600px"
        bodyStyle={{
          height: "60vh",
          // display:"flex",
          // flexDirection:"column"
          overflowY: "scroll",
        }}
      >
        {/* <div
            // className={prospectCollection.first_meeting == true && prospectCheck == true ? "CalendarEvent-Modal-Card-height" : "CalendarEvent-Modal-Card-style"}
        className="CalendarEvent-Modal-Card-style"
        > */}
        <div className="CalendarEvent-Modal-Card-content">
          {/* <h4
                className="CalendarEvent-Modal-Card-header-type"
              >Event With</h4>
              <div className="CalendarEvent-Modal-Card-button-flex">

                <button
                  disabled={updateEventCheck==true?true:false}
                  onClick={checkTeamMemberFunc}
                  className={advisorCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >New Prospect</button>
              
                <button
                  disabled={updateEventCheck==true?true:false}
                // updateEventCheck==true?disabled:null
                  onClick={checkCustomerFunc}
                  className={customerCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                >Existing Lead</button>
               
              </div> */}


          <h4 className="CalendarEvent-Modal-Card-header-type">Event Type</h4>
          {advisorCheck == true ? (
            <div
              className={
                advisorCheck == true
                  ? "CalendarEvent-Modal-Card-button-flex-1"
                  : "CalendarEvent-Modal-Card-button-flex"
              }
            >
              <button
                disabled={updateEventCheck == true ? true : false}
                className={
                  advisorCollection.appointment_advisor == true
                    ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                    : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                }
                onClick={AdvisorAppointmentFunc}
              >
                Appointment
              </button>
              <button
                disabled={updateEventCheck == true ? true : false}
                className={
                  advisorCollection.phone_call_advisor == true
                    ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                    : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                }
                onClick={AdvisorPhoneCallFunc}
              // style={{marginLeft : 10}}
              >
                Phone Call
              </button>

              {/* <button
                    disabled={updateEventCheck==true?true:false}
                    onClick={AdvisorTrainingFunc}
                    className={advisorCollection.training == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  >Training</button> */}
            </div>
          ) : prospectCheck == true ? (
            <div
              className={
                prospectCheck == true
                  ? "CalendarEvent-Modal-Card-button-flex"
                  : "CalendarEvent-Modal-Card-button-flex"
              }
            >
              <button
                disabled={updateEventCheck == true ? true : false}
                className={
                  prospectCollection.appointment_prospect == true
                    ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                    : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                }
                onClick={ProspectAppointmentFunc}
              >
                Appointment
              </button>
              <button
                disabled={updateEventCheck == true ? true : false}
                className={
                  prospectCollection.phone_call == true
                    ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                    : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                }
                onClick={ProspectPhoneCallFunc}
              // style={{marginLeft : 10}}
              >
                Phone Call
              </button>

              {/* <button
                      disabled={updateEventCheck==true?true:false}
                      onClick={ProspectTrainingFunc}
                      className={prospectCollection.training_prospect == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    >Training</button> */}
            </div>
          ) : customerCheck == true ? (
            <div
              className={
                customerCheck == true
                  ? "CalendarEvent-Modal-Card-customer-event-button-flex"
                  : "CalendarEvent-Modal-Card-customer-event-button-flex"
              }
            >
              <button
                disabled={updateEventCheck == true ? true : false}
                className={
                  customerCollection.appointment_customer == true
                    ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                    : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                }
                onClick={CustomerAppointmentFunc}
              >
                Appointment
              </button>
              <button
                disabled={updateEventCheck == true ? true : false}
                className={
                  customerCollection.phone_call_customer == true
                    ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                    : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                }
                onClick={CustomerPhoneCallFunc}
              // style={{marginLeft : 10}}
              >
                Phone Call
              </button>

              {/* <button
                        disabled={updateEventCheck==true?true:false}
                        onClick={CustomerPolicyRenewalFunc}
                        // style={{marginLeft : 10}}
                        className={customerCollection.policy_renewal == true ? "CalendarEvent-Modal-documentcollection-onclick-button-style" : "CalendarEvent-Modal-Card-documentcollection-static-button-style"}
                      >Policy Renewals</button> */}
            </div>
          ) : null}

          <div className="CalendarEvent-Modal-Card-vertical-line"></div>
          {customerCollection.appointment_customer == true &&
            customerCheck == true ? (
            <div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Client Visit
              </h4>

              <div className="CalendarEvent-Modal-appointmenttype-button-flex">
                <button
                  onClick={() => {
                    setclientVisit("Client Meeting");
                  }}
                  className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                >
                  Client Meeting{" "}
                </button>
              </div>
            </div>
          ) : null}
          {advisorCollection.appointment_advisor == true &&
            advisorCheck == true ? (
            <div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Appointment Type
              </h4>
              <div className="CalendarEvent-Modal-appointmenttype-businessPlanning-button-flex">
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={AppointmentAdvisorBusinessPlanningFunc}
                  className={
                    advisorCollection.businessPlanning_review == true
                      ? "CalendarEvent-Modal-businessPlanning-onclick-button-style cal-mr10-mb10"
                      : "CalendarEvent-Modal-businessPlanning-static-button-style cal-mr10-mb10"
                  }
                >
                  New Proposition Meeting
                </button>
                {/* >Business Planning & Review</button> */}

                {/* <button
                      disabled={updateEventCheck==true?true:false}
                      onClick={AppointmentAdvisorInactiveAgentFunc}
                     
                      className={advisorCollection.inactive_agent_reactivation == true ? "CalendarEvent-Modal-businessPlanning-onclick-button-style cal-mr10-mb10" : "CalendarEvent-Modal-businessPlanning-static-button-style cal-mr10-mb10"}
                    >Inactive Agent re-activation</button> */}

                {/* <div className="unittime-mbl"> */}
                {/* <button
                     
                      disabled={updateEventCheck==true?true:false}
                      onClick={AppointmentAdvisorUnitMeetingFunc}
                      className={advisorCollection.unit_meeting == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style cal-mr10-mb10" : "CalendarEvent-Modal-Card-eventwith-static-button-style cal-mr10-mb10"}
                    >Unit Meeting</button> */}
                {/* </div> */}
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={AppointmentAdvisorJoint_Cust_MeetingFunc}
                  className={
                    advisorCollection.joint_customer_visit == true
                      ? "CalendarEvent-Modal-joint-customer-onclick-button-style cal-mr10-mb10"
                      : "CalendarEvent-Modal-joint-customer-static-button-style cal-mr10-mb10"
                  }
                >
                  Joint Customer Meeting
                </button>
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={AppointmentAdvisorServicingFunc}
                  className={
                    advisorCollection.servicing == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style cal-mr10-mb10"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style cal-mr10-mb10"
                  }
                >
                  Servicing
                </button>
              </div>

              {/* <div
                    className="CalendarEvent-Modal-appointmenttype-button-flex CalendarEvent-Modal-Unit"
                  >
                   
                    


                  </div> */}
            </div>
          ) : advisorCollection.phone_call_advisor == true &&
            advisorCheck == true ? (
            <div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Client Visit
              </h4>

              <div className="CalendarEvent-Modal-appointmenttype-button-flex">
                <button
                  onClick={() => {
                    setclientVisit("Relationship call");
                  }}
                  className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                >
                  Relationship Call{" "}
                </button>
              </div>
            </div>
          ) : prospectCollection.phone_call == true && prospectCheck == true ? (
            <div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Client Visit
              </h4>

              <div className="CalendarEvent-Modal-appointmenttype-button-flex">
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={() => {
                    setclientVisit("Relationship call");
                  }}
                  className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                >
                  Relationship Call{" "}
                </button>
              </div>
            </div>
          ) : customerCollection.phone_call_customer == true &&
            customerCheck == true ? (
            <div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Client Visit
              </h4>

              <div className="CalendarEvent-Modal-appointmenttype-button-flex">
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={() => {
                    setclientVisit("Relationship call");
                  }}
                  className="CalendarEvent-Modal-Card-clientVisit-onclick-button-style"
                >
                  Relationship Call{" "}
                </button>
              </div>
            </div>
          ) : prospectCollection.appointment_prospect == true &&
            prospectCheck == true ? (
            <div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Appointment Type
              </h4>
              <div className="CalendarEvent-Modal-appointmenttype-button-flex CalenderEvent-AppFirst-Meeting">
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={AppointmentProspectMeetingFunc}
                  className={
                    prospectCollection.first_meeting == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  First Meeting
                </button>
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={AppointmentProspectFollowUpFunc}
                  className={
                    prospectCollection.follow_up == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Follow Up
                </button>
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={AppointmentProspectDocCollectionFunc}
                  className={
                    prospectCollection.document_collection == true
                      ? "CalendarEvent-Modal-documentcollection-onclick-button-style"
                      : "CalendarEvent-Modal-Card-documentcollection-static-button-style"
                  }
                >
                  Document Collection
                </button>
              </div>
            </div>
          ) : null}

          {advisorCollection.joint_customer_visit == true || advisorCollection.phone_call_advisor == true ?
            <div>
              <div className="CalendarEvent-Modal-Card-vertical-line"></div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Search Opportunity
              </h4>
              <div className="Todo-Create-Search calSearch">
                {/* <input type='text' placeholder='Search by Name'/> */}
                {/* <SearchOutlined /> */}
                {/* <Input addonAfter={<SearchOutlined />} placeholder="Search by Name" /> */}
                {/* <Search placeholder="Search by Name" onSearch={onSearch}  /> */}
                <AutoComplete
                  disabled={updateEventCheck == true || oppdisable == true ? true : false}
                  value={oppData}
                  style={{ width: "100%" }}
                  options={oppList}
                  onChange={(text, data) => onChangeOpp(text, data)}
                  onSelect={onSelectOpp}
                  notFoundContent="No Result Found"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                    -1
                  }
                >
                  <Search placeholder="Search by Name" />
                </AutoComplete>
              </div>
              {/* {console.log(teamMemberChip,'team member chip----->')} */}
              {oppChip?.length !== 0 && (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                    alignItems: "center",
                  }}
                >
                  {oppChip?.map((item, index) => {
                    // console.log(item,'item--team member-->')
                    return (
                      <div style={{ marginRight: 10, marginTop: 10 }}>
                        {updateEventCheck == true ? (
                          <Button
                            size="small"
                            type="primary"
                            style={{
                              backgroundColor: "#00ACC1",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            shape="round"
                          >
                            {item.value}{" "}
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            type="primary"
                            style={{
                              backgroundColor: "#00ACC1",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            shape="round"
                          >
                            {item}{" "}
                            <CloseOutlined
                              onClick={() => removeOpp(item, index)}
                            />
                          </Button>
                        )}{" "}
                      </div>
                    );
                  })}
                </div>
              )}
            </div> : null}

          {/* {advisorCheck==true ?
                  <div>
                  
                    <hr style={{
                      width: '100%',
                      backgroundColor: '#d9dbd1',
                      // height: '0.1vw',
                      marginTop: '20px',
                      marginBottom:'20px',
                      opacity: '.2'
                    }}/>
                    <h4
                      className="CalendarEvent-Modal-Card-header-type"
                    >Search Advisor</h4>
                      <div
                        className="CalendarEvent-Modal-Search-flex"
                      >
                        <div
                          className="CalendarEvent-Modal-search-style"
                        >
                          <Search placeholder="Search By Name" onSearch={searchAdvisorFunc}
                          disabled={updateEventCheck?true:false}
                        type="text"
                        value={searchAdvisorText}
                        onChange={searchAdvisorTextFunc}
                            enterButton
                            className="CalendarEvent-Modal-textinput-style"
                          />
                  {advisorOnClickCheck==true?
        <div>
      {advisorArr!==null&&Array.isArray(advisorArr)?
        <div
        className="CalendarEvent-Modal-search-record-style"
        >
        {advisorArr.map((advisor)=>{
          return(
            <div>
            <div
            className="CalendarEvent-Modal-click-record-style"
            onClick={()=>AdvisorClickedTag(advisor._id,advisor.partnerName)}
            >
              <div
              className="CalendarEvent-Modal-Card-searchbox-vertical-line"
              ></div>
              <h4>{advisor.partnerName}</h4>
              </div>
            
              </div>
          )
        })}
        </div>
      :null}
                        
                          </div>
              :null}
                        </div>
                        
                        <Tag
  closable={updateEventCheck?false: true}
            visible={advisorTagVisible}
            onClose={AdvisorTagCloseFunc}
            className="CalendarEvent-Modal-Search-tag-style"
          >
          {advisorOnClickVal}
          </Tag>


                      </div>

                    </div>

            
                : (prospectCollection.phone_call == true || prospectCollection.training_prospect == true || prospectCollection.follow_up == true || prospectCollection.document_collection == true)&&prospectCheck==true ?
                  <div>
                    <div
                      className="CalendarEvent-Modal-Card-vertical-line"
                    >

                    </div>
                    <h4
                      className="CalendarEvent-Modal-Card-header-type"
                    >Search Prospect</h4>

  <div
                        className="CalendarEvent-Modal-Search-flex"
                      >
                        <div
                          className="CalendarEvent-Modal-search-style"
                        >
                          <Search placeholder="Search By Name" onSearch={searchProspect}
                          disabled={updateEventCheck?true:false}
                        type="text"
                        value={searchProspectText}
                        onChange={searchProspectTextFunc}
                            enterButton
                            className="CalendarEvent-Modal-textinput-style"
                          />
                  {prospectOnClickCheck==true?
        <div>
      {prospectArr!==null&&Array.isArray(prospectArr)?
        <div
        className="CalendarEvent-Modal-search-record-style"
        >
        {prospectArr.map((prospect)=>{
          return(
            <div>
            <div
            className="CalendarEvent-Modal-click-record-style"
            onClick={()=>ProspectClickedTag(prospect._id,prospect.firstName)}
            >
              <div
              className="CalendarEvent-Modal-Card-searchbox-vertical-line"
              ></div>
              <h4>{prospect.fullName}</h4>
              </div>
            
              </div>
          )
        })}
        </div>
      :null}
                        
                          </div>
              :null}
                        </div>
                        
                        <Tag
            closable={updateEventCheck?false: true}
            visible={prospectTagVisible}
            onClose={ProspectTagCloseFunc}
            className="CalendarEvent-Modal-Search-tag-style"
          >
          {prospectOnClickVal}
          </Tag>


                      </div>

                    </div>
                  : customerCheck == true ?
                    <div>
                      
                      <h4
                        className="CalendarEvent-Modal-Card-header-type"
                      >Search Customer</h4>


                      <div
                        className="CalendarEvent-Modal-Search-flex"
                      >
                        <div
                          className="CalendarEvent-Modal-search-style"
                        >
                          <Search placeholder="Search By Name" onSearch={searchCustomer}
                          disabled={updateEventCheck?true:false}
                        type="text"
                        value={searchCustomerText}
                        onChange={searchCustomerTextFunc}
                            enterButton
                            className="CalendarEvent-Modal-textinput-style"
                          />
                  {customerOnClickCheck==true?
        <div>
      {customerArr!==null&&Array.isArray(customerArr)?
        <div
        className="CalendarEvent-Modal-search-record-style"
        >
        {customerArr.map((cust)=>{
          return(
            <div>
            <div
            className="CalendarEvent-Modal-click-record-style"
            onClick={()=>CustomerClickedTag(cust._id,cust.custName)}
            >
              <div
              className="CalendarEvent-Modal-Card-searchbox-vertical-line"
              ></div>
              <h4>{cust.custName}</h4>
              </div>
            
              </div>
          )
        })}
        </div>
      :null}
                        
                          </div>
              :null}
                        </div>
                        
                        <Tag
            closable
            visible={customerTagVisible}
            onClose={CustomerTagCloseFunc}
            className="CalendarEvent-Modal-Search-tag-style"
          >
          {customerOnClickVal}
          </Tag>


                      </div>

                    </div> : null} */}
          {/* 
              {customerCheck == true ?
                <div>
                  <div
                    className="CalendarEvent-Modal-Card-vertical-line"
                  >
                  </div>
                  <h4>ljskjdkj</h4>
                </div>
                : null} */}
          {prospectCollection.first_meeting == true && prospectCheck == true ? (
            <div>
              <div className="CalendarEvent-Modal-prospect-meeting-textbox-flex">
                <h4
                  className={
                    prospectFirstNameCheck == false
                      ? "CalendarEvent-Modal-Card-empty-text-header-type"
                      : "CalendarEvent-Modal-Card-header-type"
                  }
                >
                  Location
                </h4>
                <input
                  value={prospectFirstNameText}
                  onChange={ProspectFirstNameFunc}
                  className={
                    prospectFirstNameCheck == false
                      ? "CalendarEvent-Modal-empty-textbox-style"
                      : "CalendarEvent-Modal-textbox-style"
                  }
                  type="text"
                  required
                />
                {prospectFirstNameCheck == false ? (
                  <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                    This field is required
                  </h4>
                ) : null}
              </div>
              <div className="CalendarEvent-Modal-prospect-meeting-textbox-flex">
                <h4
                  className={
                    prospectLastNameCheck == false
                      ? "CalendarEvent-Modal-Card-empty-text-header-type"
                      : "CalendarEvent-Modal-Card-header-type"
                  }
                >
                  Prospect Last Name *
                </h4>
                <input
                  value={prospectLastNameText}
                  onChange={ProspectLastNameFunc}
                  className={
                    prospectLastNameCheck == false
                      ? "CalendarEvent-Modal-empty-textbox-style"
                      : "CalendarEvent-Modal-textbox-style"
                  }
                  type="text"
                  required
                />
                {prospectLastNameCheck == false ? (
                  <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                    This field is required
                  </h4>
                ) : null}
              </div>
              <div className="CalendarEvent-Modal-prospect-meeting-textbox-flex">
                <h4
                  className={
                    prospectEmailRegCheck == false ||
                      prospectEmailAddressCheck == false
                      ? "CalendarEvent-Modal-Card-empty-text-header-type"
                      : "CalendarEvent-Modal-Card-header-type"
                  }
                >
                  Email Address *
                </h4>
                <input
                  value={prospectEmailAddressText}
                  onChange={ProspectEmailAddressFunc}
                  className={
                    prospectEmailRegCheck == false ||
                      prospectEmailAddressCheck == false
                      ? "CalendarEvent-Modal-empty-textbox-style"
                      : "CalendarEvent-Modal-textbox-style"
                  }
                  type="text"
                  required
                />
                {prospectEmailAddressCheck == false ? (
                  <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                    This field is required
                  </h4>
                ) : prospectEmailRegCheck == false ? (
                  <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                    Enter a valid Email
                  </h4>
                ) : null}
              </div>
              <div className="CalendarEvent-Modal-prospect-meeting-textbox-flex">
                <h4
                  className={
                    prospectMobileRegCheck == false ||
                      prospectMobileNoCheck == false
                      ? "CalendarEvent-Modal-Card-empty-text-header-type"
                      : "CalendarEvent-Modal-Card-header-type"
                  }
                >
                  Primary Phone No *
                </h4>
                <input
                  value={prospectMobileNoText}
                  onChange={ProspectMobileNoFunc}
                  className={
                    prospectMobileRegCheck == false ||
                      prospectMobileNoCheck == false
                      ? "CalendarEvent-Modal-empty-textbox-style"
                      : "CalendarEvent-Modal-textbox-style"
                  }
                  type="text"
                  required
                />
                {prospectMobileNoCheck == false ? (
                  <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                    This field is required
                  </h4>
                ) : prospectMobileRegCheck == false ? (
                  <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                    Enter a valid Mobile No
                  </h4>
                ) : null}
              </div>
            </div>
          ) : null}

          {customerCheck == true ? (
            <div>
              <div className="CalendarEvent-Modal-Card-vertical-line"></div>
              <h4 className="CalendarEvent-Modal-Card-header-type">
                Search Prospect *
              </h4>
              <div className="Todo-Create-Search calSearch">
                <AutoComplete
                  disabled={
                    updateEventCheck || teammemdisable == true ? true : false
                  }
                  value={customerData}
                  style={{ width: "100%" }}
                  options={customersearchList}
                  notFoundContent="No Result Found"
                  onChange={(text, data) => onChangeCustomerSearch(text, data)}
                  onSelect={onSelectCustomer}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                >
                  <Search placeholder="Search by Name" />
                </AutoComplete>
              </div>
              {customersearchchip?.length !== 0 && updateEventCheck == false ? (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                    alignItems: "center",
                  }}
                >
                  {customersearchchip?.map((item, index) => {
                    console.log(item, "item--team member-->");
                    return (
                      <div style={{ marginRight: 10, marginTop: 10 }}>
                        <Button
                          size="small"
                          type="primary"
                          style={{
                            backgroundColor: "#00ACC1",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                          shape="round"
                        >
                          {item}{" "}
                          <CloseOutlined
                            onClick={() => removeCustomer(item, index)}
                          />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : customersearchchip?.length !== 0 &&
                updateEventCheck == true ? (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginRight: 10, marginTop: 10 }}>
                    <Button
                      size="small"
                      type="primary"
                      style={{
                        backgroundColor: "#00ACC1",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                      shape="round"
                    >
                      {toCapitalize(customersearchchip.firstName) +
                        customersearchchip.lastName +
                        " ( " +
                        customersearchchip.lead_Id +
                        " )"}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {customerCheck == false ? (
            <div>
              <div className="CalendarEvent-Modal-Card-vertical-line"></div>
              {/* <div className="add-manually">
                    <Button
                      disabled={updateEventCheck==true?true:false}
                      className="CalendarEvent-Modal-Card-Addmanual-button-style"
                      onClick={AddManuallyFunc}
                      type="primary" icon={<PlusCircleOutlined />}>
                      Add Manually
                    </Button>
                  </div> */}

              <div className="CalendarEvent-Modal-datePicker-button-flex">
                <div className="CalendarEvent-Modal-date-column-flex">
                  <h4
                    className={
                      customerNameCheck == false
                        ? "CalendarEvent-Modal-Card-empty-text-header-type"
                        : "CalendarEvent-Modal-Card-header-type"
                    }
                  >
                    Location
                  </h4>
                  <input
                    disabled={updateEventCheck == true ? true : false}
                    value={customerNameText}
                    onChange={CustomerNameFunc}
                    onInput={prospectFirstNameValid}
                    className={
                      customerNameCheck == false
                        ? "CalendarEvent-Modal-empty-customer-textbox-style"
                        : "CalendarEvent-Modal-customer-textbox-style"
                    }
                    type="text"
                    placeholder="Enter location"
                    required
                  />
                  {customerNameCheck == false ? (
                    <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                      This field is required
                    </h4>
                  ) : null}
                  {custFirstNamevalid == true ? (
                    <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                      Only Alphabets are Allowed
                    </h4>
                  ) : null}
                </div>

                <div className="CalendarEvent-Modal-date-column-flex">
                  <h4
                    className={
                      custLastNameCheck == false
                        ? "CalendarEvent-Modal-Card-empty-text-header-type"
                        : "CalendarEvent-Modal-Card-header-type"
                    }
                  >
                    Timeline
                  </h4>
                  {/* <input
                        disabled={manualCustomerCheck==true?true:false}
                        value={customerLastNameText}
                        onChange={CustLastNameFunc}
                        onInput={prospectLastNameValid}
                        className={custLastNameCheck == false ? "CalendarEvent-Modal-empty-customer-textbox-style" : "CalendarEvent-Modal-customer-textbox-style"}
                        type="text"
                        placeholder="Enter the Name"
                        required
                      /> */}
                  <DatePicker
                    onChange={onChangeTimelineDate}
                    allowClear={false}
                    // disabled={updateEventCheck == true ? true : false}
                    defaultValue={timelineDatestring}
                    value={timelineDatestring}
                    format="DD-MM-YYYY"
                    className={"CalendarEvent-Modal-customer-textbox-style"}
                  />

                  {custLastNameCheck == false ? (
                    <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                      This field is required
                    </h4>
                  ) : null}
                  {custLastNamevalid == true ? (
                    <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                      Only Alphabets are Allowed
                    </h4>
                  ) : null}
                </div>

                <div className="CalendarEvent-Modal-Card-vertical-line"></div>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <p style={{ marginBottom: 5, color: "#646666" }}>
                    Stakeholder Name
                  </p>
                  {/* <Input
              placeholder="Enter Stakeholder Name"
              value={stakeholdrName}
              disabled={updateEventCheck == true ? true : false}
              onChange={(item) => setStakeholdrName(item.target.value)}
            /> */}
                  <input
                    value={stakeholdrName}
                    onChange={(item) => setStakeholdrName(item.target.value)}
                    disabled={updateEventCheck == true ? true : false}
                    placeholder="Enter Stakeholder Name"
                    className={"CalendarEvent-Modal-customer-textbox-style"}
                    style={{ width: "98%" }}
                    required
                  />
                </Col>

                <div className="CalendarEvent-Modal-Card-vertical-line"></div>
                <div
                  className="CalendarEvent-Modal-date-column-flex"
                  style={{ width: "100%" }}
                >
                  <h4
                    className={
                      customerMobileNoCheck == false ||
                        customermblvalid == false
                        ? "CalendarEvent-Modal-Card-empty-text-header-type"
                        : "CalendarEvent-Modal-Card-header-type"
                    }
                  >
                    Agenda
                  </h4>
                  <input
                    value={eventAgenda}
                    onChange={onChangeAgenda}
                    disabled={updateEventCheck == true ? true : false}
                    placeholder="Enter Agenda"
                    className={"CalendarEvent-Modal-customer-textbox-style"}
                    style={{ width: "98%" }}
                    required
                  />
                  {/* <input
                        disabled={manualCustomerCheck==true?true:false}
                        value={customerMobileNoText}
                        onChange={CustomerMobileNoFunc}
                        className={customerMobileNoCheck == false || customermblvalid == false ? "CalendarEvent-Modal-empty-customer-textbox-style" : "CalendarEvent-Modal-customer-textbox-style"}
                        type="number"
                        placeholder="Enter the Mobile Number"
                        required
                      /> */}
                  {/* {customerMobileNoCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}
                      {customermblvalid == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">Enter valid mobile no.</h4> : null} */}
                </div>

                <div className="CalendarEvent-Modal-Card-vertical-line"></div>

                <div
                  className="CalendarEvent-Modal-date-column-flex"
                  style={{ width: "100%" }}
                >
                  <h4
                    className={
                      customerMobileNoCheck == false ||
                        customermblvalid == false
                        ? "CalendarEvent-Modal-Card-empty-text-header-type"
                        : "CalendarEvent-Modal-Card-header-type"
                    }
                  >
                    Minutes of Meeting
                  </h4>
                  <TextArea
                    onChange={onChangeMom}
                    value={minutesofmeet}
                    className={"CalendarEvent-Modal-customer-textbox-style"}
                    placeholder="Enter"
                    style={{ width: "98%" }}
                  />
                </div>
              </div>
            </div>
          ) : null}
          {/* {customerCheck == false&&addManuallyButtonCheck==true?
              <div>
                <div className="CalendarEvent-Modal-datePicker-button-flex">
                    <div className="CalendarEvent-Modal-date-column-flex">
                      <h4 className={customerNameCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Name *</h4>
                      <input
                        disabled={manualCustomerCheck==true?true:false}
                        value={customerNameText}
                        onChange={CustomerNameFunc}
                        className={customerNameCheck == false ? "CalendarEvent-Modal-empty-customer-textbox-style" : "CalendarEvent-Modal-customer-textbox-style"}
                        type="text"
                        placeholder="Enter the Name"
                        required
                      />
                      {customerNameCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}
                    </div>
                  
                    <div className="CalendarEvent-Modal-date-column-flex">
                      <h4 className={customerMobileNoCheck  == false || customermblvalid == false  ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                      >Mobile Number *</h4>
                        <input
                        disabled={manualCustomerCheck==true?true:false}
                        value={customerMobileNoText}
                        onChange={CustomerMobileNoFunc}
                        className={customerMobileNoCheck == false || customermblvalid == false ? "CalendarEvent-Modal-empty-customer-textbox-style" : "CalendarEvent-Modal-customer-textbox-style"}
                        type="number"
                        placeholder="Enter the Mobile Number"
                        required
                      />
                      {customerMobileNoCheck == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">This field is required</h4> : null}
                      {customermblvalid == false ? <h4 className="CalendarEvent-Modal-Card-empty-text-bottom-type">Enter valid mobile no.</h4> : null}
                    </div>
                  </div>
                  <div className="CalendarEvent-Modal-Card-add-manual-flex">
                  {  manualCustomerCheck == false ? 
                  <button
                    disabled={updateEventCheck==true?true:false}
                    onClick={ManualCustomerSubmitFunc}
                    className={ "CalendarEvent-Modal-Card-eventwith-onclick-button-style" }>Submit
                  </button> 
                  : 
                  <Tag
                    closable={updateEventCheck?false: true}
                    visible={addCustTagVisible}
                    onClose={AddCustomerTagVisibleFunc}
                    className="CalendarEvent-Modal-Search-tag-style">
                    {customerNameText}
                  </Tag>}
                </div>
              </div>
            : null} */}

          <hr
            style={{
              width: "100%",
              backgroundColor: "#d9dbd1",
              // height: '0.1vw',
              marginTop: "20px",
              marginBottom: "20px",
              opacity: ".2",
            }}
          />

          <div className="CalendarEvent-Modal-date-column-flex">
            <h4 className="CalendarEvent-Modal-Card-header-type">Modes *</h4>
            <div className="Input-date">
              <select
                value={modeSelect}
                onChange={ModeChangeFunc}
                className="CalendarEvent-Modal-TimePicker-style"
              // className="CalendarEvent-Modal-TimePicker-style"
              >
                <option value="">Select</option>

                {modeList.map((time) => {
                  return (
                    <option value={time.value}>{time.dispValue}</option>
                    //  <option value={editStartTime} selected>{editStartDisp}</option>
                  );
                })}
              </select>
              {/* {durationStartTimeDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Time should be less than end time</p> : null} */}
              {/* <TimePicker onChange={StartTimeFunc}
                      value={durationStartTime}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                      className="CalendarEvent-Modal-picker-style"
                    /> */}
            </div>
          </div>

          <hr
            style={{
              width: "100%",
              backgroundColor: "#d9dbd1",
              // height: '0.1vw',
              marginTop: "20px",
              marginBottom: "20px",
              opacity: ".2",
            }}
          />
          <h4 className="CalendarEvent-Modal-Card-header-type">Duration</h4>
          <div className="CalendarEvent-Modal-Card-time-duration-flex">
            <button
              onClick={DurationSelectTimeFunc}
              value={eventDurationType}
              className={
                durationButton.select_time == true
                  ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                  : "CalendarEvent-Modal-Card-eventwith-static-button-style"
              }
            >
              Select Time
            </button>
            <button
              onClick={DurationAllDayFunc}
              value={eventDurationType}
              className={
                durationButton.all_day == true
                  ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                  : "CalendarEvent-Modal-Card-eventwith-static-button-style"
              }
            >
              All Day
            </button>
          </div>

          {durationButton.select_time == true ? (
            <div>
              <div className="CalendarEvent-Modal-datePicker-button-flex">
                <div className="CalendarEvent-Modal-date-column-flex">
                  {/* {console.log(durationStartDate, 'start date--- in code--->')} */}
                  <h4
                    className={
                      durationStartDateDiffCheck == false
                        ? "CalendarEvent-Modal-Card-empty-text-header-type"
                        : "CalendarEvent-Modal-Card-header-type"
                    }
                  // className="CalendarEvent-Modal-Card-header-type"
                  >
                    Start Date *
                  </h4>
                  <div className="Input-date" style={{ marginTop: 10 }}>
                    <DatePicker
                      onChange={StartDateFunc}
                      allowClear={false}
                      // disabledDate={(d) => !d || d.isBefore(minimumDate)}
                      defaultValue={durationStartDate}
                      value={durationStartDate}
                      format="YYYY-MM-DD"
                      className={
                        durationStartDateDiffCheck == false
                          ? "CalendarEvent-Modal-empty-picker-style"
                          : "CalendarEvent-Modal-picker-style"
                      }
                    // className="CalendarEvent-Modal-picker-style"
                    />

                    {durationStartDateDiffCheck == false ? (
                      <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                        Start Date should not be after the End date
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="CalendarEvent-Modal-date-column-flex">
                  <h4
                    className={
                      durationStartTimeDiffCheck == false
                        ? "CalendarEvent-Modal-Card-empty-text-header-type"
                        : "CalendarEvent-Modal-Card-header-type"
                    }
                  // className="CalendarEvent-Modal-Card-header-type"
                  >
                    Start Time *
                  </h4>
                  <div className="Input-date">
                    <select
                      value={startTimeSelect}
                      onChange={StartTimeChangeFunc}
                      className={
                        durationStartTimeDiffCheck == false
                          ? "CalendarEvent-Modal-empty-TimePicker-style"
                          : "CalendarEvent-Modal-TimePicker-style"
                      }
                    // className="CalendarEvent-Modal-TimePicker-style"
                    >
                      <option value="">Select</option>

                      {timeList.map((time) => {
                        return (
                          <option value={time.value}>{time.dispValue}</option>
                          //  <option value={editStartTime} selected>{editStartDisp}</option>
                        );
                      })}
                    </select>
                    {durationStartTimeDiffCheck == false ? (
                      <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                        Start Time should be less than end time
                      </p>
                    ) : null}
                    {/* <TimePicker onChange={StartTimeFunc}
                      value={durationStartTime}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                      className="CalendarEvent-Modal-picker-style"
                    /> */}
                  </div>
                </div>
              </div>
              {/* <div
                className="CalendarEvent-Modal-duration-style"
              >
                <div
                  className="CalendarEvent-Modal-datePicker-button-flex"
                >
                  <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    <h4
                      className={durationEndDateDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                    >End Date *</h4>
                    <div className="Input-date" style={{ marginTop: 10 }}>
                      <DatePicker onChange={EndDateFunc}
                        allowClear={false}
                        disabledDate={d => !d || d.isBefore(minimumDate)}
                        format="YYYY-MM-DD"
                        value={durationEndDate}
                        className="CalendarEvent-Modal-picker-style"
                      />
                      {durationEndDateDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Date should be after start date</p> : null}
                    </div>
                  </div>
                  <div
                    className="CalendarEvent-Modal-date-column-flex"
                  >
                    <h4
                      className={durationEndTimeDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                    // className="CalendarEvent-Modal-Card-header-type"
                    >End Time *</h4>
                    <div className="Input-date">
                      <select
                        value={endTimeSelect}
                        onChange={EndTimeChangeFunc}

                        className={durationEndTimeDiffCheck == false ? "CalendarEvent-Modal-empty-TimePicker-style" : "CalendarEvent-Modal-TimePicker-style"}
                      >
                        <option value="" >Select</option>
                        {timeList.map((time) => {
                          return (
                            <option value={time.value}>{time.dispValue}</option>
                          )
                        })}

                      </select>
                      {durationEndTimeDiffCheck == false ?

                        <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End time should not be past start time</p>

                        : durationEndTimeSameCheck == false ?

                          <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Time should not be Same from the Start Time</p>

                          : null}

                    </div>
                  </div>

                </div>

              </div> */}
            </div>
          ) : (
            <div>
              <div className="CalendarEvent-Modal-datePicker-button-flex">
                <div className="CalendarEvent-Modal-date-column-flex">
                  <h4 className="CalendarEvent-Modal-Card-header-type">
                    Start Date *
                  </h4>
                  <div className="Input-date">
                    <DatePicker
                      onChange={allDayStartDate}
                      allowClear={false}
                      disabledDate={(d) => !d || d.isBefore(minimumDate)}
                      defaultValue={durationStartDate}
                      value={durationStartDate}
                      format="YYYY-MM-DD"
                      className={
                        durationStartDateDiffCheck == false
                          ? "CalendarEvent-Modal-empty-picker-style"
                          : "CalendarEvent-Modal-picker-style"
                      }
                    // className="CalendarEvent-Modal-picker-style"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="CalendarEvent-Modal-Card-vertical-line"></div>

          <div className="CalendarEvent-Modal-date-column-flex">
            <h4 className="CalendarEvent-Modal-Card-header-type">Duration </h4>
            <div className="Input-date">
              <select
                value={durationSelect}
                onChange={DurationChangeFunc}
                className="CalendarEvent-Modal-TimePicker-style"
              // className="CalendarEvent-Modal-TimePicker-style"
              >
                <option value="">Select</option>

                {durationList.map((time) => {
                  return (
                    <option value={time.value}>{time.dispValue}</option>
                    //  <option value={editStartTime} selected>{editStartDisp}</option>
                  );
                })}
              </select>
              {/* {durationStartTimeDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Time should be less than end time</p> : null} */}
              {/* <TimePicker onChange={StartTimeFunc}
                      value={durationStartTime}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                      className="CalendarEvent-Modal-picker-style"
                    /> */}
            </div>
          </div>

          <div className="CalendarEvent-Modal-Card-vertical-line"></div>

          <h4 className="CalendarEvent-Modal-Card-header-type">
            Add Team Member
          </h4>
          <div className="Todo-Create-Search calSearch">
            {/* <input type='text' placeholder='Search by Name'/> */}
            {/* <SearchOutlined /> */}
            {/* <Input addonAfter={<SearchOutlined />} placeholder="Search by Name" /> */}
            {/* <Search placeholder="Search by Name" onSearch={onSearch}  /> */}
            <AutoComplete
              disabled={updateEventCheck ? true : false}
              value={teamMemberData}
              style={{ width: "100%" }}
              options={hierarAgentList}
              onChange={(text, data) => onChangeTeam(text, data)}
              onSelect={onSelectTeam}
              notFoundContent="No Result Found"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            >
              <Search placeholder="Search by Name" />
            </AutoComplete>
          </div>
          {/* {console.log(teamMemberChip,'team member chip----->')} */}
          {teamMemberChip?.length !== 0 && (
            <div
              style={{
                display: "flex",
                flexFlow: "wrap",
                alignItems: "center",
              }}
            >
              {teamMemberChip?.map((item, index) => {
                // console.log(item,'item--team member-->')
                return (
                  <div style={{ marginRight: 10, marginTop: 10 }}>
                    {updateEventCheck == true ? (
                      <Button
                        size="small"
                        type="primary"
                        style={{
                          backgroundColor: "#00ACC1",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                        shape="round"
                      >
                        {item.value}{" "}
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        type="primary"
                        style={{
                          backgroundColor: "#00ACC1",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                        shape="round"
                      >
                        {item}{" "}
                        <CloseOutlined
                          onClick={() => removeTeamMember(item, index)}
                        />
                      </Button>
                    )}{" "}
                  </div>
                );
              })}
            </div>
          )}
          {/* <div className="CalendarEvent-Modal-Search-flex">
            <Search placeholder="Search By Name" 
            disabled={updateEventCheck?true:false}
           value={searchTeamText}
           onChange={searchTeamTextFunc}
              enterButton
              className="CalendarEvent-Modal-textinput-style"
            />
             {searchTeamText!==""&&searchTeamText.length>=3?
       <div>
     {teamArr!==null&&Array.isArray(teamArr)?
      <div
      className="CalendarEvent-Modal-search-record-style"
      >
      {teamArr.map((team)=>{
        return(
          <div>
          <div
          className="CalendarEvent-Modal-click-record-style"
          onClick={()=>{}}
          >
             <div
            className="CalendarEvent-Modal-Card-searchbox-vertical-line"
            ></div>
            <h4>{team.name}</h4>
            </div>
           
            </div>
        )
      })}
      </div>
     :null}
                      
                        </div>
            :null}
            </div>
                       <Tag
          closable={updateEventCheck?false: true}
          visible={teamTagVisible}
          onClose={TeamTagCloseFunc}
          className="CalendarEvent-Modal-Search-tag-style"
        >
        {teamOnClickVal}
        </Tag> */}
          {/* {console.log(ownerCollectn, 'owner--->')} */}
          <div className="CalendarEvent-Modal-Card-vertical-line"></div>
          <h4 className="CalendarEvent-Modal-Card-header-type">Status</h4>

          <div className="CalendarEvent-Modal-Card-status-flex">
            <button
              value={eventStatus}
              onClick={StatusTypeOpenFunc}
              className={
                statusType.openStatus == true
                  ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                  : "CalendarEvent-Modal-Card-eventwith-static-button-style"
              }
            >
              Open
            </button>
            <button
              value={eventStatus}
              onClick={StatusTypeCloseFunc}
              className={
                statusType.closeStatus == true
                  ? "CalendarEvent-Modal-Card-status-onclick-button-style"
                  : "CalendarEvent-Modal-Card-status-static-button-style"
              }
            >
              Close
            </button>
          </div>
          {statusType.closeStatus == true ? (
            <div className="CalendarEvent-Modal-Card-close-textbox-flex">
              <input
                value={statusReasonText}
                onChange={StatusTypeReasonFunc}
                className="CalendarEvent-Modal-Card-close-textbox-style"
                type="text"
                placeholder="Enter the reason"
                style={{ padding: 10 }}
              />
            </div>
          ) : null}
        </div>

        {/* </div> */}
        <div className="CalendarEvent-Modal-book-appointment-flex">
          <button
            // onClick={() => { }}
            className={"CalendarEvent-Modal-book-appointment-button-style"}
            onClick={bookAppointmentAPI}
          >
            {updateEventCheck == true
              ? "Update Appointment"
              : "Book Appointment"}
          </button>
        </div>
        {/* <Card>
  <h4>jasjkhdsaj</h4>
</Card> */}
        {/* <input type="text" value={eventText} onChange={OnChangeEventText}/>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <TimePicker 
       value={moment(value, format)}
       onChange={OnTimeChange}
      defaultValue={moment('12:00', format)} format={format} />
      <TimePicker 
       value={moment(endVal, format)}
       onChange={OnEndTimeChange}
      defaultValue={moment('12:00', format)} format={format} /> */}
      </Modal>
    </div>
  );
}
