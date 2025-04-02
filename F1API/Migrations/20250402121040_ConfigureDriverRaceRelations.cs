using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1API.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureDriverRaceRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DriverName",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "DriverName2",
                table: "Teams");

            migrationBuilder.AddColumn<int>(
                name: "WinnerId",
                table: "Races",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Drivers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DriverRaces",
                columns: table => new
                {
                    DriversId = table.Column<int>(type: "INTEGER", nullable: false),
                    RacesId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverRaces", x => new { x.DriversId, x.RacesId });
                    table.ForeignKey(
                        name: "FK_DriverRaces_Drivers_DriversId",
                        column: x => x.DriversId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DriverRaces_Races_RacesId",
                        column: x => x.RacesId,
                        principalTable: "Races",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Races_WinnerId",
                table: "Races",
                column: "WinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_TeamId",
                table: "Drivers",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverRaces_RacesId",
                table: "DriverRaces",
                column: "RacesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Teams_TeamId",
                table: "Drivers",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Races_Drivers_WinnerId",
                table: "Races",
                column: "WinnerId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Teams_TeamId",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_Races_Drivers_WinnerId",
                table: "Races");

            migrationBuilder.DropTable(
                name: "DriverRaces");

            migrationBuilder.DropIndex(
                name: "IX_Races_WinnerId",
                table: "Races");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_TeamId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "WinnerId",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Drivers");

            migrationBuilder.AddColumn<string>(
                name: "DriverName",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DriverName2",
                table: "Teams",
                type: "TEXT",
                nullable: true);
        }
    }
}
