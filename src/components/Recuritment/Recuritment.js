import React, { useState,useEffect } from 'react'
import './Recuritment.css'
import { Modal, Button } from 'antd';

const Recruitment = ({hideModal}) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
   useEffect(() => {
    setIsModalVisible(true)
   }, [])
    
      const handleOk = () => {
      
        hideModal()
      };
    
      const handleCancel = () => {
        hideModal()
      };
    return(<div className="main">
         <Modal title="New Recruitment" visible={true} onOk={handleOk} onCancel={handleCancel}>
         <div className="form-container">
             </div>
                </Modal>
    </div>)

}
export default Recruitment;
