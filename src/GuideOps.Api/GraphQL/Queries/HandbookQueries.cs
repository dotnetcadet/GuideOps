using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.GraphQL.Queries;

public partial class QueryType
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Handbook> GetHandbooks([Service] GuideOpsDbContext context)
        => context.Handbooks;

    public async Task<Handbook?> GetHandbookById([Service] GuideOpsDbContext context, int id)
        => await context.Handbooks
            .Include(h => h.Assignments)
            .FirstOrDefaultAsync(h => h.Id == id);

    /// <summary>
    /// Gets handbooks assigned to the current user's role that haven't been acknowledged yet.
    /// Used by the SDK to determine which handbooks need acknowledgment before access is granted.
    /// </summary>
    public async Task<List<Handbook>> GetPendingHandbooks(
       [Service] GuideOpsDbContext context,
        string azureAdObjectId,
        string schoolYear)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.AzureAdObjectId == azureAdObjectId);

        if (user is null) return [];

        var acknowledgedHandbookIds = await context.Acknowledgments
            .Where(a => a.UserId == user.Id && a.SchoolYear == schoolYear)
            .Select(a => a.HandbookId)
            .ToListAsync();

        return await context.Handbooks
            .Where(h => h.IsActive
                && h.RequiresAcknowledgment
                && h.SchoolYear == schoolYear
                && !acknowledgedHandbookIds.Contains(h.Id)
                && h.Assignments.Any(a =>
                    a.IsActive
                    && a.SchoolYear == schoolYear
                    && (a.AssignToRole == "All" || a.AssignToRole == user.Role)))
            .ToListAsync();
    }
}
