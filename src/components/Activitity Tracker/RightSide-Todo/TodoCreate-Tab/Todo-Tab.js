import { Button, Modal,TimePicker,DatePicker,Input ,Select ,message , AutoComplete  } from 'antd';
import React, { useEffect, useState } from 'react';
import {SearchOutlined , CloseOutlined} from '@ant-design/icons'
import moment from 'moment';
import './Todo-Tab.css'
import axiosRequest from '../../../../axios-request/request.methods';

import {stoageGetter} from '../../../../helpers'
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
const { Search } = Input;


const TodoTab = (props) => {  
  // console.log('editData ____________',props)
  
  const [isHighButtonClick ,setIsHighButtonClick]=useState(false)
  const [isMediumButtonClick ,setIsMediumButtonClick]=useState(false)
  const [isLowButtonClick ,setIsLowButtonClick]=useState(false)
  const [priorityBtn ,setPriorityBtn]=useState('medium')
  const [priorityBtnColr ,setPriorityBtnColr]=useState('#fb8c00')
  const [reminderDate ,setReminderDate]=useState('')
  const [reminderDateString ,setReminderDateString]=useState('')
  const [todoDesc ,setTodoDesc]=useState('')
  const [selectedTime ,setSelectedTime]=useState('select')
  const [buttonName ,setButtonName]=useState('')
  const [hierarAgentList ,setHierarAgentList]=useState([])
  const [teamMemberChip ,setTeamMemberChip]=useState([])
  const [ownerCollectn ,setOwnerCollectn]=useState([])
  const [teamMemberData ,setTeamMemberData]=useState('')

  const _dataStore = useSelector((state) => state?.home?.user_tree)
  const minimumDate = moment().format("YYYY-MM-DD")

  useEffect(() => {
    console.log('USER HIERARCHYY ___DATA__',_dataStore)
    let _teamMember = []
    if(Object.keys(_dataStore).length !== 0){
      _dataStore.reporting_users.map(el => {
          let sortarray = {
              FullName: el.full_name,
              ShortId: el.employeeCode,
              firstname: el.first_name,
              lastname: el.last_name,
              employecode: el.employeeCode,
              designation: el.hierarchyName,
              _Id: el._id,
              value:toCapitalize(el.full_name) + ' ' + '('+el.hierarchyName+')'
          }
          _teamMember.push(sortarray)
          sortarray = {};

      })
      setHierarAgentList(_teamMember)
    }
  },[])

  useEffect(() => {
    try{
    // console.log('Calling func',Object.keys(props.editData));
    if(props.button === 'Create' && props.isModalVisible === true) {
      setButtonName(props.button)
      clearData()
    }

    if(props.button === 'Update' && props.isModalVisible === true) setButtonName(props.button)

    if(Object.keys(props.editData).length !== 0 || props.editData !== undefined){
      // console.log('I AM HEREEEE',props);
      let _teamMember = props.editData.searchdata.map(el =>{ return toCapitalize(el.FullName) + ' ' + '('+el.designation+')' })
      setTeamMemberChip(_teamMember)
      setOwnerCollectn(props.editData.searchdata)
      
      let _data = moment(moment(props.editData.dateofreminder).format("YYYY-MM-DD"), "YYYY-MM-DD")
      if(props.editData.taskPriority === 'low'){
        setIsHighButtonClick(false)
        setIsMediumButtonClick(false)
        setIsLowButtonClick(true)
      }else if(props.editData.taskPriority === 'high'){
        setIsHighButtonClick(true)
        setIsMediumButtonClick(false)
        setIsLowButtonClick(false)
      }else{
        setIsHighButtonClick(false)
        setIsMediumButtonClick(true)
        setIsLowButtonClick(false)
      }
      
      setPriorityBtn(props.editData.taskPriority)
      setPriorityBtnColr(props.editData.priorityIndicatorColor)
      setReminderDate(_data)
      setReminderDateString(moment(props.editData.dateofreminder).format("YYYY-MM-DD"))
      setTodoDesc(props.editData.content)
      setSelectedTime(props.editData.stringtimeofreminder)
      setTodoDesc(props.editData.content)
    }
  }catch(err){}
    
  },[props]);

  let toCapitalize = (strText) =>{
    try {
        if (strText !== '' && strText !== null && typeof(strText) !== undefined) {
            var _str = strText.toLowerCase();
            var collection = _str.split(" ");
            var modifyStrigs = [];
            _str = '';
            for (var i = 0; i < collection.length; i++) {
                modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                _str = _str + modifyStrigs[i] + ' ';
            }
            return _str;
        } else {
            return "";
        }
    } catch (err) {

    }
};

  let timeListText = [
    {
      dispValue: "Select",
      label: "Select",
      value: "select"
    }, 
    {
    dispValue: "12:00 AM",
    label: "12:00 AM",
    value: "12:00 AM"
  }, {
    dispValue: "12:30 AM",
    label: "12:30 AM",
    value: "12:30 AM"
  }, {
    dispValue: "1:00 AM",
    label: "1:00 AM",
    value: "1:00 AM"
  }, {
    dispValue: "1:30 AM",
    label: "1:30 AM",
    value: "1:30 AM"
  }, {
    dispValue: "2:00 AM",
    label: "2:00 AM",
    value: "2:00 AM"
  }, {
    dispValue: "2:30 AM",
    label: "2:30 AM",
    value: "2:30 AM"
  }, {
    dispValue: "3:00 AM",
    label: "3:00 AM",
    value: "3:00 AM"
  }, {
    dispValue: "3:30 AM",
    label: "3:30 AM",
    value: "3:30 AM"
  }, {
    dispValue: "4:00 AM",
    label: "4:00 AM",
    value: "4:00 AM"
  }, {
    dispValue: "4:30 AM",
    label: "4:30 AM",
    value: "4:30 AM"
  }, {
    dispValue: "5:00 AM",
    label: "5:00 AM",
    value: "5:00 AM"
  }, {
    dispValue: "5:30 AM",
    label: "5:30 AM",
    value: "5:30 AM"
  }, {
    dispValue: "6:00 AM",
    label: "6:00 AM",
    value: "6:00 AM"
  }, {
    dispValue: "6:30 AM",
    label: "6:30 AM",
    value: "6:30 AM"
  }, {
    dispValue: "7:00 AM",
    label: "7:00 AM",
    value: "7:00 AM"
  }, {
    dispValue: "7:30 AM",
    label: "7:30 AM",
    value: "7:30 AM"
  },
  {
    dispValue: "8:00 AM",
    label: "8:00 AM",
    value: "8:00 AM"
  }, {
    dispValue: "8:30 AM",
    label: "8:30 AM",
    value: "8:30 AM"
  }, {
    dispValue: "9:00 AM",
    label: "9:00 AM",
    value: "9:00 AM"
  }, {
    dispValue: "9:30 AM",
    label: "9:30 AM",
    value: "9:30 AM"
  }, {
    dispValue: "10:00 AM",
    label: "10:00 AM",
    value: "10:00 AM"
  }, {
    dispValue: "10:30 AM",
    label: "10:30 AM",
    value: "10:30 AM"
  }, {
    dispValue: "11:00 AM",
    label: "11:00 AM",
    value: "11:00 AM"
  }, {
    dispValue: "11:30 AM",
    label: "11:30 AM",
    value: "11:30 AM"
  }, {
    dispValue: "12:00 PM",
    label: "12:00 PM",
    value: "12:00 PM"
  }, {
    dispValue: "12:30 PM",
    label: "12:30 PM",
    value: "12:30 PM"
  }, {
    dispValue: "1:00 PM",
    label: "1:00 PM",
    value: "1:00 PM"
  }, {
    dispValue: "1:30 PM",
    label: "1:30 PM",
    value: "1:30 PM"
  }, {
    dispValue: "2:00 PM",
    label: "2:00 PM",
    value: "2:00 PM"
  }, {
    dispValue: "2:30 PM",
    label: "2:30 PM",
    value: "2:30 PM"
  }, {
    dispValue: "3:00 PM",
    label: "3:00 PM",
    value: "3:00 PM"
  }, {
    dispValue: "3:30 PM",
    label: "3:30 PM",
    value: "3:30 PM"
  }, {
    dispValue: "4:00 PM",
    label: "4:00 PM",
    value: "4:00 PM"
  }, {
    dispValue: "4:30 PM",
    label: "4:30 PM",
    value: "4:30 PM"
  }, {
    dispValue: "5:00 PM",
    label: "5:00 PM",
    value: "5:00 PM"
  }, {
    dispValue: "5:30 PM",
    label: "5:30 PM",
    value: "5:30 PM"
  }, {
    dispValue: "6:00 PM",
    label: "6:00 PM",
    value: "6:00 PM"
  }, {
    dispValue: "6:30 PM",
    label: "6:30 PM",
    value: "6:30 PM"
  }, {
    dispValue: "7:00 PM",
    label: "7:00 PM",
    value: "7:00 PM"
  }, {
    dispValue: "7:30 PM",
    label: "7:30 PM",
    value: "7:30 PM"
  }, {
    dispValue: "8:00 PM",
    label: "8:00 PM",
    value: "8:00 PM"
  }, {
    dispValue: "8:30 PM",
    label: "8:30 PM",
    value: "8:30 PM"
  }, {
    dispValue: "9:00 PM",
    label: "9:00 PM",
    value: "9:00 PM"
  }, {
    dispValue: "9:30 PM",
    label: "9:30 PM",
    value: "9:30 PM"
  }, {
    dispValue: "10:00 PM",
    label: "10:00 PM",
    value: "10:00 PM"
  }, {
    dispValue: "10:30 PM",
    label: "10:30 PM",
    value: "10:30 PM"
  }, {
    dispValue: "11:00 PM",
    label: "11:00 PM",
    value: "11:00 PM"
  }, {
    dispValue: "11:30 PM",
    label: "11:30 PM",
    value: "11:30 PM"
  }
  ]

  const handleOk = () => {
    props.setIsModalVisible(false);
    // clearData()
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    // clearData()
  };

  const [windowWidth, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const onChangeDatePick = (date, dateString) => {
    // console.log(date);
    // console.log(dateString);
    setReminderDateString(dateString)
    setReminderDate(date)
  };
  const submitTodoData = async () =>{
    // console.log('priorityBtn____',priorityBtn)
    const {id} = stoageGetter('user')
    // console.log('USER___IDDDD',id)
    // return
      if(buttonName === 'Create'){
        if(todoDesc === ''){
            message.success('Please Add Task Name');
            return
        }
        if(priorityBtn === ''){
            message.success('Please select priority');
            return
        }
        if(reminderDate === ''){
            message.success('Please select due date');
            return
        }
        if(selectedTime === ''){
            message.success('Please select time');
            return
        }

        let allocationdata = [];
        if(ownerCollectn === null || ownerCollectn === undefined || ownerCollectn === ""){
            allocationdata.push(id);

        }else{
            ownerCollectn.map(x => { allocationdata.push(x._Id) });
            allocationdata.push(id);
        }

        let formData ={
          dateOfReminder: reminderDateString,
          description: todoDesc,
          owernersCollectionDetails: ownerCollectn,
          priorityIndicatorColor: priorityBtnColr,
          taskOwner: id,
          taskOwners:allocationdata,
          taskPriority: priorityBtn,
          timeOfReminder: selectedTime,
          userId: id
        }
        let _resp = await axiosRequest.post(`user/todo_task`,formData, { secure: true })
        console.log('TODO__RESPPPP',_resp)
        // setIsModalVisible(false);
        // console.log('CHECK PROPPPPSSS ____________', props)
        // console.log('CHECK TYPEOFFF ____________', typeof(props.getTodoData))
        if(_resp.length !== 0){
          handleCancel()
          props.getTodoData()
        }

      }else{

        let allocationdata = [];
        if(ownerCollectn === null || ownerCollectn === undefined || ownerCollectn === ""){
            allocationdata.push(id);

        }else{
            ownerCollectn.map(x => { allocationdata.push(x._Id) });
            allocationdata.push(id);
        }
        let formData ={
          dateOfReminder: reminderDateString,
          description: todoDesc,
          owernersCollectionDetails: ownerCollectn,
          priorityIndicatorColor: priorityBtnColr,
          taskOwner: id,
          taskOwners: allocationdata,
          taskPriority: priorityBtn,
          timeOfReminder: selectedTime,
          taskId:props.editData.todoid,
          userId: id
        }

        let _resp = await axiosRequest.put(`user/update_task_status`,formData, { secure: true })

        console.log('TODO__RESPPPP',_resp)
        // setIsModalVisible(false);
        if(_resp.length !== 0){
          handleCancel()
          props.getTodoData()
        }
       
      }
  }

  const clearData = () =>{
      setPriorityBtn('medium')
      setPriorityBtnColr('#fb8c00')
      setIsHighButtonClick(false)
      setIsMediumButtonClick(true)
      setIsLowButtonClick(false)
      // setPriorityBtn('')
      // setPriorityBtnColr('')
      setReminderDate('')
      setTodoDesc('')
      setSelectedTime('select')
      setOwnerCollectn([])
      setTeamMemberChip([])
  }
  const handleTimeChange = (value) => {
    setSelectedTime(value)
    console.log(`selected ${value}`);
  };
  
  const onChangeTeam = (text,data) => {
    console.log('onSelect___data', data);

    let sortarray = {
      FullName: data.FullName,
      ShortId: data.ShortId,
      designation: data.designation,
      _Id: data._Id,
    }
    
    setTeamMemberData(text)
    // console.log('onSelect___text', text);
    // console.log('onSelect___data', data);
    setOwnerCollectn([...ownerCollectn,sortarray])
  };
  

  const onSelectTeam = (value) => {
    // console.log('ON SELECTION ______________', value);
    setTeamMemberData('')
    let _data = [...new Set([...teamMemberChip,value])]
    setTeamMemberChip(_data)
  }

  const removeTeamMember = (data,ind) => {
    console.log('removeTeamMember', data);
    console.log('ownerCollectn=====>>', ownerCollectn);
    let _arrayOwner = ownerCollectn.filter((item,index) => item.value !== data)
    setOwnerCollectn(_arrayOwner)
    let _array = teamMemberChip.filter((item,index) => index !== ind)
    setTeamMemberChip(_array)
  }
  
  
  return (
    <>
      <Modal title="To Do" 
        visible={props.isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        className='todo-popup-container-width'
        >
            <div className='Todo-Create-Container'>
                <div className='Todo-Col-shadow-box'>
                    <div className='Todo-Create-Header' style={{marginBottom:5}}>
                        <p style={{marginBottom:0}}> Add Team Member </p>
                    </div>
                    <div className='Todo-Create-SearchBox todoSearch'>
                        {/* <input type='text' placeholder='Search by Name'/> */}
                        {/* <SearchOutlined /> */}
                        {/* <Input addonAfter={<SearchOutlined />} placeholder="Search by Name" /> */}
                        {/* <Search placeholder="Search by Name" onSearch={onSearch}  /> */}
                        <AutoComplete
                          value={teamMemberData}
                          style={{width: '100%'}}
                          options={hierarAgentList}
                          onChange={(text,data)=> onChangeTeam(text,data) }
                          onSelect={onSelectTeam}
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }>
                            <Search  placeholder="Search by Name" />
                          </AutoComplete>
                    </div>
                    { teamMemberChip.length !== 0 &&
                        <div style={{display:'flex',flexFlow:'wrap',alignItems:'center'}}>
                          {
                            teamMemberChip.map((item,index) =>{
                              return(
                                <div style={{marginRight:10,marginTop:10,}}>
                                  <Button size="small" type="primary" style={{ backgroundColor: '#00ACC1', border: 'none',display:'flex',alignItems:'center' }} shape="round" >{item} <CloseOutlined onClick={() => removeTeamMember(item,index)} /></Button>
                                </div>
                              )
                          })
                          }
                        </div>
                      }
                    
                    <hr style={{margin:"10px 0", color:"#f4f4f4",opacity:"0.2"}}/>
                    <div className='Todo-Create-TextBox'>
                        <Input value={todoDesc} onChange={(e) => setTodoDesc(e.target.value)} type='text' placeholder='What do you need to remember To Do'/>
                        
                    </div>
                    <hr style={{margin:"10px 0", color:"#f4f4f4 !important",opacity:"0.2"}}/>
                    <div className='Todo-Create-Priority'>
                        <p style={{marginBottom:0}}>Add Priority</p>
                        <Button style={{backgroundColor:"#ff5252",color:"#fff"}} 
                        onClick={()=>{
                          setPriorityBtnColr('#ff5252')
                          setPriorityBtn('high')
                          setIsHighButtonClick(true)
                          if(isMediumButtonClick == true){
                            setIsMediumButtonClick(false)
                          }else if(isLowButtonClick ==true){
                            setIsLowButtonClick(false)
                          }
                        }}
                        className={isHighButtonClick ?'buttonOpacity':""}
                        >
                          High
                        </Button>
                        <Button 
                        style={{backgroundColor:"#fb8c00",color:"#fff"}} 
                        onClick={()=>{
                          setPriorityBtnColr('#fb8c00')
                          setPriorityBtn('medium')
                          setIsMediumButtonClick(true)
                          if(isHighButtonClick == true){
                            setIsHighButtonClick(false)
                          }else if(isLowButtonClick ==true){
                            setIsLowButtonClick(false)
                          }
                        }}
                        className={isMediumButtonClick ?'buttonOpacity':""}
                        >
                          Medium
                        </Button>
                        <Button style={{backgroundColor:"#4caf50",color:"#fff"}} 
                          onClick={()=>{
                            setPriorityBtnColr('#4caf50')
                            setPriorityBtn('low')
                          setIsLowButtonClick(true)
                          if(isHighButtonClick == true){
                            setIsHighButtonClick(false)
                          }else if(isMediumButtonClick ==true){
                            setIsMediumButtonClick(false)
                          }
                        }}
                        className={isLowButtonClick ?'buttonOpacity':""}
                        >
                          Low
                        </Button>
                    </div>
                    <hr style={{margin:"10px 0", color:"#f4f4f4 !important",opacity:"0.4"}}/>
                    <div className={[ windowWidth < breakpoint ? 'Todo-Create-FooterReminder-mob' : 'Todo-Create-FooterReminder' ]} style={{display: 'flex'}}>
                        <p>Set a Due Reminder</p>
                        {/* <input type='date' style={{marginBottom: '10px'}} /> */}
                        <DatePicker inputReadOnly={true} value={reminderDate} onChange={onChangeDatePick} disabledDate={d => !d || d.isBefore(minimumDate)} className='todo-ml10' style={{marginBottom: '10px',flex:1}}/>
                       
                          <Select value={selectedTime} className='todo-mb20 todo-ml10' style={{flex:1}} onChange={(time)=> handleTimeChange(time) }>
                            {
                              timeListText.map((e, index) => 
                                  <Option value={e.value}>{e.label}</Option>
                              )
                            }
                          </Select>
                        <div className='todo-ml10'>
                          {/* <Button onClick={()=> submitTodoData()} className='Todo-Create-FooterReminder-Button'>Save</Button> */}
                          <div onClick={()=> submitTodoData()} className='Todo-Create-FooterReminder-Button todo-mb20' style={{cursor:'pointer'}}>
                            <text>Save</text>
                          </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
      </Modal>
    </>
  );
};

export default TodoTab;