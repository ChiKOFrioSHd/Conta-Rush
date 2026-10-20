// ================= MOTOR 3D CON CÁMARA LIBRE TOTAL (ARRIBA / ABAJO / CENITAL 90°) =================
let W3D={raf:0,yaw:2.55,pitch:0.55,zoom:1.05,panY:0,drag:0,lx:0,ly:0,t:0,mode:'office',hit:0,camPreset:0,pts:Array.from({length:22},()=>({x:(Math.random()-.5)*4,y:Math.random()*2.2,z:(Math.random()-.5)*3,s:1+Math.random()*2}))};
function stop3D(){if(W3D.raf){cancelAnimationFrame(W3D.raf);W3D.raf=0}}
function cycleCam(){
  W3D.camPreset=(W3D.camPreset+1)%4;
  if(W3D.camPreset==0){W3D.yaw=2.55;W3D.pitch=0.52;W3D.zoom=1.05;W3D.panY=0}       // 1. Frontal Diagonal
  else if(W3D.camPreset==1){W3D.yaw=3.14;W3D.pitch=1.54;W3D.zoom=0.95;W3D.panY=-28} // 2. Cenital 90° (Todo desde arriba)
  else if(W3D.camPreset==2){W3D.yaw=2.55;W3D.pitch=-0.35;W3D.zoom=1.05;W3D.panY=35} // 3. Mirando hacia arriba (Parte superior)
  else {W3D.yaw=0.65;W3D.pitch=0.45;W3D.zoom=1.05;W3D.panY=0}                      // 4. Detrás del Monitor
  const btn=document.querySelector('.cam-btn');
  if(btn)btn.innerHTML=`🎥 Vista: ${['Frontal','Desde Arriba','Hacia Arriba','Monitor'][W3D.camPreset]}`;
}
function moveCamY(dy){W3D.panY=Math.max(-70,Math.min(70,(W3D.panY||0)+dy))}
function init3D(cid,mode){
  stop3D();
  const cv=$(cid);if(!cv)return;
  W3D.mode=mode||'office';W3D.t=0;
  if(mode=='duel'){W3D.yaw=0.15;W3D.pitch=0.48;W3D.zoom=1.08;W3D.panY=0}
  const dn=(x,y)=>{W3D.drag=1;W3D.lx=x;W3D.ly=y};
  // Rango vertical ampliado (-0.85 a 1.56 rad) para mirar tanto hacia arriba como 90° desde arriba
  const mv=(x,y)=>{
    if(!W3D.drag)return;
    W3D.yaw+=(x-W3D.lx)*0.012;
    W3D.pitch=Math.max(-0.85,Math.min(1.56,W3D.pitch+(y-W3D.ly)*0.012));
    W3D.lx=x;W3D.ly=y;
  };
  const up=()=>{W3D.drag=0};
  cv.onmousedown=e=>dn(e.clientX,e.clientY);
  window.onmousemove=e=>mv(e.clientX,e.clientY);
  window.onmouseup=up;
  let pinchDist=0;
  cv.ontouchstart=e=>{if(e.touches.length>=2){W3D.drag=0;pinchDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)}else if(e.touches[0])dn(e.touches[0].clientX,e.touches[0].clientY)};
  cv.ontouchmove=e=>{if(e.touches.length>=2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(pinchDist)W3D.zoom=Math.max(0.55,Math.min(2.35,W3D.zoom+(d-pinchDist)*0.006));pinchDist=d;e.preventDefault()}else if(e.touches[0]){mv(e.touches[0].clientX,e.touches[0].clientY);e.preventDefault()}};
  cv.ontouchend=()=>{pinchDist=0;up()};
  cv.onwheel=e=>{W3D.zoom=Math.max(0.55,Math.min(2.35,W3D.zoom-e.deltaY*0.001));e.preventDefault()};

  function loop(){
    if(!document.body.contains(cv)){stop3D();return}
    W3D.t+=0.025;
    if(!W3D.drag)W3D.yaw+=mode=='office'?0.0028:Math.sin(W3D.t*0.7)*0.0018;
    drawScene3D(cv);
    W3D.raf=requestAnimationFrame(loop);
  }
  loop();
}
function shadeHex(hex,f){
  const c=(hex||'#7c5cff').replace('#','');
  const n=parseInt(c.length==3?c.split('').map(x=>x+x).join(''):c,16);
  const r=Math.min(255,Math.max(0,Math.round(((n>>16)&255)*f))),g=Math.min(255,Math.max(0,Math.round(((n>>8)&255)*f))),b=Math.min(255,Math.max(0,Math.round((n&255)*f)));
  return `rgb(${r},${g},${b})`;
}
function drawScene3D(cv){
  const dpr=window.devicePixelRatio||1,w=cv.clientWidth||360,h=cv.clientHeight||225;
  if(cv.width!=w*dpr||cv.height!=h*dpr){cv.width=w*dpr;cv.height=h*dpr}
  const ctx=cv.getContext('2d');ctx.save();ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,w,h);

  const sk=SK[S.sk||0],ac=sk[6],pu=sk[5],rk=lvl();
  const cy=Math.cos(W3D.yaw),sy=Math.sin(W3D.yaw),cp=Math.cos(W3D.pitch),sp=Math.sin(W3D.pitch);
  const sc=Math.min(w,h)*0.265*W3D.zoom;
  // Centro vertical compensado para que al mirar arriba o cenital todo quede centrado en pantalla
  const ox=w*0.5,oy=h*(0.62 - sp*0.12) + (W3D.panY||0) + (W3D.hit>0?Math.sin(W3D.t*45)*5:0);
  if(W3D.hit>0)W3D.hit=Math.max(0,W3D.hit-0.06);

  const grd=ctx.createRadialGradient(ox,oy-30,10,ox,oy-20,Math.max(w,h)*0.6);
  grd.addColorStop(0,pu+'44');grd.addColorStop(0.5,ac+'18');grd.addColorStop(1,'transparent');
  ctx.fillStyle=grd;ctx.fillRect(0,0,w,h);

  const faces=[];
