import React,{useState , useRef} from 'react'
import { Typography } from 'antd'
import {PlusCircleFilled} from '@ant-design/icons'
import TodoCards from '../RightSide-Todo/Todo-Event-Cards/TodoCards'
import Archive from './Archive/Archive'
import TodoTab from './TodoCreate-Tab/Todo-Tab'
import './Todo.css'

const Todo = () => {
  const [isActive,setIsActive]=useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const childRef = useRef(null);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const getTodo = () => {
    childRef.current.getTodoData(0)
  }
  return (
    <div className='Todo-Container'>
        <div className='Todo-Top'>
            <Typography>To Do</Typography>
            <div className='Todo-CreateBtn'>
                <Typography>Create new Task</Typography>
                <PlusCircleFilled onClick={showModal}/>
                <TodoTab getTodoData={ getTodo } button={'Create'} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
            </div>
        </div>
        <div className='Todo-Button'>
          <div className='Todo-Button-Todo'>
            <button 
              className={isActive ? "active TodoButtons":"TodoButtons"}
              onClick={(e)=>{
                setIsActive(true)
              }}
            >
              To Do
            </button>
          </div>
          <div className='Todo-Button-Archive'>
            <button 
              className={!isActive ? "active TodoButtons":"TodoButtons"}
              onClick={(e)=>{
                setIsActive(false)
              }}
            >
              Archive
            </button>
          </div>
        </div>
        <div className='TodoCards'>
          {
            isActive ?
            <TodoCards ref={childRef}/>
            :
            <Archive/>
          }
        </div>
    </div>
  )
}

export default Todo