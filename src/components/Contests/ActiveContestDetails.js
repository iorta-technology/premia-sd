import React from 'react';
import './ActiveContestDetails.css';
import { Tabs,Progress} from 'antd';
import Microwave from './../images/Microwave.png';
import WashingMachine from './../images/Washingmachine.jpg';
import Refrigerator from './../images/Refrigerator.jpg';
import Construction from './../images/Construction.jpg';
const ActiveContestDetails=()=>{
    let{innerWidth:width,innerHeight:height}=window;
    const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

    return(
        <div 
        className="activecontestdetails-main"
        >
         <div
         style={{
             flex:1,
             display:"flex",
             flexDirection:"column",
             justifyContent:"space-between",
            //  flex:1,
         }}
         >
             <div
             style={{
                 display:"flex",
                 flex:0.3,
                //  backgroundColor:"red"
             }}
             >
<div
            className="activecontestdetails-card-style"
             >
               
                <div
                style={{
                    display:"flex",
                    flex:1,
                    // backgroundColor:"yellow",
                    flexDirection:"column",
                    marginLeft:"25px",
                    marginRight:"25px"
                }}
                >
                    <div
  
  style={{
      display:"flex",
      flex:0.35,
    //   backgroundColor:"red",
      flexDirection:"column",
      justifyContent:"flex-end"
  }}
>
<div
style={{
    display:"flex",
    flexDirection:"column",
   
    height:"25px",
    width:"100%",
    backgroundColor:"#f1f1f1",
    // marginBottom:"10px"
}}
>

<div
className="activecontestdetails-cardhead-style"
style={{
    display:"flex",
    flexDirection:"row",
   
    height:"25px",
    width:"90%",
    // backgroundColor:"yellow",
    justifyContent:"space-between",
    marginLeft:"10px",
    alignItems:"center"
}}
>
    <div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"red"
    }}
    >
        <h4 
className="activecontestdetails-cardhead-text"
>Rank</h4>
    </div>
    <div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"white",
        justifyContent:"flex-start"
    }}
    >
<h4 className="activecontestdetails-cardhead-text">Name</h4>
</div>
<div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"yellow",
        justifyContent:"flex-start"
    }}
    >
        <h4 className="activecontestdetails-cardhead-text">Score</h4>
    </div>
    <div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"blue",
        justifyContent:"flex-start"
    }}
    >
<h4 className="activecontestdetails-cardhead-text">Stats</h4>
</div>
<div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"indigo",
        justifyContent:"flex-start"
    }}
    >
<h4 className="activecontestdetails-cardhead-text">Information</h4>
</div>

</div>
</div>


</div>                    <div
  
  style={{
      display:"flex",
      flex:0.65,
    //   backgroundColor:"green",
      flexDirection:"column"
  }}
>
<div
style={{
    display:"flex",
    flexDirection:"row",
   
    height:"100px",
    width:"90%",
    backgroundColor:"white",
    justifyContent:"space-between",
    marginLeft:"10px",
    marginTop:"10px"
    // alignItems:"center"
}}
>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"red"
}}
>
<h4 
className="activecontestdetails-cardcontent-info-text"
>1st</h4>
</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"white",
justifyContent:"flex-start"
}}
>
<h4 className="activecontestdetails-cardcontent-info-text">Shashank Mittal</h4>
</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"yellow",

    justifyContent:"flex-start"
}}
>
    <h4 className="activecontestdetails-cardcontent-info-text">1827</h4>


</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"blue",
    justifyContent:"flex-start"
}}
>
    <div
    style={{
        display:"flex",
        flexDirection:"column",
    }}
    >

<Progress percent={80} size="large"
                style={{
                    width:"150px",
                    fontSize:"0px"
                }}
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"21px"}
       strokeLinecap="square"
       /><Progress percent={80} size="large"
       style={{
           width:"150px",
           fontSize:"0px",
           marginTop:"10px"
       }}
    strokeColor="#ffcc00"
type="line"
strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"21px"}
strokeLinecap="square"
/>
    </div>

</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"indigo",
    justifyContent:"flex-start"
}}
>
<div
style={{
    display:"flex",
    flexDirection:"column"
}}
>
<h4 className="activecontestdetails-cardcontent-info-text">Logins:1600</h4>
<h4 className="activecontestdetails-cardcontent-info-text">Issuance:1534</h4>
</div>
</div>


</div>
</div>
                    <div>

                    </div>
                </div>

             </div> 
             </div>
             <div
             style={{
                 display:"flex",
                 flex:0.7,
                                 //  backgroundColor:"yellow"
             }}
             >
  <Tabs
  tabBarGutter="250px"
  onChange={callback} type="card">
    <TabPane tab="Prizes" key="1">
     <div
     style={{
         display:"flex",
         flexDirection:"row",
        //   marginLeft:"12%",
         justifyContent:"space-around",
        
     }}
     >
         <div
         className="activeContestDetails-prizetab-single-card-flex" 
        
         >
         <div
         className="activeContestDetails-prizetab-cardstyle"

