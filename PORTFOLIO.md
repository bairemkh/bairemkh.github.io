# Bairem Khedhri Portfolio: Project Notes

Everything about this site in one place: content, design decisions, files, and the launch checklist.

## Files

| File | What it is |
|------|-----------|
| `index.html` | The Digital Headquarters: 3D building with a lobby and 5 rooms (main site) |
| `hq.js` | The 3D building, room furniture, camera travel, clicking, contact form |
| `hq.css` | HUD, glass panels, modal, entrance screen |
| `assets/Bairem-Khedhri-Resume.pdf` | Copy of "bairem kh resume 2026.pdf" for the download button |
| `privacy.html` | Privacy policy page |
| `terms.html` | Terms and conditions page |
| `favicon.svg` | Favicon (glass phone mark on pine) |
| `img/*.svg` | Hand-drawn style illustrations, one per project and role |
| `img/profile-placeholder.svg` | Placeholder for your photo |

Run locally: `python3 -m http.server 8765` in this folder, then open http://localhost:8765. It is a plain static site, so it deploys to GitHub Pages, Netlify, Vercel or Cloudflare Pages with no build step.

## Design rules (from the brief)

Never use: gradients, pill-shaped buttons, fake reviews, fake metrics, vague hero text, emoji icons, em dashes, over-the-top scroll animations, AI stock photos, AI slop copy, cursor animations, fake customer counters.

Style base: "User Interviews" field-notes language, adapted to a dark theme.

- Canvas: dark pine `#0b1516`. Text `#e4f0f1`, secondary text `#a2cbcd`.
- Accents: deep teal `#1c5d5f` (primary button), red `#c2413b` (secondary color and button, hover `#a3332e`), soft red `#ef8a80` for accents and text on dark, sage `#65b8a2`.
- Illustrations sit on light paper colors (`#f2e8e2` blush, `#e4f0f1` mint) so they read like field-note pages floating in the dark. Line work in `#231e21`.
- Type: Source Serif 4 for headlines (substitute for P22 Mackinac), DM Sans for body (substitute for Sofia Pro), IBM Plex Mono uppercase for eyebrows. All Google Fonts.
- Buttons: 10px radius, not pills (the brief bans pill buttons, which overrides the style guide).
- Liquid glass: `backdrop-filter: blur(22px) saturate(170%)`, translucent fill, hairline border and inset highlights. No gradients.
- 3D: Three.js 0.160.0 scene behind the page.
  - The phone has a metal frame, a teal glass back, a three-lens camera bump with flash, side buttons, a Dynamic Island-style cutout and a red ring mark on the back.
  - Its screen is drawn live on a canvas, with 4 app screens: Hello, Experience, Work, Say hello. The phone does a full turn between sections and swaps screens while its back faces you.
  - Glass companions: a torus knot, an icosahedron and a ring follow scroll keyframes.
  - 12 drifters (6 glass app icons, sphere, capsule, octahedron, torus, dodecahedron, cone) rise past the page at different depths and speeds.
- Cards: as they enter the viewport they tilt up from 16deg, lift and scale in, a red top edge draws across, and illustrations parallax inside their frames. On hover they show a red hairline border. Driven by `--p` and `--s` CSS variables set in `main.js`.
- Scroll reveal: elements fade, unblur and lift 28px once. All motion is disabled for `prefers-reduced-motion`.

## Content (source: "bairem kh resume 2026.pdf", the newest resume)

**Name:** Bairem Khedhri. **Title:** Mobile engineer, Flutter developer. **Location:** Tunis, Tunisia, open to relocation.
**Contact:** bairemkh@gmail.com, linkedin.com/in/bairem-khedhri, github.com/bairemkh. (Phone number intentionally left off the website.)

### Headlines used
- Hero: "I talk to phones. They mostly listen."
- Work: "Things I built that didn't stay in a repo."
- Experience: "Where I've been pushing to main."
- Skills: "What's in the backpack. It's heavy."
- About: "Part engineer, part teacher, full-time debugger."
- Contact: "Got an app idea? I've got a charger."

### Facts strip (real numbers only)
3 years as CTO (Jul 2023 to now), 2 companies leading mobile teams (TogTog.io, Appaxis), 60+ students trained, 80%+ landed internships, 4 mobile languages.

### Page order
Hero, facts strip, Experience (featured TogTog team lead card first), Work, Toolbox, About, Contact.

