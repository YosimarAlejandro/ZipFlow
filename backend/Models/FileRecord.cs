namespace backend.Models
{
    public class FileRecord
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string OriginalFileName { get; set; } = string.Empty;

        public string OptimizedFileName { get; set; } = string.Empty;

        public double OriginalSizeMB { get; set; }

        public double OptimizedSizeMB { get; set; }

        public double ReductionPercentage { get; set; }

        public string CompressionLevel { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relación con User
        public User User { get; set; } = null!;
    }
}