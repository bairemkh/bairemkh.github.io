import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { STR, PROJ_TR, ROOM_HTML, LANGS } from "./i18n.js";

// ---------------------------------------------------------------------------
// Content (all facts from the resumes)
// ---------------------------------------------------------------------------
const PROJECTS = [
  { id: "uniworld", accent: "#ff6a3d", splash: { grad: ["#ff6a3d", "#ffe3d6"], logo: "img/projects/unimatch-src.png", whiteOnly: true, size: 300 }, name: "Unimatch", yr: [2025, 2026], status: "On Google Play, iOS in App Store review",
    quip: "A dating app where everyone has exams.", img: "img/uniworld.svg", color: "#65b8a2",
    desc: "A dating and social app made only for students, with matchmaking and real-time messaging over WebSockets, plus a secure system to protect user data with JWT, encryption and limited response data.",
    role: "Mobile and backend engineer. Android, iOS and Flutter clients, Node.js and MongoDB backend.",
    tags: ["Flutter", "Kotlin", "Jetpack Compose", "SwiftUI", "Node.js", "MongoDB", "WebSockets", "Clean Architecture"] },
  { id: "najahni", accent: "#5b4fd8", splash: { bg: "#ffffff", logo: "img/projects/najahni.png", size: 440 }, name: "Najahni", yr: [2025, 2026], status: "",
    quip: "Homework, but the app does the grading.", img: "img/najahni.svg", color: "#ef8a80",
    desc: "A native education app for students and teachers: course creation, AI-generated quizzes, real-time chat, online payment and certificates issued with a QR code.",
    role: "Mobile engineer. Native Android and iOS.",
    tags: ["Kotlin", "Jetpack Compose", "SwiftUI", "Retrofit", "Coroutines", "Clean Architecture"] },
  { id: "onepass", accent: "#2f7cf6", splash: { bg: "#0b3fa0", keyhole: true, word: "OnePass" }, name: "OnePass", yr: [2025], status: "",
    quip: "Your passwords, minus the sticky notes.", img: "img/onepass.svg", color: "#cae1e2",
    desc: "A secure vault for passwords and personal data, with encryption, secure local storage, careful session handling and JWT-authenticated calls to a Spring Boot backend.",
    role: "Mobile and backend engineer. Flutter app and Spring Boot API.",
    tags: ["Flutter", "Spring Boot", "REST", "JWT", "Secure Storage", "MVVM"] },
  { id: "crowdup", accent: "#e8365d", splash: { bg: "#e8365d", letter: "C", word: "CrowdUp" }, name: "CrowdUp", yr: [2023], status: "",
    quip: "For people whose calendar is mostly parties.", img: "img/crowdup.svg", color: "#c2413b",
    desc: "A cross-platform social app for event lovers: create and share events, reserve a spot, chat in real time and get in with a QR-code ticket, on a Spring Boot REST API documented with Swagger.",
    role: "Mobile and backend engineer in a cross-functional Scrum team.",
    tags: ["Flutter", "Java", "Spring Boot", "WebSocket", "QR Code", "Swagger", "MVVM", "Scrum"] },
  { id: "codemagician", accent: "#9b4ff0", splash: { bg: "#000000", logo: "img/projects/codemagician.png", halo: "#efe6fb", size: 400 }, name: "Code Magician", yr: [2022], status: "",
    quip: "Draw a class diagram, get a backend.", img: "img/codemagician.svg", color: "#f2e8e2",
    desc: "A desktop app that reads class diagram images or PDFs and generates a working Node.js backend project, saving developers hours of setup. Selected among the top projects out of 245 at my university.",
    role: "Engineer. Desktop app and Node.js code generator.",
    tags: ["Flutter", "Node.js", "Express", "MongoDB", "Python", "Swagger"] },
  { id: "togtog", accent: "#1f8a8c", splash: { bg: "corner", logo: "img/projects/togtog.png", size: 440 }, name: "TogTog Marketplace", yr: [2022], status: "",
    quip: "Try it on before you regret it.", img: "img/togtog.svg", color: "#2a7779",
    desc: "An AI-powered clothing marketplace that lets shoppers try outfits on virtually before buying, to build confidence and cut returns. Built with the TogTog.io team in Bangkok.",
    role: "Mobile development team lead. Kotlin app and Node.js backend.",
    tags: ["Kotlin", "Node.js", "Express", "MongoDB", "Jira"] },
];
const ROOMS = ["Who I am", "Experience", "Skills", "Projects", "Education", "Contact"];
const SLUGS = ["about", "experience", "skills", "projects", "education", "contact"];
const SPACING = 22;
const C = { bg: "#0b1516", ink: "#0e1b1c", teal: "#1c5d5f", sage: "#65b8a2", lake: "#2a7779", red: "#c2413b",
  redSoft: "#ef8a80", mint: "#e4f0f1", foam: "#cae1e2", blush: "#f2e8e2", dim: "#a2cbcd", paper: "#f2f8f7" };

// ---------------------------------------------------------------------------
// DOM and language
// ---------------------------------------------------------------------------
const $ = (s) => document.querySelector(s);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lang = (() => {
  const q = new URLSearchParams(location.search).get("lang");
  let saved = null; try { saved = localStorage.getItem("lang"); } catch {}
  return LANGS.includes(q) ? q : LANGS.includes(saved) ? saved : "en";
})();
const L = (k) => STR[lang][k] ?? STR.en[k];
const roomName = (i) => L("rooms")[i];
const years = (p) => p.yr.join(` ${L("to")} `);
const ptr8 = (p, k) => PROJ_TR[lang]?.[p.id]?.[k] ?? p[k];

// English panel content is the source; other languages come from i18n.js with shared lists filled in
const EN_HTML = [...document.querySelectorAll(".room")].map((s) => s.innerHTML);
const FRAG = (() => {
  const r2 = document.querySelector('.room[data-room="2"]'), r4 = document.querySelector('.room[data-room="4"]');
  const f = {};
  r2.querySelectorAll(".logos").forEach((el, i) => { f["LOGOS" + i] = el.outerHTML; });
  r2.querySelectorAll(".chips").forEach((el, i) => { f["CHIPS" + i] = el.outerHTML; });
  f.COURSE = r4.querySelector(".chips").outerHTML;
  return f;
})();

function renderProjects() {
  const list = $("#proj-list"); if (!list) return;
  list.innerHTML = "";
  PROJECTS.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "proj"; b.type = "button";
    b.style.setProperty("--accent", p.accent);
    b.innerHTML = `<img src="${p.splashURL || p.img}" alt=""><div><b>${p.name}</b><span>${years(p)}</span></div>`;
    b.addEventListener("click", () => openProject(i));
    list.appendChild(b);
  });
}

