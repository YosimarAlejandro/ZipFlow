using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class FileRecordService : IFileRecordService
    {
        private readonly AppDbContext _context;


        public FileRecordService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<FileRecordDto>> GetHistoryAsync(Guid userId)
        {
            return await _context.FileRecords
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new FileRecordDto
                {
                    Id = x.Id,
                    OriginalFileName = x.OriginalFileName,
                    OptimizedFileName = x.OptimizedFileName,
                    OriginalSizeMB = x.OriginalSizeMB,
                    OptimizedSizeMB = x.OptimizedSizeMB,
                    ReductionPercentage = x.ReductionPercentage,
                    CompressionLevel = x.CompressionLevel,
                    CreatedAt = x.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<StatsDto> GetStatsAsync(Guid userId)
        {
            var files = _context.FileRecords
                .Where(x => x.UserId == userId);

            var totalFiles = await files.CountAsync();

            var totalSavedMB = totalFiles == 0
                ? 0
                : await files.SumAsync(x =>
                    x.OriginalSizeMB - x.OptimizedSizeMB);

            var averageReduction = totalFiles == 0
                ? 0
                : await files.AverageAsync(x =>
                    x.ReductionPercentage);

            var favoriteCompression = totalFiles == 0
                ? "N/A"
                : await files
                    .GroupBy(x => x.CompressionLevel)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.Key)
                    .FirstAsync();

            return new StatsDto
            {
                TotalFiles = totalFiles,
                TotalSavedMB = Math.Round(totalSavedMB, 2),
                AverageReduction = Math.Round(averageReduction, 2),
                FavoriteCompression = favoriteCompression
            };
        }

        public async Task<bool> DeleteAsync(Guid fileId, Guid userId)
        {
            var record = await _context.FileRecords
                .FirstOrDefaultAsync(x =>
                    x.Id == fileId &&
                    x.UserId == userId);

            if (record == null)
            {
                return false;
            }

            _context.FileRecords.Remove(record);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task CreateAsync(FileRecord record)
        {
            _context.FileRecords.Add(record);

            await _context.SaveChangesAsync();
        }


    }
}