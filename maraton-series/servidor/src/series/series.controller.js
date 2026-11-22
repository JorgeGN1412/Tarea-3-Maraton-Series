// Controladores delgados: reciben HTTP, delegan y seleccionan el estado de respuesta.
export function crearControladorSeries(servicio) {
  return {
    listar: async (req, res) => res.json(await servicio.listar()),
    obtener: async (req, res) => res.json(await servicio.obtener(req.params.id)),
    crear: async (req, res) => res.status(201).json(await servicio.crear(req.body)),
    cambiarEstado: async (req, res) =>
      res.json(await servicio.cambiarEstado(req.params.id, req.body?.estado)),
    eliminar: async (req, res) => {
      await servicio.eliminar(req.params.id);
      res.status(204).end();
    },
  };
}
