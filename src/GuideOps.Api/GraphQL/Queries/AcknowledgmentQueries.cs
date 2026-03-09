using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.GraphQL.Queries;

[QueryType]
public static class AcknowledgmentQueries
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Acknowledgment> GetAcknowledgments(GuideOpsDbContext context)
        => context.Acknowledgments
            .Include(a => a.User)
            .Include(a => a.Handbook);

    public static async Task<AcknowledgmentStats> GetAcknowledgmentStats(
        GuideOpsDbContext context,
        string schoolYear,
        int handbookId)
    {
        var handbook = await context.Handbooks
            .Include(h => h.Assignments)
            .FirstOrDefaultAsync(h => h.Id == handbookId);

        if (handbook is null)
            return new AcknowledgmentStats(0, 0, 0);

        var assignedRoles = handbook.Assignments
            .Where(a => a.TargetType == "Handbook" && a.IsActive && a.SchoolYear == schoolYear)
            .Select(a => a.AssignToRole)
            .ToList();

        var totalAssigned = await context.Users
            .Where(u => u.IsActive && (assignedRoles.Contains("All") || assignedRoles.Contains(u.Role)))
            .CountAsync();

        var acknowledgedCount = await context.Acknowledgments
            .Where(a => a.HandbookId == handbookId && a.SchoolYear == schoolYear)
            .CountAsync();

        return new AcknowledgmentStats(totalAssigned, acknowledgedCount, totalAssigned - acknowledgedCount);
    }

    public static async Task<bool> HasUserAcknowledged(
        GuideOpsDbContext context,
        string azureAdObjectId,
        int handbookId,
        string schoolYear)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.AzureAdObjectId == azureAdObjectId);

        if (user is null) return false;

        return await context.Acknowledgments
            .AnyAsync(a => a.UserId == user.Id && a.HandbookId == handbookId && a.SchoolYear == schoolYear);
    }
}

public record AcknowledgmentStats(int TotalAssigned, int AcknowledgedCount, int PendingCount);
