using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class SanPham
{
    public string Id { get; set; } = null!;

    public string? TenSanPham { get; set; }

    public string? MoTa { get; set; }

    public double? GiaBan { get; set; }

    public int? TonKho { get; set; }

    public string? DuLieuKhac { get; set; }
}
