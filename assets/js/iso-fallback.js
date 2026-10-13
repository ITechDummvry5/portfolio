/* iso-fallback.js: animated isometric "browser window" illustration that stands in
   when an image from image-manage.js fails to load.

   Its colours come from your global-style.css tokens (--acc), so changing the accent
   there recolours it. All of its classes start with iso-, so nothing clashes with style.css.

   Load it BEFORE image-manage.js (both deferred, in this order):
     <script src="iso-fallback.js" defer></script>
     <script src="image-manage.js" defer></script>

   Opt in per element:
     <div class="ph" data-img="project-landscape" data-fallback="iso"></div>
   Optional: data-iso-color="#2f6b1f" gives that one element its own base colour. */
(function () {
  const STAGE_W = 900, STAGE_H = 520;      // design size of the illustration; it is scaled to fit the element
  const CSS = `.iso-fb .iso-w-clearfix::before,.iso-fb .iso-w-clearfix::after{content:" ";display:table}
.iso-fb .iso-w-clearfix::after{clear:both}
.iso-fb .iso-w-preserve-3d{transform-style:preserve-3d}
.iso-fb .iso-background{position:relative;display:block;width:378px;height:750px;margin:0 auto;border-top-left-radius:10px;border-top-right-radius:10px;background-image:linear-gradient(152deg,color-mix(in srgb,var(--iso) 40%,#fff),var(--iso) 74%);perspective:999px}
.iso-fb .iso-top-bar{position:relative;left:0;top:0;right:0;width:100%;height:22px;border-bottom:2px solid var(--iso);border-top-left-radius:10px;border-top-right-radius:10px;background-color:color-mix(in srgb,var(--iso) 40%,#fff)}
.iso-fb .iso-dot{position:absolute;left:10px;top:8px;width:5px;height:5px;border-radius:100%;background-color:#fff}
.iso-fb .iso-dot.iso-_2{left:20px}
.iso-fb .iso-dot.iso-_3{left:30px}
.iso-fb .iso-left-strip{position:absolute;left:0;top:22px;z-index:0;width:38%;height:100%;background-image:linear-gradient(180deg,color-mix(in srgb,var(--iso) 54%,#fff),color-mix(in srgb,var(--iso) 7%,transparent) 37%)}
.iso-fb .iso-text-like-box{position:relative;width:38%;padding:20px 25px 25px;float:left}
.iso-fb .iso-text-like-box.iso-bottom{top:-250px;width:31%;padding-top:0;clear:left;background-image:none}
.iso-fb .iso-text-like-box.iso-bottom.iso-v2{top:-32px;width:80%;margin-left:30%;float:none;clear:none}
.iso-fb .iso-straight-line{position:relative;width:83%;height:2px;margin-left:2%;padding-top:22px;float:left;border-bottom:2px solid #fff}
.iso-fb .iso-straight-line-full{position:relative;width:100%;height:2px;margin-top:7px;clear:left;border-radius:1px;background-color:#fff}
.iso-fb .iso-straight-line-full.iso-shortened{width:50%}
.iso-fb .iso-square-tower{position:relative;top:-20px;width:35%;height:150px;float:left;clear:left;perspective:999px}
.iso-fb .iso-play-box{position:relative;left:0;top:50%;right:0;z-index:4;display:block;overflow:visible;width:65px;height:65px;margin:0 auto;border:2px solid #fff;border-radius:0 3px 3px;background-image:linear-gradient(135deg,color-mix(in srgb,color-mix(in srgb,var(--iso) 74%,#fff) 70%,transparent),color-mix(in srgb,color-mix(in srgb,var(--iso) 48%,#fff) 70%,transparent));transform:translate(0,-50%) translate3d(-79px,-61px,70px)}
.iso-fb .iso-play-box__play-icon{position:absolute;left:0;top:50%;right:0;display:block;width:15px;margin:0 auto;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:15px solid #fff;transform:translate(0,-50%)}
.iso-fb .iso-play-box__top-bar{position:relative;left:-2px;top:-6px;z-index:0;width:35%;height:5px;border-top-left-radius:3px;border-top-right-radius:3px;background-color:#fff}
.iso-fb .iso-play-box__square-1{position:absolute;left:0;top:50%;right:0;z-index:3;display:block;width:65px;height:65px;margin:0 auto;border-radius:3px;background-color:color-mix(in srgb,color-mix(in srgb,var(--iso) 41%,#fff) 70%,transparent);transform:translate(0,-50%) translate3d(-62px,-44px,50px)}
.iso-fb .iso-play-box__square-2{position:absolute;left:0;top:50%;right:0;z-index:2;display:block;width:65px;height:65px;margin:0 auto;border-radius:3px;background-color:color-mix(in srgb,var(--iso) 58%,#fff);background-image:linear-gradient(315deg,color-mix(in srgb,var(--iso) 58%,#fff),color-mix(in srgb,var(--iso) 66%,#fff));transform:translate3d(-42px,-92%,50px)}
.iso-fb .iso-play-box__square-bottom{position:absolute;left:0;top:50%;right:0;z-index:0;display:block;width:65px;height:65px;margin:0 auto;border-radius:3px;background-image:linear-gradient(335deg,color-mix(in srgb,color-mix(in srgb,var(--iso) 85%,#fff) 62%,transparent) 11%,color-mix(in srgb,color-mix(in srgb,var(--iso) 85%,#fff) 33%,transparent) 48%);transform:translate(-18px,-57%)}
.iso-fb .iso-bottom-line-bar{position:relative;top:-230px;width:25%;height:200px;margin-left:8%;clear:left;border-radius:5px;background-image:linear-gradient(185deg,color-mix(in srgb,var(--iso) 73%,#fff),color-mix(in srgb,color-mix(in srgb,var(--iso) 83%,#fff) 0%,transparent) 86%)}
.iso-fb .iso-mountain-photo-parent{position:relative;left:-20px;top:0;width:62%;padding:25px;float:left;perspective:9999px}
.iso-fb .iso-mountain-photo__real-deal{position:relative;left:0;top:-70px;right:0;display:block;overflow:hidden;width:80%;height:100px;margin:0 auto;border-radius:1px;background-image:linear-gradient(315deg,color-mix(in srgb,color-mix(in srgb,var(--iso) 12%,#fff) 90%,transparent),color-mix(in srgb,var(--iso) 40%,#fff));box-shadow:29px 29px 0 6px color-mix(in srgb,color-mix(in srgb,var(--iso) 79%,#fff) 80%,transparent)}
.iso-fb .iso-mountain-photo__real-deal.iso-small{top:30px;width:90%;height:60px;float:left;clear:left;box-shadow:none;opacity:.51}
.iso-fb .iso-mountain-photo__real-deal.iso-small.iso-no-mountains{top:50px;opacity:.21}
.iso-fb .iso-mountain{position:relative;left:-25px;top:65px;right:0;display:block;width:70%;height:80%;margin:0 auto;border-radius:5px;background-image:linear-gradient(180deg,color-mix(in srgb,var(--iso) 17%,#fff),color-mix(in srgb,var(--iso) 39%,#fff));transform:rotate(45deg)}
.iso-fb .iso-mountain.iso-_2{position:absolute;left:25px;top:58px;right:0;width:90%;height:110%;background-image:linear-gradient(90deg,rgba(255,255,255,.7),color-mix(in srgb,color-mix(in srgb,var(--iso) 39%,#fff) 66%,transparent) 51%)}
.iso-fb .iso-mountain.iso-shrunked{left:-6px;top:31px}
.iso-fb .iso-mountain.iso-shrunked.iso-_2{left:25px;top:30px;right:0}
.iso-fb .iso-arrow-line{position:absolute;left:0;right:0;bottom:54px;display:block;width:2px;height:42px;margin:0 auto;background-color:#fff}
.iso-fb .iso-arrow-line-small{position:absolute;left:-4px;right:0;bottom:0;width:2px;height:10px;background-color:#fff;transform:rotate(-45deg)}
.iso-fb .iso-arrow-line-small.iso-v2{left:4px;transform:rotate(45deg)}
.iso-fb .iso-tri-parent{position:relative;left:0;top:-50px;right:0;width:62%;padding:30px;float:left;perspective:9999px}
.iso-fb .iso-column{position:relative;z-index:10;width:29.11%;margin-right:1.11%;margin-left:3.11%;padding:12px;float:left;border-radius:5px;background-image:linear-gradient(135deg,color-mix(in srgb,var(--iso) 34%,#fff),color-mix(in srgb,var(--iso) 44%,#fff));box-shadow:11px 11px 0 0 color-mix(in srgb,var(--iso) 86%,#fff)}
.iso-fb .iso-circle{position:relative;display:block;width:20px;height:20px;margin:0 auto;border:2px solid #fff;border-radius:100%}
.iso-fb .iso-string-block{position:relative;top:30px;width:30%;float:left}
.iso-fb .iso-square{position:relative;left:0;top:0;right:0;display:block;width:25px;height:25px;margin:0 auto;border-radius:1px;background-color:color-mix(in srgb,var(--iso) 20%,#fff);box-shadow:11px 11px 0 -1px color-mix(in srgb,var(--iso) 87%,#fff)}
.iso-fb .iso-square.iso-_2{top:60px;z-index:1}
.iso-fb .iso-square.iso-_3{top:-10px}
.iso-fb .iso-connector-bar{position:absolute;left:0;top:22px;right:0;display:block;width:2px;height:25px;margin:0 auto;background-color:color-mix(in srgb,var(--iso) 20%,#fff);box-shadow:11px 11px 0 0 color-mix(in srgb,var(--iso) 87%,#fff)}
.iso-fb .iso-circle-tower{position:absolute;left:0;top:-66px;width:80px;height:80px;perspective:9999px}
.iso-fb .iso-circle-top{position:absolute;left:-8px;top:-4px;right:0;z-index:5;display:block;width:40px;height:40px;margin:0 auto;border-radius:100%;background-color:color-mix(in srgb,color-mix(in srgb,var(--iso) 23%,#fff) 80%,transparent);background-image:linear-gradient(315deg,rgba(255,255,255,.22),rgba(255,255,255,0));transform:translate3d(0,0,10px)}
.iso-fb .iso-circle-top.iso-_2{left:25px;top:10px;right:0;z-index:4}
.iso-fb .iso-circle-top.iso-_3{left:47px;top:23px;z-index:3;background-color:transparent;background-image:linear-gradient(180deg,color-mix(in srgb,var(--iso) 86%,#fff),rgba(255,255,255,.76));box-shadow:23px 19px 0 0 color-mix(in srgb,var(--iso) 26%,transparent);transform:none}
.iso-fb .iso-overflow-hidden{position:absolute;left:0;top:0;right:0;overflow:hidden;width:100%;height:100%}
.iso-fb{--iso:var(--acc,#e8541a);position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;border-radius:inherit;background:var(--iso)}
.iso-host{overflow:hidden}
.iso-host>:not(.iso-fb){position:relative;z-index:1}
.iso-fb .iso-stage{position:absolute;left:50%;top:50%;width:900px;height:520px;margin:-260px 0 0 -450px;transform:scale(var(--iso-s,.3));transform-origin:center;perspective:9999px}
.iso-fb .iso-hold{position:absolute;left:50%;top:50%;width:700px;margin-left:-350px;transform:translate(0,-50%) rotateX(55deg) rotateY(-3deg) rotateZ(49deg);perspective:9999px}
.iso-fb [data-ix]{transition:opacity .6s ease,transform .8s cubic-bezier(.22,1,.36,1),width .9s ease}
.iso-fb [data-ix^="loading-line"]{width:0}
.iso-fb [data-ix^="column-hover"],.iso-fb [data-ix="hovering-on-load-string-block"],.iso-fb [data-ix="arrow-load"]{opacity:0}
.iso-fb [data-ix^="pop-in"]{opacity:0;transform:scale(.8)}
.iso-fb [data-ix="mountain-slide-in"]{transform:translate(140px,0) rotate(45deg)}
.iso-fb [data-ix="mountain-slide-in-from-left"]{transform:translate(-100px,0) rotate(45deg)}
.iso-fb [data-ix="play-icon-on-load"]{transform:translate(-100px,-50%)}
.iso-fb.iso-ready [data-ix^="loading-line"]{width:100%}
.iso-fb.iso-ready .iso-shortened[data-ix^="loading-line"]{width:50%}
.iso-fb.iso-ready [data-ix^="column-hover"],.iso-fb.iso-ready [data-ix="hovering-on-load-string-block"],.iso-fb.iso-ready [data-ix="arrow-load"]{opacity:1}
.iso-fb.iso-ready [data-ix^="pop-in"]{opacity:1;transform:none}
.iso-fb.iso-ready [data-ix="mountain-slide-in"],.iso-fb.iso-ready [data-ix="mountain-slide-in-from-left"]{transform:rotate(45deg)}
.iso-fb.iso-ready [data-ix="play-icon-on-load"]{transform:translate(0,-50%)}`;
  const HTML = `<div class="iso-hold iso-w-preserve-3d"><div class="iso-background iso-w-clearfix"><div class="iso-left-strip"></div><div class="iso-top-bar"><div class="iso-dot"></div><div class="iso-_2 iso-dot"></div><div class="iso-_3 iso-dot"></div></div><div class="iso-text-like-box iso-w-clearfix"><div class="iso-straight-line" data-ix="arrow-load"></div><div class="iso-straight-line-full" data-ix="loading-line-animation"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-2"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-3"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-6-long"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-5"></div><div class="iso-shortened iso-straight-line-full" data-ix="loading-line-animation-6shorted"></div></div><div class="iso-mountain-photo-parent"><div class="iso-mountain-photo__real-deal" data-ix="arrow-load"><div class="iso-mountain" data-ix="mountain-slide-in-from-left"></div><div class="iso-_2 iso-mountain" data-ix="mountain-slide-in"></div></div><div class="iso-arrow-line" data-ix="arrow-load"><div class="iso-arrow-line-small"></div><div class="iso-arrow-line-small iso-v2"></div></div></div><div class="iso-square-tower" data-ix="arrow-load"><div class="iso-play-box iso-w-preserve-3d"><div class="iso-play-box__top-bar"></div><div class="iso-overflow-hidden"><div class="iso-play-box__play-icon" data-ix="play-icon-on-load"></div></div></div><div class="iso-play-box__square-1 iso-w-preserve-3d"></div><div class="iso-play-box__square-2 iso-w-preserve-3d"></div><div class="iso-play-box__square-bottom"></div></div><div class="iso-tri-parent iso-w-clearfix"><div class="iso-column" data-ix="column-hover"><div class="iso-circle" data-ix="pop-in"></div><div class="iso-straight-line-full" data-ix="loading-line-animation"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-2"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-3"></div></div><div class="iso-column" data-ix="column-hover-2"><div class="iso-circle" data-ix="pop-in-2"></div><div class="iso-straight-line-full" data-ix="loading-line-animation"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-2"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-3"></div></div><div class="iso-column" data-ix="column-hover-3"><div class="iso-circle" data-ix="pop-in-3"></div><div class="iso-straight-line-full" data-ix="loading-line-animation"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-2"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-3"></div></div><div class="iso-string-block" data-ix="hovering-on-load-string-block"><div class="iso-square"><div class="iso-connector-bar"></div></div><div class="iso-_2 iso-square"></div><div class="iso-_3 iso-square"><div class="iso-connector-bar"></div></div></div><div class="iso-bottom iso-text-like-box iso-v2 iso-w-clearfix" data-ix="column-hover"><div class="iso-straight-line-full" data-ix="loading-line-animation"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-2"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-3"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-6-long"></div><div class="iso-shortened iso-straight-line-full" data-ix="loading-line-animation-4-shortened"></div><div class="iso-mountain-photo__real-deal iso-small" data-ix="column-hover"><div class="iso-mountain iso-shrunked" data-ix="mountain-slide-in-from-left"></div><div class="iso-_2 iso-mountain iso-shrunked" data-ix="mountain-slide-in"></div></div><div class="iso-mountain-photo__real-deal iso-no-mountains iso-small" data-ix="column-hover"></div></div></div><div class="iso-bottom iso-text-like-box" data-ix="column-hover"><div class="iso-straight-line-full" data-ix="loading-line-animation"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-2"></div><div class="iso-straight-line-full" data-ix="loading-line-animation-3"></div><div class="iso-shortened iso-straight-line-full" data-ix="loading-line-animation-4-shortened"></div></div><div class="iso-bottom-line-bar" data-ix="column-hover-3"></div><div class="iso-circle-tower" data-ix="column-hover"><div class="iso-circle-top iso-w-preserve-3d"></div><div class="iso-_2 iso-circle-top iso-w-preserve-3d"></div><div class="iso-_3 iso-circle-top"></div></div></div></div>`;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let injected = false;

  function injectCss() {
    if (injected) return;
    const s = document.createElement("style");
    s.id = "iso-fallback-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }

  function mount(el, label) {
    if (!el || el.querySelector(":scope > .iso-fb")) return;
    injectCss();
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    el.classList.add("iso-host");

    const fb = document.createElement("div");
    fb.className = "iso-fb";
    fb.setAttribute("aria-hidden", "true");
    fb.innerHTML = '<div class="iso-stage">' + HTML + "</div>";
    if (el.dataset.isoColor) fb.style.setProperty("--iso", el.dataset.isoColor);
    el.insertBefore(fb, el.firstChild);

    // only label empty boxes; elements with text (like the wide project card) already have a name
    if (label && !el.textContent.trim()) {
      el.setAttribute("role", "img");
      el.setAttribute("aria-label", label + " (placeholder)");
    }

    fb.querySelectorAll("[data-ix]").forEach(function (n, i) {
      n.style.transitionDelay = reduce ? "0s" : i * 35 + "ms";   // stagger the load-in
    });

    function fit() {
      const w = el.clientWidth, h = el.clientHeight;
      if (w && h) fb.style.setProperty("--iso-s", Math.min(w / STAGE_W, h / STAGE_H).toFixed(4));
    }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(el);
    else addEventListener("resize", fit);

    if (reduce) fb.classList.add("iso-ready");
    else requestAnimationFrame(function () {
      requestAnimationFrame(function () { fb.classList.add("iso-ready"); });
    });
  }

  window.IsoFallback = { mount: mount };
})();
