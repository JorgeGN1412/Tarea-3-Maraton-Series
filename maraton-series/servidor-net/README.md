# Servidor .NET del Maratón

La guía requiere .NET 10 y EF Core 10.0.14. Se preparó el SDK oficial 10.0.404 de Microsoft en una carpeta paralela de trabajo y se verificó su SHA512.
El proyecto compiló con cero errores y cero advertencias.
Se generaron y aplicaron Inicial y GenerosFavoritos a una base separada Maraton_Tarea3_Jorge.

## Requisitos para otra computadora
- SDK .NET 10 instalado y accesible como dotnet.
- SQL Server y acceso con autenticación integrada o una cadena configurada fuera del repositorio.
- dotnet-ef 10.0.14.

## Preparación
Desde esta carpeta:
```powershell
dotnet restore
dotnet tool install --global dotnet-ef --version 10.0.14
dotnet user-secrets set "ConnectionStrings:Maraton" "Server=localhost;Database=Maraton_Tarea3_Jorge;Trusted_Connection=True;TrustServerCertificate=True"
dotnet ef database update
dotnet run --launch-profile http
```

También puede suministrarse ConnectionStrings__Maraton como variable de entorno.
La fábrica de diseño permite generar migraciones sin arrancar el servidor. No contiene contraseñas.

## Datos y rutas
GET /api/miembros y GET /api/series proyectan el contrato del API Express.
Los identificadores numéricos se convierten a texto.
La respuesta HTTP del proceso aún debe verificarse: las solicitudes realizadas al puerto 5080 agotaron el tiempo de prueba.
Consultar docs/verificacion.md para el estado completo.

## Dependencia transitiva
Pkcs 9.0.21 corrige las advertencias de seguridad de 9.0.11 detectadas al compilar.
Fuente: https://github.com/advisories/GHSA-846f-f764-76mx
