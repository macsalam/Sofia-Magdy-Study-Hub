/* ============================================================
   Sofia Magdy Study Hub — shared hub layer
   Themes (7, each light + dark), top bar controls, Build Your Plan
   calendar, My Notes with a drawing pad.
   Loaded by /index.html, /science/index.html and /maths/index.html.
   ============================================================ */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parseYmd=s=>{const [y,m,d]=String(s).split('-').map(Number);return new Date(y,m-1,d);};
const today=()=>ymd(new Date());
const fmtDay=s=>parseYmd(s).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
const CHEV='<svg class="chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const read=(k,fb)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch(e){return fb;}};
const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}};

/* ================= 1 · THEMES ================= */
/* Each mode is a compact palette; buildVars() expands it into every
   custom property the three hubs use, so no hub CSS has to change. */
const THEMES=[
 {id:'galaxy',name:'Galaxy',desc:'Deep space, nebulae and starlight — the Science Hub look',
  sw:['#262143','#9B7BFF','#5FD4F4','#FFD36E','#FF6FB5'],
  chapterTints:true,
  modes:{
   dark:{bg:'#262143',panel:'#1D1937',panel2:'#2F2852',panel3:'#3A3266',ink:'#F2EFFF',ink2:'#B6ADDA',ink3:'#8C83B8',line:'#4B4279',
     hi:'rgba(195,166,255,.12)',lo:'rgba(8,5,25,.55)',acc:'#9B7BFF',acc2:'#5FD4F4',glow1:'#7B5CFF',glow2:'#FF6FB5',onAcc:'#18132F',
     good:'#5DD39E',bad:'#FF7A8E',kick:'#C3A6FF',focus:'#5FD4F4',sun:'#FFD36E',sky:'#7DB7FF',leaf:'#5DD39E',earth:'#D9AE80',stage:'#221D40'},
   light:{bg:'#EDE9F8',panel:'#F8F6FD',panel2:'#FFFFFF',panel3:'#E7E0F6',ink:'#231E42',ink2:'#5B5288',ink3:'#8C83B8',line:'#D5CCEE',
     hi:'#FFFFFF',lo:'rgba(70,56,130,.22)',acc:'#6A4BD6',acc2:'#1D86AD',glow1:'#C3B0FF',glow2:'#FFC2E0',onAcc:'#18132F',
     good:'#1F8A5B',bad:'#C2344B',kick:'#6A4BD6',focus:'#1D86AD',sun:'#C98A12',sky:'#2F6FBF',leaf:'#2F8A6A',earth:'#A87A48',stage:'#F3F0FC'}}},

 {id:'cherry',name:'Cherry Blossom',desc:'Warm winter blush, rose and sage — the Maths Hub look',
  sw:['#E6DFE0','#B78993','#D0BDBF','#779073','#3A2522'],
  modes:{
   light:{bg:'#E6DFE0',panel:'#EFEDEE',panel2:'#E6DFE0',panel3:'#D0BDBF',ink:'#3A2522',ink2:'#615756',ink3:'#B2A8A7',line:'#cfc6c7',
     hi:'#FFFFFF',lo:'rgba(97,72,68,.30)',acc:'#B78993',acc2:'#D0BDBF',glow1:'#D0BDBF',glow2:'#779073',onAcc:'#FFFFFF',
     good:'#779073',bad:'#B78993',kick:'#8F7C78',focus:'#B78993',sun:'#D0BDBF',sky:'#B2A8A7',leaf:'#779073',earth:'#8F7C78',stage:'#F4F1F2'},
   dark:{bg:'#2A1E1D',panel:'#352826',panel2:'#3F302D',panel3:'#4A3936',ink:'#EFEDEE',ink2:'#D0BDBF',ink3:'#9C8D8B',line:'#4E3B38',
     hi:'rgba(239,237,238,.08)',lo:'rgba(0,0,0,.55)',acc:'#D79AA6',acc2:'#C5B2B4',glow1:'#6B4A4E',glow2:'#44533F',onAcc:'#2A1E1D',
     good:'#93AE8E',bad:'#D79AA6',kick:'#D79AA6',focus:'#D79AA6',sun:'#E0C9A6',sky:'#B2A8A7',leaf:'#93AE8E',earth:'#B99A90',stage:'#312422'}}},

 {id:'woodland',name:'Woodland Leaf',desc:'Oak, pine and forest floor',
  sw:['#dbd1bc','#688d57','#29594d','#977359','#61402f'],
  modes:{
   light:{bg:'#dbd1bc',panel:'#e3dac7',panel2:'#d2c6ad',panel3:'#c9bb9e',ink:'#1b3d2c',ink2:'#61402f',ink3:'#977359',line:'#c9bb9e',
     hi:'rgba(255,250,240,.85)',lo:'rgba(97,64,47,.32)',acc:'#688d57',acc2:'#977359',glow1:'#a8bd8e',glow2:'#c9a47f',onAcc:'#ffffff',
     good:'#508070',bad:'#8c4a2f',kick:'#977359',focus:'#688d57',sun:'#c9a47f',sky:'#769f91',leaf:'#688d57',earth:'#977359',stage:'#ebe4d6'},
   dark:{bg:'#031F11',panel:'#0a2a1a',panel2:'#133825',panel3:'#1b4430',ink:'#dbd1bc',ink2:'#769f91',ink3:'#977359',line:'#1b4430',
     hi:'rgba(118,159,145,.16)',lo:'rgba(0,6,3,.70)',acc:'#688d57',acc2:'#b89474',glow1:'#1d5a3c',glow2:'#5c4330',onAcc:'#031F11',
     good:'#769f91',bad:'#c08457',kick:'#b89474',focus:'#688d57',sun:'#c9a47f',sky:'#769f91',leaf:'#688d57',earth:'#b89474',stage:'#0d3020'}}},

 {id:'mythical',name:'Mythical',desc:'Laurels, shields and midnight blue',
  sw:['#dcd3ca','#d0ac72','#192d45','#906b41','#769aba'],
  modes:{
   light:{bg:'#dcd3ca',panel:'#e5ddd5',panel2:'#d4c9bd',panel3:'#cbbfb1',ink:'#192d45',ink2:'#45301d',ink3:'#948371',line:'#cbbfb1',
     hi:'rgba(255,250,244,.88)',lo:'rgba(69,48,29,.30)',acc:'#906b41',acc2:'#4f7699',glow1:'#d0ac72',glow2:'#769aba',onAcc:'#ffffff',
     good:'#4f7699',bad:'#8c4a3a',kick:'#906b41',focus:'#d0ac72',sun:'#d0ac72',sky:'#769aba',leaf:'#4f7699',earth:'#906b41',stage:'#ece6df'},
   dark:{bg:'#0c1421',panel:'#142238',panel2:'#192d45',panel3:'#22385a',ink:'#dcd3ca',ink2:'#d0ac72',ink3:'#948371',line:'#22385a',
     hi:'rgba(118,154,186,.12)',lo:'rgba(0,0,0,.60)',acc:'#d0ac72',acc2:'#769aba',glow1:'#2d4b65',glow2:'#6b5027',onAcc:'#0c1421',
     good:'#769aba',bad:'#b4724d',kick:'#d0ac72',focus:'#d0ac72',sun:'#d0ac72',sky:'#769aba',leaf:'#769aba',earth:'#906b41',stage:'#172840'}}},

 {id:'spiderman',name:'Spiderman',desc:'Web red, suit blue and city night',
  sw:['#D7263D','#1B4FA0','#F2F4F8','#14203A','#3C7BE0'],
  modes:{
   light:{bg:'#F2F4F8',panel:'#FFFFFF',panel2:'#E7ECF4',panel3:'#D8E0EC',ink:'#14203A',ink2:'#43536F',ink3:'#8694AD',line:'#CBD6E6',
     hi:'#FFFFFF',lo:'rgba(20,32,58,.22)',acc:'#D7263D',acc2:'#1B4FA0',glow1:'#FFB3BD',glow2:'#A8C4F0',onAcc:'#FFFFFF',
     good:'#1B7F4B',bad:'#D7263D',kick:'#D7263D',focus:'#1B4FA0',sun:'#E8A33D',sky:'#1B4FA0',leaf:'#1B7F4B',earth:'#8694AD',stage:'#F7F9FC'},
   dark:{bg:'#0B0F1A',panel:'#131A2B',panel2:'#1B2438',panel3:'#243049',ink:'#F2F4F8',ink2:'#AEBBD2',ink3:'#76859F',line:'#2A3651',
     hi:'rgba(174,187,210,.10)',lo:'rgba(0,0,0,.65)',acc:'#E23636',acc2:'#3C7BE0',glow1:'#6E1522',glow2:'#17315F',onAcc:'#FFFFFF',
     good:'#44C486',bad:'#E23636',kick:'#E23636',focus:'#3C7BE0',sun:'#F0B64A',sky:'#3C7BE0',leaf:'#44C486',earth:'#AEBBD2',stage:'#161E31'}}},

 {id:'lemonshark',name:'Lemon Shark',desc:'Lemon yellow, warm sand and reef water',
  sw:['#F2D14E','#1D7A8C','#F6F3E4','#0E3B4A','#8A9A9E'],
  modes:{
   light:{bg:'#F6F3E4',panel:'#FFFDF2',panel2:'#ECE6CF',panel3:'#DED6B6',ink:'#0E3B4A',ink2:'#3C6B78',ink3:'#8A9A9E',line:'#DCD4B6',
     hi:'#FFFFFF',lo:'rgba(14,59,74,.20)',acc:'#C9A41C',acc2:'#1D7A8C',glow1:'#F6E39A',glow2:'#9ED3DD',onAcc:'#0E3B4A',
     good:'#1D7A8C',bad:'#C9603A',kick:'#B8921A',focus:'#1D7A8C',sun:'#E0BC2B',sky:'#1D7A8C',leaf:'#4E8F6A',earth:'#A8894B',stage:'#FFFEF7'},
   dark:{bg:'#06222C',panel:'#0B2E3A',panel2:'#103A49',panel3:'#15485A',ink:'#F3F7F6',ink2:'#9FC6CE',ink3:'#6E939C',line:'#17505F',
     hi:'rgba(159,198,206,.12)',lo:'rgba(0,0,0,.60)',acc:'#F2D14E',acc2:'#4FBBD1',glow1:'#0E4E5F',glow2:'#5B4D12',onAcc:'#06222C',
     good:'#4FBBD1',bad:'#E8894F',kick:'#F2D14E',focus:'#4FBBD1',sun:'#F2D14E',sky:'#4FBBD1',leaf:'#7FC79A',earth:'#D9BE7A',stage:'#0A3140'}}},

 {id:'rainywinter',name:'Lonely Rainy Winter',desc:'Blue dusk, snow and one red light',
  sw:['#0B1522','#1C2B3D','#9FB3C8','#C2413C','#D8C7A0'],
  modes:{
   dark:{bg:'#0B1522',panel:'#14202F',panel2:'#1C2B3D',panel3:'#26384C',ink:'#D9E4EF',ink2:'#9FB3C8',ink3:'#6B8099',line:'#27384B',
     hi:'rgba(159,179,200,.10)',lo:'rgba(0,0,0,.65)',acc:'#8FB0CE',acc2:'#C2413C',glow1:'#1B304E',glow2:'#3A1E22',onAcc:'#0B1522',
     good:'#8FB0CE',bad:'#C2413C',kick:'#C2413C',focus:'#8FB0CE',sun:'#D8C7A0',sky:'#8FB0CE',leaf:'#7E96A8',earth:'#A08E72',stage:'#101B29'},
   light:{bg:'#D7E0E9',panel:'#E8EEF5',panel2:'#C9D6E2',panel3:'#B6C7D6',ink:'#16263A',ink2:'#3F566E',ink3:'#7489A0',line:'#BCCBD9',
     hi:'#FFFFFF',lo:'rgba(22,38,58,.22)',acc:'#3F6D96',acc2:'#B23B36',glow1:'#AFC4D6',glow2:'#E3C4C0',onAcc:'#FFFFFF',
     good:'#3F6D96',bad:'#B23B36',kick:'#B23B36',focus:'#3F6D96',sun:'#B59455',sky:'#3F6D96',leaf:'#4E7B74',earth:'#8A7A5E',stage:'#F0F4F8'}}}
];

