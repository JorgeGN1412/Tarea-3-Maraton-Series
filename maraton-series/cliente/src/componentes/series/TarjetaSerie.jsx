import { Link } from 'react-router';
// La tarjeta no guarda datos: informa al padre mediante funciones recibidas por props.
export default function TarjetaSerie({ serie, onAvanzar, onQuitar, ocupado }) {
  const color = { 'Por ver': 'secondary', Viendo: 'warning', Vista: 'success' }[serie.estado];
  return <article className="card h-100"><div className="card-body">
    <span className={'badge text-bg-' + color}>{serie.estado}</span>
    <h2 className="h5 mt-3"><Link to={'/series/' + serie._id}>{serie.titulo}</Link></h2>
    <p>{serie.genero} · {serie.temporadas} {serie.temporadas === 1 ? 'temporada' : 'temporadas'}</p>
    <p className="text-secondary">Propuesta por {serie.miembro}</p>
    <div className="d-flex gap-2 flex-wrap">
      <button className="btn btn-outline-primary btn-sm" type="button" disabled={ocupado} onClick={() => onAvanzar(serie._id)}>Cambiar estado</button>
      <button className="btn btn-outline-danger btn-sm" type="button" disabled={ocupado} onClick={() => onQuitar(serie._id)}>Quitar</button>
    </div>
  </div></article>;
}
