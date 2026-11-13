// Conteúdo único para as seis propostas — site B2B de apresentação da plataforma C21 AutoLance.
import type { LucideIcon } from 'lucide-react'
import { ClipboardCheck, Gavel, Handshake, Warehouse, LineChart, Building2, Store, Network } from 'lucide-react'

export type ScreenId = 'evaluation' | 'auction' | 'offers' | 'stock' | 'intel'

export interface Solution {
  slug: string
  name: string
  short: string
  title: string
  lead: string
  icon: LucideIcon
  screen: ScreenId
  photo: string
  features: { title: string; text: string }[]
  results: { value: string; label: string }[]
}

export const solutions: Solution[] = [
  {
    slug: 'avaliacao',
    photo: 'caoa/tiggo5x-studio.webp',
    name: 'Avaliação de veículos',
    short: 'Avaliação digital pelo aplicativo, com fotos, checklist de avarias e preço sugerido em minutos.',
    title: 'Avalie o usado na mesa de negociação, com preço de mercado na hora.',
    lead: 'O avaliador registra fotos, itens de conservação e avarias no aplicativo. A plataforma cruza os dados com o histórico de transações e devolve uma faixa de preço mínimo, médio e máximo para a proposta de compra.',
    icon: ClipboardCheck,
    screen: 'evaluation',
    features: [
      { title: 'Checklist guiado', text: 'Roteiro padronizado de fotos e itens de inspeção para toda a rede.' },
      { title: 'Mapa de avarias', text: 'Marcação de danos por peça, com custo estimado de reparo.' },
      { title: 'Preço sugerido', text: 'Faixa mínima, média e máxima calculada com dados transacionais.' },
      { title: 'Aprovação por gestor', text: 'Fluxo de aprovação com alçadas por valor e por unidade.' },
      { title: 'Consulta veicular', text: 'Débitos, restrições e histórico consultados antes da compra.' },
      { title: 'Laudo cautelar integrado', text: 'Laudo anexado à avaliação e reaproveitado no anúncio de repasse.' },
    ],
    results: [
      { value: '6 min', label: 'tempo médio por avaliação' },
      { value: '98%', label: 'das avaliações com fotos padronizadas' },
      { value: '−32%', label: 'divergência entre avaliadores' },
    ],
  },
  {
    slug: 'repasse',
    photo: 'caoa/tiggo8-studio.webp',
    name: 'Repasse e lances',
    short: 'Pregão online de usados para lojistas verificados em todo o país, com lances em tempo real.',
    title: 'Repasse o usado que não fica no estoque em horas, não em semanas.',
    lead: 'Publique o veículo avaliado em um lote de lance aberto ou em repasse direto. Lojistas e concessionárias verificados disputam em tempo real e a plataforma conduz pagamento, documentação e retirada.',
    icon: Gavel,
    screen: 'auction',
    features: [
      { title: 'Lotes com cronômetro', text: 'Disputas por tempo definido com incremento mínimo configurável.' },
      { title: 'Compradores verificados', text: 'Base de lojistas e concessionárias validados por CNPJ.' },
      { title: 'Preço de reserva', text: 'Valor mínimo oculto que protege a margem da concessionária.' },
      { title: 'Repasse direto', text: 'Venda a preço fixo para a rede de compradores, sem disputa.' },
      { title: 'Pagamento garantido', text: 'Liberação do veículo somente após a confirmação do pagamento.' },
      { title: 'Logística de retirada', text: 'Cotação de frete e agendamento de retirada no pátio.' },
    ],
    results: [
      { value: '27 min', label: 'até o primeiro lance, em média' },
      { value: '41%', label: 'das vendas para outros estados' },
      { value: '3,8 dias', label: 'do anúncio ao pagamento' },
    ],
  },
  {
    slug: 'negociacoes',
    photo: 'caoa/cs55-duo.webp',
    name: 'Ofertas e negociações',
    short: 'Propostas, contrapropostas e histórico completo de cada negociação em um único fluxo.',
    title: 'Cada proposta registrada, cada decisão rastreável.',
    lead: 'Receba ofertas, responda com contraproposta e acompanhe o status de todas as negociações da rede. O histórico fica disponível para auditoria e para a gestão comercial.',
    icon: Handshake,
    screen: 'offers',
    features: [
      { title: 'Funil de negociações', text: 'Visão por etapa: recebida, em análise, contraproposta, aceita.' },
      { title: 'Contraproposta em um clique', text: 'Resposta com valor e condição, com prazo de validade.' },
      { title: 'Histórico auditável', text: 'Data, hora, valor e responsável por cada movimentação.' },
      { title: 'Alertas em tempo real', text: 'Notificação quando um lance é superado ou uma oferta chega.' },
      { title: 'Contrato digital', text: 'Geração do contrato e assinatura eletrônica ao aceitar.' },
      { title: 'Regras por unidade', text: 'Alçadas de desconto e aprovação configuradas por loja.' },
    ],
    results: [
      { value: '100%', label: 'das negociações com histórico' },
      { value: '2,4 h', label: 'tempo médio de resposta' },
      { value: '−60%', label: 'troca de mensagens fora da plataforma' },
    ],
  },
  {
    slug: 'estoque',
    photo: 'caoa/tiggo5x-duo.webp',
    name: 'Gestão de estoque',
    short: 'Giro, custo de permanência e precificação de cada usado, por loja e por grupo.',
    title: 'Saiba qual carro está custando dinheiro parado no pátio.',
    lead: 'Acompanhe o estoque de usados de todas as unidades: dias em estoque, preço anunciado frente ao mercado, custo de preparação e alerta de envelhecimento. Decida quando reprecificar ou repassar.',
    icon: Warehouse,
    screen: 'stock',
    features: [
      { title: 'Curva de envelhecimento', text: 'Faixas de 0–30, 31–60 e mais de 60 dias por unidade.' },
      { title: 'Preço frente ao mercado', text: 'Comparação do anúncio com a referência transacional.' },
      { title: 'Custo de permanência', text: 'Capital parado, preparação e depreciação diária.' },
      { title: 'Sugestão de ação', text: 'Reprecificar, publicar em portais ou enviar para repasse.' },
      { title: 'Publicação em portais', text: 'Anúncio sincronizado com os principais classificados.' },
      { title: 'Visão de grupo', text: 'Consolidado por marca, loja e região para a diretoria.' },
    ],
    results: [
      { value: '−9 dias', label: 'no giro médio do estoque' },
      { value: '+2,1 p.p.', label: 'de margem bruta em usados' },
      { value: '1 painel', label: 'para todas as unidades do grupo' },
    ],
  },
  {
    slug: 'inteligencia',
    photo: 'caoa/tiggo9-powertrain.webp',
    name: 'Inteligência de mercado',
    short: 'Preços transacionais, tendências por modelo e região e relatórios para a diretoria.',
    title: 'Precifique com o que o mercado realmente pagou.',
    lead: 'A base de transações da plataforma alimenta indicadores de preço, liquidez e giro por modelo, versão, ano e região. Use os dados para comprar melhor e definir a política de usados do grupo.',
    icon: LineChart,
    screen: 'intel',
    features: [
      { title: 'Tabela transacional', text: 'Preço médio efetivamente negociado, atualizado diariamente.' },
      { title: 'Ranking de liquidez', text: 'Modelos com maior procura e menor tempo de venda.' },
      { title: 'Tendência de preço', text: 'Variação mensal por modelo, ano e região.' },
      { title: 'Benchmark de rede', text: 'Desempenho da sua loja frente à média do segmento.' },
      { title: 'Relatórios agendados', text: 'Envio automático para gestores e diretoria.' },
      { title: 'API de dados', text: 'Integração com DMS, BI e sistemas internos do grupo.' },
    ],
    results: [
      { value: 'Diária', label: 'atualização da base de preços' },
      { value: '27 UFs', label: 'com cobertura de transações' },
      { value: '+40', label: 'indicadores prontos para uso' },
    ],
  },
]

