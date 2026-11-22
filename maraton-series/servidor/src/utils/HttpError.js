// Error de aplicación: lleva el estado HTTP y los mensajes del contrato.
export class HttpError extends Error {
  constructor(estado, codigo, mensaje, detalles) {
    super(mensaje); // Conserva el mensaje y la pila del error.
    this.estado = estado; // Código HTTP, por ejemplo 400 o 404.
    this.codigo = codigo; // Código estable que puede interpretar el cliente.
    this.detalles = detalles; // Mensajes por campo para el formulario.
  }
}

