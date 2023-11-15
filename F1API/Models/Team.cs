namespace F1API.Models;

using System.ComponentModel.DataAnnotations;
using F1API.Interfaces;



public class Team : ITeam
{
    [Key]
    public int Id { get; set; }
    public string? Manufacturer { get; set; } 
    public string? Image { get; set; }  
    public string? DriverName { get; set; }  
    public string? DriverName2 { get; set; }  
}
