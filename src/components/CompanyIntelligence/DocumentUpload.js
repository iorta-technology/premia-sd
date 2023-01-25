import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import * as actions from "../../store/actions/history";
import _ from "lodash";
import { dataFormatting } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";
import {
  PlusOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

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

const DocUpload = () => {
  // const storeLeadId = useSelector((state) => state.newLead.leadId)
  // const storeUserId = useSelector((state) => state.newLead.userId)
  // const dispatch = useDispatch()

  const [ourAskData, setOurAskData] = useState("");
  const [redFlagData, setRedFlagData] = useState("");
  const [fileList, setFileList] = useState([]);
  const [fileData, setFileData] = useState([]);
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

  const handleChangeFile = (info) => {
    let newArr = [...fileData];
    let documentType = "PDF";

    newArr.push({
      ...info.file,
      documentType: documentType,
    });
    setFileData(newArr);
    console.log("fileList", fileData);
  };

  const delDoc = (i) => {
    setFileData((res) => res.splice(i, 1));
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
          <Col xs={24} sm={12} md={24} lg={12} xl={8}>
            <Form.Item
              {...formItemLayout}
              className="form-item-name label-color"
              name="kdmClientExpectation"
              label="Document Type"
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
          </Col>

          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item
              {...formItemLayout}
              className="form-item-name label-color upload_input"
              name="upload"
              label="Upload"
              style={{ marginBottom: "1rem" }}
            >
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
                    alignItems: "end",
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
        <div className="m-4 upload_list shadow-sm">
          {fileData && fileData.length > 0 && (
            <div className="row px-3 py-2 head">
              <div className="col-2">Image</div>
              <div className="col-6">Document Type</div>
              <div className="col-3">Action</div>
            </div>
          )}
          {fileData.map((item, index) => (
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
                Photo ID, {item.documentType}
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
          >
            Save and Update
          </Button>
        </div>
      </Col>
    </>
  );
};

export default DocUpload;
