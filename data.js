// ================= ICONOS SVG VECTORIALES =================
const IC={
  coin:`<span class=ic title="Moneda Cuenta Rush"><svg viewBox="0 0 28 28"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff3a3"/><stop offset="35%" stop-color="#fbbf24"/><stop offset="72%" stop-color="#d97706"/><stop offset="100%" stop-color="#92400e"/></linearGradient><linearGradient id="coinEdge" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff7cc"/><stop offset="100%" stop-color="#a16207"/></linearGradient></defs><ellipse cx="14" cy="15" rx="11" ry="11" fill="#713f12" opacity=".65"/><circle cx="14" cy="13" r="11" fill="url(#cg)" stroke="url(#coinEdge)" stroke-width="2"/><circle cx="14" cy="13" r="8" fill="none" stroke="#92400e" stroke-width="1.1"/><path d="M14 6l1.7 4.1 4.4.3-3.4 2.8 1.1 4.2-3.8-2.3-3.8 2.3 1.1-4.2-3.4-2.8 4.4-.3z" fill="#fff1a8" stroke="#a16207" stroke-width=".6"/><circle cx="7" cy="7" r="1.4" fill="#fff8d6"/></svg></span>`,
  fire:`<span class=ic><svg viewBox="0 0 24 24"><path d="M12 2c1.5 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4.5 2.5-5.5 0 2 1.5 3 2.5 2-.5-2.5 0-5 0-6.5z" fill="#ff922b" stroke="#ffec99" stroke-width="1"/><path d="M12 10c1 1.8 2.5 2.8 2.5 5a2.5 2.5 0 0 1-5 0c0-1.5 1-2.8 2.5-5z" fill="#ffd43b"/></svg></span>`,
  shield:`<span class=ic><svg viewBox="0 0 24 24"><path d="M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" fill="#38bdf8" stroke="#bae6fd" stroke-width="1.5"/><path d="M12 4v16c3.2-1.1 6-5.4 6-10V6.3L12 4z" fill="#0284c7"/></svg></span>`,
  bolt:`<span class=ic><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#facc15" stroke="#fef08a" stroke-width="1.2"/></svg></span>`,
  swords:`<span class=ic><svg viewBox="0 0 24 24"><path d="M14.5 17.5L3 6V3h3l11.5 11.5-3 3zM13 19l6-6 2 2-6 6-2-2zM19 19l2 2-1.5 1.5-2-2L19 19z" fill="#f8fafc"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5l3 3z" fill="#cbd5e1"/></svg></span>`,
  star:`<span class=ic><svg viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9.5 16.8,14.2 18.5,21.5 12,17.5 5.5,21.5 7.2,14.2 2,9.5 9,9" fill="#fbbf24" stroke="#fef3c7" stroke-width="1.2"/></svg></span>`,
  coffee:`<span class=ic><svg viewBox="0 0 24 24"><path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zm13 1h2a2 2 0 0 1 0 4h-2V9z" fill="#d97706" stroke="#fde68a" stroke-width="1.5"/></svg></span>`
};
const C=n=>`${IC.coin} ${n}`;

function rankBadgeSVG(dv){
  const P=[
    ['#64748b','#334155','#94a3b8'],['#d97706','#78350f','#fcd34d'],['#cbd5e1','#475569','#f8fafc'],
    ['#f59e0b','#92400e','#fef08a'],['#06b6d4','#155e75','#a5f3fc'],['#10b981','#065f46','#6ee7b7'],
    ['#6366f1','#312e81','#c7d2fe'],['#a855f7','#581c87','#f3e8ff'],['#ec4899','#f59e0b','#00e5ff']
  ][Math.min(8,dv||0)];
  return `<span class=ic><svg viewBox="0 0 28 28"><polygon points="14,2 25,8 22,22 14,26 6,22 3,8" fill="${P[1]}" stroke="${P[2]}" stroke-width="2"/><polygon points="14,5 21,9.5 19,19.5 14,22.5 9,19.5 7,9.5" fill="${P[0]}"/><circle cx="14" cy="14" r="3.5" fill="${P[2]}"/></svg></span>`;
}

function skinArtSVG(i){
  const SKS=[
    `<svg viewBox="0 0 120 120"><defs><linearGradient id="bg0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2b1e66"/><stop offset="100%" stop-color="#0b0e24"/></linearGradient></defs><rect width="120" height="120" fill="url(#bg0)"/><circle cx="60" cy="60" r="46" fill="none" stroke="#7c5cff" stroke-width="2" stroke-opacity=".4"/><path d="M24 120 C24 84 96 84 96 120 Z" fill="#1e293b" stroke="#7c5cff" stroke-width="2"/><polygon points="50,86 60,115 70,86" fill="#f8fafc"/><polygon points="57,90 60,115 63,90" fill="#ffb020"/><circle cx="60" cy="54" r="22" fill="#f1c27d"/><path d="M36 48 C36 26 84 26 84 48 C76 38 44 38 36 48 Z" fill="#1e1b4b"/><rect x="42" y="48" width="36" height="9" rx="4" fill="#00e5ff" stroke="#fff" stroke-width="1.5"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#290d09"/><circle cx="60" cy="60" r="48" fill="#ff5a2c" fill-opacity=".18"/><path d="M25 120 C25 85 95 85 95 120 Z" fill="#7c2d12" stroke="#ffb703" stroke-width="2"/><polygon points="32,22 48,46 30,54" fill="#ea580c" stroke="#fed7aa" stroke-width="2"/><polygon points="88,22 72,46 90,54" fill="#ea580c" stroke="#fed7aa" stroke-width="2"/><polygon points="60,80 34,52 46,36 74,36 86,52" fill="#f97316"/><polygon points="60,80 42,58 60,64 78,58" fill="#fff7ed"/><circle cx="49" cy="53" r="4" fill="#fef08a"/><circle cx="71" cy="53" r="4" fill="#fef08a"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#041e2b"/><circle cx="60" cy="56" r="45" fill="#00b4d8" fill-opacity=".2"/><path d="M22 120 C25 84 95 84 98 120 Z" fill="#0369a1" stroke="#7dffd4" stroke-width="2"/><circle cx="60" cy="54" r="24" fill="#38bdf8" stroke="#bae6fd" stroke-width="2"/><polygon points="60,18 48,38 72,38" fill="#0284c7" stroke="#7dffd4" stroke-width="1.5"/><rect x="43" y="47" width="34" height="11" rx="5" fill="#082f49" stroke="#7dffd4" stroke-width="2"/><circle cx="52" cy="52" r="3" fill="#7dffd4"/><circle cx="68" cy="52" r="3" fill="#7dffd4"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#021206"/><text x="12" y="26" fill="#12c93f" opacity=".35" font-family="monospace" font-size="11">10 40 70 79</text><text x="64" y="108" fill="#12c93f" opacity=".35" font-family="monospace" font-size="11">NIIF 16</text><path d="M24 120 C24 85 96 85 96 120 Z" fill="#052e16" stroke="#22c55e" stroke-width="2"/><rect x="36" y="30" width="48" height="46" rx="10" fill="#14532d" stroke="#4ade80" stroke-width="2.5"/><rect x="42" y="44" width="36" height="12" rx="4" fill="#022c22"/><line x1="45" y1="50" x2="75" y2="50" stroke="#4ade80" stroke-width="4"/><line x1="60" y1="16" x2="60" y2="30" stroke="#4ade80" stroke-width="3"/><circle cx="60" cy="15" r="4" fill="#b6ff5c"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#1a102b"/><circle cx="60" cy="58" r="46" fill="#f59e0b" fill-opacity=".22"/><path d="M22 120 C26 82 94 82 98 120 Z" fill="#78350f" stroke="#fde047" stroke-width="2.5"/><path d="M35 18 L48 44 L38 48 Z M85 18 L72 44 L82 48 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/><polygon points="60,82 36,56 44,34 76,34 84,56" fill="#d97706" stroke="#fde047" stroke-width="2"/><polygon points="46,50 56,55 46,58" fill="#fef08a"/><polygon points="74,50 64,55 74,58" fill="#fef08a"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#111827"/><path d="M22 120 C25 84 95 84 98 120 Z" fill="#374151" stroke="#e5e7eb" stroke-width="2"/><polygon points="60,24 84,42 78,76 60,86 42,76 36,42" fill="#9ca3af" stroke="#f9fafb" stroke-width="2"/><polygon points="44,52 60,58 76,52 72,46 48,46" fill="#38bdf8"/><line x1="60" y1="24" x2="60" y2="86" stroke="#e5e7eb" stroke-width="2"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#090a1a"/><circle cx="60" cy="58" r="46" fill="#6c63ff" fill-opacity=".2"/><path d="M24 120 C24 84 96 84 96 120 Z" fill="#1e1b4b" stroke="#00e5ff" stroke-width="2"/><circle cx="60" cy="56" r="25" fill="#312e81" stroke="#818cf8" stroke-width="2"/><polygon points="34,32 50,42 38,52" fill="#4338ca"/><polygon points="86,32 70,42 82,52" fill="#4338ca"/><circle cx="49" cy="54" r="9" fill="#00e5ff"/><circle cx="71" cy="54" r="9" fill="#00e5ff"/><circle cx="49" cy="54" r="4" fill="#090a1a"/><circle cx="71" cy="54" r="4" fill="#090a1a"/><polygon points="56,62 64,62 60,71" fill="#ffb703"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#1c1204"/><circle cx="60" cy="60" r="48" fill="#f5c518" fill-opacity=".22"/><path d="M20 120 C24 82 96 82 100 120 Z" fill="#7f1d1d" stroke="#fde047" stroke-width="2.5"/><circle cx="60" cy="58" r="21" fill="#f1c27d"/><polygon points="36,42 42,20 54,32 60,16 66,32 78,20 84,42" fill="#facc15" stroke="#fef9c3" stroke-width="2"/><circle cx="60" cy="28" r="3" fill="#ef4444"/><rect x="44" y="52" width="32" height="8" rx="4" fill="#111" stroke="#facc15" stroke-width="1.5"/></svg>`,
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#171307"/><ellipse cx="60" cy="22" rx="22" ry="5" fill="none" stroke="#fde047" stroke-width="3"/><path d="M12 45 Q28 35 38 62 Q22 68 12 45 Z M108 45 Q92 35 82 62 Q98 68 108 45 Z" fill="#fef08a" stroke="#eab308" stroke-width="1.5"/><path d="M26 120 C26 84 94 84 94 120 Z" fill="#f8fafc" stroke="#eab308" stroke-width="2.5"/><circle cx="60" cy="56" r="20" fill="#fde68a"/><circle cx="52" cy="54" r="3" fill="#fff"/><circle cx="68" cy="54" r="3" fill="#fff"/></svg>`
  ];
  return SKS[i]||SKS[0];
}

const L=["Fundamentos","Debe y Haber","Plan Contable (PCGE)","IGV y Tributos","Estados Financieros","Costos","NIIF y Cierre","Nivel Experto"];
const T=["Aprendiz de Caja","Auxiliar Contable","Asistente Contable","Analista Contable","Contador Junior","Contador Senior","Jefe Contable","Contador Público Élite"];
const TITLES=["Sin título","Domador del Debe y Haber","Especialista PCGE","Terror de la SUNAT","Arquitecto NIIF","Lobo de las Finanzas","Auditor Forense","Socio Principal Big 4"];

