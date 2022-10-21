import React, { useState, useEffect } from "react";
import "./LoanProducts.css";
import {
  Row,
  Col,
  Button,
  Card,
  Carousel,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  ShareAltOutlined,
  DownloadOutlined,
  PlusCircleFilled,
  MailOutlined,
  CloseOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Tabs, Alert } from "antd";
// import axios from '../../axios-common';
import { map } from "lodash";
import moment from "moment";
import Brocher from "../../images/brochrewhite.png";
import MTabs from "../../components/Tab/Tab";
import axiosRequest from "../../axios-request/request.methods";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import Pagination from "../Activitity Tracker/Pagenation/Pagenation";
import axios from "axios";
import { stoageGetter } from "../../helpers";
import { useSelector } from "react-redux";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import shareIt from "../../assets/shareit.png";
import { fontStyle } from "@mui/system";
import browimg from "../../assets/brochrewhite.png";

const LoanProducts = () => {
  const contentStyle = {
    height: "200px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    // background:'#fff',
    // color:'black'
  };
  const [productData, SetProductData] = useState([]);
  const [productTabs, SetProductTabs] = useState([]);
  const [activeId, SetActiveId] = useState(null);
  const [finaltabdata, setFinalTabData] = useState({});
  const login_user_data = stoageGetter("user");
  const _storeData = useSelector((state) => state?.login?.token);
  // console.warn("_storeData _storeData", _storeData);

  useEffect(() => {
    // console.warn("login_user_data___________ login_user_data", login_user_data);
    let _channel = login_user_data.channelCode._id;
    // https://abinsurancenode.salesdrive.app/sdx-api/secure/admin/getprodCategory?filter=0
    axios
      .get(
        `https://abinsurancenode.salesdrive.app/sdx-api/secure/admin/getprodCategory?filter=23&channel=${_channel}`,
        {
          headers: {
            Authorization: `Bearer ${_storeData}`,
          },
        }
      )
      .then((resp) => {
        console.warn("getprodCategory ____APIIIIII", resp);
        if (resp.data.errCode === -1) {
          const producttData = resp?.data?.errMsg;
          SetProductData(producttData);
          topBtnClickHandler(producttData[0]);
          SetActiveId(producttData[0]?._id);
          console.log("response", resp);
          let finaltab = [];

          for (let i = 0; i < producttData.length; i++) {
            console.log(producttData, "product data----->");
            let objdata = {
              id: producttData[i]._id,
              value: producttData[i].productCategoryName,
            };

            finaltab.push(objdata);
          }
          console.log(finaltab, "final ---->");
        } else {
          message.error(resp.data.errMsg);
          SetProductData([]);
        }
      }, [])
      .catch((error) => {
        console.log("CATEGORYYYY___ERROR", productData);
      });
    axios
      .get(
        `https://abinsurancenode.salesdrive.app/sdx-api/secure/user/getLead/${login_user_data.id}?leadfilter=all`,
        {
          headers: {
            Authorization: `Bearer ${_storeData}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.errMsg);
        setBenefitIllustratorArr(res.data.errMsg);
      });

    //     {productData?.map(item =>(
    //         let objdata={
    //             id: productData[item]._id,
    //             value: productData[item].productCategoryName,
    //         }

    //     ))
    // }
    if (productData) {
    }

    // const tabMenu = [
    //    ...objdata,
    // Tabs
    // ]
  }, []);


  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [sdata,SetSdata] = useState([])
 
  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const [benefitIllustratorArr, setBenefitIllustratorArr] = useState([]);
  const topBtnClickHandler = (item) => {
    console.log(item);
    SetActiveId(item._id);
    axios
      .get(
        `https://abinsurancenode.salesdrive.app/sdx-api/secure/user/getproduct/?productType=${item._id}&roleCode=SM1`,
        {
          headers: {
            Authorization: `Bearer ${_storeData}`,
          },
        }
      )
      .then((resp) => {
        console.log("PRODUCTTTT____APIIIIII =================== ", resp.data.errMsg[0].productBrochure);
       // SetSdata(resp.data.errMsg[0].productBrochure)
        
        const productTabs = resp?.data?.errMsg;
        SetProductTabs(productTabs);
        console.log("sdataaa0000======", productTabs)
      }, [])
      .catch((error) => {
        console.log(error);
      });
  };
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [isDisplayVisible, setIsDisplayModalVisible] = useState(false);
  const [isPassingData, setIsPassingData] = useState();
  const [benefitillArr, setBIArr] = useState();
  const [buttonValue, setButtonValue] = useState();

  ////---Pagination---start-----------///////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = benefitIllustratorArr.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  console.log(benefitIllustratorArr.length / postPerPage);
  const paginate = (page) => setCurrentPage(page);
  // const onChange=(page)=> paginate(page);
  /////////-=--------pagination finished-----------/////////////
  const showModal = () => {
    setIsJoinModalVisible(true);
  };
  const SelectedButtonFunc = (value) => {
    setBIArr(value);
    console.log(value);
  };
  const handleOk = () => {
    setIsJoinModalVisible(false);
  };
  const handleCancel = () => {
    setIsJoinModalVisible(false);
  };
  const truncateString = (string, limit) => {
    var dots = "...";
    if (string.length > limit) string = string.substring(0, limit) + dots;
    return string;
  };

  let { innerWidth: width, innerHeight: height } = window;
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
  console.log("productData", productData);

  const [data, setData] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    console.log("dataatat---", data);
    if (data) {
      setList((oldData) => [...oldData, data]);
      setData("");
    } else {
      message.error("Please add an e-mail first");
    }
    e.preventDefault();
  };

  const handleDelete = (id) => {
    setList((oldData) => oldData.filter((elem, index) => index !== id));
  };

  const [selectedData, setSelectedData] = useState([])
  const selecteDataFun =(value) =>{
    setSelectedData(res => [...res,value])
  }

  const changeTabfun =(e) => {
    //  sdata
     for(var i=0; i<productTabs.length; i++){
         console.log(e == productTabs[i]._id, productTabs[i])
         if(e == productTabs[i]._id){
            SetSdata(productTabs[i].productBrochure);
         }
     }
  }
  

  const handleOk1 = async () => {
  // setIsModalVisible1(false);
   // message.error('Please, Select a Brochure and add an E-mail')
   let dataaa = 
   {
     Product_Brochure_data:selectedData.map(res => res.location),
     product_name:selectedData.map(res => res.fileCategory ),
     sendto: list
   }
   
   try {
    let res = await axiosRequest.post(`user/send_email_brochure`, dataaa );
        if (res.mailgunres.message === 'Queued. Thank you.') {
          message.success('Queued. Thank you.')
        }
    } catch (error) {
      console.log("error API " + error);
    }
  };


  return (
    <>
      {/* <div className='product-content'> */}
      <div className="header-loan-prod">
        <Row>
          <Col>
            <p className="product-title-loan">Products</p>
          </Col>
        </Row>
        <div>
          <Row className="tabs-loan">
            {productData?.map((item) => (
              <Col style={{ marginRight: 15 }}>
                <Button
                  className={`primaryBtnLoan ${
                    item._id === activeId && "top-tab-header-active-loan"
                  }`}
                  onClick={topBtnClickHandler.bind(this, item)}
                >
                  {item.productCategoryName}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {/* <div className='product-content'> */}
      {productData.length > 0 ? (
        <div className="loan-product-tabs">
          <Col gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }}>
            <Tabs type="card" tabPosition={tabPosition} onChange={changeTabfun}>
              {productTabs.map((item,index) => {
                return (
                  <TabPane
                    tab={item.productName}
                    key={item._id}
                    className="MainContent"
                  >
                    <Col
                      className="gutter-row first-card"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <div>
                        <div className="main-card2" bordered={false}>
                          <div
                            className="benefit-main"
                            
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              height: "70px",
                            }}
                          >
                            <h1
                              style={{
                                color: "#5EA5C0",
                                textTransform: "capitalize",
                              }}
                              className="benefit-head"
                              
                            >
                              {item.productName}
                            </h1>
                            {/* <Button
                              className="benefit-btn"
                              style={{
                                backgroundColor: "transparent",
                                fontWeight: "bold",
                                border: "1px solid #5EA5C0",
                                borderRadius: "10px",
                              }}
                              onClick={showModal}
                            >
                              Benefit Illustration
                            </Button> */}
                            {/* <Modal
                              className="Clubsmaster-modal-style"
                              title="Select the proposer"
                              visible={isJoinModalVisible}
                              onOk={handleOk}
                              footer={[
                                <Button
                                  type="primary"
                                  className="bi-cancelbtn"
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </Button>,
                                <Link
                                  to={{
                                    pathname: "/master/benefitillustrator",
                                    state: { recorddata: benefitIllustratorArr },
                                  }}
                                  className="link-btn"
                                >
                                  Proceed
                                </Link>,
                              ]}
                              width="50%"
                              bodyStyle={{
                                height: "auto",
                              }}
                            >
                              <Form.Item
                                name="username"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please input your username!",
                                  },
                                ]}
                              >
                                <Input type="text" placeholder="Search Here" />
                              </Form.Item>

                              <table className="LoanProducts-Table">
                                <tr>
                                  <th className="table-heading1">Action</th>
                                  <th className="table-heading2">Lead ID</th>
                                  <th className="table-heading2">Name</th>
                                  <th className="table-heading2">Mobile</th>
                                  <th className="table-heading2">Created Date</th>
                                </tr>
                                {currentPost.map((item) => {
                                  return (
                                    <tr
                                      style={{ padding: "10px" }}
                                      className="tableBorder"
                                      key={item._id}
                                    >
                                      <td>
                                        <Button
                                          size="small"
                                          className="select-btn"
                                          onClick={() => SelectedButtonFunc(item)}
                                        >
                                          Select
                                        </Button>
                                      </td>
                                      <td className="table-subdata">
                                        {item.lead_Id}
                                      </td>
                                      <td className="table-subdata">
                                        {item.firstName + " " + item.lastName}
                                      </td>
                                      <td className="table-subdata">
                                        {item.primaryMobile}
                                      </td>
                                      <td className="table-subdata">
                                        {moment(item.created_date).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </table>
                              <Pagination
                                className="Clubsmaster-modal-style-Table-Pagination"
                                defaultCurrent={1}
                                postPerPage={postPerPage}
                                paginate={paginate}
                                total={benefitIllustratorArr.length}
                                totalPost={
                                  benefitIllustratorArr.length / postPerPage
                                }
                              />
                            </Modal> */}
                          </div>
                          <p className="product-para">
                            {item.productDescription}
                          </p>
                          <h4
                            style={{ color: "#5EA5C0" }}
                            className="product_heading"
                          >
                            5 Reasons to buy:
                          </h4>
                          <div style={{ marginTop: 10 }}>
                            <p>
                              <span className="slNo circle-point">1</span>
                              <span className="bullet-points">
                                {item.productReasons.reason1}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">2</span>
                              <span className="bullet-points">
                                {item.productReasons.reason2}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">3</span>
                              <span className="bullet-points">
                                {item.productReasons.reason3}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">4</span>
                              <span className="bullet-points">
                                {item.productReasons.reason4}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">5</span>
                              <span className="bullet-points">
                                {item.productReasons.reason5}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col
                      className="gutter-row  first-card"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <div className="main-card3" bordered={false}>
                        <div className="share_button1">
                          <img src={shareIt} onClick={showModal1} />
                        </div>
                        <h4
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.imageTitle}
                        </h4>

                        {/* <span onClick={showModal} style={{ margin: '150px 150px 0px 0px', borderRadius: '50px', padding: '8px', color: '#00ACC1', cursor: 'pointer' }}><ShareAltOutlined /></span> */}
                        <Carousel style={{ marginTop: 12 }} autoplay={true}>
                          {item.productImages.map((item) => {
                            return (
                              <div style={contentStyle}>
                                <img
                                  src={item.location}
                                  style={{ margin: "auto" }}
                                  height="190px"
                                  width="145px"
                                />
                              </div>
                            );
                          })}
                        </Carousel>
                        <div
                          className="product-brochure"
                          style={{ marginTop: 20 }}
                        >
                          {item.productBrochure.map((item) => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    color: "#454F63",
                                    marginBottom: 5,
                                  }}
                                >
                                  {truncateString(
                                    item.fileCategory === ""
                                      ? "-"
                                      : item.fileCategory,
                                    12
                                  )}
                                </p>
                                <img
                                  src={Brocher}
                                  height="100px"
                                  width="90px"
                                ></img>
                                <Button
                                  size="small"
                                  style={{
                                    backgroundColor: "#5EA5C0",
                                    width: "100%",
                                    color: "#fff",
                                    border: "1px solid #5EA5C0",
                                    borderRadius: "20px",
                                  }}
                                >
                                  <a href={item.location} download>
                                    <DownloadOutlined /> English
                                  </a>
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  </TabPane>
                );
              })}
            </Tabs>
          </Col>
        </div>
      ) : (
        <NoRecordsFound />
      )}
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you wish to send payment link to the customer?</p>
      </Modal>
      {/* </div> */}

      <Modal
        title="Share Product Brochure"
        visible={isModalVisible1}
        // onOk={handleOk1}
        // onCancel={handleCancel1}
        width={800}
        footer={[
          <Button className="send" type="submit" onClick={handleOk1} key="1">
            <MailOutlined /> send
          </Button>,
          <Button className="cancle" onClick={handleCancel1} key="2">
            <CloseOutlined /> Cancel
          </Button>,
        ]}
        closable={false}
        className="modalStyle"
      >
        <form>
        <Row gutter={16} >
          <Col style={{
                display: "flex",}}>
          {
            sdata?.map((brodata, index) => (
              <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginRight: "10px"
                
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  color: "#454F63",
                  marginBottom: 5,
                }}
              >
                {
                  brodata.fileCategory === "" ? "-" : brodata.fileCategory }
                
              </p>
              <img onClick={() => selecteDataFun(brodata)} src={Brocher} height="100px" width="90px" className="broimg" />
              <p
                style={{
                  color: "#5EA5C0",
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "700",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {brodata.language}
              </p>
            </div>
            ))
          }
            
          </Col>
        </Row>
        {(sdata && sdata?.length > 0) ? <Row gutter={16}>
            
            <Col>
              <Input
                className="inp"
                placeholder="E-Mail ID"
                value={data}
                type='email'
                onChange={(e) => setData(e.target.value)}
              />
            </Col>
            <Col>
              <button onClick={(e) => handleSubmit(e)} className="button_calss">
                Add <PlusCircleFilled />
              </button>
            </Col>
          </Row> : <p className="product_data">No Product Brochure Found</p> }

          

          <Row>
            <div className="disply">
              {list?.map((item, id) => (
                <div key={id} className="listData">
                  <span>{item} </span>{" "}
                  <button
                    className="delet_btn"
                    onClick={() => handleDelete(id)}
                  >
                    X
                  </button>
                </div>
              ))}{" "}
            </div>
          </Row>
        </form>
      </Modal>
    </>
  );
};

export default LoanProducts;
