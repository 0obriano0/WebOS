import{u as L}from"./useWindowManager-DIwRRUBg.js";import{D as H}from"./DemoViewport-C-BLVnbl.js";import{h,w as A,x as W,m as K,i as r,r as v,o as V,l as u,e as c,a as e,u as a,v as t,g as D,y as $,F as m,p as b,n as S,d as _,b as w,K as B,s as E,j as R,T as N,_ as F}from"./index-DiQ17dWH.js";const I={class:"page"},O={class:"page-badge"},P={class:"badge badge-blue"},j=["innerHTML"],U={class:"taskbar"},q={class:"taskbar-label"},G=["onClick"],J={key:0,class:"taskbar-empty"},Q=["innerHTML"],X=["innerHTML"],Y=["innerHTML"],Z={class:"api-table"},ee=["innerHTML"],te=["innerHTML"],ne=["innerHTML"],oe=["innerHTML"],ie=h({__name:"VueKeepAlive",setup(se){const{setCode:g}=A(),{t:n}=W(),f=v(null);let o=null;const p=v([]),y=K(h({setup(){const i=v(0),s=v(["Counter started"]);function l(){i.value++,s.value.unshift(`+1 → ${i.value}`)}function d(){i.value--,s.value.unshift(`-1 → ${i.value}`)}function T(){s.value.unshift(`reset (was ${i.value})`),i.value=0}return()=>r("div",{style:"padding:16px;height:100%;display:flex;flex-direction:column;gap:12px;"},[r("div",{style:"display:flex;align-items:center;gap:16px;"},[r("span",{style:"font-size:36px;font-weight:700;min-width:60px;"},String(i.value)),r("div",{style:"display:flex;gap:6px;"},[r("button",{onClick:d,style:"padding:6px 14px;font-size:16px;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;"},"−"),r("button",{onClick:l,style:"padding:6px 14px;font-size:16px;background:#0078d4;color:#fff;border:none;border-radius:4px;cursor:pointer;"},"+"),r("button",{onClick:T,style:"padding:6px 12px;font-size:12px;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;"},"Reset")])]),r("div",{style:"font-size:11px;color:#888;font-family:monospace;background:#f8fafc;padding:8px;border-radius:4px;overflow-y:auto;flex:1;"},s.value.slice(0,8).map(z=>r("div",z))),r("p",{style:"margin:0;font-size:11px;color:#9ca3af;"},"↑ Minimize and restore — value is preserved!")])}}));function x(){o&&(o.openVueWindow({id:"ka-counter",title:"Keep-Alive Counter",component:y,width:320,height:240}),p.value=o.windows.value)}function C(i){o&&(i.state.isMinimized?(o.restore(i.id),o.focus(i.id)):i.state.isActive?o.minimize(i.id):o.focus(i.id))}function M(){o==null||o.destroy(),p.value=[],k()}function k(){var l;const i=(l=f.value)==null?void 0:l.container;if(!i)return;o=L({container:i,isolated:!0});const s=()=>{p.value=o.windows.value};o.wm.events.on("window:opened",s),o.wm.events.on("window:closed",s),o.wm.events.on("window:minimized",s),o.wm.events.on("window:maximized",s),o.wm.events.on("window:restored",s),o.wm.events.on("window:focused",s)}return V(()=>{k(),g([{name:"App.vue",lang:"vue",code:`<script setup lang="ts">
import { useWindowManager } from '@webos/adapters/vue/useWindowManager'
import CounterWindow from './CounterWindow.vue'

const { windows, openVueWindow, minimize, restore, focus } = useWindowManager()

openVueWindow({
  id: 'counter',
  title: 'Keep-Alive Counter',
  component: CounterWindow,
  width: 320, height: 240,
})
<\/script>

<template>
  <template v-for="win in windows" :key="win.id">
    <Teleport v-if="win.component" :to="win.bodyEl">
      <!--
        KeepAlive wraps the component.
        On minimize → onDeactivated() fires, state preserved.
        On restore  → onActivated() fires, state still there.
      -->
      <KeepAlive>
        <component :is="win.component" v-bind="win.props ?? {}" />
      </KeepAlive>
    </Teleport>
  </template>
</template>`},{name:"CounterWindow.vue",lang:"vue",code:`<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'

// This state PERSISTS across minimize/restore cycles thanks to KeepAlive
const count = ref(0)

// KeepAlive lifecycle hooks (instead of onMounted/onUnmounted)
onActivated(() => {
  console.log('window restored — count is still', count.value)
})
onDeactivated(() => {
  console.log('window minimized — count preserved:', count.value)
})
<\/script>

<template>
  <div class="counter-window">
    <span class="count">{{ count }}</span>
    <div class="btns">
      <button @click="count--">−</button>
      <button @click="count++">+</button>
    </div>
    <p>Minimize and restore — value stays!</p>
  </div>
</template>`}])}),(i,s)=>(u(),c("div",I,[e("div",O,[e("span",P,a(t(n)("keepalive.badge")),1)]),e("h1",null,a(t(n)("keepalive.h1")),1),e("p",{innerHTML:t(n)("keepalive.intro")},null,8,j),D(H,{ref_key:"viewport",ref:f,onReset:M},{controls:$(()=>[e("button",{class:"btn",onClick:x},a(t(n)("keepalive.openCounter")),1),e("button",{class:"btn btn-outline",onClick:s[0]||(s[0]=l=>{var d;return(d=t(o))==null?void 0:d.minimize("ka-counter")})},a(t(n)("common.minimize")),1),e("button",{class:"btn btn-outline",onClick:s[1]||(s[1]=l=>{var d;return(d=t(o))==null?void 0:d.restore("ka-counter")})},a(t(n)("common.restore")),1)]),_:1},512),e("div",U,[e("span",q,a(t(n)("keepalive.taskbarLabel")),1),(u(!0),c(m,null,b(p.value,l=>(u(),c("button",{key:l.id,class:S(["task-btn",{active:l.state.isActive,minimized:l.state.isMinimized}]),onClick:d=>C(l)},a(l.state.title),11,G))),128)),p.value.length?_("",!0):(u(),c("span",J,a(t(n)("keepalive.noWindows")),1))]),(u(!0),c(m,null,b(p.value,l=>(u(),c(m,{key:l.id},[l.component?(u(),w(N,{key:0,to:l.bodyEl},[(u(),w(B,null,[(u(),w(E(l.component),R({ref_for:!0},l.props??{}),null,16))],1024))],8,["to"])):_("",!0)],64))),128)),e("h2",null,a(t(n)("keepalive.h2Try")),1),e("ol",null,[e("li",{innerHTML:t(n)("keepalive.try1")},null,8,Q),e("li",{innerHTML:t(n)("keepalive.try2")},null,8,X),e("li",{innerHTML:t(n)("keepalive.try3")},null,8,Y)]),e("h2",null,a(t(n)("keepalive.h2Comparison")),1),e("table",Z,[e("thead",null,[e("tr",null,[s[2]||(s[2]=e("th",null,null,-1)),e("th",{innerHTML:t(n)("keepalive.th.without")},null,8,ee),e("th",{innerHTML:t(n)("keepalive.th.with")},null,8,te)])]),e("tbody",null,[e("tr",null,[e("td",null,a(t(n)("keepalive.row1.label")),1),e("td",null,a(t(n)("keepalive.row1.without")),1),e("td",null,a(t(n)("keepalive.row1.with")),1)]),e("tr",null,[e("td",null,a(t(n)("keepalive.row2.label")),1),e("td",null,a(t(n)("keepalive.row2.without")),1),e("td",null,a(t(n)("keepalive.row2.with")),1)]),e("tr",null,[e("td",null,a(t(n)("keepalive.row3.label")),1),e("td",{innerHTML:t(n)("keepalive.row3.without")},null,8,ne),e("td",{innerHTML:t(n)("keepalive.row3.with")},null,8,oe)])])])]))}}),ue=F(ie,[["__scopeId","data-v-a6700e90"]]);export{ue as default};
