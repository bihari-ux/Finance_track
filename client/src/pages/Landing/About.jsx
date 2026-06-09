import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/layouts/Navbar';
import {
  Shield, Zap, TrendingUp, Users, Star,
  ArrowRight, BarChart2, Lock, Globe, Smartphone, Bell,
  RefreshCw, CreditCard, PieChart, Target, Award, ChevronDown,
  ChevronUp, Sparkles, Gift, Cpu, CheckCircle, HeartHandshake,
  Lightbulb, BadgeCheck, Timer, Wallet
} from 'lucide-react';

// ─── Design Tokens (matching Pricing page exactly) ───────────────
const C = {
  mint:    '#12C48B',
  mintD:   '#0fa876',
  mintBg:  'rgba(18,196,139,0.10)',
  sky:     '#40C3F9',
  gold:    '#FFC053',
  ink:     '#0E1A22',
  inkD:    '#1A2D3A',
  slate:   '#283139',
  muted:   '#4A5560',
  soft:    '#8FA3B0',
  bg:      '#F6F8FA',
  bgCard:  '#FFFFFF',
  border:  '#E5ECF0',
  green50: '#D1FAE5',
  green700:'#0A7A50',
};

// ─── Animated Counter ─────────────────────────────────────────────
function Counter({ to, prefix = '', suffix = '', duration = 1800, isFloat = false }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(isFloat ? (ease * to).toFixed(1) : Math.round(ease * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{isFloat ? val : Number(val).toLocaleString()}{suffix}</span>;
}

// ─── Section Heading (exact match to Pricing) ─────────────────────
function SectionHeading({ eyebrow, title, sub, light = false }) {
  return (
    <div className="text-center" style={{ maxWidth: 560, margin: '0 auto' }}>
      <div style={{
        display: 'inline-block',
        fontSize: 11, fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        padding: '4px 14px', borderRadius: 99,
        background: light ? 'rgba(18,196,139,0.15)' : C.mintBg,
        color: light ? '#5FE3B5' : '#0D9B6E',
        marginBottom: 14,
      }}>{eyebrow}</div>
      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900,
        lineHeight: 1.12, letterSpacing: '-0.025em',
        color: light ? '#fff' : C.ink,
        margin: '0 0 16px',
      }}>{title}</h2>
      {sub && <p style={{ fontSize: 17, lineHeight: 1.7, color: light ? 'rgba(255,255,255,0.55)' : C.muted, margin: 0 }}>{sub}</p>}
    </div>
  );
}

