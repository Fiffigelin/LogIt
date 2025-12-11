using Backend.Data;
using Backend.Startup;
using LogIt.Backend.Extensions;
var builder = WebApplication.CreateBuilder(args);

builder.AddDependencies();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddSwaggerServices();
builder.Services.AddCorsServices();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
  var context = scope.ServiceProvider.GetRequiredService<LogItDbContext>();
  context.Database.EnsureCreated();
  await DbSeeder.SeedAsync(context);
}

app.ApplyCorsConfig();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseSwaggerUI();
app.MapControllers();

app.Run();