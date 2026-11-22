# Laboratorios — Parte A



**Estado: implementación en progreso; no lista para entrega.**



Se añadieron doce capturas reales y se probó el recorrido React–Express–MongoDB local. Las observaciones específicas de cada experimento conservan su estado pendiente cuando todavía no se ejecutó. Ver verificacion.md y capturas/README.md para los resultados actualizados.



## 1. Proyectos base: conceptos de React



Código: `proyectos-base/conceptos-react`.



Ejercicios implementados: tarjetas de técnicos; avisos; tabla de técnicos; técnicos por área; encuesta; turno de atención; tareas; selector y ficha; panel de técnicos.



#

## Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | El padre crea datos → props llegan al hijo → JSX produce la interfaz → un evento ejecuta un setter → React vuelve a dibujar. |



### Respuestas y explicación



Props son entradas de solo lectura. children es el contenido anidado. map genera elementos con key estable. El estado recuerda datos entre dibujos; un valor derivado se calcula desde ellos.



### Experimentos y observaciones



Quitar key debe producir una advertencia; usar un índice puede asociar el estado a otra fila. Llamar onClick={funcion()} ejecuta al dibujar. No usar preventDefault provoca envío del formulario.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 2. Registro y consulta de solicitudes



Código: `proyectos-base/solicitudes`.



Se agregó consulta.html con filtro y contador; se conservaron HTML y JS del material de partida.



#

## Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Registro HTML → objeto → JSON.stringify → localStorage → consulta HTML → filtro. La versión React separa siete componentes y muestra las dos páginas. |



### Respuestas y explicación



Menu y ListaSolicitudes se reutilizan. class se convierte a className y for a htmlFor. La consigna limita la Parte 2 a composición estática; no exige registrar ni filtrar desde React.



### Experimentos y observaciones



Cambiar de página con el mismo origen debe permitir leer las solicitudes persistidas. El filtro Todas muestra todos los registros.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 3. Montaje del Maratón



Código: `maraton-series/cliente`.



El estado final usa la estructura cliente/servidor/servidor-net de la Tarea 3.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | index.html → main.jsx → createRoot → BrowserRouter → App → Layout → página. |



### Respuestas y explicación



Vite transforma JSX. main.jsx monta React en root. Bootstrap es una dependencia local. El cliente y el API tienen package.json independientes.



### Experimentos y observaciones



El montaje en navegador y la captura inicial están pendientes de instalar dependencias.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 4. Armar el tablero con componentes



Código: `maraton-series/cliente/src/componentes`.



El estado acumulativo conserva la separación del tablero; Pagina.jsx del material inicial queda como referencia de composición con children.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Página → Panel → ListaSeries → TarjetaSerie → callback del padre. |



### Respuestas y explicación



Panel recibe titulo y children; ListaSeries convierte datos en tarjetas; TarjetaSerie avisa con el id y no modifica la base. El identificador estable es la key.



### Experimentos y observaciones



Una lista vacía debe mostrar «Ninguna serie coincide con los filtros.». En la etapa inicial los botones solo escribían en consola; la versión final llama al API.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 5. ¿Por qué no basta una variable?



Código: `maraton-series/cliente/src/paginas/PaginaSeries.jsx`.



El experimento temporal no se deja activo en el estado final.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Clic → función quitar → variable local cambia → no se solicita otro render. |



### Respuestas y explicación



Una variable normal no avisa a React y se reinicializa en el siguiente dibujo. El setter de useState conserva el dato y solicita un nuevo render.



### Experimentos y observaciones



Con let la consola puede mostrar menos series mientras las tarjetas siguen iguales. Restaurar el código correcto después del experimento. Ejecución pendiente.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 6. Cambiar estado y quitar con useState



Código: `maraton-series/cliente/src/paginas/PaginaSeries.jsx`.



La versión final usa setters funcionales tras esperar al API.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Tarjeta → onAvanzar/onQuitar → map/filter → setSeries → lista nueva. |



### Respuestas y explicación



filter devuelve otro arreglo sin la serie eliminada. map conserva las demás referencias y copia el objeto que cambia. El spread debe ir antes del campo actualizado. No se usa push ni splice sobre el estado.



### Experimentos y observaciones



El ciclo es Por ver → Viendo → Vista → Por ver. En la etapa local, F5 recuperaba los datos iniciales; en la final, F5 consulta MongoDB y conserva cambios.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 7. Filtros y resumen



Código: `maraton-series/cliente/src/componentes/filtros/Filtros.jsx`.



Se conservan los filtros al cambiar el otro parámetro. La versión final almacena la selección en la URL.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Selección → callback → parámetros URL → lista derivada → ListaSeries y Resumen. |



### Respuestas y explicación



El estado se eleva al ancestro común. Lista visible y conteos no son estados adicionales. Los dos filtros se combinan con AND. El resumen cuenta la lista completa, no solo lo visible.



### Experimentos y observaciones



