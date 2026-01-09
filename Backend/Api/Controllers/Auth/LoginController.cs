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
  [Produces("application/json")]
  [Consumes("application/json")]
  [ProducesResponseType(typeof(ApiResponse<LoginResponseDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ApiResponse<LoginResponseDto>), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ApiResponse<LoginResponseDto>), StatusCodes.Status500InternalServerError)]
  public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginRequestDto dto)
  {
    var result = await _loginUseCase.Execute(dto);

    if (!result.Success && result.Error != null)
      return BadRequest(result);

    if (!result.Success)
      return StatusCode(500, result);

    return Ok(result);
  }
}
