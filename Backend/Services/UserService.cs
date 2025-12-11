using Backend.Models.DTOs.User;
using Backend.Models.Wrappers;
using Backend.Repositories;

namespace Backend.Services;

public class UserService
{
  private readonly IUserRepository _userRepo;

  public UserService(IUserRepository userRepo)
  {
    _userRepo = userRepo;
  }
  public async Task<ApiResponse<IEnumerable<UserDto>>> GetAllUsersAsync()
  {
    try
    {
      var users = await _userRepo.GetAllUsersAsync();

      var userDtos = users.Select(user => new UserDto
      {
        Id = user.Id,
        Username = user.Username,
        PasswordHash = user.PasswordHash,
        Email = user.Email
      }).ToList();

      return new ApiResponse<IEnumerable<UserDto>>
      {
        Success = true,
        Message = "Userdtos retrieved successfully",
        Data = userDtos
      };
    }
    catch (Exception ex)
    {
      return new ApiResponse<IEnumerable<UserDto>>
      {
        Success = false,
        Message = "Userdtos retrieved unsuccessfully " + ex.Message,
        Data = []
      };
    }
  }

  public async Task<ApiResponse<UserProfileDto>> GetUserProfileAsync(Guid userId)
  {
    try
    {

      var user = await _userRepo.GetByIdAsync(userId)
          ?? throw new InvalidOperationException("User not found");

      var userProfile = new UserProfileDto
      {
        Id = user.Id,
        Username = user.Username,
        Email = user.Email
      };

      return new ApiResponse<UserProfileDto>
      {
        Success = true,
        Message = "User profile retrieved successfully",
        Data = userProfile
      };
    }
    catch (Exception ex)
    {
      return new ApiResponse<UserProfileDto>
      {
        Success = false,
        Message = "User profile retrieved unsuccessfully " + ex.Message,
        Data = null
      };
    }
  }

  public async Task<ApiResponse<IEnumerable<UserProfileDto>>> GetAllUserProfilesAsync()
  {
    try
    {
      var users = await _userRepo.GetAllUsersAsync();

      var userProfiles = users.Select(user => new UserProfileDto
      {
        Id = user.Id,
        Username = user.Username,
        Email = user.Email
      }).ToList();

      return new ApiResponse<IEnumerable<UserProfileDto>>
      {
        Success = true,
        Message = "All users profiles retrieved successfully",
        Data = userProfiles
      };
    }
    catch (Exception ex)
    {
      return new ApiResponse<IEnumerable<UserProfileDto>>
      {
        Success = false,
        Message = "Failed to users profiles: " + ex.Message,
        Data = null
      };
    }
  }


  public async Task<ApiResponse<bool>> DeleteUserAsync(Guid userId)
  {
    try
    {
      var user = await _userRepo.GetByIdAsync(userId);
      if (user == null)
      {
        return new ApiResponse<bool>
        {
          Success = false,
          Message = "User not found",
          Data = false
        };
      }

      await _userRepo.DeleteAsync(user);

      return new ApiResponse<bool>
      {
        Success = true,
        Message = "User deleted successfully",
        Data = true
      };
    }
    catch (Exception ex)
    {
      return new ApiResponse<bool>
      {
        Success = false,
        Message = $"Failed to delete user: {ex.Message}",
        Data = false
      };
    }
  }
}
