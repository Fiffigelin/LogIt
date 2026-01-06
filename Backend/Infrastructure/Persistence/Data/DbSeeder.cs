using Backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend.Infrastructure.Persistence.Data;

public static class DbSeeder
{
  public static async Task SeedAsync(LogItDbContext context)
  {
    if (!context.Users.Any())
    {
      var hasher = new PasswordHasher<User>();

      var defaultUser = new User("Bojack Horseman", "bojack-horse@mail.com");
      defaultUser.SetPasswordHash(hasher.HashPassword(null!, "Bojack123!?"));

      context.Users.Add(defaultUser);
      await context.SaveChangesAsync();

      Console.BackgroundColor = ConsoleColor.Green;
      Console.WriteLine("");
      Console.WriteLine("=====================================================================");
      Console.WriteLine("===||                    Default user created                    ||==");
      Console.WriteLine("===||                    Email: bojack-horse@mail.com            ||==");
      Console.WriteLine("===||                    Password: Bojack123!?                   ||==");
      Console.WriteLine("=====================================================================");
      Console.ResetColor();
      Console.WriteLine("");
    }
  }
}
