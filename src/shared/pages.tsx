import { useState, type ReactNode } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Check, X as XIcon, ArrowRight, Phone, Mail, MapPin, FileText, Plus, Minus, LogOut, ShieldCheck, Lock, Plug } from 'lucide-react'
import { solutions, segments, howItWorks, trust, integrations, about, faq, terms, contact, sections, numbers, numbersNote, getSolution, getSegment } from '../data/content'
import { getVehicle } from '../data/vehicles'
import { useStore } from '../lib/store'
import { brl, cx } from '../lib/format'
import { useSkin, PLink, StatusTag, Reveal, CountUp } from './ui'
import { Screen } from './screens'

const isDark = (id: string) => id === 'tecnologica' || id === 'impactante'
const H2 = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { id } = useSkin()
  return <h2 className={cx('font-display', id === 'impactante' ? 'text-4xl font-bold uppercase leading-none md:text-5xl' : id === 'corporativa' || id === 'executiva' || id === 'tecnologica' ? 'text-3xl font-light tracking-tight md:text-4xl' : 'text-2xl font-bold md:text-3xl', className)}>{children}</h2>
}
const Eyebrow = ({ children }: { children: ReactNode }) => {
  const { id } = useSkin()
  return <p className={cx(id === 'tecnologica' ? 'font-mono text-xs text-[#66c18c]' : id === 'impactante' ? 'font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#66c18c]' : 'eyebrow')}>{id === 'tecnologica' ? `// ${String(children).toLowerCase()}` : children}</p>
}