const modal = $("#modal");
let openIdx = -1;
function openProject(i) {
  const p = PROJECTS[i]; openIdx = i;
  const status = ptr8(p, "status");
  $("#m-img").src = p.splashURL || p.img; $("#m-img").alt = `${p.splashURL ? L("shotOf") : L("sketchOf")} ${p.name}`;
  $(".modal-card").style.setProperty("--accent", p.accent);
  $("#m-meta").textContent = status ? `${years(p)} · ${status}` : years(p);
  $("#m-title").textContent = p.name; $("#m-quip").textContent = ptr8(p, "quip");
  $("#m-desc").textContent = ptr8(p, "desc"); $("#m-role").textContent = ptr8(p, "role");
  $("#m-tags").innerHTML = p.tags.map((t) => `<li>${t}</li>`).join("");
  modal.hidden = false; $("#m-close").focus();
}
const closeModal = () => { modal.hidden = true; openIdx = -1; };
$("#m-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

document.addEventListener("submit", (e) => {
  if (e.target.id !== "contact") return;
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `${f.get("topic")} | ${f.get("name")}`;
  const body = `${f.get("message")}\n\n${f.get("name")}\n${f.get("email")}`;
  window.location.href = `mailto:bairemkh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Applies the language to every piece of HTML; the 3D labels are redrawn by relabel3D()
function applyLanguage() {
  const html = document.documentElement;
  html.lang = lang; html.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = L("title");
  document.querySelector('meta[name="description"]').content = L("desc");
  $("#world").setAttribute("aria-label", L("canvas"));
  document.querySelectorAll(".room").forEach((s, i) => {
    const src = lang === "en" ? EN_HTML[i] : ROOM_HTML[lang][i].replace(/%(\w+)%/g, (_, k) => FRAG[k] ?? "");
    s.innerHTML = src;
  });
  $("#year").textContent = new Date().getFullYear();
  renderProjects();
  document.querySelectorAll(".floor-map [data-go]").forEach((b) => { b.innerHTML = `<span>0${b.dataset.go}</span>${roomName(Number(b.dataset.go))}`; });
  $(".floor-map").setAttribute("aria-label", L("floorAria"));
  $(".lang-switch").setAttribute("aria-label", L("langAria"));
  document.querySelectorAll(".lang-switch [data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  $("#prev").setAttribute("aria-label", L("prev")); $("#next").setAttribute("aria-label", L("next"));
  // arrows follow reading direction
  $("#prev").innerHTML = lang === "ar" ? "&rarr;" : "&larr;"; $("#next").innerHTML = lang === "ar" ? "&larr;" : "&rarr;";
  $("#m-role-label").textContent = L("role"); $("#m-close").setAttribute("aria-label", L("close"));
  $("#sheet-toggle").textContent = document.body.classList.contains("sheet-open") ? L("showRoom") : L("readMore");
  if (openIdx >= 0) openProject(openIdx);
}
applyLanguage();

// Arabic web fonts are only fetched when Arabic is used; canvas text needs them loaded before drawing
function fontsReady() {
  const wait = [document.fonts.ready];
  if (lang === "ar") ["400 40px 'Noto Kufi Arabic'", "700 40px 'Noto Kufi Arabic'", "400 40px 'IBM Plex Sans Arabic'", "500 40px 'IBM Plex Sans Arabic'"].forEach((f) => wait.push(document.fonts.load(f, "عربي")));
  return Promise.race([Promise.all(wait), new Promise((r) => setTimeout(r, 2500))]);
}
document.querySelectorAll(".lang-switch [data-lang]").forEach((b) => b.addEventListener("click", async () => {
  if (b.dataset.lang === lang) return;
  lang = b.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch {}
  applyLanguage();
  go(current);
  await fontsReady();
  relabel3D();
}));

// ---------------------------------------------------------------------------
// Canvas helpers and procedural textures
// ---------------------------------------------------------------------------
let seed = 11;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function tex(w, h, draw, { repeat = null, srgb = true } = {}) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}
// Textures that carry translatable text: redrawn in place when the language changes
const LIVE = [];
function ltex(w, h, draw, opts) { const t = tex(w, h, draw, opts); LIVE.push({ t, draw }); return t; }
function relabel3D() {
  for (const { t, draw } of LIVE) {
    const c = t.image, g = c.getContext("2d");
    g.clearRect(0, 0, c.width, c.height); draw(g, c.width, c.height); t.userData.after?.(g); t.needsUpdate = true;
  }
}
const rr = (g, x, y, w, h, r, fill) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = fill; g.fill(); };
const AR = /[\u0600-\u06FF]/;
const text = (g, s, x, y, font, color, align = "left") => { g.font = font; g.fillStyle = color; g.direction = AR.test(s) ? "rtl" : "ltr"; g.textAlign = align; g.fillText(s, x, y); };
const serif = (px, w = 400, it = "") => `${it} ${w} ${px}px 'Source Serif 4', 'Noto Kufi Arabic', Georgia, serif`;
const mono = (px, w = 500) => `${w} ${px}px 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace`;
const sans = (px, w = 500) => `${w} ${px}px 'DM Sans', 'IBM Plex Sans Arabic', sans-serif`;
// Screens are unlit; slightly over 1.0 keeps them crisp after tone mapping and gives a faint glow
const screenMat = (t) => { const m = new THREE.MeshBasicMaterial({ map: t }); m.color.setScalar(1.2); return m; };
const glow = (hex, k = 4) => { const m = new THREE.MeshBasicMaterial({ color: hex }); m.color.multiplyScalar(k); return m; };

const T = {
  terrazzo: () => tex(1024, 1024, (g, w, h) => {
    g.fillStyle = "#172223"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) {
      g.fillStyle = ["#223031", "#0f1819", "#2d3d3e", "#1b2829", "#3e5253"][Math.floor(rand() * 5)];
      g.globalAlpha = 0.5 + rand() * 0.5; g.beginPath(); g.arc(rand() * w, rand() * h, rand() * 2.6 + 0.4, 0, 7); g.fill();
    }
    for (let i = 0; i < 220; i++) {
      g.fillStyle = rand() > 0.8 ? "#c2413b" : "#65b8a2"; g.globalAlpha = 0.35;
      g.beginPath(); g.arc(rand() * w, rand() * h, rand() * 2 + 1, 0, 7); g.fill();
    }
    g.globalAlpha = 1; g.strokeStyle = "#0a1213"; g.lineWidth = 3; g.strokeRect(0, 0, w, h);
  }, { repeat: [43, 15] }),
  slats: () => tex(512, 512, (g, w, h) => {
    for (let x = 0; x < w; x += 32) {
      g.fillStyle = (x / 32) % 2 ? "#1a2a2b" : "#162425"; g.fillRect(x, 0, 28, h);
      for (let k = 0; k < 6; k++) { g.fillStyle = "rgba(255,255,255,0.025)"; g.fillRect(x + rand() * 26, 0, 1, h); }
      g.fillStyle = "#081012"; g.fillRect(x + 28, 0, 4, h);
    }
  }, { repeat: [86, 1] }),
  ceiling: () => tex(512, 512, (g, w, h) => {
    g.fillStyle = "#121d1e"; g.fillRect(0, 0, w, h);
    g.strokeStyle = "#1d2c2d"; g.lineWidth = 4;
    for (let i = 0; i <= w; i += 128) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); }
    for (let i = 0; i < 3000; i++) { g.fillStyle = "rgba(0,0,0,0.15)"; g.fillRect(rand() * w, rand() * h, 2, 2); }
  }, { repeat: [43, 15] }),
  wood: () => tex(1024, 256, (g, w, h) => {
    g.fillStyle = "#5a3a2a"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 140; i++) {
      const y = rand() * h, amp = 2 + rand() * 6, f = 0.004 + rand() * 0.01;
      g.strokeStyle = rand() > 0.5 ? "rgba(30,15,8,0.35)" : "rgba(140,95,60,0.25)"; g.lineWidth = 0.6 + rand() * 1.8;
      g.beginPath(); for (let x = 0; x <= w; x += 8) g.lineTo(x, y + Math.sin(x * f + i) * amp); g.stroke();
    }
  }),
  fabric: () => tex(256, 256, (g, w, h) => {
    g.fillStyle = "#d8d8d8"; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) { g.fillStyle = `rgba(0,0,0,${0.05 + rand() * 0.06})`; g.fillRect(0, y, w, 1); }
    for (let x = 0; x < w; x += 3) { g.fillStyle = `rgba(255,255,255,${0.04 + rand() * 0.05})`; g.fillRect(x, 0, 1, h); }
  }, { repeat: [2, 2] }),
  stone: () => tex(1024, 512, (g, w, h) => {
    g.fillStyle = "#1e2829"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 4000; i++) { g.fillStyle = `rgba(255,255,255,${rand() * 0.04})`; g.fillRect(rand() * w, rand() * h, 2, 2); }
    for (let v = 0; v < 7; v++) {
      g.strokeStyle = `rgba(220,235,235,${0.08 + rand() * 0.12})`; g.lineWidth = 0.8 + rand() * 1.5;
      g.beginPath(); let x = rand() * w, y = 0; g.moveTo(x, y);
      while (y < h) { x += (rand() - 0.5) * 60; y += 20 + rand() * 30; g.lineTo(x, y); } g.stroke();
    }
  }),
  frosted: () => tex(1024, 512, (g, w) => {
    g.fillStyle = "rgba(202,225,226,0.07)"; g.fillRect(0, 0, w, 512);
    // frosted manifestation band at eye level, like real office glass
    g.fillStyle = "rgba(228,240,241,0.28)"; g.fillRect(0, 350, w, 44);
    g.fillStyle = "rgba(228,240,241,0.35)";
    for (let x = 6; x < w; x += 14) { g.fillRect(x, 334, 6, 6); g.fillRect(x, 404, 6, 6); }
  }),
};

function phoneScreen(title, sub, color, draw) {
  return ltex(600, 1260, (g, W, H) => {
    g.save(); g.beginPath(); g.roundRect(0, 0, W, H, 84); g.clip();
    g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
    text(g, "9:41", 60, 76, sans(30, 600), C.mint);
    rr(g, 470, 54, 64, 28, 8, C.mint); rr(g, 474, 58, 44, 20, 5, C.bg);
    text(g, (typeof sub === "function" ? sub() : sub).toUpperCase(), 52, 210, mono(24), C.dim);
    text(g, title, 50, 290, serif(title.length > 12 ? 58 : 84), C.mint);
    rr(g, 50, 340, 500, 300, 32, color);
    draw?.(g);
    for (let i = 0; i < 3; i++) {
      rr(g, 50, 680 + i * 160, 500, 136, 28, "#13282a");
      rr(g, 76, 708 + i * 160, 80, 80, 20, [C.sage, C.redSoft, C.foam][i]);
      rr(g, 182, 722 + i * 160, 240 - i * 40, 20, 10, C.mint);
      rr(g, 182, 760 + i * 160, 300 - i * 50, 16, 8, C.dim);
    }
    rr(g, 200, H - 40, 200, 10, 5, C.mint);
    g.restore();
  });
}
function codeTex(title, lines, accent = C.sage) {
  return tex(1100, 650, (c, w, h) => {
    rr(c, 0, 0, w, h, 20, "#0a1213");
    rr(c, 0, 0, w, 72, 20, "#122021"); c.fillStyle = "#122021"; c.fillRect(0, 40, w, 32);
    [C.redSoft, C.sage, C.foam].forEach((col, i) => { c.beginPath(); c.arc(40 + i * 34, 36, 10, 0, 7); c.fillStyle = col; c.fill(); });
    text(c, title, 160, 46, mono(26), C.dim);
    lines.forEach(([s, col, ind], i) => {
      text(c, String(i + 1), 22, 130 + i * 50, mono(22, 400), "#3b5153");
      text(c, s, 70 + (ind || 0) * 30, 130 + i * 50, mono(25, 400), col);
    });
    c.fillStyle = accent; c.fillRect(0, h - 6, w, 6);
  });
}

// ---------------------------------------------------------------------------
// Renderer, scene, camera, post-processing
// ---------------------------------------------------------------------------
const canvas = $("#world");
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
} catch {
  // no WebGL: show a plain message in the visitor's language
  const box = document.createElement("p"); box.className = "no-webgl glass"; box.textContent = L("noWebgl"); document.body.appendChild(box);
  throw new Error("WebGL unavailable");
}
const isNarrow = () => window.innerWidth < 860;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isNarrow() ? 1.5 : 1.75));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(C.bg);
scene.fog = new THREE.Fog(C.bg, 24, 62);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.5, 1.3);
composer.addPass(bloom);
composer.addPass(new OutputPass());

// Normal maps generated from simple height drawings: grout, slat grooves, wood grain, weave, stone pits
function normalTex(w, h, drawHeight, strength = 2, repeat = null) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); g.fillStyle = "#808080"; g.fillRect(0, 0, w, h); drawHeight(g, w, h);
  const src = g.getImageData(0, 0, w, h).data, out = g.createImageData(w, h), d = out.data;
  const Hh = (x, y) => src[((((y + h) % h) * w) + ((x + w) % w)) * 4] / 255;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const nx = (Hh(x - 1, y) - Hh(x + 1, y)) * strength, ny = (Hh(x, y + 1) - Hh(x, y - 1)) * strength, l = Math.hypot(nx, ny, 1);
    const i = (y * w + x) * 4; d[i] = (nx / l * 0.5 + 0.5) * 255; d[i + 1] = (ny / l * 0.5 + 0.5) * 255; d[i + 2] = (1 / l * 0.5 + 0.5) * 255; d[i + 3] = 255;
  }
  g.putImageData(out, 0, 0);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}
const N = {
  floor: normalTex(512, 512, (g, w, h) => {
    for (let i = 0; i < 5000; i++) { g.fillStyle = `rgba(255,255,255,${rand() * 0.12})`; g.fillRect(rand() * w, rand() * h, 2, 2); }
    g.fillStyle = "#202020"; g.fillRect(0, 0, w, 3); g.fillRect(0, 0, 3, h);
  }, 3, [43, 15]),
  slats: normalTex(256, 64, (g, w, h) => {
    for (let x = 0; x < w; x += 16) { g.fillStyle = "#c8c8c8"; g.fillRect(x + 1, 0, 13, h); g.fillStyle = "#a8a8a8"; g.fillRect(x + 1, 0, 2, h); g.fillRect(x + 12, 0, 2, h); g.fillStyle = "#101010"; g.fillRect(x + 14, 0, 2, h); }
  }, 4, [86 * 2, 1]),
  wood: normalTex(512, 128, (g, w, h) => {
    for (let i = 0; i < 90; i++) { const y = rand() * h; g.strokeStyle = `rgba(0,0,0,${0.15 + rand() * 0.25})`; g.lineWidth = 1; g.beginPath(); for (let x = 0; x <= w; x += 8) g.lineTo(x, y + Math.sin(x * 0.01 + i) * 3); g.stroke(); }
  }, 1.5),
  fabric: normalTex(128, 128, (g, w, h) => {
    for (let y = 0; y < h; y += 4) for (let x = 0; x < w; x += 4) { g.fillStyle = ((x + y) / 4) % 2 ? "#b0b0b0" : "#585858"; g.fillRect(x, y, 4, 4); }
  }, 2.5, [6, 6]),
  stone: normalTex(256, 256, (g, w, h) => {
    for (let i = 0; i < 2500; i++) { g.fillStyle = rand() > 0.5 ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.2)"; g.beginPath(); g.arc(rand() * w, rand() * h, rand() * 1.8 + 0.4, 0, 7); g.fill(); }
  }, 2),
};
const fabricTex = T.fabric();
const M = {
  floor: new THREE.MeshStandardMaterial({ map: T.terrazzo(), normalMap: N.floor, normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.62, metalness: 0, envMapIntensity: 0.35 }),
  wall: new THREE.MeshStandardMaterial({ map: T.slats(), normalMap: N.slats, normalScale: new THREE.Vector2(0.9, 0.9), roughness: 0.88, envMapIntensity: 0.25 }),
  plain: new THREE.MeshStandardMaterial({ color: 0x142324, roughness: 0.95, envMapIntensity: 0.2 }),
  ceil: new THREE.MeshStandardMaterial({ map: T.ceiling(), roughness: 1, envMapIntensity: 0.2 }),
  glass: new THREE.MeshPhysicalMaterial({ map: T.frosted(), transparent: true, roughness: 0.15, metalness: 0, side: THREE.DoubleSide, depthWrite: false, envMapIntensity: 0.4 }),
  metal: new THREE.MeshStandardMaterial({ color: 0xa9b6b7, metalness: 0.75, roughness: 0.45, envMapIntensity: 0.6 }),
  darkMetal: new THREE.MeshStandardMaterial({ color: 0x2c3a3c, metalness: 0.55, roughness: 0.58, envMapIntensity: 0.45 }),
  wood: new THREE.MeshStandardMaterial({ map: T.wood(), normalMap: N.wood, normalScale: new THREE.Vector2(0.6, 0.6), roughness: 0.62, envMapIntensity: 0.4 }),
  stone: new THREE.MeshStandardMaterial({ map: T.stone(), normalMap: N.stone, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.58, envMapIntensity: 0.4 }),
  tealFabric: new THREE.MeshStandardMaterial({ map: fabricTex, normalMap: N.fabric, color: 0x1f6466, roughness: 0.95, envMapIntensity: 0.25 }),
  redFabric: new THREE.MeshStandardMaterial({ map: fabricTex, normalMap: N.fabric, color: 0xb23a35, roughness: 0.95, envMapIntensity: 0.25 }),
  red: new THREE.MeshStandardMaterial({ color: 0xc2413b, roughness: 0.5, envMapIntensity: 0.45 }),
  ceramic: new THREE.MeshStandardMaterial({ color: 0xe4ece9, roughness: 0.55, envMapIntensity: 0.4 }),
  black: new THREE.MeshStandardMaterial({ color: 0x0b1112, roughness: 0.45, envMapIntensity: 0.4 }),
  strip: glow(0xf2f8f7, 2.6),
  redGlow: glow(0xef8a80, 2.6),
  tealGlow: glow(0x65b8a2, 2.6),
  warmGlow: glow(0xffe2c4, 3.2),
  hidden: new THREE.MeshBasicMaterial({ visible: false }),
};

const add = (parent, geo, mat, x = 0, y = 0, z = 0, ry = 0) => {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; parent.add(m); return m;
};
const box = (w, h, d, r = 0.04) => r ? new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001)) : new THREE.BoxGeometry(w, h, d);
const clickables = [];
const ROOMG = []; // one group per room
const animated = [];
const noShadow = (m) => { m.userData.noShadow = true; return m; };

// ---------------------------------------------------------------------------
// Building shell
// ---------------------------------------------------------------------------
const H = 5.2, DEPTH = 16;
const totalW = SPACING * ROOMS.length;
const midX = (totalW - SPACING) / 2;
const floor = add(scene, new THREE.PlaneGeometry(totalW + 40, 60), M.floor, midX, 0, 0);
floor.rotation.x = -Math.PI / 2;
const ceiling = noShadow(add(scene, new THREE.PlaneGeometry(totalW + 40, 60), M.ceil, midX, H, 0));
ceiling.rotation.x = Math.PI / 2;
noShadow(add(scene, new THREE.PlaneGeometry(totalW + 40, H), M.wall, midX, H / 2, -DEPTH / 2));
[-SPACING / 2, totalW - SPACING / 2].forEach((x) => noShadow(add(scene, new THREE.PlaneGeometry(DEPTH + 30, H), M.plain, x, H / 2, 0, x < 0 ? Math.PI / 2 : -Math.PI / 2)));

ROOMS.forEach((name, i) => {
  const x = i * SPACING;
  // recessed ceiling light lines with a housing
  for (let k = -1; k <= 1; k++) {
    noShadow(add(scene, box(SPACING - 7, 0.06, 0.22, 0), M.darkMetal, x, H - 0.03, -4 + k * 3.2));
    noShadow(add(scene, box(SPACING - 7.2, 0.02, 0.12, 0), M.strip, x, H - 0.065, -4 + k * 3.2));
  }
  // glass partition on the right, with mullions, a floor rail and a door gap at the front
  if (i < ROOMS.length - 1) {
    const px = x + SPACING / 2, len = DEPTH - 6, cz = -DEPTH / 2 + len / 2;
    noShadow(add(scene, new THREE.PlaneGeometry(len, H), M.glass, px, H / 2, cz, Math.PI / 2)).renderOrder = 1;
    for (let k = 0; k <= 4; k++) noShadow(add(scene, box(0.07, H, 0.07, 0), M.darkMetal, px, H / 2, -DEPTH / 2 + (len / 4) * k));
    noShadow(add(scene, box(0.1, 0.08, len, 0), M.darkMetal, px, 0.04, cz));
  }
  // wall-mounted room sign
  if (i > 0) {
    const sign = ltex(1024, 160, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, "#0c1617");
      c.fillStyle = i % 2 ? C.red : C.sage; c.fillRect(0, 0, 10, h);
      text(c, `0${i}`, 44, 104, mono(56, 600), i % 2 ? C.redSoft : C.sage);
      const nm = roomName(i).toUpperCase(); text(c, nm, 150, 102, mono(nm.length > 18 ? 42 : 48), C.mint);
    });
    add(scene, new THREE.PlaneGeometry(4.2, 0.66), screenMat(sign), x + 6.4, 4.55, -DEPTH / 2 + 0.03);
  }
  noShadow(add(scene, box(SPACING - 2, 0.03, 0.03, 0), i % 2 ? M.redGlow : M.tealGlow, x, 0.05, -DEPTH / 2 + 0.06));
});

// Lights. One shadow-casting key light follows the room being viewed.
scene.add(new THREE.HemisphereLight(0xcae1e2, 0x1c3537, 0.8));
const sun = new THREE.DirectionalLight(0xfff4ea, 1.6);
sun.castShadow = true;
sun.shadow.mapSize.setScalar(isNarrow() ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -13, right: 13, top: 10, bottom: -10, near: 1, far: 40 });
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
scene.add(sun, sun.target);
// One room light that travels with the visitor: every extra light makes every lit surface more expensive
const roomLight = new THREE.PointLight(0xffeee6, 18, 16, 1.8); roomLight.position.set(0, H - 0.7, -3); scene.add(roomLight);

// Dust floating in the light
{
  const n = 900, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { pos[i * 3] = -10 + rand() * totalW; pos[i * 3 + 1] = rand() * H; pos[i * 3 + 2] = -8 + rand() * 14; }
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xcae1e2, size: 0.025, transparent: true, opacity: 0.45, depthWrite: false }));
  scene.add(dust);
  animated.push((t) => { dust.position.y = Math.sin(t * 0.15) * 0.15; });
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
const leafA = new THREE.MeshStandardMaterial({ color: 0x2f7a5f, roughness: 0.6, side: THREE.DoubleSide });
const leafB = new THREE.MeshStandardMaterial({ color: 0x3f9474, roughness: 0.6, side: THREE.DoubleSide });
const leafGeo = new THREE.SphereGeometry(0.22, 12, 8); leafGeo.scale(0.45, 1.3, 0.12);
const potGeo = new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.24, 0), new THREE.Vector2(0.36, 0.05), new THREE.Vector2(0.38, 0.7), new THREE.Vector2(0.34, 0.72)], 40);
function plant(parent, x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); parent.add(g);
  add(g, potGeo, M.ceramic);
  add(g, new THREE.CylinderGeometry(0.33, 0.33, 0.02, 32), new THREE.MeshStandardMaterial({ color: 0x2a1d16 }), 0, 0.68, 0);
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2 + rand() * 0.4, tilt = 0.35 + rand() * 0.55, len = 0.7 + rand() * 0.6;
    const stem = new THREE.Group(); stem.position.set(0, 0.7, 0); stem.rotation.set(0, a, tilt); g.add(stem);
    add(stem, new THREE.CylinderGeometry(0.008, 0.012, len, 5), leafA, 0, len / 2, 0);
    add(stem, leafGeo, k % 2 ? leafA : leafB, 0, len + 0.15, 0).rotation.z = 0.3;
  }
}
function makePhone(screenTex, color = 0x1c5d5f) {
  const g = new THREE.Group();
  const PW = 1.15, PH = 2.35, PD = 0.15;
  add(g, new RoundedBoxGeometry(PW, PH, PD, 8, 0.18), new THREE.MeshStandardMaterial({ color: 0x8e9ea0, metalness: 0.7, roughness: 0.45, envMapIntensity: 0.6 }));
  add(g, new RoundedBoxGeometry(PW - 0.03, PH - 0.03, 0.02, 6, 0.009), new THREE.MeshPhysicalMaterial({ color, roughness: 0.4, clearcoat: 0.3, clearcoatRoughness: 0.4, envMapIntensity: 0.5 }), 0, 0, -PD / 2 - 0.004);
  add(g, new RoundedBoxGeometry(PW - 0.03, PH - 0.03, 0.02, 6, 0.009), M.black, 0, 0, PD / 2 + 0.004);
  add(g, new THREE.PlaneGeometry(PW - 0.1, (PW - 0.1) * 2.1), screenMat(screenTex), 0, 0, PD / 2 + 0.016);
  noShadow(add(g, new THREE.PlaneGeometry(PW - 0.06, PH - 0.06), new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.06, roughness: 0.2, depthWrite: false }), 0, 0, PD / 2 + 0.02));
  const island = add(g, new THREE.CapsuleGeometry(0.045, 0.2, 4, 12), M.black, 0, PH / 2 - 0.16, PD / 2 + 0.024);
  island.rotation.z = Math.PI / 2;
  const bump = add(g, new RoundedBoxGeometry(0.5, 0.5, 0.05, 4, 0.024), new THREE.MeshPhysicalMaterial({ color, roughness: 0.15, clearcoat: 1 }), PW / 2 - 0.31, PH / 2 - 0.31, -PD / 2 - 0.03);
  [[-0.1, 0.1], [-0.1, -0.1], [0.1, 0]].forEach(([dx, dy]) => {
    const ring = add(g, new THREE.CylinderGeometry(0.085, 0.085, 0.05, 24), M.metal, bump.position.x + dx, bump.position.y + dy, bump.position.z - 0.025);
    ring.rotation.x = Math.PI / 2;
    const lens = add(g, new THREE.CylinderGeometry(0.065, 0.065, 0.052, 24), M.black, bump.position.x + dx, bump.position.y + dy, bump.position.z - 0.026);
    lens.rotation.x = Math.PI / 2;
  });
  [[PW / 2 + 0.01, 0.5, 0.35], [-PW / 2 - 0.01, 0.6, 0.18], [-PW / 2 - 0.01, 0.3, 0.25]].forEach(([bx, by, bh]) => add(g, box(0.03, bh, 0.06, 0.01), M.metal, bx, by, 0));
  return g;
}
function chair(parent, x, z, ry, fabric) {
  const ch = new THREE.Group(); ch.position.set(x, 0, z); ch.rotation.y = ry; parent.add(ch);
  add(ch, box(0.62, 0.12, 0.6, 0.05), fabric, 0, 0.5, 0);
  add(ch, box(0.62, 0.72, 0.1, 0.045), fabric, 0, 0.92, 0.28).rotation.x = -0.1;
  add(ch, new THREE.CylinderGeometry(0.035, 0.035, 0.42, 12), M.metal, 0, 0.25, 0);
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2;
    add(ch, box(0.32, 0.03, 0.05, 0), M.darkMetal, Math.cos(a) * 0.16, 0.04, -Math.sin(a) * 0.16).rotation.y = a;
  }
  return ch;
}
function desk(parent, x, z, ry = 0, w = 2.6) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; parent.add(g);
  add(g, box(w, 0.06, 1.15, 0.02), M.wood, 0, 0.76, 0);
  [-1, 1].forEach((s) => {
    add(g, box(0.06, 0.73, 0.06, 0), M.darkMetal, s * (w / 2 - 0.12), 0.365, -0.45);
    add(g, box(0.06, 0.73, 0.06, 0), M.darkMetal, s * (w / 2 - 0.12), 0.365, 0.45);
    add(g, box(0.06, 0.04, 0.96, 0), M.darkMetal, s * (w / 2 - 0.12), 0.7, 0);
  });
  chair(g, 0, 1.0, 0, M.tealFabric);
  return g;
}
function monitor(parent, x, y, z, ry, t, w = 1.1, h = 0.62) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; parent.add(g);
  add(g, box(w + 0.05, h + 0.05, 0.035, 0.015), M.black);
  add(g, new THREE.PlaneGeometry(w, h), screenMat(t), 0, 0, 0.019);
  add(g, box(0.05, y - 0.79 - h / 2 + 0.02, 0.04, 0), M.metal, 0, -(y - 0.79 + h / 2) / 2 + 0.01, -0.05);
  add(g, box(0.32, 0.015, 0.2, 0.005), M.metal, 0, -(y - 0.79) + 0.008, -0.05);
  return g;
}
function pendant(parent, x, z, len = 1.2) {
  const g = new THREE.Group(); g.position.set(x, H, z); parent.add(g);
  noShadow(add(g, new THREE.CylinderGeometry(0.006, 0.006, len, 6), M.black, 0, -len / 2, 0));
  noShadow(add(g, new THREE.CylinderGeometry(0.08, 0.32, 0.28, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: 0x1c5d5f, metalness: 0.5, roughness: 0.3, side: THREE.DoubleSide }), 0, -len - 0.14, 0));
  noShadow(add(g, new THREE.CircleGeometry(0.29, 32), M.warmGlow, 0, -len - 0.27, 0)).rotation.x = Math.PI / 2;
}
function wallScreen(parent, t, x, y, w, h) {
  add(parent, box(w + 0.2, h + 0.2, 0.08, 0.04), M.black, x, y, -DEPTH / 2 + 0.1);
  add(parent, new THREE.PlaneGeometry(w, h), screenMat(t), x, y, -DEPTH / 2 + 0.145);
  noShadow(add(parent, box(w * 0.9, 0.02, 0.02, 0), M.tealGlow, x, y - h / 2 - 0.12, -DEPTH / 2 + 0.16));
}

// ---------------------------------------------------------------------------
// Room 0: Lobby
// ---------------------------------------------------------------------------
// Logo tiles: a tinted glass body with a glowing brand-colour rim and a white face card carrying the logo.
// If the logo file is missing, a wordmark is drawn instead.
const BRAND = { flutter: 0x02569b, kotlin: 0x7f52ff, swift: 0xf05138, jetpackcompose: 0x4285f4, dart: 0x0175c2, android: 0x3ddc84,
  nodejs: 0x5fa04e, spring: 0x6db33f, mongodb: 0x47a248, express: 0xcae1e2, socketio: 0xcae1e2, java: 0xe76f00, appaxis: 0x65b8a2, togtog: 0xc2413b };
function logoTexture(src, fallback) {
  const S = 1024;
  const t = tex(S, S, () => {});
  const draw = (im) => {
    const g = t.image.getContext("2d");
    g.clearRect(0, 0, S, S);
    if (im) { const iw = im.naturalWidth || 512, ih = im.naturalHeight || 512, k = Math.min(700 / iw, 700 / ih); g.drawImage(im, S / 2 - (iw * k) / 2, S / 2 - (ih * k) / 2, iw * k, ih * k); }
    else { text(g, fallback, S / 2, S / 2 + 50, serif(fallback.length > 8 ? 150 : 200, 500), "#283338", "center"); }
    t.needsUpdate = true;
  };
  const im = new Image();
  im.onload = () => draw(im);
  im.onerror = () => draw(null);
  im.src = src;
  return t;
}
const faceMat = new THREE.MeshStandardMaterial({ color: 0xf4f8f7, roughness: 0.6, envMapIntensity: 0.3 });
function logoTile(parent, src, label, size = 0.7, key = "") {
  const brand = new THREE.Color(BRAND[key] ?? 0x65b8a2);
  const g = new THREE.Group(); parent.add(g);
  const d = size * 0.24;
  // tinted glass body
  add(g, new RoundedBoxGeometry(size, size, d, 8, size * 0.2), new THREE.MeshPhysicalMaterial({
    color: brand.clone().lerp(new THREE.Color(0x0b1516), 0.5), metalness: 0.1, roughness: 0.45, clearcoat: 0.25, clearcoatRoughness: 0.4, envMapIntensity: 0.5 }));
  // glowing rim just behind the body edge
  const rim = new THREE.MeshBasicMaterial({ color: brand.clone().multiplyScalar(2.6) });
  noShadow(add(g, new RoundedBoxGeometry(size * 1.045, size * 1.045, d * 0.35, 6, size * 0.22), rim));
  // white face cards, front and back, with the logo on top
  const lm = new THREE.MeshBasicMaterial({ map: logoTexture(src, label), transparent: true }); lm.color.setScalar(1.08);
  [1, -1].forEach((s) => {
    const card = add(g, new RoundedBoxGeometry(size * 0.8, size * 0.8, d * 0.2, 6, size * 0.14), faceMat, 0, 0, s * d * 0.48);
    void card;
    const logo = add(g, new THREE.PlaneGeometry(size * 0.8, size * 0.8), lm, 0, 0, s * (d * 0.48 + d * 0.11));
    if (s < 0) logo.rotation.y = Math.PI;
  });
  return g;
}

// Low-poly character (white tee, navy jeans, dark shoes, short dark hair, trimmed beard).
// Built from jointed faceted segments so it can sit, stand, type and present.
const LP = {
  skin: new THREE.MeshStandardMaterial({ color: 0xd4a083, roughness: 0.85, flatShading: true, envMapIntensity: 0.3 }),
  hair: new THREE.MeshStandardMaterial({ color: 0x1c1613, roughness: 0.9, flatShading: true, envMapIntensity: 0.2 }),
  tee: new THREE.MeshStandardMaterial({ color: 0xf0f2f1, roughness: 0.92, flatShading: true, envMapIntensity: 0.3 }),
  jeans: new THREE.MeshStandardMaterial({ color: 0x25384c, roughness: 0.88, flatShading: true, envMapIntensity: 0.3 }),
  shoe: new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.75, flatShading: true, envMapIntensity: 0.3 }),
  sole: new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.8, flatShading: true }),
  dark: new THREE.MeshStandardMaterial({ color: 0x101010, roughness: 0.6, flatShading: true }),
};
const limb = (rt, rb, h, mat, s = 6) => { const geo = new THREE.CylinderGeometry(rt, rb, h, s, 1); geo.translate(0, -h / 2, 0); return new THREE.Mesh(geo, mat); };
const joint = (parent, x, y, z) => { const j = new THREE.Group(); j.position.set(x, y, z); parent.add(j); return j; };
function makeCharacter() {
  const root = new THREE.Group(), J = {};
  const pelvis = add(root, new THREE.CylinderGeometry(0.15, 0.165, 0.17, 6), LP.jeans); pelvis.scale.z = 0.72;
  J.spine = joint(root, 0, 0.06, 0);
  const chest = add(J.spine, new THREE.CylinderGeometry(0.205, 0.152, 0.5, 6), LP.tee, 0, 0.25, 0); chest.scale.z = 0.62;
  add(J.spine, new THREE.CylinderGeometry(0.16, 0.205, 0.08, 6), LP.tee, 0, 0.53, 0).scale.z = 0.62;
  J.neck = joint(J.spine, 0, 0.56, 0);
  add(J.neck, new THREE.CylinderGeometry(0.05, 0.056, 0.1, 6), LP.skin, 0, 0.04, 0);
  J.head = joint(J.neck, 0, 0.09, 0.01);
  add(J.head, new THREE.IcosahedronGeometry(0.115, 1), LP.skin, 0, 0.12, 0).scale.set(0.9, 1.13, 1.0);
  add(J.head, new THREE.SphereGeometry(0.123, 7, 4, 0, Math.PI * 2, 0, Math.PI * 0.42), LP.hair, 0, 0.145, -0.008).scale.set(0.93, 1.05, 1.02);
  add(J.head, box(0.17, 0.05, 0.06, 0), LP.hair, 0, 0.215, 0.06).rotation.x = -0.3;
  add(J.head, new THREE.SphereGeometry(0.119, 7, 4, 0, Math.PI * 2, Math.PI * 0.56, Math.PI * 0.44), LP.hair, 0, 0.125, 0.006).scale.set(0.91, 1.1, 0.98);
  add(J.head, box(0.07, 0.014, 0.02, 0), LP.hair, 0, 0.088, 0.108);
  [-1, 1].forEach((s) => {
    add(J.head, box(0.024, 0.012, 0.01, 0), LP.dark, s * 0.04, 0.135, 0.106);
    add(J.head, box(0.042, 0.012, 0.012, 0), LP.hair, s * 0.042, 0.163, 0.103).rotation.z = -s * 0.1;
    add(J.head, box(0.02, 0.05, 0.035, 0), LP.skin, s * 0.104, 0.12, 0);
  });
  add(J.head, new THREE.ConeGeometry(0.02, 0.05, 4), LP.skin, 0, 0.11, 0.118).rotation.x = Math.PI / 2;
  [["L", 1], ["R", -1]].forEach(([k, s]) => {
    const sh = J["sh" + k] = joint(J.spine, s * 0.225, 0.47, 0);
    add(sh, new THREE.IcosahedronGeometry(0.068, 0), LP.tee);
    sh.add(limb(0.066, 0.058, 0.15, LP.tee));
    const up = limb(0.047, 0.042, 0.14, LP.skin); up.position.y = -0.14; sh.add(up);
    const el = J["el" + k] = joint(sh, 0, -0.28, 0);
    el.add(limb(0.042, 0.033, 0.25, LP.skin));
    const hd = J["hd" + k] = joint(el, 0, -0.25, 0);
    add(hd, box(0.055, 0.09, 0.03, 0.01), LP.skin, 0, -0.045, 0).material = LP.skin;
    const hip = J["hip" + k] = joint(root, s * 0.085, -0.04, 0);
    hip.add(limb(0.078, 0.06, 0.44, LP.jeans));
    const kn = J["kn" + k] = joint(hip, 0, -0.44, 0);
    kn.add(limb(0.06, 0.046, 0.42, LP.jeans));
    const ft = joint(kn, 0, -0.42, 0);
    add(ft, box(0.1, 0.07, 0.24, 0.02), LP.shoe, 0, -0.035, 0.05);
    add(ft, box(0.104, 0.014, 0.245, 0), LP.sole, 0, -0.072, 0.05);
  });
  root.userData.J = J;
  return root;
}
const POSES = {
  stand: { shL: [0, 0, 0.1], shR: [0, 0, -0.1], elL: [-0.15, 0, 0], elR: [-0.15, 0, 0] },
  sit: { spine: [0.12, 0, 0], hipL: [-1.57, 0, 0.06], hipR: [-1.57, 0, -0.06], knL: [1.5, 0, 0], knR: [1.62, 0, 0], shL: [-0.25, 0, 0.12], shR: [-0.25, 0, -0.12], elL: [-1.15, 0, 0], elR: [-1.15, 0, 0] },
  type: { spine: [0.18, 0, 0], hipL: [-1.57, 0, 0.05], hipR: [-1.57, 0, -0.05], knL: [1.57, 0, 0], knR: [1.57, 0, 0], shL: [-0.4, 0, 0.15], shR: [-0.4, 0, -0.15], elL: [-1.1, 0, 0], elR: [-1.1, 0, 0], head: [0.08, 0, 0] },
  present: { shL: [-0.35, 0, 1.15], shR: [0, 0, -0.1], elL: [-0.35, 0, 0], elR: [-0.15, 0, 0], head: [0, 0.35, 0] },
  welcome: { shL: [0, 0, 0.1], shR: [-0.55, 0, -0.5], elL: [-0.15, 0, 0], elR: [-0.7, 0, 0], head: [0, -0.25, 0] },
  lean: { spine: [-0.08, 0, 0], hipL: [-1.57, 0, 0.08], hipR: [-1.45, 0, -0.08], knL: [1.45, 0, 0], knR: [1.7, 0, 0], shL: [-0.25, 0, 0.12], shR: [0.55, 0, -0.25], elL: [-1.1, 0, 0], elR: [-0.1, 0, 0] },
};
function placeCharacter(parent, pose, x, y, z, ry, idle) {
  const ch = makeCharacter(), J = ch.userData.J;
  ch.position.set(x, y, z); ch.rotation.y = ry; parent.add(ch);
  Object.entries(POSES[pose]).forEach(([k, r]) => J[k].rotation.set(r[0], r[1], r[2]));
  const base = { head: J.head.rotation.clone(), shL: J.shL.rotation.clone(), elL: J.elL.rotation.clone(), elR: J.elR.rotation.clone() };
  const ph = rand() * 6;
  animated.push((t) => {
    J.spine.scale.y = 1 + Math.sin(t * 1.5 + ph) * 0.01;
    J.head.rotation.y = base.head.y + Math.sin(t * 0.35 + ph) * 0.2;
    idle?.(t, J, base);
  });
  return ch;
}

function buildLobby(x) {
  const g = new THREE.Group(); g.position.x = x; scene.add(g); ROOMG[Math.round(x / SPACING)] = g;
  const sign = ltex(2048, 640, (c, w) => {
    text(c, "BAIREM KHEDHRI", w / 2, 300, serif(220), C.mint, "center");
    text(c, L("signSub"), w / 2, 450, mono(lang === "ar" ? 64 : 56), C.sage, "center");
    c.fillStyle = C.red; c.fillRect(w / 2 - 120, 520, 240, 8);
  });
  const signMat = new THREE.MeshBasicMaterial({ map: sign, transparent: true }); signMat.color.setScalar(1.3);
  noShadow(add(g, new THREE.PlaneGeometry(4.4, 1.38), signMat, -0.15, 4.1, -DEPTH / 2 + 0.06));
  // Reception desk: stone body, walnut top, glowing kick line
  add(g, box(5.4, 1.05, 1.2, 0.06), M.stone, 0, 0.53, -3.4);
  add(g, box(5.6, 0.06, 1.35, 0.02), M.wood, 0, 1.08, -3.4);
  noShadow(add(g, box(5.2, 0.025, 0.02, 0), M.redGlow, 0, 0.08, -2.79));
  const welcome = ltex(1100, 620, (c, w, h) => { rr(c, 0, 0, w, h, 16, C.ink); text(c, L("welcome"), w / 2, 300, serif(96), C.mint, "center"); text(c, L("mind"), w / 2, 400, mono(36), C.sage, "center"); });
  monitor(g, -0.2, 1.38, -3.6, 0.1, welcome, 0.6, 0.34);
  // Floating logo ring
  const ring = add(g, new THREE.TorusGeometry(0.42, 0.05, 24, 96), M.red, -1.2, 1.78, -3.4);
  const ring2 = add(g, new THREE.TorusGeometry(0.58, 0.018, 16, 96), M.metal, -1.2, 1.78, -3.4);
  animated.push((t) => { ring.rotation.y = t * 0.8; ring2.rotation.x = t * 0.5; ring2.rotation.y = -t * 0.3; ring.position.y = ring2.position.y = 1.8 + Math.sin(t * 1.2) * 0.04; });
  [-2, 0, 2].forEach((px) => pendant(g, px, -3.4, 2.3));
  [-7.5, 7.5].forEach((px) => { add(g, new THREE.CylinderGeometry(0.38, 0.38, H, 40), M.stone, px, H / 2, -5.5); add(g, new THREE.CylinderGeometry(0.42, 0.42, 0.1, 40), M.metal, px, 0.05, -5.5); });
  // Floor-map kiosk (click to go to the executive suite)
  const map = ltex(800, 1000, (c, w) => {
    rr(c, 0, 0, w, 1000, 40, C.ink);
    text(c, L("floorMap"), 60, 100, mono(40), C.dim);
    ROOMS.forEach((_, i) => {
      const r = roomName(i);
      rr(c, 60, 150 + i * 135, 680, 110, 18, i === 0 ? C.teal : "#13282a");
      text(c, `0${i}`, 100, 220 + i * 135, mono(36), i % 2 ? C.redSoft : C.sage);
      text(c, r, 190, 222 + i * 135, serif(r.length > 18 ? 36 : 44), C.mint);
    });
  });
  const kiosk = new THREE.Group(); kiosk.position.set(6.6, 0, -0.4); kiosk.rotation.y = -0.55; g.add(kiosk);
  add(kiosk, box(0.5, 0.05, 0.4, 0.02), M.metal, 0, 0.025, 0);
  add(kiosk, box(0.1, 1.05, 0.1, 0.02), M.darkMetal, 0, 0.55, 0);
  const head = new THREE.Group(); head.position.set(0, 1.6, 0); head.rotation.x = -0.18; kiosk.add(head);
  add(head, box(1.0, 1.25, 0.06, 0.03), M.black);
  const face = add(head, new THREE.PlaneGeometry(0.9, 1.13), screenMat(map), 0, 0, 0.035);
  face.userData = { tip: () => L("tipFloor"), go: 1 }; clickables.push(face);
  plant(g, -8.6, -6.8, 1.3); plant(g, 8.6, -6.8, 1.1); plant(g, -3.8, -1.2, 0.85);
  placeCharacter(g, "sit", 1.9, 1.2, -2.95, -0.25);
  // Framed portrait hanging from the ceiling, right above the figure on the desk
  const frame = new THREE.Group(); frame.position.set(1.9, 3.6, -2.9); frame.rotation.y = -0.15; g.add(frame);
  [-0.5, 0.5].forEach((cx) => noShadow(add(frame, new THREE.CylinderGeometry(0.004, 0.004, H - 3.6 - 0.75, 6), M.metal, cx, (H - 3.6) / 2 + 0.38, 0)));
  add(frame, box(1.24, 1.5, 0.06, 0.03), M.wood);
  const photo = new THREE.TextureLoader().load("img/profile.jpg");
  photo.colorSpace = THREE.SRGBColorSpace;
  photo.repeat.set(0.56, 1); photo.offset.set(0.22, 0); // crop the landscape photo to a portrait around the face
  const pm = new THREE.MeshBasicMaterial({ map: photo });
  add(frame, new THREE.PlaneGeometry(1.12, 1.38), pm, 0, 0, 0.035);
  const cap = tex(800, 140, (c, w) => { rr(c, 0, 0, w, 140, 14, C.ink); text(c, "BAIREM KHEDHRI", w / 2, 92, mono(54, 600), C.mint, "center"); });
  add(frame, new THREE.PlaneGeometry(1.12, 0.2), screenMat(cap), 0, -0.88, 0.02);
  noShadow(add(frame, box(1.0, 0.02, 0.04, 0), M.warmGlow, 0, 0.8, 0.05));
  animated.push((t) => { frame.rotation.y = -0.15 + Math.sin(t * 0.5) * 0.04; });
  // Waiting sofa and side table
  const sofa = new THREE.Group(); sofa.position.set(-5.2, 0, -6.4); g.add(sofa);
  add(sofa, box(2.6, 0.3, 0.95, 0.08), M.redFabric, 0, 0.32, 0);
  add(sofa, box(2.6, 0.62, 0.22, 0.08), M.redFabric, 0, 0.7, -0.38);
  [-1.25, 1.25].forEach((sx) => add(sofa, box(0.18, 0.5, 0.95, 0.06), M.redFabric, sx, 0.42, 0));
  [-1.1, 1.1].forEach((sx) => add(sofa, box(0.05, 0.17, 0.05, 0), M.metal, sx, 0.085, 0.35));
  add(g, new THREE.CylinderGeometry(0.35, 0.35, 0.04, 40), M.wood, -3.3, 0.5, -6.2);
  add(g, new THREE.CylinderGeometry(0.03, 0.03, 0.5, 12), M.metal, -3.3, 0.25, -6.2);
}

// ---------------------------------------------------------------------------
// Room 1: Executive suite
// ---------------------------------------------------------------------------
function expPlaque(roleK, name, whenK, linesK, accent) {
  return ltex(1200, 700, (c, w, h) => {
    rr(c, 0, 0, w, h, 24, C.ink);
    c.fillStyle = accent; c.fillRect(0, 0, w, 14);
    const role = L(roleK), when = L(whenK), lines = L(linesK);
    text(c, role, 60, 105, mono(48, 600), accent === C.red ? C.redSoft : C.sage);
    text(c, name, 60, 225, serif(name.length > 12 ? 100 : 120), C.mint);
    text(c, when, 60, 300, mono(40), C.dim);
    lines.forEach((l, i) => { rr(c, 60, 372 + i * 100, 18, 18, 4, accent); text(c, l, 100, 392 + i * 100, sans(52), C.mint); });
  });
}
function buildExecutive(x) {
  const g = new THREE.Group(); g.position.x = x; scene.add(g); ROOMG[Math.round(x / SPACING)] = g;
  // Wall display dedicated to the two headline roles
  const board = ltex(1600, 820, (c, w, h) => {
    rr(c, 0, 0, w, h, 24, C.ink);
    text(c, L("topExp"), 60, 90, mono(40), C.dim);
    [[60, "Appaxis Innovations", L("axRole"), L("axWhen"), C.sage, L("axB")],
     [820, "TogTog.io", L("ttRole"), L("ttWhen"), C.redSoft, L("ttB")]].forEach(([bx, n, r, d, col, ls]) => {
      rr(c, bx, 130, 720, 640, 22, "#13282a");
      c.fillStyle = col; c.fillRect(bx, 130, 720, 10);
      text(c, r, bx + 40, 215, mono(40, 600), col);
      text(c, n, bx + 40, 300, serif(n.length > 12 ? 66 : 80), C.mint);
      text(c, d, bx + 40, 365, mono(36), C.dim);
      ls.forEach((l, i) => { rr(c, bx + 40, 440 + i * 100, 16, 16, 3, col); text(c, l, bx + 76, 460 + i * 100, sans(48), C.mint); });
    });
  });
  wallScreen(g, board, 0.4, 3.1, 7.0, 3.6);

  // Two monuments, one per headline role
  const monuments = [
    { id: "appaxis", px: -1.5, accent: C.sage, glowM: M.tealGlow, light: 0x9fffe0,
      plaque: expPlaque("axRole", "Appaxis Innovations", "axPWhen", "axP", C.sage) },
    { id: "togtog", px: 2.2, accent: C.red, glowM: M.redGlow, light: 0xffb3a8,
      plaque: expPlaque("ttRole", "TogTog.io", "ttPWhen", "ttP", C.red) },
  ];
  monuments.forEach((m) => {
    const mg = new THREE.Group(); mg.position.set(m.px, 0, -1.9); g.add(mg);
    add(mg, box(2.0, 1.15, 1.1, 0.05), M.stone, 0, 0.575, 0);
    add(mg, box(2.08, 0.05, 1.18, 0.02), M.metal, 0, 1.17, 0);
    noShadow(add(mg, box(1.9, 0.025, 0.02, 0), m.glowM, 0, 0.06, 0.56));
    const face = add(mg, new THREE.PlaneGeometry(1.8, 1.05), screenMat(m.plaque), 0, 0.6, 0.556);
    face.userData = { tip: () => `${L("tipRead")} ${m.id === "appaxis" ? "Appaxis Innovations" : "TogTog.io"}`, exp: m.id }; clickables.push(face);
    // glowing base ring and light for the emblem
    noShadow(add(mg, new THREE.TorusGeometry(0.62, 0.015, 8, 80), m.glowM, 0, 1.2, 0)).rotation.x = Math.PI / 2;
    // Company logo: drop the file at img/logos/<id>.png and it replaces the wordmark
    // Company logo on a matte white board (unlit, so lights and reflections never wash it out)
    const wide = m.id === "appaxis";
    const bw = wide ? 2.0 : 1.2, bh = wide ? 0.78 : 1.2;
    const lt = tex(wide ? 1400 : 1000, wide ? 546 : 1000, (c, w, h) => { c.fillStyle = "#ffffff"; c.fillRect(0, 0, w, h); });
    const im = new Image();
    im.onload = () => {
      const c = lt.image.getContext("2d"), w = lt.image.width, h = lt.image.height;
      const k = Math.min((w * 0.84) / im.width, (h * 0.8) / im.height);
      c.drawImage(im, (w - im.width * k) / 2, (h - im.height * k) / 2, im.width * k, im.height * k);
      lt.needsUpdate = true;
    };
    im.src = `img/logos/${m.id}.png`;
    const lg = new THREE.Group(); lg.position.set(0, 1.35 + bh / 2 + 0.25, 0); mg.add(lg);
    noShadow(add(lg, new RoundedBoxGeometry(bw + 0.06, bh + 0.06, 0.04, 4, 0.05), m.glowM, 0, 0, -0.03));
    add(lg, new RoundedBoxGeometry(bw, bh, 0.05, 4, 0.04), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    [1, -1].forEach((s) => { const f = add(lg, new THREE.PlaneGeometry(bw - 0.04, bh - 0.04), new THREE.MeshBasicMaterial({ map: lt }), 0, 0, s * 0.027); if (s < 0) f.rotation.y = Math.PI; });
    const by = lg.position.y;
    animated.push((t) => { lg.rotation.y = Math.sin(t * 0.4 + m.px) * 0.18; lg.position.y = by + Math.sin(t * 1.1 + m.px) * 0.04; });
  });

  // Executive desk moved to the side, strategy easel at the far right
  desk(g, 6.6, -5.4, -0.3, 2.6);
  const strat = ltex(900, 1100, (c, w) => {
    rr(c, 0, 0, w, 1100, 20, C.paper);
    text(c, L("howLead"), 60, 100, mono(38), "#283338");
    [["Agile", C.sage], ["Scrum", C.redSoft], ["Code review", C.foam], ["Mentorship", C.sage], ["Secure coding", C.redSoft], ["Roadmaps", C.foam], ["Specs", C.sage], ["Hiring", C.redSoft]].forEach(([b, col], i) => {
      const bx = 60 + (i % 2) * 400, by = 150 + Math.floor(i / 2) * 225;
      rr(c, bx, by, 370, 190, 22, col);
      text(c, b, bx + 30, by + 115, serif(48), "#231e21");
    });
  });
  const easel = new THREE.Group(); easel.position.set(5.6, 0, -2.4); easel.rotation.y = -0.5; g.add(easel);
  [-0.7, 0.7].forEach((lx) => add(easel, box(0.06, 2.9, 0.06, 0), M.wood, lx, 1.45, 0));
  add(easel, box(0.06, 2.7, 0.06, 0), M.wood, 0, 1.32, -0.25).rotation.x = 0.2;
  add(easel, box(1.7, 0.05, 0.14, 0), M.wood, 0, 0.75, 0.06);
  add(easel, box(1.62, 1.98, 0.03, 0.01), M.ceramic, 0, 1.78, 0.05);
  add(easel, new THREE.PlaneGeometry(1.56, 1.9), screenMat(strat), 0, 1.78, 0.07);
  [[-6.8, 0.5], [-4.4, -0.5]].forEach(([cx, ry]) => {
    const a = new THREE.Group(); a.position.set(cx, 0, -2.6); a.rotation.y = ry; g.add(a);
    add(a, box(0.95, 0.35, 0.9, 0.12), M.redFabric, 0, 0.3, 0);
    add(a, box(0.95, 0.6, 0.18, 0.08), M.redFabric, 0, 0.7, -0.38);
    [-0.45, 0.45].forEach((sx) => add(a, box(0.1, 0.42, 0.8, 0.04), M.redFabric, sx, 0.4, 0));
  });
  plant(g, 8.6, -6.8, 1.2); plant(g, -8.6, -6.8, 1.0);
  // standing beside the monuments, gesturing toward them
  placeCharacter(g, "welcome", 3.5, 0.98, -1.55, -0.5, (t, J, b) => { J.elR.rotation.x = b.elR.x + Math.sin(t * 1.2) * 0.1; });
}

// ---------------------------------------------------------------------------
// Room 2: Mobile and backend lab
// ---------------------------------------------------------------------------
function buildLab(x) {
  const g = new THREE.Group(); g.position.x = x; scene.add(g); ROOMG[Math.round(x / SPACING)] = g;

  // Architecture wall: mobile clients, API, security, data
  const arch = ltex(2000, 900, (c, w) => {
    rr(c, 0, 0, w, 900, 24, C.ink);
    text(c, L("archTitle"), 60, 80, mono(40), C.dim);
    const col = (bx, title, items, color, dark) => {
      rr(c, bx, 140, 400, 640, 26, "#13282a");
      rr(c, bx, 140, 400, 90, 26, color); c.fillStyle = color; c.fillRect(bx, 190, 400, 40);
      text(c, title, bx + 30, 202, sans(40, 700), dark ? "#231e21" : C.mint);
      items.forEach((it, i) => { rr(c, bx + 30, 270 + i * 120, 340, 90, 14, "#0c1617"); text(c, it, bx + 56, 328 + i * 120, mono(30), C.mint); });
    };
    col(60, L("arch")[0], ["Flutter", "Compose", "SwiftUI", "Retrofit"], C.sage, true);
    col(560, L("arch")[1], ["Node / Express", "Spring Boot", "REST + Swagger", "Socket.io"], C.red, false);
    col(1060, L("arch")[2], ["JWT", "OAuth2", "Encryption", "Secure coding"], C.foam, true);
    col(1560, L("arch")[3], ["MongoDB", "SQL", "NoSQL", "Room cache"], C.teal, false);
    c.strokeStyle = C.redSoft; c.lineWidth = 6;
    [460, 960, 1460].forEach((ax) => { c.beginPath(); c.moveTo(ax + 10, 460); c.lineTo(ax + 90, 460); c.moveTo(ax + 70, 440); c.lineTo(ax + 90, 460); c.lineTo(ax + 70, 480); c.stroke(); });
  });
  wallScreen(g, arch, 0.2, 3.3, 7.0, 3.15);

  // Mobile side: test bench with floating technology logos
  add(g, box(3.4, 0.9, 1.1, 0.06), M.stone, -1.8, 0.45, -1.6);
  add(g, box(3.5, 0.05, 1.2, 0.02), M.wood, -1.8, 0.92, -1.6);
  [["flutter", "Flutter"], ["kotlin", "Kotlin"], ["swift", "Swift"], ["jetpackcompose", "Compose"], ["dart", "Dart"], ["android", "Android"]].forEach(([f, n], i) => {
    const px = -2.95 + (i % 3) * 1.15, py = i < 3 ? 2.35 : 1.5, pz = i < 3 ? -1.75 : -1.45;
    const tile = logoTile(g, `img/tech/${f}.svg`, n, i < 3 ? 0.8 : 0.62, f);
    tile.position.set(px, py, pz);
    if (i >= 3) noShadow(add(g, new THREE.CylinderGeometry(0.26, 0.26, 0.015, 32), i === 4 ? M.redGlow : M.tealGlow, px, 0.955, -1.45));
    animated.push((t) => { tile.position.y = py + Math.sin(t * 1.2 + i) * 0.06; tile.rotation.y = Math.sin(t * 0.6 + i) * 0.5; });
  });
  // Mobile workstation
  const dk = desk(g, -5.6, -5.4, 0.25, 3.0);
  monitor(dk, -0.6, 1.17, -0.3, 0.18, codeTex("ProfileViewModel.kt", [
    ["class ProfileViewModel(", C.mint], ["private val repo: ProfileRepository", C.dim, 1], [") : ViewModel() {", C.mint],
    ["val state = MutableStateFlow(UiState.Loading)", C.sage, 1], ["fun load() = viewModelScope.launch {", C.mint, 1],
    ["state.value = repo.profile().toUiState()", C.foam, 2], ["}", C.mint, 1], ["}", C.mint]]), 0.95, 0.54);
  monitor(dk, 0.6, 1.17, -0.3, -0.18, codeTex("chat_bloc.dart", [
    ["class ChatBloc extends Bloc<ChatEvent, ChatState> {", C.mint], ["ChatBloc(this._socket) : super(ChatState.idle()) {", C.mint, 1],
    ["on<MessageSent>(_onSent);", C.sage, 2], ["}", C.mint, 1], ["Future<void> _onSent(e, emit) async {", C.redSoft, 1],
    ["await _socket.send(e.message);", C.foam, 2], ["}", C.mint, 1], ["}", C.mint]]), 0.95, 0.54);

  // Backend side: workstation, rack cluster, database, data pipes
  const be = desk(g, 2.6, -4.7, -0.12, 3.4);
  add(be, box(0.46, 0.02, 0.15, 0.008), M.black, 0, 0.8, 0.42);
  add(be, box(0.06, 0.02, 0.1, 0.01), M.black, 0.38, 0.8, 0.45);
  // working at the backend desk, typing
  placeCharacter(be, "type", 0, 0.64, 0.98, Math.PI, (t, J, b) => { J.elL.rotation.x = b.elL.x + Math.sin(t * 9) * 0.05; J.elR.rotation.x = b.elR.x + Math.sin(t * 9 + 1.6) * 0.05; });
  monitor(be, -1.05, 1.17, -0.3, 0.25, codeTex("auth.routes.js", [
    ["router.post('/auth/login', async (req, res) => {", C.mint], ["const { email, password } = req.body;", C.dim, 1],
    ["const user = await User.findOne({ email });", C.sage, 1], ["if (!(await user?.verify(password)))", C.redSoft, 1],
    ["return res.status(401).end();", C.redSoft, 2], ["const token = jwt.sign({ id: user.id }, SECRET);", C.foam, 1], ["res.json({ token });", C.mint, 1], ["});", C.mint]], C.red), 0.95, 0.54);
  monitor(be, 0, 1.17, -0.38, 0, codeTex("EventController.java", [
    ["@RestController", C.redSoft], ["@RequestMapping(\"/api/events\")", C.redSoft], ["public class EventController {", C.mint],
    ["@PostMapping(\"/{id}/reserve\")", C.sage, 1], ["public Ticket reserve(@PathVariable Long id) {", C.mint, 1],
    ["return tickets.issueWithQr(id);", C.foam, 2], ["}", C.mint, 1], ["}", C.mint]], C.red), 0.95, 0.54);
  monitor(be, 1.05, 1.17, -0.3, -0.25, codeTex("server.log", [
    ["$ npm start", C.sage], ["api listening", C.dim], ["mongodb connected", C.dim], ["socket.io ready", C.dim],
    ["POST /auth/login       200", C.mint], ["GET  /api/events       200", C.mint], ["WS   /chat        upgraded", C.foam]], C.red), 0.95, 0.54);

  const rackFace = tex(256, 600, (c, w, h) => {
    c.fillStyle = "#111b1c"; c.fillRect(0, 0, w, h);
    for (let u = 0; u < 12; u++) {
      const y = 20 + u * 48;
      rr(c, 14, y, w - 28, 40, 4, "#1b2a2b");
      for (let v = 0; v < 14; v++) { c.fillStyle = "#0a1213"; c.fillRect(30 + v * 10, y + 12, 5, 16); }
      rr(c, w - 70, y + 14, 40, 12, 3, "#0a1213");
    }
  });
  const leds = [];
  [4.6, 5.75, 6.9].forEach((rx, ri) => {
    const r = new THREE.Group(); r.position.set(rx, 0, -6.9); g.add(r);
    add(r, box(1.05, 2.6, 0.95, 0.03), M.darkMetal, 0, 1.3, 0);
    add(r, new THREE.PlaneGeometry(0.92, 2.4), new THREE.MeshStandardMaterial({ map: rackFace, roughness: 0.6, metalness: 0.4 }), 0, 1.32, 0.48);
    for (let u = 0; u < 12; u++) for (let k = 0; k < 2; k++) {
      leds.push(noShadow(add(r, new THREE.SphereGeometry(0.018, 8, 8), (u + k + ri) % 3 ? M.tealGlow : M.redGlow, 0.3 + k * 0.06, 2.44 - u * 0.193, 0.49)));
    }
    noShadow(add(r, box(0.9, 0.02, 0.02, 0), ri === 1 ? M.redGlow : M.tealGlow, 0, 2.63, 0.48));
  });
  animated.push((t) => leds.forEach((l, i) => { l.visible = Math.sin(t * (2 + (i % 5)) + i * 1.7) > -0.4; }));
  [["nodejs", "Node.js", 4.6], ["spring", "Spring", 5.75], ["mongodb", "MongoDB", 6.9]].forEach(([f, n, rx], i) => {
    const tile = logoTile(g, `img/tech/${f}.svg`, n, 0.82, f);
    tile.position.set(rx, 3.15, -6.6);
    animated.push((t) => { tile.rotation.y = Math.sin(t * 0.5 + i) * 0.35; tile.position.y = 3.15 + Math.sin(t + i) * 0.05; });
  });
  [["express", "Express", 5.5, -2.4], ["socketio", "Socket.io", 7.6, -3.8], ["java", "Java", 7.7, -2.2]].forEach(([f, n, lx, lz], i) => {
    const tile = logoTile(g, `img/tech/${f}.svg`, n, 0.52, f);
    tile.position.set(lx, 1.6, lz);
    animated.push((t) => { tile.rotation.y = t * 0.4 + i; tile.position.y = 1.6 + Math.sin(t * 1.3 + i) * 0.06; });
  });
  const rackSign = tex(1024, 140, (c, w) => { text(c, "", w / 2, 92, mono(56), C.mint, "center"); });
  void rackSign;

  // Database: stacked discs with glowing seams
  const db = new THREE.Group(); db.position.set(6.7, 0, -3.0); g.add(db);
  add(db, new THREE.CylinderGeometry(0.62, 0.62, 0.06, 48), M.metal, 0, 0.03, 0);
  for (let k = 0; k < 3; k++) {
    add(db, new THREE.CylinderGeometry(0.55, 0.55, 0.42, 48), M.darkMetal, 0, 0.3 + k * 0.48, 0);
    noShadow(add(db, new THREE.TorusGeometry(0.555, 0.012, 8, 64), k === 1 ? M.redGlow : M.tealGlow, 0, 0.53 + k * 0.48, 0)).rotation.x = Math.PI / 2;
  }
  const dbLabel = ltex(512, 140, (c, w) => { rr(c, 0, 0, w, 140, 16, C.ink); text(c, L("dataLayer"), w / 2, 88, mono(46), C.sage, "center"); });
  add(db, new THREE.PlaneGeometry(1.0, 0.27), screenMat(dbLabel), 0, 1.75, 0.3).rotation.x = -0.15;

  // Data pipes: requests travel from the phones to the API racks and on to the database
  const curves = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(-1.8, 2.5, -1.6), new THREE.Vector3(0.6, 3.8, -3.2), new THREE.Vector3(3.6, 3.3, -5.6), new THREE.Vector3(4.9, 2.7, -6.4)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(6.9, 2.7, -6.4), new THREE.Vector3(7.4, 2.4, -5.0), new THREE.Vector3(6.9, 1.95, -3.4)]),
  ];
  const pipeMat = new THREE.MeshBasicMaterial({ color: 0x65b8a2, transparent: true, opacity: 0.25, depthWrite: false });
  curves.forEach((cv) => noShadow(add(g, new THREE.TubeGeometry(cv, 80, 0.014, 6, false), pipeMat)));
  const packets = [];
  for (let k = 0; k < 9; k++) {
    const p = noShadow(add(g, new THREE.SphereGeometry(0.05, 12, 12), k % 3 === 0 ? M.redGlow : M.tealGlow));
    packets.push({ p, curve: curves[k < 6 ? 0 : 1], off: k < 6 ? k / 6 : (k - 6) / 3 });
  }
  animated.push((t) => packets.forEach(({ p, curve, off }) => { p.position.copy(curve.getPointAt((t * 0.18 + off) % 1)); }));
  plant(g, -8.6, -6.8, 1.0);
}

// ---------------------------------------------------------------------------
// Room 3: Project showroom
// ---------------------------------------------------------------------------
const showPhones = [];
// Splash screens for the project phones: each app's own background and logo, centred.
// The same canvas becomes the image on the project cards and in the project window.
function loadImg(src) { return new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; }); }
function whiteOnly(im) {
  // keep only the white mark from a logo that sits on a coloured background
  const c = document.createElement("canvas"); c.width = im.width; c.height = im.height;
  const g = c.getContext("2d"); g.drawImage(im, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height), a = d.data;
  for (let i = 0; i < a.length; i += 4) {
    const m = Math.min(a[i], a[i + 1], a[i + 2]);
    a[i + 3] = Math.max(0, Math.min(255, (m - 225) * 8.5)); a[i] = a[i + 1] = a[i + 2] = 255;
  }
  g.putImageData(d, 0, 0); return c;
}
function makeSplash(p) {
  const W = 600, H2 = 1260, s = p.splash;
  const t = tex(W, H2, (g) => { g.fillStyle = s.bg && s.bg !== "corner" ? s.bg : "#ffffff"; g.fillRect(0, 0, W, H2); });
  const lum = (hex) => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255; };
  (async () => {
    const im = s.logo ? await loadImg(s.logo) : null;
    const g = t.image.getContext("2d");
    g.save(); g.beginPath(); g.roundRect(0, 0, W, H2, 84); g.clip();
    let bg = s.bg;
    if (s.grad) {
      const gr = g.createLinearGradient(0, 0, W, H2); gr.addColorStop(0, s.grad[0]); gr.addColorStop(1, s.grad[1]);
      g.fillStyle = gr; bg = s.grad[0];
    } else if (s.bg === "corner" && im) {
      const k = document.createElement("canvas").getContext("2d"); k.canvas.width = k.canvas.height = 4; k.drawImage(im, 0, 0, 4, 4, 0, 0, 4, 4);
      const px = k.getImageData(0, 0, 1, 1).data; bg = `#${[px[0], px[1], px[2]].map((v) => v.toString(16).padStart(2, "0")).join("")}`; g.fillStyle = bg;
    } else g.fillStyle = bg;
    g.fillRect(0, 0, W, H2);
    const fg = lum(bg) > 0.6 ? "#1a1a1a" : "#ffffff";
    // status bar
    g.fillStyle = fg; g.font = "600 30px 'DM Sans', sans-serif"; g.textAlign = "left"; g.direction = "ltr"; g.fillText("9:41", 60, 76);
    g.strokeStyle = fg; g.lineWidth = 3; g.beginPath(); g.roundRect(470, 54, 64, 28, 8); g.stroke(); g.beginPath(); g.roundRect(474, 58, 44, 20, 5); g.fill();
    const cy = 560;
    if (s.halo) { g.fillStyle = s.halo; g.beginPath(); g.arc(W / 2, cy, 250, 0, 7); g.fill(); }
    if (im) {
      const src = s.whiteOnly ? whiteOnly(im) : im;
      // the Unimatch source has margins around the mark: crop to its central part
      const crop = s.whiteOnly ? [0.22, 0.16, 0.56, 0.68] : [0, 0, 1, 1];
      const sw = src.width * crop[2], sh = src.height * crop[3], k = Math.min(s.size / sw, s.size / sh);
      g.drawImage(src, src.width * crop[0], src.height * crop[1], sw, sh, W / 2 - (sw * k) / 2, cy - (sh * k) / 2, sw * k, sh * k);
    }
    if (s.keyhole) {
      g.fillStyle = "#ffffff"; g.beginPath(); g.arc(W / 2, cy, 120, 0, 7); g.fill();
      g.fillStyle = bg; g.beginPath(); g.arc(W / 2, cy, 92, 0, 7); g.fill();
      g.fillStyle = "#ffffff"; g.beginPath(); g.arc(W / 2, cy - 20, 30, 0, 7); g.fill();
      g.beginPath(); g.roundRect(W / 2 - 16, cy - 20, 32, 86, 10); g.fill();
    }
    if (s.letter) {
      g.fillStyle = "#ffffff"; g.font = "700 380px 'DM Sans', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(s.letter, W / 2, cy + 10); g.textBaseline = "alphabetic";
    }
    if (s.word) { g.fillStyle = fg; g.font = "700 64px 'DM Sans', sans-serif"; g.textAlign = "center"; g.fillText(s.word, W / 2, cy + 230); }
    // loading dots in the app's accent (or white on its own colour) and home indicator
    [-1, 0, 1].forEach((d, k) => { g.globalAlpha = k === 1 ? 1 : 0.45; g.fillStyle = lum(bg) > 0.6 ? p.accent : "#ffffff"; g.beginPath(); g.arc(W / 2 + d * 30, 1050, 9, 0, 7); g.fill(); });
    g.globalAlpha = 1; g.fillStyle = fg; g.beginPath(); g.roundRect(200, H2 - 40, 200, 10, 5); g.fill();
    g.restore();
    t.needsUpdate = true;
    p.splashURL = t.image.toDataURL("image/png");
    renderProjects();
    if (openIdx >= 0 && PROJECTS[openIdx] === p) openProject(openIdx);
  })();
  return t;
}

