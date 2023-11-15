using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Context;
using F1API.Models;

namespace F1API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly F1Context context;

    public TeamsController(F1Context _Context)
    {
        context = _Context;
    }

    // GET: api/Teams
    [HttpGet]
    public async Task<ActionResult<List<Team>>> GetAllTeamsAsync()
    {
        try 
        {
            var teams = await context.Teams.ToListAsync();
            if (teams.Any())
            { 
                return Ok(teams);
            }
            else
            {
                return NotFound("No teams found.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // GET: api/Teams/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetTeamByIdAsync(int id)
    {
        try 
        {
            var team = await context.Teams.FindAsync(id);
            if (team != null)
            {
                return Ok(team);
            }
            else
            {
                return NotFound($"Team with ID {id} not found.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }
}
