// PROPOSTA 06 — SAAS B2B ESPECIALIZADO
import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, ArrowRight, Home as HomeIcon, Info, Workflow, Mail, HelpCircle, FileText, LogIn, ShieldCheck, Plug, Check, ChevronRight } from 'lucide-react'
import { hero, sections, numbers, numbersNote, footer, nav, solutions, segments, howItWorks, trust, integrations } from '../data/content'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { Logo, Reveal, CountUp, PLink, useHref, type Skin } from '../shared/ui'
import { Screen } from '../shared/screens'
import { CtaBand } from '../shared/pages'
import { Crumbs } from './common'

function PageHeader({ eyebrow, title, text, crumbs }: Parameters<Skin['PageHeader']>[0]) {
  return (
    <header className="border-b border-[rgb(var(--line))] bg-white">
      <div className="wrap py-8">
        {crumbs && <Crumbs items={crumbs} />}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">{eyebrow && <span className="tag bg-[#2b2d8b]/10 text-[#2b2d8b]">{eyebrow}</span>}<h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{title}</h1>{text && <p className="mt-2 text-muted">{text}</p>}</div>
          <PLink to="contato" className="btn btn-primary">{nav.cta.label}</PLink>
        </div>
      </div>
    </header>
  )
}

function SideNav({ onNav }: { onNav?: () => void }) {
  const href = useHref()
  const link = ({ isActive }: { isActive: boolean }) => cx('flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition', isActive ? 'bg-[#2b2d8b]/10 text-[#2b2d8b]' : 'text-[#4a4f6a] hover:bg-black/[.04]')
  const Sec = ({ title, children }: { title: string; children: ReactNode }) => <div className="mt-5"><p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#9a9db0]">{title}</p>{children}</div>
  return (
    <nav aria-label="Navegação do site" className="flex h-full flex-col">
      <NavLink to={href('')} end onClick={onNav} className={link}><HomeIcon size={15} /> Visão geral</NavLink>
      {Sec({ title: 'Soluções', children: solutions.map((s) => { const I = s.icon; return <NavLink key={s.slug} to={href(`solucoes/${s.slug}`)} onClick={onNav} className={link}><I size={15} /> {s.name}</NavLink> }) })}
      {Sec({ title: 'Para quem', children: segments.map((s) => { const I = s.icon; return <NavLink key={s.slug} to={href(`para/${s.slug}`)} onClick={onNav} className={link}><I size={15} /> {s.name}</NavLink> }) })}
      {Sec({ title: 'Empresa', children: [['como-funciona', 'Como funciona', Workflow], ['sobre', 'Sobre', Info], ['faq', 'Perguntas frequentes', HelpCircle], ['termos', 'Termos e políticas', FileText], ['contato', 'Contato', Mail]].map(([to, l, I]) => { const Ic = I as typeof Info; return <NavLink key={to as string} to={href(to as string)} onClick={onNav} className={link}><Ic size={15} /> {l as string}</NavLink> }) })}
      <div className="mt-auto rounded-lg border border-[rgb(var(--line))] bg-[#f7f8fb] p-3">
        <p className="text-[12px] font-semibold">Veja na prática</p>
        <p className="mt-0.5 text-[11px] text-muted">Demonstração com os dados da sua operação.</p>
        <PLink to="contato" onClick={onNav} className="btn btn-primary btn-sm mt-2.5 w-full">Agendar</PLink>
      </div>
    </nav>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { user } = useStore()
  const [menu, setMenu] = useState(false)
  return (
    <div className="lg:pl-[248px]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-[rgb(var(--line))] bg-white px-3 pb-4 lg:flex">
        <PLink to="" className="flex h-16 shrink-0 items-center px-3"><Logo className="h-9" /></PLink>
        <div className="min-h-0 flex-1 overflow-auto"><SideNav /></div>
      </aside>
      <header className="sticky top-0 z-30 border-b border-[rgb(var(--line))] bg-white/90 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-5 md:px-8">
          <button className="lg:hidden" onClick={() => setMenu(true)} aria-label="Abrir menu"><Menu size={20} /></button>
          <PLink to="" className="lg:hidden"><Logo className="h-8" /></PLink>
          <p className="hidden text-[13px] text-muted md:block">{hero.eyebrow}</p>
          <div className="ml-auto flex items-center gap-2">
            <PLink to="login" className="btn btn-outline btn-sm"><LogIn size={14} /> {user ? user.name.split(' ')[0] : nav.login.label}</PLink>
            <PLink to={nav.cta.to} className="btn btn-primary btn-sm hidden sm:inline-flex">{nav.cta.label}</PLink>
          </div>
        </div>
      </header>
      {menu && (
        <div className="fade-in fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMenu(false)}>
          <div className="sheet-in flex h-full w-72 flex-col bg-white px-3 pb-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-16 items-center justify-between px-3"><Logo className="h-8" /><button onClick={() => setMenu(false)} aria-label="Fechar"><X size={18} /></button></div>
            <div className="min-h-0 flex-1 overflow-auto"><SideNav onNav={() => setMenu(false)} /></div>
          </div>
        </div>
      )}
      <main className="min-h-[70vh]">{children}</main>
      <footer className="mt-20 border-t border-[rgb(var(--line))] bg-white">
        <div className="wrap grid gap-8 py-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div><Logo className="h-9" /><p className="mt-3 max-w-xs text-sm text-muted">{footer.tagline}</p></div>
          {footer.columns.map((c) => <div key={c.title}><p className="text-xs font-semibold uppercase tracking-wider text-muted">{c.title}</p><ul className="mt-3 space-y-1.5 text-sm">{c.links.map((l) => <li key={l.label}><PLink to={l.to} className="hover:text-[#2b2d8b]">{l.label}</PLink></li>)}</ul></div>)}
        </div>
        <div className="wrap border-t border-[rgb(var(--line))] py-4 text-xs text-muted">{footer.legal}</div>
      </footer>
    </div>
  )
}

function Home() {
  const [tab, setTab] = useState(0)
  const s = solutions[tab]
  return (
    <>
      <section className="wrap pb-10 pt-12 text-center md:pt-16">
        <span className="tag bg-[#66c18c]/15 text-[#2f8a57]">Novo · Sala de lances com cronômetro em tempo real</span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-[52px]">{hero.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><PLink to="contato" className="btn btn-primary">{hero.primaryCta} <ArrowRight size={15} /></PLink><PLink to="como-funciona" className="btn btn-outline">Ver como funciona</PLink></div>
      </section>

      <section className="wrap">
        <div className="panel overflow-hidden p-2 md:p-3">
          <div className="flex gap-1 overflow-x-auto border-b border-[rgb(var(--line))] p-1 no-scrollbar" role="tablist">
            {solutions.map((x, k) => { const I = x.icon; return <button key={x.slug} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={cx('flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold transition', tab === k ? 'bg-[#2b2d8b] text-white' : 'text-muted hover:bg-black/[.04]')}><I size={15} />{x.name}</button> })}
          </div>
          <div key={tab} className="page-enter grid gap-6 p-3 pt-5 lg:grid-cols-[300px_1fr] lg:p-5">
            <div>
              <p className="text-lg font-bold">{s.name}</p>
              <p className="mt-2 text-sm text-muted">{s.short}</p>
              <ul className="mt-5 space-y-2 text-sm">{s.features.slice(0, 4).map((f) => <li key={f.title} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-[#4fa874]" />{f.title}</li>)}</ul>
              <PLink to={`solucoes/${s.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#2b2d8b]">Detalhes do módulo <ChevronRight size={14} /></PLink>
            </div>
            <div className={s.screen === 'evaluation' ? 'flex justify-center rounded-lg bg-[#f1f3f8] py-6' : ''}><Screen id={s.screen} /></div>
          </div>
        </div>
      </section>

      <section className="wrap mt-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{numbers.map((k) => <div key={k.label} className="panel p-5"><p className="text-xs text-muted">{k.label}</p><p className="num mt-1 font-display text-3xl font-bold"><CountUp {...k} /></p></div>)}</div>
        <p className="mt-2 text-xs text-muted">{numbersNote}</p>
      </section>

      <section className="wrap mt-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#2b2d8b]">{sections.segments.eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-bold">{sections.segments.title}</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {segments.map((x) => { const I = x.icon; return (
            <PLink key={x.slug} to={`para/${x.slug}`} className="panel group p-5 transition hover:border-[#2b2d8b]/40">
              <div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-md bg-[#2b2d8b]/10 text-[#2b2d8b]"><I size={17} /></span><ArrowRight size={15} className="text-muted transition group-hover:translate-x-1 group-hover:text-[#2b2d8b]" /></div>
              <p className="mt-4 font-semibold">{x.name}</p>
              <p className="mt-1 text-sm text-muted">{x.short}</p>
            </PLink>
          ) })}
        </div>
      </section>

      <section className="wrap mt-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#2b2d8b]">{sections.how.eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-bold">{sections.how.title}</h2>
        <div className="panel mt-6 overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>Etapa</th><th>O que acontece</th><th className="hidden md:table-cell">Módulo</th></tr></thead>
            <tbody>{howItWorks.map((h) => { const sol = solutions.find((x) => x.screen === h.screen)!; return <tr key={h.step}><td className="whitespace-nowrap font-semibold"><span className="num mr-2 text-muted">{h.step}</span>{h.title}</td><td className="text-muted">{h.text}</td><td className="hidden md:table-cell"><PLink to={`solucoes/${sol.slug}`} className="tag bg-[#2b2d8b]/10 text-[#2b2d8b]">{sol.name}</PLink></td></tr> })}</tbody>
          </table>
        </div>
      </section>

      <section className="wrap mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal className="panel p-6">
          <p className="flex items-center gap-2 font-semibold"><ShieldCheck size={17} className="text-[#4fa874]" /> {sections.trust.title}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">{trust.map((t) => <div key={t.title}><p className="text-sm font-semibold">{t.title}</p><p className="mt-0.5 text-[13px] text-muted">{t.text}</p></div>)}</div>
        </Reveal>
        <Reveal className="panel p-6" delay={100}>
          <p className="flex items-center gap-2 font-semibold"><Plug size={17} className="text-[#2b2d8b]" /> Integrações</p>
          <div className="mt-5 grid grid-cols-2 gap-2">{integrations.map((i) => <span key={i} className="flex items-center gap-2 rounded-md border border-[rgb(var(--line))] px-3 py-2 text-[13px]"><span className="h-1.5 w-1.5 rounded-full bg-[#66c18c]" />{i}</span>)}</div>
        </Reveal>
      </section>
      <CtaBand />
    </>
  )
}

export default { Layout, Home, PageHeader }
