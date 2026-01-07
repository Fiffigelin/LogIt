using Backend.Api.Contracts;
using Backend.Api.Contracts.Auth;
using Backend.Application.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Auth;

[ApiController]
[Route("api/[controller]")]
public class RegisterController(RegisterUseCase registerUseCase) : ControllerBase
{
  private readonly RegisterUseCase _registerUseCase = registerUseCase;

  [HttpPost]
  [ProducesResponseType(typeof(ApiResponse<RegisterResponseDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ApiResponse<RegisterResponseDto>), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ApiResponse<RegisterResponseDto>), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
  {
    var result = await _registerUseCase.Execute(dto);

    if (!result.Success && result.Error != null)
      return BadRequest(result);

    if (!result.Success)
      return StatusCode(500, result);

    return Ok(result);
  }
}
