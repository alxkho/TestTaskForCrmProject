using Microsoft.EntityFrameworkCore;
using TestTask.DataLayer.Models;

namespace TestTask.DataLayer.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Contact> Contacts { get; set; }
}