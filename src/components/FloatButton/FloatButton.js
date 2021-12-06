import React, { useState } from 'react'
import { Modal, Button } from 'antd';
import { PlusCircleFilled, CalendarOutlined, AimOutlined, FileTextOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './FloatButton.module.css'
import Recruitment from '../Recuritment/Recuritment'
import * as actions from '../../store/actions/index';
import { useDispatch } from 'react-redux';

// const logindata = stoageGetter('user')
// let id = ''
// if(logindata){
// id = logindata.id

// }

const FloatButton = React.memo(() => {
  const dispatch = useDispatch()
    
    const [isopen, setisopen] = useState(false)

    const floatButtonHandler = () => {
        setisopen(!isopen)
    }
    const open ={
        opacity:"0.8",
        transform: "scale(1)",
        transition: "all 0.1s ease-in-out",
        zIndex:'1000'
        
    }
    const close ={
        opacity:"0",
        transform: "scale(0)",
        transition: "all 0.1s ease-in-out"
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true)
      };
      const hideModal = () => {
        setIsModalVisible(false)
      };
    
    const addNewLead =()=>{
        const formData =  {
            // statusLeadData: {
                leadStatus: '',
                leadDisposition: '',
                leadsubDisposition: '',
                appointment_status: '',
                appointmentdisPosition: '',
                appointmentsubdisPosition: '',
                lead_Owner_Id: '',
                // user_id: id,
                lead_Creator_Id: '',
                start_date: '',
                start_time:  '',
                remarksfromSource: '',
                remarksfromUser: '',
                teamMembers: '',
                productId: '',
                proposalId: '',
                leadSource: '',
                LeadType:'',
                Product:'',
                Insurance_Company:'',
            // },
            // personalLeadData: {
                firstName:'',
                lastName:'',
                dob: '',
                gender: '',
                maritalStatus: '',
                childStatus: '',
                ChildInfo: [],
            // },
            // contactLeadData: {
                primaryMobile:'', 
                state: '',
                city: '',
                email: '',
                address: {
                    line1: '',
                    line2: '',
                    line3: '',
                },
                country: '',
                pincode: '',
                secondaryMobile: '',
                landlineNo: '',
                socialSecurityAdharNo: '',
                mailingAddressStatus: '',
                mailingAddressSecond: {
                    mailingaddress: {
                        line1: '',
                        line2: '',
                        line3: '',
                    },
                    state: '',
                    city:'', 
                    country: '',
                    pincode: '',
                    // user_Id:id,
    
                },
                HaveLifeInsurance:{
                    ExistHealthInsur:'',
                    ExistInsur:''
                },
                HaveLifeInsurance_details:[],
                Insurancedetails:[],
                //professional data
                education:'',
                professionType:'',
                incomeGroup:'',
        }    
        dispatch(actions.storeLead(formData))
    }
     
    return (
        <div>
                <>
                    <PlusCircleFilled className={styles.icon} onClick={floatButtonHandler} />
                    <p className={ `${styles.paragraph}  ${styles.eventpg} ${styles.pgpfr}`} style={isopen?open:close}>Create an Event</p>
                    <Button type="primary" shape="circle" size="large" icon={<CalendarOutlined />} className={`${styles.eventicon} ${styles.iconpfr}`} style={isopen?open:close}/>
                    <p className={`${styles.paragraph}  ${styles.goalpg} ${styles.pgpfr}`} style={isopen?open:close}>Add Daily Goals</p>
                    <Button type="primary" shape="circle" size="large" icon={<AimOutlined />} className={`${styles.goalicon} ${styles.iconpfr}`} style={isopen?open:close}/>
                    <p className={`${styles.paragraph}  ${styles.leadpg} ${styles.pgpfr}`} style={isopen?open:close}>New Lead Creation</p>
                    <Link to="/leadmasterpage/statuslead">
                        <Button onClick={addNewLead} type="primary" shape="circle" size="large" icon={<FileTextOutlined />} className={`${styles.leadicon} ${styles.iconpfr}`} style={isopen?open:close}/>
                    </Link>

                    <p className={`${styles.paragraph}  ${styles.recuirementpg} ${styles.pgpfr}`} style={isopen?open:close}>New Recruitment</p>
                        <Button onClick={showModal} type="primary" shape="circle" size="large" icon={<FileTextOutlined />} className={`${styles.newrecuirement} ${styles.iconpfr}`} style={isopen?open:close}/>
                       
                       {isModalVisible&&(<Recruitment hideModal={hideModal} />)}
                        
                    <div className={isopen?styles.open:styles.close}>
                        <div className={styles.content}>
                        </div>
                        <div className={styles.content}>
                        </div>
                        <div className={styles.content}>
                        </div>
                    </div>
                </>
        </div>
    )
})

export default FloatButton
