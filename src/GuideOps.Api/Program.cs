using GuideOps.Api.Data;
using GuideOps.Api.GraphQL.Mutations;
using GuideOps.Api.GraphQL.Queries;
using GuideOps.Api.GraphQL.Types;
using GuideOps.Api.Models;
using GuideOps.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddPooledDbContextFactory<GuideOpsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Azure AD Authentication
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd");

// Azure AD Sync Service
builder.Services.AddScoped<IAzureAdSyncService, AzureAdSyncService>();

// GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<QueryType>()
    .AddMutationType<MutationType>()
    .AddType<UserType>()
    .AddType<GuideType>()
    .AddType<HandbookType>()
    .AddFiltering()
    .AddSorting()
    .AddProjections()
    .AddAuthorization()
    .RegisterDbContextFactory<GuideOpsDbContext>();

// CORS for admin app and SDK consumers
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? ["http://localhost:5173", "http://localhost:5174"])
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Auto-migrate in development
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<GuideOpsDbContext>();
    context.Database.EnsureCreated();


    var now = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);
    IEnumerable<User> users = [
        new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000001", DisplayName = "Sarah Johnson", Email = "sjohnson@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User {  AzureAdObjectId = "00000000-0000-0000-0000-000000000002", DisplayName = "Michael Chen", Email = "mchen@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User {  AzureAdObjectId = "00000000-0000-0000-0000-000000000003", DisplayName = "Rachel Williams", Email = "rwilliams@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User {  AzureAdObjectId = "00000000-0000-0000-0000-000000000004", DisplayName = "David Martinez", Email = "dmartinez@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User {  AzureAdObjectId = "00000000-0000-0000-0000-000000000005", DisplayName = "Lisa Thompson", Email = "lthompson@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
                // Students
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000006", DisplayName = "Emma Davis", Email = "edavis@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000007", DisplayName = "James Wilson", Email = "jwilson@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000008", DisplayName = "Sophia Garcia", Email = "sgarcia@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000009", DisplayName = "Ethan Brown", Email = "ebrown@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000010", DisplayName = "Olivia Anderson", Email = "oanderson@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000011", DisplayName = "Noah Taylor", Email = "ntaylor@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000012", DisplayName = "Ava Thomas", Email = "athomas@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000013", DisplayName = "Liam Jackson", Email = "ljackson@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000014", DisplayName = "Isabella White", Email = "iwhite@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000015", DisplayName = "Mason Harris", Email = "mharris@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
                // Admin
                new User { AzureAdObjectId = "00000000-0000-0000-0000-000000000016", DisplayName = "Admin User", Email = "admin@edio.school", Role = "Admin", IsActive = true, CreatedAt = now, UpdatedAt = now }
        ];

    var userSet = context.Set<User>();

    foreach (var user in users)
    {
        var existing = userSet.FirstOrDefault(p => p.AzureAdObjectId == user.AzureAdObjectId);

        if (existing is null)
        {
            userSet.Add(user);
        }
    }

    context.SaveChanges();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL();

app.Run();
