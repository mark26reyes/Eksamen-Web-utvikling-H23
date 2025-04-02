namespace F1API.Services;  // ✅ Ensure it belongs to the correct namespace

using F1API.Context;
using F1API.Interfaces;  // ✅ Ensure this is included
using F1API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class RaceService : IRaceService
{
    private readonly F1Context _context;

    public RaceService(F1Context context)
    {
        _context = context;
    }

    public async Task<List<Race>> GetAllRacesAsync()
    {
        return await _context.Races.ToListAsync();
    }

    public async Task<Race?> GetRaceByIdAsync(int id)
    {
        return await _context.Races.FindAsync(id);
    }

    // ✅ Optional: Add method to create a new race
    public async Task<Race> AddRaceAsync(Race newRace)
    {
        _context.Races.Add(newRace);
        await _context.SaveChangesAsync();
        return newRace;
    }
}
