using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TestTask.DataLayer.Data;
using TestTask.DataLayer.Repositories;
using TestTask.DataLayer.Repositories.Interfaces;

namespace TestTask.DataLayer.Extensions;

public static class ConfigurationExtensions
{
    public static IServiceCollection  AddRepositories(this IServiceCollection  services)
    {
        return services;
    }
    
    public static IServiceCollection  AddUnitOfWork(this IServiceCollection  services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        
        return services;
    }
    
    public static IServiceCollection  AddMyDbContext(this IServiceCollection  services, string connectionString)
    {

        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));

        return services;
    }
}