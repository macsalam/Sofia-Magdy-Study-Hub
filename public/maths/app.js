/* Sofia Magdy's Maths Hub. Storage keys: math9-hub-v1 (progress), math9-prefs (font), math9-notes (notes), math9-times (marked times table facts). */
'use strict';
const KEY='math9-hub-v1',PKEY='math9-prefs',NKEY='math9-notes',TKEY='math9-times';
const DEF=()=>({checks:{},bq:{},cl:{},cards:{},quiz:{},sec:{},ch:1,later:{},view:'chapter'});
let S=DEF();
try{const raw=localStorage.getItem(KEY);if(raw)S=Object.assign(DEF(),JSON.parse(raw));}catch(e){S=DEF();}
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

/* ---------- snowfall ---------- */
(function snow(){const c=$('#snow');if(!c)return;const g=c.getContext('2d');let W,H,F=[];
 function size(){const d=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;c.width=W*d;c.height=H*d;g.setTransform(d,0,0,d,0,0);
  F=Array.from({length:Math.round(Math.min(140,W*H/9000))},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2.4+.8,s:.25+Math.random()*.7,w:Math.random()*6,c:Math.random()<.5?'178,168,167':'208,189,191',a:.35+Math.random()*.45}));}
 size();addEventListener('resize',size);
 function draw(t){g.clearRect(0,0,W,H);for(const f of F){if(!reduceMotion){f.y+=f.s;f.x+=Math.sin(t/1600+f.w)*.35;if(f.y>H+5){f.y=-5;f.x=Math.random()*W;}}
  g.fillStyle=`rgba(${f.c},${f.a})`;g.beginPath();g.arc(f.x,f.y,f.r,0,7);g.fill();}
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

/* =================== VISUALS (redrawn, interactive) =================== */
const COL={snow:'#EFEDEE',mist:'#B2A8A7',stone:'#7D746F',blush:'#D0BDBF',rose:'#B78993',taupe:'#8F7C78',cocoa:'#615756',moss:'#67695E'};
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

/* =================== STATE FOR THE CURRENT CHAPTER =================== */
let CUR=1,TOPICS,KEYWORDS,CYP,QUIZ,CHD,QZ=null;
const qb=()=>S.quiz[CUR]?S.quiz[CUR].best:null;
function useChapter(n){if(!CHAPTERS_DATA[n])n=1;CUR=n;CHD=CHAPTERS_DATA[n];TOPICS=CHD.topics;KEYWORDS=CHD.kw;CYP=CHD.cyp;QUIZ=CHD.quiz;S.ch=n;if(!S.sec[n])S.sec[n]=TOPICS[0].id;QZ=null;}
if(!S.later)S.later={};

/* =================== RENDER: chapter =================== */
const sectionsList=()=>[...TOPICS.map(t=>({id:t.id,label:t.title,num:t.id==='1.0'?'★':t.id})),{id:'cards',label:'Key word cards',num:'Aa'},{id:'cyp',label:'Check your progress',num:'✓'},{id:'quiz',label:'Mixed quiz',num:'?'},{id:'papers',label:'Past papers',num:'P'}];
function topicProg(t){let d=0;t.steps.forEach((s,i)=>{if(S.checks[t.id+'-'+i]!=null)d++;});return d/t.steps.length;}
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
 ${done!=null?fbHtml(done===c.ans,c.why):''}</div>`;}
const laterBtn=k=>{const on=!!S.later[k];return `<button class="laterbtn" data-later="${k}" aria-pressed="${on}"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" fill="${on?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span>${on?'Marked to study later':'Study again later'}</span></button>`;};
function bqHtml(k,p,q,a){return `<div class="bqi"><div class="qh"><span class="pg">${p}</span></div><div class="qt">${q}</div>
 <textarea id="bq-${k}" data-bq="${k}" placeholder="Type your answer here">${esc(S.bq[k]||'')}</textarea>
 <button class="reveal-btn" data-rev aria-expanded="false">Show the answer</button><div class="ans" hidden><span>Answer from the course</span><div>${a}</div></div></div>`;}
function renderTopic(t){
 let firstOpen=t.steps.findIndex((s,i)=>S.checks[t.id+'-'+i]==null);if(firstOpen<0)firstOpen=t.steps.length;
 let h=`<div class="thead"><div class="eyebrow">${t.id==='1.0'?'Before you start':'Topic '+t.id} · ${t.src}</div><h2>${t.title}</h2></div>
 <div class="intro"><div class="card"><div class="kicker">In this topic you will</div><ul class="goals">${t.goals.map(g=>`<li>${g}</li>`).join('')}</ul></div>
 <div class="card hook"><h3>Think about this</h3><p>${t.hook.q}</p><button class="reveal-btn" data-rev aria-expanded="false">Think first, then tap to see</button><p class="reveal-text" hidden>${t.hook.a}</p></div>
 <div class="card big"><h3>The big idea</h3><p>${t.big}</p></div></div>`;
 t.steps.forEach((s,i)=>{if(i>firstOpen)return;const media=s.vis&&VIS[s.vis]?VIS[s.vis]():'';
  h+=`<article class="card step ${s.refresh?'refresh':''}" id="st-${t.id}-${i}"><div class="${media?'split':'txt'}"><div class="body"><div class="stepbar"><span class="sno">Step ${i+1} of ${t.steps.length}</span>${s.refresh?'<span class="rtag">Refresher</span>':''}${laterBtn(t.id+'-'+i)}</div><h3>${s.t}</h3>${s.body}</div>${media?`<div class="media">${media}</div>`:''}</div>${checkHtml(t.id+'-'+i,s.check)}</article>`;});
 if(firstOpen<t.steps.length-1){const left=t.steps.length-firstOpen-1;h+=`<div class="card locked">Answer the quick check above to open step ${firstOpen+2}. ${left} more step${left>1?'s':''} to go in this topic.</div>`;}
 if(firstOpen>=t.steps.length){
  h+=`<div class="card"><div class="kicker">Watch out for these mistakes</div><div class="mist">${t.mistakes.map(m=>`<div class="mrow"><div class="w"><span>Common mistake</span>${m[0]}</div><div class="r"><span>Actually</span>${m[1]}</div></div>`).join('')}</div></div>
  <div class="card"><div class="kicker">Questions from your book</div><p class="meta">Try each question first. Write your answer, then tap to compare it with the course's answer.</p><div class="bq">${t.bq.map((q,i)=>bqHtml(t.id+'-'+i,q.p,q.q,q.a)).join('')}</div></div>`;
  if(t.checklist.length)h+=`<div class="card"><div class="kicker">Can you do these? (the topic's goals)</div><div class="checklist">${t.checklist.map((c,i)=>{const k=t.id+'-'+i;return `<label><input type="checkbox" data-cl="${k}" ${S.cl[k]?'checked':''}> ${c}</label>`}).join('')}</div></div>`;
  const ni=TOPICS.indexOf(t)+1;h+=`<div class="row" style="justify-content:flex-end"><button class="btn primary" data-go="${ni<TOPICS.length?TOPICS[ni].id:'cards'}">${ni<TOPICS.length?'Next: '+(TOPICS[ni].id)+' '+TOPICS[ni].title:'Next: Key word cards'} →</button></div>`;}
 return h;}
