using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class GioHang
{
    public string KhachHang { get; set; } = null!;

    public string SanPham { get; set; } = null!;

    public int? SoLuong { get; set; }

    public virtual KhachHang KhachHangNavigation { get; set; } = null!;

    public virtual SanPham SanPhamNavigation { get; set; } = null!;
}
