namespace Backend.Domain.Entities;

public class User
{
  private User() { }

  public User(string fullName, string email)
  {
    Id = Guid.NewGuid();
    SetFullName(fullName);
    SetEmail(email);
  }

  public Guid Id { get; private set; }
  public string FullName { get; private set; } = null!;
  public string PasswordHash { get; private set; } = null!;
  public string Email { get; private set; } = null!;

  public void SetFullName(string fullName)
  {
    if (string.IsNullOrWhiteSpace(fullName))
      throw new ArgumentException("Username cannot be empty.", nameof(fullName));
    FullName = fullName.Trim();
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
