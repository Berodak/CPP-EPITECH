/* ============ UNIVERS 3D ============
   1) Un univers en fond : chaque module = une planète sur une spirale autour du noyau C++.
      La caméra vole vers la planète du module ouvert.
   2) Des transitions 3D entre les pages.
   3) Des scènes 3D interactives (widget "scene3d") dans les leçons clés.
   Si WebGL ou Three.js manquent, la plateforme marche normalement en 2D. */
(function(){
const HAS3D=(()=>{try{if(!window.THREE)return false;const c=document.createElement('canvas');return !!(c.getContext('webgl')||c.getContext('experimental-webgl'))}catch(e){return false}})();
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;
const CAT_COL={'Les bases':0x4c8dff,'Le cœur du C++':0x5cd0ff,'Les outils':0xfcd116,'Le cœur du Tek2':0xff7a3d,"Passer à l'action":0x22b573};
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

function label(txt,color,px,w){
  const c=document.createElement('canvas'),x=c.getContext('2d');c.width=512;c.height=128;
  x.font=`700 ${px||54}px "Chakra Petch",sans-serif`;x.textAlign='center';x.textBaseline='middle';
  x.shadowColor='rgba(0,0,0,.8)';x.shadowBlur=10;x.fillStyle=color||'#e4e8f1';x.fillText(txt,256,64);
  const t=new THREE.CanvasTexture(c);t.minFilter=THREE.LinearFilter;
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false}));
  const W=w||4;s.scale.set(W,W/4,1);return s;
}

