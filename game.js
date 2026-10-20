const $=id=>document.getElementById(id);

let S;try{S=JSON.parse(localStorage.getItem('cr')||'{}')}catch(e){S={}}
S.xp=S.xp||0;S.best=S.best||0;S.streak=S.streak||0;S.last=S.last||'';S.ms=S.ms||{};S.hs=S.hs||{};
S.coins=S.coins||0;S.tr=S.tr||0;S.own=S.own||[0];S.sk=S.sk||0;S.br=S.br||0;S.pp=S.pp||0;S.pcl=S.pcl||[];S.fi=S.fi||[];S.fp=S.fp||0;S.cs=S.cs||{};S.caseReports=S.caseReports||{};
S.ttl=S.ttl||0;S.nickname=(typeof S.nickname==='string'&&S.nickname.trim())?S.nickname.trim():'ContadorRush';S.ttls=S.ttls||[0];S.objs=S.objs||[];S.xpb=S.xpb||0;S.free=S.free||0;S.frames=S.frames||['default'];S.frame=S.frame||'default';
// Migración de temporada: la primera carga de esta versión inicia la Temporada 1 sin borrar XP, monedas ni liga.
if(S.seasonSystemVersion!==2){S.se=1;S.seStart=Date.now();S.seasonClaims=[];S.pk=Math.max(Number(S.pk)||0,Number(S.dv)||0);S.seasonSystemVersion=2;try{localStorage.setItem('cr',JSON.stringify(S))}catch(e){}}
const SS=new Date().toISOString().slice(0,7);if(S.ss!=SS){S.ss=SS;S.pp=0;S.pcl=[]}

// Curva de XP Rebalanceada y Realista
const TX={10:1.5,15:1.2,20:1,30:.8},tmx=()=>TX[S.tt||15]||1,DAYXP=600,JM=480;
const XPT=[0,1200,3200,6500,11500,18500,28000,40000],SEM=[0,1,3,4,5,6,7,8],XC=[0,100,200,350,550,800,1200,1800];
const td=new Date().toDateString(),yd=new Date(Date.now()-864e5).toDateString();
if(!S.dx||S.dx.d!=td)S.dx={d:td,n:0};if(!S.jn||S.jn.d!=td)S.jn={d:td,m:0};
if(!S.mi||S.mi.d!=td)S.mi={d:td,p:[0,0,0],c:[0,0,0]};
let cdb=null,ct=0;
function save(){try{localStorage.setItem('cr',JSON.stringify(S))}catch(e){}clearTimeout(ct);ct=setTimeout(()=>{if(cdb)cdb.set({v:JSON.stringify(S),t:Date.now()}).catch(()=>{})},1500)}
function norm(){['xp','best','streak','coins','tr','sk','br','pp','fp','rk','exCd','dv','lp','ws','ttl','xpb','free','risk','spec'].forEach(k=>S[k]=S[k]||0);if(!S.mmr)S.mmr=1000;S.pr=S.pr||null;S.historial=S.historial||[];if(!S.tt)S.tt=15;S.sh=S.sh||0;S.pk=S.pk||0;
if(!Number.isFinite(Number(S.se))||Number(S.se)>1000||Number(S.se)<1)S.se=1;if(!S.seStart||!Number.isFinite(Number(S.seStart)))S.seStart=Date.now();if(Date.now()-Number(S.seStart)>=60*864e5){const pk=Math.max(S.pk||0,S.dv),rw=100*(pk+1);S.coins+=rw;S.mmr=Math.round(1000+(S.mmr-1000)/2);S.dv=Math.max(0,S.dv-2);S.lp=0;S.pr=null;S.pk=S.dv;S.se=Number(S.se)+1;S.seStart=Date.now();S.seasonClaims=[];S.smsg='🏁 Nueva temporada '+S.se+'. Premio por tu mejor liga ('+DV[pk]+'): +'+rw+' monedas. Reinicio parcial de liga y MMR.'}S.last=S.last||'';S.ms=S.ms||{};S.hs=S.hs||{};S.own=S.own||[0];S.pcl=S.pcl||[];S.fi=S.fi||[];S.cs=S.cs||{};S.caseReports=S.caseReports||{};S.ttls=S.ttls||[0];S.objs=S.objs||[];if(!S.dx||S.dx.d!=td)S.dx={d:td,n:0};if(!S.jn||S.jn.d!=td)S.jn={d:td,m:0};if(!S.mi||S.mi.d!=td)S.mi={d:td,p:[0,0,0],c:[0,0,0]}}
if(S.last!=td){S.streak=S.last==yd?S.streak+1:1;S.last=td;save()}


// ================= SISTEMA INTELIGENTE: "¿QUÉ ME TOCA HACER HOY?" =================
function getNextObjective(){
  const l=lvl(),st=STAGES[l];
  for(const rq of st.reqs){
    if(pc(rq.t)<70){
      return {
        stage:st.name,
        title:rq.lbl,
        sub:`Llevas ${pc(rq.t)}% de dominio (${rq.desc}). Alcanza 70% para avanzar a ${T[Math.min(7,l+1)]}.`,
        pct:pc(rq.t),
        act:()=>{S.br=rq.br;save();play()}
      };
    }
  }
  if(l<7 && S.xp<XPT[l+1]){
    return {
      stage:st.name,
      title:`Suma ${XPT[l+1]-S.xp} XP de experiencia práctica`,
      sub:`Ya dominaste los temas de esta etapa. Juega Duelos 3D, Casos o Simuladores para completar tu XP y rendir el Examen de Ascenso a ${T[l+1]}.`,
      pct:Math.min(100,Math.round(100*(S.xp-XPT[l])/(XPT[l+1]-XPT[l]))),
      act:()=>duel()
    };
  }
  if(l<7){
    return {
      stage:st.name,
      title:`¡Listo para ascender a ${T[l+1]}!`,
      sub:`Cumples todos los requisitos académicos y de XP. Rinde el Examen de Certificación ahora.`,
      pct:100,
      act:()=>triggerExamenAscenso()
    };
  }
  return {
    stage:st.name,
    title:`Rango Máximo: Contador Público Élite`,
    sub:`Defiende tu rango en la Clasificatoria (Liga ${DV[S.dv]}) y completa todos los Casos Reales con 3 estrellas.`,
    pct:100,
    act:()=>duel()
  };
}

// ================= NUEVO SIMULADOR: HOJA DE TRABAJO (BALANCE DE COMPROBACIÓN 10 COLUMNAS) =================
const HT_ITEMS=[
  ["104 Cuentas corrientes en bancos (Saldo Deudor S/ 25,000)","Inventario: Activo","Porque las cuentas de los Elementos 1, 2 y 3 son cuentas patrimoniales de Activo en el Estado de Situación Financiera."],
  ["421 Facturas por pagar comerciales (Saldo Acreedor S/ 14,000)","Inventario: Pasivo / Patrimonio","Porque los Elementos 4 y 5 conforman el Pasivo y Patrimonio en el Balance."],
  ["701 Ventas de mercaderías (Saldo Acreedor S/ 80,000)","Naturaleza: Ganancia y Función: Ganancia","Las ventas del giro (Cuenta 70) se transfieren como ingreso tanto al Estado de Resultados por Naturaleza como por Función."],
  ["941 Gastos de administración (Saldo Deudor S/ 12,000)","Función: Pérdida (Gasto)","Las cuentas del Elemento 9 (92, 94, 95, 97) van exclusivamente a la columna de Pérdidas del Estado de Resultados por Función."],
  ["621 Remuneraciones al personal (Saldo Deudor S/ 15,000)","Naturaleza: Pérdida (Gasto)","Las cuentas del Elemento 6 (excepto 69) van a la columna de Pérdidas del Estado de Resultados por Naturaleza."],
  ["691 Costo de ventas de mercaderías (Saldo Deudor S/ 45,000)","Función: Pérdida (Gasto)","El Costo de Ventas (Cuenta 69) determina la utilidad bruta en el Estado de Resultados por Función."],
  ["791 Cargas imputables a cuentas de costos y gastos (Saldo Acreedor S/ 18,000)","Se cancela en Transferencias / Ajustes (No va a EEFF)","La cuenta 79 es puente acreedora del Elemento 9 y se salda en las columnas de transferencias de la Hoja de Trabajo."],
  ["391 Depreciación acumulada de PPE (Saldo Acreedor S/ 8,000)","Inventario: Pasivo / Patrimonio (Valuación de Activo)","Al tener saldo acreedor en el Balance, se ubica en la columna acreedora de Inventario (restando al activo fijo en el ESF)."]
];
const HT_COLS=["Inventario: Activo","Inventario: Pasivo / Patrimonio","Naturaleza: Pérdida (Gasto)","Función: Pérdida (Gasto)","Naturaleza: Ganancia y Función: Ganancia","Se cancela en Transferencias / Ajustes (No va a EEFF)"];

function htGame(){
  LAST=htGame;
  const it=HT_ITEMS[rn(0,HT_ITEMS.length-1)];
  const wr=sh(HT_COLS.filter(x=>x!=it[1])).slice(0,2);
  const o=sh([it[1],...wr]);
  G={ht:it,o,lock:0};
  show('game');
  $('game').innerHTML=`<div class=row><b>📊 Hoja de Trabajo (10 Columnas)</b><span class=mu>Cierre Contable</span></div>
  <div class=card>
    <small class=mu>En el Balance de Comprobación al cierre del ejercicio, ¿a qué columna de los Estados Financieros se traslada el saldo de esta cuenta?</small>
    <div class=doc-box style="margin-top:10px;font-size:14px"><b>📌 Cuenta y Saldo Mayorizado:</b><br>${it[0]}</div>
  </div>
  ${o.map(t=>`<button class=op onclick="htAns(this,'${t}')">${t}</button>`).join('')}
  <div id=fb></div>`;
}
function htAns(b,val){
  if(G.lock)return;G.lock=1;
  const ok=val==G.ht[1];
  document.querySelectorAll('.op').forEach(x=>{x.disabled=1;if(x.textContent==G.ht[1])x.classList.add('ok')});
  if(!ok){b.classList.add('bad');$('game').classList.add('shake');vib([70,40,70])}else vib(25);
  ms(4,ok);ms(82,ok);jn(4);mis(2);
  const g=addXP(ok?45:10),c=ok?18:4;S.coins+=c;save();
  $('fb').innerHTML=`<div class=fb>${ok?'✅ <b>¡Columna Correcta!</b>':'❌ <b>Error en Hoja de Trabajo</b>'}<br><small class=mu>${G.ht[2]}</small></div>
  <button class=go onclick=htGame()>📊 Siguiente Cuenta (+${g} XP · +${C(c)})</button>
  <button class=sec onclick=practica()>← Volver a Centro de Práctica</button>`;
}

// ================= COMPENDIO / MANUAL TÉCNICO =================
const MANUAL=[
  ["🗂️ Dinámica PCGE: Elemento 6, 9 y Cuenta 79",
   `<b>Regla de Oro del Asiento por Naturaleza y por Función:</b><br>
   • Cada vez que registras un gasto en las cuentas <code>62, 63, 64, 65, 68</code> (Naturaleza), debes generar simultáneamente un <b>asiento de destino</b> hacia el Elemento 9:<br>
   <code>Debe 94 Gastos de Administración</code> (o <code>95 Ventas</code> / <code>92 Costo de Producción</code>) / <code>Haber 79 CICC</code>.<br>
   • <b>Excepción 1 (Compras - Cuenta 60):</b> El destino de la compra de bienes almacenables va al almacén: <code>Debe 20 Mercaderías (o 24/25) / Haber 61 Variación de inventarios</code>.`],
  ["🏛️ IGV: Detracciones (SPOT), Retenciones y Percepciones",
   `• <b>Detracción (SPOT):</b> El adquirente descuenta un % (ej. <code>12%</code> en servicios empresariales, <code>10%</code> en alquileres, <code>4%</code> en transporte) y lo deposita en el <b>Banco de la Nación</b> del proveedor.<br>
   • <b>Retención del IGV (3%):</b> Aplica cuando el cliente es <b>Agente de Retención</b> y la operación supera <code>S/ 700</code>.<br>
   • <b>Bancarización (Ley 28194):</b> Obligatoria desde <code>S/ 2,000</code> o <code>US$ 500</code>. Sin medio de pago bancario se pierde el crédito fiscal y el gasto para Renta.`],
  ["👷 Planilla (PLAME), Beneficios Sociales y 5ta Categoría",
   `• <b>Aportes y Descuentos:</b> Al trabajador se le retiene <code>13% ONP</code> (Cta 4032) o <code>AFP</code> (Cta 417). El empleador aporta <code>9% de EsSalud</code> (Debe 6271 / Haber 4031).<br>
   • <b>Cálculo de 5ta Categoría:</b> Remuneración Bruta Anual Proyectada (12 sueldos + 2 gratificaciones) menos <b>7 UIT</b>. Tasas progresivas: <code>8%, 14%, 17%, 20% y 30%</code>.`],
  ["🏦 Contabilidad Bancaria (Manual SBS)",
   `• <b>Estructura SBS:</b> 1er dígito = Clase (<code>1 Activo, 2 Pasivo, 3 Patrimonio, 4 Gastos, 5 Ingresos, 6 Resultados, 7 Contingentes, 8 Cuentas de Orden</code>). 3er dígito = Moneda (<code>1 MN, 2 ME</code>).<br>
   • <b>Cartera de Créditos (Rubro 14):</b> <code>1401 Vigentes, 1405 Vencidos, 1406 Cobranza Judicial, 1409 Provisiones</code>. Los intereses de créditos vencidos se suspenden en la cuenta de orden <code>8104</code>.`],
  ["📘 NIIF Clave y NIC 12 (Impuesto a las Ganancias)",
   `• <b>NIC 12:</b> Multas de SUNAT o gastos sin sustento son diferencias <i>Permanentes</i>. Vacaciones no pagadas al vencimiento de la DJ o desvalorización de existencias (NIC 2) son diferencias <i>Temporarias Deducibles</i> y generan <b>Activo por Impuesto Diferido</b> (<code>Debe 3712 / Haber 882</code> al 29.5%).`],
  ["🔍 Auditoría Financiera (NIAs) y Dictámenes",
   `• <b>Tipos de Opinión (NIA 700 / 705):</b> 1) Limpia (No modificada), 2) Con salvedades (material pero NO generalizada), 3) Adversa (material y generalizada), 4) Abstención de opinión (limitación al alcance generalizada).`]
];

let curTab='home';
function manual(){
  show('over');
  $('over').innerHTML=`<h1>📘 Manual Profesional</h1><small class=mu>Estudia las reglas técnicas antes de entrar a los simuladores o exámenes.</small>
  ${MANUAL.map(m=>`<div class=card><b>${m[0]}</b><div class=manual-sec>${m[1]}</div></div>`).join('')}
  <button class=sec onclick=practica()>← Volver a Práctica</button>`;
}

// ================= SIMULADOR DE AUDITORÍA DE ESCRITORIO =================
const AUD_DOCS=[
  {
    t:"Factura Electrónica F001-00482 · Compra de Suministros",
    doc:`<div class=doc-hdr><span>RUC: 20548791201 (ACTIVO / HABIDO)</span><span>FECHA: 14/10/2026</span></div>
    <b>Concepto:</b> Compra de 50 cajas de papel bond para oficina.<br>
    <b>Valor de Venta:</b> S/ 3,000.00 · <b>IGV (18%):</b> S/ 540.00 · <b>Total:</b> S/ 3,540.00<br>
    <b>Forma de Pago:</b> Cancelado en EFECTIVO por caja chica.<br>
    <b>Asiento del Auxiliar:</b> Debe 603 S/3,000 + Debe 40111 S/540 / Haber 101 Caja S/3,540.`,
    q:"Como Auditor Tributario, ¿cuál es el reparo crítico en esta operación?",
    ops:[
      "Incumple la Ley de Bancarización (≥ S/ 2,000): al pagarse en efectivo se pierde el crédito fiscal (S/ 540) y el gasto para Renta (S/ 3,000)",
      "El IGV está mal calculado; debió aplicarse 10%",
      "La factura es perfectamente válida porque el RUC está Activo y Habido"
    ],
    ok:0,
    exp:"Art. 4 y 8 del TUO de la Ley N.° 28194: toda operación desde S/ 2,000 o US$ 500 debe pagarse mediante Medios de Pago del sistema financiero para dar derecho a costo, gasto o crédito fiscal."
  },
  {
    t:"Liquidación de Planilla Mensual · Área de Administración",
    doc:`<div class=doc-hdr><span>TRABAJADOR: Juan Pérez (Régimen General · ONP)</span><span>MES: 10/2026</span></div>
    <b>Remuneración Básica:</b> S/ 2,500.00 · <b>Sin hijos</b><br>
    <b>Asiento registrado:</b><br>
    Debe 6211 Sueldos S/ 2,500 · Debe 6271 EsSalud S/ 225<br>
    Haber 4031 EsSalud S/ 225 · Haber 4032 ONP S/ 325 · Haber 4111 Sueldos por pagar S/ 2,175.<br>
    <i>(No se registró ningún otro asiento en el Libro Diario).</i>`,
    q:"Revisando el Libro Diario, ¿qué omitió registrar el Asistente Contable?",
    ops:[
      "Omitió el asiento de destino del gasto: Debe 94 Gastos de Administración S/ 2,725 / Haber 79 CICC S/ 2,725",
      "Descontó mal la ONP; a cargo del trabajador es el 9% y no el 13%",
      "El aporte de EsSalud (S/ 225) debía descontarse del sueldo neto del trabajador"
    ],
    ok:0,
    exp:"Todo gasto registrado en el Elemento 6 (62 Gastos de personal por S/ 2,500 + S/ 225 = S/ 2,725) requiere su asiento de destino en el Elemento 9 (94 a 79) para el Estado de Resultados por Función."
  },
  {
    t:"Cédula de Auditoría · Cartera de Créditos Bancarios (SBS)",
    doc:`<div class=doc-hdr><span>ENTIDAD: Banco Andino S.A.</span><span>NORMA: Manual SBS</span></div>
    <b>Cliente:</b> Textil Sur S.A.C. (Pagaré comercial vencido hace 45 días por S/ 100,000).<br>
    <b>Registro del mes en el Banco:</b><br>
    1) Reclasificado en el Rubro 1415 (Créditos Vencidos MN).<br>
    2) Se devengaron intereses del mes en: <b>Debe 1418 Rendimientos devengados S/ 1,500 / Haber 5114 Ingresos por intereses S/ 1,500</b>.`,
    q:"Como Auditor Financiero / SBS, ¿qué observación debes formular?",
    ops:[
      "Los intereses de créditos vencidos NO pueden reconocerse como ingreso en la Clase 5; deben suspenderse y registrarse en Cuentas de Orden (Rubro 8104)",
      "El crédito vencido debe llevarse a la cuenta 12 del PCGE",
      "El registro es correcto porque la NIC 18 obliga a devengar intereses siempre"
    ],
    ok:0,
    exp:"Según el Manual de Contabilidad SBS, los intereses de créditos vencidos o en cobranza judicial dejan de reconocerse en resultados (Clase 5) y se controlan en la cuenta de orden 8104 hasta su cobro efectivo."
  },
  {
    t:"Revisión de Cierre Anual · Valuación de Inventarios (NIC 2)",
    doc:`<div class=doc-hdr><span>EMPRESA: ElectroPerú S.A.C.</span><span>CIERRE: 31/12/2026</span></div>
    <b>Partida:</b> Lote de 100 televisores modelo antiguo en almacén.<br>
    <b>Costo en Kardex (Cta 2011):</b> S/ 1,200 c/u (Total S/ 120,000).<br>
    <b>Precio estimado de venta actual:</b> S/ 1,150 c/u · <b>Comisión y gasto de venta:</b> S/ 100 c/u.<br>
    <b>Dictamen del Contador Junior:</b> "No se hace asiento porque aún no se han vendido".`,
    q:"¿Cuál es el ajuste de auditoría obligatorio bajo la NIC 2?",
    ops:[
      "El VNR unitario es S/ 1,050 (1,150 − 100), menor al costo (S/ 1,200): debe registrarse desvalorización por S/ 15,000 (Debe 695 / Haber 291)",
      "Se debe revaluar la mercadería aumentando la cuenta 20 en S/ 5,000",
      "No corresponde ajuste contable hasta que se destruya la mercadería ante notario"
    ],
    ok:0,
    exp:"La NIC 2 exige medir los inventarios al menor entre el Costo (S/ 120,000) y el VNR (100 × 1,050 = S/ 105,000). Contablemente se reconoce el deterioro de S/ 15,000 (Cuenta 695 contra 291)."
  },
  {
    t:"Factura F002-00910 · Servicio de Asesoría Legal (Sujeto a SPOT)",
    doc:`<div class=doc-hdr><span>PROVEEDOR: Estudio Jurídico Lex S.A.C.</span><span>TOTAL FACTURA: S/ 5,900.00</span></div>
    <b>Detalle:</b> Base Imponible S/ 5,000.00 + IGV S/ 900.00 = Total S/ 5,900.00.<br>
    <b>Sujeto a Detracción (SPOT):</b> 12% sobre el importe de la operación.<br>
    <b>Pago realizado por Tesorería:</b> Transfirió los S/ 5,900.00 íntegros a la cuenta corriente comercial del proveedor en el BCP.`,
    q:"¿Qué contingencia tributaria generó Tesorería al pagar el 100% a la cuenta comercial?",
    ops:[
      "No depositó la detracción de S/ 708 (12% de 5,900) en el Banco de la Nación: difiere el uso del crédito fiscal y genera multa del 50% del importe no detraído",
      "La detracción debió calcularse solo sobre los S/ 5,000 sin IGV (S/ 600)",
      "Ninguna contingencia porque el pago fue bancarizado por el BCP"
    ],
    ok:0,
    exp:"En servicios afectos al SPOT (12%), el adquirente debe depositar S/ 708 en el Banco de la Nación y pagar el saldo (S/ 5,192) al proveedor. No detraer difiere el crédito fiscal."
  }
];

function audGame(){
  LAST=audGame;
  const d=AUD_DOCS[rn(0,AUD_DOCS.length-1)];
  const o=sh(d.ops.map((t,i)=>[t,i]));
  G={aud:d,o,lock:0};
  show('game');
  $('game').innerHTML=`<div class=row><b>🔍 Auditoría de Escritorio</b><span class=mu>Criterio Profesional</span></div>
  <div class=card><b>📄 ${d.t}</b><div class=doc-box>${d.doc}</div><h2>${d.q}</h2></div>
  ${o.map(([t,k])=>`<button class=op data-k=${k} onclick=audAns(this)>${t}</button>`).join('')}
  <div id=fb></div>`;
}
function audAns(b){
  if(G.lock)return;G.lock=1;
  const ok=+b.dataset.k==G.aud.ok;
  document.querySelectorAll('.op').forEach(x=>{x.disabled=1;if(+x.dataset.k==G.aud.ok)x.classList.add('ok')});
  if(!ok){b.classList.add('bad');$('game').classList.add('shake');vib([70,40,70])}else vib(25);
  ms(32,ok);ms(43,ok);jn(4);mis(2);
  const g=addXP(ok?55:12),c=ok?22:5;S.coins+=c;save();
  $('fb').innerHTML=`<div class=fb>${ok?'✅ <b>¡Dictamen Correcto!</b>':'❌ <b>Error de Auditoría</b>'}<br><small class=mu>${G.aud.exp}</small></div>
  <button class=go onclick=audGame()>🔍 Auditar otro documento (+${g} XP · +${C(c)})</button>
  <button class=sec onclick=practica()>← Volver a Práctica</button>`;
}

