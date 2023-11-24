using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Context;
using F1API.Models;

namespace F1API.Controllers;

// Kontrolleren håndterer HTTP-forespørsler for 'Races'.
[ApiController]
[Route("api/[controller]")]
public class RacesController : ControllerBase
{
    private readonly F1Context context;

    // Konstruktør setter opp databasetilkoblingen.
    public RacesController(F1Context _Context)
    {
        context = _Context;
    }

    // Hent alle løp (GET: api/Races).
    [HttpGet]
    public async Task<ActionResult<List<Race>>> GetAllRacesAsync()
    {
        try 
        {
            // Henter en liste med alle løp fra databasen.
            var races = await context.Races.ToListAsync();
            if (races.Any())
            { 
                return Ok(races); // Returnerer listen dersom den inneholder løp.
            }
            else
            {
                return NotFound("No races found."); // Returnerer ikke funnet dersom listen er tom.
            }
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // Hent et spesifikt løp basert på ID (GET: api/Races/{id}).
    [HttpGet("{id}")]
    public async Task<ActionResult<Race>> GetRaceByIdAsync(int id)
    {
        try 
        {
            // Søker etter løp med gitt ID.
            var race = await context.Races.FindAsync(id);
            if (race != null)
            {
                return Ok(race); // Returnerer løpet dersom funnet.
            }
            else
            {
                return NotFound($"Race with ID {id} not found."); // Returnerer ikke funnet dersom løpet ikke finnes.
            }
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }
}

