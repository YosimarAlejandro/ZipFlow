using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using backend.Models;
using System.Security.Claims;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {

        private readonly IFileOptimizationService _optimizationService;
        private readonly IFileRecordService _fileRecordService;

        public FilesController(
            IFileOptimizationService optimizationService,
            IFileRecordService fileRecordService)
        {
            _optimizationService = optimizationService;
            _fileRecordService = fileRecordService;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(

        IFormFile file,
        [FromForm(Name = "compressionLevel")] string compression = "medium")

        {
            Console.WriteLine("==============================");
            Console.WriteLine(" VALORES RECIBIDOS CONTROLLER");
            Console.WriteLine($"Archivo: {file?.FileName}");
            Console.WriteLine($"Compression recibido: {compression}");
            Console.WriteLine("==============================");
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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
             ?? User.FindFirst("sub")?.Value;

            Console.WriteLine("==================================");
            Console.WriteLine("USUARIO AUTENTICADO");
            Console.WriteLine($"UserId: {userId}");
            Console.WriteLine("==================================");

            var optimizedFile = await _optimizationService.OptimizeAsync(filePath, compression);

            // Información del archivo original
            var originalInfo = new FileInfo(filePath);

            // Información del archivo optimizado
            var optimizedInfo = new FileInfo(optimizedFile);

            double originalSizeMB = originalInfo.Length / 1024.0 / 1024.0;
            double optimizedSizeMB = optimizedInfo.Length / 1024.0 / 1024.0;

            double reduction = 100 - ((optimizedSizeMB / originalSizeMB) * 100);
            // Guardar historial del archivo
            var record = new FileRecord
            {
                UserId = Guid.Parse(userId!),

                OriginalFileName = file.FileName,

                OptimizedFileName = Path.GetFileName(optimizedFile),

                OriginalSizeMB = Math.Round(originalSizeMB, 2),

                OptimizedSizeMB = Math.Round(optimizedSizeMB, 2),

                ReductionPercentage = Math.Round(reduction, 2),

                CompressionLevel = compression,

                CreatedAt = DateTime.UtcNow
            };

            await _fileRecordService.CreateAsync(record);

            Console.WriteLine("========================================");
            Console.WriteLine("HISTORIAL GUARDADO");
            Console.WriteLine($"Registro: {record.Id}");
            Console.WriteLine("========================================");
            Console.WriteLine("===============================");
            Console.WriteLine(" ZIPFLOW BACKEND RECEPCION");
            Console.WriteLine($"Archivo: {file.FileName}");
            Console.WriteLine("===============================");
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

                compressionLevel = compression,

                originalFile = file.FileName,
                originalSizeMB = Math.Round(originalSizeMB, 2),

                optimizedFile = Path.GetFileName(optimizedFile),
                optimizedSizeMB = Math.Round(optimizedSizeMB, 2),

                reductionPercentage = Math.Round(reduction, 2)
            });
        }

        [HttpGet("download/{fileName}")]
        public IActionResult Download(string fileName)
        {
            var filePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "TempProcessed",
                fileName
            );

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(new
                {
                    message = "Archivo no encontrado."
                });
            }

            var bytes = System.IO.File.ReadAllBytes(filePath);

            return File(
                bytes,
                "application/octet-stream",
                fileName
            );
        }

        [HttpGet("history")]
        public async Task<IActionResult> History()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var history = await _fileRecordService
                .GetHistoryAsync(Guid.Parse(userId));

            return Ok(history);
        }

        [HttpGet("stats")]
        public async Task<IActionResult> Stats()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var stats = await _fileRecordService
                .GetStatsAsync(Guid.Parse(userId));

            return Ok(stats);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var deleted = await _fileRecordService
                .DeleteAsync(id, Guid.Parse(userId));

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Registro no encontrado."
                });
            }

            return Ok(new
            {
                message = "Registro eliminado correctamente."
            });
        }
    }

}