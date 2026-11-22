import { useState } from 'react';
import SelectorTecnico from './SelectorTecnico.jsx';
import FichaTecnico from './FichaTecnico.jsx';
export default function EjercicioEstadoElevado() {
  const [seleccionado, setSeleccionado] = useState(null);
  return (
    <>
      <SelectorTecnico alSeleccionar={setSeleccionado} />
      <FichaTecnico tecnico={seleccionado} />
    </>
  );
}
