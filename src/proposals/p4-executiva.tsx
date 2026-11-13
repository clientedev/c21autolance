// PROPOSTA 04 — EXECUTIVA MINIMALISTA
import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { hero, sections, numbers, numbersNote, footer, nav, solutions, segments, howItWorks, trust, integrations } from '../data/content'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { Logo, Reveal, CountUp, PLink, useHref, type Skin } from '../shared/ui'
import { Screen, StockScreen } from '../shared/screens'
import { CtaBand } from '../shared/pages'
import { Crumbs, Dropdown, menuGroups } from './common'

function PageHeader({ title, text, crumbs, eyebrow }: Parameters<Skin['PageHeader']>[0]) {
  return (
    <header className="wrap pb-10 pt-14">
      {crumbs && <Crumbs items={crumbs} />}
      <div className="mt-8 grid gap-6 border-b border-[rgb(var(--line))] pb-10 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>{eyebrow && <p className="text-sm text-muted">{eyebrow}</p>}<h1 className="mt-2 font-display text-4xl font-light tracking-tight md:text-[44px]">{title}</h1></div>
        {text && <p className="max-w-md text-[15px] leading-relaxed text-muted md:justify-self-end">{text}</p>}
      </div>
    </header>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const href = useHref()
  const { user } = useStore()
  const [menu, setMenu] = useState(false)
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--line))] bg-white/95 backdrop-blur">
        <div className="wrap flex h-16 items-center justify-between gap-8">
          <div className="flex items-center gap-10">
            <PLink to=""><Logo className="h-8" /></PLink>
            <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Principal">
              {menuGroups.map((g) => <Dropdown key={g.label} group={g} triggerClass="flex items-center gap-1 py-5 text-muted hover:text-ink" panelClass="border border-[rgb(var(--line))] bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,.2)]" itemClass="hover:bg-[#f6f6f8]" descClass="text-muted" iconClass="text-ink" />)}
              {nav.main.map((n) => <NavLink key={n.to} to={href(n.to)} className={({ isActive }) => cx('hover:text-ink', isActive ? 'text-ink' : 'text-muted')}>{n.label}</NavLink>)}
            </nav>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <PLink to="login" className="hidden text-muted hover:text-ink sm:block">{user ? user.name : 'Entrar'}</PLink>
            <PLink to={nav.cta.to} className="hidden items-center gap-1.5 font-medium md:flex">{nav.cta.label} <ArrowRight size={14} /></PLink>
            <button className="text-sm font-medium lg:hidden" onClick={() => setMenu(!menu)} aria-expanded={menu}>{menu ? 'Fechar' : 'Menu'}</button>
          </div>
        </div>
        {menu && <nav className="wrap fade-in max-h-[75vh] overflow-auto border-t border-[rgb(var(--line))] py-4 lg:hidden">{[...menuGroups.flatMap((g) => g.items), ...nav.main, nav.login, nav.cta].map((n) => <PLink key={n.label} to={n.to} onClick={() => setMenu(false)} className="block py-2 text-lg">{n.label}</PLink>)}</nav>}
      </header>
      <main>{children}</main>
      <footer className="wrap mt-28 border-t border-[rgb(var(--line))] pb-10 pt-12">
        <div className="grid gap-10 md:grid-cols-[2fr_repeat(3,1fr)]">
          <div><Logo className="h-9" /><p className="mt-4 max-w-xs text-sm text-muted">{footer.tagline}</p></div>
          {footer.columns.map((c) => <div key={c.title}><p className="text-sm font-medium">{c.title}</p><ul className="mt-3 space-y-2 text-sm text-muted">{c.links.map((l) => <li key={l.label}><PLink to={l.to} className="hover:text-ink">{l.label}</PLink></li>)}</ul></div>)}
        </div>
        <p className="mt-12 text-xs text-muted">{footer.legal}</p>
      </footer>
    </>
  )
}

