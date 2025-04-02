namespace F1API.Controllers; // ✅ Ensure correct namespace

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using F1API.Models;
using F1API.Interfaces; // ✅ Reference the Interfaces folder

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly ITeamService _teamService;

    public TeamsController(ITeamService teamService)
    {
        _teamService = teamService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Team>>> GetAllTeamsAsync()
    {
        try
        {
            var teams = await _teamService.GetAllTeamsAsync();
            if (teams.Count == 0)
                return NotFound("No teams found.");

            return Ok(teams);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetTeamByIdAsync(int id)
    {
        try
        {
            var team = await _teamService.GetTeamByIdAsync(id);
            if (team == null)
                return NotFound($"Team with ID {id} not found.");

            return Ok(team);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}
