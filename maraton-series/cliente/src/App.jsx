import { Route, Routes } from 'react-router';
import Layout from './componentes/layout/Layout.jsx';
import Inicio from './paginas/Inicio.jsx';
import PaginaSeries from './paginas/PaginaSeries.jsx';
import DetalleSerie from './paginas/DetalleSerie.jsx';
import NuevaSerie from './paginas/NuevaSerie.jsx';
import NoEncontrada from './paginas/NoEncontrada.jsx';
// Mapa declarativo: el router elige la ruta más específica.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />

        <Route path="series" element={<PaginaSeries />} />

        <Route path="series/nueva" element={<NuevaSerie />} />

        <Route path="series/:id" element={<DetalleSerie />} />

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
