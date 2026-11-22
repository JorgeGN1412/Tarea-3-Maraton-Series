const reservas = [
  {
    id: 1,
    cliente: 'Ana Mora',
    tour: 'Volcán Arenal',
    fecha: '2026-11-02',
    personas: 2,
    estado: 'Confirmada',
  },
  {
    id: 2,
    cliente: 'Luis Rojas',
    tour: 'Monteverde',
    fecha: '2026-11-05',
    personas: 4,
    estado: 'Pendiente',
  },
  {
    id: 3,
    cliente: 'María Solano',
    tour: 'Manuel Antonio',
    fecha: '2026-11-09',
    personas: 3,
    estado: 'Confirmada',
  },
  {
    id: 4,
    cliente: 'Carlos Vega',
    tour: 'Volcán Arenal',
    fecha: '2026-11-12',
    personas: 1,
    estado: 'Cancelada',
  },
];
// La función auxiliar es JavaScript común: se conserva al migrar.
function obtenerColorEstado(estado) {
  if (estado === 'Confirmada') return 'bg-success';
  if (estado === 'Pendiente') return 'bg-warning text-dark';
  return 'bg-danger';
}
export default function TablaReservas() {
  return (
    <section id="reservas" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Próximas reservas</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Tour</th>
                <th>Fecha</th>
                <th>Personas</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.cliente}</td>
                  <td>{r.tour}</td>
                  <td>{r.fecha}</td>
                  <td>{r.personas}</td>
                  <td>
                    <span className={'badge ' + obtenerColorEstado(r.estado)}>{r.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