Sin filtro: 5 series, Por ver 2, Viendo 1, Vista 2. Ana tiene Dark y Planeta Tierra. Ana + Viendo debe mostrar lista vacía antes de modificar los datos.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 8. Formulario controlado



Código: `maraton-series/cliente/src/componentes/formulario/FormularioSerie.jsx`.



Se conserva el formulario cuando falla el API y se limpia solo al confirmar. Se normaliza titulo con trim y temporadas con Number.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | onChange → name/value → copia del objeto datos → submit → validarSerie → onAgregar. |



### Respuestas y explicación



value procede del estado y onChange lo modifica. Un solo manejador usa name para elegir la propiedad. preventDefault evita recargar. Los errores se muestran junto al campo. El id y estado inicial son responsabilidad del servidor.



### Experimentos y observaciones



Omitir ...actuales descarta otros campos. Enviar vacío debe mostrar cuatro errores. Temporadas 0, 31 y decimales se rechazan. Prueba visual pendiente.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 9. Consumo de APIs con JavaScript



Código: `proyectos-base/series-js`.



La búsqueda ocurre al enviar. Secuencia de peticiones descarta resultados antiguos. Se contempla ausencia de portada, género o fecha.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | submit → api.js → fetch → response.ok → JSON → render.js → DOM. |



### Respuestas y explicación



fetch no lanza un error solo por recibir 404: hay que revisar ok. textContent evita interpretar contenido externo como HTML. JSONPlaceholder simula POST; no guarda propuestas de forma permanente.



### Experimentos y observaciones



Buscar dark: resultados; texto inexistente: vacío; red lenta: carga; desconexión: error. Propuesta válida debe mostrar éxito simulado. Pruebas externas pendientes por red.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 10. Estructura del API



Código: `maraton-series/servidor`.



Se separaron miembros y series, con sus cuatro capas.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | index → configuración → conexión → app → rutas → controlador → servicio → repositorio. |



### Respuestas y explicación



El cliente no conoce la contraseña de MongoDB. .env contiene configuración privada y .env.example contiene la plantilla. Cada capa tiene una responsabilidad y no se anidan los dos proyectos npm.



### Experimentos y observaciones



Falta una variable obligatoria: el arranque debe detenerse. La prueba de configuración incompleta pasó.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 11. El API escuchando peticiones



Código: `maraton-series/servidor/src/app.js`.



HttpError lleva estado, codigo, mensaje y detalles. Express 5 propaga los rechazos de los controladores async.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Petición → cors → express.json → rutas → rutaNoEncontrada → manejarErrores. |



### Respuestas y explicación



Los middlewares se ejecutan en orden. express.json prepara req.body. El manejador de errores tiene cuatro parámetros. 400 indica solicitud inválida; 404 indica ruta o recurso ausente.



### Experimentos y observaciones



JSON mal formado debe responder 400 JSON_INVALIDO. Una ruta inexistente debe devolver 404 con el contrato uniforme. Pruebas HTTP pendientes de dependencias.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 12. Conexión con MongoDB y módulo miembros



Código: `maraton-series/servidor/src/miembros`.



El seed es idempotente: no borra ni sobrescribe cambios del usuario. Crea índice único de correo.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | GET /api/miembros → rutas → controlador → servicio → repositorio → find → sort → JSON. |



### Respuestas y explicación



MongoClient se comparte. Se conecta antes de escuchar. El repositorio usa proyección para no devolver correo u otros datos que el contrato no pide. El servicio convierte ObjectId a texto.



### Experimentos y observaciones



Con la base disponible se esperan Ana, Diego, Luis y Sofía en orden por nombre. La conexión real y la evidencia están pendientes.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 13. Series: listar y crear



Código: `maraton-series/servidor/src/series`.



Las pruebas verificaron que no se inserta un miembro inexistente ni un estado elegido por el cliente.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | POST → JSON → validar campos → comprobar miembro → insertOne → consultar con $lookup → 201. |



### Respuestas y explicación



La validación del cliente mejora la experiencia; el servidor vuelve a validar. $lookup une la referencia miembroId con miembros. Se eligen campos permitidos y el estado inicial siempre es Por ver.



### Experimentos y observaciones



Temporadas fuera de rango o miembro inexistente deben responder 400 con detalles; creación válida responde 201. La persistencia real falta por verificar.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 14. Series: cambiar estado y eliminar



Código: `maraton-series/servidor/src/series/series.service.js`.



Pruebas del servicio para id inválido, recurso ausente y borrado ausente pasaron.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | PATCH/DELETE → revisarId → servicio → updateOne/deleteOne → comprobar resultado → respuesta. |



### Respuestas y explicación



400: formato inválido. 404: formato válido sin documento. matchedCount permite reconocer una actualización válida incluso si el valor no cambió. DELETE correcto devuelve 204 sin cuerpo.



### Experimentos y observaciones