const mix=(c,p,on)=>`color-mix(in srgb,${c} ${p}%,${on})`;
function buildVars(m){
 const raise=`7px 7px 16px ${m.lo},-7px -7px 16px ${m.hi}`;
 const raiseS=`4px 4px 9px ${m.lo},-4px -4px 9px ${m.hi}`;
 const press=`inset 4px 4px 9px ${m.lo},inset -4px -4px 9px ${m.hi}`;
 return {
  /* hub tokens */
  '--bg':m.bg,'--panel':m.panel,'--panel2':m.panel2,'--panel3':m.panel3,
  '--ink':m.ink,'--ink2':m.ink2,'--ink3':m.ink3,'--line':m.line,
  '--hi':m.hi,'--lo':m.lo,'--raise':raise,'--raise-s':raiseS,'--press':press,
  '--pri':m.ink,'--pri-ink':m.panel,'--kick':m.kick,'--focus':m.focus,'--stage':m.stage,
  '--bar':`linear-gradient(90deg,${m.acc},${m.acc2})`,
  '--head':`linear-gradient(135deg,${m.acc2},${m.acc})`,'--head-ink':m.onAcc,'--head-sub':m.sun,
  '--good':m.good,'--bad':m.bad,
  '--good-soft':mix(m.good,20,m.panel),'--bad-soft':mix(m.bad,20,m.panel),
  /* shared accents */
  '--acc':m.acc,'--acc2':m.acc2,'--on-acc':m.onAcc,'--glow1':m.glow1,'--glow2':m.glow2,
  '--acc-soft':mix(m.acc,18,m.panel2),'--acc2-soft':mix(m.acc2,16,m.panel2),
  /* Science Hub vocabulary */
  '--night':m.bg,'--paper':m.panel,'--surface':m.panel2,'--surface2':m.panel3,'--muted':m.ink2,
  '--hdr':mix(m.panel2,94,'transparent'),
  '--leaf':m.leaf,'--leaf-soft':mix(m.leaf,18,m.panel2),
  '--sun':m.sun,'--sun-fill':m.sun,'--sun-soft':mix(m.sun,18,m.panel2),
  '--sky':m.sky,'--sky-soft':mix(m.sky,18,m.panel2),
  '--earth':m.earth,'--earth-soft':mix(m.earth,18,m.panel2),
  '--space':m.bg,'--on-space':m.ink,
  '--ind-purple':m.acc,'--ind-red':m.bad,'--ind-yellow':m.sun,
  '--nuc':m.acc,'--on-nuc':m.onAcc,'--elec':m.acc2,'--on-elec':m.onAcc,
  '--na':m.acc,'--cl':m.good,'--carbon':m.ink3,'--bond':m.acc2,'--atomH':m.ink,'--atomN':m.sky,'--atomO':m.bad,
  /* Maths Hub vocabulary */
  '--snow':m.panel,'--mist':m.ink3,'--stone':m.ink2,'--blush':m.panel3,'--rose':m.acc,
  '--taupe':m.ink3,'--cocoa':m.ink2,'--moss':m.good,'--espresso':m.ink,'--sage':m.good
 };
}

/* ---------- fonts ---------- */
const FONTS=[['Hub default','Bricolage Grotesque','Atkinson Hyperlegible'],['Legible','Atkinson Hyperlegible','Atkinson Hyperlegible'],
 ['Easy reading','Lexend','Lexend'],['Rounded','Fredoka','Quicksand'],['Warm','Nunito','Nunito'],
 ['Storybook','Fraunces','Atkinson Hyperlegible'],['Plain','Figtree','Figtree'],['Bubbly','Baloo 2','Nunito'],
 ['Editorial','Playfair Display','Figtree'],['Modern','Sora','Lexend']];
const FONT_HREF='https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Baloo+2:wght@600;800&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Fredoka:wght@500;700&family=JetBrains+Mono:wght@500;700&family=Lexend:wght@400;700&family=Nunito:wght@400;700;800&family=Playfair+Display:wght@700&family=Quicksand:wght@500;700&family=Sora:wght@600;800&display=swap';

/* ---------- preferences ---------- */
const PKEY='hub-prefs';
let P=Object.assign({theme:'galaxy',mode:'dark',font:0},read(PKEY,{}));
if(!THEMES.some(t=>t.id===P.theme))P.theme='galaxy';
const saveP=()=>write(PKEY,P);
const theme=()=>THEMES.find(t=>t.id===P.theme)||THEMES[0];
const palette=()=>{const t=theme();return t.modes[P.mode]||t.modes.dark||t.modes.light;};

function applyTheme(){
 const t=theme(),m=palette(),v=buildVars(m);
 const b=document.body,h=document.documentElement;
 h.dataset.hubTheme=t.id;h.dataset.hubMode=P.mode;h.dataset.hubFont=P.font||0;
 h.style.colorScheme=P.mode;
 const TINT=['--acc','--acc2','--glow1','--glow2'];
 TINT.forEach(k=>h.style.removeProperty(k));
 for(const k in v){
  /* Galaxy keeps the Science Hub's per-chapter accents: its accents are set on
     <html>, so a chapter's own rule on <body> still wins where there is one. */
  if(t.chapterTints&&TINT.indexOf(k)>=0){b.style.removeProperty(k);h.style.setProperty(k,v[k]);}
  else b.style.setProperty(k,v[k]);
 }
 const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',m.bg);
 renderDecor();
 document.dispatchEvent(new CustomEvent('hubtheme',{detail:{theme:t.id,mode:P.mode}}));
}