// ================= LÓGICA DE PROGRESIÓN Y PESTAÑAS ORGANIZADAS =================
function theme(){
  const k=SK[S.sk||0],r=document.documentElement.style;
  r.setProperty('--bg',k[3]);r.setProperty('--card',k[4]);
  r.setProperty('--card2',shadeHex(k[4],1.35));
  r.setProperty('--pu',k[5]);r.setProperty('--ac',k[6]);
}
let G={},R=[],LAST;
const canAccess=minRk=>S.free||lvl()>=minRk;
const rq=i=>i<6||[1,2,3,4,5,6,7,8,9].filter(r=>bm(r)>=2).length>=(i==6?3:6);
const gl=()=>{let n=0;while(n<7&&(S.ms[n]||0)>=.7)n++;return n};
function elig(){
  let l=0;
  while(l<7){
    const st=STAGES[l];
    const reqsOk=st.reqs.every(r=>pc(r.t)>=70);
    if(S.xp>=XPT[l+1] && reqsOk) l++;
    else break;
  }
  return l;
}
function lvl(){return Math.min(S.rk||0,7)}
const pc=t=>Math.round(100*(S.ms[t]||0));
function ms(t,ok){const v=S.ms[t]||0;S.ms[t]=v+((ok?1:0)-v)*.11} // Sube ~11% por acierto para que 10-12 aciertos lleguen a 70%
function jn(m){if(S.jn.d!=td)S.jn={d:td,m:0};S.jn.m+=m}

// Ganancia de XP Rebalanceada (x3 más rápida + Booster x2)
function addXP(n){
  jn(0);
  let boost=1;
  if(S.xpb>0){boost=2;S.xpb--}
  const g=Math.max(5,Math.round(n*1.1*boost*(S.jn.m>JM?.25:1)*(G.tt?tmx():1)));
  S.dx.n+=g;S.xp+=g;S.pp+=Math.round(n*1.2);
  return g;
}
function cafe(){if(S.coins>=30&&S.jn.m>0){S.coins-=30;S.jn.m=Math.max(0,S.jn.m-60);save();home()}else vib(80)}
function mis(k){
  const m=S.mi;m.p[k]++;
  if(m.p[k]>=MI[k][1]&&!m.c[k]){
    m.c[k]=1;S.coins+=45;S.xp+=120;S.pp+=80;
  }
}
const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
function show(v){if(v!='home'&&v!='game')stop3D();['home','game','over'].forEach(x=>$(x).hidden=x!=v);$('nav').hidden=v=='game';if(v!='game')vig(0)}
function sel(i){
  // Selección de rama: en Modo Libre se permite cualquier rama y se guarda el cambio.
  i=Number(i);
  if(!Number.isInteger(i)||i<0||i>=BR.length)return;
  if(Number(S.free)===1 || S.free===true || canAccess(BR[i][1])){
    S.br=i; save(); home();
  } else {
    vib(80); alert(`🔒 La rama ${BR[i][0]} se desbloquea en el rango «${T[BR[i][1]]}» (o activa el Modo Libre en la pestaña Ruta).`);
  }
}
const avt=i=>`<span class=av-mini>${skinArtSVG(i)}</span>`;

function navi(){
  const items=[
    ['home','🏠','Oficina','home()'],
    ['ruta','🗺️','Ruta','ruta()'],
    ['career','🎓','Carrera','careerHub()'],
    ['practica','🛠️','Práctica','practica()'],
    ['ranks','🏅','Mi CV','ranks()'],
    ['pase','🎟️','Pase/Tienda','pase()']
  ];
  $('nav').innerHTML=items.map(x=>`<button class="${curTab==x[0]?'nav-on':''}" onclick="${x[3]}"><span style="font-size:18px">${x[1]}</span>${x[2]}</button>`).join('');
}

// 1. PESTAÑA PRINCIPAL: OFICINA 3D + SIGUIENTE PASO GUIADO (LIMPIA Y DIRECTA)
function home(){
  curTab='home';navi();
  const l=lvl(),r=(Number(S.free)===1||S.free===true||canAccess(BR[S.br][1]))?S.br:0;
  const ofName=l>=5?'Penthouse Corporativo 3D':l>=2?'Despacho Analista 3D':'Estación Contable 3D';
  const obj=getNextObjective();
  show('home');
  $('home').innerHTML=`<div class=top>
    <span class=chip>${avt(S.sk)} <div><b>${T[l]}</b>${S.ttl?`<div style="font-size:9px;color:var(--ac)">«${TITLES[S.ttl]}»</div>`:''}</div></span>
    <span class=chip>${C(S.coins)}</span>
    <span class=chip>${IC.fire} ${S.streak}</span>
    <span class=chip>${IC.shield} ${S.sh||0}</span>
    <button class=chip style="border-color:var(--ac);color:var(--ac)" onclick=howTo()>❓ Guía</button>
  </div>
  ${S.smsg?`<div class=card>${S.smsg} <button class=pw onclick="S.smsg='';save();home()">OK</button></div>`:''}
  <div class=hero>
    <div class=stage3d>
      <span class=badge3d>🏢 ${ofName}</span>
      <div class=avatar-hud3d title="Campeón equipado">${skinArtSVG(S.sk)}</div>
      <canvas id="cvHome3D"></canvas>
      <button class=cam-btn onclick="cycleCam()">🎥 Vista: ${['Frontal','Desde Arriba','Monitor'][W3D.camPreset]}</button>
      <span class=hint3d>🔄 Arrastra para rotar</span>
    </div>
    <div class=row style="margin:2px 0">
      <b class=gfont style="font-size:19px">${T[l]}</b>
      <span class=chip style="padding:3px 9px;font-size:12px">${rankBadgeSVG(S.dv)} ${DV[S.dv]} · ${S.lp} LP</span>
    </div>
    <div class=bar><i style="width:${l==7?100:Math.min(100,100*(S.xp-XPT[l])/(XPT[l+1]-XPT[l]))}%"></i></div>
    <div class=row style="font-size:12px">
      <span class=mu>${l==7?'👑 Rango Máximo':`XP Carrera: ${S.xp.toLocaleString()} / ${XPT[l+1].toLocaleString()}`}</span>
      ${S.xpb>0?`<span style="color:var(--ok);font-weight:800">⚡ Booster XP x2 (${S.xpb} preg.)</span>`:`<span class=mu>Jornada: ${S.jn.m}/${JM}m</span>`}
    </div>
  </div>

  <!-- TARJETA INTELIGENTE: EL CAMINO CLARO PARA CUALQUIER JUGADOR -->
  <div class=quest-box>
    <div class=row style="margin-top:0">
      <span class=step-pill>🎯 TU SIGUIENTE PASO HOY</span>
      <small style="font-weight:800;color:var(--ac)">${obj.stage}</small>
    </div>
    <h2 style="margin:6px 0 4px">${obj.title}</h2>
    <small class=mu style="display:block;margin-bottom:8px">${obj.sub}</small>
    <div class=bar><i style="width:${obj.pct}%"></i></div>
    <button class=go style="margin-top:8px;padding:12px;font-size:16px" onclick="getNextObjective().act()">▶ IR A CUMPLIR OBJETIVO (${obj.pct}%)</button>
  </div>

  ${elig()>l?`<button class=go style="background:linear-gradient(90deg,#10b981,var(--ac))" onclick=triggerExamenAscenso()>📜 ¡EXAMEN DE ASCENSO DISPONIBLE! · ${T[l+1]} (${C(XC[l+1])})</button>`:''}

  <div class=gr style="margin-top:10px">
    <button class="go big" style="background:linear-gradient(135deg,#f43f5e,#ff7b00);margin:0" onclick="prep('duel')">${IC.swords}<br>DUELO 3D (LIGA)<br><small style="font-size:11px;opacity:.9">${S.tt||15}s · ${BR[r][0]}</small></button>
    <button class="go big" style="margin:0" onclick="prep('play')">▶<br>MODO ESTUDIO<br><small style="font-size:11px;opacity:.9">${S.tt||15}s · ${BR[r][0]}</small></button>
  </div>

  <div class=row style="margin-top:14px">
    <b class=gfont style="font-size:14px">Rama activa de preguntas:</b>
    <button class=pw onclick="ruta()">🗺️ Ver Ruta Completa →</button>
  </div>
  <div class=chips>${BR.map((b,i)=>{
    const ok=(Number(S.free)===1||S.free===true||canAccess(b[1]));
    return `<button type="button" class="sec ${i==r?'act':''}" style="${ok?'':'opacity:.55'}" onclick="sel(${i})">${ok?'':'🔒 '}${b[0]}${i?' '+bm(i)+'/'+b[2].length:''}</button>`;
  }).join('')}</div>

  <div class=card>
    <div class=row><b class=gfont>🎯 Misiones Diarias (+120 XP y +45 Monedas c/u)</b></div>
    ${MI.map((m,i)=>`<div class=m><span>${S.mi.c[i]?'✅':'⬜'} ${m[0]}</span><b>${Math.min(S.mi.p[i],m[1])}/${m[1]}</b></div>`).join('')}
  </div>`;
  try{init3D('cvHome3D','office')}catch(e){}
}

function howTo(){
  show('over');
  $('over').innerHTML=`<h1>❓ ¿Cómo funciona Cuenta Rush?</h1>
  <div class=card>
    <b>1. Un solo camino profesional (De Aprendiz a Auditor/CPC)</b>
    <p class=mu style="font-size:13px">Tu objetivo es ascender por los 8 puestos reales de la carrera contable. En la pantalla principal siempre verás el recuadro dorado <b>«🎯 Tu Siguiente Paso Hoy»</b> que te indica exactamente qué tema estudiar o practicar.</p>
  </div>
  <div class=card>
    <b>2. ¿Cómo subo de puesto? (3 requisitos reales)</b>
    <p class=mu style="font-size:13px">Para ascender (ej. de Aprendiz a Auxiliar o Asistente) necesitas:<br>
    • <b>Dominar al 70%</b> los módulos y semestres universitarios de tu etapa actual (en la pestaña <b>🗺️ Ruta</b>).<br>
    • <b>Alcanzar la XP</b> del puesto practicando en Simuladores, Estudio o Duelos.<br>
    • <b>Aprobar el Examen de Certificación</b> (20 preguntas sin comodines).</p>
  </div>
  <div class=card>
    <b>3. Práctica Real vs. Liga Competitiva</b>
    <p class=mu style="font-size:13px">• En <b>🛠️ Práctica</b> tienes simuladores de trabajo real: <i>Libro Diario, Hoja de Trabajo de 10 Columnas, Auditoría de Facturas y Casos</i>.<br>
    • En <b>⚔️ Duelo 3D</b> compites por puntos de liga (LP) desde Hierro hasta Retador.</p>
  </div>
  <button class=go onclick=home()>¡Entendido, vamos a la Oficina!</button>`;
}

// 2. PESTAÑA RUTA: CARRERA + UNIVERSIDAD + CASOS UNIFICADOS EN ORDEN CRONOLÓGICO
// 2. PESTAÑA RUTA: CARRERA + UNIVERSIDAD (10 SEMESTRES) + ÁRBOL DE ESPECIALIZACIÓN
function selectSpec(id){
  const doneSem = [0,1,2,3,4,5,6,7,8,9].filter(i=>pc(100+i)>=70).length;
  const free = Number(S.free)===1 || S.free===true;
  const etapasCompletadas = (S.rk||0) >= 7;
  if(!free && (!etapasCompletadas || doneSem < 10)){
    vib(80);
    alert(`🔒 Especializaciones bloqueadas. Completa las 8 etapas profesionales y domina los 10 semestres universitarios (actualmente: ${doneSem}/10), o activa el Modo Libre.`);
    return;
  }
  const sp = SPECS.find(x=>x.id==id);
  if(!sp) return;
  S.spec = id;
  if(sp.branches && sp.branches.length) S.br = sp.branches[0];
  save();
  celebra(`🎓 ¡ESPECIALIZACIÓN ELEGIDA!<br>${sp.name}`);
  ruta();
}

// Prácticas obligatorias por rango. El progreso se mide con las competencias ya registradas por el juego.
const ASC_PRACTICES=[
  [
    {t:0,nm:'Clasifica Cuentas',desc:'Clasificación de activo, pasivo, patrimonio, ingresos y gastos.',fn:"LAST=()=>blitz('🗂️ Clasifica',nxC);LAST()"},
    {t:1,nm:'Partida Doble Rápida',desc:'Debe, Haber y asientos básicos.',fn:"LAST=()=>blitz('📒 Asientos',nxA);LAST()"},
    {t:100,nm:'Comprobantes y archivo',desc:'Validar facturas, boletas y sustento documental.',fn:"LAST=()=>blitz('🧾 Comprobantes y archivo',nxA);LAST()"}
  ],
  [
    {t:1,nm:'Partida Doble Rápida',desc:'Registrar operaciones sin descuadres.',fn:"LAST=()=>blitz('📒 Asientos',nxA);LAST()"},
    {t:2,nm:'Memoria PCGE',desc:'Reconocer códigos y cuentas del plan contable.',fn:'mem()'},
    {t:80,nm:'Libro Diario y destino',desc:'Registrar asientos y destino de gastos.',fn:'asi()'}
  ],
  [
    {t:3,nm:'IGV y crédito fiscal',desc:'Determinar débito, crédito y saldo tributario.',fn:"LAST=()=>blitz('🧾 IGV y crédito fiscal',nxG);LAST()"},
    {t:40,nm:'Detracciones y retenciones',desc:'Aplicar obligaciones y porcentajes tributarios.',fn:"LAST=()=>blitz('📉 Detracciones y retenciones',nxG);LAST()"},
    {t:70,nm:'Planillas y beneficios',desc:'Remuneraciones y obligaciones laborales.',fn:"LAST=()=>blitz('👥 Planillas y beneficios',nxG);LAST()"},
    {t:103,nm:'Ciclo contable',desc:'Aplicar el registro en operaciones reales.',fn:'asi()'}
  ],
  [
    {t:4,nm:'Ratios financieros',desc:'Analizar liquidez, endeudamiento y rentabilidad.',fn:"LAST=()=>blitz('📈 Ratios financieros',nxG);LAST()"},
    {t:5,nm:'Costos y punto de equilibrio',desc:'Calcular costos y margen de contribución.',fn:"LAST=()=>blitz('🏭 Costos y equilibrio',nxG);LAST()"},
    {t:10,nm:'Kardex e inventarios',desc:'Controlar existencias y costo de ventas.',fn:"LAST=()=>blitz('📦 Kardex e inventarios',nxG);LAST()"},
    {t:104,nm:'Hoja de Trabajo (10 columnas)',desc:'Preparar saldos y estados financieros.',fn:'htGame()'}
  ],
  [
    {t:6,nm:'Depreciación y cierre',desc:'Registrar ajustes y activos fijos.',fn:"LAST=()=>blitz('🧮 Depreciación PPE',nxG);LAST()"},
    {t:20,nm:'Finanzas y VAN/TIR',desc:'Resolver cálculos financieros y ratios.',fn:"LAST=()=>blitz('🧮 Blitz cálculo',nxG);LAST()"},
    {t:50,nm:'NIIF básicas y clave',desc:'Aplicar criterios de reconocimiento y medición.',fn:'htGame()'},
    {t:105,nm:'Caso integral de cierre',desc:'Resolver operaciones y ajustes del periodo.',fn:'cs(rn(0,CS.length-1))'}
  ],
  [
    {t:7,nm:'Nivel experto tributario',desc:'Resolver escenarios complejos de cierre e impuestos.',fn:"LAST=()=>blitz('🧮 Blitz cálculo',nxG);LAST()"},
    {t:60,nm:'Contabilidad gubernamental',desc:'Aplicar fases y control del gasto público.',fn:'audGame()'},
    {t:90,nm:'Auditoría de escritorio',desc:'Revisar documentos, riesgos y controles.',fn:'audGame()'},
    {t:106,nm:'Caso integral senior',desc:'Resolver un caso de mayor complejidad.',fn:'cs(rn(0,CS.length-1))'}
  ],
  [
    {t:107,nm:'Auditoría avanzada',desc:'Evaluar riesgos, evidencia y hallazgos.',fn:'audGame()'},
    {t:32,nm:'Auditoría y control interno',desc:'Detectar fallas y sustentar conclusiones.',fn:'audGame()'},
    {t:33,nm:'Caso integral de gerencia',desc:'Integrar las competencias profesionales.',fn:'cs(rn(0,CS.length-1))'},
    {t:50,nm:'Revisión NIIF',desc:'Evaluar criterios técnicos de información financiera.',fn:'htGame()'}
  ],
  [
    {t:33,nm:'Caso integral de élite',desc:'Demostrar dominio técnico global.',fn:'cs(rn(0,CS.length-1))'},
    {t:32,nm:'Auditoría final',desc:'Resolver un escenario de auditoría y control.',fn:'audGame()'},
    {t:50,nm:'Cierre NIIF',desc:'Validar medición, presentación y cierre.',fn:'htGame()'},
    {t:60,nm:'Caso de control institucional',desc:'Evaluar control, cumplimiento y riesgos.',fn:'audGame()'}
  ]
];
const ascPracticasOk=i=>ASC_PRACTICES[i].every(p=>pc(p.t)>=70);
function toggleStage(idx){
  const body=$(`stage-body-${idx}`),btn=$(`stage-toggle-${idx}`);
  if(!body||!btn)return;
  const isHidden=body.style.display==='none';
  body.style.display=isHidden?'':'none';
  btn.textContent=isHidden?'▼ Contraer':'▶ Desplegar';
}

function ruta(){
  curTab='ruta';navi();show('over');
  const l=lvl(), curSp=SPECS.find(x=>x.id==S.spec);
  const free = Number(S.free)===1 || S.free===true;
  const semDominados=[0,1,2,3,4,5,6,7,8,9].filter(i=>pc(100+i)>=70).length;
  const specLocked = !free && ((S.rk||0)<7 || semDominados<10);
  $('over').innerHTML=`<div class=row>
    <h1>🗺️ Ruta & Especialización</h1>
    <button class=pw style="border-color:var(--ac)" onclick="S.free=(Number(S.free)===1?0:1);save();ruta()">${S.free?'🔓 Modo Libre: ON':'🔒 Guiado por Nivel'}</button>
  </div>
  <small class=mu style="display:block;margin-bottom:12px">Completa tu formación general de 10 semestres y elige tu <b>Rama de Especialización CPC</b> con su propia metodología de juego.</small>

  ${STAGES.map((st,idx)=>{
    const done=idx<l,curr=idx==l,open=canAccess(idx);
    return `<div class="stage-node ${done?'done':curr?'curr':'lock'}">
      <div class="card ${open?'':'locked'}" style="margin:0;${curr?'border:2px solid var(--ac)':''}">
        <div class=row style="margin-top:0">
          <b class=gfont style="font-size:16px">${done?'✅':curr?'▶':'🔒'} ${st.name}</b>
          <span style="display:flex;align-items:center;gap:8px"><span class=mu style="font-size:11px">${XPT[idx].toLocaleString()} XP</span><button class=pw style="padding:5px 9px;font-size:11px" onclick="toggleStage(${idx});event.stopPropagation()" id="stage-toggle-${idx}">${curr?'▼ Contraer':'▶ Desplegar'}</button></span>
        </div>
        <div id="stage-body-${idx}" style="${curr?'':'display:none;'}">
        <small class=mu style="display:block;margin-bottom:8px">💼 ${st.real}</small>${st.reqs.map(rq=>{
          const p=pc(rq.t);
          return `<div style="background:rgba(0,0,0,.28);padding:8px 10px;border-radius:10px;margin:6px 0">
            <div class=row style="margin:0"><b style="font-size:12px">${p>=70?'✅':'🎯'} ${rq.lbl}</b><b style="color:${p>=70?'var(--ok)':'var(--ac)'}">${p}%</b></div>
            <small class=mu style="font-size:11px">${rq.desc}</small>
            <div class=bar><i style="width:${p}%"></i></div>
            ${open?`<button class=pw style="margin-top:4px;width:100%;justify-content:center" onclick="S.br=${rq.br};save();play()">▶ Practicar este módulo</button>`:''}
          </div>`;
        }).join('')}
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid #ffffff22">
          <div class=row style="margin:0 0 6px"><b style="font-size:13px">🎯 Prácticas necesarias para ascender</b><b style="color:${ascPracticasOk(idx)?'var(--ok)':'var(--ac)'}">${ASC_PRACTICES[idx].filter(p=>pc(p.t)>=70).length}/${ASC_PRACTICES[idx].length}</b></div>
          <small class=mu style="display:block;margin-bottom:8px">Domina cada competencia al 70% o más y aprueba el examen de ascenso. Los niveles superiores exigen más prácticas.</small>
          ${ASC_PRACTICES[idx].map(p=>{const v=pc(p.t),okp=v>=70;return `<div style="background:rgba(0,0,0,.22);padding:8px 10px;border-radius:9px;margin:6px 0;border:1px solid ${okp?'var(--ok)':'#ffffff18'}">
            <div class=row style="margin:0"><b style="font-size:12px">${okp?'✅':'🎯'} ${p.nm}</b><b style="color:${okp?'var(--ok)':'var(--ac)'}">${v}%</b></div>
            <small class=mu style="font-size:11px">${p.desc}</small><div class=bar><i style="width:${v}%;background:${okp?'var(--ok)':'var(--ac)'}"></i></div>
            ${open?`<button class=pw style="margin-top:5px;width:100%;justify-content:center" onclick="${p.fn}">▶ Practicar</button>`:''}
          </div>`}).join('')}
          <small class=mu style="display:block;margin-top:8px">🛠️ Simulador destacado: <b>${st.sim}</b></small>
        </div>
        </div>
      </div>
    </div>`;
  }).join('')}

  <div class=card>
    <div class=row><b class=gfont>🎓 Malla Universitaria Completa (10 Semestres · UNFV + USMP)</b><small class=mu>${semDominados}/10 semestres</small></div>
    ${UV.map((u,i)=>`<div class=m style="border-top:1px solid #fff1;padding-top:6px">
      <div><b>${pc(100+i)>=70?'✅':'📘'} ${u[0]} (${pc(100+i)}\%)</b><br><small class=mu>${u[3]}</small></div>
      <button class=pw onclick="S.br=10;save();play()">Practicar</button>
    </div>`).join('')}
  </div>

  <!-- SELECTOR DE ESPECIALIZACIÓN PROFESIONAL: requiere las 8 etapas y los 10 semestres -->
  <div class=card style="border:2px solid ${curSp?curSp.color:'var(--ac)'};background:linear-gradient(165deg,#1d2247,#0c0f20);${specLocked?'opacity:.82':''}">
    ${specLocked?`<div style="padding:10px;border-radius:10px;background:rgba(0,0,0,.28);margin-bottom:10px;color:#fbbf24">🔒 BLOQUEADO: completa las 8 etapas profesionales y los 10 semestres universitarios para desbloquear las especializaciones, o activa el Modo Libre.</div>`:`<div style="padding:10px;border-radius:10px;background:rgba(16,185,129,.12);margin-bottom:10px;color:#6ee7b7">${free?'🔓 MODO LIBRE: puedes cambiar de especialización':'🔓 ESPECIALIZACIONES DESBLOQUEADAS'}</div>`}
    <div class=row style="margin-top:0">
      <span class=step-pill style="background:${curSp?curSp.color:'var(--ac)'};color:#fff">🔱 ESPECIALIZACIÓN DE CARRERA (POST-10 SEMESTRES)</span>
      <small class=mu>${semDominados}/10 Semestres</small>
    </div>
    <h2 style="margin:6px 0 4px">${curSp?`Activa: ${curSp.name}`:'Elige tu Rama de Especialización Contable'}</h2>
    <small class=mu style="display:block;margin-bottom:10px">${curSp?`${curSp.mechName}:${curSp.mechDesc}`:'Cada rama tiene su propio banco de preguntas avanzadas, entidad reguladora y modificadores únicos en tus partidas.'}</small>
    ${SPECS.map(sp=>{
      const isSel = S.spec==sp.id;
      return `<div style="background:rgba(0,0,0,.38);border:1.5px solid ${isSel?sp.color:'rgba(255,255,255,.1)'};border-radius:14px;padding:10px;margin:8px 0">
        <div class=row style="margin:0">
          <b style="color:${sp.color};font-size:14px">${sp.name}</b>${isSel?`<span class=step-pill style="background:${sp.color};color:#fff">✔ ELEGIDA</span>`:`<button class=pw style="border-color:${sp.color}" ${specLocked?'disabled title="Completa las 8 etapas y los 10 semestres, o activa Modo Libre"':''} onclick="selectSpec(${sp.id})">${specLocked?'🔒 Bloqueada':'Elegir Rama'}</button>`}
        </div>
        <small style="color:#cbd5e1;font-size:11px;display:block;margin:3px 0">${sp.org}</small>
        <small class=mu style="font-size:11px;display:block">${sp.mechName} — ${sp.mechDesc}</small>${isSel?`<div style="margin-top:8px;border-top:1px dashed rgba(255,255,255,.15);padding-top:6px">
          ${sp.reqs.map(rq=>`<div class=row style="font-size:11px;margin:4px 0">
            <span>${pc(rq.t)>=75?'✅':'🎯'} ${rq.lbl}</span>
            <button class=pw onclick="S.br=${rq.br};save();play()">Practicar (${pc(rq.t)}%)</button>
          </div>`).join('')}
        </div>`:''}
      </div>`;
    }).join('')}
  </div>`;
}

