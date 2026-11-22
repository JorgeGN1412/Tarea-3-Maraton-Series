import {tecnicos} from '../../data/tecnicos.js';
function Disponibilidad({tecnico}){return <li>{tecnico.nombre}: {tecnico.disponible?'Disponible':'Ocupado'} {tecnico.disponible&&<strong> · {tecnico.extension}</strong>}</li>;}
export function Ejemplo(){return <ul>{tecnicos.map(t=><Disponibilidad key={t.id} tecnico={t}/>)}</ul>;}
export function Ejercicio({lista=[]}){if(!lista.length)return <p>No hay técnicos para mostrar.</p>;return <ul>{lista.map(t=><Disponibilidad key={t.id} tecnico={t}/>)}</ul>;}
