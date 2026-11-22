// children recibe el contenido escrito entre la apertura y el cierre del componente.
function Tarjeta({titulo,children}){return <section className="tarjeta"><h3>{titulo}</h3>{children}</section>;}
export function Ejemplo(){return <div className="fila-tarjetas"><Tarjeta titulo="Horario"><p>Lunes a viernes, 8 a.m. a 5 p.m.</p></Tarjeta><Tarjeta titulo="Contacto"><p>soporte@mesadeayuda.com</p><p>2222-0000</p></Tarjeta></div>;}
export function Ejercicio(){return <Tarjeta titulo="Recomendaciones"><ul><li>Describa el problema.</li><li>Indique su equipo.</li></ul></Tarjeta>;}
