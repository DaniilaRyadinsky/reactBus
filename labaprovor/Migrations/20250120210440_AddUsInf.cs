using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace labaprovor.Migrations
{
    /// <inheritdoc />
    public partial class AddUsInf : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Добавляем новые столбцы в существующую таблицу Users
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "FirstName", table: "Users");
            migrationBuilder.DropColumn(name: "LastName", table: "Users");
            migrationBuilder.DropColumn(name: "MiddleName", table: "Users");
            migrationBuilder.DropColumn(name: "PhoneNumber", table: "Users");
        }

    }
}
