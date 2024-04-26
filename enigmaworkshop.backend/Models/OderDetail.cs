using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class OderDetail
{
    public string Oder { get; set; } = null!;

    public string Product { get; set; } = null!;

    public virtual Order OderNavigation { get; set; } = null!;

    public virtual Product ProductNavigation { get; set; } = null!;
}
