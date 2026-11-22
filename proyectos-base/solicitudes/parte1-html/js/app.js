let solicitudes = [];
const solicitudesGuardadas = localStorage.getItem("solicitudes");
if (solicitudesGuardadas !== null) {
    solicitudes = JSON.parse(solicitudesGuardadas);
}
const formulario = document.getElementById("formSolicitud");
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const departamento = document.getElementById("departamento").value;
    const tipoProblema = document.getElementById("tipoProblema").value;
    const prioridad = document.getElementById("prioridad").value;
    const descripcion = document.getElementById("descripcion").value.trim();
    limpiarErrores();
    let formularioValido = true;
    if (nombre === "") {
        document.getElementById("errorNombre").textContent = "Debe ingresar el nombre.";
        formularioValido = false;
    }
    if (departamento === "") {
        document.getElementById("errorDepartamento").textContent = "Debe seleccionar un departamento.";
        formularioValido = false;
    }
    if (tipoProblema === "") {
        document.getElementById("errorTipo").textContent = "Debe seleccionar un tipo de problema.";
        formularioValido = false;
    }
    if (prioridad === "") {
        document.getElementById("errorPrioridad").textContent = "Debe seleccionar una prioridad.";
        formularioValido = false;
    }
    if (descripcion === "") {
        document.getElementById("errorDescripcion").textContent = "Debe ingresar una descripción.";
        formularioValido = false;
    }
    if (formularioValido === false) {
        return;
    }
    const solicitud = {
        nombre: nombre,
        departamento: departamento,
        tipoProblema: tipoProblema,
        prioridad: prioridad,
        descripcion: descripcion
    };
    console.log("Objeto creado:");
    console.log(solicitud);
    solicitudes.push(solicitud);
    const solicitudesJSON = JSON.stringify(solicitudes);
    localStorage.setItem("solicitudes", solicitudesJSON);
    mostrarSolicitudes();
    formulario.reset();
});
function limpiarErrores() {
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorDepartamento").textContent = "";
    document.getElementById("errorTipo").textContent = "";
    document.getElementById("errorPrioridad").textContent = "";
    document.getElementById("errorDescripcion").textContent = "";
}
function mostrarSolicitudes() {
    const lista = document.getElementById("listaSolicitudes");
    const contador = document.getElementById("contador");
    const salidaJSON = document.getElementById("salidaJSON");
    lista.innerHTML = "";
    if (solicitudes.length === 0) {
        lista.innerHTML = '<p class="sin-datos">No existen solicitudes registradas.</p>';
    }
    for (let i = 0; i < solicitudes.length; i++) {
        const solicitud = solicitudes[i];
        const elemento = document.createElement("article");
        elemento.classList.add("solicitud");
        const titulo = document.createElement("h3");
        titulo.textContent = solicitud.nombre;
        const departamento = document.createElement("p");
        departamento.textContent = "Departamento: " + solicitud.departamento;
        const tipo = document.createElement("p");
        tipo.textContent = "Problema: " + solicitud.tipoProblema;
        const prioridad = document.createElement("p");
        prioridad.textContent = "Prioridad: " + solicitud.prioridad;
        const descripcion = document.createElement("p");
        descripcion.textContent = "Descripción: " + solicitud.descripcion;
        elemento.appendChild(titulo);
        elemento.appendChild(departamento);
        elemento.appendChild(tipo);
        elemento.appendChild(prioridad);
        elemento.appendChild(descripcion);
        lista.appendChild(elemento);
    }
    contador.textContent = solicitudes.length + " solicitudes";
    const json = JSON.stringify(solicitudes, null, 2);
    salidaJSON.textContent = json;
}
mostrarSolicitudes();
