import type { Metadata } from 'next'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Terms of Service — MindSync | الشروط والأحكام',
  description: 'Terms and conditions for using MindSync AI automation services.',
  alternates: { canonical: 'https://www.mindsynckw.com/terms' },
}

export default function TermsPage() {
  return (
    <LangProvider>
      <Navbar />
      <main className="pt-24 pb-24 min-h-screen bg-ms-ivory-0">
        <div className="max-w-3xl mx-auto px-6">

          {/* EN */}
          <section className="mb-20">
            <p className="font-mono text-xs tracking-widest text-ms-gold-600 uppercase mb-3">Legal</p>
            <h1 className="text-3xl font-semibold text-ms-ink-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-ms-ink-500 mb-10">Last updated: May 2026</p>

            <div className="prose prose-sm max-w-none text-ms-ink-700 space-y-6">
              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">1. Services</h2>
                <p>MindSync (مايند سينك لتصميم وبرمجة البرمجيات الخاصة) provides AI automation systems, websites, and mobile applications for small and medium businesses in Kuwait and the GCC. By engaging our services, you agree to these terms.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">2. Payment & Fees</h2>
                <p>Our pricing consists of a one-time build fee and a monthly retainer. Build fees are due before development begins. Retainer fees are due at the start of each month. Failure to pay the retainer within 7 days of the due date may result in the suspension of your AI system until payment is received.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">3. Service Level</h2>
                <p>MindSync targets delivery of a functional AI system within 7 business days of receiving all required client information and build fee payment. This timeline is an estimate and may vary based on complexity and client responsiveness.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">4. Intellectual Property</h2>
                <p>Upon full payment of the build fee, you own the configuration and outputs of your AI system. MindSync retains the right to use anonymised system architectures and workflows as templates for other clients. Source code of generic tools and frameworks remains the property of MindSync.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">5. Cancellation</h2>
                <p>You may cancel the monthly retainer at any time with 14 days' written notice. Your AI system will remain active until the end of the paid period. No refunds are issued for partial months. The build fee is non-refundable once development has commenced.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">6. Limitation of Liability</h2>
                <p>MindSync is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our AI systems, including but not limited to loss of revenue or business interruption. Our total liability in any circumstance is limited to the fees paid in the preceding 30 days.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">7. Third-Party Services</h2>
                <p>Our systems rely on third-party platforms including WhatsApp Business API, Google Workspace, n8n, and Anthropic Claude. Availability and pricing of these services are outside our control. We will notify you of any material changes that affect your system.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">8. Governing Law</h2>
                <p>These terms are governed by the laws of the State of Kuwait. Any disputes shall be resolved in the competent courts of Kuwait.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">9. Contact</h2>
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
            <h1 className="text-3xl font-semibold text-ms-ink-900 mb-2">الشروط والأحكام</h1>
            <p className="text-sm text-ms-ink-500 mb-10">آخر تحديث: مايو 2026</p>

            <div className="space-y-6 text-ms-ink-700 text-sm leading-relaxed">
              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">١. الخدمات</h2>
                <p>تقدم مايند سينك (مايند سينك لتصميم وبرمجة البرمجيات الخاصة) أنظمة أتمتة ذكاء اصطناعي، ومواقع إلكترونية، وتطبيقات للشركات الصغيرة والمتوسطة في الكويت ومنطقة الخليج. باستخدامك لخدماتنا، فإنك توافق على هذه الشروط.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٢. الدفع والرسوم</h2>
                <p>تتكون أسعارنا من رسوم بناء لمرة واحدة واشتراك شهري. رسوم البناء مستحقة قبل بدء التطوير. الاشتراك الشهري مستحق في بداية كل شهر. قد يؤدي التأخر في السداد أكثر من 7 أيام إلى تعليق نظامك الذكي حتى استلام الدفعة.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٣. مستوى الخدمة</h2>
                <p>تستهدف مايند سينك تسليم النظام الذكي في غضون 7 أيام عمل من استلام جميع المعلومات المطلوبة ورسوم البناء. هذا الجدول الزمني تقديري وقد يتفاوت بحسب التعقيد وسرعة استجابة العميل.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٤. الملكية الفكرية</h2>
                <p>عند اكتمال سداد رسوم البناء، تمتلك إعدادات ومخرجات نظامك الذكي. تحتفظ مايند سينك بحق استخدام هياكل الأنظمة العامة كقوالب لعملاء آخرين. يظل الكود المصدري للأدوات العامة ملكاً لمايند سينك.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٥. الإلغاء</h2>
                <p>يمكنك إلغاء الاشتراك الشهري في أي وقت بإشعار كتابي قبل 14 يوماً. يبقى نظامك نشطاً حتى نهاية الفترة المدفوعة. لا تُستردّ المدفوعات الجزئية. رسوم البناء غير قابلة للاسترداد بعد بدء التطوير.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٦. تحديد المسؤولية</h2>
                <p>لا تتحمل مايند سينك المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام أنظمتنا الذكية. يقتصر إجمالي مسؤوليتنا على الرسوم المدفوعة خلال الـ 30 يوماً السابقة.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٧. الخدمات الخارجية</h2>
                <p>تعتمد أنظمتنا على منصات خارجية تشمل واتساب للأعمال وGoogle Workspace وn8n وAnthropic Claude. توفر هذه الخدمات وأسعارها خارج سيطرتنا. سنبلغك بأي تغييرات جوهرية تؤثر على نظامك.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٨. القانون المعمول به</h2>
                <p>تخضع هذه الشروط لقوانين دولة الكويت. تُحسم أي نزاعات أمام المحاكم الكويتية المختصة.</p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-ms-ink-900 mb-2">٩. التواصل</h2>
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
