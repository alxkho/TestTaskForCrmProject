using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using TestTask.DataLayer.Interfaces;
using TestTask.DataLayer.QueryFilters;
using TestTask.DataLayer.Repositories.Interfaces;

namespace TestTask.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController<TEntity, TEntityDto, TQueryFilter, TFilterDto>(
    IUnitOfWork unitOfWork, IMapper mapper) 
    : ControllerBase 
    where TEntity : class, IEntity
    where TEntityDto : class
    where TQueryFilter : class, IQueryFilter<TEntity>
    where TFilterDto : class
{
    private readonly IRepository<TEntity> _repository = unitOfWork.GetRepository<TEntity>();

    [HttpGet("GetById")]
    public async Task<OkObjectResult> GetById(int id)
    {
        return Ok(await _repository.GetByIdAsync(id));    
    }
    
    [HttpGet("GetAll")]
    public async Task<OkObjectResult> GetAll([FromQuery] TFilterDto queryFilterDto)
    {
        var queryFilter =  mapper.Map<TFilterDto, TQueryFilter>(queryFilterDto);
        
        return Ok(await _repository.GetAllAsync(queryFilter.CompileFilter()));
    }
    
    [HttpPost("Create")]
    public async Task<OkResult> Create(TEntityDto dto)
    {
        var entity = mapper.Map<TEntityDto, TEntity>(dto);
        
        _repository.Add(entity);
        await unitOfWork.SaveChangesAsync();
        
        return Ok();    
    }
    
    [HttpPut("Update")]
    public async Task<OkResult> Update(TEntityDto dto)
    {
        var entity = mapper.Map<TEntityDto, TEntity>(dto);
        
        _repository.Update(entity);
        await unitOfWork.SaveChangesAsync();
        
        return Ok();
    }
    
    [HttpDelete("Delete")]
    public async Task<OkResult> Delete(int id)
    {
        await _repository.Delete(id);
        await unitOfWork.SaveChangesAsync();

        return Ok();    
    }
}