/* ---------- 1. L'univers de fond ---------- */
const SPACE={ok:false,sync(){},paint(){}};
window.SPACE=SPACE;
function buildSpace(){
  const cv=document.createElement('canvas');cv.id='space';cv.setAttribute('aria-hidden','true');
  document.body.prepend(cv);document.body.classList.add('has3d');
  const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});
  R.setPixelRatio(Math.min(devicePixelRatio,1.5));R.setClearColor(0x0d1220);
  const S=new THREE.Scene();S.fog=new THREE.FogExp2(0x0d1220,.011);
  const cam=new THREE.PerspectiveCamera(55,1,.1,600);
  S.add(new THREE.AmbientLight(0x3a4d77,.8));
  const sun=new THREE.PointLight(0xa8c4ff,2,160);S.add(sun);
  const rim=new THREE.DirectionalLight(0xff9a5c,.5);rim.position.set(-30,20,-10);S.add(rim);

  // étoiles
  const N=3000,p=new Float32Array(N*3);
  for(let i=0;i<N;i++){const r=90+Math.random()*160,t=Math.random()*6.283,u=Math.acos(2*Math.random()-1);
    p[i*3]=r*Math.sin(u)*Math.cos(t);p[i*3+1]=r*Math.cos(u);p[i*3+2]=r*Math.sin(u)*Math.sin(t)}
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(p,3));
  const stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xc6d6ff,size:.55}));S.add(stars);

  // noyau C++
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(3,1),new THREE.MeshStandardMaterial({color:0x2b5cff,emissive:0x1a3cff,emissiveIntensity:.85,flatShading:true,roughness:.4,metalness:.3}));
  const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(3.8,1),new THREE.MeshBasicMaterial({color:0x8db6ff,wireframe:true,transparent:true,opacity:.22}));
  S.add(core,wire);const cl=label('C++','#fff',90,6);cl.position.y=5.2;S.add(cl);

  // planètes des modules sur une spirale
  const planets={};const pts=[];
  MODULES.forEach((m,i)=>{
    const a=i*.78+.4,r=11+i*2.4,y=(i-5)*1.3;
    const pos=new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r);pts.push(pos);
    const col=CAT_COL[m.cat]||0x4c8dff,rad=1+i*.06;
    const g=new THREE.Group();g.position.copy(pos);
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(rad,40,24),new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:.2,roughness:.55,metalness:.2}));
    const ring=new THREE.Mesh(new THREE.TorusGeometry(rad*1.65,.05,8,80),new THREE.MeshBasicMaterial({color:0x22b573,transparent:true,opacity:0}));
    ring.rotation.x=1.25;
    const l=label(String(i).padStart(2,'0')+' '+m.titre,'#e4e8f1',44,7);l.position.y=rad+1.2;
    g.add(mesh,ring,l);S.add(g);planets[m.id]={g,mesh,ring,rad,pos,l};
  });
  // le chemin lumineux qui relie les modules
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,-8,0)].concat(pts));
  S.add(new THREE.Mesh(new THREE.TubeGeometry(curve,300,.06,6,false),new THREE.MeshBasicMaterial({color:0x4c8dff,transparent:true,opacity:.35})));
  // comète qui parcourt le chemin
  const comet=new THREE.Mesh(new THREE.SphereGeometry(.25,12,8),new THREE.MeshBasicMaterial({color:0xfcd116}));S.add(comet);

  // la station des outils (terminal, mémo, glossaire)
  const station=new THREE.Group();station.position.set(-34,10,-26);
  station.add(new THREE.Mesh(new THREE.TorusGeometry(3,.5,12,48),new THREE.MeshStandardMaterial({color:0x8ea3c9,metalness:.7,roughness:.3})));
  station.add(new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,6,16),new THREE.MeshStandardMaterial({color:0xfcd116,emissive:0x664f00,metalness:.5})));
  const stl=label('Station outils','#fcd116',46,6);stl.position.y=4.5;station.add(stl);S.add(station);

  // vols de caméra
  const camPos=new THREE.Vector3(0,20,52),look=new THREE.Vector3();
  let fly=null,idleSpin=true;
  function viewFor(key){
    if(key.type==='module'&&planets[key.id]){
      const P=planets[key.id];const out=P.pos.clone().setY(0).normalize();
      const pos=P.pos.clone().add(out.multiplyScalar(P.rad*7.5)).add(new THREE.Vector3(0,P.rad*2.5,0));
      const fwd=P.pos.clone().sub(pos);
      const hf=2*Math.atan(Math.tan(cam.fov*Math.PI/360)*cam.aspect);
      const th=innerWidth>860?Math.atan(.8*Math.tan(hf/2)):0; // planète dans la bande libre à droite
      return {pos,look:pos.clone().add(fwd.applyAxisAngle(new THREE.Vector3(0,1,0),th))};
    }
    if(key.type==='tools')return {pos:station.position.clone().add(new THREE.Vector3(9,4,10)),look:station.position.clone().add(new THREE.Vector3(-3,0,0))};
    return {pos:new THREE.Vector3(0,22,54),look:new THREE.Vector3(0,-2,0)};
  }
  function go(key){
    const v=viewFor(key);idleSpin=key.type==='home';Object.entries(planets).forEach(([id,P])=>P.l.visible=!(key.type==='module'&&key.id===id));
    if(REDUCE){camPos.copy(v.pos);look.copy(v.look);fly=null;return}
    fly={t:0,d:1.8,p0:camPos.clone(),l0:look.clone(),p1:v.pos,l1:v.look,lift:camPos.distanceTo(v.pos)*.18};
  }
  function keyFromHash(){
    const h=location.hash.slice(1)||'accueil';
    if(h.startsWith('module-'))return {type:'module',id:h.slice(7)};
    if(h.startsWith('lecon-')){const l=ALL_LESSONS().find(x=>'lecon-'+x.id===h);if(l)return {type:'module',id:l.mod.id}}
    if(['terminal','arsenal','glossaire','labo'].includes(h))return {type:'tools'};
    return {type:'home'};
  }
  function paintProgress(){MODULES.forEach(m=>{const P=planets[m.id];const pc=modPct(m);P.ring.material.opacity=pc===100?.8:0;P.mesh.material.emissiveIntensity=.2+pc/100*.6})}
  SPACE.sync=()=>{paintProgress();go(keyFromHash())};SPACE.paint=paintProgress;

  let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
  function resize(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
  addEventListener('resize',()=>{resize();go(keyFromHash())});resize();
  const clock=new THREE.Clock();let ct=0,spin=0;
  (function loop(){
    requestAnimationFrame(loop);if(document.hidden)return;
    const dt=Math.min(clock.getDelta(),.05);
    core.rotation.y+=dt*.25;core.rotation.x+=dt*.08;wire.rotation.y-=dt*.12;station.rotation.y+=dt*.2;
    Object.values(planets).forEach(P=>{P.mesh.rotation.y+=dt*.4;P.ring.rotation.z+=dt*.5});
    ct=(ct+dt*.03)%1;comet.position.copy(curve.getPointAt(ct));
    if(fly){fly.t+=dt/fly.d;const k=ease(Math.min(fly.t,1));
      camPos.lerpVectors(fly.p0,fly.p1,k);camPos.y+=Math.sin(Math.PI*k)*fly.lift;look.lerpVectors(fly.l0,fly.l1,k);
      if(fly.t>=1)fly=null}
    if(idleSpin&&!REDUCE&&!fly)spin+=dt*.03;
    const base=camPos.clone().applyAxisAngle(new THREE.Vector3(0,1,0),idleSpin?spin:0);
    cam.position.set(base.x+mx*1.6,base.y-my*1.2,base.z);cam.lookAt(look);
    R.render(S,cam);
  })();
  SPACE.ok=true;
}

/* ---------- 2. Transitions 3D entre les pages ---------- */
function transition(){const v=document.getElementById('view');if(!v||REDUCE)return;v.classList.remove('enter3d');void v.offsetWidth;v.classList.add('enter3d')}

