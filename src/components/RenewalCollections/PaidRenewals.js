import React,{useEffect,useState} from 'react'
import './PaidRenewals.css'
import Tab from '../../components/Tab/Tab'
// import LeadCards from '../../components/LeadCards/LeadCards'
import RenewalCards from '../../components/RenewalCollections/Cards/RenewalCards'
import FloatButton from '../../components/FloatButton/FloatButton'
import * as actions from '../../store/actions/index';
import { Pagination } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
const PaidRenewal = (props) => {
    //Set current page no of the page
    const [current,setcurrent] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.fetchPaidRenewals('',current))
    },[dispatch,current]);

    const paidRenewalsData = useSelector((state)=>state.renewals.paidRenewals)
    console.log("paid renewalsData",paidRenewalsData)
    //Loading Renewals data
    const leadDataLoading = useSelector((state)=>state.renewals.fetch_allRenewals_Loading)
    // renewals count of the page
    const totalRenewals = useSelector((state)=>{
        return state.renewals.count
    })
    console.log("totalRenewals",totalRenewals)


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
            id:6,
            value:"All"
        },
        {
            id:7,
            value:"Paid"
        },
        {
            id:8,
            value:"UnPaid"
        },
        {
            id:9,
            value:"Lapsed"
        },
        
    ]

    return (
        <div style={{backgroundColor:'#fafafa'}}>
            <Tab tabMenu={tabMenu} header="My Renewals"/>
            <RenewalCards renewals={paidRenewalsData} leadDataLoading={leadDataLoading}/>
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


export default PaidRenewal;