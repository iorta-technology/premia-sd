import React, { useState, useEffect, createRef } from "react";
import useInput from "../hooks/use-input";
import "./LeadBulkUpload.css";
import { CloudUploadOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Button,
  Upload,
  Input,
  Select,
  Cascader,
  DatePicker,
  Space,
  Modal,
  Table,
  TimePicker,
  Spin,
} from "antd";
import {
  ArrowRightOutlined,
  FileTextOutlined,
  EditOutlined,
  PhoneOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Tabs from "../../components/Tab/Tab";
import FloatButton from "../FloatButton/FloatButton";
import { msToDateString } from "../../helpers";
import _ from "lodash";
import { checkAgent, milToDateString } from "../../helpers";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import axiosRequest from "../../axios-request/request.methods";

const LeadBulkUpload = React.memo((props) => {
  const uploadData = {
    name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // headers: {
    //   authorization: "authorization-text",
    // },
    onChange(info) {
      var str = info.file.name;
      var index = str.lastIndexOf(".");
      var type = str.slice(index + 1, str.length);
      if (type === "xls" || type === "xlsx" || type === "csv") {
        console.log("next step");
      } else {
        console.log("formate is not allowed");
      }
    },
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState(1);
  const breakpoint = 620;
  const submitHandler = () => {
    console.log("ss");
  };

  const goToNextTab = () => {
    setActiveTab(2);
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  return (
    <>
      <div className="form-container" style={{ padding: "74px 0" }}>
        <Row justify={"center"} className="mb-5">
          <button
            onClick={() => setActiveTab(1)}
            className={`${activeTab === 1 && "active"} TabButton`}
          >
            <div style={{ fontWeight: "bolder" }}>Step 1</div>
            <div>Import Lead</div>
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`${activeTab === 2 && "active"} TabButton`}
          >
            <div style={{ fontWeight: "bolder" }}>Step 2</div>
            <div>Uploaded Summary</div>
          </button>
        </Row>
        {activeTab === 1 ? (
          <Form form={form} onFinish={submitHandler}>
            <Row justify={"center"}>
              <Col
                className="form-body p40 mb-2 mx-0"
                xs={24}
                sm={24}
                md={16}
                lg={15}
                xl={15}
                span={23}
                offset={width > breakpoint ? 2 : 0}
                style={{ backgroundColor: "#5a5a5a", color: "#fff" }}
              >
                <p className="form-title">Bulk Upload Lead</p>
                <div className="my-3 upload_div">
                  <Upload {...uploadData} maxCount={1}>
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                      type="primary"
                      icon={<CloudUploadOutlined />}
                    >
                      Upload
                    </Button>
                  </Upload>
                </div>
                <div className="my-3">Files Support - .xls, xlsx, and .csv</div>
                <div className="my-3">
                  (Recommended to use .csv file if count of records are over
                  10,000)
                </div>
                <div className="my-3">
                  Approximate time to upload a 2mb file ~ 2 minutes
                </div>
                <div className="my-3">
                  You can download the sample file for the format in which you
                  are required to upload data
                </div>
                <div className="mt-5">
                  <a
                    href="https://image-upload-bucket-2019.s3.amazonaws.com/955a4e90228ac8d836bc2afd75d26ad69925a9e2.xlsx"
                    download
                  >
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                      type="secondary"
                      icon={<DownloadOutlined />}
                    >
                      Download
                    </Button>
                  </a>
                </div>
                <div className="my-3" style={{ color: "#adadad" }}>
                  Please DO NOT change the column names given in the sample
                  file. You can leave the columns blank (other than - Name,
                  Phone number, State, and City)
                </div>

                <div
                  className="my-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => goToNextTab()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#313131",
                      color: "#fff",
                      padding: "10px 30px",
                    }}
                  >
                    Next <ArrowRightOutlined />
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form form={form} onFinish={submitHandler}>
            <Row justify={"center"}>
              <Col
                className="form-body p40 mb-2 mx-0"
                xs={24}
                sm={24}
                md={16}
                lg={15}
                xl={15}
                span={23}
                offset={width > breakpoint ? 2 : 0}
                style={{ backgroundColor: "#5a5a5a", color: "#fff" }}
              >
                <p className="form-title">Upload Summary</p>

                <div className="status_boxes my-4">
                  <div>
                    <p>Total Records Available</p>
                    <h3>34</h3>
                  </div>
                  <div>
                    <p>Successfully Imported</p>
                    <h3>34</h3>
                  </div>
                  <div>
                    <p>Failed During Import</p>
                    <h3>34</h3>
                  </div>
                </div>

                <div className="mt-5">Download the list of failed records</div>

                <div className="mt-3">
                  <a
                    href="https://image-upload-bucket-2019.s3.amazonaws.com/955a4e90228ac8d836bc2afd75d26ad69925a9e2.xlsx"
                    download
                  >
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                      type="secondary"
                    >
                      Download
                    </Button>
                  </a>
                </div>
                <div className="my-4" style={{ color: "#adadad" }}>
                  Please check the remarks given in the last column of the
                  sheet. Correct the data as per the remarks, and upload this
                  data set again. DO NOT upload along with the data which is
                  already uploaded successfully
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
});

export default LeadBulkUpload;
