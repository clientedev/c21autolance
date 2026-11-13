import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { vehicles, getVehicle, type Bid } from '../data/vehicles'
import { seedProposals, seedHistory, demoUser, type UserProposal } from '../data/negotiations'
import type { ProposalId } from '../data/proposals'
import { brl } from './format'

export interface LiveBid extends Bid { at: number }
export interface LiveAuction { endsAt: number; bids: LiveBid[]; increment: number; startPrice: number; lot: string }
export interface Toast { id: number; title: string; text?: string; tone?: 'ok' | 'warn' | 'info' }
export type User = typeof demoUser
export interface Evaluation { id: string; label: string; min: number; max: number; date: string }

interface Store {
  user: User | null
  login: (email: string) => void
  register: (name: string, email: string, company: string) => void
  logout: () => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  followed: string[]
  toggleFollow: (id: string) => void
  proposals: UserProposal[]
  history: typeof seedHistory
  auctions: Record<string, LiveAuction>
  currentValue: (vehicleId: string) => number
  minNextBid: (vehicleId: string) => number
  placeBid: (vehicleId: string, value: number) => string | null
  sendProposal: (vehicleId: string, value: number, note?: string) => void
  registerInterest: (vehicleId: string) => void
  cancelProposal: (id: string) => void
  evaluations: Evaluation[]
  addEvaluation: (e: Omit<Evaluation, 'id' | 'date'>) => void
  favoriteConcept: ProposalId | null
  setFavoriteConcept: (id: ProposalId | null) => void
  toasts: Toast[]
  notify: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

const Ctx = createContext<Store | null>(null)

const read = <T,>(k: string, fallback: T): T => {
  try {
    const v = localStorage.getItem('c21:' + k)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem('c21:' + k, JSON.stringify(v))
  } catch {
    /* armazenamento indisponível */
  }
}
const stamp = () => new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')

function initialAuctions(): Record<string, LiveAuction> {
  const now = Date.now()
  const out: Record<string, LiveAuction> = {}
  for (const v of vehicles) {
    if (!v.auction) continue
    out[v.id] = {
      lot: v.auction.lot,
      increment: v.auction.increment,
      startPrice: v.auction.startPrice,
      endsAt: now + v.auction.endsInMinutes * 60000,
      bids: v.auction.bids.map((b) => ({ ...b, at: now - b.minutesAgo * 60000 })),
    }
  }
  return out
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => read('user', null))
  const [favorites, setFavorites] = useState<string[]>(() => read('favorites', ['chery-tiggo-7-txs-2022']))
  const [followed, setFollowed] = useState<string[]>(() => read('followed', ['hyundai-i30-fastback-2019', 'ford-explorer-sport-2018']))
  const [proposals, setProposals] = useState<UserProposal[]>(() => read('proposals', seedProposals))
  const [evaluations, setEvaluations] = useState<Evaluation[]>(() => read('evaluations', []))
  const [favoriteConcept, setFC] = useState<ProposalId | null>(() => read('concept', null))
  const [auctions, setAuctions] = useState(initialAuctions)
  const [toasts, setToasts] = useState<Toast[]>([])
  const rivalDone = useRef<Record<string, boolean>>({})
  const tid = useRef(1)

