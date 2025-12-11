using Backend.Data;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend.Data;

public static class DbSeeder
{
  public static async Task SeedAsync(LogItDbContext context)
  {
    if (!context.Users.Any())
    {
      var hasher = new PasswordHasher<User>();

      var defaultUser = new User("admin", "admin@example.com");
      defaultUser.UpdatePassword(hasher.HashPassword(null!, "Admin123!"));

      context.Users.Add(defaultUser);
      await context.SaveChangesAsync();

      Console.WriteLine("Default user created: admin@example.com / Admin123!");
    }
  }
}
