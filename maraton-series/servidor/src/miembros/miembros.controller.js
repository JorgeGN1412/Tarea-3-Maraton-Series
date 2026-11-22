// Traduce el resultado del servicio a una respuesta HTTP.
export function crearControladorMiembros(servicio) {
  return { listar: async (req, res) => res.json(await servicio.listar()) };
}
