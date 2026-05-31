using Microsoft.EntityFrameworkCore;
using TestTask.DataLayer.Models;

namespace TestTask.DataLayer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        Database.EnsureCreated(); 
    }

    public DbSet<Contact> Contacts { get; set; }
    
}