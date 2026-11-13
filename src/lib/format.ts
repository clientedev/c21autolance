export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
export const num = (n: number) => n.toLocaleString('pt-BR')
export const km = (n: number) => `${n.toLocaleString('pt-BR')} km`
export const pad = (n: number) => String(n).padStart(2, '0')
export function countdown(ms: number) {
  if (ms <= 0) return 'Encerrado'
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return `${pad(h)}:${pad(m)}:${pad(s % 60)}`
}
export function countdownParts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return { h: pad(Math.floor(s / 3600)), m: pad(Math.floor((s % 3600) / 60)), s: pad(s % 60) }
}
export const ago = (minutes: number) => {
  if (minutes < 1) return 'agora'
  if (minutes < 60) return `há ${Math.round(minutes)} min`
  const h = Math.floor(minutes / 60)
  return `há ${h} h${minutes % 60 ? ` ${Math.round(minutes % 60)} min` : ''}`
}
export const published = (days: number) => (days === 0 ? 'Publicado hoje' : days === 1 ? 'Publicado ontem' : `Publicado há ${days} dias`)
export const fipeDiff = (price: number, fipe: number) => Math.round(((fipe - price) / fipe) * 1000) / 10
export const cx = (...c: (string | number | false | null | undefined)[]) => c.filter(Boolean).join(' ')
export const parseMoney = (s: string) => Number(String(s).replace(/\D/g, '')) || 0
export const maskMoney = (s: string) => {
  const n = parseMoney(s)
  return n ? n.toLocaleString('pt-BR') : ''
}
