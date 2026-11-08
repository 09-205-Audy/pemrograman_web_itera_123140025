import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Stats from './pages/Stats/Stats'
import './App.css'

// Kerangka aplikasi: header + navigasi + daftar halaman (React Router)
function App() {
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

  return (
    <>
      <header className="app-header">
        <h1>Buku Pribadiku</h1>
        <nav aria-label="Navigasi utama">
          <NavLink to="/" end className={linkClass}>
            Beranda
          </NavLink>
          <NavLink to="/statistik" className={linkClass}>
            Statistik
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistik" element={<Stats />} />
        </Routes>
      </main>
    </>
  )
}

export default App