public class UserDTO
{
    public string Id { get; set; } = null!;

    public string? Username { get; set; } = null!;

    public string? Password { get; set; }

    public string? Avatar { get; set; }
    public int? Status { get; set; }

    public int? Role { get; set; }
}
