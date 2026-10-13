#!/usr/bin/env node
/* Copies only the files the live site needs into public/ (what Vercel serves).
   Keeps scripts/, docs/, package.json and dotfiles off the public site.
   Run after generate-config.js:  npm run build                               */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public");
const INCLUDE = ["index.html", "pages", "assets"];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const item of INCLUDE) {
  const from = path.join(ROOT, item);
  if (!fs.existsSync(from)) { console.error("ERROR missing " + item); process.exit(1); }
  fs.cpSync(from, path.join(OUT, item), { recursive: true });
}

if (!fs.existsSync(path.join(OUT, "assets", "js", "config.js"))) {
  console.error("ERROR config.js missing; run generate-config.js first");
  process.exit(1);
}
console.log("public/ ready: " + INCLUDE.join(", "));
