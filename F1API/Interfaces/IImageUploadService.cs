namespace F1API.Interfaces;

using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

public interface IImageUploadService
{
    Task<string> UploadImageAsync(IFormFile formFile);
}
