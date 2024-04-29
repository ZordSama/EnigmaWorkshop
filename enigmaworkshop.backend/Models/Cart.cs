using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using NTJson = Newtonsoft.Json;

namespace enigmaworkshop.backend.Models;

public partial class Cart
{
    public string Customer { get; set; } = null!;

    public string Product { get; set; } = null!;

    public int? Quantity { get; set; }

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Customer CustomerNavigation { get; set; } = null!;

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Product ProductNavigation { get; set; } = null!;
}
