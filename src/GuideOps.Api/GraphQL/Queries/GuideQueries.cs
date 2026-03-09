using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.GraphQL.Queries;


public partial class QueryType
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Guide> GetGuides([Service] GuideOpsDbContext context)
        => context.Guides.Include(g => g.Steps.OrderBy(s => s.StepOrder));

    public async Task<Guide?> GetGuideById([Service] GuideOpsDbContext context, int id)
        => await context.Guides
            .Include(g => g.Steps.OrderBy(s => s.StepOrder))
            .Include(g => g.Assignments)
            .FirstOrDefaultAsync(g => g.Id == id);

    /// <summary>
    /// Gets guides assigned to the current user's role that haven't been completed yet.
    /// Used by the SDK to fetch active guides for a user.
    /// </summary>
    public async Task<List<Guide>> GetAssignedGuides(
        GuideOpsDbContext context,
        string azureAdObjectId,
        string schoolYear)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.AzureAdObjectId == azureAdObjectId);

        if (user is null) return [];

        var completedGuideIds = await context.GuideCompletions
            .Where(gc => gc.UserId == user.Id)
            .Select(gc => gc.GuideId)
            .ToListAsync();

        return await context.Guides
            .Include(g => g.Steps.OrderBy(s => s.StepOrder))
            .Where(g => g.IsActive
                && g.SchoolYear == schoolYear
                && !completedGuideIds.Contains(g.Id)
                && g.Assignments.Any(a =>
                    a.IsActive
                    && a.SchoolYear == schoolYear
                    && (a.AssignToRole == "All" || a.AssignToRole == user.Role)))
            .OrderBy(g => g.Priority)
            .ToListAsync();
    }
}
