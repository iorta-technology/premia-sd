import React from 'react'
import './LoanProducts.css'
import { Row, Col,Button,Card } from 'antd'

const LoanProducts = () => {
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
                        <Card className="main-card1" bordered={false} style={{ width: 200 }}>
                        <p>Loan Product Plan</p>
                        <p>Home Loan</p>
                        <p>Loan Against Property</p>
                        </Card>
                    </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div>
                        <Card className="main-card2" bordered={false} style={{ width: 500 }}>
                            <h1 style={{color:'#5EA5C0'}}>Home Loan</h1>
                        <p>Owning a home is a dream and in 2021 an easy home loan availability can make this dream a reality. In fact, purchasing own house is also one of the best investments in life. 
                            And competitive-interest rates, easy EMIs and quick loan processes have been encouraging more people to buy a house than ever before.
                            Nonetheless, purchasing a home needs a lot of research and planning like your preferred location and the selection of the best financial institutions that not only give you a best-interest home loan but also provides customised home loans as per your requirement. 
                            Aavas Financiers Ltd. is one of those best home loan financial institutions that provide an affordable housing loan. Besides that, it also offers a number of other benefits like speedy approval, easy process, flexible long tenure, competitive interest rates, easy EMI along with minimum paperwork, and fast online services.</p>
                            <h1 style={{color:'#5EA5C0'}}>5 Reasons to buy:</h1>
                            <p>1.We offer purchase loan for flat, house or bungalow from builders or Development Authorities as well as resale properties</p>
                            <p>2.Loan amounts starting Rs 1 Lak</p>
                            <p>3.Attractive interest rates</p>
                            <p>4.Integrated branch network that facilitates loan servicing at a branch convenient to you.</p>
                            <p>5.Home loans can be availed online in a few steps.</p>
                        </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                        <Card className="main-card3" bordered={false} style={{ width: 400 }}>
                       
                        </Card>
                        </div>
                    </Col>
            </Row>
        </>
    )

}

export default LoanProducts