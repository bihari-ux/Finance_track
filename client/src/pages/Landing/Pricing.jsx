import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layouts/Navbar';
import {
  Check, X, Sparkles, ArrowRight, HelpCircle,
  Shield, Zap, TrendingUp, Users, Globe, Award,
  Star, ChevronDown, ChevronUp, BarChart2, CreditCard,
  Bell, RefreshCw, Lock, Headphones, Gift, Cpu
} from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Can I cancel at any time?',
      a: 'Absolutely. Cancel anytime from your account settings — you keep Pro features until the end of your billing cycle. No questions asked.',
    },
    {
      q: 'Is my financial data secure?',
      a: 'Yes. We use AES-256 bank-level encryption with read-only access to your accounts. Nobody can move your money — we can only read it.',
    },
    {
      q: 'What happens after the free trial?',
      a: "After 14 days you'll be billed for the plan you chose. We'll email you 3 days before so there are no surprises.",
    },
    {
      q: 'Do you support international banks?',
      a: 'Fintriq connects to 10,000+ banks across North America, Europe, Asia, and Australia.',
    },
    {
      q: 'Can I switch plans later?',
      a: 'Yes — upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at your next renewal.',
    },
    {
      q: 'Is there a family or team plan?',
      a: 'The Premium plan includes Family Sharing for up to 5 accounts, each with their own private dashboard and shared family budgets.',
    },
  ];

  const stats = [
    { value: '2.4M+', label: 'Active users worldwide' },
    { value: '$18B+', label: 'Transactions tracked' },
    { value: '10,000+', label: 'Banks connected' },
    { value: '4.9★', label: 'App Store rating' },
  ];

  const features = [
    { icon: <BarChart2 className="w-6 h-6" />, title: 'Smart Analytics', desc: 'Visualize spending patterns with interactive charts that update in real time.' },
    { icon: <Cpu className="w-6 h-6" />, title: 'AI Budgeting', desc: 'Gemini-powered assistant suggests budgets based on your actual habits.' },
    { icon: <CreditCard className="w-6 h-6" />, title: 'OCR Receipt Scan', desc: 'Snap a photo — transactions are parsed, categorised, and logged automatically.' },
    { icon: <RefreshCw className="w-6 h-6" />, title: 'Live Sync', desc: 'Bank balances and transactions refresh every 15 minutes across all accounts.' },
    { icon: <Bell className="w-6 h-6" />, title: 'Smart Alerts', desc: 'Get notified when you approach a budget limit or a large charge hits your account.' },
    { icon: <Lock className="w-6 h-6" />, title: 'Bank-Level Security', desc: 'AES-256 encryption and read-only bank access keeps your money completely safe.' },
  ];

  const testimonials = [
    {
      name: 'Rohan M.',
      role: 'Freelance Developer',
      image: '/image/bihari-kumar-rawat.jpeg',
      text: "I saved ₹40,000 in 3 months just by seeing where my money was going. The AI suggestions are scarily accurate.",
      plan: 'Pro',
    },
    {
      name: 'Marcus R.',
      role: 'Software Engineer',
      image: '/image/bihari-kumar-rawat1.jpeg',
      text: 'The crypto tracking alone is worth it. Everything in one dashboard — no more jumping between 5 apps.',
      plan: 'Premium',
    },
    {
      name: 'Amit V.',
      role: 'Startup Founder',
      image: '/image/bihari-kumar-rawat2.jpeg',
      text: 'Having my business and personal expenses separated automatically is a lifesaver. Best UI I have seen in a finance app.',
      plan: 'Premium',
    },
    {
      name: 'David L.',
      role: 'Entrepreneur',
      image: '/image/WhatsApp Image 2026-06-04 at 9.40.21 PM.jpeg',
      text: 'Bank-level security and clear charts gave me total confidence in managing my wealth. Absolutely recommended.',
      plan: 'Pro',
    },
    {
      name: 'Vikash S.',
      role: 'Crypto Investor',
      image: '/image/bihari-kumar-rawat.jpeg',
      text: "The portfolio analysis is incredibly fast and responsive. I've never used a tracker that feels this premium.",
      plan: 'Premium',
    },
    {
      name: 'Rahul K.',
      role: 'Content Creator',
      image: '/image/bihari-kumar-rawat1.jpeg',
      text: 'Managing sponsorships and daily expenses used to be a mess. Fintriq makes budgeting actually enjoyable!',
      plan: 'Pro',
    }
  ];

  const comparisonRows = [
    { feature: 'Bank accounts connected', basic: '2', pro: 'Unlimited', premium: 'Unlimited' },
    { feature: 'Monthly budgets', basic: '3', pro: 'Unlimited', premium: 'Unlimited' },
    { feature: 'Transaction history', basic: '3 months', pro: '2 years', premium: 'Unlimited' },
    { feature: 'OCR Receipt Scanning', basic: false, pro: true, premium: true },
    { feature: 'Crypto tracking', basic: false, pro: true, premium: true },
    { feature: 'AI Financial Assistant', basic: false, pro: false, premium: true },
    { feature: 'Family sharing (5 accounts)', basic: false, pro: false, premium: true },
    { feature: 'PDF / Excel export', basic: false, pro: false, premium: true },
    { feature: 'Priority 24/7 support', basic: false, pro: false, premium: true },
    { feature: 'Predictive budgeting', basic: false, pro: false, premium: true },
  ];

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden pt-[60px]"
      style={{ background: '#F6F8FA', color: '#283139' }}
    >
      <Navbar />
      {/* ─── HERO / HEADER ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Background blobs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 900,
            height: 500,
            background:
              'radial-gradient(circle at 50% 30%, rgba(18,196,139,0.18) 0%, rgba(64,195,249,0.10) 55%, transparent 80%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border"
            style={{
              background: 'rgba(18,196,139,0.10)',
              color: '#0D9B6E',
              borderColor: 'rgba(18,196,139,0.25)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Simple, transparent pricing
          </div>

          <h1
            className="text-5xl sm:text-6xl font-black leading-tight tracking-tight mb-5"
            style={{ color: '#0E1A22' }}
          >
            Every rupee{' '}
            <span
              className="relative"
              style={{
                backgroundImage: 'linear-gradient(90deg,#12C48B,#40C3F9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              accounted for
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#4A5560' }}>
            Join 2.4 million people who track, plan, and grow their wealth with Fintriq.
            Start free — no credit card needed.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className="text-sm font-bold"
              style={{ color: !isAnnual ? '#0E1A22' : '#A0ADB6' }}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Toggle billing period"
              style={{
                position: 'relative',
                width: 56,
                height: 30,
                borderRadius: 99,
                background: '#12C48B',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  left: isAnnual ? 29 : 3,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                  transition: 'left 0.2s',
                }}
              />
            </button>
            <span
              className="text-sm font-bold flex items-center gap-2"
              style={{ color: isAnnual ? '#0E1A22' : '#A0ADB6' }}
            >
              Annually
              <span
                className="text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{ background: '#D1FAE5', color: '#0A7A50' }}
              >
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: PRICING CARDS ──────────────────────────────── */}
      <section className="relative px-4 pb-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Basic */}
          <PlanCard
            name="Basic"
            tagline="For individuals starting out."
            price="$0"
            period="/ forever"
            ctaLabel="Start for free"
            ctaHref="/signup"
            accent="#6B7280"
            ctaStyle="outline"
            features={[
              'Manual transaction tracking',
              '2 connected bank accounts',
              'Up to 3 monthly budgets',
              'Basic charts & analytics',
            ]}
            missing={['AI Financial Assistant', 'OCR Receipt Scanning', 'Crypto tracking']}
          />

          {/* Pro — featured */}
          <PlanCard
            name="Pro"
            tagline="For serious wealth builders."
            price={isAnnual ? '$4.99' : '$5.99'}
            period="/ month"
            annualNote={isAnnual ? 'Billed $59.88 / year' : null}
            ctaLabel="Start 14-day free trial"
            ctaHref="/signup"
            accent="#12C48B"
            badge="Most popular"
            ctaStyle="primary"
            featured
            features={[
              'Everything in Basic',
              'Unlimited bank connections',
              'Unlimited budgets & goals',
              'OCR Receipt Scanning',
              'Advanced Crypto Tracking',
              'Custom categories & tags',
              '2-year transaction history',
            ]}
          />

          {/* Premium */}
          <PlanCard
            name="Premium"
            tagline="For families and power users."
            price={isAnnual ? '$9.99' : '$11.99'}
            period="/ month"
            annualNote={isAnnual ? 'Billed $119.88 / year' : null}
            ctaLabel="Get Premium"
            ctaHref="/signup"
            accent="#FFC053"
            ctaStyle="gold"
            features={[
              'Everything in Pro',
              'AI Financial Assistant',
              'Family Sharing (5 accounts)',
              'PDF / Excel Exporting',
              'Predictive Budgeting',
              'Unlimited history',
              'Priority 24/7 Support',
            ]}
          />
        </div>
      </section>

      {/* ─── SECTION 2: STATS BAR ──────────────────────────────────── */}
      <section
        style={{
          background: '#F0F7F4',
          padding: '64px 16px',
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="text-4xl font-black mb-1"
                style={{ color: '#12C48B' }}
              >
                {s.value}
              </div>
              <div className="text-sm font-medium" style={{ color: '#283139' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 3: FEATURE GRID ───────────────────────────────── */}
      <section className="py-28 px-4 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="What you get"
          title="Built around how you actually spend"
          sub="Every feature is designed to save you time, surface insights, and keep your money where it belongs."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl p-7 border transition-all duration-300"
              style={{
                background: '#fff',
                borderColor: '#E5ECF0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(18,196,139,0.12)';
                e.currentTarget.style.borderColor = '#A8EDD5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#E5ECF0';
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(18,196,139,0.10)', color: '#12C48B' }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#0E1A22' }}>
                {f.title}
              </h3>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4A5560' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4: COMPARISON TABLE ───────────────────────────── */}
      <section
        className="py-28 px-4"
        style={{ background: 'linear-gradient(180deg,#F0F7F4 0%,#F6F8FA 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Compare plans"
            title="Pick what fits you"
            sub="Side-by-side so you know exactly what you're getting."
          />
          <div
            className="mt-14 rounded-3xl overflow-hidden border"
            style={{ borderColor: '#DCE8E2', background: '#fff' }}
          >
            {/* Header */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: '1fr repeat(3, 130px)',
                background: '#F6F8FA',
                padding: '20px 28px',
                borderBottom: '1px solid #E5ECF0',
              }}
            >
              <div />
              {['Basic', 'Pro', 'Premium'].map((p, i) => (
                <div key={p} className="text-center">
                  <div
                    className="text-sm font-black uppercase tracking-widest"
                    style={{
                      color: ['#8FA3B0', '#12C48B', '#FFC053'][i],
                    }}
                  >
                    {p}
                  </div>
                </div>
              ))}
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className="grid items-center"
                style={{
                  gridTemplateColumns: '1fr repeat(3, 130px)',
                  padding: '14px 28px',
                  background: i % 2 === 0 ? '#fff' : '#F8FBFA',
                  borderBottom: i < comparisonRows.length - 1 ? '1px solid #EEF3F1' : 'none',
                }}
              >
                <span className="text-sm font-medium" style={{ color: '#283139' }}>
                  {row.feature}
                </span>
                {[row.basic, row.pro, row.premium].map((val, j) => (
                  <div key={j} className="text-center">
                    {typeof val === 'boolean' ? (
                      val ? (
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                          style={{ background: 'rgba(18,196,139,0.12)' }}
                        >
                          <Check className="w-3.5 h-3.5" style={{ color: '#12C48B' }} />
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                          style={{ background: '#F3F5F6' }}
                        >
                          <X className="w-3.5 h-3.5" style={{ color: '#C2CBD1' }} />
                        </span>
                      )
                    ) : (
                      <span className="text-sm font-semibold" style={{ color: '#283139' }}>
                        {val}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: TESTIMONIALS ───────────────────────────────── */}
      <section className="py-28 px-4 max-w-6xl mx-auto overflow-hidden">
        <SectionHeading
          eyebrow="Real stories"
          title="People who changed how they bank"
          sub="Not marketing copy — actual things our users told us."
        />
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-100% - 28px)); }
            }
            .animate-marquee {
              animation: marquee 35s linear infinite;
            }
            .marquee-container:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="relative mt-14 overflow-hidden rounded-3xl pb-8 marquee-container flex gap-7">
          <div className="flex gap-7 animate-marquee min-w-max">
            {testimonials.map((t, idx) => (
              <div
                key={`t1-${idx}`}
                className="rounded-3xl p-8 border flex flex-col shrink-0 w-[320px] md:w-[380px]"
                style={{
                  background: '#fff',
                  borderColor: '#E5ECF0',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: '#FFC053' }}
                    />
                  ))}
                </div>
                <p
                  className="text-[15px] leading-relaxed flex-1 mb-6"
                  style={{ color: '#4A5560' }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#12C48B]">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#0E1A22' }}>
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: '#8FA3B0' }}>
                      {t.role} · {t.plan} Plan
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-7 animate-marquee min-w-max" aria-hidden="true">
            {testimonials.map((t, idx) => (
              <div
                key={`t2-${idx}`}
                className="rounded-3xl p-8 border flex flex-col shrink-0 w-[320px] md:w-[380px]"
                style={{
                  background: '#fff',
                  borderColor: '#E5ECF0',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: '#FFC053' }}
                    />
                  ))}
                </div>
                <p
                  className="text-[15px] leading-relaxed flex-1 mb-6"
                  style={{ color: '#4A5560' }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#12C48B]">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#0E1A22' }}>
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: '#8FA3B0' }}>
                      {t.role} · {t.plan} Plan
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FAQ ────────────────────────────────────────── */}
      <section
        className="py-28 px-4"
        style={{ background: '#F0F7F4' }}
      >
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Got questions?"
            title="Frequently asked"
            sub="If it's not here, our support team replies in under 2 hours."
          />
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: '#fff',
                  borderColor: openFaq === i ? '#A8EDD5' : '#E5ECF0',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span className="text-[15px] font-bold" style={{ color: '#0E1A22' }}>
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 shrink-0" style={{ color: '#12C48B' }} />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0" style={{ color: '#A0ADB6' }} />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-[15px] leading-relaxed" style={{ color: '#4A5560' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FINAL CTA ──────────────────────────────────── */}
      <section
        className="py-28 px-4 text-center relative overflow-hidden"
        style={{ background: '#fff' }}
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border"
            style={{
              background: 'rgba(18,196,139,0.12)',
              color: '#0D9B6E',
              borderColor: 'rgba(18,196,139,0.25)',
            }}
          >
            <Gift className="w-3.5 h-3.5" />
            14 days free, no card required
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black leading-tight mb-5"
            style={{ color: '#0E1A22' }}
          >
            Start tracking in{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg,#12C48B,#40C3F9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              60 seconds
            </span>
          </h2>
          <p className="text-lg mb-10" style={{ color: '#4A5560' }}>
            Connect your first bank account in under a minute. Your dashboard is ready immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-2xl transition-all"
              style={{
                background: '#12C48B',
                color: '#fff',
                boxShadow: '0 6px 24px rgba(18,196,139,0.4)',
                textDecoration: 'none',
              }}
            >
              Try Pro free for 14 days <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-2xl border transition-all"
              style={{
                background: 'transparent',
                color: '#283139',
                borderColor: '#DCE8E2',
                textDecoration: 'none',
              }}
            >
              View live demo
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: '#8FA3B0' }}>
            Trusted by 2.4M users · Cancel anytime · AES-256 encrypted
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── Reusable Sub-components ───────────────────────────────────────── */

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <div
        className="inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
        style={{ background: 'rgba(18,196,139,0.12)', color: '#0D9B6E' }}
      >
        {eyebrow}
      </div>
      <h2
        className="text-3xl sm:text-4xl font-black leading-tight mb-4"
        style={{ color: '#0E1A22' }}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-[17px] leading-relaxed" style={{ color: '#4A5560' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function PlanCard({
  name, tagline, price, period, annualNote,
  ctaLabel, ctaHref, accent, badge, ctaStyle,
  featured, features, missing,
}) {
  const baseCard = {
    borderRadius: 28,
    padding: '36px 32px',
    border: `1.5px solid ${featured ? accent + '55' : '#E5ECF0'}`,
    background: featured ? '#0E1A22' : '#fff',
    boxShadow: featured
      ? '0 20px 60px rgba(14,26,34,0.35)'
      : '0 1px 6px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transform: featured ? 'translateY(-10px)' : 'none',
  };

  const ctaBg = {
    primary: { background: accent, color: '#fff', border: 'none' },
    outline: { background: 'transparent', color: '#283139', border: `1.5px solid #D1D9DF` },
    gold: { background: 'transparent', color: '#283139', border: `1.5px solid ${accent}` },
  }[ctaStyle];

  return (
    <div style={baseCard}>
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: accent,
          borderRadius: '28px 28px 0 0',
        }}
      />

      {badge && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: accent,
            color: '#fff',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 14px',
            borderRadius: '0 26px 0 14px',
          }}
        >
          {badge}
        </div>
      )}

      <div style={{ marginBottom: 28, marginTop: 8 }}>
        <h3
          className="text-2xl font-black mb-1"
          style={{ color: featured ? '#fff' : '#0E1A22' }}
        >
          {name}
        </h3>
        <p
          className="text-sm font-medium"
          style={{
            color: featured ? '#8FA3B0' : '#6B7280',
            minHeight: 40,
          }}
        >
          {tagline}
        </p>
        <div className="flex items-baseline gap-1 mt-5">
          <span
            className="text-5xl font-black"
            style={{ color: featured ? '#fff' : '#0E1A22' }}
          >
            {price}
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: featured ? '#6B8899' : '#9CA3AF' }}
          >
            {period}
          </span>
        </div>
        {annualNote && (
          <p className="text-xs font-semibold mt-1" style={{ color: accent }}>
            {annualNote}
          </p>
        )}
      </div>

      <a
        href={ctaHref}
        className="w-full text-center font-bold py-3.5 rounded-xl transition-all mb-8 flex items-center justify-center gap-2"
        style={{
          ...ctaBg,
          borderRadius: 14,
          fontSize: 14,
          textDecoration: 'none',
          boxShadow:
            ctaStyle === 'primary'
              ? `0 4px 16px ${accent}55`
              : 'none',
        }}
      >
        {ctaLabel} <ArrowRight className="w-4 h-4" />
      </a>

      <div className="flex-1">
        <p
          className="text-xs font-black uppercase tracking-widest mb-4"
          style={{ color: featured ? '#5A7080' : '#9CA3AF' }}
        >
          What's included
        </p>
        <ul className="space-y-3">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-sm font-medium"
              style={{ color: featured ? '#C8D8E0' : '#4A5560' }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: accent + '22' }}
              >
                <Check className="w-3 h-3" style={{ color: accent }} />
              </span>
              {f}
            </li>
          ))}
          {missing?.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-sm font-medium"
              style={{ color: '#C2CBD1' }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: '#F3F5F6' }}
              >
                <X className="w-3 h-3" style={{ color: '#C2CBD1' }} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}