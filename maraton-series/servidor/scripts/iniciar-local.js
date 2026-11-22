// MongoDB real con WiredTiger y archivos persistentes; solo escucha en loopback.
// El nombre del paquete es mongodb-memory-server, pero dbPath y doCleanup:false
// hacen que este modo conserve la base al cerrar y volver a abrir la aplicación.
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { crearApp } from '../src/app.js';

const carpeta = fileURLToPath(new URL('../', import.meta.url));
const dbPath = fileURLToPath(new URL('../.datos-locales/', import.meta.url));
await mkdir(dbPath, { recursive: true });
let motor;
let conexion;
let servidor;
let cerrando = false;

async function cerrar(codigo = 0) {
  if (cerrando) return;
  cerrando = true;
  if (servidor) await new Promise((resolve) => servidor.close(resolve));
  if (conexion) await conexion.close();
  if (motor) await motor.stop({ doCleanup: false }); // Conserva WiredTiger en disco.
  process.exitCode = codigo;
}
try {
  motor = await MongoMemoryServer.create({
    binary: { version: '7.0.14' },
    instance: { port: 27018, ip: '127.0.0.1', dbPath, storageEngine: 'wiredTiger' },
  });
  conexion = new MongoClient(motor.getUri());
  await conexion.connect();
  const db = conexion.db('maraton');
  // La marca evita resucitar series iniciales que el usuario borró.
  const control = db.collection('_configuracion');
  if (!(await control.findOne({ _id: 'datos-iniciales-v1' }))) {
    await new Promise((resolve, reject) => {
      const carga = spawn(process.execPath, ['src/seed.js'], {
        cwd: carpeta,
        stdio: 'inherit',
        env: {
          ...process.env,
          MONGODB_URI: motor.getUri(),
          MONGODB_DB: 'maraton',
          CLIENT_ORIGIN: 'http://127.0.0.1:5173',
          PORT: '3001',
        },
      });
      carga.on('error', reject);
      carga.on('exit', (codigo) =>
        codigo === 0 ? resolve() : reject(new Error('Falló la carga inicial.')),
      );
    });
    await control.insertOne({ _id: 'datos-iniciales-v1', fecha: new Date() });
  }
  const app = crearApp(db, 'http://127.0.0.1:5173');
  servidor = await new Promise((resolve, reject) => {
    const instancia = app.listen(3001, '127.0.0.1', () => resolve(instancia));
    instancia.once('error', reject);
  });
  console.log('Maratón persistente: http://127.0.0.1:3001/api');
  console.log('Datos locales: ' + dbPath);
  await writeFile(
    new URL('../.datos-locales/instancia.json', import.meta.url),
    JSON.stringify({ pid: process.pid, inicio: new Date().toISOString() }),
  );
  for (const senal of ['SIGINT', 'SIGTERM']) process.once(senal, () => cerrar());
} catch (error) {
  console.error(error.message);
  await cerrar(1);
}
