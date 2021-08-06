import { Tabs } from 'antd';
import React, { useState } from 'react';
import './AllContestDetails.css';

const AllContestDetails=()=>{
  let{innerWidth:width,innerHeight:height}=window;
    const { TabPane } = Tabs;
    const[tabPosition,setTabPosition]=useState(width<="374"?"top":"left");
    const changeTabPosition = e => {
        setTabPosition( e.target.value );
      };
    return(
        <div
        className="AllContestDetails-main-style"
      
        >
            <div 
            className="AllContestDetails-maincontent-flex"
        
            >
<div
className="AllContestDetails-contentbox-flex"

>

<Tabs tabPosition={tabPosition}>

  <TabPane
  
  tab={<span className="AllContestDetails-tabheading-text">Details</span>} key="1"

  >
          
           <div
           className="AllContestDetails-detailstab-card-style"
       
           >
               <div

               className="AllContestDetails-cardheading-flex"
              
               >
                  <div
                  className="AllContestDetails-cardheading-top-flex"
                 
                  >
<h4
className="AllContestDetails-cardheading-text"

>Digital East</h4>
<div
className="AllContestDetails-cardheading-vertical-line"

>


</div>
                </div>
               <div
               className="AllContestDetails-detailstab-listview-flex"
           
               >

               <ul
               className="AllContestDetails-details-list-style"
               >
                  <div
   className="AllContestDetails-rules-content-style"

   >
    <li>Anytime Anywhere Paperless Login. </li>
    <li>Ease in customer on-boarding – </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     >Complete the entire customer on-boarding in just few minutes from anywhere, without the need to travel back to office for login completion</h4>
   </div>
   <li>Compatible to any Android device - </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     >Now use your personal devices like Android mobile or Android tablet.</h4>
   </div>
   <li>Offline Capability – </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     >After BI generation the entire process can be completed even without internet connectivity</h4>
   </div>
   <li>CFR notification and upload – </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     >Check for CFR requirements and upload CFR related documents straight from your device</h4>
   </div>
   <li>Split payment - </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     >Split the premium into multiple payments of Cheque/DD/Cash</h4>
   </div>
   <li>Send link to customer –  </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     > Send a link for premium payment to the customer mail ID and the customer can make online payment from his own device

     </h4>
   </div>
   <li>Team Login – </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     >Login upto ZM level, select a FLS/Sales Manager/Advisor from the hierarchy and login a case as the selected sales person</h4>
   </div>
   <li>Auto upgrade – </li>
   <div
   className="AllContestDetails-detaillist-nonlist-style"
 
   >
     <h4
     className="AllContestDetails-detaillist-nonlist-text"
     > Login upto ZM level, select a FLS/Sales Manager/Advisor from the hierarchy and login a case as the selected sales person</h4>
   </div>
</div>
    </ul>
    
               </div>
               
               </div>

           </div>

           
          </TabPane>
          <TabPane tab={<span  className="AllContestDetails-tabheading-text">Eligibility</span>} key="2">
          <div
           className="AllContestDetails-eligibilitytab-card-style"
       
           >
               <div

               className="AllContestDetails-cardheading-flex"
              
               >
                  <div
                  className="AllContestDetails-cardheading-top-flex"
                 
                  >
<h4
className="AllContestDetails-cardheading-text"

>Digital East</h4>
<div
className="AllContestDetails-cardheading-vertical-line"

>


</div>
                </div>
               <div
               className="AllContestDetails-listview-flex"
           
               >

               <ul
               className="a"
               >
    <li>The challenge is applicable from Sales Managers to the Regional Managers </li>
    <li>The competition will be within the respective category(SM, BM and RM)</li>
    <li>Login and Issuance Period – June 1st to Jun 30th

</li>
    </ul>
               </div>
               
               </div>

           </div>
          </TabPane>
          <TabPane tab={<span  className="AllContestDetails-tabheading-text">Rules</span>} key="3">
          <div
           className="AllContestDetails-eligibilitytab-card-style"
       
           >
               <div

               className="AllContestDetails-cardheading-flex"
              
               >
                  <div
                  className="AllContestDetails-cardheading-top-flex"
                 
                  >
<h4
className="AllContestDetails-cardheading-text"

>Digital East</h4>
<div
className="AllContestDetails-cardheading-vertical-line"

>


</div>
                </div>
               <div
               className="AllContestDetails-listview-flex"
           
               >

               <ul
               className="a"
               >
   <div
   className="AllContestDetails-rules-content-style"

   >
         <li>In SM category Top 100 of the Zone will be recognized as “The Stars of Digital East”. Min criteria – 2 NOPs</li>
    <li>In BM category Top 25 of the Zone will be recognized as “The Stars of Digital East” Min criteria – 10 NOPs and 90% Sales Assist app installation by SMs</li>
    <li>In RM category Top 10 of the Zone will be recognized as “The Stars of Digital East” Min criteria – 50 NOP and 80% Sales Assist app installation by SMs 

</li>

   </div>
    </ul>
               </div>
               
               </div>

           </div>
          </TabPane>
          <TabPane tab={<span  className="AllContestDetails-tabheading-text" >Rewards</span>} key="4">
          <div
           className="AllContestDetails-eligibilitytab-card-style"
       
           >
               <div

               className="AllContestDetails-cardheading-flex"
              
               >
                  <div
                  className="AllContestDetails-cardheading-top-flex"
                 
                  >
<h4
className="AllContestDetails-cardheading-text"

>Digital East</h4>
<div
className="AllContestDetails-cardheading-vertical-line"

>


</div>
                </div>
               <div
               className="AllContestDetails-listview-flex"
           
               >

               <ul
               className="a"
               >
    <div
   className="AllContestDetails-rules-content-style"

   >
         <li>All the Stars of the Digital East to receive an exclusive certificate signed by the Zonal Head and “The Stars of the Digital East” Badge</li>
    <li>The top 10 SMs, top 5 BMs and top 3 RMS to receive the “The Stars of the Digital East” Trophy along with the certificate and badge</li>
    <li>The top 5 SMs. Top 2 BMs and the top RM of the Zone to receive the prestigious “The Pride of Digital East” Certificate 

</li>
</div>
  
    </ul>
               </div>
               
               </div>

           </div>
          </TabPane>
          <TabPane tab={<span  className="AllContestDetails-tabheading-text">Extra</span>} key="5">
          <div
           className="AllContestDetails-eligibilitytab-card-style"
       
           >
               <div

               className="AllContestDetails-cardheading-flex"
              
               >
                  <div
                  className="AllContestDetails-cardheading-top-flex"
                 
                  >
<h4
className="AllContestDetails-cardheading-text"

>Digital East</h4>
<div
className="AllContestDetails-cardheading-vertical-line"

>


</div>
                </div>
               <div
               className="AllContestDetails-listview-flex"
           
               >

               <ul
               className="a"
               >
    <div
   className="AllContestDetails-rules-content-style"

   >
         <li>A Head to Head between the regions, win the privilege to be the “Pride of Digital East Regions” </li>
    <li>Till you unlock your secret Rival, it’s playing blind!!!</li>
  


</div>
  
    </ul>
               </div>
               
               </div>

           </div>
          </TabPane>
 
 
        </Tabs>


</div>
            </div>
            
           
        </div>
    )
}
export default AllContestDetails;