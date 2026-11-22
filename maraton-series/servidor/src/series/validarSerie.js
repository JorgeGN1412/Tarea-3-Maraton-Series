// Función pura: permite revisar las reglas sin servidor ni base de datos.
export const ESTADOS = ['Por ver', 'Viendo', 'Vista'];
export const GENEROS = ['Drama', 'Comedia', 'Ciencia ficción', 'Animación', 'Documental'];
export function validarSerie(datos) {
    const errores = {};
    if (typeof datos?.titulo !== 'string' || datos.titulo.trim().length < 2 || datos.titulo.trim().length > 100)
        errores.titulo = 'El título debe tener entre 2 y 100 caracteres.';
    if (!GENEROS.includes(datos?.genero))
        errores.genero = 'Elija un género válido.';
    if (!Number.isInteger(datos?.temporadas) || datos.temporadas < 1 || datos.temporadas > 30)
        errores.temporadas = 'Indique un entero entre 1 y 30.';
    if (typeof datos?.miembroId !== 'string' || !/^[a-f0-9]{24}$/i.test(datos.miembroId))
        errores.miembroId = 'Indique quién propone la serie.';
    return errores;
}
