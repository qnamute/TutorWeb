using Microsoft.EntityFrameworkCore.Migrations;

namespace TutorWeb.Data.EF.Migrations
{
    public partial class initial04 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSliderDisplay",
                table: "Classes",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSliderDisplay",
                table: "Classes");
        }
    }
}
