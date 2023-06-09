import React, { useState, useEffect, createRef, useRef } from "react";
import "./StatusLead.css";
// import { industryDataArr } from "./dataSet";
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
  const [cityZoneList, setCityZoneList] = useState([]);
  const [formItem, setFormItem] = useState({
    companyName: "",
    parentCompanyName: null,
    industry: "",
    empaneled: false,
    clientLocation: "",
    clientZone: "",
  });

  useEffect(() => {
    // let _clientLoc = cityZoneList.map((el) => {
    //   let _data = { label: el.City, value: el.City };
    //   return _data;
    // });
    // setClienLocArr(_clientLoc);
  }, []);

  useEffect(() => {
    getCompanyDetails();
    getIndustryDetails();
    getLocationDetails();
  }, []);

  const getLocationDetails = async (lead_id) => {
    let result = await axiosRequest.get(`admin/getlocationData`, {secure: true });
    // console.log('getLocationDetails-------',result)
    let _locationArr = [];
    setCityZoneList(result)
    result.map((el) => {
      let _data = { label: el.city, value: el.city };
      _locationArr.push(_data);
    });
    setClienLocArr(_locationArr);
  };

  const getIndustryDetails = async (lead_id) => {
    let result = await axiosRequest.get(`admin/getindustryData`, {secure: true });
    // console.log('getIndustryDetails-------',result)
    let _industryArr = [];
    result.map((el) => {
      if(el.industry){
        let _data = { label: el.industry, value: el.industry };
        _industryArr.push(_data);
      }
      
    });
    setIndustryArray(_industryArr);
  };

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
    // setIndustryArray(industryDataArr);
  };

  const onSelectCompany = async (event, data) => {
    setCompany_id(data._id);
    setDisableParentComp(true);
    let result = await axiosRequest.get(`admin/company/companies?company_id=${data._id}`,{ secure: true });

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

  // let updateLeadFormData = {
  //   company_details: {
  //     company_name: formItem.companyName,
  //     parent_company: formItem.parentCompanyName,
  //     industry_name: formItem.industry,
  //     tata_aig_empaneled: formItem.empaneled === true ? "Yes" : "No",
  //     client_location: formItem.clientLocation,
  //     zone: formItem.clientZone,
  //   },
  // };

  const submitCompanyData = async () => {
    if (formItem.companyName === "") {
      return message.warning("Company Name is required");
    }

    if (formItem.industry === "") {
      return message.warning("Industry is required");
    }

    let formData = {
      // company_details: {
        company_name: formItem.companyName,
        parent_company: formItem.parentCompanyName,
        industry_name: formItem.industry,
        tata_aig_empaneled: formItem.empaneled === true ? "Yes" : "No",
        client_location: formItem.clientLocation,
        zone: formItem.clientZone,
      // },
    };

    // console.log('company_id-------->>',company_id); 


    if(company_id){
      let formData = {
        companyDocumentID:company_id
      }
      let result = await axiosRequest.post(`admin/company/create-opportunity`,formData,{ secure: true });
      // console.log('OPPORTUNITY RESP',result)
    }else{
      let result = await axiosRequest.post(`user/company/add-company`,formData,{ secure: true });
      // console.log('COMPANY RESP',result)
    }

    closeCompanyModal()
    

    
  };

  const closeCompanyModal = (event) => {
    props.setShowNewLeadModal(false)
    setCompany_id('');
    setFormItem((res) => ({ 
      ...res,
      companyName: "",
      parentCompanyName: null,
      industry: "",
      empaneled: false,
      clientLocation: "",
      clientZone: "",
    }));

    form.setFieldsValue({
      company_name: '',
      parent_company: null,
      industry: "",
      client_location: "",
      client_zone:'',
    });
    setDisableParentComp(false);
  }

  const clientLocationChange = (event) => {
    setFormItem((res) => ({ ...res, clientLocation: event }));
    form.setFieldsValue({ client_location: event });

    let _zoneData = cityZoneList.filter(
      (el) => el.city.toLowerCase() === event.toLowerCase()
    );
    if (_zoneData.length > 0) {
      setFormItem((res) => ({ ...res, clientZone: _zoneData[0].zone }));
      form.setFieldsValue({ client_zone: _zoneData[0].zone });
    } else {
      setFormItem((res) => ({ ...res, clientZone: "" }));
      form.setFieldsValue({ client_zone: "" });
    }
  };


  return (
    <>
      <Modal
        title="Add New Lead"
        centered={true}
        visible={props.showNewLeadModal}
        width={700}
        className="modalStyle"
        onCancel={() => closeCompanyModal()}
        footer={null}
      >
        <Form form={form}>
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

                <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button size='large' onClick={()=> closeCompanyModal()} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> submitCompanyData()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Submit</Button>
                </div>

                {/* <Col style={{marginTop:20}} xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="cancel_btn"
                      onClick={() => props.setShowNewLeadModal(false)}
                      size="large"
                    >
                      <p className="cancel_txt">Cancel</p>
                    </Button>
                  </Form.Item>
                </Col>

                <Col style={{marginTop:20}} xs={24} sm={12} md={24} lg={12} xl={12}>
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
                </Col> */}
              </Row>
              {/* </Col> */}
            </Col>
          </Row>
        </Form>
        {/* </div> */}
      </Modal>
    
    </>
  );
});

export default NewLead;
