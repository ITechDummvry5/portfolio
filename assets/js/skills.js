/* skills.js: scripts for skills.html only. Add or remove a line in D and the rows, counts and logos follow.
   Load it at the bottom of skills.html, AFTER image-manage.js (it registers its logos with it):
     <script src="image-manage.js" defer></script>
     <script src="skills.js" defer></script> */
(function(){
/* ===== EDIT THESE ===== */
/* [name, category, logo file in images/skill/ (without .png)] */
var D=[
  ["Laravel","Backend","laravel"],
  ["PHP","Backend","php"],
  ["Livewire","Backend","livewire"],
  ["HTML","Frontend","html"],
  ["CSS","Frontend","css"],
  ["JavaScript","Frontend","js"],
  ["SQL","Data","sql"],
  ["Figma","Design","figma"],
  ["Excel","Office","excel"],
  ["PowerPoint","Office","ppt"],
  ["Word","Office","word"],
  ["VBA","Automation","vba"],
  ["GitHub","Workflow","github"],
  ["Git","Workflow","git"],
  ["Canva","Design","canva"],
  ["Inkscape","Design","inkscape"],
  ["WordPress","CMS","wordpress"],
  ["Node.js","Backend","nodejs"],
  ["Elementor","CMS","elementor"],
  ["PostgreSQL","Data","postgres"],
  ["Kali Linux","Security","kali"],
  ["Antigravity","AI","antigravity"],
  ["Cisco Packet Tracer","Networking","packettracer"],
  ["Claude","AI","claude"],
  ["ChatGPT","AI","chatgpt"],
  ["Gemini","AI","gemini"],
  ["Replit","Workflow","replit"],
  ["n8n","Automation","n8n"],
  ["Virtual Machines","Networking","vm"],
  ["AWS","Cloud","aws"],
  ["Vercel","Cloud","vercel"],
  ["Hostinger","Cloud","hostinger"],
  ["Tailwind CSS","Frontend","tailwind"]
];
/* ====================== */

  var list=document.getElementById("stack");
  var calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var p2=function(n){return(n<10?"0":"")+n};
  var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")};
  var cats=D.map(function(d){return d[1]}).filter(function(c,i,a){return a.indexOf(c)===i});   /* categories, in order of first use */
  var inCat=function(c){return D.filter(function(d){return d[1]===c})};
  var slug=function(n){return String(n).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")};
  var initials=function(n){var w=n.split(/[\s.]+/).filter(Boolean);return(w.length>1?w.map(function(x){return x[0]}).join("").slice(0,3):n.slice(0,2)).toUpperCase()};

  /* register each logo with image-manage.js (images/skill/<file>.png) */
  if(window.ImageManager)D.forEach(function(d){ImageManager.IMAGES["skill-"+d[2]]=["skill/"+d[2]+".png",d[0]]});

  list.innerHTML=cats.map(function(c,i){
    var items=inCat(c);
    return '<div class="st-row" id="cat-'+slug(c)+'"><span class="st-num">'+p2(i+1)+'</span>'
      +'<div><h3>'+esc(c)+'</h3><p>'+items.map(function(d){return esc(d[0])}).join(", ")+'</p></div>'
      +'<div class="st-logos">'+items.map(function(d){return '<span class="st-logo" id="tool-'+slug(d[0])+'" title="'+esc(d[0])+'" data-img="skill-'+d[2]+'" data-fit="contain">'+esc(initials(d[0]))+'</span>'}).join("")+'</div></div>';
  }).join("");

  document.getElementById("stackCount").textContent=D.length+" tools in "+cats.length+" categories.";
  window.ImageManager&&ImageManager.apply(list);

  /* jump to #cat-<category> or #tool-<name> (from the nav mega menu) and flash it.
     If the id does not exist the page just stays at the top. */
  var hl=document.createElement("style");
  hl.textContent="@keyframes stHit{0%,100%{box-shadow:0 0 0 0 transparent}30%{box-shadow:0 0 0 8px rgba(232,84,26,.35)}}"
    +".st-logo.hit,.st-row.hit{animation:stHit 1.8s ease 1;border-radius:14px}";
  document.head.appendChild(hl);
  function go(){
    var el=location.hash.length>1&&document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(!el)return;
    var row=el.closest(".st-row")||el;
    row.classList.add("in");                                  /* show the row now so it is not still faded out */
    setTimeout(function(){
      el.scrollIntoView({behavior:calm?"auto":"smooth",block:"center"});
      el.classList.add("hit");setTimeout(function(){el.classList.remove("hit")},2000);
    },150);
  }
  go();addEventListener("hashchange",go);

  /* rows fade up as they scroll into view */
  var rows=[].slice.call(list.querySelectorAll(".st-row"));
  if(calm||!("IntersectionObserver" in window)){rows.forEach(function(r){r.classList.add("in")});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}})},{threshold:.15});
  rows.forEach(function(r){io.observe(r)});
})();
