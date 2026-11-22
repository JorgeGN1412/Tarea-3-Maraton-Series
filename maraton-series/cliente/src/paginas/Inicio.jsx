import { Link } from 'react-router';
export default function Inicio() {
  return (
    <section className="p-4 bg-light rounded">
      <h1>El próximo maratón empieza aquí</h1>

      <p>Organizá las propuestas del club y llevá el control de lo que falta ver.</p>

      <Link className="btn btn-primary" to="/series">
        Ver series
      </Link>
    </section>
  );
}
