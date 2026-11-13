// PROPOSTA 01 — CORPORATIVA PREMIUM
import { useState, type ReactNode } from 'react'
import { Menu, X, ArrowRight, Phone, ShieldCheck, Plug } from 'lucide-react'
import { media } from '../data/vehicles'
import { hero, sections, numbers, numbersNote, footer, nav, solutions, segments, howItWorks, trust, integrations } from '../data/content'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { Credit, Logo, Reveal, CountUp, PLink, BrandVideo, type Skin } from '../shared/ui'
import { Screen, DashboardScreen } from '../shared/screens'
import { CtaBand } from '../shared/pages'
import { Crumbs, Dropdown, menuGroups } from './common'

const Grafismo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} aria-hidden preserveAspectRatio="none">
    <polygon points="0,0 400,0 400,300" fill="#2b2d8b" />
    <polygon points="230,0 400,0 400,170" fill="#374ea1" />
    <polygon points="0,300 140,300 0,160" fill="#66c18c" />
  </svg>
)

function PageHeader({ eyebrow, title, text, crumbs }: Parameters<Skin['PageHeader']>[0]) {
  return (
    <header className="relative overflow-hidden border-b border-[rgb(var(--line))] bg-white">
      <svg className="absolute -right-10 top-0 hidden h-full w-[380px] md:block" viewBox="0 0 380 200" preserveAspectRatio="none" aria-hidden>
        <polygon points="120,0 380,0 380,200" fill="#0d013a" opacity=".04" />
        <polygon points="300,0 380,0 380,90" fill="#66c18c" opacity=".55" />
      </svg>
      <div className="wrap relative py-12 md:py-16">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-light tracking-tight md:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{text}</p>}
      </div>
    </header>
  )
}

function SectionHead({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={cx('mb-12 max-w-2xl', center && 'mx-auto text-center')}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-light tracking-tight md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-[15px] text-muted">{text}</p>}
    </div>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { user } = useStore()
  const [menu, setMenu] = useState(false)
  const link = 'text-[12px] font-medium uppercase tracking-[0.14em] text-muted transition hover:text-ink'
  return (
    <>
      <div className="bg-[#0d013a] text-[12px] text-white/70">
        <div className="wrap flex h-9 items-center justify-between">
          <span className="hidden sm:block">{hero.eyebrow}</span>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-1.5 md:flex"><Phone size={12} /> (11) 4000-2121</span>
            <PLink to="faq" className="hover:text-white">Ajuda</PLink>
            <PLink to="login" className="text-white hover:text-[#66c18c]">{user ? `Olá, ${user.name.split(' ')[0]}` : nav.login.label}</PLink>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--line))] bg-white/95 backdrop-blur">
        <div className="wrap flex h-20 items-center justify-between gap-6">
          <PLink to="" className="shrink-0"><Logo className="h-11" /></PLink>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {menuGroups.map((g) => <Dropdown key={g.label} group={g} triggerClass={cx(link, 'flex items-center gap-1.5 py-7')} panelClass="border border-[rgb(var(--line))] bg-white shadow-[0_24px_50px_-20px_rgba(13,1,58,.3)]" itemClass="hover:bg-[#f7f6f3]" descClass="text-muted" iconClass="text-[#2b2d8b]" />)}
            {nav.main.map((n) => <PLink key={n.to} to={n.to} className={link}>{n.label}</PLink>)}
          </nav>
          <div className="flex items-center gap-2">
            <PLink to={nav.cta.to} className="btn btn-primary hidden md:inline-flex">{nav.cta.label}</PLink>
            <button onClick={() => setMenu(true)} className="btn btn-ghost h-11 w-11 p-0 lg:hidden" aria-label="Abrir menu"><Menu size={20} /></button>
          </div>
        </div>
      </header>
      {menu && (
        <div className="fade-in fixed inset-0 z-50 overflow-auto bg-[#0d013a] text-white lg:hidden">
          <div className="wrap flex h-20 items-center justify-between"><Logo tone="white" className="h-10" /><button onClick={() => setMenu(false)} aria-label="Fechar menu"><X /></button></div>
          <nav className="wrap mt-4 pb-10">
            {menuGroups.map((g) => <div key={g.label} className="border-b border-white/10 py-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/45">{g.label}</p>{g.items.map((i) => <PLink key={i.to} to={i.to} onClick={() => setMenu(false)} className="block py-2 text-lg font-light">{i.label}</PLink>)}</div>)}
            {[...nav.main, nav.login].map((n) => <PLink key={n.to} to={n.to} onClick={() => setMenu(false)} className="block border-b border-white/10 py-4 text-xl font-light">{n.label}</PLink>)}
            <PLink to={nav.cta.to} onClick={() => setMenu(false)} className="btn btn-accent mt-6 w-full">{nav.cta.label}</PLink>
          </nav>
        </div>
      )}
      <main>{children}</main>
      <footer className="relative mt-24 overflow-hidden bg-[#0d013a] text-white">
        <Grafismo className="pointer-events-none absolute -right-24 -top-10 h-[360px] w-[480px] opacity-60" />
        <div className="wrap relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div><Logo tone="white" className="h-12" /><p className="mt-6 max-w-xs text-sm text-white/60">{footer.tagline}</p></div>
          {footer.columns.map((c) => (
            <div key={c.title}><p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{c.title}</p><ul className="mt-4 space-y-2.5 text-sm">{c.links.map((l) => <li key={l.label}><PLink to={l.to} className="text-white/80 hover:text-[#66c18c]">{l.label}</PLink></li>)}</ul></div>
          ))}
        </div>
        <div className="wrap relative border-t border-white/10 py-6 text-xs text-white/45">{footer.legal} <Credit className="ml-1" /></div>
      </footer>
    </>
  )
}

