import { HashRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import PhilippinesReport from './pages/PhilippinesReport'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/philippines-report" element={<PhilippinesReport />} />
      </Routes>
    </HashRouter>
  )
}
