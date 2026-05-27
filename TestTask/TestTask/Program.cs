using Scalar.AspNetCore;
using TestTask.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder
    .ConfigureDataLayer();

builder.Services
    .AddOpenApi()
    .AddControllers();

var app = builder.Build();

app.MapOpenApi();
app.MapScalarApiReference();

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}/{id?}");

app.Run();