/* ---------- 3. Mini-scènes 3D dans les leçons ---------- */
const LIVE=[];
function mini(el,o){
  LIVE.forEach(s=>{if(!s.el.isConnected)s.dispose()});
  el.innerHTML=`<figure class="s3"><div class="s3stage"><canvas></canvas><span class="s3tip">glisse pour tourner</span></div><figcaption class="s3cap" aria-live="polite"></figcaption><div class="s3ctl"></div></figure>`;
  const cv=el.querySelector('canvas'),capEl=el.querySelector('.s3cap'),ctlEl=el.querySelector('.s3ctl');
  const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
  const S=new THREE.Scene();const cam=new THREE.PerspectiveCamera(45,1,.1,200);
  S.add(new THREE.AmbientLight(0x6077aa,.9));const dl=new THREE.DirectionalLight(0xffffff,.9);dl.position.set(5,10,7);S.add(dl);
  const target=new THREE.Vector3(...(o.target||[0,0,0]));let yaw=o.yaw||0,pitch=o.pitch||.35,dist=o.dist||14,drag=false,lx=0,ly=0;
  cv.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId);el.querySelector('.s3tip').style.opacity=0});
  cv.addEventListener('pointermove',e=>{if(!drag)return;yaw-=(e.clientX-lx)*.008;pitch=Math.max(-.2,Math.min(1.2,pitch+(e.clientY-ly)*.006));lx=e.clientX;ly=e.clientY});
  cv.addEventListener('pointerup',()=>drag=false);
  const ticks=[],tweens=[];let alive=true,visible=true;
  const io=new IntersectionObserver(es=>{visible=es[0].isIntersecting});io.observe(cv);
  const api={el,S,cam,
    cap(t){capEl.innerHTML=t},
    ctl(btns){ctlEl.innerHTML='';btns.forEach(([t,f,cls])=>{const b=document.createElement('button');b.type='button';b.className='btn sm '+(cls||'');b.innerHTML=t;b.onclick=()=>f(b);ctlEl.appendChild(b)});return ctlEl},
    tick(f){ticks.push(f)},
    tween(d,f,done){if(REDUCE){f(1);done&&done();return}tweens.push({t:0,d,f,done})},
    dispose(){alive=false;io.disconnect();R.dispose();const i=LIVE.indexOf(api);if(i>=0)LIVE.splice(i,1)}};
  const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w)return;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};
  const ro=new ResizeObserver(size);ro.observe(cv);
  const clock=new THREE.Clock();
  (function loop(){if(!alive||!el.isConnected){api.dispose();ro.disconnect();return}
    requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.05);if(!visible||document.hidden)return;
    for(let i=tweens.length-1;i>=0;i--){const w=tweens[i];w.t+=dt/w.d;const k=Math.min(w.t,1);w.f(ease(k));if(k>=1){tweens.splice(i,1);w.done&&w.done()}}
    ticks.forEach(f=>f(dt));
    cam.position.set(target.x+dist*Math.cos(pitch)*Math.sin(yaw),target.y+dist*Math.sin(pitch),target.z+dist*Math.cos(pitch)*Math.cos(yaw));cam.lookAt(target);
    R.render(S,cam)})();
  LIVE.push(api);return api;
}
const mat=(c,e)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:e==null?.15:e,roughness:.5,metalness:.2});
const box=(w,h,d,c)=>new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));
const ball=(r,c)=>new THREE.Mesh(new THREE.SphereGeometry(r,24,16),mat(c));
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function arrow(S,from,to,col){const d=V().subVectors(to,from);const a=new THREE.ArrowHelper(d.clone().normalize(),from,d.length(),col,.6,.35);S.add(a);return a}
function setArrow(a,from,to){const d=V().subVectors(to,from);a.position.copy(from);a.setDirection(d.clone().normalize());a.setLength(d.length(),.6,.35)}
const sleep=ms=>new Promise(r=>setTimeout(r,REDUCE?0:ms));

