import{D as h,W as m}from"./DemoViewport-C-BLVnbl.js";import{h as w,w as _,x as g,o as k,k as f,l as v,e as M,a as e,u as s,v as i,g as y,y as H,r as T,_ as b}from"./index-DiQ17dWH.js";const W={class:"page"},x={class:"page-badge"},L={class:"badge badge-blue"},q=["innerHTML"],C=["innerHTML"],D=["innerHTML"],S=["innerHTML"],E=["innerHTML"],B=w({__name:"QuickStart",setup(I){const{setCode:d}=_(),{t:o}=g(),r=T(null);let t=null;function c(){var a;const n=(a=r.value)==null?void 0:a.container;n&&(t=new m({container:n,isolated:!0}))}function l(){t==null||t.destroy(),c()}function u(){if(!t)return;const n=document.createElement("div");n.style.cssText="padding:20px;font-size:14px;",n.innerHTML='<h3 style="margin:0 0 8px">👋 Hello, World!</h3><p>This is a WebOS-Core window.</p>',t.open({id:"quick-hello",title:"Hello Window",content:n,width:340,height:180})}function p(){if(!t)return;const n=document.createElement("div");n.style.cssText="padding:20px;",n.innerHTML="<p>I am a second window.</p><p>Drag my header to move me.</p><p>Drag edges to resize.</p>",t.open({id:"quick-two",title:"Second Window",content:n,width:280,height:160,x:120,y:80})}return k(()=>{c(),d([{name:"main.ts",lang:"typescript",code:`import { WindowManager } from '@webos/core/WindowManager'

// Create the window manager
// Pass a container element to run in "isolated" mode (confined to that element)
const wm = new WindowManager({
  container: document.getElementById('desktop')!,
  isolated: true,   // windows use position:absolute, constrained to container
})

// Build your content
const content = document.createElement('div')
content.style.padding = '20px'
content.innerHTML = \`
  <h3>Hello, World!</h3>
  <p>This is a WebOS-Core window.</p>
\`

// Open a window
wm.open({
  id: 'hello',        // unique ID — calling open() again restores & focuses
  title: 'Hello Window',
  content,
  width: 340,
  height: 180,
})`},{name:"index.html",lang:"html",code:`<!DOCTYPE html>
<html>
<head>
  <title>Quick Start</title>
</head>
<body>
  <!-- Desktop container — give it a size -->
  <div id="desktop" style="width:100vw; height:100vh; position:relative;"></div>

  <script type="module" src="./main.ts"><\/script>
</body>
</html>`}])}),f(()=>t==null?void 0:t.destroy()),(n,a)=>(v(),M("div",W,[e("div",x,[e("span",L,s(i(o)("quickstart.badge")),1)]),e("h1",null,s(i(o)("quickstart.h1")),1),e("p",{innerHTML:i(o)("quickstart.intro")},null,8,q),y(h,{ref_key:"viewport",ref:r,onReset:l},{controls:H(()=>[e("button",{class:"btn",onClick:u},s(i(o)("quickstart.openWindow")),1),e("button",{class:"btn",onClick:p},s(i(o)("quickstart.openAnother")),1)]),_:1},512),e("p",{innerHTML:i(o)("quickstart.dedup")},null,8,C),e("h2",null,s(i(o)("quickstart.h2How")),1),e("ol",null,[e("li",{innerHTML:i(o)("quickstart.step1")},null,8,D),e("li",{innerHTML:i(o)("quickstart.step2")},null,8,S),e("li",{innerHTML:i(o)("quickstart.step3")},null,8,E)])]))}}),Q=b(B,[["__scopeId","data-v-561bc987"]]);export{Q as default};
