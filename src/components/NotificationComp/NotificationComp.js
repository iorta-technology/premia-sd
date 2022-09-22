import React, {useState} from 'react'
import { Row, Col } from 'antd'
import './Notification.css'

const NotificationComp = () => {

    const notify_data = [
        {heading: 'TO-DO', desc: 'You have been assigned a new task(Complete report) by Bhanyshree', time_date: '6:36 pm, July 19th, 2022', details: 'View Details'},
        {heading: 'TO-DO', desc: 'You have been assigned a new task(Complete report) by Bhanyshree', time_date: '6:36 pm, July 19th, 2022', details: 'View Details'},
        {heading: 'TO-DO', desc: 'You have been assigned a new task(Complete report) by Bhanyshree', time_date: '6:36 pm, July 19th, 2022', details: 'View Details'},
        {heading: 'TO-DO', desc: 'You have been assigned a new task(Complete report) by Bhanyshree', time_date: '6:36 pm, July 19th, 2022', details: 'View Details'},
        {heading: 'TO-DO', desc: 'You have been assigned a new task(Complete report) by Bhanyshree', time_date: '6:36 pm, July 19th, 2022', details: 'View Details'},
    ]

    const MAX_ITEMS = 3;
    const [isOpen, setIsOpen] = useState(false)

    function toggle(){
        setIsOpen(!isOpen)
    }

    function getRenderedItems() {
        if (isOpen) {
          return notify_data;
        }
        return notify_data.slice(0, MAX_ITEMS);
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
                    getRenderedItems().map((notify, index) => {
                        return <div className="d-flex mb-1 ml-4">
                        <div className="d-flex flex-column pr-4 align-items-center">
                            <div className='steps'></div>
                            <div className="line h-100"></div>
                        </div>
                        <div className='responsive_panel'>
                            <div className='box-data1'>
                                <div className='notification_data1'>
                                    <div className='list_data1'>
                                        <h4>{notify.heading}</h4>
                                        <p>{notify.desc}</p>
                                    </div>
                                    <div className='date1'>
                                        <p>{notify.time_date}</p>
                                        <button>{notify.details}</button>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                 </div>
                    })
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