function buildShowroom(x) {
  const g = new THREE.Group(); g.position.x = x; scene.add(g); ROOMG[Math.round(x / SPACING)] = g;
  PROJECTS.forEach((p, i) => {
    const px = (i - 2.5) * 2.55, pz = -4.6 - Math.abs(i - 2.5) * 0.45;
    const ped = new THREE.Group(); ped.position.set(px, 0, pz); ped.rotation.y = -(i - 2.5) * 0.08; g.add(ped);
    add(ped, new THREE.CylinderGeometry(0.55, 0.62, 1.1, 48), M.stone, 0, 0.55, 0);
    add(ped, new THREE.CylinderGeometry(0.6, 0.6, 0.04, 48), M.metal, 0, 1.12, 0);
    const accTmp = glow(new THREE.Color(p.accent).getHex(), 2.4);
    noShadow(add(ped, new THREE.TorusGeometry(0.6, 0.014, 8, 64), accTmp, 0, 1.14, 0)).rotation.x = Math.PI / 2;
    noShadow(add(ped, new THREE.CircleGeometry(0.4, 32), accTmp, 0, H - 0.01, 0)).rotation.x = Math.PI / 2;
    const scr = makeSplash(p);
    const acc = new THREE.Color(p.accent), accGlow = glow(acc.getHex(), 2.4);
    const phone = makePhone(scr, acc.clone().lerp(new THREE.Color(0x0b1516), 0.35).getHex());
    phone.position.set(0, 2.2, 0); phone.scale.setScalar(0.85); ped.add(phone);
    const plaque = ltex(800, 260, (c) => { rr(c, 0, 0, 800, 260, 20, C.ink); text(c, p.name, 400, 130, serif(p.name.length > 14 ? 64 : 84), C.mint, "center"); text(c, years(p), 400, 205, mono(40), p.accent, "center"); c.fillStyle = p.accent; c.fillRect(0, 0, 800, 10); });
    add(ped, new THREE.PlaneGeometry(1.3, 0.42), screenMat(plaque), 0, 0.72, 0.63).rotation.x = -0.15;
    const hit = add(ped, new THREE.BoxGeometry(1.1, 2.2, 0.6), M.hidden, 0, 2.2, 0);
    hit.userData = { tip: () => `${L("tipOpen")} ${p.name}`, project: i, phone };
    clickables.push(hit);
    showPhones.push({ phone, i });
  });
  animated.push((t) => showPhones.forEach(({ phone, i }) => {
    const hovered = hoverObj?.userData.phone === phone;
    phone.rotation.y += ((hovered ? 0 : Math.sin(t * 0.5 + i) * 0.55) - phone.rotation.y) * 0.08;
    phone.position.y += ((hovered ? 2.45 : 2.2 + Math.sin(t + i) * 0.05) - phone.position.y) * 0.1;
  }));
  const title = ltex(1600, 300, (c, w) => { text(c, L("projects"), w / 2, 170, mono(110), C.dim, "center"); c.fillStyle = C.red; c.fillRect(w / 2 - 100, 230, 200, 8); });
  noShadow(add(g, new THREE.PlaneGeometry(8, 1.5), new THREE.MeshBasicMaterial({ map: title, transparent: true }), 0, 4.1, -DEPTH / 2 + 0.06));
}

