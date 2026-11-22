import { useState } from 'react';
// Cada instancia conserva su propia memoria entre renderizados.
export function Ejemplo() {
  const [cantidad, setCantidad] = useState(0);
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <p>Contador: {cantidad}</p>
      <button onClick={() => setCantidad((n) => n + 1)}>Sumar</button>
      <button onClick={() => setAbierto((x) => !x)}>Alternar detalle</button>
      {abierto && <p>Detalle visible</p>}
    </>
  );
}
export function Ejercicio() {
  const [nombre, setNombre] = useState('');
  return (
    <>
      <label>
        Su nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <p>{nombre ? 'Hola, ' + nombre : 'Escriba su nombre.'}</p>
      <button onClick={() => setNombre('')}>Borrar</button>
    </>
  );
}
