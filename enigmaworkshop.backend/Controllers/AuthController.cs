using enigmaworkshop.backend.Authorization;
using enigmaworkshop.backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace enigmaworkshop.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly EnigmaWorkshopContext _db;
        private readonly IJwtServices _jwt;

        public AuthController(EnigmaWorkshopContext db, IJwtServices jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login(LoginDTO dto)
        {
            var user = _db.Users.FirstOrDefault(u => u.Username == dto.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                return Unauthorized("Tên đăng nhập hoặc mật khẩu không đúng.");
            var customer = _db.Customers.FirstOrDefault(c => c.User == user.Id);
            var employee = _db.Employees.FirstOrDefault(e => e.User == user.Id);
            return Ok(
                new
                {
                    token = _jwt.GenerateToken(user),
                    user = JsonConvert.SerializeObject(user),
                    customer = JsonConvert.SerializeObject(customer),
                    employee = JsonConvert.SerializeObject(employee)
                }
            );
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register(RegisterDTO dto)
        {
            if (_db.Users.FirstOrDefault(u => u.Username == dto.user.Username) != null)
                return Conflict("Username already exists.");
            try
            {
                User user = new User
                {
                    Id = Guid.NewGuid().ToString(),
                    Username = dto.user.Username,
                    Password = BCrypt.Net.BCrypt.HashPassword(dto.user.Password)
                };
                _db.Users.Add(user);
                Customer customer = new Customer
                {
                    Id = Guid.NewGuid().ToString(),
                    User = user.Id,
                    FirstName = dto.customer.FirstName,
                    LastName = dto.customer.LastName,
                    Address = JsonConvert.SerializeObject(dto.customer.Address),
                    DoB = DateOnly.FromDateTime(dto.customer.DoB),
                    Email = dto.customer.Email,
                    Phone = dto.customer.Phone,
                    Gender = dto.customer.Gender
                };
                _db.Customers.Add(customer);
                _db.SaveChanges();
                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                return Problem(title: ex.Message, detail: ex.StackTrace);
            }
        }

        [HttpGet("check-username/{username}")]
        [AllowAnonymous]
        public IActionResult CheckExistUsername(string username)
        {
            return Ok(_db.Users.FirstOrDefault(u => u.Username == username) != null);
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            return Ok("User logged out successfully.");
        }

        [HttpGet("me")]
        [Authorize]
        public IActionResult Me()
        {
            return Ok(new { user = HttpContext.Items["User"] });
        }
        // [HttpGet("refresh")]
        // [Authorize]
        // public IActionResult Refresh() { return Ok(new { token = _jwt.GenerateToken(User), User });
        // }
    }
}