export interface Segment { slug: string; photo: string; name: string; short: string; title: string; lead: string; icon: LucideIcon; pains: string[]; gains: string[]; solutions: string[] }

export const segments: Segment[] = [
  {
    slug: 'concessionarias',
    photo: 'caoa/tiggo7-night.webp',
    name: 'Concessionárias',
    short: 'Avalie a troca com segurança, repasse o que não fica no estoque e proteja a margem do usado.',
    title: 'Mais margem no usado, mais velocidade na troca.',
    lead: 'Para concessionárias que recebem usados na venda do 0 km e precisam decidir rápido o que manter no estoque e o que repassar.',
    icon: Building2,
    pains: ['Avaliações diferentes para o mesmo carro', 'Usados parados no pátio por semanas', 'Repasse dependente de contatos e mensagens'],
    gains: ['Preço sugerido único para toda a rede', 'Repasse em horas para compradores verificados', 'Histórico completo de cada negociação'],
    solutions: ['avaliacao', 'repasse', 'estoque'],
  },
  {
    slug: 'lojistas',
    photo: 'caoa/unit-desert.webp',
    name: 'Lojistas multimarcas',
    short: 'Compre estoque de procedência direto das concessionárias, com laudo e histórico de lances.',
    title: 'Estoque de procedência, comprado direto da fonte.',
    lead: 'Para lojistas que precisam de oferta constante de usados com laudo cautelar e condições claras de pagamento e retirada.',
    icon: Store,
    pains: ['Pouca oferta de veículos com procedência', 'Informação incompleta sobre o estado do carro', 'Logística de compra em outros estados'],
    gains: ['Lotes diários de concessionárias de todo o país', 'Laudo e fotos padronizadas em todos os anúncios', 'Frete cotado e retirada agendada na plataforma'],
    solutions: ['repasse', 'negociacoes', 'inteligencia'],
  },
  {
    slug: 'grupos',
    photo: 'caoa/tiggo9-street.webp',
    name: 'Grupos e montadoras',
    short: 'Visão consolidada de usados por marca, loja e região, com política de preço padronizada.',
    title: 'Uma política de usados para todo o grupo.',
    lead: 'Para grupos de concessionárias, montadoras e locadoras que precisam padronizar processos e acompanhar o desempenho de usados em várias unidades.',
    icon: Network,
    pains: ['Cada unidade com um processo diferente', 'Falta de dados consolidados para a diretoria', 'Baixa previsibilidade de margem em usados'],
    gains: ['Processo de avaliação e aprovação padronizado', 'Painel consolidado por marca, loja e região', 'Indicadores de giro, margem e liquidez em tempo real'],
    solutions: ['inteligencia', 'estoque', 'negociacoes'],
  },
]

