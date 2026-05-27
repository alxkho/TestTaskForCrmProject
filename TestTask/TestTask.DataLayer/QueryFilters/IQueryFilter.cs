using System.Linq.Expressions;
using TestTask.DataLayer.Interfaces;

namespace TestTask.DataLayer.QueryFilters;

public interface IQueryFilter<T> where T : IEntity
{
    public Expression<Func<T, bool>> CompileFilter();
}