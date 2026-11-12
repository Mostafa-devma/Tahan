/* ==========================================================================
   مفاتيح تعديلات الفحص  ·  Audit fix switches
   --------------------------------------------------------------------------
   كل سطر تحت هو تعديل واحد من تقرير الفحص (_audit/index.html)، بنفس رقمه.

     true   = التعديل شغّال
     false  = رجّع هالجزء متل ما كان قبل التعديل (undo)

   غيّر القيمة، احفظ الملف، وحدّث الصفحة. ما في شي تاني لازم يتغيّر.

   للتجربة بلا ما تلمس الملف: زيد ?fixes بآخر الرابط
   (مثلاً http://localhost:8080/?fixes) وبتطلعلك لوحة فيها كل المفاتيح.
   اللي بتغيّره باللوحة بيضل على جهازك بس، والملف هو اللي بيعتمده الموقع.
   ========================================================================== */
window.TAHAN_FIXES = {
  1:  true,  // الشريط فوق الفوتر (نجمة "اطلب" + شعار + واتساب): مخفي
  2:  true,  // زر الرجوع للأعلى: على الموبايل بيظهر بس لما تطلع لفوق، أصغر، وبيختفي عند الفوتر
  3:  true,  // "محطات الطحان" عليها "تابعة للطحان للمحروقات"، وجملة الشركة الرابعة بمكان الفراغ
  4:  true,  // الفورمين: الخانة الناقصة بتتلوّن وتحتها شو ناقص
  5:  true,  // الخريطة: زرّين "البقاع" و"بيروت"، وبتفتح على البقاع
  6:  true,  // قائمة الفروع: أسطر أعلى للإصبع، وسهم بدل أيقونة الصورة
  7:  true,  // الفراغات: كرت الطلب بطوله الطبيعي، وفراغات أقل
  8:  true,  // "منذ 1985 / +17 بلدة / منازل وشركات": نص عادي بلا إطار
  9:  true,  // الموبايل: الشريط السفلي بيختفي لما يكون زر الطلب أو الفورم ظاهر
  10: true,  // الهيرو: بلا المربعات المغبّشة
  11: true,  // "مع من نعمل": بلا العنوان المكرر، وأسماء الشركات أوضح
  12: true,  // العربي: "واتساب" بالعربي، بلا كلمة "Group"، والخريطة بالعربي
  13: true,  // غوغل: رابط أساسي (canonical) وبيانات الفروع
  14: true,  // الخطوط من ملفات الموقع بدل غوغل (أسرع)
  15: true,  // تباين أوضح لـ "قريباً" ولجملة الشركة الرابعة
  16: true,  // التابلت: صورة عبوة "التعبئة للغير" أقصر
};
/* تعديلات ما إلها مفتاح (ما بتنرجع من هون):
   - صورة المشاركة صارت assets/img/og-image.jpg برابط كامل (بالـ <head> بـ index.html).
   - فيديوهات المرجع انتقلت لبرّا مجلد الموقع، على "C:\Users\User\Tahan Group - references". */


