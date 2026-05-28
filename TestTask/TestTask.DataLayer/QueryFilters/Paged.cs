using TestTask.DataLayer.Interfaces;

namespace TestTask.DataLayer.QueryFilters;

public class Paged<TEntity> where TEntity : IEntity
{
    public List<TEntity> Items { get; set; } = new();
    
    public int PageNumber { get; set; }

    public int TotalItemsCount { get; set; }
}