export function CtaBand() {
  const { id } = useSkin()
  const dark = isDark(id)
  return (
    <section className="wrap mt-24">
      <div className={cx('relative overflow-hidden p-8 md:p-14', id === 'executiva' ? 'border-t border-ink px-0 md:px-0' : dark ? 'panel' : 'bg-[#0d013a] text-white', id === 'tecnologica' && 'rounded-3xl', id === 'marketplace' || id === 'saas' ? 'rounded-lg' : '')}>
        {id !== 'executiva' && <svg className="pointer-events-none absolute right-0 top-0 h-full w-1/3" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><polygon points="45,0 100,0 100,100" fill="#2b2d8b" opacity=".55" /><polygon points="100,62 100,100 62,100" fill="#66c18c" /></svg>}
        <div className="relative grid gap-8 md:grid-cols-[1.5fr_auto] md:items-end">
          <div>
            <H2>{sections.cta.title}</H2>
            <p className={cx('mt-4 max-w-2xl', id === 'executiva' ? 'text-muted' : 'text-white/70')}>{sections.cta.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PLink to="contato" className={cx('btn', id === 'executiva' ? 'btn-primary' : 'btn-accent')}>{sections.cta.primary}</PLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════ SOLUÇÃO ═══════════ */
export function SolutionPage() {
  const { slug = '' } = useParams()
  const { PageHeader, id } = useSkin()
  const s = getSolution(slug)
  if (!s) return <Navigate to=".." replace />
  const dark = isDark(id)
  const others = solutions.filter((x) => x.slug !== s.slug)
  return (
    <>
      <PageHeader eyebrow={s.name} title={s.title} text={s.lead} crumbs={[{ label: 'Início', to: '' }, { label: 'Soluções' }, { label: s.name }]} />
      <section className="wrap py-14">
        <Reveal className={cx('relative', s.screen === 'evaluation' ? 'flex justify-center' : '')}><Screen id={s.screen} dark={dark} /></Reveal>
        <p className="mt-4 text-center text-xs text-muted">Tela ilustrativa e interativa da plataforma. Dados demonstrativos.</p>
      </section>
      <section className="wrap">
        <Eyebrow>Recursos</Eyebrow>
        <H2 className="mt-2">O que o módulo {s.name.toLowerCase()} entrega</H2>
        <div className={cx('mt-10 grid gap-px overflow-hidden md:grid-cols-3', id === 'executiva' ? 'border-y border-[rgb(var(--line))]' : 'panel')}>
          {s.features.map((f, k) => (
            <Reveal key={f.title} delay={k * 60} className={cx('p-6', id !== 'executiva' && 'bg-[rgb(var(--surface))]')}>
              <p className="num text-xs text-muted">{String(k + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="wrap mt-20 grid gap-8 md:grid-cols-3">
        {s.results.map((r) => (
          <div key={r.label} className={cx(id === 'executiva' ? 'border-t border-ink pt-5' : 'border-l-2 border-[rgb(var(--accent))] pl-5')}>
            <p className={cx('num font-display', id === 'impactante' ? 'text-6xl font-bold' : 'text-4xl font-light md:text-5xl')}>{r.value}</p>
            <p className="mt-1 text-sm text-muted">{r.label}</p>
          </div>
        ))}
        <p className="text-xs text-muted md:col-span-3">Resultados ilustrativos para apresentação da proposta.</p>
      </section>
      <section className="wrap mt-20">
        <Eyebrow>Outras soluções</Eyebrow>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {others.map((o) => {
            const I = o.icon
            return (
              <PLink key={o.slug} to={`solucoes/${o.slug}`} className="panel group flex flex-col gap-3 p-5 transition hover:border-[rgb(var(--accent))]">
                <I size={20} className="text-[rgb(var(--accent))]" />
                <p className="font-semibold">{o.name}</p>
                <p className="text-sm text-muted">{o.short}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">Conhecer <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
              </PLink>
            )
          })}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

/* ═══════════ SEGMENTO ═══════════ */
export function SegmentPage() {
  const { slug = '' } = useParams()
  const { PageHeader, id } = useSkin()
  const s = getSegment(slug)
  if (!s) return <Navigate to=".." replace />
  const sols = s.solutions.map((x) => getSolution(x)!)
  return (
    <>
      <PageHeader eyebrow={`Para ${s.name.toLowerCase()}`} title={s.title} text={s.lead} crumbs={[{ label: 'Início', to: '' }, { label: 'Para quem' }, { label: s.name }]} />
      <section className="wrap grid gap-6 py-14 md:grid-cols-2">
        <div className="panel p-7">
          <p className="text-sm font-semibold text-muted">Sem a plataforma</p>
          <ul className="mt-5 space-y-4">{s.pains.map((p) => <li key={p} className="flex gap-3"><XIcon size={18} className="mt-0.5 shrink-0 text-[#c4373b]" />{p}</li>)}</ul>
        </div>
        <div className={cx('p-7', isDark(id) ? 'panel' : 'bg-[#0d013a] text-white')} style={{ borderRadius: 'var(--radius)' }}>
          <p className={cx('text-sm font-semibold', isDark(id) ? 'text-[#66c18c]' : 'text-[#66c18c]')}>Com o C21 AutoLance</p>
          <ul className="mt-5 space-y-4">{s.gains.map((p) => <li key={p} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#66c18c]" />{p}</li>)}</ul>
        </div>
      </section>
      <section className="wrap">
        <Eyebrow>Soluções recomendadas</Eyebrow>
        <H2 className="mt-2">Os módulos mais usados por {s.name.toLowerCase()}</H2>
        <div className="mt-10 space-y-16">
          {sols.map((sol, k) => (
            <div key={sol.slug} className={cx('grid items-center gap-10 lg:grid-cols-2', k % 2 === 1 && 'lg:[&>*:first-child]:order-2')}>
              <div>
                <p className="num text-sm text-muted">0{k + 1}</p>
                <h3 className={cx('mt-2 font-display', id === 'impactante' ? 'text-3xl font-bold uppercase' : 'text-2xl font-semibold')}>{sol.name}</h3>
                <p className="mt-3 text-muted">{sol.short}</p>
                <ul className="mt-5 space-y-2 text-sm">{sol.features.slice(0, 3).map((f) => <li key={f.title} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[rgb(var(--accent))]" /><span><b className="font-medium">{f.title}.</b> <span className="text-muted">{f.text}</span></span></li>)}</ul>
                <PLink to={`solucoes/${sol.slug}`} className="btn btn-outline btn-sm mt-6">Conhecer o módulo <ArrowRight size={14} /></PLink>
              </div>
              <Reveal className={sol.screen === 'evaluation' ? 'flex justify-center' : ''}><Screen id={sol.screen} dark={isDark(id)} /></Reveal>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

/* ═══════════ COMO FUNCIONA ═══════════ */
export function HowPage() {
  const { PageHeader, id } = useSkin()
  const [step, setStep] = useState(0)
  return (
    <>
      <PageHeader eyebrow={sections.how.eyebrow} title={sections.how.title} text={sections.how.text} crumbs={[{ label: 'Início', to: '' }, { label: 'Como funciona' }]} />
      <section className="wrap grid gap-10 py-14 lg:grid-cols-[380px_1fr]">
        <ol className="space-y-2">
          {howItWorks.map((s, k) => (
            <li key={s.step}>
              <button onClick={() => setStep(k)} className={cx('w-full border-l-2 p-5 text-left transition', step === k ? 'border-[rgb(var(--accent))] bg-[rgb(var(--ink)/.04)]' : 'border-[rgb(var(--line))] hover:bg-[rgb(var(--ink)/.02)]')}>
                <p className="num font-display text-sm text-[rgb(var(--accent))]">{s.step}</p>
                <p className="mt-1 font-display text-lg font-semibold">{s.title}</p>
                <p className={cx('mt-1 text-sm text-muted', step !== k && 'line-clamp-1')}>{s.text}</p>
              </button>
            </li>
          ))}
        </ol>
        <div key={step} className={cx('page-enter', howItWorks[step].screen === 'evaluation' && 'flex justify-center')}><Screen id={howItWorks[step].screen} dark={isDark(id)} /></div>
      </section>
      <section className="wrap mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Integrações</Eyebrow>
          <H2 className="mt-2">Conectado aos sistemas da sua operação</H2>
          <div className="mt-8 grid grid-cols-2 gap-3">{integrations.map((i) => <div key={i} className="panel flex items-center gap-3 p-4 text-sm"><Plug size={16} className="text-[rgb(var(--accent))]" />{i}</div>)}</div>
        </div>
        <div>
          <Eyebrow>{sections.trust.eyebrow}</Eyebrow>
          <H2 className="mt-2">{sections.trust.title}</H2>
          <div className="mt-8 space-y-5">{trust.map((t) => <div key={t.title} className="flex gap-4"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[rgb(var(--accent))]" /><div><p className="font-semibold">{t.title}</p><p className="text-sm text-muted">{t.text}</p></div></div>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

/* ═══════════ SOBRE ═══════════ */
export function AboutPage() {
  const { PageHeader, id } = useSkin()
  return (
    <>
      <PageHeader eyebrow="Institucional" title={about.title} text={about.lead} crumbs={[{ label: 'Início', to: '' }, { label: 'Sobre' }]} />
      <section className="wrap grid gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-5 text-[15px] leading-relaxed text-muted">{about.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
        <Reveal><Screen id="dashboard" dark={isDark(id)} /></Reveal>
      </section>
      <section className={cx('py-14', isDark(id) ? 'bg-[rgb(var(--surface))]' : 'bg-[#0d013a] text-white')}>
        <div className="wrap grid grid-cols-2 gap-10 md:grid-cols-4">{numbers.map((k) => <div key={k.label}><p className="font-display text-4xl font-semibold"><CountUp {...k} /></p><p className={cx('mt-1 text-sm', isDark(id) ? 'text-muted' : 'text-white/65')}>{k.label}</p></div>)}</div>
        <p className={cx('wrap mt-6 text-xs', isDark(id) ? 'text-muted' : 'text-white/45')}>{numbersNote}</p>
      </section>
      <section className="wrap grid gap-6 py-14 md:grid-cols-3">
        {about.values.map((v, k) => <Reveal key={v.title} delay={k * 90} className="panel p-6"><p className="num text-xs text-muted">0{k + 1}</p><h3 className="mt-3 font-display text-lg font-semibold">{v.title}</h3><p className="mt-2 text-sm text-muted">{v.text}</p></Reveal>)}
      </section>
      <CtaBand />
    </>
  )
}

/* ═══════════ CONTATO / DEMONSTRAÇÃO ═══════════ */
export function ContactPage() {
  const { PageHeader } = useSkin()
  const { notify } = useStore()
  const [sent, setSent] = useState(false)
  const [interests, setInterests] = useState<string[]>([])
  const icons = [Phone, Mail, Phone]
  return (
    <>
      <PageHeader eyebrow="Contato" title={contact.title} text={contact.lead} crumbs={[{ label: 'Início', to: '' }, { label: 'Contato' }]} />
      <div className="wrap grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr]">
        <form className="panel grid gap-4 p-6 sm:grid-cols-2 md:p-8" onSubmit={(e) => (e.preventDefault(), setSent(true), notify({ title: 'Solicitação recebida', text: 'Um especialista entrará em contato em até 1 dia útil.', tone: 'ok' }))}>
          {sent ? (
            <div className="py-12 text-center sm:col-span-2">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[rgb(var(--accent)/.18)] text-[rgb(var(--accent))]"><Check /></div>
              <p className="mt-4 font-display text-2xl font-semibold">Solicitação recebida</p>
              <p className="mt-2 text-sm text-muted">Um especialista entrará em contato em até 1 dia útil para agendar a demonstração.</p>
              <button type="button" className="btn btn-outline btn-sm mt-6" onClick={() => setSent(false)}>Enviar outra solicitação</button>
            </div>
          ) : (
            <>
              <div><label className="label" htmlFor="c-n">Nome completo</label><input id="c-n" className="field" required /></div>
              <div><label className="label" htmlFor="c-cargo">Cargo</label><input id="c-cargo" className="field" placeholder="Ex.: Gerente de usados" /></div>
              <div><label className="label" htmlFor="c-emp">Empresa</label><input id="c-emp" className="field" required /></div>
              <div><label className="label" htmlFor="c-cnpj">CNPJ</label><input id="c-cnpj" className="field num" placeholder="00.000.000/0001-00" /></div>
              <div><label className="label" htmlFor="c-e">E-mail corporativo</label><input id="c-e" type="email" className="field" required /></div>
              <div><label className="label" htmlFor="c-p">Telefone</label><input id="c-p" className="field" inputMode="tel" required /></div>
              <div><label className="label" htmlFor="c-perf">Perfil</label><select id="c-perf" className="field">{contact.profiles.map((s) => <option key={s}>{s}</option>)}</select></div>
              <div><label className="label" htmlFor="c-size">Número de unidades</label><select id="c-size" className="field">{contact.sizes.map((s) => <option key={s}>{s}</option>)}</select></div>
              <fieldset className="sm:col-span-2">
                <legend className="label">Soluções de interesse</legend>
                <div className="flex flex-wrap gap-2">
                  {contact.interests.map((i) => {
                    const on = interests.includes(i)
                    return <button type="button" key={i} onClick={() => setInterests(on ? interests.filter((x) => x !== i) : [...interests, i])} aria-pressed={on} className={cx('inline-flex items-center gap-1.5 border px-3 py-1.5 text-sm transition', on ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent)/.12)]' : 'border-[rgb(var(--line))] text-muted hover:text-ink')} style={{ borderRadius: 'var(--radius)' }}>{on && <Check size={13} />}{i}</button>
                  })}
                </div>
              </fieldset>
              <div className="sm:col-span-2"><label className="label" htmlFor="c-m">Conte sobre a sua operação (opcional)</label><textarea id="c-m" rows={4} className="field" /></div>
              <label className="flex items-start gap-2 text-xs text-muted sm:col-span-2"><input type="checkbox" required className="mt-0.5 accent-[#66c18c]" /> Concordo com o tratamento dos meus dados para contato comercial, conforme os <PLink to="termos" className="link">termos e políticas</PLink>.</label>
              <button className="btn btn-primary sm:col-span-2 sm:justify-self-start">Solicitar demonstração</button>
            </>
          )}
        </form>
        <div className="space-y-4">
          {contact.channels.map((c, k) => {
            const I = icons[k]
            return <div key={c.label} className="panel flex gap-4 p-5"><I size={18} className="mt-0.5 text-[rgb(var(--accent))]" /><div><p className="text-xs text-muted">{c.label}</p><p className="font-semibold">{c.value}</p><p className="text-xs text-muted">{c.detail}</p></div></div>
          })}
          <div className="panel flex gap-4 p-5"><MapPin size={18} className="mt-0.5 text-[rgb(var(--accent))]" /><p className="text-sm">{contact.address}</p></div>
        </div>
      </div>
    </>
  )
}

/* ═══════════ FAQ / TERMOS ═══════════ */
export function FaqPage() {
  const { PageHeader } = useSkin()
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHeader eyebrow="Ajuda" title="Perguntas frequentes" text="Respostas sobre a plataforma, a implantação e as negociações." crumbs={[{ label: 'Início', to: '' }, { label: 'Perguntas frequentes' }]} />
      <div className="wrap max-w-3xl py-14">
        <div className="border-t border-[rgb(var(--line))]">
          {faq.map((q, k) => (
            <div key={q.q} className="border-b border-[rgb(var(--line))]">
              <button className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={open === k} onClick={() => setOpen(open === k ? -1 : k)}>
                <span className="font-medium">{q.q}</span>
                {open === k ? <Minus size={16} className="shrink-0 text-[rgb(var(--accent))]" /> : <Plus size={16} className="shrink-0 text-muted" />}
              </button>
              <div className={cx('grid transition-all duration-300', open === k ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]')}><p className="overflow-hidden text-sm leading-relaxed text-muted">{q.a}</p></div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">Não encontrou sua dúvida? <PLink to="contato" className="link text-ink">Fale com um especialista</PLink>.</p>
      </div>
    </>
  )
}

export function TermsPage() {
  const { PageHeader } = useSkin()
  return (
    <>
      <PageHeader eyebrow="Institucional" title="Termos e políticas" text="Versão demonstrativa vigente a partir de 01/11/2026." crumbs={[{ label: 'Início', to: '' }, { label: 'Termos e políticas' }]} />
      <div className="wrap grid gap-10 py-14 lg:grid-cols-[220px_1fr]">
        <nav className="hidden h-fit space-y-2 text-sm lg:sticky lg:top-28 lg:block">{terms.map((t, k) => <button key={t.title} onClick={() => document.getElementById(`termo-${k}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="block text-left text-muted hover:text-ink">{t.title}</button>)}</nav>
        <div className="max-w-3xl space-y-8">{terms.map((t, k) => <section key={t.title} id={`termo-${k}`} className="scroll-mt-28"><h2 className="flex items-center gap-2 font-display text-lg font-semibold"><FileText size={16} className="text-muted" />{t.title}</h2><p className="mt-2 text-[15px] leading-relaxed text-muted">{t.text}</p></section>)}</div>
      </div>
    </>
  )
}

/* ═══════════ ACESSO À PLATAFORMA (demonstrativo) ═══════════ */
export function LoginPage() {
  const { PageHeader, id } = useSkin()
  const { user, login, logout, proposals, history } = useStore()
  const [email, setEmail] = useState('mariana@duartemultimarcas.com.br')
  const [pass, setPass] = useState('demo1234')
  const [tab, setTab] = useState<'dashboard' | 'evaluation' | 'auction' | 'offers' | 'stock' | 'intel' | 'conta'>('dashboard')
  if (!user)
    return (
      <>
        <PageHeader eyebrow="Área do cliente" title="Acesse a plataforma" text="Ambiente demonstrativo: os dados de acesso já estão preenchidos." crumbs={[{ label: 'Início', to: '' }, { label: 'Acessar plataforma' }]} />
        <div className="wrap grid gap-10 py-14 lg:grid-cols-2">
          <form className="panel space-y-4 p-6 md:p-8" onSubmit={(e) => (e.preventDefault(), login(email))}>
            <div className="flex items-start gap-3 rounded-md bg-[rgb(var(--ink)/.04)] p-3 text-[13px] text-muted"><Lock size={16} className="mt-0.5 shrink-0" />Acesso exclusivo para empresas cadastradas.</div>
            <div><label className="label" htmlFor="l-e">E-mail</label><input id="l-e" className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><label className="label" htmlFor="l-p">Senha</label><input id="l-p" className="field" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required /></div>
            <button className="btn btn-primary w-full">Entrar</button>
            <p className="text-center text-sm text-muted">Ainda não é cliente? <PLink to="contato" className="link text-ink">Solicitar acesso</PLink></p>
          </form>
          <div className="flex flex-col justify-center">
            <H2>Tudo da sua operação de usados em um só login</H2>
            <ul className="mt-6 space-y-3 text-sm">{solutions.map((s) => { const I = s.icon; return <li key={s.slug} className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[rgb(var(--accent)/.15)] text-[rgb(var(--accent))]"><I size={16} /></span>{s.name}</li> })}</ul>
          </div>
        </div>
      </>
    )
  const tabs = [['dashboard', 'Painel'], ['evaluation', 'Avaliação'], ['auction', 'Sala de lances'], ['offers', 'Negociações'], ['stock', 'Estoque'], ['intel', 'Inteligência'], ['conta', 'Minha conta']] as const
  return (
    <>
      <PageHeader eyebrow="Plataforma demonstrativa" title={`Olá, ${user.name.split(' ')[0]}`} text={`${user.company} · ${user.type}`} crumbs={[{ label: 'Início', to: '' }, { label: 'Plataforma' }]} />
      <div className="wrap py-10">
        <div className="mb-6 flex items-center gap-1 overflow-x-auto border-b border-[rgb(var(--line))] no-scrollbar" role="tablist">
          {tabs.map(([t, l]) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cx('-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition', tab === t ? 'border-[rgb(var(--accent))] text-ink' : 'border-transparent text-muted hover:text-ink')}>{l}</button>)}
          <button onClick={logout} className="ml-auto flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-sm text-muted hover:text-[#c4373b]"><LogOut size={14} /> Sair</button>
        </div>
        <div key={tab} className="page-enter">
          {tab === 'conta' ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
              <div className="panel p-6">
                <h3 className="font-semibold">Perfil da empresa</h3>
                <dl className="mt-4 divide-y divide-[rgb(var(--line))] text-sm">{[['Responsável', user.name], ['Empresa', user.company], ['CNPJ', user.cnpj], ['E-mail', user.email], ['Telefone', user.phone], ['Cidade', user.city], ['Cliente desde', user.memberSince]].map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-muted">{k}</dt><dd className="text-right">{v}</dd></div>)}</dl>
              </div>
              <div className="space-y-6">
                <div className="panel overflow-x-auto"><p className="px-4 pt-4 font-semibold">Minhas propostas e lances</p>
                  <table className="tbl"><thead><tr><th>Protocolo</th><th>Veículo</th><th>Tipo</th><th>Valor</th><th>Status</th></tr></thead><tbody>{proposals.map((p) => { const v = getVehicle(p.vehicleId); return <tr key={p.id}><td className="num text-xs text-muted">{p.id}</td><td>{v?.brand} {v?.model}</td><td>{p.kind}</td><td className="num font-semibold">{brl(p.value)}</td><td><StatusTag status={p.status} /></td></tr> })}</tbody></table>
                </div>
                <div className="panel overflow-x-auto"><p className="px-4 pt-4 font-semibold">Histórico de negociações</p>
                  <table className="tbl"><thead><tr><th>Protocolo</th><th>Veículo</th><th>Valor</th><th>Data</th><th>Status</th></tr></thead><tbody>{history.map((h) => <tr key={h.id}><td className="num text-xs text-muted">{h.id}</td><td>{h.vehicle}</td><td className="num font-semibold">{brl(h.value)}</td><td className="num text-muted">{h.date}</td><td><StatusTag status={h.status} /></td></tr>)}</tbody></table>
                </div>
              </div>
            </div>
          ) : (
            <div className={tab === 'evaluation' ? 'flex justify-center' : ''}><Screen id={tab} dark={isDark(id)} /></div>
          )}
        </div>
      </div>
    </>
  )
}
