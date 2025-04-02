namespace F1API.Interfaces; 

using F1API.Models;

public interface IDriverService
{
    Task<IEnumerable<Driver>> GetAllDriversAsync();
    Task<Driver?> GetDriverByIdAsync(int id);
    Task<Driver> AddDriverAsync(Driver driver);
    Task<Driver?> UpdateDriverAsync(int id, Driver driver);
    Task<bool> DeleteDriverAsync(int id);
}