using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TestTask.DataLayer.Data;
using TestTask.DataLayer.Extensions;
using TestTask.DataLayer.Interfaces;
using TestTask.DataLayer.QueryFilters;
using TestTask.DataLayer.Repositories.Interfaces;

namespace TestTask.DataLayer.Repositories;

public class BaseRepository<TEntity>(AppDbContext dbContext) : IRepository<TEntity> where TEntity : class, IEntity
{
    private readonly DbSet<TEntity> _table = dbContext.Set<TEntity>();

    public IQueryable<TEntity> GetQuery()
    {
        return _table.AsQueryable();
    }

    public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter)
    {
        return await GetQuery().Where(filter).ToListAsync();
    }
    
    public async Task<Paged<TEntity>> GetPagedAsync(Expression<Func<TEntity,bool>> filter, int pageNumber, int pageSize)
    {
        return await GetQuery().Where(filter).OrderBy(r => r.Id).ToPagedAsync(pageNumber, pageSize);
    }

    public async Task<TEntity?> GetByIdAsync(int id)
    {
        return await _table.Where(entity => entity.Id == id).FirstOrDefaultAsync();
    }

    public TEntity Add(TEntity entity)
    {
        _table.Add(entity);
        
        return entity;
    }

    public TEntity Update(TEntity entity)
    {
        _table.Update(entity);
        
        return entity;
    }

    public async Task Delete(int id)
    {
        var  entity = await GetByIdAsync(id);

        if (entity == null)
        {
            throw new KeyNotFoundException();
        }
        
        _table.Remove(entity);
    }
}