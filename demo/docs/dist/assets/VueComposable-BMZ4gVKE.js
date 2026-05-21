import{u as V}from"./useWindowManager-DIwRRUBg.js";import{D as H}from"./DemoViewport-C-BLVnbl.js";import{h as m,w as D,x as A,m as v,r as p,i as d,o as S,l as u,e as c,a as e,u as r,v as s,g as N,y as I,F as w,p as f,n as B,d as h,b as g,K as E,s as K,j as O,T as R,_ as j}from"./index-DiQ17dWH.js";const F={class:"page"},P={class:"page-badge"},U={class:"badge badge-blue"},$=["innerHTML"],q=["onClick"],G={class:"taskbar"},J={class:"taskbar-label"},Q=["onClick"],X={key:0,class:"taskbar-empty"},Y=["innerHTML"],Z=["innerHTML"],ee=["innerHTML"],ne=["innerHTML"],te={class:"api-table"},oe=["innerHTML"],ie=m({__name:"VueComposable",setup(le){const{setCode:x}=D(),{t:l}=A(),k=p(null);let n=null;const a=p([]),y=v(m({setup(){const o=p(new Date().toLocaleTimeString());return setInterval(()=>{o.value=new Date().toLocaleTimeString()},1e3),()=>d("div",{style:"padding:20px;text-align:center;"},[d("div",{style:"font-size:36px;font-weight:300;letter-spacing:0.05em;"},o.value),d("p",{style:"color:#888;font-size:12px;margin:8px 0 0"},"Live clock component")])}})),_=v(m({setup(){const o=p(0);return()=>d("div",{style:"padding:20px;text-align:center;"},[d("p",{style:"font-size:40px;font-weight:700;margin:0 0 16px;"},String(o.value)),d("div",{style:"display:flex;gap:8px;justify-content:center;"},[d("button",{onClick:()=>o.value--,style:"padding:6px 18px;font-size:16px;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;"},"−"),d("button",{onClick:()=>o.value++,style:"padding:6px 18px;font-size:16px;background:#0078d4;color:#fff;border:none;border-radius:4px;cursor:pointer;"},"+")])])}})),T=v(m({setup(){const o=p("Type your notes here...");return()=>d("textarea",{value:o.value,onInput:t=>{o.value=t.target.value},style:"width:100%;height:100%;padding:12px;border:none;resize:none;font-size:13px;outline:none;font-family:inherit;"})}})),b=[{id:"clock",icon:"🕐",label:"Clock",component:y,title:"Live Clock",width:260,height:130},{id:"counter",icon:"🔢",label:"Counter",component:_,title:"Counter",width:260,height:160},{id:"note",icon:"📝",label:"Notes",component:T,title:"Notes",width:300,height:220}];function M(o){if(!n)return;const t=b.find(i=>i.id===o);n.openVueWindow({id:t.id,title:t.title,component:t.component,width:t.width,height:t.height}),a.value=n.windows.value}function W(o){n&&(o.state.isMinimized?(n.restore(o.id),n.focus(o.id)):o.state.isActive?n.minimize(o.id):n.focus(o.id))}function L(){n==null||n.destroy(),a.value=[],C()}function C(){var i;const o=(i=k.value)==null?void 0:i.container;if(!o)return;n=V({container:o,isolated:!0});const t=n.windows;Object.defineProperty(n,"windows",{get:()=>t}),n.wm.events.on("window:opened",()=>{a.value=n.windows.value}),n.wm.events.on("window:closed",()=>{a.value=n.windows.value}),n.wm.events.on("window:minimized",()=>{a.value=n.windows.value}),n.wm.events.on("window:maximized",()=>{a.value=n.windows.value}),n.wm.events.on("window:restored",()=>{a.value=n.windows.value}),n.wm.events.on("window:focused",()=>{a.value=n.windows.value})}return S(()=>{C(),x([{name:"App.vue",lang:"vue",code:`<script setup lang="ts">
import { useWindowManager } from '@webos/adapters/vue/useWindowManager'
import ClockWindow from './windows/ClockWindow.vue'
import CounterWindow from './windows/CounterWindow.vue'

// All window state + WM methods — reactive & auto-cleanup on unmount
const { windows, openVueWindow, close, minimize, restore, focus } =
  useWindowManager()

function openClock() {
  openVueWindow({ id: 'clock', title: 'Clock', component: ClockWindow })
}
function openCounter() {
  openVueWindow({ id: 'counter', title: 'Counter', component: CounterWindow })
}

function onTaskbarClick(win) {
  if (win.state.isMinimized) { restore(win.id); focus(win.id) }
  else if (win.state.isActive) minimize(win.id)
  else focus(win.id)
}
<\/script>

<template>
  <!-- Taskbar: reactive list of open windows -->
  <div class="taskbar">
    <button
      v-for="win in windows"
      :key="win.id"
      :class="{ active: win.state.isActive }"
      @click="onTaskbarClick(win)"
    >{{ win.state.title }}</button>
  </div>

  <!-- Teleport Vue components into WM-managed DOM nodes -->
  <template v-for="win in windows" :key="win.id">
    <Teleport v-if="win.component" :to="win.bodyEl">
      <KeepAlive>
        <component :is="win.component" v-bind="win.props ?? {}" />
      </KeepAlive>
    </Teleport>
  </template>

  <button @click="openClock">Open Clock</button>
  <button @click="openCounter">Open Counter</button>
</template>`},{name:"ClockWindow.vue",lang:"vue",code:`<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const time = ref(new Date().toLocaleTimeString())
const iv = setInterval(() => { time.value = new Date().toLocaleTimeString() }, 1000)
onUnmounted(() => clearInterval(iv))
<\/script>

<template>
  <div class="clock">
    <div class="time">{{ time }}</div>
  </div>
</template>

<style scoped>
.clock { padding: 20px; text-align: center; }
.time  { font-size: 36px; font-weight: 300; letter-spacing: 0.05em; }
</style>`}])}),(o,t)=>(u(),c("div",F,[e("div",P,[e("span",U,r(s(l)("vuecomp.badge")),1)]),e("h1",null,r(s(l)("vuecomp.h1")),1),e("p",{innerHTML:s(l)("vuecomp.intro")},null,8,$),N(H,{ref_key:"viewport",ref:k,onReset:L},{controls:I(()=>[(u(),c(w,null,f(b,i=>e("button",{class:"btn",key:i.id,onClick:z=>M(i.id)},r(i.icon)+" "+r(i.label),9,q)),64))]),_:1},512),e("div",G,[e("span",J,r(s(l)("vuecomp.taskbarLabel")),1),(u(!0),c(w,null,f(a.value,i=>(u(),c("button",{key:i.id,class:B(["task-btn",{active:i.state.isActive,minimized:i.state.isMinimized}]),onClick:z=>W(i)},r(i.state.title),11,Q))),128)),a.value.length?h("",!0):(u(),c("span",X,r(s(l)("vuecomp.noWindows")),1))]),(u(!0),c(w,null,f(a.value,i=>(u(),c(w,{key:i.id},[i.component?(u(),g(R,{key:0,to:i.bodyEl},[(u(),g(E,null,[(u(),g(K(i.component),O({ref_for:!0},i.props??{}),null,16))],1024))],8,["to"])):h("",!0)],64))),128)),e("h2",null,r(s(l)("vuecomp.h2How")),1),e("ol",null,[e("li",{innerHTML:s(l)("vuecomp.step1")},null,8,Y),e("li",{innerHTML:s(l)("vuecomp.step2")},null,8,Z),e("li",{innerHTML:s(l)("vuecomp.step3")},null,8,ee),e("li",{innerHTML:s(l)("vuecomp.step4")},null,8,ne)]),e("h2",null,r(s(l)("vuecomp.h2Returns")),1),e("table",te,[e("thead",null,[e("tr",null,[e("th",null,r(s(l)("common.name")),1),e("th",null,r(s(l)("common.type")),1),e("th",null,r(s(l)("common.description")),1)])]),e("tbody",null,[e("tr",null,[t[0]||(t[0]=e("td",null,[e("code",null,"windows")],-1)),t[1]||(t[1]=e("td",null,[e("code",null,"ShallowRef<VueWindowEntry[]>")],-1)),e("td",null,r(s(l)("vuecomp.ret.windows")),1)]),e("tr",null,[t[2]||(t[2]=e("td",null,[e("code",null,"wm")],-1)),t[3]||(t[3]=e("td",null,[e("code",null,"WindowManager")],-1)),e("td",null,r(s(l)("vuecomp.ret.wm")),1)]),e("tr",null,[t[4]||(t[4]=e("td",null,[e("code",null,"openVueWindow(config)")],-1)),t[5]||(t[5]=e("td",null,"—",-1)),e("td",null,r(s(l)("vuecomp.ret.openVue")),1)]),e("tr",null,[t[6]||(t[6]=e("td",null,[e("code",null,"close / minimize / maximize / restore / focus")],-1)),t[7]||(t[7]=e("td",null,"—",-1)),e("td",{innerHTML:s(l)("vuecomp.ret.proxies")},null,8,oe)])])])]))}}),ue=j(ie,[["__scopeId","data-v-c9d72d8d"]]);export{ue as default};