// ================= RUTA PROFESIONAL UNIFICADA (EL ÚNICO CAMINO PASO A PASO) =================
// Cada etapa une: Curso Base + Semestre Universitario + Rama de Especialización + Caso Práctico
const STAGES=[
  {
    rk:0, name:"Etapa 1 · Aprendiz de Caja",
    real:"Practicante contable: identifica activos, pasivos, patrimonio y comprobantes de pago.",
    reqs:[
      {lbl:"Curso: Fundamentos Contables (70%)",t:0,br:0,desc:"Ecuación contable A = P + Patrimonio"},
      {lbl:"Universidad: Semestre 1 (70%)",t:100,br:10,desc:"Comprobantes de pago, facturas y boletas"}
    ],
    sim:"🗂️ Clasifica Cuentas"
  },
  {
    rk:1, name:"Etapa 2 · Auxiliar Contable",
    real:"Auxiliar en estudio o empresa: domina partida doble, códigos del PCGE y ciclo contable.",
    reqs:[
      {lbl:"Curso: Debe y Haber (70%)",t:1,br:0,desc:"Reglas de cargo y abono"},
      {lbl:"Curso: Plan Contable PCGE (70%)",t:2,br:0,desc:"Elementos 1 al 9 del PCGE"},
      {lbl:"Universidad: Semestres 2 y 3 (70%)",t:101,br:10,desc:"Libros contables, conciliación y Kardex"},
      {lbl:"Rama: Plan Contable Nivel 1 (70%)",t:80,br:8,desc:"Estructura de elementos del PCGE"}
    ],
    sim:"🧾 Libro Diario y 🧠 Memoria PCGE"
  },
  {
    rk:2, name:"Etapa 3 · Asistente Contable",
    real:"Asistente contable real: liquida IGV mensual, detracciones SPOT, planilla PLAME y SIRE.",
    reqs:[
      {lbl:"Curso: IGV y Tributos (70%)",t:3,br:0,desc:"Débito, crédito fiscal y retenciones"},
      {lbl:"Universidad: Semestre 4 (70%)",t:103,br:10,desc:"NIC 16 PPE, Intangibles y préstamos"},
      {lbl:"Rama: Tributaria Nivel 1 y 2 (70%)",t:40,br:4,desc:"RUS, RER, RMT e Impuesto a la Renta"},
      {lbl:"Rama: Legal y Planillas (70%)",t:70,br:7,desc:"EsSalud, ONP, CTS y Gratificaciones"}
    ],
    sim:"📊 Hoja de Trabajo (10 Columnas)"
  },
  {
    rk:3, name:"Etapa 4 · Analista Contable y de Costos",
    real:"Analista de costos y EEFF: elabora estados financieros, ratios, Kardex y punto de equilibrio.",
    reqs:[
      {lbl:"Curso: Estados Financieros (70%)",t:4,br:0,desc:"Liquidez, ROE, ROA y Capital de trabajo"},
      {lbl:"Curso: Costos (70%)",t:5,br:0,desc:"Costo primo, conversión y punto de equilibrio"},
      {lbl:"Universidad: Semestre 5 (70%)",t:104,br:10,desc:"Costos por órdenes/procesos y SIAF"},
      {lbl:"Rama: Costos Nivel 1 y 2 (70%)",t:10,br:1,desc:"Órdenes, procesos y unidades equivalentes"}
    ],
    sim:"💥 Cuadre Infernal"
  },
  {
    rk:4, name:"Etapa 5 · Contador Junior",
    real:"Contador Jr.: ejecuta ajustes de cierre, depreciación, cobranza dudosa, VAN/TIR y reclamos SUNAT.",
    reqs:[
      {lbl:"Curso: NIIF y Cierre (70%)",t:6,br:0,desc:"Depreciación, NIC 2 y devengado"},
      {lbl:"Universidad: Semestre 6 (70%)",t:105,br:10,desc:"Costeo estándar y Código Tributario"},
      {lbl:"Rama: Finanzas Nivel 1 y 2 (70%)",t:20,br:2,desc:"Valor del dinero en el tiempo y ratios"},
      {lbl:"Rama: NIIF Básicas y Clave (70%)",t:50,br:5,desc:"NIC 1, NIC 2, NIIF 15 y NIIF 16"}
    ],
    sim:"📂 Casos de Cierre y NIIF"
  },
  {
    rk:5, name:"Etapa 6 · Contador Senior / Tributarista",
    real:"Contador General de PYME o Especialista: domina NIC 12 (Impuesto Diferido), SBS y Gubernamental.",
    reqs:[
      {lbl:"Curso: Nivel Experto (70%)",t:7,br:0,desc:"Renta 29.5%, Factoring y NIC 12"},
      {lbl:"Universidad: Semestre 7 (70%)",t:106,br:10,desc:"Auditoría Financiera I, LIR y Banca"},
      {lbl:"Rama: Gubernamental SIAF (70%)",t:60,br:6,desc:"Fases del gasto público y PCG"},
      {lbl:"Rama: Sistema Financiero SBS (70%)",t:90,br:9,desc:"Catálogo SBS y cartera de créditos"}
    ],
    sim:"🔍 Auditoría de Escritorio"
  },
  {
    rk:6, name:"Etapa 7 · Jefe Contable / Auditor Financiero",
    real:"Jefe de Contabilidad o Auditor Senior: domina NIAs, dictámenes, control interno COSO y planeamiento.",
    reqs:[
      {lbl:"Universidad: Semestre 8 (70%)",t:107,br:10,desc:"Auditoría de inventarios, Norma XVI y elusión"},
      {lbl:"Rama: Auditoría Completa (70%)",t:32,br:3,desc:"Riesgo de auditoría, NIA 700/705 y fraude"}
    ],
    sim:"⚔️ Duelo 3D contra Fiscalizador SUNAT"
  },
  {
    rk:7, name:"Etapa 8 · Contador Público Élite (CPC / Gerente)",
    real:"Dominio integral de las 10 ramas profesionales: Contabilidad, Costos, Finanzas, Auditoría, Tributos, NIIF y SBS.",
    reqs:[
      {lbl:"Dominar todas las ramas en nivel Maestro",t:33,br:3,desc:"Excelencia técnica comprobada"}
    ],
    sim:"🏆 Torneo Cierre Mensual y Liga Retador"
  }
];

// ================= BANCO DE PREGUNTAS =================
const Q=[
[0,"Activo = Pasivo + ¿?",["Ingresos","Patrimonio","Gastos"],1,"Ecuación contable: A = P + Patrimonio."],
[0,"¿Cuál es un ACTIVO?",["Dinero en caja","Préstamo por pagar","Capital de los socios"],0,"Activo = bienes y derechos controlados por la entidad."],
[0,"Una factura por pagar a un proveedor es un…",["Activo","Pasivo","Ingreso"],1,"Es una obligación presente con terceros: pasivo."],
[0,"Activo S/100 y Pasivo S/40. ¿Patrimonio?",["S/40","S/140","S/60"],2,"Patrimonio neto = 100 − 40 = 60."],
[0,"Una venta rentable aumenta el…",["Patrimonio","Pasivo","Gasto"],0,"Los ingresos incrementan el resultado del ejercicio y el patrimonio."],
[0,"¿Qué estado financiero muestra activos, pasivos y patrimonio a una fecha?",["Estado de Situación Financiera","Estado de Resultados","Estado de Flujos de Efectivo"],0,"Antes llamado Balance General (NIC 1)."],
[1,"En partida doble, siempre…",["Debe = Haber","Debe > Haber","Haber = 0"],0,"Todo asiento contable debe cuadrar: Suma del Debe = Suma del Haber."],
[1,"Un ACTIVO aumenta por el…",["Haber","Debe","Ninguno"],1,"Cuentas de Activo y Gasto tienen naturaleza deudora (aumentan al Debe)."],
[1,"Venta al contado en efectivo:",["Debe Ventas / Haber Caja","Debe Caja / Haber Ventas","Debe Compras / Haber Caja"],1,"Ingresa efectivo (Debe 10) y nace el ingreso (Haber 70)."],
[1,"Un PASIVO aumenta por el…",["Debe","Haber","Saldo"],1,"Pasivo, Patrimonio e Ingresos tienen naturaleza acreedora (aumentan al Haber)."],
[1,"Pagas en efectivo a un proveedor:",["Debe Ctas por Pagar / Haber Caja","Debe Caja / Haber Ctas por Pagar","Debe Gasto / Haber Caja"],0,"Disminuye la obligación (Debe 42) y sale efectivo (Haber 10)."],
[1,"Al registrar un gasto en el Elemento 6 (excepto 60 y 69), el asiento de destino es:",["Debe Elemento 9 / Haber Cuenta 79","Debe Cuenta 79 / Haber Elemento 9","Debe Elemento 6 / Haber Caja"],0,"El gasto por naturaleza (clase 6) se transfiere a función (clase 9) con abono a la 79 (CICC)."],
[2,"Elemento 10 del PCGE:",["Existencias","Efectivo y equivalentes","Ventas"],1,"Cuenta 10 = Efectivo y equivalentes de efectivo."],
[2,"La cuenta 12 es…",["Ctas por cobrar comerciales","Ctas por pagar","Existencias"],0,"Cuenta 12 = Cuentas por cobrar comerciales – terceros."],
[2,"La cuenta 70 registra…",["Compras","Ventas","Tributos"],1,"Cuenta 70 = Ventas."],
[2,"La cuenta 40 corresponde a…",["Tributos, contraprestaciones y aportes por pagar","Capital","Caja"],0,"Incluye IGV (4011), Renta (4017), EsSalud (4031), ONP (4032)."],
[2,"La cuenta 60 registra…",["Ventas","Compras","Gastos de personal"],1,"60 = Compras; 62 = Gastos de personal; 63 = Servicios prestados por terceros."],
[2,"Cuando ingresa mercadería comprada al almacén, el asiento de destino es:",["Debe 20 Mercaderías / Haber 61 Variación de inventarios","Debe 61 / Haber 20","Debe 94 / Haber 79"],0,"Las compras de existencias (60) se destinan al almacén (20/24/25) contra la cuenta 61."],
[3,"Tasa del IGV en Perú (con IPM):",["16%","18%","19%"],1,"16% de IGV + 2% de Impuesto de Promoción Municipal = 18%."],
[3,"Venta de S/1,000 sin IGV. ¿IGV?",["S/180","S/18","S/118"],0,"1,000 × 18% = S/180."],
[3,"El crédito fiscal es…",["IGV de tus ventas","IGV de tus compras que descuentas","Renta anual"],1,"IGV pagado en adquisiciones que cumplen requisitos de los Arts. 18 y 19 de la Ley del IGV."],
[3,"Precio con IGV S/118. ¿Base imponible?",["S/100","S/98","S/106"],0,"118 ÷ 1.18 = S/100."],
[3,"IGV ventas 500 y compras 300. ¿Pagas?",["S/800","S/200","S/300"],1,"Débito fiscal (500) − Crédito fiscal (300) = S/200 por pagar."],
[3,"El régimen de Detracciones (SPOT) obliga al comprador a:",["Depositar un % en la cuenta del Banco de la Nación del proveedor","Retener y entregar a SUNAT en el PDT 621","Cobrar un % adicional al precio"],0,"El proveedor usa esos fondos detrados para pagar sus tributos."],
[4,"Liquidez corriente =",["Pasivo Cte / Activo Cte","Activo Cte / Pasivo Cte","Utilidad / Activo"],1,"Activo Corriente ÷ Pasivo Corriente mide solvencia de corto plazo."],
[4,"¿Qué estado muestra la utilidad del periodo?",["Estado de Resultados","Balance General","Flujo de caja"],0,"Muestra Ingresos menos Costos y Gastos devengados."],
[4,"AC S/200 y PC S/100. ¿Liquidez?",["0.5","2.0","3.0"],1,"200 ÷ 100 = 2.0."],
[4,"ROE =",["Utilidad neta / Patrimonio","Utilidad / Ventas","Activo / Pasivo"],0,"Return on Equity: rentabilidad financiera para los accionistas."],
[4,"Capital de trabajo =",["AC − PC","Activo − Pasivo","Ventas − Costos"],0,"Fondo de maniobra neto = Activo Corriente − Pasivo Corriente."],
[4,"En el Análisis DuPont, el ROE se descompone en:",["Margen neto × Rotación de activos × Multiplicador de capital","Liquidez × Solvencia","ROA ÷ Endeudamiento"],0,"Permite saber si la rentabilidad viene de margen, eficiencia o apalancamiento."],
[5,"Un costo FIJO…",["Cambia con la producción","No varía con el volumen dentro del rango relevante","Es siempre directo"],1,"Ejemplo: alquiler de fábrica o seguro anual de planta."],
[5,"En el punto de equilibrio…",["Ingresos = Costos totales","Utilidad máxima","Costos = 0"],0,"La utilidad operativa (EBIT) es exactamente cero."],
[5,"P=50, CV=30, CF=2,000. Unidades de equilibrio:",["100","40","67"],0,"CF ÷ (P − CV) = 2,000 ÷ 20 = 100 unidades."],
[5,"Margen de contribución unitario =",["Precio − Costo variable unitario","Precio − Costo fijo","Costo variable / Precio"],0,"Aporte de cada unidad vendida para cubrir costos fijos y generar utilidad."],
[5,"Costo primo =",["MPD + MOD","MOD + CIF","MPD + CIF"],0,"Materia Prima Directa + Mano de Obra Directa."],
[6,"Depreciación según NIC 16 es…",["Pérdida de mercado","Distribución sistemática del importe depreciable en su vida útil","Gasto en efectivo"],1,"No es valuación a mercado, sino asignación sistemática del costo."],
[6,"Tasa máx. tributaria de depreciación de vehículos (transporte terrestre):",["10%","20%","25%"],1,"Vehículos 20%, maquinaria general 10%, equipos de cómputo 25%, edificaciones 5%."],
[6,"La NIC 2 NO permite el método de costeo…",["PEPS (FIFO)","Promedio Ponderado","UEPS (LIFO)"],2,"El método UEPS (LIFO) está prohibido por la NIC 2."],
[6,"Principio del devengado:",["Registrar al cobrar","Reconocer los efectos cuando ocurren, independientemente del cobro o pago","Registrar a fin de año"],1,"Base fundamental de las NIIF y del Art. 57 de la LIR."],
[6,"La estimación de cobranza dudosa…",["Aumenta el activo","Reconoce el deterioro crediticio (Cuenta 68 contra Cuenta 19)","Es un ingreso"],1,"Disminuye el valor en libros de las cuentas por cobrar."],
[7,"Tasa de Impuesto a la Renta 3ra categoría (Régimen General):",["18%","29.5%","15%"],1,"29.5% sobre la Renta Neta Imponible."],
[7,"EVASIÓN tributaria es…",["Planificar legalmente","Ocultar bienes o ingresos o falsear datos para pagar menos (ilícito)","Pedir fraccionamiento"],1,"Constituye infracción o delito tributario (Defraudación Tributaria)."],
[7,"El Factoring sin recurso implica que…",["La entidad financiera asume el riesgo de no pago del deudor cedido","El proveedor sigue asumiendo el riesgo crediticio","Es un préstamo hipotecario"],0,"Transfiere sustancialmente los riesgos y beneficios de la factura (NIIF 9)."],
[7,"La NIC 12 trata…",["Inventarios","Impuesto a las ganancias (corriente y diferido)","Arrendamientos"],1,"Regula el reconocimiento de activos y pasivos por impuestos diferidos."],
[7,"Una multa de SUNAT contabilizada como gasto genera una diferencia…",["Permanente (Adición en la DJ Anual)","Temporaria deducible","Temporaria imponible"],0,"Art. 44 inc. c) de la LIR: las multas y sanciones del Sector Público no son deducibles nunca."]
];

