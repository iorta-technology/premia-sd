(this["webpackJsonpsd-v3"]=this["webpackJsonpsd-v3"]||[]).push([[64],{173:function(e,t,n){"use strict";n.d(t,"f",(function(){return d})),n.d(t,"k",(function(){return l})),n.d(t,"t",(function(){return u})),n.d(t,"o",(function(){return h})),n.d(t,"b",(function(){return f})),n.d(t,"A",(function(){return g})),n.d(t,"c",(function(){return b})),n.d(t,"h",(function(){return x})),n.d(t,"e",(function(){return y})),n.d(t,"y",(function(){return M})),n.d(t,"z",(function(){return N})),n.d(t,"v",(function(){return w})),n.d(t,"l",(function(){return C})),n.d(t,"x",(function(){return k})),n.d(t,"g",(function(){return S})),n.d(t,"p",(function(){return I})),n.d(t,"u",(function(){return L})),n.d(t,"n",(function(){return D})),n.d(t,"s",(function(){return T})),n.d(t,"w",(function(){return A})),n.d(t,"a",(function(){return U})),n.d(t,"m",(function(){return R})),n.d(t,"r",(function(){return J})),n.d(t,"q",(function(){return W})),n.d(t,"d",(function(){return E})),n.d(t,"i",(function(){return V})),n.d(t,"j",(function(){return P}));var r=n(1),a=n(99),c=n(3),s=n(111),o=n.n(s),i=o.a.create({baseURL:"https://sdtatadevlmsv2.iorta.in/secure/user/",headers:{Accept:"application/json","Content-Type":"application/json",sid:"6def3c56892123bc1ba4aee31054651c543f99ffb8ca8dd6570be9ad135dfcef6dfbe9d3aa1b671c",token:"b3fb5b17a2d122d8ef8c2bef9801b104ed58655f",Authorization:"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTUzZjFlYzQ3MzVlZjdmOTQyOTI2ZTMiLCJpYXQiOjE2MzkxMzY3MjcsImV4cCI6MTYzOTEzODUyN30.7HyECiCYqwXS4ZLWs1sVNtYju5vSVX7kXhWjHAoxg7U"}}),d=function(e,t,n){console.log(e);var s,o=Object(c.f)(t);return s=1===n?0:15*(n-1),function(t){return t({type:r.s}),a.a.get("user/v2/getLead/".concat(e,"?leadfilter=").concat(o,"&skip=").concat(s)).then((function(e){var n,a,c=e.data.errMsg;if(-1===e.data.errCode)return t((n=c[0],a=c[1][0].count,{type:r.t,allLeads:n,count:a}));throw c})).catch((function(e){return t(function(e){return{type:r.r,error:e}}(e))}))}},l=function(e){return function(e){return e({type:r.H}),a.a.get("admin/getDesignationMaster?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70").then((function(t){if(-1===t.data.errCode)return e((n=t.data.errMsg[0],{type:r.I,designations:n}));var n})).catch((function(t){return e(function(e){return{type:r.G,error:e}}(t.response.data.errors))}))}},u=function(e){return function(e){return e({type:r.lb}),i.get("user_tree?userId=6153f1ec4735ef7f942926e3").then((function(t){if(console.log(t.data.errMsg),-1===t.data.errCode)return e({type:r.mb,teamMember:n});throw t;var n})).catch((function(t){return console.log(t),e(function(e){return{type:r.kb,error:e}}(t))}))}},p=n(194),j=function(e,t){return{type:r.h,formData:e,succMsg:t}},f=function(e){return function(t){return t({type:r.g}),a.a.post("user/addlead",e).then((function(e){if(-1===e.data.errCode){var n=e.data.errMsg;return console.log("creat action",n),t(j.apply(void 0,Object(p.a)(n).concat(["Lead Created Successfully"])))}throw e})).catch((function(e){console.log(e);var n=e.data.errMsg;return t(function(e){return{type:r.f,error:e}}(n))}))}},b=function(e,t){return function(n){return n({type:r.j}),a.a.put("user/updateLead/".concat(t),e).then((function(e){if(-1===e.data.errCode){var t=e.data.errMsg[0];e.data.errMsg[1];return n(function(e){return{type:r.k,formData:e}}(t))}throw e})).catch((function(e){var t=e.data.errMsg;return n(function(e){return{type:r.i,error:e}}(t))}))}},h=function(e){return function(t){return t({type:r.W}),a.a.get("user/getlead_details/".concat(e)).then((function(n){console.log(n.data.errMsg);var a=n.data.errMsg[0],c=n.data.errMsg[1];if(-1===n.data.errCode)return t(function(e,t,n){return{type:r.X,leadDetails:e,appointmentDetails:t,fetchLeadId:n}}(a,c,e));throw a})).catch((function(e){return console.log(e),t(function(e){return{type:r.V,error:e}}(e))}))}},g=function(e){return console.log(e),function(t){t(function(e){return{type:r.Cb,formData:e}}(e))}},x=function(e,t){return function(e){return e({type:r.ib}),a.a.get("admin/getState_city?userId=5b3b4cc28fa96d39870443e3&getstate=allstate").then((function(t){if(-1===t.data.errCode)return e((n=t.data.errMsg,{type:r.jb,states:n}));var n})).catch((function(t){return e(function(e){return{type:r.hb,error:e}}(t.response.data.errors))}))}},y=function(e){return function(t){return t({type:r.B}),a.a.get("admin/getState_city?userId=5b3b4cc28fa96d39870443e3&stateCode=".concat(e)).then((function(e){if(-1===e.data.errCode)return t((n=e.data.errMsg,{type:r.C,cities:n}));var n})).catch((function(e){return t(function(e){return{type:r.A,error:e}}(e.response.data.errors))}))}},O=n(195),v=n.n(O),m=n(218),M=function(e,t){return function(){var n=Object(m.a)(v.a.mark((function n(c){return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c({type:r.Ab}),n.abrupt("return",a.a.post("user/user_login_v2",{email:e,password:t}).then((function(e){if(console.log("logged in data",e),-1===e.data.errCode)return c((t=e.data.errMsg,{type:r.Bb,login_agent_data:t}));var t})).catch((function(e){console.log(e)})));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},N=function(){return function(e){return e({type:r.d}),e({type:r.e})}},w=function(e){return function(t){return t({type:r.rb}),a.a.get("user/getuserDetails?user_id=".concat(e)).then((function(e){var n,a=e.data.errMsg;if(-1===e.data.errCode)return console.log("post login userdetails",e.data.errMsg[0]),t((n=e.data.errMsg[0],{type:r.sb,userDetails:n}));throw a})).catch((function(e){return console.log(e),t(function(e){return{type:r.qb,error:e}}(e))}))}},C=function(e,t){return function(e){return e({type:r.N}),a.a.get("admin/getHierarchy?userId=5b3b4cc28fa96d39870443e3&channelCode=".concat(t,"&skip=0&hierarchy_type=1")).then((function(t){return console.log("post login hierarchy",t.data.errMsg[0]),e((n=t.data.errMsg[0],{type:r.O,hierarchy:n}));var n})).catch((function(t){return e(function(e){return{type:r.M,error:e}}(t.response.data.errors))}))}},z=o.a.create({baseURL:"https://pocbancanode.iorta.in/secure/user/",headers:{Accept:"application/json","Content-Type":"application/json"}}),k=function(e){return function(t){return t({type:r.xb}),z.get("fetch_employee_kpi?emp_code=60e5d6056b18e8309da3fa49&category=".concat(e,"&channel=5f912e05037b6c581e7678f1")).then((function(e){return console.log("kpidashb data",e),t((n=e.data.errMsg,{type:r.yb,kpi_data:n}));var n})).catch((function(e){console.log(e)}))}},_=n(196),S=function(e,t){var n;return n=1===t?0:15*(t-1),function(e){return e({type:r.v}),_.a.get("getPolicy/610a50ec85eac609e29061e3?policy_filter=all&sortBy=-1&skip=".concat(n)).then((function(t){return console.log("fetch renewals",t.data.errMsg[0],t.data.errMsg[1][0].count),e((n=t.data.errMsg[0],a=t.data.errMsg[1][0].count,{type:r.w,allRenewals:n,count:a}));var n,a})).catch((function(t){return e(function(e){return{type:r.u,error:e}}(t.response.data.errors))}))}},I=function(e,t){var n;return n=1===t?0:15*(t-1),function(e){return e({type:r.Z}),_.a.get("getPolicy/610a50ec85eac609e29061e3?policy_filter=Paid&sortBy=-1&skip=".concat(n)).then((function(t){return console.log("fetch paid renewals",t.data.errMsg[0],t.data.errMsg[1][0].count),e((n=t.data.errMsg[0],a=t.data.errMsg[1][0].count,{type:r.ab,paidRenewals:n,count:a}));var n,a})).catch((function(t){return e(function(e){return{type:r.Y,error:e}}(t.response.data.errors))}))}},L=function(e,t){var n;return n=1===t?0:15*(t-1),function(e){return e({type:r.ob}),_.a.get("getPolicy/610a50ec85eac609e29061e3?policy_filter=Unpaid&sortBy=-1&skip=".concat(n)).then((function(t){var n,a,c,s,o,i;return console.log("fetch unpaid renewals",null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.errMsg[0],null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.errMsg[1][0].count),e((o=null===t||void 0===t||null===(c=t.data)||void 0===c?void 0:c.errMsg[0],i=null===t||void 0===t||null===(s=t.data)||void 0===s?void 0:s.errMsg[1][0].count,{type:r.pb,unPaidRenewals:o,count:i}))})).catch((function(t){var n,a;return e(function(e){return{type:r.nb,error:e}}(null===t||void 0===t||null===(n=t.response)||void 0===n||null===(a=n.data)||void 0===a?void 0:a.errors))}))}},D=function(e,t){var n;return n=1===t?0:15*(t-1),function(e){return e({type:r.T}),_.a.get("getPolicy/610a50ec85eac609e29061e3?policy_filter=Lapsed&sortBy=-1&skip=".concat(n)).then((function(t){return console.log("fetch lapsed renewals",t.data.errMsg[0],t.data.errMsg[1][0].count),e((n=t.data.errMsg[0],a=t.data.errMsg[1][0].count,{type:r.U,lapsedRenewals:n,count:a}));var n,a})).catch((function(t){return e(function(e){return{type:r.S,error:e}}(t.response.data.errors))}))}},T=function(e){return function(t){return t({type:r.K}),_.a.get("getPolicyDetails/610a50ec85eac609e29061e3?proposer_ID_refs=".concat(e)).then((function(e){return console.log("fetch renewal details",e.data.errMsg[0]),t((n=e.data.errMsg[0],{type:r.L,RenewalDetails:n}));var n})).catch((function(e){return t(function(e){return{type:r.J,error:e}}(e.response.data.errors))}))}},A=function(e){return function(t){return t({type:r.ub}),a.a.get("user/getleads_team_count/".concat(e)).then((function(e){return t((n=e.data.errMsg,{type:r.vb,home:n}));var n})).catch((function(e){console.log(e)}))}},U=function(e){return function(t){return t({type:r.b}),a.a.get("user/getAppointment/".concat(e,"?set_reminder_prority=high,none,low,medium&now_filter=1")).then((function(e){return console.log("activities data",e),t((n=e.data.errMsg,{type:r.c,activities:n}));var n})).catch((function(e){console.log(e)}))}},R=function(e,t){return function(n){return n({type:r.Q}),a.a.get("user/leadhistory/".concat(e,"?user_id=").concat(t)).then((function(e){if(-1===e.data.errCode){var t=e.data.errMsg;return n((a=t,{type:r.R,history:a}))}throw e;var a})).catch((function(e){return console.log(e),n(function(e){return{type:r.P,error:e}}(e))}))}},J=function(e){return console.log(e),function(t){return t({type:r.fb}),a.a.get("admin/getprodCategory?filter=23&channel=".concat(e)).then((function(e){var n,a=e.data.errMsg;if(console.log(a),-1===e.data.errCode)return t((n=a,{type:r.gb,productCategory:n}));throw a})).catch((function(e){return console.log(e),t(function(e){return{type:r.eb,error:e}}(e))}))}},W=function(e){return function(t){return t({type:r.cb}),a.a.get("user/getproduct/?productType=".concat(e,"&roleCode=SM1")).then((function(e){console.log(e.data.errMsg);var n,a=e.data.errMsg;if(-1===e.data.errCode)return t((n=a,{type:r.db,planName:n}));throw a})).catch((function(e){return console.log(e),t(function(e){return{type:r.bb,error:e}}(e))}))}},E=function(e){return function(t){return t({type:r.p}),a.a.get("user/get-microsite-settings/".concat(e)).then((function(e){console.log(e.data.data[0]);var n,a=e.data.data[0];return t((n=a,{type:r.q,agentDetails:n}))})).catch((function(e){return console.log(e),t(function(e){return{type:r.o,error:e}}(e))}))}},P=function(e){return function(t){return t({type:r.E}),a.a.get("user/microsite/get-about-company-details/".concat(e)).then((function(e){console.log(e);var n,a=e.data.errMsg;return t((n=a,{type:r.F,aboutCompany:n}))})).catch((function(e){return console.log(e),t(function(e){return{type:r.D,error:e}}(e))}))}},V=function(e,t){var n;return n=1===t?0:3*(t-1),function(t){return t({type:r.y}),a.a.get("user/microsite/fetch_blogs/".concat(e,"?skip=").concat(n,"&limit=3")).then((function(e){console.log(e);var n,a=e.data.errMsg;return t((n=a,{type:r.z,blogs:n}))})).catch((function(e){return console.log(e),t(function(e){return{type:r.x,error:e}}(e))}))}}},196:function(e,t,n){"use strict";var r=n(111),a=n.n(r).a.create({baseURL:"https://nodemanipalcigna.iorta.in/secure/sd/user/",headers:{Accept:"application/json","Content-Type":"application/json"}});t.a=a},623:function(e,t,n){},663:function(e,t,n){},770:function(e,t,n){"use strict";n.r(t);var r=n(120),a=n(0),c=n.n(a),s=n(44),o=n(289),i=n(290),d=n(584),l=n(471),u=n(370),p=n(119),j=n(326),f=n(654),b=n(655),h=n(171),g=n(581),x=n(826),y=n(827),O=(n(623),n(663),n(173),n(5)),v=n(2),m=c.a.memo((function(e){e.key,e.id;var t=e.policyId,n=e.proposalType,c=e.proposalStatus,m=e.firstName,M=(e.createdDate,e.submittedDate,e.primaryMobile),N=(Object(s.b)(),Object(O.g)(),Object(a.useState)(window.innerWidth)),w=Object(r.a)(N,2),C=w[0],z=w[1],k=Object(a.useState)(!1),_=Object(r.a)(k,2),S=_[0],I=_[1],L=m.match(/\b(\w)/g);Object(a.useEffect)((function(){var e=function(){return z(window.innerWidth)};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[C]);var D=function(){I(!S)},T=Object(v.jsxs)(o.a,{children:[Object(v.jsx)(i.a,{span:6,children:Object(v.jsx)(j.a,{style:{fontSize:"16px",color:"#08c"}})}),Object(v.jsx)(i.a,{span:18,children:Object(v.jsx)("p",{children:"Create an Event"})}),Object(v.jsx)(i.a,{span:24,children:Object(v.jsx)(d.a,{className:"popover-divider"})}),Object(v.jsx)(i.a,{span:6,children:Object(v.jsx)(f.a,{})}),Object(v.jsx)(i.a,{span:18,children:Object(v.jsx)("p",{children:"Mail"})}),Object(v.jsx)(i.a,{span:24,children:Object(v.jsx)(d.a,{className:"popover-divider"})}),Object(v.jsx)(i.a,{span:6,children:Object(v.jsx)(b.a,{})}),Object(v.jsx)(i.a,{span:18,children:Object(v.jsx)("p",{children:"Call"})})]}),A=Object(v.jsxs)(o.a,{className:"advisor-card",align:"top",justify:"center",children:[Object(v.jsx)(i.a,{span:2,children:Object(v.jsx)(l.a,{size:{xl:40},style:{color:"#ffffff",backgroundColor:"#00ACC1"},children:L})}),Object(v.jsxs)(i.a,{span:12,children:[Object(v.jsx)("p",{className:"paragraph capitalize advisor-name font-bold",children:m}),Object(v.jsxs)("p",{className:"paragraph capitalize app-id-label font-bold",children:["App ID ",Object(v.jsx)("span",{className:"app-id",children:t})]})]}),Object(v.jsx)(i.a,{span:10,children:Object(v.jsxs)(o.a,{justify:"center",align:"middle",children:[Object(v.jsx)(i.a,{span:6,children:Object(v.jsxs)(o.a,{justify:"center",align:"middle",children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:14,offset:6,children:Object(v.jsx)(h.a,{style:{fontSize:"25px"}})})]})}),Object(v.jsx)(i.a,{span:7,children:Object(v.jsxs)(o.a,{justify:"end",align:"middle",children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:20,children:Object(v.jsx)("p",{className:"paragraph capitalize lead-status font-bold",children:c})})]})}),Object(v.jsx)(i.a,{span:9,children:Object(v.jsxs)(o.a,{justify:"end",align:"middle",children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:20,children:Object(v.jsx)("div",{className:"lead-box",children:Object(v.jsx)("p",{className:"paragraph capitalize lead-agent font-bold",children:n})})})]})}),Object(v.jsx)(i.a,{span:2,children:Object(v.jsxs)(o.a,{children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:19,offset:1,children:Object(v.jsx)(u.a,{placement:"leftTop",content:T,trigger:"click",style:{width:"135px"},children:Object(v.jsx)(g.a,{className:"more-icon",style:{fontSize:"30px",marginLeft:"auto",fontWeight:"bold"}})})})]})})]})}),Object(v.jsx)(d.a,{className:"middle-divider"}),Object(v.jsx)(i.a,{span:24,children:Object(v.jsxs)(o.a,{justify:"center",align:"middle",children:[Object(v.jsx)(i.a,{span:18,children:Object(v.jsxs)(o.a,{gutter:[16,24],children:[Object(v.jsxs)(i.a,{span:8,children:[Object(v.jsx)("p",{className:"paragraph adv-detail-label font-bold",children:"MObile No"}),Object(v.jsx)("p",{className:"paragraph adv-text",children:M})]}),Object(v.jsxs)(i.a,{span:8,children:[Object(v.jsx)("p",{className:"paragraph adv-detail-label font-bold",children:"Location"}),Object(v.jsx)("p",{className:"paragraph adv-text",children:"-"})]}),Object(v.jsxs)(i.a,{span:8,children:[Object(v.jsx)("p",{className:"paragraph adv-detail-label font-bold",children:"Status"}),Object(v.jsx)("p",{className:"paragraph adv-text",children:c})]})]})}),Object(v.jsx)(i.a,{span:1,children:Object(v.jsx)(d.a,{className:"upd-divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:5,children:Object(v.jsx)(p.a,{className:"adv-upd-btn",children:"Update"})})]})})]});return C<620&&(A=Object(v.jsxs)(o.a,{className:"advisor-card",align:"center",children:[Object(v.jsx)(i.a,{span:2,children:Object(v.jsx)(l.a,{size:{xl:40},style:{color:"#ffffff",backgroundColor:"#00ACC1"},children:L})}),Object(v.jsxs)(i.a,{span:12,children:[Object(v.jsx)("p",{className:"paragraph capitalize advisor-name font-bold",children:m}),Object(v.jsxs)("p",{className:"paragraph capitalize app-id-label font-bold",children:["App ID ",Object(v.jsx)("span",{className:"app-id",children:t})]})]}),Object(v.jsx)(i.a,{span:10,children:Object(v.jsxs)(o.a,{justify:"center",align:"middle",children:[Object(v.jsx)(i.a,{span:6,children:Object(v.jsxs)(o.a,{justify:"center",align:"middle",children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:14,offset:6,children:Object(v.jsx)(h.a,{style:{fontSize:"25px"}})})]})}),Object(v.jsx)(i.a,{span:7,children:Object(v.jsxs)(o.a,{justify:"end",align:"middle",children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:20,children:Object(v.jsx)("p",{className:"paragraph capitalize lead-status font-bold",children:c})})]})}),Object(v.jsx)(i.a,{span:9,children:Object(v.jsxs)(o.a,{justify:"end",align:"middle",children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:20,children:Object(v.jsx)("div",{className:"lead-box",children:Object(v.jsx)("p",{className:"paragraph capitalize lead-agent font-bold",children:n})})})]})}),Object(v.jsx)(i.a,{span:2,children:Object(v.jsxs)(o.a,{children:[Object(v.jsx)(i.a,{span:4,children:Object(v.jsx)(d.a,{className:"divider",type:"vertical"})}),Object(v.jsx)(i.a,{span:19,offset:1,children:Object(v.jsx)(u.a,{placement:"leftTop",content:T,trigger:"click",style:{width:"135px"},children:Object(v.jsx)(g.a,{className:"more-icon",style:{fontSize:"30px",marginLeft:"auto",fontWeight:"bold"}})})})]})})]})}),Object(v.jsx)(d.a,{className:"middle-divider"}),Object(v.jsx)(i.a,{span:24,children:Object(v.jsxs)(o.a,{justify:"center",align:"middle",children:[Object(v.jsx)(i.a,{span:24,children:Object(v.jsx)(o.a,{gutter:[16,24],children:S&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)(i.a,{span:8,children:[Object(v.jsx)("p",{className:"paragraph adv-detail-label font-bold",children:"MObile No"}),Object(v.jsx)("p",{className:"paragraph adv-text",children:M})]}),Object(v.jsxs)(i.a,{span:8,children:[Object(v.jsx)("p",{className:"paragraph adv-detail-label font-bold",children:"Location"}),Object(v.jsx)("p",{className:"paragraph adv-text",children:"-"})]}),Object(v.jsxs)(i.a,{span:8,children:[Object(v.jsx)("p",{className:"paragraph adv-detail-label font-bold",children:"Status"}),Object(v.jsx)("p",{className:"paragraph adv-text",children:c})]})]})})}),Object(v.jsx)(i.a,{span:18,children:S?Object(v.jsx)(p.a,{className:"adv-upd-btn show-toggle-btn",icon:Object(v.jsx)(y.a,{}),onClick:D,children:"Show Less"}):Object(v.jsx)(p.a,{className:"adv-upd-btn show-toggle-btn",icon:Object(v.jsx)(x.a,{}),style:{boxShadow:"0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%)"},onClick:D,children:"Show More"})}),Object(v.jsx)(i.a,{span:6,children:Object(v.jsx)(p.a,{className:"adv-upd-btn",children:"Update"})})]})})]})),Object(v.jsx)("div",{children:A})}));t.default=m},99:function(e,t,n){"use strict";var r=n(111),a=n.n(r).a.create({baseURL:"https://sdrestnode.iorta.in/secure/sd/",baseURLAgentMicroSite:"https://salesdrivex.iorta.in/",headers:{Accept:"application/json","Content-Type":"application/json"}});t.a=a}}]);
//# sourceMappingURL=64.7b2a72e7.chunk.js.map