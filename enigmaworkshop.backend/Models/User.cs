﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using NTJson = Newtonsoft.Json;

namespace enigmaworkshop.backend.Models;

public partial class User
{
    public string Id { get; set; } = null!;

    public string Username { get; set; } = null!;

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public string Password { get; set; } = null!;

    public string? Avatar { get; set; }

    public int? Status { get; set; }

    public int? Role { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Customer? Customer { get; set; }

    [JsonIgnore]
    [NTJson.JsonIgnore]
    public virtual Employee? Employee { get; set; }
}
