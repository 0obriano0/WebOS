import{D as C,W as z}from"./DemoViewport-C-BLVnbl.js";import{h as S,w as H,x as B,o as D,k as O,l as Q,e as U,a as e,u as a,v as n,g as W,y as A,r as K,_ as P}from"./index-DiQ17dWH.js";const I={class:"page"},V={class:"page-badge"},F={class:"badge badge-blue"},N=["innerHTML"],R=["innerHTML"],G=["innerHTML"],J={class:"api-table"},X=["innerHTML"],Y=["innerHTML"],Z=["innerHTML"],ee=S({__name:"JqueryPage",setup(te){const{setCode:E}=H(),{t}=B(),q=K(null);let c=null,m=0;function v(){var o;const y=(o=q.value)==null?void 0:o.container;y&&(c=new z({container:y,isolated:!0,throttleMs:16}),m=0)}function T(){c==null||c.destroy(),v()}function g(){return{x:20+m%4*30,y:20+m%3*24}}function M(){if(!c)return;const y=g();m++;const o=document.createElement("div");o.style.cssText="padding:16px; font-family:Segoe UI,sans-serif;",o.innerHTML=`
    <h3 style="margin:0 0 14px;font-size:14px;color:#333">聯絡表單</h3>
    <label style="display:block;font-size:12px;color:#666;font-weight:600;margin-bottom:4px">姓名 *</label>
    <input id="jq-name" type="text" placeholder="請輸入姓名"
      style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;font-size:13px;box-sizing:border-box;margin-bottom:10px">
    <label style="display:block;font-size:12px;color:#666;font-weight:600;margin-bottom:4px">Email *</label>
    <input id="jq-email" type="email" placeholder="example@email.com"
      style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;font-size:13px;box-sizing:border-box;margin-bottom:10px">
    <label style="display:block;font-size:12px;color:#666;font-weight:600;margin-bottom:4px">年齡</label>
    <input id="jq-age" type="number" placeholder="18"
      style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;font-size:13px;box-sizing:border-box;margin-bottom:14px">
    <button id="jq-submit"
      style="background:#4a90e2;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-size:13px">
      提交
    </button>
    <div id="jq-result" style="display:none;margin-top:12px;padding:10px;background:#f0f8ff;border-radius:4px;font-size:12px"></div>`,o.querySelector("#jq-submit").addEventListener("click",()=>{const p=o.querySelector("#jq-name").value,l=o.querySelector("#jq-email").value,r=o.querySelector("#jq-result");if(!p||!l.includes("@")){r.style.display="block",r.textContent="⚠ 請填寫必填欄位（姓名及有效 Email）";return}r.style.display="block",r.innerHTML=`✅ 提交成功！<br>姓名: <strong>${p}</strong><br>Email: <strong>${l}</strong>`}),c.open({id:`jq-form-${m}`,title:"表單驗證",content:o,width:380,height:340,...y})}function _(){if(!c)return;const y=g();m++;const o=["Apple","Banana","Cherry","Date","Elderberry","Fig","Grape","Honeydew","Kiwi","Lemon","Mango","Nectarine"],p=document.createElement("div");p.style.cssText="padding:16px; font-family:Segoe UI,sans-serif;";const l=document.createElement("input");l.type="text",l.placeholder="搜尋水果...",l.style.cssText="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;font-size:13px;box-sizing:border-box;margin-bottom:8px";const r=document.createElement("div");r.style.cssText="font-size:11px;color:#888;margin-bottom:8px",r.textContent=`共 ${o.length} 筆`;const i=document.createElement("ul");i.style.cssText="list-style:none;padding:0;margin:0;max-height:200px;overflow-y:auto",o.forEach(s=>{const d=document.createElement("li");d.textContent=s,d.dataset.item=s.toLowerCase(),d.style.cssText="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;cursor:pointer",d.addEventListener("mouseenter",()=>{d.style.background="#f5f5f5"}),d.addEventListener("mouseleave",()=>{d.style.background=""}),i.appendChild(d)}),l.addEventListener("input",()=>{const s=l.value.toLowerCase();let d=0;i.querySelectorAll("li").forEach(u=>{const x=u.dataset.item.includes(s);u.style.display=x?"":"none",x&&d++}),r.textContent=`顯示 ${d} / ${o.length} 筆`}),p.append(l,r,i),c.open({id:`jq-search-${m}`,title:"即時搜尋",content:p,width:320,height:320,...y})}function L(){if(!c)return;const y=g();m++;const o=[{title:"📦 什麼是 WebOS-Core？",body:"WebOS-Core 是一套框架無關的虛擬桌面視窗管理引擎，支援拖曳、縮放、置頂、最小化、最大化等完整功能。"},{title:"🔗 如何與 jQuery 整合？",body:"載入 UMD bundle 後，使用 jQuery 建立視窗內容，並以 wm.getBodyElement(id) 取得視窗 body 元素附加外掛。"},{title:"📄 支援哪些框架？",body:"支援純 JavaScript、jQuery、Vue 3、React（規劃中）。核心完全框架無關。"},{title:"⚡ 如何安裝？",body:"複製 dist/ 資料夾，或以 script 標籤載入 webos-core.umd.js，無需任何建置步驟。"}],p=document.createElement("div");p.style.cssText="font-family:Segoe UI,sans-serif;",o.forEach((l,r)=>{const i=document.createElement("div");i.style.cssText=`padding:12px 16px;background:${r===0?"#4a90e2":"#f8f8f8"};color:${r===0?"#fff":"#333"};cursor:pointer;border-bottom:1px solid #e0e0e0;font-size:13px;font-weight:600;display:flex;justify-content:space-between;align-items:center`,i.innerHTML=`${l.title} <span>${r===0?"▲":"▼"}</span>`;const s=document.createElement("div");s.style.cssText=`padding:${r===0?"12px 16px":"0 16px"};font-size:13px;line-height:1.6;color:#555;background:#fff;border-bottom:1px solid #e0e0e0;overflow:hidden;max-height:${r===0?"200px":"0"};transition:max-height 0.3s ease,padding 0.3s ease`,s.textContent=l.body,i.addEventListener("click",()=>{const d=s.style.maxHeight!=="0px";if(p.querySelectorAll("[data-acc-body]").forEach(u=>{u.style.maxHeight="0",u.style.padding="0 16px"}),p.querySelectorAll("[data-acc-header]").forEach(u=>{u.style.background="#f8f8f8",u.style.color="#333";const x=u.querySelector("span");x&&(x.textContent="▼")}),!d){s.style.maxHeight="200px",s.style.padding="12px 16px",i.style.background="#4a90e2",i.style.color="#fff";const u=i.querySelector("span");u&&(u.textContent="▲")}}),i.dataset.accHeader="",s.dataset.accBody="",p.append(i,s)}),c.open({id:`jq-accord-${m}`,title:"摺疊面板",content:p,width:420,height:320,...y})}function $(){if(!c)return;const y=g();m++;const o=[{name:"視窗管理器",version:"0.1.0",size:"24 KB",type:"ES Module"},{name:"UMD Bundle",version:"0.1.0",size:"26 KB",type:"Script Tag"},{name:"Vue Adapter",version:"0.1.0",size:"2 KB",type:"Vue 3"},{name:"TypeScript 型別",version:"0.1.0",size:"4 KB",type:"宣告檔"},{name:"DOM Renderer",version:"0.1.0",size:"8 KB",type:"核心"}];let p=0;const l=document.createElement("div");l.style.cssText="font-family:Segoe UI,sans-serif;";const r=document.createElement("div");r.style.cssText="padding:8px 12px;display:flex;gap:8px;background:#f8f8f8;border-bottom:1px solid #e0e0e0;align-items:center";const i=document.createElement("button");i.textContent="+ 新增列",i.style.cssText="background:#4a90e2;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:12px";const s=document.createElement("input");s.type="text",s.placeholder="篩選...",s.style.cssText="flex:1;padding:4px 8px;border:1px solid #ddd;border-radius:4px;font-size:12px",r.append(i,s);const d=document.createElement("table");d.style.cssText="width:100%;border-collapse:collapse;font-size:12px";const u=document.createElement("thead");u.innerHTML=`<tr>${["名稱","版本","大小","類型"].map(f=>`<th style="padding:8px 12px;background:#4a90e2;color:#fff;text-align:left;font-weight:600">${f}</th>`).join("")}</tr>`;const x=document.createElement("tbody");function w(f){x.innerHTML="",f.forEach((b,j)=>{const h=document.createElement("tr");h.style.background=j%2===0?"#fff":"#f9f9f9",h.innerHTML=[b.name,b.version,b.size,b.type].map(k=>`<td style="padding:8px 12px;border-bottom:1px solid #eee">${k}</td>`).join(""),x.appendChild(h)})}w(o),d.append(u,x),i.addEventListener("click",()=>{p++,o.push({name:`模組 ${p}`,version:"0.x.0",size:`${Math.floor(Math.random()*20)+1} KB`,type:"自訂"}),w(o)}),s.addEventListener("input",()=>{const f=s.value.toLowerCase(),b=f?o.filter(j=>Object.values(j).some(h=>h.toLowerCase().includes(f))):o;w(b)}),l.append(r,d),c.open({id:`jq-table-${m}`,title:"資料表格",content:l,width:500,height:300,...y})}return D(()=>{v(),E([{name:"index.html (UMD + jQuery setup)",lang:"html",code:`<!-- 1. Load WebOS-Core UMD bundle -->
<script src="dist/webos-core.umd.js"><\/script>
<!-- 2. Load jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"><\/script>

<script>
  const { WindowManager } = WebOS;
  const wm = new WindowManager({ throttleMs: 16 });

  // 3. Create window content with jQuery
  const $form = $('<div>').css('padding', '16px').append(
    $('<input type="text" placeholder="Name">'),
    $('<button>Submit</button>').on('click', function () {
      alert($form.find('input').val());
    })
  );

  // 4. Open window — pass unwrapped DOM node
  wm.open({
    id: 'form-win',
    title: 'jQuery Form',
    content: $form[0],   // ← $el[0] unwraps to HTMLElement
    width: 400,
    height: 300
  });
<\/script>`},{name:"getBodyElement.js (plugin init pattern)",lang:"javascript",code:`// Open window with no content first
wm.open({ id: 'grid', title: 'Data Grid', content: null });

// Get the window body element and attach a jQuery plugin
const $body = $(wm.getBodyElement('grid'));
$body.css('padding', '0');

// Example: initialise a hypothetical jQuery grid plugin
// $body.wijgrid({ data: myData, columns: [...] });
// $body.DataTable({ data: rows, columns: cols });

// Or use window:opened event for deferred init
wm.events.on('window:opened', function ({ id }) {
  if (id === 'my-chart') {
    $(wm.getBodyElement(id)).myChartPlugin({ color: 'blue' });
  }
});`}])}),O(()=>c==null?void 0:c.destroy()),(y,o)=>(Q(),U("div",I,[e("div",V,[e("span",F,a(n(t)("jquery.badge")),1)]),e("h1",null,a(n(t)("jquery.h1")),1),e("p",{innerHTML:n(t)("jquery.intro")},null,8,N),W(C,{ref_key:"viewport",ref:q,onReset:T},{controls:A(()=>[e("button",{class:"btn",onClick:M},a(n(t)("jquery.openForm")),1),e("button",{class:"btn",onClick:_},a(n(t)("jquery.openSearch")),1),e("button",{class:"btn",onClick:L},a(n(t)("jquery.openAccordion")),1),e("button",{class:"btn",onClick:$},a(n(t)("jquery.openTable")),1)]),_:1},512),e("h2",null,a(n(t)("jquery.h2Pattern1")),1),e("p",{innerHTML:n(t)("jquery.pattern1Desc")},null,8,R),e("h2",null,a(n(t)("jquery.h2Pattern2")),1),e("p",{innerHTML:n(t)("jquery.pattern2Desc")},null,8,G),e("h2",null,a(n(t)("jquery.h2Patterns")),1),e("table",J,[e("thead",null,[e("tr",null,[e("th",null,a(n(t)("jquery.th.pattern")),1),e("th",null,a(n(t)("jquery.th.when")),1),e("th",null,a(n(t)("jquery.th.code")),1)])]),e("tbody",null,[e("tr",null,[e("td",null,a(n(t)("jquery.pat1.name")),1),e("td",null,a(n(t)("jquery.pat1.when")),1),e("td",{innerHTML:n(t)("jquery.pat1.code")},null,8,X)]),e("tr",null,[e("td",null,a(n(t)("jquery.pat2.name")),1),e("td",null,a(n(t)("jquery.pat2.when")),1),e("td",{innerHTML:n(t)("jquery.pat2.code")},null,8,Y)]),e("tr",null,[e("td",null,a(n(t)("jquery.pat3.name")),1),e("td",null,a(n(t)("jquery.pat3.when")),1),e("td",{innerHTML:n(t)("jquery.pat3.code")},null,8,Z)])])])]))}}),re=P(ee,[["__scopeId","data-v-e433befe"]]);export{re as default};
