using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace enigmaworkshop.backend.Models;

public partial class EnigmaWorkshopContext : DbContext
{
    public EnigmaWorkshopContext()
    {
    }

    public EnigmaWorkshopContext(DbContextOptions<EnigmaWorkshopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<OderDetail> OderDetails { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCategory> ProductCategories { get; set; }

    public virtual DbSet<User> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Cart");

            entity.Property(e => e.Customer).HasMaxLength(255);
            entity.Property(e => e.Products).HasMaxLength(255);

            entity.HasOne(d => d.CustomerNavigation).WithMany()
                .HasForeignKey(d => d.Customer)
                .HasConstraintName("FK__Cart__Customer__2D7CBDC4");

            entity.HasOne(d => d.ProductsNavigation).WithMany()
                .HasForeignKey(d => d.Products)
                .HasConstraintName("FK__Cart__Products__2E70E1FD");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC07B173B244");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.SubOf).HasMaxLength(255);

            entity.HasOne(d => d.SubOfNavigation).WithMany(p => p.InverseSubOfNavigation)
                .HasForeignKey(d => d.SubOf)
                .HasConstraintName("FK__Categorie__SubOf__314D4EA8");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC0785DE1C69");

            entity.HasIndex(e => e.User, "UQ__Customer__BD20C6F1CA2DA761").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Address).HasColumnType("text");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(255);
            entity.Property(e => e.User).HasMaxLength(255);

            entity.HasOne(d => d.UserNavigation).WithOne(p => p.Customer)
                .HasForeignKey<Customer>(d => d.User)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Customers__User__2C88998B");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07D16E629C");

            entity.ToTable("Employee");

            entity.HasIndex(e => e.User, "UQ__Employee__BD20C6F13F64FEB8").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Address).HasColumnType("text");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(255);
            entity.Property(e => e.User).HasMaxLength(255);

            entity.HasOne(d => d.UserNavigation).WithOne(p => p.Employee)
                .HasForeignKey<Employee>(d => d.User)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Employee__User__2B947552");
        });

        modelBuilder.Entity<OderDetail>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Oder).HasMaxLength(255);
            entity.Property(e => e.Product).HasMaxLength(255);

            entity.HasOne(d => d.OderNavigation).WithMany()
                .HasForeignKey(d => d.Oder)
                .HasConstraintName("FK__OderDetail__Oder__3335971A");

            entity.HasOne(d => d.ProductNavigation).WithMany()
                .HasForeignKey(d => d.Product)
                .HasConstraintName("FK__OderDetai__Produ__3429BB53");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Orders__3214EC072CD884C3");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.AdditionalFee).HasColumnName("Additional_fee");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Breakdown).HasColumnType("text");
            entity.Property(e => e.Customer).HasMaxLength(255);

            entity.HasOne(d => d.CustomerNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Customer)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__Customer__324172E1");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Products__3214EC0797130CA5");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Data).HasColumnType("text");
            entity.Property(e => e.Des).HasColumnType("text");
            entity.Property(e => e.Images).HasColumnType("text");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Product_category");

            entity.Property(e => e.Categories).HasMaxLength(255);
            entity.Property(e => e.Products).HasMaxLength(255);

            entity.HasOne(d => d.CategoriesNavigation).WithMany()
                .HasForeignKey(d => d.Categories)
                .HasConstraintName("FK__Product_c__Categ__2F650636");

            entity.HasOne(d => d.ProductsNavigation).WithMany()
                .HasForeignKey(d => d.Products)
                .HasConstraintName("FK__Product_c__Produ__30592A6F");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC07844F0392");

            entity.ToTable("User");

            entity.HasIndex(e => e.Username, "UQ__User__536C85E44040DA52").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Role).HasDefaultValue(3);
            entity.Property(e => e.Status).HasDefaultValue(0);
            entity.Property(e => e.Username).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
