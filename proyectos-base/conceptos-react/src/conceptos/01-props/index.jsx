// Props: el padre entrega datos; el hijo los recibe sin modificarlos.
function TarjetaSoporte({ area, descripcion, extension = 'Sin extensión' }) {
    return <article className="tarjeta"><h3>{area}</h3><p>{descripcion}</p><span>{extension}</span></article>;
}
export function Ejemplo() { return <div className="soporte"><TarjetaSoporte area="Hardware" descripcion="Computadoras e impresoras" extension="Ext. 101"/><TarjetaSoporte area="Software" descripcion="Programas y correo" extension="Ext. 102"/><TarjetaSoporte area="Red" descripcion="Internet y wifi"/></div>; }
export function Ejercicio() { return <div className="soporte"><TarjetaSoporte area="Soporte remoto" descripcion="Asistencia a distancia"/><TarjetaSoporte area="Laboratorio" descripcion="Equipos del aula" extension="Ext. 105"/></div>; }
