import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Eye, EyeOff, X, CheckCircle2, AlertTriangle, Info, Pause, Play, ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { media, getVehicle, type Vehicle } from '../data/vehicles'
import type { ProposalId } from '../data/proposals'
import { useStore, useLiveBids } from '../lib/store'
import { brl, countdown, cx, maskMoney, parseMoney, ago } from '../lib/format'
import type { NegotiationStatus } from '../data/negotiations'

/* ─── Contexto da proposta ─── */
export interface Skin {
  id: ProposalId
  base: string
  PageHeader: (p: { eyebrow?: string; title: string; text?: string; crumbs?: { label: string; to?: string }[] }) => JSX.Element
}
export const SkinCtx = createContext<Skin | null>(null)
export const useSkin = () => useContext(SkinCtx)!
export const useHref = () => {
  const { base } = useSkin()
  return (to: string) => (to ? `${base}/${to}` : base)
}

/* ─── Marca ─── */
export function Logo({ tone = 'navy', className = 'h-9' }: { tone?: 'navy' | 'white'; className?: string }) {
  return <img src={media(tone === 'navy' ? 'logo-navy.png' : 'logo-white.png')} alt="C21 AutoLance" className={cx('w-auto select-none', className)} draggable={false} />
}

/* ─── Movimento ─── */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref as never} className={cx('reveal', on && 'in', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

export function CountUp({ value, decimals = 0, prefix = '', suffix = '' }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (reduce) return setN(value)
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400)
        setN(value * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [value])
  return (
    <span ref={ref} className="num">
      {prefix}
      {n.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

export function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.querySelectorAll('[data-scroll-root]').forEach((el) => el.scrollTo({ top: 0 }))
  }, [pathname])
  return null
}

/* ─── Vídeo institucional (arquivo real, gerado a partir das fotos oficiais) ─── */
export function BrandVideo({ className, controlsClass }: { className?: string; controlsClass?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ref.current?.pause()
      setPlaying(false)
    }
  }, [])
  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {})
    else (v.pause(), setPlaying(false))
  }
  return (
    <>
      <video ref={ref} className={className} src={media('c21-institucional.mp4')} poster={media('c21-institucional-poster.webp')} autoPlay muted loop playsInline aria-label="Vídeo institucional C21 AutoLance" />
      <button onClick={toggle} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'} className={cx('grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition hover:bg-black/50', controlsClass)}>
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </>
  )
}

