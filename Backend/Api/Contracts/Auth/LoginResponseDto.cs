namespace Backend.Api.Contracts.Auth;

public class LoginResponseDto
{
  public string Token { get; set; } = string.Empty;
  public UserProfileDto? User { get; set; }
}
