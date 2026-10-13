/* image-manage.js: one place to manage every image on the site.
   1. Put your files in the assets/images/ folder.
   2. Match each key below to a data-img="key" in index.html.
   If a file is missing, the gradient placeholder stays, so nothing breaks. */
(function () {
  const BASE = new URL("../images/", document.currentScript.src).href;   // assets/images/

  // key: [file name, alt text]
  const IMAGES = {
    // hero and orbit
    "hero-portrait":        ["hero-portrait.png",       "Portrait of Charles Andrei Ignacio"],
    "hero-portrait-color":  ["kpr.png",                 "Kim possible and Ron Stoppable in a cartoon style"],
    "hero-portrait-bw":     ["ds.png",                  "Dr.dragon and Shego in a cartoon style"],
    "orbit-1":              ["orbit-1.png",             "Orbit  Charles Andrei Ignacio"],
    "orbit-2":              ["orbit-2.png",             "Orbit Kim Possible and Ron Stoppable"],
    "orbit-3":              ["orbit-3.png",             "Orbit Dr.dragon and Shego"],

    // about
    "about-default":        ["code.jpg",                "code Charles Andrei Ignacio"],
    "about-hover":          ["hero-portrait.png",       "Portrait of Charles Andrei Ignacio"],

    // services (home page tabs and first chapter of each service page)
    "service-0":            ["service-web-dev.jpg",     "Web development"],
    "service-1":            ["service-frontend.jpg",    "Frontend and UI"],
    "service-2":            ["service-landing.jpg",     "Portfolio and landing pages"],
    "service-3":            ["service-web-apps.jpg",    "Web apps"],
    "service-4":            ["service-vba.jpg",         "VBA automation"],
    "service-5":            ["service-wordpress.jpg",   "WordPress"],
    "service-6":            ["service-it-support.jpg",  "IT support"],

    // testimonials, bento grid, projects, footer
    "avatar-1":             ["avatar-1.png",            "Sarah Mitchell"],
    "avatar-2":             ["avatar-2.png",            "David Carter"],
    "bento-2":              ["bento-2.jpg",             "Client satisfaction"],
    "bento-3":              ["bento-3.jpg",             "Projects delivered"],
    "bento-5":              ["bento-5.jpg",             "Trusted by brands"],
    "project-isems":        ["project-isems.jpg",       "ISEMS screenshot"],
    "project-landscape":    ["project-landscape.jpg",   "Landscape website screenshot"],
    "project-promptkit":    ["project-promptkit.jpg",   "PromptKit screenshot"],
    "projects-hero":        ["projects-hero.png",       "Featured project"],
    "footer-avatar":        ["footer-avatar.png",       "Charles Andrei Ignacio"],
    "footer-photo":         ["kpr.png",                 "Photo of  Kim possible and Ron Stoppable in a cartoon style"],

    // service pages, chapters 2 to 4
    "web-dev-2":            ["web-dev-2.jpg",           "Fast-loading websites"],
    "web-dev-3":            ["web-dev-3.jpg",           "Responsive design"],
    "web-dev-4":            ["web-dev-4.jpg",           "Full-stack development"],
    "portfolio-2":          ["portfolio-2.jpg",         "One page, one goal"],
    "portfolio-3":          ["portfolio-3.jpg",         "Found and contacted"],
    "portfolio-4":          ["portfolio-4.jpg",         "Ready to share"],
    "frontend-2":           ["frontend-2.jpg",          "Design to code"],
    "frontend-3":           ["frontend-3.jpg",          "Accessibility"],
    "frontend-4":           ["frontend-4.jpg",          "Animations"],
    "it-support-2":         ["it-support-2.jpg",        "Remote troubleshooting"],
    "it-support-3":         ["it-support-3.jpg",        "Network and Wi-Fi setup"],
    "it-support-4":         ["it-support-4.jpg",        "Device and software setup"],
    "vba-2":                ["vba-2.jpg",               "Data processing"],
    "vba-3":                ["vba-3.jpg",               "Custom userforms"],
    "vba-4":                ["vba-4.jpg",               "Email and file automation"],
    "web-apps-2":           ["web-apps-2.jpg",          "Dashboards and data"],
    "web-apps-3":           ["web-apps-3.jpg",          "Forms and databases"],
    "web-apps-4":           ["web-apps-4.jpg",          "API integrations"],
    "wordpress-2":          ["wordpress-2.jpg",         "Custom WordPress design"],
    "wordpress-3":          ["wordpress-3.jpg",         "Blog and content setup"],
    "wordpress-4":          ["wordpress-4.jpg",         "Performance and plugins"],

    // interests gallery (images/interests/)
    "interest-1":           ["interests/1.jpg",         "UI & UX Design"],
    "interest-2":           ["interests/2.jpg",         "Movie"],
    "interest-3":           ["interests/3.jpg",         "Clean Coding"],
    "interest-4":           ["interests/4.jpg",         "Eating"],
    "interest-5":           ["interests/5.jpg",         "Gaming"],
    "interest-6":           ["interests/6.jpg",         "Manga"],
    "interest-7":           ["interests/7.jpg",         "Computers"],
    "interest-8":           ["interests/8.jpg",         "Music"],

    // skills mega menu (index nav): the image card on the right
    "mega-shiego":          ["mega/shiego.png",         "My full tech stack"],
    "mega-kim":             ["mega/kim.png",            "My full tech stack"],
    "mega-bg":           ["mega/kimchair.png",     "My full tech stack"],
    "mega-lair":        ["mega/dragonlair.png",  "My full tech stack"],
  };

  // Apply images inside root (the whole page by default).
  function apply(root) {
    (root || document).querySelectorAll("[data-img]").forEach(function (el) {
      const entry = IMAGES[el.dataset.img];
      if (!entry) { console.warn("image-manage: no entry for", el.dataset.img); return; }
      const url = BASE + entry[0];
      const probe = new Image();
      probe.onload = function () {
        const layer = 'url("' + url + '")';
        // data-overlay keeps text readable on top of the photo
        el.style.backgroundImage = el.hasAttribute("data-overlay")
          ? "linear-gradient(to top,rgba(0,0,0,.7),transparent 60%)," + layer
          : layer;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        el.setAttribute("role", "img");
        el.setAttribute("aria-label", entry[1]);
        el.classList.add("has-img");
        el.style.backgroundSize = el.dataset.fit || "cover";
        el.style.backgroundRepeat = "no-repeat";
      };
      probe.onerror = function () {
        console.info("image-manage: " + url + " not found, keeping placeholder");
      };
      probe.src = url;
    });
  }

window.ImageManager = { IMAGES: IMAGES, apply: apply, url: function (key) { var e = IMAGES[key]; return e ? BASE + e[0] : null; } };
  apply();
})();
