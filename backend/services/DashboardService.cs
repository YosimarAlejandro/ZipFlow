using backend.Data;
using backend.DTOs;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardDto> GetDashboardAsync(Guid userId)
        {
            var files = _context.FileRecords
                .Where(x => x.UserId == userId);

            var totalFiles = await files.CountAsync();

            var totalSavedMB = totalFiles == 0
                ? 0
                : await files.SumAsync(x => x.OriginalSizeMB - x.OptimizedSizeMB);

            var averageReduction = totalFiles == 0
                ? 0
                : await files.AverageAsync(x => x.ReductionPercentage);

            var favoriteCompression = totalFiles == 0
                ? "N/A"
                : await files
                    .GroupBy(x => x.CompressionLevel)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.Key)
                    .FirstAsync();

            var recentFiles = await files
                .OrderByDescending(x => x.CreatedAt)
                .Take(5)
                .Select(x => new FileRecordDto
                {
                    OriginalFileName = x.OriginalFileName,
                    OptimizedFileName = x.OptimizedFileName,
                    OriginalSizeMB = x.OriginalSizeMB,
                    OptimizedSizeMB = x.OptimizedSizeMB,
                    ReductionPercentage = x.ReductionPercentage,
                    CompressionLevel = x.CompressionLevel,
                    CreatedAt = x.CreatedAt
                })
                .ToListAsync();

            return new DashboardDto
            {
                Stats = new StatsDto
                {
                    TotalFiles = totalFiles,
                    TotalSavedMB = Math.Round(totalSavedMB, 2),
                    AverageReduction = Math.Round(averageReduction, 2),
                    FavoriteCompression = favoriteCompression
                },
                RecentFiles = recentFiles
            };
        }
    }
}