/* font-manage.js: one place to manage every font on the site.
   Load it in <head> WITHOUT defer so fonts start loading right away:
     <script src="font-manage.js"></script>
   Each entry sets a CSS variable (var) that global-style.css already uses.
   - Local font:  set file (a file inside assets/fonts/), plus weight and style.
   - Google font: set google (the family part of the Google Fonts URL).
   - System font: set only family and fallback.
   If a font fails to load, the fallback stack keeps the page readable. */
(function () {
  const BASE = new URL("../fonts/", document.currentScript.src).href;   // assets/fonts/

  const FONTS = {
    body: {
      var: "--font",
      family: "Inter Tight",
      google: "Inter+Tight:wght@400;500;600;700",
      fallback: 'system-ui,-apple-system,"Segoe UI",sans-serif'
    },
    display: {                      // used by the .font-display class (hero and footer wordmark)
      var: "--font-display",
      family: "DX Slight",
      file: "dxslight.otf",
      weight: "800",
      style: "italic",
      fallback: '"Inter Tight",system-ui,sans-serif'
    },
    sub: {                          // sub display: used by the .font-sub class
      var: "--font-sub",
      family: "Jpan",
      file: "jpan.otf",
      weight: "400",
      style: "normal",
      fallback: '"Inter Tight",system-ui,sans-serif'
    },
    mono: {
      var: "--font-mono",
      family: "SFMono-Regular",
      fallback: "Menlo,Consolas,monospace"
    },
    sign: {                         // signature: used by the .sign class in the hero
  var: "--font-sign",
  family: "Mrs Saint Delafield",
  google: "Mrs+Saint+Delafield",
  fallback: "cursive"
},
  };

  const rootStyle = document.documentElement.style;
  let googleLoaded = false;

  Object.keys(FONTS).forEach(function (key) {
    const f = FONTS[key];

    // 1. point the CSS variable at this font, with its fallback
    rootStyle.setProperty(f.var, '"' + f.family + '",' + f.fallback);

    // 2. load the font itself
    if (f.google) {
      if (!googleLoaded) {
        const pre = document.createElement("link");
        pre.rel = "preconnect";
        pre.href = "https://fonts.gstatic.com";
        pre.crossOrigin = "";
        document.head.appendChild(pre);
        googleLoaded = true;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=" + f.google + "&display=swap";
      document.head.appendChild(link);
    } else if (f.file) {
      new FontFace(f.family, 'url("' + BASE + f.file + '")', {
        weight: f.weight || "400",
        style: f.style || "normal",
        display: "swap"
      }).load().then(function (face) {
        document.fonts.add(face);
      }).catch(function () {
        console.info("font-manage: " + BASE + f.file + " not found, using fallback for " + key);
      });
    }
  });

  window.FontManager = { FONTS: FONTS };
})();