### Experience
- **Appaxis Innovations**, Ariana. Co-founder, CTO and mobile engineer. Jul 2023 to now.
- **Tunisia Development Foundation**, Béja and Siliana. Mobile and backend trainer. 2024. Taught 60+ students, 80%+ got internships.
- **Freelance**, remote, 2022 to now. Mobile and backend developer: CrowdUp, OnePass, Ekri (car rental app for Tunisia, Flutter + Node.js). Listed in Experience without highlighting.
- **TogTog.io**, Bangkok. Mobile development team lead. Jun 2022 to Dec 2022. Featured card with four points: led the people, ran the process, set the architecture, sat at the big table.

### Projects
- **Unimatch** (2025 to 2026): student dating/social app. On Google Play, iOS in App Store review.
- **Najahni** (2025 to 2026): education app, AI quizzes, chat, payments, QR certificates.
- **OnePass** (2025): secure password vault, Flutter + Spring Boot + JWT.
- **CrowdUp** (2023): events social app with QR ticketing and chat.
- **Code Magician** (2022): class diagram to Node.js backend generator.
- **TogTog Marketplace** (2022): AI clothing marketplace with virtual try-on.

### Education
- ESPRIT, engineering degree in computer science, mobile specialisation, 2021 to 2024.
- ISAMM Manouba, bachelor's in computer science, 2018 to 2021.

## Things your three resumes disagree on (please confirm)
These were left vague or excluded on the site on purpose, so nothing on it is wrong:
1. Code Magician ranking: "top 5 of 245" (2026 resume) vs "top 18 of 245" (older). Site says "among the top projects out of 245".
2. Code Magician date: Dec 2022 vs June 2023. Site says 2022.
3. Unimatch date: 2025 to 2026 vs September 2024. Site uses 2025 to 2026.
4. Trainer dates: Jan 2024 to Feb 2025 vs Feb 2024 to Dec 2024. Site says 2024.
5. Team sizes ("10+", "30+", "40+") and estimated metrics ("10,000 users", "8% retention", "15% revenue", "30% productivity") were excluded because the resumes call them estimates or disagree.

## Launch checklist (do not launch until all are ticked)
- [ ] Connect a custom domain (buy one, e.g. bairemkhedhri.com, and point it at your host; for GitHub Pages add a `CNAME` file with the domain)
- [x] Favicon added (`favicon.svg`)
- [x] No "Made with AI" tag anywhere
- [x] Privacy policy page (`privacy.html`)
- [x] Terms and conditions page (`terms.html`)
- [ ] Replace `img/profile-placeholder.svg` with your photo (`img/profile.jpg`, about 800x960) and update the `src` in the About section
- [ ] Confirm the five resume conflicts above
- [ ] Add store links for Unimatch once you want them public
- [ ] Update the "Last updated" date on the legal pages if they change

## The Digital Headquarters (3D version, index.html)

Concept: visitors walk through a modern glass office building. Each room covers one part of the career. Content follows the resumes only. The sample numbers from the concept template (40% faster loads, 100K users, 3.8 to 4.7 stars, team of 4, 80% test coverage, X% deployment efficiency) and things not on the resumes (React Native, GraphQL, Firebase, Riverpod, Redux, Fastlane, Bitrise, Docker, Scrum Master or cloud certifications, conference talks) were left out on purpose.

