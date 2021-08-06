import React from 'react';

const CompletedContest=()=>{
    return(
<div
style={{
    display:"flex",
    flexDirection:"column",
    height:"100vh"
}}
>
    <div
    style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:"10px"
    }}
    >
<div
style={{
    display: "flex",
    flexDirection: "column",
    height: "20vh",
    width: "45%",
    /* background-color: brown; */
    borderRadius: "5px",
    overflow: "hidden",
    borderWidth: "0.1px",
    borderColor: "#e7e3e3",
    // borderStyle: "solid",
    boxShadow: " 0.3px 0.55px 1px 2px rgba(0, 0, 0, 0.2)",
}}
>
    
<div
style={{
    flex:0.45,
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-end",
    // backgroundColor:"red",
    width:"96%",
    marginLeft:"10px",
    marginRight:"10px"
   
}}
>
<h4
style={{
    fontSize:"16px",
    fontWeight:"bold"
}}
>All Completed Contests</h4>
   <div
   style={{
       display:"flex",
       flexDirection:"column",
    //    justifyContent:"flex-start",
       width:"100%",
       backgroundColor:"#E1DCDC",
       height:"2px"
   }}
   ></div>
</div>
<div
style={{
    flex:0.55,
    display:"flex",
    // backgroundColor:"yellow",
    width:"96%",
    marginLeft:"10px",
    marginRight:"10px",
    flexDirection:"row",
    justifyContent:"space-between"
}}
>
  <div
  style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-around"

  }}
  >
      <h4
      style={{
        
        fontSize: "14px",
       
      }}
      >Contest Number 2 ( 20th May to 20th June )</h4>
      
      <h4
      style={{
        
        fontSize: "14px",
       
      }}
      >Results announced: 25/06/2016</h4>
      
      </div> 
      <div
      style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"center"
      }}
      >
            <button
            style={{
                backgroundColor: "#464141",
                border: "none",
                color: "white",
              
                textAlign: "center",
                textDecoration: "none",
                /* display: inline-block */
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                borderRadius: "7px",
                height: "28.3px",
                width: "100px",
            }}
            >View Results</button>
      </div>
    
</div>
</div>
<div
style={{
    display: "flex",
    flexDirection: "column",
    height: "20vh",
    width: "45%",
    /* background-color: brown; */
    borderRadius: "5px",
    overflow: "hidden",
    borderWidth: "0.1px",
    borderColor: "#e7e3e3",
    // borderStyle: "solid",
    boxShadow: " 0.3px 0.55px 1px 2px rgba(0, 0, 0, 0.2)",
}}
>
    
<div
style={{
    flex:0.45,
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-end",
    // backgroundColor:"red",
    width:"96%",
    marginLeft:"10px",
    marginRight:"10px"
   
}}
>
<h4
style={{
    fontSize:"16px",
    fontWeight:"bold"
}}
>All Completed Contests</h4>
   <div
   style={{
       display:"flex",
       flexDirection:"column",
    //    justifyContent:"flex-start",
       width:"100%",
       backgroundColor:"#E1DCDC",
       height:"2px"
   }}
   ></div>
</div>
<div
style={{
    flex:0.55,
    display:"flex",
    // backgroundColor:"yellow",
    width:"96%",
    marginLeft:"10px",
    marginRight:"10px",
    flexDirection:"row",
    justifyContent:"space-between"
}}
>
  <div
  style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-around"

  }}
  >
      <h4
      style={{
        
        fontSize: "14px",
       
      }}
      >Contest Number 3 ( 20th May to 20th June )</h4>
      
      <h4
      style={{
        
        fontSize: "14px",
       
      }}
      >Results announced: 25/06/2016</h4>
      
      </div> 
      <div
      style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"center"
      }}
      >
            <button
            style={{
                backgroundColor: "#464141",
                border: "none",
                color: "white",
              
                textAlign: "center",
                textDecoration: "none",
                /* display: inline-block */
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                borderRadius: "7px",
                height: "28.3px",
                width: "100px",
            }}
            >View Results</button>
      </div>
    
</div>
</div>

    </div>

</div>
    );}
export default CompletedContest ;