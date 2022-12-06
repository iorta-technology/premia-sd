import {
  Tabs,
  Col,
  Form,
  Row,
  Carousel,
  Image,
  Typography,
  Divider,
  Descriptions,
  Modal,
} from "antd";

import { FileDoneOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useDebugValue, useState, useEffect } from "react";
import { Card, Select } from "antd";
import { Button } from "antd";
import "./ResourceCenter.css";
// import './SalesPitch.css';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  withRouter,
} from "react-router-dom";
import { Alert } from "antd";
import video from "./video.mp4";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  ShareAltOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import VideoPlayer from "react-video-js-player";
import MainTabs from "../../components/MainTabs/MainTabs";
import MTabs from "../../components/Tab/Tab";
import menu from "../../assets/menu-resource.png";
import resourcereset from "../../assets/resourcereset.png";
import content from "../../assets/contentback.png";
import mainimg from "../../assets/1a7da86d83ebe30862d8ea221384817848118054.jpg";
import rightarw from "../../assets/rightarrow.png";
import shareit from "../../assets/shareit.png";
import viewicon from "../../assets/viewicon.png";
import actionNoData from "../../assets/Actionnodata.png";
import axiosRequest from "../../axios-request/request.methods";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { getImage } from "@antv/l7plot/dist/lib/core/map/register";
const { Meta } = Card;
const tabMenu = [
  {
    id: "marketing",
    value: "Marketing",
  },
  {
    id: "insurance",
    value: "Insurance",
  },
];
const { Option } = Select;
const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const { Title } = Typography;
const ResourceCenter = () => {
  const dispatch = useDispatch();
  dispatch(actions.headerName("Resource Center"));
  let _store = useSelector((state) => state.login.user);
  console.log("_store", _store.channelCode.channelCode);
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
  const [tabs, setTabs] = useState([]);
  const [showmore, setShowMore] = useState(false);
  const [tabswitch, setTabSwitch] = useState(false);
  const [tagSwitch, setTagSwitch] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [type, setType] = useState("all");
  const [productData, SetProductData] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [activeTabName, setActiveTabName] = useState("");
  const [mailSendTo, setMailSendTo] = useState(_store.primaryEmail);
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const videoSrc = video;
  const poster = "video.mp4";

  useEffect(() => {
    typeData();
  }, [type]);

  useEffect(() => {
    getData();
  }, [activeId]);

  useEffect(() => {
    tagSwitchfun();
  }, [tagSwitch, tabswitch, activeId]);

  useEffect(() => {
    axiosRequest
      .get(
        `admin/fetch_resource_category?filter=1&userId=${_store.id}&channel_code=${_store.channelCode.channelCode}&role_code=${_store.roleCode}`,
        { secure: true }
      )
      .then((res) => {
        SetProductData(res);
        setActiveId(res[0]?._id);
        setActiveTabName(res[0]?.ResourceCenterName);
        console.log("res[0]._id", res);
      })
      .catch((err) => console.log(err));

    axiosRequest
      .get(`admin/get_all_tags`, { secure: true })
      .then((res) => setTabs(res))
      .catch((err) => console.log(err));
  }, []);

  const getData = () => {
    activeId &&
      axiosRequest
        .get(
          `admin/fetch_resources?channel_code=${_store.channelCode.channelCode}&role_code=${_store.roleCode}&filter=1&filter_by=${activeId}&skip=0`,
          { secure: true }
        )
        .then((res) => {
          setCurrentData(res[0]);
          console.log("res", res[0]);
        })
        .catch((err) => console.log(err));
  };

  const tagSwitchfun = () => {
    activeId &&
      axiosRequest
        .get(
          `admin/fetch_resources?channel_code=${_store.channelCode.channelCode}&role_code=${_store.roleCode}&filter_by=${activeId}&filter=1&tagName=${tagSwitch}&skip=0`, // filter_by
          { secure: true }
        )
        .then((res) => setCurrentData(res[0]))
        .catch((err) => console.log(err));
  };

  const typeData = async () => {
    if (type === "all") {
      tagSwitchfun();
    } else {
      activeId &&
        axiosRequest
          .get(
            `admin/fetch_resources?channel_code=${_store.channelCode.channelCode}&role_code=${_store.roleCode}&filter_by=${activeId}&filter=1&tagName=${tagSwitch}&filterByMediaCategory=${type}&skip=0`,
            { secure: true }
          )
          .then((res) => setCurrentData(res[0]))
          .catch((err) => console.log(err));
    }
  };

  const resetDataFilter = () => {
    setTagSwitch("");
    setType("all");
  };

  const getImage = (type) => {
    if (type === "articles")
      return {
        backgroundImage:
          'url("https://pocbanca.iorta.in/assets/Group19132x.png")',
      };

    if (type === "pdf")
      return {
        backgroundImage:
          'url("https://pocbanca.iorta.in/assets/Group19112x.png")',
      };

    if (type === "video")
      return {
        backgroundImage:
          'url("https://pocbanca.iorta.in/assets/Group19122x.png")',
      };

    return {
      backgroundImage:
        'url("https://pocbanca.iorta.in/assets/Group19142x.png")',
    };
  };

  const [imageModel, setImageModel] = useState(false);
  const [videoModel, setVideoModel] = useState(false);
  const [articleModel, setArticleModel] = useState(false);
  const [currentImageAndData, setCurrentImageAndData] = useState("");

  const setCurrentTriggerData = (data) => {
    console.log(data);
    setCurrentImageAndData(data);
    if (data.contentCategory === "infographic") {
      setImageModel(true);
    } else if (data.contentCategory === "videos") {
      console.log("data==", data?.mediaFiles[0]?.location);
      setVideoModel(true);
    } else if (data.contentCategory === "articles") {
      setArticleModel(true);
    } else if (data.contentCategory === "pdf") {
      window.open(data.thumbnail, "_blank");
    }
    console.log("data", data);
  };

  return (
    <>
      <Modal
        centered
        visible={videoModel}
        onOk={() => setVideoModel(false)}
        onCancel={() => setVideoModel(false)}
        footer={<div />}
      >
        <video width="100%" height="500px" controls>
          <source
            src={
              currentImageAndData &&
              currentImageAndData?.mediaFiles[0] &&
              currentImageAndData?.mediaFiles[0]?.location
            }
            type="video/mp4"
          />
        </video>
      </Modal>

      <Modal
        centered
        visible={imageModel}
        onOk={() => setImageModel(false)}
        onCancel={() => setImageModel(false)}
        footer={<div />}
      >
        <img
          width="100%"
          alt="example"
          className="card_img"
          src={currentImageAndData.thumbnail}
        />
      </Modal>
      <Modal
        className="article_modal"
        centered
        visible={articleModel}
        onOk={() => setArticleModel(false)}
        onCancel={() => setArticleModel(false)}
        footer={<div />}
      >
        <h4 style={{ fontSize: "large", fontWeight: "600" }}>Article</h4>
        <div className="article_content">
          <img
            width="100%"
            alt="example"
            className="card_img"
            src={currentImageAndData.thumbnail}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <FileDoneOutlined />
            {" " + moment(currentImageAndData.created_date).format("LLLL")}
          </div>
          <hr />
          <div>{currentImageAndData.content}</div>
          <br />
          <div style={{ marginBottom: "5px" }}>
            <b>Tags</b>
          </div>
          <div>
            {currentImageAndData.tags &&
              currentImageAndData.tags.length > 0 &&
              currentImageAndData.tags.map((res) => (
                <button
                  style={{
                    border: "none",
                    color: "#fff",
                    backgroundColor: "#1fb3ab",
                    outline: "none",
                    marginRight: 10,
                    padding: "1px 8px",
                    borderRadius: "2px",
                  }}
                >
                  {res}
                </button>
              ))}
          </div>
        </div>
      </Modal>

      {width > "600" ? (
        <div className="header">
          <Row>
            <Col>
              <p className="product-title">Resource Center</p>
            </Col>
          </Row>
          <div>
            <Row className="tabs resourceCenter primaryBtn">
              {productData?.map((item) => (
                <Col key={item._id} style={{ marginRight: 15 }}>
                  <Button
                    className={`resourceCenter primaryBtn ${
                      item._id === activeId && "top-tab-header-active"
                    }`}
                    onClick={() => {
                      setActiveId(item._id);
                      setActiveTabName(item.ResourceCenterName);
                    }}
                  >
                    {item.ResourceCenterName}
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ) : (
        <Tabs defaultActiveKey={activeId} onChange={(key) => setActiveId(key)}>
          {productData?.map((item) => (
            <Tabs.TabPane tab={item.ResourceCenterName} key={item._id} />
          ))}
        </Tabs>
      )}

      <div>
        <Row>
          <Col
            lg={7}
            md={24}
            sm={24}
            xs={24}
            style={{ backgroundColor: "fff" }}
          >
            <Card
              style={{
                padding: 15,
                margin: 10,
                boxShadow: "2px 3px 6px rgb(0 0 0 / 9%)",
                border: "0.5px solid #e7edf5",
              }}
              className="sideBar"
            >
              <Row>
                <Col span={22}>
                  <p
                    style={{
                      color: "rgb(0, 172, 193)",
                      fontSize: 12,
                      fontWeight: "bold",
                      marginTop: 5,
                    }}
                  >
                    #Tags
                  </p>
                </Col>
                <Col span={2}>
                  <img
                    onClick={resetDataFilter}
                    src={resourcereset}
                    style={{ height: 25, width: 25, cursor: "pointer" }}
                  />
                </Col>
              </Row>
              <hr style={{ marginTop: 5 }} />
              <Row>
                {tabs?.map((res) => (
                  <div>
                    <button
                      style={{
                        borderColor: "#C1C8CC",
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 3,
                        marginRight: 5,
                        marginBottom: 5,
                      }}
                      className={tagSwitch === res.name ? "active" : "inactive"}
                      onClick={() => setTagSwitch(res.name)}
                    >
                      {res.name}
                    </button>
                  </div>
                ))}

                {/* <div>
                  <button
                    style={{
                      borderColor: "#C1C8CC",
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 3,
                      marginLeft: 10,
                    }}
                    className={
                      tagSwitch === "marketing" ? "active" : "inactive"
                    }
                    onClick={() => setTagSwitch("marketing")}
                  >
                    Marketing
                  </button>
                </div> */}
              </Row>
              <div style={{ marginTop: 30, marginBottom: 10, color: "black" }}>
                <p style={{ fontSize: 14, fontWeight: "bold" }}>Content Type</p>
              </div>

              <div className="options">
                <Row>
                  <button
                    style={{
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderRadius: 0,
                      padding: 5,
                      width: "100%",
                      marginTop: 5,
                      textAlign: "left",
                      paddingLeft: 10,
                    }}
                    className={type === "all" ? "dropactive" : "dropinactive"}
                    onClick={() => setType("all")}
                  >
                    All
                  </button>
                </Row>
                <Row>
                  <button
                    style={{
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderRadius: 0,
                      padding: 5,
                      width: "100%",
                      marginTop: 5,
                      textAlign: "left",
                      paddingLeft: 10,
                    }}
                    className={type === "video" ? "dropactive" : "dropinactive"}
                    onClick={() => setType("video")}
                  >
                    Videos
                  </button>
                </Row>
                <Row>
                  <button
                    style={{
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderRadius: 0,
                      padding: 5,
                      width: "100%",
                      marginTop: 5,
                      textAlign: "left",
                      paddingLeft: 10,
                    }}
                    className={type === "pdf" ? "dropactive" : "dropinactive"}
                    onClick={() => setType("pdf")}
                  >
                    PDF
                  </button>
                </Row>
                <Row>
                  <button
                    style={{
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderRadius: 0,
                      padding: 5,
                      width: "100%",
                      marginTop: 5,
                      textAlign: "left",
                      paddingLeft: 10,
                    }}
                    className={
                      type === "articles" ? "dropactive" : "dropinactive"
                    }
                    onClick={() => setType("articles")}
                  >
                    Articles
                  </button>
                </Row>
                <Row>
                  <button
                    style={{
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderRadius: 0,
                      padding: 5,
                      width: "100%",
                      marginTop: 5,
                      textAlign: "left",
                      paddingLeft: 10,
                    }}
                    className={
                      type === "infographic" ? "dropactive" : "dropinactive"
                    }
                    onClick={() => setType("infographic")}
                  >
                    Infographic
                  </button>
                </Row>
              </div>
              <div className="dropdown">
                <Select
                  defaultValue={type}
                  value={type}
                  onChange={(e) => {
                    console.log("Change event called!", e);
                    setType(e);
                  }}
                  style={{ width: "100% " }}
                >
                  <Option value="all">All</Option>
                  <Option value="video">Videos</Option>
                  <Option value="pdf">PDF</Option>
                  <Option value="article">Articles</Option>
                  <Option value="infographic">Infographic</Option>
                </Select>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24} sm={24} xs={24}>
            <Card
              style={{
                margin: 10,
                boxShadow: "2px 3px 6px rgb(0 0 0 / 9%)",
                border: "0.5px solid #e7edf5",
              }}
              className="contentMain"
            >
              <Row
                style={{
                  marginTop: 20,
                  backgroundImage: `url(${content})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Col span={22}>
                  <p
                    style={{
                      color: "rgb(0, 172, 193)",
                      fontSize: 20,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {activeTabName}
                  </p>
                </Col>
                <Col span={2}>
                  <Row style={{ padding: 5 }}>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>All</p>
                    <img
                      src={menu}
                      style={{
                        height: 15,
                        width: 15,
                        marginLeft: 5,
                        marginTop: 5,
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <hr />
              <Row
                style={{ margin: 0 }}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              >
                {currentData && currentData.length > 0 ? (
                  <Col className="maincard gutter-row">
                    {currentData?.map((res, index) => (
                      <Card
                        hoverable
                        style={{
                          width: 280,
                          marginBottom: "10px",
                          margin: "5px",
                          overflow: "hidden",
                          position: "relative",
                        }}
                        className="card_body"
                        cover={
                          <img
                            alt="example"
                            className="card_img"
                            src={res.thumbnail}
                          />
                        }
                      >
                        <a href={"mailto:" + mailSendTo}>
                          <ShareAltOutlined className="share_button" />
                        </a>
                        {/* contentCategory */}
                        <div
                          style={getImage(res.contentCategory)}
                          className="center_icon"
                          onClick={() => {
                            setCurrentTriggerData(res);
                          }}
                        ></div>

                        <div style={{ width: "100%" }}>
                          <div className="Body_text">
                            <p>{res.title}</p>
                          </div>
                          <div className="Body_text2">
                            <p>{res.contentCategory}</p>
                          </div>
                          <div style={{ padding: "6px" }}>
                            {res.contentCategory !== "pdf" ? (
                              <button
                                onClick={() => setCurrentTriggerData(res)}
                                type="button"
                                className="cardbutton block"
                              >
                                View Now
                              </button>
                            ) : (
                              <button
                                onClick={() => setCurrentTriggerData(res)}
                                type="button"
                                className="cardbutton block"
                              >
                                Download Now
                              </button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </Col>
                ) : (
                  <Card className="card" style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img src={actionNoData} />
                      <p
                        style={{
                          fontFamily: "roboto",
                          fontWeight: 600,
                          color: "#01b4bb",
                          fontSize: "22px",
                        }}
                      >
                        No Records Found!
                      </p>
                    </div>
                  </Card>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ResourceCenter;
