using System.Linq.Expressions;
using TestTask.DataLayer.Interfaces;
using TestTask.DataLayer.QueryFilters;

namespace TestTask.DataLayer.Repositories.Interfaces;

public interface IRepository<TEntity> where TEntity : class, IEntity
{
    public Task<TEntity?> GetByIdAsync(int id);
    
    public Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity,bool>> filter);

    public Task<Paged<TEntity>> GetPagedAsync(Expression<Func<TEntity,bool>> filter, int pageNumber, int pageSize);
    
    public TEntity Add(TEntity entity);

    public TEntity Update(TEntity entity);
    
    public Task Delete(int id);
}