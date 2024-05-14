public class EmployeeDTO
{
    public string Id { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int Gender { get; set; }

    public DateTime DoB { get; set; }

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Address { get; set; } = null!;

    public DateTime? OptIn { get; set; }

    public DateTime? OptOut { get; set; }

    // public string? User { get; set; }
}