using F1API.Context;
using F1API.Interfaces;  // Ensure correct namespaces
using F1API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var config = builder.Configuration;

// Configure Entity Framework Core with SQLite and enable lazy loading proxies
services.AddDbContext<F1Context>(options =>
    options.UseLazyLoadingProxies()
           .UseSqlite(config.GetConnectionString("DefaultConnection")));

// Configure CORS policy
const string CorsPolicy = "AllowAll";
services.AddCors(options =>
    options.AddPolicy(CorsPolicy, policy =>
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

// Add essential services
services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

// Register services (Make sure interfaces are in the correct namespace)
services.AddScoped<IDriverService, DriverService>();
services.AddScoped<IImageUploadService, ImageUploadService>();
services.AddScoped<IRaceService, RaceService>();
services.AddScoped<ITeamService, TeamService>();

var app = builder.Build();

// Enable Swagger (uncomment if you want it in production)
app.UseSwagger();
app.UseSwaggerUI();

// Ensure static files are accessible (for images)
app.UseHttpsRedirection();
app.UseStaticFiles(); // This serves files from wwwroot
app.UseCors(CorsPolicy);
app.UseAuthorization();
app.MapControllers();

app.Run();