function Home() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <section className="wrap grid gap-14 pb-16 pt-16 lg:grid-cols-[1.5fr_1fr] lg:pt-24">
        <div>
          <p className="text-sm text-muted">{hero.eyebrow}</p>
          <h1 className="mt-6 font-display text-4xl font-light leading-[1.12] tracking-tight md:text-[56px]">{hero.title}</h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">{hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
            <PLink to="contato" className="btn btn-primary">{hero.primaryCta}</PLink>
            <PLink to="como-funciona" className="inline-flex items-center gap-2 font-medium">Como funciona <ArrowRight size={15} /></PLink>
          </div>
        </div>
        <dl className="self-end border-t border-ink">
          {numbers.map((k) => <div key={k.label} className="flex items-baseline justify-between gap-4 border-b border-[rgb(var(--line))] py-4"><dt className="text-sm text-muted">{k.label}</dt><dd className="font-display text-2xl font-light"><CountUp {...k} /></dd></div>)}
          <p className="pt-2 text-xs text-muted">{numbersNote}</p>
        </dl>
      </section>

      <Reveal className="wrap"><StockScreen /></Reveal>

      <section className="wrap mt-28 grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div><h2 className="font-display text-2xl font-normal">{sections.solutions.title}</h2><p className="mt-3 text-sm text-muted">{sections.solutions.text}</p></div>
        <div className="border-t border-[rgb(var(--line))]">
          {solutions.map((s, k) => (
            <div key={s.slug} className="border-b border-[rgb(var(--line))]">
              <button onClick={() => setOpen(open === k ? -1 : k)} aria-expanded={open === k} className="flex w-full items-center gap-6 py-6 text-left">
                <span className="num w-8 text-sm text-muted">0{k + 1}</span>
                <span className="flex-1"><span className="block text-xl">{s.name}</span>{open !== k && <span className="mt-1 block text-sm text-muted">{s.short}</span>}</span>
                {open === k ? <Minus size={18} /> : <Plus size={18} className="text-muted" />}
              </button>
              <div className={cx('grid transition-all duration-500', open === k ? 'grid-rows-[1fr] pb-8' : 'grid-rows-[0fr]')}>
                <div className="overflow-hidden pl-14">
                  <p className="max-w-xl text-muted">{s.lead}</p>
                  <div className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">{s.features.map((f) => <p key={f.title}><span className="font-medium">{f.title}.</span> <span className="text-muted">{f.text}</span></p>)}</div>
                  <PLink to={`solucoes/${s.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">Ver módulo completo <ArrowRight size={14} /></PLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mt-28">
        <h2 className="font-display text-2xl font-normal">{sections.segments.title}</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-3">
          {segments.map((s) => (
            <div key={s.slug} className="border-t border-ink pt-6">
              <p className="text-xl">{s.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.short}</p>
              <ul className="mt-5 space-y-2 text-sm">{s.gains.map((g) => <li key={g} className="flex gap-2"><span className="text-[#4fa874]">—</span>{g}</li>)}</ul>
              <PLink to={`para/${s.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">Saiba mais <ArrowRight size={14} /></PLink>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mt-28 grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div><h2 className="font-display text-2xl font-normal">{sections.how.title}</h2><p className="mt-3 text-sm text-muted">{sections.how.text}</p></div>
        <table className="tbl">
          <tbody>{howItWorks.map((h) => <tr key={h.step}><td className="num w-16 align-top text-muted">{h.step}</td><td className="w-40 align-top font-medium">{h.title}</td><td className="text-muted">{h.text}</td></tr>)}</tbody>
        </table>
      </section>

      <section className="wrap mt-28 grid gap-12 md:grid-cols-2">
        <div><h2 className="text-sm font-medium">{sections.trust.title}</h2><dl className="mt-4">{trust.map((t) => <div key={t.title} className="grid grid-cols-[160px_1fr] gap-4 border-t border-[rgb(var(--line))] py-3 text-sm"><dt className="font-medium">{t.title}</dt><dd className="text-muted">{t.text}</dd></div>)}</dl></div>
        <div><h2 className="text-sm font-medium">Integrações</h2><p className="mt-4 border-t border-[rgb(var(--line))] pt-3 text-sm leading-loose text-muted">{integrations.join(' · ')}</p></div>
      </section>
      <CtaBand />
    </>
  )
}

export default { Layout, Home, PageHeader }
