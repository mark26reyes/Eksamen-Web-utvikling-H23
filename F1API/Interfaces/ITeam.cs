using System.Collections.Generic;
using F1API.Models; // ✅ Add this to reference Driver

public interface ITeam
{
    int Id { get; set; }
    string? Manufacturer { get; set; }
    string? Image { get; set; }

    ICollection<Driver>? Drivers { get; set; } 
}
