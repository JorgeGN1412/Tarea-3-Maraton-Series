using MaratonApi.Modelos;
using Microsoft.EntityFrameworkCore;
namespace MaratonApi.Datos;
// El contexto describe tablas, restricciones, relaciones y datos iniciales.
public class MaratonContext(DbContextOptions<MaratonContext> opciones) : DbContext(opciones)
{
    public DbSet<Genero> Generos => Set<Genero>();
    public DbSet<Miembro> Miembros => Set<Miembro>();
    public DbSet<Serie> Series => Set<Serie>();
    protected override void OnModelCreating(ModelBuilder modelo)
    {
        modelo.Entity<Genero>(g => {
            g.Property(x => x.Nombre).HasMaxLength(30);
            g.HasIndex(x => x.Nombre).IsUnique();
            g.HasData(new Genero { Id=1, Nombre="Drama" }, new Genero { Id=2, Nombre="Comedia" },
                new Genero { Id=3, Nombre="Ciencia ficción" }, new Genero { Id=4, Nombre="Animación" },
                new Genero { Id=5, Nombre="Documental" });
        });
        modelo.Entity<Miembro>(m => {
            m.Property(x => x.Nombre).HasMaxLength(50);
            m.Property(x => x.Correo).HasMaxLength(100);
            m.HasIndex(x => x.Correo).IsUnique(); // No admite correos duplicados.
            m.HasData(
                new Miembro { Id=1, Nombre="Ana", Correo="ana@club.com", Registro=new DateOnly(2026,8,1) },
                new Miembro { Id=2, Nombre="Luis", Correo="luis@club.com", Registro=new DateOnly(2026,8,3) },
                new Miembro { Id=3, Nombre="Sofía", Correo="sofia@club.com", Registro=new DateOnly(2026,8,10) },
                new Miembro { Id=4, Nombre="Diego", Correo="diego@club.com", Registro=new DateOnly(2026,9,2) });
        });
        modelo.Entity<Serie>(s => {
            s.Property(x => x.Titulo).HasMaxLength(100);
            s.Property(x => x.Estado).HasMaxLength(10);
            s.ToTable(t => {
                t.HasCheckConstraint("CK_Series_Temporadas", "[Temporadas] BETWEEN 1 AND 30");
                t.HasCheckConstraint("CK_Series_Estado", "[Estado] IN (N'Por ver', N'Viendo', N'Vista')");
            });
            s.HasOne(x=>x.Miembro).WithMany(x=>x.Series).HasForeignKey(x=>x.MiembroId).OnDelete(DeleteBehavior.Restrict);
            s.HasOne(x=>x.Genero).WithMany(x=>x.Series).HasForeignKey(x=>x.GeneroId).OnDelete(DeleteBehavior.Restrict);
            s.HasData(
                new Serie { Id=1,Titulo="Dark",GeneroId=3,Temporadas=3,Estado="Vista",MiembroId=1 },
                new Serie { Id=2,Titulo="The Office",GeneroId=2,Temporadas=9,Estado="Viendo",MiembroId=2 },
                new Serie { Id=3,Titulo="Arcane",GeneroId=4,Temporadas=2,Estado="Por ver",MiembroId=3 },
                new Serie { Id=4,Titulo="Chernobyl",GeneroId=1,Temporadas=1,Estado="Vista",MiembroId=4 },
                new Serie { Id=5,Titulo="Planeta Tierra",GeneroId=5,Temporadas=3,Estado="Por ver",MiembroId=1 });
        });
        // Una pareja miembro-género aparece una sola vez gracias a la PK compuesta.
        modelo.Entity<Miembro>().HasMany(x=>x.GenerosFavoritos).WithMany(x=>x.Miembros).UsingEntity(
            "MiembroGeneros",
            r=>r.HasOne(typeof(Genero)).WithMany().HasForeignKey("GeneroId"),
            l=>l.HasOne(typeof(Miembro)).WithMany().HasForeignKey("MiembroId"),
            j=> { j.HasKey("MiembroId","GeneroId"); j.HasData(
                new {MiembroId=1,GeneroId=3}, new {MiembroId=1,GeneroId=5},
                new {MiembroId=2,GeneroId=2}, new {MiembroId=3,GeneroId=4},
                new {MiembroId=3,GeneroId=1}, new {MiembroId=4,GeneroId=1}); });
    }
}
