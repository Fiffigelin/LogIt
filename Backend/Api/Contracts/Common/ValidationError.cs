namespace Backend.Api.Contracts.Common;

public class ValidationError
{
  public ValidationError(string field, string message)
  {
    SetField(field);
    SetMessage(message);
  }
  public string Field { get; set; } = string.Empty;
  public string Message { get; set; } = string.Empty;

  public void SetField(string field)
  {
    if (string.IsNullOrWhiteSpace(field))
      throw new ArgumentException("Email cannot be empty.", nameof(field));
    Field = field.Trim();
  }
  public void SetMessage(string message)
  {
    if (string.IsNullOrWhiteSpace(message))
      throw new ArgumentException("Email cannot be empty.", nameof(message));
    Message = message.Trim();
  }
}