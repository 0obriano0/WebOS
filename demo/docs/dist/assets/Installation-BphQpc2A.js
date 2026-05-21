import{D as h,W as f}from"./DemoViewport-C-BLVnbl.js";import{h as W,w as k,x as S,o as E,k as T,l as u,e as p,a as e,u as o,v as l,n as b,d as g,g as x,y as H,r as v,_ as C}from"./index-DiQ17dWH.js";const L={class:"page"},D={class:"page-badge"},j={class:"badge badge-blue"},U=["innerHTML"],z={class:"tab-bar"},B={key:0,class:"panel"},O=["innerHTML"],I=["innerHTML"],V={key:1,class:"panel"},$=["innerHTML"],q=["innerHTML"],K={class:"api-table"},N={style:{"margin-top":"32px"}},A=["innerHTML"],P={class:"api-table"},Q=["innerHTML"],R=W({__name:"Installation",setup(G){const{setCode:M}=k(),{t:n}=S(),m=v(null);let s=null;const i=v("esm");function c(){var t;const d=(t=m.value)==null?void 0:t.container;d&&(s=new f({container:d,isolated:!0}))}function y(){s==null||s.destroy(),c()}function w(d,t,r){if(!s)return;const a=document.createElement("div");a.style.cssText="padding:20px;",a.innerHTML=`
    <div style="display:inline-block;background:${r};color:#fff;padding:4px 10px;border-radius:4px;font-size:12px;margin-bottom:8px">
      ${i.value==="esm"?"ESM import":"UMD script tag"}
    </div>
    <p style="margin:0;font-size:13px">This window was created by <strong>WindowManager</strong>.</p>
    <p style="margin:8px 0 0;font-size:12px;color:#888">Both ES6 and ES5 produce the same result.</p>
  `,s.open({id:d,title:t,content:a,width:320,height:170})}return E(()=>{c(),M([{name:"ES6 (ESM)",lang:"typescript",code:`// ── ES6 / ESM ──────────────────────────────────────
// Works with Vite, Webpack, Rollup, or native <script type="module">

import { WindowManager } from './dist/webos-core.es.js'

const wm = new WindowManager({
  container: document.getElementById('desktop')!,
  isolated: true,
})

const el = document.createElement('div')
el.style.padding = '20px'
el.innerHTML = '<h3>Hello from ESM!</h3>'

wm.open({ id: 'w1', title: 'ESM Window', content: el })`},{name:"ES5 (UMD)",lang:"html",code:`<!-- ── ES5 / UMD ─────────────────────────────────── -->
<!-- Works in any browser — no build step required      -->

<!DOCTYPE html>
<html>
<body>
  <div id="desktop" style="width:100vw;height:100vh;position:relative;"></div>

  <!-- Step 1: load the UMD bundle -->
  <script src="dist/webos-core.umd.js"><\/script>

  <!-- Step 2: use window.WebOS -->
  <script>
    var wm = new window.WebOS.WindowManager({
      container: document.getElementById('desktop'),
      isolated: true,
    })

    var el = document.createElement('div')
    el.style.padding = '20px'
    el.innerHTML = '<h3>Hello from UMD!</h3>'

    wm.open({ id: 'w1', title: 'UMD Window', content: el })
  <\/script>
</body>
</html>`},{name:"Vue 3 (ESM)",lang:"typescript",code:`<!-- ── Vue 3 integration ─────────────────────────── -->
<!-- Add to vite.config.ts:
     resolve: { alias: { '@webos': '/path/to/webos-core/src' } }
-->

<template>
  <div ref="desktop" class="desktop">
    <button @click="openClock">Open Clock</button>

    <Teleport v-for="win in windows" :key="win.id" :to="win.bodyEl">
      <KeepAlive>
        <ClockWindow />
      </KeepAlive>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Teleport } from 'vue'
import { useWindowManager } from '@webos/adapters/vue/useWindowManager'
import ClockWindow from './ClockWindow.vue'

const { wm, windows, desktop } = useWindowManager()

function openClock() {
  wm.value?.open({ id: 'clock', title: 'Clock' })
}
<\/script>`}])}),T(()=>s==null?void 0:s.destroy()),(d,t)=>(u(),p("div",L,[e("div",D,[e("span",j,o(l(n)("install.badge")),1)]),e("h1",null,o(l(n)("install.h1")),1),e("p",{innerHTML:l(n)("install.intro")},null,8,U),e("div",z,[e("button",{class:b(["tab",{active:i.value==="esm"}]),onClick:t[0]||(t[0]=r=>i.value="esm")},o(l(n)("install.tabEsm")),3),e("button",{class:b(["tab",{active:i.value==="umd"}]),onClick:t[1]||(t[1]=r=>i.value="umd")},o(l(n)("install.tabUmd")),3)]),i.value==="esm"?(u(),p("section",B,[e("h2",{innerHTML:l(n)("install.esm.h2")},null,8,O),e("p",{innerHTML:l(n)("install.esm.intro")},null,8,I),e("h3",null,o(l(n)("install.esm.h3Step1")),1),t[4]||(t[4]=e("pre",{class:"code-block"},"cp dist/webos-core.es.js  your-project/lib/",-1)),e("h3",null,o(l(n)("install.esm.h3Step2")),1),t[5]||(t[5]=e("pre",{class:"code-block"},`// main.ts  (TypeScript / bundler)
import { WindowManager } from './lib/webos-core.es.js'

const wm = new WindowManager({ container: document.getElementById('desktop')! })

const el = document.createElement('div')
el.style.padding = '20px'
el.textContent = 'Hello from ESM!'

wm.open({ id: 'w1', title: 'ESM Window', content: el })`,-1)),e("h3",null,o(l(n)("install.esm.h3Step3")),1),t[6]||(t[6]=e("pre",{class:"code-block"},`<!-- index.html -->
<script type="module">
  import { WindowManager } from './dist/webos-core.es.js'

  const wm = new WindowManager({ container: document.body })
  const el = document.createElement('div')
  el.style.padding = '20px'
  el.textContent = 'Hello!'
  wm.open({ id: 'w1', title: 'My Window', content: el })
<\/script>`,-1)),e("h3",null,o(l(n)("install.esm.h3Step4")),1),t[7]||(t[7]=e("pre",{class:"code-block"},`// The Vue adapter is in the source tree; import it through your bundler alias:
import { useWindowManager } from '@webos/adapters/vue/useWindowManager'

// In a vite project, add to vite.config.ts:
// resolve: { alias: { '@webos': path.resolve(__dirname, 'path/to/webos-core/src') } }`,-1)),e("h3",null,o(l(n)("install.esm.h3Types")),1),t[8]||(t[8]=e("pre",{class:"code-block"},`// dist/index.d.ts is generated automatically.
// In tsconfig.json:
{
  "compilerOptions": {
    "paths": {
      "@webos/core/*": ["./node_modules/webos-core/dist/*"]
    }
  }
}`,-1))])):g("",!0),i.value==="umd"?(u(),p("section",V,[e("h2",{innerHTML:l(n)("install.umd.h2")},null,8,$),e("p",{innerHTML:l(n)("install.umd.intro")},null,8,q),e("h3",null,o(l(n)("install.umd.h3Basic")),1),t[13]||(t[13]=e("pre",{class:"code-block"},`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>WebOS-Core UMD Demo</title>
</head>
<body>
  <div id="desktop" style="width:100vw;height:100vh;position:relative;"></div>

  <!-- 1. Load the bundle -->
  <script src="dist/webos-core.umd.js"><\/script>

  <!-- 2. Use it — no import needed -->
  <script>
    var WindowManager = window.WebOS.WindowManager

    var wm = new WindowManager({
      container: document.getElementById('desktop'),
      isolated: true
    })

    var el = document.createElement('div')
    el.style.padding = '20px'
    el.innerHTML = '<b>Hello from UMD!</b><p>No build step required.</p>'

    wm.open({ id: 'w1', title: 'UMD Window', content: el, width: 300, height: 160 })
  <\/script>
</body>
</html>`,-1)),e("h3",null,o(l(n)("install.umd.h3jQuery")),1),t[14]||(t[14]=e("pre",{class:"code-block"},`<script src="https://code.jquery.com/jquery-3.7.1.min.js"><\/script>
<script src="dist/webos-core.umd.js"><\/script>
<script>
  var wm = new window.WebOS.WindowManager({ container: document.body })

  wm.on('open', function(win) {
    // jQuery plugin on the window body element
    $(wm.getBodyElement(win.id)).someJQueryPlugin({ option: true })
  })

  wm.open({ id: 'jq-grid', title: 'Grid Window', content: document.createElement('div') })
<\/script>`,-1)),e("h3",null,o(l(n)("install.umd.h3Globals")),1),e("table",K,[e("thead",null,[e("tr",null,[e("th",null,o(l(n)("install.globals.path")),1),e("th",null,o(l(n)("install.globals.type")),1),e("th",null,o(l(n)("common.description")),1)])]),e("tbody",null,[e("tr",null,[t[9]||(t[9]=e("td",null,[e("code",null,"window.WebOS.WindowManager")],-1)),t[10]||(t[10]=e("td",null,"class",-1)),e("td",null,o(l(n)("install.globals.wm")),1)]),e("tr",null,[t[11]||(t[11]=e("td",null,[e("code",null,"window.WebOS.DOMRenderer")],-1)),t[12]||(t[12]=e("td",null,"class",-1)),e("td",null,o(l(n)("install.globals.renderer")),1)])])])])):g("",!0),e("h2",N,o(l(n)("install.h2Demo")),1),e("p",{innerHTML:l(n)("install.demoIntro")},null,8,A),x(h,{ref_key:"viewport",ref:m,onReset:y},{controls:H(()=>[e("button",{class:"btn",onClick:t[2]||(t[2]=r=>w("esm-demo-1","ESM Window","#4a9eff"))},o(l(n)("install.openEsm")),1),e("button",{class:"btn btn-alt",onClick:t[3]||(t[3]=r=>w("esm-demo-2","Second Window","#27ae60"))},o(l(n)("install.openSecond")),1)]),_:1},512),e("h2",null,o(l(n)("install.h2Sizes")),1),e("table",P,[e("thead",null,[e("tr",null,[e("th",null,o(l(n)("install.sizes.file")),1),e("th",null,o(l(n)("install.sizes.format")),1),e("th",null,o(l(n)("install.sizes.size")),1),e("th",null,o(l(n)("install.sizes.use")),1)])]),e("tbody",null,[e("tr",null,[t[15]||(t[15]=e("td",null,[e("code",null,"dist/webos-core.es.js")],-1)),t[16]||(t[16]=e("td",null,"ESM",-1)),t[17]||(t[17]=e("td",null,"~24 KB",-1)),e("td",{innerHTML:l(n)("install.sizes.es.use")},null,8,Q)]),e("tr",null,[t[18]||(t[18]=e("td",null,[e("code",null,"dist/webos-core.umd.js")],-1)),t[19]||(t[19]=e("td",null,"UMD",-1)),t[20]||(t[20]=e("td",null,"~26 KB",-1)),e("td",null,o(l(n)("install.sizes.umd.use")),1)]),e("tr",null,[t[21]||(t[21]=e("td",null,[e("code",null,"dist/index.d.ts")],-1)),t[22]||(t[22]=e("td",null,"TypeScript",-1)),t[23]||(t[23]=e("td",null,"~4 KB",-1)),e("td",null,o(l(n)("install.sizes.dts.use")),1)])])])]))}}),F=C(R,[["__scopeId","data-v-b5e98085"]]);export{F as default};
