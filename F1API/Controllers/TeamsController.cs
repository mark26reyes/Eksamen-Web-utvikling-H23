using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Context;
using F1API.Models;

namespace F1API.Controllers;

// Kontrolleren håndterer HTTP-forespørsler for 'Teams'.
[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly F1Context context;

    // Konstruktør setter opp databasetilkoblingen.
    public TeamsController(F1Context _Context)
    {
        context = _Context;
    }

    // Hent alle team (GET: api/Teams).
    [HttpGet]
    public async Task<ActionResult<List<Team>>> GetAllTeamsAsync()
    {
        try 
        {
            // Henter en liste med alle team fra databasen.
            var teams = await context.Teams.ToListAsync();
            if (teams.Any())
            { 
                return Ok(teams); // Returnerer listen dersom den inneholder team.
            }
            else
            {
                return NotFound("No teams found."); // Returnerer ikke funnet dersom listen er tom.
            }
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // Hent et spesifikt team basert på ID (GET: api/Teams/{id}).
    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetTeamByIdAsync(int id)
    {
        try 
        {
            // Søker etter team med gitt ID.
            var team = await context.Teams.FindAsync(id);
            if (team != null)
            {
                return Ok(team); // Returnerer teamet dersom funnet.
            }
            else
            {
                return NotFound($"Team with ID {id} not found."); // Returnerer ikke funnet dersom teamet ikke finnes.
            }
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }
}
