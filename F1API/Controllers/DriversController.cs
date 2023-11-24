namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Context;
using F1API.Models;

// Kontrolleren håndterer HTTP-forespørsler for 'Drivers'.
[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly F1Context context;

    // Konstruktør setter opp databasetilkoblingen.
    public DriversController(F1Context _Context)
    {
        context = _Context;
    }

    // Hent alle førere.
    [HttpGet]
    public async Task<ActionResult<List<Driver>>> GetAsync()
    {
        try 
        {
            // Henter en liste med alle førere fra databasen.
            List<Driver> drivers = await context.Drivers.ToListAsync();
            if(drivers != null)
            {
                return Ok(drivers); // Returnerer listen dersom den ikke er tom.
            }
            else 
            {
                return NotFound(); // Returnerer ikke funnet dersom listen er tom.
            }
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // Hent en spesifikk fører basert på ID.
    [HttpGet("{id}")]
    public async Task<ActionResult<Driver>> GetByIdAsync(int id)
    {
        try 
        {
            // Søker etter fører med gitt ID.
            var driver = await context.Drivers.FindAsync(id);
            if (driver != null)
            {
                return Ok(driver); // Returnerer føreren dersom funnet.
            }
            else
            {
                return NotFound(); // Returnerer ikke funnet dersom føreren ikke finnes.
            }
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // Legg til en ny fører.
    [HttpPost]
    public IActionResult Post(Driver newDriver)
    {
        // Validerer input data.
        if (newDriver == null)
        {
            return BadRequest("Driver data is null.");
        }

        // Sjekker om førerens navn er oppgitt.
        if (string.IsNullOrWhiteSpace(newDriver.Name))
        {
            return BadRequest("Driver name is required.");
        }

        // Sjekker at førerens alder er over 18.
        if (newDriver.Age <= 18)
        {
            return BadRequest("Valid driver age is required.");
        }

        // Sjekker at førerens nasjonalitet er oppgitt.
        if (string.IsNullOrWhiteSpace(newDriver.Nationality))
        {
            return BadRequest("Driver nationality is required.");
        }

        try
        {
            // Legger til den nye føreren i databasen og lagrer.
            context.Drivers.Add(newDriver);
            context.SaveChanges();
            return Ok(newDriver); // Returnerer den nye føreren.
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // Slett en spesifikk fører basert på ID.
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
            // Fjerner føreren fra databasen og lagrer.
            context.Drivers.Remove(driver);
            await context.SaveChangesAsync();
            return Ok($"Driver with ID {id} has been deleted.");
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    // Oppdater en eksisterende fører basert på ID.
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Driver updatedDriver)
    {
        // Sjekker om ID stemmer overens.
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
            // Oppdaterer den eksisterende føreren med nye detaljer.
            context.Entry(driver).CurrentValues.SetValues(updatedDriver);
            await context.SaveChangesAsync();

            return NoContent(); // Returnerer ingen innhold etter vellykket oppdatering.
        }
        catch (Exception ex)
        {
            // Logger unntak og returnerer intern serverfeil.
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }
}
