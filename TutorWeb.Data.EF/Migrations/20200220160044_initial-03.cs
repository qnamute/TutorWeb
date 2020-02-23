using Microsoft.EntityFrameworkCore.Migrations;

namespace TutorWeb.Data.EF.Migrations
{
    public partial class initial03 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Classes",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Address",
                table: "Classes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
