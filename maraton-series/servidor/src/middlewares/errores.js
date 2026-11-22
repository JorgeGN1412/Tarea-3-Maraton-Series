import { HttpError } from '../utils/HttpError.js';
// Se ejecuta cuando ninguna ruta anterior respondió.
export function rutaNoEncontrada(req, res, next) {
  next(new HttpError(404, 'RUTA_NO_ENCONTRADA', 'No existe ' + req.method + ' ' + req.path));
}
// Los cuatro parámetros permiten que Express reconozca el middleware de errores.
export function manejarErrores(error, req, res, next) {
  if (res.headersSent) return next(error);
  const jsonInvalido = error.type === 'entity.parse.failed';
  const estado = jsonInvalido ? 400 : error.estado || 500;
  if (estado >= 500) console.error(error.message); // Evita exponer la conexión al cliente.
  res.status(estado).json({
    error: {
      codigo: jsonInvalido ? 'JSON_INVALIDO' : error.codigo || 'ERROR_INTERNO',
      mensaje: jsonInvalido
        ? 'El cuerpo debe ser JSON válido.'
        : estado >= 500
          ? 'Ocurrió un error interno.'
          : error.message,
      ...(error.detalles ? { detalles: error.detalles } : {}),
    },
  });
}
