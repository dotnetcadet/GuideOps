using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;

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
    private readonly GraphServiceClient _client;

    public AzureAdSyncService(GraphServiceClient client)
    {
        _client = client;
    }


    public async Task<SyncResult> SyncUsersAsync(GuideOpsDbContext context)
    {
        // In production, this would call Microsoft Graph API:
        // var graphClient = new GraphServiceClient(credential);
        var users = await _client.Users.GetAsync();

        var now = DateTime.UtcNow;
        var userSet = context.Set<User>();
        int added = 0;

        foreach (var user in users.Value)
        {
            var existing = userSet.FirstOrDefault(p => p.AzureAdObjectId == user.Id);

            if (existing is null)
            {
                var newUser = new Models.User
                {
                    AzureAdObjectId = user.Id,
                    DisplayName = user.DisplayName,
                    Email = user.Mail ?? "N/A",
                    Role = "Teacher",
                    IsActive = true,
                    CreatedAt = now,
                    UpdatedAt = now
                };

                userSet.Add(newUser);

                added++;
            }
        }


        await context.SaveChangesAsync();

        return new SyncResult(added,0, 0);
    }
}

public record SyncResult(int Created, int Updated, int Deactivated);
