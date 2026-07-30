using System.Diagnostics;
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public static class PdfOptimizer
    {
        public static async Task<string> OptimizeAsync(string filePath)
        {
            // Leer configuración desde appsettings.json
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var ghostscriptPath = configuration["Ghostscript:Executable"];

            if (string.IsNullOrWhiteSpace(ghostscriptPath))
            {
                throw new Exception(
                    "No se encontró la ruta de Ghostscript en appsettings.json.");
            }

            if (!File.Exists(ghostscriptPath))
            {
                throw new Exception(
                    $"Ghostscript no existe en la ruta:\n{ghostscriptPath}");
            }

            // Crear carpeta de salida
            var processedFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "TempProcessed");

            if (!Directory.Exists(processedFolder))
            {
                Directory.CreateDirectory(processedFolder);
            }

            var fileName = Path.GetFileNameWithoutExtension(filePath);

            var outputPath = Path.Combine(
                processedFolder,
                $"{fileName}_optimized.pdf");

            Console.WriteLine("========================================");
            Console.WriteLine("       INICIANDO GHOSTSCRIPT");
            Console.WriteLine("========================================");

            var process = new Process();

            process.StartInfo = new ProcessStartInfo
            {
                FileName = ghostscriptPath,

                Arguments =
                    $"-sDEVICE=pdfwrite " +
                    $"-dCompatibilityLevel=1.4 " +
                    $"-dPDFSETTINGS=/ebook " +
                    $"-dNOPAUSE " +
                    $"-dQUIET " +
                    $"-dBATCH " +
                    $"-sOutputFile=\"{outputPath}\" " +
                    $"\"{filePath}\"",

                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            process.Start();

            string output = await process.StandardOutput.ReadToEndAsync();
            string errors = await process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();

            if (process.ExitCode != 0)
            {
                throw new Exception(
                    $"Ghostscript falló.\n\n{errors}");
            }

            Console.WriteLine("Ghostscript terminó correctamente.");

            return outputPath;
        }
    }
}