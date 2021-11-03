import React, { useState } from 'react'
import './LoanProducts.css'
import { Row, Col,Button,Card,Carousel,Modal } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons';

const LoanProducts = () => {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      }
      const [isModalVisible, setIsModalVisible] = useState(false);

      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    return(
        <>
            <div className="header">
                <Row >
                    <Col><h1>Products</h1></Col>
                </Row>
                <div style={{padding: '0 3%',paddingBottom:'30px',marginLeft: '-15px'}}>
                        <Row className="tabs">
                            <Col span={4}><Button  className="primaryBtn">Loan Products</Button></Col>
                            <Col span={4}><Button  className="secondaryBtn">General Insurance</Button></Col>
                            <Col span={4}><Button  className="secondaryBtn">Group Health</Button></Col>
                        </Row>  
                </div>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={8}>
                    <div >
                        <Card className="main-card1" bordered={false} >
                        <p>Loan Product Plan</p>
                        <p>Home Loan</p>
                        <p>Loan Against Property</p>
                        </Card>
                    </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div>
                        <Card className="main-card2" bordered={false} >
                            <div style={{display:'flex'}}>
                            <h1 style={{color:'#5EA5C0',marginTop:'-40px'}}>Home Loan</h1>
                            <span style={{marginTop:'-40px',marginLeft:'55px',border:'1px solid #5EA5C0',borderRadius:'10px'}}>Benefit Illustration</span>
                            </div>
                        <p>Owning a home is a dream and in 2021 an easy home loan availability can make this dream a reality. In fact, purchasing own house is also one of the best investments in life. 
                            And competitive-interest rates, easy EMIs and quick loan processes have been encouraging more people to buy a house than ever before.
                            Nonetheless, purchasing a home needs a lot of research and planning like your preferred location and the selection of the best financial institutions that not only give you a best-interest home loan but also provides customised home loans as per your requirement. 
                            Aavas Financiers Ltd. is one of those best home loan financial institutions that provide an affordable housing loan. Besides that, it also offers a number of other benefits like speedy approval, easy process, flexible long tenure, competitive interest rates, easy EMI along with minimum paperwork, and fast online services.</p>
                            <h1 style={{color:'#5EA5C0'}}>5 Reasons to buy:</h1>
                            <p><span className="slNo">1</span>We offer purchase loan for flat, house or bungalow from builders or Development Authorities as well as resale properties</p>
                            <p><span className="slNo">2</span>Loan amounts starting Rs 1 Lak</p>
                            <p><span className="slNo">3</span>Attractive interest rates</p>
                            <p><span className="slNo">4</span>Integrated branch network that facilitates loan servicing at a branch convenient to you.</p>
                            <p><span className="slNo">5</span>Home loans can be availed online in a few steps.</p>
                        </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                        <Card className="main-card3" bordered={false} >
                            <h3>Cash Loan</h3>
                            <span onClick={showModal} style={{margin:'150px 150px 0px 0px',borderRadius:'50px',padding:'8px',color:'#00ACC1',cursor:'pointer'}}><ShareAltOutlined  /></span>
                        <Carousel >
                            <div>
                            <h3 style={contentStyle}>1</h3>
                            </div>
                            <div>
                            <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                            <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                            <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>
                        </Card>
                        </div>
                    </Col>
            </Row>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Do you wish to send payment link to the customer?</p>
            </Modal>
        </>
    )

}

export default LoanProducts