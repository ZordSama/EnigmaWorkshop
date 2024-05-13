using enigmaworkshop.backend.Authorization;
using enigmaworkshop.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace enigmaworkshop.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EnigmaWorkshopContext _db;

        public EmployeeController(EnigmaWorkshopContext db) => _db = db;

        [HttpGet("getAll")]
        [Authorize]
        public IActionResult GetEmployees()
        {
            User? user = HttpContext.Items["User"] as User;
            if (user != null && user.Role > 1)
                return Unauthorized(new { message = "Bạn không đủ quyền" });
            return Ok(_db.Employees.ToList());
        }
    }
}
