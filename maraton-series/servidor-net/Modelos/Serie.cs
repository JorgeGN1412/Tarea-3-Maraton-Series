namespace MaratonApi.Modelos;
public class Serie
{
    public int Id { get; set; }
    public string Titulo { get; set; } = "";
    public int Temporadas { get; set; }
    public string Estado { get; set; } = "Por ver";
    public int GeneroId { get; set; } // Clave foránea al catálogo.
    public Genero? Genero { get; set; } // Navegación cargada por la consulta.
    public int MiembroId { get; set; } // Clave foránea al proponente.
    public Miembro? Miembro { get; set; }
}
