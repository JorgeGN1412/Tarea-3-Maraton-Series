using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MaratonApi.Datos;
using MaratonApi.Modelos;
using System.Text.Json;
// Verifica únicamente la base del laboratorio y una base desechable creada aquí.
var cadena = "Server=localhost;Database=Maraton_Tarea3_Jorge;Trusted_Connection=True;TrustServerCertificate=True;Connect Timeout=5";
var resultados = new List<object>();
using var conexion = new SqlConnection(cadena);
conexion.Open();
object? Escalar(string sql) { using var cmd = new SqlCommand(sql, conexion); return cmd.ExecuteScalar(); }
var series = Convert.ToInt32(Escalar("SELECT COUNT(*) FROM Series"));
var miembros = Convert.ToInt32(Escalar("SELECT COUNT(*) FROM Miembros"));
var favoritos = Convert.ToInt32(Escalar("SELECT COUNT(*) FROM MiembroGeneros"));
var migraciones = Convert.ToInt32(Escalar("SELECT COUNT(*) FROM __EFMigrationsHistory"));
if (series != 5 || miembros != 4 || favoritos != 6 || migraciones != 2) throw new Exception("Conteos iniciales inesperados.");
resultados.Add(new { prueba="Conteos", aprobada=true, series, miembros, favoritos, migraciones });
foreach (var consulta in new[] {
    "SELECT s.Titulo,g.Nombre AS Genero,m.Nombre AS Miembro FROM Series s JOIN Generos g ON g.Id=s.GeneroId JOIN Miembros m ON m.Id=s.MiembroId ORDER BY s.Id",
    "SELECT Estado,COUNT(*) AS Cantidad FROM Series GROUP BY Estado",
    "SELECT m.Nombre,g.Nombre AS Genero FROM MiembroGeneros mg JOIN Miembros m ON m.Id=mg.MiembroId JOIN Generos g ON g.Id=mg.GeneroId ORDER BY m.Nombre,g.Nombre",
}) {
    using var cmd = new SqlCommand(consulta, conexion);
    using var lector = cmd.ExecuteReader();
    var filas = new List<Dictionary<string,object?>>();
    while (lector.Read()) {
        var fila = new Dictionary<string,object?>();
        for (var i=0;i<lector.FieldCount;i++) fila[lector.GetName(i)] = lector.IsDBNull(i)?null:lector.GetValue(i);
        filas.Add(fila);
    }
    resultados.Add(new { prueba="Consulta SQL", aprobada=true, consulta, filas });
}
foreach (var experimento in new[] {
    ("E1_FK", "INSERT INTO Series(Titulo,Temporadas,Estado,GeneroId,MiembroId) VALUES(N'Fantasma',1,N'Por ver',1,99)", new[]{547}),
    ("E2_UNIQUE", "INSERT INTO Miembros(Nombre,Correo,Registro) VALUES(N'Otra Ana',N'ana@club.com','2026-11-12')",new[]{2601,2627}),
    ("E3_CHECK", "INSERT INTO Series(Titulo,Temporadas,Estado,GeneroId,MiembroId) VALUES(N'Prueba',1,N'Terminada',1,1)",new[]{547}),
    ("E4_RESTRICT", "DELETE FROM Miembros WHERE Id=4",new[]{547}),
}) {
    using var transaccion=conexion.BeginTransaction();
    var rechazada=false;
    try { using var cmd=new SqlCommand(experimento.Item2,conexion,transaccion); cmd.ExecuteNonQuery(); }
    catch(SqlException error) {
        if(!experimento.Item3.Contains(error.Number)) throw;
        rechazada=true;
        resultados.Add(new { prueba=experimento.Item1, aprobada=true, codigoSql=error.Number, observacion=error.Message });
    }
    finally { transaccion.Rollback(); } // Incluso un éxito inesperado no cambia los datos.
    if(!rechazada) throw new Exception("La base no rechazó "+experimento.Item1);
}
// Comprueba que las migraciones reconstruyen el modelo en una base nueva e independiente.
var nombreTemporal="Maraton_Tarea3_Verificacion_"+Guid.NewGuid().ToString("N");
var temporal=new SqlConnectionStringBuilder(cadena){InitialCatalog=nombreTemporal}.ConnectionString;
using(var db = new MaratonContext(new DbContextOptionsBuilder<MaratonContext>().UseSqlServer(temporal).Options)) {
    try {
        db.Database.Migrate();
        var nuevasSeries=db.Series.Count();
        var nuevosMiembros=db.Miembros.Count();
        if(nuevasSeries!=5 || nuevosMiembros!=4) throw new Exception("Falló reconstrucción.");
        resultados.Add(new { prueba="Reconstruccion_aislada", aprobada=true, series=nuevasSeries, miembros=nuevosMiembros });
        // Variante aislada del experimento 12.5: 120 en el modelo y 100 en snapshot.
        var opcionesCambio = new DbContextOptionsBuilder<MaratonContext>()
            .UseSqlServer(temporal).ReplaceService<IModelCustomizer, TituloAmpliado>().Options;
        using var cambiado = new MaratonContext(opcionesCambio);
        if (!cambiado.Database.HasPendingModelChanges()) throw new Exception("No detectó el cambio de longitud.");
        var rechazo=false;
        try { cambiado.Database.Migrate(); }
        catch (InvalidOperationException error) when (error.Message.Contains("PendingModelChangesWarning")) {
            rechazo=true;
            resultados.Add(new { prueba="Cambio_sin_migracion", aprobada=true, observacion=error.Message });
        }
        if (!rechazo) throw new Exception("No rechazó la actualización sin migración.");
    } finally {
        // Solo elimina la base con GUID que esta ejecución acaba de crear.
        if(!nombreTemporal.StartsWith("Maraton_Tarea3_Verificacion_")) throw new Exception("Nombre no autorizado.");
        db.Database.EnsureDeleted();
    }
}
var archivo=Path.GetFullPath("docs/pruebas-sql.json");
Directory.CreateDirectory(Path.GetDirectoryName(archivo)!);
File.WriteAllText(archivo,JsonSerializer.Serialize(new {fecha=DateTimeOffset.Now,resultados},new JsonSerializerOptions{WriteIndented=true}));
Console.WriteLine("SQL VERIFICADO: conteos, consultas, cuatro restricciones y reconstrucción.");
Console.WriteLine(archivo);

// Solo se registra en las opciones del experimento; el proyecto conserva max 100.
public sealed class TituloAmpliado(ModelCustomizerDependencies dependencias) : ModelCustomizer(dependencias) {
    public override void Customize(ModelBuilder modelo, DbContext contexto) {
        base.Customize(modelo, contexto);
        modelo.Entity<Serie>().Property(s => s.Titulo).HasMaxLength(120);
    }
}
