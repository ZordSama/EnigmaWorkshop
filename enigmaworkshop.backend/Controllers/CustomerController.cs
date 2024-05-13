using enigmaworkshop.backend.Authorization;
using enigmaworkshop.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace enigmaworkshop.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly EnigmaWorkshopContext _db;

        public CustomerController(EnigmaWorkshopContext db)
        {
            _db = db;
        }

        [HttpGet("getAll")]
        [Authorize]
        public IActionResult GetCustomers()
        {
            User user = (User)HttpContext.Items["User"]!;
            if (user.Role > 2)
                return Unauthorized("You are not allowed to access this resource.");
            return Ok(_db.Customers.ToList());
        }

        
    }
}
