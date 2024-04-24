using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class NgDung
{
    public string Id { get; set; } = null!;

    public string TenNgDung { get; set; } = null!;

    public string MatKhau { get; set; } = null!;

    public int? TrangThai { get; set; }

    public int? Role { get; set; }

    public virtual KhachHang? KhachHang { get; set; }

    public virtual NhanVien? NhanVien { get; set; }
}
