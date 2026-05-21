import{D as f,W as y}from"./DemoViewport-C-BLVnbl.js";import{h as b,w as M,x as v,o as x,k as C,l as u,e as _,a as e,u as t,v as n,g as L,y as T,F as H,p as W,r as k,_ as I}from"./index-DiQ17dWH.js";const S={class:"page"},D={class:"page-badge"},V={class:"badge badge-green"},$=["innerHTML"],E=["onClick"],N={class:"api-table"},O=["innerHTML"],R=["innerHTML"],z=["innerHTML"],B=b({__name:"OpenClose",setup(A){const{setCode:h}=M(),{t:o}=v(),a=k(null);let s=null;const d=["Sales Report","User Settings","Log Viewer"],m=["📊","⚙️","📋"];function p(){var i;const l=(i=a.value)==null?void 0:i.container;l&&(s=new y({container:l,isolated:!0}))}function g(){s==null||s.destroy(),p()}function w(l){if(!s)return;const i=`win-${l}`,c=document.createElement("div");c.style.cssText="padding:16px;",c.innerHTML=`<p style="margin:0;font-size:24px">${m[l-1]}</p>
    <p><strong>${d[l-1]}</strong></p>
    <p style="color:#888;font-size:12px">id: "${i}"</p>`,s.open({id:i,title:d[l-1],content:c,width:260,height:160})}return x(()=>{p(),h([{name:"main.ts",lang:"typescript",code:`import { WindowManager } from '@webos/core/WindowManager'

const wm = new WindowManager()

// ── open() ────────────────────────────────────────────
const content = document.createElement('div')
content.textContent = 'Window content'

const state = wm.open({
  id: 'report',          // unique identifier
  title: 'Sales Report',
  content,
  x: 80,   y: 60,        // initial position (optional — cascades if omitted)
  width: 480, height: 360,
})

// Calling open() again with the same id:
// → restores if minimized, then focuses. No duplicate window created.
wm.open({ id: 'report', title: 'Sales Report', content })

// ── close() ───────────────────────────────────────────
wm.close('report')    // remove one window

// ── destroy() — close all ──────────────────────────────
wm.destroy()`}])}),C(()=>s==null?void 0:s.destroy()),(l,i)=>(u(),_("div",S,[e("div",D,[e("span",V,t(n(o)("openclose.badge")),1)]),e("h1",null,t(n(o)("openclose.h1")),1),e("p",{innerHTML:n(o)("openclose.intro")},null,8,$),L(f,{ref_key:"viewport",ref:a,onReset:g},{controls:T(()=>[(u(),_(H,null,W([1,2,3],c=>e("button",{class:"btn",key:c,onClick:r=>w(c)},t(n(o)("openclose.openWin"))+" "+t(c),9,E)),64)),e("button",{class:"btn btn-danger",onClick:i[0]||(i[0]=c=>{var r;return(r=n(s))==null?void 0:r.destroy()})},t(n(o)("openclose.closeAll")),1)]),_:1},512),e("h2",null,t(n(o)("openclose.h2Open")),1),e("table",N,[e("thead",null,[e("tr",null,[e("th",null,t(n(o)("openclose.th.behaviour")),1),e("th",null,t(n(o)("common.description")),1)])]),e("tbody",null,[e("tr",null,[e("td",null,t(n(o)("openclose.newId")),1),e("td",null,t(n(o)("openclose.newId.desc")),1)]),e("tr",null,[e("td",null,t(n(o)("openclose.existId")),1),e("td",{innerHTML:n(o)("openclose.existId.desc")},null,8,O)]),e("tr",null,[e("td",null,t(n(o)("openclose.retVal")),1),e("td",{innerHTML:n(o)("openclose.retVal.desc")},null,8,R)])])]),e("h2",null,t(n(o)("openclose.h2Close")),1),e("p",null,t(n(o)("openclose.closeDesc")),1),e("p",{innerHTML:n(o)("openclose.closeAllDesc")},null,8,z)]))}}),q=I(B,[["__scopeId","data-v-a476e0cc"]]);export{q as default};
