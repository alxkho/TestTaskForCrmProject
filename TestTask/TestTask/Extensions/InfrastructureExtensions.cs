using TestTask.DataLayer.Extensions;
    
namespace TestTask.Extensions;

public static class InfrastructureExtensions
{
    extension(WebApplicationBuilder builder)
    {
        public WebApplicationBuilder ConfigureDataLayer()
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                                   throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            builder.Services
                .AddMyDbContext(connectionString)
                .AddRepositories()
                .AddUnitOfWork();
        
            return builder;
        }

        public WebApplicationBuilder AddCors()
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
        
            return builder;
        }
    }
}