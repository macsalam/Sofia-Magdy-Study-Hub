/* ============================================================
   Sofia Magdy Study Hub — theme artwork
   One entry per theme: a logo, a small corner mark, and a full-page
   decor scene. Woodland Leaf and Mythical reuse the Pharma Hub drawings.
   ============================================================ */
(function(){
const PL=(inner,vb,x,y,w,h,r=0)=>`<g transform="rotate(${r} ${x+w/2} ${y+h/2})"><svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb}" overflow="visible">${inner}</svg></g>`;
const OP=(o,s)=>`<g opacity="${o}">${s}</g>`;
const STAR=(c,cx=32,cy=6,r=6)=>{let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;d+=(i?'L':'M')+(cx+Math.cos(a)*rr).toFixed(1)+' '+(cy+Math.sin(a)*rr).toFixed(1);}return `<path d="${d}Z" fill="${c}"/>`;};
const shadow=(id,d)=>`<defs><filter id="${id}" x="-30%" y="-30%" width="170%" height="170%"><feDropShadow dx="6" dy="9" stdDeviation="7" flood-color="#000" flood-opacity="${d?.45:.22}"/></filter></defs>`;
const ART={};

/* ---------- Galaxy ---------- */
ART.galaxy=(function(){
 const PLV='0 0 200 200',MV='0 0 60 60',CV='0 0 160 60';
 const planet=(a='#9B7BFF',b='#5FD4F4')=>`<defs><radialGradient id="pg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#F2EFFF"/><stop offset=".4" stop-color="${a}"/><stop offset="1" stop-color="#2B1E55"/></radialGradient></defs>
  <ellipse cx="100" cy="104" rx="96" ry="22" fill="none" stroke="${b}" stroke-width="7" opacity=".55" transform="rotate(-18 100 104)"/>
  <circle cx="100" cy="100" r="62" fill="url(#pg)"/>
  <ellipse cx="78" cy="78" rx="20" ry="12" fill="#fff" opacity=".18" transform="rotate(-25 78 78)"/>
  <circle cx="124" cy="118" r="11" fill="#2B1E55" opacity=".35"/><circle cx="84" cy="124" r="7" fill="#2B1E55" opacity=".3"/>
  <ellipse cx="100" cy="104" rx="96" ry="22" fill="none" stroke="${b}" stroke-width="7" opacity=".9" transform="rotate(-18 100 104)" stroke-dasharray="150 400" stroke-dashoffset="-20"/>`;
 const moon=c=>`<circle cx="30" cy="30" r="26" fill="${c}"/><circle cx="21" cy="23" r="6" fill="#000" opacity=".16"/><circle cx="38" cy="36" r="4.5" fill="#000" opacity=".14"/><circle cx="33" cy="17" r="3" fill="#000" opacity=".12"/>`;
 const comet=c=>`<path d="M10 44 Q70 30 150 12" stroke="${c}" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/><circle cx="150" cy="12" r="9" fill="${c}"/><circle cx="150" cy="12" r="16" fill="${c}" opacity=".25"/>`;
 const constellation=c=>{const p=[[10,60],[48,34],[92,48],[128,16],[160,52],[128,86]];
  return p.map((a,i)=>i?`<line x1="${p[i-1][0]}" y1="${p[i-1][1]}" x2="${a[0]}" y2="${a[1]}" stroke="${c}" stroke-width="1.6" opacity=".5"/>`:'').join('')
   +p.map(a=>`<circle cx="${a[0]}" cy="${a[1]}" r="3.4" fill="${c}"/>`).join('');};
 return {
  logo:['0 0 100 100',`<circle cx="50" cy="50" r="50" fill="#2B1E55"/>`+PL(planet(),PLV,12,12,76,76)+STAR('#FFD36E',84,16,8)],
  mark:[MV,moon('#C3A6FF')],
  decor:m=>{const d=m==='dark',ink=d?'#F2EFFF':'#6A4BD6';
   return shadow('gsh',d)
    +(d?Array.from({length:60},(_,i)=>`<circle cx="${(i*163)%1440}" cy="${(i*97)%880}" r="${(.8+(i%3)*.7).toFixed(1)}" fill="#F2EFFF" opacity="${(.2+(i%4)*.13).toFixed(2)}"/>`).join('')
       :Array.from({length:28},(_,i)=>`<circle cx="${(i*211)%1440}" cy="${(i*131)%880}" r="${(1+(i%3)*.6).toFixed(1)}" fill="#6A4BD6" opacity=".16"/>`).join(''))
    +`<g filter="url(#gsh)">`+PL(planet(d?'#9B7BFF':'#8A6BE0',d?'#5FD4F4':'#1D86AD'),PLV,1130,-70,380,380)+`</g>`
    +`<g filter="url(#gsh)">`+PL(moon(d?'#C3A6FF':'#B9A6FF'),MV,150,700,120,120)+PL(moon(d?'#FFD36E':'#D99B18'),MV,300,820,62,62)+`</g>`
    +OP(.85,PL(comet(d?'#5FD4F4':'#1D86AD'),CV,40,120,320,120,-8))
    +OP(.8,PL(constellation(ink),'0 0 170 100',1080,620,290,170))
    +OP(d?.5:.3,`<ellipse cx="720" cy="880" rx="520" ry="150" fill="${d?'#7B5CFF':'#C3B0FF'}"/>`);}
 };
})();

/* ---------- Cherry Blossom ---------- */
ART.cherry=(function(){
 const FV='0 0 80 80',BV='0 0 320 200',LNV='0 0 70 120';
 const flower=(a='#E7B7C2',b='#C98A9A')=>{let s='';for(let i=0;i<5;i++){const ang=i*72;
  s+=`<g transform="rotate(${ang} 40 40)"><path d="M40 40 C 24 34, 20 14, 40 6 C 60 14, 56 34, 40 40Z" fill="${i%2?b:a}"/><path d="M40 10 C 34 18, 34 30, 40 38" stroke="#fff" stroke-opacity=".45" stroke-width="1.4" fill="none"/></g>`;}
  return s+`<circle cx="40" cy="40" r="6.5" fill="#F2D9A8"/>`+[0,60,120,180,240,300].map(a=>`<line x1="40" y1="40" x2="${(40+Math.cos(a*Math.PI/180)*13).toFixed(1)}" y2="${(40+Math.sin(a*Math.PI/180)*13).toFixed(1)}" stroke="#C98A9A" stroke-width="1.5"/>`).join('');};
 const branch=(c='#6B4A4E')=>`<path d="M0 170 C 70 150, 110 120, 150 70 C 180 34, 240 18, 318 10" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M110 128 C 140 112, 150 86, 146 56" stroke="${c}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
  <path d="M206 44 C 226 62, 252 68, 280 62" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`
  +PL(flower(),FV,120,24,56,56)+PL(flower(),FV,186,6,46,46,20)+PL(flower(),FV,256,30,50,50,-15)
  +PL(flower(),FV,96,96,42,42,30)+PL(flower(),FV,20,132,38,38,-20)+PL(flower(),FV,286,2,34,34,40);
 const petal=(c='#E7B7C2')=>`<path d="M20 2 C 36 10, 36 30, 20 38 C 4 30, 4 10, 20 2Z" fill="${c}"/>`;
 const lantern=(c='#B78993')=>`<path d="M35 6 V16" stroke="#6B4A4E" stroke-width="3"/><rect x="18" y="16" width="34" height="6" rx="2" fill="#6B4A4E"/>
  <path d="M22 22 H48 Q64 48 48 86 H22 Q6 48 22 22Z" fill="${c}"/><path d="M8 40 H62 M6 54 H64 M8 68 H62" stroke="#F4EDEE" stroke-width="2" opacity=".5"/>
  <rect x="24" y="86" width="22" height="6" rx="2" fill="#6B4A4E"/><path d="M35 92 v16" stroke="#C98A9A" stroke-width="3"/>`;
 return {
  logo:['0 0 100 100',`<circle cx="50" cy="50" r="50" fill="#D0BDBF"/>`+PL(flower('#F4E3E6','#E7B7C2'),FV,18,18,64,64)],
  mark:[FV,flower()],
  decor:m=>{const d=m==='dark';
   return shadow('csh',d)
    +`<g filter="url(#csh)">`+PL(branch(d?'#8A6A63':'#6B4A4E'),BV,-60,-40,620,390)+`</g>`
    +`<g filter="url(#csh)">`+PL(branch(d?'#8A6A63':'#6B4A4E'),BV,1020,600,560,350,180)+`</g>`
    +OP(.9,PL(lantern(d?'#8E5F6B':'#B78993'),LNV,120,470,86,150)+PL(lantern(d?'#7E5560':'#C9A2A9'),LNV,228,420,66,116))
    +[[520,160,18],[640,320,-30],[830,120,45],[400,560,10],[980,420,-60],[720,700,25],[1240,300,-15],[180,760,60],[560,840,-40],[1130,780,30],[300,300,-10],[900,620,50]]
      .map(([x,y,r],i)=>OP(d?.75:.65,PL(petal(i%3?(d?'#C58A98':'#E7B7C2'):(d?'#9C7A7D':'#D0BDBF')),'0 0 40 40',x,y,26,26,r))).join('');}
 };
})();

/* ---------- Woodland Leaf (from the Pharma Hub) ---------- */
ART.woodland=(function(){
 const WV='0 0 60 140',PV='0 0 80 120',OKV='0 0 110 120',MV='0 0 70 70';
 const wl=(a,b)=>`<path d="M30 4 C 2 40, 4 98, 30 132 Z" fill="${a}"/><path d="M30 4 C 58 40, 56 98, 30 132 Z" fill="${b}"/><path d="M30 8 L30 132 M30 30 L12 18 M30 50 L8 36 M30 72 L8 58 M30 94 L11 82 M30 114 L16 104 M30 30 L48 18 M30 50 L52 36 M30 72 L52 58 M30 94 L49 82 M30 114 L44 104" stroke="#fff" stroke-opacity=".24" stroke-width="1.6" fill="none"/><path d="M30 132 L31 140" stroke="#61402f" stroke-width="3" stroke-linecap="round"/>`;
 const C={green:['#688d57','#29594d'],moss:['#769f91','#508070'],tan:['#dbd1bc','#977359'],brown:['#977359','#61402f'],deep:['#597657','#1b3d2c']};
 const L=k=>wl(...C[k]);
 const pine=()=>`<rect x="36" y="96" width="8" height="22" fill="#61402f"/>`+[[4,40,18],[22,68,27],[44,100,36]].map(([t,b,h])=>`<path d="M40 ${t} L${40-h} ${b} L40 ${b}Z" fill="#688d57"/><path d="M40 ${t} L${40+h} ${b} L40 ${b}Z" fill="#29594d"/>`).join('');
 const oak=()=>{const cs=[[32,54,24],[78,54,24],[55,32,28],[55,62,24]];return `<path d="M50 118 L52 76 Q46 66 38 62 L42 60 Q50 64 54 70 Q58 62 66 58 L69 61 Q60 66 58 76 L60 118Z" fill="#61402f"/>`+cs.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#597657"/>`).join('')+cs.map(([x,y,r])=>`<circle cx="${x+5}" cy="${y+7}" r="${r*.6}" fill="#29594d" opacity=".45"/>`).join('')+cs.map(([x,y,r])=>`<circle cx="${x-6}" cy="${y-7}" r="${r*.62}" fill="#688d57"/><circle cx="${x-10}" cy="${y-12}" r="${r*.25}" fill="#769f91" opacity=".9"/>`).join('');};
 const mush=()=>`<path d="M28 36 Q26 60 22 66 H48 Q44 60 42 36Z" fill="#dbd1bc"/><path d="M4 40 Q35 -6 66 40 Q35 48 4 40Z" fill="#61402f"/><circle cx="22" cy="24" r="4" fill="#dbd1bc"/><circle cx="40" cy="16" r="3.5" fill="#dbd1bc"/><circle cx="50" cy="30" r="3" fill="#dbd1bc"/><circle cx="32" cy="32" r="2.5" fill="#dbd1bc"/>`;
 return {
  logo:['0 0 100 100',`<circle cx="50" cy="50" r="50" fill="#29594d"/>`+PL(L('tan'),WV,22,14,26,64,-30)+PL(L('green'),WV,40,8,30,74,26)],
  mark:[WV,L('green')],
  decor:m=>{const d=m==='dark';
   return shadow('wsh',d)
    +`<g filter="url(#wsh)">`+PL(L('deep'),WV,1310,150,110,260,-48)+PL(L('brown'),WV,1180,40,140,330,58)+PL(L('green'),WV,1250,-50,140,330,18)+PL(L('moss'),WV,1350,-10,120,290,-18)+PL(L('tan'),WV,1200,180,130,300,8)+`</g>`
    +`<g filter="url(#wsh)">`+PL(oak(),OKV,-50,560,240,262)+PL(pine(),PV,120,640,140,210)+PL(pine(),PV,220,720,100,150)+PL(pine(),PV,1300,700,120,180)+PL(pine(),PV,1210,760,90,135)+PL(mush(),MV,330,830,56,56)+`</g>`
    +[[600,40,'tan',40],[420,860,'green',-30],[980,850,'brown',70],[60,300,'moss',-20],[1100,500,'green',120],[760,880,'deep',20],[880,20,'brown',-60]]
      .map(([x,y,k,r])=>`<g filter="url(#wsh)">${PL(L(k),WV,x,y,30,70,r)}</g>`).join('');}
 };
})();

/* ---------- Mythical (from the Pharma Hub) ---------- */
ART.mythical=(function(){
 const SV='0 0 100 100',HV='0 0 100 110',KV='0 0 40 140',LV='0 0 60 150',CLV='0 0 60 150',AV='0 0 80 130',PGV='0 0 140 110',OWV='0 0 80 100';
 const wreath=(cx,cy,r,c)=>{let s='';for(let i=0;i<7;i++){[Math.PI*(0.62+i*0.11),Math.PI*(0.38-i*0.11)].forEach(a=>{const x=(cx+Math.cos(a)*r).toFixed(1),y=(cy+Math.sin(a)*r).toFixed(1);s+=`<ellipse cx="${x}" cy="${y}" rx="${(r*.13).toFixed(1)}" ry="${(r*.28).toFixed(1)}" transform="rotate(${(a*180/Math.PI).toFixed(0)} ${x} ${y})" fill="${c}"/>`;});}return s;};
 const shield=()=>`<circle cx="50" cy="50" r="48" fill="#d0ac72"/><circle cx="50" cy="50" r="44" fill="#906b41"/><circle cx="50" cy="50" r="40" fill="#2d4b65"/><circle cx="50" cy="50" r="34" fill="none" stroke="#d0ac72" stroke-width="2.5" stroke-dasharray="7 4"/>`+wreath(50,50,22,'#d0ac72')+`<circle cx="50" cy="50" r="7" fill="#d0ac72"/><path d="M22 30 A34 34 0 0 1 44 16" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>`;
 const helmet=()=>`<path d="M18 34 Q48 -8 88 30 L82 38 Q50 6 26 40Z" fill="#2d4b65"/><path d="M30 27 L34 35 M42 19 L44 29 M56 16 L56 26 M70 20 L68 30" stroke="#769aba" stroke-width="2.2"/><path d="M24 44 Q26 22 52 20 Q78 22 80 44 L82 80 Q80 98 64 106 L62 84 Q58 76 52 76 Q46 76 42 84 L40 106 Q24 98 22 80Z" fill="#906b41"/><path d="M32 42 Q36 28 52 26 Q42 32 38 46Z" fill="#d0ac72" opacity=".75"/><path d="M24 46 Q52 38 80 46" stroke="#d0ac72" stroke-width="2.4" fill="none"/><path d="M28 57 Q38 49 47 58 Q38 63 28 57Z" fill="#11141b"/><path d="M76 57 Q66 49 57 58 Q66 63 76 57Z" fill="#11141b"/><path d="M48 82 L56 82 L57 104 L47 104Z" fill="#11141b"/>`;
 const kopis=()=>`<path d="M16 44 C 30 70, 38 104, 24 138 C 28 104, 20 74, 10 46 Z" fill="#dcd3ca"/><path d="M14 54 C 22 74, 26 98, 22 120" stroke="#fff" stroke-width="1.5" opacity=".6" fill="none"/><path d="M10 42 L8 18 L14 18 L16 42Z" fill="#45301d"/><ellipse cx="13" cy="44" rx="7" ry="3.5" fill="#d0ac72"/><path d="M8 18 Q3 6 14 4 Q21 6 16 12 Q12 10 14 18Z" fill="#d0ac72"/>`;
 const laurel=(c='#d0ac72',c2='#906b41')=>{let s=`<path d="M28 148 Q22 80 34 6" stroke="${c2}" stroke-width="3" fill="none" stroke-linecap="round"/>`;for(let i=0;i<9;i++){const y=134-i*14,x=28+(148-y)/142*6;s+=`<ellipse cx="${(x-9).toFixed(1)}" cy="${y}" rx="9" ry="4.2" transform="rotate(-35 ${(x-9).toFixed(1)} ${y})" fill="${i%2?c:c2}"/><ellipse cx="${(x+9).toFixed(1)}" cy="${y-7}" rx="9" ry="4.2" transform="rotate(35 ${(x+9).toFixed(1)} ${y-7})" fill="${i%2?c2:c}"/>`;}return s+`<ellipse cx="34" cy="6" rx="3.5" ry="7" fill="${c}"/>`;};
 const column=(f='#dcd3ca',l='#948371')=>`<rect x="4" y="2" width="52" height="7" rx="2" fill="${f}" stroke="${l}" stroke-width="1.5"/><path d="M8 9 H52 V18 H8Z" fill="${f}" stroke="${l}" stroke-width="1.5"/><circle cx="10" cy="15" r="6" fill="${f}" stroke="${l}" stroke-width="1.5"/><circle cx="50" cy="15" r="6" fill="${f}" stroke="${l}" stroke-width="1.5"/><rect x="14" y="20" width="32" height="110" fill="${f}" stroke="${l}" stroke-width="1.5"/><path d="M20 22 V128 M26 22 V128 M32 22 V128 M38 22 V128 M42 22 V128" stroke="${l}" stroke-width="1.2" opacity=".7"/><rect x="8" y="130" width="44" height="8" fill="${f}" stroke="${l}" stroke-width="1.5"/><rect x="3" y="138" width="54" height="10" rx="2" fill="${f}" stroke="${l}" stroke-width="1.5"/>`;
 const amph=()=>`<defs><clipPath id="amc"><path d="M30 14 H50 V24 Q76 40 72 80 Q68 112 48 124 H32 Q12 112 8 80 Q4 40 30 24Z"/></clipPath></defs><path d="M30 24 Q12 22 14 46" stroke="#906b41" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M50 24 Q68 22 66 46" stroke="#906b41" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M30 14 H50 V24 Q76 40 72 80 Q68 112 48 124 H32 Q12 112 8 80 Q4 40 30 24Z" fill="#906b41"/><g clip-path="url(#amc)"><rect x="0" y="62" width="80" height="20" fill="#11141b"/><path d="M4 76 L10 68 L16 76 L22 68 L28 76 L34 68 L40 76 L46 68 L52 76 L58 68 L64 76 L70 68 L76 76" stroke="#d0ac72" stroke-width="2" fill="none"/><rect x="0" y="94" width="80" height="4" fill="#11141b"/></g><rect x="26" y="8" width="28" height="6" rx="2" fill="#d0ac72"/>`;
 const peg=(c='#d0ac72',w='#dcd3ca')=>`<path d="M40 58 Q20 56 12 78 Q24 66 40 66Z" fill="${c}"/><path d="M48 66 L40 86 L44 104 L39 104 L34 86 L40 64Z M58 70 L56 92 L60 104 L55 104 L50 92 L52 72Z M92 70 L100 90 L104 104 L99 104 L95 92 L86 74Z M84 72 L84 96 L80 104 L76 104 L79 96 L78 74Z" fill="${c}"/><ellipse cx="70" cy="62" rx="32" ry="15" fill="${c}"/><path d="M90 56 L104 30 L114 32 L102 64Z" fill="${c}"/><path d="M104 28 Q112 18 124 24 L131 34 Q127 39 120 37 L112 37Z" fill="${c}"/><path d="M108 22 L110 13 L115 22Z" fill="${c}"/><path d="M64 52 Q54 22 70 2 Q76 20 80 22 Q84 6 98 0 Q96 24 90 32 Q100 20 114 18 Q104 40 82 54Z" fill="${w}"/><circle cx="118" cy="28" r="1.6" fill="#11141b"/>`;
 const owl=()=>`<path d="M14 32 L18 12 L30 26Z M66 32 L62 12 L50 26Z" fill="#948371"/><ellipse cx="40" cy="58" rx="28" ry="36" fill="#948371"/><ellipse cx="40" cy="68" rx="17" ry="23" fill="#dcd3ca"/><circle cx="28" cy="42" r="11" fill="#dcd3ca"/><circle cx="52" cy="42" r="11" fill="#dcd3ca"/><circle cx="28" cy="42" r="6" fill="#d0ac72"/><circle cx="52" cy="42" r="6" fill="#d0ac72"/><circle cx="28" cy="42" r="3" fill="#11141b"/><circle cx="52" cy="42" r="3" fill="#11141b"/><path d="M37 50 L43 50 L40 58Z" fill="#906b41"/><path d="M30 94 l-3 5 M34 95 l0 5 M46 95 l0 5 M50 94 l3 5" stroke="#906b41" stroke-width="2.5" stroke-linecap="round"/>`;
 return {
  logo:[SV,shield()],mark:[HV,helmet()],
  decor:m=>{const d=m==='dark',cf=d?'#192d45':'#cfc4b7',cl=d?'#2d4b65':'#a89a8a';
   return (d?Array.from({length:44},(_,i)=>`<circle cx="${(i*137)%1440}" cy="${(i*89)%560}" r="${(1+(i%3)*.6).toFixed(1)}" fill="#dcd3ca" opacity="${(.25+(i%4)*.12).toFixed(2)}"/>`).join(''):'')
    +`<defs><pattern id="gk" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 36 H36 V4 H8 V28 H28 V12 H16 V20" stroke="#d0ac72" stroke-width="3" fill="none"/></pattern></defs><rect x="0" y="856" width="1440" height="44" fill="url(#gk)" opacity="${d?.35:.45}"/>`
    +PL(column(cf,cl),CLV,-40,420,180,450)+PL(column(cf,cl),CLV,1300,420,180,450)
    +OP(d?.8:.7,PL(peg(d?'#d0ac72':'#906b41',d?'#dcd3ca':'#d0ac72'),PGV,600,-6,210,165,-6))
    +OP(.8,PL(laurel(),LV,240,690,60,200,30)+PL(laurel(),LV,300,720,50,170,-25))
    +PL(amph(),AV,120,690,110,180,-8)+PL(owl(),OWV,1345,325,90,110)+PL(kopis(),KV,1160,690,50,170,40)+OP(d?.9:.8,PL(shield(),SV,960,760,110,110));}
 };
})();

/* ---------- Spiderman ---------- */
ART.spiderman=(function(){
 const WEBV='0 0 200 200',SPV='0 0 80 60',SKV='0 0 400 180',SWV='0 0 120 200';
 const web=(c='#F2F4F8')=>{let s='';
  for(let i=0;i<7;i++){const a=i*Math.PI/12;s+=`<line x1="0" y1="0" x2="${(Math.cos(a)*230).toFixed(1)}" y2="${(Math.sin(a)*230).toFixed(1)}" stroke="${c}" stroke-width="2"/>`;}
  for(let r=30;r<=200;r+=28){let d='';for(let i=0;i<7;i++){const a=i*Math.PI/12,x=Math.cos(a)*r,y=Math.sin(a)*r;
   d+=(i?` Q${(Math.cos(a-Math.PI/24)*(r*.88)).toFixed(1)} ${(Math.sin(a-Math.PI/24)*(r*.88)).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`:`M${x.toFixed(1)} ${y.toFixed(1)}`);}
   s+=`<path d="${d}" stroke="${c}" stroke-width="1.8" fill="none"/>`;}
  return s;};
 const spider=(c='#121212')=>`<ellipse cx="40" cy="30" rx="10" ry="15" fill="${c}"/><ellipse cx="40" cy="14" rx="6.5" ry="6" fill="${c}"/>
  ${[[-1,0],[1,0]].map(([s])=>[[8,-6,26,-16],[10,2,30,4],[9,10,28,22],[6,16,22,32]].map(([x1,y1,x2,y2])=>
   `<path d="M${40+s*x1} ${30+y1} Q${40+s*(x1+14)} ${30+y1-8} ${40+s*x2} ${30+y2}" stroke="${c}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`).join('')).join('')}`;
 const skyline=(c)=>{const b=[[0,70,56],[60,40,70],[136,86,48],[190,30,64],[258,66,52],[316,50,84]];
  return b.map(([x,h,w])=>`<rect x="${x}" y="${180-h-40}" width="${w}" height="${h+40}" fill="${c}"/>`
   +Array.from({length:Math.floor(h/22)},(_,r)=>Array.from({length:Math.floor(w/22)},(_,k)=>
     ((r*7+k*3+x)%3?'':`<rect x="${x+8+k*22}" y="${180-h-30+r*22}" width="9" height="12" fill="#F0C040" opacity=".8"/>`)).join('')).join('')).join('');};
 const dropper=(body='#121212',mark='#D7263D')=>`<path d="M60 0 L60 96" stroke="#F2F4F8" stroke-width="3"/>
  <ellipse cx="60" cy="130" rx="30" ry="42" fill="${body}"/><ellipse cx="60" cy="96" rx="20" ry="18" fill="${body}"/>
  <path d="M60 112 q-9 22 0 44 q9 -22 0 -44Z" fill="${mark}"/>
  ${[[-1,0],[1,0]].map(([k])=>[[22,-14,74,-44],[27,4,86,10],[25,28,78,62],[17,46,60,92]].map(([x1,y1,x2,y2])=>
   `<path d="M${60+k*x1} ${130+y1} Q${60+k*(x1+40)} ${130+y1-26} ${60+k*x2} ${130+y2}" stroke="${body}" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')).join('')}
  <circle cx="52" cy="92" r="4.4" fill="#F2F4F8"/><circle cx="68" cy="92" r="4.4" fill="#F2F4F8"/>`;
 return {
  logo:['0 0 100 100',`<circle cx="50" cy="50" r="50" fill="#D7263D"/><g transform="translate(50 50) rotate(-30)">${web('#8E1526')}</g>`+PL(spider('#121212'),SPV,28,28,44,44)],
  mark:[SPV,spider('#121212')],
  decor:m=>{const d=m==='dark';
   return `<g transform="translate(0 0)" opacity="${d?.3:.22}">${web(d?'#AEBBD2':'#1B4FA0')}</g>`
    +`<g transform="translate(1440 0) rotate(90)" opacity="${d?.3:.22}">${web(d?'#AEBBD2':'#1B4FA0')}</g>`
    +OP(d?.75:.3,PL(skyline(d?'#1B2438':'#8694AD'),SKV,0,560,1440,340))
    +OP(d?.95:.85,PL(dropper(d?'#0C1018':'#14203A',d?'#E23636':'#D7263D'),SWV,1000,-10,250,420,6))
    +OP(.85,PL(spider(d?'#E23636':'#D7263D'),SPV,200,700,110,84,-10)+PL(spider(d?'#AEBBD2':'#14203A'),SPV,1180,460,70,54,22))
    +`<g transform="translate(240 120)" opacity="${d?.22:.16}">${web(d?'#E23636':'#D7263D')}</g>`;}
 };
})();

/* ---------- Lemon Shark ---------- */
ART.lemonshark=(function(){
 const SLV='0 0 100 100',SHV='0 0 220 110',WVV='0 0 400 80',BUV='0 0 40 40',PMV='0 0 140 160';
 const wedges=()=>{let s='';for(let k=0;k<9;k++){const a1=k*2*Math.PI/9+.1,a2=(k+1)*2*Math.PI/9-.1,r=35,p=(a,rr)=>`${(50+Math.cos(a)*rr).toFixed(1)} ${(50+Math.sin(a)*rr).toFixed(1)}`;
  s+=`<path d="M${p(a1,6)} L${p(a1,r)} A${r} ${r} 0 0 1 ${p(a2,r)} L${p(a2,6)}Z" fill="#F2D14E"/><path d="M${p(a1+.15,14)} L${p(a1+.12,r-5)} A${r-5} ${r-5} 0 0 1 ${p(a2-.12,r-5)} L${p(a2-.15,14)}Z" fill="#FBE9A0" opacity=".7"/>`;}return s;};
 const slice=()=>`<circle cx="50" cy="50" r="48" fill="#E0BC2B"/><circle cx="50" cy="50" r="43" fill="#FFFCE8"/>${wedges()}<circle cx="50" cy="50" r="4" fill="#FFFCE8"/><path d="M17 37 A34 34 0 0 1 40 15" stroke="#fff" stroke-width="4" opacity=".6" fill="none" stroke-linecap="round"/>`;
 const lemon=()=>`<defs><radialGradient id="lg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FBE9A0"/><stop offset=".5" stop-color="#F2D14E"/><stop offset="1" stop-color="#C9A41C"/></radialGradient></defs>
  <path d="M50 8 Q92 22 92 56 Q92 92 50 94 Q8 92 8 56 Q8 22 50 8Z" fill="url(#lg)"/><path d="M50 2 q3 6 0 10" stroke="#6E8F4E" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M52 6 q18 -8 30 2 q-16 10 -30 -2Z" fill="#6E8F4E"/><ellipse cx="32" cy="34" rx="11" ry="7" fill="#fff" opacity=".4" transform="rotate(-30 32 34)"/>`;
 const shark=(b='#8A9A9E',t='#5E7076')=>`<path d="M8 60 Q50 26 120 34 Q172 40 206 62 Q172 84 120 90 Q52 96 8 60Z" fill="${b}"/>
  <path d="M8 60 Q50 26 120 34 Q172 40 206 62 Q150 60 8 60Z" fill="${t}"/>
  <path d="M96 34 L104 2 L132 36Z" fill="${t}"/><path d="M86 88 L92 106 L116 90Z" fill="${b}"/>
  <path d="M206 62 L218 38 L214 62 L218 86Z" fill="${t}"/>
  <circle cx="34" cy="56" r="4.2" fill="#0E3B4A"/><path d="M14 68 Q34 74 54 72" stroke="#0E3B4A" stroke-width="2" fill="none" opacity=".6"/>
  <path d="M62 64 l0 10 M70 65 l0 11 M78 66 l0 11" stroke="${t}" stroke-width="2.4" stroke-linecap="round"/>`;
 const wave=(c)=>`<path d="M0 44 Q50 14 100 44 T200 44 T300 44 T400 44 L400 80 L0 80Z" fill="${c}"/>`;
 const bubble=c=>`<circle cx="20" cy="20" r="16" fill="none" stroke="${c}" stroke-width="3"/><circle cx="14" cy="14" r="4" fill="${c}" opacity=".6"/>`;
 const palm=()=>`<path d="M68 158 Q60 100 52 40" stroke="#A8894B" stroke-width="11" fill="none" stroke-linecap="round"/>
  ${[[-1,0],[1,0]].map(([s])=>[[0,-34],[22,-10],[30,18]].map(([dx,dy])=>
   `<path d="M52 40 Q${52+s*(40+dx)} ${40+dy-20} ${52+s*(76+dx)} ${40+dy+6} Q${52+s*(44+dx)} ${40+dy+2} 52 40Z" fill="#4E8F6A"/>`).join('')).join('')}
  <path d="M52 40 Q52 0 60 -16 Q68 4 62 40Z" fill="#6E9F78"/><circle cx="46" cy="48" r="6" fill="#C9A41C"/><circle cx="60" cy="50" r="5.5" fill="#C9A41C"/>`;
 return {
  logo:['0 0 100 100',`<circle cx="50" cy="50" r="50" fill="#1D7A8C"/>`+PL(slice(),SLV,16,16,68,68)],
  mark:[SLV,slice()],
  decor:m=>{const d=m==='dark';
   return shadow('lsh',d)
    +OP(d?.55:.4,PL(wave(d?'#0E4E5F':'#BCE3EA'),WVV,0,640,1480,300)+PL(wave(d?'#103A49':'#9ED3DD'),WVV,-80,730,1600,280))
    +`<g filter="url(#lsh)">`+PL(shark(d?'#D9BE6A':'#D8C27A',d?'#A8894B':'#B59A55'),SHV,900,540,520,260,-6)+`</g>`
    +`<g filter="url(#lsh)">`+PL(shark(d?'#B59A55':'#E2CF93',d?'#8A7340':'#C0A763'),SHV,120,330,300,150,8)+`</g>`
    +`<g filter="url(#lsh)">`+PL(lemon(),'0 0 100 100',1180,-40,230,230,18)+PL(slice(),SLV,60,60,150,150,-12)+PL(slice(),SLV,620,820,110,110,20)+`</g>`
    +`<g filter="url(#lsh)">`+PL(palm(),PMV,-30,500,280,320)+`</g>`
    +[[420,200,26],[470,140,18],[1020,300,22],[1070,240,14],[300,640,20],[760,420,16],[880,180,24]]
      .map(([x,y,s])=>OP(d?.5:.4,PL(bubble(d?'#9FC6CE':'#1D7A8C'),BUV,x,y,s,s))).join('');}
 };
})();

/* ---------- Lonely Rainy Winter ---------- */
ART.rainywinter=(function(){
 const TRV='0 0 200 260',FGV='0 0 100 170',LPV='0 0 60 200',TLV='0 0 50 130',BLV='0 0 200 180';
 const tree=(c='#0A1420',lean=0)=>{
  let s=`<path d="M100 260 Q96 170 92 96 Q90 60 86 18" stroke="${c}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  const limbs=[[96,150,30,96,-1],[94,124,34,62,1],[92,98,30,40,-1],[90,74,26,26,1],[88,52,20,14,-1],[95,176,24,122,1]];
  limbs.forEach(([x,y,len,ty,dir])=>{
   s+=`<path d="M${x} ${y} Q${x+dir*len*.7} ${y-len*.35} ${x+dir*len*1.5} ${ty}" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
   s+=`<path d="M${x+dir*len*.9} ${y-len*.25} Q${x+dir*len*1.3} ${y-len*.8} ${x+dir*len*1.7} ${y-len*1.1}" stroke="${c}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
   s+=`<path d="M${x+dir*len*1.2} ${y-len*.45} Q${x+dir*len*1.9} ${y-len*.5} ${x+dir*len*2.3} ${y-len*.2}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;});
  return `<g transform="rotate(${lean} 100 260)">${s}</g>`;};
 const figure=(coat='#101A27',umb='#16222F',rim='#5B7390')=>`
  <path d="M50 4 Q94 30 96 58 L50 46 L4 58 Q6 30 50 4Z" fill="${umb}"/>
  <path d="M4 58 Q18 50 28 58 Q38 50 50 58 Q62 50 72 58 Q82 50 96 58" stroke="${rim}" stroke-width="3" fill="none"/>
  <path d="M50 4 v2" stroke="${rim}" stroke-width="3"/><path d="M50 46 L50 92" stroke="${rim}" stroke-width="3"/>
  <path d="M50 92 q-8 4 -2 10" stroke="${rim}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="44" cy="86" r="10" fill="${coat}"/>
  <path d="M34 96 q10 -6 20 0 q10 6 8 30 l-4 24 h-30 l-2 -26 q0 -22 8 -28Z" fill="${coat}"/>
  <path d="M54 100 q6 -4 0 -10" stroke="${coat}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M30 150 l6 22 l8 -2 l-2 -22Z M46 150 l4 24 l9 -4 l-3 -22Z" fill="${coat}"/>
  <path d="M34 170 l12 4 M50 172 l12 -2" stroke="${coat}" stroke-width="6" stroke-linecap="round"/>`;
 const lamp=(pole='#15212E',glow='#D8C7A0')=>`<rect x="26" y="40" width="7" height="156" fill="${pole}"/>
  <path d="M29 40 Q29 18 50 16" stroke="${pole}" stroke-width="7" fill="none"/>
  <path d="M40 16 h22 l6 18 h-34Z" fill="${pole}"/><ellipse cx="51" cy="34" rx="12" ry="4" fill="${glow}"/>
  <path d="M51 36 L26 110 L76 110Z" fill="${glow}" opacity=".16"/>
  <rect x="18" y="192" width="24" height="8" rx="3" fill="${pole}"/>`;
 const light=(body='#121C27',on='#C2413C')=>`<rect x="20" y="52" width="7" height="78" fill="${body}"/>
  <rect x="7" y="4" width="34" height="52" rx="8" fill="${body}"/>
  <circle cx="24" cy="16" r="7.5" fill="${on}"/><circle cx="24" cy="16" r="14" fill="${on}" opacity=".3"/>
  <circle cx="24" cy="32" r="7.5" fill="#2A3341"/><circle cx="24" cy="46" r="7.5" fill="#2A3341"/>
  <path d="M4 8 h40" stroke="${body}" stroke-width="5" stroke-linecap="round"/>`;
 const bank=c=>`<path d="M0 180 Q40 120 110 132 Q170 142 200 112 L200 180Z" fill="${c}"/>`;
 return {
  logo:['0 0 100 100',`<circle cx="50" cy="50" r="50" fill="#14202F"/>`+PL(tree('#0A1420'),TRV,24,6,52,88)+`<circle cx="74" cy="26" r="6" fill="#C2413C"/>`],
  mark:[FGV,figure()],
  decor:m=>{const d=m!=='light';
   const trunk=d?'#050C15':'#41566C',coat=d?'#05080D':'#1E2C3C',umb=d?'#0A1118':'#2F4358',rim=d?'#8CA6BF':'#9FB6CA',
         snow=d?'#23344A':'#EDF3F8',pole=d?'#070E17':'#33465A',glow=d?'#F0DCAE':'#9C7B3E',red=d?'#E2504A':'#B23B36';
   return shadow('rsh',d)
    /* a colder sky above a paler horizon, so the silhouettes read */
    +`<defs><linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="${d?'#162739':'#C3D2E0'}"/><stop offset=".55" stop-color="${d?'#101C2A':'#D7E0E9'}"/>
       <stop offset="1" stop-color="${d?'#0A1420':'#E6EDF4'}"/></linearGradient></defs>
      <rect x="0" y="0" width="1440" height="900" fill="url(#rsky)"/>
      <ellipse cx="520" cy="640" rx="820" ry="260" fill="${d?'#1D2E42':'#B9C9D8'}" opacity=".55"/>`
    /* falling snow and rain */
    +Array.from({length:70},(_,i)=>{const x=(i*193)%1440,y=(i*131)%900;
      return i%3? `<circle cx="${x}" cy="${y}" r="${(1+(i%3)*.8).toFixed(1)}" fill="${d?'#D9E4EF':'#6B8099'}" opacity="${(.2+(i%4)*.12).toFixed(2)}"/>`
                : `<line x1="${x}" y1="${y}" x2="${x-5}" y2="${y+22}" stroke="${d?'#9FB3C8':'#7489A0'}" stroke-width="1.4" opacity=".3"/>`;}).join('')
    /* snow banks along the pavement */
    +OP(d?.85:.9,PL(bank(snow),BLV,-40,700,760,260)+PL(bank(snow),BLV,840,720,680,240))
    /* the avenue of bare trees */
    +`<g filter="url(#rsh)">`+PL(tree(trunk,-3),TRV,980,120,420,620)+PL(tree(trunk,4),TRV,1230,210,330,500)+`</g>`
    +OP(.8,PL(tree(trunk,2),TRV,-60,320,300,440)+PL(tree(trunk,-5),TRV,160,420,210,310))
    /* overhead wires */
    +`<path d="M0 250 Q360 318 760 268" stroke="${trunk}" stroke-width="2.4" fill="none" opacity=".65"/>
      <path d="M0 292 Q360 356 760 302" stroke="${trunk}" stroke-width="2" fill="none" opacity=".5"/>`
    /* street lamp, traffic light and the lone walker */
    +`<g filter="url(#rsh)">`+PL(lamp(pole,glow),LPV,250,230,165,550)+`</g>`
    +`<g filter="url(#rsh)">`+PL(light(d?'#070E17':'#2B3B49',red),TLV,640,300,130,338)+`</g>`
    +`<g filter="url(#rsh)">`+PL(figure(coat,umb,rim),FGV,430,430,260,442)+`</g>`
    /* the glow of one far window */
    +OP(d?.5:.25,`<circle cx="1352" cy="470" r="40" fill="${glow}"/><rect x="1338" y="452" width="28" height="36" rx="4" fill="${glow}" opacity=".9"/>`);}
 };
})();

window.HubArt={ART,PL,OP,STAR};
})();
