using enigmaworkshop.backend.Authorization;
using enigmaworkshop.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace enigmaworkshop.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly EnigmaWorkshopContext _db;

        public UserController(EnigmaWorkshopContext db) => _db = db;

        [HttpGet("getAll")]
        [Authorize]
        public IActionResult GetUsers()
        {
            User? user = HttpContext.Items["User"] as User;
            if (user != null && user.Role > 0)
                return Unauthorized("You are not allowed to access this resource.");
            return Ok(_db.Users.ToList());
        }

        [HttpGet("get/{id}")]
        [Authorize]
        public IActionResult GetUser(string id)
        {
            User? user = HttpContext.Items["User"] as User;
            if (user != null && (user.Role > 0 || user.Id != id))
                return Unauthorized("You are not allowed to access this resource.");
            return Ok(_db.Users.Find(id));
        }

        [HttpPost("create")]
        public IActionResult createUser(CreateUserDTO dto)
        {
            
            return Ok();
        }
        [HttpPut("update")]
        [Authorize]
        public IActionResult updateUser(UserDTO dto)
        {
            User? user = HttpContext.Items["User"] as User;
            if (user != null && (user.Role > 0 || user.Id != dto.Id))
                return Unauthorized("You are not allowed to access this resource.");
            try
            {
                User? dbUser = _db.Users.Find(dto.Id);
                if (dbUser == null)
                    return NotFound("User not found.");
                string? password = null;
                if (dto.Password != null && dto.Password.Length > 8)
                    password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                dbUser.Password = password ?? dbUser.Password;
                dbUser.Avatar = dto.Avatar ?? dbUser.Avatar;
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Problem(title: ex.Message, detail: ex.StackTrace);
            }
            return Ok("User updated successfully.");
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            User? user = HttpContext.Items["User"] as User;
            if (user != null && (user.Role > 0 || user.Id != id))
                return Unauthorized("You are not allowed to access this resource.");
            try
            {
                User? dbUser = _db.Users.Find(id);
                if (dbUser == null)
                    return NotFound("User not found.");
                _db.Users.Remove(dbUser);
                _db.SaveChanges();
            }
            catch (System.Exception ex)
            {
                return Problem(title: ex.Message, detail: ex.StackTrace);
            }
            return Ok("User deleted successfully.");
        }
    }
}
