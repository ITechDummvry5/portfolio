/* home.js: scripts for index.html only (services tabs, skills grid, hero scroll, contact form).
   Shared behavior (accordion, counters, bindForm) is in global.js, page links in page-link.js.
   Load it at the bottom of index.html, before image-manage.js:
     <script src="home.js" defer></script> */

// ---------- services ----------
// [name, description, chips, page]
const S=[["Web Development","Hand-coded websites in HTML, CSS, and JavaScript that load fast and work on every screen.",["HTML","CSS","JavaScript"], "pages/services/web-development.html"],
["Frontend & UI","Clean, responsive interfaces built from a design or from scratch.",["Responsive","Accessibility","Animations"], "pages/services/front-end.html"],
["Portfolio & Landing Pages","Single-page sites that present you or your business clearly and make it easy to get in touch.",["Single-file","Fast","SEO basics"], "pages/services/portfolio.html"],
["Web Apps","Tools and portals with forms, dashboards, and data, from small utilities to full-stack apps.",["Dashboards","Forms","APIs"], "pages/services/web-apps.html"],
["VBA Automation","Excel and Office macros that remove repetitive work: report generation, data cleanup, and custom forms.",["Excel","Macros","Reports"], "pages/services/vba.html"],
["WordPress","WordPress sites with custom themes and plugins, set up so you can edit your own content.",["Themes","Plugins","CMS"], "pages/services/wordpress.html"],
["IT Support","Troubleshooting, setup, and maintenance for computers, software, and networks, so your team can keep working.",["Troubleshooting","Setup","Maintenance", "Networking"], "pages/services/it-support.html"]];
const tabs=document.getElementById("tabs"),panel=document.getElementById("panel");
function pick(i){[...tabs.children].forEach((b,j)=>b.setAttribute("aria-selected",i===j));const s=S[i];
panel.innerHTML=`<div class="ph svc-${i}" data-img="service-${i}"></div><p>${s[1]}</p><div class="chips">${s[2].map(c=>`<span>${c}</span>`).join("")}</div><a class="pill more" href="${s[3]||"#contact"}" data-page="${s[0]}">See more &nbsp;<span class="arrow">&rarr;</span></a>`;window.ImageManager&&ImageManager.apply(panel)}
S.forEach((s,i)=>{const b=document.createElement("button");b.role="tab";b.textContent=s[0];b.onclick=b.onmouseenter=()=>pick(i);tabs.appendChild(b)});pick(0);

// ---------- skills ----------
const K=[["Frontend",[["HTML",90],["CSS",85],["JavaScript",80]]],["Backend & Data",[["Node.js & Express",60],["PostgreSQL",55],["REST APIs",60]]],["Tools",[["Git & GitHub",75],["React & Vite",60],["VS Code",90]]]];
document.getElementById("skills-grid").innerHTML=K.map(([t,r])=>`<div class="sk"><h3>${t}</h3>${r.map(([n,v])=>`<div class="row">${n}</div><div class="bar" role="img" aria-label="${n} proficiency ${v} percent"><i data-v="${v}"></i></div>`).join("")}</div>`).join("");
document.querySelectorAll("#skills-grid .bar i").forEach(i=>{i.style.width=i.dataset.v+"%"});

// ---------- hero: scroll progress (0 to 1) moves the orbit dots and fades the portrait ----------
(function(){
const track=document.getElementById("hero-track"),hero=track.querySelector(".hero");
if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
let tick=false;
function update(){tick=false;const max=track.offsetHeight-2*innerHeight;
hero.style.setProperty("--p",Math.min(Math.max(-track.getBoundingClientRect().top/max,0),1).toFixed(3))}
function queue(){if(!tick){tick=true;requestAnimationFrame(update)}}
addEventListener("scroll",queue,{passive:true});addEventListener("resize",queue);update();
})();

// ---------- contact form (bindForm comes from global.js) ----------
// Web3Forms (free): the access key and limits come from .env via config.js (see scripts/generate-config.js).
const CFG=window.ENV||{};
const WEB3FORMS_KEY=CFG.WEB3FORMS_ACCESS_KEY||"";
const CONTACT_EMAIL=CFG.CONTACT_EMAIL||"itechdummvry@gmail.com";
// Limit per visitor: MAX_PER_DAY messages in any 24 hours, counted in this browser (localStorage).
// This is a light guard against accidental or repeated sending. It does not stop someone who clears their browser data.
const MAX_PER_DAY=CFG.CONTACT_MAX_PER_DAY||10, DAY=24*60*60*1000, LIMIT_KEY="contactSends";
function recentSends(){
  try{return (JSON.parse(localStorage.getItem(LIMIT_KEY))||[]).filter(t=>Date.now()-t<DAY)}catch(e){return []}
}
function recordSend(){
  try{localStorage.setItem(LIMIT_KEY,JSON.stringify(recentSends().concat(Date.now())))}catch(e){}
}
function sendContact(d){
  if(recentSends().length>=MAX_PER_DAY){
    const err=new Error("Daily limit reached");
    err.userMessage="You've reached today's limit of "+MAX_PER_DAY+" messages. Please try again tomorrow or email "+CONTACT_EMAIL+".";
    return Promise.reject(err);
  }
  if(!WEB3FORMS_KEY)return Promise.reject(new Error("Web3Forms access key is not set. Add WEB3FORMS_ACCESS_KEY to .env and run: node scripts/generate-config.js"));
  const body={access_key:WEB3FORMS_KEY,subject:"New message from your portfolio",from_name:"Portfolio contact form",name:d.fn,email:d.em,message:d.ms};
  if(document.getElementById("bc").checked)body.botcheck=true;   // spam trap: only sent when a bot ticked it
  return fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(body)})
  .then(r=>r.json().catch(()=>({success:false,message:"Bad response (HTTP "+r.status+")"})))
  .then(j=>{if(!j.success)throw new Error(j.message||"Send failed");recordSend()});
}
bindForm("form","msg",[["fn",v=>v,"Enter your first name."],["em",Global.isEmail,"Enter a valid email address."],["ms",v=>v.length>9,"Tell us a bit more (10+ characters)."]],"Message sent. I'll reply within one business day.",sendContact);
