import React, { useState, useEffect, createRef } from "react";
import useInput from "../hooks/use-input";
import "./LeadBulkUpload.css";
import { CloudUploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { stoageGetter } from "../../helpers";
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
  message,
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
import * as XLSX from "xlsx/xlsx.mjs";
import { color, style } from "@mui/system";

const LeadBulkUpload = React.memo((props) => {
  const { id, channelCode } = stoageGetter("user");
  const [recordStatus, setRecordStatus] = useState({
    failed: 0,
    success: 0,
    link: "",
  });
  const [file, setFile] = useState([]);

  const jsonupload = (e) => {
    console.log("Event is", e.target.value);
    let split = e.target.value;
    console.log("array is", split);
    let fileLink = e.target.value;
    let excelfilename = e.target.files[0].name;

    //Reference the FileUpload element.
    // let fileUpload = document.getElementById("fileUpload");
    let fileUpload = e.target;
    console.log("File is", fileUpload.value);

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof FileReader != "undefined") {
        var reader = new FileReader();
        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
          //For NON IE Browser.
          reader.addEventListener("load", (e) => {
            ProcessExcel(e.target.result);
          });
          reader.readAsBinaryString(fileUpload.files[0]);
        } else {
          //For IE Browser.
          reader.addEventListener("load", (e) => {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            ProcessExcel(data);
          });
          reader.readAsArrayBuffer(fileUpload.files[0]);
        }
      } else {
        // this.vSnackBar("error","This browser does not support HTML5.");
      }
    } else {
      // this.vSnackBar("error","Please upload a valid Excel file.");
      // alert("This format is not allowed");
      message.warning("This format is not allowed");
    }
  };

  const ProcessExcel = (data) => {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
      type: "binary",
    });
    console.log("Workbook is", workbook.Strings);
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
    //        raw: true
    //    }));
    var excelData = [];
    excelData = XLSX.utils.sheet_to_csv(worksheet);
    // var json_object = JSON.stringify(XL_row_object);
    console.log("excelData", excelData);
    var lines = excelData.split("\n");

    var result = [];

    var headers = lines[0].split(",");
    console.log("Lines are", lines);

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < currentline.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    let res = [];
    console.log("JSON IS", result);
    for (let i = 0; i < result.length; i++) {
      if (result[i].accessOpt !== "") {
        res.push(result[i]);
      }
    }
    message.success("File Uploaded Successfully");
    setFile(JSON.stringify(res));
  };

  const goToNextTab = async () => {
    if (file && file.length > 0) {
      try {
        let res = await axiosRequest.post(
          `admin/bulk_upload/${id}`,
          {
            leadInJson: file,
            campaign_id: id,
            lead_source_id: id,
          },
          {
            secure: true,
          }
        );
        console.log("response", res);

        setRecordStatus((item) => ({
          ...item,
          failed: res.failed,
          success: res.success,
          link: res.link,
        }));

        setActiveTab(2);
      } catch (error) {
        console.log("error API " + error);
      }
    }
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState(1);
  const breakpoint = 620;
  const submitHandler = () => {
    console.log("ss");
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
            style={{ color: activeTab === 1 ? "#fff" : "#000" }}
            className={`${activeTab === 1 && "active"} TabButton`}
          >
            <div style={{ fontWeight: "bolder" }}>Step 1</div>
            <div>Import Lead</div>
          </button>
          <button
            // onClick={() => setActiveTab(file && file.length ? 2 : 1)}
            onClick={() => setActiveTab(recordStatus.link ? 2 : 1)}
            style={{ color: activeTab === 2 ? "#fff" : "#000" }}
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
                  <input
                    type="file"
                    onChange={(e) => jsonupload(e)}
                    disabled={recordStatus && recordStatus.link}
                  />
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
                    href="https://image-upload-bucket-2019.s3.amazonaws.com/sdx-bucket-uat/c28a93542185c6c9028c57698580ef6781b84c4404e46808817b6e1353ee285b.xlsx"
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
                    <h3>
                      {parseInt(recordStatus.success) +
                        parseInt(recordStatus.failed)}
                    </h3>
                  </div>
                  <div>
                    <p>Successfully Imported</p>
                    <h3>{recordStatus.success}</h3>
                  </div>
                  <div>
                    <p>Failed During Import</p>
                    <h3>{recordStatus.failed}</h3>
                  </div>
                </div>

                <div className="mt-5">Download the list of failed records</div>

                <div className="mt-3">
                  <a href={recordStatus.link} download>
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
