import React, { useState } from 'react'
import { Modal, Button } from 'antd';
import { PlusCircleFilled, CalendarOutlined, AimOutlined, FileTextOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './FloatButton.module.css'
import Recruitment from '../Recuritment/Recuritment'

const FloatButton = React.memo(() => {
    
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
                        <Button type="primary" shape="circle" size="large" icon={<FileTextOutlined />} className={`${styles.leadicon} ${styles.iconpfr}`} style={isopen?open:close}/>
                    </Link>

                    {/* <p className={`${styles.paragraph}  ${styles.recuirementpg} ${styles.pgpfr}`} style={isopen?open:close}>New Recruitment</p>
                        <Button onClick={showModal} type="primary" shape="circle" size="large" icon={<FileTextOutlined />} className={`${styles.newrecuirement} ${styles.iconpfr}`} style={isopen?open:close}/>
                       
                       {isModalVisible&&(<Recruitment hideModal={hideModal} />)} */}
                        
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
