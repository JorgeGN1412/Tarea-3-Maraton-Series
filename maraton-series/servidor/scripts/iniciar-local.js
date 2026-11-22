// Banco de pruebas: usa un proceso MongoDB real descargado por mongodb-memory-server.
// Los datos son efímeros y se cargan exclusivamente en maraton_pruebas.
// El servidor habitual conserva su conexión Atlas en .env.
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { crearApp } from '../src/app.js';

const carpeta = fileURLToPath(new URL('../', import.meta.url));
const motor = await MongoMemoryServer.create({ binary: { version: '7.0.14' } });
const entorno = { ...process.env, MONGODB_URI: motor.getUri(), MONGODB_DB: 'maraton_pruebas', CLIENT_ORIGIN: 'http://127.0.0.1:5173', PORT: '3000' };
await new Promise((resolve, reject) => {
    const carga = spawn(process.execPath, ['src/seed.js'], { cwd: carpeta, env: entorno, stdio: 'inherit' });
    carga.on('error', reject);
    carga.on('exit', codigo => codigo === 0 ? resolve() : reject(new Error('Falló la carga de datos: ' + codigo)));
});
const conexion = new MongoClient(entorno.MONGODB_URI);
await conexion.connect();
const app = crearApp(conexion.db(entorno.MONGODB_DB), entorno.CLIENT_ORIGIN);
const servidor = app.listen(3000, '127.0.0.1', () => console.log('API de pruebas con MongoDB real en http://127.0.0.1:3000'));
for (const senal of ['SIGINT', 'SIGTERM']) process.once(senal, () => {
    servidor.close(async () => { await conexion.close(); await motor.stop(); process.exit(0); });
});
