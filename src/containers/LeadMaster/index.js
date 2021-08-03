import React,{useEffect,useState} from 'react'
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

    // lead count of the page
    const count = useSelector((state)=>{
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
        <div>
            <Tab/>
            <LeadCards leads={leadsData}/>
            <div className="page-holder">
                <Pagination
                    current={current}
                    onChange={handlePageClick}
                    total={count}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
        </div>
    )
}


export default LeadMaster;