// ---------------------------------------------------------------------------
// Room 4: Academy
// ---------------------------------------------------------------------------
const certs = [];
function certTex(titleF, subF, orgF, accent) {
  return ltex(900, 640, (c, w, h) => {
    const title = titleF(), sub = subF(), org = orgF();
    rr(c, 0, 0, w, h, 8, C.paper);
    c.strokeStyle = accent; c.lineWidth = 10; c.strokeRect(30, 30, w - 60, h - 60);
    c.lineWidth = 2; c.strokeRect(50, 50, w - 100, h - 100);
    text(c, L("certified"), w / 2, 130, mono(30), "#283338", "center");
    text(c, title, w / 2, 250, serif(title.length > 18 ? 52 : 64), "#231e21", "center");
    text(c, sub, w / 2, 330, sans(32, 400), "#283338", "center");
    c.fillStyle = accent; c.beginPath(); c.arc(w / 2, 450, 46, 0, 7); c.fill();
    text(c, org, w / 2, 565, mono(28), "#283338", "center");
  });
}
function buildAcademy(x) {
  const g = new THREE.Group(); g.position.x = x; scene.add(g); ROOMG[Math.round(x / SPACING)] = g;
  const bookCols = [0x1c5d5f, 0xc2413b, 0x65b8a2, 0xf2e8e2, 0x2a7779, 0xef8a80, 0xcae1e2];
  const bookMat = new THREE.MeshStandardMaterial({ roughness: 0.75, envMapIntensity: 0.3 });
  const bookMats = bookCols.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75 }));
  [-6.4, 6.4].forEach((sx) => {
    const shelf = new THREE.Group(); shelf.position.set(sx, 0, -DEPTH / 2 + 0.45); g.add(shelf);
    const books = [];
    add(shelf, box(3.4, 3.3, 0.06, 0), M.wood, 0, 1.65, -0.3);
    [-1.7, 1.7].forEach((ex) => add(shelf, box(0.06, 3.3, 0.6, 0), M.wood, ex, 1.65, 0));
    for (let r = 0; r < 5; r++) {
      add(shelf, box(3.34, 0.05, 0.6, 0), M.wood, 0, 0.05 + r * 0.8, 0);
      if (r === 4) break;
      let bx = -1.6;
      while (bx < 1.45) {
        const bw = 0.07 + rand() * 0.09, bh = 0.42 + rand() * 0.24;
        books.push([bx + bw / 2, 0.075 + r * 0.8 + bh / 2, bw, bh, bookCols[Math.floor(rand() * bookCols.length)]]);
        bx += bw + 0.012;
      }
    }
    const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 0.42), bookMat, books.length);
    const mtx = new THREE.Matrix4(), col = new THREE.Color();
    books.forEach(([px, py, bw, bh, c], k) => { mtx.makeScale(bw, bh, 1).setPosition(px, py, 0.02); inst.setMatrixAt(k, mtx); inst.setColorAt(k, col.set(c)); });
    shelf.add(inst);
  });
  [
    [() => L("engDeg"), () => L("csMobile"), () => `ESPRIT · 2021 ${L("to")} 2024`, C.teal],
    [() => L("bachDeg"), () => L("cs"), () => `ISAMM · 2018 ${L("to")} 2021`, C.red],
    [() => "Java", () => L("certificate"), () => "HackerRank", C.sage],
    [() => "Problem Solving", () => L("certificate"), () => "HackerRank", C.redSoft],
  ].forEach(([t, s, o, a], i) => {
    const frame = new THREE.Group(); frame.position.set((i - 1.5) * 2.0, 3.0, -DEPTH / 2 + 0.12); g.add(frame);
    add(frame, box(1.7, 1.24, 0.07, 0.02), M.wood);
    const face = add(frame, new THREE.PlaneGeometry(1.52, 1.08), new THREE.MeshStandardMaterial({ map: certTex(t, s, o, a), color: 0xa8a8a8, emissive: 0x6a6a6a, emissiveIntensity: 0, roughness: 0.7 }), 0, 0, 0.04);
    face.userData = { tip: () => `${t()}: ${o()}`, cert: true };
    clickables.push(face); certs.push(face);
    noShadow(add(frame, box(1.2, 0.03, 0.05, 0), M.warmGlow, 0, 0.72, 0.08));
  });
  animated.push(() => certs.forEach((f) => {
    const on = hoverObj === f || activeCert === f;
    f.material.emissiveIntensity += ((on ? 0.5 : 0) - f.material.emissiveIntensity) * 0.12;
    f.parent.position.z += ((on ? -DEPTH / 2 + 0.45 : -DEPTH / 2 + 0.12) - f.parent.position.z) * 0.12;
  }));
  const wb = ltex(1200, 760, (c, w, h) => {
    rr(c, 0, 0, w, h, 16, C.paper);
    text(c, `${L("trainer")} · TUNISIA DEVELOPMENT FOUNDATION`, 50, 80, mono(30), "#283338");
    text(c, "Kotlin  ·  Compose  ·  Flutter  ·  Node.js", 50, 170, serif(54), "#231e21");
    c.strokeStyle = C.teal; c.lineWidth = 6;
    [["View", 80], ["ViewModel", 430], ["Repository", 800]].forEach(([n, bx]) => { c.strokeRect(bx, 270, 300, 120); text(c, n, bx + 150, 345, sans(38), "#231e21", "center"); });
    c.beginPath(); c.moveTo(380, 330); c.lineTo(430, 330); c.moveTo(730, 330); c.lineTo(800, 330); c.stroke();
    text(c, L("taught"), 80, 520, serif(56, 700, "italic"), C.red);
    text(c, L("interns"), 80, 610, serif(56, 700, "italic"), C.teal);
  });
  const board = new THREE.Group(); board.position.set(2.6, 0, -2.0); board.rotation.y = -0.3; g.add(board);
  // presenting beside the whiteboard
  placeCharacter(g, "present", 0.55, 0.98, -1.95, -0.2, (t, J, b) => { J.shL.rotation.z = b.shL.z + Math.sin(t * 0.8) * 0.08; J.elL.rotation.x = b.elL.x + Math.sin(t * 0.8) * 0.12; });
  [-1.4, 1.4].forEach((lx) => { add(board, box(0.05, 2.0, 0.05, 0), M.metal, lx, 1.0, 0); add(board, box(0.05, 0.03, 0.6, 0), M.metal, lx, 0.015, 0); });
  add(board, box(3.0, 1.9, 0.05, 0.02), M.metal, 0, 1.8, 0);
  add(board, new THREE.PlaneGeometry(2.9, 1.8), screenMat(wb), 0, 1.8, 0.03);
  add(board, box(2.6, 0.04, 0.1, 0), M.metal, 0, 0.83, 0.05);
  // Reading desk with lamp and books
  const rd = desk(g, -3.6, -2.4, 0.3, 2.0);
  const lamp = new THREE.Group(); lamp.position.set(-0.6, 0.79, -0.2); rd.add(lamp);
  add(lamp, new THREE.CylinderGeometry(0.11, 0.12, 0.03, 32), M.metal);
  add(lamp, new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8), M.metal, 0.08, 0.3, 0).rotation.z = -0.28;
  add(lamp, new THREE.ConeGeometry(0.13, 0.2, 32, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xc2413b, roughness: 0.3, side: THREE.DoubleSide }), 0.18, 0.62, 0).rotation.z = 0.5;
  noShadow(add(lamp, new THREE.SphereGeometry(0.04, 12, 12), M.warmGlow, 0.15, 0.56, 0));
  [0, 1, 2].forEach((k) => add(rd, box(0.48, 0.07, 0.34, 0.01), bookMats[k * 2], 0.45, 0.83 + k * 0.072, -0.1, 0.15 * k));
  plant(g, -1.2, -6.9, 1.0);
}

