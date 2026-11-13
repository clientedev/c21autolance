# C21 AutoLance — seis propostas de design

Site B2B de apresentação da plataforma C21 AutoLance (estilo Auto Avaliar), em seis direções visuais com o mesmo conteúdo.

## Rodar
npm install
npm run dev      # desenvolvimento
npm run build    # gera /dist

## Estrutura
- src/data/content.ts      — textos, soluções, perfis, números (fonte única para as 6 versões)
- src/data/proposals.ts    — metadados das propostas (showroom e comparação)
- src/data/vehicles.ts     — dados usados só nas telas ilustrativas da plataforma
- src/shared/screens.tsx   — telas do produto (avaliação, sala de lances, negociações, estoque, inteligência)
- src/shared/pages.tsx     — páginas internas compartilhadas (solução, perfil, como funciona, sobre, contato, FAQ, termos, login)
- src/proposals/p1..p6     — Layout, Home e cabeçalho de página de cada proposta
- src/showroom             — Showroom e Comparar propostas
- Rotas: /#/  ·  /#/comparar  ·  /#/v/<proposta>/...

Fonte Flexo (guideline CAOA) é licenciada; as propostas usam substitutas livres. Para usar Flexo, troque --font-display/--font-body em src/index.css.
