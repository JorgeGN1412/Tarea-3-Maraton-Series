namespace MaratonApi.Modelos;
// Una fila del catálogo; las listas son navegaciones, no columnas.
public class Genero
{
    public int Id { get; set; } // Clave primaria por convención.
    public string Nombre { get; set; } = ""; // Texto obligatorio.
    public List<Serie> Series { get; set; } = []; // Relación 1 a muchos.
    public List<Miembro> Miembros { get; set; } = []; // Favoritos: muchos a muchos.
}
