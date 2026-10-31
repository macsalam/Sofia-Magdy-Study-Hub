/* Sofia Magdy's Maths Hub. Storage keys: math9-hub-v1 (progress), math9-prefs (font), math9-notes (notes), math9-times (marked times table facts). */
'use strict';
const KEY='math9-hub-v1',PKEY='math9-prefs',NKEY='math9-notes',TKEY='math9-times';
const DEF=()=>({mv:2,checks:{},done:{},stk:{},bq:{},cl:{},cards:{},quiz:{},sec:{},ch:1,later:{},view:'chapter'});
let S=DEF();
try{const raw=localStorage.getItem(KEY);if(raw){const o=JSON.parse(raw);S=Object.assign(DEF(),o);if(!o.mv)S.mv=0;}}catch(e){S=DEF();}
// done = steps ever answered (keeps later steps open after Clear); stk = stickers earned
for(const k in S.checks){if(!S.done[k])S.done[k]=1;if(!S.stk[k])S.stk[k]=1;}
// Topic 1.1 gained four new steps after step 3 (31 Oct 2026): move saved progress on old steps 4 to 6 along by four.
if(!S.mv){const mv=k=>{const m=/^1\.1-(\d+)$/.exec(k);return m&&+m[1]>=3?'1.1-'+(+m[1]+4):k;};
 for(const box of ['checks','done','stk']){const o={};for(const k in S[box])o[mv(k)]=S[box][k];S[box]=o;}
 const L={};for(const k in S.later){const nk=mv(k);L[nk]=Object.assign({},S.later[k],nk!==k?{i:+nk.split('-')[1]}:{});}S.later=L;S.mv=2;try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
let P={font:0};try{Object.assign(P,JSON.parse(localStorage.getItem(PKEY)||'{}'));}catch(e){}
const saveP=()=>{try{localStorage.setItem(PKEY,JSON.stringify(P));}catch(e){}};
let T={marks:{},tab:'grid',one:7,hide:false};try{Object.assign(T,JSON.parse(localStorage.getItem(TKEY)||'{}'));}catch(e){}
const saveT=()=>{try{localStorage.setItem(TKEY,JSON.stringify({marks:T.marks,tab:T.tab,one:T.one,hide:T.hide}));}catch(e){}};

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- maths notation helpers ---------- */
const F=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;            // fraction
const MX=(w,a,b)=>`${w}${F(a,b)}`;                                                        // mixed number
const SQ=x=>`<span class="rt"><span class="rs">√</span><span class="rr">${x}</span></span>`; // square root
const CR=x=>`<span class="rt"><span class="ri">3</span><span class="rs">√</span><span class="rr">${x}</span></span>`; // cube root
const PW=(b,e)=>`${b}<sup>${e}</sup>`;                                                    // power
const M=s=>`<span class="m">${s}</span>`;
const MI='−';
const SF=(a,n)=>`${a} × 10<sup>${n}</sup>`;                                               // standard form

/* ---------- falling cherry blossom petals ---------- */
(function petals(){const c=$('#snow');if(!c)return;const g=c.getContext('2d');let W,H,F=[];
 const COLS=['#B78993','#D0BDBF','#C99AA6','#E2B8C2','#B97C8C'];
 function size(){const d=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;c.width=W*d;c.height=H*d;g.setTransform(d,0,0,d,0,0);
  F=Array.from({length:Math.round(Math.min(46,W*H/26000))},()=>({x:Math.random()*W,y:Math.random()*H,s:7+Math.random()*9,v:.35+Math.random()*.6,w:Math.random()*6.3,rot:Math.random()*6.3,spin:(Math.random()-.5)*.02,flip:Math.random()*6.3,col:COLS[Math.floor(Math.random()*COLS.length)],a:.55+Math.random()*.35}));}
 size();addEventListener('resize',size);
 function petal(p){const k=Math.abs(Math.cos(p.flip))*.75+.25;g.save();g.translate(p.x,p.y);g.rotate(p.rot);g.scale(1,k);g.globalAlpha=p.a;
  const s=p.s;g.beginPath();g.moveTo(0,-s);g.bezierCurveTo(s*.85,-s*.75,s*.75,s*.55,0,s);g.bezierCurveTo(-s*.75,s*.55,-s*.85,-s*.75,0,-s);g.closePath();
  const gr=g.createLinearGradient(0,-s,0,s);gr.addColorStop(0,p.col);gr.addColorStop(1,'#EFEDEE');g.fillStyle=gr;g.fill();
  g.beginPath();g.moveTo(-s*.18,-s*.98);g.lineTo(0,-s*.72);g.lineTo(s*.18,-s*.98);g.fillStyle='rgba(239,237,238,.9)';g.fill();
  g.strokeStyle='rgba(97,87,86,.18)';g.lineWidth=.8;g.beginPath();g.moveTo(0,-s*.6);g.lineTo(0,s*.8);g.stroke();g.restore();}
 function draw(t){g.clearRect(0,0,W,H);for(const p of F){if(!reduceMotion){p.y+=p.v;p.x+=Math.sin(t/1700+p.w)*.55+.15;p.rot+=p.spin;p.flip+=.018;if(p.y>H+20){p.y=-20;p.x=Math.random()*W;}if(p.x>W+20)p.x=-20;}petal(p);}
  if(!reduceMotion)requestAnimationFrame(draw);}
 requestAnimationFrame(draw);})();

function toast(html,cls=''){const t=document.createElement('div');t.className='toast '+cls;t.setAttribute('role','status');t.innerHTML=html;document.body.appendChild(t);setTimeout(()=>t.remove(),cls==='big'?3600:2600);}

/* =================== CHAPTER 1 CONTENT (Number and calculation) =================== */
const C=(q,opts,ans,why)=>({q,opts,ans,why});
const Q=(p,q,a)=>({p,q,a});
const subs=(arr)=>`<div class="sub">${arr.map(([l,t])=>`<b>${l}</b><span>${t}</span>`).join('')}</div>`;

const TOPICS1=[
{id:'1.0',title:'Warm-up: Getting started',src:'Chapter 1 Introduction',
 goals:['remember square numbers and square roots','remember cube numbers and cube roots','get ready for numbers like '+SQ(2)],
 hook:{q:`Can you find a fraction that gives exactly 2 when you multiply it by itself?`,a:`Keep this question in mind. By the end of Topic 1.1 you'll know the answer: no fraction does it. ${SQ(2)} is a new kind of number, called an irrational number.`},
 big:`Some numbers have neat square roots, like ${SQ(16)} = 4. Others, like ${SQ(2)}, never come out neatly.`,
 steps:[
 {t:'Square numbers are real squares',refresh:true,body:`<p>Draw a square that is 3 tiles wide and 3 tiles tall. It has 3 × 3 = 9 tiles. That's why 9 is called a <span class="kw">square number</span>.</p>
  <p>Going backwards is called the <span class="kw">square root</span>. The square root of 9 is the side length: ${SQ(9)} = 3.</p>
  <div class="plain"><span class="kicker">In plain words</span><p>Square number = side × side. Square root = "what side made this square?"</p></div>
  <div class="ex"><span class="kicker">From the book</span><p>1, 4, 9 and 16 are the first four square numbers. ${SQ(1)} = 1, ${SQ(4)} = 2, ${SQ(9)} = 3, ${SQ(16)} = 4.</p></div>`,
  vis:'squares',check:C(`What is ${SQ(81)}?`,['8','9','40.5','81'],1,`9 × 9 = 81, so a square with 81 tiles has sides of 9.`)},
 {t:'Cube numbers are real cubes',refresh:true,body:`<p>Stack tiny blocks into a cube that is 4 blocks wide, 4 deep and 4 tall. You use 4 × 4 × 4 = 64 blocks. 64 is a <span class="kw">cube number</span>.</p>
  <p>Going backwards is the <span class="kw">cube root</span>: ${CR(64)} = 4.</p>
  <div class="plain"><span class="kicker">Learn these by heart</span><p>${M('1, 8, 27, 64, 125')} are ${PW(1,3)}, ${PW(2,3)}, ${PW(3,3)}, ${PW(4,3)}, ${PW(5,3)}.</p></div>
  <div class="ex"><span class="kicker">From the book's warm-up</span><p>${PW(5,3)} = 5 × 5 × 5 = 125 and ${CR(64)} = 4.</p></div>`,
  vis:'cubes',check:C(`What is ${PW(5,3)}?`,['15','25','125','555'],2,`${PW(5,3)} means 5 × 5 × 5. 5 × 5 = 25, and 25 × 5 = 125.`)},
 {t:'Is there a fraction that squares to 2?',body:`<p>${SQ(2)} must be between 1 and 2, because 1 × 1 = 1 and 2 × 2 = 4.</p>
  <p>The book tries some fractions. Each one gets closer to 2, but never exactly 2:</p>
  <div class="ex"><p>(${MX(1,1,2)})<sup>2</sup> = ${MX(2,1,4)} &nbsp;(too big)</p><p>(${MX(1,5,12)})<sup>2</sup> = ${MX(2,1,144)} &nbsp;(closer)</p><p>(${MX(1,169,408)})<sup>2</sup> = ${MX(2,1,166464)} &nbsp;(even closer)</p></div>
  <p>A calculator shows ${SQ(2)} = 1.414213562, but that is <b>rounded</b>. If you multiply 1.414213562 × 1.414213562, you don't get exactly 2.</p>`,
  vis:'closer',check:C(`The calculator shows ${SQ(2)} = 1.414213562. Is that the exact value?`,['Yes, calculators are always exact','No, it is rounded to fit the screen'],1,`The calculator cuts the decimal off to fit the screen, so 1.414213562 is a rounded value.`)}
 ],
 mistakes:[[`${SQ(2)} = 1.414213562 exactly, because the calculator says so.`,`That decimal is rounded. Multiplying it by itself doesn't give exactly 2.`],[`${SQ(9)} = 4.5, because 9 ÷ 2 = 4.5.`,`A square root is not "half". ${SQ(9)} = 3, because 3 × 3 = 9.`]],
 bq:[
  Q('Getting started · Question 1',`Write as a number: ${subs([['a',PW(12,2)],['b',SQ(81)],['c',PW(5,3)],['d',CR(64)]])}`,subs([['a','144'],['b','9'],['c','125'],['d','4']])),
  Q('Getting started · Question 2',`${PW(2,8)} = 256. Use this fact to work out the value of ${subs([['a',PW(2,9)],['b',PW(2,7)]])}`,subs([['a','512'],['b','128']])),
  Q('Getting started · Question 3',`Here is a multiplication: ${PW(15,5)} × ${PW(15,2)}.<br>Write the correct answer from this list: ${PW(15,7)} &nbsp; ${PW(15,10)} &nbsp; ${PW(30,7)} &nbsp; ${PW(30,10)}`,PW(15,7)),
  Q('Getting started · Question 4',`Write the answer to ${PW(15,5)} ÷ ${PW(15,2)} in index form.`,PW(15,3)),
  Q('Getting started · Question 5',`Look at these numbers: &nbsp;4 &nbsp; ${MI}4.5 &nbsp; 3000 &nbsp; ${MX(17,3,20)} &nbsp; ${SQ(225)}${subs([['a','Which of these numbers are integers?'],['b','Which of these numbers are rational numbers?']])}`,subs([['a',`4, 3000 and ${SQ(225)}`],['b','All of them.']])),
  Q('Getting started · Question 6','Write one million as a power of 10.',PW(10,6))
 ],
 checklist:[]},

{id:'1.1',title:'Irrational numbers',src:'Section 1.1',
 goals:['learn the difference between rational numbers and irrational numbers','use square numbers to estimate square roots','use cube numbers to estimate cube roots'],
 hook:{q:`${SQ(9)} = 3 exactly. What do you think ${SQ(7)} is?`,a:`It is between 2 and 3, because 2 × 2 = 4 and 3 × 3 = 9. A calculator shows 2.645751…, and the digits go on forever with no pattern. That makes ${SQ(7)} an irrational number.`},
 big:`A rational number can be written as a fraction. An irrational number can't: its decimal goes on forever with no repeating pattern.`,
 steps:[
 {t:'Integers and rational numbers',body:`<p><span class="kw">Integers</span> are whole numbers. They can be negative. For example 13, ${MI}26 and 100 004.</p>
  <p><span class="kw">Rational numbers</span> are numbers you can write as a fraction, like ${MX(9,3,4)} or ${MX(MI+'3',4,15)}.</p>
  <div class="plain"><span class="kicker">Good to know</span><p>Every integer is rational too: 5 = ${F(5,1)}.</p></div>`,
  vis:'sets',check:C('Is 13 a rational number?',['Yes, because 13 = 13/1','No, because it is not a fraction'],0,'Every integer can be written over 1, so every integer is rational.')},
 {t:'Fractions as decimals: they stop or repeat',body:`<p>Turn any fraction into a decimal and one of two things happens:</p>
  <ul><li>it <b>stops</b> (terminates): ${MX(9,3,4)} = 9.75</li><li>it <b>repeats</b> (recurs) forever: ${MX(18,5,11)} = 18.454545… (the 4 and 5 repeat)</li></ul>
  <div class="ex"><span class="kicker">From the book</span><p>${MX(MI+'3',4,15)} = ${MI}3.266666… (the 6 repeats)</p></div>`,
  vis:'tape',check:C(`${MX(18,5,11)} = 18.454545… What kind of decimal is this?`,['It stops','It repeats','It has no pattern'],1,'The digits 4 and 5 repeat forever, so it is a recurring decimal. That means it is rational.')},
 {t:'Irrational numbers and surds',body:`<p>Some numbers <b>never stop and never repeat</b>. These are <span class="kw">irrational numbers</span>. You can't write them as a fraction.</p>
  <p>${SQ(7)} = 2.645751… is irrational. So are ${SQ(23)}, ${CR(10)} and ${CR(45)}.</p>
  <p>An irrational square root or cube root has a special name: a <span class="kw">surd</span>.</p>
  <div class="plain"><span class="kicker">Not a surd, but irrational</span><p>π (pi) = 3.141592… is irrational, but it isn't a root, so it isn't called a surd.</p></div>`,
  vis:'sorter',check:C('Which one is a surd?',[SQ(9),SQ(7),'π',F(1,3)],1,`${SQ(7)} is an irrational root, so it is a surd. ${SQ(9)} = 3 is an integer, π is irrational but not a root, and ${F(1,3)} is rational.`)},
 {t:'Zoom in: √2 never settles down',body:`<p>Here is the clearest way to see the difference. Zoom in on a number line again and again, one decimal place at a time.</p>
  <ul><li>${F(3,8)} lands <b>exactly</b> on a mark after three zooms: 0.375. It stops.</li><li>${F(1,3)} is always the same distance into the gap: 0.333… The 3s repeat forever.</li><li>${SQ(2)} is never exactly on a mark, and its digits never fall into a repeating pattern: 1.41421356…</li></ul>
  <div class="plain"><span class="kicker">In plain words</span><p>Rational numbers either stop or repeat. Irrational numbers do neither, however far you zoom.</p></div>`,
  vis:'zoom',check:C('Which decimal belongs to an irrational number?',['0.375','0.333…','1.41421356…','2.5'],2,'1.41421356… is √2. It never stops and never repeats. 0.375 stops and 0.333… repeats, so those are rational.')},
 {t:'You can draw √2 exactly',body:`<p>Irrational numbers are real lengths, not just long decimals.</p>
  <p>Draw a 2 by 2 square. Its area is 4. Now join the middles of its sides to make a tilted square. The tilted square is exactly <b>half</b> of the big one, so its area is 2.</p>
  <p>A square with area 2 has sides of ${SQ(2)}. So you have drawn a line exactly ${SQ(2)} long, even though no fraction is equal to it.</p>
  <div class="ex"><span class="kicker">Pattern</span><p>Area 4 → side ${SQ(4)} = 2 (rational) &nbsp;·&nbsp; Area 2 → side ${SQ(2)} (irrational) &nbsp;·&nbsp; Area 9 → side ${SQ(9)} = 3 (rational)</p></div>`,
  vis:'area2',check:C('A square has an area of 5 cm². Is its side length rational or irrational?',['Rational','Irrational'],1,`The side is ${SQ(5)}. 5 is not a square number, so ${SQ(5)} is irrational.`)},
 {t:'Irrational numbers live on the number line too',body:`<p>Every irrational number has its own exact spot on the number line, between the rational numbers.</p>
  <p>To find roughly where a square root goes, use the square numbers either side: ${SQ(5)} is between ${SQ(4)} = 2 and ${SQ(9)} = 3.</p>
  <p>Tap each number to place it.</p>`,
  vis:'irrline',check:C('π is between which two whole numbers?',['2 and 3','3 and 4','4 and 5','31 and 32'],1,'π = 3.141592…, so it is between 3 and 4.')},
 {t:'Game: rational or irrational?',body:`<p>Time to practise sorting. Here is the quick test:</p>
  <div class="scrollx"><table class="dt"><tr><th>Rational</th><th>Irrational</th></tr><tr><td>integers, like −26 or 7</td><td>square roots of numbers that are not square numbers, like ${SQ(7)}</td></tr><tr><td>fractions, like ${F(23,8)}</td><td>cube roots of numbers that are not cube numbers, like ${CR(45)}</td></tr><tr><td>decimals that stop or repeat</td><td>π</td></tr><tr><td>roots that come out exactly, like ${SQ('1.21')} = 1.1</td><td></td></tr></table></div>
  <p>The numbers in the game all come from the book's exercise.</p>`,
  vis:'sortgame',check:C(`Is ${SQ('1.21')} rational or irrational?`,['Rational, because it equals 1.1','Irrational, because it is a square root'],0,`1.1 × 1.1 = 1.21, so ${SQ('1.21')} = 1.1, which stops. It is rational. This matches the book's answer to Exercise 1.1, Question 2b.`)},
 {t:'Is the square root a whole number?',refresh:true,body:`<p>Here is the quick test the book uses:</p>
  <ul><li>If the number <b>is</b> a square number (1, 4, 9, 16, 25, …), its square root is an integer. ${SQ(49)} = 7.</li><li>If it <b>isn't</b>, the square root is irrational. ${SQ(19)} is irrational.</li></ul>
  <div class="ex"><span class="kicker">Exercise 1.1, Question 1</span><p>${SQ(9)} is the integer 3. ${SQ(39)} is irrational, because 39 is not a square number.</p></div>`,
  vis:'sqtest',check:C(`Is ${SQ(100)} an integer or a surd?`,['An integer (10)','A surd'],0,'100 = 10 × 10 is a square number, so its square root is the integer 10.')},
 {t:'Squeeze a square root between two whole numbers',body:`<p>You can say where a square root sits without a calculator. Find the square numbers just below and just above.</p>
  <div class="ex"><span class="kicker">Worked example 1.1</span><p>Show that ${SQ(90)} is between 9 and 10.</p><p>${PW(9,2)} = 81 and ${PW(10,2)} = 100.</p><p>81 &lt; 90 &lt; 100, so 9 &lt; ${SQ(90)} &lt; 10.</p></div>
  <div class="plain"><span class="kicker">Recipe</span><p>1. List square numbers. 2. Find the two around your number. 3. Their roots are your answer.</p></div>`,
  vis:'sqline',check:C(`${SQ(55)} is between which two whole numbers?`,['5 and 6','6 and 7','7 and 8','27 and 28'],2,`${PW(7,2)} = 49 and ${PW(8,2)} = 64. 55 is between 49 and 64, so ${SQ(55)} is between 7 and 8.`)},
 {t:'Squeeze a cube root the same way',body:`<p>Same idea, but use cube numbers: ${M('1, 8, 27, 64, 125, 216, 343, 512, 729, 1000')}.</p>
  <div class="ex"><span class="kicker">Worked example 1.1</span><p>${CR(90)} is between N and N + 1. Find N.</p><p>${PW(4,3)} = 64 and ${PW(5,3)} = 125. 64 &lt; 90 &lt; 125.</p><p>So 4 &lt; ${CR(90)} &lt; 5, and N = 4.</p></div>`,
  vis:'crline',check:C(`${CR(100)} is between which two whole numbers?`,['3 and 4','4 and 5','9 and 10','33 and 34'],1,`${PW(4,3)} = 64 and ${PW(5,3)} = 125. 100 is between them, so ${CR(100)} is between 4 and 5.`)}
 ],
 mistakes:[[`${SQ(9)} is irrational because it's a square root.`,`${SQ(9)} = 3, an integer. Only roots that don't come out whole are irrational.`],[`Adding two irrational numbers always gives an irrational number.`,`Not always. The book says this is false: ${SQ(2)} + (${MI}${SQ(2)}) = 0.`],[`5.020020002… has a pattern, so it is rational.`,`A pattern that keeps growing isn't a repeating pattern. The book says it is not rational.`]],
 bq:[
  Q('Exercise 1.1 · Question 1',`Write whether each of these numbers is an integer or an irrational number. Explain how you know.${subs([['a',SQ(9)],['b',SQ(19)],['c',SQ(39)],['d',SQ(49)],['e',SQ(99)]])}`,subs([['a','integer, 3'],['b','irrational'],['c','irrational'],['d','integer, 7'],['e','irrational']])),
  Q('Exercise 1.1 · Question 2',`${subs([['a',`Write the rational numbers in this list: &nbsp;${SQ(1)} &nbsp; ${MX(7,5,12)} &nbsp; ${MI}38 &nbsp; ${SQ(160)} &nbsp; ${MI}${SQ('2.25')} &nbsp; ${MI}${SQ(35)}`],['b',`Write the irrational numbers in this list: &nbsp;0.3333… &nbsp; ${MI}16 &nbsp; ${SQ(200)} &nbsp; ${SQ('1.21')} &nbsp; ${F(23,8)} &nbsp; ${CR(343)}`]])}`,subs([['a',`${SQ(1)}, ${MX(7,5,12)}, ${MI}38 and ${MI}${SQ('2.25')} are rational.`],['b',`${SQ(200)} is the only irrational number.`]])),
  Q('Exercise 1.1 · Question 3',`Write whether each of these numbers is an integer or a surd. Explain how you know.${subs([['a',SQ(100)],['b',CR(100)],['c',SQ(1000)],['d',CR(1000)],['e',SQ(10000)],['f',CR(10000)]])}`,subs([['a','integer'],['b','surd'],['c','surd'],['d','integer'],['e','integer'],['f','surd']])),
  Q('Exercise 1.1 · Question 4',`Is each of these numbers rational or irrational? Give a reason for each answer.${subs([['a',`2 + ${SQ(2)}`],['b',SQ('2 + 2')],['c',`4 + ${CR(4)}`],['d',CR('4 + 4')]])}`,subs([['a',`irrational, because ${SQ(2)} is irrational`],['b',`rational, because it is equal to ${SQ(4)} = 2`],['c',`irrational, because ${CR(4)} is irrational`],['d',`rational, because it is equal to ${CR(8)} = 2`]])),
  Q('Exercise 1.1 · Question 5',`Find ${subs([['a','two irrational numbers that add up to 0'],['b','two irrational numbers that add up to 2.']])}`,`Your own answer. The course gives examples: ${subs([['a',`${SQ(2)} and ${MI}${SQ(2)}`],['b',`${SQ(2)} and 2 ${MI} ${SQ(2)}`]])}`),
  Q('Exercise 1.1 · Question 6 (Think like a mathematician)',`${subs([['a',`Use a calculator to find &nbsp;i ${SQ(8)} × ${SQ(2)} &nbsp; ii ${SQ(3)} × ${SQ(12)} &nbsp; iii ${SQ(20)} × ${SQ(5)} &nbsp; iv ${SQ(2)} × ${SQ(18)}`],['b','What do you notice about your answers?'],['c','Find another multiplication similar to the multiplications in part a.'],['d','Find similar multiplications using cube roots instead of square roots.']])}`,subs([['a','i 4 &nbsp; ii 6 &nbsp; iii 10 &nbsp; iv 6'],['b','They are all positive integers.'],['c','Your own answer.'],['d','Your own answer.']])),
  Q('Exercise 1.1 · Question 7',`Without using a calculator, show that ${subs([['a',`7 &lt; ${SQ(55)} &lt; 8`],['b',`4 &lt; ${CR(100)} &lt; 5`]])}`,subs([['a',`${PW(7,2)} = 49 and ${PW(8,2)} = 64`],['b',`${PW(4,3)} = 64 and ${PW(5,3)} = 125`]])),
  Q('Exercise 1.1 · Question 8','Without using a calculator, find an irrational number between'+subs([['a','4 and 5'],['b','12 and 13.']]),subs([['a','The square root of any integer between 16 and 25 is a possible answer.'],['b','The square root of any integer between 144 and 169 is a possible answer.']])),
  Q('Exercise 1.1 · Question 9',`Without using a calculator, estimate ${subs([['a',`${SQ(190)} to the nearest integer`],['b',`${CR(190)} to the nearest integer.`]])}`,subs([['a','14'],['b','6']])),
  Q('Exercise 1.1 · Question 10',`${subs([['a',`Use a calculator to find &nbsp;i (${SQ(2)} + 1) × (${SQ(2)} ${MI} 1) &nbsp; ii (${SQ(3)} + 1) × (${SQ(3)} ${MI} 1) &nbsp; iii (${SQ(4)} + 1) × (${SQ(4)} ${MI} 1)`],['b','Continue the pattern of the multiplications in part a.'],['c',`Generalise the results to find (${SQ('N')} + 1) × (${SQ('N')} ${MI} 1) where N is a positive integer.`],['d','Check your generalisation with further examples.']])}`,subs([['a','i 1 &nbsp; ii 2 &nbsp; iii 3'],['b',`(${SQ(5)} + 1) × (${SQ(5)} ${MI} 1) = 4, and so on`],['c',`(${SQ('N')} + 1) × (${SQ('N')} ${MI} 1) = N ${MI} 1`],['d','Your own answer.']])),
  Q('Exercise 1.1 · Question 11',`Here is a decimal: 5.020 020 002 000 020 000 020 000 002…<div class="speech" style="margin:10px 0 4px">There's a regular pattern here: one zero, then two zeros, then three, and so on. So this number is rational.</div><div class="who">Arun (his words are shortened here)</div>${subs([['a','Is Arun correct? Give a reason for your answer.'],['b',"Compare your answer with a partner's. Do you agree? If not, who is correct?"]])}`,subs([['a','No. It is not a repeating pattern.'],['b','Your own answer.']])),
  Q('Exercise 1.1 · Question 11 c (Reflection)',`Are these statements true or false?${subs([['i','The sum of two integers is always an integer.'],['ii','The sum of two rational numbers is always a rational number.'],['iii','The sum of two irrational numbers is always an irrational number.']])}<p>A calculator answer is 3.646 153 846, rounded to 9 decimal places. Can you decide whether the number is rational or irrational?</p>`,`${subs([['i','true'],['ii','true'],['iii','false']])}<p>No. The decimal might repeat or it might not, so you can't tell from the calculator answer.</p>`)
 ],
 checklist:['I know the difference between rational numbers and irrational numbers.','I can use square numbers to estimate a square root.','I can use cube numbers to estimate a cube root.']},

{id:'1.2',title:'Standard form',src:'Section 1.2',
 goals:['write large numbers in standard form','write small numbers in standard form'],
 hook:{q:'The Sun is about 149 600 000 km away. That is a lot of zeros to write. Is there a shorter way?',a:`Yes. In standard form it is ${SF('1.496',8)} km. The "8" tells you how many places to move the decimal point.`},
 big:`Standard form is a short way to write very big and very small numbers: a number from 1 up to (but not including) 10, times a power of 10.`,
 steps:[
 {t:'Multiplying by 10, 100, 1000',refresh:true,body:`<p>When you multiply by 10, every digit moves <b>one place to the left</b>. The number gets 10 times bigger.</p>
  <p>Dividing by 10 moves every digit <b>one place to the right</b>.</p>
  <div class="ex"><span class="kicker">From the book</span><p>4.67 × 10 = 46.7 &nbsp; 4.67 × 100 = 467 &nbsp; 4.67 × 1000 = 4670</p></div>
  <div class="plain"><span class="kicker">Tip</span><p>× 100 is just × 10, twice. × 1000 is × 10 three times.</p></div>`,
  vis:'pv',check:C('What is 4.67 × 100?',['4.6700','46.7','467','4670'],2,'× 100 moves the digits two places left: 4.67 → 46.7 → 467.')},
 {t:'Powers of 10',body:`<p>The small raised number on 10 tells you how many tens are multiplied together. It is the same as the number of zeros.</p>
  <div class="ex"><p>${PW(10,2)} = 10 × 10 = 100 (2 zeros)</p><p>${PW(10,3)} = 1000 (3 zeros)</p><p>${PW(10,6)} = 1 000 000 = one million</p><p>${PW(10,9)} = 1 000 000 000 = one billion</p></div>
  <p>So 4.67 × ${PW(10,2)} is the same as 4.67 × 100 = 467.</p>`,
  vis:'tens',check:C(`Which power of 10 is one million?`,[PW(10,5),PW(10,6),PW(10,7),PW(10,1000000)],1,`One million = 1 000 000 has 6 zeros, so it is ${PW(10,6)}.`)},
 {t:'What standard form looks like',body:`<p>A number in <span class="kw">standard form</span> has two parts:</p>
  <div class="bigm">a × 10<sup>n</sup></div>
  <ul><li><b>a</b> is at least 1 and less than 10 (written 1 ⩽ a &lt; 10)</li><li><b>n</b> is an integer (it can be negative)</li></ul>
  <div class="plain"><span class="kicker">Other name</span><p>Standard form is also called <span class="kw">scientific notation</span>.</p></div>
  <div class="ex"><span class="kicker">Exercise 1.2, Question 10</span><p>65 × ${PW(10,4)} is <b>not</b> standard form, because 65 is not between 1 and 10.</p></div>`,
  vis:'anatomy',check:C('Which one is in standard form?',['65 × 10<sup>4</sup>','6.5 × 10<sup>5</sup>','0.65 × 10<sup>6</sup>','6.5 × 100 000'],1,'Only 6.5 × 10<sup>5</sup> has a front number between 1 and 10 and a power of 10.')},
 {t:'Big numbers into standard form',body:`<p>Count how many places the decimal point hops to land just after the <b>first digit that isn't zero</b>. That count is the power.</p>
  <div class="ex"><span class="kicker">Worked example 1.2</span><p>256 million = 256 000 000. The point hops 8 places to sit after the 2.</p><p>So 256 million = ${SF('2.56',8)}.</p><p>25.6 billion = 25 600 000 000 = ${SF('2.56',10)}.</p></div>
  <p>Try your own numbers with the hopper.</p>`,
  vis:'hopper',check:C('Write 63 000 000 in standard form.',[SF('63',6),SF('6.3',7),SF('6.3',6),SF('0.63',8)],1,'The point hops 7 places to sit after the 6: 6.3 × 10<sup>7</sup>.')},
 {t:'Small numbers: negative powers',body:`<p>For numbers smaller than 1, the point hops to the <b>right</b>, and the power is <b>negative</b>.</p>
  <div class="ex"><span class="kicker">From the book</span><p>4.67 × 10<sup>${MI}1</sup> = 0.467 &nbsp; 4.67 × 10<sup>${MI}2</sup> = 0.0467 &nbsp; 4.67 × 10<sup>${MI}3</sup> = 0.00467</p><p>0.000 025 6 = ${SF('2.56',MI+'5')}</p></div>
  <div class="plain"><span class="kicker">Tip</span><p>Think of × 10<sup>${MI}1</sup> as ÷ 10.</p></div>`,
  vis:'tenstair',check:C('Write 0.000 812 in standard form.',[SF('8.12',4),SF('8.12',MI+'4'),SF('812',MI+'6'),SF('8.12',MI+'3')],1,'The point hops 4 places right to sit after the 8, so the power is −4.')},
 {t:'Comparing and adding',body:`<p><b>To compare</b>, look at the powers first. The bigger power wins. If the powers match, compare the front numbers.</p>
  <p><b>To add</b> numbers with the same power, add the front numbers and keep the power. Then tidy up if the front number is 10 or more.</p>
  <div class="ex"><span class="kicker">Exercise 1.2, Question 12</span><p>${SF('2.5',6)} + ${SF('3.6',6)} = ${SF('6.1',6)}</p><p>${SF('9.2',4)} + ${SF('8.3',4)} = 17.5 × 10<sup>4</sup> = ${SF('1.75',5)}</p></div>
  <div class="plain"><span class="kicker">Shortcut from Question 14</span><p>To multiply by 10, add 1 to the power. To multiply by 1000, add 3. To divide by 1000, subtract 3.</p></div>`,
  vis:'compare',check:C(`Which is bigger: ${SF(3,5)} or ${SF(9,4)}?`,[SF(3,5),SF(9,4),'They are equal'],0,`Compare the powers first: 5 is bigger than 4. ${SF(3,5)} = 300 000 and ${SF(9,4)} = 90 000.`)}
 ],
 mistakes:[[`65 × ${PW(10,4)} is in standard form.`,`The front number must be at least 1 and less than 10. It should be 6.5 × ${PW(10,5)}.`],[`0.0015 = 1.5 × 10<sup>3</sup>`,`Small numbers have a negative power: 0.0015 = 1.5 × 10<sup>${MI}3</sup>.`],[`${SF('9.2',4)} + ${SF('8.3',4)} = 17.5 × ${PW(10,4)}, and that's the final answer.`,`17.5 is too big for standard form. Write it as ${SF('1.75',5)}.`]],
 bq:[
  Q('Exercise 1.2 · Question 1','Write these numbers in standard form.'+subs([['a','300 000'],['b','320 000'],['c','328 000'],['d','328 710']]),subs([['a',SF(3,5)],['b',SF('3.2',5)],['c',SF('3.28',5)],['d',SF('3.2871',5)]])),
  Q('Exercise 1.2 · Question 2','Write these numbers in standard form.'+subs([['a','63 000 000'],['b','488 000 000'],['c','3 040 000'],['d','520 000 000 000']]),subs([['a',SF('6.3',7)],['b',SF('4.88',8)],['c',SF('3.04',6)],['d',SF('5.2',11)]])),
  Q('Exercise 1.2 · Question 3','These numbers are in standard form. Write each number in full.'+subs([['a',SF('5.4',3)],['b',SF('1.41',6)],['c',SF('2.337',10)],['d',SF('8.725',7)]]),subs([['a','5400'],['b','1 410 000'],['c','23 370 000 000'],['d','87 250 000']])),
  Q('Exercise 1.2 · Question 4',`Here are the distances of some planets from the Sun. Write each distance in standard form.<div class="scrollx"><table class="dt"><tr><th>Planet</th><th>Mercury</th><th>Mars</th><th>Uranus</th></tr><tr><th>Distance (km)</th><td>57 900 000</td><td>227 900 000</td><td>2 870 000 000</td></tr></table></div>`,`Mercury ${SF('5.79',7)} km; Mars ${SF('2.279',8)} km; Uranus ${SF('2.87',9)} km`),
  Q('Exercise 1.2 · Question 5',`Here are the areas of four countries.<div class="scrollx"><table class="dt"><tr><th>Country</th><th>China</th><th>Indonesia</th><th>Russia</th><th>Kazakhstan</th></tr><tr><th>Area (km<sup>2</sup>)</th><td>${SF('9.6',6)}</td><td>${SF('1.9',6)}</td><td>${SF('1.7',7)}</td><td>${SF('2.7',6)}</td></tr></table></div>${subs([['a','Which country has the largest area?'],['b','Which country has the smallest area?'],['c','Copy and complete this sentence with a whole number: The largest country is approximately … times larger than the smallest country.']])}`,subs([['a','Russia'],['b','Indonesia'],['c','The largest country is approximately 9 times larger than the smallest country.']])),
  Q('Exercise 1.2 · Question 6','Write these numbers in standard form.'+subs([['a','0.000 007'],['b','0.000 812'],['c','0.000 066 91'],['d','0.000 000 205']]),subs([['a',SF(7,MI+'6')],['b',SF('8.12',MI+'4')],['c',SF('6.691',MI+'5')],['d',SF('2.05',MI+'7')]])),
  Q('Exercise 1.2 · Question 7','These numbers are in standard form. Write each number in full.'+subs([['a',SF('1.5',MI+'3')],['b',SF('1.234',MI+'5')],['c',SF('7.9',MI+'8')],['d',SF('9.003',MI+'4')]]),subs([['a','0.0015'],['b','0.000 012 34'],['c','0.000 000 079'],['d','0.000 900 3']])),
  Q('Exercise 1.2 · Question 8',`The mass of an electron is ${SF('9.11',MI+'31')} kg. This is 0.000…911 kg.${subs([['a','How many zeros are there between the decimal point and the 9?'],['b','Work out the mass of 1 million electrons. Give the answer in kilograms in standard form.']])}`,subs([['a','30'],['b',SF('9.11',MI+'25')+' kg']])),
  Q('Exercise 1.2 · Question 9',`Here are four numbers: &nbsp;w = ${SF('9.81',MI+'5')} &nbsp; x = ${SF('2.8',MI+'4')} &nbsp; y = ${SF('9.091',MI+'5')} &nbsp; z = ${SF(4,MI+'4')}${subs([['a','Which number is the largest?'],['b','Which number is the smallest?']])}`,subs([['a','z'],['b','y']])),
  Q('Exercise 1.2 · Question 10',`${subs([['a',`Explain why the number 65 × ${PW(10,4)} is not in standard form.`],['b',`Write 65 × ${PW(10,4)} in standard form.`],['c',`Write 48.3 × ${PW(10,6)} in standard form.`]])}`,subs([['a','65 is not between 1 and 10.'],['b',SF('6.5',5)],['c',SF('4.83',7)]])),
  Q('Exercise 1.2 · Question 11','Write these numbers in standard form.'+subs([['a','15 × 10<sup>'+MI+'3</sup>'],['b','27.3 × 10<sup>'+MI+'4</sup>'],['c','50 × 10<sup>'+MI+'9</sup>']]),subs([['a',SF('1.5',MI+'2')],['b',SF('2.73',MI+'3')],['c',SF(5,MI+'8')]])),
  Q('Exercise 1.2 · Question 12','Do these additions. Write the answers in standard form.'+subs([['a',SF('2.5',6)+' + '+SF('3.6',6)],['b',SF('4.6',5)+' + '+SF('1.57',5)],['c',SF('9.2',4)+' + '+SF('8.3',4)]]),subs([['a',SF('6.1',6)],['b',SF('6.17',5)],['c',SF('1.75',5)]])),
  Q('Exercise 1.2 · Question 13','Do these additions. Write the answers in standard form.'+subs([['a',SF('4.5',MI+'6')+' + '+SF('3.1',MI+'6')],['b',SF('5.12',MI+'5')+' + '+SF('2.9',MI+'5')],['c',SF(9,MI+'8')+' + '+SF(7,MI+'8')]]),subs([['a',SF('7.6',MI+'6')],['b',SF('8.02',MI+'5')],['c',SF('1.6',MI+'7')]])),
  Q('Exercise 1.2 · Question 14',`${subs([['a',`Multiply these numbers by 10. Give each answer in standard form. &nbsp;i ${SF(7,5)} &nbsp; ii ${SF('3.4',6)} &nbsp; iii ${SF('4.1',MI+'5')} &nbsp; iv ${SF('1.37',MI+'4')}`],['b','Generalise your results from part a.'],['c','Describe how to multiply or divide a number in standard form by 1000.'],['d','What are the advantages of writing numbers in standard form?']])}`,subs([['a',`i ${SF(7,6)} &nbsp; ii ${SF('3.4',7)} &nbsp; iii ${SF('4.1',MI+'4')} &nbsp; iv ${SF('1.37',MI+'3')}`],['b','To multiply a number in standard form by 10, you add 1 to the index.'],['c','To multiply by 1000, add 3 to the index. To divide by 1000, subtract 3 from the index.'],['d','You can compare them easily, you don\'t need lots of zeros, and you can enter them in a calculator.']]))
 ],
 checklist:['I can write large numbers in standard form.','I can write small numbers in standard form.','I can write a number in standard form out in full.']},

{id:'1.3',title:'Indices',src:'Section 1.3',
 goals:['use positive, negative and zero indices','use the index laws for multiplication and division'],
 hook:{q:`${PW(3,2)} = 9 and ${PW(3,1)} = 3. Following the pattern, what could ${PW(3,0)} be?`,a:`Each step to the left divides by 3. 3 ÷ 3 = 1, so ${PW(3,0)} = 1. It looks strange, but it fits the pattern.`},
 big:`The index (the small raised number) counts how many times you multiply. Negative and zero indices follow the same pattern, just going the other way.`,
 steps:[
 {t:'What an index means',refresh:true,body:`<p>The <span class="kw">index</span> is the small raised number. It tells you how many copies to multiply.</p>
  <div class="ex"><p>${PW(3,4)} = 3 × 3 × 3 × 3 = 81</p><p>${PW(2,5)} = 2 × 2 × 2 × 2 × 2 = 32</p></div>
  <div class="plain"><span class="kicker">Careful</span><p>${PW(3,4)} is not 3 × 4. It is four 3s multiplied.</p></div>`,
  vis:'chips',check:C(`What is ${PW(2,5)}?`,['10','25','32','7'],2,`${PW(2,5)} = 2 × 2 × 2 × 2 × 2 = 32.`)},
 {t:'The powers of 3 staircase',body:`<p>Look at the powers of 3 from the book:</p>
  <div class="scrollx"><table class="dt"><tr><th>${PW(3,2)}</th><th>${PW(3,3)}</th><th>${PW(3,4)}</th><th>${PW(3,5)}</th><th>${PW(3,6)}</th></tr><tr><td>9</td><td>27</td><td>81</td><td>243</td><td>729</td></tr></table></div>
  <p>Move <b>right</b>: the index goes up 1 and you <b>multiply by 3</b>.</p><p>Move <b>left</b>: the index goes down 1 and you <b>divide by 3</b>.</p>
  <p>Keep going left past ${PW(3,1)} = 3 and you get ${PW(3,0)} = 1, then ${PW(3,MI+'1')} = ${F(1,3)}, then ${PW(3,MI+'2')} = ${F(1,9)}.</p>`,
  vis:'stair3',check:C(`What is ${PW(3,0)}?`,['0','1','3',F(1,3)],1,`3 ÷ 3 = 1, so ${PW(3,0)} = 1.`)},
 {t:'Zero and negative indices',body:`<p>The pattern works for every positive whole number, not only 3:</p>
  <div class="bigm">a<sup>0</sup> = 1 &nbsp;&nbsp;&nbsp; a<sup>${MI}n</sup> = ${F(1,'a<sup>n</sup>')}</div>
  <div class="ex"><span class="kicker">From the book</span><p>5<sup>${MI}2</sup> = ${F(1,PW(5,2))} = ${F(1,25)} &nbsp;&nbsp; 8<sup>${MI}3</sup> = ${F(1,PW(8,3))} = ${F(1,512)} &nbsp;&nbsp; ${PW(6,0)} = 1</p></div>
  <div class="plain"><span class="kicker">In plain words</span><p>A negative index means "1 over" the same power with a positive index.</p></div>`,
  vis:'negflip',check:C(`What is 4<sup>${MI}1</sup>?`,[MI+'4',F(1,4),'0','4'],1,`4<sup>${MI}1</sup> = ${F(1,PW(4,1))} = ${F(1,4)}. A negative index never makes the answer negative.`)},
 {t:'Multiplying powers: add the indices',body:`<p>When the base numbers are the same, count all the copies together.</p>
  <div class="ex"><p>${PW(3,2)} × ${PW(3,3)} = (3 × 3) × (3 × 3 × 3) = ${PW(3,5)}</p></div>
  <div class="bigm">n<sup>a</sup> × n<sup>b</sup> = n<sup>a + b</sup></div>
  <p>It also works with negative indices. The book shows ${PW(3,2)} × 3<sup>${MI}1</sup> = 3 and 3<sup>${MI}1</sup> × 3<sup>${MI}1</sup> = 3<sup>${MI}2</sup>.</p>`,
  vis:'mul',check:C(`Write 5<sup>4</sup> × 5<sup>${MI}2</sup> as a single power.`,[PW(5,2),PW(5,6),PW(5,MI+'8'),PW(25,2)],0,`Add the indices: 4 + (${MI}2) = 2. So the answer is ${PW(5,2)}.`)},
 {t:'Dividing powers: subtract the indices',body:`<p>Dividing cancels copies from the top and bottom.</p>
  <div class="ex"><p>${PW(2,5)} ÷ ${PW(2,3)} = ${F('2 × 2 × 2 × 2 × 2','2 × 2 × 2')} = ${PW(2,2)}</p></div>
  <div class="bigm">n<sup>a</sup> ÷ n<sup>b</sup> = n<sup>a ${MI} b</sup></div>
  <div class="ex"><span class="kicker">Exercise 1.3, Question 15</span><p>${PW(6,2)} ÷ ${PW(6,5)} = 6<sup>2 ${MI} 5</sup> = 6<sup>${MI}3</sup></p></div>`,
  vis:'div',check:C(`Write ${PW(10,3)} ÷ ${PW(10,8)} as a single power.`,[PW(10,5),'10<sup>'+MI+'5</sup>','10<sup>11</sup>',PW(1,5)],1,`Subtract the indices: 3 ${MI} 8 = ${MI}5. So the answer is 10<sup>${MI}5</sup>.`)},
 {t:'Changing the base number',body:`<p>Some numbers are powers of smaller numbers: 8 = ${PW(2,3)}, 27 = ${PW(3,3)}, 9 = ${PW(3,2)}.</p>
  <p>Swap them in, then add the indices:</p>
  <div class="ex"><span class="kicker">Exercise 1.3, Question 17</span><p>${PW(8,2)} = ${PW(2,3)} × ${PW(2,3)} = ${PW(2,6)}</p><p>${PW(27,2)} = ${PW(3,3)} × ${PW(3,3)} = ${PW(3,6)}</p></div>`,
  vis:'base',check:C(`Write ${PW(9,2)} as a power of 3.`,[PW(3,2),PW(3,3),PW(3,4),PW(3,18)],2,`9 = ${PW(3,2)}, so ${PW(9,2)} = ${PW(3,2)} × ${PW(3,2)} = ${PW(3,4)}.`)}
 ],
 mistakes:[[`${PW(3,0)} = 0`,`${PW(3,0)} = 1. Anything (except 0) to the power 0 is 1.`],[`5<sup>${MI}2</sup> = ${MI}25`,`A negative index means "1 over": 5<sup>${MI}2</sup> = ${F(1,25)}.`],[`${PW(3,2)} × ${PW(3,3)} = ${PW(3,6)} (multiplying the indices)`,`Add the indices when you multiply: ${PW(3,5)}.`]],
 bq:[
  Q('Exercise 1.3 · Question 1','Write each number as a fraction.'+subs([['a','4<sup>'+MI+'1</sup>'],['b','2<sup>'+MI+'3</sup>'],['c','9<sup>'+MI+'2</sup>'],['d','6<sup>'+MI+'3</sup>'],['e','10<sup>'+MI+'4</sup>'],['f','2<sup>'+MI+'5</sup>']]),subs([['a',F(1,4)],['b',F(1,8)],['c',F(1,81)],['d',F(1,216)],['e',F(1,'10 000')],['f',F(1,32)]])),
  Q('Exercise 1.3 · Question 2',`Here are five numbers: &nbsp;2<sup>${MI}4</sup> &nbsp; 3<sup>${MI}3</sup> &nbsp; 4<sup>${MI}2</sup> &nbsp; 5<sup>${MI}1</sup> &nbsp; ${PW(6,0)}<br>List the numbers in order of size, smallest first.`,`3<sup>${MI}3</sup>, then 2<sup>${MI}4</sup> and 4<sup>${MI}2</sup> (these two are equal), then 5<sup>${MI}1</sup>, then ${PW(6,0)}`),
  Q('Exercise 1.3 · Question 3','Write these numbers as powers of 2.'+subs([['a',F(1,2)],['b',F(1,4)],['c','64'],['d',F(1,64)],['e','1'],['f','8<sup>'+MI+'1</sup>']]),subs([['a','2<sup>'+MI+'1</sup>'],['b','2<sup>'+MI+'2</sup>'],['c',PW(2,6)],['d','2<sup>'+MI+'6</sup>'],['e',PW(2,0)],['f','2<sup>'+MI+'3</sup>']])),
  Q('Exercise 1.3 · Question 4','Write each number as a power of 10.'+subs([['a','100'],['b','1000'],['c','1'],['d','0.1'],['e','0.001'],['f','0.000 001']]),subs([['a',PW(10,2)],['b',PW(10,3)],['c',PW(10,0)],['d','10<sup>'+MI+'1</sup>'],['e','10<sup>'+MI+'3</sup>'],['f','10<sup>'+MI+'6</sup>']])),
  Q('Exercise 1.3 · Question 5',`Write ${F(1,64)}`+subs([['a','as a power of 64'],['b','as a power of 8'],['c','as a power of 4'],['d','as a power of 2.']]),subs([['a','64<sup>'+MI+'1</sup>'],['b','8<sup>'+MI+'2</sup>'],['c','4<sup>'+MI+'3</sup>'],['d','2<sup>'+MI+'6</sup>']])),
  Q('Exercise 1.3 · Question 6',subs([['a',`Write ${F(1,81)} as a power of a positive integer.`],['b','How many different ways can you write the answer to part a?']]),subs([['a',`3<sup>${MI}4</sup> or 9<sup>${MI}2</sup> or 81<sup>${MI}1</sup>`],['b','Three ways, the ones in part a.']])),
  Q('Exercise 1.3 · Question 7','When x = 6, find the value of'+subs([['a','x<sup>2</sup>'],['b','x<sup>'+MI+'2</sup>'],['c','x<sup>0</sup>'],['d','x<sup>'+MI+'3</sup>']]),subs([['a','36'],['b',F(1,36)],['c','1'],['d',F(1,216)]])),
  Q('Exercise 1.3 · Question 8','Write m<sup>'+MI+'2</sup> as a fraction when'+subs([['a','m = 9'],['b','m = 15'],['c','m = 1'],['d','m = 20']]),subs([['a',F(1,81)],['b',F(1,225)],['c','1'],['d',F(1,400)]])),
  Q('Exercise 1.3 · Question 9',`y = x<sup>2</sup> + x<sup>${MI}2</sup> and x is a positive number.${subs([['a','Write y as a mixed number when &nbsp;i x = 1 &nbsp; ii x = 2 &nbsp; iii x = 3'],['b','Find the value of x when &nbsp;i y = 25.04 &nbsp; ii y = 100.01']])}`,subs([['a',`i 2 &nbsp; ii ${MX(4,1,4)} &nbsp; iii ${MX(9,1,9)}`],['b','i x = 5 &nbsp; ii x = 10']])),
  Q('Exercise 1.3 · Question 10',`${subs([['a',`Write the answer to each multiplication as a power of 3. &nbsp;i ${PW(3,2)} × ${PW(3,3)} &nbsp; ii ${PW(3,4)} × ${PW(3,5)} &nbsp; iii ${PW(3,6)} × ${PW(3,4)} &nbsp; iv 3 × ${PW(3,5)}`],['b',`You used the rule 3<sup>a</sup> × 3<sup>b</sup> = 3<sup>a+b</sup> when the indices are positive integers. Show that the rule still gives the correct answers when a or b is negative: &nbsp;i ${PW(3,2)} × 3<sup>${MI}1</sup> &nbsp; ii 3<sup>${MI}2</sup> × 3 &nbsp; iii ${PW(3,3)} × 3<sup>${MI}1</sup> &nbsp; iv 3<sup>${MI}1</sup> × 3<sup>${MI}1</sup> &nbsp; v 3<sup>${MI}2</sup> × 3<sup>${MI}1</sup>`],['c','Write two examples of your own to show that the rule works.'],['d','Give your work to a partner to check.']])}`,subs([['a',`i ${PW(3,5)} &nbsp; ii ${PW(3,9)} &nbsp; iii ${PW(3,10)} &nbsp; iv ${PW(3,6)}`],['b',`i 3 &nbsp; ii 3<sup>${MI}1</sup> &nbsp; iii ${PW(3,2)} &nbsp; iv 3<sup>${MI}2</sup> &nbsp; v 3<sup>${MI}3</sup>`],['c','Your own answers.'],['d','Your own answers.']])),
  Q('Exercise 1.3 · Question 11','Write the answer to each multiplication as a power of 5.'+subs([['a',`${PW(5,4)} × ${PW(5,2)}`],['b',`${PW(5,4)} × 5<sup>${MI}2</sup>`],['c',`5<sup>${MI}4</sup> × ${PW(5,2)}`],['d',`5<sup>${MI}4</sup> × 5<sup>${MI}2</sup>`]]),subs([['a',PW(5,6)],['b',PW(5,2)],['c','5<sup>'+MI+'2</sup>'],['d','5<sup>'+MI+'6</sup>']])),
  Q('Exercise 1.3 · Question 12','Write the answer to each multiplication as a single power.'+subs([['a',`6<sup>${MI}3</sup> × ${PW(6,2)}`],['b',`${PW(7,5)} × 7<sup>${MI}2</sup>`],['c',`11<sup>${MI}4</sup> × 11<sup>${MI}6</sup>`],['d',`4<sup>${MI}6</sup> × ${PW(4,2)}`]]),subs([['a','6<sup>'+MI+'1</sup>'],['b',PW(7,3)],['c','11<sup>'+MI+'10</sup>'],['d','4<sup>'+MI+'4</sup>']])),
  Q('Exercise 1.3 · Question 13','Find the value of x in each case.'+subs([['a',`${PW(2,5)} × 2<sup>x</sup> = ${PW(2,9)}`],['b',`3<sup>x</sup> × 3<sup>${MI}2</sup> = ${PW(3,4)}`],['c',`4<sup>x</sup> × 4<sup>${MI}3</sup> = 4<sup>${MI}5</sup>`],['d',`12<sup>${MI}3</sup> × 12<sup>x</sup> = ${PW(12,2)}`]]),subs([['a','x = 4'],['b','x = 6'],['c',`x = ${MI}2`],['d','x = 5']])),
  Q('Exercise 1.3 · Question 14 (Think like a mathematician)',`${subs([['a',`Write as a single power: &nbsp;i ${PW(2,5)} ÷ ${PW(2,3)} &nbsp; ii ${PW(4,5)} ÷ ${PW(4,2)} &nbsp; iii ${PW(5,6)} ÷ ${PW(5,5)} &nbsp; iv ${PW(2,10)} ÷ ${PW(2,7)}`],['b',`The rule for part a is n<sup>a</sup> ÷ n<sup>b</sup> = n<sup>a ${MI} b</sup> when a and b are positive integers. Write some examples to show that this rule also works for indices that are negative integers.`],['c','Give your examples to a partner to check.']])}`,subs([['a',`i ${PW(2,2)} &nbsp; ii ${PW(4,3)} &nbsp; iii ${PW(5,1)} or 5 &nbsp; iv ${PW(2,3)}`],['b','Your own answers.'],['c','Your own answers.']])),
  Q('Exercise 1.3 · Question 15','Write the answer to each division as a single power.'+subs([['a',`${PW(6,2)} ÷ ${PW(6,5)}`],['b',`${PW(9,3)} ÷ ${PW(9,4)}`],['c',`${PW(15,2)} ÷ ${PW(15,6)}`],['d',`${PW(10,3)} ÷ ${PW(10,8)}`]]),subs([['a','6<sup>'+MI+'3</sup>'],['b','9<sup>'+MI+'1</sup>'],['c','15<sup>'+MI+'4</sup>'],['d','10<sup>'+MI+'5</sup>']])),
  Q('Exercise 1.3 · Question 16','Write the answer to each division as a single power.'+subs([['a',`${PW(2,2)} ÷ 2<sup>${MI}3</sup>`],['b',`${PW(8,5)} ÷ 8<sup>${MI}2</sup>`],['c',`5<sup>${MI}4</sup> ÷ ${PW(5,2)}`],['d',`12<sup>${MI}3</sup> ÷ 12<sup>${MI}5</sup>`]]),subs([['a',PW(2,5)],['b',PW(8,7)],['c','5<sup>'+MI+'6</sup>'],['d',PW(12,2)]])),
  Q('Exercise 1.3 · Question 17','Write down'+subs([['a',`${PW(8,2)} as a power of 2`],['b',`8<sup>${MI}2</sup> as a power of 2`],['c',`${PW(27,2)} as a power of 3`],['d',`27<sup>${MI}2</sup> as a power of 3`],['e',`${PW(27,2)} as a power of 9`],['f',`27<sup>${MI}2</sup> as a power of 9.`]]),subs([['a',PW(2,6)],['b','2<sup>'+MI+'6</sup>'],['c',PW(3,6)],['d','3<sup>'+MI+'6</sup>'],['e',PW(9,3)],['f','9<sup>'+MI+'3</sup>']]))
 ],
 checklist:['I can use positive, negative and zero indices.','I can use the index law for multiplication.','I can use the index law for division.']}
];

const KEYWORDS1=[
 {id:'k1',topic:'1.1',t:'integer',d:'A whole number. It can be positive, negative or zero, like 13, −26 or 100 004.'},
 {id:'k2',topic:'1.1',t:'rational number',d:'A number you can write as a fraction. Its decimal stops or repeats.'},
 {id:'k3',topic:'1.1',t:'irrational number',d:'A number you can\'t write as a fraction. Its decimal never stops and never repeats, like √7 = 2.645751…'},
 {id:'k4',topic:'1.1',t:'surd',d:'An irrational number that is a square root or a cube root, like √23 or ∛10.'},
 {id:'k5',topic:'1.2',t:'standard form',d:'A way to write a number as a × 10ⁿ, where a is from 1 up to (not including) 10 and n is an integer.'},
 {id:'k6',topic:'1.2',t:'scientific notation',d:'Another name for standard form.'},
 {id:'k7',topic:'1.3',t:'index',d:'The small raised number in a power. In 3⁴ the index is 4: multiply four 3s.'}
];

const CYP1=[
 {p:'1',q:'Write whether each number is rational or irrational.'+subs([['a',SQ(4)],['b',SQ(5)],['c',SQ('6.25')],['d',SQ('62.5')],['e',SQ(625)]]),a:subs([['a','rational'],['b','irrational'],['c','rational'],['d','irrational'],['e','rational']])},
 {p:'2',q:'Write whether each number is rational or irrational. Give a reason for each answer.'+subs([['a',SQ(PW(3,2)+' + '+PW(4,2))],['b',`${SQ(9)} + ${SQ(7)}`]]),a:subs([['a',`rational, because it is equal to ${SQ(25)} = 5`],['b',`irrational, because it is 3 + ${SQ(7)} and ${SQ(7)} is a surd`]])},
 {p:'3',q:`Without using a calculator, find an integer n such that n &lt; ${CR(50)} &lt; n + 1.`,a:'n = 3'},
 {p:'4',q:'Write each number in standard form.'+subs([['a','86 000 000 000'],['b','0.000 006 45']]),a:subs([['a',SF('8.6',10)],['b',SF('6.45',MI+'6')]])},
 {p:'5',q:`Write these numbers in order of size, smallest first.<br>A = ${SF(9,MI+'4')} &nbsp; B = ${SF(6,MI+'3')} &nbsp; C = ${SF(8,MI+'5')} &nbsp; D = ${SF('7.5',MI+'4')}`,a:'C, D, A, B'},
 {p:'6',q:'Write each number as a fraction.'+subs([['a','7<sup>'+MI+'2</sup>'],['b','3<sup>'+MI+'4</sup>'],['c','2<sup>'+MI+'7</sup>']]),a:subs([['a',F(1,49)],['b',F(1,81)],['c',F(1,128)]])},
 {p:'7',q:'Write each number as a power of 5.'+subs([['a','125'],['b','1'],['c','0.04']]),a:subs([['a',PW(5,3)],['b',PW(5,0)],['c','5<sup>'+MI+'2</sup>']])},
 {p:'8',q:'Write the answer to each calculation as the power of a single number.'+subs([['a',`${PW(6,8)} × 6<sup>${MI}3</sup>`],['b',`12<sup>${MI}2</sup> × 12<sup>${MI}3</sup>`],['c',`${PW(4,2)} ÷ ${PW(4,8)}`],['d',`15<sup>${MI}4</sup> ÷ 15<sup>${MI}6</sup>`]]),a:subs([['a',PW(6,5)],['b','12<sup>'+MI+'5</sup>'],['c','4<sup>'+MI+'6</sup>'],['d',PW(15,2)]])}
];

const QUIZ1=[
 C(`What is ${SQ(64)}?`,['6','8','32','16'],1,`8 × 8 = 64.`),
 C(`Which number is irrational?`,[SQ(36),SQ(30),'0.75',F(2,3)],1,`30 is not a square number, so ${SQ(30)} never stops and never repeats.`),
 C(`${MX(18,5,11)} = 18.4545… Is it rational?`,['Yes, the decimal repeats','No, the decimal goes on forever'],0,'A decimal that repeats forever comes from a fraction, so it is rational.'),
 C(`${SQ(90)} is between`,['8 and 9','9 and 10','10 and 11','44 and 46'],1,`${PW(9,2)} = 81 and ${PW(10,2)} = 100.`),
 C(`${CR(90)} is between`,['3 and 4','4 and 5','9 and 10','5 and 6'],1,`${PW(4,3)} = 64 and ${PW(5,3)} = 125.`),
 C(`Which is a surd?`,[CR(8),CR(10),SQ(25),'π'],1,`${CR(10)} is an irrational cube root. ${CR(8)} = 2 and ${SQ(25)} = 5 are integers, and π is not a root.`),
 C('Write 488 000 000 in standard form.',[SF('48.8',7),SF('4.88',8),SF('4.88',9),SF('488',6)],1,'The point hops 8 places to sit after the 4.'),
 C(`Write ${SF('1.41',6)} in full.`,['141 000','1 410 000','14 100 000','1.410 000'],1,'Move the point 6 places right: 1 410 000.'),
 C('Write 0.000 007 in standard form.',[SF(7,6),SF(7,MI+'6'),SF(7,MI+'5'),SF('0.7',MI+'5')],1,'The point hops 6 places right to sit after the 7, so the power is −6.'),
 C(`Which is smallest? ${SF(9,MI+'4')}, ${SF(6,MI+'3')}, ${SF(8,MI+'5')}`,[SF(9,MI+'4'),SF(6,MI+'3'),SF(8,MI+'5')],2,'The most negative power (−5) gives the smallest number.'),
 C(`What is 2<sup>${MI}3</sup>?`,[MI+'8',F(1,8),F(1,6),MI+'6'],1,`2<sup>${MI}3</sup> = ${F(1,PW(2,3))} = ${F(1,8)}.`),
 C(`What is ${PW(7,0)}?`,['0','1','7','70'],1,'Any non-zero number to the power 0 is 1.'),
 C(`${PW(6,8)} × 6<sup>${MI}3</sup> =`,[PW(6,5),PW(6,11),'6<sup>'+MI+'24</sup>',PW(36,5)],0,`Add the indices: 8 + (${MI}3) = 5.`),
 C(`${PW(4,2)} ÷ ${PW(4,8)} =`,[PW(4,6),'4<sup>'+MI+'6</sup>',PW(4,4),PW(1,6)],1,`Subtract the indices: 2 ${MI} 8 = ${MI}6.`),
 C('Write 125 as a power of 5.',[PW(5,2),PW(5,3),PW(5,25),PW(25,5)],1,'5 × 5 × 5 = 125.'),
 C(`Write ${PW(8,2)} as a power of 2.`,[PW(2,4),PW(2,5),PW(2,6),PW(2,16)],2,`8 = ${PW(2,3)}, so ${PW(8,2)} = ${PW(2,3)} × ${PW(2,3)} = ${PW(2,6)}.`)
];

/* chapters in the book (titles from the course contents); only chapter 1 is built so far */
const BOOK_CHAPTERS=[[1,'Number and calculation'],[2,'Expressions and formulae'],[3,'Decimals, percentages and rounding'],[4,'Equations and inequalities'],[5,'Angles'],[6,'Statistical investigations'],[7,'Shapes and measurements'],[8,'Fractions'],[9,'Sequences and functions'],[10,'Graphs'],[11,'Ratio and proportion'],[12,'Probability'],[13,'Position and transformation'],[14,'Volume, surface area and symmetry'],[15,'Interpreting and discussing results']];
const CHAPTERS_DATA={
 1:{title:'Number and calculation',topics:TOPICS1,kw:KEYWORDS1,cyp:CYP1,quiz:QUIZ1,cypNote:'The online course does not show marks for these questions.'}
};

/* =================== CHAPTER 2 CONTENT (Expressions and formulae) =================== */
const V_=s=>`<i>${s}</i>`;              // variable in italics
const X2=(b,e)=>`${b}<sup>${e}</sup>`;  // power with letters
const BR=s=>`(${s})`;
const work=lines=>`<div class="ex">${lines.map(l=>`<p class="m" style="white-space:normal">${l}</p>`).join('')}</div>`;

const TOPICS2=[
{id:'2.0',title:'Warm-up: Getting started',src:'Chapter 2 Introduction',
 goals:['remember that a letter stands for a number','remember the order of operations','get comfortable with negative numbers'],
 hook:{q:'Sara thinks of a number. She divides it by 3, then adds 7. How could you write that without knowing her number?',a:`Call her number ${V_('x')}. Then her answer is ${F('x',3)} + 7. That is an <b>expression</b>, and this chapter is all about them.`},
 big:'Algebra is just arithmetic with a letter standing in for a number you don\'t know yet.',
 steps:[
 {t:'A letter is a number in disguise',refresh:true,body:`<p>In algebra, a letter like ${V_('x')} stands for a number.</p>
  <p>When two things are written next to each other, they are <b>multiplied</b>: 3${V_('x')} means 3 × ${V_('x')}.</p>
  <div class="plain"><span class="kicker">Try it</span><p>If ${V_('x')} = 4, then 3${V_('x')} = 3 × 4 = 12, and ${V_('x')} + 5 = 9.</p></div>`,
  vis:'letterbox',check:C(`If ${V_('x')} = 5, what is 2${V_('x')} + 1?`,['8','11','26','16'],1,'2x means 2 × 5 = 10. Then 10 + 1 = 11.')},
 {t:'The order of operations',refresh:true,body:`<p>When a calculation has several parts, do them in this order:</p>
  <ol><li><b>Brackets</b> first</li><li><b>Indices</b> (powers like 4<sup>2</sup>)</li><li><b>Divide and multiply</b></li><li><b>Add and subtract</b> last</li></ol>
  <div class="plain"><span class="kicker">From the book</span><p>Work out brackets and indices before divisions and multiplications. Always work out additions and subtractions last.</p></div>`,
  vis:'order',check:C('What is 2 + 3 × 4?',['20','14','24','9'],1,'Multiply first: 3 × 4 = 12. Then add: 2 + 12 = 14.')},
 {t:'Negative numbers: the two big rules',refresh:true,body:`<p><b>Rule 1.</b> Subtracting a negative is the same as adding: 20 − (−18) = 20 + 18 = 38.</p>
  <p><b>Rule 2.</b> When you multiply or divide, two signs that are the same give a positive answer, and two different signs give a negative answer.</p>
  <div class="ex"><p>−3 × −2 = 6 &nbsp;&nbsp; 6 × −3 = −18 &nbsp;&nbsp; −12 ÷ 2 = −6</p></div>`,
  vis:'negline',check:C('What is 20 − (−18)?',['2','−38','38','−2'],2,'Subtracting −18 is the same as adding 18: 20 + 18 = 38.')}
 ],
 mistakes:[['3x means 3 + x.','3x means 3 × x. Letters next to numbers are multiplied.'],['2 + 3 × 4 = 20, working left to right.','Multiply before you add: 2 + 12 = 14.']],
 bq:[
  Q('Getting started · Question 1','Sara thinks of a number, '+V_('x')+'. She divides the number by 3, then adds 7. Write an expression for the number Sara gets.',`${F('x',3)} + 7`),
  Q('Getting started · Question 2','Copy and complete'+subs([['a','3<sup>2</sup> × 3<sup>4</sup> = 3<sup>□</sup>'],['b',`${F('5<sup>12</sup>','5<sup>9</sup>')} = 5<sup>□</sup>`],['c','(7<sup>2</sup>)<sup>5</sup> = 7<sup>□</sup>']]),subs([['a','3<sup>6</sup>'],['b','5<sup>3</sup>'],['c','7<sup>10</sup>']])),
  Q('Getting started · Question 3','Expand'+subs([['a','x(x + 2)'],['b','3y(4y − 7w)']]),subs([['a','x<sup>2</sup> + 2x'],['b','12y<sup>2</sup> − 21yw']])),
  Q('Getting started · Question 4','Factorise'+subs([['a','4x + 12'],['b','4x<sup>2</sup> + 14x']]),subs([['a','4(x + 3)'],['b','2x(2x + 7)']])),
  Q('Getting started · Question 5','Work out'+subs([['a',`${F(3,4)} + ${F(2,3)}`],['b',`${MX(2,1,2)} − ${MX(1,3,10)}`]]),subs([['a',`${F(17,12)} or ${MX(1,5,12)}`],['b',`${F(6,5)} or ${MX(1,1,5)}`]])),
  Q('Getting started · Question 6',subs([['a','Use the formula F = ma to work out F when m = 10 and a = 2.5.'],['b','Rearrange the formula F = ma to make a the subject.'],['c','Use your formula in part b to work out a when F = 72 and m = 12.']]),subs([['a','F = 25'],['b',`a = ${F('F','m')}`],['c','a = 6']]))
 ],
 checklist:[]},

{id:'2.1',title:'Substituting into expressions',src:'Section 2.1',
 goals:['use the correct order of operations in algebraic expressions'],
 hook:{q:`If ${V_('x')} = −3, is ${V_('x')}<sup>2</sup> equal to 9 or −9?`,a:`It is 9. ${V_('x')}<sup>2</sup> means (−3) × (−3), and two negatives multiplied give a positive. Writing −3<sup>2</sup> without brackets is the trap: the book shows this exact mistake in Pierre's homework.`},
 big:'Substitute means swap each letter for its number, put negative numbers in brackets, then follow the order of operations.',
 steps:[
 {t:'Swap the letters for numbers',body:`<p><b>Substitute</b> means replace each letter with its value. Write × signs back in, and put negative numbers in brackets so you don't lose the minus sign.</p>
  <div class="ex"><span class="kicker">Worked example 2.1a</span><p>5a − 6b when a = 4 and b = −3</p><p>= 5 × 4 − 6 × (−3)</p><p>= 20 − (−18) = 20 + 18 = 38</p></div>
  <p>Use the stepper to see each line appear.</p>`,
  vis:'subst',check:C('Work out a + 2b when a = −2 and b = 3.',['4','8','−8','1'],0,'a + 2b = −2 + 2 × 3 = −2 + 6 = 4. This is Exercise 2.1, Question 2b.')},
 {t:'Powers come before multiplying',body:`<p>If there is a power, work it out <b>before</b> you multiply.</p>
  <div class="ex"><span class="kicker">Worked example 2.1b</span><p>3x<sup>2</sup> − 2y<sup>3</sup> when x = −5 and y = 2</p><p>= 3 × (−5)<sup>2</sup> − 2 × 2<sup>3</sup></p><p>= 3 × 25 − 2 × 8 &nbsp;(powers first)</p><p>= 75 − 16 = 59</p></div>`,
  vis:'subst2',check:C(`When x = 2, what is x<sup>3</sup> + 3x?`,['12','14','216','18'],1,'Power first: 2³ = 8. Then 3 × 2 = 6. 8 + 6 = 14.')},
 {t:'The squared-negative trap',body:`<p>These look alike but are different:</p>
  <ul><li>(−3)<sup>2</sup> = (−3) × (−3) = <b>9</b></li><li>−3<sup>2</sup> = −(3 × 3) = <b>−9</b></li></ul>
  <p>When you substitute a negative number, <b>always use brackets</b>. Then square or cube the whole thing, sign included.</p>
  <div class="plain"><span class="kicker">Cubes keep the sign</span><p>(−2)<sup>3</sup> = (−2) × (−2) × (−2) = −8. An odd power of a negative number is negative.</p></div>`,
  vis:'negsq',check:C('What is (−2)<sup>3</sup>?',['8','−8','−6','6'],1,'(−2) × (−2) = 4, then 4 × (−2) = −8.')},
 {t:'Brackets and fractions inside expressions',body:`<p>Work out what is inside the brackets first. If there is a fraction, that counts as a division.</p>
  <div class="ex"><span class="kicker">Worked example 2.1c</span><p>p(5 − ${F('4q','p')}) when p = 2 and q = −3</p><p>= 2(5 − ${F('4 × (−3)',2)}) = 2(5 − (−6))</p><p>= 2 × 11 = 22</p></div>`,
  vis:'subst3',check:C(`Work out y<sup>2</sup> − ${F('10x','y')} when x = 3 and y = 5.`,['19','25','−5','20'],0,'Power: 5² = 25. Fraction: 10 × 3 ÷ 5 = 6. Then 25 − 6 = 19.')},
 {t:'Counter-examples',body:`<p>A <span class="kw">counter-example</span> is <b>one</b> example that shows a statement is not true.</p>
  <div class="ex"><span class="kicker">Dai's homework</span><p>Is 2x<sup>2</sup> = (2x)<sup>2</sup>? Let x = 3.</p><p>2x<sup>2</sup> = 2 × 3<sup>2</sup> = 2 × 9 = 18</p><p>(2x)<sup>2</sup> = (2 × 3)<sup>2</sup> = 6<sup>2</sup> = 36</p><p>18 ≠ 36, so the statement is not true.</p></div>`,
  vis:'counter',check:C('When x = 2, what is 3x<sup>2</sup>?',['36','12','6','18'],1,'Power first: 2² = 4, then 3 × 4 = 12. (3x)² would be 6² = 36, so they are different.')}
 ],
 mistakes:[['−3<sup>2</sup> = 9','Without brackets, only the 3 is squared: −3² = −9. Write (−3)² = 9.'],['20 − −18 = 2','Subtracting a negative means adding: 20 + 18 = 38.'],['2x² means (2x)²','Only the x is squared: 2x² = 2 × x × x.']],
 bq:[
  Q('Exercise 2.1 · Question 1','Copy and complete the workings to find the value of each expression when x = 3 and y = 5.'+subs([['a','x − 2y = 3 − 2 × 5 = 3 − □ = □'],['b','x<sup>3</sup> + xy = 3<sup>3</sup> + 3 × 5 = □ + □ = □'],['c',`y<sup>2</sup> − ${F('10x','y')} = (5)<sup>2</sup> − ${F('10 × 3',5)} = □ − ${F(30,5)} = □ − □ = □`]]),subs([['a','3 − 10 = −7'],['b','27 + 15 = 42'],['c',`25 − ${F(30,5)} = 25 − 6 = 19`]])),
  Q('Exercise 2.1 · Question 2','Work out the value of each expression when a = −2, b = 3, c = −4 and d = 6.'+subs([['a','b + d'],['b','a + 2b'],['c','2d − b'],['d','4b + 2a'],['e','bd − 10'],['f','d<sup>2</sup> + ab'],['g',`${F('d',2)} − a`],['h','20 + b<sup>3</sup>'],['i','ab + cd'],['j',`${F('bc','d')} + a`]]),subs([['a','9'],['b','4'],['c','9'],['d','8'],['e','8'],['f','30'],['g','5'],['h','47'],['i','−30'],['j','−4']])),
  Q('Exercise 2.1 · Question 3 (Think like a mathematician)',`The expression ab − ${F('c','d')} has a value of 24. Write values for a, b, c and d when`+subs([['i','a, b, c and d are all positive numbers'],['ii','a, b, c and d are all negative numbers'],['iii','a, b, c and d are a mixture of positive and negative numbers.']]),'Your own answers. The course gives examples:'+subs([['i','a = 3, b = 10, c = 12, d = 2'],['ii','a = −3, b = −10, c = −12, d = −2'],['iii','a = 3, b = 4, c = −36, d = 3']])),
  Q('Exercise 2.1 · Question 4',`This is part of Pierre's homework. The question was: work out the value of each expression when x = −3 and y = −2. a x<sup>2</sup> + xy &nbsp; b y<sup>3</sup> − ${F('6x','y')}`+work([`Pierre's a: −3<sup>2</sup> + −3 × −2 = −9 + 6 = −3`,`Pierre's b: (−2)<sup>3</sup> − ${F('6 × −3','−2')} = 8 − ${F('−18','−2')} = 8 − 9 = −1`])+subs([['a','Look at Pierre\'s answers. Do you think his working and answers are correct? Give a reason for your answer.']]),'Your own answer. For example: part a is incorrect, as −3<sup>2</sup> should be written as (−3)<sup>2</sup>, which is 9 and not −9. Part b is incorrect, as (−2)<sup>3</sup> is −8 and not 8.'),
  Q('Exercise 2.1 · Question 5 (Think like a mathematician)','The expression x<sup>2</sup> + y has a value of 15. Write down three pairs of integer values for x and y when'+subs([['a','x and y are both positive numbers'],['b','x and y are both negative numbers'],['c','x is negative and y is positive, or vice versa.']]),subs([['a','x = 1 and y = 14, x = 2 and y = 11, x = 3 and y = 6'],['b','Your own answer. For example: x = −4 and y = −1, x = −5 and y = −10, x = −6 and y = −21'],['c','Your own answer. For example: x = −1 and y = 14, x = −2 and y = 11, x = −3 and y = 6, or x = 4 and y = −1, x = 5 and y = −10, x = 6 and y = −21']])),
  Q('Exercise 2.1 · Question 6','Copy and complete the workings to find the value of each expression when m = 2 and p = −4.'+subs([['a','4(m + 2p) = 4(2 + 2 × −4) = 4(2 − □) = 4 × □ = □'],['b','p<sup>3</sup> − 3mp = (−4)<sup>3</sup> − 3 × 2 × −4 = □ + □ = □'],['c',`(${F('p','m')})<sup>5</sup> + p<sup>3</sup> = (${F('−4',2)})<sup>5</sup> + (−4)<sup>3</sup> = (□)<sup>5</sup> − □ = □ − □ = □`]]),subs([['a','4(2 − 8) = 4 × −6 = −24'],['b','−64 + 24 = −40'],['c','(−2)<sup>5</sup> − 64 = −32 − 64 = −96']])),
  Q('Exercise 2.1 · Question 7','Work out the value of each expression when w = 5, x = 2, y = −8 and z = −1.'+subs([['a','3(w + x)'],['b','x(2w − y)'],['c','3w − z<sup>3</sup>'],['d','(2x)<sup>3</sup>'],['e','x<sup>2</sup> + y<sup>2</sup>'],['f',`${F('wx','z')} + y`],['g','2(x<sup>3</sup> − z<sup>2</sup>)'],['h','25 − 2w<sup>2</sup>'],['i','w + z(2x − y)'],['j','(3z)<sup>4</sup> − z<sup>7</sup>']]),subs([['a','21'],['b','36'],['c','16'],['d','64'],['e','68'],['f','−18'],['g','14'],['h','−25'],['i','−7'],['j','82']])),
  Q('Exercise 2.1 · Question 8','Use a counter-example to show that these statements are not true (x ≠ 0, y ≠ 0).'+subs([['a','3x<sup>2</sup> = (3x)<sup>2</sup>'],['b','(−y)<sup>4</sup> = −y<sup>4</sup>'],['c','2(x + y) = 2x + y']]),'Your own counter-examples. The course gives:'+subs([['a','when x = 2, 3x<sup>2</sup> = 3 × 4 = 12 and (3x)<sup>2</sup> = 6<sup>2</sup> = 36, and 12 ≠ 36'],['b','when y = 2, (−y)<sup>4</sup> = (−2)<sup>4</sup> = 16 and −y<sup>4</sup> = −2<sup>4</sup> = −16, and 16 ≠ −16'],['c','when x = 3 and y = 4, 2(x + y) = 2 × 7 = 14 and 2x + y = 6 + 4 = 10, and 14 ≠ 10']])),
  Q('Exercise 2.1 · Question 9','Work out the value of each expression.'+subs([['a',`4(x<sup>2</sup> − 1) + ${F('x<sup>3</sup>',4)} + 12 when x = 2`],['b',`${F('3y − 5',2)} + 2y<sup>3</sup> − ${F(21,'y')} when y = 3`]]),subs([['a','26'],['b','49']])),
  Q('Exercise 2.1 · Question 10',subs([['a',`Show that 5a<sup>2</sup> − 9(b − a) + ${F(2,'b<sup>5</sup>')} + 7ab = ${F('−5a','b')} − 6a<sup>3</sup> − (ab)<sup>4</sup> + ${F(9,'b<sup>2</sup> − a<sup>3</sup>')} when a = −2 and b = −1.`],['b','Reflection: Which questions did you find easy, and which difficult? Do you feel confident using the order of operations and substituting negative numbers?']]),'Your own answers.')
 ],
 checklist:['I can use the correct order of operations in algebraic expressions.','I can substitute negative numbers into expressions.','I can use a counter-example to show a statement is not true.']},

{id:'2.2',title:'Constructing expressions',src:'Section 2.2',
 goals:['use letters to represent numbers','use the correct order of operations in algebraic expressions'],
 hook:{q:'Nasima thinks of a number, multiplies it by 2, then adds 9. Which is right: 9x + 2, 2x + 9, 2(x + 9) or 11x?',a:'2x + 9. First "multiply by 2" gives 2x, then "add 9" gives 2x + 9. This is Exercise 2.2, Question 2c.'},
 big:'An expression is a recipe for a number, written with a letter for the number you don\'t know.',
 steps:[
 {t:'Turning words into algebra',body:`<p>Each instruction becomes a small piece of algebra. Say Kara's number is n:</p>
  <div class="scrollx"><table class="dt"><tr><th>Words</th><th>Algebra</th></tr><tr><td>adds 5</td><td>n + 5</td></tr><tr><td>multiplies by 5</td><td>5n</td></tr><tr><td>divides by 5</td><td>${F('n',5)}</td></tr><tr><td>subtracts 5</td><td>n − 5</td></tr><tr><td>subtracts the number <b>from</b> 5</td><td>5 − n</td></tr></table></div>
  <p>Build your own with the number machine.</p>`,
  vis:'machine',check:C('Kara multiplies her number by 5, then subtracts 5. Which expression is right?',['5 − 5n','5n − 5','5(n − 5)','n − 25'],1,'Multiply first: 5n. Then subtract 5: 5n − 5.')},
 {t:'When to use brackets',body:`<p>If you <b>add or subtract first</b> and <b>then multiply</b>, the first part needs brackets.</p>
  <div class="ex"><span class="kicker">Worked example 2.2</span><p>Ahmad adds 3 to his number, then multiplies the result by 4: <b>4(n + 3)</b></p><p>Ahmad divides his number by 3, then subtracts 6: <b>${F('n',3)} − 6</b></p></div>
  <div class="plain"><span class="kicker">Why</span><p>4n + 3 would mean "multiply by 4, then add 3". The brackets show the adding happens first.</p></div>`,
  vis:'machine2',check:C('Luis subtracts 7 from his number, then multiplies the result by 5. Which expression is right?',['5x − 7','5(x − 7)','7 − 5x','x − 35'],1,'Subtracting happens first, so x − 7 goes in brackets, then × 5: 5(x − 7).')},
 {t:'Squares, roots and cubes',body:`<ul><li>multiplies the number by itself → n<sup>2</sup></li><li>square roots the number → ${SQ('n')}</li><li>cubes the number → n<sup>3</sup></li><li>cube roots the number → ${CR('n')}</li></ul>
  <div class="ex"><span class="kicker">Worked example 2.2</span><p>Multiplies the number by itself, then halves the result: ${F('n<sup>2</sup>',2)}</p><p>Square roots the number, then adds 5: ${SQ('n')} + 5</p></div>`,
  vis:'machine3',check:C('Which expression means "multiply the number by 3, square the result, then add 7"?',['3x<sup>2</sup> + 7','(3x)<sup>2</sup> + 7','3(x + 7)<sup>2</sup>','3x + 49'],1,'Multiply by 3 gives 3x. Squaring the result squares all of 3x: (3x)². Then + 7. The course also accepts 9x² + 7.')},
 {t:'Perimeter and area with letters',body:`<p><b>Perimeter</b> is the distance all the way round: add all four sides.</p><p><b>Area</b> is length × width.</p>
  <div class="ex"><span class="kicker">Mia's homework</span><p>Rectangle with length x + 5 and width 2x</p><p>Perimeter = x + 5 + 2x + x + 5 + 2x = 6x + 10</p><p>Area = 2x(x + 5) = 2x<sup>2</sup> + 10x</p></div>
  <div class="plain"><span class="kicker">Sofia's way</span><p>Perimeter = 2 × length + 2 × width = 2(x + 5) + 2(2x), then expand.</p></div>`,
  vis:'rect',check:C('A rectangle is 3x long and y wide. What is its area?',['3x + y','6x + 2y','3xy','3x<sup>2</sup>y'],2,'Area = length × width = 3x × y = 3xy.')},
 {t:'Check your expression with a number',body:`<p>Pick a number for x, and work out the answer two ways. If they match, your expression is right.</p>
  <div class="ex"><span class="kicker">Exercise 2.2, Question 4</span><p>When x = 3: length = 3 + 5 = 8, width = 2 × 3 = 6</p><p>Perimeter = 2 × 8 + 2 × 6 = 28</p><p>Using 6x + 10: 6 × 3 + 10 = 28 &nbsp;✓ They match.</p></div>`,
  vis:'rect2',check:C('Use x = 3 in 2x<sup>2</sup> + 10x. What do you get?',['48','36','60','28'],0,'Power first: 3² = 9, so 2 × 9 = 18. Then 10 × 3 = 30. 18 + 30 = 48, the same as 8 × 6.')}
 ],
 mistakes:[['"Subtracts the number from 5" is n − 5.','"From 5" means start with 5: 5 − n.'],['"Adds 3, then multiplies by 4" is 4n + 3.','The adding comes first, so it needs brackets: 4(n + 3).'],['Area of x + 5 by 2x is 2x × x + 5.','Multiply the whole length: 2x(x + 5) = 2x² + 10x.']],
 bq:[
  Q('Exercise 2.2 · Question 1','Kara thinks of a number, n. Write the correct expression from this list for the number Kara gets when she: &nbsp;<span class="m">5 − n &nbsp; 5(n + 5) &nbsp; 5n − 5 &nbsp; '+F('n − 5',5)+' &nbsp; n + 5 &nbsp; '+F('n',5)+' + 5</span>'+subs([['a','adds five to the number'],['b','multiplies the number by five, then subtracts five'],['c','divides the number by five, then adds five'],['d','adds five to the number, then multiplies by five'],['e','subtracts five from the number, then divides by five'],['f','subtracts the number from five.']]),subs([['a','n + 5'],['b','5n − 5'],['c',F('n',5)+' + 5'],['d','5(n + 5)'],['e',F('n − 5',5)],['f','5 − n']])),
  Q('Exercise 2.2 · Question 2','Luis thinks of a number, x. Write an expression, in terms of x, for the number Luis gets when he:'+subs([['a','multiplies the number by 7'],['b','subtracts the number from 20'],['c','(Nasima) multiplies the number by 2, then adds 9. Which is right: 9x + 2, 2x + 9, 2(x + 9) or 11x?'],['d','divides the number by 6, then subtracts 4'],['e','multiplies the number by itself'],['f','divides 100 by the number'],['g','subtracts 7 from the number, then multiplies the result by 5'],['h','square roots the number'],['i','cubes the number'],['j','cube roots the number'],['k','multiplies the number by 3, squares the result, then adds 7'],['l','multiplies the number by 2, cubes the result, then subtracts 100.']]),subs([['a','7x'],['b','20 − x'],['c','2x + 9'],['d',F('x',6)+' − 4'],['e','x<sup>2</sup>'],['f',F(100,'x')],['g','5(x − 7)'],['h',SQ('x')],['i','x<sup>3</sup>'],['j',CR('x')],['k','(3x)<sup>2</sup> + 7 or 9x<sup>2</sup> + 7'],['l','(2x)<sup>3</sup> − 100 or 8x<sup>3</sup> − 100']])),
  Q('Exercise 2.2 · Question 3','Write an expression for i the perimeter and ii the area of each rectangle. Write each expression in its simplest form.'+subs([['a','sides x and y'],['b','sides 3x and y'],['c','sides 3x and 2y'],['d','a square with sides x'],['e','a square with sides 2x'],['f','sides 2x and x<sup>2</sup>']]),subs([['a','i 2x + 2y &nbsp; ii xy'],['b','i 6x + 2y &nbsp; ii 3xy'],['c','i 6x + 4y &nbsp; ii 6xy'],['d','i 4x &nbsp; ii x<sup>2</sup>'],['e','i 8x &nbsp; ii 4x<sup>2</sup>'],['f','i 2x<sup>2</sup> + 4x &nbsp; ii 2x<sup>3</sup>']])),
  Q('Exercise 2.2 · Question 4','Mia\'s homework: a rectangle has length x + 5 and width 2x. Perimeter = x + 5 + 2x + x + 5 + 2x = 6x + 10. Area = 2x(x + 5) = 2x<sup>2</sup> + 10x.<div class="speech" style="margin-top:10px">I use a different method. I work out perimeter = 2(x + 5) + 2(2x), then I expand the brackets and simplify.</div><div class="who">Sofia</div>'+subs([['a','Show that Sofia\'s method will give the correct expression for the perimeter.'],['b','Critique each method. Whose method do you prefer? Explain why.'],['c','When x = 3, work out the length, width, perimeter and area.'],['d','When x = 3, work out 6x + 10 and 2x<sup>2</sup> + 10x.'],['e','What do you notice about your answers to parts c and d? Is this a good way to check your expressions?']]),subs([['a','2(x + 5) + 2(2x) = 2x + 10 + 4x = 6x + 10'],['b','Your own answer.'],['c','length 8, width 6, perimeter 2 × 8 + 2 × 6 = 28, area 8 × 6 = 48'],['d','6 × 3 + 10 = 28 and 2 × 3<sup>2</sup> + 10 × 3 = 18 + 30 = 48'],['e','Your own answer.']])),
  Q('Exercise 2.2 · Question 5','Write an expression for i the perimeter and ii the area of each rectangle, in its simplest form. iii Then use the value given to check your expressions.'+subs([['a','x + 2 by 3, with x = 4'],['b','y − 6 by 4, with y = 10'],['c','n by n + 4, with n = 6'],['d','p<sup>2</sup> by 4p, with p = 2']]),subs([['a','P = 2x + 10, A = 3x + 6; when x = 4, P = 18 and A = 18'],['b','P = 2y − 4, A = 4y − 24; when y = 10, P = 16 and A = 16'],['c','P = 4n + 8, A = n<sup>2</sup> + 4n; when n = 6, P = 32 and A = 60'],['d','P = 2p<sup>2</sup> + 8p, A = 4p<sup>3</sup>; when p = 2, P = 24 and A = 32']])),
  Q('Exercise 2.2 · Question 6 (Think like a mathematician)','Rods: blue x + 1, red x + 2, green 2x + 1, yellow 3x. Alicia shows that 3 red + 5 yellow = 3(x + 2) + 5(3x) = 18x + 6, and 6 green + 2 yellow = 6(2x + 1) + 2(3x) = 18x + 6, so they are the same length.'+subs([['a','Show that i 2 red + 2 yellow = 4 green &nbsp; ii 3 red + 3 yellow = 6 green &nbsp; iii 4 red + 4 yellow = 8 green'],['b','What does part a tell you about red, yellow and green rods?'],['c','Show that i 6 red + 2 yellow = 12 blue &nbsp; ii 9 red + 3 yellow = 18 blue &nbsp; iii 12 red + 4 yellow = 24 blue'],['d','What does part c tell you about red, yellow and blue rods?']]),subs([['a','i both 8x + 4 &nbsp; ii both 12x + 6 &nbsp; iii both 16x + 8'],['b','n red + n yellow = 2n green'],['c','i both 12x + 12 &nbsp; ii both 18x + 18 &nbsp; iii both 24x + 24'],['d','3n red + n yellow = 6n blue']])),
  Q('Exercise 2.2 · Question 7','A triangle has sides (3w)<sup>2</sup>, 2v(3v − 2w) and 5w(w + v).'+subs([['a','Work out the lengths of the sides when w = 2 and v = 3.'],['b','Use part a to work out the perimeter.'],['c','Write an expression for the perimeter. Show that it simplifies to 14w<sup>2</sup> + vw + 6v<sup>2</sup>.'],['d','Substitute w = 2 and v = 3 into your expression from part c. Check parts b and d match.']]),subs([['a','36, 30 and 50'],['b','116'],['c','9w<sup>2</sup> + 6v<sup>2</sup> − 4vw + 5w<sup>2</sup> + 5vw = 14w<sup>2</sup> + vw + 6v<sup>2</sup>'],['d','116']])),
  Q('Exercise 2.2 · Question 8 (Think like a mathematician)','A quadrilateral has sides 3a<sup>2</sup> − 7b, 8b − 3a, a<sup>2</sup> + 6b and 4(a + 3b).'+subs([['a','Work out the lengths of the sides when a = −5 and b = 2.'],['b','Work out the perimeter when a = −5 and b = 2.'],['c','Write an expression for the perimeter. Show that it simplifies to a + 4a<sup>2</sup> + 19b.'],['d','Use part c to work out the perimeter when a = −5 and b = 2.'],['e','Work out the perimeter when a = 4 and b = −3.'],['f','Is your answer to part e a valid measurement? Explain.']]),subs([['a','61, 31, 37 and 4'],['b','133'],['c','4a<sup>2</sup> + 7b − 3a + 4a + 12b = 4a<sup>2</sup> + a + 19b'],['d','133'],['e','11'],['f','Not valid: the perimeter is positive, but three of the side lengths are negative, which is not possible.']])),
  Q('Exercise 2.2 · Question 9','A rectangle has width 3x<sup>2</sup> + 4 and height 5 − x<sup>2</sup>.'+subs([['a','Write an expression for the perimeter.'],['b','Show that it simplifies to 2(2x<sup>2</sup> + 9).'],['c','Arun says: "When x = 2 and x = −2, you get the same perimeter." Is Arun correct? Show your working.']]),subs([['a','2(3x<sup>2</sup> + 4) + 2(5 − x<sup>2</sup>)'],['b','6x<sup>2</sup> + 8 + 10 − 2x<sup>2</sup> = 4x<sup>2</sup> + 18 = 2(2x<sup>2</sup> + 9)'],['c','Arun is correct. x only appears squared, and 2 and −2 give the same square: 2(2 × 4 + 9) = 34 both times.']])),
  Q('Exercise 2.2 · Question 10',subs([['a','A square has an area of 25 cm<sup>2</sup>. Show that its perimeter is 20 cm.'],['b','A square has an area of 49 cm<sup>2</sup>. Work out its perimeter.'],['c','A square has an area of x cm<sup>2</sup>. Write an expression for its perimeter.']]),subs([['a',`side = ${SQ(25)} = 5 cm, perimeter = 4 × 5 = 20 cm`],['b',`side = ${SQ(49)} = 7 cm, perimeter = 28 cm`],['c',`4${SQ('x')}`]])),
  Q('Exercise 2.2 · Question 11',subs([['a','A cube has side length x cm. Write an expression for its volume.'],['b','A cube has a volume of y cm<sup>3</sup>. Write an expression for its side length.']]),subs([['a','x<sup>3</sup>'],['b',CR('y')]]))
 ],
 checklist:['I can use letters to represent numbers.','I can write expressions from words, using brackets when needed.','I can write expressions for perimeter and area, and check them with a number.']},

{id:'2.3',title:'Expressions and indices',src:'Section 2.3',
 goals:['use the laws of indices in algebraic expressions'],
 hook:{q:'You know 3<sup>2</sup> × 3<sup>4</sup> = 3<sup>6</sup>. What do you think x<sup>2</sup> × x<sup>3</sup> is?',a:'x<sup>5</sup>. The same rules you used with numbers in Chapter 1 work with letters: when you multiply, you add the indices.'},
 big:'Multiply: add the indices. Divide: subtract them. Power of a power: multiply them.',
 steps:[
 {t:'What x³ really means',refresh:true,body:`<p>x<sup>3</sup> means x × x × x: three x's multiplied together.</p>
  <p>So x<sup>2</sup> × x<sup>3</sup> = (x × x) × (x × x × x). Count the x's: there are 5. That's x<sup>5</sup>.</p>`,
  vis:'xmul',check:C('How many x\'s are multiplied in x<sup>4</sup> × x<sup>5</sup>?',['20','9','1','45'],1,'4 + 5 = 9 x\'s altogether, so the answer is x⁹.')},
 {t:'Multiplying: add the indices',body:`<div class="bigm">x<sup>a</sup> × x<sup>b</sup> = x<sup>a + b</sup></div>
  <div class="ex"><span class="kicker">Worked example 2.3</span><p>x<sup>2</sup> × x<sup>3</sup> = x<sup>2 + 3</sup> = x<sup>5</sup></p></div>
  <div class="plain"><span class="kicker">Only for the same letter</span><p>You can add the indices only when the letters match.</p></div>`,
  vis:'xmul',check:C('Simplify m<sup>8</sup> × m<sup>6</sup>.',['m<sup>48</sup>','m<sup>14</sup>','m<sup>2</sup>','2m<sup>14</sup>'],1,'Add the indices: 8 + 6 = 14.')},
 {t:'Dividing: subtract the indices',body:`<div class="bigm">x<sup>a</sup> ÷ x<sup>b</sup> = x<sup>a − b</sup></div>
  <div class="ex"><span class="kicker">Worked example 2.3</span><p>y<sup>7</sup> ÷ y<sup>4</sup> = y<sup>7 − 4</sup> = y<sup>3</sup></p></div>
  <div class="ex"><span class="kicker">Exercise 2.3, Question 3</span><p>Arun says x<sup>2</sup> ÷ x<sup>2</sup> = 0, Sofia says 1, Zara says x.</p><p>Sofia is right: x<sup>2 − 2</sup> = x<sup>0</sup> = 1. Anything divided by itself is 1.</p></div>
  <p>If the bottom index is bigger, the answer has a negative index: q<sup>4</sup> ÷ q<sup>7</sup> = q<sup>−3</sup> = ${F(1,'q<sup>3</sup>')}.</p>`,
  vis:'xdiv',check:C('Simplify q<sup>9</sup> ÷ q<sup>4</sup>.',['q<sup>13</sup>','q<sup>5</sup>','q<sup>36</sup>','5q'],1,'Subtract the indices: 9 − 4 = 5.')},
 {t:'Power of a power: multiply the indices',body:`<div class="bigm">(x<sup>a</sup>)<sup>b</sup> = x<sup>a × b</sup></div>
  <p>(z<sup>3</sup>)<sup>4</sup> means z<sup>3</sup> written 4 times: z<sup>3</sup> × z<sup>3</sup> × z<sup>3</sup> × z<sup>3</sup> = z<sup>12</sup>.</p>
  <div class="ex"><span class="kicker">Worked example 2.3</span><p>(z<sup>3</sup>)<sup>4</sup> = z<sup>3 × 4</sup> = z<sup>12</sup></p></div>`,
  vis:'powpow',check:C('Simplify (y<sup>2</sup>)<sup>5</sup>.',['y<sup>7</sup>','y<sup>10</sup>','y<sup>25</sup>','5y<sup>2</sup>'],1,'Multiply the indices: 2 × 5 = 10.')},
 {t:'Numbers in front of the letters',body:`<p>Deal with the numbers and the letters separately.</p>
  <div class="ex"><span class="kicker">Kai's method</span><p>6x<sup>2</sup> × 3x<sup>4</sup> = 6 × 3 × x<sup>2</sup> × x<sup>4</sup> = 18x<sup>6</sup></p></div>
  <div class="ex"><span class="kicker">Sasha's method</span><p>6x<sup>5</sup> ÷ 3x<sup>2</sup> = ${F('6x<sup>5</sup>','3x<sup>2</sup>')}: 6 ÷ 3 = 2, and x<sup>5 − 2</sup> = x<sup>3</sup>, so 2x<sup>3</sup></p></div>
  <div class="plain"><span class="kicker">Watch the bracket</span><p>(3x<sup>2</sup>)<sup>3</sup> cubes <b>everything</b> inside: 3<sup>3</sup> × x<sup>6</sup> = 27x<sup>6</sup>, not 3x<sup>6</sup>.</p></div>
  <div class="plain"><span class="kicker">Adding like terms</span><p>6w<sup>4</sup> + 2w<sup>4</sup> = 8w<sup>4</sup>. When you add, the index stays the same.</p></div>`,
  vis:'coef',check:C('Simplify (3x<sup>2</sup>)<sup>3</sup>.',['3x<sup>6</sup>','27x<sup>6</sup>','9x<sup>5</sup>','27x<sup>5</sup>'],1,'Cube the 3 as well: 3³ = 27, and (x²)³ = x⁶. Arun was right in Question 8.')}
 ],
 mistakes:[['x² × x³ = x⁶ (multiplying the indices)','When you multiply, add the indices: x⁵.'],['x² ÷ x² = 0','x² ÷ x² = x⁰ = 1.'],['(3x²)³ = 3x⁶','The 3 is cubed too: 27x⁶.'],['5m³ + 3m³ = 8m⁶','When you add like terms, the index stays: 8m³.']],
 bq:[
  Q('Exercise 2.3 · Question 1','Copy and complete.'+subs([['a','x<sup>4</sup> × x<sup>5</sup> = x<sup>4+5</sup> = x<sup>□</sup>'],['b','y<sup>2</sup> × y<sup>4</sup> = y<sup>2+4</sup> = y<sup>□</sup>'],['c','u<sup>8</sup> ÷ u<sup>6</sup> = u<sup>8−6</sup> = u<sup>□</sup>'],['d','w<sup>5</sup> ÷ w = w<sup>5−1</sup> = w<sup>□</sup>'],['e','(g<sup>3</sup>)<sup>2</sup> = g<sup>3×2</sup> = g<sup>□</sup>'],['f','(h<sup>5</sup>)<sup>12</sup> = h<sup>5×12</sup> = h<sup>□</sup>'],['g','5m<sup>3</sup> + 3m<sup>3</sup> = □m<sup>3</sup>'],['h','8n<sup>2</sup> − n<sup>2</sup> = □n<sup>2</sup>']]),subs([['a','x<sup>9</sup>'],['b','y<sup>6</sup>'],['c','u<sup>2</sup>'],['d','w<sup>4</sup>'],['e','g<sup>6</sup>'],['f','h<sup>60</sup>'],['g','8m<sup>3</sup>'],['h','7n<sup>2</sup>']])),
  Q('Exercise 2.3 · Question 2','Simplify each expression.'+subs([['a','m<sup>8</sup> × m<sup>6</sup>'],['b','n<sup>9</sup> × n<sup>3</sup>'],['c','p<sup>6</sup> × p'],['d','q<sup>9</sup> ÷ q<sup>4</sup>'],['e','r<sup>6</sup> ÷ r<sup>3</sup>'],['f','t<sup>7</sup> ÷ t<sup>2</sup>'],['g','(x<sup>7</sup>)<sup>3</sup>'],['h','(y<sup>2</sup>)<sup>5</sup>'],['i','(z<sup>3</sup>)<sup>4</sup>'],['j','3t<sup>7</sup> + 2t<sup>7</sup>'],['k','8g<sup>2</sup> − 3g<sup>2</sup>'],['l','3h<sup>9</sup> + h<sup>9</sup> − 5h<sup>9</sup>']]),subs([['a','m<sup>14</sup>'],['b','n<sup>12</sup>'],['c','p<sup>7</sup>'],['d','q<sup>5</sup>'],['e','r<sup>3</sup>'],['f','t<sup>5</sup>'],['g','x<sup>21</sup>'],['h','y<sup>10</sup>'],['i','z<sup>12</sup>'],['j','5t<sup>7</sup>'],['k','5g<sup>2</sup>'],['l','−h<sup>9</sup>']])),
  Q('Exercise 2.3 · Question 3 (Think like a mathematician)','Arun, Sofia and Zara simplify x<sup>2</sup> ÷ x<sup>2</sup>. Arun: "I think the answer is 0." Sofia: "I think the answer is 1." Zara: "I think the answer is x."'+subs([['a','Do you agree with Arun, Sofia, Zara or none of them?'],['c','Write down the correct simplified expression for x<sup>2</sup> ÷ x<sup>2</sup>.'],['d','What can you say about x<sup>5</sup> ÷ x<sup>5</sup>, y<sup>4</sup> ÷ y<sup>4</sup>, a<sup>b</sup> ÷ a<sup>b</sup> and c<sup>d</sup> ÷ c<sup>d</sup>? Explain.']]),subs([['a','Sofia is correct. x<sup>2</sup> ÷ x<sup>2</sup> = x<sup>2−2</sup> = x<sup>0</sup> = 1'],['c','1'],['d','All the answers are 1. The index is 0, and anything to the power 0 is 1. (Or: any expression divided by itself is 1.)']])),
  Q('Exercise 2.3 · Question 4','Kai\'s homework: 6x<sup>2</sup> × 3x<sup>4</sup> = 6 × x<sup>2</sup> × 3 × x<sup>4</sup> = 6 × 3 × x<sup>2</sup> × x<sup>4</sup> = 18 × x<sup>2+4</sup> = 18x<sup>6</sup>. Use Kai\'s method to simplify:'+subs([['a','3x<sup>2</sup> × 2x<sup>3</sup>'],['b','4y<sup>4</sup> × 3y<sup>5</sup>'],['c','6z<sup>2</sup> × 5z<sup>5</sup>'],['d','2m<sup>4</sup> × 2m<sup>3</sup>'],['e','4n<sup>6</sup> × n<sup>7</sup>'],['f','p<sup>2</sup> × 8p']]),subs([['a','6x<sup>5</sup>'],['b','12y<sup>9</sup>'],['c','30z<sup>7</sup>'],['d','4m<sup>7</sup>'],['e','4n<sup>13</sup>'],['f','8p<sup>3</sup>']])),
  Q('Exercise 2.3 · Question 5 (Think like a mathematician)',`Harsha's method: 6x<sup>5</sup> ÷ 3x<sup>2</sup>: 6 ÷ 3 = 2 and x<sup>5</sup> ÷ x<sup>2</sup> = x<sup>3</sup>, so 2x<sup>3</sup>. Sasha's method: write ${F('6x<sup>5</sup>','3x<sup>2</sup>')}, cancel 6 and 3 to 2 and 1, giving 2x<sup>5−2</sup> = 2x<sup>3</sup>.`+subs([['a','Critique the methods. Whose do you prefer?'],['b','Do you prefer a division sign or a fraction? Why?'],['c','How could you simplify 4x<sup>5</sup> ÷ 6x<sup>3</sup>, 12y<sup>7</sup> ÷ 8y<sup>6</sup> and 6z<sup>9</sup> ÷ 36z<sup>4</sup>? Whose method is easier for these?']]),subs([['a','Your own answer.'],['b','Your own answer.'],['c',`Sasha's method is easiest: 4x<sup>5</sup> ÷ 6x<sup>3</sup> = ${F('2x<sup>2</sup>',3)}, 12y<sup>7</sup> ÷ 8y<sup>6</sup> = ${F('3y',2)}, 6z<sup>9</sup> ÷ 36z<sup>4</sup> = ${F('z<sup>5</sup>',6)}`]])),
  Q('Exercise 2.3 · Question 6','Simplify each expression.'+subs([['a','6q<sup>10</sup> ÷ 2q<sup>6</sup>'],['b','9r<sup>9</sup> ÷ 3r<sup>5</sup>'],['c','15t<sup>7</sup> ÷ 5t'],['d',F('8u<sup>7</sup>','4u<sup>2</sup>')],['e',F('2v<sup>6</sup>','v<sup>2</sup>')],['f',F('5w<sup>7</sup>','w<sup>6</sup>')]]),subs([['a','3q<sup>4</sup>'],['b','3r<sup>4</sup>'],['c','3t<sup>6</sup>'],['d','2u<sup>5</sup>'],['e','2v<sup>4</sup>'],['f','5w']])),
  Q('Exercise 2.3 · Question 7','Which answer is correct, A, B, C or D?'+subs([['a',`Simplify ${F('6x<sup>6</sup>','12x<sup>3</sup>')}: &nbsp;A 2x<sup>2</sup> &nbsp; B 2x<sup>3</sup> &nbsp; C ${F(1,2)}x<sup>2</sup> &nbsp; D ${F(1,2)}x<sup>3</sup>`],['b',`Simplify ${F('4y<sup>8</sup>','10y<sup>2</sup>')}: &nbsp;A ${F(2,5)}y<sup>6</sup> &nbsp; B ${F(2,5)}y<sup>4</sup> &nbsp; C ${MX(2,1,2)}y<sup>6</sup> &nbsp; D ${MX(2,1,2)}y<sup>4</sup>`],['c',`Simplify ${F('25k<sup>3</sup>','15k<sup>2</sup>')}: &nbsp;A ${F(3,5)}k &nbsp; B ${F(3,5)}k<sup>1.5</sup> &nbsp; C ${F(5,3)}k &nbsp; D ${F(5,3)}k<sup>1.5</sup>`],['d',`Simplify ${F('20m<sup>6</sup>','6m<sup>6</sup>')}: &nbsp;A ${MX(3,1,3)}m &nbsp; B ${MX(3,1,3)} &nbsp; C ${F(3,10)}m &nbsp; D ${F(3,10)}`]]),subs([['a',`D ${F(1,2)}x<sup>3</sup>`],['b',`A ${F(2,5)}y<sup>6</sup>`],['c',`C ${F(5,3)}k`],['d',`B ${MX(3,1,3)}`]])),
  Q('Exercise 2.3 · Question 8','Marcus and Arun simplify (3x<sup>2</sup>)<sup>3</sup>. Marcus: "I think the answer is 3x<sup>6</sup>." Arun: "I think the answer is 27x<sup>6</sup>."'+subs([['a','Who is correct? Explain why.'],['b','Simplify &nbsp;i (4x<sup>5</sup>)<sup>2</sup> &nbsp; ii (5y<sup>4</sup>)<sup>3</sup> &nbsp; iii (2z<sup>7</sup>)<sup>4</sup>'],['c','Activity 2.3: write five expressions that each simplify to 36x<sup>12</sup>.']]),subs([['a','Arun is correct. (3x<sup>2</sup>)<sup>3</sup> = 3<sup>3</sup> × (x<sup>2</sup>)<sup>3</sup> = 27x<sup>6</sup>. Everything inside the bracket is cubed.'],['b','i 16x<sup>10</sup> &nbsp; ii 125y<sup>12</sup> &nbsp; iii 16z<sup>28</sup>'],['c','Your own answers, for example 3x<sup>2</sup> × 12x<sup>10</sup>, 4x<sup>8</sup> × 9x<sup>4</sup>, 36x<sup>14</sup> ÷ x<sup>2</sup>, 72x<sup>20</sup> ÷ 2x<sup>8</sup>, (6x<sup>6</sup>)<sup>2</sup>, 36(x<sup>3</sup>)<sup>4</sup>']])),
  Q('Exercise 2.3 · Question 9','Simplify these expressions. Write your answers using a negative power and a fraction. Part a has been done for you.'+subs([['a',`q<sup>4</sup> ÷ q<sup>7</sup> = q<sup>4−7</sup> = q<sup>−3</sup> = ${F(1,'q<sup>3</sup>')}`],['b','r<sup>3</sup> ÷ r<sup>5</sup>'],['c','t<sup>7</sup> ÷ t<sup>12</sup>'],['d','v<sup>6</sup> ÷ v<sup>7</sup>']]),subs([['b',`r<sup>−2</sup> = ${F(1,'r<sup>2</sup>')}`],['c',`t<sup>−5</sup> = ${F(1,'t<sup>5</sup>')}`],['d',`v<sup>−1</sup> = ${F(1,'v')}`]])),
  Q('Exercise 2.3 · Question 10',`Match each rectangular card with the correct oval card.<br>Rectangles: &nbsp;A 5y<sup>6</sup> ÷ 10y<sup>8</sup> &nbsp; B 3y<sup>2</sup> ÷ 9y<sup>7</sup> &nbsp; C 4y<sup>4</sup> ÷ 6y<sup>8</sup> &nbsp; D ${F('9y<sup>4</sup>','12y<sup>7</sup>')} &nbsp; E ${F('15y<sup>2</sup>','10y<sup>6</sup>')} &nbsp; F ${F('15y','12y<sup>3</sup>')}<br>Ovals: &nbsp;i ${F(2,'3y<sup>4</sup>')} &nbsp; ii ${F(1,'6y<sup>7</sup>')} &nbsp; iii ${F(1,'2y<sup>2</sup>')} &nbsp; iv ${F(1,'3y<sup>5</sup>')} &nbsp; v ${F(5,'4y<sup>2</sup>')} &nbsp; vi ${F(3,'2y<sup>4</sup>')} &nbsp; vii ${F(3,'4y<sup>3</sup>')}`+subs([['b','There is one oval card left. Write an expression that simplifies to give it.']]),subs([['a','A and iii, B and iv, C and i, D and vii, E and vi, F and v'],['b',`Your own answer: anything that simplifies to ${F(1,'6y<sup>7</sup>')}, for example ${F('5y<sup>2</sup>','30y<sup>9</sup>')}`]]))
 ],
 checklist:['I can multiply powers of the same letter by adding the indices.','I can divide powers of the same letter by subtracting the indices.','I can simplify a power of a power, including numbers in front.']},

{id:'2.4',title:'Expanding two brackets',src:'Section 2.4',
 goals:['expand two brackets'],
 hook:{q:'You can expand x(x + 2). How would you multiply (x + 2)(x + 3)?',a:'Multiply every term in the first bracket by every term in the second: x × x, x × 3, 2 × x and 2 × 3. That gives x² + 3x + 2x + 6 = x² + 5x + 6.'},
 big:'Every term in the first bracket multiplies every term in the second bracket. Then collect like terms.',
 steps:[
 {t:'One bracket: a quick reminder',refresh:true,body:`<p>To <span class="kw">expand</span> means to multiply out the brackets.</p>
  <p>The term outside multiplies <b>each</b> term inside.</p>
  <div class="ex"><span class="kicker">From the warm-up</span><p>x(x + 2) = x × x + x × 2 = x<sup>2</sup> + 2x</p><p>3y(4y − 7w) = 12y<sup>2</sup> − 21yw</p></div>`,
  vis:'grid1',check:C('Expand 3(x + 5).',['3x + 5','3x + 15','x + 15','8x'],1,'3 × x = 3x and 3 × 5 = 15, so 3x + 15.')},
 {t:'Two brackets: the area picture',body:`<p>Think of (x + 2)(x + 3) as a rectangle cut into four pieces. Each piece is one multiplication.</p>
  <div class="ex"><span class="kicker">Worked example 2.4a</span><p>(x + 2)(x + 3) = x<sup>2</sup> + 3x + 2x + 6</p><p>= x<sup>2</sup> + 5x + 6 &nbsp;(collect 3x + 2x)</p></div>
  <p>Slide the numbers, including negatives, and watch the four pieces change.</p>`,
  vis:'grid2',check:C('Expand and simplify (x + 3)(x + 7).',['x<sup>2</sup> + 21','x<sup>2</sup> + 10x + 21','x<sup>2</sup> + 21x + 10','2x + 10'],1,'x², 7x, 3x and 21. Collect 7x + 3x = 10x.')},
 {t:'Negatives: follow the arrows',body:`<p>Draw four arrows, one for each multiplication. Keep each sign with its number.</p>
  <div class="ex"><span class="kicker">Worked example 2.4b</span><p>(y + 8)(y − 4) = y<sup>2</sup> − 4y + 8y − 32</p><p>= y<sup>2</sup> + 4y − 32</p></div>
  <div class="plain"><span class="kicker">Sign check</span><p>+ × − = − &nbsp; and &nbsp; − × − = +</p></div>`,
  vis:'foil',check:C('Expand and simplify (x + 5)(x − 3).',['x<sup>2</sup> + 2x − 15','x<sup>2</sup> − 2x − 15','x<sup>2</sup> + 8x − 15','x<sup>2</sup> + 2x + 15'],0,'x², −3x, +5x and −15. −3x + 5x = 2x.')},
 {t:'Perfect squares',body:`<p>(x + 2)<sup>2</sup> means (x + 2)(x + 2). Write it out twice, then expand.</p>
  <div class="ex"><span class="kicker">Exercise 2.4, Question 7</span><p>(x + 2)<sup>2</sup> = x<sup>2</sup> + 2x + 2x + 4 = x<sup>2</sup> + 4x + 4</p><p>(x − 3)<sup>2</sup> = x<sup>2</sup> − 3x − 3x + 9 = x<sup>2</sup> − 6x + 9</p></div>
  <div class="bigm">(x + a)<sup>2</sup> = x<sup>2</sup> + 2ax + a<sup>2</sup></div>
  <p>This is called a <span class="kw">perfect square</span>.</p>`,
  vis:'grid2sq',check:C('Expand (y + 5)<sup>2</sup>.',['y<sup>2</sup> + 25','y<sup>2</sup> + 10y + 25','y<sup>2</sup> + 5y + 25','2y + 10'],1,'(y + 5)(y + 5) = y² + 5y + 5y + 25 = y² + 10y + 25. The middle term is easy to forget.')},
 {t:'The difference of two squares',body:`<p>When the brackets are the same except for the sign, the middle terms cancel out.</p>
  <div class="ex"><span class="kicker">Exercise 2.4, Question 9</span><p>(x + 3)(x − 3) = x<sup>2</sup> − 3x + 3x − 9 = x<sup>2</sup> − 9</p></div>
  <div class="bigm">(x + a)(x − a) = x<sup>2</sup> − a<sup>2</sup></div>
  <p>This is called the <span class="kw">difference of two squares</span>.</p>`,
  vis:'grid2dots',check:C('Expand (x − 10)(x + 10).',['x<sup>2</sup> − 100','x<sup>2</sup> + 100','x<sup>2</sup> − 20x − 100','x<sup>2</sup> − 20'],0,'The −10x and +10x cancel. 10 × (−10) = −100.')}
 ],
 mistakes:[['(x + 2)² = x² + 4','You need the middle term: x² + 4x + 4.'],['(x + 2)(x + 3) = x² + 6','Every term times every term: x² + 3x + 2x + 6 = x² + 5x + 6.'],['(y + 8)(y − 4): 8 × −4 = +32','A plus times a minus gives a minus: −32.']],
 bq:[
  Q('Exercise 2.4 · Question 1','Copy and complete these multiplications.'+subs([['a','(x + 4)(x + 1) = x<sup>2</sup> + 1x + □x + □ = x<sup>2</sup> + □x + □'],['b','(x + 6)(x − 3) = x<sup>2</sup> + 6x − □x − □ = x<sup>2</sup> + □x − □'],['c','(x + 2)(x − 8) = x<sup>2</sup> − □x + □x − □ = x<sup>2</sup> − □x − □'],['d','(x − 1)(x − 4) = x<sup>2</sup> − x − □x + □ = x<sup>2</sup> − □x + □']]),subs([['a','x<sup>2</sup> + 1x + 4x + 4 = x<sup>2</sup> + 5x + 4'],['b','x<sup>2</sup> + 6x − 3x − 18 = x<sup>2</sup> + 3x − 18'],['c','x<sup>2</sup> − 8x + 2x − 16 = x<sup>2</sup> − 6x − 16'],['d','x<sup>2</sup> − x − 4x + 4 = x<sup>2</sup> − 5x + 4']])),
  Q('Exercise 2.4 · Question 2','Expand and simplify.'+subs([['a','(x + 3)(x + 7)'],['b','(x + 1)(x + 10)'],['c','(x + 5)(x − 3)'],['d','(x − 4)(x + 8)'],['e','(x − 7)(x − 2)'],['f','(x − 12)(x − 2)']]),subs([['a','x<sup>2</sup> + 10x + 21'],['b','x<sup>2</sup> + 11x + 10'],['c','x<sup>2</sup> + 2x − 15'],['d','x<sup>2</sup> + 4x − 32'],['e','x<sup>2</sup> − 9x + 14'],['f','x<sup>2</sup> − 14x + 24']])),
  Q('Exercise 2.4 · Question 3 (Think like a mathematician)','Sofia: "I use the same method as in Question 1." Zara: "This is the method I use: (x + 4)(x + 1) = x(x + 1) + 4(x + 1) = x<sup>2</sup> + x + 4x + 4 = x<sup>2</sup> + 5x + 4."'+subs([['a','Critique Zara\'s method. Do you prefer Zara\'s method or Sofia\'s? Why?'],['b','Can you think of another method to expand two brackets?']]),'Your own answers and explanations.'),
  Q('Exercise 2.4 · Question 4','Expand and simplify. Use your favourite method.'+subs([['a','(y + 2)(y + 4)'],['b','(z + 6)(z + 8)'],['c','(m + 4)(m − 3)'],['d','(a − 9)(a + 2)'],['e','(p − 6)(p − 5)'],['f','(n − 10)(n − 20)']]),subs([['a','y<sup>2</sup> + 6y + 8'],['b','z<sup>2</sup> + 14z + 48'],['c','m<sup>2</sup> + m − 12'],['d','a<sup>2</sup> − 7a − 18'],['e','p<sup>2</sup> − 11p + 30'],['f','n<sup>2</sup> − 30n + 200']])),
  Q('Exercise 2.4 · Question 5 (Think like a mathematician)','Look at this expansion: (x + 5)(x + 4) = x<sup>2</sup> + 5x + 4x + 20 = x<sup>2</sup> + 9x + 20.'+subs([['a','How would it change if the + in (x + 4) changed to −?'],['b','How would it change if the + in (x + 5) changed to −?'],['c','How would it change if both + signs changed to −?'],['d','A is greater than B. C and D are numbers worked out from A and B. Write the missing signs: &nbsp;i (x + A)(x + B) = x<sup>2</sup> □ Cx □ D &nbsp; ii (x + A)(x − B) = x<sup>2</sup> □ Cx □ D &nbsp; iii (x − A)(x + B) = x<sup>2</sup> □ Cx □ D &nbsp; iv (x − A)(x − B) = x<sup>2</sup> □ Cx □ D']]),subs([['a','x<sup>2</sup> + 1x − 20'],['b','x<sup>2</sup> − 1x − 20'],['c','x<sup>2</sup> − 9x + 20'],['d','i + and + &nbsp; ii + and − &nbsp; iii − and − &nbsp; iv − and +']])),
  Q('Exercise 2.4 · Question 6','Which is the correct expansion, A, B or C?'+subs([['a','(w + 9)(w + 3): &nbsp;A w<sup>2</sup> + 12w − 27 &nbsp; B w<sup>2</sup> − 12w + 27 &nbsp; C w<sup>2</sup> + 12w + 27'],['b','(x + 7)(x − 5): &nbsp;A x<sup>2</sup> + 2x − 35 &nbsp; B x<sup>2</sup> − 2x + 35 &nbsp; C x<sup>2</sup> − 2x − 35'],['c','(y − 8)(y + 6): &nbsp;A y<sup>2</sup> − 2y + 48 &nbsp; B y<sup>2</sup> − 2y − 48 &nbsp; C y<sup>2</sup> + 2y − 48'],['d','(z − 4)(z − 5): &nbsp;A z<sup>2</sup> − 9z + 20 &nbsp; B z<sup>2</sup> − 9z − 20 &nbsp; C z<sup>2</sup> + 9z + 20']]),subs([['a','C'],['b','A'],['c','B'],['d','A']])),
  Q('Exercise 2.4 · Question 7','Copy and complete each expansion.'+subs([['a','(x + 2)<sup>2</sup> = (x + 2)(x + 2) = x<sup>2</sup> + 2x + □x + □ = x<sup>2</sup> + □x + □'],['b','(x − 3)<sup>2</sup> = (x − 3)(x − 3) = x<sup>2</sup> − 3x − □x + □ = x<sup>2</sup> − □x + □']]),subs([['a','x<sup>2</sup> + 2x + 2x + 4 = x<sup>2</sup> + 4x + 4'],['b','x<sup>2</sup> − 3x − 3x + 9 = x<sup>2</sup> − 6x + 9']])),
  Q('Exercise 2.4 · Question 8',subs([['a','Expand and simplify: &nbsp;i (y + 5)<sup>2</sup> &nbsp; ii (z + 1)<sup>2</sup> &nbsp; iii (m + 8)<sup>2</sup> &nbsp; iv (a − 2)<sup>2</sup> &nbsp; v (p − 4)<sup>2</sup> &nbsp; vi (n − 9)<sup>2</sup>'],['b','Complete the general expansion: (x + a)<sup>2</sup> = x<sup>2</sup> + □x + □'],['c','Activity 2.4: in a number grid with 5 numbers in each row, take a 2 by 2 block, for example 4, 5 on top and 9, 10 below. Multiply bottom left by top right (9 × 5), multiply top left by bottom right (4 × 10), and subtract. Try the blocks 11, 12 / 16, 17 and 28, 29 / 33, 34. Then use n for the top left number and explain the result.']]),subs([['a','i y<sup>2</sup> + 10y + 25 &nbsp; ii z<sup>2</sup> + 2z + 1 &nbsp; iii m<sup>2</sup> + 16m + 64 &nbsp; iv a<sup>2</sup> − 4a + 4 &nbsp; v p<sup>2</sup> − 8p + 16 &nbsp; vi n<sup>2</sup> − 18n + 81'],['b','x<sup>2</sup> + 2ax + a<sup>2</sup>'],['c','45 − 40 = 5, 192 − 187 = 5, 957 − 952 = 5. The block is n, n + 1 / n + 5, n + 6, and (n + 5)(n + 1) − n(n + 6) = n<sup>2</sup> + 6n + 5 − n<sup>2</sup> − 6n = 5. The answer is always 5.']])),
  Q('Exercise 2.4 · Question 9',subs([['a','Show that when you expand and simplify (x + 3)(x − 3) you get an expression with only two terms.'],['b','Expand and simplify: &nbsp;i (x + 2)(x − 2) &nbsp; ii (x − 5)(x + 5) &nbsp; iii (x + 7)(x − 7)'],['c','What do you notice about your answers to part b?'],['d','Write the simplified expansion of (x − 10)(x + 10).'],['e','Complete the general expansion: (x + a)(x − a) = x<sup>2</sup> − □']]),subs([['a','x<sup>2</sup> + 3x − 3x − 9 = x<sup>2</sup> − 9'],['b','i x<sup>2</sup> − 4 &nbsp; ii x<sup>2</sup> − 25 &nbsp; iii x<sup>2</sup> − 49'],['c','There is no x term, and the number term is a square number.'],['d','x<sup>2</sup> − 100'],['e','a<sup>2</sup>']]))
 ],
 checklist:['I can expand two brackets.','I can expand a perfect square like (x + a)².','I can recognise the difference of two squares.']},

{id:'2.5',title:'Simplifying algebraic fractions',src:'Section 2.5',
 goals:['simplify algebraic fractions'],
 hook:{q:`You know ${F(1,2)} + ${F(1,4)} = ${F(3,4)}. What do you think ${F('y',2)} + ${F('y',4)} is?`,a:`${F('3y',4)}. Algebraic fractions work exactly like normal fractions: make the bottoms the same, then add the tops.`},
 big:'Same bottom: add or subtract the tops. Different bottoms: make them the same first. Only cancel a number that divides the whole top.',
 steps:[
 {t:'Adding normal fractions: a reminder',refresh:true,body:`<p>You can only add fractions when the bottom numbers (the <b>denominators</b>) are the same.</p>
  <div class="ex"><span class="kicker">From the warm-up</span><p>${F(3,4)} + ${F(2,3)} = ${F(9,12)} + ${F(8,12)} = ${F(17,12)} = ${MX(1,5,12)}</p></div>
  <div class="plain"><span class="kicker">How</span><p>Find a number both bottoms go into (12), change each fraction, then add the tops.</p></div>`,
  vis:'fracbar',check:C(`What is ${F(1,2)} + ${F(1,4)}?`,[F(2,6),F(3,4),F(2,4),F(1,6)],1,`${F(1,2)} = ${F(2,4)}, and ${F(2,4)} + ${F(1,4)} = ${F(3,4)}.`)},
 {t:'Same bottoms: just add the tops',body:`<p>An <span class="kw">algebraic fraction</span> has a letter in it, like ${F('x',4)} or ${F(8,'z')}.</p>
  <p>${F('x',4)} means "x over 4", the same as ${F(1,4)} of x.</p>
  <div class="ex"><span class="kicker">Worked example 2.5a</span><p>${F('x',6)} + ${F('x',6)} = ${F('x + x',6)} = ${F('2x',6)} = ${F('x',3)}</p></div>
  <p>Always cancel to the simplest form at the end.</p>`,
  vis:'xfrac',check:C(`Simplify ${F('x',7)} + ${F('3x',7)}.`,[F('4x',14),F('4x',7),F('3x<sup>2</sup>',7),F('x',2)],1,'The bottoms match, so add the tops: x + 3x = 4x. The bottom stays 7.')},
 {t:'Different bottoms: make them match',body:`<p>Change one or both fractions so the bottoms are the same, then add the tops.</p>
  <div class="ex"><span class="kicker">Exercise 2.5, Question 3a</span><p>${F('a',2)} + ${F('a',5)} = ${F('5a',10)} + ${F('2a',10)} = ${F('7a',10)}</p></div>
  <p>Pick a pair to see each step.</p>`,
  vis:'afrac',check:C(`Simplify ${F('b',4)} + ${F('b',3)}.`,[F('2b',7),F('7b',12),F('b',7),F('2b',12)],1,`12 works for both: ${F('3b',12)} + ${F('4b',12)} = ${F('7b',12)}.`)},
 {t:'Letters on the bottom',body:`<p>The same method works when the letter is on the bottom.</p>
  <div class="ex"><span class="kicker">Worked example 2.5b</span><p>${F(4,'y')} − ${F(5,'2y')} = ${F(8,'2y')} − ${F(5,'2y')} = ${F(3,'2y')}</p></div>
  <div class="ex"><span class="kicker">Worked example 2.5c</span><p>${F('n',5)} + ${F(2,'3p')} = ${F('3np','15p')} + ${F(10,'15p')} = ${F('3np + 10','15p')}</p></div>`,
  check:C(`Simplify ${F(3,'x')} + ${F(5,'x')}.`,[F(8,'2x'),F(8,'x'),F(15,'x'),F(8,'x<sup>2</sup>')],1,'The bottoms are both x, so add the tops: 3 + 5 = 8.')},
 {t:'Cancelling: the whole top, or nothing',body:`<p>You can only cancel a number that divides <b>every</b> part of the top.</p>
  <div class="ex"><span class="kicker">Iain's homework (correct)</span><p>${F('6x + 2',2)} = ${F('2(3x + 1)',2)} = 3x + 1</p></div>
  <div class="ex"><span class="kicker">Arun's method (wrong)</span><p>He cancels just the 2s and gets 6x + 1. Test with x = 3: ${F('6 × 3 + 2',2)} = 10, but 6 × 3 + 1 = 19.</p></div>
  <div class="plain"><span class="kicker">Recipe</span><p>Factorise the top first, then cancel.</p></div>`,
  vis:'cancel',check:C(`Simplify ${F('5x + 10',5)}.`,['x + 10','x + 2','5x + 2','x + 5'],1,`Factorise: 5x + 10 = 5(x + 2). Then cancel the 5s: x + 2.`)}
 ],
 mistakes:[[`${F('x',2)} + ${F('y',6)} = ${F('3x + y',6)} = ${F('x + y',2)}`,`You can't cancel the 3 with the 6 unless 3 divides all of the top. The answer is ${F('3x + y',6)}.`],[`${F('6x + 2',2)} = 6x + 1`,`Divide every part of the top by 2: 3x + 1.`],[`${F('x',5)} + ${F('x',5)} = ${F('2x',10)}`,`Keep the bottom the same: ${F('2x',5)}.`]],
 bq:[
  Q('Exercise 2.5 · Question 1','Simplify these expressions.'+subs([['a',`${F('x',5)} + ${F('x',5)}`],['b',`${F('x',7)} + ${F('3x',7)}`],['c',`${F(3,'x')} + ${F(5,'x')}`],['d',`${F('2x',3)} + ${F('x',3)}`],['e',`${F('7x',15)} − ${F('x',15)}`],['f',`${F(11,'x')} − ${F(7,'x')}`]]),subs([['a',F('2x',5)],['b',F('4x',7)],['c',F(8,'x')],['d','x'],['e',F('2x',5)],['f',F(4,'x')]])),
  Q('Exercise 2.5 · Question 2','Simplify these expressions. The first two have been started for you.'+subs([['a',`${F('2y',5)} + ${F('3y',10)} = ${F('□y',10)} + ${F('3y',10)} = ${F('□y',10)}`],['b',`${F(2,'5y')} − ${F(1,'25y')} = ${F('□','25y')} − ${F(1,'25y')} = ${F('□','25y')}`],['c',`${F('y',2)} + ${F('y',4)}`],['d',`${F('y',2)} − ${F('y',8)}`],['e',`${F(2,'3y')} + ${F(5,'9y')}`],['f',`${F('4y',7)} − ${F('5y',14)}`]]),subs([['a',`${F('4y',10)} + ${F('3y',10)} = ${F('7y',10)}`],['b',`${F(10,'25y')} − ${F(1,'25y')} = ${F(9,'25y')}`],['c',F('3y',4)],['d',F('3y',8)],['e',F(11,'9y')],['f',F('3y',14)]])),
  Q('Exercise 2.5 · Question 3','Copy and complete these additions and subtractions.'+subs([['a',`${F('a',2)} + ${F('a',5)} = ${F('5a',10)} + ${F('□a',10)} = ${F('□a',10)}`],['b',`${F('b',4)} + ${F('b',3)} = ${F('3b',12)} + ${F('□b',12)} = ${F('□b',12)}`],['c',`${F(5,'7c')} + ${F(2,'5c')} = ${F(25,'35c')} + ${F('□','35c')} = ${F('□','35c')}`],['d',`${F('5d',6)} − ${F('3d',5)}`],['e',`${F('7e',8)} − ${F('2e',3)}`],['f',`${F(9,'10f')} − ${F(3,'4f')}`]]),subs([['a',F('7a',10)],['b',F('7b',12)],['c',`${F(25,'35c')} + ${F(14,'35c')} = ${F(39,'35c')}`],['d',`${F('25d',30)} − ${F('18d',30)} = ${F('7d',30)}`],['e',`${F('21e',24)} − ${F('16e',24)} = ${F('5e',24)}`],['f',`${F(18,'20f')} − ${F(15,'20f')} = ${F(3,'20f')}`]])),
  Q('Exercise 2.5 · Question 4',`Question cards: &nbsp;A ${F('9x',10)} − ${F('13x',20)} &nbsp; B ${F('x',6)} + ${F('x',3)} &nbsp; C ${F('2x',7)} + ${F('3x',14)} &nbsp; D ${F('11x',18)} − ${F('13x',36)} &nbsp; E ${F('7x',9)} − ${F('5x',18)} &nbsp; F ${F('x',12)} + ${F('x',6)} &nbsp; G ${F('x',30)} + ${F('3x',10)}<br>Answer cards: &nbsp;i ${F('x',4)} &nbsp; ii ${F('x',2)}`+subs([['a','Which question cards match answer card i? Show your working.'],['b','Which question cards match answer card ii?'],['c','Which question card matches neither? Work out its answer.']]),subs([['a','A, D and F'],['b','B, C and E'],['c',`G; the answer is ${F('x',3)}`]])),
  Q('Exercise 2.5 · Question 5 (Think like a mathematician)',`Su-Lin's homework: ${F('x',2)} + ${F('y',6)} = ${F('3x',6)} + ${F('y',6)} = ${F('3x + y',6)}, then she cancels the 3 with the 6 to get ${F('x + y',2)}.`+subs([['a',`Substitute x = 1 and y = 2 into ${F('x',2)} + ${F('y',6)}.`],['b',`Substitute x = 1 and y = 2 into ${F('x + y',2)}.`],['c','Use parts a and b to show Su-Lin\'s answer is incorrect.'],['d','Explain her mistake and write the correct answer.'],['f',`Correct or incorrect? If incorrect, give the correct answer. &nbsp;i ${F('2x',3)} + ${F('y',9)} = ${F('6x + y',9)} &nbsp; ii ${F('2x',5)} − ${F('y',10)} = ${F('2x − y',5)} &nbsp; iii ${F('11x',14)} − ${F(2,7)} = ${F('11x − 4',14)} &nbsp; iv ${F('9x',20)} − ${F(2,5)} = ${F('9x − 2',5)}`]]),subs([['a',`${F(1,2)} + ${F(2,6)} = ${F(5,6)}`],['b',`${F(3,2)} = ${MX(1,1,2)}`],['c',`${F(5,6)} ≠ ${MX(1,1,2)}`],['d',`She cannot cancel the 3 with the 6, because the whole of 3x + y is divided by 6, not just 3x. The answer is ${F('3x + y',6)}.`],['f',`i correct &nbsp; ii incorrect, ${F('4x − y',10)} &nbsp; iii correct &nbsp; iv incorrect, ${F('9x − 8',20)}`]])),
  Q('Exercise 2.5 · Question 6',subs([['a',`Simplify: &nbsp;i ${F('a',5)} + ${F('b',5)} &nbsp; ii ${F('5a',12)} + ${F('3b',4)} &nbsp; iii ${F('2a',15)} + ${F(3,5)} &nbsp; iv ${F('a',4)} + ${F(3,'b')} &nbsp; v ${F('3a',10)} + ${F(4,'b')} &nbsp; vi ${F('4a',9)} + ${F(3,'2b')}`],['b','Choose values for a and b, and check your answers give the same numbers.']]),subs([['a',`i ${F('a + b',5)} &nbsp; ii ${F('5a + 9b',12)} &nbsp; iii ${F('2a + 9',15)} &nbsp; iv ${F('ab + 12','4b')} &nbsp; v ${F('3ab + 40','10b')} &nbsp; vi ${F('8ab + 27','18b')}`],['b','Your own checks.']])),
  Q('Exercise 2.5 · Question 7 (Think like a mathematician)',`Iain's homework: ${F('6x + 2',2)} = ${F('2(3x + 1)',2)} = 3x + 1.<div class="speech" style="margin-top:10px">I use a much easier method. I just cancel the numbers that are the same, so ${F('6x + 2',2)} = 6x + 1.</div><div class="who">Arun</div>`+subs([['a',`Substitute x = 3 into ${F('6x + 2',2)}.`],['b','Substitute x = 3 into 3x + 1.'],['c','Show that Iain\'s answer is correct.'],['d','Explain why his method works.'],['e','Show that when x = 3 Arun\'s answer is incorrect. Explain why his method is wrong.']]),subs([['a',`${F(20,2)} = 10`],['b','9 + 1 = 10'],['c','10 = 10'],['d','He factorises to get 2 × bracket, then divides by 2. The × 2 and ÷ 2 cancel out, leaving the bracket.'],['e','6 × 3 + 1 = 19, and 19 ≠ 10. All of 6x + 2 must be divided by 2, but Arun only divided the 2.']])),
  Q('Exercise 2.5 · Question 8','Simplify. Factorise the numerator before you cancel.'+subs([['a',F('6x + 3',3)],['b',F('5x + 10',5)],['c',F('6x − 9',3)],['d',F('8x − 20',4)]]),subs([['a','2x + 1'],['b','x + 2'],['c','2x − 3'],['d','2x − 5']])),
  Q('Exercise 2.5 · Question 9',`Show that ${F('6x − 4',2)} + ${F('20x + 25',5)} simplifies to 7x + 3.`,`${F('2(3x − 2)',2)} + ${F('5(4x + 5)',5)} = 3x − 2 + 4x + 5 = 7x + 3`),
  Q('Exercise 2.5 · Question 10',`Shania: 6x + 18 = 6(x + 3), so ${F('6x + 18',3)} = ${F('6(x + 3)',3)} = 2(x + 3). Taylor: the denominator is 3, so 6x + 18 = 3(2x + 6), and ${F('3(2x + 6)',3)} = 2x + 6.`+subs([['a','Show that Shania\'s answer is equivalent to Taylor\'s.'],['b','Whose method do you prefer? Why?'],['c',`Simplify: &nbsp;i ${F('10x + 30',5)} &nbsp; ii ${F('12x + 24',6)} &nbsp; iii ${F('16x − 48',4)} &nbsp; iv ${F('6 − 18x',2)}`]]),subs([['a','2(x + 3) = 2x + 6'],['b','Your own answer.'],['c','i 2(x + 3) or 2x + 6 &nbsp; ii 2(x + 2) or 2x + 4 &nbsp; iii 4(x − 3) or 4x − 12 &nbsp; iv 3(1 − 3x) or 3 − 9x']]))
 ],
 checklist:['I can add and subtract algebraic fractions with the same denominator.','I can add and subtract algebraic fractions with different denominators.','I can factorise the top before cancelling.']},

{id:'2.6',title:'Deriving and using formulae',src:'Section 2.6',
 goals:['write and use formulae','change the subject of a formula'],
 hook:{q:'There are 60 seconds in a minute. Can you write a rule for the number of seconds, S, in M minutes?',a:'S = 60M. That rule is a formula. This is Exercise 2.6, Question 1a.'},
 big:'A formula is a rule that links letters. To change its subject, undo the operations one at a time, doing the same to both sides.',
 steps:[
 {t:'What a formula is',body:`<p>A <b>formula</b> is a rule that shows how two or more quantities are linked.</p>
  <p>In v = u + at, v is on its own on one side. v is the <span class="kw">subject of the formula</span>.</p>
  <div class="plain"><span class="kicker">Tip from the book</span><p>You usually write the subject on the left-hand side.</p></div>
  <p>Try the formula F = ma with the sliders.</p>`,
  vis:'formula',check:C('In the formula S = 60M, what is the subject?',['M','60','S','60M'],2,'S is on its own on one side, so S is the subject.')},
 {t:'Using a formula: substitute',body:`<p>Swap the letters for their numbers and work it out, just like in Topic 2.1.</p>
  <div class="ex"><span class="kicker">Worked example 2.6</span><p>Li's pay: P = W + HR (fixed wage W, plus H hours at R dollars an hour)</p><p>W = 60, H = 8.25, R = 4.80</p><p>P = 60 + 8.25 × 4.80 = 60 + 39.60 = $99.60</p></div>`,
  vis:'pay',check:C('Use F = ma to work out F when m = 12 and a = 5.',['17','60','7','125'],1,'ma means m × a: 12 × 5 = 60.')},
 {t:'Changing the subject: undo, step by step',body:`<p>To get a different letter on its own, <b>undo</b> what is being done to it. Do the same thing to both sides.</p>
  <div class="scrollx"><table class="dt"><tr><th>If you see…</th><th>undo it with…</th></tr><tr><td>+</td><td>−</td></tr><tr><td>−</td><td>+</td></tr><tr><td>×</td><td>÷</td></tr><tr><td>÷</td><td>×</td></tr><tr><td><sup>2</sup></td><td>√</td></tr></table></div>
  <div class="ex"><span class="kicker">From the book</span><p>v = u + at → subtract u → at = v − u → divide by a → t = ${F('v − u','a')}</p></div>`,
  vis:'rearr',check:C('Make m the subject of F = ma.',[`m = Fa`,`m = ${F('F','a')}`,`m = F − a`,`m = ${F('a','F')}`],1,'m is multiplied by a, so divide both sides by a: m = F ÷ a.')},
 {t:'Writing your own formula',body:`<p>Turn the words into algebra, then put the subject on the left.</p>
  <div class="ex"><span class="kicker">Exercise 2.6, Question 4</span><p>Amy is x. Ben is 2 years older: x + 2. Alice is 6 years younger: x − 6.</p><p>Total T = x + (x + 2) + (x − 6) = 3x − 4</p><p>Rearranged: x = ${F('T + 4',3)}</p></div>`,
  vis:'ages',check:C('Using T = 3x − 4, what is T when x = 19?',['53','57','45','61'],0,'3 × 19 = 57, then 57 − 4 = 53.')},
 {t:'Squares, roots and π in formulae',body:`<p>A square is undone with a square root, and a cube with a cube root.</p>
  <div class="ex"><span class="kicker">Exercise 2.6, Questions 10 to 12</span><p>A = a<sup>2</sup> + bc → A − bc = a<sup>2</sup> → a = ${SQ('A − bc')}</p><p>A = πr<sup>2</sup> → r = ${SQ(F('A','π'))}</p><p>V = l<sup>3</sup> → l = ${CR('V')}</p></div>`,
  vis:'circle',check:C('Make l the subject of V = l<sup>3</sup>.',[`l = ${F('V',3)}`,`l = ${CR('V')}`,`l = V<sup>3</sup>`,`l = ${SQ('V')}`],1,'A cube is undone by a cube root.')}
 ],
 mistakes:[['F = ma, so m = F × a','m is multiplied by a, so you divide: m = F ÷ a.'],['y = 2x + z, so x = (y + z) ÷ 2','Undo the + z by subtracting: x = (y − z) ÷ 2.'],['A = πr², so r = A ÷ π','Undo the square too: r = √(A ÷ π).']],
 bq:[
  Q('Exercise 2.6 · Question 1',subs([['a','Write a formula for the number of seconds, S, in any number of minutes, M.'],['b','Work out S when M = 15.'],['c','Rearrange your formula to make M the subject.'],['d','Work out M when S = 1350.']]),subs([['a','S = 60M'],['b','S = 900'],['c',`M = ${F('S',60)}`],['d','M = 22.5']])),
  Q('Exercise 2.6 · Question 2',subs([['a','Use F = ma to work out &nbsp;i F when m = 12 and a = 5 &nbsp; ii F when m = 26 and a = −3'],['b','Make m the subject. Work out m when F = 30 and a = 2.5.'],['c','Make a the subject. Work out a when F = −14 and m = 8.']]),subs([['a','i F = 60 &nbsp; ii F = −78'],['b',`m = ${F('F','a')}, m = 12`],['c',`a = ${F('F','m')}, a = −1.75`]])),
  Q('Exercise 2.6 · Question 3 (Think like a mathematician)',subs([['a','Copy and complete a table of the number of faces, vertices and edges for a cube, cuboid, triangular prism, triangular-based pyramid and square-based pyramid.'],['b','Write a formula that connects faces (F), vertices (V) and edges (E).'],['c','Make V the subject. Work out V when &nbsp;i E = 10 and F = 6 &nbsp; ii E = 12 and F = 7'],['d','Can you identify the shapes in part c?'],['e','Make F the subject. Work out F when E = 5 and V = 7. What does this tell you?']]),subs([['a','<div class="scrollx"><table class="dt"><tr><th>Shape</th><th>F</th><th>V</th><th>E</th></tr><tr><td>cube</td><td>6</td><td>8</td><td>12</td></tr><tr><td>cuboid</td><td>6</td><td>8</td><td>12</td></tr><tr><td>triangular prism</td><td>5</td><td>6</td><td>9</td></tr><tr><td>triangular-based pyramid</td><td>4</td><td>4</td><td>6</td></tr><tr><td>square-based pyramid</td><td>5</td><td>5</td><td>8</td></tr></table></div>'],['b','E = F + V − 2, or any equivalent version'],['c','i V = 6 &nbsp; ii V = 7'],['d','i a pentagonal-based pyramid &nbsp; ii a hexagonal-based pyramid'],['e','F = E − V + 2, F = 0. It is not possible to have a shape with five edges and seven vertices.']])),
  Q('Exercise 2.6 · Question 4','Amy is x years old. Ben is 2 years older than Amy. Alice is six years younger than Amy.'+subs([['a','Write expressions for Ben\'s age and Alice\'s age.'],['b','Write a formula for the total age, T.'],['c','Work out T when x = 19.'],['d','Make x the subject.'],['e','Work out x when T = 62.']]),subs([['a','Ben x + 2, Alice x − 6'],['b','T = 3x − 4'],['c','T = 53'],['d',`x = ${F('T + 4',3)}`],['e','x = 22']])),
  Q('Exercise 2.6 · Question 5','Use the formula v = u + at to work out'+subs([['a','v when u = 7, a = 10, t = 8'],['b','v when u = 0, a = 5, t = 25'],['c','u when v = 75, a = 4, t = 12'],['d','u when v = 97, a = 6, t = 8.5'],['e','t when v = 80, u = 20, a = 6'],['f','a when v = 72, u = 34, t = 19']]),subs([['a','87'],['b','125'],['c','27'],['d','46'],['e','10'],['f','2']])),
  Q('Exercise 2.6 · Question 6',`Adrian uses this formula: percentage profit = ${F('selling price − cost price','cost price')} × 100. Work out his percentage profit on each painting.`+subs([['a','cost $250, selling $300'],['b','cost $120, selling $192'],['c','cost $480, selling $1080']]),subs([['a','20%'],['b','60%'],['c','125%']])),
  Q('Exercise 2.6 · Question 7',`To change stones (S) and pounds (P) to kilograms (K): K = ${F('5(14S + P)',11)}. Work out the mass in kilograms of a person with a mass of`+subs([['a','10 stones and 3 pounds'],['b','7 stones and 10 pounds'],['c','15 stones and 1 pound'],['d','9 stones']]),subs([['a','65 kg'],['b','49.1 kg (1 d.p.)'],['c','95.9 kg (1 d.p.)'],['d','57.3 kg (1 d.p.)']])),
  Q('Exercise 2.6 · Question 8 (Think like a mathematician)','Make x the subject. Is A, B or C correct?'+subs([['i',`y = 2x + z: &nbsp;A x = ${F('y + z',2)} &nbsp; B x = ${F('y − z',2)} &nbsp; C x = ${F('y',2)} − z`],['ii',`y = ${F('5x',2)} − 3h: &nbsp;A x = ${F('2y + 3h',5)} &nbsp; B x = ${F('2y − 6h',5)} &nbsp; C x = ${F('2(y + 3h)',5)}`],['iii',`y = 6 + ${F('x','7k')}: &nbsp;A x = 7k(y − 6) &nbsp; B x = 7ky − 6 &nbsp; C x = 7k(y + 6)`],['iv',`y = ${F('x − m','3n')}: &nbsp;A x = 3ny − m &nbsp; B x = ${F('3ny','m')} &nbsp; C x = 3ny + m`],['v',`y = w − 7x: &nbsp;A x = ${F('w − y',7)} &nbsp; B x = ${F('y + w',7)} &nbsp; C x = ${F('y − w',7)}`]]),subs([['i','B'],['ii','C'],['iii','A'],['iv','C'],['v','A']])),
  Q('Exercise 2.6 · Question 9','Make t the subject of each formula.'+subs([['a','m = 7t + 9'],['b',`k = ${F('t',5)} − m`],['c',`p = ${F('h + t','v')}`],['d',`q = ${F('5t − w',9)}`]]),subs([['a',`t = ${F('m − 9',7)}`],['b','t = 5(k + m)'],['c','t = pv − h'],['d',`t = ${F('9q + w',5)}`]])),
  Q('Exercise 2.6 · Question 10','A shape is made from a square with side a and a rectangle b long and c high.'+subs([['a','Write a formula for the area, A.'],['b','Work out A when a = 6, b = 3 and c = 4.5.'],['c',`Show that you can rearrange your formula to give a = ${SQ('A − bc')}.`],['d','Work out a when A = 80, b = 8 and c = 2.']]),subs([['a','A = a<sup>2</sup> + bc'],['b','A = 49.5'],['c',`A − bc = a<sup>2</sup>, so a = ${SQ('A − bc')}`],['d','a = 8']])),
  Q('Exercise 2.6 · Question 11','The area of a circle is A = πr<sup>2</sup>.'+subs([['a','Work out the area of a circle with radius 5 cm, to 3 significant figures.'],['b','Make r the subject.'],['c','Work out the radius of a circle with area 122.7 cm<sup>2</sup>, to 3 significant figures.']]),subs([['a','78.5 cm<sup>2</sup>'],['b',`r = ${SQ(F('A','π'))}`],['c','6.25 cm']])),
  Q('Exercise 2.6 · Question 12','Simon uses V = l<sup>3</sup> for the volume of a cube.'+subs([['a','Make l the subject.'],['b','Two cubes have volumes 64 cm<sup>3</sup> and 216 cm<sup>3</sup>. Work out the difference in their side lengths.']]),subs([['a',`l = ${CR('V')}`],['b','2 cm']])),
  Q('Exercise 2.6 · Question 13','Sasha uses 5F = 9C + 160, where F is the temperature in °F and C is in °C. She thinks 30 °C is higher than 82 °F. Is she correct? Show your working.','Sasha is correct: 30 °C = 86 °F, and 86 °F > 82 °F (or 82 °F = 27.8 °C, and 27.8 °C < 30 °C).'),
  Q('Exercise 2.6 · Question 14',`A doctor uses BMI = ${F('m','h<sup>2</sup>')} (m in kg, h in metres). A BMI below 18.5 is underweight.`+subs([['a','Tina\'s mass is 48.8 kg and her height is 1.56 m. Is she underweight? Show your working.'],['b','Stephen is 1.80 m tall and 68.5 kg. He wants a BMI of 20. How many kilograms must he lose?']]),subs([['a','She is not underweight: her BMI is 20.05, which is more than 18.5.'],['b','3.7 kg']]))
 ],
 checklist:['I can write a formula from words.','I can use a formula by substituting values.','I can change the subject of a formula.']}
];

const KEYWORDS2=[
 {id:'k21',topic:'2.1',t:'counter-example',d:'One example that shows a statement is not true.'},
 {id:'k22',topic:'2.2',t:'in terms of',d:'Written using certain letters. "In terms of x" means the expression uses x.'},
 {id:'k23',topic:'2.4',t:'expand',d:'Multiply out the brackets.'},
 {id:'k24',topic:'2.4',t:'brackets',d:'The ( ) symbols. Whatever is inside is worked out, or multiplied, as one group.'},
 {id:'k25',topic:'2.4',t:'perfect square',d:'An expansion like (x + a)² = x² + 2ax + a².'},
 {id:'k26',topic:'2.4',t:'difference of two squares',d:'An expansion like (x + a)(x − a) = x² − a². The middle terms cancel.'},
 {id:'k27',topic:'2.5',t:'algebraic fraction',d:'A fraction with a letter in it, like x/4 or 5/(4b).'},
 {id:'k28',topic:'2.6',t:'subject of a formula',d:'The letter on its own on one side. In v = u + at, v is the subject.'},
 {id:'k29',topic:'2.6',t:'changing the subject',d:'Rearranging a formula so a different letter is on its own.'}
];

const CYP2=[
 {p:'1',q:'Work out the value of each expression when x = 3, y = 5 and z = −2.'+subs([['a','x(3y + z)'],['b','(2x)<sup>2</sup> + y<sup>3</sup>'],['c',`${F('(x + y)',4)} − 5z`]]),a:subs([['a','39'],['b','161'],['c','12']])},
 {p:'2',q:'A rectangle has sides 3x + 4 and 5x. Write an expression for its perimeter and its area, each in its simplest form.',a:'perimeter = 16x + 8, area = 5x(3x + 4) = 15x<sup>2</sup> + 20x'},
 {p:'3',q:'Simplify each expression.'+subs([['a','x<sup>2</sup> × x<sup>3</sup>'],['b','q<sup>8</sup> ÷ q<sup>2</sup>'],['c','(h<sup>2</sup>)<sup>5</sup>'],['d','3m<sup>7</sup> × 5m<sup>2</sup>'],['e',F('12u<sup>5</sup>','6u<sup>3</sup>')],['f','4p<sup>2</sup> − p<sup>2</sup>']]),a:subs([['a','x<sup>5</sup>'],['b','q<sup>6</sup>'],['c','h<sup>10</sup>'],['d','15m<sup>9</sup>'],['e','2u<sup>2</sup>'],['f','3p<sup>2</sup>']])},
 {p:'4',q:'Expand and simplify each expression.'+subs([['a','(x + 2)(x + 5)'],['b','(x − 3)(x + 4)'],['c','(x + 6)(x − 9)'],['d','(x − 10)(x − 4)'],['e','(x − 8)(x + 8)'],['f','(x − 6)<sup>2</sup>']]),a:subs([['a','x<sup>2</sup> + 7x + 10'],['b','x<sup>2</sup> + x − 12'],['c','x<sup>2</sup> − 3x − 54'],['d','x<sup>2</sup> − 14x + 40'],['e','x<sup>2</sup> − 64'],['f','x<sup>2</sup> − 12x + 36']])},
 {p:'5',q:'Simplify each expression.'+subs([['a',`${F('x',3)} + ${F('x',3)}`],['b',`${F('y',5)} − ${F('y',15)}`],['c',`${F('3x',5)} − ${F('y',20)}`],['d',F('9x − 15',3)]]),a:subs([['a',F('2x',3)],['b',F('2y',15)],['c',F('12x − y',20)],['d','3x − 5']])},
 {p:'6',q:subs([['a','Use x = y<sup>2</sup> + 5z to work out x when y = 4 and z = 3.'],['b','Make z the subject. Work out z when x = 55 and y = 5.'],['c','Make y the subject. Work out y when x = 46 and z = 2.']]),a:subs([['a','x = 31'],['b',`z = ${F('x − y<sup>2</sup>',5)}, z = 6`],['c',`y = ±${SQ('x − 5z')}, y = ±6`]])}
];

const QUIZ2=[
 C('Work out 5a − 6b when a = 4 and b = −3.',['2','38','−38','42'],1,'5 × 4 = 20, 6 × (−3) = −18, and 20 − (−18) = 38.'),
 C('What is (−3)<sup>2</sup>?',['−9','9','−6','6'],1,'(−3) × (−3) = 9.'),
 C('Work out d<sup>2</sup> + ab when a = −2, b = 3, d = 6.',['42','30','36','24'],1,'36 + (−2 × 3) = 36 − 6 = 30.'),
 C('Luis divides his number by 6, then subtracts 4. Which expression is right?',[`${F('x − 4',6)}`,`${F('x',6)} − 4`,'6x − 4',`${F(6,'x')} − 4`],1,'Divide first, then subtract: x/6 − 4.'),
 C('A rectangle is x + 5 long and 2x wide. What is its perimeter?',['3x + 5','6x + 10','2x<sup>2</sup> + 10x','4x + 10'],1,'x + 5 + 2x + x + 5 + 2x = 6x + 10.'),
 C('Simplify y<sup>2</sup> × y<sup>4</sup>.',['y<sup>8</sup>','y<sup>6</sup>','2y<sup>6</sup>','y<sup>2</sup>'],1,'Add the indices: 2 + 4 = 6.'),
 C('Simplify (g<sup>3</sup>)<sup>2</sup>.',['g<sup>5</sup>','g<sup>6</sup>','g<sup>9</sup>','2g<sup>3</sup>'],1,'Multiply the indices: 3 × 2 = 6.'),
 C('Simplify 6q<sup>10</sup> ÷ 2q<sup>6</sup>.',['3q<sup>4</sup>','4q<sup>4</sup>','3q<sup>16</sup>','12q<sup>4</sup>'],0,'6 ÷ 2 = 3 and 10 − 6 = 4.'),
 C('Simplify x<sup>5</sup> ÷ x<sup>5</sup>.',['0','x','1','x<sup>10</sup>'],2,'x⁰ = 1. Anything divided by itself is 1.'),
 C('Expand and simplify (x − 7)(x − 2).',['x<sup>2</sup> − 9x + 14','x<sup>2</sup> + 9x + 14','x<sup>2</sup> − 9x − 14','x<sup>2</sup> − 5x + 14'],0,'−2x − 7x = −9x and (−7) × (−2) = +14.'),
 C('Expand (x − 6)<sup>2</sup>.',['x<sup>2</sup> + 36','x<sup>2</sup> − 36','x<sup>2</sup> − 12x + 36','x<sup>2</sup> − 6x + 36'],2,'(x − 6)(x − 6) = x² − 6x − 6x + 36.'),
 C('Expand (x + 7)(x − 7).',['x<sup>2</sup> − 49','x<sup>2</sup> + 49','x<sup>2</sup> − 14x − 49','x<sup>2</sup> − 14'],0,'Difference of two squares: the middle terms cancel.'),
 C(`Simplify ${F('y',2)} + ${F('y',4)}.`,[F('2y',6),F('3y',4),F('y',6),F('2y',4)],1,`${F('2y',4)} + ${F('y',4)} = ${F('3y',4)}.`),
 C(`Simplify ${F('6x − 9',3)}.`,['2x − 9','6x − 3','2x − 3','x − 3'],2,'3(2x − 3) ÷ 3 = 2x − 3.'),
 C('Make t the subject of m = 7t + 9.',[`t = ${F('m + 9',7)}`,`t = ${F('m − 9',7)}`,'t = 7m − 9',`t = ${F('m',7)} − 9`],1,'Subtract 9, then divide by 7.'),
 C('Use v = u + at with u = 7, a = 10, t = 8.',['87','170','25','560'],0,'10 × 8 = 80, then 7 + 80 = 87.')
];

CHAPTERS_DATA[2]={title:'Expressions and formulae',topics:TOPICS2,kw:KEYWORDS2,cyp:CYP2,quiz:QUIZ2,cypNote:'The online course does not show marks for these questions.'};

/* =================== FOUNDATIONS (before Chapter 1): extra practice, not from the book =================== */
const TOPICS0=[
{id:'0.1',title:'Basic division',src:'Foundations',
 goals:['understand division as sharing and as grouping','use the times tables to divide','handle remainders','divide bigger numbers with short division'],
 hook:{q:'You have 12 cookies and 3 friends. How many cookies does each friend get if you share them fairly?',a:'4 each. 12 ÷ 3 = 4, because 3 × 4 = 12. Division is just sharing fairly, or multiplication done backwards.'},
 big:'Division means sharing equally. Every division fact is a times table fact read backwards.',
 steps:[
 {t:'Division means sharing equally',refresh:true,body:`<p>12 ÷ 3 means: share 12 things equally between 3 groups.</p>
  <p>Deal them out one at a time, like cards, until none are left. Each plate gets 4.</p>
  <div class="plain"><span class="kicker">Say it like this</span><p>"12 shared between 3 is 4."</p></div>`,
  vis:'share',check:C('Share 15 cookies equally between 5 plates. How many on each plate?',['3','5','10','20'],0,'Deal them out: each plate gets 3, because 5 × 3 = 15.')},
 {t:'Division also means grouping',refresh:true,body:`<p>12 ÷ 4 can also mean: how many groups of 4 can you make from 12?</p>
  <p>Circle groups of 4 until you run out. You make 3 groups.</p>
  <div class="plain"><span class="kicker">Two ways, same answer</span><p>Sharing: 12 between 4 people is 3 each. Grouping: 12 makes 3 groups of 4.</p></div>`,
  vis:'groups',check:C('How many groups of 6 can you make from 24?',['3','4','6','18'],1,'6, 12, 18, 24: that is 4 groups of 6.')},
 {t:'Division is multiplication backwards',refresh:true,body:`<p>Three numbers that belong together make a <b>fact family</b>:</p>
  <div class="ex"><p>3 × 4 = 12 &nbsp;&nbsp; 4 × 3 = 12</p><p>12 ÷ 3 = 4 &nbsp;&nbsp; 12 ÷ 4 = 3</p></div>
  <p>So if you know your times tables, you already know your division facts.</p>`,
  vis:'factfam',check:C('You know 7 × 8 = 56. What is 56 ÷ 8?',['6','7','8','48'],1,'Same fact family: 7 × 8 = 56, so 56 ÷ 8 = 7.')},
 {t:'Divide by counting up the times table',refresh:true,body:`<p>To work out 42 ÷ 6, count up in 6s until you reach 42, and count your jumps.</p>
  <div class="ex"><p>6, 12, 18, 24, 30, 36, 42 &nbsp;→&nbsp; 7 jumps, so 42 ÷ 6 = 7</p></div>
  <div class="plain"><span class="kicker">Tip</span><p>The Times table page (top bar) lets you practise any table and mark the facts you find tricky.</p></div>`,
  vis:'skip',check:C('What is 63 ÷ 9?',['6','7','8','9'],1,'9, 18, 27, 36, 45, 54, 63: that is 7 jumps.')},
 {t:'Remainders: what is left over',refresh:true,body:`<p>Sometimes the sharing doesn't come out exactly. What's left is the <b>remainder</b>.</p>
  <div class="ex"><p>14 ÷ 4: deal 14 cookies onto 4 plates. Each gets 3, and 2 are left over.</p><p>14 ÷ 4 = 3 remainder 2 (written 3 r 2)</p></div>
  <div class="plain"><span class="kicker">Check it</span><p>4 × 3 + 2 = 14 ✓. The remainder is always smaller than the number you divide by.</p></div>`,
  vis:'share2',check:C('What is 17 ÷ 5?',['3 r 2','3 r 5','2 r 7','4 r 3'],0,'5 × 3 = 15, and 17 − 15 = 2 left over. So 3 r 2.')},
 {t:'Handy rules',refresh:true,body:`<ul><li>Any number ÷ 1 = the same number: 9 ÷ 1 = 9</li><li>Any number ÷ itself = 1: 9 ÷ 9 = 1</li><li>0 ÷ any number = 0: 0 ÷ 9 = 0</li><li>You <b>can't</b> divide by 0. It has no answer.</li><li>÷ 10 moves the digits one place to the right: 70 ÷ 10 = 7</li></ul>`,
  vis:'rules',check:C('What is 8 ÷ 8?',['0','1','8','64'],1,'Any number divided by itself is 1.')},
 {t:'Bigger numbers: short division',refresh:true,body:`<p>For a number like 84 ÷ 3, divide one digit at a time, from the left. Carry any remainder to the next digit.</p>
  <div class="ex"><p>8 ÷ 3 = 2 remainder 2 → write 2, carry the 2 to make 24</p><p>24 ÷ 3 = 8 → write 8</p><p>So 84 ÷ 3 = 28</p></div>
  <p>Step through it in the "bus stop" below.</p>`,
  vis:'bus',check:C('What is 96 ÷ 4?',['22','24','26','34'],1,'9 ÷ 4 = 2 r 1, carry 1 to make 16. 16 ÷ 4 = 4. So 24.')}
 ],
 mistakes:[['12 ÷ 3 = 3 ÷ 12','Order matters in division. 12 ÷ 3 = 4, but 3 ÷ 12 is a fraction, ¼.'],['14 ÷ 4 = 3 r 6','The remainder must be smaller than 4. 4 × 3 = 12, so the remainder is 2.'],['5 ÷ 0 = 0','You can\'t divide by 0. There is no answer.']],
 bq:[],checklist:['I can explain division as sharing or as grouping.','I can use the times tables to divide.','I can find a remainder and check it.','I can use short division for bigger numbers.']},

{id:'0.2',title:'Multiplying negative numbers',src:'Foundations',
 goals:['picture negative numbers on a number line','multiply a positive by a negative','understand why a negative times a negative is positive','use the sign rules for multiplying and dividing'],
 hook:{q:'If you multiply two negative numbers, like −3 × −2, is the answer positive or negative?',a:'Positive: −3 × −2 = 6. It surprises a lot of people. This topic shows you why, with a pattern you can see.'},
 big:'Same signs give a positive answer. Different signs give a negative answer.',
 steps:[
 {t:'Negative numbers are below zero',refresh:true,body:`<p>Negative numbers are numbers less than 0, like temperatures below freezing.</p>
  <p>On a number line, they sit to the <b>left</b> of 0. The further left, the smaller: −8 is smaller than −3.</p>`,
  vis:'thermo',check:C('Which is smaller: −8 or −3?',['−8','−3','They are equal'],0,'−8 is further left on the number line, so it is smaller. (8 °C below zero is colder than 3 °C below.)')},
 {t:'Positive × negative: repeated jumps',refresh:true,body:`<p>3 × 4 means three jumps of 4. In the same way, 3 × (−2) means three jumps of −2:</p>
  <div class="ex"><p>3 × (−2) = (−2) + (−2) + (−2) = −6</p></div>
  <p>Each jump goes 2 to the left, so you end up at −6.</p>`,
  vis:'jumps',check:C('What is 4 × (−3)?',['12','−12','−7','1'],1,'Four jumps of −3: −3, −6, −9, −12.')},
 {t:'Negative × negative: follow the pattern',refresh:true,body:`<p>Look at this pattern. Each time the first number goes down by 1, the answer goes <b>up</b> by 2:</p>
  <div class="ex"><p>3 × (−2) = −6 &nbsp; 2 × (−2) = −4 &nbsp; 1 × (−2) = −2 &nbsp; 0 × (−2) = 0</p></div>
  <p>Keep the pattern going: (−1) × (−2) = <b>2</b>, (−2) × (−2) = <b>4</b>. The answers become positive.</p>
  <p>Press the button to continue the pattern yourself.</p>`,
  vis:'pattern',check:C('Continue the pattern: what is (−3) × (−2)?',['−6','6','−5','5'],1,'The answers go up by 2 each time: 2, 4, 6. So (−3) × (−2) = 6.')},
 {t:'The sign rules',refresh:true,body:`<div class="scrollx"><table class="dt"><tr><th>Signs</th><th>Answer</th><th>Example</th></tr><tr><td>+ × +</td><td>+</td><td>3 × 2 = 6</td></tr><tr><td>+ × −</td><td>−</td><td>3 × (−2) = −6</td></tr><tr><td>− × +</td><td>−</td><td>(−3) × 2 = −6</td></tr><tr><td>− × −</td><td>+</td><td>(−3) × (−2) = 6</td></tr></table></div>
  <div class="plain"><span class="kicker">Two steps every time</span><p>1. Multiply the numbers as if there were no signs. 2. Same signs → +, different signs → −.</p></div>`,
  vis:'signs',check:C('What is (−5) × (−4)?',['−20','20','−9','9'],1,'5 × 4 = 20. Both signs are the same, so the answer is +20.')},
 {t:'Dividing follows the same rules',refresh:true,body:`<p>Division is multiplication backwards, so the sign rules are the same:</p>
  <div class="ex"><p>12 ÷ (−3) = −4 &nbsp; (different signs)</p><p>(−12) ÷ (−3) = 4 &nbsp; (same signs)</p></div>
  <p>Check: (−3) × (−4) = 12 ✓ and (−3) × 4 = −12 ✓</p>`,
  vis:'signsdiv',check:C('What is (−18) ÷ 6?',['3','−3','−12','12'],1,'18 ÷ 6 = 3. The signs are different, so −3.')},
 {t:'Three or more negatives: count the minus signs',refresh:true,body:`<p>When you multiply several numbers, count the negative ones:</p>
  <ul><li>An <b>even</b> number of negatives (2, 4, …) → positive answer</li><li>An <b>odd</b> number of negatives (1, 3, …) → negative answer</li></ul>
  <div class="ex"><p>(−2) × (−3) × (−1) = −6 &nbsp; (three negatives, odd)</p></div>
  <div class="plain"><span class="kicker">Why this matters later</span><p>(−2)<sup>3</sup> = (−2) × (−2) × (−2) = −8, and (−3)<sup>2</sup> = 9. You'll use this in Chapters 1 and 2.</p></div>`,
  vis:'countneg',check:C('What is (−1) × (−2) × (−3) × (−1)?',['−6','6','−7','7'],1,'1 × 2 × 3 × 1 = 6. There are four negatives (even), so the answer is +6.')}
 ],
 mistakes:[['(−3) × (−2) = −6','Two negatives multiplied make a positive: +6.'],['3 × (−2) = 6','Different signs give a negative: −6.'],['(−2)³ = 8','Three negatives multiplied give a negative: −8.']],
 bq:[],checklist:['I can place negative numbers on a number line.','I can multiply a positive number by a negative number.','I know why a negative times a negative is positive.','I can use the sign rules to multiply and divide.']}
];

const KEYWORDS0=[
 {id:'k01',topic:'0.1',t:'divide',d:'Share equally, or find how many groups fit. 12 ÷ 3 = 4.'},
 {id:'k02',topic:'0.1',t:'remainder',d:'What is left over when a division doesn\'t come out exactly. 14 ÷ 4 = 3 r 2.'},
 {id:'k03',topic:'0.1',t:'fact family',d:'Facts that use the same three numbers: 3 × 4 = 12, 12 ÷ 3 = 4, 12 ÷ 4 = 3.'},
 {id:'k04',topic:'0.2',t:'negative number',d:'A number less than zero, like −5. It sits to the left of 0 on the number line.'},
 {id:'k05',topic:'0.2',t:'sign rules',d:'Multiplying or dividing: same signs give +, different signs give −.'}
];

const QUIZ0=[
 C('What is 36 ÷ 4?',['8','9','7','32'],1,'4 × 9 = 36.'),
 C('What is 72 ÷ 8?',['8','9','7','64'],1,'8 × 9 = 72.'),
 C('What is 23 ÷ 5?',['4 r 3','4 r 5','3 r 8','5 r 2'],0,'5 × 4 = 20, and 3 is left over.'),
 C('What is 0 ÷ 7?',['7','0','1','You can\'t do it'],1,'Zero shared between 7 is still 0.'),
 C('What is 75 ÷ 3?',['25','35','15','24'],0,'7 ÷ 3 = 2 r 1, carry 1 to make 15, 15 ÷ 3 = 5. So 25.'),
 C('What is 112 ÷ 4?',['28','38','27','18'],0,'11 ÷ 4 = 2 r 3, carry to make 32, 32 ÷ 4 = 8. So 28.'),
 C('What is 5 × (−3)?',['15','−15','−8','2'],1,'Different signs: −15.'),
 C('What is (−6) × (−7)?',['−42','42','−13','13'],1,'Same signs: +42.'),
 C('What is (−4) × 9?',['36','−36','5','−5'],1,'Different signs: −36.'),
 C('What is (−24) ÷ (−6)?',['−4','4','−18','18'],1,'Same signs: +4.'),
 C('What is 30 ÷ (−5)?',['6','−6','25','−25'],1,'Different signs: −6.'),
 C('What is (−2) × (−2) × (−2)?',['8','−8','−6','6'],1,'Three negatives (odd): −8.'),
 C('Which is the smallest?',['−2','−9','0','3'],1,'−9 is furthest left on the number line.'),
 C('What is (−1) × (−1)?',['−1','1','0','−2'],1,'Same signs: +1.')
];

CHAPTERS_DATA[0]={title:'Foundations: division and negative numbers',short:'Foundations',topics:TOPICS0,kw:KEYWORDS0,cyp:[],quiz:QUIZ0,cypNote:'',extra:true,
 sections:['games','cards','quiz'],lead:'Extra practice with the two skills that make the rest of the course easier. This part is not from the book: it is here to get you ready for Chapter 1.'};

/* =================== VISUALS (redrawn, interactive) =================== */
const COL={snow:'#EFEDEE',mist:'#B2A8A7',stone:'#7D746F',blush:'#D0BDBF',rose:'#B78993',taupe:'#8F7C78',cocoa:'#615756',moss:'#67695E',sage:'#779073',espresso:'#3A2522'};
const W_=(name,inner,cap)=>`<div class="vis" data-w="${name}">${inner}${cap?`<p class="cap">${cap}</p>`:''}</div>`;
const slider=(id,min,max,val,label)=>`<label class="ctl"><span class="tiny">${label}</span><input type="range" id="${id}" min="${min}" max="${max}" value="${val}" step="1"></label>`;
const isqrt=n=>{let r=Math.floor(Math.sqrt(n));while(r*r>n)r--;while((r+1)*(r+1)<=n)r++;return r;};
const icbrt=n=>{let r=Math.floor(Math.cbrt(n));while(r*r*r>n)r--;while((r+1)**3<=n)r++;return r;};
const grp=s=>{const [i,d]=String(s).split('.');const gi=i.replace(/\B(?=(\d{3})+(?!\d))/g,' ');return d!=null?gi+'.'+d.replace(/(\d{3})(?=\d)/g,'$1 '):gi;};
const sup=n=>String(n).replace('-',MI);

const VIS={
 squares:()=>W_('squares',`<svg viewBox="0 0 300 220" id="sqSvg" role="img" aria-label="A square made of tiles"></svg><div class="readout" id="sqOut"></div>${slider('sqN',1,12,4,'Side length')}`,'Slide to build a bigger square. The number of tiles is a square number.'),
 cubes:()=>W_('cubes',`<svg viewBox="0 0 300 230" id="cuSvg" role="img" aria-label="A cube made of small blocks"></svg><div class="readout" id="cuOut"></div>${slider('cuN',1,6,4,'Edge length')}`,'Each edge has the same number of blocks.'),
 closer:()=>W_('closer',`<div id="clRows" style="display:grid;gap:10px"></div><div class="row" style="justify-content:center"><button class="btn" id="clNext">Try the next fraction</button></div>`,'Each fraction gets closer to 2, but never lands exactly on it.'),
 sets:()=>W_('sets',`<svg viewBox="0 0 340 210" id="setSvg" role="img" aria-label="Rational numbers contain the integers; irrational numbers are separate"></svg><div class="row" id="setBtns" style="justify-content:center"></div><div class="readout" id="setOut"><small>Tap a number to see where it belongs.</small></div>`),
 tape:()=>W_('tape',`<div id="tapes" style="display:grid;gap:14px"></div><div class="row" style="justify-content:center"><button class="btn" id="tapeGo">Play again</button></div>`,'Stops, repeats, or never repeats.'),
 sorter:()=>W_('sorter',`<div class="row" id="sortBtns" style="justify-content:center"></div><div class="readout" id="sortOut"><small>Tap a card to sort it.</small></div>`),
 sqtest:()=>W_('sqtest',`<svg viewBox="0 0 300 200" id="stSvg" role="img" aria-label="Tiles arranged into the biggest square possible"></svg><div class="readout" id="stOut"></div>${slider('stN',1,120,19,'Number of tiles')}`,'Can all the tiles make one perfect square?'),
 sqline:()=>W_('sqline',`<svg viewBox="0 0 340 120" id="slSvg" role="img" aria-label="Number line of square numbers"></svg><div class="readout" id="slOut"></div><div class="ctl"><span class="tiny">Pick a number</span><input class="field" id="slN" type="number" min="1" max="400" value="90" inputmode="numeric"></div>`),
 crline:()=>W_('crline',`<svg viewBox="0 0 340 120" id="clSvg" role="img" aria-label="Number line of cube numbers"></svg><div class="readout" id="crOut"></div><div class="ctl"><span class="tiny">Pick a number</span><input class="field" id="crN" type="number" min="1" max="1000" value="90" inputmode="numeric"></div>`),
 pv:()=>W_('pv',`<div id="pvBox" style="position:relative;height:118px;max-width:560px;margin:0 auto;width:100%"></div><div class="readout" id="pvOut"></div><div class="row" style="justify-content:center"><button class="btn" id="pvDiv">÷ 10</button><button class="btn primary" id="pvMul">× 10</button><button class="btn" id="pvReset">Start again</button></div>`,'Watch the digits slide. The decimal point stays still.'),
 tens:()=>W_('tens',`<div class="bigm" id="tnBig"></div><div class="readout" id="tnOut"></div>${slider('tnN',0,9,6,'Power of 10')}`),
 anatomy:()=>W_('anatomy',`<svg viewBox="0 0 340 190" role="img" aria-label="The parts of a number in standard form"><rect x="40" y="62" width="64" height="54" rx="12" fill="${COL.blush}"/><text x="72" y="98" text-anchor="middle" font-family="JetBrains Mono" font-size="26" font-weight="700" fill="${COL.cocoa}">6.5</text><text x="130" y="98" text-anchor="middle" font-family="JetBrains Mono" font-size="24" fill="${COL.cocoa}">×</text><rect x="150" y="62" width="80" height="54" rx="12" fill="${COL.snow}" stroke="${COL.mist}" stroke-width="2"/><text x="182" y="98" text-anchor="middle" font-family="JetBrains Mono" font-size="26" font-weight="700" fill="${COL.cocoa}">10</text><rect x="206" y="40" width="30" height="34" rx="9" fill="${COL.rose}"/><text x="221" y="64" text-anchor="middle" font-family="JetBrains Mono" font-size="20" font-weight="700" fill="#fff">5</text>
   <path d="M72 120 V150" stroke="${COL.taupe}" stroke-width="2" stroke-dasharray="4 4"/><text x="72" y="170" text-anchor="middle" font-size="14" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">1 ⩽ this &lt; 10</text>
   <path d="M221 38 V18 H270" stroke="${COL.taupe}" stroke-width="2" stroke-dasharray="4 4" fill="none"/><text x="274" y="22" font-size="14" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">integer</text>
   <path d="M190 120 V150" stroke="${COL.taupe}" stroke-width="2" stroke-dasharray="4 4"/><text x="190" y="170" text-anchor="middle" font-size="14" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">always 10</text></svg>`,'6.5 × 10⁵ = 650 000'),
 hopper:()=>W_('hopper',`<div class="ctl"><span class="tiny">Type a number</span><input class="field" id="hpIn" value="256000000" inputmode="decimal" style="width:190px"><button class="btn primary" id="hpGo">Hop</button></div><div id="hpRow" style="display:flex;justify-content:center;gap:2px;flex-wrap:nowrap;overflow-x:auto;padding:28px 4px 8px;font-family:var(--mono);font-size:22px;font-weight:700"></div><div class="readout" id="hpOut"></div>`,'Try 149600000 (the Sun) or 0.0000256.'),
 tenstair:()=>W_('tenstair',`<div class="bigm" id="tsBig"></div><div class="readout" id="tsOut"></div>${slider('tsN',-6,6,-2,'Power of 10')}`,'Negative powers make the number smaller, not negative.'),
 compare:()=>W_('compare',`<svg viewBox="0 0 340 110" id="cpSvg" role="img" aria-label="Two numbers on a ladder of powers of 10"></svg><div class="row" style="justify-content:center;gap:16px"><span class="m">A = <input class="field" id="cpA1" value="3" style="width:64px"> × 10^<input class="field" id="cpA2" value="5" style="width:56px"></span><span class="m">B = <input class="field" id="cpB1" value="9" style="width:64px"> × 10^<input class="field" id="cpB2" value="4" style="width:56px"></span></div><div class="readout" id="cpOut"></div>`,'Each rung is 10 times bigger than the one below.'),
 chips:()=>W_('chips',`<div id="chRow" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:56px"></div><div class="readout" id="chOut"></div><div class="row" style="justify-content:center">${slider('chB',2,5,3,'Base')}${slider('chN',1,6,4,'Index')}</div>`),
 stair3:()=>W_('stair3',`<div class="scrollx"><table class="dt" id="s3T" style="margin:0 auto"></table></div><div class="readout" id="s3Out"></div>${slider('s3N',-4,6,2,'Index')}`,'Left = ÷ 3. Right = × 3.'),
 negflip:()=>W_('negflip',`<div class="bigm" id="nfBig"></div><div class="readout" id="nfOut"></div><div class="row" style="justify-content:center">${slider('nfA',2,10,5,'Number')}${slider('nfN',1,4,2,'Negative index')}</div>`),
 mul:()=>W_('mul',`<div id="muBox" style="display:grid;gap:8px"></div><div class="readout" id="muOut"></div><div class="row" style="justify-content:center">${slider('muA',-3,5,2,'First index')}${slider('muB',-3,5,3,'Second index')}</div>`,'Top row: 3s being multiplied. Bottom row: 3s being divided. A 3 on top and a 3 below cancel out.'),
 div:()=>W_('div',`<div id="dvBox" style="display:grid;gap:8px"></div><div class="readout" id="dvOut"></div><div class="row" style="justify-content:center">${slider('dvA',0,7,5,'Top index')}${slider('dvB',0,7,3,'Bottom index')}</div>`,'Matching 2s on top and bottom cancel out.'),
 base:()=>W_('base',`<div class="row" id="bsBtns" style="justify-content:center"></div><div id="bsBox" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;min-height:60px"></div><div class="readout" id="bsOut"></div>`)
};

const chip=(t,c,extra='')=>`<span class="fadein" style="display:inline-grid;place-items:center;min-width:42px;height:42px;padding:0 8px;border-radius:50%;background:${c};color:${c===COL.cocoa||c===COL.moss||c===COL.taupe?'#fff':COL.cocoa};font-family:var(--mono);font-weight:700;box-shadow:3px 3px 7px rgba(143,124,120,.35),-3px -3px 7px #fff;${extra}">${t}</span>`;

const INIT={
 squares(el){const s=$('#sqN',el),svg=$('#sqSvg',el),out=$('#sqOut',el);const f=()=>{const n=+s.value,sz=Math.min(200/n,34),x0=150-n*sz/2,y0=110-n*sz/2;let h='';
   for(let i=0;i<n;i++)for(let j=0;j<n;j++)h+=`<rect x="${x0+j*sz+1}" y="${y0+i*sz+1}" width="${sz-2}" height="${sz-2}" rx="${Math.min(6,sz/5)}" fill="${(i+j)%2?COL.blush:COL.rose}" style="animation:rise .4s ${((i+j)*.03).toFixed(2)}s both"/>`;
   h+=`<text x="${x0-8}" y="110" text-anchor="end" font-family="JetBrains Mono" font-size="15" fill="${COL.cocoa}">${n}</text><text x="150" y="${y0-8}" text-anchor="middle" font-family="JetBrains Mono" font-size="15" fill="${COL.cocoa}">${n}</text>`;
   svg.innerHTML=h;out.innerHTML=`${n} × ${n} = ${n*n} tiles<small>So ${n*n} is a square number, and ${SQ(n*n)} = ${n}</small>`;};s.oninput=f;f();},
 cubes(el){const s=$('#cuN',el),svg=$('#cuSvg',el),out=$('#cuOut',el);const f=()=>{const n=+s.value,a=150/n*0.62;const cx=150,cy=40;const cos=Math.cos(Math.PI/6),sin=.5;
   const P=(x,y,z)=>[cx+(x-y)*a*cos,cy+(x+y)*a*sin+ (n-z)*a];let h='';
   const poly=(pts,fill)=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="${COL.snow}" stroke-width="1.4"/>`;
   for(let x=0;x<n;x++)for(let y=0;y<n;y++)h+=poly([P(x,y,n),P(x+1,y,n),P(x+1,y+1,n),P(x,y+1,n)],COL.blush);
   for(let x=0;x<n;x++)for(let z=0;z<n;z++)h+=poly([P(x,n,z),P(x+1,n,z),P(x+1,n,z+1),P(x,n,z+1)],COL.rose);
   for(let y=0;y<n;y++)for(let z=0;z<n;z++)h+=poly([P(n,y,z),P(n,y+1,z),P(n,y+1,z+1),P(n,y,z+1)],COL.taupe);
   svg.innerHTML=h;out.innerHTML=`${n} × ${n} × ${n} = ${n**3} blocks<small>So ${PW(n,3)} = ${n**3}, and ${CR(n**3)} = ${n}</small>`;};s.oninput=f;f();},
 closer(el){const rows=$('#clRows',el);const D=[[MX(1,1,2),MX(2,1,4),F(1,4),.25],[MX(1,5,12),MX(2,1,144),F(1,144),1/144],[MX(1,169,408),MX(2,1,166464),F(1,166464),1/166464]];let k=0;
   const f=()=>{rows.innerHTML=D.slice(0,k+1).map(d=>{const w=Math.max(1.5,100*(1+Math.log10(d[3])/6));return `<div class="fadein" style="display:grid;gap:4px"><div class="m">(${d[0]})<sup>2</sup> = ${d[1]}</div><div style="display:flex;align-items:center;gap:10px"><span style="height:12px;border-radius:12px;background:${COL.rose};width:${w}%;transition:width .6s"></span><span class="tiny" style="white-space:nowrap">${d[2]} too big</span></div></div>`}).join('');$('#clNext',el).textContent=k<2?'Try the next fraction':'Start again';};
   $('#clNext',el).onclick=()=>{k=k<2?k+1:0;f();};f();},
 sets(el){const svg=$('#setSvg',el);svg.innerHTML=`<rect x="6" y="10" width="208" height="190" rx="40" fill="${COL.blush}" opacity=".55"/><text x="110" y="34" text-anchor="middle" font-size="15" font-weight="700" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">Rational numbers</text><rect x="36" y="90" width="148" height="96" rx="30" fill="${COL.snow}" stroke="${COL.rose}" stroke-width="2"/><text x="110" y="112" text-anchor="middle" font-size="14" font-weight="700" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">Integers</text><rect x="224" y="10" width="110" height="190" rx="36" fill="${COL.mist}" opacity=".5"/><text x="279" y="34" text-anchor="middle" font-size="14" font-weight="700" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">Irrational</text><g id="setDots"></g>`;
   const N=[['13',110,150,'Integer (and so rational too)'],[MI+'26',150,165,'Integer (and so rational too)'],['9¾',60,62,'Rational: 9¾ = 9.75, the decimal stops'],['18 5/11',150,62,'Rational: 18.4545…, the decimal repeats'],['√7',279,80,'Irrational: 2.645751…, never stops, never repeats. It is a surd.'],['π',279,130,'Irrational, but not a root, so not a surd'],['√9',70,160,'√9 = 3, so it is an integer']];
   $('#setBtns',el).innerHTML=N.map((n,i)=>`<button class="btn" data-sn="${i}">${n[0]}</button>`).join('');
   el.addEventListener('click',e=>{const b=e.target.closest('[data-sn]');if(!b)return;const n=N[+b.dataset.sn];$('#setDots',el).insertAdjacentHTML('beforeend',`<g class="fadein"><circle cx="${n[1]}" cy="${n[2]}" r="17" fill="${COL.cocoa}"/><text x="${n[1]}" y="${n[2]+5}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="JetBrains Mono">${n[0].replace(' 5/11','…')}</text></g>`);$('#setOut',el).innerHTML=`${n[0]}<small>${n[3]}</small>`;});},
 tape(el){const box=$('#tapes',el);let timers=[];const root7=Math.sqrt(7).toFixed(14);
   const T=[['9¾',['9','.','7','5'],'stop','It stops. Rational.'],['18 5/11',['1','8','.','4','5','4','5','4','5','4','5','4','5'],'rep','4 and 5 repeat forever. Rational.'],['√7',root7.split(''),'none','Never stops, never repeats. Irrational.']];
   const go=()=>{timers.forEach(clearTimeout);timers=[];box.innerHTML=T.map((t,i)=>`<div style="display:grid;gap:4px"><div class="tiny"><b>${t[0]}</b> = </div><div id="tp${i}" style="display:flex;flex-wrap:wrap;gap:3px;font-family:var(--mono);font-size:19px;font-weight:700;min-height:34px"></div><div class="tiny" id="tq${i}" style="opacity:0;transition:opacity .4s">${t[3]}</div></div>`).join('');
    T.forEach((t,i)=>{t[1].forEach((d,j)=>{timers.push(setTimeout(()=>{const s=document.createElement('span');s.textContent=d;s.className='fadein';s.style.cssText=`padding:2px 4px;border-radius:7px;${t[2]==='rep'&&j>2?`background:${(j-3)%2?COL.blush:COL.rose};color:${(j-3)%2?COL.cocoa:'#fff'}`:''}`;$('#tp'+i,el).appendChild(s);},reduceMotion?0:(i*700+j*110)));});
     timers.push(setTimeout(()=>{const p=$('#tp'+i,el);const e=document.createElement('span');e.className='fadein';e.style.cssText='padding:2px 6px;border-radius:7px;font-size:14px;align-self:center;color:'+COL.taupe;e.textContent=t[2]==='stop'?'■ end':'…forever';p.appendChild(e);$('#tq'+i,el).style.opacity=1;},reduceMotion?0:(i*700+t[1].length*110+150)));});};
   $('#tapeGo',el).onclick=go;go();},
 sorter(el){const N=[[SQ(9),'Integer: √9 = 3'],[SQ(7),'Surd: an irrational square root'],['π','Irrational, but not a surd (it is not a root)'],[F(1,3),'Rational: it is a fraction'],[SQ(23),'Surd: 23 is not a square number'],[CR(10),'Surd: an irrational cube root'],[CR(8),'Integer: ∛8 = 2']];
   $('#sortBtns',el).innerHTML=N.map((n,i)=>`<button class="btn" data-so="${i}" style="font-size:19px;min-width:62px;justify-content:center">${n[0]}</button>`).join('');
   el.addEventListener('click',e=>{const b=e.target.closest('[data-so]');if(!b)return;$$('[data-so]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));$('#sortOut',el).innerHTML=`<span class="fadein">${N[+b.dataset.so][0]}</span><small>${N[+b.dataset.so][1]}</small>`;});},
 sqtest(el){const s=$('#stN',el),svg=$('#stSvg',el),out=$('#stOut',el);const f=()=>{const n=+s.value,k=isqrt(n),left=n-k*k,cols=Math.max(k+1,Math.ceil(Math.sqrt(n))+1),sz=Math.min(18,170/Math.max(k+1,4));let h='';const x0=150-(k*sz)/2-(left?sz:0),y0=100-(k*sz)/2;
   for(let i=0;i<k;i++)for(let j=0;j<k;j++)h+=`<rect x="${x0+j*sz+.8}" y="${y0+i*sz+.8}" width="${sz-1.6}" height="${sz-1.6}" rx="3" fill="${COL.rose}"/>`;
   for(let i=0;i<left;i++){const col=k+1+Math.floor(i/Math.max(k,1)),row=i%Math.max(k,1);h+=`<rect x="${x0+col*sz+.8}" y="${y0+row*sz+.8}" width="${sz-1.6}" height="${sz-1.6}" rx="3" fill="${COL.mist}"/>`;}
   svg.innerHTML=h;out.innerHTML=left?`${SQ(n)} is irrational<small>The biggest square uses ${k*k} tiles (${k} × ${k}), with ${left} left over. ${n} is not a square number.</small>`:`${SQ(n)} = ${k}, an integer<small>All ${n} tiles make a perfect ${k} × ${k} square.</small>`;};s.oninput=f;f();},
 sqline(el){lineWidget(el,'#slSvg','#slOut','#slN',2,400);},
 crline(el){lineWidget(el,'#clSvg','#crOut','#crN',3,1000);},
 pv(el){const box=$('#pvBox',el),out=$('#pvOut',el);const cols=['1000s','100s','10s','1s','.','10ths','100ths','1000ths','10 000ths'];const n=cols.length;
   box.innerHTML=cols.map((c,i)=>`<div style="position:absolute;left:${i/n*100}%;width:${100/n}%;top:0;text-align:center;font-size:11px;color:${COL.taupe}">${c==='.'?'':c}</div>${c==='.'?`<div style="position:absolute;left:${(i+.5)/n*100}%;top:52px;transform:translateX(-50%);font-size:34px;font-weight:800;color:${COL.cocoa}">.</div>`:`<div style="position:absolute;left:${(i/n*100)+.6}%;width:${100/n-1.2}%;top:24px;height:62px;border-radius:12px;box-shadow:var(--press)"></div>`}`).join('')+`<div id="pvDig"></div>`;
   const base=['4','6','7'];let shift=0;// shift: + means moved left (×10)
   const pos=k=>{// k: digit index 0.. ; digit 0 sits in 1s column (index 3) when shift=0
     let col=3+k-shift;if(col>=4)col++;return col;};
   const dig=$('#pvDig',box);dig.innerHTML=base.map((d,k)=>`<div class="pvd" style="position:absolute;top:30px;width:${100/n}%;text-align:center;font-family:var(--mono);font-size:30px;font-weight:700;transition:left .6s cubic-bezier(.2,.8,.2,1)">${d}</div>`).join('')+`<div id="pvZ"></div>`;
   const f=()=>{$$('.pvd',dig).forEach((e,k)=>{e.style.left=(pos(k)/n*100)+'%';});
     // placeholder zeros between last digit and the point, and before the point
     let z='';const last=pos(2),first=pos(0);if(last<4){for(let c=last+1;c<4;c++)z+=`<div class="fadein" style="position:absolute;left:${c/n*100}%;top:30px;width:${100/n}%;text-align:center;font-family:var(--mono);font-size:30px;font-weight:700;color:${COL.taupe}">0</div>`;}
     if(first>4){for(let c=3;c<first;c++){if(c===4)continue;z+=`<div class="fadein" style="position:absolute;left:${c/n*100}%;top:30px;width:${100/n}%;text-align:center;font-family:var(--mono);font-size:30px;font-weight:700;color:${COL.taupe}">0</div>`;}}
     $('#pvZ',dig).innerHTML=z;
     const val=(467*10**shift)/100;const txt=shift>=0?String(467*10**shift/100):(467/10**(2-shift)).toFixed(2-shift);
     out.innerHTML=`4.67 ${shift>0?'× '+(10**shift):shift<0?'÷ '+(10**-shift):''} = ${shift>0?grp(String(val)):txt}<small>${shift===0?'Start here.':shift>0?`The digits moved ${shift} place${shift>1?'s':''} to the left.`:`The digits moved ${-shift} place${shift<-1?'s':''} to the right.`}</small>`;
     $('#pvMul',el).disabled=shift>=3;$('#pvDiv',el).disabled=shift<=-2;};
   $('#pvMul',el).onclick=()=>{shift++;f();};$('#pvDiv',el).onclick=()=>{shift--;f();};$('#pvReset',el).onclick=()=>{shift=0;f();};f();},
 tens(el){const s=$('#tnN',el);const words=['one','ten','one hundred','one thousand','ten thousand','one hundred thousand','one million','ten million','one hundred million','one billion'];
   const f=()=>{const n=+s.value;const num='1'+'0'.repeat(n);$('#tnBig',el).innerHTML=`10<sup>${n}</sup> = <span style="color:${COL.taupe}">${grp(num)}</span>`;$('#tnOut',el).innerHTML=`${n} zero${n===1?'':'s'}<small>${words[n]}${n?` · ${Array(n).fill('10').join(' × ')}`:' · anything to the power 0 is 1'}</small>`;};s.oninput=f;f();},
 hopper(el){const inp=$('#hpIn',el),row=$('#hpRow',el),out=$('#hpOut',el);let tm=null;
   const go=()=>{clearInterval(tm);let v=inp.value.replace(/[\s,]/g,'');if(!/^\d*\.?\d*$/.test(v)||!/[1-9]/.test(v)){out.innerHTML='<small>Type a positive number, like 256000000 or 0.0000256.</small>';row.innerHTML='';return;}
     if(v.startsWith('.'))v='0'+v;v=v.replace(/^0+(?=\d)/,'');if(v.endsWith('.'))v=v.slice(0,-1);
     const p=v.includes('.')?v.indexOf('.'):v.length;const digs=v.replace('.','');if(digs.length>18){out.innerHTML='<small>That is a lot of digits. Try a shorter number.</small>';return;}
     const f1=digs.search(/[1-9]/);const target=f1+1;const n=p-target;let cur=p;
     const rest=digs.slice(f1+1).replace(/0+$/,'');const a=digs[f1]+(rest?'.'+rest:'');
     const draw=()=>{let h='';for(let i=0;i<=digs.length;i++){if(i===cur)h+=`<span style="color:${COL.rose};font-size:30px;line-height:1;align-self:flex-end;margin:0 1px">●</span>`;if(i<digs.length){const lead=i<f1;h+=`<span style="display:inline-grid;place-items:center;width:26px;height:40px;border-radius:9px;box-shadow:${i===f1?'var(--press)':'none'};color:${lead?COL.mist:COL.cocoa}">${digs[i]}</span>`;}}row.innerHTML=h;};
     draw();let hops=0;const total=Math.abs(n);out.innerHTML=`<small>The point starts after the last whole-number digit…</small>`;
     const finish=()=>{out.innerHTML=`${grp(v)} = ${a} × 10<sup>${sup(n)}</sup><small>The point hopped ${total} place${total===1?'':'s'} ${n>0?'left, so the power is +'+n:n<0?'right, so the power is '+sup(n):'(no hops), so the power is 0'}.</small>`;};
     if(!total||reduceMotion){cur=target;draw();finish();return;}
     tm=setInterval(()=>{cur+=n>0?-1:1;hops++;draw();out.innerHTML=`<small>Hop ${hops}…</small>`;if(hops>=total){clearInterval(tm);finish();}},420);};
   $('#hpGo',el).onclick=go;inp.addEventListener('keydown',e=>{if(e.key==='Enter')go();});go();},
 tenstair(el){const s=$('#tsN',el);const f=()=>{const n=+s.value;// 4.67 × 10^n as exact decimal string
   let str;if(n>=0){const z=n-2;str=z>=0?'467'+'0'.repeat(z):('467'.slice(0,3+z)+'.'+'467'.slice(3+z)).replace(/\.$/,'');}else{str='0.'+'0'.repeat(-n-1)+'467';}
   $('#tsBig',el).innerHTML=`4.67 × 10<sup>${sup(n)}</sup> = <span style="color:${COL.taupe}">${grp(str)}</span>`;
   $('#tsOut',el).innerHTML=n<0?`the same as 4.67 ÷ ${grp('1'+'0'.repeat(-n))}<small>The point moves ${-n} place${n<-1?'s':''} to the right in standard form.</small>`:n===0?`10<sup>0</sup> = 1, so nothing changes`:`the same as 4.67 × ${grp('1'+'0'.repeat(n))}`;};s.oninput=f;f();},
 compare(el){const ids=['#cpA1','#cpA2','#cpB1','#cpB2'];const f=()=>{const [a1,a2,b1,b2]=ids.map(i=>parseFloat($(i,el).value));const svg=$('#cpSvg',el);
   if([a1,a2,b1,b2].some(isNaN)||a1<1||a1>=10||b1<1||b1>=10||!Number.isInteger(a2)||!Number.isInteger(b2)){$('#cpOut',el).innerHTML='<small>Use front numbers from 1 up to (not including) 10, and whole-number powers.</small>';return;}
   const lo=Math.min(a2,b2)-1,hi=Math.max(a2,b2)+2,X=v=>20+(v-lo)/(hi-lo)*300;let h=`<line x1="20" y1="60" x2="320" y2="60" stroke="${COL.mist}" stroke-width="4" stroke-linecap="round"/>`;
   for(let k=lo;k<=hi;k++)h+=`<line x1="${X(k)}" y1="50" x2="${X(k)}" y2="70" stroke="${COL.taupe}" stroke-width="2"/><text x="${X(k)}" y="92" text-anchor="middle" font-size="12" fill="${COL.cocoa}" font-family="JetBrains Mono">10<tspan dy="-6" font-size="9">${sup(k)}</tspan></text>`;
   const pa=X(a2+Math.log10(a1)),pb=X(b2+Math.log10(b1));h+=`<circle cx="${pa}" cy="60" r="12" fill="${COL.rose}"/><text x="${pa}" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">A</text><circle cx="${pb}" cy="60" r="12" fill="${COL.cocoa}"/><text x="${pb}" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">B</text>`;svg.innerHTML=h;
   const va=a2+Math.log10(a1),vb=b2+Math.log10(b1);$('#cpOut',el).innerHTML=a2!==b2?`${a2>b2?'A':'B'} is bigger<small>Its power of 10 is bigger (${sup(Math.max(a2,b2))} beats ${sup(Math.min(a2,b2))}), so the front numbers don't matter.</small>`:(a1===b1?'They are equal':`${a1>b1?'A':'B'} is bigger<small>The powers are the same, so compare the front numbers: ${Math.max(a1,b1)} &gt; ${Math.min(a1,b1)}.</small>`);};
   ids.forEach(i=>$(i,el).addEventListener('input',f));f();},
 chips(el){const b=$('#chB',el),n=$('#chN',el);const f=()=>{const B=+b.value,N=+n.value;$('#chRow',el).innerHTML=Array.from({length:N},(_,i)=>chip(B,i%2?COL.blush:COL.rose,`animation-delay:${i*.06}s`)).join(`<span style="align-self:center;font-weight:700">×</span>`);
   let run=1,steps=[];for(let i=0;i<N;i++){run*=B;steps.push(run);}$('#chOut',el).innerHTML=`${PW(B,N)} = ${Array(N).fill(B).join(' × ')} = ${run}<small>Running total: ${steps.join(' → ')}</small>`;};b.oninput=n.oninput=f;f();},
 stair3(el){const s=$('#s3N',el);const V=k=>k>=0?String(3**k):F(1,3**-k);const f=()=>{const n=+s.value;let h='<tr>';for(let k=-4;k<=6;k++)h+=`<th style="${k===n?`background:${COL.rose};color:#fff;border-radius:10px`:''}">3<sup>${sup(k)}</sup></th>`;h+='</tr><tr>';for(let k=-4;k<=6;k++)h+=`<td style="${k===n?`box-shadow:var(--press);border-radius:10px;font-weight:700`:''}">${V(k)}</td>`;$('#s3T',el).innerHTML=h+'</tr>';
   $('#s3Out',el).innerHTML=`3<sup>${sup(n)}</sup> = ${V(n)}<small>${n>0?`${Array(n).fill(3).join(' × ')}`:n===0?'3 ÷ 3 = 1. It fits the pattern.':`1 ÷ 3, ${-n} time${n<-1?'s':''}, which is 1 over 3<sup>${-n}</sup>`}</small>`;};s.oninput=f;f();},
 negflip(el){const a=$('#nfA',el),n=$('#nfN',el);const f=()=>{const A=+a.value,N=+n.value;$('#nfBig',el).innerHTML=`<span class="fadein" style="display:inline-block">${A}<sup>${MI}${N}</sup> = ${F(1,PW(A,N))} = ${F(1,grp(String(A**N)))}</span>`;$('#nfOut',el).innerHTML=`a tiny positive number<small>The minus in the index flips the power into "1 over". It does not make the answer negative.</small>`;};a.oninput=n.oninput=f;f();},
 mul(el){chipCancel(el,'#muBox','#muOut','#muA','#muB',3,false);},
 div(el){chipCancel(el,'#dvBox','#dvOut','#dvA','#dvB',2,true);},
 base(el){const E=[[8,2,2,3],[27,2,3,3],[9,2,3,2],[4,3,2,2],[25,2,5,2]];$('#bsBtns',el).innerHTML=E.map((e,i)=>`<button class="btn" data-bs="${i}"><span>${PW(e[0],e[1])}</span></button>`).join('');
   const f=i=>{const [N,p,b,k]=E[i];$$('[data-bs]',el).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.bs===i));
    $('#bsBox',el).innerHTML=Array.from({length:p},(_,g)=>`<span class="fadein" style="display:inline-flex;gap:4px;padding:6px 8px;border-radius:16px;box-shadow:var(--press);animation-delay:${g*.15}s"><span class="tiny" style="align-self:center;margin-right:4px">${N} =</span>${Array.from({length:k},()=>chip(b,g%2?COL.blush:COL.rose,'min-width:34px;height:34px')).join('')}</span>`).join('<span style="align-self:center;font-weight:700">×</span>');
    $('#bsOut',el).innerHTML=`${PW(N,p)} = ${Array(p).fill(PW(b,k)).join(' × ')} = ${PW(b,k*p)}<small>${N} = ${PW(b,k)}, and there are ${k*p} ${b}s altogether.</small>`;};
   el.addEventListener('click',e=>{const x=e.target.closest('[data-bs]');if(x)f(+x.dataset.bs);});f(0);}
};
function lineWidget(el,svgSel,outSel,inSel,pow,max){const inp=$(inSel,el);const f=()=>{let N=Math.round(+inp.value);const svg=$(svgSel,el),out=$(outSel,el);
  if(!(N>=1&&N<=max)){out.innerHTML=`<small>Pick a whole number from 1 to ${max}.</small>`;svg.innerHTML='';return;}
  const k=pow===2?isqrt(N):icbrt(N);const lo=k**pow,hi=(k+1)**pow,exact=lo===N;const sym=pow===2?SQ:CR;
  const a=Math.max(0,k-1),b=k+2,X=v=>20+(v-a**pow)/((b**pow)-(a**pow))*300;let h=`<line x1="20" y1="60" x2="320" y2="60" stroke="${COL.mist}" stroke-width="4" stroke-linecap="round"/>`;
  for(let m=a;m<=b;m++){const x=X(m**pow);h+=`<line x1="${x}" y1="48" x2="${x}" y2="72" stroke="${m===k||m===k+1?COL.rose:COL.taupe}" stroke-width="${m===k||m===k+1?3:2}"/><text x="${x}" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="${COL.cocoa}" font-family="JetBrains Mono">${m**pow}</text><text x="${x}" y="92" text-anchor="middle" font-size="12" fill="${COL.taupe}" font-family="JetBrains Mono">${m}${pow===2?'²':'³'}</text>`;}
  if(!exact)h+=`<rect x="${X(lo)}" y="54" width="${X(hi)-X(lo)}" height="12" rx="6" fill="${COL.blush}"/>`;
  h+=`<g class="fadein"><circle cx="${X(N)}" cy="60" r="9" fill="${COL.cocoa}"/><text x="${X(N)}" y="112" text-anchor="middle" font-size="13" font-weight="700" fill="${COL.cocoa}" font-family="JetBrains Mono">${N}</text></g>`;svg.innerHTML=h;
  if(exact){out.innerHTML=`${sym(N)} = ${k} exactly<small>${N} = ${k}${pow===2?'²':'³'}, so its root is a whole number.</small>`;return;}
  // nearest whole number: compare N with (k + 0.5)^pow
  const mid=(k+.5)**pow,near=N<mid?k:k+1;
  out.innerHTML=`${k} &lt; ${sym(N)} &lt; ${k+1}<small>${lo} &lt; ${N} &lt; ${hi}. To the nearest whole number, ${sym(N)} ≈ ${near}.</small>`;};
 inp.addEventListener('input',f);f();}
function chipCancel(el,boxSel,outSel,aSel,bSel,base,divide){const A=$(aSel,el),B=$(bSel,el);const f=()=>{const a=+A.value,b=+B.value;const e2=divide?-b:b;
  // numerator copies from positive indices, denominator copies from negative ones
  const top=[],bot=[];const add=(e,c)=>{for(let i=0;i<Math.abs(e);i++)(e>0?top:bot).push(c);};add(a,COL.rose);add(e2,COL.taupe);
  const cancel=Math.min(top.length,bot.length);const r=a+e2;
  const rowH=(arr,label)=>`<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-height:46px"><span class="tiny" style="width:64px">${label}</span>${arr.length?arr.map((c,i)=>chip(base,c,i<cancel?'opacity:.35;text-decoration:line-through;':'')).join(''):'<span class="tiny">(nothing)</span>'}</div>`;
  $(boxSel,el).innerHTML=rowH(top,'Multiply')+`<div style="height:2px;background:${COL.mist};border-radius:2px"></div>`+rowH(bot,'Divide');
  const opTxt=divide?`${base}<sup>${sup(a)}</sup> ÷ ${base}<sup>${sup(b)}</sup>`:`${base}<sup>${sup(a)}</sup> × ${base}<sup>${sup(b)}</sup>`;
  $(outSel,el).innerHTML=`${opTxt} = ${base}<sup>${sup(r)}</sup><small>${divide?`${sup(a)} ${MI} ${sup(b)} = ${sup(r)}`:`${sup(a)} + ${b<0?'('+sup(b)+')':b} = ${sup(r)}`}${cancel?` · ${cancel} pair${cancel>1?'s':''} cancelled`:''}${r<0?` · ${base}<sup>${sup(r)}</sup> = ${F(1,PW(base,-r))}`:r===0?' · anything to the power 0 is 1':''}</small>`;};A.oninput=B.oninput=f;f();}
function initVisuals(root){$$('.vis[data-w]',root).forEach(el=>{if(el.dataset.ready)return;el.dataset.ready=1;const f=INIT[el.dataset.w];if(f)try{f(el);}catch(err){console.error('visual',el.dataset.w,err);}});}

/* =================== CHAPTER 2 VISUALS =================== */
const nb=n=>n<0?`(${MI}${-n})`:String(n);           // number in brackets if negative
const ns=n=>n<0?`${MI}${-n}`:String(n);             // signed number with real minus
const r2=v=>Math.round(v*100)/100;
// a term with a sign: first term has no leading +
function term(c,v,first){if(c===0)return '';const sg=c<0?(first?MI:` ${MI} `):(first?'':' + ');const a=Math.abs(c);return sg+(v?(a===1?'':a)+v:a);}
function poly(parts){let out='',first=true;for(const [c,v] of parts){const t=term(c,v,first);if(t){out+=t;first=false;}}return out||'0';}
const sl=(id,min,max,val,label,step=1)=>`<label class="ctl"><span class="tiny">${label}</span><input type="range" id="${id}" min="${min}" max="${max}" value="${val}" step="${step}"></label>`;
const pickRow=(name,items)=>`<div class="row" style="justify-content:center">${items.map((t,i)=>`<button class="btn" data-${name}="${i}" aria-pressed="${i===0}">${t}</button>`).join('')}</div>`;
// a step-through player: lines appear one at a time
function stepPlayer(el,boxSel,lines,btnSel){const box=$(boxSel,el),btn=$(btnSel,el);let k=0;
 const f=()=>{box.innerHTML=lines.slice(0,k+1).map((l,i)=>`<div class="${i===k?'fadein':''}" style="display:grid;gap:2px;padding:8px 12px;border-radius:12px;${i===k?'box-shadow:var(--press)':''}"><span class="m" style="white-space:normal;font-size:17px">${l[0]}</span>${l[1]?`<span class="tiny">${l[1]}</span>`:''}</div>`).join('');btn.textContent=k<lines.length-1?'Next step':'Start again';};
 btn.onclick=()=>{k=k<lines.length-1?k+1:0;f();};f();return {set:L=>{lines=L;k=0;f();}};}

Object.assign(VIS,{
 letterbox:()=>W_('letterbox',`<div class="readout" id="lbX"></div><div id="lbCards" style="display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))"></div>${sl('lbN',-5,10,4,'Value of x')}`,'Slide to change x. Every card updates.'),
 order:()=>W_('order',pickRow('ord',['2 + 3 × 4','(2 + 3) × 4','20 − 2 × 3²','18 ÷ (4 − 1) + 2'])+`<div id="ordBox" style="display:grid;gap:8px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="ordNext">Next step</button></div>`,'Brackets, then powers, then × and ÷, then + and −.'),
 negline:()=>W_('negline',pickRow('nl',['20 − (−18)','5 − 8','−4 − (−6)','−3 + 7'])+`<svg viewBox="0 0 340 110" id="nlSvg" role="img" aria-label="Number line showing the calculation"></svg><div class="readout" id="nlOut"></div><div class="scrollx"><table class="dt" style="margin:0 auto"><tr><th>×  or  ÷</th><th>+</th><th>${MI}</th></tr><tr><th>+</th><td>+</td><td>${MI}</td></tr><tr><th>${MI}</th><td>${MI}</td><td>+</td></tr></table></div>`,'Same signs give +. Different signs give −.'),
 subst:()=>W_('subst',`<div class="bigm">5a − 6b</div><div class="row" style="justify-content:center">${sl('sbA',-6,9,4,'a')}${sl('sbB',-6,9,-3,'b')}</div><div id="sbBox" style="display:grid;gap:8px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="sbNext">Next step</button></div>`,'Start with the book\'s numbers, a = 4 and b = −3, then try your own.'),
 subst2:()=>W_('subst2',`<div class="bigm">3x² − 2y³</div><div class="row" style="justify-content:center">${sl('s2X',-6,6,-5,'x')}${sl('s2Y',-4,4,2,'y')}</div><div id="s2Box" style="display:grid;gap:8px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="s2Next">Next step</button></div>`,'Powers are worked out before anything else.'),
 subst3:()=>W_('subst3',`<div class="bigm">p(5 − ${F('4q','p')})</div><div id="s3Box" style="display:grid;gap:8px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="s3Next">Next step</button></div>`,'Worked example 2.1c with p = 2 and q = −3.'),
 negsq:()=>W_('negsq',`<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))"><div class="plain" id="nqA"></div><div class="plain" id="nqB"></div></div><div class="row" style="justify-content:center">${sl('nqN',1,6,3,'Number')}${sl('nqP',2,3,2,'Power')}</div>`,'The bracket decides whether the minus sign is included.'),
 counter:()=>W_('counter',pickRow('ct',['2x² = (2x)²','3x² = (3x)²','(−x)⁴ = −x⁴'])+`<svg viewBox="0 0 320 150" id="ctSvg" role="img" aria-label="Bars comparing the two sides"></svg><div class="readout" id="ctOut"></div>${sl('ctX',-5,5,3,'Value of x')}`,'One value that makes the two sides different is enough.'),
 machine:()=>W_('machine',`<div class="row" style="justify-content:center;gap:8px">${['+ 5','− 5','× 5','÷ 5','square it','√ it','take it from 5'].map((t,i)=>`<button class="btn" data-mop="${i}">${t}</button>`).join('')}</div><div class="bigm" id="mcExpr">n</div><div class="readout" id="mcOut"></div><div class="row" style="justify-content:center"><span class="tiny">Test with n =</span><input class="field" id="mcN" type="number" value="10" style="width:80px"><button class="btn" id="mcReset">Start again</button></div>`,'Tap up to four instructions. Brackets appear when they are needed.'),
 machine2:()=>W_('machine',`<div class="row" style="justify-content:center;gap:8px">${['+ 3','− 6','× 4','÷ 3','square it','√ it','halve it'].map((t,i)=>`<button class="btn" data-mop="${i}">${t}</button>`).join('')}</div><div class="bigm" id="mcExpr">n</div><div class="readout" id="mcOut"></div><div class="row" style="justify-content:center"><span class="tiny">Test with n =</span><input class="field" id="mcN" type="number" value="9" style="width:80px"><button class="btn" id="mcReset">Start again</button></div>`,'Try "+ 3" then "× 4", and then "× 4" then "+ 3". Compare.').replace('data-w="machine"','data-w="machine" data-set="2"'),
 machine3:()=>W_('machine',`<div class="row" style="justify-content:center;gap:8px">${['× 3','× 2','square it','cube it','+ 7','− 100','√ it'].map((t,i)=>`<button class="btn" data-mop="${i}">${t}</button>`).join('')}</div><div class="bigm" id="mcExpr">x</div><div class="readout" id="mcOut"></div><div class="row" style="justify-content:center"><span class="tiny">Test with x =</span><input class="field" id="mcN" type="number" value="2" style="width:80px"><button class="btn" id="mcReset">Start again</button></div>`,'Try × 3, then square it, then + 7.').replace('data-w="machine"','data-w="machine" data-set="3"'),
 rect:()=>W_('rect',pickRow('rc',['x + 5 by 2x','x + 2 by 3','x by x + 4','x² by 4x'])+`<svg viewBox="0 0 320 190" id="rcSvg" role="img" aria-label="Rectangle with algebraic side lengths"></svg><div class="readout" id="rcOut"></div>${sl('rcX',1,10,3,'Value of x')}`,'Check: the numbers from the picture match the numbers from the expression.'),
 rect2:()=>VIS.rect(),
 xmul:()=>W_('xmul',`<div id="xmBox" style="display:grid;gap:8px"></div><div class="readout" id="xmOut"></div><div class="row" style="justify-content:center">${sl('xmA',0,6,2,'First index')}${sl('xmB',0,6,3,'Second index')}</div>`,'Count all the x\'s: that total is the new index.'),
 xdiv:()=>W_('xdiv',`<div id="xdBox" style="display:grid;gap:8px"></div><div class="readout" id="xdOut"></div><div class="row" style="justify-content:center">${sl('xdA',0,7,7,'Top index')}${sl('xdB',0,7,4,'Bottom index')}</div>`,'An x on top and an x on the bottom cancel out.'),
 powpow:()=>W_('powpow',`<div id="ppBox" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;min-height:60px"></div><div class="readout" id="ppOut"></div><div class="row" style="justify-content:center">${sl('ppA',1,5,3,'Inside index')}${sl('ppB',1,5,4,'Outside index')}</div>`,'(z³)⁴ is four copies of z³.'),
 coef:()=>W_('coef',pickRow('cf',['6x² × 3x⁴','6x⁵ ÷ 3x²','(3x²)³','6w⁴ + 2w⁴'])+`<div id="cfBox" style="display:grid;gap:8px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="cfNext">Next step</button></div>`,'Numbers with numbers, letters with letters.'),
 grid1:()=>W_('grid1',`<svg viewBox="0 0 320 170" id="g1Svg" role="img" aria-label="Area model for one bracket"></svg><div class="readout" id="g1Out"></div><div class="row" style="justify-content:center">${sl('g1K',1,6,3,'Number outside')}${sl('g1C',-6,6,5,'Number inside')}</div>`,'The outside number multiplies both parts.'),
 grid2:()=>W_('grid2',`<svg viewBox="0 0 330 290" id="g2Svg" role="img" aria-label="Area model for two brackets"></svg><div class="readout" id="g2Out"></div><div class="row" style="justify-content:center">${sl('g2A',-9,9,2,'First number')}${sl('g2B',-9,9,3,'Second number')}</div>`,'Four pieces, four multiplications. Pink pieces are negative.'),
 grid2sq:()=>W_('grid2',`<svg viewBox="0 0 330 290" id="g2Svg" role="img" aria-label="Area model for a perfect square"></svg><div class="readout" id="g2Out"></div><div class="row" style="justify-content:center">${sl('g2A',-9,9,2,'Number in the bracket')}</div>`,'The two middle pieces are the same, so they double up.').replace('data-w="grid2"','data-w="grid2" data-mode="sq"'),
 grid2dots:()=>W_('grid2',`<svg viewBox="0 0 330 290" id="g2Svg" role="img" aria-label="Area model for the difference of two squares"></svg><div class="readout" id="g2Out"></div><div class="row" style="justify-content:center">${sl('g2A',1,10,3,'Number')}</div>`,'One middle piece is positive and one is negative, so they cancel.').replace('data-w="grid2"','data-w="grid2" data-mode="dots"'),
 foil:()=>W_('foil',pickRow('fl',['(y + 8)(y − 4)','(x + 5)(x − 3)','(x − 7)(x − 2)'])+`<svg viewBox="0 0 330 120" id="flSvg" role="img" aria-label="Arrows joining each pair of terms"></svg><div id="flBox" style="display:grid;gap:6px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="flNext">Next arrow</button></div>`),
 fracbar:()=>W_('fracbar',pickRow('fb',['½ + ¼','¾ + ⅔','⅓ + ⅙'])+`<div id="fbBox" style="display:grid;gap:10px"></div><div class="readout" id="fbOut"></div>`,'Cut both bars into the same number of pieces, then count.'),
 xfrac:()=>W_('xfrac',`<div id="xfBox" style="display:grid;gap:10px"></div><div class="readout" id="xfOut"></div><div class="row" style="justify-content:center">${sl('xfD',2,9,7,'Bottom number')}${sl('xfP',1,8,1,'First top')}${sl('xfQ',1,8,3,'Second top')}</div>`,'Each bar is a whole x cut into equal pieces.'),
 afrac:()=>W_('afrac',pickRow('af',['a/2 + a/5','b/4 + b/3','y/2 + y/4','5d/6 − 3d/5'])+`<div id="afBox" style="display:grid;gap:8px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="afNext">Next step</button></div>`),
 cancel:()=>W_('cancel',pickRow('cn',['(6x + 2) ÷ 2','(5x + 10) ÷ 5'])+`<div id="cnBox" style="display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))"></div>${sl('cnX',-5,10,3,'Test with x =')}`,'If a shortcut gives a different number, the shortcut is wrong.'),
 formula:()=>W_('formula',`<div class="bigm">F = ma</div><div class="readout" id="fmOut"></div><div class="row" style="justify-content:center">${sl('fmM',1,30,12,'m')}${sl('fmA',-5,10,5,'a',0.5)}</div>`,'F is the subject: it is on its own on the left.'),
 pay:()=>W_('pay',`<div class="bigm">P = W + HR</div><div class="readout" id="pyOut"></div><div class="row" style="justify-content:center">${sl('pyW',40,100,60,'Fixed wage W ($)',5)}${sl('pyH',0,12,8.25,'Hours H',0.25)}${sl('pyR',3,10,4.8,'Rate R ($/hour)',0.1)}</div>`,'Start values are from Worked example 2.6.'),
 rearr:()=>W_('rearr',pickRow('ra',['v = u + at → t','v = u + at → u','F = ma → m','T = 3x − 4 → x','A = a² + bc → a'])+`<div id="raBox" style="display:grid;gap:8px"></div><div class="row" style="justify-content:center"><button class="btn primary" id="raNext">Next step</button></div>`,'Whatever you do to one side, do to the other.'),
 ages:()=>W_('ages',`<svg viewBox="0 0 320 170" id="agSvg" role="img" aria-label="Bars for Amy, Ben and Alice's ages"></svg><div class="readout" id="agOut"></div>${sl('agX',7,40,19,'Amy\'s age, x')}`,'Ben is x + 2 and Alice is x − 6.'),
 circle:()=>W_('circle',`<svg viewBox="0 0 320 180" id="ciSvg" role="img" aria-label="Circle with its radius"></svg><div class="readout" id="ciOut"></div>${sl('ciR',1,10,5,'Radius r (cm)',0.5)}`,'Forwards: A = πr². Backwards: r = √(A ÷ π).')
});

Object.assign(INIT,{
 letterbox(el){const s=$('#lbN',el);const f=()=>{const x=+s.value;$('#lbX',el).innerHTML=`x = ${ns(x)}`;
   const C_=[['3x',`3 × ${nb(x)}`,3*x],['x + 5',`${ns(x)} + 5`,x+5],['x²',`${nb(x)} × ${nb(x)}`,x*x],['2x + 1',`2 × ${nb(x)} + 1`,2*x+1]];
   $('#lbCards',el).innerHTML=C_.map(c=>`<div class="plain" style="text-align:center"><span class="kicker nocase" style="font-size:16px">${c[0]}</span><span class="m">${c[1]}</span><b class="m" style="font-size:22px">= ${ns(c[2])}</b></div>`).join('');};s.oninput=f;f();},
 order(el){const D=[[['2 + 3 × 4',''],['2 + 12','Multiply first: 3 × 4 = 12'],['14','Then add']],[['(2 + 3) × 4',''],['5 × 4','Brackets first: 2 + 3 = 5'],['20','Then multiply']],[['20 − 2 × 3²',''],['20 − 2 × 9','Power first: 3² = 9'],['20 − 18','Then multiply: 2 × 9 = 18'],['2','Subtract last']],[['18 ÷ (4 − 1) + 2',''],['18 ÷ 3 + 2','Brackets first: 4 − 1 = 3'],['6 + 2','Then divide: 18 ÷ 3 = 6'],['8','Add last']]];
   const P_=stepPlayer(el,'#ordBox',D[0],'#ordNext');el.addEventListener('click',e=>{const b=e.target.closest('[data-ord]');if(!b)return;$$('[data-ord]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));P_.set(D[+b.dataset.ord]);});},
 negline(el){const D=[[20,18,'20 − (−18) = 20 + 18 = 38','Taking away a negative is the same as adding.'],[5,-8,'5 − 8 = −3','Start at 5 and move 8 to the left.'],[-4,2,'−4 − (−6) = −4 + 6 = 2','Taking away −6 means adding 6.'],[-3,7,'−3 + 7 = 4','Start at −3 and move 7 to the right.']];
   const f=i=>{const [s0,mv,txt,why]=D[i];const end=s0+mv;const lo=Math.min(s0,end,0)-3,hi=Math.max(s0,end,0)+3,X=v=>20+(v-lo)/(hi-lo)*300;
    let h=`<line x1="20" y1="70" x2="320" y2="70" stroke="${COL.mist}" stroke-width="3"/>`;const step=Math.max(1,Math.ceil((hi-lo)/12));
    for(let v=Math.ceil(lo/step)*step;v<=hi;v+=step)h+=`<line x1="${X(v)}" y1="64" x2="${X(v)}" y2="76" stroke="${COL.taupe}" stroke-width="1.5"/><text x="${X(v)}" y="96" text-anchor="middle" font-size="11" fill="${COL.cocoa}" font-family="JetBrains Mono">${ns(v)}</text>`;
    h+=`<path class="fadein" d="M${X(s0)} 62 Q ${(X(s0)+X(end))/2} ${mv>0?18:18} ${X(end)} 62" fill="none" stroke="${mv>0?COL.sage:COL.rose}" stroke-width="3" marker-end="url(#nlA)"/><defs><marker id="nlA" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="${mv>0?COL.sage:COL.rose}"/></marker></defs><circle cx="${X(s0)}" cy="70" r="6" fill="${COL.cocoa}"/><circle cx="${X(end)}" cy="70" r="7" fill="${COL.espresso||'#3A2522'}"/>`;
    $('#nlSvg',el).innerHTML=h;$('#nlOut',el).innerHTML=`${txt}<small>${why}</small>`;$$('[data-nl]',el).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.nl===i));};
   el.addEventListener('click',e=>{const b=e.target.closest('[data-nl]');if(b)f(+b.dataset.nl);});f(0);},
 subst(el){const A=$('#sbA',el),B=$('#sbB',el);let P_=null;const L=()=>{const a=+A.value,b=+B.value,p=5*a,q=6*b;return [[`5a − 6b`,`a = ${ns(a)}, b = ${ns(b)}`],[`5 × ${nb(a)} − 6 × ${nb(b)}`,'Swap each letter for its number. Negatives go in brackets.'],[`${ns(p)} − ${nb(q)}`,`Multiply first: 5 × ${nb(a)} = ${ns(p)} and 6 × ${nb(b)} = ${ns(q)}`],...(q<0?[[`${ns(p)} + ${-q}`,`Subtracting ${ns(q)} is the same as adding ${-q}`]]:[]),[`${ns(p-q)}`,'Done']];};
   P_=stepPlayer(el,'#sbBox',L(),'#sbNext');A.oninput=B.oninput=()=>P_.set(L());},
 subst2(el){const X=$('#s2X',el),Y=$('#s2Y',el);let P_=null;const L=()=>{const x=+X.value,y=+Y.value,x2=x*x,y3=y**3;return [['3x² − 2y³',`x = ${ns(x)}, y = ${ns(y)}`],[`3 × ${nb(x)}² − 2 × ${nb(y)}³`,'Swap the letters. Keep negatives in brackets.'],[`3 × ${x2} − 2 × ${nb(y3)}`,`Powers first: ${nb(x)}² = ${x2} and ${nb(y)}³ = ${ns(y3)}`],[`${3*x2} − ${nb(2*y3)}`,'Then multiply'],[`${ns(3*x2-2*y3)}`,'Subtract last']];};
   P_=stepPlayer(el,'#s2Box',L(),'#s2Next');X.oninput=Y.oninput=()=>P_.set(L());},
 subst3(el){stepPlayer(el,'#s3Box',[[`p(5 − ${F('4q','p')})`,'p = 2 and q = −3'],[`2(5 − ${F('4 × (−3)',2)})`,'Swap the letters for numbers'],[`2(5 − ${F('−12',2)})`,'Inside the bracket, start with the fraction: 4 × (−3) = −12'],['2(5 − (−6))','−12 ÷ 2 = −6'],['2(5 + 6) = 2 × 11','Subtracting −6 is the same as adding 6'],['22','Finally multiply by 2']],'#s3Next');},
 negsq(el){const N=$('#nqN',el),Pw=$('#nqP',el);const f=()=>{const n=+N.value,p=+Pw.value;const pos=(-n)**p;
   $('#nqA',el).innerHTML=`<span class="kicker">With brackets</span><span class="m" style="font-size:20px">(${MI}${n})<sup>${p}</sup></span><span class="m">${Array(p).fill(`(${MI}${n})`).join(' × ')}</span><b class="m" style="font-size:22px">= ${ns(pos)}</b><span class="tiny">The minus sign is included in the power.</span>`;
   $('#nqB',el).innerHTML=`<span class="kicker">Without brackets</span><span class="m" style="font-size:20px">${MI}${n}<sup>${p}</sup></span><span class="m">${MI}(${Array(p).fill(n).join(' × ')})</span><b class="m" style="font-size:22px">= ${ns(-(n**p))}</b><span class="tiny">Only the ${n} is powered. The minus is added at the end.</span>`;};N.oninput=Pw.oninput=f;f();},
 counter(el){const S_=[['2x²','(2x)²',x=>2*x*x,x=>(2*x)**2,x=>`2 × ${nb(x)}² = 2 × ${x*x}`,x=>`(2 × ${nb(x)})² = ${nb(2*x)}²`],['3x²','(3x)²',x=>3*x*x,x=>(3*x)**2,x=>`3 × ${nb(x)}² = 3 × ${x*x}`,x=>`(3 × ${nb(x)})² = ${nb(3*x)}²`],['(−x)⁴','−x⁴',x=>x**4,x=>-(x**4),x=>`(${MI}${nb(x)})⁴`,x=>`${MI}(${nb(x)}⁴)`]];let k=0;const s=$('#ctX',el);
   const f=()=>{let x=+s.value;if(x===0){$('#ctOut',el).innerHTML='<small>The book says x ≠ 0. Pick another value.</small>';$('#ctSvg',el).innerHTML='';return;}const d=S_[k],L=d[2](x),R=d[3](x),m=Math.max(Math.abs(L),Math.abs(R),1);
    const bar=(y,v,lab,c)=>`<text x="10" y="${y+17}" font-size="14" font-family="JetBrains Mono" fill="${COL.cocoa}">${lab}</text><rect x="${v<0?160-Math.abs(v)/m*140:160}" y="${y}" width="${Math.abs(v)/m*140}" height="26" rx="8" fill="${c}"/><text x="${v<0?150-Math.abs(v)/m*140:168+Math.abs(v)/m*140}" y="${y+18}" text-anchor="${v<0?'end':'start'}" font-size="13" font-weight="700" font-family="JetBrains Mono" fill="${COL.cocoa}">${ns(v)}</text>`;
    $('#ctSvg',el).innerHTML=`<line x1="160" y1="20" x2="160" y2="140" stroke="${COL.mist}" stroke-width="2"/>`+bar(35,L,d[0],COL.rose)+bar(90,R,d[1],COL.sage);
    $('#ctOut',el).innerHTML=`${ns(L)} ${L===R?'=':'≠'} ${ns(R)}<small>${d[4](x)} = ${ns(L)} &nbsp;and&nbsp; ${d[5](x)} = ${ns(R)}. ${L===R?'These match, so this x is not a counter-example.':'They are different, so this x is a counter-example: the statement is not true.'}</small>`;
    $$('[data-ct]',el).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ct===k));};
   s.oninput=f;el.addEventListener('click',e=>{const b=e.target.closest('[data-ct]');if(b){k=+b.dataset.ct;f();}});f();},
 machine(el){const set=el.dataset.set||'1';const v=set==='3'?'x':'n';
   const OPS={'1':[['add',5],['sub',5],['mul',5],['div',5],['sq'],['rt'],['from',5]],'2':[['add',3],['sub',6],['mul',4],['div',3],['sq'],['rt'],['div',2]],'3':[['mul',3],['mul',2],['sq'],['cube'],['add',7],['sub',100],['rt']]}[set];
   let ex=v,lev='atom',hist=[],trail=[];
   const wrap=()=>lev==='atom'||lev==='func'||lev==='pow'?ex:`(${ex})`;
   const apply=o=>{const [k,c]=o;
    if(k==='add'){ex=`${ex} + ${c}`;lev='sum';}
    else if(k==='sub'){ex=`${ex} ${MI} ${c}`;lev='sum';}
    else if(k==='mul'){if(lev==='atom'&&ex===v)ex=`${c}${v}`;else if(lev==='prod'&&/^\d/.test(ex)){const m=ex.match(/^(\d+)(.*)$/);ex=`${+m[1]*c}${m[2]}`;}else ex=`${c}${wrap()}`;lev=lev==='sum'||lev==='frac'?'prod':'prod';}
    else if(k==='div'){ex=F(ex,c);lev='frac';}
    else if(k==='sq'){ex=`${wrap()}<sup>2</sup>`;lev='pow';}
    else if(k==='cube'){ex=`${wrap()}<sup>3</sup>`;lev='pow';}
    else if(k==='rt'){ex=SQ(ex);lev='func';}
    else if(k==='from'){ex=`${c} ${MI} ${lev==='sum'?`(${ex})`:ex}`;lev='sum';}};
   const num=(x,o)=>{const [k,c]=o;return k==='add'?x+c:k==='sub'?x-c:k==='mul'?x*c:k==='div'?x/c:k==='sq'?x*x:k==='cube'?x**3:k==='rt'?Math.sqrt(x):c-x;};
   const show=()=>{$('#mcExpr',el).innerHTML=`<span class="fadein" style="display:inline-block">${ex}</span>`;const n0=+$('#mcN',el).value;let x=n0;const tr=[ns(n0)];hist.forEach(o=>{x=num(x,o);tr.push(isFinite(x)?ns(r2(x)):'not a real number');});
    $('#mcOut',el).innerHTML=hist.length?`${tr.join(' → ')}<small>Putting ${v} = ${ns(n0)} into the expression gives the same answer.</small>`:'<small>Tap an instruction.</small>';};
   el.addEventListener('click',e=>{const b=e.target.closest('[data-mop]');if(b){if(hist.length>=4){toast('That\'s four steps. Tap "Start again" to build a new one.');return;}const o=OPS[+b.dataset.mop];hist.push(o);apply(o);show();}
    if(e.target.closest('#mcReset')){ex=v;lev='atom';hist=[];show();}});
   $('#mcN',el).addEventListener('input',show);show();},
 rect(el){const D=[[x=>x+5,x=>2*x,'x + 5','2x','6x + 10','2x² + 10x',x=>6*x+10,x=>2*x*x+10*x],[x=>x+2,x=>3,'x + 2','3','2x + 10','3x + 6',x=>2*x+10,x=>3*x+6],[x=>x,x=>x+4,'x','x + 4','4x + 8','x² + 4x',x=>4*x+8,x=>x*x+4*x],[x=>x*x,x=>4*x,'x²','4x','2x² + 8x','4x³',x=>2*x*x+8*x,x=>4*x**3]];let k=0;const s=$('#rcX',el);
   const f=()=>{const x=+s.value,d=D[k],L=d[0](x),Wd=d[1](x);const m=Math.max(L,Wd),w=Math.max(30,220*L/m),h=Math.max(24,120*Wd/m),x0=160-w/2,y0=90-h/2;
    $('#rcSvg',el).innerHTML=`<rect class="fadein" x="${x0}" y="${y0}" width="${w}" height="${h}" rx="10" fill="${COL.blush}" stroke="${COL.rose}" stroke-width="2"/><text x="160" y="${y0-10}" text-anchor="middle" font-size="15" font-family="JetBrains Mono" fill="${COL.cocoa}">${d[2]} = ${L}</text><text x="${x0+w+8}" y="94" font-size="15" font-family="JetBrains Mono" fill="${COL.cocoa}">${d[3]} = ${Wd}</text>`;
    $('#rcOut',el).innerHTML=`Perimeter = ${d[4]} &nbsp;·&nbsp; Area = ${d[5]}<small>With x = ${x}: from the picture, P = 2 × ${L} + 2 × ${Wd} = ${2*L+2*Wd} and A = ${L} × ${Wd} = ${L*Wd}. From the expressions, P = ${d[6](x)} and A = ${d[7](x)}. ${2*L+2*Wd===d[6](x)&&L*Wd===d[7](x)?'They match ✓':''}</small>`;
    $$('[data-rc]',el).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.rc===k));};s.oninput=f;el.addEventListener('click',e=>{const b=e.target.closest('[data-rc]');if(b){k=+b.dataset.rc;f();}});f();},
 xmul(el){chipCancel(el,'#xmBox','#xmOut','#xmA','#xmB','x',false);},
 xdiv(el){chipCancel(el,'#xdBox','#xdOut','#xdA','#xdB','x',true);},
 powpow(el){const A=$('#ppA',el),B=$('#ppB',el);const f=()=>{const a=+A.value,b=+B.value;$('#ppBox',el).innerHTML=Array.from({length:b},(_,g)=>`<span class="fadein" style="display:inline-flex;gap:4px;padding:6px 8px;border-radius:16px;box-shadow:var(--press);animation-delay:${g*.08}s">${Array.from({length:a},()=>chip('z',g%2?COL.blush:COL.rose,'min-width:32px;height:32px')).join('')}</span>`).join('');
   $('#ppOut',el).innerHTML=`(z<sup>${a}</sup>)<sup>${b}</sup> = ${Array(b).fill(`z<sup>${a}</sup>`).join(' × ')} = z<sup>${a*b}</sup><small>${b} groups of ${a} z's is ${a} × ${b} = ${a*b} z's.</small>`;};A.oninput=B.oninput=f;f();},
 coef(el){const D=[[['6x² × 3x⁴',''],['6 × 3 × x² × x⁴','Put the numbers together and the letters together'],['18 × x<sup>2+4</sup>','6 × 3 = 18, and add the indices'],['18x⁶','Kai\'s answer']],[['6x⁵ ÷ 3x²',''],[F('6x<sup>5</sup>','3x<sup>2</sup>'),'Write it as a fraction'],['2 × x<sup>5−2</sup>','6 ÷ 3 = 2, and subtract the indices'],['2x³','Sasha\'s answer']],[['(3x²)³',''],['3³ × (x²)³','Everything inside is cubed, the 3 as well'],['27 × x⁶','3³ = 27, and 2 × 3 = 6'],['27x⁶','Arun was right, not Marcus']],[['6w⁴ + 2w⁴',''],['(6 + 2)w⁴','These are like terms: the same letter and index'],['8w⁴','Adding keeps the index the same']]];
   const P_=stepPlayer(el,'#cfBox',D[0],'#cfNext');el.addEventListener('click',e=>{const b=e.target.closest('[data-cf]');if(!b)return;$$('[data-cf]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));P_.set(D[+b.dataset.cf]);});},
 grid1(el){const K=$('#g1K',el),Cc=$('#g1C',el);const f=()=>{const k=+K.value,c=+Cc.value;const wx=150,wc=Math.max(20,Math.abs(c)*14),h=80,x0=160-(wx+wc)/2;
   $('#g1Svg',el).innerHTML=`<text x="${x0-8}" y="${55+h/2}" text-anchor="end" font-size="15" font-family="JetBrains Mono" fill="${COL.cocoa}">${k}</text><text x="${x0+wx/2}" y="40" text-anchor="middle" font-size="15" font-family="JetBrains Mono" fill="${COL.cocoa}">x</text><text x="${x0+wx+wc/2}" y="40" text-anchor="middle" font-size="15" font-family="JetBrains Mono" fill="${COL.cocoa}">${ns(c)}</text><rect x="${x0}" y="50" width="${wx}" height="${h}" rx="8" fill="${COL.blush}" stroke="${COL.snow}" stroke-width="3"/><rect x="${x0+wx}" y="50" width="${wc}" height="${h}" rx="8" fill="${c<0?COL.rose:COL.sage}" stroke="${COL.snow}" stroke-width="3"/><text x="${x0+wx/2}" y="${55+h/2}" text-anchor="middle" font-size="17" font-weight="700" font-family="JetBrains Mono" fill="${COL.cocoa}">${k===1?'':k}x</text><text x="${x0+wx+wc/2}" y="${55+h/2}" text-anchor="middle" font-size="15" font-weight="700" font-family="JetBrains Mono" fill="#fff">${ns(k*c)}</text>`;
   $('#g1Out',el).innerHTML=`${k}(x ${c<0?MI:'+'} ${Math.abs(c)}) = ${poly([[k,'x'],[k*c,'']])}<small>${k} × x = ${k===1?'':k}x and ${k} × ${nb(c)} = ${ns(k*c)}</small>`;};K.oninput=Cc.oninput=f;f();},
 grid2(el){const mode=el.dataset.mode||'';const A=$('#g2A',el),B=$('#g2B',el);
   const f=()=>{let a=+A.value,b=mode==='sq'?a:mode==='dots'?-a:+B.value;
    const X=140,ua=Math.max(38,Math.abs(a)*11),ub=Math.max(38,Math.abs(b)*11),x0=60,y0=40;
    const cell=(x,y,w,h,lab,neg,base)=>`<rect class="fadein" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${base?COL.blush:neg?COL.rose:COL.sage}" stroke="${COL.snow}" stroke-width="3"/><text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" font-size="${Math.max(11,Math.min(16,w/3.4))}" font-weight="700" font-family="JetBrains Mono" fill="${base?COL.cocoa:'#fff'}">${lab}</text>`;
    const T=(x,y,t)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="15" font-family="JetBrains Mono" fill="${COL.cocoa}">${t}</text>`;
    let h=T(x0+X/2,y0-12,'x')+T(x0+X+ub/2,y0-12,ns(b))+T(x0-22,y0+X/2+5,'x')+T(x0-22,y0+X+ua/2+5,ns(a));
    h+=cell(x0,y0,X,X,'x²',false,true)+cell(x0+X,y0,ub,X,poly([[b,'x']]),b<0)+cell(x0,y0+X,X,ua,poly([[a,'x']]),a<0)+cell(x0+X,y0+X,ub,ua,ns(a*b),a*b<0);
    $('#g2Svg',el).innerHTML=h;
    const br=(c)=>`(x ${c<0?MI:'+'} ${Math.abs(c)})`;
    $('#g2Out',el).innerHTML=`${mode==='sq'?br(a)+'<sup>2</sup>':br(a)+br(b)} = ${poly([[1,'x²'],[a+b,'x'],[a*b,'']])}<small>x² ${term(b,'x')} ${term(a,'x')} ${term(a*b,'')} &nbsp;→&nbsp; collect ${poly([[b,'x']])} and ${poly([[a,'x']])} to get ${a+b===0?'0, so the x terms disappear':poly([[a+b,'x']])}</small>`;};
   A.oninput=f;if(B)B.oninput=f;f();},
 foil(el){const D=[['y',8,-4],['x',5,-3],['x',-7,-2]];let k=0,step=0;
   const f=()=>{const [v,a,b]=D[k];const parts=[[v,v,`${v}²`],[v,ns(b),poly([[b,v]])],[ns(a),v,poly([[a,v]])],[ns(a),ns(b),ns(a*b)]];
    const pos={v1:62,a1:112,v2:180,b2:232};const P_=[[pos.v1,pos.v2],[pos.v1,pos.b2],[pos.a1,pos.v2],[pos.a1,pos.b2]];
    let h=`<text x="40" y="90" font-size="24" font-family="JetBrains Mono" fill="${COL.cocoa}">(</text><text x="${pos.v1}" y="90" text-anchor="middle" font-size="24" font-family="JetBrains Mono" fill="${COL.cocoa}">${v}</text><text x="${(pos.v1+pos.a1)/2}" y="90" text-anchor="middle" font-size="22" font-family="JetBrains Mono" fill="${COL.cocoa}">${a<0?MI:'+'}</text><text x="${pos.a1}" y="90" text-anchor="middle" font-size="24" font-family="JetBrains Mono" fill="${COL.cocoa}">${Math.abs(a)}</text><text x="132" y="90" font-size="24" font-family="JetBrains Mono" fill="${COL.cocoa}">)(</text><text x="${pos.v2}" y="90" text-anchor="middle" font-size="24" font-family="JetBrains Mono" fill="${COL.cocoa}">${v}</text><text x="${(pos.v2+pos.b2)/2}" y="90" text-anchor="middle" font-size="22" font-family="JetBrains Mono" fill="${COL.cocoa}">${b<0?MI:'+'}</text><text x="${pos.b2}" y="90" text-anchor="middle" font-size="24" font-family="JetBrains Mono" fill="${COL.cocoa}">${Math.abs(b)}</text><text x="250" y="90" font-size="24" font-family="JetBrains Mono" fill="${COL.cocoa}">)</text>`;
    const cols=[COL.rose,COL.sage,COL.taupe,'#3A2522'];
    for(let i=0;i<step;i++){const [p,q]=P_[i];const hgt=i%2?18:38;h+=`<path class="fadein" d="M${p} 66 C ${p} ${66-hgt}, ${q} ${66-hgt}, ${q} 66" fill="none" stroke="${cols[i]}" stroke-width="2.6"/>`;}
    $('#flSvg',el).innerHTML=h;
    $('#flBox',el).innerHTML=parts.slice(0,step).map((p,i)=>`<div class="fadein m" style="color:${cols[i]};font-weight:700">${i+1}. ${p[0]} × ${p[1]} = ${p[2]}</div>`).join('')+(step===4?`<div class="fadein readout">= ${poly([[1,v+'²'],[b,v],[a,v],[a*b,'']])}<br>= ${poly([[1,v+'²'],[a+b,v],[a*b,'']])}<small>Collect the two ${v} terms.</small></div>`:'');
    $('#flNext',el).textContent=step<4?'Next arrow':'Start again';$$('[data-fl]',el).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.fl===k));};
   $('#flNext',el).onclick=()=>{step=step<4?step+1:0;f();};el.addEventListener('click',e=>{const b=e.target.closest('[data-fl]');if(b){k=+b.dataset.fl;step=0;f();}});f();},
 fracbar(el){const D=[[1,2,1,4],[3,4,2,3],[1,3,1,6]];const g=(a,b)=>b?g(b,a%b):a;
   const f=i=>{const [a,b,c,d]=D[i];const L=b*d/g(b,d),A=a*L/b,Cn=c*L/d,sum=A+Cn,gg=g(sum,L);
    const bar=(fill,col,lab)=>`<div style="display:grid;gap:3px"><span class="tiny">${lab}</span><div style="display:grid;grid-template-columns:repeat(${L},1fr);gap:3px">${Array.from({length:L},(_,j)=>`<span class="fadein" style="height:30px;border-radius:7px;background:${j<fill?col:'transparent'};box-shadow:${j<fill?'none':'var(--press)'};animation-delay:${j*.03}s"></span>`).join('')}</div></div>`;
    $('#fbBox',el).innerHTML=bar(A,COL.rose,`${F(a,b)} = ${F(A,L)}`)+bar(Cn,COL.sage,`${F(c,d)} = ${F(Cn,L)}`)+bar(sum,'#3A2522',`together: ${F(sum,L)}`);
    $('#fbOut',el).innerHTML=`${F(a,b)} + ${F(c,d)} = ${F(A,L)} + ${F(Cn,L)} = ${F(sum,L)}${gg>1?` = ${F(sum/gg,L/gg)}`:''}${sum/gg>L/gg?` = ${MX(Math.floor(sum/L),sum%L,L)}`:''}<small>Both bars are cut into ${L} equal pieces.</small>`;$$('[data-fb]',el).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.fb===i));};
   el.addEventListener('click',e=>{const b=e.target.closest('[data-fb]');if(b)f(+b.dataset.fb);});f(0);},
 xfrac(el){const Dd=$('#xfD',el),Pp=$('#xfP',el),Qq=$('#xfQ',el);const g=(a,b)=>b?g(b,a%b):a;
   const f=()=>{const d=+Dd.value;Pp.max=d;Qq.max=d;const p=Math.min(+Pp.value,d),q=Math.min(+Qq.value,d),s=p+q,gg=g(s,d);
    const bar=(n,col,lab)=>`<div style="display:grid;gap:3px"><span class="tiny">${lab}</span><div style="display:grid;grid-template-columns:repeat(${d},1fr);gap:3px">${Array.from({length:d},(_,j)=>`<span style="height:28px;border-radius:7px;display:grid;place-items:center;font-size:11px;font-family:var(--mono);color:#fff;background:${j<n?col:'transparent'};box-shadow:${j<n?'none':'var(--press)'}">${j<n?F('x',d):''}</span>`).join('')}</div></div>`;
    $('#xfBox',el).innerHTML=bar(p,COL.rose,F((p===1?'':p)+'x',d))+bar(q,COL.sage,F((q===1?'':q)+'x',d));
    const top=s===1?'x':s+'x';const simp=gg>1?(s/gg===d/gg?` = ${s/gg===1?'x':s/gg+'x'}`:` = ${F((s/gg===1?'':s/gg)+'x',d/gg)}`):'';
    $('#xfOut',el).innerHTML=`${F((p===1?'':p)+'x',d)} + ${F((q===1?'':q)+'x',d)} = ${F(top,d)}${d/gg===1?` = ${s/gg===1?'x':s/gg+'x'}`:simp}<small>The bottoms match, so add the tops: ${p} + ${q} = ${s} pieces.</small>`;};Dd.oninput=Pp.oninput=Qq.oninput=f;f();},
 afrac(el){const D=[[[`${F('a',2)} + ${F('a',5)}`,''],[`${F('5a',10)} + ${F('2a',10)}`,'10 works for both: × 5 on the first, × 2 on the second'],[F('5a + 2a',10),'The bottoms match, so add the tops'],[F('7a',10),'Done']],[[`${F('b',4)} + ${F('b',3)}`,''],[`${F('3b',12)} + ${F('4b',12)}`,'12 works for both'],[F('3b + 4b',12),'Add the tops'],[F('7b',12),'Done']],[[`${F('y',2)} + ${F('y',4)}`,''],[`${F('2y',4)} + ${F('y',4)}`,'4 works: change only the first fraction'],[F('3y',4),'Add the tops']],[[`${F('5d',6)} − ${F('3d',5)}`,''],[`${F('25d',30)} − ${F('18d',30)}`,'30 works for both'],[F('25d − 18d',30),'Subtract the tops'],[F('7d',30),'Done']]];
   const P_=stepPlayer(el,'#afBox',D[0],'#afNext');el.addEventListener('click',e=>{const b=e.target.closest('[data-af]');if(!b)return;$$('[data-af]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));P_.set(D[+b.dataset.af]);});},
 cancel(el){const D=[[`${F('6x + 2',2)}`,x=>(6*x+2)/2,'3x + 1',x=>3*x+1,'6x + 1',x=>6*x+1,'Arun cancelled only the 2s'],[`${F('5x + 10',5)}`,x=>(5*x+10)/5,'x + 2',x=>x+2,'x + 10',x=>x+10,'Cancelling only the 5s']];let k=0;const s=$('#cnX',el);
   const f=()=>{const x=+s.value,d=D[k],v0=d[1](x),v1=d[3](x),v2=d[5](x);const card=(t,eq,v,ok,note)=>`<div class="plain" style="text-align:center;${ok===false?`background:var(--bad-soft)`:ok?`background:var(--good-soft)`:''}"><span class="kicker">${t}</span><span class="m" style="font-size:19px">${eq}</span><b class="m" style="font-size:22px">= ${ns(r2(v))}</b>${note?`<span class="tiny">${note}</span>`:''}</div>`;
    $('#cnBox',el).innerHTML=card('The question',d[0],v0)+card('Factorise, then cancel',d[2],v1,v1===v0,v1===v0?'Matches ✓':'')+card('The shortcut',d[4],v2,v2===v0,v2===v0?'Matches for this x only':d[6]+' ✗');
    $$('[data-cn]',el).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cn===k));};s.oninput=f;el.addEventListener('click',e=>{const b=e.target.closest('[data-cn]');if(b){k=+b.dataset.cn;f();}});f();},
 formula(el){const M=$('#fmM',el),A=$('#fmA',el);const f=()=>{const m=+M.value,a=+A.value;$('#fmOut',el).innerHTML=`F = ${m} × ${nb(a)} = ${ns(r2(m*a))}<small>m = ${m}, a = ${ns(a)}. Change m or a and F changes, because F depends on them.</small>`;};M.oninput=A.oninput=f;f();},
 pay(el){const W=$('#pyW',el),H=$('#pyH',el),R=$('#pyR',el);const f=()=>{const w=+W.value,h=+H.value,r=+R.value;$('#pyOut',el).innerHTML=`P = ${w} + ${h} × ${r.toFixed(2)} = ${w} + ${(h*r).toFixed(2)} = $${(w+h*r).toFixed(2)}<small>Multiply H × R first, then add the fixed wage.</small>`;};W.oninput=H.oninput=R.oninput=f;f();},
 rearr(el){const D=[[['v = u + at','Goal: get t on its own'],['u + at = v','Swap sides so the t side is on the left'],['at = v − u','Subtract u from both sides'],[`t = ${F('v − u','a')}`,'Divide both sides by a']],[['v = u + at','Goal: get u on its own'],['u + at = v','Swap sides'],['u = v − at','Subtract at from both sides']],[['F = ma','Goal: get m on its own'],[`${F('F','a')} = m`,'m is multiplied by a, so divide both sides by a'],[`m = ${F('F','a')}`,'Write the subject on the left']],[['T = 3x − 4','Goal: get x on its own'],['T + 4 = 3x','Add 4 to both sides'],[`${F('T + 4',3)} = x`,'Divide both sides by 3'],[`x = ${F('T + 4',3)}`,'Write the subject on the left']],[['A = a² + bc','Goal: get a on its own'],['A − bc = a²','Subtract bc from both sides'],[`${SQ('A − bc')} = a`,'Square root both sides to undo the square'],[`a = ${SQ('A − bc')}`,'Write the subject on the left']]];
   const P_=stepPlayer(el,'#raBox',D[0],'#raNext');el.addEventListener('click',e=>{const b=e.target.closest('[data-ra]');if(!b)return;$$('[data-ra]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));P_.set(D[+b.dataset.ra]);});},
 ages(el){const s=$('#agX',el);const f=()=>{const x=+s.value,P_=[['Amy','x',x,COL.rose],['Ben','x + 2',x+2,COL.sage],['Alice','x − 6',x-6,COL.taupe]];
   $('#agSvg',el).innerHTML=P_.map((p,i)=>`<text x="10" y="${40+i*45}" font-size="14" font-family="Atkinson Hyperlegible" fill="${COL.cocoa}">${p[0]}</text><rect x="70" y="${22+i*45}" width="${p[2]*5.2}" height="26" rx="8" fill="${p[3]}" style="transition:width .3s"/><text x="${78+p[2]*5.2}" y="${40+i*45}" font-size="13" font-weight="700" font-family="JetBrains Mono" fill="${COL.cocoa}">${p[1]} = ${p[2]}</text>`).join('');
   $('#agOut',el).innerHTML=`T = ${x} + ${x+2} + ${x-6} = ${3*x-4}<small>Using the formula: T = 3x − 4 = 3 × ${x} − 4 = ${3*x-4} ✓</small>`;};s.oninput=f;f();},
 circle(el){const s=$('#ciR',el);const f=()=>{const r=+s.value,A=Math.PI*r*r,R=r*7;$('#ciSvg',el).innerHTML=`<circle class="fadein" cx="160" cy="90" r="${R}" fill="${COL.blush}" stroke="${COL.rose}" stroke-width="2.5"/><line x1="160" y1="90" x2="${160+R}" y2="90" stroke="#3A2522" stroke-width="2.5"/><circle cx="160" cy="90" r="3.5" fill="#3A2522"/><text x="${160+R/2}" y="82" text-anchor="middle" font-size="14" font-family="JetBrains Mono" fill="#3A2522">r</text>`;
   $('#ciOut',el).innerHTML=`A = π × ${r}² ≈ ${A.toFixed(1)} cm²<small>Backwards: r = √(${A.toFixed(1)} ÷ π) ≈ ${Math.sqrt(+A.toFixed(1)/Math.PI).toFixed(2)} cm</small>`;};s.oninput=f;f();}
});

/* =================== FOUNDATIONS + 1.1 EXTRA VISUALS =================== */
const cookie=(c=COL.rose,extra='')=>`<span class="fadein" style="display:inline-block;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff6 0 18%,transparent 19%),${c};box-shadow:2px 2px 5px rgba(97,72,68,.3);${extra}"></span>`;
Object.assign(VIS,{
 share:()=>W_('share',`<div id="shPlates" style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;min-height:110px"></div><div id="shLeft" style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;min-height:30px"></div><div class="readout" id="shOut"></div><div class="row" style="justify-content:center">${sl('shN',1,30,12,'Cookies')}${sl('shK',1,6,3,'Plates')}</div><div class="row" style="justify-content:center"><button class="btn primary" id="shGo">Deal them out</button></div>`,'Cookies are dealt one at a time, round and round, until there are not enough to go round again.'),
 share2:()=>VIS.share().replace('value="12"','value="14"').replace('max="6" value="3"','max="6" value="4"'),
 groups:()=>W_('groups',`<div id="grBox" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;min-height:90px"></div><div class="readout" id="grOut"></div><div class="row" style="justify-content:center">${sl('grN',2,36,12,'Total')}${sl('grG',1,9,4,'Group size')}</div>`,'Each ring is one group.'),
 factfam:()=>W_('factfam',`<svg viewBox="0 0 320 200" id="ffSvg" role="img" aria-label="Fact family triangle"></svg><div id="ffFacts" style="display:grid;gap:6px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));text-align:center"></div><div class="row" style="justify-content:center">${sl('ffA',2,12,3,'First number')}${sl('ffB',2,12,4,'Second number')}</div>`,'The top number is the product. Cover any corner and the other two tell you what it is.'),
 skip:()=>W_('skip',`<svg viewBox="0 0 340 120" id="skSvg" role="img" aria-label="Skip counting on a number line"></svg><div class="readout" id="skOut"></div><div class="row" style="justify-content:center">${sl('skD',2,12,6,'Divide by')}${sl('skQ',1,12,7,'Answer to find')}</div><div class="row" style="justify-content:center"><button class="btn primary" id="skGo">Count the jumps</button></div>`,'Count up in equal jumps until you land on the number.'),
 rules:()=>W_('rules',`<div class="row" style="justify-content:center">${['÷ 1','÷ itself','0 ÷','÷ 0','÷ 10'].map((t,i)=>`<button class="btn" data-ru="${i}" aria-pressed="${i===0}">${t}</button>`).join('')}</div><div class="readout" id="ruOut" style="min-height:4em"></div>${sl('ruN',1,90,9,'Number')}`),
 bus:()=>W_('bus',pickRow('bs',['84 ÷ 3','96 ÷ 4','125 ÷ 5','456 ÷ 6'])+`<svg viewBox="0 0 320 130" id="bsSvg" role="img" aria-label="Short division bus stop"></svg><div class="readout" id="bsOut"></div><div class="row" style="justify-content:center"><button class="btn primary" id="bsNext">Next step</button></div>`,'Divide each digit from the left. Carry any remainder to the next digit.'),
 thermo:()=>W_('thermo',`<svg viewBox="0 0 340 130" id="thSvg" role="img" aria-label="Thermometer and number line"></svg><div class="readout" id="thOut"></div>${sl('thT',-10,10,-3,'Temperature (°C)')}`,'Below zero means negative.'),
 jumps:()=>W_('jumps',`<svg viewBox="0 0 340 120" id="jpSvg" role="img" aria-label="Jumps on a number line"></svg><div class="readout" id="jpOut"></div><div class="row" style="justify-content:center">${sl('jpN',1,5,3,'Number of jumps')}${sl('jpS',-5,-1,-2,'Size of each jump')}</div>`,'Each jump of a negative number goes to the left.'),
 pattern:()=>W_('pattern',`<div id="ptBox" style="display:grid;gap:4px;max-width:360px;margin:0 auto;width:100%"></div><div class="row" style="justify-content:center"><button class="btn primary" id="ptNext">Continue the pattern</button><button class="btn" id="ptReset">Start again</button></div>`,'The answer goes up by 2 every row. Keep going below zero and the answers turn positive.'),
 signs:()=>W_('signs',`<div class="row" style="justify-content:center;gap:14px"><button class="btn" id="sgA">+</button><input class="field" id="sgX" type="number" value="5" min="0" max="12" style="width:70px"><span class="m" style="font-size:22px">×</span><button class="btn" id="sgB">−</button><input class="field" id="sgY" type="number" value="4" min="0" max="12" style="width:70px"></div><div class="readout" id="sgOut" style="font-size:24px"></div>`,'Tap the sign buttons to switch between + and −.'),
 signsdiv:()=>VIS.signs().replace('data-w="signs"','data-w="signs" data-op="div"').replace('<span class="m" style="font-size:22px">×</span>','<span class="m" style="font-size:22px">÷</span>').replace('value="5"','value="12"').replace('value="4"','value="3"'),
 countneg:()=>W_('countneg',`<div id="cnRow" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;min-height:56px"></div><div class="readout" id="cnOut"></div><div class="row" style="justify-content:center"><button class="btn" id="cnAdd">Add a −1</button><button class="btn" id="cnAdd2">Add a 2</button><button class="btn" id="cnClr">Start again</button></div>`,'Tap a number to switch its sign.'),
 zoom:()=>W_('zoom',pickRow('zm',['√2','3/8','1/3'])+`<svg viewBox="0 0 340 120" id="zmSvg" role="img" aria-label="Zooming into a number line"></svg><div class="readout" id="zmOut"></div><div class="row" style="justify-content:center"><button class="btn primary" id="zmIn">Zoom in ×10</button><button class="btn" id="zmReset">Start again</button></div>`,'Each zoom shows one more decimal place.'),
 area2:()=>W_('area2',`<svg viewBox="0 0 320 240" id="a2Svg" role="img" aria-label="A tilted square of area 2 inside a 2 by 2 square"></svg><div class="readout" id="a2Out"></div><div class="row" style="justify-content:center"><button class="btn primary" id="a2Next">Next</button></div>`,'Fold the four corner triangles in and they cover the tilted square exactly.'),
 irrline:()=>W_('irrline',`<div class="row" style="justify-content:center">${['√2','√3','√5','π','√10','∛10','√15'].map((t,i)=>`<button class="btn" data-il="${i}">${t}</button>`).join('')}</div><svg viewBox="0 0 340 130" id="ilSvg" role="img" aria-label="Number line from 0 to 4"></svg><div class="readout" id="ilOut"><small>Tap a number to place it.</small></div>`),
 sortgame:()=>W_('sortgame',`<div class="flash" id="sgCard" style="font-size:clamp(34px,7vw,56px);padding:14px"></div><div class="row" style="justify-content:center"><button class="btn primary" data-sgv="r">Rational</button><button class="btn primary" data-sgv="i" style="background:var(--sage)">Irrational</button></div><div class="readout" id="sgFb" style="min-height:3.2em"></div><div class="row" style="justify-content:center"><span class="tiny" id="sgScore"></span><button class="btn" id="sgRestart">Play again</button></div>`)
});

Object.assign(INIT,{
 share(el){const N=$('#shN',el),K=$('#shK',el);let tm=[];
  const draw=(anim)=>{tm.forEach(clearTimeout);tm=[];const n=+N.value,k=+K.value,q=Math.floor(n/k),r=n%k;
   $('#shPlates',el).innerHTML=Array.from({length:k},(_,i)=>`<div style="display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start;justify-content:center;width:${Math.max(76,Math.min(130,Math.ceil(Math.sqrt(q||1))*32+16))}px;min-height:84px;padding:10px;border-radius:50%;box-shadow:var(--press)" id="pl${i}"></div>`).join('');
   $('#shLeft',el).innerHTML='';$('#shOut',el).innerHTML='<small>Dealing…</small>';
   const finish=()=>{$('#shLeft',el).innerHTML=Array.from({length:r},()=>cookie(COL.mist)).join('');$('#shOut',el).innerHTML=`${n} ÷ ${k} = ${q}${r?` remainder ${r}`:''}<small>Each plate gets ${q}.${r?` ${r} ${r===1?'is':'are'} left over, not enough to give every plate one more. Check: ${k} × ${q} + ${r} = ${n}`:` Check: ${k} × ${q} = ${n}`}</small>`;};
   if(!anim||reduceMotion||q*k>40){for(let i=0;i<k;i++)$('#pl'+i,el).innerHTML=Array.from({length:q},()=>cookie(i%2?COL.rose:COL.taupe)).join('');finish();return;}
   for(let c=0;c<q*k;c++)tm.push(setTimeout(()=>{const i=c%k;$('#pl'+i,el).insertAdjacentHTML('beforeend',cookie(i%2?COL.rose:COL.taupe));},c*110));
   tm.push(setTimeout(finish,q*k*110+120));};
  N.oninput=K.oninput=()=>draw(false);$('#shGo',el).onclick=()=>draw(true);draw(false);},
 groups(el){const N=$('#grN',el),G=$('#grG',el);const f=()=>{const n=+N.value,g=+G.value,q=Math.floor(n/g),r=n%g;
  $('#grBox',el).innerHTML=Array.from({length:q},(_,i)=>`<span class="fadein" style="display:inline-flex;flex-wrap:wrap;gap:3px;max-width:${Math.min(g,4)*29+14}px;padding:7px;border-radius:18px;border:2px dashed ${i%2?COL.sage:COL.rose};animation-delay:${i*.06}s">${Array.from({length:g},()=>cookie(i%2?COL.sage:COL.rose,'width:22px;height:22px')).join('')}</span>`).join('')+(r?`<span style="display:inline-flex;gap:3px;align-items:center;padding:7px">${Array.from({length:r},()=>cookie(COL.mist,'width:22px;height:22px')).join('')}</span>`:'');
  $('#grOut',el).innerHTML=`${n} ÷ ${g} = ${q}${r?` remainder ${r}`:''}<small>${q} group${q===1?'':'s'} of ${g}${r?`, and ${r} left over that can't make a full group`:''}.</small>`;};N.oninput=G.oninput=f;f();},
 factfam(el){const A=$('#ffA',el),B=$('#ffB',el);const f=()=>{const a=+A.value,b=+B.value,p=a*b;
  $('#ffSvg',el).innerHTML=`<polygon points="160,20 40,180 280,180" fill="${COL.blush}" stroke="${COL.rose}" stroke-width="3" stroke-linejoin="round"/><circle cx="160" cy="58" r="30" fill="#3A2522"/><text x="160" y="66" text-anchor="middle" font-size="24" font-weight="700" font-family="JetBrains Mono" fill="#fff">${p}</text><circle cx="90" cy="150" r="26" fill="${COL.sage}"/><text x="90" y="158" text-anchor="middle" font-size="22" font-weight="700" font-family="JetBrains Mono" fill="#fff">${a}</text><circle cx="230" cy="150" r="26" fill="${COL.sage}"/><text x="230" y="158" text-anchor="middle" font-size="22" font-weight="700" font-family="JetBrains Mono" fill="#fff">${b}</text><text x="160" y="158" text-anchor="middle" font-size="22" font-family="JetBrains Mono" fill="${COL.cocoa}">×</text>`;
  $('#ffFacts',el).innerHTML=[`${a} × ${b} = ${p}`,`${b} × ${a} = ${p}`,`${p} ÷ ${a} = ${b}`,`${p} ÷ ${b} = ${a}`].map((t,i)=>`<div class="plain m" style="font-weight:700;${i>1?'background:color-mix(in srgb,var(--sage) 18%,var(--bg))':''}">${t}</div>`).join('');};A.oninput=B.oninput=f;f();},
 skip(el){const D=$('#skD',el),Q=$('#skQ',el);let tm=null;const draw=(upto)=>{const d=+D.value,q=+Q.value,n=d*q,X=v=>20+v/n*300;let h=`<line x1="20" y1="80" x2="320" y2="80" stroke="${COL.mist}" stroke-width="3"/><text x="20" y="104" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="${COL.cocoa}">0</text><text x="320" y="104" text-anchor="middle" font-size="12" font-weight="700" font-family="JetBrains Mono" fill="#3A2522">${n}</text>`;
   for(let i=0;i<upto;i++){const a=X(i*d),b=X((i+1)*d);h+=`<path class="fadein" d="M${a} 78 Q ${(a+b)/2} 38 ${b} 78" fill="none" stroke="${i%2?COL.sage:COL.rose}" stroke-width="2.5"/>${q<=12?`<text x="${b}" y="${i%2?118:104}" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="${COL.cocoa}">${(i+1)*d}</text>`:''}<text x="${(a+b)/2}" y="46" text-anchor="middle" font-size="10" font-weight="700" font-family="JetBrains Mono" fill="${COL.cocoa}">${i+1}</text>`;}
   $('#skSvg',el).innerHTML=h;$('#skOut',el).innerHTML=upto>=q?`${n} ÷ ${d} = ${q}<small>${q} jumps of ${d} land exactly on ${n}.</small>`:`What is ${n} ÷ ${d}?<small>${upto?`${upto} jump${upto>1?'s':''} so far…`:'Press the button to count up in '+d+'s.'}</small>`;};
  const go=()=>{clearInterval(tm);const q=+Q.value;let k=0;if(reduceMotion){draw(q);return;}draw(0);tm=setInterval(()=>{k++;draw(k);if(k>=q)clearInterval(tm);},380);};
  D.oninput=Q.oninput=()=>{clearInterval(tm);draw(0);};$('#skGo',el).onclick=go;draw(0);},
 rules(el){let k=0;const N=$('#ruN',el);const f=()=>{const n=+N.value;const R=[[`${n} ÷ 1 = ${n}`,`Sharing ${n} between 1 person: they get all ${n}.`],[`${n} ÷ ${n} = 1`,`Sharing ${n} between ${n} people: everyone gets 1.`],[`0 ÷ ${n} = 0`,`Sharing nothing between ${n} people: everyone gets nothing.`],[`${n} ÷ 0 = ?`,`No answer. You can't share ${n} things between nobody. Calculators show an error.`],[`${n} ÷ 10 = ${n/10}`,`The digits move one place to the right.`]];
  $('#ruOut',el).innerHTML=`<span class="fadein">${R[k][0]}</span><small>${R[k][1]}</small>`;$$('[data-ru]',el).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ru===k));};
  N.oninput=f;el.addEventListener('click',e=>{const b=e.target.closest('[data-ru]');if(b){k=+b.dataset.ru;f();}});f();},
 bus(el){const D=[[84,3],[96,4],[125,5],[456,6]];let k=0,st=0;
  const f=()=>{const [n,d]=D[k];const dg=String(n).split('').map(Number);let carry=0;const out=[],carries=[],lines=[];
   dg.forEach((x,i)=>{const cur=carry*10+x;const q=Math.floor(cur/d);carry=cur%d;out.push(q);carries.push(carry);lines.push(`${cur} ÷ ${d} = ${q}${carry?` remainder ${carry}, carry the ${carry}`:''}`);});
   const X=i=>110+i*44;let h=`<text x="70" y="88" text-anchor="middle" font-size="30" font-family="JetBrains Mono" fill="#3A2522">${d}</text><path d="M88 56 V100 M88 56 H${X(dg.length-1)+30}" stroke="#3A2522" stroke-width="3" fill="none"/>`;
   dg.forEach((x,i)=>{h+=`<text x="${X(i)}" y="88" text-anchor="middle" font-size="30" font-family="JetBrains Mono" fill="${COL.cocoa}">${x}</text>`;if(i<st){h+=`<text class="fadein" x="${X(i)}" y="44" text-anchor="middle" font-size="30" font-weight="700" font-family="JetBrains Mono" fill="${COL.sage}">${out[i]}</text>`;if(carries[i]&&i+1<dg.length)h+=`<text class="fadein" x="${X(i+1)-17}" y="76" text-anchor="middle" font-size="15" font-weight="700" font-family="JetBrains Mono" fill="${COL.rose}">${carries[i]}</text>`;}});
   $('#bsSvg',el).innerHTML=h;
   const ans=+out.join('');$('#bsOut',el).innerHTML=st===0?`${n} ÷ ${d}<small>Start with the first digit.</small>`:st<=dg.length?`${lines[st-1]}<small>${st<dg.length?'Next digit…':'Read the answer along the top.'}</small>`:'';
   if(st>dg.length)$('#bsOut',el).innerHTML=`${n} ÷ ${d} = ${ans}<small>Check: ${d} × ${ans} = ${d*ans}</small>`;
   $('#bsNext',el).textContent=st>dg.length?'Start again':'Next step';$$('[data-bs]',el).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.bs===k));};
  $('#bsNext',el).onclick=()=>{const L=String(D[k][0]).length;st=st>L?0:st+1;f();};el.addEventListener('click',e=>{const b=e.target.closest('[data-bs]');if(b){k=+b.dataset.bs;st=0;f();}});f();},
 thermo(el){const T=$('#thT',el);const f=()=>{const t=+T.value,X=v=>30+(v+10)/20*280;let h=`<line x1="30" y1="70" x2="310" y2="70" stroke="${COL.mist}" stroke-width="3"/>`;
  for(let v=-10;v<=10;v+=2)h+=`<line x1="${X(v)}" y1="62" x2="${X(v)}" y2="78" stroke="${v===0?'#3A2522':COL.taupe}" stroke-width="${v===0?3:1.5}"/><text x="${X(v)}" y="98" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="${COL.cocoa}">${ns(v)}</text>`;
  h+=`<rect x="30" y="60" width="${X(0)-30}" height="20" fill="${COL.blush}" opacity=".5" rx="6"/><text x="${(30+X(0))/2}" y="40" text-anchor="middle" font-size="12" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">negative</text><text x="${(X(0)+310)/2}" y="40" text-anchor="middle" font-size="12" fill="${COL.cocoa}" font-family="Atkinson Hyperlegible">positive</text><circle class="fadein" cx="${X(t)}" cy="70" r="10" fill="${t<0?COL.rose:t>0?COL.sage:'#3A2522'}"/>`;
  $('#thSvg',el).innerHTML=h;$('#thOut',el).innerHTML=`${ns(t)} °C<small>${t<0?`${-t} degrees below zero. It is to the left of 0.`:t>0?`${t} degrees above zero.`:'Exactly zero: neither positive nor negative.'}</small>`;};T.oninput=f;f();},
 jumps(el){const N=$('#jpN',el),Sz=$('#jpS',el);const f=()=>{const n=+N.value,s=+Sz.value,end=n*s,lo=Math.min(end,-1)-1,X=v=>20+(v-lo)/(2-lo)*300;
  let h=`<line x1="20" y1="80" x2="320" y2="80" stroke="${COL.mist}" stroke-width="3"/>`;for(let v=lo;v<=2;v++)h+=`<line x1="${X(v)}" y1="74" x2="${X(v)}" y2="86" stroke="${v===0?'#3A2522':COL.taupe}" stroke-width="${v===0?2.5:1.2}"/>${(v%2===0||lo>-12)?`<text x="${X(v)}" y="104" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="${COL.cocoa}">${ns(v)}</text>`:''}`;
  for(let i=0;i<n;i++){const a=X(i*s),b=X((i+1)*s);h+=`<path class="fadein" style="animation-delay:${i*.18}s" d="M${a} 78 Q ${(a+b)/2} 30 ${b} 78" fill="none" stroke="${COL.rose}" stroke-width="2.6"/><text x="${(a+b)/2}" y="40" text-anchor="middle" font-size="10" font-weight="700" font-family="JetBrains Mono" fill="${COL.cocoa}">${ns(s)}</text>`;}
  $('#jpSvg',el).innerHTML=h;$('#jpOut',el).innerHTML=`${n} × ${nb(s)} = ${ns(end)}<small>${Array(n).fill(nb(s)).join(' + ')} = ${ns(end)}</small>`;};N.oninput=Sz.oninput=f;f();},
 pattern(el){let k=4;const f=()=>{const rows=[];for(let a=3;a>=3-k+1;a--)rows.push(a);
  $('#ptBox',el).innerHTML=rows.map((a,i)=>{const p=a*-2;return `<div class="${i===rows.length-1?'fadein':''}" style="display:grid;grid-template-columns:1fr auto;align-items:center;padding:6px 12px;border-radius:12px;${a<0?'background:color-mix(in srgb,var(--sage) 20%,var(--bg))':''}"><span class="m" style="font-size:18px">${nb(a)} × (${MI}2) = <b>${ns(p)}</b></span><span class="tiny">${i?'↑ 2 more':''}</span></div>`;}).join('');
  $('#ptNext',el).disabled=k>=8;};$('#ptNext',el).onclick=()=>{k++;f();};$('#ptReset',el).onclick=()=>{k=4;f();};f();},
 signs(el){const div=el.dataset.op==='div';let sa=1,sb=-1;const A=$('#sgA',el),B=$('#sgB',el),X=$('#sgX',el),Y=$('#sgY',el);
  const f=()=>{A.textContent=sa>0?'+':MI;B.textContent=sb>0?'+':MI;const x=Math.abs(Math.round(+X.value)),y=Math.abs(Math.round(+Y.value));const a=sa*x,b=sb*y;
   if(div&&y===0){$('#sgOut',el).innerHTML='<small>You can\'t divide by 0.</small>';return;}
   const same=sa===sb;const mag=div?x/y:x*y;const res=(same?1:-1)*mag;
   $('#sgOut',el).innerHTML=`${nb(a)} ${div?'÷':'×'} ${nb(b)} = <span style="color:${res<0?COL.rose:COL.sage}">${ns(r2(res))}</span><small>${div?`${x} ÷ ${y} = ${r2(mag)}`:`${x} × ${y} = ${mag}`}. The signs are ${same?'the same, so the answer is positive':'different, so the answer is negative'}.</small>`;};
  A.onclick=()=>{sa=-sa;f();};B.onclick=()=>{sb=-sb;f();};X.oninput=Y.oninput=f;f();},
 countneg(el){let nums=[-2,-3,-1];const f=()=>{$('#cnRow',el).innerHTML=nums.map((n,i)=>`<button class="btn" data-cni="${i}" style="font-family:var(--mono);font-size:18px;${n<0?'background:var(--bad-soft)':''}">${nb(n)}</button>`).join('<span style="font-weight:700">×</span>');
  const negs=nums.filter(n=>n<0).length,prod=nums.reduce((a,b)=>a*b,1);
  $('#cnOut',el).innerHTML=nums.length?`= ${ns(prod)}<small>${negs} negative${negs===1?'':'s'}: ${negs%2?'odd, so the answer is negative':'even, so the answer is positive'}.</small>`:'<small>Add some numbers.</small>';};
  el.addEventListener('click',e=>{const b=e.target.closest('[data-cni]');if(b){nums[+b.dataset.cni]*=-1;f();}});
  $('#cnAdd',el).onclick=()=>{if(nums.length<6){nums.push(-1);f();}};$('#cnAdd2',el).onclick=()=>{if(nums.length<6){nums.push(2);f();}};$('#cnClr',el).onclick=()=>{nums=[-2,-3,-1];f();};f();},
 zoom(el){const N=[['√2','1.41421356237309504880168872420969807856967187537694'],['3/8','0.375'],['1/3','0.33333333333333333333333333333333333333333333333333']];let k=0,z=0;
  const f=()=>{const [lab,dec]=N[k];const ip=dec.split('.')[0],fr=dec.split('.')[1];const shown=fr.slice(0,z);const lo=ip+(z?'.'+shown:'');const step=Math.pow(10,-z);const nextDigit=fr[z];const exact=fr.length<=z;
   let h=`<line x1="20" y1="70" x2="320" y2="70" stroke="${COL.mist}" stroke-width="3"/>`;
   for(let i=0;i<=10;i++){const x=20+i*30;h+=`<line x1="${x}" y1="${i%5?64:58}" x2="${x}" y2="${i%5?76:82}" stroke="${COL.taupe}" stroke-width="${i%5?1.2:2}"/>`;}
   const fmt=v=>v.toFixed(z);const loN=+lo;h+=`<text x="20" y="102" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="${COL.cocoa}">${fmt(loN)}</text><text x="320" y="102" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="${COL.cocoa}">${fmt(loN+step)}</text>`;
   let pos;if(exact)pos=20;else{const restDigits=fr.slice(z,z+6).padEnd(6,'0');pos=20+(+('0.'+restDigits))*300;}
   h+=`<circle class="fadein" cx="${pos}" cy="70" r="9" fill="${k===0?COL.rose:COL.sage}"/><text x="${pos}" y="44" text-anchor="middle" font-size="14" font-weight="700" fill="#3A2522" font-family="JetBrains Mono">${lab}</text>`;
   $('#zmSvg',el).innerHTML=h;
   const digits=ip+'.'+fr.slice(0,z+1);
   $('#zmOut',el).innerHTML=exact?`${lab} = ${dec} exactly<small>It landed right on a mark. The decimal stops: rational.</small>`:`${lab} = ${digits}…<small>${z===0?'It is between '+ip+' and '+(+ip+1)+'.':`Zoom ${z}: between ${fmt(loN)} and ${fmt(loN+step)}. Next digit: ${nextDigit}.`} ${k===2&&z>1?'The 3s keep repeating: rational.':k===0&&z>2?'Still not landing, and no repeating pattern.':''}</small>`;
   $('#zmIn',el).disabled=exact||z>=12;$$('[data-zm]',el).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.zm===k));};
  $('#zmIn',el).onclick=()=>{z++;f();};$('#zmReset',el).onclick=()=>{z=0;f();};el.addEventListener('click',e=>{const b=e.target.closest('[data-zm]');if(b){k=+b.dataset.zm;z=0;f();}});f();},
 area2(el){let st=0;const f=()=>{const s=80,x0=80,y0=30;let h=`<rect x="${x0}" y="${y0}" width="${2*s}" height="${2*s}" fill="none" stroke="${COL.mist}" stroke-width="2"/><line x1="${x0+s}" y1="${y0}" x2="${x0+s}" y2="${y0+2*s}" stroke="${COL.mist}" stroke-width="1.2" stroke-dasharray="4 4"/><line x1="${x0}" y1="${y0+s}" x2="${x0+2*s}" y2="${y0+s}" stroke="${COL.mist}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
  const M=[[x0+s,y0],[x0+2*s,y0+s],[x0+s,y0+2*s],[x0,y0+s]];
  if(st>=1)h+=`<polygon class="fadein" points="${M.map(p=>p.join(',')).join(' ')}" fill="${COL.blush}" stroke="${COL.rose}" stroke-width="3"/>`;
  if(st>=2){const C=[[x0,y0],[x0+2*s,y0],[x0+2*s,y0+2*s],[x0,y0+2*s]];C.forEach((c,i)=>{const a=M[(i+3)%4],b=M[i];h+=`<polygon class="fadein" style="animation-delay:${i*.12}s" points="${c.join(',')} ${b.join(',')} ${a.join(',')}" fill="${COL.sage}" opacity=".55"/>`;});}
  if(st>=3)h+=`<line class="fadein" x1="${M[0][0]}" y1="${M[0][1]}" x2="${M[1][0]}" y2="${M[1][1]}" stroke="#3A2522" stroke-width="4"/><text x="${(M[0][0]+M[1][0])/2+14}" y="${(M[0][1]+M[1][1])/2-6}" font-size="16" font-weight="700" fill="#3A2522" font-family="JetBrains Mono">√2</text>`;
  h+=`<text x="${x0+s}" y="${y0+2*s+24}" text-anchor="middle" font-size="13" fill="${COL.cocoa}" font-family="JetBrains Mono">2</text><text x="${x0-14}" y="${y0+s+4}" text-anchor="middle" font-size="13" fill="${COL.cocoa}" font-family="JetBrains Mono">2</text>`;
  $('#a2Svg',el).innerHTML=h;
  const T=['The big square is 2 by 2, so its area is 4.<small>Press Next.</small>','Join the middles of the sides to make a tilted square.<small>How big is it?</small>','The four green corner triangles are exactly the same size as the four halves of the tilted square.<small>So the tilted square is half of 4: its area is 2.</small>','A square with area 2 has side √2 = 1.41421356…<small>A length you can draw exactly, but no fraction is equal to it.</small>'];
  $('#a2Out',el).innerHTML=T[st];$('#a2Next',el).textContent=st<3?'Next':'Start again';};$('#a2Next',el).onclick=()=>{st=st<3?st+1:0;f();};f();},
 irrline(el){const N=[['√2',Math.SQRT2,'1 and 2, because 1² = 1 and 2² = 4'],['√3',Math.sqrt(3),'1 and 2, because 1² = 1 and 2² = 4'],['√5',Math.sqrt(5),'2 and 3, because 2² = 4 and 3² = 9'],['π',Math.PI,'3 and 4. π = 3.141592…'],['√10',Math.sqrt(10),'3 and 4, because 3² = 9 and 4² = 16'],['∛10',Math.cbrt(10),'2 and 3, because 2³ = 8 and 3³ = 27'],['√15',Math.sqrt(15),'3 and 4, because 3² = 9 and 4² = 16']];const placed=new Set();
  const X=v=>20+v/4*300;const f=last=>{let h=`<line x1="20" y1="80" x2="320" y2="80" stroke="${COL.mist}" stroke-width="3"/>`;for(let v=0;v<=4;v++)h+=`<line x1="${X(v)}" y1="70" x2="${X(v)}" y2="90" stroke="#3A2522" stroke-width="2"/><text x="${X(v)}" y="110" text-anchor="middle" font-size="13" font-weight="700" font-family="JetBrains Mono" fill="#3A2522">${v}</text>`;
   let row=0;[...placed].sort((a,b)=>N[a][1]-N[b][1]).forEach((i,j)=>{const [l,v]=N[i];const y=j%2?36:56;h+=`<line x1="${X(v)}" y1="${y+6}" x2="${X(v)}" y2="78" stroke="${COL.rose}" stroke-width="1.5"/><circle cx="${X(v)}" cy="80" r="5" fill="${i===last?'#3A2522':COL.rose}"/><text x="${X(v)}" y="${y}" text-anchor="middle" font-size="13" font-weight="700" font-family="JetBrains Mono" fill="${i===last?'#3A2522':COL.cocoa}">${l}</text>`;});
   $('#ilSvg',el).innerHTML=h;if(last!=null){const [l,v,why]=N[last];$('#ilOut',el).innerHTML=`${l} ≈ ${v.toFixed(4)}…<small>Between ${why}.</small>`;}};
  el.addEventListener('click',e=>{const b=e.target.closest('[data-il]');if(!b)return;const i=+b.dataset.il;placed.add(i);b.setAttribute('aria-pressed','true');f(i);});f();},
 sortgame(el){const C=[[SQ(9),'r','√9 = 3, an integer'],[SQ(7),'i','7 is not a square number'],[MX(9,3,4),'r','a fraction: 9¾ = 9.75'],[MI+'26','r','an integer'],['0.333…','r','the 3s repeat, so it is ⅓'],[SQ(200),'i','200 is not a square number'],[F(23,8),'r','a fraction'],[CR(343),'r','∛343 = 7, because 7³ = 343'],['π','i','π never stops and never repeats'],[SQ('1.21'),'r','√1.21 = 1.1'],[CR(45),'i','45 is not a cube number'],['18.4545…','r','the 45 repeats, so it is 18 5/11'],[MI+SQ('2.25'),'r','√2.25 = 1.5, so this is −1.5'],[SQ(160),'i','160 is not a square number']];
  let order=[],pos=0,score=0,locked=false;const start=()=>{order=shuffle(C.map((c,i)=>i)).slice(0,10);pos=0;score=0;locked=false;show();};
  const show=()=>{if(pos>=order.length){$('#sgCard',el).innerHTML=`${score} / ${order.length}`;$('#sgFb',el).innerHTML=score===order.length?'Perfect sorting!':'<small>Play again to beat your score.</small>';$('#sgScore',el).textContent='';$$('[data-sgv]',el).forEach(b=>b.disabled=true);return;}
   $$('[data-sgv]',el).forEach(b=>b.disabled=false);$('#sgCard',el).innerHTML=`<span class="fadein" style="display:inline-block">${C[order[pos]][0]}</span>`;$('#sgFb',el).innerHTML='<small>Is this number rational or irrational?</small>';$('#sgScore',el).textContent=`Card ${pos+1} of ${order.length} · score ${score}`;locked=false;};
  el.addEventListener('click',e=>{const b=e.target.closest('[data-sgv]');if(!b||locked||pos>=order.length)return;locked=true;const c=C[order[pos]];const ok=b.dataset.sgv===c[1];if(ok)score++;
   $('#sgFb',el).innerHTML=`<span style="color:${ok?COL.sage:COL.rose}">${ok?'Correct!':'Not quite.'}</span> ${c[1]==='r'?'Rational':'Irrational'}<small>${c[2]}.</small>`;setTimeout(()=>{pos++;show();},reduceMotion?600:1500);});
  $('#sgRestart',el).onclick=start;start();}
});

/* =================== GAMES (Foundations) =================== */
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
function mcOpts(ans,spread=4,extra=[]){const s=new Set([ans,...extra.filter(x=>x!==ans)]);let g=0;while(s.size<4&&g++<60){const d=rnd(1,spread)*(Math.random()<.5?-1:1);s.add(ans+d);}return shuffle([...s].slice(0,4));}
const GAMES=[
 {id:'dash',name:'Division Dash',icon:'⚡',desc:'Answer as many division facts as you can in 60 seconds.',timed:60,levels:['Easy: ÷ 2, 5, 10','Medium: up to 10 × 10','Hard: up to 12 × 12'],
  gen(l){const ds=l===0?[2,5,10]:l===1?[2,3,4,5,6,7,8,9,10]:[3,4,6,7,8,9,11,12];const d=ds[rnd(0,ds.length-1)],q=rnd(2,l===2?12:10);const n=d*q;return {q:`${n} ÷ ${d}`,ans:q,opts:mcOpts(q,3,[q+1,q-1].filter(x=>x>0)),why:`${d} × ${q} = ${n}`};}},
 {id:'cookie',name:'Cookie Share',icon:'🍪',desc:'Share the cookies fairly. Some rounds have leftovers.',rounds:10,levels:['No leftovers','With leftovers'],
  gen(l){const k=rnd(2,6),q=rnd(2,7),r=l===0?0:rnd(0,k-1),n=k*q+r;const lab=(a,b)=>b?`${a} each, ${b} left`:`${a} each`;
   const c=[[q+1,r],[q-1,r],[q,(r+1)%k],[q+1,0],[q,r?0:1],[q+2,r]].filter(o=>o[0]>0&&o[1]<k).map(o=>lab(o[0],o[1]));const ans=lab(q,r);const others=[...new Set(c)].filter(x=>x!==ans).slice(0,3);
   return {q:`<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:360px;margin:0 auto 8px">${Array.from({length:n},()=>cookie(COL.rose,'width:20px;height:20px')).join('')}</div><div style="font-size:clamp(20px,4vw,28px)">${n} cookies shared between ${k} plates</div>`,ans,opts:shuffle([ans,...others]),why:`${k} × ${q}${r?` + ${r}`:''} = ${n}`};}},
 {id:'snap',name:'Sign Snap',icon:'±',desc:'Positive or negative? Decide fast. 30 seconds.',timed:30,levels:['Two numbers','Three numbers'],
  gen(l){const k=l===0?2:3;const nums=Array.from({length:k},()=>rnd(1,9)*(Math.random()<.5?-1:1));const p=nums.reduce((a,b)=>a*b,1);const negs=nums.filter(n=>n<0).length;
   return {q:nums.map(nb).join(' × '),ans:p>0?'Positive':'Negative',opts:['Positive','Negative'],why:`${negs} negative${negs===1?'':'s'}, so ${p>0?'positive':'negative'}: ${ns(p)}`};}},
 {id:'climb',name:'Negative Number Climb',icon:'⛰',desc:'Get each answer right to climb the mountain. 10 steps to the top.',rounds:10,levels:['Multiply','Multiply and divide'],
  gen(l){const a=rnd(2,9)*(Math.random()<.5?-1:1),b=rnd(2,9)*(Math.random()<.5?-1:1);if(l===1&&Math.random()<.5){const p=a*b;return {q:`${nb(p)} ÷ ${nb(b)}`,ans:a,opts:mcOpts(a,2,[-a]),why:`${nb(b)} × ${nb(a)} = ${ns(p)}`};}
   const p=a*b;return {q:`${nb(a)} × ${nb(b)}`,ans:p,opts:mcOpts(p,3,[-p,a+b].filter(x=>x!==p)),why:`${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(p)}, and the signs are ${(a<0)===(b<0)?'the same, so positive':'different, so negative'}`};}}
];
let GM=null;
function renderGames(){if(!S.games)S.games={};
 if(!GM)return `<div class="thead"><div class="eyebrow">Foundations · Games</div><h2>Games</h2><p class="meta">Short games to make division and negative numbers feel easy. Your best scores are saved.</p></div>
  <div class="lgrid">${GAMES.map(g=>`<div class="card"><div style="font-size:34px">${g.icon}</div><b class="ltitle">${g.name}</b><p class="tiny">${g.desc}</p><div class="row">${g.levels.map((lv,i)=>`<button class="btn ${i===0?'primary':''}" data-gstart="${g.id}" data-glv="${i}">${lv}</button>`).join('')}</div><span class="tiny">${g.levels.map((lv,i)=>{const b=S.games[g.id+i];return b!=null?`Best (${lv.split(':')[0]}): ${b}`:''}).filter(Boolean).join(' · ')||'No best score yet'}</span></div>`).join('')}</div>`;
 const g=GAMES.find(x=>x.id===GM.id);
 if(GM.over){const b=S.games[g.id+GM.lv];return `<div class="thead"><div class="eyebrow">${g.name}</div><h2>${GM.score>=b&&GM.score>0?'New best score!':'Well done'}</h2></div><div class="card empty"><div class="score">${GM.score}${g.rounds?' / '+g.rounds:''}</div><p>${g.timed?`correct answers in ${g.timed} seconds`:''}${g.id==='climb'?(GM.score===g.rounds?' You reached the top!':''):''}</p><p class="tiny">Best: ${b}</p><div class="row" style="justify-content:center"><button class="btn primary" data-gstart="${g.id}" data-glv="${GM.lv}">Play again</button><button class="btn" data-gquit>All games</button></div></div>`;}
 const r=GM.cur;
 return `<div class="thead"><div class="eyebrow">${g.name} · ${g.levels[GM.lv]}</div><h2>${g.timed?`<span id="gTime">${GM.left}</span> s`:`Question ${GM.n+1} of ${g.rounds}`}</h2></div>
  ${g.id==='climb'?`<svg viewBox="0 0 320 70" aria-hidden="true" style="display:block;width:100%;max-width:420px;margin:0 auto"><path d="M10 64 L160 8 L310 64Z" fill="${COL.blush}"/>${Array.from({length:10},(_,i)=>`<circle cx="${20+i*14.2}" cy="${60-i*5.4}" r="4" fill="${i<GM.score?COL.sage:COL.mist}"/>`).join('')}<circle cx="${20+GM.score*14.2}" cy="${60-GM.score*5.4-8}" r="6" fill="#3A2522"/></svg>`:`<div class="qprog"><i style="width:${g.timed?GM.left/g.timed*100:GM.n/g.rounds*100}%"></i></div>`}
  <div class="card"><div class="flash" style="font-size:clamp(28px,7vw,52px);padding:10px">${r.q}</div><div class="opts">${r.opts.map(o=>`<button class="opt" data-gans="${esc(String(o))}" ${GM.fb?'disabled':''} ${GM.fb&&String(o)===String(r.ans)?'style="outline:2px solid var(--sage)"':''}>${typeof o==='number'?ns(o):o}</button>`).join('')}</div>
  ${GM.fb?`<div class="fb ${GM.fb==='ok'?'good':'bad'}"><b>${GM.fb==='ok'?'Correct!':'Not quite.'}</b> ${r.why}</div>`:''}
  <div class="row" style="justify-content:space-between"><span class="tiny">Score: ${GM.score}</span><button class="btn" data-gquit>Stop</button></div></div>`;}
function gNext(){const g=GAMES.find(x=>x.id===GM.id);GM.cur=g.gen(GM.lv);GM.fb=null;}
function gEnd(){const g=GAMES.find(x=>x.id===GM.id);clearInterval(GM.tm);GM.over=true;const k=g.id+GM.lv;if(S.games[k]==null||GM.score>S.games[k])S.games[k]=GM.score;save();render();}
document.addEventListener('click',e=>{
 const st=e.target.closest('[data-gstart]');if(st){if(GM)clearInterval(GM.tm);const g=GAMES.find(x=>x.id===st.dataset.gstart);GM={id:g.id,lv:+st.dataset.glv,score:0,n:0,left:g.timed||0,over:false};gNext();
  if(g.timed)GM.tm=setInterval(()=>{if(!GM||GM.over){return;}GM.left--;const t=$('#gTime');if(t)t.textContent=GM.left;const bar=$('.qprog i');if(bar)bar.style.width=(GM.left/g.timed*100)+'%';if(GM.left<=0)gEnd();},1000);
  render();return;}
 if(e.target.closest('[data-gquit]')){if(GM)clearInterval(GM.tm);GM=null;render();return;}
 const an=e.target.closest('[data-gans]');if(an&&GM&&!GM.fb&&!GM.over){const g=GAMES.find(x=>x.id===GM.id);const ok=an.dataset.gans===String(GM.cur.ans);if(ok)GM.score++;
  if(g.timed){if(ok){gNext();render();}else{GM.fb='bad';render();setTimeout(()=>{if(GM&&!GM.over){gNext();render();}},1200);}return;}
  GM.fb=ok?'ok':'bad';GM.n++;render();setTimeout(()=>{if(!GM||GM.over)return;if(GM.n>=g.rounds)gEnd();else{gNext();render();}},ok?900:1700);}
});

/* =================== STATE FOR THE CURRENT CHAPTER =================== */
let CUR=1,TOPICS,KEYWORDS,CYP,QUIZ,CHD,QZ=null;
const qb=()=>S.quiz[CUR]?S.quiz[CUR].best:null;
function useChapter(n){if(!CHAPTERS_DATA[n])n=1;CUR=n;CHD=CHAPTERS_DATA[n];TOPICS=CHD.topics;KEYWORDS=CHD.kw;CYP=CHD.cyp;QUIZ=CHD.quiz;S.ch=n;if(!S.sec[n])S.sec[n]=TOPICS[0].id;QZ=null;}
if(!S.later)S.later={};

/* =================== RENDER: chapter =================== */
const SECS={games:{id:'games',label:'Games',num:'▶'},cards:{id:'cards',label:'Key word cards',num:'Aa'},cyp:{id:'cyp',label:'Check your progress',num:'✓'},quiz:{id:'quiz',label:'Mixed quiz',num:'?'},papers:{id:'papers',label:'Past papers',num:'P'}};
const sectionsList=()=>[...TOPICS.map(t=>({id:t.id,label:t.title,num:/\.0$/.test(t.id)?'★':t.id})),...(CHD.sections||['cards','cyp','quiz','papers']).map(k=>SECS[k])];
const chName=n=>n===0?'Foundations':'Chapter '+n;
function topicProg(t){let d=0;t.steps.forEach((s,i)=>{if(S.done[t.id+'-'+i])d++;});return d/t.steps.length;}
function chapterPct(){const parts=TOPICS.map(topicProg);parts.push(KEYWORDS.filter(w=>S.cards[w.id]==='known').length/KEYWORDS.length);parts.push(qb()!=null?qb()/10:0);return Math.round(parts.reduce((a,b)=>a+b,0)/parts.length*100);}
function renderPills(){
 $('#pills').innerHTML=sectionsList().map(s=>{let p=null;const t=TOPICS.find(x=>x.id===s.id);if(t)p=topicProg(t);
  if(s.id==='cards')p=KEYWORDS.filter(w=>S.cards[w.id]==='known').length/KEYWORDS.length;
  if(s.id==='quiz'&&qb()!=null)p=qb()/10;
  return `<button class="pill" data-sec="${s.id}" aria-current="${S.sec[CUR]===s.id}"><span class="num">${s.num}</span>${s.label}${p!=null?`<span class="bar"><i style="width:${Math.round(p*100)}%"></i></span>`:''}</button>`}).join('');
 const pct=chapterPct();$('#ringArc').setAttribute('stroke-dasharray',`${(pct/100*100.5).toFixed(1)} 100.5`);$('#ringTxt').textContent=pct+'%';
}
const fbHtml=(ok,why)=>`<div class="fb ${ok?'good':'bad'}"><b>${ok?'Correct.':'Not quite.'}</b> ${why}</div>`;
function checkHtml(key,c){const done=S.checks[key];
 return `<div class="check" data-key="${key}"><div class="tag">Quick check</div><div class="q">${c.q}</div>
 <div class="opts">${c.opts.map((o,i)=>{let cls='';if(done!=null){if(i===c.ans)cls='right';else if(i===done)cls='wrong';}return `<button class="opt ${cls}" data-i="${i}" ${done!=null?'disabled':''}>${o}</button>`}).join('')}</div>
 ${done!=null?fbHtml(done===c.ans,c.why)+`<div class="rowend"><button class="clearbtn" data-clearcheck="${key}">${CLR}Clear and try again</button></div>`:''}</div>`;}
const CLR=`<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const laterBtn=k=>{const on=!!S.later[k];return `<button class="laterbtn" data-later="${k}" aria-pressed="${on}"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" fill="${on?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span>${on?'Marked to study later':'Study again later'}</span></button>`;};
function bqHtml(k,p,q,a){return `<div class="bqi"><div class="qh"><span class="pg">${p}</span></div><div class="qt">${q}</div>
 <textarea id="bq-${k}" data-bq="${k}" placeholder="Type your answer here">${esc(S.bq[k]||'')}</textarea>
 <div class="rowend"><button class="reveal-btn" data-rev aria-expanded="false">Show the answer</button><button class="clearbtn" data-clearbq="${k}">${CLR}Clear</button></div><div class="ans" hidden><span>Answer from the course</span><div>${a}</div></div></div>`;}
function renderTopic(t){
 let firstOpen=t.steps.findIndex((s,i)=>!S.done[t.id+'-'+i]);if(firstOpen<0)firstOpen=t.steps.length;
 let h=`<div class="thead"><div class="eyebrow">${/\.0$/.test(t.id)?'Before you start':'Topic '+t.id} · ${t.src}${CHD.extra?' · extra practice, not from the book':''}</div><h2>${t.title}</h2></div>
 <div class="intro"><div class="card"><div class="kicker">In this topic you will</div><ul class="goals">${t.goals.map(g=>`<li>${g}</li>`).join('')}</ul></div>
 <div class="card hook"><h3>Think about this</h3><p>${t.hook.q}</p><button class="reveal-btn" data-rev aria-expanded="false">Think first, then tap to see</button><p class="reveal-text" hidden>${t.hook.a}</p></div>
 <div class="card big"><h3>The big idea</h3><p>${t.big}</p></div></div>`;
 t.steps.forEach((s,i)=>{if(i>firstOpen)return;const media=s.vis&&VIS[s.vis]?VIS[s.vis]():'';
  h+=`<article class="card step ${s.refresh?'refresh':''}" id="st-${t.id}-${i}"><div class="${media?'split':'txt'}"><div class="body"><div class="stepbar"><span class="sno">Step ${i+1} of ${t.steps.length}</span>${s.refresh?'<span class="rtag">Refresher</span>':''}${laterBtn(t.id+'-'+i)}</div><h3>${s.t}</h3>${s.body}</div>${media?`<div class="media">${media}</div>`:''}</div>${checkHtml(t.id+'-'+i,s.check)}</article>`;});
 if(firstOpen<t.steps.length-1){const left=t.steps.length-firstOpen-1;h+=`<div class="card locked">Answer the quick check above to open step ${firstOpen+2}. ${left} more step${left>1?'s':''} to go in this topic.</div>`;}
 if(firstOpen>=t.steps.length){
  h+=`<div class="card"><div class="kicker">Watch out for these mistakes</div><div class="mist">${t.mistakes.map(m=>`<div class="mrow"><div class="w"><span>Common mistake</span>${m[0]}</div><div class="r"><span>Actually</span>${m[1]}</div></div>`).join('')}</div></div>
  ${t.bq.length?`<div class="card"><div class="kicker">Questions from your book</div><p class="meta">Try each question first. Write your answer, then tap to compare it with the course's answer.</p><div class="bq">${t.bq.map((q,i)=>bqHtml(t.id+'-'+i,q.p,q.q,q.a)).join('')}</div></div>`:''}`;
  if(t.checklist.length)h+=`<div class="card"><div class="kicker">Can you do these? (the topic's goals)</div><div class="checklist">${t.checklist.map((c,i)=>{const k=t.id+'-'+i;return `<label><input type="checkbox" data-cl="${k}" ${S.cl[k]?'checked':''}> ${c}</label>`}).join('')}</div></div>`;
  const ni=TOPICS.indexOf(t)+1;h+=`<div class="row" style="justify-content:flex-end"><button class="btn primary" data-go="${ni<TOPICS.length?TOPICS[ni].id:'cards'}">${ni<TOPICS.length?'Next: '+(TOPICS[ni].id)+' '+TOPICS[ni].title:'Next: Key word cards'} →</button></div>`;}
 return h;}
function renderCards(){const order=[...KEYWORDS].sort((a,b)=>(S.cards[a.id]==='known')-(S.cards[b.id]==='known'));const known=KEYWORDS.filter(w=>S.cards[w.id]==='known').length;
 return `<div class="thead"><div class="eyebrow">${chName(CUR)} · Key words</div><h2>Key word cards</h2><p class="meta">Tap a card to flip it, then mark it "Got it" or "Not yet". Cards you haven't got yet move to the front. ${known} of ${KEYWORDS.length} marked as got it.</p></div>
 <div class="cards">${order.map(w=>{const st=S.cards[w.id]||'';return `<div class="cardwrap"><button class="flip ${st}" data-flip aria-label="Flip the card for ${esc(w.t)}"><div class="in"><div class="f"><small>Topic ${w.topic}</small><strong>${w.t}</strong><small>Tap to flip</small></div><div class="b">${w.d}</div></div></button><div class="row" style="justify-content:center"><button class="btn" data-mark="${w.id}" data-v="unsure">Not yet</button><button class="btn" data-mark="${w.id}" data-v="known">Got it</button></div></div>`}).join('')}</div>`;}
function renderCyp(){return `<div class="thead"><div class="eyebrow">${chName(CUR)} · End of chapter</div><h2>Check your progress</h2><p class="meta">These are the end-of-chapter questions from the book. ${CHD.cypNote}</p></div>
 <div class="card"><div class="bq">${CYP.map((c,i)=>bqHtml('c'+CUR+'-cyp-'+i,'Question '+c.p,c.q,c.a)).join('')}</div></div>`;}
function startQuiz(){const wrong=new Set(S.quiz[CUR]?S.quiz[CUR].wrong:[]);const idx=QUIZ.map((q,i)=>i);QZ={order:[...shuffle(idx.filter(i=>wrong.has(i))),...shuffle(idx.filter(i=>!wrong.has(i)))].slice(0,10),pos:0,score:0,wrong:[],ans:null};}
function renderQuiz(){
 if(!QZ)return `<div class="thead"><div class="eyebrow">${chName(CUR)} · All topics</div><h2>Mixed quiz</h2><p class="meta">Ten questions from the whole chapter. Questions you got wrong last time come back first.</p></div><div class="card empty"><h3>${qb()!=null?'Best score so far: '+qb()+' / 10':'Ready when you are'}</h3><p>${qb()!=null?'Try again to beat it.':'Finish the topics first for the best result, or jump in now.'}</p><button class="btn primary" id="qStart">Start the quiz</button></div>`;
 if(QZ.pos>=QZ.order.length){const n=QZ.order.length;return `<div class="thead"><h2>Mixed quiz</h2></div><div class="card empty"><div class="score">${QZ.score} / ${n}</div><p>${QZ.score===n?'Perfect score.':QZ.wrong.length+' to review. They will come up first next time.'}</p><button class="btn primary" id="qStart">Play again</button></div>`;}
 const q=QUIZ[QZ.order[QZ.pos]];
 return `<div class="thead"><div class="eyebrow">Question ${QZ.pos+1} of ${QZ.order.length}</div><h2>Mixed quiz</h2></div><div class="qprog"><i style="width:${QZ.pos/QZ.order.length*100}%"></i></div>
 <div class="card"><div class="q" style="font-size:19px;font-weight:700">${q.q}</div><div class="opts">${q.opts.map((o,i)=>{let cls='';if(QZ.ans!=null){if(i===q.ans)cls='right';else if(i===QZ.ans)cls='wrong';}return `<button class="opt ${cls}" data-qa="${i}" ${QZ.ans!=null?'disabled':''}>${o}</button>`}).join('')}</div>
 ${QZ.ans!=null?fbHtml(QZ.ans===q.ans,q.why)+`<button class="btn primary" id="qNext" style="justify-self:end">${QZ.pos+1<QZ.order.length?'Next question':'See my score'} →</button>`:''}</div>`;}
function renderPapers(){return `<div class="thead"><div class="eyebrow">${chName(CUR)}</div><h2>Past paper questions</h2></div><div class="card empty"><h3>No past paper questions yet</h3><p>Only questions from official Cambridge Lower Secondary Checkpoint Mathematics papers will go here, each tagged to the topic it tests. They'll be added once official papers are shared, from Cambridge's specimen set or from school.</p><p class="tiny">Until then, Check your progress is the best exam-style practice for this chapter.</p></div>`;}

/* =================== STICKERS (original winter designs) =================== */
const STK_VAR=[['Rose',COL.rose,COL.blush],['Cocoa',COL.cocoa,COL.blush],['Moss',COL.moss,COL.snow],['Taupe',COL.taupe,COL.blush],['Stone',COL.stone,COL.snow],['Blush',COL.blush,COL.rose]];
const STK_NAMES=['Snowflake','Mug of Cocoa','Pine Tree','Mitten','Snowman','Knitted Hat','Candle','Cozy Cabin','Snow Globe','Scarf','Lantern','Pinecone','Ice Skate','Teapot','Winter Star','Fireplace'];
function stickerInfo(idx){const sh=idx%16,va=(Math.floor(idx/16)+idx*5)%6;return{sh,va,name:STK_VAR[va][0]+' '+STK_NAMES[sh]};}
function stickerSVG(idx,size=92){const {sh,va}=stickerInfo(idx);const [,a,b]=STK_VAR[va];const d=a===COL.blush?COL.cocoa:'#fff';
 const S_=[
  `<g stroke="${a}" stroke-width="5" stroke-linecap="round"><path d="M50 22v56M26 36l48 28M26 64l48-28"/><path d="M50 30l-7-6M50 30l7-6M50 70l-7 6M50 70l7 6" stroke-width="4"/></g>`,
  `<rect x="28" y="38" width="38" height="36" rx="8" fill="${a}"/><path d="M66 46h6a8 8 0 0 1 0 16h-6" fill="none" stroke="${a}" stroke-width="5"/><path d="M38 30c0-6 6-6 6-12M50 30c0-6 6-6 6-12" stroke="${COL.mist}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34 50h26" stroke="${d}" stroke-width="3" stroke-linecap="round"/>`,
  `<path d="M50 18l18 26H58l14 20H28l14-20H32z" fill="${a}"/><rect x="45" y="64" width="10" height="14" rx="2" fill="${COL.taupe}"/><circle cx="50" cy="18" r="4" fill="${b}"/>`,
  `<path d="M36 74V44a14 14 0 0 1 28 0v30z" fill="${a}"/><path d="M36 54h-4a6 6 0 0 1 0-12c4 0 4 4 4 8" fill="${a}"/><rect x="33" y="68" width="34" height="10" rx="4" fill="${b}"/>`,
  `<circle cx="50" cy="62" r="16" fill="${COL.snow}" stroke="${a}" stroke-width="4"/><circle cx="50" cy="36" r="11" fill="${COL.snow}" stroke="${a}" stroke-width="4"/><circle cx="46" cy="34" r="1.8" fill="${COL.cocoa}"/><circle cx="54" cy="34" r="1.8" fill="${COL.cocoa}"/><path d="M38 46h24" stroke="${b}" stroke-width="5" stroke-linecap="round"/>`,
  `<path d="M28 62a22 24 0 0 1 44 0z" fill="${a}"/><rect x="26" y="60" width="48" height="12" rx="6" fill="${b}"/><circle cx="50" cy="34" r="7" fill="${b}"/><path d="M40 46v12M50 42v16M60 46v12" stroke="${d}" stroke-width="2" opacity=".6"/>`,
  `<rect x="40" y="40" width="20" height="38" rx="5" fill="${a}"/><path d="M50 22c6 8 6 12 0 16-6-4-6-8 0-16z" fill="${b}"/><path d="M50 34v6" stroke="${COL.cocoa}" stroke-width="2"/>`,
  `<path d="M24 50l26-22 26 22v26H24z" fill="${a}"/><path d="M20 52l30-26 30 26" fill="none" stroke="${b}" stroke-width="5" stroke-linejoin="round"/><rect x="44" y="58" width="12" height="18" rx="2" fill="${b}"/><rect x="30" y="54" width="9" height="9" rx="2" fill="${COL.snow}"/>`,
  `<circle cx="50" cy="44" r="22" fill="${COL.snow}" stroke="${a}" stroke-width="4"/><path d="M38 52l12-14 12 14z" fill="${a}"/><rect x="32" y="66" width="36" height="10" rx="4" fill="${b}"/><circle cx="42" cy="34" r="2" fill="${COL.mist}"/><circle cx="58" cy="40" r="2" fill="${COL.mist}"/>`,
  `<path d="M30 34h40v12H30z" fill="${a}"/><path d="M56 44v30l8-4 4 4V44" fill="${a}"/><path d="M36 34v12M46 34v12M58 34v12" stroke="${b}" stroke-width="3"/>`,
  `<path d="M42 30h16l4 8H38z" fill="${a}"/><rect x="38" y="38" width="24" height="32" rx="5" fill="none" stroke="${a}" stroke-width="4"/><path d="M50 46c4 6 4 10 0 14-4-4-4-8 0-14z" fill="${b}"/><path d="M44 22a6 6 0 0 1 12 0" stroke="${a}" stroke-width="3" fill="none"/><rect x="36" y="70" width="28" height="6" rx="3" fill="${a}"/>`,
  `<ellipse cx="50" cy="52" rx="16" ry="24" fill="${a}"/><path d="M38 40q12 6 24 0M36 52q14 6 28 0M38 64q12 6 24 0" stroke="${b}" stroke-width="3" fill="none"/><path d="M50 28v-8" stroke="${COL.taupe}" stroke-width="4" stroke-linecap="round"/>`,
  `<path d="M34 28h20v26l14 6a6 6 0 0 1-2 12H34z" fill="${a}"/><path d="M28 78h46" stroke="${COL.stone}" stroke-width="4" stroke-linecap="round"/><path d="M38 36h12M38 44h12" stroke="${b}" stroke-width="3"/>`,
  `<path d="M30 46h40v12a20 18 0 0 1-40 0z" fill="${a}"/><path d="M70 50h6a6 6 0 0 1 0 12h-6" fill="none" stroke="${a}" stroke-width="4"/><path d="M30 50l-8-8" stroke="${a}" stroke-width="4" stroke-linecap="round"/><rect x="44" y="38" width="12" height="8" rx="3" fill="${b}"/>`,
  `<path d="M50 20l8 20 22 2-17 14 6 22-19-12-19 12 6-22-17-14 22-2z" fill="${a}"/><circle cx="50" cy="50" r="6" fill="${b}"/>`,
  `<rect x="22" y="30" width="56" height="48" rx="6" fill="${a}"/><rect x="32" y="44" width="36" height="34" rx="16" fill="${COL.cocoa}"/><path d="M50 74c10-4 10-14 2-22 0 8-8 8-8 14 0 4 2 6 6 8z" fill="${COL.blush}"/><rect x="18" y="26" width="64" height="8" rx="3" fill="${b}"/>`
 ];
 return `<svg class="stk" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="${COL.snow}"/><circle cx="50" cy="50" r="46" fill="none" stroke="${b}" stroke-width="4" stroke-dasharray="2 6" stroke-linecap="round"/>${S_[sh]}</svg>`;}
function allSteps(){const out=[];Object.keys(CHAPTERS_DATA).map(Number).sort((a,b)=>a-b).forEach(ch=>CHAPTERS_DATA[ch].topics.forEach(t=>t.steps.forEach((s,i)=>out.push({ch,topic:t.id,i,key:t.id+'-'+i,title:s.t}))));return out;}
function renderStickers(){const st=allSteps().map((s,i)=>({...s,idx:i}));const earned=st.filter(s=>S.stk[s.key]).length;
 let h=`<div class="thead"><div class="eyebrow">My collection</div><h2>Sticker board</h2><p class="meta">Every step you complete earns a new winter sticker. ${earned} of ${st.length} collected so far.</p></div>`;
 Object.keys(CHAPTERS_DATA).map(Number).forEach(n=>{const steps=st.filter(s=>s.ch===n);const got=steps.filter(s=>S.stk[s.key]).length;
  h+=`<section class="card"><h3 class="lgh">${chName(n)} · ${CHAPTERS_DATA[n].title}<span class="cnt">${got} / ${steps.length}</span></h3><div class="sgrid">${steps.map(s=>{const on=!!S.stk[s.key];const info=stickerInfo(s.idx);const rot=((s.idx*37)%15)-7;
   return on?`<figure class="slotS on" title="${esc(s.title)}"><div style="transform:rotate(${rot}deg)">${stickerSVG(s.idx,92)}</div><figcaption>${info.name}</figcaption></figure>`:`<figure class="slotS" title="Complete: ${esc(s.title)}"><div class="empty-slot"><span>${/\.0$/.test(s.topic)?'warm-up':s.topic}<br>step ${s.i+1}</span></div><figcaption>&nbsp;</figcaption></figure>`;}).join('')}</div></section>`;});
 return h;}
function awardSticker(key){const st=allSteps();const idx=st.findIndex(s=>s.key===key);if(idx<0)return;const info=stickerInfo(idx);
 toast(`<div class="stkwin">${stickerSVG(idx,64)}<div><b>New sticker!</b><br>${info.name}<br><span style="font-size:13px;opacity:.85">Added to your Sticker board</span></div></div>`,'big');}

/* =================== STUDY LATER =================== */
function renderLater(){const items=Object.entries(S.later).map(([k,v])=>({k,...v})).sort((a,b)=>a.ch-b.ch||String(a.topic).localeCompare(String(b.topic),undefined,{numeric:true})||a.i-b.i);
 let h=`<div class="thead"><div class="eyebrow">My list</div><h2>Study later</h2><p class="meta">Steps you marked to come back to. Tap a step to jump straight to it. When you feel confident, tap "Got it now" to clear it.</p></div>`;
 if(!items.length)return h+`<div class="card empty"><svg viewBox="0 0 100 100" width="110" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="${COL.blush}" opacity=".5"/><path d="M38 24h24v52l-12-9-12 9z" fill="${COL.rose}"/></svg><h3>Nothing marked yet</h3><p>On any step, tap "Study again later" and it will appear here.</p></div>`;
 const chs=[...new Set(items.map(i=>i.ch))];
 chs.forEach(ch=>{const D=CHAPTERS_DATA[ch];h+=`<section><h3 class="lgh">${chName(ch)} · ${D?D.title:''}</h3><div class="lgrid">${items.filter(i=>i.ch===ch).map(it=>{const t=D&&D.topics.find(x=>x.id===it.topic);const s=t&&t.steps[it.i];
  return `<div class="card litem"><div class="eyebrow">${/\.0$/.test(it.topic)?'Warm-up':'Topic '+it.topic} · Step ${it.i+1}</div><b class="ltitle">${s?s.t:esc(it.t||'')}</b><span class="tiny">${t?t.title:''}</span><div class="row"><button class="btn primary" data-goto="${it.k}" data-goch="${ch}">Study this step →</button><button class="btn" data-unlater="${it.k}">Got it now</button></div></div>`}).join('')}</div></section>`;});
 return h;}

/* =================== TIMES TABLE (up to 100 × 100) =================== */
const tkey=(a,b)=>a+'x'+b;
let TTsel=null;
function renderTimes(){const nm=Object.keys(T.marks).length;
 let h=`<div class="thead"><div class="eyebrow">Practice any time</div><h2>Times table</h2><p class="meta">The full times table up to 100 × 100. Tap any answer to see it big, then mark the ones you find tricky. Your tricky ones are saved and collected in "My tricky ones".</p></div>
 <div class="ttabs" role="tablist"><button class="btn" role="tab" data-tt="grid" aria-pressed="${T.tab==='grid'}">Whole table</button><button class="btn" role="tab" data-tt="one" aria-pressed="${T.tab==='one'}">One times table</button><button class="btn" role="tab" data-tt="tricky" aria-pressed="${T.tab==='tricky'}">My tricky ones <span class="m">(${nm})</span></button></div>`;
 if(T.tab==='grid'){h+=`<div class="card"><div class="ttinfo"><div><div class="ttbig" id="ttBig">${TTsel?`${TTsel[0]} × ${TTsel[1]} = ${TTsel[0]*TTsel[1]}`:'Tap an answer'}</div><div class="tiny" id="ttHint">${TTsel?'':'The row and column light up so you can see where it comes from.'}</div></div>
  <div class="row"><button class="btn" id="ttMark" ${TTsel?'':'disabled'}>${TTsel&&T.marks[tkey(...TTsel)]?'★ Marked as tricky':'☆ Mark as tricky'}</button></div></div>
  <div class="row"><span class="tiny">Jump to</span><input class="field" id="ttR" type="number" min="1" max="100" placeholder="row" style="width:90px" inputmode="numeric"><span>×</span><input class="field" id="ttC" type="number" min="1" max="100" placeholder="column" style="width:100px" inputmode="numeric"><button class="btn" id="ttJump">Go</button></div>
  <div class="ttscroll" id="ttScroll"><table class="tt" id="ttTable"></table></div></div>`;}
 else if(T.tab==='one'){const n=T.one;h+=`<div class="card"><div class="row" style="justify-content:space-between"><div class="stepper"><button class="btn iconbtn" data-one="-1" aria-label="Previous times table">−</button><span class="ttbig">${n} times table</span><button class="btn iconbtn" data-one="1" aria-label="Next times table">+</button></div>
  <div class="row"><input class="field" id="oneN" type="number" min="1" max="100" value="${n}" style="width:90px" inputmode="numeric"><button class="btn" id="oneGo">Show</button><button class="btn" id="oneHide" aria-pressed="${T.hide}">${T.hide?'Show answers':'Hide answers to test myself'}</button></div></div>
  <div class="ttgrid scrolly">${Array.from({length:100},(_,i)=>{const b=i+1,k=tkey(n,b),mk=!!T.marks[k];return `<div class="tcell ${mk?'mk':''}"><span class="eq">${n} × ${b} = <span class="ansv ${T.hide?'hide':''}" data-showans>${n*b}</span></span><button class="star" data-star="${k}" aria-pressed="${mk}" aria-label="${mk?'Unmark':'Mark'} ${n} times ${b} as tricky">${mk?'★':'☆'}</button></div>`}).join('')}</div></div>`;}
 else{const list=Object.keys(T.marks).map(k=>k.split('x').map(Number)).sort((x,y)=>x[0]-y[0]||x[1]-y[1]);
  if(!list.length)h+=`<div class="card empty"><h3>No tricky ones yet</h3><p>In the whole table or one times table, tap ☆ on any fact you find hard. It will show up here so you can practise it.</p></div>`;
  else{if(!T.fc||!T.fc.order||T.fc.order.some(k=>!T.marks[k]))T.fc={order:shuffle(Object.keys(T.marks)),pos:0,show:false};const k=T.fc.order[T.fc.pos%T.fc.order.length];const [a,b]=k.split('x').map(Number);
   h+=`<div class="card"><div class="kicker">Flashcard ${T.fc.pos%T.fc.order.length+1} of ${T.fc.order.length}</div><div class="flash">${a} × ${b} = ${T.fc.show?`<span class="fadein" style="color:${COL.rose}">${a*b}</span>`:'?'}</div>
    <div class="row" style="justify-content:center">${T.fc.show?`<button class="btn" id="fcKeep">Still tricky</button><button class="btn primary" id="fcGot">Got it now</button>`:`<button class="btn primary" id="fcShow">Show the answer</button>`}</div></div>
    <div class="card"><div class="kicker">All my tricky ones</div><div class="ttgrid">${list.map(([a,b])=>`<div class="tcell mk"><span class="eq">${a} × ${b} = <b>${a*b}</b></span><button class="star" data-star="${tkey(a,b)}" aria-pressed="true" aria-label="Remove ${a} times ${b} from tricky ones">★</button></div>`).join('')}</div></div>`;}}
 return h;}
function buildTimesGrid(){const tb=$('#ttTable');if(!tb)return;let h='<thead><tr><th>×</th>';for(let c=1;c<=100;c++)h+=`<th data-c="${c}">${c}</th>`;h+='</tr></thead><tbody>';
 for(let r=1;r<=100;r++){h+=`<tr><th data-r="${r}">${r}</th>`;for(let c=1;c<=100;c++)h+=`<td data-a="${r}" data-b="${c}"${T.marks[tkey(r,c)]?' class="mk"':''}>${r*c}</td>`;h+='</tr>';}
 tb.innerHTML=h+'</tbody>';if(TTsel)selectCell(...TTsel,false);}
function selectCell(a,b,scroll=true){TTsel=[a,b];const tb=$('#ttTable');if(!tb)return;
 $$('.hl,.sel',tb).forEach(e=>e.classList.remove('hl','sel'));
 const rowEl=tb.tBodies[0].rows[a-1];$$('td,th',rowEl).forEach(e=>e.classList.add('hl'));
 for(const tr of tb.tBodies[0].rows)tr.cells[b].classList.add('hl');tb.tHead.rows[0].cells[b].classList.add('hl');
 const cell=rowEl.cells[b];cell.classList.remove('hl');cell.classList.add('sel');
 $('#ttBig').textContent=`${a} × ${b} = ${a*b}`;$('#ttHint').textContent=`Row ${a}, column ${b}.`;const mb=$('#ttMark');mb.disabled=false;mb.textContent=T.marks[tkey(a,b)]?'★ Marked as tricky':'☆ Mark as tricky';
 if(scroll){const sc=$('#ttScroll');sc.scrollTo({left:Math.max(0,cell.offsetLeft-sc.clientWidth/2+30),top:Math.max(0,cell.offsetTop-sc.clientHeight/2+20),behavior:reduceMotion?'auto':'smooth'});}}

/* =================== CHAPTER DROPDOWN =================== */
function renderDropdown(){const nl=Object.keys(S.later).length,ns=Object.keys(S.stk).length,nt=Object.keys(T.marks).length;
 $('#ddK').textContent=S.view==='chapter'?`${chName(CUR)}`:(CUR===0?'Last page: Foundations':`Last chapter: ${CUR}`);$('#ddT').textContent=CHD.title;
 $('#ddMenu').innerHTML=`<div class="ddsec">Before Chapter 1</div><button class="ddopt" role="option" data-ch="0" aria-selected="${S.view==='chapter'&&CUR===0}"><span class="n">★</span><span class="t">Foundations<br><span class="s">Basic division · Multiplying negative numbers · Games</span></span></button><div class="ddsep"></div><div class="ddsec">Chapters</div>`+BOOK_CHAPTERS.map(([n,t])=>{const ready=!!CHAPTERS_DATA[n];const sel=S.view==='chapter'&&CUR===n;
  return `<button class="ddopt" role="option" data-ch="${n}" aria-selected="${sel}" ${ready?'':'disabled'}><span class="n">${n}</span><span class="t">${t}<br><span class="s">${ready?CHAPTERS_DATA[n].topics.filter(x=>!/\.0$/.test(x.id)).map(x=>x.id).join(' · '):'Coming soon'}</span></span></button>`}).join('');
 $('#hbT').textContent=nt||'';$('#hbL').textContent=nl||'';$('#hbS').textContent=ns||'';
 $$('.hnav [data-page]').forEach(b=>b.setAttribute('aria-current',S.view===b.dataset.page?'page':'false'));
 $('#resetBtn').hidden=S.view!=='chapter';}
function openDD(o){const m=$('#ddMenu'),b=$('#ddBtn');m.hidden=!o;b.setAttribute('aria-expanded',o);if(o){const s=$('.ddopt[aria-selected="true"]',m);if(s)s.scrollIntoView({block:'nearest'});}}

/* =================== MAIN RENDER =================== */
const DEFAULT_LEAD="Go one small step at a time. Each step ends with a quick check, and the next step opens once you've answered it. Your progress is saved to your Study Hub, so it follows you to any device.";
function render(){renderDropdown();
 const ch=$('#chead'),pills=$('#pills');
 if(S.view==='chapter'){ch.hidden=false;pills.hidden=false;$('#chEyebrow').textContent=`${chName(CUR)}`;$('#chTitle').textContent=CHD.title;$('#chLead').hidden=false;$('#chLead').textContent=CHD.lead||DEFAULT_LEAD;renderPills();
  const sec=S.sec[CUR];const t=TOPICS.find(x=>x.id===sec);
  $('#view').innerHTML=t?renderTopic(t):sec==='cards'?renderCards():sec==='cyp'?renderCyp():sec==='quiz'?renderQuiz():sec==='games'?renderGames():renderPapers();}
 else{ch.hidden=true;pills.hidden=true;const pct=chapterPct();$('#ringArc').setAttribute('stroke-dasharray',`${(pct/100*100.5).toFixed(1)} 100.5`);$('#ringTxt').textContent=pct+'%';
  $('#view').innerHTML=backBar()+(S.view==='later'?renderLater():S.view==='stickers'?renderStickers():renderTimes());if(S.view==='times'&&T.tab==='grid')buildTimesGrid();}
 initVisuals($('#view'));}
function secLabel(ch,sec){const D=CHAPTERS_DATA[ch];if(!D)return '';const t=D.topics.find(x=>x.id===sec);if(t)return (/\.0$/.test(t.id)?'':t.id+' ')+t.title;return {cards:'Key word cards',cyp:'Check your progress',quiz:'Mixed quiz',papers:'Past papers'}[sec]||'';}
function backBar(){const ch=CUR,sec=S.sec[ch]||TOPICS[0].id;return `<div class="backbar"><button class="btn primary" data-back><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Back to where I left off</button><span class="tiny">${chName(ch)} · ${secLabel(ch,sec)}</span></div>`;}
function enterAnim(){['#chead','#pills','#view'].forEach(s=>{const el=$(s);if(!el)return;el.classList.remove('enter');void el.offsetWidth;el.classList.add('enter');});}

/* =================== FONTS =================== */
const FONTS=[['Classic','Fraunces','Atkinson Hyperlegible'],['Clear','Lexend','Lexend'],['Rounded','Nunito','Nunito'],['Playful','Fredoka','Quicksand'],['Cinema','Playfair Display','Figtree'],['Modern','Figtree','Figtree']];
function applyFont(){document.body.dataset.font=P.font||0;}
applyFont();
(function fontMenu(){const menu=$('#fontMenu');menu.innerHTML=`<div class="kicker">Choose a font</div>`+FONTS.map((f,i)=>`<button class="fontopt" data-font="${i}" aria-pressed="${(P.font||0)===i}"><span style="font-family:'${f[1]}';font-weight:700;font-size:19px">${f[0]}</span><span style="font-family:'${f[2]}';font-size:14px" class="tiny">${f[1]}${f[2]!==f[1]?' + '+f[2]:''} · 6.5 × 10⁵ = 650 000</span></button>`).join('');})();

/* =================== SCIENTIFIC CALCULATOR =================== */
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
(function notes(){
 let N={html:'',open:false,x:null,y:null,calc:false};try{Object.assign(N,JSON.parse(localStorage.getItem(NKEY)||'{}'));}catch(e){}
 const saveN=()=>{try{localStorage.setItem(NKEY,JSON.stringify(N));}catch(e){}};
 const fab=document.createElement('button');fab.className='fab';fab.id='notesFab';fab.setAttribute('aria-label','Open my notes and calculator');fab.title='My notes and calculator';
 fab.innerHTML=`<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M5 3h10l4 4v14H5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10h8M8 14h8M8 18h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
 const pn=document.createElement('section');pn.className='notes';pn.id='notesPanel';pn.hidden=true;pn.setAttribute('role','dialog');pn.setAttribute('aria-label','My notes');
 pn.innerHTML=`<div class="nhead" id="nDrag"><b>My notes</b><span class="tiny" id="nStatus">Saved</span><span class="spacer"></span>
  <button class="nbtn" id="nCalc" aria-pressed="false" title="Show the calculator"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2M16 12v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Calculator</button>
  <button class="nbtn" id="nExport" title="Export as a Word document"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Export</button>
  <button class="nbtn" id="nMin" title="Minimize" aria-label="Minimize notes"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></button></div>
  ${calcHtml()}
  <div class="ntools" role="toolbar" aria-label="Formatting">
   <button data-cmd="bold" title="Bold"><b>B</b></button><button data-cmd="italic" title="Italic"><i>I</i></button><button data-cmd="underline" title="Underline"><u>U</u></button>
   <button data-cmd="h3" title="Heading">H</button><button data-cmd="insertUnorderedList" title="Bullet list">• List</button><button data-cmd="insertOrderedList" title="Numbered list">1. List</button>
   <button data-cmd="sup" title="Raise the selected text, for powers like 10²">x²</button><button data-cmd="tag" title="Add a heading for the chapter you're on">+ Chapter heading</button></div>
  <div class="ned" id="nEd" contenteditable="true" spellcheck="true" aria-label="Notes text" data-ph="Write your own notes here. They stay the same in every chapter."></div>`;
 document.body.append(fab,pn);
 const ed=$('#nEd');ed.innerHTML=N.html||'';
 const place=()=>{if(N.x!=null&&innerWidth>700){pn.style.left=Math.min(Math.max(8,N.x),innerWidth-pn.offsetWidth-8)+'px';pn.style.top=Math.min(Math.max(8,N.y),innerHeight-80)+'px';pn.style.right='auto';pn.style.bottom='auto';}};
 const show=o=>{N.open=o;pn.hidden=!o;fab.hidden=o;saveN();if(o){place();if(!N.calc)ed.focus();}};
 fab.onclick=()=>show(true);$('#nMin').onclick=()=>show(false);
 let tm=null;ed.addEventListener('input',()=>{$('#nStatus').textContent='Saving…';clearTimeout(tm);tm=setTimeout(()=>{N.html=ed.innerHTML;saveN();$('#nStatus').textContent='Saved';},400);});
 $$('.ntools button',pn).forEach(b=>{b.addEventListener('mousedown',e=>e.preventDefault());b.onclick=()=>{const c=b.dataset.cmd;ed.focus();
  if(c==='h3'){const cur=document.queryCommandValue('formatBlock').toLowerCase();document.execCommand('formatBlock',false,cur==='h3'?'div':'h3');}
  else if(c==='sup')document.execCommand('superscript',false,null);
  else if(c==='tag'){const label=S.view==='chapter'?`${chName(CUR)}: ${CHD.title}`:S.view==='times'?'Times table':'General notes';const sel=getSelection();const r=document.createRange();r.selectNodeContents(ed);r.collapse(false);sel.removeAllRanges();sel.addRange(r);document.execCommand('insertHTML',false,`<h3>${esc(label)}</h3><div><br></div>`);}
  else document.execCommand(c,false,null);ed.dispatchEvent(new Event('input'));};});
 // calculator
 const calc=$('#calc'),cb=$('#nCalc');let expr='',ans=0,deg=true,last=null;
 const showCalc=o=>{N.calc=o;calc.hidden=!o;cb.setAttribute('aria-pressed',o);saveN();};
 cb.onclick=()=>showCalc(!N.calc);showCalc(!!N.calc);
 const upd=(res)=>{$('#cExp').textContent=expr||' ';if(res!=null)$('#cRes').textContent=res;else{try{$('#cRes').textContent=expr?Calc.run(expr,ans,deg):'0';$('#cRes').style.opacity=.55;}catch(e){$('#cRes').style.opacity=.55;}}};
 const doEq=()=>{if(!expr)return;try{const v=Calc.num(expr,ans,deg);const r=Calc.fmt(v);last={expr,r};if(isFinite(v))ans=v;$('#cRes').style.opacity=1;upd(r);expr='';}catch(e){$('#cRes').style.opacity=1;upd('Syntax error');}};
 calc.addEventListener('click',e=>{const b=e.target.closest('[data-ck]');if(!b)return;const k=b.dataset.ck;
  if(k==='ac'){expr='';last=null;$('#cRes').style.opacity=1;upd('0');return;}
  if(k==='del'){expr=expr.replace(/(sin\(|cos\(|tan\(|log\(|ln\(|√\(|∛\(|×10\^\(|Ans|\^\(−1\)|.)$/,'');upd();return;}
  if(k==='='){doEq();return;}
  if(!expr&&last&&/^[+×÷^²−]/.test(k)&&k!=='−'){expr='Ans';}
  expr+=k;upd();});
 $('#cDeg').onclick=()=>{deg=!deg;$('#cDeg').textContent=deg?'DEG':'RAD';$('#cDeg').setAttribute('aria-pressed',deg);upd();};
 calc.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doEq();}});
 $('#cIns').onclick=()=>{const txt=last?`${last.expr} = ${last.r}`:($('#cRes').textContent||'');if(!txt.trim())return;const sel=getSelection();const r=document.createRange();r.selectNodeContents(ed);r.collapse(false);sel.removeAllRanges();sel.addRange(r);document.execCommand('insertHTML',false,`<div>${esc(txt)}</div>`);ed.dispatchEvent(new Event('input'));};
 // drag
 let d=null;$('#nDrag').addEventListener('pointerdown',e=>{if(e.target.closest('button')||innerWidth<=700)return;const r=pn.getBoundingClientRect();d=[e.clientX-r.left,e.clientY-r.top];$('#nDrag').setPointerCapture(e.pointerId);});
 $('#nDrag').addEventListener('pointermove',e=>{if(!d)return;N.x=e.clientX-d[0];N.y=e.clientY-d[1];place();});
 $('#nDrag').addEventListener('pointerup',()=>{if(d){d=null;saveN();}});
 // export to Word
 const loadDocx=()=>window.docx?Promise.resolve():new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js';s.onload=res;s.onerror=()=>rej(new Error('load'));document.head.appendChild(s);});
 $('#nExport').onclick=async()=>{const st=$('#nStatus');N.html=ed.innerHTML;saveN();
  if(!ed.textContent.trim()){st.textContent='Write something first, then export.';return;}
  st.textContent='Preparing your document…';
  try{await loadDocx();}catch(e){st.textContent='Could not load the Word export tool. Check the internet connection.';return;}
  const D=window.docx;let inst=0;
  const runs=(node,f,out)=>{if(node.nodeType===3){if(node.textContent)out.push(new D.TextRun({text:node.textContent,bold:f.b,italics:f.i,underline:f.u?{}:undefined,superScript:f.sup}));return;}
   if(node.nodeType!==1)return;const t=node.tagName;if(t==='BR'){out.push(new D.TextRun({text:'',break:1}));return;}
   const g={...f};const sw=node.style||{};if(t==='B'||t==='STRONG'||sw.fontWeight==='bold'||+sw.fontWeight>=600)g.b=true;if(t==='I'||t==='EM'||sw.fontStyle==='italic')g.i=true;if(t==='U'||(sw.textDecoration||'').includes('underline'))g.u=true;if(t==='SUP')g.sup=true;
   node.childNodes.forEach(c=>runs(c,g,out));};
  const blocks=root=>{const ps=[];let inl=[];const flush=()=>{if(inl.length){ps.push(new D.Paragraph({children:inl,spacing:{after:120}}));inl=[];}};
   root.childNodes.forEach(n=>{if(n.nodeType===1&&/^(P|DIV|H1|H2|H3|H4|UL|OL|BLOCKQUOTE)$/.test(n.tagName)){flush();const t=n.tagName;
     if(t==='UL'||t==='OL'){const k=inst++;[...n.children].forEach(li=>{const r=[];runs(li,{},r);ps.push(new D.Paragraph(t==='UL'?{children:r,bullet:{level:0}}:{children:r,numbering:{reference:'num',level:0,instance:k}}));});}
     else if(/^H/.test(t)){const r=[];runs(n,{},r);ps.push(new D.Paragraph({children:r,heading:D.HeadingLevel.HEADING_2,spacing:{before:240,after:120}}));}
     else if([...n.children].some(c=>/^(UL|OL|H1|H2|H3|DIV|P)$/.test(c.tagName)))blocks(n).forEach(p=>ps.push(p));
     else{const r=[];runs(n,{},r);ps.push(new D.Paragraph({children:r,spacing:{after:120}}));}}
    else{const r=[];runs(n,{},r);inl.push(...r);}});flush();return ps;};
  try{const doc=new D.Document({creator:'Sofia Magdy',title:'Maths notes',
    numbering:{config:[{reference:'num',levels:[{level:0,format:D.LevelFormat.DECIMAL,text:'%1.',alignment:D.AlignmentType.START,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},
    styles:{default:{document:{run:{font:'Calibri',size:24}}}},
    sections:[{children:[new D.Paragraph({text:"Sofia Magdy's Maths Notes",heading:D.HeadingLevel.TITLE}),new D.Paragraph({children:[new D.TextRun({text:'Cambridge Lower Secondary Mathematics 9 · exported '+new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'}),italics:true,color:'615756'})],spacing:{after:240}}),...blocks(ed)]}]});
   const blob=await D.Packer.toBlob(doc);const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='Sofia maths notes.docx';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);st.textContent='Exported.';
  }catch(err){st.textContent='Could not export the notes. Please try again.';}};
 if(N.open)show(true);
})();

/* =================== RESET =================== */
function closeReset(){$('#resetPanel').hidden=true;$('#resetBtn').setAttribute('aria-expanded','false');}
function renderReset(stage){const p=$('#resetPanel');const sec=S.sec[CUR];const t=TOPICS.find(x=>x.id===sec);const lbl=secLabel(CUR,sec);
 if(stage==='chapter'){p.innerHTML=`<b>Reset all of ${chName(CUR)}?</b><p>This clears every quick check, typed answer, tick, key word card and quiz score in ${chName(CUR)}, and closes its steps again. Your stickers, notes and other chapters are kept.</p><div class="resetopts"><button class="btn primary" data-resetconfirm="chapter">Yes, reset ${chName(CUR)}</button><button class="btn" id="resetNo">Cancel</button></div>`;return;}
 if(stage==='all'){p.innerHTML=`<b>Reset the whole Maths Hub?</b><p>This clears everything in every chapter, on every device that uses this Study Hub, and empties Study later and the Sticker board. Your notes, your tricky times table facts and your font are kept. It can't be undone.</p><div class="resetopts"><button class="btn primary" data-resetconfirm="all">Yes, reset everything</button><button class="btn" id="resetNo">Cancel</button></div>`;return;}
 let what,btn;
 if(t){what=`This clears your quick check answers, typed answers and ticks in ${lbl}, and closes its steps again so you can start the topic fresh. Your stickers stay on your Sticker board.`;btn=`Reset this topic`;}
 else if(sec==='cards'){what=`This clears your "Got it" and "Not yet" marks on the ${chName(CUR)} key word cards.`;btn='Reset the key word cards';}
 else if(sec==='cyp'){what=`This clears your typed answers to the ${chName(CUR)} Check your progress questions.`;btn='Reset Check your progress';}
 else if(sec==='quiz'){what=`This clears your best score and the questions you got wrong in the ${chName(CUR)} mixed quiz.`;btn='Reset the quiz';}
 else{what='There is nothing to reset on this page.';btn='';}
 p.innerHTML=`<b>${btn?btn+'?':'Reset'}</b><p>${what}</p><div class="resetopts">${btn?`<button class="btn primary" data-reset="section">${btn}</button>`:''}<button class="btn" id="resetNo">Cancel</button></div><div class="resetopts"><span class="tiny">Need a bigger reset?</span><button class="linkbtn" data-reset="chapter">Reset all of ${chName(CUR)}</button><button class="linkbtn" data-reset="all">Reset the whole Maths Hub</button></div>`;}
function resetTopic(t){t.steps.forEach((s,i)=>{const k=t.id+'-'+i;delete S.checks[k];delete S.done[k];});t.bq.forEach((q,i)=>delete S.bq[t.id+'-'+i]);t.checklist.forEach((c,i)=>delete S.cl[t.id+'-'+i]);}
function doReset(w){const sec=S.sec[CUR];const t=TOPICS.find(x=>x.id===sec);let msg='';
 if(w==='all'){try{localStorage.removeItem(KEY);}catch(err){}S=DEF();useChapter(1);msg='The Maths Hub has been reset. Fresh start!';}
 else if(w==='chapter'){TOPICS.forEach(resetTopic);KEYWORDS.forEach(k=>delete S.cards[k.id]);CYP.forEach((c,i)=>delete S.bq['c'+CUR+'-cyp-'+i]);delete S.quiz[CUR];QZ=null;S.sec[CUR]=TOPICS[0].id;msg=`${chName(CUR)} has been reset.`;}
 else if(t){resetTopic(t);msg=`${secLabel(CUR,sec)} has been reset.`;}
 else if(sec==='cards'){KEYWORDS.forEach(k=>delete S.cards[k.id]);msg='Key word cards reset.';}
 else if(sec==='cyp'){CYP.forEach((c,i)=>delete S.bq['c'+CUR+'-cyp-'+i]);msg='Check your progress answers cleared.';}
 else if(sec==='quiz'){delete S.quiz[CUR];QZ=null;msg='Quiz score cleared.';}
 save();closeReset();render();window.scrollTo({top:0});if(msg)toast(msg);}

/* =================== EVENTS =================== */
function goView(v){S.view=v;save();openDD(false);render();enterAnim();window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});}
document.addEventListener('click',e=>{
 if(e.target.closest('#ddBtn')){openDD($('#ddMenu').hidden);return;}
 if(!e.target.closest('#dd')&&!$('#ddMenu').hidden)openDD(false);
 const chb=e.target.closest('[data-ch]');if(chb&&!chb.disabled){useChapter(+chb.dataset.ch);goView('chapter');return;}
 const pg=e.target.closest('[data-page]');if(pg){goView(pg.dataset.page);return;}
 if(e.target.closest('#fontBtn')){const m=$('#fontMenu');m.hidden=!m.hidden;$('#fontBtn').setAttribute('aria-expanded',!m.hidden);return;}
 const fo=e.target.closest('.fontopt[data-font]');if(fo){P.font=+fo.dataset.font;saveP();applyFont();$$('.fontopt[data-font]').forEach(b=>b.setAttribute('aria-pressed',b===fo));return;}
 if(!e.target.closest('#fontMenu')&&!$('#fontMenu').hidden){$('#fontMenu').hidden=true;$('#fontBtn').setAttribute('aria-expanded','false');}
 if(e.target.closest('#resetBtn')){const p=$('#resetPanel');if(p.hidden)renderReset();p.hidden=!p.hidden;$('#resetBtn').setAttribute('aria-expanded',!p.hidden);if(!p.hidden)window.scrollTo({top:0,behavior:'smooth'});return;}
 if(e.target.closest('#resetNo')){closeReset();return;}
 const rs=e.target.closest('[data-reset]');if(rs){const w=rs.dataset.reset;if(w==='chapter'||w==='all'){renderReset(w);return;}doReset(w);return;}
 const rc=e.target.closest('[data-resetconfirm]');if(rc){doReset(rc.dataset.resetconfirm);return;}
 if(e.target.closest('[data-back]')){goView('chapter');return;}
 const cc=e.target.closest('[data-clearcheck]');if(cc){const k=cc.dataset.clearcheck;delete S.checks[k];save();const box=cc.closest('.check');const y=box.getBoundingClientRect().top;render();const nb=$(`.check[data-key="${k}"]`);if(nb){window.scrollBy(0,nb.getBoundingClientRect().top-y);const o=$('.opt',nb);if(o)o.focus();}return;}
 const cq=e.target.closest('[data-clearbq]');if(cq){const k=cq.dataset.clearbq;delete S.bq[k];save();const w=cq.closest('.bqi');const ta=$('textarea',w);ta.value='';const an=$('.ans',w);an.hidden=true;const rb=$('[data-rev]',w);rb.textContent='Show the answer';rb.setAttribute('aria-expanded','false');ta.focus();return;}
 const pill=e.target.closest('[data-sec]');if(pill){S.sec[CUR]=pill.dataset.sec;save();render();enterAnim();return;}
 const go=e.target.closest('[data-go]');if(go){S.sec[CUR]=go.dataset.go;save();render();enterAnim();window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});return;}
 const rev=e.target.closest('[data-rev]');if(rev){const bw=rev.closest('.bqi');const n=bw?$('.ans',bw):rev.nextElementSibling;n.hidden=!n.hidden;rev.setAttribute('aria-expanded',!n.hidden);rev.textContent=n.hidden?(rev.closest('.bqi')?'Show the answer':'Think first, then tap to see'):'Hide';if(!n.hidden)n.classList.add('fadein');return;}
 const opt=e.target.closest('.check .opt');if(opt&&!opt.disabled){const box=opt.closest('.check');const key=box.dataset.key;const fresh=!S.stk[key];S.checks[key]=+opt.dataset.i;S.done[key]=1;S.stk[key]=1;save();
  const y=box.getBoundingClientRect().top;render();const nb=$(`.check[data-key="${key}"]`);if(nb)window.scrollBy(0,nb.getBoundingClientRect().top-y);if(fresh)awardSticker(key);return;}
 const lb=e.target.closest('[data-later]');if(lb){const k=lb.dataset.later;
  if(S.later[k]){delete S.later[k];toast('Removed from Study later.');}
  else{const [tid,si]=k.split(/-(?=\d+$)/);const t=TOPICS.find(x=>x.id===tid);S.later[k]={ch:CUR,topic:tid,i:+si,t:t?t.steps[+si].t:''};toast('Saved to Study later. Find it in the menu at the top.');}
  save();lb.outerHTML=laterBtn(k);renderDropdown();return;}
 const un=e.target.closest('[data-unlater]');if(un){delete S.later[un.dataset.unlater];save();render();return;}
 const gt=e.target.closest('[data-goto]');if(gt){const k=gt.dataset.goto;const it=S.later[k];useChapter(+gt.dataset.goch);S.sec[CUR]=it.topic;S.view='chapter';save();render();enterAnim();
  setTimeout(()=>{const el=document.getElementById('st-'+k);if(el)el.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});},80);return;}
 const flip=e.target.closest('[data-flip]');if(flip){flip.classList.toggle('on');return;}
 const mk=e.target.closest('[data-mark]');if(mk){S.cards[mk.dataset.mark]=mk.dataset.v;save();const f=mk.closest('.cardwrap').querySelector('.flip');f.classList.remove('known','unsure');f.classList.add(mk.dataset.v);renderPills();return;}
 if(e.target.closest('#qStart')){startQuiz();render();return;}
 const qa=e.target.closest('[data-qa]');if(qa&&QZ&&QZ.ans==null){QZ.ans=+qa.dataset.qa;const qi=QZ.order[QZ.pos];if(QZ.ans===QUIZ[qi].ans)QZ.score++;else QZ.wrong.push(qi);render();return;}
 if(e.target.closest('#qNext')){QZ.pos++;QZ.ans=null;if(QZ.pos>=QZ.order.length){S.quiz[CUR]={best:Math.max(qb()??0,QZ.score),wrong:QZ.wrong};save();}render();return;}
 // times table
 const tt=e.target.closest('[data-tt]');if(tt){T.tab=tt.dataset.tt;saveT();render();return;}
 const cell=e.target.closest('#ttTable td');if(cell){selectCell(+cell.dataset.a,+cell.dataset.b,false);return;}
 if(e.target.closest('#ttMark')&&TTsel){const k=tkey(...TTsel);if(T.marks[k])delete T.marks[k];else T.marks[k]=1;saveT();const c=$('#ttTable').tBodies[0].rows[TTsel[0]-1].cells[TTsel[1]];c.classList.toggle('mk',!!T.marks[k]);$('#ttMark').textContent=T.marks[k]?'★ Marked as tricky':'☆ Mark as tricky';renderDropdown();$$('[data-tt="tricky"] .m').forEach(m=>m.textContent=`(${Object.keys(T.marks).length})`);return;}
 if(e.target.closest('#ttJump')){const r=Math.round(+$('#ttR').value),c=Math.round(+$('#ttC').value);if(r>=1&&r<=100&&c>=1&&c<=100)selectCell(r,c,true);else toast('Pick a row and a column from 1 to 100.');return;}
 const one=e.target.closest('[data-one]');if(one){T.one=Math.min(100,Math.max(1,T.one+ +one.dataset.one));saveT();render();return;}
 if(e.target.closest('#oneGo')){const n=Math.round(+$('#oneN').value);if(n>=1&&n<=100){T.one=n;saveT();render();}else toast('Pick a number from 1 to 100.');return;}
 if(e.target.closest('#oneHide')){T.hide=!T.hide;saveT();render();return;}
 const sa=e.target.closest('[data-showans]');if(sa&&sa.classList.contains('hide')){sa.classList.remove('hide');return;}
 const star=e.target.closest('[data-star]');if(star){const k=star.dataset.star;if(T.marks[k])delete T.marks[k];else T.marks[k]=1;saveT();T.fc=null;
  if(T.tab==='one'){const on=!!T.marks[k];star.textContent=on?'★':'☆';star.setAttribute('aria-pressed',on);star.closest('.tcell').classList.toggle('mk',on);$$('[data-tt="tricky"] .m').forEach(m=>m.textContent=`(${Object.keys(T.marks).length})`);renderDropdown();}else render();return;}
 if(e.target.closest('#fcShow')){T.fc.show=true;render();return;}
 if(e.target.closest('#fcKeep')){T.fc.pos++;T.fc.show=false;render();return;}
 if(e.target.closest('#fcGot')){const k=T.fc.order[T.fc.pos%T.fc.order.length];delete T.marks[k];saveT();T.fc.order=T.fc.order.filter(x=>x!==k);T.fc.show=false;if(!T.fc.order.length)T.fc=null;toast(`Nice! ${k.replace('x',' × ')} is off your tricky list.`);render();return;}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#ddMenu').hidden){openDD(false);$('#ddBtn').focus();}if(!$('#fontMenu').hidden)$('#fontMenu').hidden=true;}
 if(e.key==='Enter'&&(e.target.id==='ttR'||e.target.id==='ttC'))$('#ttJump').click();if(e.key==='Enter'&&e.target.id==='oneN')$('#oneGo').click();
 if(!$('#ddMenu').hidden&&(e.key==='ArrowDown'||e.key==='ArrowUp')){const o=$$('.ddopt:not(:disabled)',$('#ddMenu'));const i=o.indexOf(document.activeElement);e.preventDefault();(o[(i+(e.key==='ArrowDown'?1:-1)+o.length)%o.length]||o[0]).focus();}});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset&&t.dataset.bq){S.bq[t.dataset.bq]=t.value;save();}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset&&t.dataset.cl){S.cl[t.dataset.cl]=t.checked;save();}});

useChapter(S.ch??1);if(!['chapter','later','stickers','times'].includes(S.view))S.view='chapter';render();enterAnim();
