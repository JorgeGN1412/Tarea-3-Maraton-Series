import TarjetaSerie from './TarjetaSerie.jsx';
// La key usa el identificador persistente, nunca la posición del arreglo.
export default function ListaSeries({ series, onAvanzar, onQuitar, ocupados = [] }) {
  if (!series.length) return <p role="status">Ninguna serie coincide con los filtros.</p>;
  return <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
    {series.map(serie => <div className="col" key={serie._id}>
      <TarjetaSerie serie={serie} onAvanzar={onAvanzar} onQuitar={onQuitar} ocupado={ocupados.includes(serie._id)} />
    </div>)}
  </div>;
}
