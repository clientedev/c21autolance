import { Link } from 'react-router-dom'
import { ArrowRight, Columns2, Star } from 'lucide-react'
import { proposals } from '../data/proposals'
import { useStore } from '../lib/store'
import { Logo, Reveal } from '../shared/ui'
import { cx } from '../lib/format'

export function ShowroomShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#16182e]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <header className="border-b border-black/[.06] bg-white">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3"><Logo className="h-9" /><span className="hidden text-sm text-[#6b6f86] sm:inline">Propostas de design</span></Link>
          <nav className="flex gap-1 text-sm font-medium">
            <Link to="/" className="rounded-md px-3 py-2 hover:bg-black/[.04]">Showroom</Link>
            <Link to="/comparar" className="rounded-md px-3 py-2 hover:bg-black/[.04]">Comparar propostas</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mx-auto max-w-[1320px] px-6 py-10 text-xs text-[#8a8ea3]">C21 AutoLance · Seis propostas de experiência digital · Ambiente demonstrativo</footer>
    </div>
  )
}

export default function Showroom() {
  const { favoriteConcept, setFavoriteConcept, notify } = useStore()
  return (
    <ShowroomShell>
      <section className="relative overflow-hidden bg-[#0d013a] text-white">
        <svg className="absolute right-0 top-0 h-full w-1/2" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><polygon points="35,0 100,0 100,100" fill="#2b2d8b" /><polygon points="70,0 100,0 100,45" fill="#374ea1" /><polygon points="100,72 100,100 74,100" fill="#66c18c" /></svg>
        <div className="relative mx-auto max-w-[1320px] px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#66c18c]">Apresentação de conceitos</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">C21 AutoLance | Escolha seu conceito</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Seis propostas de experiência digital para o futuro do C21 AutoLance. Explore cada versão e escolha o design que melhor representa nossa plataforma.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link to="/comparar" className="inline-flex h-11 items-center gap-2 rounded-md bg-[#66c18c] px-5 font-semibold text-[#0d013a] hover:brightness-105"><Columns2 size={16} /> Comparar propostas</Link>
            {favoriteConcept && <span className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 px-4"><Star size={15} className="fill-[#66c18c] text-[#66c18c]" /> Favorita: {proposals.find((p) => p.id === favoriteConcept)?.number} {proposals.find((p) => p.id === favoriteConcept)?.name}</span>}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1320px] gap-6 px-6 py-14 md:grid-cols-2 xl:grid-cols-3">
        {proposals.map((p, k) => {
          const fav = favoriteConcept === p.id
          return (
            <Reveal key={p.id} delay={k * 70}>
              <article className={cx('group flex h-full flex-col overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(13,1,58,.35)]', fav ? 'border-[#66c18c] ring-2 ring-[#66c18c]/40' : 'border-black/[.07]')}>
                <Link to={`/v/${p.id}`} className="relative block aspect-[16/10] overflow-hidden bg-[#e9eaf0]" aria-label={`Visualizar proposta ${p.number}`}>
                  <img src={p.preview} alt={`Prévia da proposta ${p.number} — ${p.name}`} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  <span className="absolute left-3 top-3 rounded-md bg-[#0d013a] px-2.5 py-1 text-xs font-semibold text-white">Proposta {p.number}</span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div><h2 className="text-xl font-semibold">{p.name}</h2><p className="mt-0.5 text-sm text-[#6b6f86]">{p.concept}</p></div>
                    <button onClick={() => (setFavoriteConcept(fav ? null : p.id), notify({ title: fav ? 'Favorita removida' : `Proposta ${p.number} marcada como favorita`, tone: 'info' }))} aria-pressed={fav} aria-label={fav ? 'Remover favorita' : 'Marcar como favorita'} className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-md border transition', fav ? 'border-[#66c18c] bg-[#66c18c]/15 text-[#2f8a57]' : 'border-black/10 text-[#8a8ea3] hover:text-[#16182e]')}><Star size={16} className={fav ? 'fill-current' : ''} /></button>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#4a4f6a]">{p.description}</p>
                  <p className="mt-3 text-xs text-[#8a8ea3]">Tipografia: {p.typography}</p>
                  <div className="mt-auto flex gap-2 pt-6">
                    <Link to={`/v/${p.id}`} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#0d013a] text-sm font-semibold text-white transition hover:bg-[#2b2d8b]">Visualizar site <ArrowRight size={15} /></Link>
                    <Link to={`/comparar?a=${p.id}`} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-black/10 text-sm font-semibold transition hover:border-[#0d013a]">Comparar proposta</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </section>
    </ShowroomShell>
  )
}
