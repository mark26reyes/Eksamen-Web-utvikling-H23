namespace F1API.Controllers; // ✅ Ensure correct namespace

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using F1API.Models;
using F1API.Interfaces; // ✅ Reference the Interfaces folder

[ApiController]
[Route("api/[controller]")]
public class RacesController : ControllerBase
{
    private readonly IRaceService _raceService;

    public RacesController(IRaceService raceService)
    {
        _raceService = raceService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Race>>> GetAllRacesAsync()
    {
        try
        {
            var races = await _raceService.GetAllRacesAsync();
            if (races.Count == 0)
                return NotFound("No races found.");

            return Ok(races);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Race>> GetRaceByIdAsync(int id)
    {
        try
        {
            var race = await _raceService.GetRaceByIdAsync(id);
            if (race == null)
                return NotFound($"Race with ID {id} not found.");

            return Ok(race);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}
