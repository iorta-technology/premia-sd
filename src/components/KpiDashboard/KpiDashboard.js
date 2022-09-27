import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import "./KpiDashboard.css";
import "../Activitity Tracker/ActivityCalender.css";
import { Row, Col } from "antd";
import { Button } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Tag, Space } from "antd";
import { Select } from "antd";
import { Column } from "@ant-design/charts";
import { stoageGetter } from "../../helpers";
import Tabs from "../../components/Tab/Tab";
import axiosRequest from '../../axios-request/request.methods'

import Self from "../Activitity Tracker/LeftSide-Activity/Self/Self";
import Team from "../Activitity Tracker/LeftSide-Activity/Team/Team";

import person_black from "../../assets/MaterialUiIcons/person_black_192x192.png";
import person_white from "../../assets/MaterialUiIcons/person_white_192x192.png";
import group_white from "../../assets/MaterialUiIcons/group_white_192x192.png";
import group_black from "../../assets/MaterialUiIcons/group_black_192x192.png";

const KpiDashboard = () => {

  const userId = useSelector(state => state.login.userId)
  const login_user_data = stoageGetter('user')
  const userTreeData = useSelector((state) => state?.home?.user_tree)
    
  const dispatch = useDispatch();
  useEffect(() => {
    category_data()
  }, [])
  // useEffect(() => {
  //   const { id, channelCode } = stoageGetter("user");
    
  //   // dispatch(actions.kpiDashboard(finalKpiDataDropdown, id, channelCode._id));
  //   getKpiData('')
   
  // }, [dispatch]);

  const [finalKpiDataDropdown, setFinalKpiDataDropdown] = useState(["GPW"]);
  const kpi_data = useSelector((state) => state.kpiDashboard.kpi_data);
  let currentMonthData = {}
  
  const employee_data = kpi_data;
  let avatar =
    employee_data[0]?.data.first_name.match(/\b(\w)/g) +
    employee_data[0]?.data.last_name.match(/\b(\w)/g);
  let updatedDate = Moment(employee_data[1]?.data.uploadedDate).format(
    "MM/DD/yyyy"
  );
  let month = Moment(employee_data[1]?.data.uploadedDate).format("MMM");
  const [finalKpiData, setFinalKpiData] = useState([]);
  const [finalKpiConfig, setFinalKpiConfig] = useState(null);

  const [finalBudgetData, setFinalBudgetData] = useState([]);
  const [finalBudgetConfig, setFinalBudgetConfig] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [TeamSelf, setTeamSelf] = useState(true);
  const [showDailyData, setShowDailyData] = useState(false);
  const [showFirstGraph, setShowFirstGraph] = useState(false);
  const [showTeamDrop, setShowTeamDrop] = useState(false);
  const [category, setCategory] = useState();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [avatarData, setAvatarData] = useState('');
  const [finalScoreTblData, setFinalScoreTblData] = useState([]);
  const [gpwTableData, setGpwTableData] = useState([]);
  const [hierarAgentList ,setHierarAgentList]=useState([])
  const [desigData ,setDesigData]=useState('Select')
  const [teamMemberList ,setTeamMemberList]=useState([])
  const [teamData ,setTeamData]=useState('Select')
  const [dailyDataArray, setDailyDataArray] = useState([
    {
      month: "",
      type: "MTD",
      date: "",
      gwpData: "",
      year: "",
      title: "Total GWP in ₹ Lac",
    },
    {
      month: "",
      type: "MTD",
      date: "",
      gwpData: "",
      year: "",
      title: "Active Branches",
    },
    {
      month: "",
      type: "MTD",
      date: "",
      gwpData: "",
      year: "",
      title: "Total GWP Retention in ₹",
    },
    {
      month: "",
      type: "MTD",
      date: "",
      gwpData: "",
      year: "",
      title: "% Issuance",
    },
    {
      month: "",
      type: "MTD",
      date: "",
      gwpData: "",
      year: "",
      title: "Pendancy(GWP Pendancy vs. GWP Ach)",
    },
    {
      month: "",
      type: "MTD",
      date: "",
      gwpData: "",
      year: "",
      title: "GWP Unallocated in ₹",
    },
  ]);
  const breakpoint = 620;

  useEffect(() => {
    // if(userTreeData.length > 0){
      userTreeData.reporting_hierarchies.forEach(el =>{ el.label = el.dispValue })
      userTreeData.reporting_users.forEach(el =>{ 
        el.label = toCapitalize(el.full_name)
        el.value = el._id 
      })
      setHierarAgentList(userTreeData.reporting_hierarchies)
    // }
  }, []);

  // const dailyDataArray = [
  //   {
  //     month: "",
  //     type: "MTD",
  //     date: "",
  //     gwpData: "",
  //     year: "",
  //     title: "Total GWP in ₹ Lac",
  //   },
  //   {
  //     month: "",
  //     type: "MTD",
  //     date: "",
  //     gwpData: "",
  //     year: "",
  //     title: "Active Branches",
  //   },
  //   {
  //     month: "",
  //     type: "MTD",
  //     date: "",
  //     gwpData: "",
  //     year: "",
  //     title: "Total GWP Retention in ₹",
  //   },
  //   {
  //     month: "",
  //     type: "MTD",
  //     date: "",
  //     gwpData: "",
  //     year: "",
  //     title: "% Issuance",
  //   },
  //   {
  //     month: "",
  //     type: "MTD",
  //     date: "",
  //     gwpData: "",
  //     year: "",
  //     title: "Pendancy(GWP Pendancy vs. GWP Ach)",
  //   },
  //   {
  //     month: "",
  //     type: "MTD",
  //     date: "",
  //     gwpData: "",
  //     year: "",
  //     title: "GWP Unallocated in ₹",
  //   },
  // ];

  const budgetKeys = {
    "Branch Activation": [
      "branch_activation_budget",
      "branch_activation_actual",
      "branch_activation_achievement",
    ],
    GPW: ["gpw_budget", "gpw_actual", "gpw_achievement"],
    "NOP Retention": [
      "nop_retention_budget",
      "nop_retention_actual",
      "nop_retention_achievement",
    ],
    "GWP Retention": [
      "gwp_retention_budget",
      "gwp_retention_actual",
      "gwp_retention_achievement",
    ],
    Dummy: ["dummy_budget", "dummy_actual", "dummy_achievement"],
  };

  const category_data = async ()=>{

    let _channelId = login_user_data.channelCode._id
    let _userId = login_user_data.id
    let data = await axiosRequest.get(`user/fetchKPIMaster/main_category?channel=${_channelId}&usertype=user&userId=${userId}`)
    // console.log("mydatatatatat----",data);
    let _resp = data[0]
    let gpwDropDwnList = []
    
    for(let i = 0; i < _resp.length; i++){
      let data = {
          value: _resp[i].categoryName,
          label: _resp[i].categoryName
      }
      gpwDropDwnList.push(data) 
      
    }
    // let category = gpwDropDwnList[0].value
    // actualHeader = dataSelected = category == 'Branch Activation' ? '% Active Branches' : category
    // inLacSectn = category == 'Branch Activation' ? '' :  '(in ₹ Lac)'

    // gpwHead = gpwDropDwnList[0].value
    // gpwDrpdwn = gpwDropDwnList[0].value

    setCategory(gpwDropDwnList);
    setFinalKpiDataDropdown(gpwDropDwnList[0].value)
    let _data = gpwDropDwnList[0].value
    getKpiData(_data,_userId,_channelId)
  }

  const getKpiData = async (category,userId,channelId)=>{

    let _kpiResp = await axiosRequest.get(`user/fetch_employee_kpi?emp_code=${userId}&category=${category}&channel=${channelId}`, { secure: true });
    console.warn('(((((((((_kpiResp)))))))))',_kpiResp)
    if(_kpiResp.length > 0){
      if(_kpiResp.length > 1){
        // console.warn('(((((((((NOT GREATER THAN ONE)))))))))',_kpiResp)
        let sixMonthData = []
        let finalScoreData = []
        let _finalScoreArray = []
        let gpwFinalData = []
        
        for(let i = 0; i < _kpiResp.length ; i++){
          if(_kpiResp[i].id === 'current_month' ){
            let currentData = checkValidity(_kpiResp[i].data)

            currentMonthData.currentDate = checkValidityCurrent(formateDate(currentData.uploadedDate))
            currentMonthData.currentMonth = checkValidityCurrent(toCapitalize(currentData.month))
            currentMonthData.currentYear = checkValidityCurrent(currentData.year)
            currentMonthData.GPW_Actual = checkValidityCurrent(currentData.GPW.gpw_actual)
            currentMonthData.parcentIssuance = checkValidity(currentData.parcentIssuance)
            currentMonthData.parcentPendancy = checkValidityCurrent(currentData.parcentPendancy)
            currentMonthData.parcentUnallocated = checkValidityCurrent(currentData.parcentUnallocated)
            currentMonthData.branch_activation_actual = branchDataHandling(currentData,'branch')
            currentMonthData.gwp_retention_actual = branchDataHandling(currentData,'gwp')

            let _data =  dailyDataArray.map(el =>{
              el.month = currentMonthData.currentMonth
              el.date = currentMonthData.currentDate
              el.year = currentMonthData.currentYear
              el.gwpData = el.title === 'Total GWP in ₹ Lac' ?  currentMonthData.GPW_Actual : 
                            el.title === 'Active Branches' ?  currentMonthData.branch_activation_actual : 
                            el.title === 'Total GWP Retention in ₹' ?  currentMonthData.gwp_retention_actual : 
                            el.title === '% Issuance' ?  currentMonthData.parcentIssuance : 
                            el.title === 'Pendancy(GWP Pendancy vs. GWP Ach)' ?  currentMonthData.parcentPendancy : 
                            el.title === 'GWP Unallocated in ₹' ?  currentMonthData.parcentUnallocated : '0'
              return el
            })
            setDailyDataArray(_data)
            setShowDailyData(true)
            // console.log('*********************((  _data ))******************',_data)
          }else if(_kpiResp[i].id === 'employee_data'){
            setEmployeeName(_kpiResp[i].data.first_name + ' ' + _kpiResp[i].data.last_name)
            setAvatarData(_kpiResp[i].data.first_name.match(/\b(\w)/g) + _kpiResp[i].data.last_name.match(/\b(\w)/g))
            setEmployeeCode(_kpiResp[i].data.employeeCode)

          }else if(_kpiResp[i].id === 'final_score_last_six_month'){
            sixMonthData = _kpiResp[i]
            if(sixMonthData.data.length > 0) finalScoreData.push(sixMonthData) 
            _finalScoreArray = finalScoreFunc(finalScoreData)
            setFinalScoreTblData(_finalScoreArray)
            // console.warn('*********************((  _finalScoreArray ))******************',_finalScoreArray)
            setFinalKpiConfig({
              data: _finalScoreArray,
              xField: "month",
              yField: "sales",
              point: {
                size: 5,
                shape: "diamond",
              },
              color: "#00ACC1",
            });
            setShowFirstGraph(true)
          }else if(_kpiResp[i].id === 'GPW_last_six_month' ){

            gpwFinalData = gpwGraphData(_kpiResp[i],'GPW_last_six_month')
            console.log('*********************((  gpwFinalData ))******************',gpwFinalData)
            setFinalBudgetData(gpwFinalData)

            setFinalBudgetConfig({
              data: gpwFinalData,
              isGroup: true,
              xField: "month",
              yField: "actual",
              seriesField: "name",
              color: ["rgb(228, 106, 37)", "#00ACC1"],
            });

          }
        }
      }else{
        // console.warn('(((((((((GREATER THAN ONE)))))))))',_kpiResp)
        setEmployeeName(_kpiResp[0].data.first_name + ' ' + _kpiResp[0].data.last_name)
        setAvatarData(_kpiResp[0].data.first_name.match(/\b(\w)/g) + _kpiResp[0].data.last_name.match(/\b(\w)/g))
        setEmployeeCode(_kpiResp[0].data.employeeCode)

        currentMonthData.currentDate = '-'
        currentMonthData.currentMonth = '-'
        currentMonthData.currentYear = '-'
        currentMonthData.GPW_Actual = 0
        currentMonthData.parcentIssuance = 0
        currentMonthData.parcentPendancy = 0
        currentMonthData.parcentUnallocated = 0
        currentMonthData.branch_activation_actual = 0
        currentMonthData.gwp_retention_actual = 0

        let _data =  dailyDataArray.map(el =>{
          el.month = currentMonthData.currentMonth
          el.date = currentMonthData.currentDate
          el.year = currentMonthData.currentYear
          el.gwpData = el.title === 'Total GWP in ₹ Lac' ?  currentMonthData.GPW_Actual : 
                        el.title === 'Active Branches' ?  currentMonthData.branch_activation_actual : 
                        el.title === 'Total GWP Retention in ₹' ?  currentMonthData.gwp_retention_actual : 
                        el.title === '% Issuance' ?  currentMonthData.parcentIssuance : 
                        el.title === 'Pendancy(GWP Pendancy vs. GWP Ach)' ?  currentMonthData.parcentPendancy : 
                        el.title === 'GWP Unallocated in ₹' ?  currentMonthData.parcentUnallocated : '0'
          return el
        })

        setFinalKpiConfig(null)
        setFinalBudgetConfig(null)
        setShowFirstGraph(false)
        setFinalScoreTblData([])
        setGpwTableData([])
        setFinalBudgetData([])
        setDailyDataArray(_data)
        setShowDailyData(true)
      }
    }
  }

  const finalScoreFunc = (dataFinal) =>{
    try{
        let finalData = []
        let finalScoreData = []
        let _finalData = []
        
        for(let _data of dataFinal){
            for(let i = 0;i < _data.data.length; i++){
                let finalDataStruct = {}
                // finalDataStruct.month = this.checkValidity(this.capitalize(_data.id === 'final_score_last_two_month' ?  _data.data[i].year_month : _data.data[i].quater+' '+_data.data[i].year))
                // finalDataStruct.month = checkValidity(toCapitalize(_data.id === 'final_score_last_six_month' ?  shortMonth(_data.data[i].month) : _data.data[i].quater))
                finalDataStruct.month = checkValidity(toCapitalize(shortMonth(_data.data[i].month)))
                finalDataStruct.monthTbl = checkValidity(toCapitalize(_data.data[i].month))
                finalDataStruct.sales = checkValidity(parseFloat(_data.data[i].Final_Score))
                finalDataStruct.index = checkValidity(parseFloat(_data.data[i].index))
                finalDataStruct.change_in_percent = checkValidity(_data.data[i].change_in_percent)
                finalDataStruct.year = checkValidity(_data.data[i].year)
                finalDataStruct.graphIND = _data.id === 'final_score_last_six_month' ? '2' :'1'
                finalData.push(finalDataStruct)

                finalDataStruct = {}
            }
        }
        // dataSorting() function is used for sorting the Data as required 
        finalScoreData = dataSorting(finalData)
        if(finalScoreData.length !== 0){
            return finalScoreData
        }
    }catch(err){
        console.log(err , '792746a3-f3d1-4483-bfaf-220ec2ec0271');
    }
  }

  // FOR GPW TABLE AND GRAPH DATA PROCESSING
  const gpwGraphData = (dataGPW,monthKey) =>{
    try{
        setGpwTableData([])
        let gpwBudget = []
        let gpwData = []
        let gpwFinalData = []
        let finalKey = ''
        let budgetKey = ''
        let actualKey = ''
        let achieveKey = ''

        // for(let _data of dataGPW){
            let gpwID = dataGPW.id === monthKey 

            // FOR ACTUAL DATA
            for(let i = 0;i < dataGPW.data.length; i++){
                for(let _dataKeys in dataGPW.data[i]){
                    if(dataGPW.category === _dataKeys){
                        finalKey = _dataKeys
                        let gpwTblData = checkValidity(dataGPW.data[i][finalKey])
                        for(let _gpwKeys in gpwTblData){
                            // _gpwKeys.includes('budget') === true ? budgetKey = _gpwKeys : _gpwKeys.includes('actual') === true ? actualKey = _gpwKeys : 
                            // _gpwKeys.includes('achievement') === true ? achieveKey = _gpwKeys : ''
                            if(_gpwKeys.includes('budget') === true) budgetKey = _gpwKeys
                            if(_gpwKeys.includes('actual') === true) actualKey = _gpwKeys
                            if(_gpwKeys.includes('achievement') === true) achieveKey = _gpwKeys
                        }
                    }
                }

                let kpiCategory = dataGPW.category
                let gpwStruct = {}
                gpwStruct.name = 'Actual' 
                // console.log('*********************((  _data ))******************',dataGPW.data)
                // gpwStruct.month = checkValidity(capitalize(gpwID ? dataGPW.data[i].year_month : dataGPW.data[i].qauter+' '+dataGPW.data[i].year))
                gpwStruct.month = checkValidity(toCapitalize(shortMonth(dataGPW.data[i].month)))

                let gpwTblData = checkValidity(dataGPW.data[i][finalKey])
                let tblDataKeys =  Object.keys(gpwTblData)

                gpwStruct.budget = parseFloat(checkValidity(gpwTblData[budgetKey]))
                gpwStruct.actual = parseFloat(checkValidity(gpwTblData[actualKey]))
                gpwStruct.avgData = checkValidity(gpwStruct.actual)
                gpwStruct.year = checkValidity(dataGPW.data[i].year)
                gpwStruct.achievePercent = gpwTblData[achieveKey]
                gpwStruct.graphIND = gpwID ? '2' :'1'

                gpwData.push(gpwStruct)
                // dataSorting() function is used for sorting the Data as required 
                gpwData = dataSorting(gpwData)
                setGpwTableData(gpwData)
                
                gpwStruct = {}
            }
            // FOR BUDGET DATA
            for(let i = 0;i < dataGPW.data.length; i++){

                for(let _dataKeys in dataGPW.data[i]){
                    if(dataGPW.category === _dataKeys){
                        finalKey = _dataKeys
                        let gpwTblData = checkValidity(dataGPW.data[i][finalKey])
                        for(let _gpwKeys in gpwTblData){
                            // _gpwKeys.includes('budget') === true ? budgetKey = _gpwKeys : _gpwKeys.includes('actual') === true ? actualKey = _gpwKeys : 
                            // _gpwKeys.includes('achievement') === true ? achieveKey = _gpwKeys : ''
                            if(_gpwKeys.includes('budget') === true) budgetKey = _gpwKeys
                            if(_gpwKeys.includes('actual') === true) actualKey = _gpwKeys
                            if(_gpwKeys.includes('achievement') === true) achieveKey = _gpwKeys
                        }
                    }
                }

                let gpwStruct = {}
                gpwStruct.name = 'Budget' 
                // gpwStruct.month = checkValidity(capitalize(gpwID ? dataGPW.data[i].year_month : dataGPW.data[i].qauter+' '+dataGPW.data[i].year))
                gpwStruct.month = checkValidity(toCapitalize(shortMonth(dataGPW.data[i].month)))

                let gpwTblData = checkValidity(dataGPW.data[i][finalKey])
                let tblDataKeys =  Object.keys(gpwTblData)

                gpwStruct.budget = parseFloat(checkValidity(gpwTblData[budgetKey]))
                gpwStruct.avgData = checkValidity(gpwStruct.budget)
                gpwStruct.actual = parseFloat(checkValidity(gpwTblData[actualKey]))
                gpwStruct.year = checkValidity(dataGPW.data[i].year)
                gpwStruct.achievePercent = gpwTblData[achieveKey]
                gpwStruct.graphIND = gpwID ? '2' :'1'

                gpwBudget.push(gpwStruct)
                // dataSorting() function is used for sorting the Data as required 
                gpwBudget = dataSorting(gpwBudget)
                gpwStruct = {}
            }
        // }
        // console.log('*********************((  gpwBudget ))******************',gpwBudget)
        // console.log('*********************((  gpwTableData ))******************',gpwTableData)
        // const [gpwTableData, setGpwTableData] gpwData = useState([]);
        gpwFinalData = gpwBudget.concat(gpwData)
        if(gpwFinalData.length !== 0){
            return gpwFinalData
        }
    }catch(err){
        console.log(err , '6aeddb00-e4a1-4a46-a652-89efc643894d');
    }
  }

  const dataSorting = (data) =>{
    let monthData = []
    let quaterData = []
    let sortedData = []
    for(let _data of data){
        if(_data.graphIND == '2'){
            monthData.push(_data)
            monthData.sort(function (a, b) { return a.year - b.year })
        }else{
            quaterData.push(_data)
            quaterData.sort(function (a, b) { return a.year - b.year })
        }
    }
    return sortedData = quaterData.concat(monthData)
  }

  const checkValidity = (data) =>{
    try{
        if(data === "" || data === null || data === undefined || data === 'undefined' || data === '-'){
            return 0;
        }else{
            return data;
        }
    }catch(err){
        // console.log(err , '4d0315f8-bfe5-4666-bad7-4ebb34ba4dfd');
    }
  }
  const checkValidityCurrent = (data) =>{
    try{
        if(data === "" || data === null || data === undefined || data === 'undefined' || data === '-'){
            return '-';
        }else{
            return data;
        }
    }catch(err){
        // console.log(err , '4d0315f8-bfe5-4666-bad7-4ebb34ba4dfd');
    }
  }
  const formateDate = (milisecond) => {
    try {
        return new Date(parseInt(milisecond)).toLocaleDateString()
    } catch (err) {
        // console.log(err , 'a676bc19-d632-4078-b9eb-5b0b649f8c03');
        return milisecond;
    }
  }
  const toCapitalize = (string) =>{
      try{
          return string[0].toUpperCase() + string.slice(1);
      }catch(err){
          // console.log(err , 'cc7abd78-e68b-4768-a058-f956ae6c2e68');
      }
  }
  const branchDataHandling = (data,type) =>{
    if(type === 'branch'){
        if(data.hasOwnProperty('Branch Activation') === true){
            // console.log('*********************((  Branch Activation ))******************',data['Branch Activation'])
            // return data['Branch Activation'].branch_activation_actual
            return data['Branch Activation'].branch_activation_per_achievement

        }else{
            return 0
        }

    }else{
        if(data.hasOwnProperty('GWP Retention') === true){
            // console.log('*********************((  GWP Retention ))******************',data['GWP Retention'])
            // return data['GWP Retention'].gwp_retention_actual
            return data['GWP Retention'].gwp_retention_per_achievement
        }else{
            return 0
        }
    }
  }
  

  const { Option } = Select;
  function onChange(value) {
    setFinalKpiDataDropdown(value);
    dispatch(actions.kpiDashboard(value));
    console.log(`selected ${value}`);
  }
  const onChangeKPIBudgetHandler = (value) => {
    let _channelId = login_user_data.channelCode._id
    let _userId = teamData === 'Select' || teamData === '' ? login_user_data.id : teamData

    console.log(value);
    setFinalKpiDataDropdown(value);
    getKpiData(value,_userId,_channelId)
    // dispatch(actions.kpiDashboard(value));
  };

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const columns = [
    {
      title: "Period",
      dataIndex: "monthTbl",
      key: "monthTbl",
      align: "center",
    },
    {
      title: "Final Score",
      dataIndex: "sales",
      key: "sales",
      align: "center",
    },
    {
      title: "% Change over last month",
      dataIndex: "change_in_percent",
      key: "change_in_percent",
      align: "center",
    },
  ];

  
  const columns1 = [
    {
      title: "Period",
      dataIndex: "month",
      key: "month",
      align: "center"
    },
    {
      title: `${finalKpiDataDropdown}(in ₹ Lac) Budget`,
      dataIndex: 'budget',
      key: 'budget',
      align: "center"
    },
    {
      title: `${finalKpiDataDropdown}(in ₹ Lac) Actual`,
      dataIndex: 'actual',
      key: 'actual',
      align: "center"
    },
    {
      title: "% Achievement",
      dataIndex: "achievePercent",
      key: "achievePercent",
      align: "center"
    },
  ];
  // console.warn('HEADER DATA',columns1)


  const columns2 = [
    {
      title: "CSM Name",
      dataIndex: "csmName",
      key: "csmName",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Final KPI Score %",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data2 = [{ csmName: "Calvin Robert", city: "Mumbai", value: 56 }];

  const shortMonth = (text) => {
    try {
      text = text.slice(0, 3);
      let _text = text !== undefined ? text.toUpperCase() : text;
      return _text;
    } catch (err) {
      // console.log(err)
    }
  };
  
    
  const dailyDataCards = () => {
    return dailyDataArray.map((item, index) => {
      return (
        <div key={index} style={{ width: "48%" }}>
          <div className="kpiDailyData">
            <div style={{ marginTop: 5, padding: 6 }}>
              <text style={{ fontSize: 12 }}>Update as on {item.date}</text>
            </div>
            <div style={{ backgroundColor: "#ccc", height: 1 }}></div>

            <div style={{ paddingLeft: 10, marginTop: 5 }}>
              <text
                style={{ color: "#00acc1", fontSize: 16, fontWeight: "bolder" }}
              >
                {item.gwpData}
              </text>
            </div>
            <div
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                marginTop: 5,
              }}
            >
              <text style={{ fontSize: 12, fontWeight: "bolder" }}>
                {item.title}
              </text>
            </div>
            <div style={{ backgroundColor: "#ccc", height: 1 }}></div>
            <Row style={{ padding: 6, justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* <text style={{fontSize:12,fontWeight:'bolder'}}>{shortMonth(item.month)}</text> */}
                  <text style={{ fontSize: 12, fontWeight: "bolder" }}>
                    {item.type}
                  </text>
                </div>
                <div style={{ marginLeft: 5 }}>
                  <text
                    style={{
                      color: "#e46a25",
                      fontSize: 12,
                      fontWeight: "bolder",
                    }}
                  >
                    {"Actual"}
                  </text>
                </div>
              </div>
            </Row>
          </div>
        </div>
      );
    });
  };

  const dailyDataCardsDesktop = () => {
    return dailyDataArray.map((item, index) => {
      // console.warn('DATA============>>>>>',item)
      return (
        <div key={index} style={{ width: "32.5%" }}>
          <div className="kpiDailyData">
            <div style={{ paddingLeft: 10,paddingTop:5 }}>
              <text style={{ fontSize: 12 }}>Update as on {item.date}</text>
            </div>
            <Row style={{ paddingLeft: 10,paddingRight: 10,paddingBottom:5,display: "flex",flex: 1,alignItems: "center",justifyContent: "space-between",}}>
              <div>
                <div >
                  <text className="updatecount" style={{ color: "#00acc1", fontSize: 24, fontWeight: "bolder" }}>{item.gwpData}</text>
                </div>
                <div >
                  <text className="updatetotal" >{item.title}</text>
                </div>
              </div>
              <div >
                <div>
                  {/* <text style={{fontSize:12,fontWeight:'bolder'}}>{shortMonth(item.month)}</text> */}
                  <text style={{ fontSize: 12, fontWeight: "bolder" }}>{item.type}</text>
                </div>
                <div>
                  <text style={{ color: "#e46a25",fontSize: 12,fontWeight: "bolder",}}>{"Actual"}</text>
                </div>
              </div>
            </Row>
          </div>
        </div>
      );
    });
  };

  const handleDesignationData = (event) =>{
    setDesigData(event)
    setTeamData('Select')
    // console.warn('userTreeData((((((((((===>>>>>>>>>>', userTreeData)
    let _teamData = userTreeData.reporting_users.filter(el => el.hierarchy_id === event)
    // console.warn('_teamData((((((((((===>>>>>>>>>>', _teamData)
    setTeamMemberList(_teamData)
    setShowTeamDrop(true)
  }
  const handleTeamListData = (event) =>{
    let _channelId = login_user_data.channelCode._id
    // console.warn('handleTeamListData((((((((((===>>>>>>>>>>', event)
    setTeamData(event)
    getKpiData('GPW',event,_channelId)
  }

  const handleSelfTeam = (type) =>{
    let _channelId = login_user_data.channelCode._id
    let _userId = login_user_data.id
    if(type === 'self'){
      setTeamSelf(true)
      setShowTeamDrop(false)
      setTeamData('Select')
      getKpiData('GPW',_userId,_channelId)
    }else{
      setTeamSelf(false)
      setDesigData('Select')
      setTeamData('Select')
    }
  }


  return (
    <>
      <Tabs tabMenu={[]} header="KPI Dashboard" activeKey="1" />

      <div className="mainTab">
        <Row className="tabs">
          <Col xs={11} sm={12} md={12} lg={2} xl={2}>
           <button style={{width: "95%"}} className={TeamSelf ? "active_tabs_button" : "tabs_button"} onClick={(e) => { handleSelfTeam('self') }}>
              <img style={{marginRight: "0px"}} src={TeamSelf ? person_white : person_black} className="person" alt="person_png"/>
              Self
            </button>
          </Col>
          <Col xs={11} sm={12} md={12} lg={2} xl={2} style={{marginLeft:8}}>
            <button style={{width: "95%"}} className={!TeamSelf ? "active_tabs_button" : "tabs_button"} onClick={(e) => { handleSelfTeam('team') }} >
                <img style={{marginRight: "0px"}} src={TeamSelf ? group_black : group_white} className="person" alt="group_png"/>
                Team
            </button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={3} xl={3} style={{marginLeft:10}}>
            { TeamSelf === false &&
              <Select value={desigData} options={hierarAgentList} onChange={(event)=> handleDesignationData(event)}  placeholder="Select Hierarchy"></Select>
            }
          </Col>
          <Col xs={12} sm={12} md={12} lg={3} xl={3} style={{marginLeft:10}}>
            { showTeamDrop &&
              <Select value={teamData} options={teamMemberList} onChange={(event)=> handleTeamListData(event)} placeholder="Select Team Member"></Select>
            }
          </Col>
        </Row>
        <hr style={{ marginBottom: "20px" }} />
        {/* { TeamSelf ?  */}
        <div>
        {width > breakpoint && (
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={24} lg={2} xl={2} className="cardKpi centerProfile">
              <Row className="">
                <Col sm={24} md={12} lg={2} xl={24}>
                  <div className="profile">
                    <h3
                      style={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontWeight: "normal",
                      }}
                    >
                      {avatarData}
                    </h3>
                  </div>
                </Col>
                <Col className="userDetails" sm={24} md={12} lg={2} xl={24}>
                  <h5> {employeeName}</h5>
                  <p style={{ marginTop: "0px"}}>ID : {employeeCode}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={22} lg={22} xl={22}>
              <Row gutter={[10, 12]} justify="space-between" style={{ flexWrap: "wrap", marginLeft:10 }}>
                { showDailyData && dailyDataCardsDesktop() }
              </Row>
            </Col>
            
          </Row>
        )}
        {width < breakpoint && (
          <div>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={2}
              xl={2}
              style={{ marginBottom: 10 }}
              className="cardKpi centerProfile"
            >
              <Row className="">
                <Col sm={24} md={12} lg={2} xl={24}>
                  <div className="profile">
                    <h3
                      style={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontWeight: "normal",
                      }}
                    >
                      {avatarData}
                    </h3>
                  </div>
                </Col>
                <Col className="userDetails" sm={24} md={12} lg={2} xl={24} style={{display:'flex',flexDirection: 'column',justifyContent:'center'}}>
                  <h5>{employeeName}</h5>
                  <p style={{ marginTop: "0px",marginBottom: "0px" ,textAlign: 'start',marginLeft:10}}>ID : {employeeCode}</p>
                </Col>
              </Row>
            </Col>
            <Row justify="space-between" style={{ flexWrap: "wrap" }}>
              { showDailyData && dailyDataCards() }
            </Row>
          </div>
        )}
        <Row style={{ marginTop: "10px" }} >
          <Col xs={24} sm={24} md={24} lg={8} xl={8} className="graph">
            <div className="kip_score myGraph">
              <h4>FINAL KPI SCORE %</h4>
              <hr />
            </div>
            <div className="budgeData">
              {showFirstGraph && <Column {...finalKpiConfig} />}
            </div>
            {/* graph */}
            <Table
              pagination={false}
              columns={columns}
              key={columns.key}
              dataSource={finalScoreTblData}
              className="score_one"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} className="graph">
            <div className="kip_score myGraph">
              <h4>KPI (BUDGET VS ACHIEVEMENT)</h4>
              <hr />
              <Select
                showSearch
                className="budget"
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChangeKPIBudgetHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                options={category}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={finalKpiDataDropdown}
              >
              </Select>
              
            </div>
            {/* graph */}
            <div className="budgeData">
              {finalBudgetConfig && <Column {...finalBudgetConfig} />}
            </div>

            <Table
              pagination={false}
              columns={columns1}
              key={columns1.key}
              dataSource={gpwTableData}
              className="score"
            />
          </Col>
          {/* <Col xs={24} sm={24} md={24} lg={8} xl={8} className="graph">
            <div className="myGraph">
              <Row justify="space-between">
                <Col>
                  <div className="kip_score list_of">
                    <h4>LIST OF RMs</h4>
                  </div>
                </Col>
                <Col>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Top 10">Top 10</Option>
                    <Option value="Bottom 10">Bottom 10</Option>
                  </Select>
                </Col>
              </Row>
            </div>

            <Table
              className="rms"
              pagination={false}
              columns={columns2}
              key={columns2.key}
            />
          </Col> */}
        </Row>
        </div>
         {/* : 
         ''} */}
      </div>
    </>
  );
};

export default KpiDashboard;
