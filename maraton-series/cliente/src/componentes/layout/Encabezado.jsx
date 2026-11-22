import { Link, NavLink } from 'react-router';
// NavLink agrega active y aria-current a la página seleccionada.
export default function Encabezado() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Maratón de series
        </Link>

        <div className="navbar-nav">
          <NavLink className="nav-link" to="/" end>
            Inicio
          </NavLink>

          <NavLink className="nav-link" to="/series">
            Series
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
