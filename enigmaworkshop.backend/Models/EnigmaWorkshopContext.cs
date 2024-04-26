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
                .HasConstraintName("FK__Cart__Customer__0E391C95");

            entity.HasOne(d => d.ProductsNavigation).WithMany()
                .HasForeignKey(d => d.Products)
                .HasConstraintName("FK__Cart__Products__0F2D40CE");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC07197CC729");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.SubOf).HasMaxLength(255);
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC0787A3F85C");

            entity.HasIndex(e => e.User, "UQ__Customer__BD20C6F1A47C8F5F").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Address).HasColumnType("text");
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(255);
            entity.Property(e => e.User).HasMaxLength(255);

            entity.HasOne(d => d.UserNavigation).WithOne(p => p.Customer)
                .HasForeignKey<Customer>(d => d.User)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Customers__User__0D44F85C");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC073721B7AC");

            entity.ToTable("Employee");

            entity.HasIndex(e => e.User, "UQ__Employee__BD20C6F15FE9AB1B").IsUnique();

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Address).HasColumnType("text");
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(255);
            entity.Property(e => e.User).HasMaxLength(255);

            entity.HasOne(d => d.UserNavigation).WithOne(p => p.Employee)
                .HasForeignKey<Employee>(d => d.User)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Employee__User__0C50D423");
        });

        modelBuilder.Entity<OderDetail>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Oder).HasMaxLength(255);
            entity.Property(e => e.Product).HasMaxLength(255);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Orders__3214EC0737F65076");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.AdditionalFee).HasColumnName("Additional_fee");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Breakdown).HasColumnType("text");
            entity.Property(e => e.Customer).HasMaxLength(255);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Products__3214EC077C6EBA7B");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.Data).HasColumnType("text");
            entity.Property(e => e.Des).HasColumnType("text");
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
                .HasConstraintName("FK__Product_c__Categ__10216507");

            entity.HasOne(d => d.ProductsNavigation).WithMany()
                .HasForeignKey(d => d.Products)
                .HasConstraintName("FK__Product_c__Produ__11158940");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC070ABC25F4");

            entity.ToTable("User");

            entity.HasIndex(e => e.Username, "UQ__User__536C85E45106312E").IsUnique();

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
