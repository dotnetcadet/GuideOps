using GuideOps.Api.Data;
using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Mutations;

public partial class MutationType
{
    public async Task<GuideAssignment> CreateGuideAssignment(
        [Service] GuideOpsDbContext context,
        CreateGuideAssignmentInput input)
    {
        var assignment = new GuideAssignment
        {
            GuideId = input.GuideId,
            AssignToRole = input.AssignToRole,
            SchoolYear = input.SchoolYear,
            IsActive = true
        };

        context.GuideAssignments.Add(assignment);
        await context.SaveChangesAsync();
        return assignment;
    }

    public async Task<bool> DeleteGuideAssignment([Service] GuideOpsDbContext context, int id)
    {
        var assignment = await context.GuideAssignments.FindAsync(id);
        if (assignment is null) return false;

        context.GuideAssignments.Remove(assignment);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<HandbookAssignment> CreateHandbookAssignment(
        [Service] GuideOpsDbContext context,
        CreateHandbookAssignmentInput input)
    {
        var assignment = new HandbookAssignment
        {
            HandbookId = input.HandbookId,
            AssignToRole = input.AssignToRole,
            SchoolYear = input.SchoolYear,
            IsActive = true
        };

        context.HandbookAssignments.Add(assignment);
        await context.SaveChangesAsync();
        return assignment;
    }

    public async Task<bool> DeleteHandbookAssignment([Service] GuideOpsDbContext context, int id)
    {
        var assignment = await context.HandbookAssignments.FindAsync(id);
        if (assignment is null) return false;

        context.HandbookAssignments.Remove(assignment);
        await context.SaveChangesAsync();
        return true;
    }
}

public record CreateGuideAssignmentInput(
    int GuideId,
    string AssignToRole,
    string SchoolYear);

public record CreateHandbookAssignmentInput(
    int HandbookId,
    string AssignToRole,
    string SchoolYear);
