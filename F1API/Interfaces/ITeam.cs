namespace F1API.Interfaces;

public interface ITeam
{
    int Id { get; set; }
    string? Manufacturer { get; set; }
    string? Image { get; set; }
    string? DriverName { get; set; }
    string? DriverName2 { get; set; }
}