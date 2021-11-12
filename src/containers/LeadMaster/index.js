import React,{useEffect,useState} from 'react'
import './index.css'
import Tab from '../../components/Tab/Tab'
import LeadCards from '../../components/LeadCards/LeadCards'
import FloatButton from '../../components/FloatButton/FloatButton'
import * as actions from '../../store/actions/index';
import { Pagination,Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
const LeadMaster = (props) => {
    //Set current page no of the page
    const [current,setcurrent] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(actions.fetchAllLeads('',current))
    },[dispatch,current]);

    //Accessing LeadCard data  from store
    const leadsData = useSelector((state)=>state.leads.allLeads)
    //Loading leads data
    const leadDataLoading = useSelector((state)=>state.leads.fetch_allLeads_Loading)
    // lead count of the page
    const totalLeads = useSelector((state)=>{
        // console.log(state.leads.count[0].count)
        return state.leads.count
    })

    //Pagination numbers function
    function itemRender(cur, type, originalElement) {
        const onPrev = ()=>{
            setcurrent(current-1)
        }
        const onNext = ()=>{
            setcurrent(current+1)
        }

        if (type === 'prev') {
            return <a current={current} onClick={onPrev} style={{color:'#545454'}}>Prev</a>;
          }
        if (type === 'next') {
            // console.log(current)
          return <a current={current} onClick={onNext}style={{color:'#545454'}}>Next</a>;
        }
        return originalElement;
    }

    const handlePageClick = (page)=>{
        setcurrent(page)
        // console.log(page)
    }
    const tabMenu = [
        {
            id:'all',
            value:"All"
        },
        {
            id:'fortoday',
            value:"For Today"
        },
        {
            id:'open',
            value:"Open"
        },
        {
            id:'converted',
            value:"Converted"
        },
        {
            id:'failed',
            value:"Failed"
        },
        
    ]

    return (
        <div style={{backgroundColor:'#fafafa'}}>
            <Tab 
                tabMenu={tabMenu} 
                header="Lead" 
                current={current}
                />
                <Button type='primary' className="export-btn">Export</Button>
            {/* <div className="export-btn-holder">
            </div> */}
            <LeadCards leads={leadsData} leadDataLoading={leadDataLoading}/>
            <div className="page-holder">
                <Pagination
                    responsive
                    current={current}
                    onChange={handlePageClick}
                    total={totalLeads}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
            <FloatButton/>
        </div>
    )
}


export default LeadMaster;
