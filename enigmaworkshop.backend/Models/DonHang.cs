using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class DonHang
{
    public string Id { get; set; } = null!;

    public string KhachHang { get; set; } = null!;

    public string DiaChi { get; set; } = null!;

    public int? TrangThai { get; set; }

    public double? ChiPhiKhac { get; set; }

    public double? ThanhTien { get; set; }

    public string? ChiTietKhac { get; set; }

    public virtual KhachHang KhachHangNavigation { get; set; } = null!;
}
