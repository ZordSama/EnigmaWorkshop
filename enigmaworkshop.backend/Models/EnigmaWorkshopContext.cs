using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace enigmaworkshop.backend.Models;

public partial class EnigmaWorkshopContext : DbContext
{
    public EnigmaWorkshopContext(DbContextOptions<EnigmaWorkshopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<DatHang> DatHangs { get; set; }

    public virtual DbSet<DonHang> DonHangs { get; set; }

    public virtual DbSet<GioHang> GioHangs { get; set; }

    public virtual DbSet<KhachHang> KhachHangs { get; set; }

    public virtual DbSet<LoaiSanPham> LoaiSanPhams { get; set; }

    public virtual DbSet<NgDung> NgDungs { get; set; }

    public virtual DbSet<NhanVien> NhanViens { get; set; }

    public virtual DbSet<PhanLoai> PhanLoais { get; set; }

    public virtual DbSet<SanPham> SanPhams { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DatHang>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DatHang");

            entity.Property(e => e.DonHang).HasMaxLength(255);
            entity.Property(e => e.SanPham).HasMaxLength(255);

            entity.HasOne(d => d.DonHangNavigation).WithMany()
                .HasForeignKey(d => d.DonHang)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DatHang__DonHang__75A278F5");

            entity.HasOne(d => d.SanPhamNavigation).WithMany()
                .HasForeignKey(d => d.SanPham)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DatHang__SanPham__76969D2E");
        });

        modelBuilder.Entity<DonHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DonHang__3214EC0773DF7CCD");

            entity.ToTable("DonHang");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.ChiTietKhac).HasColumnType("text");
            entity.Property(e => e.DiaChi).HasMaxLength(255);
            entity.Property(e => e.KhachHang).HasMaxLength(255);

            entity.HasOne(d => d.KhachHangNavigation).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.KhachHang)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DonHang__KhachHa__74AE54BC");
        });

        modelBuilder.Entity<GioHang>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GioHang");

            entity.Property(e => e.KhachHang).HasMaxLength(255);
            entity.Property(e => e.SanPham).HasMaxLength(255);

            entity.HasOne(d => d.KhachHangNavigation).WithMany()
                .HasForeignKey(d => d.KhachHang)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GioHang__KhachHa__6FE99F9F");

            entity.HasOne(d => d.SanPhamNavigation).WithMany()
                .HasForeignKey(d => d.SanPham)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GioHang__SanPham__70DDC3D8");
        });

        modelBuilder.Entity<KhachHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__KhachHan__3214EC07C7EACA56");

            entity.ToTable("KhachHang");

            entity.HasIndex(e => e.NgDung, "UQ__KhachHan__5018B34E355C0487").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.DiaChi).HasColumnType("text");
            entity.Property(e => e.HoTen).HasMaxLength(255);
            entity.Property(e => e.NgDung).HasMaxLength(255);

            entity.HasOne(d => d.NgDungNavigation).WithOne(p => p.KhachHang)
                .HasForeignKey<KhachHang>(d => d.NgDung)
                .HasConstraintName("FK__KhachHang__NgDun__6EF57B66");
        });

        modelBuilder.Entity<LoaiSanPham>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LoaiSanP__3214EC076035E181");

            entity.ToTable("LoaiSanPham");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.TenLoai).HasMaxLength(255);
            entity.Property(e => e.ThuocLoai).HasMaxLength(255);

            entity.HasOne(d => d.ThuocLoaiNavigation).WithMany(p => p.InverseThuocLoaiNavigation)
                .HasForeignKey(d => d.ThuocLoai)
                .HasConstraintName("FK__LoaiSanPh__Thuoc__73BA3083");
        });

        modelBuilder.Entity<NgDung>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NgDung__3214EC07BCA0BB9A");

            entity.ToTable("NgDung");

            entity.HasIndex(e => e.TenNgDung, "UQ__NgDung__4992FC4563712CFE").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.MatKhau).HasMaxLength(255);
            entity.Property(e => e.Role)
                .HasDefaultValue(3)
                .HasColumnName("role");
            entity.Property(e => e.TenNgDung).HasMaxLength(255);
        });

        modelBuilder.Entity<NhanVien>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NhanVien__3214EC07ED6FA91C");

            entity.ToTable("NhanVien");

            entity.HasIndex(e => e.NgDung, "UQ__NhanVien__5018B34E14C34D93").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.DiaChi).HasColumnType("text");
            entity.Property(e => e.HoTen).HasMaxLength(255);
            entity.Property(e => e.NgDung).HasMaxLength(255);

            entity.HasOne(d => d.NgDungNavigation).WithOne(p => p.NhanVien)
                .HasForeignKey<NhanVien>(d => d.NgDung)
                .HasConstraintName("FK__NhanVien__NgDung__6E01572D");
        });

        modelBuilder.Entity<PhanLoai>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PhanLoai");

            entity.Property(e => e.LoaiSanPham).HasMaxLength(255);
            entity.Property(e => e.SanPham).HasMaxLength(255);

            entity.HasOne(d => d.LoaiSanPhamNavigation).WithMany()
                .HasForeignKey(d => d.LoaiSanPham)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PhanLoai__LoaiSa__72C60C4A");

            entity.HasOne(d => d.SanPhamNavigation).WithMany()
                .HasForeignKey(d => d.SanPham)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PhanLoai__SanPha__71D1E811");
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SanPham__3214EC075CA7BBEE");

            entity.ToTable("SanPham");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.DuLieuKhac).HasColumnType("text");
            entity.Property(e => e.MoTa).HasMaxLength(1);
            entity.Property(e => e.TenSanPham).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