function Home() {
  const [active, setActive] = useState(0)
  const sol = solutions[active]
  const segImgs = [media('tiggo7-hero.webp'), media('explorer-hero.webp'), media('fastback-hero.webp')]
  return (
    <>
      <section className="relative overflow-hidden bg-[#0d013a] text-white">
        <img src={media('tiggo7-hero.webp')} alt="" className="kenburns absolute inset-0 h-full w-full object-cover object-[80%_center] opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d013a] via-[#0d013a]/90 to-[#0d013a]/40" />
        <svg className="absolute bottom-0 left-0 h-40 w-64" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden><polygon points="0,60 0,0 70,60" fill="#66c18c" /></svg>
        <div className="wrap relative grid items-center gap-14 pb-36 pt-20 lg:grid-cols-[1fr_1.1fr] lg:pt-24">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#66c18c]">{hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-4xl font-light leading-[1.1] tracking-tight md:text-[52px]">{hero.title}</h1>
            <p className="mt-6 max-w-xl text-base font-light text-white/75">{hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PLink to="contato" className="btn btn-accent">{hero.primaryCta}</PLink>
              <a href="#solucoes" onClick={(e) => (e.preventDefault(), document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' }))} className="btn border border-white/30 text-white hover:bg-white/10">{hero.secondaryCta}</a>
            </div>
          </div>
          <Reveal><DashboardScreen /></Reveal>
        </div>
      </section>

      <section className="wrap relative z-10 -mt-12">
        <div className="grid grid-cols-2 border border-[rgb(var(--line))] bg-white shadow-[0_30px_60px_-30px_rgba(13,1,58,.3)] md:grid-cols-4">
          {numbers.map((k, i) => (
            <div key={k.label} className={cx('p-7', i > 0 && 'md:border-l', i % 2 === 1 && 'border-l', i > 1 && 'border-t md:border-t-0', 'border-[rgb(var(--line))]')}>
              <p className="font-display text-4xl font-light"><CountUp {...k} /></p>
              <p className="mt-1 text-sm text-muted">{k.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">{numbersNote}</p>
      </section>

      <section id="solucoes" className="wrap scroll-mt-28 py-24">
        <SectionHead eyebrow={sections.solutions.eyebrow} title={sections.solutions.title} text={sections.solutions.text} />
        <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
          <div className="border-t border-[rgb(var(--line))]" role="tablist">
            {solutions.map((s, k) => {
              const I = s.icon
              return (
                <button key={s.slug} role="tab" aria-selected={active === k} onClick={() => setActive(k)} className={cx('relative w-full border-b border-[rgb(var(--line))] py-5 pl-6 text-left transition', active === k ? 'bg-white' : 'hover:bg-white/60')}>
                  <span className={cx('absolute inset-y-0 left-0 w-[3px] transition', active === k ? 'bg-[#66c18c]' : 'bg-transparent')} />
                  <span className="flex items-center gap-3"><I size={18} className={active === k ? 'text-[#2b2d8b]' : 'text-muted'} /><span className="font-medium">{s.name}</span></span>
                  {active === k && <span className="fade-in mt-2 block pr-4 text-sm text-muted">{s.short}</span>}
                </button>
              )
            })}
          </div>
          <div key={sol.slug} className="page-enter">
            <div className={sol.screen === 'evaluation' ? 'flex justify-center bg-white py-8' : ''}><Screen id={sol.screen} /></div>
            <PLink to={`solucoes/${sol.slug}`} className="mt-6 inline-flex items-center gap-2 border-b border-[#0d013a] pb-1 text-[12px] font-medium uppercase tracking-[0.14em]">Conhecer {sol.name} <ArrowRight size={14} /></PLink>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0d013a]">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-video lg:aspect-auto lg:min-h-[460px]">
            <BrandVideo className="absolute inset-0 h-full w-full object-cover" controlsClass="absolute bottom-5 left-5" />
          </div>
          <div className="flex flex-col justify-center p-10 text-white md:p-16">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#66c18c]">Procedência</p>
            <h2 className="mt-3 font-display text-3xl font-light md:text-4xl">{sections.video.title}</h2>
            <p className="mt-4 max-w-md text-white/70">{sections.video.text}</p>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <SectionHead eyebrow={sections.segments.eyebrow} title={sections.segments.title} text={sections.segments.text} />
        <div className="grid gap-8 md:grid-cols-3">
          {segments.map((s, k) => (
            <Reveal key={s.slug} delay={k * 90}>
              <PLink to={`para/${s.slug}`} className="group block border border-[rgb(var(--line))] bg-white transition hover:shadow-[0_18px_40px_-24px_rgba(13,1,58,.35)]">
                <div className="img-zoom aspect-[16/10] overflow-hidden bg-[#0d013a]"><img src={segImgs[k]} alt="" className="h-full w-full object-cover opacity-90" /></div>
                <div className="p-7">
                  <p className="font-display text-2xl font-light">{s.name}</p>
                  <p className="mt-2 text-sm text-muted">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em]">Saiba mais <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
                </div>
              </PLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgb(var(--line))] bg-white py-24">
        <div className="wrap">
          <SectionHead eyebrow={sections.how.eyebrow} title={sections.how.title} text={sections.how.text} />
          <ol className="grid gap-10 md:grid-cols-4">
            {howItWorks.map((s, k) => (
              <Reveal as="li" key={s.step} delay={k * 90} className="border-t-2 border-[#0d013a] pt-6">
                <p className="num font-display text-5xl font-light text-[#66c18c]">{s.step}</p>
                <p className="mt-4 font-display text-xl">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap grid gap-16 py-24 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow={sections.trust.eyebrow} title={sections.trust.title} />
          <div className="grid gap-8 sm:grid-cols-2">{trust.map((t) => <div key={t.title}><ShieldCheck size={20} className="text-[#2b2d8b]" /><p className="mt-3 font-medium">{t.title}</p><p className="mt-1 text-sm text-muted">{t.text}</p></div>)}</div>
        </div>
        <div>
          <SectionHead eyebrow="Integrações" title="Conectado aos sistemas da sua operação" />
          <div className="grid grid-cols-2 border-l border-t border-[rgb(var(--line))]">{integrations.map((i) => <div key={i} className="flex items-center gap-3 border-b border-r border-[rgb(var(--line))] bg-white p-5 text-sm"><Plug size={15} className="text-[#66c18c]" />{i}</div>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export default { Layout, Home, PageHeader }