/* ---------- من هون وتحت ما في داعي تعدّل شي ---------- */
(function () {
  var F = window.TAHAN_FIXES, root = document.documentElement, KEY = 'tahan-fixes-preview';
  var NAMES = {
    1: 'الشريط فوق الفوتر', 2: 'زر الرجوع للأعلى', 3: 'محطات الطحان والشركة الرابعة', 4: 'أخطاء الفورم',
    5: 'أزرار الخريطة', 6: 'قائمة الفروع', 7: 'الفراغات', 8: 'مربعات المحروقات', 9: 'الشريط السفلي',
    10: 'مربعات الهيرو المغبّشة', 11: 'مع من نعمل', 12: 'كلمات إنكليزية بالعربي', 13: 'بيانات غوغل',
    14: 'الخطوط', 15: 'التباين', 16: 'صورة التابلت'
  };
  var over = {};
  try { over = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  var on = {};
  Object.keys(F).forEach(function (k) { on[k] = Object.prototype.hasOwnProperty.call(over, k) ? !!over[k] : !!F[k]; });
  window.TAHAN_FX = function (n) { return !!on[n]; };
  Object.keys(on).forEach(function (k) { if (on[k]) root.classList.add('fx-' + k); });

  // 14 off: go back to the Google Fonts stylesheet
  if (!on[14]) {
    var local = document.getElementById('fonts-local');
    if (local) local.remove();
    var g = document.createElement('link');
    g.rel = 'stylesheet';
    g.href = 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400..800;1,62..125,400..800&family=Cairo:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(g);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // HTML that belongs to one fix carries data-fx="N" and goes away when N is off
    [].forEach.call(document.querySelectorAll('[data-fx]'), function (el) { if (!on[el.getAttribute('data-fx')]) el.remove(); });
    var overridden = Object.keys(over).length > 0;
    if (/[?&]fixes(\b|=)/.test(location.search) || overridden) panel(overridden);
  });

  // Preview panel: flip fixes on this device only, to compare before and after
  function panel(overridden) {
    var box = document.createElement('aside');
    box.setAttribute('dir', 'rtl');
    box.setAttribute('aria-label', 'مفاتيح التعديلات');
    box.style.cssText = 'position:fixed;z-index:9999;left:12px;top:90px;width:280px;max-height:calc(100vh - 200px);overflow:auto;background:#fff;color:#0A0E18;' +
      'font:14px/1.5 Cairo,system-ui,sans-serif;box-shadow:0 20px 50px -20px rgba(6,12,32,.5),0 0 0 1px #DEE2E7;padding:12px 14px';
    var rows = Object.keys(F).map(function (k) {
      var differs = on[k] !== !!F[k];
      return '<label style="display:flex;gap:8px;align-items:center;min-height:30px;cursor:pointer' + (differs ? ';color:#B3261E;font-weight:700' : '') + '">' +
        '<input type="checkbox" data-k="' + k + '"' + (on[k] ? ' checked' : '') + '> <b style="min-width:20px">' + k + '</b> ' + NAMES[k] + '</label>';
    }).join('');
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b>مفاتيح التعديلات</b>' +
      '<button type="button" data-x style="border:0;background:none;font-size:20px;cursor:pointer;line-height:1" aria-label="إخفاء">×</button></div>' +
      '<p style="margin:0 0 8px;color:#4F5866;font-size:12.5px">هيدي تجربة على جهازك بس. ' + (overridden ? '<b style="color:#B3261E">في تغييرات عن الملف (بالأحمر).</b>' : 'الحالة متل الملف.') + '</p>' +
      rows +
      '<div style="display:grid;gap:6px;margin-top:10px">' +
      '<button type="button" data-all-off style="min-height:36px;cursor:pointer">كل شي متل قبل (للمقارنة)</button>' +
      '<button type="button" data-reset style="min-height:36px;cursor:pointer">رجوع لإعدادات الملف</button>' +
      '<button type="button" data-copy style="min-height:36px;cursor:pointer">انسخ الإعدادات للملف</button></div>';
    document.body.appendChild(box);
    var reload = function () { try { sessionStorage.setItem('tahan-fixes-y', String(window.scrollY)); } catch (e) {} location.reload(); };
    var save = function (o) { try { if (o) localStorage.setItem(KEY, JSON.stringify(o)); else localStorage.removeItem(KEY); } catch (e) {} reload(); };
    box.addEventListener('change', function (e) {
      var k = e.target.getAttribute('data-k'); if (!k) return;
      over[k] = e.target.checked;
      if (over[k] === !!F[k]) delete over[k];
      save(Object.keys(over).length ? over : null);
    });
    box.querySelector('[data-x]').onclick = function () { box.remove(); };
    box.querySelector('[data-reset]').onclick = function () { save(null); };
    box.querySelector('[data-all-off]').onclick = function () { var o = {}; Object.keys(F).forEach(function (k) { o[k] = false; }); save(o); };
    box.querySelector('[data-copy]').onclick = function (e) {
      var text = 'window.TAHAN_FIXES = {\n' + Object.keys(F).map(function (k) { return '  ' + (k + ':').padEnd(4) + (on[k] ? 'true, ' : 'false,') + ' // ' + NAMES[k]; }).join('\n') + '\n};';
      var b = e.target;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { b.textContent = 'انتسخت. الصقها بالملف مكان القائمة'; },
        function () { window.prompt('انسخ هالنص:', text); });
    };
    try { var y = sessionStorage.getItem('tahan-fixes-y'); if (y) { sessionStorage.removeItem('tahan-fixes-y'); window.scrollTo(0, +y); } } catch (e) {}
  }
})();