// ---------------------------------------------------------------------------
// Room 5: Boardroom
// ---------------------------------------------------------------------------
function buildBoardroom(x) {
  const g = new THREE.Group(); g.position.x = x; scene.add(g); ROOMG[Math.round(x / SPACING)] = g;
  add(g, box(7, 0.08, 2.6, 0.04), M.wood, 0, 0.78, -3.4);
  [-2.6, 2.6].forEach((lx) => add(g, box(0.12, 0.74, 1.8, 0.03), M.darkMetal, lx, 0.37, -3.4));
  for (let k = 0; k < 4; k++) [-1, 1].forEach((side) => chair(g, -2.6 + k * 1.75, -3.4 + side * 1.65, side > 0 ? 0 : Math.PI, k % 2 ? M.redFabric : M.tealFabric));
  const holo = new THREE.Group(); holo.position.set(0, 0.82, -3.4); holo.scale.setScalar(0.75); g.add(holo);
  add(holo, new THREE.CylinderGeometry(0.5, 0.58, 0.08, 48), M.darkMetal, 0, 0.04, 0);
  noShadow(add(holo, new THREE.CylinderGeometry(0.42, 0.42, 0.02, 48), M.tealGlow, 0, 0.09, 0));
  const core = noShadow(add(holo, new THREE.IcosahedronGeometry(0.4, 1), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x65b8a2).multiplyScalar(2.5), wireframe: true }), 0, 0.95, 0));
  const r1 = noShadow(add(holo, new THREE.TorusGeometry(0.65, 0.01, 8, 96), M.redGlow, 0, 0.95, 0));
  const r2 = noShadow(add(holo, new THREE.TorusGeometry(0.8, 0.007, 8, 96), M.tealGlow, 0, 0.95, 0));
  noShadow(add(holo, new THREE.CylinderGeometry(0.42, 0.42, 1.5, 48, 1, true), new THREE.MeshBasicMaterial({ color: 0x65b8a2, transparent: true, opacity: 0.05, side: THREE.DoubleSide, depthWrite: false }), 0, 0.85, 0));
  animated.push((t) => { core.rotation.set(t * 0.4, t * 0.6, 0); r1.rotation.set(Math.PI / 2 + Math.sin(t) * 0.3, t * 0.7, 0); r2.rotation.set(Math.PI / 2, 0, t * 0.5); });
  const wall = ltex(1600, 700, (c, w, h) => {
    rr(c, 0, 0, w, h, 24, C.ink);
    text(c, L("contact"), 70, 100, mono(40), C.dim);
    text(c, L("build1"), 70, 260, serif(110), C.mint);
    text(c, L("build2"), 70, 390, serif(110, 700, lang === "ar" ? "" : "italic"), C.redSoft);
    text(c, "bairemkh@gmail.com", 70, 540, mono(40), C.sage);
    text(c, "linkedin.com/in/bairem-khedhri    github.com/bairemkh", 70, 610, mono(32), C.dim);
  });
  wallScreen(g, wall, 0, 3.35, 7.2, 3.15);
  // sitting on the edge of the conference table
  placeCharacter(g, "lean", 1.78, 0.94, -2.28, -0.3);
  [-1.8, 1.8].forEach((cx) => noShadow(add(g, new THREE.CylinderGeometry(0.006, 0.006, 1.3, 6), M.black, cx, H - 0.65, -3.4)));
  noShadow(add(g, box(4.4, 0.08, 0.18, 0.03), M.darkMetal, 0, H - 1.3, -3.4));
  noShadow(add(g, box(4.3, 0.015, 0.1, 0), M.warmGlow, 0, H - 1.345, -3.4));
  add(g, box(3.2, 0.7, 0.5, 0.03), M.wood, 6.2, 0.35, -7.5);
  plant(g, -8.6, -6.8, 1.2); plant(g, 8.6, -6.8, 1.2);
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
const clock = new THREE.Clock();
let current = 0, activeCert = null, hoverObj = null;
let ensureRoom = () => {};
function view(i) {
  const x = i * SPACING;
  if (i === 3) return isNarrow()
    ? { pos: new THREE.Vector3(x, 3.0, 8.5), target: new THREE.Vector3(x, 0.9, -4) }
    : { pos: new THREE.Vector3(x, 2.5, 7.4), target: new THREE.Vector3(x, 1.25, -4) };
  if (isNarrow() && i !== 3) {
    // phones: frame each room's centrepiece in the top half, above the bottom sheet
    const f = [1.9, 0.35, -0.9, 0, 0, 0][i];
    return { pos: new THREE.Vector3(x + f, 3.3, 8.6), target: new THREE.Vector3(x + f, 1.25, -4) };
  }
  if (i === 0) return { pos: new THREE.Vector3(x - 1.4, 2.8, 9.2), target: new THREE.Vector3(x - 0.2, 2.0, -4) };
  if (isNarrow()) return { pos: new THREE.Vector3(x, 3.6, 9.5), target: new THREE.Vector3(x, 2.0, -4) };
  return { pos: new THREE.Vector3(x - 2.6, 2.7, 6.4), target: new THREE.Vector3(x - 1.2, 1.9, -4) };
}
const camTarget = new THREE.Vector3();
let tween = null, idleStart = 0;
function flyTo(i, instant = false) {
  const to = view(i);
  if (instant || reduce) { camera.position.copy(to.pos); camTarget.copy(to.target); tween = null; idleStart = clock.getElapsedTime(); return; }
  tween = { fromPos: camera.position.clone(), fromTarget: camTarget.clone(), to, start: performance.now(),
    dur: 900 + Math.min(1700, camera.position.distanceTo(to.pos) * 55) };
}
function go(i) {
  i = Math.max(0, Math.min(ROOMS.length - 1, i));
  ensureRoom(i); // a visitor may jump to a room before its idle build ran
  current = i; activeCert = null;
  document.body.dataset.room = String(i);
  flyTo(i);
  document.querySelectorAll(".room").forEach((r) => { r.hidden = Number(r.dataset.room) !== i; });
  $("#panel").scrollTop = 0;
  document.querySelectorAll(".floor-map button").forEach((b) => b.setAttribute("aria-current", String(Number(b.dataset.go) === i)));
  document.querySelector(`.floor-map [data-go="${i}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
  document.body.classList.remove("sheet-open"); $("#sheet-toggle").setAttribute("aria-expanded", "false"); $("#sheet-toggle").textContent = L("readMore");
  $("#where-num").textContent = `0${i} / 0${ROOMS.length - 1}`;
  $("#where-name").textContent = roomName(i);
  $("#prev").disabled = i === 0; $("#next").disabled = i === ROOMS.length - 1;
  history.replaceState(null, "", `#${SLUGS[i]}`);
}
document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); go(Number(b.dataset.go)); }));
$("#prev").addEventListener("click", () => go(current - 1));
$("#sheet-toggle").addEventListener("click", () => {
  const open = document.body.classList.toggle("sheet-open");
  $("#sheet-toggle").setAttribute("aria-expanded", String(open));
  $("#sheet-toggle").textContent = open ? L("showRoom") : L("readMore");
  if (!open) $("#panel").scrollTop = 0;
});
$("#next").addEventListener("click", () => go(current + 1));
window.addEventListener("keydown", (e) => {
  if (!modal.hidden) { if (e.key === "Escape") closeModal(); return; }
  if (e.target.closest("input, textarea, select")) return;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(current + 1); }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(current - 1); }
});
let wheelLock = 0;
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (performance.now() < wheelLock || Math.abs(e.deltaY) < 8) return;
  wheelLock = performance.now() + 1200;
  go(current + (e.deltaY > 0 ? 1 : -1));
}, { passive: false });

