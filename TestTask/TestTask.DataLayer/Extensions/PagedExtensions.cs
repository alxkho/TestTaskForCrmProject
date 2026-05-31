using Microsoft.EntityFrameworkCore;
using TestTask.DataLayer.Interfaces;
using TestTask.DataLayer.QueryFilters;

namespace TestTask.DataLayer.Extensions;

public static class PagedExtensions
{
    public static async Task<Paged<TEntity>> ToPagedAsync<TEntity>(
        this IQueryable<TEntity> query, int pageNumber = 1, int pageSize = 10) 
        where TEntity : IEntity
    {
        pageSize = Math.Max(1, pageSize);

        var totalItemsCount = await query.CountAsync();
        
        pageNumber = totalItemsCount > 0 
            ? Math.Clamp(pageNumber, 1, (totalItemsCount + pageSize - 1) / pageSize) 
            : 1;

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new Paged<TEntity>()
        {
            Items = items,
            PageNumber = pageNumber,
            TotalItemsCount = totalItemsCount
        };
    }
}