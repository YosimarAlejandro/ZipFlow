using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterDto dto);

        Task<string> LoginAsync(LoginDto dto);
    }
}