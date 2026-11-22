import { MongoClient } from 'mongodb';
// Una conexión compartida: se establece antes de que Express reciba peticiones.
export async function conectar(config) {
  const cliente = new MongoClient(config.uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await cliente.connect();
    await cliente.db(config.base).command({ ping: 1 });
    return { cliente, db: cliente.db(config.base) };
  } catch (error) {
    await cliente.close();
    throw error;
  }
}

