using Microsoft.EntityFrameworkCore.Migrations;

namespace TutorWeb.Data.EF.Migrations
{
    public partial class initial05 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Literacy",
                table: "Users",
                maxLength: 1000,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Literacy",
                table: "Users");
        }
    }
}
