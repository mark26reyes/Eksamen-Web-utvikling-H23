namespace F1API.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using F1API.Interfaces;
using System.Collections.Generic;

// Modell som representerer et team i Formel 1.
public class Team : ITeam
{
    [Key]
    public int Id { get; set; }

    public string? Manufacturer { get; set; } // Navnet på teamets produsent eller merke.

    public string? Image { get; set; }  // Filsti til bilde av bilen.

    // Lazy-loaded collection of drivers in the team
    public virtual ICollection<Driver>? Drivers { get; set; }
}
