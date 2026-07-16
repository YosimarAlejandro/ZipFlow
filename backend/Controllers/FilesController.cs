using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {

        private readonly IFileOptimizationService _optimizationService;

        public FilesController(IFileOptimizationService optimizationService)
        {
            _optimizationService = optimizationService;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new
                {
                    message = "No se recibió ningún archivo."
                });
            }

            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "TempUploads");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var filePath = Path.Combine(uploadPath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var optimizedFile = await _optimizationService.OptimizeAsync(filePath);

            // Información del archivo original
            var originalInfo = new FileInfo(filePath);

            // Información del archivo optimizado
            var optimizedInfo = new FileInfo(optimizedFile);

            double originalSizeMB = originalInfo.Length / 1024.0 / 1024.0;
            double optimizedSizeMB = optimizedInfo.Length / 1024.0 / 1024.0;

            double reduction = 100 - ((optimizedSizeMB / originalSizeMB) * 100);
            Console.WriteLine();
            Console.WriteLine("========================================");
            Console.WriteLine("         ZIPFLOW BENCHMARK");
            Console.WriteLine("========================================");
            Console.WriteLine($"Archivo               : {file.FileName}");
            Console.WriteLine($"Peso original         : {originalSizeMB:F2} MB");
            Console.WriteLine($"Peso optimizado       : {optimizedSizeMB:F2} MB");
            Console.WriteLine($"Reducción conseguida  : {reduction:F2}%");
            Console.WriteLine($"Espacio ahorrado      : {(originalSizeMB - optimizedSizeMB):F2} MB");
            Console.WriteLine($"Fecha                 : {DateTime.Now}");
            Console.WriteLine("========================================");
            Console.WriteLine();

            return Ok(new
            {
                message = "Archivo procesado correctamente.",

                originalFile = file.FileName,
                originalSizeMB = Math.Round(originalSizeMB, 2),

                optimizedFile = Path.GetFileName(optimizedFile),
                optimizedSizeMB = Math.Round(optimizedSizeMB, 2),

                reductionPercentage = Math.Round(reduction, 2)
            });
        }
    }
}