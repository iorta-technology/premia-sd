import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Row,
  Col,
  Radio,
  Tabs,
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
} from "antd";
import "../StatusLead/StatusLead.css";
import * as actions from "../../store/actions/index";
import _ from "lodash";
import { dataFormatting } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";
import {
  PlusOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import rootIndex from "../../store/root_index";
import apiConfig from "../../config/api.config";
import moment from "moment";

const { store } = rootIndex;
const { baseURL, auth, secure, NODE_ENV } = apiConfig;

const tabMenu = [
  {
    id: 1,
    value: "Opportunity Details",
  },
  {
    id: 2,
    value: "Company Intelligence",
  },
  {
    id: 3,
    value: "History",
  },
];

const DocUpload = (props) => {
  // const storeLeadId = useSelector((state) => state.newLead.leadId)
  // const storeUserId = useSelector((state) => state.newLead.userId)
  const dispatch = useDispatch();

  const _StoreData = useSelector((state) => state?.newLead?.formData);
  const _UpdateFormBody = useSelector((state) => state?.newLead?.leadUpdateFormdata);
  const user_id = useSelector((state) => state.login.user.id);

  const [ourAskData, setOurAskData] = useState("");
  const [redFlagData, setRedFlagData] = useState("");
  const [documentType, setDocumentType] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [docData, setdocData] = useState([]);
  const [clientExpectationData, setClientExpectationData] = useState("");

  let { innerWidth: width, innerHeight: height } = window;
  const { TabPane } = Tabs;
  const [tabPosition, setTabPosition] = useState(
    width <= "374"
      ? "top"
      : width <= "424"
      ? "top"
      : width <= "767"
      ? "top"
      : width <= "1023"
      ? "top"
      : "left"
  );

  const breakpoint = 620;
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const kdmRoleArr = [{ label: "TBI", value: "TBI" }];

  const onChangeOurAsk = (e) => {
    // console.warn('FIRSTNAME',e)

    setOurAskData(e.target.value);
  };

  const onChangeClientExpect = (e) => {
    setClientExpectationData(e.target.value);
  };

  const onChangeRedFlag = (e) => {
    setRedFlagData(e.target.value);
  };

  const handleChangeFile = async (info) => {
    const _store = store.getState();
    console.log(info[0], "info file---->");
    let newArr = [...fileData];
    let documentType = "PDF";

    const formData = new FormData();
    formData.append("media_upload", info[0]);

    // console.warn('newArr--------------->>>>',newArr)
    // console.warn('formData --------------->>>>',formData)
    
    let _isDup = checkDupDate(info[0])
    console.warn('_isDup --------------->>>>',_isDup)

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + _store.login.token,
      },
    };
    if(!_isDup){
      axios
        .post(
          `${baseURL}secure/admin/v2/uploadFile`,
          formData,
          axiosConfig
        )
        .then((res) => {
          newArr.push({ ...res.data.errMsg, recent: true });
          setFileData(newArr);
          document.getElementById("upload-photo").value = "";
        })
        .catch((err) => {
          throw err;
        });
    }else{
      message.warning("File Already Uploaded");
    }
  };

  const checkDupDate = (fileUploaded) =>{
    let _data = null
    var index = fileData.findIndex(el => el.originalname === fileUploaded.name); 
    _data = index === -1 ? false : true

    return _data
  };

  const Save = async () => {
    var finalData = [];

    if (fileData.length != 0 && fileData.length > 0) {
      fileData?.map(async (item, index) => {
        if (item.recent) {
          console.log("item.recent=================");
          let formData = new FormData();
          formData.append("media_upload", item);
          console.log("item ========== ", item);

          let obj = {
            url: item.location,
            doc_category: "abc",
            file_name: item.originalname,
          };
          finalData.push(obj);
          console.log(finalData, "final data before all subit----->");
        }
      });

      setdocData(finalData);
      let _appntDate = ''
        let _appntTime = ''
        let _apptDateFormat = ''

        if (_StoreData.appointmentDate) {
            _appntDate = moment(_StoreData.appointmentDate).format("MM/DD/YYYY");
            _appntTime = moment(_StoreData.appointmentDate).format("LT");
        }
      let formBody = {
        company_details: {
          company_name: _StoreData?.company_id?.company_name,
          parent_company: _StoreData?.company_id?.parent_company,
          industry_name: _StoreData?.company_id?.industry_name,
          tata_aig_empaneled:
            _StoreData?.company_id?.tata_aig_empaneled === true ? "Yes" : "No",
          client_location: _StoreData?.company_id?.client_location,
        },
        leadStatus: _StoreData?.leadStatus,
        leadDisposition: _StoreData?.leadDisposition,
        leadsubDisposition: _StoreData?.leadsubDisposition,
        opportunity_name: _StoreData?.opportunity_name,
        tender_driven: _StoreData?.tender_driven === true ? "Yes" : "No",
        LOB_opportunity: _StoreData?.lob_for_opportunity,
        product_for_opportunity: _StoreData?.product_for_opportunity,
        // remarks: _StoreData?.remarks,
        teamMembers: "[]",
        lead_Owner_Id: user_id,
        lead_Creator_Id: user_id,
        user_id: user_id,
        company_id: _StoreData?.company_id?._id,
        // start_date: _UpdateFormBody?.start_date,
        // start_time:_UpdateFormBody?.start_time,
        start_date: _appntDate,
        start_time: _appntTime,
        client_expectations: _StoreData?.client_expectations,
        red_flags: _StoreData?.red_flags,
        our_ask: _StoreData?.our_ask,
        channel_name: _StoreData?.channel_name,
        producer: _StoreData?.producer,
        VAS_executed: !_StoreData?.VAS_executed
          ? "Yes"
          : _StoreData?.VAS_executed,
        VAS_input: _StoreData?.VAS_input,
        kdm_details: _StoreData?.company_id?.kdm_details,
        risk_details: _StoreData?.company_id?.risk_details,
        documents: finalData,
      };
      console.warn("formBody ------>>>>>", formBody);
      dispatch(actions.fetchLeadUpdateBody(formBody));
      dispatch(actions.editLead(formBody, props.leadDetails));
    } else {
      message.info("Please Upload the new File");
    }
  };

  useEffect(() => {
    console.log(props.leadDetails, "lead id----->");
    var newArr = _StoreData.documents.map((res) => ({ ...res, recent: false }));
    console.log("newArr =========== ", _StoreData);
    setFileData(newArr);
    setdocData(_StoreData.documents);
  }, [_StoreData.documents]);

  const delDoc = (i) => {
    var newArr = [...fileData];
    newArr.splice(i, 1);
    setFileData([...newArr]);
  };

  return (
    <>
      <Col
        className="form-body ci-p20 mb-2"
        xs={24}
        sm={24}
        md={16}
        lg={15}
        xl={20}
        span={23}
      >
        <p className="form-title">Document Upload</p>
        <Row gutter={16} className="mb-2 statsLead kdmStyle">
          {/* <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="form-item-name label-color"
              name="kdmClientExpectation"
              label="Document Types"
              rules={[
                // { required: true, message: "First Name is required",},
                {
                  message: "Only Alphabets are Allowed",
                  pattern: new RegExp(/^[a-zA-Z ]+$/),
                },
              ]}
              style={{ marginBottom: "1rem" }}
            >
              <Input
                placeholder="Enter Document Type"
                value={clientExpectationData}
                // defaultValue={kdmName}
                onChange={(item) => onChangeClientExpect(item)}
              />
            </Form.Item>
          </Col> */}

          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item
              {...formItemLayout}
              className="form-item-name label-color upload_input"
              name="upload"
              label="Upload"
              style={{ marginBottom: "1rem" }}
            >
              <label
                for="upload-photo"
                style={{
                  border: "1px solid gray",
                  padding: "4px 76px",
                  color: "gray",
                  boxShadow:
                    "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              >
                Upload File
              </label>
              <input
                type="file"
                id="upload-photo"
                style={{ width: "100%" }}
                accept="application/pdf,image/jpeg"
                onChange={(e) => handleChangeFile(e.target.files)}
              />
            </Form.Item>
          </Col>
        </Row>
        {fileData && fileData.length > 0 && 
          <div className="upload_list shadow-sm">
            {fileData && fileData.length > 0 && (
              <div className="row px-3 py-2 head">
                <div className="col-2">Image</div>
                <div className="col-6" style={{display:'flex',flex:1}} >
                  Document Name
                </div>
                <div className="col-3">Action</div>
              </div>
            )}
            <div style={{height:1,backgroundColor:'#d8d8d8'}}></div>
            {/* {console.log(fileData, "uploaded data----->")} */}
            {fileData?.map((item, index) => (
              <div className="row px-3 py-2">
                <div className="col-2">
                  <div
                    style={{ backgroundColor: "#EFEFEF" }}
                    className="w-75 px-3 py-2 rounded flex-center justify-content-center"
                  >
                    <FileImageOutlined style={{ color: "gray" }} />
                  </div>
                </div>
                <div style={{display:'flex',flex:1}} className="col-6 data flex-center">
                  <a href={item.url} download>
                    {item.originalname || item.file_name}
                  </a>
                </div>
                <div className="col-3 flex-center">
                  <DeleteOutlined
                    onClick={() => delDoc(index)}
                    style={{ color: "#d32f2f" }}
                  />
                </div>
              </div>
            ))}
          </div>
        }

        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            style={{
              borderRadius: 5,
              backgroundColor: "#3b371e",
              color: "#fff",
            }}
            onClick={() => Save()}
          >
            Save and Update
          </Button>
        </div>
      </Col>
    </>
  );
};

export default DocUpload;
