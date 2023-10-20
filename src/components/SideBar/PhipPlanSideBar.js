import { CloseOutlined } from "@ant-design/icons";
import { style } from "@mui/system";
import { Drawer } from "antd";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./PhilSideBar.css";
const PhipPlanSideBar = ({ open, setOpen }) => {
  //   const [open, setOpen] = useState(false);
  //   const [placement, setPlacement] = useState("left");

  //   const showDrawer = () => {
  //     setOpen(true);
  //   };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="phil-side-bar">
      <Drawer
        // title="MY PLAN"
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        // key={placement}
        width={250}
        // mask={false}
        maskClosable={true}
      >
        <div className="phil_side_bar_item">
          <a href="#" className="active_item">
            my plan
          </a>
        </div>
        <div className="phil_side_bar_item">
          <a href="#">Online Payments</a>
        </div>
        <div className="phil_side_bar_item">
          <a href="#">Benefits & Claims</a>
        </div>
        <div className="phil_side_bar_item">
          <a href="#">Cash Programs</a>
        </div>
        <div className="phil_side_bar_item">
          <a href="#">Service Requests</a>
        </div>
      </Drawer>
    </div>
  );
};

export default PhipPlanSideBar;
