using Backend.Api.Contracts.Common;
using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence.Repositories.UserRepository;
using Backend.Domain.Policies;
using Microsoft.AspNetCore.Identity;
using Backend.Api.Contracts.Auth;

namespace Backend.Domain.Validation;

public class RegisterValidator
{
  private readonly IUserRepository _userRepo;
  private readonly IPasswordHasher<User> _hasher;

  public RegisterValidator(IUserRepository userRepo, IPasswordHasher<User> hasher)
  {
    _userRepo = userRepo;
    _hasher = hasher;
  }

  public async Task<ValidationError?> Validate(RegisterRequestDto dto)
  {
    if (!NamePolicy.IsValidFullName(dto.FullName))
      return new ValidationError("fullName", Messages.EmailAlreadyExists);

    if (!EmailPolicy.IsValid(dto.Email))
      return new ValidationError("email", Messages.InvalidEmail);

    var user = await _userRepo.GetByEmailAsync(dto.Email);
    if (user != null)
      return new ValidationError("email", Messages.EmailAlreadyExists);

    return null;
  }
}
