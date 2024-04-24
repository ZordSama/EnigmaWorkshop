

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using enigmaworkshop.backend.Models;
using Microsoft.IdentityModel.Tokens;

public class JwtServices
{

    private IConfiguration _config;
    public JwtServices(IConfiguration config)
    {
        _config = config;
    }
    public string GenerateToken(NgDung user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        Claim[]? claims = null;
        // new[]{
        //     new Claim(JwtRegisteredClaimNames.Sub, user.TenNgDung),
        //     new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        // };
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(user.Id, null, claims, expires: DateTime.Now.AddMinutes(15), signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    public NgDung? ValidateToken(string token)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);
            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Subject;
            return new NgDung { Id = userId };
        }
        catch (Exception ex)
        {
            System.Console.WriteLine(ex.Message);
            return null; // or handle the exception as appropriate for your application
        }
    }
}