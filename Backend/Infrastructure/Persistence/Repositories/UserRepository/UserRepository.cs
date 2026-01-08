
using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories.UserRepository;

public class UserRepository : IUserRepository
{
  private readonly LogItDbContext _context;

  public UserRepository(LogItDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Adds a new user to the database.
  /// </summary>
  public async Task AddAsync(User user)
  {
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
  }

  /// <summary>
  /// Checks if a user with the given email exists.
  /// </summary>
  public async Task<bool> ExistsByEmailAsync(string email)
  {
    return await _context.Users.AnyAsync(u => u.Email == email);
  }

  /// <summary>
  /// Retrieves a user by their ID.
  /// </summary>
  public async Task<User?> GetByIdAsync(Guid userId)
  {
    return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
  }

  /// <summary>
  /// Retrieves a user by their email.
  /// </summary>
  public async Task<User?> GetByEmailAsync(string email)
  {
    return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
  }

  /// <summary>
  /// Retrieves all users.
  /// </summary>
  public async Task<IEnumerable<User>> GetAllUsersAsync()
  {
    return await _context.Users.ToListAsync();
  }

  /// <summary>
  /// Deletes a user from the database.
  /// </summary>
  public async Task<User> DeleteAsync(User user)
  {
    _context.Users.Remove(user);
    await _context.SaveChangesAsync();
    return user;
  }
}
