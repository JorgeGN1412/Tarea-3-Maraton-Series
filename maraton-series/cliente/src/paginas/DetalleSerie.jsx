import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { obtenerSerie } from '../api/seriesApi.js';
export default function DetalleSerie() {
  const { id } = useParams(); // Lee el segmento dinámico de /series/:id.
  // Una identidad distinta reinicia el estado de carga al cambiar de serie.
  return <DetallePorId key={id} id={id} />;
}
function DetallePorId({ id }) {
  const [resultado, setResultado] = useState({ cargando: true });
  useEffect(() => {
    const controlador = new AbortController();
    obtenerSerie(id, controlador.signal)
      .then((serie) => setResultado({ serie }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResultado({ error });
      });
    return () => controlador.abort(); // Impide que una respuesta vieja reemplace otro detalle.
  }, [id]);
  if (resultado.cargando) return <p role="status">Cargando detalle…</p>;
  if (resultado.error)
    return (
      <>
        <h1>
          {resultado.error.estado === 404 ? 'Serie no encontrada' : 'No se pudo cargar la serie'}
        </h1>

        <p role="alert">{resultado.error.message}</p>
        <Link to="/series">Volver a series</Link>
      </>
    );
  const { serie } = resultado;
  return (
    <article>
      <Link to="/series">Volver a series</Link>
      <h1 className="mt-3">{serie.titulo}</h1>

      <dl>
        <dt>Género</dt>
        <dd>{serie.genero}</dd>
        <dt>Temporadas</dt>
        <dd>{serie.temporadas}</dd>

        <dt>Estado</dt>
        <dd>{serie.estado}</dd>
        <dt>Propuesta por</dt>
        <dd>{serie.miembro}</dd>
      </dl>
    </article>
  );
}
