using backend.Services.Interfaces;

namespace backend.Services
{
    public class FileOptimizationService : IFileOptimizationService
    {
        public async Task<string> OptimizeAsync(
            string filePath,
            string compression = "medium")
        {
            return await FileDetector.DetectAsync(
                filePath,
                compression);
        }
    }
}