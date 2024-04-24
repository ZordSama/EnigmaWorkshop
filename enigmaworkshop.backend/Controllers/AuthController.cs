using enigmaworkshop.backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace enigmaworkshop.backend.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly EnigmaWorkshopContext _db;
        private readonly JwtServices _jwt;

        public AuthController(EnigmaWorkshopContext db, JwtServices jwt)
        {
            _db = db; _jwt = jwt;
        }



        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login(LoginDTO dto)
        {
            var user = _db.Users.FirstOrDefault(u => u.Username == dto.Username);
            if (user == null || user.Password != dto.Password) return Unauthorized("Invalid username or password.");
            return Ok(new { token = _jwt.GenerateToken(user), User });
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register(RegisterDTO dto)
        {
            if (_db.Users.FirstOrDefault(u => u.Username == dto.Username) != null) return Conflict("Username already exists.");
            try
            {
                _db.Users.Add(new User {Id= Guid.NewGuid().ToString(), Username = dto.Username, Password = dto.Password }); _db.SaveChanges();
                return Ok("User registered successfully.");
            }
            catch (Exception ex) { return Problem(title: ex.Message, detail: ex.StackTrace); }
        }
        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout() { return Ok("User logged out successfully."); }
        [HttpGet("me")]
        [Authorize]
        public IActionResult Me() { return Ok(User); }
        // [HttpGet("refresh")]
        // [Authorize]
        // public IActionResult Refresh() { return Ok(new { token = _jwt.GenerateToken(User), User });
        // }
    }
}