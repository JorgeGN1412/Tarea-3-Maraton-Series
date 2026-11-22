import { ObjectId } from 'mongodb';
// $lookup transforma la referencia miembroId en el nombre que necesita React.
export function crearRepositorioSeries(db) {
  const coleccion = db.collection('series');
  function consultar(filtro) {
    return coleccion.aggregate([
      { $match: filtro },
      { $sort: { _id: 1 } },
      { $lookup: { from: 'miembros', localField: 'miembroId', foreignField: '_id', as: 'persona' } },
      { $unwind: '$persona' },
      { $project: { _id: { $toString: '$_id' }, titulo: 1, genero: 1, temporadas: 1,
        estado: 1, miembroId: { $toString: '$miembroId' }, miembro: '$persona.nombre' } },
    ]).toArray();
  }
  return {
    listar: () => consultar({}),
    buscarPorId: async id => (await consultar({ _id: new ObjectId(id) }))[0] || null,
    crear: async datos => (await coleccion.insertOne({ ...datos, miembroId: new ObjectId(datos.miembroId) })).insertedId.toString(),
    cambiarEstado: (id, estado) => coleccion.updateOne({ _id: new ObjectId(id) }, { $set: { estado } }),
    eliminar: id => coleccion.deleteOne({ _id: new ObjectId(id) }),
  };
}

