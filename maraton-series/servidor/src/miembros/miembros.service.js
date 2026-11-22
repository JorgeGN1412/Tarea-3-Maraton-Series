// El servicio centraliza reglas; el controlador no consulta la base directamente.
export function crearServicioMiembros(repositorio) {
  return {
    listar: async () =>
      (await repositorio.listar()).map((m) => ({ _id: m._id.toString(), nombre: m.nombre })),
    existe: async (id) => Boolean(await repositorio.buscarPorId(id)),
  };
}
