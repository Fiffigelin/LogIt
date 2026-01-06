namespace Backend.Domain.Entities;

public class User
{
  private User() { }

  public User(string username, string email)
  {
    Id = Guid.NewGuid();
    SetUsername(username);
    SetEmail(email);
  }

  public Guid Id { get; private set; }
  public string Username { get; private set; } = null!;
  public string PasswordHash { get; private set; } = null!;
  public string Email { get; private set; } = null!;

  public void SetUsername(string username)
  {
    if (string.IsNullOrWhiteSpace(username))
      throw new ArgumentException("Username cannot be empty.", nameof(username));
    Username = username.Trim();
  }

  public void SetEmail(string email)
  {
    if (string.IsNullOrWhiteSpace(email))
      throw new ArgumentException("Email cannot be empty.", nameof(email));
    Email = email.Trim();
  }

  public void SetPasswordHash(string passwordHash)
  {
    if (string.IsNullOrWhiteSpace(passwordHash))
      throw new ArgumentException("PasswordHash cannot be empty.", nameof(passwordHash));
    PasswordHash = passwordHash;
  }
}
