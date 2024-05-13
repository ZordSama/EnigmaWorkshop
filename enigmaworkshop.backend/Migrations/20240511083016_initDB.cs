using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace enigmaworkshop.backend.Migrations
{
    /// <inheritdoc />
    public partial class initDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Name = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: true
                    )
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Categori__3214EC07FBA51219", x => x.Id);
                }
            );

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Username = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Password = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Status = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    Role = table.Column<int>(type: "int", nullable: true, defaultValue: 3)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__User__3214EC07DBD6AB7B", x => x.Id);
                }
            );

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Name = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: true
                    ),
                    Des = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    Stock = table.Column<int>(type: "int", nullable: true),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: true
                    )
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Products__3214EC0726D76773", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Products__Catego__6B0FDBE9",
                        column: x => x.Category,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Name = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: true
                    ),
                    Category = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    )
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Tags__3214EC07C7C6AD6A", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Tags__Category__70C8B53F",
                        column: x => x.Category,
                        principalTable: "Categories",
                        principalColumn: "Id"
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    FirstName = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    LastName = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    DoB = table.Column<DateOnly>(type: "date", nullable: false),
                    Phone = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Email = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rank = table.Column<int>(type: "int", nullable: true),
                    Point = table.Column<double>(type: "float", nullable: true),
                    User = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: true
                    )
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__3214EC076CED2530", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Customers__User__68336F3E",
                        column: x => x.User,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    Id = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    FirstName = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    LastName = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    DoB = table.Column<DateOnly>(type: "date", nullable: false),
                    Phone = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Email = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptIn = table.Column<DateOnly>(type: "date", nullable: true),
                    OptOut = table.Column<DateOnly>(type: "date", nullable: true),
                    User = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: true
                    )
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__3214EC0788FEB16E", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Employee__User__673F4B05",
                        column: x => x.User,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "ProductTags",
                columns: table => new
                {
                    Product = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Tag = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    )
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__ProductTa__Produ__6C040022",
                        column: x => x.Product,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                    table.ForeignKey(
                        name: "FK__ProductTags__Tag__6CF8245B",
                        column: x => x.Tag,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    Customer = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Product = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Quantity = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__Cart__Customer__69279377",
                        column: x => x.Customer,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                    table.ForeignKey(
                        name: "FK__Cart__Product__6A1BB7B0",
                        column: x => x.Product,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Customer = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Address = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Additional_fee = table.Column<double>(type: "float", nullable: true),
                    Total = table.Column<double>(type: "float", nullable: true),
                    Breakdown = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Orders__3214EC0791CF69AF", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Orders__Customer__6DEC4894",
                        column: x => x.Customer,
                        principalTable: "Customers",
                        principalColumn: "Id"
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    OrderID = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Product = table.Column<string>(
                        type: "nvarchar(255)",
                        maxLength: 255,
                        nullable: false
                    ),
                    Quantity = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__OrderDeta__Order__6EE06CCD",
                        column: x => x.OrderID,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                    table.ForeignKey(
                        name: "FK__OrderDeta__Produ__6FD49106",
                        column: x => x.Product,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_Cart_Customer",
                table: "Cart",
                column: "Customer"
            );

            migrationBuilder.CreateIndex(name: "IX_Cart_Product", table: "Cart", column: "Product");

            migrationBuilder.CreateIndex(
                name: "UQ__Customer__A9D105345B9E7398",
                table: "Customers",
                column: "Email",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "UQ__Customer__BD20C6F1E836F38D",
                table: "Customers",
                column: "User",
                unique: true,
                filter: "[User] IS NOT NULL"
            );

            migrationBuilder.CreateIndex(
                name: "UQ__Employee__A9D10534B987733A",
                table: "Employee",
                column: "Email",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "UQ__Employee__BD20C6F1A0B07AA5",
                table: "Employee",
                column: "User",
                unique: true,
                filter: "[User] IS NOT NULL"
            );

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_Order",
                table: "OrderDetails",
                column: "OrderID"
            );

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_Product",
                table: "OrderDetails",
                column: "Product"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Customer",
                table: "Orders",
                column: "Customer"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Products_Category",
                table: "Products",
                column: "Category"
            );

            migrationBuilder.CreateIndex(
                name: "IX_ProductTags_Product",
                table: "ProductTags",
                column: "Product"
            );

            migrationBuilder.CreateIndex(
                name: "IX_ProductTags_Tag",
                table: "ProductTags",
                column: "Tag"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Tags_Category",
                table: "Tags",
                column: "Category"
            );

            migrationBuilder.CreateIndex(
                name: "UQ__User__536C85E4C9480ADF",
                table: "User",
                column: "Username",
                unique: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Cart");

            migrationBuilder.DropTable(name: "Employee");

            migrationBuilder.DropTable(name: "OrderDetails");

            migrationBuilder.DropTable(name: "ProductTags");

            migrationBuilder.DropTable(name: "Orders");

            migrationBuilder.DropTable(name: "Products");

            migrationBuilder.DropTable(name: "Tags");

            migrationBuilder.DropTable(name: "Customers");

            migrationBuilder.DropTable(name: "Categories");

            migrationBuilder.DropTable(name: "User");
        }
    }
}
