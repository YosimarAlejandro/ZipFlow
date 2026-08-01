namespace backend.Services.Interfaces
{
    public interface IFileOptimizationService
    {
        Task<string> OptimizeAsync(
            string filePath,
            string compression = "medium");
    }
}