// 3. PESTAÑA PRÁCTICA: SIMULADORES DE TRABAJO REAL + CASOS + MANUAL TÉCNICO
function practica(){
  curTab='practica';navi();show('over');
  const sims=[
    {nm:"🗂️ Clasifica Cuentas",desc:"Activo, Pasivo, Patrimonio, Ingreso o Gasto",rk:0,fn:"LAST=()=>blitz('🗂️ Clasifica',nxC);LAST()"},
    {nm:"📒 Partida Doble Rápida",desc:"Identifica cargos y abonos al instante",rk:0,fn:"LAST=()=>blitz('📒 Asientos',nxA);LAST()"},
    {nm:"🧠 Memoria PCGE",desc:"Une códigos de 2 dígitos con su cuenta",rk:1,fn:"mem()"},
    {nm:"🧾 Libro Diario (Asientos + Destino)",desc:"Construye asientos con Elemento 9 y Cta 79",rk:1,fn:"asi()"},
    {nm:"🧮 Blitz de Cálculo Contable",desc:"IGV, detracciones, planilla, ratios y VAN",rk:2,fn:"LAST=()=>blitz('🧮 Blitz cálculo',nxG);LAST()"},
    {nm:"📊 Hoja de Trabajo (10 Columnas)",desc:"Clasifica saldos en Inventario, Naturaleza y Función",rk:2,fn:"htGame()"},
    {nm:"💥 Cuadre Infernal",desc:"Detecta errores de suma y transposición (múltiplos de 9)",rk:3,fn:"LAST=()=>blitz('💥 Cuadre Infernal',nxD);LAST()"},
    {nm:"🔍 Auditoría de Escritorio",desc:"Revisa facturas, bancarización, planillas y normas SBS",rk:4,fn:"audGame()"},
    {nm:"🧾 IGV y crédito fiscal",desc:"Determina débito, crédito y saldo del IGV",rk:1,fn:"LAST=()=>blitz('🧾 IGV y crédito fiscal',nxG);LAST()"},
    {nm:"📉 Detracciones y retenciones",desc:"Aplica porcentajes y reconoce obligaciones tributarias",rk:2,fn:"LAST=()=>blitz('📉 Detracciones y retenciones',nxG);LAST()"},
    {nm:"👥 Planillas y beneficios",desc:"Remuneraciones, EsSalud, ONP y beneficios sociales",rk:2,fn:"LAST=()=>blitz('👥 Planillas y beneficios',nxG);LAST()"},
    {nm:"📈 Ratios financieros",desc:"Liquidez, endeudamiento, rentabilidad y DuPont",rk:3,fn:"LAST=()=>blitz('📈 Ratios financieros',nxG);LAST()"},
    {nm:"🏭 Costos y punto de equilibrio",desc:"Costo unitario, margen de contribución y punto de equilibrio",rk:3,fn:"LAST=()=>blitz('🏭 Costos y equilibrio',nxG);LAST()"},
    {nm:"📦 Kardex e inventarios",desc:"Control de existencias y costo de ventas",rk:2,fn:"LAST=()=>blitz('📦 Kardex e inventarios',nxG);LAST()"},
    {nm:"🏦 Conciliación bancaria",desc:"Identifica cheques pendientes, depósitos y cargos bancarios",rk:2,fn:"audGame()"},
    {nm:"🧮 Depreciación y activos fijos",desc:"Calcula depreciación y registra PPE",rk:3,fn:"LAST=()=>blitz('🧮 Depreciación PPE',nxG);LAST()"},
    {nm:"💳 Cuentas por cobrar y pagar",desc:"Reconoce cobranzas, pagos y saldos de terceros",rk:1,fn:"LAST=()=>blitz('💳 Cuentas por cobrar/pagar',nxA);LAST()"},
    {nm:"🛒 Compras y ventas",desc:"Registra operaciones comerciales con partida doble",rk:1,fn:"LAST=()=>blitz('🛒 Compras y ventas',nxA);LAST()"},
    {nm:"📚 PCGE avanzado",desc:"Refuerza códigos y denominaciones del plan contable",rk:2,fn:"mem()"},
    {nm:"🧾 Destino de gastos (Elemento 9)",desc:"Traslada gastos por naturaleza a función usando la cuenta 79",rk:2,fn:"asi()"},
    {nm:"📊 Cierre y hoja de trabajo",desc:"Traslada saldos a inventario, resultados y transferencias",rk:3,fn:"htGame()"},
    {nm:"🛡️ Control interno y cumplimiento",desc:"Detecta riesgos documentarios y fallas de control",rk:4,fn:"audGame()"},
    {nm:"🗂️ Casos contables integrales",desc:"Resuelve un caso completo de registro y análisis",rk:4,fn:"cs(rn(0,CS.length-1))"},
    {nm:"🧾 Comprobantes y archivo",desc:"Valida facturas, boletas, RUC, fechas y sustento documental",rk:0,fn:"LAST=()=>blitz('🧾 Comprobantes y archivo',nxA);LAST()"}
  ];
  $('over').innerHTML=`<div class=row><h1>🛠️ Centro de Práctica</h1><button class=pw style="border-color:var(--ac);color:var(--ac)" onclick=manual()>📘 Manual Técnico</button></div>
  <small class=mu>Simuladores prácticos que entrenan tu criterio operativo real. Se desbloquean según tu rango (o con Modo Libre).</small>
  <div class=gr style="margin-top:10px">
    ${sims.map(s=>{
      const ok=canAccess(s.rk);
      return `<div class="card ${ok?'':'locked'}" style="margin:0;display:flex;flex-direction:column;justify-content:space-between">
        <div>
          <div class=row style="margin-top:0"><b>${s.nm}</b>${ok?'':`<span class=mu style="font-size:10px">🔒 ${T[s.rk]}</span>`}</div>
          <small class=mu style="font-size:12px">${s.desc}</small>
        </div>
        <button class="${ok?'sec act':'sec'}" style="margin-top:10px" onclick="${ok?s.fn:`alert('Se desbloquea en el rango ${T[s.rk]} (o activa Modo Libre en la pestaña Ruta)')`}">${ok?'▶ Entrenar':'🔒 Bloqueado'}</button>
      </div>`;
    }).join('')}
  </div>

  <div class=card style="border-color:var(--ac);margin-top:16px">
    <div class=row style="margin-top:0"><h2>🗂️ Expedientes integrales</h2><b>${Object.keys(S.caseReports||{}).length}/${CS.length}</b></div>
    <small class=mu>Todos los casos se gestionan desde una sola carpeta. Completa un expediente para habilitar el siguiente y conservar la continuidad del trabajo.</small>
    <button class=go onclick=caseHub()>📑 Abrir carpeta de expedientes</button>
  </div>`;
}

// 4. PESTAÑA MI CV: MATRIZ DE COMPETENCIAS REALES + RANGOS + LIGA

// Centro de Carrera v13: 8 puestos + 5 especializaciones con progresión.
const BANK=[
['¿Cuál es la ecuación contable básica?',['Activo = Pasivo + Patrimonio','Activo = Ingresos + Gastos','Pasivo = Activo + Patrimonio'],0],
['¿Qué representa la partida doble?',['Una operación afecta al menos dos cuentas manteniendo igualdad','Solo registrar efectivo','Registrar todo en el debe'],0],
['¿Qué documento sustenta normalmente una compra?',['Factura o comprobante válido','Cotización no aceptada','Nota informal sin detalle'],0],
['¿Para qué sirve una conciliación bancaria?',['Comparar libros y estado bancario e investigar diferencias','Calcular planillas','Fijar precios'],0],
['¿Qué hacer ante un comprobante duplicado?',['Verificarlo y evitar el doble registro','Registrarlo dos veces','Borrar el original'],0],
['¿Qué estado muestra activos, pasivos y patrimonio?',['Estado de situación financiera','Estado de resultados','Flujo de efectivo'],0],
['¿Qué significa el principio del devengo?',['Reconocer operaciones cuando ocurren, según la norma','Registrar solo al cobrar','Registrar solo al cierre anual'],0],
['¿Para qué sirve un asiento de ajuste?',['Reflejar correctamente los saldos al cierre','Autorizar vacaciones','Crear una cuenta bancaria'],0],
['¿Qué comprueba el balance de comprobación?',['La igualdad aritmética de saldos deudores y acreedores','Que no existe fraude','Que toda factura es válida'],0],
['¿Qué debe respaldar un asiento contable?',['Documentación suficiente y verificable','Solo memoria del trabajador','Una estimación sin explicación'],0],
['¿Qué representa el IGV de una compra con derecho a crédito fiscal?',['Crédito fiscal sujeto a requisitos legales','Siempre un gasto definitivo','Patrimonio'],0],
['¿Qué significa materialidad en auditoría?',['Importancia de una incorrección para las decisiones de usuarios','Número de trabajadores','Fecha de factura'],0],
['¿Qué hacer si una cuenta no concilia?',['Investigar, documentar y corregir con sustento','Cambiar cifras hasta cuadrar','Eliminar movimientos'],0],
['¿Qué es evidencia de auditoría?',['Información que sustenta conclusiones','Opinión sin respaldo','Cifra sin soporte'],0],
['¿Qué actitud exige evaluar críticamente la evidencia?',['Escepticismo profesional','Devengo','Uniformidad tipográfica'],0],
['¿Qué corresponde ante indicios de fraude?',['Documentar y comunicar según procedimientos aplicables','Borrar hallazgos','Alterar papeles de trabajo'],0],
['¿Para qué sirve el control interno?',['Reducir riesgos y favorecer información fiable','Garantizar cero errores','Reemplazar la contabilidad'],0],
['¿Cómo se corrige un error contable?',['Con ajuste documentado y trazabilidad','Borrando todo rastro','Ocultándolo hasta fin de año'],0],
['¿Qué compara un análisis de variaciones?',['Resultados entre periodos o frente al presupuesto','Nombres de proveedores','Solo números de factura'],0],
['¿Qué sustenta una conclusión profesional?',['Normativa aplicable, evidencia y documentación','Preferencias personales','Suposiciones'],0],
['¿Qué identifica un costo directo?',['Puede atribuirse al objeto de costo de forma identificable','Siempre es gasto financiero','Nunca afecta inventario'],0],
['¿Qué es el punto de equilibrio?',['Nivel donde ingresos totales igualan costos totales','Máxima utilidad','Saldo de caja'],0],
['¿Qué debe evaluarse al preparar una declaración tributaria?',['Operaciones, comprobantes, plazos y reglas aplicables','Solo el saldo bancario','Solo ventas al contado'],0],
['¿Qué debe incluir un papel de trabajo de auditoría?',['Procedimientos, evidencia y conclusiones','Solo el nombre del auditor','Opiniones sin soporte'],0],
['¿Qué orienta la planificación de auditoría?',['Riesgos, materialidad y objetivos','Preferencias del auditado','Solo caja'],0],
['¿Qué describe mejor una estimación contable?',['Importe basado en juicio y evidencia ante incertidumbre','Cifra elegida sin sustento','Una factura duplicada'],0],
['¿Qué es una variación presupuestaria?',['Diferencia entre resultado real y presupuesto','Una cuenta bancaria nueva','Un comprobante de pago'],0],
['¿Qué debe hacerse antes de registrar un activo fijo?',['Verificar sustento, reconocimiento y clasificación aplicable','Registrarlo siempre como gasto','Ignorar fecha y costo'],0],
['¿Qué es una obligación devengada en el sector público?',['Obligación reconocida tras verificar requisitos y sustento','Intención informal de compra','Un ingreso de caja'],0],
['¿Qué permite una segregación de funciones?',['Reducir riesgos al separar autorización, custodia y registro','Que una persona controle todo','Eliminar la necesidad de revisión'],0]
];
const makeQs=(offset=0)=>BANK.map((q,i)=>BANK[(i+offset)%BANK.length]);
const CERTS=[
{name:'Practicante contable',role:'Practicante contable',kind:'job',level:0,qs:makeQs(0)},
{name:'Auxiliar contable',role:'Auxiliar contable',kind:'job',level:1,qs:makeQs(2)},
{name:'Asistente contable',role:'Asistente contable',kind:'job',level:2,qs:makeQs(4)},
{name:'Analista contable',role:'Analista contable',kind:'job',level:3,qs:makeQs(6)},
{name:'Contador junior',role:'Contador junior',kind:'job',level:4,qs:makeQs(8)},
{name:'Contador senior',role:'Contador senior',kind:'job',level:5,qs:makeQs(10)},
{name:'Jefatura contable',role:'Jefatura contable',kind:'job',level:6,qs:makeQs(12)},
{name:'Auditor junior / contador experto',role:'Auditor junior',kind:'job',level:7,qs:makeQs(14)},
{name:'Especialización: Tributación',role:'Especialista tributario',kind:'specialty',level:3,prereq:3,qs:makeQs(16)},
{name:'Especialización: NIIF y cierres',role:'Especialista en NIIF',kind:'specialty',level:4,prereq:4,qs:makeQs(18)},
{name:'Especialización: Costos y gestión',role:'Especialista en costos',kind:'specialty',level:4,prereq:4,qs:makeQs(20)},
{name:'Especialización: Auditoría y control',role:'Especialista en auditoría',kind:'specialty',level:5,prereq:5,qs:makeQs(22)},
{name:'Especialización: Sector público y SBS',role:'Especialista en sector público y SBS',kind:'specialty',level:6,prereq:6,qs:makeQs(24)}
];
const INTERVIEWS=[
{role:'Practicante contable',cert:0,level:0},{role:'Auxiliar contable',cert:1,level:1},
{role:'Asistente contable',cert:2,level:2},{role:'Analista contable',cert:3,level:3},
{role:'Contador junior',cert:4,level:4},{role:'Contador senior',cert:5,level:5},
{role:'Jefatura contable',cert:6,level:6},{role:'Auditor junior',cert:7,level:7}
];
function careerLevel(){try{return Math.max(0,Number(lvl())||0)}catch(e){return 0}}
function careerHub(){curTab='career';navi();show('over');const certs=S.certifications||[],level=careerLevel();const isDone=i=>certs.some(x=>x.id===i);const isOpen=(c,i)=>level>=c.level&&(c.kind!=='specialty'||isDone(c.prereq));const card=(c,i)=>{const done=isDone(i),open=isOpen(c,i),res=(S.certResults||{})[i];return `<div class=card><div class=row><b>${c.kind==='job'?'💼':'🌟'} ${c.name}</b><span class=chip>${done?'✅ Aprobada':open?'Disponible':'🔒 Nivel '+c.level}</span></div><small class=mu>${c.qs.length} preguntas del banco · 10 por intento · 70% para aprobar</small>${res?`<small class=mu style="display:block;margin:5px 0">Último: ${res.last}% · Mejor: ${res.best}%</small>`:''}<button class=${open?'go':'sec'} ${open?'':'disabled'} onclick="${open?`startCareerExam(${i})`:`toast('Sube de nivel y completa la certificación previa')`}" ${open?'':'disabled'}>${done?'Volver a rendir · sin monedas extra':open?'Rendir certificación':'Bloqueada por progresión'}</button></div>`};$('over').innerHTML=`<h1>🎓 Centro de Carrera</h1><p class=mu>Certificaciones por puesto y especializaciones desbloqueables. El banco contiene preguntas variadas; cada intento selecciona una muestra aleatoria.</p><h2>💼 Certificaciones laborales (8)</h2>${CERTS.map((c,i)=>c.kind==='job'?card(c,i):'').join('')}<h2 style="margin-top:18px">🌟 Especializaciones (5)</h2>${CERTS.map((c,i)=>c.kind==='specialty'?card(c,i):'').join('')}<h2 style="margin-top:18px">🎤 Simulación de Entrevista Técnica Laboral</h2><p class=mu>Ocho entrevistas por puesto. Se guardan intentos y mejor puntuación.</p>${INTERVIEWS.map((x,i)=>{const open=level>=x.level,res=(S.interviews||{})[i];return `<div class=card><div class=row><b>${i+1}. ${x.role}</b><span class=chip>${res?'Mejor: '+res.best+'%':open?'Disponible':'🔒 Nivel '+x.level}</span></div><button class=${open?'go':'sec'} ${open?'':'disabled'} onclick="${open?`startInterview(${i})`:`toast('Alcanza el nivel requerido')`}" ${open?'':'disabled'}>${open?'Iniciar entrevista':'Bloqueada por nivel'}</button></div>`}).join('')}<button class=sec onclick="ranks()">← Volver a Mi CV</button>`}
function runCareerQuiz(c,id,mode,ii){let pool=[...c.qs],questions=[];while(pool.length&&questions.length<10)questions.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);let q=0,correct=0;function render(){$('over').innerHTML=`<h1>${mode==='interview'?'🎤 Entrevista: '+c.role:'📜 '+c.name}</h1><div class=card><div class=row><b>Pregunta ${q+1}/${questions.length}</b><span>${correct} correctas</span></div><h3>${questions[q][0]}</h3>${questions[q][1].map((a,j)=>`<button class=sec style="display:block;width:100%;text-align:left;margin:8px 0" onclick="${mode==='interview'?`answerInterview(${ii},${q},${j})`:`answerCareer(${id},${q},${j})`}">${String.fromCharCode(65+j)}. ${a}</button>`).join('')}</div><button class=sec onclick="careerHub()">Salir</button>`}function finish(){const score=Math.round(correct/questions.length*100),pass=score>=70;if(mode==='interview'){S.interviews=S.interviews||{};let old=S.interviews[ii]||{best:0,attempts:0};old.last=score;old.best=Math.max(old.best,score);old.attempts++;old.passed=old.passed||pass;S.interviews[ii]=old;S.interviewHistory=S.interviewHistory||[];S.interviewHistory.push({id:ii,score,date:Date.now()})}else{S.certifications=S.certifications||[];let old=S.certifications.find(x=>x.id===id);if(pass){if(old){old.score=Math.max(old.score||0,score);old.best=Math.max(old.best||0,score)}else{S.certifications.push({id,name:c.name,score,best:score,date:Date.now()});S.coins=(S.coins||0)+150;S.xp=(S.xp||0)+250}}S.certResults=S.certResults||{};S.certResults[id]={last:score,best:Math.max(score,(old&&old.best)||0),pass:pass||!!old}}save();$('over').innerHTML=`<h1>${pass?'🏆 ¡Evaluación completada!':'📚 Sigue practicando'}</h1><div class=card><h2>${mode==='interview'?c.role:c.name}</h2><p>Resultado: <b>${score}%</b> (${correct}/${questions.length})</p><p>${mode==='interview'?'Mejor puntuación: '+S.interviews[ii].best+'% · Intentos: '+S.interviews[ii].attempts:pass?'Aprobada. La recompensa de +150 monedas y +250 XP se entrega solo en la primera aprobación.':'Necesitas al menos 70% para aprobar.'}</p></div><button class=go onclick="careerHub()">Volver a Carrera</button>`}window.answerCareer=(ci,qi,ans)=>{if(qi!==q)return;if(ans===questions[q][2])correct++;q++;q<questions.length?render():finish()};window.answerInterview=(idx,qi,ans)=>{if(qi!==q)return;if(ans===questions[q][2])correct++;q++;q<questions.length?render():finish()};render()}
function startCareerExam(id){const c=CERTS[id];if(!c||! (careerLevel()>=c.level&&(c.kind!=='specialty'||(S.certifications||[]).some(x=>x.id===c.prereq))))return toast('Certificación bloqueada: sube de nivel y completa los requisitos.');runCareerQuiz(c,id,'cert')}
function startInterview(id){const x=INTERVIEWS[id];if(!x||careerLevel()<x.level)return toast('Entrevista bloqueada por nivel.');runCareerQuiz(CERTS[x.cert],x.cert,'interview',id)}

