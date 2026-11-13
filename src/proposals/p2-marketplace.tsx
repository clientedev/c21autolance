// PROPOSTA 02 — MARKETPLACE PROFISSIONAL (foco em conversão)
import { useState, type ReactNode } from 'react'
import { Menu, X, Check, X as No, ArrowRight, ChevronRight, ShieldCheck, Plus, Minus } from 'lucide-react'
import { hero, sections, numbers, numbersNote, footer, nav, solutions, segments, howItWorks, faq, contact } from '../data/content'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { Credit, Logo, Reveal, CountUp, PLink, type Skin } from '../shared/ui'
import { Screen, AuctionScreen } from '../shared/screens'
import { CtaBand } from '../shared/pages'
import { Crumbs, Dropdown, menuGroups } from './common'

function PageHeader({ title, text, crumbs, eyebrow }: Parameters<Skin['PageHeader']>[0]) {
  return (
    <header className="border-b border-[rgb(var(--line))] bg-white">
      <div className="wrap py-10">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#2b2d8b]">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight md:text-[40px]">{title}</h1>
        {text && <p className="mt-3 max-w-3xl text-muted">{text}</p>}
      </div>
    </header>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { user } = useStore()
  const [menu, setMenu] = useState(false)
  return (
    <>
      <div className="bg-[#2b2d8b] text-center text-[13px] text-white"><div className="wrap flex h-10 items-center justify-center gap-2"><span className="hidden sm:inline">Nova sala de lances com cronômetro em tempo real.</span><PLink to="solucoes/repasse" className="font-semibold text-[#66c18c] hover:underline">Conheça o módulo de repasse →</PLink></div></div>
      <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_rgb(var(--line))]">
        <div className="wrap flex h-[72px] items-center gap-6">
          <PLink to="" className="shrink-0"><Logo className="h-10" /></PLink>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {menuGroups.map((g) => <Dropdown key={g.label} group={g} triggerClass="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-[#3a3e58] hover:bg-[#f2f3f7]" panelClass="rounded-lg border border-[rgb(var(--line))] bg-white shadow-xl" itemClass="rounded-md hover:bg-[#f2f3f7]" descClass="text-muted" iconClass="text-[#2b2d8b]" />)}
            {nav.main.map((n) => <PLink key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm font-semibold text-[#3a3e58] hover:bg-[#f2f3f7]">{n.label}</PLink>)}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <PLink to="login" className="btn btn-outline btn-sm hidden sm:inline-flex">{user ? user.name.split(' ')[0] : 'Entrar'}</PLink>
            <PLink to={nav.cta.to} className="btn btn-accent btn-sm hidden md:inline-flex">{nav.cta.label}</PLink>
            <button className="lg:hidden" onClick={() => setMenu(true)} aria-label="Abrir menu"><Menu /></button>
          </div>
        </div>
      </header>
      {menu && (
        <div className="fade-in fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMenu(false)}>
          <div className="sheet-in h-full w-80 max-w-[85vw] overflow-auto bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between"><Logo className="h-9" /><button onClick={() => setMenu(false)} aria-label="Fechar"><X /></button></div>
            {menuGroups.map((g) => <div key={g.label} className="mb-4"><p className="mb-1 text-xs font-bold uppercase text-muted">{g.label}</p>{g.items.map((i) => <PLink key={i.to} to={i.to} onClick={() => setMenu(false)} className="flex items-center justify-between py-2 text-sm font-semibold">{i.label}<ChevronRight size={14} /></PLink>)}</div>)}
            {[...nav.main, nav.login].map((n) => <PLink key={n.to} to={n.to} onClick={() => setMenu(false)} className="flex items-center justify-between border-t border-[rgb(var(--line))] py-3 text-sm font-semibold">{n.label}<ChevronRight size={14} /></PLink>)}
            <PLink to={nav.cta.to} onClick={() => setMenu(false)} className="btn btn-accent mt-4 w-full">{nav.cta.label}</PLink>
          </div>
        </div>
      )}
      <main className="min-h-[60vh]">{children}</main>
      <footer className="mt-20 border-t border-[rgb(var(--line))] bg-white">
        <div className="wrap grid gap-10 py-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div><Logo className="h-11" /><p className="mt-4 max-w-xs text-sm text-muted">{footer.tagline}</p><PLink to="contato" className="btn btn-primary btn-sm mt-5">{nav.cta.label}</PLink></div>
          {footer.columns.map((c) => <div key={c.title}><p className="text-sm font-bold">{c.title}</p><ul className="mt-3 space-y-2 text-sm text-muted">{c.links.map((l) => <li key={l.label}><PLink to={l.to} className="hover:text-[#2b2d8b]">{l.label}</PLink></li>)}</ul></div>)}
        </div>
        <div className="border-t border-[rgb(var(--line))] bg-[#fafbfc]"><div className="wrap flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-muted"><span>{footer.legal} <Credit className="ml-1" /></span><span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#4fa874]" /> Dados tratados conforme a LGPD</span></div></div>
      </footer>
    </>
  )
}

function Home() {
  const { notify } = useStore()
  const [sent, setSent] = useState(false)
  const [seg, setSeg] = useState(0)
  const [open, setOpen] = useState(0)
  const s = segments[seg]
  return (
    <>
      <section className="bg-white">
        <div className="wrap grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.15fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#66c18c]/15 px-3 py-1 text-xs font-bold text-[#2f8a57]"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#4fa874] text-[#4fa874]" />{hero.eyebrow}</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] md:text-5xl">{hero.title}</h1>
            <p className="mt-5 text-lg text-muted">{hero.subtitle}</p>
            <form className="mt-8 rounded-lg border border-[rgb(var(--line))] bg-[#f7f8fb] p-4" onSubmit={(e) => (e.preventDefault(), setSent(true), notify({ title: 'Solicitação recebida', text: 'Um especialista entrará em contato em até 1 dia útil.', tone: 'ok' }))}>
              {sent ? <p className="flex items-center gap-2 py-3 font-semibold text-[#2f8a57]"><Check size={18} /> Pronto! Um especialista entrará em contato em até 1 dia útil.</p> : (
                <>
                  <p className="mb-3 text-sm font-bold">Agende uma demonstração gratuita</p>
                  <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                    <input className="field" type="email" placeholder="E-mail corporativo" required aria-label="E-mail corporativo" />
                    <select className="field" aria-label="Perfil">{contact.profiles.map((p) => <option key={p}>{p}</option>)}</select>
                    <button className="btn btn-accent">Agendar</button>
                  </div>
                </>
              )}
            </form>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">{['Sem instalação', 'Implantação assistida', 'Suporte dedicado'].map((t) => <li key={t} className="flex items-center gap-1.5"><Check size={15} className="text-[#4fa874]" />{t}</li>)}</ul>
          </div>
          <Reveal><AuctionScreen /></Reveal>
        </div>
      </section>

      <section className="bg-[#2b2d8b] text-white">
        <div className="wrap grid grid-cols-2 gap-6 py-10 md:grid-cols-4">{numbers.map((k) => <div key={k.label}><p className="num font-display text-3xl font-bold md:text-4xl"><CountUp {...k} /></p><p className="mt-1 text-sm text-white/70">{k.label}</p></div>)}</div>
        <p className="wrap pb-4 text-[11px] text-white/50">{numbersNote}</p>
      </section>

      <section className="wrap mt-20">
        <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-wider text-[#2b2d8b]">{sections.solutions.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold">{sections.solutions.title}</h2><p className="mt-3 text-muted">{sections.solutions.text}</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {solutions.map((sol, k) => {
            const I = sol.icon
            return (
              <Reveal key={sol.slug} delay={k * 60} className="h-full">
                <PLink to={`solucoes/${sol.slug}`} className="group flex h-full flex-col rounded-lg border border-[rgb(var(--line))] bg-white p-5 transition hover:-translate-y-1 hover:border-[#2b2d8b]/40 hover:shadow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-[#2b2d8b]/8 text-[#2b2d8b] transition group-hover:bg-[#2b2d8b] group-hover:text-white"><I size={20} /></span>
                  <p className="mt-4 font-bold">{sol.name}</p>
                  <p className="mt-2 text-sm text-muted">{sol.short}</p>
                  <span className="mt-auto pt-4 text-sm font-bold text-[#2b2d8b]">Ver módulo →</span>
                </PLink>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="wrap mt-20">
        <div className="rounded-lg border border-[rgb(var(--line))] bg-white p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#2b2d8b]">{sections.segments.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold">{sections.segments.title}</h2></div>
            <div className="flex rounded-md bg-[#f2f3f7] p-1" role="tablist">{segments.map((x, k) => <button key={x.slug} role="tab" aria-selected={seg === k} onClick={() => setSeg(k)} className={cx('rounded px-4 py-2 text-sm font-bold transition', seg === k ? 'bg-white text-[#2b2d8b] shadow-sm' : 'text-muted')}>{x.name}</button>)}</div>
          </div>
          <div key={seg} className="page-enter mt-8 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h3 className="text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.lead}</p>
              <table className="mt-6 w-full text-sm">
                <thead><tr className="text-left text-xs text-muted"><th className="pb-2 font-semibold">Sem a plataforma</th><th className="pb-2 font-semibold">Com o C21 AutoLance</th></tr></thead>
                <tbody>{s.pains.map((p, i) => <tr key={p} className="border-t border-[rgb(var(--line))] align-top"><td className="py-3 pr-4"><span className="flex gap-2"><No size={15} className="mt-0.5 shrink-0 text-[#2b2d8b]" />{p}</span></td><td className="py-3"><span className="flex gap-2 font-semibold"><Check size={15} className="mt-0.5 shrink-0 text-[#4fa874]" />{s.gains[i]}</span></td></tr>)}</tbody>
              </table>
              <PLink to={`para/${s.slug}`} className="btn btn-primary btn-sm mt-6">Soluções para {s.name.toLowerCase()} <ArrowRight size={14} /></PLink>
            </div>
            <Screen id={solutions.find((x) => x.slug === s.solutions[0])!.screen === 'evaluation' ? 'stock' : solutions.find((x) => x.slug === s.solutions[0])!.screen} />
          </div>
        </div>
      </section>

      <section className="wrap mt-20">
        <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-wider text-[#2b2d8b]">{sections.how.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold">{sections.how.title}</h2></div>
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {howItWorks.map((h, k) => <li key={h.step} className="relative rounded-lg border border-[rgb(var(--line))] bg-white p-6"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#66c18c] text-sm font-bold text-[#0d013a]">{k + 1}</span><p className="mt-4 font-bold">{h.title}</p><p className="mt-1 text-sm text-muted">{h.text}</p>{k < 3 && <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[rgb(var(--line))] bg-white text-muted md:block" size={28} />}</li>)}
        </ol>
      </section>

      <section className="wrap mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div><p className="text-xs font-bold uppercase tracking-wider text-[#2b2d8b]">Dúvidas</p><h2 className="mt-2 font-display text-3xl font-bold">Perguntas frequentes</h2><p className="mt-3 text-muted">Não encontrou o que procurava?</p><PLink to="contato" className="btn btn-outline btn-sm mt-5">Fale com um especialista</PLink></div>
        <div className="divide-y divide-[rgb(var(--line))] rounded-lg border border-[rgb(var(--line))] bg-white">
          {faq.slice(0, 4).map((q, k) => <div key={q.q}><button onClick={() => setOpen(open === k ? -1 : k)} aria-expanded={open === k} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">{q.q}{open === k ? <Minus size={16} className="shrink-0 text-[#2b2d8b]" /> : <Plus size={16} className="shrink-0 text-muted" />}</button>{open === k && <p className="fade-in px-5 pb-5 text-sm text-muted">{q.a}</p>}</div>)}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export default { Layout, Home, PageHeader }
