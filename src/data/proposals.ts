import { media } from './vehicles'

export type ProposalId = 'corporativa' | 'marketplace' | 'tecnologica' | 'executiva' | 'impactante' | 'saas'

export interface ProposalMeta {
  id: ProposalId
  number: string
  name: string
  concept: string
  description: string
  preview: string
  previews: { home: string; solution: string; segment: string; contact: string }
  traits: { style: string; header: string; navigation: string; solutions: string; product: string; conversion: string; experience: string }
  typography: string
}

const shots = (id: string) => ({
  home: media(`previews/${id}-home.webp`),
  solution: media(`previews/${id}-solucao.webp`),
  segment: media(`previews/${id}-segmento.webp`),
  contact: media(`previews/${id}-contato.webp`),
})

export const proposals: ProposalMeta[] = [
  {
    id: 'corporativa', number: '01', name: 'Corporativa Premium', concept: 'Plataforma automotiva corporativa de alto padrão.',
    description: 'Fundo claro, tipografia leve em caixa-alta espaçada, painel da plataforma sobre fotografia e grafismo diagonal da marca aplicado com parcimônia.',
    preview: media('previews/corporativa-home.webp'), previews: shots('corporativa'), typography: 'Saira Light e Regular',
    traits: {
      style: 'Institucional, claro e sóbrio; azul-marinho com detalhes em verde.',
      header: 'Barra utilitária escura + cabeçalho branco com menus suspensos.',
      navigation: 'Menus Soluções e Para quem em painéis; CTA fixo de demonstração.',
      solutions: 'Abas verticais à esquerda com a tela do módulo ao lado.',
      product: 'Painel do grupo sobre fotografia no banner; telas em moldura de navegador.',
      conversion: 'CTA de demonstração no cabeçalho, no banner e no rodapé de cada página.',
      experience: 'Ritmo calmo, leitura confortável, foco em credibilidade.',
    },
  },
  {
    id: 'marketplace', number: '02', name: 'Marketplace Profissional', concept: 'Experiência comercial inspirada nos marketplaces B2B, focada em conversão.',
    description: 'Formulário de demonstração no banner, sala de lances ao vivo, módulos em cards e comparativos por perfil, pensado para conversão.',
    preview: media('previews/marketplace-home.webp'), previews: shots('marketplace'), typography: 'Archivo',
    traits: {
      style: 'Claro e funcional, azul C21 com CTAs em verde.',
      header: 'Faixa de anúncio + cabeçalho com menus, botão Entrar e CTA verde.',
      navigation: 'Menus suspensos com descrição; navegação lateral no mobile.',
      solutions: 'Grade de cinco cards de módulo com ícone e chamada direta.',
      product: 'Sala de lances ao vivo no banner; comparativo por perfil em abas.',
      conversion: 'Formulário curto de demonstração já no banner e FAQ na home.',
      experience: 'Orientada a conversão, alta densidade e decisões rápidas.',
    },
  },
  {
    id: 'tecnologica', number: '03', name: 'Tecnológica e Contemporânea', concept: 'Plataforma automotiva com identidade digital inovadora.',
    description: 'Base azul-marinho profunda, composição assimétrica com os planos diagonais do guideline, dados em fonte mono e microinterações.',
    preview: media('previews/tecnologica-home.webp'), previews: shots('tecnologica'), typography: 'Sora + IBM Plex Mono',
    traits: {
      style: 'Escuro, contemporâneo, planos diagonais em azul e verde.',
      header: 'Cabeçalho flutuante translúcido com menu em pílula.',
      navigation: 'Menus em painel escuro; transições suaves entre telas.',
      solutions: 'Bento grid assimétrico com resultados em fonte mono.',
      product: 'Painel e aplicativo sobrepostos; tour interativo do fluxo em 4 etapas.',
      conversion: 'CTAs em pílula e chamada final em bloco com grafismo.',
      experience: 'Sensação de produto digital moderno, sem perder clareza.',
    },
  },
  {
    id: 'executiva', number: '04', name: 'Executiva Minimalista', concept: 'Plataforma de negócios com foco em clareza e eficiência.',
    description: 'Branco absoluto, filetes finos, nenhum ornamento. Os módulos são uma lista em acordeão e os números ganham protagonismo.',
    preview: media('previews/executiva-home.webp'), previews: shots('executiva'), typography: 'IBM Plex Sans',
    traits: {
      style: 'Minimalista, monocromático com acento verde pontual.',
      header: 'Linha única, logotipo reduzido e links de texto.',
      navigation: 'Menus objetivos; páginas com cabeçalho em duas colunas.',
      solutions: 'Lista numerada em acordeão com recursos de cada módulo.',
      product: 'Uma tela de gestão de estoque em largura total.',
      conversion: 'CTA textual discreto e bloco final com filete.',
      experience: 'Leitura rápida, hierarquia por tipografia, zero distração.',
    },
  },
  {
    id: 'impactante', number: '05', name: 'Automotiva Impactante', concept: 'Experiência com forte presença visual do mercado automotivo.',
    description: 'Vídeo em tela cheia, tipografia condensada em caixa-alta e cada módulo apresentado em uma seção própria com a tela do produto.',
    preview: media('previews/impactante-home.webp'), previews: shots('impactante'), typography: 'Barlow Condensed + Barlow',
    traits: {
      style: 'Escuro e dinâmico, vídeo e fotografia dominantes.',
      header: 'Transparente sobre o vídeo, sólido ao rolar.',
      navigation: 'Menus em caixa-alta e painel lateral no mobile.',
      solutions: 'Cada módulo em seção própria, alternando texto e tela.',
      product: 'Telas grandes em fundo escuro, números em faixa verde.',
      conversion: 'CTA final sobre fotografia em tela cheia.',
      experience: 'Presença de marca forte, com conteúdo comercial bem posicionado.',
    },
  },
  {
    id: 'saas', number: '06', name: 'SaaS B2B Especializado', concept: 'Plataforma profissional inspirada em softwares de gestão automotiva.',
    description: 'Navegação lateral fixa, tour do produto em abas, indicadores e tabelas no mesmo padrão visual da plataforma.',
    preview: media('previews/saas-home.webp'), previews: shots('saas'), typography: 'DM Sans + IBM Plex Mono',
    traits: {
      style: 'Interface de produto, cinza-azulado com superfícies brancas.',
      header: 'Barra superior com acesso e CTA; navegação lateral fixa.',
      navigation: 'Sidebar com todas as páginas agrupadas e breadcrumbs.',
      solutions: 'Tour do produto em abas com a tela de cada módulo.',
      product: 'Painéis, tabelas e indicadores no mesmo padrão da plataforma.',
      conversion: 'CTA no cabeçalho de cada página e no rodapé da sidebar.',
      experience: 'Experiência de software corporativo, consistente em todas as telas.',
    },
  },
]

export const getProposal = (id: string) => proposals.find((p) => p.id === id)
