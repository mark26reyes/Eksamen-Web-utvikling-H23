namespace F1API.Services; // ✅ Ensure correct namespace

using F1API.Context;
using F1API.Interfaces;  // ✅ Add reference to the Interfaces folder
using F1API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class DriverService : IDriverService // ✅ Ensure interface is implemented correctly
{
    private readonly F1Context _context;

    public DriverService(F1Context context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Driver>> GetAllDriversAsync()
    {
        return await _context.Drivers.ToListAsync();
    }

    public async Task<Driver?> GetDriverByIdAsync(int id)
    {
        return await _context.Drivers.FindAsync(id);
    }

    public async Task<Driver> AddDriverAsync(Driver newDriver)
    {
        _context.Drivers.Add(newDriver);
        await _context.SaveChangesAsync();
        return newDriver;
    }

    public async Task<bool> DeleteDriverAsync(int id)
    {
        var driver = await _context.Drivers.FindAsync(id);
        if (driver == null) return false;

        _context.Drivers.Remove(driver);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Driver?> UpdateDriverAsync(int id, Driver updatedDriver)
    {
        var driver = await _context.Drivers.FindAsync(id);
        if (driver == null) return null;

        _context.Entry(driver).CurrentValues.SetValues(updatedDriver);
        await _context.SaveChangesAsync();
        return driver;
    }
}
