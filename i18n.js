// Translations. English is the default; Arabic and French override it.
// Rule for Arabic (and French): skill names, company names, product names and technologies stay in English.
// Placeholders like %LOGOS0% are filled from the English page so logo and chip lists stay identical.

export const LANGS = ["en", "fr", "ar"];

export const STR = {
  en: {
    title: "Bairem Khedhri | The Digital Headquarters",
    desc: "Walk through the 3D headquarters of Bairem Khedhri, mobile and backend engineer, CTO and team lead.",
    canvas: "3D model of an office building with six rooms",
    rooms: ["Who I am", "Experience", "Skills", "Projects", "Education", "Contact"],
    floorAria: "Floor map", langAria: "Language", prev: "Previous room", next: "Next room",
    readMore: "Read more", showRoom: "Show the room", role: "Role", close: "Close",
    shotOf: "Screenshot of", sketchOf: "Sketch illustrating",
    to: "to", tipFloor: "Floor map: go to Experience", tipRead: "Read about", tipOpen: "Open",
    noWebgl: "This 3D portfolio needs WebGL, which this browser does not support. You can reach me at bairemkh@gmail.com.",
    // 3D scene
    signSub: "MOBILE AND BACKEND ENGINEER  ·  CTO  ·  TEAM LEAD",
    welcome: "Welcome to HQ", mind: "PLEASE MIND THE GLASS", floorMap: "FLOOR MAP",
    topExp: "TOP EXPERIENCE",
    axRole: "CTO AND CO-FOUNDER", axWhen: "Jul 2023 to now", axPWhen: "JUL 2023 TO NOW · ARIANA",
    ttRole: "MOBILE TEAM LEAD", ttWhen: "Jun to Dec 2022, Bangkok", ttPWhen: "JUN TO DEC 2022 · BANGKOK",
    axB: ["Mobile architecture", "Specs for the dev team", "Secure coding standards"],
    ttB: ["International team", "Sprints and code reviews", "Worked with CEO and CTO"],
    axP: ["Owns mobile architecture", "Leads devs and designers", "Sets code review standards"],
    ttP: ["Led an international team", "Ran sprints and reviews", "Shipped Android on time"],
    howLead: "HOW I LEAD", roadmap: "PRODUCT ROADMAP", rm: ["Discover", "Prototype", "Test", "Ship"],
    archTitle: "SKILLS  ·  TEAM, MOBILE, BACKEND", arch: ["Mobile", "API", "Security", "Data"],
    dataLayer: "DATA LAYER", projects: "PROJECTS",
    certified: "CERTIFIED", engDeg: "Engineering degree", bachDeg: "Bachelor's degree",
    csMobile: "Computer science, mobile", cs: "Computer science", certificate: "Certificate",
    trainer: "TRAINER", taught: "60+ students taught", interns: "80%+ secured internships",
    contact: "CONTACT", build1: "Let's build something", build2: "people actually use.",
  },
  fr: {
    title: "Bairem Khedhri | Le QG numérique",
    desc: "Visitez le QG en 3D de Bairem Khedhri, ingénieur mobile et backend, CTO et team lead.",
    canvas: "Modèle 3D d'un immeuble de bureaux avec six salles",
    rooms: ["Qui suis-je", "Expérience", "Compétences", "Projets", "Formation", "Contact"],
    floorAria: "Plan de l'étage", langAria: "Langue", prev: "Salle précédente", next: "Salle suivante",
    readMore: "Lire la suite", showRoom: "Voir la salle", role: "Rôle", close: "Fermer",
    shotOf: "Capture de", sketchOf: "Illustration de",
    to: "à", tipFloor: "Plan : aller à Expérience", tipRead: "En savoir plus sur", tipOpen: "Ouvrir",
    noWebgl: "Ce portfolio 3D nécessite WebGL, que ce navigateur ne prend pas en charge. Vous pouvez me joindre à bairemkh@gmail.com.",
    signSub: "INGÉNIEUR MOBILE ET BACKEND  ·  CTO  ·  TEAM LEAD",
    welcome: "Bienvenue au QG", mind: "ATTENTION À LA VITRE", floorMap: "PLAN DE L'ÉTAGE",
    topExp: "EXPÉRIENCES CLÉS",
    axRole: "CTO ET COFONDATEUR", axWhen: "Juil. 2023 à aujourd'hui", axPWhen: "JUIL. 2023 À AUJOURD'HUI · ARIANA",
    ttRole: "TEAM LEAD MOBILE", ttWhen: "Juin à déc. 2022, Bangkok", ttPWhen: "JUIN À DÉC. 2022 · BANGKOK",
    axB: ["Architecture mobile", "Specs pour l'équipe dev", "Standards de code sécurisé"],
    ttB: ["Équipe internationale", "Sprints et revues de code", "Avec le CEO et le CTO"],
    axP: ["Pilote l'architecture mobile", "Dirige devs et designers", "Fixe la revue de code"],
    ttP: ["Équipe internationale", "Sprints et revues animés", "Android livré à temps"],
    howLead: "MA FAÇON DE DIRIGER", roadmap: "ROADMAP PRODUIT", rm: ["Découvrir", "Prototyper", "Tester", "Livrer"],
    archTitle: "COMPÉTENCES  ·  ÉQUIPE, MOBILE, BACKEND", arch: ["Mobile", "API", "Sécurité", "Données"],
    dataLayer: "COUCHE DONNÉES", projects: "PROJETS",
    certified: "CERTIFIÉ", engDeg: "Diplôme d'ingénieur", bachDeg: "Licence",
    csMobile: "Informatique, mobile", cs: "Informatique", certificate: "Certificat",
    trainer: "FORMATEUR", taught: "Plus de 60 étudiants formés", interns: "Plus de 80 % en stage",
    contact: "CONTACT", build1: "Construisons quelque chose", build2: "que les gens utilisent vraiment.",
  },
  ar: {
    title: "Bairem Khedhri | المقر الرقمي",
    desc: "تجوّل في المقر ثلاثي الأبعاد لـ Bairem Khedhri، مهندس تطبيقات الهاتف والواجهات الخلفية، CTO وقائد فريق.",
    canvas: "نموذج ثلاثي الأبعاد لمبنى مكاتب من ست غرف",
    rooms: ["من أنا", "الخبرات", "المهارات", "المشاريع", "التعليم", "تواصل معي"],
    floorAria: "خريطة الطابق", langAria: "اللغة", prev: "الغرفة السابقة", next: "الغرفة التالية",
    readMore: "اقرأ المزيد", showRoom: "اعرض الغرفة", role: "الدور", close: "إغلاق",
    shotOf: "صورة من", sketchOf: "رسم توضيحي لـ",
    to: "إلى", tipFloor: "خريطة الطابق: انتقل إلى الخبرات", tipRead: "اقرأ عن", tipOpen: "افتح",
    noWebgl: "يتطلب هذا الموقع ثلاثي الأبعاد تقنية WebGL غير المدعومة في هذا المتصفح. يمكنك مراسلتي على bairemkh@gmail.com.",
    signSub: "مهندس تطبيقات الهاتف والواجهات الخلفية  ·  CTO  ·  قائد فريق",
    welcome: "مرحبا بك في المقر", mind: "انتبه للزجاج", floorMap: "خريطة الطابق",
    topExp: "أبرز الخبرات",
    axRole: "CTO وشريك مؤسس", axWhen: "يوليو 2023 حتى الآن", axPWhen: "يوليو 2023 حتى الآن · أريانة",
    ttRole: "قائد فريق تطبيقات الهاتف", ttWhen: "يونيو إلى ديسمبر 2022، بانكوك", ttPWhen: "يونيو إلى ديسمبر 2022 · بانكوك",
    axB: ["بنية تطبيقات الهاتف", "مواصفات لفريق التطوير", "معايير البرمجة الآمنة"],
    ttB: ["فريق دولي", "Sprints ومراجعات الكود", "العمل مع الـ CEO والـ CTO"],
    axP: ["بنية تطبيقات الهاتف", "قيادة المطورين والمصممين", "معايير مراجعة الكود"],
    ttP: ["قيادة فريق دولي", "إدارة الـ sprints والمراجعات", "تسليم Android في الموعد"],
    howLead: "أسلوبي في القيادة", roadmap: "خريطة طريق المنتج", rm: ["استكشاف", "نموذج أولي", "اختبار", "إطلاق"],
    archTitle: "المهارات  ·  الفريق، الهاتف، الواجهات الخلفية", arch: ["الهاتف", "API", "الأمان", "البيانات"],
    dataLayer: "طبقة البيانات", projects: "المشاريع",
    certified: "شهادة", engDeg: "شهادة مهندس", bachDeg: "إجازة",
    csMobile: "علوم الحاسوب، تطبيقات الهاتف", cs: "علوم الحاسوب", certificate: "شهادة",
    trainer: "مدرّب", taught: "أكثر من 60 طالبا", interns: "أكثر من 80% حصلوا على تدريب",
    contact: "تواصل", build1: "لنبنِ معا شيئا", build2: "يستخدمه الناس فعلا.",
  },
};

