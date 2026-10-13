# Portfolio template: layout and spacing guide

Adding a new section? Read **section 7** first. It keeps new sections on the same spacing and tokens as the rest of the page. Choosing fonts? See **section 8**.

All sizes are desktop values in px unless noted. Tokens live in `assets/css/global-style.css`; page rules live in `assets/css/style.css`.

## Files

Paths are relative to the project root. See the root `README.md` for the full tree.

| File | Role |
|---|---|
| `index.html` | Home page. Markup only, no inline styles |
| `pages/` | `projects.html`, `skills.html`, `interests.html`, `coming-soon.html` |
| `pages/services/` | The seven service pages: `web-development`, `front-end`, `portfolio`, `web-apps`, `vba`, `wordpress`, `it-support` |
| `assets/css/global-style.css` | Base layer: tokens, reset, `.wrap`, `.sec`, `.head`, `.tag`, `.pill`, `.ph`. Copy unchanged into new projects |
| `assets/css/style.css` | Styles shared by the home page and the other pages |
| `assets/css/service.css` | Styles shared by the service pages |
| `assets/css/mega-menu.css` | Mega menu styles (loaded by `components.js`) |
| `assets/js/global.js` | Shared scripts: page links, accordion, counters, and `bindForm()` for forms |
| `assets/js/home.js` | Scripts for `index.html` only: services tabs, skills grid, hero scroll, contact form |
| `assets/js/components.js` | `<site-nav>` and `<site-footer>`; edit the `SITE` object at the top. Links there are written from the project root (`pages/skills.html`) |
| `assets/js/image-manage.js` | Maps `data-img` keys to files in `assets/images/`; missing files keep the gradient placeholder |
| `assets/js/font-manage.js` | Loads every font from one `FONTS` list and sets the matching CSS variables; local files live in `assets/fonts/` |
| `assets/fonts/` | `dxslight.otf` (display) and `jpan.otf` (sub display), used by the `.font-display` and `.font-sub` classes |
| `assets/images/` | Your photos (see `assets/images/README.txt` for file names) |
| `assets/pdf/` | Put `resume.pdf` here (the Resume buttons point to it) |

## 1. Spacing tokens (global-style.css)

| Token | Desktop | Mobile (under 820px) | Used for |
|---|---|---|---|
| `--section-y` | 90 | 64 | Space above and below every section |
| `--space-head` | 44 | 32 | Section heading to its content |
| `--space-block` | 50 | 36 | Heading to grid in "Why choose us" |
| `--space-footer` | 70 | 48 | Space above the footer |
| `--gap` | 16 | 16 | Default grid gap (reference value) |
| `--wrap` | 1000 | 1000 | Max width of a section's content box |
| `--wrap-wide`    | 1110    | 1110                 | Wide content box, same as the nav and footer |

Radii and shadows

| Property           | Value          | Used for                                          |
| ------------------ | -------------- | ------------------------------------------------- |
| `--r`              | 20px           | Cards and forms                                   |
| `--r-sm`           | 14px           | Images and panels                                 |
| `--r-pill`         | 99px           | Buttons and chips                                 |
| FAQ radius         | 16px           | FAQ items                                         |
| Input radius       | 10px           | Inputs                                            |
| Send button radius | 12px           | Send button                                       |
| `--shadow`         | Defined in CSS | Cards, project tiles, FAQ items, and contact form |

## 2. Vertical rhythm between sections

Sections use padding only, never margin. The rule is `.sec{padding:var(--section-y) 0}` plus `.sec + .sec{padding-top:0}`, so two sections in a row are separated by exactly one `--section-y`.

