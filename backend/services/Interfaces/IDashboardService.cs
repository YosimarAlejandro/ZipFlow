using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync(Guid userId);
    }
}