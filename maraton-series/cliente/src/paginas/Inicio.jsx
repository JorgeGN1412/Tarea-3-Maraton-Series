// Inicio.jsx
// Página de bienvenida. Usa el mismo diseño (Pagina) que el resto de la aplicación.
// No sabe cómo se cambia de página: recibe la función onIr por props y la llama.

import Pagina from '../componentes/layout/Pagina.jsx'

function Inicio({ onIr }) {
  return (
    <Pagina>
      <div className="text-center py-5">
        <h1>Bienvenidos al Maratón de series</h1>
        <p className="lead">Organicen lo que el club quiere ver.</p>
        {/* Un enlace con aspecto de botón (clases de Bootstrap) */}
        <a href="#series" className="btn btn-primary" onClick={() => onIr('series')}>
          Ver series
        </a>
      </div>
    </Pagina>
  )
}

export default Inicio