function renderCards(){const order=[...KEYWORDS].sort((a,b)=>(S.cards[a.id]==='known')-(S.cards[b.id]==='known'));const known=KEYWORDS.filter(w=>S.cards[w.id]==='known').length;
 return `<div class="thead"><div class="eyebrow">Chapter ${CUR} · Key words</div><h2>Key word cards</h2><p class="meta">Tap a card to flip it, then mark it "Got it" or "Not yet". Cards you haven't got yet move to the front. ${known} of ${KEYWORDS.length} marked as got it.</p></div>
 <div class="cards">${order.map(w=>{const st=S.cards[w.id]||'';return `<div class="cardwrap"><button class="flip ${st}" data-flip aria-label="Flip the card for ${esc(w.t)}"><div class="in"><div class="f"><small>Topic ${w.topic}</small><strong>${w.t}</strong><small>Tap to flip</small></div><div class="b">${w.d}</div></div></button><div class="row" style="justify-content:center"><button class="btn" data-mark="${w.id}" data-v="unsure">Not yet</button><button class="btn" data-mark="${w.id}" data-v="known">Got it</button></div></div>`}).join('')}</div>`;}
function renderCyp(){return `<div class="thead"><div class="eyebrow">Chapter ${CUR} · End of chapter</div><h2>Check your progress</h2><p class="meta">These are the end-of-chapter questions from the book. ${CHD.cypNote}</p></div>
 <div class="card"><div class="bq">${CYP.map((c,i)=>bqHtml('c'+CUR+'-cyp-'+i,'Question '+c.p,c.q,c.a)).join('')}</div></div>`;}
