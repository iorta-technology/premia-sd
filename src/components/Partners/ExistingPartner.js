import React, { useEffect, useState } from 'react';
import { Avatar,Tabs,Button ,Popover,Drawer,Input,Tag} from 'antd';
import './ExistingPartner.css';
import {
   PhoneFilled,
   MoreOutlined,
   ScheduleFilled,
   MailFilled,
   DownloadOutlined,
   ControlOutlined,
   SlidersFilled 
  } from '@ant-design/icons';
import axios from 'axios';
const UserList = ['U', 'L', 'To', 'Ed'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const { Search } = Input;
const ExistingPartner=()=>{
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const [drawerVisible, setDrawerVisible] = useState(false);
 
const[filterTagVisible,setFilterTagVisible]=useState(false)
const[searchFilterValue,setSearchFilterValue]=useState("")
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState("top");
const[existingPartnerTabCheck,setExistingPartnerTabCheck]=useState({
all_tab:true,
met_tab:false,
not_met_tab:false,
active_tab:false,
inactive_tab:false
})

const[searchTypeTabCheck,setSearchTypeTabCheck]=useState({
  name:true,
  mobile:false,
  partnerId:false
})
const showDrawer = () => {
    setDrawerVisible(true);
  };
  const onClose = () => {
    setDrawerVisible(false);
  };
const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  };

  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };
  const ButtonDrawerVisibleFunc=()=>{
    setDrawerVisible(true);
  }
const AllTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:true,
        met_tab:false,
        not_met_tab:false,
        active_tab:false,
        inactive_tab:false  
    })
}

const MetTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:true,
        not_met_tab:false,
        active_tab:false,
        inactive_tab:false  
    })
}
const NotMetTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:false,
        not_met_tab:true,
        active_tab:false,
        inactive_tab:false  
    })
}
const ActiveTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:false,
        not_met_tab:false,
        active_tab:true,
        inactive_tab:false  
    })
}
const InactiveTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:false,
        not_met_tab:false,
        active_tab:false,
        inactive_tab:true ,
    })
}
const SearchFilterNameFunc=()=>{
setSearchTypeTabCheck({
  name:true,
  mobile:false,
  partnerId:false
})
}
const SearchFilterMobileFunc=()=>{
  setSearchTypeTabCheck({
    name:false,
    mobile:true,
    partnerId:false
  })
}
const SearchFilterPartnerIdFunc=()=>{
  setSearchTypeTabCheck({
    name:false,
    mobile:false,
    partnerId:true
  })
}
const FilterTagCloseFunc=()=>{
  setFilterTagVisible(false)
}
const ApplyFilterButtonFunc=()=>{
  setFilterTagVisible(true)
  setDrawerVisible(false)
}
const SearchFilterValueFunc=(e)=>{
setSearchFilterValue(e.target.value)
}

    return(
        <div
        className="Existingpartner-main-flex"
        >
<div
className="Existingpartner-topview-flex"
>
    <div
    className={width>"767"?"Exisitngpartner-main-heading-flex":""}
    >
      <div className="Existingpartner-heading-content-style">
    <p
    className="Existingpartner-main-heading"
    >Existing Partner</p>

   

    {width>"769"?   <div
    className="Existingpartner-tab-flex"
    >
       <div
        className="Existingpartner-tab-view-flex"
       >
<div
onClick={AllTabClickFunc}
       
         className={existingPartnerTabCheck.all_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
      
            className={existingPartnerTabCheck.all_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                All
            </p>
            </div>

            <div
            onClick={MetTabClickFunc}
        className={existingPartnerTabCheck.met_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.met_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Met
            </p>
            </div>

     
            <div
            onClick={NotMetTabClickFunc}
        className={existingPartnerTabCheck.not_met_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.not_met_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Not Met
            </p>
            </div>
            <div
            onClick={ActiveTabClickFunc}
        className={existingPartnerTabCheck.active_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.active_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Active
            </p>
            </div>
            <div
            onClick={InactiveTabClickFunc}
        className={existingPartnerTabCheck.inactive_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.inactive_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Inactive
            </p>
            </div>
       </div>
       <div
       className="Existingpartner-lead-button-flex"
       >
       <div
       className="Existingpartner-lead-button-style"
       >
       
           <p
       className="Existingpartner-lead-text-style"
       >Leads</p>
           
            
         
</div>
</div>




  
    </div>  
    :
    <div
    className="Existingpartner-tab-mobile-view-box"
    > 
 <Tabs>
 <TabPane tab="All" key="1"></TabPane>
 <TabPane tab="Met" key="2"></TabPane>
 <TabPane tab="Not Met" key="3"></TabPane>
 <TabPane tab="Active" key="4"></TabPane>
 <TabPane tab="Inactive" key="5"></TabPane>
<TabPane tab={ <div
       className="Existingpartner-lead-button-flex"
       >
       <div
       className="Existingpartner-lead-button-style"
       >
       
           <p
       className="Existingpartner-lead-text-style"
       >Leads</p>
           
  
</div>
</div>}
key="6"
></TabPane>
 
 </Tabs>

  </div>
  }
   </div>
   </div>
    <div
    className="Existingpartner-content-area-style"
    >
      <div
      className="Existingpartner-Tag-area-flex"
      >
      <Tag
          closable
          visible={filterTagVisible}
          onClose={FilterTagCloseFunc}
          className="Existingpartner-filter-tag-style"
        >
        {searchFilterValue}
        </Tag>
      </div>
        
    <div
    className="Existingpartner-card-flex"
    >
      
        <div
        className="Existingpartner-card-style"
        >
            <div
            className="Existingpartner-card-content-flex"
            >
                <div
                className="Existingpartner-card-top-content-flex"
                >
<div
className="Existingpartner-card-top-content-text-flex"
>
    <div
    className="Existingpartner-card-top-avatar-content-flex"
    >
<Avatar
        style={{
          backgroundColor: color,
          verticalAlign: 'middle',
        
          marginRight:"10px"
        }}
        size="large"
        gap={gap}
      >
        {user}
      </Avatar>
      <div
      className="Existingpartner-card-top-avatar-name-column-flex"
      >
      <p
      className="Existingpartner-card-name-text-style">Siddhesh Bakshi</p>
 <div
 className="Existingpartner-card-id-row-flex"
 >
<p className="Existingpartner-card-id-text-style">Id</p>
<p
className="Existingpartner-card-id-number-text-style"
>97822</p>
 </div>
      </div>

    </div>

    <div
    className="Existingpartner-card-top-card-icon-flex"
    >
     <div
    className="Existingpartner-card-bottom-vertical-line-style"
    ></div>
    <div
    className="Existingpartner-card-phone-icon-row-flex"
    >
    <PhoneFilled 
    rotate="90"
    style={{
fontSize:"18px",
marginTop:"15px",
marginRight:"8px"
}}/>
<p
className="Existingpartner-card-phone-icon-number-text"
>0</p>
    </div>

    <div
    className="Existingpartner-card-bottom-vertical-line-style"
    ></div>
    <div
    className="Existingpartner-popover-mainstyle"
    >
         <Popover placement="leftTop"  
          className="Existingpartner-popover-mainstyle"
          content={
         <div
         className="Existingpartner-popover-main-flex"
         >
    <div
                  className="Existingpartner-card-popover-icon-text-flex"
                  >
                  <ScheduleFilled
                     style={{
                        fontSize:"18px",
                        marginRight:"6px"
                        
                        }}
                  /> 
                  <h6
                  className="Existingpartner-card-popover-text-style"
                
                  >create an event</h6>
                  </div>
    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                  <div
                  className="Existingpartner-card-popover-icon-text-flex"
                  >
                   
                  <MailFilled
                     style={{
                        fontSize:"18px",
                        marginRight:"6px"
                        
                        }}
                  /> 
                  <h6
                className="Existingpartner-card-popover-text-style"
                  >Mail</h6>
                  </div>
                    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                                        <div
                  className="Existingpartner-card-popover-icon-text-flex"
                  >
                  
                  <PhoneFilled
                   rotate="90"
                     style={{
                        fontSize:"18px",
                        marginRight:"6px"
                        
                        }}
                  /> 
                  <h6
                className="Existingpartner-card-popover-text-style"
                  >Call</h6>
                  </div>
         </div>
          } trigger="click">
      <MoreOutlined
   style={{
    fontSize:"18px",
    marginTop:"15px",
    // marginRight:"8px"
    }}
  /> 
      </Popover> 
  
      </div>
 
    </div>
    
</div>
                </div>


                <div
                className="Existingpartner-card-middle-content-flex"
                >
                    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                   
                      <div
                className="Existingpartner-card-middle-content-text-flex"
                >
                    <p
                    className="Existingpartner-card-middle-content-text-style"
                    >Target ₹ 0</p>
                    <p
                    className="Existingpartner-card-middle-content-text-style"
                    >Achieved ₹ 0</p>
                    <p
                    className="Existingpartner-card-middle-content-text-style"
                    >% Achieved 0%</p>
                    </div>
                    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                </div>

                <div
                className="Existingpartner-card-bottom-content-flex"
                >
<div
className="Existingpartner-card-bottom-content-text-flex"
>
<div
className="Existingpartner-card-bottom-vertical-line-column-flex"
>
    <div
    className="Existingpartner-card-bottom-vertical-line-style"
    ></div>

<Button
className="Existingpartner-card-bottom-button-style"
>View</Button>
</div>


</div>
                </div>
              
            </div>
   
         
        </div>

        <div
        className="Existingpartner-card-style"
        >
            <div
            className="Existingpartner-card-content-flex"
            >
                <div
                className="Existingpartner-card-top-content-flex"
                >
<div
className="Existingpartner-card-top-content-text-flex"
>
    <div
    className="Existingpartner-card-top-avatar-content-flex"
    >
<Avatar
        style={{
          backgroundColor: color,
          verticalAlign: 'middle',
        
          marginRight:"10px"
        }}
        size="large"
        gap={gap}
      >
        {user}
      </Avatar>
      <div
      className="Existingpartner-card-top-avatar-name-column-flex"
      >
      <p
      className="Existingpartner-card-name-text-style">Siddhesh Bakshi</p>
 <div
 className="Existingpartner-card-id-row-flex"
 >
<p className="Existingpartner-card-id-text-style">Id</p>
<p
className="Existingpartner-card-id-number-text-style"
>97822</p>
 </div>
      </div>

    </div>

    <div
    className="Existingpartner-card-top-card-icon-flex"
    >
     <div
    className="Existingpartner-card-bottom-vertical-line-style"
    ></div>
    <div
    className="Existingpartner-card-phone-icon-row-flex"
    >
    <PhoneFilled 
    rotate="90"
    style={{
fontSize:"18px",
marginTop:"15px",
marginRight:"8px"
}}/>
<p
className="Existingpartner-card-phone-icon-number-text"
>0</p>
    </div>

    <div
    className="Existingpartner-card-bottom-vertical-line-style"
    ></div>
    <div
    className="Existingpartner-popover-mainstyle"
    >
         <Popover placement="leftTop"  
          className="Existingpartner-popover-mainstyle"
          content={
         <div
         className="Existingpartner-popover-main-flex"
         >
    <div
                  className="Existingpartner-card-popover-icon-text-flex"
                  >
                  <ScheduleFilled
                     style={{
                        fontSize:"18px",
                        marginRight:"6px"
                        
                        }}
                  /> 
                  <h6
                  className="Existingpartner-card-popover-text-style"
                
                  >create an event</h6>
                  </div>
    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                  <div
                  className="Existingpartner-card-popover-icon-text-flex"
                  >
                   
                  <MailFilled
                     style={{
                        fontSize:"18px",
                        marginRight:"6px"
                        
                        }}
                  /> 
                  <h6
                className="Existingpartner-card-popover-text-style"
                  >Mail</h6>
                  </div>
                    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                                        <div
                  className="Existingpartner-card-popover-icon-text-flex"
                  >
                  
                  <PhoneFilled
                   rotate="90"
                     style={{
                        fontSize:"18px",
                        marginRight:"6px"
                        
                        }}
                  /> 
                  <h6
                className="Existingpartner-card-popover-text-style"
                  >Call</h6>
                  </div>
         </div>
          } trigger="click">
      <MoreOutlined
   style={{
    fontSize:"18px",
    marginTop:"15px",
    // marginRight:"8px"
    }}
  /> 
      </Popover> 
  
      </div>
 
    </div>
    
</div>
                </div>


                <div
                className="Existingpartner-card-middle-content-flex"
                >
                    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                   
                      <div
                className="Existingpartner-card-middle-content-text-flex"
                >
                    <p
                    className="Existingpartner-card-middle-content-text-style"
                    >Target ₹ 0</p>
                    <p
                    className="Existingpartner-card-middle-content-text-style"
                    >Achieved ₹ 0</p>
                    <p
                    className="Existingpartner-card-middle-content-text-style"
                    >% Achieved 0%</p>
                    </div>
                    <div
                    className="Existingpartner-card-middle-horizontal-line-style"
                    ></div>
                </div>

                <div
                className="Existingpartner-card-bottom-content-flex"
                >
<div
className="Existingpartner-card-bottom-content-text-flex"
>
<div
className="Existingpartner-card-bottom-vertical-line-column-flex"
>
    <div
    className="Existingpartner-card-bottom-vertical-line-style"
    ></div>

<Button
className="Existingpartner-card-bottom-button-style"
>View</Button>
</div>


</div>
                </div>
    
            </div>
        
         
        </div>

    </div>
    </div>
    </div>

<div
className="Existingpartner-bottomview-flex"
>
    <div
 
    className="Existingpartner-bottomview-row-flex"
    >
              <Drawer
                 width={width>"767"?"500":"315"}
                 height="50"
              className="Existingpartner-drawer-style"
              title={<p  className="Existingpartner-drawer-sortby-text-style">Select Filter</p>} placement="right" onClose={onClose} visible={drawerVisible}>
      <div
      className="Existingpartner-drawer-card-style"
      >
        <div
        className="Existingpartner-drawer-sort-flex"
        >
        <p
        className="Existingpartner-drawer-sortby-text-style"
        >Sort By</p>

        <select
        className="Existingpartner-drawer-select-dropdown-style"
        >

          <option>Date of Joining-Newest First</option>
          <option>Date of Joining-Oldest First</option>
        </select>
        </div>
     
      </div>

      <div
      className="Existingpartner-drawer-card-style"
      >
        <div
        className="Existingpartner-drawer-sort-flex"
        >
        <p
        className="Existingpartner-drawer-sortby-text-style"
        >Search Type Selection</p>
<div
className="Existingpartner-drawer-button-flex"
>
<button
onClick={SearchFilterNameFunc}
        className={searchTypeTabCheck.name==true? "Existingpartner-drawer-selected-button-tab-style":"Existingpartner-drawer-notselected-button-tab-style"}
        >Name
        </button>
        <button
        onClick={SearchFilterMobileFunc}
        className={searchTypeTabCheck.mobile==true? "Existingpartner-drawer-selected-button-tab-style":"Existingpartner-drawer-notselected-button-tab-style"}

        >Mobile
        </button>
        <button
        onClick={SearchFilterPartnerIdFunc}
        className={searchTypeTabCheck.partnerId==true? "Existingpartner-drawer-selected-button-tab-style":"Existingpartner-drawer-notselected-button-tab-style"}

        >Partner Id
        </button>
</div>
<Search placeholder="Search By Name" allowClear
value={searchFilterValue}
onChange={SearchFilterValueFunc}
className="Existingpartner-drawer-searchbox-style"
/>
        </div>
     
      </div>

      <div
      className="Existingpartner-drawer-card-style"
      >
     <div
     className="Existingpartner-drawer-applybutton-flex"
     >

     <button
        onClick={ApplyFilterButtonFunc}
        className="Existingpartner-drawer-selected-button-tab-style"

        >Apply
        </button>
     </div>
      </div>
       
      </Drawer>

        
    <Button
    onClick={ButtonDrawerVisibleFunc}
    className="Existingpartner-floater-button-style"
    type="primary" shape="circle" icon={<SlidersFilled  
        style={{
            fontSize:"25px",
       
       
            // marginRight:"8px"
            }}
    rotate={90}/>}  />

    </div>
  
</div>



        </div>
    )
}
export default ExistingPartner