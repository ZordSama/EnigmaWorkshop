using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class PhanLoai
{
    public string SanPham { get; set; } = null!;

    public string LoaiSanPham { get; set; } = null!;

    public virtual LoaiSanPham LoaiSanPhamNavigation { get; set; } = null!;

    public virtual SanPham SanPhamNavigation { get; set; } = null!;
}
