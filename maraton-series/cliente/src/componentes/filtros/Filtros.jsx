import { ESTADOS } from '../../data/series.js';
// El padre controla los filtros: este componente solo comunica la selección.
export default function Filtros({ estado, miembro, miembros, onCambiarEstado, onCambiarMiembro }) {
  return (
    <div className="row g-3">
      <div className="col-sm-6">
        <label className="form-label" htmlFor="filtro-estado">
          Estado
        </label>

        <select
          id="filtro-estado"
          className="form-select"
          value={estado}
          onChange={(e) => onCambiarEstado(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {ESTADOS.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div className="col-sm-6">
        <label className="form-label" htmlFor="filtro-miembro">
          Propuesta por
        </label>

        <select
          id="filtro-miembro"
          className="form-select"
          value={miembro}
          onChange={(e) => onCambiarMiembro(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {miembros.map((x) => (
            <option key={x._id} value={x.nombre}>
              {x.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
