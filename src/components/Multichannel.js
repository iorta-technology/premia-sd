import React from 'react'
import '../components/Login/Login.css';
import { Card, Input, Button, Image, Form, message, Row, Col, Radio } from 'antd';
import loginLogo from '../images/ABIB_LOGO.jpg'
import { useDispatch, useSelector } from 'react-redux';

function Multichannel() {
    const _store = useSelector(state => state)
    console.warn('STORE DATA----------',_store.login.multiChannel)
    return (
        <div className="main">
            <div className="login-card">
                <Card className="main-card">
                    <div className="logo">
                        <Image preview={false} width='100%' src={loginLogo} alt="login-logo" />
                    </div>
                    <br /><br />

                    <div className='card-list'>
                    <Card style={{ backgroundColor: 'rgb(228, 106, 37)', }} bordered={false} >
                        <Row >
                           
                            <Col span={22}>
                                <h5 style={{color : 'white'}}>Axis</h5>
                            </Col>
                            <Col span={2}>
                                <Radio checked={true}/>
                            </Col>
                           
                        </Row>
                    </Card>
                    </div>

                    <Button type="primary" htmlType="submit" className="loginbtn" block style={{fontWeight : 'bold', marginTop : 10}}>Proceed</Button>
                </Card>
                
            </div>

            <div style={{marginTop : 150, color : '#D4D4D4'}}>
                <p>Privacy Policy Terms and Conditions</p>
            </div>
            <div style={{color : '#D4D4D4'}}>
                <p>© 2018 Iorta Technology v.1.0</p>
            </div>
        </div>
    )
}

export default Multichannel