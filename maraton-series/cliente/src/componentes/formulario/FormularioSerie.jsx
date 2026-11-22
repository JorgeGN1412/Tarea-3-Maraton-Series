import { useState } from 'react';
import { GENEROS } from '../../data/series.js';
import { validarSerie } from '../../utils/validarSerie.js';
const VACIO = { titulo: '', genero: '', temporadas: '', miembroId: '' };
// Estado único para los campos. El servidor determina id y estado inicial.
export default function FormularioSerie({ miembros, onAgregar }) {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value })); // Conserva los otros campos.
  }
  async function enviar(evento) {
    evento.preventDefault(); // Mantiene la página y los datos del formulario.
    const nuevos = validarSerie(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length || enviando) return;
    setEnviando(true);
    try {
      await onAgregar({
        ...datos,
        titulo: datos.titulo.trim(),
        temporadas: Number(datos.temporadas),
      });
      setDatos(VACIO); // Solo se limpia después de la confirmación del API.
    } catch (error) {
      setErrores(error.detalles || { general: error.message });
    } finally {
      setEnviando(false);
    }
  }
  return (
    <form onSubmit={enviar} noValidate>
      {errores.general && (
        <p className="alert alert-danger" role="alert">
          {errores.general}
        </p>
      )}

      <fieldset disabled={enviando}>
        {['titulo', 'genero', 'temporadas', 'miembroId'].map((campo) => {
          const etiquetas = {
            titulo: 'Título',
            genero: 'Género',
            temporadas: 'Temporadas',
            miembroId: 'Propuesta por',
          };
          const seleccion = campo === 'genero' || campo === 'miembroId';
          const clase =
            (seleccion ? 'form-select' : 'form-control') + (errores[campo] ? ' is-invalid' : '');
          const comunes = {
            id: campo,
            name: campo,
            value: datos[campo],
            onChange: cambiar,
            className: clase,
            'aria-invalid': Boolean(errores[campo]),
            'aria-describedby': errores[campo] ? campo + '-error' : undefined,
          };
          return (
            <div className="mb-3" key={campo}>
              <label htmlFor={campo} className="form-label">
                {etiquetas[campo]}
              </label>

              {seleccion ? (
                <select {...comunes}>
                  <option value="">Elija…</option>

                  {campo === 'genero'
                    ? GENEROS.map((x) => <option key={x}>{x}</option>)
                    : miembros.map((x) => (
                        <option key={x._id} value={x._id}>
                          {x.nombre}
                        </option>
                      ))}
                </select>
              ) : (
                <input {...comunes} type={campo === 'temporadas' ? 'number' : 'text'} />
              )}

              {errores[campo] && (
                <div id={campo + '-error'} className="invalid-feedback">
                  {errores[campo]}
                </div>
              )}
            </div>
          );
        })}

        <button className="btn btn-primary" type="submit">
          {enviando ? 'Guardando…' : 'Agregar serie'}
        </button>
      </fieldset>
    </form>
  );
}