### How it works
- Built with vanilla Three.js 0.160.0 from jsDelivr, so there is no build step. Everything is made in code, with no GLB models to download.
- Visitors land directly inside: the camera glides in from the street to the first room (or the room in the URL hash). There is no entrance screen.
- Procedural textures drawn on canvas: terrazzo floor, vertical wood-slat walls, ceiling panels, walnut wood grain, veined stone, woven fabric for seating, frosted manifestation bands on the glass partitions.
- Lighting: soft shadows from a key light that follows the current room, room point lights, ceiling light lines, pendants, glowing skirting lines, floating dust. Bloom post-processing makes the light strips, LEDs and screens glow.
- Rooms sit side by side 22 units apart, divided by glass partitions with metal mullions. Every room has ceiling light strips and a colored skirting light.
- The camera flies between rooms with eased motion and a small lift. It drifts slowly while idle. Reduced-motion users get instant cuts.
- Navigation: entrance screen, floor map in the top bar, arrow keys, previous/next buttons, mouse wheel over the 3D view, and the clickable floor-map kiosk in the lobby. The URL hash remembers the room (#lobby, #executive, #lab, #showroom, #academy, #boardroom).
- Text for each room lives in HTML in a glass side panel, so it stays readable and accessible. On phones it becomes a bottom sheet.

### Rooms
| # | Room | 3D content | Panel content |
|---|------|-----------|---------------|
| 00 | Lobby | Name sign, reception desk with rotating red ring, floor-map kiosk, sofa, plants | Welcome, highlights (since 2022, CTO, team lead, open to relocation) |
| 01 | Executive suite | Sprint board wall display, desk with monitor and laptop, strategy board easel with method badges, lounge | Leadership style, TogTog.io team lead, Appaxis CTO, strategy board skills |
| 02 | Mobile and backend lab | Wall-sized system architecture (Mobile, API, Security, Data). Mobile side: test bench with 3 floating phones and a Kotlin/Dart workstation. Backend side: workstation with Express auth route, Spring Boot controller and server log; 3 server racks with blinking LEDs; database stack; glowing data packets travelling phone to API to database | Backend first: Node.js/Express/MongoDB, Spring Boot, real-time, security, then mobile, delivery, standards |
| 03 | Project showroom | 6 phones on lit pedestals in a row, all in view. Hover lifts a phone, click opens the project. On phones the camera slowly sweeps across them | Panel sits below the pedestals as a strip of 6 project cards. Opens a modal with illustration, description, role and stack |
| 04 | Academy | Bookshelves, 4 framed certificates that light up and come forward on hover or click, teaching whiteboard, reading desk with lamp | ESPRIT, ISAMM, 2 HackerRank certificates, trainer role, coursework |
| 05 | Boardroom | Long table, 8 chairs, holographic terminal, wall screen with contact details | Contact form, resume download, schedule a call, email, phone, LinkedIn, GitHub, legal links |

### Contact form
There is no backend. The form opens the visitor's own email app with the subject and message filled in, and the privacy policy says so. To receive messages directly instead, connect a form service such as Formspree and update the privacy policy.

### Still to do for the HQ
- [ ] "Schedule a call" currently opens an email. If you get a Calendly (or similar) link, replace the `mailto:` on that button in `index.html`.
- [ ] Phone number +216 50 646 989 is shown in the boardroom because the concept asked for it. Remove that line if you would rather keep it private.
- [ ] Confirm "Hired and trained interns and developers across IT, design and marketing" (from the older resume) is still how you want it described.

### Room order (current)
| # | Room | URL | Panel content |
|---|------|-----|---------------|
| 00 | Who I am | #about | Intro, career story, highlights |
| 01 | Experience | #experience | Appaxis Innovations (CTO), Tunisia Development Foundation (trainer), TogTog.io (team lead) |
| 02 | Skills | #skills | 1 Team leadership, 2 Mobile, 3 Backend, then delivery tools |
| 03 | Projects | #projects | 6 phones on pedestals, card strip below, modal per project |
| 04 | Education | #education | ESPRIT, ISAMM, HackerRank certificates, teaching, coursework |
| 05 | Contact | #contact | Form that opens an email to bairemkh@gmail.com, resume download, direct links |

The 3D rooms keep their furniture (sprint board for Experience, the lab for Skills, pedestals for Projects, library for Education, boardroom for Contact). Readable sizes: panel body 17px, project cards with 96px images and 18px titles, larger 3D plaques and phone screen titles.

LinkedIn (linkedin.com/in/bairem-khedhri) could not be read because it requires signing in. Paste the headline and About section to add them.

### Photos
- `img/profile.jpg`: your portrait. Used in the "Who I am" panel, and in the hanging frame above the 3D figure in the lobby.
- Lobby: a stylised 3D figure (black blazer, white tee, dark hair and beard) sits on the reception desk; the framed portrait hangs above him.
- Project photo slots: Unimatch, OnePass and Code Magician have a `photo` field in `PROJECTS` at the top of `hq.js`, currently random placeholder images from picsum.photos. Replace each URL with your own file, for example `img/projects/onepass.jpg`. The photo shows on the project card, in the project window, and on the 3D phone screen. Projects without a `photo` keep their illustration.
- [ ] Replace the three placeholder photos before launch (they are random stock images from the web).

### Logos and languages
- Technology logos: `img/tech/*.svg`, downloaded from Devicon v2.16.0 (MIT licence, logos belong to their owners). Used as floating 3D tiles in the Skills lab (Flutter, Kotlin, Swift, Compose, Dart, Android on the bench; Node.js, Spring, MongoDB above the racks; Express, Socket.io, Java by the database) and as logo grids in the Skills panel.
- Company logos: save them as `img/logos/appaxis.png` and `img/logos/togtog.png`. The 3D tiles in the Experience room load them automatically; until then they show the company name. (appaxis.com is a different company in Cincinnati and togtog.io now points to an unrelated site, so no logo was taken from the web.)
- Languages (Who I am): Arabic native, English professional, French spoken.
- [ ] Add the two company logo files.
- [ ] Project photos for Najahni (students learning), TogTog (e-commerce app) and CrowdUp (friends at a party) still to be chosen.

### 3D logo tiles and phone layout
- Logo tiles: tinted glass body in the brand colour, glowing brand-colour rim (blooms), white face card with the logo on both sides, drawn at 1024px. Brand colours live in `BRAND` in `hq.js`.
- Phones (under 860px wide): the room text is a compact bottom sheet with a "Read more" handle that expands it and "Show the room" to collapse it. The camera frames each room's centrepiece above the sheet. The floor map scrolls the current room into view. The portrait photo in the panel only shows when the sheet is expanded, since the 3D frame already shows it. Shadow maps are smaller on phones for speed.

### Low-poly character
`makeCharacter()` in `hq.js`: faceted, jointed figure (white tee, navy jeans, dark shoes, short dark hair, trimmed beard), posed with `POSES`.
| Room | Pose |
|------|------|
| Who I am | sitting on the reception desk, portrait hanging above |
| Experience | standing beside the TogTog monument, gesturing, clear of the boards |
| Skills | sitting at the backend desk, typing |
| Projects | not shown |
| Education | standing beside the whiteboard, presenting |
| Contact | sitting on the edge of the conference table |

### Materials
Less reflective: matte standard materials with lower environment reflections, clearcoat removed from floor, wood, stone and logo faces, softer bloom. Generated normal maps add relief to floor tiles, wall slat grooves, wood grain, seat fabric weave and stone.


## Languages (English, French, Arabic)
The 2D version (classic.html, styles.css, main.js) has been removed. The 3D headquarters is the only site.

- Header switch: EN, FR, عربي. English is the default; the choice is saved in the browser (localStorage key `lang`) and also works with `?lang=fr` or `?lang=ar` in the URL. Privacy and terms pages use the same choice and have their own switch.
- `i18n.js` holds every translation:
  - `STR`: interface text and every label drawn in the 3D scene (room signs, lobby sign, floor map, experience boards and plaques, skills wall, data layer label, projects title, certificates, whiteboard, contact wall, tooltips).
  - `PROJ_TR`: project status, tagline, description and role.
  - `ROOM_HTML`: the six room panels in French and Arabic. `%LOGOS0%`, `%CHIPS1%`, `%COURSE%` and similar placeholders are filled from the English page so logo and skill lists stay identical.
- Switching is instant: panels are swapped, and 3D textures that carry text are redrawn in place (`ltex` / `relabel3D` in hq.js), so the camera and room stay where they are.
- Arabic: right-to-left layout, Noto Kufi Arabic for headings and IBM Plex Sans Arabic for text (loaded only when needed), no letter-spacing or forced capitals. Skill names, company names, product names and technologies stay in English, as do the brand name and contact details.
- If WebGL is missing, a translated message with the email address is shown instead of the old redirect to the 2D page.

### Project splash screens
Each project phone shows a splash screen built in `makeSplash()` (hq.js); the same image is used on the project cards and in the project window. Each project has its own `accent` colour (pedestal ring and light, phone back, plaque, card and window border, tagline).
| Project | Background | Mark | Accent |
|---------|-----------|------|--------|
| Unimatch (was Uni-World) | orange to peach gradient | white "U" taken from `img/projects/unimatch-src.png` | #ff6a3d |
| Najahni | white | `img/projects/najahni.png` | #5b4fd8 |
| OnePass | blue #0b3fa0 | drawn keyhole + "OnePass" (the 1Password logo was not used: it belongs to AgileBits) | #2f7cf6 |
| CrowdUp | pink red #e8365d | white "C" + "CrowdUp" | #e8365d |
| Code Magician | black, light lavender disc behind the logo for contrast | `img/projects/codemagician.png` | #9b4ff0 |
| TogTog Marketplace | the logo's own off-white | `img/projects/togtog.png` | #1f8a8c |
The temporary picsum.photos photos are gone.

### Performance
- Rooms are built lazily: the room in the URL (or Who I am) is built first and shown at once; the other five are built one per idle moment, nearest first. Jumping to a room that isn't built yet builds it on the spot.
- Only rooms near the camera are drawn.
- One room light follows the visitor instead of six fixed lights plus three local ones (fewer lights means cheaper surfaces).
- Books are one instanced draw call per shelf instead of about 80 separate objects.
- Adaptive quality: if a device runs below 45 fps after a short warm-up, it lowers resolution, then turns off bloom, then lowers shadow detail.
- three.js modules are preloaded in parallel (`modulepreload` placed after the import map; before it, the module names cannot resolve).
- Images resized: project logos to 512px or less, portrait to 1000px.
