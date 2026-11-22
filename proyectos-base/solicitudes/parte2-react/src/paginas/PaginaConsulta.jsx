import Menu from '../components/Menu.jsx';
import EncabezadoConsulta from '../components/EncabezadoConsulta.jsx';
import FiltroPrioridad from '../components/FiltroPrioridad.jsx';
import ListaSolicitudes from '../components/ListaSolicitudes.jsx';
export default function PaginaConsulta() {
  return (
    <section id="consulta">
      <Menu />
      <section className="tarjeta">
        <EncabezadoConsulta />
        <FiltroPrioridad />
      </section>
      <ListaSolicitudes />
    </section>
  );
}
