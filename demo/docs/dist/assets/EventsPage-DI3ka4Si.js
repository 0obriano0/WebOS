import{D as S,W as x}from"./DemoViewport-C-BLVnbl.js";import{h as k,w as C,x as L,o as T,k as M,l as r,e as c,a as e,u as o,v as t,g as V,y as N,d as D,F as g,p as h,n as $,r as m,c as A,_ as B}from"./index-DiQ17dWH.js";const H={class:"page"},O={class:"page-badge"},F={class:"badge badge-green"},I=["innerHTML"],P={class:"event-log-header"},R={class:"event-log-body"},U={key:0,class:"log-empty"},j={class:"log-time"},q={class:"log-event"},G={class:"log-id"},J={class:"api-table"},K=k({__name:"EventsPage",setup(Q){const{setCode:b}=C(),{t:n}=L(),u=m(null),f=m(null);let d=null;const l=m([]),_=A(()=>[{name:"window:opened",when:n("events.opened.when"),payload:"WindowState"},{name:"window:closed",when:n("events.closed.when"),payload:"{ id }"},{name:"window:focused",when:n("events.focused.when"),payload:"WindowState"},{name:"window:minimized",when:n("events.minimized.when"),payload:"WindowState"},{name:"window:maximized",when:n("events.maximized.when"),payload:"WindowState"},{name:"window:restored",when:n("events.restored.when"),payload:"WindowState"},{name:"window:moved",when:n("events.moved.when"),payload:"WindowState"},{name:"window:resized",when:n("events.resized.when"),payload:"WindowState"}]),y={"window:opened":"green","window:closed":"red","window:focused":"blue","window:minimized":"orange","window:maximized":"purple","window:restored":"teal","window:moved":"gray","window:resized":"gray"},z=["window:opened","window:closed","window:focused","window:minimized","window:maximized","window:restored","window:moved","window:resized"];function W(){return new Date().toLocaleTimeString("zh-TW",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}function v(){var a;const w=(a=u.value)==null?void 0:a.container;w&&(d=new x({container:w,isolated:!0}),z.forEach(i=>{d.events.on(i,s=>{l.value.unshift({time:W(),event:i,id:(s==null?void 0:s.id)??"",type:y[i]??"gray"}),l.value.length>20&&l.value.pop()})}))}function E(){l.value=[],d==null||d.destroy(),v()}function p(){if(!d)return;const w=document.createElement("div");w.style.cssText="padding:16px;",w.innerHTML="<p>Interact with me — drag, resize, minimize, maximize, close.</p><p>Watch the event log below!</p>",d.open({id:"evt-demo",title:"Event Demo",content:w,width:340,height:160})}return T(()=>{v(),p(),b([{name:"main.ts",lang:"typescript",code:`import { WindowManager } from '@webos/core/WindowManager'
import type { WinEvent, WindowState } from '@webos/core/WindowManager'

const wm = new WindowManager()

// ── Subscribe to a single event ───────────────────────
wm.events.on('window:opened', (state: WindowState) => {
  console.log('opened:', state.id, state.title)
})

wm.events.on('window:closed', (data: { id: string }) => {
  console.log('closed:', data.id)
})

// ── Subscribe to all events ───────────────────────────
const ALL_EVENTS: WinEvent[] = [
  'window:opened',    'window:closed',
  'window:focused',   'window:minimized',
  'window:maximized', 'window:restored',
  'window:moved',     'window:resized',
]

ALL_EVENTS.forEach(ev => {
  wm.events.on(ev, (data: WindowState) => {
    console.log(\`[\${ev}] id=\${data.id}\`)
  })
})

// ── Unsubscribe ───────────────────────────────────────
const handler = (s: WindowState) => console.log(s)
wm.events.on('window:focused', handler)
wm.events.off('window:focused', handler)`}])}),M(()=>d==null?void 0:d.destroy()),(w,a)=>(r(),c("div",H,[e("div",O,[e("span",F,o(t(n)("events.badge")),1)]),e("h1",null,o(t(n)("events.h1")),1),e("p",{innerHTML:t(n)("events.intro")},null,8,I),V(S,{ref_key:"viewport",ref:u,onReset:E},{controls:N(()=>[e("button",{class:"btn",onClick:p},o(t(n)("events.openWindow")),1),e("button",{class:"btn btn-outline",onClick:a[0]||(a[0]=i=>{var s;return(s=t(d))==null?void 0:s.minimize("evt-demo")})},o(t(n)("common.minimize")),1),e("button",{class:"btn btn-outline",onClick:a[1]||(a[1]=i=>{var s;return(s=t(d))==null?void 0:s.maximize("evt-demo")})},o(t(n)("common.maximize")),1),e("button",{class:"btn btn-outline",onClick:a[2]||(a[2]=i=>{var s;return(s=t(d))==null?void 0:s.restore("evt-demo")})},o(t(n)("common.restore")),1),e("button",{class:"btn btn-danger",onClick:a[3]||(a[3]=i=>{var s;return(s=t(d))==null?void 0:s.close("evt-demo")})},o(t(n)("common.close")),1)]),_:1},512),e("div",{class:"event-log",ref_key:"logEl",ref:f},[e("div",P,[e("span",null,o(t(n)("events.logTitle")),1),e("button",{class:"clear-btn",onClick:a[4]||(a[4]=i=>l.value=[])},o(t(n)("common.clear")),1)]),e("div",R,[l.value.length?D("",!0):(r(),c("div",U,o(t(n)("events.logEmpty")),1)),(r(!0),c(g,null,h(l.value,(i,s)=>(r(),c("div",{key:s,class:$(["log-entry",i.type])},[e("span",j,o(i.time),1),e("span",q,o(i.event),1),e("span",G,"["+o(i.id)+"]",1)],2))),128))])],512),e("h2",null,o(t(n)("events.h2All")),1),e("table",J,[e("thead",null,[e("tr",null,[e("th",null,o(t(n)("common.event")),1),e("th",null,o(t(n)("events.th.when")),1),e("th",null,o(t(n)("common.payload")),1)])]),e("tbody",null,[(r(!0),c(g,null,h(_.value,i=>(r(),c("tr",{key:i.name},[e("td",null,[e("code",null,o(i.name),1)]),e("td",null,o(i.when),1),e("td",null,[e("code",null,o(i.payload),1)])]))),128))])])]))}}),Z=B(K,[["__scopeId","data-v-c2d5b296"]]);export{Z as default};
