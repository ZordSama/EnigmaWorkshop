using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class LoaiSanPham
{
    public string Id { get; set; } = null!;

    public string? TenLoai { get; set; }

    public string? ThuocLoai { get; set; }

    public virtual ICollection<LoaiSanPham> InverseThuocLoaiNavigation { get; set; } = new List<LoaiSanPham>();

    public virtual LoaiSanPham? ThuocLoaiNavigation { get; set; }
}
