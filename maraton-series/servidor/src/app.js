import express from 'express';
import cors from 'cors';
import { crearRepositorioMiembros } from './miembros/miembros.repository.js';
import { crearServicioMiembros } from './miembros/miembros.service.js';
import { crearControladorMiembros } from './miembros/miembros.controller.js';
import { crearRutasMiembros } from './miembros/miembros.routes.js';
import { crearRepositorioSeries } from './series/series.repository.js';
import { crearServicioSeries } from './series/series.service.js';
import { crearControladorSeries } from './series/series.controller.js';
import { crearRutasSeries } from './series/series.routes.js';
import { rutaNoEncontrada, manejarErrores } from './middlewares/errores.js';
// Recibe la base por parámetro: permite probar la aplicación sin abrir otro servidor.
export function crearApp(db, origen) {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: origen })); // Autoriza el origen de Vite.
  app.use(express.json({ limit: '32kb' })); // Convierte JSON antes de llamar a las rutas.
  const miembros = crearServicioMiembros(crearRepositorioMiembros(db));
  const series = crearServicioSeries(crearRepositorioSeries(db), miembros);
  app.use('/api/miembros', crearRutasMiembros(crearControladorMiembros(miembros)));
  app.use('/api/series', crearRutasSeries(crearControladorSeries(series)));
  app.use(rutaNoEncontrada); // Las rutas inexistentes se resuelven al final.
  app.use(manejarErrores); // Los errores siempre usan el mismo contrato.
  return app;
}