const SCENES={
/* La compilation : main.cpp -> g++ -> a.out */
compile(el){
  const s=mini(el,{dist:16,pitch:.4});
  const src=box(2,2.6,.3,0xe4e8f1);src.position.set(-6,0,0);
  const gear=new THREE.Mesh(new THREE.TorusGeometry(1.3,.45,10,24),mat(0xfcd116));
  const bin=box(2,2,2,0x22b573);bin.position.set(6,0,0);bin.material.emissiveIntensity=.05;
  [[src,'main.cpp',-6],[gear,'g++',0],[bin,'a.out',6]].forEach(([m,t,x])=>{s.S.add(m);const l=label(t,'#e4e8f1',58,4);l.position.set(x,2.4,0);s.S.add(l)});
  const pts=[];for(let i=0;i<14;i++){const b=ball(.14,0x5cb8ff);b.visible=false;s.S.add(b);pts.push(b)}
  let mode=0,t=0,err=false;
  s.tick(dt=>{gear.rotation.z+=dt*(mode?3:.4);if(!mode)return;t+=dt*.6;
    pts.forEach((b,i)=>{let u=(t-i*.06);if(u<0||u>1){b.visible=false;return}b.visible=true;
      if(err&&u>.5){b.material.color.set(0xef3b4f);b.material.emissive.set(0xef3b4f);u=.5}
      b.position.set(-6+12*u,Math.sin(u*Math.PI)*1.2,0)});
    if(t>1.9){mode=0;pts.forEach(b=>b.visible=false);
      if(err){gear.material.color.set(0xef3b4f);s.cap('<b>error:</b> expected <code>;</code> before <code>}</code>. Le compilateur s\'arrête : aucun <code>a.out</code> n\'est créé. Lis la 1re erreur, corrige, recompile.')}
      else{bin.material.emissiveIntensity=.8;s.cap('Compilé ! <code>./a.out</code> affiche <code>Hello World</code>. Le compilateur a traduit ton texte C++ en langage machine.')}}});
  const run=e=>{err=e;t=0;mode=1;gear.material.color.set(0xfcd116);gear.material.emissive.set(0xfcd116);bin.material.emissiveIntensity=.05;
    pts.forEach(b=>{b.material.color.set(0x5cb8ff);b.material.emissive.set(0x5cb8ff)});s.cap(e?'Compilation d\'un code avec un <code>;</code> oublié...':'<code>g++ -Wall -Wextra main.cpp</code> : le compilateur lit ton code...')};
  s.ctl([['Compiler',()=>run(false),'pri'],['Compiler avec une erreur',()=>run(true)]]);
  s.cap('Ton code (main.cpp) passe dans le compilateur (g++) qui fabrique un programme (a.out). Clique sur « Compiler ».');
},
/* La taille des types */
types(el){
  const s=mini(el,{dist:15,pitch:.5,target:[0,.5,0]});
  const T=[['bool',1,'true ou false',0x22b573],['char',1,'un caractère : \'A\'',0x5cb8ff],['int',4,'entier, environ ±2 milliards',0x4c8dff],['float',4,'nombre à virgule, ~7 chiffres',0xfcd116],['double',8,'virgule précise, ~15 chiffres',0xff7a3d],['long long',8,'très grand entier',0xb07cff]];
  let x=-7;const crates=T.map(([n,b,d,c])=>{const w=.55*b;const m=box(w,1,1,c);x+=w/2;m.position.set(x,.5,0);x+=w/2+.5;s.S.add(m);
    const l=label(n,'#e4e8f1',56,2.6);l.position.set(m.position.x,1.6,0);s.S.add(l);
    for(let k=1;k<b;k++){const sep=box(.02,1.02,1.02,0x0d1220);sep.position.set(m.position.x-w/2+k*.55,.5,0);s.S.add(sep)}return m});
  let sel=-1;s.tick(dt=>crates.forEach((m,i)=>{const ty=i===sel?1.3:.5;m.position.y+=(ty-m.position.y)*.15}));
  s.ctl(T.map(([n,b,d],i)=>[n,()=>{sel=i;s.cap(`<code>${n}</code> occupe <b>${b} octet${b>1?'s':''}</b> en mémoire (une case = 1 octet) : ${d}.`)}]));
  s.cap('Chaque type est une boîte de taille différente. Chaque petite case = 1 octet. Clique sur un type.');
},
/* La boucle for */
boucle(el){
  const s=mini(el,{dist:13,pitch:.75});
  let n=6;const marks=[];const robot=ball(.45,0xfcd116);s.S.add(robot);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(4,.05,8,90),new THREE.MeshBasicMaterial({color:0x2a3550}));ring.rotation.x=Math.PI/2;s.S.add(ring);
  const draw=()=>{marks.forEach(m=>s.S.remove(m));marks.length=0;
    for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const m=box(.6,.2,.6,i<n?0x4c8dff:0x2a3550);m.position.set(Math.cos(a)*4,0,Math.sin(a)*4);s.S.add(m);marks.push(m);
      const l=label(String(i),i<n?'#e4e8f1':'#4a5570',60,1.4);l.position.set(Math.cos(a)*4,.9,Math.sin(a)*4);s.S.add(l);marks.push(l)}};
  draw();robot.position.set(4,.6,0);let busy=false;
  const run=async()=>{if(busy)return;busy=true;
    for(let i=0;i<n;i++){const a=i/10*Math.PI*2;robot.position.set(Math.cos(a)*4,.6,Math.sin(a)*4);marks[i*2].material.emissiveIntensity=.9;
      s.cap(`<code>i = ${i}</code> → test <code>${i} &lt; ${n}</code> vrai → on exécute le bloc, puis <code>i++</code>.`);await sleep(650)}
    s.cap(`<code>i = ${n}</code> → test <code>${n} &lt; ${n}</code> <b>faux</b> → la boucle s'arrête. Elle a tourné <b>${n} fois</b> (de 0 à ${n-1}).`);
    marks.forEach((m,k)=>{if(k%2===0)m.material.emissiveIntensity=.15});busy=false};
  s.ctl([['Lancer la boucle',run,'pri'],['n − 1',()=>{if(!busy&&n>1){n--;draw();s.cap(`<code>for (int i = 0; i &lt; ${n}; i++)</code>`)}}],['n + 1',()=>{if(!busy&&n<10){n++;draw();s.cap(`<code>for (int i = 0; i &lt; ${n}; i++)</code>`)}}]]);
  s.cap(`<code>for (int i = 0; i &lt; ${n}; i++)</code> : le robot visite chaque case de 0 à n−1. Change n puis lance.`);
},
/* Pile, tas, pointeurs, fuites */
memoire(el){
  const s=mini(el,{dist:13,pitch:.35,target:[-.5,1,0]});
  const fl=label('PILE (stack)','#5cb8ff',50,4);fl.position.set(-5,4.6,0);const fh=label('TAS (heap)','#ff7a3d',50,4);fh.position.set(4,4.6,0);s.S.add(fl,fh);
  const plate=new THREE.Mesh(new THREE.CylinderGeometry(3.6,3.6,.1,40),mat(0x1b2438,0));plate.position.set(4,-.6,0);s.S.add(plate);
  const slab=(y,t,c)=>{const m=box(3,.8,1.4,c);m.position.set(-5,y,0);s.S.add(m);const l=label(t,'#fff',46,3);l.position.set(-5,y,.8);s.S.add(l);return {m,l}};
  slab(0,'int x = 42',0x4c8dff);let p=slab(1.1,'int *p',0x5cd0ff);
  const heap=[];let cur=null,arr=null,leaks=0;
  const pFrom=()=>V(-3.5,1.1,0);
  const relabel=t=>{s.S.remove(p.l);p.l=label(t,'#fff',46,3);p.l.position.set(-5,1.1,.8);s.S.add(p.l)};
  const doNew=()=>{if(cur&&cur.alive){cur.m.material.color.set(0x56607a);cur.m.material.emissive.set(0x000000);leaks++;}
    const a=heap.length*.9;const m=box(1,1,1,0xff7a3d);m.position.set(4+Math.cos(a)*1.8,-6,Math.sin(a)*1.8);s.S.add(m);
    cur={m,alive:true};heap.push(cur);s.tween(.7,k=>m.position.y=-6+6.5*k);
    if(!arr)arr=arrow(s.S,pFrom(),m.position.clone().setY(.5),0xfcd116);else{arr.visible=true;arr.setColor(0xfcd116)}
    setTimeout(()=>setArrow(arr,pFrom(),m.position.clone()),REDUCE?0:720);relabel('int *p → 42');
    s.cap(leaks?`<b>Fuite mémoire !</b> Tu as refait <code>new</code> sans <code>delete</code> : l'ancien bloc gris est perdu dans le tas, plus personne ne pointe dessus (${leaks} bloc${leaks>1?'s':''} perdu${leaks>1?'s':''}). valgrind le signalerait.`:'<code>p = new int(42);</code> crée un bloc dans le <b>tas</b>. <code>p</code> (dans la pile) contient son <b>adresse</b> : la flèche.')};
  const doDel=()=>{if(!cur||!cur.alive){s.cap(cur?'<b>Double delete !</b> Le bloc est déjà libéré : ça fait planter le programme. Mets <code>p = nullptr</code> après un delete.':'Rien à libérer : fais d\'abord un <code>new</code>.');return}
    cur.alive=false;const m=cur.m;s.tween(.5,k=>m.scale.setScalar(1-k),()=>s.S.remove(m));
    if(arr)arr.setColor(0xef3b4f);relabel('int *p → ???');
    s.cap('<code>delete p;</code> rend le bloc au système. Mais <code>p</code> contient encore l\'ancienne adresse : c\'est un <b>pointeur pendant</b> (flèche rouge). Le déréférencer = crash.')};
  const doNull=()=>{if(arr)arr.visible=false;relabel('int *p = nullptr');if(cur&&cur.alive){cur.m.material.color.set(0x56607a);cur.m.material.emissive.set(0x000000);cur.alive=false;leaks++;s.cap('<b>Fuite :</b> tu as mis <code>p = nullptr</code> sans <code>delete</code> avant. Le bloc reste réservé pour rien.');}
    else s.cap('<code>p = nullptr;</code> : p ne pointe plus nulle part, et on peut le tester (<code>if (p)</code>). C\'est le bon réflexe après <code>delete</code>.');cur=null};
  s.ctl([['p = new int(42)',doNew,'pri'],['delete p',doDel],['p = nullptr',doNull]]);
  s.cap('La <b>pile</b> range les variables locales automatiquement. Le <b>tas</b> sert à la mémoire que <b>tu</b> demandes avec <code>new</code> et que <b>tu</b> rends avec <code>delete</code>. Essaie les boutons dans l\'ordre, puis dans le désordre.');
},
/* std::vector : size et capacity */
vector(el){
  const s=mini(el,{dist:15,pitch:.45,target:[0,0,0]});
  let size=0,cap=1;const cubes=[],ghosts=[];
  const xs=i=>-7+i*.95;
  const drawGhosts=()=>{ghosts.forEach(g=>s.S.remove(g));ghosts.length=0;for(let i=0;i<cap;i++){const g=new THREE.Mesh(new THREE.BoxGeometry(.8,.8,.8),new THREE.MeshBasicMaterial({color:0x5cb8ff,wireframe:true,transparent:true,opacity:.35}));g.position.set(xs(i),0,0);s.S.add(g);ghosts.push(g)}};
  drawGhosts();const info=()=>`size = <b>${size}</b> · capacity = <b>${cap}</b>`;
  const push=()=>{if(size>=16){s.cap('Démo limitée à 16 éléments. '+info());return}let msg='';
    if(size===cap){cap*=2;drawGhosts();msg='Plus de place : le vector <b>réalloue</b> un bloc 2× plus grand et y recopie tout. ';
      cubes.forEach(c=>{const y0=c.position.y;s.tween(.4,k=>c.position.y=y0+Math.sin(k*Math.PI)*1.2)})}
    const c=box(.8,.8,.8,0x4c8dff);c.position.set(xs(size),4,0);s.S.add(c);cubes.push(c);s.tween(.45,k=>c.position.y=4-4*k);size++;
    s.cap(`<code>v.push_back(${size*10})</code> → ${msg}${info()}`)};
  const pop=()=>{if(!size){s.cap('Vector vide : <code>pop_back()</code> sur un vector vide = comportement indéfini. Teste <code>v.empty()</code> avant ! '+info());return}
    const c=cubes.pop();size--;s.tween(.35,k=>c.position.y=4*k,()=>s.S.remove(c));s.cap(`<code>v.pop_back()</code> → le dernier sort, la capacité ne bouge pas. ${info()}`)};
  const clear=()=>{cubes.forEach(c=>s.S.remove(c));cubes.length=0;size=0;s.cap(`<code>v.clear()</code> vide le vector, mais garde la place réservée. ${info()}`)};
  s.ctl([['push_back',push,'pri'],['pop_back',pop],['clear',clear]]);
  s.cap('Cubes pleins = éléments (<b>size</b>). Cases en fil de fer = place réservée (<b>capacity</b>). Ajoute des éléments et regarde ce qui se passe quand c\'est plein.');
},
/* Classe = plan, objets = instances */
classe(el){
  const s=mini(el,{dist:16,pitch:.4,target:[0,.5,0]});
  const mkRobot=(c,wire)=>{const g=new THREE.Group();const m=wire?new THREE.MeshBasicMaterial({color:0x5cb8ff,wireframe:true}):mat(c,.25);
    const body=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.4,.8),m);body.position.y=.7;const head=new THREE.Mesh(new THREE.SphereGeometry(.45,16,12),m);head.position.y=1.85;
    const ant=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.5),m);ant.position.y=2.45;g.add(body,head,ant);return g};
  const plan=mkRobot(0,true);s.S.add(plan);const pl=label('class Robot','#5cb8ff',56,4);pl.position.y=3.2;s.S.add(pl);
  const NAMES=['Zed','Ada','Bob','Kim','Lou'],COLS=[0xff7a3d,0x22b573,0xfcd116,0xef3b4f,0xb07cff];const objs=[];
  s.tick(dt=>{plan.rotation.y+=dt*.6});
  const create=()=>{if(objs.length>=5){s.cap('5 objets : ça suffit pour la démo ! Détruis-en un.');return}const i=objs.length;
    const r=mkRobot(COLS[i]);const ang=(i-2)*.75;const to=V(Math.sin(ang)*6,0,Math.cos(ang)*-1+2);s.S.add(r);
    const l=label('r'+(i+1)+'("'+NAMES[i]+'")','#e4e8f1',46,3.4);s.S.add(l);objs.push({r,l});
    s.tween(.8,k=>{r.position.lerpVectors(V(0,0,0),to,k);r.scale.setScalar(.3+.7*k);l.position.set(r.position.x,3,r.position.z)});
    s.cap(`<code>Robot r${i+1}("${NAMES[i]}");</code> → le <b>constructeur</b> fabrique un nouvel objet à partir du plan. Même forme, mais ses propres valeurs (nom, couleur). ${objs.length} objet${objs.length>1?'s':''}.`)};
  const destroy=()=>{const o=objs.pop();if(!o){s.cap('Aucun objet à détruire.');return}s.tween(.5,k=>o.r.scale.setScalar(1-k),()=>{s.S.remove(o.r);s.S.remove(o.l)});
    s.cap(`Fin de portée (<code>}</code>) → le <b>destructeur</b> <code>~Robot()</code> est appelé automatiquement, l'objet disparaît.`)};
  s.ctl([['Créer un objet',create,'pri'],['Détruire le dernier',destroy]]);
  s.cap('Le robot en fil de fer est la <b>classe</b> : un plan, pas un vrai robot. Chaque objet créé est une <b>instance</b> de ce plan.');
},
/* Héritage */
heritage(el){
  const s=mini(el,{dist:16,pitch:.3,target:[0,1.5,0]});
  const N={Animal:[0,4,0x4c8dff,['nom','age','manger()']],Chien:[-5,0,0xff7a3d,['aboyer()']],Chat:[0,0,0x22b573,['ronronner()']],Oiseau:[5,0,0xfcd116,['voler()']]};
  const nodes={};Object.entries(N).forEach(([k,[x,y,c]])=>{const m=ball(1,c);m.position.set(x,y,0);s.S.add(m);const l=label(k,'#fff',60,3.2);l.position.set(x,y+1.6,0);s.S.add(l);nodes[k]=m});
  const links={};['Chien','Chat','Oiseau'].forEach(k=>{links[k]=arrow(s.S,nodes[k].position.clone().add(V(0,1,0)),nodes.Animal.position.clone().add(V(0,-1,0)),0x2a3550)});
  let sel=null;s.tick(dt=>Object.entries(nodes).forEach(([k,m])=>{const on=sel&&(k===sel||(k==='Animal'&&sel!=='Animal'));m.material.emissiveIntensity+=((on?.9:.15)-m.material.emissiveIntensity)*.12;m.rotation.y+=dt*(on?1.5:.3)}));
  const pick=k=>{sel=k;Object.entries(links).forEach(([c,a])=>a.setColor(c===k?0xfcd116:0x2a3550));
    if(k==='Animal')s.cap('<code>class Animal</code> est la <b>classe mère</b> : <code>nom</code>, <code>age</code>, <code>manger()</code>. Toutes les filles en profitent.');
    else s.cap(`<code>class ${k} : public Animal</code> → ${k} <b>hérite</b> de <code>nom</code>, <code>age</code>, <code>manger()</code> sans les réécrire, et <b>ajoute</b> <code>${N[k][3][0]}</code>. Un ${k} <i>est un</i> Animal.`)};
  s.ctl(Object.keys(N).map(k=>[k,()=>pick(k)]));
  s.cap('Les flèches montent vers la <b>classe mère</b>. Clique sur une classe pour voir ce qu\'elle hérite.');
},
/* Polymorphisme */
poly(el){
  const s=mini(el,{dist:15,pitch:.45,target:[0,.5,0]});
  const A=[['Chien','Wouf !',0xff7a3d],['Chat','Miaou !',0x22b573],['Vache','Meuh !',0xfcd116],['Chien','Wouf !',0xff7a3d]];
  const objs=A.map(([n,,c],i)=>{const x=-4.5+i*3;const slot=box(2.2,.2,2.2,0x1b2438);slot.position.set(x,-.6,0);s.S.add(slot);
    const m=ball(.8,c);m.position.set(x,.4,0);s.S.add(m);const l=label(n,'#fff',56,2.6);l.position.set(x,1.7,0);s.S.add(l);
    const p=label('Animal*','#5cb8ff',46,2.4);p.position.set(x,-1.3,1.2);s.S.add(p);return m});
  let virt=true,busy=false;
  const run=async()=>{if(busy)return;busy=true;let out=[];
    for(let i=0;i<objs.length;i++){const m=objs[i];s.tween(.3,k=>m.scale.setScalar(1+Math.sin(k*Math.PI)*.5));out.push(virt?A[i][1]:'...');
      s.cap(`<code>tab[${i}]-&gt;parler();</code> → ${virt?`<b>${A[i][0]}::parler()</b>`:'<b>Animal::parler()</b>'} : « ${out[i]} »<br>Sortie : ${out.join(' ')}`);await sleep(700)}
    s.cap(virt?`Avec <code>virtual</code>, chaque objet utilise <b>sa propre</b> version, même rangé dans un <code>Animal*</code>. Sortie : ${out.join(' ')} → c'est le <b>polymorphisme</b>.`
      :`Sans <code>virtual</code>, le compilateur ne regarde que le type du pointeur (<code>Animal*</code>) : tout le monde dit « ... ». C'est le piège classique.`);busy=false};
  const tog=s.ctl([['Appeler parler() sur chaque Animal*',run,'pri'],['virtual : OUI',b=>{virt=!virt;b.innerHTML='virtual : '+(virt?'OUI':'NON');s.cap(virt?'<code>virtual void parler();</code> activé.':'<code>void parler();</code> (sans virtual). Relance pour comparer.')}]]);
  s.cap('Un tableau de <code>Animal*</code> qui pointent vers des objets différents. Que se passe-t-il quand on appelle <code>parler()</code> ?');
},
/* The Plazza : processus, threads, file d'attente */
plazza(el){
  const s=mini(el,{dist:20,pitch:.6,target:[0,0,0]});
  const rec=box(2,1.4,2,0x4c8dff);s.S.add(rec);const rl=label('Réception','#fff',54,3.4);rl.position.y=1.8;s.S.add(rl);
  const K=[0,1,2].map(i=>{const a=i/3*Math.PI*2+Math.PI/2;const p=V(Math.cos(a)*7,0,Math.sin(a)*7);
    const k=box(3,1.2,3,0x1b2438);k.position.copy(p);s.S.add(k);const l=label('Cuisine '+(i+1),'#ff7a3d',50,3.4);l.position.set(p.x,2,p.z);s.S.add(l);
    const cooks=[0,1].map(j=>{const c=ball(.3,0xe4e8f1);s.S.add(c);return {c,a:j*Math.PI}});return {p,cooks,load:0}});
  let mutex=true,served=0,busy=false;
  s.tick(dt=>K.forEach(k=>k.cooks.forEach(o=>{o.a+=dt*(k.load?3:.8);o.c.position.set(k.p.x+Math.cos(o.a)*1.1,1,k.p.z+Math.sin(o.a)*1.1)})));
  const order=async()=>{if(busy)return;busy=true;
    for(let n=0;n<6;n++){const k=K.reduce((a,b)=>b.load<a.load?b:a);k.load++;
      const pz=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.12,20),mat(0xfcd116,.4));pz.position.set(0,1,0);s.S.add(pz);
      s.tween(.7,t=>{pz.position.lerpVectors(V(0,1,0),k.p.clone().setY(1.6),t);pz.position.y+=Math.sin(t*Math.PI)*1.5},()=>{
        setTimeout(()=>{s.S.remove(pz);k.load--;served++;s.cap(`Pizza prête ! ${served} servie${served>1?'s':''}. La réception envoie toujours à la cuisine la <b>moins chargée</b>.`)},REDUCE?0:1200)});
      if(!mutex&&n===3){const c=k.cooks;c[0].c.material.color.set(0xef3b4f);c[1].c.material.color.set(0xef3b4f);
        s.cap('<b>Data race !</b> Sans <code>std::mutex</code>, deux cuisiniers (threads) prennent la <b>même</b> commande dans la file en même temps. Résultat imprévisible.');
        setTimeout(()=>{c[0].c.material.color.set(0xe4e8f1);c[1].c.material.color.set(0xe4e8f1)},1500)}
      await sleep(350)}
    busy=false};
  s.ctl([['Commander 6 pizzas',order,'pri'],['mutex : OUI',b=>{mutex=!mutex;b.innerHTML='mutex : '+(mutex?'OUI':'NON');s.cap(mutex?'La file de commandes est protégée par un <code>std::mutex</code> : un seul cuisinier à la fois.':'Mutex retiré. Commande pour voir le problème.')}]]);
  s.cap('The Plazza : chaque <b>cuisine</b> est un <b>processus</b> (fork), chaque <b>cuisinier</b> un <b>thread</b>. La réception répartit les commandes.');
}
};

