using System.Text.RegularExpressions;

namespace Backend.Domain.Policies;

public static partial class PasswordPolicy
{
  public static bool IsValid(string password)
      => !string.IsNullOrWhiteSpace(password) && Regex().IsMatch(password);

  [GeneratedRegex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$")]
  private static partial Regex Regex();
}

