using System.Linq.Expressions;
using LinqKit;

namespace TestTask.DataLayer.Extensions;

public static class ExpressionHelperExtensions
{
    public static Expression<Func<T, bool>> AndContainsIgnoreCase<T>(
        this ExpressionStarter<T> expression,
        Expression<Func<T, string>> propertySelector,
        string searchTerm)
    {
        var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes)!;
        var containsMethod = typeof(string).GetMethod("Contains", [typeof(string)])!;

        var propertyBody = propertySelector.Body;
        var entityToLower = Expression.Call(propertyBody, toLowerMethod);
        var constant = Expression.Constant(searchTerm.ToLower(), typeof(string));
        var containsCall = Expression.Call(entityToLower, containsMethod, constant);

        var conditionExpression = Expression.Lambda<Func<T, bool>>(containsCall, propertySelector.Parameters);

        return expression.And(conditionExpression);
    }
}