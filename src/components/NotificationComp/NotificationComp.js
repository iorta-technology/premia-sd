import React, {useState, useEffect} from 'react'
import { Row, Col } from 'antd'
import './Notification.css'
import { Link,useHistory } from 'react-router-dom';

const NotificationComp = () => {
    const history = useHistory();
    

    const MAX_ITEMS = 3;
    const [isOpen, setIsOpen] = useState(false)
    // api integation 
    const [_notify, set_Notify] = useState('') 
    
    useEffect(() => {
        // simple using fetch  
        const url = "https://pocbancanode.iorta.in/secure/user/getnotification/60edb0e28ac1941f0185b6c9?notification_type=alerts&readStatus=2&skip=0";
        const fetchData = async () => {
          try {
            const response = await fetch(url);
             const json = await response.json();
           console.log("-----", json.errMsg[0])
                // let date = json.dbDate
                // console.log("jhjgh", date);
            set_Notify(json.errMsg[0]);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData()
    }, [])

    
    function toggle(){
        // setTimeout(() => {
        //     return("hh", )  
        // }, 2000);
        setIsOpen(!isOpen)
        
    }

    function getRenderedItems() {
        if (isOpen) {
          return _notify;
        }
        return _notify.slice(0, MAX_ITEMS);
      }

    
      
  return (
    <>
        <div className="header">
            <Row >
                <Col><p className="product-title">Notification</p></Col>
            </Row>
        </div>
        
       {/* Start the node data */}

        <div className='mainTab'>
            <div className="stepper d-flex flex-column mt-2 ml-2">
                <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                    <div className='startNode'></div>
                        <div className="line h-100"></div>
                    </div>
                    <div>
                        <div className='notifyHead'>
                            <h4>Alert</h4>
                        </div>
                    </div>
                </div>

                {
                   Array.isArray(getRenderedItems()) ?
                   getRenderedItems().map((notify, index) => {
                        return <div key={index} className="d-flex mb-1 ml-4">
                        <div className="d-flex flex-column pr-4 align-items-center">
                            <div className='steps'></div>
                            <div className="line h-100"></div>
                        </div>
                        <div className='responsive_panel'>
                            <div className='box-data1'>
                                <div className='notification_data1'>
                                    <div className='list_data1'>
                                        <h4>{notify.title}</h4>
                                        <p>{notify.body}</p>
                                    </div>
                                    <div className='date1'>
                                        <p>{notify.time_date ? notify.time_date : '12:38 pm, September 23rd, 2022'}</p>
                                        <button onClick={() => { history.push('/calender') }}>{notify.details ? notify.details : 'View Details'}</button>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                 </div>
                    }): null
                }
            </div>


            {/* load more button */}
            <div className='loadMore'>
                <button onClick={toggle}>
                     {isOpen ? 'Load Less' : 'Load More'}
                </button>
            </div>
            
        </div>
    </>
  )
}

export default NotificationComp