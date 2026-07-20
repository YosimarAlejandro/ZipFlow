using backend.Services;
using backend.Services.Interfaces;
var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddScoped<IFileOptimizationService, FileOptimizationService>();

var app = builder.Build();

// OpenAPI solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Mapear controladores
app.MapControllers();

app.Run();