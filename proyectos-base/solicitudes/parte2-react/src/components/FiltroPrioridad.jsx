export default function FiltroPrioridad() {
  return (
    <label>
      Prioridad
      <select defaultValue="Todas">
        {['Todas', 'Baja', 'Media', 'Alta'].map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </label>
  );
}
