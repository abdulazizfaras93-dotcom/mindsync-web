# MindSync App — Store Listing Copy

## App Name
**English:** MindSync  
**Arabic:** مايند سينك

## Subtitle (iOS — max 30 chars)
**English:** Your Business, Automated  
**Arabic:** أعمالك، مؤتمتة

---

## Short Description / Promotional Text (max 170 chars)
**English:**  
Monitor your AI agent, reply to customers, and broadcast messages — all from your phone.

**Arabic:**  
راقب وكيلك الذكي، رد على العملاء، وأرسل رسائل جماعية — كل ذلك من هاتفك.

---

## Full Description

### English
MindSync gives Kuwait SMB owners a dedicated portal to manage their AI automation service on the go.

**Key Features:**
• Live conversation feed — see every customer message across WhatsApp, website, and Instagram
• Agent controls — pause or resume your AI agent with one tap
• Broadcast — send a message to all your WhatsApp customers at once
• Conversation transcripts — read, copy, and export full chat histories
• Analytics dashboard — response rate, booking rate, and monthly metrics
• Settings — update greetings, working hours, and service list without calling support
• Plan management — request tier upgrades or add-ons directly in the app

**For Clinic, Salon, Gym, Restaurant & Business Owners:**
Your MindSync AI agent handles customer inquiries 24/7 while you focus on running your business. This app puts the controls in your hands.

**Admin (MindSync Team):**
Full operator dashboard with cross-client oversight, real-time takeover, quick replies, and the MindSync AI Manager chat for instant business intelligence.

### Arabic
مايند سينك تمنحك بوابة خاصة لإدارة خدمة الأتمتة الذكية لأعمالك في الكويت من أي مكان.

**المميزات الرئيسية:**
• متابعة المحادثات مباشرة — شاهد رسائل العملاء من واتساب والموقع وانستغرام
• التحكم في الوكيل — أوقف أو شغّل وكيلك الذكي بضغطة واحدة
• الرسائل الجماعية — أرسل رسالة لجميع عملائك على واتساب دفعةً واحدة
• نسخ المحادثات — اقرأ وانسخ وصدّر سجل المحادثات الكاملة
• لوحة التحليلات — معدل الاستجابة، ومعدل الحجوزات، والمقاييس الشهرية
• الإعدادات — حدّث رسائل الترحيب وساعات العمل وقائمة الخدمات
• إدارة الخطة — اطلب ترقية أو إضافة خدمات من داخل التطبيق مباشرة

---

## Keywords (App Store — comma separated, max 100 chars)
AI agent,WhatsApp bot,Kuwait business,automation,chatbot,clinic,salon,gym,CRM,customer service

**Arabic keywords:**
وكيل ذكي,واتساب,أتمتة,الكويت,روبوت,خدمة عملاء,عيادة,صالون

---

## Category
**Primary:** Business  
**Secondary:** Productivity

---

## Age Rating
4+ (No objectionable content)

---

## Privacy Policy URL
https://www.mindsynckw.com/privacy

---

## Support URL
https://www.mindsynckw.com

---

## What's New (v1.0.0)
**English:** Initial release — manage your MindSync AI agent, view conversations, broadcast messages, and track analytics from your iPhone or Android.

**Arabic:** الإصدار الأول — أدر وكيلك الذكي، تابع المحادثات، أرسل رسائل جماعية، وراقب التحليلات من هاتفك.

---

## EAS Build Commands

### Development build (test on device)
```bash
cd mobile
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Preview build (internal testing)
```bash
eas build --profile preview --platform all
```

### Production build (app store submission)
```bash
eas build --profile production --platform ios
eas build --profile production --platform android
```

### Submit to stores
```bash
# iOS — requires Apple Developer account ($99/yr)
eas submit --platform ios --latest

# Android — requires Google Play account ($25 one-time)
eas submit --platform android --latest
```

---

## Pre-Launch Checklist

- [x] App icons (1024×1024) — icon.png, adaptive-icon.png, splash-icon.png
- [x] Splash screen (backgroundColor: #0F2E22)
- [x] eas.json configured (development / preview / production profiles)
- [x] Bundle identifiers set (com.mindsynckw.clientapp)
- [x] Permissions declared (iOS infoPlist + Android permissions)
- [ ] Apple Developer account enrolled (developer.apple.com — $99/yr, uses abdulazizfaras93@gmail.com)
- [ ] App Store Connect app record created
- [ ] Google Play Console account ($25 one-time)
- [ ] Privacy policy page live at mindsynckw.com/privacy
- [ ] Store screenshots captured (6.5" iPhone + Android 5")
- [ ] `eas build --profile production` run successfully
- [ ] TestFlight / internal track tested
- [ ] `eas submit` to both stores
