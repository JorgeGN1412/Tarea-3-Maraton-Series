import * as C0 from './conceptos/01-props/index.jsx';
import * as C1 from './conceptos/02-children/index.jsx';
import * as C2 from './conceptos/03-listas/index.jsx';
import * as C3 from './conceptos/04-condicional/index.jsx';
import * as C4 from './conceptos/05-eventos/index.jsx';
import * as C5 from './conceptos/06-usestate/index.jsx';
import * as C6 from './conceptos/07-inmutabilidad/index.jsx';
import * as C7 from './conceptos/08-estado-elevado/index.jsx';
import * as C8 from './conceptos/09-estado-derivado/index.jsx';
import Header from './componentes/Header.jsx';
import Footer from './componentes/Footer.jsx';
const nombres=["Props","Children","Listas","Condicionales","Eventos","useState","Inmutabilidad","Estado elevado","Estado derivado"];
const bloques=[C0,C1,C2,C3,C4,C5,C6,C7,C8];
// Cada concepto separa la demostración del ejercicio para poder explicarlos.
export default function App(){return <><Header conceptos={nombres}/><main>{bloques.map((C,i)=><section key={nombres[i]} id={'concepto-'+(i+1)}><h2>{i+1}. {nombres[i]}</h2><h3>Ejemplo</h3><C.Ejemplo/><h3>Ejercicio</h3><C.Ejercicio/></section>)}</main><Footer/></>;}
