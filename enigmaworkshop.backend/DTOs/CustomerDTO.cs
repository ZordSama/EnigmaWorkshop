using enigmaworkshop.backend.Models;

public class CustomerDTO
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int Gender { get; set; }
    public DateTime? DoB { get; set; }
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;
    public AddressDTO? Address { get; set; } = null!;
    public int? Rank { get; set; }
    public double? Point { get; set; }
    // public string? UserId { get; set; }
}
