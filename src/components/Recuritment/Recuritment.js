import React, { useState,useEffect } from 'react'
import './Recuritment.css'
import { Modal, Button ,Checkbox,Form, Input} from 'antd';
import { MessageFilled } from '@ant-design/icons';

const Recruitment = ({hideModal}) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [show, setShow] = useState(false);
   useEffect(() => {
    setIsModalVisible(true)
   }, [])
    
      const handleOk = () => {
      
        hideModal()
      };
    
      const handleCancel = () => {
        hideModal()
      };
      const associateDetailsHandler = ()=>{
        if(!show) {
          setShow(true);
      }
      else {
          setShow(false);
      }
      }
    return(<div className="main">
         <Modal title="New Recruitment" visible={true} onOk={handleOk} onCancel={handleCancel} footer={null} cancelButtonProps={{
                        style: {
                            display: "none",
                        },
                    }}>
            <div className="form-container">
              <div className="CardContainer">
                  <h3>Select*</h3>
                    <div className="maindiv">
                        <div className="selectbtns">POSP</div>
                        <div className="selectbtns">Agent</div>
                    </div>
                    <div className="checkbox">Is the Applicant network Agent ? 
                      <div>
                        <Checkbox onClick={associateDetailsHandler}></Checkbox>
                      </div>
                    </div>
                    {show ? <div>
                      <h3>Super Associates Details</h3>
                      <hr></hr>
                      <Form layout="vertical">
                      <Form.Item label="Associate Name as per PAN*" required >
                        <Input placeholder="Enter Associate Name as per PAN" />
                      </Form.Item>
                      <p>Please enter Super Associate Name as per details shared to HR for Onboarding</p>
                      <Form.Item label="Mobile No. *" required >
                        <Input placeholder="Enter Mobile No" />
                      </Form.Item>
                      <p>Please enter Super Associate Mobile number as per details shared to HR for Onboarding</p>
                      <Form.Item label="Associate PAN Number *" required >
                        <Input placeholder="Enter Associate PAN Number" />
                      </Form.Item>
                      <p>Please enter Super Associate Pan number as per details shared to HR for Onboarding</p>
                      </Form>
                    </div> : null}
                    
                    <h3>Agent Details</h3>
                    <hr></hr>
                    <Form layout="vertical">
                    <Form.Item label="Candidate Name as per PAN*" required >
                      <Input placeholder="Enter Candidate Name as per PAN" />
                    </Form.Item>
                    <Form.Item label="Mobile No. *" required >
                      <Input placeholder="Enter Mobile No" />
                    </Form.Item>
                    <Form.Item label="Email *" required >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                    <Form.Item label="PAN Number *" required >
                      <Input placeholder="Enter PAN Number" />
                    </Form.Item>
                    </Form>
              </div>
              <Button type="primary" style={{ backgroundColor: 'rgb(228, 106, 37)', border: 'none', borderRadius: '5px',alignItems:'center' }} htmlType="submit" size={'medium'}>SUBMIT</Button>
             </div>
                </Modal>
    </div>)

}
export default Recruitment;
