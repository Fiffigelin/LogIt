using Backend.Api.Contracts.Common;
using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence.Repositories.UserRepository;
using Backend.Domain.Policies;
using Microsoft.AspNetCore.Identity;

namespace Backend.Domain.Validation;

public class LoginValidator
{
  private readonly IUserRepository _userRepo;
  private readonly IPasswordHasher<User> _hasher;

  public LoginValidator(IUserRepository userRepo, IPasswordHasher<User> hasher)
  {
    _userRepo = userRepo;
    _hasher = hasher;
  }

  public async Task<ValidationError?> Validate(string email, string password)
  {
    if (!EmailPolicy.IsValid(email))
      return new ValidationError("email", Messages.InvalidEmail);

    var user = await _userRepo.GetByEmailAsync(email);
    if (user == null)
      return new ValidationError("email", Messages.EmailDoesntExist);

    var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, password);
    if (result == PasswordVerificationResult.Failed)
      return new ValidationError("password", Messages.IncorrectPassword);

    return null;
  }
}