// Picking
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
const tip = $("#tip");
function pick(e) {
  ptr.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  ray.setFromCamera(ptr, camera);
  const hit = ray.intersectObjects(clickables, false)[0];
  return hit && hit.distance < 22 ? hit.object : null;
}
canvas.addEventListener("pointermove", (e) => {
  hoverObj = pick(e);
  canvas.style.cursor = hoverObj ? "pointer" : "default";
  if (hoverObj) { tip.hidden = false; const tp = hoverObj.userData.tip; tip.textContent = typeof tp === "function" ? tp() : tp; tip.style.left = `${e.clientX}px`; tip.style.top = `${e.clientY}px`; }
  else tip.hidden = true;
});
canvas.addEventListener("pointerleave", () => { hoverObj = null; tip.hidden = true; });
canvas.addEventListener("click", (e) => {
  const o = pick(e);
  if (!o) return;
  const d = o.userData;
  if (d.project !== undefined) openProject(d.project);
  else if (d.go !== undefined) go(d.go);
  else if (d.cert) activeCert = activeCert === o ? null : o;
  else if (d.exp) {
    const el = document.getElementById(`exp-${d.exp}`);
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1400);
  }
});

// ---------------------------------------------------------------------------
// Loop
// ---------------------------------------------------------------------------
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.fov = isNarrow() ? 60 : 45;
  camera.updateProjectionMatrix();
  if (!tween) flyTo(current, true);
}
window.addEventListener("resize", resize);

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Adaptive quality: after a short warm-up, slow devices drop resolution, then bloom, then soft shadows
const quality = { bloom: true, level: 0 };
let fpsFrames = 0, fpsStart = 0;
function adapt(t) {
  if (quality.level >= 3 || tween) { fpsStart = t; fpsFrames = 0; return; }
  if (!fpsStart) fpsStart = t;
  fpsFrames++;
  if (t - fpsStart < 2) return;
  const fps = fpsFrames / (t - fpsStart); fpsStart = t; fpsFrames = 0;
  if (fps >= 45) { quality.level = 3; return; } // fast enough: stop measuring
  quality.level++;
  if (quality.level === 1) { renderer.setPixelRatio(1); composer.setPixelRatio(1); renderer.setSize(innerWidth, innerHeight, false); composer.setSize(innerWidth, innerHeight); }
  else if (quality.level === 2) quality.bloom = false;
  else { sun.shadow.mapSize.setScalar(512); sun.shadow.map?.dispose(); sun.shadow.map = null; }
}

