using System.Diagnostics;
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public static class PdfOptimizer
    {
        public static async Task<string> OptimizeAsync(
            string filePath,
            string compression = "medium")
        {
            // Leer configuración
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            string? ghostscriptPath;

            if (OperatingSystem.IsWindows())
            {
                ghostscriptPath = configuration["Ghostscript:WindowsExecutable"];
            }
            else
            {
                ghostscriptPath = configuration["Ghostscript:LinuxExecutable"];
            }

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

            // Carpeta de salida
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
            Console.WriteLine("===============================");
            Console.WriteLine($"Nivel para Ghostscript: {compression}");
            Console.WriteLine("===============================");
            // Perfil de compresión
            string pdfSettings = compression.ToLower() switch
            {
                "low" => "/prepress",
                "medium" => "/ebook",
                "high" => "/screen",
                _ => "/ebook"
            };

            Console.WriteLine($"Nivel seleccionado : {compression.ToUpper()}");
            Console.WriteLine($"Perfil Ghostscript : {pdfSettings}");
            Console.WriteLine();

            var process = new Process();

            process.StartInfo = new ProcessStartInfo
            {
                FileName = ghostscriptPath,

                Arguments =
                    $"-sDEVICE=pdfwrite " +
                    $"-dCompatibilityLevel=1.4 " +
                    $"-dPDFSETTINGS={pdfSettings} " +
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

            // Si el PDF quedó más pesado, conservar el original
            var originalSize = new FileInfo(filePath).Length;
            var optimizedSize = new FileInfo(outputPath).Length;

            if (optimizedSize > originalSize)
            {
                File.Delete(outputPath);
                File.Copy(filePath, outputPath);

                Console.WriteLine("La optimización aumentó el tamaño.");
                Console.WriteLine("Se conservó el archivo original.");
            }

            Console.WriteLine("Ghostscript terminó correctamente.");

            return outputPath;
        }
    }
}