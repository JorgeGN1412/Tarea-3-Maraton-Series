import TarjetaTecnico from './TarjetaTecnico.jsx';
export default function EjercicioProps() {
  return (
    <div className="soporte">
      <TarjetaTecnico nombre="Ana Rodríguez" area="Hardware" experiencia={5} turno="Tarde" />

      <TarjetaTecnico nombre="Luis Mora" area="Software" experiencia={2} />

      <TarjetaTecnico nombre="Sofía Vargas" area="Red" experiencia={8} turno="Noche" />
    </div>
  );
}
