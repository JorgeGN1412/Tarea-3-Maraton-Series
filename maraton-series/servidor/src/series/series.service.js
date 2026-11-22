import { HttpError } from '../utils/HttpError.js';
import { ESTADOS, validarSerie } from './validarSerie.js';
// Se valida antes de convertir a ObjectId, para devolver 400 y evitar errores del driver.
export function revisarId(id) {
    if (typeof id !== 'string' || !/^[a-f0-9]{24}$/i.test(id))
        throw new HttpError(400, 'ID_INVALIDO', 'El identificador no es válido.');
}
export function crearServicioSeries(repositorio, miembros) {
    async function obtener(id) {
        revisarId(id);
        const serie = await repositorio.buscarPorId(id);
        if (!serie)
            throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.');
        return serie;
    }
    return {
        listar: () => repositorio.listar(),
        obtener,
        async crear(datos) {
            const detalles = validarSerie(datos);
            if (Object.keys(detalles).length)
                throw new HttpError(400, 'DATOS_INVALIDOS', 'Revise los datos.', detalles);
            if (!await miembros.existe(datos.miembroId))
                throw new HttpError(400, 'DATOS_INVALIDOS', 'Revise los datos.', { miembroId: 'El miembro no existe.' });
            // Se eligen campos permitidos: el cliente no decide el _id ni el estado inicial.
            const id = await repositorio.crear({ titulo: datos.titulo.trim(), genero: datos.genero,
                temporadas: datos.temporadas, miembroId: datos.miembroId, estado: 'Por ver' });
            return obtener(id);
        },
        async cambiarEstado(id, estado) {
            revisarId(id);
            if (!ESTADOS.includes(estado))
                throw new HttpError(400, 'DATOS_INVALIDOS', 'Estado no válido.', { estado: 'Elija Por ver, Viendo o Vista.' });
            const resultado = await repositorio.cambiarEstado(id, estado);
            if (!resultado.matchedCount)
                throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.');
            return obtener(id);
        },
        async eliminar(id) {
            revisarId(id);
            if (!(await repositorio.eliminar(id)).deletedCount)
                throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.');
        },
    };
}
