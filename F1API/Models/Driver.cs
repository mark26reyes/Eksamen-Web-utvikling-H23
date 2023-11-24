namespace F1API.Models;

using System.ComponentModel.DataAnnotations;
using F1API.Interfaces;

// Modell som representerer en fører i Formel 1.
public class Driver : IDriver
{
    [Key] // Angir at 'Id' er primærnøkkelen i databasen.
    public int Id { get; set; }

    public string? Name { get; set; } // Navnet på føreren.

    public int Age { get; set; } // Alderen til føreren.

    public string? Nationality { get; set; } // Nasjonaliteten til føreren.

    public string? Image { get; set; } // En URL eller sti til et bilde av føreren.
}
