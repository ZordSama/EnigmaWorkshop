using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class Product
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? Des { get; set; }

    public double? Price { get; set; }

    public int? Stock { get; set; }

    public string? Data { get; set; }
}
