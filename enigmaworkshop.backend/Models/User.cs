using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace enigmaworkshop.backend.Models;

public partial class User
{
    public string Id { get; set; } = null!;

    public string Username { get; set; } = null!;

    [JsonIgnore]
    public string Password { get; set; } = null!;

    public int? Status { get; set; }

    public int? Role { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Employee? Employee { get; set; }
}
