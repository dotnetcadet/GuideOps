using GuideOps.Api.Data;
using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Mutations;

[MutationType]
public static class AssignmentMutations
{
    public static async Task<Assignment> CreateAssignment(
        GuideOpsDbContext context,
        CreateAssignmentInput input)
    {
        var assignment = new Assignment
        {
            TargetType = input.TargetType,
            TargetId = input.TargetId,
            AssignToRole = input.AssignToRole,
            SchoolYear = input.SchoolYear,
            IsActive = true
        };

        context.Assignments.Add(assignment);
        await context.SaveChangesAsync();
        return assignment;
    }

    public static async Task<bool> DeleteAssignment(GuideOpsDbContext context, int id)
    {
        var assignment = await context.Assignments.FindAsync(id);
        if (assignment is null) return false;

        context.Assignments.Remove(assignment);
        await context.SaveChangesAsync();
        return true;
    }

    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Assignment> GetAssignments(GuideOpsDbContext context)
        => context.Assignments;
}

public record CreateAssignmentInput(
    string TargetType,
    int TargetId,
    string AssignToRole,
    string SchoolYear);
