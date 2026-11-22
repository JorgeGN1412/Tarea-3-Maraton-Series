import { HttpError } from './HttpError.js';
// Regla compartida para recursos con ObjectId: validar antes de llamar al driver.
export function revisarId(id) {
  if (typeof id !== 'string' || !/^[a-f0-9]{24}$/i.test(id))
    throw new HttpError(400, 'ID_INVALIDO', 'El identificador no es válido.');
}
