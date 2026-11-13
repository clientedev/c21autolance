import { solutions as _sol, segments as _seg } from '../data/content'
import { useState, useEffect, type ReactNode } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, LayoutGrid, MapPin, Star } from 'lucide-react'
import { getVehicle, vehicles, type Vehicle } from '../data/vehicles'
import { proposals, type ProposalId } from '../data/proposals'
import { useStore, useLiveBids } from '../lib/store'
import { useAction, useHref, PLink } from '../shared/ui'
import { cx } from '../lib/format'

export function useVehicleView() {
  const { id = '' } = useParams()
  const v = getVehicle(id)
  const live = useLiveBids(id)
  const action = useAction(id)
  const store = useStore()
  const price = live ? live.current : v?.price ?? 0
  const related = v ? vehicles.filter((x) => x.id !== v.id).sort((a, b) => Number(b.category === v.category) - Number(a.category === v.category)).slice(0, 3) : []
  return { v, live, action, price, related, fav: v ? store.favorites.includes(v.id) : false }
}

export function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Veículo não encontrado</h1>
      <p className="mt-2 text-muted">O anúncio pode ter sido encerrado ou removido.</p>
      <PLink to="catalogo" className="btn btn-primary mt-8">Ver veículos disponíveis</PLink>
    </div>
  )
}

export function LocationCard({ v, className, dark }: { v: Vehicle; className?: string; dark?: boolean }) {
  return (
    <div className={cx('flex gap-4', className)}>
      <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-full', dark ? 'bg-white/10 text-[#66c18c]' : 'bg-[rgb(var(--accent)/.14)] text-[rgb(var(--accent))]')}><MapPin size={18} /></span>
      <div className="text-sm">
        <p className="font-medium">{v.store}</p>
        <p className="text-muted">{v.city} · {v.uf}</p>
        <p className="mt-1 text-xs text-muted">Retirada no pátio da unidade em até 5 dias úteis após a aprovação.</p>
      </div>
    </div>
  )
}

/** Barra discreta para alternar entre as seis propostas */
export function ProposalSwitcher({ current }: { current: ProposalId }) {
  const idx = proposals.findIndex((p) => p.id === current)
  const prev = proposals[(idx + 5) % 6]
  const next = proposals[(idx + 1) % 6]
  const { favoriteConcept, setFavoriteConcept, notify } = useStore()
  const [hidden, setHidden] = useState(false)
  useEffect(() => setHidden(false), [current])
  if (hidden)
    return (
      <button onClick={() => setHidden(false)} className="fixed bottom-4 left-4 z-[70] grid h-10 w-10 place-items-center rounded-full bg-[#0d013a] text-white shadow-lg ring-1 ring-white/15" aria-label="Mostrar navegação entre propostas">
        <LayoutGrid size={16} />
      </button>
    )
  const fav = favoriteConcept === current
  return (
    <div data-switcher className="fixed bottom-4 left-4 z-[70] flex items-center gap-1 rounded-full bg-[#0d013a]/95 p-1 pl-1 text-white shadow-[0_8px_30px_rgba(13,1,58,.35)] ring-1 ring-white/10 backdrop-blur" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Link to="/" className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white"><LayoutGrid size={14} /> <span className="hidden sm:inline">Showroom</span></Link>
      <span className="h-5 w-px bg-white/15" />
      <Link to={`/v/${prev.id}`} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label={`Proposta anterior: ${prev.name}`}><ArrowLeft size={14} /></Link>
      <span className="px-1 text-xs"><span className="num text-[#66c18c]">{proposals[idx].number}</span> <span className="hidden md:inline">{proposals[idx].name}</span></span>
      <Link to={`/v/${next.id}`} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label={`Próxima proposta: ${next.name}`}><ArrowRight size={14} /></Link>
      <span className="h-5 w-px bg-white/15" />
      <button
        onClick={() => {
          setFavoriteConcept(fav ? null : current)
          notify({ title: fav ? 'Proposta desmarcada' : `Proposta ${proposals[idx].number} marcada como favorita`, tone: 'info' })
        }}
        className={cx('rounded-full px-3 py-2 text-xs transition', fav ? 'bg-[#66c18c] text-[#0d013a]' : 'text-white/80 hover:bg-white/10')}
        aria-pressed={fav}
      >
        <span className="flex items-center gap-1.5"><Star size={13} className={fav ? 'fill-current' : ''} />{fav ? 'Favorita' : 'Favoritar'}</span>
      </button>
      <button onClick={() => setHidden(true)} className="grid h-8 w-8 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white" aria-label="Recolher">×</button>
    </div>
  )
}

export function useGo() {
  const nav = useNavigate()
  const href = useHref()
  return (to: string) => nav(href(to))
}

export function Crumbs({ items, className }: { items: { label: string; to?: string }[]; className?: string }) {
  return (
    <nav aria-label="Navegação estrutural" className={cx('flex flex-wrap items-center gap-1.5 text-xs text-muted', className)}>
      {items.map((c, k) => (
        <span key={c.label} className="flex items-center gap-1.5">
          {k > 0 && <span className="opacity-50">/</span>}
          {c.to !== undefined ? <PLink to={c.to} className="hover:text-ink">{c.label}</PLink> : <span className="text-ink">{c.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export type Slot = { children?: ReactNode }

/* ─── Menus de Soluções e Para quem (conteúdo único, estilo por proposta) ─── */
export const menuGroups = [
  { label: 'Soluções', items: _sol.map((s) => ({ to: `solucoes/${s.slug}`, label: s.name, desc: s.short, icon: s.icon })) },
  { label: 'Para quem', items: _seg.map((s) => ({ to: `para/${s.slug}`, label: s.name, desc: s.short, icon: s.icon })) },
]

export function Dropdown({ group, triggerClass, panelClass, itemClass, descClass, iconClass, onNavigate }: { group: (typeof menuGroups)[number]; triggerClass: string; panelClass: string; itemClass: string; descClass?: string; iconClass?: string; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={triggerClass} aria-expanded={open} onClick={() => setOpen((o) => !o)} onFocus={() => setOpen(true)}>
        {group.label}
        <svg width="10" height="10" viewBox="0 0 24 24" className={cx('transition', open && 'rotate-180')} aria-hidden><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
          <div className={cx('fade-in grid w-[560px] grid-cols-2 gap-1 p-2', panelClass)}>
            {group.items.map((i) => {
              const I = i.icon
              return (
                <PLink key={i.to} to={i.to} onClick={() => (setOpen(false), onNavigate?.())} className={cx('flex gap-3 p-3 transition', itemClass)}>
                  <I size={18} className={cx('mt-0.5 shrink-0', iconClass)} />
                  <span><span className="block text-sm font-semibold">{i.label}</span><span className={cx('mt-0.5 line-clamp-2 block text-xs', descClass)}>{i.desc}</span></span>
                </PLink>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
