namespace MaratonApi.Modelos;
public class Miembro
{
    public int Id { get; set; } // Identificador autogenerado por SQL Server.
    public string Nombre { get; set; } = "";
    public string Correo { get; set; } = ""; // El contexto define el índice único.
    public DateOnly Registro { get; set; } // Columna date sin hora.
    public List<Serie> Series { get; set; } = []; // Series propuestas.
    public List<Genero> GenerosFavoritos { get; set; } = []; // Tabla intermedia.
}
