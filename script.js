// Portfolio Alia — Vanilla JavaScript
const {organizations,education,projects}=window.PORTFOLIO_DATA;
const orgGrid=document.querySelector('#orgGrid');
orgGrid.innerHTML=organizations.map(([img,name,desc])=>`<article class="org-card reveal"><img src="${img}" alt="${name}" loading="lazy"><div><h4>${name}</h4><p>${desc}</p></div></article>`).join('');
document.querySelector('#educationList').innerHTML=education.map(([img,name,desc],i)=>`<article class="edu-card reveal"><img src="${img}" alt="${name}" loading="lazy"><div><h4>${name}</h4><p>${desc}</p></div><span class="status ${i===education.length-1?'current':''}">${i===education.length-1?'Aktif':'Lulus'}</span></article>`).join('');
document.querySelector('#projectGrid').innerHTML=projects.map(([img,name,desc,tags,url])=>`<article class="project-card reveal"><div class="project-image"><img src="${img}" alt="${name}" loading="lazy"></div><div class="project-content"><h3>${name}</h3><p>${desc}</p><div class="tags">${tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="project-link" href="${url}" target="_blank" rel="noopener noreferrer">Lihat Selengkapnya <i class="ri-arrow-right-line"></i></a></div></article>`).join('');
// Preloader
window.addEventListener('load',()=>setTimeout(()=>document.querySelector('#preloader').classList.add('hide'),1550));
// Mobile navigation
const menuToggle=document.querySelector('#menuToggle'),navLinks=document.querySelector('#navLinks');
menuToggle.addEventListener('click',()=>{navLinks.classList.toggle('open');menuToggle.innerHTML=navLinks.classList.contains('open')?'<i class="ri-close-line"></i>':'<i class="ri-menu-line"></i>';});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.innerHTML='<i class="ri-menu-line"></i>';}));
// Scroll state, active navigation and back-to-top
const navbar=document.querySelector('#navbar'),backTop=document.querySelector('#backTop'),sections=[...document.querySelectorAll('main section[id]')],navAnchors=[...document.querySelectorAll('.nav-links a[href^="#"]')];
function onScroll(){let y=window.scrollY;navbar.classList.toggle('scrolled',y>80);backTop.classList.toggle('show',y>500);let active='beranda';sections.forEach(s=>{if(y+150>=s.offsetTop)active=s.id;});navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active));}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
// Reveal-on-scroll animation
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
// Animated counters
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target,target=Number(el.dataset.count),start=performance.now(),duration=1300;function tick(now){const p=Math.min((now-start)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=Math.round(target*ease)+'+';if(p<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);counterObserver.unobserve(el);}}),{threshold:.7});
document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));
// Small magnetic hover on pointer devices
document.querySelectorAll('.magnetic').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`;});btn.addEventListener('mouseleave',()=>btn.style.transform='');});
document.querySelector('#year').textContent=new Date().getFullYear();