Eliminar dos veces debe producir primero 204 y después 404. Estado Terminada debe responder 400. Falta ejecutar estas rutas contra MongoDB.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 15. React lee el API



Código: `maraton-series/cliente/src/paginas/PaginaSeries.jsx`.



Los datos ya no proceden de seriesIniciales; se consultan al API.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Montaje → useEffect → Promise.all → GET series y miembros → setters → pantalla. |



### Respuestas y explicación



El efecto obtiene datos después del montaje. Cargando, error y resultados son estados distintos. Promise.all permite pedir las dos listas en paralelo. La limpieza cancela peticiones al salir.



### Experimentos y observaciones



API apagado: mensaje de conexión. Base con datos: cinco series. No se debe guardar una contraseña en VITE_API_URL. Prueba integrada pendiente.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 16. El formulario crea con POST



Código: `maraton-series/cliente/src/paginas/NuevaSerie.jsx`.



Los errores por campo atraviesan agregar y llegan al catch del formulario. useNavigate vuelve a la lista tras confirmar.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | Formulario → agregar → crearSerie → pedir → POST → servicio → MongoDB → 201 → navegar. |



### Respuestas y explicación



Se manda Content-Type application/json y JSON.stringify. El select guarda miembroId, no el nombre. await permite conservar campos y mostrar errores si el servidor rechaza. disabled evita envíos duplicados.



### Experimentos y observaciones



Sin await, el formulario se limpiaría antes de saber si se guardó. En la versión correcta un error conserva lo escrito. La recarga debe conservar una serie creada.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 17. Cambiar estado y quitar desde React



Código: `maraton-series/cliente/src/paginas/PaginaSeries.jsx`.



Un Set bloquea dos operaciones simultáneas sobre la misma tarjeta; otras tarjetas pueden operar independientemente.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | 1 Tarjeta → 2 operar → 3 seriesApi → 4 rutas/controller → 5 servicio → 6 repositorio → 7 respuesta → 8 setter funcional. |



### Respuestas y explicación



El API confirma antes de cambiar la pantalla. Una respuesta 204 se procesa sin json(). El setter funcional usa la lista vigente, evitando revivir elementos al recibir respuestas de operaciones concurrentes.



### Experimentos y observaciones



Dos pestañas: borrar en una y repetir en otra debe mostrar 404. Sin caso 204, json() falla aunque el borrado ocurrió. Sin setter funcional, dos borrados con red lenta pueden reintroducir una tarjeta. Pendiente de ejecutar.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 18. React Router



Código: `maraton-series/cliente/src/App.jsx`.



Se implementan inicio, lista, detalle, nueva serie y ruta comodín.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | 1 Link → 2 BrowserRouter/historial → 3 Routes → 4 Outlet → 5 useParams → 6 useEffect [id] → 7 obtenerSerie → 8 GET /:id → 9 setResultado. |



### Respuestas y explicación



Link usa el historial sin pedir un documento completo. Layout no necesita path porque solo comparte estructura. /peliculas lo detecta el cliente; una serie ausente la detecta el API. [id] recarga al cambiar de detalle. AbortController cancela la solicitud anterior. Los filtros en URL sobreviven a recarga y Atrás.



### Experimentos y observaciones



10.1 Con a href se recarga el documento. 10.2 Sin Outlet solo se ve el encabezado. 10.3 Sin limpieza se completan solicitudes redundantes. 10.4 AbortError no es un error de conexión. 10.5 El comodín al inicio no desplaza rutas más específicas. Todos pendientes de evidencia en navegador.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.



## 19. EF Core y SQL Server



Código: `maraton-series/servidor-net`.



Entidades, restricciones, favoritos y rutas escritas. Compilación aprobada con SDK 10.0.404, dos migraciones generadas y aplicadas a SQL Server. Las respuestas HTTP del servidor siguen en comprobación.



### Explique el recorrido



| Paso | Qué ocurre |

| --- | --- |

| Recorrido | 1 Kestrel → 2 MapGet → 3 DbContext inyectado → 4 conexión desde configuración → 5 LINQ OrderBy/Select → 6 ToListAsync → 7 SQL con JOIN → 8 objetos proyectados a JSON. |



### Respuestas y explicación



Una FK garantiza la existencia del miembro; Restrict protege registros referenciados. generosFavoritos necesita tabla intermedia por ser muchos a muchos. Migraciones se versionan; conexión vive en user-secrets. Select construye el contrato y EF lo traduce a SQL. Cambiar el modelo requiere migración. El cliente completo sigue usando Express porque .NET solo tiene dos GET.



### Experimentos y observaciones



E1 FK inexistente: rechazo. E2 correo duplicado: rechazo. E3 estado inválido: rechazo. E4 borrar proponente: rechazo. 12.5 cambio sin migración: detectar desajuste. 12.6 recreación de base: no ejecutada; requiere base aislada y migraciones. No se afirma haber realizado estos experimentos.



**Captura:** pendiente de ejecución real; no se adjunta evidencia simulada.
