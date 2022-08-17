import React,{useState} from 'react'
import TodoClock from '../../icons/todoclock.png'
import TodoData from '../../JSON/TodoData'
import Pagenation from '../../Pagenation/Pagenation'
import truecheckbox from '../../icons/truecheckbox.png'
import '../Todo&Archive-Css/TodoCards.css'

const Archive = () => {
    const [ShowMore,setShowMore]=useState(false);

    const [currentPage,setCurrentPage]=useState(1);
    const [postPerPage,setPostPerPage]=useState(5);
    //get Current Post
    const indexOfLastPost=currentPage*postPerPage;
    const indexOfFirstPost=indexOfLastPost-postPerPage;
    const currentPost= TodoData.slice(indexOfFirstPost,indexOfLastPost)
    console.log(currentPost);
    //change pages
    const paginate=(pageNumber)=> setCurrentPage(pageNumber)
    return (
        <div className="site-card-border-less-wrapper">
            {
                currentPost.map((element,index)=>{
                    return(
                        <div className='TodoCard-Container' key={index}>
                            <div className='TodoCards-Top'>
                                <div className='TodoCards-TimedateArchive'>
                                    <div className='TodoCards-TopClock'>
                                        <img src={TodoClock} alt='alarm'/>
                                        <p className='TimedateArchive-Time' style={{color:"#000",opacity:".9"}}>
                                            {element.Data.Time} : {element.Data.Date}
                                        </p>
                                    </div>
                                    <div className='' style={{fontSize:"12px",fontWeight:"bold"}}>
                                        Archive : {element.Data.Archive}
                                    </div>
                                </div>
                            </div>
                            <div className='TodoCards-Body'>
                                <div className='TodoCard-Body-CheckBox'>
                                    <img src={truecheckbox} className='archive-trueCheckBox' alt='trueCheckBox'/>
                                </div>
                                <p style={{marginLeft:'20px'}}>{element.Data.Task}</p>
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
                            </div>
                        </div>
                    )
                })
            }
            <div className='TodoCard-Pagenation'>
                <Pagenation postPerPage={postPerPage} totalPost={TodoData.length} paginate={paginate}/>
            </div>
        </div>
    )
}

export default Archive