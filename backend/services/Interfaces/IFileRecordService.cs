using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IFileRecordService
    {
        Task<List<FileRecordDto>> GetHistoryAsync(Guid userId);

        Task<StatsDto> GetStatsAsync(Guid userId);

        Task<bool> DeleteAsync(Guid userId, Guid fileId);

        Task CreateAsync(FileRecord record);
    }
}