/* Où placer les scènes dans les leçons */
const PLACE={m1l2:'compile',m2l1:'types',m3l2:'boucle',m5l1:'memoire',m6l2:'vector',m7l1:'classe',m8l1:'heritage',m8l2:'poly',m10l1:'plazza'};
const TITLES={compile:'La compilation en 3D',types:'La taille des types en 3D',boucle:'La boucle for en 3D',memoire:'Pile, tas et pointeurs en 3D',vector:'Le vector en 3D',classe:'Classe et objets en 3D',heritage:'L\'héritage en 3D',poly:'Le polymorphisme en 3D',plazza:'The Plazza en 3D'};
if(HAS3D){
  ALL_LESSONS().forEach(l=>{const k=PLACE[l.id];if(!k||l.contenu.includes('data-k="'+k+'"'))return;
    const block=`<div class="box s3box"><b>${TITLES[k]}</b><div data-widget="scene3d" data-k="${k}"></div></div>`;
    const i=l.contenu.indexOf('</p>');l.contenu=i>=0?l.contenu.slice(0,i+4)+block+l.contenu.slice(i+4):block+l.contenu});
  WIDGETS.scene3d=el=>{const f=SCENES[el.dataset.k];if(f)try{f(el)}catch(e){el.innerHTML='<p class="muted">Scène 3D indisponible sur cet appareil.</p>'}};
}
document.addEventListener('DOMContentLoaded',()=>{
  if(HAS3D){try{buildSpace()}catch(e){}}
  SPACE.sync();transition();
});
addEventListener('hashchange',()=>{SPACE.sync();transition()});
const _gain=window.gain;if(typeof _gain==='function')window.gain=function(){const r=_gain.apply(this,arguments);try{SPACE.paint()}catch(e){}return r};
})();