function startQuiz(){const wrong=new Set(S.quiz[CUR]?S.quiz[CUR].wrong:[]);const idx=QUIZ.map((q,i)=>i);QZ={order:[...shuffle(idx.filter(i=>wrong.has(i))),...shuffle(idx.filter(i=>!wrong.has(i)))].slice(0,10),pos:0,score:0,wrong:[],ans:null};}
function renderQuiz(){
 if(!QZ)return `<div class="thead"><div class="eyebrow">Chapter ${CUR} · All topics</div><h2>Mixed quiz</h2><p class="meta">Ten questions from the whole chapter. Questions you got wrong last time come back first.</p></div><div class="card empty"><h3>${qb()!=null?'Best score so far: '+qb()+' / 10':'Ready when you are'}</h3><p>${qb()!=null?'Try again to beat it.':'Finish the topics first for the best result, or jump in now.'}</p><button class="btn primary" id="qStart">Start the quiz</button></div>`;
 if(QZ.pos>=QZ.order.length){const n=QZ.order.length;return `<div class="thead"><h2>Mixed quiz</h2></div><div class="card empty"><div class="score">${QZ.score} / ${n}</div><p>${QZ.score===n?'Perfect score.':QZ.wrong.length+' to review. They will come up first next time.'}</p><button class="btn primary" id="qStart">Play again</button></div>`;}
 const q=QUIZ[QZ.order[QZ.pos]];
 return `<div class="thead"><div class="eyebrow">Question ${QZ.pos+1} of ${QZ.order.length}</div><h2>Mixed quiz</h2></div><div class="qprog"><i style="width:${QZ.pos/QZ.order.length*100}%"></i></div>
 <div class="card"><div class="q" style="font-size:19px;font-weight:700">${q.q}</div><div class="opts">${q.opts.map((o,i)=>{let cls='';if(QZ.ans!=null){if(i===q.ans)cls='right';else if(i===QZ.ans)cls='wrong';}return `<button class="opt ${cls}" data-qa="${i}" ${QZ.ans!=null?'disabled':''}>${o}</button>`}).join('')}</div>
 ${QZ.ans!=null?fbHtml(QZ.ans===q.ans,q.why)+`<button class="btn primary" id="qNext" style="justify-self:end">${QZ.pos+1<QZ.order.length?'Next question':'See my score'} →</button>`:''}</div>`;}
function renderPapers(){return `<div class="thead"><div class="eyebrow">Chapter ${CUR}</div><h2>Past paper questions</h2></div><div class="card empty"><h3>No past paper questions yet</h3><p>Only questions from official Cambridge Lower Secondary Checkpoint Mathematics papers will go here, each tagged to the topic it tests. They'll be added once official papers are shared, from Cambridge's specimen set or from school.</p><p class="tiny">Until then, Check your progress is the best exam-style practice for this chapter.</p></div>`;}

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
function renderStickers(){const st=allSteps().map((s,i)=>({...s,idx:i}));const earned=st.filter(s=>S.checks[s.key]!=null).length;
 let h=`<div class="thead"><div class="eyebrow">My collection</div><h2>Sticker board</h2><p class="meta">Every step you complete earns a new winter sticker. ${earned} of ${st.length} collected so far.</p></div>`;
 Object.keys(CHAPTERS_DATA).map(Number).forEach(n=>{const steps=st.filter(s=>s.ch===n);const got=steps.filter(s=>S.checks[s.key]!=null).length;
  h+=`<section class="card"><h3 class="lgh">Chapter ${n} · ${CHAPTERS_DATA[n].title}<span class="cnt">${got} / ${steps.length}</span></h3><div class="sgrid">${steps.map(s=>{const on=S.checks[s.key]!=null;const info=stickerInfo(s.idx);const rot=((s.idx*37)%15)-7;
   return on?`<figure class="slotS on" title="${esc(s.title)}"><div style="transform:rotate(${rot}deg)">${stickerSVG(s.idx,92)}</div><figcaption>${info.name}</figcaption></figure>`:`<figure class="slotS" title="Complete: ${esc(s.title)}"><div class="empty-slot"><span>${s.topic==='1.0'?'warm-up':s.topic}<br>step ${s.i+1}</span></div><figcaption>&nbsp;</figcaption></figure>`;}).join('')}</div></section>`;});
 return h;}
function awardSticker(key){const st=allSteps();const idx=st.findIndex(s=>s.key===key);if(idx<0)return;const info=stickerInfo(idx);
 toast(`<div class="stkwin">${stickerSVG(idx,64)}<div><b>New sticker!</b><br>${info.name}<br><span style="font-size:13px;opacity:.85">Added to your Sticker board</span></div></div>`,'big');}

