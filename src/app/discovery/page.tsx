'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

interface F {
  // 1
  storeName: string; trademarkRegistered: string; ownerName: string;
  phone: string; email: string; existingWebsite: string;
  socialMedia: string[]; projectStatus: string;
  // 2
  productTypes: string[]; brands: string;
  hasLimitedEdition: string; hasCustomOrders: string; productCount: string;
  photosReady: string; dataOrganized: string; hasAccessories: string;
  categories: string; exclusiveKuwait: string;
  // 3
  shippingCountries: string[]; localCourier: string; intlCourier: string;
  shippingFee: string; physicalStore: string; cod: string;
  paymentMethods: string[]; currency: string; installments: string;
  returnPolicy: string; specialPackaging: string;
  // 4
  referenceSites: string; bilingual: string; advancedFilter: string;
  encyclopedia: string; wishlist: string; reviews: string;
  loyaltySystem: string; preorder: string; countdown: string; blog: string;
  socialIntegration: string; newsletter: string; coupons: string;
  adminPanel: string; salesReports: string; productComparison: string; newArrivals: string;
  // 5
  appFeatures: string; pushNotifications: string; arPreview: string;
  barcodeScanner: string; orderTracking: string; socialLogin: string;
  offlineMode: string; publishStores: string; techPreference: string;
  // 6
  supportFAQ: string; inventoryIntegration: string; escalation: string;
  supportLanguage: string; shippingAutoResponse: string;
  budgetRecommendations: string; salesComparison: string; upsell: string;
  cartIntegration: string; giftHelper: string; whatsappNumber: string;
  catalogOnWA: string; orderOnWA: string; broadcast: string;
  existingWACustomers: string; orderNotifications: string; marketingCampaigns: string;
  // 7
  logoReady: string; brandGuide: string; preferredColors: string;
  visualStyle: string; designReferences: string; darkMode: string; animations: string;
  // 8
  accountingSystem: string; erpIntegration: string; analytics: string;
  adsIntegration: string; crm: string; shippingAPI: string;
  domainRegistered: string; hosting: string;
  // 9
  launchTime: string; seasonalTarget: string; budget: string;
  paymentStructure: string; monthlyMaintenance: string; techTeam: string; contentManager: string;
  // 10
  localCompetitors: string; intlCompetitors: string; competitiveAdvantage: string;
  targetCustomers: string[]; ageRange: string; promotions: string;
}

const empty: F = {
  storeName: '', trademarkRegistered: '', ownerName: '', phone: '', email: '',
  existingWebsite: '', socialMedia: [], projectStatus: '',
  productTypes: [], brands: '', hasLimitedEdition: '', hasCustomOrders: '',
  productCount: '', photosReady: '', dataOrganized: '', hasAccessories: '',
  categories: '', exclusiveKuwait: '',
  shippingCountries: [], localCourier: '', intlCourier: '', shippingFee: '',
  physicalStore: '', cod: '', paymentMethods: [], currency: '', installments: '',
  returnPolicy: '', specialPackaging: '',
  referenceSites: '', bilingual: '', advancedFilter: '', encyclopedia: '', wishlist: '',
  reviews: '', loyaltySystem: '', preorder: '', countdown: '', blog: '',
  socialIntegration: '', newsletter: '', coupons: '', adminPanel: '',
  salesReports: '', productComparison: '', newArrivals: '',
  appFeatures: '', pushNotifications: '', arPreview: '', barcodeScanner: '',
  orderTracking: '', socialLogin: '', offlineMode: '', publishStores: '', techPreference: '',
  supportFAQ: '', inventoryIntegration: '', escalation: '', supportLanguage: '',
  shippingAutoResponse: '', budgetRecommendations: '', salesComparison: '', upsell: '',
  cartIntegration: '', giftHelper: '', whatsappNumber: '', catalogOnWA: '', orderOnWA: '',
  broadcast: '', existingWACustomers: '', orderNotifications: '', marketingCampaigns: '',
  logoReady: '', brandGuide: '', preferredColors: '', visualStyle: '', designReferences: '',
  darkMode: '', animations: '',
  accountingSystem: '', erpIntegration: '', analytics: '', adsIntegration: '', crm: '',
  shippingAPI: '', domainRegistered: '', hosting: '',
  launchTime: '', seasonalTarget: '', budget: '', paymentStructure: '',
  monthlyMaintenance: '', techTeam: '', contentManager: '',
  localCompetitors: '', intlCompetitors: '', competitiveAdvantage: '',
  targetCustomers: [], ageRange: '', promotions: '',
};

