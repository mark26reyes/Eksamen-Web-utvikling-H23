namespace F1API.Models;

using System.ComponentModel.DataAnnotations;
using F1API.Interfaces;

// Modell som representerer et løp i Formel 1.
public class Race : IRace
{
    [Key]
    public int Id { get; set; }

    public string? WinnerName { get; set; }  // Navnet på vinneren av løpet.

    public string? WinnerTime { get; set; }  // Vinnertiden for løpet.

    public string? GrandPrix { get; set; }  // Landet eller stedet hvor løpet finner sted.

    public int NumberOfLaps { get; set; } // Antall runder i løpet.
}
