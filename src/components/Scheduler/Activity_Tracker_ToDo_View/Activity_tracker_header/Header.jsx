import React,{useState} from 'react'
import "./Header.css";
import {IoIosSearch} from 'react-icons/io';
import {AiOutlinePlus} from 'react-icons/ai';
import EventCreateComponent from "../../CalendarEvent";
const Header = ({callback}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [click,setClick]=useState(false);
	const showModal = (e) => {
		setIsModalVisible(true);
	};
  
  return (
    <>
    <div className='main_div'>
        <div className='left_div'>Activity Tracker</div>
        <div className='right_div'>
            <div className='input-field'>
            <input type="text" className="form-control" placeholder="Search"/>
            <span className='search-icon'><IoIosSearch size={20}/></span>
            </div>
            <div className='button'>
                <div className='plus-icon'><AiOutlinePlus size={15}/></div>
                <div className='btn-content' onClick={callback}>Create New Event</div>
            </div>
        </div>
          
    </div>

    </>
   
  )
}

export default Header