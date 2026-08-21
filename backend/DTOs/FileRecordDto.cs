namespace backend.DTOs
{
    public class FileRecordDto
    {
        public Guid Id { get; set; }
        public string OriginalFileName { get; set; } = string.Empty;

        public string OptimizedFileName { get; set; } = string.Empty;

        public double OriginalSizeMB { get; set; }

        public double OptimizedSizeMB { get; set; }

        public double ReductionPercentage { get; set; }

        public string CompressionLevel { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}