/* ---------- theme artwork ---------- */
function themeArt(){const A=window.HubArt&&window.HubArt.ART;return A?A[P.theme]:null;}
function renderDecor(){
 if(!document.body)return;
 const art=themeArt();
 let host=document.getElementById('hubDecor');
 if(!host){host=document.createElement('div');host.id='hubDecor';host.setAttribute('aria-hidden','true');document.body.insertBefore(host,document.body.firstChild);}
 host.innerHTML=art?`<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">${art.decor(P.mode)}</svg>`:'';
 /* each hub has one animated canvas of its own: keep it only with the theme it belongs to */
 const sky=document.getElementById('skyC'),snow=document.getElementById('snow');
 if(sky)sky.style.display=P.theme==='galaxy'?'':'none';
 if(snow)snow.style.display=P.theme==='cherry'?'':'none';
}
function markSvg(size){const art=themeArt();if(!art||!art.mark)return '';
 return `<svg class="hub-mark" viewBox="${art.mark[0]}" width="${size}" height="${size}" aria-hidden="true">${art.mark[1]}</svg>`;}
function logoSvg(size){const art=themeArt();if(!art||!art.logo)return '';
 return `<svg viewBox="${art.logo[0]}" width="${size}" height="${size}" aria-hidden="true">${art.logo[1]}</svg>`;}
function applyFont(){
 if(!document.getElementById('hubControlsHost'))return; /* sub-hubs keep their own font control */
 document.documentElement.dataset.hubFont=P.font||0;
 let st=$('#hubFontCSS');
 if(!st){st=document.createElement('style');st.id='hubFontCSS';document.head.appendChild(st);
  st.textContent=FONTS.map((f,i)=>`html[data-hub-font="${i}"] body{--display:"${f[1]}",system-ui,sans-serif;--body:"${f[2]}",system-ui,sans-serif}`).join('\n');}
}
function ensureFontLink(){if($('#hubFonts'))return;const l=document.createElement('link');l.id='hubFonts';l.rel='stylesheet';l.href=FONT_HREF;document.head.appendChild(l);}

window.Hub={THEMES,FONTS,prefs:P,saveP,theme,palette,buildVars,applyTheme,applyFont,ensureFontLink,renderDecor,markSvg,logoSvg,$,$$,esc,ymd,today,parseYmd,fmtDay,read,write,CHEV};
if(document.body)applyTheme();else document.addEventListener('DOMContentLoaded',applyTheme);
})();

/* ================= 2 · CURRICULA, PROGRESS & SHARED STORES ================= */
(function(){
const H=window.Hub,{$,$$,esc,read,write,ymd,today,parseYmd,fmtDay,CHEV}=H;

const CURRICULA=[
 {id:'sci',name:'Science Hub',short:'Science',href:'/science/',c:'var(--sky)',live:true,
  blurb:"Built from Cambridge Lower Secondary Science Learner's Book 9.",
  chapters:[[1,'Photosynthesis and the carbon cycle'],[2,'Properties of materials'],[3,'Forces and energy'],[4,'Maintaining life'],
   [5,'Reactivity'],[6,'Sound and space'],[7,'Genes and inheritance'],[8,'Rates of reaction'],[9,'Electricity']],
  icon:'<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/></svg>'},
 {id:'math',name:'Maths Hub',short:'Maths',href:'/maths/',c:'var(--acc)',live:true,
  blurb:'Built from Cambridge Lower Secondary Mathematics 9.',
  chapters:[[1,'Number and calculation'],[2,'Expressions and formulae'],[3,'Decimals, percentages and rounding'],[4,'Equations and inequalities'],
   [5,'Angles'],[6,'Statistical investigations'],[7,'Shapes and measurements'],[8,'Fractions'],[9,'Sequences and functions'],[10,'Graphs'],
   [11,'Ratio and proportion'],[12,'Probability'],[13,'Position and transformation'],[14,'Volume, surface area and symmetry'],[15,'Interpreting and discussing results']],
  icon:'<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 7h6M8 4v6M14 7h5M5 17l5-5M10 17l-5-5M14 15h5M14 19h5"/></svg>'},
 {id:'eng',name:'English Hub',short:'English',href:'',c:'var(--good)',live:false,blurb:'Coming soon.',
  chapters:[[1,'Reading'],[2,'Writing'],[3,'Speaking and listening'],[4,'Grammar and punctuation'],[5,'Spelling and vocabulary']],
  icon:'<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M8 8h8M8 12h6"/></svg>'},
 {id:'gp',name:'Global Perspectives Hub',short:'Global Perspectives',href:'',c:'var(--sun)',live:false,blurb:'Coming soon.',
  chapters:[[1,'Research'],[2,'Analysis'],[3,'Evaluation'],[4,'Reflection'],[5,'Collaboration'],[6,'Communication']],
  icon:'<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>'}
];
const byId=id=>CURRICULA.find(c=>c.id===id)||CURRICULA[0];
const sumOf=id=>read('hub-sum-'+id,null);
const idxOf=id=>read('hub-idx-'+id,null);
function chaptersOf(id){const ix=idxOf(id);if(ix&&ix.chapters&&ix.chapters.length)return ix.chapters.map(c=>[c.n,c.title]);return byId(id).chapters;}
function topicsOf(id,n){const ix=idxOf(id);if(ix&&ix.chapters){const c=ix.chapters.find(x=>+x.n===+n);if(c&&c.topics&&c.topics.length)return c.topics;}return [];}

/* plan store */
const PLKEY='hub-plan';
let PLAN=Object.assign({sessions:[],seq:1},read(PLKEY,{}));
const savePlan=()=>write(PLKEY,PLAN);
const upcoming=()=>{const t=today();return PLAN.sessions.filter(s=>s.date>=t).sort((a,b)=>(a.date+a.from).localeCompare(b.date+b.from));};
const sessionsOn=d=>PLAN.sessions.filter(s=>s.date===d).sort((a,b)=>a.from.localeCompare(b.from));

H.CURRICULA=CURRICULA;H.byId=byId;H.sumOf=sumOf;H.chaptersOf=chaptersOf;H.topicsOf=topicsOf;
H.PLAN=PLAN;H.savePlan=savePlan;H.upcoming=upcoming;H.sessionsOn=sessionsOn;

function toast(html){const t=document.createElement('div');t.className='hub-toast';t.setAttribute('role','status');t.innerHTML=html;document.body.appendChild(t);setTimeout(()=>t.remove(),2800);}
H.toast=toast;

/* ================= 3 · TOP BAR CONTROLS ================= */
const ICONS={
 plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15h6"/></svg>',
 sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>',
 moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>'
};
function closeMenus(){$$('.hub-menu').forEach(m=>m.hidden=true);$$('.hub-dd > .hub-btn').forEach(b=>b.setAttribute('aria-expanded','false'));}
H.closeMenus=closeMenus;

function controlsHtml(){
 const t=H.theme(),dark=H.prefs.mode==='dark';
 return `<div class="hub-controls" id="hubControls">
  <button class="hub-btn cta" id="hubPlanBtn" title="Build your study plan">${ICONS.plan}<span class="lbl">Build Your Plan</span></button>
  <button class="hub-btn icon" id="hubModeBtn" aria-pressed="${dark}" title="${dark?'Switch to light mode':'Switch to dark mode'}" aria-label="${dark?'Switch to light mode':'Switch to dark mode'}">${dark?ICONS.sun:ICONS.moon}</button>
  <div class="hub-dd"><button class="hub-btn" id="hubFontBtn" aria-expanded="false" aria-haspopup="true" title="Choose a font">Aa<span class="lbl">Font</span>${CHEV}</button>
   <div class="hub-menu" id="hubFontMenu" hidden></div></div>
  <div class="hub-dd"><button class="hub-btn" id="hubThemeBtn" aria-expanded="false" aria-haspopup="true" title="Choose a theme"><span class="hub-sw" style="background:${t.sw[1]}"></span><span class="lbl">Theme</span>${CHEV}</button>
   <div class="hub-menu" id="hubThemeMenu" hidden></div></div>
 </div>`;
}
function fontMenuHtml(){
 return `<div class="hub-sec">Choose a font</div>`+H.FONTS.map((f,i)=>
  `<button class="hub-opt" data-font="${i}" aria-pressed="${(H.prefs.font||0)===i}"><span class="t"><span style="font-family:'${f[1]}';font-weight:800;font-size:17px">${esc(f[0])}</span><span class="s">${esc(f[1])}${f[2]!==f[1]?' + '+esc(f[2]):''}</span></span></button>`).join('');
}
function themeMenuHtml(){
 return `<div class="hub-sec">Choose a theme</div>`+H.THEMES.map(t=>
  `<button class="hub-opt" data-theme="${t.id}" aria-pressed="${H.prefs.theme===t.id}"><span class="hub-chips">${t.sw.map(c=>`<i style="background:${c}"></i>`).join('')}</span><span class="t"><b>${esc(t.name)}</b><span class="s">${esc(t.desc)}</span></span></button>`).join('')
;
}
function refreshControls(){
 const host=$('#hubControls');if(!host)return;
 const t=H.theme(),dark=H.prefs.mode==='dark',mb=$('#hubModeBtn');
 if(mb){mb.innerHTML=dark?ICONS.sun:ICONS.moon;mb.setAttribute('aria-pressed',dark);
  const lab=dark?'Switch to light mode':'Switch to dark mode';mb.title=lab;mb.setAttribute('aria-label',lab);}
 const sw=$('#hubThemeBtn .hub-sw');if(sw)sw.style.background=t.sw[1];
 const fm=$('#hubFontMenu');if(fm&&!fm.hidden)fm.innerHTML=fontMenuHtml();
 const tm=$('#hubThemeMenu');if(tm&&!tm.hidden)tm.innerHTML=themeMenuHtml();
}
H.refreshControls=refreshControls;

function mountControls(){
 if($('#hubControls'))return;
 /* Only pages that ask for the hub bar get it. The Science and Maths hubs keep
    their own top bar untouched; the theme still reaches them. */
 const host=$('#hubControlsHost');
 if(!host)return;
 const frag=document.createElement('div');frag.innerHTML=controlsHtml();
 host.appendChild(frag.firstElementChild);
 $('#hubPlanBtn').onclick=()=>{closeMenus();H.openPlan();};
 $('#hubModeBtn').onclick=()=>{H.prefs.mode=H.prefs.mode==='dark'?'light':'dark';H.saveP();H.applyTheme();refreshControls();};
 const fb=$('#hubFontBtn'),fm=$('#hubFontMenu'),tb=$('#hubThemeBtn'),tm=$('#hubThemeMenu');
 fb.onclick=e=>{e.stopPropagation();const open=fm.hidden;closeMenus();if(open){fm.innerHTML=fontMenuHtml();fm.hidden=false;fb.setAttribute('aria-expanded','true');}};
 tb.onclick=e=>{e.stopPropagation();const open=tm.hidden;closeMenus();if(open){tm.innerHTML=themeMenuHtml();tm.hidden=false;tb.setAttribute('aria-expanded','true');}};
 fm.addEventListener('click',e=>{const b=e.target.closest('[data-font]');if(!b)return;H.prefs.font=+b.dataset.font;H.saveP();H.applyFont();fm.innerHTML=fontMenuHtml();});
 tm.addEventListener('click',e=>{const b=e.target.closest('[data-theme],[data-mode]');if(!b)return;
  if(b.dataset.theme){H.prefs.theme=b.dataset.theme;const th=H.theme();if(!th.modes[H.prefs.mode])H.prefs.mode=th.modes.dark?'dark':'light';}
  else H.prefs.mode=b.dataset.mode;
  H.saveP();H.applyTheme();tm.innerHTML=themeMenuHtml();refreshControls();});
 document.addEventListener('click',e=>{if(!e.target.closest('.hub-dd'))closeMenus();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenus();});
}
H.mountControls=mountControls;
})();

