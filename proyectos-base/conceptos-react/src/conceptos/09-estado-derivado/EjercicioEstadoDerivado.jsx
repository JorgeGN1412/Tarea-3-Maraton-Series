import {useState} from 'react';
import {tecnicos as iniciales} from '../../data/tecnicos.js';
export default function EjercicioEstadoDerivado(){
 const [tecnicos,setTecnicos]=useState(iniciales);
 const [filtro,setFiltro]=useState('Todos');
 // Se calculan desde el estado en cada dibujo, sin setters adicionales.
 const visibles=tecnicos.filter(t=>filtro==='Todos'||(filtro==='Disponibles'?t.disponible:!t.disponible));
 const disponibles=tecnicos.filter(t=>t.disponible).length;
 return <><label>Disponibilidad<select value={filtro} onChange={e=>setFiltro(e.target.value)}>{['Todos','Disponibles','Ocupados'].map(x=><option key={x}>{x}</option>)}</select></label>
 <p>Disponibles: {disponibles} de {tecnicos.length}</p>{visibles.length===0&&<p>Ningún técnico coincide.</p>}
 <ul>{visibles.map(t=><li key={t.id}>{t.nombre}<button onClick={()=>setTecnicos(xs=>xs.map(x=>x.id===t.id?{...x,disponible:!x.disponible}:x))}>{t.disponible?'Marcar ocupado':'Marcar disponible'}</button></li>)}</ul></>;
}