﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using enigmaworkshop.backend.Models;

#nullable disable

namespace enigmaworkshop.backend.Migrations
{
    [DbContext(typeof(EnigmaWorkshopContext))]
    partial class EnigmaWorkshopContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("enigmaworkshop.backend.Models.Cart", b =>
                {
                    b.Property<string>("Customer")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Products")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.HasIndex("Customer");

                    b.HasIndex("Products");

                    b.ToTable("Cart", (string)null);
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Category", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("SubOf")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id")
                        .HasName("PK__Categori__3214EC07FFFB9D73");

                    b.HasIndex("SubOf");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Customer", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<DateOnly?>("DoB")
                        .HasColumnType("date");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<double?>("Point")
                        .HasColumnType("float");

                    b.Property<int?>("Rank")
                        .HasColumnType("int");

                    b.Property<string>("User")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id")
                        .HasName("PK__Customer__3214EC07914D34D1");

                    b.HasIndex(new[] { "User" }, "UQ__Customer__BD20C6F1C81C634B")
                        .IsUnique()
                        .HasFilter("[User] IS NOT NULL");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Employee", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateOnly?>("DoB")
                        .HasColumnType("date");

                    b.Property<string>("FullName")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateOnly?>("OptIn")
                        .HasColumnType("date");

                    b.Property<DateOnly?>("OptOut")
                        .HasColumnType("date");

                    b.Property<string>("User")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id")
                        .HasName("PK__Employee__3214EC07EB8375C8");

                    b.HasIndex(new[] { "User" }, "UQ__Employee__BD20C6F1A8FAAAC8")
                        .IsUnique()
                        .HasFilter("[User] IS NOT NULL");

                    b.ToTable("Employee", (string)null);
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.OderDetail", b =>
                {
                    b.Property<string>("Oder")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Product")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasIndex("Oder");

                    b.HasIndex("Product");

                    b.ToTable("OderDetails");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Order", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<double?>("AdditionalFee")
                        .HasColumnType("float")
                        .HasColumnName("Additional_fee");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Breakdown")
                        .HasColumnType("text");

                    b.Property<string>("Customer")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<double?>("Total")
                        .HasColumnType("float");

                    b.HasKey("Id")
                        .HasName("PK__Orders__3214EC0796F39D5B");

                    b.HasIndex("Customer");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Product", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Data")
                        .HasColumnType("text");

                    b.Property<string>("Des")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<double?>("Price")
                        .HasColumnType("float");

                    b.Property<int?>("Stock")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__Products__3214EC07DEC27877");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.ProductCategory", b =>
                {
                    b.Property<string>("Categories")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Products")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasIndex("Categories");

                    b.HasIndex("Products");

                    b.ToTable("Product_category", (string)null);
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("Role")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(3)
                        .HasColumnName("role");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id")
                        .HasName("PK__User__3214EC077C134E6A");

                    b.HasIndex(new[] { "Username" }, "UQ__User__536C85E433C0D29B")
                        .IsUnique();

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Cart", b =>
                {
                    b.HasOne("enigmaworkshop.backend.Models.Customer", "CustomerNavigation")
                        .WithMany()
                        .HasForeignKey("Customer")
                        .IsRequired()
                        .HasConstraintName("FK__Cart__Customer__2739D489");

                    b.HasOne("enigmaworkshop.backend.Models.Product", "ProductsNavigation")
                        .WithMany()
                        .HasForeignKey("Products")
                        .IsRequired()
                        .HasConstraintName("FK__Cart__Products__282DF8C2");

                    b.Navigation("CustomerNavigation");

                    b.Navigation("ProductsNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Category", b =>
                {
                    b.HasOne("enigmaworkshop.backend.Models.Category", "SubOfNavigation")
                        .WithMany("InverseSubOfNavigation")
                        .HasForeignKey("SubOf")
                        .HasConstraintName("FK__Categorie__SubOf__2B0A656D");

                    b.Navigation("SubOfNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Customer", b =>
                {
                    b.HasOne("enigmaworkshop.backend.Models.User", "UserNavigation")
                        .WithOne("Customer")
                        .HasForeignKey("enigmaworkshop.backend.Models.Customer", "User")
                        .HasConstraintName("FK__Customers__User__2645B050");

                    b.Navigation("UserNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Employee", b =>
                {
                    b.HasOne("enigmaworkshop.backend.Models.User", "UserNavigation")
                        .WithOne("Employee")
                        .HasForeignKey("enigmaworkshop.backend.Models.Employee", "User")
                        .HasConstraintName("FK__Employee__User__25518C17");

                    b.Navigation("UserNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.OderDetail", b =>
                {
                    b.HasOne("enigmaworkshop.backend.Models.Order", "OderNavigation")
                        .WithMany()
                        .HasForeignKey("Oder")
                        .IsRequired()
                        .HasConstraintName("FK__OderDetail__Oder__2CF2ADDF");

                    b.HasOne("enigmaworkshop.backend.Models.Product", "ProductNavigation")
                        .WithMany()
                        .HasForeignKey("Product")
                        .IsRequired()
                        .HasConstraintName("FK__OderDetai__Produ__2DE6D218");

                    b.Navigation("OderNavigation");

                    b.Navigation("ProductNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Order", b =>
                {
                    b.HasOne("enigmaworkshop.backend.Models.Customer", "CustomerNavigation")
                        .WithMany("Orders")
                        .HasForeignKey("Customer")
                        .IsRequired()
                        .HasConstraintName("FK__Orders__Customer__2BFE89A6");

                    b.Navigation("CustomerNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.ProductCategory", b =>
                {
                    b.HasOne("enigmaworkshop.backend.Models.Category", "CategoriesNavigation")
                        .WithMany()
                        .HasForeignKey("Categories")
                        .IsRequired()
                        .HasConstraintName("FK__Product_c__Categ__29221CFB");

                    b.HasOne("enigmaworkshop.backend.Models.Product", "ProductsNavigation")
                        .WithMany()
                        .HasForeignKey("Products")
                        .IsRequired()
                        .HasConstraintName("FK__Product_c__Produ__2A164134");

                    b.Navigation("CategoriesNavigation");

                    b.Navigation("ProductsNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Category", b =>
                {
                    b.Navigation("InverseSubOfNavigation");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.Customer", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("enigmaworkshop.backend.Models.User", b =>
                {
                    b.Navigation("Customer");

                    b.Navigation("Employee");
                });
#pragma warning restore 612, 618
        }
    }
}
