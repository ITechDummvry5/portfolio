/* components.js: shared <site-nav> and <site-footer>.
   Edit SITE once and every page that uses them updates.
   Load it in <head> WITHOUT defer so the elements render before the page scripts run:
     <script src="assets/js/components.js"></script>   (use ../assets/... from pages/, ../../assets/... from pages/services/)
   On the home page:   <site-nav></site-nav>  ...  <site-footer></site-footer>
   On other pages:     <site-nav base="index.html"></site-nav>  (anchors become <root>/index.html#about) */

/* SITE_ROOT = the project root as a full URL, worked out from where this file lives (assets/js/).
   Every link in SITE below is written relative to the root (e.g. "pages/skills.html"), so the nav and footer
   work the same from index.html, pages/ and pages/services/. */
const SITE_ROOT = new URL("../../", document.currentScript.src).href;

/* mega menu styles load from here, so no page needs an extra <link> */
if (!document.querySelector('link[href*="mega-menu.css"]')) {
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = SITE_ROOT + "assets/css/mega-menu.css?v=4";
  document.head.appendChild(l);
}
const getTodayDate = () => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date());
  } catch (e) {
    return new Date().toLocaleDateString();
  }
};

const SITE = {
  brand: "KPersonnage",
  role: "Web Developer",
  fullName: "Charles Andrei Ignacio",
  wordmark: "CHARLES",
  pitch: "Need a website, a portfolio, or a web app built? Let's build something good together.",
  email: "itechdummvry@gmail.com",
  phone: "+63 (946) 757-7265",
  cta: ["Hire Me", "#contact"],
  // [label, anchor, show in header nav (1) or footer only (0)]
  links: [
    ["About", "#about", 1],
    ["Services", "#services", 0],
    ["Skills", "#skills", 1],
    ["Projects", "#work", 1],
    ["Contact", "#contact", 1]
  ],
  social: [
    ["GitHub", "https://github.com/ITechDummvry5"],
    ["LinkedIn", "https://linkedin.com/in/charles-andrei-ignacio"],
  ],
  /* Mega menus: each one opens under the nav link whose label matches "for". Add one by adding an object here.
     Links like skills.html#tool-excel jump to that exact tool on the skills page (ids are made in skills.js:
     cat-<category> for a row, tool-<name> for a logo, lowercase with dashes, e.g. tool-node-js).
     Links starting with http open in a new tab. Image keys live in image-manage.js.

     type "suite"    : numbered index (main: [label, link, short text, image key], hovering a row swaps the big image), 2 more images (art), sticker (feature), chip, small links (bottom) + CTA.
     type "showcase" : (not used right now, still supported) sections of project rows on the left, a big image panel on the right.
                       Row = [name, description, link, image key]. Image panel text and button are in "feature". */
  megas: [
    {
      for: "Skills", type: "suite",
      title: "Explore my skills", href: "pages/skills.html",
      mainLabel: "What I build", chip: "7 services", art: ["frontend-2", "about-default"],
      main: [
        ["Web Development",           "pages/services/web-development.html", "Fast, responsive sites",   "service-0"],
        ["Frontend & UI",             "pages/services/front-end.html",       "Design to clean code",     "service-1"],
        ["Portfolio & Landing Pages", "pages/services/portfolio.html",       "One page, one goal",       "service-2"],
        ["Web Apps",                  "pages/services/web-apps.html",        "Dashboards and data",      "service-3"],
        ["VBA Automation",            "pages/services/vba.html",             "Excel on autopilot",       "service-4"],
        ["WordPress",                 "pages/services/wordpress.html",       "Themes, plugins, content", "service-5"],
        ["IT Support",                "pages/services/it-support.html",      "Remote fixes and setup",   "service-6"]
      ],
      feature: { img: "mega-shiego", title: "Shego!?", href: "pages/skills.html" },
      bottom: [
        [getTodayDate(), "", "date"],
        ["+63 (946) 757-7265", "tel:+639467577265"],
        ["itechdummvry@gmail.com", "mailto:itechdummvry@gmail.com"]
      ]
    },
    {
      for: "Projects", type: "suite",
      title: "Explore my projects", href: "pages/projects.html",
      mainLabel: "Featured work", chip: "3 featured", cols: 1, thumbs: true, art: ["projects-hero", "about-default"],
      main: [
        ["ISEMS",     "https://github.com/ITechDummvry5", "Campus ERP system",      "project-isems"],
        ["PromptKit", "https://github.com/ITechDummvry5", "AI image prompt helper",  "project-promptkit"],
        ["Landscape", "https://github.com/ITechDummvry5", "Sustainable farming site", "project-landscape"]
      ],
      feature: { img: "mega-kim", title: "What's the sitch?", href: "pages/projects.html" },
      bottom: [
        [getTodayDate(), "", "date"],
        ["+63 (920) 883-3382", "tel:+639208833382"],
        ["ignaciocharlesandrei@gmail.com", "mailto:ignaciocharlesandrei@gmail.com"]
      ]
    },
    {
      /* TEST menu. cls "mega--black" turns the blobs and the circle black (see mega-menu.css). Portrait = image key "hero-portrait". */
      for: "Contact", type: "suite", cls: "mega--black", noCap: true, noMain: true,   // noCap: no "01 Email" pill; noMain: no big image on the left
      title: "Get in touch", href: "#contact",
      mainLabel: "Contact me", chip: "Open to work", art: ["project-bg"],
      main: [
        // left column (01-03): main contacts + LinkedIn. right column (04-06): second email, second number + GitHub.
        ["Email",           "mailto:itechdummvry@gmail.com",                  "itechdummvry@gmail.com",           ],
        ["Phone",           "tel:+639467577265",                              "+63 (946) 757-7265",               ],
        ["LinkedIn",        "https://linkedin.com/in/charles-andrei-ignacio", "Let's connect",                    ],
        ["Email (2nd)",     "mailto:ignaciocharlesandrei@gmail.com",          "ignaciocharlesandrei@gmail.com",   ],
        ["Phone (2nd)",     "tel:+639208833382",                              "+63 (920) 883-3382",               ],
        ["GitHub",          "https://github.com/ITechDummvry5",               "See my code",                      ]
      ],
      feature: { img: "hero-portrait", title: "Hi, I'm Charles", href: "#contact" },
      bottom: [
        [getTodayDate(), "", "date"]
      ]
    }
  ],
  newsletter: { title: "Stay in the Loop", note: "Get an email when I publish new projects." }
};

