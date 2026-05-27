namespace TestTask.Dtos;

public class ContactFilterDto
{
    public string? Name { get; set; }
    
    public string? MobilePhone { get; set; }
    
    public string? JobTitle { get; set; }
    
    public DateTimeOffset? BirthDateFrom { get; set; }
    
    public DateTimeOffset? BirthDateTo { get; set; }
}