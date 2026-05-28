namespace TestTask.Dtos;

public class ContactFilterDto
{
    public string? Name { get; set; }
    
    public string? MobilePhone { get; set; }
    
    public string? JobTitle { get; set; }
    
    public DateOnly? BirthDateFrom { get; set; }
    
    public DateOnly? BirthDateTo { get; set; }
}