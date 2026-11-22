using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace MaratonApi.Datos;

// Permite crear migraciones sin arrancar Kestrel ni requerir credenciales en el código.
public class MaratonContextFactory : IDesignTimeDbContextFactory<MaratonContext>
{
    public MaratonContext CreateDbContext(string[] args)
    {
        var cadena = Environment.GetEnvironmentVariable("ConnectionStrings__Maraton")
            ?? "Server=localhost;Database=Maraton_Tarea3_Jorge;Trusted_Connection=True;TrustServerCertificate=True";
        var opciones = new DbContextOptionsBuilder<MaratonContext>().UseSqlServer(cadena).Options;
        return new MaratonContext(opciones);
    }
}
