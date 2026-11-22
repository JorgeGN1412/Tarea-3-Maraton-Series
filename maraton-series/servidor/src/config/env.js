// Lee configuración al arrancar; falla antes de escuchar si falta la base.
export function leerEntorno(entorno = process.env) {
    for (const nombre of ['MONGODB_URI', 'MONGODB_DB', 'CLIENT_ORIGIN']) {
        if (!entorno[nombre]?.trim())
            throw new Error('Falta la variable ' + nombre);
    }
    const puerto = Number(entorno.PORT || 3000);
    if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535)
        throw new Error('PORT no es válido.');
    return { puerto, uri: entorno.MONGODB_URI, base: entorno.MONGODB_DB, origen: entorno.CLIENT_ORIGIN };
}
