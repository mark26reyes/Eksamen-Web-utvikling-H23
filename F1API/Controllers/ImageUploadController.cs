using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using Microsoft.Extensions.Hosting; 

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    private readonly IHostEnvironment environment;

    public ImageUploadController(IHostEnvironment environment)
    {
        this.environment = environment;
    }

    
   [HttpPost]
public IActionResult PostImage(IFormFile formFile)
{
    if (formFile == null || formFile.Length == 0)
    {
        return BadRequest("No file provided or the file is empty.");
    }

    string fileExtension = Path.GetExtension(formFile.FileName).ToLower();
    if (fileExtension != ".png")
    {
        return BadRequest("Only .png files are allowed.");
    }

    try
    {
        string webRootPath = environment.ContentRootPath; // Henter filsti
        string absolutePath = Path.Combine(webRootPath, "wwwroot", "images", formFile.FileName);

        using (var fileStream = new FileStream(absolutePath, FileMode.Create))
        {
            formFile.CopyTo(fileStream); // Lagrer filen på serveren.
        }

        return Ok($"File uploaded successfully: {formFile.FileName}");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

    [HttpGet]
    public string Get()
    {
        return "Hello from Get() in ImageUploadController";
    }    
}
