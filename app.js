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
const servicesEl=document.querySelector("#services"),eventsEl=document.querySelector("#events"),canvas=document.querySelector("#latencyChart");
servicesEl.innerHTML=services.map(s=>`<div class="service"><div class="service-name"><i class="health"></i>${s[0]}</div><div class="service-meta"><span><b>${s[1]}</b></span><span><b>${s[2]}</b></span></div></div>`).join("");
eventsEl.innerHTML=events.map(e=>`<div class="event"><strong>${e[0]}</strong><span>${e[1]}</span><span>${e[2]}</span></div>`).join("");
function drawChart(){
  const dpr=window.devicePixelRatio||1,rect=canvas.getBoundingClientRect(),w=Math.max(1,rect.width),h=Math.max(1,rect.height);
  canvas.width=w*dpr;canvas.height=h*dpr;const c=canvas.getContext("2d");c.scale(dpr,dpr);
  const pts=Array.from({length:61},(_,i)=>174+Math.sin(i*.31)*18+Math.sin(i*.79)*7+(i>44?Math.sin(i*.5)*4:0));
  const min=130,max=235,left=2,right=w-2,top=15,bottom=h-15;
  const x=i=>left+(right-left)*i/60,y=v=>bottom-(v-min)/(max-min)*(bottom-top);
  c.strokeStyle="rgba(148,163,184,.08)";c.lineWidth=1;
  for(let i=0;i<4;i++){const yy=top+(bottom-top)*i/3;c.beginPath();c.moveTo(left,yy);c.lineTo(right,yy);c.stroke()}
  const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,"rgba(120,167,255,.18)");g.addColorStop(1,"rgba(120,167,255,0)");
  c.beginPath();pts.forEach((v,i)=>i?c.lineTo(x(i),y(v)):c.moveTo(x(i),y(v)));c.lineTo(right,bottom);c.lineTo(left,bottom);c.closePath();c.fillStyle=g;c.fill();
  c.beginPath();pts.forEach((v,i)=>i?c.lineTo(x(i),y(v)):c.moveTo(x(i),y(v)));c.strokeStyle="#78a7ff";c.lineWidth=2;c.stroke();
}
document.querySelector("#refreshBtn").addEventListener("click",()=>{document.querySelector("#updatedAt").textContent="Updated just now";drawChart()});
window.addEventListener("resize",drawChart);drawChart();
