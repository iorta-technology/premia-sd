import React, { useState } from "react";
import "../components/Login/Login.css";
import {
  Card,
  Input,
  Button,
  Image,
  Form,
  message,
  Row,
  Col,
  Radio,
} from "antd";
// "../../images/salesDrivelogo.png";
import loginLogo from "../images/salesDrivelogo.png";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../axios-request/request.methods";
import * as actions from "../store/actions/index";
import { useHistory } from "react-router";
import { stoageGetter } from "../helpers";

function Multichannel() {
  const dispatch = useDispatch();
  const history = useHistory();
  const _store = useSelector((state) => state);
  const bankData = _store?.login?.multiChannel
    ? _store?.login?.multiChannel
    : stoageGetter("multi_channel");
  // console.warn("STORE DATA----------", bankData);
  // console.warn("STORE DATA-----LOCALL-----", stoageGetter('multi_channel'));

  const [bankID, setBankID] = useState(_store.login.user.channelCode._id);

  const onValueChange = (event) => {
    console.log("🚀 ~ file: Multichannel.js:37 ~ onValueChange ~ onValueChange:", event)
    setBankID(event);
  };
  

  const proceedData = async () => {
    try {
      let res = await axiosRequest.get(
        `user/switchChannel?switchingChannelCode=${bankID}`,
        { secure: true }
      );

      console.log("res.TOKEN ================ ", res);
      if (res.length !== 0) {
        let _loginData = [];
        let _defaultChannel = bankData.filter(
          (item, index) => item.channelCode._id === bankID
        );
        _loginData.push(_defaultChannel, { token: res.TOKEN });
        console.log("_loginData ================ ", _loginData);
        dispatch(actions.loginSuccess(_loginData));
        history.push("/home");
      }else{
        history.push("/home");
      }
    } catch (error) {
      console.log("error API " + error);
    }
  };

  return (
    <div className="main">
      <div className="login-card">
        <Card className="main-card">
          <div className="logo">
            <Image
                preview={false}
                width={210}
                src={loginLogo}
                alt="login-logo"
              />
          </div>
          <br />
          <br />
          {bankData.map((item, index) => (
            <div className="card-list" key={index}>
              <Card
                style={{
                  backgroundColor:item.channelCode._id !== bankID ? "#fff" : "rgb(228, 106, 37)",
                  marginBottom: "17px",
                }}
                bordered={false}
                onClick={()=>onValueChange(item?.channelCode?._id)}
              >
                <Row style={{ padding: "5px" }}>
                  <Col span={22}>
                    <h6 style={{ color: item.channelCode._id !== bankID ? "#000" : "#fff" }}>
                      {item.channelCode.channelName}
                    </h6>
                  </Col>
                  <Col span={2}>
                    <Radio
                      value={item.channelCode._id}
                      checked={item.channelCode._id === bankID}
                      //   checked={true}
                      name="bankData"
                      onChange={(event)=>onValueChange(event.target.value)}
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
          <Button
            type="primary"
            htmlType="submit"
            className="loginbtn"
            block
            style={{ fontWeight: "bold", marginTop: 10 }}
            onClick={proceedData}
          >
            Proceed
          </Button>
        </Card>
      </div>

      <div style={{ marginTop: 150, color: "#D4D4D4" }}>
        <p>Privacy Policy Terms and Conditions</p>
      </div>
      <div style={{ color: "#D4D4D4" }}>
        <p>© 2018 Iorta Technology v.1.0</p>
      </div>
    </div>
  );
}

export default Multichannel;
