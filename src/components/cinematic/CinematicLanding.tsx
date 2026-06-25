'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { TIERS, PILOT } from '@/lib/data'
import s from './cinematic.module.css'

const ARD = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
const toAr = (v: string | number) => String(v).replace(/[0-9]/g, d => ARD[+d])
const fmt = (n: number, isAr: boolean) => {
  const w = n.toLocaleString('en-US')
  return isAr ? toAr(w).replace(/,/g, '٬') : w
}

function CountUp({ to, reduce }: { to: number; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce || !inView) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1300)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])
  return <span ref={ref}>{v}</span>
}

function Reveal({ children, y = 40, delay = 0, className }: { children: React.ReactNode; y?: number; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Headline({ isAr }: { isAr: boolean }) {
  const text = isAr ? 'نظام إدارة أعمال ذكي لمشروعك' : 'A smart AI system to run your business'
  const goldIdx = isAr ? 3 : 2
  const words = text.split(' ')
  return (
    <motion.h1
      key={isAr ? 'ar' : 'en'}
      className={s.h1}
      style={{ perspective: 700 }}
      initial="hide"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          className={i === goldIdx ? s.gold : undefined}
          variants={{ hide: { opacity: 0, y: 40, rotateX: -40 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.h1>
  )
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className={s.faq}>
      {items.map((it, i) => {
        const isO = open === i
        return (
          <Reveal key={i} delay={i * 0.06}>
            <div className={`${s.faqItem} ${isO ? s.open : ''}`}>
              <button className={s.faqQ} data-hov onClick={() => setOpen(isO ? null : i)}>
                <span>{it.q}</span>
                <span className={s.pl}>+</span>
              </button>
              <div className={s.faqA} style={{ maxHeight: isO ? 240 : 0 }}>
                <p>{it.a}</p>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

const ADDON_ICONS = [
  <svg key="w" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" /></svg>,
  <svg key="s" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.4 11h10L20 7H6.5" /></svg>,
  <svg key="a" viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></svg>,
  <svg key="v" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>,
  <svg key="c" viewBox="0 0 24 24"><path d="M9 15l6-6M10.5 5.5l1-1a4 4 0 0 1 6 6l-1 1M13.5 18.5l-1 1a4 4 0 0 1-6-6l1-1" /></svg>,
  <svg key="m" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" /></svg>,
]
const ADDONS_UI = [
  { ar: ['موقع خدمي مخصّص', 'موقع احترافي يعرّف بخدماتك'], en: ['Custom website', 'A pro site that showcases your services'] },
  { ar: ['متجر إلكتروني', 'بيع منتجاتك أونلاين بالكامل'], en: ['Custom e-shop', 'Sell your products online, end to end'] },
  { ar: ['تطبيق موبايل', 'iOS و Android بهوية مشروعك'], en: ['Mobile app', 'iOS & Android, your brand'] },
  { ar: ['الوكيل الصوتي', 'يرد على مكالمات عملائك'], en: ['Voice AI agent', "Answers your customers' phone calls"] },
  { ar: ['الربط بنظامك الحالي', 'حجوزات، كاشير، ومحاسبة'], en: ['Connect your systems', 'Bookings, POS & accounting'] },
  { ar: ['تفعيل واتساب الرسمي', 'الـ API والتوثيق الأخضر'], en: ['Official WhatsApp', 'Business API + green tick'] },
]
const FAQ_UI = [
  { ar: ['شنو تحتاجون مني عشان تبدون؟', 'بس معلومات مشروعك وخدماتك وقنواتك — وندبّر الباقي.'], en: ['What do you need from me to start?', 'Just your business info, services and channels — we handle the rest.'] },
  { ar: ['بأي قنوات يشتغل الوكيل؟', 'واتساب، انستقرام، وموقعك — حسب باقتك.'], en: ['Which channels does it work on?', 'WhatsApp, Instagram and your website — depending on your tier.'] },
  { ar: ['كم ياخذ وقت لين يشتغل؟', 'تبدأ بتجربة ٣٠ يوم، وبعدها نبني النظام الكامل.'], en: ['How long until it’s live?', 'You start with a 30-day pilot, then we build the full system.'] },
  { ar: ['هل يرد باللهجة الكويتية؟', 'إي، باللهجة الكويتية — عربي وإنجليزي.'], en: ['Does it reply in Kuwaiti dialect?', 'Yes — Kuwaiti dialect, Arabic and English.'] },
]
const CHAPTERS = [
  { id: 'hero', ar: ['٠١', 'البداية'], en: ['01', 'Start'] },
  { id: 'how', ar: ['٠٢', 'شلون يشتغل'], en: ['02', 'How it works'] },
  { id: 'tiers', ar: ['٠٣', 'الباقات'], en: ['03', 'Plans'] },
  { id: 'close', ar: ['٠٤', 'يالله نبدأ'], en: ['04', "Let's go"] },
]

export default function CinematicLanding() {
  const { isAr, toggle } = useLang()
  const reduce = useReducedMotion() ?? false
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dustRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [prog, setProg] = useState(0)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const apY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const apScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])
  const apOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])
  const txtY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const txtOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // custom cursor
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return
    const dot = dotRef.current, ring = ringRef.current
    if (!dot || !ring) return
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = 0
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)` }
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop) }
    window.addEventListener('pointermove', move); loop()
    document.body.classList.add('hascur')
    const els = Array.from(document.querySelectorAll('a,button,[data-hov]'))
    const en = () => ring.classList.add(s.big), lv = () => ring.classList.remove(s.big)
    els.forEach(el => { el.addEventListener('pointerenter', en); el.addEventListener('pointerleave', lv) })
    return () => {
      window.removeEventListener('pointermove', move); cancelAnimationFrame(raf)
      document.body.classList.remove('hascur')
      els.forEach(el => { el.removeEventListener('pointerenter', en); el.removeEventListener('pointerleave', lv) })
    }
  }, [reduce])

  // gold dust
  useEffect(() => {
    if (reduce) return
    const cv = dustRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0, raf = 0
    const P = Array.from({ length: 46 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.8 + 0.3, s: Math.random() * 0.3 + 0.05, o: Math.random() * 0.5 + 0.1 }))
    const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight }
    rs()
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of P) { p.y -= p.s; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W } ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.3); ctx.fillStyle = `rgba(191,141,56,${p.o})`; ctx.fill() }
      raf = requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize', rs)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', rs) }
  }, [reduce])

  // chapter rail tracking
  useEffect(() => {
    const onScroll = () => {
      const sh = document.documentElement.scrollHeight - innerHeight
      setProg(sh > 0 ? Math.min(1, window.scrollY / sh) : 0)
      const mid = window.scrollY + innerHeight / 2
      let a = 0
      CHAPTERS.forEach((c, i) => { const el = document.getElementById(c.id); if (el && el.offsetTop <= mid) a = i })
      setActive(a)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', x * 100 + '%')
    el.style.setProperty('--my', y * 100 + '%')
    if (!reduce) el.style.transform = `rotateY(${(x - 0.5) * 9}deg) rotateX(${(0.5 - y) * 9}deg)`
  }
  const offTilt = (e: React.PointerEvent<HTMLDivElement>) => { e.currentTarget.style.transform = '' }

  const HOW = [
    { img: 'icon-msg.png', ar: 'يراسلك عميلك', en: 'Your customer messages you' },
    { img: 'icon-ai.png', ar: 'يرد الـ AI', en: 'AI replies' },
    { img: 'icon-grow.png', ar: 'تتابع وتنمو', en: 'You track & grow' },
  ]
  const LIVE: { n: string; ar: string; en: string; gold?: boolean }[] = [
    { n: '٠١', ar: 'نتعرّف عليك', en: 'Discovery' },
    { n: '٠٢', ar: 'نبني نظامك', en: 'We build' },
    { n: '٠٣', ar: 'نسلّم ونشرح', en: 'Deliver & train' },
    { n: '٠٤', ar: 'إطلاق مباشر', en: 'Go live' },
    { n: '٠٥', ar: 'صيانة دورية', en: 'We maintain', gold: true },
  ]

  return (
    <div className={`${s.root} ${isAr ? '' : s.ltr}`}>
      <div className={s.sheet} aria-hidden />
      <div className={s.grain} aria-hidden />
      <canvas ref={dustRef} className={s.dust} aria-hidden />
      <div className={s.vignette} aria-hidden />
      <div ref={ringRef} className={`${s.cur} ${s.curRing}`} aria-hidden />
      <div ref={dotRef} className={`${s.cur} ${s.curDot}`} aria-hidden />

      <div className={s.langtog}>
        <button className={isAr ? s.on : ''} onClick={() => { if (!isAr) toggle() }}>ع</button>
        <button className={!isAr ? s.on : ''} onClick={() => { if (isAr) toggle() }}>EN</button>
      </div>

      <nav className={s.chapnav} aria-label="sections">
        <div className={s.chapline} style={{ height: `${prog * 100}%` }} />
        {CHAPTERS.map((c, i) => {
          const [num, label] = isAr ? c.ar : c.en
          return (
            <button key={c.id} className={`${s.chap} ${active === i ? s.on : ''}`} onClick={() => goTo(c.id)}>
              <span className={s.dot} />
              <span className={s.lbl}><b>{num}</b>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} className={`${s.sec} ${s.hero}`}>
        <motion.div className={s.aperture} style={reduce ? undefined : { y: apY, scale: apScale, opacity: apOpacity }}>
          <div className={s.glow} />
          <div className={s.ring} />
          <div className={`${s.ring} ${s.ring2}`} />
          <div className={`${s.ring} ${s.ringSpin}`} />
          <img className={s.logo} src="/brand/logo-transparent.png" alt="MindSync" />
        </motion.div>
        <motion.div style={reduce ? undefined : { y: txtY, opacity: txtOpacity }} className={s.heroText}>
          <motion.p className={s.eyebrow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
            MindSync · {isAr ? 'أتمتة الذكاء الاصطناعي' : 'AI Automation'}
          </motion.p>
          <Headline isAr={isAr} />
          <motion.p className={s.sub} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
            {isAr
              ? 'يرد، يحجز، يتابع، ويحلل ٢٤/٧ — كأن عندك فريق موظفين كامل، باللهجة الكويتية.'
              : "Replies, books, follows up & analyzes 24/7 — like a full team, in your customers' language."}
          </motion.p>
        </motion.div>
        <motion.div className={s.cue} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}>
          <span>{isAr ? 'انزل' : 'Scroll'}</span><i />
        </motion.div>
      </section>

      {/* STATS */}
      <section id="stats" className={s.sec}>
        <Reveal className={s.head}><h2>{isAr ? 'كأن عندك فريق كامل — بدون رواتب' : 'Like a full team — without the payroll'}</h2></Reveal>
        <div className={s.stats}>
          {([
            { pre: '<', to: 60, ar: 'ثانية أو أقل للرد', en: 'seconds or less to reply' },
            { to: 24, post: '/7', ar: 'ساعة باليوم، ما يغمّض', en: 'hours a day, never off' },
            { to: 0, ar: 'رسالة تروح بدون رد', en: 'messages left unanswered' },
          ] as { pre?: string; post?: string; to: number; ar: string; en: string }[]).map((m, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className={s.mcard}>
                <div className={s.mnum}>{m.pre && <span>{m.pre}</span>}<b><CountUp to={m.to} reduce={reduce} /></b>{m.post && <span>{m.post}</span>}</div>
                <p>{isAr ? m.ar : m.en}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIGHT WRAP — How it works + Live in 7 days */}
      <div className={s.lightWrap}>
        <section id="how" className={`${s.sec} ${s.light}`}>
          <Reveal className={s.head}>
            <div className={s.num}>شلون يشتغل · HOW IT WORKS</div>
            <h2>بسيط لعملائك، ذكي لك <em>— simple for your clients, smart for you</em></h2>
          </Reveal>
          <div className={s.howgrid}>
            {HOW.map((h, i) => (
              <Fragment key={h.img}>
                {i > 0 && <div className={s.harrow}>←</div>}
                <motion.div className={s.howcard} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                  <img src={`/brand/${h.img}`} alt="" />
                  <h3>{h.ar}</h3>
                  <p>{h.en}</p>
                </motion.div>
              </Fragment>
            ))}
          </div>
        </section>

        <section id="live" className={`${s.sec} ${s.light}`}>
          <Reveal className={s.head}>
            <div className={s.num}>من الصفر إلى الإطلاق · LIVE IN 7 DAYS</div>
            <h2>نظامك حيّ خلال ٧ أيام <em>— live in 7 days</em></h2>
          </Reveal>
          <div className={s.livegrid}>
            {LIVE.map((l, i) => (
              <Fragment key={l.n}>
                {i > 0 && <div className={s.larrow}>←</div>}
                <motion.div className={`${s.livecard} ${l.gold ? s.goldcard : ''}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                  <div className={s.n}>{l.n}</div>
                  <h3>{l.ar}</h3>
                  <p>{l.en}</p>
                </motion.div>
              </Fragment>
            ))}
          </div>
        </section>
      </div>

      {/* TIERS */}
      <section id="tiers" className={s.sec}>
        <Reveal className={s.head}>
          <div className={s.num}>{isAr ? '٠٣ — الباقات' : '03 — Plans'}</div>
          <h2>{isAr ? 'ثلاث باقات — نختار لك الأنسب' : 'Three tiers — your best fit'}</h2>
          <p>{isAr ? `نفس النظام لكل المشاريع · تبدأ بتجربة ${toAr(PILOT.days)} يوم` : `One system for every business · ${PILOT.days}-day pilot`}</p>
        </Reveal>
        <div className={s.cards}>
          {TIERS.map((t, i) => {
            const feat = !!t.badge
            const feats = (isAr ? t.features.ar : t.features.en).slice(0, 4)
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <div className={`${s.card} ${feat ? s.feat : ''}`} data-hov onPointerMove={onTilt} onPointerLeave={offTilt}>
                  <div className={s.sweep} />
                  {feat && <div className={s.badge}>{isAr ? 'الأكثر طلباً' : 'Most popular'}</div>}
                  <div className={s.role}>{t.roleEn}</div>
                  <div className={s.tname}>{isAr ? t.roleAr : t.en}</div>
                  <div className={s.price}><b><CountUp to={t.monthly} reduce={reduce} /></b><s>{isAr ? 'د.ك / شهر' : 'KWD / mo'}</s></div>
                  <div className={s.setup}>{isAr ? `من ${toAr(t.buildFee)} د.ك تأسيس · ${fmt(t.conversationsIncluded, true)} محادثة` : `From ${t.buildFee} KWD setup · ${fmt(t.conversationsIncluded, false)} chats`}</div>
                  <ul className={s.feats}>{feats.map((f, k) => <li key={k}>{f}</li>)}</ul>
                  <a className={s.cta} href="/discovery" data-hov>{isAr ? 'ابدأ التجربة' : 'Start the pilot'}</a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ADD-ONS */}
      <section id="addons" className={s.sec}>
        <Reveal className={s.head}>
          <div className={s.num}>{isAr ? 'إضافات وخدمات' : 'Add-ons & services'}</div>
          <h2>{isAr ? 'كبّر نظامك وقت ما تحتاج' : 'Grow your system when you need'}</h2>
          <p>{isAr ? 'موقع، تطبيق، وكيل صوتي، وتكاملات — تُسعّر حسب الطلب بعد مكالمة سريعة.' : 'Website, app, voice agent & integrations — priced on request after a quick call.'}</p>
        </Reveal>
        <div className={s.addgrid}>
          {ADDONS_UI.map((a, i) => {
            const [title, desc] = isAr ? a.ar : a.en
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className={s.addcard} data-hov>
                  <div className={s.aico}>{ADDON_ICONS[i]}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className={s.req}>{isAr ? 'حسب الطلب' : 'On request'}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={s.sec}>
        <Reveal className={s.head}>
          <div className={s.num}>{isAr ? 'الأسئلة' : 'FAQ'}</div>
          <h2>{isAr ? 'أسئلة متكررة' : 'Common questions'}</h2>
        </Reveal>
        <Faq items={FAQ_UI.map(f => { const [q, a] = isAr ? f.ar : f.en; return { q, a } })} />
      </section>

      {/* CLOSE */}
      <section id="close" className={`${s.sec} ${s.close}`}>
        <Reveal>
          <div className={s.num}>{isAr ? '٠٤ — يالله نبدأ' : "04 — Let's begin"}</div>
          <h2>{isAr ? 'شنو الشغل اللي تعبت تسويه يدوياً؟ احنا نأتمته.' : "What task are you tired of doing by hand? We'll automate it."}</h2>
          <a className={s.mbtn} href="/discovery" data-hov>{isAr ? 'احجز مكالمة الاستكشاف' : 'Book a discovery call'}</a>
        </Reveal>
      </section>
      <div className={s.foot}>MindSync · {isAr ? 'مدينة الكويت' : 'Kuwait City'}</div>
    </div>
  )
}
