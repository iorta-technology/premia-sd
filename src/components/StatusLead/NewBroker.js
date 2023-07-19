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
  const [company_id, setCompany_id] = useState("");
  const [producerListArr, setProducerListArr] = useState([]);
  const [formItem, setFormItem] = useState({
    producerName: "Select",
    brokerCity: '',
    walletSize: "",
  });

  const login_city = useSelector((state) => state?.login?.user?.city);
  console.log("🚀 ~ file: NewBroker.js:49 ~ NewLead ~ login_city:", login_city)


  useEffect(() => {
    setFormItem((res) => ({ ...res, brokerCity: login_city }));
    form.setFieldsValue({ broker_city: login_city });
    getProducerList()
  }, []);

  const getProducerList = async () => {
    let result = await axiosRequest.get(`user/getproducer`, {secure: true });
    // console.log('getLocationDetails-------',result)
    console.log("🚀 ~ file: NewBroker.js:55 ~ getProducerList ~ result:", result)
    let _producer = [];

    result[0]?.producer.map((el) => {
      let _data = { label: el, value: el };
      _producer.push(_data);
    });
    setProducerListArr(_producer);
  };

 
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);


  const submitBrokerData = async () => {
    let payload = {
      producer_name: formItem.producerName,
      city: formItem.brokerCity,
      wallet_size: formItem.walletSize
    }
    if (formItem.producerName === "") {
      return message.warning("Producer Name is required");
    }else if (formItem.brokerCity === "") {
      return message.warning("Broker City is required");

    }else if (formItem.walletSize === "") {
      return message.warning("Wallet Size is required");

    }else{
      await axiosRequest.post(`user/addproducer`,payload,{ secure: true });
      closeBrokerModal()
    }
    
  };

  const onProducerChange = (event, data) => {
    // console.log('event--------->>>>',event)
    // console.log('data--------->>>>',data)
    setFormItem((res) => ({ ...res, producerName: event }));
    form.setFieldsValue({ producer_name: event });
  };

  const closeBrokerModal = (event) => {
    props.setShowBrokerModal(false)
    setCompany_id('');
    setFormItem((res) => ({ 
      ...res,
      producerName: "",
      brokerCity: '',
      walletSize: "",
    }));

    form.setFieldsValue({
      producer_name: '',
      broker_city: null,
      wallet_size: "",
    });
  }


  return (
    <>
      <Modal
        title="Add Producer"
        centered={true}
        visible={props.showBrokerModal}
        width={700}
        className="modalStyle"
        onCancel={() => closeBrokerModal()}
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
                    className="form-item-name txt_color"
                    name="producer_name"
                    label="Producer Name"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      placeholder="Select"
                      options={producerListArr}
                      value={formItem.producerName}
                      onChange={(val, data) => onProducerChange(val, data)}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color"
                    name="broker_city"
                    label="City"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="Enter City"
                      value={formItem.brokerCity}
                      disabled={true}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          brokerCity: val.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name txt_color"
                    name="wallet_size"
                    label="Wallet Size"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="Enter Wallet Size"
                      value={formItem.walletSize}
                      disabled={false}
                      onChange={(val) =>
                        setFormItem((res) => ({
                          ...res,
                          walletSize: val.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>

              </Row>
              <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                  <Button size='large' onClick={()=> closeBrokerModal()} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                  <Button size='large' onClick={()=> submitBrokerData()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Submit</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    
    </>
  );
});

export default NewLead;
