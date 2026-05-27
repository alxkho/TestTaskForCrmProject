using TestTask.DataLayer.Interfaces;
using TestTask.DataLayer.Repositories.Contact;

namespace TestTask.DataLayer.Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IContactRepository ContactRepository { get; }

    Task<int> SaveChangesAsync();
    
    IRepository<TEntity> GetRepository<TEntity>() where TEntity : class, IEntity;
}