namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Context;
using F1API.Models;

[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly F1Context context;

    public DriversController(F1Context _Context)
    {
        context = _Context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Driver>>> GetAsync()
    {
        try 
        {
            List<Driver> drivers = await context.Drivers.ToListAsync();
            if(drivers != null)
            {
            return Ok(drivers);
            }
             else 
            {
                return NotFound();
            }
        }
        catch (Exception ex)
        {
            // logger exeption
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Driver>> GetByIdAsync(int id)
    {
        try 
        {
            var driver = await context.Drivers.FindAsync(id);
            if (driver != null)
            {
                return Ok(driver);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception ex)
        {
            // Consider logging the exception
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }


 [HttpPost]
    public IActionResult Post(Driver newDriver)
    {
        if (newDriver == null)
        {
            return BadRequest("Driver data is null.");
        }

        if (newDriver == null)
    {
        return BadRequest("Driver data is null.");
    }

         // sjekker om data er tom
          if (string.IsNullOrWhiteSpace(newDriver.Name))
    {
           return BadRequest("Driver name is required.");
    }

           if (newDriver.Age <= 18) // Sjekker om fører er gammel nok
    {
        return BadRequest("Valid driver age is required.");
    }

        if (string.IsNullOrWhiteSpace(newDriver.Nationality))
    {
        return BadRequest("Driver nationality is required.");
    }

        try
        {
            context.Drivers.Add(newDriver);
            context.SaveChanges();
            return Ok(newDriver); 
        }
        catch (Exception ex)
        {
            // Logger exeption
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var driver = await context.Drivers.FindAsync(id);
        if (driver == null)
        {
            return NotFound($"Driver with ID {id} not found.");
        }

        try
        {
            context.Drivers.Remove(driver);
            await context.SaveChangesAsync();
            return Ok($"Driver with ID {id} has been deleted.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }
        

   [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Driver updatedDriver)
{
    if (id != updatedDriver.Id)
    {
        return BadRequest("Driver ID mismatch");
    }

    var driver = await context.Drivers.FindAsync(id);
    if (driver == null)
    {
        return NotFound($"Driver with ID {id} not found.");
    }

    try
    {
        // Update the existing driver with the new details
        context.Entry(driver).CurrentValues.SetValues(updatedDriver);
        await context.SaveChangesAsync();

        return NoContent();
    }
    catch (Exception ex)
    {
        // Consider logging the exception
        return StatusCode(500, "Internal Server Error: " + ex.Message);
    }
}
}