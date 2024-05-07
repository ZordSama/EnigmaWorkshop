using enigmaworkshop.backend.Authorization;
using enigmaworkshop.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace enigmaworkshop.backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{

    private readonly EnigmaWorkshopContext _db;

    public ProductController(EnigmaWorkshopContext db)
    {
        _db = db;
    }

    [HttpGet("getProducts")]
    [AllowAnonymous]
    public IActionResult GetProducts()
    {
        try
        {
            return Ok(_db.Products.ToList());
        }
        catch (System.Exception ex)
        {
            return Problem(title: ex.Message, detail: ex.StackTrace);
        }
    }

    [HttpGet("getProduct/{id}")]
    [AllowAnonymous]
    public IActionResult GetProduct([FromQuery] string id)
    {
        try
        {
            return Ok(_db.Products.FirstOrDefault(p => p.Id == id));
        }
        catch (System.Exception ex)
        {
            return Problem(title: ex.Message, detail: ex.StackTrace);
        }
    }

    [HttpGet("getCategories")]
    [AllowAnonymous]
    public IActionResult GetCategories()
    {
        try
        {
            return Ok(_db.Categories.ToList());
        }
        catch (System.Exception ex)
        {
            return Problem(title: ex.Message, detail: ex.StackTrace);
        }
    }
    [HttpGet("getTags")]
    [AllowAnonymous]
    public IActionResult GetTags()
    {
        try
        {
            return Ok(_db.Tags.ToList());
        }
        catch (System.Exception ex)
        {
            return Problem(title: ex.Message, detail: ex.StackTrace);
        }
    }

}