import React, { useState, useEffect } from 'react';
import { Card, Switch, Row, Col, Divider, Button } from 'antd'
import { Avatar, Image } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import './MappedBranches.css';
const MappedBranches = () => {
    const [selectButtonOption, setSelectButtonOption] = useState(true);
    const [selectBtnOption, setSelectBtnOption] = useState(false);

    const selectButtonFunc = (e) => {
        setSelectButtonOption(true)
        setSelectBtnOption(false)
    }
    const selectBtnFunc = (e) => {
        setSelectButtonOption(false)
        setSelectBtnOption(true)
    }
    return (
        <div className="form-container">
            <Row gutter={[40, 24]} justify="center">
                <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="section1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <h1 className="mapped-head">Bank Branches</h1><br />
                            <Button className="mapped-btn" shape="round" size="small">All</Button>
                        </Col>
                        <Col className="section2" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <h4 className="mapped-head4">Regions</h4>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col>
                                    <Button className={ selectButtonOption== true ? "mapped-button " : "mapped-btn2"}  value= {selectButtonOption}  onClick={selectButtonFunc}  icon={<UserOutlined />}>Self</Button>
                                </Col>
                                <Col>
                                    <Button className={ selectBtnOption== true ? "mapped-button " : "mapped-btn2"}  value= {selectBtnOption}  onClick={selectBtnFunc} icon={<UsergroupAddOutlined />}>Team</Button>
                                </Col>
                                <Col>
                                    <select style={{ width: 150, color: '#000', fontSize: '14px' }} bordered={false} >
                                        <option value="">Select</option>
                                        <option value="Mumbai Main">Mumbai Main</option>
                                        <option value="East">East</option>
                                        <option value="Mumbai 1">Mumbai 1</option>
                                        <option value="North 1">North 1</option>
                                        <option value="North 3">North 3</option>
                                        <option value="North 2">North 2</option>
                                        <option value="South 2">South 2</option>
                                        <option value="South 1">South 1</option>
                                        <option value="West 2">West 2</option>
                                        <option value="West 1">West 1</option>
                                    </select>
                                </Col>
                                <Col>
                                    <Button className="mapped-btn2">Reset</Button>
                                </Col>
                            </Row>
                            <Divider />
                        </Col>
                    </Row>
                </Col>

                <Col xs={{ order: 3 }} sm={12} md={12} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                    <Pagination defaultCurrent={1} total={50} />
                    <Row gutter={['', 24]}>
                        <Col className="mapped1" xs={22} sm={24} md={12} lg={24} xl={24} span={24}>
                            <div className="form-title">
                                <Row gutter={[20, 24]}>
                                    <Col>
                                        <Avatar
                                            src={<Image src="Group90162x.png" />}
                                        />
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Axis</p>
                                        <h3 className="head3">Branch: Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Region : North 1</p>
                                        <h3 className="head3">Cluster: Strategic Br - Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Meeting Scheduled on</p>
                                        <h3 className="head3">10/20/2021</h3>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                            <div className="card-1">
                                <Row gutter={[16, 16]}>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <Button type="primary" >View</Button>
                                    </Col>

                                </Row>
                                <Divider />
                                <Row gutter={[20, 24]}>
                                    <Col >
                                        <p className="paragaphs">JUL 2021 </p>
                                        <h3 className="head3">Month</h3>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">-</p>
                                        <h4 className="head4">% MTD YOY Growth</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000 </p>
                                        <h4 className="head4">% GWP Achieved</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Renewed Policy</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Retention GWP</h4>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className="mapped1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <div className="form-title">
                                <Row gutter={[20, 24]}>
                                    <Col>
                                        <Avatar
                                            src={<Image src="Group90162x.png" />}
                                        />
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Axis</p>
                                        <h3 className="head3">Branch: Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Region : North 1</p>
                                        <h3 className="head3">Cluster: Strategic Br - Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Meeting Scheduled on</p>
                                        <h3 className="head3">10/20/2021</h3>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                            <div className="card-1">
                                <Row gutter={[16, 16]}>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <Button type="primary" >View</Button>
                                    </Col>

                                </Row>
                                <Divider />
                                <Row gutter={[20, 24]}>
                                    <Col >
                                        <p className="paragaphs">JUL 2021 </p>
                                        <h3 className="head3">Month</h3>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">-</p>
                                        <h4 className="head4">% MTD YOY Growth</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000 </p>
                                        <h4 className="head4">% GWP Achieved</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Renewed Policy</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Retention GWP</h4>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 4 }} sm={12} md={12} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="mapped1" xs={22} sm={24} md={12} lg={24} xl={24} span={24} >
                            <div className="form-title">
                                <Row gutter={[20, 24]}>
                                    <Col>
                                        <Avatar
                                            src={<Image src="Group90162x.png" />}
                                        />
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Axis</p>
                                        <h3 className="head3">Branch: Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Region : North 1</p>
                                        <h3 className="head3">Cluster: Strategic Br - Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Meeting Scheduled on</p>
                                        <h3 className="head3">10/20/2021</h3>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                            <div className="card-1">
                                <Row gutter={[16, 16]}>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <Button type="primary" >View</Button>
                                    </Col>

                                </Row>
                                <Divider />
                                <Row gutter={[20, 24]}>
                                    <Col >
                                        <p className="paragaphs">JUL 2021 </p>
                                        <h3 className="head3">Month</h3>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">-</p>
                                        <h4 className="head4">% MTD YOY Growth</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000 </p>
                                        <h4 className="head4">% GWP Achieved</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Renewed Policy</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Retention GWP</h4>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className="mapped1" xs={22} sm={24} md={12} lg={24} xl={24} span={24} >
                            <div className="form-title">
                                <Row gutter={[20, 24]}>
                                    <Col>
                                        <Avatar
                                            src={<Image src="Group90162x.png" />}
                                        />
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Axis</p>
                                        <h3 className="head3">Branch: Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Region : North 1</p>
                                        <h3 className="head3">Cluster: Strategic Br - Jaipur</h3>
                                    </Col>
                                    <Col>
                                        <p className="paragaphs">Meeting Scheduled on</p>
                                        <h3 className="head3">10/20/2021</h3>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                            <div className="card-1">
                                <Row gutter={[16, 16]}>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <h4>-</h4>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <Button type="primary" >View</Button>
                                    </Col>

                                </Row>
                                <Divider />
                                <Row gutter={[20, 24]}>
                                    <Col >
                                        <p className="paragaphs">JUL 2021 </p>
                                        <h3 className="head3">Month</h3>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">-</p>
                                        <h4 className="head4">% MTD YOY Growth</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000 </p>
                                        <h4 className="head4">% GWP Achieved</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Renewed Policy</h4>
                                    </Col>
                                    <Col >
                                        <p className="paragaphs">0.000  </p>
                                        <h4 className="head4">% Retention GWP</h4>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default MappedBranches;