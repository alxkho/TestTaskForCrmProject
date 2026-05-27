using System.Linq.Expressions;
using LinqKit;
using TestTask.DataLayer.Extensions;
using TestTask.DataLayer.Models;

namespace TestTask.DataLayer.QueryFilters;

public class ContactFilter : IQueryFilter<Contact>
{
    public string? Name { get; set; }
    
    public string? MobilePhone { get; set; }
    
    public string? JobTitle { get; set; }
    
    public DateTimeOffset? BirthDateFrom { get; set; }
    
    public DateTimeOffset? BirthDateTo { get; set; }
    
    public Expression<Func<Contact, bool>> CompileFilter()
    {
        var expression = PredicateBuilder.New<Contact>(true);

        if (!string.IsNullOrEmpty(Name))
        {
            expression = expression.And(entity => entity.Name.ContainsIgnoreCase(Name));
        }
        
        if (!string.IsNullOrEmpty(MobilePhone))
        {
            expression = expression.And(entity => entity.MobilePhone.ContainsIgnoreCase(MobilePhone));

        }
        
        if (!string.IsNullOrEmpty(JobTitle))
        {
            expression = expression.And(entity => entity.JobTitle.ContainsIgnoreCase(JobTitle));
        }
        
        if (BirthDateFrom.HasValue)
        {
            expression = expression.And(entity => entity.BirthDate >= BirthDateFrom);
        }
        
        if (BirthDateTo.HasValue)
        {
            expression = expression.And(entity => entity.BirthDate <= BirthDateTo);
        }
        
        return expression;
    }
}