const SECTION_TITLES = [
  'نظرة عامة على العمل',
  'المنتجات والمخزون',
  'المبيعات والشحن',
  'متطلبات الموقع الإلكتروني',
  'متطلبات التطبيق (iOS + Android)',
  'وكلاء الذكاء الاصطناعي',
  'التصميم والهوية البصرية',
  'التكاملات التقنية',
  'الجدول الزمني والميزانية',
  'المنافسون والسوق',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Q({ label, req }: { label: string; req?: boolean }) {
  return (
    <p className="text-ms-ink-900 font-medium text-sm mb-2 leading-relaxed">
      {label}{req && <span className="text-ms-gold-600 mr-1">*</span>}
    </p>
  );
}

function TextInput({ label, value, onChange, placeholder, req }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; req?: boolean;
}) {
  return (
    <div className="mb-5">
      <Q label={label} req={req} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-ms-ivory-200 rounded-lg px-4 py-2.5 text-sm bg-white text-ms-ink-900
          focus:outline-none focus:ring-2 focus:ring-ms-green-800 focus:border-transparent
          placeholder:text-ms-ink-400 transition"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="mb-5">
      <Q label={label} />
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full border border-ms-ivory-200 rounded-lg px-4 py-2.5 text-sm bg-white text-ms-ink-900
          focus:outline-none focus:ring-2 focus:ring-ms-green-800 focus:border-transparent
          placeholder:text-ms-ink-400 transition resize-none"
      />
    </div>
  );
}

