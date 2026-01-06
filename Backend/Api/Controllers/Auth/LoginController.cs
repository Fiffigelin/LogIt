using Backend.Api.Contracts;
using Backend.Api.Contracts.Auth;
using Backend.Application.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
  private readonly LoginUseCase _loginUseCase;

  public LoginController(LoginUseCase loginUseCase)
  {
    _loginUseCase = loginUseCase;
  }

  [HttpPost]
  public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginRequestDto dto)
  {
    var response = await _loginUseCase.Execute(dto);

    if (response == null)
    {
      return Unauthorized(new ApiResponse<LoginResponseDto>
      {
        Success = false,
        Message = "Ogiltiga inloggningsuppgifter",
        Data = null
      });
    }

    return Ok(new ApiResponse<LoginResponseDto>
    {
      Success = true,
      Message = "Inloggning lyckades",
      Data = response
    });
  }
}
