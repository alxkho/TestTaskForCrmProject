using TestTask.DataLayer.Extensions;
    
namespace TestTask.Extensions;

public static class InfrastructureExtensions
{
    public static WebApplicationBuilder ConfigureDataLayer(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                               throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        builder.Services
            .AddMyDbContext(connectionString)
            .AddRepositories()
            .AddUnitOfWork();
        
        return builder;
    }
}