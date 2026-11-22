import {useState} from 'react';
import {solicitudes} from '../../data/solicitudes.js';
// El ancestro común posee el filtro; los hermanos reciben el valor por props.
function SelectorArea({area,alCambiar}){return <label>Área<select value={area} onChange={e=>alCambiar(e.target.value)}>{['Todas','Hardware','Software','Red'].map(x=><option key={x}>{x}</option>)}</select></label>;}
function Lista({area}){const visibles=solicitudes.filter(s=>area==='Todas'||s.area===area);return <ul>{visibles.map(s=><li key={s.id}>{s.titulo}</li>)}</ul>;}
export function Ejemplo(){return <p>SelectorArea y Lista comparten el estado del componente padre.</p>;}
export function Ejercicio(){const [area,setArea]=useState('Todas');return <><SelectorArea area={area} alCambiar={setArea}/><Lista area={area}/></>;}
