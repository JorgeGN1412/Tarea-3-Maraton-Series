import { Router } from 'express';
export function crearRutasSeries(controlador) {
    const router = Router();
    router.get('/', controlador.listar);
    router.post('/', controlador.crear);
    router.get('/:id', controlador.obtener);
    router.patch('/:id/estado', controlador.cambiarEstado);
    router.delete('/:id', controlador.eliminar);
    return router;
}
