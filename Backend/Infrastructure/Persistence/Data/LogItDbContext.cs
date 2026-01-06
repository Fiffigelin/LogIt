using Backend.Domain.Entities;
using Backend.Startup;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Backend.Infrastructure.Persistence.Data;

public class LogItDbContext(DbContextOptions<LogItDbContext> options) : DbContext(options)
{
  public DbSet<User> Users { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<User>()
        .HasIndex(u => u.Email)
        .IsUnique();

    modelBuilder.Entity<User>()
        .HasIndex(u => u.Username)
        .IsUnique();
  }
}

public class LogItDbContextFactory : IDesignTimeDbContextFactory<LogItDbContext>
{
  public LogItDbContext CreateDbContext(string[] args)
  {
    var optionsBuilder = new DbContextOptionsBuilder<LogItDbContext>();
    optionsBuilder.UseSqlite(DatabaseConfig.ConnectionString);

    return new LogItDbContext(optionsBuilder.Options);
  }
}
