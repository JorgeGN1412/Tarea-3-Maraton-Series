# Revisión y verificación

## Resultado actual
El proyecto no está listo para etiquetar ni entregar. No se ha iniciado la Parte B.

| Comprobación | Resultado real |
| --- | --- |
| Reglas del servicio | 7 pruebas ejecutadas, 7 aprobadas |
| Sintaxis JS y JSX | Comprobada con Node y el analizador TypeScript disponible en VS Code |
| Imports relativos | Se comprobó la existencia de sus archivos |
| JSON | Archivos de configuración analizados |
| Instalación npm | Bloqueada: ENOTFOUND registry.npmjs.org |
| Build del cliente / lint | Pendiente de instalar dependencias |
| Prueba integrada React–Express–MongoDB | Pendiente de dependencias y conexión |
| Compilación .NET | Falló por NETSDK1045: SDK 8.0.201 no soporta net10.0 |
| SQL y migraciones | Pendientes de SDK 10, restauración de paquetes y conexión SQL |
| Capturas y experimentos | Pendientes; no se simularon |
| Apertura automática de VS Code | Se intentó; la CLI fue rechazada con EPERM y el inicio directo no confirmó apertura |
| GitHub y etiqueta tarea-3 | Pendientes de verificación final y repositorio remoto |

## Revisión aplicada
Se revisaron responsabilidades por capa, selección de campos permitidos, validación de id antes de consultar, diferencia 400/404, respuesta 204, errores por campo, cancelación de efectos y actualizaciones inmutables.
Se protegió el doble clic por tarjeta y se usan setters funcionales para respuestas asíncronas.
Se retiró el lockfile del cliente copiado porque ya no correspondía a package.json. Se generará un lockfile real al instalar; no se inventaron versiones resueltas.

## Pendientes concretos
1. Instalar dependencias desde una terminal con acceso al registro npm: scripts/preparar.ps1.
2. Confirmar que están disponibles las versiones indicadas por las guías; no sustituirlas sin documentarlo.
3. Configurar MONGODB_URI y MONGODB_DB en servidor/.env sin subirlos a Git.
4. Ejecutar seed en la base destinada al laboratorio y probar los recorridos HTTP.
5. Instalar SDK .NET 10 y restaurar los paquetes del laboratorio.
6. Generar y aplicar Inicial y GenerosFavoritos con sus snapshots.
7. Ejecutar ambas rutas .NET, consultas SQL y experimentos requeridos.
8. Capturar evidencia real y completar las observaciones ejecutadas por laboratorio.
9. Cotejar ejemplos secundarios de Conceptos_React.pdf y completar lo que falte. Los nueve ejercicios ya se incorporaron según sus enunciados.
10. Revisar el laboratorio HTML/Bootstrap/JS a React (tours), aún no implementado en este avance; es material adicional recibido y debe determinarse su inclusión final entre proyectos base.
11. Crear o vincular el repositorio personal de GitHub, subir el historial y etiquetar solo la entrega verificada.

## Alcance de los comentarios
El código incluye comentarios sobre responsabilidades y decisiones. Esta guía explica instrucciones y recorridos; las llaves de cierre y cada atributo repetido no llevan comentarios redundantes.
