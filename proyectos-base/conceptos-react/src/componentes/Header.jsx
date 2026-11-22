// Un enlace de ancla por concepto: navegación dentro de la misma página.
export default function Header({ conceptos }) {
  return (
    <header>
      <h1>Mesa de ayuda · Conceptos de React</h1>
      <nav>
        {conceptos.map((c, i) => (
          <a key={c} href={'#concepto-' + (i + 1)}>
            {i + 1}. {c}
          </a>
        ))}
      </nav>
    </header>
  );
}
