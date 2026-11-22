import { ObjectId } from 'mongodb';
// El repositorio es la única capa del módulo que conoce MongoDB.
export function crearRepositorioMiembros(db) {
  const coleccion = db.collection('miembros');
  return {
    listar: () => coleccion.find({}, { projection: { nombre: 1 } }).sort({ nombre: 1 }).toArray(),
    buscarPorId: (id) => coleccion.findOne({ _id: new ObjectId(id) }),
  };
}

