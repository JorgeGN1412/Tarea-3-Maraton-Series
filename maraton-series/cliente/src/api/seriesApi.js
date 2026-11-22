// Todas las peticiones HTTP pasan por esta función; las páginas no repiten fetch.
const API = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');
export async function pedir(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(API + ruta, opciones); // AbortController puede cancelar esta espera.
  } catch (error) {
    if (error.name === 'AbortError') throw error; // Una cancelación no es una falla de conexión.
    throw new Error('No se pudo conectar con el API. ¿Está encendido el servidor?');
  }
  if (respuesta.status === 204) return null; // DELETE correcto no lleva JSON.
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    const error = new Error(datos.error?.mensaje || 'No se pudo completar la petición.');
    error.estado = respuesta.status;
    error.codigo = datos.error?.codigo;
    error.detalles = datos.error?.detalles;
    throw error; // El formulario o la página decide cómo mostrarlo.
  }
  return datos;
}
const json = (method, datos) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) });
export const obtenerSeries = signal => pedir('/series', { signal });
export const obtenerMiembros = signal => pedir('/miembros', { signal });
export const obtenerSerie = (id, signal) => pedir('/series/' + encodeURIComponent(id), { signal });
export const crearSerie = datos => pedir('/series', json('POST', datos));
export const cambiarEstadoSerie = (id, estado) => pedir('/series/' + encodeURIComponent(id) + '/estado', json('PATCH', { estado }));
export const eliminarSerie = id => pedir('/series/' + encodeURIComponent(id), { method: 'DELETE' });
