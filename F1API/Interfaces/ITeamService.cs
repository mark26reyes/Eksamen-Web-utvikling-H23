namespace F1API.Interfaces;  // ✅ Correct namespace

using F1API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ITeamService
{
    Task<List<Team>> GetAllTeamsAsync();
    Task<Team?> GetTeamByIdAsync(int id);
}