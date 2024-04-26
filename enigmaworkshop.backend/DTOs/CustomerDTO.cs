using enigmaworkshop.backend.Models;

public class CustomerDTO
{
    public string FullName { get; set; } = null!;

    public DateOnly? DoB { get; set; }

    public string? Address { get; set; }

}