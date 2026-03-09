using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.Services;

public interface IAzureAdSyncService
{
    Task<SyncResult> SyncUsersAsync(GuideOpsDbContext context);
}

/// <summary>
/// PoC implementation that simulates Azure AD user sync.
/// In production, this would use Microsoft Graph API to pull users from Azure AD/Entra ID.
/// </summary>
public class AzureAdSyncService : IAzureAdSyncService
{
    public async Task<SyncResult> SyncUsersAsync(GuideOpsDbContext context)
    {
        // In production, this would call Microsoft Graph API:
        // var graphClient = new GraphServiceClient(credential);
        // var users = await graphClient.Users.GetAsync();

        // For the PoC, we simulate by seeding sample users if none exist
        var existingCount = await context.Users.CountAsync();
        if (existingCount > 0)
        {
            return new SyncResult(0, existingCount, 0);
        }

        var sampleUsers = GenerateSampleUsers();
        context.Users.AddRange(sampleUsers);
        await context.SaveChangesAsync();

        return new SyncResult(sampleUsers.Count, 0, 0);
    }

    private static List<User> GenerateSampleUsers()
    {
        var users = new List<User>();
        var roles = new[] { "Student", "Student", "Student", "Student", "Teacher", "Admin" };

        for (int i = 1; i <= 50; i++)
        {
            var role = roles[(i - 1) % roles.Length];
            users.Add(new User
            {
                AzureAdObjectId = Guid.NewGuid().ToString(),
                DisplayName = $"{role} User {i}",
                Email = $"{role.ToLower()}{i}@edio.example.com",
                Role = role,
                IsActive = true,
                LastSyncedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });
        }

        return users;
    }
}

public record SyncResult(int Created, int Updated, int Deactivated);
