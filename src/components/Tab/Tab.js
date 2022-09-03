import React, { useState, useEffect, useContext } from 'react'
import { Card, Radio, Tabs, Modal, Form, Select, Input } from 'antd'
import { Option } from 'antd/lib/mentions'
import './Tab.css'
import _ from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/leads'
import { stoageGetter } from '../../helpers'
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LeadCard from '../LeadCards/LeadCard'
import GlobalFilters from './Filter'
// import Example from './Filter'
import 'bootstrap/dist/css/bootstrap.min.css';

// api's
import {
  getTeamMainTabApi,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,

  getOpenTabApi,
  getFortodayTabApi,
  getFailedTabApi
} from "../actions/allleadAction"

const { TabPane } = Tabs



const Tab = ({
  tabMenu,
  header,
  detailsRouteTab,
  activeKey,
  activeRenewalkey,
  current,
  filterdata,

}) => {
  console.log("tabMenu*****Data", tabMenu) 

  // console.log("YE ARAR", props)

  const dispatch = useDispatch()
  const { leadType } = useParams()
  const { masterType } = useParams()
  const [activeTab, setactiveTab] = useState()
  const [showTab, setShowTab] = useState()
  const [showModal, setShowModal] = useState(false)


  let history = useHistory()
  // const [activeKey, setActiveKey] = useState("self")
  const [currentActiveTab, setCurrentActiveTab] = useState("self")

  // useEffect(() => {

  //   const { id } = stoageGetter('user')
  //   // console.log(typeof(leadType))
  //   dispatch(actions.fetchAllLeads(id, leadType, 1))
  // }, [dispatch, current, activeTab, leadType])

  useEffect(() => {
    if (currentActiveTab == 'self') {
      const { id } = stoageGetter('user')
      dispatch(actions.fetchAllLeads(id, leadType, 1))
    }
  }, [currentActiveTab])
  // const ids = stoageGetter('user')
  console.log("--------------------------", leadType)

  // ************************Api *********************

  const getDataForOpen = async (leadInc) => {
    console.log("****************************************************************************in", leadType)
    const leadtyp = leadInc
    const { id } = stoageGetter('user')
    const response = await getOpenTabApi(id, leadtyp)
    console.log("***************************************************************************out", response)
    if (response?.data?.errCode == -1) {
      console.log("all*******", response?.data?.errMsg)
      console.log("***********>", response?.data?.errMsg[0])
      if (response?.data?.errMsg) {
        dispatch(actions.fetchAllLeadsSuccess(response?.data?.errMsg[0], response?.data?.errMsg[1][0]?.count))
      }
    } else {
      dispatch(actions.fetchAllLeadsSuccess([], 0))
      throw response?.data?.errMsg
    }
  }

  // case "allservicecorners": return history.push('/servicecorner/all');
  // case "forself": return history.push('/servicecorner/self');
  // case "forcustomers": return history.push('/servicecorner/customers');
  /////////////////////////////////////////////////

  // case "benefitillustrator": return history.push('/master/benefitillustrator');
  // case "proposalfulfilment": return history.push('/master/proposalfulfilment');
  // case "prepaymentreview": return history.push('/master/prepaymentreview');
  // case "paymentoptions": return history.push('/master/paymentoptions');
  // case "uploaddocuments": return history.push('/master/uploaddocuments');
  // case "proposalhistory": return history.push('/master/proposalhistory');
  // default:  return history.push('/leadmasterpage/statuslead');

  // useEffect(() => {
  //   getAlldataofTeamMainTab()
  // }, [])

  const getAlldataofTeamMainTab = async () => {
    const response = await getTeamMainTabApi()
    if (response?.data?.errCode == -1) {
      if (response?.data?.errMsg) {
        // setAllData(response?.data?.errMsg[0])
        dispatch(actions.fetchAllLeadsSuccess(response?.data?.errMsg[0], response?.data?.errMsg[1][0]?.count))

      }
    } else {
      dispatch(actions.fetchAllLeadsSuccess([], 0))
      throw response?.data?.errMsg
      // dispatch(fetchAllLeadsFail(error))
    }
    // const response2 = await getFirstDropdownValueApi()
    // const response3 = await getSecondDropdownValueApi()
    // const response4 = await getFormByIdApi("")
    // console.log("response",response)
    // console.log("response2",response2)
    // console.log("response3",response3)
    // console.log("response4",response4)
  }


  // -****************************************


  const handler = (activeKey) => {
    setactiveTab(activeKey)
    // dispatch(actions.fetchAllLeads(activeTab,current))

    // setactiveKey(key)
    if (activeKey) {
      console.log("active key", activeKey)
      switch (activeKey) {
        case 'all':
          { getDataForOpen('all'); return history.push('/leadMaster/all_leads') }
        case 'fortoday':
          { getDataForOpen('fortoday'); return history.push('/leadMaster/fortoday') }
        case 'open':
          { getDataForOpen('open'); return history.push('/leadMaster/openlead') }
        case 'converted':
          { getDataForOpen('converted'); return history.push('/leadMaster/convertedleads') }
        case 'failed':
          { getDataForOpen('failed'); return history.push('/leadMaster/pendingproposal') }

        case '1':
          return history.push('/leadmasterpage/statuslead')
        // case '2':
        //   return history.push('/leadmasterpage/leaddetails/personallead')
        // case '3':
        //   return history.push('/leadmasterpage/proposal')
        // case '4':
        //   return history.push('/leadmasterpage/leadmasterdoc/leaddoc')
        case '2':
          return history.push('/leadmasterpage/leadhistory')

        case 'calendar':
          return history.push('/calendar')

        case 'todo':
          return history.push('/todo')

        case 'advisorpitch':
          return history.push('/masterpresales/advisordetail/advisorpitch')
          

          case 'customerpitch':
            return history.push('/masterpresales/customerdetails/salespitch')

        case 'allrenewals':
          return history.push('/renewalMaster/allRenewals')
        case 'paidrenewals':
          return history.push('/renewalMaster/paidRenewals')
        case 'unpaidrenewals':
          return history.push('/renewalMaster/unpaidRenewals')
        case 'lapsedrenewals':
          return history.push('/renewalMaster/lapsedRenewals')

        // case "benefitillustrator": return history.push('/master/benefitillustrator');
        // case "proposalfulfilment": return history.push('/master/proposalfulfilment');
        // case "prepaymentreview": return history.push('/master/prepaymentreview');
        // case "paymentoptions": return history.push('/master/paymentoptions');
        // case "uploaddocuments": return history.push('/master/uploaddocuments');
        // case "proposalhistory": return history.push('/master/proposalhistory');
        // default:  return history.push('/leadmasterpage/statuslead');
      }
    }
    // if(activeKey){
    //     switch (activeKey) {
    //         case "1": return history.push('/renewalMaster/allRenewals');
    //         case "2": return history.push('/renewalMaster/paidRenewals');
    //         case "3": return history.push('/renewalMaster/unpaidRenewals');
    //         case "4": return history.push('/renewalMaster/lapsedRenewals');
    //     }
    // }
  }

  // const handler = (activeRenewalkey) => {
  //     // console.log(activeKey)
  //     // setactiveKey(key)

  //     switch (activeRenewalkey) {
  //         case "1": return history.push('/renewalMaster/all');
  //         // case "2": return history.push('/leadmasterpage/leaddetails/personallead');
  //         // case "3": return history.push('/leadmasterpage/proposal');
  //         // case "4": return history.push('/leadmasterpage/leadmasterdoc/leaddoc');
  //         // case "5": return history.push('/leadmasterpage/leadhistorymaster/leadhistory');
  //         default:  return history.push('/leadmasterpage/statuslead');
  //     }
  // }

  let tabPane = []
  if (tabMenu && !_.isEmpty(tabMenu)) {
    tabPane = _.map(tabMenu, (value, id) => {
      console.log("value", value)
      return <TabPane key={value.id} tab={value.value}></TabPane>
    })
    // console.warn("tabPane", tabPane)
  }

  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 620

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [width])

  const handleChangeTab = (currentTab) => {
    // console.log("good bye ",currentTab)
    dispatch(actions.updateTabOfDashboard(currentTab))
    setCurrentActiveTab(currentTab)
    if (currentTab == "team") {
      getAlldataofTeamMainTab()
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    


  return (
    <>
      {width > breakpoint ? (
        <div className={tabMenu.length !== 0 ? "header-img" : 'header-img-noTab'}>
          <div>
            <div>
              <p className="header-title">{header}</p>
            </div>

            <div >
              <Tabs
                tabBarGutter={20}
                centered={false}
                type="card"
                onTabClick={handler}
                size="small"
                activeKey={activeKey}
                className="main-lead-tabs"
                style={{ marginLeft: '40px'}}
              >
                {tabPane}
              </Tabs>
            </div>
          </div>

          {tabPane.key === activeKey ?
            <div
              className="round-card-main-Tab "
            // defaultActiveKey={"allocket"}
            // activeKey={"team"}
            // style={{ marginLeft: '8rem' }}
            >
              {console.log("tabvalue =====>", tabPane)}
              <figure className={currentActiveTab === "team"
                ? "round-cards1-active" : "round-cards1"} onClick={() => handleChangeTab("team")} key={"team"}>
                {' '}
                <figcaption className="card-caption">Team</figcaption>{' '}
              </figure>
              <figure className={currentActiveTab === "self"
                ? "round-cards2-active" : "round-cards2"} onClick={() => handleChangeTab("self")} key={"self"}>
                {' '}
                <figcaption className="card-caption">Self</figcaption>{' '}
              </figure>
              <figure className={currentActiveTab === "allocket"
                ? "round-cards3-active" : "round-cards3"} onClick={() => handleChangeTab("allocket")} key={"allocket"}>
                {' '}
                <figcaption className="card-caption">Allocate</figcaption>{' '}
              </figure>
              {/* <figure
                className="round-cards43" onClick={() => { }} key={"filter"}>
                {' '}
                <figcaption className="card-caption">Filter</figcaption>{' '}
              </figure> */}
              <GlobalFilters show={show} onHide={handleClose} handleShow={handleShow} setShow={setShow} />
            </div>
            : null}

        </div>
      ) : (
        <>
          <div>
            <Tabs
              tabBarGutter={20}
              centered={false}
              onTabClick={handler}
              size="small"
              activeKey={activeKey}
              style={{ backgroundColor: '#f7f7f7', boxShadow: '0px 1px 10px 0px #0000003d' }}
            >
              {tabPane}

            </Tabs>
          </div>
        </>
      )}

    </>

  )
}

export default Tab
/* <Tabs defaultActiveKey="1" tabBarGutter={10} style={style} centered={true} type="card">
<TabPane tab={card} key="1"  style={gridStyle}>
</TabPane>
<TabPane tab="All leads" key="1"  >
</TabPane>
<TabPane tab="All leads" key="1"  >
</TabPane>
</Tabs>
<Menu  mode="horizontal">
<Menu.Item key="mail" style={gridStyle}>
All leads
</Menu.Item>
<Menu.Item key="mail" style={gridStyle}>
All leads
</Menu.Item>
<Menu.Item key="mail" >
{card}
</Menu.Item>
</Menu> */

// let card2 = <Card className="tab-pane">
//                     Open
//                     <Button type="primary" danger={true} shape="circle" size="small">
//                         10
//                     </Button>
//                 </Card>
//     let card3 = <Card className="tab-pane">
//                     Failed
//                     <Button type="primary" danger={true} shape="circle" size="small">
//                         12
//                     </Button>
//                 </Card>
