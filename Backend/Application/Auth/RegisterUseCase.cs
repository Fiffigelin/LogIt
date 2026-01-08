using Backend.Api.Contracts.Common.Wrapper;
using Backend.Api.Contracts.Auth;
using Backend.Api.Contracts.Common;
using Backend.Domain.Entities;
using Backend.Domain.Validation;
using Backend.Infrastructure.Persistence.Repositories.UserRepository;
using Microsoft.AspNetCore.Identity;

namespace Backend.Application.Auth;

public class RegisterUseCase
{
  private readonly RegisterValidator _validator;
  private readonly IUserRepository _userRepo;
  private readonly IPasswordHasher<User> _hasher;

  public RegisterUseCase(RegisterValidator validator, IUserRepository userRepo, IPasswordHasher<User> hasher)
  {
    _validator = validator;
    _userRepo = userRepo;
    _hasher = hasher;
  }

  public async Task<ApiResponse<RegisterResponseDto>> Execute(RegisterRequestDto dto)
  {
    var validationError = await _validator.Validate(dto);
    if (validationError != null)
    {
      return new ApiResponse<RegisterResponseDto>
      {
        Success = false,
        Message = validationError.Message,
        Error = validationError,
        Data = null
      };
    }

    var user = new User(dto.FullName, dto.Email);
    user.SetPasswordHash(_hasher.HashPassword(user, dto.Password));
    await _userRepo.AddAsync(user);

    return new ApiResponse<RegisterResponseDto>
    {
      Success = true,
      Message = Messages.RegistrationSuccessful,
      Data = new RegisterResponseDto()
    };
  }
}
