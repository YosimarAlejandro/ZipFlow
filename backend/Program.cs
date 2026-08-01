using backend.Services;
using backend.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddOpenApi();
builder.Services.AddControllers();


// CORS para permitir React (Vite)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


builder.Services.AddScoped<IFileOptimizationService, FileOptimizationService>();


var app = builder.Build();


// OpenAPI solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


// CORS debe ir antes de los controllers
app.UseCors("AllowFrontend");


app.UseHttpsRedirection();


app.MapControllers();


app.Run();