using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KazGameAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPollsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Polls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionAName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionAImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionAVotes = table.Column<int>(type: "int", nullable: false),
                    OptionBName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionBImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionBVotes = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polls", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Polls");
        }
    }
}
