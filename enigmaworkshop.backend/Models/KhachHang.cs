using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class KhachHang
{
    public string Id { get; set; } = null!;

    public string HoTen { get; set; } = null!;

    public DateOnly? NgaySinh { get; set; }

    public string? DiaChi { get; set; }

    public int? Hang { get; set; }

    public double? TichDiem { get; set; }

    public string? NgDung { get; set; }

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();

    public virtual NgDung? NgDungNavigation { get; set; }
}
