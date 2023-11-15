namespace F1API.Models;

using System.ComponentModel.DataAnnotations;
using F1API.Interfaces;

public class Race : IRace
{
    [Key]
    public int Id { get; set; }
    public string? WinnerName { get; set; }  // Name of the race winner
    public string? WinnerTime { get; set; }  // Winning time
    public string? GrandPrix { get; set; }  // The country or location of the race
    public int NumberOfLaps { get; set; }
}
