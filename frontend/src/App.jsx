import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TryPage from './pages/TryPage'
import ResultPage from './pages/ResultPage'
import SuccessPage from './pages/SuccessPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import RefundPage from './pages/RefundPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/try" element={<TryPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/refund" element={<RefundPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App
