using TestTask.DataLayer.Interfaces;

namespace TestTask.DataLayer.Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    Task<int> SaveChangesAsync();
    
    IRepository<TEntity> GetRepository<TEntity>() where TEntity : class, IEntity;
}