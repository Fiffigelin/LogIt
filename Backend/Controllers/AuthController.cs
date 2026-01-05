using Backend.Models.DTOs.Auth;
using Backend.Models.Wrappers;
using Backend.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginRequestDto dto)
    {
        var response = await _authService.LoginAsync(dto);
        if (response == null)
        {
            return Unauthorized(new ApiResponse<AuthResponseDto>
            {
                Success = false,
                Message = "Ogiltiga inloggningsuppgifter",
                Data = null
            });
        }

        return Ok(new ApiResponse<AuthResponseDto>
        {
            Success = true,
            Message = "Inloggning lyckades",
            Data = response
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
    {
        var result = await _authService.RegisterAsync(dto);

        if (!result.Success)
            return BadRequest(result);

        return Created("", result);
    }
}