function claimSeasonReward(id,coins){
  S.seasonClaims=S.seasonClaims||[];
  const claimKey=(Number(S.se)||Math.floor(Date.now()/5184000000))+':'+id;
  if(S.seasonClaims.includes(claimKey))return;
  const caseCount=Object.keys(S.caseReports||{}).length;
  const masteryList=Object.values(STAGES||{}).flatMap(st=>(st.reqs||[]).map(r=>Math.max(0,Math.min(100,pc(r.t)||0))));
  const masteryAvg=masteryList.length?Math.round(masteryList.reduce((a,b)=>a+b,0)/masteryList.length):0;
  const eligible={m1:masteryAvg>=25,m2:masteryAvg>=50,m3:caseCount>=3,m4:masteryAvg>=75};
  if(!eligible[id])return;
  S.seasonClaims.push(claimKey);S.coins=(S.coins||0)+coins;save();ranks();
  if(typeof toast==='function')toast('🎁 Recompensa de temporada: +'+coins+' monedas');
}

const UNI_LIST=[
  'Universidad Nacional Mayor de San Marcos','Pontificia Universidad Católica del Perú','Universidad de Lima',
  'Universidad Peruana de Ciencias Aplicadas','Universidad Nacional Federico Villarreal','Universidad Nacional de Ingeniería',
  'Universidad Nacional de Trujillo','Universidad Nacional de San Agustín','Universidad Nacional del Centro del Perú',
  'Universidad Nacional San Antonio Abad del Cusco','Otra universidad'
];
function toggleCVSettings(){S.cvSettingsOpen=!S.cvSettingsOpen;save();ranks()}
function saveIdentitySettings(){
  const ne=$('crNickname'),te=$('crTitle'),ue=$('crUniversity');
  const val=String(ne&&ne.value||'').trim().replace(/[<>`]/g,'').slice(0,20);
  if(!val){if(typeof toast==='function')toast('Escribe un nickname válido');return}
  S.nickname=val;
  const title=Number(te&&te.value||0);
  S.ttl=(S.ttls||[0]).map(Number).includes(title)?title:0;
  const uni=String(ue&&ue.value||UNI_LIST[0]);S.university=UNI_LIST.includes(uni)?uni:UNI_LIST[0];
  S.cvSettingsOpen=false;save();if(typeof toast==='function')toast('Identidad competitiva guardada');ranks();
}
function saveNickname(){saveIdentitySettings()}

function ranks(){
  try{
    curTab='ranks';
    navi();
    const root=$('over');
    if(!root) return;
    show('over');
    const currentLevel=Math.max(0,Math.min(T.length-1,Number(lvl())||0));
    const currentDiv=Math.max(0,Math.min(DV.length-1,Number(S.dv)||0));
    const scope=S.rankScope||'uni';
    const reports=S.caseReports&&typeof S.caseReports==='object'?S.caseReports:{};
    const caseCount=Object.keys(reports).length;
    const requirements=(Array.isArray(STAGES)?STAGES:[]).flatMap(st=>Array.isArray(st.reqs)?st.reqs:[]);
    const masteryValues=requirements.map(r=>Math.max(0,Math.min(100,Number(pc(r.t))||0)));
    const masteryAvg=masteryValues.length?Math.round(masteryValues.reduce((a,b)=>a+b,0)/masteryValues.length):0;
    const score=Math.max(0,Math.round((Number(S.xp)||0)*.35+(Number(S.best)||0)*5+(Number(S.dv)||0)*250+caseCount*500+masteryAvg*25));
    const stageDetails=(st,i)=>{
      const reqs=Array.isArray(st&&st.reqs)?st.reqs:[];
      const lines=reqs.map(r=>`<div class="m"><span>• ${r.lbl||r.desc||'Competencia de etapa'}</span><b>${Math.round(Number(pc(r.t))||0)}%</b></div>`).join('');
      const title=(T&&T[i])||st.name||('Etapa '+(i+1));
      const unlocked=i<=currentLevel;
      const pct=i<currentLevel?100:(i===currentLevel?Math.min(100,Math.round(100*(Number(S.xp)||0)/Math.max(1,Number(XPT[currentLevel+1])||Number(S.xp)||1))):0);
      return `<details class="stage-detail" ${i===currentLevel?'open':''} style="border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px;margin:8px 0;background:rgba(0,0,0,.12)">
        <summary style="cursor:pointer;font-weight:800;line-height:1.5">${unlocked?'🔓':'🔒'} ${title}${i===currentLevel?' · ETAPA ACTUAL':''} <span class=mu style="font-size:11px">— ${unlocked?'Disponible':'Por desbloquear'}</span></summary>
        <div style="padding-top:8px"><small class=mu>${(JB&&JB[i])||st.real||'Etapa de desarrollo profesional contable.'}</small>${lines||'<p class=mu>Las competencias se mostrarán aquí cuando se incorporen contenidos a esta etapa.</p>'}<div class=bar><i style="width:${pct}%"></i></div></div>
      </details>`;
    };
    const stages=(Array.isArray(STAGES)?STAGES:[]).slice(0,8).map(stageDetails).join('');
    // Ranking simulado por liga y LP (no por XP). Las poblaciones son estimaciones de juego.
    const uniTotal=1800, nationalTotal=65000;
    const leagueShare=[0.26,0.24,0.19,0.14,0.08,0.045,0.025,0.012,0.004];
    const lpNow=Math.max(0,Math.min(100,Number(S.lp)||0));
    const rankFor=(total,division,lp)=>{
      const counts=leagueShare.map(v=>Math.max(1,Math.round(total*v)));
      // Ajustar redondeos para que la población sea consistente con el total.
      counts[0]+=total-counts.reduce((a,b)=>a+b,0);
      let above=0; for(let d=division+1;d<counts.length;d++) above+=counts[d];
      // Dentro de una liga, mayor LP equivale a mejor posición.
      const within=Math.max(1,Math.ceil(counts[division]*(1-Math.min(99,lp)/100)));
      return Math.max(1,Math.min(total,above+within));
    };
    const nationalRank=rankFor(nationalTotal,currentDiv,lpNow);
    // Ranking universitario consistente con el global: conserva el orden relativo de la clasificación nacional.
    const uniRank=Math.max(1,Math.min(uniTotal,Math.ceil(nationalRank/nationalTotal*uniTotal))); 
    const activeRank=scope==='uni'?uniRank:nationalRank;
    const activeTotal=scope==='uni'?uniTotal:nationalTotal;
    const nearRows=Array.from({length:5},(_,i)=>{
      const offset=i-2, place=Math.max(1,Math.min(activeTotal,activeRank+offset));
      const peerLp=Math.max(0,Math.min(99,lpNow-offset*3));
      const uniNames=['AetherKoi','ByteRonin','KitsuneRush','NullPointerGG','MochiCritical','LagPhantom','KuroLedger','PixelShogun','VantaFox','RiftMancer','NekoFirewall','TurboKappa','SoraMain','HexaDrift','CritiCalcu','ManaAuditor','JadeRespawn','NoScopeNIIF','ToraStack','BlueScreenX','ZenithAFK','LimaLoot','GlitchTactician','FrostCombo','DoblePartida'];
      const nationalNames=['VoidSamurai','LunarRespawn','CryptoKitsune','EchoValkyrie','OmegaQueue','RoguePixel','AstraNox','PhantomPatch','NeonYurei','DragonPing','ZeroDayGG','NovaClutch','KarmaByte','ObsidianAFK','VortexMochi','RiftOracle','SolarNinja','QuantumFox','MythicLag','OnyxCombo','TurboYami','ArcaneStack','SpectralMain','HyperKoi','GhostSyntax'];
      const unis=UNI_LIST.filter(x=>x!=='Otra universidad');
      const names=scope==='uni'?uniNames:nationalNames;
      const isYou=offset===0;
      let peerName=names[Math.abs(place*7+offset*3)%names.length];
      if(peerName===(S.nickname||'ContadorRush'))peerName=names[(Math.abs(place*7+offset*3)+5)%names.length];
      return {place,name:isYou?(S.nickname||'ContadorRush'):peerName,detail:isYou?((T&&T[currentLevel])||'Nivel inicial')+' · '+(DV[currentDiv]||'Hierro')+' · '+(S.university||UNI_LIST[0]):(scope==='uni'?'Liga '+(DV[currentDiv]||'Hierro')+' · '+(S.university||UNI_LIST[0]):unis[Math.abs(place*3+offset)%unis.length]),lp:peerLp,you:isYou};
    }).sort((a,b)=>a.place-b.place);
    const leaderboard=nearRows.map(p=>`<div class="row" style="padding:10px;border-radius:10px;margin:6px 0;background:${p.you?'rgba(16,185,129,.13)':'rgba(255,255,255,.035)'};border:1px solid ${p.you?'rgba(16,185,129,.45)':'rgba(255,255,255,.06)'}"><b style="min-width:62px;color:${p.you?'var(--ac)':'var(--mu)'}">#${p.place.toLocaleString()}</b><span style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">${rankBadgeSVG(currentDiv)}<span><b>${p.name}</b><br><small class=mu>${p.detail}</small></span></span><b>${p.lp} LP</b></div>`).join('');
    const topNames=scope==='uni'?['AetherKoi','ByteRonin','KitsuneRush','NullPointerGG','MochiCritical','LagPhantom','KuroLedger','PixelShogun','VantaFox','RiftMancer']:['VoidSamurai','LunarRespawn','CryptoKitsune','EchoValkyrie','OmegaQueue','RoguePixel','AetherKoi','ByteRonin','KitsuneRush','AstraNox'];
    const nationalUniversities=['Universidad Nacional de Ingeniería','Pontificia Universidad Católica del Perú','Universidad de Lima','Universidad Peruana de Ciencias Aplicadas','Universidad Nacional de Trujillo','Universidad Nacional de San Agustín','Universidad Nacional Federico Villarreal','Universidad Nacional Federico Villarreal','Universidad Nacional Federico Villarreal','Universidad Nacional Mayor de San Marcos'];
    const topRows=topNames.map((name,i)=>{const div=8;const lp=[98,94,91,89,86,84,82,80,78,76][i];const place=i+1;const uni=scope==='uni'?(S.university||UNI_LIST[0]):nationalUniversities[i];return `<div class="row rank-row ${i<3?'rank-podium':''}" style="padding:10px;border-radius:10px;margin:6px 0;background:${i<3?'rgba(250,204,21,.07)':'rgba(255,255,255,.035)'};border:1px solid ${i<3?'rgba(250,204,21,.22)':'rgba(255,255,255,.06)'}"><b style="min-width:30px;color:${i<3?'#facc15':'var(--mu)'}">${i===0?'👑':'#'+place}</b><span style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">${rankBadgeSVG(div)}<span><b>${name}</b><br><small class=mu>${DV[div]} · ${uni}</small></span></span><b>${lp} LP</b></div>`}).join('');
    const seasonLength=60,seasonStart=Number(S.seStart)||Date.now();
    const daysLeft=Math.max(1,Math.ceil((seasonStart+seasonLength*86400000-Date.now())/86400000));
    const seasonNum=Math.max(1,Number(S.se)||1);
    const claimed=(S.seasonClaims||[]);
    const claimKey=id=>(Number(S.se)||1)+':'+id;
    const rewards=[
      {id:'m1',name:'Aprendiz constante',desc:'Alcanza 25% de dominio medio',ok:masteryAvg>=25,coins:100},
      {id:'m2',name:'Contable aplicado',desc:'Alcanza 50% de dominio medio',ok:masteryAvg>=50,coins:250},
      {id:'m3',name:'Expediente profesional',desc:'Completa 3 expedientes',ok:caseCount>=3,coins:300},
      {id:'m4',name:'Rival de élite',desc:'Alcanza 75% de dominio medio',ok:masteryAvg>=75,coins:500}
    ].map(r=>`<div class="row" style="padding:10px;border-radius:10px;margin:6px 0;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07)"><div style="flex:1;min-width:0"><b>${r.ok?'✅':'🔒'} ${r.name}</b><br><small class=mu>${r.desc} · ${r.coins} monedas</small></div><button class=sec style="margin:0;width:auto;padding:8px 10px;font-size:12px" ${!r.ok||claimed.includes(claimKey(r.id))?'disabled':''} onclick="claimSeasonReward('${r.id}',${r.coins})">${claimed.includes(claimKey(r.id))?'Reclamada':r.ok?'Reclamar':'Bloqueada'}</button></div>`).join('');
    const safeNick=String(S.nickname||'ContadorRush').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const safeTitle=(TITLES&&TITLES[S.ttl||0])||'Sin título';
    const chosenUni=S.university||UNI_LIST[0];
    const frameClass=['default',...FRAME_ITEMS.map(f=>f.id)].includes(S.frame)?S.frame:'default';
    const titleOptions=(S.ttls||[0]).map(Number).filter(i=>i>=0&&i<TITLES.length).filter((v,i,a)=>a.indexOf(v)===i);
    const careerTimeline=[
      ['Practicante / aprendiz','0–6 meses','Fundamentos, documentos, registro supervisado'],
      ['Auxiliar contable','6–18 meses','Registro rutinario, conciliaciones y archivo'],
      ['Asistente contable','1–3 años','Cierres mensuales, impuestos y análisis de cuentas'],
      ['Analista contable','2–5 años','Variaciones, reportes, controles y casos complejos'],
      ['Contador/a junior','3–5+ años','Estudios culminados y experiencia; depende del puesto'],
      ['Contador/a senior','5–8+ años','Cierres completos, criterios técnicos y revisión'],
      ['Jefatura contable','7–12+ años','Liderazgo, controles, cierres y responsabilidad de equipo'],
      ['Nivel experto del juego','Trayectoria avanzada','Rango aspiracional; no equivale a título ni colegiatura']
    ];
    const careerHTML=careerTimeline.map((c,i)=>`<div class="career-row ${i===currentLevel?'career-current':''}"><div class="career-dot">${i<currentLevel?'✓':i+1}</div><div style="flex:1;min-width:0"><b>${c[0]}</b><br><small class=mu>${c[2]}</small></div><span class="career-time">${c[1]}</span></div>`).join('');
    root.innerHTML=`<h1>🏅 Mi CV y progreso profesional</h1>
      <div class="cv-identity-hero">
        <div class="cv-identity-top"><div class="cv-avatar frame-${frameClass}">${skinArtSVG(S.sk||0)}</div><div class="cv-identity-main"><small class="cv-kicker">TU IDENTIDAD COMPETITIVA</small><div class="cv-nickname">${safeNick}</div><div class="cv-title">«${safeTitle}»</div></div><button class="cv-settings" title="Editar identidad" aria-label="Editar identidad" onclick="toggleCVSettings()">⚙</button></div>
        <div class="cv-rankline"><span class="cv-level">${(T&&T[currentLevel])||'Aprendiz de Caja'}</span><span class="cv-league">${rankBadgeSVG(currentDiv)} ${DV[currentDiv]} · ${lpNow} LP</span></div>
        <div class="cv-xpline"><span>${(Number(S.xp)||0).toLocaleString()} XP profesionales</span><span>Nivel ${currentLevel+1}/8</span></div><div class="bar cv-xpbar"><i style="width:${currentLevel>=7?100:Math.min(100,100*Math.max(0,(Number(S.xp)||0)-XPT[currentLevel])/Math.max(1,XPT[currentLevel+1]-XPT[currentLevel]))}%"></i></div>
        <small class="cv-description">${(JB&&JB[currentLevel])||'Continúa practicando para desarrollar tus competencias contables.'}</small>
      <div class="card" style="margin-top:12px"><div class=row><b>📜 Certificaciones internas</b><button class=sec onclick="careerHub()">Abrir Carrera</button></div><small class=mu>Credenciales obtenidas dentro de Cuenta Rush; no equivalen a títulos oficiales.</small>${(S.certifications||[]).length?S.certifications.map(c=>`<div class=m><span>🏅 ${c.name}</span><b>${c.score}%</b></div>`).join(''):'<p class=mu>Aún no tienes certificaciones. Entra a Carrera para rendir tu primer examen.</p>'}</div>
      </div>
      ${S.cvSettingsOpen?`<div class="card cv-settings-panel"><div class=row><b>⚙️ Ajustes de identidad</b><button class=pw onclick="toggleCVSettings()">Cerrar</button></div><label class=cv-label for=crNickname>Nickname (máx. 20 caracteres)</label><input id="crNickname" maxlength=20 value="${safeNick}" placeholder="Tu nickname"/><label class=cv-label for=crTitle>Título equipado (solo títulos desbloqueados)</label><select id="crTitle">${titleOptions.map(i=>`<option value="${i}" ${i===Number(S.ttl||0)?'selected':''}>${TITLES[i]}</option>`).join('')}</select><label class=cv-label for=crUniversity>Universidad para el ranking local</label><select id="crUniversity">${UNI_LIST.map(u=>`<option value="${u}" ${u===chosenUni?'selected':''}>${u}</option>`).join('')}</select><button class=go onclick="saveIdentitySettings()">Guardar cambios</button></div>`:''}
      <h2 style="margin:14px 0 4px">🧭 Tu ruta de niveles</h2>
      <small class=mu>Abre cada etapa para consultar sus competencias y requisitos.</small>
      <div class=card>${stages||'<p>No hay etapas configuradas todavía. Revisa data.js.</p>'}</div>
      <h2 style="margin:16px 0 4px">🏆 Ranking competitivo simulado</h2>
      <small class=mu>Rivales ficticios para motivación. La clasificación se calcula por liga y LP, como una escalera competitiva; no representa datos oficiales ni estudiantes reales.</small>
      <div class=card>
        <div class=gr style="grid-template-columns:1fr 1fr;margin:0 0 10px">
          <button class="${scope==='uni'?'go':'sec'}" style="margin:0;font-size:13px;padding:12px" onclick="S.rankScope='uni';save();ranks()">🎓 Mi universidad</button>
          <button class="${scope==='nacional'?'go':'sec'}" style="margin:0;font-size:13px;padding:12px" onclick="S.rankScope='nacional';save();ranks()">🇵🇪 Nacional</button>
        </div>
        <div class=row><b>${scope==='uni'?'Ranking de tu universidad':'Ranking nacional interuniversitario'}</b><span class=chip>${rankBadgeSVG(currentDiv)} ${(DV&&DV[currentDiv])||'Hierro'} · ${lpNow} LP</span></div>
        <div class=card style="margin:8px 0;padding:12px"><small class=mu>TU POSICIÓN ESTIMADA</small><div style=font-size:28px;font-weight:900>#${activeRank.toLocaleString()} <span class=mu style=font-size:13px>de ${activeTotal.toLocaleString()}</span></div><small class=mu>La posición se estima por liga y LP dentro de una población ficticia.</small></div>
        <div class=gr style="grid-template-columns:1fr 1fr;margin:8px 0"><button class="${(S.rankView||'top')==='top'?'go':'sec'}" style="margin:0;padding:10px;font-size:12px" onclick="S.rankView='top';save();ranks()">👑 Ver Top 10</button><button class="${S.rankView==='near'?'go':'sec'}" style="margin:0;padding:10px;font-size:12px" onclick="S.rankView='near';save();ranks()">📍 Cerca de mí</button></div>
        ${(S.rankView||'top')==='top'?topRows:leaderboard}
        <small class=mu>Los nombres, ligas y LP de la tabla son simulados para que puedas ver a los líderes y compararte. No son estudiantes reales ni un ranking oficial.</small>
      </div>
      <h2 style="margin:16px 0 4px">⚔️ Temporada competitiva</h2>
      <div class=card>
        <div class=row><b>Temporada ${seasonNum}</b><span class=chip>⏳ ${daysLeft} días restantes</span></div>
        <div class=row style="margin-top:8px"><span>${rankBadgeSVG(currentDiv)} ${DV[currentDiv]}</span><b>${Math.min(100,Number(S.lp)||0)}/100 LP</b></div>
        <div class=bar><i style="width:${Math.min(100,Number(S.lp)||0)}%"></i></div>
        <details class="season-help"><summary>¿Para qué sirve la temporada?</summary><div class="season-help-body"><p class=mu>Es una competición de 60 días. Ganas o pierdes LP en los duelos y subes o bajas posiciones. Al cierre recibes monedas según la liga más alta alcanzada; después hay un reinicio parcial para iniciar otra carrera.</p><small class=mu>Es local y simulada; no hay jugadores reales conectados. El calendario comienza en Temporada 1 en esta versión.</small></div></details>
        <small class=mu>Gana duelos para subir de liga. Al llegar a 100 LP, si tu liga tiene promoción, tendrás que ganarla para ascender.</small>
        <div class=gr style="grid-template-columns:1fr 1fr;margin-top:10px">
          <div class=sec style="text-align:center;cursor:default">🎯 Dominio medio<br><b>${masteryAvg}%</b></div>
          <div class=sec style="text-align:center;cursor:default">📁 Expedientes<br><b>${caseCount}</b></div>
        </div>
        <h3 style="margin:14px 0 6px">🎁 Recompensas</h3>${rewards}
        <small class=mu>Las recompensas se reclaman una vez por perfil guardado. La clasificación es local y simulada.</small>
      </div>`;
  }catch(err){
    console.error('Error al cargar Mi CV:',err);
    const root=$('over');
    if(root){show('over');root.innerHTML=`<div class="card"><h1>🏅 Mi CV y progreso profesional</h1><p>No se pudo cargar una parte del panel. Puedes volver a intentarlo.</p><button class=go onclick="ranks()">Reintentar</button><small class=mu style="display:block;margin-top:10px">Si persiste, revisa la consola del navegador para identificar el error.</small></div>`;}
  }
}

// 5. PESTAÑA PASE & TIENDA UNIFICADA (CON DECORACIONES 3D, TÍTULOS, BOOSTERS Y SKINS)
const FI=[
  "Ficha 1 · Ecuación y Partida Doble: Activo = Pasivo + Patrimonio. Activos y Gastos aumentan al Debe; Pasivos, Patrimonio e Ingresos aumentan al Haber.",
  "Ficha 2 · IGV y SPOT: IGV = 18% (16% + 2% IPM). Las detracciones se depositan en el Banco de la Nación; la bancarización es obligatoria desde S/ 2,000 o US$ 500.",
  "Ficha 3 · Dinámica PCGE: Todo gasto del Elemento 6 (62 a 68) tiene destino en el Elemento 9 (92/94/95) con abono a la cuenta 79 (CICC).",
  "Ficha 4 · Sector Público y SBS: Gasto público = CCP → Compromiso → Devengado → Girado → Pagado. En banca (SBS), el 3er dígito indica moneda (1 MN, 2 ME)."
];
const FRAME_ITEMS=[
  {id:'neon',name:'Marco Neón',cost:650,colors:['#22d3ee','#8b5cf6']},
  {id:'emerald',name:'Marco Esmeralda',cost:950,colors:['#6ee7b7','#047857']},
  {id:'royal',name:'Marco Real',cost:1450,colors:['#fde68a','#b45309']},
  {id:'void',name:'Marco Void',cost:2100,colors:['#c4b5fd','#4c1d95']},
  {id:'cosmic',name:'Marco Cósmico',cost:2900,colors:['#f0abfc','#0ea5e9']}
];
function frameSVG(id){const f=FRAME_ITEMS.find(x=>x.id===id)||FRAME_ITEMS[0];return `<svg viewBox="0 0 60 60"><defs><linearGradient id="fg${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${f.colors[0]}"/><stop offset="1" stop-color="${f.colors[1]}"/></linearGradient></defs><rect x="7" y="7" width="46" height="46" rx="13" fill="#0a1728" stroke="url(#fg${id})" stroke-width="5"/><rect x="13" y="13" width="34" height="34" rx="9" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.2"/><path d="M14 20l6-6M40 46l6-6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="30" cy="30" r="4" fill="url(#fg${id})"/></svg>`}
function unlockFrame(id){if(!S.frames.includes(id))S.frames.push(id);S.frame=id}
function buyFrame(id){const f=FRAME_ITEMS.find(x=>x.id===id);if(!f||S.frames.includes(id)||S.coins<f.cost){if(typeof toast==='function'&&f&&S.coins<f.cost)toast('No tienes suficientes monedas');return}S.coins-=f.cost;S.frames.push(id);S.frame=id;save();pase()}
function equipFrame(id){if(!S.frames.includes(id))return;S.frame=id;save();pase()}
function rw(i){
  const frameRewards={2:'neon',8:'emerald',14:'royal',22:'void',28:'cosmic'};
  if(frameRewards[i]){const id=frameRewards[i],f=FRAME_ITEMS.find(x=>x.id===id);return [`${f.name} · cosmético de perfil`,()=>unlockFrame(id),frameSVG(id),'gold-t','MARCO'];}
  if(i%10==0){
    const skId=4+i/10;
    return [`Campeón «${SK[skId][0]}»`,()=>{if(!S.own.includes(skId))S.own.push(skId)},skinArtSVG(skId),'gold-t','CAMPEÓN'];
  }
  if(i==5||i==15||i==25){
    const objId=i==5?0:i==15?1:2;
    const objNm=['🌳 Bonsái 3D para Oficina','🐂 Toro Dorado Wall Street 3D','🖥️ Servidor Auditoría 3D'][objId];
    return [objNm,()=>{if(!S.objs.includes(objId))S.objs.push(objId)},`<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" rx="10" fill="#10b981" stroke="#a7f3d0" stroke-width="2"/><text x="30" y="37" text-anchor="middle" font-size="24">${['🌳','🐂','🖥️'][objId]}</text></svg>`,'gold-t','OBJETO 3D'];
  }
  if(i==4||i==12||i==18||i==24||i==29){
    const tId=i==4?1:i==12?2:i==18?3:i==24?4:6;
    return [`Título «${TITLES[tId]}»`,()=>{if(!S.ttls.includes(tId))S.ttls.push(tId);S.ttl=tId},`<svg viewBox="0 0 60 60"><rect x="8" y="18" width="44" height="24" rx="6" fill="#7c5cff" stroke="#fde047" stroke-width="2"/><text x="30" y="34" text-anchor="middle" fill="#fff" font-family="Chakra Petch" font-weight="800" font-size="11">TÍTULO</text></svg>`,'','TÍTULO'];
  }
  if(i%7==0){
    return ['Ficha Técnica Pro',()=>{if(!S.fi.includes(i/7-1))S.fi.push(i/7-1)},`<svg viewBox="0 0 60 60"><rect x="12" y="8" width="36" height="44" rx="5" fill="#7c5cff" stroke="#fff" stroke-width="2"/><line x1="20" y1="20" x2="40" y2="20" stroke="#ffb020" stroke-width="3"/><line x1="20" y1="30" x2="40" y2="30" stroke="#fff" stroke-width="2"/></svg>`,'','FICHA'];
  }
  if(i%3==0){
    return ['Booster XP x2 (10 preg.) + 2 Comodines',()=>{S.xpb=(S.xpb||0)+10;S.fp+=2},`<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="#0284c7" stroke="#7dd3fc" stroke-width="2"/><path d="M32 12L18 32h11l-2 16 15-20H31l1-16z" fill="#facc15"/></svg>`,'','BOOSTER'];
  }
  return [`+${30+3*i} Monedas`,()=>{S.coins+=30+3*i},`<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="#f59e0b" stroke="#fef08a" stroke-width="2.5"/><path d="M30 18l3.5 8 8.5.7-6.5 5.5 2.2 8.3-7.7-4.6-7.7 4.6 2.2-8.3-6.5-5.5 8.5-.7z" fill="#fff1a8" stroke="#a16207" stroke-width="1.2"/></svg>`,'','MONEDAS'];
}
const plv=()=>Math.min(30,Math.floor(S.pp/200));
function claim(i){if(i>plv()||S.pcl.includes(i))return;rw(i)[1]();S.pcl.push(i);save();pase()}
function claimAll(){for(let i=1;i<=plv();i++)if(!S.pcl.includes(i)){rw(i)[1]();S.pcl.push(i)}save();pase()}

function pase(){
  curTab='pase';navi();show('over');
  const p=plv(),d=new Date(),dl=new Date(d.getFullYear(),d.getMonth()+1,0).getDate()-d.getDate();
  $('over').innerHTML=`<div class=row><h1>🎟️ Pase & Tienda Pro</h1><span class=chip>${C(S.coins)}</span></div>
  <div class=bp-banner>
    <div class=row><span class="r-tag" style="background:var(--ac);color:#111">TEMPORADA ACTIVA</span><small class=mu>⏳ ${dl} días restantes</small></div>
    <h2 style="margin:4px 0">PASE CORPORATIVO · NIVEL ${p} / 30</h2>
    <div class=row><small class=mu>Gana puntos jugando cualquier modo (200 pts/nivel)</small><b>${S.pp%200} / 200</b></div>
    <div class=bar style="height:13px"><i style="width:${p>=30?100:(S.pp%200)/2}%"></i></div>
    <div class=row style="margin-top:8px">
      <small class=mu>Incluye Campeones, Objetos 3D, Títulos y Boosters XP →</small>
      <button class=pw style="border-color:var(--ac);color:var(--ac)" onclick=claimAll()>🎁 Reclamar Todo</button>
    </div>
  </div>
  <div class=bp-track>
    ${Array.from({length:30},(_,k)=>{
      const i=k+1,r=rw(i),c=S.pcl.includes(i),u=i<=p;
      return `<div class="bp-node ${u?'unlk':''} ${r[3]}">
        <span class=bp-lv>NIVEL ${i}</span>
        <small style="font-size:9px;font-weight:800;color:var(--ac);letter-spacing:.5px">${r[4]}</small>
        <div class=bp-box>${r[2]}</div>
        <b style="font-size:11px;min-height:32px;display:flex;align-items:center">${r[0]}</b>
        ${c?`<button class=sec disabled style="margin-top:6px;padding:7px;background:#064e3b;color:#6ee7b7">✔ RECLAMADO</button>`:
        u?`<button class=go style="margin-top:6px;padding:7px;font-size:13px" onclick=claim(${i})>RECLAMAR</button>`:
        `<button class=sec disabled style="margin-top:6px;padding:7px;opacity:.5">🔒 NV. ${i}</button>`}
      </div>`;
    }).join('')}
  </div>

  <h2 style="margin:14px 0 6px">⚡ Ítems de Oficina & Potenciadores</h2>
  <div class=gr3>
    <div class=card style="margin:0;text-align:center">
      <b>${IC.shield} Seguro SUNAT</b><br><small class=mu>Bloquea 3 multas (${S.sh||0})</small>
      <button class=sec onclick=buySh()>${C(80)}</button>
    </div>
    <div class=card style="margin:0;text-align:center">
      <b>${IC.coffee} Café Expreso</b><br><small class=mu>−60m de fatiga</small>
      <button class=sec onclick=cafe2()>${C(30)}</button>
    </div>
    <div class=card style="margin:0;text-align:center">
      <b>⚡ Booster XP x2</b><br><small class=mu>+15 preguntas x2</small>
      <button class=sec onclick=buyXp()>${C(60)}</button>
    </div>
  </div>

  <h2 style="margin:16px 0 4px">🦸 Vitrina de Campeones Contables</h2>
  <div class=skin-grid>
    ${SK.map((k,i)=>{
      const own=S.own.includes(i),eqp=S.sk==i;
      return `<div class="skin-card ${k[7]}">
        <span class=r-tag>${k[8]}</span>
        <div class=skin-art>${skinArtSVG(i)}</div>
        <b class=gfont style="font-size:15px">${k[0]}</b>
        <div style="display:flex;gap:4px;margin:5px 0">
          <span class=sw style="background:${k[5]};width:20px;height:8px"></span>
          <span class=sw style="background:${k[6]};width:20px;height:8px"></span>
        </div>
        ${own?`<button class="sec ${eqp?'act':''}" style="margin-top:auto;padding:8px" onclick=eq(${i})>${eqp?'✔ EQUIPADO':'EQUIPAR'}</button>`:
        (k[2]>=9999?`<button class=sec disabled style="margin-top:auto;padding:8px;opacity:.6">🎟️ Pase / Torneo</button>`:
        `<button class=go style="margin-top:auto;padding:8px;font-size:14px" onclick=buy(${i})>${C(k[2])}</button>`)}
      </div>`;
    }).join('')}
  </div>

  <h2 style="margin:18px 0 6px">🖼️ Marcos de perfil</h2>
  <small class=mu>Cosméticos para distinguir tu identidad en Mi CV. Algunos se desbloquean gratis en el pase; otros se compran con monedas.</small>
  <div class="frame-shop-grid">
    ${FRAME_ITEMS.map(f=>{const own=(S.frames||['default']).includes(f.id),eqp=(S.frame||'default')===f.id;return `<div class="frame-shop-card"><div class="frame-shop-art">${frameSVG(f.id)}</div><b>${f.name}</b>${own?`<button class="sec ${eqp?'act':''}" onclick="equipFrame('${f.id}')">${eqp?'✓ EQUIPADO':'EQUIPAR'}</button>`:`<button class=go onclick="buyFrame('${f.id}')">${C(f.cost)}</button>`}</div>`}).join('')}
  </div>
  <div class="card economy-note"><b>🪙 Economía del juego</b><p class=mu style="margin:6px 0 0">Gana monedas al responder y completar retos; gástalas en skins, marcos, comodines y potenciadores. El pase mezcla monedas con cosméticos para que no todo el progreso sea dinero acumulado.</p></div>`;
}
function buy(i){if(S.coins>=SK[i][2]){S.coins-=SK[i][2];S.own.push(i);S.sk=i;theme();save();pase()}else vib(80)}
function eq(i){S.sk=i;theme();save();pase()}
function buySh(){if(S.coins>=80){S.coins-=80;S.sh=(S.sh||0)+3;save();pase()}else vib(80)}
function cafe2(){if(S.coins>=30&&S.jn.m>0){S.coins-=30;S.jn.m=Math.max(0,S.jn.m-60);save();pase()}else vib(80)}
function buyXp(){if(S.coins>=60){S.coins-=60;S.xpb=(S.xpb||0)+15;save();pase()}else vib(80)}

function fin(h,g,c){show('over');$('over').innerHTML=h+`<div class=card><div class=m><span>XP Profesional Ganada</span><b>+${g} XP${S.xpb>0?' (⚡x2)':''}</b></div><div class=m><span>Monedas</span><b>+${C(c)}</b></div></div><button class=go onclick=LAST()>⚡ CONTINUAR ENTRENANDO</button><button class=sec onclick=home()>🏠 Volver a la Oficina 3D</button>`}

// ---- minijuegos relámpago (60 s) ----
const nxC=()=>{const c=CL[rn(0,CL.length-1)];return[c[0],CT,CT.indexOf(c[1]),0]};
const nxA=()=>{const a=AS[rn(0,AS.length-1)],o=sh(a.slice(1));return[a[0],o,o.indexOf(a[1]),1]};
const nxG=()=>{let g;for(let i=0;i<15;i++){g=GEN[rn(0,GEN.length-1)]();if(g[0]<=gl())break}if(g[0]>gl())g=GEN[8]();return[g[1],g[2],g[3],g[0]]};
const nxB=()=>{const r=(Number(S.free)===1||S.free===true||canAccess(BR[S.br][1]))?S.br:0,mx=r?Math.min(BR[r][2].length-1,bm(r)):gl(),p=Q.filter(q=>r?(q[0]/10|0)==r&&q[0]%10<=mx:q[0]<=mx),q=p[rn(0,p.length-1)],o=sh(q[2].map((t,k)=>[t,k]));return[q[1],o.map(x=>x[0]),o.findIndex(x=>x[1]==q[3]),q[0]]};
function blitz(nm,nx,du){G={mini:nm,nx,sc:0,cb:0,t0:Date.now(),dur:du||60,pen:0};show('game');bl();clearInterval(G.tm);
G.tk=()=>{const r=G.dur-G.pen-(Date.now()-G.t0)/1000;if(r<=0){clearInterval(G.tm);return mend()}$('tm').textContent='⏱ '+Math.ceil(r)+'s';$('tb').style.width=100*r/G.dur+'%'};G.tm=setInterval(G.tk,100)}
function bl(){const it=G.it=G.nx();$('game').classList.remove('shake');
$('game').innerHTML=`<div class=row><b id=tm></b><b>${IC.star} ${G.sc}</b><b>${G.cb>1?IC.fire+' x'+G.cb:''}</b></div><div class=bar><i id=tb style="width:100%"></i></div><div class=card><h2>${it[0]}</h2></div><div class="${it[1].length>3?'gr':''}">${it[1].map((t,k)=>`<button class=op op-account onclick=bk(${k})>${formatChoiceText(t)}</button>`).join('')}</div><small class=mu>Cada error resta 4 s</small>`}
function bk(k){const it=G.it,ok=k==it[2];ms(it[3],ok);if(ok){G.sc++;G.cb++;vib(15)}else{G.cb=0;G.pen+=4;vib([50,30,50])}bl();if(!ok){$('game').classList.add('shake');hitstop()}}
function mend(){jn(15);const x=Math.min(120,G.sc*8),c=Math.round(G.sc*2),g=addXP(x),rec=G.sc>(S.hs[G.mini]||0);if(G.mini.includes('Cierre')){if(G.sc>=15&&!S.own.includes(6))S.own.push(6);if(G.sc>=25&&!S.own.includes(8)){S.own.push(8);celebra('🪶 ¡Arcángel de Oro Desbloqueado!')}}S.coins+=c;if(rec)S.hs[G.mini]=G.sc;mis(2);save();
fin(`<h1>${G.mini}</h1><div class=big>${IC.star} ${G.sc}</div>${rec?'<div class=gold>🏅 ¡NUEVO RÉCORD!</div>':`<div class="mu row">Récord: ${S.hs[G.mini]}</div>`}`,g,c)}

// ---- memoria PCGE ----
function mem(){LAST=mem;const p=sh([...PC]).slice(0,6),cd=sh(p.flatMap((x,i)=>[[i,x[0]],[i,x[1]]]));G={o:[],ok:0,mv:0,cd,lock:0};show('game');
$('game').innerHTML=`<div class=row><b>🧠 Memoria PCGE</b><b id=mv>0 mov.</b></div><small class=mu>Une cada código contable con su denominación</small><div class=gr3>${cd.map((c,n)=>`<button class="op mc" id=c${n} onclick=fl(${n})>❓</button>`).join('')}</div>`}
function fl(n){const b=$('c'+n);if(G.lock||G.o.includes(n)||b.disabled)return;b.textContent=G.cd[n][1];b.classList.add('pop');G.o.push(n);if(G.o.length<2)return;G.mv++;$('mv').textContent=G.mv+' mov.';
const[a,c]=G.o,hit=G.cd[a][0]==G.cd[c][0];ms(2,hit);G.lock=1;
setTimeout(()=>{if(hit){[a,c].forEach(i=>{$('c'+i).disabled=1;$('c'+i).classList.add('ok')});G.ok++;vib(20)}else[a,c].forEach(i=>$('c'+i).textContent='❓');G.o=[];G.lock=0;if(G.ok==6)mmend()},650)}
function mmend(){jn(12);const x=Math.max(30,90-G.mv*3),c=Math.max(15,45-G.mv*2),g=addXP(x);S.coins+=c;mis(2);save();fin(`<h1>🧠 ¡Completado!</h1><div class=big>${G.mv} movimientos</div>`,g,c)}

// ---- preguntas: supervivencia y duelo 3D ----
function play(){LAST=play;G={lives:3,combo:0,score:0,ok:0,tot:0,gain:0,coin:0,x2:0,l0:lvl(),tt:S.tt||15,rv:0,br:(Number(S.free)===1||S.free===true||canAccess(BR[S.br][1]))?S.br:0};show('game');ask()}
function pickDuelRival(){
  const names=['AetherKoi','ByteRonin','KitsuneRush','NullPointerGG','MochiCritical','LagPhantom','KuroLedger','PixelShogun','VantaFox','RiftMancer','VoidSamurai','LunarRespawn','CryptoKitsune','EchoValkyrie','OmegaQueue','RoguePixel','AstraNox','PhantomPatch','NeonYurei','DragonPing','ManaAuditor','NoScopeNIIF','JadeRespawn','GhostSyntax','ArcaneStack','HyperKoi'];
  const d=Math.max(0,Math.min(DV.length-1,Number(S.dv)||0)),lp=Math.max(0,Math.min(100,Number(S.lp)||0));
  const promotion=!!S.pr,nearPromotion=lp>=88&&d<DV.length-1;
  const up=(promotion||nearPromotion),rd=up?Math.min(DV.length-1,d+1):d;
  const rlp=up?Math.max(5,Math.min(45,Math.floor(Math.random()*25)+10)):Math.max(lp+1,Math.min(99,lp+3+Math.floor(Math.random()*9)));
  let name=names[Math.floor(Math.random()*names.length)];if(name===(S.nickname||''))name=names[(names.indexOf(name)+7)%names.length];
  return {name,div:rd,lp:rlp,above:true};
}
function duel(){LAST=duel;G={duel:1,rival:pickDuelRival(),me:100,en:100,bl:Math.min(7,bm(10)),combo:0,ok:0,tot:0,gain:0,coin:0,l0:lvl(),tt:S.tt||15,rv:0,br:(Number(S.free)===1||S.free===true||canAccess(BR[S.br][1]))?S.br:0};show('game');ask()}

const exh=()=>`<div class=row><b>📜 Certificación: ${T[G.exam]}</b><b>${G.k}/15 · errores ${G.err}/1</b></div>`;
function triggerExamenAscenso(){const l=lvl(),n=l+1;if(n>7||elig()<n){home();return}if(!ascPracticasOk(l)){const pendientes=ASC_PRACTICES[l].filter(p=>pc(p.t)<70);show('over');$('over').innerHTML=`<h1>🎯 Prácticas pendientes</h1><div class=card><b>Antes de ascender a ${T[n]}, debes dominar estas competencias:</b>${pendientes.map(p=>`<div class=m><div><b>${p.nm}</b><br><small class=mu>${p.desc}</small></div><b>${pc(p.t)}%</b></div>`).join('')}<small class=mu>Alcanza el 70% en cada práctica. Luego podrás rendir el examen de certificación.</small></div><button class=go onclick= ruta()>Ver prácticas y entrenar</button><button class=sec onclick=home()>Volver</button>`;return}show('over');const w=S.exCd-Date.now();
$('over').innerHTML=`<h1>📜 Examen de Certificación</h1><div class=card><b>Ascenso a: ${T[n]}</b><br><small class=mu>15 preguntas integrales, incluyendo 3 casos prácticos (4 desde Analista) de las competencias del rango · 15 s cada una · máximo 1 error permitido · sin comodines. Derechos de examen: ${C(XC[n])}.</small>${w>0?`<br><b>⏳ Podrás reintentar en ${Math.ceil(w/36e5)} h</b>`:''}</div>${w>0?`<button class=sec onclick=skipCd()>⏩ Saltar espera · ${C(150)}</button>`:`<button class=go onclick=examGo(${n})>Pagar ${C(XC[n])} y Rendir Examen</button>`}<button class=sec onclick=home()>← Volver</button>`}
function examGo(n){if(S.coins<XC[n]){$('over').insertAdjacentHTML('beforeend','<div class=fb>No tienes suficientes monedas.</div>');return}S.coins-=XC[n];save();G={exam:n,k:0,examN:0,err:0,combo:0,ok:0,tot:0,gain:0,coin:0,tt:15,br:10};show('game');ask()}
function exEnd(w){LAST=triggerExamenAscenso;if(w){S.rk=G.exam;if(!S.ttls.includes(S.rk))S.ttls.push(S.rk);save();celebra('📜 ¡ASCENSO CERTIFICADO!<br>'+T[S.rk]);fin(`<h1>📜 ¡Nuevo Rango Profesional!</h1><div class=big>${T[S.rk]}</div><div class=card>Tu Oficina 3D y nuevos módulos han sido desbloqueados.</div>`,200,100)}else{S.exCd=Date.now()+36e5*6;save();fin(`<h1>❌ No aprobaste</h1><div class=card>Repasa el Manual Técnico y vuelve a intentarlo.</div>`,0,0)}}

// ---- LIBRO DIARIO ----
const AC={
  '6011':'Mercaderías (compras)','40111':'IGV – cuenta propia','4212':'Facturas por pagar','1212':'Facturas por cobrar',
  '7012':'Ventas de mercaderías','4111':'Sueldos por pagar','6211':'Sueldos y salarios','684':'Depreciación de PPE',
  '393':'Depreciación acum. PPE','1041':'Cuentas corrientes','101':'Caja','501':'Capital social',
  '941':'Gastos de administración','791':'Cargas imp. a ctas de costos','2011':'Mercaderías (almacén)',
  '6111':'Variación de mercaderías','6322':'Asesoría legal y contable','4032':'ONP por pagar'
};
const AD=[
  ["Compra de mercadería al crédito por S/10,000 + IGV (Asiento de compra)",[["D","6011",10000],["D","40111",1800],["H","4212",11800]],["7012","1212"]],
  ["Ingreso a almacén (destino) de mercadería comprada por S/10,000",[["D","2011",10000],["H","6111",10000]],["6011","791"]],
  ["Venta de mercadería al crédito por S/5,000 + IGV",[["D","1212",5900],["H","7012",5000],["H","40111",900]],["6011","4212"]],
  ["Provisión de sueldos por S/3,000 con retención de ONP (13% = S/390)",[["D","6211",3000],["H","4032",390],["H","4111",2610]],["101","4212"]],
  ["Asiento de destino de gastos administrativos del mes por S/3,000",[["D","941",3000],["H","791",3000]],["6211","1041"]],
  ["Depreciación mensual de maquinaria por S/2,000 (naturaleza)",[["D","684",2000],["H","393",2000]],["1041","6211"]],
  ["Pago a proveedor por S/11,800 mediante transferencia bancaria",[["D","4212",11800],["H","1041",11800]],["101","1212"]],
  ["Aporte de capital de los socios en efectivo por S/50,000",[["D","101",50000],["H","501",50000]],["1041","7012"]]
];
function asi(){LAST=asi;const a=AD[rn(0,AD.length-1)];G={a,ids:sh([...new Set([...a[1].map(x=>x[1]),...a[2]])]),sel:null,r:[],cur:-1,err:0};show('game');asr()}
const arw=s=>G.r.map((x,i)=>x.s==s?`<div class=m onclick="event.stopPropagation();G.cur=${i};asr()" style="${G.cur==i?'outline:1px solid var(--ac)':''}"><span>${x.c}</span><b>${x.v||'0'}</b></div>`:'').join('');
function asr(m){const a=G.a;$('game').innerHTML=`<div class=row><b>🧾 Libro Diario (PCGE)</b><small class=mu>errores ${G.err}</small></div><div class=card><h2>${a[0]}</h2></div><small class=mu>1) Toca una cuenta · 2) toca DEBE o HABER · 3) digita el monto · ✔ valida</small><div class=gr3>${G.ids.map(c=>`<button class=pw style="${G.sel==c?'outline:2px solid var(--ac)':''}" onclick="G.sel='${c}';asr()">${c}<br>${AC[c]}</button>`).join('')}</div><div class=gr><div class=card onclick="adr('D')"><b>DEBE</b>${arw('D')}</div><div class=card onclick="adr('H')"><b>HABER</b>${arw('H')}</div></div><div class=gr3>${[1,2,3,4,5,6,7,8,9,0,'⌫','✔'].map(k=>`<button class=op style="margin:0;text-align:center" onclick="np('${k}')">${k}</button>`).join('')}</div><div id=fb>${m||''}</div>`}
function adr(s){if(G.sel){G.r.push({s,c:G.sel,v:''});G.cur=G.r.length-1;G.sel=null;asr()}}
function np(k){if(k=='✔')return av();if(G.cur<0)return;const x=G.r[G.cur];x.v=k=='⌫'?x.v.slice(0,-1):(x.v+k).slice(0,7);asr()}
function av(){const t=q=>G.r.filter(x=>x.s==q).reduce((a,x)=>a+(+x.v||0),0),D=t('D'),H=t('H');
if(!G.r.length||D!=H){G.err++;vib([70,40,70]);return asr(`<div class="fb sunat">⚖️ No cuadra: Debe S/${D} ≠ Haber S/${H}</div>`)}
const e=G.a[1].map(x=>x[0]+x[1]+':'+x[2]).sort().join(),u=G.r.map(x=>x.s+x.c+':'+(+x.v)).sort().join();
if(e!=u){G.err++;ms(1,0);vib([70,40,70]);return asr('<div class="fb sunat">Cuadra en sumas, pero las divisionarias o importes no corresponden a la operación.</div>')}
const g=addXP(Math.max(25,75-15*G.err)),c=Math.max(10,25-5*G.err);S.coins+=c;ms(1,1);ms(80,1);jn(5);mis(2);save();fin(`<h1>🧾 ¡Asiento Mayorizado!</h1><div class=card>${G.a[0]}</div>`,g,c)}

const nxD=()=>{const bad=rn(0,4),A=sh(['101 Caja','1212 Ctas por cobrar','6011 Compras','1041 Bancos','684 Depreciación']),B2=sh(['7012 Ventas','4212 Ctas por pagar','501 Capital','393 Deprec. acum.','4111 Sueldos por pagar']);let d=0;
const o=[0,1,2,3,4].map(i=>{let v=rn(1000,9999),h=v;if(i==bad){if(Math.random()<.5)h=v+(Math.random()<.5?-1:1)*rn(1,3)*.5;else{let k;do{v=rn(1000,9999);k=rn(0,2)}while(String(v)[k]==String(v)[k+1]);const q=String(v).split('');[q[k],q[k+1]]=[q[k+1],q[k]];h=+q.join('')}d=Math.abs(v-h)}
return `Debe ${A[i]} S/${v.toFixed(2)} · Haber ${B2[i]} S/${h.toFixed(2)}`});
return[`Diferencia en el balance: S/${d.toFixed(2)}${d>=9&&Number.isInteger(d)&&d%9==0?' (múltiplo de 9: ¿transposición?)':''}. ¿Qué asiento está mal?`,o,bad,1]};
const cierre=()=>{const d=new Date(),l=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();return d.getDate()>l-7&&(d.getDay()==0||d.getDay()==6)};
const nxT=()=>{const p=Q.filter(q=>[3,4].includes(q[0]/10|0)),q=p[rn(0,p.length-1)],o=sh(q[2].map((t,k)=>[t,k]));return[q[1],o.map(x=>x[0]),o.findIndex(x=>x[1]==q[3]),q[0]]};
function cm(){LAST=cm;blitz('🗓️ Cierre mensual',nxT,90)}

// ---- ligas ----
const DV=["Hierro","Bronce","Plata","Oro","Platino","Esmeralda","Diamante","Maestro","Retador"];
const lg=()=>`${rankBadgeSVG(S.dv)} ${DV[S.dv]} · ${S.lp} LP${S.pr?` · Promo ${S.pr.w}-${S.pr.l}`:''}`;
function rankRes(w,mc,tm){tm=tm||1;const bR=S.mmr+((G.bl||0)-3)*40,E=1/(1+Math.pow(10,(bR-S.mmr)/400));S.mmr=Math.max(0,Math.round(S.mmr+32*((w?1:0)-E)));S.ws=w?S.ws+1:0;
const gap=Math.max(-8,Math.min(8,Math.round((S.mmr-(900+S.dv*120))/12)));let up=0,d=0;
if(S.pr){w?S.pr.w++:S.pr.l++;if(S.pr.w>=2){S.dv++;S.lp=0;S.pr=null;up=1}else if(S.pr.l>=2){S.lp=75;S.pr=null}}
else{d=w?Math.round((20+gap+(mc>=5?5:0)+(S.ws>=3?5:0))*tm):-Math.max(8,15-Math.round(gap/2));S.lp+=d;if(S.lp<0){if(S.dv>0){S.dv--;S.lp=75}else S.lp=0}if(S.lp>=100){S.lp=100;if(S.dv<8)S.pr={w:0,l:0}}}
S.pk=Math.max(S.pk||0,S.dv);G.lpd=d;if(up)celebra('🎖️ ¡ASCENSO DE LIGA!<br>'+DV[S.dv]);return up}

const FZ=['Auditoría interna','Auditoría interna','SMV','Contraloría','SUNAT','SMV','Contraloría','SUNAFIL','SUNAT','SBS','Comité académico'];
const FZ_META={
  'SUNAT':{ic:'🦅',col:'#f43f5e',tag:'SUPERINTENDENCIA NACIONAL DE ADUANAS Y DE ADMINISTRACIÓN TRIBUTARIA',msg:'¡Inconsistencias críticas detectadas en tus declaraciones juradas y crédito fiscal!'},
  'SUNAFIL':{ic:'👷',col:'#f97316',tag:'SUPERINTENDENCIA NACIONAL DE FISCALIZACIÓN LABORAL',msg:'¡Alerta sociolaboral en T-Registro, PLAME y pago de beneficios sociales!'},
  'SBS':{ic:'🏦',col:'#06b6d4',tag:'SUPERINTENDENCIA DE BANCA, SEGUROS Y AFP',msg:'¡Observación severa en provisiones de cartera crediticia y encaje bancario!'},
  'Contraloría':{ic:'⚖️',col:'#eab308',tag:'CONTRALORÍA GENERAL DE LA REPÚBLICA · OCI',msg:'¡Acción de control posterior sobre la ejecución presupuestal en el SIAF!'},
  'SMV':{ic:'📈',col:'#a855f7',tag:'SUPERINTENDENCIA DEL MERCADO DE VALORES',msg:'¡Requerimiento de información financiera bajo normas NIIF completas!'},
  'Auditoría interna':{ic:'🔍',col:'#3b82f6',tag:'COMITÉ DE AUDITORÍA INTERNA & CONTROL COSO',msg:'¡Descuadre detectado en los controles internos y registros del periodo!'},
  'Comité académico':{ic:'🎓',col:'#10b981',tag:'JURADO EVALUADOR UNIVERSITARIO (UNFV / USMP)',msg:'¡Observación académica en la sustentación técnica de tus cursos!'}
};

function riskBarHTML(){
  const r=Math.min(100,S.risk||0);
  const col=r>=75?'#f43f5e':r>=45?'#ffb020':'#10b981';
  const lbl=r>=75?'¡PELIGRO INMINENTE!':r>=45?'Observado':'En Regla';
  return `<div style="margin:6px 0 8px;background:rgba(0,0,0,.38);padding:6px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.1)">
    <div class=row style="margin:0 0 4px;font-size:11px">
      <span>🚨 <b>Riesgo de Fiscalización:</b> <span style="color:${col};font-weight:800">${lbl}</span></span>
      <b style="color:${col}">${r}% / 100%</b>
    </div>
    <div class=bar style="height:8px;margin:0"><i id=rkBar style="width:${r}%;background:${col};box-shadow:0 0 8px ${col}"></i></div>
  </div>`;
}

function sfxBoss(type){
  try{
    const A=new(window.AudioContext||window.webkitAudioContext)();
    const notes=type=='shield'?[523,659,1047]:type=='win'?[440,554,659,880]:type=='pop'?[680]:[220,196,146,110];
    notes.forEach((f,i)=>{
      const o=A.createOscillator(),g=A.createGain();
      o.type=type=='boss'?'sawtooth':'triangle';
      o.frequency.value=f;g.gain.value=type=='pop'?.09:.16;
      o.connect(g);g.connect(A.destination);
      o.start(A.currentTime+i*.11);o.stop(A.currentTime+i*.11+(type=='pop'?.05:.13));
    });
  }catch(e){}
}

function multa(q,ok){
  const t=q[0],r=t<10?(t==3?4:0):(t/10|0),e=FZ[r]||'Auditoría interna',sun=e=='SUNAT'||e=='SUNAFIL'||e=='SBS';
  if(ok){
    if((S.risk||0)>0){S.risk=Math.max(0,(S.risk||0)-(G.combo>=3?14:7));save()}
    return '';
  }
  const inc=sun?38:28;
  S.risk=Math.min(100,(S.risk||0)+inc);
  save();
  const rb=$('rkBar');if(rb)rb.style.width=S.risk+'%';
  if(S.risk<100){
    return `<div class=fb style="border-color:#ffb020">⚠️ <b>Alerta de ${e}:</b> +${inc}% de riesgo fiscal (${S.risk}%/100%). ¡Acierta para reducir tu nivel de riesgo!</div>`;
  }
  S.risk=15;save();
  const baseMulta=Math.max(sun?35:20,Math.round(Math.max(S.coins,120)*(sun?.18:.12)));
  setTimeout(()=>launchFiscBoss(e,baseMulta,r),220);
  return `<div class="fb sunat">🚨 <b>¡RIESGO AL 100%! ¡INTERVENCIÓN DE ${e.toUpperCase()} EN CURSO!</b></div>`;
}

function launchFiscBoss(ent,baseMulta,rIdx){
  if(G.tm)clearInterval(G.tm);
  const meta=FZ_META[ent]||FZ_META['SUNAT'];
  const ov=document.createElement('div');
  ov.className='fisc-ov';
  ov.id='fiscModal';
  ov.style.setProperty('--fcol',meta.col);
  document.body.appendChild(ov);
  vib([120,60,160]);

  if((S.sh||0)>0){
    S.sh--;save();
    sfxBoss('shield');
    ov.innerHTML=`<div class=fisc-banner>
      <span class=fisc-sub>⚡ INTERVENCIÓN COACTIVA DETECTADA</span>
      <div class=fisc-crest>${meta.ic}</div>
      <div class=fisc-title>${ent}</div>
      <div class=sh-clash>🛡️</div>
      <h2 style="color:#38bdf8;margin:6px 0">¡BLOQUEO PERFECTO CON SEGURO!</h2>
      <p class=mu style="font-size:13px;margin:6px 0">Tu <b>Seguro de Cumplimiento</b> desvió la esquela de <b>${ent}</b> y evitó una multa de <b>${C(baseMulta)}</b>.<br>Escudos restantes: <b>${S.sh}</b></p>
      <button class=go style="background:linear-gradient(135deg,#0284c7,#38bdf8)" onclick="closeFiscModal()">⚡ CONTINUAR PARTIDA</button>
    </div>`;
    return;
  }

  sfxBoss('boss');
  ov.innerHTML=`<div class=fisc-banner id="fiscBox">
    <span class=fisc-sub>🚨 ¡ALERTA DE AUDITORÍA AL 100%!</span>
    <div class=fisc-crest>${meta.ic}</div>
    <div class=fisc-title>¡${ent} TE FISCALIZA!</div>
    <small style="color:#cbd5e1;display:block;margin-bottom:8px;font-size:11px">${meta.tag}</small>
    <div class=card style="background:rgba(0,0,0,.55);margin:8px 0">
      <p style="margin:0;font-size:13px">${meta.msg}</p>
      <b style="color:#f43f5e;display:block;margin-top:6px;font-size:15px">Multa Coactiva en riesgo: −${C(baseMulta)}</b>
    </div>
    <small class=mu style="display:block;margin-bottom:8px">🎯 <b>Reto AimTrainer (30s):</b> Los objetivos crecerán y se esconderán rápido. ¡Sobrevive los <b>30 segundos</b> sin dejar escapar <b>3 objetivos</b> para ganar el <b>90% de Gradualidad</b>!</small>
    <button class=go style="background:linear-gradient(135deg,${meta.col},#ffb020)" onclick="startAimMinigame('${ent}',${baseMulta},${rIdx})">🎯 INICIAR DEFENSA AIM (30 SEGUNDOS)</button>
  </div>`;
}

function startAimMinigame(ent,baseMulta,rIdx){
  const box=$('fiscBox');if(!box)return;
  let hits=0,misses=0,ended=false,tLeft=30;
  box.innerHTML=`<div class=row style="margin-top:0">
    <b class=gfont style="color:#fde047">🎯 ACIERTOS: <span id=aimHits>0</span></b>
    <b id=aimLives style="font-size:15px">🛡️🛡️🛡️ <small class=mu>(0/3 fallos)</small></b>
    <b id=aimTime style="color:#00e5ff">⏱ 30.0s</b>
  </div>
  <div class=bar><i id=aimBar style="width:100%"></i></div>
  <div class=aim-arena id=aimArena></div>
  <small class=mu>¡Dale clic a cada objetivo antes de que crezca y se esconda! No falles 3 veces.</small>`;

  const arena=$('aimArena');
  function updateLivesUI(){
    const el=$('aimLives');
    if(el)el.innerHTML=`${'🛡️'.repeat(Math.max(0,3-misses))}${'❌'.repeat(Math.min(3,misses))} <small class=mu>(${misses}/3)</small>`;
  }
  function addMiss(){
    if(ended)return;
    misses++;vib([60,30,60]);
    arena.classList.remove('shake');void arena.offsetWidth;arena.classList.add('shake');
    updateLivesUI();
    if(misses>=3) finishAim(false);
  }

  // Clic en el vacío de la arena cuenta como fallo de puntería
  arena.onmousedown=e=>{if(e.target===arena)addMiss()};

  function spawnTarget(){
    if(ended)return;
    const elapsed=30-tLeft;
    // Se vuelve más rápido conforme avanzan los 30s (de 1.35s baja hasta 0.85s)
    const dur=Math.max(0.85,1.35-elapsed*0.015);
    const tg=document.createElement('div');
    tg.className='aim-target';
    tg.style.setProperty('--adur',dur+'s');
    tg.style.left=rn(14,86)+'%';
    tg.style.top=rn(16,84)+'%';
    let clicked=false;
    const hitFn=e=>{
      e.stopPropagation();
      if(ended||clicked)return;
      clicked=true;
      hits++;sfxBoss('pop');vib(18);
      const hEl=$('aimHits');if(hEl)hEl.textContent=hits;
      tg.remove();
    };
    tg.onmousedown=hitFn;
    tg.ontouchstart=e=>{e.preventDefault();hitFn(e)};
    arena.appendChild(tg);

    setTimeout(()=>{
      if(!ended && !clicked && tg.parentNode){
        tg.remove();
        addMiss();
      }
    },dur*1000-30);
  }

  const t0=Date.now();
  let nextSpawn=0;
  const iv=setInterval(()=>{
    if(ended){clearInterval(iv);return}
    const el=(Date.now()-t0)/1000;
    tLeft=Math.max(0,30-el);
    const tEl=$('aimTime'),bEl=$('aimBar');
    if(tEl)tEl.textContent='⏱ '+tLeft.toFixed(1)+'s';
    if(bEl)bEl.style.width=(100*tLeft/30)+'%';
    if(el>=nextSpawn && tLeft>0.6){
      spawnTarget();
      // Frecuencia de aparición tipo AimTrainer (cada 0.65s a 0.45s)
      nextSpawn=el+Math.max(0.44,0.68-el*0.007);
    }
    if(tLeft<=0){clearInterval(iv);finishAim(true)}
  },50);

  function finishAim(won){
    if(ended)return;
    ended=true;clearInterval(iv);
    if(!won){
      const cobro=Math.min(S.coins,baseMulta);
      S.coins-=cobro;save();if($('cn'))$('cn').innerHTML=C(S.coins);
      sfxBoss('lose');vib([120,50,160]);
      box.innerHTML=`<div class=fisc-crest style="background:#7f1d1d">💥</div>
      <div class=fisc-title style="color:#f43f5e">¡3 FALLOS · EMBARGO COACTIVO!</div>
      <p class=mu style="font-size:13px">Acumulaste <b>3 fallos</b> (Aciertos logrados: <b>${hits}</b>). <b>${ent}</b> ejecutó la sanción completa.</p>
      <div class="fb sunat" style="font-size:16px;font-weight:800">💸 Penalización cobrada: −${C(cobro)}</div>
      <button class=go onclick="closeFiscModal()">Continuar</button>`;
      return;
    }
    sfxBoss('win');
    let pool=Q.filter(q=>rIdx?((q[0]/10|0)==rIdx):q[0]==3);
    if(!pool.length)pool=Q;
    const gq=pool[rn(0,pool.length-1)];
    const ops=sh(gq[2].map((t,k)=>[t,k]));
    box.innerHTML=`<span class=fisc-sub style="color:#10b981;border-color:#10b981">✅ ¡SOBREVIVISTE LOS 30s (${hits} IMPACTOS)!</span>
    <h2 style="color:#fde047;margin:4px 0">RÉGIMEN DE GRADUALIDAD (90% DSCTO.)</h2>
    <small class=mu style="display:block;margin-bottom:8px">Responde esta pregunta de <b>Subsanación Voluntaria</b> para rebajar la multa de <b>${C(baseMulta)}</b> a solo <b>${C(Math.max(2,Math.round(baseMulta*0.1)))} (90% menos)</b>:</small>
    <div class=card style="text-align:left;background:rgba(0,0,0,.6)"><b>${gq[1]}</b></div>
    <div id=gradOps>${ops.map(([t,k])=>`<button class=op style="margin:6px 0;padding:11px" onclick="ansGradualidad(${k==gq[3]},'${ent}',${baseMulta})">${t}</button>`).join('')}</div>`;
  }
}

function ansGradualidad(ok,ent,baseMulta){
  const box=$('fiscBox');if(!box)return;
  if(ok){
    const rebaja=Math.min(S.coins,Math.max(2,Math.round(baseMulta*0.1)));
    S.coins-=rebaja;const xpG=addXP(45);save();
    if($('cn'))$('cn').innerHTML=C(S.coins);
    sfxBoss('win');vib(30);
    box.innerHTML=`<div class=fisc-crest style="border-color:#10b981">🏆</div>
    <div class=fisc-title style="color:#10b981">¡GRADUALIDAD DEL 90% APROBADA!</div>
    <p class=mu style="font-size:13px">Subsanaste la observación de <b>${ent}</b> con éxito. Te ahorraste el 90% de la sanción y ganaste <b>+${xpG} XP</b>.</p>
    <div class=fb style="border-color:#10b981;color:#6ee7b7;font-weight:800">Pago reducido con gradualidad: −${C(rebaja)} (Ahorraste ${C(baseMulta-rebaja)})</div>
    <button class=go onclick="closeFiscModal()">⚡ VOLVER A LA PARTIDA</button>`;
  } else {
    const cobro=Math.min(S.coins,baseMulta);
    S.coins-=cobro;save();
    if($('cn'))$('cn').innerHTML=C(S.coins);
    sfxBoss('lose');vib([90,40,120]);
    box.innerHTML=`<div class=fisc-crest style="background:#7f1d1d">❌</div>
    <div class=fisc-title style="color:#f43f5e">SUBSANACIÓN RECHAZADA</div>
    <p class=mu style="font-size:13px">Fallaste el sustento técnico y perdiste el beneficio de gradualidad ante <b>${ent}</b>.</p>
    <div class="fb sunat" style="font-weight:800">💸 Multa íntegra cobrada: −${C(cobro)}</div>
    <button class=go onclick="closeFiscModal()">Continuar</button>`;
  }
}

function closeFiscModal(){
  const m=$('fiscModal');if(m)m.remove();
}

function revive(){const c=50*((G.rv||0)+1);if(S.coins<c){vib(80);return}S.coins-=c;G.rv=(G.rv||0)+1;G.lives=1;G.combo=0;vig(0);save();ask()}
function skipCd(){if(S.coins>=150){S.coins-=150;S.exCd=0;save();triggerExamenAscenso()}else vib(80)}
function prep(m){show('over');const t=S.tt||15;$('over').innerHTML=`<h1>${m=='duel'?'⚔️ Duelo 3D':'▶ Modo Estudio'}</h1><div class=card><b>⏱ Tiempo por pregunta</b><div class=gr4>${[10,15,20,30].map(x=>`<button class="sec ${x==t?'act':''}" onclick="S.tt=${x};save();prep('${m}')">${x}s<br><small>x${TX[x]}</small></button>`).join('')}</div><small class=mu style="display:block;margin-top:8px">Menos tiempo = más XP, LP y monedas (x${tmx()} ahora). Con 20s o 30s salen más ejercicios prácticos de cálculo.</small></div><button class=go onclick=${m}()>¡COMENZAR AHORA!</button><button class=sec onclick=home()>← Volver</button>`}
function celebra(h){try{const A=new(window.AudioContext||window.webkitAudioContext)();[523,659,784,1047].forEach((f,i)=>{const o=A.createOscillator(),g=A.createGain();o.frequency.value=f;g.gain.value=.15;o.connect(g);g.connect(A.destination);o.start(A.currentTime+i*.14);o.stop(A.currentTime+i*.14+.12)})}catch(e){}
const d=document.createElement('div');d.className='cf';d.onclick=()=>d.remove();d.innerHTML=`<b>${h}</b>`+Array.from({length:36},()=>`<i style="left:${rn(0,95)}vw;animation-delay:${Math.random()}s">${['🎉','✨','🏆','⭐'][rn(0,3)]}</i>`).join('')+'<small>(toca para cerrar)</small>';document.body.appendChild(d);vib([80,50,80,50,200]);setTimeout(()=>d.remove(),4000)}

const fitq=q=>(q[1].length+q[2].join('').length)/14<=(G.tt||15)+2;
function hf(f){let p;while(!(p=Q.filter(q=>f(q)&&fitq(q)&&q!=G.last&&!S.historial.includes(q[1]))).length&&S.historial.length)S.historial.shift();if(!p.length)p=Q.filter(f);if(!p.length)p=Q;return p[rn(0,p.length-1)]}
// Casos prácticos obligatorios en el examen de ascenso: 3 en rangos iniciales y 4 desde Analista.
// Formato compatible con el motor de preguntas: [tema, pregunta, opciones, índice correcto, explicación].
const EXAM_CASES={
0:[
[200,"📂 CASO PRÁCTICO: En caja hay S/ 800 y el negocio debe S/ 300 a un proveedor. ¿Qué representa la deuda?",["Activo","Pasivo","Ingreso","Gasto"],1,"La obligación pendiente con el proveedor es un pasivo."],
[201,"📂 CASO PRÁCTICO: Se compra útiles al contado por S/ 100 para uso de oficina. ¿Qué ocurre?",["Aumenta caja","Aumenta un gasto y disminuye caja","Aumenta capital","Aumenta una cuenta por pagar"],1,"El pago al contado reduce caja y reconoce el gasto correspondiente."],
[202,"📂 CASO PRÁCTICO: Una factura de venta debe archivarse. ¿Qué dato básico se verifica primero?",["Color del logo","RUC, fecha, serie/número y datos del cliente","Solo el importe","Solo la firma del cajero"],1,"La validez y trazabilidad documental exige revisar los datos de identificación." ]],
1:[
[210,"📂 CASO PRÁCTICO: Se compra mercadería al crédito por S/ 1,180 incluido IGV (18%). ¿Cuál es el IGV?",["S/ 180","S/ 212.40","S/ 1,000","S/ 118"],0,"Base imponible S/ 1,000 e IGV S/ 180."],
[211,"📂 CASO PRÁCTICO: Se paga una factura pendiente al proveedor desde el banco. ¿Cuál es el efecto principal?",["Aumenta la deuda","Disminuye banco y cuentas por pagar","Aumenta ventas","Aumenta capital"],1,"El pago cancela total o parcialmente la obligación y reduce bancos."],
[212,"📂 CASO PRÁCTICO: El saldo de Caja según libros no coincide con el arqueo. ¿Qué corresponde?",["Cambiar el saldo sin sustento","Investigar, documentar la diferencia y registrar el ajuste aprobado","Ignorar la diferencia","Registrar una venta ficticia"],1,"Toda diferencia debe investigarse y sustentarse antes de ajustar." ]],
2:[
[220,"📂 CASO PRÁCTICO: Ventas gravadas S/ 10,000 y compras con crédito fiscal válido S/ 6,000, ambos valores sin IGV. ¿IGV por pagar antes de otros ajustes?",["S/ 720","S/ 1,800","S/ 1,080","S/ 16,000"],2,"Débito S/ 1,800 menos crédito S/ 1,080 = S/ 720."],
[221,"📂 CASO PRÁCTICO: Una operación está sujeta a detracción. ¿Qué debe hacer el comprador?",["Ignorarla si ya pagó la factura","Depositar el porcentaje aplicable en la cuenta del Banco de la Nación según las reglas SPOT","Retener siempre el 18%","Anular la factura"],1,"Debe verificar la operación, tasa y oportunidad de depósito SPOT."],
[222,"📂 CASO PRÁCTICO: Un trabajador tiene remuneración mensual de S/ 2,000. ¿Qué se debe revisar antes de calcular la planilla neta?",["Solo el sueldo bruto","Aportes/descuentos aplicables, régimen pensionario y conceptos remunerativos","Solo el IGV","El costo de inventario"],1,"La planilla depende de los conceptos y aportes que correspondan al trabajador." ]],
3:[
[230,"📂 CASO PRÁCTICO: Activo corriente S/ 60,000 y pasivo corriente S/ 30,000. ¿Cuál es la razón corriente?",["0.5","2.0","30,000","90,000"],1,"Razón corriente = 60,000 / 30,000 = 2.0."],
[231,"📂 CASO PRÁCTICO: Un producto cuesta S/ 30 por unidad y se vende a S/ 50. Los costos fijos son S/ 4,000. ¿Punto de equilibrio en unidades?",["80","200","133","4,000"],1,"Margen de contribución S/ 20; 4,000 / 20 = 200 unidades."],
[232,"📂 CASO PRÁCTICO: En una conciliación, el banco muestra un cheque emitido aún no cobrado. ¿Cómo se trata normalmente?",["Como error del banco automáticamente","Como cheque pendiente que explica la diferencia temporal","Como ingreso nuevo","Se elimina del libro diario"],1,"Los cheques pendientes son partidas conciliatorias temporales." ]],
4:[
[240,"📂 CASO PRÁCTICO: Una máquina cuesta S/ 24,000, valor residual S/ 4,000 y vida útil 5 años. Depreciación lineal anual:",["S/ 4,000","S/ 4,800","S/ 5,600","S/ 20,000"],0,"(24,000 − 4,000) / 5 = S/ 4,000 anuales."],
[241,"📂 CASO PRÁCTICO: Hay indicios de deterioro en un activo. ¿Qué corresponde bajo NIC 36?",["No hacer nada hasta venderlo","Evaluar importe recuperable y compararlo con el importe en libros","Revalorizar siempre al alza","Registrar todo como inventario"],1,"Si el importe en libros supera al recuperable, puede corresponder reconocer deterioro."],
[242,"📂 CASO PRÁCTICO: Antes de cerrar el mes, una factura de servicio corresponde al periodo pero llegará después. ¿Qué principio guía el registro?",["Caja exclusivamente","Devengo","Consistencia de caja chica","Realización de inventario"],1,"Los gastos se reconocen en el periodo en que se devengan, si corresponde." ]],
5:[
[250,"📂 CASO PRÁCTICO: La base contable de un activo es S/ 50,000 y su base tributaria S/ 40,000. La diferencia imponible futura normalmente origina:",["Activo por impuesto diferido","Pasivo por impuesto diferido","Ingreso por IGV","Nada en todos los casos"],1,"Una diferencia temporaria imponible normalmente genera pasivo por impuesto diferido."],
[251,"📂 CASO PRÁCTICO: La gerencia solicita reducir impuestos sin sustento legal. ¿Qué debe hacer el contador?",["Crear gastos ficticios","Rechazar la manipulación y proponer alternativas legales documentadas","Alterar inventarios","Omitir ventas"],1,"La planificación debe respetar la ley, la evidencia y la ética profesional."],
[252,"📂 CASO PRÁCTICO: Un saldo antiguo de cliente parece incobrable. ¿Qué acción es más apropiada?",["Castigarlo sin evidencia","Evaluar recuperabilidad, sustento y política contable antes de reconocer deterioro","Mantenerlo siempre intacto","Pasarlo a caja"],1,"La estimación requiere evidencia y aplicación de la política contable pertinente." ]],
6:[
[260,"📂 CASO PRÁCTICO: En auditoría se detecta un control clave que no opera. ¿Qué debe hacer el auditor?",["Ignorarlo si hay ganancias","Evaluar el riesgo y ajustar la naturaleza, oportunidad y alcance de pruebas","Emitir opinión limpia automáticamente","Eliminar la muestra"],1,"La deficiencia afecta la evaluación de riesgos y la respuesta de auditoría."],
[261,"📂 CASO PRÁCTICO: Se identifican indicios de fraude material de la gerencia. ¿Cuál es la respuesta adecuada?",["Avisar solo verbalmente y cerrar","Ampliar procedimientos, documentar evidencia y comunicar según normas aplicables","Modificar papeles de trabajo","No informar a nadie"],1,"El auditor debe obtener evidencia suficiente y comunicar de acuerdo con las normas."],
[262,"📂 CASO PRÁCTICO: Un estado financiero contiene una incorrección material no corregida y generalizada. ¿Qué opinión puede corresponder?",["Sin salvedades","Adversa","Abstención siempre","No aplica opinión"],1,"Una incorrección material y generalizada puede conducir a una opinión adversa." ]],
7:[
[270,"📂 CASO PRÁCTICO: Una entidad pública registra una obligación, pero aún no se devengó correctamente. ¿Qué debe primar?",["Pagar para cerrar el mes","Verificar fase, documentación y reglas presupuestarias/contables antes de reconocer o pagar","Registrar como ingreso","Usar caja chica"],1,"La ejecución pública requiere sustento y cumplimiento de las fases y normativa aplicables."],
[271,"📂 CASO PRÁCTICO: En una entidad financiera, la clasificación de créditos afecta provisiones. ¿Qué criterio es esencial?",["La preferencia del asesor","La clasificación de riesgo y normativa SBS vigente, respaldada por evidencia","Solo la antigüedad de la empresa","El saldo de caja"],1,"La clasificación de cartera debe ajustarse a criterios regulatorios y evidencia."],
[272,"📂 CASO PRÁCTICO: Como gerente, detectas que un ajuste importante no tiene respaldo. ¿Qué decisión es correcta?",["Aprobarlo para cumplir la meta","Detener su registro hasta obtener sustento y aprobación adecuada","Dividirlo para ocultarlo","Eliminar el soporte"],1,"Los ajustes deben tener evidencia, trazabilidad y aprobación conforme a controles." ]]
};
function pick(){const l=gl(),r=Math.random(),b=G.br;
if(G.exam){const n=G.exam>=3?4:3;if((G.examN||0)<n){const pool=EXAM_CASES[G.exam-1]||EXAM_CASES[0];return pool[(G.examN||0)%pool.length]}return r<.3?GEN[rn(0,GEN.length-1)]():hf(q=>q[0]>=100&&q[0]<100+SEM[G.exam])}

if(G.exam)return r<.3?GEN[rn(0,GEN.length-1)]():hf(q=>q[0]>=100&&q[0]<100+SEM[G.exam]);
const k=R.findIndex(x=>(x[0]/10|0)==b);if(k>=0&&r<.2)return R.splice(k,1)[0];
const mx=b?Math.min(BR[b][2].length-1,bm(b)):l;
if(Math.random()<(G.tt>=20?.5:.25))for(let i=0;i<14;i++){const g=GEN[rn(0,GEN.length-1)]();if(b?((g[0]/10|0)==b&&g[0]%10<=mx):g[0]<=l)return g}
const t=10*b+(Math.random()<.7?mx:rn(0,mx));return hf(q=>q[0]==t)}

const hud=()=>`<div class="stage3d duel-stage"><span class=badge3d>${IC.swords} Arena 3D</span><canvas id="cvDuel3D"></canvas></div><div class=row><b>${avt(S.sk)} Tú <span id=hvm>${G.me}</span></b><b><span id=hve>${G.en}</span> ${G.rival?G.rival.name:BN[G.bl]} ${G.rival?rankBadgeSVG(G.rival.div):''}</b></div><div class=vs><div class=hp><u id=hum style="width:${G.me}%"></u><i id=him style="width:${G.me}%"></i></div><div class="hp e"><u id=hue style="width:${G.en}%"></u><i id=hie style="width:${G.en}%"></i></div></div>`;
function hpu(){[['m',G.me],['e',G.en]].forEach(([k,v])=>{$('hi'+k).style.width=v+'%';$('hu'+k).style.width=v+'\%';$('hv'+k).textContent=v})}
function fct(side,t){const e=document.createElement('span');e.className='fct';e.textContent=t;e.style.left=side=='e'?'72%':'20%';$('hud').appendChild(e);setTimeout(()=>e.remove(),1000)}
function hitstop(){const b=document.body,t=G.tm,k=G.tk;b.classList.add('hs');if(k)clearInterval(t);G.t0+=150;setTimeout(()=>{b.classList.remove('hs');if(k&&G.tm==t)G.tm=setInterval(k,100)},150)}
function vig(on){document.body.classList.toggle('vg',!!on)}

function formatChoiceText(t){
  const raw=String(t);
  if(!/(debe|haber)/i.test(raw))return raw;
  const parts=raw.split(/\s*\/\s*/).map(x=>x.trim()).filter(Boolean);
  const debit=[],credit=[];
  for(const part of parts){
    const dm=part.match(/^Debe\s+(.+)$/i), hm=part.match(/^Haber\s+(.+)$/i);
    if(dm)debit.push(dm[1]); else if(hm)credit.push(hm[1]);
    else (debit.length<=credit.length?debit:credit).push(part);
  }
  const cells=(items,side)=>items.length?items.map(x=>`<div class="entry-line">${x}</div>`).join(''):'<div class="entry-empty">—</div>';
  return `<div class="entry-choice"><div class="entry-choice-label">ASIENTO CONTABLE</div><div class="entry-ledger"><div class="entry-col entry-debit-col"><div class="entry-col-head">DEBE</div>${cells(debit,'D')}</div><div class="entry-col entry-credit-col"><div class="entry-col-head">HABER</div>${cells(credit,'H')}</div></div></div>`;
}
function ask(){G.lock=0;const q=G.q=pick();G.last=q;const d=G.duel;G.gold=!d&&!G.exam&&Math.random()<.12;G.t=G.exam?15:(G.tb||G.tt||15)*(G.gold?.67:1);G.t0=Date.now();
if(d){const hot=S.ws>=3,pa=Math.min(.95,Math.max(.35,.5+.05*G.bl+(S.mmr-1000)/4000));G.bot={ok:Math.random()<pa,t:hot?.8+Math.random()*.7:Math.max(1.5,(2.5+Math.random()*6.5-(S.mmr-1000)/400)*(G.tt||15)/12),said:0}}
const o=sh(q[2].map((t,k)=>[t,k]));$('game').classList.remove('shake');$('game').innerHTML=`<div id=hud>${G.exam?exh():d?hud():`<div class=row><span>${'❤️'.repeat(G.lives)}${'🖤'.repeat(3-G.lives)}</span><b>${IC.star}${G.score}</b></div>`}</div>
<div class=bar><i id=tb style="width:100%"></i></div>
${G.exam?'':riskBarHTML()}
<div class=row><small class=mu>${tn(q[0])} (${pc(q[0])}%)</small><b class="${G.combo>5?'fire':''}">${G.combo>1?IC.fire+' x'+G.combo:''}${G.x2?' ⚡x2':''}</b></div>
<div id=bt class=mu style="min-height:18px;font-size:13px">${d&&G.rival?`⚔️ Rival por encima de ti · ${DV[G.rival.div]} · ${G.rival.lp} LP`:''}</div>
${G.gold?'<div class=gold>💎 PREGUNTA DORADA · PUNTOS Y XP x3</div>':''}
<div class=card><h2>${q[1]}</h2></div>
${o.map(([t,k])=>`<button class="op ${/(debe|haber|compras\s+\d)/i.test(String(t))?'op-account':''}" data-k=${k} onclick=ans(this)>${formatChoiceText(t)}</button>`).join('')}
<div class=row><span><button class=pw onclick=pw(1)>✂️ 50/50 · ${S.fp?`Gratis (${S.fp})`:C(30)}</button> <button class=pw onclick=pw(2)>⏱️ +5s · ${S.fp?`Gratis (${S.fp})`:C(20)}</button></span><b id=cn>${C(S.coins)}</b></div><div id=fb></div>`;
if(d){try{init3D('cvDuel3D','duel')}catch(e){}}
clearInterval(G.tm);G.tm=setInterval(()=>{const e=(Date.now()-G.t0)/1000;$('tb').style.width=Math.max(0,100*(1-e/G.t))+'%';
if(G.duel&&!G.bot.said&&e>=G.bot.t){G.bot.said=1;$('bt').textContent='🤖 ¡El rival ya respondió! ⚡'}
if(e>=G.t)ans(null)},100)}

function pw(t){if(G.lock||G.exam)return;const c=t==1?30:20;if(S.fp>0)S.fp--;else{if(S.coins<c){vib(80);return}S.coins-=c}save();$('cn').innerHTML=C(S.coins);
if(t==1){const q=G.q;let n=0;sh([...document.querySelectorAll('.op')]).forEach(x=>{if(+x.dataset.k!=q[3]&&n<(q[2].length>2?2:1)){x.disabled=1;x.style.opacity=.2;n++}})}else G.t+=5}

function ans(b){if(G.lock)return;G.lock=1;clearInterval(G.tm);const gg=G;
const q=G.q,k=b?+b.dataset.k:-1,ok=k==q[3],tp=(Date.now()-G.t0)/1000;ms(q[0],ok);G.tot++;jn(1);S.historial.push(q[1]);if(S.historial.length>60)S.historial.shift();
document.querySelectorAll('.op').forEach(x=>{x.disabled=1;if(+x.dataset.k==q[3])x.classList.add('ok')});
if(!ok){if(b)b.classList.add('bad');$('game').classList.add('shake');W3D.hit=1;hitstop()}if(ok&&b)b.classList.add('pop');
const exp=`<br><small class=mu>${q[4]}</small>`,wb=e=>`<button class=sec onclick="${e?'over()':'ask()'}">${e?'Ver resultado':'Continuar →'}</button>`;
if(G.exam){G.examN=(G.examN||0)+1;if(ok){G.k++;G.ok++}else G.err++;const bad=G.err>1,win=G.k>=15;
$('fb').innerHTML=`<div class=fb>${ok?'✅':b?'❌':'⏰'} <small class=mu>${q[4]}</small></div>`+(bad||win?`<button class=sec onclick=exEnd(${win&&!bad})>Ver resultado</button>`:'');
if(!bad&&!win)setTimeout(()=>{if(G===gg)ask()},ok?900:1800);return}
const sm=multa(q,ok);
if(G.duel){const bt=G.bot,bk=bt.ok;let w=0,m;
if(ok&&(!bk||tp<bt.t))w=1;else if(bk&&(!ok||bt.t<tp))w=-1;
if(ok){G.ok++;G.gain+=addXP(25);G.combo++;G.mc=Math.max(G.mc||0,G.combo);vig(G.combo>=5);const cc=Math.round(7*tmx());G.coin+=cc;S.coins+=cc;mis(0)}else{G.combo=0;vig(0);R.push(q)}
const dmg=20+Math.min(G.combo,5)*4;
if(w==1){G.en=Math.max(0,G.en-dmg);W3D.hit=0.7;m=`${IC.swords} ¡Golpe crítico de ${dmg}! (${tp.toFixed(1)}s vs ${bt.t.toFixed(1)}s)`;vib(30)}
else if(w==-1){G.me=Math.max(0,G.me-20);W3D.hit=1;m=`💥 El rival ${ok?'fue más rápido':'acertó'} (${bt.t.toFixed(1)}s): −20 HP`;vib([70,40,70]);$('game').classList.add('shake');hitstop()}
else m='🤝 Nadie acertó: sin daño';
save();hpu();if(w==1)fct('e','-'+dmg);if(w==-1)fct('m','-20');$('cn').innerHTML=C(S.coins);
const end=G.me<=0||G.en<=0;
$('fb').innerHTML=`<div class=fb>${m}${exp}</div>${sm}${ok&&!end&&!$ ('fiscModal')?'':wb(end)}`;
if(ok&&!end&&!$('fiscModal'))setTimeout(()=>{if(G===gg)ask()},1700);return}
if(ok){G.ok++;G.combo++;vig(G.combo>=5);if(G.combo%3==0)G.tb=Math.max(4,(G.tb||G.tt||15)*.95);
let pts=12*Math.min(G.combo,5)*(G.gold?3:1)*(G.x2?2:1),extra='',c=Math.round((G.combo>5?10:6)*tmx());G.x2=0;
if(Math.random()<.25){const r=Math.random();c+=12;
if(r<.5){pts+=20;extra=`<br>🎁 Cofre: +20 pts +${C(12)}`}else if(r<.8){pts+=35;extra=`<br>🎁 Cofre: +35 pts +${C(12)}`}
else if(r<.92){if(G.lives<3){G.lives++;extra='<br>🎁 Cofre: ❤️ vida extra'}else{G.x2=1;extra='<br>🎁 Cofre: ⚡ x2 en la próxima'}}
else{pts+=70;c+=45;extra=`<br>🎰 ¡JACKPOT! +70 pts +${C(55)}`}}
const g=addXP(pts);G.score+=pts;G.gain+=g;G.coin+=c;S.coins+=c;mis(0);vib(25);
save();$('cn').innerHTML=C(S.coins);$('fb').innerHTML=`<div class=fb>✅ <b>+${pts} pts · +${g} XP · +${C(c)}</b>${extra}${exp}</div>`;setTimeout(()=>{if(G===gg&&!$('fiscModal'))ask()},extra?1900:1250)}
else{G.combo=0;vig(0);G.tb=Math.min(G.tt||15,(G.tb||G.tt||15)*1.1);G.lives--;R.push(q);vib([70,40,70]);save();
$('fb').innerHTML=`<div class=fb>${b?'❌':'⏰'} <b>Correcta:</b> ${q[2][q[3]]}${exp}</div>${sm}${!G.lives?`<button class=sec onclick=revive()>💖 Revivir con 1 vida · ${C(50*((G.rv||0)+1))}</button>`:''}${wb(!G.lives)}`}}

function over(){
if(G.duel){const w=G.en<=0,b=Math.round((w?45:12)*(G.mc>=5?1.5:1)*tmx());rankRes(w,G.mc,tmx());if(w)mis(1);S.coins+=b;save();
fin(`<h1>${w?'🏆 ¡VICTORIA!':'💀 Derrota'}</h1><div class=big>${S.pr||!G.lpd?'Promoción':(G.lpd>0?'+':'')+G.lpd+' LP'}</div><div class=card><div class=m><span>Liga</span><b>${lg()}</b></div><div class=m><span>Aciertos</span><b>${G.ok}/${G.tot}</b></div><div class=m><span>Rival</span><b>${BN[G.bl]}</b></div></div>`,G.gain,G.coin+b);return}
if(G.score>S.best)S.best=G.score;save();
fin(`<h1>Sesión Completada</h1><div class=big>${IC.star} ${G.score}</div><div class=card><div class=m><span>Aciertos</span><b>${G.ok}/${G.tot}</b></div><div class=m><span>Récord</span><b>${S.best}</b></div></div>`,G.gain,G.coin)}

// ================= CASOS REALES =================
const CS=[
["🧾 Compra y venta con IGV y Destino",3,"Compras mercaderías por S/10,000 + IGV, al crédito (factura).",`¿Cuánto es el IGV de la compra?|S/1,800;S/1,000;S/180|18% de 10,000.
Total a pagar al proveedor:|S/11,800;S/10,000;S/11,000|Base + IGV.
Asiento de compra: Debe…|60 Compras 10,000 y 40111 IGV 1,800 / Haber 4212 Facturas por pagar 11,800;60 Compras 11,800 / Haber 42 11,800;42 11,800 / Haber 60 y 40|El IGV va al crédito fiscal (40111).
Asiento de destino al almacén:|Debe 2011 Mercaderías 10,000 / Haber 6111 Variación de mercaderías 10,000;Debe 94 / Haber 79;Debe 69 / Haber 20|Las compras de existencias ingresan al Elemento 2 contra la 61.
Luego vendes todo por S/16,000 + IGV. ¿IGV neto a pagar a SUNAT?|S/1,080;S/2,880;S/1,800|Débito fiscal 2,880 − Crédito fiscal 1,800 = 1,080.`],
["👷 Planilla Mensual y Destino (S/3,000)",71,"Trabajador administrativo del régimen general con sueldo de S/3,000 afiliado a la ONP.",`EsSalud a cargo del empleador (9%):|S/270;S/390;S/300|9% de 3,000.
ONP que se retiene al trabajador (13%):|S/390;S/270;S/300|13% de 3,000.
Neto a abonar al trabajador (Cta 4111):|S/2,610;S/2,730;S/3,000|3,000 − 390.
Gratificación de julio más bonificación extraordinaria de 9%:|S/3,270;S/3,000;S/3,390|3,000 + 270 = 3,270.
Monto total del asiento de destino (Debe 94 / Haber 79) por la planilla del mes:|S/3,270 (Sueldo S/3,000 + EsSalud S/270);S/2,610;S/3,000|El costo laboral para la empresa incluye la remuneración bruta más el aporte del empleador a EsSalud.`],
["🏛️ Conciliación Tributaria y NIC 12",43,"Utilidad contable antes de impuestos: S/200,000. Incluye multa de SUNAT (S/5,000) y provisión de vacaciones no pagadas al vencimiento de la DJ (S/10,000).",`La multa de SUNAT de S/5,000 es una diferencia…|Permanente (se adiciona y nunca será deducible);Temporaria;Deducible|Art. 44 inc. c) de la LIR.
Las vacaciones no pagadas a la fecha de la DJ (S/10,000) son una diferencia…|Temporaria deducible (se adiciona hoy y se deducirá en el año en que se paguen);Permanente;Inafecta|Art. 37 inc. v) de la LIR.
Renta Neta Imponible del ejercicio:|S/215,000 (200,000 + 5,000 + 10,000);S/205,000;S/190,000|Utilidad contable más adiciones permanentes y temporarias.
Impuesto a la Renta Corriente (29.5% de 215,000):|S/63,425;S/59,000;S/60,475|215,000 × 29.5% = 63,425.
Activo por Impuesto Diferido (NIC 12) generado por la diferencia temporaria de S/10,000:|S/2,950 (Debe 3712 / Haber 882);S/4,425;S/0|10,000 × 29.5% = S/2,950.`],
["🔍 Papeles de Auditoría (NIA 505 / 705)",32,"Auditas cuentas por cobrar de S/500,000 con materialidad de S/20,000. Un cliente confirma S/30,000 menos que tu libro por una nota de crédito omitida.",`Circularizar y confirmar saldos con clientes (NIA 505) es un procedimiento…|Sustantivo con evidencia externa;De control interno;Analítico preliminar|La evidencia externa directa es de alta confiabilidad.
La incorrección de S/30,000 frente a la materialidad de S/20,000 es…|Material;Trivial;Insignificante|Supera el umbral de materialidad establecido (NIA 320).
Si la gerencia se niega a ajustar el error pero el efecto no es generalizado en los EEFF, emites…|Opinión con salvedades (NIA 705);Opinión adversa;Opinión limpia|Material pero circunscrito a cuentas por cobrar/ventas.
La evidencia y conclusiones deben quedar registradas en…|Los papeles de trabajo / documentación de auditoría (NIA 230);El Libro de Actas;El T-Registro|Sustento del dictamen del auditor.`],
["📦 Cierre: Depreciación y Cobranza Dudosa",6,"Cierre 31/12: camioneta de S/120,000 (5 años, línea recta, sin residual). Cuentas por cobrar vencidas por S/10,000 con deterioro estimado del 30%.",`Depreciación anual de la camioneta:|S/24,000;S/20,000;S/30,000|120,000 ÷ 5.
Asiento por naturaleza de la depreciación:|Debe 684 Valuación y deterioro / Haber 393 Depreciación acumulada;Debe 39 / Haber 68;Debe 33 / Haber 68|Seguido de su destino (94/95 a 79).
Estimación de cobranza dudosa (30% de 10,000):|S/3,000;S/7,000;S/10,000|30% de 10,000.
La provisión se abona a la cuenta…|19 Estimación de cuentas de cobranza dudosa;12 Cuentas por cobrar;70 Ventas|Cuenta correctora (valuación) que disminuye el rubro de cuentas por cobrar en el ESF.`],
["🇵🇪 Ejecución del Gasto Público (SIAF)",61,"Una entidad pública adquiere equipos de cómputo por S/50,000 con Certificación de Crédito Presupuestario (CCP) aprobada.",`Primera fase de ejecución tras la CCP al perfeccionar el contrato/orden de compra:|Compromiso;Devengado;Girado|Reserva el crédito presupuestario.
Al ingresar los equipos al almacén con conformidad del área usuaria y factura se registra el…|Devengado;Compromiso;Certificado|Genera la obligación de pago y afecta definitivamente el presupuesto.
La cuenta contable del PCG para Equipos Computacionales es parte del rubro…|1503 Vehículos, Maquinarias y Otros;1101 Caja y Bancos;3101 Hacienda Nacional|Activo no financiero público.
El giro y pago con cargo a la CUT se registra en el…|SIAF-RP / SIAF-SP;SIRE;PLAME|Sistema Integrado de Administración Financiera.`],
["📈 Diagnóstico Financiero Integral",21,"Industrias Andinas: Activo S/50,000 (corriente 20,000 e inventarios 12,000). Pasivo S/35,000 (corriente 18,000). Patrimonio S/15,000. Utilidad neta S/1,500.",`ROE (Rentabilidad Patrimonial):|10%;3%;7.5%|1,500 ÷ 15,000 = 10%.
ROA (Rentabilidad de los Activos):|3%;10%;4%|1,500 ÷ 50,000 = 3%.
Prueba ácida:|0.44;1.11;0.67|(20,000 − 12,000) ÷ 18,000 = 0.44.
Apalancamiento financiero (Pasivo / Patrimonio):|2.33;0.43;3.33|35,000 ÷ 15,000 = 2.33.
Diagnóstico del Analista Financiero:|Severa tensión de liquidez ácida y alto endeudamiento;Liquidez holgada;Sin deuda|Solo dispone de S/0.44 de activos líquidos por cada S/1 de deuda a corto plazo.`],
["🏦 Caso SBS: Crédito Bancario y Provisiones",91,"Un banco desembolsa un crédito corporativo en soles por S/100,000 en la cuenta corriente del cliente. Meses después el cliente cae en mora y es clasificado como Deficiente.",`En el desembolso inicial, el asiento contable SBS es:|Debe 1411 Créditos vigentes MN S/100,000 / Haber 2111 Obligaciones a la vista MN S/100,000;Debe 1111 / Haber 1411;Debe 1212 / Haber 7012|Aumenta colocaciones (14) y depósitos a la vista (21).
Mientras el crédito estuvo vigente, los intereses ganados se abonaron en…|Rubro 51 Ingresos Financieros (5114 Intereses por créditos vigentes);Rubro 41 Gastos Financieros;Cuenta 70|Con cargo a la 1418 Rendimientos devengados.
Al vencer el pagaré y entrar en mora, el capital se reclasifica a…|1415 Créditos Vencidos MN;1411 Créditos Vigentes MN;Cuenta 19|Refleja el incumplimiento del cronograma.
La provisión por riesgo de incobrabilidad del crédito se registra en:|Debe 4312 Provisiones por incobrabilidad de créditos / Haber 1419 Provisiones para créditos;Debe 68 / Haber 19;Debe 51 / Haber 14|Afecta el resultado del banco (Clase 4) y deduce la cartera (1409/1419).`],
["🏢 NIIF 16: Arrendamiento Operativo en Balance",51,"Alquilas un local comercial por 3 años: pagos anuales vencidos de S/10,000 y tasa de descuento (IBR) de 10% anual.",`Pasivo por arrendamiento inicial (Valor Presente):|S/24,869;S/30,000;S/27,000|10,000 × (1 − 1.1^−3) ÷ 0.10 ≈ 24,869.
Activo por derecho de uso inicial (Cuenta 322):|S/24,869;S/30,000;S/0|Igual al pasivo inicial más costos directos iniciales si los hubiera.
Depreciación anual del derecho de uso (3 años, línea recta):|S/8,290;S/10,000;S/6,000|24,869 ÷ 3 ≈ 8,290 (Debe 682 / Haber 392).
Gasto financiero por intereses del Año 1 (Cuenta 673):|S/2,487;S/1,000;S/10,000|10% × 24,869 ≈ 2,487 (y la amortización del pasivo 452 es 10,000 − 2,487 = S/7,513).`]
].map(c=>[c[0],c[1],c[2],c[3].trim().split('\n').map(x=>{const p=x.split('|');return[p[0],p[1].split(';'),p[2]]})]);

function cs(i){G={cs:i,k:0,err:0,lock:0};show('game');csr()}
function csr(){const c=CS[G.cs],s=c[3][G.k],o=sh(s[1].map((t,k)=>[t,k]));G.lock=0;$('game').classList.remove('shake');$('game').innerHTML=`<div class=row><b>${c[0]}</b><b>Paso ${G.k+1}/${c[3].length}</b></div>${riskBarHTML()}<div class=card><small class=mu>${c[2]}</small></div><div class=card><h2>${s[0]}</h2></div>${o.map(([t,k])=>`<button class=op data-k=${k} onclick=csa(this)>${t}</button>`).join('')}<div id=fb></div>`}
function csa(b){if(G.lock)return;G.lock=1;const c=CS[G.cs],s=c[3][G.k],ok=+b.dataset.k==0,last=G.k==c[3].length-1;ms(c[1],ok);jn(3);const sm=multa([c[1]],ok);
document.querySelectorAll('.op').forEach(x=>{x.disabled=1;if(+x.dataset.k==0)x.classList.add('ok')});
if(!ok){G.err++;b.classList.add('bad');$('game').classList.add('shake');vib([70,40,70])}else vib(20);$('fb').innerHTML=`<div class=fb>${ok?'✅':'❌'} <small class=mu>${s[2]}</small></div>${sm}<button class=sec onclick="${last?'cse()':'G.k++;csr()'}">${last?'Terminar caso':'Siguiente →'}</button>`}
const CASE_FLOW=[
 {deliverable:'Registro de compra, destino de mercadería y cálculo del IGV neto',connect:'PCGE · Libro Diario · Inventarios · IGV / SIRE',next:'Verificar que el costo de ventas y el movimiento de inventario estén registrados antes del cierre.'},
 {deliverable:'Resumen de remuneración, retención ONP y aporte EsSalud',connect:'Planilla · PLAME · Obligaciones por pagar · Destino por función',next:'Conciliar las obligaciones laborales con el asiento contable y revisar los beneficios sociales que correspondan.'},
 {deliverable:'Conciliación entre utilidad contable y renta imponible; cálculo ilustrativo del impuesto diferido',connect:'Cierre contable · Impuesto a la Renta · NIC 12 · Estados financieros',next:'Revisar el sustento de cada adición/deducción y validar el tratamiento con la normativa aplicable al ejercicio.'},
 {deliverable:'Cédula de diferencia, evaluación de materialidad y conclusión de auditoría',connect:'Cuentas por cobrar · Confirmaciones externas · Papeles de trabajo · NIA 705',next:'Documentar el ajuste propuesto, obtener respuesta de gerencia y evaluar el efecto agregado en los estados financieros.'},
 {deliverable:'Cédula de depreciación y estimación de cobranza dudosa',connect:'Activo fijo · Cuentas por cobrar · Asientos de ajuste · Hoja de trabajo',next:'Registrar y destinar los gastos; luego trasladar los saldos ajustados a la hoja de trabajo.'},
 {deliverable:'Matriz de fases presupuestarias y registro de adquisición pública',connect:'PCG Público · SIAF · Presupuesto · Devengado y pago',next:'Conciliar el expediente administrativo, la conformidad y la obligación contable antes del giro.'},
 {deliverable:'Panel de indicadores de liquidez, rentabilidad y apalancamiento',connect:'Estados financieros · Análisis financiero · Gestión de riesgos',next:'Proponer acciones para mejorar la liquidez y comparar los indicadores con otro periodo o sector.'},
 {deliverable:'Cédula de crédito, reclasificación por mora y provisión bancaria',connect:'Contabilidad SBS · Cartera de créditos · Riesgo crediticio',next:'Verificar la clasificación del deudor y la provisión exigible con la normativa SBS vigente.'},
 {deliverable:'Cuadro de valor presente, pasivo por arrendamiento, depreciación e intereses',connect:'NIIF 16 · Activos por derecho de uso · Cierre contable',next:'Actualizar el cronograma de amortización y comprobar la presentación corriente/no corriente al cierre.'}
];
function caseHub(){
 show('over');
 const reports=S.caseReports||{};
 const done=i=>!!reports[i];
 const nextOpen=CS.findIndex((_,i)=>!done(i));
 const completed=Object.keys(reports).filter(k=>reports[k]).length;
 $('over').innerHTML=`<h1>🗂️ Carpeta de expedientes</h1>
 <div class=card><b>Ruta de trabajo contable</b>
 <p class=mu>Un solo lugar para todos tus casos. Cada expediente deja un resultado y habilita el siguiente, como un flujo de trabajo real.</p>
 <div class=m><span>Expedientes entregados</span><b>${completed}/${CS.length}</b></div>
 <div class=bar><i style="width:${Math.round(100*completed/CS.length)}%"></i></div>
 <small class=mu>${completed===CS.length?'¡Ruta completada! Puedes reabrir cualquier expediente para repasar.':`Siguiente expediente: ${CS[nextOpen][0]}`}</small></div>
 ${CS.map((c,i)=>{
   const r=reports[i],unlocked=i===0||done(i-1),available=unlocked||done(i);
   const label=r?'↻ Reabrir expediente':unlocked?'▶ Iniciar expediente':'🔒 Completa el anterior';
   return `<div class="card ${available?'':'locked'}"><div class=row><b>${i+1}. ${c[0]}</b><span>${r?'⭐'.repeat(r.stars||0):unlocked?'🟢':'🔒'}</span></div>
   <small class=mu>${c[2]}</small>
   <div class=fb>${r?`📌 Entregado · ${r.correct}/${r.total} correctas`:`📦 Entregable: ${CASE_FLOW[i].deliverable}`}</div>
   <small class=mu><b>Conecta con:</b> ${CASE_FLOW[i].connect}</small>
   ${r?`<p><small class=mu><b>Siguiente acción:</b> ${CASE_FLOW[i].next}</small></p>`:''}
   <button class=sec ${available?'':'disabled'} onclick="${available?`cs(${i})`:`alert('Primero completa el expediente anterior para mantener la secuencia de trabajo.')`}">${label}</button></div>`;
 }).join('')}
 <button class=go onclick=practica()>← Volver al Centro de Práctica</button><button class=sec onclick=home()>🏠 Oficina 3D</button>`;
}
function cse(){const i=G.cs,st=G.err==0?3:G.err<=1?2:1,first=!S.cs[i],g=addXP(first?60+25*st:20),cn=first?25*st:8;S.coins+=cn;if(st>(S.cs[i]||0))S.cs[i]=st;mis(2);S.caseReports=S.caseReports||{};S.caseReports[i]={correct:Math.max(0,CS[i][3].length-G.err),total:CS[i][3].length,errors:G.err,stars:Math.max(st,(S.caseReports[i]||{}).stars||0),completedAt:new Date().toISOString(),deliverable:CASE_FLOW[i].deliverable,connect:CASE_FLOW[i].connect};save();LAST=()=>cs(i);show('over');const flow=CASE_FLOW[i],next=i+1<CS.length?i+1:null;
$('over').innerHTML=`<h1>📁 Expediente entregado</h1><div class=card><h2>${CS[i][0]}</h2><div class=big>${'⭐'.repeat(st)}</div><div class=m><span>Respuestas correctas</span><b>${Math.max(0,CS[i][3].length-G.err)}/${CS[i][3].length}</b></div><div class=m><span>Errores detectados</span><b>${G.err}</b></div><div class=m><span>XP profesional</span><b>+${g} XP</b></div><div class=m><span>Monedas</span><b>+${C(cn)}</b></div></div><div class=card><h2>📦 Entregable generado</h2><p>${flow.deliverable}</p><small class=mu>Área conectada</small><p><b>${flow.connect}</b></p><div class=bar><i style="width:${Math.round(100*(CS[i][3].length-G.err)/CS[i][3].length)}%"></i></div><small class=mu>Completitud de respuestas: ${Math.round(100*(CS[i][3].length-G.err)/CS[i][3].length)}%. La calidad del expediente también depende de revisar el sustento y los registros.</small></div><div class=card><h2>➡️ Siguiente acción profesional</h2><p>${flow.next}</p><small class=mu>Este paso evita que el caso termine en un cuestionario aislado. En esta versión queda como tarea guiada; la transferencia automática de asientos entre módulos será una fase posterior.</small></div>${next!==null?`<button class=go onclick=cs(${next})>Continuar al siguiente expediente →</button>`:`<button class=go onclick=caseHub()>Ver carpeta y revisar la ruta completa →</button>`}<button class=sec onclick=caseHub()>📑 Ver carpeta de expedientes</button><button class=sec onclick=practica()>Volver al Centro de Práctica</button><button class=sec onclick=home()>🏠 Volver a la Oficina 3D</button>`}

const JB=["Practicante o apoyo en caja y archivo contable","Auxiliar contable: comprobantes, registro de compras y ventas, conciliaciones simples","Asistente contable: IGV mensual, detracciones, planillas PLAME, libros electrónicos SIRE","Analista contable: hoja de trabajo, estados financieros mensuales, costos y Kardex","Contador junior: cierre contable, NIC 12, DJ Anual, supervisión de asistentes","Contador senior o contador general de pyme: planeamiento tributario, NIIF y control interno","Jefe de contabilidad: dirige el área, EEFF consolidados bajo NIIF, atención a auditoría y SUNAT","Contador Público Élite / Gerente de Finanzas, Impuestos o Auditor Senior"];
const UV=[
["Semestre 1","TIC · Contabilidad Básica I · Documentación Empresarial · Matemática · Lenguaje y Comunicación","Taller de Inducción a la Profesión · Matemática I · Métodos de Estudio · Filosofía y Ética","Ecuación contable y partida doble · Comprobantes de pago · Guías de remisión"],
["Semestre 2","Contabilidad Básica II · Derecho Empresarial · Informática Contable I · Metodología de la Investigación","Matemática II · Introducción a los Negocios · Introducción a la Economía · Emprendimiento","Ciclo contable · Libros vinculados a asuntos tributarios · Sociedades (LGS)"],
["Semestre 3","Contabilidad Intermedia I · Estadística · Microeconomía · Administración de Riesgo","Contabilidad Financiera I · NIIF I · Estadística Descriptiva · Economía Empresarial","Conciliación bancaria · Kardex (PEPS y Promedio) · Cobranza dudosa"],
["Semestre 4","Contabilidad Intermedia II · Matemática Financiera · Doctrinas Contables · Macroeconomía · Informática Contable II","Contabilidad Financiera II · NIIF II · Estadística Inferencial · Derecho Empresarial","NIC 16 PPE · NIC 38 Intangibles · Amortización de préstamos y VAN/TIR"],
["Semestre 5","Contabilidad Superior I · Costos I · Contabilidad Gubernamental · Finanzas · Derecho Tributario Material y Formal","Contabilidad Financiera III · Contabilidad Gerencial I · Matemática Financiera · Presupuesto y Contabilidad del Sector Público · Derecho Tributario","Costos por órdenes y procesos · SIAF y fases del gasto público · Código Tributario"],
["Semestre 6","Contabilidad Superior II · Costos II · Finanzas II · Procedimientos Tributarios · Renta de Personas Naturales y Regímenes Especiales","Contabilidad por Sectores Económicos · Contabilidad Gerencial II · Análisis Fundamental de Empresas · Prevención de Corrupción y Lavado de Activos","Costeo estándar y variaciones · Reclamación y Apelación · Renta de 4ta y 5ta"],
["Semestre 7","Auditoría Financiera I · Impuestos a los Ingresos y al Consumo · Mercado de Capitales · Contabilidad de Empresas Financieras I · Auditoría de Sistemas","Tributos Personales y Corporativos · NIIF Casuística · Contabilidad Gerencial III · Gestión de Riesgo Empresarial · Sistema de Información Empresarial","Planificación de auditoría (NIA 300/315) · Reparos LIR Art. 37 y 44 · Manual SBS"],
["Semestre 8","Auditoría Financiera II · Auditoría Tributaria · Planeamiento Tributario · Auditoría Gubernamental · Planeamiento y Control Financiero","Contabilidad de Instituciones Financieras · Finanzas · Contabilidad Tributaria · Dirección y Gerencia Contable Financiera","Auditoría de inventarios (NIC 2) · Bancarización · Elusión, evasión y Norma XVI"],
["Semestre 9","Peritaje Contable Judicial · Auditoría de Sistemas · Contabilidad de Costos Avanzados · Seminario de Tesis I","Auditoría Forense y Prevención de Fraude · Consolidación de Estados Financieros (NIIF 3 / NIIF 10) · Finanzas Internacionales","Dictamen pericial judicial · Goodwill (NIIF 3) · Eliminaciones de consolidación y cadena de custodia"],
["Semestre 10","Deontología y Ética Profesional (IFAC) · Fiscalidad Internacional y Precios de Transferencia · Seminario de Tesis II","Gerencia Estratégica y Creación de Valor (EVA) · Auditoría Integral · Trabajo de Investigación para Titulación CPC","Precios de transferencia (Art. 32-A LIR) · Amenazas IFAC · Cálculo del EVA y WACC corporativo"]];

norm();theme();navi();home();