export const PROJ_TR = {
  fr: {
    uniworld: { status: "Sur Google Play, iOS en cours de validation sur l'App Store", quip: "Une app de rencontres où tout le monde a des examens.",
      desc: "Une application de rencontres et sociale réservée aux étudiants, avec matching et messagerie en temps réel via WebSockets, et un système sécurisé pour protéger les données avec JWT, chiffrement et données de réponse limitées.",
      role: "Ingénieur mobile et backend. Clients Android, iOS et Flutter, backend Node.js et MongoDB." },
    najahni: { quip: "Les devoirs, mais c'est l'app qui corrige.",
      desc: "Une application éducative native pour étudiants et enseignants : création de cours, quiz générés par IA, chat en temps réel, paiement en ligne et certificats délivrés par QR code.",
      role: "Ingénieur mobile. Android et iOS natifs." },
    onepass: { quip: "Vos mots de passe, sans les post-it.",
      desc: "Un coffre-fort sécurisé pour mots de passe et données personnelles, avec chiffrement, stockage local sécurisé, gestion rigoureuse des sessions et appels authentifiés par JWT vers un backend Spring Boot.",
      role: "Ingénieur mobile et backend. App Flutter et API Spring Boot." },
    crowdup: { quip: "Pour ceux dont l'agenda est surtout fait de soirées.",
      desc: "Une application sociale multiplateforme pour les amateurs d'événements : créer et partager des événements, réserver sa place, discuter en temps réel et entrer avec un billet QR code, sur une API REST Spring Boot documentée avec Swagger.",
      role: "Ingénieur mobile et backend dans une équipe Scrum pluridisciplinaire." },
    codemagician: { quip: "Dessinez un diagramme de classes, obtenez un backend.",
      desc: "Une application de bureau qui lit des images ou PDF de diagrammes de classes et génère un projet backend Node.js fonctionnel, faisant gagner des heures de mise en place. Sélectionné parmi les meilleurs projets sur 245 dans mon université.",
      role: "Ingénieur. Application de bureau et générateur de code Node.js." },
    togtog: { quip: "Essayez avant de regretter.",
      desc: "Une marketplace de vêtements propulsée par l'IA qui permet d'essayer virtuellement les tenues avant l'achat, pour rassurer et réduire les retours. Réalisée avec l'équipe TogTog.io à Bangkok.",
      role: "Team lead développement mobile. App Kotlin et backend Node.js." },
  },
  ar: {
    uniworld: { status: "متوفر على Google Play، ونسخة iOS قيد المراجعة في App Store", quip: "تطبيق تعارف حيث الجميع لديهم امتحانات.",
      desc: "تطبيق تعارف وتواصل اجتماعي مخصص للطلبة فقط، مع نظام توافق ومراسلة فورية عبر WebSockets، ونظام آمن لحماية بيانات المستخدمين بـ JWT والتشفير وتقليل البيانات المرسلة.",
      role: "مهندس تطبيقات الهاتف والواجهات الخلفية. تطبيقات Android وiOS وFlutter، وواجهة خلفية بـ Node.js وMongoDB." },
    najahni: { quip: "واجبات منزلية، لكن التطبيق هو من يصحح.",
      desc: "تطبيق تعليمي أصلي للطلبة والأساتذة: إنشاء الدروس، اختبارات مولّدة بالذكاء الاصطناعي، دردشة فورية، دفع إلكتروني، وشهادات تصدر برمز QR.",
      role: "مهندس تطبيقات الهاتف. Android وiOS بلغات أصلية." },
    onepass: { quip: "كلمات مرورك، بدون الأوراق اللاصقة.",
      desc: "خزنة آمنة لكلمات المرور والبيانات الشخصية، مع التشفير والتخزين المحلي الآمن وإدارة دقيقة للجلسات وطلبات موثّقة بـ JWT إلى واجهة خلفية Spring Boot.",
      role: "مهندس تطبيقات الهاتف والواجهات الخلفية. تطبيق Flutter وواجهة Spring Boot." },
    crowdup: { quip: "لمن يمتلئ جدولهم بالحفلات.",
      desc: "تطبيق اجتماعي متعدد المنصات لعشاق الفعاليات: أنشئ الفعاليات وشاركها، احجز مكانك، تحدث فوريا، وادخل بتذكرة برمز QR، على واجهة REST بـ Spring Boot موثّقة بـ Swagger.",
      role: "مهندس تطبيقات الهاتف والواجهات الخلفية ضمن فريق Scrum متعدد التخصصات." },
    codemagician: { quip: "ارسم مخطط أصناف، واحصل على واجهة خلفية.",
      desc: "تطبيق مكتبي يقرأ صور أو ملفات PDF لمخططات الأصناف ويولّد مشروع Node.js خلفيا جاهزا للعمل، موفرا على المطورين ساعات من الإعداد. اختير ضمن أفضل المشاريع من بين 245 مشروعا في جامعتي.",
      role: "مهندس. تطبيق مكتبي ومولّد كود Node.js." },
    togtog: { quip: "جرّبها قبل أن تندم.",
      desc: "متجر ملابس مدعوم بالذكاء الاصطناعي يتيح للمتسوقين تجربة الملابس افتراضيا قبل الشراء، لتعزيز الثقة وتقليل المرتجعات. بُني مع فريق TogTog.io في بانكوك.",
      role: "قائد فريق تطوير تطبيقات الهاتف. تطبيق Kotlin وواجهة خلفية Node.js." },
  },
};

