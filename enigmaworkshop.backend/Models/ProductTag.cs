using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using NTJson = Newtonsoft.Json;

namespace enigmaworkshop.backend.Models;

public partial class ProductTag
{
    public string Product { get; set; } = null!;

    public string Tag { get; set; } = null!;

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Product ProductNavigation { get; set; } = null!;

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Tag TagNavigation { get; set; } = null!;
}
