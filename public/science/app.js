/* ---------- storage ---------- */
const KEY='sci9-hub-v1';
const DEF=()=>({checks:{},bq:{},cl:{},cards:{},quiz:{},sec:{},ch:1,later:{},view:'chapter'});
let S=DEF();
try{const raw=localStorage.getItem(KEY);if(raw)S=Object.assign(S,JSON.parse(raw));}catch(e){}
/* migrate progress saved by the first version */
if(S.section){S.sec[1]=S.section;delete S.section;}
if(S.quizBest!=null){S.quiz[1]={best:S.quizBest,wrong:S.quizWrong||[]};delete S.quizBest;delete S.quizWrong;}
Object.keys(S.bq).forEach(k=>{if(/^cyp-\d+$/.test(k)){S.bq['c1-'+k]=S.bq[k];delete S.bq[k];}});
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

/* ---------- chapters (names from the book's contents) ---------- */
const CHAPTERS=[
 [1,'Photosynthesis and the carbon cycle',true],[2,'Properties of materials'],[3,'Forces and energy'],[4,'Maintaining life'],
 [5,'Reactivity'],[6,'Sound and space'],[7,'Genes and inheritance'],[8,'Rates of reaction'],[9,'Electricity']];

/* ---------- key words ---------- */
const KEYWORDS1=[
 {id:'photosynthesis',t:'photosynthesis',topic:'1.1',d:'The way plants make food. They use energy from sunlight to turn water and carbon dioxide into glucose and oxygen. The name means "making with light".'},
 {id:'chlorophyll',t:'chlorophyll',topic:'1.1',d:'The green pigment that captures energy from sunlight. It is kept inside chloroplasts in plant cells.'},
 {id:'light intensity',t:'light intensity',topic:'1.1',d:'The amount of light. As light intensity increases, the rate of photosynthesis increases.'},
 {id:'chloroplast',t:'chloroplast',topic:'1.2',d:'The part of a plant cell that contains chlorophyll. Photosynthesis happens inside chloroplasts, and starch is stored there.'},
 {id:'stomata',t:'stomata (stoma)',topic:'1.2',d:'Tiny holes in the lower epidermis of a leaf. They let carbon dioxide diffuse in and oxygen diffuse out. One hole is a stoma.'},
 {id:'fertiliser',t:'fertiliser',topic:'1.2',d:'A substance farmers add to fields. It contains minerals, so crops grow larger and give a higher yield.'},
 {id:'yield',t:'yield',topic:'1.2',d:'The quantity of crop that a farmer harvests.'},
 {id:'carbon cycle',t:'carbon cycle',topic:'1.3',d:'The diagram showing how carbon atoms move between the air, living organisms and fossil fuels: photosynthesis, feeding, respiration, decomposition, fossil fuel formation and combustion.'},
 {id:'combustion',t:'combustion',topic:'1.3',d:'Burning a fuel. When a fossil fuel burns, its carbon combines with oxygen from the air and forms carbon dioxide.'},
 {id:'fossil fuel',t:'fossil fuel',topic:'1.3',d:'Coal, oil or natural gas. Formed over a very long time from dead organisms that were buried and changed by high pressure and heat.'},
 {id:'climate',t:'climate',topic:'1.4',d:'The long-term pattern of temperatures, wind and rainfall on Earth.'},
 {id:'slush',t:'slush',topic:'1.4',d:'Melting ice. Some scientists call the frozen Earth of about 650 million years ago "slushball Earth" because it may not have been completely frozen.'},
 {id:'mass extinction',t:'mass extinction',topic:'1.4',d:'When a very large number of species die out. After the asteroid hit Earth about 67 million years ago, up to three-quarters of all species became extinct.'},
 {id:'meteoroids',t:'meteoroids',topic:'1.4',d:'Objects in space that are smaller than asteroids.'},
 {id:'meteors',t:'meteors',topic:'1.4',d:'Meteoroids that enter Earth\'s atmosphere. Some people call them shooting stars. Most burn up because of heat from friction.'},
 {id:'meteorites',t:'meteorites',topic:'1.4',d:'The parts of meteoroids that reach Earth\'s surface. Around 500 reach the surface each year.'}
];

/* ---------- small helpers for checks ---------- */
const C=(q,opts,ans,why)=>({q,opts,ans,why});

/* ---------- TOPICS ---------- */
const TOPICS1=[
{
 id:'1.1',title:'Photosynthesis',pages:'8–14',
 goals:['Practise using the word equation for photosynthesis.','Learn what photosynthesis is, how it happens and why it is important.'],
 hook:{q:'Picture two pots of young maize (corn) plants. One pot was kept in the light. The other was kept in the dark. What do you think caused the differences between them?',a:'Light. The plants in the light could photosynthesise and make their own food. The plants in the dark could not. By the end of this topic you\'ll know exactly what light does for a plant.'},
 big:'Plants use energy from sunlight to turn water and carbon dioxide into glucose and oxygen.',
 steps:[
  {t:'What the word means',body:`<p><span class="kw">Photo</span> means light. <span class="kw">Synthesis</span> means making. So <b>photosynthesis</b> means "making with light". It is how plants make their food.</p>`,
   check:C('What does "synthesis" mean?',['Making','Breaking down','Light','Breathing'],0,'Synthesis means making. Photo means light. Photosynthesis = making with light.')},
  {t:'Ingredients in, products out',body:`<p>For photosynthesis, a plant needs three things:</p>
   <ul><li><b>water</b>, which it gets from the soil</li><li><b>carbon dioxide</b>, which it gets from the air</li><li><b>energy</b>, which it gets from sunlight</li></ul>
   <p>A green pigment called <span class="kw">chlorophyll</span>, inside some cells in the leaves, captures the energy from sunlight. The plant uses this energy to make water and carbon dioxide react together. Two new substances are made: <b>glucose</b> and <b>oxygen</b>.</p>
   <div class="eq">water + carbon dioxide → glucose + oxygen</div>
   <p class="note">The substances on the left are the <b>reactants</b>. The substances on the right are the <b>products</b>. Photosynthesis happens in the leaves.</p>`,
   vis:'plant',extra:'eqbuilder',
   check:C('Which pair are the reactants in photosynthesis?',['Glucose and oxygen','Water and carbon dioxide','Oxygen and water','Carbon dioxide and glucose'],1,'Reactants go in: water and carbon dioxide. Glucose and oxygen are the products that come out.')},
  {t:'Proving that oxygen is made',body:`<p>Scientists use a water plant (pond weed) for this experiment, because the gas it gives off is easy to collect under water. An upside-down funnel sits over the plant in a beaker of water, with a water-filled test tube on top. The apparatus is left in sunlight for at least a day.</p>
   <p>Bubbles of gas rise from the plant and collect at the top of the tube. To test the gas, a glowing splint (lit, then blown out) is put into the tube. If the gas contains a lot of oxygen, <b>the splint relights</b>.</p>`,
   vis:'funnel',
   check:C('The glowing splint relights. What does this tell you?',['The gas is carbon dioxide','The gas contains a lot of oxygen','The plant is not photosynthesising','The water was too warm'],1,'A glowing splint relights in gas that contains a lot of oxygen. So the plant made oxygen.')},
  {t:'More light, faster photosynthesis',body:`<p>In the book's second experiment, a lamp shines on a water plant in a test tube. You count the bubbles it gives off in one minute, three times at each distance, and work out the <b>mean</b>. Then you move the lamp further away and repeat.</p>
   <p><span class="kw">Light intensity</span> means the amount of light. As the lamp moves further away, the light intensity <b>decreases</b>. As the light intensity <b>increases</b>, the rate of photosynthesis <b>increases</b>, so you count more bubbles.</p>
   <div class="safety"><b>Safety:</b> keep electrical wires, plugs and the lamp away from the water.</div>`,
   vis:'lamp',
   check:C('The lamp is moved further from the plant. What happens?',['Light intensity increases and more bubbles appear','Light intensity decreases and fewer bubbles appear','Nothing changes','The plant starts to make carbon dioxide bubbles'],1,'Further away means less light reaches the plant, so light intensity decreases and the rate of photosynthesis goes down.')},
  {t:'Why photosynthesis matters',body:`<p>There are two big reasons.</p>
   <p><b>1. It provides energy for most other organisms.</b> Plants use sunlight energy to make glucose and other carbohydrates. These carbohydrates contain some of the energy that was in the sunlight. When animals eat, they get energy that was captured by plants. A food chain shows how this energy is passed along. Most of the energy in all the food in the world comes from plants.</p>
   <p><b>2. It provides oxygen for the atmosphere.</b> Oxygen is a waste product of photosynthesis, released from the leaves. Animals and plants need oxygen for respiration. About 20% of the air around us is oxygen.</p>
   <p class="note">When Earth formed, about 4.6 billion years ago, there was almost no oxygen in the air. Scientists think oxygen first began to collect when bacteria began to photosynthesise. Without photosynthesis, no animals could ever have lived on Earth.</p>`,
   vis:'foodchain',
   check:C('A lizard eats a grasshopper. The grasshopper eats grass. Where did the lizard\'s energy first come from?',['The grasshopper\'s muscles','The soil','Sunlight, captured by the grass during photosynthesis','The oxygen in the air'],2,'The grass captured sunlight energy in photosynthesis. That energy passed to the grasshopper, then to the lizard.')}
 ],
 mistakes:[
  ['Plants get their food from the soil.','Plants make their own food (glucose) by photosynthesis. From the soil they get water (and minerals, which you meet in Topic 1.2).'],
  ['Oxygen goes into photosynthesis.','Oxygen comes out. It is a product (a waste product) of photosynthesis. Carbon dioxide and water go in.'],
  ['Sunlight is one of the substances in the equation.','The word equation lists only substances: water + carbon dioxide → glucose + oxygen. Sunlight provides the energy, which chlorophyll captures.']
 ],
 bq:[
  {p:'p. 9',q:'What are the reactants in photosynthesis?',a:'Water and carbon dioxide.'},
  {p:'p. 9',q:'What are the products in photosynthesis?',a:'Glucose and oxygen.'},
  {p:'p. 10',q:'Explain why it was best to use a water plant in the gas-collecting experiment.',a:'The gas the plant releases forms bubbles in the water, so it is easy to collect in the upside-down test tube.'},
  {p:'p. 10',q:'Explain why it was important to leave the apparatus where it would get plenty of sunlight.',a:'The plant needs energy from sunlight to photosynthesise. Without light it would not make oxygen, so no gas would collect.'},
  {p:'p. 12',q:'Copy and complete: As the distance of the lamp from the test tube increases, the light intensity …',a:'… decreases.'},
  {p:'p. 12',q:'Copy and complete: As the light intensity increases, the rate of photosynthesis …',a:'… increases.'},
  {p:'p. 14',q:'Grasshoppers eat grass. A lizard eats a grasshopper. Explain how the lizard relies on photosynthesis to provide it with energy.',a:'Grass uses energy from sunlight to make glucose and other carbohydrates by photosynthesis. The grasshopper gets this energy when it eats the grass. The lizard gets the energy when it eats the grasshopper. Without photosynthesis there would be no energy in the food chain.'},
  {p:'p. 14',q:'Explain one other reason (apart from food) why the lizard could not survive if there were no plants on Earth.',a:'Plants release oxygen into the air during photosynthesis. The lizard needs oxygen for respiration.'}
 ],
 checklist:['I can write the word equation for photosynthesis.','I can explain that photosynthesis is the way that plants make carbohydrates, using energy from light.','I can explain why photosynthesis is important for most life on Earth.','I can collect results carefully, and record them in a chart that I design myself.','I can use my results to make a conclusion.']
},
{
 id:'1.2',title:'More about photosynthesis',pages:'15–23',
 goals:['Find out where photosynthesis happens in plants.','Learn why plants need magnesium and nitrate.'],
 hook:{q:'Think about a whole plant: stems, leaves, flowers and roots. In which parts does photosynthesis happen? Why there, and why not in the other parts?',a:'Mostly in the leaves. Photosynthesis needs chlorophyll, which is kept in chloroplasts, and leaf cells have the most chloroplasts. Cells without chloroplasts, like root cells underground, can\'t photosynthesise.'},
 big:'Photosynthesis happens inside chloroplasts, mostly in leaf cells. Plants need minerals from the soil to make chlorophyll and proteins.',
 steps:[
  {t:'Chloroplasts and chlorophyll',body:`<p>Chlorophyll captures energy from sunlight, and that energy helps water and carbon dioxide react. Chlorophyll is kept inside <span class="kw">chloroplasts</span>, inside plant cells. So photosynthesis happens <b>inside chloroplasts</b>.</p>
   <p>Not all plant cells have chloroplasts, so not all plant cells can photosynthesise. In most plants, the cells in the <b>leaves</b> have the most chloroplasts. The book calls a field of lettuces "a giant carbohydrate factory".</p>`,
   vis:'cell',
   check:C('Where exactly in a plant cell does photosynthesis happen?',['In the nucleus','In the vacuole','Inside the chloroplasts','In the cell wall'],2,'Chlorophyll is kept inside chloroplasts, so that is where photosynthesis happens.')},
  {t:'Saving food for later: starch',body:`<p>On warm, sunny days, plants can make more carbohydrate than they need straight away. They store some for later, for example at night or at a time of year with less sunlight.</p>
   <p>Plants store carbohydrate as <b>starch</b>, inside the chloroplasts in their cells. So one way to check whether a leaf has been photosynthesising is to <b>test it for starch</b>.</p>`,
   check:C('In what form do plants store extra carbohydrate?',['Glucose in the soil','Starch inside the chloroplasts','Oxygen in the air spaces','Protein in the roots'],1,'Extra carbohydrate is stored as starch, inside the chloroplasts.')},
  {t:'The starch test',body:`<p>The book uses the <b>iodine test</b> to find out whether a leaf contains starch. Iodine solution cannot get through cell membranes, so the leaf is boiled first to break the membranes apart. The green colour is then removed with hot ethanol, so the colour change is easy to see. If the leaf contains starch, iodine turns it <b>blue-black</b>.</p>
   <div class="safety"><b>Safety:</b> you are working with hot water, so stand up while you work. Turn off the flame before you use any ethanol. Ethanol is very flammable.</div>
   <p class="note">Put the steps in the right order. Tap the step that comes first, then the next one.</p>`,
   extra:'starchorder',
   check:C('Why must the burner be turned off before the ethanol is used?',['Ethanol stops the iodine working','Ethanol is very flammable','Ethanol needs to stay cold','The leaf would turn blue-black too early'],1,'Ethanol catches light easily, so the flame must be off. The hot water heats the ethanol safely.')},
  {t:'Inside a leaf',body:`<p>Leaves are very thin, so sunlight can easily reach the cells in the middle layers, where most chloroplasts are. Water reaches the cells along the <b>veins</b>. Carbon dioxide diffuses into the leaf from the air through tiny holes called <span class="kw">stomata</span> (one is a <b>stoma</b>), then through the air spaces between the cells.</p>
   <p class="note">Tap each part of the leaf to see what it does.</p>`,
   vis:'leaf',
   check:C('Which layer of the leaf does most of the photosynthesis?',['The waxy layer','The palisade layer','The lower epidermis','The vein'],1,'The palisade layer contains the cells that do most of the photosynthesis. The spongy layer does a small amount.')},
  {t:'Minerals: magnesium and nitrate',body:`<p>Farmers add <span class="kw">fertiliser</span> to make crops grow larger and give a higher <span class="kw">yield</span> (the quantity of crop harvested). Fertilisers contain <b>minerals</b>. Plants need only small quantities, which they take from the soil through their roots. If the soil is short of a mineral, the plant can't reach its full potential.</p>`,
   vis:'minerals',
   after:`<p class="note">Farmers can test the soil to find which minerals are missing in each part of a field. With GPS on their machinery, they can control how much fertiliser goes on each part.</p>`,
   check:C('A plant cannot make enough protein to grow new cells. Which mineral is it most likely short of?',['Magnesium','Nitrate','Oxygen','Starch'],1,'Nitrate contains nitrogen atoms, which the plant needs to turn carbohydrates into proteins.')},
  {t:'Planning an investigation',body:`<p>The book asks you to plan an experiment on how fertiliser affects the growth of <b>duckweed</b>, a tiny plant whose leaves float on water. You could grow it in Petri dishes and measure growth by counting leaves.</p>
   <p>Every plan needs a hypothesis, an <b>independent variable</b> (what you change), a <b>dependent variable</b> (what you measure), and the variables you keep the same. You also need a risk assessment and a prediction.</p>
   <p class="note">Sort each variable for the duckweed experiment.</p>`,
   extra:'variables',
   check:C('In the duckweed experiment, the number of leaves is the…',['Independent variable','Dependent variable','Control variable','Hypothesis'],1,'You measure the number of leaves, so it is the dependent variable. The amount of fertiliser is what you change.')}
 ],
 mistakes:[
  ['Every cell in a plant photosynthesises.','Only cells with chloroplasts can photosynthesise. Leaf cells have the most.'],
  ['Stomata are on the top of the leaf.','In the book\'s leaf diagram, the stomata are tiny holes in the lower epidermis.'],
  ['Magnesium and nitrate do the same job.','Magnesium is needed to make chlorophyll. Nitrate gives nitrogen, which is needed to make proteins (and chlorophyll too).']
 ],
 bq:[
  {p:'p. 18',q:'Iodine cannot get through cell membranes, and boiling breaks them apart. (a) In which part of a cell is starch stored? (b) Explain why the leaf had to be boiled before the starch test could work.',a:'(a) Inside the chloroplasts. (b) Boiling breaks the cell membranes, so the iodine solution can get into the cells and reach the starch.'},
  {p:'p. 18',q:'Suggest why it is a good idea to remove the green colour from the leaf before you add iodine solution.',a:'The green colour would make it hard to see whether the iodine turns blue-black. With the colour removed, the change is easy to see.'},
  {p:'p. 18',q:'If your leaf had green parts and white parts, which parts contained starch? Can you explain why?',a:'The green parts. They contain chlorophyll, so those cells could photosynthesise and make carbohydrate to store as starch. The white parts have no chlorophyll.'},
  {p:'p. 20',q:'The cells inside a leaf use up carbon dioxide when they photosynthesise. Explain how carbon dioxide diffuses into the leaf.',a:'Because the cells use up carbon dioxide, there is less of it inside the leaf than in the air. Carbon dioxide diffuses from the air, where its concentration is higher, through the stomata and air spaces to the cells, where it is lower.'},
  {p:'p. 20',q:'The cells inside a leaf produce oxygen when they photosynthesise. Suggest what happens to this oxygen.',a:'It diffuses out of the leaf through the stomata into the air.'},
  {p:'p. 21',q:'Compare the way plants obtain protein with the way you and other animals obtain protein.',a:'Plants make their own proteins, using carbohydrates from photosynthesis and nitrate from the soil. Animals cannot do this, so they get protein by eating food.'},
  {p:'p. 21',q:'It can be hard, even for an expert, to tell a plant short of magnesium from one short of protein. Suggest why.',a:'Both can cause yellow leaves. Magnesium is needed to make chlorophyll, and nitrogen (from nitrate, which the plant also needs for protein) is also needed to make chlorophyll.'}
 ],
 checklist:['I can explain that photosynthesis happens in chloroplasts, because this is where chlorophyll is found.','I can explain why plants need magnesium and nitrate.','I can suggest a hypothesis, and plan an experiment to test it.','I can make a risk assessment of my experiment, and carry out practical work safely.']
},
{
 id:'1.3',title:'The carbon cycle',pages:'24–33',
 goals:['Find out how carbon atoms move between the air, living organisms and fossil fuels.','Bring together respiration and photosynthesis to see how they affect the amount of carbon dioxide in the atmosphere.'],
 hook:{q:'Imagine you are a carbon atom, part of some carbon dioxide in the air. Are you an element or part of a compound? When a plant uses you in photosynthesis, do you turn into something else, or are you still a carbon atom?',a:'In carbon dioxide you are part of a compound (carbon joined to oxygen). In photosynthesis you stay a carbon atom, but now you are part of a carbohydrate inside the plant. Atoms are not destroyed; they just move into new compounds.'},
 big:'Carbon atoms keep moving between the air, living things and fossil fuels, carried by photosynthesis, feeding, respiration, decomposition and combustion.',
 steps:[
  {t:'Carbon and living things',body:`<p>Carbon is an <b>element</b> with the symbol <b>C</b>. It is a non-metal that occurs naturally in different forms. Diamonds are made of carbon, and the "lead" in a pencil is another form of carbon called <b>graphite</b>.</p>
   <p>Living things can't use carbon as an element. They can only use it as part of a <b>compound</b>. Carbohydrates, proteins and fats all contain carbon.</p>`,
   check:C('The "lead" in a pencil is really…',['Lead metal','Graphite, a form of carbon','Diamond','Charcoal mixed with clay'],1,'Pencil "lead" is graphite, which is a form of the element carbon.')},
  {t:'How carbon gets into living things',body:`<p>Plants take carbon dioxide from the air and use it in photosynthesis to make carbohydrates. So the carbon in plants was once part of the air. Plants then use carbohydrates to make proteins and fats.</p>
   <p>Animals get their carbon by eating plants or other animals. <b>Decomposers</b> get their carbon when they break down waste products from plants and animals.</p>`,
   vis:'cc',ccStage:1,
   check:C('How does carbon get into an animal?',['It breathes in carbon dioxide and uses it','It eats plants or other animals','It absorbs carbon from the soil','It makes carbon in photosynthesis'],1,'Animals get carbon-containing nutrients by feeding on plants or other animals.')},
  {t:'Returning carbon dioxide to the air',body:`<p>A lot of the carbon dioxide that plants take in goes back into the air when plants and animals <b>respire</b>:</p>
   <div class="eq">glucose + oxygen → carbon dioxide + water</div>
   <p>All organisms respire. <b>Plants respire all the time.</b> At night, when they can't photosynthesise, they give out carbon dioxide just as we do. Decomposers respire too, releasing carbon dioxide as they break down waste.</p>`,
   vis:'cc',ccStage:2,
   check:C('When do plants respire?',['Only at night','Only in sunlight','All the time','Never; only animals respire'],2,'Plants respire all the time. At night you notice it because there is no photosynthesis using the carbon dioxide up.')},
  {t:'Testing it: the indicator tubes',body:`<p><b>Hydrogencarbonate indicator</b> changes colour with the concentration of carbon dioxide:</p>
   <div class="row"><span class="chip" style="border-color:var(--ind-purple)">purple: no carbon dioxide</span><span class="chip" style="border-color:var(--ind-red)">red: low concentration</span><span class="chip" style="border-color:var(--ind-yellow)">yellow: higher concentration</span></div>
   <p>Six tubes hold indicator. Tubes A and B have a water plant. C and D have small animals (maggots) on a platform. E and F have both. Tubes <b>A, C and E</b> are wrapped in black paper so no light gets in. Remember: in the light, plants photosynthesise faster than they respire.</p>
   <p class="note">Predict what happens to the carbon dioxide in each tube, then check. In this model the indicator starts red.</p>`,
   extra:'tubes',
   check:C('Tube B (water plant, in the light). Which way does the indicator change?',['Towards yellow, because the plant only respires','Towards purple, because the plant uses carbon dioxide faster than it makes it','It stays exactly the same','It turns blue-black'],1,'In the light the plant photosynthesises faster than it respires, so carbon dioxide is used up and the indicator moves towards purple.')},
  {t:'Fossil fuels and combustion',body:`<p>When organisms die, decomposers don't always break them down quickly. In places with no oxygen, such as deep in the ocean, decomposers can't respire. The bodies are slowly buried under more and more sediment, and high pressure and heat change them into <span class="kw">fossil fuels</span>: coal, oil and natural gas.</p>
   <p>This takes a very long time. Most fossil fuels we use today formed hundreds of millions of years ago. Oil and natural gas came from tiny sea organisms. Coal came from plants that grew in huge swamps.</p>
   <p>When we burn a fossil fuel, its carbon combines with oxygen from the air and forms carbon dioxide. This is <span class="kw">combustion</span>. Adding these steps completes the <span class="kw">carbon cycle</span>.</p>
   <p class="note">Fossil fuels are not the same as fossils. A fossil is the remains of an organism, or traces such as burrows, that have turned to rock. Fossil fuels don't look like organisms, and oil and gas are not rocks.</p>`,
   vis:'cc',ccStage:3,
   check:C('What happens to the carbon in coal when the coal is burned?',['It turns into oxygen','It combines with oxygen and forms carbon dioxide','It becomes a fossil','It disappears completely'],1,'In combustion, carbon combines with oxygen from the air to form carbon dioxide, which goes back into the air.')},
  {t:'Be a carbon atom',body:`<p>This is the book's Activity 1.3.1. You are a carbon atom. Roll the die. If the process that comes up can move you from where you are, you move. If not, you stay put. Can you make it all the way round the cycle?</p>
   <div class="row" style="font-family:var(--mono);font-size:14px;gap:14px"><span>1 photosynthesis</span><span>2 respiration</span><span>3 feeding</span><span>4 formation of fossil fuels</span><span>5 decomposition</span><span>6 combustion</span></div>`,
   extra:'atomgame',
   check:C('Your atom is inside a fossil fuel. Which roll moves it?',['1 photosynthesis','3 feeding','6 combustion','5 decomposition'],2,'Only combustion moves carbon out of a fossil fuel, into the air as carbon dioxide.')}
 ],
 mistakes:[
  ['Plants take in carbon dioxide; only animals give it out.','Plants respire all the time, so they give out carbon dioxide too. In the light, photosynthesis uses it up faster.'],
  ['Fossil fuels are fossils.','A fossil is remains or traces turned to rock. Fossil fuels are named that way only because they formed very long ago and are buried underground.'],
  ['Living things use carbon in its pure form.','Living things can only use carbon as part of compounds such as carbohydrates, proteins and fats.']
 ],
 bq:[
  {p:'p. 26',q:'(a) Draw a food chain with one plant and three animals in it. (b) The arrows represent energy passing along. Do they also show how carbon atoms pass from one organism to the next? Explain.',a:'(a) Any correct chain, for example grass → grasshopper → lizard → hawk. (b) Yes. The food that is eaten contains carbon compounds (carbohydrates, proteins and fats), so carbon passes along the chain with the energy.'},
  {p:'p. 26',q:'Name three different compounds in your body that contain carbon atoms.',a:'Carbohydrates, proteins and fats.'},
  {p:'p. 29',q:'All organisms respire all the time. In which tubes were organisms respiring?',a:'In all of the tubes that had organisms: A, B, C, D, E and F.'},
  {p:'p. 29',q:'Plants photosynthesise when they have light. In which tubes were plants photosynthesising?',a:'Tubes B and F, the tubes with a water plant that were not wrapped in black paper.'},
  {p:'p. 29',q:'Suggest why you were asked to put a platform into each tube, even if there were no animals on it.',a:'So every tube was set up the same way. The only difference between the tubes was the organisms inside, which makes it a fair comparison.'},
  {p:'p. 33',q:'In this model, all the carbon atoms in one place move at the same time. Is that what happens in the real carbon cycle?',a:'No. In the real cycle, carbon atoms move at different times and only some move at once. A better model would move only some of the atoms on each roll.'},
  {p:'p. 33',q:'If you drew a carbon cycle for the time before humans were on Earth, how would it differ?',a:'There would be no combustion of fossil fuels, because people burn fossil fuels for fuel and electricity.'},
  {p:'p. 33',q:'Explain why fossil fuels are non-renewable resources.',a:'They take a very long time to form (most formed hundreds of millions of years ago). Once we burn them, they cannot be replaced in a human lifetime.'}
 ],
 checklist:['I can describe the carbon cycle, including photosynthesis, respiration, feeding, decomposition and combustion.','I can explain how these processes affect the concentration of carbon dioxide in the air.']
},
{
 id:'1.4',title:'Climate change',pages:'34–43',
 goals:['Find out how the Earth\'s climate has changed in the past.','Learn what happened when an asteroid collided with Earth.','Consider how more carbon dioxide in the atmosphere affects climate now and in the future, and describe some predicted impacts.'],
 hook:{q:'In Stage 8 you learnt that carbon dioxide is a greenhouse gas that traps heat energy and keeps the Earth warm. Can you put these in order? Energy from the Sun warms the ground. Some of that energy is reflected. Some reflected energy escapes to space. Some is blocked by carbon dioxide.',a:'1. Energy from the Sun passes through the atmosphere and warms the ground. 2. Some of the energy that reaches the ground is reflected. 3. Some reflected energy passes back out and is lost to space. 4. Some reflected energy is blocked by carbon dioxide and stays close to the Earth. Try the animation in the first step.'},
 big:'Earth\'s climate has changed before, and rising carbon dioxide is warming it now, with effects such as rising sea levels and more extreme weather.',
 steps:[
  {t:'Greenhouse gases',body:`<p>Carbon dioxide and methane are <b>greenhouse gases</b>. Without any carbon dioxide in the atmosphere, the Earth would be frozen and unable to support life. But at the moment there is <b>too much</b>.</p>
   <p>Look back at the carbon cycle. Carbon that ends up in fossil fuels can stay buried for millions of years. When we extract and burn fossil fuels, that carbon goes back into the air as carbon dioxide. Carbon dioxide levels are increasing, and this is affecting the climate.</p>`,
   vis:'greenhouse',
   check:C('Which statement matches the book?',['All carbon dioxide is harmful, and Earth would be better without it','Without carbon dioxide Earth would be frozen, but now there is too much','Methane is not a greenhouse gas','Burning fossil fuels removes carbon dioxide from the air'],1,'Some carbon dioxide keeps Earth warm enough for life. The problem is that the amount is too high now.')},
  {t:'Climate in the past',body:`<p><span class="kw">Climate</span> is the long-term pattern of temperatures, wind and rainfall on Earth. It has been very different in the past.</p>`,
   extra:'timeline',
   check:C('What is "climate"?',['The weather today','The long-term pattern of temperatures, wind and rainfall','The amount of carbon dioxide in the air','How hot the Sun is'],1,'Climate is the long-term pattern. Weather is what happens on a particular day.')},
  {t:'The asteroid and the dinosaurs',body:`<p>About 67 million years ago, an asteroid hit Earth on what is now the coast of Mexico. Close to the impact it was like a massive bomb, with shock waves and very high temperatures, and it probably caused a huge tsunami across the oceans. It also threw huge amounts of rock and dust into the air, which affected the whole planet.</p>
   <p class="note">Tap "Show next effect" to follow the chain.</p>`,
   extra:'chain',
   after:`<p>Most scientists think these changes explain why the dinosaurs became extinct, along with many other species. This was a <span class="kw">mass extinction</span>: up to three-quarters (75%) of all species alive then are thought to have died out.</p>`,
   check:C('Why did animals have less food after the asteroid impact?',['The tsunami washed all the food away','Dust blocked light, so plants could not photosynthesise','Animals stopped eating because of the cold','The asteroid was poisonous'],1,'Less light meant plants could not photosynthesise, so food chains were disrupted.')},
  {t:'Meteoroids, meteors and meteorites',body:`<p>Objects in space smaller than asteroids are <span class="kw">meteoroids</span>. When they enter Earth's atmosphere they are called <span class="kw">meteors</span> ("shooting stars"). Most burn up from the heat of friction, though big ones can make shock waves. In 2013 a meteor exploded over Russia and shattered windows. The parts that reach the ground are <span class="kw">meteorites</span>, about 500 each year.</p>
   <p>Since 1998, scientists have watched for objects that could hit Earth. To judge the risk, they look at the object's <b>mass or diameter</b> and its <b>closest possible approach</b>. A distant asteroid can be a bigger risk than a closer one if its mass is greater.</p>
   <p class="note">Match each word to its meaning.</p>`,
   extra:'meteor',
   check:C('A rock from space lands in a field. What is it called?',['A meteoroid','A meteor','A meteorite','An asteroid'],2,'The parts of meteoroids that reach Earth\'s surface are meteorites.')},
  {t:'Climate change today',body:`<p>For the last 2000 years or so, the climate has been fairly stable. People learnt when rain would come and how temperatures would change, so they knew which crops to grow and when to sow and harvest.</p>
   <p>Now the <b>mean temperature on Earth is increasing</b>. This is caused by more carbon dioxide in the atmosphere. Carbon dioxide traps heat close to the Earth's surface, so more carbon dioxide means more heat is trapped.</p>
   <p>The graph on <b>page 39</b> of your book shows how the Earth's mean temperature has differed from the 1880 temperature, from 1880 to 2016. Use it for the questions at the end of this topic.</p>`,
   check:C('According to the book, what is causing the Earth\'s mean temperature to rise now?',['More asteroids hitting Earth','An increase in carbon dioxide in the atmosphere','The Sun moving closer','Less oxygen in the air'],1,'More carbon dioxide traps more heat close to the Earth\'s surface.')},
  {t:'Impacts of climate change',body:`<p>The book describes four main impacts:</p>
   <ul>
    <li><b>More extreme weather.</b> Higher temperatures put more energy into the atmosphere, so hurricanes and typhoons become more likely. Tropical cyclone Idai (southern Africa, 2019) killed more than 1300 people. We can't say one storm was caused by climate change, but there seem to be more of them now, and they are more violent.</li>
    <li><b>Less predictable rainfall.</b> Rains may come late, not at all, or much more heavily. In 2019 the monsoon in Pakistan, India, Nepal and Bangladesh came later and heavier than usual, and millions of people were affected by floods.</li>
    <li><b>Droughts and wildfires.</b> When rains fail, harvests are lost. Long droughts raise the risk of wildfires, as in Australia.</li>
    <li><b>Rising sea levels.</b> Water expands as it is heated, and melting ice caps and glaciers add water to the oceans. Sea level has been rising by about 3 mm per year. More than 600 million people could be at risk from flooding by the end of this century, including in coastal megacities such as Shanghai, Mumbai and Los Angeles.</li>
   </ul>
   <p class="note">Try the book's sea-level experiment below. What raises the "ocean"?</p>`,
   extra:'sealevel',
   check:C('Which TWO things make sea level rise?',['Water expanding as it warms, and ice melting on land','Ice melting in the sea, and less rain','More oxygen, and more plants','Cooler oceans, and more snow'],0,'Warm water expands, and ice melting on land adds new water to the sea. Floating sea ice melting does not raise the level in the experiment.')}
 ],
 mistakes:[
  ['Carbon dioxide is always bad for the Earth.','Without any carbon dioxide, Earth would be frozen. The problem is that there is too much now.'],
  ['Weather and climate mean the same thing.','Climate is the long-term pattern of temperatures, wind and rainfall.'],
  ['Meteor, meteoroid and meteorite are the same.','Meteoroid: in space. Meteor: in the atmosphere. Meteorite: the part that reaches the ground.']
 ],
 bq:[
  {p:'p. 39',q:'Outline three different ways in which the asteroid collision 67 million years ago would have made it difficult for plants and animals to survive.',a:'Any three of: dust blocked light, so plants could not photosynthesise; animals had less food and food chains were disrupted; the Earth became much colder because less heat reached the surface; near the impact there were shock waves and very high temperatures; a huge tsunami may have spread across the oceans.'},
  {p:'p. 40',q:'Look at the graph on page 39. How much higher was the mean temperature in 2016 than in 1880?',a:'Read the value for 2016 from the y-axis of the graph in your book. It is a little more than 1 °C above the 1880 temperature. Give your answer to the nearest 0.1 °C from your own reading.'},
  {p:'p. 40',q:'Describe the trend shown by the graph between 1880 and 1910, and between 1910 and 2016.',a:'1880 to 1910: the temperature went up and down but stayed close to the 1880 level, with no rise. 1910 to 2016: the temperature went up and down from year to year, but the overall trend was upwards, rising more steeply in recent years.'},
  {p:'p. 41',q:'Calculate by how much sea level is predicted to rise by the end of this century.',a:'Multiply 3 mm by the number of years left until 2100. From 2026: 2100 − 2026 = 74 years, and 74 × 3 mm = 222 mm, which is about 22 cm.'},
  {p:'p. 41',q:'Explain why sea level is predicted to rise.',a:'The Earth\'s mean temperature is increasing. Sea water expands as it is heated, and melting ice caps and glaciers add extra water to the oceans.'},
  {p:'p. 43',q:'In the sea-level experiment, which of these increased the level of the "ocean": melting ice in the sea, melting ice on the land, increasing water temperature?',a:'Melting ice on the land and increasing water temperature. Ice that was already floating in the water did not raise the level when it melted.'}
 ],
 checklist:['I can describe some examples of how the Earth\'s climate has changed in the past.','I can explain how an asteroid collision is believed to have caused climate change and mass extinctions.','I can explain how scientists predict climate change will affect the Earth in future, including rising sea level, more flooding, more droughts and more extreme weather events.']
}
];

/* ---------- Check your progress (book pp. 45–47) ---------- */
const CYP1=[
 {p:'1.1',m:5,q:'Choose the correct word from this list for each description: air, carbon dioxide, chlorophyll, chloroplast, oxygen, soil, stomata, veins. (a) This gas is used by plants in photosynthesis. (b) This gas is made by plants in photosynthesis. (c) Plants get their water for photosynthesis from here. (d) This green pigment absorbs energy from sunlight. (e) These tiny holes in a leaf allow gases to diffuse in and out.',a:'(a) carbon dioxide (b) oxygen (c) soil (d) chlorophyll (e) stomata'},
 {p:'1.2',m:6,q:'Marcus compared the rate of photosynthesis of two types of seaweed. Each seaweed sat under an upside-down funnel in a beaker of sea water, with a measuring cylinder on top to collect gas (see the diagram on page 45). (a) What variable should Marcus change? [1] (b) List three variables he should keep the same. [3] (c) What should he measure during his experiment? [2]',a:'(a) The type of seaweed. (b) Any three of: the amount (mass) of seaweed, the light intensity (distance from the light), the temperature of the water, the volume of sea water, the length of time. (c) The volume of gas collected in the measuring cylinder in a set time.'},
 {p:'1.3',m:9,q:'A farmer added different quantities of nitrate-containing fertiliser to her wheat and measured the grain yield (see the graph on page 45: yield in tonnes per hectare against fertiliser in kg per hectare). (a) What yield did she get with no fertiliser? [1] (b) She decided there was no need to add more than about 60 kg per hectare. Explain how the results support this. Remember fertiliser is expensive. [2] (c) Explain why the yield increases when nitrate fertiliser is added. [2] (d) Suggest why the results might be different in a different place. [2] (e) Name one other mineral that plants need for healthy growth, and explain why. [2]',a:'(a) 4 tonnes per hectare (where the line meets the y-axis). (b) Above about 60 kg per hectare the line levels off, so extra fertiliser gives very little extra yield. Buying more would cost money for almost no gain. (c) Nitrate contains nitrogen, which the plants need to turn carbohydrates into proteins. Proteins are needed to make new cells, so the plants grow more. Nitrogen is also needed to make chlorophyll. (d) The soil in another place may already contain different amounts of minerals, so the plants would respond differently. (e) Magnesium. It is needed to make chlorophyll, which absorbs energy from sunlight for photosynthesis.'},
 {p:'1.4',m:6,q:'Use the carbon cycle diagram on page 46. It has four boxes, A to D, and numbered arrows 1 to 3. (a) Match each label to the correct letter: carbon in fossil fuels; carbon compounds in plants; carbon dioxide in the air; carbon compounds in animals. [3] (b) Match each label to the correct number: feeding; combustion; photosynthesis. [2] (c) Name one compound found in plants that contains carbon. [1]',a:'(a) A: carbon dioxide in the air. B (the tree): carbon compounds in plants. C (the cow): carbon compounds in animals. D (coal, gas and gasoline): carbon in fossil fuels. (b) 1 (air to tree): photosynthesis. 2 (fossil fuels to air): combustion. 3 (tree to cow): feeding. (c) Any one of: carbohydrate (such as glucose or starch), protein, fat. Check the letters and numbers against your own book\'s diagram.'},
 {p:'1.5',m:4,q:'(a) Carbon dioxide in the atmosphere is increasing and changing Earth\'s climate. Which of these are predicted future impacts? The mean temperature at the North and South Poles will decrease. Sea level will rise. There will be more extreme weather events, such as typhoons and hurricanes. There will be less sunlight reaching the surface of the Earth. (b)(i) Explain what is meant by a mass extinction. [1] (ii) Explain how an asteroid collision can cause mass extinctions. [3]',a:'(a) Sea level will rise. There will be more extreme weather events. (b)(i) A very large number of species becoming extinct at about the same time. (ii) The collision throws huge amounts of dust into the air. Less light reaches the surface, so plants cannot photosynthesise and animals have less food. The Earth also becomes much colder, because less heat from the Sun reaches the surface. Many species cannot survive these changes.'}
];

/* ---------- Mixed quiz ---------- */
const QUIZ1=[
 C('Which word equation is correct for photosynthesis?',['glucose + oxygen → water + carbon dioxide','water + carbon dioxide → glucose + oxygen','water + oxygen → glucose + carbon dioxide','carbon dioxide + glucose → water + oxygen'],1,'Water and carbon dioxide react to make glucose and oxygen.'),
 C('What captures the energy from sunlight?',['Starch','Chlorophyll','Glucose','Nitrate'],1,'Chlorophyll is the green pigment that captures light energy.'),
 C('About what percentage of the air is oxygen?',['About 1%','About 20%','About 50%','About 80%'],1,'The book says about 20% of the air around us is oxygen.'),
 C('In the light-intensity experiment, what is the dependent variable?',['Distance of the lamp','Number of bubbles per minute','Type of plant','Size of the test tube'],1,'You change the lamp distance and measure the bubbles per minute.'),
 C('In the starch test, a leaf with starch turns…',['Bright green','Orange-red','Blue-black','White'],2,'Iodine solution turns blue-black when starch is present.'),
 C('What do stomata do?',['Carry water to cells','Let gases diffuse in and out of the leaf','Make chlorophyll','Store starch'],1,'Stomata are tiny holes that let carbon dioxide in and oxygen out.'),
 C('A plant has yellow leaves and can\'t make enough chlorophyll. It may be short of…',['Magnesium','Starch','Oxygen','Glucose'],0,'Magnesium is needed to make chlorophyll.'),
 C('What is "yield"?',['The quantity of crop a farmer harvests','A type of fertiliser','A layer in a leaf','The rate of photosynthesis'],0,'Yield is the quantity of crop harvested.'),
 C('Which process moves carbon from the air into plants?',['Respiration','Combustion','Photosynthesis','Decomposition'],2,'Photosynthesis takes carbon dioxide from the air into carbohydrates in plants.'),
 C('Which is the word equation for respiration?',['glucose + oxygen → carbon dioxide + water','water + carbon dioxide → glucose + oxygen','carbon + oxygen → glucose','glucose → starch'],0,'Respiration: glucose + oxygen → carbon dioxide + water.'),
 C('Hydrogencarbonate indicator turns yellow when…',['There is no carbon dioxide','There is a higher concentration of carbon dioxide','There is starch','The tube is in the light'],1,'Yellow means a higher concentration of carbon dioxide; purple means none.'),
 C('Why can\'t decomposers break down dead organisms deep in the ocean?',['It is too cold','There is not enough oxygen for them to respire','There is too much light','The water is salty'],1,'Without oxygen decomposers can\'t respire, so remains build up and can become fossil fuels.'),
 C('Oil and natural gas formed from…',['Volcanic rock','Tiny marine organisms that fell to the sea bed','Trees in swamps','Melted ice caps'],1,'Coal came from swamp plants; oil and gas from tiny sea organisms.'),
 C('About how long ago did Earth experience its first known ice age?',['2000 years ago','67 million years ago','650 million years ago','2 billion years ago'],3,'The first ice age we know about was about 2 billion years ago.'),
 C('The collision of two asteroids about 470 million years ago caused…',['A heatwave','An ice age, because dust reduced light and heat reaching Earth','The first oxygen in the air','The dinosaurs to appear'],1,'Dust from the collision cut light and heat, triggering an ice age and lowering sea level.'),
 C('Which two things do scientists look at to judge an asteroid\'s risk?',['Its colour and speed','Its mass or diameter, and its closest possible approach','Its age and temperature','Its name and shape'],1,'Mass (or diameter) and closest approach decide the risk.'),
 C('Sea level has been rising at about…',['3 mm per year','3 cm per day','3 m per year','30 cm per year'],0,'About 3 mm per year, according to the book.'),
 C('Which activity adds carbon dioxide to the air?',['Photosynthesis','Burning fossil fuels','Fossil fuels forming','Plants growing in the light'],1,'Combustion of fossil fuels releases carbon dioxide.')
];

/* =================== VISUALS =================== */
const VIS={
plant(){return `<div class="vis"><svg viewBox="0 0 380 270" role="img" aria-label="A plant photosynthesising: sunlight, carbon dioxide and water go in; oxygen comes out">
 <defs><marker id="mA" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0 0L10 5L0 10z" class="s-ink"/></marker></defs>
 <rect x="0" y="0" width="380" height="200" class="s-skysoft"/>
 <rect x="0" y="200" width="380" height="70" class="s-earthsoft"/>
 <circle cx="52" cy="44" r="26" class="s-sun"/>
 <g class="st-sun" stroke-width="3" stroke-linecap="round"><path d="M52 6v8M52 74v8M14 44h8M82 44h8M25 17l6 6M73 65l6 6M79 17l-6 6M31 65l-6 6"/></g>
 <path d="M200 262 L200 120" class="st-leaf" stroke-width="7" fill="none" stroke-linecap="round"/>
 <path d="M200 160 C170 150 150 130 140 112 C170 112 192 130 200 150z" class="s-leaf"/>
 <path d="M200 132 C228 92 268 82 302 92 C286 124 248 140 200 132z" class="s-leaf"/>
 <g class="st-earth" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M200 210 l-26 34 M200 214 l22 38 M200 222 l-4 40 M188 228 l-22 6 M210 234 l26 4"/></g>
 <path d="M84 58 L236 104" class="st-sun flow" stroke-width="3" fill="none" marker-end="url(#mA)"/>
 <text x="96" y="92">energy from sunlight</text>
 <path d="M372 150 L292 120" class="st-sky flow" stroke-width="3" fill="none" marker-end="url(#mA)"/>
 <text x="374" y="168" text-anchor="end">carbon dioxide</text><text x="374" y="181" text-anchor="end" class="small">from the air</text>
 <path d="M214 252 L214 150" class="st-sky flow" stroke-width="3" fill="none" marker-end="url(#mA)"/>
 <text x="226" y="230">water</text><text x="226" y="243" class="small">from the soil</text>
 <path d="M268 96 L340 40" class="st-leaf flow" stroke-width="3" fill="none" marker-end="url(#mA)"/>
 <text x="300" y="30">oxygen out</text>
 <text x="228" y="124" style="font-weight:700;font-size:11px" class="s-surface">glucose made</text>
</svg><p class="cap">Chlorophyll in the leaf captures the light energy. Glucose is made in the leaf.</p></div>`},

funnel(){let b='';for(let i=0;i<6;i++){b+=`<circle class="bub s-surface st-sky" stroke-width="1.2" cx="${186+(i%3)*4}" cy="178" r="${2.4+(i%2)}" style="animation-delay:${i*0.4}s"/>`;}
 return `<div class="vis"><svg viewBox="0 0 380 250" role="img" aria-label="Pond weed under an upside-down funnel in a beaker, with a test tube collecting gas">
 <rect x="90" y="70" width="200" height="160" rx="6" class="s-skysoft st-muted" stroke-width="2"/>
 <path d="M90 70 L90 230 L290 230 L290 70" class="st-ink" stroke-width="2.4" fill="none"/>
 <path d="M130 222 L176 150 L176 60 M250 222 L204 150 L204 60" class="st-ink" stroke-width="2.4" fill="none"/>
 <rect x="178" y="20" width="24" height="110" rx="11" class="s-surface st-ink" stroke-width="2"/>
 <rect x="180" y="22" width="20" height="26" rx="9" class="s-paper"/>
 <rect x="120" y="222" width="20" height="8" class="s-earth"/><rect x="240" y="222" width="20" height="8" class="s-earth"/>
 <g class="s-leaf"><ellipse cx="170" cy="208" rx="16" ry="6" transform="rotate(-30 170 208)"/><ellipse cx="194" cy="198" rx="18" ry="6" transform="rotate(20 194 198)"/><ellipse cx="208" cy="212" rx="16" ry="6" transform="rotate(-10 208 212)"/><ellipse cx="184" cy="214" rx="14" ry="5"/></g>
 ${b}
 <text x="212" y="38">gas collects here</text>
 <text x="296" y="100">beaker of water</text>
 <text x="296" y="168">upside-down</text><text x="296" y="181">funnel</text>
 <text x="16" y="206">water plant</text>
 <text x="16" y="244" class="small">blocks lift the funnel</text>
 <path d="M86 202 L150 208" class="st-muted" stroke-width="1"/>
</svg><p class="cap">Test the collected gas with a glowing splint: it relights if the gas contains a lot of oxygen.</p></div>`},

lamp(){return `<div class="vis" id="lampVis"><svg viewBox="0 0 380 200" role="img" aria-label="Lamp and water plant. Move the lamp to change the light intensity.">
 <rect x="0" y="170" width="380" height="30" class="s-earthsoft"/>
 <g id="lampG"><rect x="-6" y="70" width="12" height="100" class="s-muted"/><path d="M-30 40 L30 40 L18 80 L-18 80z" class="s-ink"/><ellipse cx="0" cy="82" rx="18" ry="5" class="s-sun"/><path id="beam" d="M-18 84 L18 84 L300 150 L300 40z" class="s-sun" opacity=".22"/></g>
 <rect x="300" y="20" width="34" height="150" rx="15" class="s-skysoft st-ink" stroke-width="2"/>
 <g class="s-leaf"><rect x="315" y="96" width="4" height="66"/><ellipse cx="311" cy="140" rx="9" ry="4" transform="rotate(-30 311 140)"/><ellipse cx="323" cy="124" rx="9" ry="4" transform="rotate(30 323 124)"/><ellipse cx="311" cy="110" rx="9" ry="4" transform="rotate(-30 311 110)"/></g>
 <g id="bubbles"></g>
 <text id="distTxt" x="160" y="192" text-anchor="middle" class="small"></text>
</svg>
 <div class="row" style="justify-content:center"><label for="lampRange" class="tiny">Lamp distance</label><input id="lampRange" type="range" min="0" max="100" value="30" style="flex:1;max-width:280px"></div>
 <div class="infobox" id="lampInfo"></div></div>`},

foodchain(){return `<div class="vis"><svg viewBox="0 0 380 120" role="img" aria-label="Food chain: sun to grass to grasshopper to lizard">
 <defs><marker id="mB" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0 0L10 5L0 10z" class="s-sun"/></marker></defs>
 <circle cx="34" cy="50" r="22" class="s-sun"/><text x="34" y="96" text-anchor="middle">Sun</text>
 <g class="s-leaf"><path d="M110 74 C108 50 112 30 118 18 C120 40 118 58 116 74z"/><path d="M118 74 C122 52 132 36 142 28 C136 50 128 62 124 74z"/><path d="M104 74 C96 56 90 44 82 38 C94 46 104 58 110 74z"/></g>
 <text x="112" y="96" text-anchor="middle">grass</text>
 <g><ellipse cx="212" cy="58" rx="24" ry="9" class="s-leaf" opacity=".7"/><circle cx="234" cy="54" r="6" class="s-leaf"/><path d="M200 64 l-12 16 M214 66 l6 16 M196 56 l-20 -14" class="st-leaf" stroke-width="2.4" fill="none"/></g>
 <text x="212" y="96" text-anchor="middle">grasshopper</text>
 <g><path d="M290 60 C300 46 330 44 352 54 C364 58 368 62 360 66 C340 72 310 72 290 60z" class="s-earth"/><path d="M290 60 C276 64 262 62 254 56" class="st-earth" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="350" cy="56" r="2.2" class="s-ink"/></g>
 <text x="318" y="96" text-anchor="middle">lizard</text>
 <path d="M60 50 L90 50" class="st-sun flow" stroke-width="3" marker-end="url(#mB)"/>
 <path d="M146 54 L180 56" class="st-sun flow" stroke-width="3" marker-end="url(#mB)"/>
 <path d="M244 60 L272 60" class="st-sun flow" stroke-width="3" marker-end="url(#mB)"/>
 <text x="190" y="116" text-anchor="middle" class="small">arrows show energy passing along the chain</text>
</svg></div>`},

cell(){let ch='';const pts=[[46,40],[46,80],[46,120],[46,160],[46,200],[134,52],[134,96],[134,150],[134,196],[76,232],[104,232],[76,22],[104,22]];
 pts.forEach(([x,y])=>{ch+=`<ellipse cx="${x}" cy="${y}" rx="${x===46||x===134?7:10}" ry="${x===46||x===134?11:6}" class="s-leaf"/>`;});
 return `<div class="vis"><svg viewBox="0 0 380 260" role="img" aria-label="Plant cell with chloroplasts">
 <rect x="30" y="8" width="120" height="240" rx="20" class="s-leafsoft st-leaf" stroke-width="5"/>
 <rect x="36" y="14" width="108" height="228" rx="16" fill="none" class="st-ink" stroke-width="1.2"/>
 <rect x="58" y="36" width="64" height="180" rx="14" class="s-skysoft"/>
 ${ch}
 <ellipse cx="128" cy="122" rx="10" ry="14" class="s-sky"/>
 <g class="st-muted" stroke-width="1"><path d="M150 26 L230 26"/><path d="M144 46 L230 60"/><path d="M110 120 L230 112"/><path d="M90 150 L230 160"/><path d="M138 124 L230 206"/><path d="M134 196 L230 244"/></g>
 <text x="236" y="30">cell wall</text>
 <text x="236" y="64">cell surface membrane</text>
 <text x="236" y="116">cytoplasm</text>
 <text x="236" y="164">vacuole</text>
 <text x="236" y="210">nucleus</text>
 <text x="236" y="242" style="font-weight:700;fill:var(--leaf)">chloroplast</text><text x="236" y="255" class="small">contains chlorophyll</text>
</svg><p class="cap">A leaf cell, redrawn from the book's diagram. The green chloroplasts contain chlorophyll.</p></div>`},

leaf(){return `<div class="vis"><svg viewBox="0 0 380 250" id="leafSvg" role="img" aria-label="Cross-section of a leaf. Tap a part to learn what it does.">${leafParts()}</svg>
 <div class="infobox" id="leafInfo"><b>Tap a part of the leaf.</b></div></div>`},

minerals(){return `<div class="vis"><div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr))">
 <div class="card" style="gap:8px"><svg viewBox="0 0 160 90" style="max-width:200px" aria-hidden="true"><path d="M20 70 C30 20 100 4 140 20 C126 60 70 84 20 70z" class="s-sun"/><path d="M24 68 C60 50 100 30 136 22" class="st-leaf" stroke-width="2" fill="none"/><path d="M60 52 C70 40 90 32 110 30 C96 46 80 54 60 52z" class="s-leaf" opacity=".7"/></svg>
 <h4 style="font-size:20px">Magnesium</h4><p style="font-size:15px">Needed to make the green pigment, <b>chlorophyll</b>. Without enough, leaves look <b>yellow</b> instead of green. With less chlorophyll to absorb sunlight energy, the plant can't photosynthesise as much as it should, so it doesn't grow well.</p></div>
 <div class="card" style="gap:8px"><svg viewBox="0 0 160 90" style="max-width:200px" aria-hidden="true"><rect x="0" y="72" width="160" height="18" class="s-earthsoft"/><path d="M80 72 L80 46" class="st-leaf" stroke-width="3"/><path d="M80 56 C70 50 64 42 62 36 C72 40 78 48 80 56z" class="s-leaf"/><path d="M80 50 C88 42 96 40 102 40 C96 48 88 52 80 50z" class="s-sun"/></svg>
 <h4 style="font-size:20px">Nitrate</h4><p style="font-size:15px">Contains <b>nitrogen</b> atoms, which the plant needs to turn carbohydrates into <b>proteins</b>. Proteins are essential for making new cells, so the plant can grow. Without enough nitrogen, leaves die and the plant stays <b>small</b>. Nitrogen is also needed to make chlorophyll.</p></div>
</div></div>`},

cc(stage){return `<div class="vis cc" data-stage="${stage}"><svg viewBox="0 0 380 300" role="img" aria-label="Carbon cycle diagram">${ccSvg()}</svg>
 <div class="row" style="justify-content:center">${[1,2,3].map(s=>`<button class="btn" data-ccs="${s}" aria-pressed="${s===stage}">${['','Feeding','+ Respiration','+ Fossil fuels'][s]}</button>`).join('')}</div>
 <div class="infobox"><b>Tap an arrow</b> to see what process it shows.</div></div>`},

greenhouse(){return `<div class="vis" id="ghVis"><svg viewBox="0 0 380 230" role="img" aria-label="Greenhouse effect in four steps">
 <defs><marker id="mG" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="s-ink"/></marker></defs>
 <rect x="0" y="0" width="380" height="230" fill="var(--space)"/>
 <circle cx="360" cy="40" r="44" class="s-sun"/>
 <path d="M0 230 L0 120 Q190 80 380 120 L380 230z" fill="rgba(130,182,232,.28)"/>
 <path d="M0 230 L0 190 Q190 160 380 190 L380 230z" fill="#7A5A36"/>
 <text x="300" y="140" style="fill:var(--on-space)">atmosphere</text>
 <text x="16" y="216" style="fill:var(--on-space)">Earth</text>
 <path class="ray" data-r="1" d="M325 62 L203 168" stroke="var(--sun-fill)" stroke-width="4" marker-end="url(#mG)"/>
 <path class="ray" data-r="2" d="M200 172 L152 142" stroke="#F28C28" stroke-width="4" marker-end="url(#mG)"/>
 <path class="ray" data-r="3" d="M150 140 L112 22" stroke="#F28C28" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#mG)"/>
 <path class="ray" data-r="4" d="M150 140 Q96 92 72 166" stroke="#F28C28" stroke-width="4" fill="none" marker-end="url(#mG)"/>
 <text class="ray" data-r="3" x="122" y="30" style="fill:var(--on-space)">lost to space</text>
 <text class="ray" data-r="4" x="14" y="110" style="fill:var(--on-space)">trapped by CO₂</text>
</svg>
 <div class="row" style="justify-content:center"><button class="btn" id="ghPrev">Back</button><button class="btn primary" id="ghNext">Next step</button></div>
 <div class="infobox" id="ghInfo"></div></div>`}
};

function leafParts(){
 let s='';
 // waxy layer
 s+=`<g class="layer" data-l="wax"><rect x="10" y="10" width="360" height="6" rx="3" class="s-sun" stroke="transparent"/></g>`;
 // upper epidermis
 let ue='';for(let i=0;i<12;i++)ue+=`<rect x="${10+i*30}" y="18" width="30" height="16" class="s-surface st-ink" stroke-width="1"/>`;
 s+=`<g class="layer" data-l="upper">${ue}</g>`;
 // palisade
 let pa='';for(let i=0;i<18;i++){pa+=`<rect x="${12+i*20}" y="36" width="18" height="58" rx="7" class="s-leafsoft st-leaf" stroke-width="1.2"/>`;for(let k=0;k<4;k++)pa+=`<circle cx="${17+i*20+(k%2)*8}" cy="${46+k*13}" r="3" class="s-leaf" stroke="transparent"/>`;}
 s+=`<g class="layer" data-l="palisade">${pa}</g>`;
 // spongy
 let sp='';const sc=[[30,118],[70,112],[112,124],[230,116],[272,126],[316,114],[352,124],[46,156],[96,160],[244,158],[292,162],[340,156],[150,170],[200,172]];
 sc.forEach(([x,y],i)=>{sp+=`<ellipse cx="${x}" cy="${y}" rx="17" ry="12" class="s-leafsoft st-leaf" stroke-width="1.2"/><circle cx="${x-4}" cy="${y}" r="2.6" class="s-leaf" stroke="transparent"/><circle cx="${x+5}" cy="${y+3}" r="2.6" class="s-leaf" stroke="transparent"/>`;});
 s+=`<g class="layer" data-l="spongy">${sp}</g>`;
 // vein
 let v='';[[150,122],[168,114],[186,122],[160,138],[178,138],[196,134],[168,152],[186,152]].forEach(([x,y],i)=>{v+=`<circle cx="${x}" cy="${y}" r="9" class="${i<4?'s-earthsoft':'s-skysoft'} st-earth" stroke-width="1.2"/>`;});
 s+=`<g class="layer" data-l="vein">${v}</g>`;
 // lower epidermis with stoma gap at x 200-240
 let le='';for(let i=0;i<12;i++){const x=10+i*30;if(x===190||x===220)continue;le+=`<rect x="${x}" y="190" width="30" height="16" class="s-surface st-ink" stroke-width="1"/>`;}
 s+=`<g class="layer" data-l="lower">${le}</g>`;
 s+=`<g class="layer" data-l="stoma"><path d="M190 190 C204 186 214 196 214 206 L190 206z" class="s-leaf st-ink" stroke-width="1"/><path d="M250 190 C236 186 226 196 226 206 L250 206z" class="s-leaf st-ink" stroke-width="1"/><rect x="212" y="186" width="16" height="24" fill="transparent" stroke="transparent"/></g>`;
 s+=`<path d="M220 232 L220 210" class="st-sky flow" stroke-width="2.4" fill="none"/><text x="230" y="230" class="small">CO₂ in through the stoma</text>`;
 s+=`<rect x="10" y="208" width="360" height="4" rx="2" class="s-sun"/>`;
 s+=`<text x="10" y="246" class="small">Tap the layers. Spaces between spongy cells are air spaces.</text>`;
 return s;
}
const LEAF_INFO={
 wax:['Waxy layer','Covers the leaf surface and stops the leaf cells from drying out.'],
 upper:['Upper epidermis','Protects the cells inside the leaf.'],
 palisade:['Palisade layer','Contains the cells that do most of the photosynthesis. They are packed with chloroplasts.'],
 spongy:['Spongy layer','Has lots of air spaces, so gases can diffuse easily between the cells. These cells do a small amount of photosynthesis.'],
 vein:['Vein','Carries water to the cells in the leaf.'],
 lower:['Lower epidermis','Protects the cells inside the leaf. It contains the stomata.'],
 stoma:['Stoma (plural: stomata)','A tiny hole in the lower epidermis. Stomata let carbon dioxide from the air get into the leaf, and let oxygen out.']
};

/* carbon cycle svg */
const CC_NODES=[
 ['air','carbon dioxide in the air',190,31,'s-skysoft'],['plants','carbon compounds in plants',72,137,'s-leafsoft'],
 ['animals','carbon compounds in animals',308,137,'s-sunsoft'],['decomp','carbon compounds in decomposers',230,240,'s-earthsoft'],['fossil','fossil fuels',60,250,'s-paper']];
const CC_ARROWS=[
 {id:'p',st:1,c:'leaf',d:'M140 40 Q74 50 70 116',lx:70,ly:68,l:'photosynthesis',info:'Photosynthesis: plants take carbon dioxide from the air and use it to make carbohydrates.'},
 {id:'f1',st:1,c:'sun',d:'M126 137 L252 137',lx:190,ly:130,l:'feeding',info:'Feeding: animals get carbon compounds by eating plants.'},
 {id:'f2',st:1,c:'sun',d:'M104 156 Q120 236 176 238',lx:104,ly:212,l:'feeding',info:'Decomposers get carbon by breaking down waste products and dead remains of plants.'},
 {id:'f3',st:1,c:'sun',d:'M318 156 Q322 238 286 240',lx:330,ly:212,l:'feeding',info:'Decomposers get carbon by breaking down waste products and dead remains of animals.'},
 {id:'r1',st:2,c:'sky',d:'M104 118 Q130 82 158 50',lx:112,ly:96,l:'respiration',info:'Respiration: plants respire all the time, giving out carbon dioxide.'},
 {id:'r2',st:2,c:'sky',d:'M282 118 Q250 82 222 50',lx:262,ly:96,l:'respiration',info:'Respiration: animals give out carbon dioxide when they breathe out.'},
 {id:'r3',st:2,c:'sky',d:'M284 230 C372 214 372 50 246 30',lx:300,ly:18,l:'respiration',info:'Respiration: decomposers respire too, releasing carbon dioxide as they break down waste.'},
 {id:'ff1',st:3,c:'earth',d:'M52 156 L52 230',lx:8,ly:196,l:'very slow',info:'Very slow formation: dead plants buried for millions of years, changed by heat and pressure, become fossil fuels such as coal.'},
 {id:'ff2',st:3,c:'earth',d:'M346 156 C360 300 150 300 112 262',lx:250,ly:292,l:'very slow formation',info:'Very slow formation: dead organisms that are not decomposed can be buried and slowly become fossil fuels such as oil and gas.'},
 {id:'cb',st:3,c:'bad',d:'M14 233 C-4 120 40 30 136 24',lx:6,ly:110,l:'combustion',info:'Combustion: burning fossil fuels joins their carbon with oxygen, forming carbon dioxide.'}
];
function ccSvg(){
 const cols={leaf:'var(--leaf)',sun:'var(--sun)',sky:'var(--sky)',earth:'var(--earth)',bad:'var(--bad)'};
 let s='<defs>'+Object.entries(cols).map(([k,v])=>`<marker id="mc-${k}" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" fill="${v}"/></marker>`).join('')+'</defs>';
 CC_ARROWS.forEach(a=>{s+=`<path class="cc-arrow" data-a="${a.id}" data-st="${a.st}" d="${a.d}" stroke="${cols[a.c]}" marker-end="url(#mc-${a.c})"/><path class="cc-hit" data-a="${a.id}" data-st="${a.st}" d="${a.d}" stroke="transparent" stroke-width="16" fill="none" style="cursor:pointer"/><text class="cc-lbl small" data-st="${a.st}" x="${a.lx}" y="${a.ly}" style="fill:${cols[a.c]};font-weight:700">${a.l}</text>`;});
 CC_NODES.forEach(([id,l,x,y,cls])=>{const w=110,h=38;const words=l.split(' ');const half=Math.ceil(words.length/2);
  s+=`<g data-node="${id}"><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="9" class="${cls} st-ink" stroke-width="1.2"/>`+
  (words.length>2?`<text x="${x}" y="${y-3}" text-anchor="middle" style="font-size:10.5px">${words.slice(0,half).join(' ')}</text><text x="${x}" y="${y+10}" text-anchor="middle" style="font-size:10.5px">${words.slice(half).join(' ')}</text>`:`<text x="${x}" y="${y+4}" text-anchor="middle" style="font-size:11px">${l}</text>`)+`</g>`;});
 s+=`<circle id="atom" cx="-50" cy="-50" r="9" class="s-ink"/><text id="atomC" x="-50" y="-50" text-anchor="middle" style="font-size:10px;font-weight:700;fill:var(--surface)">C</text>`;
 return s;
}

/* =================== EXTRAS (interactive widgets) =================== */
const EXTRA={
eqbuilder(){const toks=['water','carbon dioxide','glucose','oxygen','soil','nitrogen'];
 return `<div class="vis" id="eqb"><p class="note" style="text-align:center">Build the word equation. Tap a word, then tap a box.</p>
 <div class="chips" style="justify-content:center">${shuffle(toks).map(t=>`<button class="chip" data-tok="${t}" aria-pressed="false">${t}</button>`).join('')}</div>
 <div class="slots" style="justify-content:center"><button class="slot" data-s="r1"></button>+<button class="slot" data-s="r2"></button>→<button class="slot" data-s="p1"></button>+<button class="slot" data-s="p2"></button></div>
 <div class="row" style="justify-content:center"><button class="btn primary" id="eqCheck">Check my equation</button><button class="btn" id="eqReset">Start again</button></div>
 <div class="infobox" id="eqInfo" hidden></div></div>`},

starchorder(){const steps=['Heat water in a beaker until it boils.','Drop a leaf into the boiling water for about two minutes.','Turn off the burner.','Put the leaf into ethanol in a large test tube.','Stand the test tube in the hot water. The green colour dissolves out.','Dip the brittle leaf in warm water to soften it.','Spread the leaf out on a tile.','Add iodine solution. Blue-black means starch.'];
 return `<div class="vis" id="starch" data-steps='${esc(JSON.stringify(steps))}'><div class="order">${shuffle(steps.map((s,i)=>({s,i}))).map(o=>`<button class="oitem" data-i="${o.i}"><span class="n"></span><span>${o.s}</span></button>`).join('')}</div>
 <div class="infobox" id="starchInfo">Tap the first step.</div></div>`},

variables(){const items=[['The amount of fertiliser added','I'],['The number of duckweed leaves','D'],['The temperature','C'],['The amount of light','C'],['The volume of water in each dish','C'],['The number of duckweed leaves at the start','C']];
 return `<div class="vis"><div class="sort">${items.map(([t,a],i)=>`<div class="srow" data-a="${a}"><span class="lbl">${t}</span><span class="seg"><button class="btn" data-v="I">Change it</button><button class="btn" data-v="D">Measure it</button><button class="btn" data-v="C">Keep it the same</button></span></div>`).join('')}</div>
 <p class="tiny">Change it = independent variable. Measure it = dependent variable. Keep it the same = control variable.</p></div>`},

tubes(){const T=[['A','water plant',true,'more','The plant is in the dark, so it can only respire. Carbon dioxide increases: towards yellow.'],
 ['B','water plant',false,'less','In the light the plant photosynthesises faster than it respires. Carbon dioxide is used up: towards purple.'],
 ['C','maggots',true,'more','Maggots respire all the time. Carbon dioxide increases: towards yellow.'],
 ['D','maggots',false,'more','Light makes no difference to maggots. They respire, so carbon dioxide increases: towards yellow.'],
 ['E','plant + maggots',true,'more','In the dark, both the plant and the maggots respire. Carbon dioxide increases: towards yellow.'],
 ['F','plant + maggots',false,'depends','The maggots give out carbon dioxide, but the plant uses it in photosynthesis. The result depends on which is faster. Compare with what happens in your own experiment.']];
 return `<div class="vis" id="tubes"><svg viewBox="0 0 380 170" aria-label="Six indicator tubes">${T.map((t,i)=>{const x=20+i*60;return `<g data-t="${i}"><rect x="${x}" y="18" width="30" height="120" rx="13" class="s-surface st-ink" stroke-width="1.6"/><rect class="liq" x="${x+2}" y="92" width="26" height="44" rx="11" fill="var(--ind-red)"/>${t[2]?`<rect x="${x-3}" y="40" width="36" height="100" rx="6" fill="var(--space)" opacity=".9"/><text x="${x+15}" y="92" text-anchor="middle" style="fill:var(--on-space);font-size:9px">dark</text>`:''}<rect x="${x+4}" y="10" width="22" height="12" rx="3" class="s-earth"/><text x="${x+15}" y="156" text-anchor="middle" style="font-weight:700">${t[0]}</text><text x="${x+15}" y="168" text-anchor="middle" class="small">${t[1].replace(' + ','+')}</text></g>`}).join('')}</svg>
 <div class="sort">${T.map((t,i)=>`<div class="srow" data-i="${i}" data-a="${t[3]}"><span class="lbl"><b>Tube ${t[0]}</b>, ${t[1]}${t[2]?', dark':', light'}</span><span class="seg"><button class="btn" data-v="more">CO₂ goes up</button><button class="btn" data-v="less">CO₂ goes down</button><button class="btn" data-v="depends">It depends</button></span><span class="why tiny" hidden style="flex-basis:100%">${t[4]}</span></div>`).join('')}</div></div>`},

atomgame(){return `<div class="vis" id="game"><svg viewBox="0 0 380 300" role="img" aria-label="Carbon cycle game board">${ccSvg()}</svg>
 <div class="row" style="justify-content:center"><button class="btn primary" id="roll">Roll the die</button><span id="die" style="font-family:var(--mono);font-size:28px;min-width:1.5em;text-align:center">·</span><button class="btn" id="gameReset">Restart</button></div>
 <div class="infobox" id="gameInfo">Your carbon atom starts <b>in the air</b>, as part of carbon dioxide.</div>
 <p class="tiny" id="gameVisited"></p></div>`},

timeline(){const E=[
 ['about 2 billion years ago','The first ice age we know about','Since then, Earth has cycled between warm periods (no ice, even at the poles) and colder periods called ice ages (ice at the poles).'],
 ['perhaps about 650 million years ago','Snowball Earth','On at least one occasion the whole Earth was covered in ice and snow. Some call it "slushball Earth" because it may not have frozen completely. Scientists still don\'t fully understand the cause.'],
 ['around 470 million years ago','Two asteroids collide','Two asteroids crashed together in space, between Earth and Mars. The dust cut the light and heat reaching Earth, triggering an ice age. Ice caps spread and sea level fell.'],
 ['around 67 million years ago','An asteroid hits Earth','The impact, on what is now the coast of Mexico, changed the climate of the whole planet and caused a mass extinction.'],
 ['about 50 000 years ago','A crater forms in the USA','One of about 175 known impact craters. It is more than 1 km wide and 170 m deep.'],
 ['the last 2000 years or so','A fairly stable climate','People could predict rain and temperatures, and plan their crops.'],
 ['now','Mean temperatures are rising','Caused by more carbon dioxide in the atmosphere.']];
 return `<div class="vis"><div class="tl">${E.map((e,i)=>`<div class="tli${i===E.length-1?' hot':''}"><div class="when">${e[0]}</div><h4>${e[1]}</h4><p>${e[2]}</p></div>`).join('')}</div></div>`},

chain(){const L=['Huge amounts of dust in the air','Less light reaches the surface','Plants can\'t photosynthesise','Animals have less food','Food chains are disrupted','Less heat reaches Earth, so it gets much colder'];
 return `<div class="vis" id="chainV"><div class="chain">${L.map((l,i)=>`${i?'<span class="arrow">→</span>':''}<span class="link${i===0?' on':''}">${l}</span>`).join('')}</div>
 <div class="row"><button class="btn primary" id="chainNext">Show next effect</button><button class="btn" id="chainReset">Start again</button></div></div>`},

meteor(){const P=[['meteoroid','An object in space, smaller than an asteroid'],['meteor','A meteoroid entering Earth\'s atmosphere; a "shooting star"'],['meteorite','The part of a meteoroid that reaches Earth\'s surface']];
 return `<div class="vis" id="met"><div class="sort">${shuffle(P).map(([w,d])=>`<div class="srow" data-a="${w}"><span class="lbl">${d}</span><span class="seg">${P.map(p=>`<button class="btn" data-v="${p[0]}">${p[0]}</button>`).join('')}</span></div>`).join('')}</div></div>`},

sealevel(){return `<div class="vis" id="sea"><svg viewBox="0 0 380 190" role="img" aria-label="Sea level model">
 <rect x="0" y="0" width="380" height="190" class="s-paper"/>
 <rect x="10" y="60" width="110" height="120" class="s-earthsoft st-earth" stroke-width="1.5"/>
 <text x="65" y="174" text-anchor="middle" class="small">land</text>
 <rect id="landIce" x="40" y="28" width="50" height="32" rx="4" class="s-surface st-sky" stroke-width="2"/>
 <rect x="120" y="40" width="250" height="140" fill="none" class="st-ink" stroke-width="2"/>
 <rect id="seaW" class="water s-skysoft" x="122" y="110" width="246" height="68"/>
 <line id="seaLine" x1="122" x2="368" y1="110" y2="110" class="st-sky" stroke-width="2"/>
 <rect id="seaIce" x="220" y="100" width="54" height="16" rx="4" class="s-surface st-sky" stroke-width="2"/>
 <line x1="372" x2="378" y1="110" y2="110" class="st-bad" stroke-width="3"/>
 <text x="376" y="104" text-anchor="end" class="small">start level</text>
</svg>
 <div class="row" style="justify-content:center"><button class="btn" data-sea="sea">Melt the sea ice</button><button class="btn" data-sea="land">Melt the land ice</button><button class="btn" data-sea="warm">Warm the water</button><button class="btn" data-sea="reset">Reset</button></div>
 <div class="infobox" id="seaInfo">Try each change and watch the water level.</div></div>`}
};

/* =================== CHAPTER 2: Properties of materials =================== */
/* First 20 elements: [atomic number, symbol, name, mass number, state at room temperature, type] */
const EL=[
 [1,'H','hydrogen',1,'gas','non'],[2,'He','helium',4,'gas','non'],[3,'Li','lithium',7,'solid','metal'],[4,'Be','beryllium',9,'solid','metal'],
 [5,'B','boron',11,'solid','semi'],[6,'C','carbon',12,'solid','non'],[7,'N','nitrogen',14,'gas','non'],[8,'O','oxygen',16,'gas','non'],
 [9,'F','fluorine',19,'gas','non'],[10,'Ne','neon',20,'gas','non'],[11,'Na','sodium',23,'solid','metal'],[12,'Mg','magnesium',24,'solid','metal'],
 [13,'Al','aluminium',27,'solid','metal'],[14,'Si','silicon',28,'solid','semi'],[15,'P','phosphorus',31,'solid','non'],[16,'S','sulfur',32,'solid','non'],
 [17,'Cl','chlorine',35,'gas','non'],[18,'Ar','argon',40,'gas','non'],[19,'K','potassium',39,'solid','metal'],[20,'Ca','calcium',40,'solid','metal']];
const elBy=k=>EL.find(e=>e[1]===k||e[0]===k);
const shellsOf=n=>{const s=[];let r=n;[2,8,8,8].forEach(c=>{if(r>0){s.push(Math.min(r,c));r-=Math.min(r,c);}});return s;};
const groupOf=z=>{if(z===1)return 1;if(z===2)return 8;if(z<=10)return z-2;if(z<=18)return z-10;return z-18;};
const periodOf=z=>z<=2?1:z<=10?2:z<=18?3:4;

/* Bohr-style atom drawing. opts: electrons, charge, size, anim, hl (highlight outer), label, nucleusText */
let _aid=0;
function atomSVG(z,o={}){
 const n=o.electrons??z, sh=shellsOf(n), S0=o.size||200, c=100, id='a'+(_aid++);
 const R=[30,46,62,78];
 const e=elBy(z);
 let s=`<svg class="atom" viewBox="0 0 200 ${o.label?226:200}" style="width:${S0}px;max-width:100%;margin:0" role="img" aria-label="${e[2]} ${o.charge?'ion':'atom'}, electronic structure ${sh.join(',')}">`;
 const shells=Math.max(sh.length,1);
 for(let i=0;i<shells;i++)s+=`<circle cx="${c}" cy="${c}" r="${R[i]}" fill="none" class="st-muted" stroke-width="1.2"/>`;
 s+=`<circle cx="${c}" cy="${c}" r="19" class="s-nuc"/><text x="${c}" y="${c-2}" text-anchor="middle" style="font-size:9px;font-weight:700;fill:var(--on-nuc)">${z}p</text><text x="${c}" y="${c+9}" text-anchor="middle" style="font-size:9px;fill:var(--on-nuc)">${e[3]-z}n</text>`;
 sh.forEach((k,i)=>{
  const outer=i===sh.length-1;const dur=(14+i*7)*(i%2?-1:1);
  s+=`<g class="${o.anim===false?'':'orbit'}" style="transform-origin:${c}px ${c}px;animation-duration:${Math.abs(dur)}s;animation-direction:${dur<0?'reverse':'normal'}">`;
  for(let j=0;j<k;j++){const a=(j/k)*Math.PI*2-Math.PI/2+(i*.3);const x=c+R[i]*Math.cos(a),y=c+R[i]*Math.sin(a);
   s+=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="5.2" class="${outer&&o.hl?'s-sun':'s-elec'}"/><path d="M-2.6 -2.6L2.6 2.6M2.6 -2.6L-2.6 2.6" stroke="var(--on-elec)" stroke-width="1.3"/></g>`;}
  s+=`</g>`;});
 if(o.charge){s+=`<path d="M14 14 Q6 100 14 186 M186 14 Q194 100 186 186" fill="none" class="st-ink" stroke-width="2"/><text x="190" y="20" style="font-size:16px;font-weight:700">${o.charge}</text>`;}
 if(o.label)s+=`<text x="100" y="218" text-anchor="middle" style="font-size:12px;font-weight:700">${o.label}</text>`;
 return s+`</svg>`;
}
/* simple 3D canvas helper for lattices */
const LOOPS=new Set();
function spin3d(canvas,model,opt={}){
 const ctx=canvas.getContext('2d');let ax=-.5,ay=.6,drag=null,auto=!matchMedia('(prefers-reduced-motion: reduce)').matches;
 const dpr=Math.min(2,window.devicePixelRatio||1);
 const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#888';
 const size=()=>{const w=canvas.clientWidth||320,h=canvas.clientHeight||300;canvas.width=w*dpr;canvas.height=h*dpr;return[w,h];};
 let [W,H]=size();
 canvas.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY,ax,ay];canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;ay=drag[3]+(e.clientX-drag[0])*.01;ax=drag[2]+(e.clientY-drag[1])*.01;});
 canvas.addEventListener('pointerup',()=>{drag=null;});
 const st={hl:null,offset:null};
 function frame(){
  if(!document.body.contains(canvas))return;
  if(canvas.clientWidth*dpr!==canvas.width)[W,H]=size();
  if(auto&&!drag)ay+=.006;
  const m=typeof model==='function'?model(st):model;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const sc=Math.min(W,H)/(m.span||6);const cx=W/2,cy=H/2;
  const P=m.atoms.map(a=>{let[x,y,z]=a.p;const cy1=Math.cos(ay),sy=Math.sin(ay),cx1=Math.cos(ax),sx=Math.sin(ax);
   const x1=x*cy1+z*sy,z1=-x*sy+z*cy1;const y1=y*cx1-z1*sx,z2=y*sx+z1*cx1;const f=6/(6+z2);
   return{sx:cx+x1*sc*f,sy:cy+y1*sc*f,z:z2,f,a};});
  (m.bonds||[]).forEach(([i,j,type])=>{const A=P[i],B=P[j];ctx.strokeStyle=type==='weak'?css('--muted'):css('--bond');ctx.lineWidth=type==='weak'?1.2:3*((A.f+B.f)/2);ctx.setLineDash(type==='weak'?[4,4]:[]);ctx.beginPath();ctx.moveTo(A.sx,A.sy);ctx.lineTo(B.sx,B.sy);ctx.stroke();});
  ctx.setLineDash([]);
  P.slice().sort((a,b)=>b.z-a.z).forEach(p=>{const r=p.a.r*sc*p.f;const col=css(p.a.c);const g=ctx.createRadialGradient(p.sx-r*.35,p.sy-r*.35,r*.1,p.sx,p.sy,r);g.addColorStop(0,'#ffffff');g.addColorStop(.35,col);g.addColorStop(1,col);
   ctx.globalAlpha=p.a.dim?0.22:1;ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.sx,p.sy,r,0,Math.PI*2);ctx.fill();
   if(p.a.ring){ctx.strokeStyle=css('--sun-fill');ctx.lineWidth=3;ctx.stroke();}
   if(p.a.t&&r>9){ctx.fillStyle=p.a.tc||'#fff';ctx.font=`700 ${Math.max(9,r*.7)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.a.t,p.sx,p.sy+1);}
   ctx.globalAlpha=1;});
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
 return st;
}
function naclModel(st){const atoms=[];const n=3;for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){const na=(i+j+k)%2===1;const center=i===1&&j===1&&k===1;
 const neigh=Math.abs(i-1)+Math.abs(j-1)+Math.abs(k-1)===1;
 atoms.push({p:[(i-1)*1.25,(j-1)*1.25,(k-1)*1.25],r:na?.21:.33,c:na?'--na':'--cl',t:na?'+':'−',tc:'#fff',dim:st.hl&&!(center||neigh),ring:st.hl&&center});}
 return{atoms,span:5.6};}
function diamondModel(){let pts=[];
 for(let x=0;x<=5;x++)for(let y=0;y<=5;y++)for(let z=0;z<=5;z++){const ev=x%2===0&&y%2===0&&z%2===0&&(x+y+z)%4===0;const od=x%2===1&&y%2===1&&z%2===1&&((x-1)+(y-1)+(z-1))%4===0;if(ev||od)pts.push([x,y,z]);}
 const near=(a,b)=>Math.abs(Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])-Math.sqrt(3))<.01;
 pts=pts.filter(p=>pts.filter(q=>near(p,q)).length>=2);
 const atoms=pts.map(p=>({p:p.map(v=>(v-2.5)*.55),r:.17,c:'--carbon'}));const bonds=[];
 for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++)if(near(pts[i],pts[j]))bonds.push([i,j]);
 return{atoms,bonds,span:5.2};}
function graphiteModel(st){const atoms=[],bonds=[];const L=3;const off=st.offset||0;
 for(let l=0;l<L;l++){const base=atoms.length;const shift=(l%2?0.7:0)+(l===0?off:0);const pts=[];
  for(let q=-1;q<=1;q++)for(let r=-1;r<=1;r++){const hx=(q+r/2)*1.73,hz=r*1.5;for(let k=0;k<6;k++){const a=Math.PI/3*k+Math.PI/6;pts.push([hx+Math.cos(a)+shift,hz+Math.sin(a)]);}}
  const uniq=[];pts.forEach(p=>{if(!uniq.some(u=>Math.hypot(u[0]-p[0],u[1]-p[1])<.1))uniq.push(p);});
  uniq.forEach(p=>atoms.push({p:[p[0]*.55,(l-1)*1.25,p[1]*.55],r:.16,c:'--carbon'}));
  for(let i=base;i<atoms.length;i++)for(let j=i+1;j<atoms.length;j++){const A=atoms[i].p,B=atoms[j].p;const d=Math.hypot(A[0]-B[0],A[2]-B[2]);if(Math.abs(d-.55)<.05)bonds.push([i,j]);}
 }
 // weak links between layers (a few, for show)
 const byL=l=>atoms.map((a,i)=>[a,i]).filter(([a])=>Math.abs(a.p[1]-(l-1)*1.25)<.01);
 for(let l=0;l<L-1;l++){const A=byL(l),B=byL(l+1);A.filter((x,i)=>i%5===0).forEach(([a,i])=>{let best=null,bd=9;B.forEach(([b,j])=>{const d=Math.hypot(a.p[0]-b.p[0],a.p[2]-b.p[2]);if(d<bd){bd=d;best=j;}});if(best!=null)bonds.push([i,best,'weak']);});}
 return{atoms,bonds,span:7};}

/* ---------- Chapter 2 key words ---------- */
const KEYWORDS2=[
 {id:'atomic number',t:'atomic number',topic:'2.1',d:'The number of protons in an atom. It goes up by one with each element in the Periodic Table.'},
 {id:'mass number',t:'mass number',topic:'2.1',d:'The total number of protons and neutrons in an atom.'},
 {id:'electron shells',t:'electron shells',topic:'2.1',d:'The layers around the nucleus where electrons are found. Also called energy levels.'},
 {id:'energy levels',t:'energy levels',topic:'2.1',d:'Another name for electron shells. Niels Bohr had the idea in 1913.'},
 {id:'electronic structure',t:'electronic structure',topic:'2.1',d:'How the electrons in an atom are arranged in shells, written as numbers. Boron is 2,3.'},
 {id:'electrostatic forces',t:'electrostatic forces',topic:'2.1',d:'The attraction between positive and negative charges. They hold electrons in their shells and hold ions together.'},
 {id:'Periodic Table',t:'Periodic Table',topic:'2.1',d:'The table of all the elements, in order of atomic number. Columns are groups and rows are periods.'},
 {id:'alkali metals',t:'alkali metals',topic:'2.2',d:'The elements in Group 1, such as lithium, sodium and potassium. Each has one electron in its outer shell.'},
 {id:'halogens',t:'halogens',topic:'2.2',d:'The elements in Group 7, such as fluorine, chlorine and bromine. Each has seven electrons in its outer shell.'},
 {id:'noble gases',t:'noble gases',topic:'2.2',d:'The elements in Group 8, such as helium, neon and argon. Their outer shells are full, so they are unreactive and do not form compounds.'},
 {id:'stable',t:'stable',topic:'2.3',d:'An atom or ion is more stable when its outermost electron shell is completely full.'},
 {id:'outermost electron shell',t:'outermost electron shell',topic:'2.3',d:'The shell on the outside of the atom. It is also called the highest energy level.'},
 {id:'chemical bonds',t:'chemical bonds',topic:'2.3',d:'What holds the elements in a compound together. They form when atoms lose, gain or share electrons.'},
 {id:'ion',t:'ion',topic:'2.3',d:'An atom that has lost or gained electrons, so it has an electrical charge. Sodium forms Na⁺ and chlorine forms Cl⁻.'},
 {id:'ionic bond',t:'ionic bond',topic:'2.3',d:'The attraction between a positive ion and a negative ion, as in sodium chloride.'},
 {id:'ionic compounds',t:'ionic compounds',topic:'2.3',d:'Compounds made from ions. They form when a metal reacts with a non-metal.'},
 {id:'covalent bond',t:'covalent bond',topic:'2.3',d:'A chemical bond in which atoms share a pair of electrons. Non-metals bond with each other like this.'},
 {id:'molecule',t:'molecule',topic:'2.3',d:'Atoms joined together by covalent bonds, such as H₂, HCl or NH₃.'},
 {id:'dot and cross diagram',t:'dot and cross diagram',topic:'2.3',d:'A diagram of a covalent bond. One atom\'s electrons are dots and the other atom\'s are crosses.'},
 {id:'lattice',t:'lattice',topic:'2.4',d:'A giant structure of particles in a regular pattern. Sodium chloride ions form a lattice.'},
 {id:'intermolecular forces',t:'intermolecular forces',topic:'2.4',d:'The weak forces between simple molecules. Only a little energy is needed to overcome them.'},
 {id:'macromolecule',t:'macromolecule',topic:'2.4',d:'A very large covalent structure, such as diamond. It has a very high melting point.'},
 {id:'graphite',t:'graphite',topic:'2.4',d:'A giant structure of carbon. Each carbon atom bonds to three others, making layers that slide. It is soft and used in pencils.'},
 {id:'layers',t:'layers',topic:'2.4',d:'In graphite, flat sheets of carbon atoms. Bonds within a layer are strong; bonds between layers are weak.'}
];

const TOPICS2=[
{
 id:'2.1',title:'Atomic structure and the Periodic Table',pages:'48–52',
 goals:['Learn more about the structure of the atom.','Learn how the structure of the Periodic Table is related to the structure of the elements.'],
 hook:{q:'Name the parts of an atom and give one fact about each one. Then use them to describe an atom in a couple of sentences.',a:'Protons have a positive charge. Neutrons have no charge. Both are in the nucleus at the centre. Electrons have a negative charge and are arranged in shells around the nucleus. An atom has the same number of protons and electrons, so it has no overall charge.'},
 big:'The atomic number counts the protons, and electrons fill shells in the order 2, 8, 8. This is the pattern behind the Periodic Table.',
 steps:[
  {t:'The parts of an atom',body:`<p>Every atom has a tiny <b>nucleus</b> in the middle, with <b>electrons</b> around it.</p>
   <ul><li><b>Protons</b> are in the nucleus and have a positive charge (+1).</li><li><b>Neutrons</b> are in the nucleus and have no charge.</li><li><b>Electrons</b> are around the nucleus and have a negative charge (−1).</li></ul>
   <p>An atom has the same number of protons and electrons. The charges cancel out, so an atom has <b>no overall charge</b>.</p>`,
   vis:'atomParts',
   check:C('Why does an atom have no overall charge?',['It has no protons','It has the same number of protons and electrons','Neutrons cancel out the electrons','Electrons have no charge'],1,'Each proton is +1 and each electron is −1. Equal numbers cancel out.')},
  {t:'Atomic number and mass number',body:`<p>The <span class="kw">atomic number</span> tells you how many <b>protons</b> an atom has. It goes up by one with each element in the Periodic Table.</p>
   <p>The <span class="kw">mass number</span> tells you how many <b>protons and neutrons</b> there are altogether.</p>
   <div class="eq">neutrons = mass number − atomic number</div>
   <p>The book uses lithium: atomic number 3 and mass number 7. So lithium has 3 protons, 3 electrons and 7 − 3 = <b>4 neutrons</b>.</p>
   <p class="note">Slide through the first 20 elements and watch the numbers change.</p>`,
   extra:'atomCalc',
   check:C('Boron has atomic number 5 and mass number 11. How many neutrons does it have?',['5','6','11','16'],1,'Neutrons = mass number − atomic number = 11 − 5 = 6.')},
  {t:'Heavier atoms, denser materials',body:`<p>Atoms get heavier as you go from left to right and down the Periodic Table. The higher the mass number, the more mass the atom has. Hydrogen has a mass of 1 and carbon 12, so one carbon atom has 12 times the mass of one hydrogen atom.</p>
   <p>The mass of a fixed volume of a substance is its <b>density</b>, measured in g/cm³. A 1 cm³ piece of sodium has a mass of 0.97 g, but a 1 cm³ piece of iron has a mass of 7.87 g. Iron is <b>more dense</b> than sodium. (You'll learn more about density in Topic 3.1.)</p>`,
   vis:'density',
   check:C('Two cubes are both 1 cm³. Sodium is 0.97 g and iron is 7.87 g. What does this tell you?',['Sodium is more dense than iron','Iron is more dense than sodium','They have the same density','Iron atoms are smaller'],1,'Same volume, more mass, so iron has the greater density (7.87 g/cm³).')},
  {t:'From Rutherford to Bohr',body:`<p>In Stage 8 you met a model of the atom built from the ideas of scientists such as J. J. Thomson and Ernest Rutherford.</p>
   <p>In 1913, the Danish scientist <b>Niels Bohr</b> took Rutherford's model further. He had the idea, and the evidence, that electrons move in different <span class="kw">electron shells</span> (also called <span class="kw">energy levels</span>) around the nucleus. He won the Nobel Prize for this work, and his idea gave us the model we use today.</p>
   <p class="note">Tap the button to see Bohr's change.</p>`,
   vis:'models',
   check:C('What did Niels Bohr add to the model of the atom?',['The nucleus','Neutrons','Electrons arranged in shells (energy levels)','Positive charge'],2,'Bohr showed that electrons are arranged in different shells, or energy levels, around the nucleus.')},
  {t:'Filling the shells',body:`<p>The way the electrons are arranged in shells is the atom's <span class="kw">electronic structure</span>.</p>
   <ul><li>The first shell holds only <b>2</b> electrons.</li><li>The second and third shells hold up to <b>8</b> each.</li><li>The first shell always fills before electrons go into the second.</li></ul>
   <p>We write the structure as numbers. Boron is <b>2,3</b>: two electrons in the first shell and three in the next. Electrons are held in their shells by <span class="kw">electrostatic forces</span>.</p>
   <p class="note">Add electrons one at a time and watch the shells fill.</p>`,
   extra:'shellFill',
   check:C('Magnesium has 12 electrons. What is its electronic structure?',['2,10','2,8,2','8,4','2,2,8'],1,'2 in the first shell, 8 in the second, and the remaining 2 in the third: 2,8,2.')}
 ],
 mistakes:[
  ['The mass number is the number of neutrons.','The mass number is protons plus neutrons. Subtract the atomic number to get the neutrons.'],
  ['Any shell can hold 8 electrons.','The first shell holds only 2. The second and third hold up to 8.'],
  ['Atoms have a charge because they contain charged particles.','The positive protons and negative electrons are equal in number, so an atom has no overall charge.']
 ],
 bq:[
  {p:'p. 51',q:'How many electrons are there in an atom of carbon?',a:'6. Carbon\'s atomic number is 6, so it has 6 protons and 6 electrons (2,4).'},
  {p:'p. 51',q:'How many protons are there in an atom of beryllium?',a:'4 (its atomic number).'},
  {p:'p. 51',q:'Use the Periodic Table. How many neutrons are there in an atom of boron?',a:'Mass number 11 − atomic number 5 = 6 neutrons.'},
  {p:'p. 51',q:'Draw a diagram to show the structure of an atom of magnesium.',a:'A nucleus with 12 protons and 12 neutrons, and 12 electrons arranged 2,8,2: two in the first shell, eight in the second and two in the third.'},
  {p:'p. 51',q:'What is the name of the element that has the electronic structure 2,8,3?',a:'Aluminium. 2 + 8 + 3 = 13 electrons, so the atomic number is 13.'},
  {p:'p. 51',q:'Draw a labelled atomic diagram of the element fluorine.',a:'Nucleus with 9 protons and 10 neutrons (mass number 19). Electrons arranged 2,7: two in the first shell and seven in the second. Label the nucleus, protons, neutrons, electrons and shells.'},
  {p:'p. 51',q:'How is the model of the atom we use today different from the Rutherford model?',a:'In today\'s model (from Niels Bohr, 1913) the electrons are arranged in separate shells, or energy levels, around the nucleus.'}
 ],
 checklist:['I can draw and describe a model of an atom.','I can interpret information about the electronic structure of an atom.','I can explain how the elements are arranged in the Periodic Table.']
},
{
 id:'2.2',title:'Trends in groups within the Periodic Table',pages:'53–59',
 goals:['Learn about the similarities between elements in the same group.','Relate the structure of the Periodic Table to the structure of the elements.','Use the Periodic Table to predict the structure and properties of elements.','Make careful observations.'],
 hook:{q:'Use the Periodic Table to find: a metal in the same group as magnesium, a metal in the same period as magnesium, a non-metallic solid in the same period, and a gas in the same period.',a:'Same group (Group 2): beryllium or calcium. Same period (period 3) metals: sodium or aluminium. Non-metallic solids in period 3: phosphorus or sulfur. Gases in period 3: chlorine or argon. Try it on the table in the first step.'},
 big:'Elements in the same group have the same number of electrons in their outer shell, so they behave in similar ways, and their properties change in a steady trend down the group.',
 steps:[
  {t:'Groups and periods',body:`<p>In the <span class="kw">Periodic Table</span>, the columns are called <b>groups</b> and the rows are called <b>periods</b>. Elements in the same group have similar properties.</p>
   <p>The metals are on the left of the table and the non-metals are on the right.</p>
   <p class="note">Tap an element to see its details, or use the buttons to light up a group.</p>`,
   extra:'ptable',
   check:C('Which element is in the same group as magnesium?',['Sodium','Calcium','Aluminium','Chlorine'],1,'Magnesium and calcium are both in Group 2. Sodium and aluminium are in the same period, not the same group.')},
  {t:'Group 1: the alkali metals',body:`<p>Group 1 is called the <span class="kw">alkali metals</span>. It includes lithium, sodium and potassium, which have properties in common.</p>
   <p>Going down the group, the atomic number and mass number increase, so the <b>atoms get bigger</b>. The <b>melting points go down</b>. Rubidium is next in the group, so we can predict that its melting point is lower than 63 °C.</p>
   <p class="note">Switch between melting and boiling points, then make your prediction for rubidium.</p>`,
   vis:'group1chart',
   check:C('What is the trend in the boiling points of the Group 1 metals in the table?',['They increase down the group','They decrease down the group','They stay the same','There is no pattern'],1,'Lithium 1360 °C, sodium 900 °C, potassium 777 °C: they decrease down the group.')},
  {t:'Reacting with water',body:`<p>Your teacher may show you how lithium, sodium and potassium react with water. These metals are stored in a special way, and only a small piece is cut off and dropped into a large trough of water.</p>
   <div class="safety"><b>Safety:</b> this is a teacher demonstration only. Everyone wears safety glasses, and a safety screen protects the whole class. The metal is handled with long forceps.</div>
   <p>The reactions get more violent going down the group. The book's Check your progress table describes them: lithium gives off bubbles of gas and some heat, potassium gives off so much heat that it catches fire, and rubidium explodes hard enough to crack its container.</p>
   <p class="note">Drop each metal in and watch. For sodium, make a prediction first.</p>`,
   extra:'waterReact',
   check:C('Which of these reacts most violently with water?',['Lithium','Sodium','Potassium','They all react the same way'],2,'Reactivity increases down Group 1, so potassium reacts most violently of these three.')},
  {t:'Why Group 1 metals are alike',body:`<p>Lithium, sodium and potassium have similar properties, and they have similar atomic structures too.</p>
   <ul><li><b>Lithium</b>: 3 protons, 3 electrons, 4 neutrons. Structure <b>2,1</b>.</li><li><b>Sodium</b>: 11 protons, 11 electrons, 12 neutrons. Structure <b>2,8,1</b>.</li><li><b>Potassium</b>: 19 protons, 19 electrons, 20 neutrons. Structure <b>2,8,8,1</b>.</li></ul>
   <p>Each one has <b>one electron in its outer shell</b>, and all its inner shells are full. Going down the group, each atom has one more shell, so the atoms get bigger.</p>`,
   vis:'group1atoms',
   check:C('What do all the Group 1 atoms have in common?',['Two electrons in the outer shell','One electron in the outer shell','A full outer shell','The same number of neutrons'],1,'One outer electron. That\'s also why they are called Group 1.')},
  {t:'Group 7: the halogens',body:`<p>Group 7 is called the <span class="kw">halogens</span>. It includes fluorine, chlorine and bromine. They are non-metals with properties in common. This part of the topic is extension material.</p>
   <p>Fluorine and chlorine are gases at room temperature, and bromine is a liquid. <b>Fluorine is the most reactive</b>, then chlorine, and bromine is the least reactive of the three. Going down the group, the colour gets darker and the melting and boiling points increase.</p>
   <p>Fluorine is <b>2,7</b> and chlorine is <b>2,8,7</b>. Each has <b>seven electrons in its outer shell</b>.</p>`,
   vis:'halogens',
   check:C('Iodine is the next element down Group 7 after bromine. What do you predict?',['It is more reactive than bromine','It is less reactive than bromine','It is a gas at room temperature','It has a lower boiling point than bromine'],1,'Reactivity decreases down Group 7, so iodine should be less reactive than bromine. Its melting and boiling points should be higher.')},
  {t:'Group 8: the noble gases',body:`<p>Group 8 includes helium, neon and argon. They are all gases. They are <b>inert</b> (unreactive) and do not form compounds. They are called the <span class="kw">noble gases</span>.</p>
   <p>Helium is 2, neon is 2,8 and argon is 2,8,8. In every noble gas, <b>all the shells are full</b>.</p>
   <p class="note">Look at the trend, then predict for krypton, the next gas down the group.</p>`,
   vis:'noble',
   check:C('What is the trend in melting points down Group 8?',['They decrease','They increase','They stay at −270 °C','There is no trend'],1,'Helium −270 °C, neon −249 °C, argon −189 °C: they increase down the group.')}
 ],
 mistakes:[
  ['Melting points go up down every group.','Not in Group 1. There, melting and boiling points go down. In Groups 7 and 8 they go up.'],
  ['Reactivity increases down every group.','In Group 1 it increases down the group, but in Group 7 it decreases: fluorine is the most reactive.'],
  ['Noble gases react slowly.','Noble gases are inert. Their shells are full, so they do not form compounds.']
 ],
 bq:[
  {p:'p. 54',q:'Where in the Periodic Table do you find the metals?',a:'On the left-hand side (and in the middle) of the Periodic Table. The non-metals are on the right.'},
  {p:'p. 54',q:'What is the trend in the boiling points of the Group 1 elements?',a:'They decrease down the group: lithium 1360 °C, sodium 900 °C, potassium 777 °C.'},
  {p:'p. 54',q:'What prediction can you make about the boiling point of rubidium?',a:'It will be lower than potassium\'s boiling point of 777 °C.'},
  {p:'p. 54',q:'How many more electrons than lithium does sodium have?',a:'8 more. Lithium has 3 electrons and sodium has 11.'},
  {p:'p. 55',q:'Suggest why rubidium, the next element in Group 1, is not used in schools.',a:'Reactivity increases down Group 1, so rubidium reacts even more violently than potassium. The book describes it exploding with water.'},
  {p:'p. 56',q:'What happens to the size of the atoms as you go down Group 1? What similarity is there in their structure?',a:'The atoms get bigger, because each one has an extra electron shell. They all have one electron in the outer shell, with full inner shells.'},
  {p:'p. 57',q:'Are the halogens metals or non-metals?',a:'Non-metals.'},
  {p:'p. 57',q:'What are the trends in melting point, colour and boiling point in Group 7?',a:'Melting points increase (−220, −101, −7 °C). The colour gets darker (pale yellow, yellowish green, brown). Boiling points increase (−188, −34, 59 °C).'},
  {p:'p. 57',q:'What would you predict about the boiling point, melting point and reactivity of iodine, the next element in Group 7?',a:'Its melting point and boiling point will be higher than bromine\'s, and it will be less reactive than bromine.'},
  {p:'p. 57',q:'The electronic structure of bromine is missing from the table. How many electrons do you predict in its outer shell?',a:'Seven, like all the other halogens.'},
  {p:'p. 58',q:'What similarity is there in the structure of fluorine and chlorine atoms? Suggest why this group is called Group 7.',a:'Both have seven electrons in their outer shell. That is why the group is called Group 7.'},
  {p:'p. 59',q:'What trend in melting points is there in Group 8, and what similarity is there in the structure of the atoms?',a:'Melting points increase down the group (−270, −249, −189 °C). All the atoms have full electron shells.'},
  {p:'p. 59',q:'What predictions can you make about the melting point and boiling point of krypton, the next gas in Group 8?',a:'Both will be higher than argon\'s (melting point −189 °C, boiling point −186 °C).'}
 ],
 checklist:['I can explain how the structure of the Periodic Table is related to the atomic structure of the elements.','I can identify the similarities and differences between the atomic structure of elements in the same group in the Periodic Table.','I can use the Periodic Table to predict the structure and properties of elements.','I can make accurate observations.']
},
{
 id:'2.3',title:'Why elements react to form compounds',pages:'60–70',
 goals:['Describe the structure of an ion and compare it with that of an atom.','Explain how ionic and covalent bonds are formed.','Explain what a molecule is.','Write the formulae of some ionic and covalent compounds.'],
 hook:{q:'Lithium is 2,1 and fluorine is 2,7. Draw the structure of each atom. Which group of the Periodic Table is each element in?',a:'Lithium: 3 electrons, two in the first shell and one in the second. It is in Group 1. Fluorine: 9 electrons, two in the first shell and seven in the second. It is in Group 7. The number in the outer shell matches the group number.'},
 big:'Atoms are most stable with a full outer shell. They get one by losing or gaining electrons to make ions, or by sharing electrons.',
 steps:[
  {t:'Why atoms react',body:`<p>The shell on the outside of an atom is the <span class="kw">outermost electron shell</span>, also called the <span class="kw">highest energy level</span>.</p>
   <p>Atoms are more <span class="kw">stable</span> when their outermost shell is completely full. The noble gases already have full outer shells, so they don't react to form compounds.</p>
   <p>Atoms in all the other groups react, and in doing so they fill their outer shells. The elements in a compound are held together by <span class="kw">chemical bonds</span>, which form in two ways: atoms <b>lose or gain</b> electrons, or atoms <b>share</b> electrons.</p>
   <p class="note">Pick an atom to see how full its outer shell is.</p>`,
   extra:'stable',
   check:C('Why don\'t the noble gases form compounds?',['They are too heavy','Their outer shells are already full','They have no electrons','They are liquids'],1,'Full outer shells make them stable, so they have no need to lose, gain or share electrons.')},
  {t:'Losing and gaining electrons',body:`<p><b>Sodium</b> (2,8,1) reacts by <b>losing</b> its one outer electron. The next shell in becomes the outer shell, and it is full. The atom has become an <span class="kw">ion</span>. It has one more proton than electrons, so its charge is +1: <b>Na⁺</b>, structure [2,8]⁺.</p>
   <p><b>Chlorine</b> (2,8,7) is in Group 7, so its outer shell is almost full. It <b>gains</b> one electron to fill it. Now it has one more electron than protons, so its charge is −1. This chloride ion is written <b>Cl⁻</b>, structure [2,8,8]⁻.</p>
   <p>Both ions are more stable than the atoms they came from.</p>
   <p class="note">Move the electron and watch the ions form.</p>`,
   extra:'transfer',
   check:C('A sodium ion has 11 protons and 10 electrons. What is its charge?',['−1','0','+1','+11'],2,'One more positive proton than negative electrons gives a charge of +1, written Na⁺.')},
  {t:'Ionic bonding',body:`<p>The positive sodium ion and the negative chloride ion attract each other. This attraction is an <span class="kw">ionic bond</span>, and it holds the compound <b>sodium chloride, NaCl</b>, together.</p>
   <p><span class="kw">Ionic compounds</span> are made from ions. They form when a <b>metal</b> reacts with a <b>non-metal</b>. Other Group 1 metals react with Group 7 elements in the same way: lithium chloride, lithium fluoride, potassium chloride and potassium fluoride.</p>
   <p>Some atoms lose or gain more than one electron. Magnesium (2,8,2) loses two electrons to become <b>Mg²⁺</b>. Oxygen (2,6) gains two to become <b>O²⁻</b>. Together they form <b>magnesium oxide, MgO</b>. When magnesium reacts with chlorine, two chlorine atoms each gain one electron, so the formula is <b>MgCl₂</b>.</p>
   <p class="note">This is the book's Activity 2.3.1. Choose a metal and a non-metal to build the compound.</p>`,
   extra:'ionicBuilder',
   check:C('Calcium forms Ca²⁺ ions and chlorine forms Cl⁻ ions. What is the formula of calcium chloride?',['CaCl','CaCl₂','Ca₂Cl','Ca₂Cl₃'],1,'One Ca²⁺ needs two Cl⁻ to balance the charges, so the formula is CaCl₂.')},
  {t:'Why some atoms react more easily',body:`<p>In Group 1, <b>potassium is the most reactive</b> and lithium the least. Electrostatic forces between the positive protons and the negative electrons hold electrons in their shells. Potassium's outer electron is <b>furthest from the protons</b>, so it is the easiest to pull away. Lithium's outer electron is close to the nucleus, so it is harder to remove.</p>
   <p>In Group 7, <b>fluorine is more reactive than chlorine</b>. Fluorine's outer shell is closest to the protons, so an extra electron is attracted to it more strongly.</p>`,
   vis:'reactivity',
   check:C('Why does potassium lose its outer electron more easily than lithium?',['Potassium has fewer protons','Its outer electron is further from the protons, so it is held less strongly','Potassium has no neutrons','Its outer shell is full'],1,'The further the outer electron is from the nucleus, the weaker the electrostatic force holding it.')},
  {t:'Sharing electrons: covalent bonds',body:`<p>When <b>non-metals</b> join with other non-metals, they <b>share</b> electrons to fill their outer shells. A bond made of a shared pair of electrons is a <span class="kw">covalent bond</span>.</p>
   <p>In <b>hydrogen chloride</b>, hydrogen (one electron, room for two) and chlorine (seven outer electrons, room for eight) share one pair, so both outer shells become full. This makes a <span class="kw">molecule</span> with the formula <b>HCl</b>.</p>
   <p>In a <span class="kw">dot and cross diagram</span>, one atom's electrons are drawn as dots and the other's as crosses. Atoms of the same element can share too: two hydrogen atoms make <b>H₂</b>. Nitrogen (2,5) shares three pairs with three hydrogen atoms to make ammonia, <b>NH₃</b>.</p>
   <p class="note">Choose a molecule and join the atoms.</p>`,
   extra:'covalent',
   check:C('In a hydrogen chloride molecule, how many electrons are shared?',['One','A pair (two)','Seven','Eight'],1,'One covalent bond is one shared pair of electrons.')},
  {t:'A gallery of molecules',body:`<p>Molecules can also be drawn as models with coloured balls for atoms. Some molecules contain atoms of <b>one element</b> (such as O₂). Others contain <b>different elements</b> joined together, so they are compounds (such as H₂O).</p>
   <p class="note">Sort each molecule into "element" or "compound".</p>`,
   extra:'molecules',
   check:C('Which of these molecules is a compound?',['O₂','N₂','CO₂','Cl₂'],2,'CO₂ contains carbon and oxygen, two different elements. The others contain only one element.')}
 ],
 mistakes:[
  ['A chloride ion has a positive charge because it gained something.','It gained a negative electron, so its charge is negative: Cl⁻.'],
  ['The formula of magnesium chloride is MgCl.','Magnesium loses two electrons, and each chlorine gains one, so it takes two chlorines: MgCl₂.'],
  ['Every compound is ionic.','Metal + non-metal makes an ionic compound. Non-metal + non-metal shares electrons and makes a covalent compound.']
 ],
 bq:[
  {p:'p. 65',q:'What is the electronic structure of a sodium atom, and of a sodium ion?',a:'Sodium atom: 2,8,1. Sodium ion: [2,8]⁺.'},
  {p:'p. 65',q:'What is the symbol for a chlorine atom, and for a chlorine (chloride) ion?',a:'Atom: Cl. Ion: Cl⁻.'},
  {p:'p. 65',q:'Draw the electronic structure of a potassium ion.',a:'Potassium (2,8,8,1) loses its one outer electron. The ion is [2,8,8]⁺: three full shells, with brackets and a + charge.'},
  {p:'p. 65',q:'Draw the electronic structure for a fluorine ion.',a:'Fluorine (2,7) gains one electron. The ion is [2,8]⁻: a full second shell, with brackets and a − charge.'},
  {p:'p. 65',q:'Potassium is more reactive than lithium because it can lose an electron more easily. Why is this?',a:'Potassium\'s outer electron is further from the protons in the nucleus, so the electrostatic attraction holding it is weaker and it is easier to remove.'},
  {p:'p. 65',q:'Fluorine is more reactive than chlorine because it can gain an electron more easily. Why is this?',a:'Fluorine\'s outer shell is closer to the protons, so an extra electron is attracted more strongly by the electrostatic forces.'},
  {p:'p. 66',q:'How many chloride ions react with one calcium ion to form calcium chloride? Write the formula.',a:'Two. Calcium loses two electrons (Ca²⁺), and each chlorine gains one (Cl⁻). Formula: CaCl₂.'},
  {p:'p. 66',q:'Write the chemical formula for calcium oxide.',a:'CaO. Calcium loses two electrons and oxygen gains two, like magnesium oxide (MgO).'},
  {p:'p. 70',q:'Which of the nine molecules on page 70 are compounds?',a:'Hydrogen chloride (HCl), ammonia (NH₃), methane (CH₄), water (H₂O) and carbon dioxide (CO₂). The others (H₂, O₂, Cl₂, N₂) are elements.'},
  {p:'p. 70',q:'Is calcium chloride an ionic or a covalent compound? Give a reason.',a:'Ionic. It is made when a metal (calcium) reacts with a non-metal (chlorine), so electrons are transferred and ions form.'},
  {p:'p. 70',q:'Write the formula for a molecule of methane, of carbon dioxide and of nitrogen.',a:'Methane CH₄, carbon dioxide CO₂, nitrogen N₂.'}
 ],
 checklist:['I can show the differences between the structure of an ion and an atom.','I can explain how ionic and covalent bonds are formed.','I can explain what a molecule is.','I can write the formulae of some ionic and covalent compounds.']
},
{
 id:'2.4',title:'Simple and giant structures',pages:'71–81',
 goals:['Learn how giant structures are formed.','Compare the properties of ionic and covalent substances.','Explain how the structures of these substances relate to their properties.'],
 hook:{q:'Explain how sodium and chlorine atoms join to make sodium chloride. How is that different from the way two oxygen atoms join to make an oxygen molecule?',a:'Sodium gives one electron to chlorine, making Na⁺ and Cl⁻ ions that attract each other (an ionic bond). Two oxygen atoms are both non-metals, so they share electrons instead (covalent bonds).'},
 big:'Structure decides properties. Giant structures are very hard to melt, while simple molecules melt and boil easily.',
 steps:[
  {t:'Giant ionic lattices',body:`<p>In sodium chloride, the Na⁺ and Cl⁻ ions have equal and opposite charges, so they are strongly attracted. These electrostatic forces act <b>in all directions</b> and form ionic bonds.</p>
   <p>The ions build up a giant structure called a <span class="kw">lattice</span>. Each sodium ion is surrounded by <b>six chloride ions</b>. Because the ions are arranged in a regular pattern, sodium chloride forms crystals with a regular shape.</p>
   <p class="note">Drag to turn the lattice. Tap the button to see one sodium ion's neighbours.</p>`,
   vis:'lattice',
   check:C('In the sodium chloride lattice, how many chloride ions surround each sodium ion?',['Two','Four','Six','Eight'],2,'Each Na⁺ has six Cl⁻ neighbours: above, below, left, right, front and back.')},
  {t:'Simple molecules',body:`<p>Many covalent substances are made of <b>simple molecules</b>, such as oxygen, carbon dioxide and methane. The covalent bonds inside each molecule are <b>very strong</b>. But the forces <b>between</b> the molecules are weak. These are called <span class="kw">intermolecular forces</span>.</p>
   <p>Only a little energy is needed to overcome these weak forces, so simple molecular substances have low melting and boiling points.</p>
   <p class="note">Heat the carbon dioxide. The molecules move apart, but each molecule stays in one piece.</p>`,
   extra:'heatMolecules',
   check:C('When carbon dioxide boils, what is overcome?',['The covalent bonds inside each molecule','The weak forces between the molecules','The nucleus of each atom','The ionic bonds'],1,'Boiling only overcomes the weak intermolecular forces. The strong bonds inside the molecules stay.')},
  {t:'Diamond: a giant covalent structure',body:`<p>Some covalent substances have giant structures. Silicon dioxide is one. Diamond is another.</p>
   <p>In diamond, each carbon atom forms <b>four strong covalent bonds</b>, building a rigid three-dimensional lattice. Diamond is the <b>hardest material on Earth</b>. It is used in jewellery, and diamond powder is used on cutting and drilling tools.</p>
   <p>Very large covalent structures like this are called <span class="kw">macromolecules</span>.</p>`,
   vis:'diamond',
   check:C('Why is diamond so hard?',['Its atoms are held by weak forces','Each carbon atom forms four strong covalent bonds in a rigid 3D lattice','It is made of ions','It contains metal atoms'],1,'Four strong bonds per atom, locked in a rigid 3D lattice.')},
  {t:'Graphite: layers that slide',body:`<p>Carbon also forms a giant structure for a very soft material, <span class="kw">graphite</span>. It is the "lead" in pencils and is used to lubricate moving parts in machines.</p>
   <p>In graphite, each carbon atom bonds with <b>three</b> other atoms. This makes flat <span class="kw">layers</span>. The bonds within a layer are strong, but the bonds between the layers are weak. The layers slide over each other easily, which is why graphite feels soft and comes away onto paper when you write.</p>
   <p class="note">Slide the top layer, then draw with the "pencil".</p>`,
   vis:'graphite',
   check:C('Why are diamond and graphite so different, if both are made of carbon?',['They contain different atoms','Their atoms are bonded in different structures','Graphite is a compound','Diamond is ionic'],1,'Same atoms, different structures: four bonds in a rigid lattice (diamond) or three bonds in sliding layers (graphite).')},
  {t:'Melting and boiling points',body:`<p><b>Ionic substances</b> have very high melting and boiling points, because very strong electrostatic forces hold the ions together.</p>
   <p><b>Simple covalent substances</b> have low melting and boiling points, because the forces between their molecules are weak.</p>
   <p class="note">The bars show the book's data table on page 76. Decide whether each substance is ionic or made of simple molecules.</p>`,
   extra:'mpChart',
   check:C('Ammonia melts at −77 °C and boils at −34 °C. At room temperature it is a…',['Solid','Liquid','Gas','It depends on the container'],2,'Room temperature is far above −34 °C, so ammonia has already boiled: it is a gas.')},
  {t:'Conducting electricity',body:`<p>Ionic compounds <b>conduct electricity when they are dissolved in water or melted</b>. The ions have an electrical charge, and they must be free to move to carry it.</p>
   <p>Covalent substances made from simple molecules <b>do not</b> conduct electricity.</p>
   <div class="safety"><b>Safety:</b> some crystals and solutions, such as copper sulfate, are irritants. Avoid touching them, and wear gloves and safety glasses.</div>
   <p class="note">Test each sample in the circuit and watch the bulb.</p>`,
   extra:'circuit',
   check:C('Why doesn\'t a solid crystal of sodium chloride conduct electricity?',['It has no ions','Its ions are held in place and cannot move','It is covalent','The bulb is broken'],1,'The ions are there, but in the solid lattice they cannot move, so they cannot carry the charge.')},
  {t:'Chapter project: building the Periodic Table',body:`<p>Scientists often make sense of lots of information by grouping similar things. As more elements were discovered, three scientists helped build the Periodic Table we use today.</p>
   <p class="note">The book's project asks you to research these scientists and present what you find. Step through the story here first.</p>`,
   extra:'ptHistory',
   check:C('What did Mendeleev do that Newlands did not?',['Arranged elements by mass','Left gaps for undiscovered elements and predicted their properties','Grouped elements in threes','Discovered the electron'],1,'Mendeleev left gaps so the pattern continued, and his predictions for the missing elements turned out to be correct.')}
 ],
 mistakes:[
  ['Boiling water breaks water molecules apart.','Boiling a simple molecular substance only overcomes the weak forces between molecules. The molecules stay whole.'],
  ['Solid salt conducts electricity because it has ions.','The ions must be free to move. Solid salt doesn\'t conduct; dissolved or melted salt does.'],
  ['All covalent substances have low melting points.','Simple molecules do. Giant covalent structures (macromolecules) such as diamond have very high melting points.']
 ],
 bq:[
  {p:'p. 75',q:'How is an ionic bond different from a covalent bond?',a:'In an ionic bond, electrons are transferred: one atom loses electrons and the other gains them, and the opposite ions attract. In a covalent bond, two atoms share a pair of electrons.'},
  {p:'p. 75',q:'When a metal joins with a non-metal, is a covalent or an ionic compound made?',a:'An ionic compound.'},
  {p:'p. 75',q:'Oxygen atoms join together to form an oxygen molecule. Explain what the word molecule means.',a:'A molecule is a group of atoms joined together by covalent bonds, where the atoms share electrons. An oxygen molecule is O₂.'},
  {p:'p. 75',q:'What is a macromolecule? Give an example.',a:'A very large covalent structure in which huge numbers of atoms are joined by strong covalent bonds. Examples: diamond, graphite, silicon dioxide.'},
  {p:'p. 76',q:'Is magnesium chloride an ionic compound or a simple molecule with covalent bonds? Is ammonia? Give reasons.',a:'Magnesium chloride is ionic: very high melting point (714 °C) and boiling point (1412 °C). Ammonia is a simple molecule: low melting point (−77 °C) and boiling point (−34 °C).'},
  {p:'p. 76',q:'Why do magnesium chloride and calcium oxide have high melting points, and why do methane and chlorine have low ones?',a:'Magnesium chloride and calcium oxide are ionic, so very strong electrostatic forces hold their ions together. Methane and chlorine are simple molecules with only weak forces between the molecules, which need little energy to overcome.'},
  {p:'p. 77',q:'A substance melts at 3078 °C and boils at 4300 °C. What sort of chemical bonds does it have? Give a reason.',a:'Strong bonds in a giant structure (ionic, or a giant covalent structure). Only giant structures need this much energy to melt; simple molecules melt at low temperatures.'},
  {p:'p. 77',q:'Silicon dioxide (sand) is hard and melts at 1610 °C. Which properties suggest it has a giant covalent structure?',a:'It is hard and has a very high melting point. Its elements, silicon and oxygen, are both non-metals, so the bonds are covalent; a high melting point means a giant structure, not simple molecules.'},
  {p:'p. 79',q:'Did all the ionic crystals conduct electricity? Explain. Predict what would happen with a covalent substance.',a:'No. In solid crystals the ions are held in place and cannot move, so they cannot carry charge. Dissolved, the ions are free to move and they conduct. A simple covalent substance would not conduct at all.'}
 ],
 checklist:['I can explain how giant structures are formed.','I can compare the properties of ionic and covalent substances.','I can relate the structures of these substances to their properties.']
}
];

const CYP2=[
 {p:'2.1',m:8,q:'Page 82 gives a table for four Group 1 elements, in Periodic Table order: lithium (melting point 180 °C, boiling point 1342 °C, gives off bubbles of gas and heat), sodium (boiling point 883 °C), potassium (melting point 63 °C, gives off gas and so much heat it catches fire) and rubidium (melting point 39 °C, boiling point 688 °C, explodes so hard the container cracks). Use the trends to predict: (a) the melting point of sodium [1] (b) the boiling point of potassium [1]. (c) All the elements make a gas with water. Name it. [1] (d) Predict the reaction of sodium with water. [1] (e) Match the mass numbers 23, 7, 39 and 85 to the elements. [1] (f) What does the mass number tell you? [1] (g) Draw the electronic structure of sodium, 2,8,1. [3]',a:'(a) Between 63 °C and 180 °C. (Page 54 of your book gives 98 °C.) (b) Between 688 °C and 883 °C. (Page 54 gives 777 °C.) (c) Hydrogen. The book doesn\'t name this gas in Chapter 2, so check it with your teacher. (d) More vigorous than lithium but less than potassium: it gives off bubbles of gas and more heat than lithium, but does not catch fire like potassium. (e) Lithium 7, sodium 23, potassium 39, rubidium 85. (f) The total number of protons and neutrons in the nucleus. (g) A nucleus with 11 protons and 12 neutrons; 2 electrons in the first shell, 8 in the second and 1 in the third.'},
 {p:'2.2',m:3,q:'The fluorine atom has the electronic structure 2,7. (a) Draw the electronic structure of a fluorine ion. [1] (b) Why is a fluorine ion more stable than a fluorine atom? [1] (c) The symbol for a fluorine atom is F. Write the symbol for a fluorine ion. [1]',a:'(a) [2,8]⁻: two electrons in the first shell and eight in the second, with brackets and a − charge. (b) Its outer shell is now full. (c) F⁻'},
 {p:'2.3',m:5,q:'Does each statement apply to a substance with covalent bonds or ionic bonds? (a) A metal joins with a non-metal to form a compound. (b) Two atoms share electrons. (c) Two non-metals join together. (d) A compound dissolved in water conducts electricity. (e) Atoms gain or lose electrons.',a:'(a) Ionic (b) Covalent (c) Covalent (d) Ionic (e) Ionic'},
 {p:'2.4',m:1,q:'Write the formula for a molecule of methane (the model on page 83 shows one carbon atom joined to four hydrogen atoms).',a:'CH₄'},
 {p:'2.5',m:2,q:'Look at the sodium chloride lattice on page 83. (a) What holds the lattice together? [1] (b) What does this lattice structure tell you about the melting point and boiling point of sodium chloride? [1]',a:'(a) Strong electrostatic forces between the positive sodium ions and the negative chloride ions (ionic bonds), acting in all directions. (b) They are very high (the book gives 801 °C and 1413 °C).'}
];

const QUIZ2=[
 C('Which particle has no charge?',['Proton','Neutron','Electron','Ion'],1,'Neutrons have no charge. Protons are +1 and electrons −1.'),
 C('Lithium has atomic number 3 and mass number 7. How many neutrons does it have?',['3','4','7','10'],1,'7 − 3 = 4.'),
 C('How many electrons fit in the first shell?',['1','2','8','18'],1,'The first shell holds only 2.'),
 C('Which element has the electronic structure 2,8,3?',['Sodium','Magnesium','Aluminium','Neon'],2,'2 + 8 + 3 = 13 electrons = aluminium.'),
 C('Who came up with the idea of electron shells in 1913?',['Rutherford','Thomson','Niels Bohr','Mendeleev'],2,'Niels Bohr, who won a Nobel Prize for it.'),
 C('What are the columns of the Periodic Table called?',['Periods','Groups','Shells','Triads'],1,'Columns are groups. Rows are periods.'),
 C('What happens to melting points going down Group 1?',['They increase','They decrease','They stay the same','They become negative'],1,'Lithium 180 °C, sodium 98 °C, potassium 63 °C.'),
 C('Which halogen is the most reactive?',['Fluorine','Chlorine','Bromine','Iodine'],0,'Fluorine. Reactivity decreases down Group 7.'),
 C('Bromine at room temperature is a…',['Solid','Liquid','Gas','Plasma'],1,'Bromine is a brown liquid. Fluorine and chlorine are gases.'),
 C('Argon\'s electronic structure is…',['2,8','2,8,8','2,8,7','2,8,8,1'],1,'Argon has 18 electrons: 2,8,8, all shells full.'),
 C('What is the symbol for a magnesium ion?',['Mg⁺','Mg²⁺','Mg⁻','Mg²⁻'],1,'Magnesium loses two electrons, so its charge is 2+.'),
 C('An oxide ion has the structure…',['[2,6]²⁻','[2,8]²⁻','[2,8]²⁺','[2,8,8]⁻'],1,'Oxygen (2,6) gains two electrons: [2,8]²⁻.'),
 C('Which pair would form an ionic compound?',['Hydrogen and chlorine','Potassium and fluorine','Nitrogen and hydrogen','Carbon and oxygen'],1,'Potassium is a metal and fluorine a non-metal: ionic.'),
 C('In a dot and cross diagram, what does a covalent bond look like?',['One electron moving across','A shared pair of electrons','Two nuclei touching','A plus and minus sign'],1,'A covalent bond is a shared pair of electrons.'),
 C('What is the formula of ammonia?',['NH₃','NH₄','N₂H','HN'],0,'One nitrogen shares three pairs with three hydrogens: NH₃.'),
 C('How many covalent bonds does each carbon atom form in graphite?',['Two','Three','Four','Six'],1,'Three, making flat layers. In diamond it is four.'),
 C('Sodium chloride conducts electricity when…',['It is a solid crystal','It is dissolved in water or melted','It is cold','Never'],1,'Then the ions are free to move and carry charge.'),
 C('Who left gaps in his table for elements not yet discovered?',['Dobereiner','Newlands','Mendeleev','Bohr'],2,'Mendeleev, in 1869. His predictions turned out to be correct.')
];

/* =================== CHAPTER 2 VISUALS =================== */
Object.assign(VIS,{
atomParts(){return `<div class="vis" id="parts"><div class="row" style="justify-content:center">${atomSVG(3,{size:240,label:'a lithium atom'})}</div>
 <div class="row" style="justify-content:center"><button class="btn" data-part="p">Proton</button><button class="btn" data-part="n">Neutron</button><button class="btn" data-part="e">Electron</button></div>
 <div class="infobox" id="partInfo">Tap a particle name to learn about it.</div></div>`},
density(){return `<div class="vis"><svg viewBox="0 0 380 220" role="img" aria-label="Balance: 1 cubic centimetre of iron is heavier than 1 cubic centimetre of sodium">
 <rect x="182" y="70" width="16" height="120" rx="4" class="s-muted"/><rect x="130" y="188" width="120" height="12" rx="6" class="s-muted"/>
 <g class="beam"><rect x="60" y="62" width="260" height="8" rx="4" class="s-ink"/>
  <line x1="80" y1="70" x2="80" y2="110" class="st-ink" stroke-width="1.5"/><line x1="300" y1="70" x2="300" y2="110" class="st-ink" stroke-width="1.5"/>
  <rect x="40" y="110" width="80" height="6" rx="3" class="s-ink"/><rect x="260" y="110" width="80" height="6" rx="3" class="s-ink"/>
  <g transform="translate(62 72)"><rect width="36" height="36" rx="4" fill="#C9CED6" stroke="var(--ink)"/><text x="18" y="23" text-anchor="middle" style="font-weight:700;fill:#1b2430">Na</text></g>
  <g transform="translate(282 72)"><rect width="36" height="36" rx="4" fill="#6E7782" stroke="var(--ink)"/><text x="18" y="23" text-anchor="middle" style="font-weight:700;fill:#fff">Fe</text></g>
 </g>
 <circle cx="190" cy="66" r="6" class="s-sun"/>
 <text x="80" y="150" text-anchor="middle">sodium</text><text x="80" y="165" text-anchor="middle" class="small">1 cm³ = 0.97 g</text>
 <text x="300" y="150" text-anchor="middle">iron</text><text x="300" y="165" text-anchor="middle" class="small">1 cm³ = 7.87 g</text>
</svg><div class="row" style="justify-content:center;gap:4px" aria-label="12 hydrogen atoms balance 1 carbon atom">${'<span class="dot h"></span>'.repeat(12)}<span class="tiny" style="margin:0 8px">have the same mass as</span><span class="dot c"></span></div>
<p class="cap">Same volume, very different mass. Iron is more dense. Below: 12 hydrogen atoms have the same mass as 1 carbon atom.</p></div>`},
models(){let el='';const pts=[[-38,-20],[30,-44],[44,24],[-20,40],[8,10],[-48,14],[22,-12],[-6,-46],[50,-4],[-30,-48],[36,46]];
 pts.forEach((p,i)=>{el+=`<g class="mel" data-i="${i}" style="transform:translate(${100+p[0]}px,${100+p[1]}px)"><circle r="5.5" class="s-elec"/></g>`;});
 return `<div class="vis" id="modelsV"><div class="row" style="justify-content:center;gap:24px;align-items:center">
 <svg viewBox="0 0 200 200" style="width:230px;max-width:100%;margin:0" role="img" aria-label="Model of the atom"><circle id="mShell1" cx="100" cy="100" r="30" fill="none" class="st-muted" stroke-width="1.2" style="opacity:0;transition:opacity .8s"/><circle id="mShell2" cx="100" cy="100" r="50" fill="none" class="st-muted" stroke-width="1.2" style="opacity:0;transition:opacity .8s"/><circle id="mShell3" cx="100" cy="100" r="70" fill="none" class="st-muted" stroke-width="1.2" style="opacity:0;transition:opacity .8s"/><circle cx="100" cy="100" r="14" class="s-nuc"/><text x="100" y="104" text-anchor="middle" style="font-size:11px;font-weight:700;fill:var(--on-nuc)">+</text>${el}</svg>
 <div style="max-width:300px"><h4 id="mTitle" style="font-size:19px">Stage 8 model</h4><p id="mText" style="font-size:15px">A positive nucleus in the centre, with electrons around it. This is the model built from the ideas of Thomson and Rutherford.</p></div></div>
 <div class="row" style="justify-content:center"><button class="btn primary" id="mToggle">Show Bohr's model (1913)</button></div></div>`},
group1chart(){return `<div class="vis" id="g1"><div class="row" style="justify-content:center"><button class="btn" data-g1="mp" aria-pressed="true">Melting points</button><button class="btn" data-g1="bp" aria-pressed="false">Boiling points</button></div>
 <svg viewBox="0 0 380 230" id="g1svg" role="img" aria-label="Bar chart of Group 1 melting points"></svg>
 <div class="row" id="rbRow" style="justify-content:center"><label for="rbGuess" class="tiny">Your rubidium prediction:</label><input type="range" id="rbGuess" min="0" max="200" value="120" style="flex:1;max-width:220px"><b id="rbVal" style="font-family:var(--mono)">120 °C</b><button class="btn primary" id="rbCheck">Check</button></div>
 <div class="infobox" id="g1Info">Drag the slider to predict rubidium's melting point, then check.</div></div>`},
group1atoms(){return `<div class="vis"><div class="row" style="justify-content:center;gap:6px">${atomSVG(3,{size:150,hl:1,label:'lithium 2,1'})}${atomSVG(11,{size:170,hl:1,label:'sodium 2,8,1'})}${atomSVG(19,{size:190,hl:1,label:'potassium 2,8,8,1'})}</div><p class="cap">The single outer electron (gold) is further from the nucleus in each atom going down the group.</p></div>`},
halogens(){const H=[['F','fluorine','2,7','pale yellow','gas','-220','-188','#F3EBA0'],['Cl','chlorine','2,8,7','yellowish green','gas','-101','-34','#BFD86A'],['Br','bromine','2,8,?','brown','liquid','-7','59','#8E3B1F']];
 return `<div class="vis"><div class="row" style="justify-content:center;gap:18px">${H.map((h,i)=>`<div style="text-align:center;display:grid;gap:4px;justify-items:center"><svg viewBox="0 0 90 140" style="width:96px;margin:0" aria-hidden="true">
 <rect x="15" y="10" width="60" height="120" rx="10" fill="none" class="st-ink" stroke-width="2"/>
 ${h[4]==='gas'?`<rect x="17" y="14" width="56" height="114" rx="8" fill="${h[7]}" opacity=".75" class="gaspulse" style="animation-delay:${i*.6}s"/>`:`<rect x="17" y="88" width="56" height="40" rx="8" fill="${h[7]}"/><rect x="17" y="30" width="56" height="58" fill="${h[7]}" opacity=".35" class="gaspulse"/>`}
 <rect x="10" y="4" width="70" height="10" rx="3" class="s-muted"/></svg>
 <b>${h[1]}</b><span class="tiny">${h[3]} ${h[4]}</span><span class="tiny" style="font-family:var(--mono)">${h[2]}</span><span class="tiny">mp ${h[5].replace('-','−')} °C · bp ${h[6].replace('-','−')} °C</span></div>`).join('')}</div>
 <div class="trend"><span>most reactive</span><i></i><span>least reactive</span></div><p class="cap">Data from the table on page 57. Bromine's structure is left for you to predict (question 15).</p></div>`},
noble(){return `<div class="vis"><div class="row" style="justify-content:center;gap:6px">${atomSVG(2,{size:130,label:'helium 2'})}${atomSVG(10,{size:160,label:'neon 2,8'})}${atomSVG(18,{size:190,label:'argon 2,8,8'})}</div>
 <table class="dt"><thead><tr><th>Element</th><th>Atomic number</th><th>Mass number</th><th>Melting point</th><th>Boiling point</th></tr></thead><tbody>
 <tr><td>helium, He</td><td>2</td><td>4</td><td>−270 °C</td><td>−269 °C</td></tr><tr><td>neon, Ne</td><td>10</td><td>20</td><td>−249 °C</td><td>−246 °C</td></tr><tr><td>argon, Ar</td><td>18</td><td>40</td><td>−189 °C</td><td>−186 °C</td></tr></tbody></table>
 <div class="row" style="justify-content:center"><span class="tiny">Krypton's boiling point will be…</span><button class="btn" data-kr="lo">lower than argon's</button><button class="btn" data-kr="hi">higher than argon's</button></div><div class="infobox" id="krInfo" hidden></div></div>`},
reactivity(){return `<div class="vis"><div class="row" style="justify-content:center;gap:20px">
 ${atomSVG(3,{size:170,hl:1,anim:false,label:'lithium: held tightly'})}${atomSVG(19,{size:210,hl:1,anim:false,label:'potassium: held loosely'})}</div>
 <div class="row" style="justify-content:center;gap:20px">${atomSVG(9,{size:170,hl:1,anim:false,label:'fluorine 2,7'})}${atomSVG(17,{size:190,hl:1,anim:false,label:'chlorine 2,8,7'})}</div>
 <p class="cap">The gold outer electron is pulled by the positive nucleus. The further away it is, the weaker the pull and the easier it is to lose. That is why potassium is more reactive than lithium. In fluorine the outer shell is closest to the nucleus, so it attracts an extra electron more strongly than chlorine does.</p></div>`},
lattice(){return `<div class="vis"><canvas class="c3d" id="naclC" aria-label="Rotating model of the sodium chloride lattice"></canvas>
 <div class="row" style="justify-content:center"><span class="chip" style="border-color:var(--na)">small purple: Na⁺</span><span class="chip" style="border-color:var(--cl)">large green: Cl⁻</span><button class="btn primary" id="naclHl">Show one sodium ion's neighbours</button></div><p class="cap">Drag to rotate.</p></div>`},
diamond(){return `<div class="vis"><canvas class="c3d" id="diaC" aria-label="Rotating model of the diamond structure"></canvas>
 <div class="row" style="justify-content:center"><span class="chip">each carbon: 4 strong covalent bonds</span><span class="chip">rigid 3D lattice</span><span class="chip">hardest material on Earth</span></div><p class="cap">Drag to rotate.</p></div>`},
graphite(){return `<div class="vis"><canvas class="c3d" id="graC" aria-label="Model of graphite layers"></canvas>
 <div class="row" style="justify-content:center"><button class="btn primary" id="graSlide">Slide the top layer</button><span class="chip">solid lines: strong bonds in a layer</span><span class="chip">dashed: weak bonds between layers</span></div>
 <p class="tiny" style="text-align:center">Draw on the paper with the pencil. Graphite layers rub off and leave a mark.</p><canvas id="paper" class="paper" aria-label="Paper to draw on"></canvas></div>`}
});

/* =================== CHAPTER 2 INTERACTIVE EXTRAS =================== */
Object.assign(EXTRA,{
atomCalc(){return `<div class="vis" id="calc"><div class="row" style="justify-content:center"><label for="zRange" class="tiny">Atomic number</label><input type="range" id="zRange" min="1" max="20" value="3" style="flex:1;max-width:320px"></div>
 <div class="calcgrid"><div id="calcAtom"></div><table class="dt" id="calcTab"></table></div></div>`},
shellFill(){return `<div class="vis" id="fill"><div class="calcgrid"><div id="fillAtom"></div><div style="display:grid;gap:10px;align-content:center"><div class="bigstruct" id="fillStruct">2,1</div><div id="fillName" class="tiny"></div>
 <div class="row"><button class="btn" id="fillMinus">− Remove electron</button><button class="btn primary" id="fillPlus">+ Add electron</button></div></div></div>
 <div class="infobox" id="fillInfo">This is lithium. Add an electron to see where it goes.</div></div>`},
ptable(){return `<div class="vis" id="pt"><div class="row"><button class="btn" data-ptf="g1">Group 1</button><button class="btn" data-ptf="g2">Group 2</button><button class="btn" data-ptf="g7">Group 7</button><button class="btn" data-ptf="g8">Group 8</button><button class="btn" data-ptf="p3">Period 3</button><button class="btn" data-ptf="metal">Metals</button><button class="btn" data-ptf="none">Clear</button></div>
 <div class="ptwrap"><div class="ptgrid">${[1,2,3,4,5,6,7,8].map(g=>`<div class="pth">${g}</div>`).join('')}${EL.map(e=>`<button class="pte ${e[5]}" data-z="${e[0]}" style="grid-column:${groupOf(e[0])};grid-row:${periodOf(e[0])+1}"><small>${e[0]}</small><b>${e[1]}</b><span>${e[2]}</span></button>`).join('')}</div></div>
 <div class="row tiny"><span class="key metal"></span>metal<span class="key non"></span>non-metal<span class="key semi"></span>between metal and non-metal</div>
 <div class="infobox" id="ptInfo"><b>Tap an element.</b> The first 20 elements are shown, with groups as columns and periods as rows.</div></div>`},
waterReact(){return `<div class="vis" id="wr"><canvas id="wrC" class="trough" aria-label="Animation of a metal reacting with water"></canvas>
 <div class="row" style="justify-content:center"><button class="btn" data-m="Li">Lithium</button><button class="btn" data-m="Na">Sodium (predict)</button><button class="btn" data-m="K">Potassium</button><button class="btn" data-m="Rb">Rubidium</button></div>
 <div class="infobox" id="wrInfo">Choose a metal to drop into the water.</div></div>`},
stable(){const L=['Li','Na','K','Mg','Ca','O','F','Cl','He','Ne','Ar'];
 return `<div class="vis" id="stab"><div class="row" style="justify-content:center">${L.map(k=>`<button class="chip" data-st="${k}" aria-pressed="false">${elBy(k)[2]}</button>`).join('')}</div>
 <div class="calcgrid"><div id="stabAtom"></div><div style="display:grid;gap:10px;align-content:center"><div class="slots2" id="stabSlots"></div><div class="infobox" id="stabInfo">Pick an atom.</div></div></div></div>`},
transfer(){return `<div class="vis" id="tr"><svg viewBox="0 0 420 220" id="trSvg" role="img" aria-label="Sodium atom giving an electron to a chlorine atom">
 <g id="trNa" style="transition:transform 1s"><g transform="translate(10 10)">${atomSVG(11,{anim:false}).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g></g>
 <g id="trCl" style="transition:transform 1s"><g transform="translate(210 10)">${atomSVG(17,{anim:false}).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g></g>
 <g id="trE" style="transform:translate(145px,59px)"><circle r="6" class="s-sun"/><path d="M-3 -3L3 3M3 -3L-3 3" stroke="var(--on-elec)" stroke-width="1.4"/></g>
 <text id="trNaQ" x="110" y="214" text-anchor="middle" style="font-weight:700">Na atom 2,8,1</text><text id="trClQ" x="310" y="214" text-anchor="middle" style="font-weight:700">Cl atom 2,8,7</text>
</svg>
 <div class="row" style="justify-content:center"><button class="btn primary" id="trGo">Move the electron</button><button class="btn" id="trReset">Start again</button></div>
 <div class="infobox" id="trInfo">Sodium has one electron in its outer shell (gold). Chlorine has room for one more.</div></div>`},
ionicBuilder(){const M=[['Li',1],['Na',1],['K',1],['Mg',2],['Ca',2]],N=[['F',1],['Cl',1],['O',2]];
 return `<div class="vis" id="ib"><div class="row"><span class="tiny" style="min-width:5em">Metal:</span>${M.map(m=>`<button class="chip" data-ibm="${m[0]}" aria-pressed="${m[0]==='Na'}">${elBy(m[0])[2]}</button>`).join('')}</div>
 <div class="row"><span class="tiny" style="min-width:5em">Non-metal:</span>${N.map(m=>`<button class="chip" data-ibn="${m[0]}" aria-pressed="${m[0]==='Cl'}">${elBy(m[0])[2]}</button>`).join('')}</div>
 <div id="ibOut" class="ibout"></div></div>`},
covalent(){return `<div class="vis" id="cov"><div class="row" style="justify-content:center"><button class="chip" data-mol="HCl" aria-pressed="true">hydrogen chloride</button><button class="chip" data-mol="H2" aria-pressed="false">hydrogen</button><button class="chip" data-mol="NH3" aria-pressed="false">ammonia</button></div>
 <svg viewBox="0 0 420 240" id="covSvg" role="img" aria-label="Dot and cross diagram"></svg>
 <div class="row" style="justify-content:center"><button class="btn primary" id="covJoin">Join the atoms</button><button class="btn" id="covReset">Pull apart</button></div>
 <div class="infobox" id="covInfo"></div></div>`},
molecules(){const M=[['HCl','hydrogen chloride','c',[['Cl',0,0,1.25],['H',1.5,0,.8]]],['H₂','hydrogen','e',[['H',-.6,0,.8],['H',.6,0,.8]]],['NH₃','ammonia','c',[['N',0,0,1.1],['H',-1.1,.9,.8],['H',1.1,.9,.8],['H',0,-1.25,.8]]],
 ['O₂','oxygen','e',[['O',-.7,0,1.05],['O',.7,0,1.05]]],['CH₄','methane','c',[['C',0,0,1.05],['H',-1,-1,.8],['H',1,-1,.8],['H',-1,1,.8],['H',1,1,.8]]],['Cl₂','chlorine','e',[['Cl',-.85,0,1.2],['Cl',.85,0,1.2]]],
 ['H₂O','water','c',[['O',0,0,1.1],['H',-1.05,.85,.8],['H',1.05,.85,.8]]],['N₂','nitrogen','e',[['N',-.75,0,1.1],['N',.75,0,1.1]]],['CO₂','carbon dioxide','c',[['O',-1.6,0,1.05],['C',0,0,1.05],['O',1.6,0,1.05]]]];
 const col={H:'--atomH',Cl:'--cl',N:'--atomN',O:'--atomO',C:'--carbon'};
 return `<div class="vis"><div class="molgrid">${M.map(([f,n,a,at])=>`<div class="srow mol" data-a="${a}"><svg viewBox="-3 -2.2 6 4.4" style="width:110px;height:80px;margin:0" aria-label="${n} molecule">${at.slice().reverse().map(([s,x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r*.8}" fill="var(${col[s]})" stroke="var(--ink)" stroke-width=".05"/><text x="${x}" y="${y+.22}" text-anchor="middle" style="font-size:.6px;font-weight:700;fill:${s==='H'?'#222':'#fff'}">${s}</text>`).join('')}</svg>
 <span class="lbl"><b>${f}</b><br><span class="tiny">${n}</span></span><span class="seg"><button class="btn" data-v="e">element</button><button class="btn" data-v="c">compound</button></span></div>`).join('')}</div></div>`},
heatMolecules(){return `<div class="vis" id="heat"><canvas id="heatC" class="trough" aria-label="Carbon dioxide molecules being heated"></canvas>
 <div class="row" style="justify-content:center"><label for="heatR" class="tiny">Temperature</label><input type="range" id="heatR" min="0" max="100" value="5" style="flex:1;max-width:300px"><b id="heatLbl" style="min-width:5em">solid</b></div>
 <div class="infobox" id="heatInfo"></div></div>`},
mpChart(){return `<div class="vis" id="mp"><div class="ovx"><svg viewBox="0 0 560 300" id="mpSvg" role="img" aria-label="Melting and boiling points chart" style="min-width:520px"></svg></div>
 <div class="sort" id="mpSort"></div></div>`},
circuit(){return `<div class="vis" id="circ"><svg viewBox="0 0 400 262" role="img" aria-label="Circuit testing whether a substance conducts electricity">
 <path d="M70 60 L70 30 L330 30 L330 60" fill="none" class="st-ink" stroke-width="3"/>
 <path d="M70 200 L70 220 L170 220 M230 220 L330 220 L330 200" fill="none" class="st-ink" stroke-width="3"/>
 <rect x="40" y="200" width="60" height="26" rx="4" class="s-earth"/><text x="70" y="218" text-anchor="middle" style="fill:#fff;font-size:11px;font-weight:700">cell</text>
 <circle id="bulbGlow" cx="200" cy="220" r="34" fill="var(--sun-fill)" opacity="0" style="transition:opacity .4s"/>
 <circle cx="200" cy="220" r="14" class="s-surface st-ink" stroke-width="2"/><path d="M192 220 q8 -10 16 0" fill="none" class="st-ink" stroke-width="1.5"/>
 <rect x="120" y="70" width="160" height="130" rx="6" class="s-surface st-ink" stroke-width="2"/>
 <rect id="liq" x="122" y="100" width="156" height="98" fill="var(--sky-soft)"/>
 <line x1="70" y1="60" x2="160" y2="60" class="st-ink" stroke-width="3"/><line x1="240" y1="60" x2="330" y2="60" class="st-ink" stroke-width="3"/>
 <rect x="152" y="56" width="16" height="120" class="s-ink"/><rect x="232" y="56" width="16" height="120" class="s-ink"/>
 <text x="160" y="50" text-anchor="middle" class="small">carbon rod</text><text x="240" y="50" text-anchor="middle" class="small">carbon rod</text>
 <g id="ions"></g><text x="200" y="258" text-anchor="middle" class="small">bulb</text>
</svg>
 <div class="row" style="justify-content:center"><button class="btn" data-cs="solid">Ionic crystal (solid)</button><button class="btn" data-cs="sol">Ionic, dissolved in water</button><button class="btn" data-cs="melt">Ionic, melted</button><button class="btn" data-cs="cov">Simple covalent substance</button></div>
 <div class="infobox" id="circInfo">Choose a sample to test.</div></div>`},
ptHistory(){return `<div class="vis" id="hist"><div class="row" style="justify-content:center">${[['1817','Johann Dobereiner'],['1864','John Newlands'],['1869','Dmitri Mendeleev']].map((h,i)=>`<button class="btn${i===0?' primary':''}" data-h="${i}"><b>${h[0]}</b> ${h[1]}</button>`).join('')}</div>
 <div id="histBody"></div></div>`}
});

/* =================== CHAPTER 2 WIDGET INIT =================== */
function initWidgets2(){
 // parts
 if($('#parts')){const T={p:'<b>Proton.</b> In the nucleus. Charge +1. The number of protons is the atomic number.',n:'<b>Neutron.</b> In the nucleus. No charge. Neutrons = mass number − atomic number.',e:'<b>Electron.</b> Around the nucleus in shells. Charge −1. In an atom, electrons = protons.'};
  $$('[data-part]').forEach(b=>b.onclick=()=>{$$('[data-part]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#partInfo').innerHTML=T[b.dataset.part];});}
 // calculator
 if($('#calc')){const r=$('#zRange');const up=()=>{const z=+r.value,e=elBy(z);$('#calcAtom').innerHTML=atomSVG(z,{size:230,label:e[2]+' ('+e[1]+')'});
  $('#calcTab').innerHTML=`<tbody><tr><th>Atomic number</th><td>${z}</td></tr><tr><th>Mass number</th><td>${e[3]}</td></tr><tr><th>Protons</th><td>${z}</td></tr><tr><th>Electrons</th><td>${z}</td></tr><tr><th>Neutrons</th><td>${e[3]} − ${z} = <b>${e[3]-z}</b></td></tr><tr><th>Electronic structure</th><td><b>${shellsOf(z).join(',')}</b></td></tr></tbody>`;};r.oninput=up;up();}
 // models
 if($('#modelsV')){let bohr=false;const pos=[[30,0],[-30,0],[50,0],[0,50],[-50,0],[0,-50],[35,35],[-35,-35],[70,0],[-70,0],[0,70]];const old=[[-38,-20],[30,-44],[44,24],[-20,40],[8,10],[-48,14],[22,-12],[-6,-46],[50,-4],[-30,-48],[36,46]];
  $('#mToggle').onclick=()=>{bohr=!bohr;$$('#modelsV .mel').forEach((g,i)=>{const p=bohr?pos[i]:old[i];g.style.transform=`translate(${100+p[0]}px,${100+p[1]}px)`;});
   ['#mShell1','#mShell2','#mShell3'].forEach(s=>$(s).style.opacity=bohr?1:0);
   $('#mTitle').textContent=bohr?'Bohr\'s model (1913)':'Stage 8 model';
   $('#mText').textContent=bohr?'Electrons are arranged in separate shells, or energy levels, around the nucleus. This is the model we use today.':'A positive nucleus in the centre, with electrons around it. This is the model built from the ideas of Thomson and Rutherford.';
   $('#mToggle').textContent=bohr?'Show the Stage 8 model':'Show Bohr\'s model (1913)';};}
 // shell filler
 if($('#fill')){let n=3;const up=(msg)=>{const e=elBy(n);$('#fillAtom').innerHTML=atomSVG(n,{size:230,hl:1});$('#fillStruct').textContent=shellsOf(n).join(',');
  $('#fillName').textContent=`${n} electrons: a neutral atom of ${e[2]} (${e[1]})`;$('#fillMinus').disabled=n<=1;$('#fillPlus').disabled=n>=20;if(msg)$('#fillInfo').innerHTML=msg;};
  $('#fillPlus').onclick=()=>{n++;const s=shellsOf(n);const last=s[s.length-1];let m=`Electron ${n} goes into shell ${s.length}.`;if(last===1&&s.length>1)m+=` Shell ${s.length-1} was full, so a new shell starts.`;if((s.length===1&&last===2)||(s.length>1&&last===8))m+=` <b>Shell ${s.length} is now full.</b>`;up(m);};
  $('#fillMinus').onclick=()=>{n--;up(`Removed one electron. Now ${shellsOf(n).join(',')}.`);};up();}
 // periodic table
 if($('#pt')){const info=$('#ptInfo');
  $$('#pt .pte').forEach(b=>b.onclick=()=>{const z=+b.dataset.z,e=elBy(z);$$('#pt .pte').forEach(x=>x.classList.toggle('sel',x===b));
   info.innerHTML=`<div class="calcgrid" style="gap:10px"><div>${atomSVG(z,{size:150})}</div><div><b style="font-size:20px">${e[2]} (${e[1]})</b><br>Atomic number ${z} · mass number ${e[3]}<br>Group ${groupOf(z)} · period ${periodOf(z)}<br>${e[4]} at room temperature · ${e[5]==='metal'?'metal':e[5]==='semi'?'between a metal and a non-metal':'non-metal'}<br>Electronic structure <b>${shellsOf(z).join(',')}</b>${z===1?'<br><span class="tiny">Hydrogen sits at the top of the table, but it is not an alkali metal.</span>':''}</div></div>`;});
  $$('[data-ptf]').forEach(b=>b.onclick=()=>{const f=b.dataset.ptf;$$('[data-ptf]').forEach(x=>x.setAttribute('aria-pressed',x===b&&f!=='none'));
   $$('#pt .pte').forEach(x=>{const z=+x.dataset.z,e=elBy(z);let on=true;if(f==='g1')on=groupOf(z)===1&&z!==1;if(f==='g2')on=groupOf(z)===2;if(f==='g7')on=groupOf(z)===7;if(f==='g8')on=groupOf(z)===8;if(f==='p3')on=periodOf(z)===3;if(f==='metal')on=e[5]==='metal';if(f==='none')on=true;x.classList.toggle('dim',!on);});
   const msg={g1:'<b>Group 1, the alkali metals:</b> lithium, sodium and potassium. One electron in the outer shell.',g2:'<b>Group 2:</b> beryllium, magnesium and calcium. Two electrons in the outer shell.',g7:'<b>Group 7, the halogens:</b> fluorine and chlorine (bromine is further down). Seven outer electrons.',g8:'<b>Group 8, the noble gases:</b> helium, neon and argon. Full outer shells.',p3:'<b>Period 3:</b> sodium to argon. All have three electron shells.',metal:'<b>Metals</b> are on the left. Non-metals are on the right.',none:'<b>Tap an element.</b>'};info.innerHTML=msg[f];});}
 // group 1 chart
 if($('#g1')){let mode='mp';const D={mp:[['Li',180],['Na',98],['K',63]],bp:[['Li',1360],['Na',900],['K',777]]};const svg=$('#g1svg');
  const draw=(rb)=>{const d=D[mode];const max=mode==='mp'?200:1500;const H=170,X=60;let s=`<line x1="${X}" y1="${20+H}" x2="360" y2="${20+H}" class="st-ink" stroke-width="1.5"/>`;
   for(let t=0;t<=max;t+=mode==='mp'?50:500){const y=20+H-t/max*H;s+=`<line x1="${X}" x2="360" y1="${y}" y2="${y}" class="st-line"/><text x="${X-6}" y="${y+4}" text-anchor="end" class="small">${t}</text>`;}
   const all=d.concat(rb!=null?[['Rb',rb]]:[]);
   all.forEach(([k,v],i)=>{const h=v/max*H;const x=X+20+i*76;s+=`<rect class="gbar" x="${x}" y="${20+H-h}" width="46" height="${h}" rx="4" fill="${k==='Rb'?'var(--sun-fill)':'var(--sky)'}" style="animation-delay:${i*.12}s"/><text x="${x+23}" y="${14+H-h}" text-anchor="middle" style="font-weight:700">${v}</text><text x="${x+23}" y="${36+H}" text-anchor="middle" class="small">${k==='Rb'?'rubidium (you)':elBy(k)[2]}</text>`;});
   s+=`<text x="14" y="110" transform="rotate(-90 14 110)" text-anchor="middle" class="small">${mode==='mp'?'melting':'boiling'} point in °C</text>`;svg.innerHTML=s;};
  $$('[data-g1]').forEach(b=>b.onclick=()=>{mode=b.dataset.g1;$$('[data-g1]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#rbRow').hidden=mode!=='mp';draw(null);$('#g1Info').innerHTML=mode==='mp'?'Drag the slider to predict rubidium\'s melting point, then check.':'Boiling points from page 54: they decrease down the group. Rubidium\'s should be lower than 777 °C.';});
  $('#rbGuess').oninput=e=>$('#rbVal').textContent=e.target.value+' °C';
  $('#rbCheck').onclick=()=>{const g=+$('#rbGuess').value;draw(g);$('#g1Info').innerHTML=(g<63?'<b>Good prediction.</b> ':'<b>Not quite.</b> ')+`Melting points go down Group 1, so rubidium should be below potassium's 63 °C. The Check your progress table on page 82 gives rubidium a melting point of 39 °C.`;};
  draw(null);}
 // water reactions
 if($('#wr')){const cv=$('#wrC'),ctx=cv.getContext('2d');let m=null,t=0,bubbles=[],x=0,dir=1;const dpr=Math.min(2,devicePixelRatio||1);
  const info={Li:'<b>Lithium</b> floats and moves about, giving off bubbles of gas and some heat.',Na:'<b>Predict first:</b> sodium is between lithium and potassium. Based on the trend, it should react more vigorously than lithium, with more gas and heat, but less violently than potassium. Your book asks you to predict this in question 2.1(d).',K:'<b>Potassium</b> gives off gas and so much heat that it catches fire.',Rb:'<b>Rubidium</b> explodes with such force that the container cracks. This is why it is not used in schools.'};
  const speed={Li:.6,Na:1.4,K:2.6,Rb:0};
  $$('[data-m]').forEach(b=>b.onclick=()=>{m=b.dataset.m;t=0;bubbles=[];x=0;$$('[data-m]').forEach(z=>z.setAttribute('aria-pressed',z===b));$('#wrInfo').innerHTML=info[m];});
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  function f(){if(!document.body.contains(cv))return;const W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==W*dpr){cv.width=W*dpr;cv.height=H*dpr;}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
   const wy=H*.45;ctx.fillStyle=css('--sky-soft');ctx.fillRect(10,wy,W-20,H-wy-10);ctx.strokeStyle=css('--ink');ctx.lineWidth=2;ctx.strokeRect(10,H*.25,W-20,H*.75-10);
   if(m){t++;
    if(m==='Rb'){const k=Math.min(1,t/30);ctx.fillStyle=`rgba(255,200,80,${Math.max(0,1-t/60)})`;ctx.beginPath();ctx.arc(W/2,wy,20+k*W*.4,0,7);ctx.fill();
     if(t>15){ctx.strokeStyle=css('--ink');ctx.lineWidth=1.5;ctx.beginPath();[[W*.3,H-10],[W*.35,H*.75],[W*.28,H*.6]].forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();ctx.beginPath();[[W*.72,H*.25],[W*.68,H*.42],[W*.74,H*.55]].forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();}
     if(t>90)t=0;}
    else{const sp=reduce?0:speed[m];x+=sp*dir;if(Math.abs(x)>W*.35)dir*=-1;const px=W/2+x,py=wy-4,r=m==='Li'?9:m==='Na'?8:9;
     if(Math.random()<(m==='Li'?.3:m==='Na'?.6:.9))bubbles.push([px+(Math.random()-.5)*14,py+6,1.5+Math.random()*2.5]);
     bubbles.forEach(b=>{b[1]-=0.9;});bubbles=bubbles.filter(b=>b[1]>H*.3);
     ctx.fillStyle=css('--surface');ctx.strokeStyle=css('--sky');bubbles.forEach(b=>{ctx.beginPath();ctx.arc(b[0],b[1],b[2],0,7);ctx.fill();ctx.stroke();});
     if(m==='K'){for(let i=0;i<3;i++){ctx.fillStyle=i?'rgba(255,170,40,.75)':'rgba(255,90,40,.7)';ctx.beginPath();const fh=26+Math.sin(t*.3+i)*6;ctx.moveTo(px-10+i*3,py);ctx.quadraticCurveTo(px,py-fh*1.6,px+10-i*3,py);ctx.fill();}}
     ctx.fillStyle='#C9CED6';ctx.strokeStyle=css('--ink');ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();ctx.stroke();
     ctx.fillStyle=css('--ink');ctx.font='700 11px system-ui';ctx.textAlign='center';ctx.fillText(m,px,py-r-4-(m==='K'?36:0));}}
   else{ctx.fillStyle=css('--muted');ctx.font='14px system-ui';ctx.textAlign='center';ctx.fillText('a large trough of water',W/2,wy+30);}
   requestAnimationFrame(f);}
  requestAnimationFrame(f);}
 // stable
 if($('#stab')){const pick=k=>{const e=elBy(k),s=shellsOf(e[0]),out=s[s.length-1],cap=s.length===1?2:8;$$('[data-st]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.st===k));
  $('#stabAtom').innerHTML=atomSVG(e[0],{size:200,hl:1,label:`${e[2]} ${s.join(',')}`});
  $('#stabSlots').innerHTML=`<div class="tiny">Outer shell: ${out} of ${cap}</div><div class="slotrow">${Array.from({length:cap},(_,i)=>`<i class="${i<out?'on':''}"></i>`).join('')}</div>`;
  let msg;if(out===cap)msg=`<b>Full outer shell.</b> ${e[2][0].toUpperCase()+e[2].slice(1)} is a noble gas, so it is stable and does not react.`;
  else if(out<=2)msg=`<b>Loses ${out} electron${out>1?'s':''}.</b> It is easier to lose ${out} than to gain ${cap-out}. It becomes a positive ion: ${e[1]}${out>1?'²⁺':'⁺'}.`;
  else msg=`<b>Gains ${cap-out} electron${cap-out>1?'s':''}.</b> It is easier to gain ${cap-out} than to lose ${out}. It becomes a negative ion: ${e[1]}${cap-out>1?'²⁻':'⁻'}.`;
  $('#stabInfo').innerHTML=msg;};
  $$('[data-st]').forEach(b=>b.onclick=()=>pick(b.dataset.st));pick('Na');}
 // electron transfer
 if($('#tr')){const go=$('#trGo');let done=false;
  const initT=()=>{const svg=$('#trSvg');
   // hide sodium's real 11th electron (drawn separately as trE)
   const naE=$$('#trNa g g',svg).filter(g=>g.getAttribute('transform')&&g.getAttribute('transform').startsWith('translate')&&g.querySelector('circle'));
   if(naE.length)naE[naE.length-1].style.opacity=0;
   const e=$('#trE',svg);e.style.transition='none';e.style.transform='translate(145px,59px)';
   $('#trNaQ',svg).textContent='Na atom 2,8,1';$('#trClQ',svg).textContent='Cl atom 2,8,7';$('#trNa',svg).style.transform='';$('#trCl',svg).style.transform='';
   $('#trInfo').innerHTML='Sodium has one electron in its outer shell (gold). Chlorine has room for one more.';go.disabled=false;};
  initT();
  go.onclick=()=>{if(done)return;done=true;go.disabled=true;const svg=$('#trSvg');const e=$('#trE',svg);
   e.style.transition='transform 1.6s cubic-bezier(.5,0,.3,1)';requestAnimationFrame(()=>{e.style.transform='translate(248px,110px)';});
   setTimeout(()=>{$('#trNaQ',svg).textContent='Na⁺ ion [2,8]⁺';$('#trClQ',svg).textContent='Cl⁻ ion [2,8,8]⁻';
    $$('#trNa circle',svg).forEach(c=>{if(c.getAttribute('r')==='62')c.style.opacity=.15;});
    $('#trNa',svg).style.transform='translateX(18px)';$('#trCl',svg).style.transform='translateX(-18px)';e.style.transition='transform 1s';e.style.transform='translate(230px,110px)';
    $('#trInfo').innerHTML='<b>Ions formed.</b> Sodium lost an electron, so it now has 11 protons and 10 electrons: Na⁺. Chlorine gained one, so it has 17 protons and 18 electrons: Cl⁻. The opposite charges attract. This is an <b>ionic bond</b>, and the compound is sodium chloride, NaCl.';},1700);};
  $('#trReset').onclick=()=>{render();};}
 // ionic builder
 if($('#ib')){let mm='Na',nn='Cl';const Q={Li:1,Na:1,K:1,Mg:2,Ca:2},R={F:1,Cl:1,O:2};const ionName={F:'fluoride',Cl:'chloride',O:'oxide'};
  const sup={1:'⁺',2:'²⁺'},sdn={1:'⁻',2:'²⁻'},sub={1:'',2:'₂'};
  const up=()=>{const a=Q[mm],b=R[nn];const lcm=a===b?a:a*b;const nm=lcm/a,nx=lcm/b;const ME=elBy(mm),NE=elBy(nn);
   const formula=mm+sub[nm]+nn+sub[nx];
   let tokens='';for(let i=0;i<nm;i++)tokens+=`<span class="ion pos">${mm}${sup[a]}</span>`;for(let i=0;i<nx;i++)tokens+=`<span class="ion neg">${nn}${sdn[b]}</span>`;
   $('#ibOut').innerHTML=`<div class="row" style="justify-content:center;gap:8px">${atomSVG(ME[0],{size:120,hl:1,anim:false})}<span class="arrow" style="font-size:22px">+</span>${atomSVG(NE[0],{size:110,hl:1,anim:false})}</div>
    <p>Each ${ME[2]} atom (${shellsOf(ME[0]).join(',')}) <b>loses ${a}</b> electron${a>1?'s':''} → ${mm}${sup[a]}. Each ${NE[2]} atom (${shellsOf(NE[0]).join(',')}) <b>gains ${b}</b> electron${b>1?'s':''} → ${nn}${sdn[b]}.</p>
    <div class="row" style="justify-content:center">${tokens}</div>
    <p style="text-align:center">The charges balance with ${nm} ${ME[2]} ion${nm>1?'s':''} and ${nx} ${ionName[nn]} ion${nx>1?'s':''}.</p>
    <div class="bigstruct" style="text-align:center">${ME[2]} ${ionName[nn]}: ${formula}</div>`;};
  $$('[data-ibm]').forEach(b=>b.onclick=()=>{mm=b.dataset.ibm;$$('[data-ibm]').forEach(x=>x.setAttribute('aria-pressed',x===b));up();});
  $$('[data-ibn]').forEach(b=>b.onclick=()=>{nn=b.dataset.ibn;$$('[data-ibn]').forEach(x=>x.setAttribute('aria-pressed',x===b));up();});up();}
 // covalent
 if($('#cov')){let mol='HCl',joined=false;const svg=$('#covSvg');
  const ring=(cx,cy,r)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" class="st-muted" stroke-width="1.4"/>`;
  const nuc=(cx,cy,t)=>`<circle cx="${cx}" cy="${cy}" r="13" class="s-nuc"/><text x="${cx}" y="${cy+4}" text-anchor="middle" style="font-size:11px;font-weight:700;fill:var(--on-nuc)">${t}</text>`;
  const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="5" class="s-sun" stroke="var(--ink)" stroke-width=".8"/>`;
  const cross=(x,y)=>`<g transform="translate(${x} ${y})"><circle r="5.5" class="s-elec"/><path d="M-2.7 -2.7L2.7 2.7M2.7 -2.7L-2.7 2.7" stroke="var(--on-elec)" stroke-width="1.3"/></g>`;
  const atomG=(id,cx,cy,shells,elec,label,kind,facing)=>{let s=`<g id="${id}" style="transition:transform 1.2s cubic-bezier(.5,0,.3,1)">`;shells.forEach(r=>s+=ring(cx,cy,r));s+=nuc(cx,cy,label);
   elec.forEach(([r,a])=>{const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);s+=kind==='dot'?dot(x,y):cross(x,y);});return s+`</g>`;};
  const P={
   HCl:{info:['Hydrogen has 1 electron (dot) and room for 2. Chlorine has 7 outer electrons (crosses) and room for 8.','<b>A shared pair.</b> Now hydrogen has 2 electrons in its shell and chlorine has 8. Both are full. This is one covalent bond: a molecule of hydrogen chloride, HCl.'],
    build:()=>atomG('A1',90,120,[30],[[30,0.45]],'H','dot')+atomG('A2',290,120,[24,42,60],[[24,0],[24,Math.PI],...Array.from({length:8},(_,i)=>[42,i*Math.PI/4]),...[Math.PI/4,Math.PI/2,3*Math.PI/4,Math.PI-0.25,5*Math.PI/4,3*Math.PI/2,7*Math.PI/4].map(a=>[60,a])],'Cl','x'),
    move:{A1:'translateX(106px)',A2:'translateX(-22px)'}},
   H2:{info:['Each hydrogen atom has 1 electron and room for 2.','<b>A shared pair.</b> Each hydrogen atom now has 2 electrons, a full shell. This makes a hydrogen molecule, H₂.'],
    build:()=>atomG('A1',110,120,[30],[[30,-0.6]],'H','dot')+atomG('A2',310,120,[30],[[30,Math.PI-0.6]],'H','x'),
    move:{A1:'translateX(80px)',A2:'translateX(-80px)'}},
   NH3:{info:['Nitrogen is 2,5: five outer electrons (crosses), with room for eight. Each hydrogen has one electron (dot).','<b>Three shared pairs.</b> Nitrogen now has 8 outer electrons and each hydrogen has 2. All shells are full: a stable molecule of ammonia, NH₃.'],
    build:()=>atomG('A0',210,110,[22,44],[[22,0],[22,Math.PI],[44,Math.PI],[44,0],[44,Math.PI/2],[44,-Math.PI*0.6],[44,-Math.PI*0.4]],'N','x')+atomG('A1',40,110,[20],[[20,0]],'H','dot')+atomG('A2',380,110,[20],[[20,Math.PI]],'H','dot')+atomG('A3',210,232,[20],[[20,-Math.PI/2]],'H','dot'),
    move:{A1:'translateX(118px)',A2:'translateX(-118px)',A3:'translateY(-66px)'}}};
  const draw=()=>{joined=false;svg.innerHTML=P[mol].build();$('#covInfo').innerHTML=P[mol].info[0];$('#covJoin').disabled=false;};
  $$('[data-mol]').forEach(b=>b.onclick=()=>{mol=b.dataset.mol;$$('[data-mol]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw();});
  $('#covJoin').onclick=()=>{if(joined)return;joined=true;Object.entries(P[mol].move).forEach(([id,t])=>{const g=$('#'+id,svg);if(g)g.style.transform=t;});setTimeout(()=>{$('#covInfo').innerHTML=P[mol].info[1];},1200);$('#covJoin').disabled=true;};
  $('#covReset').onclick=draw;draw();}
 // krypton
 if($('#krInfo')){$$('[data-kr]').forEach(b=>b.onclick=()=>{$$('[data-kr]').forEach(x=>x.setAttribute('aria-pressed',x===b));const i=$('#krInfo');i.hidden=false;i.innerHTML=(b.dataset.kr==='hi'?'<b>Yes.</b> ':'<b>Not quite.</b> ')+'Melting and boiling points increase down Group 8, so krypton\'s should both be higher than argon\'s (−189 °C and −186 °C).';});}
 // 3D canvases
 if($('#naclC')){const st=spin3d($('#naclC'),naclModel);$('#naclHl').onclick=()=>{st.hl=!st.hl;$('#naclHl').textContent=st.hl?'Show the whole lattice':'Show one sodium ion\'s neighbours';};}
 if($('#diaC')){const m=diamondModel();spin3d($('#diaC'),m);}
 if($('#graC')){const st=spin3d($('#graC'),graphiteModel);st.offset=0;let target=0;$('#graSlide').onclick=()=>{target=target?0:1.6;const t0=performance.now(),from=st.offset;const step=n=>{const k=Math.min(1,(n-t0)/900);st.offset=from+(target-from)*k;if(k<1)requestAnimationFrame(step);};requestAnimationFrame(step);};
  const pc=$('#paper'),px=pc.getContext('2d');const dpr=Math.min(2,devicePixelRatio||1);const sz=()=>{pc.width=pc.clientWidth*dpr;pc.height=pc.clientHeight*dpr;px.setTransform(dpr,0,0,dpr,0,0);};sz();let last=null;
  pc.addEventListener('pointerdown',e=>{last=[e.offsetX,e.offsetY];pc.setPointerCapture(e.pointerId);});pc.addEventListener('pointerup',()=>last=null);
  pc.addEventListener('pointermove',e=>{if(!last)return;px.strokeStyle='rgba(70,70,80,.75)';px.lineWidth=2.4;px.lineCap='round';px.beginPath();px.moveTo(...last);px.lineTo(e.offsetX,e.offsetY);px.stroke();
   for(let i=0;i<2;i++){px.fillStyle='rgba(70,70,80,.35)';px.fillRect(e.offsetX+(Math.random()-.5)*6,e.offsetY+(Math.random()-.5)*6,1.5,1.5);}last=[e.offsetX,e.offsetY];});}
 // heat molecules
 if($('#heat')){const cv=$('#heatC'),ctx=cv.getContext('2d');const dpr=Math.min(2,devicePixelRatio||1);const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const N=18;const mols=Array.from({length:N},(_,i)=>({hx:(i%6),hy:Math.floor(i/6),x:0,y:0,vx:(Math.random()-.5),vy:(Math.random()-.5),a:Math.random()*6,va:(Math.random()-.5)*.05}));
  const r=$('#heatR');const lbl=()=>{const v=+r.value;$('#heatLbl').textContent=v<30?'solid':v<65?'liquid':'gas';
   $('#heatInfo').innerHTML=v<30?'<b>Cold.</b> The molecules are held close together in a regular pattern by weak intermolecular forces. They only vibrate.':v<65?'<b>Warmer.</b> Enough energy to overcome some of the weak forces between molecules. They slide past each other.':'<b>Hot.</b> The weak forces between molecules are overcome, and the molecules fly apart as a gas. Each O=C=O molecule is still in one piece, because the covalent bonds inside it are strong.';};r.oninput=lbl;lbl();
  let W=0,H=0;
  function f(){if(!document.body.contains(cv))return;if(cv.clientWidth!==W){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;mols.forEach(m=>{m.x=W/2-125+m.hx*50;m.y=H/2-40+m.hy*40;});}
   ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);const v=+r.value/100;const sp=v<.3?0:v<.65?1.2:3.4;
   mols.forEach(m=>{const hx=W/2-125+m.hx*50,hy=H/2-40+m.hy*40;
    if(v<.3){m.x+=(hx-m.x)*.08+(Math.random()-.5)*1.2*(.3+v);m.y+=(hy-m.y)*.08+(Math.random()-.5)*1.2*(.3+v);m.a+=(0-m.a)*.05;}
    else{m.x+=m.vx*sp;m.y+=m.vy*sp;m.a+=m.va*sp;if(v<.65){m.x+=(W/2-m.x)*.004;m.y+=(H*.65-m.y)*.01;}
     if(m.x<20||m.x>W-20)m.vx*=-1;if(m.y<20||m.y>H-20)m.vy*=-1;m.x=Math.max(20,Math.min(W-20,m.x));m.y=Math.max(20,Math.min(H-20,m.y));}
    const c=Math.cos(m.a),s=Math.sin(m.a);ctx.strokeStyle=css('--muted');ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(m.x-14*c,m.y-14*s);ctx.lineTo(m.x+14*c,m.y+14*s);ctx.stroke();
    [[-14,css('--atomO')],[14,css('--atomO')],[0,css('--carbon')]].forEach(([d,col])=>{ctx.fillStyle=col;ctx.beginPath();ctx.arc(m.x+d*c,m.y+d*s,d?7:6.5,0,7);ctx.fill();});});
   requestAnimationFrame(f);}
  requestAnimationFrame(f);}
 // melting point chart
 if($('#mp')){const D=[['sodium chloride',801,1413,'i'],['methane',-182,-161,'s'],['magnesium chloride',714,1412,'i'],['ammonia',-77,-34,'s'],['calcium oxide',2613,2850,'i'],['chlorine',-101,-34.6,'s'],['water',0,100,'s']];
  const svg=$('#mpSvg');const X0=150,X1=470,lo=-300,hi=3000;const sx=v=>X0+(v-lo)/(hi-lo)*(X1-X0);
  const done={};
  const draw=()=>{let s='';[-300,0,500,1000,1500,2000,2500,3000].forEach(t=>{const x=sx(t);s+=`<line x1="${x}" x2="${x}" y1="20" y2="270" class="${t===0?'st-ink':'st-line'}" stroke-width="${t===0?1.5:1}"/><text x="${x}" y="288" text-anchor="middle" class="small">${t}</text>`;});
   s+=`<text x="${(X0+X1)/2}" y="300" text-anchor="middle" class="small">temperature in °C</text>`;
   D.forEach(([n,m,b,k],i)=>{const y=34+i*34;const col=done[n]?(k==='i'?'var(--bad)':'var(--sky)'):'var(--muted)';
    s+=`<text x="${X0-8}" y="${y+5}" text-anchor="end">${n}</text><rect class="gbarx" x="${Math.min(sx(m),sx(0))}" y="${y-9}" width="${Math.abs(sx(m)-sx(0))||2}" height="8" rx="3" fill="${col}"/><rect class="gbarx" x="${Math.min(sx(b),sx(0))}" y="${y+1}" width="${Math.abs(sx(b)-sx(0))||2}" height="8" rx="3" fill="${col}" opacity=".55"/>
    <text x="${Math.max(sx(m),sx(b),sx(0))+6}" y="${y+4}" class="small">${String(m).replace('-','−')} / ${String(b).replace('-','−')}</text>`;});
   s+=`<text x="${X0}" y="12" class="small">top bar: melting point · lower bar: boiling point</text>`;svg.innerHTML=s;};
  $('#mpSort').innerHTML=D.map(([n,m,b,k])=>`<div class="srow" data-a="${k}" data-n="${n}"><span class="lbl">${n}</span><span class="seg"><button class="btn" data-v="i">ionic</button><button class="btn" data-v="s">simple molecules</button></span></div>`).join('');
  $$('#mpSort .srow').forEach(r=>r.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;const ok=b.dataset.v===r.dataset.a;$$('[data-v]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));r.classList.toggle('ok',ok);r.classList.toggle('no',!ok);if(ok){done[r.dataset.n]=1;draw();}}));
  draw();}
 // circuit
 if($('#circ')){const g=$('#ions');let mode=null,raf=null;const ions=[];
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const build=()=>{g.innerHTML='';ions.length=0;
   if(mode==='cov'){for(let i=0;i<8;i++){g.insertAdjacentHTML('beforeend',`<g transform="translate(${130+((i*37)%120)} ${115+((i*23)%70)})"><circle r="6" fill="var(--atomO)"/><circle cx="9" r="6" fill="var(--atomO)"/></g>`);}return;}
   for(let i=0;i<14;i++){const pos=i%2===0;const x=135+Math.random()*130,y=110+Math.random()*80;
    const el=document.createElementNS('http://www.w3.org/2000/svg','g');el.innerHTML=`<circle r="7" fill="${pos?'var(--na)':'var(--cl)'}"/><text y="4" text-anchor="middle" style="font-size:11px;font-weight:700;fill:#fff">${pos?'+':'−'}</text>`;g.appendChild(el);ions.push({el,x,y,pos});}
   if(mode==='solid'){ions.forEach((o,i)=>{o.x=164+(i%5)*18;o.y=172-Math.floor(i/5)*16;});}};
  const tick=()=>{if(!document.body.contains(g))return;ions.forEach(o=>{if(mode==='sol'||mode==='melt'){o.x+=(o.pos?-1:1)*.6+(Math.random()-.5)*1.2;o.y+=(Math.random()-.5)*1.2;if(o.x<170)o.x=230+Math.random()*30;if(o.x>234)o.x=140+Math.random()*24;o.y=Math.max(108,Math.min(190,o.y));}
   o.el.setAttribute('transform',`translate(${o.x.toFixed(1)} ${o.y.toFixed(1)})`);});raf=requestAnimationFrame(tick);};
  const TXT={solid:'<b>No light.</b> In a solid crystal the ions are locked in the lattice. They cannot move, so they cannot carry the charge.',sol:'<b>The bulb lights.</b> Dissolved in water, the ions are free to move. Positive ions drift one way and negative ions the other, carrying the charge.',melt:'<b>The bulb lights.</b> When an ionic compound melts, its ions are free to move, so it conducts.',cov:'<b>No light.</b> A simple covalent substance is made of molecules, not ions, so there are no charged particles to carry the current.'};
  $$('[data-cs]').forEach(b=>b.onclick=()=>{mode=b.dataset.cs;$$('[data-cs]').forEach(x=>x.setAttribute('aria-pressed',x===b));const on=mode==='sol'||mode==='melt';$('#bulbGlow').setAttribute('opacity',on?.85:0);
   $('#liq').setAttribute('fill',mode==='solid'?'transparent':mode==='melt'?'var(--sun-soft)':'var(--sky-soft)');$('#circInfo').innerHTML=TXT[mode];build();});
  tick();}
 // periodic table history
 if($('#hist')){const order=[['H',1],['Li',7],['Be',9],['B',11],['C',12],['N',14],['O',16],['F',19],['Na',23],['Mg',24],['Al',27],['Si',28],['P',31],['S',32],['Cl',35],['K',39],['Ca',40]];
  const B=[`<div class="card" style="gap:8px"><h4 style="font-size:20px">1817 · Johann Dobereiner: the "law of triads"</h4><p>Dobereiner grouped elements in threes, based on their properties and appearance. One of his triads was the salt-forming elements:</p>
   <div class="row" style="justify-content:center">${['Li','Na','K'].map(k=>`<span class="tri">${k}<small>${elBy(k)[2]}</small></span>`).join('')}</div><p class="tiny">Around the same time, other scientists began to find the masses of atoms.</p></div>`,
   `<div class="card" style="gap:8px"><h4 style="font-size:20px">1864 · John Newlands: every eighth element</h4><p>By 1864, 63 elements were known. Newlands put them in order of the mass of their atoms, starting with the lightest. He noticed that <b>every eighth element</b> had similar properties. The pattern did not carry on through all the elements.</p>
   <p class="tiny">Here are the lightest elements known then, in order of mass. Tap "Count eight" to see the repeating pattern. (The noble gases had not been discovered yet, so they are missing.)</p>
   <div class="oct">${order.map(([k],i)=>`<span class="octi" data-i="${i}">${k}</span>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn primary" id="octGo">Count eight</button></div></div>`,
   `<div class="card" style="gap:8px"><h4 style="font-size:20px">1869 · Dmitri Mendeleev: leaving gaps</h4><p>Mendeleev used Newlands' ideas, but he <b>left gaps</b> in his table, so the pattern continued and elements with similar properties were grouped together.</p>
   <p>He predicted the properties of undiscovered elements that would fill the gaps, and his predictions turned out to be correct. His table is the basis of the Periodic Table we use today.</p>
</div>`];
  const show=i=>{$$('[data-h]').forEach(b=>b.classList.toggle('primary',+b.dataset.h===i));$('#histBody').innerHTML=B[i];
   if(i===1){$('#octGo').onclick=()=>{const it=$$('.octi');it.forEach(x=>x.classList.remove('hit','hit2'));[1,8,15].forEach((n,j)=>setTimeout(()=>it[n].classList.add('hit'),j*500));[7,14].forEach((n,j)=>setTimeout(()=>it[n].classList.add('hit2'),1600+j*500));};}};
  $$('[data-h]').forEach(b=>b.onclick=()=>show(+b.dataset.h));show(0);}
}

/* =================== CHAPTER 3: Forces and energy =================== */
const KEYWORDS3=[
 {id:'density',t:'density',topic:'3.1',d:'The mass of a fixed volume of a substance: mass ÷ volume. Units: g/cm³ or kg/m³.'},
 {id:'hollow',t:'hollow',topic:'3.1',d:'Having a space inside that is filled with air, like a polystyrene food box.'},
 {id:'solid-obj',t:'solid (object)',topic:'3.1',d:'Here it means the opposite of hollow: no air space inside, like an iron nail.'},
 {id:'regular',t:'regular',topic:'3.1',d:'A shape whose volume you can work out with an equation, such as a block: length × width × height.'},
 {id:'irregular',t:'irregular',topic:'3.1',d:'A shape with unequal sides and angles, such as a rock. Find its volume by displacement in a measuring cylinder.'},
 {id:'heat',t:'heat',topic:'3.2',d:'The total thermal energy of all the vibrating particles in an object. Measured in joules (J).'},
 {id:'temperature',t:'temperature',topic:'3.2',d:'The average energy of the particles in an object. Measured in °C. It shows which way thermal energy will move.'},
 {id:'absolute zero',t:'absolute zero',topic:'3.2',d:'The lowest possible temperature, −273 °C, where particles would stop moving. Kelvin called it "absolute cold".'},
 {id:'conserved',t:'conserved',topic:'3.3',d:'In physics: the total amount of energy stays the same, whenever it is stored, changed, transferred or dissipated.'},
 {id:'created',t:'created',topic:'3.3',d:'Made, or brought into existence. Energy cannot be created.'},
 {id:'destroyed',t:'destroyed',topic:'3.3',d:'Damaged or ended. The opposite of created. Energy cannot be destroyed.'},
 {id:'system',t:'system',topic:'3.3',d:'Something chosen to be studied, especially its energy changes, such as a lamp or a car engine.'},
 {id:'hotter',t:'hotter',topic:'3.4',d:'At a higher temperature. Thermal energy moves from hotter places to colder places.'},
 {id:'colder',t:'colder',topic:'3.4',d:'At a lower temperature. Cold is not an energy store and cannot move.'},
 {id:'dissipation',t:'dissipation',topic:'3.4',d:'Energy spreading out into the surroundings and becoming less useful. It is not destroyed.'},
 {id:'conduction',t:'conduction',topic:'3.5',d:'Thermal energy passed on by vibrating particles pushing their neighbours. Works best in solids, especially metals.'},
 {id:'convection',t:'convection',topic:'3.5',d:'Warmer, less dense liquid or gas rising while cooler, denser liquid or gas sinks. Only in liquids and gases.'},
 {id:'convection current',t:'convection current',topic:'3.5',d:'The circular movement of a liquid or gas as it is heated from below, which eventually heats all of it.'},
 {id:'radiation',t:'radiation',topic:'3.5',d:'Thermal energy carried by an invisible wave. It needs no particles, so it can cross a vacuum.'},
 {id:'emit',t:'emit',topic:'3.5',d:'To give out. All objects emit radiation; hotter objects emit more.'},
 {id:'expand',t:'expand',topic:'3.5',d:'To increase in size. Solids, liquids and gases expand when heated.'},
 {id:'vigorously',t:'vigorously',topic:'3.5',d:'With more energy, speed and force.'},
 {id:'random',t:'random',topic:'3.6',d:'Unpredictable. Particles in a liquid move in random directions at random speeds.'},
 {id:'porous',t:'porous',topic:'3.6',d:'Letting water slowly soak through, like the clay in a water cooler.'}
];

const TOPICS3=[
{
 id:'3.1',title:'Density',pages:'84–97',
 goals:['Understand what density means.','Calculate density.','Compare the densities of solids, liquids and gases.','Predict whether an object will float or sink in water.'],
 hook:{q:'Which has the bigger volume: 1 kg of rock or 1 kg of feathers? And which has more mass: 1 cm³ of polystyrene or 1 cm³ of iron?',a:'The feathers take up far more space, even though both have the same mass. And 1 cm³ of iron (7.9 g) has much more mass than 1 cm³ of polystyrene (0.05 g). Comparing the mass of the same volume is exactly what density is about.'},
 big:'Density compares how much mass is packed into the same volume: density = mass ÷ volume. Anything less dense than water floats.',
 steps:[
  {t:'Heavy or just big?',body:`<p>People often say metals are "heavier" than polystyrene, but that isn't always true. A huge block of polystyrene can have more mass than a small piece of metal.</p>
   <p>A polystyrene food box has a large volume but a small mass, partly because it is <span class="kw">hollow</span> (it has air inside). An iron nail has a small volume but a high mass, and it is <span class="kw">solid</span> all the way through.</p>
   <p>One box might have more mass than one nail, but <b>the same volume</b> of iron always has more mass than the same volume of polystyrene. The word for this difference is <span class="kw">density</span>.</p>`,
   vis:'sameVolume',
   check:C('Two cubes are exactly the same size. One is iron and one is polystyrene. Which statement is true?',['They have the same mass','The iron cube has more mass','The polystyrene cube has more mass','You can\'t compare them'],1,'Same volume, but iron packs far more mass into it. That means iron has the greater density.')},
  {t:'Measuring volume',body:`<p>For a <span class="kw">regular</span> block, multiply the three side lengths. The book's wooden block is 10 mm × 6 mm × 4 mm = <b>240 mm³</b>. The unit is mm³ because the lengths were in mm, and the order you multiply in doesn't matter.</p>
   <p>For an <span class="kw">irregular</span> object, like a rock, use the <b>displacement method</b>: put it in a measuring cylinder of water and see how much the level rises. In the book, the water rises from 40 cm³ to 56 cm³, so the rock's volume is 56 − 40 = <b>16 cm³</b>.</p>
   <p class="note">Try both methods below.</p>`,
   extra:'volumeLab',
   check:C('Water in a cylinder rises from 30 cm³ to 42 cm³ when a stone is dropped in. What is the stone\'s volume?',['30 cm³','42 cm³','12 cm³','72 cm³'],2,'The rise is the stone\'s volume: 42 − 30 = 12 cm³.')},
  {t:'The density equation',body:`<p><span class="kw">Density</span> is the mass of one unit of volume:</p>
   <div class="eq">density = mass ÷ volume</div>
   <p>A 1 cm³ block of iron has a mass of 7.9 g, so iron's density is <b>7.9 g/cm³</b>. For polystyrene it is just <b>0.05 g/cm³</b>.</p>
   <p>Units come from what you measured: grams and cm³ give <b>g/cm³</b>; kilograms and m³ give <b>kg/m³</b>.</p>
   <p class="note">Use the formula triangle. Tap the quantity you want to find, then enter the other two.</p>`,
   extra:'densityCalc',
   check:C('An aluminium block has a mass of 13.5 g and a volume of 5.0 cm³. What is its density?',['67.5 g/cm³','2.7 g/cm³','0.37 g/cm³','18.5 g/cm³'],1,'13.5 ÷ 5.0 = 2.7 g/cm³.')},
  {t:'Solids, liquids and gases',body:`<p>The book's table shows a huge range of densities, from helium to osmium.</p>
   <p>Gases have much lower densities than liquids and solids because their particles are <b>far apart</b>. The closer the particles are packed, the higher the density, so the very densest substances are all solids.</p>
   <p>For elements, density usually goes up with atomic number. Osmium (atomic number 76) is far denser than iron (26).</p>
   <p class="note">Fun fact from the book: the neutronium in collapsed stars is so dense that a teaspoonful would have a mass of 500 million tonnes!</p>`,
   vis:'densityLadder',
   check:C('Why is the density of air so much lower than the density of water?',['Air particles have no mass','Air particles are much further apart','Air is always hot','Water particles are bigger'],1,'Same idea for all gases: the particles are far apart, so there is little mass in each cm³.')},
  {t:'Float or sink?',body:`<p>Compare an object's density with water's, <b>1.0 g/cm³</b>:</p>
   <ul><li>More dense than water: it <b>sinks</b>.</li><li>Less dense than water: it <b>floats</b>.</li></ul>
   <p>So how does a steel ship float, when steel's density is 8–9 g/cm³? A ship isn't a solid block of steel. It has huge spaces filled with air, so its <b>average density</b> (the mass of everything, air included, divided by its total volume) is less than water's.</p>
   <p>Loading cargo, passengers and fuel adds mass, which raises the ship's density, so it sits lower in the water.</p>
   <p class="note">Drop each material into the water, then load the ship.</p>`,
   extra:'floatSink',
   check:C('Polycarbonate has a density of 1.2 g/cm³. What happens if you put a piece in water?',['It floats','It sinks','It floats halfway','It dissolves'],1,'1.2 g/cm³ is greater than 1.0 g/cm³, so it sinks.')},
  {t:'Layers, bubbles and balloons',body:`<p>Liquids that don't mix form <b>layers</b>, with the least dense on top. The book's column has vegetable oil at the top and honey at the bottom. Crude oil is less dense than water, which is why oil spills float and wash up on beaches.</p>
   <p>Gases are less dense than liquids, so bubbles of carbon dioxide (0.002 g/cm³) rise through a fizzy drink (about 1.0 g/cm³), while raindrops fall through air.</p>
   <p>A helium balloon floats because helium is less dense than air. Hydrogen is even less dense, but it is not used because it forms an explosive mixture with air.</p>
   <p>Gases are easy to compress (particles far apart): same particles in a smaller volume means a <b>higher</b> density. Heating makes a gas expand, so its density goes <b>down</b>. That's how a hot air balloon rises.</p>
   <p class="note">Heat the air in the balloon and watch.</p>`,
   vis:'layersBalloon',
   check:C('Why does a hot air balloon rise?',['Hot air has more mass','Hot air expands, so it is less dense than the cooler air outside','Hot air is lighter than helium','The flame pushes it up'],1,'Heating makes the air expand: same mass, bigger volume, lower density.')}
 ],
 mistakes:[
  ['Heavy objects always sink.','It depends on density, not mass. A huge ship floats because its average density is less than water.'],
  ['To find the volume of a rock, measure its sides.','A rock is irregular. Use displacement: the rise in water level is its volume.'],
  ['density = volume ÷ mass','It\'s mass ÷ volume. Check the units: g/cm³ means grams per cm³.']
 ],
 bq:[
  {p:'p. 92',q:'Densities (g/cm³): pine wood 0.41, polycarbonate 1.2, polyethene 0.95, water 1.0. (a) Which material has the lowest density? (b) Which material(s) would sink in water, and why?',a:'(a) Pine wood. (b) Polycarbonate, because its density (1.2 g/cm³) is greater than water\'s (1.0 g/cm³).'},
  {p:'p. 92',q:'An aluminium block has a volume of 5.0 cm³ and a mass of 13.5 g. (a) Write the density equation. (b) Calculate its density. (c) Will it float or sink in water?',a:'(a) density = mass ÷ volume. (b) 13.5 ÷ 5.0 = 2.7 g/cm³. (c) It sinks, because 2.7 g/cm³ is greater than 1.0 g/cm³.'},
  {p:'p. 92',q:'A wooden block measures 4 cm × 6 cm × 3 cm and has a mass of 54 g. (a) Volume? (b) Density? (c) Float or sink?',a:'(a) 4 × 6 × 3 = 72 cm³. (b) 54 ÷ 72 = 0.75 g/cm³. (c) It floats, because 0.75 g/cm³ is less than water\'s 1.0 g/cm³.'},
  {p:'p. 93',q:'10 m³ of sea water has a mass of 10 300 kg. (a) Calculate its density. (b) Pure water is 1000 kg/m³. Will a block of density 1020 kg/m³ float or sink in (i) sea water, (ii) pure water?',a:'(a) 10 300 ÷ 10 = 1030 kg/m³. (b)(i) Floats: 1020 is less than 1030. (ii) Sinks: 1020 is more than 1000.'},
  {p:'p. 93',q:'Copper has a density of 8.96 g/cm³. (a) What is the mass of 20 cm³ of copper? (b) What is the volume of 4.5 g of copper?',a:'(a) mass = density × volume = 8.96 × 20 = 179.2 g. (b) volume = mass ÷ density = 4.5 ÷ 8.96 = 0.50 cm³ (to 2 decimal places).'},
  {p:'p. 93',q:'A toy car (mass 84 g) is put in a measuring cylinder that starts at 50 cm³. Read the new level from the diagram on page 93, then calculate the car\'s density. Steel is 7.8 g/cm³: give two reasons why your answer is different.',a:'Volume = (new reading − 50) cm³; density = 84 ÷ that volume. Read the level carefully from your book\'s diagram. Two reasons it differs from steel: the car is also made of other, less dense materials (such as plastic or rubber), and it may be hollow with air inside.'},
  {p:'p. 94',q:'Kerosene (0.81 g/cm³), mercury (14.00 g/cm³) and water (1.00 g/cm³) are poured into one cylinder and form layers A (top), B and C (bottom). Identify each layer.',a:'A kerosene (least dense), B water, C mercury (most dense).'},
  {p:'p. 94',q:'Hot air balloons usually fly early in the morning or late in the evening. Why not at midday?',a:'The outside air is cooler then, so the difference in density between the hot air inside the balloon and the air outside is bigger, which helps the balloon rise.'},
  {p:'p. 96',q:'Why should you read a measuring cylinder with your eye level with the liquid surface?',a:'So that you read the scale accurately. Looking from above or below makes the level appear higher or lower than it really is.'},
  {p:'p. 96',q:'Zara calculates the density of a small wooden toy as 5.27 g/cm³. Sofia says this is anomalous. Is Sofia right?',a:'Yes, it is likely to be anomalous. The book gives wood densities of 0.35–0.95 g/cm³, so 5.27 g/cm³ is far too high. A measurement or calculation has probably gone wrong.'}
 ],
 checklist:['I can recall what is meant by density.','I can recall the equation for density.','I can use the equation for density and can calculate density, mass or volume.','I know how to use density to predict whether an object will float or sink in water.']
},
{
 id:'3.2',title:'Heat and temperature',pages:'98–105',
 goals:['Understand the difference between heat and temperature.'],
 hook:{q:'Which needs more thermal energy to warm up by 10 °C: a glass with 0.25 kg of water, or a swimming pool with 375 000 kg of water? Why?',a:'The swimming pool, by a huge amount. It has vastly more particles, and every one of them needs extra energy to raise the temperature. That is the difference between heat (total) and temperature (average).'},
 big:'Heat is the TOTAL thermal energy of all the particles. Temperature is their AVERAGE energy.',
 steps:[
  {t:'What heat is',body:`<p>From Stage 7: thermal energy can be transferred between objects and stored in them, and stored thermal energy eventually dissipates into the surroundings. It is measured in <b>joules (J)</b>.</p>
   <p>When an object's thermal energy increases, its particles vibrate faster. <span class="kw">Heat</span> is the <b>total</b> thermal energy of all the vibrating particles in an object.</p>
   <ul><li><b>Same volume, different temperatures:</b> the hotter glass has faster particles, so it has more heat.</li><li><b>Same temperature, different volumes:</b> the bigger glass has more particles, so it has more heat, even though the temperature is the same.</li></ul>
   <p class="note">Compare the two glasses in each case.</p>`,
   extra:'glasses',
   check:C('Two glasses of water are both at 40 °C. Glass A has 100 cm³, glass B has 300 cm³. Which statement is true?',['A has more heat','B has more heat','They have the same heat','B has a higher temperature'],1,'Same temperature, but B has more particles, so its total thermal energy (heat) is greater.')},
  {t:'What temperature tells you',body:`<p><span class="kw">Temperature</span> is <b>not</b> the same as heat. It tells you two things:</p>
   <ul><li>which <b>direction</b> thermal energy will move</li><li>the <b>average</b> energy of the particles</li></ul>
   <p>Ice cream straight from a −20 °C freezer, in a room at 24 °C, has a temperature difference of 44 °C. Thermal energy moves from the air into the ice cream. The bigger the temperature difference, the <b>faster</b> the energy transfer.</p>
   <p>Because it's an average, temperature lets you compare objects of different sizes and materials. Saying hot soup is at a higher temperature than cold water means 100 soup particles have more energy than 100 water particles.</p>`,
   vis:'iceCream',
   check:C('Ice cream at −20 °C sits in a room at 24 °C. What is the temperature difference?',['4 °C','24 °C','44 °C','−44 °C'],2,'24 − (−20) = 24 + 20 = 44 °C. Subtracting a negative number is the same as adding.')},
  {t:'The sparkler puzzle',body:`<p>Sparks from a sparkler can be about <b>1000 °C</b>, yet one spark landing on your hand doesn't cause a serious burn. Why?</p>
   <p>A spark has a tiny mass, so it contains very few particles. Its <b>temperature</b> is high, but its total thermal energy (<b>heat</b>) is very small.</p>
   <p>Also, the huge temperature difference between the spark and the air means it loses energy very quickly. In the short time it takes to fall, both its temperature and its heat drop a lot.</p>
   <p class="note">Tap "Light the sparkler" and watch the sparks cool as they fall.</p>`,
   extra:'sparkler',
   check:C('Why doesn\'t a 1000 °C spark seriously burn your skin?',['Its temperature is low','It has very little heat because its mass is tiny, and it cools fast','Sparks are made of cold metal','Skin is a good conductor'],1,'High temperature, but very little total energy, and it loses that energy quickly to the air.')},
  {t:'How low can you go?',body:`<p>As temperature falls, particles move more slowly. In the 1800s a scientist called <b>Kelvin</b> predicted that, at a low enough temperature, particles would stop moving completely. He called this "absolute cold".</p>
   <p>Today we call it <span class="kw">absolute zero</span>: <b>−273 °C</b>, the lowest possible temperature. Particles can never actually be stopped completely, but scientists have got within billionths of a degree of it in laboratories.</p>
   <p class="note">Drag the slider and watch the particles.</p>`,
   extra:'absZero',
   check:C('What is absolute zero?',['0 °C','−100 °C','−273 °C, the lowest possible temperature','The temperature of space'],2,'At −273 °C particles would stop moving. Nothing can be colder.')},
  {t:'Measuring heat and temperature',body:`<p>In the book's investigation you heat a known mass of water in a polystyrene cup with an <b>immersion heater</b>. A <b>joulemeter</b> measures the energy supplied (heat, in J) and a thermometer measures the temperature (°C). Stir, then record both every minute until the temperature has risen by 10 °C.</p>
   <div class="safety"><b>Safety:</b> don't touch the immersion heater while it is on, and clamp it so it doesn't touch the bottom of the cup.</div>
   <p>The book's Activity 3.2.1 also uses temperature differences: a freezer at −18 °C and water at 40 °C differ by 40 − (−18) = 58 °C.</p>`,
   vis:'joulemeter',
   check:C('In the investigation, what does the joulemeter measure?',['The temperature of the water','The energy supplied to the water','The mass of the water','The time taken'],1,'Joules are the unit of energy. The thermometer measures temperature.')}
 ],
 mistakes:[
  ['Heat and temperature are the same thing.','Heat is the total thermal energy (J). Temperature is the average energy of the particles (°C).'],
  ['A hotter object always has more heat.','Not if it is much smaller. A 1000 °C spark has far less heat than a warm swimming pool.'],
  ['Cold moves into things.','Only thermal energy moves, always from the higher temperature to the lower one.']
 ],
 bq:[
  {p:'p. 102',q:'(a) Which is the unit of heat: J, °C, N or m³? (b) Which is the unit of temperature?',a:'(a) J (joule). (b) °C.'},
  {p:'p. 102',q:'Copper block A is 10 g and block B is 80 g. Both are at 25 °C. (a) Compare their temperatures. (b) Compare their heat.',a:'(a) Their temperatures are the same: 25 °C. (b) Block B has more heat, because it has more mass and so more particles, giving a greater total thermal energy.'},
  {p:'p. 102',q:'(a) Describe what is meant by the heat of an object. (b) Describe what is meant by its temperature.',a:'(a) The total thermal energy of all the vibrating particles in the object. (b) The average energy of the particles in the object.'},
  {p:'p. 102',q:'Objects A (30 °C), B (20 °C) and C (10 °C) are touching each other. In which directions is thermal energy transferred?',a:'A → B, A → C and B → C. Thermal energy always moves from the higher temperature to the lower temperature.'},
  {p:'p. 102',q:'Zara says: "If X has a higher temperature than Y, then X must always have more heat than Y." Is she right?',a:'No, it\'s false. Heat also depends on how many particles there are. A small spark at 1000 °C has much less heat than a large amount of water at a lower temperature.'},
  {p:'p. 103',q:'Mpemba activity: if the freezer is −18 °C, what is the temperature difference for water at 40 °C? What is the link between temperature difference and the speed of thermal energy transfer?',a:'40 − (−18) = 58 °C. The bigger the temperature difference, the faster the thermal energy transfer.'}
 ],
 checklist:['I know what is meant by heat.','I know what is meant by temperature.','I know the difference between heat and temperature.']
},
{
 id:'3.3',title:'Conservation of energy',pages:'106–111',
 goals:['Learn that energy cannot be created or destroyed.','Understand that, because energy is conserved, there is no overall increase or decrease in energy.','Understand that thermal energy is dissipated from hotter places to colder places.'],
 hook:{q:'Thermal is one energy store. How many other energy stores can you remember? Pick two and describe how energy can change from one to the other. What does "dissipated" mean?',a:'Other stores you have met include chemical, kinetic, gravitational potential and elastic. For example, a trebuchet changes elastic or gravitational potential energy into kinetic energy. Dissipated energy is energy that spreads out into the surroundings and becomes less useful.'},
 big:'Energy cannot be created or destroyed, only changed or transferred. The total energy out always equals the total energy in.',
 steps:[
  {t:'Energy is conserved',body:`<p>In everyday life, "conserving energy" means using less of it. In physics, energy is <span class="kw">conserved</span> means the <b>total amount stays the same</b>, whether it is stored, changed, transferred or dissipated.</p>
   <p>The book's energy diagram for a lamp: every 100 J of electrical energy in becomes <b>10 J of light</b> (useful) and <b>90 J of thermal energy</b> (wasted). 10 J + 90 J = 100 J.</p>
   <p>A car engine: 100% of the chemical energy in the fuel becomes 25% kinetic, 35% thermal and sound, and 40% chemical energy left in the exhaust gas. That adds up to 100% again.</p>
   <p>A lamp and an engine are both a <span class="kw">system</span>: something chosen to be studied.</p>
   <p class="note">Switch between the lamp and the engine.</p>`,
   extra:'sankey',
   check:C('A lamp gets 100 J of electrical energy and gives out 10 J of light. How much thermal energy does it give out?',['10 J','90 J','100 J','110 J'],1,'Energy is conserved: 100 − 10 = 90 J.')},
  {t:'Never created, never destroyed',body:`<p>The total energy output can <b>never</b> be greater than the input, because energy cannot be <span class="kw">created</span>.</p>
   <p>Wasted energy, such as thermal energy, is <span class="kw">dissipated</span>: it spreads into the surroundings and becomes less useful. But it is not <span class="kw">destroyed</span>.</p>
   <div class="eq">Energy cannot be created or destroyed, only changed or transferred.</div>
   <p>This is the <b>law of conservation of energy</b>.</p>
   <p class="note">Extension: find the missing value X in each energy diagram.</p>`,
   extra:'sankeyQuiz',
   check:C('A washing machine\'s total energy output is greater than its input. True or false?',['True','False'],1,'False. That would mean creating energy, which is impossible.')},
  {t:'Swinging bottles',body:`<p>In Activity 3.3.1, two identical bottles full of water hang from a shared string. When you pull one and let go, it swings, then slowly stops while the other bottle starts swinging. Then they swap back.</p>
   <p>The energy keeps passing from one bottle to the other. Energy is never created, so the swings can't grow. Each swing passes a little energy to the surroundings as thermal energy and sound, so eventually both bottles stop. The energy has been <b>dissipated</b>, not destroyed.</p>`,
   extra:'pendulums',
   check:C('Why do the bottles eventually stop swinging?',['The energy is destroyed','The energy is dissipated to the surroundings','Gravity switches off','The string runs out of energy'],1,'The energy spreads into the surroundings as thermal energy and sound. The total is still conserved.')},
  {t:'Bottle racer',body:`<p>In Activity 3.3.2 you build a bottle racer: an elastic band runs through a plastic bottle, held by a paperclip at one end and a pencil at the other. Turning the pencil twists the band, which <b>stores energy</b>. When you let go, that energy is transferred to make the bottle move (<b>kinetic energy</b>).</p>
   <p>More turns store more energy, so the racer can travel further.</p>
   <p class="note">Wind it up and race it.</p>`,
   extra:'racer',
   check:C('Which part of the bottle racer stores the energy?',['The bottle','The pencil','The elastic band','The paperclip'],2,'The twisted elastic band stores the energy that then moves the bottle.')}
 ],
 mistakes:[
  ['Wasted energy is destroyed.','It is dissipated (spread out into the surroundings), not destroyed.'],
  ['A good machine gives out more energy than it takes in.','Impossible: energy cannot be created. Output always equals input.'],
  ['"Conserving energy" in physics means saving energy.','In physics it means the total amount of energy stays the same.']
 ],
 bq:[
  {p:'p. 108',q:'(a) Write down the law of conservation of energy. (b) True or false: (i) a mobile phone\'s total input is greater than its total output; (ii) a washing machine\'s total output is greater than its input; (iii) a wood fire\'s total input equals its total output.',a:'(a) Energy cannot be created or destroyed, only changed or transferred. (b)(i) False. (ii) False. (iii) True.'},
  {p:'p. 108',q:'(Extension) Find X: (a) motor: 1000 J electrical → 500 J kinetic + X J thermal; (b) TV: 100 J electrical → 80 J light and sound + X J thermal; (c) bus engine: X J chemical → 700 J kinetic + 1300 J thermal and sound.',a:'(a) X = 1000 − 500 = 500 J. (b) X = 100 − 80 = 20 J. (c) X = 700 + 1300 = 2000 J.'},
  {p:'p. 109',q:'(a) A wood fire changes 70% of its chemical energy to thermal energy; the rest becomes light and waste chemicals. What percentage? (b) An oil power station: 55% becomes thermal energy and 10% is used in the station; the rest becomes electrical energy. What percentage?',a:'(a) 100 − 70 = 30%. (b) 100 − 55 − 10 = 35%.'},
  {p:'p. 109',q:'Sofia\'s LED flashlight uses 18 J of electrical energy. 7 J is wasted as thermal energy. She says 12 J becomes light. Is she correct?',a:'No. 18 − 7 = 11 J of light, not 12 J.'},
  {p:'p. 110',q:'Swinging bottles: (a) describe the movement, (b) explain it using the law of conservation of energy, (c) explain why the bottles eventually stop.',a:'(a) As one bottle slows, the other starts to swing, then they swap back. (b) Energy is transferred between the bottles; it is not created or destroyed. (c) Some energy is dissipated to the surroundings each swing (as thermal energy and sound) until none is left in the swinging.'},
  {p:'p. 111',q:'Bottle racer: which part stores the energy, and what energy makes the bottle move? What happens with more turns of the pencil?',a:'The twisted elastic band stores the energy. It is transferred as kinetic energy to make the bottle move. More turns store more energy, so the racer moves further (or faster).'}
 ],
 checklist:['I can recall the law of conservation of energy.','I know that the total energy input to a system is equal to the total energy output.','I can use the law of conservation of energy to calculate missing energy values.']
},
{
 id:'3.4',title:'Moving from hot to cold',pages:'112–118',
 goals:['Discover that thermal energy always transfers from hotter places to colder places.','Understand what is meant by heat dissipation.'],
 hook:{q:'You are in a hot room and it is colder outside. Someone opens a window and the room feels colder. What happens to the thermal energy?',a:'Thermal energy moves from the hotter air inside to the colder air outside. Cold air may come in too, but "cold" isn\'t something that flows. It\'s the room losing thermal energy that makes it feel colder.'},
 big:'Thermal energy always moves from hotter places to colder places, and the bigger the temperature difference, the faster it moves.',
 steps:[
  {t:'Feeling heat',body:`<p>When you hold a hot drink, you only feel heat if the drink is <span class="kw">hotter</span> than your hands. Thermal energy moves from the drink, through the cup, into your <span class="kw">colder</span> hands.</p>
   <p>We use this every day:</p>
   <ul><li>A <b>fridge</b>: thermal energy moves out of the food, so the food gets colder.</li><li>A <b>car engine</b>: water inside carries thermal energy away from the hot metal parts, so the engine doesn't overheat.</li><li><b>Animals</b> go into water to cool down: thermal energy moves from their bodies into the colder water.</li></ul>`,
   vis:'hotCup',
   check:C('Why can you feel heat when you hold a mug of hot tea?',['Cold moves out of your hands','Thermal energy moves from the hotter tea to your colder hands','Your hands make heat','The mug creates energy'],1,'Thermal energy flows from hotter to colder, so into your hands.')},
  {t:'Feeling cold',body:`<p>Holding ice feels cold, and it's easy to think "cold" flows from the ice into your hand. That does <b>not</b> happen. Cold is <b>not</b> an energy store and it cannot move. Cold just means there is less thermal energy.</p>
   <p>What really happens: thermal energy moves <b>away from your hand into the ice</b>. Your hand feels cold because it has lost energy. Holding ice too long can damage your skin, which needs the right amount of thermal energy to work.</p>
   <p class="note">Decide whether each statement is right or wrong.</p>`,
   extra:'coldMyth',
   check:C('On a ski slope at −2 °C, Sofia says gloves "keep the cold away" and Zara says gloves "keep the heat in". Who is correct?',['Sofia','Zara','Both','Neither'],1,'Zara. Cold doesn\'t move. Gloves slow down the transfer of thermal energy out of your hands.')},
  {t:'Dissipation',body:`<p>You met <span class="kw">dissipation</span> in Stage 7: energy that spreads out and becomes less useful. When thermal energy moves from a hotter place to a colder place, we say it has dissipated from the hotter place.</p>
   <p>The bigger the temperature difference between the hot and cold places, the faster the transfer.</p>
   <p>Energy is always conserved, so dissipated energy hasn't disappeared. It has just spread out. Some scientists think that, billions of years from now, all the thermal energy in the universe will have spread out, everything will be at the same low temperature, and no more energy transfers will be possible.</p>
   <p class="note">Watch two cups cool in the same room. Which one cools faster at first? (This is a simple model.)</p>`,
   extra:'cooling',
   check:C('Cup A starts at 90 °C and cup B at 50 °C, in a 20 °C room. Which one loses thermal energy faster at first?',['A, because the temperature difference is bigger','B, because it is cooler','They lose energy at the same rate','Neither loses energy'],0,'A is 70 °C above the room and B only 30 °C, so A transfers energy faster at first.')},
  {t:'The hot coffee puzzle',body:`<p>Activity 3.4.1 is a thought experiment. Your friend wants hot coffee with a little cold milk, and arrives in 5 minutes.</p>
   <p><b>Method A:</b> pour the coffee, wait 5 minutes, then add the milk.<br><b>Method B:</b> add the milk straight away, then wait 5 minutes.</p>
   <p>Use the idea from the last step: a bigger temperature difference means faster cooling. Think about it first, then reveal the reasoning.</p>`,
   extra:'coffee',
   check:C('Which idea helps you decide between methods A and B?',['Hotter coffee loses thermal energy faster to the room','Milk creates cold','Coffee can\'t cool in 5 minutes','Energy is destroyed when milk is added'],0,'The rate of transfer depends on the temperature difference with the surroundings.')}
 ],
 mistakes:[
  ['Cold flows from ice into your hand.','Thermal energy flows from your hand into the ice. Cold is not an energy store.'],
  ['Thermal energy can flow from cold to hot.','On its own, thermal energy always moves from hotter to colder places.'],
  ['Dissipated energy is lost forever.','It still exists. It has spread out into the surroundings, where it is less useful.']
 ],
 bq:[
  {p:'p. 115',q:'Copy and complete: Thermal energy moves from …… places to …… places.',a:'hotter … colder'},
  {p:'p. 115',q:'Marcus takes hot food home. (a) What happens to its temperature? (b) Explain using the words "thermal energy".',a:'(a) It decreases. (b) Thermal energy transfers from the hotter food to the colder surroundings.'},
  {p:'p. 115',q:'Ice cream from the freezer is −18 °C and the room is 22 °C. Explain what happens to its temperature.',a:'Its temperature rises. Thermal energy transfers from the warmer air in the room into the colder ice cream (which may start to melt).'},
  {p:'p. 115',q:'At an indoor ski slope (−2 °C), Sofia says "The gloves keep the cold away from my hands" and Zara says "The gloves keep the heat in my hands". Who is correct?',a:'Zara. Cold is not an energy store and cannot move. Gloves slow the transfer of thermal energy away from the warmer hands to the colder air.'},
  {p:'p. 115',q:'Car engine cooling: (a) explain how the water keeps the engine from getting too hot; (b) explain what happens to the thermal energy in the water in the radiator.',a:'(a) Cold water flows through the hot engine block; thermal energy transfers from the hotter metal into the colder water, which carries it away. (b) In the radiator, thermal energy transfers from the hot water to the colder air flowing over it, so the water cools.'},
  {p:'p. 116',q:'Hot coffee: which method, A (wait, then add milk) or B (add milk, then wait), gives the hottest coffee after 5 minutes? Explain. List variables to keep constant in an experiment.',a:'Reasoning from the book\'s ideas (the book does not print an answer): B. In A, the coffee stays hotter for 5 minutes, so its temperature difference with the room is bigger and it loses energy faster. Keep constant: the volumes of coffee and milk, starting temperatures, type of cup, room temperature and time.'},
  {p:'p. 117',q:'Heat dissipation investigation with a lamp in water: (a) explain the temperature change in the first minutes; (b) why does it stop rising? (c) Predict the result with an LED.',a:'(a) Thermal energy from the hot lamp dissipates into the colder water, so the water\'s temperature rises. (b) As the water warms, it dissipates energy to its surroundings, until it loses energy as fast as it gains it. (c) An LED changes more of its energy to light, so less thermal energy goes into the water and the temperature rise would be smaller.'}
 ],
 checklist:['I know that thermal energy moves from hotter places to colder places.','I know that the spreading out of thermal energy is called dissipation.']
},
{
 id:'3.5',title:'Ways of transferring thermal energy',pages:'119–129',
 goals:['Describe how thermal energy can be transferred by conduction.','Describe how thermal energy can be transferred by convection.','Describe how thermal energy can be transferred by radiation.'],
 hook:{q:'How are the particles arranged in a solid, a liquid and a gas? What happens to the particles in each when they are heated?',a:'Solid: packed close in fixed positions, vibrating. Liquid: close but able to move around. Gas: far apart, moving fast in straight lines. When heated, the particles in all three move faster and take up more space.'},
 big:'Conduction passes energy through touching particles, convection carries it with moving liquids and gases, and radiation needs no particles at all.',
 steps:[
  {t:'Heating and particles',body:`<p>Heating makes the particles in any substance move faster.</p>
   <ul><li><b>Solids:</b> particles vibrate about fixed positions. Heating makes them vibrate more <span class="kw">vigorously</span>, so they take up more space and the solid <span class="kw">expands</span>.</li>
   <li><b>Liquids:</b> particles vibrate and move around. Heating makes them move faster and take up more space.</li>
   <li><b>Gases:</b> particles are far apart and move in straight lines until they collide. Heating makes them move faster and collide harder and more often, so the gas expands.</li></ul>
   <p class="note">Choose a state and turn up the heat.</p>`,
   extra:'statesHeat',
   check:C('What happens to a solid when it is heated?',['Its particles stop vibrating','Its particles vibrate more vigorously and it expands','It always becomes a gas','Its particles get bigger'],1,'The particles themselves don\'t grow. They vibrate more and need more room, so the solid expands.')},
  {t:'Conduction',body:`<p>Vibrating particles push against their neighbours. The more vigorously they vibrate, the bigger the push, so the next particles vibrate more too. Passing on thermal energy like this is <span class="kw">conduction</span>.</p>
   <p>Conduction works best in <b>solids</b>, where particles are close together. <b>Metals</b> are the best conductors: their electrons are free to move and help pass the vibrations along. Wood, plastics and fabrics (wool, cotton) are poor conductors, which makes them good thermal <b>insulators</b>.</p>
   <p>Conduction is poor in liquids and gases, and impossible in a vacuum, where there are no particles.</p>
   <p>A pan is metal so food heats quickly, while its handle is plastic so it is comfortable to hold. Cold-weather clothes are made of good insulators.</p>
   <p class="note">Heat each rod. The paperclips are stuck on with wax.</p>`,
   extra:'conduction',
   check:C('Why are pan handles often made of plastic?',['Plastic is a good conductor','Plastic is a good thermal insulator, so it stays cooler to touch','Plastic is denser than metal','Plastic emits more radiation'],1,'Plastic is a poor conductor, so little thermal energy reaches your hand.')},
  {t:'Convection',body:`<p>When part of a liquid or gas is heated, its particles move faster and spread out. Its volume increases but its mass doesn't, so its <b>density decreases</b>. The warmer, less dense part rises through the cooler, denser part. This is <span class="kw">convection</span>.</p>
   <p>Cooler, denser liquid or gas sinks to take its place, gets heated, and rises in turn. This loop is a <span class="kw">convection current</span>, and it eventually heats all of the liquid or gas, like the water in a pan or the air in a room.</p>
   <p>Convection only happens in liquids and gases, where particles can move. It can't happen in a solid or in a vacuum.</p>`,
   extra:'convection',
   check:C('Why does warm air rise above a heater?',['Warm air has more mass','Warm air is less dense than the cooler air around it','Heaters blow air upwards','Cold air pushes it down from above'],1,'Heating makes the air expand and become less dense, so it rises.')},
  {t:'Radiation',body:`<p>Space between the Sun and Earth is a vacuum, so conduction and convection can't bring us the Sun's energy. It arrives by <span class="kw">radiation</span>: a wave we can't see, which transfers thermal energy very quickly.</p>
   <p>All objects <span class="kw">emit</span> (give out) thermal energy by radiation, and hotter objects emit more. Cooler objects absorb radiation from hotter ones. Radiation can pass through a vacuum and through transparent solids, liquids and gases.</p>
   <ul><li><b>Best</b> emitters and absorbers: dull, black, large surface area.</li><li><b>Worst</b> emitters and absorbers: shiny, white or silver, small surface area. These surfaces reflect radiation.</li></ul>
   <p>Penguins have black backs to absorb as much radiation as possible. Buildings in hot countries are often painted white to absorb less.</p>
   <p class="note">Compare the three cans.</p>`,
   extra:'radiation',
   check:C('Which surface is the best absorber of radiation?',['Shiny silver','Gloss white','Dull black','Polished mirror'],2,'Dull, black surfaces are the best absorbers (and emitters) of radiation.')},
  {t:'All three together',body:`<p>Most objects gain or lose thermal energy by a mix of conduction, convection and radiation. A <b>room heater</b> full of hot water heats its metal by conduction, heats the air touching it by conduction, warms the room by convection, and also emits radiation.</p>
   <p>Some objects are designed to <b>reduce</b> energy transfer:</p>
   <ul><li>A <b>vacuum flask</b>: a silvered glass bottle reflects radiation back into the drink, and the vacuum around it stops conduction.</li><li><b>Double glazing</b>: two panes of glass with a thin layer of argon gas, a poor conductor, between them.</li><li><b>Cavity walls</b>: foam between two layers of bricks is a poor conductor and stops convection currents forming.</li><li>Silver <b>car window covers</b> reflect the Sun's radiation away.</li></ul>
   <p class="note">Tap each part of the vacuum flask.</p>`,
   extra:'flask',
   check:C('In a vacuum flask, what is the vacuum for?',['To reflect radiation','To stop conduction (and convection), because there are no particles','To make the drink lighter','To produce heat'],1,'With no particles, there\'s nothing to pass the energy along. The silver surface deals with radiation.')},
  {t:'Which way?',body:`<p>Time to put it all together. For each situation, decide whether the main way thermal energy is transferred is conduction, convection or radiation.</p>`,
   extra:'whichWay',
   check:C('How does thermal energy travel through a metal cooking pan?',['Conduction','Convection','Radiation'],0,'Through a solid metal: conduction.')}
 ],
 mistakes:[
  ['Heat rises.','Hot air or hot water rises, because it is less dense. Thermal energy itself can move in any direction.'],
  ['Convection can happen in solids.','Only in liquids and gases. Solid particles can only vibrate in fixed positions.'],
  ['White clothes keep you warmer in the sun.','White reflects radiation. Black absorbs more, so a black T-shirt feels hotter.']
 ],
 bq:[
  {p:'p. 125',q:'(a) List the three ways thermal energy can be transferred. (b) Which two cannot occur in a vacuum? (c) Which occurs best in solids?',a:'(a) Conduction, convection and radiation. (b) Conduction and convection, because both need particles. (c) Conduction.'},
  {p:'p. 125',q:'Marcus wears a white T-shirt and Arun a black one on a sunny day. Explain any difference in the heat they feel.',a:'Arun feels hotter. Black is a good absorber of radiation, while white reflects more of it.'},
  {p:'p. 125',q:'Which method transfers thermal energy (a) through a metal cooking pan, (b) from the Sun to Earth?',a:'(a) Conduction. (b) Radiation.'},
  {p:'p. 125',q:'Water tank with an electric heater at the bottom: (a) how is all the water heated? (b) Why is hot water taken from the top? (c) Where should a second heater go, for when only some of the water needs heating?',a:'(a) Water next to the heater gets hotter, less dense and rises; cooler, denser water sinks to be heated. This convection current heats all the water. (b) The hottest water rises to the top. (c) Higher up the tank, so only the water above it is heated (reasoning from how convection works).'},
  {p:'p. 126',q:'Conduction investigation with metal rods: list variables to keep the same, and explain why it can\'t test wood or plastic.',a:'Keep the same: rod length and thickness, amount of wax, spacing of paperclips, and the heat source and its position. Wood or plastic can\'t be tested this way because they would burn or melt in the flame.'},
  {p:'p. 128',q:'Black, white and silver cans of hot water: predict which cools fastest and why.',a:'The dull black can should cool fastest, because dull black surfaces are the best emitters of radiation. The silver can should cool slowest.'}
 ],
 checklist:['I know that thermal energy can be transferred by conduction, convection or radiation.','I know how conduction and convection happen using a particle model.','I know that radiation does not require particles.','I know why conduction works best in solids and cannot happen in a vacuum.','I know why convection happens best in liquids and gases and cannot happen in solids or a vacuum.','I know which colours and textures are the best emitters and reflectors of radiation.']
},
{
 id:'3.6',title:'Cooling by evaporation',pages:'130–138',
 goals:['Understand how evaporation causes cooling.'],
 hook:{q:'Water boils at 100 °C, but it can evaporate at much lower temperatures, like 15 °C. What is the difference between boiling and evaporation, and how can water evaporate below its boiling point?',a:'Boiling happens throughout the liquid at the boiling point. Evaporation happens only at the surface, at any temperature. Some surface particles always have enough energy to escape, even when the average is low.'},
 big:'When the most energetic particles escape from a liquid, the average energy of those left behind falls, so the liquid cools.',
 steps:[
  {t:'What evaporation is',body:`<p><b>Evaporation</b> is the change of state from liquid to gas.</p>
   <p>In water at room temperature, the particles move in <span class="kw">random</span> (unpredictable) directions, at random speeds. Some move faster and have more energy than others.</p>
   <p>Some fast particles at the surface have enough energy to escape and become a gas. Some get pulled back, but others leave for good.</p>
   <p class="note">Watch the particles. The gold ones have the most energy.</p>`,
   extra:'evap',
   check:C('Which particles escape from the surface of a liquid during evaporation?',['The slowest ones','The ones with the most energy','Random particles of any energy','Only particles at the bottom'],1,'Only particles with enough energy can break away from the surface.')},
  {t:'Why evaporation cools',body:`<p>From Topic 3.2: temperature is a measure of the <b>average</b> energy of the particles.</p>
   <p>When the highest-energy particles escape, the average energy of the particles left behind goes <b>down</b>. So the temperature of the liquid drops: <b>evaporation causes cooling</b>.</p>
   <p>You feel this when you get out of a swimming pool. As water evaporates from your skin, it cools, and the energy needed to turn it from liquid to gas comes from your skin, so your skin cools too.</p>
   <p>Sweat works the same way. Sweat starts at skin temperature, but as it evaporates its temperature drops, so thermal energy transfers from your skin to the cooler sweat. In very humid air, sweat may not evaporate, which can be dangerous because your body temperature can rise. Some animals that don't sweat much cover themselves in water instead.</p>`,
   vis:'evapAvg',
   check:C('During evaporation, what happens to the average energy of the particles left in the liquid?',['It increases','It decreases','It stays the same','It becomes zero'],1,'The most energetic particles leave, so the average of those remaining falls.')},
  {t:'Coolers that use evaporation',body:`<p>A traditional <b>water cooler</b> is made of <span class="kw">porous</span> clay, which lets water slowly soak through. Water reaching the outside evaporates into the air, cooling the water inside.</p>
   <p>An <b>evaporative air cooler</b> has a sponge soaked in water and a fan. Warm room air blows through the sponge and gives up some of its thermal energy to evaporate the water, so the air comes out cooler.</p>
   <div class="safety"><b>Safety (book investigation):</b> keep water away from the fan, cables and sockets, and only touch switches with dry hands.</div>`,
   vis:'coolers',
   check:C('In an evaporative air cooler, where does the energy to evaporate the water come from?',['The fan\'s motor','The warm air blowing through the sponge','The cold water','Nowhere: it is created'],1,'The air gives up thermal energy to evaporate the water, so the air cools.')},
  {t:'Different liquids, different cooling',body:`<p>Different liquids have different forces holding their particles together.</p>
   <ul><li><b>Perfume</b> has weak forces, so it evaporates quickly (that's why you can smell it). It feels colder on your skin than water.</li><li><b>Liquid soap</b> has stronger forces, so it evaporates much more slowly. Water feels colder than soap.</li></ul>
   <div class="safety"><b>Safety:</b> don't put any liquid on your skin except water, soap or perfume, and wash soap off with plenty of water.</div>
   <p class="note">Put a drop of each liquid on the "hand" and watch which disappears first. (Speeds are for comparison only.)</p>`,
   extra:'liquidsRace',
   check:C('Isopropanol evaporates quickly. How does it feel on your skin?',['Warm','Cold','No different from water','It doesn\'t evaporate'],1,'Fast evaporation removes thermal energy from your skin quickly, so it feels cold.')}
 ],
 mistakes:[
  ['Evaporation only happens at 100 °C.','That\'s boiling. Evaporation happens at the surface at any temperature.'],
  ['Sweat cools you because it is cold.','Sweat starts at skin temperature. It cools you by evaporating.'],
  ['All liquids evaporate at the same rate.','Liquids with weaker forces between particles, like perfume, evaporate faster.']
 ],
 bq:[
  {p:'p. 134',q:'Complete using: least, most, different, the same, evaporate, condense, freeze. The energies of the particles in water at 25 °C are ……. Particles with the …… energy stay in the liquid. Particles with the …… energy can leave. When liquid water turns to gas, it is said to …….',a:'different … least … most … evaporate'},
  {p:'p. 134',q:'Water at 80 °C cools in a 20 °C room, mostly by radiation and conduction. Which also cools it: A freezing, B condensation, C evaporation, D boiling?',a:'C, evaporation.'},
  {p:'p. 134',q:'(a) What happens to the average energy of the particles in a liquid during evaporation? (b) What happens to its temperature? Explain.',a:'(a) It decreases. (b) The temperature decreases, because the highest-energy particles leave, so the average energy of the remaining particles falls.'},
  {p:'p. 134',q:'(a) Explain how sweat can cool the skin. (b) Why can skin get too warm when sweat cannot evaporate?',a:'(a) As sweat evaporates, its temperature drops, so thermal energy transfers from the skin to the cooler sweat and is used to evaporate it. (b) Without evaporation there is no cooling effect, so body temperature can rise.'},
  {p:'p. 134',q:'Isopropanol evaporates quickly. At room temperature it feels cold on the skin. Explain why.',a:'It evaporates quickly, so its highest-energy particles leave fast and it removes thermal energy from the skin quickly, making the skin feel cold.'},
  {p:'p. 135',q:'Air cooler investigation: why shouldn\'t you hold the thermometer? What would change with a dry towel?',a:'Your hand\'s thermal energy would affect the reading. With a dry towel there\'s no water to evaporate, so the air wouldn\'t be cooled.'},
  {p:'p. 136',q:'Feeling evaporation: which liquid evaporates fastest and slowest? Why is it hard to show the results in a bar chart?',a:'Ethanol or isopropanol feels coldest, so it evaporates fastest; liquid soap evaporates slowest. Feelings aren\'t numbers, so they can\'t be plotted. Measuring a temperature or a time would give data for a bar chart.'}
 ],
 checklist:['I know how evaporation can lower the average energy of particles in a liquid.','I know how evaporation can cause cooling effects.']
}
];

const CYP3=[
 {p:'3.1',m:1,q:'Which is the correct equation for density? A density = weight × volume, B density = mass ÷ volume, C density = volume ÷ mass, D density = weight ÷ volume.',a:'B'},
 {p:'3.2',m:2,q:'Which two statements about the density of air are true? A It is 0 g/cm³ because air has no mass. B It is less than that of solids because the particles in air are further apart. C It is more than that of liquids because the particles are closer together. D It is more than that of a vacuum because a vacuum has no particles.',a:'B and D.'},
 {p:'3.3',m:4,q:'An object has a mass of 60 g and a volume of 50 cm³. (a) Calculate its density, showing working and unit. [3] (b) Water is 1.0 g/cm³. Will the object float or sink? [1]',a:'(a) density = mass ÷ volume = 60 ÷ 50 = 1.2 g/cm³. (b) It sinks, because 1.2 g/cm³ is greater than 1.0 g/cm³.'},
 {p:'3.4',m:4,q:'Beaker X has 50 cm³ of water and beaker Y has 100 cm³, at the same temperature. (a) Compare the average energy of the particles. [2] (b) Compare the heat of the water. [2]',a:'(a) The average energy is the same, because the temperatures are the same. (b) Y has more heat: it has more water, so more particles, and a greater total thermal energy.'},
 {p:'3.5',m:2,q:'(a) State the unit of temperature. (b) State the unit of heat.',a:'(a) °C (b) J (joules)'},
 {p:'3.6',m:2,q:'Complete the law of conservation of energy: Energy is always ……, meaning that energy cannot be …… or …….',a:'conserved … created … destroyed'},
 {p:'3.7',m:2,q:'An electric lamp uses 50 J of electrical energy. 5 J becomes light; the rest is wasted as thermal energy. Calculate the wasted energy, with the unit.',a:'50 − 5 = 45 J'},
 {p:'3.8',m:3,q:'A small metal ball at 200 °C is dropped into water at 4 °C. (a) What happens to the temperature of the ball and the water just after? [2] (b) When the temperatures stop changing, which is true? A water hotter than ball, B ball hotter than water, C both the same, D both lower than 4 °C. [1]',a:'(a) The ball\'s temperature decreases and the water\'s increases, as thermal energy moves from the hotter ball to the colder water. (b) C'},
 {p:'3.9',m:3,q:'A metal spoon at room temperature is put in a cup of hot tea (see the diagram on page 140). Explain why the handle of the spoon gets warmer.',a:'Thermal energy transfers from the hotter tea to the colder spoon. Metal is a good conductor: the particles in the hot end vibrate more vigorously and pass the vibrations along, helped by free electrons. So energy travels by conduction up to the handle.'},
 {p:'3.10',m:6,q:'The diagram on page 141 shows convection currents around a heater. Explain what is happening to the air at (a) position 1 and (b) position 2.',a:'(a) Position 1 (rising beside the heater): the air is heated, expands, becomes less dense and rises. (b) Position 2 (coming back down): the air has cooled by transferring energy to the room, so it is denser and sinks back towards the heater. Check the positions against the diagram in your book.'},
 {p:'3.11',m:3,q:'Two identical cars, one black and one white, are parked in the sun for three hours. Is there any temperature difference inside them?',a:'Yes. The black car will be hotter inside, because black is a better absorber of radiation from the Sun, while white reflects more of it.'},
 {p:'3.12',m:3,q:'Explain how sweat can cool the skin, even when the sweat is at the same temperature as the skin.',a:'The highest-energy particles in the sweat evaporate, so the average energy (temperature) of the sweat left behind falls below skin temperature. Thermal energy then transfers from the skin to the cooler sweat and is used to evaporate more of it, so the skin cools.'}
];

const QUIZ3=[
 C('What is the density of water?',['0.1 g/cm³','1.0 g/cm³','7.9 g/cm³','100 g/cm³'],1,'Water is 1.0 g/cm³. Use it to predict float or sink.'),
 C('A block is 2 cm × 3 cm × 5 cm. What is its volume?',['10 cm³','30 cm³','15 cm³','25 cm³'],1,'2 × 3 × 5 = 30 cm³.'),
 C('A 40 g object has a volume of 20 cm³. Its density is…',['0.5 g/cm³','2 g/cm³','20 g/cm³','800 g/cm³'],1,'40 ÷ 20 = 2 g/cm³.'),
 C('Why does a steel ship float?',['Steel is less dense than water','Its average density, including all the air inside, is less than water','Ships are pushed up by waves','Steel repels water'],1,'Huge air spaces make the whole ship\'s average density lower than water\'s.'),
 C('What happens to the density of a gas when it is heated?',['It increases','It decreases','It stays the same','It becomes zero'],1,'It expands: same mass, larger volume, lower density.'),
 C('Heat is…',['The average energy of particles','The total thermal energy of all the particles','The same as temperature','Measured in °C'],1,'Heat is total energy, in joules.'),
 C('What is absolute zero?',['0 °C','−100 °C','−273 °C','−459 °C'],2,'−273 °C, the lowest possible temperature.'),
 C('A motor uses 1000 J and gives out 500 J of kinetic energy. How much thermal energy is wasted?',['0 J','500 J','1000 J','1500 J'],1,'1000 − 500 = 500 J.'),
 C('Which statement is the law of conservation of energy?',['Energy can be created by machines','Energy cannot be created or destroyed, only changed or transferred','Energy is destroyed when it is wasted','Energy always increases'],1,'That\'s the law.'),
 C('Thermal energy always moves…',['From colder to hotter places','From hotter to colder places','Upwards only','From liquids to solids'],1,'Always from hotter to colder.'),
 C('When does thermal energy transfer fastest?',['When the temperature difference is small','When the temperature difference is large','When both objects are cold','It always transfers at the same speed'],1,'Bigger difference, faster transfer.'),
 C('Which are the best conductors of thermal energy?',['Plastics','Metals','Fabrics','Gases'],1,'Metals, helped by their free electrons.'),
 C('Convection cannot happen in…',['Water','Air','A solid or a vacuum','A cooking pan of soup'],2,'It needs particles that can move: liquids and gases only.'),
 C('How does the Sun\'s energy reach Earth?',['Conduction','Convection','Radiation','Evaporation'],2,'Only radiation can cross the vacuum of space.'),
 C('Which surface is the worst emitter of radiation?',['Dull black','Shiny silver','Matt black','Dark brown'],1,'Shiny, white or silver surfaces are the worst emitters and absorbers.'),
 C('In double glazing, what is between the two panes?',['Water','A thin layer of argon gas','Metal foil','Foam'],1,'Argon, a poor conductor of heat.'),
 C('Evaporation cools a liquid because…',['Cold particles are added','The highest-energy particles escape','Its mass increases','It boils'],1,'Losing the fastest particles lowers the average energy.'),
 C('Which liquid evaporates fastest on your skin?',['Liquid soap','Water','Perfume','Honey'],2,'Perfume has weak forces between particles, so it evaporates quickly.')
];

/* =================== CHAPTER 3 VISUALS =================== */
Object.assign(VIS,{
sameVolume(){return `<div class="vis"><svg viewBox="0 0 380 220" role="img" aria-label="Balance with equal-sized iron and polystyrene cubes; the iron side drops">
 <rect x="182" y="70" width="16" height="120" rx="4" class="s-muted"/><rect x="130" y="188" width="120" height="12" rx="6" class="s-muted"/>
 <g class="beam" style="transform-origin:190px 66px;animation:tilt3 2s .3s ease-out both"><rect x="60" y="62" width="260" height="8" rx="4" class="s-ink"/>
  <line x1="80" y1="70" x2="80" y2="110" class="st-ink" stroke-width="1.5"/><line x1="300" y1="70" x2="300" y2="110" class="st-ink" stroke-width="1.5"/>
  <rect x="40" y="110" width="80" height="6" rx="3" class="s-ink"/><rect x="260" y="110" width="80" height="6" rx="3" class="s-ink"/>
  <g transform="translate(57 70)"><rect width="46" height="40" rx="4" fill="#F4F6FA" stroke="var(--ink)"/><circle cx="12" cy="12" r="3" fill="#cfd5e2"/><circle cx="30" cy="22" r="4" fill="#cfd5e2"/><circle cx="18" cy="30" r="3" fill="#cfd5e2"/></g>
  <g transform="translate(277 70)"><rect width="46" height="40" rx="4" fill="#6E7782" stroke="var(--ink)"/><text x="23" y="25" text-anchor="middle" style="font-weight:700;fill:#fff">Fe</text></g>
 </g>
 <circle cx="190" cy="66" r="6" class="s-sun"/>
 <text x="80" y="150" text-anchor="middle">polystyrene</text><text x="80" y="165" text-anchor="middle" class="small">1 cm³ = 0.05 g</text>
 <text x="300" y="150" text-anchor="middle">iron</text><text x="300" y="165" text-anchor="middle" class="small">1 cm³ = 7.9 g</text>
</svg><p class="cap">Same volume, very different mass. That difference is density.</p></div>`},
densityLadder(){const D=[['helium','gas',0.00018],['air','gas',0.0012],['wood','solid',0.35,0.95],['water','liquid',1.0],['concrete','solid',2.4],['aluminium','solid',2.7],['iron','solid',7.9],['osmium','solid',22]];
 const lo=Math.log10(0.0001),hi=Math.log10(30),X0=110,X1=360,sx=v=>X0+(Math.log10(v)-lo)/(hi-lo)*(X1-X0);
 let s='';[0.0001,0.001,0.01,0.1,1,10].forEach(t=>{const x=sx(t);s+=`<line x1="${x}" x2="${x}" y1="14" y2="${14+D.length*26}" class="st-line"/><text x="${x}" y="${30+D.length*26}" text-anchor="middle" class="small">${t}</text>`;});
 D.forEach(([n,st,v,v2],i)=>{const y=20+i*26;const col=st==='gas'?'var(--acc2)':st==='liquid'?'var(--sky)':'var(--acc)';
  s+=`<text x="${X0-8}" y="${y+9}" text-anchor="end">${n}</text><rect class="gbarx" x="${X0}" y="${y}" width="${sx(v2||v)-X0}" height="13" rx="4" fill="${col}" style="animation-delay:${i*.08}s"/>${v2?`<rect x="${sx(v)}" y="${y}" width="${sx(v2)-sx(v)}" height="13" rx="4" fill="${col}" opacity=".5"/>`:''}<text x="${sx(v2||v)+5}" y="${y+10}" class="small">${v2?v+'–'+v2:v} g/cm³</text>`;});
 s+=`<text x="${(X0+X1)/2}" y="${44+D.length*26}" text-anchor="middle" class="small">density in g/cm³ (each grid line is 10× the one before)</text>`;
 return `<div class="vis"><div class="ovx"><svg viewBox="0 0 420 ${58+D.length*26}" role="img" aria-label="Densities from the book's table, on a scale where each step is ten times bigger" style="min-width:380px">${s}</svg></div>
 <div class="row" style="justify-content:center"><span class="chip" style="border-color:var(--acc2)">gas</span><span class="chip" style="border-color:var(--sky)">liquid</span><span class="chip" style="border-color:var(--acc)">solid</span></div>
 <div class="row" style="justify-content:center;gap:28px">${['gas','liquid','solid'].map(k=>`<div style="text-align:center"><canvas class="pbox" data-state="${k}" width="110" height="80" aria-hidden="true"></canvas><div class="tiny">${k}</div></div>`).join('')}</div>
 <p class="cap">Book values; iron is from the text. The particle boxes show why gases are so much less dense.</p></div>`},
layersBalloon(){const L=[['vegetable oil','#E8C24A'],['water with red ink','#E05A5A'],['liquid soap','#5FB4E8'],['corn syrup','#F2E9C9'],['honey','#C77A1E']];
 return `<div class="vis"><div class="calcgrid">
 <svg viewBox="0 0 160 260" style="width:170px;margin:0" role="img" aria-label="Density column"><rect x="40" y="20" width="80" height="230" rx="10" fill="none" class="st-ink" stroke-width="2"/>${L.map((l,i)=>`<rect class="layer3" x="42" y="${24+i*44}" width="76" height="44" fill="${l[1]}" style="animation-delay:${(4-i)*.25}s"/>`).join('')}${L.map((l,i)=>`<text x="128" y="${50+i*44}" class="small">${i===0?'top':''}${i===4?'bottom':''}</text>`).join('')}</svg>
 <ol class="tiny" style="margin:0;padding-left:18px">${L.map(l=>`<li>${l[0]}</li>`).join('')}</ol>
 <div style="display:grid;gap:8px;justify-items:center"><svg viewBox="0 0 160 220" style="width:170px;margin:0" id="hab" role="img" aria-label="Hot air balloon"><g id="habG" style="transition:transform 1.2s ease"><path d="M80 20C40 20 22 52 26 84C30 112 60 128 66 142H94C100 128 130 112 134 84C138 52 120 20 80 20Z" fill="var(--acc)" stroke="var(--ink)"/><path d="M80 20C68 40 64 90 70 142M80 20C92 40 96 90 90 142" fill="none" stroke="var(--ink)" opacity=".4"/><path d="M68 142L72 160M92 142L88 160" stroke="var(--ink)"/><rect x="70" y="160" width="20" height="14" rx="2" fill="var(--earth)"/><path id="habFlame" d="M76 156Q80 146 84 156Z" fill="#FF9E3D" opacity="0"/></g><rect x="0" y="206" width="160" height="14" fill="var(--leaf-soft)"/></svg>
 <label for="habR" class="tiny">Air temperature inside</label><input type="range" id="habR" min="0" max="100" value="0" style="width:150px"><div class="tiny" id="habT">Same as outside: no lift</div></div></div>
 <p class="cap">The least dense liquid floats on top. The book's column, from top to bottom.</p></div>`},
iceCream(){return `<div class="vis"><svg viewBox="0 0 380 210" role="img" aria-label="Thermal energy flows from the warm air into the cold ice cream">
 <defs><marker id="m3a" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0 0L10 5L0 10z" fill="#FF8A5B"/></marker></defs>
 <rect x="0" y="0" width="380" height="210" class="s-sunsoft" opacity=".5"/>
 <path d="M170 110L190 190L210 110Z" fill="#E0A85A" stroke="var(--ink)"/><circle cx="190" cy="92" r="26" fill="#FFC2D6" stroke="var(--ink)"/>
 ${[[60,60,150,86],[60,140,160,112],[320,60,230,86],[320,140,220,112],[190,14,190,58]].map(([a,b,c,d],i)=>`<path class="flow" d="M${a} ${b}L${c} ${d}" stroke="#FF8A5B" stroke-width="3" fill="none" marker-end="url(#m3a)" style="animation-delay:${i*.2}s"/>`).join('')}
 <text x="20" y="34">room air: 24 °C</text><text x="236" y="190">ice cream: −20 °C</text>
 <text x="190" y="205" text-anchor="middle" class="small">temperature difference = 24 − (−20) = 44 °C</text>
</svg></div>`},
joulemeter(){return `<div class="vis"><svg viewBox="0 0 400 230" role="img" aria-label="Apparatus: immersion heater in a polystyrene cup of water, joulemeter, thermometer">
 <rect x="20" y="70" width="120" height="70" rx="8" class="s-ink"/><rect x="34" y="84" width="92" height="30" rx="4" fill="#0E1A12"/><text id="jmTxt" x="80" y="106" text-anchor="middle" style="font-family:var(--mono);font-size:18px;fill:#7CFFB0">00000</text><text x="80" y="134" text-anchor="middle" class="small" style="fill:#ddd">joulemeter (J)</text>
 <path d="M250 110L262 200H330L342 110Z" fill="#F2F2F2" stroke="var(--ink)"/><path d="M254 130L264 198H328L338 130Z" fill="var(--sky-soft)"/>
 <rect x="300" y="40" width="10" height="130" rx="4" fill="#555"/><rect x="298" y="150" width="14" height="30" rx="3" fill="#B33"/>
 <rect x="276" y="30" width="8" height="150" rx="4" fill="#fff" stroke="var(--ink)"/><rect id="thRed" x="278" y="150" width="4" height="28" fill="#E33"/><circle cx="280" cy="180" r="7" fill="#E33"/>
 <path d="M140 100C200 100 220 40 305 40" fill="none" stroke="#E33" stroke-width="2.5"/><path d="M140 112C210 112 230 60 305 60" fill="none" stroke="#222" stroke-width="2.5"/>
 <text x="352" y="120" class="small">polystyrene cup</text><text x="352" y="50" class="small">thermometer</text><text x="200" y="215" class="small">immersion heater</text>
 <text id="thTxt" x="230" y="26" text-anchor="end" style="font-family:var(--mono)">20.0 °C</text>
</svg><div class="row" style="justify-content:center"><button class="btn primary" id="jmGo">Switch on the heater</button><button class="btn" id="jmReset">Reset</button></div>
 <p class="cap">A demonstration of what the meters show as energy is supplied. Your own results will depend on your apparatus.</p></div>`},
hotCup(){return `<div class="vis"><svg viewBox="0 0 380 210" role="img" aria-label="Thermal energy moves outward from a hot drink into colder hands">
 <defs><marker id="m3b" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0 0L10 5L0 10z" fill="#FF6B6B"/></marker></defs>
 <path d="M60 60C40 80 40 150 70 170L110 150L110 80Z" fill="#E6B897" stroke="var(--ink)"/><path d="M320 60C340 80 340 150 310 170L270 150L270 80Z" fill="#E6B897" stroke="var(--ink)"/>
 <circle cx="190" cy="115" r="62" fill="#5A3A28" stroke="var(--ink)" stroke-width="3"/><circle cx="190" cy="115" r="50" fill="#3A2218"/>
 <text x="190" y="112" text-anchor="middle" style="fill:#FFD9C2;font-weight:700">hotter</text><text x="190" y="128" text-anchor="middle" class="small" style="fill:#FFD9C2">higher temperature</text>
 ${[[-1,-0.5],[-1,0.5],[1,-0.5],[1,0.5]].map(([dx,dy],i)=>`<path class="flow" d="M${190+dx*36} ${115+dy*50}L${190+dx*90} ${115+dy*70}" stroke="#FF6B6B" stroke-width="3" fill="none" marker-end="url(#m3b)"/>`).join('')}
 <text x="30" y="200">colder hands</text><text x="270" y="200">colder hands</text>
</svg><div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
 <div class="card" style="gap:4px;padding:12px"><b>Fridge</b><span class="tiny">Thermal energy moves out of the food, so the food gets colder.</span></div>
 <div class="card" style="gap:4px;padding:12px"><b>Car engine</b><span class="tiny">Water carries thermal energy away from the hot metal parts.</span></div>
 <div class="card" style="gap:4px;padding:12px"><b>Elephant bath</b><span class="tiny">Thermal energy moves from the body into the colder water.</span></div></div></div>`},
evapAvg(){return `<div class="vis"><svg viewBox="0 0 380 200" role="img" aria-label="Bar chart: average energy falls after the fastest particles leave">
 <text x="20" y="22">Particle energies in the liquid</text>
 ${[[1,2,3,3,4,4,4,5,5,6,7,9],[1,2,3,3,4,4,4,5,5,6]].map((arr,k)=>{const x0=30+k*180;const avg=arr.reduce((a,b)=>a+b,0)/arr.length;return arr.map((v,i)=>`<rect x="${x0+i*12}" y="${170-v*13}" width="9" height="${v*13}" rx="2" fill="${v>=7?'var(--sun-fill)':'var(--acc2)'}"/>`).join('')+`<line x1="${x0-4}" x2="${x0+arr.length*12}" y1="${170-avg*13}" y2="${170-avg*13}" stroke="var(--bad)" stroke-width="2" stroke-dasharray="5 4"/><text x="${x0+arr.length*12+4}" y="${174-avg*13}" class="small" style="fill:var(--bad)">avg</text><text x="${x0}" y="190" class="small">${k?'after the fastest escape':'before'}</text>`;}).join('')}
</svg><p class="cap">An illustration with made-up numbers: removing the two highest-energy particles (gold) lowers the average (dashed line).</p></div>`},
coolers(){return `<div class="vis"><div class="calcgrid">
 <svg viewBox="0 0 180 200" style="width:180px;margin:0" role="img" aria-label="Porous clay pot with water evaporating"><path d="M60 40Q30 70 34 120Q40 180 90 182Q140 180 146 120Q150 70 120 40Z" fill="#C98B5A" stroke="var(--ink)"/><rect x="66" y="30" width="48" height="14" rx="4" fill="#B37A4C" stroke="var(--ink)"/>
 ${[0,1,2,3,4,5].map(i=>`<circle class="bub3" cx="${40+i*20}" cy="${110+(i%2)*20}" r="3" fill="var(--sky)" style="animation-delay:${i*.4}s"/>`).join('')}<text x="90" y="198" text-anchor="middle" class="small">porous clay pot</text></svg>
 <svg viewBox="0 0 200 200" style="width:200px;margin:0" role="img" aria-label="Air cooler: warm air through a wet sponge comes out cooler"><rect x="70" y="30" width="70" height="150" rx="14" fill="var(--acc)" stroke="var(--ink)"/><rect x="80" y="60" width="50" height="60" rx="4" fill="#335" /><rect x="80" y="130" width="50" height="30" rx="4" fill="#9CD3F0" stroke="var(--ink)"/><text x="105" y="150" text-anchor="middle" class="small" style="fill:#123">sponge</text>
 <path class="flow" d="M10 145L78 145" stroke="#FF8A5B" stroke-width="3" fill="none"/><text x="6" y="136" class="small">warm air in</text>
 <path class="flow" d="M132 90L196 90" stroke="#5FD4F4" stroke-width="3" fill="none"/><text x="148" y="80" class="small">cooler air out</text></svg></div></div>`}
});

/* =================== CHAPTER 3 INTERACTIVE EXTRAS =================== */
Object.assign(EXTRA,{
volumeLab(){return `<div class="vis" id="vol3"><div class="row" style="justify-content:center"><button class="btn" data-vm="reg" aria-pressed="true">Regular block</button><button class="btn" data-vm="irr" aria-pressed="false">Irregular rock</button></div>
 <div id="volReg"><div class="calcgrid"><svg viewBox="0 0 220 230" style="width:260px;margin:0" id="blockSvg" aria-label="Block"></svg>
 <div style="display:grid;gap:6px">${['L','W','H'].map((k,i)=>`<label class="tiny" for="vb${k}">${['Length','Width','Height'][i]}: <b id="vbv${k}">${[10,6,4][i]}</b> mm</label><input type="range" id="vb${k}" min="1" max="12" value="${[10,6,4][i]}">`).join('')}<div class="bigstruct" id="vbOut">240 mm³</div></div></div></div>
 <div id="volIrr" hidden><div class="calcgrid"><svg viewBox="0 0 160 260" style="width:170px;margin:0" aria-label="Measuring cylinder"><rect x="50" y="20" width="60" height="220" rx="6" fill="none" class="st-ink" stroke-width="2"/>${[0,10,20,30,40,50,60,70,80].map(v=>`<line x1="50" x2="62" y1="${230-v*2.5}" y2="${230-v*2.5}" class="st-ink"/><text x="40" y="${234-v*2.5}" text-anchor="end" class="small">${v}</text>`).join('')}<rect id="cylW" x="52" y="${230-40*2.5}" width="56" height="${40*2.5+8}" fill="var(--sky-soft)" style="transition:all .8s"/><path id="rock" d="M70 0l14-6 12 4 4 12-8 10-16 2-8-10z" fill="#8A7B6B" stroke="var(--ink)" style="transition:transform 1s ease-in" transform="translate(0 -10)"/></svg>
 <div style="display:grid;gap:8px"><div class="tiny">Start: <b>40 cm³</b></div><div class="tiny">With rock: <b id="cylAfter">?</b></div><button class="btn primary" id="dropRock">Drop the rock in</button><div class="bigstruct" id="rockV"></div></div></div></div></div>`},
densityCalc(){return `<div class="vis" id="dcalc"><div class="calcgrid"><svg viewBox="0 0 200 170" style="width:220px;margin:0" aria-label="Formula triangle"><path d="M100 10L190 160H10Z" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="3"/><line x1="45" y1="95" x2="155" y2="95" stroke="var(--acc)" stroke-width="3"/><line x1="100" y1="95" x2="100" y2="160" stroke="var(--acc)" stroke-width="3"/>
 <g class="tri3" data-f="m"><rect x="60" y="45" width="80" height="40" fill="transparent"/><text x="100" y="78" text-anchor="middle" style="font-size:20px;font-weight:700">mass</text></g>
 <g class="tri3" data-f="d"><rect x="20" y="100" width="78" height="55" fill="transparent"/><text x="66" y="134" text-anchor="middle" style="font-size:15px;font-weight:700">density</text></g>
 <g class="tri3" data-f="v"><rect x="102" y="100" width="78" height="55" fill="transparent"/><text x="134" y="134" text-anchor="middle" style="font-size:15px;font-weight:700">volume</text></g></svg>
 <div style="display:grid;gap:8px;min-width:0"><div class="tiny">Find: <b id="dcFind">density</b></div><div id="dcInputs" style="display:grid;gap:6px"></div><button class="btn primary" id="dcGo">Calculate</button><div class="infobox" id="dcOut">Tap a word in the triangle to choose what to find.</div></div></div></div>`},
floatSink(){const M=[['pine wood',0.41],['polyethene',0.95],['water (for comparison)',1.0],['polycarbonate',1.2],['concrete',2.4],['aluminium',2.7],['osmium',22]];
 return `<div class="vis" id="fs"><div class="row" style="justify-content:center">${M.filter(m=>m[1]!==1).map(([n,d])=>`<button class="chip" data-fsd="${d}" data-fsn="${n}" aria-pressed="false">${n} ${d}</button>`).join('')}</div>
 <svg viewBox="0 0 380 180" id="fsSvg" aria-label="Tank of water"><rect x="40" y="40" width="300" height="130" rx="6" fill="none" class="st-ink" stroke-width="2"/><rect x="42" y="80" width="296" height="88" fill="var(--sky-soft)"/><line x1="42" x2="338" y1="80" y2="80" class="st-sky" stroke-width="2"/><text x="330" y="74" text-anchor="end" class="small">water: 1.0 g/cm³</text><rect id="fsBlock" x="170" y="10" width="40" height="30" rx="4" fill="var(--acc)" stroke="var(--ink)" style="transition:transform 1.4s cubic-bezier(.3,.7,.4,1)"/></svg>
 <div class="infobox" id="fsInfo">Choose a material (density in g/cm³).</div>
 <hr style="border:0;border-top:1px solid var(--line);width:100%">
 <svg viewBox="0 0 380 150" aria-label="Ship"><rect x="0" y="90" width="380" height="60" fill="var(--sky-soft)"/><g id="ship" style="transition:transform .8s"><path d="M70 60H310L280 110H100Z" fill="#555" stroke="var(--ink)"/><rect x="120" y="36" width="60" height="24" fill="#c33"/><rect id="cargo" x="190" y="40" width="80" height="20" fill="#E8B04B" opacity="0"/></g><line x1="0" x2="380" y1="90" y2="90" class="st-sky" stroke-width="2"/></svg>
 <div class="row" style="justify-content:center"><label for="cargoR" class="tiny">Cargo loaded</label><input type="range" id="cargoR" min="0" max="100" value="10" style="flex:1;max-width:260px"></div>
 <div class="infobox" id="shipInfo"></div></div>`},
glasses(){return `<div class="vis" id="gl"><div class="row" style="justify-content:center"><button class="btn" data-gl="t" aria-pressed="true">Same volume, different temperatures</button><button class="btn" data-gl="v" aria-pressed="false">Same temperature, different volumes</button></div>
 <canvas id="glC" class="trough" style="height:220px" aria-label="Two glasses of water with moving particles"></canvas>
 <div class="calcgrid" id="glBars"></div></div>`},
sparkler(){return `<div class="vis"><canvas id="spC" class="trough" style="height:240px;background:#120F26" aria-label="Sparkler animation"></canvas><div class="row" style="justify-content:center"><button class="btn primary" id="spGo">Light the sparkler</button></div><p class="cap">Sparks start near 1000 °C (book figure) and cool rapidly as they fall. Colours show cooling, not exact values.</p></div>`},
absZero(){return `<div class="vis"><canvas id="azC" class="trough" style="height:200px" aria-label="Particles slowing as temperature falls"></canvas>
 <div class="row" style="justify-content:center"><label for="azR" class="tiny">Temperature</label><input type="range" id="azR" min="-273" max="100" value="20" style="flex:1;max-width:320px"><b id="azT" style="font-family:var(--mono);min-width:6em">20 °C</b></div>
 <div class="infobox" id="azInfo"></div></div>`},
sankey(){return `<div class="vis" id="sk"><div class="row" style="justify-content:center"><button class="btn" data-sk="lamp" aria-pressed="true">Electric lamp</button><button class="btn" data-sk="car" aria-pressed="false">Car engine</button></div><svg viewBox="0 0 520 230" id="skSvg" aria-label="Energy diagram"></svg><div class="infobox" id="skInfo"></div></div>`},
sankeyQuiz(){const Q=[['Electric motor','1000 J electrical','500 J kinetic','X J thermal',500],['Television','100 J electrical','80 J light and sound','X J thermal',20],['Bus engine','X J chemical','700 J kinetic','1300 J thermal and sound',2000]];
 return `<div class="vis"><div class="sort">${Q.map(([n,a,b,c,ans],i)=>`<div class="srow sq" data-ans="${ans}"><span class="lbl"><b>${n}</b><br><span class="tiny">${a} → ${b} + ${c}</span></span><span class="seg"><input type="number" id="sq${i}" aria-label="Value of X for ${n}" style="width:90px;padding:6px;border-radius:8px;border:1px solid var(--line);background:var(--paper);color:var(--ink)"> J <button class="btn" data-sqc="${i}">Check</button></span><span class="why tiny" hidden style="flex-basis:100%"></span></div>`).join('')}</div></div>`},
pendulums(){return `<div class="vis"><canvas id="pdC" class="trough" style="height:220px" aria-label="Two coupled pendulum bottles"></canvas><div class="row" style="justify-content:center"><button class="btn primary" id="pdGo">Pull one bottle and let go</button></div><div class="infobox" id="pdInfo">Energy store in each bottle (kinetic + height):<div class="row" style="gap:6px;margin-top:6px"><span class="tiny" style="width:60px">Bottle 1</span><span class="ebar"><i id="pdE1"></i></span></div><div class="row" style="gap:6px"><span class="tiny" style="width:60px">Bottle 2</span><span class="ebar"><i id="pdE2"></i></span></div><div class="row" style="gap:6px"><span class="tiny" style="width:60px">Dissipated</span><span class="ebar"><i id="pdE3" style="background:var(--muted)"></i></span></div></div></div>`},
racer(){return `<div class="vis"><svg viewBox="0 0 420 140" aria-label="Bottle racer"><rect x="0" y="118" width="420" height="22" fill="var(--earth-soft)"/><g id="rcG" style="transition:transform 2.2s cubic-bezier(.2,.7,.3,1)"><rect x="20" y="70" width="110" height="46" rx="20" fill="rgba(200,230,255,.35)" stroke="var(--ink)"/><rect x="124" y="82" width="14" height="22" rx="3" fill="var(--sky)"/><line x1="26" y1="93" x2="138" y2="93" stroke="#B5651D" stroke-width="3"/><rect id="rcPen" x="136" y="62" width="6" height="56" rx="2" fill="#C33" style="transform-origin:139px 93px;transition:transform .3s"/></g><text id="rcTxt" x="410" y="30" text-anchor="end" style="font-family:var(--mono)">turns: 0</text></svg>
 <div class="row" style="justify-content:center"><button class="btn" id="rcWind">Turn the pencil</button><button class="btn primary" id="rcGo">Release</button><button class="btn" id="rcReset">Reset</button></div><div class="infobox" id="rcInfo">Each turn stores more energy in the twisted elastic band.</div></div>`},
coldMyth(){const S=[['Cold moves from the ice into my hand.','w'],['Thermal energy moves from my hand into the ice.','r'],['Gloves keep the heat in my hands.','r'],['Opening a window lets thermal energy move from the warm room to the colder air outside.','r'],['Cold is an energy store.','w']];
 return `<div class="vis"><div class="sort">${S.map(([t,a])=>`<div class="srow" data-a="${a}"><span class="lbl">${t}</span><span class="seg"><button class="btn" data-v="r">Right</button><button class="btn" data-v="w">Wrong</button></span></div>`).join('')}</div></div>`},
cooling(){return `<div class="vis"><canvas id="clC" class="trough" style="height:240px" aria-label="Cooling curves"></canvas><div class="row" style="justify-content:center"><button class="btn primary" id="clGo">Start the clock</button></div><p class="cap">Simple model: each cup loses energy at a rate proportional to how far it is above the 20 °C room. Not data from the book.</p></div>`},
coffee(){return `<div class="vis"><div class="calcgrid"><div class="card" style="gap:6px;padding:14px"><b>Method A</b><span class="tiny">Coffee → wait 5 min → add milk</span></div><div class="card" style="gap:6px;padding:14px"><b>Method B</b><span class="tiny">Coffee + milk → wait 5 min</span></div></div>
 <div class="row" style="justify-content:center"><span class="tiny">My prediction:</span><button class="btn" data-cf="A">A is hotter</button><button class="btn" data-cf="B">B is hotter</button><button class="btn" data-cf="S">No difference</button></div>
 <div class="infobox" id="cfInfo" hidden></div></div>`},
statesHeat(){return `<div class="vis"><div class="row" style="justify-content:center"><button class="btn" data-sh="solid" aria-pressed="true">Solid</button><button class="btn" data-sh="liquid" aria-pressed="false">Liquid</button><button class="btn" data-sh="gas" aria-pressed="false">Gas</button></div><canvas id="shC" class="trough" style="height:220px" aria-label="Particles being heated"></canvas><div class="row" style="justify-content:center"><label for="shR" class="tiny">Heat</label><input type="range" id="shR" min="0" max="100" value="20" style="flex:1;max-width:300px"></div></div>`},
conduction(){return `<div class="vis"><div class="row" style="justify-content:center"><button class="btn" data-cd="metal" aria-pressed="true">Metal rod</button><button class="btn" data-cd="wood" aria-pressed="false">Wooden rod</button></div><canvas id="cdC" class="trough" style="height:200px" aria-label="Rod heated at one end with paperclips"></canvas><div class="row" style="justify-content:center"><button class="btn primary" id="cdGo">Heat the end</button></div><div class="infobox" id="cdInfo">Paperclips are stuck on with wax. When the wax melts, a clip falls.</div></div>`},
convection(){return `<div class="vis"><div class="row" style="justify-content:center"><button class="btn" data-cv="pan" aria-pressed="true">Pan of water</button><button class="btn" data-cv="room" aria-pressed="false">Room with heater</button></div><canvas id="cvC" class="trough" style="height:260px" aria-label="Convection current animation"></canvas><p class="cap">Red = warmer, less dense. Blue = cooler, denser.</p></div>`},
radiation(){return `<div class="vis"><div class="row" style="justify-content:center"><button class="btn" data-rd="emit" aria-pressed="true">Hot cans: emitting</button><button class="btn" data-rd="absorb" aria-pressed="false">In the Sun: absorbing</button></div><canvas id="rdC" class="trough" style="height:240px" aria-label="Radiation from black, white and silver cans"></canvas><div class="infobox" id="rdInfo"></div></div>`},
flask(){const P={lid:['Lid','Stops warm air leaving by convection (and evaporation) from the top.'],silver:['Silvered wall','Shiny silver surfaces reflect radiation back into the drink.'],vacuum:['Vacuum','No particles, so no conduction or convection across the gap.'],glass:['Double-walled glass vessel','Glass is a poor conductor. The two walls hold the vacuum between them.'],cork:['Cork supports','The bottle only touches the outside at a few points, and cork is a poor conductor.'],case:['Outer case','Protects the fragile glass bottle.']};
 return `<div class="vis" id="fl"><div class="calcgrid"><svg viewBox="0 0 200 300" style="width:200px;margin:0" aria-label="Vacuum flask cross-section">
 <g class="flp" data-p="case"><rect x="30" y="40" width="140" height="250" rx="30" fill="#4A5578" stroke="var(--ink)" stroke-width="2"/></g>
 <g class="flp" data-p="glass"><rect x="50" y="50" width="100" height="225" rx="26" fill="#BFD6E8" stroke="var(--ink)"/></g>
 <g class="flp" data-p="vacuum"><rect x="58" y="58" width="84" height="209" rx="22" fill="#11131F"/></g>
 <g class="flp" data-p="silver"><rect x="64" y="64" width="72" height="197" rx="20" fill="#E8EAEE" stroke="#888"/></g>
 <rect x="70" y="70" width="60" height="185" rx="16" fill="#7A4A2A"/>
 <g class="flp" data-p="cork"><rect x="88" y="268" width="24" height="18" fill="#C8A26B"/><rect x="34" y="150" width="18" height="16" fill="#C8A26B"/><rect x="148" y="150" width="18" height="16" fill="#C8A26B"/></g>
 <g class="flp" data-p="lid"><rect x="62" y="16" width="76" height="40" rx="8" fill="#E8B04B" stroke="var(--ink)"/></g></svg>
 <div class="infobox" id="flInfo"><b>Tap a part of the flask.</b></div></div></div>`},
whichWay(){const S=[['Heat travels along a metal spoon in hot tea','cd'],['The Sun warms your face','rd'],['Hot water rises to the top of a tank','cv'],['Warm air rises above a heater and spreads around the room','cv'],['A black car gets hot in the sun','rd'],['A pan handle gets warm','cd'],['Energy crosses the vacuum of space','rd']];
 return `<div class="vis"><div class="sort">${S.map(([t,a])=>`<div class="srow" data-a="${a}"><span class="lbl">${t}</span><span class="seg"><button class="btn" data-v="cd">Conduction</button><button class="btn" data-v="cv">Convection</button><button class="btn" data-v="rd">Radiation</button></span></div>`).join('')}</div></div>`},
evap(){return `<div class="vis"><canvas id="evC" class="trough" style="height:240px" aria-label="Particles evaporating from a liquid"></canvas><div class="row" style="justify-content:center;gap:14px"><span class="tiny">Average energy of the liquid:</span><span class="ebar" style="width:200px"><i id="evBar"></i></span><button class="btn" id="evReset">Refill</button></div></div>`},
liquidsRace(){return `<div class="vis"><canvas id="lrC" class="trough" style="height:180px" aria-label="Drops of perfume, water and soap evaporating"></canvas><div class="row" style="justify-content:center"><button class="btn primary" id="lrGo">Put a drop of each on</button></div></div>`}
});

/* =================== CHAPTER 3 WIDGET INIT =================== */
function initWidgets3(){
 const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const dpr=Math.min(2,devicePixelRatio||1);
 const fit=cv=>{const W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==Math.round(W*dpr)){cv.width=W*dpr;cv.height=H*dpr;}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);return[g,W,H];};
 const loop=(cv,fn)=>{const f=t=>{if(!document.body.contains(cv))return;fn(t);requestAnimationFrame(f);};requestAnimationFrame(f);};
 const sortRows=root=>$$('.srow',root).forEach(r=>r.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;const ok=b.dataset.v===r.dataset.a;$$('[data-v]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));r.classList.toggle('ok',ok);r.classList.toggle('no',!ok);}));

 // particle boxes on density ladder
 $$('canvas.pbox').forEach(cv=>{const k=cv.dataset.state;const g=cv.getContext('2d');const n=k==='solid'?24:k==='liquid'?18:6;const P=Array.from({length:n},(_,i)=>({x:k==='solid'?12+(i%6)*17:10+Math.random()*90,y:k==='solid'?14+Math.floor(i/6)*17:k==='liquid'?36+Math.random()*38:10+Math.random()*60,vx:(Math.random()-.5)*(k==='gas'?2:.6),vy:(Math.random()-.5)*(k==='gas'?2:.6),hx:0,hy:0}));P.forEach(p=>{p.hx=p.x;p.hy=p.y;});
  loop(cv,()=>{g.clearRect(0,0,110,80);g.strokeStyle=css('--line');g.strokeRect(1,1,108,78);g.fillStyle=css('--acc2');P.forEach(p=>{if(k==='solid'){p.x=p.hx+(reduce?0:(Math.random()-.5)*1.4);p.y=p.hy+(reduce?0:(Math.random()-.5)*1.4);}else if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<6||p.x>104)p.vx*=-1;if(p.y<(k==='liquid'?32:6)||p.y>74)p.vy*=-1;}g.beginPath();g.arc(p.x,p.y,6,0,7);g.fill();});});});

 // volume lab
 if($('#vol3')){const up=()=>{const L=+$('#vbL').value,W=+$('#vbW').value,H=+$('#vbH').value;['L','W','H'].forEach(k=>$('#vbv'+k).textContent=$('#vb'+k).value);$('#vbOut').textContent=`${L} × ${W} × ${H} = ${L*W*H} mm³`;
   const s=11,dx=W*s*.5,dy=-W*s*.35,x0=24,y0=212;const p=(a,b)=>`${a.toFixed(1)} ${b.toFixed(1)}`;
   $('#blockSvg').innerHTML=`<path d="M${p(x0,y0)}L${p(x0+L*s,y0)}L${p(x0+L*s,y0-H*s)}L${p(x0,y0-H*s)}Z" fill="#D9A066" stroke="var(--ink)"/><path d="M${p(x0,y0-H*s)}L${p(x0+dx,y0-H*s+dy)}L${p(x0+L*s+dx,y0-H*s+dy)}L${p(x0+L*s,y0-H*s)}Z" fill="#E8B984" stroke="var(--ink)"/><path d="M${p(x0+L*s,y0)}L${p(x0+L*s+dx,y0+dy)}L${p(x0+L*s+dx,y0-H*s+dy)}L${p(x0+L*s,y0-H*s)}Z" fill="#B98250" stroke="var(--ink)"/><text x="${x0+L*s/2}" y="${y0+14}" text-anchor="middle" class="small">${L} mm</text><text x="${x0-4}" y="${y0-H*s/2}" text-anchor="end" class="small">${H} mm</text><text x="${x0+L*s+dx/2+6}" y="${y0+dy/2+4}" class="small">${W} mm</text>`;};
  ['L','W','H'].forEach(k=>$('#vb'+k).oninput=up);up();
  $$('[data-vm]').forEach(b=>b.onclick=()=>{$$('[data-vm]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#volReg').hidden=b.dataset.vm!=='reg';$('#volIrr').hidden=b.dataset.vm!=='irr';});
  $('#dropRock').onclick=()=>{$('#rock').setAttribute('transform','translate(0 200)');setTimeout(()=>{const w=$('#cylW');w.setAttribute('y',230-56*2.5);w.setAttribute('height',56*2.5+8);$('#cylAfter').textContent='56 cm³';$('#rockV').textContent='56 − 40 = 16 cm³';},700);};}
 // density calc
 if($('#dcalc')){let find='d';const lab={d:'density (g/cm³)',m:'mass (g)',v:'volume (cm³)'};
  const draw=()=>{$('#dcFind').textContent=lab[find].split(' ')[0];$$('.tri3').forEach(g=>g.classList.toggle('cover',g.dataset.f===find));
   $('#dcInputs').innerHTML=Object.keys(lab).filter(k=>k!==find).map(k=>`<label class="tiny" for="dc${k}">${lab[k]}</label><input type="number" step="any" id="dc${k}" style="padding:6px;border-radius:8px;border:1px solid var(--line);background:var(--paper);color:var(--ink)">`).join('');
   $('#dcOut').innerHTML=find==='d'?'density = mass ÷ volume':find==='m'?'mass = density × volume':'volume = mass ÷ density';};
  $$('.tri3').forEach(g=>g.onclick=()=>{find=g.dataset.f;draw();});draw();
  $('#dcGo').onclick=()=>{const v=k=>parseFloat(($('#dc'+k)||{}).value);let r,txt;
   if(find==='d'){r=v('m')/v('v');txt=`${v('m')} ÷ ${v('v')} = <b>${+r.toFixed(3)} g/cm³</b>`;}
   if(find==='m'){r=v('d')*v('v');txt=`${v('d')} × ${v('v')} = <b>${+r.toFixed(3)} g</b>`;}
   if(find==='v'){r=v('m')/v('d');txt=`${v('m')} ÷ ${v('d')} = <b>${+r.toFixed(3)} cm³</b>`;}
   $('#dcOut').innerHTML=isFinite(r)?txt+(find==='d'?`<br><span class="tiny">${r>1?'Denser than water: it would sink.':r<1?'Less dense than water: it would float.':'Same as water.'}</span>`:''):'Enter both numbers first.';};}
 // float/sink
 if($('#fs')){$$('[data-fsd]').forEach(b=>b.onclick=()=>{$$('[data-fsd]').forEach(x=>x.setAttribute('aria-pressed',x===b));const d=+b.dataset.fsd;const blk=$('#fsBlock');blk.style.transition='none';blk.style.transform='translateY(0)';
   requestAnimationFrame(()=>{blk.style.transition='';const y=d<1?70-30*(1-d)+30*d-30:126;blk.style.transform=`translateY(${d<1?40+d*30:126}px)`;});
   $('#fsInfo').innerHTML=`<b>${b.dataset.fsn}: ${d} g/cm³.</b> ${d<1?'Less dense than water, so it floats.':'More dense than water, so it sinks.'}`;});
  const r=$('#cargoR');const up=()=>{const c=+r.value;const avg=(0.35+c*0.0075).toFixed(2);$('#ship').style.transform=`translateY(${(c/100)*38}px)`;$('#cargo').setAttribute('opacity',c>5?1:0);
   $('#shipInfo').innerHTML=avg<1?`Average density of the whole ship (model value): <b>${avg} g/cm³</b>. Less than water, so it floats. More cargo means more mass, so it sits lower.`:`Average density (model value): <b>${avg} g/cm³</b>. Now more than water: an overloaded ship would sink!`;
   if(avg>=1)$('#ship').style.transform='translateY(70px)';};r.oninput=up;up();}
 // balloon
 if($('#habR')){const r=$('#habR');const up=()=>{const v=+r.value;$('#habG').style.transform=`translateY(${36-v*0.5}px)`;$('#habFlame').setAttribute('opacity',v>0?1:0);$('#habT').textContent=v===0?'Same as outside: no lift':v<50?'Warmer: the air expands and becomes less dense':'Hot: much less dense than the air outside, so it rises';};r.oninput=up;up();}
 // joulemeter
 if($('#jmGo')){let t=null;const reset=()=>{clearInterval(t);t=null;$('#jmTxt').textContent='00000';$('#thTxt').textContent='20.0 °C';$('#thRed').setAttribute('y',150);$('#thRed').setAttribute('height',28);};
  $('#jmGo').onclick=()=>{if(t)return;let J=0;t=setInterval(()=>{if(!document.getElementById('jmTxt')){clearInterval(t);t=null;return;}J+=420;const T=20+J/2100;$('#jmTxt').textContent=String(J).padStart(5,'0');$('#thTxt').textContent=T.toFixed(1)+' °C';const h=28+(T-20)*9;$('#thRed').setAttribute('y',178-h);$('#thRed').setAttribute('height',h);if(T>=30){clearInterval(t);t=null;}},300);};$('#jmReset').onclick=reset;}
 // glasses
 if($('#glC')){const cv=$('#glC');let mode='t';const mk=(n)=>Array.from({length:n},()=>({x:Math.random(),y:Math.random(),a:Math.random()*6}));let A,B;
  const set=()=>{A=mk(mode==='t'?30:20);B=mk(mode==='t'?30:60);const ea=mode==='t'?1:1,eb=mode==='t'?2.2:1;const sa=mode==='t'?1:1,sb=mode==='t'?2.2:1;
   const totA=A.length*(mode==='t'?1:1),totB=B.length*(mode==='t'?2.2:1);const mx=Math.max(totA,totB);
   $('#glBars').innerHTML=[['Glass A',mode==='t'?'cooler':'small',totA,mode==='t'?1:1],['Glass B',mode==='t'?'hotter':'large',totB,mode==='t'?2.2:1]].map(([n,l,t,av])=>`<div style="display:grid;gap:4px;width:100%"><b>${n} <span class="tiny">(${l})</span></b><span class="tiny">Average energy (temperature)</span><span class="ebar"><i style="width:${av/2.2*100}%"></i></span><span class="tiny">Total energy (heat)</span><span class="ebar"><i style="width:${t/mx*100}%;background:var(--sun-fill)"></i></span></div>`).join('');};
  $$('[data-gl]').forEach(b=>b.onclick=()=>{mode=b.dataset.gl;$$('[data-gl]').forEach(x=>x.setAttribute('aria-pressed',x===b));set();});set();
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);const draw=(P,cx,w,h,sp,hot)=>{const top=H-20-h;g.strokeStyle=css('--ink');g.lineWidth=2;g.strokeRect(cx-w/2,top,w,h);g.fillStyle='rgba(125,183,255,.15)';g.fillRect(cx-w/2,top,w,h);
    g.fillStyle=hot?'#FF8A5B':css('--acc2');P.forEach(p=>{if(!reduce)p.a+=.2*sp;const x=cx-w/2+8+p.x*(w-16)+Math.cos(p.a)*2.5*sp,y=top+8+p.y*(h-16)+Math.sin(p.a*1.3)*2.5*sp;g.beginPath();g.arc(x,y,4,0,7);g.fill();});};
   if(mode==='t'){draw(A,W*.3,110,140,1,false);draw(B,W*.7,110,140,2.2,true);}else{draw(A,W*.3,90,100,1,false);draw(B,W*.7,150,170,1,false);}
   g.fillStyle=css('--ink');g.font='13px system-ui';g.textAlign='center';g.fillText(mode==='t'?'A: 20 °C':'A: 40 °C',W*.3,16);g.fillText(mode==='t'?'B: 60 °C':'B: 40 °C',W*.7,16);});}
 // sparkler
 if($('#spC')){const cv=$('#spC');let S=[],on=false;$('#spGo').onclick=()=>{on=true;setTimeout(()=>on=false,5000);};
  loop(cv,()=>{const[g,W,H]=fit(cv);g.fillStyle='#120F26';g.fillRect(0,0,W,H);const sx=W/2,sy=50;g.strokeStyle='#888';g.lineWidth=3;g.beginPath();g.moveTo(sx,sy);g.lineTo(sx-60,H-10);g.stroke();
   if(on&&!reduce)for(let i=0;i<6;i++){const a=Math.random()*Math.PI*2,v=1+Math.random()*3;S.push({x:sx,y:sy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,T:1000});}
   S.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.08;p.T*=.965;});S=S.filter(p=>p.T>40&&p.y<H);
   S.forEach(p=>{const k=p.T/1000;g.fillStyle=`rgba(255,${Math.round(150+105*k)},${Math.round(60+180*k)},${Math.min(1,k*1.5)})`;g.beginPath();g.arc(p.x,p.y,1.5+k*1.5,0,7);g.fill();});
   if(on){g.fillStyle='#fff';g.beginPath();g.arc(sx,sy,6,0,7);g.fill();}
   g.fillStyle='#ddd';g.font='12px system-ui';g.textAlign='left';g.fillText('≈1000 °C here',sx+12,sy-8);g.fillText('much cooler by the time it falls',12,H-14);});}
 // absolute zero
 if($('#azC')){const cv=$('#azC');const r=$('#azR');const P=Array.from({length:40},()=>({x:Math.random(),y:Math.random(),vx:Math.random()-.5,vy:Math.random()-.5}));
  const up=()=>{const T=+r.value;$('#azT').textContent=T+' °C';$('#azInfo').innerHTML=T<=-273?'<b>Absolute zero (−273 °C).</b> In theory the particles would stop completely. Scientists have got within billionths of a degree of this, but never reached it.':T<0?'Colder: the particles move more slowly.':'The particles move about quickly.';};r.oninput=up;up();
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);const sp=(+r.value+273)/373*2.2;g.fillStyle=css('--acc2');P.forEach(p=>{if(!reduce){p.x+=p.vx*sp/W*3;p.y+=p.vy*sp/H*3;if(p.x<0||p.x>1)p.vx*=-1;if(p.y<0||p.y>1)p.vy*=-1;}g.beginPath();g.arc(10+p.x*(W-20),10+p.y*(H-20),5,0,7);g.fill();});});}
 // sankey
 if($('#sk')){const D={lamp:{inp:['electrical energy',100,'J'],out:[['light energy (useful)',10],['thermal energy (wasted)',90]],info:'10 J + 90 J = 100 J. Every joule that goes in comes out somewhere.'},car:{inp:['chemical energy in fuel',100,'%'],out:[['kinetic energy',25],['thermal and sound energy',35],['chemical energy in exhaust gas',40]],info:'25% + 35% + 40% = 100%. Energy is conserved.'}};
  const cols=['#FFD36E','#FF8A5B','#A88BFF'];
  const draw=k=>{const d=D[k];const tot=d.inp[1];const sc=150/tot;let y=30,s=`<rect class="skin" x="10" y="30" width="150" height="${tot*sc}" fill="#F2B531"/><text x="18" y="${30+tot*sc/2}" style="font-weight:700;fill:#2A2010">${d.inp[1]} ${d.inp[2]}</text><text x="18" y="${48+tot*sc/2}" class="small" style="fill:#2A2010">${d.inp[0]}</text>`;
   let yo=20;d.out.forEach(([n,v],i)=>{const h=v*sc;s+=`<path class="skp" d="M160 ${y}C230 ${y} 230 ${yo} 290 ${yo}L290 ${yo+h}C230 ${yo+h} 230 ${y+h} 160 ${y+h}Z" fill="${cols[i]}" opacity=".9" style="animation-delay:${i*.25}s"/><text x="296" y="${yo+h/2+4}" style="font-weight:700">${v} ${d.inp[2]}</text><text x="296" y="${yo+h/2+18}" class="small">${n}</text>`;y+=h;yo+=h+18;});
   $('#skSvg').innerHTML=s;$('#skInfo').textContent=d.info;};
  $$('[data-sk]').forEach(b=>b.onclick=()=>{$$('[data-sk]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(b.dataset.sk);});draw('lamp');}
 // sankey quiz
 $$('[data-sqc]').forEach(b=>b.onclick=()=>{const i=b.dataset.sqc;const row=b.closest('.srow');const v=parseFloat($('#sq'+i).value);const ok=v===+row.dataset.ans;row.classList.toggle('ok',ok);row.classList.toggle('no',!ok);const w=$('.why',row);w.hidden=false;w.textContent=ok?'Correct. Total in = total out.':'Not quite. Remember: total energy in = total energy out.';});
 // pendulums
 if($('#pdC')){const cv=$('#pdC');let t0=null;$('#pdGo').onclick=()=>{t0=performance.now();};
  loop(cv,(now)=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);let a1=0,a2=0,e1=0,e2=0,e3=0;
   if(t0!=null){const t=(now-t0)/1000;const env=Math.exp(-t/28);const w=reduce?0:5,beat=.35;a1=.5*env*Math.cos(beat*t)*Math.cos(w*t);a2=.5*env*Math.sin(beat*t)*Math.sin(w*t);e1=env*env*Math.cos(beat*t)**2;e2=env*env*Math.sin(beat*t)**2;e3=1-env*env;}
   g.strokeStyle=css('--ink');g.lineWidth=2;g.beginPath();g.moveTo(20,30);g.lineTo(W-20,30);g.stroke();
   [[W*.38,a1],[W*.62,a2]].forEach(([x,a])=>{const L=120,bx=x+Math.sin(a)*L,by=30+Math.cos(a)*L;g.beginPath();g.moveTo(x,30);g.lineTo(bx,by);g.stroke();g.save();g.translate(bx,by);g.rotate(-a);g.fillStyle='rgba(125,183,255,.6)';g.strokeStyle=css('--ink');g.beginPath();g.roundRect?g.roundRect(-14,0,28,56,8):g.rect(-14,0,28,56);g.fill();g.stroke();g.fillStyle='#E05A5A';g.fillRect(-6,-6,12,8);g.restore();});
   $('#pdE1').style.width=(e1*100)+'%';$('#pdE2').style.width=(e2*100)+'%';$('#pdE3').style.width=(e3*100)+'%';});}
 // racer
 if($('#rcWind')){let n=0;$('#rcWind').onclick=()=>{if(n>=10)return;n++;$('#rcTxt').textContent='turns: '+n;$('#rcPen').style.transform=`rotate(${n*40}deg)`;$('#rcInfo').textContent=`${n} turn${n>1?'s':''}: more energy stored in the twisted elastic band.`;};
  $('#rcGo').onclick=()=>{$('#rcG').style.transform=`translateX(${Math.min(270,n*27)}px)`;$('#rcInfo').innerHTML=n?`The elastic band\'s stored energy became <b>kinetic energy</b>. With ${n} turn${n>1?'s':''}, it rolled ${n<4?'a short way':n<8?'further':'a long way'}.`:'Nothing stored, so nothing happens. Turn the pencil first.';n=0;$('#rcTxt').textContent='turns: 0';};
  $('#rcReset').onclick=()=>{n=0;$('#rcG').style.transform='';$('#rcPen').style.transform='';$('#rcTxt').textContent='turns: 0';};}
 // cooling curves
 if($('#clC')){const cv=$('#clC');let t=0,run=false;$('#clGo').onclick=()=>{t=0;run=true;};
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);const X0=44,Y0=H-28,X1=W-12,Y1=14,tmax=60;const sx=v=>X0+v/tmax*(X1-X0),sy=v=>Y0-(v-10)/90*(Y0-Y1);
   g.strokeStyle=css('--line');g.fillStyle=css('--muted');g.font='11px system-ui';[20,40,60,80,100].forEach(v=>{g.beginPath();g.moveTo(X0,sy(v));g.lineTo(X1,sy(v));g.stroke();g.fillText(v+' °C',4,sy(v)+4);});g.fillText('time',X1-30,H-8);
   g.setLineDash([5,4]);g.strokeStyle=css('--muted');g.beginPath();g.moveTo(X0,sy(20));g.lineTo(X1,sy(20));g.stroke();g.setLineDash([]);
   if(run&&!reduce&&t<tmax)t+=.12;if(reduce&&run)t=tmax;
   [[90,'#FF8A5B','A'],[50,'#5FD4F4','B']].forEach(([T0,c,l])=>{g.strokeStyle=c;g.lineWidth=3;g.beginPath();for(let s=0;s<=t;s+=.5){const T=20+(T0-20)*Math.exp(-s/20);s?g.lineTo(sx(s),sy(T)):g.moveTo(sx(s),sy(T));}g.stroke();const T=20+(T0-20)*Math.exp(-t/20);g.fillStyle=c;g.beginPath();g.arc(sx(t),sy(T),5,0,7);g.fill();g.fillText(`${l}: ${T.toFixed(0)} °C`,sx(t)+8,sy(T)-6);});});}
 // coffee
 $$('[data-cf]').forEach(b=>b.onclick=()=>{$$('[data-cf]').forEach(x=>x.setAttribute('aria-pressed',x===b));const i=$('#cfInfo');i.hidden=false;
  i.innerHTML=(b.dataset.cf==='B'?'<b>That fits the science.</b> ':'<b>Think again.</b> ')+'In method A the black coffee stays hotter for the whole 5 minutes, so its temperature difference with the room is bigger and it loses thermal energy faster. In B the milk cools the coffee first, so it then loses energy more slowly. Reasoning from the book\'s ideas: B should end up hotter. The book leaves this as a question, so test it if you can.';});
 // states heat
 if($('#shC')){const cv=$('#shC');let st='solid';const r=$('#shR');const N=36;let P=[];const reset=()=>{P=Array.from({length:N},(_,i)=>({hx:(i%9),hy:Math.floor(i/9),x:0,y:0,vx:Math.random()-.5,vy:Math.random()-.5,init:false}));};reset();
  $$('[data-sh]').forEach(b=>b.onclick=()=>{st=b.dataset.sh;$$('[data-sh]').forEach(x=>x.setAttribute('aria-pressed',x===b));reset();});
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);const h=+r.value/100;const gap=18+h*(st==='solid'?6:0);const ox=W/2-4*gap,oy=H/2-1.5*gap;
   g.fillStyle=css('--acc');P.forEach(p=>{if(!p.init){p.x=ox+p.hx*gap;p.y=oy+p.hy*gap;p.init=true;}
    if(st==='solid'){const j=(1+h*4)*(reduce?0:1);p.x=ox+p.hx*gap+(Math.random()-.5)*j;p.y=oy+p.hy*gap+(Math.random()-.5)*j;}
    else{const sp=(st==='gas'?2:0.6)*(0.4+h*2.2)*(reduce?0:1);p.x+=p.vx*sp;p.y+=p.vy*sp;const top=st==='liquid'?H*.35-h*30:8;if(p.x<8||p.x>W-8)p.vx*=-1;if(p.y<top||p.y>H-8)p.vy*=-1;p.x=Math.max(8,Math.min(W-8,p.x));p.y=Math.max(top,Math.min(H-8,p.y));}
    g.beginPath();g.arc(p.x,p.y,7,0,7);g.fill();});
   g.fillStyle=`rgba(255,120,60,${.15+h*.5})`;g.fillRect(0,H-6,W,6);});}
 // conduction rod
 if($('#cdC')){const cv=$('#cdC');let mat='metal',t=-1;$$('[data-cd]').forEach(b=>b.onclick=()=>{mat=b.dataset.cd;t=-1;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#cdInfo').textContent='Paperclips are stuck on with wax. When the wax melts, a clip falls.';});
  $('#cdGo').onclick=()=>{t=0;};
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);const x0=40,x1=W-60,y=60;const k=mat==='metal'?1:0.06;if(t>=0&&t<400)t+=reduce?400:1;
   const n=40;for(let i=0;i<n;i++){const x=x0+(x1-x0)*i/n;const dist=(n-i)/n;const T=Math.max(0,1-dist/Math.max(.001,(t/300)*k*1.2));g.fillStyle=`rgb(${Math.round((mat==='metal'?140:150)+T*110)},${Math.round((mat==='metal'?145:100)-T*40)},${Math.round((mat==='metal'?155:60)-T*40)})`;g.fillRect(x,y,(x1-x0)/n+1,16);}
   g.strokeStyle=css('--ink');g.strokeRect(x0,y,x1-x0,16);
   if(t>=0){g.fillStyle='#FFB347';g.beginPath();g.moveTo(x1-6,y+70);g.quadraticCurveTo(x1+8,y+36,x1+2,y+18);g.quadraticCurveTo(x1+22,y+40,x1+10,y+70);g.fill();}
   let fallen=0;for(let i=0;i<5;i++){const x=x0+40+i*(x1-x0-60)/4;const dist=(x1-x)/(x1-x0);const meltT=dist/(k*1.2)*300;const fall=t>=0&&t>meltT;if(fall)fallen++;const yy=fall?Math.min(H-14,y+26+(t-meltT)*3):y+26;g.strokeStyle=css('--muted');g.lineWidth=2;g.beginPath();g.moveTo(x,yy);g.lineTo(x,yy+18);g.arc(x+4,yy+18,4,Math.PI,0,true);g.stroke();}
   if(t>=400)$('#cdInfo').innerHTML=mat==='metal'?`<b>${fallen} of 5 clips fell</b>, starting nearest the flame. Metal is a good conductor.`:`<b>${fallen} of 5 clips fell.</b> Wood is a poor conductor (a good insulator), so the energy barely travels. (In real life the book warns this method can't test wood: it would burn.)`;});}
 // convection
 if($('#cvC')){const cv=$('#cvC');let mode='pan';const P=Array.from({length:70},()=>({u:Math.random(),side:Math.random()<.5?0:1}));$$('[data-cv]').forEach(b=>b.onclick=()=>{mode=b.dataset.cv;$$('[data-cv]').forEach(x=>x.setAttribute('aria-pressed',x===b));});
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);const bx=W*.18,bw=W*.64,by=24,bh=H-60;g.strokeStyle=css('--ink');g.lineWidth=2;g.strokeRect(bx,by,bw,bh);
   if(mode==='pan'){g.fillStyle='rgba(125,183,255,.15)';g.fillRect(bx,by+20,bw,bh-20);g.fillStyle='#FF8A5B';g.beginPath();g.moveTo(W/2-30,by+bh+30);g.quadraticCurveTo(W/2,by+bh,W/2+30,by+bh+30);g.fill();}
   else{g.fillStyle='#C33';g.fillRect(bx+4,by+bh-70,16,66);g.fillStyle=css('--muted');g.font='11px system-ui';g.fillText('heater',bx+2,by+bh+16);}
   P.forEach(p=>{if(!reduce)p.u=(p.u+.0035)%1;let x,y,hot;const u=p.u;
    if(mode==='pan'){const cx=p.side?W/2+bw*.22:W/2-bw*.22;const rx=bw*.2,ry=bh*.36;const ang=u*Math.PI*2*(p.side?-1:1)+Math.PI/2;x=cx+Math.cos(ang)*rx*(p.side?-1:1)*-1;y=by+20+bh*.42+Math.sin(ang)*ry;hot=Math.cos(ang)*(p.side?1:-1)>0;}
    else{const L=[[bx+20,by+bh-10],[bx+20,by+14],[bx+bw-14,by+14],[bx+bw-14,by+bh-10]];const seg=Math.floor(u*4),f=u*4-seg;const a=L[seg],b=L[(seg+1)%4];x=a[0]+(b[0]-a[0])*f;y=a[1]+(b[1]-a[1])*f;hot=seg===0||(seg===1&&f<.6);}
    g.fillStyle=hot?'#FF6B6B':'#5FB4FF';g.beginPath();g.arc(x,y,3.5,0,7);g.fill();});});}
 // radiation cans
 if($('#rdC')){const cv=$('#rdC');let mode='emit';const W0=[];const info={emit:'Cans of hot water: the <b>dull black</b> can emits the most radiation, so it cools fastest. The <b>silver</b> can emits least.',absorb:'In sunlight: the <b>dull black</b> can absorbs the most radiation and heats up most. White and silver reflect much of it.'};
  $$('[data-rd]').forEach(b=>b.onclick=()=>{mode=b.dataset.rd;$$('[data-rd]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#rdInfo').innerHTML=info[mode];});$('#rdInfo').innerHTML=info.emit;
  let t=0;loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);if(!reduce)t+=.03;const cans=[['dull black','#1A1A1F',1],['white','#F4F4F4',.45],['silver','#C9CDD3',.2]];
   cans.forEach(([n,c,k],i)=>{const x=W*(i+1)/4,y=H-40;g.fillStyle=c;g.strokeStyle=css('--ink');g.fillRect(x-22,y-70,44,70);g.strokeRect(x-22,y-70,44,70);if(n==='silver'){g.fillStyle='rgba(255,255,255,.6)';g.fillRect(x-14,y-66,6,62);}g.fillStyle=css('--ink');g.font='12px system-ui';g.textAlign='center';g.fillText(n,x,H-16);
    const waves=Math.round(k*6);for(let w=0;w<waves;w++){const ph=((t*(mode==='emit'?1:-1)+w/waves)%1+1)%1;const r=30+ph*60;g.strokeStyle=`rgba(255,${mode==='emit'?140:200},80,${(1-ph)*.9})`;g.lineWidth=2;g.beginPath();g.arc(x,y-35,r,-Math.PI*.9,-Math.PI*.1);g.stroke();}
    if(mode==='absorb'&&k<1){const ph=(t%1);g.strokeStyle='rgba(255,220,120,.7)';g.beginPath();g.moveTo(x+20,y-70-ph*40);g.lineTo(x+40,y-100-ph*40);g.stroke();}});
   if(mode==='absorb'){g.fillStyle='#FFD36E';g.beginPath();g.arc(W-30,30,18,0,7);g.fill();}});}
 // flask
 if($('#fl')){const P={lid:['Lid','Stops warm air leaving by convection from the top.'],silver:['Silvered wall','Shiny silver surfaces reflect radiation back into the drink.'],vacuum:['Vacuum','No particles, so no conduction or convection across the gap.'],glass:['Double-walled glass vessel','Glass is a poor conductor. The two walls hold the vacuum between them.'],cork:['Cork supports','The bottle only touches the outside case at a few points, and cork is a poor conductor.'],case:['Outer case','Protects the glass bottle inside.']};
  $$('.flp').forEach(g=>g.addEventListener('click',e=>{e.stopPropagation();$$('.flp').forEach(x=>x.classList.toggle('sel',x===g));const[a,b]=P[g.dataset.p];$('#flInfo').innerHTML=`<b>${a}.</b> ${b}`;}));}
 // evaporation
 if($('#evC')){const cv=$('#evC');let P=[];const fill=()=>{P=Array.from({length:60},()=>({x:Math.random(),y:.45+Math.random()*.5,e:Math.random()**1.6,vx:Math.random()-.5,vy:Math.random()-.5,gone:false,gy:0}));};fill();$('#evReset').onclick=fill;
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);const surf=H*.42;g.fillStyle='rgba(125,183,255,.18)';g.fillRect(0,surf,W,H-surf);g.strokeStyle=css('--sky');g.beginPath();g.moveTo(0,surf);g.lineTo(W,surf);g.stroke();
   let sum=0,c=0;P.forEach(p=>{if(p.gone){if(!reduce)p.gy-=1.2;g.fillStyle='#FFC94D';g.globalAlpha=Math.max(0,1+p.gy/120);g.beginPath();g.arc(p.x*W,surf+p.gy,4,0,7);g.fill();g.globalAlpha=1;return;}
    const sp=(0.4+p.e*2.5)*(reduce?0:1);p.x+=p.vx*sp/W*2;p.y+=p.vy*sp/H*2;if(p.x<0||p.x>1)p.vx*=-1;if(p.y>.98)p.vy=-Math.abs(p.vy);
    if(p.y<.44){if(p.e>.8&&Math.random()<.5){p.gone=true;p.gy=0;}else p.vy=Math.abs(p.vy);}
    sum+=p.e;c++;g.fillStyle=p.e>.8?'#FFC94D':p.e>.4?css('--acc2'):'#5F7FD4';g.beginPath();g.arc(p.x*W,p.y*H,4,0,7);g.fill();});
   $('#evBar').style.width=(c?sum/c*100/0.45:0)+'%';});}
 // liquids race
 if($('#lrC')){const cv=$('#lrC');let t=-1;const L=[['perfume',3],['water',1],['liquid soap',.25]];$('#lrGo').onclick=()=>{t=0;};
  loop(cv,()=>{const[g,W,H]=fit(cv);g.clearRect(0,0,W,H);g.fillStyle='#E6B897';g.fillRect(10,H-40,W-20,30);if(t>=0&&!reduce)t+=1;if(reduce&&t>=0)t=600;
   L.forEach(([n,k],i)=>{const x=W*(i+1)/4;const r=t<0?0:Math.max(0,16-(t*k*.02));g.fillStyle='rgba(125,183,255,.8)';if(r>0){g.beginPath();g.ellipse(x,H-42,r*1.6,r*.55,0,0,7);g.fill();}
    g.fillStyle=css('--ink');g.font='12px system-ui';g.textAlign='center';g.fillText(n,x,24);if(t>=0)g.fillText(r>0?'evaporating…':'gone!',x,42);
    if(r>0&&t>=0&&Math.random()<k*.2){g.fillStyle='rgba(255,200,80,.8)';g.beginPath();g.arc(x+(Math.random()-.5)*20,H-60-Math.random()*40,2,0,7);g.fill();}});});}
 // sorters in ch3 extras
 ['coldMyth','whichWay'].forEach(()=>{});
}

/* =================== CHAPTER REGISTRY =================== */
const CHAPTERS_DATA={
 1:{title:'Photosynthesis and the carbon cycle',pages:'8–47',cypPages:'45–47',cypNote:'Questions 1.2, 1.3 and 1.4 use a diagram or graph, so keep your book open at those pages.',topics:TOPICS1,kw:KEYWORDS1,cyp:CYP1,quiz:QUIZ1},
 2:{title:'Properties of materials',pages:'48–83',cypPages:'82–83',cypNote:'Questions 2.1, 2.4 and 2.5 use a table, a model or a diagram, so keep your book open at those pages.',topics:TOPICS2,kw:KEYWORDS2,cyp:CYP2,quiz:QUIZ2},
 3:{title:'Forces and energy',pages:'84–141',cypPages:'139–141',cypNote:'Questions 3.9 and 3.10 use diagrams, so keep your book open at pages 140–141.',topics:TOPICS3,kw:KEYWORDS3,cyp:CYP3,quiz:QUIZ3}};
let CUR=1,TOPICS,KEYWORDS,CYP,QUIZ,CHD;
const qb=()=>S.quiz[CUR]?S.quiz[CUR].best:null;
function useChapter(n){if(!CHAPTERS_DATA[n])n=1;CUR=n;CHD=CHAPTERS_DATA[n];TOPICS=CHD.topics;KEYWORDS=CHD.kw;CYP=CHD.cyp;QUIZ=CHD.quiz;S.ch=n;if(!S.sec[n])S.sec[n]=TOPICS[0].id;QZ=null;}
/* =================== RENDER =================== */
const sectionsList=()=>[...TOPICS.map(t=>({id:t.id,label:t.title,num:t.id})),{id:'cards',label:'Key word cards',num:'Aa'},{id:'cyp',label:'Check your progress',num:'✓'},{id:'quiz',label:'Mixed quiz',num:'?'},{id:'papers',label:'Past papers',num:'P'}];
function topicProg(t){const n=t.steps.length;let d=0;t.steps.forEach((s,i)=>{if(S.checks[t.id+'-'+i]!=null)d++;});return d/n;}
function renderPills(){
 $('#pills').innerHTML=sectionsList().map(s=>{let p=null;const t=TOPICS.find(x=>x.id===s.id);if(t)p=topicProg(t);
  if(s.id==='cards'){const k=KEYWORDS.filter(w=>S.cards[w.id]==='known').length;p=k/KEYWORDS.length;}
  if(s.id==='quiz'&&qb()!=null)p=qb()/10;
  return `<button class="pill" data-sec="${s.id}" aria-current="${S.sec[CUR]===s.id}"><span class="num">${s.num}</span>${s.label}${p!=null?`<span class="bar"><i style="width:${Math.round(p*100)}%"></i></span>`:''}</button>`}).join('');
 // ring
 const parts=TOPICS.map(topicProg);parts.push(KEYWORDS.filter(w=>S.cards[w.id]==='known').length/KEYWORDS.length);parts.push(qb()!=null?qb()/10:0);
 const pct=Math.round(parts.reduce((a,b)=>a+b,0)/parts.length*100);
 $('#ringArc').setAttribute('stroke-dasharray',`${(pct/100*113).toFixed(1)} 113`);$('#ringTxt').textContent=pct+'%';
}
function checkHtml(key,c,tag='Quick check'){
 const done=S.checks[key];
 return `<div class="check" data-key="${key}"><div class="tag">${tag}</div><div class="q">${c.q}</div>
 <div class="opts">${c.opts.map((o,i)=>{let cls='';if(done!=null){if(i===c.ans)cls='right';else if(i===done)cls='wrong';}return `<button class="opt ${cls}" data-i="${i}" ${done!=null?'disabled':''}>${o}</button>`}).join('')}</div>
 ${done!=null?fbHtml(done===c.ans,c.why):''}</div>`;
}
const fbHtml=(ok,why)=>`<div class="fb ${ok?'good':'bad'}"><b>${ok?'Correct.':'Not quite.'}</b> ${why}</div>`;

function renderTopic(t){
 let firstOpen=t.steps.findIndex((s,i)=>S.checks[t.id+'-'+i]==null);if(firstOpen<0)firstOpen=t.steps.length;
 let h=`<div class="thead"><div class="eyebrow">Topic ${t.id} · Book pages ${t.pages}</div><h2>${t.title}</h2></div>
 <div class="intro"><div class="card"><div class="eyebrow">In this topic you will</div><ul class="goals">${t.goals.map(g=>`<li>${g}</li>`).join('')}</ul></div>
 <div class="card hook"><h3>Getting started</h3><p>${t.hook.q}</p><button class="reveal-btn" data-rev>Think first, then tap to see</button><p class="reveal-text" hidden>${t.hook.a}</p></div>
 <div class="card big"><h3>The big idea</h3><p>${t.big}</p></div></div>`;
 t.steps.forEach((s,i)=>{
  if(i>firstOpen){return;}
  const media=(s.vis?(s.vis==='cc'?VIS.cc(s.ccStage):VIS[s.vis]()):'')+(s.extra?EXTRA[s.extra]():'');
  h+=`<article class="card step" id="st-${t.id}-${i}"><div class="${media?'split':'txt'}"><div class="txt"><div class="stepbar"><div class="sno">Step ${i+1} of ${t.steps.length}</div>${laterBtn(t.id+'-'+i)}</div><h3>${s.t}</h3><div class="body">${s.body}</div>${s.after?`<div class="body">${s.after}</div>`:''}</div>${media?`<div class="media">${media}</div>`:''}</div>
   ${checkHtml(t.id+'-'+i,s.check)}</article>`;
 });
 if(firstOpen<t.steps.length-1){h+=`<div class="card locked">Answer the quick check above to open step ${firstOpen+2}. ${t.steps.length-firstOpen-1} more step${t.steps.length-firstOpen-1>1?'s':''} after this one.</div>`;}
 if(firstOpen>=t.steps.length){
  h+=`<div class="card"><div class="eyebrow">Watch out for these mistakes</div><div class="mist">${t.mistakes.map(m=>`<div class="mrow"><div class="w"><span>Common mistake</span>${m[0]}</div><div class="r"><span>Actually</span>${m[1]}</div></div>`).join('')}</div></div>
  <div class="card"><div class="eyebrow">Questions from your book</div><p class="note">Write your answer first, then compare it with the suggested answer.</p><div class="bq">${t.bq.map((q,i)=>bqHtml(t.id+'-'+i,q.p,q.q,q.a)).join('')}</div></div>
  <div class="card"><div class="eyebrow">Summary checklist (from the book)</div><div class="checklist">${t.checklist.map((c,i)=>{const k=t.id+'-'+i;return `<label><input type="checkbox" id="cl-${k}" data-cl="${k}" ${S.cl[k]?'checked':''}> ${c}</label>`}).join('')}</div></div>`;
  const ni=TOPICS.indexOf(t)+1;
  h+=`<div class="row" style="justify-content:flex-end"><button class="btn primary" data-go="${ni<TOPICS.length?TOPICS[ni].id:'cards'}">${ni<TOPICS.length?'Next: Topic '+TOPICS[ni].id+' '+TOPICS[ni].title:'Next: Key word cards'} →</button></div>`;
 }
 return h;
}
function bqHtml(k,p,q,a,marks){return `<div class="bqi"><div class="qh"><b>${q}</b><span class="pg">${p}${marks?` · <span class="marks">${marks} marks</span>`:''}</span></div>
 <textarea id="bq-${k}" data-bq="${k}" placeholder="Type your answer here">${esc(S.bq[k]||'')}</textarea>
 <button class="reveal-btn" data-rev>Show suggested answer</button><div class="ans" hidden><span>Suggested answer</span>${a}</div></div>`;}

function renderCards(){
 const order=[...KEYWORDS].sort((a,b)=>(S.cards[a.id]==='known')-(S.cards[b.id]==='known'));
 const known=KEYWORDS.filter(w=>S.cards[w.id]==='known').length;
 return `<div class="thead"><div class="eyebrow">Chapter ${CUR} · Key words</div><h2>Key word cards</h2><p class="meta">Tap a card to flip it. Mark it "Got it" or "Not yet". Cards you haven't got yet move to the front. ${known} of ${KEYWORDS.length} marked as got it.</p></div>
 <div class="cards">${order.map(w=>{const st=S.cards[w.id]||'';return `<div class="cardwrap"><button class="flip ${st}" data-flip><div class="in"><div class="f"><small>Topic ${w.topic}</small><strong>${w.t}</strong><small>Tap to flip</small></div><div class="b"><small>${w.t}</small>${w.d}</div></div></button>
 <div class="row"><button class="btn" data-mark="${w.id}" data-v="unsure">Not yet</button><button class="btn" data-mark="${w.id}" data-v="known">Got it</button></div></div>`}).join('')}</div>`;
}
function renderCyp(){
 return `<div class="thead"><div class="eyebrow">Chapter ${CUR} · Book pages ${CHD.cypPages}</div><h2>Check your progress</h2><p class="meta">These are the end-of-chapter questions from your book, with their marks. ${CHD.cypNote}</p></div>
 <div class="card"><div class="bq">${CYP.map((c,i)=>bqHtml('c'+CUR+'-cyp-'+i,'Question '+c.p,c.q,c.a,c.m)).join('')}</div></div>`;
}
let QZ=null;
function startQuiz(){
 // questions answered wrong before come first, then the rest
 const wrong=new Set((S.quiz[CUR]?S.quiz[CUR].wrong:[]));const idx=QUIZ.map((q,i)=>i);
 const first=shuffle(idx.filter(i=>wrong.has(i))),rest=shuffle(idx.filter(i=>!wrong.has(i)));
 QZ={order:[...first,...rest].slice(0,10),pos:0,score:0,wrong:[],ans:null};
}
function renderQuiz(){
 if(!QZ){return `<div class="thead"><div class="eyebrow">Chapter ${CUR} · All topics</div><h2>Mixed quiz</h2><p class="meta">Ten questions picked from all four topics. Questions you got wrong last time come back first.</p></div>
 <div class="card empty"><h3>${qb()!=null?'Best score so far: '+qb()+' / 10':'Ready when you are'}</h3><p>${qb()!=null?'Try again to beat it.':'Finish the topics first for the best result, or jump in now.'}</p><button class="btn primary" id="qStart">Start the quiz</button></div>`;}
 if(QZ.pos>=QZ.order.length){const n=QZ.order.length;return `<div class="thead"><h2>Mixed quiz</h2></div><div class="card empty"><div class="score">${QZ.score} / ${n}</div><p>${QZ.score===n?'Perfect score.':QZ.wrong.length+' to review. They will come up first next time.'}</p><button class="btn primary" id="qStart">Play again</button></div>`;}
 const q=QUIZ[QZ.order[QZ.pos]];
 return `<div class="thead"><div class="eyebrow">Question ${QZ.pos+1} of ${QZ.order.length}</div><h2>Mixed quiz</h2></div>
 <div class="qprog"><i style="width:${QZ.pos/QZ.order.length*100}%"></i></div>
 <div class="card qz"><div class="q" style="font-size:19px;font-weight:700">${q.q}</div>
 <div class="opts">${q.opts.map((o,i)=>{let cls='';if(QZ.ans!=null){if(i===q.ans)cls='right';else if(i===QZ.ans)cls='wrong';}return `<button class="opt ${cls}" data-qa="${i}" ${QZ.ans!=null?'disabled':''}>${o}</button>`}).join('')}</div>
 ${QZ.ans!=null?fbHtml(QZ.ans===q.ans,q.why)+`<button class="btn primary" id="qNext" style="justify-self:end">${QZ.pos+1<QZ.order.length?'Next question':'See my score'} →</button>`:''}</div>`;
}
function renderPapers(){return `<div class="thead"><div class="eyebrow">Chapter ${CUR}</div><h2>Past paper questions</h2></div>
 <div class="card empty"><h3>No past paper questions yet</h3><p>Only questions from official Cambridge Lower Secondary Checkpoint Science papers will go here, each tagged to the topic it tests. They'll be added once official papers are shared, from Cambridge's specimen set or from school.</p><p class="tiny">Until then, Check your progress (book pages 45–47) is the best exam-style practice.</p></div>`;}


/* =================== WIDGET INIT =================== */
let lampTimer=null;
function initWidgets(){
 // lamp
 if(lampTimer){cancelAnimationFrame(lampTimer);lampTimer=null;}
 const lr=$('#lampRange');
 if(lr){const g=$('#lampG'),info=$('#lampInfo'),bg=$('#bubbles');let last=0,bubs=[];
  const upd=()=>{const v=+lr.value;const x=250-v*2.1;g.setAttribute('transform',`translate(${x} 0)`);
   const beam=$('#beam');beam.setAttribute('d',`M-18 84 L18 84 L${300-x} 150 L${300-x} 40z`);beam.setAttribute('opacity',(0.42-v*0.0036).toFixed(2));
   const lvl=v<34?'high':v<67?'medium':'low';
   $('#distTxt').textContent=`distance between lamp and test tube: ${v<34?'short':v<67?'medium':'long'}`;
   info.innerHTML=`Light intensity: <b>${lvl}</b>. ${lvl==='high'?'Lots of light, so the plant photosynthesises fast and gives off many bubbles.':lvl==='medium'?'Less light, so fewer bubbles.':'Little light reaches the plant, so the rate of photosynthesis is low and you see few bubbles.'}`;};
  lr.addEventListener('input',upd);upd();
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tick=(ts)=>{const v=+lr.value;const interval=180+v*14;
   if(!reduce&&ts-last>interval){last=ts;const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',317+Math.random()*4);c.setAttribute('cy',98);c.setAttribute('r',2.4);c.setAttribute('class','s-surface st-sky');c.setAttribute('stroke-width','1.2');bg.appendChild(c);bubs.push({c,y:98});}
   bubs.forEach(b=>{b.y-=1.1;b.c.setAttribute('cy',b.y);});bubs=bubs.filter(b=>{if(b.y<28){b.c.remove();return false}return true});
   if(document.body.contains(lr))lampTimer=requestAnimationFrame(tick);};
  lampTimer=requestAnimationFrame(tick);
 }
 // leaf
 const ls=$('#leafSvg');if(ls){ls.addEventListener('click',e=>{const g=e.target.closest('.layer');if(!g)return;$$('.layer',ls).forEach(x=>x.classList.toggle('sel',x===g));const [h,d]=LEAF_INFO[g.dataset.l];$('#leafInfo').innerHTML=`<b>${h}.</b> ${d}`;});}
 // carbon cycle (topic visuals)
 $$('.vis.cc').forEach(box=>{const svg=$('svg',box);const setStage=st=>{$$('[data-st]',svg).forEach(el=>el.classList.toggle('hid',+el.dataset.st>st));$$('[data-ccs]',box).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ccs===st));
   $$('[data-node="fossil"]',svg).forEach(n=>n.style.opacity=st>=3?1:.18);};
  setStage(+box.dataset.stage);
  $$('[data-ccs]',box).forEach(b=>b.addEventListener('click',()=>setStage(+b.dataset.ccs)));
  svg.addEventListener('click',e=>{const p=e.target.closest('[data-a]');if(!p||p.classList.contains('hid'))return;const a=CC_ARROWS.find(x=>x.id===p.dataset.a);$$('.cc-arrow',svg).forEach(x=>x.classList.toggle('sel',x.dataset.a===a.id));$('.infobox',box).innerHTML=a.info;});
 });
 // greenhouse
 if($('#ghVis')){let st=1;const txt=['','<b>Step 1.</b> Energy from the Sun passes through the atmosphere and warms the surface of the ground.','<b>Step 2.</b> Some of the energy that reaches the ground is reflected.','<b>Step 3.</b> Some of the reflected energy passes back out through the atmosphere and is lost to space.','<b>Step 4.</b> Some of the reflected energy is blocked by carbon dioxide in the atmosphere, so it stays close to the Earth. This keeps the Earth warm.'];
  const upd=()=>{$$('#ghVis .ray').forEach(r=>r.style.opacity=+r.dataset.r<=st?1:0.06);$('#ghInfo').innerHTML=txt[st];$('#ghPrev').disabled=st===1;$('#ghNext').disabled=st===4;};
  $('#ghNext').onclick=()=>{st=Math.min(4,st+1);upd();};$('#ghPrev').onclick=()=>{st=Math.max(1,st-1);upd();};upd();}
 // equation builder
 if($('#eqb')){let sel=null;const box=$('#eqb');
  box.addEventListener('click',e=>{const c=e.target.closest('.chip');const s=e.target.closest('.slot');
   if(c&&!c.classList.contains('used')){sel=sel===c?null:c;$$('.chip',box).forEach(x=>x.setAttribute('aria-pressed',x===sel));}
   else if(s){if(s.dataset.tok){const old=$(`.chip[data-tok="${s.dataset.tok}"]`,box);old&&old.classList.remove('used');s.textContent='';delete s.dataset.tok;s.className='slot';}
    if(sel){s.textContent=sel.dataset.tok;s.dataset.tok=sel.dataset.tok;s.className='slot filled';sel.classList.add('used');sel.setAttribute('aria-pressed','false');sel=null;}}});
  $('#eqCheck').onclick=()=>{const v=k=>$(`.slot[data-s="${k}"]`,box).dataset.tok;const R=new Set([v('r1'),v('r2')]),P=new Set([v('p1'),v('p2')]);
   const rOK=R.has('water')&&R.has('carbon dioxide'),pOK=P.has('glucose')&&P.has('oxygen');
   ['r1','r2'].forEach(k=>{const s=$(`.slot[data-s="${k}"]`,box);if(s.dataset.tok)s.className='slot '+(['water','carbon dioxide'].includes(s.dataset.tok)?'ok':'no');});
   ['p1','p2'].forEach(k=>{const s=$(`.slot[data-s="${k}"]`,box);if(s.dataset.tok)s.className='slot '+(['glucose','oxygen'].includes(s.dataset.tok)?'ok':'no');});
   const inf=$('#eqInfo');inf.hidden=false;inf.innerHTML=rOK&&pOK?'<b>Perfect.</b> water + carbon dioxide → glucose + oxygen':'<b>Not yet.</b> The reactants (left) are what the plant takes in from the soil and the air. The products (right) are what it makes. Soil and nitrogen are not in the equation.';};
  $('#eqReset').onclick=()=>{$$('.slot',box).forEach(s=>{s.textContent='';delete s.dataset.tok;s.className='slot';});$$('.chip',box).forEach(c=>{c.classList.remove('used');c.setAttribute('aria-pressed','false');});sel=null;$('#eqInfo').hidden=true;};}
 // starch order
 if($('#starch')){let next=0;const box=$('#starch');box.addEventListener('click',e=>{const it=e.target.closest('.oitem');if(!it||it.classList.contains('done'))return;
  if(+it.dataset.i===next){it.classList.add('done');$('.n',it).textContent=next+1;it.disabled=true;next++;
   const items=$$('.oitem',box).sort((a,b)=>(a.classList.contains('done')?+$('.n',a).textContent:99)-(b.classList.contains('done')?+$('.n',b).textContent:99));items.forEach(x=>x.parentNode.appendChild(x));
   $('#starchInfo').innerHTML=next===8?'<b>All in order.</b> Boil (break membranes) → flame off → ethanol (remove green) → soften → iodine.':`Good. Now tap step ${next+1}.`;}
  else{it.classList.remove('shake');void it.offsetWidth;it.classList.add('shake');$('#starchInfo').innerHTML=`Not that one yet. Which step comes ${next===0?'first':'next'}?`;}});}
 // sorters (variables, tubes, meteor)
 $$('.srow').forEach(r=>{r.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;const ok=b.dataset.v===r.dataset.a;
  $$('[data-v]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));r.classList.toggle('ok',ok);r.classList.toggle('no',!ok);
  const why=$('.why',r);if(why)why.hidden=false;
  if(r.closest('#tubes')&&r.dataset.i!=null){const i=+r.dataset.i;const liq=$$('#tubes .liq')[i];const a=r.dataset.a;liq.setAttribute('fill',a==='more'?'var(--ind-yellow)':a==='less'?'var(--ind-purple)':'var(--ind-red)');liq.setAttribute('opacity',a==='depends'?'.45':'1');}
 });});
 // atom game
 if($('#game')){const svg=$('#game svg');const pos={air:[190,31],plants:[72,137],animals:[308,137],decomp:[230,240],fossil:[60,250]};
  const names={air:'in the air',plants:'inside a plant',animals:'inside an animal',decomp:'inside a decomposer',fossil:'in a fossil fuel'};
  const MOVES={1:{air:'plants'},2:{plants:'air',animals:'air',decomp:'air'},3:{plants:'animals'},4:{plants:'fossil',animals:'fossil'},5:{plants:'decomp',animals:'decomp'},6:{fossil:'air'}};
  const PN={1:'photosynthesis',2:'respiration',3:'feeding',4:'formation of fossil fuels',5:'decomposition',6:'combustion'};
  let at='air',visited=new Set(['air']),rolls=0;
  const place=()=>{const [x,y]=pos[at];const a=$('#atom',svg),t=$('#atomC',svg);a.setAttribute('cx',x+50);a.setAttribute('cy',y-14);t.setAttribute('x',x+50);t.setAttribute('y',y-10);
   $('#gameVisited').textContent=`Places visited: ${visited.size} of 5 · Rolls: ${rolls}`;};
  place();
  $('#roll').onclick=()=>{const n=1+Math.floor(Math.random()*6);rolls++;$('#die').textContent=n;const to=MOVES[n][at];
   if(to){const from=at;at=to;visited.add(to);$('#gameInfo').innerHTML=`You rolled <b>${n}: ${PN[n]}</b>. You moved from ${names[from]} to <b>${names[to]}</b>.`+(visited.size===5?' <b>You have visited every part of the carbon cycle!</b>':'');}
   else $('#gameInfo').innerHTML=`You rolled <b>${n}: ${PN[n]}</b>. That process can't move a carbon atom that is ${names[at]}, so you stay put.`;
   place();};
  $('#gameReset').onclick=()=>{at='air';visited=new Set(['air']);rolls=0;$('#die').textContent='·';$('#gameInfo').innerHTML='Your carbon atom starts <b>in the air</b>, as part of carbon dioxide.';place();};}
 // chain
 if($('#chainV')){const L=$$('#chainV .link');let n=1;$('#chainNext').onclick=()=>{if(n<L.length){L[n].classList.add('on');n++;}$('#chainNext').disabled=n>=L.length;};$('#chainReset').onclick=()=>{L.forEach((l,i)=>l.classList.toggle('on',i===0));n=1;$('#chainNext').disabled=false;};}
 // sea level
 if($('#sea')){const st={sea:false,land:false,warm:false};const upd=()=>{let y=110;if(st.land)y-=14;if(st.warm)y-=6;const w=$('#seaW');w.setAttribute('y',y);w.setAttribute('height',178-y);$('#seaLine').setAttribute('y1',y);$('#seaLine').setAttribute('y2',y);
   $('#seaIce').style.opacity=st.sea?0:1;$('#seaIce').setAttribute('y',y-10);$('#landIce').style.opacity=st.land?0:1;
   $$('[data-sea]',$('#sea')).forEach(b=>b.dataset.sea!=='reset'&&b.setAttribute('aria-pressed',st[b.dataset.sea]));};
  const msg={sea:'The floating ice melted, but the water level stayed the same. Ice already in the sea doesn\'t raise the level.',land:'The ice on land melted and ran into the sea. The water level went up.',warm:'Warming made the water expand. The water level went up a little.'};
  $$('[data-sea]',$('#sea')).forEach(b=>b.onclick=()=>{const k=b.dataset.sea;if(k==='reset'){st.sea=st.land=st.warm=false;$('#seaInfo').textContent='Try each change and watch the water level.';}else{st[k]=true;$('#seaInfo').textContent=msg[k];}upd();});upd();}
 initWidgets2();
 try{initWidgets3();}catch(e){console.error(e);}
}

/* =================== GALAXY: themes, rail, study-later, stickers, notes, fonts =================== */
if(!S.later)S.later={};
if(!S.view)S.view='chapter';
const PKEY='sci9-prefs',NKEY='sci9-notes';
let P={font:0};try{Object.assign(P,JSON.parse(localStorage.getItem(PKEY)||'{}'));}catch(e){}
const saveP=()=>{try{localStorage.setItem(PKEY,JSON.stringify(P));}catch(e){}};
const THEME_NAMES={1:'Aurora',2:'Rose Nebula',3:'Comet Trail',4:'Sunrise',5:'Ember',6:'Deep Space',7:'Starlight',8:'Supernova',9:'Blue Moon',later:'Night Watch',stickers:'Star Collector'};
const FONTS=[
 ['Classic','Bricolage Grotesque','Atkinson Hyperlegible'],
 ['Friendly','Fredoka','Nunito'],
 ['Space age','Orbitron','Exo 2'],
 ['Easy reading','Lexend','Lexend'],
 ['Playful','Baloo 2','Quicksand'],
 ['Clean','Sora','Figtree']];
function applyFont(){document.body.dataset.font=P.font||0;}
const toast=(html,cls='')=>{const t=document.createElement('div');t.className='toast '+cls;t.setAttribute('role','status');t.innerHTML=html;document.body.appendChild(t);setTimeout(()=>t.remove(),cls?3600:2600);};

/* ---------- all steps in book order, for stickers ---------- */
function allSteps(){const out=[];Object.keys(CHAPTERS_DATA).map(Number).sort((a,b)=>a-b).forEach(ch=>{CHAPTERS_DATA[ch].topics.forEach(t=>t.steps.forEach((s,i)=>out.push({ch,topic:t.id,i,key:t.id+'-'+i,title:s.t,ttitle:t.title})));});return out;}

/* ---------- stickers (original space designs) ---------- */
const STK_VARIANTS=[['Aurora','#6EE7B7','#9B7BFF','#1C2B4D'],['Rose','#FF6FB5','#FFD36E','#3A1E48'],['Comet','#5FD4F4','#C3A6FF','#172449'],['Golden','#FFD36E','#FF9E64','#36264A'],['Violet','#A88BFF','#FF6FB5','#241E4D'],['Starlight','#F3F0FF','#5FD4F4','#1D1C45']];
const STK_SHAPES=['Ringed Planet','Crescent Moon','Bright Star','Comet','Rocket','Spiral Galaxy','Flying Saucer','Space Helmet','Constellation','Supernova','Ocean Planet','Satellite','Telescope','Black Hole','Shooting Star','Nebula'];
function stickerInfo(idx){const sh=idx%16,va=(Math.floor(idx/16)+idx*5)%6;return{sh,va,name:STK_VARIANTS[va][0]+' '+STK_SHAPES[sh]};}
function stickerSVG(idx,size=96){
 const {sh,va}=stickerInfo(idx);const [,a,b,bg]=STK_VARIANTS[va];const id='stkg'+idx;
 const star=(x,y,r)=>`<path d="M${x} ${y-r}L${x+r*.28} ${y-r*.28}L${x+r} ${y}L${x+r*.28} ${y+r*.28}L${x} ${y+r}L${x-r*.28} ${y+r*.28}L${x-r} ${y}L${x-r*.28} ${y-r*.28}Z" fill="#fff"/>`;
 let art='';
 switch(sh){
  case 0:art=`<ellipse cx="50" cy="52" rx="36" ry="10" fill="none" stroke="${b}" stroke-width="4" transform="rotate(-18 50 52)" opacity=".55"/><circle cx="50" cy="50" r="19" fill="url(#${id})"/><path d="M15 58 Q50 72 85 46" fill="none" stroke="${b}" stroke-width="4" stroke-linecap="round" transform="rotate(-6 50 52)"/>`;break;
  case 1:art=`<circle cx="46" cy="50" r="24" fill="${a}"/><circle cx="58" cy="43" r="22" fill="${bg}"/><circle cx="34" cy="58" r="3" fill="${b}" opacity=".6"/><circle cx="40" cy="68" r="2" fill="${b}" opacity=".6"/>`;break;
  case 2:art=`<path d="M50 20L58 41L80 42L63 56L69 78L50 65L31 78L37 56L20 42L42 41Z" fill="${a}" stroke="${b}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="50" cy="50" r="5" fill="#fff" opacity=".8"/>`;break;
  case 3:art=`<path d="M64 36L22 74L30 60L18 66Z" fill="${b}" opacity=".5"/><path d="M66 38L28 70" stroke="${b}" stroke-width="7" stroke-linecap="round" opacity=".7"/><circle cx="66" cy="36" r="11" fill="${a}"/><circle cx="63" cy="33" r="4" fill="#fff" opacity=".7"/>`;break;
  case 4:art=`<path d="M50 18C62 28 64 44 62 62H38C36 44 38 28 50 18Z" fill="${a}"/><circle cx="50" cy="40" r="7" fill="${bg}" stroke="${b}" stroke-width="3"/><path d="M38 52L28 66L38 64Z M62 52L72 66L62 64Z" fill="${b}"/><path d="M42 62Q50 86 58 62Z" fill="#FFB347"/>`;break;
  case 5:art=`<g fill="none" stroke-linecap="round"><path d="M50 50 C 50 36, 70 36, 70 50 S 50 74, 34 60 S 32 26, 56 24" stroke="${a}" stroke-width="5"/><path d="M50 50 C 50 64, 30 64, 30 50 S 50 26, 66 40 S 68 74, 44 76" stroke="${b}" stroke-width="4" opacity=".85"/></g><circle cx="50" cy="50" r="7" fill="#fff"/>`;break;
  case 6:art=`<path d="M40 62L32 84H68L60 62Z" fill="${b}" opacity=".3"/><ellipse cx="50" cy="44" rx="13" ry="12" fill="${b}"/><ellipse cx="50" cy="54" rx="30" ry="10" fill="${a}"/><circle cx="34" cy="55" r="2.5" fill="#fff"/><circle cx="50" cy="58" r="2.5" fill="#fff"/><circle cx="66" cy="55" r="2.5" fill="#fff"/>`;break;
  case 7:art=`<circle cx="50" cy="50" r="27" fill="${a}"/><rect x="31" y="38" width="38" height="24" rx="12" fill="${bg}" stroke="${b}" stroke-width="3"/><path d="M38 44Q44 40 50 42" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/><rect x="40" y="74" width="20" height="6" rx="3" fill="${b}"/>`;break;
  case 8:art=`<path d="M24 64L38 44L54 52L66 30L78 46" fill="none" stroke="${a}" stroke-width="2.5" stroke-dasharray="4 3"/>${star(24,64,5)}${star(38,44,5)}${star(54,52,6)}${star(78,46,5)}<circle cx="66" cy="30" r="7" fill="${b}"/>`;break;
  case 9:art=`<g stroke="${a}" stroke-width="4" stroke-linecap="round">${Array.from({length:12},(_,k)=>{const t=k*Math.PI/6;const r1=k%2?16:14,r2=k%2?28:34;return `<line x1="${50+r1*Math.cos(t)}" y1="${50+r1*Math.sin(t)}" x2="${50+r2*Math.cos(t)}" y2="${50+r2*Math.sin(t)}"/>`}).join('')}</g><circle cx="50" cy="50" r="12" fill="${b}"/><circle cx="50" cy="50" r="5" fill="#fff"/>`;break;
  case 10:art=`<circle cx="50" cy="50" r="25" fill="${a}"/><path d="M34 40C42 34 48 42 44 48C40 54 30 52 34 40Z M54 58C62 52 70 58 66 66C60 70 52 66 54 58Z M58 30C64 30 68 36 64 38C60 40 54 34 58 30Z" fill="${b}"/><path d="M30 46Q50 30 70 46" stroke="#fff" stroke-width="2" fill="none" opacity=".35"/>`;break;
  case 11:art=`<rect x="16" y="42" width="22" height="16" rx="2" fill="${a}"/><rect x="62" y="42" width="22" height="16" rx="2" fill="${a}"/><path d="M27 42V58M73 42V58" stroke="${bg}" stroke-width="2"/><line x1="38" y1="50" x2="62" y2="50" stroke="${b}" stroke-width="3"/><rect x="42" y="40" width="16" height="20" rx="4" fill="${b}"/><path d="M50 40V30" stroke="${b}" stroke-width="3"/><circle cx="50" cy="28" r="4" fill="#fff"/>`;break;
  case 12:art=`<rect x="30" y="34" width="44" height="13" rx="4" fill="${a}" transform="rotate(-28 52 40)"/><path d="M50 52L38 80M50 52L62 80M50 52V80" stroke="${b}" stroke-width="3.5" stroke-linecap="round"/>${star(26,28,6)}`;break;
  case 13:art=`<ellipse cx="50" cy="50" rx="34" ry="12" fill="none" stroke="${a}" stroke-width="6" transform="rotate(-15 50 50)"/><circle cx="50" cy="50" r="15" fill="#05040C" stroke="${b}" stroke-width="3"/><path d="M18 56Q50 70 82 44" fill="none" stroke="${a}" stroke-width="6" transform="rotate(-15 50 50)" opacity=".9"/>`;break;
  case 14:art=`<path d="M22 70L58 38M28 78L60 48M18 58L52 32" stroke="${b}" stroke-width="3.5" stroke-linecap="round" opacity=".75"/>${star(64,34,14).replace('#fff',a)}`;break;
  case 15:art=`<circle cx="40" cy="46" r="20" fill="${a}" opacity=".55"/><circle cx="60" cy="54" r="22" fill="${b}" opacity=".5"/><circle cx="52" cy="40" r="14" fill="#fff" opacity=".25"/>${star(40,58,5)}${star(62,40,4)}`;break;
 }
 return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" class="stk" aria-hidden="true"><defs><radialGradient id="${id}" cx="35%" cy="35%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient></defs>
 <circle cx="50" cy="50" r="46" fill="${bg}" stroke="#fff" stroke-width="4"/><circle cx="20" cy="26" r="1.4" fill="#fff"/><circle cx="80" cy="74" r="1.2" fill="#fff"/><circle cx="76" cy="22" r="1" fill="#fff"/><circle cx="24" cy="80" r="1" fill="#fff"/>${art}</svg>`;
}

/* ---------- pages ---------- */
const laterBtn=k=>{const on=!!S.later[k];return `<button class="laterbtn" data-later="${k}" aria-pressed="${on}"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" fill="${on?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span>${on?'Marked to study later':'Study again later'}</span></button>`;};
function renderLater(){
 const items=Object.entries(S.later).map(([k,v])=>({k,...v})).sort((a,b)=>a.ch-b.ch||a.topic.localeCompare(b.topic,undefined,{numeric:true})||a.i-b.i);
 let h=`<div class="thead"><div class="eyebrow">My list</div><h2>Study later</h2><p class="meta">Steps you marked to come back to. Tap a step to jump straight to it. When you feel confident, tap "Got it now" to clear it from the list.</p></div>`;
 if(!items.length)return h+`<div class="card empty"><svg viewBox="0 0 120 80" width="160" aria-hidden="true"><path d="M20 70 Q60 10 100 50" fill="none" stroke="var(--acc2)" stroke-width="2" stroke-dasharray="3 5"/><path d="M52 8h20v30l-10-7-10 7z" fill="var(--acc)"/><circle cx="20" cy="70" r="4" fill="var(--sun-fill)"/><circle cx="100" cy="50" r="3" fill="#fff"/></svg><h3>Nothing marked yet</h3><p>On any step, tap "Study again later" and it will appear here.</p></div>`;
 const by={};items.forEach(it=>(by[it.ch]=by[it.ch]||[]).push(it));
 Object.keys(by).forEach(ch=>{const d=CHAPTERS_DATA[ch];
  h+=`<section class="lgroup" data-chtheme="${ch}"><h3 class="lgh"><span class="dotc"></span>Chapter ${ch} · ${d?d.title:''}</h3><div class="lgrid">${by[ch].map(it=>{const t=d&&d.topics.find(x=>x.id===it.topic);const s=t&&t.steps[it.i];
   return `<div class="card litem"><div class="eyebrow">Topic ${it.topic} · Step ${it.i+1}</div><b class="ltitle">${s?s.t:it.t}</b><span class="tiny">${t?t.title:''}</span><div class="row"><button class="btn primary" data-goto="${it.k}" data-goch="${ch}">Study this step →</button><button class="btn" data-unlater="${it.k}">Got it now</button></div></div>`}).join('')}</div></section>`;});
 return h;
}
function renderStickers(){
 const st=allSteps();const earned=st.filter(s=>S.checks[s.key]!=null).length;
 let h=`<div class="thead"><div class="eyebrow">My collection</div><h2>Sticker board</h2><p class="meta">Every step you complete earns a new space sticker. ${earned} of ${st.length} collected so far.</p></div>`;
 CHAPTERS.forEach(([n,title])=>{const steps=st.map((s,idx)=>({...s,idx})).filter(s=>s.ch===n);
  if(!steps.length){h+=`<section class="sgroup soon" data-chtheme="${n}"><h3 class="lgh"><span class="dotc"></span>Chapter ${n} · ${title}</h3><p class="tiny">Stickers arrive when this chapter is added.</p></section>`;return;}
  const got=steps.filter(s=>S.checks[s.key]!=null).length;
  h+=`<section class="sgroup" data-chtheme="${n}"><h3 class="lgh"><span class="dotc"></span>Chapter ${n} · ${title}<span class="cnt">${got} / ${steps.length}</span></h3><div class="sgrid">${steps.map(s=>{const on=S.checks[s.key]!=null;const info=stickerInfo(s.idx);const rot=((s.idx*37)%17)-8;
   return on?`<figure class="slotS on" title="${esc(s.title)}"><div style="transform:rotate(${rot}deg)">${stickerSVG(s.idx,86)}</div><figcaption>${info.name}</figcaption></figure>`:`<figure class="slotS" title="Complete: ${esc(s.title)}"><div class="empty-slot"><span>${s.topic}<br>step ${s.i+1}</span></div><figcaption>&nbsp;</figcaption></figure>`;}).join('')}</div></section>`;});
 return h;
}
function overallPct(){const st=allSteps();return st.length?Math.round(st.filter(s=>S.checks[s.key]!=null).length/st.length*100):0;}

/* ---------- chapter rail with pockets ---------- */
function renderChapters(){
 const nav=$('#chapters');const keep=nav.scrollLeft;
 const nl=Object.keys(S.later).length,ns=allSteps().filter(s=>S.checks[s.key]!=null).length;
 nav.innerHTML=CHAPTERS.map(([n,t])=>{const on=!!CHAPTERS_DATA[n];return `<button class="chap" role="tab" data-ch="${n}" data-chtheme="${n}" aria-selected="${S.view==='chapter'&&n===CUR}" ${on?'':'disabled'} title="${on?'':'Coming soon'}"><b>${n}</b>${t}${on?'':' <span class="soon">soon</span>'}</button>`}).join('')
  +`<span class="railsep" aria-hidden="true"></span><button class="chap special" role="tab" data-page="later" data-chtheme="later" aria-selected="${S.view==='later'}"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" fill="currentColor"/></svg>Study later<span class="badge">${nl}</span></button><button class="chap special" role="tab" data-page="stickers" data-chtheme="stickers" aria-selected="${S.view==='stickers'}"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 2l2.6 6.3 6.8.6-5.2 4.5 1.6 6.6L12 16.6 6.2 20l1.6-6.6L2.6 8.9l6.8-.6z" fill="currentColor"/></svg>Sticker board<span class="badge">${ns}</span></button>`;
 nav.scrollLeft=keep;
 const sel=nav.querySelector('[aria-selected="true"]');
 if(sel){const l=sel.offsetLeft-nav.clientWidth/2+sel.offsetWidth/2;if(sel.offsetLeft<nav.scrollLeft+50||sel.offsetLeft+sel.offsetWidth>nav.scrollLeft+nav.clientWidth-50)nav.scrollTo({left:l,behavior:'smooth'});}
 setTimeout(updatePockets,350);updatePockets();
}
function updatePockets(){const nav=$('#chapters');if(!nav)return;const L=$('#railL'),R=$('#railR');
 L.classList.toggle('off',nav.scrollLeft<6);R.classList.toggle('off',nav.scrollLeft+nav.clientWidth>=nav.scrollWidth-6);}

/* ---------- main render ---------- */
function render(){
 const special=S.view!=='chapter';
 document.body.dataset.chtheme=special?S.view:String(CUR);
 renderChapters();
 $('.chead').hidden=special;$('#pills').hidden=special;
 if(special){
  $('#view').innerHTML=S.view==='later'?renderLater():renderStickers();
  const pct=overallPct();$('#ringArc').setAttribute('stroke-dasharray',`${(pct/100*113).toFixed(1)} 113`);$('#ringTxt').textContent=pct+'%';
 } else {
  $('#chEyebrow').innerHTML=`Chapter ${CUR} · Book pages ${CHD.pages} <span class="themechip">${THEME_NAMES[CUR]||''}</span>`;$('#chTitle').textContent=CHD.title;
  renderPills();
  const v=$('#view');const sec=S.sec[CUR];const t=TOPICS.find(x=>x.id===sec);
  v.innerHTML=t?renderTopic(t):sec==='cards'?renderCards():sec==='cyp'?renderCyp():sec==='quiz'?renderQuiz():renderPapers();
  initWidgets();
 }
}
function enterAnim(){['.chead','#pills','#view'].forEach(s=>{const el=$(s);if(!el)return;el.classList.remove('enter');void el.offsetWidth;el.classList.add('enter');});const sky=$('#skyC');if(sky)sky.dataset.burst=Date.now();}

/* ---------- starfield ---------- */
(function sky(){const c=document.createElement('canvas');c.id='skyC';c.setAttribute('aria-hidden','true');document.body.prepend(c);
 const g=c.getContext('2d');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let W,H,stars=[],shoot=null;const dpr=Math.min(2,devicePixelRatio||1);
 const cols=['#FFFFFF','#FFFFFF','#FFFFFF','#C3A6FF','#5FD4F4','#FFD36E','#FF9ECF'];
 const size=()=>{W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.round(W*H/5200)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()<.08?1.6:Math.random()*1.1+.3,c:cols[Math.floor(Math.random()*cols.length)],p:Math.random()*6,s:.5+Math.random()*1.5}));};
 size();addEventListener('resize',size);
 let t=0;function f(){t+=.016;g.clearRect(0,0,W,H);
  stars.forEach(s=>{const a=reduce?.8:.45+.45*Math.sin(t*s.s+s.p);g.globalAlpha=a;g.fillStyle=s.c;g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.fill();});
  g.globalAlpha=1;
  if(!reduce){if(!shoot&&Math.random()<.003)shoot={x:Math.random()*W*.7,y:Math.random()*H*.4,k:0};
   if(shoot){shoot.k+=.02;const len=120,x=shoot.x+shoot.k*W*.35,y=shoot.y+shoot.k*H*.2;const gr=g.createLinearGradient(x-len,y-len*.57,x,y);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(1,'rgba(255,255,255,.9)');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(x-len,y-len*.57);g.lineTo(x,y);g.stroke();if(shoot.k>1)shoot=null;}}
  if(!reduce)requestAnimationFrame(f);}
 f();
})();

/* ---------- header extras: pockets, font picker ---------- */
(function header(){
 const nav=$('#chapters');nav.addEventListener('scroll',updatePockets,{passive:true});addEventListener('resize',updatePockets);
 $('#railL').onclick=()=>nav.scrollBy({left:-nav.clientWidth*.7,behavior:'smooth'});
 $('#railR').onclick=()=>nav.scrollBy({left:nav.clientWidth*.7,behavior:'smooth'});
 const menu=$('#fontMenu');
 menu.innerHTML=`<div class="eyebrow">Choose a font</div>`+FONTS.map((f,i)=>`<button class="fontopt" data-font="${i}" aria-pressed="${(P.font||0)===i}"><span style="font-family:'${f[1]}';font-weight:700;font-size:19px">${f[0]}</span><span style="font-family:'${f[2]}';font-size:14px" class="tiny">${f[1]}${f[2]!==f[1]?' + '+f[2]:''} · Photosynthesis makes glucose</span></button>`).join('');
 $('#fontBtn').onclick=()=>{menu.hidden=!menu.hidden;$('#fontBtn').setAttribute('aria-expanded',!menu.hidden);};
 menu.addEventListener('click',e=>{const b=e.target.closest('[data-font]');if(!b)return;P.font=+b.dataset.font;saveP();applyFont();$$('.fontopt',menu).forEach(x=>x.setAttribute('aria-pressed',x===b));});
 document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('#fontMenu')&&!e.target.closest('#fontBtn')){menu.hidden=true;$('#fontBtn').setAttribute('aria-expanded','false');}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){menu.hidden=true;$('#fontBtn').setAttribute('aria-expanded','false');$('#fontBtn').focus();}});
 applyFont();
})();

/* ---------- galaxy click handling ---------- */
document.addEventListener('click',e=>{
 const pg=e.target.closest('[data-page]');if(pg){S.view=pg.dataset.page;save();render();enterAnim();window.scrollTo({top:0,behavior:'smooth'});return;}
 const lb=e.target.closest('[data-later]');if(lb){const k=lb.dataset.later;const art=lb.closest('article');
  if(S.later[k]){delete S.later[k];toast('Removed from Study later.');}
  else{const [tid,si]=k.split(/-(?=\d+$)/);const t=TOPICS.find(x=>x.id===tid);S.later[k]={ch:CUR,topic:tid,i:+si,t:t?t.steps[+si].t:''};toast('Saved to <b>Study later</b>. Find it after the chapters at the top.');}
  save();lb.outerHTML=laterBtn(k);renderChapters();return;}
 const un=e.target.closest('[data-unlater]');if(un){delete S.later[un.dataset.unlater];save();render();return;}
 const go=e.target.closest('[data-goto]');if(go){const k=go.dataset.goto;const it=S.later[k];S.view='chapter';useChapter(+go.dataset.goch);S.sec[CUR]=it.topic;save();render();enterAnim();
  requestAnimationFrame(()=>{const a=document.getElementById('st-'+k);if(a){a.scrollIntoView({behavior:'smooth',block:'start'});a.classList.add('pulse');setTimeout(()=>a.classList.remove('pulse'),2400);}});return;}
},true);

/* sticker reward, called after a quick check is answered for the first time */
function awardSticker(key){const st=allSteps();const idx=st.findIndex(s=>s.key===key);if(idx<0)return;const info=stickerInfo(idx);
 toast(`<div class="stkwin">${stickerSVG(idx,72)}<div><b>New sticker!</b><br>${info.name}<br><span class="tiny">Added to your Sticker board</span></div></div>`,'big');renderChapters();}

/* ---------- notes ---------- */
(function notes(){
 let N={html:'',open:false,x:null,y:null};try{Object.assign(N,JSON.parse(localStorage.getItem(NKEY)||'{}'));}catch(e){}
 const saveN=()=>{try{localStorage.setItem(NKEY,JSON.stringify(N));}catch(e){}};
 const fab=document.createElement('button');fab.className='fab';fab.id='notesFab';fab.setAttribute('aria-label','Open my notes');fab.title='My notes';
 fab.innerHTML=`<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M5 3h10l4 4v14H5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10h8M8 14h8M8 18h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
 const pn=document.createElement('section');pn.className='notes';pn.id='notesPanel';pn.hidden=true;pn.setAttribute('role','dialog');pn.setAttribute('aria-label','My notes');
 pn.innerHTML=`<div class="nhead" id="nDrag"><b>My notes</b><span class="tiny" id="nStatus">Saved</span><span class="spacer"></span>
  <button class="nbtn" id="nExport" title="Export as a Word document"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Export</button>
  <button class="nbtn icon" id="nMin" title="Minimize" aria-label="Minimize notes"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></button></div>
  <div class="ntools" role="toolbar" aria-label="Formatting">
   <button data-cmd="bold" title="Bold"><b>B</b></button><button data-cmd="italic" title="Italic"><i>I</i></button><button data-cmd="underline" title="Underline"><u>U</u></button>
   <button data-cmd="h3" title="Heading">H</button><button data-cmd="insertUnorderedList" title="Bullet list">• List</button><button data-cmd="insertOrderedList" title="Numbered list">1. List</button>
   <button data-cmd="tag" title="Add a heading for the chapter you're on">+ Chapter heading</button></div>
  <div class="ned" id="nEd" contenteditable="true" spellcheck="true" aria-label="Notes text" data-ph="Write your own notes here. They stay the same in every chapter."></div>`;
 document.body.append(fab,pn);
 const ed=$('#nEd');ed.innerHTML=N.html||'';
 const place=()=>{if(N.x!=null&&innerWidth>700){pn.style.left=Math.min(Math.max(8,N.x),innerWidth-pn.offsetWidth-8)+'px';pn.style.top=Math.min(Math.max(8,N.y),innerHeight-80)+'px';pn.style.right='auto';pn.style.bottom='auto';}};
 const show=o=>{N.open=o;pn.hidden=!o;fab.hidden=o;saveN();if(o){place();ed.focus();}};
 fab.onclick=()=>show(true);$('#nMin').onclick=()=>show(false);
 let tm=null;ed.addEventListener('input',()=>{$('#nStatus').textContent='Saving…';clearTimeout(tm);tm=setTimeout(()=>{N.html=ed.innerHTML;saveN();$('#nStatus').textContent='Saved';},400);});
 $$('.ntools button',pn).forEach(b=>{b.addEventListener('mousedown',e=>e.preventDefault());b.onclick=()=>{const c=b.dataset.cmd;ed.focus();
  if(c==='h3'){const cur=document.queryCommandValue('formatBlock').toLowerCase();document.execCommand('formatBlock',false,cur==='h3'?'div':'h3');}
  else if(c==='tag'){const label=S.view==='chapter'?`Chapter ${CUR}: ${CHD.title}`:'General notes';const sel=getSelection();const r=document.createRange();r.selectNodeContents(ed);r.collapse(false);sel.removeAllRanges();sel.addRange(r);document.execCommand('insertHTML',false,`<h3>${esc(label)}</h3><div><br></div>`);}
  else document.execCommand(c,false,null);ed.dispatchEvent(new Event('input'));};});
 // drag
 let d=null;$('#nDrag').addEventListener('pointerdown',e=>{if(e.target.closest('button')||innerWidth<=700)return;const r=pn.getBoundingClientRect();d=[e.clientX-r.left,e.clientY-r.top];$('#nDrag').setPointerCapture(e.pointerId);});
 $('#nDrag').addEventListener('pointermove',e=>{if(!d)return;N.x=e.clientX-d[0];N.y=e.clientY-d[1];place();});
 $('#nDrag').addEventListener('pointerup',()=>{if(d){d=null;saveN();}});
 // export
 const loadDocx=()=>window.docx?Promise.resolve():new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js';s.onload=res;s.onerror=()=>rej(new Error('load'));document.head.appendChild(s);});
 $('#nExport').onclick=async()=>{const st=$('#nStatus');N.html=ed.innerHTML;saveN();
  if(!ed.textContent.trim()){st.textContent='Write something first, then export.';return;}
  const cl=window.claude;let dl=null;try{dl=cl&&cl.use?await cl.use('downloads'):null;}catch(e){dl=null;}
  if(!dl)dl={save:async({filename,data})=>{const u=URL.createObjectURL(data);const a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);return{status:'saved'};}};
  st.textContent='Preparing your document…';
  try{await loadDocx();}catch(e){st.textContent='Could not load the Word export tool. Check the internet connection.';return;}
  const D=window.docx;let inst=0;
  const runs=(node,f,out)=>{if(node.nodeType===3){if(node.textContent)out.push(new D.TextRun({text:node.textContent,bold:f.b,italics:f.i,underline:f.u?{}:undefined}));return;}
   if(node.nodeType!==1)return;const t=node.tagName;if(t==='BR'){out.push(new D.TextRun({text:'',break:1}));return;}
   const g={...f};const sw=node.style||{};if(t==='B'||t==='STRONG'||sw.fontWeight==='bold'||+sw.fontWeight>=600)g.b=true;if(t==='I'||t==='EM'||sw.fontStyle==='italic')g.i=true;if(t==='U'||(sw.textDecoration||'').includes('underline'))g.u=true;
   node.childNodes.forEach(c=>runs(c,g,out));};
  const blocks=root=>{const ps=[];let inl=[];const flush=()=>{if(inl.length){ps.push(new D.Paragraph({children:inl,spacing:{after:120}}));inl=[];}};
   root.childNodes.forEach(n=>{if(n.nodeType===1&&/^(P|DIV|H1|H2|H3|H4|UL|OL|BLOCKQUOTE)$/.test(n.tagName)){flush();const t=n.tagName;
     if(t==='UL'||t==='OL'){const k=inst++;[...n.children].forEach(li=>{const r=[];runs(li,{},r);ps.push(new D.Paragraph(t==='UL'?{children:r,bullet:{level:0}}:{children:r,numbering:{reference:'num',level:0,instance:k}}));});}
     else if(/^H/.test(t)){const r=[];runs(n,{},r);ps.push(new D.Paragraph({children:r,heading:D.HeadingLevel.HEADING_2,spacing:{before:240,after:120}}));}
     else if([...n.children].some(c=>/^(UL|OL|H1|H2|H3|DIV|P)$/.test(c.tagName)))blocks(n).forEach(p=>ps.push(p));
     else{const r=[];runs(n,{},r);ps.push(new D.Paragraph({children:r,spacing:{after:120}}));}}
    else{const r=[];runs(n,{},r);inl.push(...r);}});flush();return ps;};
  try{
   const doc=new D.Document({creator:'Sofia Magdy',title:'Science notes',
    numbering:{config:[{reference:'num',levels:[{level:0,format:D.LevelFormat.DECIMAL,text:'%1.',alignment:D.AlignmentType.START,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},
    styles:{default:{document:{run:{font:'Calibri',size:24}}}},
    sections:[{children:[new D.Paragraph({text:"Sofia Magdy's Science Notes",heading:D.HeadingLevel.TITLE}),new D.Paragraph({children:[new D.TextRun({text:'Cambridge Lower Secondary Science 9 · exported '+new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'}),italics:true,color:'666666'})],spacing:{after:240}}),...blocks(ed)]}]});
   const blob=await D.Packer.toBlob(doc);
   const res=await dl.save({filename:'Sofia science notes.docx',data:blob});st.textContent=res&&res.status==='delivered'?'Sent.':'Exported.';
  }catch(err){st.textContent=err&&err.code==='declined'?'Export cancelled.':err&&err.code==='rate_limited'?'Another save is open. Try again in a moment.':'Could not export the notes. Please try again.';}
 };
 if(N.open)show(true);
})();

/* =================== EVENTS =================== */
document.addEventListener('click',e=>{
 const chb=e.target.closest('[data-ch]');if(chb&&!chb.disabled){S.view='chapter';useChapter(+chb.dataset.ch);save();render();enterAnim();window.scrollTo({top:0,behavior:'smooth'});return;}
 if(e.target.closest('#resetBtn')){const p=$('#resetPanel');p.hidden=!p.hidden;$('#resetBtn').setAttribute('aria-expanded',!p.hidden);if(!p.hidden)window.scrollTo({top:0,behavior:'smooth'});return;}
 if(e.target.closest('#resetNo')){$('#resetPanel').hidden=true;$('#resetBtn').setAttribute('aria-expanded','false');return;}
 if(e.target.closest('#resetYes')){try{localStorage.removeItem(KEY);}catch(err){}S=DEF();useChapter(1);save();$('#resetPanel').hidden=true;$('#resetBtn').setAttribute('aria-expanded','false');render();window.scrollTo({top:0});
  const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent='Everything has been reset. Fresh start!';document.body.appendChild(t);setTimeout(()=>t.remove(),2600);return;}
 const pill=e.target.closest('[data-sec]');if(pill){S.sec[CUR]=pill.dataset.sec;save();render();window.scrollTo({top:0,behavior:'smooth'});return;}
 const go=e.target.closest('[data-go]');if(go){S.sec[CUR]=go.dataset.go;save();render();window.scrollTo({top:0,behavior:'smooth'});return;}
 const rev=e.target.closest('[data-rev]');if(rev){const n=rev.nextElementSibling;n.hidden=!n.hidden;rev.textContent=n.hidden?(rev.textContent.includes('answer')?'Show suggested answer':'Think first, then tap to see'):'Hide';return;}
 const opt=e.target.closest('.check .opt');if(opt&&!opt.disabled){const box=opt.closest('.check');const key=box.dataset.key;const [tid,si]=key.split(/-(?=\d+$)/);const t=TOPICS.find(x=>x.id===tid);const fresh=S.checks[key]==null;S.checks[key]=+opt.dataset.i;save();
  const y=box.getBoundingClientRect().top;render();const nb=$(`.check[data-key="${key}"]`);if(nb){window.scrollBy(0,nb.getBoundingClientRect().top-y);}if(fresh)awardSticker(key);return;}
 const flip=e.target.closest('[data-flip]');if(flip){flip.classList.toggle('on');return;}
 const mk=e.target.closest('[data-mark]');if(mk){S.cards[mk.dataset.mark]=mk.dataset.v;save();const f=mk.closest('.cardwrap').querySelector('.flip');f.classList.remove('known','unsure');f.classList.add(mk.dataset.v);renderPills();return;}
 if(e.target.closest('#qStart')){startQuiz();render();return;}
 const qa=e.target.closest('[data-qa]');if(qa&&QZ&&QZ.ans==null){QZ.ans=+qa.dataset.qa;const qi=QZ.order[QZ.pos];if(QZ.ans===QUIZ[qi].ans)QZ.score++;else QZ.wrong.push(qi);render();return;}
 if(e.target.closest('#qNext')){QZ.pos++;QZ.ans=null;if(QZ.pos>=QZ.order.length){S.quiz[CUR]={best:Math.max(qb()??0,QZ.score),wrong:QZ.wrong};save();}render();return;}
});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.bq){S.bq[t.dataset.bq]=t.value;save();}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.cl){S.cl[t.dataset.cl]=t.checked;save();}});

useChapter(S.ch||1);render();