  useEffect(() => write('user', user), [user])
  useEffect(() => write('favorites', favorites), [favorites])
  useEffect(() => write('followed', followed), [followed])
  useEffect(() => write('proposals', proposals), [proposals])
  useEffect(() => write('evaluations', evaluations), [evaluations])
  useEffect(() => write('concept', favoriteConcept), [favoriteConcept])

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const notify = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = tid.current++
      setToasts((all) => [...all.slice(-2), { ...t, id }])
      setTimeout(() => dismiss(id), 5200)
    },
    [dismiss],
  )

  const currentValue = useCallback(
    (vid: string) => {
      const a = auctions[vid]
      if (a) return a.bids.length ? Math.max(...a.bids.map((b) => b.value)) : a.startPrice
      return getVehicle(vid)?.price ?? 0
    },
    [auctions],
  )
  const minNextBid = useCallback(
    (vid: string) => {
      const a = auctions[vid]
      return a ? currentValue(vid) + a.increment : currentValue(vid)
    },
    [auctions, currentValue],
  )

  const placeBid = (vid: string, value: number) => {
    const a = auctions[vid]
    const v = getVehicle(vid)
    if (!a || !v) return 'Lote indisponível.'
    if (Date.now() > a.endsAt) return 'Este lote já foi encerrado.'
    const min = minNextBid(vid)
    if (value < min) return `O lance mínimo é ${brl(min)}.`
    const now = Date.now()
    setAuctions((all) => ({ ...all, [vid]: { ...a, bids: [{ by: 'Você', value, minutesAgo: 0, at: now, mine: true }, ...a.bids] } }))
    const pid = `P-${Math.floor(88500 + Math.random() * 400)}`
    setProposals((p) => [
      { id: pid, vehicleId: vid, kind: 'Lance', value, status: 'Em disputa', createdAt: stamp() },
      ...p.map((x) => (x.vehicleId === vid && x.kind === 'Lance' && x.status !== 'Superado' ? { ...x, status: 'Superado' as const } : x)),
    ])
    setFollowed((f) => (f.includes(vid) ? f : [...f, vid]))
    notify({ title: 'Lance registrado', text: `${brl(value)} no lote ${a.lot}. Você é o maior lance.`, tone: 'ok' })
    // Comportamento demonstrativo: um concorrente responde uma única vez por lote.
    if (!rivalDone.current[vid] && a.endsAt - now > 90000) {
      rivalDone.current[vid] = true
      setTimeout(() => {
        const rival = value + a.increment
        setAuctions((all) => {
          const cur = all[vid]
          return { ...all, [vid]: { ...cur, bids: [{ by: 'Concessionária #12', value: rival, minutesAgo: 0, at: Date.now() }, ...cur.bids] } }
        })
        setProposals((p) => p.map((x) => (x.id === pid ? { ...x, status: 'Superado' } : x)))
        notify({ title: 'Seu lance foi superado', text: `Novo lance de ${brl(rival)} em ${v.brand} ${v.model}.`, tone: 'warn' })
      }, 9000)
    }
    return null
  }

  const sendProposal = (vid: string, value: number, note?: string) => {
    const v = getVehicle(vid)
    setProposals((p) => [{ id: `P-${Math.floor(88500 + Math.random() * 400)}`, vehicleId: vid, kind: 'Proposta', value, status: 'Em análise', createdAt: stamp(), note }, ...p])
    notify({ title: 'Proposta enviada', text: `${brl(value)} para ${v?.brand} ${v?.model}. Resposta em até 48 h.`, tone: 'ok' })
  }
  const registerInterest = (vid: string) => {
    const v = getVehicle(vid)
    if (proposals.some((p) => p.vehicleId === vid && p.kind === 'Interesse')) {
      notify({ title: 'Interesse já registrado', text: 'Um consultor entrará em contato em breve.', tone: 'info' })
      return
    }
    setProposals((p) => [{ id: `I-${Math.floor(31000 + Math.random() * 900)}`, vehicleId: vid, kind: 'Interesse', value: v?.price ?? 0, status: 'Em análise', createdAt: stamp() }, ...p])
    setFollowed((f) => (f.includes(vid) ? f : [...f, vid]))
    notify({ title: 'Interesse registrado', text: `Um consultor da ${v?.store} entrará em contato.`, tone: 'ok' })
  }
  const cancelProposal = (id: string) => {
    setProposals((p) => p.filter((x) => x.id !== id))
    notify({ title: 'Proposta cancelada', tone: 'info' })
  }

  const value: Store = {
    user,
    login: (email) => {
      setUser({ ...demoUser, email: email || demoUser.email })
      notify({ title: `Bem-vinda, ${demoUser.name.split(' ')[0]}`, text: 'Sessão demonstrativa iniciada.', tone: 'ok' })
    },
    register: (name, email, company) => {
      setUser({ ...demoUser, name: name || demoUser.name, email: email || demoUser.email, company: company || demoUser.company, type: 'Cadastro em análise' })
      notify({ title: 'Cadastro recebido', text: 'Seu CNPJ será validado em até 1 dia útil.', tone: 'ok' })
    },
    logout: () => {
      setUser(null)
      notify({ title: 'Sessão encerrada', tone: 'info' })
    },
    favorites,
    toggleFavorite: (id) => {
      const on = !favorites.includes(id)
      setFavorites((f) => (on ? [...f, id] : f.filter((x) => x !== id)))
      notify({ title: on ? 'Adicionado aos favoritos' : 'Removido dos favoritos', tone: 'info' })
    },
    followed,
    toggleFollow: (id) => {
      const on = !followed.includes(id)
      setFollowed((f) => (on ? [...f, id] : f.filter((x) => x !== id)))
      notify({ title: on ? 'Acompanhando veículo' : 'Deixou de acompanhar', text: on ? 'Você será avisado sobre novos lances.' : undefined, tone: 'info' })
    },
    proposals,
    history: seedHistory,
    auctions,
    currentValue,
    minNextBid,
    placeBid,
    sendProposal,
    registerInterest,
    cancelProposal,
    evaluations,
    addEvaluation: (e) => setEvaluations((all) => [{ ...e, id: `AV-${Math.floor(5200 + Math.random() * 700)}`, date: stamp() }, ...all]),
    favoriteConcept,
    setFavoriteConcept: setFC,
    toasts,
    notify,
    dismiss,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => {
  const s = useContext(Ctx)
  if (!s) throw new Error('StoreProvider ausente')
  return s
}

export function useNow(interval = 1000) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), interval)
    return () => clearInterval(t)
  }, [interval])
  return now
}

export function useLiveBids(vehicleId: string) {
  const { auctions } = useStore()
  const now = useNow()
  const a = auctions[vehicleId]
  return useMemo(() => {
    if (!a) return null
    const bids = [...a.bids].sort((x, y) => y.value - x.value)
    return {
      ...a,
      bids,
      remaining: a.endsAt - now,
      current: bids[0]?.value ?? a.startPrice,
      leaderIsMe: !!bids[0]?.mine,
      count: bids.length,
    }
  }, [a, now])
}
