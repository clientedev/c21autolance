// PROPOSTA 05 — AUTOMOTIVA IMPACTANTE
import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Check } from 'lucide-react'
import { media } from '../data/vehicles'
import { hero, sections, numbers, numbersNote, footer, nav, solutions, segments, howItWorks } from '../data/content'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { Credit, Logo, Reveal, CountUp, PLink, BrandVideo, type Skin } from '../shared/ui'
import { Screen } from '../shared/screens'
import { Crumbs, Dropdown, menuGroups } from './common'

function PageHeader({ eyebrow, title, text, crumbs }: Parameters<Skin['PageHeader']>[0]) {
  return (
    <header className="relative overflow-hidden bg-[#0d013a] pb-14 pt-32">
      <img src={media('caoa/tiggo9-street.webp')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08061a] via-[#08061a]/85 to-transparent" />
      <div className="absolute bottom-0 right-0 h-full w-1/3 bg-[#66c18c]" style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 40% 100%)', opacity: 0.9 }} />
      <div className="wrap relative">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && <p className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#66c18c]">{eyebrow}</p>}
        <h1 className="mt-2 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl">{title}</h1>
        {text && <p className="mt-5 max-w-xl text-white/70">{text}</p>}
      </div>
    </header>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { user } = useStore()
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [pathname])
  const item = 'font-display text-[15px] font-semibold uppercase tracking-[0.1em] text-white/80 transition hover:text-white'
  return (
    <>
      <header className={cx('fixed inset-x-0 top-0 z-40 transition-colors duration-300', solid ? 'bg-[#08061a]/95 shadow-[0_1px_0_rgba(255,255,255,.08)] backdrop-blur' : 'bg-gradient-to-b from-black/60 to-transparent')}>
        <div className="wrap flex h-20 items-center justify-between gap-6">
          <PLink to=""><Logo tone="white" className="h-11" /></PLink>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {menuGroups.map((g) => <Dropdown key={g.label} group={g} triggerClass={cx(item, 'flex items-center gap-1.5 py-7')} panelClass="border-t-2 border-[#66c18c] bg-[#0d013a] text-white shadow-2xl" itemClass="hover:bg-white/5" descClass="text-white/55" iconClass="text-[#66c18c]" />)}
            {nav.main.map((n) => <PLink key={n.to} to={n.to} className={item}>{n.label}</PLink>)}
          </nav>
          <div className="flex items-center gap-4">
            <PLink to="login" className={cx(item, 'hidden sm:block')}>{user ? user.name.split(' ')[0] : 'Entrar'}</PLink>
            <PLink to={nav.cta.to} className="btn btn-primary btn-sm hidden md:inline-flex">Demonstração</PLink>
            <button className="lg:hidden" onClick={() => setMenu(true)} aria-label="Abrir menu"><Menu /></button>
          </div>
        </div>
      </header>
      {menu && (
        <div className="fade-in fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setMenu(false)}>
          <nav className="sheet-in ml-auto flex h-full w-80 max-w-[85vw] flex-col overflow-auto bg-[#0d013a] p-6" onClick={(e) => e.stopPropagation()}>
            <button className="self-end" onClick={() => setMenu(false)} aria-label="Fechar"><X /></button>
            {[...menuGroups.flatMap((g) => g.items), ...nav.main, nav.login].map((n) => <PLink key={n.label} to={n.to} onClick={() => setMenu(false)} className="border-b border-white/10 py-3 font-display text-xl font-semibold uppercase">{n.label}</PLink>)}
            <PLink to={nav.cta.to} onClick={() => setMenu(false)} className="btn btn-primary mt-6">{nav.cta.label}</PLink>
          </nav>
        </div>
      )}
      <main>{children}</main>
      <footer className="relative mt-24 overflow-hidden bg-[#050414]">
        <div className="h-2 bg-[#66c18c]" />
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div><Logo tone="white" className="h-16" /><p className="mt-6 max-w-xs text-white/60">{footer.tagline}</p></div>
          {footer.columns.map((c) => <div key={c.title}><p className="font-display text-lg font-semibold uppercase tracking-wider text-[#66c18c]">{c.title}</p><ul className="mt-4 space-y-2.5 text-white/75">{c.links.map((l) => <li key={l.label}><PLink to={l.to} className="hover:text-white">{l.label}</PLink></li>)}</ul></div>)}
        </div>
        <div className="wrap border-t border-white/10 py-6 text-xs text-white/40">{footer.legal} <Credit className="ml-1" /></div>
      </footer>
    </>
  )
}

