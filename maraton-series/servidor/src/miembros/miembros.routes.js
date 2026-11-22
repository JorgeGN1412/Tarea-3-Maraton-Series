import { Router } from 'express';
export function crearRutasMiembros(controlador) {
  const router = Router();
  router.get('/', controlador.listar); // GET /api/miembros.
  return router;
}

