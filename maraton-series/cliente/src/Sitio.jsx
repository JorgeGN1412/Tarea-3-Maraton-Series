// Sitio.jsx
// Componente de más arriba: decide qué página se muestra (sin React Router).
// Guarda un solo dato: la página actual. Todo lo de las series sigue viviendo en App.
//
// Los enlaces usan href="#inicio" y href="#series":
//   - al hacer clic, la dirección del navegador cambia (…/#series)
//   - onClick cambia el estado, y React muestra la otra página
//   - al recargar, se lee la dirección para abrir en la misma página

import { useState } from 'react'
import App from './App.jsx'
import Inicio from './paginas/Inicio.jsx'

// Lee la parte de la dirección que va después de # para saber qué página mostrar
function paginaDeLaDireccion() {
  return window.location.hash === '#series' ? 'series' : 'inicio'
}

function Sitio() {
  // 'inicio' o 'series'. Al abrir (o recargar) se toma de la dirección.
  const [pagina, setPagina] = useState(paginaDeLaDireccion)

  return (
    <>
      {/* Menú: dos enlaces que cambian la página */}
      <div className="bg-dark py-2">
        <div className="container d-flex gap-3">
          <a
            href="#inicio"
            className={'text-white ' + (pagina === 'inicio' ? 'fw-bold' : 'opacity-75')}
            onClick={() => setPagina('inicio')}
          >
            Inicio
          </a>
          <a
            href="#series"
            className={'text-white ' + (pagina === 'series' ? 'fw-bold' : 'opacity-75')}
            onClick={() => setPagina('series')}
          >
            Series
          </a>
        </div>
      </div>

      {/* Inicio: se muestra solo cuando corresponde */}
      {pagina === 'inicio' && <Inicio onIr={setPagina} />}

      {/* App (la página de series): siempre existe, solo se oculta.
          Así no pierde su estado (las series agregadas) al ir a Inicio. */}
      <div hidden={pagina !== 'series'}>
        <App />
      </div>
    </>
  )
}

export default Sitio
