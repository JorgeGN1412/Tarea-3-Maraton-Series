# Revisión y verificación — actualización del 22 de noviembre de 2026

## Comprobaciones reales
| Comprobación | Resultado |
| --- | --- |
| Dependencias del cliente y del API | Instaladas desde la terminal de VS Code; lockfiles reales generados |
| Cliente React | Build de producción correcto (Vite 8.3.8) |
| Linter del cliente | 0 errores y 0 advertencias después de corregir el reinicio del detalle |
| Reglas del servicio | 7 pruebas aprobadas |
| Prueba integrada React–Express–MongoDB | Aprobada con proceso MongoDB real local 7.0.14 de pruebas |
| Filtros | Estado y miembro combinados; recarga conserva parámetros en la URL |
| Formulario | Cuatro errores al enviar vacío; creación válida de Severance |
| Persistencia durante la ejecución | Serie creada, estado actualizado y eliminación confirmados tras recargar |
| Detalle | Enlace directo y recarga correctos |
| Errores del detalle | Identificador inválido y serie inexistente muestran mensajes diferentes |
| Ruta desconocida del cliente | Página no encontrada verificada |
| Capturas | 12 imágenes reales en docs/capturas |
| SDK .NET | 10.0.404 descargado de Microsoft, SHA512 comprobado, preparado en carpeta de trabajo |
| Compilación .NET | 0 errores y 0 advertencias |
| Migraciones | Inicial y GenerosFavoritos generadas por EF Core y aplicadas a Maraton_Tarea3_Jorge |
| Conteos SQL manuales | 5 filas en Series y 6 en MiembroGeneros, comprobadas con sqlcmd |
| API .NET | Verificada desde la terminal normal: raíz, GET miembros y GET series devolvieron 200 en el puerto 5090; 4 miembros y 5 series con identificadores de texto. Evidencia: diagnostico-net.json |

## Qué significaban los bloqueos anteriores
Los comandos ejecutados por el asistente tenían restricciones de red y acceso a ciertos directorios.
La terminal de VS Code del usuario sí pudo descargar los paquetes. No era un fallo general de npm en la computadora.
El SDK 8 no compila net10.0; se preparó un SDK 10 paralelo sin sustituir el 8.

## MongoDB de pruebas y Atlas
La conexión Atlas existente devolvió un error TLS al cargar datos. No se modificaron certificados, controles de red ni datos del clúster.
La comprobación funcional usó mongodb-memory-server, que ejecuta un proceso MongoDB real local. No es un repositorio falso ni una simulación de la base.
Los datos de este banco son efímeros: se recrean al reiniciarlo. La prueba de persistencia demuestra conservación entre recargas de página mientras la base sigue ejecutándose.
El modo normal conserva la conexión en servidor/.env, excluido de Git. Aún falta resolver Atlas o preparar un MongoDB local persistente para la ejecución habitual y la defensa.

## Revisión de código aplicada
- Validación de identificadores antes de convertirlos a ObjectId.
- Selección explícita de campos permitidos al crear.
- Diferenciación entre HTTP 400 y 404, y procesamiento de DELETE 204 sin JSON.
- Actualización del estado después de confirmar el API, con setters funcionales.
- Bloqueo de doble clic por tarjeta.
- Cancelación de efectos con AbortController.
- Reinicio del detalle mediante key al cambiar id, evitando el aviso de set-state-in-effect.
- Actualización explícita de Pkcs a 9.0.21 para corregir las advertencias transitivas encontradas en la compilación .NET.
- Separación entre hechos ejecutados y experimentos pendientes.

## Pendientes antes de entregar
1. Unificar el arranque habitual de .NET en el puerto documentado y capturar ambos GET. Los dos GET ya están verificados en 5090; revisar la instancia anterior de 5080 sin atribuirle una causa no comprobada.
2. Verificar las consultas y los experimentos de restricciones SQL, y agregar su evidencia.
3. Completar capturas y experimentos de cada laboratorio anterior que la consigna pide por separado.
4. Ejecutar y cotejar los proyectos base completos, no solo su sintaxis.
5. Resolver la conexión habitual de MongoDB; el banco efímero solo se usó para pruebas.
6. Crear o vincular el repositorio personal de GitHub y etiquetar tarea-3 solo cuando todo esté verificado.
7. Revisar el repositorio y los documentos del equipo antes de comenzar la Parte B.

La Parte A sigue en desarrollo. La Parte B no se ha iniciado.
