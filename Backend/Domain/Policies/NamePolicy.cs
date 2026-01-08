using System.Text.RegularExpressions;

namespace Backend.Domain.Policies;

public static partial class NamePolicy
{
  public static bool IsValidFullName(string name)
      => !string.IsNullOrWhiteSpace(name) && Regex().IsMatch(name);

  [GeneratedRegex(@"^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,80}$")]
  private static partial Regex Regex();
}
