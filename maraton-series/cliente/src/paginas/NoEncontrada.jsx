import { Link } from 'react-router';
// Este 404 pertenece al cliente; no es una respuesta HTTP del API.
export default function NoEncontrada() {
    return <section><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></section>;
}
