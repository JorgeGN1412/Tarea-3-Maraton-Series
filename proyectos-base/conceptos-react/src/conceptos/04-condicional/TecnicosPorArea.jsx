import { tecnicos } from '../../data/tecnicos.js';
export default function TecnicosPorArea({ area }) {
  const lista = tecnicos.filter((t) => t.area === area);
  return lista.length ? (
    <ul className="lista">
      {lista.map((t) => (
        <li key={t.id}>
          {t.nombre}{' '}
          <span className={'insignia ' + (t.disponible ? 'baja' : 'alta')}>
            {t.disponible ? 'Disponible' : 'Ocupado'}
          </span>{' '}
          {t.disponible && <span>{t.extension}</span>}
        </li>
      ))}
    </ul>
  ) : (
    <p className="vacio">No hay técnicos en esta área.</p>
  );
}