const ARR_UP = '<svg class="mm-ic" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5h9.5V11M12.5 1.5 1.5 12.5"/></svg>';
const ARR_RT = '<svg class="mm-ic" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5"/></svg>';
const isExt = h => /^https?:/.test(h);
const isSpecial = h => /^(https?:|mailto:|tel:|#)/.test(h);
// root-relative hrefs (pages/skills.html, index.html#about) become full URLs so they resolve from any folder depth
const fixLinks = el => el.querySelectorAll("a[href]").forEach(a => {
  const h = a.getAttribute("href");
  if (h && !isSpecial(h)) a.setAttribute("href", SITE_ROOT + h);
});
// internal links get data-page (falls back to coming-soon.html if the page is missing); external links open in a new tab; tel/mailto/hash links stay native
const pageAttr = (h, t) => isExt(h) ? ' target="_blank" rel="noopener"' : (isSpecial(h) ? '' : ` data-page="${t}"`);
const link = (cls, [t, h, meta], ic = ARR_UP) => !h
  ? `<span class="${cls}${meta === 'date' ? ' mm-date' : ''}">${meta === 'date' ? '<span class="mm-dot" aria-hidden="true"></span>' : ''}<span>${t}</span></span>`
  : `<a class="${cls}" href="${h}"${pageAttr(h, t)}><span>${t}</span>${ic}</a>`;

function megaSuite(M) {
  const items = M.main, cols = M.cols || 2, rows = Math.ceil(items.length / cols), art = M.art || [];
  const num = i => String(i + 1).padStart(2, "0");
  const F = M.feature;
  return `
<div class="mega mega--suite${M.cls ? ' ' + M.cls : ''}" role="region" aria-label="${M.for} menu"><div class="mm-in">
  <div class="mm-left">
    <div class="mm-top">
      <h4 class="mm-kick"><i class="mm-dot-acc"></i>${M.mainLabel}</h4>
      ${M.title ? `<a class="mm-title" href="${M.href}"${pageAttr(M.href, M.for)}><span>${M.title}</span><i class="mm-circle">${ARR_RT}</i></a>` : ''}
    </div>
    <ol class="mm-index${M.thumbs ? ' has-th' : ''}" style="--cols:${cols};--rows:${rows}">${items.map(([t, h, d, k], i) => `
      <li><a class="mm-item${i ? '' : ' on'}" href="${h}"${pageAttr(h, t)} data-k="${k || ''}" data-num="${num(i)}"><span class="mm-num">${num(i)}</span>${M.thumbs && k ? `<span class="mm-th ph" data-img="${k}"></span>` : ''}<span class="mm-txt"><b>${t}</b>${d ? `<small>${d}</small>` : ''}</span>${ARR_UP}</a></li>`).join("")}
    </ol>
  </div>
  <div class="mm-art">
    <i class="mm-blob" aria-hidden="true"></i>
    ${M.noMain ? '' : `<div class="mm-i1 ph" data-img="${items[0][3] || ''}"></div>`}
    ${M.noCap ? '' : `<span class="mm-cap"><i>${num(0)}</i><b>${items[0][0]}</b></span>`}
    <div class="mm-i2 ph" data-img="${art[0] || ''}"></div>
    ${M.chip ? `<span class="mm-chip">${M.chip}</span>` : ''}
    <a class="mm-feature" href="${F.href}"${pageAttr(F.href, M.for)}><i class="mm-sbg"></i><div class="mm-sticker ph" data-img="${F.img}" data-fit="contain"></div><span class="mm-ftxt">${F.title}</span></a>
  </div>
  ${M.bottom ? `<div class="mm-bottom">${M.bottom.map(i => link("mm-small", i)).join("")}<a class="mm-cta" href="index.html${SITE.cta[1]}"><span>${SITE.cta[0]}</span>${ARR_UP}</a></div>` : ''}
</div></div>`;
}

function megaShowcase(M) {
  const F = M.feature;
  return `
<div class="mega mega--showcase" role="region" aria-label="${M.for} menu"><div class="mm-show">
  <div class="mm-list">${M.sections.map(sec => `
    <div class="mm-sec"><h4>${sec.title}</h4>${sec.items.map(([t, d, h, k]) => `
      <a class="mm-proj" href="${h}"${pageAttr(h, t)}><span class="mm-ptile" data-img="${k}">${t[0]}</span><span class="mm-ptxt"><b>${t}</b><small>${d}</small></span></a>`).join("")}
    </div>`).join("")}
  </div>
  <div class="mm-promo ph" data-img="${F.img}" data-overlay><div class="mm-promo-in">
    <small>${F.eyebrow}</small><h3>${F.title}</h3><p>${F.text}</p>
    <a class="mm-btn" href="${F.button[1]}"${pageAttr(F.button[1], F.button[0])}>${F.button[0]}</a>
  </div></div>
</div></div>`;
}

class SiteNav extends HTMLElement {
  connectedCallback() {
    const b = this.getAttribute("base") || "";
    const megas = SITE.megas || [];
    const items = SITE.links.filter(l => l[2]).map(([t, h]) => megas.some(m => m.for === t)
      ? `<li class="has-mega" data-mega="${t}"><a href="${b + h}" aria-haspopup="true" aria-expanded="false">${t}<i class="mm-caret" aria-hidden="true"></i></a></li>`
      : `<li><a href="${b + h}">${t}</a></li>`).join("");
    this.innerHTML = `
<nav aria-label="Main">
  <a href="${b || "#"}"><b>${SITE.brand}</b></a>
  <ul>${items}<li><a class="pill" href="${b + SITE.cta[1]}">${SITE.cta[0]}</a></li></ul>
</nav>`;
    fixLinks(this);

    // Mega menus: each panel lives on <body> (not inside the nav) so no hero element can cover it or steal the pointer.
    const nav = this.querySelector("nav");
    this._megas = [];
    megas.forEach(M => {
      const li = this.querySelector(`.has-mega[data-mega="${M.for}"]`);
      if (!li) return;
      const wrap = document.createElement("div");
      wrap.innerHTML = M.type === "showcase" ? megaShowcase(M) : megaSuite(M);
      const p = wrap.firstElementChild;
      fixLinks(p);
      document.body.appendChild(p);
      window.ImageManager && ImageManager.apply(p);
      // hovering (or focusing) a row swaps the big image and its caption
      const big = p.querySelector(".mm-i1"), cap = p.querySelector(".mm-cap");
      if (big) {
        const url = k => window.ImageManager && ImageManager.url(k);
        p.addEventListener("mouseenter", () => p.querySelectorAll(".mm-item[data-k]").forEach(x => { const u = url(x.dataset.k); if (u) new Image().src = u; }), { once: true });
        p.querySelectorAll(".mm-item").forEach(x => {
          const swap = () => {
            p.querySelectorAll(".mm-item.on").forEach(o => o.classList.remove("on")); x.classList.add("on");
            const u = url(x.dataset.k); if (!u) return;
            big.style.backgroundImage = 'url("' + u + '")';
            if (cap) { cap.querySelector("i").textContent = x.dataset.num; cap.querySelector("b").textContent = x.querySelector("b").textContent; }
            big.classList.remove("swap"); void big.offsetWidth; big.classList.add("swap");
          };
          x.addEventListener("mouseenter", swap); x.addEventListener("focus", swap);
        });
      }
      const a = li.querySelector("a");
      let t;
      const m = { p, close() { clearTimeout(t); p.classList.remove("open"); a.setAttribute("aria-expanded", "false"); } };
      this._megas.push(m);
      const place = () => {
        const top = Math.max(nav.getBoundingClientRect().bottom, 0);   // flush under the nav, no gap
        p.style.top = top + "px";
        p.style.maxHeight = "calc(100vh - " + (top + 16) + "px)";
      };
      const show = () => {
        this._megas.forEach(o => { if (o !== m) o.close(); });
        clearTimeout(t); place(); p.classList.add("open"); a.setAttribute("aria-expanded", "true");
      };
      const hide = () => { clearTimeout(t); t = setTimeout(m.close, 200); };
      const leaving = e => { if (!li.contains(e.relatedTarget) && !p.contains(e.relatedTarget)) hide(); };
      [li, p].forEach(el => {
        el.addEventListener("mouseenter", show);
        el.addEventListener("mouseleave", hide);
        el.addEventListener("focusin", show);
        el.addEventListener("focusout", leaving);
      });
      addEventListener("keydown", e => { if (e.key === "Escape" && p.classList.contains("open")) { m.close(); a.focus(); } });
      addEventListener("scroll", () => { if (p.classList.contains("open")) place(); }, { passive: true });
      addEventListener("resize", () => { if (p.classList.contains("open")) place(); });
    });
  }
  disconnectedCallback() { (this._megas || []).forEach(m => m.p.remove()); }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const b = this.getAttribute("base") || "";
    const nav = [["Home", b || "#"]].concat(SITE.links.map(([t, h]) => [t, b + h]))
      .map(([t, h]) => `<a href="${h}">${t}</a>`).join("");
    const social = SITE.social.concat([["Email", "mailto:" + SITE.email]])
      .map(([t, h]) => `<a href="${h}">${t}</a>`).join("");
    this.innerHTML = `
<footer>
  <div class="wrap">
    <div class="f1">
      <div><p class="big2">${SITE.pitch}</p>
        <div class="who"><span class="av av-3" data-img="footer-avatar"></span><div>${SITE.fullName}<small>${SITE.role}</small></div></div></div>
      <form class="news" novalidate>
        <h3 class="news-title">${SITE.newsletter.title}</h3>
        <input placeholder="Your name *" aria-label="Your name"><input type="email" placeholder="Email *" aria-label="Email">
        <button class="pill" type="submit">Subscribe &nbsp;<span class="arrow">&rarr;</span></button>
        <small>${SITE.newsletter.note}</small><div class="msg" role="status"></div>
      </form>
    </div>
    <div class="f2">
      <dl><dt>Phone:</dt><dd>${SITE.phone}</dd><dt>Email:</dt><dd>${SITE.email}</dd></dl>
      <div class="cols">
        <div><h4>Navigation</h4>${nav}</div>
        <div><h4>Social</h4>${social}</div>
      </div>
    </div>
  </div>
  <div class="fw"><div class="word font-display" aria-hidden="true">${SITE.wordmark}</div><div class="ph" data-img="footer-photo" role="img" aria-label="Placeholder photo"></div></div>
</footer>`;
    fixLinks(this);
    // newsletter form
    const f = this.querySelector("form"), m = this.querySelector(".msg");
    const inputs = f.querySelectorAll("input");
    f.addEventListener("submit", e => {
      e.preventDefault();
      const name = inputs[0].value.trim(), mail = inputs[1].value.trim();
      const bad = !name ? [0, "Enter your name."]
        : !/^\S+@\S+\.\S+$/.test(mail) ? [1, "Enter a valid email address."] : null;
      if (bad) { m.className = "msg err"; m.textContent = bad[1]; inputs[bad[0]].focus(); return; }
      m.className = "msg ok"; m.textContent = "You're subscribed."; f.reset();
    });
  }
}

customElements.define("site-nav", SiteNav);
customElements.define("site-footer", SiteFooter);
