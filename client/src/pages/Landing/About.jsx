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
function ValueCardLight({ icon: Icon, color, title, desc }) {
  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      borderRadius: 24, padding: '32px 28px',
      transition: 'box-shadow 0.2s, border-color 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(18,196,139,0.12)'; e.currentTarget.style.borderColor = '#A8EDD5'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = C.border; }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <Icon size={24} color={color} />
      </div>
      <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 17, color: C.ink }}>{title}</p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: C.muted }}>{desc}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

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
      paddingTop: 60,
    }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        padding: '120px 24px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 500, pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 30%, rgba(18,196,139,0.18) 0%, rgba(64,195,249,0.10) 55%, transparent 80%)',
          filter: 'blur(60px)',
        }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            color: C.ink, margin: '0 0 22px',
          }}>
            Your money,{' '}
            <span style={{
              backgroundImage: `linear-gradient(90deg, ${C.mint}, ${C.sky})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>finally</span>{' '}under control
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.7, color: C.muted, maxWidth: 540, margin: '0 auto 36px' }}>
            Fintriq brings every account, budget, and investment into one beautifully clear view — so smart financial decisions become second nature.
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
              background: 'transparent',
              border: `1px solid ${C.border}`,
              color: C.slate, fontWeight: 600, fontSize: 16,
              padding: '15px 32px', borderRadius: 16, textDecoration: 'none',
            }}>
              Explore features
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────── */}
      <section style={{
        background: '#F0F7F4',
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
              <div style={{ fontSize: 13, fontWeight: 500, color: C.slate }}>{s.label}</div>
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
              Most people have no idea where their money actually goes. We built Fintriq to fix that — pulling every account, card, investment, and subscription into a single, honest picture. No jargon, no guesswork.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted, margin: 0 }}>
              We're a team of engineers, designers, and financial planners who got tired of juggling five apps to understand one bank account. So we built the tool we wished existed.
            </p>
          </div>

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


      {/* ── HOW IT WORKS ────────── */}
      <section style={{ padding: '100px 24px', background: '#F6F8FA' }}>
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

      {/* ── OUR VALUES ───────────────── */}
      <section style={{ background: '#fff', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <SectionHeading
              eyebrow="What we stand for"
              title="Values we don't compromise on"
              sub="These aren't marketing copy — they're the decisions we make every day."
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            <ValueCardLight icon={Lock}          color={C.sky}     title="Privacy-first, always"   desc="Your data is never sold. Never shared with advertisers. Your finances belong to you, and only you." />
            <ValueCardLight icon={BadgeCheck}    color={C.mint}    title="Radical transparency"    desc="No hidden fees, no dark patterns, no surprise charges. What you see is exactly what you pay." />
            <ValueCardLight icon={HeartHandshake} color={C.gold}   title="People over metrics"     desc="We measure success by how much money you save, not by how long you spend in the app." />
            <ValueCardLight icon={Lightbulb}     color="#A78BFA"   title="Insight over information" desc="We don't dump data on you. We surface the one thing that actually changes your financial behaviour." />
          </div>
        </div>
      </section>

    </div>
  );
}