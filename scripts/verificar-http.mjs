import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

// Prueba de integración: usa los servidores ya iniciados y solo borra la serie
// desechable creada por esta misma ejecución. No modifica las series del alumno.
const api = 'http://127.0.0.1:3001/api';
const resultados = [];
async function pedir(base, ruta, esperado, opciones) {
  const respuesta = await fetch(base + ruta, { ...opciones, signal: AbortSignal.timeout(10000) });
  const texto = await respuesta.text();
  assert.equal(respuesta.status, esperado, ruta + ': ' + texto);
  const cuerpo = texto ? JSON.parse(texto) : null;
  resultados.push({ ruta, metodo: opciones?.method || 'GET', estado: respuesta.status, cuerpo });
  return cuerpo;
}
const json = (method, datos) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(datos),
});
const miembros = await pedir(api, '/miembros', 200);
assert.equal(miembros.length, 4);
assert.deepEqual(
  miembros.map((m) => m.nombre),
  ['Ana', 'Diego', 'Luis', 'Sofía'],
);
const iniciales = await pedir(api, '/series', 200);
assert(iniciales.length >= 5);
await pedir(api, '/no-existe', 404);
await pedir(api, '/series/no-es-id', 400);
await pedir(api, '/series/ffffffffffffffffffffffff', 404);
await pedir(api, '/series', 400, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{',
});
for (const temporadas of [0, 31, 1.5, '2']) {
  await pedir(
    api,
    '/series',
    400,
    json('POST', { titulo: 'Validación', genero: 'Drama', temporadas, miembroId: miembros[0]._id }),
  );
}
await pedir(
  api,
  '/series',
  400,
  json('POST', {
    titulo: 'Validación',
    genero: 'Drama',
    temporadas: 1,
    miembroId: 'ffffffffffffffffffffffff',
  }),
);
const creada = await pedir(
  api,
  '/series',
  201,
  json('POST', {
    titulo: 'Integración temporal',
    genero: 'Drama',
    temporadas: 1,
    miembroId: miembros[0]._id,
    estado: 'Vista',
    administrador: true,
  }),
);
try {
  assert.equal(creada.estado, 'Por ver');
  assert.equal(creada.miembro, 'Ana');
  assert.equal(typeof creada._id, 'string');
  assert.equal(creada.administrador, undefined); // Los campos extra no cruzan el contrato.
  await pedir(api, '/series/' + creada._id, 200);
  await pedir(
    api,
    '/series/' + creada._id + '/estado',
    400,
    json('PATCH', { estado: 'Terminada' }),
  );
  for (const estado of ['Viendo', 'Vista', 'Por ver']) {
    const cambiada = await pedir(
      api,
      '/series/' + creada._id + '/estado',
      200,
      json('PATCH', { estado }),
    );
    assert.equal(cambiada.estado, estado);
    assert.equal((await pedir(api, '/series/' + creada._id, 200)).estado, estado);
  }
  // matchedCount sigue siendo uno aunque el valor solicitado no cambie.
  assert.equal(
    (
      await pedir(
        api,
        '/series/' + creada._id + '/estado',
        200,
        json('PATCH', { estado: 'Por ver' }),
      )
    ).estado,
    'Por ver',
  );
} finally {
  await pedir(api, '/series/' + creada._id, 204, { method: 'DELETE' });
}
await pedir(api, '/series/' + creada._id, 404, { method: 'DELETE' });
assert.equal((await pedir(api, '/series', 200)).length, iniciales.length);

// Los ids tienen distinto valor en Mongo y SQL, pero el contrato debe coincidir.
const sql = 'http://127.0.0.1:5090/api';
const sqlMiembros = await pedir(sql, '/miembros', 200);
const sqlSeries = await pedir(sql, '/series', 200);
// Comprueba el contrato de miembros en las dos bases antes de comparar sus nombres.
for (const miembro of [...miembros, ...sqlMiembros]) {
  assert.deepEqual(Object.keys(miembro).sort(), ['_id', 'nombre']);
  assert.equal(typeof miembro._id, 'string');
  assert.equal(typeof miembro.nombre, 'string');
}
assert.deepEqual(
  sqlMiembros.map((miembro) => miembro.nombre),
  miembros.map((miembro) => miembro.nombre),
);
assert.equal(sqlSeries.length, 5);
for (const s of [...iniciales, ...sqlSeries]) {
  assert.deepEqual(
    Object.keys(s).sort(),
    ['_id', 'titulo', 'genero', 'temporadas', 'estado', 'miembroId', 'miembro'].sort(),
  );
  for (const campo of ['_id', 'titulo', 'genero', 'estado', 'miembroId', 'miembro'])
    assert.equal(typeof s[campo], 'string');
  assert.equal(typeof s.temporadas, 'number');
}
await writeFile(
  new URL('../docs/pruebas-http.json', import.meta.url),
  JSON.stringify({ fecha: new Date().toISOString(), aprobada: true, resultados }, null, 2),
);
console.log('HTTP VERIFICADO: CRUD, errores, validación y contrato compartido Express/.NET.');
