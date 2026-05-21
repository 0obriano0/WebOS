import{h as E,l as b,e as y,a as w,q as M,r as L,_ as S}from"./index-DiQ17dWH.js";class B{constructor(){this._listeners=new Map}on(t,e){return this._listeners.has(t)||this._listeners.set(t,new Set),this._listeners.get(t).add(e),()=>this.off(t,e)}off(t,e){var s;(s=this._listeners.get(t))==null||s.delete(e)}emit(t,e){var s;(s=this._listeners.get(t))==null||s.forEach(i=>{try{i(e)}catch(n){console.error(`[EventBus] Error in handler for "${t}":`,n)}})}clear(t){this._listeners.delete(t)}clearAll(){this._listeners.clear()}}function R(o,t){let e=0;return function(...s){const i=performance.now();i-e>=t&&(e=i,o.apply(this,s))}}class C{constructor(t,e,s={}){this._dragging=!1,this._dragOffX=0,this._dragOffY=0,this._resizing=!1,this._resizeEdge=null,this._resizeStartX=0,this._resizeStartY=0,this._resizeStartRect={x:0,y:0,w:0,h:0},this._winEl=t,this._headerEl=e,this._opts={throttleMs:s.throttleMs??16,resizeBorderPx:s.resizeBorderPx??8,minWidth:s.minWidth??200,minHeight:s.minHeight??120,containerEl:s.containerEl,onDragStart:s.onDragStart??(()=>{}),onDrag:s.onDrag??(()=>{}),onDragEnd:s.onDragEnd??(()=>{}),onResizeStart:s.onResizeStart??(()=>{}),onResize:s.onResize??(()=>{}),onResizeEnd:s.onResizeEnd??(()=>{})};const i=R(this._handleMove.bind(this),this._opts.throttleMs);this._onMouseMoveBound=i,this._onMouseUpBound=this._handleUp.bind(this),this._onTouchMoveBound=n=>{const d=n.touches[0];i({clientX:d.clientX,clientY:d.clientY})},this._onTouchEndBound=this._handleUp.bind(this),this._attachEvents()}_attachEvents(){this._headerEl.addEventListener("mousedown",this._onHeaderMouseDown.bind(this)),this._headerEl.addEventListener("touchstart",this._onHeaderTouchStart.bind(this),{passive:!0}),this._winEl.addEventListener("mousedown",this._onWinMouseDown.bind(this)),this._winEl.addEventListener("mousemove",this._updateResizeCursor.bind(this))}_onHeaderMouseDown(t){t.target.closest(".wos-btn")||(t.preventDefault(),this._startDrag(t.clientX,t.clientY),document.addEventListener("mousemove",this._onMouseMoveBound),document.addEventListener("mouseup",this._onMouseUpBound,{once:!0}))}_onHeaderTouchStart(t){const e=t.touches[0];this._startDrag(e.clientX,e.clientY),document.addEventListener("touchmove",this._onTouchMoveBound,{passive:!0}),document.addEventListener("touchend",this._onTouchEndBound,{once:!0})}_startDrag(t,e){const s=this._winEl.getBoundingClientRect();this._dragging=!0,this._dragOffX=t-s.left,this._dragOffY=e-s.top,this._winEl.style.userSelect="none",this._opts.onDragStart()}_onWinMouseDown(t){const e=this._getResizeEdge(t);e&&(t.preventDefault(),this._startResize(e,t.clientX,t.clientY),document.addEventListener("mousemove",this._onMouseMoveBound),document.addEventListener("mouseup",this._onMouseUpBound,{once:!0}))}_startResize(t,e,s){const i=this._winEl.getBoundingClientRect();this._resizing=!0,this._resizeEdge=t,this._resizeStartX=e,this._resizeStartY=s,this._resizeStartRect={x:i.left,y:i.top,w:i.width,h:i.height},this._winEl.style.userSelect="none",this._opts.onResizeStart()}_handleMove(t){if(this._dragging){const{left:e,top:s}=this._getContainerRect(),i=t.clientX-this._dragOffX-e,n=t.clientY-this._dragOffY-s;this._winEl.style.left=`${i}px`,this._winEl.style.top=`${n}px`,this._opts.onDrag(i,n)}else this._resizing&&this._resizeEdge&&this._applyResize(t.clientX,t.clientY)}_applyResize(t,e){const s=t-this._resizeStartX,i=e-this._resizeStartY,{x:n,y:d,w:r,h:a}=this._resizeStartRect,{minWidth:h,minHeight:c}=this._opts,l=this._resizeEdge;let _=n,f=d,u=r,m=a;l.includes("e")&&(u=Math.max(h,r+s)),l.includes("s")&&(m=Math.max(c,a+i)),l.includes("w")&&(u=Math.max(h,r-s),_=n+(r-u)),l.includes("n")&&(m=Math.max(c,a-i),f=d+(a-m));const{left:g,top:v}=this._getContainerRect();this._winEl.style.left=`${_-g}px`,this._winEl.style.top=`${f-v}px`,this._winEl.style.width=`${u}px`,this._winEl.style.height=`${m}px`,this._opts.onResize(_-g,f-v,u,m)}_handleUp(){this._dragging&&(this._dragging=!1,this._winEl.style.userSelect="",this._opts.onDragEnd()),this._resizing&&(this._resizing=!1,this._resizeEdge=null,this._winEl.style.userSelect="",this._opts.onResizeEnd()),document.removeEventListener("mousemove",this._onMouseMoveBound),document.removeEventListener("touchmove",this._onTouchMoveBound)}_getContainerRect(){if(this._opts.containerEl){const t=this._opts.containerEl.getBoundingClientRect();return{left:t.left,top:t.top}}return{left:0,top:0}}_getResizeEdge(t){const e=this._winEl.getBoundingClientRect(),s=this._opts.resizeBorderPx,i=t.clientX-e.left,n=t.clientY-e.top,d=e.width-i,r=e.height-n;if(t.target.closest(".wos-header"))return null;const a=n<=s,h=r<=s,c=i<=s,l=d<=s;return a&&c?"nw":a&&l?"ne":h&&c?"sw":h&&l?"se":a?"n":h?"s":c?"w":l?"e":null}_updateResizeCursor(t){if(this._dragging||this._resizing)return;const e=this._getResizeEdge(t),s={n:"n-resize",s:"s-resize",e:"e-resize",w:"w-resize",ne:"ne-resize",nw:"nw-resize",se:"se-resize",sw:"sw-resize"};this._winEl.style.cursor=e?s[e]:"default"}destroy(){document.removeEventListener("mousemove",this._onMouseMoveBound),document.removeEventListener("mouseup",this._onMouseUpBound),document.removeEventListener("touchmove",this._onTouchMoveBound),document.removeEventListener("touchend",this._onTouchEndBound)}}const x="wos-core-styles",D=`
.wos-window {
  position: fixed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 4px solid #d0d0d0;
  border-radius: 6px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  background: #d0d0d0;
  overflow: hidden;
  min-width: 200px;
  min-height: 120px;
  transition: box-shadow 0.15s;
}
.wos-window.wos-active {
  border-color: #b0b8c8;
  box-shadow: 0 8px 36px rgba(0,0,0,0.28);
}
.wos-window.wos-minimized {
  display: none !important;
}
.wos-window.wos-maximized {
  left: 72px !important;
  top: 0 !important;
  width: calc(100vw - 72px) !important;
  height: calc(100vh - 48px) !important;
  border-radius: 0;
  border-width: 0;
}
/* ── Isolated container mode ──────────────────────────── */
.wos-isolated {
  position: relative;
  overflow: hidden;
}
.wos-isolated .wos-window {
  position: absolute;
}
.wos-isolated .wos-window.wos-maximized {
  left: 0 !important;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 0;
}
/* ─────────────────────────────────────────────────────── */
.wos-header {
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 36px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  cursor: move;
  user-select: none;
  flex-shrink: 0;
}
.wos-title {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.wos-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #555;
  margin-left: 2px;
  transition: background 0.1s;
}
.wos-btn:hover { background: #e0e0e0; }
.wos-btn.wos-btn-close:hover { background: #ff5f57; color: #fff; }
.wos-body {
  flex: 1;
  overflow: auto;
  position: relative;
  background: #fff;
}
`;function T(){if(document.getElementById(x))return;const o=document.createElement("style");o.id=x,o.textContent=D,document.head.appendChild(o)}function k(o){const t=document.createElement("div");t.className="wos-window",t.dataset.wosId=o.id,z(t,o),t.style.zIndex=String(o.zIndex);const e=document.createElement("div");e.className="wos-header";const s=document.createElement("span");s.className="wos-title",s.textContent=o.title;const i=p("－","wos-btn-min","最小化"),n=p("□","wos-btn-max","最大化"),d=p("✕","wos-btn-close","關閉");e.append(s,i,n,d);const r=document.createElement("div");return r.className="wos-body",t.append(e,r),o.slotType==="dom"&&o.content instanceof HTMLElement&&r.appendChild(o.content),{root:t,header:e,title:s,body:r,btnMin:i,btnMax:n,btnClose:d}}function p(o,t,e){const s=document.createElement("button");return s.className=`wos-btn ${t}`,s.textContent=o,s.setAttribute("aria-label",e),s}function z(o,t){t.x!==void 0&&(o.style.left=`${t.x}px`),t.y!==void 0&&(o.style.top=`${t.y}px`),t.width!==void 0&&(o.style.width=`${t.width}px`),t.height!==void 0&&(o.style.height=`${t.height}px`)}const A=640,I=480,W=100,Y=30;class U{constructor(t={}){this._wins=new Map,this._zCounter=W,this._cascadeCount=0,this._container=t.container??document.body,this._throttleMs=t.throttleMs??16,this._isolated=t.isolated??!1,this.events=new B,T(),this._isolated&&this._container.classList.add("wos-isolated")}open(t){const e=this._wins.get(t.id);if(e)return this.restore(t.id),this.focus(t.id),e.state;const s=this._cascadeCount++%10*Y,i={id:t.id,title:t.title,slotType:t.slotType??"dom",content:t.content,x:t.x??60+s,y:t.y??60+s,width:t.width??A,height:t.height??I,zIndex:++this._zCounter,isMaximized:!1,isMinimized:!1,isActive:!0,props:t.props},n=k(i);this._container.appendChild(n.root);const d=new C(n.root,n.header,{throttleMs:this._throttleMs,containerEl:this._isolated?this._container:void 0,onDrag:(a,h)=>{i.x=a,i.y=h,this.events.emit("window:moved",{...i})},onResize:(a,h,c,l)=>{i.x=a,i.y=h,i.width=c,i.height=l,this.events.emit("window:resized",{...i})}});n.btnMin.addEventListener("click",()=>this.minimize(i.id)),n.btnMax.addEventListener("click",()=>{i.isMaximized?(i.isMaximized=!1,this.restore(i.id)):this.maximize(i.id)}),n.btnClose.addEventListener("click",()=>this.close(i.id)),n.root.addEventListener("mousedown",()=>this.focus(i.id),!0);const r={state:i,elements:n,dragResize:d};return this._wins.set(i.id,r),this._deactivateOthers(i.id),n.root.classList.add("wos-active"),this.events.emit("window:opened",{...i}),i}close(t){const e=this._wins.get(t);e&&(e.dragResize.destroy(),e.elements.root.remove(),this._wins.delete(t),this.events.emit("window:closed",{id:t}),this._focusTopWindow())}focus(t){const e=this._wins.get(t);!e||e.state.isActive||(this._deactivateOthers(t),e.state.zIndex=++this._zCounter,e.state.isActive=!0,e.elements.root.style.zIndex=String(e.state.zIndex),e.elements.root.classList.add("wos-active"),e.state.isMinimized&&this.restore(t),this.events.emit("window:focused",{...e.state}))}minimize(t){const e=this._wins.get(t);!e||e.state.isMinimized||(e.state.isMinimized=!0,e.elements.root.classList.add("wos-minimized"),this.events.emit("window:minimized",{...e.state}),this._focusTopWindow())}maximize(t){const e=this._wins.get(t);if(e){if(e.state.isMaximized){e.state.isMinimized&&this.restore(t);return}e.state._savedGeometry={x:e.state.x,y:e.state.y,width:e.state.width,height:e.state.height},e.state.isMaximized=!0,e.state.isMinimized=!1,e.elements.root.classList.remove("wos-minimized"),e.elements.root.classList.add("wos-maximized"),e.elements.btnMax.textContent="❐",e.elements.btnMax.setAttribute("aria-label","還原"),this.focus(t),this.events.emit("window:maximized",{...e.state})}}restore(t){const e=this._wins.get(t);if(!e)return;const s=e.state.isMaximized;if(e.state.isMinimized=!1,e.elements.root.classList.remove("wos-minimized"),s){e.elements.root.classList.add("wos-maximized"),this.events.emit("window:restored",{...e.state});return}if(e.state.isMaximized=!1,e.elements.root.classList.remove("wos-maximized"),e.elements.btnMax.textContent="□",e.elements.btnMax.setAttribute("aria-label","最大化"),e.state._savedGeometry){const i=e.state._savedGeometry;e.state.x=i.x,e.state.y=i.y,e.state.width=i.width,e.state.height=i.height,z(e.elements.root,e.state),delete e.state._savedGeometry}this.events.emit("window:restored",{...e.state})}getState(t){const e=this._wins.get(t);return e?{...e.state}:void 0}getBodyElement(t){var e;return(e=this._wins.get(t))==null?void 0:e.elements.body}getWindowIds(){return[...this._wins.keys()]}setTitle(t,e){const s=this._wins.get(t);s&&(s.state.title=e,s.elements.title.textContent=e)}destroy(){[...this._wins.keys()].forEach(t=>this.close(t)),this.events.clearAll(),this._isolated&&this._container.classList.remove("wos-isolated")}_deactivateOthers(t){this._wins.forEach((e,s)=>{s!==t&&e.state.isActive&&(e.state.isActive=!1,e.elements.root.classList.remove("wos-active"))})}_focusTopWindow(){let t=null,e=-1;this._wins.forEach(s=>{!s.state.isMinimized&&s.state.zIndex>e&&(e=s.state.zIndex,t=s)}),t&&(t.state.isActive=!1,this.focus(t.state.id))}}const X={class:"demo-shell"},$={class:"demo-toolbar"},H=E({__name:"DemoViewport",emits:["reset"],setup(o,{expose:t}){const e=L(null);return t({container:e}),(s,i)=>(b(),y("div",X,[w("div",$,[i[1]||(i[1]=w("span",{class:"demo-label"},"▶ Live Demo",-1)),M(s.$slots,"controls",{},void 0),w("button",{class:"btn-reset",onClick:i[0]||(i[0]=n=>s.$emit("reset")),title:"重置所有視窗"},"Reset")]),w("div",{ref_key:"container",ref:e,class:"demo-viewport"},null,512)]))}}),N=S(H,[["__scopeId","data-v-2040ba98"]]);export{N as D,U as W};
