export type NegotiationStatus = 'Em disputa' | 'Em análise' | 'Contraproposta' | 'Aceita' | 'Recusada' | 'Encerrada' | 'Superado'

export interface ClosedNegotiation {
  id: string
  vehicle: string
  version: string
  year: number
  modality: string
  finalValue: number
  bids: number
  closedAt: string
  result: 'Arrematado' | 'Vendido' | 'Sem lance mínimo'
  city: string
}

export const closedNegotiations: ClosedNegotiation[] = [
  { id: 'L-2610-118', vehicle: 'CAOA Chery Tiggo 7 Pro', version: '1.6 TGDi Max Drive', year: 2024, modality: 'Lance aberto', finalValue: 158500, bids: 14, closedAt: '11/11/2026', result: 'Arrematado', city: 'São Paulo · SP' },
  { id: 'R-2610-087', vehicle: 'CAOA Chery Tiggo 5X Pro', version: '1.5 Turbo Hybrid', year: 2023, modality: 'Repasse B2B', finalValue: 96800, bids: 3, closedAt: '10/11/2026', result: 'Vendido', city: 'Campinas · SP' },
  { id: 'L-2610-102', vehicle: 'CAOA Changan UNI-T', version: '1.5 TGDi', year: 2026, modality: 'Lance aberto', finalValue: 171500, bids: 19, closedAt: '09/11/2026', result: 'Arrematado', city: 'Curitiba · PR' },
  { id: 'V-2610-064', vehicle: 'CAOA Chery Tiggo 8 Pro PHEV', version: 'Super Hybrid', year: 2025, modality: 'Venda direta', finalValue: 214000, bids: 5, closedAt: '08/11/2026', result: 'Vendido', city: 'Belo Horizonte · MG' },
  { id: 'L-2610-095', vehicle: 'CAOA Changan CS75', version: '1.5 TGDi', year: 2026, modality: 'Lance aberto', finalValue: 0, bids: 2, closedAt: '07/11/2026', result: 'Sem lance mínimo', city: 'São Paulo · SP' },
  { id: 'R-2610-071', vehicle: 'CAOA Chery Arrizo 6 Pro', version: '1.5 Turbo Hybrid', year: 2024, modality: 'Repasse B2B', finalValue: 109800, bids: 4, closedAt: '05/11/2026', result: 'Vendido', city: 'Ribeirão Preto · SP' },
]

export interface UserProposal {
  id: string
  vehicleId: string
  kind: 'Lance' | 'Proposta' | 'Interesse'
  value: number
  status: NegotiationStatus
  createdAt: string
  note?: string
}

// Estado inicial demonstrativo do usuário logado
export const seedProposals: UserProposal[] = [
  { id: 'P-88412', vehicleId: 'changan-cs55-phev-2026', kind: 'Proposta', value: 182000, status: 'Contraproposta', createdAt: '12/11/2026 16:42', note: 'Vendedor sugere R$ 186.500 à vista.' },
  { id: 'P-88355', vehicleId: 'changan-uni-t-2026', kind: 'Lance', value: 163500, status: 'Superado', createdAt: '13/11/2026 09:31' },
]

export const seedHistory: { id: string; vehicle: string; value: number; status: 'Aceita' | 'Recusada' | 'Encerrada'; date: string }[] = [
  { id: 'P-87901', vehicle: 'CAOA Chery Tiggo 7 Sport 2023', value: 118900, status: 'Aceita', date: '28/10/2026' },
  { id: 'P-87644', vehicle: 'CAOA Chery Tiggo 5X Pro 2024', value: 108000, status: 'Recusada', date: '19/10/2026' },
  { id: 'P-87210', vehicle: 'CAOA Changan CS55 2026', value: 168000, status: 'Encerrada', date: '02/10/2026' },
]

export const demoUser = {
  name: 'Mariana Duarte',
  company: 'Duarte Multimarcas Ltda.',
  cnpj: '12.345.678/0001-90',
  email: 'mariana@duartemultimarcas.com.br',
  phone: '(11) 98888-2121',
  city: 'São Paulo · SP',
  type: 'Lojista verificado',
  memberSince: 'março de 2025',
}
