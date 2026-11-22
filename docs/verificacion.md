# Revisión y verificación — 22 de noviembre de 2026

## Resultados ejecutados

| Comprobación          | Resultado                                                                            | Evidencia                                               |
| --------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Servicio Express      | Siete pruebas aprobadas                                                              | npm test                                                |
| Integración HTTP real | CRUD completo; ids; errores 400, 404 y DELETE 204                                    | pruebas-http.json                                       |
| React acumulativo     | Filtros combinados, formulario, detalle, errores y rutas                             | Capturas 01–12                                          |
| Persistencia MongoDB  | Creación y borrado se conservaron en reinicios distintos                             | pruebas-persistencia.json y capturas 15–16              |
| Cliente React         | Lint sin errores; build de producción aprobado                                       | Vite 8.3.8                                              |
| Proyectos base        | Instalados y compilados Conceptos, Solicitudes y Tours; linter de Conceptos aprobado | pruebas-bases.json                                      |
| Conceptos React       | Estado, pausa, lista inmutable, ficha y disponibilidad probados en navegador         | Captura 17                                              |
| Solicitudes           | Composición React y registro/consulta HTML con localStorage                          | Capturas 18–19                                          |
| Tours                 | HTML y React con tres tarjetas y cuatro filas                                        | Capturas 20–21                                          |
| Series JS             | Consulta real a TVmaze con resultados, carga y vacío                                 | Captura 22                                              |
| .NET                  | GET miembros y series con HTTP 200; cuatro miembros y cinco series                   | diagnostico-net.json; pruebas-http.json; capturas 13–14 |
| Compilación .NET      | SDK 10.0.404; cero errores y cero advertencias                                       | Compilación del servidor y del verificador SQL          |
| SQL y migraciones     | Dos migraciones aplicadas; cinco series, cuatro miembros, seis favoritos             | pruebas-sql.json                                        |
| Restricciones SQL     | FK 547, UNIQUE 2601, CHECK 547 y RESTRICT 547                                        | pruebas-sql.json                                        |
| Modelo sin migración  | EF rechazó el cambio 100 → 120 con PendingModelChangesWarning                        | pruebas-sql.json                                        |
| Reconstrucción        | Base aislada creada con ambas migraciones y eliminada al terminar                    | pruebas-sql.json                                        |

## Revisión de código

- Se validan ids antes de convertirlos a ObjectId.
- El servidor selecciona campos permitidos y fija el estado inicial Por ver.
- Se distinguen formato inválido, recurso inexistente y errores por campo.
- DELETE 204 termina la respuesta y el cliente evita llamar json() sin cuerpo.
- map/filter y setters funcionales conservan la inmutabilidad y las actualizaciones vigentes.
- Un Set evita operaciones duplicadas sobre la misma tarjeta antes del siguiente render.
- Los efectos se cancelan al desmontar; AbortError no se muestra como error de conexión.
- El detalle se identifica con key={id}, evitando reinicios síncronos dentro del efecto.
- El bootstrap local conserva WiredTiger y una marca de inicialización evita resucitar datos borrados.
- Se excluyen archivos de la base del análisis de sintaxis y del repositorio.
- Se corrigió la dependencia transitiva Pkcs a 9.0.21 y se conserva formato legible con Prettier.

## Entorno y límites observados

El acceso del asistente por terminal tiene restricciones de red y tuberías.
Los procesos iniciados normalmente desde VS Code sí pudieron instalar paquetes,
consultar los API y conectar SQL Server. No se cambiaron firewall ni certificados.

Atlas devolvió un error TLS. Para la ejecución habitual se dejó MongoDB real
local con persistencia en disco y se verificó tras reiniciar; Atlas ya no es
un requisito para ejecutar este proyecto en este equipo.

El SDK global del equipo es 8. La compilación válida usa el SDK 10 paralelo.
El editor inicial seleccionaba 8 y mostraba NETSDK1045. Se abrió una instancia
del editor con entorno SDK 10 y perfil separado: cargó ambos proyectos para
IntelliSense y mostró No Problems. El PATH global y el perfil usual se conservaron.
Puede volver a abrirse con scripts/abrir-vscode-net10.ps1.

Las dos versiones de Tours se verificaron también con viewport de 390 px y
menú desplegable; las capturas 24 y 25 conservan esa evidencia.
Los cambios deliberadamente incorrectos no ejecutados se identifican
explícitamente por laboratorio. No se inventaron resultados.

## Entrega

Repositorio personal de la Parte A: https://github.com/JorgeGN1412/Tarea-3-Maraton-Series.
La etiqueta de entrega es tarea-3. La Parte B aún no se ha iniciado: requiere revisar el repositorio del equipo y el Avance 2.

## Cierre de la verificación

La compilación final usa await app.RunAsync y volvió a responder 200 en las
tres comprobaciones .NET. La prueba HTTP integral se repitió contra esa
compilación. El editor con SDK 10 cargó los dos proyectos y quedó sin errores
ni advertencias; captura 27-vscode-sin-errores.png.
