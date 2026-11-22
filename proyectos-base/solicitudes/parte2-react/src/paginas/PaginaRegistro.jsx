import Menu from '../components/Menu.jsx';
import EncabezadoRegistro from '../components/EncabezadoRegistro.jsx';
import FormularioSolicitud from '../components/FormularioSolicitud.jsx';
import ListaSolicitudes from '../components/ListaSolicitudes.jsx';
import SalidaJSON from '../components/SalidaJSON.jsx';
export default function PaginaRegistro() {
  return (
    <section id="registro">
      <Menu />
      <section className="tarjeta">
        <EncabezadoRegistro />
        <FormularioSolicitud />
      </section>
      <ListaSolicitudes />
      <SalidaJSON />
    </section>
  );
}
