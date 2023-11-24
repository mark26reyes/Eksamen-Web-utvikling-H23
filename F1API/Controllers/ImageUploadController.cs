using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using Microsoft.Extensions.Hosting; 

// Kontrolleren håndterer bildeopplastning.
[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    private readonly IHostEnvironment environment;

    // Konstruktør som setter opp miljøet for å håndtere filbaner.
    public ImageUploadController(IHostEnvironment environment)
    {
        this.environment = environment;
    }

    // POST-endepunkt for opplasting av bilder.
    [HttpPost]
    public IActionResult PostImage(IFormFile formFile)
    {
        // Sjekker om filen er gyldig.
        if (formFile == null || formFile.Length == 0)
        {
            return BadRequest("No file provided or the file is empty.");
        }

        // Sjekker filtypen (kun .png er tillatt).
        string fileExtension = Path.GetExtension(formFile.FileName).ToLower();
        if (fileExtension != ".png")
        {
            return BadRequest("Only .png files are allowed.");
        }

        try
        {
            // Bygger absolutt sti for å lagre bildet.
            string webRootPath = environment.ContentRootPath; // Henter roten av prosjektet.
            string absolutePath = Path.Combine(webRootPath, "wwwroot", "images", "drivers", formFile.FileName);

            // Oppretter en fil på serveren og kopierer innholdet fra opplastet fil.
            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                formFile.CopyTo(fileStream); // Lagrer filen på serveren.
            }

            return Ok($"File uploaded successfully: {formFile.FileName}");
        }
        catch (Exception ex)
        {
            // Logger feil og returnerer intern serverfeil.
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET-endepunkt, mest brukt for testing eller for å verifisere at kontrolleren fungerer.
    [HttpGet]
    public string Get()
    {
        return "Hello from Get() in ImageUploadController";
    }    
}