const rn=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),sh=a=>a.sort(()=>Math.random()-.5),$s=x=>'S/'+x;
function mk(l,q,c,exp,f=x=>x){const s=Math.max(1,Math.round(c*.1)),w=new Set();while(w.size<2){const v=c+s*rn(-3,3);if(v>0&&v!=c)w.add(v)}const o=sh([c,...w]);return[l,q,o.map(f),o.indexOf(c),exp]}

const GEN=[
()=>{const b=rn(2,50)*100;return mk(3,`Venta de S/${b} sin IGV. ¿IGV (18%)?`,b*18/100,`${b} × 18% = ${b*18/100}.`,$s)},
()=>{const b=rn(2,50)*100,t=b/100*118;return mk(3,`Precio con IGV: S/${t}. ¿Base imponible?`,b,`${t} ÷ 1.18 = ${b}.`,$s)},
()=>{const v=rn(4,9)*100,c=rn(1,v/100-1)*100;return mk(3,`IGV ventas S/${v}, IGV compras S/${c}. ¿IGV a pagar?`,v-c,`${v} − ${c} = ${v-c}.`,$s)},
()=>{const a=rn(4,9)*100,p=rn(1,a/100-2)*100;return mk(4,`AC S/${a} y PC S/${p}. ¿Capital de trabajo?`,a-p,`AC − PC = ${a-p}.`,$s)},
()=>{const p=rn(1,5)*100,k=rn(1,4);return mk(4,`AC S/${p*k} y PC S/${p}. ¿Liquidez corriente?`,k,`${p*k} ÷ ${p} = ${k}.`,x=>x+'.0')},
()=>{const m=rn(2,5)*5,p=rn(5,9)*10,u=rn(4,40)*5;return mk(5,`P=S/${p}, CV=S/${p-m}, CF=S/${m*u}. ¿Unidades de equilibrio?`,u,`CF ÷ (P−CV) = ${m*u} ÷ ${m} = ${u}.`)},
()=>{const p=rn(5,9)*10,m=rn(2,5)*5;return mk(5,`Precio S/${p}, costo variable S/${p-m}. ¿Margen de contribución unitario?`,m,`${p} − ${p-m} = ${m}.`,$s)},
()=>{const c=rn(1,9)*20000,n=[2,4,5,10][rn(0,3)];return mk(6,`Equipo de S/${c}, vida útil ${n} años, sin valor residual (línea recta). ¿Depreciación anual?`,c/n,`${c} ÷ ${n} = ${c/n}.`,$s)},
()=>{const a=rn(8,30)*10,p=rn(2,a/10-2)*10;return mk(0,`Activo S/${a} y Pasivo S/${p}. ¿Patrimonio?`,a-p,`A − P = ${a-p}.`,$s)},
()=>{const d=rn(2,20)*500,m=rn(1,6);return mk(3,`Tributo impago S/${d}, TIM 1% mensual (dato) y ${m} meses de atraso. ¿Interés moratorio?`,d/100*m,`${d} × 1% × ${m} = ${d/100*m}.`,$s)},
()=>{const w=rn(15,60)*100;return mk(3,`Sueldo bruto S/${w}. ¿Descuento de ONP (13%)?`,w*13/100,`${w} × 13% = ${w*13/100}.`,$s)},
()=>{const w=rn(15,60)*100;return mk(3,`Sueldo bruto S/${w}. ¿Aporte EsSalud del empleador (9%)?`,w*9/100,`${w} × 9% = ${w*9/100}.`,$s)},
()=>{const v=rn(5,20)*1000,t=rn(1,4)*1000,c=rn(1,4)*500;return mk(6,`Precio estimado S/${v+t+c}, costos de terminación S/${t} y costos de venta S/${c}. ¿VNR (NIC 2)?`,v,`${v+t+c} − ${t} − ${c} = ${v}.`,$s)},
()=>{const c=rn(2,9)*100,e=rn(3,9),r=e+rn(1,3);return mk(12,`Compraste ${c} kg a S/${r} y el estándar era S/${e}. ¿Variación de precio desfavorable?`,(r-e)*c,`(${r} − ${e}) × ${c} = ${(r-e)*c}.`,$s)},
()=>{const a=rn(2,9)*1000,b=rn(2,9)*1000,c=rn(1,5)*1000;return mk(10,`MPD S/${a}, MOD S/${b}, CIF S/${c}. ¿Costo de conversión?`,b+c,`MOD + CIF = ${b+c}.`,$s)},
()=>{const c=rn(1,9)*1000;return mk(20,`S/${c} al 10% anual compuesto por 2 años. ¿Valor futuro?`,c*121/100,`${c} × 1.1² = ${c*121/100}.`,$s)},
()=>{const p=rn(2,9)*10000,r=rn(1,6)*5;return mk(21,`Patrimonio S/${p} y utilidad neta S/${p*r/100}. ¿ROE?`,r,`${p*r/100} ÷ ${p} = ${r}%.`,x=>x+'%')},
()=>{const pc=rn(1,5)*100,k=rn(1,3),i=rn(1,3)*100;return mk(21,`AC S/${pc*k+i}, inventarios S/${i}, PC S/${pc}. ¿Prueba ácida?`,k,`(${pc*k+i} − ${i}) ÷ ${pc} = ${k}.`,x=>x+'.0')},
()=>{const v=rn(2,20)*10000;return mk(41,`Ingresos netos del mes S/${v} en el RER. ¿Cuota de Renta (1.5%)?`,v*15/1000,`${v} × 1.5% = ${v*15/1000}.`,$s)},
()=>{const v=rn(2,20)*10000;return mk(42,`Ingresos netos del mes S/${v} en el RMT (hasta 15 UIT). ¿Pago a cuenta (1%)?`,v/100,`${v} × 1% = ${v/100}.`,$s)},
()=>{const f=rn(2,15)*1000;return mk(42,`Factura de servicios sujeta a detracción de 12% por importe total S/${f}. ¿Monto a detraer?`,Math.round(f*0.12),`${f} × 12% = ${Math.round(f*0.12)}.`,$s)},
()=>{const f=rn(1,10)*1000;return mk(42,`Un Agente de Retención paga una factura afecta de S/${f}. ¿Retención del IGV (3%)?`,f*3/100,`${f} × 3% = ${f*3/100}.`,$s)},
()=>{const u=rn(10,40)*1000,a=rn(1,5)*1000;return mk(43,`Utilidad contable S/${u} y adiciones por multas S/${a}. ¿Renta Neta Imponible?`,u+a,`${u} + ${a} = ${u+a}.`,$s)},
()=>{const d=rn(10,80)*1000;return mk(51,`Diferencia temporaria deducible de S/${d} (tasa IR 29.5%). ¿Activo por Impuesto Diferido (NIC 12)?`,Math.round(d*0.295),`${d} × 29.5% = ${Math.round(d*0.295)}.`,$s)}
];

