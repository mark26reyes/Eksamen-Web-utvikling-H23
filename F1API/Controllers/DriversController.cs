namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using F1API.Models;
using F1API.Interfaces; 


[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly IDriverService _driverService;

    public DriversController(IDriverService driverService)
    {
        _driverService = driverService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Driver>>> GetAsync()
    {
        var drivers = await _driverService.GetAllDriversAsync();
        return Ok(drivers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Driver>> GetByIdAsync(int id)
    {
        var driver = await _driverService.GetDriverByIdAsync(id);
        return driver != null ? Ok(driver) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Driver newDriver)
    {
        var createdDriver = await _driverService.AddDriverAsync(newDriver);
        return CreatedAtAction(nameof(GetByIdAsync), new { id = createdDriver.Id }, createdDriver);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _driverService.DeleteDriverAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Driver updatedDriver)
    {
        if (id != updatedDriver.Id)
            return BadRequest("Driver ID mismatch");

        var updated = await _driverService.UpdateDriverAsync(id, updatedDriver);
        return updated != null ? Ok(updated) : NotFound();
    }
}