>
<div
className="activeContestDetails-prizetab-head-flex"

>
<div
className="activeContestDetails-prizetab-head-coloured-style"

>
<h4

className="activeContestDetails-prizetab-title-text"

>First Runner up</h4>
</div>
</div>
<div
className="activeContestDetails-prizetab-image-flex"

>

<img
src={WashingMachine}
style={{
    width:"80%"
}}

/>
</div>
<div
className="activeContestDetails-prizetab-footer-flex"


>
<h4
className="activeContestDetails-prizetab-footer-text"

>

The winner get IFB Washing Machine worth  ₹ 25,699/-
</h4>
</div>
</div>
             </div>
             <div
             className="activeContestDetails-prizetab-single-card-flex"  >
             <div
         className="activeContestDetails-prizetab-cardstyle"

>
<div
className="activeContestDetails-prizetab-head-flex"

>
<div
className="activeContestDetails-prizetab-head-coloured-style"

>
<h4

className="activeContestDetails-prizetab-title-text"

>Second Runner up</h4>
</div>
</div>
<div
className="activeContestDetails-prizetab-image-flex"

>

<img
src={Refrigerator}
style={{
    width:"80%"
}}

/>
</div>
<div
className="activeContestDetails-prizetab-footer-flex"


>
<h4
className="activeContestDetails-prizetab-footer-text"

>

The winner get IFB Refrigerator worth ₹ 20,699/-
</h4>
</div>
</div>
             
             </div>
             <div
        className="activeContestDetails-prizetab-single-card-flex" 
         >
                   <div
         className="activeContestDetails-prizetab-cardstyle"

>
<div
className="activeContestDetails-prizetab-head-flex"

>
<div
className="activeContestDetails-prizetab-head-coloured-style"

>
<h4

className="activeContestDetails-prizetab-title-text"

>Third Runner up</h4>
</div>
</div>
<div
className="activeContestDetails-prizetab-image-flex"

>

<img
src={Microwave}
style={{
    width:"80%"
}}

/>
</div>
<div
className="activeContestDetails-prizetab-footer-flex"


>
<h4
className="activeContestDetails-prizetab-footer-text"

>

The winner get IFB Microwave worth ₹ 5,000/-
</h4>
</div>
</div>
            
             </div>
{/* <div
style={{
    display: "flex",

  flexDirection: "column",
  height: "350px",
  width: "90%",
  
  borderRadius: "5px",
  overflow: "hidden",
  borderWidth: "1px",
  borderColor: "grey",
 
  boxShadow: "0.3px 0.55px 1.1px 2px rgba(0, 0, 0, 0.2)",
  marginTop: "30px"
}}
>

</div> */}
       

     </div>
    </TabPane>
    <TabPane tab="Extras" key="2">
   <div
   className="activeContestDetails-extrastab-cardstyle"

   >
     <div
     className="activeContestDetails-extrastab-content-flex"

     >
<h4
className="activeContestDetails-extrastab-title-text"
>Extras</h4>
<h4
className="activeContestDetails-extrastab-content-text"
>A Head to Head between the regions, win the privilege to be the “Pride of Digital East Regions”</h4>

<h4
className="activeContestDetails-extrastab-content-text"
>And your Rival??? Unlock the secret rival of your region by completing 80% of Sales Assist installation by the SMs of the region</h4>
<h4
className="activeContestDetails-extrastab-content-text"
>Till you unlock your secret Rival, it’s playing blind!!!</h4>

     </div>
   </div>
    </TabPane>
    <TabPane tab="Videos" key="3">
      <div
      className="activeContestDetails-videostab-cardstyle"
      >
<div
className="activeContestDetails-videostab-flex"
>
<div
className="activeContestDetails-videostab-video-flex"
>
  <div
  className="activeContestDetails-videostab-video-column-flex"
  

  >
<h4
style={{
    fontSize:"15px",
    fontWeight:"bold"
}}
>Proud Moments Captured</h4>
<img
src={Construction}
style={{
    width:"100%"
}}
/>
<h4
style={{
    fontSize:"14px",
    fontWeight:"bold",
    color:"#a9a5a5"
}}
>- Robert Howard, Construction Office Engineer</h4>


  </div>
<div
className="activeContestDetails-videostab-video-column-flex"
>


</div>
</div>
<div
className="activeContestDetails-videostab-content-flex"
>
  <div
  style={{
      display:"flex",
      flexDirection:"column",
    //   backgroundColor:"yellow",
      width:"100%",
      marginLeft:"3%",
      marginTop:"5%",
      marginRight:"3%",

    //   justifyContent:"space-around"
  }}
  >
    <h4
    style={{
        fontSize:"16px",
        fontWeight:"bold"
    }}
    >

