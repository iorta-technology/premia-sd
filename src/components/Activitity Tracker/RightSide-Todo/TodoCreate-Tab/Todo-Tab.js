import { Button, Modal,TimePicker  } from 'antd';
import React, { useState } from 'react';
import {SearchOutlined} from '@ant-design/icons'
import moment from 'moment';
import './Todo-Tab.css'

const TodoTab = ({isModalVisible,setIsModalVisible}) => {  

  const [isHighButtonClick ,setIsHighButtonClick]=useState(true)
  const [isMediumButtonClick ,setIsMediumButtonClick]=useState(false)
  const [isLowButtonClick ,setIsLowButtonClick]=useState(false)

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  return (
    <>
      <Modal title="To Do" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        className='todo-popup-container-width'
        >
            <div className='Todo-Create-Container'>
                <div className='Todo-Col-shadow-box'>
                    <div className='Todo-Create-Header'>
                        <p>
                            Add Team Member
                        </p>
                    </div>
                    <div className='Todo-Create-SearchBox'>
                        <input type='text' placeholder='Search by Name'/>
                        <SearchOutlined />
                    </div>
                    <hr style={{margin:"10px 0", color:"#f4f4f4",opacity:"0.2"}}/>
                    <div className='Todo-Create-TextBox'>
                        <input type='text' placeholder='What do you need to remember To Do'/>
                    </div>
                    <hr style={{margin:"10px 0", color:"#f4f4f4 !important",opacity:"0.2"}}/>
                    <div className='Todo-Create-Priority'>
                        <p>Add Priority</p>
                        <Button style={{backgroundColor:"#ff5252",color:"#fff"}} 
                        onClick={()=>{
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
                    <div className='Todo-Create-FooterReminder'>
                        <p>Set a Due Reminder</p>
                        <input type='date'/>
                        <TimePicker onChange={onChange} 
                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        <Button className='Todo-Create-FooterReminder-Button'>Save</Button>
                    </div>
                </div>
            </div>
            
      </Modal>
    </>
  );
};

export default TodoTab;