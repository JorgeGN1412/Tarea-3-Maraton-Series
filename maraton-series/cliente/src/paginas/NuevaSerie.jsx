import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { crearSerie, obtenerMiembros } from '../api/seriesApi.js';
import FormularioSerie from '../componentes/formulario/FormularioSerie.jsx';
export default function NuevaSerie() {
  const [miembros, setMiembros] = useState(null);
  const [error, setError] = useState('');
  const navegar = useNavigate();
  useEffect(() => {
    const controlador = new AbortController();
    obtenerMiembros(controlador.signal)
      .then(setMiembros)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message);
      });
    return () => controlador.abort();
  }, []);
  async function agregar(datos) {
    await crearSerie(datos); // Si falla, FormularioSerie conserva los campos y muestra el error.
    navegar('/series'); // La lista vuelve a cargar la información persistida.
  }
  return (
    <section>
      <Link to="/series">Volver</Link>
      <h1>Agregar una serie</h1>

      {error ? (
        <p className="alert alert-danger" role="alert">
          {error}
        </p>
      ) : miembros ? (
        <FormularioSerie miembros={miembros} onAgregar={agregar} />
      ) : (
        <p role="status">Cargando miembros…</p>
      )}
    </section>
  );
}
