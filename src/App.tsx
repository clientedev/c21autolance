import { HashRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom'
import { StoreProvider } from './lib/store'
import { SkinCtx, Toaster, ScrollTop } from './shared/ui'
import { SolutionPage, SegmentPage, AboutPage, HowPage, ContactPage, FaqPage, TermsPage, LoginPage } from './shared/pages'
import { ProposalSwitcher } from './proposals/common'
import { getProposal, type ProposalId } from './data/proposals'
import { registry } from './proposals/registry'
import Showroom from './showroom/Showroom'
import Compare from './showroom/Compare'

function ProposalShell() {
  const { pid = '' } = useParams()
  const loc = useLocation()
  const meta = getProposal(pid)
  if (!meta) return <Navigate to="/" replace />
  const P = registry[pid as ProposalId]
  return (
    <SkinCtx.Provider value={{ id: meta.id, base: `/v/${meta.id}`, PageHeader: P.PageHeader }}>
      <div className={`theme t-${meta.id}`} data-proposal={meta.id}>
        <P.Layout>
          <div key={loc.pathname} className="page-enter">
            <Routes>
              <Route index element={<P.Home />} />
              <Route path="solucoes/:slug" element={<SolutionPage />} />
              <Route path="para/:slug" element={<SegmentPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="sobre" element={<AboutPage />} />
              <Route path="como-funciona" element={<HowPage />} />
              <Route path="contato" element={<ContactPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="termos" element={<TermsPage />} />
              <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
          </div>
        </P.Layout>
        <ProposalSwitcher current={meta.id} />
      </div>
    </SkinCtx.Provider>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Showroom />} />
          <Route path="/comparar" element={<Compare />} />
          <Route path="/v/:pid/*" element={<ProposalShell />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </StoreProvider>
  )
}
