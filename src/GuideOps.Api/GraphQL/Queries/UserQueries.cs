using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.GraphQL.Queries;


public partial class QueryType
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<User> GetUsers([Service] GuideOpsDbContext context)
        => context.Users;

    public async Task<User?> GetUserById([Service] GuideOpsDbContext context, int id)
        => await context.Users
            .Include(u => u.Acknowledgments)
            .Include(u => u.GuideCompletions)
            .FirstOrDefaultAsync(u => u.Id == id);

    public async Task<User?> GetUserByAzureAdObjectId([Service] GuideOpsDbContext context, string objectId)
        => await context.Users
            .Include(u => u.Acknowledgments)
            .Include(u => u.GuideCompletions)
            .FirstOrDefaultAsync(u => u.AzureAdObjectId == objectId);
}
