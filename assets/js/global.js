/* global.js: shared behavior for every page, the JS counterpart of global-style.css.
   Load it in <head> WITHOUT defer (like components.js) so bindForm() exists before page scripts run:
     <script src="global.js"></script>
   Page-specific code (services data, skills data, hero scroll) stays in the page's own file (home.js).

   1. Page links  <a href="page.html" data-page="Title">: opens the page if it exists, otherwise pages/coming-soon.html?service=Title
   2. Accordion   <div data-accordion><details>...</details>...</div>: one open at a time
   3. Counters    <b data-n="10" data-s="%">0</b>: counts up once when scrolled into view (data-s = suffix, default "+")
   4. Forms       bindForm(formId, messageId, [[inputId, check, errorText], ...], successText, sendFn)  (sendFn optional: returns a Promise)
                  Global.isEmail is a ready-made email check */
(function () {
  /* project root as a full URL (this file lives in assets/js/) */
  var ROOT = new URL("../../", document.currentScript.src).href;
  var SOON = ROOT + "pages/coming-soon.html";

  /* ---------- 1. page links ---------- */
  function pageExists(url) {
    url = url.split("#")[0];                       // check the file, not the #anchor
    return new Promise(function (res) {
      if (/^https?:$/.test(location.protocol)) {
        fetch(url, { method: "HEAD", cache: "no-store" })
          .then(function (r) { res(r.ok || r.status === 405); })
          .catch(function () { res(false); });
        return;
      }
      // opened from disk (file://): fetch is blocked, so probe with a script tag instead
      var s = document.createElement("script");
      var mute = function (e) { if (e.filename && e.filename.endsWith(url)) e.preventDefault(); };
      addEventListener("error", mute, true);
      var done = function (ok) { removeEventListener("error", mute, true); s.remove(); res(ok); };
      s.onload = function () { done(true); };
      s.onerror = function () { done(false); };
      s.src = url;
      document.head.appendChild(s);
    });
  }

  function toast(text) {
    var t = document.createElement("div");
    t.setAttribute("role", "status");
    t.textContent = text;
    t.style.cssText = "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:10000;background:#0a0a0a;color:#fff;padding:12px 20px;border-radius:99px;font:500 14px system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.3)";
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-page]");
    if (!a || a.getAttribute("href").startsWith("#")) return;
    e.preventDefault();
    var url = a.getAttribute("href"), title = a.dataset.page;
    pageExists(url).then(function (ok) {
      if (!ok) {
        // page missing: go to pages/coming-soon.html; if that is missing too, show a small notice instead of a 404
        pageExists(SOON).then(function (has) {
          if (has) location.assign(SOON + "?service=" + encodeURIComponent(title));
          else toast(title + " is coming soon.");
        });
        return;
      }
      if (a.hasAttribute("download")) {          // files: start the download instead of navigating
        var d = document.createElement("a");
        d.href = url; d.download = a.getAttribute("download") || "";
        document.body.appendChild(d); d.click(); d.remove();
      } else {
        location.assign(url);
      }
    });
  });

  /* ---------- 4. forms (available right away so page scripts can call it) ---------- */
  var isEmail = function (v) { return /^\S+@\S+\.\S+$/.test(v); };

  function bindForm(id, msgId, fields, done, send) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = document.getElementById(msgId);
      var bad = fields.find(function (f) { return !f[1](document.getElementById(f[0]).value.trim()); });
      if (bad) { m.className = "msg err"; m.textContent = bad[2]; document.getElementById(bad[0]).focus(); return; }
      if (!send) { m.className = "msg ok"; m.textContent = done; form.reset(); return; }
      // optional 5th argument: send(values) returns a Promise; success text shows only if it really sent
      var btn = form.querySelector("[type=submit]"), data = {};
      fields.forEach(function (f) { data[f[0]] = document.getElementById(f[0]).value.trim(); });
      if (btn) btn.disabled = true;
      m.className = "msg"; m.textContent = "Sending...";
      send(data).then(function () {
        m.className = "msg ok"; m.textContent = done; form.reset();
      }).catch(function () {
        m.className = "msg err"; m.textContent = "Sorry, your message could not be sent. Please try again or email itechdummvry@gmail.com.";
      }).then(function () { if (btn) btn.disabled = false; });
    });
  }

  window.Global = { pageExists: pageExists, isEmail: isEmail };
  window.bindForm = bindForm;

  /* ---------- 2 and 3 need the page to be parsed ---------- */
  addEventListener("DOMContentLoaded", function () {
    // accordion: one open at a time
    document.querySelectorAll("[data-accordion]").forEach(function (group) {
      var items = group.querySelectorAll("details");
      items.forEach(function (d) {
        d.addEventListener("toggle", function () {
          if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
    });

    // counters: once, when in view
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, n = +el.dataset.n, sf = el.dataset.s !== undefined ? el.dataset.s : "+", t0 = performance.now();
        (function f(t) {
          var p = Math.min((t - t0) / 1200, 1);
          el.textContent = Math.round(n * p) + (p === 1 ? sf : "");
          if (p < 1) requestAnimationFrame(f);
        })(t0);
      });
    }, { threshold: .6 });
    document.querySelectorAll("[data-n]").forEach(function (el) { io.observe(el); });
  });
})();
