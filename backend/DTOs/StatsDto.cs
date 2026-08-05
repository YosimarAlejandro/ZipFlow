namespace backend.DTOs
{
    public class StatsDto
    {
        public int TotalFiles { get; set; }

        public double TotalSavedMB { get; set; }

        public double AverageReduction { get; set; }

        public string FavoriteCompression { get; set; } = string.Empty;
    }
}