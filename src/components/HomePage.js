import React, { Fragment } from 'react';
import './HomePage.css';
import {Image } from 'antd';
// import { Bar } from '@ant-design/charts';
import 'antd/dist/antd.css';
const HomePage = () => {
//   const salesData = [];
// for (let i = 0; i < 12; i += 1) {
//   salesData.push({
//     x: `${i + 1}月`,
//     y: Math.floor(Math.random() * 1000) + 200,
//   });
// }
  return <Fragment >
    <div className="cardHolder">
      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3371.png" alt="Activities" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Activities</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} />
          </div>
        </div>
        <div className="events-body">
          <Image className="stars" preview={false} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group127.png" alt="Events" />
          <p style={{ color: '#CEA0E1', fontSize: '20px',width:"fit-content",margin:"auto" }}>No Events Exist</p>
          <div style={{ color: '#fff', padding:"5px 20px", backgroundColor: '#CEA0E1', width: '40%',width:"fit-content",margin:"auto", cursor: 'pointer' }}>Create an Event</div>

        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#86ACEC' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3367.png" alt="Opportunities" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Opportunities</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '280%', margin: '-6px' }} />
          </div>
        </div>
        <div style={{marginTop:"40px"}}>
          {/* <Bar height={120}/> */}
        </div>
        <div style={{ display: 'flex',justifyContent:"center",marginTop:"10px" }}>
              <div style={{padding:"0 20px",borderRight:"1px solid #fff",textAlign:"center",color:"#fff"}}>
              <p>For Today</p>
              <h1 style={{color:"#fff",fontSize:"35px"}}>00</h1>
              </div>
              <div style={{padding:"0 20px",textAlign:"center",color:"#fff"}}>
              <p>Open</p>
              <h1 style={{color:"#fff",fontSize:"35px"}}>00</h1>
              </div>
            </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3373.png" alt="Opportunities" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Applications</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex',justifyContent:"center",marginTop:"40px" }}>
              <div style={{padding:"0 20px",borderRight:"1px solid #fff",textAlign:"center",color:"#fff"}}>
              <p>Renewals</p>
              <h1 style={{color:"#fff",fontSize:"35px"}}>00</h1>
              </div>
              <div style={{padding:"0 20px",textAlign:"center",color:"#fff"}}>
              <p>Customers</p>
              <h1 style={{color:"#fff",fontSize:"35px"}}>00</h1>
              </div>
            </div>
            <hr style={{border:"none",borderBottom:"1px solid #fff",width:"200px"}}/>
        <div style={{ display: 'flex',justifyContent:"center",marginTop:"10px" }}>
              <div style={{padding:"0 20px",borderRight:"1px solid #fff",textAlign:"center",color:"#fff"}}>
              <p>Renewals</p>
              <h1 style={{color:"#fff",fontSize:"35px"}}>00</h1>
              </div>
              <div style={{padding:"0 20px",textAlign:"center",color:"#fff"}}>
              <p>Customers</p>
              <h1 style={{color:"#fff",fontSize:"35px"}}>00</h1>
              </div>
            </div>
        
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3366.png" alt="Business" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Business</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} />
          </div>
        </div>
        <div style={{marginTop:"50px"}}>
          <div style={{float:"right"}}>
            <select style={{backgroundColor:"transparent",border:"none",borderBottom:"1px solid #fff",outline:"none",boxShadow:"none",color:"#fff",appearance:'none'}}>
              <option style={{color:"#000"}} value="data1">Month to Date</option>
              <option  style={{color:"#000"}} value="data1">Weak to Date</option>
              <option  style={{color:"#000"}} value="data1">Year to Date</option>
              <option  style={{color:"#000"}} value="data1">Goal Sheet to Date</option>
            </select>
          </div>
          <p style={{color:"#fff"}}>Logins</p>
          <div style={{display:"flex",color:"#fff"}}>
            <div style={{width:"120px"}}>
            <p>12400</p>
            <p>Target</p>
            </div>
            <div style={{width:"120px"}}>
            <p>12400</p>
            <p>Achieved</p>
            </div>
            <div style={{width:"120px"}}>
            <p>12400</p>
            <p>Shortfall</p>
            </div>
            </div>
          <p style={{color:"#fff"}}>Issuance</p>
          <div style={{display:"flex",color:"#fff"}}>
            <div style={{width:"120px"}}>
            <p>12400</p>
            <p>Target</p>
            </div>
            <div style={{width:"120px"}}>
            <p>12400</p>
            <p>Achieved</p>
            </div>
            <div style={{width:"120px"}}>
            <p>12400</p>
            <p>Shortfall</p>
            </div>
  </div>
          
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1',overflow:"hidden" }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="Actions" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Actions</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '480%', margin: '-6px' }} />
          </div>
          <div className="action-cards-content">
            <div style={{ width: 300}}>
              <p style={{width:"100%",margin:"0"}}>New Leads <span style={{float:"right",color:'#00ACC1',cursor:"pointer",textDecoration:'underline'}}>Dismiss</span></p>
              <h1><b style={{color:'#00ACC1'}}>10</b> <span style={{fontSize:"12px",fontWeight:"400"}}>Unallocated leads in the list</span></h1>
            </div>
            <div style={{ width: 300}}>
              <p style={{width:"100%",margin:"0"}}>New Leads <span style={{float:"right",color:'#00ACC1',cursor:"pointer",textDecoration:'underline'}}>Dismiss</span></p>
              <h1><b style={{color:'#00ACC1'}}>10</b> <span style={{fontSize:"12px",fontWeight:"400"}}>Unallocated leads in the list</span></h1>
            </div>
            <div style={{ width: 300}}>
              <p style={{width:"100%",margin:"0"}}>New Leads <span style={{float:"right",color:'#00ACC1',cursor:"pointer",textDecoration:'underline'}}>Dismiss</span></p>
              <h1><b style={{color:'#00ACC1'}}>10</b> <span style={{fontSize:"12px",fontWeight:"400"}}>Unallocated leads in the list</span></h1>
            </div>
            <div style={{ width: 300}}>
              <p style={{width:"100%",margin:"0"}}>New Leads <span style={{float:"right",color:'#00ACC1',cursor:"pointer",textDecoration:'underline'}}>Dismiss</span></p>
              <h1><b style={{color:'#00ACC1'}}>10</b> <span style={{fontSize:"12px",fontWeight:"400"}}>Unallocated leads in the list</span></h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="ToDo" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>To Do</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} />
          </div>
         
        </div>
        <div style={{height:"75%"}} className="events-body">
            <p style={{ color: '#00ACC1', fontSize: '18px',fontWeight:"600", margin:"0 auto",width:"fit-content",paddingTop:"50%" }}>No Active Task</p>

          </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#5EC0AD' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Customers</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '350%', margin: '-6px' }} />
          </div>
        </div>
        <div className='rewardscorner-text'>

        <div style={{ display: 'flex',justifyContent:"center" }}>
              <div style={{padding:"0 20px",borderRight:"1px solid #fff",textAlign:"center",color:"#fff"}}>
              <p>Renewals</p>
              <h1 style={{color:"#fff",fontSize:"40px"}}>00</h1>
              <p><b>New</b></p>
              </div>
              <div style={{padding:"0 20px",textAlign:"center",color:"#fff"}}>
              <p>Customers</p>
              <h1 style={{color:"#fff",fontSize:"40px"}}>00</h1>
              <p><b>New</b></p>

              </div>
            </div>
            </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#00ACC1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3379.png" alt="Rewards Corner" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Rewards Corner</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '240%', margin: '-6px' }} />
          </div>
          <div className='rewardscorner-text'>
            <div style={{ display: 'flex',justifyContent:"center" }}>
              <div style={{padding:"0 20px",borderRight:"1px solid #fff",textAlign:"center",color:"#fff"}}>
              <Image preview={false}  width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3151.png" alt="contests" hspace="20" />
              <p>Contests</p>
              </div>
              <div style={{padding:"0 20px",textAlign:"center",color:"#fff"}}>
              <Image preview={false} width={90} height={90} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3157.png" alt="clubs" />
              <p>Clubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#86ACEC' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3369.png" alt="Sales Guide" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Service Corner</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} />
          </div>
            <div className="salesGuideCont">
              < div >
                <p>WIP</p>
                <h1>00</h1>
              </ div>
              < div>
                <p>Closed</p>
                <h1>00</h1>
              </ div>
              < div  >
                <p>Claim</p>
                <h1>00</h1>
              </ div>
          </div>
          <div style={{marginTop:"30px",textAlign:"center"}}>
          <p className="sales-content" style={{ height: 35, width: "fit-content",padding:"5px 15px",display:"inline-block" }}>Downloads</p>
          <p className="sales-content" style={{ height: 35, width: "fit-content",padding:"5px 15px",display:"inline-block",marginLeft:"10px" }}>FAQ's</p>

          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3369.png" alt="Sales Guide" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Sales Guide</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} />
          </div>
          <div className="sales-guide-content">
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 100 }}>sales pitch</p>
              <p className="sales-content" style={{ height: 35, width: 130 }}>Resource Center</p>
            </div>
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 100 }}>Product</p>
              <p className="sales-content" style={{ height: 35, width: 130 }}>Need Analysis</p>
            </div>
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 200 }}>Advisor OnBoarding</p>
            </div>
            <div className="b1-content">
              <p className="sales-content" style={{ height: 35, width: 200 }}>Recruitment Presentation</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" dataCard" bordered={false} style={{ backgroundColor: '#CEA0E1' }}>
        <div className="card-content">
          <div className="activity-icon">
            <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3376.png" alt="Birthday" />
          </div>
          <div className="activities-text">
            <p style={{ fontSize: '15px',color:'#fff' }}>Birthday</p>
            <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} />
          </div>

          <div className="birthday-slides">
            <Image preview={false} width={32} height={32} src="https://sdrestdemo.iorta.in/assets/Subtraction10.png" alt="left arrow" />
            <Image preview={false} width={32} height={32} src="https://sdrestdemo.iorta.in/assets/Subtraction9.png" alt="right arrow" />
          </div>
        </div>
      </div>
    </ div>
    </Fragment>
}
export default HomePage;