// ─── Feature Card (matching Pricing's feature grid style) ─────────
function FeatureCard({ icon: Icon, iconColor, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.bgCard,
        border: `1.5px solid ${hovered ? '#A8EDD5' : C.border}`,
        borderRadius: 24, padding: '28px 26px',
        boxShadow: hovered ? '0 8px 30px rgba(18,196,139,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 0.25s',
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 16,
        background: `${iconColor}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 18,
      }}>
        <Icon size={22} color={iconColor} />
      </div>
      <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 16, color: C.ink }}>{title}</p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: C.muted }}>{desc}</p>
    </div>
  );
}

// ─── Testimonial Card (matching Pricing exactly) ──────────────────
function TestimonialCard({ quote, name, role, avatar, avatarColor, plan }) {
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 28, padding: '32px 28px',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={15} fill={C.gold} stroke={C.gold} />
        ))}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: '0 0 24px', flex: 1 }}>
        "{quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: '#fff',
        }}>{avatar}</div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: C.ink }}>{name}</p>
          <p style={{ margin: 0, fontSize: 12, color: C.soft }}>{role} · {plan} Plan</p>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline Step ────────────────────────────────────────────────
function TimelineStep({ number, icon: Icon, color, title, desc, isLast }) {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16,
          background: `${color}18`, border: `1.5px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} color={color} />
        </div>
        {!isLast && (
          <div style={{ width: 2, flex: 1, minHeight: 32, background: `linear-gradient(to bottom, ${color}40, transparent)`, marginTop: 8 }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 36 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: C.soft, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step {number}</span>
        <p style={{ margin: '4px 0 8px', fontSize: 18, fontWeight: 800, color: C.ink }}>{title}</p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: C.muted }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Values Card ──────────────────────────────────────────────────
function ValueCard({ icon: Icon, color, title, desc }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 24, padding: '32px 28px',
      transition: 'background 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(18,196,139,0.25)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: `${color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <Icon size={24} color={color} />
      </div>
      <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 17, color: '#fff' }}>{title}</p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'Is my financial data really secure?', a: 'Yes. We use AES-256 encryption at rest and TLS 1.3 in transit — the same standards used by global banks. We are SOC 2 Type II certified and undergo independent security audits twice a year.' },
    { q: 'Can I connect my bank accounts automatically?', a: 'Absolutely. We integrate with 12,000+ banks, credit unions, and brokerages worldwide through our secure Plaid and Finicity connections. Read-only access means we can never move your money.' },
    { q: 'What happens after my free trial ends?', a: "You'll be prompted to choose a plan. If you don't, your account automatically drops to the free Basic tier — you never lose your data." },
    { q: 'Does FinanceTracker+ work outside India?', a: 'Yes. We support 40+ countries and 60+ currencies with real-time exchange rates. Full bank connectivity in India (UPI, NEFT, IMPS), US, UK, Canada, and Australia.' },
    { q: 'Can I cancel my subscription anytime?', a: 'Always. Cancel in two clicks from your account settings — no phone calls, no retention flows. Any unused days are refunded pro-rata.' },
    { q: 'Do you sell my data to third parties?', a: 'Never. Your financial data is yours. We do not sell, rent, or share it with advertisers or third parties. Our business model is your subscription — full stop.' },
  ];

  const features = [
    { icon: BarChart2,   color: C.mint,    title: 'Spending Analytics',      desc: 'Visual breakdowns by category, week-over-week and month-over-month. Spot trends before they become problems.' },
    { icon: Target,      color: C.sky,     title: 'Goal Tracking',            desc: 'Set savings targets — house deposit, emergency fund, trip — and watch progress update automatically.' },
    { icon: Bell,        color: C.gold,    title: 'Smart Alerts',             desc: 'Get notified about unusual charges, upcoming bills, and budget overruns before they catch you off guard.' },
    { icon: Smartphone,  color: '#A78BFA', title: 'OCR Receipt Scanning',     desc: 'Photograph a receipt and we extract merchant, amount, date, and category in under two seconds.' },
    { icon: RefreshCw,   color: C.mint,    title: 'Subscription Manager',     desc: 'See every recurring charge in one list. Cancel the ones you forgot about in three taps.' },
    { icon: Lock,        color: C.sky,     title: 'Read-Only Bank Access',    desc: 'We connect via read-only APIs. We literally cannot move, transfer, or touch your funds — ever.' },
    { icon: PieChart,    color: C.gold,    title: 'Net Worth Dashboard',      desc: 'Assets minus liabilities, tracked daily. Watch your real wealth grow over months and years.' },
    { icon: CreditCard,  color: '#A78BFA', title: 'Crypto & Investments',     desc: 'Stocks, ETFs, crypto, and real estate in one portfolio view with live prices and allocation charts.' },
  ];

  const stats = [
    { label: 'Active users', to: 2400000, prefix: '', suffix: '+', isFloat: false },
    { label: 'Transactions tracked', to: 18, prefix: '$', suffix: 'B+', isFloat: false },
    { label: 'Banks connected', to: 12000, prefix: '', suffix: '+', isFloat: false },
    { label: 'Countries supported', to: 40, prefix: '', suffix: '+', isFloat: false },
    { label: 'App Store rating', to: 4.9, prefix: '', suffix: '★', isFloat: true },
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: C.bg,
      color: C.slate,
      overflowX: 'hidden',
      paddingTop: 88,
    }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{
        background: C.ink,
        padding: '120px 24px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Radial gradient blob — matching Pricing hero */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 500, pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 30%, rgba(18,196,139,0.18) 0%, rgba(64,195,249,0.10) 55%, transparent 80%)',
          filter: 'blur(60px)',
        }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Badge — exact Pricing style */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(18,196,139,0.10)',
            border: '1px solid rgba(18,196,139,0.25)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 28,
          }}>
            <Sparkles size={13} color={C.mint} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0D9B6E' }}>Trusted by 2.4M+ users worldwide</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900,
            lineHeight: 1.08, letterSpacing: '-0.03em',
            color: '#fff', margin: '0 0 22px',
          }}>
            Your money,{' '}
            <span style={{
              backgroundImage: `linear-gradient(90deg, ${C.mint}, ${C.sky})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>finally</span>{' '}under control
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: 540, margin: '0 auto 36px' }}>
            FinanceTracker+ brings every account, budget, and investment into one beautifully clear view — so smart financial decisions become second nature.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: C.mint, color: '#fff', fontWeight: 700, fontSize: 16,
              padding: '15px 32px', borderRadius: 16, textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(18,196,139,0.4)',
            }}>
              Get started free <ArrowRight size={18} />
            </a>
            <a href="#features" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: 16,
              padding: '15px 32px', borderRadius: 16, textDecoration: 'none',
            }}>
              Explore features
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR (matching Pricing's dark bar) ──────────── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.ink} 0%, ${C.inkD} 100%)`,
        padding: '64px 24px',
      }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 32, textAlign: 'center',
        }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 36, fontWeight: 900, color: C.mint, marginBottom: 6 }}>
                <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} isFloat={s.isFloat} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.soft }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: 1160, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 64, alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              padding: '4px 14px', borderRadius: 99,
              background: C.mintBg, color: '#0D9B6E', marginBottom: 16,
            }}>Our mission</div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900,
              lineHeight: 1.15, letterSpacing: '-0.02em',
              color: C.ink, margin: '0 0 22px',
            }}>
              Built to give you absolute clarity over money
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted, margin: '0 0 20px' }}>
              Most people have no idea where their money actually goes. We built FinanceTracker+ to fix that — pulling every account, card, investment, and subscription into a single, honest picture. No jargon, no guesswork.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted, margin: 0 }}>
              We're a team of engineers, designers, and financial planners who got tired of juggling five apps to understand one bank account. So we built the tool we wished existed.
            </p>
          </div>

          {/* Right column: 3 highlight rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: Shield,   color: C.sky,  title: 'Bank-grade security',        desc: 'AES-256 encryption at rest, TLS 1.3 in transit. SOC 2 Type II certified. We never sell your data — ever.' },
              { icon: Cpu,      color: C.gold, title: 'AI-powered categorisation',   desc: 'Every transaction is sorted into a meaningful budget category the moment it lands, powered by our fine-tuned model.' },
              { icon: Globe,    color: C.mint, title: 'Works anywhere in the world', desc: '12,000+ banks, 60+ currencies, real-time exchange rates. Your finances follow you wherever you go.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `${f.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <div>
                  <p style={{ margin: '0 0 5px', fontWeight: 700, fontSize: 16, color: C.ink }}>{f.title}</p>
                  <p style={{ margin: 0, fontSize: 15, color: C.muted, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID (dark section — matching Pricing dark stats) */}
      <section id="features" style={{ background: `linear-gradient(135deg, ${C.ink} 0%, ${C.inkD} 100%)`, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <SectionHeading
              light
              eyebrow="Everything you need"
              title="One app. Zero financial blind spots."
              sub="Every feature is designed to surface insights and keep your money where it belongs."
            />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
          }}>
            {features.map((f, i) => (
              <div key={i}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: '28px 24px',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(18,196,139,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${f.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 16, color: '#fff' }}>{f.title}</p>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (timeline — unique to About) ────────── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <SectionHeading
              eyebrow="How it works"
              title="Up and running in 60 seconds"
              sub="Four steps from signup to your first financial insight."
            />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0 48px',
          }}>
            {[
              { number: '01', icon: Users,      color: C.mint,    title: 'Create your account',  desc: 'Sign up in under 30 seconds. No credit card needed for the free plan.' },
              { number: '02', icon: Lock,        color: C.sky,     title: 'Connect your banks',   desc: 'Link checking, savings, credit cards, and investments with bank-grade security.' },
              { number: '03', icon: Zap,         color: C.gold,    title: 'Watch it populate',    desc: 'Transactions sync automatically. Categorisation happens without you lifting a finger.' },
              { number: '04', icon: TrendingUp,  color: '#A78BFA', title: 'Take control',         desc: 'Set budgets, build goals, and get insights that turn data into confident decisions.' },
            ].map((s, i, arr) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Connector line between steps */}
                {i < arr.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 24, left: 'calc(50% + 26px)',
                    width: 'calc(100% - 52px)', height: 1,
                    background: `linear-gradient(to right, ${s.color}40, transparent)`,
                    display: window.innerWidth > 768 ? 'block' : 'none',
                  }} />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: `${s.color}18`, border: `1.5px solid ${s.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <s.icon size={22} color={s.color} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: C.soft, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Step {s.number}
                    </span>
                    <p style={{ margin: '5px 0 8px', fontSize: 17, fontWeight: 800, color: C.ink }}>{s.title}</p>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: C.muted }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR VALUES (dark — unique section) ───────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${C.ink} 0%, #0D2B20 100%)`, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <SectionHeading
              light
              eyebrow="What we stand for"
              title="Values we don't compromise on"
              sub="These aren't marketing copy — they're the decisions we make every day."
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            <ValueCard icon={Lock}          color={C.sky}     title="Privacy-first, always"   desc="Your data is never sold. Never shared with advertisers. Your finances belong to you, and only you." />
            <ValueCard icon={BadgeCheck}    color={C.mint}    title="Radical transparency"    desc="No hidden fees, no dark patterns, no surprise charges. What you see is exactly what you pay." />
            <ValueCard icon={HeartHandshake} color={C.gold}   title="People over metrics"     desc="We measure success by how much money you save, not by how long you spend in the app." />
            <ValueCard icon={Lightbulb}     color="#A78BFA"   title="Insight over information" desc="We don't dump data on you. We surface the one thing that actually changes your financial behaviour." />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (matching Pricing exactly) ──────────── */}
      <section style={{ padding: '100px 24px', background: C.bg }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <SectionHeading
              eyebrow="Real stories"
              title="People who changed how they bank"
              sub="Not marketing copy — actual things our users told us."
            />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            <TestimonialCard
              quote="I saved ₹40,000 in 3 months just by seeing where my money was going. The AI suggestions are scarily accurate."
              name="Priya S." role="Freelance Designer" avatar="PS" avatarColor={C.mint} plan="Pro"
            />
            <TestimonialCard
              quote="The crypto tracking alone is worth it. Everything in one dashboard — no more jumping between 5 different apps."
              name="Marcus R." role="Software Engineer" avatar="MR" avatarColor={C.sky} plan="Premium"
            />
            <TestimonialCard
              quote="Family sharing changed how we budget together. Each person sees their own spending, shared goals are crystal clear."
              name="Anita K." role="Family of 4" avatar="AK" avatarColor={C.gold} plan="Premium"
            />
          </div>
        </div>
      </section>

      {/* ── COMPARISON: Why FinanceTracker+ (unique to About) ── */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(180deg,#F0F7F4 0%,#F6F8FA 100%)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <SectionHeading
              eyebrow="Why us"
              title="What makes us different"
              sub="There are hundreds of finance apps. Here's why 2.4M people chose us."
            />
          </div>
          <div style={{
            background: C.bgCard,
            border: `1px solid ${C.border}`,
            borderRadius: 24,
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 140px 140px',
              background: C.ink, padding: '18px 28px',
              gap: 8,
            }}>
              <div />
              {['Others', 'FinanceTracker+'].map((label, i) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <span style={{
                    fontSize: 12, fontWeight: 800,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: i === 0 ? C.soft : C.mint,
                  }}>{label}</span>
                </div>
              ))}
            </div>

            {[
              ['Read-only bank access (can\'t move funds)', false, true],
              ['Zero ads, zero data selling', false, true],
              ['Works in 40+ countries', false, true],
              ['Family sharing included', false, true],
              ['AI-powered auto-categorisation', false, true],
              ['Free plan available forever', false, true],
              ['Pro-rata refunds on cancellation', false, true],
            ].map(([feature, others, us], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 140px 140px',
                padding: '14px 28px', gap: 8,
                background: i % 2 === 0 ? C.bgCard : '#F8FBFA',
                borderBottom: i < 6 ? `1px solid #EEF3F1` : 'none',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: C.slate }}>{feature}</span>
                {[others, us].map((val, j) => (
                  <div key={j} style={{ textAlign: 'center' }}>
                    {val
                      ? <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'rgba(18,196,139,0.12)' }}>
                          <CheckCircle size={14} color={C.mint} />
                        </span>
                      : <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: '#F3F5F6' }}>
                          <span style={{ width: 8, height: 2, background: '#C2CBD1', borderRadius: 2, display: 'block' }} />
                        </span>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', background: '#F0F7F4' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <SectionHeading
              eyebrow="Got questions?"
              title="Frequently asked"
              sub="If it's not here, our support team replies in under 2 hours."
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: C.bgCard,
                border: `1px solid ${openFaq === i ? '#A8EDD5' : C.border}`,
                borderRadius: 18, overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', padding: '20px 24px',
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.ink, paddingRight: 16 }}>{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={18} color={C.mint} style={{ flexShrink: 0 }} />
                    : <ChevronDown size={18} color={C.soft} style={{ flexShrink: 0 }} />
                  }
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px' }}>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: C.muted }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (exact match to Pricing) ───────────────── */}
      <section style={{
        padding: '112px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${C.ink} 0%, #0D2B20 100%)`,
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(18,196,139,0.25) 0%, transparent 65%)',
        }} />
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(18,196,139,0.12)',
            border: '1px solid rgba(18,196,139,0.25)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 24,
          }}>
            <Gift size={13} color="#5FE3B5" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#5FE3B5' }}>14 days free, no card required</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900,
            lineHeight: 1.1, color: '#fff',
            margin: '0 0 18px', letterSpacing: '-0.03em',
          }}>
            Start tracking in{' '}
            <span style={{
              backgroundImage: `linear-gradient(90deg, ${C.mint}, ${C.sky})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>60 seconds</span>
          </h2>

          <p style={{ fontSize: 18, color: C.soft, margin: '0 auto 40px', maxWidth: 440 }}>
            Connect your first bank account in under a minute. Your dashboard is ready immediately.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: C.mint, color: '#fff', fontWeight: 700, fontSize: 16,
              padding: '15px 32px', borderRadius: 16, textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(18,196,139,0.4)',
            }}>
              Try Pro free for 14 days <ArrowRight size={18} />
            </a>
            <a href="/pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontWeight: 600, fontSize: 16,
              padding: '15px 32px', borderRadius: 16, textDecoration: 'none',
            }}>
              View pricing
            </a>
          </div>

          <p style={{ marginTop: 24, fontSize: 13, color: '#5A7080' }}>
            Trusted by 2.4M users · Cancel anytime · AES-256 encrypted
          </p>
        </div>
      </section>
    </div>
  );
}