// El contenido variable entra como children y el tipo decide el estilo.
export default function Aviso({ tipo = 'info', titulo, children }) {
  return (
    <div className={'aviso ' + tipo}>
      <strong>{titulo}</strong>
      {children}
    </div>
  );
}
