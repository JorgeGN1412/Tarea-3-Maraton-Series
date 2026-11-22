# Servidor .NET del Maratón



La guía del profesor especifica SDK .NET 10 y EF Core 10.0.14; se conservan esas versiones.

El entorno de creación solo tiene SDK 8.0.201: este proyecto todavía NO fue compilado ni ejecutado.



## Preparación

Instalar .NET 10 y SQL Server Express. Desde esta carpeta:

```powershell

dotnet restore

dotnet tool install --global dotnet-ef --version 10.0.14

dotnet user-secrets set "ConnectionStrings:Maraton" "Server=localhost\SQLEXPRESS;Database=Maraton;Trusted_Connection=True;TrustServerCertificate=True"

```

La cadena usa autenticación integrada y queda fuera del repositorio.



## Migraciones pendientes

No se inventaron archivos generados ni resultados de SQL.

Para reproducir las dos etapas del laboratorio se debe generar Inicial con el modelo sin favoritos y luego GenerosFavoritos al añadir la relación. El código actual contiene el modelo final. Antes de entregar se necesitan ambas migraciones, su snapshot, aplicarlas y ejecutar las consultas y experimentos de la guía.



## Ejecución

`dotnet run --launch-profile http` escucha en http://localhost:5080.

GET /api/miembros y GET /api/series usan el contrato de Express, con identificadores numéricos convertidos a texto.
