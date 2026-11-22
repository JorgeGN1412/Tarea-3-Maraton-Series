import PaginaRegistro from './paginas/PaginaRegistro.jsx';
import PaginaConsulta from './paginas/PaginaConsulta.jsx';
// La consigna pide composición estática: las dos páginas se ven una debajo de otra.
export default function App(){return <main className="contenedor"><PaginaRegistro/><PaginaConsulta/></main>;}