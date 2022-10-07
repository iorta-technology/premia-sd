import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link,useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import moment from 'moment'
import './SideBar.css'
import { IconContext } from 'react-icons/lib';
import { BarChartOutlined } from '@ant-design/icons';
import { createBrowserHistory } from "history";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { stoageGetter } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  



// -- Import Image -- //
import sales_logo_img from '../../images/salesDrivelogo.png'
import switch_img from '../../assets/Group75902x.png'
import right_black_img from '../../assets/MaterialUiIcons/chevron_right_black_192x192.png'
import draftr_img from '../../assets/draftr.png'
import rapps_img from '../../assets/rapps.png'
import allrec_img from '../../assets/allrec.png'
import rdone_img from '../../assets/rdone.png'
import failed_img from '../../assets/failed.png'
import needhelp_img from '../../assets/needhelp.png'
import all_clear_img from '../../assets/MaterialUiIcons/notifications_grey_192x192.png'

const Nav = styled.div`
  background: #15171c;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  column-gap:20px;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  z-index:10;
`;

const NavIcon = styled(Link)`
 
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  
`;

const SidebarNav = styled.nav`
  background: #fff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
// const history = createBrowserHistory()

// let currentRoute = history.location.pathname.replace('/', '')
// console.log("path name",currentRoute)
const login_user_data = stoageGetter('user')
console.warn('LOGIN USER',login_user_data)
if(login_user_data === null) window.location.replace('/login')


function Modal1({ children, shown, close }) {
  return shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className="modal-content"
        onClick={e => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {/* <button onClick={close}>Close</button> */}
        {children}
      </div>
    </div>
  ) : null;
}


const Sidebar = () => {
  const userId = useSelector(state => state.login.userId)
  const history = useHistory();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const [modalShown, toggleModal] = useState(false);
  const [clearBtn, setClearBtn] = useState(true)


  const clearData = () =>{
    setClearBtn(!clearBtn)
  }

const [_notify, set_Notify] = useState([]) 

// useEffect(() => {
//   // simple using fetch  
//   const url = "https://pocbancanode.iorta.in/secure/user/getnotification/60edb0e28ac1941f0185b6c9?notification_type=alerts&readStatus=01";
//   const fetchData = async () => {
//     try {
//       const response = await fetch(url);
//        const json = await response.json();

//        let date = json.dbDate
//         console.log("jhjgh", date);

//       set_Notify(json.errMsg[0]);

//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   fetchData()
// }, [])

useEffect(() => {
  // simple using fetch  
  const fetchData = async () => {
    try {
      let data = await axiosRequest.get(`user/getnotification/${userId}?notification_type=alerts&readStatus=0`)
          let res = data
          set_Notify(res[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchData()

}, [])


  const showSidebar = () => setSidebar(!sidebar);

  // const logged_in_user = useSelector((state) => state.login.user_name)
  const logged_in_user = login_user_data.firstName + ' ' + login_user_data.lastName
  let avatar = logged_in_user?.match(/\b(\w)/g)
  
  // const agent_id = useSelector((state) => state.login.agent_id)
  const agent_id = login_user_data.agentId
  
  const  onLogout=() =>{
    window.localStorage.clear()
    dispatch(actions.logout())
    history.push('/login')
  }

  const  switchChannel=() =>{
    history.push('/multichannel')
    setSidebar(false)
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          {/* <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon> */}
          <img onClick={() => { history.push('/home') }} src= {sales_logo_img} style={{width:'130px', marginRight:'auto', marginLeft:'auto', cursor:'pointer'}}/>
          {/* <h3 style={{color:'#fff',textTransform:'capitalize'}}>current route</h3> */}
          <NavIcon to='#' >
            <FaIcons.FaBell onClick={() => toggleModal(!modalShown)} />
            {_notify?.length && _notify?.length > 0 && clearBtn ? <div className='dot'></div> : ''}
          </NavIcon>
          <NavIcon onClick={showSidebar} to='#'>
            <FaIcons.FaUserCircle />
          </NavIcon>
        </Nav>

    {sidebar &&
        <div className='sideMenu'>
          <div className='menuHeader'>
            <div className='profileLogo'>
              <p style={{textTransform:'uppercase',color:'#fff',fontSize:22}}>{avatar}</p>
            </div>
            <div className='profileData'>
              <p style={{textTransform:'capitalize',fontWeight:600}}>{logged_in_user}</p>
              <p><b>{login_user_data?.designation?.designatioName}</b> ( <b>ID</b> {agent_id})</p>
              <p><FaIcons.FaMapMarker style={{color:"#787878"}} /> | {login_user_data.city} | {login_user_data.state}</p>
              {/* <p><b>Channel : </b>{login_user_data.channelCode.channelName}</p> */}
            </div>
          </div>
          <div className='menuBody'>
            <div className='logoutContainer'>
            <button onClick={onLogout}>Logout</button>
            </div>
            <div className='menuList'>
              <ul>
              <li onClick={() => { switchChannel() }}><div><img src={switch_img}/> &nbsp;<span>Switch Channel</span></div> <img src={right_black_img}/></li>
                <li><div><img src={switch_img}/> &nbsp;<span>Channel Default</span></div> <img src={right_black_img}/></li>
                {/* <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75902x.png'/> &nbsp;<span>Ticketing Tool</span></div> <img src={right_black_img}/></li> */}
                {/* <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75912x.png'/> &nbsp;<span>Download FAQs</span></div> </li> */}
              </ul>
              {/* <h3>My Customers</h3>
              <ul>
                <li onClick={() => { history.push('/renewalMaster/allRenewals') }}><div><img src='https://tataadv2dev.iorta.in/assets/upr.png'/> &nbsp;<span>Upcomming renewals</span></div> <img src={right_black_img}/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/lp.png'/> &nbsp;<span>Lapsed Policy</span></div> <img src={right_black_img}/></li>
              </ul> */}
              {/* <h3>My Partners</h3>
              <ul>
                <li><div><img src={rapps_img}/> &nbsp;<span>All Partners</span></div> <img src={right_black_img}/></li>
              </ul> */}
              <p>Leads</p>
              <ul>
                <li onClick={() => { history.push('/leadmasterpage/statuslead') }}><div><img src={draftr_img}/> &nbsp;<span>Add New Lead</span></div> <img src={right_black_img}/></li>
                <li><div><img src={rapps_img}/> &nbsp;<span>Add Bulk Lead</span></div> <img src={right_black_img}/></li>
              </ul>
              {/* <p>My Applications</p>
              <ul>
                <li><div><img src={allrec_img}/> &nbsp;<span>All Recruitments</span></div> <img src={right_black_img}/></li>
                <li><div><img src={draftr_img}/> &nbsp;<span>Draft Recruitments</span></div> <img src={right_black_img}/></li>
                <li><div><img src={rapps_img}/> &nbsp;<span>Recruitment Applications</span></div> <img src={right_black_img}/></li>
                <li><div><img src={rdone_img}/> &nbsp;<span>Recruited</span></div> <img src={right_black_img}/></li>
                <li><div><img src={failed_img}/> &nbsp;<span>Failed Recruitments</span></div> <img src={right_black_img}/></li>
              </ul> */}
              {/* <p>Dashboards</p>
              <Link to="/leads-report" >
              <ul>
              <li onClick={()=>setSidebar(false)}> <div> <div className='lead-icon' > </div> &nbsp; <span style={{color:'black'}}>Lead Dashboard</span></div></li>
              </ul>
              </Link>
              <Link to="/leads-report2" >
              <ul>
              <li onClick={()=>setSidebar(false)}> <div> <div  className='lead-icon'> </div> &nbsp; <span style={{color:'black'}}>Lead Dashboard 2</span></div></li>
              </ul>
              </Link> */}
              
              <p>Need Help?</p>
              <ul>
                <li><div><img src={needhelp_img}/> &nbsp;<span>Help &amp; FAQs</span></div> <img src={right_black_img}/></li>
              </ul>
            </div>
          </div>
        </div>}

        <Modal1
        shown={modalShown}
        close={() => {
          toggleModal(false);
        }}
      >
        <div className='sideMenu1'>
              <div className='activity-block1' style={{height: "350px"}}>
                <div className='notificationHead'>
                    <p>Notification</p>
                    {_notify?.length && _notify?.length > 0 && clearBtn ? <button onClick={clearData}>Clear All</button> : ''}
                  </div>
                <div className='menuBody1'>
                {/* {!_notify.length ? <h1>gh</h1> : 'hgh'} */}
                {_notify?.length && _notify?.length > 0 && clearBtn ? _notify.map((desc_data, index) =>{
                  return <div key={index}>
                        <div className='notification_data'>
                                <div className='list_data'>
                                  <h4>{desc_data.title}</h4>
                                  <p>{desc_data.body}</p>
                                </div>
                                <div className='date'>
                                  <p>{moment(desc_data.created_date).format('DD-MM-YYYY')}</p>
                                  <p style={{marginTop: '-10px'}}>{moment(desc_data.created_date).format('LT')}</p>
                                </div>
                            </div>
                            <div className='notification_status'>
                              {desc_data.priority ?  <button style={{backgroundColor:desc_data.priority === 'high' ? 'rgb(253 84 84)' : desc_data.priority === 'medium' ? '#fb8c00' : desc_data.priority === 'low' ? '#4caf50' : '',}} onClick={() => { history.push('/calendar') }}>{desc_data.priority}</button> : ''}
                                
                              </div>
                              <hr className='hr-line' />
                          </div>
                }) :  <div className='logoutContainer1'>
                <img src={all_clear_img} />
                <p>All Catch Up!</p>
              </div> }

              
                </div>
              </div>
              <div className='notification_footer view_button' >
                  <button onClick={() => { history.push('/notifypage')}} >View All</button>
                </div>
             
          </div>
      </Modal1>
              
      
        {/* <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#' style={{padding:'18px'}}>
              <AiIcons.AiOutlineClose onClick={showSidebar}  color="#000"/>
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav> */}
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;