function Home() {
  const segImgs = [media('caoa/tiggo7-night.webp'), media('caoa/unit-grille.webp'), media('caoa/tiggo9-street.webp')]
  return (
    <>
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black">
        <BrandVideo className="absolute inset-0 h-full w-full object-cover opacity-80" controlsClass="absolute bottom-8 right-6 md:right-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08061a] via-transparent to-transparent" />
        <div className="wrap relative flex h-full flex-col justify-center">
          <p className="font-display text-lg font-semibold uppercase tracking-[0.25em] text-[#66c18c]">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] md:text-[92px]">Avalie. Repasse. <span className="text-[#66c18c]">Gire o estoque.</span></h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">{hero.title} {hero.subtitle.split('.')[0]}.</p>
          <div className="mt-9 flex flex-wrap gap-3"><PLink to="contato" className="btn btn-primary h-12 px-7">{hero.primaryCta} <ArrowRight size={16} /></PLink><PLink to="como-funciona" className="btn h-12 border-2 border-white px-7 text-white hover:bg-white hover:text-black">Como funciona</PLink></div>
        </div>
      </section>

      <section className="bg-[#66c18c] text-[#0d013a]">
        <div className="wrap grid grid-cols-2 gap-y-8 py-14 md:grid-cols-4">{numbers.map((k) => <div key={k.label}><p className="font-display text-5xl font-bold md:text-6xl"><CountUp {...k} /></p><p className="mt-1 font-semibold uppercase tracking-wide">{k.label}</p></div>)}</div>
        <p className="wrap pb-6 text-xs text-[#0d013a]/70">{numbersNote}</p>
      </section>

      <section className="mt-24 space-y-28">
        <div className="wrap"><h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">{sections.solutions.title}</h2><p className="mt-4 max-w-xl text-white/65">{sections.solutions.text}</p></div>
        {solutions.map((s, k) => (
          <div key={s.slug} className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
            <div className={cx(k % 2 === 1 && 'lg:order-2')}>
              <p className="num font-display text-8xl font-bold leading-none text-white/10">0{k + 1}</p>
              <h3 className="-mt-6 font-display text-4xl font-bold uppercase leading-none md:text-5xl">{s.name}</h3>
              <p className="mt-5 text-lg text-white/70">{s.short}</p>
              <ul className="mt-6 space-y-2">{s.features.slice(0, 3).map((f) => <li key={f.title} className="flex gap-3 border-l-2 border-[#66c18c] bg-white/[.04] px-4 py-2.5 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-[#66c18c]" />{f.title}</li>)}</ul>
              <PLink to={`solucoes/${s.slug}`} className="mt-7 inline-flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wider text-[#66c18c]">Conhecer o módulo <ArrowRight size={18} /></PLink>
            </div>
            <Reveal className={cx(s.screen === 'evaluation' && 'flex justify-center')}><Screen id={s.screen} dark /></Reveal>
          </div>
        ))}
      </section>

      <section className="wrap mt-28">
        <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-6xl">{sections.segments.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {segments.map((s, k) => (
            <Reveal key={s.slug} delay={k * 100}>
              <PLink to={`para/${s.slug}`} className="img-zoom group relative block aspect-[3/4] overflow-hidden bg-[#0d013a]">
                <img src={segImgs[k]} alt="" className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6"><p className="font-display text-5xl font-bold uppercase leading-none">{s.name}</p><p className="mt-3 text-sm text-white/75">{s.short}</p></div>
                <span className="absolute right-0 top-0 grid h-14 w-14 place-items-center bg-[#66c18c] text-[#0d013a] opacity-0 transition group-hover:opacity-100"><ArrowRight /></span>
              </PLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-28 bg-[#0d013a] py-20">
        <div className="wrap">
          <h2 className="font-display text-5xl font-bold uppercase leading-none">{sections.how.title}</h2>
          <ol className="mt-12 grid gap-px bg-white/10 md:grid-cols-4">{howItWorks.map((h) => <li key={h.step} className="bg-[#0d013a] p-6"><p className="font-display text-6xl font-bold text-[#66c18c]">{h.step}</p><p className="mt-3 font-display text-2xl font-bold uppercase">{h.title}</p><p className="mt-2 text-sm text-white/65">{h.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src={media('caoa/tiggo9-hero.webp')} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d013a] via-[#0d013a]/85 to-[#0d013a]/30" />
        <div className="wrap relative py-24">
          <p className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-[#66c18c]">Demonstração</p>
          <h2 className="mt-2 max-w-3xl font-display text-5xl font-bold uppercase leading-none md:text-6xl">{sections.cta.title}</h2>
          <p className="mt-5 max-w-xl text-white/75">{sections.cta.text}</p>
          <PLink to="contato" className="btn btn-primary mt-9 h-12 px-7">{sections.cta.primary}</PLink>
        </div>
      </section>
    </>
  )
}

export default { Layout, Home, PageHeader }
