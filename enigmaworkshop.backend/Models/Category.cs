using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class Category
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? SubOf { get; set; }
}
