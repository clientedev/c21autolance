// PROPOSTA 03 — TECNOLÓGICA E CONTEMPORÂNEA
import { useState, type ReactNode } from 'react'
import { Menu, X, ArrowUpRight, ArrowRight, Activity, Plug, ShieldCheck } from 'lucide-react'
import { hero, sections, numbers, numbersNote, footer, nav, solutions, segments, howItWorks, trust, integrations } from '../data/content'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { Logo, Reveal, CountUp, PLink, BrandVideo, type Skin } from '../shared/ui'
import { Screen, DashboardScreen, EvaluationScreen, IntelScreen } from '../shared/screens'
import { CtaBand } from '../shared/pages'
import { Crumbs, Dropdown, menuGroups } from './common'

const Planes = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
    <defs><pattern id="g3" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" strokeOpacity=".045" /></pattern></defs>
    <rect width="1200" height="800" fill="url(#g3)" />
    <polygon points="620,0 1200,0 1200,520" fill="#2b2d8b" opacity=".55" />
    <polygon points="900,0 1200,0 1200,260" fill="#374ea1" opacity=".6" />
    <polygon points="0,800 0,560 260,800" fill="#66c18c" opacity=".9" />
  </svg>
)
const Tag = ({ children }: { children: ReactNode }) => <p className="font-mono text-xs text-[#66c18c]">// {String(children).toLowerCase()}</p>

