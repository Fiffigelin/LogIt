namespace Backend.Api.Contracts.Common.Wrapper;

public class ApiResponse<T>
{
  public bool Success { get; set; }
  public string? Message { get; set; }
  public ValidationError? Error { get; set; }
  public T? Data { get; set; }
}
