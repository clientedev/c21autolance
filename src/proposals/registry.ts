import type { ReactNode } from 'react'
import type { ProposalId } from '../data/proposals'
import type { Skin } from '../shared/ui'
import p1 from './p1-corporativa'
import p2 from './p2-marketplace'
import p3 from './p3-tecnologica'
import p4 from './p4-executiva'
import p5 from './p5-impactante'
import p6 from './p6-saas'

export interface ProposalModule {
  Layout: (p: { children: ReactNode }) => JSX.Element
  Home: () => JSX.Element
  PageHeader: Skin['PageHeader']
}
export const registry: Record<ProposalId, ProposalModule> = { corporativa: p1, marketplace: p2, tecnologica: p3, executiva: p4, impactante: p5, saas: p6 }
