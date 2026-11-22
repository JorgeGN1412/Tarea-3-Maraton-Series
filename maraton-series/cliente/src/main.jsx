import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './estilos.css'
import Sitio from './Sitio.jsx'      // antes: import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sitio />
  </StrictMode>,
)
