// Telas ilustrativas da plataforma C21 AutoLance (o mesmo produto em todas as propostas).
import { useMemo, useState, type ReactNode } from 'react'
import { LayoutDashboard, ClipboardCheck, Gavel, Handshake, Warehouse, LineChart, Bell, Search, Check, Camera, ChevronRight, Timer, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { media, vehicles, getVehicle } from '../data/vehicles'
import type { ScreenId } from '../data/content'
import { useStore, useLiveBids } from '../lib/store'
import { brl, countdown, cx, ago } from '../lib/format'

const font = { fontFamily: "'DM Sans', system-ui, sans-serif" }
const NAVY = '#0d013a'

/* ─── Molduras ─── */
export function BrowserFrame({ children, path = 'painel', dark, className, active }: { children: ReactNode; path?: string; dark?: boolean; className?: string; active?: ScreenId | 'dashboard' }) {
  const items: [ScreenId | 'dashboard', typeof LayoutDashboard][] = [['dashboard', LayoutDashboard], ['evaluation', ClipboardCheck], ['auction', Gavel], ['offers', Handshake], ['stock', Warehouse], ['intel', LineChart]]
  return (
    <div className={cx('overflow-hidden rounded-xl text-left text-[#16182e] shadow-[0_30px_80px_-30px_rgba(13,1,58,.45)] ring-1', dark ? 'ring-white/10' : 'ring-black/[.08]', className)} style={font}>
      <div className={cx('flex h-9 items-center gap-3 px-3', dark ? 'bg-[#1b1550]' : 'bg-[#eef0f5]')}>
        <div className="flex gap-1.5">{['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}</div>
        <div className={cx('mx-auto flex h-6 w-full max-w-[320px] items-center justify-center rounded-md text-[11px]', dark ? 'bg-white/10 text-white/60' : 'bg-white text-[#7a7f96]')}>app.c21autolance.com.br/{path}</div>
        <div className="w-10" />
      </div>
      <div className="flex bg-[#f4f5f9]">
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-1 bg-[#0d013a] py-3 sm:flex">
          <img src={media('logo-white.png')} alt="" className="mb-3 h-6 w-auto" />
          {items.map(([id, I]) => <span key={id} className={cx('grid h-8 w-8 place-items-center rounded-md', active === id ? 'bg-white/15 text-[#66c18c]' : 'text-white/45')}><I size={15} /></span>)}
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('mx-auto w-[290px] rounded-[38px] bg-[#0d013a] p-2.5 shadow-[0_30px_80px_-30px_rgba(13,1,58,.55)] ring-1 ring-white/10', className)} style={font}>
      <div className="relative overflow-hidden rounded-[30px] bg-[#f4f5f9] text-[#16182e]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0d013a]" />
        {children}
      </div>
    </div>
  )
}

const Top = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="flex items-center justify-between border-b border-[#e3e6ee] bg-white px-4 py-2.5">
    <div><p className="text-[13px] font-semibold">{title}</p>{sub && <p className="text-[10px] text-[#7a7f96]">{sub}</p>}</div>
    <div className="flex items-center gap-2 text-[#7a7f96]"><span className="hidden h-7 w-36 items-center gap-1.5 rounded-md bg-[#f4f5f9] px-2 text-[10px] md:flex"><Search size={11} /> Buscar</span><Bell size={14} /><span className="grid h-6 w-6 place-items-center rounded-full bg-[#2b2d8b] text-[9px] font-semibold text-white">MD</span></div>
  </div>
)
const Kpi = ({ label, value, delta, up }: { label: string; value: string; delta?: string; up?: boolean }) => (
  <div className="rounded-lg border border-[#e3e6ee] bg-white p-2.5">
    <p className="text-[10px] text-[#7a7f96]">{label}</p>
    <p className="num mt-0.5 text-[15px] font-semibold">{value}</p>
    {delta && <p className={cx('mt-0.5 flex items-center gap-0.5 text-[10px] font-medium', up ? 'text-[#2f8a57]' : 'text-[#c4373b]')}>{up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{delta}</p>}
  </div>
)

/* ─── Gráfico de linha simples (uma série, sem legenda) ─── */
function Line({ data, labels, h = 120, format = (n: number) => brl(n) }: { data: number[]; labels: string[]; h?: number; format?: (n: number) => string }) {
  const [hover, setHover] = useState<number | null>(null)
  const min = Math.min(...data) * 0.985, max = Math.max(...data) * 1.01
  const x = (i: number) => (i / (data.length - 1)) * 100
  const y = (v: number) => 100 - ((v - min) / (max - min)) * 100
  const d = data.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  return (
    <div className="relative" style={{ height: h }} onMouseLeave={() => setHover(null)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {[25, 50, 75].map((g) => <line key={g} x1="0" x2="100" y1={g} y2={g} stroke="#e3e6ee" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
        <path d={`${d} L100,100 L0,100 Z`} fill="#374ea1" opacity=".08" />
        <path d={d} fill="none" stroke="#374ea1" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" style={{ strokeDasharray: 400, animation: 'drawLine 1.4s ease both' }} pathLength={400} />
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1="0" y2="100" stroke="#0d013a" strokeOpacity=".25" strokeWidth="1" vectorEffect="non-scaling-stroke" />}
      </svg>
      {hover !== null && <span className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#374ea1]" style={{ left: `${x(hover)}%`, top: `${y(data[hover])}%` }} />}
      {hover !== null && <div className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-[#0d013a] px-2 py-1 text-[10px] text-white" style={{ left: `${Math.min(88, Math.max(12, x(hover)))}%` }}>{labels[hover]} · <span className="num font-semibold">{format(data[hover])}</span></div>}
      <div className="absolute inset-0 flex">{data.map((_, i) => <div key={i} className="flex-1" onMouseEnter={() => setHover(i)} />)}</div>
      <style>{'@keyframes drawLine{from{stroke-dashoffset:400}to{stroke-dashoffset:0}}'}</style>
    </div>
  )
}
const months = ['dez', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov']

/* ─── 1. Avaliação (aplicativo) ─── */
const condFactor = { Excelente: 1, Bom: 0.95, Regular: 0.87 }
export function EvaluationScreen() {
  const [cond, setCond] = useState<keyof typeof condFactor>('Bom')
  const [sent, setSent] = useState(false)
  const base = 116400 * condFactor[cond]
  const r = (n: number) => Math.round(n / 100) * 100
  const checks = ['Frente e traseira', 'Laterais', 'Interior e painel', 'Pneus e rodas', 'Motor', 'Documentos']
  return (
    <PhoneFrame>
      <div className="h-[560px] overflow-hidden">
        <div className="bg-[#0d013a] px-4 pb-3 pt-9 text-white">
          <p className="text-[10px] text-white/60">Avaliação #AV-5841 · Unidade Morumbi</p>
          <p className="text-sm font-semibold">Chery Tiggo 7 1.5 TXS 2022</p>
          <p className="text-[10px] text-white/60">38.420 km · Vermelho · Placa final 7</p>
        </div>
        <div className="space-y-2.5 p-3">
          <div className="grid grid-cols-3 gap-1.5">
            {['tiggo7-2.webp', 'tiggo7-3.webp', 'tiggo7-1.webp'].map((f) => <img key={f} src={media(f)} alt="" className="aspect-square w-full rounded-md object-cover" />)}
          </div>
          <div className="rounded-lg bg-white p-2.5">
            <p className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">Checklist <span className="text-[10px] font-normal text-[#2f8a57]">6/6</span></p>
            <div className="grid grid-cols-2 gap-1">{checks.map((c) => <p key={c} className="flex items-center gap-1 text-[10px] text-[#454a63]"><Check size={10} className="text-[#2f8a57]" />{c}</p>)}</div>
          </div>
          <div className="rounded-lg bg-white p-2.5">
            <p className="mb-1.5 text-[11px] font-semibold">Estado de conservação</p>
            <div className="grid grid-cols-3 gap-1 rounded-md bg-[#f4f5f9] p-0.5">
              {(Object.keys(condFactor) as (keyof typeof condFactor)[]).map((k) => <button key={k} onClick={() => (setCond(k), setSent(false))} className={cx('rounded py-1 text-[10px] font-medium transition', cond === k ? 'bg-[#0d013a] text-white' : 'text-[#5f6376]')}>{k}</button>)}
            </div>
            <p className="mt-2 text-[10px] text-[#7a7f96]">Avaria: para-choque dianteiro · risco leve · R$ 380</p>
          </div>
          <div className="rounded-lg bg-white p-2.5">
            <p className="text-[11px] font-semibold">Preço sugerido</p>
            <p className="num text-xl font-semibold text-[#0d013a] transition-all">{brl(r(base))}</p>
            <div className="relative mt-2 h-1.5 rounded-full bg-[#e3e6ee]"><div className="absolute inset-y-0 left-[15%] right-[15%] rounded-full bg-[#66c18c]" /><div className="absolute -top-1 left-1/2 h-3.5 w-1 -translate-x-1/2 rounded bg-[#0d013a]" /></div>
            <div className="num mt-1.5 flex justify-between text-[10px] text-[#7a7f96]"><span>Mín. {brl(r(base * 0.95))}</span><span>Máx. {brl(r(base * 1.04))}</span></div>
          </div>
          <button onClick={() => setSent(true)} className={cx('flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-semibold transition', sent ? 'bg-[#66c18c] text-[#0d013a]' : 'bg-[#0d013a] text-white')}>{sent ? <><Check size={12} /> Enviado para aprovação</> : <><Camera size={12} /> Enviar para aprovação</>}</button>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ─── 2. Sala de lances ─── */
export function AuctionScreen({ dark, compact }: { dark?: boolean; compact?: boolean }) {
  const lots = vehicles.filter((v) => v.auction)
  const [sel, setSel] = useState(lots[0].id)
  const live = useLiveBids(sel)!
  const v = getVehicle(sel)!
  const { placeBid, minNextBid } = useStore()
  const now = Date.now()
  return (
    <BrowserFrame path="repasse/sala-de-lances" dark={dark} active="auction">
      <Top title="Sala de lances" sub="3 lotes ao vivo · 214 compradores conectados" />
      <div className={cx('grid gap-2.5 p-3', compact ? 'md:grid-cols-[180px_1fr]' : 'md:grid-cols-[210px_1fr]')}>
        <div className="space-y-1.5">
          {lots.map((l) => <LotItem key={l.id} id={l.id} on={l.id === sel} onClick={() => setSel(l.id)} />)}
        </div>
        <div className="rounded-lg border border-[#e3e6ee] bg-white p-3">
          <div className="flex gap-3">
            <img src={v.cover} alt="" className="h-20 w-28 shrink-0 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-[#7a7f96]">Lote {live.lot} · {v.city}/{v.uf}</p>
              <p className="truncate text-[13px] font-semibold">{v.brand} {v.model} {v.version}</p>
              <p className="text-[10px] text-[#7a7f96]">{v.yearFab}/{v.yearModel} · {v.km.toLocaleString('pt-BR')} km · Laudo {v.inspectionScore}/100</p>
              <div className="mt-1.5 flex items-end gap-4">
                <div><p className="text-[10px] text-[#7a7f96]">Lance atual</p><p className="num text-lg font-semibold text-[#2b2d8b]">{brl(live.current)}</p></div>
                <div><p className="text-[10px] text-[#7a7f96]">Encerra em</p><p className={cx('num text-lg font-semibold', live.remaining < 1800000 && 'text-[#c4373b]')}>{countdown(live.remaining)}</p></div>
              </div>
            </div>
          </div>
          <ol className="mt-2.5 divide-y divide-[#eef0f5]">
            {live.bids.slice(0, compact ? 3 : 4).map((b, k) => (
              <li key={b.at + b.by} className={cx('flex items-center justify-between py-1.5 text-[11px]', b.at > now - 4000 && 'flash')}>
                <span className="flex items-center gap-1.5"><span className={cx('h-1.5 w-1.5 rounded-full', k === 0 ? 'bg-[#66c18c]' : 'bg-[#c9ccd8]')} /><span className={b.mine ? 'font-semibold' : ''}>{b.mine ? 'Sua loja' : b.by}</span></span>
                <span className="flex gap-3"><span className="text-[#7a7f96]">{ago((now - b.at) / 60000)}</span><span className="num font-semibold">{brl(b.value)}</span></span>
              </li>
            ))}
          </ol>
          <button onClick={() => placeBid(sel, minNextBid(sel))} disabled={live.remaining <= 0} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#66c18c] py-2 text-[11px] font-semibold text-[#0d013a] transition hover:brightness-105 active:translate-y-px">
            <Gavel size={12} /> Simular lance de {brl(minNextBid(sel))}
          </button>
        </div>
      </div>
    </BrowserFrame>
  )
}
function LotItem({ id, on, onClick }: { id: string; on: boolean; onClick: () => void }) {
  const live = useLiveBids(id)!
  const v = getVehicle(id)!
  return (
    <button onClick={onClick} className={cx('flex w-full items-center gap-2 rounded-lg border p-1.5 text-left transition', on ? 'border-[#2b2d8b] bg-white shadow-sm' : 'border-transparent bg-white/60 hover:bg-white')}>
      <img src={v.cover} alt="" className="h-9 w-12 rounded object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-semibold">{v.brand} {v.model}</span>
        <span className="num block text-[10px] text-[#2b2d8b]">{brl(live.current)}</span>
      </span>
      <span className="num flex items-center gap-0.5 text-[9px] text-[#7a7f96]"><Timer size={9} />{countdown(live.remaining).slice(0, 5)}</span>
    </button>
  )
}

/* ─── 3. Negociações (funil) ─── */
type Deal = { id: string; vehicle: string; value: number; buyer: string; time: string; col: number }
const initialDeals: Deal[] = [
  { id: 'N-1', vehicle: 'Ford Ka 1.0 SE 2016', value: 41000, buyer: 'Lojista #208', time: 'há 12 min', col: 0 },
  { id: 'N-2', vehicle: 'Hyundai i30 1.8 2015', value: 59800, buyer: 'Lojista #154', time: 'há 40 min', col: 0 },
  { id: 'N-3', vehicle: 'Hyundai HB20 1.0 2022', value: 68500, buyer: 'Concessionária #07', time: 'há 1 h', col: 1 },
  { id: 'N-4', vehicle: 'Chery Tiggo 5x 2023', value: 109000, buyer: 'Lojista #331', time: 'há 2 h', col: 2 },
  { id: 'N-5', vehicle: 'Ford Ranger XLT 2019', value: 168000, buyer: 'Lojista #090', time: 'ontem', col: 3 },
  { id: 'N-6', vehicle: 'Hyundai Creta 2.0 2021', value: 104500, buyer: 'Concessionária #12', time: 'ontem', col: 3 },
]
const cols = ['Recebidas', 'Em análise', 'Contraproposta', 'Aceitas']
export function OffersScreen({ dark }: { dark?: boolean }) {
  const [deals, setDeals] = useState(initialDeals)
  const advance = (id: string) => setDeals((d) => d.map((x) => (x.id === id && x.col < 3 ? { ...x, col: x.col + 1, time: 'agora' } : x)))
  return (
    <BrowserFrame path="negociacoes" dark={dark} active="offers">
      <Top title="Ofertas e negociações" sub="Clique em um card para avançar a etapa" />
      <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-4">
        {cols.map((c, i) => {
          const list = deals.filter((d) => d.col === i)
          return (
            <div key={c} className="rounded-lg bg-[#eceef4] p-1.5">
              <p className="flex items-center justify-between px-1 pb-1.5 text-[10px] font-semibold text-[#454a63]">{c}<span className="num rounded-full bg-white px-1.5">{list.length}</span></p>
              <div className="space-y-1.5">
                {list.map((d) => (
                  <button key={d.id} onClick={() => advance(d.id)} className="sheet-in block w-full rounded-md border border-[#e3e6ee] bg-white p-2 text-left transition hover:border-[#2b2d8b]/40">
                    <p className="truncate text-[11px] font-semibold">{d.vehicle}</p>
                    <p className="num text-[12px] font-semibold text-[#2b2d8b]">{brl(d.value)}</p>
                    <p className="mt-0.5 flex justify-between text-[9px] text-[#7a7f96]"><span>{d.buyer}</span><span>{d.time}</span></p>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </BrowserFrame>
  )
}

/* ─── 4. Gestão de estoque ─── */
const stockRows = [
  { v: 'chery-tiggo-7-txs-2022', unit: 'Morumbi', days: 12, vsMarket: -1.8, action: 'Manter' },
  { v: 'ford-explorer-sport-2018', unit: 'Savassi', days: 48, vsMarket: 4.2, action: 'Reprecificar' },
  { v: 'hyundai-i30-gls-2015', unit: 'Cambuí', days: 67, vsMarket: 6.1, action: 'Enviar para repasse' },
  { v: 'ford-ka-se-2016', unit: 'Jd. Irajá', days: 21, vsMarket: -0.6, action: 'Manter' },
  { v: 'hyundai-i30-fastback-2019', unit: 'Batel', days: 35, vsMarket: 2.4, action: 'Publicar em portais' },
]
const aging = [
  { unit: 'Morumbi', a: 22, b: 9, c: 3 },
  { unit: 'Savassi', a: 15, b: 11, c: 6 },
  { unit: 'Batel', a: 18, b: 7, c: 2 },
  { unit: 'Cambuí', a: 12, b: 8, c: 6 },
]
const actTone: Record<string, string> = { Manter: 'bg-[#eceef4] text-[#454a63]', Reprecificar: 'bg-[#fff4d6] text-[#8a6500]', 'Enviar para repasse': 'bg-[#ffe3e3] text-[#b42d31]', 'Publicar em portais': 'bg-[#e4e8fb] text-[#2b2d8b]' }
export function StockScreen({ dark }: { dark?: boolean }) {
  const max = Math.max(...aging.map((r) => r.a + r.b + r.c))
  const seq = ['#b7c0e6', '#5b6cc0', '#2b2d8b']
  return (
    <BrowserFrame path="estoque" dark={dark} active="stock">
      <Top title="Gestão de estoque" sub="Grupo · 4 unidades" />
      <div className="space-y-2.5 p-3">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Kpi label="Veículos em estoque" value="119" delta="8 vs. out" up={false} />
          <Kpi label="Giro médio" value="31 dias" delta="4 dias" up />
          <Kpi label="Capital em estoque" value="R$ 9,8 mi" />
          <Kpi label="Acima de 60 dias" value="17" delta="5 vs. out" up />
        </div>
        <div className="grid gap-2.5 md:grid-cols-[1fr_1.6fr]">
          <div className="rounded-lg border border-[#e3e6ee] bg-white p-2.5">
            <p className="text-[11px] font-semibold">Tempo em estoque por unidade</p>
            <div className="mt-1 flex gap-2.5 text-[9px] text-[#7a7f96]">{['0–30 dias', '31–60', '+60'].map((l, i) => <span key={l} className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: seq[i] }} />{l}</span>)}</div>
            <div className="mt-2 space-y-1.5">
              {aging.map((r) => (
                <div key={r.unit} className="flex items-center gap-2 text-[10px]">
                  <span className="w-14 shrink-0 text-[#5f6376]">{r.unit}</span>
                  <div className="flex h-3 flex-1 gap-[2px]">
                    {[r.a, r.b, r.c].map((n, i) => <div key={i} title={`${n} veículos`} className="bar-grow h-full first:rounded-l last:rounded-r" style={{ width: `${(n / max) * 100}%`, background: seq[i], animationDelay: `${i * 120}ms` }} />)}
                  </div>
                  <span className="num w-5 text-right">{r.a + r.b + r.c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#e3e6ee] bg-white">
            <table className="w-full text-[10px]">
              <thead className="bg-[#f7f8fb] text-left text-[9px] uppercase tracking-wide text-[#7a7f96]"><tr><th className="px-2 py-1.5">Veículo</th><th className="hidden px-2 md:table-cell">Unidade</th><th className="px-2 text-right">Dias</th><th className="px-2 text-right">vs. mercado</th><th className="px-2">Ação</th></tr></thead>
              <tbody>
                {stockRows.map((r) => {
                  const v = getVehicle(r.v)!
                  return (
                    <tr key={r.v} className="border-t border-[#eef0f5]">
                      <td className="px-2 py-1.5"><span className="flex items-center gap-1.5"><img src={v.cover} alt="" className="h-5 w-7 rounded-sm object-cover" /><span className="truncate font-medium">{v.brand} {v.model}</span></span></td>
                      <td className="hidden px-2 text-[#5f6376] md:table-cell">{r.unit}</td>
                      <td className={cx('num px-2 text-right', r.days > 60 && 'font-semibold text-[#b42d31]')}>{r.days}</td>
                      <td className="num px-2 text-right">{r.vsMarket > 0 ? '+' : ''}{r.vsMarket.toLocaleString('pt-BR')}%</td>
                      <td className="px-2"><span className={cx('whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium', actTone[r.action])}>{r.action}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ─── 5. Inteligência de mercado ─── */
const series: Record<string, number[]> = {
  'Chery Tiggo 7 2022': [121800, 121200, 120900, 120100, 119700, 119900, 119200, 118600, 118100, 117900, 117300, 116900],
  'Hyundai HB20 2022': [71200, 71500, 71300, 71900, 72100, 72000, 72600, 72400, 72900, 73300, 73100, 73600],
  'Ford Ka 2016': [44900, 44700, 44800, 44500, 44300, 44400, 44100, 43900, 44000, 43700, 43600, 43500],
}
const liquidity = [
  { model: 'Hyundai HB20', days: 9 },
  { model: 'Ford Ka', days: 11 },
  { model: 'Hyundai Creta', days: 14 },
  { model: 'Chery Tiggo 7', days: 17 },
  { model: 'Ford Ranger', days: 22 },
]
export function IntelScreen({ dark }: { dark?: boolean }) {
  const keys = Object.keys(series)
  const [m, setM] = useState(keys[0])
  const data = series[m]
  const change = useMemo(() => ((data[11] - data[0]) / data[0]) * 100, [data])
  const maxD = 25
  return (
    <BrowserFrame path="inteligencia" dark={dark} active="intel">
      <Top title="Inteligência de mercado" sub="Preço transacional médio · últimos 12 meses" />
      <div className="grid gap-2.5 p-3 md:grid-cols-[1.6fr_1fr]">
        <div className="rounded-lg border border-[#e3e6ee] bg-white p-2.5">
          <div className="flex flex-wrap gap-1">{keys.map((k) => <button key={k} onClick={() => setM(k)} className={cx('rounded-full px-2 py-0.5 text-[10px] font-medium transition', m === k ? 'bg-[#0d013a] text-white' : 'bg-[#f4f5f9] text-[#5f6376]')}>{k}</button>)}</div>
          <div className="mt-2 flex items-end justify-between"><div><p className="text-[10px] text-[#7a7f96]">{m}</p><p className="num text-lg font-semibold">{brl(data[11])}</p></div><p className={cx('num flex items-center text-[11px] font-semibold', change >= 0 ? 'text-[#2f8a57]' : 'text-[#c4373b]')}>{change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{change.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% em 12 meses</p></div>
          <div className="mt-3" key={m}><Line data={data} labels={months} h={110} /></div>
          <div className="mt-1 flex justify-between text-[9px] text-[#9a9db0]">{months.filter((_, i) => i % 2 === 0).map((l) => <span key={l}>{l}</span>)}</div>
        </div>
        <div className="rounded-lg border border-[#e3e6ee] bg-white p-2.5">
          <p className="text-[11px] font-semibold">Liquidez · dias até a venda</p>
          <div className="mt-2 space-y-2">
            {liquidity.map((l, i) => (
              <div key={l.model} className="text-[10px]">
                <div className="flex justify-between"><span>{l.model}</span><span className="num font-semibold">{l.days} dias</span></div>
                <div className="mt-0.5 h-1.5 rounded-full bg-[#eef0f5]"><div className="bar-grow h-full rounded-full bg-[#2b2d8b]" style={{ width: `${(l.days / maxD) * 100}%`, animationDelay: `${i * 90}ms` }} /></div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9px] text-[#9a9db0]">Dados ilustrativos.</p>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ─── Painel geral (hero) ─── */
export function DashboardScreen({ dark }: { dark?: boolean }) {
  const lots = vehicles.filter((v) => v.auction).slice(0, 3)
  return (
    <BrowserFrame path="painel" dark={dark} active="dashboard">
      <Top title="Painel do grupo" sub="Novembro de 2026 · 4 unidades" />
      <div className="space-y-2.5 p-3">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Kpi label="Avaliações no mês" value="412" delta="12% vs. out" up />
          <Kpi label="Taxa de captação" value="38%" delta="3 p.p." up />
          <Kpi label="Repasses concluídos" value="96" delta="18 vs. out" up />
          <Kpi label="Margem bruta usados" value="10,8%" delta="0,6 p.p." up />
        </div>
        <div className="grid gap-2.5 md:grid-cols-[1.5fr_1fr]">
          <div className="rounded-lg border border-[#e3e6ee] bg-white p-2.5">
            <p className="text-[11px] font-semibold">Volume repassado por mês</p>
            <div className="mt-2"><Line data={[62, 58, 71, 69, 74, 80, 77, 85, 83, 88, 91, 96]} labels={months} h={96} format={(n) => `${n} veículos`} /></div>
          </div>
          <div className="rounded-lg border border-[#e3e6ee] bg-white p-2.5">
            <p className="flex items-center justify-between text-[11px] font-semibold">Lotes ao vivo <span className="flex items-center gap-1 text-[9px] font-medium text-[#2f8a57]"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#66c18c] text-[#66c18c]" />ao vivo</span></p>
            <div className="mt-1.5 space-y-1">{lots.map((l) => <MiniLot key={l.id} id={l.id} />)}</div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
function MiniLot({ id }: { id: string }) {
  const live = useLiveBids(id)!
  const v = getVehicle(id)!
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <img src={v.cover} alt="" className="h-7 w-10 rounded object-cover" />
      <span className="min-w-0 flex-1 truncate font-medium">{v.brand} {v.model}</span>
      <span className="num font-semibold text-[#2b2d8b]">{brl(live.current)}</span>
      <span className="num w-12 text-right text-[#7a7f96]">{countdown(live.remaining).slice(0, 5)}</span>
      <ChevronRight size={10} className="text-[#c9ccd8]" />
    </div>
  )
}

export function Screen({ id, dark }: { id: ScreenId | 'dashboard'; dark?: boolean }) {
  if (id === 'evaluation') return <EvaluationScreen />
  if (id === 'auction') return <AuctionScreen dark={dark} />
  if (id === 'offers') return <OffersScreen dark={dark} />
  if (id === 'stock') return <StockScreen dark={dark} />
  if (id === 'intel') return <IntelScreen dark={dark} />
  return <DashboardScreen dark={dark} />
}
export { NAVY }
