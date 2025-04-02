namespace F1API.Services;  // ✅ Ensure it's in the right namespace

using F1API.Context;
using F1API.Interfaces;  // ✅ Ensure this is included
using F1API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class TeamService : ITeamService
{
    private readonly F1Context _context;

    public TeamService(F1Context context)
    {
        _context = context;
    }

public async Task<List<Team>> GetAllTeamsAsync()
{
    return await _context.Teams
        .Include(t => t.Drivers) 
        .ToListAsync();
}

public async Task<Team?> GetTeamByIdAsync(int id)
{
    return await _context.Teams
        .Include(t => t.Drivers)
        .FirstOrDefaultAsync(t => t.Id == id);
}


    public async Task<Team> AddTeamAsync(Team newTeam)
    {
        _context.Teams.Add(newTeam);
        await _context.SaveChangesAsync();
        return newTeam;
    }
}
