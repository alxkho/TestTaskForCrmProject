using Microsoft.Extensions.DependencyInjection;
using TestTask.DataLayer.Data;
using TestTask.DataLayer.Interfaces;
using TestTask.DataLayer.Repositories.Interfaces;

namespace TestTask.DataLayer.Repositories;

public class UnitOfWork(AppDbContext dbContext, IServiceProvider serviceProvider) : IUnitOfWork
{
    public async Task<int> SaveChangesAsync()
    {
        await using var transaction = await dbContext.Database.BeginTransactionAsync();
        var result = 0;
        
        try
        {
            result = await dbContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
        
        return result;
    }
    
    public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class, IEntity
    {
        return serviceProvider.GetRequiredService<IRepository<TEntity>>();
    }

    public void Dispose() => dbContext.Dispose();
}