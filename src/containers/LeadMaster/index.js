import React,{useEffect,useState} from 'react'
import {PlusCircleFilled} from '@ant-design/icons'
import Tab from '../../components/Tab/Tab'
import LeadCards from '../../components/LeadCards/LeadCards'
import { Pagination } from 'antd';
import * as actions from '../../store/actions/index';
import { useDispatch,useSelector } from 'react-redux';
import './index.css'
const LeadMaster = (props) => {
    //Set current page no of the page
    const [current,setcurrent] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.fetchAllLeads('',current))
    },[dispatch,current]);

    //Accessing LeadCard data  from store
    const leadsData = useSelector((state)=>state.leads.allLeads)
    const leadDataLoading = useSelector((state)=>state.leads.fetch_allLeads_Loading)
    // lead count of the page
    const totalLeads = useSelector((state)=>{
        // console.log(state.leads.count[0].count)
        return state.leads.count
    })

    //Pagination numbers function
    function itemRender(cur, type, originalElement) {
        const onNext = ()=>{
            setcurrent(current+1)
        }
        if (type === 'next') {
            // console.log(current)
          return <button current={current} onClick={onNext}>Next</button>;
        }
        return originalElement;
    }

    const handlePageClick = (page)=>{
        setcurrent(page)
        // console.log(page)
    }

    return (
        <div style={{backgroundColor:'#fafafa'}}>
            <Tab/>
            <LeadCards leads={leadsData} leadDataLoading={leadDataLoading}/>
            <div className="page-holder">
                <Pagination
                    current={current}
                    onChange={handlePageClick}
                    total={totalLeads}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
            <PlusCircleFilled className="icon-size"/>
        </div>
    )
}


export default LeadMaster;
