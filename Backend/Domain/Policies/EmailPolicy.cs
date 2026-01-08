using System.Text.RegularExpressions;

namespace Backend.Domain.Policies;

public static partial class EmailPolicy
{
  public static bool IsValid(string email)
      => !string.IsNullOrWhiteSpace(email) && Regex().IsMatch(email);

  [GeneratedRegex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$")]
  private static partial Regex Regex();
}