function proj(x,y,z){
  const py=y-0.55;
  const rx=x*cy-z*sy,rz=x*sy+z*cy;
  const ry=py*cp-rz*sp,rz2=py*sp+rz*cp;
  const p=5.2/(5.2+rz2*0.26);
  return [ox+rx*sc*p, oy-ry*sc*p, rz2, p];
}
  function addBox(x,y,z,dx,dy,dz,col,topCol,edge){
    const hx=dx/2,hy=dy/2,hz=dz/2;
    const V=[
      [x-hx,y-hy,z-hz],[x+hx,y-hy,z-hz],[x+hx,y+hy,z-hz],[x-hx,y+hy,z-hz],
      [x-hx,y-hy,z+hz],[x+hx,y-hy,z+hz],[x+hx,y+hy,z+hz],[x-hx,y+hy,z+hz]
    ].map(v=>proj(v[0],v[1],v[2]));
    const F=[
      [[0,1,2,3],shadeHex(col,0.84)],
      [[4,5,6,7],shadeHex(col,1.05)],
      [[0,4,7,3],shadeHex(col,0.72)],
      [[1,5,6,2],shadeHex(col,0.95)],
      [[3,2,6,7],topCol||shadeHex(col,1.26)],
      [[0,1,5,4],shadeHex(col,0.52)]
    ];
    F.forEach(([idx,c])=>{
      const pts=idx.map(i=>V[i]);
      const zAvg=(pts[0][2]+pts[1][2]+pts[2][2]+pts[3][2])*0.25;
      faces.push({pts,c,z:zAvg,edge:edge||'rgba(255,255,255,0.11)'});
    });
  }

  ctx.strokeStyle=pu+'28';ctx.lineWidth=1;
  for(let g=-1.8;g<=1.81;g+=0.45){
    const a=proj(g,-0.02,-1.4),b=proj(g,-0.02,1.4);
    ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
    const c=proj(-1.8,-0.02,g*0.77),d=proj(1.8,-0.02,g*0.77);
    ctx.beginPath();ctx.moveTo(c[0],c[1]);ctx.lineTo(d[0],d[1]);ctx.stroke();
  }

  function addAvatar3D(ax,az,skIdx,bob,isEnemy){
    const bodyCol=isEnemy?((G.bl||0)>=7?'#991b1b':'#c2410c'):SK[skIdx][5];
    const accCol=isEnemy?'#fb7185':SK[skIdx][6];
    addBox(ax-0.11,0.22,az,0.13,0.34,0.15,'#1e293b');
    addBox(ax+0.11,0.22,az,0.13,0.34,0.15,'#1e293b');
    addBox(ax,0.62+bob,az,0.4,0.44,0.26,bodyCol,shadeHex(bodyCol,1.2),accCol+'66');
    addBox(ax,0.64+bob,az-0.14,0.1,0.3,0.03,accCol,accCol);
    addBox(ax-0.27,0.62+bob,az,0.12,0.36,0.18,shadeHex(bodyCol,0.85),accCol);
    addBox(ax+0.27,0.62+bob,az,0.12,0.36,0.18,shadeHex(bodyCol,0.85),accCol);
    const headCol=skIdx==3?'#14532d':skIdx==2?'#38bdf8':isEnemy?'#fda4af':'#f1c27d';
    addBox(ax,1.02+bob,az,0.32,0.32,0.3,headCol,shadeHex(headCol,1.15));
    addBox(ax,1.03+bob,az-0.16,0.26,0.08,0.04,accCol,'#ffffff',accCol);
    addBox(ax,1.03+bob,az+0.16,0.26,0.08,0.04,accCol,'#ffffff',accCol);
    if(!isEnemy){
      if(skIdx==1||skIdx==6){
        addBox(ax-0.11,1.24+bob,az,0.08,0.14,0.08,accCol);
        addBox(ax+0.11,1.24+bob,az,0.08,0.14,0.08,accCol);
      } else if(skIdx==4||skIdx==7||rk>=5){
        addBox(ax,1.23+bob,az,0.26,0.11,0.24,'#facc15','#fef08a','#fff');
      } else if(skIdx==8){
        addBox(ax-0.38,0.72+bob,az+0.12,0.24,0.42,0.06,'#fef08a','#fff');
        addBox(ax+0.38,0.72+bob,az+0.12,0.24,0.42,0.06,'#fef08a','#fff');
        addBox(ax,1.28+bob,az,0.28,0.04,0.28,'#fde047','#fff');
      }
    } else if((G.bl||0)>=7){
      addBox(ax-0.12,1.25+bob,az,0.08,0.16,0.08,'#ef4444');
      addBox(ax+0.12,1.25+bob,az,0.08,0.16,0.08,'#ef4444');
    }
  }

  if(W3D.mode=='office'){
    const floorCol=rk>=5?'#1c1632':rk>=2?'#141d38':'#141829';
    addBox(0,-0.11,0,3.6,0.18,2.7,floorCol,rk>=5?'#271e47':'#1c2444',pu+'66');
    addBox(0,-0.01,0.08,2.3,0.03,1.65,pu,shadeHex(pu,0.75),ac+'88');

    const deskW=rk>=5?2.25:rk>=2?1.85:1.45;
    const deskCol=rk>=5?'#2b1d28':rk>=2?'#3b2820':'#523a28';
    addBox(0,0.46,0,deskW,0.09,0.96,deskCol,shadeHex(deskCol,1.28),ac+'55');
    addBox(-deskW*0.43,0.22,0,0.12,0.44,0.82,'#1e2238');
    addBox(deskW*0.43,0.22,0,0.12,0.44,0.82,'#1e2238');

    addBox(0,0.52,0.22,0.42,0.02,0.18,'#0f172a','#38bdf8');
    addBox(0.32,0.52,0.22,0.14,0.02,0.16,'#1e293b',ac);
    addBox(-0.48,0.53,0.24,0.26,0.06,0.32,'#e11d48','#fb7185');
    addBox(-0.48,0.59,0.24,0.24,0.06,0.3,'#0284c7','#38bdf8');
    addBox(0.52,0.56,0.26,0.12,0.15,0.12,'#f8fafc','#b45309');

    addBox(0,0.32,0.66,0.48,0.08,0.46,'#171b30',pu);
    addBox(0,0.58,0.86,0.44,0.42,0.08,'#171b30',pu,ac+'66');
    const bob=Math.sin(W3D.t*2.4)*0.03;
    addAvatar3D(0,0.56,S.sk||0,bob,false);

    const scrCol=Math.sin(W3D.t*2.5)>0?'#10b981':'#00e5ff';
    addBox(0,0.74,-0.18,0.68,0.4,0.06,scrCol,'#1e293b',ac);
    addBox(0,0.52,-0.18,0.16,0.1,0.12,'#1e243b');
    if(rk>=2)addBox(-0.68,0.73,-0.08,0.54,0.36,0.06,pu,'#1e293b',ac);
    if(rk>=5)addBox(0.68,0.73,-0.08,0.54,0.36,0.06,ac,'#1e293b','#fff');

    if(S.objs.includes(0)||rk>=1){
      addBox(0.65,0.56,-0.25,0.18,0.12,0.18,'#78350f','#b45309');
      addBox(0.65,0.72,-0.25,0.28,0.24,0.28,'#15803d','#4ade80');
    }
    if(S.objs.includes(1)||rk>=3){
      addBox(-0.68,0.6,0.25,0.22,0.2,0.16,'#eab308','#fef08a','#fff');
    }
    if(S.objs.includes(2)||rk>=4){
      addBox(1.36,0.62,-0.62,0.42,1.25,0.44,'#111827','#00e5ff',ac+'88');
    }
    if(rk>=1){
      addBox(-1.38,0.65,-0.62,0.4,1.32,0.46,'#1e2442','#2b335c',pu+'44');
      addBox(-1.38,0.88,-0.6,0.32,0.22,0.36,'#f59e0b','#fde047');
      addBox(-1.38,0.48,-0.6,0.32,0.22,0.36,'#10b981','#6ee7b7');
    }
  } else {
    addBox(0,-0.14,0,3.6,0.16,2.3,'#141730','#1e244a',ac+'66');
    addBox(0,0.36,0,1.55,0.12,1.02,'#261b3d','#3b2a5e',ac);
    const bob1=Math.sin(W3D.t*3)*0.04,bob2=Math.cos(W3D.t*3)*0.04;
    addAvatar3D(-1.08,0,S.sk||0,bob1,false);
    addAvatar3D(1.08,0,0,bob2,true);
    const hY=0.74+Math.sin(W3D.t*4)*0.07;
    addBox(0,hY,0,0.34,0.34,0.34,ac,'#fef08a','#fff');
  }

  faces.sort((a,b)=>b.z-a.z);
  faces.forEach(f=>{
    ctx.beginPath();
    ctx.moveTo(f.pts[0][0],f.pts[0][1]);
    for(let i=1;i<f.pts.length;i++)ctx.lineTo(f.pts[i][0],f.pts[i][1]);
    ctx.closePath();
    ctx.fillStyle=f.c;ctx.fill();
    ctx.strokeStyle=f.edge;ctx.lineWidth=1;ctx.stroke();
  });

  W3D.pts.forEach(pt=>{
    pt.y+=0.008;if(pt.y>2.2)pt.y=0.1;
    const p=proj(pt.x,pt.y,pt.z);
    ctx.fillStyle=ac+'aa';
    ctx.beginPath();ctx.arc(p[0],p[1],pt.s*p[3],0,Math.PI*2);ctx.fill();
  });

  ctx.font='700 11px "Chakra Petch", system-ui';
  if(W3D.mode=='office'){
    const p=proj(0,1.48,0.56);
    const txt=`${T[rk].toUpperCase()}`;
    const tw=ctx.measureText(txt).width+18;
    ctx.fillStyle='rgba(9,11,22,0.82)';
    ctx.fillRect(p[0]-tw/2,p[1]-11,tw,18);
    ctx.strokeStyle=ac;ctx.strokeRect(p[0]-tw/2,p[1]-11,tw,18);
    ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(txt,p[0],p[1]+2);
  } else {
    const p1=proj(-1.08,1.42,0),p2=proj(1.08,1.42,0);
    ctx.textAlign='center';ctx.fillStyle='#6ee7b7';ctx.fillText(`TÚ (${G.me||100} HP)`,p1[0],p1[1]);
    ctx.fillStyle='#fda4af';ctx.fillText(`${BN[G.bl||0].slice(2).trim()} (${G.en||100} HP)`,p2[0],p2[1]);
  }
  ctx.restore();
}