/* ================= 4 · BUILD YOUR PLAN (pop-up calendar) ================= */
(function(){
const H=window.Hub,{$,$$,esc,ymd,today,parseYmd,fmtDay}=H;
const TIMES=[];for(let h=6;h<=22;h++){TIMES.push(`${String(h).padStart(2,'0')}:00`);TIMES.push(`${String(h).padStart(2,'0')}:30`);}
TIMES.push('23:00');
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
let calOff=0,popDay=null,pick={cur:'sci',ch:'1',topic:'all'},popFrom='17:00',popTo='18:00';

function closeModal(){$$('.hub-modal,.hub-scrim').forEach(x=>x.remove());document.removeEventListener('keydown',escClose);}
function escClose(e){if(e.key==='Escape')closeModal();}
function openModal(cls,headHtml,bodyHtml){
 closeModal();
 const sc=document.createElement('div');sc.className='hub-scrim';sc.onclick=closeModal;
 const md=document.createElement('div');md.className='hub-modal '+cls;md.setAttribute('role','dialog');md.setAttribute('aria-modal','true');
 md.innerHTML=`<div class="hub-mhead">${headHtml}<button class="hub-btn" data-hubclose>Close</button></div><div class="hub-mbody">${bodyHtml}</div>`;
 document.body.append(sc,md);
 md.querySelector('[data-hubclose]').onclick=closeModal;
 document.addEventListener('keydown',escClose);
 return md;
}
H.openModal=openModal;H.closeModal=closeModal;

const topicOptions=(cur,ch)=>{
 const tp=H.topicsOf(cur,ch);
 return [{v:'all',l:'Whole chapter'},...tp.map(t=>({v:String(t.id),l:(t.id?t.id+' ':'')+t.title})),{v:'review',l:'Review and quiz'}];
};
const topicLabel=(cur,ch,t)=>{
 if(t==='all')return 'Whole chapter';
 if(t==='review')return 'Review and quiz';
 const tp=H.topicsOf(cur,ch).find(x=>String(x.id)===String(t));
 return tp?tp.title:'Whole chapter';
};
const chTitle=(cur,ch)=>{const c=H.chaptersOf(cur).find(x=>+x[0]===+ch);return c?c[1]:'';};

function pickerHtml(){
 const chs=H.chaptersOf(pick.cur);
 return `<div class="hub-col">
  <div><span class="hub-step">Step 1 · what to study</span></div>
  <label><span class="hub-tl">Subject</span>
   <select class="hub-field" id="pkCur">${H.CURRICULA.map(c=>`<option value="${c.id}" ${c.id===pick.cur?'selected':''}>${esc(c.name)}</option>`).join('')}</select></label>
  <label><span class="hub-tl">Chapter</span>
   <select class="hub-field" id="pkCh">${chs.map(([n,t])=>`<option value="${n}" ${String(n)===String(pick.ch)?'selected':''}>${n}. ${esc(t)}</option>`).join('')}</select></label>
  <label><span class="hub-tl">Topic</span>
   <select class="hub-field" id="pkTopic">${topicOptions(pick.cur,pick.ch).map(o=>`<option value="${o.v}" ${o.v===pick.topic?'selected':''}>${esc(o.l)}</option>`).join('')}</select></label>
  <div class="hub-hint">Step 2 · click a day on the calendar, set the times, then press Add. Mix as many subjects as you like — the plan holds them all.</div>
  <div><span class="hub-step">Planned sessions</span></div>
  <div class="hub-seq" id="pkSeq"></div>
  <div class="hub-acts"><button class="hub-btn" id="pkClear">Clear all</button><button class="hub-btn cta" id="pkDone">Done</button></div>
 </div>`;
}
function seqHtml(){
 const up=H.upcoming();
 if(!up.length)return `<div class="hub-hint">Nothing planned yet.</div>`;
 return up.map(s=>{const c=H.byId(s.cur);
  return `<div class="hub-seqitem" style="--c:${c.c}"><div class="si"><b>${esc(fmtDay(s.date))} · ${esc(s.from)}–${esc(s.to)}</b>${esc(c.short)} · ${esc(s.label)}</div>
  <button class="hub-x" data-del="${s.id}" aria-label="Remove this session">×</button></div>`;}).join('');
}
function calHtml(){
 const base=new Date();base.setDate(1);base.setMonth(base.getMonth()+calOff);
 const y=base.getFullYear(),m=base.getMonth();
 const first=new Date(y,m,1),start=(first.getDay()+6)%7,days=new Date(y,m+1,0).getDate(),t=today();
 let cells='';
 for(let i=0;i<start;i++)cells+='<div class="hub-cell blank"></div>';
 for(let d=1;d<=days;d++){
  const ds=ymd(new Date(y,m,d)),past=ds<t,ss=H.sessionsOn(ds);
  cells+=`<button class="hub-cell${past?' past':''}${ds===t?' today':''}" data-day="${ds}" ${past?'disabled':''}>
   <span class="d">${d}</span>${ss.slice(0,3).map(s=>`<span class="ev" style="--c:${H.byId(s.cur).c}">${esc(s.from)} ${esc(H.byId(s.cur).short)}</span>`).join('')}
   ${ss.length>3?`<span class="ev" style="--c:var(--ink3)">+${ss.length-3} more</span>`:''}</button>`;
 }
 return `<div class="hub-calwrap" id="pkCal">
  <div class="hub-calnav"><button class="hub-btn icon" id="pkPrev" aria-label="Previous month">‹</button><b>${MONTHS[m]} ${y}</b><button class="hub-btn icon" id="pkNext" aria-label="Next month">›</button></div>
  <div class="hub-cal">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="dow">${d}</div>`).join('')}${cells}</div>
 </div>`;
}
function popHtml(day){
 const ss=H.sessionsOn(day);
 const opts=v=>TIMES.map(t=>`<option value="${t}" ${t===v?'selected':''}>${t}</option>`).join('');
 return `<div class="ph"><b>${esc(fmtDay(day))}</b><button class="hub-x" id="pkPopX" aria-label="Close">×</button></div>
  <div class="hub-ptopic"><b>${esc(H.byId(pick.cur).short)} · Chapter ${esc(pick.ch)}</b>${esc(topicLabel(pick.cur,pick.ch,pick.topic))}</div>
  <div class="hub-times"><label><span class="hub-tl">From</span><select class="hub-field" id="pkFrom">${opts(popFrom)}</select></label>
   <label><span class="hub-tl">To</span><select class="hub-field" id="pkTo">${opts(popTo)}</select></label></div>
  <div class="hub-err" id="pkErr" hidden></div>
  ${ss.length?`<div class="hub-seq">${ss.map(s=>`<div class="hub-seqitem" style="--c:${H.byId(s.cur).c}"><div class="si"><b>${esc(s.from)}–${esc(s.to)}</b>${esc(H.byId(s.cur).short)} · ${esc(s.label)}</div><button class="hub-x" data-del="${s.id}" aria-label="Remove">×</button></div>`).join('')}</div>`:''}
  <div class="hub-acts"><button class="hub-btn cta" id="pkAdd">Add to plan</button></div>`;
}
function drawSeq(){const el=$('#pkSeq');if(el)el.innerHTML=seqHtml();}
function drawCal(){const w=$('#pkCalHost');if(w)w.innerHTML=calHtml();wireCal();}
function closePop(){$$('.hub-pop').forEach(p=>p.remove());popDay=null;}

function openPop(cell,day){
 closePop();popDay=day;
 const host=$('#pkCal');const p=document.createElement('div');p.className='hub-pop';p.innerHTML=popHtml(day);host.appendChild(p);
 const hb=host.getBoundingClientRect(),cb=cell.getBoundingClientRect();
 let left=cb.left-hb.left+cb.width/2-145;left=Math.max(4,Math.min(left,Math.max(4,hb.width-294)));
 p.style.left=left+'px';p.style.top='0px';
 const ph=p.offsetHeight,cellTop=cb.top-hb.top;
 let top=cellTop+cb.height+8;
 if(top+ph>hb.height)top=Math.max(0,cellTop-ph-8);          /* flip above when it would fall out of the calendar */
 if(top+ph>hb.height)top=Math.max(0,hb.height-ph);           /* last resort: sit inside the calendar */
 p.style.top=top+'px';
 $('#pkPopX').onclick=closePop;
 $('#pkFrom').onchange=e=>{popFrom=e.target.value;if(popTo<=popFrom){const i=TIMES.indexOf(popFrom);popTo=TIMES[Math.min(i+2,TIMES.length-1)];$('#pkTo').value=popTo;}};
 $('#pkTo').onchange=e=>{popTo=e.target.value;};
 $('#pkAdd').onclick=()=>{
  if(popTo<=popFrom){const er=$('#pkErr');er.hidden=false;er.textContent='The finish time must be after the start time.';return;}
  H.PLAN.sessions.push({id:'s'+(H.PLAN.seq++),cur:pick.cur,ch:+pick.ch,topic:pick.topic,
   label:`Ch ${pick.ch} · ${topicLabel(pick.cur,pick.ch,pick.topic)}`,chTitle:chTitle(pick.cur,pick.ch),date:popDay,from:popFrom,to:popTo});
  H.savePlan();closePop();drawCal();drawSeq();H.toast('Added to your plan');
  document.dispatchEvent(new CustomEvent('hubplan'));
 };
 p.addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;
  H.PLAN.sessions=H.PLAN.sessions.filter(s=>s.id!==b.dataset.del);H.savePlan();drawCal();drawSeq();closePop();
  document.dispatchEvent(new CustomEvent('hubplan'));});
}
function wireCal(){
 const prev=$('#pkPrev'),next=$('#pkNext');
 if(prev)prev.onclick=()=>{calOff--;drawCal();closePop();};
 if(next)next.onclick=()=>{calOff++;drawCal();closePop();};
 $$('.hub-cell[data-day]').forEach(c=>{c.onclick=e=>{e.stopPropagation();openPop(c,c.dataset.day);};});
}
function openPlan(){
 calOff=0;closePop();
 const md=openModal('hub-planmodal','<h3>Build your plan</h3>',
  `<div class="hub-planbody">${pickerHtml()}<div class="hub-col"><div id="pkCalHost">${calHtml()}</div></div></div>`);
 drawSeq();wireCal();
 $('#pkCur').onchange=e=>{pick.cur=e.target.value;pick.ch='1';pick.topic='all';
  const body=md.querySelector('.hub-planbody');body.firstElementChild.outerHTML=pickerHtml();rewire(md);};
 $('#pkCh').onchange=e=>{pick.ch=e.target.value;pick.topic='all';
  const sel=$('#pkTopic');sel.innerHTML=topicOptions(pick.cur,pick.ch).map(o=>`<option value="${o.v}">${esc(o.l)}</option>`).join('');closePop();};
 $('#pkTopic').onchange=e=>{pick.topic=e.target.value;closePop();};
 $('#pkClear').onclick=()=>{if(!H.PLAN.sessions.length)return;H.PLAN.sessions=[];H.savePlan();drawCal();drawSeq();document.dispatchEvent(new CustomEvent('hubplan'));};
 $('#pkDone').onclick=closeModal;
 md.querySelector('#pkSeq').addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;
  H.PLAN.sessions=H.PLAN.sessions.filter(s=>s.id!==b.dataset.del);H.savePlan();drawSeq();drawCal();document.dispatchEvent(new CustomEvent('hubplan'));});
}
function rewire(md){
 drawSeq();
 $('#pkCur').onchange=e=>{pick.cur=e.target.value;pick.ch='1';pick.topic='all';md.querySelector('.hub-planbody').firstElementChild.outerHTML=pickerHtml();rewire(md);};
 $('#pkCh').onchange=e=>{pick.ch=e.target.value;pick.topic='all';
  const sel=$('#pkTopic');sel.innerHTML=topicOptions(pick.cur,pick.ch).map(o=>`<option value="${o.v}">${esc(o.l)}</option>`).join('');closePop();};
 $('#pkTopic').onchange=e=>{pick.topic=e.target.value;closePop();};
 $('#pkClear').onclick=()=>{H.PLAN.sessions=[];H.savePlan();drawCal();drawSeq();document.dispatchEvent(new CustomEvent('hubplan'));};
 $('#pkDone').onclick=closeModal;
 md.querySelector('#pkSeq').addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;
  H.PLAN.sessions=H.PLAN.sessions.filter(s=>s.id!==b.dataset.del);H.savePlan();drawSeq();drawCal();document.dispatchEvent(new CustomEvent('hubplan'));});
 closePop();
}
H.openPlan=openPlan;
})();

/* ================= 5 · MY NOTES + DRAWING PAD ================= */
(function(){
const H=window.Hub,{$,$$,esc,read,write}=H;
const Calc=(function(){
 // safe parser: numbers, + − × ÷ ^, brackets, functions, π, e, Ans; no eval
 function tokenize(s){const t=[];let i=0;s=s.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
  while(i<s.length){const c=s[i];
   if(/\s/.test(c)){i++;continue;}
   if(/[0-9.]/.test(c)){let j=i;while(j<s.length&&/[0-9.]/.test(s[j]))j++;const v=s.slice(i,j);if((v.match(/\./g)||[]).length>1||v==='.')throw Error('number');t.push({k:'n',v:parseFloat(v)});i=j;continue;}
   if(/[a-zπ√∛]/i.test(c)){let m=s.slice(i).match(/^(sin|cos|tan|log|ln|Ans|π|e|√|∛)/);if(!m)throw Error('name');const w=m[1];i+=w.length;
    if(w==='π')t.push({k:'n',v:Math.PI});else if(w==='e')t.push({k:'n',v:Math.E});else if(w==='Ans')t.push({k:'ans'});else t.push({k:'f',v:w});continue;}
   if('+-*/^()'.includes(c)){t.push({k:c});i++;continue;}
   if(c==='²'){t.push({k:'^'});t.push({k:'n',v:2});i++;continue;}
   throw Error('char');}
  return t;}
 function parse(tokens,ans,deg){let p=0;const peek=()=>tokens[p],eat=k=>{if(!tokens[p]||tokens[p].k!==k)throw Error('expected '+k);return tokens[p++];};
  const rad=x=>deg?x*Math.PI/180:x;
  const FN={sin:x=>Math.sin(rad(x)),cos:x=>Math.cos(rad(x)),tan:x=>Math.tan(rad(x)),log:Math.log10,ln:Math.log,'√':Math.sqrt,'∛':Math.cbrt};
  function expr(){let v=term();while(peek()&&(peek().k==='+'||peek().k==='-')){const o=tokens[p++].k;const r=term();v=o==='+'?v+r:v-r;}return v;}
  function term(){let v=unary();for(;;){const t=peek();if(!t)break;if(t.k==='*'||t.k==='/'){p++;const r=unary();v=t.k==='*'?v*r:v/r;}else if(t.k==='n'||t.k==='('||t.k==='f'||t.k==='ans'){v=v*unary();}else break;}return v;}
  function unary(){const t=peek();if(t&&t.k==='-'){p++;return -unary();}if(t&&t.k==='+'){p++;return unary();}return power();}
  function power(){const b=atom();if(peek()&&peek().k==='^'){p++;const e=unary();return Math.pow(b,e);}return b;}
  function atom(){const t=peek();if(!t)throw Error('end');
   if(t.k==='n'){p++;return t.v;}if(t.k==='ans'){p++;return ans;}
   if(t.k==='('){p++;const v=expr();if(peek()&&peek().k===')')p++;return v;}
   if(t.k==='f'){p++;const arg=(peek()&&peek().k==='(')?(p++,(()=>{const v=expr();if(peek()&&peek().k===')')p++;return v;})()):power();return FN[t.v](arg);}
   throw Error('unexpected');}
  const v=expr();if(p<tokens.length)throw Error('extra');return v;}
 function fmt(v){if(!isFinite(v))return 'Math error';if(v===0)return '0';const a=Math.abs(v);
  if(a>=1e10||a<1e-6){const [m,e]=v.toExponential(9).split('e');return `${String(+m)} × 10^${(+e).toString().replace('-','−')}`;}
  return String(+v.toPrecision(10)).replace('-','−');}
 return{run:(s,ans,deg)=>fmt(parse(tokenize(s),ans,deg)),num:(s,ans,deg)=>parse(tokenize(s),ans,deg),fmt};
})();

function calcHtml(){const K=[['sin','fn','sin('],['cos','fn','cos('],['tan','fn','tan('],['log','fn','log('],['ln','fn','ln('],['DEL','op','del'],
 ['√','fn','√('],['∛','fn','∛('],['x²','fn','²'],['xʸ','fn','^'],['x⁻¹','fn','^(−1)'],['AC','op','ac'],
 ['7','',  '7'],['8','','8'],['9','','9'],['(','op','('],[')','op',')'],['÷','op','÷'],
 ['4','','4'],['5','','5'],['6','','6'],['π','fn','π'],['Ans','fn','Ans'],['×','op','×'],
 ['1','','1'],['2','','2'],['3','','3'],['×10ˣ','fn','×10^('],['(−)','fn','−'],['−','op','−'],
 ['0','','0'],['.','','.'],['e','fn','e'],['=','eq','='],['=','eq','='],['+','op','+']];
 return `<div class="calc" id="calc" hidden><div class="crow"><span class="tiny">Scientific calculator</span><button class="nbtn" id="cDeg" aria-pressed="true" title="Angle unit for sin, cos and tan">DEG</button></div>
 <div class="cdisp" aria-live="polite"><div class="cexp" id="cExp"></div><div class="cres" id="cRes">0</div></div>
 <div class="ckeys">${K.map((k,i)=>i===34?'':`<button class="${k[1]}" data-ck="${esc(k[2])}" ${i===33?'style="grid-column:span 2"':''} aria-label="${k[0]==='='?'equals':esc(k[0])}">${k[0]}</button>`).join('')}</div>
 <div class="row" style="justify-content:flex-end"><button class="nbtn" id="cIns" title="Put this calculation into my notes">Insert into notes</button></div></div>`;}

/* =================== NOTES (with calculator) =================== */

/* ---------------- drawing pad ---------------- */
const DKEY='hub-draw';
const QUICK=['#1A1A1A','#D32F2F','#F4511E','#FDD835','#7CB342','#009688','#039BE5','#1E5FBF','#8E24AA','#D81B60','#6D4C41','#FFFFFF'];
const PALETTE=['#000000','#434343','#7A7A7A','#B7B7B7','#FFFFFF','#8B2F2F','#D32F2F','#F4511E','#FB8C00','#FDD835',
 '#C0CA33','#7CB342','#2E7D32','#009688','#00ACC1','#039BE5','#1E5FBF','#1A237E','#5E35B1','#8E24AA',
 '#D81B60','#FF80AB','#FFB4A2','#FFD6A5','#FFF3B0','#CDEAC0','#A8E6CF','#B3E5FC','#C5CAE9','#E1BEE7',
 '#6D4C41','#A1887F','#D7CCC8','#C2413C','#F2D14E','#1D7A8C','#688D57','#D0AC72','#B78993','#9B7BFF'];
const STICKERS=['⭐','🌟','✨','❤️','💛','💚','💙','💜','🔥','⚡','🌈','☀️','🌙','☁️','❄️','🌸','🌷','🌻','🍀','🌴',
 '🦋','🐱','🐶','🐼','🦄','🐙','🐢','🐝','🦉','🐬','🍎','🍓','🍋','🍉','🧁','🍪','🍩','🎈','🎉','🎀',
 '✅','❌','❓','❗','💡','📌','📎','✏️','📚','🏆','👍','👏','😀','😍','🤔','😴','🤩','🥳','🧠','🎯'];
const TOOLS=[['pen','Pen','M3 21l4-1 11-11a2.1 2.1 0 0 0-3-3L4 17z'],['marker','Marker','M4 20h16M6 16l9-9 3 3-9 9z'],['eraser','Eraser','M8 20h12M4 15l7-7 6 6-6 6H7z'],
 ['line','Line','M4 20L20 4'],['arrow','Arrow','M4 20L20 4M13 4h7v7'],['rect','Box','M4 6h16v12H4z'],['ellipse','Circle','M12 5a7 7 0 1 0 .1 0'],
 ['tri','Triangle','M12 4l8 16H4z'],['star','Star','M12 3l2.6 6.3 6.8.6-5.2 4.5 1.6 6.6L12 17.6 6.2 21l1.6-6.6L2.6 9.9l6.8-.6z'],
 ['heart','Heart','M12 20S4 15 4 9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 8 2.5C20 15 12 20 12 20z'],
 ['cloud','Cloud','M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6-1.3A3.5 3.5 0 0 0 7 18z'],
 ['bubble','Speech','M4 5h16v10H9l-4 4v-4H4z']];
const ic=d=>`<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function padHtml(){
 return `<div class="hub-pad" id="hubPad">
  <div class="hub-padbar" role="toolbar" aria-label="Drawing tools">
   ${TOOLS.map((t,i)=>`<button class="hub-tool" data-tool="${t[0]}" aria-pressed="${i===0}" title="${t[1]}">${ic(t[2])}<span>${t[1]}</span></button>`).join('')}
  </div>
  <div class="hub-padbar">
   <span class="hub-quick">${QUICK.map((c,i)=>`<button data-color="${c}" aria-pressed="${i===0}" style="background:${c}" title="${c}" aria-label="Colour ${c}"></button>`).join('')}</span>
   <button class="hub-tool" id="padMore" aria-expanded="false" title="All the colours">${ic('M12 3a9 9 0 1 0 0 18 2 2 0 0 0 0-4 2 2 0 0 1 0-4h2a5 5 0 0 0 5-5c0-3-3-5-7-5z')}<span>Colours</span></button>
   <button class="hub-tool" id="padStick" aria-expanded="false" title="Stickers">😀<span>Stickers</span></button>
   <button class="hub-tool" data-fill aria-pressed="false" title="Fill the shape">${ic('M5 12l7-7 7 7-7 7z')}<span>Fill</span></button>
   <label class="hub-tool" title="How thick the line is">${ic('M4 8h16M4 13h16M4 17h16')}<input class="hub-size" type="range" min="1" max="40" value="4" data-size aria-label="Brush size"></label>
   <span class="hub-padspacer"></span>
   <button class="hub-tool" data-undo title="Undo">${ic('M4 12a8 8 0 1 1 2.4 5.7M4 20v-5h5')}<span>Undo</span></button>
   <button class="hub-tool" data-clear title="Clear the page">${ic('M6 6l12 12M18 6L6 18')}<span>Clear</span></button>
   <button class="hub-tool" data-save title="Save as a picture">${ic('M12 4v11M8 11l4 4 4-4M5 20h14')}<span>Save</span></button>
  </div>
  <div class="hub-canvaswrap">
   <canvas id="hubCanvas" aria-label="Drawing pad"></canvas>
   <div class="hub-tray" id="padColorTray" hidden>
    <div class="hub-trayhead">Every colour<button class="hub-x" data-closetray aria-label="Close">×</button></div>
    <div class="hub-traygrid colors">${PALETTE.map(c=>`<button data-color="${c}" style="background:${c}" title="${c}" aria-label="Colour ${c}"></button>`).join('')}</div>
    <label class="hub-custom">Mix your own <input type="color" data-custom value="#ff3ba7" aria-label="Pick any colour"></label>
   </div>
   <div class="hub-tray" id="padStickTray" hidden>
    <div class="hub-trayhead">Stickers<button class="hub-x" data-closetray aria-label="Close">×</button></div>
    <div class="hub-traygrid stickers">${STICKERS.map(st=>`<button data-sticker="${st}" title="Sticker ${st}">${st}</button>`).join('')}</div>
   </div>
  </div>
 </div>`;
}

function attachPad(panel){
 if(!panel||panel.dataset.hubPad)return;panel.dataset.hubPad='1';
 const head=panel.querySelector('.nhead');
 const btn=document.createElement('button');
 btn.className=(head&&head.querySelector('.nbtn'))?'nbtn':'hub-btn';
 btn.id='hubDrawBtn';btn.setAttribute('aria-pressed','false');btn.title='Drawing pad';
 btn.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M3 21l4-1 11-11a2.1 2.1 0 0 0-3-3L4 17z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 5l3 3" stroke="currentColor" stroke-width="2"/></svg>Draw';
 if(head){const min=head.querySelector('#nMin');if(min)head.insertBefore(btn,min);else head.appendChild(btn);}
 const wrap=document.createElement('div');wrap.innerHTML=padHtml();const pad=wrap.firstElementChild;panel.appendChild(pad);

 const cv=pad.querySelector('#hubCanvas'),ctx=cv.getContext('2d');
 let tool='pen',color=QUICK[0],size=4,fill=false,sticker=null,drawing=false,sx=0,sy=0,snap=null;
 const undo=[];
 const store=()=>{try{localStorage.setItem(DKEY,cv.toDataURL('image/png'));}catch(e){}};
 let storeT=null;const storeSoon=()=>{clearTimeout(storeT);storeT=setTimeout(store,500);};
 const markColor=()=>{$$('[data-color]',pad).forEach(b=>b.setAttribute('aria-pressed',b.dataset.color===color));};

 function fit(){
  const r=cv.parentNode.getBoundingClientRect();const w=Math.max(240,Math.round(r.width)),h=Math.max(200,Math.round(r.height));
  if(cv.width===w&&cv.height===h)return;
  const old=cv.width?cv.toDataURL():null;cv.width=w;cv.height=h;ctx.lineCap='round';ctx.lineJoin='round';
  if(old){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0,w,h);im.src=old;}
 }
 function loadSaved(){let d=null;try{d=localStorage.getItem(DKEY);}catch(e){}
  if(!d)return;const im=new Image();im.onload=()=>ctx.drawImage(im,0,0,cv.width,cv.height);im.src=d;}
 function push(){try{undo.push(cv.toDataURL());if(undo.length>14)undo.shift();}catch(e){}}
 function restore(d){const im=new Image();im.onload=()=>{ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(im,0,0);};im.src=d;}
 const pt=e=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height];};

 function star(x,y,R){const r=R*.45;ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r:R;ctx[i?'lineTo':'moveTo'](x+Math.cos(a)*rr,y+Math.sin(a)*rr);}ctx.closePath();}
 function heart(x,y,R){ctx.beginPath();ctx.moveTo(x,y+R*.75);ctx.bezierCurveTo(x-R*1.5,y-R*.4,x-R*.5,y-R*1.2,x,y-R*.35);ctx.bezierCurveTo(x+R*.5,y-R*1.2,x+R*1.5,y-R*.4,x,y+R*.75);ctx.closePath();}
 function cloud(x,y,R){ctx.beginPath();ctx.arc(x-R*.6,y,R*.55,0,7);ctx.arc(x,y-R*.3,R*.7,0,7);ctx.arc(x+R*.6,y,R*.55,0,7);ctx.closePath();}
 function bubble(x0,y0,x1,y1){const l=Math.min(x0,x1),t=Math.min(y0,y1),w=Math.abs(x1-x0),h=Math.abs(y1-y0),r=Math.min(18,w/4,h/4);
  ctx.beginPath();ctx.moveTo(l+r,t);ctx.lineTo(l+w-r,t);ctx.quadraticCurveTo(l+w,t,l+w,t+r);ctx.lineTo(l+w,t+h-r);ctx.quadraticCurveTo(l+w,t+h,l+w-r,t+h);
  ctx.lineTo(l+w*.42,t+h);ctx.lineTo(l+w*.3,t+h+Math.min(26,h*.4));ctx.lineTo(l+w*.3,t+h);ctx.lineTo(l+r,t+h);
  ctx.quadraticCurveTo(l,t+h,l,t+h-r);ctx.lineTo(l,t+r);ctx.quadraticCurveTo(l,t,l+r,t);ctx.closePath();}
 function arrow(x0,y0,x1,y1){const a=Math.atan2(y1-y0,x1-x0),hd=Math.max(10,size*3);
  ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x1-hd*Math.cos(a-.4),y1-hd*Math.sin(a-.4));ctx.lineTo(x1-hd*Math.cos(a+.4),y1-hd*Math.sin(a+.4));ctx.closePath();ctx.fillStyle=color;ctx.fill();}
 function shape(x0,y0,x1,y1){
  ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=size;ctx.globalAlpha=1;
  const cx=(x0+x1)/2,cy=(y0+y1)/2,R=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))/2;
  if(tool==='line'){ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();return;}
  if(tool==='arrow'){arrow(x0,y0,x1,y1);return;}
  if(tool==='rect'){ctx.beginPath();ctx.rect(Math.min(x0,x1),Math.min(y0,y1),Math.abs(x1-x0),Math.abs(y1-y0));}
  else if(tool==='ellipse'){ctx.beginPath();ctx.ellipse(cx,cy,Math.abs(x1-x0)/2,Math.abs(y1-y0)/2,0,0,7);}
  else if(tool==='tri'){ctx.beginPath();ctx.moveTo(cx,Math.min(y0,y1));ctx.lineTo(Math.min(x0,x1),Math.max(y0,y1));ctx.lineTo(Math.max(x0,x1),Math.max(y0,y1));ctx.closePath();}
  else if(tool==='star')star(cx,cy,R);
  else if(tool==='heart')heart(cx,cy,R);
  else if(tool==='cloud')cloud(cx,cy,R);
  else if(tool==='bubble')bubble(x0,y0,x1,y1);
  if(fill)ctx.fill();else ctx.stroke();
 }

 cv.addEventListener('pointerdown',e=>{
  closeTrays();cv.setPointerCapture(e.pointerId);const [x,y]=pt(e);push();
  if(sticker){ctx.globalAlpha=1;ctx.font=Math.max(20,size*8)+'px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(sticker,x,y);storeSoon();return;}
  drawing=true;sx=x;sy=y;
  if(tool==='pen'||tool==='marker'||tool==='eraser'){
   ctx.globalCompositeOperation=tool==='eraser'?'destination-out':'source-over';
   ctx.globalAlpha=tool==='marker'?.35:1;ctx.strokeStyle=color;ctx.lineWidth=tool==='marker'?size*3:size;
   ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+.01,y);ctx.stroke();
  } else {try{snap=ctx.getImageData(0,0,cv.width,cv.height);}catch(err){snap=null;}}
 });
 cv.addEventListener('pointermove',e=>{
  if(!drawing)return;const [x,y]=pt(e);
  if(tool==='pen'||tool==='marker'||tool==='eraser'){ctx.lineTo(x,y);ctx.stroke();}
  else{if(snap)ctx.putImageData(snap,0,0);shape(sx,sy,x,y);}
 });
 const end=()=>{if(!drawing)return;drawing=false;ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;snap=null;storeSoon();};
 ['pointerup','pointercancel','pointerleave'].forEach(ev=>cv.addEventListener(ev,end));

 const colorTray=pad.querySelector('#padColorTray'),stickTray=pad.querySelector('#padStickTray');
 function closeTrays(){colorTray.hidden=true;stickTray.hidden=true;
  pad.querySelector('#padMore').setAttribute('aria-expanded','false');
  pad.querySelector('#padStick').setAttribute('aria-expanded','false');}

 pad.addEventListener('click',e=>{
  if(e.target.closest('[data-closetray]')){closeTrays();return;}
  const t=e.target.closest('[data-tool],[data-color],[data-sticker],[data-fill],[data-undo],[data-clear],[data-save],#padMore,#padStick');
  if(!t)return;
  if(t.id==='padMore'){const open=colorTray.hidden;closeTrays();colorTray.hidden=!open;t.setAttribute('aria-expanded',open);return;}
  if(t.id==='padStick'){const open=stickTray.hidden;closeTrays();stickTray.hidden=!open;t.setAttribute('aria-expanded',open);return;}
  if(t.dataset.tool!==undefined){tool=t.dataset.tool;sticker=null;
   $$('[data-tool]',pad).forEach(b=>b.setAttribute('aria-pressed',b===t));
   pad.querySelector('#padStick').setAttribute('aria-pressed','false');return;}
  if(t.dataset.color!==undefined){color=t.dataset.color;markColor();return;}
  if(t.dataset.sticker!==undefined){sticker=t.dataset.sticker;
   $$('[data-sticker]',pad).forEach(b=>b.setAttribute('aria-pressed',b===t));
   pad.querySelector('#padStick').setAttribute('aria-pressed','true');closeTrays();return;}
  if(t.hasAttribute('data-fill')){fill=!fill;t.setAttribute('aria-pressed',fill);return;}
  if(t.hasAttribute('data-undo')){const d=undo.pop();if(d){restore(d);storeSoon();}return;}
  if(t.hasAttribute('data-clear')){push();ctx.clearRect(0,0,cv.width,cv.height);storeSoon();return;}
  if(t.hasAttribute('data-save')){const a=document.createElement('a');a.download='sofia-drawing.png';a.href=cv.toDataURL('image/png');a.click();return;}
 });
 pad.querySelector('[data-size]').addEventListener('input',e=>{size=+e.target.value;});
 pad.querySelector('[data-custom]').addEventListener('input',e=>{color=e.target.value;markColor();});

 /* the pad and the calculator share the window, so opening one puts the other away */
 const calcBtn=panel.querySelector('#nCalc');
 let ro=null,syncing=false;
 const setDraw=on=>{
  panel.classList.toggle('drawing',on);pad.classList.toggle('on',on);btn.setAttribute('aria-pressed',on);
  if(on){
   if(calcBtn&&calcBtn.getAttribute('aria-pressed')==='true'){syncing=true;calcBtn.click();syncing=false;}
   requestAnimationFrame(()=>{fit();loadSaved();});
   if(!ro&&window.ResizeObserver){ro=new ResizeObserver(()=>{if(panel.classList.contains('drawing'))fit();});ro.observe(cv.parentNode);}
  } else closeTrays();
 };
 btn.onclick=()=>setDraw(!panel.classList.contains('drawing'));
 if(calcBtn)calcBtn.addEventListener('click',()=>{if(!syncing&&panel.classList.contains('drawing'))setDraw(false);},true);
}
H.attachPad=attachPad;

