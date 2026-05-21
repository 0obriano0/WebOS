import{D as T,W as M}from"./DemoViewport-C-BLVnbl.js";import{h as v,w as C,x as L,o as E,k as H,l as D,e as $,a as e,u as s,v as d,g as k,y as P,r as W,_ as B}from"./index-DiQ17dWH.js";const S={class:"page"},z={class:"page-badge"},F={class:"badge badge-gray"},N=["innerHTML"],j=["innerHTML"],A={class:"api-table"},G=["innerHTML"],O=["innerHTML"],I=v({__name:"DomContent",setup(V){const{setCode:x}=C(),{t:n}=L(),u=W(null);let o=null,r=0;function b(){var t;const i=(t=u.value)==null?void 0:t.container;i&&(o=new M({container:i,isolated:!0}),r=0)}function h(){o==null||o.destroy(),b()}function c(){return{x:20+r%4*40,y:20+r%3*30}}function f(){if(!o)return;const i=c();r++;const t=document.createElement("div");t.style.cssText="padding:16px; line-height:1.7;",t.innerHTML=`
    <h3 style="margin:0 0 8px">Plain Text</h3>
    <p>Any HTML string can be set via <code>innerHTML</code>.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`,o.open({id:`text-${r}`,title:"Text Window",content:t,width:300,height:180,...i})}function g(){if(!o)return;const i=c();r++;const t=document.createElement("form");t.style.cssText="padding:16px; display:flex; flex-direction:column; gap:10px;",t.innerHTML=`
    <label style="font-size:12px;font-weight:600">Name</label>
    <input type="text" placeholder="Enter name..." style="padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;">
    <label style="font-size:12px;font-weight:600">Email</label>
    <input type="email" placeholder="user@example.com" style="padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;">
    <button type="submit" style="padding:6px;background:#0078d4;color:#fff;border:none;border-radius:4px;cursor:pointer;">Submit</button>`,t.addEventListener("submit",a=>{a.preventDefault(),alert("Submitted!")}),o.open({id:`form-${r}`,title:"Form Window",content:t,width:280,height:230,...i})}function y(){if(!o)return;const i=c();r++;const t=document.createElement("div");t.style.cssText="overflow:auto;",t.innerHTML=`
    <table style="width:100%;border-collapse:collapse;font-size:12px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:left">Name</th>
          <th style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:left">Status</th>
          <th style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right">Score</th>
        </tr>
      </thead>
      <tbody>
        ${["Alice","Bob","Carol","Dave"].map((a,l)=>`
          <tr>
            <td style="padding:7px 12px;border-bottom:1px solid #f3f4f6">${a}</td>
            <td style="padding:7px 12px;border-bottom:1px solid #f3f4f6">
              <span style="padding:2px 8px;border-radius:12px;font-size:11px;background:${l%2?"#dcfce7":"#dbeafe"};color:${l%2?"#166534":"#1d4ed8"}">${l%2?"Active":"Pending"}</span>
            </td>
            <td style="padding:7px 12px;border-bottom:1px solid #f3f4f6;text-align:right">${Math.floor(Math.random()*100)}</td>
          </tr>`).join("")}
      </tbody>
    </table>`,o.open({id:`table-${r}`,title:"Table Window",content:t,width:320,height:200,...i})}function w(){if(!o)return;const i=c();r++;const t=document.createElement("div");t.style.cssText="padding:16px;",t.innerHTML='<p style="margin:0 0 8px;font-size:12px;font-weight:600">Processing...</p>';const a=document.createElement("div");a.style.cssText="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;";const l=document.createElement("div");l.style.cssText="height:100%;background:#0078d4;border-radius:4px;width:0;transition:width 0.1s;",a.appendChild(l),t.appendChild(a);const m=document.createElement("p");m.style.cssText="margin:8px 0 0;font-size:11px;color:#888;",m.textContent="0%",t.appendChild(m),o.open({id:`prog-${r}`,title:"Progress Demo",content:t,width:260,height:120,...i});let p=0;const _=setInterval(()=>{p=Math.min(100,p+Math.random()*8),l.style.width=`${p}%`,m.textContent=`${Math.floor(p)}%${p>=100?" — Done!":""}`,p>=100&&clearInterval(_)},120)}return E(()=>{b(),x([{name:"main.ts",lang:"typescript",code:`import { WindowManager } from '@webos/core/WindowManager'

const wm = new WindowManager()

// ── Pattern 1: Pass content at open() time ─────────────
const form = document.createElement('form')
form.innerHTML = \`
  <input type="text" placeholder="Name" />
  <button type="submit">Submit</button>
\`
wm.open({ id: 'form-win', title: 'Form', content: form })

// ── Pattern 2: getBodyElement() — attach content after open() ──
// Useful for 3rd-party widgets that need an already-attached DOM node
wm.open({
  id: 'grid-win',
  title: 'Data Grid',
  content: null,   // no content yet
  slotType: 'dom',
})

const body = wm.getBodyElement('grid-win')!

// Attach a Wijmo FlexGrid (or any widget)
// const grid = new FlexGrid(body, { itemsSource: data })

// Or jQuery
// $(body).wijgrid({ columns: [...] })

// Or plain DOM
const table = document.createElement('table')
body.appendChild(table)`}])}),H(()=>o==null?void 0:o.destroy()),(i,t)=>(D(),$("div",S,[e("div",z,[e("span",F,s(d(n)("dom.badge")),1)]),e("h1",null,s(d(n)("dom.h1")),1),e("p",{innerHTML:d(n)("dom.intro")},null,8,N),k(T,{ref_key:"viewport",ref:u,onReset:h},{controls:P(()=>[e("button",{class:"btn",onClick:f},s(d(n)("dom.btnText")),1),e("button",{class:"btn",onClick:g},s(d(n)("dom.btnForm")),1),e("button",{class:"btn",onClick:y},s(d(n)("dom.btnTable")),1),e("button",{class:"btn",onClick:w},s(d(n)("dom.btnProgress")),1)]),_:1},512),e("h2",null,s(d(n)("dom.h2GetBody")),1),e("p",{innerHTML:d(n)("dom.getBodyDesc")},null,8,j),e("table",A,[e("thead",null,[e("tr",null,[e("th",null,s(d(n)("dom.th.pattern")),1),e("th",null,s(d(n)("dom.th.usage")),1)])]),e("tbody",null,[e("tr",null,[e("td",{innerHTML:d(n)("dom.pattern1")},null,8,G),e("td",null,s(d(n)("dom.pattern1.desc")),1)]),e("tr",null,[e("td",{innerHTML:d(n)("dom.pattern2")},null,8,O),e("td",null,s(d(n)("dom.pattern2.desc")),1)])])])]))}}),R=B(I,[["__scopeId","data-v-85439b9c"]]);export{R as default};
