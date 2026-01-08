using System.Text.RegularExpressions;

namespace Backend.Domain.Policies;

public static partial class PhonePolicy
{
  public static bool IsValid(string phoneNumber)
      => !string.IsNullOrWhiteSpace(phoneNumber) && Regex().IsMatch(phoneNumber);

  [GeneratedRegex(@"^\+?[0-9\s\-\(\)]{5,15}$")]
  private static partial Regex Regex();
}