/* ---------------- a notes window for pages that have none of their own ---------------- */
function makeNotes(){
 if(document.querySelector('.notes'))return document.querySelector('.notes');
 const NK='hub-notes';
 let N=Object.assign({html:'',open:false,calc:false},read(NK,{}));
 const saveN=()=>write(NK,N);
 const fab=document.createElement('button');fab.className='fab';fab.id='hubNotesFab';fab.title='My notes';fab.setAttribute('aria-label','Open my notes');
 fab.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M5 3h10l4 4v14H5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10h8M8 14h8M8 18h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
 const pn=document.createElement('section');pn.className='notes';pn.id='hubNotesPanel';pn.hidden=true;pn.setAttribute('role','dialog');pn.setAttribute('aria-label','My notes');
 pn.innerHTML=`<div class="nhead"><b>My notes</b><span class="tiny" id="hubNStatus">Saved</span><span class="spacer" style="flex:1"></span>
   <button class="nbtn" id="nCalc" aria-pressed="false" title="Scientific calculator"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2M16 12v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Calculator</button>
   <button class="nbtn" id="nMin" title="Minimise" aria-label="Minimise notes">–</button></div>
  ${calcHtml()}
  <div class="ntools" role="toolbar" aria-label="Formatting">
   <button data-cmd="bold" title="Bold"><b>B</b></button><button data-cmd="italic" title="Italic"><i>I</i></button><button data-cmd="underline" title="Underline"><u>U</u></button>
   <button data-cmd="h3" title="Heading">H</button><button data-cmd="insertUnorderedList" title="Bullet list">• List</button><button data-cmd="insertOrderedList" title="Numbered list">1. List</button></div>
  <div class="ned" id="hubNEd" contenteditable="true" spellcheck="true" aria-label="Notes text" data-ph="Write anything you like here. Your notes follow you to every page of the hub."></div>`;
 document.body.append(fab,pn);
 const ed=pn.querySelector('#hubNEd');ed.innerHTML=N.html||'';
 const show=o=>{N.open=o;pn.hidden=!o;fab.hidden=o;saveN();};
 fab.onclick=()=>show(true);pn.querySelector('#nMin').onclick=()=>show(false);
 let tm=null;ed.addEventListener('input',()=>{const st=pn.querySelector('#hubNStatus');st.textContent='Saving…';clearTimeout(tm);
  tm=setTimeout(()=>{N.html=ed.innerHTML;saveN();st.textContent='Saved';},400);});
 pn.querySelectorAll('.ntools button').forEach(b=>{b.addEventListener('mousedown',e=>e.preventDefault());
  b.onclick=()=>{ed.focus();const c=b.dataset.cmd;
   if(c==='h3'){const cur=document.queryCommandValue('formatBlock').toLowerCase();document.execCommand('formatBlock',false,cur==='h3'?'div':'h3');}
   else document.execCommand(c,false,null);ed.dispatchEvent(new Event('input'));};});

 /* scientific calculator, the same one the Maths Hub uses */
 const calc=pn.querySelector('#calc'),cb=pn.querySelector('#nCalc');
 let expr='',ans=0,deg=true,last=null;
 const showCalc=o=>{N.calc=o;calc.hidden=!o;cb.setAttribute('aria-pressed',o);saveN();};
 cb.onclick=()=>showCalc(!N.calc);showCalc(!!N.calc);
 const cExp=()=>pn.querySelector('#cExp'),cRes=()=>pn.querySelector('#cRes');
 const upd=res=>{cExp().textContent=expr||' ';
  if(res!=null)cRes().textContent=res;
  else{try{cRes().textContent=expr?Calc.run(expr,ans,deg):'0';}catch(e){}cRes().style.opacity=.55;}};
 const doEq=()=>{if(!expr)return;try{const v=Calc.num(expr,ans,deg);const r=Calc.fmt(v);last={expr,r};if(isFinite(v))ans=v;cRes().style.opacity=1;upd(r);expr='';}
  catch(e){cRes().style.opacity=1;upd('Syntax error');}};
 calc.addEventListener('click',e=>{
  const b=e.target.closest('[data-ck]');
  if(e.target.closest('#cDeg')){deg=!deg;const d=pn.querySelector('#cDeg');d.textContent=deg?'DEG':'RAD';d.setAttribute('aria-pressed',deg);upd();return;}
  if(e.target.closest('#cIns')){if(!last)return;ed.focus();
   const sel=getSelection(),r=document.createRange();r.selectNodeContents(ed);r.collapse(false);sel.removeAllRanges();sel.addRange(r);
   document.execCommand('insertHTML',false,`<div>${esc(last.expr)} = <b>${esc(last.r)}</b></div>`);ed.dispatchEvent(new Event('input'));return;}
  if(!b)return;const k=b.dataset.ck;
  if(k==='ac'){expr='';last=null;cRes().style.opacity=1;upd('0');return;}
  if(k==='del'){expr=expr.replace(/(sin\(|cos\(|tan\(|log\(|ln\(|√\(|∛\(|×10\^\(|Ans|\^\(−1\)|.)$/,'');upd();return;}
  if(k==='='){doEq();return;}
  expr+=k;upd();
 });
 upd();
 if(N.open)show(true);
 return pn;
}
H.makeNotes=makeNotes;
})();

/* ================= 6 · BOOT ================= */
(function(){
const H=window.Hub;
function boot(){
 H.applyTheme();
 if(document.getElementById('hubControlsHost')){H.ensureFontLink();H.applyFont();H.mountControls();}
 const own=document.documentElement.getAttribute('data-hub-notes')==='own';
 const existing=document.querySelector('.notes');
 if(existing){H.attachPad(existing);}
 else if(own){H.attachPad(H.makeNotes());}
 else{
  /* the Science and Maths hubs build their own notes panel once their app script runs */
  const mo=new MutationObserver(()=>{const p=document.querySelector('.notes');if(p){mo.disconnect();H.attachPad(p);}});
  mo.observe(document.body,{childList:true});
  setTimeout(()=>{if(!document.querySelector('.notes')){mo.disconnect();H.attachPad(H.makeNotes());}},8000);
 }
 if(window.HubPage&&typeof window.HubPage.render==='function')window.HubPage.render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
