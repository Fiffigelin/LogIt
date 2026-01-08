using Backend.Api.Contracts.Common.Wrapper;
using Backend.Api.Contracts.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Auth;

[ApiController]
[Route("api/[controller]")]
public class LoginController(LoginUseCase loginUseCase) : ControllerBase
{
  private readonly LoginUseCase _loginUseCase = loginUseCase;

  [HttpPost]
  [ProducesResponseType(typeof(ApiResponse<LoginResponseDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ApiResponse<LoginResponseDto>), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ApiResponse<LoginResponseDto>), StatusCodes.Status500InternalServerError)]
  public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginRequestDto dto)
  {
    var response = await _loginUseCase.Execute(dto);

    if (!response.Success)
    {
      return response.Error != null
          ? BadRequest(response)
          : StatusCode(500, response);
    }

    return Ok(response);
  }
}