const SK=[
  ["Ejecutivo Neón","🧑‍💼",0,"#090b16","#14182e","#7c5cff","#ffb020","r-com","Inicial · Corporativo"],
  ["Zorro Ígneo","🦊",150,"#1a0907","#2e120d","#ff5a2c","#ffc21a","r-rare","Raro · Agresivo"],
  ["Guardián Abisal","🐬",300,"#041821","#0b2c3d","#00b4d8","#7dffd4","r-rare","Raro · Tesorería"],
  ["Unidad Matrix","🤖",500,"#020d05","#082110","#12c93f","#b6ff5c","r-epic","Épico · Auditor TI"],
  ["Dragón Imperial","🐉",900,"#140d21","#24183b","#d97706","#fde047","r-leg","Legendario · Finanzas"],
  ["Centinela de Plata","🥈",9999,"#0e131a","#1b2430","#64748b","#e2e8f0","r-epic","Pase Nv. 10 · Épico"],
  ["Búho Nocturno","🦉",9999,"#070814","#14162e","#6c63ff","#00e5ff","r-leg","Pase Nv. 20 · Legendario"],
  ["Monarca CPC Élite","👑",9999,"#171003","#2b1f08","#eab308","#fef08a","r-myth","Pase Nv. 30 · Mítico"],
  ["Arcángel de Oro","🪶",9999,"#171406","#29220e","#f59e0b","#fef9c3","r-myth","Torneo · Mítico Exclusivo"]
];
const BN=["🐣 Novato","🐹 Auxiliar","🦊 Asistente","🐺 Analista","🦅 Contador Jr","🐉 Contador Sr","🦁 Jefe Contable","👹 Fiscalizador SUNAT"];
const MI=[["Acierta 12 preguntas (+120 XP)",12],["Gana 1 duelo 3D (+120 XP)",1],["Completa 2 simuladores (+120 XP)",2]];
const CL=[["Caja","Activo"],["Bancos","Activo"],["Mercaderías","Activo"],["Cuentas por cobrar","Activo"],["Maquinaria","Activo"],["Derecho de uso (NIIF 16)","Activo"],["Proveedores","Pasivo"],["IGV por pagar","Pasivo"],["Préstamo bancario","Pasivo"],["Sueldos por pagar","Pasivo"],["Pasivo por arrendamiento","Pasivo"],["Capital social","Patrimonio"],["Reservas","Patrimonio"],["Utilidades acumuladas","Patrimonio"],["Ventas","Ingreso"],["Intereses ganados","Ingreso"],["Alquiler pagado","Gasto"],["Sueldos del mes","Gasto"],["Depreciación","Gasto"],["Intereses pagados","Gasto"]];
const CT=["Activo","Pasivo","Patrimonio","Ingreso","Gasto"];
const AS=[["Vendes mercadería al contado","Debe Caja / Haber Ventas","Debe Ventas / Haber Caja","Debe Caja / Haber Compras"],["Compras mercadería a crédito","Debe Mercaderías / Haber Ctas por Pagar","Debe Ctas por Pagar / Haber Mercaderías","Debe Mercaderías / Haber Caja"],["Un cliente te paga su factura en efectivo","Debe Caja / Haber Ctas por Cobrar","Debe Ctas por Cobrar / Haber Caja","Debe Caja / Haber Ventas"],["Pagas el alquiler en efectivo","Debe Gasto alquiler / Haber Caja","Debe Caja / Haber Gasto alquiler","Debe Ctas por Pagar / Haber Caja"],["Los socios aportan capital en efectivo","Debe Caja / Haber Capital","Debe Capital / Haber Caja","Debe Caja / Haber Ventas"],["Un préstamo bancario entra a Bancos","Debe Bancos / Haber Préstamos por pagar","Debe Préstamos por pagar / Haber Bancos","Debe Bancos / Haber Capital"],["Registras la depreciación del mes","Debe Gasto depreciación / Haber Deprec. acumulada","Debe Deprec. acumulada / Haber Gasto depreciación","Debe Caja / Haber Deprec. acumulada"],["Destino de gastos administrativos (clase 6)","Debe 94 Gastos Admin. / Haber 79 CICC","Debe 79 CICC / Haber 94 Gastos Admin.","Debe 94 Gastos Admin. / Haber 10 Caja"],["Ingreso de mercadería comprada al almacén","Debe 20 Mercaderías / Haber 61 Variación de inv.","Debe 61 Variación / Haber 20 Mercaderías","Debe 20 Mercaderías / Haber 79 CICC"]];
const PC=[["10","Efectivo y equivalentes"],["12","Cuentas por cobrar comerciales"],["19","Estimación de cobranza dudosa"],["20","Mercaderías"],["32","Activos por derecho de uso"],["33","Propiedad, planta y equipo"],["39","Depreciación y amort. acumulada"],["40","Tributos por pagar"],["41","Remuneraciones por pagar"],["42","Cuentas por pagar comerciales"],["45","Obligaciones financieras"],["50","Capital"],["59","Resultados acumulados"],["60","Compras"],["62","Gastos de personal"],["68","Valuación y deterioro"],["69","Costo de ventas"],["70","Ventas"],["79","Cargas imputables a ctas de costos"]];

// Ramas con nivel de desbloqueo progresivo (según tu rango profesional)
const BR=[
  ["🧾 General",0,[]],
  ["🏭 Costos",3,["Costos básicos","Órdenes y procesos","Costeo y estándar","Gestión de costos"]],
  ["📈 Finanzas",4,["Matemática financiera","Ratios","Valoración","Estructura y riesgo"]],
  ["🔍 Auditoría",5,["Fundamentos","Riesgo y evidencia","Normas NIA","Control y fraude"]],
  ["🏛️ Tributaria",2,["Impuestos base","Regímenes y Renta","IGV y procedimientos","Planeamiento"]],
  ["📘 NIIF/NIC",4,["NIC básicas","NIIF clave","Deterioro y valor razonable","NIIF avanzadas"]],
  ["🇵🇪 Gubernamental",5,["Sistema contable público","Ejecución del gasto","PCG y control","NICSP y gestión"]],
  ["⚖️ Legal y Planilla",2,["Sociedades y laboral","Planilla","Gobierno societario","Casos"]],
  ["🗂️ Plan Contable",1,["Elementos del PCGE","Cuentas de activo y pasivo","Patrimonio, gastos e ingresos","Subcuentas y resultados"]],
  ["🏦 Banca SBS",5,["Estructura SBS","Activo y pasivo bancario","Patrimonio y resultados","Cuentas clave"]],
  ["🎓 Universidad",0,["Semestre 1","Semestre 2","Semestre 3","Semestre 4","Semestre 5","Semestre 6","Semestre 7","Semestre 8","Semestre 9","Semestre 10"]]
];

