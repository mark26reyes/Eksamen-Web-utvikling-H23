namespace F1API.Models;

using System.ComponentModel.DataAnnotations;
using F1API.Interfaces;

// Modell som representerer et team i Formel 1.
public class Team : ITeam
{
    [Key]
    public int Id { get; set; }

    public string? Manufacturer { get; set; } // Navnet på teamets produsent eller merke.

    public string? Image { get; set; }  // Filsti til bilde av bilen.

    public string? DriverName { get; set; }  // Navnet på den første føreren i teamet.

    public string? DriverName2 { get; set; }  // Navnet på den andre føreren i teamet.
}
