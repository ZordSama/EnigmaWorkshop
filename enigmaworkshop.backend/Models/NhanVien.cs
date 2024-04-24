using System;
using System.Collections.Generic;

namespace enigmaworkshop.backend.Models;

public partial class NhanVien
{
    public string Id { get; set; } = null!;

    public string? HoTen { get; set; }

    public DateOnly? NgaySinh { get; set; }

    public string DiaChi { get; set; } = null!;

    public DateOnly? NgayVaoLam { get; set; }

    public DateOnly? NghiViec { get; set; }

    public string? NgDung { get; set; }

    public virtual NgDung? NgDungNavigation { get; set; }
}
