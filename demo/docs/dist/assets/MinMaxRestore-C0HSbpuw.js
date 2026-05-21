import{D as w,W as x}from"./DemoViewport-C-BLVnbl.js";import{h as M,w as z,x as f,o as b,k as g,l as h,e as _,a as e,u as s,v as n,g as v,y,r as T,_ as L}from"./index-DiQ17dWH.js";const C={class:"page"},H={class:"page-badge"},W={class:"badge badge-green"},k=["innerHTML"],D={class:"api-table"},S=["innerHTML"],I=["innerHTML"],R=["innerHTML"],A=M({__name:"MinMaxRestore",setup(B){const{setCode:c}=z(),{t:i}=f(),r=T(null);let o=null;function l(){var t;const m=(t=r.value)==null?void 0:t.container;m&&(o=new x({container:m,isolated:!0}))}function p(){o==null||o.destroy(),l()}function d(){if(!o)return;const m=document.createElement("div");m.style.cssText="padding:16px;",m.innerHTML=`
    <p>Use the buttons above to:</p>
    <ul style="margin:8px 0;padding-left:20px;">
      <li>Minimize — hides this window</li>
      <li>Maximize — fills the demo area</li>
      <li>Restore — returns to this size</li>
    </ul>
    <p style="color:#888;font-size:12px">
      Try: maximize → minimize → restore<br>
      → should return to maximized state!
    </p>`,o.open({id:"demo",title:"State Demo Window",content:m,width:360,height:220})}return b(()=>{l(),d(),c([{name:"main.ts",lang:"typescript",code:`import { WindowManager } from '@webos/core/WindowManager'

const wm = new WindowManager()

// Open a window first
wm.open({ id: 'w1', title: 'My Window', content })

// Minimize — hides the window (DOM preserved, state intact)
wm.minimize('w1')

// Maximize — fills available space
// Saves current geometry for later restore
wm.maximize('w1')

// Restore:
//   • If was only minimized → returns to floating size
//   • If was maximized when minimized → returns to MAXIMIZED
//     (smart restore — state machine aware)
wm.restore('w1')

// ── State inspection ──────────────────────────────────
const state = wm.getState('w1')
// state.isMinimized  boolean
// state.isMaximized  boolean
// state.isActive     boolean
// state.x, state.y, state.width, state.height`}])}),g(()=>o==null?void 0:o.destroy()),(m,t)=>(h(),_("div",C,[e("div",H,[e("span",W,s(n(i)("minmax.badge")),1)]),e("h1",null,s(n(i)("minmax.h1")),1),e("p",{innerHTML:n(i)("minmax.intro")},null,8,k),v(w,{ref_key:"viewport",ref:r,onReset:p},{controls:y(()=>[e("button",{class:"btn",onClick:d},s(n(i)("minmax.openWindow")),1),e("button",{class:"btn btn-outline",onClick:t[0]||(t[0]=u=>{var a;return(a=n(o))==null?void 0:a.minimize("demo")})},s(n(i)("common.minimize")),1),e("button",{class:"btn btn-outline",onClick:t[1]||(t[1]=u=>{var a;return(a=n(o))==null?void 0:a.maximize("demo")})},s(n(i)("common.maximize")),1),e("button",{class:"btn btn-outline",onClick:t[2]||(t[2]=u=>{var a;return(a=n(o))==null?void 0:a.restore("demo")})},s(n(i)("common.restore")),1)]),_:1},512),e("h2",null,s(n(i)("minmax.h2State")),1),t[6]||(t[6]=e("pre",{class:"state-diagram"},`  ┌─────────────┐  minimize()   ┌─────────────┐
  │  Normal     │──────────────▶│  Minimized  │
  │  (floating) │◀──────────────│             │
  └──────┬──────┘   restore()   └─────────────┘
         │                             ▲
         │ maximize()                  │ restore()
         ▼                             │  (returns to maximized if was maximized)
  ┌─────────────┐  minimize()   ┌──────┴──────┐
  │  Maximized  │──────────────▶│  Min+Max    │
  │  (fills     │               │  (was max)  │
  │   container)│◀──────────────└─────────────┘
  └─────────────┘   restore()
    `,-1)),e("h2",null,s(n(i)("minmax.h2Api")),1),e("table",D,[e("thead",null,[e("tr",null,[e("th",null,s(n(i)("common.method")),1),e("th",null,s(n(i)("minmax.th.stateChange")),1)])]),e("tbody",null,[e("tr",null,[t[3]||(t[3]=e("td",null,[e("code",null,"wm.minimize(id)")],-1)),e("td",{innerHTML:n(i)("minmax.min.desc")},null,8,S)]),e("tr",null,[t[4]||(t[4]=e("td",null,[e("code",null,"wm.maximize(id)")],-1)),e("td",{innerHTML:n(i)("minmax.max.desc")},null,8,I)]),e("tr",null,[t[5]||(t[5]=e("td",null,[e("code",null,"wm.restore(id)")],-1)),e("td",{innerHTML:n(i)("minmax.restore.desc")},null,8,R)])])])]))}}),V=L(A,[["__scopeId","data-v-b055f7a4"]]);export{V as default};
