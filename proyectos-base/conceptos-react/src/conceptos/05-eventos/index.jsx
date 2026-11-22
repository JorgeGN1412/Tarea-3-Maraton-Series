// Se pasa una función a onClick; los paréntesis ejecutarían la función al renderizar.
function Boton({ texto, alHacerClic }) { return <button type="button" onClick={alHacerClic}>{texto}</button>; }
export function Ejemplo() { return <Boton texto="Saludar" alHacerClic={() => console.log('Hola desde React')}/>; }
export function Ejercicio() { function enviar(e) { e.preventDefault(); console.log('Encuesta enviada'); } return <form onSubmit={enviar}><Boton texto="Sí" alHacerClic={() => console.log('Respuesta: Sí')}/><Boton texto="No" alHacerClic={() => console.log('Respuesta: No')}/><label>Comentario<input onChange={e => console.log('Comentario: ' + e.target.value)}/></label><button type="submit">Enviar encuesta</button></form>; }
