import React, { useState } from 'react';
import styled from 'styled-components';
import { Link,useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import './SideBar.css'
import { IconContext } from 'react-icons/lib';
import { createBrowserHistory } from "history";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

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
const Sidebar = () => {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const logged_in_user = useSelector((state) => state.login.user_name)
  let avatar = logged_in_user?.match(/\b(\w)/g)
  const agent_id = useSelector((state) => state.login.agent_id)
  const dispatch = useDispatch();
  const  onLogout=() =>{
    localStorage.clear()
    dispatch(actions.logout())
    history.push('/login')
}

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          {/* <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon> */}
          <img onClick={() => { history.push('/home') }} src= "https://tataadv2devadmin.iorta.in/web/assets/sdlogo.png" style={{width:'180px',marginRight:'450px',cursor:'pointer'}}/>
          {/* <h3 style={{color:'#fff',textTransform:'capitalize'}}>current route</h3> */}
          <NavIcon to='#' >
            <FaIcons.FaBell />
          </NavIcon>
          <NavIcon onClick={showSidebar} to='#'>
            <FaIcons.FaUserCircle />
          </NavIcon>
        </Nav>
{sidebar &&
        <div className='sideMenu'>
          <div className='menuHeader'>
            <div className='profileLogo'>
              <p style={{textTransform:'uppercase'}}>{avatar}</p>
            </div>
            <div className='profileData'>
              <p style={{textTransform:'capitalize'}}>{logged_in_user}</p>
              <p><b>Channel Sales Manager</b> (ID {agent_id})</p>
              <p><FaIcons.FaMapMarker style={{color:"#787878"}} /> | | </p>
              <p><b>Channel : </b> Advisor Two</p>
            </div>
          </div>
          <div className='menuBody'>
            <div className='logoutContainer'>
            <button onClick={onLogout}>Logout</button>
            </div>
            <div className='menuList'>
              <ul>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75902x.png'/> &nbsp;<span>Switch Channel</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75902x.png'/> &nbsp;<span>Channel Default</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75902x.png'/> &nbsp;<span>Ticketing Tool</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75912x.png'/> &nbsp;<span>Download FAQs</span></div> </li>
              </ul>
              <h3>My Customers</h3>
              <ul>
                <li onClick={() => { history.push('/renewalMaster/allRenewals') }}><div><img src='https://tataadv2dev.iorta.in/assets/upr.png'/> &nbsp;<span>Upcomming renewals</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/lp.png'/> &nbsp;<span>Lapsed Policy</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
              </ul>
              <h3>My Partners</h3>
              <ul>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/rapps.png'/> &nbsp;<span>All Partners</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
              </ul>
              <h3>Leads</h3>
              <ul>
                <li onClick={() => { history.push('/leadmasterpage/statuslead') }}><div><img src='https://tataadv2dev.iorta.in/assets/draftr.png'/> &nbsp;<span>Add New Lead</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/rapps.png'/> &nbsp;<span>Add Bulk Lead</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
              </ul>
              <h3>My Applications</h3>
              <ul>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/allrec.png'/> &nbsp;<span>All Recruitments</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/draftr.png'/> &nbsp;<span>Draft Recruitments</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/rapps.png'/> &nbsp;<span>Recruitment Applications</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/rdone.png'/> &nbsp;<span>Recruited</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/failed.png'/> &nbsp;<span>Failed Recruitments</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
              </ul>
              <h3>Need Help?</h3>
              <ul>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/needhelp.png'/> &nbsp;<span>Help &amp; FAQs</span></div> <img src='https://tataadv2dev.iorta.in/assets/MaterialUiIcons/chevron_right_black_192x192.png'/></li>
              </ul>
            </div>
          </div>
        </div>}
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