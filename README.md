# Tarea 3 — Jorge David García Núñez

SOFT-12 · Programación Web Avanzada · Universidad CENFOTEC.

Parte A: proyectos base y estado final acumulativo del Maratón de series. El
material de partida corresponde a las guías del docente Álvaro Cordero Peña.
Ver [laboratorios](docs/laboratorios.md) para recorridos, respuestas y evidencia.

## Requisitos

- Node.js 22.12 o superior compatible con Vite, y npm.
- SDK .NET 10; EF Core y dotnet-ef 10.0.14.
- SQL Server con autenticación integrada o una cadena configurada fuera del repositorio.
- Internet para instalar dependencias, descargar inicialmente MongoDB y consultar las APIs públicas.

## Maratón: tres procesos simultáneos

Cada bloque se ejecuta desde la raíz, en una terminal distinta.

### 1. Express y MongoDB persistente local

```powershell
cd maraton-series/servidor
npm ci
npm run dev:local
```

API: http://127.0.0.1:3001/api. El comando administra un MongoDB real 7.0.14
en 127.0.0.1:27018 con WiredTiger. Conserva documentos en `.datos-locales`,
carga los ejemplos una sola vez y no vuelve a insertar series borradas al
reiniciar. La carpeta de datos está excluida del repositorio. Detener con Ctrl+C.
Ver [ejecución local](maraton-series/servidor/PRUEBA_LOCAL.md).

Para usar una instalación MongoDB existente o Atlas, copiar `.env.example` a
`.env`, adaptar MONGODB_URI, MONGODB_DB, CLIENT_ORIGIN y PORT; ejecutar
`npm run seed` una vez y `npm run dev`. El modo local persistente ya permite
realizar la defensa sin depender de Atlas.

### 2. Cliente React

```powershell
cd maraton-series/cliente
npm ci
Copy-Item .env.example .env
npm run dev
```

Abrir http://127.0.0.1:5173. Usar el mismo host 127.0.0.1 en CLIENT_ORIGIN.
Si ya existe .env, revisar su URL antes de reemplazarlo. El cliente completo
permite listar, filtrar por URL, abrir detalle, crear, cambiar estado y quitar.
Todas sus operaciones apuntan a Express.

### 3. ASP.NET Core, EF Core y SQL Server

Preparación inicial con el SDK 10:

```powershell
cd maraton-series/servidor-net
dotnet restore
dotnet tool install --global dotnet-ef --version 10.0.14
dotnet user-secrets set "ConnectionStrings:Maraton" "Server=localhost;Database=Maraton_Tarea3_Jorge;Trusted_Connection=True;TrustServerCertificate=True"
dotnet ef database update
dotnet run --launch-profile http
```

Si dotnet-ef ya está instalado, comprobar su versión. Ajustar la instancia SQL
al equipo. La cadena también puede suministrarse en ConnectionStrings__Maraton
como variable de entorno, fuera del repositorio.

En este equipo el SDK 10 está preparado en la carpeta de trabajo paralela;
el SDK global sigue siendo 8. Desde la raíz se puede usar
`./scripts/iniciar-net.ps1`, que selecciona el SDK 10 preparado cuando existe.
Para abrir VS Code con análisis C# y terminales usando este mismo SDK, ejecutar
`./scripts/abrir-vscode-net10.ps1`. Abre un perfil separado y conserva el entorno global.
En otra computadora se utiliza el SDK 10 instalado normalmente.

Servidor: http://127.0.0.1:5090. GET /api/miembros y /api/series están verificados
con SQL Server real. Los ids de SQL son números convertidos a texto y los de
MongoDB ObjectId convertidos a texto: coinciden campos y tipos, no sus valores.
.NET implementa los dos GET solicitados; el CRUD completo sigue usando Express.

## Proyectos base

| Proyecto                                       | Ejecución dentro de su carpeta          | Dirección             |
| ---------------------------------------------- | --------------------------------------- | --------------------- |
| conceptos-react: nueve conceptos y ejercicios  | npm ci; npm run dev                     | http://127.0.0.1:5174 |
| solicitudes/parte2-react: composición estática | npm ci; npm run dev -- --host 127.0.0.1 | http://127.0.0.1:5175 |
| pura-vida-tours/parte2-react                   | npm ci; npm run dev                     | http://127.0.0.1:5176 |
| series-js: APIs públicas                       | npm ci; npm run dev                     | http://127.0.0.1:5500 |

Las cuatro carpetas están en proyectos-base. Para las versiones HTML ejecutar
`node scripts/iniciar-html.mjs` desde la raíz y abrir
http://127.0.0.1:5501/solicitudes/parte1-html/ o
http://127.0.0.1:5501/pura-vida-tours/parte1-html/.

Solicitudes React conserva la composición estática de su guía; registro y
consulta persistidos pertenecen a su versión HTML. JSONPlaceholder simula el
POST de Series JS; no guarda propuestas reales.

## Verificación y documentación

Desde la raíz: `npm ci`, `npm run check` y `npm test`.
Con Express y .NET encendidos: `node scripts/verificar-http.mjs`.
El programa tests/VerificacionSql comprueba consultas, restricciones y migraciones;
reconstruye una base desechable sin borrar la base del laboratorio.

- [Resultados de revisión y pruebas](docs/verificacion.md).
- [Laboratorios: recorridos, respuestas, capturas y experimentos](docs/laboratorios.md).
- [Capturas reales](docs/capturas/README.md).

No se versionan node_modules, bin, obj, dist, .env ni archivos de la base local.
El historial conserva commits descriptivos. La etiqueta de entrega es tarea-3.
Repositorio personal: https://github.com/JorgeGN1412/Tarea-3-Maraton-Series.

## Parte B y entrega

La Parte B se realiza en el repositorio grupal del Innovation Hub después de
revisar el Avance 2 y lo que ya hicieron los compañeros. Este repositorio
personal no sustituye esos documentos.

A Moodle se entrega un archivo .txt con los dos enlaces de GitHub. Ambos
repositorios deben tener la etiqueta tarea-3 en el commit entregado.
