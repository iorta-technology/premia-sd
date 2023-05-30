import React, { useState, useEffect, createRef, useRef } from "react";
import "./StatusLead.css";
import { industryDataArr, cityZoneList } from "./dataSet";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  Modal,
  Spin,
  Radio,
  AutoComplete,
  message,
  Progres,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import axiosRequest from "../../axios-request/request.methods";
import TodoTab from "../Activitity Tracker/RightSide-Todo/TodoCreate-Tab/Todo-Tab";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const NewLead = React.memo((props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const [companyArray, setCompanyArray] = useState([]);
  const [parentCompArray, setparentCompArray] = useState([]);
  const [industryArray, setIndustryArray] = useState([]);
  const [company_id, setCompany_id] = useState("");
  const [clienLocArr, setClienLocArr] = useState([]);
  const [disableParentComp, setDisableParentComp] = useState(false);
  const [formItem, setFormItem] = useState({
    companyName: "",
    parentCompanyName: null,
    industry: "",
    empaneled: false,
    clientLocation: "",
    clientZone: "",
  });

  useEffect(() => {
    let _clientLoc = cityZoneList.map((el) => {
      let _data = { label: el.City, value: el.City };
      return _data;
    });
    setClienLocArr(_clientLoc);
  }, []);

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const getCompanyDetails = async (lead_id) => {
    let result = await axiosRequest.get(`admin/company/companies`, {
      secure: true,
    });
    let _compArr = [];
    let _parentCompArr = [];
    result.companies.map((el) => {
      let _data = { value: el.company_name, _id: el._id };
      _compArr.push(_data);
    });
    setCompanyArray(_compArr);

    result.parent_company.map((el) => {
      let _data = { label: el, value: el };
      _parentCompArr.push(_data);
    });
    setparentCompArray(_parentCompArr);
    setIndustryArray(industryDataArr);
  };

  const onSelectCompany = async (event, data) => {
    setCompany_id(data._id);
    setDisableParentComp(true);
    let result = await axiosRequest.get(
      `admin/company/companies?company_id=${data._id}`,
      { secure: true }
    );

    setFormItem((res) => ({
      ...res,
      companyName: event,
      empaneled:
        result.companies[0].tata_aig_empaneled === "Yes" ? true : false,
      industry: result.companies[0].industry_name,
      parentCompanyName: !result.companies[0].parent_company
        ? null
        : result.companies[0].parent_company._id,
    }));

    form.setFieldsValue({
      company_name: event,
      parent_company: !result.companies[0].parent_company
        ? undefined
        : result.companies[0].parent_company.company_name,
      industry: result.companies[0].industry_name,
    });
  };

  const onCompanyChange = (event, data) => {
    setFormItem((res) => ({
      ...res,
      companyName: event,
      parentCompanyName: null,
      industry: "",
      clientLocation: "",
      empaneled: false,
    }));
    form.setFieldsValue({
      company_name: event,
      parent_company: null,
      industry: "",
      client_location: "",
    });
    setDisableParentComp(false);
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const failedHandler = (error) => {
    alert(error);
    console.log(error);
  };

  const onIndustryChange = (event, data) => {
    setFormItem((res) => ({ ...res, industry: event }));
    form.setFieldsValue({ industry: event });
  };

  const onSelectIndustry = (event, data) => {
    setFormItem((res) => ({ ...res, industry: event }));
    form.setFieldsValue({ industry: event });
  };

  const onParentCompanyChange = (event, data) => {
    setFormItem((res) => ({ ...res, parentCompanyName: data._id }));
    form.setFieldsValue({ parent_company: event });
  };

  let updateLeadFormData = {
    company_details: {
      company_name: formItem.companyName,
      parent_company: formItem.parentCompanyName,
      industry_name: formItem.industry,
      tata_aig_empaneled: formItem.empaneled === true ? "Yes" : "No",
      client_location: formItem.clientLocation,
      zone: formItem.clientZone,
    },
  };

  const submitHandler = () => {
    if (formItem.companyName === "") {
      return message.warning("Company Name is required");
    }

    if (formItem.industry === "") {
      return message.warning("Industry is required");
    }

    let addLeadFormData = {
      company_details: {
        company_name: formItem.companyName,
        parent_company: formItem.parentCompanyName,
        industry_name: formItem.industry,
        tata_aig_empaneled: formItem.empaneled === true ? "Yes" : "No",
        client_location: formItem.clientLocation,
        zone: formItem.clientZone,
      },
    };
  };

  const clientLocationChange = (event) => {
    setFormItem((res) => ({ ...res, clientLocation: event }));
    form.setFieldsValue({ client_location: event });

    let _zoneData = cityZoneList.filter(
      (el) => el.City.toLowerCase() === event.toLowerCase()
    );
    if (_zoneData.length > 0) {
      setFormItem((res) => ({ ...res, clientZone: _zoneData[0].Zone }));
      form.setFieldsValue({ client_zone: _zoneData[0].Zone });
    } else {
      setFormItem((res) => ({ ...res, clientZone: "" }));
      form.setFieldsValue({ client_zone: "" });
    }
  };

  let _chipData = [...new Set(formItem.collaborators)];

  return (
    <>
      <Modal
        title="Add New Lead"
        centered={true}
        visible={props.showVasModal}
        width={700}
        className="modalStyle"
        onCancel={() => props.setShowVasModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={submitHandler}>
          <Row justify={width > breakpoint ? "center" : ""} gutter={[0, 24]}>
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 16, order: 2 }}
              lg={{ span: 15, order: 1 }}
              xl={{ span: 24, order: 1 }}
              span={23}
              style={{ height: "max-content" }}
            >
              <Row gutter={16} className="mb-2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color "
                    name="company_name"
                    label="Company Name"
                    rules={[
                      {
                        required: false,
                        message: "Select your Company",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <AutoComplete
                      placeholder="Select"
                      options={companyArray}
                      value={formItem.companyName}
                      onChange={(val, data) => onCompanyChange(val, data)}
                      onSelect={(val, data) => onSelectCompany(val, data)}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    ></AutoComplete>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color"
                    name="parent_company"
                    label="Parent Company Name"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      disabled={disableParentComp}
                      placeholder="Select"
                      options={companyArray}
                      value={formItem.parentCompanyName}
                      onChange={(val, data) => onParentCompanyChange(val, data)}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color"
                    name="industry"
                    label="Industry"
                    rules={[
                      {
                        required: false,
                        message: "Select Industry",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <AutoComplete
                      disabled={disableParentComp}
                      placeholder="Select"
                      options={industryArray}
                      value={formItem.industry}
                      onChange={(val, data) => onIndustryChange(val, data)}
                      onSelect={(val, data) => onSelectIndustry(val, data)}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    ></AutoComplete>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color"
                    label="TATA AIG is empaneled?"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Radio.Group
                      name="radiogroup"
                      onChange={(e) =>
                        setFormItem((res) => ({
                          ...res,
                          empaneled: e.target.value,
                        }))
                      }
                      value={formItem.empaneled}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color"
                    name="client_location"
                    label="Client Location"
                    style={{ marginBottom: "1rem" }}
                  >
                    <AutoComplete
                      placeholder="Select"
                      options={clienLocArr}
                      value={formItem.clientLocation}
                      onChange={(val, data) => clientLocationChange(val, data)}
                      // onSelect={(val, data) => onSelectIndustry(val, data)}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    ></AutoComplete>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color"
                    name="client_zone"
                    label="Zone"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="Enter zone"
                      value={formItem.clientZone}
                      disabled={true}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          clientZone: val.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="cancel_btn"
                      onClick={() => props.setShowVasModal(false)}
                      size="large"
                    >
                      <p className="cancel_txt">Cancel</p>
                    </Button>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="submit_btn"
                      htmlType="submit"
                      size="large"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              {/* </Col> */}
            </Col>
          </Row>
        </Form>
        {/* </div> */}
      </Modal>
      <TodoTab
        button={"Create"}
        companyID={company_id}
        company_Name={formItem.companyName}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
});

export default NewLead;
