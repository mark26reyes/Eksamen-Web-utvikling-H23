namespace F1API.Services; 

using F1API.Interfaces;  // Ensure the correct interface reference
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading.Tasks;

public class ImageUploadService : IImageUploadService
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<ImageUploadService> _logger;
    private const string ImageFolder = "images/drivers"; // No need for wwwroot prefix
    private static readonly string[] AllowedExtensions = { ".png", ".jpg", ".jpeg" };

    public ImageUploadService(IWebHostEnvironment environment, ILogger<ImageUploadService> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    public async Task<string> UploadImageAsync(IFormFile formFile)
    {
        if (formFile == null || formFile.Length == 0)
            throw new ArgumentException("No file provided or the file is empty.");

        string fileExtension = Path.GetExtension(formFile.FileName).ToLower();
        if (Array.IndexOf(AllowedExtensions, fileExtension) < 0)
            throw new ArgumentException($"Only {string.Join(", ", AllowedExtensions)} files are allowed.");

        try
        {
            string savePath = Path.Combine(_environment.WebRootPath, ImageFolder);
            Directory.CreateDirectory(savePath); // Ensure directory exists

            string uniqueFileName = $"{Guid.NewGuid()}{fileExtension}"; // Prevent file overwrites
            string filePath = Path.Combine(savePath, uniqueFileName);

            using var fileStream = new FileStream(filePath, FileMode.Create);
            await formFile.CopyToAsync(fileStream);

            string fileUrl = $"/{ImageFolder}/{uniqueFileName}"; // Relative URL for API response
            _logger.LogInformation($"Image uploaded successfully: {fileUrl}");

            return fileUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving the file.");
            throw new IOException("Error saving the file.", ex);
        }
    }
}
