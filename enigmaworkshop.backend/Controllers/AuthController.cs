using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace enigmaworkshop.backend.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataSevices _db;
        private readonly JwtServices _jwt;

        public AuthController(DataSevices db, JwtServices jwt)
        {
            _db = db; _jwt = jwt;
        }



        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login(DangNhapDTO dto)
        {
            var ngDung = _db.GetUserByUsername(dto.TenNgDung);
            if (ngDung == null || ngDung.MatKhau != dto.MatKhau) return Unauthorized("Invalid username or password.");
            return Ok(new { token = _jwt.GenerateToken(ngDung), User });
        }
    }
}