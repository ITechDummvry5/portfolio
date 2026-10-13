/* projects.js: scripts for projects.html only (camera hero, project strip, stats).
   Load it at the bottom of projects.html, before image-manage.js:
     <script src="projects.js" defer></script>
   Images come from image-manage.js: the hero uses the key "projects-hero", each project uses its own key (img). */
(function(){
/* ===== EDIT THESE ===== */
var HEIGHTS=[285];                        /* tile heights, repeated in this pattern (a project can also set its own h) */
var SPEED=60;                            /* strip speed in pixels per second: bigger number = faster */
var PROJECTS=[                           /* t: title, url: link, img: key in image-manage.js */
  {t:"PromptKit", url:"https://github.com/ITechDummvry5", img:"project-promptkit"},
  {t:"Landscape", url:"https://github.com/ITechDummvry5", img:"project-landscape"},
  {t:"ISEMS",     url:"https://github.com/ITechDummvry5", img:"project-isems"}
];
/* ====================== */

  var img=document.getElementById("zgHeroImg");
  var track=document.getElementById("blTrack"),pin=document.getElementById("work");
  var calm=matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- project strip ---------- */
  function tile(p,i,copy){
    var h=p.h||HEIGHTS[i%HEIGHTS.length],ext=/^https?:/.test(p.url);
    return '<a class="bl-tile" style="height:'+(h/285*100).toFixed(1)+'%" href="'+p.url+'"'+(ext?' target="_blank" rel="noopener"':'')+(copy?' aria-hidden="true" tabindex="-1"':'')+'><div class="bl-ph"><div class="bl-img" data-img="'+p.img+'"></div></div><span>'+p.t+'</span></a>';
  }
  function set(n,copy){var s="",r;for(r=0;r<n;r++)s+=PROJECTS.map(function(p,i){return tile(p,i,copy||r>0)}).join("");return s;}
  /* the list is shown twice so the loop never has a gap; with few projects it is repeated until it fills the screen */
  function build(){
    track.innerHTML=set(1,false)+(calm?"":set(1,true));
    var w=track.scrollWidth/(calm?1:2),n=Math.max(1,Math.ceil(innerWidth/Math.max(w,1)));
    if(!calm&&n>1)track.innerHTML=set(n,false)+set(n,true);
    track.style.setProperty("--dur",(track.scrollWidth/2/SPEED).toFixed(1)+"s");
    window.ImageManager&&ImageManager.apply(track);
  }
  if(calm)pin.classList.add("bl-still");
  build();
  var rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(build,200)});

  /* ---------- stats: projects count comes from the list; numbers count up when they appear ---------- */
  document.getElementById("statProjects").dataset.count=PROJECTS.length;
  var nums=[].slice.call(document.querySelectorAll(".bl-num"));
  function run(el){
    var to=+el.dataset.count;if(calm||!to){el.textContent=to;return;}
    var t0=performance.now();
    (function f(now){var k=Math.min(1,(now-t0)/1200);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f);})(t0);
  }
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target);}})},{threshold:.6});
    nums.forEach(function(n){io.observe(n)});
  }else nums.forEach(run);

  /* ---------- camera ---------- */
  if(calm){var cf=document.getElementById("camFocus");cf.style.left="50%";cf.style.top="50%";}   /* still mode: focus box rests in the centre */
  var tcEl=document.getElementById("camTime");                                                   /* timecode counts up like a recording */
  if(!calm){var T0=performance.now();setInterval(function(){
    var f=Math.floor((performance.now()-T0)/1000*24),pad=function(n){return(n<10?"0":"")+n};
    tcEl.textContent=pad(Math.floor(f/86400))+":"+pad(Math.floor(f/1440)%60)+":"+pad(Math.floor(f/24)%60)+":"+pad(f%24);
  },42);}

  /* double-click (or double-tap) the big image to zoom in where you clicked; again to zoom out */
  var zh=document.querySelector(".zg-hero"),zEl=document.getElementById("camZoom"),camEl=document.getElementById("zgCam"),z=1,tz=1,ZOOM=2.2,lastTap=0;
  if(calm)camEl.style.opacity=0;                         /* still mode: viewfinder only shows while zoomed */
  function toggleZoom(cx,cy){
    var r=img.getBoundingClientRect();                   /* zoom around the spot you clicked on the photo */
    if(tz>1){tz=1;zh.classList.remove("zoomed");}
    else{tz=ZOOM;zh.classList.add("zoomed");
      img.style.transformOrigin=((cx-r.left)/r.width*100).toFixed(1)+"% "+((cy-r.top)/r.height*100).toFixed(1)+"%";}
    if(calm){z=tz;img.style.transform="scale("+z+")";zEl.textContent=z.toFixed(1)+"x";camEl.style.opacity=tz>1?1:0;}
  }
  zh.addEventListener("dblclick",function(e){if(e.target.closest("a,button"))return;toggleZoom(e.clientX,e.clientY);});
  zh.addEventListener("pointerup",function(e){
    if(e.pointerType!=="touch"||e.target.closest("a,button"))return;
    var n=performance.now();if(n-lastTap<300){toggleZoom(e.clientX,e.clientY);lastTap=0;}else lastTap=n;
  });

  if(calm)return;

  var hero=zh,first=document.querySelector(".zg-first"),media=document.querySelector(".zg-media"),title=document.getElementById("zgTitle"),cam=camEl,box=document.getElementById("camFocus");
  /* focus box follows the pointer, then locks (turns orange) when it stops */
  var fx=0,fy=0,tx=0,ty=0,lockT;
  function centre(){tx=cam.clientWidth/2;ty=cam.clientHeight/2;}
  centre();fx=tx;fy=ty;addEventListener("resize",centre);
  hero.addEventListener("pointermove",function(e){var r=cam.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;box.classList.remove("lock");clearTimeout(lockT);lockT=setTimeout(function(){box.classList.add("lock")},350);});
  hero.addEventListener("pointerleave",function(){centre();clearTimeout(lockT);lockT=setTimeout(function(){box.classList.add("lock")},380);});
  /* title rises out of its mask when the hero comes into view */
  title.classList.add("pre");
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){title.classList.add("in");o.disconnect();}})},{threshold:.4}).observe(first);
  }else title.classList.add("in");

  /* scroll: the photo drifts slower than the page (parallax) and the corners round off */
  var clamp=function(v){return Math.max(0,Math.min(1,v))};
  var p=0,t=0,pp=0,pt=0,PX=0,PXR=.3;      /* PXR: parallax travel = 30% of the screen height. bigger = stronger */
  hero.classList.add("px");
  function sizePX(){PX=innerHeight*PXR;hero.style.setProperty("--px",PX.toFixed(0)+"px");}
  sizePX();addEventListener("resize",sizePX);
  function read(){var h=hero.getBoundingClientRect();t=clamp(-h.top/innerHeight);pt=clamp((innerHeight-h.top)/(innerHeight+hero.offsetHeight));}
  function apply(){
    var x=(3*p).toFixed(3)+"vw",r=(56*p).toFixed(2)+"px";
    media.style.clipPath="inset(0px "+x+" 0px "+x+" round 0px 0px "+r+" "+r+")";
    img.style.transform="translate3d(0,"+((pp-.5)*PX).toFixed(1)+"px,0) scale("+z.toFixed(3)+")";
    zEl.textContent=z.toFixed(1)+"x";
    cam.style.opacity=(tz>1?1:Math.max(0,1-p*2.2)).toFixed(3);   /* viewfinder hides once you scroll away, unless zoomed */
    box.style.transform="translate("+fx.toFixed(1)+"px,"+fy.toFixed(1)+"px)";
    title.style.transform="translateY("+(-70*p).toFixed(3)+"%)";
  }
  function tick(){
    read();
    z+=(tz-z)*.1;if(Math.abs(tz-z)<.002)z=tz;
    p+=(t-p)*.12;pp+=(pt-pp)*.12;if(Math.abs(pt-pp)<.0003)pp=pt;fx+=(tx-fx)*.14;fy+=(ty-fy)*.14;
    if(Math.abs(t-p)<.0005)p=t;
    apply();requestAnimationFrame(tick);
  }
  read();p=t;pp=pt;apply();tick();
})();
