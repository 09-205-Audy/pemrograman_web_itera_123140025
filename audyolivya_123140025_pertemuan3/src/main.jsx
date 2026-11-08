import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { BookProvider } from './context/BookContext.jsx'
import './index.css'

// BrowserRouter = navigasi antar halaman, BookProvider = data buku untuk semua komponen
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookProvider>
        <App />
      </BookProvider>
    </BrowserRouter>
  </StrictMode>,
)