'use client';

import { createContext, useContext, useState } from 'react';
import Image from 'next/image';

// ─── Lang context (local to this page) ───────────────────────────────────────

type Lang = 'ar' | 'en';
const LangCtx = createContext<Lang>('ar');
const useLang = () => useContext(LangCtx);

// ─── Translations ─────────────────────────────────────────────────────────────

const S = {
  ar: {
    subtitle: 'استبيان اكتشاف العميل',
    stepOf: (n: number) => `${n} / ١٠`,
    section: 'القسم',
    sectionNums: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'],
    prev: 'السابق',
    next: 'التالي',
    submit: 'إرسال الاستبيان',
    submitting: 'جاري الإرسال...',
    error: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
    yes: 'نعم', no: 'لا', future: 'مستقبلاً',
    successTitle: 'شكراً جزيلاً!',
    successBody1: 'وصلنا استبيانك وسيراجعه فريق MindSync في أقرب وقت.',
    successBody2: 'سنتواصل معك لترتيب اجتماع مراجعة العرض.',
    backToSite: 'العودة للموقع',
    sectionTitles: [
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
    ],
    s1: {
      storeName: 'اسم المتجر / العلامة التجارية',
      trademark: 'هل العلامة التجارية مسجلة رسمياً؟',
      trademarkOpts: [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'pending', l: 'قيد التسجيل' }],
      ownerName: 'اسم صاحب المشروع / المسؤول التنفيذي',
      phone: 'رقم التواصل الرئيسي',
      email: 'البريد الإلكتروني الرسمي',
      website: 'هل عندك موقع أو متجر حالي؟ (الرابط)',
      social: 'حسابات سوشيال ميديا الحالية',
      socialOpts: [{ v: 'instagram', l: 'Instagram' }, { v: 'tiktok', l: 'TikTok' }, { v: 'x', l: 'X' }, { v: 'snapchat', l: 'Snapchat' }, { v: 'other', l: 'أخرى' }],
      status: 'هل المشروع قائم الآن أم في مرحلة الإطلاق؟',
      statusOpts: [{ v: 'active', l: 'قائم' }, { v: 'launch', l: 'مرحلة إطلاق' }, { v: 'expansion', l: 'مرحلة توسع' }],
    },
    s2: {
      productTypes: 'أنواع المنتجات / الخدمات الرئيسية',
      productTypeOpts: [{ v: 'physical', l: 'منتجات فيزيائية' }, { v: 'food', l: 'مواد غذائية' }, { v: 'fashion', l: 'ملابس وأكسسوارات' }, { v: 'health', l: 'صحة وجمال' }, { v: 'electronics', l: 'إلكترونيات' }, { v: 'services', l: 'خدمات' }, { v: 'digital', l: 'منتجات رقمية' }, { v: 'other', l: 'أخرى' }],
      brands: 'العلامات التجارية أو الأصناف الرئيسية',
      brandsPlaceholder: 'مثال: Nike / Apple / منتجات محلية',
      limitedEdition: 'هل تبيع منتجات Limited Edition أو Pre-order؟',
      customOrders: 'هل عندك منتجات Custom أو طلبات خاصة؟',
      productCount: 'كم عدد المنتجات الحالية أو المتوقعة؟',
      productCountOpts: [{ v: '200', l: 'حتى 200' }, { v: '500', l: 'حتى 500' }, { v: '1000plus', l: '+1000' }],
      photosReady: 'هل عندك صور جاهزة للمنتجات؟',
      photosOpts: [{ v: 'ready', l: 'جاهزة' }, { v: 'needsShooting', l: 'تحتاج تصوير' }, { v: 'no', l: 'لا' }],
      dataOrganized: 'هل عندك بيانات المنتجات منظمة (Excel/CSV)؟',
      dataOpts: [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'needsHelp', l: 'تحتاج مساعدة' }],
      accessories: 'هل تبيع منتجات إضافية / مكملة؟',
      categories: 'هل عندك تصنيفات؟',
      categoriesPlaceholder: 'مثال: رجالي / نسائي / أطفال / مميز',
      exclusive: 'هل تبيع منتجات حصرية أو بكميات محدودة للكويت؟',
    },
    s3: {
      shippingCountries: 'الدول المستهدفة للشحن الدولي',
      countryOpts: [{ v: 'saudi', l: 'السعودية' }, { v: 'uae', l: 'الإمارات' }, { v: 'bahrain', l: 'البحرين' }, { v: 'qatar', l: 'قطر' }, { v: 'usa', l: 'أمريكا' }, { v: 'europe', l: 'أوروبا' }, { v: 'other', l: 'أخرى' }],
      localCourier: 'شركات الشحن المفضلة — محلي (مثال: Aramex، Fetchr)',
      intlCourier: 'شركات الشحن الدولي المفضلة (مثال: DHL، FedEx)',
      shippingFee: 'سياسة الشحن',
      shippingFeeOpts: [{ v: 'yes-threshold', l: 'مجاني فوق مبلغ معين' }, { v: 'always-paid', l: 'مدفوع دائماً' }],
      physicalStore: 'هل عندك منافذ بيع فيزيائية؟',
      cod: 'هل تقبل الدفع عند الاستلام (COD)؟',
      codOpts: [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'kuwait-only', l: 'الكويت فقط' }],
      paymentMethods: 'طرق الدفع المطلوبة',
      paymentOpts: [{ v: 'knet', l: 'KNET' }, { v: 'visa', l: 'Visa/Mastercard' }, { v: 'applepay', l: 'Apple Pay' }, { v: 'googlepay', l: 'Google Pay' }, { v: 'transfer', l: 'تحويل بنكي' }],
      currency: 'العملة الرئيسية للموقع',
      currencyOpts: [{ v: 'kwd', l: 'KWD' }, { v: 'usd', l: 'USD' }, { v: 'both', l: 'الاثنين' }],
      installments: 'هل تقدم أقساط؟ (تابي / تمارا)',
      returnPolicy: 'سياسة الإرجاع والاستبدال',
      returnPlaceholder: 'مثال: 7 أيام / لا إرجاع',
      specialPackaging: 'هل المنتجات تحتاج تغليف خاص للشحن؟',
    },
    s4: {
      referenceSites: 'مواقع مرجعية تعجبك (مشابهة لما تريد)',
      referencePlaceholder: 'مثال: noon.com + موقع آخر',
      bilingual: 'هل تريد موقع ثنائي اللغة؟',
      bilingualOpts: [{ v: 'ar+en', l: 'عربي + إنجليزي' }, { v: 'en-only', l: 'إنجليزي فقط' }],
      advancedFilter: 'هل تريد فلترة متقدمة؟ (بالفئة / السعر / العلامة)',
      encyclopedia: 'هل تريد صفحة قاعدة معرفة / Encyclopedia للمنتجات؟',
      wishlist: 'هل تريد ميزة Wishlist / المفضلة؟',
      reviews: 'هل تريد تقييمات ومراجعات المنتجات؟',
      loyaltySystem: 'هل تريد نظام نقاط ولاء؟',
      preorder: 'هل تريد ميزة Pre-order؟',
      countdown: 'هل تريد Countdown لمنتجات Limited Edition؟',
      blog: 'هل تريد مدونة / محتوى تعليمي؟',
      socialIntegration: 'هل تريد تكامل مع سوشيال ميديا؟ (Instagram, TikTok)',
      newsletter: 'هل تريد نشرة بريدية (Email Newsletter)؟',
      coupons: 'هل تريد نظام كوبونات وخصومات؟',
      adminPanel: 'هل تريد لوحة تحكم أدمن متقدمة؟',
      salesReports: 'هل تريد تقارير مبيعات وإحصائيات؟',
      salesReportsOpts: [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'ga-enough', l: 'Google Analytics تكفي' }],
      productComparison: 'هل تريد ميزة مقارنة بين منتجين؟',
      newArrivals: 'هل تريد قسم "وصل حديثاً" و"الأكثر مبيعاً"؟',
    },
    s5: {
      appFeatures: 'هل التطبيق نسخة من الموقع أم له ميزات إضافية؟',
      appFeaturesOpts: [{ v: 'mirror', l: 'نسخة من الموقع' }, { v: 'extra', l: 'ميزات إضافية' }],
      pushNotifications: 'هل تريد Push Notifications؟',
      arPreview: 'هل تريد AR Preview (واقع معزز للمنتجات)؟',
      barcodeScanner: 'هل تريد Barcode Scanner للبحث عن المنتج؟',
      orderTracking: 'هل تريد ميزة تتبع الطلبات Live؟',
      socialLogin: 'هل تريد تسجيل دخول بـ Apple/Google؟',
      offlineMode: 'هل تريد Offline Mode (تصفح بدون إنترنت)؟',
      publishStores: 'هل تريد نشر التطبيق على App Store و Google Play؟',
      techPreference: 'هل عندك تفضيل لتقنية معينة؟',
      techOpts: [{ v: 'reactNative', l: 'React Native' }, { v: 'flutter', l: 'Flutter' }, { v: 'no-pref', l: 'لا تفضيل' }],
    },
    s6: {
      supportLabel: 'وكيل الدعم',
      supportFAQ: 'ما الأسئلة الأكثر تكراراً من العملاء؟',
      supportFAQPlaceholder: 'مثال: الأسعار / التوفر / أوقات العمل / الشحن',
      inventoryIntegration: 'هل تريد ربطه بمخزون المنتجات Real-Time؟',
      escalation: 'هل تريد Escalation لموظف بشري؟',
      escalationExtra: [{ v: 'whatsapp', l: 'رقم واتساب بديل' }],
      supportLanguage: 'لغة التواصل مع العملاء',
      supportLangOpts: [{ v: 'ar', l: 'عربي فقط' }, { v: 'en', l: 'إنجليزي فقط' }, { v: 'both', l: 'الاثنين' }],
      shippingAutoResponse: 'هل تريد ردود تلقائية على أسئلة الشحن والتتبع؟',
      salesLabel: 'وكيل المبيعات',
      budgetRecommendations: 'هل تريد توصيات منتجات بناءً على ميزانية العميل؟',
      salesComparison: 'هل تريد مقارنة بين منتجين مباشرة؟',
      upsell: 'هل تريد Upsell تلقائي؟ (منتجات مكملة / إضافات)',
      cartIntegration: 'هل تريد ربطه بعربة التسوق مباشرة؟',
      giftHelper: 'هل تريد يساعد العميل في اختيار Gift؟',
      waLabel: 'بوت واتساب',
      whatsappNumber: 'رقم واتساب بيزنس المخصص للبوت',
      catalogOnWA: 'هل تريد عرض الكتالوج عبر واتساب؟',
      orderOnWA: 'هل تريد إمكانية الطلب مباشرة من واتساب؟',
      broadcast: 'هل تريد إرسال Broadcast لقوائم العملاء؟',
      existingWACustomers: 'هل عندك قاعدة عملاء حالية على واتساب؟',
      orderNotifications: 'هل تريد إشعارات حالة الطلب تلقائية عبر واتساب؟',
      marketingCampaigns: 'هل تريد حملات تسويقية منتظمة عبر واتساب؟',
    },
    s7: {
      logoReady: 'هل عندك شعار (Logo) جاهز؟',
      brandGuide: 'هل عندك Brand Guide (ألوان / خطوط)؟',
      preferredColors: 'الألوان المفضلة للموقع والتطبيق',
      colorsPlaceholder: 'مثال: أسود / ذهبي / أبيض',
      visualStyle: 'الطابع البصري المطلوب',
      styleOpts: [{ v: 'luxury', l: 'فاخر' }, { v: 'sporty', l: 'رياضي' }, { v: 'clean', l: 'نظيف' }, { v: 'dark', l: 'دارك موود' }],
      designReferences: 'مواقع أو تطبيقات تعجبك تصميمياً (2-3 روابط)',
      darkMode: 'هل تريد Dark Mode؟',
      darkOpts: [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'optional', l: 'اختياري للمستخدم' }],
      animations: 'هل تريد Animations وتأثيرات بصرية؟',
      animOpts: [{ v: 'light', l: 'خفيفة' }, { v: 'advanced', l: 'متقدمة' }, { v: 'no', l: 'لا' }],
    },
    s8: {
      accountingSystem: 'هل عندك نظام محاسبة حالي؟ (مثال: زيدي، QuickBooks)',
      erpIntegration: 'هل تريد ربط ERP أو نظام مخزون حالي؟',
      analytics: 'هل تريد Google Analytics / Meta Pixel؟',
      adsIntegration: 'هل تريد ربط مع منصات إعلانات؟ (Google/Meta Ads)',
      crm: 'هل تريد نظام CRM لإدارة العملاء؟',
      crmOpts: [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'built-in', l: 'مدمج في لوحة التحكم' }],
      shippingAPI: 'هل تريد ربط شحن API تلقائياً؟',
      domainRegistered: 'هل عندك Domain (اسم نطاق) محجوز؟',
      hosting: 'Hosting — من يتولاه؟',
      hostingOpts: [{ v: 'mindsync', l: 'MindSync تتولى' }, { v: 'client', l: 'عندي Hosting' }],
    },
    s9: {
      launchTime: 'متى تريد الإطلاق؟',
      launchOpts: [{ v: 'asap', l: 'في أقرب وقت' }, { v: '3months', l: '3 أشهر' }, { v: '6months', l: '6 أشهر' }],
      seasonalTarget: 'هل عندك مناسبات أو مواسم مستهدفة للإطلاق؟',
      seasonalPlaceholder: 'مثال: رمضان / موسم الصيف / معرض',
      budget: 'ما الميزانية الإجمالية المخصصة للمشروع؟',
      budgetPlaceholder: 'نطاق تقريبي (KWD)',
      paymentStructure: 'هل تريد دفع كامل أم على مراحل؟',
      paymentOpts: [{ v: 'single', l: 'دفعة واحدة' }, { v: '3phases', l: '3 مراحل' }, { v: 'on-delivery', l: 'عند التسليم' }],
      monthlyMaintenance: 'هل تريد صيانة شهرية بعد الإطلاق؟',
      techTeam: 'هل عندك فريق تقني داخلي؟',
      contentManager: 'من يدير المحتوى والمنتجات بعد التسليم؟',
      contentOpts: [{ v: 'owner', l: 'صاحب المشروع' }, { v: 'employee', l: 'موظف' }, { v: 'mindsync', l: 'MindSync' }],
    },
    s10: {
      localCompetitors: 'من هم منافسوك الرئيسيون في الكويت؟',
      localPlaceholder: 'أسماء المتاجر أو الحسابات أو المواقع',
      intlCompetitors: 'من هم منافسوك الدوليون؟',
      intlPlaceholder: 'مواقع أو علامات تجارية دولية',
      competitiveAdvantage: 'ما الميزة التنافسية الأساسية لمشروعك؟',
      advantagePlaceholder: 'مثال: سعر / جودة / سرعة توصيل / حصرية / خدمة',
      targetCustomers: 'من هو العميل المستهدف؟',
      customerOpts: [{ v: 'individuals', l: 'أفراد' }, { v: 'gifters', l: 'مهدين / هدايا' }, { v: 'companies', l: 'شركات' }, { v: 'kids', l: 'أطفال' }, { v: 'other', l: 'أخرى' }],
      ageRange: 'ما الفئة العمرية الرئيسية؟',
      agePlaceholder: 'مثال: 25-45',
      promotions: 'هل عندك عروض أو خصومات منتظمة؟',
      promotionOpts: [{ v: 'yes', l: 'نعم' }, { v: 'no', l: 'لا' }, { v: 'seasonal', l: 'موسمية' }],
    },
  },
  en: {
    subtitle: 'Client Discovery Form',
    stepOf: (n: number) => `${n} / 10`,
    section: 'Section',
    sectionNums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    prev: 'Previous',
    next: 'Next',
    submit: 'Submit Form',
    submitting: 'Sending...',
    error: 'An error occurred while submitting. Please try again.',
    yes: 'Yes', no: 'No', future: 'In the Future',
    successTitle: 'Thank you!',
    successBody1: 'We received your form and the MindSync team will review it shortly.',
    successBody2: "We'll reach out to schedule a proposal review meeting.",
    backToSite: 'Back to Website',
    sectionTitles: [
      'Business Overview',
      'Products & Inventory',
      'Sales & Shipping',
      'Website Requirements',
      'App Requirements (iOS + Android)',
      'AI Agents',
      'Design & Visual Identity',
      'Technical Integrations',
      'Timeline & Budget',
      'Competitors & Market',
    ],
    s1: {
      storeName: 'Store / Brand Name',
      trademark: 'Is the brand officially registered?',
      trademarkOpts: [{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'pending', l: 'In Progress' }],
      ownerName: 'Owner / Executive Name',
      phone: 'Primary Contact Number',
      email: 'Official Email Address',
      website: 'Do you have an existing website or store? (Link)',
      social: 'Existing Social Media Accounts',
      socialOpts: [{ v: 'instagram', l: 'Instagram' }, { v: 'tiktok', l: 'TikTok' }, { v: 'x', l: 'X' }, { v: 'snapchat', l: 'Snapchat' }, { v: 'other', l: 'Other' }],
      status: 'Is the business live or in launch phase?',
      statusOpts: [{ v: 'active', l: 'Live' }, { v: 'launch', l: 'Launch Phase' }, { v: 'expansion', l: 'Expansion Phase' }],
    },
    s2: {
      productTypes: 'Main Product / Service Types',
      productTypeOpts: [{ v: 'physical', l: 'Physical Products' }, { v: 'food', l: 'Food & Beverages' }, { v: 'fashion', l: 'Fashion & Accessories' }, { v: 'health', l: 'Health & Beauty' }, { v: 'electronics', l: 'Electronics' }, { v: 'services', l: 'Services' }, { v: 'digital', l: 'Digital Products' }, { v: 'other', l: 'Other' }],
      brands: 'Main Brands or Product Lines',
      brandsPlaceholder: 'e.g. Nike / Apple / Local products',
      limitedEdition: 'Do you sell Limited Edition or Pre-order products?',
      customOrders: 'Do you offer Custom or Special Orders?',
      productCount: 'How many products do you have (current or expected)?',
      productCountOpts: [{ v: '200', l: 'Up to 200' }, { v: '500', l: 'Up to 500' }, { v: '1000plus', l: '1000+' }],
      photosReady: 'Do you have product photos ready?',
      photosOpts: [{ v: 'ready', l: 'Ready' }, { v: 'needsShooting', l: 'Needs Photography' }, { v: 'no', l: 'No' }],
      dataOrganized: 'Is your product data organized (Excel/CSV)?',
      dataOpts: [{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'needsHelp', l: 'Need Help' }],
      accessories: 'Do you sell complementary / add-on products?',
      categories: 'Do you have categories?',
      categoriesPlaceholder: 'e.g. Men / Women / Kids / Featured',
      exclusive: 'Do you sell exclusive or limited-quantity products for Kuwait?',
    },
    s3: {
      shippingCountries: 'Target Countries for International Shipping',
      countryOpts: [{ v: 'saudi', l: 'Saudi Arabia' }, { v: 'uae', l: 'UAE' }, { v: 'bahrain', l: 'Bahrain' }, { v: 'qatar', l: 'Qatar' }, { v: 'usa', l: 'USA' }, { v: 'europe', l: 'Europe' }, { v: 'other', l: 'Other' }],
      localCourier: 'Preferred Local Couriers (e.g. Aramex, Fetchr)',
      intlCourier: 'Preferred International Couriers (e.g. DHL, FedEx)',
      shippingFee: 'Shipping Policy',
      shippingFeeOpts: [{ v: 'yes-threshold', l: 'Free above a threshold' }, { v: 'always-paid', l: 'Always Paid' }],
      physicalStore: 'Do you have physical retail locations?',
      cod: 'Do you accept Cash on Delivery (COD)?',
      codOpts: [{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'kuwait-only', l: 'Kuwait Only' }],
      paymentMethods: 'Required Payment Methods',
      paymentOpts: [{ v: 'knet', l: 'KNET' }, { v: 'visa', l: 'Visa/Mastercard' }, { v: 'applepay', l: 'Apple Pay' }, { v: 'googlepay', l: 'Google Pay' }, { v: 'transfer', l: 'Bank Transfer' }],
      currency: 'Primary Website Currency',
      currencyOpts: [{ v: 'kwd', l: 'KWD' }, { v: 'usd', l: 'USD' }, { v: 'both', l: 'Both' }],
      installments: 'Do you offer installments? (Tabby / Tamara)',
      returnPolicy: 'Return & Exchange Policy',
      returnPlaceholder: 'e.g. 7 days / No returns',
      specialPackaging: 'Do products require special shipping packaging?',
    },
    s4: {
      referenceSites: 'Reference websites you like (similar to what you want)',
      referencePlaceholder: 'e.g. noon.com + another site',
      bilingual: 'Do you want a bilingual website?',
      bilingualOpts: [{ v: 'ar+en', l: 'Arabic + English' }, { v: 'en-only', l: 'English Only' }],
      advancedFilter: 'Do you want advanced filters? (by category / price / brand)',
      encyclopedia: 'Do you want a product knowledge base / Encyclopedia page?',
      wishlist: 'Do you want a Wishlist / Favorites feature?',
      reviews: 'Do you want product ratings and reviews?',
      loyaltySystem: 'Do you want a loyalty points system?',
      preorder: 'Do you want a Pre-order feature?',
      countdown: 'Do you want a Countdown for Limited Edition products?',
      blog: 'Do you want a Blog / educational content section?',
      socialIntegration: 'Do you want social media integration? (Instagram, TikTok)',
      newsletter: 'Do you want an Email Newsletter?',
      coupons: 'Do you want a coupons & discounts system?',
      adminPanel: 'Do you want an advanced admin panel?',
      salesReports: 'Do you want sales reports and analytics?',
      salesReportsOpts: [{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'ga-enough', l: 'Google Analytics is enough' }],
      productComparison: 'Do you want a product comparison feature?',
      newArrivals: 'Do you want "New Arrivals" and "Best Sellers" sections?',
    },
    s5: {
      appFeatures: 'Is the app a mirror of the website or does it have extra features?',
      appFeaturesOpts: [{ v: 'mirror', l: 'Mirror of Website' }, { v: 'extra', l: 'Extra Features' }],
      pushNotifications: 'Do you want Push Notifications?',
      arPreview: 'Do you want AR Preview (augmented reality for products)?',
      barcodeScanner: 'Do you want a Barcode Scanner for product search?',
      orderTracking: 'Do you want Live Order Tracking?',
      socialLogin: 'Do you want Apple/Google sign-in?',
      offlineMode: 'Do you want Offline Mode (browse without internet)?',
      publishStores: 'Do you want to publish on App Store & Google Play?',
      techPreference: 'Do you have a technology preference?',
      techOpts: [{ v: 'reactNative', l: 'React Native' }, { v: 'flutter', l: 'Flutter' }, { v: 'no-pref', l: 'No Preference' }],
    },
    s6: {
      supportLabel: 'Support Agent',
      supportFAQ: 'What are the most frequently asked questions from customers?',
      supportFAQPlaceholder: 'e.g. Prices / Availability / Working Hours / Shipping',
      inventoryIntegration: 'Do you want it connected to product inventory in Real-Time?',
      escalation: 'Do you want Escalation to a human agent?',
      escalationExtra: [{ v: 'whatsapp', l: 'Alternative WhatsApp Number' }],
      supportLanguage: 'Customer communication language',
      supportLangOpts: [{ v: 'ar', l: 'Arabic Only' }, { v: 'en', l: 'English Only' }, { v: 'both', l: 'Both' }],
      shippingAutoResponse: 'Do you want automated replies for shipping & tracking questions?',
      salesLabel: 'Sales Agent',
      budgetRecommendations: 'Do you want product recommendations based on customer budget?',
      salesComparison: 'Do you want direct product-to-product comparison?',
      upsell: 'Do you want automatic Upsell? (complementary products / add-ons)',
      cartIntegration: 'Do you want it connected directly to the shopping cart?',
      giftHelper: 'Do you want it to help customers pick Gifts?',
      waLabel: 'WhatsApp Bot',
      whatsappNumber: 'WhatsApp Business Number for the bot',
      catalogOnWA: 'Do you want to show the catalog via WhatsApp?',
      orderOnWA: 'Do you want the ability to order directly from WhatsApp?',
      broadcast: 'Do you want to send Broadcasts to customer lists?',
      existingWACustomers: 'Do you have an existing customer base on WhatsApp?',
      orderNotifications: 'Do you want automatic order status notifications via WhatsApp?',
      marketingCampaigns: 'Do you want regular marketing campaigns via WhatsApp?',
    },
    s7: {
      logoReady: 'Do you have a Logo ready?',
      brandGuide: 'Do you have a Brand Guide (colors / fonts)?',
      preferredColors: 'Preferred colors for the website and app',
      colorsPlaceholder: 'e.g. Black / Gold / White',
      visualStyle: 'Desired visual style',
      styleOpts: [{ v: 'luxury', l: 'Luxury' }, { v: 'sporty', l: 'Sporty' }, { v: 'clean', l: 'Clean' }, { v: 'dark', l: 'Dark Mode' }],
      designReferences: 'Websites or apps you like design-wise (2-3 links)',
      darkMode: 'Do you want Dark Mode?',
      darkOpts: [{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'optional', l: 'User-optional' }],
      animations: 'Do you want Animations and visual effects?',
      animOpts: [{ v: 'light', l: 'Light' }, { v: 'advanced', l: 'Advanced' }, { v: 'no', l: 'No' }],
    },
    s8: {
      accountingSystem: 'Do you have an existing accounting system? (e.g. Zoho, QuickBooks)',
      erpIntegration: 'Do you want to integrate an existing ERP or inventory system?',
      analytics: 'Do you want Google Analytics / Meta Pixel?',
      adsIntegration: 'Do you want integration with ad platforms? (Google/Meta Ads)',
      crm: 'Do you want a CRM for customer management?',
      crmOpts: [{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'built-in', l: 'Built into Admin Panel' }],
      shippingAPI: 'Do you want automatic shipping API integration?',
      domainRegistered: 'Do you have a registered Domain?',
      hosting: 'Hosting — who handles it?',
      hostingOpts: [{ v: 'mindsync', l: 'MindSync handles it' }, { v: 'client', l: 'I have Hosting' }],
    },
    s9: {
      launchTime: 'When do you want to launch?',
      launchOpts: [{ v: 'asap', l: 'As Soon as Possible' }, { v: '3months', l: '3 Months' }, { v: '6months', l: '6 Months' }],
      seasonalTarget: 'Do you have target seasons or events for the launch?',
      seasonalPlaceholder: 'e.g. Ramadan / Summer / Exhibition',
      budget: 'What is the total budget allocated for the project?',
      budgetPlaceholder: 'Approximate range (KWD)',
      paymentStructure: 'Do you want a single payment or phased payments?',
      paymentOpts: [{ v: 'single', l: 'Single Payment' }, { v: '3phases', l: '3 Phases' }, { v: 'on-delivery', l: 'On Delivery' }],
      monthlyMaintenance: 'Do you want monthly maintenance after launch?',
      techTeam: 'Do you have an in-house technical team?',
      contentManager: 'Who manages content and products after delivery?',
      contentOpts: [{ v: 'owner', l: 'Business Owner' }, { v: 'employee', l: 'Employee' }, { v: 'mindsync', l: 'MindSync' }],
    },
    s10: {
      localCompetitors: 'Who are your main competitors in Kuwait?',
      localPlaceholder: 'Store names, accounts, or websites',
      intlCompetitors: 'Who are your international competitors?',
      intlPlaceholder: 'International websites or brands',
      competitiveAdvantage: 'What is your core competitive advantage?',
      advantagePlaceholder: 'e.g. Price / Quality / Delivery Speed / Exclusivity / Service',
      targetCustomers: 'Who is your target customer?',
      customerOpts: [{ v: 'individuals', l: 'Individuals' }, { v: 'gifters', l: 'Gift Buyers' }, { v: 'companies', l: 'Companies' }, { v: 'kids', l: 'Kids' }, { v: 'other', l: 'Other' }],
      ageRange: 'What is the primary age range?',
      agePlaceholder: 'e.g. 25-45',
      promotions: 'Do you run regular promotions or discounts?',
      promotionOpts: [{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'seasonal', l: 'Seasonal' }],
    },
  },
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface F {
  storeName: string; trademarkRegistered: string; ownerName: string;
  phone: string; email: string; existingWebsite: string;
  socialMedia: string[]; projectStatus: string;
  productTypes: string[]; brands: string;
  hasLimitedEdition: string; hasCustomOrders: string; productCount: string;
  photosReady: string; dataOrganized: string; hasAccessories: string;
  categories: string; exclusiveKuwait: string;
  shippingCountries: string[]; localCourier: string; intlCourier: string;
  shippingFee: string; physicalStore: string; cod: string;
  paymentMethods: string[]; currency: string; installments: string;
  returnPolicy: string; specialPackaging: string;
  referenceSites: string; bilingual: string; advancedFilter: string;
  encyclopedia: string; wishlist: string; reviews: string;
  loyaltySystem: string; preorder: string; countdown: string; blog: string;
  socialIntegration: string; newsletter: string; coupons: string;
  adminPanel: string; salesReports: string; productComparison: string; newArrivals: string;
  appFeatures: string; pushNotifications: string; arPreview: string;
  barcodeScanner: string; orderTracking: string; socialLogin: string;
  offlineMode: string; publishStores: string; techPreference: string;
  supportFAQ: string; inventoryIntegration: string; escalation: string;
  supportLanguage: string; shippingAutoResponse: string;
  budgetRecommendations: string; salesComparison: string; upsell: string;
  cartIntegration: string; giftHelper: string; whatsappNumber: string;
  catalogOnWA: string; orderOnWA: string; broadcast: string;
  existingWACustomers: string; orderNotifications: string; marketingCampaigns: string;
  logoReady: string; brandGuide: string; preferredColors: string;
  visualStyle: string; designReferences: string; darkMode: string; animations: string;
  accountingSystem: string; erpIntegration: string; analytics: string;
  adsIntegration: string; crm: string; shippingAPI: string;
  domainRegistered: string; hosting: string;
  launchTime: string; seasonalTarget: string; budget: string;
  paymentStructure: string; monthlyMaintenance: string; techTeam: string; contentManager: string;
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Q({ label, req }: { label: string; req?: boolean }) {
  return (
    <p className="text-ms-ink-900 font-medium text-sm mb-2 leading-relaxed">
      {label}{req && <span className="text-ms-gold-600 mr-1 ml-1">*</span>}
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
  options: readonly { v: string; l: string }[]; req?: boolean;
}) {
  return (
    <div className="mb-5">
      <Q label={label} req={req} />
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.v} type="button" onClick={() => onChange(o.v)}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition font-medium
              ${value === o.v
                ? 'bg-ms-green-800 border-ms-green-800 text-white'
                : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800 hover:text-ms-green-800'
              }`}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function YesNo({ label, value, onChange, extra }: {
  label: string; value: string; onChange: (v: string) => void;
  extra?: readonly { v: string; l: string }[];
}) {
  const lang = useLang();
  const t = S[lang];
  const opts = [{ v: 'yes', l: t.yes }, { v: 'no', l: t.no }, ...(extra ?? [])];
  return <RadioGroup label={label} value={value} onChange={onChange} options={opts} />;
}

function CheckGroup({ label, values, onChange, options }: {
  label: string; values: string[]; onChange: (v: string[]) => void;
  options: readonly { v: string; l: string }[];
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  return (
    <div className="mb-5">
      <Q label={label} />
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.v} type="button" onClick={() => toggle(o.v)}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition font-medium
              ${values.includes(o.v)
                ? 'bg-ms-green-800 border-ms-green-800 text-white'
                : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800 hover:text-ms-green-800'
              }`}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function S1({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s1; const c = S[lang];
  return (
    <>
      <TextInput label={t.storeName} value={f.storeName} onChange={v => s('storeName', v)} req />
      <RadioGroup label={t.trademark} value={f.trademarkRegistered} onChange={v => s('trademarkRegistered', v)} options={t.trademarkOpts} />
      <TextInput label={t.ownerName} value={f.ownerName} onChange={v => s('ownerName', v)} req />
      <TextInput label={t.phone} value={f.phone} onChange={v => s('phone', v)} placeholder="+965" req />
      <TextInput label={t.email} value={f.email} onChange={v => s('email', v)} placeholder="email@example.com" />
      <TextInput label={t.website} value={f.existingWebsite} onChange={v => s('existingWebsite', v)} placeholder="www.example.com" />
      <CheckGroup label={t.social} values={f.socialMedia} onChange={v => s('socialMedia', v)} options={t.socialOpts} />
      <RadioGroup label={t.status} value={f.projectStatus} onChange={v => s('projectStatus', v)} options={t.statusOpts} />
    </>
  );
}

function S2({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s2; const c = S[lang];
  return (
    <>
      <CheckGroup label={t.productTypes} values={f.productTypes} onChange={v => s('productTypes', v)} options={t.productTypeOpts} />
      <TextInput label={t.brands} value={f.brands} onChange={v => s('brands', v)} placeholder={t.brandsPlaceholder} />
      <YesNo label={t.limitedEdition} value={f.hasLimitedEdition} onChange={v => s('hasLimitedEdition', v)} />
      <YesNo label={t.customOrders} value={f.hasCustomOrders} onChange={v => s('hasCustomOrders', v)} extra={[{ v: 'future', l: c.future }]} />
      <RadioGroup label={t.productCount} value={f.productCount} onChange={v => s('productCount', v)} options={t.productCountOpts} />
      <RadioGroup label={t.photosReady} value={f.photosReady} onChange={v => s('photosReady', v)} options={t.photosOpts} />
      <RadioGroup label={t.dataOrganized} value={f.dataOrganized} onChange={v => s('dataOrganized', v)} options={t.dataOpts} />
      <YesNo label={t.accessories} value={f.hasAccessories} onChange={v => s('hasAccessories', v)} />
      <TextInput label={t.categories} value={f.categories} onChange={v => s('categories', v)} placeholder={t.categoriesPlaceholder} />
      <YesNo label={t.exclusive} value={f.exclusiveKuwait} onChange={v => s('exclusiveKuwait', v)} />
    </>
  );
}

function S3({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s3; const c = S[lang];
  return (
    <>
      <CheckGroup label={t.shippingCountries} values={f.shippingCountries} onChange={v => s('shippingCountries', v)} options={t.countryOpts} />
      <TextInput label={t.localCourier} value={f.localCourier} onChange={v => s('localCourier', v)} />
      <TextInput label={t.intlCourier} value={f.intlCourier} onChange={v => s('intlCourier', v)} />
      <RadioGroup label={t.shippingFee} value={f.shippingFee} onChange={v => s('shippingFee', v)} options={t.shippingFeeOpts} />
      <YesNo label={t.physicalStore} value={f.physicalStore} onChange={v => s('physicalStore', v)} />
      <RadioGroup label={t.cod} value={f.cod} onChange={v => s('cod', v)} options={t.codOpts} />
      <CheckGroup label={t.paymentMethods} values={f.paymentMethods} onChange={v => s('paymentMethods', v)} options={t.paymentOpts} />
      <RadioGroup label={t.currency} value={f.currency} onChange={v => s('currency', v)} options={t.currencyOpts} />
      <YesNo label={t.installments} value={f.installments} onChange={v => s('installments', v)} extra={[{ v: 'future', l: c.future }]} />
      <TextInput label={t.returnPolicy} value={f.returnPolicy} onChange={v => s('returnPolicy', v)} placeholder={t.returnPlaceholder} />
      <YesNo label={t.specialPackaging} value={f.specialPackaging} onChange={v => s('specialPackaging', v)} />
    </>
  );
}

function S4({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s4; const c = S[lang];
  return (
    <>
      <TextInput label={t.referenceSites} value={f.referenceSites} onChange={v => s('referenceSites', v)} placeholder={t.referencePlaceholder} />
      <RadioGroup label={t.bilingual} value={f.bilingual} onChange={v => s('bilingual', v)} options={t.bilingualOpts} />
      <YesNo label={t.advancedFilter} value={f.advancedFilter} onChange={v => s('advancedFilter', v)} />
      <YesNo label={t.encyclopedia} value={f.encyclopedia} onChange={v => s('encyclopedia', v)} />
      <YesNo label={t.wishlist} value={f.wishlist} onChange={v => s('wishlist', v)} />
      <YesNo label={t.reviews} value={f.reviews} onChange={v => s('reviews', v)} />
      <YesNo label={t.loyaltySystem} value={f.loyaltySystem} onChange={v => s('loyaltySystem', v)} extra={[{ v: 'future', l: c.future }]} />
      <YesNo label={t.preorder} value={f.preorder} onChange={v => s('preorder', v)} />
      <YesNo label={t.countdown} value={f.countdown} onChange={v => s('countdown', v)} />
      <YesNo label={t.blog} value={f.blog} onChange={v => s('blog', v)} />
      <YesNo label={t.socialIntegration} value={f.socialIntegration} onChange={v => s('socialIntegration', v)} />
      <YesNo label={t.newsletter} value={f.newsletter} onChange={v => s('newsletter', v)} />
      <YesNo label={t.coupons} value={f.coupons} onChange={v => s('coupons', v)} />
      <YesNo label={t.adminPanel} value={f.adminPanel} onChange={v => s('adminPanel', v)} />
      <RadioGroup label={t.salesReports} value={f.salesReports} onChange={v => s('salesReports', v)} options={t.salesReportsOpts} />
      <YesNo label={t.productComparison} value={f.productComparison} onChange={v => s('productComparison', v)} />
      <YesNo label={t.newArrivals} value={f.newArrivals} onChange={v => s('newArrivals', v)} />
    </>
  );
}

function S5({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s5; const c = S[lang];
  return (
    <>
      <RadioGroup label={t.appFeatures} value={f.appFeatures} onChange={v => s('appFeatures', v)} options={t.appFeaturesOpts} />
      <YesNo label={t.pushNotifications} value={f.pushNotifications} onChange={v => s('pushNotifications', v)} />
      <YesNo label={t.arPreview} value={f.arPreview} onChange={v => s('arPreview', v)} extra={[{ v: 'future', l: c.future }]} />
      <YesNo label={t.barcodeScanner} value={f.barcodeScanner} onChange={v => s('barcodeScanner', v)} />
      <YesNo label={t.orderTracking} value={f.orderTracking} onChange={v => s('orderTracking', v)} />
      <YesNo label={t.socialLogin} value={f.socialLogin} onChange={v => s('socialLogin', v)} />
      <YesNo label={t.offlineMode} value={f.offlineMode} onChange={v => s('offlineMode', v)} />
      <YesNo label={t.publishStores} value={f.publishStores} onChange={v => s('publishStores', v)} />
      <RadioGroup label={t.techPreference} value={f.techPreference} onChange={v => s('techPreference', v)} options={t.techOpts} />
    </>
  );
}

function S6({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s6;
  return (
    <>
      <p className="text-xs font-mono text-ms-gold-600 tracking-widest uppercase mb-3">{t.supportLabel}</p>
      <TextArea label={t.supportFAQ} value={f.supportFAQ} onChange={v => s('supportFAQ', v)} placeholder={t.supportFAQPlaceholder} />
      <YesNo label={t.inventoryIntegration} value={f.inventoryIntegration} onChange={v => s('inventoryIntegration', v)} />
      <YesNo label={t.escalation} value={f.escalation} onChange={v => s('escalation', v)} extra={t.escalationExtra} />
      <RadioGroup label={t.supportLanguage} value={f.supportLanguage} onChange={v => s('supportLanguage', v)} options={t.supportLangOpts} />
      <YesNo label={t.shippingAutoResponse} value={f.shippingAutoResponse} onChange={v => s('shippingAutoResponse', v)} />
      <div className="h-px bg-ms-ivory-200 my-5" />
      <p className="text-xs font-mono text-ms-gold-600 tracking-widest uppercase mb-3">{t.salesLabel}</p>
      <YesNo label={t.budgetRecommendations} value={f.budgetRecommendations} onChange={v => s('budgetRecommendations', v)} />
      <YesNo label={t.salesComparison} value={f.salesComparison} onChange={v => s('salesComparison', v)} />
      <YesNo label={t.upsell} value={f.upsell} onChange={v => s('upsell', v)} />
      <YesNo label={t.cartIntegration} value={f.cartIntegration} onChange={v => s('cartIntegration', v)} />
      <YesNo label={t.giftHelper} value={f.giftHelper} onChange={v => s('giftHelper', v)} />
      <div className="h-px bg-ms-ivory-200 my-5" />
      <p className="text-xs font-mono text-ms-gold-600 tracking-widest uppercase mb-3">{t.waLabel}</p>
      <TextInput label={t.whatsappNumber} value={f.whatsappNumber} onChange={v => s('whatsappNumber', v)} placeholder="+965..." />
      <YesNo label={t.catalogOnWA} value={f.catalogOnWA} onChange={v => s('catalogOnWA', v)} />
      <YesNo label={t.orderOnWA} value={f.orderOnWA} onChange={v => s('orderOnWA', v)} />
      <YesNo label={t.broadcast} value={f.broadcast} onChange={v => s('broadcast', v)} />
      <YesNo label={t.existingWACustomers} value={f.existingWACustomers} onChange={v => s('existingWACustomers', v)} />
      <YesNo label={t.orderNotifications} value={f.orderNotifications} onChange={v => s('orderNotifications', v)} />
      <YesNo label={t.marketingCampaigns} value={f.marketingCampaigns} onChange={v => s('marketingCampaigns', v)} />
    </>
  );
}

function S7({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s7;
  return (
    <>
      <YesNo label={t.logoReady} value={f.logoReady} onChange={v => s('logoReady', v)} />
      <YesNo label={t.brandGuide} value={f.brandGuide} onChange={v => s('brandGuide', v)} />
      <TextInput label={t.preferredColors} value={f.preferredColors} onChange={v => s('preferredColors', v)} placeholder={t.colorsPlaceholder} />
      <RadioGroup label={t.visualStyle} value={f.visualStyle} onChange={v => s('visualStyle', v)} options={t.styleOpts} />
      <TextInput label={t.designReferences} value={f.designReferences} onChange={v => s('designReferences', v)} />
      <RadioGroup label={t.darkMode} value={f.darkMode} onChange={v => s('darkMode', v)} options={t.darkOpts} />
      <RadioGroup label={t.animations} value={f.animations} onChange={v => s('animations', v)} options={t.animOpts} />
    </>
  );
}

function S8({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s8;
  return (
    <>
      <YesNo label={t.accountingSystem} value={f.accountingSystem} onChange={v => s('accountingSystem', v)} />
      <YesNo label={t.erpIntegration} value={f.erpIntegration} onChange={v => s('erpIntegration', v)} />
      <YesNo label={t.analytics} value={f.analytics} onChange={v => s('analytics', v)} />
      <YesNo label={t.adsIntegration} value={f.adsIntegration} onChange={v => s('adsIntegration', v)} />
      <RadioGroup label={t.crm} value={f.crm} onChange={v => s('crm', v)} options={t.crmOpts} />
      <YesNo label={t.shippingAPI} value={f.shippingAPI} onChange={v => s('shippingAPI', v)} />
      <YesNo label={t.domainRegistered} value={f.domainRegistered} onChange={v => s('domainRegistered', v)} />
      <RadioGroup label={t.hosting} value={f.hosting} onChange={v => s('hosting', v)} options={t.hostingOpts} />
    </>
  );
}

function S9({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s9;
  return (
    <>
      <RadioGroup label={t.launchTime} value={f.launchTime} onChange={v => s('launchTime', v)} options={t.launchOpts} />
      <TextInput label={t.seasonalTarget} value={f.seasonalTarget} onChange={v => s('seasonalTarget', v)} placeholder={t.seasonalPlaceholder} />
      <TextInput label={t.budget} value={f.budget} onChange={v => s('budget', v)} placeholder={t.budgetPlaceholder} />
      <RadioGroup label={t.paymentStructure} value={f.paymentStructure} onChange={v => s('paymentStructure', v)} options={t.paymentOpts} />
      <YesNo label={t.monthlyMaintenance} value={f.monthlyMaintenance} onChange={v => s('monthlyMaintenance', v)} />
      <YesNo label={t.techTeam} value={f.techTeam} onChange={v => s('techTeam', v)} />
      <RadioGroup label={t.contentManager} value={f.contentManager} onChange={v => s('contentManager', v)} options={t.contentOpts} />
    </>
  );
}

function S10({ f, s }: { f: F; s: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = S[lang].s10;
  return (
    <>
      <TextArea label={t.localCompetitors} value={f.localCompetitors} onChange={v => s('localCompetitors', v)} placeholder={t.localPlaceholder} />
      <TextArea label={t.intlCompetitors} value={f.intlCompetitors} onChange={v => s('intlCompetitors', v)} placeholder={t.intlPlaceholder} />
      <TextArea label={t.competitiveAdvantage} value={f.competitiveAdvantage} onChange={v => s('competitiveAdvantage', v)} placeholder={t.advantagePlaceholder} />
      <CheckGroup label={t.targetCustomers} values={f.targetCustomers} onChange={v => s('targetCustomers', v)} options={t.customerOpts} />
      <TextInput label={t.ageRange} value={f.ageRange} onChange={v => s('ageRange', v)} placeholder={t.agePlaceholder} />
      <RadioGroup label={t.promotions} value={f.promotions} onChange={v => s('promotions', v)} options={t.promotionOpts} />
    </>
  );
}

const STEPS = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DiscoveryPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<F>(empty);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lang, setLang] = useState<Lang>('ar');

  const t = S[lang];
  const isAr = lang === 'ar';
  const set = (k: keyof F, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const pct = Math.round(((step + 1) / 10) * 100);
  const StepComp = STEPS[step];

  const submit = async () => {
    setStatus('loading');
    try {
      await fetch('https://ifaras911.app.n8n.cloud/webhook/client-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`min-h-screen bg-ms-ivory-0 ${isAr ? 'font-arabic' : 'font-sans'} flex items-center justify-center px-4`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-ms-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-ms-ink-900 mb-3">{t.successTitle}</h1>
          <p className="text-ms-ink-600 leading-relaxed mb-2">{t.successBody1}</p>
          <p className="text-ms-ink-600 leading-relaxed mb-8">{t.successBody2}</p>
          <a href="https://www.mindsynckw.com"
            className="inline-block bg-ms-green-800 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-ms-green-700 transition">
            {t.backToSite}
          </a>
          <p className="mt-6 text-xs text-ms-ink-400 font-mono">+965 9953 9006 · @mindsynckw</p>
        </div>
      </div>
    );
  }

  return (
    <LangCtx.Provider value={lang}>
      <div className={`min-h-screen bg-ms-ivory-0 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>

        {/* Header */}
        <header className="bg-ms-green-800 px-6 py-4 sticky top-0 z-10 shadow-lg">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/brand/logo-transparent.png" alt="MindSync" width={32} height={32} className="opacity-90" />
              <div>
                <p className="text-white font-bold text-sm leading-tight">MindSync</p>
                <p className="text-ms-gold-600 text-xs font-mono tracking-wider">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Lang toggle */}
              <button
                type="button"
                onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ms-green-600 text-ms-ivory-0 text-xs font-mono tracking-wider hover:bg-ms-green-700 transition"
              >
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>
              <span className="text-ms-ivory-200 text-xs font-mono">{t.stepOf(step + 1)}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="max-w-2xl mx-auto mt-3">
            <div className="h-1 bg-ms-green-700 rounded-full overflow-hidden">
              <div className="h-full bg-ms-gold-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </header>

        {/* Section title */}
        <div className="bg-ms-green-900 px-6 py-5">
          <div className="max-w-2xl mx-auto">
            <p className="text-ms-gold-600 text-xs font-mono tracking-widest uppercase mb-1">
              {t.section} {t.sectionNums[step]}
            </p>
            <h1 className="text-white text-xl font-bold">{t.sectionTitles[step]}</h1>
          </div>
        </div>

        {/* Form content */}
        <main className="max-w-2xl mx-auto px-5 py-8">
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-700">
              {t.error}
            </div>
          )}
          <StepComp f={form} s={set} />
        </main>

        {/* Navigation */}
        <div className="sticky bottom-0 bg-white border-t border-ms-ivory-200 px-5 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <button type="button" onClick={() => setStep(s => s - 1)} disabled={step === 0}
              className="px-6 py-2.5 rounded-full border border-ms-ivory-200 text-ms-ink-600 text-sm font-medium
                disabled:opacity-30 hover:border-ms-green-800 hover:text-ms-green-800 transition">
              {t.prev}
            </button>

            {/* Step dots */}
            <div className="flex gap-1.5">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === step ? 'w-4 h-2 bg-ms-gold-600' :
                  i < step ? 'w-2 h-2 bg-ms-green-800' : 'w-2 h-2 bg-ms-ivory-200'}`} />
              ))}
            </div>

            {step < 9 ? (
              <button type="button"
                onClick={() => { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-2.5 rounded-full bg-ms-green-800 text-white text-sm font-semibold hover:bg-ms-green-700 transition shadow-sm">
                {t.next}
              </button>
            ) : (
              <button type="button" onClick={() => void submit()} disabled={status === 'loading'}
                className="px-8 py-2.5 rounded-full bg-ms-gold-600 text-white text-sm font-bold hover:bg-ms-gold-500 transition shadow-sm disabled:opacity-60">
                {status === 'loading' ? t.submitting : t.submit}
              </button>
            )}
          </div>
        </div>

      </div>
    </LangCtx.Provider>
  );
}
