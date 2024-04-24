using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class DatHang
{
    public string DonHang { get; set; } = null!;

    public string SanPham { get; set; } = null!;

    public virtual DonHang DonHangNavigation { get; set; } = null!;

    public virtual SanPham SanPhamNavigation { get; set; } = null!;
}
