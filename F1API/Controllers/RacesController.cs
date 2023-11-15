using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Context;
using F1API.Models;

namespace F1API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RacesController : ControllerBase
{
    private readonly F1Context context;

    public RacesController(F1Context _Context)
    {
        context = _Context;
    }

    // GET: api/Races
    [HttpGet]
    public async Task<ActionResult<List<Race>>> GetAllRacesAsync()
    {
        try 
        {
            var races = await context.Races.ToListAsync();
            if (races.Any())
            { 
                return Ok(races);
            }
            else
            {
                return NotFound("No races found.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // GET: api/Races/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Race>> GetRaceByIdAsync(int id)
    {
        try 
        {
            var race = await context.Races.FindAsync(id);
            if (race != null)
            {
                return Ok(race);
            }
            else
            {
                return NotFound($"Race with ID {id} not found.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }
}
