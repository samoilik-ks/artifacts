import { HashRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import PhilippinesReport from './pages/PhilippinesReport'
import MalaysiaReport from './pages/MalaysiaReport'
import SaudiReport from './pages/SaudiReport'
import KenyaReport from './pages/KenyaReport'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/philippines-report" element={<PhilippinesReport />} />
        <Route path="/malaysia-report" element={<MalaysiaReport />} />
        <Route path="/saudi-report" element={<SaudiReport />} />
        <Route path="/kenya-report" element={<KenyaReport />} />
      </Routes>
    </HashRouter>
  )
}
