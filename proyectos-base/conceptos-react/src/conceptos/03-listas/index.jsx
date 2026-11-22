import {solicitudes} from '../../data/solicitudes.js';
import {tecnicos} from '../../data/tecnicos.js';
// map transforma cada dato en un elemento con identidad estable.
export function Ejemplo(){return <ul>{solicitudes.map(s=><li key={s.id}><strong>{s.titulo}</strong> · {s.area} · {s.prioridad}</li>)}</ul>;}
export function Ejercicio(){return <ul>{tecnicos.map(t=><li key={t.id}>{t.nombre} · {t.area} · {t.extension}</li>)}</ul>;}