| From | To | Space between |
|---|---|---|
| Hero | About | 90 (About's top padding) |
| About, Services, Skills, Why choose us, Projects, FAQ | next section | 90 |
| FAQ | Contact | 90 of page background, then 90 padding inside the dark Contact block |
| Contact | Footer | 90 inside the dark block, then 70 footer padding |

To change the rhythm of the whole site, edit `--section-y` only. Do not add `padding-top` or `margin-top` to individual sections.

## 3. Horizontal widths

- `.wrap`: max 1000 wide with 24 side padding, so content is 952 wide on large screens.
- Nav, hero lead text and the footer wordmark row use a 1110 container: `max(24px, calc((100% - 1110px) / 2))`.
- Sections are centred with `margin: 0 auto`.
- Wider or full-width content: see "Full-width and full-viewport sections" in section 7.

## 4. Section by section

### Hero
- Height: full viewport (`min-height: 100vh`); background `--grad-acc`.
- Nav: padding 20 top and bottom; link gap 28; logo 26px.
- Lead text: max width 350, 17px, positioned 28% from the top (18% on mobile).
- Portrait slot `.sil`: width `min(420px, 60vw)`, ratio 3:4, anchored to the bottom, shifted left 45%.
- Wordmark: `clamp(64px, 17.5vw, 270px)`, pulled down 8% so it overlaps the portrait.

### About
- Grid: 290 photo column + 1 flexible column, gap 40.
- Photo ratio 1:1.15. Paragraph `clamp(22px, 2.6vw, 28px)`, line-height 1.2.
- Stats row: 70 below the paragraph, gap 56, numbers 40px, labels 13px.

### Services
- Heading row `.head`: gap 30, 44 below.
- Two columns, gap 80. Each tab row: padding 28 top and bottom, font `clamp(26px, 3.4vw, 34px)`, 1px divider. Inactive tabs at 45% opacity.
- Panel: image ratio 16:9; text margin 16 above and below, max width 340; chips padding 6 by 14, 6 between chips.

### Skills
- Three columns, gap 16. Card padding 24, radius 20.
- Title 20px with 8 below; each skill row 16 above, label 14px; bar 6 high, 6 below its label.

### Why choose us (bento grid)
- Centred heading, then 50 (`--space-block`) to the grid.
- 12-column grid, gap 16. Card padding 20, min-height 250, radius 20.

| Card | Columns | Min-height |
|---|---|---|
| c1 quote | 6 | 250 |
| c2 98% | 6 | 250 |
| c3 150+ | 3 | 360 |
| c4 quote | 3 | 250 |
| c5 trusted by | 6 | 250 |

- Row 1 is 6 + 6, row 2 is 3 + 3 + 6. On mobile every card is full width.
- Big numbers 44px, quote mark 30px, avatar 42, gap between avatar and name 12.

### Projects
- Heading row like Services. Grid `1fr 1fr 1.4fr`, gap 20.
- Tile padding 12, inner gap 14, min-height 420, radius 20, image height 168, text padding 0 6 6, title 16px.
- The wide tile has no padding; its text block has 20 padding and sits on a dark gradient.

### FAQ
- Two columns `1fr 1.15fr`, gap 60.
- Item: padding 22 by 24, 14 between items, radius 16. Question 19px, icon 36 circle, gap 12; answer 14 below the question.

### Contact
- Padding `--section-y` top and bottom. Two columns 360 + flexible, gap 100, vertically centred.
- Form card: padding 20, radius 20, background `#f7f7f7`.
  - Title 22px; intro text 12px, 4 above, 14 below, max width 220.
  - Label: 12 above, 6 below, 14px.
  - Input: padding 12, radius 10. Message box: 2 rows, resizes vertically.
  - Send button: 16 above, padding 15, radius 12, full width.
  - Status message: 12 above, min-height 18 so the card does not jump.
- The form really sends email through Web3Forms, so it needs your access key (see **section 10**). The status message shows "Sending...", then success or an error.
- Right column: heading `clamp(36px, 5vw, 48px)`; subtext 16 above, 28 below, max width 440; contact details 14 apart; reply note 18 above the button.

### Footer
- Padding `--space-footer` on top.
- Top row: two columns, gap 60. Pitch text 20px, max width 440; person row 16 below it.
- Newsletter form: inputs padding 14 top and bottom with an underline only; button 20 above; note 12px, 20 above, max width 260.
- Details row: two columns, gap 60, 60 below the top row. Phone and email values 26px, 22 apart. Link columns gap 80, left padding 36, links 14px with 6 between.
- Wordmark row: 30 above, 1px top border, 20 padding, gap 24. Wordmark `clamp(56px, 12vw, 190px)` in `--acc`; photo `clamp(120px, 24vw, 310px)` wide, ratio 1.8:1.

## 5. Mobile (under 820px)

- Tokens shrink: `--section-y` 64, `--space-head` 32, `--space-block` 36, `--space-footer` 48.
- One column with gap 36: About, Services, FAQ, Contact, footer rows.
- Bento cards are full width; Projects and Skills become one column (gaps stay 20 and 16).
- Header shows only the Hire Me button; the other links are hidden.
- Footer link columns lose their 36 left padding; the wordmark row stacks.

## 6. Where to change what

| I want to change | Edit |
|---|---|
| Space between all sections | `--section-y` in `global-style.css` |
| Heading to content gap | `--space-head` |
| Card corners or shadow | `--r`, `--r-sm`, `--shadow` |
| Accent colour and hero gradient | `--acc`, `--acc-dark`, `--acc-light`, `--grad-acc` |
| Content width | `--wrap` |
| Grid column sizes or card gaps | the matching section in `style.css` |
| Nav links, contact details, footer text | `SITE` in `components.js` |
| Fonts (body, wordmark, mono) | `FONTS` list in `font-manage.js`; font files in `fonts/`; `.font-display` class in `global-style.css` |
| Photos | files in `images/`, names in `image-manage.js` |
| Size of a service-page image on a device | `height` of `.dev-cp`, `.dev-tablet`, `.dev-laptop` or `.dev-desktop` in `service.css` (section 9) |
| Where "Request this service" goes | the `href` on each button in `pages/services/*.html` (now `index.html#contact`) |
| Where contact form messages are sent | `WEB3FORMS_ACCESS_KEY` in `.env` (section 10) |

## 7. Rules for adding a new section

Every new section follows the same rules, so the spacing stays consistent and `global-style.css` stays the single source of truth.

### The rules

| #  | Rule                                                                                                                                            |
| -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Start every section with `<section class="sec" id="name">` and put the content in `<div class="wrap">`. Never add `padding` or `margin` to the section itself. For full-width or full-height needs, use a modifier (see "Full-width and full-viewport sections"). |
| 2  | Put the title row in `.head` with a `.tag`, an `h2` and a short `p`. Its 44px gap to the content comes from `--space-head`.                     |
| 3  | Do not use inline `style="..."`. Create a class in `style.css`. For values that change in JavaScript, use a `data-` attribute.                  |
| 4  | Use tokens, not raw values: `var(--acc)`, `var(--card)`, `var(--ink)`, `var(--mute)`, `var(--r)`, `var(--r-sm)`, `var(--shadow)`, `var(--border)`. |
| 5  | Use `var(--gap)` (16) for card grids. For column gaps use the values already on the page: 20, 40, 60 or 80.                                     |
| 6  | If you need a new reusable value (colour, radius, gap, shadow), add a token to `global-style.css` first, then use it.                           |
| 7  | Page-only styles go in `style.css` under a comment such as `/* team */`. Styles every project needs go in `global-style.css`.                   |
| 8  | Prefix your class names with the section name (`.team-grid`, `.team-card`) so they cannot clash with existing classes.                          |
| 9  | Add mobile rules inside the existing `@media(max-width:820px)` block in `style.css`. Use one column under 820px.                                |
| 10 | Images: add `data-img="key"` to the element, give it the `.ph` placeholder class, and add the key to `IMAGES` in `image-manage.js`.             |
| 11 | Add the section to the menus by adding `["Label", "#id", 1]` to `links` in `components.js`. Use 1 for header and footer, 0 for footer only.    |
| 12 | Page logic for the section goes in the script at the bottom of `index.html`. Anything reused on several pages goes in its own `.js` file.      |
| 13 | Fonts: pick a role from section 8 and use its class or variable. Never write a font name in `style.css`; fonts are changed only in `font-manage.js`. |

### Full-width and full-viewport sections

Add a modifier class next to `sec` instead of writing custom padding or heights.

| Need                                          | Markup                                        | What it does                                                                                 |
| --------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Normal                                        | `class="sec"` with `<div class="wrap">`       | 1000 content box, 90 above and below                                                         |
| Wide content                                  | `<div class="wrap wrap--wide">`               | 1110 content box, same as the nav and footer                                                 |
| Content edge to edge                          | `<div class="wrap wrap--full">` or no `.wrap` | Content spans the full browser width. A section background already spans the full width      |
| Own background colour or image                | `class="sec sec--bg"`                         | Keeps 90 padding on top and bottom, and the next section keeps its top gap                   |
| Full viewport height                          | `class="sec sec--screen"`                     | At least 100% of the screen height, content centred vertically, 90 padding kept              |
| Edge-to-edge band that touches its neighbours | `class="sec sec--flush"`                      | No vertical padding, for image strips, video and marquees                                    |

Put the background on the `<section>` itself and the content inside `.wrap`, so the colour reaches both edges while the text stays aligned. `sec--screen` uses `100svh`, which stays correct when phone browser toolbars show or hide. The hero is not a `.sec`; it sets its own `min-height: 100vh`, so use `sec--screen` for any new full-height section.

```html
<!-- full viewport, centred content -->
<section class="sec sec--screen" id="showcase">
  <div class="wrap wrap--wide">
    <h2>Content here</h2>
  </div>
</section>

<!-- edge-to-edge image band -->
<section class="sec sec--flush" id="band">
  <div class="ph band-image" data-img="band"></div>
</section>
```

```css
/* band */
.band-image{height:420px;border-radius:0}
```

### Page sliding over a pinned hero

Wrap every section after the hero (and the footer) in `<main class="over">`. The hero sits in `.hero-track` (sticky); `.over` has the page background and rounded top corners, so the whole page slides over the hero with no extra spacing. Do not put `.over` on a single section: if that section is shorter than the screen, the hero shows below it.

### Starter snippet

HTML, placed between two existing sections:

```html
<section class="sec" id="team"><div class="wrap">
  <div class="head">
    <div><div class="tag">[ TEAM ]</div><h2>Section title</h2></div>
    <p>One short line that explains the section.</p>
  </div>
  <div class="team-grid">
    <article class="team-card">
      <div class="ph" data-img="team-1"></div>
      <h3>Name</h3>
      <p>Role</p>
    </article>
  </div>
</div></section>
```

CSS, added to `style.css`:

```css
/* team */
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.team-card{background:var(--card);border-radius:var(--r);box-shadow:var(--shadow);padding:24px}
.team-card .ph{aspect-ratio:1/1;margin-bottom:16px}
```

Mobile rule, added inside the existing `@media(max-width:820px)` block:

```css
.team-grid{grid-template-columns:1fr}
```

Image key, added to `IMAGES` in `image-manage.js`:

```javascript
"team-1": ["team-1.jpg", "Team member photo"],
```

### Checklist before you finish

| Check                                                                          | Done |
| ------------------------------------------------------------------------------ | ---- |
| No `style="..."` in the HTML                                                   | [ ]  |
| No `padding-top` or `margin-top` on the section element                       | [ ]  |
| Colours, radii, shadows and borders use `var(--...)`                           | [ ]  |
| Mobile rule added inside the 820px media query                                 | [ ]  |
| New images registered in `image-manage.js`                                     | [ ]  |
| Menu link added in `components.js` if the section needs one                    | [ ]  |
| Gap above and below looks the same as the other sections (90px, 64px on mobile) | [ ]  |
| Full-width or full-height needs use `sec--bg`, `sec--screen` or `sec--flush`, not custom padding | [ ]  |
| No font names written in CSS; text uses the font roles from section 8 | [ ]  |

## 8. Fonts: which font to use where

There are four font roles. They are loaded by `font-manage.js` and exposed as CSS variables in `global-style.css`.

| Role    | Font                                          | CSS variable     | Class            | Used for                                      |
| ------- | --------------------------------------------- | ---------------- | ---------------- | --------------------------------------------- |
| Body    | Inter Tight                                   | `--font`         | none (on `body`) | Everything unless a row below says otherwise  |
| Display | DX Slight (ExtraBold Italic, one weight only) | `--font-display` | `.font-display`  | Hero and footer wordmark, short accent words  |
| Sub display | Jpan (file `jpan.ttf`)                    | `--font-sub`     | `.font-sub`      | Secondary display text such as section titles or sub headings |
| Mono    | SFMono, Menlo or Consolas                     | `--font-mono`    | `.font-mono`     | Numbers and stats                             |

### How to use each font

| Use                                      | Font    | Class or selector                                         | Size                                                    | Weight | Notes                                       |
| ---------------------------------------- | ------- | --------------------------------------------------------- | ------------------------------------------------------- | ------ | ------------------------------------------- |
| Hero title (big wordmark)                | Display | `.word.font-display`                                      | Hero `clamp(64px, 17.5vw, 270px)`; footer `clamp(56px, 12vw, 190px)` | 800 italic | Letter-spacing -.04em, line-height .8 |
| Logo in the nav                          | Body    | `nav b`                                                   | 26px                                                    | 600    | Letter-spacing -.03em                       |
| Section title                            | Body    | `h2`                                                      | `clamp(34px, 5vw, 48px)`                                | 500    | Letter-spacing -.03em, line-height 1.05     |
| Card or item title                       | Body    | `h3`                                                      | 16 to 22px                                              | 500    |                                             |
| Sub title (line beside a section title)  | Body    | `.head p`                                                 | 15px                                                    | 400    | Colour `--mute`, max width 400              |
| Hero lead                                | Body    | `.hero p.lead`                                            | 17px                                                    | 500    | White on the accent background              |
| About statement                          | Body    | `.about p`                                                | `clamp(22px, 2.6vw, 28px)`                              | 400    | Line-height 1.2                             |
| Description (normal body text)           | Body    | `p`                                                       | 14 to 15px                                              | 400    | Colour `--mute`                             |
| Small label                              | Body    | `.tag`                                                    | 13px                                                    | 400    | Written as `[ LABEL ]`                      |
| Buttons and nav links                    | Body    | `.pill`, `nav`                                            | 14px                                                    | 500    |                                             |
| Accent word                              | Display | `.font-display`                                           | Any size, short text only                               | 800 italic | One to three words, never a paragraph   |
| Sub display text                         | Sub     | `.font-sub`                                               | Any size, short text only                               | 400    | Use for headings that sit under the hero title |
| Accent number                            | Mono    | `.font-mono` (`.stats b` and `.big.mono` already use it)  | 40 to 44px                                              | 400    |                                             |

Notes:

- DX Slight has only one weight (ExtraBold Italic). Do not set other weights on it, and keep it for short text.
- `style.css` should only use `var(--font)`, `var(--font-display)`, `var(--font-mono)` or `inherit`.

```html
<div class="word font-display">CHARLES</div>
<h2>Section title</h2>
<p>A short description in the body font.</p>
<b class="font-mono">120</b>
<h2>Building <span class="font-display">fast</span> websites</h2>
```

### Change or add a font

1. Put the file in `fonts/`.
2. Edit its entry in `FONTS` in `font-manage.js` (`family`, `file`, `weight`, `style`). For a Google font, set `google` instead of `file`.
3. No CSS change is needed, because the CSS reads the variable.

To add a new role, add an entry in `FONTS` with a new variable such as `--font-script`, then add `.font-script{font-family:var(--font-script)}` to `global-style.css`.

## 9. Service pages (pages/services/*.html)

Each service page has four full-height chapters, and each chapter has one image. The four image containers are shaped like devices, in this order on every page:

| Chapter | Class on the `<figure>` | Shape | Height on screens wider than 820px | Width on screens 820px and under |
|---|---|---|---|---|
| 1 | `dev-cp` | Phone, 9:16 | `min(360px, 38svh)` | `min(56%, 200px)` |
| 2 | `dev-tablet` | Tablet, 3:4 | `min(400px, 42svh)` | `min(72%, 290px)` |
| 3 | `dev-laptop` | Laptop, 16:10 | `min(300px, 34svh)` | `min(90%, 360px)` |
| 4 | `dev-desktop` | Desktop monitor, 16:9 | `min(320px, 34svh)` | `min(100%, 400px)` |

- The rules sit in the "device-shaped image containers" block of `service.css` and only apply when `<main>` has the class `sv-devices`. Every service page has it.
- To resize a device, change its height (wide screens) or width (small screens) in that block. The other side follows the aspect ratio. The `svh` part stops the image from being taller than the screen.
- The corners get less round from phone (30px) to desktop (10px).
- Images still come from `image-manage.js` through `data-img`, for example `web-dev-2`.
- Every "Request this service" button links to `index.html#contact`, which scrolls to the contact form on the home page. There is no `contact.html`.

## 10. Environment variables and the contact form (Web3Forms)

This is a static site, so the browser cannot read `.env` directly. `scripts/generate-config.js` reads it and writes `config.js` (`window.ENV`), which `index.html` loads before `home.js`.

| File | Committed? | Purpose |
|---|---|---|
| `.env.example` | yes | Template with every variable and a comment |
| `.env` | no | Your real values |
| `config.js` | no | Generated from `.env`; loaded by the browser |
| `scripts/generate-config.js` | yes | Whitelists keys, applies defaults, writes `config.js` |
| `.gitignore` | yes | Keeps `.env` and `config.js` out of git |

Setup:
1. `cp .env.example .env`
2. Get a key at web3forms.com (enter `itechdummvry@gmail.com`) and put it in `WEB3FORMS_ACCESS_KEY`.
3. Run `node scripts/generate-config.js` (or `npm run dev`). Re-run it after any `.env` change.
4. On Vercel/Netlify, set the same variables in the dashboard and use `node scripts/generate-config.js` as the build command. Dashboard values win over `.env`.

Everything in `config.js` is public. Web3Forms keys are designed for this, so restrict the key to your domain in their dashboard. Never put private secrets in `.env` for this site.

How it works:
- `bindForm()` in `global.js` checks the fields, then calls the optional `send` function passed as its fifth argument. Without that argument it behaves as before: it shows the success text and clears the form.
- `sendContact()` in `home.js` posts the name, email and message to Web3Forms. The success text shows only if the message was sent.
- If sending fails, or the key is missing, the form shows an error that includes the email address.
- Each visitor can send up to `MAX_PER_DAY` messages (10) in any 24 hours, counted in their own browser with `localStorage`. This is a light guard only: clearing browser data resets it. Web3Forms itself allows 250 messages per month on the free plan.
- A hidden checkbox (`id="bc"`) in the form is a spam trap for simple bots.