Amit Kumar, Winner of Digital East, Q1 (2016-17)
    </h4>
<h4
style={{
    fontSize:"14.5px"
}}
>
On an everyday basis, Bluebeam helps create an environment where anything is possible in the creation and modification of PDFs. With the new release of Revu 11, users have even more functionality to work with such as the Format Painter. The capability to copy the formatted appearance from one annotation to another has spedup... Built documentation tremendously. Also, with the creation of Sets and the ability to split documents into multiple sections, Bluebeam has now evolved the process of forming maintenance manuals into a well-oiled machine On an everyday basis, Bluebeam helps create an environment where anything is possible in the creation and modification of PDFs. With the new release of Revu 11, users have even more functionality to work with such as the Format Painter. The capability to copy the formatted appearance from one annotation to another has spedup... Built documentation tremendously. Also, with the creation of Sets and the ability to split documents into multiple sections, Bluebeam has now evolved the process of forming maintenance manuals into a well-oiled machine.
</h4>
  </div>
</div>
</div>
      </div>
    </TabPane>
  </Tabs>
             </div>
          
              
            {/* <div
            className="activecontestdetails-card-style"
             >
               
                <div
                style={{
                    display:"flex",
                    flex:1,
                    // backgroundColor:"yellow",
                    flexDirection:"column",
                    marginLeft:"25px",
                    marginRight:"25px"
                }}
                >
                    <div
  
  style={{
      display:"flex",
      flex:0.35,
    //   backgroundColor:"red",
      flexDirection:"column",
      justifyContent:"flex-end"
  }}
>
<div
style={{
    display:"flex",
    flexDirection:"column",
   
    height:"25px",
    width:"100%",
    backgroundColor:"#f1f1f1",
    // marginBottom:"10px"
}}
>

<div
className="activecontestdetails-cardhead-style"
style={{
    display:"flex",
    flexDirection:"row",
   
    height:"25px",
    width:"90%",
    // backgroundColor:"yellow",
    justifyContent:"space-between",
    marginLeft:"10px",
    alignItems:"center"
}}
>
    <div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"red"
    }}
    >
        <h4 
className="activecontestdetails-cardhead-text"
>Rank</h4>
    </div>
    <div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"white",
        justifyContent:"flex-start"
    }}
    >
<h4 className="activecontestdetails-cardhead-text">Name</h4>
</div>
<div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"yellow",
        justifyContent:"flex-start"
    }}
    >
        <h4 className="activecontestdetails-cardhead-text">Score</h4>
    </div>
    <div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"blue",
        justifyContent:"flex-start"
    }}
    >
<h4 className="activecontestdetails-cardhead-text">Stats</h4>
</div>
<div
    style={{
        display:"flex",
        flexDirection:"row",
        flex:0.2,
        // backgroundColor:"indigo",
        justifyContent:"flex-start"
    }}
    >
<h4 className="activecontestdetails-cardhead-text">Information</h4>
</div>

</div>
</div>


</div>                    <div
  
  style={{
      display:"flex",
      flex:0.65,
    //   backgroundColor:"green",
      flexDirection:"column"
  }}
>
<div
style={{
    display:"flex",
    flexDirection:"row",
   
    height:"100px",
    width:"90%",
    backgroundColor:"white",
    justifyContent:"space-between",
    marginLeft:"10px",
    marginTop:"10px"
    // alignItems:"center"
}}
>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"red"
}}
>
<h4 
className="activecontestdetails-cardcontent-info-text"
>1st</h4>
</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"white",
justifyContent:"flex-start"
}}
>
<h4 className="activecontestdetails-cardcontent-info-text">Shashank Mittal</h4>
</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"yellow",

    justifyContent:"flex-start"
}}
>
    <h4 className="activecontestdetails-cardcontent-info-text">1827</h4>


</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"blue",
    justifyContent:"flex-start"
}}
>
<Progress percent={80} size="large"
                style={{
                    width:"150px"
                }}
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
</div>
<div
style={{
    display:"flex",
    flexDirection:"row",
    flex:0.2,
    // backgroundColor:"indigo",
    justifyContent:"flex-start"
}}
>
<div
style={{
    display:"flex",
    flexDirection:"column"
}}
>
<h4 className="activecontestdetails-cardcontent-info-text">Logins:1600</h4>
<h4 className="activecontestdetails-cardcontent-info-text">Issuance:1534</h4>
</div>
</div>


</div>
</div>
                    <div>

                    </div>
                </div>

             </div> */}
            
         </div>
       
        </div>
    );
}
export default ActiveContestDetails;