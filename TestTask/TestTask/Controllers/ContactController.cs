using MapsterMapper;
using TestTask.DataLayer.Models;
using TestTask.DataLayer.QueryFilters;
using TestTask.DataLayer.Repositories.Interfaces;
using TestTask.Dtos;

namespace TestTask.Controllers;

public class ContactController(IUnitOfWork unitOfWork, IMapper mapper)
    : BaseController<Contact, ContactDto, ContactFilter, ContactFilterDto>(unitOfWork, mapper)
{
    
}