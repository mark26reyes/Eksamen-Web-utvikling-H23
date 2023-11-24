using F1API.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Konfigurerer EF Core til å bruke SQLite med oppgitt tilkoblingsstreng.
builder.Services.AddDbContext<F1Context>(options => options.UseSqlite(connectionString));

// Setter opp CORS-policy for å tillate alle headere, metoder og opprinnelser.
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => 
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); 

app.UseStaticFiles(); // Aktiverer bruk av statiske filer.

app.UseCors("AllowAll"); // Bruker den definerte CORS-policyen.

app.UseAuthorization(); 

app.MapControllers(); 

app.Run(); 
