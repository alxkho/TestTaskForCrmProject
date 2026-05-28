using System.Linq.Expressions;
using TestTask.DataLayer.Interfaces;

namespace TestTask.DataLayer.QueryFilters;

public interface IQueryFilter<TEntity> where TEntity : IEntity
{
    public Expression<Func<TEntity, bool>> CompileFilter();
}