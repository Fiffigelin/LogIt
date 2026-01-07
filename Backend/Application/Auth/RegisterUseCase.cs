using Backend.Api.Contracts;
using Backend.Api.Contracts.Auth;
using Backend.Api.Contracts.Common;
using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence.Repositories.UserRepository;
using Backend.Validations;
using Microsoft.AspNetCore.Identity;

namespace Backend.Application.Auth;

public class RegisterUseCase
{
  private readonly IUserRepository _userRepo;
  private readonly IPasswordHasher<User> _hasher;

  public RegisterUseCase(IUserRepository userRepo, IPasswordHasher<User> hasher)
  {
    _userRepo = userRepo;
    _hasher = hasher;
  }

  public async Task<ApiResponse<RegisterResponseDto>> Execute(RegisterRequestDto dto)
  {
    var validationError = await ValidateUser(dto);
    if (validationError != null)
    {
      return new ApiResponse<RegisterResponseDto>
      {
        Success = false,
        Message = validationError.Message,
        Error = validationError
      };
    }

    var user = new User(dto.FullName, dto.Email);
    user.SetPasswordHash(_hasher.HashPassword(user, dto.Password));
    await _userRepo.AddAsync(user);

    return new ApiResponse<RegisterResponseDto>
    {
      Success = true,
      Message = "Registration successful"
    };
  }
  // public async Task<RegisterResponseDto> Execute(RegisterRequestDto dto)
  // {
  //   User? user = null;

  //   try
  //   {
  //     await ValidateUser(dto);
  //     user = new User(dto.Username, dto.Email);
  //     user.SetPasswordHash(_hasher.HashPassword(user, dto.Password));

  //     await _userRepo.AddAsync(user);

  //     return new RegisterResponseDto
  //     {
  //       Success = true,
  //       Message = "User registered successfully."
  //     };
  //   }
  //   catch (ArgumentException ex)
  //   {
  //     return new RegisterResponseDto
  //     {
  //       Success = false,
  //       Message = ex.Message
  //     };
  //   }
  //   catch (Exception)
  //   {
  //     if (user != null)
  //     {
  //       await _userRepo.DeleteAsync(user);
  //     }

  //     return new RegisterResponseDto
  //     {
  //       Success = false,
  //       Message = "An unexpected error occurred. Please try again later."
  //     };
  //   }
  // }

  private async Task<ValidationError?> ValidateUser(RegisterRequestDto dto)
  {
    if (!InputValidators.IsValidEmail(dto.Email))
      return new("email", "Invalid email format");

    if (!InputValidators.IsValidPassword(dto.Password))
      return new("password",
          "Password must be at least 8 characters, include uppercase, lowercase, number and symbol.");

    if (await _userRepo.ExistsByEmailAsync(dto.Email))
      return new("email", "Email already exists");

    return null;
  }
}
