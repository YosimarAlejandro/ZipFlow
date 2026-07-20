using ImageMagick;
using System.Diagnostics;

namespace backend.Services
{
    public static class ImageOptimizer
    {
        public static async Task<string> OptimizeAsync(string filePath)
        {
            return await Task.Run(() =>
            {
                // Iniciar cronómetro
                var stopwatch = Stopwatch.StartNew();

                // Carpeta donde se guardarán los archivos optimizados
                var processedFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "TempProcessed");

                // Si no existe la carpeta, la crea
                if (!Directory.Exists(processedFolder))
                    Directory.CreateDirectory(processedFolder);

                // Obtener nombre y extensión del archivo
                var fileName = Path.GetFileNameWithoutExtension(filePath);
                var extension = Path.GetExtension(filePath).ToLower();

                // Ruta del archivo optimizado
                var outputPath = Path.Combine(
                    processedFolder,
                    $"{fileName}_optimized{extension}");

                // Abrir la imagen con Magick.NET
                using (var image = new MagickImage(filePath))
                {
                    // Eliminar metadatos (GPS, cámara, etc.)
                    image.Strip();

                    switch (extension)
                    {
                        case ".jpg":
                        case ".jpeg":

                            Console.WriteLine("→ Algoritmo JPEG");

                            // Compresión con pérdida
                            image.Quality = 65;

                            break;

                        case ".png":

                            Console.WriteLine("→ Algoritmo PNG");

                            break;

                        default:

                            Console.WriteLine("→ Formato no soportado. Se guarda sin cambios.");

                            break;
                    }

                    // Guardar la imagen optimizada
                    image.Write(outputPath);
                }

                // Comparar tamaños
                var originalSize = new FileInfo(filePath).Length;
                var optimizedSize = new FileInfo(outputPath).Length;

                // Si el archivo optimizado pesa más, conservar el original
                if (optimizedSize > originalSize)
                {
                    File.Delete(outputPath);
                    File.Copy(filePath, outputPath);

                    Console.WriteLine("La optimización aumentó el tamaño.");
                    Console.WriteLine("Se conservó el archivo original.");
                }

                // Detener cronómetro
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