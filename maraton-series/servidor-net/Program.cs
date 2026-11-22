using MaratonApi.Datos;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
// La configuración privada se obtiene de user-secrets o variables de entorno.
var cadena = builder.Configuration.GetConnectionString("Maraton")
    ?? throw new InvalidOperationException("Configure ConnectionStrings:Maraton antes de arrancar.");
builder.Services.AddDbContext<MaratonContext>(opciones => opciones.UseSqlServer(cadena));
var app = builder.Build();
app.MapGet("/", () => "API del Maratón en .NET");
// Select proyecta únicamente las columnas del contrato; no serializa navegaciones completas.
app.MapGet("/api/miembros", async (MaratonContext db) => await db.Miembros
    .OrderBy(m=>m.Nombre).Select(m=>new { _id=m.Id.ToString(), nombre=m.Nombre }).ToListAsync());
app.MapGet("/api/series", async (MaratonContext db) => await db.Series
    .OrderBy(s=>s.Id).Select(s=>new {
        _id=s.Id.ToString(), titulo=s.Titulo, genero=s.Genero!.Nombre,
        temporadas=s.Temporadas, estado=s.Estado,
        miembroId=s.MiembroId.ToString(), miembro=s.Miembro!.Nombre
    }).ToListAsync()); // Aquí se traduce y ejecuta el SELECT con JOIN.
app.Run();
