using Mapster;
using MapsterMapper;

namespace TestTask.Extensions;

public static class MapsterExtensions
{
    public static WebApplicationBuilder AddMapster(this WebApplicationBuilder builder)
    {
        var config = TypeAdapterConfig.GlobalSettings;


        builder.Services
            .AddSingleton(config)
            .AddScoped<IMapper, ServiceMapper>();
        
        return builder;
    }
}