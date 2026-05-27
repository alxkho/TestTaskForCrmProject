using TestTask.DataLayer.Data;

namespace TestTask.DataLayer.Repositories.Contact;

public class ContactRepository(AppDbContext dbContext) : BaseRepository<Models.Contact>(dbContext), IContactRepository
{
    
}