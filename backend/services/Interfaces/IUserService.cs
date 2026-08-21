using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<ProfileDto?> GetProfileAsync(Guid userId);

        Task<bool> UpdateProfileAsync(
            Guid userId,
            UpdateProfileDto dto);
    }
}