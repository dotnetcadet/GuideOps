using GuideOps.Api.Data;
using GuideOps.Api.Models;
using GuideOps.Api.Services;

namespace GuideOps.Api.GraphQL.Mutations;

public partial class MutationType
{
    public async Task<SyncResult> SyncUsersFromAzureAd(
        [Service] GuideOpsDbContext context,
        [Service] IAzureAdSyncService syncService)
    {
        return await syncService.SyncUsersAsync(context);
    }

    public async Task<User> CreateUser([Service] GuideOpsDbContext context, CreateUserInput input)
    {
        var user = new User
        {
            AzureAdObjectId = input.AzureAdObjectId,
            DisplayName = input.DisplayName,
            Email = input.Email,
            Role = input.Role,
            IsActive = true,
            LastSyncedAt = DateTime.UtcNow
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task<User?> UpdateUserRole([Service] GuideOpsDbContext context, int id, string role)
    {
        var user = await context.Users.FindAsync(id);
        if (user is null) return null;

        user.Role = role;
        user.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();
        return user;
    }
}

public record CreateUserInput(
    string AzureAdObjectId,
    string DisplayName,
    string Email,
    string Role);
