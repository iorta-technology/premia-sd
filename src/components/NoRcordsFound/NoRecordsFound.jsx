import { Row, Col } from 'antd';
import '../History/History.css';
import '../StatusLead/StatusLead.css';
import '../LeadDetails/LeadDetailsTab.css';




const NoRecordsFound = () => {


return (
    <>
        <div className="form-container">
            <Row gutter={['', 20]} justify="center">
                <Col className="form-body m0a" xs={22} sm={24} md={16} lg={16} xl={16} >
                    <div className="proposal">
                        <div className="bg-norecord">
                        </div>
                        <p className="norecord-title">No Records Found</p>
                    </div>
                </Col>
            </Row>
        </div>
    </>
)
}

export default NoRecordsFound

