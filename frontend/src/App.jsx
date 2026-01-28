import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TryPage from './pages/TryPage'
import ResultPage from './pages/ResultPage'
import SuccessPage from './pages/SuccessPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/try" element={<TryPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  )
}

export default App