function frame() {
  const t = clock.getElapsedTime();
  if (tween) {
    const k = Math.min(1, (performance.now() - tween.start) / tween.dur), e = ease(k);
    camera.position.lerpVectors(tween.fromPos, tween.to.pos, e);
    camera.position.y += Math.sin(k * Math.PI) * 1.0;
    camTarget.lerpVectors(tween.fromTarget, tween.to.target, e);
    if (k === 1) { tween = null; idleStart = t; }
  } else if (!reduce) {
    // Idle drift starts from zero, so there is no jump when a flight ends
    const base = view(current), s = t - idleStart, amp = Math.min(1, s / 3);
    const pan = current === 3 && isNarrow() ? Math.sin(s * 0.3) * 5.2 * amp : 0; // phones: sweep across all six pedestals
    camera.position.set(base.pos.x + pan + Math.sin(s * 0.25) * 0.25 * amp, base.pos.y + Math.sin(s * 0.33) * 0.08 * amp, base.pos.z);
    camTarget.set(base.target.x + pan, base.target.y, base.target.z);
  }
  camera.lookAt(camTarget);
  // keep the shadow light over the room being viewed
  sun.position.set(camTarget.x + 6, 14, 9); sun.target.position.set(camTarget.x, 0, -3);
  roomLight.position.x = camTarget.x;
  // only draw rooms near the camera
  for (let i = 0; i < ROOMG.length; i++) if (ROOMG[i]) ROOMG[i].visible = Math.abs(camera.position.x - i * SPACING) < SPACING * 1.4;
  animated.forEach((f) => f(t));
  if (quality.bloom) composer.render(); else renderer.render(scene, camera);
  adapt(t);
  requestAnimationFrame(frame);
}

