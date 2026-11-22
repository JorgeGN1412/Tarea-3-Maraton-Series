# Tarea 3 — Jorge David García Núñez

Parte A: proyectos base y Maratón de series acumulativo.
El código de partida proviene de los materiales facilitados por el docente.

## Ejecución
1. Servidor Express: `cd maraton-series/servidor`, `npm install`, copiar .env.example a .env, configurar MongoDB, `npm run seed` y `npm run dev`.
2. Cliente: `cd maraton-series/cliente`, `npm install`, copiar .env.example a .env y `npm run dev`. Abre http://localhost:5173.
3. Servidor .NET: consultar maraton-series/servidor-net/README.md. Usa SQL Server y el puerto 5080.
4. Proyectos base: `cd proyectos-base/conceptos-react`, `npm install`, `npm run dev`.

El cliente y el API ya se instalaron y se probaron con MongoDB real local de pruebas. Hay doce capturas reales y las dos migraciones .NET fueron generadas y aplicadas. La entrega aún requiere cerrar las verificaciones pendientes de docs/verificacion.md.

El cliente completo trabaja con Express. El servidor .NET implementa las dos rutas GET del laboratorio.
Los identificadores de SQL Server son números convertidos a texto; los de MongoDB son ObjectId convertidos a texto. Coinciden nombres y tipos del contrato, no los valores de los identificadores.

## Documentación
- [Laboratorios](docs/laboratorios.md)
- [Guía para la defensa](docs/guia-defensa.md)
- [Revisión y verificación](docs/verificacion.md)

La Parte B se incorpora en el repositorio grupal del Innovation Hub después de revisar el Avance 2 del equipo.
No se incluyen credenciales. La etiqueta tarea-3 se creará cuando se verifique la entrega completa.

## Ejecución local usada en las pruebas
En servidor: `npm run dev:local`. En cliente: `npm run dev`. Abrir http://127.0.0.1:5173. La base de este banco es efímera; ver servidor/PRUEBA_LOCAL.md.
