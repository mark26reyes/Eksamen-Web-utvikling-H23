namespace F1API.Interfaces;  // ✅ Correct namespace

using F1API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IRaceService
{
    Task<List<Race>> GetAllRacesAsync();
    Task<Race?> GetRaceByIdAsync(int id);
}