export const nav = {
  main: [
    { to: 'como-funciona', label: 'Como funciona' },
    { to: 'sobre', label: 'Sobre' },
    { to: 'contato', label: 'Contato' },
  ],
  login: { to: 'login', label: 'Acessar plataforma' },
  cta: { to: 'contato', label: 'Solicitar demonstração' },
}

export const hero = {
  eyebrow: 'Plataforma B2B para o mercado de usados',
  title: 'Avaliação, repasse e gestão de usados em uma única plataforma.',
  subtitle: 'O C21 AutoLance conecta concessionárias, lojistas e grupos automotivos para avaliar, negociar e girar o estoque de seminovos com dados de mercado e processo rastreável.',
  primaryCta: 'Solicitar demonstração',
  secondaryCta: 'Conhecer as soluções',
}

export const numbers = [
  { value: 1250, prefix: '', suffix: '', decimals: 0, label: 'concessionárias conectadas' },
  { value: 14, prefix: '', suffix: ' mil', decimals: 0, label: 'lojistas compradores verificados' },
  { value: 86, prefix: '', suffix: ' mil', decimals: 0, label: 'avaliações por mês' },
  { value: 2.3, prefix: 'R$ ', suffix: ' bi', decimals: 1, label: 'negociados por ano' },
]
export const numbersNote = 'Números demonstrativos para apresentação da proposta.'

