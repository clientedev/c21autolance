import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { proposals, getProposal, type ProposalId, type ProposalMeta } from '../data/proposals'
import { useStore } from '../lib/store'
import { cx } from '../lib/format'
import { ShowroomShell } from './Showroom'

const views: { id: keyof ProposalMeta['previews']; label: string }[] = [
  { id: 'home', label: 'Página inicial' },
  { id: 'solution', label: 'Página de solução' },
  { id: 'segment', label: 'Página por perfil' },
  { id: 'contact', label: 'Solicitação de demonstração' },
]
const rows: { id: keyof ProposalMeta['traits']; label: string }[] = [
  { id: 'style', label: 'Estilo visual' },
  { id: 'header', label: 'Organização do cabeçalho' },
  { id: 'navigation', label: 'Navegação' },
  { id: 'solutions', label: 'Apresentação das soluções' },
  { id: 'product', label: 'Apresentação do produto' },
  { id: 'conversion', label: 'Chamadas para demonstração' },
  { id: 'experience', label: 'Experiência de utilização' },
]

export default function Compare() {
  const [params, setParams] = useSearchParams()
  const a = (getProposal(params.get('a') ?? '')?.id ?? 'corporativa') as ProposalId
  const b = (getProposal(params.get('b') ?? '')?.id ?? (a === 'saas' ? 'corporativa' : 'saas')) as ProposalId
  const [view, setView] = useState<(typeof views)[number]['id']>('home')
  const { favoriteConcept, setFavoriteConcept, notify } = useStore()
  const set = (k: 'a' | 'b', v: string) => { const n = new URLSearchParams(params); n.set(k, v); setParams(n, { replace: true }) }
  const pair = [getProposal(a)!, getProposal(b)!]
  const fav = (id: ProposalId) => (
    <button onClick={() => (setFavoriteConcept(favoriteConcept === id ? null : id), notify({ title: favoriteConcept === id ? 'Favorita removida' : `Proposta ${getProposal(id)?.number} marcada como favorita`, tone: 'info' }))} aria-pressed={favoriteConcept === id} className={cx('inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition', favoriteConcept === id ? 'border-[#66c18c] bg-[#66c18c]/15 text-[#2f8a57]' : 'border-black/10 hover:border-[#0d013a]')}>
      <Star size={14} className={favoriteConcept === id ? 'fill-current' : ''} /> {favoriteConcept === id ? 'Favorita' : 'Marcar favorita'}
    </button>
  )
  return (
    <ShowroomShell>
      <section className="mx-auto max-w-[1320px] px-6 pt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2b2d8b]">Central de comparação</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Comparar propostas</h1>
        <p className="mt-3 max-w-2xl text-[#6b6f86]">Escolha duas propostas para ver lado a lado. As imagens são capturas reais de cada versão, com o mesmo conteúdo e as mesmas páginas.</p>
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-black/[.08]" role="tablist">
          {views.map((v) => <button key={v.id} role="tab" aria-selected={view === v.id} onClick={() => setView(v.id)} className={cx('-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition', view === v.id ? 'border-[#0d013a]' : 'border-transparent text-[#8a8ea3] hover:text-[#16182e]')}>{v.label}</button>)}
        </div>
      </section>
      <section className="mx-auto grid max-w-[1320px] gap-6 px-6 py-8 lg:grid-cols-2">
        {pair.map((p, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-black/[.07] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[.06] p-4">
              <select value={p.id} onChange={(e) => set(i ? 'b' : 'a', e.target.value)} className="h-9 rounded-md border border-black/10 bg-white px-3 text-sm font-semibold outline-none focus:border-[#66c18c]" aria-label={`Proposta ${i ? 'B' : 'A'}`}>
                {proposals.map((x) => <option key={x.id} value={x.id}>{x.number} · {x.name}</option>)}
              </select>
              <div className="flex gap-2">{fav(p.id)}<Link to={`/v/${p.id}`} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#0d013a] px-3 text-sm font-semibold text-white hover:bg-[#2b2d8b]">Abrir <ArrowRight size={14} /></Link></div>
            </div>
            <div className="h-[560px] overflow-auto bg-[#e9eaf0]"><img key={p.previews[view]} src={p.previews[view]} alt={`${p.name} — ${views.find((v) => v.id === view)?.label}`} className="fade-in w-full" /></div>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-[1320px] px-6">
        <h2 className="text-2xl font-semibold">Visão geral das seis propostas</h2>
        <div className="mt-5 overflow-x-auto rounded-xl border border-black/[.07] bg-white">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-black/[.06]">
                <th className="w-44 p-4" />
                {proposals.map((p) => (
                  <th key={p.id} className="p-4 text-left align-top font-normal">
                    <img src={p.preview} alt="" className="aspect-[16/10] w-full rounded-md border border-black/[.06] object-cover object-top" loading="lazy" />
                    <p className="mt-3 text-xs text-[#8a8ea3]">Proposta {p.number}</p>
                    <p className="font-semibold">{p.name}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">{fav(p.id)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-black/[.05] last:border-0">
                  <th className="p-4 text-left align-top text-xs font-semibold uppercase tracking-wider text-[#8a8ea3]">{r.label}</th>
                  {proposals.map((p) => <td key={p.id} className={cx('p-4 align-top text-[13px] leading-relaxed text-[#4a4f6a]', favoriteConcept === p.id && 'bg-[#66c18c]/[.07]')}>{p.traits[r.id]}</td>)}
                </tr>
              ))}
              <tr><th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-[#8a8ea3]">Tipografia</th>{proposals.map((p) => <td key={p.id} className="p-4 text-[13px] text-[#4a4f6a]">{p.typography}</td>)}</tr>
            </tbody>
          </table>
        </div>
      </section>
    </ShowroomShell>
  )
}
