using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace enigmaworkshop.backend.Migrations
{
    /// <inheritdoc />
    public partial class editOrderData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Breakdown",
                table: "Orders",
                newName: "Data");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Orders",
                newName: "Breakdown");
        }
    }
}
