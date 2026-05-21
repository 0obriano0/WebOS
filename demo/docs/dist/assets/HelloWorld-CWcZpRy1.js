import{D as p,W as u}from"./DemoViewport-C-BLVnbl.js";import{h as m,w as g,x as _,o as w,k as f,l as y,e as x,a as e,u as i,v as n,g as H,y as M,r as b,_ as v}from"./index-DiQ17dWH.js";const W={class:"page"},T={class:"page-badge"},L={class:"badge badge-gray"},C=["innerHTML"],k=["innerHTML"],B=["innerHTML"],D=["innerHTML"],E=m({__name:"HelloWorld",setup(O){const{setCode:d}=g(),{t}=_(),a=b(null);let o=null;function r(){var s;const l=(s=a.value)==null?void 0:s.container;l&&(o=new u({container:l,isolated:!0}))}function c(){o==null||o.destroy(),r()}function h(){if(!o)return;const l=document.createElement("div");l.style.cssText="padding:24px; text-align:center;",l.innerHTML=`
    <div style="font-size:48px;margin-bottom:8px">👋</div>
    <h2 style="margin:0 0 8px;font-size:18px">Hello, World!</h2>
    <p style="color:#888;margin:0">Built with WebOS-Core</p>`,o.open({id:"hello-world",title:"Hello World",content:l,width:280,height:200,x:60,y:50})}return w(()=>{r(),d([{name:"main.ts",lang:"typescript",code:`import { WindowManager } from '@webos/core/WindowManager'

// Create the window manager
const wm = new WindowManager()

// Build content — any HTMLElement works
const content = document.createElement('div')
content.style.cssText = 'padding: 24px; text-align: center;'
content.innerHTML = \`
  <div style="font-size: 48px; margin-bottom: 8px">👋</div>
  <h2>Hello, World!</h2>
  <p>Built with WebOS-Core</p>
\`

// Open the window
wm.open({
  id: 'hello-world',   // unique ID
  title: 'Hello World',
  content,
  width: 280,
  height: 200,
  x: 60,               // optional: initial left position
  y: 50,               // optional: initial top position
})

// Close it later
// wm.close('hello-world')`},{name:"index.html",lang:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hello World — WebOS-Core</title>
</head>
<body style="margin:0; width:100vw; height:100vh; overflow:hidden;">
  <!-- No container needed — defaults to document.body -->
  <script type="module" src="./main.ts"><\/script>
</body>
</html>`}])}),f(()=>o==null?void 0:o.destroy()),(l,s)=>(y(),x("div",W,[e("div",T,[e("span",L,i(n(t)("hello.badge")),1)]),e("h1",null,i(n(t)("hello.h1")),1),e("p",{innerHTML:n(t)("hello.intro")},null,8,C),H(p,{ref_key:"viewport",ref:a,onReset:c},{controls:M(()=>[e("button",{class:"btn",onClick:h},i(n(t)("hello.openHello")),1)]),_:1},512),e("h2",null,i(n(t)("hello.h2Notes")),1),e("ul",null,[e("li",{innerHTML:n(t)("hello.note1")},null,8,k),e("li",{innerHTML:n(t)("hello.note2")},null,8,B),e("li",null,i(n(t)("hello.note3")),1),e("li",{innerHTML:n(t)("hello.note4")},null,8,D)])]))}}),z=v(E,[["__scopeId","data-v-0eb35537"]]);export{z as default};
