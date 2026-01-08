using Backend.Domain.Entities;

namespace Backend.Infrastructure.Persistence.Repositories.UserRepository;

public interface IUserRepository
{
  Task AddAsync(User user);
  Task<bool> ExistsByEmailAsync(string email);
  Task<IEnumerable<User>> GetAllUsersAsync();
  Task<User?> GetByIdAsync(Guid userId);
  Task<User> DeleteAsync(User user);
  Task<User?> GetByEmailAsync(string email);
}
