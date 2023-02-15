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
  const user_id = useSelector((state) => state.login.user.id);

  const [ourAskData, setOurAskData] = useState("");
  const [redFlagData, setRedFlagData] = useState("");
  const [fileList, setFileList] = useState([]);
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

  useEffect(() => {
    console.log(props.leadDetails, "lead id----->");
    console.log(_StoreData.documents, "useefeects documents");
    setFileData(_StoreData.documents);
    setdocData(_StoreData.documents);
  }, []);

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
    console.log(info.file.originFileObj, "info file---->");
    let newArr = [...fileData];
    let documentType = "PDF";

    // Update the formData object

    // let axiosConfig = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     authorization: "Bearer " + _store.login.token
    //   },
    // }
    // axios
    // .post(
    //     "https://b2bnodedev.salesdrive.app/b2b/secure/admin/v2/uploadFile",
    //     {media_upload : info.file},
    //     axiosConfig
    // )
    // .then((res) => {
    //   console.log(res,'fina res of upload------->');
    // });
    // catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     console.log("error -----", err);
    //   } else {
    //     throw err;
    //   }
    // }

    newArr.push(info.file.originFileObj);
    setFileData(newArr);
    console.log("fileList--->", newArr);
  };

  const Save = async () => {
    var finalData = [];
    if (fileData.length != 0) {
      fileData?.map(async (item, index) => {
        let formData = new FormData();
        formData.append("media_upload", item);
        console.log(Object.fromEntries(formData), "formdata------->");
        // Details of the uploaded file

        let result = await axiosRequest.post(`admin/v2/uploadFile`, formData, {
          secure: true,
          multipart: true,
        });
        console.log(result.location, "upload result--====>");
        let obj = {
          url: result.location,
          doc_category: "Photo ID, Aadhar Card",
        };
        finalData.push(obj);
        console.log(finalData, "final data before all subit----->");
        if (
          index == fileData.length - 1 &&
          finalData.length == fileData.length
        ) {
          setdocData(finalData);
          let formBody = {
            company_details: {
              company_name: _StoreData?.company_id?.company_name,
              parent_company: _StoreData?.company_id?.parent_company,
              industry_name: _StoreData?.company_id?.industry_name,
              tata_aig_empaneled:
                _StoreData?.company_id?.tata_aig_empaneled === true
                  ? "Yes"
                  : "No",
              client_location: _StoreData?.company_id?.client_location,
            },
            leadStatus: _StoreData?.leadStatus,
            leadDisposition: _StoreData?.leadDisposition,
            leadsubDisposition: _StoreData?.leadsubDisposition,
            opportunity_name: _StoreData?.opportunity_name,
            tender_driven: _StoreData?.tender_driven === true ? "Yes" : "No",
            LOB_opportunity: _StoreData?.lob_for_opportunity,
            product_for_opportunity: _StoreData?.product_for_opportunity,
            remarks: _StoreData?.remarks,
            teamMembers: "[]",
            lead_Owner_Id: user_id,
            lead_Creator_Id: user_id,
            user_id: user_id,
            company_id: _StoreData?.company_id?._id,
            start_date: _StoreData?.start_date,
            start_time: _StoreData?.start_time,
            client_expectations: _StoreData?.client_expectations,
            red_flags: _StoreData?.red_flags,
            our_ask: _StoreData?.our_ask,
            channel_name: _StoreData?.channel_name,
            producer: _StoreData?.producer,
            VAS_executed: _StoreData?.VAS_executed,
            kdm_details: _StoreData?.company_id?.kdm_details,
            risk_details: _StoreData?.company_id?.risk_details,
            documents: finalData,
          };
          console.warn("formBody ------>>>>>", formBody);
          dispatch(actions.fetchLeadUpdateBody(formBody));
          dispatch(actions.editLead(formBody, props.leadDetails));
        }
      });
      console.log(finalData.length, fileData.length);
      if (docData?.length > 0) {
        console.log(finalData.length, fileData.length, "here-->");
        console.log(finalData, "final data after all subit----->");
      }
    }
  };

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
              {/* <input type='file'  onChange={(e)=>handleChangeFile(e.target.files)} /> */}
              <Upload
                onChange={handleChangeFile}
                multiple={true}
                fileList={fileList}
                style={{ width: "100%" }}
                accept="application/pdf,image/jpeg"
              >
                <Button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  icon={<CloudUploadOutlined />}
                >
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <div className="upload_list shadow-sm">
          {fileData && fileData.length > 0 && (
            <div className="row px-3 py-2 head">
              <div className="col-2">Image</div>
              <div className="col-6">Document Type</div>
              <div className="col-3">Action</div>
            </div>
          )}
          {console.log(fileData, "uploaded data----->")}
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
              <div className="col-6 data flex-center">
                Photo ID, Aadhar Card
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
