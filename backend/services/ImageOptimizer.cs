using ImageMagick;
using System.Diagnostics;

namespace backend.Services
{
    public static class ImageOptimizer
    {
        public static async Task<string> OptimizeAsync(
            string filePath,
            string compression = "medium")
        {
            return await Task.Run(() =>
            {
                var stopwatch = Stopwatch.StartNew();

                var processedFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "TempProcessed");

                if (!Directory.Exists(processedFolder))
                    Directory.CreateDirectory(processedFolder);

                var fileName = Path.GetFileNameWithoutExtension(filePath);
                var extension = Path.GetExtension(filePath).ToLower();

                var outputPath = Path.Combine(
                    processedFolder,
                    $"{fileName}_optimized{extension}");

                using (var image = new MagickImage(filePath))
                {
                    // Eliminar metadatos
                    image.Strip();

                    switch (extension)
                    {
                        case ".jpg":
                        case ".jpeg":

                            Console.WriteLine("→ Algoritmo JPEG");

                            switch (compression.ToLower())
                            {
                                case "low":
                                    image.Quality = 85;
                                    Console.WriteLine("Nivel: BAJO");
                                    break;

                                case "medium":
                                    image.Quality = 65;
                                    Console.WriteLine("Nivel: MEDIO");
                                    break;

                                case "high":
                                    image.Quality = 45;
                                    Console.WriteLine("Nivel: ALTO");
                                    break;

                                default:
                                    image.Quality = 65;
                                    Console.WriteLine("Nivel: MEDIO (Default)");
                                    break;
                            }

                            break;

                        case ".png":

                            Console.WriteLine("→ Algoritmo PNG");

                            // PNG es sin pérdida, únicamente eliminamos metadatos.
                            // Más adelante podremos aplicar cuantización de colores.

                            Console.WriteLine($"Nivel: {compression.ToUpper()}");

                            break;

                        default:

                            Console.WriteLine("→ Formato no soportado.");

                            break;
                    }

                    image.Write(outputPath);
                }

                var originalSize = new FileInfo(filePath).Length;
                var optimizedSize = new FileInfo(outputPath).Length;

                if (optimizedSize > originalSize)
                {
                    File.Delete(outputPath);
                    File.Copy(filePath, outputPath);

                    Console.WriteLine("La optimización aumentó el tamaño.");
                    Console.WriteLine("Se conservó el archivo original.");
                }

                stopwatch.Stop();

                Console.WriteLine();
                Console.WriteLine("Imagen optimizada correctamente.");
                Console.WriteLine($"Tiempo de procesamiento: {stopwatch.ElapsedMilliseconds} ms");
                Console.WriteLine();

                return outputPath;
            });
        }
    }
}