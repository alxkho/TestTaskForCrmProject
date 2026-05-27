using Microsoft.EntityFrameworkCore;

namespace TestTask.DataLayer.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
}