import React,{useEffect,useState} from 'react'
import './index.css'
import Tab from '../../components/Tab/Tab'
// import LeadCards from '../../components/LeadCards/LeadCards'
import RenewalCards from '../../components/RenewalCollections/Cards/RenewalCards'
import FloatButton from '../../components/FloatButton/FloatButton'
import * as actions from '../../store/actions/index';
import { Pagination } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
const RenewalMaster = (props) => {
    //Set current page no of the page
    const [current,setcurrent] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.fetchAllRenewals('',current))
    },[dispatch,current]);

    //Accessing RenewalsCard data  from store
    // const renewalsData = useSelector((state)=>state.renewals.allRenewals)
    const renewalsData = useSelector((state)=>state.renewals.allRenewals)
    console.log("renewalsData",renewalsData)
    //Loading Renewals data
    const leadDataLoading = useSelector((state)=>state.renewals.fetch_allRenewals_Loading)
    // renewals count of the page
    const totalRenewals = useSelector((state)=>{
        return state.renewals.count
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
            return <button current={current} onClick={onPrev}>Prev</button>;
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
    const tabMenu = [
        {
            id:1,
            value:"All"
        },
        {
            id:2,
            value:"Paid"
        },
        {
            id:3,
            value:"UnPaid"
        },
        {
            id:4,
            value:"Lapsed"
        },
        
    ]

    return (
        <div style={{backgroundColor:'#fafafa'}}>
            <Tab tabMenu={tabMenu} header="My Renewals"/>
            <RenewalCards renewals={renewalsData} leadDataLoading={leadDataLoading}/>
            <div className="page-holder">
                <Pagination
                    size="small"
                    current={current}
                    onChange={handlePageClick}
                    total={totalRenewals}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
            <FloatButton/>
        </div>
    )
}


export default RenewalMaster;
