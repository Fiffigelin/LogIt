using Backend.Api.Contracts.Auth;
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

  public async Task<RegisterResponseDto> Execute(RegisterRequestDto dto)
  {
    Console.WriteLine("execute");
    User? user = null;

    try
    {
      Console.WriteLine("try");
      await ValidateUser(dto);
      user = new User(dto.Username, dto.Email);
      Console.WriteLine("new user");
      user.SetPasswordHash(_hasher.HashPassword(user, dto.Password));

      await _userRepo.AddAsync(user);

      return new RegisterResponseDto
      {
        Success = true,
        Message = "User registered successfully."
      };
    }
    catch (ArgumentException ex)
    {
      return new RegisterResponseDto
      {
        Success = false,
        Message = ex.Message
      };
    }
    catch (Exception)
    {
      if (user != null)
      {
        await _userRepo.DeleteAsync(user);
      }

      return new RegisterResponseDto
      {
        Success = false,
        Message = "An unexpected error occurred. Please try again later."
      };
    }
  }

  private async Task ValidateUser(RegisterRequestDto dto)
  {
    if (!InputValidators.IsValidEmail(dto.Email))
      Console.WriteLine("Invalid email format.");
    // throw new ArgumentException("Invalid email format.");

    if (!InputValidators.IsValidUsername(dto.Username))
      Console.WriteLine("Invalid username format.");
    // throw new ArgumentException("Invalid username format.");

    if (!InputValidators.IsValidPassword(dto.Password))
      Console.WriteLine("Password must be at least 8 characters, include at least one uppercase letter, " +
          "one lowercase letter, one number, and one special character.");
    // throw new ArgumentException(
    //     "Password must be at least 8 characters, include at least one uppercase letter, " +
    //     "one lowercase letter, one number, and one special character."
    // );

    if (await _userRepo.ExistsByUsernameAsync(dto.Username))
      Console.WriteLine("Username already exists");
    // throw new ArgumentException("Username already exists");

    if (await _userRepo.ExistsByEmailAsync(dto.Email))
      Console.WriteLine("Email already exists");
    // throw new ArgumentException("Email already exists");
  }
}