function PageHeader({ eyebrow, title, text, crumbs }: Parameters<Skin['PageHeader']>[0]) {
  return (
    <header className="relative overflow-hidden pb-12 pt-36">
      <Planes className="absolute inset-0 h-full w-full opacity-60" />
      <div className="wrap relative">
        {crumbs && <Crumbs items={crumbs} className="font-mono" />}
        {eyebrow && <div className="mt-6"><Tag>{eyebrow}</Tag></div>}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-light tracking-tight md:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-muted">{text}</p>}
      </div>
    </header>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { user } = useStore()
  const [menu, setMenu] = useState(false)
  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 px-4">
        <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b0433]/75 px-4 backdrop-blur-xl md:px-6">
          <PLink to="" className="shrink-0"><Logo tone="white" className="h-9" /></PLink>
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.03] p-1 lg:flex" aria-label="Principal">
            {menuGroups.map((g) => <Dropdown key={g.label} group={g} triggerClass="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] text-white/75 hover:text-white" panelClass="rounded-2xl border border-white/10 bg-[#110a48]/95 text-white backdrop-blur-xl" itemClass="rounded-xl hover:bg-white/5" descClass="text-white/55" iconClass="text-[#66c18c]" />)}
            {nav.main.map((n) => <PLink key={n.to} to={n.to} className="rounded-full px-4 py-1.5 text-[13px] text-white/75 hover:bg-white/5 hover:text-white">{n.label}</PLink>)}
          </nav>
          <div className="flex items-center gap-2">
            <PLink to="login" className="hidden rounded-full border border-white/10 px-3 py-1.5 text-[13px] text-white/80 hover:text-white sm:block">{user ? user.name.split(' ')[0] : 'Entrar'}</PLink>
            <PLink to={nav.cta.to} className="btn btn-accent btn-sm hidden rounded-full md:inline-flex">{nav.cta.label}</PLink>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {menu && (
          <nav className="sheet-in mx-auto mt-2 max-h-[75vh] max-w-site overflow-auto rounded-2xl border border-white/10 bg-[#0b0433]/95 p-3 backdrop-blur-xl lg:hidden">
            {menuGroups.flatMap((g) => g.items).map((n) => <PLink key={n.to} to={n.to} onClick={() => setMenu(false)} className="block rounded-xl px-4 py-2.5 text-sm hover:bg-white/5">{n.label}</PLink>)}
            {[...nav.main, nav.login, nav.cta].map((n) => <PLink key={n.label} to={n.to} onClick={() => setMenu(false)} className="block rounded-xl px-4 py-2.5 text-sm text-[#66c18c] hover:bg-white/5">{n.label}</PLink>)}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="relative mt-24 overflow-hidden border-t border-white/10">
        <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div><Logo tone="white" className="h-11" /><p className="mt-5 max-w-xs text-sm text-muted">{footer.tagline}</p><p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[#66c18c]"><span className="pulse-dot h-2 w-2 rounded-full bg-[#66c18c] text-[#66c18c]" /> plataforma operacional</p></div>
          {footer.columns.map((c) => <div key={c.title}><p className="font-mono text-xs text-muted">/{c.title.toLowerCase()}</p><ul className="mt-4 space-y-2.5 text-sm">{c.links.map((l) => <li key={l.label}><PLink to={l.to} className="text-white/80 hover:text-[#66c18c]">{l.label}</PLink></li>)}</ul></div>)}
        </div>
        <div className="wrap border-t border-white/10 py-6 font-mono text-[11px] text-muted">{footer.legal}</div>
      </footer>
    </>
  )
}

function Home() {
  const [step, setStep] = useState(0)
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-36 md:pt-44">
        <Planes className="absolute inset-0 h-full w-full" />
        <div className="wrap relative">
          <div className="max-w-3xl">
            <Tag>{hero.eyebrow}</Tag>
            <h1 className="mt-5 font-display text-4xl font-light leading-[1.06] tracking-tight md:text-[64px]">Avaliação, repasse e gestão de usados em <span className="font-semibold text-[#66c18c]">uma única plataforma.</span></h1>
            <p className="mt-6 max-w-xl text-white/65">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PLink to="contato" className="btn btn-accent rounded-xl">{hero.primaryCta}</PLink>
              <PLink to="como-funciona" className="btn rounded-xl border border-white/15 text-white hover:bg-white/5">Ver como funciona <ArrowRight size={15} /></PLink>
            </div>
          </div>
          <div className="relative mt-16 grid items-end gap-6 lg:grid-cols-[1fr_290px]">
            <Reveal><DashboardScreen dark /></Reveal>
            <Reveal delay={150} className="hidden lg:block"><EvaluationScreen /></Reveal>
            <div className="absolute -left-4 -top-8 hidden w-52 rounded-xl border border-white/10 bg-[#0b0433]/90 p-4 backdrop-blur md:block">
              <p className="flex items-center gap-2 font-mono text-[11px] text-muted"><Activity size={13} className="text-[#66c18c]" /> avaliações hoje</p>
              <p className="num mt-1 font-display text-3xl"><CountUp value={2871} /></p>
              <p className="text-[11px] text-muted">em 1.250 concessionárias</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {numbers.map((k, i) => (
            <div key={k.label} className="bg-[#0b0433] p-6">
              <p className="font-mono text-[11px] text-muted">0{i + 1}</p>
              <p className="mt-3 font-display text-3xl font-light"><CountUp {...k} /></p>
              <p className="mt-1 text-sm text-muted">{k.label}</p>
              <div className="mt-4 h-0.5 overflow-hidden rounded bg-white/10"><div className="bar-grow h-full bg-[#66c18c]" style={{ width: `${[78, 64, 52, 88][i]}%`, animationDelay: `${i * 120}ms` }} /></div>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] text-muted">* {numbersNote.toLowerCase()}</p>
      </section>

      <section className="wrap mt-28">
        <Tag>{sections.solutions.eyebrow}</Tag>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-light md:text-5xl">{sections.solutions.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-6">
          {solutions.map((s, k) => {
            const I = s.icon
            return (
              <Reveal key={s.slug} delay={k * 70} className={cx(k < 2 ? 'md:col-span-3' : 'md:col-span-2')}>
                <PLink to={`solucoes/${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[.03] p-6 transition hover:-translate-y-1 hover:border-[#66c18c]/50">
                  <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#66c18c]"><I size={20} /></span><ArrowUpRight size={18} className="text-muted transition group-hover:text-[#66c18c]" /></div>
                  <p className="mt-6 font-mono text-[11px] text-muted">0{k + 1}</p>
                  <p className="mt-1 font-display text-xl">{s.name}</p>
                  <p className="mt-2 text-sm text-muted">{s.short}</p>
                  <div className="mt-auto flex gap-4 pt-6 font-mono text-[11px]">{s.results.slice(0, 2).map((r) => <span key={r.label}><span className="text-white">{r.value}</span> <span className="text-muted">{r.label}</span></span>)}</div>
                </PLink>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="wrap mt-28 grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Tag>{sections.how.eyebrow}</Tag>
          <h2 className="mt-2 font-display text-3xl font-light md:text-4xl">{sections.how.title}</h2>
          <ol className="mt-8 space-y-2">
            {howItWorks.map((h, k) => (
              <li key={h.step}>
                <button onClick={() => setStep(k)} className={cx('flex w-full gap-4 rounded-xl border p-4 text-left transition', step === k ? 'border-[#66c18c]/50 bg-white/[.05]' : 'border-transparent hover:bg-white/[.03]')}>
                  <span className={cx('font-mono text-sm', step === k ? 'text-[#66c18c]' : 'text-muted')}>{h.step}</span>
                  <span><span className="block font-display">{h.title}</span>{step === k && <span className="fade-in mt-1 block text-sm text-muted">{h.text}</span>}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div key={step} className={cx('page-enter', howItWorks[step].screen === 'evaluation' && 'flex justify-center')}><Screen id={howItWorks[step].screen} dark /></div>
      </section>

      <section className="wrap mt-28 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal><IntelScreen dark /></Reveal>
        <div className="flex flex-col justify-center">
          <Tag>{sections.intel.eyebrow}</Tag>
          <h2 className="mt-2 font-display text-3xl font-light">{sections.intel.title}</h2>
          <p className="mt-3 text-muted">{sections.intel.text}</p>
          <PLink to="solucoes/inteligencia" className="mt-6 inline-flex items-center gap-2 text-sm text-[#66c18c]">Explorar inteligência de mercado <ArrowRight size={15} /></PLink>
        </div>
      </section>

      <section className="wrap mt-28">
        <Tag>{sections.segments.eyebrow}</Tag>
        <h2 className="mt-2 font-display text-3xl font-light md:text-4xl">{sections.segments.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {segments.map((s) => { const I = s.icon; return (
            <PLink key={s.slug} to={`para/${s.slug}`} className="group rounded-2xl border border-white/10 p-6 transition hover:border-[#66c18c]/50">
              <I className="text-[#66c18c]" size={22} />
              <p className="mt-5 font-display text-xl">{s.name}</p>
              <p className="mt-2 text-sm text-muted">{s.short}</p>
              <ul className="mt-5 space-y-1.5 font-mono text-[11px] text-white/70">{s.gains.map((g) => <li key={g}>+ {g.toLowerCase()}</li>)}</ul>
            </PLink>
          ) })}
        </div>
      </section>

      <section className="wrap mt-28 grid gap-6 lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10">
          <BrandVideo className="absolute inset-0 h-full w-full object-cover" controlsClass="absolute right-4 top-4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090328] via-[#090328]/20 to-transparent" />
          <div className="absolute bottom-0 p-6"><Tag>procedência</Tag><p className="mt-2 font-display text-2xl font-light">{sections.video.title}</p><p className="mt-1 max-w-md text-sm text-white/70">{sections.video.text}</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {trust.map((t) => <div key={t.title} className="rounded-2xl border border-white/10 p-5"><ShieldCheck size={18} className="text-[#66c18c]" /><p className="mt-3 font-display">{t.title}</p><p className="mt-1 text-sm text-muted">{t.text}</p></div>)}
          <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 p-5 sm:col-span-2">{integrations.map((i) => <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-white/75"><Plug size={11} className="text-[#66c18c]" />{i}</span>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export default { Layout, Home, PageHeader }