/* ─── Botões de estado ─── */
export function FavButton({ id, className, label }: { id: string; className?: string; label?: boolean }) {
  const { favorites, toggleFavorite } = useStore()
  const on = favorites.includes(id)
  return (
    <button
      onClick={(e) => (e.preventDefault(), e.stopPropagation(), toggleFavorite(id))}
      aria-pressed={on}
      aria-label={on ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className={cx('inline-flex items-center gap-2 transition active:scale-90', className)}
    >
      <Heart size={16} className={cx('transition', on ? 'fill-[#e5484d] text-[#e5484d]' : '')} />
      {label && <span>{on ? 'Favorito' : 'Favoritar'}</span>}
    </button>
  )
}
export function FollowButton({ id, className }: { id: string; className?: string }) {
  const { followed, toggleFollow } = useStore()
  const on = followed.includes(id)
  return (
    <button onClick={() => toggleFollow(id)} aria-pressed={on} className={cx('inline-flex items-center gap-2', className)}>
      {on ? <EyeOff size={16} /> : <Eye size={16} />}
      {on ? 'Deixar de acompanhar' : 'Acompanhar'}
    </button>
  )
}

export function Countdown({ vehicleId, className, prefix }: { vehicleId: string; className?: string; prefix?: string }) {
  const live = useLiveBids(vehicleId)
  if (!live) return null
  const urgent = live.remaining < 30 * 60000
  return (
    <span className={cx('num', className)} data-urgent={urgent}>
      {prefix}
      {countdown(live.remaining)}
    </span>
  )
}

const statusTone: Record<string, string> = {
  'Em disputa': 'bg-[#66c18c]/15 text-[#2f8a57]',
  'Em análise': 'bg-[#374ea1]/12 text-[#374ea1]',
  Contraproposta: 'bg-[#d9a400]/15 text-[#946f00]',
  Aceita: 'bg-[#66c18c]/15 text-[#2f8a57]',
  Arrematado: 'bg-[#66c18c]/15 text-[#2f8a57]',
  Vendido: 'bg-[#66c18c]/15 text-[#2f8a57]',
  Recusada: 'bg-[#e5484d]/12 text-[#c4373b]',
  Superado: 'bg-[#e5484d]/12 text-[#c4373b]',
  Encerrada: 'bg-[#888]/15 text-[#666]',
  'Sem lance mínimo': 'bg-[#888]/15 text-[#666]',
  'Lance aberto': 'bg-[#66c18c]/15 text-[#2f8a57]',
  'Repasse B2B': 'bg-[#374ea1]/12 text-[#374ea1]',
  'Venda direta': 'bg-[#888]/15 text-[#555]',
}
export function StatusTag({ status, className, dark }: { status: NegotiationStatus | string; className?: string; dark?: boolean }) {
  return <span className={cx('tag', dark ? 'bg-white/10 text-white' : statusTone[status] ?? 'bg-black/5', className)}>{status}</span>
}

export function InspectionBar({ score, className }: { score: number; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between text-xs">
        <span className="text-muted">Laudo cautelar</span>
        <span className="num font-semibold">{score}/100</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[rgb(var(--ink)/.08)]">
        <div className="bar-grow h-full rounded-full bg-[rgb(var(--accent))]" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

/* ─── Galeria ─── */
export function Gallery({ v, layout = 'bottom', className, imgClass, aspect = 'aspect-[16/10]' }: { v: Vehicle; layout?: 'bottom' | 'side' | 'grid'; className?: string; imgClass?: string; aspect?: string }) {
  const [i, setI] = useState(0)
  const go = (d: number) => setI((x) => (x + d + v.images.length) % v.images.length)
  if (layout === 'grid')
    return (
      <div className={cx('grid grid-cols-4 grid-rows-2 gap-2', className)}>
        {v.images.slice(0, 3).map((src, k) => (
          <button key={src} onClick={() => setI(k)} className={cx('img-zoom overflow-hidden bg-black/5', k === 0 ? 'col-span-3 row-span-2' : 'col-span-1', imgClass)}>
            <img src={src} alt={`${v.brand} ${v.model} — foto ${k + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    )
  return (
    <div className={cx(layout === 'side' ? 'grid grid-cols-[1fr_88px] gap-3' : 'space-y-3', className)}>
      <div className={cx('group relative overflow-hidden bg-black/5', aspect, imgClass)}>
        {v.images.map((src, k) => (
          <img key={src} src={src} alt={`${v.brand} ${v.model} — foto ${k + 1}`} className={cx('absolute inset-0 h-full w-full object-cover transition-opacity duration-500', k === i ? 'opacity-100' : 'opacity-0')} />
        ))}
        <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between opacity-0 transition group-hover:opacity-100">
          <button onClick={() => go(-1)} aria-label="Foto anterior" className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0d013a] shadow">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Próxima foto" className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0d013a] shadow">
            <ChevronRight size={18} />
          </button>
        </div>
        <span className="num absolute bottom-3 right-3 rounded bg-black/55 px-2 py-0.5 text-[11px] text-white">
          {i + 1}/{v.images.length}
        </span>
      </div>
      <div className={cx(layout === 'side' ? 'flex flex-col gap-3' : 'grid grid-cols-4 gap-3')}>
        {v.images.map((src, k) => (
          <button key={src} onClick={() => setI(k)} aria-label={`Ver foto ${k + 1}`} className={cx('aspect-[4/3] overflow-hidden bg-black/5 transition', imgClass, k === i ? 'ring-2 ring-[rgb(var(--accent))] ring-offset-2 ring-offset-[rgb(var(--bg))]' : 'opacity-70 hover:opacity-100')}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Histórico de lances ─── */
export function BidHistory({ vehicleId, limit = 6, className }: { vehicleId: string; limit?: number; className?: string }) {
  const live = useLiveBids(vehicleId)
  const now = Date.now()
  if (!live) return null
  return (
    <ol className={cx('divide-y divide-[rgb(var(--line))]', className)}>
      {live.bids.slice(0, limit).map((b, k) => (
        <li key={b.at + b.by} className={cx('flex items-center justify-between gap-3 py-2.5 text-sm', b.at > now - 4000 && 'flash')}>
          <span className="flex min-w-0 items-center gap-2">
            <span className={cx('h-1.5 w-1.5 shrink-0 rounded-full', k === 0 ? 'bg-[rgb(var(--accent))]' : 'bg-[rgb(var(--muted)/.5)]')} />
            <span className={cx('truncate', b.mine && 'font-semibold')}>{b.by}</span>
          </span>
          <span className="flex shrink-0 items-baseline gap-3">
            <span className="text-xs text-muted">{ago((now - b.at) / 60000)}</span>
            <span className="num font-semibold">{brl(b.value)}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

/* ─── Notificações ─── */
export function Toaster() {
  const { toasts, dismiss } = useStore()
  const icon = { ok: CheckCircle2, warn: AlertTriangle, info: Info }
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-[min(360px,calc(100vw-40px))] flex-col gap-2" aria-live="polite">
      {toasts.map((t) => {
        const I = icon[t.tone ?? 'info']
        return (
          <div key={t.id} className="toast-in pointer-events-auto flex gap-3 rounded-md border border-black/5 bg-white p-4 text-[#16182e] shadow-[0_8px_30px_rgba(13,1,58,.16)]" style={{ fontFamily: 'var(--font-body)' }}>
            <I size={18} className={t.tone === 'warn' ? 'mt-0.5 text-[#d97706]' : t.tone === 'ok' ? 'mt-0.5 text-[#2f8a57]' : 'mt-0.5 text-[#374ea1]'} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.text && <p className="mt-0.5 text-[13px] text-[#5f6376]">{t.text}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} aria-label="Fechar" className="text-[#9a9db0] hover:text-[#16182e]">
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Modal ─── */
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fade-in fixed inset-0 z-[80] flex items-end justify-center bg-[#0d013a]/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className={cx('sheet-in max-h-[92vh] w-full overflow-auto border border-[rgb(var(--line))] bg-[rgb(var(--surface))] text-ink shadow-2xl', wide ? 'sm:max-w-2xl' : 'sm:max-w-md')} style={{ borderRadius: 'var(--radius)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[rgb(var(--line))] px-6 py-4">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Fechar" className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export function InlineLogin({ onDone }: { onDone?: () => void }) {
  const { login } = useStore()
  const [email, setEmail] = useState('mariana@duartemultimarcas.com.br')
  const [pass, setPass] = useState('demo1234')
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        login(email)
        onDone?.()
      }}
    >
      <div className="flex items-start gap-3 rounded-md bg-[rgb(var(--ink)/.04)] p-3 text-[13px] text-muted">
        <Lock size={16} className="mt-0.5 shrink-0" />
        Entre com sua conta para participar das negociações. Os dados de acesso demonstrativo já estão preenchidos.
      </div>
      <div>
        <label className="label" htmlFor="li-email">E-mail</label>
        <input id="li-email" className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="label" htmlFor="li-pass">Senha</label>
        <input id="li-pass" className="field" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
      </div>
      <button className="btn btn-primary w-full">Entrar</button>
    </form>
  )
}

export type ActionKind = 'bid' | 'proposal' | 'interest'
export function ActionModal({ kind, vehicleId, onClose }: { kind: ActionKind | null; vehicleId: string; onClose: () => void }) {
  const { user, placeBid, sendProposal, registerInterest, minNextBid } = useStore()
  const v = getVehicle(vehicleId)!
  const live = useLiveBids(vehicleId)
  const [value, setValue] = useState('')
  const [note, setNote] = useState('')
  const [payment, setPayment] = useState('À vista')
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (kind === 'bid') setValue(maskMoney(String(minNextBid(vehicleId))))
    if (kind === 'proposal') setValue(maskMoney(String(Math.round((v.price * 0.96) / 100) * 100)))
    setError(null)
  }, [kind])
  const title = kind === 'bid' ? `Dar lance · ${live?.lot}` : kind === 'proposal' ? 'Fazer proposta' : 'Tenho interesse'
  return (
    <Modal open={!!kind} onClose={onClose} title={title}>
      <div className="mb-5 flex items-center gap-4">
        <img src={v.cover} alt="" className="h-16 w-24 object-cover" style={{ borderRadius: 'var(--radius)' }} />
        <div>
          <p className="font-semibold">{v.brand} {v.model}</p>
          <p className="text-sm text-muted">{v.version} · {v.yearFab}/{v.yearModel}</p>
        </div>
      </div>
      {!user ? (
        <InlineLogin />
      ) : kind === 'interest' ? (
        <div className="space-y-4">
          <p className="text-sm text-muted">Um consultor da {v.store} receberá seus dados de contato e retornará em horário comercial.</p>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Nome</dt><dd>{user.name}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Telefone</dt><dd>{user.phone}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">E-mail</dt><dd>{user.email}</dd></div>
          </dl>
          <button className="btn btn-primary w-full" onClick={() => (registerInterest(vehicleId), onClose())}>Confirmar interesse</button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            const n = parseMoney(value)
            if (kind === 'bid') {
              const err = placeBid(vehicleId, n)
              if (err) return setError(err)
            } else {
              if (n < v.price * 0.7) return setError('A proposta deve ser de pelo menos 70% do valor anunciado.')
              sendProposal(vehicleId, n, `${payment}${note ? ' · ' + note : ''}`)
            }
            onClose()
          }}
        >
          {kind === 'bid' && live && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-[rgb(var(--ink)/.04)] p-3"><p className="text-xs text-muted">Lance atual</p><p className="num font-semibold">{brl(live.current)}</p></div>
              <div className="rounded bg-[rgb(var(--ink)/.04)] p-3"><p className="text-xs text-muted">Encerra em</p><p className="num font-semibold">{countdown(live.remaining)}</p></div>
            </div>
          )}
          <div>
            <label className="label" htmlFor="am-v">{kind === 'bid' ? 'Valor do lance' : 'Valor da proposta'}</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">R$</span>
              <input id="am-v" inputMode="numeric" className="field num pl-10 text-base font-semibold" value={value} onChange={(e) => (setValue(maskMoney(e.target.value)), setError(null))} />
            </div>
            {kind === 'bid' ? (
              <div className="mt-2 flex gap-2">
                {[1, 2, 5].map((m) => (
                  <button type="button" key={m} className="btn btn-outline btn-sm flex-1" onClick={() => setValue(maskMoney(String(minNextBid(vehicleId) + (m - 1) * (live?.increment ?? 500))))}>
                    + {brl((live?.increment ?? 500) * m)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-1.5 text-xs text-muted">Anunciado por {brl(v.price)} · FIPE {brl(v.fipe)}</p>
            )}
          </div>
          {kind === 'proposal' && (
            <>
              <div>
                <label className="label" htmlFor="am-p">Forma de pagamento</label>
                <select id="am-p" className="field" value={payment} onChange={(e) => setPayment(e.target.value)}>
                  <option>À vista</option>
                  <option>Financiamento</option>
                  <option>Veículo na troca + diferença</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="am-n">Mensagem ao vendedor (opcional)</label>
                <textarea id="am-n" rows={3} className="field" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex.: retirada na próxima semana" />
              </div>
            </>
          )}
          {error && <p className="text-sm text-[#c4373b]">{error}</p>}
          <button className="btn btn-primary w-full">{kind === 'bid' ? 'Confirmar lance' : 'Enviar proposta'}</button>
          <p className="text-center text-[11px] text-muted">{kind === 'bid' ? 'Lances confirmados são vinculantes conforme os termos de uso.' : 'A proposta é válida por 48 horas.'}</p>
        </form>
      )}
    </Modal>
  )
}

/** Hook para controlar o modal de ação dentro de qualquer layout */
export function useAction(vehicleId: string) {
  const [kind, setKind] = useState<ActionKind | null>(null)
  const modal = <ActionModal kind={kind} vehicleId={vehicleId} onClose={() => setKind(null)} />
  return { open: setKind, modal }
}

/** Link que respeita o prefixo da proposta */
export function PLink({ to, className, children, onClick }: { to: string; className?: string; children: ReactNode; onClick?: () => void }) {
  const href = useHref()
  return (
    <Link to={href(to)} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export function specList(v: Vehicle) {
  return [
    ['Marca', v.brand],
    ['Modelo', v.model],
    ['Versão', v.version],
    ['Ano', `${v.yearFab}/${v.yearModel}`],
    ['Quilometragem', `${v.km.toLocaleString('pt-BR')} km`],
    ['Combustível', v.fuel],
    ['Câmbio', v.transmission],
    ['Motor', v.engine],
    ['Potência', v.power],
    ['Cor', v.color],
    ['Portas', String(v.doors)],
    ['Final da placa', String(v.plateEnd)],
  ] as const
}
