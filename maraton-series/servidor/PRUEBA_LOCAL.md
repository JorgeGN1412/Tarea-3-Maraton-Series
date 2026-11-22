# MongoDB persistente local

Desde servidor: npm ci y npm run dev:local. La primera ejecución descarga el
binario oficial MongoDB 7.0.14. El paquete mongodb-memory-server administra
un proceso MongoDB real; WiredTiger, dbPath y doCleanup:false conservan los
archivos al cerrar y volver a abrir.

| Recurso      | Configuración                                             |
| ------------ | --------------------------------------------------------- |
| MongoDB      | 127.0.0.1:27018; versión 7.0.14                           |
| Base         | maraton                                                   |
| Archivos     | servidor/.datos-locales; excluidos de Git y de la entrega |
| API          | http://127.0.0.1:3001/api                                 |
| Origen React | http://127.0.0.1:5173                                     |

La primera carga crea cuatro miembros y cinco series. Una marca en
_configuracion evita repetirla: no reaparecen las series borradas al reiniciar.
Ctrl+C cierra API, conexión y motor.

Se verificó una creación tras reiniciar y su borrado tras otro reinicio.
Ver docs/pruebas-persistencia.json en la raíz. El banco efímero usado para las
primeras doce capturas quedó sustituido por este modo habitual persistente.
No se modifican colecciones de Atlas.

Desde la extensión MongoDB de VS Code conectar a mongodb://127.0.0.1:27018
mientras este proceso está ejecutándose. Solo escucha en loopback.
