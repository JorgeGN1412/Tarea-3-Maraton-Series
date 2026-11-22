// En esta etapa se practica HTML a JSX; no se pide persistencia en React.
export default function FormularioSolicitud() {
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <label>
        Nombre
        <input name="nombre" />
      </label>

      <label>
        Departamento
        <select defaultValue="">
          <option value="">Seleccione…</option>
          <option>Administración</option>
          <option>Ventas</option>
          <option>Tecnología</option>
        </select>
      </label>

      <label>
        Tipo de problema
        <select defaultValue="">
          <option value="">Seleccione…</option>
          <option>Hardware</option>
          <option>Software</option>
          <option>Red</option>
        </select>
      </label>

      <label>
        Prioridad
        <select defaultValue="">
          <option value="">Seleccione…</option>
          <option>Baja</option>
          <option>Media</option>
          <option>Alta</option>
        </select>
      </label>

      <label>
        Descripción
        <textarea name="descripcion" />
      </label>
      <button type="submit">Registrar solicitud</button>
    </form>
  );
}
