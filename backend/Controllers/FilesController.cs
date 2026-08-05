using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using backend.Data;
using backend.Models;
using System.Security.Claims;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {

        private readonly IFileOptimizationService _optimizationService;
        private readonly AppDbContext _context;

        public FilesController(
            IFileOptimizationService optimizationService,
            AppDbContext context)
        {
            _optimizationService = optimizationService;
            _context = context;
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

            _context.FileRecords.Add(record);

            await _context.SaveChangesAsync();

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

            var history = await _context.FileRecords
                .Where(x => x.UserId == Guid.Parse(userId))
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new FileRecordDto
                {
                    OriginalFileName = x.OriginalFileName,
                    OptimizedFileName = x.OptimizedFileName,
                    OriginalSizeMB = x.OriginalSizeMB,
                    OptimizedSizeMB = x.OptimizedSizeMB,
                    ReductionPercentage = x.ReductionPercentage,
                    CompressionLevel = x.CompressionLevel,
                    CreatedAt = x.CreatedAt
                })
                .ToListAsync();

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

            var userGuid = Guid.Parse(userId);

            var files = _context.FileRecords
                .Where(x => x.UserId == userGuid);

            var totalFiles = await files.CountAsync();

            var totalSavedMB = await files.SumAsync(x =>
                x.OriginalSizeMB - x.OptimizedSizeMB);

            var averageReduction = totalFiles == 0
                ? 0
                : await files.AverageAsync(x => x.ReductionPercentage);

            var favoriteCompression = totalFiles == 0
                ? "N/A"
                : await files
                    .GroupBy(x => x.CompressionLevel)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.Key)
                    .FirstAsync();

            var stats = new StatsDto
            {
                TotalFiles = totalFiles,
                TotalSavedMB = Math.Round(totalSavedMB, 2),
                AverageReduction = Math.Round(averageReduction, 2),
                FavoriteCompression = favoriteCompression
            };

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

            var record = await _context.FileRecords.FindAsync(id);

            if (record == null)
            {
                return NotFound(new
                {
                    message = "Registro no encontrado."
                });
            }

            if (record.UserId != Guid.Parse(userId))
            {
                return Forbid();
            }

            _context.FileRecords.Remove(record);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Registro eliminado correctamente."
            });
        }
    }

}