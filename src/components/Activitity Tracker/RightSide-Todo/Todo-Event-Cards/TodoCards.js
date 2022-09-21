import React,{useState,useEffect , forwardRef, useImperativeHandle, useRef} from 'react'
import TodoTab from '../TodoCreate-Tab/Todo-Tab'
import TodoClock from '../../icons/todoclock.png'
import hamburger from '../../icons/hamburger8@2x.png' 
import TodoData from '../../JSON/TodoData'
import Pagenation from '../../Pagenation/Pagenation'
import {FormOutlined,ShopOutlined} from '@ant-design/icons'
import '../Todo&Archive-Css/TodoCards.css'
import checkboxoutline from '../../icons/checkboxoutline.png'
import truecheckbox from '../../icons/truecheckbox.png'
import { Card, Col,Collapse,Pagination  } from 'antd'
import axiosRequest from '../../../../axios-request/request.methods';
import moment from 'moment'
import {stoageGetter} from '../../../../helpers'
import '../../../Activitity Tracker/Pagenation/Pagenation.css'
import noDataIcon from '../../../../assets/078e54aa9d@2x.png'

const TodoCards = forwardRef((props, ref) => {
    // console.log(TodoData.length);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showData, setShowData] = useState(false);
    const [getTodoDataArray, setGetTodoDataArray] = useState([]);
    const [updateData, setUpdateData] = useState({});
    const [totolDataCount, setTotolDataCount] = useState(0);
    const [buttonName, setButtonName] = useState('');
    
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const [isHamburger,setHamburger]=useState(false);
    const [skipVal,setSkipVal] = useState(0);
    const [fval,setFval] = useState(0);
    const [sval,setSval] = useState(0);
    const [swap_final_count,setSwap_final_count]=useState(false);

    const showModal = (event,ind) => {
        console.log('TODO__CARDD___DATA__',event)
        // setButtonName('Update')
        getTodoDataArray[ind].showarchiedpopup = false
        setUpdateData(event)
        setIsModalVisible(true);
    };

    useImperativeHandle(ref, () => ({
        getTodoData : () =>{ getTodoData(0) }
    }));
    

    const [isEditModalIndex,setisEditModalIndex]=useState();
    // const EditModal=(index)=>{
    //     // console.log(index);
    //     setisEditModalIndex(index)
    // }
    useEffect(()=> {
        getTodoData(0)
    },[])

    let getTodoData = async (skip) =>{
        try{
            const {id} = stoageGetter('user')
            let arrData = []
            let _resp = await axiosRequest.get(`user/fetch_todo_list?user_id=${id}&filter=all&skip=${skip}`, { secure: true })
            console.log('TODO__GETTTT___RESPPPP',_resp)
            let respData = _resp[0]
           
            setTotalPage(_resp[1][0].count / 5)
            
            setTotolDataCount(_resp[1][0].count)
            var less_enough = _resp[1][0].count
            var checkless_init = false
            less_enough < 5 ?  checkless_init = false : checkless_init = true

            // if less than 15 we have second value same as total value as no pagination will occur
            if (checkless_init) {
                // checkinit is true means the final count is more than 15
                var traverse = skip + 5
                setFval(traverse - 4)
                swap_final_count ? setSval(totolDataCount) : setSval(traverse)
            } else {
                setFval(1)
                setSval(totolDataCount)
            }

            for(let _data of respData){
                // console.log('DATATATATA',_data)
                let _icon = ''
                // let _remark = ''
                // let _enableRemark = null
                // let _disableSubmit = null
                let _textOverline = {}
                if(_data.taskOwner._id !== id){
                    _textOverline = _data.owernersCollectionDetails[0].taskDone === false ? {textDecorationLine: '',opacity: '0'}:{textDecorationLine: 'line-through',opacity: '0'}
                    _icon = _data.owernersCollectionDetails[0].taskDone === false ? checkboxoutline : truecheckbox
                }else{
                    _textOverline = _data.taskDone === false ? {textDecorationLine: '',opacity: '0'}:{textDecorationLine: 'line-through',opacity: '0'}
                    _icon = _data.taskDone === false ? checkboxoutline : truecheckbox
                }

                // _data.owernersCollectionDetails.forEach(event => { 
                //     // console.log("*********************** owernersCollectionDetails ****************",event.remarkText);
                //     if(event.remarkText !== ''){
                //         _enableRemark = false
                //         // _disableSubmit = true
                //         event.remarkData = event.remarkText
                //         event.disableSubmit = true
                //     }else{
                //         _enableRemark = true
                //         // _disableSubmit = false
                //         event.remarkData = event.remarkText
                //         event.disableSubmit = false
                //     }
                // })

                let objstrct = {
                    content: _data.description,
                    removeBtn: _data.taskDone,
                    icon :_icon ,
                    createddate: _data.createdDate,
                    dateofreminder : moment(_data.dateOfReminder).format('L'),
                    timeofreminder : parseInt(_data.timeOfReminder),
                    todoid :_data._id,
                    stringtimeofreminder:_data._stringVersionTimeOfReminder,
                    ownername:_data.taskOwner.first_name+' '+_data.taskOwner.last_name,
                    status : setTodoStatus(_data.dateOfReminder,parseInt(_data.timeOfReminder)),
                    searchdata: _data.owernersCollectionDetails,
                    taskOwner_id:_data.taskOwner._id, 
                    taskPriority:_data.taskPriority,
                    priorityIndicatorColor:_data.priorityIndicatorColor,
                    showMemberRemark:false,
                    showMemText:'Show More',
                    sooncolor: '#E46A25',
                    overduecolor:'#F44336',
                    showarchiedpopup:false,
                    textOverLine : _textOverline,
                    wholeData:_data
                }
                // console.warn('objstrct',objstrct)
                arrData.push(objstrct)
                
            }
            setGetTodoDataArray(arrData);
            console.warn('getTodoDataArray____DATAA',getTodoDataArray)
            setShowData(true)
        }catch(err){

        }
    }

    let setTodoStatus = (reminderDate, reminderTime) => {
        try{
            let reminderDay = reminderDate + reminderTime;
            let current_date = Date.now();

            let soon_time_ = reminderDay - ((60000 * 60) * 24);
            let start_time = new Date(current_date).setHours(0, 0, 0, 0)
            let end_time = new Date(current_date).setHours(23, 59, 59, 999)

            if (current_date > reminderDay) {
                return 'Overdue';  
            } else if (start_time < soon_time_ && soon_time_ < end_time ) {
                return 'Soon';  
            } else {
                return '';
            }
        }catch(err){
            console.log(err , '837270dc-c0d0-4049-b3cf-0ba00b631b8b');
        }
    }

    const archiveData = async (event) => {
        // console.log('TODO__CARDD___DATA__',event)
        //   setIsModalVisible(true);
        const {id} = stoageGetter('user')
        try{
            let formData = {
                // userId:id,
                userId:id,
                taskOwner : event.taskOwner_id,
                taskId: event.todoid,
                archive : true
            }   
            let _resp = await axiosRequest.put(`user/update_task_status`,formData, { secure: true })
            console.log("DATA Update:: Archived",_resp);
            setGetTodoDataArray([])
            getTodoData(0)

        }catch(err){
            // console.log(err , 'ce7372e5-ba6c-4ce9-8bdf-c59899feddf5');
        }
    };
    
    // const [isCompleted,setIscompleted]=useState();
    const Uncheck=(index)=>{
        // setIscompleted(
            getTodoDataArray.map((item)=>{
                if(item.taskOwner_id === index){
                    item.Completed === true ? item.Completed = false : item.Completed = true
                }
                return item
            })
        // )
    }

    const removListFromToDo = (data,rowIndex) => {
        // console.log('Check box data',data);
        // console.log('Index::',rowIndex);
            // console.log("From if condition")
            const {id} = stoageGetter('user')
            // userId:id,
           
            let _teamMembers = []
            let newData = getTodoDataArray;
            return getTodoDataArray.map((item,index) =>{
                if(data.removeBtn === false){
                    
                    newData[rowIndex].removeBtn = true
                    newData[rowIndex].icon = truecheckbox
                    newData[rowIndex].textOverLine.textDecorationLine = 'line-through'
                    setGetTodoDataArray(newData)

                    if(newData[rowIndex].taskOwner_id !== id){
                        let object={
                            FullName:newData[rowIndex].searchdata[0].FullName,
                            designation:newData[rowIndex].searchdata[0].designation,
                            _Id:newData[rowIndex].searchdata[0]._Id,
                            ShortId:newData[rowIndex].searchdata[0].ShortId,
                            remarkText: newData[rowIndex].searchdata[0].remarkText,
                            taskDone: true,
                            inAppNotification: newData[rowIndex].searchdata[0].inAppNotification,
                            remarkNotification: newData[rowIndex].searchdata[0].remarkNotification,
                        }
                        _teamMembers.push(object);

                        let formdata={
                            userId:id,
                            taskOwner : newData[rowIndex].taskOwner_id,
                            taskId :newData[rowIndex].todoid,
                            owernersCollectionDetails:_teamMembers
                        }
                        updateTODOTaskApi(formdata)
                    }else{
                        let formdata = {
                            userId:id,
                            taskOwner : newData[rowIndex].taskOwner_id,
                            taskId: data.todoid,
                            taskDone : true
                        }
                        updateTODOTaskApi(formdata)
                    }
                }else{
                    newData[rowIndex].removeBtn = false
                    newData[rowIndex].icon = checkboxoutline
                    newData[rowIndex].textOverLine.textDecorationLine = ''
                    setGetTodoDataArray(newData)

                    if(newData[rowIndex].taskOwner_id !== id){
                        let object={
                            FullName:newData[rowIndex].searchdata[0].FullName,
                            designation:newData[rowIndex].searchdata[0].designation,
                            _Id:newData[rowIndex].searchdata[0]._Id,
                            ShortId:newData[rowIndex].searchdata[0].ShortId,
                            remarkText: newData[rowIndex].searchdata[0].remarkText,
                            taskDone: false,
                            inAppNotification: newData[rowIndex].searchdata[0].inAppNotification,
                            remarkNotification: newData[rowIndex].searchdata[0].remarkNotification,
                        }
                        _teamMembers.push(object);

                        let formdata={
                            userId:id,
                            taskOwner : newData[rowIndex].taskOwner_id,
                            taskId :newData[rowIndex].todoid,
                            owernersCollectionDetails:_teamMembers
                        }
                        updateTODOTaskApi(formdata)
                    }else{
                        let formdata = {
                            userId:id,
                            taskOwner : newData[rowIndex].taskOwner_id,
                            taskId: data.todoid,
                            taskDone : false
                        }
                        updateTODOTaskApi(formdata)
                    }

                }
            })                    
    }

    const updateTODOTaskApi = async (data) =>{
        setGetTodoDataArray([])
        let _resp = await axiosRequest.put(`user/update_task_status`,data, { secure: true })
        console.log('UPDATE___RESPPP__',_resp)
        getTodoData(0)

    };
    
    const [ShowMore,setShowMore]=useState(false);
    const [isShowMoreIndex, setIsShowMoreIndex]=useState();
    const showMoreIndex =(index)=>{
        setIsShowMoreIndex(index);
    }
    // console.log(isShowMoreIndex);

    const onChangePagination = (page) => {
        console.log(page);
        let _decrement = 0
        let _increment = 0

        if(current > page){
            _decrement = skipVal - 5
            setSkipVal(_decrement)
            getTodoData(_decrement)
        }else if(current < page) {
            _increment = skipVal + 5
            setSkipVal(_increment)
            getTodoData(_increment)
        }
        setCurrent(page)
    }

    const Showpopuptodo = (ind,data) => {
        let _data = getTodoDataArray.map((ev,index)=>{
            ind === index ?  ev.showarchiedpopup === true ? ev.showarchiedpopup = false : ev.showarchiedpopup = true   : ev.showarchiedpopup = false
            return ev
        }) 
        setGetTodoDataArray(_data)
    }

    let fetchTodo = () =>{
        return getTodoDataArray.map((element,index)=>{
            // console.log('DATATATATA____',element)
            return(
                <div className='TodoCard-Container' key={index}>
                    <div className='TodoCards-Top'>
                        <div className='TodoCards-TimedateArchive' sm>
                            <Col className='TodoCards-TopClock'>
                                <div className='todoCard-mr15'>
                                    <img src={TodoClock} alt='alarm'/>
                                </div>
                                <div>
                                    <text style={{color: element.status === 'Soon' ? element.sooncolor : element.status === 'Overdue' ? element.overduecolor : '#000',fontSize:14,fontWeight:'bolder'}}>{element.status} </text>
                                </div>
                                <div style={{marginLeft:5}}>
                                    <text style={{color:element.status === 'Soon' ? element.sooncolor : element.status === 'Overdue' ? element.overduecolor : '#000',fontSize:14,fontWeight:'bolder'}}>{element.stringtimeofreminder} : {element.dateofreminder}</text>
                                </div>
                            </Col>
                            <div style={{paddingLeft:10,paddingRight:5}}>
                                <img alt='' src={hamburger} style={{height:15, width:3,cursor:"pointer"}} onClick={(e)=>{ Showpopuptodo(index,element) }}/>
                            </div>
                            <div className='Hamburger-Edit'>
                            {
                                element.showarchiedpopup === true &&
                                    <div className='TodoCard-Container-Hamburger'>
                                        <Card className='Hamburger-Card Hamburger-box'>
                                            <p onClick={()=> showModal(element,index)}  style={{display:'flex',alignItems:'center'}}>
                                                <FormOutlined style={{marginRight:"10px"}} />Edit
                                            </p>
                                            <hr style={{color:'#e6e9eb', opacity:'0.3'}}/>
                                            <p onClick={()=> archiveData(element)} style={{display:'flex',alignItems:'center'}}>
                                                <ShopOutlined style={{marginRight:"10px"}}/> Archive
                                            </p>
                                        </Card>
                                    </div>
                            }
                            </div>
                            
                        </div>
                    </div>
                    <div className='TodoCards-Body'>
                            {/* <div className='TodoCard-Body-CheckBox'>
                                <input type='checkbox'   onClick={(e)=>{Uncheck(element.taskOwner_id)}}/>
                            </div> */}
                            <div className='TodoCard-Body-CheckBox todoCard-mr15' onClick = {()=> removListFromToDo(element ,index)}>
                                <img src={element.icon} className='archive-trueCheckBox' alt='trueCheckBox'/>
                            </div>
                            <p style={{textDecorationLine : element.textOverLine.textDecorationLine}} >{element.content}</p>
                            {/* <p style={[{textDecorationLine : element.textOverLine.textDecorationLine}]} className={element.removeBtn ?"textDecoration":""}>{element.content}</p> */}
                    </div>
                    <div className='Todo-Footer'>
                        <p style={{textTransform: 'capitalize',fontWeight:'bolder'}}>{element.ownername}</p>
                        <button style={{textTransform: 'capitalize',backgroundColor:element.priorityIndicatorColor}}>{element.taskPriority}</button>
                        {/* {
                            element.taskPriority === "high" ?
                            <button style={{backgroundColor:"#ff5252"}}>{element.taskPriority}</button>
                            :element.taskPriority === "low" ?
                            <button style={{backgroundColor:"#4caf50"}}>{element.taskPriority}</button>
                            :<button >{element.taskPriority}</button>
                        } */}
                        {/* {backgroundColor:item.priorityIndicatorColor} */}
                        {/* {
                            !ShowMore?
                                <p style={{color:"#00acc1"}} 
                                onClick={(e)=>{
                                    setShowMore(true);
                                    showMoreIndex(element.taskOwner_id)
                                }}
                                >
                                    Show More
                                </p>
                                :isShowMoreIndex == element.taskOwner_id ? 
                                <p style={{color:"#00acc1"}}
                                onClick={()=>{
                                    setShowMore(false)
                                    showMoreIndex(element.taskOwner_id)
                                }}
                                >
                                    Show Less
                                </p>
                                :
                                <p style={{color:"#00acc1"}} 
                                onClick={(e)=>{
                                    setShowMore(true);
                                    showMoreIndex(element.taskOwner_id)
                                }}
                                > Show More</p>
                        } */}
                    
                    </div>
                        {/* {
                            isShowMoreIndex == element.taskOwner_id ?
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
                        } */}
                </div>
            )
    
        })
    }
  return (
    <div className="site-card-border-less-wrapper">
        {showData === true &&
            <div>
                <div>{ fetchTodo() }</div>
                
                <div className='TodoCard-Pagenation'>
                    <div className='Pagenation-Content'>
                        <p className='Pagenation-RecordsData'>Showing {fval} to {sval}</p>
                        <p className='Pagenation-OutOfData'>Out of {totolDataCount} records</p>
                    </div>

                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <Pagination
                            pageSize={5}
                            current={current}
                            total={totolDataCount}
                            onChange={onChangePagination}
                        />
                     </div>
                </div>
            </div>
        }

        {showData === false  &&
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',padding:50}} >  
                <img src={noDataIcon} style={{height:150,width:100}}/>
                <div style={{marginTop:10}}>
                    <text  style={{  textAlign:'center',fontSize:14}} > No records found </text>
                </div>
            </div>
        }
        <TodoTab getTodoData={ getTodoData } button={'Update'}  editData={updateData} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
         

  </div>
  )
})

export default TodoCards