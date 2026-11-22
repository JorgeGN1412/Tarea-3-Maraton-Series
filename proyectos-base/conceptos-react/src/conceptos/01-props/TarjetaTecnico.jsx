// Props de texto y número; turno tiene un valor por defecto.
export default function TarjetaTecnico({nombre,area,experiencia,turno='Mañana'}){
 return <article className="tarjeta-soporte"><h3>{nombre}</h3><p>Área: {area}</p><p>Experiencia: {experiencia} años</p><span className="extension">Turno: {turno}</span></article>;
}