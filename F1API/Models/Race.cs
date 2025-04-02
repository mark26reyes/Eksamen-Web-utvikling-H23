namespace F1API.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using F1API.Interfaces;
using System.Collections.Generic;

// Modell som representerer et løp i Formel 1.
public class Race : IRace
{
    [Key]
    public int Id { get; set; }

    public string? WinnerName { get; set; }  // Navnet på vinneren av løpet.

    public string? WinnerTime { get; set; }  // Vinnertiden for løpet.
    public int? WinnerId { get; set; }


    public string? GrandPrix { get; set; }  // Landet eller stedet hvor løpet finner sted.

    public int NumberOfLaps { get; set; } // Antall runder i løpet.

    // Lazy-loaded collection of drivers who participated in the race
    public virtual ICollection<Driver>? Drivers { get; set; }

    // Lazy-loaded reference to the winning driver
    public virtual Driver? Winner { get; set; }
}
