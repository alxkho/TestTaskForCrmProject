namespace TestTask.Dtos;

public class ContactDto
{
    public int Id { get; set; }

    public string Name { get; set; }
    
    public string MobilePhone { get; set; }
    
    public string JobTitle { get; set; }
    
    public DateTimeOffset BirthDate { get; set; }
}