import React,{useState,useEffect} from 'react'
import TodoTab from '../TodoCreate-Tab/Todo-Tab'
import TodoClock from '../../icons/todoclock.png'
import hamburger from '../../icons/hamburger8@2x.png' 
import TodoData from '../../JSON/TodoData'
import Pagenation from '../../Pagenation/Pagenation'
import {FormOutlined,ShopOutlined} from '@ant-design/icons'
import '../Todo&Archive-Css/TodoCards.css'
import checkboxoutline from '../../icons/checkboxoutline.png'
import truecheckbox from '../../icons/truecheckbox.png'
import { Card, Col,Collapse  } from 'antd'

const TodoCards = () => {
    console.log(TodoData.length);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
      setIsModalVisible(true);
    };
    const [isEditModalIndex,setisEditModalIndex]=useState();
    const EditModal=(index)=>{
        console.log(index);
        setisEditModalIndex(index)
    }
    // const[isCheckBox,setIsCheckBox]=useState(true);
    // const [isCompleted,setIscompleted]=useState(TodoData.map((element)=>{
    //     return element.Data
    // }));
    // const Uncheck=(data)=>{
    //     console.log(data);
    //     let a = [...isCompleted]
    //     if(a[data].Completed == true){
    //         a[data].Completed = false
    //     }else{
    //         a[data].Completed = true
    //     }
    //      setIscompleted(a)
    //     console.log(isCompleted);
    // }
///////chech Box/////
    const [isCompleted,setIscompleted]=useState();
    const Uncheck=(index)=>{
        setIscompleted(
            TodoData.map((item)=>{
                if(item.Data.id == index){
                    if(item.Data.Completed == true){
                        item.Data.Completed =false
                    }else{
                        item.Data.Completed=true
                    }
                }
                return item
            })
        )
    }
    // const [checkBoxTrue,setCheckBoxTrue]=useState(true);
    // const [checkBoxIndex,setCheckBoxIndex]=useState();
    // const Handle_CheckBoxIndex=(index)=>{
    //     setCheckBoxIndex(index)
    // }
//////-check box---finish------////////////////
    
const [ShowMore,setShowMore]=useState(false);
    const [isShowMoreIndex, setIsShowMoreIndex]=useState();
    const showMoreIndex =(index)=>{
        setIsShowMoreIndex(index);
    }
    console.log(isShowMoreIndex);

    const [currentPage,setCurrentPage]=useState(1);
    const [postPerPage]=useState(5);
    //get Current Post
    const indexOfLastPost=currentPage * postPerPage;
    const indexOfFirstPost=indexOfLastPost - postPerPage;
    const currentPost= TodoData.slice(indexOfFirstPost,indexOfLastPost)
    const paginate=(pageNumber)=> setCurrentPage(pageNumber)
    //pages -pagination ---finish---

    const [isHamburger,setHamburger]=useState(false);
  return (
    <div className="site-card-border-less-wrapper">
        {
            currentPost.map((element,index)=>{
                return(
                    <div className='TodoCard-Container' key={element.Data.id}>
                        <div className='TodoCards-Top'>
                            <div className='TodoCards-TimedateArchive' sm>
                                <Col className='TodoCards-TopClock'>
                                    <img src={TodoClock} alt='alarm'/>
                                    <p>OverDue :</p>
                                    <p className='TimedateArchive-Time'>{element.Data.Time} : {element.Data.Date}</p>
                                </Col>
                                <img alt='' src={hamburger} 
                                style={{backgroundSize: '100% 100%',cursor:"pointer"}} 
                                onClick={(e)=>{
                                    if(isHamburger == false){
                                        setHamburger(true)
                                    }else{
                                        setHamburger(false)
                                        EditModal(element.Data.id)
                                    }
                                    EditModal(element.Data.id)
                                }}/>
                                <div className='Hamburger-Edit'>
                                {
                                    isEditModalIndex == element.Data.id ? isHamburger== true?
                                        <div className='TodoCard-Container-Hamburger'>
                                            <Card className='Hamburger-Card Hamburger-box'>
                                                <p>
                                                    <FormOutlined style={{margin:"0 5px 5px 0"}}
                                                    onClick={showModal}
                                                    /> Edit
                                                </p>
                                                <hr style={{color:'#e6e9eb', opacity:'0.3'}}/>
                                                <p>
                                                    <ShopOutlined style={{margin:"5px 5px 0 0"}}/> Archive
                                                </p>
                                            </Card>
                                        </div>
                                    :""
                                    :""
                                }
                                <TodoTab isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
                                </div>
                                
                            </div>
                        </div>
                        <div className='TodoCards-Body'>
                                <div className='TodoCard-Body-CheckBox'>
                                    <input type='checkbox'  checked={element.Data.Completed} onClick={(e)=>{
                                        Uncheck(element.Data.id);
                                    }}/>
                                </div>
                                <p 
                                className={element.Data.Completed ?"textDecoration":""}>
                                    {element.Data.Task}
                                </p>
                        </div>
                        <div className='Todo-Footer'>
                            <p>{element.Data.Name}</p>
                            {
                                element.Data.Priority =="High" ?
                                <button style={{backgroundColor:"#ff5252"}}>{element.Data.Priority}</button>
                                :element.Data.Priority =="Low" ?
                                <button style={{backgroundColor:"#4caf50"}}>{element.Data.Priority}</button>
                                :<button >{element.Data.Priority}</button>
                            }
                            {
                                !ShowMore?
                                    <p style={{color:"#00acc1"}} 
                                    onClick={(e)=>{
                                        setShowMore(true);
                                        showMoreIndex(element.Data.id)
                                    }}
                                    >
                                        Show More
                                    </p>
                                    :isShowMoreIndex == element.Data.id ? 
                                    <p style={{color:"#00acc1"}}
                                    onClick={()=>{
                                        setShowMore(false)
                                        showMoreIndex(element.Data.id)
                                    }}
                                    >
                                        Show Less
                                    </p>
                                    :
                                    <p style={{color:"#00acc1"}} 
                                    onClick={(e)=>{
                                        setShowMore(true);
                                        showMoreIndex(element.Data.id)
                                    }}
                                    > Show More</p>
                            }
                           
                        </div>
                            {
                                isShowMoreIndex == element.Data.id ?
                                    ShowMore == true?
                                    <div className="TodoCard-Footer">
                                        <div className='TodoCard-Footer-Main'>
                                            <span>Submited by : 
                                                <p style={{color:'#5ea5c0',margin:"14px"}}>{element.Data.Submitied}</p>
                                            </span>
                                                <p>{element.Data.t}</p>
                                        </div>
                                    </div>
                                :'':""
                            }
                    </div>
                )
           
            })
        }
         
        <div className='TodoCard-Pagenation'>
            <Pagenation postPerPage={postPerPage} 
            total={TodoData.length}
            totalPost={Math.ceil(TodoData.length/postPerPage)} 
            paginate={paginate} pageSize={5}/>
        </div>
  </div>
  )
}

export default TodoCards