using Backend.Api.Contracts.Auth;
using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence.Repositories.UserRepository;
using Backend.Infrastructure.Security;
using Microsoft.AspNetCore.Identity;

namespace Backend.Application.Auth;

public class LoginUseCase(IUserRepository userRepo, IPasswordHasher<User> hasher, ITokenService tokenService)
{
  private readonly IUserRepository _userRepo = userRepo;
  private readonly IPasswordHasher<User> _hasher = hasher;
  private readonly ITokenService _tokenService = tokenService;

  public async Task<LoginResponseDto?> Execute(LoginRequestDto dto)
  {
    var user = await _userRepo.GetByEmailAsync(dto.Email);
    if (user == null) return null;

    var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
    if (result == PasswordVerificationResult.Failed) return null;

    var token = _tokenService.GenerateToken(user);

    return new LoginResponseDto
    {
      Token = token,
      User = new UserProfileDto
      {
        Id = user.Id,
        Email = user.Email,
        Username = user.Username
      }
    };
  }
}
