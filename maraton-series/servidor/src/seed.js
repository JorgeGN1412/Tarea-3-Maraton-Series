import { ObjectId } from 'mongodb';
import { leerEntorno } from './config/env.js';
import { conectar } from './db/conexion.js';
// Carga idempotente: inserta datos ausentes y conserva los cambios existentes.
const config = leerEntorno();
const { cliente, db } = await conectar(config);
try {
  const miembros = ['Ana', 'Luis', 'Sofía', 'Diego'].map((nombre, i) => ({
    _id: new ObjectId('65000000000000000000000' + (i + 1)),
    nombre,
    correo: ['ana', 'luis', 'sofia', 'diego'][i] + '@club.com',
    registro: new Date('2026-08-0' + (i + 1)),
    generosFavoritos: [
      ['Ciencia ficción', 'Documental'],
      ['Comedia'],
      ['Animación', 'Drama'],
      ['Drama'],
    ][i],
  }));
  const existentes = await db.listCollections({}, { nameOnly: true }).toArray();
  if (!existentes.some((x) => x.name === 'miembros')) await db.createCollection('miembros');
  if (!existentes.some((x) => x.name === 'series'))
    await db.createCollection('series', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['titulo', 'genero', 'temporadas', 'estado', 'miembroId'],
          properties: {
            titulo: { bsonType: 'string', minLength: 2, maxLength: 100 },
            genero: { enum: ['Drama', 'Comedia', 'Ciencia ficción', 'Animación', 'Documental'] },
            temporadas: { bsonType: 'int', minimum: 1, maximum: 30 },
            estado: { enum: ['Por ver', 'Viendo', 'Vista'] },
            miembroId: { bsonType: 'objectId' },
          },
        },
      },
    });
  await db.collection('miembros').createIndex({ correo: 1 }, { unique: true });
  for (const m of miembros)
    await db
      .collection('miembros')
      .updateOne({ _id: m._id }, { $setOnInsert: m }, { upsert: true });
  const filas = [
    ['Dark', 'Ciencia ficción', 3, 'Vista', 0],
    ['The Office', 'Comedia', 9, 'Viendo', 1],
    ['Arcane', 'Animación', 2, 'Por ver', 2],
    ['Chernobyl', 'Drama', 1, 'Vista', 3],
    ['Planeta Tierra', 'Documental', 3, 'Por ver', 0],
  ];
  for (const [i, [titulo, genero, temporadas, estado, miembro]] of filas.entries()) {
    const _id = new ObjectId('66000000000000000000000' + (i + 1));
    await db.collection('series').updateOne(
      { _id },
      {
        $setOnInsert: {
          _id,
          titulo,
          genero,
          temporadas,
          estado,
          miembroId: miembros[miembro]._id,
        },
      },
      { upsert: true },
    );
  }
  console.log('Datos iniciales cargados sin sobrescribir registros existentes.');
} finally {
  await cliente.close();
}
