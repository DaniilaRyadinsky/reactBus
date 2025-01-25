using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace labaprovor.Migrations
{
    /// <inheritdoc />
    public partial class UserBusCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusUser");

           

            migrationBuilder.CreateTable(
                name: "UserBus",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    BusId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBus", x => new { x.UserId, x.BusId });
                    table.ForeignKey(
                        name: "FK_UserBus_Buses_BusId",
                        column: x => x.BusId,
                        principalTable: "Buses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBus_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserBus_BusId",
                table: "UserBus",
                column: "BusId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropTable(
                name: "UserBus");

            migrationBuilder.CreateTable(
                name: "BusUser",
                columns: table => new
                {
                    BusesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CustomersId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusUser", x => new { x.BusesId, x.CustomersId });
                    table.ForeignKey(
                        name: "FK_BusUser_Buses_BusesId",
                        column: x => x.BusesId,
                        principalTable: "Buses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusUser_Users_CustomersId",
                        column: x => x.CustomersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BusUser_CustomersId",
                table: "BusUser",
                column: "CustomersId");
        }
    }
}
