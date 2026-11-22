# Banco de prueba local

Desde servidor:
```powershell
npm ci
npm run dev:local
```

Esto descarga (si hace falta) y ejecuta un binario oficial MongoDB 7.0.14, carga cinco series y cuatro miembros en maraton_pruebas y escucha en http://127.0.0.1:3000.
Iniciar el cliente en http://127.0.0.1:5173.

Este modo usa una base efímera y no sustituye la configuración normal de Atlas para la entrega.
Al detener el proceso se cierra la base de pruebas. No se modifican las colecciones del clúster Atlas.
La prueba integrada de creación, cambio de estado, detalle, filtros y borrado se realizó sobre este proceso real.
