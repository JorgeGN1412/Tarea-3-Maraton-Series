// La página consulta comparte la clave de localStorage con el registro.
const filtro = document.getElementById('prioridad');
function dibujar() {
    let solicitudes = [];
    try {
        const datos = JSON.parse(localStorage.getItem('solicitudes') || '[]');
        if (Array.isArray(datos))
            solicitudes = datos;
    }
    catch {
        document.getElementById('contador').textContent = 'No se pudieron leer los datos guardados.';
        return;
    }
    const visibles = solicitudes.filter(s => filtro.value === 'Todas' || s.prioridad === filtro.value);
    document.getElementById('contador').textContent = 'Total: ' + visibles.length;
    const lista = document.getElementById('lista');
    lista.replaceChildren();
    if (!visibles.length) {
        const p = document.createElement('li');
        p.textContent = 'No existen solicitudes registradas.';
        lista.append(p);
    }
    for (const s of visibles) {
        const li = document.createElement('li');
        li.textContent = s.nombre + ' · ' + s.departamento + ' · ' + s.prioridad + ' · ' + s.descripcion;
        lista.append(li);
    }
}
filtro.addEventListener('change', dibujar);
window.addEventListener('storage', dibujar);
dibujar();
