import test from 'node:test';
import assert from 'node:assert/strict';
import { validarSerie } from '../src/series/validarSerie.js';
import { crearServicioSeries } from '../src/series/series.service.js';
import { leerEntorno } from '../src/config/env.js';
const id = '650000000000000000000001';
const datos = { titulo: 'Dark', genero: 'Drama', temporadas: 3, miembroId: id };
test('Valida límites y tipos sin aceptar temporadas como texto', () => {
  assert.deepEqual(validarSerie(datos), {});
  for (const temporadas of [0, 31, 1.5, '3', NaN]) assert.ok(validarSerie({ ...datos, temporadas }).temporadas);
  assert.ok(validarSerie({ ...datos, titulo: ' ' }).titulo);
});
test('No crea referencias a miembros que no existen', async () => {
  let inserciones = 0;
  const servicio = crearServicioSeries({ crear: async () => { inserciones++; } }, { existe: async () => false });
  await assert.rejects(servicio.crear(datos), e => e.estado === 400 && Boolean(e.detalles.miembroId));
  assert.equal(inserciones, 0);
});
test('Un id inválido se rechaza antes de consultar el repositorio', async () => {
  let consultas = 0;
  const servicio = crearServicioSeries({ buscarPorId: async () => { consultas++; } }, {});
  await assert.rejects(servicio.obtener('abc'), e => e.estado === 400);
  assert.equal(consultas, 0);
});
test('Un id válido ausente responde 404', async () => {
  const servicio = crearServicioSeries({ buscarPorId: async () => null }, {});
  await assert.rejects(servicio.obtener(id), e => e.estado === 404);
});
test('DELETE distingue una eliminación de una ausencia', async () => {
  const servicio = crearServicioSeries({ eliminar: async () => ({ deletedCount: 0 }) }, {});
  await assert.rejects(servicio.eliminar(id), e => e.estado === 404);
});
test('El cliente no puede elegir el estado inicial ni campos extra', async () => {
  let insertado;
  const servicio = crearServicioSeries({
    crear: async x => { insertado = x; return id; },
    buscarPorId: async () => ({ _id: id }),
  }, { existe: async () => true });
  await servicio.crear({ ...datos, estado: 'Vista', administrador: true });
  assert.equal(insertado.estado, 'Por ver');
  assert.equal(insertado.administrador, undefined);
});
test('La configuración incompleta impide arrancar', () => {
  assert.throws(() => leerEntorno({}), /Falta/);
  assert.throws(() => leerEntorno({ MONGODB_URI: 'x', MONGODB_DB: 'x', CLIENT_ORIGIN: 'x', PORT: '-1' }), /PORT/);
});
