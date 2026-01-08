using Backend.Application.Auth;
using Backend.Application.Swagger;
using Backend.Domain.Entities;
using Backend.Domain.Validation;
using Backend.Infrastructure.Persistence.Data;
using Backend.Infrastructure.Persistence.Repositories.UserRepository;
using Backend.Infrastructure.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Startup;

public static class DependenciesConfig
{
    public static void AddDependencies(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<LogItDbContext>(options =>
            options.UseSqlite(DatabaseConfig.ConnectionString));

        builder.Services.AddScoped<IUserRepository, UserRepository>();

        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

        builder.Services.AddScoped<LoginValidator>();
        builder.Services.AddScoped<RegisterValidator>();

        builder.Services.AddScoped<LoginUseCase>();
        builder.Services.AddScoped<RegisterUseCase>();

        builder.Services.AddScoped<UserService>();
    }
}
