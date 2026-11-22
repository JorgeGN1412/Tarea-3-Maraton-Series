import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ListaTours from './components/ListaTours.jsx';
import TablaReservas from './components/TablaReservas.jsx';
import Footer from './components/Footer.jsx';
// App reúne las cinco secciones sin mezclar sus responsabilidades.
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <ListaTours />
        <TablaReservas />
      </main>
      <Footer />
    </>
  );
}