export const sections = {
  solutions: { eyebrow: 'Soluções', title: 'Do primeiro contato com o usado até a venda', text: 'Cinco módulos integrados que cobrem avaliação, repasse, negociação, estoque e inteligência de mercado.' },
  segments: { eyebrow: 'Para quem', title: 'Feito para quem compra e vende usado todos os dias', text: 'Cada perfil acessa a plataforma com recursos e regras próprios.' },
  how: { eyebrow: 'Como funciona', title: 'Um fluxo único, do pátio ao repasse', text: 'O mesmo registro acompanha o veículo da avaliação à entrega, sem retrabalho entre áreas.' },
  intel: { eyebrow: 'Inteligência de mercado', title: 'Decisões apoiadas em transações reais', text: 'Cada negociação concluída alimenta a base de preços e liquidez que orienta a próxima avaliação.' },
  trust: { eyebrow: 'Segurança e governança', title: 'Processo auditável para toda a rede' },
  cta: { title: 'Veja a plataforma funcionando com os dados da sua operação', text: 'Um especialista apresenta os módulos e simula o fluxo de avaliação e repasse da sua loja ou grupo.', primary: 'Solicitar demonstração', secondary: 'Falar com um especialista' },
  video: { title: 'Do pátio à negociação', text: 'Avaliação padronizada, fotografia de qualidade e publicação imediata para compradores verificados de todo o país.' },
}

export const howItWorks = [
  { step: '01', title: 'Avalie', text: 'O avaliador registra fotos, avarias e itens no aplicativo e recebe a faixa de preço sugerida.', screen: 'evaluation' as ScreenId },
  { step: '02', title: 'Decida', text: 'O gestor aprova a compra e define se o veículo vai para o estoque ou para o repasse.', screen: 'stock' as ScreenId },
  { step: '03', title: 'Negocie', text: 'O veículo é publicado em lote de lance ou repasse direto para lojistas verificados.', screen: 'auction' as ScreenId },
  { step: '04', title: 'Conclua', text: 'A proposta aceita gera contrato, pagamento e retirada, com todo o histórico registrado.', screen: 'offers' as ScreenId },
]

export const trust = [
  { title: 'Participantes verificados', text: 'Validação de CNPJ, representante legal e histórico de cada comprador.' },
  { title: 'Histórico auditável', text: 'Cada avaliação, lance e proposta fica registrada com data, hora e responsável.' },
  { title: 'Perfis e alçadas', text: 'Permissões por função, unidade e valor de aprovação.' },
  { title: 'LGPD', text: 'Dados tratados conforme a Lei nº 13.709/2018, com controle de acesso e trilha de auditoria.' },
]

export const integrations = ['Sistemas DMS', 'Portais de classificados', 'ERP e financeiro', 'Consulta veicular', 'Laudo cautelar', 'Assinatura eletrônica', 'BI corporativo', 'API REST']

export const about = {
  title: 'Sobre o C21 AutoLance',
  lead: 'Tecnologia para dar previsibilidade ao mercado de usados entre concessionárias, lojistas e grupos automotivos.',
  paragraphs: [
    'O C21 AutoLance nasceu para organizar uma etapa do negócio automotivo que ainda depende de planilhas, mensagens e contatos pessoais: a compra, a avaliação e o repasse de veículos usados.',
    'A plataforma reúne em um só fluxo a avaliação no pátio, a decisão de estoque, a negociação com compradores verificados e a gestão consolidada do grupo. Cada movimento fica registrado e alimenta uma base de preços transacionais que melhora as decisões seguintes.',
    'Nossa equipe combina experiência no varejo automotivo com produto digital, dados e atendimento dedicado a concessionárias e lojistas.',
  ],
  values: [
    { title: 'Transparência', text: 'Regras claras e histórico aberto aos participantes de cada negociação.' },
    { title: 'Procedência', text: 'Avaliação padronizada e laudo cautelar antes da publicação.' },
    { title: 'Eficiência', text: 'Menos etapas manuais e decisões mais rápidas para a operação.' },
  ],
}