const B=[0,
[`El alquiler de la planta es un costo…|Fijo;Variable;Primo|No cambia con el volumen producido.
Materia prima directa + mano de obra directa =|Costo primo;Costo de conversión;Costo total|Costo primo = MPD + MOD.
MOD + CIF =|Costo de conversión;Costo primo;Gasto operativo|Costo de conversión = MOD + CIF.
La depreciación de la maquinaria de fábrica es…|CIF;Gasto de venta;Materia prima|Costo indirecto de fabricación.`,
`Fabricas muebles a pedido. ¿Qué costeo usas?|Por órdenes de producción;Por procesos;Estándar|Producción por lote o pedido específico.
El costeo por procesos se usa en producción…|Continua y homogénea;Única por cliente;Sin inventarios|Ej.: cemento, bebidas, acero.
La unidad equivalente sirve para…|Medir el avance de la producción en proceso;Calcular IGV;Fijar el precio|Convierte unidades semielaboradas en equivalentes terminadas.
Tasa CIF predeterminada =|CIF presupuestados / base presupuestada;CIF reales / ventas;MOD / CIF|Permite aplicar CIF durante el periodo.`,
`El costeo directo (variable) lleva al gasto del periodo los…|CIF fijos;CIF variables;Materiales|En el costeo variable los CIF fijos no se inventarían.
El ABC asigna costos indirectos según…|Actividades y generadores de costo (cost drivers);Ventas;Sueldos|Activity-Based Costing.
Variación de precio de materiales = (Pr real − Pr estándar) ×|Cantidad real;Cantidad estándar;Ventas|Mide el desvío en el precio de compra.
Eficiencia de MOD desfavorable significa que se usaron…|Más horas reales que las horas estándar permitidas;Menos horas;Las mismas|Mayor consumo de tiempo por unidad.`,
`Fórmula del lote económico (EOQ):|√(2DS/H);D×S/H;2D/S|D demanda anual, S costo por pedido, H costo de almacenamiento.
El apalancamiento operativo mide la sensibilidad de…|La UAII (EBIT) ante variaciones en las ventas;El IGV;El capital|GAO = Margen de contribución ÷ UAII.
Target costing parte de…|Precio de mercado competitivo − margen deseado;Costo + margen;Costo histórico|Costo objetivo desde el diseño del producto.
El Balanced Scorecard incluye finanzas, clientes, procesos internos y…|Aprendizaje y crecimiento;Legal;Tributos|Cuadro de Mando Integral de Kaplan y Norton.`],
[`VF de S/1,000 al 10% anual por 2 años (compuesto):|S/1,210;S/1,200;S/1,100|1,000 × 1.1² = 1,210.
Un sol hoy vale más que uno mañana por el…|Valor del dinero en el tiempo (costo de oportunidad);IGV;Encaje|Por su capacidad de generar intereses.
TEA a partir de una TNA de 12% con capitalización mensual (TEM 1%):|(1.01)^12 − 1 ≈ 12.68%;12.00%;14.00%|Tasa Efectiva Anual capitalizada.
En el sistema de amortización francés, la cuota periódica es…|Constante (interés decreciente y amortización creciente);Decreciente;Solo interés|Es el más usado en créditos bancarios.`,
`Prueba ácida =|(AC − Inventarios) / PC;AC / PC;Utilidad / Activo|Excluye existencias por ser menos líquidas.
ROA =|Utilidad neta / Activo total;Utilidad / Patrimonio;Ventas / Activo|Rentabilidad económica de los activos.
Ciclo de conversión de efectivo (CCE) =|EPI + PPC − PPP;EPI + PPC + PPP;PPC − EPI|Días inventario + días cobro − días pago a proveedores.
EBITDA mide…|Resultado operativo antes de intereses, impuestos, depreciación y amortización;Utilidad neta;Flujo de financiamiento|Indicador clave de generación operativa.`,
`Un VAN mayor a 0 indica que el proyecto…|Crea valor (supera el COK o WACC);Destruye valor;Es neutro|Incrementa la riqueza del accionista.
La TIR es la tasa que hace el VAN…|Igual a cero;Máximo;Negativo|Tasa Interna de Retorno.
El payback simple ignora…|El valor del dinero en el tiempo y los flujos posteriores al recupero;El monto invertido;El plazo|Por eso se prefiere el VAN.
CAPM: Ke = Rf + β ×|(Rm − Rf);Rm;Rf|Modelo de valoración de activos financieros.`,
`El WACC pondera el costo de la deuda (después de impuestos) y…|El costo del patrimonio (Ke);El IGV;Las ventas|WACC = Ke(E/V) + Kd(1−t)(D/V).
El escudo fiscal de la deuda existe porque los intereses…|Son deducibles del Impuesto a la Renta;Son ingresos;Son capital|Ahorro tributario = Intereses × Tasa IR.
Un beta mayor a 1 indica…|Mayor riesgo sistemático (sensibilidad) que el mercado;Menos riesgo;Activo libre de riesgo|Amplifica los movimientos del mercado.
La diversificación de Markowitz elimina el riesgo…|No sistemático (específico o idiosincrático);Sistemático (de mercado);Ambos|El riesgo macroeconómico no se elimina diversificando.`],
[`El objetivo de una auditoría de EEFF (NIA 200) es…|Obtener seguridad razonable y emitir una opinión sobre la razonabilidad de los EEFF;Calcular impuestos;Preparar los EEFF|El auditor opina; la gerencia prepara.
¿Quién es responsable de preparar y presentar los EEFF?|La gerencia / dirección de la entidad;El auditor externo;La SUNAT|Responsabilidad indelegable de la administración.
La opinión del auditor se sustenta en evidencia…|Suficiente (cantidad) y adecuada/apropiada (calidad);Verbal;Absoluta|NIA 500: Evidencia de auditoría.
Las pruebas de auditoría se dividen en pruebas de controles y…|Procedimientos sustantivos (de detalle y analíticos);Tributarias;Societarias|NIA 330.`,
`Riesgo de auditoría (RA) =|Riesgo Inherente (RI) × Riesgo de Control (RC) × Riesgo de Detección (RD);RI + RC;RD ÷ RI|El auditor controla el RD ajustando sus pruebas.
La materialidad de ejecución (performance materiality) es…|Menor que la materialidad global para reducir el riesgo de incorrecciones no detectadas;Mayor que la materialidad global;Igual al activo total|NIA 320.
Una confirmación bancaria o de clientes (NIA 505) es evidencia…|Externa y altamente confiable;Interna;De baja calidad|Obtenida directamente de un tercero independiente.
Una carta de salvaguarda o manifestación escrita (NIA 580) la firma…|La gerencia de la empresa auditada;El banco;La SUNAT|No sustituye otra evidencia que el auditor deba obtener.`,
`La NIA 700 regula…|La formación de la opinión y emisión del informe de auditoría sin modificaciones;El fraude;La materialidad|Estructura del dictamen.
Opinión con salvedades (NIA 705) cuando hay incorrecciones…|Materiales pero NO generalizadas;Materiales y generalizadas;Inmateriales|O por limitación al alcance material no generalizada.
Opinión adversa (desfavorable) cuando las incorrecciones son…|Materiales y generalizadas en los EEFF;Pequeñas;Por falta de evidencia|Los EEFF no presentan razonablemente la situación financiera.
La NIA 240 trata…|Las responsabilidades del auditor en relación con el fraude;Muestreo;Partes vinculadas|Considera el riesgo de elusión de controles por la gerencia.`,
`El triángulo del fraude de Cressey comprende: presión/incentivo, oportunidad y…|Racionalización;Planificación;Auditoría|Tres factores presentes en todo fraude.
Los 5 componentes de COSO son: Ambiente de control, Evaluación de riesgos, Actividades de control, Información/comunicación y…|Actividades de supervisión / monitoreo;Presupuesto;Tributación|Marco integrado de control interno.
La NIA 701 regula las…|Cuestiones Clave de la Auditoría (KAM) en entidades listadas;Planillas;Multas|Asuntos de mayor significatividad comunicados al gobierno corporativo.
La auditoría forense se orienta a…|Investigar fraudes y cuantificar daños con valor probatorio judicial;Declarar el IGV;Emitir bonos|Peritaje contable-financiero.`],
[`El tributo cuyo cumplimiento no origina una contraprestación directa a favor del contribuyente es el…|Impuesto;Tasa;Contribución|Norma II del Título Preliminar del Código Tributario.
SUNAT administra los tributos del…|Gobierno Nacional y conceptos encargados (EsSalud/ONP);Gobierno Municipal;Solo aranceles|Y tributos aduaneros.
El Impuesto de Alcabala y el Impuesto Predial son tributos…|Municipales;Del Gobierno Central;De la SBS|Regulados por la Ley de Tributación Municipal.
La UIT sirve como…|Valor de referencia para determinar bases imponibles, deducciones y multas;Moneda extranjera;Tasa de interés|Norma XV del Código Tributario.`,
`El Nuevo RUS permite emitir…|Boletas de venta y tickets (no da derecho a crédito fiscal);Facturas comerciales con IGV;Liquidaciones de compra|Para pequeños negocios de personas naturales.
En el Régimen Especial de Renta (RER), el pago mensual definitivo de Renta es…|1.5% de los ingresos netos mensuales;29.5% anual;1% mensual|Y su límite de ingresos/compras anuales es S/525,000.
En el Régimen MYPE Tributario (RMT), la tasa anual de Renta sobre las primeras 15 UIT de renta neta es…|10% (y 29.5% por el exceso);15%;29.5% sobre todo|Pagos a cuenta de 1% hasta 300 UIT de ingresos.
La renta de cuarta categoría grava…|El ejercicio individual de profesión, arte, ciencia u oficio (independiente);El trabajo en planilla;El alquiler de inmuebles|Con retención del 8% si el recibo supera S/1,500.`,
`Plazo de prescripción general de SUNAT (Art. 43 CT) cuando se presentó declaración:|4 años (6 años si no se declaró, 10 años en tributos retenidos/percibidos);2 años;15 años|Se computa desde el 1 de enero del año siguiente.
El sistema de detracciones (SPOT) consiste en…|Descuento de un % del importe de la operación para depositarlo en el Banco de la Nación del proveedor;Una multa;Un gasto deducible|Garantiza el pago de deudas tributarias del proveedor.
El SIRE (Sistema Integrado de Registros Electrónicos) comprende…|El RVIE (Ventas e Ingresos) y el RCE (Compras);El Libro Diario y Mayor;El PLAME|Genera propuesta automática a partir de los CPE.
Declarar cifras o datos falsos (Art. 178 num. 1 CT) se sanciona con multa de…|50% del tributo por pagar omitido;100% de la UIT;10% de las ventas|Con régimen de gradualidad de hasta 95% si se subsana voluntariamente.`,
`El principio de causalidad (Art. 37 LIR) exige que el gasto sea…|Necesario para producir la renta gravada o mantener su fuente (normal, razonable y fehaciente);Cualquier desembolso con boleta;Autorizado por el banco|Adicionalmente debe cumplir bancarización y comprobante válido.
La Norma XVI del Código Tributario faculta a SUNAT a…|Combatir la elusión tributaria recalificando actos artificiosos o impropios;Crear impuestos por decreto;Prorrogar balances|Exige anomalía y propósito de ahorro tributario.
Los gastos recreativos del personal son deducibles hasta el límite de…|0.5% de los ingresos netos con tope de 40 UIT;10% del capital;Sin límite|Art. 37 inciso ll) de la LIR.
La distribución de dividendos a personas naturales domiciliadas está sujeta a retención de…|5%;29.5%;8%|Renta de segunda categoría (tasa de 5%).`],
[`NIC 1 establece las bases para…|La presentación de los estados financieros de propósito general;Inventarios;Impuesto diferido|Juego completo de 4 estados financieros más notas.
NIC 2 exige medir los inventarios al…|Menor entre el costo y el Valor Neto Realizable (VNR);Valor razonable puro;Precio de reposición|Cualquier rebaja al VNR se reconoce como gasto en el periodo.
NIC 7 clasifica los flujos de efectivo en actividades de…|Operación, inversión y financiación;Compras, ventas y planilla;Corto y largo plazo|Permite evaluar la capacidad de generar efectivo.
NIC 16 permite medir Propiedades, Planta y Equipo tras el reconocimiento inicial usando…|El modelo del costo o el modelo de revaluación;Solo valor nominal;Solo VNR|El superávit de revaluación va al ORI (Cuenta 57).`,
`NIIF 15 reconoce los ingresos ordinarios aplicando un modelo de…|5 pasos basados en la transferencia del control de bienes o servicios;Cobro en efectivo;Emisión de factura|Identificar contrato, obligaciones, precio, asignar y reconocer.
NIIF 16 exige al arrendatario reconocer para casi todos los alquileres…|Un Activo por Derecho de Uso (Cuenta 32) y un Pasivo por Arrendamiento (Cuenta 45);Solo gasto de alquiler mensual;Un activo intangible|Excepto arrendamientos de corto plazo (≤12 meses) o bajo valor.
Según NIC 37, una provisión solo se reconoce cuando…|Existe obligación presente, es probable (>50%) la salida de recursos y puede estimarse fiablemente;Es un hecho posible (<50%);Es una pérdida futura deseada|Si es solo posible, se revela como pasivo contingente en notas.
NIC 8 establece que los errores materiales de periodos anteriores se corrigen…|Mediante reexpresión retroactiva (ajustando Resultados Acumulados - Cuenta 59);En el gasto del año actual;No se corrigen|Las estimaciones contables sí se cambian de forma prospectiva.`,
`NIC 36 define el Importe Recuperable de un activo como el…|Mayor entre su Valor Razonable menos costos de disposición y su Valor en Uso;Menor entre costo y VNR;Valor histórico|Si el valor en libros supera al recuperable, hay pérdida por deterioro.
Según NIC 38, los desembolsos en la fase de INVESTIGACIÓN de un intangible se reconocen…|Siempre como gasto del periodo en que se incurren;Como activo intangible;En el patrimonio|Solo la fase de Desarrollo se capitaliza si cumple los 6 criterios técnicos.
NIIF 13 establece la jerarquía del Valor Razonable en…|3 niveles (Nivel 1: precios cotizados en mercados activos; Nivel 2: observables; Nivel 3: no observables);5 niveles;2 niveles|Prioriza datos observables de mercado.
NIC 21 dispone que al cierre del balance las partidas monetarias en moneda extranjera se conviertan al…|Tipo de cambio de cierre (reconociendo diferencia de cambio en resultados - Ctas 676/776);Tipo de cambio histórico;Promedio ponderado|Las partidas no monetarias al costo histórico mantienen su TC de origen.`,
`NIIF 9 introduce para el deterioro de activos financieros el modelo de…|Pérdida Crediticia Esperada (ECL) en 3 etapas;Pérdida incurrida;Castigo directo|Reconoce provisiones preventivas desde el origen del crédito.
NIIF 10 establece que un inversor consolida una participada cuando tiene…|Control (poder sobre la participada, exposición a rendimientos variables y capacidad de influir en ellos);Más del 10% de acciones;Un contrato comercial|El control es la base única de consolidación.
La NIIF 18 (que reemplaza a la NIC 1 desde 2027) introduce en el Estado de Resultados…|Tres categorías obligatorias: Operación, Inversión y Financiación, y subtotales definidos;La eliminación de las notas;La base de caja|Mejora la comparabilidad del desempeño financiero.
NIIF 5 clasifica un activo no corriente como mantenido para la venta cuando…|Su importe se recuperará fundamentalmente a través de una venta altamente probable y deja de depreciarse;Se sigue usando en planta;Se da de baja por robo|Se mide al menor entre su valor en libros y su valor razonable menos costos de venta.`],
[`El ente rector del Sistema Nacional de Contabilidad en el Perú es la…|Dirección General de Contabilidad Pública (DGCP) del MEF;SUNAT;Contraloría|Decreto Legislativo N.° 1438.
El registro obligatorio de las operaciones del sector público se realiza en el…|SIAF-RP / SIAF-SP;SIRE;PLAME|Vincula presupuesto, tesorería, endeudamiento y contabilidad.
El marco contable internacional adoptado para el sector público peruano son las…|NICSP (Normas Internacionales de Contabilidad del Sector Público);NIIF para PYMES;US GAAP|Emitidas por el IPSASB y oficializadas por la DGCP.
La Cuenta General de la República es elaborada por la DGCP y auditada por…|La Contraloría General de la República;La SUNAT;El BCRP|Instrumento máximo de rendición de cuentas del Estado.`,
`Las fases de ejecución del gasto público son:|Certificación (CCP) → Compromiso → Devengado → Girado → Pagado;Compra → Venta → Cobro;Presupuesto → Cierre|El devengado reconoce la obligación de pago tras la conformidad del bien o servicio.
La fase de Devengado en el SIAF requiere previamente…|El Compromiso anual/mensual y la recepción conforme del bien o servicio;Haber girado el cheque;La auditoría anual|Afecta de forma definitiva el presupuesto institucional.
El Sistema Nacional de Control está encabezado por la…|Contraloría General de la República (Ley 27785) y los OCI;SUNAT;SBS|Realiza control previo, simultáneo y posterior.
Las contrataciones públicas se gestionan a través de la plataforma…|SEACE (supervisado por el OECE / OSCE);SIAF;SUNARP|Regulado por la Ley General de Contrataciones Públicas.`,
`En el Plan Contable Gubernamental (PCG), el Elemento 1 es Activo, 2 Pasivo, 3 Patrimonio y el Elemento 8 es…|Cuentas de Presupuesto;Costos de producción;Gastos administrativos|Permite la integración contable-presupuestaria.
En el PCG, la cuenta 1101 corresponde a…|Caja y Bancos;Cuentas por cobrar;Edificios y estructuras|1201 es Cuentas por Cobrar; 1501 Edificios y Estructuras.
En el PCG, la cuenta patrimonial 3101 se denomina…|Hacienda Nacional;Capital Social;Acciones de Tesorería|Representa el patrimonio neto de las entidades públicas.
La Cuenta Única del Tesoro Público (CUT) sirve para…|Centralizar la disponibilidad de los fondos públicos administrados por la DGTP;Pagar impuestos privados;Otorgar créditos hipotecarios|Optimiza la liquidez fiscal del Estado.`,
`La NICSP 17 regula…|Propiedades, Planta y Equipo en el sector público (incluyendo bienes de infraestructura y patrimonio histórico);Impuestos;Contratos de construcción|Equivalente público de la NIC 16.
El Presupuesto Institucional de Apertura (PIA) al incorporar modificaciones durante el año se convierte en el…|PIM (Presupuesto Institucional Modificado);POI;PAC|El PIM es el techo presupuestal vigente.
Invierte.pe es el sistema nacional de…|Programación Multianual y Gestión de Inversiones;Recaudación tributaria;Contabilidad privada|Reemplazó al antiguo SNIP.
Los Clasificadores Presupuestarios se dividen en…|Clasificadores de Ingresos (Genérica 1) y de Gastos (Genéricas 2.1 a 2.6);Debe y Haber;Activos y Pasivos|Ej.: 2.1 Personal, 2.3 Bienes y Servicios, 2.6 Adquisición de Activos No Financieros.`],
[`Según la Ley General de Sociedades (Ley 26887), la S.A.C. tiene…|De 2 a 20 accionistas y no tiene acciones inscritas en el Registro Público del Mercado de Valores;Más de 750 accionistas;Un solo titular|La S.A.A. es la sociedad abierta al mercado de capitales.
La E.I.R.L. (D.L. 21621) se constituye por…|Voluntad de una sola persona natural, con patrimonio distinto al de su titular;Dos personas jurídicas;Diez socios|Su órgano supremo es el Titular y la administración recae en la Gerencia.
La CTS (Compensación por Tiempo de Servicios) se deposita semestralmente en…|Los primeros 15 días de mayo y de noviembre;Julio y diciembre;Cada fin de mes|Equivale aproximadamente a un sueldo más 1/6 de gratificación por año.`,
`Las gratificaciones legales de Fiestas Patrias y Navidad se pagan en…|La primera quincena de julio y de diciembre (más bonificación extraordinaria de 9% de EsSalud);Mayo y noviembre;Marzo y octubre|Inafectas de aportes, contribuciones y descuentos (salvo 5ta categoría y mandato judicial).
La Asignación Familiar en el régimen privado equivale al…|10% de la Remuneración Mínima Vital (RMV) para trabajadores con hijos menores o en estudios superiores;9% del sueldo del trabajador;5% de la UIT|Tienen derecho quienes acrediten carga de hijos.
El sobretiempo (horas extras) se paga con una sobretasa legal mínima de…|25% para las 2 primeras horas y 35% para las horas siguientes;50% desde la primera hora;10% fijo|Salvo compensación con descanso físico acordado por escrito.`,
`La Reserva Legal en las Sociedades Anónimas (Art. 229 LGS) exige destinar…|Mínimo el 10% de la utilidad distribuible anual hasta alcanzar el 20% del capital social;50% de la utilidad;5% de las ventas|Sirve para cubrir pérdidas futuras.
La causal de disolución por pérdidas (Art. 407 LGS) se activa cuando las pérdidas reducen el patrimonio neto a…|Menos de la tercera parte del capital pagado, salvo que se reintegre o reduzca;Menos del 80%;Cero|Protege a los acreedores frente a la descapitalización.
Los libros societarios obligatorios en una S.A. incluyen…|Libro de Actas de Junta General, de Directorio y Matrícula de Acciones;Solo el Registro de Ventas;El Kardex|En la Matrícula de Acciones se inscriben las transferencias y gravámenes.`,
`La participación de los trabajadores en las utilidades (D.L. 892) aplica a empresas de 3ra categoría con más de 20 trabajadores con tasas de…|10% (pesqueras, telecomunicaciones e industriales), 8% (mineras y comercio/restaurantes) y 5% (otras);20% general;29.5%|50% se reparte en función a los días laborados y 50% en proporción a las remuneraciones.
El PLAME y el T-Registro son administrados por SUNAT y compartidos con…|El Ministerio de Trabajo (MTPE) y SUNAFIL;El BCRP;La SMV|Fiscalización sociolaboral electrónica.
La retención de 5ta categoría proyecta la remuneración anual (12 sueldos + 2 gratificaciones + otros) y deduce un tramo inafecto de…|7 UIT (aplicando luego tasas progresivas acumulativas de 8%, 14%, 17%, 20% y 30%);3 UIT;15 UIT|Art. 46 y 53 de la Ley del Impuesto a la Renta.`],
[`En el PCGE 2019 (vigente desde 2020), el Elemento 1 agrupa…|Activo disponible y exigible (cuentas 10 a 19);Activo realizable;Activo inmovilizado|Elemento 2: Activo realizable; Elemento 3: Activo inmovilizado.
El Elemento 8 del PCGE se denomina…|Saldos Intermediarios de Gestión y Determinación del Resultado del Ejercicio;Contabilidad analítica de explotación;Cuentas de orden|Utilizado para el cierre gradual de las cuentas de los elementos 6 y 7.
El Elemento 9 del PCGE sirve para…|La contabilidad analítica de explotación (costos de producción y gastos por función: 92, 94, 95, 97);Registrar impuestos;Cuentas de orden|Su contrapartida es la cuenta 79 (o 78).
El Elemento 0 del PCGE registra…|Cuentas de orden (deudoras y acreedoras de control como garantías, cartas fianza o bienes en custodia);Efectivo;Capital|No afectan el patrimonio ni resultados directamente.`,
`La Cuenta 16 del PCGE registra…|Cuentas por cobrar diversas – terceros (préstamos a terceros, reclamaciones, entregas a rendir a terceros);Cuentas por cobrar comerciales;Cuentas por cobrar al personal|La 14 es al personal, accionistas y directores.
La Cuenta 32 del PCGE incorpora bajo NIIF 16…|Activos por derecho de uso (arrendamientos financieros y operativos);Propiedad, planta y equipo;Inversiones inmobiliarias|31 es Propiedades de inversión; 33 Propiedad, planta y equipo.
La Cuenta 48 del PCGE registra…|Provisiones (litigios, desmantelamiento, garantías sobre ventas bajo NIC 37);Facturas por pagar;Tributos por pagar|Obligaciones de monto o vencimiento incierto.
La Cuenta 49 del PCGE corresponde a…|Pasivo diferido (Impuesto a la renta diferido pasivo e ingresos diferidos);Capital;Cuentas por pagar comerciales|El activo por impuesto diferido va en la cuenta 37.`,
`La Cuenta 57 del PCGE registra…|Excedente de revaluación (ganancias por revaluación de PPE e intangibles netas de impuesto diferido);Capital social;Resultados acumulados|Forma parte del Otro Resultado Integral (ORI).
La Cuenta 63 del PCGE agrupa…|Gastos de servicios prestados por terceros (transporte, asesoría, mantenimiento, alquileres, servicios básicos);Gastos de personal;Compras de mercaderías|62 es Personal; 64 Gastos por tributos; 65 Otros gastos de gestión.
La Cuenta 69 del PCGE registra…|Costo de ventas (con abono a la 20 Mercaderías o 21 Productos terminados al vender);Compras;Variación de inventarios|Representa el costo de los bienes entregados al cliente.
La Cuenta 75 del PCGE registra…|Otros ingresos de gestión (regalías, alquileres diversos, recupero de cuentas castigadas, enajenación de PPE);Ventas del giro;Ingresos financieros|70 es Ventas del giro principal; 77 Ingresos financieros.`,
`En el PCGE, el cuarto dígito (subcuenta o divisionaria) de las cuentas bancarias y créditos puede indicar…|La moneda o modalidad, mientras que en el Manual SBS el 3er dígito indica la moneda (1 MN, 2 ME);El año fiscal;El departamento|Permite el control multimoneda.
Subcuenta 40111 del PCGE:|IGV – Cuenta propia;IGV – Servicios de no domiciliados;Renta de 3ra categoría|40171 es Renta de tercera categoría; 4031 EsSalud; 4032 ONP.
Durante el cierre contable con el Elemento 8, la Cuenta 80 determina el…|Margen comercial (Ventas de mercaderías 701 menos compras netas de mercaderías 601 ± 611);Resultado antes de impuestos;Valor agregado|Luego siguen 81 Producción, 82 Valor agregado, 83 EBE, 84 Resultado de explotación, 85 Resultado antes de IR, 88 IR y 89 Resultado del ejercicio.
La Cuenta 79 del PCGE se denomina…|Cargas imputables a cuentas de costos y gastos;Ingresos diferidos;Descuentos obtenidos|Actúa como cuenta puente acreedora para trasladar los gastos del Elemento 6 al Elemento 9.`],
[`El Manual de Contabilidad para las Empresas del Sistema Financiero es normado por la…|Superintendencia de Banca, Seguros y AFP (SBS);SUNAT;SMV|Resolución SBS N.° 895-98 y modificatorias.
En el catálogo contable SBS, el tercer dígito de cada cuenta identifica la…|Moneda: 1 Moneda Nacional (S/), 2 Moneda Extranjera (US$), 3 Vacante/Reajustable;La sucursal;El tipo de cliente|Ej.: 1101 Caja, 1111 Caja MN, 1121 Caja ME.
En el catálogo SBS, las Clases son: 1 Activo, 2 Pasivo, 3 Patrimonio, 4 Gastos, 5 Ingresos, 6 Resultados, 7…|Contingentes (y 8 Cuentas de Orden);Costos de fábrica;Presupuesto público|La Clase 7 registra avales, cartas fianza, créditos aprobados no desembolsados y derivados.`,
`En el Manual SBS, el Rubro 11 es Disponible y comprende…|1101 Caja, 1102 BCRP, 1103 Bancos y otras empresas del sistema financiero, 1104 Canje;1401 Créditos vigentes;2101 Obligaciones a la vista|Representa la liquidez inmediata de la entidad financiera.
En el Manual SBS, el Rubro 14 corresponde a Créditos y se clasifica por situación en…|1401 Vigentes, 1403 Reestructurados, 1404 Refinanciados, 1405 Vencidos, 1406 En cobranza judicial;Solo vigentes y castigados;Cuentas 12 y 13|Y el rubro 1408 son Rendimientos devengados de créditos vigentes; 1409 Provisiones para créditos.
En el Manual SBS, el Rubro 21 registra…|Obligaciones con el público (2101 A la vista / cuentas corrientes, 2102 Ahorros, 2103 Plazo, 2104 CTS);Capital social;Créditos interbancarios|Es el principal pasivo de los bancos (captaciones).`,
`Según la Resolución SBS N.° 11356-2008, las 5 categorías de clasificación crediticia del deudor son:|Normal (0), Con Problemas Potenciales - CPP (1), Deficiente (2), Dudoso (3) y Pérdida (4);A, B y C;Solvente e Insolvente|Determinan las tasas de provisión genérica y específica (Rubro 1409 contra Gasto 4302).
En el Manual SBS, los intereses de créditos VENCIDOS o en cobranza judicial…|Se suspenden de resultados y se controlan en Cuentas de Orden (Rubro 8104 Rendimientos en suspenso);Se siguen reconociendo como ingreso en la 51;Se suman al capital|Por principio de prudencia regulatoria SBS (criterio de percibido para cartera deteriorada).
En el Manual SBS, el Rubro 51 registra…|Ingresos financieros (intereses por disponible, interbancarios, inversiones y cartera de créditos);Gastos financieros;Gastos de administración|El Rubro 41 registra Gastos Financieros (intereses pasivos por depósitos y adeudos).`,
`El requerimiento de Patrimonio Efectivo (Ratio de Capital Global según Ley General 26702 y Basilea) cubre riesgos de…|Crédito, de Mercado y Operacional;Solo inflación;Solo tributos|Garantiza la solvencia bancaria frente a pérdidas inesperadas.
El Encaje Bancario es regulado por el…|Banco Central de Reserva del Perú (BCRP) y se mantiene en Caja (1101) y depósitos en el BCRP (1102);Ministerio de Trabajo;INDECOPI|Instrumento de control monetario y liquidez.
Cuando un banco otorga y desembolsa un préstamo en cuenta corriente de su cliente (MN), el asiento SBS es:|Debe 1411 Créditos vigentes MN / Haber 2111 Obligaciones a la vista MN;Debe 2111 / Haber 1411;Debe 1212 / Haber 7012|Aumenta la colocación (Activo 14) y se abona en la cuenta corriente del cliente (Pasivo 21).`]
];

