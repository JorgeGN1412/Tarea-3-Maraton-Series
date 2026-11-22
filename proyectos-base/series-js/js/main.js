import { buscarSeries, enviarPropuesta } from './api.js';
import { mostrarCargando, mostrarError, mostrarVacio, mostrarResultados, mostrarAlerta } from './render.js';
// Solo se busca al enviar: no se dispara una petición por cada tecla.
const buscador = document.getElementById('form-busqueda');
let secuencia = 0;
buscador.addEventListener('submit', async (e) => {
    e.preventDefault();
    const texto = document.getElementById('texto-busqueda').value.trim();
    if (!texto)
        return;
    const turno = ++secuencia; // Descarta respuestas de búsquedas anteriores.
    mostrarCargando();
    try {
        const series = await buscarSeries(texto);
        if (turno !== secuencia)
            return;
        if (series.length)
            mostrarResultados(series);
        else
            mostrarVacio(texto);
    }
    catch (error) {
        if (turno === secuencia)
            mostrarError(error.message);
    }
});
const formulario = document.getElementById('form-propuesta');
const boton = document.getElementById('boton-propuesta');
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (boton.disabled || !formulario.reportValidity())
        return;
    boton.disabled = true;
    try {
        await enviarPropuesta(Object.fromEntries(new FormData(formulario)));
        mostrarAlerta('success', 'Propuesta enviada al servicio de prueba (registro simulado).');
        formulario.reset();
    }
    catch (error) {
        mostrarAlerta('danger', error.message);
    }
    finally {
        boton.disabled = false;
    }
});
