import { tecnicos } from '../../data/tecnicos.js';
// Comunica la elección al padre; no guarda otra copia del estado.
export default function SelectorTecnico({ alSeleccionar }) {
  return (
    <div>
      {tecnicos.map((t) => (
        <button key={t.id} onClick={() => alSeleccionar(t)}>
          {t.nombre}
        </button>
      ))}
    </div>
  );
}