B[10]=[
`Una factura comercial electrónica sirve para…|Sustentar costo o gasto para Renta y ejercer el derecho al crédito fiscal del IGV;Solo consumidores finales sin RUC;Pagar la planilla|Entre sujetos con RUC que generan renta de 3ra categoría.
La boleta de venta se emite a…|Consumidores o usuarios finales (no otorga crédito fiscal del IGV, salvo casos especiales de costo/gasto hasta el límite legal);Proveedores mayoristas;Bancos|Art. 37 LIR: permite deducir hasta el 6% de los montos acreditados con factura (tope 200 UIT) si el emisor está en el Nuevo RUS.
Si un producto cuesta S/500 más IGV (18%), el precio total de venta es…|S/590;S/518;S/500|500 × 1.18 = 590.
La Guía de Remisión (Remitente y Transportista) sustenta…|El traslado lícito de bienes en el territorio nacional;El cobro en efectivo;La depreciación|Su omisión conlleva comiso de bienes o multa sustitutiva.`,
`El ciclo contable inicia con la captación de documentos fuente y su registro cronológico en el…|Libro Diario (y luego su mayorización en el Libro Mayor);Estado de Resultados;Balance General|Del Mayor se elabora el Balance de Comprobación y finalmente los EEFF.
Los contribuyentes con ingresos anuales hasta 300 UIT están obligados a llevar como mínimo (además del RVIE y RCE en el SIRE)…|Libro Diario de Formato Simplificado;Contabilidad completa con Inventarios y Costos;Ningún libro|De 300 a 500 UIT: Diario, Mayor, Inventarios y Balances. Más de 1,700 UIT: Contabilidad Completa.
En un Balance de Comprobación de 10 columnas, las cuentas de los Elementos 1 al 5 pasan a las columnas de…|Inventario (Activo y Pasivo/Patrimonio);Resultado por Naturaleza;Resultado por Función|El Elemento 7 y 9 pasan a Función, y el 6 y 7 a Naturaleza.`,
`En una conciliación bancaria, un cheque girado por la empresa que el proveedor aún no cobra en el banco es…|Un cheque en cartera / tránsito (se resta del saldo del extracto bancario para llegar al saldo según libros);Un cargo bancario no registrado;Un error del contador|Diferencia temporal que no requiere asiento de ajuste en la empresa.
Bajo el método de Promedio Ponderado en el Kardex (NIC 2), el costo unitario se recalcula…|Cada vez que ingresa una nueva compra a un costo distinto al saldo anterior;Con cada venta;Solo el 31 de diciembre|Las salidas por venta salen al costo promedio vigente en ese instante.
Según la NIC 2, los descuentos comerciales (rebajas en factura) y bonificaciones…|Se deducen del costo de adquisición de los inventarios;Se registran como ingreso financiero (77);No se consideran|El costo ingresa neto de descuentos comerciales.`,
`Según la NIC 16, el costo inicial de un elemento de Propiedad, Planta y Equipo incluye…|Precio de adquisición, aranceles, costos directamente atribuibles para ubicarlo en condiciones de operar y estimación de desmantelamiento;Costos de inauguración y publicidad;Pérdidas operativas iniciales|Se deprecia desde que está disponible para su uso.
En una tabla de amortización de un préstamo de S/10,000 al 10% anual, el interés del primer periodo se calcula sobre…|El saldo insoluto inicial del capital (S/10,000 × 10% = S/1,000);El total de intereses futuros;La cuota fija|La amortización del principal es Cuota − Interés.
Según la NIC 38, una marca comercial o lista de clientes generada INTERNAMENTE…|No se reconoce como activo intangible porque no puede distinguirse del costo de desarrollar el negocio en su conjunto;Se activa al valor de mercado;Se deprecia en 10 años|Solo se activan si se adquieren de forma separada o en una combinación de negocios.`,
`En el costeo por órdenes de producción, el documento que acumula MPD, MOD y CIF aplicados de cada lote es la…|Hoja de Costos por Orden de Trabajo;Guía de remisión;Nota de crédito|Base del inventario de productos en proceso (Cuenta 23).
En la Contabilidad Gubernamental, el clasificador 2.3 corresponde a…|Bienes y Servicios (CAS, alquileres, suministros, servicios básicos);Personal y Obligaciones Sociales (2.1);Adquisición de Activos No Financieros (2.6)|Estructura del gasto presupuestal.
Según el Código Tributario, la obligación tributaria nace cuando…|Se realiza el hecho previsto en la ley como generador de dicha obligación (hecho imponible);La SUNAT notifica una multa;El contador cierra el balance|Art. 2 del Código Tributario.`,
`Si el costo estándar de 1 unidad es 2 kg a S/5/kg (S/10) y para 100 unidades se usaron 220 kg a S/5/kg, la variación de eficiencia (cantidad) de materiales es…|S/100 Desfavorable ((220 − 200) × S/5);S/100 Favorable;S/0|Se consumieron 20 kg más de los 200 kg estándar permitidos para la producción real.
Contra una Resolución de Determinación o de Multa emitida por SUNAT procede interponer…|Recurso de Reclamación ante la propia SUNAT (plazo general: 20 días hábiles);Demanda penal directa;Consulta al MEF|Y contra la Resolución que resuelve la reclamación procede Apelación ante el Tribunal Fiscal (15 días hábiles).
Un trabajador en planilla gana S/4,000 mensuales sin hijos. En julio recibe su sueldo (S/4,000) más gratificación legal y bonificación extraordinaria (9%). ¿Cuánto recibe por gratificación + bonificación?|S/4,360 (S/4,000 de gratificación + S/360 de bonif. 9%);S/4,000;S/3,480|Ley 27735 y Ley 30334.`,
`En la Planificación Estratégica y control de gestión, el análisis FODA cruza fortalezas/debilidades internas con…|Oportunidades y Amenazas del entorno externo (analizadas con PESTEL y 5 fuerzas de Porter);El Libro Diario;El Kardex|Permite formular estrategias FO, FA, DO y DA.
En una Auditoría Financiera (NIA 315 / NIA 330), si el auditor detecta que no existe segregación de funciones en tesorería…|Evalúa un Riesgo de Control ALTO y diseña procedimientos sustantivos más extensos al cierre;Confía al 100% en los controles internos;Renuncia sin hacer pruebas|A mayor riesgo de incorrección material, menor riesgo de detección aceptable y mayor evidencia sustantiva.
En la determinación del Impuesto a la Renta de 3ra Categoría (Art. 37 inc. a LIR), la regla de subcapitalización limita la deducción de intereses netos a…|El 30% del EBITDA tributario del ejercicio anterior;El 100% del capital social;S/10,000 anuales|El exceso no deducible se puede arrastrar hasta por los 4 ejercicios siguientes.`,
`En una auditoría de inventarios bajo NIC 2 y NIA 501, las pruebas de corte (cut-off) de compras y ventas al 31 de diciembre sirven para verificar…|La integridad y ocurrencia en el periodo correcto (que entradas y salidas de fin de año estén en el ejercicio que devengan);La tasa del IGV;El sueldo del almacenero|Cruza las últimas y primeras Guías de Remisión, Partes de Ingreso y Facturas de diciembre y enero.
En la Auditoría Tributaria Preventiva, cuando se detecta una factura de compra pagada en efectivo por S/3,500 sin usar Medios de Pago (Ley de Bancarización ≥ S/2,000 o US$ 500)…|Se desconoce el crédito fiscal del IGV y el costo/gasto para el Impuesto a la Renta (reparo permanente);Es perfectamente deducible;Solo se paga S/10 de interés|Art. 8 de la Ley N.° 28194: los pagos sin medio de pago bancario no dan derecho a deducir gastos, costos ni créditos fiscales.
Según el Código de Ética Profesional del Contador Público (IFAC / JDCCPP), las 5 amenazas al cumplimiento de los principios fundamentales son: Interés propio, Autorrevisión, Abogacía, Familiaridad y…|Intimidación;Rentabilidad;Liquidez|El contador o auditor debe aplicar salvaguardas para eliminarlas o reducirlas a un nivel aceptable.`,
`En un Peritaje Contable Judicial, el documento técnico que emite el perito contable con sus conclusiones motivadas para el juez se denomina…|Informe o Dictamen Pericial Contable (no es una sentencia ni una resolución);Sentencia Judicial;Carta de Control Interno|El perito ilustra al juez sobre hechos contables o financieros controvertidos, pero no juzga.
Según la NIIF 3 (Combinaciones de Negocios), la Plusvalía Mercantil (Goodwill) surge cuando…|La contraprestación transferida supera el valor razonable neto de los activos identificables adquiridos y pasivos asumidos;El valor en libros es mayor al precio pagado;Se compra mercadería con descuento|El Goodwill no se amortiza (bajo NIIF completas), sino que se somete anualmente a prueba de deterioro (NIC 36).
En una Auditoría Forense, la cadena de custodia de la evidencia digital y documental es crítica para…|Garantizar la integridad, autenticidad y validez probatoria de la evidencia ante un proceso fiscal o judicial;Ahorrar papel en el archivo;Calcular la depreciación|Si se rompe la cadena de custodia, la prueba puede ser declarada nula en juicio.
Bajo la NIIF 10, al elaborar Estados Financieros Consolidados entre una matriz y su subsidiaria, las ventas y saldos recíprocos intragrupo…|Deben eliminarse en su totalidad (100%) junto con cualquier ganancia no realizada en inventarios;Se suman sin eliminar nada;Solo se elimina el 50%|Los EEFF consolidados muestran al grupo económico como si fuera una sola entidad frente a terceros.`,
`En el régimen de Precios de Transferencia (Art. 32-A de la LIR), las operaciones entre partes vinculadas o con paraísos fiscales deben pactarse…|A valor de mercado cumpliendo el Principio de Plena Competencia (Arm's Length);Al costo histórico que decida el gerente;Sin cobrar intereses nunca|Se sustenta mediante los Reportes Local, Maestro y País por País según umbrales de ingresos.
Para prevenir la Doble Imposición Internacional, el Perú aplica tratados basados principalmente en los modelos de…|La OCDE y la Decisión 578 de la Comunidad Andina (CAN);Solo el Manual SBS;El SIAF-RP|Permiten aplicar créditos por impuesto pagado en el exterior o gravar en fuente/residencia.
Según el Código de Ética de la IFAC, cuando un auditor externo audita estados financieros que él mismo preparó en el mismo periodo, incurre en una amenaza grave de…|Autorrevisión (Self-review threat) que compromete su independencia de criterio;Intimidación;Familiaridad|El auditor no puede ser juez y parte de la información financiera que dictamina.
El Valor Económico Agregado (EVA) de una corporación es positivo cuando…|El NOPAT (Utilidad Operativa después de impuestos) supera el costo financiero de todo el capital invertido (Capital × WACC);Las ventas suben aunque haya pérdida;El activo corriente es igual al pasivo|EVA = NOPAT − (Capital Invertido × WACC); mide la verdadera creación de riqueza.`
];

