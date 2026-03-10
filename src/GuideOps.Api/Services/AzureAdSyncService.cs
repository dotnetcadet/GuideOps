using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;

namespace GuideOps.Api.Services;

/// <summary>
/// PoC implementation that simulates Azure AD user sync.
/// In production, this would use Microsoft Graph API to pull users from Azure AD/Entra ID.
/// </summary>
public class AzureAdSyncService
{
    private readonly GraphServiceClient _client;
    private readonly GuideOpsDbContext _context;

    public AzureAdSyncService(GraphServiceClient client, GuideOpsDbContext context)
    {
        _client = client;
        _context = context;
    }


    public async Task<SyncResult> SyncUsersAsync()
    {
        // In production, this would call Microsoft Graph API:
        // var graphClient = new GraphServiceClient(credential);
        var response = await _client.Users.GetAsync();

        var now = DateTime.UtcNow;
        var userSet = _context.Set<User>();
        int added = 0;

        foreach (var user in response.Value)
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


        await _context.SaveChangesAsync();

        return new SyncResult(added,0, 0);
    }
}

public record SyncResult(int Created, int Updated, int Deactivated);
