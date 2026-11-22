// Datos externos siempre se insertan con textContent, nunca como HTML.
const estado = document.getElementById('estado');
const resultados = document.getElementById('resultados');
const alerta = document.getElementById('alerta-propuesta');
function crear(etiqueta, clase, texto) {
    const nodo = document.createElement(etiqueta);
    nodo.className = clase || '';
    if (texto)
        nodo.textContent = texto;
    return nodo;
}
export function mostrarCargando() { resultados.replaceChildren(); estado.textContent = 'Buscando…'; }
export function mostrarError(mensaje) { resultados.replaceChildren(); estado.replaceChildren(crear('p', 'alert alert-danger', mensaje)); }
export function mostrarVacio(texto) { resultados.replaceChildren(); estado.textContent = 'No se encontraron series para «' + texto + '».'; }
export function mostrarResultados(series) {
    estado.replaceChildren();
    resultados.replaceChildren(...series.map(serie => {
        const columna = crear('div', 'col');
        const tarjeta = crear('article', 'card h-100');
        const imagen = crear('img', 'card-img-top');
        imagen.src = serie.image?.medium || 'img/sin-imagen.svg';
        imagen.alt = 'Portada de ' + serie.name;
        imagen.addEventListener('error', () => { imagen.src = 'img/sin-imagen.svg'; }, { once: true });
        const cuerpo = crear('div', 'card-body');
        cuerpo.append(crear('h3', 'h6', serie.name), crear('p', 'small', (serie.genres?.join(', ') || 'Sin género') + ' · ' + (serie.premiered?.slice(0, 4) || 'Sin fecha')));
        tarjeta.append(imagen, cuerpo);
        columna.append(tarjeta);
        return columna;
    }));
}
export function mostrarAlerta(tipo, mensaje) { alerta.replaceChildren(crear('p', 'alert alert-' + tipo, mensaje)); }
