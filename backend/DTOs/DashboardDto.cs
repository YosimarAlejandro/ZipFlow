namespace backend.DTOs
{
    public class DashboardDto
    {
        public StatsDto Stats { get; set; } = new();

        public List<FileRecordDto> RecentFiles { get; set; } = new();
    }
}