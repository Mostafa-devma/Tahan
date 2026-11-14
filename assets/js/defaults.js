/* Tahan Group: the site's default content.
   main.js shows these unless the owner changed them in /admin (saved in Supabase, see content.js).
   Edit here to change a default for everyone; edits made in /admin take priority over these. */
(() => {
  const CONFIG = {
    phone: '+96176999978',            // temporary number from the client (Lebanon); confirm it is final
    phoneDisplay: '+961 76 999 978',  // how it should look on the page
    whatsapp: '96176999978',          // assumed same as the phone: confirm it has WhatsApp
    email: 'al-tahan-trading@hotmail.com',
  };

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
    'co.st': 'محطات الطحان', 'co.st1': '8 فروع', 'co.st2': 'خريطة واتجاهات',
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
    'pet.where': 'فروعنا', 'pet.more': 'ونوصل أيضاً إلى أكثر من 10 بلدات لبنانية أخرى',
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

    'ssf.nav': 'اطلب', 'ssf.t1': 'شركاتنا', 'ssf.t2': 'أين تجدنا', 'ssf.where': '8 فروع وأكثر من 17 بلدة',
    'ssf.map': 'شاهد محطاتنا', 'ssf.copied': 'تم النسخ. نتواصل قريباً!', 'ssf.wa': 'راسلنا على واتساب',
    'ssf.note': '*أسرع طريقة لطلب المحروقات هي واتساب. نتصل بك لتأكيد السعر.',
    'ssf.pill': 'مجموعة الطحان', 'ssf.c1r': 'التأسيس', 'ssf.c1n': 'البقاع، 1985',
    'ssf.c2r': 'الشركات', 'ssf.c2n': 'المحروقات، الزيوت، البلاستيك', 'ssf.c3r': 'الحقوق',
    'ft.tag': 'محروقات وزيوت وبلاستيك. شركة عائلية منذ 1985.', 'ft.div': 'الشركات', 'ft.do': 'خدماتنا',
    'ft.ct': 'التواصل', 'ft.rights': 'جميع الحقوق محفوظة.', 'ab.call': 'اتصال',
  };

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

  const STATIONS = [
    { id: 'saraain',   en: 'Saraain',   ar: 'سرعين',     lat: 33.8736875, lng: 36.1003594, photo: 'station-nabi-chit' }, // exact pin from the client (Google Maps "Al Tahan Station 2", plus code V4F2+F4H). TODO own photo
    { id: 'nabi-chit', en: 'Nabi Chit', ar: 'النبي شيت', lat: 33.8717625, lng: 36.1104531, photo: 'station-nabi-chit' }, // exact pin from the client (Google Maps "Wardieh Nabi Chit", plus code V4C6+P54)
    { id: 'al-khodr',  en: 'Al Khodr',  ar: 'الخضر',     lat: 33.8901646, lng: 36.1255903, photo: 'station-nabi-chit' }, // exact pin from the client (Google Maps). TODO own photo
    { id: 'temnin',    en: 'Temnin',    ar: 'تمنين',     lat: 33.8647008, lng: 35.9996559, photo: 'station-temnin' }, // exact pin from the client (Google Maps)
    { id: 'taanayel',  en: 'Taanayel',  ar: 'تعنايل',    lat: 33.8053625, lng: 35.8630469, photo: 'station-taanayel', /* exact pin from the client (Google Maps "Mohammad Jamal's Hypco, Jdita", plus code RV47+46V) */ pos: '22% 50%' },
    // Beirut southern suburbs. TODO exact pins and own photos from the client (these are neighbourhood estimates)
    { id: 'ain-el-delbeh', en: 'Ain el Delbeh', ar: 'عين الدلبة', lat: 33.8370914, lng: 35.5010128, photo: 'station-nabi-chit', region: 'dahieh' }, // exact pin from the client (Google Maps)
    { id: 'bir-el-abed',   en: 'Bir el Abed',   ar: 'بئر العبد',  lat: 33.8518113, lng: 35.5124427, photo: 'station-bir-el-abed', region: 'dahieh' }, // exact pin from the client (Google Maps)
    { id: 'hadath',        en: 'Hadath (Mécanique)', ar: 'المعاينة، الحدث', lat: 33.8350, lng: 35.5363, photo: 'station-nabi-chit', region: 'dahieh' },
  ];
  const REGION = {
    bekaa:  { en: 'Bekaa', ar: 'البقاع' },
    dahieh: { en: 'Beirut southern suburbs', ar: 'الضاحية الجنوبية' },
  };

  window.TAHAN_DEFAULTS = { CONFIG, AR, PLAST, KINDS, UNIT, COLOURS, OIL_GRADES, OILS, STATIONS, REGION };
})();
