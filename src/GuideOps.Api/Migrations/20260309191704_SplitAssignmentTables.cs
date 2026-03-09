using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GuideOps.Api.Migrations
{
    /// <inheritdoc />
    public partial class SplitAssignmentTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Guides",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SchoolYear = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guides", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Handbooks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ContentUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ContentHtml = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SchoolYear = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    RequiresAcknowledgment = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Handbooks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AzureAdObjectId = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    LastSyncedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GuideAssignments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GuideId = table.Column<int>(type: "int", nullable: false),
                    AssignToRole = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SchoolYear = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuideAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuideAssignments_Guides_GuideId",
                        column: x => x.GuideId,
                        principalTable: "Guides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GuideSteps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GuideId = table.Column<int>(type: "int", nullable: false),
                    StepOrder = table.Column<int>(type: "int", nullable: false),
                    ElementSelector = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    Side = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuideSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuideSteps_Guides_GuideId",
                        column: x => x.GuideId,
                        principalTable: "Guides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HandbookAssignments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HandbookId = table.Column<int>(type: "int", nullable: false),
                    AssignToRole = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SchoolYear = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HandbookAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HandbookAssignments_Handbooks_HandbookId",
                        column: x => x.HandbookId,
                        principalTable: "Handbooks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Acknowledgments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    HandbookId = table.Column<int>(type: "int", nullable: false),
                    SchoolYear = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    AcknowledgedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IpAddress = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Acknowledgments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Acknowledgments_Handbooks_HandbookId",
                        column: x => x.HandbookId,
                        principalTable: "Handbooks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Acknowledgments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GuideCompletions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GuideId = table.Column<int>(type: "int", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuideCompletions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuideCompletions_Guides_GuideId",
                        column: x => x.GuideId,
                        principalTable: "Guides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuideCompletions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AzureAdObjectId", "CreatedAt", "DisplayName", "Email", "IsActive", "LastSyncedAt", "Role", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "00000000-0000-0000-0000-000000000001", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Sarah Johnson", "sjohnson@edio.school", true, null, "Teacher", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, "00000000-0000-0000-0000-000000000002", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Michael Chen", "mchen@edio.school", true, null, "Teacher", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 3, "00000000-0000-0000-0000-000000000003", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Rachel Williams", "rwilliams@edio.school", true, null, "Teacher", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 4, "00000000-0000-0000-0000-000000000004", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "David Martinez", "dmartinez@edio.school", true, null, "Teacher", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 5, "00000000-0000-0000-0000-000000000005", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Lisa Thompson", "lthompson@edio.school", true, null, "Teacher", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 6, "00000000-0000-0000-0000-000000000006", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Emma Davis", "edavis@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 7, "00000000-0000-0000-0000-000000000007", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "James Wilson", "jwilson@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 8, "00000000-0000-0000-0000-000000000008", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Sophia Garcia", "sgarcia@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 9, "00000000-0000-0000-0000-000000000009", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Ethan Brown", "ebrown@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 10, "00000000-0000-0000-0000-000000000010", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Olivia Anderson", "oanderson@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 11, "00000000-0000-0000-0000-000000000011", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Noah Taylor", "ntaylor@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 12, "00000000-0000-0000-0000-000000000012", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Ava Thomas", "athomas@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 13, "00000000-0000-0000-0000-000000000013", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Liam Jackson", "ljackson@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 14, "00000000-0000-0000-0000-000000000014", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Isabella White", "iwhite@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 15, "00000000-0000-0000-0000-000000000015", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Mason Harris", "mharris@edio.school", true, null, "Student", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 16, "00000000-0000-0000-0000-000000000016", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Admin User", "admin@edio.school", true, null, "Admin", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Acknowledgments_HandbookId",
                table: "Acknowledgments",
                column: "HandbookId");

            migrationBuilder.CreateIndex(
                name: "IX_Acknowledgments_SchoolYear",
                table: "Acknowledgments",
                column: "SchoolYear");

            migrationBuilder.CreateIndex(
                name: "IX_Acknowledgments_UserId_HandbookId_SchoolYear",
                table: "Acknowledgments",
                columns: new[] { "UserId", "HandbookId", "SchoolYear" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GuideAssignments_GuideId_AssignToRole_SchoolYear",
                table: "GuideAssignments",
                columns: new[] { "GuideId", "AssignToRole", "SchoolYear" });

            migrationBuilder.CreateIndex(
                name: "IX_GuideCompletions_GuideId",
                table: "GuideCompletions",
                column: "GuideId");

            migrationBuilder.CreateIndex(
                name: "IX_GuideCompletions_UserId_GuideId",
                table: "GuideCompletions",
                columns: new[] { "UserId", "GuideId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GuideSteps_GuideId_StepOrder",
                table: "GuideSteps",
                columns: new[] { "GuideId", "StepOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_HandbookAssignments_HandbookId_AssignToRole_SchoolYear",
                table: "HandbookAssignments",
                columns: new[] { "HandbookId", "AssignToRole", "SchoolYear" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_AzureAdObjectId",
                table: "Users",
                column: "AzureAdObjectId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Acknowledgments");

            migrationBuilder.DropTable(
                name: "GuideAssignments");

            migrationBuilder.DropTable(
                name: "GuideCompletions");

            migrationBuilder.DropTable(
                name: "GuideSteps");

            migrationBuilder.DropTable(
                name: "HandbookAssignments");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Guides");

            migrationBuilder.DropTable(
                name: "Handbooks");
        }
    }
}
