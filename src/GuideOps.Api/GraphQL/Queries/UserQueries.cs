using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.GraphQL.Queries;

[QueryType]
public static class UserQueries
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<User> GetUsers(GuideOpsDbContext context)
        => context.Users;

    public static async Task<User?> GetUserById(GuideOpsDbContext context, int id)
        => await context.Users
            .Include(u => u.Acknowledgments)
            .Include(u => u.GuideCompletions)
            .FirstOrDefaultAsync(u => u.Id == id);

    public static async Task<User?> GetUserByAzureAdObjectId(GuideOpsDbContext context, string objectId)
        => await context.Users
            .Include(u => u.Acknowledgments)
            .Include(u => u.GuideCompletions)
            .FirstOrDefaultAsync(u => u.AzureAdObjectId == objectId);
}