export const faq = [
  { q: 'Quem pode usar o C21 AutoLance?', a: 'Concessionárias, lojistas multimarcas, grupos automotivos, montadoras e locadoras com CNPJ ativo. Cada perfil tem permissões e recursos próprios.' },
  { q: 'Preciso instalar algum sistema?', a: 'Não. A plataforma funciona no navegador e o aplicativo de avaliação está disponível para iOS e Android.' },
  { q: 'Como é calculado o preço sugerido na avaliação?', a: 'O cálculo considera o histórico de transações da plataforma, ano, versão, quilometragem, conservação e região, e devolve uma faixa mínima, média e máxima.' },
  { q: 'Como funcionam os lotes de lance?', a: 'O vendedor define duração, preço de reserva e incremento mínimo. Compradores verificados disputam em tempo real e o maior lance acima da reserva vence.' },
  { q: 'A plataforma se integra ao meu DMS?', a: 'Sim. Há integrações com os principais DMS do mercado e uma API para sistemas internos do grupo.' },
  { q: 'Como é feita a implantação?', a: 'Um especialista configura unidades, perfis e alçadas, treina a equipe e acompanha as primeiras semanas de operação.' },
]

export const terms = [
  { title: '1. Objeto', text: 'Estes termos regulam o uso da plataforma C21 AutoLance por pessoas jurídicas para avaliação, gestão e negociação de veículos usados.' },
  { title: '2. Cadastro e verificação', text: 'O acesso depende de validação de CNPJ e de representante legal. A empresa é responsável pelos usuários que cadastra e por suas permissões.' },
  { title: '3. Lances e propostas', text: 'Lances confirmados em lotes abertos são vinculantes. Propostas em repasse direto têm validade definida pelo vendedor.' },
  { title: '4. Avaliação e laudo', text: 'A avaliação e o laudo cautelar descrevem o estado do veículo na data da inspeção. Divergências devem ser reportadas em até 72 horas após a retirada.' },
  { title: '5. Privacidade e dados', text: 'Os dados pessoais são tratados conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), exclusivamente para as finalidades descritas na política de privacidade.' },
  { title: '6. Remuneração', text: 'A contratação prevê mensalidade por unidade e tarifa por negociação concluída, conforme proposta comercial.' },
]

export const contact = {
  title: 'Solicite uma demonstração',
  lead: 'Conte um pouco sobre a sua operação e um especialista entra em contato para apresentar a plataforma.',
  channels: [
    { label: 'Comercial', value: '(11) 4000-2121', detail: 'Segunda a sexta, das 8h às 18h' },
    { label: 'E-mail', value: 'comercial@c21autolance.com.br', detail: 'Resposta em até 1 dia útil' },
    { label: 'Suporte a clientes', value: '(11) 4000-2122', detail: 'Para usuários da plataforma' },
  ],
  address: 'Av. das Nações Unidas, 12.901 · São Paulo · SP',
  profiles: ['Concessionária', 'Lojista multimarcas', 'Grupo automotivo', 'Montadora', 'Locadora ou frotista', 'Outro'],
  interests: solutions.map((s) => s.name),
  sizes: ['1 unidade', '2 a 5 unidades', '6 a 20 unidades', 'Mais de 20 unidades'],
}

export const footer = {
  tagline: 'Plataforma B2B de avaliação, repasse e gestão de veículos usados.',
  legal: '© 2026 C21 AutoLance. Ambiente demonstrativo — números e dados ilustrativos.',
  columns: [
    { title: 'Soluções', links: solutions.map((s) => ({ to: `solucoes/${s.slug}`, label: s.name })) },
    { title: 'Para quem', links: segments.map((s) => ({ to: `para/${s.slug}`, label: s.name })) },
    { title: 'Empresa', links: [{ to: 'sobre', label: 'Sobre' }, { to: 'como-funciona', label: 'Como funciona' }, { to: 'faq', label: 'Perguntas frequentes' }, { to: 'termos', label: 'Termos e políticas' }, { to: 'contato', label: 'Contato' }] },
  ],
}

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)
export const getSegment = (slug: string) => segments.find((s) => s.slug === slug)
