# Guía para explicar el código

## Cambiar estado
1. TarjetaSerie recibe serie y onAvanzar como props.
2. El botón pasa una función flecha. Solo llama al callback al hacer clic.
3. PaginaSeries busca la serie actual y calcula el siguiente estado.
4. seriesApi construye PATCH con Content-Type y cuerpo JSON.
5. Express encuentra la ruta /:id/estado. El controlador extrae params.id y body.estado.
6. El servicio revisa el identificador y el estado permitido.
7. El repositorio convierte el id a ObjectId y ejecuta updateOne con $set.
8. El servicio vuelve a leer la serie con el miembro unido por $lookup.
9. La respuesta 200 llega al cliente. El setter funcional sustituye solo la serie actualizada.

## Quitar
Es el mismo recorrido, pero deleteOne elimina el documento y Express devuelve 204.
pedir no intenta leer JSON en un 204. El filtro del setter elimina la tarjeta tras confirmar.

## Agregar
FormularioSerie posee datos, errores y enviando. onChange lee name y value.
El spread conserva los otros campos del objeto. La validación produce un mensaje por campo.
onAgregar es una prop de función que conecta formulario y página.
El servidor fija Por ver y genera el id: nunca se confía en campos extra del cliente.
NuevaSerie usa useNavigate después de esperar la creación.
Si hay un error, se conserva lo escrito y el formulario lo muestra.

## Filtros
useSearchParams representa los filtros con estado y miembro en la dirección.
Se copia URLSearchParams para mantener los otros parámetros.
filter deriva la lista visible. Los conteos se calculan sobre todas las series.
No existe otro useState para visibles ni conteos: duplicarlos permitiría desincronizarlos.

## Detalle
useParams lee id. El efecto depende de id y se repite si cambia.
AbortController cancela la solicitud anterior. El catch ignora AbortError.
El router maneja una página desconocida; el API maneja una serie inexistente.

## Capas
- Rutas: método y dirección.
- Controlador: traduce HTTP a llamadas del servicio.
- Servicio: reglas y errores de negocio.
- Repositorio: operaciones de MongoDB.
- Middleware: errores con un contrato uniforme.

## .NET
Una entidad es una fila y un DbSet representa una tabla.
HasOne/WithMany describe una FK; UsingEntity representa favoritos con tabla intermedia.
Restrict impide borrar proponentes con series; IsUnique evita correos repetidos.
Select proyecta campos y relaciones sin serializar grafos completos.
ToListAsync es donde se ejecuta la consulta. Los id se convierten a texto en la respuesta.
Las dos migraciones y su comprobación siguen pendientes.

## Cómo leer una línea
- import: trae una dependencia o componente.
- const [valor, setValor] = useState(inicial): declara memoria y su función de actualización.
- await: espera una promesa sin bloquear todo el proceso.
- try/catch/finally: procesa éxito, error y limpieza.
- ...objeto: copia propiedades antes de reemplazar las que cambian.
- map: transforma una lista; filter: conserva elementos según una condición.
- =>: función flecha; no se ejecuta hasta que otra parte la invoca.
- return en una función React: describe el contenido JSX.
- {...props}: distribuye atributos de un objeto sobre el componente.
- ? : y &&: decisiones sobre qué contenido mostrar.

## Límites de esta versión
Una revisión estática no demuestra que el sistema funcione contra bases reales.
Las siete pruebas automatizadas comprueban reglas con repositorios sustitutos, no la persistencia.
La defensa exige reconocer y explicar esta diferencia. Antes de entregar se deben resolver los pendientes de verificacion.md.
