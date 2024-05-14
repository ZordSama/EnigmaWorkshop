using enigmaworkshop.backend.Authorization;
using enigmaworkshop.backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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

    [HttpGet("getAll")]
    [AllowAnonymous]
    public IActionResult GetProducts()
    {
        try
        {
            return Ok(_db.Products.ToList());
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { title = ex.Message, message = ex.StackTrace });
        }
    }

    [HttpGet("get/{id}")]
    [AllowAnonymous]
    public IActionResult GetProduct([FromQuery] string id)
    {
        try
        {
            return Ok(_db.Products.FirstOrDefault(p => p.Id == id));
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { title = ex.Message, message = ex.StackTrace });
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
            return BadRequest(new { title = ex.Message, message = ex.StackTrace });
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
            return BadRequest(new { title = ex.Message, message = ex.StackTrace });
        }
    }

    [HttpPost("create")]
    [Authorize]
    public IActionResult CreateProduct(ProductDTO dto)
    {
        User user = (User)HttpContext.Items["User"]!;
        if (user.Role > 2) return Unauthorized("Unauthorized to create product");
        try
        {
            Product product = new Product
            {
                Id = dto.Id,
                Name = dto.Name,
                Des = dto.Des,
                Price = dto.Price,
                Stock = dto.Stock,
                Images = JsonConvert.SerializeObject(dto.Images?.ToList()),
                Data = JsonConvert.SerializeObject(dto.Data),
                Category = dto.Category,
            };
            _db.Products.Add(product);
            _db.SaveChanges();
            return Ok("Product " + product.Id + " created successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(new { title = ex.Message, message = ex.StackTrace });
        }
    }

    [HttpDelete("delete/{id}")]
    [Authorize]
    public IActionResult DeleteProduct(string id)
    {
        User user = (User)HttpContext.Items["User"]!;
        if (user.Role > 1) return Unauthorized("Unauthorized to delete product");
        try
        {
            Product product = _db.Products.FirstOrDefault(p => p.Id == id)!;
            if (product == null) return NotFound("Product not found");
            _db.Products.Remove(product);
            _db.SaveChanges();
            return Ok("Product " + id + " deleted successfully");
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { title = ex.Message, message = ex.StackTrace });
        }
    }
    [HttpGet("isExist/{id}")]
    [Authorize]
    public IActionResult IsProductExist(string id)
    {
        User user = (User)HttpContext.Items["User"]!;
        if (user.Role > 2) return Unauthorized("Unauthorized to check product existence");
        try
        {
            Product product = _db.Products.FirstOrDefault(p => p.Id == id)!;
            if (product == null) return Ok(false);
            return Ok(true);
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { title = ex.Message, message = ex.StackTrace });
        }
    }
}
