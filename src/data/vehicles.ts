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
    id: 'chery-tiggo-7-txs-2022',
    brand: 'Chery',
    model: 'Tiggo 7',
    version: '1.5 TXS Turbo CVT',
    yearFab: 2021,
    yearModel: 2022,
    km: 38420,
    price: 118900,
    fipe: 124350,
    city: 'São Paulo',
    uf: 'SP',
    category: 'SUV',
    modality: 'Lance aberto',
    fuel: 'Flex',
    transmission: 'Automático CVT',
    color: 'Vermelho Rubi',
    engine: '1.5 Turbo 16V',
    power: '150 cv',
    doors: 4,
    plateEnd: 7,
    inspectionScore: 94,
    store: 'Unidade Morumbi',
    publishedDaysAgo: 1,
    featured: true,
    cover: media('tiggo7-1.webp'),
    images: [media('tiggo7-1.webp'), media('tiggo7-2.webp'), media('tiggo7-3.webp'), media('tiggo7-hero.webp')],
    description:
      'SUV médio com único dono, revisões em concessionária e laudo cautelar aprovado. Interior em couro preto sem marcas de uso, pneus com mais de 70% de vida útil e manual completo.',
    features: ['Teto solar panorâmico', 'Central multimídia 9"', 'Câmera 360°', 'Bancos em couro', 'Partida sem chave', 'Ar digital dual zone'],
    conditions: ['Lance mínimo com incremento de R$ 500', 'Laudo cautelar disponível para download', 'Transferência inclusa para lojistas cadastrados', 'Retirada em até 5 dias úteis após aprovação'],
    auction: {
      lot: 'L-2611-014',
      startPrice: 105000,
      increment: 500,
      endsInMinutes: 46,
      bids: [
        { by: 'Concessionária #12', value: 112500, minutesAgo: 4 },
        { by: 'Lojista #208', value: 112000, minutesAgo: 9 },
        { by: 'Concessionária #03', value: 110500, minutesAgo: 21 },
        { by: 'Lojista #077', value: 108000, minutesAgo: 38 },
        { by: 'Lojista #208', value: 105000, minutesAgo: 62 },
      ],
    },
  },
  {
    id: 'ford-explorer-sport-2018',
    brand: 'Ford',
    model: 'Explorer',
    version: '3.5 V6 Sport EcoBoost 4WD',
    yearFab: 2018,
    yearModel: 2018,
    km: 67210,
    price: 189900,
    fipe: 197800,
    city: 'Belo Horizonte',
    uf: 'MG',
    category: 'SUV',
    modality: 'Lance aberto',
    fuel: 'Gasolina',
    transmission: 'Automático 6 marchas',
    color: 'Cinza Magnetic',
    engine: '3.5 V6 Biturbo',
    power: '370 cv',
    doors: 4,
    plateEnd: 2,
    inspectionScore: 89,
    store: 'Unidade Savassi',
    publishedDaysAgo: 2,
    featured: true,
    cover: media('explorer-1.webp'),
    images: [media('explorer-1.webp'), media('explorer-2.webp'), media('explorer-3.webp'), media('explorer-hero.webp')],
    description:
      'SUV de sete lugares com tração integral e motor V6 biturbo. Histórico de manutenção completo, sem passagem por leilão e com garantia de motor e câmbio de 90 dias.',
    features: ['7 lugares', 'Tração 4WD inteligente', 'Som Sony 12 alto-falantes', 'Piloto automático adaptativo', 'Bancos com aquecimento', 'Tampa traseira elétrica'],
    conditions: ['Lance mínimo com incremento de R$ 1.000', 'Garantia de motor e câmbio por 90 dias', 'Aceita veículo na troca mediante avaliação', 'Financiamento com parceiros mediante análise'],
    auction: {
      lot: 'L-2611-022',
      startPrice: 170000,
      increment: 1000,
      endsInMinutes: 128,
      bids: [
        { by: 'Lojista #154', value: 178000, minutesAgo: 12 },
        { by: 'Concessionária #07', value: 176000, minutesAgo: 33 },
        { by: 'Lojista #154', value: 172000, minutesAgo: 71 },
      ],
    },
  },
  {
    id: 'hyundai-i30-fastback-2019',
    brand: 'Hyundai',
    model: 'i30 Fastback',
    version: '1.4 T-GDi DCT',
    yearFab: 2019,
    yearModel: 2019,
    km: 45930,
    price: 104900,
    fipe: 109200,
    city: 'Curitiba',
    uf: 'PR',
    category: 'Sedã e Fastback',
    modality: 'Lance aberto',
    fuel: 'Gasolina',
    transmission: 'Automatizado DCT 7 marchas',
    color: 'Cinza Titânio',
    engine: '1.4 Turbo GDi',
    power: '140 cv',
    doors: 4,
    plateEnd: 5,
    inspectionScore: 92,
    store: 'Unidade Batel',
    publishedDaysAgo: 3,
    featured: true,
    cover: media('fastback-1.webp'),
    images: [media('fastback-1.webp'), media('fastback-2.webp'), media('fastback-3.webp'), media('fastback-hero.webp')],
    description:
      'Fastback importado com motor turbo e câmbio de dupla embreagem. Pintura original em todas as peças, revisões registradas e segundo jogo de chaves.',
    features: ['Faróis full LED', 'Carregador por indução', 'Sensor de ponto cego', 'Apple CarPlay e Android Auto', 'Rodas de liga 18"', 'Partida remota'],
    conditions: ['Lance mínimo com incremento de R$ 500', 'Pintura original atestada em laudo', 'Transferência inclusa para lojistas cadastrados', 'Entrega com tanque cheio'],
    auction: {
      lot: 'L-2611-031',
      startPrice: 92000,
      increment: 500,
      endsInMinutes: 19,
      bids: [
        { by: 'Lojista #331', value: 98500, minutesAgo: 2 },
        { by: 'Concessionária #12', value: 98000, minutesAgo: 6 },
        { by: 'Lojista #090', value: 96500, minutesAgo: 15 },
        { by: 'Lojista #331', value: 94000, minutesAgo: 27 },
      ],
    },
  },
  {
    id: 'hyundai-i30-gls-2015',
    brand: 'Hyundai',
    model: 'i30',
    version: '1.8 GLS 16V Automático',
    yearFab: 2014,
    yearModel: 2015,
    km: 82300,
    price: 61900,
    fipe: 64870,
    city: 'Campinas',
    uf: 'SP',
    category: 'Hatch',
    modality: 'Repasse B2B',
    fuel: 'Gasolina',
    transmission: 'Automático 6 marchas',
    color: 'Branco Polar',
    engine: '1.8 16V',
    power: '150 cv',
    doors: 4,
    plateEnd: 9,
    inspectionScore: 86,
    store: 'Unidade Cambuí',
    publishedDaysAgo: 4,
    featured: false,
    cover: media('i30-1.webp'),
    images: [media('i30-1.webp'), media('i30-2.webp'), media('i30-3.webp')],
    cutout: media('i30-cut.webp'),
    description:
      'Hatch médio entregue na troca por cliente da rede. Mecânica revisada, suspensão dianteira renovada e pneus novos. Indicado para lojistas com foco em giro rápido.',
    features: ['Teto solar', 'Bancos em couro', 'Sensor de estacionamento', 'Controle de tração', 'Ar digital', 'Bluetooth'],
    conditions: ['Preço de repasse exclusivo para CNPJ cadastrado', 'Pagamento à vista ou TED em 48 h', 'Veículo no estado, com laudo cautelar', 'Retirada no pátio de Campinas'],
  },
  {
    id: 'ford-ka-se-2016',
    brand: 'Ford',
    model: 'Ka',
    version: '1.0 SE Flex',
    yearFab: 2015,
    yearModel: 2016,
    km: 71050,
    price: 43900,
    fipe: 45640,
    city: 'Ribeirão Preto',
    uf: 'SP',
    category: 'Hatch',
    modality: 'Venda direta',
    fuel: 'Flex',
    transmission: 'Manual 5 marchas',
    color: 'Prata Riviera',
    engine: '1.0 12V Ti-VCT',
    power: '85 cv',
    doors: 4,
    plateEnd: 4,
    inspectionScore: 88,
    store: 'Unidade Jardim Irajá',
    publishedDaysAgo: 0,
    featured: false,
    cover: media('ka-1.webp'),
    images: [media('ka-1.webp'), media('ka-2.webp'), media('interior.webp')],
    cutout: media('ka-cut.webp'),
    description:
      'Hatch compacto econômico com central SYNC, direção elétrica e manutenção em dia. Segundo dono, IPVA 2026 quitado e documentação pronta para transferência.',
    features: ['Central SYNC com Bluetooth', 'Direção elétrica', 'Ar-condicionado', 'Vidros e travas elétricas', 'Computador de bordo', 'Isofix'],
    conditions: ['Aceita proposta abaixo do anúncio', 'Financiamento em até 60 vezes mediante análise', 'Garantia de 90 dias para motor e câmbio', 'IPVA 2026 quitado'],
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
