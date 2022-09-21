import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import "./LeadCards.css";
import _ from "lodash";
import { Row, Col, Avatar, Card, Select } from "antd";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import { useDispatch, useSelector } from "react-redux";
import { AllocateModal } from "../Tab/Allocate";
import { stoageSetter} from '../../helpers';
import * as actions from "../../store/actions/leads";
// stoageSetter('user', user);

import {
  getTeamMainTabApi,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,
  getOpenTabApi,
  getFortodayTabApi,
  getFailedTabApi,
} from "../../components/actions/allleadAction";

import { fetchAllLeadsSuccess } from "../../store/actions/leads";

const { Option } = Select;

const LeadCards = (props) => {
  const leadsData = useSelector((state) => state.leads);
  const loginState = useSelector((state) => state.login);
  const userTreeData = useSelector((state) => state?.home?.user_tree)
  // console.warn('leadsData==========>>>>>>>',leadsData.allLeads)
  const { user } = loginState;
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [firsrDrop, setFirstDrop] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [firstValue, setFirstValue] = useState("Select");
  const [secondDropData, setSecondDropData] = useState([]);
  const [secondValue, setSecondValue] = useState("Select");
  // const [hierarAgentList ,setHierarAgentList]=useState([])

  const [cards, setcard] = useState([]);
  let reporting_hierarchies = [
    {
       "value":"60e5d5636b18e8309da3fa39",
       "dispValue":"Zonal Manager"
    },
    {
       "value":"60e5d5446b18e8309da3fa36",
       "dispValue":"Area Sales Manager"
    },
    {
       "value":"60bf91164bf8de6b61b4b064",
       "dispValue":"Sales Manager"
    }
 ]
 let reporting_users = [
    {
       "_id":"60e5d6056b18e8309da3fa4b",
       "primary_email":"calvin@grr.la",
       "mobile_no":"9607691245",
       "reporting_manager":"60e5d6056b18e8309da3fa49",
       "active":1,
       "employeeCode":"631972",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"calvin",
       "last_name":"robert",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"calvin robert"
    },
    {
       "_id":"60edb0e28ac1941f0185b6c6",
       "primary_email":"lonel@grr.la",
       "mobile_no":"9833816111",
       "reporting_manager":"60e5d6056b18e8309da3fa49",
       "active":1,
       "employeeCode":"43254",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"lonel",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"lonel k"
    },
    {
       "_id":"61d3244c60886a6cf0041ad0",
       "primary_email":"rue@grr.la",
       "mobile_no":"9846680000",
       "reporting_manager":"60e5d6056b18e8309da3fa49",
       "active":1,
       "employeeCode":"631972",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"rue",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"rue k"
    },
    {
       "_id":"61e913de2959386255dd4d7f",
       "primary_email":"VijayS@grr.la",
       "mobile_no":"9967203301",
       "reporting_manager":"60e5d6056b18e8309da3fa49",
       "active":1,
       "employeeCode":"43254",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"vijay",
       "last_name":"s",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"vijay s"
    },
    {
       "_id":"61f270d796624a478ba0dbb6",
       "primary_email":"Rani@grr.la",
       "mobile_no":"460126799",
       "reporting_manager":"60e5d6056b18e8309da3fa49",
       "active":1,
       "employeeCode":"631972",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"rani",
       "last_name":"kumar",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"rani kumar"
    },
    {
       "_id":"61f4d93fba8c30151fba8b71",
       "primary_email":"Bhagya22@grr.la",
       "mobile_no":"460126799",
       "reporting_manager":"60e5d6056b18e8309da3fa49",
       "active":1,
       "employeeCode":"631972",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"bhagya",
       "last_name":"l",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"bhagya l"
    },
    {
       "_id":"60bf92924bf8de6b61b4b075",
       "primary_email":"ankit@grr.la",
       "mobile_no":"9925269784",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"367999",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"ankit",
       "last_name":"singh",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"ankit singh"
    },
    {
       "_id":"60e5d6056b18e8309da3fa4a",
       "primary_email":"rahul@grr.la",
       "mobile_no":"9720925234",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"rahul",
       "last_name":"patil",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"rahul patil"
    },
    {
       "_id":"60edb0e28ac1941f0185b6c9",
       "primary_email":"otter@grr.la",
       "mobile_no":"9833816110",
       "reporting_manager":"60edb0e28ac1941f0185b6c6",
       "active":1,
       "employeeCode":"43253",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"otter",
       "last_name":"j",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"otter j"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d0",
       "primary_email":"azal@grr.la",
       "mobile_no":"9833816108",
       "reporting_manager":"60edb0e28ac1941f0185b6c6",
       "active":1,
       "employeeCode":"43251",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"azal",
       "last_name":"q",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"azal q"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d4",
       "primary_email":"sawa@grr.la",
       "mobile_no":"9833816109",
       "reporting_manager":"60edb0e28ac1941f0185b6c6",
       "active":1,
       "employeeCode":"43252",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"sawa",
       "last_name":"u",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"sawa u"
    },
    {
       "_id":"61d406959bd0e2031306594e",
       "primary_email":"divya@grr.la",
       "mobile_no":"9987570001",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"wenter",
       "last_name":"a",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"wenter a"
    },
    {
       "_id":"61d4088ff7e9bd04a0055b89",
       "primary_email":"Jhanvi@grr.la",
       "mobile_no":"9568598661",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"jhanvi",
       "last_name":"bhanu",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"jhanvi bhanu"
    },
    {
       "_id":"61d677ba16c27b48bee1c592",
       "primary_email":"Gori@grr.la",
       "mobile_no":"9568598661",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"gori",
       "last_name":"ali",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"gori ali"
    },
    {
       "_id":"61d677ba16c27b48bee1c593",
       "primary_email":"rahul@grr.la",
       "mobile_no":"9720925234",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"rahul",
       "last_name":"patil",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"rahul patil"
    },
    {
       "_id":"61d6bbb6916b5074fd46f80e",
       "primary_email":"Pawan@grr.la",
       "mobile_no":"9565593661",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"367999",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"pawan",
       "last_name":"khan",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"pawan khan"
    },
    {
       "_id":"61d6bcb6916b5074fd46f811",
       "primary_email":"Yash33@grr.la",
       "mobile_no":"7134343444",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"367999",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"yash",
       "last_name":"khan",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"yash khan"
    },
    {
       "_id":"61d6bd35916b5074fd46f814",
       "primary_email":"Jhanvi22@grr.la",
       "mobile_no":"7134343444",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"367999",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"jhanvi",
       "last_name":"kappor",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"jhanvi kappor"
    },
    {
       "_id":"61d70d6d916b5074fd46f829",
       "primary_email":"Nitin33@grr.la",
       "mobile_no":"7834343444",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"367999",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"nitin",
       "last_name":"kumar",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"nitin kumar"
    },
    {
       "_id":"61d71031916b5074fd46f82c",
       "primary_email":"Nitin3390@grr.la",
       "mobile_no":"7834343444",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"367999",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"nitin",
       "last_name":"kumar",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"nitin kumar"
    },
    {
       "_id":"61d71099916b5074fd46f82f",
       "primary_email":"Queen33@grr.la",
       "mobile_no":"7834343444",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"367999",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"queen",
       "last_name":"hj",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"queen hj"
    },
    {
       "_id":"61e6543660746d374d0cdb1a",
       "primary_email":"Lortha@grr.la",
       "mobile_no":"9966736755",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"lorta",
       "last_name":"n",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"lorta n"
    },
    {
       "_id":"61e659a871d0f03aba372ee3",
       "primary_email":"vaibhav@grr.la",
       "mobile_no":"9966736755",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"vaibhav",
       "last_name":"b",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"vaibhav b"
    },
    {
       "_id":"61e802492959386255dd4d32",
       "primary_email":"latha@grr.la",
       "mobile_no":"9966736751",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"latha",
       "last_name":"kumar",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"latha kumar"
    },
    {
       "_id":"61ef9c162556a42dc5ff962f",
       "primary_email":"Suraj22@grr.la",
       "mobile_no":"9987574946",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"suraj",
       "last_name":"n",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"suraj n"
    },
    {
       "_id":"61efa4b22556a42dc5ff964c",
       "primary_email":"osmam@grr.la",
       "mobile_no":"9987574946",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"osmam",
       "last_name":"b",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"osmam b"
    },
    {
       "_id":"61efa5f22556a42dc5ff9653",
       "primary_email":"Neetu@grr.la",
       "mobile_no":"95867611111",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"neetu",
       "last_name":"b",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"neetu b"
    },
    {
       "_id":"61efa6ff2556a42dc5ff9658",
       "primary_email":"Pusha@grr.la",
       "mobile_no":"85867611111",
       "reporting_manager":"60e5d6056b18e8309da3fa4b",
       "active":1,
       "employeeCode":"532271",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"pusha",
       "last_name":"kumar",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"pusha kumar"
    },
    {
       "_id":"620508b9046f811dc31683dc",
       "primary_email":"ron@grr.la",
       "mobile_no":"9844786218",
       "reporting_manager":"60edb0e28ac1941f0185b6c6",
       "active":1,
       "employeeCode":"43253",
       "hierarchy_id":"60e5d5446b18e8309da3fa36",
       "designation":"60e5d5ab6b18e8309da3fa41",
       "first_name":"ron",
       "last_name":"weasly",
       "hierarchy_details":{
          "hierarchyName":"Area Sales Manager"
       },
       "full_name":"ron weasly"
    },
    {
       "_id":"620668ab046f811dc3168457",
       "primary_email":"VijayB@grr.la",
       "mobile_no":"9967203302",
       "reporting_manager":"60edb0e28ac1941f0185b6c6",
       "active":1,
       "employeeCode":"123456",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"vijaya",
       "last_name":"b",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"vijaya b"
    },
    {
       "_id":"620669ce046f811dc316845a",
       "primary_email":"TejasS@grr.la",
       "mobile_no":"9820330123",
       "reporting_manager":"60edb0e28ac1941f0185b6c6",
       "active":1,
       "employeeCode":"1243",
       "hierarchy_id":"60e5d5636b18e8309da3fa39",
       "designation":"60e5d5c26b18e8309da3fa43",
       "first_name":"tejas",
       "last_name":"s",
       "hierarchy_details":{
          "hierarchyName":"Zonal Manager"
       },
       "full_name":"tejas s"
    },
    {
       "_id":"60bf92924bf8de6b61b4b06d",
       "primary_email":"monika.gautam@grr.la",
       "mobile_no":"9315213558",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"534040",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"monika",
       "last_name":"gautam",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"monika gautam"
    },
    {
       "_id":"60bf92924bf8de6b61b4b06e",
       "primary_email":"varsha.poddar@grr.la",
       "mobile_no":"7483255796",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"533996",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"varsha",
       "last_name":"poddar",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"varsha poddar"
    },
    {
       "_id":"60bf92924bf8de6b61b4b06c",
       "primary_email":"priyanka.bishnoi@grr.la",
       "mobile_no":"8890992421",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"528580",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"priyanka",
       "last_name":"bishnoi",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"priyanka bishnoi"
    },
    {
       "_id":"60bf92924bf8de6b61b4b070",
       "primary_email":"prajapati.manilal@grr.la",
       "mobile_no":"9925269782",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"551721",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"prajapati",
       "last_name":"gaurangkumar",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"prajapati gaurangkumar"
    },
    {
       "_id":"60bf92924bf8de6b61b4b073",
       "primary_email":"rahul.gandla@grr.la",
       "mobile_no":"8121510258",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"529948",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"rahul",
       "last_name":"gandla",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"rahul gandla"
    },
    {
       "_id":"60bf92924bf8de6b61b4b074",
       "primary_email":"santosh.sinha1@grr.la",
       "mobile_no":"9709555619",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"369172",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"santosh",
       "last_name":"kumar",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"santosh kumar"
    },
    {
       "_id":"60db2cbede252f4076f35be9",
       "primary_email":"nehrt@grr.la",
       "mobile_no":"9898639301",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"346900",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"nehrt",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"nehrt k"
    },
    {
       "_id":"60db3323e3fe827d6dddc66a",
       "primary_email":"swarna@grr.la",
       "mobile_no":"9898639301",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"346902",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"swarna",
       "last_name":"s",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"swarna s"
    },
    {
       "_id":"60e5cfa26b18e8309da3fa2b",
       "primary_email":"sushmita@grr.la",
       "mobile_no":"8098638300",
       "reporting_manager":"60e5d6056b18e8309da3fa4a",
       "active":1,
       "employeeCode":"357170",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"sushmita",
       "last_name":"pataka",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"sushmita pataka"
    },
    {
       "_id":"60edb0e28ac1941f0185b6c4",
       "primary_email":"peh@grr.la",
       "mobile_no":"9833816096",
       "reporting_manager":"60edb0e28ac1941f0185b6d4",
       "active":1,
       "employeeCode":"43239",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"peh",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"peh k"
    },
    {
       "_id":"60edb0e28ac1941f0185b6c7",
       "primary_email":"smitha@grr.la",
       "mobile_no":"9833816095",
       "reporting_manager":"60edb0e28ac1941f0185b6d0",
       "active":1,
       "employeeCode":"43238",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"smitha",
       "last_name":"s",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"smitha s"
    },
    {
       "_id":"60edb0e28ac1941f0185b6c5",
       "primary_email":"simran@grr.la",
       "mobile_no":"9833816105",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43248",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"simran",
       "last_name":"p",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"simran p"
    },
    {
       "_id":"60edb0e28ac1941f0185b6c8",
       "primary_email":"manish@grr.la",
       "mobile_no":"9833816099",
       "reporting_manager":"60edb0e28ac1941f0185b6d4",
       "active":1,
       "employeeCode":"43242",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"manish",
       "last_name":"p",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"manish p"
    },
    {
       "_id":"60edb0e28ac1941f0185b6cc",
       "primary_email":"piku@grr.la",
       "mobile_no":"9833816104",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43247",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"piku",
       "last_name":"d",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"piku d"
    },
    {
       "_id":"60edb0e28ac1941f0185b6ca",
       "primary_email":"pavan@grr.la",
       "mobile_no":"9833816093",
       "reporting_manager":"60edb0e28ac1941f0185b6d0",
       "active":1,
       "employeeCode":"43236",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"pavan",
       "last_name":"l",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"pavan l"
    },
    {
       "_id":"60edb0e28ac1941f0185b6cb",
       "primary_email":"bunty@grr.la",
       "mobile_no":"9833816094",
       "reporting_manager":"60edb0e28ac1941f0185b6d0",
       "active":1,
       "employeeCode":"43237",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"bunty",
       "last_name":"q",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"bunty q"
    },
    {
       "_id":"60edb0e28ac1941f0185b6cd",
       "primary_email":"keval@grr.la",
       "mobile_no":"9833816100",
       "reporting_manager":"60edb0e28ac1941f0185b6d4",
       "active":1,
       "employeeCode":"43243",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"keval",
       "last_name":"h",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"keval h"
    },
    {
       "_id":"60edb0e28ac1941f0185b6ce",
       "primary_email":"reshma@grr.la",
       "mobile_no":"9833816091",
       "reporting_manager":"60edb0e28ac1941f0185b6d0",
       "active":1,
       "employeeCode":"43234",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"reshma",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"reshma k"
    },
    {
       "_id":"60edb0e28ac1941f0185b6cf",
       "primary_email":"parj@grr.la",
       "mobile_no":"9833816098",
       "reporting_manager":"60edb0e28ac1941f0185b6d4",
       "active":1,
       "employeeCode":"43241",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"parj",
       "last_name":"h",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"parj h"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d1",
       "primary_email":"jay@grr.la",
       "mobile_no":"9833816102",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43245",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"jay",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"jay k"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d2",
       "primary_email":"shweta@grr.la",
       "mobile_no":"9833816092",
       "reporting_manager":"60edb0e28ac1941f0185b6d0",
       "active":1,
       "employeeCode":"43235",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"shweta",
       "last_name":"s",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"shweta s"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d3",
       "primary_email":"sheniz@grr.la",
       "mobile_no":"9833816097",
       "reporting_manager":"60edb0e28ac1941f0185b6d4",
       "active":1,
       "employeeCode":"43240",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"sheniz",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"sheniz k"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d5",
       "primary_email":"zeel@grr.la",
       "mobile_no":"9833816106",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43249",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"zeel",
       "last_name":"j",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"zeel j"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d6",
       "primary_email":"pranay@grr.la",
       "mobile_no":"9833816101",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43244",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"pranay",
       "last_name":"q",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"pranay q"
    },
    {
       "_id":"60edb0e28ac1941f0185b6d7",
       "primary_email":"neha@grr.la",
       "mobile_no":"9833816103",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43246",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"neha",
       "last_name":"q",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"neha q"
    },
    {
       "_id":"61e7c28971d0f03aba372f59",
       "primary_email":"simo@grr.la",
       "mobile_no":"986745678",
       "reporting_manager":"60edb0e28ac1941f0185b6d0",
       "active":1,
       "employeeCode":"43237",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"simon",
       "last_name":"j",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"simon j"
    },
    {
       "_id":"61e7c28971d0f03aba372f5a",
       "primary_email":"sweet@grr.la",
       "mobile_no":"986745679",
       "reporting_manager":"60edb0e28ac1941f0185b6d0",
       "active":1,
       "employeeCode":"43235",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"sweety",
       "last_name":"pr",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"sweety pr"
    },
    {
       "_id":"61e7d4d82959386255dd4d0d",
       "primary_email":"saurabh@grr.la",
       "mobile_no":"986745680",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43249",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"saurabh",
       "last_name":"z",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"saurabh z"
    },
    {
       "_id":"61efcb232556a42dc5ff967a",
       "primary_email":"Priyr44@grr.la",
       "mobile_no":"988965868",
       "reporting_manager":"60e5d6056b18e8309da3fa4a",
       "active":1,
       "employeeCode":"357170",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"priyua",
       "last_name":"nm",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"priyua nm"
    },
    {
       "_id":"61efcc222556a42dc5ff9681",
       "primary_email":"Narendra@grr.la",
       "mobile_no":"8601246799",
       "reporting_manager":"60e5d6056b18e8309da3fa4a",
       "active":1,
       "employeeCode":"357170",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"narendra",
       "last_name":"ab",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"narendra ab"
    },
    {
       "_id":"61f2a2f0edea845ae5269de6",
       "primary_email":"AniketK@grr.la",
       "mobile_no":"9867451234",
       "reporting_manager":"60edb0e28ac1941f0185b6c9",
       "active":1,
       "employeeCode":"43249",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"aniket",
       "last_name":"k",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"aniket k"
    },
    {
       "_id":"61fd422a61b57d247b5f7215",
       "primary_email":"hassank12@grr.la",
       "mobile_no":"9004328492",
       "reporting_manager":"60bf92924bf8de6b61b4b075",
       "active":1,
       "employeeCode":"533996",
       "hierarchy_id":"60bf91164bf8de6b61b4b064",
       "designation":"60bf918a4bf8de6b61b4b068",
       "first_name":"hassan",
       "last_name":"shaikh",
       "hierarchy_details":{
          "hierarchyName":"Sales Manager"
       },
       "full_name":"hassan shaikh"
    }
 ]

 useEffect(() => {
    setFirstValue('Select');
    setSecondValue('Select');
    setOpenSecond(false)
 },[leadsData.globalTab])

  useEffect(() => {
    if (leadsData?.globalTab === "team") getDataForFirstDropdownTeam();
  }, [leadsData]);

  const getDataForFirstDropdownTeam = () => {
    // const response = await getFirstDropdownValueApi(user && user.id);
    // if (response.status == 200) {
    //   if (response?.data?.errMsg?.reporting_hierarchies) {
    //     setFirstDrop(response?.data?.errMsg.reporting_hierarchies);
    //     setSecondDropData(response?.data?.errMsg.reporting_users);
    //   }
    // } else {
    //   throw response?.data?.errMsg;
    // }

    if(userTreeData.length > 0){
      // if(userTreeData.length == 0){
      userTreeData.reporting_hierarchies.forEach(el =>{ el.label = el.dispValue })
      // reporting_hierarchies.forEach(el =>{ el.label = el.dispValue })
      userTreeData.reporting_users.forEach(el =>{ 
      // reporting_users.forEach(el =>{ 
        el.label = el.full_name
        el.value = el._id 
      })
      setFirstDrop(userTreeData.reporting_hierarchies)
      // setFirstDrop(reporting_hierarchies)
      // console.warn('firstDrop((((((((((===>>>>>>>>>>', firsrDrop)
    }

  };

  useEffect(() => {
    // if (secondValue) {
      // getDataAfterFilterTeam()
      cardShow();
    // }
  }, [leadsData.allLeads]);

  // useEffect(() => {
  //   // if (secondValue) {
  //   // getDataAfterFilterTeam()
  //   cardShow();
  //   // }
  // }, []);

  // const getDataForSecondDropdownTeam = async () => {
  //   const response = await getSecondDropdownValueApi()
  //   if (response.status == 200) {
  //     if (response?.data?.errMsg) {
  //       const filterValue = []
  //       const dropDownData = []
  //       _.map(response.data.errMsg, function (layar) {
  //         return _.map(layar, function (layarTwo) {
  //           filterValue.push(layarTwo[0])
  //         })
  //       })
  //       filterValue &&
  //         _.map(filterValue, function (layar) {
  //           _.map(layar.subCategories, function (data) {
  //             dropDownData.push(data)
  //           })
  //         })
  //       setSecondDropData(dropDownData)
  //     }
  //   } else {
  //     throw response?.data?.errMsg
  //   }
  // }
  const handleFirstDropdown = (event) => {
    // console.warn('event___HIERARCHYYY((((((((((===>>>>>>>>>>', event)
    event ? setOpenSecond(true) : setOpenSecond(false);
    setFirstValue(event);
    // stoageSetter('teamMemberId', event);
    userTreeData.reporting_users.forEach(el =>{ 
      el.label = el.full_name
      el.value = el._id 
    })
    // let _teamData = reporting_users.filter(el => el.hierarchy_id === event)
    let _teamData = userTreeData.reporting_users.filter(el => el.hierarchy_id === event)
    // console.warn('_teamData((((((((((===>>>>>>>>>>', _teamData)
    setSecondDropData(_teamData);
  };
  const handleSecondDropdown = (event) => {
    // console.warn('event___TEAMM MEMBER((((((((((===>>>>>>>>>>', event)
    setSecondValue(event);
    stoageSetter('teamMemberId', event);
    dispatch(actions.fetchAllLeads(event,'all',1))
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const cardShow = () => {
    if (secondValue) {
      let newCards = leadsData.allLeads
      // .filter((data) => 
      //   data.reporting_manager === secondValue
      // );
      // console.warn('leAD___CARDSSSSSS',newCards)

      if (_.isEmpty(newCards)) {
        return (
          <>
            <div className="dropdown-container">
              {leadsData?.globalTab === "team" && (
                <div>
                  <p style={{ marginLeft: "3.8rem", marginBottom: "5px" }}>Select Hierarchy</p>
                  <Select
                    className="firstdropdown"
                    value={firstValue}
                    style={{width: 150,marginLeft: "60px",marginBottom:15}}
                    onChange={handleFirstDropdown}
                    placeholder="Select Hierarchy"
                    options={firsrDrop}
                  >
                  </Select>
                </div>
              )}
              {openSecond && leadsData?.globalTab === "team" && (
                <div>
                  <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>Select Team Member</p>
                  <Select
                    className="seconddropdown"
                    value={secondValue}
                    style={{width: 150,marginLeft: "20px",marginBottom:15}}
                    onChange={ (item) => handleSecondDropdown(item)}
                    placeholder="Select Team Member"
                    options={secondDropData}
                  ></Select>
                </div>
              )}
            </div>
          
            <NoRecordsFound />
          </>
        );
      }
      if (!_.isEmpty(newCards)) {
        let card = [];
        card = _.map(newCards, (lead, index) => {
          
          return (
            <>
              <Col sm={18} md={18} lg={11} xl={11}>
                <LeadCard
                  className="lead-agent-card"
                  key={lead.id}
                  id={lead.id}
                  lead_Id={""}
                  leadStatus={lead.status}
                  leadName={lead.personName}
                  // firstName={lead.first_name}
                  // lastName={lead.last_name}
                  created_date={""}
                  allocatedDate={""}
                  primaryMobile={""}
                  allocatedBy={""}
                  allocatedTo={""}
                  appointmentOn={""}
                  loading={props.leadDataLoading}
                />
              </Col>
            </>
          );
        });
        setcard(card);
      }
    }
    //  else {

    //   let card = [];
    //   if (_.isEmpty(props.leads)) { return <NoRecordsFound /> }
    //   if (!_.isEmpty(props.leads)) {
    //     card = _.map(props.leads, (lead, index) => {
    //       return (
    //         <>
    //           <Col sm={18} md={18} lg={11} xl={11} >
    //             <LeadCard className='lead-agent-card'
    //               key={lead._id}
    //               id={lead._id}
    //               lead_Id={lead.lead_Id}
    //               leadStatus={lead.leadStatus}
    //               firstName={lead.firstName}
    //               lastName={lead.lastName}
    //               created_date={lead.created_date}
    //               allocatedDate={lead.allocatedDate}
    //               primaryMobile={lead.primaryMobile}
    //               allocatedBy={lead.lead_allocated_by === null ? '' : lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
    //               allocatedTo={lead.leadOwnerId === null ? '' : lead.leadOwnerId.first_name + ' ' + lead.leadOwnerId.last_name}
    //               appointmentOn={lead?.appointmentId?.start_date}
    //               loading={props.leadDataLoading}
    //             />
    //           </Col>
    //         </>
    //       )
    //     })
    //     setcard(card)
    //   }
    // }
  };

  // secondValue ?
  // "hi"
  // :
  // (
    // console.warn('leAD___CARDSSSSSS',props.leads)
    // return
  let card = [];
  if (_.isEmpty(props.leads)) {
    return( 
      <>
      <div className="dropdown-container">
        {leadsData?.globalTab === "team" && (
          <div>
            <p style={{ marginLeft: "3.8rem", marginBottom: "5px" }}>Select Hierarchy</p>
            <Select
              className="firstdropdown"
              value={firstValue}
              style={{width: 150,marginLeft: "60px",marginBottom:15}}
              onChange={handleFirstDropdown}
              placeholder="Select Hierarchy"
              options={firsrDrop}
            >
            </Select>
          </div>
        )}
        {openSecond && leadsData?.globalTab === "team" && (
          <div>
            <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>Select Team Member</p>
             <Select
              className="seconddropdown"
              value={secondValue}
              style={{width: 150,marginLeft: "20px",marginBottom:15}}
              onChange={ (item) => handleSecondDropdown(item)}
              placeholder="Select Team Member"
              options={secondDropData}
            ></Select>
          </div>
        )}
      </div>
      <NoRecordsFound />
      </>
    )
  }
  if (!_.isEmpty(props.leads)) {
    card = _.map(props.leads, (lead, index) => {
      return (
        <>
          <Col sm={18} md={18} lg={11} xl={11}>
            <LeadCard
              className="lead-agent-card"
              key={lead.id}
              id={lead.id}
              lead_Id={lead.lead_Id}
              leadStatus={lead.status}
              leadName={lead.personName}
              // firstName={lead.firstName}
              // lastName={lead.lastName}
              created_date={lead.allocationDate}
              allocatedDate={lead.allocationDate}
              primaryMobile={lead.mobileNo}
              allocatedBy={lead.allocBy}
              allocatedTo={lead.allocTo}
              appointmentOn={lead.appointDate}
              loading={props.leadDataLoading}
            />
          </Col>
        </>
      );
    });
  }
  // )

  

  const getDataAfterFilterTeam = async () => {
    const response = await getFormByIdApi({ id: secondValue });
    if (response.status == 200) {
      if (response?.data?.errMsg) {
        dispatch(
          fetchAllLeadsSuccess(
            response?.data?.errMsg[0],
            response?.data?.errMsg[1][0]?.count
          )
        );
      }
    } else {
      throw response?.data?.errMsg;
    }
  };

  return (
    <div className="cards-container">
      <div className="dropdown-container">
        {leadsData?.globalTab === "team" && (
          <div>
            <p style={{ marginLeft: "3.8rem", marginBottom: "5px" }}>Select Hierarchy</p>
            <Select
              className="firstdropdown"
              value={firstValue}
              style={{width: 150,marginLeft: "60px",marginBottom:15}}
              onChange={handleFirstDropdown}
              placeholder="Select Hierarchy"
              options={firsrDrop}
            >
            </Select>
          </div>
        )}
        {openSecond && leadsData?.globalTab === "team" && (
          <div>
            <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>Select Team Member</p>
             <Select
              className="seconddropdown"
              value={secondValue}
              style={{width: 150,marginLeft: "20px",marginBottom:15}}
              onChange={ (item) => handleSecondDropdown(item)}
              placeholder="Select Team Member"
              options={secondDropData}
            ></Select>
          </div>
        )}
      </div>
      <Row justify="center" gutter={[18, { xs: 8, sm: 10, md: 10, lg: 18 }]}>
        {!secondValue ? card : cards}
        {/* this is just a presentational card  */}
        <Col sm={18} md={18} lg={11} xl={11}
          className={width < breakpoint ? "dummy-card-mobile" : "dummy-card-desktop"}
        >
          <>
            <Card
              // key={id}
              // loading={props.loading}
              className="lead-card-desktop"
              hoverable={true}
            >
              <div className="avatar-and-status">
                <Avatar size={{ xl: 50 }}></Avatar>
              </div>
              <div className="content">
                <div className="content-header">
                  <p className="user-name-text capitalize">
                    <span className="user-id uppercase"></span>
                  </p>
                </div>
                <div className="content-body">
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Created on</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Created on</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Appointment on</p>
                    <p className="text-content">-</p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Mobile No.</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Allocated by</p>
                    <p className="text-content capitalize"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Allocated to</p>
                    <p className="text-content capitalize"></p>
                  </Card.Grid>
                </div>
              </div>
              <button className="update-btn">Update</button>
            </Card>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default LeadCards;
