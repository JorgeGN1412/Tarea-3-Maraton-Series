import { Outlet } from 'react-router';
import Encabezado from './Encabezado.jsx';
// El menú permanece; Outlet cambia según la ruta hija.
export default function Layout() {
  return <><Encabezado /><main className="container pb-5"><Outlet /></main></>;
}
