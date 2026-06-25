import type { Metadata } from 'next'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Privacy Policy — MindSync | سياسة الخصوصية',
  description: 'How MindSync collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://www.mindsynckw.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <LangProvider>
      <Navbar />
      <main className="pt-24 pb-24 min-h-screen bg-ms-ivory-0">
        <div className="max-w-3xl mx-auto px-6">

          {/* EN */}
          <section className="mb-20">
            <p className="font-mono text-xs tracking-widest text-ms-gold-600 uppercase mb-3">Legal</p>
            <h1 className="text-3xl font-semibold text-ms-ink-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-ms-ink-500 mb-10">Last updated: May 2026</p>

            <div className="prose prose-sm max-w-none text-ms-ink-700 space-y-6">
              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">1. Information We Collect</h2>
                <p>When you fill out the discovery form or contact us, we collect your name, business name, phone number, email address, and information about your business and its needs. If you become a client, we also collect billing details and operational data needed to run your AI system.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">2. How We Use Your Information</h2>
                <p>We use your information to deliver and maintain your AI automation system, communicate with you about your service, send invoices and renewal reminders, and improve our products. We do not sell, rent, or trade your personal information to third parties.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">3. Data Storage</h2>
                <p>Client data is stored in Google Sheets and processed through our n8n automation platform hosted on n8n Cloud. Conversation data from your AI agents is stored temporarily to provide analytics and is not shared with other clients.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">4. WhatsApp & Messaging</h2>
                <p>Your customers' WhatsApp conversations pass through your assigned AI agent. These conversations are logged for your analytics dashboard and to improve agent performance. MindSync does not use customer conversation data for any purpose beyond serving your account.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">5. Your Rights</h2>
                <p>You may request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:admin@mindsynckw.com" className="text-ms-green-800 underline">admin@mindsynckw.com</a>. We will respond within 7 business days.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">6. Cookies</h2>
                <p>Our website uses a cookie to remember your language preference (Arabic/English). We also use Google Ads conversion measurement to understand which ads lead to enquiries, which may set cookies in your browser. With your consent, we also use PostHog product analytics to understand how visitors use the site so we can improve it — you can decline when prompted, and we honour your choice. We do not sell your data, build advertising profiles, or use intrusive cross-site tracking. You can block or clear cookies at any time through your browser settings.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">7. Contact</h2>
                <p>MindSync — مايند سينك لتصميم وبرمجة البرمجيات الخاصة<br />
                Email: <a href="mailto:admin@mindsynckw.com" className="text-ms-green-800 underline">admin@mindsynckw.com</a><br />
                Kuwait</p>
              </section>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-ms-ivory-200 mb-16" />

          {/* AR */}
          <section dir="rtl" className="font-arabic">
            <p className="font-mono text-xs tracking-widest text-ms-gold-600 uppercase mb-3">قانوني</p>
            <h1 className="text-3xl font-semibold text-ms-ink-900 mb-2">سياسة الخصوصية</h1>
            <p className="text-sm text-ms-ink-500 mb-10">آخر تحديث: مايو 2026</p>

            <div className="space-y-6 text-ms-ink-700 text-sm leading-relaxed">
              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">١. المعلومات التي نجمعها</h2>
                <p>عند تعبئة استمارة الاستكشاف أو التواصل معنا، نجمع اسمك واسم شركتك ورقم هاتفك وبريدك الإلكتروني ومعلومات عن نشاطك التجاري. إذا أصبحت عميلاً، نجمع أيضاً بيانات الفواتير والبيانات التشغيلية اللازمة لتشغيل نظامك الذكي.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٢. كيف نستخدم معلوماتك</h2>
                <p>نستخدم معلوماتك لتقديم خدمة الأتمتة الذكية والحفاظ عليها، والتواصل معك بشأن خدمتك، وإرسال الفواتير وتذكيرات التجديد، وتحسين منتجاتنا. لا نبيع معلوماتك الشخصية أو نؤجرها أو نتبادلها مع أي طرف ثالث.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٣. تخزين البيانات</h2>
                <p>تُخزَّن بيانات العملاء في Google Sheets وتُعالَج عبر منصة أتمتة n8n المستضافة على n8n Cloud. بيانات المحادثات من وكلائك الذكيين تُخزَّن مؤقتاً لأغراض التحليل ولا تُشارَك مع عملاء آخرين.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٤. واتساب والمراسلة</h2>
                <p>تمر محادثات واتساب الخاصة بعملائك عبر وكيلك الذكي المخصص. تُسجَّل هذه المحادثات لوحة تحليلاتك وتحسين أداء الوكيل. لا تستخدم مايند سينك بيانات محادثات العملاء لأي غرض خارج خدمة حسابك.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٥. حقوقك</h2>
                <p>يمكنك في أي وقت طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها عبر مراسلتنا على <a href="mailto:admin@mindsynckw.com" className="text-ms-green-800 underline">admin@mindsynckw.com</a>. سنرد خلال 7 أيام عمل.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٦. ملفات تعريف الارتباط</h2>
                <p>يستخدم موقعنا ملف تعريف ارتباط لحفظ تفضيلات اللغة (عربي/إنجليزي). كما نستخدم أداة قياس التحويلات من Google Ads لمعرفة الإعلانات التي تؤدي إلى استفسارات، وقد يضع ذلك ملفات ارتباط في متصفحك. وبموافقتك، نستخدم أيضاً تحليلات PostHog لفهم كيفية استخدام الزوار للموقع بهدف تحسينه — يمكنك الرفض عند ظهور الإشعار، ونحترم اختيارك. لا نبيع بياناتك ولا نُنشئ ملفات إعلانية ولا نستخدم تتبعاً متعدد المواقع. يمكنك حظر ملفات الارتباط أو حذفها في أي وقت من إعدادات متصفحك.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٧. التواصل</h2>
                <p>مايند سينك — مايند سينك لتصميم وبرمجة البرمجيات الخاصة<br />
                البريد الإلكتروني: <a href="mailto:admin@mindsynckw.com" className="text-ms-green-800 underline">admin@mindsynckw.com</a><br />
                الكويت</p>
              </section>
            </div>
          </section>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </LangProvider>
  )
}
