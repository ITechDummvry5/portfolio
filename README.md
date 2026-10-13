# Portfolio

Static portfolio site (HTML, CSS, JavaScript). No framework and no build step, apart from one tiny script that turns `.env` into `assets/js/config.js`.

## Structure

```
portfolio/
├── index.html                 Home page
├── pages/
│   ├── projects.html
│   ├── skills.html
│   ├── interests.html         Shown in a pop-up on the home page
│   ├── coming-soon.html       Fallback for links to pages that do not exist yet
│   └── services/
│       ├── web-development.html
│       ├── front-end.html
│       ├── portfolio.html
│       ├── web-apps.html
│       ├── vba.html
│       ├── wordpress.html
│       └── it-support.html
├── assets/
│   ├── css/                   global-style, style, mega-menu, service, projects, skills, interests-modal
│   ├── js/                    components, global, home, image-manage, font-manage, projects, skills, ...
│   │   └── config.js          Generated from .env (not committed)
│   ├── fonts/                 Local font files
│   ├── images/                Photos (interests/, mega/, skill/ inside)
│   └── pdf/                   resume.pdf goes here
├── scripts/
│   └── generate-config.js     .env -> assets/js/config.js
├── docs/
│   └── design-guide.md        Spacing, fonts, how to add sections
├── .env                       Your real values (not committed)
├── .env.example               Template (committed)
├── .gitignore
└── package.json
```

## Setup

1. `cp .env.example .env` and fill in `WEB3FORMS_ACCESS_KEY`.
2. `node scripts/generate-config.js` (re-run after editing `.env`).
3. Serve the folder: `npm run dev`, or any static server. Opening `index.html` directly also works.

## Rules that keep the structure clean

- Pages go in `pages/` (services in `pages/services/`). Only `index.html` stays at the root.
- Every CSS, JS, font, image and PDF file lives under `assets/`.
- Links inside `components.js` and `home.js` are written from the project root (`pages/skills.html`). The code resolves them, so they work from any folder depth.
- In an HTML file, use normal relative paths: `../assets/css/style.css` from `pages/`, `../../assets/css/style.css` from `pages/services/`.
- `<site-nav base="index.html">` and `<site-footer base="index.html">` stay exactly the same on every non-home page.
- Image and font paths are set once, in `image-manage.js` and `font-manage.js`.

More detail (spacing tokens, adding a section, fonts, contact form): `docs/design-guide.md`.
