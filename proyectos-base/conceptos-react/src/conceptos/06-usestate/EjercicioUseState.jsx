import {useState} from 'react';
// Dos estados independientes: el número actual y si la atención está detenida.
export default function EjercicioUseState(){
 const [turno,setTurno]=useState(1);
 const [pausado,setPausado]=useState(false);
 return <><p className="numero">Turno {turno}</p>{pausado&&<p className="vacio">Atención en pausa</p>}
 <button disabled={turno===1} onClick={()=>setTurno(n=>n-1)}>Anterior</button>
 <button disabled={pausado} onClick={()=>setTurno(n=>n+1)}>Siguiente</button>
 <button onClick={()=>setPausado(x=>!x)}>{pausado?'Reanudar':'Pausar'}</button></>;
}