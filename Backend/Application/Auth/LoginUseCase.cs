using Backend.Api.Contracts.Common.Wrapper;
using Backend.Api.Contracts.Auth;
using Backend.Domain.Validation;
using Backend.Infrastructure.Persistence.Repositories.UserRepository;
using Backend.Infrastructure.Security;
using Backend.Domain.Entities;

public class LoginUseCase
{
  private readonly LoginValidator _validator;
  private readonly ITokenService _tokenService;
  private readonly IUserRepository _userRepo;

  public LoginUseCase(LoginValidator validator, ITokenService tokenService, IUserRepository userRepo)
  {
    _validator = validator;
    _tokenService = tokenService;
    _userRepo = userRepo;
  }

  public async Task<ApiResponse<LoginResponseDto>> Execute(LoginRequestDto dto)
  {
    var error = await _validator.Validate(dto.Email, dto.Password);
    if (error != null)
      return new ApiResponse<LoginResponseDto> { Success = false, Error = error };

    var user = await _userRepo.GetByEmailAsync(dto.Email) ?? throw new InvalidOperationException("User should exist after validation.");
    var token = _tokenService.GenerateToken(user);

    return new ApiResponse<LoginResponseDto>
    {
      Success = true,
      Data = new LoginResponseDto
      {
        User = MapUserToProfileDto(user),
        Token = token
      }
    };
  }

  private static UserProfileDto MapUserToProfileDto(User user)
  {
    return new UserProfileDto
    {
      Id = user.Id,
      Email = user.Email,
      FullName = user.FullName
    };
  }
}