/* =================== STUDY LATER =================== */
function renderLater(){const items=Object.entries(S.later).map(([k,v])=>({k,...v})).sort((a,b)=>a.ch-b.ch||String(a.topic).localeCompare(String(b.topic),undefined,{numeric:true})||a.i-b.i);
 let h=`<div class="thead"><div class="eyebrow">My list</div><h2>Study later</h2><p class="meta">Steps you marked to come back to. Tap a step to jump straight to it. When you feel confident, tap "Got it now" to clear it.</p></div>`;
 if(!items.length)return h+`<div class="card empty"><svg viewBox="0 0 100 100" width="110" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="${COL.blush}" opacity=".5"/><path d="M38 24h24v52l-12-9-12 9z" fill="${COL.rose}"/></svg><h3>Nothing marked yet</h3><p>On any step, tap "Study again later" and it will appear here.</p></div>`;
 const chs=[...new Set(items.map(i=>i.ch))];
 chs.forEach(ch=>{const D=CHAPTERS_DATA[ch];h+=`<section><h3 class="lgh">Chapter ${ch} · ${D?D.title:''}</h3><div class="lgrid">${items.filter(i=>i.ch===ch).map(it=>{const t=D&&D.topics.find(x=>x.id===it.topic);const s=t&&t.steps[it.i];
  return `<div class="card litem"><div class="eyebrow">${it.topic==='1.0'?'Warm-up':'Topic '+it.topic} · Step ${it.i+1}</div><b class="ltitle">${s?s.t:esc(it.t||'')}</b><span class="tiny">${t?t.title:''}</span><div class="row"><button class="btn primary" data-goto="${it.k}" data-goch="${ch}">Study this step →</button><button class="btn" data-unlater="${it.k}">Got it now</button></div></div>`}).join('')}</div></section>`;});
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
function renderDropdown(){const nl=Object.keys(S.later).length,ns=allSteps().filter(s=>S.checks[s.key]!=null).length,nt=Object.keys(T.marks).length;
 const kLbl=S.view==='chapter'?`Chapter ${CUR}`:'Page';const tLbl=S.view==='chapter'?CHD.title:S.view==='later'?'Study later':S.view==='stickers'?'Sticker board':'Times table';
 $('#ddK').textContent=kLbl;$('#ddT').textContent=tLbl;
 $('#ddMenu').innerHTML=`<div class="ddsec">Chapters</div>`+BOOK_CHAPTERS.map(([n,t])=>{const ready=!!CHAPTERS_DATA[n];const sel=S.view==='chapter'&&CUR===n;
  return `<button class="ddopt" role="option" data-ch="${n}" aria-selected="${sel}" ${ready?'':'disabled'}><span class="n">${n}</span><span class="t">${t}<br><span class="s">${ready?(()=>{const D=CHAPTERS_DATA[n];return D.topics.filter(x=>x.id.indexOf('.0')<0).map(x=>x.id).join(' · ');})():'Coming soon'}</span></span></button>`}).join('')
 +`<div class="ddsep"></div><div class="ddsec">My pages</div>
  <button class="ddopt" role="option" data-page="times" aria-selected="${S.view==='times'}"><span class="n">×</span><span class="t">Times table<br><span class="s">Up to 100 × 100</span></span><span class="badge">${nt}</span></button>
  <button class="ddopt" role="option" data-page="later" aria-selected="${S.view==='later'}"><span class="n">⚑</span><span class="t">Study later<br><span class="s">Steps you marked</span></span><span class="badge">${nl}</span></button>
  <button class="ddopt" role="option" data-page="stickers" aria-selected="${S.view==='stickers'}"><span class="n">★</span><span class="t">Sticker board<br><span class="s">One sticker per step</span></span><span class="badge">${ns}</span></button>`;}
function openDD(o){const m=$('#ddMenu'),b=$('#ddBtn');m.hidden=!o;b.setAttribute('aria-expanded',o);if(o){const s=$('.ddopt[aria-selected="true"]',m);if(s)s.scrollIntoView({block:'nearest'});}}

/* =================== MAIN RENDER =================== */
function render(){renderDropdown();
 const ch=$('#chead'),pills=$('#pills');
 if(S.view==='chapter'){ch.hidden=false;pills.hidden=false;$('#chEyebrow').textContent=`Chapter ${CUR}`;$('#chTitle').textContent=CHD.title;$('#chLead').hidden=false;renderPills();
  const sec=S.sec[CUR];const t=TOPICS.find(x=>x.id===sec);
  $('#view').innerHTML=t?renderTopic(t):sec==='cards'?renderCards():sec==='cyp'?renderCyp():sec==='quiz'?renderQuiz():renderPapers();}
 else{ch.hidden=true;pills.hidden=true;const pct=chapterPct();$('#ringArc').setAttribute('stroke-dasharray',`${(pct/100*100.5).toFixed(1)} 100.5`);$('#ringTxt').textContent=pct+'%';
  $('#view').innerHTML=S.view==='later'?renderLater():S.view==='stickers'?renderStickers():renderTimes();if(S.view==='times'&&T.tab==='grid')buildTimesGrid();}
 initVisuals($('#view'));}
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
  else if(c==='tag'){const label=S.view==='chapter'?`Chapter ${CUR}: ${CHD.title}`:S.view==='times'?'Times table':'General notes';const sel=getSelection();const r=document.createRange();r.selectNodeContents(ed);r.collapse(false);sel.removeAllRanges();sel.addRange(r);document.execCommand('insertHTML',false,`<h3>${esc(label)}</h3><div><br></div>`);}
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

/* =================== EVENTS =================== */
function goView(v){S.view=v;save();openDD(false);render();enterAnim();window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});}
document.addEventListener('click',e=>{
 if(e.target.closest('#ddBtn')){openDD($('#ddMenu').hidden);return;}
 if(!e.target.closest('#dd')&&!$('#ddMenu').hidden)openDD(false);
 const chb=e.target.closest('[data-ch]');if(chb&&!chb.disabled){useChapter(+chb.dataset.ch);goView('chapter');return;}
 const pg=e.target.closest('[data-page]');if(pg){goView(pg.dataset.page);return;}
 if(e.target.closest('#ttBtn')){goView('times');return;}
 if(e.target.closest('#fontBtn')){const m=$('#fontMenu');m.hidden=!m.hidden;$('#fontBtn').setAttribute('aria-expanded',!m.hidden);return;}
 const fo=e.target.closest('.fontopt[data-font]');if(fo){P.font=+fo.dataset.font;saveP();applyFont();$$('.fontopt[data-font]').forEach(b=>b.setAttribute('aria-pressed',b===fo));return;}
 if(!e.target.closest('#fontMenu')&&!$('#fontMenu').hidden){$('#fontMenu').hidden=true;$('#fontBtn').setAttribute('aria-expanded','false');}
 if(e.target.closest('#resetBtn')){const p=$('#resetPanel');p.hidden=!p.hidden;$('#resetBtn').setAttribute('aria-expanded',!p.hidden);if(!p.hidden)window.scrollTo({top:0,behavior:'smooth'});return;}
 if(e.target.closest('#resetNo')){$('#resetPanel').hidden=true;$('#resetBtn').setAttribute('aria-expanded','false');return;}
 if(e.target.closest('#resetYes')){try{localStorage.removeItem(KEY);}catch(err){}S=DEF();useChapter(1);save();$('#resetPanel').hidden=true;$('#resetBtn').setAttribute('aria-expanded','false');render();window.scrollTo({top:0});toast('The Maths Hub has been reset. Fresh start!');return;}
 const pill=e.target.closest('[data-sec]');if(pill){S.sec[CUR]=pill.dataset.sec;save();render();enterAnim();return;}
 const go=e.target.closest('[data-go]');if(go){S.sec[CUR]=go.dataset.go;save();render();enterAnim();window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});return;}
 const rev=e.target.closest('[data-rev]');if(rev){const n=rev.nextElementSibling;n.hidden=!n.hidden;rev.setAttribute('aria-expanded',!n.hidden);rev.textContent=n.hidden?(rev.closest('.bqi')?'Show the answer':'Think first, then tap to see'):'Hide';if(!n.hidden)n.classList.add('fadein');return;}
 const opt=e.target.closest('.check .opt');if(opt&&!opt.disabled){const box=opt.closest('.check');const key=box.dataset.key;const fresh=S.checks[key]==null;S.checks[key]=+opt.dataset.i;save();
  const y=box.getBoundingClientRect().top;render();const nb=$(`.check[data-key="${key}"]`);if(nb)window.scrollBy(0,nb.getBoundingClientRect().top-y);if(fresh)awardSticker(key);return;}
 const lb=e.target.closest('[data-later]');if(lb){const k=lb.dataset.later;
  if(S.later[k]){delete S.later[k];toast('Removed from Study later.');}
  else{const [tid,si]=k.split(/-(?=\d+$)/);const t=TOPICS.find(x=>x.id===tid);S.later[k]={ch:CUR,topic:tid,i:+si,t:t?t.steps[+si].t:''};toast('Saved to Study later. Find it in the chapter menu.');}
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

useChapter(S.ch||1);if(!['chapter','later','stickers','times'].includes(S.view))S.view='chapter';render();enterAnim();