function RadioGroup({ label, value, onChange, options, req }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { v: string; l: string }[]; req?: boolean;
}) {
  return (
    <div className="mb-5">
      <Q label={label} req={req} />
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition font-medium
              ${value === o.v
                ? 'bg-ms-green-800 border-ms-green-800 text-white'
                : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800 hover:text-ms-green-800'
              }`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function YesNo({ label, value, onChange, extra }: {
  label: string; value: string; onChange: (v: string) => void;
  extra?: { v: string; l: string }[];
}) {
  const opts = [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, ...(extra ?? [])];
  return <RadioGroup label={label} value={value} onChange={onChange} options={opts} />;
}

function CheckGroup({ label, values, onChange, options }: {
  label: string; values: string[]; onChange: (v: string[]) => void;
  options: { v: string; l: string }[];
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  return (
    <div className="mb-5">
      <Q label={label} />
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o.v}
            type="button"
            onClick={() => toggle(o.v)}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition font-medium
              ${values.includes(o.v)
                ? 'bg-ms-green-800 border-ms-green-800 text-white'
                : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800 hover:text-ms-green-800'
              }`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function S1({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <TextInput label="اسم المتجر / العلامة التجارية" value={f.storeName} onChange={v => s('storeName', v)} req />
      <RadioGroup label="هل العلامة التجارية مسجلة رسمياً؟" value={f.trademarkRegistered} onChange={v => s('trademarkRegistered', v)}
        options={[{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'pending', l: 'قيد التسجيل' }]} />
      <TextInput label="اسم صاحب المشروع / المسؤول التنفيذي" value={f.ownerName} onChange={v => s('ownerName', v)} req />
      <TextInput label="رقم التواصل الرئيسي" value={f.phone} onChange={v => s('phone', v)} placeholder="+965" req />
      <TextInput label="البريد الإلكتروني الرسمي" value={f.email} onChange={v => s('email', v)} placeholder="email@example.com" />
      <TextInput label="هل عندك موقع أو متجر حالي؟ (الرابط)" value={f.existingWebsite} onChange={v => s('existingWebsite', v)} placeholder="www.example.com" />
      <CheckGroup label="حسابات سوشيال ميديا الحالية" values={f.socialMedia} onChange={v => s('socialMedia', v)}
        options={[{ v: 'instagram', l: 'Instagram' }, { v: 'tiktok', l: 'TikTok' }, { v: 'x', l: 'X' }, { v: 'snapchat', l: 'Snapchat' }, { v: 'other', l: 'أخرى' }]} />
      <RadioGroup label="هل المشروع قائم الآن أم في مرحلة الإطلاق؟" value={f.projectStatus} onChange={v => s('projectStatus', v)}
        options={[{ v: 'active', l: 'قائم' }, { v: 'launch', l: 'مرحلة إطلاق' }, { v: 'expansion', l: 'مرحلة توسع' }]} />
    </>
  );
}

function S2({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <CheckGroup label="أنواع المنتجات / الخدمات الرئيسية" values={f.productTypes} onChange={v => s('productTypes', v)}
        options={[{ v: 'physical', l: 'منتجات فيزيائية' }, { v: 'food', l: 'مواد غذائية' }, { v: 'fashion', l: 'ملابس وأكسسوارات' }, { v: 'health', l: 'صحة وجمال' }, { v: 'electronics', l: 'إلكترونيات' }, { v: 'services', l: 'خدمات' }, { v: 'digital', l: 'منتجات رقمية' }, { v: 'other', l: 'أخرى' }]} />
      <TextInput label="العلامات التجارية أو الأصناف الرئيسية" value={f.brands} onChange={v => s('brands', v)} placeholder="مثال: Nike / Apple / منتجات محلية" />
      <YesNo label="هل تبيع منتجات Limited Edition أو Pre-order؟" value={f.hasLimitedEdition} onChange={v => s('hasLimitedEdition', v)} />
      <YesNo label="هل عندك منتجات Custom أو طلبات خاصة؟" value={f.hasCustomOrders} onChange={v => s('hasCustomOrders', v)}
        extra={[{ v: 'future', l: 'مستقبلاً' }]} />
      <RadioGroup label="كم عدد المنتجات الحالية أو المتوقعة؟" value={f.productCount} onChange={v => s('productCount', v)}
        options={[{ v: '200', l: 'حتى 200' }, { v: '500', l: 'حتى 500' }, { v: '1000plus', l: '+1000' }]} />
      <RadioGroup label="هل عندك صور جاهزة للمنتجات؟" value={f.photosReady} onChange={v => s('photosReady', v)}
        options={[{ v: 'ready', l: 'جاهزة' }, { v: 'needsShooting', l: 'تحتاج تصوير' }, { v: 'no', l: 'لا' }]} />
      <RadioGroup label="هل عندك بيانات المنتجات منظمة (Excel/CSV)؟" value={f.dataOrganized} onChange={v => s('dataOrganized', v)}
        options={[{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'needsHelp', l: 'تحتاج مساعدة' }]} />
      <YesNo label="هل تبيع منتجات إضافية / مكملة؟" value={f.hasAccessories} onChange={v => s('hasAccessories', v)} />
      <TextInput label="هل عندك تصنيفات؟" value={f.categories} onChange={v => s('categories', v)} placeholder="مثال: رجالي / نسائي / أطفال / مميز" />
      <YesNo label="هل تبيع منتجات حصرية أو بكميات محدودة للكويت؟" value={f.exclusiveKuwait} onChange={v => s('exclusiveKuwait', v)} />
    </>
  );
}

function S3({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <CheckGroup label="الدول المستهدفة للشحن الدولي" values={f.shippingCountries} onChange={v => s('shippingCountries', v)}
        options={[{ v: 'saudi', l: 'السعودية' }, { v: 'uae', l: 'الإمارات' }, { v: 'bahrain', l: 'البحرين' }, { v: 'qatar', l: 'قطر' }, { v: 'usa', l: 'أمريكا' }, { v: 'europe', l: 'أوروبا' }, { v: 'other', l: 'أخرى' }]} />
      <TextInput label="شركات الشحن المفضلة — محلي (مثال: Aramex، Fetchr)" value={f.localCourier} onChange={v => s('localCourier', v)} />
      <TextInput label="شركات الشحن الدولي المفضلة (مثال: DHL، FedEx)" value={f.intlCourier} onChange={v => s('intlCourier', v)} />
      <RadioGroup label="سياسة الشحن" value={f.shippingFee} onChange={v => s('shippingFee', v)}
        options={[{ v: 'yes-threshold', l: 'مجاني فوق مبلغ معين' }, { v: 'always-paid', l: 'مدفوع دائماً' }]} />
      <YesNo label="هل عندك منافذ بيع فيزيائية؟" value={f.physicalStore} onChange={v => s('physicalStore', v)} />
      <RadioGroup label="هل تقبل الدفع عند الاستلام (COD)؟" value={f.cod} onChange={v => s('cod', v)}
        options={[{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'kuwait-only', l: 'الكويت فقط' }]} />
      <CheckGroup label="طرق الدفع المطلوبة" values={f.paymentMethods} onChange={v => s('paymentMethods', v)}
        options={[{ v: 'knet', l: 'KNET' }, { v: 'visa', l: 'Visa/Mastercard' }, { v: 'applepay', l: 'Apple Pay' }, { v: 'googlepay', l: 'Google Pay' }, { v: 'transfer', l: 'تحويل بنكي' }]} />
      <RadioGroup label="العملة الرئيسية للموقع" value={f.currency} onChange={v => s('currency', v)}
        options={[{ v: 'kwd', l: 'KWD' }, { v: 'usd', l: 'USD' }, { v: 'both', l: 'الاثنين' }]} />
      <YesNo label="هل تقدم أقساط؟ (تابي / تمارا)" value={f.installments} onChange={v => s('installments', v)}
        extra={[{ v: 'future', l: 'مستقبلاً' }]} />
      <TextInput label="سياسة الإرجاع والاستبدال" value={f.returnPolicy} onChange={v => s('returnPolicy', v)} placeholder="مثال: 7 أيام / لا إرجاع" />
      <YesNo label="هل المنتجات تحتاج تغليف خاص للشحن؟" value={f.specialPackaging} onChange={v => s('specialPackaging', v)} />
    </>
  );
}

function S4({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <TextInput label="مواقع مرجعية تعجبك (مشابهة لما تريد)" value={f.referenceSites} onChange={v => s('referenceSites', v)} placeholder="مثال: noon.com + موقع آخر" />
      <RadioGroup label="هل تريد موقع ثنائي اللغة؟" value={f.bilingual} onChange={v => s('bilingual', v)}
        options={[{ v: 'ar+en', l: 'عربي + إنجليزي' }, { v: 'en-only', l: 'إنجليزي فقط' }]} />
      <YesNo label="هل تريد فلترة متقدمة؟ (بالفئة / السعر / العلامة)" value={f.advancedFilter} onChange={v => s('advancedFilter', v)} />
      <YesNo label="هل تريد صفحة قاعدة معرفة / Encyclopedia للمنتجات؟" value={f.encyclopedia} onChange={v => s('encyclopedia', v)} />
      <YesNo label="هل تريد ميزة Wishlist / المفضلة؟" value={f.wishlist} onChange={v => s('wishlist', v)} />
      <YesNo label="هل تريد تقييمات ومراجعات المنتجات؟" value={f.reviews} onChange={v => s('reviews', v)} />
      <YesNo label="هل تريد نظام نقاط ولاء؟" value={f.loyaltySystem} onChange={v => s('loyaltySystem', v)} extra={[{ v: 'future', l: 'مستقبلاً' }]} />
      <YesNo label="هل تريد ميزة Pre-order؟" value={f.preorder} onChange={v => s('preorder', v)} />
      <YesNo label="هل تريد Countdown لمنتجات Limited Edition؟" value={f.countdown} onChange={v => s('countdown', v)} />
      <YesNo label="هل تريد مدونة / محتوى تعليمي؟" value={f.blog} onChange={v => s('blog', v)} />
      <YesNo label="هل تريد تكامل مع سوشيال ميديا؟ (Instagram, TikTok)" value={f.socialIntegration} onChange={v => s('socialIntegration', v)} />
      <YesNo label="هل تريد نشرة بريدية (Email Newsletter)؟" value={f.newsletter} onChange={v => s('newsletter', v)} />
      <YesNo label="هل تريد نظام كوبونات وخصومات؟" value={f.coupons} onChange={v => s('coupons', v)} />
      <YesNo label="هل تريد لوحة تحكم أدمن متقدمة؟" value={f.adminPanel} onChange={v => s('adminPanel', v)} />
      <YesNo label="هل تريد تقارير مبيعات وإحصائيات؟" value={f.salesReports} onChange={v => s('salesReports', v)} extra={[{ v: 'ga-enough', l: 'Google Analytics تكفي' }]} />
      <YesNo label="هل تريد ميزة مقارنة بين منتجين؟" value={f.productComparison} onChange={v => s('productComparison', v)} />
      <YesNo label='هل تريد قسم "وصل حديثاً" و"الأكثر مبيعاً"؟' value={f.newArrivals} onChange={v => s('newArrivals', v)} />
    </>
  );
}

function S5({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <RadioGroup label="هل التطبيق نسخة من الموقع أم له ميزات إضافية؟" value={f.appFeatures} onChange={v => s('appFeatures', v)}
        options={[{ v: 'mirror', l: 'نسخة من الموقع' }, { v: 'extra', l: 'ميزات إضافية' }]} />
      <YesNo label="هل تريد Push Notifications؟" value={f.pushNotifications} onChange={v => s('pushNotifications', v)} />
      <YesNo label="هل تريد AR Preview (واقع معزز للمنتجات)؟" value={f.arPreview} onChange={v => s('arPreview', v)} extra={[{ v: 'future', l: 'مستقبلاً' }]} />
      <YesNo label="هل تريد Barcode Scanner للبحث عن المنتج؟" value={f.barcodeScanner} onChange={v => s('barcodeScanner', v)} />
      <YesNo label="هل تريد ميزة تتبع الطلبات Live؟" value={f.orderTracking} onChange={v => s('orderTracking', v)} />
      <YesNo label="هل تريد تسجيل دخول بـ Apple/Google؟" value={f.socialLogin} onChange={v => s('socialLogin', v)} />
      <YesNo label="هل تريد Offline Mode (تصفح بدون إنترنت)؟" value={f.offlineMode} onChange={v => s('offlineMode', v)} />
      <YesNo label="هل تريد نشر التطبيق على App Store و Google Play؟" value={f.publishStores} onChange={v => s('publishStores', v)} />
      <RadioGroup label="هل عندك تفضيل لتقنية معينة؟" value={f.techPreference} onChange={v => s('techPreference', v)}
        options={[{ v: 'reactNative', l: 'React Native' }, { v: 'flutter', l: 'Flutter' }, { v: 'no-pref', l: 'لا تفضيل' }]} />
    </>
  );
}

function S6({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <p className="text-xs font-mono text-ms-gold-600 tracking-widest uppercase mb-3">وكيل الدعم</p>
      <TextArea label="ما الأسئلة الأكثر تكراراً من العملاء؟" value={f.supportFAQ} onChange={v => s('supportFAQ', v)} placeholder="مثال: الأسعار / التوفر / أوقات العمل / الشحن" />
      <YesNo label="هل تريد ربطه بمخزون المنتجات Real-Time؟" value={f.inventoryIntegration} onChange={v => s('inventoryIntegration', v)} />
      <YesNo label="هل تريد Escalation لموظف بشري؟" value={f.escalation} onChange={v => s('escalation', v)} extra={[{ v: 'whatsapp', l: 'رقم واتساب بديل' }]} />
      <RadioGroup label="لغة التواصل مع العملاء" value={f.supportLanguage} onChange={v => s('supportLanguage', v)}
        options={[{ v: 'ar', l: 'عربي فقط' }, { v: 'en', l: 'إنجليزي فقط' }, { v: 'both', l: 'الاثنين' }]} />
      <YesNo label="هل تريد ردود تلقائية على أسئلة الشحن والتتبع؟" value={f.shippingAutoResponse} onChange={v => s('shippingAutoResponse', v)} />

      <div className="h-px bg-ms-ivory-200 my-5" />
      <p className="text-xs font-mono text-ms-gold-600 tracking-widest uppercase mb-3">وكيل المبيعات</p>
      <YesNo label="هل تريد توصيات منتجات بناءً على ميزانية العميل؟" value={f.budgetRecommendations} onChange={v => s('budgetRecommendations', v)} />
      <YesNo label="هل تريد مقارنة بين منتجين مباشرة؟" value={f.salesComparison} onChange={v => s('salesComparison', v)} />
      <YesNo label="هل تريد Upsell تلقائي؟ (منتجات مكملة / إضافات)" value={f.upsell} onChange={v => s('upsell', v)} />
      <YesNo label="هل تريد ربطه بعربة التسوق مباشرة؟" value={f.cartIntegration} onChange={v => s('cartIntegration', v)} />
      <YesNo label="هل تريد يساعد العميل في اختيار Gift؟" value={f.giftHelper} onChange={v => s('giftHelper', v)} />

      <div className="h-px bg-ms-ivory-200 my-5" />
      <p className="text-xs font-mono text-ms-gold-600 tracking-widest uppercase mb-3">بوت واتساب</p>
      <TextInput label="رقم واتساب بيزنس المخصص للبوت" value={f.whatsappNumber} onChange={v => s('whatsappNumber', v)} placeholder="+965..." />
      <YesNo label="هل تريد عرض الكتالوج عبر واتساب؟" value={f.catalogOnWA} onChange={v => s('catalogOnWA', v)} />
      <YesNo label="هل تريد إمكانية الطلب مباشرة من واتساب؟" value={f.orderOnWA} onChange={v => s('orderOnWA', v)} />
      <YesNo label="هل تريد إرسال Broadcast لقوائم العملاء؟" value={f.broadcast} onChange={v => s('broadcast', v)} />
      <YesNo label="هل عندك قاعدة عملاء حالية على واتساب؟" value={f.existingWACustomers} onChange={v => s('existingWACustomers', v)} />
      <YesNo label="هل تريد إشعارات حالة الطلب تلقائية عبر واتساب؟" value={f.orderNotifications} onChange={v => s('orderNotifications', v)} />
      <YesNo label="هل تريد حملات تسويقية منتظمة عبر واتساب؟" value={f.marketingCampaigns} onChange={v => s('marketingCampaigns', v)} />
    </>
  );
}

function S7({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <YesNo label="هل عندك شعار (Logo) جاهز؟" value={f.logoReady} onChange={v => s('logoReady', v)} />
      <YesNo label="هل عندك Brand Guide (ألوان / خطوط)؟" value={f.brandGuide} onChange={v => s('brandGuide', v)} />
      <TextInput label="الألوان المفضلة للموقع والتطبيق" value={f.preferredColors} onChange={v => s('preferredColors', v)} placeholder="مثال: أسود / ذهبي / أبيض" />
      <RadioGroup label="الطابع البصري المطلوب" value={f.visualStyle} onChange={v => s('visualStyle', v)}
        options={[{ v: 'luxury', l: 'فاخر' }, { v: 'sporty', l: 'رياضي' }, { v: 'clean', l: 'نظيف' }, { v: 'dark', l: 'دارك موود' }]} />
      <TextInput label="مواقع أو تطبيقات تعجبك تصميمياً (2-3 روابط)" value={f.designReferences} onChange={v => s('designReferences', v)} />
      <RadioGroup label="هل تريد Dark Mode؟" value={f.darkMode} onChange={v => s('darkMode', v)}
        options={[{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'optional', l: 'اختياري للمستخدم' }]} />
      <RadioGroup label="هل تريد Animations وتأثيرات بصرية؟" value={f.animations} onChange={v => s('animations', v)}
        options={[{ v: 'light', l: 'خفيفة' }, { v: 'advanced', l: 'متقدمة' }, { v: 'no', l: 'لا' }]} />
    </>
  );
}

function S8({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <YesNo label="هل عندك نظام محاسبة حالي؟ (مثال: زيدي، QuickBooks)" value={f.accountingSystem} onChange={v => s('accountingSystem', v)} />
      <YesNo label="هل تريد ربط ERP أو نظام مخزون حالي؟" value={f.erpIntegration} onChange={v => s('erpIntegration', v)} />
      <YesNo label="هل تريد Google Analytics / Meta Pixel؟" value={f.analytics} onChange={v => s('analytics', v)} />
      <YesNo label="هل تريد ربط مع منصات إعلانات؟ (Google/Meta Ads)" value={f.adsIntegration} onChange={v => s('adsIntegration', v)} />
      <RadioGroup label="هل تريد نظام CRM لإدارة العملاء؟" value={f.crm} onChange={v => s('crm', v)}
        options={[{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'built-in', l: 'مدمج في لوحة التحكم' }]} />
      <YesNo label="هل تريد ربط شحن API تلقائياً؟" value={f.shippingAPI} onChange={v => s('shippingAPI', v)} />
      <YesNo label="هل عندك Domain (اسم نطاق) محجوز؟" value={f.domainRegistered} onChange={v => s('domainRegistered', v)} />
      <RadioGroup label="Hosting — من يتولاه؟" value={f.hosting} onChange={v => s('hosting', v)}
        options={[{ v: 'mindsync', l: 'MindSync تتولى' }, { v: 'client', l: 'عندي Hosting' }]} />
    </>
  );
}

function S9({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <RadioGroup label="متى تريد الإطلاق؟" value={f.launchTime} onChange={v => s('launchTime', v)}
        options={[{ v: 'asap', l: 'في أقرب وقت' }, { v: '3months', l: '3 أشهر' }, { v: '6months', l: '6 أشهر' }]} />
      <TextInput label="هل عندك مناسبات أو مواسم مستهدفة للإطلاق؟" value={f.seasonalTarget} onChange={v => s('seasonalTarget', v)} placeholder="مثال: رمضان / موسم الصيف / معرض" />
      <TextInput label="ما الميزانية الإجمالية المخصصة للمشروع؟" value={f.budget} onChange={v => s('budget', v)} placeholder="نطاق تقريبي (KWD)" />
      <RadioGroup label="هل تريد دفع كامل أم على مراحل؟" value={f.paymentStructure} onChange={v => s('paymentStructure', v)}
        options={[{ v: 'single', l: 'دفعة واحدة' }, { v: '3phases', l: '3 مراحل' }, { v: 'on-delivery', l: 'عند التسليم' }]} />
      <YesNo label="هل تريد صيانة شهرية بعد الإطلاق؟" value={f.monthlyMaintenance} onChange={v => s('monthlyMaintenance', v)} />
      <YesNo label="هل عندك فريق تقني داخلي؟" value={f.techTeam} onChange={v => s('techTeam', v)} />
      <RadioGroup label="من يدير المحتوى والمنتجات بعد التسليم؟" value={f.contentManager} onChange={v => s('contentManager', v)}
        options={[{ v: 'owner', l: 'صاحب المشروع' }, { v: 'employee', l: 'موظف' }, { v: 'mindsync', l: 'MindSync' }]} />
    </>
  );
}

function S10({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  return (
    <>
      <TextArea label="من هم منافسوك الرئيسيون في الكويت؟" value={f.localCompetitors} onChange={v => s('localCompetitors', v)} placeholder="أسماء المتاجر أو الحسابات أو المواقع" />
      <TextArea label="من هم منافسوك الدوليون؟" value={f.intlCompetitors} onChange={v => s('intlCompetitors', v)} placeholder="مواقع أو علامات تجارية دولية" />
      <TextArea label="ما الميزة التنافسية الأساسية لمشروعك؟" value={f.competitiveAdvantage} onChange={v => s('competitiveAdvantage', v)} placeholder="مثال: سعر / جودة / سرعة توصيل / حصرية / خدمة" />
      <CheckGroup label="من هو العميل المستهدف؟" values={f.targetCustomers} onChange={v => s('targetCustomers', v)}
        options={[{ v: 'individuals', l: 'أفراد' }, { v: 'gifters', l: 'مهدين / هدايا' }, { v: 'companies', l: 'شركات' }, { v: 'kids', l: 'أطفال' }, { v: 'other', l: 'أخرى' }]} />
      <TextInput label="ما الفئة العمرية الرئيسية؟" value={f.ageRange} onChange={v => s('ageRange', v)} placeholder="مثال: 25-45" />
      <RadioGroup label="هل عندك عروض أو خصومات منتظمة؟" value={f.promotions} onChange={v => s('promotions', v)}
        options={[{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'seasonal', l: 'موسمية' }]} />
    </>
  );
}

const STEPS = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DiscoveryPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<F>(empty);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (k: keyof F, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const pct = Math.round(((step + 1) / 10) * 100);
  const StepComp = STEPS[step];

  const submit = async () => {
    setStatus('loading');
    try {
      await fetch('https://ifaras911.app.n8n.cloud/webhook/client-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-ms-ivory-0 font-arabic flex items-center justify-center px-4" dir="rtl">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-ms-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-ms-ink-900 mb-3">شكراً جزيلاً!</h1>
          <p className="text-ms-ink-600 leading-relaxed mb-2">
            وصلنا استبيانك وسيراجعه فريق MindSync في <strong className="text-ms-green-800">قرب وقت</strong>.
          </p>
          <p className="text-ms-ink-600 leading-relaxed mb-8">
            سنتواصل معك لترتيب اجتماع مراجعة العرض.
          </p>
          <a
            href="https://www.mindsynckw.com"
            className="inline-block bg-ms-green-800 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-ms-green-700 transition"
          >
            العودة للموقع
          </a>
          <p className="mt-6 text-xs text-ms-ink-400 font-mono">
            +965 9953 9006 · @mindsynckw
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ms-ivory-0 font-arabic" dir="rtl">

      {/* Header */}
      <header className="bg-ms-green-800 px-6 py-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-transparent.png" alt="MindSync" width={32} height={32} className="opacity-90" />
            <div>
              <p className="text-white font-bold text-sm leading-tight">MindSync</p>
              <p className="text-ms-gold-600 text-xs font-mono tracking-wider">استبيان اكتشاف العميل</p>
            </div>
          </div>
          <span className="text-ms-ivory-200 text-xs font-mono">{step + 1} / 10</span>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-ms-green-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-ms-gold-600 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </header>

      {/* Section title */}
      <div className="bg-ms-green-900 px-6 py-5">
        <div className="max-w-2xl mx-auto">
          <p className="text-ms-gold-600 text-xs font-mono tracking-widest uppercase mb-1">
            القسم {['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'][step]}
          </p>
          <h1 className="text-white text-xl font-bold">{SECTION_TITLES[step]}</h1>
        </div>
      </div>

      {/* Form content */}
      <main className="max-w-2xl mx-auto px-5 py-8">
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-700">
            حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.
          </div>
        )}
        <StepComp f={form} s={set} />
      </main>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-ms-ivory-200 px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="px-6 py-2.5 rounded-full border border-ms-ivory-200 text-ms-ink-600 text-sm font-medium
              disabled:opacity-30 hover:border-ms-green-800 hover:text-ms-green-800 transition"
          >
            السابق
          </button>

          {/* Step dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${i === step ? 'w-4 h-2 bg-ms-gold-600' :
                    i < step ? 'w-2 h-2 bg-ms-green-800' : 'w-2 h-2 bg-ms-ivory-200'
                  }`}
              />
            ))}
          </div>

          {step < 9 ? (
            <button
              type="button"
              onClick={() => { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-2.5 rounded-full bg-ms-green-800 text-white text-sm font-semibold
                hover:bg-ms-green-700 transition shadow-sm"
            >
              التالي
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void submit()}
              disabled={status === 'loading'}
              className="px-8 py-2.5 rounded-full bg-ms-gold-600 text-white text-sm font-bold
                hover:bg-ms-gold-500 transition shadow-sm disabled:opacity-60"
            >
              {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الاستبيان'}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
