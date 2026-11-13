/* Tahan Group: language switch (EN/AR + RTL), header, service router, filters, order + quote forms */
(() => {
  /* ============================================================
     CONFIG: replace these with the client's real details.
     Every phone / WhatsApp / email link on the page reads from here.
     ============================================================ */
  const CONFIG = {
    phone: '+96176642506',            // temporary number from the client (Lebanon); confirm it is final
    phoneDisplay: '+961 76 642 506',  // how it should look on the page
    whatsapp: '96176642506',          // assumed same as the phone: confirm it has WhatsApp
    email: 'info@tahangroup.com',     // TODO real email once the domain is bought
  };

  const root = document.documentElement;
  // Audit fix switches live in assets/js/fixes.js; FX(n) is false if that file is missing
  const FX = n => !!(window.TAHAN_FX && window.TAHAN_FX(n));
  root.classList.remove('no-js');

  // Wire contact links from CONFIG
  document.querySelectorAll('[data-tel]').forEach(a => a.href = 'tel:' + CONFIG.phone);
  document.querySelectorAll('[data-phone-text]').forEach(el => el.textContent = CONFIG.phoneDisplay);
  document.querySelectorAll('[data-wa]').forEach(a => a.href = 'https://wa.me/' + CONFIG.whatsapp);
  document.querySelectorAll('[data-mail]').forEach(a => a.href = 'mailto:' + CONFIG.email);
  document.querySelectorAll('[data-mail-text]').forEach(el => el.textContent = CONFIG.email);

  /* ---------------- i18n ---------------- */
  const AR = {
    'skip': 'انتقل إلى المحتوى',
    'top.orders': 'طلبات المحروقات في البقاع',
    'nav.petroleum': 'توصيل المحروقات', 'nav.lubricant': 'الزيوت', 'nav.pl': 'التعبئة للغير',
    'nav.plast': 'العبوات', 'nav.about': 'من نحن', 'nav.quote': 'اطلب عرض سعر', 'nav.order': 'اطلب محروقات',
    'mm.d1': 'مازوت وبنزين للمنازل والشركات', 'mm.d2': 'زيوت محركات وزيوت صناعية من إنتاجنا',
    'mm.d3': 'علامتك التجارية على زيتنا وعبواتنا', 'mm.d4': 'عبوات PET و HDPE وغالونات ومرطبانات', 'mm.d5': 'شركة عائلية منذ 1985',

    'pf.primary': 'اطلب المحروقات', 'pf.secondary': 'اطلب عرض سعر',
    'hero.title': 'محروقات وزيوت وعبوات، من البقاع منذ 1985.',
    'hero.lead': 'ثلاث شركات عائلية تخدم المنازل والشركات والعلامات التجارية في لبنان ومصر والعراق.',
    'proof.1': 'شركة عائلية منذ 1985', 'proof.2': 'مصنع زيوت خاص بنا', 'proof.3': 'زيوتنا تُباع في 3 دول',

    'r.title': 'ماذا تحتاج؟',
    'r.t1': 'توصيل محروقات', 'r.t2': 'زيوت وتعبئة للغير', 'r.t3': 'عبوات بلاستيك',
    'r.p1': 'نوصل المحروقات إلى المنازل والشركات والمؤسسات في أكثر من 17 بلدة في البقاع.',
    'r.p1a': 'اطلب عبر الموقع أو الهاتف أو واتساب', 'r.p1b': 'منازل وشركات ومؤسسات',
    'r.c1': 'اطلب محروقات', 'r.call': 'اتصل بنا',
    'r.p2': 'زيوت تشحيم من مصنعنا الخاص، وتعبئة باسم علامتك التجارية.',
    'r.p2a': 'تعبئة للغير', 'r.p2b': 'خدمة تكرير الزيوت', 'r.p2c': 'تصدير إلى مصر والعراق',
    'r.c2': 'اطلب عرض سعر', 'r.c2b': 'كيف تعمل التعبئة للغير',
    'r.p3': 'عبوات PET و HDPE بأشكال وأحجام وسعات متعددة.',
    'r.p3a': 'قناني وغالونات ومرطبانات', 'r.p3b': 'أشكال خاصة عند الطلب', 'r.c3b': 'شاهد العبوات',

    'facts.1': 'سنة التأسيس في البقاع', 'facts.2': 'بلدة نوصل إليها المحروقات',
    'facts.3': 'شركات ضمن المجموعة', 'facts.4': 'دول تشتري زيوتنا',

    'div.title': 'ثلاث شركات، واسم عائلة واحد.',
    'div.p.name': 'الطحان للمحروقات', 'div.p.alt': 'Tahan Petroleum',
    'div.for1': 'للمنازل والشركات والمؤسسات', 'div.p.desc': 'مازوت وبنزين للمنازل والشركات والمؤسسات في أكثر من 17 بلدة في البقاع.',
    'div.l.name': 'الطحان للزيوت', 'div.l.alt': 'Tahan Lubricant',
    'div.for2': 'للعلامات التجارية والموزّعين والكاراجات', 'div.l.desc': 'نُنتج ونخلط ونعبّئ ونعيد تكرير الزيوت في مصنعنا، ونبيعها في لبنان ومصر والعراق.',
    'div.pl.name': 'الطحان للبلاستيك', 'div.pl.alt': 'Tahan Plast',
    'div.for3': 'للمصانع وشركات التعبئة', 'div.pl.desc': 'عبوات PET و HDPE بأشكال وأحجام وسعات متعددة.',
    'div.soon': 'شركة رابعة في الطريق.',
    'lub.brands': 'أنواع الزيوت',
    'ww.label': 'مع من نعمل', 'ww.sub': 'شركات نتعامل معها',
    'ww.text': 'تتعامل الطحان للمحروقات مع كبرى شركات المحروقات والغاز في لبنان، لتبقى المنازل والشركات في البقاع مزوّدة بما تحتاجه.',
    'co.label': 'شركاتنا', 'co.p1': 'مازوت', 'co.p2': 'بنزين', 'co.p3': 'توصيل للمنازل',
    'co.l1': 'إنتاج', 'co.l2': 'إعادة تكرير', 'co.l3': 'تعبئة لعلامات أخرى', 'co.pl3': 'حسب الطلب',
    'co.st': 'محطات الطحان', 'co.st1': '9 فروع', 'co.st2': 'خريطة واتجاهات',
    'div.lead': 'المحروقات والزيوت والعبوات التي تُعبّأ فيها، تديرها عائلة واحدة من البقاع.',
    'div.p.title': 'المحروقات حتى باب بيتك',
    'div.p.go': 'اطلب المحروقات',
    'div.l.title': 'زيوت من مصنعنا',
    'div.l.go': 'تعرّف على زيوتنا',
    'div.st.title': 'محطتنا في النبي شيت',
    'div.st.desc': 'املأ خزانك على المضخة، أو اطلب التوصيل من هنا.',
    'div.st.go': 'موقع المحطة',
    'div.pv.title': 'علامتك التجارية، وزيتنا',
    'div.pv.desc': 'نعبّئ الزيت ونضع عليه اسمك، من التركيبة حتى العبوة الجاهزة.',
    'div.pv.go': 'كيف نعمل',
    'div.pl.title': 'عبوات بكل الأحجام',
    'div.pl.go': 'شاهد العبوات',

    'pet.kicker': 'الطحان للمحروقات',
    'pet.title': 'نوصل المحروقات في البقاع منذ 1985.',
    'pet.text': 'صهاريجنا توصل المازوت والبنزين إلى المنازل والشركات والمؤسسات في أكثر من 17 بلدة.',
    'pet.c1': 'منذ 1985', 'pet.c2': '+17 بلدة', 'pet.c3': 'منازل وشركات', 'pet.cta': 'اطلب المحروقات',
    'o.title': 'اطلب المحروقات بأقل من دقيقة.',
    'o.lead': 'يصلنا طلبك على واتساب ونتصل بك لتأكيد السعر وموعد التوصيل.',
    'o.fuel': 'نوع المحروقات', 'o.diesel': 'مازوت', 'o.petrol': 'بنزين',
    'o.for': 'التوصيل إلى', 'o.home': 'منزل', 'o.biz': 'شركة أو مؤسسة',
    'o.town': 'البلدة', 'o.pick': 'اختر بلدتك', 'o.other': 'بلدة أخرى في البقاع',
    'o.otherGov': 'محافظة أخرى في لبنان', 'o.gov': 'المحافظة', 'o.pickGov': 'اختر محافظتك', 'o.place': 'اسم بلدتك',
    'o.qty': 'الكمية بالليتر (اختياري)', 'o.send': 'أرسل الطلب على واتساب', 'o.call': 'أو اتصل لتطلب',
    'pet.where': 'فروعنا', 'pet.more': 'ونوصل أيضاً إلى أكثر من 10 بلدات أخرى في البقاع',
    'pet.note': 'بلدتك ليست في القائمة؟ أرسل طلبك وسنخبرك إن كنا نصل إليك.',
    'pet.hint': 'اضغط على الفرع لتراه على الخريطة.',
    'sts.title': 'محطات الطحان', 'sts.text': 'اختر بلدة على الخريطة أو من القائمة لترى محطتها.',
    'sts.loading': 'جارٍ تحميل الخريطة…',
    'st.place': 'النبي شيت، البقاع', 'st.title': 'محطة الطحان، النبي شيت',
    'st.text': 'املأ خزانك بالبنزين والمازوت على المضخة. ومن هنا ينطلق التوصيل إلى المنازل والمؤسسات في المنطقة.',
    'st.l1': 'بنزين ومازوت على المضخة', 'st.l2': 'زيوت الطحان متوفرة للبيع', 'st.l3': 'مركز التوصيل للمنطقة',
    'st.map': 'الاتجاهات على الخريطة', 'st.call': 'اتصل بالمحطة',

    'lub.kicker': 'الطحان للزيوت',
    'lub.title': 'مصنع زيوتنا الخاص، من الخلط حتى التعبئة.',
    'lub.text': 'ينتج مصنع الطحان زيوت التشحيم ويخلطها ويعبّئها بالجودة نفسها في كل دفعة. ونقدّم أيضاً تكرير الزيوت المستعملة وتعبئة الزيوت بأسماء علامات تجارية أخرى.',
    'lub.s1': 'الإنتاج', 'lub.s1d': 'تصنيع زيوت التشحيم.',
    'lub.s2': 'الخلط', 'lub.s2d': 'تركيبات تُخلط داخل مصنعنا.',
    'lub.s3': 'التعبئة', 'lub.s3d': 'بالحجم الذي تحتاجه.',
    'lub.s4': 'التكرير', 'lub.s4d': 'تكرير الزيوت المستعملة لإعادة استخدامها.',
    'lub.where': 'أين تُباع زيوتنا', 'lub.m1': 'لبنان', 'lub.m2': 'مصر', 'lub.m3': 'العراق', 'lub.m4': 'أفريقيا',
    'lub.on': 'متوفّر', 'lub.soon': 'قريباً',
    'lub.dist': 'تريد بيع زيوت الطحان في بلدك؟', 'lub.distBtn': 'كن موزّعاً لنا',

    'pv.kicker': 'التعبئة للغير',
    'pv.title': 'علامتك التجارية للزيوت، من البداية حتى النهاية لدى مجموعة واحدة.',
    'pv.text': 'لأننا نصنع الزيت والعبوة معاً، يبقى طلبك عند مورّد واحد، من التركيبة حتى المنتج الجاهز.',
    'pv.s1': 'اختر الزيت', 'pv.s1d': 'اختر من تركيباتنا، أو أرسل لنا المواصفات التي تريدها.',
    'pv.s2': 'اختر العبوة', 'pv.s2d': 'قناني وغالونات من تصنيع الطحان للبلاستيك.',
    'pv.s3': 'أضف علامتك', 'pv.s3d': 'اسمك وملصقك على كل عبوة.',
    'pv.s4': 'نعبّئ ونشحن', 'pv.s4d': 'تعبئة في مصنعنا، وتوصيل داخل لبنان أو تصدير.',
    'pv.cta': 'ابدأ مشروع تعبئة باسمك',

    'pl.kicker': 'الطحان للبلاستيك', 'pl.title': 'عبوات بكل الأشكال والأحجام.', 'pl.all': 'الكل',
    'pl.p1': 'قناني', 'pl.p2': 'عبوات زيت', 'pl.p3': 'غالونات', 'pl.p4': 'مرطبانات وأشكال حسب الطلب',
    'pl.lead': 'اختر العبوة ولونها والكمية التي تحتاجها، ثم أضفها إلى السلة. أرسل السلة على واتساب ونرد عليك بالسعر وموعد التسليم.',
    'pl.f.oil': 'عبوات زيت', 'pl.f.detergent': 'عبوات منظفات',
    'cart.title': 'سلتك', 'cart.empty': 'سلتك فارغة. اختر العبوات من القائمة وستظهر هنا.', 'cart.browse': 'شاهد العبوات',
    'cart.total': 'المجموع', 'cart.name': 'اسمك', 'cart.company': 'الشركة (اختياري)', 'cart.send': 'أرسل الطلب على واتساب',
    'cart.note': 'نرد عليك بالسعر وموعد التسليم.', 'cart.clear': 'أفرغ السلة', 'cart.view': 'عرض السلة',
    'co.st.of': 'تابعة للطحان للمحروقات', 'ab.wa': 'واتساب',
    'oils.title': 'الزيوت التي نبيعها، بكل العيارات التي تحتاجها.',
    'oils.lead': 'اختر الماركة والعيار، ثم أضفه إلى السلة وأرسله مع باقي طلبك.',
    'pl.foot': 'تحتاج حجماً أو شكلاً غير موجود هنا؟ نصنع العبوات حسب الطلب.', 'pl.cta': 'اطلب عرض سعر للعبوات',

    'about.title': 'شركة عائلية لم تتوقف عن النمو.',
    'about.p1': 'بدأنا عام 1985 بتوصيل المحروقات إلى المنازل والمؤسسات في البقاع. وثق بنا الناس، فكبرنا معهم.',
    'about.p2': 'اليوم تنتج مجموعة الطحان أيضاً زيوت التشحيم وتخلطها وتعبّئها لأسواق لبنان ومصر والعراق، وتصنّع عبوات PET و HDPE التي تُباع فيها.',
    'tl.then': 'بعدها', 'tl.next': 'قريباً',
    'tl.1t': 'توزيع المحروقات', 'tl.1d': 'انطلاق الطحان للمحروقات في التوصيل على امتداد البقاع.',
    'tl.2t': 'مصنع الزيوت', 'tl.2d': 'إنتاج الزيوت وخلطها وتعبئتها وتكريرها.',
    'tl.3t': 'مصنع البلاستيك', 'tl.3d': 'عبوات PET و HDPE بأشكال وأحجام متعددة.',
    'tl.4t': 'أفريقيا', 'tl.4d': 'زيوتنا في طريقها إلى أسواق جديدة.',

    'ct.title': 'اطلب عرض سعر.',
    'ct.text': 'للزيوت أو التعبئة للغير أو العبوات أو التوزيع. أخبرنا بما تحتاجه وستردّ عليك الشركة المختصة.',
    'ct.addr': 'البقاع، لبنان',
    'f.division': 'بخصوص ماذا؟', 'f.o2': 'زيوت وتعبئة للغير', 'f.o3': 'عبوات بلاستيك', 'f.o5': 'أن أصبح موزّعاً',
    'f.o1': 'عقد تزويد بالمحروقات', 'f.o4': 'موضوع آخر',
    'f.name': 'الاسم الكامل', 'f.company': 'الشركة (اختياري)', 'f.phone': 'الهاتف', 'f.country': 'البلد',
    'f.msg': 'ماذا تحتاج؟', 'f.send': 'أرسل الطلب',

    'ssf.nav': 'اطلب', 'ssf.t1': 'شركاتنا', 'ssf.t2': 'أين تجدنا', 'ssf.where': '9 فروع وأكثر من 17 بلدة',
    'ssf.map': 'شاهد محطاتنا', 'ssf.copied': 'تم النسخ. نتواصل قريباً!', 'ssf.wa': 'راسلنا على واتساب',
    'ssf.note': '*أسرع طريقة لطلب المحروقات هي واتساب. نتصل بك لتأكيد السعر.',
    'ssf.pill': 'مجموعة الطحان', 'ssf.c1r': 'التأسيس', 'ssf.c1n': 'البقاع، 1985',
    'ssf.c2r': 'الشركات', 'ssf.c2n': 'المحروقات، الزيوت، البلاستيك', 'ssf.c3r': 'الحقوق',
    'ft.tag': 'محروقات وزيوت وبلاستيك. شركة عائلية منذ 1985.', 'ft.div': 'الشركات', 'ft.do': 'خدماتنا',
    'ft.ct': 'التواصل', 'ft.rights': 'جميع الحقوق محفوظة.', 'ab.call': 'اتصال',
  };
  const MSG = {
    en: {
      orderInvalid: 'Choose your town and add your name and phone number, then send again.',
      orderOk: 'WhatsApp is opening with your order ready. Press send there to place it.',
      quoteInvalid: 'Add your name, phone number and what you need, then send again.',
      quoteOk: 'Your email app is opening with the request ready. Press send there to submit it.',
    },
    ar: {
      orderInvalid: 'اختر بلدتك وأضف اسمك ورقم هاتفك، ثم أرسل مجدداً.',
      orderOk: 'يُفتح واتساب الآن والطلب جاهز. اضغط إرسال هناك لتأكيده.',
      quoteInvalid: 'أضف اسمك ورقم هاتفك وما تحتاجه، ثم أرسل مجدداً.',
      quoteOk: 'يُفتح تطبيق البريد الآن والطلب جاهز. اضغط إرسال هناك لتقديمه.',
    },
  };
  if (!FX(12)) delete AR['ab.wa'];
  const TITLE = { en: document.title, ar: 'مجموعة الطحان — توصيل محروقات وزيوت وعبوات بلاستيك | البقاع منذ 1985' };

  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = {};
  nodes.forEach(n => { if (!(n.dataset.i18n in EN)) EN[n.dataset.i18n] = n.innerHTML; });
  const townOpts = [...document.querySelectorAll('option[data-ar]')];
  townOpts.forEach(o => o.dataset.en = o.textContent);
  const altImgs = [...document.querySelectorAll('img[data-alt-ar]')];
  altImgs.forEach(img => img.dataset.altEn = img.alt);
  const toggle = document.querySelector('[data-lang-toggle]');
  let lang = 'en';

  function setLang(l) {
    lang = l;
    const dict = l === 'ar' ? AR : EN;
    root.lang = l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
    nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
    townOpts.forEach(o => o.textContent = l === 'ar' ? o.dataset.ar : o.dataset.en);
    altImgs.forEach(img => img.alt = l === 'ar' ? img.dataset.altAr : img.dataset.altEn);
    document.title = TITLE[l];
    toggle.textContent = l === 'ar' ? 'EN' : 'عربي';
    toggle.setAttribute('aria-label', l === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    try { localStorage.setItem('tahan-lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('tahan:lang', { detail: l }));
  }
  toggle.addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));

  let initial = 'en';
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'ar' || q === 'en') initial = q;
  else { try { initial = localStorage.getItem('tahan-lang') || 'en'; } catch (e) {} }
  if (initial === 'ar') setLang('ar');

  /* ---------------- Header ---------------- */
  const header = document.querySelector('[data-nav]');
  const burger = document.querySelector('[data-burger]');
  // Solid pill after the first scroll, plus the red reading line (--p from 0 to 1)
  const toTop = document.querySelector('[data-totop]');
  if (toTop) {
    toTop.addEventListener('click', () => {
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
      document.querySelector('.brand').focus({ preventScroll: true });
    });
    const setTopLabel = () => toTop.setAttribute('aria-label', document.documentElement.lang === 'ar' ? 'العودة إلى الأعلى' : 'Back to top');
    setTopLabel();
    document.addEventListener('tahan:lang', setTopLabel);
  }
  let ticking = false;
  const onScroll = () => {
    header.classList.toggle('is-solid', window.scrollY > 24);
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
      if (toTop) toTop.classList.toggle('is-shown', window.scrollY > window.innerHeight * .8);
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = open => {
    header.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    const ar = document.documentElement.lang === 'ar';
    burger.setAttribute('aria-label', open ? (ar ? 'إغلاق القائمة' : 'Close menu') : (ar ? 'القائمة' : 'Menu'));
  };
  const closeMenu = () => setMenu(false);
  burger.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  document.querySelectorAll('[data-menu] a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) { closeMenu(); burger.focus(); }
  });
  window.matchMedia('(min-width: 1141px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  // Sliding pill: follows the hovered link, and rests on the current section's link
  const linksBox = document.querySelector('.nav__links');
  const links = [...linksBox.querySelectorAll('a')];
  const mmLinks = [...document.querySelectorAll('.mm__link')];
  let hovering = null;
  const movePill = a => {
    if (!a || !a.offsetWidth) { linksBox.classList.remove('has-pill'); return; }
    linksBox.style.setProperty('--px', a.offsetLeft + 'px');
    linksBox.style.setProperty('--pw', a.offsetWidth + 'px');
    linksBox.classList.add('has-pill');
    requestAnimationFrame(() => requestAnimationFrame(() => linksBox.classList.remove('is-fresh')));
  };
  const restPill = () => movePill(hovering || links.find(a => a.classList.contains('is-active')));
  links.forEach(a => {
    a.addEventListener('mouseenter', () => { hovering = a; movePill(a); });
    a.addEventListener('focus', () => { hovering = a; movePill(a); });
    a.addEventListener('blur', () => { hovering = null; restPill(); });
  });
  linksBox.addEventListener('mouseleave', () => { hovering = null; restPill(); });
  window.addEventListener('resize', restPill);
  document.addEventListener('tahan:lang', () => { linksBox.classList.add('is-fresh'); requestAnimationFrame(restPill); });
  if (document.fonts) document.fonts.ready.then(restPill);

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const hash = '#' + e.target.id;
      [...links, ...mmLinks].forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === hash));
      restPill();
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

  /* ---------------- Hero: tiled photo mosaic ----------------
     The band is cut into square tiles. Every few seconds the tiles close over the photo in a
     wave, the next photo goes in, and they open again. A few tiles stay frosted, and the card
     of the company in the photo turns red. */
  const kv = document.querySelector('[data-kv]');
  if (kv) {
    const hero = kv.closest('.kv');
    const cellsBox = kv.querySelector('[data-kv-cells]');
    const cardList = kv.querySelector('[data-kv-cards]');
    const slides = [...kv.querySelectorAll('.kv__slide')];
    const cards = [...kv.querySelectorAll('.kv__card')];
    const wraps = [...kv.querySelectorAll('.kv__cardwrap')];
    const bars = [...kv.querySelectorAll('[data-kv-bars] span')];
    const now = kv.querySelector('[data-kv-now]');
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    const HOLD = 4200; // how long each photo stays fully open
    kv.style.setProperty('--hold', HOLD + 'ms');
    let cols = 0, rows = 0, cells = [], cardCells = new Set(), cur = 0, timer = 0, busy = false, inView = true, phone = false;

    const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

    const frost = () => {
      const free = shuffle(cells.map((_, i) => i).filter(i => !cardCells.has(i)));
      const pick = new Set(phone ? [] : free.slice(0, Math.max(1, Math.round(cells.length * .1))));
      cells.forEach((el, i) => el.classList.toggle('is-frost', pick.has(i)));
    };

    const layout = () => {
      const w = kv.clientWidth;
      let c, r, pos;
      phone = innerWidth <= 760;
      if (phone) {
        // fine square tiles over the tall phone photo; the cards are replaced by the red label
        c = w <= 420 ? 6 : 8;
        const cell = w / c;
        r = Math.ceil(kv.clientHeight / cell);
        kv.style.setProperty('--cell', cell + 'px');
        pos = [];
      } else {
        r = 3;
        const top = kv.getBoundingClientRect().top + scrollY;
        const target = Math.min(190, Math.max(112, (innerHeight - top) / r));
        c = Math.max(6, Math.round(w / target));
        pos = [[Math.max(1, Math.round(c * .25)), 1], [Math.round(c * .78), 2], [Math.round(c * .5), 3]];
      }
      if (c !== cols || r !== rows) {
        cols = c; rows = r;
        kv.style.setProperty('--cols', c);
        kv.style.setProperty('--rows', r);
        cellsBox.textContent = '';
        cells = Array.from({ length: c * r }, () => cellsBox.appendChild(document.createElement('i')));
        cells.forEach(el => { el.className = 'kv__cell'; });
      }
      cardCells = new Set(pos.map(([x, y]) => (y - 1) * c + (x - 1)));
      wraps.forEach((el, i) => { if (pos[i]) { el.style.setProperty('--c', pos[i][0]); el.style.setProperty('--r', pos[i][1]); } });
      frost();
    };

    // close (on = true) or open the tiles in a wave from a random point
    const wave = on => new Promise(done => {
      const ox = Math.random() * cols, oy = Math.random() * rows;
      let max = 0;
      cells.forEach((el, i) => {
        const d = Math.round(Math.hypot(i % cols - ox, (i / cols | 0) - oy) * 42 + Math.random() * 80);
        if (d > max) max = d;
        el.style.setProperty('--d', d + 'ms');
        el.classList.toggle('is-cover', on);
      });
      setTimeout(done, max + 300);
    });

    const show = async n => {
      busy = true;
      try { await slides[n].decode(); } catch (e) {}
      await wave(true);
      slides[cur].classList.remove('is-on');
      cur = n;
      slides[cur].classList.add('is-on');
      const hot = +slides[cur].dataset.kvFor;
      cards.forEach((a, i) => a.classList.toggle('is-hot', i === hot));
      setNow(true);
      frost();
      await wave(false);
      busy = false;
    };

    // phones: red label for the company in the photo, linking to its section
    const setNow = swap => {
      const a = cards[+slides[cur].dataset.kvFor];
      now.href = a.getAttribute('href');
      now.querySelector('[data-kv-now-name]').textContent = a.querySelector('.kv__name').textContent;
      now.querySelector('.kv__now-icon use').setAttribute('href', a.querySelector('.kv__icon use').getAttribute('href'));
      if (swap) { now.classList.remove('is-swap'); void now.offsetWidth; now.classList.add('is-swap'); }
    };
    document.addEventListener('tahan:lang', () => setNow(false));
    setNow(false);

    // story bars: earlier photos full, the current one fills while it is on screen
    const runBars = () => {
      bars.forEach((b, i) => { b.classList.remove('is-on'); b.classList.toggle('is-done', i < cur); });
      void kv.offsetWidth;
      bars[cur]?.classList.add('is-on');
    };
    const play = () => {
      clearTimeout(timer);
      if (still.matches) return;
      runBars();
      const step = async () => {
        if (busy || !inView || document.hidden) { timer = setTimeout(step, 700); return; }
        await show((cur + 1) % slides.length);
        play();
      };
      timer = setTimeout(step, HOLD);
    };

    if (still.matches) layout();
    let rz = 0;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(layout, 150); });
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(kv);
    still.addEventListener?.('change', play);

    const setLabel = () => cardList.setAttribute('aria-label', lang === 'ar' ? 'شركاتنا' : 'Our companies');
    setLabel();
    document.addEventListener('tahan:lang', setLabel);

    if (still.matches) hero.classList.add('is-in', 'is-lit');
    else {
      requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));
      // wait for the first photo and the fonts, so the tiles are measured against the final headline
      const first = slides[0];
      const ready = Promise.race([
        Promise.all([
          first.complete ? 0 : new Promise(r => { first.addEventListener('load', r, { once: true }); first.addEventListener('error', r, { once: true }); }),
          document.fonts ? document.fonts.ready : 0
        ]),
        new Promise(r => setTimeout(r, 1600))
      ]);
      ready.then(() => requestAnimationFrame(() => {
        layout();
        cells.forEach(el => el.classList.add('is-cover'));
        hero.classList.add('is-lit');
        setTimeout(() => wave(false).then(play), 260);
      }));
    }
  }

  /* ---------------- Companies: slice reveal and the round cursor ---------------- */
  const coGrid = document.querySelector('[data-co]');
  if (coGrid) {
    const items = [...coGrid.querySelectorAll('.co__item')];
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!calm && 'IntersectionObserver' in window) {
      items.forEach(item => {
        const media = item.querySelector('.co__media');
        for (let s = 0; s < 6; s++) {
          const el = document.createElement('i');
          el.className = 'co__slice';
          el.style.setProperty('--s', s);
          el.style.setProperty('--d', (Math.random() * .32).toFixed(2) + 's');
          media.appendChild(el);
        }
      });
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }), { rootMargin: '0px 0px -12% 0px' });
      items.forEach(i => io.observe(i));
    } else items.forEach(i => i.classList.add('is-in'));

    // the cursor follows the mouse inside each photo (mouse only; touch keeps the arrow by the name)
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      coGrid.querySelectorAll('.co__media').forEach(media => {
        media.addEventListener('pointermove', e => {
          const r = media.getBoundingClientRect();
          media.style.setProperty('--x', (e.clientX - r.left) + 'px');
          media.style.setProperty('--y', (e.clientY - r.top) + 'px');
        });
      });
    }
  }

  /* ---------------- Tahan Plast: container catalogue + cart ----------------
     To add a container: save its photo as assets/img/<file>.jpg/.webp (1.9:1, any width up to 1200)
     plus <file>-sm.jpg/.webp at 640px wide, then add one line to PLAST below.
     Names are temporary until the client sends the official product names. */
  const PLAST = [
    // kind: 'oil' = oil bottles, 'detergent' = detergent bottles (the client's split). Cards render grouped in KINDS order.
    { id: 'oil-800',         kind: 'oil',       file: 'plast-oil-800',         w: 1054, h: 555, cap: '800',  unit: 'ml', en: 'Oil bottle',        ar: 'عبوة زيت',        colors: ['black', 'yellow', 'blue', 'white', 'red', 'silver'] },
    { id: 'jerrycan-5l',     kind: 'oil',       file: 'plast-jerrycan-5l',     w: 1208, h: 636, cap: '5',    unit: 'l',  en: 'Oil jerrycan',      ar: 'غالون زيت',       colors: ['silver', 'yellow', 'red'] },
    { id: 'antifreeze-1500', kind: 'oil',       file: 'plast-antifreeze-1500', w: 1074, h: 565, cap: '1.5',  unit: 'l',  en: 'Antifreeze bottle', ar: 'عبوة دواء جليد',  colors: ['silver', 'white'] },
    { id: 'gallon-3750',     kind: 'detergent', file: 'plast-gallon-3750',     w: 852,  h: 448, cap: '3.75', unit: 'l',  en: 'Gallon',            ar: 'غالون',           colors: ['white'] },
    { id: 'bottles-white',   kind: 'detergent', file: 'plast-flip-bottle',     w: 770,  h: 405, cap: null,               en: 'Bottles',           ar: 'قناني',           colors: ['white'] }, // TODO capacity + name from the client
    // TODO 9 L container: photo comes from the client. Save it as plast-gallon-9l(.jpg/.webp, -sm), set w/h and delete `hidden`.
    // Group assumed 'detergent' (white gallon like the 3.75 L); confirm with the client.
    { id: 'gallon-9l',       kind: 'detergent', file: 'plast-gallon-9l',       w: 1200, h: 632, cap: '9',    unit: 'l',  en: 'Gallon',            ar: 'غالون',           colors: ['white'], hidden: true },
  ];
  const KINDS = [
    { id: 'oil',       en: 'Oil bottles',       ar: 'عبوات زيت' },
    { id: 'detergent', en: 'Detergent bottles', ar: 'عبوات منظفات' },
  ];
  const UNIT = { ml: { en: 'ml', ar: 'مل' }, l: { en: 'L', ar: 'ليتر' } };
  const COLOURS = {
    black:  { c: '#1C1D21', en: 'Black',  ar: 'أسود' },
    yellow: { c: '#F2B51C', en: 'Yellow', ar: 'أصفر' },
    blue:   { c: '#1F6FD1', en: 'Blue',   ar: 'أزرق' },
    white:  { c: '#F7F7F5', en: 'White',  ar: 'أبيض' },
    red:    { c: '#D7141A', en: 'Red',    ar: 'أحمر' },
    silver: { c: 'linear-gradient(135deg, #E3E6EA, #9AA1A9 55%, #C9CDD2)', en: 'Silver', ar: 'فضي' },
  };
  const QTY = { start: 100, step: 100 }; // TODO confirm the minimum order with the client

  /* ---------------- Oil brands (the "Oil brands" area in #lubricant) ----------------
     Every brand comes in the same four grades. Photos live in assets/img/oils/<img>.jpg/.webp (640×640 on white);
     a grade without a photo is drawn as a plain bottle with the brand and grade on its label.
     The product name is only shown when we have that exact product's photo, so a guessed name never reaches customers.
     confirm: true = the shop owner still has to confirm this exact product. */
  const OIL_GRADES = {
    '10w40': { label: '10W-40', en: 'Engine oil', ar: 'زيت محرك' },
    '20w50': { label: '20W-50', en: 'Engine oil', ar: 'زيت محرك' },
    atf:     { label: 'ATF',    en: 'Automatic transmission fluid', ar: 'زيت الأوتو (فتيس أوتوماتيك)' },
    '68':    { label: '68',     en: 'Hydraulic oil ISO VG 68', ar: 'زيت هيدروليك 68' },
  };
  const OILS = [
    { id: 'wheelers', brand: 'Wheelers', ar: 'ويلرز', from: { en: 'Germany', ar: 'ألمانيا' }, grades: [
      { g: '10w40', name: 'Wheelers Molycore MCX 10W-40', img: 'wheelers_10w40' },
      { g: '20w50', label: '15W-50', name: 'Wheelers GTR 15W-50', img: 'wheelers_20w50', confirm: true }, // Wheelers makes no 20W-50; closest grade
      { g: 'atf', name: 'Wheelers ATF DX III H (Dexron III)', img: 'wheelers_atf' },
      { g: '68', name: 'Wheelers Hydraulic HLP 68', img: 'wheelers_68' } ] },
    { id: 'century', brand: 'Century', ar: 'سانشري', from: null, grades: [
      { g: '10w40', name: 'Century Semi Synthetic SAE 10W-40', img: 'century_10w40' },
      { g: '20w50', name: 'Century SAE 20W-50', img: 'century_20w50' },
      { g: 'atf', name: 'Century ATF', confirm: true },
      { g: '68', name: 'Century Hydraulic 68', confirm: true } ] },
    { id: 'cofran', brand: 'Cofran', ar: 'كفران', from: { en: 'France', ar: 'فرنسا' }, grades: [
      { g: '10w40', name: 'Cofran Challenger Star 10W-40', img: 'cofran_10w40' },
      { g: '20w50', name: 'Cofran Moto 20W-50', img: 'cofran_20w50', confirm: true }, // the photo is Cofran Moto; the list said Cofran Sport
      { g: 'atf', name: 'Cofran ATF 4000', img: 'cofran_atf' },
      { g: '68', name: 'Cofran hydraulic oil 68', img: 'cofran_68', confirm: true } ] }, // generic Cofran drum, the grade is not on it
    { id: 'power1', brand: 'Power 1', ar: 'باور وان', from: null, grades: [
      { g: '10w40', name: 'Castrol Power1 4T 10W-40', img: 'power1_10w40' },
      { g: '20w50', name: 'Castrol Power1 4T 20W-50', img: 'power1_20w50' },
      { g: 'atf', name: 'Castrol Transmax ATF Dexron-VI', img: 'power1_atf', confirm: true }, // Power1 has no ATF: confirm this is the Castrol ATF sold
      { g: '68', name: 'Castrol Hyspin AWS 68', img: 'power1_68', confirm: true } ] }, // Power1 has no hydraulic oil: confirm
    { id: 'sct', brand: 'SCT', ar: 'إس سي تي', from: { en: 'Germany', ar: 'ألمانيا' }, grades: [
      { g: '10w40', name: 'SCT Semi-Synthetic Motor Oil 10W-40', img: 'sct_10w40' },
      { g: '20w50', name: 'SCT Universal Motor Oil 20W-50', img: 'sct_20w50' }, // small source photo (295 px)
      { g: 'atf', name: 'SCT ATF Dexron III', img: 'sct_atf' },
      { g: '68', name: 'SCT Hydraulic HLP 68', confirm: true } ] }, // the downloaded sct_68 photo is a Mannol can, not used
    { id: 'mannol', brand: 'Mannol', ar: 'مانول', from: { en: 'Germany', ar: 'ألمانيا' }, grades: [
      { g: '10w40', name: 'Mannol Classic 10W-40 (7501)', img: 'mannol_10w40' },
      { g: '20w50', name: 'Mannol Safari 20W-50 (7404)', img: 'mannol_20w50' },
      { g: 'atf', name: 'Mannol Automatic Plus ATF Dexron III (8206)', img: 'mannol_atf' },
      { g: '68', name: 'Mannol Hydro ISO 68 (2103)', img: 'mannol_68' } ] },
  ];
  const OIL_QTY = { start: 1, step: 1 }; // TODO confirm with the client: pieces or cartons
  const oilById = id => OILS.find(o => 'oil:' + o.id === id);
  const oilGrade = (o, g) => o && o.grades.find(x => x.g === g);
  const gradeLabel = x => x.label || OIL_GRADES[x.g].label;
  const oilSub = x => x.img ? x.name : OIL_GRADES[x.g][lang];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const oilPic = (o, x, cls) => x.img
    ? `<picture class="${cls}"><source type="image/webp" srcset="assets/img/oils/${x.img}.webp"><img src="assets/img/oils/${x.img}.jpg" width="640" height="640" alt="${esc(x.name)}" loading="lazy" decoding="async"></picture>`
    : `<span class="${cls} oil-tile" role="img" aria-label="${esc(o.brand + ' ' + gradeLabel(x))}"><b class="oil-tile__brand">${esc(o.brand)}</b><b class="oil-tile__grade">${esc(gradeLabel(x))}</b><i class="oil-tile__kind">${esc(OIL_GRADES[x.g][lang])}</i></span>`;
  const T = {
    en: { colour: 'Colour', pcs: 'pcs', add: 'Add to cart', added: 'Added', fewer: 'Fewer', more: 'More', qty: 'Quantity in pieces',
          cart: n => n ? `Cart, ${n} ${n === 1 ? 'item' : 'items'}` : 'Cart', close: 'Close cart', remove: 'Remove',
          lines: n => n ? `(${n})` : '', toast: (t, q) => `Added to cart: ${t} × ${q}`,
          nameMissing: 'Add your name, then send again.', sent: 'WhatsApp is opening with your order ready. Press send there to place it.',
          msgTitle: 'Order from the Tahan Group website', msgName: 'Name', msgCompany: 'Company', msgTotal: 'Total' },
    ar: { colour: 'اللون', pcs: 'قطعة', add: 'أضف إلى السلة', added: 'تمت الإضافة', fewer: 'أقل', more: 'أكثر', qty: 'الكمية بالقطعة',
          cart: n => n ? `السلة، ${n} ${n === 1 ? 'صنف' : 'أصناف'}` : 'السلة', close: 'إغلاق السلة', remove: 'إزالة',
          lines: n => n ? `(${n})` : '', toast: (t, q) => `أُضيف إلى السلة: ${t} × ${q}`,
          nameMissing: 'أضف اسمك، ثم أرسل مجدداً.', sent: 'يُفتح واتساب الآن والطلب جاهز. اضغط إرسال هناك لتأكيده.',
          msgTitle: 'طلب من موقع مجموعة الطحان', msgName: 'الاسم', msgCompany: 'الشركة', msgTotal: 'المجموع' },
  };
  const t = () => T[lang];
  const sep = () => lang === 'ar' ? '، ' : ', ';
  const byId = id => String(id).startsWith('oil:') ? oilById(id) : PLAST.find(p => p.id === id);
  const capText = p => p.cap ? `${p.cap} ${UNIT[p.unit][lang]}` : '';
  const fullName = p => [p[lang], capText(p)].filter(Boolean).join(' ');
  const num = n => n.toLocaleString(lang === 'ar' ? 'ar-LB' : 'en-US', { numberingSystem: 'latn' });
  const pic = (p, cls, sizes) => `<picture class="${cls}"><source type="image/webp" srcset="assets/img/${p.file}-sm.webp 640w, assets/img/${p.file}.webp ${p.w}w" sizes="${sizes}"><img src="assets/img/${p.file}-sm.jpg" srcset="assets/img/${p.file}-sm.jpg 640w, assets/img/${p.file}.jpg ${p.w}w" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="" loading="lazy" decoding="async"></picture>`;

  // what each card has selected, kept across language switches
  const pick = {};
  PLAST.forEach(p => pick[p.id] = { color: p.colors[0], qty: QTY.start });

  // the cart lives in this browser only
  let cart = [];
  try { cart = (JSON.parse(localStorage.getItem('tahan-cart')) || []).filter(i => byId(i.id) && !byId(i.id).hidden && (!String(i.id).startsWith('oil:') || oilGrade(byId(i.id), i.grade))); } catch (e) {}
  const saveCart = () => { try { localStorage.setItem('tahan-cart', JSON.stringify(cart)); } catch (e) {} };

  const catalog = document.querySelector('[data-catalog]');
  const fBtns = [...document.querySelectorAll('[data-filter] button')];
  let filterBy = 'all';

  const qtyBox = (val, attrs, step = QTY.step) => `<div class="qty">
      <button type="button" data-step="-1" aria-label="${t().fewer}"><svg aria-hidden="true"><use href="#i-minus"/></svg></button>
      <label class="qty__val"><input type="number" inputmode="numeric" min="1" step="${step}" value="${val}" aria-label="${t().qty}" ${attrs}><span>${t().pcs}</span></label>
      <button type="button" data-step="1" aria-label="${t().more}"><svg aria-hidden="true"><use href="#i-plus"/></svg></button>
    </div>`;

  const renderCatalog = () => {
    if (!catalog) return;
    catalog.innerHTML = KINDS.map(k => {
      const items = PLAST.filter(p => !p.hidden && p.kind === k.id);
      if (!items.length) return '';
      return `<h3 class="cgrid__group" data-kind="${k.id}" ${filterBy !== 'all' && filterBy !== k.id ? 'hidden' : ''}>${k[lang]}</h3>` + items.map(cardHtml).join('');
    }).join('');
  };
  const cardHtml = p => {
      const sel = pick[p.id];
      const sw = p.colors.map(c => `<label class="sw" style="--c:${COLOURS[c].c}"><input type="radio" name="c-${p.id}" value="${c}" ${c === sel.color ? 'checked' : ''}><span class="sw__chip" aria-hidden="true"></span><span class="sr-only">${COLOURS[c][lang]}</span></label>`).join('');
      const cap = p.cap ? `<p class="ccard__cap">${p.cap}<span>${UNIT[p.unit][lang]}</span></p>` : '';
      return `<article class="ccard" data-id="${p.id}" data-kind="${p.kind}" ${filterBy !== 'all' && filterBy !== p.kind ? 'hidden' : ''}>
        ${pic(p, 'ccard__photo', '(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 620px')}
        <div class="ccard__body">
          <div class="ccard__top"><h3 class="ccard__name">${p[lang]}</h3>${cap}</div>
          <fieldset class="ccard__colors"><legend>${t().colour}: <b data-colour-name>${COLOURS[sel.color][lang]}</b></legend><div class="swatches">${sw}</div></fieldset>
          <div class="ccard__buy">${qtyBox(sel.qty, 'data-qty')}
            <button class="btn btn--primary ccard__add" type="button" data-add><svg aria-hidden="true"><use href="#i-cart"/></svg><span>${t().add}</span></button>
          </div>
        </div>
      </article>`;
  };

  const stepQty = (input, dir) => {
    const v = parseInt(input.value, 10) || 0, step = +input.step || 1;
    const next = dir > 0 ? Math.floor(v / step) * step + step : Math.ceil(v / step) * step - step;
    input.value = Math.max(step, next);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const cleanQty = input => { const v = Math.max(1, parseInt(input.value, 10) || +input.step || 1); input.value = v; return v; };
  // the add button says "Added" for a moment and the header cart nudges
  const added = add => {
    const label = add.querySelector('span');
    add.classList.add('is-added'); label.textContent = t().added; add.querySelector('use').setAttribute('href', '#i-check');
    clearTimeout(add._t); add._t = setTimeout(() => { add.classList.remove('is-added'); label.textContent = t().add; add.querySelector('use').setAttribute('href', '#i-cart'); }, 1600);
    cartBtn.classList.remove('is-bump'); void cartBtn.offsetWidth; cartBtn.classList.add('is-bump');
  };

  if (catalog) {
    renderCatalog();
    catalog.addEventListener('change', e => {
      const card = e.target.closest('.ccard'); if (!card) return;
      const sel = pick[card.dataset.id];
      if (e.target.type === 'radio') { sel.color = e.target.value; card.querySelector('[data-colour-name]').textContent = COLOURS[sel.color][lang]; }
      if (e.target.matches('[data-qty]')) sel.qty = cleanQty(e.target);
    });
    catalog.addEventListener('click', e => {
      const card = e.target.closest('.ccard'); if (!card) return;
      const stepBtn = e.target.closest('[data-step]');
      if (stepBtn) return stepQty(card.querySelector('[data-qty]'), +stepBtn.dataset.step);
      const add = e.target.closest('[data-add]');
      if (!add) return;
      const sel = pick[card.dataset.id];
      sel.qty = cleanQty(card.querySelector('[data-qty]'));
      const line = cart.find(i => i.id === card.dataset.id && i.color === sel.color);
      if (line) line.qty += sel.qty; else cart.push({ id: card.dataset.id, color: sel.color, qty: sel.qty });
      saveCart(); renderCart(); added(add);
      const p = byId(card.dataset.id);
      showToast(t().toast(`${fullName(p)}${sep()}${COLOURS[sel.color][lang]}`, num(sel.qty)));
    });
  }

  fBtns.forEach(b => b.addEventListener('click', () => {
    fBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    filterBy = b.dataset.f;
    document.querySelectorAll('[data-catalog] [data-kind]').forEach(c => c.hidden = filterBy !== 'all' && c.dataset.kind !== filterBy);
  }));


  // Oil brand cards: pick a grade, the photo and product line follow, then add to the same cart
  const oilGrid = document.querySelector('[data-oils]');
  const pickOil = {};
  OILS.forEach(o => pickOil[o.id] = { g: o.grades[0].g, qty: OIL_QTY.start });
  const oilLine = (o, x) => `<b>${esc(oilSub(x))}</b><span>${x.img ? OIL_GRADES[x.g][lang] : ''}</span>`;
  const renderOils = () => {
    if (!oilGrid) return;
    oilGrid.innerHTML = OILS.map(o => {
      const sel = pickOil[o.id], x = oilGrade(o, sel.g);
      const from = lang === 'ar' ? [o.ar, o.from && o.from.ar].filter(Boolean).join('، ') : (o.from ? o.from.en : '');
      const seg = o.grades.map(gx => `<label><input type="radio" name="g-${o.id}" value="${gx.g}" ${gx.g === sel.g ? 'checked' : ''}><span>${gradeLabel(gx)}</span></label>`).join('');
      return `<article class="ocard" data-oil="${o.id}">
        <div class="ocard__photo" data-oil-photo>${oilPic(o, x, 'ocard__pic')}</div>
        <div class="ocard__body">
          <div class="ocard__top"><h4 class="ocard__brand">${o.brand}</h4><span class="ocard__from">${from}</span></div>
          <fieldset class="ocard__grades"><legend class="sr-only">${lang === 'ar' ? 'العيار' : 'Grade'}</legend><div class="gseg">${seg}</div></fieldset>
          <p class="ocard__line" data-oil-line>${oilLine(o, x)}</p>
          <div class="ccard__buy">${qtyBox(sel.qty, 'data-qty', OIL_QTY.step)}
            <button class="btn btn--primary ccard__add" type="button" data-add><svg aria-hidden="true"><use href="#i-cart"/></svg><span>${t().add}</span></button>
          </div>
        </div>
      </article>`;
    }).join('');
  };
  if (oilGrid) {
    renderOils();
    oilGrid.addEventListener('change', e => {
      const card = e.target.closest('.ocard'); if (!card) return;
      const o = OILS.find(v => v.id === card.dataset.oil), sel = pickOil[o.id];
      if (e.target.type === 'radio') {
        sel.g = e.target.value;
        const x = oilGrade(o, sel.g);
        card.querySelector('[data-oil-photo]').innerHTML = oilPic(o, x, 'ocard__pic');
        card.querySelector('[data-oil-line]').innerHTML = oilLine(o, x);
      }
      if (e.target.matches('[data-qty]')) sel.qty = cleanQty(e.target);
    });
    oilGrid.addEventListener('click', e => {
      const card = e.target.closest('.ocard'); if (!card) return;
      const stepBtn = e.target.closest('[data-step]');
      if (stepBtn) return stepQty(card.querySelector('[data-qty]'), +stepBtn.dataset.step);
      const add = e.target.closest('[data-add]'); if (!add) return;
      const o = OILS.find(v => v.id === card.dataset.oil), sel = pickOil[o.id];
      sel.qty = cleanQty(card.querySelector('[data-qty]'));
      const id = 'oil:' + o.id;
      const line = cart.find(i => i.id === id && i.grade === sel.g);
      if (line) line.qty += sel.qty; else cart.push({ id, grade: sel.g, qty: sel.qty });
      saveCart(); renderCart(); added(add);
      showToast(t().toast(`${o.brand} ${gradeLabel(oilGrade(o, sel.g))}`, num(sel.qty)));
    });
  }

  // toast
  const toast = document.querySelector('[data-toast]');
  const toastText = document.querySelector('[data-toast-text]');
  const showToast = msg => {
    toastText.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove('is-on'), 4500);
  };

  // cart sheet
  const dlg = document.querySelector('[data-cart]');
  const cartBtn = document.querySelector('[data-cart-btn]');
  const cartN = document.querySelector('[data-cart-n]');
  const list = document.querySelector('[data-cart-list]');
  const empty = document.querySelector('[data-cart-empty]');
  const cartForm = document.querySelector('[data-cart-form]');
  const cartNote = document.querySelector('[data-cart-note]');
  const NOTE = { en: 'We reply with the price and delivery time.', ar: 'نرد عليك بالسعر وموعد التسليم.' };

  // one cart line, whichever catalogue it came from
  const lineInfo = i => {
    if (String(i.id).startsWith('oil:')) {
      const o = byId(i.id), x = oilGrade(o, i.grade);
      return { name: `${o.brand} ${gradeLabel(x)}`, sub: oilSub(x), dot: null, pic: oilPic(o, x, 'citem__img citem__img--oil') };
    }
    const p = byId(i.id);
    return { name: fullName(p), sub: COLOURS[i.color][lang], dot: COLOURS[i.color].c, pic: pic(p, 'citem__img', '88px') };
  };

  function renderCart() {
    const n = cart.length;
    cartBtn.hidden = !n;
    cartN.textContent = n;
    cartBtn.setAttribute('aria-label', t().cart(n));
    document.querySelector('[data-cart-lines]').textContent = t().lines(n);
    document.querySelector('[data-cart-total]').textContent = `${num(cart.reduce((s, i) => s + i.qty, 0))} ${t().pcs}`;
    empty.hidden = !!n; cartForm.hidden = !n;
    list.innerHTML = cart.map((i, k) => {
      const L = lineInfo(i), oil = String(i.id).startsWith('oil:');
      return `<li class="citem" data-k="${k}">
        ${L.pic}
        <div class="citem__info"><p class="citem__name">${esc(L.name)}</p><p class="citem__col">${L.dot ? `<span class="citem__dot" style="--c:${L.dot}"></span>` : ''}${esc(L.sub)}</p></div>
        ${qtyBox(i.qty, 'data-line-qty', oil ? OIL_QTY.step : QTY.step)}
        <button class="citem__rm" type="button" data-rm aria-label="${t().remove}: ${esc(L.name)}${sep()}${esc(L.sub)}"><svg aria-hidden="true"><use href="#i-trash"/></svg></button>
      </li>`;
    }).join('');
    document.querySelector('[data-cart-close]').setAttribute('aria-label', t().close);
  }

  const openCart = () => {
    toast.classList.remove('is-on');
    if (!dlg.open) dlg.showModal();
    root.classList.add('cart-open');
    cartNote.classList.remove('is-error'); cartNote.textContent = NOTE[lang];
  };
  const closeCart = () => { if (dlg.open) dlg.close(); };
  dlg.addEventListener('close', () => { root.classList.remove('cart-open'); if (!cartBtn.hidden) cartBtn.focus({ preventScroll: true }); });
  document.querySelectorAll('[data-cart-open]').forEach(b => b.addEventListener('click', openCart));
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-cart-close]')) return closeCart();
    const row = e.target.closest('.citem'); if (!row) return;
    if (e.target.closest('[data-rm]')) { cart.splice(+row.dataset.k, 1); saveCart(); renderCart(); (list.querySelector('[data-rm]') || dlg.querySelector('[data-cart-close]')).focus(); return; }
    const stepBtn = e.target.closest('[data-step]');
    if (stepBtn) stepQty(row.querySelector('[data-line-qty]'), +stepBtn.dataset.step);
  });
  list.addEventListener('change', e => {
    if (!e.target.matches('[data-line-qty]')) return;
    const k = +e.target.closest('.citem').dataset.k;
    cart[k].qty = cleanQty(e.target); saveCart();
    document.querySelector('[data-cart-total]').textContent = `${num(cart.reduce((s, i) => s + i.qty, 0))} ${t().pcs}`;
  });
  document.querySelector('[data-cart-clear]').addEventListener('click', () => { cart = []; saveCart(); renderCart(); dlg.querySelector('[data-cart-close]').focus(); });

  cartForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = cartForm.elements.name;
    const bad = !name.value.trim();
    name.classList.toggle('is-invalid', bad); name.setAttribute('aria-invalid', String(bad));
    if (bad) { cartNote.textContent = t().nameMissing; cartNote.classList.add('is-error'); name.focus(); return; }
    const L = t();
    const lines = cart.map((i, k) => { const x = lineInfo(i); return `${k + 1}. ${x.name}${sep()}${x.sub}: ${num(i.qty)} ${L.pcs}`; });
    const company = cartForm.elements.company.value.trim();
    const text = [L.msgTitle, `${L.msgName}: ${name.value.trim()}`, company ? `${L.msgCompany}: ${company}` : '', '', ...lines, '',
      `${L.msgTotal}: ${num(cart.reduce((s, i) => s + i.qty, 0))} ${L.pcs}`].filter((x, k, a) => x !== '' || a[k - 1] !== '').join('\n');
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    cartNote.classList.remove('is-error'); cartNote.textContent = L.sent;
  });

  renderCart();
  document.addEventListener('tahan:lang', () => { renderCatalog(); renderOils(); renderCart(); if (!cartNote.classList.contains('is-error')) cartNote.textContent = NOTE[lang]; });

  /* ---------------- Forms ---------------- */
  const FIELD_ERR = {
    en: { town: 'Choose your town.', gov: 'Choose your governorate.', place: 'Write the name of your town.', name: 'Add your name.', phone: 'Add your phone number.', message: 'Tell us what you need.' },
    ar: { town: 'اختر بلدتك.', gov: 'اختر محافظتك.', place: 'اكتب اسم بلدتك.', name: 'أضف اسمك.', phone: 'أضف رقم هاتفك.', message: 'أخبرنا بما تحتاجه.' },
  };
  // Fix 4: a short message under the field that needs fixing
  const fieldErr = (form, f, key) => {
    const id = `err-${form.matches('[data-order]') ? 'order' : 'quote'}-${f.name}`;
    let el = document.getElementById(id);
    if (!key) { if (el) el.remove(); f.removeAttribute('aria-describedby'); return; }
    if (!el) { el = document.createElement('span'); el.className = 'field__err'; el.id = id; f.insertAdjacentElement('afterend', el); }
    el.dataset.key = key; el.textContent = FIELD_ERR[lang][key]; f.setAttribute('aria-describedby', id);
  };
  const validate = (form, names) => {
    let first = null;
    names.forEach(n => {
      const f = form.elements[n];
      const bad = !f.value.trim();
      f.classList.toggle('is-invalid', bad);
      f.setAttribute('aria-invalid', String(bad));
      if (FX(4)) fieldErr(form, f, bad ? n : null);
      if (bad && !first) first = f;
    });
    if (first) first.focus();
    return !first;
  };
  const say = (el, text, error) => { el.textContent = text; el.classList.toggle('is-error', !!error); };

  // Fuel order → WhatsApp
  const order = document.querySelector('[data-order]');
  const orderNote = document.querySelector('[data-order-note]');
  // "Another town in the Bekaa" → town box; "Another governorate" → governorate list + town box
  const otherRow = order.querySelector('[data-other-place]');
  const govField = order.querySelector('[data-gov-field]');
  const extraFields = () => ({ Other: ['place'], 'Other-gov': ['gov', 'place'] }[order.elements.town.value] || []);
  const syncOther = () => {
    const extra = extraFields();
    otherRow.hidden = !extra.length;
    govField.hidden = !extra.includes('gov');
    ['gov', 'place'].forEach(n => {
      const f = order.elements[n];
      f.required = extra.includes(n);
      if (!f.required) { f.classList.remove('is-invalid'); f.removeAttribute('aria-invalid'); fieldErr(order, f, null); }
    });
  };
  order.elements.town.addEventListener('change', syncOther);
  syncOther();
  order.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(order, ['town', ...extraFields(), 'name', 'phone'])) return say(orderNote, MSG[lang].orderInvalid, true);
    const d = Object.fromEntries(new FormData(order));
    const place = (d.place || '').trim();
    const town = d.town === 'Other-gov' ? `${place}${lang === 'ar' ? '، ' : ', '}${order.elements.gov.selectedOptions[0].textContent}`
      : d.town === 'Other' ? `${place} (${lang === 'ar' ? 'البقاع' : 'Bekaa'})`
      : order.elements.town.selectedOptions[0].textContent;
    const type = d.type === 'home' ? (lang === 'ar' ? 'منزل' : 'Home') : (lang === 'ar' ? 'شركة/مؤسسة' : 'Business');
    const fuel = d.fuel === 'petrol' ? (lang === 'ar' ? 'بنزين' : 'Petrol') : (lang === 'ar' ? 'مازوت' : 'Diesel');
    const text = lang === 'ar'
      ? `طلب محروقات\nالاسم: ${d.name}\nالهاتف: ${d.phone}\nالبلدة: ${town}\nنوع المحروقات: ${fuel}\nالتوصيل إلى: ${type}\nالكمية: ${d.qty ? d.qty + ' ليتر' : 'غير محددة'}`
      : `Fuel order\nName: ${d.name}\nPhone: ${d.phone}\nTown: ${town}\nFuel: ${fuel}\nDelivery for: ${type}\nQuantity: ${d.qty ? d.qty + ' L' : 'not specified'}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    say(orderNote, MSG[lang].orderOk);
  });

  // Quote request → email
  const form = document.querySelector('[data-form]');
  const note = document.querySelector('[data-form-note]');
  const topic = form.elements.division;
  document.querySelectorAll('[data-division]').forEach(a => a.addEventListener('click', () => {
    if ([...topic.options].some(o => o.value === a.dataset.division)) topic.value = a.dataset.division;
  }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(form, ['name', 'phone', 'message'])) return say(note, MSG[lang].quoteInvalid, true);
    const d = Object.fromEntries(new FormData(form));
    const about = topic.selectedOptions[0].textContent;
    const body = `Name: ${d.name}\nCompany: ${d.company || '-'}\nPhone: ${d.phone}\nCountry: ${d.country || '-'}\nTopic: ${about}\n\n${d.message}`;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Quote request: ' + about)}&body=${encodeURIComponent(body)}`;
    say(note, MSG[lang].quoteOk);
  });

  /* ---------------- Tahan stations: map + picker + station card ----------------
     To add a station photo: put station-<id>.jpg and .webp in assets/img/ and set
     `photo: 'station-<id>'` below. Coordinates are town centres from OpenStreetMap,
     except where marked "exact pin". TODO swap in each station's exact pin when the client sends them. */
  const STATIONS = [
    { id: 'saraain',   en: 'Saraain',   ar: 'سرعين',     lat: 33.8736875, lng: 36.1003594, photo: 'station-nabi-chit' }, // exact pin from the client (Google Maps "Al Tahan Station 2", plus code V4F2+F4H). TODO own photo
    { id: 'nabi-chit', en: 'Nabi Chit', ar: 'النبي شيت', lat: 33.8717625, lng: 36.1104531, photo: 'station-nabi-chit' }, // exact pin from the client (Google Maps "Wardieh Nabi Chit", plus code V4C6+P54)
    { id: 'al-khodr',  en: 'Al Khodr',  ar: 'الخضر',     lat: 33.9045, lng: 36.1211, photo: 'station-nabi-chit' }, // TODO own photo
    { id: 'temnin',    en: 'Temnin',    ar: 'تمنين',     lat: 33.8647008, lng: 35.9996559, photo: 'station-temnin' }, // exact pin from the client (Google Maps)
    { id: 'mouallaqa', en: 'Mouallaqa', ar: 'المعلقة',   lat: 33.8070, lng: 35.9390, photo: 'station-nabi-chit' }, // TODO own photo
    { id: 'taanayel',  en: 'Taanayel',  ar: 'تعنايل',    lat: 33.7961, lng: 35.8721, photo: 'station-taanayel', pos: '22% 50%' },
    // Beirut southern suburbs. TODO exact pins and own photos from the client (these are neighbourhood estimates)
    { id: 'ain-el-delbeh', en: 'Ain el Delbeh', ar: 'عين الدلبة', lat: 33.8508, lng: 35.5003, photo: 'station-nabi-chit', region: 'dahieh' },
    { id: 'bir-el-abed',   en: 'Bir el Abed',   ar: 'بئر العبد',  lat: 33.8558, lng: 35.5058, photo: 'station-bir-el-abed', region: 'dahieh' },
    { id: 'hadath',        en: 'Hadath (Mécanique)', ar: 'المعاينة، الحدث', lat: 33.8350, lng: 35.5363, photo: 'station-nabi-chit', region: 'dahieh' },
  ];
  const REGION = {
    bekaa:  { en: 'Bekaa', ar: 'البقاع' },
    dahieh: { en: 'Beirut southern suburbs', ar: 'الضاحية الجنوبية' },
  };
  const stWrap = document.getElementById('station');
  if (stWrap) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const picker = stWrap.querySelector('[data-station-picker]');
    const card = stWrap.querySelector('[data-station-card]');
    const img = card.querySelector('[data-station-img]');
    const source = card.querySelector('[data-station-source]');
    const titleEl = card.querySelector('[data-station-title]');
    const placeEl = card.querySelector('[data-station-place]');
    const dirEl = card.querySelector('[data-station-directions]');
    const mapEl = stWrap.querySelector('[data-station-map]');
    const byId = Object.fromEntries(STATIONS.map(st => [st.id, st]));
    const markers = {};
    let current = byId['nabi-chit'];
    let map = null;

    const chips = STATIONS.map(st => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'stations__chip';
      b.dataset.station = st.id;
      b.addEventListener('click', () => choose(st.id, { scroll: false }));
      picker.appendChild(b);
      return b;
    });

    const nameOf = st => (lang === 'ar' ? st.ar : st.en);

    function render() {
      const ar = lang === 'ar';
      const name = nameOf(current);
      titleEl.textContent = ar ? `محطة الطحان، ${name}` : `Tahan station, ${name}`;
      const region = REGION[current.region || 'bekaa'][ar ? 'ar' : 'en'];
      placeEl.textContent = ar ? `${name}، ${region}` : `${name}, ${region}`;
      img.alt = ar ? `محطة الطحان للمحروقات في ${name}` : `Tahan fuel station in ${name}`;
      picker.setAttribute('aria-label', ar ? 'اختر محطة' : 'Choose a station');
      mapEl.setAttribute('aria-label', ar ? 'خريطة محطات الطحان' : 'Map of Tahan stations');
      chips.forEach(c => {
        const st = byId[c.dataset.station];
        c.textContent = nameOf(st);
        c.setAttribute('aria-pressed', String(st === current));
      });
      Object.entries(markers).forEach(([id, m]) => {
        const el = m.getElement();
        el.classList.toggle('is-active', id === current.id);
        el.querySelector('.map-pin__label').textContent = nameOf(byId[id]);
        el.setAttribute('aria-label', (ar ? 'محطة الطحان، ' : 'Tahan station, ') + nameOf(byId[id]));
      });
    }

    function choose(id, { scroll = true, fly = true } = {}) {
      const st = byId[id];
      if (!st) return;
      const photoChanged = st.photo !== current.photo;
      current = st;
      if (photoChanged) {
        card.classList.add('is-swapping');
        source.srcset = `assets/img/${st.photo}.webp`;
        img.src = `assets/img/${st.photo}.jpg`;
        img.style.objectPosition = st.pos || '';
        img.addEventListener('load', () => card.classList.remove('is-swapping'), { once: true });
      } else {
        // Same photo for now: pulse the card so the change is still visible
        card.classList.remove('is-changed'); void card.offsetWidth; card.classList.add('is-changed');
      }
      dirEl.href = `https://www.google.com/maps/search/?api=1&query=${st.lat},${st.lng}`;
      render();
      // Keep every station in view; only pan when the chosen one is off-screen
      if (map && fly) {
        if (showZone) { if ((st.region || 'bekaa') !== currentZone) showZone(st.region || 'bekaa'); }
        else if (!map.getBounds().contains([st.lng, st.lat])) map.easeTo({ center: [st.lng, st.lat], duration: reduceMotion ? 0 : 700 });
      }
      if (scroll) card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      history.replaceState(null, '', `#station-${st.id}`);
    }

    document.addEventListener('tahan:lang', render);

    // Branch links in "Our branches" (and any #station-<id> link)
    document.querySelectorAll('[data-station-link]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      choose(a.dataset.stationLink);
    }));
    const fromHash = () => {
      const m = location.hash.match(/^#station-(.+)$/);
      if (m && byId[m[1]]) choose(m[1]);
    };
    window.addEventListener('hashchange', fromHash);
    render();
    if (location.hash.startsWith('#station-')) requestAnimationFrame(fromHash);

    // Load MapLibre only when the map is about to scroll into view
    const MAPLIBRE = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl';
    const loadMapLib = () => new Promise((resolve, reject) => {
      if (window.maplibregl) return resolve(window.maplibregl);
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = MAPLIBRE + '.css';
      document.head.appendChild(css);
      const js = document.createElement('script');
      js.src = MAPLIBRE + '.js';
      js.onload = () => resolve(window.maplibregl);
      js.onerror = reject;
      document.head.appendChild(js);
    });

    // Fix 5: Bekaa / Beirut switch. Each area gets its own view so the pins stop overlapping.
    let showZone = null, currentZone = 'bekaa';
    const MAP_AR = {
      'CooperativeGesturesHandler.WindowsHelpText': 'استعمل Ctrl مع عجلة الفأرة لتكبير الخريطة',
      'CooperativeGesturesHandler.MacHelpText': 'استعمل ⌘ مع عجلة الفأرة لتكبير الخريطة',
      'CooperativeGesturesHandler.MobileHelpText': 'استعمل إصبعين لتحريك الخريطة',
      'NavigationControl.ZoomIn': 'تكبير', 'NavigationControl.ZoomOut': 'تصغير',
    };
    const initMap = maplibregl => {
      const note = mapEl.querySelector('.stations__mapnote');
      if (note) note.remove();
      const bounds = new maplibregl.LngLatBounds();
      STATIONS.forEach(st => bounds.extend([st.lng, st.lat]));
      const zoneBounds = z => { const b = new maplibregl.LngLatBounds(); STATIONS.filter(st => (st.region || 'bekaa') === z).forEach(st => b.extend([st.lng, st.lat])); return b; };
      const PAD = { top: 90, bottom: 40, left: 70, right: 70 };
      const opts = {
        container: mapEl,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        bounds: FX(5) ? zoneBounds(currentZone) : bounds,
        fitBoundsOptions: { padding: PAD, maxZoom: 14 },
        cooperativeGestures: true,
        attributionControl: { compact: true },
        renderWorldCopies: false,
      };
      if (FX(12) && lang === 'ar') opts.locale = MAP_AR;
      // Arabic place names need MapLibre's right-to-left text plugin to join their letters
      if (FX(12) && maplibregl.getRTLTextPluginStatus && maplibregl.getRTLTextPluginStatus() === 'unavailable') {
        const p = maplibregl.setRTLTextPlugin('https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js', true);
        if (p && p.catch) p.catch(() => {});
      }
      map = new maplibregl.Map(opts);
      if (FX(5)) {
        const zones = document.createElement('div');
        zones.className = 'map-zones'; zones.setAttribute('role', 'group');
        zones.innerHTML = '<button type="button" data-zone="bekaa" aria-pressed="true"></button><button type="button" data-zone="dahieh" aria-pressed="false"></button>';
        mapEl.appendChild(zones);
        const label = () => {
          const ar = lang === 'ar';
          zones.setAttribute('aria-label', ar ? 'المنطقة' : 'Area');
          zones.children[0].textContent = ar ? 'البقاع' : 'Bekaa';
          zones.children[1].textContent = ar ? 'بيروت' : 'Beirut';
        };
        label(); document.addEventListener('tahan:lang', label);
        showZone = z => {
          currentZone = z;
          zones.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.zone === z)));
          map.fitBounds(zoneBounds(z), { padding: PAD, maxZoom: 14, duration: reduceMotion ? 0 : 900 });
        };
        zones.addEventListener('click', e => { const b = e.target.closest('[data-zone]'); if (b && b.dataset.zone !== currentZone) showZone(b.dataset.zone); });
      }
      // Fix 12: place names on the map in Arabic when the page is in Arabic
      if (FX(12)) {
        const original = {};
        const setLabels = () => {
          (map.getStyle().layers || []).forEach(l => {
            if (l.type !== 'symbol' || !l.layout || !l.layout['text-field']) return;
            if (!(l.id in original)) original[l.id] = l.layout['text-field'];
            map.setLayoutProperty(l.id, 'text-field', lang === 'ar' ? ['coalesce', ['get', 'name:ar'], ['get', 'name_ar'], ['get', 'name']] : original[l.id]);
          });
        };
        map.on('load', setLabels);
        document.addEventListener('tahan:lang', () => { if (map.isStyleLoaded()) setLabels(); });
      }
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), lang === 'ar' ? 'top-left' : 'top-right');
      STATIONS.forEach(st => {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'map-pin';
        el.innerHTML = '<span class="map-pin__dot" aria-hidden="true">H</span><span class="map-pin__label"></span>';
        el.addEventListener('click', e => { e.stopPropagation(); choose(st.id, { fly: false }); });
        markers[st.id] = new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat([st.lng, st.lat]).addTo(map);
      });
      render();
    };

    const mapIo = new IntersectionObserver(entries => {
      if (!entries.some(en => en.isIntersecting)) return;
      mapIo.disconnect();
      loadMapLib().then(initMap).catch(() => {
        const note = mapEl.querySelector('.stations__mapnote');
        if (note) note.textContent = lang === 'ar' ? 'تعذّر تحميل الخريطة. اختر بلدة من القائمة.' : 'The map could not load. Choose a town from the list.';
      });
    }, { rootMargin: '400px 0px' });
    mapIo.observe(mapEl);
  }

  /* ---------------- Footer: sticker slap ----------------
     Vanilla port of the 21st.dev "Sticker Slap Footer". The single-stroke script
     alphabet, layout and sticker placement are taken from the component as-is; the
     stickers are redrawn for Tahan (emblem, 1985 burst, oil drop, flame, tanker, bubble). */
  const ssf = document.querySelector('[data-ssf]');
  if (ssf) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
    const round = v => Math.round(v * 100) / 100;
    const clamp = (v, lo, hi) => (Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : lo);
    const SCRIPT = {
      a: [10.2, 'M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6.1 0 7.6 -2.2 7.6 -5L7.8 -10L7.8 -3C7.8 -0.8 8.8 -1 10.2 -1'],
      h: [10, 'M0 -1C2.8 -3 6.2 -12 6 -16.4C5.8 -19.8 1.8 -20 1.8 -16.4L1.8 -1L1.8 -5.6C2.6 -8.6 4 -10 5.6 -10C7.2 -10 7.8 -8.8 7.8 -7L7.8 -3C7.8 -0.8 8.8 -1 10 -1'],
      i: [5, 'M0 -1C1.2 -1.4 2 -6 2.2 -10L2.2 -3C2.2 -0.8 3.4 -1 5 -1', 'M2.4 -15.2L2.5 -15.3'],
      l: [6.4, 'M0 -1C2.8 -3 6.2 -12 6 -16.4C5.8 -19.8 1.8 -20 1.8 -16.4L1.8 -3.2C1.8 -0.6 4 -1 6.4 -1'],
      n: [9.6, 'M0 -1C1.2 -1.6 1.6 -6 1.8 -9.6L1.8 -1L1.8 -5.6C2.4 -8.6 3.4 -10 4.8 -10C6.4 -10 7.2 -9 7.2 -7L7.2 -3C7.2 -0.8 8.2 -1 9.6 -1'],
      o: [9, 'M0 -1C1.4 -1.4 1.4 -9.6 4.3 -10C2.5 -10 1 -7.8 1 -5C1 -2.2 2.5 0 4.3 0C6.1 0 7.6 -2.2 7.6 -5C7.6 -7.8 6.1 -10 4.3 -10C6 -10 7.4 -9.2 9 -9', '', 1],
      t: [6.6, 'M0 -1C1 -1.4 2.2 -8 2.4 -15L2.4 -3.2C2.4 -0.8 4 -1 6.6 -1', 'M-0.8 -9.6L6.2 -9.6'],
      '!': [4, 'M2 -16L2 -4.4', 'M2 -0.6L2.1 -0.7', 1],
    };
    const SX = 1.22, TRACK = 1, WORD_GAP = 6, CUT = -1.2, STROKE = 3.3, SLANT = 0.1584;
    const place = (d, dx, sx = SX) => { let k = 0; return d.replace(/-?\d*\.?\d+/g, n => (k++ % 2 === 0 ? String(round(+n * sx + dx)) : n)); };
    const ys = d => (d.match(/-?\d*\.?\d+/g) || []).map(Number).filter((_, i) => i % 2 === 1);
    const layoutScript = text => {
      let x = 0, main = '', lift = true, top = 0, bottom = 0;
      const extra = [], boxes = [];
      for (const ch of String(text).toLowerCase()) {
        const g = SCRIPT[ch];
        if (!g) { if (main) x += WORD_GAP; lift = true; continue; }
        const d = place(g[1], x);
        main += lift ? d : 'L' + d.slice(1);
        if (g[2]) extra.push(place(g[2], x));
        const yy = ys(g[1] + (g[2] || ''));
        const t = Math.min(...yy);
        top = Math.min(top, t); bottom = Math.max(bottom, ...yy);
        boxes.push({ x0: round(x), x1: round(x + g[0] * SX), top: t });
        lift = !!g[3];
        x += g[0] * SX + TRACK;
      }
      return { main, extra, width: boxes.length ? round(x - TRACK) : 0, top, bottom, boxes };
    };
    const starPath = (points, outer, inner, cx = 0, cy = 0, wobble = 0, seed = 0) => {
      const n = Math.max(3, Math.floor(points) || 3), pts = [];
      for (let i = 0; i < n * 2; i++) {
        const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 ? inner : outer * (1 + (hash(i * 9.7 + seed) - 0.5) * wobble);
        pts.push(round(cx + Math.cos(a) * r) + ' ' + round(cy + Math.sin(a) * r));
      }
      return 'M' + pts.join('L') + 'Z';
    };
    const stickerSpots = (word, n, seed = 0) => Array.from({ length: n }, (_, i) => {
      const x = ((i + 0.5) / n) * word.width;
      const box = word.boxes.find(b => x >= b.x0 && x <= b.x1 + TRACK) || word.boxes[word.boxes.length - 1];
      const lift = [1.5, -5, -1, -7, 0.5, -4, -2][i % 7];
      return {
        x: round(x + (hash(i * 4.1 + seed) - 0.5) * 3),
        y: round(clamp(box.top + 2.5 + lift, word.top - 4, -4)),
        size: round(6.4 + hash(i * 2.3 + seed + 1) * 2.4),
        rotate: round((hash(i * 7.7 + seed + 2) - 0.5) * 34),
        depth: round(0.4 + hash(i * 5.5 + seed + 3) * 0.8),
      };
    });
    // a word in the script, as markup, scaled to fit a w-wide box centred on (cx, cy)
    const scriptText = (text, cx, cy, w, color, stroke = STROKE) => {
      const { main, extra, width, top } = layoutScript(text);
      const s = w / (width + stroke), h = (-top + 1) * s;
      return `<g transform="translate(${round(cx - (width * s) / 2)} ${round(cy + h / 2 - s)}) scale(${round(s)})"><path d="${main + extra.join('')}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    };

    /* Tahan stickers: [silhouette (die-cut in white), art], in a 120 × 120 box */
    const BURST = starPath(13, 54, 39, 60, 60, 0.2, 4);
    const BUBBLE = 'M24 22H96A14 14 0 0 1 110 36V70A14 14 0 0 1 96 84H56L34 102L38 84H24A14 14 0 0 1 10 70V36A14 14 0 0 1 24 22Z';
    const DROP = 'M60 10C60 10 24 54 24 76A36 36 0 0 0 96 76C96 54 60 10 60 10Z';
    const FLAME = 'M62 8C66 30 92 42 92 72A32 32 0 0 1 28 72C28 54 40 46 44 32C50 44 54 48 58 50C60 36 58 22 62 8Z';
    const STICKERS = [
      { id: 'emblem', en: 'Tahan emblem sticker', ar: 'ملصق شعار الطحان',
        shape: '<circle cx="60" cy="60" r="50"/>',
        art: '<circle cx="60" cy="60" r="50" fill="#fff"/><circle cx="60" cy="60" r="43" fill="none" stroke="#D7141A" stroke-width="7"/><path d="M44 36V84M76 36V84M44 60H76" fill="none" stroke="#B50F14" stroke-width="12" stroke-linecap="round"/><path d="M20 70C40 92 86 96 104 54" fill="none" stroke="#C9D6EA" stroke-width="4" stroke-linecap="round"/>' },
      { id: 'burst', en: 'Since 1985 sticker', ar: 'ملصق منذ 1985',
        shape: `<path d="${BURST}"/>`,
        art: `<path d="${BURST}" fill="#B50F14"/><path d="${starPath(13, 44, 33, 60, 60, 0.2, 4)}" fill="#EF3B42"/><text x="60" y="56" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="13" fill="#fff" letter-spacing="1">SINCE</text><text x="60" y="78" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="24" fill="#fff">1985</text>` },
      { id: 'drop', en: 'Oil drop sticker', ar: 'ملصق قطرة زيت',
        shape: `<path d="${DROP}"/>`,
        art: `<path d="${DROP}" fill="#F2B233"/><path d="${DROP}" fill="none" stroke="#C98A12" stroke-width="3"/><path d="M42 72C42 62 48 52 54 44" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".85"/><circle cx="72" cy="80" r="5" fill="#fff" opacity=".5"/>` },
      { id: 'tanker', en: 'Tahan tanker sticker', ar: 'ملصق صهريج الطحان',
        shape: '<rect x="6" y="34" width="108" height="56" rx="18"/><circle cx="32" cy="92" r="14"/><circle cx="88" cy="92" r="14"/>',
        art: '<rect x="8" y="40" width="70" height="42" rx="20" fill="#fff" stroke="#0B1634" stroke-width="3"/><path d="M12 66H74" stroke="#D7141A" stroke-width="5"/><path d="M12 72H74" stroke="#B50F14" stroke-width="3"/><circle cx="30" cy="56" r="8" fill="#fff" stroke="#D7141A" stroke-width="2.5"/><path d="M27 52V60M33 52V60M27 56H33" stroke="#B50F14" stroke-width="2.5"/><path d="M82 46H98L110 60V82H82Z" fill="#D7141A"/><path d="M88 52H97L104 62H88Z" fill="#C9DAF7"/><circle cx="32" cy="88" r="10" fill="#0B1634"/><circle cx="32" cy="88" r="4" fill="#C9D6EA"/><circle cx="92" cy="88" r="10" fill="#0B1634"/><circle cx="92" cy="88" r="4" fill="#C9D6EA"/>' },
      { id: 'flame', en: 'Fuel flame sticker', ar: 'ملصق شعلة المحروقات',
        shape: `<path d="${FLAME}"/>`,
        art: `<path d="${FLAME}" fill="#D7141A"/><path d="M60 50C62 62 76 68 76 82A16 16 0 0 1 44 82C44 72 52 68 54 60C56 66 58 66 60 50Z" fill="#FFB199"/><path d="M40 70C40 60 44 54 48 48" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>` },
      { id: 'bubble', en: 'Ahlan speech bubble sticker', ar: 'ملصق فقاعة أهلاً',
        shape: `<path d="${BUBBLE}"/>`,
        art: `<path d="${BUBBLE}" fill="#EEF1F4"/>` + scriptText('ahlan!', 60, 52, 74, '#0B1634', 3.6) },
    ];

    const WORD = 'tahan';
    const word = layoutScript(WORD);
    const pad = STROKE / 2 + 0.6;
    const vbX = -1.4 - pad, vbY = word.top - pad;
    const vbW = Math.max(word.width, 1) + 2.8 + pad * 2 - word.top * SLANT;
    const vbH = word.bottom + pad - vbY;
    const cutH = CUT - vbY;
    const drawDur = clamp(0.7 + word.width / 45, 1.1, 2.6);
    const writeAt = 1.05;
    const endAt = writeAt + drawDur + word.extra.length * 0.16 + 0.5;
    const spots = stickerSpots(word, STICKERS.length, 3);
    const toPct = s => ({ x: ((s.x - s.y * SLANT - vbX) / vbW) * 100, y: ((s.y - vbY) / vbH) * 100 });

    const stage = ssf.querySelector('[data-ssf-stage]');
    const replayBtn = ssf.querySelector('[data-ssf-replay]');
    ssf.style.setProperty('--ssf-ar', String(round(vbW / cutH)));
    ssf.style.setProperty('--end', endAt.toFixed(2) + 's');
    stage.style.marginBottom = round(-((vbH - cutH) / vbW) * 100) + '%';
    ssf.querySelector('[data-ssf-star]').setAttribute('d', starPath(11, 48, 30, 0, 0, 0.3, 7));

    const drawWordmark = () => {
      replayBtn.innerHTML =
        `<svg class="ssf-wm" viewBox="${[vbX, vbY, vbW, vbH].map(round).join(' ')}" aria-hidden="true" focusable="false"><g transform="skewX(-9)">` +
        `<path d="${word.main}" data-draw style="--dur:${drawDur}s;--at:${writeAt}s"/>` +
        word.extra.map((d, k) => `<path d="${d}" data-draw style="--dur:.22s;--at:${round(writeAt + drawDur + k * 0.16)}s"/>`).join('') +
        '</g></svg>';
      ssf.querySelectorAll('path[data-draw]').forEach(pth => pth.style.setProperty('--l', Math.ceil(pth.getTotalLength()) + 1 + 'px'));
    };
    drawWordmark();

    // stickers: each slaps down the moment the pen passes under it
    const items = STICKERS.map((st, i) => {
      const spot = spots[i];
      const home = toPct(spot);
      const xf = clamp((home.x / 100) * vbW + vbX, 0, word.width) / Math.max(word.width, 1);
      const host = document.createElement('div');
      host.className = 'ssf-st';
      host.style.cssText = `left:${home.x}%;top:${home.y}%;width:${round((spot.size / vbW) * 100)}%;--r:${spot.rotate}deg;--d:${spot.depth};--at:${round(writeAt + drawDur * Math.pow(xf, 0.92) + 0.08)}s`;
      const gid = 'ssf' + st.id;
      host.innerHTML =
        `<button type="button" class="ssf-st-btn"><span class="ssf-st-lift"><span class="ssf-st-slap">` +
        `<svg viewBox="-6 -6 132 132" aria-hidden="true" focusable="false"><defs><clipPath id="${gid}c">${st.shape}</clipPath>` +
        `<linearGradient id="${gid}g" x1="0" x2="1"><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset=".65" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>` +
        `<g fill="#fff" stroke="#fff" stroke-width="11" stroke-linejoin="round">${st.shape}</g>${st.art}` +
        `<g clip-path="url(#${gid}c)"><g transform="rotate(20 60 60)"><rect class="ssf-sheen" x="-30" y="-30" width="180" height="180" fill="url(#${gid}g)"/></g></g></svg>` +
        `</span></span></button><span class="ssf-ring" aria-hidden="true"></span>`;
      stage.appendChild(host);
      return { st, host, btn: host.firstElementChild, home, at: { ...home } };
    });

    const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wiggle = (el, frames, duration) => { if (!reduced() && el && el.animate) el.animate(frames, { duration, easing: 'cubic-bezier(.3,1.4,.4,1)' }); };
    const slapFrames = [{ transform: 'scale(1.14)' }, { transform: 'scale(.93,1.04)', offset: 0.4 }, { transform: 'scale(1.02,.98)', offset: 0.7 }, { transform: 'none' }];
    const shakeFrames = [{ transform: 'none' }, { transform: 'rotate(-14deg) scale(1.1)', offset: 0.3 }, { transform: 'rotate(9deg)', offset: 0.6 }, { transform: 'none' }];
    let zTop = 3;
    const putAt = (it, p) => { it.at = p; it.host.style.left = p.x + '%'; it.host.style.top = p.y + '%'; };
    const goHome = it => { putAt(it, { ...it.home }); wiggle(it.btn.querySelector('.ssf-st-lift'), slapFrames, 420); };

    const labelStickers = () => items.forEach(it => {
      const name = lang === 'ar' ? it.st.ar : it.st.en;
      it.btn.setAttribute('aria-label', name + (lang === 'ar' ? '. اسحبه أو حرّكه بالأسهم' : '. Drag it or move it with the arrow keys'));
    });
    labelStickers();
    document.addEventListener('tahan:lang', labelStickers);

    items.forEach(it => {
      let d = null;
      it.btn.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        const r = stage.getBoundingClientRect();
        it.btn.setPointerCapture(e.pointerId);
        d = { id: e.pointerId, sx: it.at.x, sy: it.at.y, px: e.clientX, py: e.clientY, lx: e.clientX, t: performance.now(), tilt: 0, w: r.width, h: r.height, went: false };
        it.host.style.zIndex = ++zTop;
      });
      it.btn.addEventListener('pointermove', e => {
        if (!d || d.id !== e.pointerId) return;
        const dx = e.clientX - d.px, dy = e.clientY - d.py;
        if (!d.went && Math.hypot(dx, dy) < 4) return;
        if (!d.went) it.host.classList.add('is-drag');
        d.went = true;
        it.host.style.left = clamp(d.sx + (dx / d.w) * 100, 1, 99) + '%';
        it.host.style.top = clamp(d.sy + (dy / d.h) * 100, -70, 96) + '%';
        const now = performance.now();
        const v = (e.clientX - d.lx) / Math.max(1, now - d.t);
        d.tilt = d.tilt * 0.75 + clamp(v * 22, -24, 24) * 0.25;
        d.lx = e.clientX; d.t = now;
        it.host.style.setProperty('--tilt', d.tilt.toFixed(2) + 'deg');
      });
      const end = e => {
        if (!d || d.id !== e.pointerId) return;
        const went = d.went;
        d = null;
        it.host.classList.remove('is-drag');
        it.host.style.setProperty('--tilt', '0deg');
        const lift = it.btn.querySelector('.ssf-st-lift');
        if (went) { it.at = { x: parseFloat(it.host.style.left), y: parseFloat(it.host.style.top) }; wiggle(lift, slapFrames, 420); }
        else wiggle(lift, shakeFrames, 520);
      };
      it.btn.addEventListener('pointerup', end);
      it.btn.addEventListener('pointercancel', end);
      it.btn.addEventListener('dblclick', () => goHome(it));
      it.btn.addEventListener('keydown', e => {
        const step = e.shiftKey ? 6 : 2;
        const go = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
        if (go) {
          e.preventDefault();
          it.host.style.zIndex = ++zTop;
          putAt(it, { x: clamp(it.at.x + go[0], 1, 99), y: clamp(it.at.y + go[1], -70, 96) });
        } else if (e.key === 'Home' || e.key === 'Escape') { e.preventDefault(); goHome(it); }
      });
    });

    // write it again: the wordmark redraws and every sticker slaps back home
    replayBtn.addEventListener('click', () => {
      items.forEach(it => putAt(it, { ...it.home }));
      drawWordmark();
      ssf.querySelectorAll('.ssf-st-slap, .ssf-ring').forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
    });
    const setReplayLabel = () => replayBtn.setAttribute('aria-label', lang === 'ar' ? 'أعد كتابة tahan' : 'Write tahan again');
    setReplayLabel();
    document.addEventListener('tahan:lang', setReplayLabel);

    // copy the email
    const copyBtn = ssf.querySelector('[data-ssf-copy]');
    const status = ssf.querySelector('[data-ssf-status]');
    let copyTimer = 0;
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.email);
        copyBtn.classList.add('is-copied');
        status.textContent = lang === 'ar' ? 'تم نسخ البريد الإلكتروني' : 'Email address copied';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => { copyBtn.classList.remove('is-copied'); status.textContent = ''; }, 2200);
      } catch (err) { window.location.href = 'mailto:' + CONFIG.email; }
    });

    // credits pill
    const pill = ssf.querySelector('.ssf-pill');
    const pop = ssf.querySelector('.ssf-pop');
    const setPop = open => { pop.hidden = !open; pill.setAttribute('aria-expanded', String(open)); };
    pill.addEventListener('click', () => setPop(pop.hidden));
    document.addEventListener('pointerdown', e => { if (!pop.hidden && !ssf.querySelector('[data-ssf-credits]').contains(e.target)) setPop(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) { setPop(false); pill.focus(); } });

    // storyboard: plays once, the first time a fifth of the footer is on screen
    ssf.classList.add('is-armed');
    const ssfIo = new IntersectionObserver(entries => {
      if (entries.some(en => en.isIntersecting)) { ssf.classList.add('is-in'); ssfIo.disconnect(); }
    }, { threshold: 0.2 });
    ssfIo.observe(ssf);

    // scroll-linked growth (--ssf-sp) and pointer parallax (--ssf-px / --ssf-py)
    let ssfRaf = 0;
    const ssfUpdate = () => {
      ssfRaf = 0;
      const r = ssf.getBoundingClientRect();
      const vh = document.documentElement.clientHeight || r.height;
      const pr = clamp((vh - r.top) / (Math.min(r.height, vh) || 1), 0, 1);
      ssf.style.setProperty('--ssf-sp', (1 - Math.pow(1 - pr, 2)).toFixed(4));
    };
    ssfUpdate();
    window.addEventListener('scroll', () => { if (!ssfRaf) ssfRaf = requestAnimationFrame(ssfUpdate); }, { passive: true });
    window.addEventListener('resize', ssfUpdate);
    ssf.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const r = ssf.getBoundingClientRect();
      ssf.style.setProperty('--ssf-px', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      ssf.style.setProperty('--ssf-py', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    });
    ssf.addEventListener('pointerleave', () => { ssf.style.setProperty('--ssf-px', '0'); ssf.style.setProperty('--ssf-py', '0'); });
  }


  /* ---------------- Audit fixes that need script (switches in assets/js/fixes.js) ---------------- */
  // 2. Back to top on phones: only while scrolling up, and never over the footer
  if (FX(2) && toTop) {
    const phone = window.matchMedia('(max-width: 760px)');
    const foot = document.querySelector('.ssf') || document.querySelector('footer');
    let lastY = window.scrollY, goingUp = false;
    const hold = () => {
      const y = window.scrollY;
      if (y < lastY - 3) goingUp = true; else if (y > lastY + 3) goingUp = false;
      lastY = y;
      const atFoot = foot && foot.getBoundingClientRect().top < window.innerHeight - 60;
      toTop.classList.toggle('is-held', phone.matches && (!goingUp || atFoot));
    };
    window.addEventListener('scroll', hold, { passive: true });
    hold();
  }

  // 3. The fourth-company line moves into the empty cell under Tahan Plast
  if (FX(3)) {
    const soon = document.querySelector('.co__soon');
    const grid = document.querySelector('.co__grid');
    if (soon && grid) { const li = document.createElement('li'); li.className = 'co__soon-item'; li.appendChild(soon); grid.appendChild(li); }
  }

  // 4. Clear a field's error as soon as it is filled in
  if (FX(4)) {
    document.querySelectorAll('[data-order], [data-form]').forEach(fm => {
      const clear = e => { const f = e.target; if (f.classList.contains('is-invalid') && f.value.trim()) { f.classList.remove('is-invalid'); f.setAttribute('aria-invalid', 'false'); fieldErr(fm, f, null); } };
      fm.addEventListener('input', clear); fm.addEventListener('change', clear);
    });
    document.addEventListener('tahan:lang', () => document.querySelectorAll('.field__err').forEach(el => el.textContent = FIELD_ERR[lang][el.dataset.key]));
  }

  // 6. An arrow instead of the photo icon in the branch list
  if (FX(6)) document.querySelectorAll('.route__photo use').forEach(u => u.setAttribute('href', '#i-arrow'));

  // 9. Phones: hide the bottom bar while an order button or the order form is on screen
  if (FX(9)) {
    const bar = document.querySelector('.actionbar');
    const watch = [document.querySelector('.kv__actions'), document.querySelector('.pet__ctas'), document.querySelector('#order')].filter(Boolean);
    if (bar && watch.length && 'IntersectionObserver' in window) {
      const inView = new Set();
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting ? inView.add(e.target) : inView.delete(e.target));
        bar.classList.toggle('is-tucked', inView.size > 0);
      }, { threshold: 0.2 });
      watch.forEach(el => io.observe(el));
    }
  }

  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
