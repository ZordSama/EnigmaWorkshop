using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using NTJson = Newtonsoft.Json;

namespace enigmaworkshop.backend.Models;

public partial class Order
{
    public string Id { get; set; } = null!;

    public string Customer { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int? Status { get; set; }

    public double? AdditionalFee { get; set; }

    public double? Total { get; set; }

    public string? Data { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Customer CustomerNavigation { get; set; } = null!;
}
