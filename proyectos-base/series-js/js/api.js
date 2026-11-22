// Este laboratorio usa servicios públicos; no modifica la base del Maratón.
export async function buscarSeries(texto) {
    const respuesta = await fetch('https://api.tvmaze.com/search/shows?q=' + encodeURIComponent(texto));
    if (!respuesta.ok)
        throw new Error('La API respondió con el código ' + respuesta.status);
    return (await respuesta.json()).map(x => x.show);
}
export async function enviarPropuesta(datos) {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos),
    });
    if (!respuesta.ok)
        throw new Error('No se pudo enviar la propuesta.');
    return respuesta.json(); // JSONPlaceholder simula la creación; no persiste la propuesta.
}
