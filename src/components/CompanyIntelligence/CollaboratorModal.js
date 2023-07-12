import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Form, Input , AutoComplete, Button , Modal  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/index";
import _ from "lodash";
import axiosRequest from '../../axios-request/request.methods'  
import moment from "moment";
import { checkAgent, doSentenceCase } from "../../helpers";

import { PlusOutlined,CloseOutlined, } from "@ant-design/icons";

const { TextArea } = Input;




const CollaboratorModal = (props) => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    // console.log('(((((((((COLLABBBB)))))))))---->>>>',props.teamDataArr)

    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const user_id = useSelector((state) => state.login.user.id);
    const login_user = useSelector((state) => state?.login?.user);
    // console.log('(((((((((_StoreData___VASS)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)

    const [teamMemberData, setTeamMemberData] = useState("");
    const [hierarAgentList, setHierarAgentList] = useState([]);
    const [teamDataArr, setTeamDataArr] = useState([]);
    const [collaboratorsList, setCollaboratorsList] = useState([]);

    let _teamMember = [];


    
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    const breakpoint = 620;

    const userTreeData = useSelector((state) => state?.home?.user_tree);
    const _reportManager = useSelector((state) => state?.login?.reportingManager);
    // console.log('(((((((((_reportManager)))))))))---->>>>',_reportManager)

    useEffect(() => {
        let _teamSelected = []
        if (Object.keys(props.teamDataArr).length > 0) {
            props.teamDataArr.map(el =>{
                _teamSelected.push(el.value)
                let apiBody = {
                    first_name: el.firstname,
                    last_name: el.lastname,
                    Id: el._Id,
                };
                // _dataArr.push(apiBody)
                setTeamDataArr([...teamDataArr, apiBody]);
            })
            // console.log('(((((((((_teamSelected)))))))))---->>>>',_teamSelected)
            
            setCollaboratorsList(_teamSelected)
           
        }else{

        }
    }, [props.teamDataArr]);

    useEffect(() => {
        getHierarData()
    }, []);

    const getHierarData = () => {
        try {
        // let _teamMember = [];
        if (checkAgent() === false) {
            userTreeData.reporting_users.map((el) => {
                let sortarray = {
                    FullName: el.full_name,
                    ShortId: el.employeeCode,
                    firstname: el.first_name,
                    lastname: el.last_name,
                    employecode: el.employeeCode,
                    designation: el.hierarchyName,
                    _Id: el._id,
                    value: doSentenceCase(el.full_name) + " " + "(" + el.hierarchyName + ")",
                };
                _teamMember.push(sortarray);
                sortarray = {};
            });
            let _finalData = [..._teamMember, _reportManager];
            setHierarAgentList(_finalData);
        } else {
            if (login_user.hasOwnProperty("reportingManager")) {
                // login_user.reportingManager
                let _reporting = login_user.reportingManager;

                let sortarray = {
                    FullName: _reporting.full_name,
                    ShortId: _reporting.employeeCode,
                    firstname: _reporting.first_name,
                    lastname: _reporting.last_name,
                    employecode: _reporting.employeeCode,
                    designation: _reporting.hierarchyName,
                    _Id: _reporting._id,
                    value: doSentenceCase(_reporting.full_name) + " " + "(" +_reporting.hierarchyName +")",
                };
                _teamMember.push(sortarray);
                // sortarray = {};
                setHierarAgentList(_teamMember);
            }
        }
        } catch (err) {}
    };

    const addCollaborators = () => {
        if (teamMemberData && teamMemberData != "") {
            // setFormItem((res) => ({
            //     ...res,
            //     collaborators: [...formItem.collaborators, teamMemberData],
            // }));
            // form.setFieldsValue({
            //     collaborators: "",
            // });
            setCollaboratorsList([...collaboratorsList ,teamMemberData])
            setTeamMemberData("");
            let _checkDuplicate = null;
            teamDataArr.map((el) => {
                _checkDuplicate = teamMemberData.includes(el.first_name) ? true : false;
            });
            hierarAgentList.map((item) => {
                if (_checkDuplicate) {
                } else {
                    if (item.value === teamMemberData) {
                        let apiBody = {
                            first_name: item.firstname,
                            last_name: item.lastname,
                            Id: item._Id,
                        };
                        // _dataArr.push(apiBody)
                        setTeamDataArr([...teamDataArr, apiBody]);
                    }
                }
            });
        }
    };

    const filterCollaborators = (inputValue, option) => {
        return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
      };

    const onChangeTeam = (text, data) => {
        // console.log(text, 'text------>')
        // console.log(data, 'data------>')
        setTeamMemberData(text);
    };

    const removeCollaborators = (data, index) => {
        // setFormItem((res) => ({
        //   ...res,
        //   collaborators: res.collaborators.filter((item, ind) => index !== ind),
        // }));


        let _filterData = collaboratorsList.filter((item, ind) => index !== ind)

        setCollaboratorsList(_filterData)
    
        let _dataArr = teamDataArr.filter(
          (item) => item.first_name !== data.split(" ")[0]
        );
        //  console.log('ON _dataArr ______________', _dataArr);
        setTeamDataArr(_dataArr);
      };


    const updateRemark = (event) =>{

        let formBody = {
            // lead_id: _StoreData._id,
            collaborators: teamDataArr,
        }
        // console.warn('formBody ------>>>>>',formBody)
        // dispatch(actions.fetchLeadUpdateBody(formBody))
        dispatch(actions.editLead(formBody, _StoreData._id))
        props.setShowCollabortrModal(false)
    }

    let _chipData = [...new Set(collaboratorsList)];

return (
    <>
        <Modal
            title="Collaborators"
            centered={true}
            visible={props.showCollabortrModal}
            width={width < breakpoint ? 370 : 700}
            className="modalStyle"
            onCancel={() => props.setShowCollabortrModal(false) }
            footer={null}
        >
            <Col
                className="mb-2"
                xs={24}
                sm={24}
                md={16}
                lg={15}
                xl={24}
                span={23}
                >
                    <Row style={{marginBottom:15}}>
                        <AutoComplete
                            value={teamMemberData}
                            searchValue={teamMemberData}
                            style={{ width: width < breakpoint ? "74%" : "85%" }}
                            options={hierarAgentList}
                            onChange={(text, data) => onChangeTeam(text, data)}
                            notFoundContent="No Result Found"
                            placeholder="Enter Collaborator"
                            filterOption={(inputValue, option) =>
                                filterCollaborators(inputValue, option)
                            }
                        >
                            {/* <Search placeholder="Search by Name" /> */}
                        </AutoComplete>

                        <Button
                            style={{
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 10,
                                backgroundColor: "#00ACC1",
                                color: "#fff",
                            }}
                            icon={<PlusOutlined />}
                            onClick={addCollaborators}
                         >
                            ADD
                        </Button>
                    </Row>

                    <Col span={24} >
                        <div className="d-flex flex-wrap justify-content-start mb-2">
                        {/* {console.log('formItem.collaborators--->>>',_chipData)} */}
                        {_chipData &&
                            _chipData.map((res, index) => (
                            <div
                                key={index}
                                className="add_collaborators_items shadow-sm"
                            >
                                {res + " "}
                                <CloseOutlined
                                onClick={() => removeCollaborators(res, index)}
                                style={{ marginLeft: 10, fontWeight: "bolder" }}
                                />
                            </div>
                            ))}
                        </div>
                    </Col>
               
                <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button size='large' onClick={()=> props.setShowCollabortrModal(false)} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> updateRemark()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default CollaboratorModal