// Room panels. Index matches data-room. %NAME% placeholders are filled from the English page.
export const ROOM_HTML = {
  fr: [
`<img class="portrait" src="img/profile.jpg" alt="Portrait de Bairem Khedhri" width="1264" height="842">
<p class="eyebrow">00 &middot; Qui suis-je</p>
<h2>Bienvenue dans mon univers. <em>Profitez de l'expérience.</em></h2>
<p>Je suis <strong>Bairem Khedhri</strong>. Je développe des applications Android, iOS et Flutter, les backends Node.js et Spring Boot avec lesquels elles communiquent, et je dirige les personnes qui les construisent avec moi. J'ai commencé par le multimédia et l'informatique, je me suis spécialisé dans le mobile pendant mon diplôme d'ingénieur, j'ai dirigé une équipe mobile à Bangkok, puis j'ai cofondé Appaxis Innovations, où je suis CTO. En chemin, j'ai formé plus de 60 étudiants à créer leurs propres applications. Visitez le bâtiment : expérience, compétences, projets, formation, et une salle d'où vous pouvez m'écrire.</p>
<ul class="hl">
  <li><b>Depuis 2022</b>je livre des applications mobiles et les API qui les font tourner</li>
  <li><b>CTO</b>et cofondateur d'Appaxis Innovations</li>
  <li><b>Team lead</b>d'une équipe mobile internationale à Bangkok</li>
  <li><b>Ouvert</b>à la mobilité, basé à Tunis</li>
</ul>
<h3>Langues</h3>
<ul class="langs">
  <li><b>Arabe</b><span>Langue maternelle</span></li>
  <li><b>Anglais</b><span>Professionnel</span></li>
  <li><b>Français</b><span>Parlé</span></li>
</ul>
<p class="muted">Sur la porte : ingénieur mobile et backend, CTO et team lead.</p>`,
`<p class="eyebrow red">01 &middot; Expérience</p>
<h2>Des équipes dirigées, des apps livrées, <em>des leçons retenues.</em></h2>
<div class="cred top" id="exp-appaxis"><p class="meta">Juil. 2023 à aujourd'hui &middot; Ariana, Tunisie</p><h4>Appaxis Innovations</h4><p class="role">Cofondateur, CTO et ingénieur mobile</p>
  <ul class="check">
    <li>Je pilote l'architecture mobile et les décisions de livraison, et je transforme les besoins métier en spécifications techniques précises pour l'équipe Flutter et backend.</li>
    <li>Je mène des cycles rapides de prototypage et de tests pour prioriser les fonctionnalités à forte valeur et garder les applications stables.</li>
    <li>Je dirige développeurs et designers sur les projets, et j'ai recruté et formé des stagiaires en informatique, design et marketing.</li>
    <li>J'ai défini les standards de l'équipe pour le code sécurisé, l'intégration d'API et la revue de code.</li>
  </ul></div>
<div class="cred"><p class="meta">2024 &middot; Béja et Siliana, Tunisie</p><h4>Tunisia Development Foundation</h4><p class="role">Formateur en développement mobile et backend</p>
  <ul class="check">
    <li>J'ai formé plus de 60 étudiants à Kotlin, Jetpack Compose, Flutter et Node.js, avec MVVM, Clean Architecture, Git et Scrum.</li>
    <li>Plus de 80 % d'entre eux ont décroché un stage.</li>
  </ul></div>
<div class="cred top" id="exp-togtog"><p class="meta">Juin 2022 à déc. 2022 &middot; Bangkok, Thaïlande</p><h4>TogTog.io</h4><p class="role">Team lead développement mobile</p>
  <ul class="check">
    <li>J'ai dirigé une équipe internationale de développeurs et de designers et livré des applications Android en production dans les délais.</li>
    <li>J'ai animé les sprints et les revues de code, et refactorisé pour la performance, la réactivité et la qualité.</li>
    <li>J'ai introduit MVVM et les design patterns, avec Kotlin, XML, Room et Retrofit.</li>
    <li>J'ai travaillé directement avec le CEO et le CTO sur des décisions stratégiques qui ont accéléré la croissance de la startup.</li>
  </ul></div>
<div class="cred"><p class="meta">2022 à aujourd'hui &middot; À distance</p><h4>Freelance</h4><p class="role">Développeur mobile et backend</p>
  <ul class="check">
    <li>CrowdUp : une application sociale Flutter pour les événements, avec chat en temps réel, réservations et billets QR code sur une API Spring Boot.</li>
    <li>OnePass : un coffre-fort de mots de passe sécurisé en Flutter, avec stockage chiffré et backend Spring Boot sécurisé par JWT.</li>
    <li>Ekri : une application de location de voitures en Tunisie, développée avec Flutter et des serveurs Node.js.</li>
  </ul></div>`,
`<p class="eyebrow">02 &middot; Compétences</p>
<h2>Diriger l'équipe, construire l'app, <em>faire tourner le serveur.</em></h2>
<h3>1 &middot; Leadership d'équipe</h3>
<p>Des spécifications claires, des revues de code honnêtes et des boucles de feedback courtes. Je traduis les besoins métier en quelque chose que les ingénieurs peuvent construire, puis je reste assez proche pour aider sans microgérer.</p>
<ul class="check">
  <li>J'ai dirigé des équipes mobiles chez TogTog.io et Appaxis Innovations, en travaillant directement avec les fondateurs sur la stratégie.</li>
  <li>Planification de sprints, Agile et Scrum, et la revue de code comme habitude d'équipe.</li>
  <li>Roadmaps produit et spécifications techniques rédigées à partir des besoins métier.</li>
  <li>Recrutement, formation et mentorat : plus de 60 étudiants formés, plus de 80 % ont décroché un stage.</li>
</ul>
%CHIPS0%
<h3>2 &middot; Développement mobile</h3>
<p>Applications natives et multiplateformes, publiées sur Google Play et l'App Store.</p>
%LOGOS0%
%CHIPS1%
<ul class="check">
  <li>Clean Architecture, MVVM et MVC, pour qu'un autre développeur s'y retrouve facilement.</li>
  <li>Coroutines et composants sensibles au cycle de vie pour garder le travail hors du thread principal et éviter les crashs.</li>
</ul>
<h3>3 &middot; Développement backend</h3>
<p>La plupart de mes applications parlent à une API que j'ai aussi construite.</p>
%LOGOS1%
<div class="cred"><p class="meta">Node.js &middot; Express &middot; MongoDB</p><p>Backends pour Unimatch et la marketplace TogTog. Code Magician génère des projets Node.js complets à partir de diagrammes de classes.</p></div>
<div class="cred"><p class="meta">Java &middot; Spring Boot &middot; Swagger</p><p>API REST pour OnePass, avec des appels authentifiés par JWT, et pour CrowdUp, avec réservations, chat en temps réel et billets QR.</p></div>
<div class="cred"><p class="meta">Temps réel et sécurité</p><p>Socket.io et WebSockets pour le chat en direct ; OAuth2, JWT, chiffrement et données de réponse limitées pour protéger les utilisateurs.</p></div>
%CHIPS2%
<h3>Livraison</h3>
%LOGOS2%`,
`<div>
  <p class="eyebrow red">03 &middot; Projets</p>
  <h2>De vraies apps <em>sur de vrais socles.</em></h2>
  <p>Cliquez sur un téléphone dans la salle, ou choisissez-en un ici.</p>
</div>
<div class="proj-list" id="proj-list"></div>`,
`<p class="eyebrow">04 &middot; Formation</p>
<h2>Diplômes, certificats <em>et beaucoup de marqueur à tableau.</em></h2>
<h3>Formation</h3>
<div class="cred"><p class="meta">Sept. 2021 à nov. 2024 &middot; Ariana</p><h4>ESPRIT</h4><p>Diplôme d'ingénieur en informatique, spécialité mobile. Équivalent master.</p></div>
<div class="cred"><p class="meta">Sept. 2018 à juin 2021 &middot; Manouba</p><h4>ISAMM, Institut Supérieur des Arts Multimédia de la Manouba</h4><p>Licence en informatique.</p></div>
<h3>Certificats</h3>
<ul class="check"><li>Certificat Java HackerRank</li><li>Certificat Problem Solving HackerRank</li></ul>
<h3>Enseignement et mentorat</h3>
<div class="cred"><p class="meta">2024 &middot; Béja et Siliana</p><h4>Tunisia Development Foundation</h4><p>Formateur en développement mobile et backend. J'ai formé plus de 60 étudiants à Kotlin, Jetpack Compose, Flutter et Node.js, avec MVVM, Clean Architecture, Git et Scrum. Plus de 80 % d'entre eux ont décroché un stage.</p></div>
<h3>Cursus</h3>
<ul class="chips"><li>Structures de données</li><li>Génie logiciel</li><li>Programmation système</li><li>Gestion de bases de données</li><li>UML</li><li>Gestion de projet</li><li>Développement web</li><li>Développement mobile</li></ul>`,
`<p class="eyebrow red">05 &middot; Contact</p>
<h2>Prenez une chaise. <em>La réunion sera courte.</em></h2>
<p>Ouvert aux postes en développement mobile et team lead, à la mobilité et aux projets intéressants.</p>
<form class="contact" id="contact">
  <label>Votre nom<input name="name" required autocomplete="name"></label>
  <label>Votre e-mail<input name="email" type="email" required autocomplete="email"></label>
  <label>De quoi s'agit-il ?
    <select name="topic"><option>Une offre d'emploi</option><option>Un projet</option><option>Autre chose</option></select>
  </label>
  <label>Message<textarea name="message" rows="4" required></textarea></label>
  <button class="btn btn-primary" type="submit">Envoyer l'e-mail</button>
  <p class="muted small">Cela ouvre votre propre application de messagerie avec le message prérempli. Rien n'est stocké sur ce site.</p>
</form>
<div class="links">
  <a class="btn btn-red" href="assets/Bairem-Khedhri-Resume.pdf" download>Télécharger le CV (PDF)</a>
  <a class="btn btn-ghost" href="mailto:bairemkh@gmail.com?subject=Planifier%20un%20appel">Planifier un appel</a>
</div>
<ul class="direct">
  <li><span>E-mail</span><a href="mailto:bairemkh@gmail.com">bairemkh@gmail.com</a></li>
  <li><span>Téléphone</span><a href="tel:+21650646989" dir="ltr">+216 50 646 989</a></li>
  <li><span>LinkedIn</span><a href="https://www.linkedin.com/in/bairem-khedhri/" target="_blank" rel="noopener">in/bairem-khedhri</a></li>
  <li><span>GitHub</span><a href="https://github.com/bairemkh" target="_blank" rel="noopener">bairemkh</a></li>
</ul>
<p class="muted small legal-links"><a href="privacy.html">Politique de confidentialité</a> &middot; <a href="terms.html">Conditions générales</a> &middot; &copy; <span id="year">2026</span> Bairem Khedhri</p>`,
  ],
  ar: [
`<img class="portrait" src="img/profile.jpg" alt="صورة Bairem Khedhri" width="1264" height="842">
<p class="eyebrow">00 &middot; من أنا</p>
<h2>مرحبا بك في عالمي. <em>استمتع بالتجربة.</em></h2>
<p>أنا <strong>Bairem Khedhri</strong>. أطوّر تطبيقات Android وiOS وFlutter، والواجهات الخلفية بـ Node.js وSpring Boot التي تتواصل معها، وأقود الفرق التي تبنيها معي. بدأت في الوسائط المتعددة وعلوم الحاسوب، ثم تخصصت في تطبيقات الهاتف خلال دراستي للهندسة، وقدت فريق تطوير في بانكوك، ثم شاركت في تأسيس Appaxis Innovations حيث أشغل منصب CTO. وخلال ذلك درّبت أكثر من 60 طالبا على بناء تطبيقاتهم الخاصة. تجوّل في المبنى: الخبرات، المهارات، المشاريع، التعليم، وغرفة يمكنك منها مراسلتي.</p>
<ul class="hl">
  <li><b>منذ 2022</b>أطلق تطبيقات الهاتف والواجهات البرمجية التي تشغّلها</li>
  <li><b>CTO</b>وشريك مؤسس في Appaxis Innovations</li>
  <li><b>قائد فريق</b>لفريق تطوير دولي في بانكوك</li>
  <li><b>منفتح</b>على الانتقال، مقيم في تونس</li>
</ul>
<h3>اللغات</h3>
<ul class="langs">
  <li><b>العربية</b><span>اللغة الأم</span></li>
  <li><b>الإنجليزية</b><span>مستوى مهني</span></li>
  <li><b>الفرنسية</b><span>محادثة</span></li>
</ul>
<p class="muted">اللقب على الباب: مهندس تطبيقات الهاتف والواجهات الخلفية، CTO وقائد فريق.</p>`,
`<p class="eyebrow red">01 &middot; الخبرات</p>
<h2>فرق قدتها، تطبيقات أطلقتها، <em>ودروس احتفظت بها.</em></h2>
<div class="cred top" id="exp-appaxis"><p class="meta">يوليو 2023 حتى الآن &middot; أريانة، تونس</p><h4>Appaxis Innovations</h4><p class="role">شريك مؤسس، CTO ومهندس تطبيقات الهاتف</p>
  <ul class="check">
    <li>أتولى قرارات بنية تطبيقات الهاتف والتسليم، وأحوّل متطلبات العمل إلى مواصفات تقنية دقيقة لفريق Flutter والواجهات الخلفية.</li>
    <li>أدير دورات سريعة من النماذج الأولية والاختبار لترتيب أولوية الميزات الأعلى قيمة والحفاظ على استقرار التطبيقات.</li>
    <li>أقود المطورين والمصممين عبر المشاريع، ووظّفت ودرّبت متدربين في تقنية المعلومات والتصميم والتسويق.</li>
    <li>وضعت معايير الفريق للبرمجة الآمنة وتكامل الواجهات البرمجية ومراجعة الكود.</li>
  </ul></div>
<div class="cred"><p class="meta">2024 &middot; باجة وسليانة، تونس</p><h4>Tunisia Development Foundation</h4><p class="role">مدرّب في تطوير تطبيقات الهاتف والواجهات الخلفية</p>
  <ul class="check">
    <li>درّست أكثر من 60 طالبا Kotlin وJetpack Compose وFlutter وNode.js، مع MVVM وClean Architecture وGit وScrum.</li>
    <li>حصل أكثر من 80% منهم على فرص تدريب.</li>
  </ul></div>
<div class="cred top" id="exp-togtog"><p class="meta">يونيو 2022 إلى ديسمبر 2022 &middot; بانكوك، تايلاند</p><h4>TogTog.io</h4><p class="role">قائد فريق تطوير تطبيقات الهاتف</p>
  <ul class="check">
    <li>قدت فريقا دوليا من المطورين والمصممين وسلّمت تطبيقات Android جاهزة للإنتاج في مواعيدها.</li>
    <li>أدرت الـ sprints ومراجعات الكود، وأعدت هيكلة الكود لتحسين الأداء والاستجابة والجودة.</li>
    <li>أدخلت MVVM وأنماط التصميم، مع Kotlin وXML وRoom وRetrofit.</li>
    <li>عملت مباشرة مع الـ CEO والـ CTO على قرارات استراتيجية سرّعت نمو الشركة الناشئة.</li>
  </ul></div>
<div class="cred"><p class="meta">2022 حتى الآن &middot; عن بعد</p><h4>عمل حر</h4><p class="role">مطور تطبيقات الهاتف والواجهات الخلفية</p>
  <ul class="check">
    <li>CrowdUp: تطبيق اجتماعي بـ Flutter للفعاليات، مع دردشة فورية وحجوزات وتذاكر برمز QR على واجهة Spring Boot.</li>
    <li>OnePass: خزنة آمنة لكلمات المرور بـ Flutter مع تخزين مشفّر وواجهة خلفية Spring Boot محمية بـ JWT.</li>
    <li>Ekri: تطبيق لكراء السيارات في تونس، مبني بـ Flutter وخوادم Node.js.</li>
  </ul></div>`,
`<p class="eyebrow">02 &middot; المهارات</p>
<h2>أقود الفريق، أبني التطبيق، <em>وأشغّل الخادم.</em></h2>
<h3>1 &middot; قيادة الفريق</h3>
<p>مواصفات واضحة، مراجعات كود صادقة، وحلقات تغذية راجعة قصيرة. أترجم احتياجات العمل إلى ما يستطيع المهندسون بناءه، ثم أبقى قريبا بما يكفي للمساعدة دون إدارة تفصيلية.</p>
<ul class="check">
  <li>قدت فرق تطوير تطبيقات الهاتف في TogTog.io وAppaxis Innovations، بالعمل مباشرة مع المؤسسين على الاستراتيجية.</li>
  <li>تخطيط الـ sprints، وAgile وScrum، ومراجعة الكود كعادة للفريق.</li>
  <li>خرائط طريق المنتج ومواصفات تقنية مكتوبة انطلاقا من متطلبات العمل.</li>
  <li>التوظيف والتدريب والإرشاد: أكثر من 60 طالبا، وحصل أكثر من 80% منهم على فرص تدريب.</li>
</ul>
%CHIPS0%
<h3>2 &middot; تطوير تطبيقات الهاتف</h3>
<p>تطبيقات أصلية ومتعددة المنصات، منشورة على Google Play وApp Store.</p>
%LOGOS0%
%CHIPS1%
<ul class="check">
  <li>Clean Architecture وMVVM وMVC، حتى يجد أي مطور آخر طريقه بسهولة.</li>
  <li>Coroutines ومكونات واعية بدورة الحياة لإبعاد العمل عن الخيط الرئيسي وتجنب الأعطال.</li>
</ul>
<h3>3 &middot; تطوير الواجهات الخلفية</h3>
<p>معظم تطبيقاتي تتواصل مع واجهة برمجية بنيتها أنا أيضا.</p>
%LOGOS1%
<div class="cred"><p class="meta">Node.js &middot; Express &middot; MongoDB</p><p>واجهات خلفية لـ Unimatch ولمتجر TogTog. ويولّد Code Magician مشاريع Node.js كاملة من مخططات الأصناف.</p></div>
<div class="cred"><p class="meta">Java &middot; Spring Boot &middot; Swagger</p><p>واجهات REST لـ OnePass مع طلبات موثّقة بـ JWT، ولـ CrowdUp مع الحجوزات والدردشة الفورية وتذاكر QR.</p></div>
<div class="cred"><p class="meta">الوقت الفعلي والأمان</p><p>Socket.io وWebSockets للدردشة المباشرة، وOAuth2 وJWT والتشفير وتقليل البيانات المرسلة لحماية المستخدمين.</p></div>
%CHIPS2%
<h3>التسليم</h3>
%LOGOS2%`,
`<div>
  <p class="eyebrow red">03 &middot; المشاريع</p>
  <h2>تطبيقات حقيقية <em>على منصات حقيقية.</em></h2>
  <p>اضغط على هاتف في الغرفة، أو اختر واحدا من هنا.</p>
</div>
<div class="proj-list" id="proj-list"></div>`,
`<p class="eyebrow">04 &middot; التعليم</p>
<h2>شهادات ودبلومات <em>وكثير من أقلام السبورة.</em></h2>
<h3>التعليم</h3>
<div class="cred"><p class="meta">سبتمبر 2021 إلى نوفمبر 2024 &middot; أريانة</p><h4>ESPRIT</h4><p>شهادة مهندس في علوم الحاسوب، تخصص تطبيقات الهاتف. تعادل شهادة الماجستير.</p></div>
<div class="cred"><p class="meta">سبتمبر 2018 إلى يونيو 2021 &middot; منوبة</p><h4>ISAMM</h4><p>إجازة في علوم الحاسوب.</p></div>
<h3>الشهادات</h3>
<ul class="check"><li>شهادة Java من HackerRank</li><li>شهادة Problem Solving من HackerRank</li></ul>
<h3>التدريس والإرشاد</h3>
<div class="cred"><p class="meta">2024 &middot; باجة وسليانة</p><h4>Tunisia Development Foundation</h4><p>مدرّب في تطوير تطبيقات الهاتف والواجهات الخلفية. درّست أكثر من 60 طالبا Kotlin وJetpack Compose وFlutter وNode.js، مع MVVM وClean Architecture وGit وScrum. وحصل أكثر من 80% منهم على فرص تدريب.</p></div>
<h3>المواد الدراسية</h3>
%COURSE%`,
`<p class="eyebrow red">05 &middot; تواصل معي</p>
<h2>تفضل بالجلوس. <em>الاجتماع سيكون قصيرا.</em></h2>
<p>منفتح على وظائف تطوير تطبيقات الهاتف وقيادة الفرق، وعلى الانتقال والمشاريع المثيرة للاهتمام.</p>
<form class="contact" id="contact">
  <label>اسمك<input name="name" required autocomplete="name"></label>
  <label>بريدك الإلكتروني<input name="email" type="email" required autocomplete="email" dir="ltr"></label>
  <label>ما الموضوع؟
    <select name="topic"><option>فرصة عمل</option><option>مشروع</option><option>موضوع آخر</option></select>
  </label>
  <label>الرسالة<textarea name="message" rows="4" required></textarea></label>
  <button class="btn btn-primary" type="submit">أرسل بريدا</button>
  <p class="muted small">سيفتح هذا تطبيق البريد لديك مع رسالتك جاهزة. لا يُخزَّن أي شيء على هذا الموقع.</p>
</form>
<div class="links">
  <a class="btn btn-red" href="assets/Bairem-Khedhri-Resume.pdf" download>تحميل السيرة الذاتية (PDF)</a>
  <a class="btn btn-ghost" href="mailto:bairemkh@gmail.com?subject=%D9%85%D9%88%D8%B9%D8%AF%20%D9%85%D9%83%D8%A7%D9%84%D9%85%D8%A9">حجز مكالمة</a>
</div>
<ul class="direct">
  <li><span>البريد الإلكتروني</span><a href="mailto:bairemkh@gmail.com" dir="ltr">bairemkh@gmail.com</a></li>
  <li><span>الهاتف</span><a href="tel:+21650646989" dir="ltr">+216 50 646 989</a></li>
  <li><span>LinkedIn</span><a href="https://www.linkedin.com/in/bairem-khedhri/" target="_blank" rel="noopener" dir="ltr">in/bairem-khedhri</a></li>
  <li><span>GitHub</span><a href="https://github.com/bairemkh" target="_blank" rel="noopener" dir="ltr">bairemkh</a></li>
</ul>
<p class="muted small legal-links"><a href="privacy.html">سياسة الخصوصية</a> &middot; <a href="terms.html">الشروط والأحكام</a> &middot; &copy; <span id="year">2026</span> Bairem Khedhri</p>`,
  ],
};
