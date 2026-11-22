import { leerEntorno } from './config/env.js';
import { conectar } from './db/conexion.js';
import { crearApp } from './app.js';
// Primero configuración, después conexión y por último escucha: evita recibir pedidos sin base.
try {
  const config = leerEntorno();
  const { cliente, db } = await conectar(config);
  const servidor = crearApp(db, config.origen).listen(config.puerto, '127.0.0.1', () => {
    console.log('Conectado a MongoDB: ' + config.base);
    console.log('API escuchando en http://localhost:' + config.puerto);
  });
  for (const senal of ['SIGINT', 'SIGTERM']) process.once(senal, () => {
    servidor.close(async () => { await cliente.close(); process.exit(0); });
  });
  servidor.on('error', async error => { console.error(error.message); await cliente.close(); process.exitCode = 1; });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

