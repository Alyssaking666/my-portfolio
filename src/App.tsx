import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import CoreCapabilities from './components/CoreCapabilities'
import CaseStudies from './components/CaseStudies'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Fun from './components/Fun'

function App() {
  return (
    <div style={{ backgroundColor: 'var(--bg)' }} className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          {/* ABOUT 首页 */}
          <Route path="/" element={
            <>
              <About />
              <CoreCapabilities />
              <Contact />
            </>
          } />

          {/* CASE 页面 */}
          <Route path="/case" element={<CaseStudies />} />

          {/* SKILLS 页面 */}
          <Route path="/skills" element={<Skills />} />

          {/* FUN 页面 */}
          <Route path="/fun" element={<Fun />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
