import { GENEROS } from '../data/series.js';
// Valida campos controlados; temporadas llega como texto desde el input.
export function validarSerie(datos) {
  const errores = {};
  if (datos.titulo.trim().length < 2 || datos.titulo.trim().length > 100) errores.titulo = 'Use entre 2 y 100 caracteres.';
  if (!GENEROS.includes(datos.genero)) errores.genero = 'Elija un género.';
  const n = Number(datos.temporadas);
  if (!Number.isInteger(n) || n < 1 || n > 30) errores.temporadas = 'Use un entero entre 1 y 30.';
  if (!datos.miembroId) errores.miembroId = 'Indique quién propone la serie.';
  return errores;
}
