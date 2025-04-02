namespace F1API.Controllers; // ✅ Ensure the correct namespace

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;
using F1API.Interfaces; // ✅ Reference the Interfaces folder

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    private readonly IImageUploadService _imageUploadService;

    public ImageUploadController(IImageUploadService imageUploadService)
    {
        _imageUploadService = imageUploadService;
    }

    [HttpPost]
    public async Task<IActionResult> UploadImage(IFormFile formFile)
    {
        try
        {
            string fileName = await _imageUploadService.UploadImageAsync(formFile);
            return Ok(new { message = "File uploaded successfully", fileName });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (IOException ex)
        {
            return StatusCode(500, new { error = "Internal server error", details = ex.Message });
        }
    }

    [HttpGet]
    public IActionResult GetStatus()
    {
        return Ok("ImageUploadController is up and running.");
    }
}
