namespace Backend.Api.Contracts.Common;

public record ValidationError(string Field, string Message);