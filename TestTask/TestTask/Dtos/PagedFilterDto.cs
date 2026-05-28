namespace TestTask.Dtos;

public class PagedFilterDto<TFilterDto> where TFilterDto : class, new()
{
    public int PageNumber { get; set; }
    
    public int PageSize { get; set; }

    public TFilterDto Filter { get; set; } = new();
}