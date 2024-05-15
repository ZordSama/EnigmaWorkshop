public class ProductDTO
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? Des { get; set; }

    public double? Price { get; set; }

    public int? Stock { get; set; }

    public Object? Data { get; set; }

    public string[]? Images { get; set; }

    public string? Category { get; set; }
}