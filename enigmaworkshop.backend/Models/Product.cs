﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using NTJson = Newtonsoft.Json;

namespace enigmaworkshop.backend.Models;

public partial class Product
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? Des { get; set; }

    public double? Price { get; set; }

    public int? Stock { get; set; }

    public string? Data { get; set; }

    public string? Images { get; set; }

    public string? Category { get; set; }
    
    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Category? CategoryNavigation { get; set; }
}