B.forEach((r,i)=>r&&r.forEach((lv,n)=>lv.trim().split('\n').forEach(s=>{const p=s.split('|');if(p.length>=3)Q.push([10*i+n,p[0],p[1].split(';'),0,p[2]])})));

const bm=r=>{let n=0;const k=BR[r][2].length;while(n<k&&(S.ms[10*r+n]||0)>=.7)n++;return n};
const BT=["Novato","Practicante","Especialista","Maestro","Gran Maestro"];
const tn=t=>t<10?L[t]:BR[t/10|0][0]+' · '+BR[t/10|0][2][t%10];

// ================= 5 ESPECIALIZACIONES CONTABLES (POST-10 SEMESTRES) =================
const SPECS=[
  {
    id:1, code:"TRIB", name:"🏛️ Tributarista & Fiscalista Senior",
    org:"SUNAT · Tribunal Fiscal · Fiscalidad Internacional",
    color:"#f43f5e",
    mechName:"⚡ Metodología: Presión Coactiva & Casilla SOL",
    mechDesc:"Preguntas con enfoque legal estricto (Código Tributario, LIR, IGV, Precios de Transferencia). Cada acierto otorga +35% Monedas y +25% XP por ahorro fiscal, pero fallar sube +12% extra el Riesgo de Fiscalización.",
    branches:[4,7,8],
    reqs:[
      {lbl:"Rama Tributaria Nivel 3 y 4 (75%)",t:42,br:4,desc:"SIRE, SPOT, Gradualidad, Causalidad y Norma XVI"},
      {lbl:"Rama Legal y Laboral (75%)",t:72,br:7,desc:"LGS, Utilidades D.L. 892 y 5ta Categoría"},
      {lbl:"Universidad: Semestres 9 y 10 (75%)",t:109,br:10,desc:"Precios de transferencia y fiscalidad internacional"}
    ],
    qExtra:[
      [43,"Según el Art. 44 inc. j) de la LIR, los gastos cuya documentación no cumpla los requisitos mínimos del Reglamento de Comprobantes de Pago…",["No son deducibles para determinar la Renta Neta de 3ra categoría (salvo excepciones del Art. 37)","Son deducibles si se pagan en efectivo","Se deducen al 50%"],0,"Falta de fehaciencia o incumplimiento formal invalida el gasto tributario."],
      [43,"En un procedimiento de Fiscalización Definitiva de SUNAT (Art. 62-A CT), el plazo legal de fiscalización es de…",["1 año (prorrogable excepcionalmente por 1 año más en casos complejos o precios de transferencia)","30 días hábiles","5 años sin límite"],0,"Computado desde que el deudor entrega la totalidad de la información requerida en el primer requerimiento."]
    ]
  },
  {
    id:2, code:"AUD", name:"🔍 Auditor Financiero & Forense (Big 4)",
    org:"IFAC · Normas Internacionales de Auditoría (NIAs) · COSO",
    color:"#3b82f6",
    mechName:"🔎 Metodología: Escepticismo & Muestreo NIA 530",
    mechDesc:"Tu ojo clínico descarta automáticamente 1 opción falsa en preguntas de 3 alternativas (Muestreo de Auditoría) y te da +30% XP por dictamen acertado, pero un error de juicio resta el doble de vida/HP.",
    branches:[3,5,8],
    reqs:[
      {lbl:"Rama Auditoría Nivel 3 y 4 (75%)",t:32,br:3,desc:"NIA 700/705, KAM (NIA 701), COSO y Fraude"},
      {lbl:"Simulador: Auditoría de Escritorio",t:33,br:3,desc:"Detección de reparos y dictámenes"},
      {lbl:"Universidad: Semestre 9 Peritaje y Forense (75%)",t:108,br:10,desc:"Peritaje judicial y cadena de custodia"}
    ],
    qExtra:[
      [33,"Según la NIA 705, si el auditor NO puede obtener evidencia suficiente y adecuada y concluye que los posibles efectos son materiales y generalizados, debe emitir…",["Una Abstención (Denegación) de Opinión","Una Opinión Adversa","Una Opinión Limpia con párrafo de énfasis"],0,"Limitación al alcance material y generalizada = Abstención de opinión."],
      [33,"El Párrafo de Énfasis en el dictamen del auditor (NIA 706) sirve para…",["Llamar la atención sobre un asunto adecuadamente revelado en las notas que es fundamental para entender los EEFF, sin modificar la opinión","Reemplazar una salvedad","Multar a la empresa"],0,"Por ejemplo, una incertidumbre material sobre Empresa en Marcha revelada en notas."]
    ]
  },
  {
    id:3, code:"NIIF", name:"📘 Arquitecto Corporativo NIIF & Banca SBS",
    org:"IASB · SMV · Superintendencia de Banca y Seguros (SBS)",
    color:"#06b6d4",
    mechName:"📐 Metodología: Valor Razonable & Juicio Técnico",
    mechDesc:"Cuentas con +6 segundos adicionales por pregunta para analizar normas complejas (NIIF 9, 15, 16, 18, NIC 12 y Manual SBS) y un bono progresivo de XP por racha de precisión normativa.",
    branches:[5,9,8],
    reqs:[
      {lbl:"Rama NIIF Avanzadas Nivel 3 y 4 (75%)",t:52,br:5,desc:"NIC 36 Deterioro, NIIF 9, NIIF 10 y NIIF 18"},
      {lbl:"Rama Banca SBS Completa (75%)",t:92,br:9,desc:"Clasificación del deudor, provisiones y Basilea"},
      {lbl:"Universidad: Consolidación NIIF (75%)",t:108,br:10,desc:"Goodwill (NIIF 3) y eliminaciones intragrupo"}
    ],
    qExtra:[
      [53,"Según la NIC 12, cuando el valor contable de un activo depreciable es MENOR que su base tributaria (por una depreciación contable más acelerada que la tributaria), se genera…",["Una diferencia temporaria deducible y un Activo por Impuesto Diferido (Cuenta 3712)","Un Pasivo por Impuesto Diferido (Cuenta 4912)","Una diferencia permanente"],0,"En el futuro pagarás menos Impuesto a la Renta cuando se revierta la diferencia."],
      [93,"En el Manual de Contabilidad SBS, cuando un banco otorga una Carta Fianza a favor de un cliente, el compromiso contingente se registra en…",["La Clase 7 (Rubro 71 Créditos Contingentes - Cartas Fianza otorgadas)","El Activo Disponible (Rubro 11)","El Patrimonio Efectivo (Clase 3)"],0,"Solo pasa al activo (14) si el cliente incumple y el banco se ve obligado a honrar la fianza."]
    ]
  },
  {
    id:4, code:"FIN", name:"📈 Estratega CFO · Finanzas & Costos Industriales",
    org:"Gerencia Financiera · Contraloría de Costos · Mercado de Capitales",
    color:"#eab308",
    mechName:"💹 Metodología: Alta Dirección & Creación de Valor (EVA)",
    mechDesc:"Prioriza casos cuantitativos (WACC, VAN, TIR, Costeo Estándar, Punto de Equilibrio y DuPont). Si respondes en menos de 8 segundos, recibes el DOBLE de Monedas (Bono de Directorio).",
    branches:[1,2,4],
    reqs:[
      {lbl:"Rama Costos Industriales Nivel 3 y 4 (75%)",t:12,br:1,desc:"Costeo ABC, Variaciones Estándar, EOQ y GAO"},
      {lbl:"Rama Finanzas Corporativas Nivel 3 y 4 (75%)",t:22,br:2,desc:"VAN, TIR, CAPM, WACC y Escudo Fiscal"},
      {lbl:"Universidad: Semestre 10 Gerencia y EVA (75%)",t:109,br:10,desc:"Valor Económico Agregado (EVA) y estrategia"}
    ],
    qExtra:[
      [23,"Una empresa tiene Deuda = 40% (costo Kd = 10% antes de impuestos, tasa IR = 29.5%) y Patrimonio = 60% (costo Ke = 15%). ¿Cuál es su WACC?",["11.82% (0.60×15% + 0.40×10%×(1−0.295))","13.00%","12.50%"],0,"Kd después de impuestos = 10% × 0.705 = 7.05%. WACC = 9.00% + 2.82% = 11.82%."],
      [13,"Una planta tiene Costos Fijos de S/ 60,000 y una Razón de Margen de Contribución (MC / Ventas) de 40%. ¿Cuál es su Punto de Equilibrio en Soles de venta?",["S/ 150,000 (60,000 ÷ 0.40)","S/ 24,000","S/ 100,000"],0,"PE en Soles = Costos Fijos ÷ Razón de Margen de Contribución."]
    ]
  },
  {
    id:5, code:"GOV", name:"🇵🇪 Especialista en Gestión Pública, SIAF & Contraloría",
    org:"MEF (DGCP / DGPP) · Contraloría General · SEACE / Invierte.pe",
    color:"#10b981",
    mechName:"🏛️ Metodología: Ejecución SIAF & Blindaje Presupuestal",
    mechDesc:"Dominio del Sector Público (SIAF-RP, Clasificadores, Cuenta General, NICSP y Control Gubernamental). Cada 3 aciertos seguidos recibes un Escudo de Control Previo o reducen tu Riesgo Fiscal en −25%.",
    branches:[6,3,8],
    reqs:[
      {lbl:"Rama Gubernamental Nivel 3 y 4 (75%)",t:62,br:6,desc:"Plan Contable Gubernamental, CUT, PIA/PIM y NICSP"},
      {lbl:"Caso Real: Ejecución del Gasto SIAF",t:61,br:6,desc:"Fases CCP, Compromiso, Devengado y Girado"},
      {lbl:"Rama Auditoría de Cumplimiento (75%)",t:31,br:3,desc:"Control gubernamental y evidencias"}
    ],
    qExtra:[
      [63,"En la integración contable y presupuestaria del SIAF-RP, ¿qué fase de la ejecución del gasto genera automáticamente el asiento patrimonial de Cuentas por Pagar (Elemento 2 del PCG)?",["La fase de Devengado","La Certificación de Crédito Presupuestario (CCP)","El PIA"],0,"El Devengado reconoce la obligación de pago patrimonial tras la conformidad del bien o servicio."],
      [63,"Cuando una entidad pública adquiere una ambulancia para un hospital público, ¿qué clasificador genérico de gasto utiliza en el SIAF?",["2.6 Adquisición de Activos No Financieros","2.3 Bienes y Servicios","2.1 Personal y Obligaciones Sociales"],0,"La Genérica 2.6 registra las inversiones en capital fijo público (maquinaria, vehículos, obras)."]
    ]
  }
];

SPECS.forEach(sp=>sp.qExtra.forEach(q=>Q.push(q)));
