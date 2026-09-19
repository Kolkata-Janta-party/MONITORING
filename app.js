const services=[
  ["API Gateway","182 ms","99.99%"],["Web Dashboard","96 ms","100%"],["Data Pipeline","241 ms","99.97%"],
  ["Notification Worker","118 ms","99.99%"],["Database","14 ms","99.999%"],["Object Storage","73 ms","99.98%"]
];
const events=[
  ["Health check completed","All endpoints responding normally","2 min ago"],
  ["Deployment completed","Web Dashboard · v2.8.1","11 min ago"],
  ["Latency recovered","API Gateway returned below threshold","24 min ago"],
  ["Scheduled check","Database backup verification passed","41 min ago"]
];

const servicesEl=document.querySelector("#services");
const eventsEl=document.querySelector("#events");
const canvas=document.querySelector("#latencyChart");
const refreshBtn=document.querySelector("#refreshBtn");
const updatedAt=document.querySelector("#updatedAt");

const escapeHtml=(value)=>String(value).replace(/[&<>"']/g,(char)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

function render(){
  servicesEl.innerHTML=services.map(([name,latency,availability])=>`<div class="service"><div class="service-name"><i class="health" aria-hidden="true"></i>${escapeHtml(name)}</div><div class="service-meta"><span><b>${escapeHtml(latency)}</b></span><span><b>${escapeHtml(availability)}</b></span></div></div>`).join("");
  eventsEl.innerHTML=events.map(([title,detail,time])=>`<div class="event"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span><span>${escapeHtml(time)}</span></div>`).join("");
}

function drawChart(){
  if(!canvas)return;
  const dpr=Math.max(1,window.devicePixelRatio||1);
  const rect=canvas.getBoundingClientRect();
  const w=Math.max(1,rect.width),h=Math.max(1,rect.height);
  canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  const c=canvas.getContext("2d");
  c.setTransform(dpr,0,0,dpr,0,0);
  const pts=Array.from({length:61},(_,i)=>174+Math.sin(i*.31)*18+Math.sin(i*.79)*7+(i>44?Math.sin(i*.5)*4:0));
  const min=130,max=235,left=2,right=Math.max(2,w-2),top=15,bottom=Math.max(top+1,h-15);
  const x=i=>left+(right-left)*i/60,y=v=>bottom-(v-min)/(max-min)*(bottom-top);
  c.clearRect(0,0,w,h);
  c.strokeStyle="rgba(148,163,184,.08)";c.lineWidth=1;
  for(let i=0;i<4;i++){const yy=top+(bottom-top)*i/3;c.beginPath();c.moveTo(left,yy);c.lineTo(right,yy);c.stroke();}
  const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,"rgba(120,167,255,.18)");g.addColorStop(1,"rgba(120,167,255,0)");
  c.beginPath();pts.forEach((v,i)=>i?c.lineTo(x(i),y(v)):c.moveTo(x(i),y(v)));c.lineTo(right,bottom);c.lineTo(left,bottom);c.closePath();c.fillStyle=g;c.fill();
  c.beginPath();pts.forEach((v,i)=>i?c.lineTo(x(i),y(v)):c.moveTo(x(i),y(v)));c.strokeStyle="#78a7ff";c.lineWidth=2;c.stroke();
}

function refresh(){
  updatedAt.textContent="Updated just now";
  refreshBtn.setAttribute("aria-busy","true");
  drawChart();
  window.setTimeout(()=>refreshBtn.removeAttribute("aria-busy"),180);
}

render();
refreshBtn.addEventListener("click",refresh);
window.addEventListener("resize",drawChart,{passive:true});
drawChart();
