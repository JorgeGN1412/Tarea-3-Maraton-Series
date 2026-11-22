import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { obtenerSeries, obtenerMiembros, cambiarEstadoSerie, eliminarSerie } from '../api/seriesApi.js';
import { ESTADOS } from '../data/series.js';
import { siguienteEstado } from '../utils/series.js';
import Panel from '../componentes/comunes/Panel.jsx';
import Filtros from '../componentes/filtros/Filtros.jsx';
import ListaSeries from '../componentes/series/ListaSeries.jsx';
import Resumen from '../componentes/resumen/Resumen.jsx';
export default function PaginaSeries() {
  const [series, setSeries] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [ocupados, setOcupados] = useState([]);
  const pendientes = useRef(new Set()); // Bloquea doble clic incluso antes del siguiente render.
  const [parametros, setParametros] = useSearchParams();
  const estado = parametros.get('estado') || 'Todos';
  const miembro = parametros.get('miembro') || 'Todos';
  useEffect(() => {
    const controlador = new AbortController();
    Promise.all([obtenerSeries(controlador.signal), obtenerMiembros(controlador.signal)])
      .then(([lista, personas]) => { setSeries(lista); setMiembros(personas); })
      .catch(e => { if (e.name !== 'AbortError') setError(e.message); })
      .finally(() => { if (!controlador.signal.aborted) setCargando(false); });
    return () => controlador.abort(); // Cancela al desmontar y durante la verificación de StrictMode.
  }, []);
  function filtrar(clave, valor) {
    const nuevos = new URLSearchParams(parametros); // Conserva el otro filtro.
    if (valor === 'Todos') nuevos.delete(clave); else nuevos.set(clave, valor);
    setParametros(nuevos); // El historial conserva los filtros para Atrás y recarga.
  }
  async function operar(id, quitar) {
    if (pendientes.current.has(id)) return;
    pendientes.current.add(id);
    setOcupados([...pendientes.current]);
    setError('');
    try {
      if (quitar) {
        await eliminarSerie(id);
        setSeries(actuales => actuales.filter(s => s._id !== id));
      } else {
        const actual = series.find(s => s._id === id);
        const actualizada = await cambiarEstadoSerie(id, siguienteEstado(actual.estado));
        setSeries(actuales => actuales.map(s => s._id === id ? actualizada : s));
      }
    } catch (e) { setError(e.message); }
    finally {
      pendientes.current.delete(id);
      setOcupados([...pendientes.current]);
    }
  }
  // Estado derivado: se calcula, no se duplica en otro useState.
  const visibles = series.filter(s => (estado === 'Todos' || s.estado === estado) && (miembro === 'Todos' || s.miembro === miembro));
  const conteos = ESTADOS.map(estado => ({ estado, cantidad: series.filter(s => s.estado === estado).length }));
  if (cargando) return <p role="status">Cargando series…</p>;
  return <><div className="d-flex justify-content-between align-items-center mb-3"><h1 className="h2">Series del club</h1>
    <Link className="btn btn-primary" to="/series/nueva">Agregar serie</Link></div>
    {error && <p className="alert alert-danger" role="alert">{error}</p>}
    <div className="row g-4"><div className="col-lg-9">
      <Panel titulo="Filtros"><Filtros estado={estado} miembro={miembro} miembros={miembros}
        onCambiarEstado={v => filtrar('estado', v)} onCambiarMiembro={v => filtrar('miembro', v)} /></Panel>
      <Panel titulo={'Series del club (' + visibles.length + ')'}><ListaSeries series={visibles}
        onAvanzar={id => operar(id, false)} onQuitar={id => operar(id, true)} ocupados={ocupados} /></Panel>
    </div><aside className="col-lg-3"><Panel titulo="Resumen"><Resumen conteos={conteos} /></Panel></aside></div>
  </>;
}
