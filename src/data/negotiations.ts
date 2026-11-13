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
  { id: 'L-2610-118', vehicle: 'Hyundai Creta', version: '2.0 Prestige', year: 2021, modality: 'Lance aberto', finalValue: 104500, bids: 14, closedAt: '11/11/2026', result: 'Arrematado', city: 'São Paulo · SP' },
  { id: 'R-2610-087', vehicle: 'Chery Tiggo 5x', version: '1.5 Turbo TXS', year: 2022, modality: 'Repasse B2B', finalValue: 96800, bids: 3, closedAt: '10/11/2026', result: 'Vendido', city: 'Campinas · SP' },
  { id: 'L-2610-102', vehicle: 'Hyundai HB20', version: '1.0 Platinum Turbo', year: 2023, modality: 'Lance aberto', finalValue: 78900, bids: 19, closedAt: '09/11/2026', result: 'Arrematado', city: 'Curitiba · PR' },
  { id: 'V-2610-064', vehicle: 'Ford Ranger', version: '3.2 XLT 4x4', year: 2019, modality: 'Venda direta', finalValue: 168000, bids: 5, closedAt: '08/11/2026', result: 'Vendido', city: 'Belo Horizonte · MG' },
  { id: 'L-2610-095', vehicle: 'Subaru Forester', version: '2.0 XS AWD', year: 2018, modality: 'Lance aberto', finalValue: 0, bids: 2, closedAt: '07/11/2026', result: 'Sem lance mínimo', city: 'São Paulo · SP' },
  { id: 'R-2610-071', vehicle: 'Hyundai i30', version: '1.8 GLS', year: 2016, modality: 'Repasse B2B', finalValue: 63500, bids: 4, closedAt: '05/11/2026', result: 'Vendido', city: 'Ribeirão Preto · SP' },
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
  { id: 'P-88412', vehicleId: 'ford-ka-se-2016', kind: 'Proposta', value: 41000, status: 'Contraproposta', createdAt: '12/11/2026 16:42', note: 'Vendedor sugere R$ 42.800 à vista.' },
  { id: 'P-88355', vehicleId: 'hyundai-i30-fastback-2019', kind: 'Lance', value: 96500, status: 'Superado', createdAt: '13/11/2026 09:31' },
]

export const seedHistory: { id: string; vehicle: string; value: number; status: 'Aceita' | 'Recusada' | 'Encerrada'; date: string }[] = [
  { id: 'P-87901', vehicle: 'Hyundai HB20 1.0 Comfort 2022', value: 71500, status: 'Aceita', date: '28/10/2026' },
  { id: 'P-87644', vehicle: 'Chery Tiggo 5x Pro 2023', value: 112000, status: 'Recusada', date: '19/10/2026' },
  { id: 'P-87210', vehicle: 'Ford Ka 1.5 SEL 2020', value: 58200, status: 'Encerrada', date: '02/10/2026' },
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
