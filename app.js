(() => {
'use strict';
const $=id=>document.getElementById(id);
const money=n=>'₹'+Number(n).toFixed(2);
const services=[
{id:1,name:'Telegram',icon:'✈️',price:25,country:'India'},
{id:2,name:'WhatsApp',icon:'💬',price:35,country:'India'},
{id:3,name:'Google',icon:'🔎',price:30,country:'India'},
{id:4,name:'Facebook',icon:'ⓕ',price:28,country:'India'},
{id:5,name:'Instagram',icon:'📷',price:27,country:'India'},
{id:6,name:'Other Services',icon:'🌐',price:20,country:'Global'}
];
let balance=250,spent=120,recharged=370;
let orders=[
{id:'DEMO-1002',service:'Telegram',phone:'Demo number hidden',status:'waiting_sms',price:25},
{id:'DEMO-1001',service:'Google',phone:'Demo order only',status:'received',price:30}
];
let transactions=[{type:'Demo credit',amount:250,status:'sample'},{type:'Demo purchase',amount:-120,status:'sample'}];
function toast(s){const t=$('toast');t.textContent=s;t.style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.style.display='none',3000)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function card(s){return `<button class="service" data-service="${s.id}"><span class="service-icon">${s.icon}</span><span style="min-width:0"><span class="service-name">${esc(s.name)}</span><span class="service-meta">${esc(s.country)} · ${money(s.price)}</span></span><span class="arrow">›</span></button>`}
function renderServices(){const a=$('searchHome').value.toLowerCase(),b=$('searchNumbers').value.toLowerCase();$('servicesHome').innerHTML=services.filter(s=>s.name.toLowerCase().includes(a)).map(card).join('')||'<div class="empty">No matching services</div>';$('servicesNumbers').innerHTML=services.filter(s=>(s.name+' '+s.country).toLowerCase().includes(b)).map(card).join('')||'<div class="empty">No matching services</div>';document.querySelectorAll('[data-service]').forEach(x=>x.addEventListener('click',()=>buyDemo(Number(x.dataset.service))))}
function renderOrders(target,list){$(target).innerHTML=list.length?list.map(o=>`<div class="order"><div><b>${esc(o.service)} · ${esc(o.id)}</b><small>${esc(o.phone)}</small><small>${money(o.price)}</small></div><span class="status ${o.status==='received'?'received':o.status==='cancelled'?'cancelled':''}">${esc(o.status.replace('_',' '))}</span></div>`).join(''):'<div class="empty">No demo orders yet.</div>'}
function render(){['balance','homeBalance','walletBalance'].forEach(id=>$(id).textContent=Number(balance).toFixed(2));$('spent').textContent=money(spent);$('recharged').textContent=money(recharged);renderOrders('recentOrders',orders.slice(0,2));renderOrders('historyList',orders);$('orderCount').textContent=orders.length+' DEMO';$('transactions').innerHTML=transactions.map(t=>`<div class="order"><div><b>${esc(t.type)}</b><small>${esc(t.status)}</small></div><b>${t.amount>=0?'+':'−'}${money(Math.abs(t.amount))}</b></div>`).join('');renderServices()}
function buyDemo(id){const s=services.find(x=>x.id===id);if(!s)return;if(balance<s.price)return toast('Demo balance is too low.');if(!confirm(`Simulate a ${s.name} order for ${money(s.price)}? No real number or OTP will be provided.`))return;balance-=s.price;spent+=s.price;const o={id:'DEMO-'+Math.floor(10000+Math.random()*89999),service:s.name,phone:'Demo only — no real number',status:'waiting_sms',price:s.price};orders.unshift(o);transactions.unshift({type:'Demo purchase · '+s.name,amount:-s.price,status:'sample'});render();toast('Demo order created. No real number was purchased.')}
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===b.dataset.nav));document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.nav===b.dataset.nav));window.scrollTo({top:0,behavior:'smooth'})}));
$('searchHome').addEventListener('input',renderServices);$('searchNumbers').addEventListener('input',renderServices);$('searchHistory').addEventListener('input',()=>{const q=$('searchHistory').value.toLowerCase();renderOrders('historyList',orders.filter(o=>(o.service+' '+o.id+' '+o.status).toLowerCase().includes(q)))});
document.querySelectorAll('[data-nav="history"]').forEach(b=>b.addEventListener('click',()=>{}));
$('addFunds').addEventListener('click',()=>{document.querySelector('[data-nav="wallet"]').click()});
$('depositDemo').addEventListener('click',()=>{const n=Number($('depositAmount').value);if(!Number.isFinite(n)||n<10||n>50000)return toast('Enter a demo amount from ₹10 to ₹50,000.');transactions.unshift({type:'Demo deposit request',amount:n,status:'not paid / not verified'});toast('Demo request only. No payment was made.');$('depositAmount').value='100';render()});
$('applyPromo').addEventListener('click',()=>{if($('promo').value.trim().toUpperCase()==='DEMO10'){toast('Demo promo accepted: this preview does not add real funds.')}else toast('Invalid demo promo code. Try DEMO10.')});
$('copyReferral').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('MEOW10');toast('Demo referral code copied')}catch(e){toast('Referral code: MEOW10')}});
$('faq').addEventListener('click',()=>toast('Demo FAQ: connect your real support page before launch.'));
$('support').addEventListener('click',()=>toast('Add your official Telegram support link in assets/app.js.'));
const tg=window.Telegram?.WebApp;if(tg){tg.ready();tg.expand();if(tg.initDataUnsafe?.user){const u=tg.initDataUnsafe.user;$('profileName').textContent=[u.first_name,u.last_name].filter(Boolean).join(' ')||'Telegram User';document.querySelector('#profile .muted').textContent='Telegram ID: '+u.id;}}
render();
})();