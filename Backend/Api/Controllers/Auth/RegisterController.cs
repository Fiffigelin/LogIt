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
  public async Task<ActionResult<ApiResponse<RegisterResponseDto>>> Register([FromBody] RegisterRequestDto dto)
  {
    Console.WriteLine(dto.Email);
    Console.WriteLine(dto.Username);
    Console.WriteLine(dto.Password);
    var result = await _registerUseCase.Execute(dto);
    Console.WriteLine(result.Success);
    if (!result.Success)
    {
      return BadRequest(new ApiResponse<RegisterResponseDto>
      {
        Success = false,
        Message = "Kunde inte registrera ny användare",
        Data = null
      });
    }

    return Ok(new ApiResponse<RegisterResponseDto>
    {
      Success = true,
      Message = "Lyckad registrering",
      Data = null
    });
  }
}
