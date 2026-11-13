// Base de dados central — qualquer alteração aqui reflete nas seis propostas.
export const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`

export type Category = 'SUV' | 'Hatch' | 'Sedã e Fastback'
export type Modality = 'Lance aberto' | 'Repasse B2B' | 'Venda direta'

export interface Bid { by: string; value: number; minutesAgo: number; mine?: boolean }

export interface Auction {
  lot: string
  startPrice: number
  increment: number
  /** minutos a partir do carregamento da página */
  endsInMinutes: number
  bids: Bid[]
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  version: string
  yearFab: number
  yearModel: number
  km: number
  price: number
  fipe: number
  city: string
  uf: string
  category: Category
  modality: Modality
  fuel: string
  transmission: string
  color: string
  engine: string
  power: string
  doors: number
  plateEnd: number
  inspectionScore: number
  store: string
  publishedDaysAgo: number
  featured: boolean
  cover: string
  images: string[]
  cutout?: string
  description: string
  features: string[]
  conditions: string[]
  auction?: Auction
}

export const vehicles: Vehicle[] = [
  {
    id: 'tiggo-7-pro-2025', brand: 'CAOA Chery', model: 'Tiggo 7 Pro', version: '1.6 TGDi Max Drive DCT', yearFab: 2024, yearModel: 2025,
    km: 18420, price: 164900, fipe: 171300, city: 'São Paulo', uf: 'SP', category: 'SUV', modality: 'Lance aberto', fuel: 'Gasolina',
    transmission: 'Automático DCT 7', color: 'Azul', engine: '1.6 TGDi', power: '180 cv', doors: 4, plateEnd: 7, inspectionScore: 96,
    store: 'Unidade Morumbi', publishedDaysAgo: 1, featured: true, cover: media('caoa/tiggo7-night.webp'),
    images: [media('caoa/tiggo7-night.webp'), media('caoa/tiggo7-interior.webp'), media('caoa/tiggo7-seats.webp')],
    description: 'SUV médio com único dono e revisões na rede autorizada. Pacote Max Drive completo, teto panorâmico e som premium Sony.',
    features: ['Teto solar panorâmico', 'Som premium Sony', 'Piloto automático adaptativo', 'Frenagem autônoma (AEB)', 'Rodas diamantadas 19"', 'Lanternas Matrix Full LED'],
    conditions: ['Incremento mínimo de R$ 500', 'Laudo cautelar disponível', 'Transferência inclusa para lojistas', 'Retirada em até 5 dias úteis'],
    auction: { lot: 'L-2611-014', startPrice: 148000, increment: 500, endsInMinutes: 46, bids: [
      { by: 'Concessionária #12', value: 156500, minutesAgo: 4 }, { by: 'Lojista #208', value: 156000, minutesAgo: 9 },
      { by: 'Concessionária #03', value: 154500, minutesAgo: 21 }, { by: 'Lojista #077', value: 151000, minutesAgo: 38 }, { by: 'Lojista #208', value: 148000, minutesAgo: 62 } ] },
  },
  {
    id: 'tiggo-8-pro-phev-2025', brand: 'CAOA Chery', model: 'Tiggo 8 Pro PHEV', version: '1.5 Turbo Super Hybrid DHT', yearFab: 2025, yearModel: 2025,
    km: 12780, price: 219900, fipe: 229500, city: 'Belo Horizonte', uf: 'MG', category: 'SUV', modality: 'Lance aberto', fuel: 'Híbrido plug-in',
    transmission: 'DHT', color: 'Preto', engine: '1.5 Turbo + 2 elétricos', power: '279 cv', doors: 4, plateEnd: 2, inspectionScore: 97,
    store: 'Unidade Savassi', publishedDaysAgo: 2, featured: true, cover: media('caoa/tiggo9-hero.webp'),
    images: [media('caoa/tiggo9-hero.webp'), media('caoa/tiggo8-cockpit.webp')],
    description: 'SUV de sete lugares híbrido plug-in, com bateria em garantia de fábrica e histórico de recargas registrado.',
    features: ['7 lugares', 'Câmera 540º HD', 'Som Sony 12 alto-falantes', 'Carregador wireless 50W', 'Max Drive 2.0', '9 airbags'],
    conditions: ['Incremento mínimo de R$ 1.000', 'Garantia de bateria vigente', 'Aceita veículo na troca', 'Financiamento mediante análise'],
    auction: { lot: 'L-2611-022', startPrice: 198000, increment: 1000, endsInMinutes: 128, bids: [
      { by: 'Lojista #154', value: 207000, minutesAgo: 12 }, { by: 'Concessionária #07', value: 205000, minutesAgo: 33 }, { by: 'Lojista #154', value: 201000, minutesAgo: 71 } ] },
  },
  {
    id: 'changan-uni-t-2026', brand: 'CAOA Changan', model: 'UNI-T', version: '1.5 TGDi Turbo Flex', yearFab: 2026, yearModel: 2026,
    km: 6930, price: 174900, fipe: 182000, city: 'Curitiba', uf: 'PR', category: 'SUV', modality: 'Lance aberto', fuel: 'Flex',
    transmission: 'Automático', color: 'Azul', engine: '1.5 TGDi', power: '188 cv', doors: 4, plateEnd: 5, inspectionScore: 98,
    store: 'Unidade Batel', publishedDaysAgo: 3, featured: true, cover: media('caoa/unit-grille.webp'),
    images: [media('caoa/unit-grille.webp'), media('caoa/unit-roof.webp'), media('caoa/unit-wheel.webp'), media('caoa/unit-roof.webp')],
    description: 'Crossover de design esportivo praticamente zero quilômetro, com cockpit integrado de 25" e teto panorâmico Sky View.',
    features: ['Cockpit integrado 25"', 'Teto panorâmico Sky View', 'Rodas aro 20"', 'Visão 360º', 'Monitoramento de ponto cego', 'Carregamento por indução'],
    conditions: ['Incremento mínimo de R$ 500', 'Garantia de fábrica vigente', 'Transferência inclusa para lojistas', 'Entrega com tanque cheio'],
    auction: { lot: 'L-2611-031', startPrice: 158000, increment: 500, endsInMinutes: 19, bids: [
      { by: 'Lojista #331', value: 166500, minutesAgo: 2 }, { by: 'Concessionária #12', value: 166000, minutesAgo: 6 },
      { by: 'Lojista #090', value: 163500, minutesAgo: 15 }, { by: 'Lojista #331', value: 160000, minutesAgo: 27 } ] },
  },
  {
    id: 'tiggo-5x-pro-2024', brand: 'CAOA Chery', model: 'Tiggo 5X Pro', version: '1.5 Turbo Hybrid CVT', yearFab: 2023, yearModel: 2024,
    km: 34100, price: 109900, fipe: 115400, city: 'Campinas', uf: 'SP', category: 'SUV', modality: 'Repasse B2B', fuel: 'Híbrido leve',
    transmission: 'CVT', color: 'Prata', engine: '1.5 Turbo', power: '150 cv', doors: 4, plateEnd: 9, inspectionScore: 93,
    store: 'Unidade Cambuí', publishedDaysAgo: 4, featured: false, cover: media('caoa/tiggo5x-night.webp'),
    images: [media('caoa/tiggo5x-night.webp'), media('caoa/tiggo5x-studio.webp'), media('caoa/tiggo5x-screen.webp')],
    description: 'SUV compacto recebido na troca, revisado e com pneus novos. Indicado para lojistas com foco em giro rápido.',
    features: ['7 airbags', 'Teto panorâmico', 'Painel integrado 20,5"', 'Câmera 360º', 'Ar digital dual zone', 'Rodas 18"'],
    conditions: ['Preço exclusivo para CNPJ cadastrado', 'Pagamento à vista ou TED em 48 h', 'Veículo no estado, com laudo', 'Retirada no pátio de Campinas'],
  },
  {
    id: 'changan-cs55-phev-2026', brand: 'CAOA Changan', model: 'CS55 PHEV', version: 'Ultra-Hybrid iDE-H', yearFab: 2026, yearModel: 2026,
    km: 4210, price: 189900, fipe: 196500, city: 'Ribeirão Preto', uf: 'SP', category: 'SUV', modality: 'Venda direta', fuel: 'Híbrido plug-in',
    transmission: 'DHT', color: 'Branco', engine: '1.5 Turbo Flex + elétricos', power: '—', doors: 4, plateEnd: 4, inspectionScore: 99,
    store: 'Unidade Jardim Irajá', publishedDaysAgo: 0, featured: false, cover: media('caoa/cs55-duo.webp'),
    images: [media('caoa/cs55-duo.webp'), media('caoa/cs55-cockpit.webp'), media('caoa/cs55-engine.webp')],
    description: 'SUV híbrido plug-in flex com baixíssima quilometragem, garantia de fábrica e manual completo.',
    features: ['Dual Screen Cockpit 24,9"', 'Teto solar panorâmico', 'Porta-malas de 525 L', 'Vision System', 'Frenagem autônoma', '6 airbags'],
    conditions: ['Aceita proposta abaixo do anúncio', 'Financiamento em até 60 vezes', 'Garantia de fábrica vigente', 'IPVA 2026 quitado'],
  },
]

export const getVehicle = (id: string) => vehicles.find((v) => v.id === id)
export const vehicleTitle = (v: Vehicle) => `${v.brand} ${v.model}`
export const brands = Array.from(new Set(vehicles.map((v) => v.brand))).sort()
export const modelsByBrand = (brand?: string) =>
  Array.from(new Set(vehicles.filter((v) => !brand || v.brand === brand).map((v) => v.model))).sort()
export const categories: { id: Category; label: string; description: string }[] = [
  { id: 'SUV', label: 'SUV', description: 'Utilitários esportivos e crossovers' },
  { id: 'Hatch', label: 'Hatch', description: 'Compactos e médios urbanos' },
  { id: 'Sedã e Fastback', label: 'Sedã e Fastback', description: 'Sedãs executivos e fastbacks' },
]
export const modalities: { id: Modality; label: string; description: string }[] = [
  { id: 'Lance aberto', label: 'Lance aberto', description: 'Disputa por tempo limitado com lances em tempo real' },
  { id: 'Repasse B2B', label: 'Repasse B2B', description: 'Valores exclusivos para lojistas e concessionárias' },
  { id: 'Venda direta', label: 'Venda direta', description: 'Preço anunciado, aberto a propostas' },
]
export const years = Array.from(new Set(vehicles.map((v) => v.yearModel))).sort()