(async () => {
  await fontsReady();
  const shadowFlags = (root) => root.traverse((o) => {
    if (!o.isMesh) return;
    const lit = !o.material.isMeshBasicMaterial && !o.material.transparent;
    o.castShadow = lit && !o.userData.noShadow;
    o.receiveShadow = lit;
  });
  const builders = [buildLobby, buildExecutive, buildLab, buildShowroom, buildAcademy, buildBoardroom];
  const start = Math.max(0, SLUGS.indexOf(location.hash.slice(1)));
  shadowFlags(scene); // building shell
  const buildRoom = (i) => { if (ROOMG[i]) return; builders[i](i * SPACING); shadowFlags(ROOMG[i]); };
  buildRoom(start);
  // the other rooms are built one per idle slot, nearest first, so the first room appears immediately
  const rest = [0, 1, 2, 3, 4, 5].filter((i) => i !== start).sort((a, b) => Math.abs(a - start) - Math.abs(b - start));
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 30));
  const next = () => { const i = rest.shift(); if (i === undefined) return; buildRoom(i); idle(next); };
  idle(next);
  ensureRoom = buildRoom;
  resize();
  // Arrive from the street: start outside and glide straight in
  camera.position.set(start * SPACING, 6.5, 26); camTarget.set(start * SPACING, 2, -4);
  go(start);
  frame();
})();
