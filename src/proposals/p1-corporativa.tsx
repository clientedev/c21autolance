// PROPOSTA 01 — CORPORATIVA PREMIUM
import { useState, type ReactNode } from 'react'
import { Menu, X, ArrowRight, Phone, ShieldCheck, Plug, Plus, Minus } from 'lucide-react'
import { media } from '../data/vehicles'
import { hero, sections, numbers, numbersNote, footer, nav, solutions, segments, howItWorks, trust, integrations, faq } from '../data/content'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { Credit, Logo, Reveal, CountUp, PLink, BrandVideo, type Skin } from '../shared/ui'
import { Screen, DashboardScreen, IntelScreen } from '../shared/screens'
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
  const [step, setStep] = useState(0)
  const [faqOpen, setFaqOpen] = useState(0)
  const sol = solutions[active]
  const brands = [
    { name: 'Todas as marcas', photo: 'caoa/tiggo9-street.webp', tags: ['SUVs', 'Sedãs', 'Hatches', 'Picapes', 'Híbridos e elétricos'], text: 'Avaliação padronizada para qualquer marca, modelo e ano, com o mesmo critério em toda a rede.' },
    { name: 'Todo o país', photo: 'caoa/unit-grille.webp', tags: ['27 UFs', 'Concessionárias', 'Lojistas', 'Grupos', 'Locadoras'], text: 'Compradores verificados em todos os estados, com frete cotado e retirada agendada na plataforma.' },
  ]
  const gallery = [
    { img: 'caoa/tiggo5x-studio.webp', title: 'Fotografia padronizada', text: 'Roteiro de fotos guiado pelo aplicativo para todos os anúncios.' },
    { img: 'caoa/tiggo9-cockpit.webp', title: 'Interior documentado', text: 'Painel, bancos e quilometragem registrados na avaliação.' },
    { img: 'caoa/unit-wheel.webp', title: 'Mapa de avarias', text: 'Rodas, pneus e lataria inspecionados peça por peça.' },
    { img: 'caoa/cs55-engine.webp', title: 'Laudo cautelar', text: 'Mecânica e estrutura verificadas antes da publicação.' },
    { img: 'caoa/tiggo7phev-interior.webp', title: 'Acabamento avaliado', text: 'Estado de conservação classificado com critérios únicos.' },
  ]
  return (
    <>
      <section className="relative overflow-hidden bg-[#0d013a] text-white">
        <BrandVideo className="absolute inset-0 h-full w-full object-cover opacity-60" controlsClass="absolute bottom-24 right-6 z-10 md:right-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d013a] via-[#0d013a]/85 to-[#0d013a]/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d013a] to-transparent" />
        <svg className="absolute bottom-0 left-0 h-40 w-64" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden><polygon points="0,60 0,0 70,60" fill="#66c18c" /></svg>
        <div className="wrap relative grid min-h-[86vh] items-center gap-14 pb-40 pt-20 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#66c18c]">{hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-4xl font-light leading-[1.08] tracking-tight md:text-[58px]">{hero.title}</h1>
            <p className="mt-6 max-w-xl text-base font-light text-white/75 md:text-lg">{hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PLink to="contato" className="btn btn-accent">{hero.primaryCta}</PLink>
              <a href="#solucoes" onClick={(e) => (e.preventDefault(), document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' }))} className="btn border border-white/30 text-white hover:bg-white/10">{hero.secondaryCta}</a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.18em] text-white/55"><span>Multimarcas</span><span className="h-3 w-px bg-white/25" /><span>Concessionárias</span><span className="h-3 w-px bg-white/25" /><span>Lojistas</span><span className="h-3 w-px bg-white/25" /><span>Grupos automotivos</span></div>
          </div>
          <Reveal className="hidden lg:block"><DashboardScreen /></Reveal>
        </div>
      </section>

      <section className="wrap relative z-10 -mt-14">
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

      <section className="wrap py-24">
        <SectionHead eyebrow="Multimarcas" title="Uma plataforma para o seminovo de qualquer marca" text="Do compacto ao SUV híbrido: todo veículo é avaliado com o mesmo padrão e negociado com compradores verificados em todo o país." />
        <div className="grid gap-6 lg:grid-cols-2">
          {brands.map((b, k) => (
            <Reveal key={b.name} delay={k * 120}>
              <div className="img-zoom group relative h-[460px] overflow-hidden bg-[#0d013a] text-white">
                <img src={media(b.photo)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d013a] via-[#0d013a]/20 via-40% to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#66c18c]">Alcance</p>
                  <p className="mt-2 font-display text-4xl font-light">{b.name}</p>
                  <p className="mt-2 max-w-md text-sm text-white/75">{b.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{b.tags.map((m) => <span key={m} className="border border-white/25 px-3 py-1 text-xs tracking-wide text-white/85 backdrop-blur">{m}</span>)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="solucoes" className="scroll-mt-28 border-y border-[rgb(var(--line))] bg-white py-24">
        <div className="wrap">
          <SectionHead eyebrow={sections.solutions.eyebrow} title={sections.solutions.title} text={sections.solutions.text} />
          <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
            <div className="border-t border-[rgb(var(--line))]" role="tablist">
              {solutions.map((s, k) => {
                const I = s.icon
                return (
                  <button key={s.slug} role="tab" aria-selected={active === k} onClick={() => setActive(k)} className={cx('relative w-full border-b border-[rgb(var(--line))] py-5 pl-6 text-left transition', active === k ? 'bg-[#f7f6f3]' : 'hover:bg-[#f7f6f3]/60')}>
                    <span className={cx('absolute inset-y-0 left-0 w-[3px] transition', active === k ? 'bg-[#66c18c]' : 'bg-transparent')} />
                    <span className="flex items-center gap-3"><I size={18} className={active === k ? 'text-[#2b2d8b]' : 'text-muted'} /><span className="font-medium">{s.name}</span></span>
                    {active === k && <span className="fade-in mt-2 block pr-4 text-sm text-muted">{s.short}</span>}
                  </button>
                )
              })}
            </div>
            <div key={sol.slug} className="page-enter">
              <div className={sol.screen === 'evaluation' ? 'flex justify-center bg-[#f7f6f3] py-8' : ''}><Screen id={sol.screen} /></div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-8">{sol.results.map((r) => <div key={r.label}><p className="font-display text-2xl font-light">{r.value}</p><p className="text-xs text-muted">{r.label}</p></div>)}</div>
                <PLink to={`solucoes/${sol.slug}`} className="inline-flex items-center gap-2 border-b border-[#0d013a] pb-1 text-[12px] font-medium uppercase tracking-[0.14em]">Conhecer o módulo <ArrowRight size={14} /></PLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0d013a] text-white">
        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-video lg:aspect-auto lg:min-h-[560px]">
            <BrandVideo src="c21-detalhes.mp4" poster="c21-detalhes-poster.webp" className="absolute inset-0 h-full w-full object-cover" controlsClass="absolute bottom-5 left-5" />
          </div>
          <div className="relative flex flex-col justify-center p-10 md:p-16">
            <svg className="absolute right-0 top-0 h-full w-1/2" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><polygon points="40,0 100,0 100,100" fill="#2b2d8b" opacity=".45" /></svg>
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#66c18c]">Procedência</p>
              <h2 className="mt-3 font-display text-3xl font-light md:text-4xl">Cada detalhe registrado antes da negociação</h2>
              <p className="mt-4 max-w-md text-white/70">{sections.video.text}</p>
              <ul className="mt-8 space-y-4 text-sm">{['Roteiro de fotos padronizado em todas as unidades', 'Checklist de conservação com mais de 120 itens', 'Laudo cautelar anexado ao anúncio de repasse'].map((t) => <li key={t} className="flex gap-3"><ShieldCheck size={18} className="shrink-0 text-[#66c18c]" />{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="wrap"><SectionHead eyebrow="Avaliação" title="Uma inspeção que valoriza o seminovo" text="O padrão de avaliação do C21 AutoLance transforma cada veículo em um anúncio confiável para o comprador." /></div>
        <div className="flex snap-x gap-6 overflow-x-auto px-5 pb-4 no-scrollbar md:px-[max(2rem,calc((100vw-1280px)/2+2rem))]">
          {gallery.map((g, k) => (
            <Reveal key={g.title} delay={k * 80} className="w-[78vw] shrink-0 snap-start sm:w-[420px]">
              <figure className="img-zoom overflow-hidden bg-white">
                <div className="aspect-[4/3] overflow-hidden"><img src={media(g.img)} alt={g.title} className="h-full w-full object-cover" loading="lazy" /></div>
                <figcaption className="border-x border-b border-[rgb(var(--line))] p-6"><p className="num text-xs text-muted">0{k + 1}</p><p className="mt-2 font-display text-xl">{g.title}</p><p className="mt-1 text-sm text-muted">{g.text}</p></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgb(var(--line))] bg-white py-24">
        <div className="wrap">
          <SectionHead eyebrow={sections.how.eyebrow} title={sections.how.title} text={sections.how.text} />
          <div className="grid gap-12 lg:grid-cols-[400px_1fr]">
            <ol className="space-y-1">
              {howItWorks.map((h, k) => (
                <li key={h.step}>
                  <button onClick={() => setStep(k)} className={cx('w-full border-l-2 p-6 text-left transition', step === k ? 'border-[#66c18c] bg-[#f7f6f3]' : 'border-[rgb(var(--line))] hover:bg-[#f7f6f3]/60')}>
                    <span className="flex items-baseline gap-4"><span className="num font-display text-3xl font-light text-[#66c18c]">{h.step}</span><span className="font-display text-xl">{h.title}</span></span>
                    {step === k && <span className="fade-in mt-2 block pl-12 text-sm text-muted">{h.text}</span>}
                  </button>
                </li>
              ))}
            </ol>
            <div key={step} className={cx('page-enter', howItWorks[step].screen === 'evaluation' && 'flex justify-center bg-[#f7f6f3] py-8')}><Screen id={howItWorks[step].screen} /></div>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <SectionHead eyebrow={sections.segments.eyebrow} title={sections.segments.title} text={sections.segments.text} />
        <div className="grid gap-8 md:grid-cols-3">
          {segments.map((s, k) => (
            <Reveal key={s.slug} delay={k * 90}>
              <PLink to={`para/${s.slug}`} className="group block border border-[rgb(var(--line))] bg-white transition hover:shadow-[0_18px_40px_-24px_rgba(13,1,58,.35)]">
                <div className="img-zoom aspect-[16/10] overflow-hidden bg-[#0d013a]"><img src={media(s.photo)} alt="" className="h-full w-full object-cover" /></div>
                <div className="p-7">
                  <p className="font-display text-2xl font-light">{s.name}</p>
                  <p className="mt-2 text-sm text-muted">{s.short}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">{s.gains.map((g) => <li key={g} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#66c18c]" />{g}</li>)}</ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em]">Saiba mais <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
                </div>
              </PLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0d013a] py-24 text-white">
        <img src={media('caoa/tiggo9-hero.webp')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d013a] via-[#0d013a]/80 to-[#0d013a]/40" />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#66c18c]">{sections.intel.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-light md:text-4xl">{sections.intel.title}</h2>
            <p className="mt-4 max-w-md text-white/70">{sections.intel.text}</p>
            <PLink to="solucoes/inteligencia" className="btn btn-accent mt-8">Explorar inteligência de mercado</PLink>
          </div>
          <Reveal><IntelScreen /></Reveal>
        </div>
      </section>

      <section className="grid md:grid-cols-3">
        {[['caoa/changan-wing.webp', 'Linhas e acabamento externo'], ['caoa/unit-wheel.webp', 'Rodas e pneus'], ['caoa/cs75-interior.webp', 'Interior e acabamento']].map(([img, t]) => (
          <div key={t} className="img-zoom group relative h-[520px] overflow-hidden bg-black">
            <img src={media(img)} alt={t} className="h-full w-full object-cover opacity-90" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 font-display text-xl font-light text-white">{t}</p>
          </div>
        ))}
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

      <section className="border-t border-[rgb(var(--line))] bg-white py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div><SectionHead eyebrow="Dúvidas" title="Perguntas frequentes" /><PLink to="faq" className="inline-flex items-center gap-2 border-b border-[#0d013a] pb-1 text-[12px] font-medium uppercase tracking-[0.14em]">Ver todas <ArrowRight size={14} /></PLink></div>
          <div className="border-t border-[rgb(var(--line))]">
            {faq.slice(0, 4).map((q, k) => (
              <div key={q.q} className="border-b border-[rgb(var(--line))]">
                <button onClick={() => setFaqOpen(faqOpen === k ? -1 : k)} aria-expanded={faqOpen === k} className="flex w-full items-center justify-between gap-6 py-5 text-left"><span className="font-medium">{q.q}</span>{faqOpen === k ? <Minus size={16} className="shrink-0 text-[#66c18c]" /> : <Plus size={16} className="shrink-0 text-muted" />}</button>
                <div className={cx('grid transition-all duration-300', faqOpen === k ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]')}><p className="overflow-hidden text-sm leading-relaxed text-muted">{q.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export default { Layout, Home, PageHeader }
