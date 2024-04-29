using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using NTJson = Newtonsoft.Json;

namespace enigmaworkshop.backend.Models;

public partial class ProductCategory
{
    public string Categories { get; set; } = null!;

    public string Products { get; set; } = null!;

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Category CategoriesNavigation { get; set; } = null!;

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Product ProductsNavigation { get; set; } = null!;
}
